import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

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

/**
 * Stronger gradients than v1 so headline + dropcap reliably clear WCAG AA
 * against very busy hero photography. Dark/espresso target white text;
 * light/cream target ink-black text.
 */
const OVERLAYS: Record<NonNullable<PremiumHeroProps["overlay"]>, string> = {
  dark: "bg-[linear-gradient(115deg,rgba(8,8,12,0.94)_0%,rgba(8,8,12,0.78)_42%,rgba(8,8,12,0.45)_74%,rgba(8,8,12,0.7)_100%)]",
  espresso:
    "bg-[linear-gradient(115deg,rgba(40,22,16,0.94)_0%,rgba(40,22,16,0.78)_42%,rgba(40,22,16,0.4)_74%,rgba(40,22,16,0.7)_100%)]",
  light:
    "bg-[linear-gradient(115deg,rgba(250,250,247,0.95)_0%,rgba(250,250,247,0.8)_42%,rgba(250,250,247,0.45)_74%,rgba(250,250,247,0.7)_100%)]",
  cream:
    "bg-[linear-gradient(115deg,rgba(245,238,225,0.94)_0%,rgba(245,238,225,0.78)_42%,rgba(245,238,225,0.45)_74%,rgba(245,238,225,0.7)_100%)]",
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

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
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
  size = "clamp(2.75rem,11vw,10.5rem)",
  italicSize = "clamp(2.4rem,9.5vw,9rem)",
  eyebrowMeta,
  issue,
  caption,
  section = "Edition",
}: PremiumHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  const animate = !prefersReduced;
  const parallax = animate && isDesktop;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], parallax ? ["0%", "16%"] : ["0%", "0%"]);
  const scaleImg = useTransform(
    scrollYProgress,
    [0, 1],
    parallax ? [1.04, 1.1] : [1, 1],
  );
  const yText = useTransform(scrollYProgress, [0, 1], parallax ? ["0%", "-8%"] : ["0%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], animate ? [1, 0] : [1, 1]);

  const mastheadMeta = issue ?? formatIssue();
  const isDark = bgClass.includes("dark") || bgClass.includes("ink-black");
  // Decorative alt → aria-hidden; the headline is the accessible name.
  const decorative = !alt;

  return (
    <section
      ref={ref}
      aria-label={alt || undefined}
      className={`relative isolate overflow-hidden ${bgClass}`}
      style={{ minHeight: minH }}
    >
      {/* ── Full-bleed background image ───────────────── */}
      <motion.img
        src={image}
        alt={alt}
        aria-hidden={decorative}
        style={{ y: yImg, scale: scaleImg }}
        className="absolute inset-0 z-0 h-full w-full object-cover will-change-transform [transform:translateZ(0)]"
        fetchPriority="high"
        decoding="async"
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-[1] ${OVERLAYS[overlay]}`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 30%, transparent 38%, rgba(0,0,0,0.45) 100%)",
        }}
      />
      {/* Reading scrim behind headline column */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[70svh] lg:w-[78%] ${
          isDark
            ? "bg-gradient-to-t from-ink-black via-ink-black/60 to-transparent"
            : "bg-gradient-to-t from-pearl-white via-pearl-white/65 to-transparent"
        }`}
      />

      {/* ── Editorial content ───────────────────────── */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto flex max-w-[1500px] flex-col justify-end px-5 pt-12 pb-20 md:px-10 md:pt-20 md:pb-24"
      >
        <div className="grid grid-cols-12 gap-6" style={{ minHeight: "calc(100svh - 12rem)" }}>
          <div className="col-span-12 flex flex-col justify-end lg:col-span-9 xl:col-span-8">
            {eyebrow && (
              <motion.p
                initial={animate ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="kicker mb-6 flex flex-wrap items-center gap-3 opacity-95"
              >
                <span>{eyebrow}</span>
                {eyebrowMeta && (
                  <>
                    <span aria-hidden className="h-px w-6 bg-current opacity-50" />
                    <span className="opacity-90">{eyebrowMeta}</span>
                  </>
                )}
              </motion.p>
            )}

            <div aria-hidden className="mb-5 h-px w-24 origin-left bg-current/60 ink-sweep" />

            <h1
              className="font-serif font-bold leading-[0.88] tracking-tight"
              style={{ textShadow: isDark ? "0 2px 28px rgba(0,0,0,0.5)" : "none" }}
            >
              <span className="sr-only">
                {lines.map((l) => l.text).join(" ")}
              </span>
              <span aria-hidden>
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
                            initial={animate ? { y: "108%" } : { y: 0, opacity: 0 }}
                            animate={animate ? { y: "0%" } : { y: 0, opacity: 1 }}
                            transition={{
                              delay: animate ? baseDelay + i * 0.07 : 0,
                              duration: animate ? 0.95 : 0.3,
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
              </span>
            </h1>

            {(subtitle || children) && (
              <motion.div
                initial={animate ? { opacity: 0, y: 14 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: animate ? 0.75 : 0, ease: EASE }}
                className="mt-8 max-w-[52ch]"
              >
                {subtitle && (
                  <p className="font-serif text-lg md:text-xl leading-[1.45] opacity-95 dropcap">
                    {subtitle}
                  </p>
                )}
                {children && (
                  <div className="mt-7 flex flex-wrap items-center gap-3">{children}</div>
                )}
              </motion.div>
            )}

            {caption && (
              <p className="kicker mt-8 opacity-75">Fig. 01 — {caption}</p>
            )}
          </div>

          {/* Stats column anchored bottom-right */}
          {stats && (
            <div className="col-span-12 flex items-end lg:col-span-3 lg:col-start-10 xl:col-span-4 xl:col-start-9">
              <dl className="grid w-full grid-cols-3 gap-px overflow-hidden rounded-sm border border-current/25 bg-current/10 backdrop-blur-md">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={animate ? { opacity: 0, y: 12 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: animate ? 0.9 + i * 0.08 : 0, duration: 0.55 }}
                    className={`flex flex-col gap-1 px-4 py-5 ${
                      isDark ? "bg-ink-black/80" : "bg-pearl-white/85"
                    }`}
                  >
                    <dd className="font-serif text-3xl md:text-4xl font-bold leading-none">
                      {s.value}
                    </dd>
                    <dt className="kicker opacity-80 mt-2">{s.label}</dt>
                  </motion.div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </motion.div>

      {scrollHint && animate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="pointer-events-none absolute bottom-5 right-6 z-20 flex items-center gap-2"
          aria-hidden
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
