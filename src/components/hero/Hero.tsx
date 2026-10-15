"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import type { Photo } from "@/types";
import { couple, weddingDate } from "@/data/wedding";
import { cn, EASE_OUT } from "@/lib/utils";
import { Picture } from "@/components/ui/Picture";
import { Kannada } from "@/components/ui/Kannada";

const SLIDE_MS = 4500;

const container: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.22, delayChildren: 0.3 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE_OUT } },
};

/** Alternate the Ken Burns drift so the carousel never feels repetitive. */
const ORIGINS = ["50% 40%", "30% 60%", "70% 45%", "55% 70%"];

/** Full-screen photo carousel with the names and date. */
/** Fisher–Yates shuffle (returns a new array). */
function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function Hero({ photos: allPhotos }: { photos: Photo[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  // A fresh random order on every visit. It is chosen in the browser after load,
  // so the page HTML stays the same for everyone; the first photo fades in.
  const [photos, setPhotos] = useState<Photo[]>([]);
  useEffect(() => {
    // Randomness must not run during server render, so this is set once after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhotos(shuffle(allPhotos));
  }, [allPhotos]);
  const [tick, setTick] = useState(0); // restarts the timer after a manual dot click

  useEffect(() => {
    if (photos.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % photos.length), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [photos.length, tick]);

  const current = photos[index];
  const upcoming = photos.length > 1 ? photos[(index + 1) % photos.length] : null;

  return (
    <section
      id="home"
      aria-label="Welcome"
      className="relative isolate flex h-svh min-h-[32rem] w-full items-end justify-center overflow-hidden bg-espresso"
    >
      <div className="absolute inset-0 -z-10">
        <AnimatePresence>
          {current && (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ transformOrigin: ORIGINS[index % ORIGINS.length] }}
                initial={{ scale: reduce ? 1 : 1.02 }}
                animate={{ scale: reduce ? 1 : 1.12 }}
                transition={{ duration: (SLIDE_MS + 2000) / 1000, ease: "linear" }}
              >
                {current.portrait ? (
                  <>
                    {/* tall photo: full-bleed on phones; on wide screens a soft blurred
                        fill behind the whole photo, so no faces get cropped */}
                    <Picture
                      photo={current}
                      sizes="100vw"
                      className="landscape:scale-110 landscape:opacity-60 landscape:blur-2xl"
                    />
                    <div className="absolute inset-0 hidden landscape:block">
                      <Picture photo={current} sizes="100vw" fit="contain" />
                    </div>
                  </>
                ) : (
                  <Picture photo={current} sizes="100vw" />
                )}
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

        <div className="absolute inset-0 bg-linear-to-b from-espresso/30 via-transparent to-espresso/85" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center px-5 pb-20 text-center text-cream sm:pb-24"
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="shown"
      >
        <h1 className="text-legible font-script font-normal leading-[1.05] whitespace-nowrap text-[clamp(2.4rem,10.5vw,7.5rem)]" aria-label={couple.names}>
          <motion.span variants={rise} className="block" aria-hidden="true">
            <span>{couple.first}</span>
            <span className="mx-2 text-honey sm:mx-4">&amp;</span>
            <span>{couple.second}</span>
          </motion.span>
        </h1>

        <motion.p variants={rise} className="text-legible mt-2 text-3xl text-cream sm:text-4xl">
          <Kannada>{couple.kn}</Kannada>
        </motion.p>

        <motion.p
          variants={rise}
          className="mt-5 rounded-full bg-rust px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-cream shadow-lg shadow-espresso/40 sm:text-sm"
        >
          <time dateTime={weddingDate.iso}>{weddingDate.display}</time>
        </motion.p>
      </motion.div>

      {photos.length > 1 && (
        <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2.5">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              aria-label={`Show photo ${i + 1} of ${photos.length}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => {
                setIndex(i);
                setTick((t) => t + 1);
              }}
              className="flex size-6 items-center justify-center"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-500",
                  i === index ? "w-6 bg-honey" : "w-1.5 bg-cream/60",
                )}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
