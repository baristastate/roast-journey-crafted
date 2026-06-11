import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Line = { text: string; italic?: boolean };

export type PremiumHeroProps = {
  image: string;
  alt?: string;
  eyebrow?: ReactNode;
  lines: Line[];
  subtitle?: ReactNode;
  bgClass?: string;
  accentClass?: string;
  overlay?: "dark" | "light" | "espresso" | "cream";
  minH?: string;
  scrollHint?: boolean;
  /** kept for API compat, no longer renders the AI-style cursor blob */
  cursorGlow?: boolean;
  bottomFade?: boolean;
  orb?: "magenta" | "cyan" | "gold";
  children?: ReactNode;
  stats?: { value: string; label: string }[];
  size?: string;
  italicSize?: string;
  eyebrowMeta?: string;
  /** Optional issue/edition meta shown in masthead */
  issue?: string;
  /** Optional editorial caption shown next to the image */
  caption?: string;
  /** Optional section label in marginalia (rotated) */
  section?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const OVERLAYS: Record<NonNullable<PremiumHeroProps["overlay"]>, string> = {
  dark: "bg-gradient-to-tr from-ink-black/85 via-ink-black/40 to-transparent",
  espresso: "bg-gradient-to-tr from-espresso/85 via-espresso/45 to-transparent",
  light: "bg-gradient-to-tr from-pearl-white/85 via-pearl-white/45 to-transparent",
  cream: "bg-gradient-to-b from-cream-warm/60 via-cream-warm/30 to-cream-warm",
};

function formatIssue() {
  const d = new Date();
  const week = Math.ceil(
    ((d.getTime() - new Date(d.getFullYear(), 0, 1).getTime()) / 86400000 +
      new Date(d.getFullYear(), 0, 1).getDay() +
      1) /
      7,
  );
  return `KW ${String(week).padStart(2, "0")} · ${d.getFullYear()}`;
}

export function PremiumHero({
  image,
  alt = "",
  eyebrow,
  lines,
  subtitle,
  bgClass = "theme-dark bg-ink-black text-pearl-white",
  accentClass = "text-magenta-coral",
  overlay = "dark",
  minH = "94svh",
  scrollHint = true,
  bottomFade = true,
  children,
  stats,
  size = "clamp(3.4rem,10.5vw,9.5rem)",
  italicSize = "clamp(2.8rem,9vw,8.2rem)",
  eyebrowMeta,
  issue,
  caption,
  section = "Edition",
}: PremiumHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // restrained parallax — editorial, not "scroll funhouse"
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const rotImg = useTransform(scrollYProgress, [0, 1], [0, -1.4]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const mastheadMeta = issue ?? formatIssue();
  const isDark = bgClass.includes("dark") || bgClass.includes("ink-black");

  return (
    <section
      ref={ref}
      className={`relative isolate overflow-hidden ${bgClass}`}
      style={{ minHeight: minH }}
    >
      {/* ── Masthead bar ─────────────────────────────── */}
      <div className="relative z-20 border-b border-current/10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-3 md:px-10">
          <div className="kicker flex items-center gap-3 opacity-70">
            <span className="font-serif italic normal-case tracking-normal text-base">№</span>
            <span>Roast Journal</span>
            <span className="hidden h-px w-8 bg-current opacity-30 md:inline-block" />
            <span className="hidden md:inline">{mastheadMeta}</span>
          </div>
          <div className="kicker hidden items-center gap-3 opacity-60 md:flex">
            <motion.span
              className={`h-1.5 w-1.5 rounded-full ${accentClass.replace("text-", "bg-")}`}
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
            Live · Frisch geröstet
          </div>
        </div>
      </div>

      {/* ── Rotated section marginalia ──────────────── */}
      <div
        aria-hidden
        className="kicker pointer-events-none absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 -rotate-90 origin-left opacity-50 md:block"
      >
        <span className="mr-3 font-serif italic normal-case tracking-normal">— </span>
        {section}
      </div>

      {/* ── Main editorial grid ─────────────────────── */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto max-w-[1500px] px-5 pt-10 pb-20 md:px-10 md:pt-16 md:pb-28"
      >
        <div className="editorial-grid">
          {/* LEFT — headline + lede */}
          <div className="col-span-12 lg:col-span-7 xl:col-span-7">
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="kicker mb-6 flex flex-wrap items-center gap-3 opacity-75"
              >
                <span className="font-serif italic normal-case tracking-normal text-sm opacity-60">
                  Editor's pick —
                </span>
                <span>{eyebrow}</span>
                {eyebrowMeta && (
                  <>
                    <span className="h-px w-6 bg-current opacity-30" />
                    <span className="opacity-70">{eyebrowMeta}</span>
                  </>
                )}
              </motion.div>
            )}

            {/* animated rule */}
            <div className="mb-5 h-px w-24 origin-left bg-current/40 ink-sweep" />

            <h1 className="font-serif font-bold leading-[0.88] tracking-tight">
              {lines.map((line, li) => {
                const words = line.text.split(" ");
                const baseDelay = 0.12 + li * 0.18;
                return (
                  <span
                    key={li}
                    className={`block ${line.italic ? `${accentClass} italic` : ""}`}
                    style={{
                      fontSize: line.italic ? italicSize : size,
                      // editorial moves: tighter leading and a slight negative left margin on italics
                      marginLeft: line.italic ? "-0.04em" : 0,
                    }}
                  >
                    {words.map((w, i) => (
                      <span key={w + i} className="mr-[0.18em] inline-block overflow-hidden last:mr-0">
                        <motion.span
                          initial={{ y: "108%" }}
                          animate={{ y: "0%" }}
                          transition={{
                            delay: baseDelay + i * 0.07,
                            duration: 0.95,
                            ease: EASE,
                          }}
                          className="inline-block will-change-transform"
                        >
                          {w}
                        </motion.span>
                      </span>
                    ))}
                  </span>
                );
              })}
            </h1>

            {/* lede + actions */}
            {(subtitle || children) && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
                className="mt-10 grid grid-cols-12 gap-6"
              >
                <div className="col-span-12 md:col-span-1 hidden md:flex justify-end">
                  <span className="kicker rotate-180 [writing-mode:vertical-rl] opacity-50">
                    Lede / 01
                  </span>
                </div>
                <div className="col-span-12 md:col-span-11">
                  {subtitle && (
                    <p className="font-serif text-lg md:text-xl leading-[1.45] opacity-85 max-w-[44ch] dropcap">
                      {subtitle}
                    </p>
                  )}
                  {children && (
                    <div className="mt-7 flex flex-wrap items-center gap-3">{children}</div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT — image plate + caption + stats */}
          <div className="col-span-12 lg:col-span-5 xl:col-span-5 mt-10 lg:mt-0">
            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
              className="relative"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-current/15">
                <motion.img
                  src={image}
                  alt={alt}
                  aria-hidden={!alt}
                  style={{ y: yImg, rotate: rotImg }}
                  className="h-[112%] w-full object-cover"
                  fetchPriority="high"
                />
                <div className={`pointer-events-none absolute inset-0 ${OVERLAYS[overlay]}`} />
                {/* register-mark crop ticks */}
                <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-current/60" />
                <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-current/60" />
                <span className="absolute left-2 bottom-2 h-3 w-3 border-l border-b border-current/60" />
                <span className="absolute right-2 bottom-2 h-3 w-3 border-r border-b border-current/60" />
              </div>
              <figcaption className="mt-3 flex items-start justify-between gap-4">
                <span className="kicker opacity-60">
                  Fig. 01 — {caption ?? "Single Origin, frisch geröstet"}
                </span>
                <span className="font-serif italic text-sm opacity-60">
                  Photographed in studio
                </span>
              </figcaption>
            </motion.figure>

            {/* stats as editorial sidebar */}
            {stats && (
              <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-current/15 bg-current/10">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.08, duration: 0.55 }}
                    className={`flex flex-col gap-1 px-4 py-5 ${
                      isDark ? "bg-ink-black" : "bg-pearl-white"
                    }`}
                  >
                    <span className="font-serif text-3xl md:text-4xl font-bold leading-none">
                      {s.value}
                    </span>
                    <span className="kicker opacity-55 mt-2">{s.label}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* bottom rule + colophon */}
        <div className="mt-14 hidden items-end justify-between gap-6 md:flex">
          <div className="flex-1 rule" />
          <span className="kicker whitespace-nowrap opacity-50">
            Folio / Continued below ↓
          </span>
        </div>
      </motion.div>

      {scrollHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="pointer-events-none absolute bottom-5 right-6 z-20 flex items-center gap-2"
        >
          <span className="kicker opacity-70">Scroll</span>
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="font-serif italic"
          >
            →
          </motion.span>
        </motion.div>
      )}

      {bottomFade && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[10svh]"
          style={{
            background: isDark
              ? "linear-gradient(to bottom, transparent, rgba(12,12,16,0.95))"
              : "linear-gradient(to bottom, transparent, rgba(250,250,247,0.95))",
          }}
        />
      )}
    </section>
  );
}
