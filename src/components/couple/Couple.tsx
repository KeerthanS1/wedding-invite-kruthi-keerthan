import type { Person, Photo } from "@/types";
import { coupleIntro } from "@/data/wedding";
import { cn } from "@/lib/utils";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { Kannada } from "@/components/ui/Kannada";
import { SectionHeading } from "@/components/ui/SectionHeading";

function PersonCard({ person, photo, accent, delay }: { person: Person; photo: Photo; accent: "rani" | "peacock"; delay: number }) {
  const text = accent === "rani" ? "text-rani" : "text-peacock";
  const pill = accent === "rani" ? "bg-rani" : "bg-peacock";
  return (
    <Reveal delay={delay} className="h-full">
      <article className="flex h-full flex-col items-center text-center">
        <div className="relative w-full max-w-[17rem] sm:max-w-sm">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand">
            <Picture photo={photo} sizes="(min-width: 768px) 384px, 90vw" />
          </div>
          <p
            className={cn(
              "absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold text-cream shadow-lg",
              pill,
            )}
          >
            <Kannada className="text-base">{person.knRole}</Kannada>
            <span aria-hidden="true">·</span>
            <span>{person.role}</span>
          </p>
        </div>

        <h3 className={cn("mt-8 font-script text-6xl leading-none sm:text-7xl", text)}>{person.name}</h3>
        <p className={cn("mt-1 text-2xl font-semibold", text)}>
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
          <PersonCard person={coupleIntro.bride} photo={bride} accent="rani" delay={0} />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[38%] hidden size-14 -translate-x-1/2 items-center justify-center rounded-full bg-marigold font-script text-4xl text-plum shadow-lg md:flex"
          >
            &amp;
          </span>
          <PersonCard person={coupleIntro.groom} photo={groom} accent="peacock" delay={0.15} />
        </div>
      </div>
    </section>
  );
}
