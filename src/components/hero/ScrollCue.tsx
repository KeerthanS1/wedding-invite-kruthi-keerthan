"use client";

import { ChevronDown } from "lucide-react";
import { getLenis } from "@/lib/scroll";

/**
 * Phones only: a small animated "scroll down" hint just below the (slightly shorter) hero,
 * so guests can see there is more to the invitation. Tapping it glides to the next section.
 */
export function ScrollCue() {
  const goNext = () => {
    const next = document.getElementById("invitation");
    if (!next) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(next, { duration: 1.2 });
    else next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={goNext}
      aria-label="Scroll down to the invitation"
      className="flex w-full justify-center bg-cream pt-2 text-rust md:hidden"
    >
      <span className="scroll-cue flex flex-col items-center" aria-hidden="true">
        <ChevronDown className="size-5" />
        <ChevronDown className="-mt-3 size-5 opacity-50" />
      </span>
    </button>
  );
}
