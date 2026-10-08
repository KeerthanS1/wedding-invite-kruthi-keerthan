export type ChapterKey = "traditional" | "street" | "lake" | "pottery";

export type PhotoGroup = "hero" | ChapterKey;

/** What you write in `src/data/photos.ts` – a file name, or a file name with extras. */
export type PhotoInput =
  | string
  | {
      /** File name inside the group's folder, e.g. "IMG_0231.jpg" */
      file: string;
      alt?: string;
      /** CSS object-position, e.g. "50% 20%" – keeps faces in frame when cropped */
      position?: string;
      caption?: string;
    };

/** A resolved photograph, ready for the UI. */
export interface Photo {
  src: string;
  alt: string;
  position: string;
  caption?: string;
  /** True when this is a stand-in shown until a real photo is added */
  placeholder?: boolean;
  chapter?: ChapterKey;
}

export type EventIcon = "sun" | "flame" | "sparkles" | "heart";

export interface WeddingEvent {
  id: string;
  title: string;
  /** Kannada name shown beside the English one */
  kn: string;
  /** Human readable, e.g. "18 November 2026" */
  date: string;
  /** Machine readable, e.g. "2026-11-18" */
  isoDate: string;
  time?: string;
  description: string;
  icon: EventIcon;
  highlight?: boolean;
}

export interface ChapterContent {
  number: string;
  /** Kannada numeral */
  knNumber: string;
  title: string;
  subtitle: string;
}
