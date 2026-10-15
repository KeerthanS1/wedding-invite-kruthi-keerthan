"use client";

import { useEffect, useState } from "react";
import { countdown, weddingDate } from "@/data/wedding";
import { getTimeLeft, type TimeLeft } from "@/lib/countdown";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pad = (n: number) => String(n).padStart(2, "0");

function Unit({ value, label, tilt }: { value: string; label: string; tilt: string }) {
  return (
    <div className={cn("flex flex-col items-center rounded-2xl bg-cream px-1 py-4 shadow-[5px_5px_0_var(--color-cocoa)] sm:px-6 sm:py-7", tilt)}>
      <div className="relative h-[1em] overflow-hidden font-display text-[clamp(1.9rem,8vw,4.5rem)] leading-none tabular-nums text-cocoa">
        <span key={value} className="digit block">
          {value}
        </span>
      </div>
      <span className="mt-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-rust sm:text-xs sm:tracking-[0.3em]">
        {label}
      </span>
    </div>
  );
}

/** Live countdown to the Muhurtham (20 Nov 2026, 9:15 AM IST). */
export function Countdown() {
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setLeft(getTimeLeft(weddingDate.ceremonyISO));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const placeholder = "––";
  const done = left?.done ?? false;

  return (
    <section id="countdown" aria-labelledby="countdown-heading" className="bg-amber py-14 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
        <SectionHeading id="countdown-heading" kn={countdown.kn} title={countdown.heading} divider={false} className="[&_p]:text-cocoa" />

        <Reveal delay={0.2}>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-cocoa/80 sm:text-sm">
            {weddingDate.display} · {weddingDate.ceremonyTimeLabel}
          </p>
        </Reveal>

        {done ? (
          <Reveal className="mt-8">
            <p className="text-balance font-display text-2xl text-cocoa sm:text-4xl">{countdown.doneMessage}</p>
          </Reveal>
        ) : (
          <Reveal className="mt-8 sm:mt-10" delay={0.15}>
            <div role="timer" aria-label="Time remaining until the wedding ceremony" className="grid grid-cols-4 gap-2.5 sm:gap-5">
              <Unit label="Days" tilt="-rotate-2" value={left ? String(left.days) : placeholder} />
              <Unit label="Hours" tilt="rotate-1" value={left ? pad(left.hours) : placeholder} />
              <Unit label="Minutes" tilt="-rotate-1" value={left ? pad(left.minutes) : placeholder} />
              <Unit label="Seconds" tilt="rotate-2" value={left ? pad(left.seconds) : placeholder} />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
