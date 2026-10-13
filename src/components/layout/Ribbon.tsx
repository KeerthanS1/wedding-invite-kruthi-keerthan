import { ribbon } from "@/data/wedding";
import { Marquee } from "@/components/ui/Marquee";

/** A playful tilted banner that scrolls Kannada and English greetings. */
export function Ribbon() {
  return (
    <div className="relative z-10 -my-4 -rotate-2 py-1" aria-hidden="true">
      <Marquee duration={30} className="bg-rani py-3 text-cream shadow-lg shadow-rani/25 sm:py-4">
        {ribbon.map((text) => (
          <span key={text} className="flex items-center whitespace-nowrap px-5 text-base font-semibold sm:text-xl">
            <span lang={/[ಀ-೿]/.test(text) ? "kn" : undefined} className={/[ಀ-೿]/.test(text) ? "font-kn" : undefined}>
              {text}
            </span>
            <span className="ml-10 text-turmeric">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
