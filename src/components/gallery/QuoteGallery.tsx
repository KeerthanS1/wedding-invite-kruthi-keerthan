import type { Photo } from "@/types";
import { finalQuote } from "@/data/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { AutoScroller } from "@/components/ui/AutoScroller";
import { PhotoTile } from "./PhotoTile";

/** The closing line, then every remaining photo drifting past. Guests can also swipe or drag it, and tap a photo to see it large. */
export function QuoteGallery({ photos }: { photos: Photo[] }) {
  return (
    <section id="gallery" aria-labelledby="quote-text" className="overflow-hidden bg-cream py-14 sm:py-24">
      <Reveal className="mx-auto max-w-3xl px-5 text-center">
        <p aria-hidden="true" className="font-display text-7xl leading-none text-rust">
          &ldquo;
        </p>
        <blockquote id="quote-text" className="-mt-4 text-balance font-display text-3xl italic leading-snug text-cocoa sm:text-5xl">
          {finalQuote.text}
        </blockquote>
      </Reveal>

      {photos.length > 0 && (
        <AutoScroller label="More photographs of Kruthi and Keerthan" className="mt-10 sm:mt-14">
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              // fixed height, width from the photo's own shape, so tall and wide photos both fit uncropped
              className={i % 2 ? "h-56 shrink-0 px-1.5 sm:mt-8 sm:h-72 sm:px-2.5" : "h-56 shrink-0 px-1.5 sm:h-72 sm:px-2.5"}
              style={photo.width && photo.height ? { aspectRatio: `${photo.width} / ${photo.height}` } : { width: "14rem" }}
            >
              <PhotoTile
                group={photos}
                index={i}
                sizes="(min-width: 640px) 432px, 336px"
                className="rounded-2xl"
              />
            </div>
          ))}
        </AutoScroller>
      )}
    </section>
  );
}
