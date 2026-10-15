import type { PhotoGroup, PhotoInput } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────
 *  PHOTOS & VIDEO
 * ─────────────────────────────────────────────────────────────
 *  Drop files into these folders. Each one is read in file-name order
 *  (01.jpg, 02.jpg …), so naming controls the order.
 *
 *    public/images/hero/        up to 8 photos for the opening carousel (shuffled per visit)
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
  // position = which part stays in view when a photo is cropped (mostly phones).
  // The hero shows these in a random order on every visit.
  hero: [
    { file: "01-running-hd.jpg", alt: "Kruthi and Keerthan running hand in hand across a meadow", position: "55% 40%" },
    { file: "02-stairs-hd.jpg", alt: "Kruthi and Keerthan walking down steps on a city street", position: "46% 40%" },
    { file: "03-street-hd.jpg", alt: "Kruthi and Keerthan leaning against a leafy street-side railing", position: "62% 45%" },
    { file: "04-window-hd.jpg", alt: "Keerthan and Kruthi forehead to forehead by a sunlit window", position: "58% 35%" },
    { file: "05-flowers-hd.jpg", alt: "Kruthi and Keerthan sitting close, laughing, behind a vase of flowers", position: "68% 40%" },
    { file: "06-courtyard-hd.jpg", alt: "Keerthan leading Kruthi by the hand through a traditional courtyard", position: "47% 40%" },
    { file: "07-veena-hd.jpg", alt: "Kruthi resting beside Keerthan next to a veena, rose petals falling", position: "45% 45%" },
    { file: "08-red-car-hd.jpg", alt: "Kruthi in a silk saree and Keerthan in a kurta by a vintage red car", position: "52% 40%" },
  ],
  invitation: [],
  gallery: [],
};

/** How many photos each spot shows */
export const limits = {
  hero: 8,
  invitation: 8,
} as const;

export const couplePhotos = {
  folder: "/images/couple",
  bride: { name: "bride", alt: "Kruthi in a purple silk saree, holding a lotus bud, leaning on a wooden pillar beside a veena", position: "50% 50%" },
  groom: { name: "groom", alt: "Keerthan walking through a park at golden hour", position: "50% 50%" },
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
