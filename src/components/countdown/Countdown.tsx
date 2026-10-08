"use client";

import { useEffect, useState } from "react";
import { countdown, weddingDate } from "@/data/wedding";
import { getTimeLeft, type TimeLeft } from "@/lib/countdown";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pad = (n: number) => String(n).padStart(2, "0");

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center border border-gold/50 bg-maroon-deep/40 px-1 py-4 sm:px-6 sm:py-8">
      <div className="relative h-[1em] overflow-hidden font-display text-[clamp(1.9rem,8vw,4.5rem)] font-medium leading-none tabular-nums text-ivory">
        <span key={value} className="digit block">
          {value}
        </span>
      </div>
      <span className="mt-3 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-gold sm:text-xs sm:tracking-[0.35em]">
        {label}
      </span>
    </div>
  );
}

/** Live countdown to the Muhurtham (20 Oct 2026, 9:15 AM IST). */
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
    <section id="countdown" aria-labelledby="countdown-heading" className="bg-maroon-deep py-14 text-ivory sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-10">
        <SectionHeading id="countdown-heading" tone="dark" kn={countdown.kn} title={countdown.heading} />

        <Reveal delay={0.2}>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-gold sm:text-sm">
            {weddingDate.display} · {weddingDate.ceremonyTimeLabel}
          </p>
        </Reveal>

        {done ? (
          <Reveal className="mt-8">
            <p className="text-balance font-display text-2xl italic leading-snug sm:text-4xl">{countdown.doneMessage}</p>
          </Reveal>
        ) : (
          <Reveal className="mt-8 sm:mt-12" delay={0.15}>
            <div role="timer" aria-label="Time remaining until the wedding ceremony" className="grid grid-cols-4 gap-2 sm:gap-5">
              <Unit label="Days" value={left ? String(left.days) : placeholder} />
              <Unit label="Hours" value={left ? pad(left.hours) : placeholder} />
              <Unit label="Minutes" value={left ? pad(left.minutes) : placeholder} />
              <Unit label="Seconds" value={left ? pad(left.seconds) : placeholder} />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
