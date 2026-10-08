import fs from "node:fs";
import path from "node:path";
import { defaultAlt, photoConfig, photoFolders, placeholderCount } from "@/data/photos";
import type { ChapterKey, Photo, PhotoGroup, PhotoInput } from "@/types";

/** Server-only helpers: resolve configured / discovered photos at build time. */

const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;
const CHAPTER_ORDER: ChapterKey[] = ["traditional", "street", "lake", "pottery"];

function discover(group: PhotoGroup): string[] {
  const dir = path.join(process.cwd(), "public", photoFolders[group]);
  try {
    return fs
      .readdirSync(dir)
      .filter((file) => IMAGE_EXT.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

function resolve(group: PhotoGroup, input: PhotoInput, index: number): Photo {
  const item = typeof input === "string" ? { file: input } : input;
  return {
    src: `${photoFolders[group]}/${item.file}`,
    alt: item.alt ?? `${defaultAlt[group]} (photo ${index + 1})`,
    position: "position" in item && item.position ? item.position : "50% 50%",
    caption: "caption" in item ? item.caption : undefined,
    chapter: group === "hero" ? undefined : group,
  };
}

function realPhotos(group: PhotoGroup): Photo[] {
  const configured = photoConfig[group];
  const inputs = configured.length > 0 ? configured : discover(group);
  return inputs.map((input, i) => resolve(group, input, i));
}

function placeholders(chapter: ChapterKey): Photo[] {
  return Array.from({ length: placeholderCount[chapter] }, (_, i) => ({
    src: `/images/placeholders/${chapter}-${i + 1}.svg`,
    alt: `${defaultAlt[chapter]} – photo ${i + 1} (placeholder)`,
    position: "50% 50%",
    placeholder: true,
    chapter,
  }));
}

/** Round-robin across chapters: Traditional → Street → Lake → Pottery → repeat. */
function interleave(byChapter: Record<ChapterKey, Photo[]>, limit = 12): Photo[] {
  const out: Photo[] = [];
  const longest = Math.max(...CHAPTER_ORDER.map((c) => byChapter[c].length));
  for (let i = 0; i < longest && out.length < limit; i++) {
    for (const chapter of CHAPTER_ORDER) {
      const photo = byChapter[chapter][i];
      if (photo && out.length < limit) out.push(photo);
    }
  }
  return out;
}

export interface SitePhotos {
  hero: Photo[];
  chapters: Record<ChapterKey, Photo[]>;
}

export function getSitePhotos(): SitePhotos {
  const real = Object.fromEntries(
    CHAPTER_ORDER.map((c) => [c, realPhotos(c)]),
  ) as Record<ChapterKey, Photo[]>;

  const chapters = Object.fromEntries(
    CHAPTER_ORDER.map((c) => [c, real[c].length > 0 ? real[c] : placeholders(c)]),
  ) as Record<ChapterKey, Photo[]>;

  const customHero = realPhotos("hero");
  const anyReal = CHAPTER_ORDER.some((c) => real[c].length > 0);
  const hero =
    customHero.length > 0 ? customHero : interleave(anyReal ? real : chapters, 12);

  return { hero, chapters };
}
