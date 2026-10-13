import { couple, footer, weddingDate } from "@/data/wedding";
import { Kannada } from "@/components/ui/Kannada";
import { Rangoli } from "@/components/decorative/Rangoli";

export function Footer() {
  return (
    <footer className="bg-plum-deep px-5 py-12 text-center text-cream sm:py-16">
      <Rangoli petals={12} size={64} className="mx-auto text-marigold" />
      <p className="mt-4 font-script text-6xl sm:text-7xl">{couple.names}</p>
      <p className="mt-1 text-lg text-turmeric">
        <Kannada>{couple.kn}</Kannada>
      </p>
      <p className="mt-3 text-sm tracking-[0.45em] text-turmeric">{weddingDate.footer}</p>
      <p className="mt-3 font-display text-lg italic text-cream/80">{footer.line}</p>
    </footer>
  );
}
