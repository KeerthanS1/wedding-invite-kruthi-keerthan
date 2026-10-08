import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Kannada text, in its own typeface and tagged for screen readers. */
export function Kannada({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span lang="kn" className={cn("font-kn", className)}>
      {children}
    </span>
  );
}
