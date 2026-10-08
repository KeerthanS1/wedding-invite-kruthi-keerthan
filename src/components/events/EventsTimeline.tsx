import { celebrations, events } from "@/data/wedding";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventCard } from "./EventCard";

/** The four celebrations, in order, as a tidy two-column set of cards. */
export function EventsTimeline() {
  return (
    <section id="celebrations" aria-labelledby="celebrations-heading" className="bg-cream py-14 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-10">
        <SectionHeading id="celebrations-heading" kn={celebrations.kn} title={celebrations.heading} />
        <ol className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6">
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
