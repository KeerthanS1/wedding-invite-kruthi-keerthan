import type { Photo } from "@/types";
import { story } from "@/data/wedding";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { Kannada } from "@/components/ui/Kannada";
import { KolamDivider } from "@/components/decorative/KolamDivider";

/** A short, calm introduction beside one arched photograph. */
export function OurStory({ photo }: { photo?: Photo }) {
  const [lead, rest] = story.heading.split(", ");

  return (
    <section id="story" aria-labelledby="story-heading" className="paper py-14 sm:py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-8 px-5 sm:px-10 md:grid-cols-2 md:gap-16">
        <div className="text-center md:text-left">
          <Reveal>
            <p className="mb-2 text-xl text-vermilion sm:text-2xl">
              <Kannada>{story.kn}</Kannada>
            </p>
            <h2 id="story-heading" className="text-balance font-display text-3xl font-medium leading-tight text-maroon sm:text-4xl md:text-5xl">
              {lead},
              <span className="block italic text-vermilion">{rest}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="my-4 text-brass sm:my-6">
            <KolamDivider className="md:justify-start" size={40} />
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-pretty text-base leading-relaxed text-ink/85 sm:text-lg">{story.text}</p>
            <p className="mt-4 text-lg text-maroon">
              <Kannada>{story.knInvite}</Kannada>
            </p>
          </Reveal>
        </div>

        {photo && (
          <Reveal delay={0.15} className="mx-auto w-full max-w-[16rem] sm:max-w-xs md:max-w-sm">
            <div className="rounded-t-full border border-brass/70 p-1.5 sm:p-2">
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-sandal">
                <Picture photo={photo} sizes="(min-width: 768px) 384px, 320px" />
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
