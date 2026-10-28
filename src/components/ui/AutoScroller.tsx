"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface AutoScrollerProps {
  children: ReactNode;
  /** Drift speed in pixels per second */
  speed?: number;
  label: string;
  className?: string;
}

/** Wait this long after the visitor stops interacting before drifting again. */
const RESUME_MS = 2000;
/** How quickly a flick's momentum fades (per 16 ms frame). */
const FRICTION = 0.94;

/**
 * A row of photos that drifts sideways on its own, in an endless loop, and that visitors can
 * also move themselves at any moment: swipe on phones (with momentum), drag with a mouse, or
 * scroll sideways on a trackpad.
 *
 * Everything is one position value applied as a transform: there is no native scroll position
 * for the drift and the visitor to fight over, so a swipe always responds immediately, even
 * mid-drift. `touch-action: pan-y` leaves vertical page scrolling to the browser.
 */
export function AutoScroller({ children, speed = 30, label, className }: AutoScrollerProps) {
  const reduce = useReducedMotion();
  const rowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const halfRef = useRef<HTMLDivElement>(null);
  const dragMoved = useRef(false);

  // Repeat the items until one "half" is comfortably wider than a big screen, then duplicate it.
  const items = Children.toArray(children);
  const repeats = Math.max(1, Math.ceil(12 / Math.max(items.length, 1)));
  const half = Array.from({ length: repeats }, (_, r) =>
    items.map((child, i) => (
      <div key={`${r}-${i}`} className="shrink-0">
        {child}
      </div>
    )),
  ).flat();

  useEffect(() => {
    const row = rowRef.current;
    const track = trackRef.current;
    const halfEl = halfRef.current;
    if (!row || !track || !halfEl) return;

    let offset = 0; // how far the track is shifted left, in px
    let velocity = 0; // px per ms, left over from a flick
    let visible = false;
    let hovering = false;
    let dragging = false;
    let pointerId = -1;
    let startX = 0;
    let lastX = 0;
    let lastMove = 0;
    let resumeAt = 0;
    let last = 0;
    let frame = 0;

    const pauseForUser = () => {
      resumeAt = performance.now() + RESUME_MS;
    };
    // The two halves are identical, so wrapping the offset by one half is invisible.
    const paint = () => {
      const loop = halfEl.offsetWidth;
      if (loop > 0) offset = ((offset % loop) + loop) % loop;
      track.style.transform = `translate3d(${-offset}px,0,0)`;
    };

    const tick = (time: number) => {
      const dt = last ? Math.min(time - last, 64) : 0;
      last = time;
      if (!dragging && Math.abs(velocity) > 0.01) {
        // glide after a flick
        offset += velocity * dt;
        velocity *= Math.pow(FRICTION, dt / 16);
        pauseForUser();
      } else if (!dragging && visible && !hovering && time > resumeAt && !reduce) {
        offset += (speed * dt) / 1000;
      }
      paint();
      frame = requestAnimationFrame(tick);
    };

    // Swipe (touch) and drag (mouse)
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      pointerId = e.pointerId;
      startX = lastX = e.clientX;
      lastMove = performance.now();
      velocity = 0;
      dragMoved.current = false;
      pauseForUser();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      if (!dragMoved.current && Math.abs(e.clientX - startX) > 5) {
        dragMoved.current = true;
        // keep following the finger or mouse even if it leaves the row
        try {
          row.setPointerCapture(e.pointerId);
        } catch {}
      }
      offset -= dx;
      velocity = 0.8 * (-dx / Math.max(now - lastMove, 1)) + 0.2 * velocity;
      lastX = e.clientX;
      lastMove = now;
      pauseForUser();
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      dragging = false;
      pointerId = -1;
      if (performance.now() - lastMove > 80) velocity = 0; // held still before letting go: no flick
      pauseForUser();
    };
    // The browser took the gesture over (the visitor is scrolling the page vertically).
    const onCancel = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      dragging = false;
      pointerId = -1;
      velocity = 0;
    };

    // Sideways trackpad swipes (and shift + mouse wheel). Vertical wheel scrolls the page.
    const onWheel = (e: WheelEvent) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (!dx) return;
      e.preventDefault();
      offset += dx;
      velocity = 0;
      pauseForUser();
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = false;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(row);
    row.addEventListener("pointerdown", onDown);
    row.addEventListener("pointermove", onMove);
    row.addEventListener("pointerup", onUp);
    row.addEventListener("pointercancel", onCancel);
    row.addEventListener("lostpointercapture", onUp);
    row.addEventListener("wheel", onWheel, { passive: false });
    row.addEventListener("pointerenter", onEnter);
    row.addEventListener("pointerleave", onLeave);
    paint();
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      row.removeEventListener("pointerdown", onDown);
      row.removeEventListener("pointermove", onMove);
      row.removeEventListener("pointerup", onUp);
      row.removeEventListener("pointercancel", onCancel);
      row.removeEventListener("lostpointercapture", onUp);
      row.removeEventListener("wheel", onWheel);
      row.removeEventListener("pointerenter", onEnter);
      row.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, speed]);

  return (
    <div
      ref={rowRef}
      role="region"
      aria-label={label}
      className={cn("cursor-grab select-none overflow-hidden active:cursor-grabbing", className)}
      // vertical page scrolling stays with the browser; sideways movement is handled here
      style={{ touchAction: "pan-y" }}
      // a drag should not also count as a click on the photo underneath
      onClickCapture={(e) => {
        if (dragMoved.current) {
          e.preventDefault();
          e.stopPropagation();
          dragMoved.current = false;
        }
      }}
      onDragStart={(e) => e.preventDefault()}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div ref={halfRef} className="flex shrink-0">
          {half}
        </div>
        <div className="flex shrink-0" aria-hidden="true" inert>
          {half}
        </div>
      </div>
    </div>
  );
}
