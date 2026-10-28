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
  /** 75, 82 or 90 (see images.qualities in next.config.ts) */
  quality?: 75 | 82 | 90;
}

/** Next/Image wrapper that fills its (relatively positioned) parent. */
export function Picture({ photo, sizes, priority, className, fit = "cover", quality = 82 }: PictureProps) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      unoptimized={photo.src.endsWith(".svg")}
      placeholder={photo.blur ? "blur" : "empty"}
      blurDataURL={photo.blur}
      draggable={false}
      style={{ objectPosition: photo.position }}
      className={cn(fit === "cover" ? "object-cover" : "object-contain", className)}
    />
  );
}
