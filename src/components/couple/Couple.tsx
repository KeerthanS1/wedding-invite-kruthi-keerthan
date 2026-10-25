import type { Person, Photo } from "@/types";
import { coupleIntro } from "@/data/wedding";
import { cn } from "@/lib/utils";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { Kannada } from "@/components/ui/Kannada";
import { ScriptName } from "@/components/ui/ScriptName";
import { SectionHeading } from "@/components/ui/SectionHeading";

function PersonCard({ person, photo, accent, delay }: { person: Person; photo: Photo; accent: "rust" | "clay"; delay: number }) {
  const text = accent === "rust" ? "text-rust" : "text-clay";
  return (
    <Reveal delay={delay} className="h-full">
      <article className="flex h-full flex-col items-center text-center">
        <div className="w-full max-w-[13.5rem] sm:max-w-[16rem]">
          <div
            className="relative overflow-hidden rounded-[1.75rem] bg-sand"
            style={{ aspectRatio: photo.width && photo.height ? `${photo.width} / ${photo.height}` : "4 / 5" }}
          >
            <Picture photo={photo} sizes="(min-width: 640px) 256px, 216px" />
          </div>
        </div>

        <h3 className={cn("mt-6 font-script text-5xl leading-none sm:text-6xl", text)}>
          <ScriptName name={person.name} />
        </h3>
        <p className={cn("mt-1 text-3xl", text)}>
          <Kannada>{person.kn}</Kannada>
        </p>
        <p className="mt-3 max-w-xs text-pretty text-base leading-relaxed text-ink/75">{person.line}</p>
      </article>
    </Reveal>
  );
}

/** The bride, then the groom: side by side on desktop, stacked on phones. */
export function Couple({ bride, groom }: { bride: Photo; groom: Photo }) {
  return (
    <section id="couple" aria-labelledby="couple-heading" className="bg-sand py-14 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading id="couple-heading" kn={coupleIntro.kn} title={coupleIntro.heading} />
        <div className="relative mt-10 grid gap-14 sm:mt-14 md:grid-cols-2 md:gap-10">
          <PersonCard person={coupleIntro.bride} photo={bride} accent="rust" delay={0} />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[38%] hidden size-14 -translate-x-1/2 items-center justify-center rounded-full bg-amber font-script text-3xl text-cocoa shadow-lg md:flex"
          >
            &amp;
          </span>
          <PersonCard person={coupleIntro.groom} photo={groom} accent="clay" delay={0.15} />
        </div>
      </div>
    </section>
  );
}
