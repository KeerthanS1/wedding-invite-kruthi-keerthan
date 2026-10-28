"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { Photo } from "@/types";
import { couple, weddingDate } from "@/data/wedding";
import { cn, EASE_OUT } from "@/lib/utils";
import { Kannada } from "@/components/ui/Kannada";
import { ScriptName } from "@/components/ui/ScriptName";

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

type SetKey = "desktop" | "mobile";

/** The shuffled play order for one carousel, and where we are in it. */
interface SlideState {
  /** slide indexes in the order they play (shuffled fresh on every page load) */
  order: number[];
  /** current position in `order` */
  pos: number;
  /** previous position (still shown underneath while the next photo fades in), or -1 */
  prevPos: number;
}

/** A URL from Next's image optimiser: resized to `w` pixels wide and compressed (WebP). */
const optimised = (src: string, w: number) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=90`;

/**
 * Each slide is painted as a CSS background rather than an <img>: browsers never download a
 * background for something that isn't displayed, so only the current, previous and next photos
 * load. The size is picked per screen pixel density and the tiny blurred
 * preview sits underneath until the full photo arrives.
 */
function slideStyle(photo: Photo, set: SetKey, i: number): React.CSSProperties {
  const widths = set === "mobile" ? [640, 1080, 1200] : [1920, 3840];
  // the browser picks the size matching the screen's pixel density
  const sources = widths.map((w, k) => `url("${optimised(photo.src, w)}") ${k + 1}x`).join(", ");
  const layers = [`image-set(${sources})`];
  if (photo.blur) layers.push(`url("${photo.blur}")`); // tiny blurred preview underneath
  return {
    backgroundImage: layers.join(", "),
    backgroundPosition: photo.position,
    transformOrigin: ORIGINS[i % ORIGINS.length],
  };
}

function Slides({
  set,
  photos,
  state,
}: {
  set: SetKey;
  photos: Photo[];
  state: SlideState | null;
}) {
  const n = photos.length;
  const activeIdx = state ? state.order[state.pos] : -1;
  const nextIdx = state && n > 1 ? state.order[(state.pos + 1) % n] : -1;
  const prevIdx = state && state.prevPos >= 0 ? state.order[state.prevPos] : -1;
  return (
    <div
      data-hero-set={set}
      // <PickFirstPhoto /> adds data-order / slide classes before React loads
      suppressHydrationWarning
      className={cn("absolute inset-0", set === "desktop" ? "hidden md:block" : "md:hidden")}
    >
      {photos.map((photo, i) => {
        const active = activeIdx === i;
        const next = nextIdx === i && !active;
        const prev = prevIdx === i && !active;
        return (
          <div
            key={photo.src}
            data-slide={i}
            data-preload={set === "mobile" ? `${optimised(photo.src, 640)} 1x, ${optimised(photo.src, 1080)} 2x, ${optimised(photo.src, 1200)} 3x` : `${optimised(photo.src, 1920)} 1x, ${optimised(photo.src, 3840)} 2x`}
            suppressHydrationWarning
            className={cn("hero-slide", active && "is-active", next && "is-next", prev && "is-prev")}
          >
            <div
              role="img"
              aria-label={photo.alt}
              className="hero-zoom hero-bg absolute inset-0"
              style={slideStyle(photo, set, i)}
            />
          </div>
        );
      })}
    </div>
  );
}

/** Full-screen photo carousel (separate sets for phones and larger screens) with the names and date. */
export function Hero({ photos, mobilePhotos }: { photos: Photo[]; mobilePhotos: Photo[] }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [slides, setSlides] = useState<Record<SetKey, SlideState> | null>(null);
  const [tick, setTick] = useState(0); // restarts the timer after a manual dot click

  // Pick up the random order chosen by the inline script, and follow the screen size.
  useEffect(() => {
    const section = sectionRef.current;
    const start = (set: SetKey, count: number): SlideState => {
      const raw = section?.querySelector(`[data-hero-set="${set}"]`)?.getAttribute("data-order");
      const order = raw ? raw.split(",").map(Number) : [];
      const valid = order.length === count && order.every((i) => i >= 0 && i < count);
      return { order: valid ? order : Array.from({ length: count }, (_, i) => i), pos: 0, prevPos: -1 };
    };
    // the order was shuffled outside React, before load (see PickFirstPhoto)
    setSlides({ desktop: start("desktop", photos.length), mobile: start("mobile", mobilePhotos.length) });
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- read once, on load
  }, []);

  const activeSet: SetKey = isMobile ? "mobile" : "desktop";
  const activePhotos = isMobile ? mobilePhotos : photos;

  const goTo = (set: SetKey, pos: number) =>
    setSlides((s) => (s && s[set].pos !== pos ? { ...s, [set]: { ...s[set], pos, prevPos: s[set].pos } } : s));

  useEffect(() => {
    if (!slides || isMobile === null || activePhotos.length < 2) return;
    const id = window.setInterval(() => {
      setSlides((s) => {
        if (!s) return s;
        const cur = s[activeSet];
        return { ...s, [activeSet]: { ...cur, pos: (cur.pos + 1) % activePhotos.length, prevPos: cur.pos } };
      });
    }, SLIDE_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- restart only when the set, its size or a manual pick changes
  }, [Boolean(slides), isMobile, activePhotos.length, tick]);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Welcome"
      className="relative isolate flex h-[86svh] min-h-[30rem] w-full items-end justify-center overflow-hidden bg-espresso md:h-svh md:min-h-[32rem]"
    >
      <div className="absolute inset-0 -z-10">
        <Slides set="desktop" photos={photos} state={slides?.desktop ?? null} />
        <Slides set="mobile" photos={mobilePhotos} state={slides?.mobile ?? null} />
        <div className="absolute inset-0 z-10 bg-linear-to-b from-espresso/30 via-transparent to-espresso/85" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center px-5 pb-16 text-center text-cream sm:pb-20"
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="shown"
      >
        <h1 className="text-legible font-script font-normal leading-[1.05] whitespace-nowrap text-[clamp(2.4rem,10.5vw,7.5rem)]" aria-label={couple.names}>
          <motion.span variants={rise} className="block" aria-hidden="true">
            <ScriptName name={couple.first} />
            <span className="mx-2 text-honey sm:mx-4">&amp;</span>
            <span>{couple.second}</span>
          </motion.span>
        </h1>

        <motion.p variants={rise} className="text-legible mt-2 text-3xl text-cream sm:text-4xl">
          <Kannada>{couple.kn}</Kannada>
        </motion.p>
      </motion.div>

      {/* the date, quietly, in the top-right corner */}
      <motion.p
        initial={reduce ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: EASE_OUT }}
        className="text-legible absolute right-4 top-4 z-10 rounded-full border border-cream/40 bg-espresso/25 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-cream backdrop-blur-sm sm:right-6 sm:top-6 sm:text-xs"
      >
        <time dateTime={weddingDate.iso}>{weddingDate.display}</time>
      </motion.p>

      {(["desktop", "mobile"] as const).map((set) => {
        const list = set === "desktop" ? photos : mobilePhotos;
        if (list.length < 2) return null;
        return (
          <div
            key={set}
            className={cn("absolute inset-x-0 bottom-6 z-10 justify-center gap-2.5", set === "desktop" ? "hidden md:flex" : "flex md:hidden")}
          >
            {/* one dot per step in the (shuffled) play order */}
            {list.map((_, i) => {
              const current = slides?.[set].pos === i;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show photo ${i + 1} of ${list.length}`}
                  aria-current={current ? "true" : undefined}
                  onClick={() => {
                    goTo(set, i);
                    setTick((t) => t + 1);
                  }}
                  className="flex size-6 items-center justify-center"
                >
                  <span className={cn("block h-1.5 rounded-full transition-all duration-500", current ? "w-6 bg-honey" : "w-1.5 bg-cream/60")} />
                </button>
              );
            })}
          </div>
        );
      })}
    </section>
  );
}
