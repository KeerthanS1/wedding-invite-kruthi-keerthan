import { Camera } from "lucide-react";
import type { Photo } from "@/types";
import { invitation, photographer } from "@/data/wedding";
import { cn } from "@/lib/utils";
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

/** Scattered coffee beans and tea leaves that drift very slowly in the background. */
function Beans() {
  const bean = (
    <svg viewBox="0 0 20 28" className="size-full" focusable="false">
      <ellipse cx="10" cy="14" rx="9" ry="13" fill="#6b3f22" />
      <path d="M10 2 C6 10 14 18 10 26" fill="none" stroke="#3d2414" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
  const leaf = (
    <svg viewBox="0 0 20 32" className="size-full" focusable="false">
      <path d="M10 1 C20 10 18 24 10 31 C2 24 0 10 10 1Z" fill="#7a8a3a" />
      <path d="M10 4 V29" stroke="#4f5c22" strokeWidth="1.2" />
    </svg>
  );
  const pieces = [
    { el: bean, cls: "left-[6%] top-[12%] size-5 rotate-12", delay: "0s" },
    { el: leaf, cls: "right-[8%] top-[18%] size-6 -rotate-12", delay: "-2s" },
    { el: bean, cls: "left-[12%] top-[48%] size-4 -rotate-45", delay: "-4s" },
    { el: leaf, cls: "right-[5%] top-[55%] size-5 rotate-45", delay: "-1s" },
    { el: bean, cls: "right-[14%] top-[80%] size-5 rotate-90", delay: "-3s" },
    { el: leaf, cls: "left-[4%] top-[78%] size-6 rotate-[20deg]", delay: "-5s" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 hidden opacity-30 md:block" aria-hidden="true">
      {pieces.map((p, i) => (
        <span key={i} className={cn("drift absolute", p.cls)} style={{ animationDelay: p.delay }}>
          {p.el}
        </span>
      ))}
    </div>
  );
}

/** A latte-art heart for the closing line. */
function LatteHeart() {
  return (
    <svg viewBox="0 0 64 64" className="mx-auto size-14" aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="30" fill="#8b5a3c" />
      <circle cx="32" cy="32" r="26" fill="#c08a5c" />
      <path d="M32 50 C18 40 14 31 19 25 C23 20 30 22 32 28 C34 22 41 20 45 25 C50 31 46 40 32 50Z" fill="#fef3e2" />
      <path d="M32 28 V48" stroke="#c08a5c" strokeWidth="1.5" />
    </svg>
  );
}

/** The invitation, told as our chai-meets-coffee story, then eight photos and a credit to the photographer. */
export function Invitation({ photos }: { photos: Photo[] }) {
  const [chai, meets, coffee] = invitation.headingMain;

  return (
    <section
      id="invitation"
      aria-labelledby="invitation-heading"
      className="relative overflow-hidden bg-cream pb-14 pt-10 sm:pb-24 sm:pt-28"
    >
      {/* warm glows, faint kolam dots and drifting beans */}
      <div aria-hidden="true" className="pulli pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-10 size-[30rem] rounded-full bg-amber/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-40 size-[28rem] rounded-full bg-rust/15 blur-3xl" />
      <Beans />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-8">
        <header className="text-center">
          <ChaiCoffee />
          <Reveal delay={0.2}>
            <p className="mt-4 text-2xl text-rust sm:text-3xl">
              <Kannada>{invitation.kn}</Kannada>
            </p>
            <h2 id="invitation-heading" aria-label={invitation.heading} className="mt-2 font-heading leading-none text-cocoa">
              <span aria-hidden="true" className="block font-sans text-xs font-semibold uppercase tracking-[0.45em] text-cocoa/60 sm:text-sm">
                {invitation.headingLead}
              </span>
              <span aria-hidden="true" className="mt-3 block text-[clamp(2.4rem,8vw,4.75rem)]">
                <span className="text-rust">{chai}</span> <span className="italic text-cocoa/70">{meets}</span>{" "}
                <span className="text-cocoa">{coffee}</span>
                <span className="heartbeat ml-2 inline-block text-rust">♡</span>
              </span>
            </h2>
          </Reveal>
        </header>

        {/* the story: a gradient-edged card, each beat marked with its own little icon */}
        <Reveal delay={0.15}>
          <div className="relative mx-auto mt-10 max-w-3xl rounded-[2rem] bg-linear-to-br from-amber via-rust/70 to-cocoa/60 p-[2px] shadow-[0_30px_60px_-30px_rgba(74,44,24,0.45)] sm:mt-14">
            <div className="relative overflow-hidden rounded-[calc(2rem-2px)] bg-cream px-5 py-9 sm:px-12 sm:py-12">
              <CupRing className="pointer-events-none absolute -right-10 -top-10 size-40 rotate-12" />
              <CupRing className="pointer-events-none absolute -bottom-12 -left-12 size-36 -rotate-45" />

              <ol className="relative">
                {/* dotted path joining the beats */}
                <span aria-hidden="true" className="absolute bottom-6 left-[1.15rem] top-6 border-l-2 border-dotted border-amber/70 sm:left-[1.4rem]" />
                {invitation.story.map((beat, i) => (
                  <li key={beat.icon} className="relative flex gap-4 pb-6 last:pb-0 sm:gap-6 sm:pb-7">
                    <span
                      aria-hidden="true"
                      className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-sand text-lg shadow-sm ring-2 ring-cream sm:size-12 sm:text-xl"
                    >
                      {beat.icon}
                    </span>
                    <p
                      className={cn(
                        "pt-1.5 text-pretty leading-relaxed text-ink/85",
                        i === 0 ? "font-display text-lg text-cocoa sm:text-2xl sm:leading-snug" : "text-[0.95rem] sm:text-base",
                      )}
                    >
                      <Highlighted text={beat.text} />
                    </p>
                  </li>
                ))}
              </ol>

              <div className="relative mt-9 text-center">
                <LatteHeart />
                <p className="mt-4 text-balance font-display text-3xl italic leading-tight text-rust sm:text-4xl">{invitation.blend}</p>
                <p className="mt-3 text-sm font-semibold text-cocoa sm:text-base">{invitation.toast}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* medium-sized photos in a masonry layout: 4 columns on desktop, 2 on phones;
            each frame keeps its photo's own shape */}
        <ul className="mx-auto mt-12 max-w-xs columns-2 gap-2 sm:mt-16 sm:max-w-2xl sm:columns-4 sm:gap-3 lg:max-w-3xl">
          {photos.map((photo, i) => (
            <li key={photo.src} className="mb-2 break-inside-avoid sm:mb-3">
              <Reveal y={16} delay={(i % 4) * 0.08} duration={0.9}>
                <PhotoTile
                  group={photos}
                  index={i}
                  sizes="(min-width: 640px) 190px, 160px"
                  className="rounded-xl shadow-md shadow-cocoa/10 transition-transform duration-500 hover:-translate-y-1 hover:-rotate-1"
                />
              </Reveal>
            </li>
          ))}
        </ul>

        {/* a quiet credit to the photographer */}
        <Reveal className="mt-6 text-center">
          <a
            href={photographer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-cocoa/70 transition-colors hover:bg-sand hover:text-rust sm:text-sm"
          >
            <Camera className="size-3.5" aria-hidden="true" />
            <span>
              {photographer.label}{" "}
              <span className="font-semibold text-cocoa group-hover:text-rust">{photographer.handle}</span>
            </span>
            <span className="sr-only"> (opens Instagram in a new tab)</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
