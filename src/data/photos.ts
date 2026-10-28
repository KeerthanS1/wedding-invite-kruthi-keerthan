import type { PhotoGroup, PhotoInput } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────
 *  PHOTOS & VIDEO
 * ─────────────────────────────────────────────────────────────
 *  Drop files into these folders. Each one is read in file-name order
 *  (01.jpg, 02.jpg …), so naming controls the order.
 *
 *    public/images/hero/        photos for the opening carousel on laptops/desktops (wide photos)
 *    public/images/hero-mobile/ photos for the opening carousel on phones (tall photos)
 *                               (both carousels start on a random photo on every visit)
 *    public/images/invitation/  10 photos under the invitation, in file-name order
 *                               (any extras join the scrolling gallery)
 *    public/images/couple/      bride.jpg and groom.jpg
 *    public/images/gallery/     everything else, for the scrolling gallery
 *    public/videos/teaser.mp4   the teaser film
 *
 *  Leave a list below empty to use the folder as-is, or list files to
 *  control order, alt text and crop focus:
 *
 *    invitation: [
 *      "01.jpg",
 *      { file: "02.jpg", alt: "Kruthi laughing", position: "50% 20%" },
 *    ],
 *
 *  Until real photos are added, colourful placeholders are shown.
 */

export const photoFolders: Record<PhotoGroup, string> = {
  hero: "/images/hero",
  heroMobile: "/images/hero-mobile",
  invitation: "/images/invitation",
  gallery: "/images/gallery",
};

export const photoConfig: Record<PhotoGroup, PhotoInput[]> = {
  // position = which part stays in view when a photo is cropped (mostly phones).
  // The hero shows these in a random order on every visit.
  hero: [
    { file: "01-courtyard-hd.jpg", alt: "Keerthan leading Kruthi by the hand through a traditional courtyard", position: "45% 40%" },
    { file: "02-flowers-hd.jpg", alt: "Kruthi and Keerthan sitting close and laughing by a sunlit window, behind a vase of flowers", position: "62% 45%" },
    { file: "03-stairs-hd.jpg", alt: "Kruthi and Keerthan walking down steps on a city street", position: "46% 40%" },
    { file: "04-meadow-hd.jpg", alt: "Kruthi and Keerthan running hand in hand across a meadow", position: "58% 45%" },
  ],
  heroMobile: [],
  invitation: [],
  gallery: [],
};

/** How many photos each spot shows */
export const limits = {
  hero: 4,
  heroMobile: 6,
  invitation: 10,
} as const;

export const couplePhotos = {
  folder: "/images/couple",
  bride: { name: "bride", alt: "Kruthi in a purple silk saree, holding a lotus bud, leaning on a wooden pillar beside a veena", position: "50% 50%" },
  groom: { name: "groom", alt: "Keerthan walking through a park at golden hour", position: "50% 50%" },
} as const;

/** Describes the photos for screen readers when no per-photo alt is given. */
export const defaultAlt: Record<PhotoGroup, string> = {
  hero: "Kruthi and Keerthan",
  heroMobile: "Kruthi and Keerthan",
  invitation: "Kruthi and Keerthan together",
  gallery: "A moment with Kruthi and Keerthan",
};

/** The teaser film. Plays with sound when it scrolls into view (if the browser allows). */
export const teaserVideo = {
  mp4: "/videos/teaser.mp4",
  webm: undefined as string | undefined,
};
