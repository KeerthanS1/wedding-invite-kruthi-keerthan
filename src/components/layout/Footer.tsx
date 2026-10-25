import { couple, footer, weddingDate } from "@/data/wedding";
import { Kannada } from "@/components/ui/Kannada";
import { ScriptName } from "@/components/ui/ScriptName";
import { Rangoli } from "@/components/decorative/Rangoli";

export function Footer() {
  return (
    <footer className="bg-espresso px-5 py-12 text-center text-cream sm:py-16">
      <Rangoli petals={12} size={64} className="mx-auto text-amber" />
      <p className="mt-4 font-script text-4xl sm:text-5xl">
        <ScriptName name={couple.first} /> &amp; {couple.second}
      </p>
      <p className="mt-1 text-xl text-honey">
        <Kannada>{couple.kn}</Kannada>
      </p>
      <p className="mt-3 text-sm tracking-[0.45em] text-honey">{weddingDate.footer}</p>
      <p className="mt-3 font-display text-lg italic text-cream/80">{footer.line}</p>
    </footer>
  );
}
