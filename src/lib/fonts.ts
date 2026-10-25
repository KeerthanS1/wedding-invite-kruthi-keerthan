import fs from "node:fs";
import path from "node:path";

/**
 * Optional self-hosted fonts that are not on Google Fonts.
 * Drop the font file into public/fonts/ with one of these names and it is used
 * automatically on the next build; until then the fallback font is shown.
 */
const LOCAL_FONTS = [
  { family: "Brittany Signature", base: "BrittanySignature" }, // the couple's names
  { family: "Cravello", base: "Cravello" }, // section headings
];

const FORMATS: Record<string, string> = { woff2: "woff2", woff: "woff", otf: "opentype", ttf: "truetype" };

/** @font-face rules for whichever local font files exist (server-only, build time). */
export function localFontFaces(): string {
  const dir = path.join(process.cwd(), "public", "fonts");
  return LOCAL_FONTS.map(({ family, base }) => {
    const sources = Object.entries(FORMATS)
      .filter(([ext]) => fs.existsSync(path.join(dir, `${base}.${ext}`)))
      .map(([ext, format]) => `url("/fonts/${base}.${ext}") format("${format}")`);
    return sources.length
      ? `@font-face{font-family:"${family}";src:${sources.join(",")};font-display:swap;}`
      : "";
  }).join("");
}
