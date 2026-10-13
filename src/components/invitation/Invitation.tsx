import type { Photo } from "@/types";
import { invitation } from "@/data/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoTile } from "@/components/gallery/PhotoTile";

/** The invitation note with eight photos: 4 × 2 on desktop, 2 × 4 on phones. */
export function Invitation({ photos }: { photos: Photo[] }) {
  return (
    <section id="invitation" aria-labelledby="invitation-heading" className="pulli pb-14 pt-20 sm:pb-24 sm:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionHeading id="invitation-heading" kn={invitation.kn} title={invitation.heading} />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-center text-base leading-relaxed text-ink/80 sm:text-lg">
            {invitation.text}
          </p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-2.5 sm:mt-14 sm:gap-4 md:grid-cols-4">
          {photos.map((photo, i) => (
            <li key={photo.src}>
              <Reveal y={20} delay={(i % 4) * 0.08} duration={0.9}>
                <PhotoTile
                  group={photos}
                  index={i}
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="aspect-[4/5] rounded-2xl"
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
