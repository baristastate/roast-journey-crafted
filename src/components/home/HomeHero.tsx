import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-home.jpg";

const TICKER = [
  "Specialty Coffee",
  "Frisch geröstet",
  "Heimröster",
  "Single Origin",
  "Rohkaffee",
  "Community",
  "Barista State",
  "12 Röstereien",
  "Digital Bloom 2026",
  "Pour Over",
];

// Split into word tokens for the staggered blur-up animation
const LINE_1 = "Specialty Coffee.".split(" ");
const LINE_2 = "Endlich für zu Hause.".split(" ");

export function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const yFg = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // Cursor-reactive warm glow
  const cursorX = useMotionValue(-600);
  const cursorY = useMotionValue(-600);
  const glowX = useSpring(cursorX, { damping: 28, stiffness: 90 });
  const glowY = useSpring(cursorY, { damping: 28, stiffness: 90 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [cursorX, cursorY]);

  return (
    <section
      ref={ref}
      className="theme-dark relative isolate overflow-hidden bg-ink-black text-pearl-white grain"
      style={{ minHeight: "100svh" }}
    >
      {/* Parallax image */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Frisch gerösteter Specialty Coffee"
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black/96 via-ink-black/40 to-ink-black/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-black/60 via-transparent to-transparent" />
      </motion.div>

      {/* Cursor-following glow */}
      <motion.div
        className="pointer-events-none fixed z-0 h-[600px] w-[600px] rounded-full bg-magenta-coral/[0.11] blur-[120px]"
        style={{
          left: glowX,
          top: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Ambient static glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 h-[70vh] w-[70vh] rounded-full bg-magenta-coral/[0.13] blur-[130px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-32 h-[45vh] w-[45vh] rounded-full bg-cyan-bloom/[0.08] blur-[110px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[14svh] bg-gradient-to-b from-transparent to-ink-black"
      />

      {/* Main content */}
      <motion.div
        style={{ y: yFg, opacity }}
        className="relative z-10 mx-auto flex max-w-[1400px] flex-col gap-0 px-5 pt-32 pb-24 md:px-10 md:pt-44 md:pb-32"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.38em] text-pearl-white/50"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-magenta-coral" />
          The Coffee Movement
          <span className="h-px w-8 bg-pearl-white/20" />
          <span className="text-cyan-bloom/80">Barista State · 2026</span>
        </motion.div>

        {/* Headline — word-by-word blur-up */}
        <h1 className="mt-8 font-display font-bold leading-[0.88] tracking-display">
          {/* Line 1 */}
          <span className="block" style={{ fontSize: "clamp(4rem,11vw,10.5rem)" }}>
            {LINE_1.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: 0, y: 60, filter: "blur(24px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.18 + i * 0.1,
                  duration: 1.0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mr-[0.22em] inline-block last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </span>
          {/* Line 2 — gold italic */}
          <span
            className="block text-magenta-coral display-italic"
            style={{ fontSize: "clamp(3.2rem,9.5vw,9rem)" }}
          >
            {LINE_2.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: 0, y: 60, filter: "blur(24px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.42 + i * 0.1,
                  duration: 1.0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mr-[0.22em] inline-block last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Sub + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-md">
            <p className="text-pearl-white/60 text-base md:text-lg leading-relaxed font-light">
              Kuratierte Specialty-Kaffees von 12 deutschen Röstereien —
              frisch geröstet, ehrlich ausgewählt, direkt bei dir.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="btn-shimmer inline-flex items-center gap-2.5 rounded-full bg-magenta-coral px-8 py-4 text-sm font-semibold text-ink-black shadow-[0_0_50px_-8px_rgba(245,200,66,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_70px_-8px_rgba(245,200,66,0.8)]"
              >
                Kollektion entdecken
                <span aria-hidden className="translate-x-0 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                to="/community"
                className="inline-flex items-center gap-2 rounded-full border border-pearl-white/15 px-8 py-4 text-sm text-pearl-white/70 transition-all duration-300 hover:border-cyan-bloom/50 hover:text-cyan-bloom hover:bg-cyan-bloom/5"
              >
                Community erleben
              </Link>
            </div>
          </div>

          {/* Stats column */}
          <div className="hidden lg:flex flex-col gap-6 text-right">
            {[
              ["12+", "Röstereien"],
              ["80+", "Kaffees"],
              ["2", "Heimröster"],
            ].map(([n, l], i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + i * 0.1, duration: 0.6 }}
                className="border-r border-pearl-white/10 pr-6"
              >
                <div className="font-display text-4xl font-bold text-pearl-white">{n}</div>
                <div className="text-pearl-white/40 text-[0.62rem] uppercase tracking-[0.26em] mt-1">
                  {l}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-9 w-5 items-start justify-center rounded-full border border-pearl-white/20 pt-1.5"
          >
            <div className="h-1.5 w-px rounded-full bg-pearl-white/50" />
          </motion.div>
          <span className="text-[0.6rem] uppercase tracking-[0.4em] text-pearl-white/30">
            Scroll
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom ticker */}
      <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-t border-pearl-white/[0.07] bg-ink-black/70 backdrop-blur-md py-3">
        <div className="flex whitespace-nowrap">
          <span className="marquee-x">
            {[...TICKER, ...TICKER].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-6 px-8 text-[0.62rem] uppercase tracking-[0.32em] text-pearl-white/30"
              >
                {item}
                <span className="h-[3px] w-[3px] rounded-full bg-magenta-coral/60" />
              </span>
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
