"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/types";
import { getLenis } from "@/lib/scroll";
import { Picture } from "@/components/ui/Picture";

interface LightboxProps {
  photos: Photo[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const SWIPE_DISTANCE = 70;
const SWIPE_VELOCITY = 450;

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 70 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -70 }),
};

export function Lightbox({ photos, index, onIndexChange, onClose }: LightboxProps) {
  const reduce = useReducedMotion();
  const [direction, setDirection] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = photos.length;
  const photo = photos[index];

  const go = useCallback(
    (step: 1 | -1) => {
      if (total < 2) return;
      setDirection(step);
      onIndexChange((index + step + total) % total);
    },
    [index, total, onIndexChange],
  );

  /* scroll lock, focus management, restore focus on close */
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    getLenis()?.stop();
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      html.style.overflow = prevOverflow;
      getLenis()?.start();
      previous?.focus?.();
    };
  }, []);

  /* keyboard: arrows, escape, and a simple focus trap */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const onDragEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) go(1);
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) go(-1);
  };

  const neighbours = total > 1 ? [photos[(index + 1) % total], photos[(index - 1 + total) % total]] : [];

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      data-lenis-prevent
      className="fixed inset-0 z-[150] flex flex-col bg-maroon-deep/95 text-ivory backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-8 sm:py-5">
        <p className="text-sm tracking-[0.3em] text-gold" aria-live="polite" aria-atomic="true">
          {index + 1} <span className="text-ivory/40">/</span> {total}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-ivory transition-colors hover:bg-ivory/10"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* stage: clicking the empty space closes */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={slide}
            initial={reduce ? false : "enter"}
            animate="center"
            exit={reduce ? undefined : "exit"}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            drag={total > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={onDragEnd}
            className="relative size-full max-w-6xl cursor-grab touch-pan-y active:cursor-grabbing"
          >
            <Picture photo={photo} sizes="(min-width: 1280px) 1152px, 100vw" fit="contain" priority />
          </motion.div>
        </AnimatePresence>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-1 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-maroon-deep/50 backdrop-blur transition-colors hover:bg-ivory/15 sm:left-5"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-1 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-maroon-deep/50 backdrop-blur transition-colors hover:bg-ivory/15 sm:right-5"
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        )}
      </div>

      <p className="shrink-0 px-6 py-4 text-center font-display text-lg italic text-ivory/75 sm:py-6">
        {photo.caption ?? (photo.placeholder ? "" : photo.alt)}
      </p>

      {/* warm adjacent frames so navigation feels instant */}
      <div className="pointer-events-none absolute size-px overflow-hidden opacity-0" aria-hidden="true">
        {neighbours.map((p) => (
          <div key={p.src} className="relative size-px">
            <Picture photo={p} sizes="(min-width: 1280px) 1152px, 100vw" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
