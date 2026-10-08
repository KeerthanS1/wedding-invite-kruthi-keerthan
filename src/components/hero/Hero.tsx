"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { Photo } from "@/types";
import { couple, weddingDate } from "@/data/wedding";
import { heroVideo } from "@/data/photos";
import { EASE_OUT } from "@/lib/utils";
import { Picture } from "@/components/ui/Picture";
import { Kannada } from "@/components/ui/Kannada";

const container: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.25, delayChildren: 0.3 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE_OUT } },
};

/**
 * Full-screen background film with the names, tagline and date over it.
 * The poster photo shows while the video loads, and stays for reduced-motion visitors.
 */
export function Hero({ poster }: { poster?: Photo }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      aria-label="Welcome"
      className="relative isolate flex h-svh min-h-[30rem] w-full items-end justify-center overflow-hidden bg-maroon-deep"
    >
      <div className="absolute inset-0 -z-10">
        {poster && <Picture photo={poster} sizes="100vw" priority />}
        {!reduce && (
          <video
            className="absolute inset-0 size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={poster?.src.endsWith(".svg") ? undefined : poster?.src}
            aria-hidden="true"
            tabIndex={-1}
          >
            {heroVideo.webm && <source src={heroVideo.webm} type="video/webm" />}
            <source src={heroVideo.mp4} type="video/mp4" />
          </video>
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
