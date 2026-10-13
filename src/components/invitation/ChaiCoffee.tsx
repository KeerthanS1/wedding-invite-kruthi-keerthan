import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * A cutting-chai glass and a South Indian filter-coffee tumbler in its davara,
 * with a heart between them and gently rising steam.
 *
 * Layout (viewBox 240 × 130): both cups stand on the same baseline (y = 112)
 * and rise to the same rim height (y = 42); chai is centred at x = 60, the heart at
 * x = 120 and the coffee at x = 180, so the spacing is symmetrical.
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

  const outline = { stroke: "currentColor", strokeWidth: 2.5, strokeLinejoin: "round" as const };

  return (
    <svg viewBox="0 0 240 130" className={cn("block text-plum", className)} aria-hidden="true" focusable="false">
      <defs>
        {/* brushed stainless steel */}
        <linearGradient id={steel} x1="0" x2="1">
          <stop offset="0" stopColor="#b9bec5" />
          <stop offset="0.35" stopColor="#f4f5f7" />
          <stop offset="0.6" stopColor="#d9dce0" />
          <stop offset="1" stopColor="#a9aeb6" />
        </linearGradient>
      </defs>

      {/* ── chai: tapered cutting-chai glass, centred at x = 60 ── */}
      {steam(53, 36, 0)}
      {steam(67, 36, 1.1)}
      <path d="M32.6 60 L40 112 H80 L87.4 60 Z" fill="#c98a4b" />
      <path d="M32.6 60 H87.4" stroke="#f3d9b8" strokeWidth="3" />
      <path d="M46 67 L49 106 M60 67 V106 M74 67 L71 106" stroke="#fff7ea" strokeOpacity="0.35" strokeWidth="2" />
      <path d="M30 42 L40 112 H80 L90 42" fill="none" {...outline} />

      {/* ── heart, centred at x = 120 between the cups ── */}
      <path
        d="M120 90 C109 82 105 74 111 68 C115 64 120 67 120 71 C120 67 125 64 129 68 C135 74 131 82 120 90Z"
        fill="var(--color-rani)"
      />

      {/* ── filter coffee: steel tumbler in its davara, centred at x = 180 ── */}
      {steam(173, 30, 0.6)}
      {steam(187, 30, 1.7)}
      {/* tumbler (its base is hidden by the davara) */}
      <path d="M161 45 L164 94 H196 L199 45 Z" fill={`url(#${steel})`} {...outline} />
      <path d="M170 51 L171.5 90" stroke="#fff" strokeOpacity="0.8" strokeWidth="2.5" strokeLinecap="round" />
      {/* froth rising just above the rim */}
      <path
        d="M162 43 Q161 35 168 35 Q172 30 180 31.5 Q188 30 192 35 Q199 35 198 43 Z"
        fill="#d9b48a"
        {...outline}
      />
      <circle cx="171" cy="38" r="1.4" fill="#fff7ea" />
      <circle cx="182" cy="36" r="1.2" fill="#fff7ea" />
      <circle cx="190" cy="39" r="1.3" fill="#fff7ea" />
      {/* rolled rim */}
      <rect x="158" y="42" width="44" height="5" rx="2.5" fill={`url(#${steel})`} {...outline} />
      {/* davara: wide, shallow bowl standing on the shared baseline */}
      <path d="M150 94 H210 L206 108 Q180 112.5 154 108 Z" fill={`url(#${steel})`} {...outline} />
      <rect x="146" y="89" width="68" height="6" rx="3" fill={`url(#${steel})`} {...outline} />
      <path d="M159 98 L160.5 107" stroke="#fff" strokeOpacity="0.8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
