import { couple, footer, weddingDate } from "@/data/wedding";
import { Kannada } from "@/components/ui/Kannada";
import { Rangoli } from "@/components/decorative/Rangoli";

export function Footer() {
  return (
    <footer className="bg-maroon-deep px-5 py-10 text-center text-ivory sm:py-14">
      <Rangoli petals={12} size={64} className="mx-auto text-gold" />
      <p className="mt-4 font-script text-5xl sm:text-6xl">{couple.names}</p>
      <p className="mt-1 text-lg text-gold">
        <Kannada>{couple.kn}</Kannada>
      </p>
      <p className="mt-3 text-sm tracking-[0.45em] text-gold">{weddingDate.footer}</p>
      <p className="mt-3 font-display text-lg italic text-ivory/80">{footer.line}</p>
    </footer>
  );
}
