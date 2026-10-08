"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Rangoli } from "./Rangoli";

interface KolamDividerProps {
  className?: string;
  /** Rosette size in px */
  size?: number;
}

/** A hairline rule that draws outward from a small kolam rosette. */
export function KolamDivider({ className, size = 52 }: KolamDividerProps) {
  const reduce = useReducedMotion();
  const line = (origin: "left" | "right") => (
    <motion.span
      aria-hidden="true"
      className={cn(
        "relative block h-px w-full max-w-28 bg-current opacity-60 sm:max-w-44",
        origin === "left" ? "origin-right" : "origin-left",
      )}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 1.6, delay: 0.8, ease: "easeOut" }}
    >
      <span
        className={cn(
          "absolute top-1/2 size-1.5 -translate-y-1/2 rotate-45 bg-current",
          origin === "left" ? "left-0" : "right-0",
        )}
      />
    </motion.span>
  );

  return (
    <div className={cn("flex items-center justify-center gap-3 text-brass", className)} role="presentation">
      {line("left")}
      <Rangoli petals={8} size={size} />
      {line("right")}
    </div>
  );
}
