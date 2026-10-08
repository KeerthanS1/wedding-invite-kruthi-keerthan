import { couple, finalQuote } from "@/data/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { Kannada } from "@/components/ui/Kannada";
import { Lotus } from "@/components/decorative/FloralDecor";

/** A quiet closing note. */
export function FinalQuote() {
  return (
    <section id="quote" aria-label="A closing thought" className="clay py-14 text-center sm:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal className="flex justify-center text-brass">
          <Lotus className="h-6 w-11" />
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="mt-5 text-balance font-display text-2xl italic leading-snug text-maroon sm:text-4xl">
            <p>&ldquo;{finalQuote.text}&rdquo;</p>
          </blockquote>
        </Reveal>
        <Reveal delay={0.2} className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-vermilion">
            {finalQuote.signoff} <Kannada className="text-base normal-case tracking-normal">· {finalQuote.knSignoff}</Kannada>
          </p>
          <p className="mt-2 font-script text-6xl text-ink sm:text-7xl">{couple.names}</p>
        </Reveal>
      </div>
    </section>
  );
}
