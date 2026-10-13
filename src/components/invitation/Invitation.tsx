import type { Photo } from "@/types";
import { invitation } from "@/data/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { Kannada } from "@/components/ui/Kannada";
import { PhotoTile } from "@/components/gallery/PhotoTile";
import { ChaiCoffee } from "./ChaiCoffee";

/** Turns "plain **highlighted** plain" into text with highlighter marks. */
function Highlighted({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 ? (
          <mark key={i} className="highlight rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** A faint coffee-cup ring, like the one left on a napkin. */
function CupRing({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5a3c" strokeOpacity="0.14" strokeWidth="5" strokeDasharray="190 12 40 8" />
      <circle cx="50" cy="50" r="35" fill="none" stroke="#8b5a3c" strokeOpacity="0.07" strokeWidth="2" />
    </svg>
  );
}

/** The invitation, told as our chai-meets-coffee story, then eight medium-sized photos. */
export function Invitation({ photos }: { photos: Photo[] }) {
  const [first, ...rest] = invitation.story;

  return (
    <section id="invitation" aria-labelledby="invitation-heading" className="pulli pb-14 pt-20 sm:pb-24 sm:pt-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <Reveal className="text-center">
          <ChaiCoffee />
          <p className="mt-3 text-xl font-medium text-rani sm:text-2xl">
            <Kannada>{invitation.kn}</Kannada>
          </p>
          <h2 id="invitation-heading" className="mt-1 text-balance font-display text-3xl leading-tight text-plum sm:text-5xl">
            {invitation.heading}
          </h2>
        </Reveal>

        {/* the story, on a napkin-like card */}
        <Reveal delay={0.15}>
          <div className="relative mx-auto mt-8 max-w-2xl overflow-hidden rounded-3xl bg-cream px-5 py-8 shadow-[8px_8px_0_var(--color-marigold)] ring-1 ring-marigold/30 sm:mt-10 sm:px-10 sm:py-10">
            <CupRing className="pointer-events-none absolute -right-8 -top-8 size-36 rotate-12" />
            <CupRing className="pointer-events-none absolute -bottom-10 -left-10 size-32 -rotate-45" />

            <div className="relative space-y-4 text-pretty text-[0.95rem] leading-relaxed text-ink/85 sm:text-base">
              <p className="font-display text-xl leading-snug text-plum sm:text-2xl">
                <Highlighted text={first} />
              </p>
              {rest.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>
                  <Highlighted text={paragraph} />
                </p>
              ))}
            </div>

            <div className="relative mt-7 border-t border-dashed border-marigold/50 pt-6 text-center">
              <p className="font-script text-5xl leading-tight text-rani sm:text-6xl">{invitation.blend}</p>
              <p className="mt-2 text-sm font-semibold text-plum sm:text-base">{invitation.toast}</p>
            </div>
          </div>
        </Reveal>

        {/* medium-sized photos: 4 × 2 on desktop, 2 × 4 on phones */}
        <ul className="mx-auto mt-10 grid max-w-xs grid-cols-2 gap-2 sm:mt-14 sm:max-w-2xl sm:grid-cols-4 sm:gap-3 lg:max-w-3xl">
          {photos.map((photo, i) => (
            <li key={photo.src}>
              <Reveal y={16} delay={(i % 4) * 0.08} duration={0.9}>
                <PhotoTile
                  group={photos}
                  index={i}
                  sizes="(min-width: 640px) 190px, 160px"
                  className="aspect-[4/5] rounded-xl transition-transform duration-500 hover:-rotate-2"
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
