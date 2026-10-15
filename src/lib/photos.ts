import fs from "node:fs";
import path from "node:path";
import { couplePhotos, defaultAlt, limits, photoConfig, photoFolders } from "@/data/photos";
import type { Photo, PhotoGroup, PhotoInput } from "@/types";

/** Server-only helpers: resolve configured / discovered photos at build time. */

const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

function listFolder(folder: string): string[] {
  try {
    return fs
      .readdirSync(path.join(process.cwd(), "public", folder))
      .filter((file) => IMAGE_EXT.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

/** Reads width/height from a JPEG or PNG header, without decoding the image. */
function imageSize(publicPath: string): { width: number; height: number } | null {
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", publicPath));
    if (buf.readUInt32BE(0) === 0x89504e47) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    if (buf[0] === 0xff && buf[1] === 0xd8) {
      let i = 2;
      while (i < buf.length) {
        const marker = buf[i + 1];
        const length = buf.readUInt16BE(i + 2);
        if (marker >= 0xc0 && marker <= 0xc3) return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
        i += 2 + length;
      }
    }
  } catch {}
  return null;
}

function resolve(group: PhotoGroup, input: PhotoInput, index: number): Photo {
  const item = typeof input === "string" ? { file: input } : input;
  const src = `${photoFolders[group]}/${item.file}`;
  const size = imageSize(src);
  return {
    src,
    portrait: size ? size.height > size.width : undefined,
    alt: item.alt ?? `${defaultAlt[group]} (photo ${index + 1})`,
    position: "position" in item && item.position ? item.position : "50% 50%",
  };
}

function realPhotos(group: PhotoGroup): Photo[] {
  const configured = photoConfig[group];
  const inputs = configured.length > 0 ? configured : listFolder(photoFolders[group]);
  return inputs.map((input, i) => resolve(group, input, i));
}

function placeholders(prefix: string, count: number, alt: string): Photo[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/images/placeholders/${prefix}-${i + 1}.svg`,
    alt: `${alt} (placeholder ${i + 1})`,
    position: "50% 50%",
    placeholder: true,
  }));
}

function couplePhoto(who: "bride" | "groom"): Photo {
  const spec = couplePhotos[who];
  const file = listFolder(couplePhotos.folder).find((f) => f.toLowerCase().startsWith(spec.name));
  return file
    ? { src: `${couplePhotos.folder}/${file}`, alt: spec.alt, position: spec.position }
    : { src: `/images/placeholders/${who}.svg`, alt: `${spec.alt} (placeholder)`, position: "50% 50%", placeholder: true };
}

export interface SitePhotos {
  hero: Photo[];
  invitation: Photo[];
  bride: Photo;
  groom: Photo;
  /** Everything not used above: invitation extras + the gallery folder */
  gallery: Photo[];
}

export function getSitePhotos(): SitePhotos {
  const hero = realPhotos("hero");
  const invitationAll = realPhotos("invitation");
  const gallery = realPhotos("gallery");

  return {
    hero: hero.length ? hero.slice(0, limits.hero) : placeholders("hero", limits.hero, defaultAlt.hero),
    invitation: invitationAll.length
      ? invitationAll.slice(0, limits.invitation)
      : placeholders("invitation", limits.invitation, defaultAlt.invitation),
    bride: couplePhoto("bride"),
    groom: couplePhoto("groom"),
    gallery:
      invitationAll.length > limits.invitation || gallery.length
        ? [...invitationAll.slice(limits.invitation), ...gallery]
        : placeholders("gallery", 10, defaultAlt.gallery),
  };
}
