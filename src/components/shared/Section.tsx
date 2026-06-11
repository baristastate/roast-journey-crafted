import type { ReactNode } from "react";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";

type Tone = "light" | "dark" | "warm" | "espresso";
type Size = "sm" | "md" | "lg";

const TONES: Record<Tone, string> = {
  light: "bg-background text-foreground",
  dark: "theme-dark bg-ink-black text-pearl-white",
  warm: "bg-cream-warm text-foreground",
  espresso: "theme-dark bg-espresso text-cream",
};

const SIZES: Record<Size, string> = {
  sm: "section-y-sm",
  md: "section-y",
  lg: "section-y-lg",
};

/**
 * Unified section wrapper. Locks vertical rhythm + horizontal container.
 */
export function Section({
  children,
  tone = "light",
  size = "md",
  narrow = false,
  className = "",
  id,
  bleed = false,
}: {
  children: ReactNode;
  tone?: Tone;
  size?: Size;
  narrow?: boolean;
  className?: string;
  id?: string;
  bleed?: boolean;
}) {
  return (
    <section id={id} className={`relative ${TONES[tone]} ${SIZES[size]} ${className}`}>
      {bleed ? children : (
        <div className={narrow ? "container-narrow" : "container-x"}>{children}</div>
      )}
    </section>
  );
}

/**
 * Consistent section header. eyebrow + headline left, lede + aside right.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  aside,
  align = "split",
  dark,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
  align?: "split" | "stack";
  dark?: boolean;
}) {
  if (align === "stack") {
    return (
      <Reveal>
        <header className="mb-[clamp(2.5rem,5vw,4.5rem)] max-w-3xl">
          {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
          <h2 className="mt-5 font-display font-bold tracking-display leading-[0.95] text-[clamp(2.4rem,5.2vw,4.5rem)] text-balance">
            {title}
          </h2>
          {lede && (
            <p className="mt-5 max-w-[42ch] text-[clamp(1rem,1.15vw,1.125rem)] leading-relaxed opacity-70">
              {lede}
            </p>
          )}
        </header>
      </Reveal>
    );
  }
  return (
    <header className="section-head">
      <Reveal>
        <div>
          {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
          <h2 className="mt-4 font-display font-bold tracking-display leading-[0.95] text-[clamp(2.4rem,5.2vw,4.5rem)] text-balance">
            {title}
          </h2>
        </div>
      </Reveal>
      {(lede || aside) && (
        <Reveal delay={0.08}>
          <div className="flex flex-col gap-5 lg:items-end lg:text-right">
            {lede && (
              <p className="max-w-[42ch] text-[clamp(0.95rem,1.05vw,1.0625rem)] leading-relaxed opacity-65">
                {lede}
              </p>
            )}
            {aside}
          </div>
        </Reveal>
      )}
    </header>
  );
}
