import type { PhotoGroup, PhotoInput } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────
 *  PHOTOS & VIDEO
 * ─────────────────────────────────────────────────────────────
 *  Drop files into these folders. Each one is read in file-name order
 *  (01.jpg, 02.jpg …), so naming controls the order.
 *
 *    public/images/hero/        3–4 photos for the opening carousel
 *    public/images/invitation/  8 photos for the grid under the invitation
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
  invitation: "/images/invitation",
  gallery: "/images/gallery",
};

export const photoConfig: Record<PhotoGroup, PhotoInput[]> = {
  hero: [],
  invitation: [],
  gallery: [],
};

/** How many photos each spot shows */
export const limits = {
  hero: 4,
  invitation: 8,
} as const;

export const couplePhotos = {
  folder: "/images/couple",
  bride: { name: "bride", alt: "Kruthi, the bride", position: "50% 30%" },
  groom: { name: "groom", alt: "Keerthan, the groom", position: "50% 30%" },
} as const;

/** Describes the photos for screen readers when no per-photo alt is given. */
export const defaultAlt: Record<PhotoGroup, string> = {
  hero: "Kruthi and Keerthan",
  invitation: "Kruthi and Keerthan together",
  gallery: "A moment with Kruthi and Keerthan",
};

/** The teaser film. Plays with sound when it scrolls into view (if the browser allows). */
export const teaserVideo = {
  mp4: "/videos/teaser.mp4",
  webm: undefined as string | undefined,
};
