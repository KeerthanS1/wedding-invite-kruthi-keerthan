import type { Photo } from "@/types";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoTile } from "./PhotoTile";

const aspect = (p: Photo) => (p.width && p.height ? p.width / p.height : 0.8);

/**
 * Splits photos (in order) into rows whose combined width-to-height ratio reaches `target`.
 * A too-short last row is merged into the one before it.
 */
function rowsOf(photos: Photo[], target: number): number[][] {
  const rows: number[][] = [];
  let row: number[] = [];
  let sum = 0;
  photos.forEach((p, i) => {
    row.push(i);
    sum += aspect(p);
    if (sum >= target) {
      rows.push(row);
      row = [];
      sum = 0;
    }
  });
  if (row.length) {
    if (rows.length && sum < target * 0.6) rows[rows.length - 1].push(...row);
    else rows.push(row);
  }
  return rows;
}

function Rows({ photos, target, className }: { photos: Photo[]; target: number; className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-2 sm:gap-3", className)}>
      {rowsOf(photos, target).map((row, r) => (
        <li key={r} className="flex gap-2 sm:gap-3">
          {row.map((i, k) => {
            const photo = photos[i];
            const a = aspect(photo);
            return (
              // flex-grow proportional to the photo's shape gives every photo in the row the same height
              <div key={photo.src} style={{ flex: `${a} 1 0%` }} className="min-w-0">
                <Reveal y={16} delay={k * 0.08} duration={0.9}>
                  <PhotoTile
                    group={photos}
                    index={i}
                    sizes={`(min-width: 768px) ${Math.round((a / target) * 768)}px, ${Math.round((a / target) * 100)}vw`}
                    className="rounded-xl shadow-md shadow-cocoa/10 transition-transform duration-500 hover:-translate-y-1"
                  />
                </Reveal>
              </div>
            );
          })}
        </li>
      ))}
    </ul>
  );
}

/**
 * "Justified" photo rows, like a photo album: every row fills the full width, photos in a row
 * share one height, and each keeps its own shape, so tall and wide photos mix with no gaps
 * and no cropping. Phones get shorter rows (about two photos), larger screens about three.
 */
export function JustifiedRows({ photos, className }: { photos: Photo[]; className?: string }) {
  return (
    <div className={className}>
      <Rows photos={photos} target={2.1} className="md:hidden" />
      <Rows photos={photos} target={2.8} className="hidden md:flex" />
    </div>
  );
}
