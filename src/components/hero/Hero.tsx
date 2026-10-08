"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import type { Photo } from "@/types";
import { couple, weddingDate } from "@/data/wedding";
import { EASE_OUT } from "@/lib/utils";
import { Picture } from "@/components/ui/Picture";
import { Kannada } from "@/components/ui/Kannada";

const SLIDE_MS = 4800;

const container: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.25, delayChildren: 0.3 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE_OUT } },
};

/** Alternate the Ken Burns drift direction so the carousel never feels repetitive. */
const ORIGINS = ["50% 40%", "30% 60%", "70% 45%", "55% 70%"];

/** Full-screen photo carousel with just the names, tagline and date. */
export function Hero({ photos }: { photos: Photo[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % photos.length), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [photos.length]);

  const current = photos[index];
  const upcoming = photos.length > 1 ? photos[(index + 1) % photos.length] : null;

  return (
    <section
      id="home"
      aria-label="Welcome"
      className="relative isolate flex h-svh min-h-[30rem] w-full items-end justify-center overflow-hidden bg-maroon-deep"
    >
      <div className="absolute inset-0 -z-10">
        <AnimatePresence initial={false}>
          {current && (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ transformOrigin: ORIGINS[index % ORIGINS.length] }}
                initial={{ scale: reduce ? 1 : 1.02 }}
                animate={{ scale: reduce ? 1 : 1.12 }}
                transition={{ duration: (SLIDE_MS + 2200) / 1000, ease: "linear" }}
              >
                <Picture photo={current} sizes="100vw" priority={index === 0} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* warm the next frame so the crossfade never stalls */}
        {upcoming && (
          <div className="pointer-events-none absolute left-0 top-0 size-px overflow-hidden opacity-0">
            <Picture photo={upcoming} sizes="100vw" />
          </div>
        )}

        {/* soft veil, strongest at the bottom where the text sits */}
        <div className="absolute inset-0 bg-linear-to-b from-maroon-deep/40 via-transparent to-maroon-deep/85" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center px-5 pb-14 text-center text-ivory sm:pb-20"
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="shown"
      >
        <motion.p variants={rise} className="text-legible mb-1 text-lg text-gold sm:text-xl">
          <Kannada>{couple.knGreeting}</Kannada>
        </motion.p>

        <h1 className="text-legible font-script font-normal leading-[1.05] text-[clamp(3.1rem,13vw,8rem)]" aria-label={couple.names}>
          <motion.span variants={rise} className="flex flex-col items-center sm:block" aria-hidden="true">
            <span>{couple.first}</span>
            <span className="text-turmeric sm:mx-4">&amp;</span>
            <span>{couple.second}</span>
          </motion.span>
        </h1>

        <motion.p variants={rise} className="text-legible mt-3 text-2xl text-ivory/95 sm:text-3xl">
          <Kannada>{couple.kn}</Kannada>
        </motion.p>
        <motion.p variants={rise} className="text-legible mt-3 font-display text-lg italic text-ivory/90 sm:text-2xl">
          {couple.tagline}
        </motion.p>
        <motion.p variants={rise} className="text-legible mt-4 text-xs font-bold uppercase tracking-[0.35em] text-gold sm:text-sm">
          <time dateTime="2026-11-20">{weddingDate.display}</time>
        </motion.p>
      </motion.div>
    </section>
  );
}
