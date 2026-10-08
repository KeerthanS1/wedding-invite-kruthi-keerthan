import type { ChapterKey, Photo } from "@/types";
import { chapters as chapterContent, journey } from "@/data/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { Kannada } from "@/components/ui/Kannada";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AutoCarousel } from "./AutoCarousel";

const ORDER: ChapterKey[] = ["traditional", "street", "lake", "pottery"];

function ChapterRow({ chapter, photos }: { chapter: ChapterKey; photos: Photo[] }) {
  const { number, knNumber, title, subtitle } = chapterContent[chapter];
  return (
    <div className="py-7 sm:py-10">
      <Reveal className="mx-auto max-w-5xl px-5 text-center sm:px-10">
        <p className="text-sm font-bold tracking-[0.3em] text-vermilion">
          <span className="sr-only">Chapter {number}</span>
          <Kannada>{knNumber}</Kannada>
        </p>
        <h3 className="mt-1 font-display text-2xl font-medium text-maroon sm:text-3xl">{title}</h3>
        <p className="mt-1 text-sm italic text-ink/70 sm:text-base">{subtitle}</p>
      </Reveal>
      <div className="mt-5 sm:mt-7">
        <AutoCarousel photos={photos} label={`${title} photographs`} />
      </div>
    </div>
  );
}

/** "Our Journey": the four pre-wedding chapters as gently drifting photo rows. */
export function PreWeddingJourney({ chapters }: { chapters: Record<ChapterKey, Photo[]> }) {
  return (
    <section id="journey" aria-labelledby="journey-heading" className="paper overflow-hidden py-14 sm:py-24">
      <div className="px-5">
        <SectionHeading id="journey-heading" kn={journey.kn} title={journey.heading} subtitle={journey.subtitle} />
      </div>
      <div className="mt-4 sm:mt-6">
        {ORDER.map((key) => (
          <ChapterRow key={key} chapter={key} photos={chapters[key]} />
        ))}
      </div>
    </section>
  );
}
