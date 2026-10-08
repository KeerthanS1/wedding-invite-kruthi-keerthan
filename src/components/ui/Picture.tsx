import Image from "next/image";
import type { Photo } from "@/types";
import { cn } from "@/lib/utils";

interface PictureProps {
  photo: Photo;
  /** Responsive `sizes` hint so phones never download desktop-sized files. */
  sizes: string;
  priority?: boolean;
  className?: string;
  fit?: "cover" | "contain";
}

/** Next/Image wrapper that fills its (relatively positioned) parent. */
export function Picture({ photo, sizes, priority, className, fit = "cover" }: PictureProps) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={82}
      unoptimized={photo.src.endsWith(".svg")}
      draggable={false}
      style={{ objectPosition: photo.position }}
      className={cn(fit === "cover" ? "object-cover" : "object-contain", className)}
    />
  );
}
