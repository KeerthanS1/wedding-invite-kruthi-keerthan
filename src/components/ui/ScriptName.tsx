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
  const mask = `url(${art.src}) center / 100% 100% no-repeat`;
  const style: CSSProperties = {
    height: `${height}em`,
    width: `${height * art.aspect}em`,
    verticalAlign: `-${art.descent}em`,
    backgroundColor: "currentColor",
    WebkitMask: mask,
    mask,
  };

  return (
    <span className={cn("inline-block", className)}>
      <span className="sr-only">{name}</span>
      <span aria-hidden="true" className="inline-block" style={style} />
    </span>
  );
}
