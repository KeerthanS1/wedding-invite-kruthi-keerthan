import { cn } from "@/lib/utils";
import { KolamDivider } from "@/components/decorative/KolamDivider";
import { Kannada } from "./Kannada";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  id?: string;
  /** Small Kannada line above the heading */
  kn?: string;
  title: string;
  subtitle?: string;
  level?: "h2" | "h3";
  tone?: "light" | "dark";
  align?: "center" | "left";
  divider?: boolean;
  className?: string;
}

export function SectionHeading({
  id,
  kn,
  title,
  subtitle,
  level: Tag = "h2",
  tone = "light",
  align = "center",
  divider = true,
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("mx-auto max-w-3xl", align === "center" ? "text-center" : "text-left", className)}>
      {kn && (
        <Reveal>
          <p className={cn("mb-2 text-xl sm:text-2xl", dark ? "text-gold" : "text-vermilion")}>
            <Kannada>{kn}</Kannada>
          </p>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <Tag
          id={id}
          className={cn(
            "text-balance font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl",
            dark ? "text-ivory" : "text-maroon",
          )}
        >
          {title}
        </Tag>
      </Reveal>
      {divider && (
        <Reveal delay={0.2} className={cn("mt-4 sm:mt-5", dark ? "text-gold" : "text-brass")}>
          <KolamDivider className={align === "left" ? "justify-start" : undefined} size={44} />
        </Reveal>
      )}
      {subtitle && (
        <Reveal delay={0.3}>
          <p className={cn("mt-4 text-pretty text-base sm:text-lg", dark ? "text-ivory/80" : "text-ink/70")}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
