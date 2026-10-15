import { cn } from "@/lib/utils";
import { KolamDivider } from "@/components/decorative/KolamDivider";
import { Kannada } from "./Kannada";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  id?: string;
  /** Kannada line above the heading */
  kn?: string;
  title: string;
  tone?: "light" | "dark";
  divider?: boolean;
  className?: string;
}

export function SectionHeading({ id, kn, title, tone = "light", divider = true, className }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      {kn && (
        <Reveal>
          <p className={cn("mb-1 text-2xl sm:text-3xl", dark ? "text-honey" : "text-rust")}>
            <Kannada>{kn}</Kannada>
          </p>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2
          id={id}
          className={cn(
            "text-balance font-display text-3xl leading-tight sm:text-4xl md:text-5xl",
            dark ? "text-cream" : "text-cocoa",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {divider && (
        <Reveal delay={0.2} className={cn("mt-4", dark ? "text-honey" : "text-amber")}>
          <KolamDivider size={40} />
        </Reveal>
      )}
    </div>
  );
}
