import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Temple-saree style border: twin rules with an interlocking row of
 * triangular teeth and tiny lotus dots. Scales to any width.
 */
export function TempleBorder({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className={cn("block h-5 w-full text-brass", className)} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={`tb-${id}`} width="24" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 3H24M0 17H24" stroke="currentColor" strokeWidth="0.8" />
          <path d="M0 16 L6 5 L12 16Z" fill="currentColor" fillOpacity="0.85" />
          <path d="M12 4 L18 15 L24 4Z" fill="currentColor" fillOpacity="0.45" />
          <circle cx="6" cy="10.5" r="1.1" fill="#fbf5e6" fillOpacity="0.9" />
        </pattern>
      </defs>
      <rect width="100%" height="20" fill={`url(#tb-${id})`} />
    </svg>
  );
}
