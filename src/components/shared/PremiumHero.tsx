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
  cursorGlow?: boolean;
  bottomFade?: boolean;
  orb?: "magenta" | "cyan" | "gold";
  children?: ReactNode;
  stats?: { value: string; label: string }[];
  size?: string;
  italicSize?: string;
  eyebrowMeta?: string;
  issue?: string;
  caption?: string;
  section?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const OVERLAYS: Record<NonNullable<PremiumHeroProps["overlay"]>, string> = {
  dark: "bg-[linear-gradient(115deg,rgba(12,12,16,0.92)_0%,rgba(12,12,16,0.7)_45%,rgba(12,12,16,0.35)_75%,rgba(12,12,16,0.55)_100%)]",
  espresso:
    "bg-[linear-gradient(115deg,rgba(48,28,20,0.92)_0%,rgba(48,28,20,0.7)_45%,rgba(48,28,20,0.3)_75%,rgba(48,28,20,0.55)_100%)]",
  light:
    "bg-[linear-gradient(115deg,rgba(250,250,247,0.92)_0%,rgba(250,250,247,0.7)_45%,rgba(250,250,247,0.3)_75%,rgba(250,250,247,0.55)_100%)]",
  cream:
    "bg-[linear-gradient(115deg,rgba(245,238,225,0.9)_0%,rgba(245,238,225,0.65)_45%,rgba(245,238,225,0.3)_75%,rgba(245,238,225,0.55)_100%)]",
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
  minH = "100svh",
  scrollHint = true,
  bottomFade = true,
  children,
  stats,
  size = "clamp(3.6rem,11vw,10.5rem)",
  italicSize = "clamp(3rem,9.5vw,9rem)",
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
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mastheadMeta = issue ?? formatIssue();
  const isDark = bgClass.includes("dark") || bgClass.includes("ink-black");

  return (
    <section
      ref={ref}
      className={`relative isolate overflow-hidden ${bgClass}`}
      style={{ minHeight: minH }}
    >
      {/* ── Full-bleed background image ───────────────── */}
      <motion.img
        src={image}
        alt={alt}
        aria-hidden={!alt}
        style={{ y: yImg, scale: scaleImg }}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className={`pointer-events-none absolute inset-0 z-[1] ${OVERLAYS[overlay]}`} />
      {/* Subtle film grain via radial vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 30%, transparent 40%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* ── Masthead bar ─────────────────────────────── */}
      <div className="relative z-20 border-b border-current/10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-3 md:px-10">
          <div className="kicker flex items-center gap-3 opacity-80">
            <span className="font-serif italic normal-case tracking-normal text-base">№</span>
            <span>Roast Journal</span>
            <span className="hidden h-px w-8 bg-current opacity-30 md:inline-block" />
            <span className="hidden md:inline">{mastheadMeta}</span>
          </div>
          <div className="kicker hidden items-center gap-3 opacity-70 md:flex">
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
        className="kicker pointer-events-none absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 -rotate-90 origin-left opacity-60 md:block"
      >
        <span className="mr-3 font-serif italic normal-case tracking-normal">— </span>
        {section}
      </div>

      {/* Register-mark crop ticks at the edges */}
      <span className="pointer-events-none absolute left-4 top-16 z-20 h-3 w-3 border-l border-t border-current/50" />
      <span className="pointer-events-none absolute right-4 top-16 z-20 h-3 w-3 border-r border-t border-current/50" />
      <span className="pointer-events-none absolute left-4 bottom-16 z-20 h-3 w-3 border-l border-b border-current/50" />
      <span className="pointer-events-none absolute right-4 bottom-16 z-20 h-3 w-3 border-r border-b border-current/50" />

      {/* ── Editorial content ───────────────────────── */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto flex max-w-[1500px] flex-col justify-end px-5 pt-16 pb-24 md:px-10 md:pt-24 md:pb-28"
        // Push content downward so it sits on the lower 2/3 of the frame
      >
        <div className="grid grid-cols-12 gap-6" style={{ minHeight: "calc(100svh - 14rem)" }}>
          <div className="col-span-12 flex flex-col justify-end lg:col-span-9 xl:col-span-8">
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="kicker mb-6 flex flex-wrap items-center gap-3 opacity-85"
              >
                <span className="font-serif italic normal-case tracking-normal text-sm opacity-70">
                  Editor's pick —
                </span>
                <span>{eyebrow}</span>
                {eyebrowMeta && (
                  <>
                    <span className="h-px w-6 bg-current opacity-40" />
                    <span className="opacity-80">{eyebrowMeta}</span>
                  </>
                )}
              </motion.div>
            )}

            <div className="mb-5 h-px w-24 origin-left bg-current/50 ink-sweep" />

            <h1
              className="font-serif font-bold leading-[0.88] tracking-tight"
              style={{ textShadow: isDark ? "0 2px 30px rgba(0,0,0,0.45)" : "none" }}
            >
              {lines.map((line, li) => {
                const words = line.text.split(" ");
                const baseDelay = 0.12 + li * 0.18;
                return (
                  <span
                    key={li}
                    className={`block ${line.italic ? `${accentClass} italic` : ""}`}
                    style={{
                      fontSize: line.italic ? italicSize : size,
                      marginLeft: line.italic ? "-0.04em" : 0,
                    }}
                  >
                    {words.map((w, i) => (
                      <span
                        key={w + i}
                        className="mr-[0.18em] inline-block overflow-hidden last:mr-0"
                      >
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

            {(subtitle || children) && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
                className="mt-8 max-w-[52ch]"
              >
                {subtitle && (
                  <p className="font-serif text-lg md:text-xl leading-[1.45] opacity-90 dropcap">
                    {subtitle}
                  </p>
                )}
                {children && (
                  <div className="mt-7 flex flex-wrap items-center gap-3">{children}</div>
                )}
              </motion.div>
            )}

            {caption && (
              <div className="kicker mt-8 opacity-65">Fig. 01 — {caption}</div>
            )}
          </div>

          {/* Stats column anchored bottom-right */}
          {stats && (
            <div className="col-span-12 flex items-end lg:col-span-3 lg:col-start-10 xl:col-span-4 xl:col-start-9">
              <div className="grid w-full grid-cols-3 gap-px overflow-hidden rounded-sm border border-current/20 bg-current/10 backdrop-blur-md">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.08, duration: 0.55 }}
                    className={`flex flex-col gap-1 px-4 py-5 ${
                      isDark ? "bg-ink-black/70" : "bg-pearl-white/70"
                    }`}
                  >
                    <span className="font-serif text-3xl md:text-4xl font-bold leading-none">
                      {s.value}
                    </span>
                    <span className="kicker opacity-65 mt-2">{s.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {scrollHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="pointer-events-none absolute bottom-5 right-6 z-20 flex items-center gap-2"
        >
          <span className="kicker">Scroll</span>
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
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[14svh]"
          style={{
            background: isDark
              ? "linear-gradient(to bottom, transparent, rgba(12,12,16,0.98))"
              : "linear-gradient(to bottom, transparent, rgba(250,250,247,0.98))",
          }}
        />
      )}
    </section>
  );
}
