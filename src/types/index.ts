/** Folders of photographs, one per part of the page. */
export type PhotoGroup = "hero" | "invitation" | "gallery";

/** What you write in `src/data/photos.ts` – a file name, or a file name with extras. */
export type PhotoInput =
  | string
  | {
      /** File name inside the group's folder, e.g. "IMG_0231.jpg" */
      file: string;
      alt?: string;
      /** CSS object-position, e.g. "50% 20%" – keeps faces in frame when cropped */
      position?: string;
    };

/** A resolved photograph, ready for the UI. */
export interface Photo {
  src: string;
  alt: string;
  position: string;
  /** True when this is a stand-in shown until a real photo is added */
  placeholder?: boolean;
}

export type EventIcon = "sun" | "flame" | "sparkles" | "heart";

export interface WeddingEvent {
  id: string;
  title: string;
  /** Kannada name shown with the English one */
  kn: string;
  /** Human readable, e.g. "18 November 2026" */
  date: string;
  /** Machine readable, e.g. "2026-11-18" */
  isoDate: string;
  time?: string;
  icon: EventIcon;
  /** Card colour */
  tone: "honey" | "sand" | "cocoa";
}

export interface Person {
  name: string;
  kn: string;
  line: string;
}
