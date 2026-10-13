import { cn } from "@/lib/utils";

/**
 * A cutting-chai glass and a South Indian filter-coffee tumbler & davara,
 * with a heart between them and gently rising steam.
 */
export function ChaiCoffee({ className }: { className?: string }) {
  const steam = (x: number, delay: number) => (
    <path
      className="steam"
      style={{ animationDelay: `${delay}s` }}
      d={`M${x} 34 C${x - 6} 26 ${x + 6} 20 ${x} 10`}
      fill="none"
      stroke="currentColor"
      strokeOpacity="0.45"
      strokeWidth="2"
      strokeLinecap="round"
    />
  );

  return (
    <svg viewBox="0 0 230 130" className={cn("block text-plum", className)} aria-hidden="true" focusable="false">
      {/* chai: tapered glass, half full */}
      {steam(42, 0)}
      {steam(56, 1.1)}
      <path d="M24.4 60 L32 112 H68 L75.6 60 Z" fill="#c98a4b" />
      <path d="M24.4 60 H75.6" stroke="#f3d9b8" strokeWidth="3" />
      <path d="M20 40 L30 114 H70 L80 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M36 66 L40 106 M50 66 V106 M64 66 L60 106" stroke="#fff7ea" strokeOpacity="0.35" strokeWidth="2" />

      {/* heart */}
      <path
        d="M115 86 C104 78 100 70 106 64 C110 60 115 63 115 67 C115 63 120 60 124 64 C130 70 126 78 115 86Z"
        fill="var(--color-rani)"
      />

      {/* filter coffee: steel tumbler in a davara */}
      {steam(166, 0.6)}
      {steam(180, 1.7)}
      <path d="M148 40 L154 100 H192 L198 40 Z" fill="#e6e1dc" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <ellipse cx="173" cy="44" rx="23" ry="4.5" fill="#8b5a3c" />
      <path d="M156 52 H190" stroke="#fff" strokeOpacity="0.6" strokeWidth="2" />
      <path d="M130 98 Q173 128 216 98" fill="#e6e1dc" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M128 97 H218" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
