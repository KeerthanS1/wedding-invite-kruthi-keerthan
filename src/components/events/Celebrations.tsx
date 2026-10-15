import { Flame, Heart, MapPin, Sparkles, Sun, type LucideIcon } from "lucide-react";
import type { EventIcon, WeddingEvent } from "@/types";
import { celebrations, events, venue } from "@/data/wedding";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Kannada } from "@/components/ui/Kannada";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS: Record<EventIcon, LucideIcon> = { sun: Sun, flame: Flame, sparkles: Sparkles, heart: Heart };

const TONES: Record<WeddingEvent["tone"], { card: string; kn: string; title: string; meta: string; icon: string }> = {
  honey: {
    card: "bg-honey shadow-[6px_6px_0_var(--color-cocoa)]",
    kn: "text-cocoa/80",
    title: "text-cocoa",
    meta: "text-cocoa/80",
    icon: "bg-cream text-amber",
  },
  sand: {
    card: "bg-cream shadow-[6px_6px_0_var(--color-amber)] ring-1 ring-amber/40",
    kn: "text-rust",
    title: "text-cocoa",
    meta: "text-rust",
    icon: "bg-amber text-cream",
  },
  cocoa: {
    card: "bg-cocoa shadow-[6px_6px_0_var(--color-rust)]",
    kn: "text-honey",
    title: "text-cream",
    meta: "text-honey",
    icon: "bg-rust text-cream",
  },
};

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const Icon = ICONS[event.icon];
  const tone = TONES[event.tone];
  return (
    <li>
      <Reveal delay={(index % 2) * 0.1} className="h-full">
        <article
          aria-labelledby={`event-${event.id}`}
          className={cn(
            "flex h-full flex-col items-center rounded-3xl px-5 py-7 text-center transition-transform duration-500 hover:-rotate-1 sm:py-9",
            tone.card,
          )}
        >
          <span className={cn("flex size-11 items-center justify-center rounded-full", tone.icon)}>
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <p className={cn("mt-3 text-xl", tone.kn)}>
            <Kannada>{event.kn}</Kannada>
          </p>
          <h3 id={`event-${event.id}`} className={cn("font-display text-3xl sm:text-4xl", tone.title)}>
            {event.title}
          </h3>
          <p className={cn("mt-2 flex flex-wrap items-center justify-center gap-x-2.5 text-xs font-bold uppercase tracking-[0.16em] sm:text-sm", tone.meta)}>
            <time dateTime={event.isoDate}>{event.date}</time>
            {event.time && (
              <>
                <span aria-hidden="true">•</span>
                <span>{event.time}</span>
              </>
            )}
          </p>
        </article>
      </Reveal>
    </li>
  );
}

function VenueCard() {
  return (
    <Reveal className="mt-5 sm:mt-6">
      <article
        id="venue"
        aria-labelledby="venue-name"
        className="flex flex-col items-center rounded-3xl bg-clay px-5 py-9 text-center text-cream shadow-[6px_6px_0_var(--color-amber)] sm:px-10 sm:py-11"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-cream text-clay">
          <MapPin className="size-5" aria-hidden="true" />
        </span>
        <p className="mt-3 text-xl text-honey">
          <Kannada>{venue.kn}</Kannada>
        </p>
        <h3 id="venue-name" className="text-balance font-display text-2xl sm:text-4xl">
          {venue.name}
        </h3>
        <address className="mt-2 max-w-md text-pretty text-sm not-italic leading-relaxed text-cream/80">{venue.address}</address>
        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-amber px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-cocoa shadow-lg transition-transform hover:scale-105"
        >
          {venue.directionsLabel}
          <span className="sr-only"> (opens Google Maps in a new tab)</span>
        </a>
      </article>
    </Reveal>
  );
}

/** The four celebrations, then where it all happens. */
export function Celebrations() {
  return (
    <section id="celebrations" aria-labelledby="celebrations-heading" className="pulli py-14 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <SectionHeading id="celebrations-heading" kn={celebrations.kn} title={celebrations.heading} />
        <ol className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6">
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </ol>
        <VenueCard />
      </div>
    </section>
  );
}
