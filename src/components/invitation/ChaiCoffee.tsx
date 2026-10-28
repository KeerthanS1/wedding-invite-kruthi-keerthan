"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn, EASE_OUT } from "@/lib/utils";

/** The chai glass and the coffee cup glide in from either side and meet at a beating heart. */
export function ChaiCoffee({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const slide = (from: number) => ({
    initial: reduce ? false : { opacity: 0, x: from, rotate: from > 0 ? 8 : -8 },
    whileInView: { opacity: 1, x: 0, rotate: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 1.2, ease: EASE_OUT },
  });

  return (
    <div className={cn("flex items-end justify-center gap-2 sm:gap-4", className)} aria-hidden="true">
      <motion.div {...slide(-60)} className="relative">
        <span className="absolute inset-x-0 -bottom-1 h-5 bg-[radial-gradient(closest-side,rgb(74_44_24/0.18),transparent)]" />
        <Image src="/images/icons/chai-cup.png" alt="" width={256} height={256} unoptimized className="relative size-24 sm:size-28" />
      </motion.div>
      <svg viewBox="0 0 30 28" className="heartbeat mb-9 size-7 shrink-0 self-center text-rust sm:size-8" focusable="false">
        <path d="M15 27 C4 19 0 12 4 6 C7 2 13 2 15 7 C17 2 23 2 26 6 C30 12 26 19 15 27Z" fill="currentColor" />
      </svg>
      <motion.div {...slide(60)} className="relative">
        <span className="absolute inset-x-0 -bottom-1 h-5 bg-[radial-gradient(closest-side,rgb(74_44_24/0.18),transparent)]" />
        <Image src="/images/icons/coffee-cup.png" alt="" width={256} height={256} unoptimized className="relative size-24 sm:size-28" />
      </motion.div>
    </div>
  );
}
