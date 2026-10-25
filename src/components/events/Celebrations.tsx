import { Flame, Heart, House, MapPin, Sparkles, Sun, type LucideIcon } from "lucide-react";
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

/** One celebration on the timeline: a small card with its icon, Kannada and English names and time. */
function TimelineEvent({ event, alignRight }: { event: WeddingEvent; alignRight: boolean }) {
  const Icon = ICONS[event.icon];
  const tone = TONES[event.tone];
  const big = event.id === "muhurtham";
  return (
    <li>
      <article
        aria-labelledby={`event-${event.id}`}
        className={cn(
          "relative flex items-center gap-4 rounded-2xl px-4 py-4 transition-transform duration-500 hover:-translate-y-0.5 sm:px-5 sm:py-5",
          alignRight && "md:flex-row-reverse md:text-right",
          tone.card,
        )}
      >
        <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-full", tone.icon)}>
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          {big && (
            <p className="mb-1 inline-block rounded-full bg-rust px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-cream">
              The big day ✨
            </p>
          )}
          <p className={cn("text-lg leading-tight", tone.kn)}>
            <Kannada>{event.kn}</Kannada>
          </p>
          <h4 id={`event-${event.id}`} className={cn("font-display text-2xl leading-tight sm:text-3xl", tone.title)}>
            {event.title}
          </h4>
          {event.time && (
            <p className={cn("mt-1 text-xs font-bold uppercase tracking-[0.16em] sm:text-sm", tone.meta)}>{event.time}</p>
          )}
          {event.place && (
            <p
              className={cn(
                "mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-cream/70 px-2.5 py-0.5 text-xs font-semibold text-cocoa",
                alignRight && "md:flex-row-reverse",
              )}
            >
              <House className="size-3.5" aria-hidden="true" />
              <span>{event.place.en}</span>
              <span aria-hidden="true">·</span>
              <Kannada className="text-sm">{event.place.kn}</Kannada>
            </p>
          )}
        </div>
      </article>
    </li>
  );
}

interface Day {
  iso: string;
  dayNumber: string;
  month: string;
  weekday: string;
  events: WeddingEvent[];
}

/** Groups the celebrations by date, in order. */
function groupByDay(list: WeddingEvent[]): Day[] {
  const days: Day[] = [];
  for (const event of list) {
    let day = days.find((d) => d.iso === event.isoDate);
    if (!day) {
      const date = new Date(`${event.isoDate}T12:00:00+05:30`);
      const part = (opts: Intl.DateTimeFormatOptions) => date.toLocaleDateString("en-IN", { ...opts, timeZone: "Asia/Kolkata" });
      day = { iso: event.isoDate, dayNumber: part({ day: "numeric" }), month: part({ month: "short" }), weekday: part({ weekday: "long" }), events: [] };
      days.push(day);
    }
    day.events.push(event);
  }
  return days;
}

/**
 * A vertical timeline. On phones the line runs down the left with each day's date medallion on it;
 * on wider screens the line is centred and the days alternate left and right.
 */
function Timeline() {
  const days = groupByDay(events);
  return (
    <div className="relative mt-12 sm:mt-14">
      {/* the thread that ties the days together */}
      <span
        aria-hidden="true"
        className="absolute bottom-4 left-8 top-4 w-0.5 -translate-x-1/2 rounded-full bg-linear-to-b from-amber via-rust to-cocoa md:left-1/2"
      />
      <ol className="relative space-y-10 sm:space-y-12">
        {days.map((day, i) => {
          const right = i % 2 === 1; // desktop: alternate sides
          return (
            <li key={day.iso}>
              <Reveal y={24} duration={1}>
                <div className="grid grid-cols-[4rem_1fr] items-start gap-x-4 md:grid-cols-[1fr_6rem_1fr] md:gap-x-8">
                  {/* date medallion, sitting on the line */}
                  <div className="col-start-1 row-start-1 flex flex-col items-center md:col-start-2">
                    <div className="flex size-16 flex-col items-center justify-center rounded-full bg-cocoa text-cream shadow-lg ring-4 ring-cream md:size-24">
                      <span className="font-display text-2xl leading-none md:text-4xl">{day.dayNumber}</span>
                      <span className="mt-0.5 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-honey md:text-xs">{day.month}</span>
                    </div>
                    <span className="mt-2 rounded-full bg-cream px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-cocoa/70 md:text-[0.65rem]">
                      Day {i + 1}
                    </span>
                  </div>

                  {/* that day's celebrations */}
                  <div
                    className={cn(
                      "col-start-2 row-start-1 md:pt-3",
                      right ? "md:col-start-3" : "md:col-start-1",
                    )}
                  >
                    <h3 className={cn("mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rust", !right && "md:text-right")}>
                      <time dateTime={day.iso}>
                        {day.weekday}, {day.dayNumber} {day.month}
                      </time>
                    </h3>
                    <ul className="space-y-3">
                      {day.events.map((event) => (
                        <TimelineEvent key={event.id} event={event} alignRight={!right} />
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * The venue, over an outline of the real streets around it (drawn from OpenStreetMap,
 * see public/images/venue-map.svg). The map is placed so the mantapa sits right under the pin:
 * top-centre on phones, right of the text on wider screens.
 */
function VenueCard() {
  return (
    <Reveal className="mt-12 sm:mt-14">
      <article
        id="venue"
        aria-labelledby="venue-name"
        className="relative isolate overflow-hidden rounded-3xl bg-clay text-cream shadow-[6px_6px_0_var(--color-amber)]"
      >
        {/* outline street map, centred on the venue (1300 m across) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-28 -z-10 size-[56rem] -translate-x-1/2 -translate-y-1/2 sm:left-[76%] sm:top-1/2 sm:size-[81rem]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- a tiny static SVG, no optimisation needed */}
          <img src="/images/venue-map.svg" alt="" className="size-full" />
        </div>
        {/* soften the map where the text sits */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-transparent via-clay/70 to-clay sm:bg-linear-to-r sm:from-clay sm:via-clay/85 sm:to-transparent"
        />

        {/* the pin, exactly on the mantapa */}
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-28 -translate-x-1/2 -translate-y-full sm:left-[76%] sm:top-1/2">
          <span className="absolute bottom-0 left-1/2 size-10 -translate-x-1/2 translate-y-1/2 animate-ping rounded-full bg-amber/50" />
          <span className="absolute bottom-0 left-1/2 size-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-amber" />
          <MapPin className="relative size-11 fill-rust text-cream drop-shadow-lg" strokeWidth={1.5} />
        </div>

        <div className="relative flex flex-col items-center px-5 pb-9 pt-52 text-center sm:max-w-[58%] sm:items-start sm:px-10 sm:py-12 sm:text-left">
          <p className="text-xl text-honey">
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
        </div>

        <p className="absolute bottom-1.5 right-3 text-[0.55rem] text-cream/45">Map data © OpenStreetMap contributors</p>
      </article>
    </Reveal>
  );
}

/** The celebrations as a three-day timeline, then where it all happens. */
export function Celebrations() {
  return (
    <section id="celebrations" aria-labelledby="celebrations-heading" className="pulli py-14 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <SectionHeading id="celebrations-heading" kn={celebrations.kn} title={celebrations.heading} />
        <Timeline />
        <VenueCard />
      </div>
    </section>
  );
}
