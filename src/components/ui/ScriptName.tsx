import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Hand-adjusted lettering for names where the script font's own letters don't look right
 * (Brittany Signature's "r" in Kruthi). Each image is a transparent cut-out of the lettering,
 * coloured with the surrounding text colour through a CSS mask, and sized in `em` so it lines
 * up with the font's baseline:
 *   ascent / descent: how far the ink rises above / drops below the baseline (in em, measured
 *                     from the font's own rendering of the same word),
 *   aspect:          width ÷ height of the cut-out.
 */
const LETTERING: Record<string, { src: string; ascent: number; descent: number; aspect: number }> = {
  Kruthi: { src: "/images/lettering/kruthi.png", ascent: 1.05, descent: 0.63, aspect: 1.3739 },
};

/** A name in the script font, using custom lettering when we have it. */
export function ScriptName({ name, className }: { name: string; className?: string }) {
  const art = LETTERING[name];
  if (!art) return <span className={className}>{name}</span>;

  const height = art.ascent + art.descent;
  const width = height * art.aspect;
  const mask = `url(${art.src}) center / 100% 100% no-repeat`;
  // The outer box has no height and sits on the baseline, so the lettering never changes
  // the line's height; the artwork hangs off it exactly as the font's own ascenders and
  // descenders would, and the name lines up with typed names next to it.
  const box: CSSProperties = { width: `${width}em`, height: 0, verticalAlign: "baseline" };
  const artStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    bottom: `-${art.descent}em`,
    width: `${width}em`,
    height: `${height}em`,
    backgroundColor: "currentColor",
    WebkitMask: mask,
    mask,
  };

  return (
    <span className={cn("relative inline-block", className)} style={box}>
      <span className="sr-only">{name}</span>
      <span aria-hidden="true" style={artStyle} />
    </span>
  );
}
