import { useId } from "react";
import { cn } from "@/lib/utils";

/** A standing brass lamp (kuthuvilakku) with a softly flickering flame. */
export function BrassLamp({ className }: { className?: string }) {
  const gid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 60 130" className={cn("block", className)} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`glow-${gid}`}>
          <stop offset="0" stopColor="#f6c85a" stopOpacity="0.85" />
          <stop offset="0.45" stopColor="#d6a21e" stopOpacity="0.25" />
          <stop offset="1" stopColor="#d6a21e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`brass-${gid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#8a6428" />
          <stop offset="0.45" stopColor="#e0b85c" />
          <stop offset="1" stopColor="#8a6428" />
        </linearGradient>
      </defs>

      <circle className="lamp-glow" cx="30" cy="22" r="26" fill={`url(#glow-${gid})`} />

      <g className="flame">
        <path d="M30 4 C24 13 23.5 21 30 28 C36.5 21 36 13 30 4Z" fill="#f4b73a" />
        <path d="M30 14 C27.6 18.5 27.6 23 30 26 C32.4 23 32.4 18.5 30 14Z" fill="#fff1c2" />
      </g>

      <path d="M10 31 Q30 58 50 31 Q30 38 10 31Z" fill={`url(#brass-${gid})`} />
      <rect x="27.5" y="44" width="5" height="52" fill={`url(#brass-${gid})`} />
      <ellipse cx="30" cy="58" rx="8" ry="4.5" fill={`url(#brass-${gid})`} />
      <ellipse cx="30" cy="76" rx="6.5" ry="3.6" fill={`url(#brass-${gid})`} />
      <path d="M14 116 Q30 92 46 116Z" fill={`url(#brass-${gid})`} />
      <rect x="10" y="116" width="40" height="6" rx="2" fill={`url(#brass-${gid})`} />
      <rect x="6" y="122" width="48" height="5" rx="2" fill="#8a6428" />
    </svg>
  );
}
