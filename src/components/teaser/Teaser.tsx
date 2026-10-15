"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { teaser } from "@/data/wedding";
import { teaserVideo } from "@/data/photos";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const controlButton =
  "flex h-10 items-center gap-2 rounded-full bg-cream/90 px-4 text-sm font-semibold text-cocoa shadow-lg backdrop-blur transition-transform hover:scale-105";

/**
 * The teaser film. It autoplays when it scrolls into view and pauses when it leaves,
 * unless the visitor has paused it themselves.
 * It tries to start with sound; browsers only allow that after the visitor has
 * tapped or clicked the page, so otherwise it starts muted and the first tap unmutes it.
 */
export function Teaser() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useRef(false);
  const pausedByVisitor = useRef(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playWithSound = () => {
      video.muted = false;
      video
        .play()
        .then(() => setMuted(false))
        .catch(() => {
          video.muted = true;
          setMuted(true);
          video.play().catch(() => {});
        });
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (!pausedByVisitor.current) playWithSound();
        } else {
          video.pause();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(video);

    // The first tap/click/key anywhere counts as permission for sound.
    const unlock = () => {
      if (inView.current && video.muted && !pausedByVisitor.current) playWithSound();
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      io.disconnect();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByVisitor.current = false;
      video.play().catch(() => {});
    } else {
      pausedByVisitor.current = true;
      video.pause();
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section id="teaser" aria-labelledby="teaser-heading" className="relative overflow-hidden bg-cocoa py-14 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <SectionHeading id="teaser-heading" tone="dark" kn={teaser.kn} title={`${teaser.heading} 🎬`} />

        <Reveal delay={0.15} className="mt-10 sm:mt-12">
          <div className="relative overflow-hidden rounded-3xl bg-espresso shadow-[10px_10px_0_var(--color-amber)] sm:shadow-[14px_14px_0_var(--color-amber)]">
            <video
              ref={videoRef}
              className="block aspect-video w-full cursor-pointer object-cover"
              loop
              playsInline
              muted
              preload="metadata"
              onClick={togglePlay}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            >
              {teaserVideo.webm && <source src={teaserVideo.webm} type="video/webm" />}
              <source src={teaserVideo.mp4} type="video/mp4" />
            </video>

            {/* big centre play button while paused */}
            {!playing && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Play the teaser"
                className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-rust text-cream shadow-xl transition-transform hover:scale-110 sm:size-20"
              >
                <Play className="ml-1 size-7 fill-current sm:size-9" aria-hidden="true" />
              </button>
            )}

            <div className="absolute inset-x-3 bottom-3 flex justify-between gap-2 sm:inset-x-5 sm:bottom-5">
              <button type="button" onClick={togglePlay} aria-label={playing ? "Pause the teaser" : "Play the teaser"} className={controlButton}>
                {playing ? <Pause className="size-4 fill-current" aria-hidden="true" /> : <Play className="size-4 fill-current" aria-hidden="true" />}
                {playing ? "Pause" : "Play"}
              </button>
              <button type="button" onClick={toggleSound} aria-label={muted ? "Turn sound on" : "Turn sound off"} className={controlButton}>
                {muted ? <VolumeX className="size-4" aria-hidden="true" /> : <Volume2 className="size-4" aria-hidden="true" />}
                {muted ? "Tap for sound" : "Sound on"}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
