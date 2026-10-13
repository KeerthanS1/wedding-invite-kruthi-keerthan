import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * A cutting-chai glass and a South Indian filter-coffee tumbler in its davara,
 * with a heart between them and gently rising steam.
 */
export function ChaiCoffee({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const steel = `steel-${id}`;

  const steam = (x: number, top: number, delay: number) => (
    <path
      className="steam"
      style={{ animationDelay: `${delay}s` }}
      d={`M${x} ${top} C${x - 6} ${top - 8} ${x + 6} ${top - 14} ${x} ${top - 24}`}
      fill="none"
      stroke="currentColor"
      strokeOpacity="0.45"
      strokeWidth="2"
      strokeLinecap="round"
    />
  );

  return (
    <svg viewBox="0 0 230 130" className={cn("block text-plum", className)} aria-hidden="true" focusable="false">
      <defs>
        {/* brushed stainless steel */}
        <linearGradient id={steel} x1="0" x2="1">
          <stop offset="0" stopColor="#b9bec5" />
          <stop offset="0.35" stopColor="#f4f5f7" />
          <stop offset="0.6" stopColor="#d9dce0" />
          <stop offset="1" stopColor="#a9aeb6" />
        </linearGradient>
      </defs>

      {/* chai: tapered glass, half full */}
      {steam(42, 34, 0)}
      {steam(56, 34, 1.1)}
      <path d="M24.4 60 L32 112 H68 L75.6 60 Z" fill="#c98a4b" />
      <path d="M24.4 60 H75.6" stroke="#f3d9b8" strokeWidth="3" />
      <path d="M20 40 L30 114 H70 L80 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M36 66 L40 106 M50 66 V106 M64 66 L60 106" stroke="#fff7ea" strokeOpacity="0.35" strokeWidth="2" />

      {/* heart */}
      <path
        d="M115 86 C104 78 100 70 106 64 C110 60 115 63 115 67 C115 63 120 60 124 64 C130 70 126 78 115 86Z"
        fill="var(--color-rani)"
      />

      {/* filter coffee: frothy steel tumbler standing in its davara */}
      {steam(166, 26, 0.6)}
      {steam(181, 26, 1.7)}
      {/* tumbler */}
      <path d="M152 40 L156 100 H190 L194 40 Z" fill={`url(#${steel})`} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M163 46 L165 96" stroke="#fff" strokeOpacity="0.8" strokeWidth="2.5" strokeLinecap="round" />
      {/* froth spilling over the rim */}
      <path d="M152 39 Q151 29 162 30 Q166 23 174 26 Q182 22 186 29 Q196 29 194 39 Z" fill="#d9b48a" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="166" cy="32" r="1.6" fill="#fff7ea" />
      <circle cx="178" cy="30" r="1.2" fill="#fff7ea" />
      <circle cx="186" cy="34" r="1.4" fill="#fff7ea" />
      {/* rolled rim */}
      <rect x="149" y="38" width="48" height="5" rx="2.5" fill={`url(#${steel})`} stroke="currentColor" strokeWidth="2.5" />
      {/* davara: wide steel bowl, its front hides the tumbler's base */}
      <path d="M134 90 H212 L208 110 Q173 118 138 110 Z" fill={`url(#${steel})`} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="129" y="86" width="88" height="6" rx="3" fill={`url(#${steel})`} stroke="currentColor" strokeWidth="2.5" />
      <path d="M146 96 L148 108" stroke="#fff" strokeOpacity="0.8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
