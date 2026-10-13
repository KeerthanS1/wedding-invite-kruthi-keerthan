"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { teaser } from "@/data/wedding";
import { teaserVideo } from "@/data/photos";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The teaser film. It plays when it scrolls into view and pauses when it leaves.
 * It tries to start with sound; browsers only allow that after the visitor has
 * tapped or clicked the page, so otherwise it starts muted and the first tap unmutes it.
 */
export function Teaser() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useRef(false);
  const [muted, setMuted] = useState(true);

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
        if (entry.isIntersecting) playWithSound();
        else video.pause();
      },
      { threshold: 0.45 },
    );
    io.observe(video);

    // The first tap/click/key anywhere counts as permission for sound.
    const unlock = () => {
      if (inView.current && video.muted) playWithSound();
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      io.disconnect();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (video.paused) video.play().catch(() => {});
  };

  return (
    <section id="teaser" aria-labelledby="teaser-heading" className="relative overflow-hidden bg-plum py-14 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <SectionHeading id="teaser-heading" tone="dark" kn={teaser.kn} title={`${teaser.heading} 🎬`} />

        <Reveal delay={0.15} className="mt-10 sm:mt-12">
          <div className="relative overflow-hidden rounded-3xl bg-plum-deep shadow-[10px_10px_0_var(--color-marigold)] sm:shadow-[14px_14px_0_var(--color-marigold)]">
            <video
              ref={videoRef}
              className="block aspect-video w-full object-cover"
              loop
              playsInline
              muted
              preload="metadata"
              onClick={toggleSound}
            >
              {teaserVideo.webm && <source src={teaserVideo.webm} type="video/webm" />}
              <source src={teaserVideo.mp4} type="video/mp4" />
            </video>

            <button
              type="button"
              onClick={toggleSound}
              aria-label={muted ? "Turn sound on" : "Turn sound off"}
              className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-cream/90 px-4 py-2 text-sm font-semibold text-plum shadow-lg backdrop-blur transition-transform hover:scale-105 sm:bottom-5 sm:right-5"
            >
              {muted ? <VolumeX className="size-4" aria-hidden="true" /> : <Volume2 className="size-4" aria-hidden="true" />}
              {muted ? "Tap for sound" : "Sound on"}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
