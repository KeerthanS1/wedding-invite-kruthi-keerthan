"use client";

import type { ReactNode } from "react";
import type { Photo } from "@/types";
import { cn } from "@/lib/utils";
import { Picture } from "@/components/ui/Picture";
import { useGallery } from "./GalleryProvider";

interface PhotoTileProps {
  /** The full set this photo belongs to – the lightbox navigates through it. */
  group: Photo[];
  index: number;
  sizes: string;
  /** Shape / aspect classes, e.g. "aspect-[4/5] rounded-t-full" */
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  children?: ReactNode;
}

/** A photograph that opens the lightbox. Slow zoom on hover, keyboard accessible. */
export function PhotoTile({ group, index, sizes, className, imageClassName, priority, children }: PhotoTileProps) {
  const { open } = useGallery();
  const photo = group[index];
  if (!photo) return null;

  return (
    <button
      type="button"
      onClick={() => open(group, index)}
      aria-haspopup="dialog"
      aria-label={`View larger: ${photo.alt}`}
      className={cn("group relative block w-full cursor-zoom-in overflow-hidden bg-sandal", className)}
    >
      <Picture
        photo={photo}
        sizes={sizes}
        priority={priority}
        className={cn("transition-transform duration-[1600ms] ease-out group-hover:scale-[1.045]", imageClassName)}
      />
      <span className="pointer-events-none absolute inset-0 bg-maroon-deep/0 transition-colors duration-700 group-hover:bg-maroon-deep/10" />
      {children}
    </button>
  );
}
