import { MapPin } from "lucide-react";
import { venue, weddingDate, events } from "@/data/wedding";
import { Kannada } from "@/components/ui/Kannada";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Pillar } from "@/components/decorative/Pillar";
import { BrassLamp } from "@/components/decorative/BrassLamp";
import { Rangoli } from "@/components/decorative/Rangoli";
import { TempleBorder } from "@/components/decorative/TempleBorder";
import { Toran } from "@/components/decorative/FloralDecor";

/** Little gopuram-style finial: kalasam over a stepped lintel. */
function Kalasam() {
  return (
    <svg viewBox="0 0 120 56" className="mx-auto block h-12 w-28 text-brass" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true" focusable="false">
      <path d="M60 2 L60 10 M56 6 H64" />
      <path d="M52 22 Q52 12 60 12 Q68 12 68 22 Q70 28 60 30 Q50 28 52 22Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M30 40 L44 30 H76 L90 40Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M14 52 L30 40 H90 L106 52Z" fill="currentColor" fillOpacity="0.1" />
    </svg>
  );
}

export function Venue() {
  const muhurtham = events.find((e) => e.id === "muhurtham");

  return (
    <section id="venue" aria-labelledby="venue-heading" className="paper relative overflow-hidden py-14 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-10">
        <SectionHeading id="venue-heading" title={venue.heading} kn={venue.kn} />

        {/* the mandapam doorway */}
        <Reveal className="mt-8 sm:mt-14" duration={1.5}>
          <div className="relative mx-auto max-w-3xl">
            <Kalasam />
            <div className="relative -mt-px border-x border-t border-brass/60 bg-sandal/50">
              <TempleBorder />
              <Toran className="px-3" count={22} />
            </div>

            <div className="relative grid grid-cols-[2.25rem_1fr_2.25rem] sm:grid-cols-[5rem_1fr_5rem]">
              <div className="text-brass/70">
                <Pillar />
              </div>

              <div className="relative border-y-0 bg-ivory px-3 py-9 text-center shadow-[inset_0_0_80px_rgba(168,128,58,0.14)] sm:px-10 sm:py-14">
                <div className="pointer-events-none absolute left-2 top-2 hidden sm:block">
                  <BrassLamp className="h-16 w-7" />
                </div>
                <div className="pointer-events-none absolute right-2 top-2 hidden sm:block">
                  <BrassLamp className="h-16 w-7" />
                </div>

                <h3 className="text-balance font-display text-2xl font-medium leading-tight text-maroon sm:text-4xl">
                  {venue.name}
                </h3>

                <address className="mx-auto mt-6 flex max-w-md items-start justify-center gap-3 text-pretty text-left text-base not-italic leading-relaxed text-ink/80 sm:text-lg">
                  <MapPin className="mt-1 size-5 shrink-0 text-vermilion" aria-hidden="true" />
                  <span>{venue.address}</span>
                </address>

                {muhurtham && (
                  <p className="mt-6 text-xs font-medium uppercase tracking-[0.3em] text-vermilion">
                    Muhurtham · {weddingDate.display} · {muhurtham.time}
                  </p>
                )}

                <a
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 border border-maroon bg-maroon px-7 py-3 text-sm font-bold uppercase tracking-[0.2em] text-ivory shadow-lg shadow-maroon/25 transition-colors duration-500 hover:bg-vermilion hover:border-vermilion focus-visible:outline-turmeric"
                >
                  {venue.directionsLabel}
                  <span className="sr-only"> (opens Google Maps in a new tab)</span>
                </a>
                <p className="mt-6 text-lg text-maroon">
                  <Kannada>{venue.knWelcome}</Kannada>
                </p>
              </div>

              <div className="text-brass/70">
                <Pillar />
              </div>
            </div>

            {/* threshold step with kolam */}
            <div className="relative border-x border-b border-brass/60 bg-sandal/50 pb-2 pt-3">
              <TempleBorder />
            </div>
            <div className="pointer-events-none flex justify-center text-brass/60">
              <Rangoli petals={16} size={150} className="-mt-5 size-36 sm:size-40" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
