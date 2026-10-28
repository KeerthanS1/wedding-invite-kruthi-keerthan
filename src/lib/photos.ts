import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
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

/**
 * A tiny (~16 px) blurred WebP of the photo as a data URL, roughly 200–400 bytes.
 * It is inlined into the page so every photo shows its colours instantly and
 * then sharpens as the full image arrives. Generated once per build.
 */
const blurCache = new Map<string, Promise<string | undefined>>();
function blurFor(publicPath: string): Promise<string | undefined> {
  let pending = blurCache.get(publicPath);
  if (!pending) {
    pending = sharp(path.join(process.cwd(), "public", publicPath))
      .rotate()
      .resize(16, 16, { fit: "inside" })
      .webp({ quality: 40 })
      .toBuffer()
      .then((buf) => `data:image/webp;base64,${buf.toString("base64")}`)
      .catch(() => undefined);
    blurCache.set(publicPath, pending);
  }
  return pending;
}

async function resolve(group: PhotoGroup, input: PhotoInput, index: number): Promise<Photo> {
  const item = typeof input === "string" ? { file: input } : input;
  const src = `${photoFolders[group]}/${item.file}`;
  const size = imageSize(src);
  return {
    src,
    width: size?.width,
    height: size?.height,
    portrait: size ? size.height > size.width : undefined,
    alt: item.alt ?? `${defaultAlt[group]} (photo ${index + 1})`,
    position: "position" in item && item.position ? item.position : "50% 50%",
    blur: await blurFor(src),
  };
}

function realPhotos(group: PhotoGroup): Promise<Photo[]> {
  const configured = photoConfig[group];
  const inputs = configured.length > 0 ? configured : listFolder(photoFolders[group]);
  return Promise.all(inputs.map((input, i) => resolve(group, input, i)));
}

function placeholders(prefix: string, count: number, alt: string): Photo[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/images/placeholders/${prefix}-${i + 1}.svg`,
    alt: `${alt} (placeholder ${i + 1})`,
    position: "50% 50%",
    width: 1200,
    height: 1500,
    portrait: true,
    placeholder: true,
  }));
}

async function couplePhoto(who: "bride" | "groom"): Promise<Photo> {
  const spec = couplePhotos[who];
  const file = listFolder(couplePhotos.folder).find((f) => f.toLowerCase().startsWith(spec.name));
  if (!file) {
    return { src: `/images/placeholders/${who}.svg`, alt: `${spec.alt} (placeholder)`, position: "50% 50%", width: 1200, height: 1500, placeholder: true };
  }
  const src = `${couplePhotos.folder}/${file}`;
  const size = imageSize(src);
  return { src, alt: spec.alt, position: spec.position, width: size?.width, height: size?.height, blur: await blurFor(src) };
}

export interface SitePhotos {
  hero: Photo[];
  /** Phone-only hero set (tall photos); falls back to `hero` when the folder is empty */
  heroMobile: Photo[];
  invitation: Photo[];
  bride: Photo;
  groom: Photo;
  /** Everything not used above: invitation extras + the gallery folder */
  gallery: Photo[];
}

export async function getSitePhotos(): Promise<SitePhotos> {
  const [hero, heroMobile, invitationAll, gallery, bride, groom] = await Promise.all([
    realPhotos("hero"),
    realPhotos("heroMobile"),
    realPhotos("invitation"),
    realPhotos("gallery"),
    couplePhoto("bride"),
    couplePhoto("groom"),
  ]);
  const heroSet = hero.length ? hero.slice(0, limits.hero) : placeholders("hero", limits.hero, defaultAlt.hero);

  return {
    hero: heroSet,
    heroMobile: heroMobile.length ? heroMobile.slice(0, limits.heroMobile) : heroSet,
    invitation: invitationAll.length
      ? invitationAll.slice(0, limits.invitation)
      : placeholders("invitation", 8, defaultAlt.invitation),
    bride,
    groom,
    gallery:
      invitationAll.length > limits.invitation || gallery.length
        ? [...invitationAll.slice(limits.invitation), ...gallery]
        : placeholders("gallery", 10, defaultAlt.gallery),
  };
}
