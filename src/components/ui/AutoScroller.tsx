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
const RESUME_MS = 2500;

/**
 * A row that drifts sideways on its own, in an endless loop, and that visitors can also
 * scroll themselves: swipe on phones, drag with the mouse or use a trackpad on computers.
 * It pauses while hovered, touched or off-screen. Vertical page scrolling is never captured.
 */
export function AutoScroller({ children, speed = 30, label, className }: AutoScrollerProps) {
  const reduce = useReducedMotion();
  const rowRef = useRef<HTMLDivElement>(null);
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
    const halfEl = halfRef.current;
    if (!row || !halfEl) return;

    let visible = false;
    let hovering = false;
    let pressing = false;
    let resumeAt = 0;
    let pos = 0;
    let last = 0;
    let frame = 0;

    const pauseForUser = () => {
      resumeAt = performance.now() + RESUME_MS;
    };

    const wrap = () => {
      const loop = halfEl.offsetWidth;
      if (loop <= 0) return;
      if (row.scrollLeft >= loop) row.scrollLeft -= loop;
      else if (row.scrollLeft <= 0) row.scrollLeft += loop;
    };

    const tick = (time: number) => {
      const dt = last ? Math.min(time - last, 64) : 0;
      last = time;
      const idle = visible && !hovering && !pressing && time > resumeAt;
      if (idle && !reduce) {
        pos += (speed * dt) / 1000;
        const loop = halfEl.offsetWidth;
        if (loop > 0 && pos >= loop) pos -= loop;
        row.scrollLeft = pos;
      } else {
        pos = row.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };

    // Real interaction is detected from the visitor's input, not from scroll events
    // (our own tiny steps get rounded by the browser and would look like user scrolls).
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) pauseForUser(); // sideways trackpad swipe
    };
    const onScroll = () => {
      if (performance.now() <= resumeAt || pressing) {
        wrap();
        pos = row.scrollLeft;
      }
    };

    // Mouse drag to scroll (touch and trackpads scroll natively).
    let startX = 0;
    let startLeft = 0;
    const onPointerDown = (e: PointerEvent) => {
      pressing = true;
      pauseForUser();
      if (e.pointerType !== "mouse") return;
      startX = e.clientX;
      startLeft = row.scrollLeft;
      dragMoved.current = false;
      const onMove = (ev: PointerEvent) => {
        const dx = ev.clientX - startX;
        if (Math.abs(dx) > 5) dragMoved.current = true;
        row.scrollLeft = startLeft - dx;
        wrap();
        pos = row.scrollLeft;
      };
      const onUp = () => {
        pressing = false;
        pauseForUser();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    };
    const onTouchStart = () => {
      pressing = true;
      pauseForUser();
    };
    const onTouchEnd = () => {
      pressing = false;
      pauseForUser();
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(row);
    row.addEventListener("scroll", onScroll, { passive: true });
    row.addEventListener("wheel", onWheel, { passive: true });
    row.addEventListener("pointerdown", onPointerDown);
    row.addEventListener("touchstart", onTouchStart, { passive: true });
    row.addEventListener("touchend", onTouchEnd, { passive: true });
    row.addEventListener("pointerenter", onEnter);
    row.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      row.removeEventListener("scroll", onScroll);
      row.removeEventListener("wheel", onWheel);
      row.removeEventListener("pointerdown", onPointerDown);
      row.removeEventListener("touchstart", onTouchStart);
      row.removeEventListener("touchend", onTouchEnd);
      row.removeEventListener("pointerenter", onEnter);
      row.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, speed]);

  return (
    <div
      ref={rowRef}
      role="region"
      aria-label={label}
      className={cn(
        "cursor-grab overflow-x-auto overflow-y-hidden overscroll-x-contain active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
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
      <div className="flex w-max">
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
