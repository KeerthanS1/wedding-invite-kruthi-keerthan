import { cn } from "@/lib/utils";

/**
 * A stylised South Indian mandapam pillar, line-art only.
 * Stretches to fill the height of its parent: capital, carved block and base keep
 * their proportions while the shaft stretches. Colour comes from `currentColor`.
 */
export function Pillar({ className }: { className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.1,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
  };
  const wash = { fill: "currentColor", fillOpacity: 0.1 };

  return (
    <div className={cn("flex h-full flex-col items-center", className)} aria-hidden="true">
      {/* Capital: abacus slab, inverted-lotus bracket, volutes */}
      <svg viewBox="0 0 120 92" className="block w-full shrink-0" {...common}>
        <rect x="6" y="2" width="108" height="14" rx="1.5" {...wash} />
        <rect x="18" y="16" width="84" height="9" {...wash} />
        <path d="M10 16 C0 40 22 54 38 38" />
        <path d="M110 16 C120 40 98 54 82 38" />
        <path d="M28 25 Q34 54 60 66 Q86 54 92 25" {...wash} />
        <path d="M44 25 Q47 46 60 56 Q73 46 76 25" />
        <path d="M60 25 V56" />
        <rect x="38" y="66" width="44" height="7" rx="1" {...wash} />
        <rect x="46" y="73" width="28" height="19" {...wash} />
      </svg>

      <Shaft />

      {/* Carved central block with lotus medallion */}
      <svg viewBox="0 0 120 124" className="block w-full shrink-0" {...common}>
        <rect x="14" y="2" width="92" height="9" rx="1" {...wash} />
        <rect x="24" y="11" width="72" height="102" {...wash} />
        <circle cx="60" cy="62" r="29" />
        <circle cx="60" cy="62" r="6" />
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={i} d="M60 33 Q66 48 60 56 Q54 48 60 33" transform={`rotate(${i * 45} 60 62)`} />
        ))}
        <rect x="14" y="113" width="92" height="9" rx="1" {...wash} />
      </svg>

      <Shaft />

      {/* Base: kumbha and stepped plinth */}
      <svg viewBox="0 0 120 104" className="block w-full shrink-0" {...common}>
        <rect x="46" y="0" width="28" height="14" {...wash} />
        <rect x="38" y="14" width="44" height="8" rx="1" {...wash} />
        <path d="M40 22 Q16 46 30 64 H90 Q104 46 80 22Z" {...wash} />
        <path d="M52 30 Q44 46 52 60 M68 30 Q76 46 68 60 M60 28 V62" />
        <rect x="22" y="64" width="76" height="12" {...wash} />
        <rect x="10" y="76" width="100" height="13" {...wash} />
        <rect x="2" y="89" width="116" height="13" {...wash} />
      </svg>
    </div>
  );
}

function Shaft() {
  return (
    <svg
      viewBox="0 0 120 100"
      preserveAspectRatio="none"
      className="block min-h-6 w-full flex-1"
      fill="none"
      stroke="currentColor"
    >
      <rect x="44" y="0" width="32" height="100" fill="currentColor" fillOpacity="0.08" vectorEffect="non-scaling-stroke" strokeWidth="1.1" />
      <path d="M52 0V100M60 0V100M68 0V100" strokeOpacity="0.55" vectorEffect="non-scaling-stroke" strokeWidth="0.8" />
      <path d="M40 0H80M40 100H80" vectorEffect="non-scaling-stroke" strokeWidth="1.4" />
    </svg>
  );
}
