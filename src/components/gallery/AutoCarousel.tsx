"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import type { Photo } from "@/types";
import { PhotoTile } from "./PhotoTile";

interface AutoCarouselProps {
  photos: Photo[];
  label: string;
  /** Drift speed in pixels per second */
  speed?: number;
}

/**
 * A slowly drifting, endlessly looping row of photographs.
 * - Pauses while the pointer is over it or a finger is on it, and while off-screen.
 * - Swipeable by touch; vertical wheel/scroll always moves the page.
 * - Clicking a photo opens the lightbox.
 */
export function AutoCarousel({ photos, label, speed = 32 }: AutoCarouselProps) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);
  const hovering = useRef(false);
  const touching = useRef(false);
  const visible = useRef(false);

  // Repeat the set enough that one "half" is wider than any screen, then duplicate that half for the loop.
  const repeats = Math.max(1, Math.ceil(6 / photos.length));
  const half = Array.from({ length: repeats }, () => photos).flat();
  const items = [...half, ...half];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    io.observe(el);

    if (reduce) return () => io.disconnect();

    let frame = 0;
    let last = 0;
    let pos = el.scrollLeft;

    const tick = (time: number) => {
      const dt = last ? Math.min(time - last, 64) : 0;
      last = time;
      const loopWidth = el.scrollWidth / 2;
      if (visible.current && !hovering.current && !touching.current && loopWidth > 0) {
        pos += (speed * dt) / 1000;
        if (pos >= loopWidth) pos -= loopWidth;
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft; // follow the user while they drag
        if (pos >= loopWidth && loopWidth > 0) {
          pos -= loopWidth;
          el.scrollLeft = pos;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [reduce, speed]);

  return (
    <ul
      ref={trackRef}
      aria-label={label}
      className="flex gap-3 overflow-x-auto overflow-y-hidden px-4 py-2 sm:gap-5 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") hovering.current = true;
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") hovering.current = false;
      }}
      onTouchStart={() => {
        touching.current = true;
      }}
      onTouchEnd={() => {
        window.setTimeout(() => (touching.current = false), 1800);
      }}
    >
      {items.map((photo, i) => {
        const original = i % photos.length;
        return (
          <li
            key={`${photo.src}-${i}`}
            aria-hidden={i >= half.length ? true : undefined}
            inert={i >= half.length ? true : undefined}
            className="w-[44vw] shrink-0 sm:w-56 lg:w-64"
          >
            <PhotoTile
              group={photos}
              index={original}
              sizes="(min-width: 1024px) 256px, (min-width: 640px) 224px, 44vw"
              className={`aspect-[3/4] rounded-t-full rounded-b-xl shadow-md shadow-maroon/15 ring-1 ring-brass/40 ring-offset-4 ring-offset-ivory ${
                i % 2 ? "mt-5 sm:mt-8" : ""
              }`}
            />
          </li>
        );
      })}
    </ul>
  );
}
