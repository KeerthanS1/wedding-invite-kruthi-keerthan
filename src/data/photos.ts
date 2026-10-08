import type { ChapterKey, PhotoGroup, PhotoInput } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────
 *  PHOTO CONFIGURATION
 * ─────────────────────────────────────────────────────────────
 *  Drop your photographs into the folders below. That's it –
 *  any group left EMPTY here is filled automatically with every
 *  image found in its folder (sorted by file name: 01.jpg, 02.jpg …).
 *
 *  Want control over order, alt text or cropping? List the files:
 *
 *    traditional: [
 *      "01-couple.jpg",
 *      { file: "02-temple.jpg", alt: "Kruthi and Keerthan at the temple",
 *        position: "50% 20%" },        // keep faces in frame when cropped
 *    ],
 *
 *  Until real photos are added, soft placeholders are shown.
 */

export const photoFolders: Record<PhotoGroup, string> = {
  hero: "/images/hero",
  traditional: "/images/pre-wedding/traditional",
  street: "/images/pre-wedding/street",
  lake: "/images/pre-wedding/lake",
  pottery: "/images/pre-wedding/pottery",
};

export const photoConfig: Record<PhotoGroup, PhotoInput[]> = {
  /**
   * Optional. Leave empty and the hero carousel automatically cycles
   * Traditional → Street → Lake → Pottery using your chapter photos.
   * Add files here (public/images/hero) for a custom hero sequence.
   */
  hero: [],

  traditional: [],
  street: [],
  lake: [],
  pottery: [],
};

/** Describes the photos for screen readers when no per-photo alt is given. */
export const defaultAlt: Record<PhotoGroup, string> = {
  hero: "Kruthi and Keerthan",
  traditional: "Kruthi and Keerthan in traditional attire",
  street: "Kruthi and Keerthan sharing a candid moment on the street",
  lake: "Kruthi and Keerthan by the lake",
  pottery: "Kruthi and Keerthan shaping clay together",
};

/** Number of stand-in frames shown for each chapter until real photos exist. */
export const placeholderCount: Record<ChapterKey, number> = {
  traditional: 5,
  street: 5,
  lake: 3,
  pottery: 5,
};

/**
 * Hero background video (plays muted, looping, behind the names).
 * Replace public/videos/hero.mp4 with your own film. Keep it short (15-30s)
 * and under ~8 MB so it loads quickly on phones. A .webm next to it is optional.
 * The first hero / chapter photo is shown as the poster while it loads.
 */
export const heroVideo = {
  mp4: "/videos/hero.mp4",
  webm: undefined as string | undefined,
};
