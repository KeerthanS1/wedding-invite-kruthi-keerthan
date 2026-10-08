"use client";

import { Flame, Heart, Sparkles, Sun, type LucideIcon } from "lucide-react";
import type { EventIcon, WeddingEvent } from "@/types";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Kannada } from "@/components/ui/Kannada";

const ICONS: Record<EventIcon, LucideIcon> = {
  sun: Sun,
  flame: Flame,
  sparkles: Sparkles,
  heart: Heart,
};

/** One celebration, as a simple invitation card. */
export function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const Icon = ICONS[event.icon];
  const dark = !!event.highlight;

  return (
    <li>
      <Reveal delay={(index % 2) * 0.1} className="h-full">
        <article
          aria-labelledby={`event-${event.id}`}
          className={cn(
            "flex h-full flex-col items-center border p-5 text-center sm:p-8",
            dark ? "border-gold/60 bg-maroon text-ivory" : "border-brass/50 bg-ivory",
          )}
        >
          <Icon className={cn("size-5", dark ? "text-gold" : "text-brass")} aria-hidden="true" />
          <p className={cn("mt-2 text-lg", dark ? "text-gold" : "text-vermilion")}>
            <Kannada>{event.kn}</Kannada>
          </p>
          <h3
            id={`event-${event.id}`}
            className={cn(
              "mt-1 font-display text-2xl font-medium uppercase tracking-[0.08em] sm:text-3xl",
              dark ? "text-ivory" : "text-maroon",
            )}
          >
            {event.title}
          </h3>
          <p
            className={cn(
              "mt-3 flex flex-wrap items-center justify-center gap-x-3 text-xs font-bold uppercase tracking-[0.14em] sm:text-sm",
              dark ? "text-gold" : "text-vermilion",
            )}
          >
            <time dateTime={event.isoDate}>{event.date}</time>
            {event.time && (
              <>
                <span aria-hidden="true" className="size-1 rotate-45 bg-current" />
                <span>{event.time}</span>
              </>
            )}
          </p>
          <p className={cn("mt-3 text-pretty text-sm leading-relaxed sm:text-base", dark ? "text-ivory/85" : "text-ink/80")}>
            {event.description}
          </p>
        </article>
      </Reveal>
    </li>
  );
}
