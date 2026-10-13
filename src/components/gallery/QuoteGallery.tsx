import type { Photo } from "@/types";
import { finalQuote } from "@/data/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { PhotoTile } from "./PhotoTile";

/** The closing line, then every remaining photo drifting past. Tap one to see it large. */
export function QuoteGallery({ photos }: { photos: Photo[] }) {
  return (
    <section id="gallery" aria-labelledby="quote-text" className="overflow-hidden bg-cream py-14 sm:py-24">
      <Reveal className="mx-auto max-w-3xl px-5 text-center">
        <p aria-hidden="true" className="font-display text-7xl leading-none text-rani">
          &ldquo;
        </p>
        <blockquote id="quote-text" className="-mt-4 text-balance font-display text-3xl italic leading-snug text-plum sm:text-5xl">
          {finalQuote.text}
        </blockquote>
      </Reveal>

      {photos.length > 0 && (
        <Marquee duration={Math.max(30, photos.length * 6)} pauseOnHover className="mt-10 sm:mt-14">
          {photos.map((photo, i) => (
            <div key={photo.src} className="w-[46vw] shrink-0 px-1.5 sm:w-64 sm:px-2.5">
              <PhotoTile
                group={photos}
                index={i}
                sizes="(min-width: 640px) 256px, 46vw"
                className={i % 2 ? "aspect-[4/5] rounded-2xl sm:mt-8" : "aspect-[4/5] rounded-2xl"}
              />
            </div>
          ))}
        </Marquee>
      )}
    </section>
  );
}
