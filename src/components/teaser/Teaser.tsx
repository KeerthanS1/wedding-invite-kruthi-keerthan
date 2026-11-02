"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { teaser } from "@/data/wedding";
import { teaserVideo } from "@/data/photos";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Small round icons on phones, so they don't cover the film; icon and label on larger screens. */
const controlBase =
  "flex h-8 w-8 items-center justify-center gap-2 rounded-full bg-cream/85 text-cocoa shadow-md backdrop-blur transition-transform hover:scale-105 sm:h-10 sm:bg-cream/90 sm:text-sm sm:font-semibold sm:shadow-lg";
const controlButton = `${controlBase} sm:w-auto sm:px-4`;
const controlIcon = "size-3.5 sm:size-4";
const controlLabel = "hidden sm:inline";

/** iPhones can only show the video itself full screen, through this older call. */
type FullscreenVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitDisplayingFullscreen?: boolean;
};

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
        } else if (document.fullscreenElement !== video && !(video as FullscreenVideo).webkitDisplayingFullscreen) {
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

  const openFullscreen = () => {
    const video = videoRef.current as FullscreenVideo | null;
    if (!video) return;
    if (video.requestFullscreen) {
      video
        .requestFullscreen()
        .then(() => {
          // Android: turn sideways to fill the screen (other browsers refuse, which is fine)
          const orientation = screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> };
          orientation.lock?.("landscape").catch(() => {});
        })
        .catch(() => video.webkitEnterFullscreen?.());
    } else {
      video.webkitEnterFullscreen?.();
    }
  };

  return (
    <section id="teaser" aria-labelledby="teaser-heading" className="relative overflow-hidden bg-cocoa py-14 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <SectionHeading id="teaser-heading" tone="dark" kn={teaser.kn} title={`${teaser.heading} 🎬`} />

        <Reveal delay={0.15} className="mt-10 sm:mt-12">
          <div className="relative overflow-hidden rounded-3xl bg-espresso shadow-[10px_10px_0_var(--color-amber)] sm:shadow-[14px_14px_0_var(--color-amber)]">
            <video
              ref={videoRef}
              className="block aspect-video w-full cursor-pointer object-cover [&:fullscreen]:object-contain"
              loop
              playsInline
              muted
              preload="metadata"
              // full screen has the browser's own controls, which handle taps themselves
              onClick={() => {
                if (document.fullscreenElement !== videoRef.current) togglePlay();
              }}
              onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
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

            <div className="absolute inset-x-2 bottom-2 flex justify-between gap-2 sm:inset-x-5 sm:bottom-5">
              <button type="button" onClick={togglePlay} aria-label={playing ? "Pause the teaser" : "Play the teaser"} className={controlButton}>
                {playing ? <Pause className={`${controlIcon} fill-current`} aria-hidden="true" /> : <Play className={`${controlIcon} fill-current`} aria-hidden="true" />}
                <span className={controlLabel}>{playing ? "Pause" : "Play"}</span>
              </button>
              <div className="flex gap-2">
                <button type="button" onClick={toggleSound} aria-label={muted ? "Turn sound on" : "Turn sound off"} className={controlButton}>
                  {muted ? <VolumeX className={controlIcon} aria-hidden="true" /> : <Volume2 className={controlIcon} aria-hidden="true" />}
                  <span className={controlLabel}>{muted ? "Tap for sound" : "Sound on"}</span>
                </button>
                <button type="button" onClick={openFullscreen} aria-label="Watch the teaser full screen" className={`${controlBase} sm:w-10`}>
                  <Maximize className={controlIcon} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
