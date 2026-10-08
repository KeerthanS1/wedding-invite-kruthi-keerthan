import type { ChapterKey, Photo } from "@/types";
import { chapters as chapterContent, journey } from "@/data/wedding";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Kannada } from "@/components/ui/Kannada";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AutoCarousel } from "./AutoCarousel";

const ORDER: ChapterKey[] = ["traditional", "street", "lake", "pottery"];

/** Each chapter gets its own background and type mood to match where it was shot. */
const THEME: Record<ChapterKey, { band: string; number: string; title: string; subtitle: string }> = {
  traditional: {
    band: "paper",
    number: "text-vermilion",
    title: "text-maroon",
    subtitle: "text-ink/70",
  },
  // street: warm asphalt grey, like an evening pavement
  street: {
    band: "bg-[#2b2927]",
    number: "text-turmeric",
    title: "text-ivory uppercase tracking-[0.08em]",
    subtitle: "text-ivory/65",
  },
  // lake: deep forest green
  lake: {
    band: "bg-linear-to-b from-forest-deep via-forest to-forest-deep",
    number: "text-gold",
    title: "text-ivory italic",
    subtitle: "text-ivory/75",
  },
  // pottery: warm sandalwood clay
  pottery: {
    band: "clay",
    number: "text-vermilion",
    title: "text-maroon",
    subtitle: "text-ink/70",
  },
};

function ChapterRow({ chapter, photos }: { chapter: ChapterKey; photos: Photo[] }) {
  const { number, knNumber, title, subtitle } = chapterContent[chapter];
  const theme = THEME[chapter];
  return (
    <div className={cn("overflow-hidden py-10 sm:py-14", theme.band)}>
      <Reveal className="mx-auto max-w-5xl px-5 text-center sm:px-10">
        <p className={cn("text-sm font-bold tracking-[0.3em]", theme.number)}>
          <span className="sr-only">Chapter {number}</span>
          <Kannada>{knNumber}</Kannada>
        </p>
        <h3 className={cn("mt-1 font-display text-2xl font-medium sm:text-3xl", theme.title)}>{title}</h3>
        <p className={cn("mt-1 text-sm italic sm:text-base", theme.subtitle)}>{subtitle}</p>
      </Reveal>
      <div className="mt-5 sm:mt-7">
        <AutoCarousel chapter={chapter} photos={photos} label={`${title} photographs`} />
      </div>
    </div>
  );
}

/** "Our Journey": the four pre-wedding chapters as gently drifting photo rows. */
export function PreWeddingJourney({ chapters }: { chapters: Record<ChapterKey, Photo[]> }) {
  return (
    <section id="journey" aria-labelledby="journey-heading">
      <div className="paper px-5 pb-4 pt-14 sm:pt-24">
        <SectionHeading id="journey-heading" kn={journey.kn} title={journey.heading} subtitle={journey.subtitle} />
      </div>
      {ORDER.map((key) => (
        <ChapterRow key={key} chapter={key} photos={chapters[key]} />
      ))}
    </section>
  );
}
