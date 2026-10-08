import { cn } from "@/lib/utils";

/** A single marigold bloom. */
export function Marigold({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("block", className)} aria-hidden="true" focusable="false">
      {Array.from({ length: 10 }).map((_, i) => (
        <ellipse key={i} cx="12" cy="5.6" rx="2.6" ry="5" fill="#d98a1e" transform={`rotate(${i * 36} 12 12)`} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse key={i} cx="12" cy="7.8" rx="2" ry="3.6" fill="#f0b43a" transform={`rotate(${i * 45 + 20} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="2.4" fill="#a8581a" />
    </svg>
  );
}

function MangoLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 44" className={cn("block", className)} aria-hidden="true" focusable="false">
      <path d="M7 0 C13 10 13 30 7 44 C1 30 1 10 7 0Z" fill="#2f5a3d" />
      <path d="M7 2 V42" stroke="#1d3a2b" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

/**
 * A mango-leaf and marigold toran (door hanging), swaying very slightly.
 * Place it across the top edge of a positioned parent.
 */
export function Toran({ className, count = 18 }: { className?: string; count?: number }) {
  return (
    <div
      className={cn("pointer-events-none flex w-full items-start justify-between overflow-hidden", className)}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="sway flex shrink-0 flex-col items-center"
          style={{ animationDelay: `${(i % 6) * -1.1}s`, animationDuration: `${6 + (i % 4)}s` }}
        >
          <Marigold className="size-3.5 sm:size-4" />
          <MangoLeaf className="-mt-0.5 h-8 w-2.5 sm:h-10 sm:w-3" />
        </div>
      ))}
    </div>
  );
}

/** A tiny lotus used as an ornament between lines of text. */
export function Lotus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 28" className={cn("block", className)} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" focusable="false">
      <path d="M24 2 C30 8 30 18 24 24 C18 18 18 8 24 2Z" />
      <path d="M24 24 C14 22 8 14 6 8 C14 8 20 14 24 24Z" />
      <path d="M24 24 C34 22 40 14 42 8 C34 8 28 14 24 24Z" />
      <path d="M24 24 C12 26 4 22 1 17 C9 16 18 19 24 24Z" />
      <path d="M24 24 C36 26 44 22 47 17 C39 16 30 19 24 24Z" />
    </svg>
  );
}
