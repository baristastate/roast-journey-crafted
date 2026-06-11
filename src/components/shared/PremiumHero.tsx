import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

type Line = { text: string; italic?: boolean };

export type PremiumHeroProps = {
  image: string;
  alt?: string;
  eyebrow?: ReactNode;
  lines: Line[];
  subtitle?: ReactNode;
  /** Tailwind classes for outer section bg + text */
  bgClass?: string;
  /** Color class for italic accent line (default: text-magenta-coral) */
  accentClass?: string;
  /** Overlay gradient strength preset */
  overlay?: "dark" | "light" | "espresso" | "cream";
  /** Minimum height (default 92svh) */
  minH?: string;
  /** Show animated scroll hint */
  scrollHint?: boolean;
  /** Show cursor-following glow */
  cursorGlow?: boolean;
  /** Show bottom fade into next section */
  bottomFade?: boolean;
  /** Accent color for ambient orbs (e.g. "magenta-coral", "cyan-bloom") */
  orb?: "magenta" | "cyan" | "gold";
  /** Extra content under subtitle (CTAs etc.) */
  children?: ReactNode;
  /** Optional right-column stats */
  stats?: { value: string; label: string }[];
  /** Headline font-size clamp() value */
  size?: string;
  italicSize?: string;
  /** Eyebrow trailing chip text */
  eyebrowMeta?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const OVERLAYS: Record<NonNullable<PremiumHeroProps["overlay"]>, string> = {
  dark: "bg-gradient-to-t from-ink-black/96 via-ink-black/45 to-ink-black/15",
  espresso: "bg-gradient-to-t from-espresso via-espresso/55 to-espresso/25",
  light: "bg-gradient-to-t from-pearl-white via-pearl-white/55 to-pearl-white/15",
  cream: "bg-gradient-to-b from-cream-warm/70 via-cream-warm/40 to-cream-warm",
};

const ORB_COLORS: Record<NonNullable<PremiumHeroProps["orb"]>, [string, string]> = {
  magenta: ["bg-magenta-coral/[0.13]", "bg-cyan-bloom/[0.08]"],
  cyan: ["bg-cyan-bloom/[0.13]", "bg-magenta-coral/[0.08]"],
  gold: ["bg-amber-400/[0.12]", "bg-magenta-coral/[0.08]"],
};

export function PremiumHero({
  image,
  alt = "",
  eyebrow,
  lines,
  subtitle,
  bgClass = "theme-dark bg-ink-black text-pearl-white",
  accentClass = "text-magenta-coral",
  overlay = "dark",
  minH = "92svh",
  scrollHint = true,
  cursorGlow = true,
  bottomFade = true,
  orb = "magenta",
  children,
  stats,
  size = "clamp(3.2rem,9vw,8rem)",
  italicSize = "clamp(2.6rem,7.6vw,6.8rem)",
  eyebrowMeta,
}: PremiumHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const yFg = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Cursor warm glow
  const cx = useMotionValue(-600);
  const cy = useMotionValue(-600);
  const gx = useSpring(cx, { damping: 28, stiffness: 90 });
  const gy = useSpring(cy, { damping: 28, stiffness: 90 });

  useEffect(() => {
    if (!cursorGlow) return;
    const onMove = (e: MouseEvent) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [cursorGlow, cx, cy]);

  const [orbA, orbB] = ORB_COLORS[orb];

  return (
    <section
      ref={ref}
      className={`grain relative isolate overflow-hidden ${bgClass}`}
      style={{ minHeight: minH }}
    >
      {/* Parallax background */}
      <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute inset-0 -z-10">
        <img
          src={image}
          alt={alt}
          aria-hidden={!alt}
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className={`absolute inset-0 ${OVERLAYS[overlay]}`} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />
      </motion.div>

      {/* Cursor-following glow */}
      {cursorGlow && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute z-0 h-[640px] w-[640px] rounded-full bg-magenta-coral/[0.10] blur-[130px]"
          style={{ left: gx, top: gy, translateX: "-50%", translateY: "-50%" }}
        />
      )}

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className={`absolute -top-32 -left-32 h-[70vh] w-[70vh] rounded-full blur-[130px] ${orbA}`}
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute top-1/3 -right-24 h-[48vh] w-[48vh] rounded-full blur-[110px] ${orbB}`}
          animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.85, 0.45] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      {/* Bottom fade */}
      {bottomFade && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[18svh] bg-gradient-to-b from-transparent to-current opacity-[0.001]"
          style={{ background: "linear-gradient(to bottom, transparent, var(--hero-fade, rgba(0,0,0,0.0)))" }}
        />
      )}

      {/* Main */}
      <motion.div
        style={{ y: yFg, opacity }}
        className="relative z-10 mx-auto flex max-w-[1400px] flex-col gap-10 px-5 pt-28 pb-20 md:px-10 md:pt-40 md:pb-28"
      >
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.36em] opacity-70"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-magenta-coral" />
            <span>{eyebrow}</span>
            {eyebrowMeta && (
              <>
                <span className="h-px w-8 bg-current opacity-25" />
                <span className="opacity-70">{eyebrowMeta}</span>
              </>
            )}
          </motion.div>
        )}

        <h1 className="font-display font-bold leading-[0.9] tracking-display">
          {lines.map((line, li) => {
            const words = line.text.split(" ");
            const baseDelay = 0.18 + li * 0.22;
            return (
              <span
                key={li}
                className={`block ${line.italic ? `${accentClass} display-italic` : ""}`}
                style={{ fontSize: line.italic ? italicSize : size }}
              >
                {words.map((w, i) => (
                  <motion.span
                    key={w + i}
                    initial={{ opacity: 0, y: 60, filter: "blur(22px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: baseDelay + i * 0.09,
                      duration: 1,
                      ease: EASE,
                    }}
                    className="mr-[0.22em] inline-block last:mr-0"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
            );
          })}
        </h1>

        {(subtitle || children || stats) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
            className="mt-2 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-xl">
              {subtitle && (
                <p className="text-base md:text-lg leading-relaxed font-light opacity-75">
                  {subtitle}
                </p>
              )}
              {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
            </div>
            {stats && (
              <div className="hidden lg:flex flex-col gap-5 text-right">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.6 }}
                    className="border-r border-current/15 pr-5 opacity-90"
                  >
                    <div className="font-display text-3xl md:text-4xl font-bold">{s.value}</div>
                    <div className="opacity-50 text-[0.62rem] uppercase tracking-[0.26em] mt-1">
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {scrollHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-9 w-5 items-start justify-center rounded-full border border-current/30 pt-1.5"
            >
              <div className="h-1.5 w-px rounded-full bg-current/60" />
            </motion.div>
            <span className="text-[0.6rem] uppercase tracking-[0.4em] opacity-50">Scroll</span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
