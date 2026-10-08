"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const round = (n: number) => Math.round(n * 100) / 100;

const pt = (r: number, a: number) =>
  `${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`;

/** Builds the line work of a symmetrical, kolam-inspired rosette. */
function buildRosette(n: number) {
  const step = (Math.PI * 2) / n;
  const half = step / 2;
  const start = -Math.PI / 2;
  let inner = "";
  let outer = "";
  let scallop = "";
  const dotsOuter: [number, number][] = [];
  const dotsMid: [number, number][] = [];

  for (let i = 0; i < n; i++) {
    const a = start + i * step;
    const b = a + half;
    const next = a + step;
    inner += `M${pt(8, a)} C${pt(31, a - step * 0.55)} ${pt(31, a + step * 0.55)} ${pt(8, a)}Z `;
    outer += `M${pt(15, b)} C${pt(46, b - step * 0.45)} ${pt(46, b + step * 0.45)} ${pt(15, b)}Z `;
    scallop += `M${pt(54, a)} Q${pt(46, b)} ${pt(54, next)} `;
    dotsOuter.push([round(Math.cos(a) * 54), round(Math.sin(a) * 54)]);
    dotsMid.push([round(Math.cos(a) * 41), round(Math.sin(a) * 41)]);
  }
  return { inner, outer, scallop, dotsOuter, dotsMid };
}

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 2.6, delay, ease: "easeInOut" },
  }),
};

const fade: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  shown: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, delay, ease: "easeOut" },
  }),
};

interface RangoliProps {
  /** Number of petals (8 to 16 looks best). */
  petals?: number;
  /** Nominal pixel size; also tunes the stroke so lines stay hairline-fine. */
  size?: number;
  className?: string;
  /** Slowly draws itself the first time it scrolls into view. */
  animate?: boolean;
}

/** Fine-lined kolam / rangoli rosette. Colour via `currentColor`. */
export function Rangoli({ petals = 12, size = 120, className, animate = true }: RangoliProps) {
  const reduce = useReducedMotion();
  const rosette = useMemo(() => buildRosette(petals), [petals]);
  const stroke = Math.max(0.55, (120 / size) * 0.85);
  const live = animate && !reduce;

  return (
    <motion.svg
      viewBox="-60 -60 120 120"
      width={size}
      height={size}
      className={cn("block shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      initial={live ? "hidden" : false}
      whileInView="shown"
      viewport={{ once: true, margin: "-8%" }}
    >
      <motion.path d={rosette.inner} variants={draw} custom={0} />
      <motion.path d={rosette.outer} variants={draw} custom={0.5} />
      <motion.path d={rosette.scallop} variants={draw} custom={1} />
      <motion.circle r="7" variants={draw} custom={0.1} />
      <motion.circle r="1.8" fill="currentColor" stroke="none" variants={fade} custom={0.2} />
      {rosette.dotsMid.map(([x, y], i) => (
        <motion.circle key={`m${i}`} cx={x} cy={y} r="1" fill="currentColor" stroke="none" variants={fade} custom={1.4 + i * 0.05} />
      ))}
      {rosette.dotsOuter.map(([x, y], i) => (
        <motion.circle key={`o${i}`} cx={x} cy={y} r="1.3" fill="currentColor" stroke="none" variants={fade} custom={1.6 + i * 0.05} />
      ))}
    </motion.svg>
  );
}
