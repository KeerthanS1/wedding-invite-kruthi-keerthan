"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import type { ChapterKey, Photo } from "@/types";
import { cn } from "@/lib/utils";
import { PhotoTile } from "./PhotoTile";

/**
 * One frame style per chapter, matched to how that part of the shoot felt.
 *  traditional: arched temple-doorway
 *  street:      polaroid prints, gently tilted
 *  lake:        wide, softly rounded landscapes
 *  pottery:     round clay-plate medallions
 */
const FRAMES: Record<
  ChapterKey,
  { item: string; tile: (i: number) => string; wrap?: (i: number) => string; sizes: string }
> = {
  traditional: {
    item: "w-[44vw] sm:w-56 lg:w-64",
    tile: (i) =>
      cn(
        "aspect-[3/4] rounded-t-full rounded-b-xl shadow-md shadow-maroon/15 ring-1 ring-brass/40 ring-offset-4 ring-offset-ivory",
        i % 2 === 1 && "mt-5 sm:mt-8",
      ),
    sizes: "(min-width: 1024px) 256px, (min-width: 640px) 224px, 44vw",
  },
  street: {
    item: "w-[46vw] sm:w-60 lg:w-64",
    wrap: (i) =>
      cn("bg-white p-2 pb-9 shadow-lg shadow-black/40 sm:p-2.5 sm:pb-11", i % 2 ? "rotate-2 mt-4" : "-rotate-2"),
    tile: () => "aspect-square",
    sizes: "(min-width: 1024px) 240px, (min-width: 640px) 220px, 44vw",
  },
  lake: {
    item: "w-[72vw] sm:w-80 lg:w-96",
    tile: (i) => cn("aspect-[4/3] rounded-2xl shadow-lg shadow-black/30", i % 2 === 1 && "mt-4 sm:mt-6"),
    sizes: "(min-width: 1024px) 384px, (min-width: 640px) 320px, 72vw",
  },
  pottery: {
    item: "w-[50vw] sm:w-56 lg:w-64",
    tile: (i) =>
      cn(
        "aspect-square rounded-full shadow-lg shadow-clay/30 ring-1 ring-clay/50 ring-offset-4 ring-offset-sandal",
        i % 2 === 1 && "mt-5 sm:mt-8",
      ),
    sizes: "(min-width: 1024px) 256px, (min-width: 640px) 224px, 50vw",
  },
};

interface AutoCarouselProps {
  chapter: ChapterKey;
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
export function AutoCarousel({ chapter, photos, label, speed = 32 }: AutoCarouselProps) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);
  const hovering = useRef(false);
  const touching = useRef(false);
  const visible = useRef(false);
  const frame = FRAMES[chapter];

  // Repeat the set until one "half" is wider than any screen, then duplicate that half for the loop.
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

    let raf = 0;
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
        if (loopWidth > 0 && pos >= loopWidth) {
          pos -= loopWidth;
          el.scrollLeft = pos;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [reduce, speed]);

  return (
    <ul
      ref={trackRef}
      aria-label={label}
      className="flex gap-4 overflow-x-auto overflow-y-hidden px-4 py-4 sm:gap-6 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
        const index = i % photos.length;
        const isCopy = i >= half.length;
        return (
          <li
            key={`${photo.src}-${i}`}
            aria-hidden={isCopy ? true : undefined}
            inert={isCopy ? true : undefined}
            className={cn("shrink-0", frame.item)}
          >
            <div className={frame.wrap?.(i)}>
              <PhotoTile group={photos} index={index} sizes={frame.sizes} className={frame.tile(i)} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
