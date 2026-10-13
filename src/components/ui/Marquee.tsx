import { Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop */
  duration?: number;
  /** Pause while hovered or focused */
  pauseOnHover?: boolean;
  className?: string;
  trackClassName?: string;
}

/**
 * Endless sideways scroll, done in CSS so it stays smooth and never captures the page scroll.
 * The children are rendered twice; the copy is hidden from screen readers and keyboard.
 */
export function Marquee({ children, duration = 40, pauseOnHover, className, trackClassName }: MarqueeProps) {
  const items = Children.toArray(children);
  return (
    <div className={cn("overflow-hidden", pauseOnHover && "marquee-pause", className)}>
      <div
        className={cn("marquee flex w-max", trackClassName)}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0">{items}</div>
        <div className="flex shrink-0" aria-hidden="true" inert>
          {items}
        </div>
      </div>
    </div>
  );
}
