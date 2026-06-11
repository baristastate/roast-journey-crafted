import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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

const EASE = [0.22, 1, 0.36, 1] as const;

const LINE_1 = "Specialty Coffee.".split(" ");
const LINE_2 = "Endlich zu Hause.".split(" ");

function Reveal({
  words,
  base = 0.1,
  className = "",
  style,
}: {
  words: string[];
  base?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={`block ${className}`} style={style}>
      {words.map((w, i) => (
        <span key={w + i} className="mr-[0.16em] inline-block overflow-hidden last:mr-0">
          <motion.span
            initial={{ y: "108%" }}
            animate={{ y: "0%" }}
            transition={{ delay: base + i * 0.08, duration: 0.95, ease: EASE }}
            className="inline-block will-change-transform"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const rotImg = useTransform(scrollYProgress, [0, 1], [0, -1.2]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="theme-dark relative isolate overflow-hidden bg-ink-black text-pearl-white"
      style={{ minHeight: "100svh" }}
    >
      {/* ── Masthead ─────────────────────────────── */}
      <div className="relative z-20 border-b border-pearl-white/10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-3 md:px-10">
          <div className="kicker flex items-center gap-3 text-pearl-white/70">
            <span className="font-serif italic normal-case tracking-normal text-base">№ 47</span>
            <span>Roast Journal</span>
            <span className="hidden h-px w-8 bg-pearl-white/20 md:inline-block" />
            <span className="hidden md:inline">Edition DE · 2026</span>
          </div>
          <div className="kicker hidden items-center gap-3 text-pearl-white/55 md:flex">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-magenta-coral"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
            Heute frisch aus 12 Röstereien
          </div>
        </div>
      </div>

      {/* Rotated marginalia */}
      <div
        aria-hidden
        className="kicker pointer-events-none absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 -rotate-90 origin-left text-pearl-white/45 md:block"
      >
        <span className="mr-3 font-serif italic normal-case tracking-normal">— </span>
        Cover Story
      </div>

      {/* ── Editorial grid ───────────────────────── */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto max-w-[1500px] px-5 pt-10 pb-28 md:px-10 md:pt-16 md:pb-28"
      >
        <div className="editorial-grid">
          {/* LEFT: headline */}
          <div className="col-span-12 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="kicker mb-6 flex flex-wrap items-center gap-3 text-pearl-white/70"
            >
              <span className="font-serif italic normal-case tracking-normal text-sm opacity-60">
                Cover —
              </span>
              The Coffee Movement
              <span className="h-px w-6 bg-pearl-white/25" />
              <span className="text-cyan-bloom/85">Frühjahr 2026</span>
            </motion.div>

            <div className="mb-5 h-px w-24 origin-left bg-pearl-white/40 ink-sweep" />

            <h1 className="font-serif font-bold leading-[0.86] tracking-tight">
              <Reveal
                words={LINE_1}
                base={0.15}
                style={{ fontSize: "clamp(4rem,11.5vw,11rem)" }}
              />
              <Reveal
                words={LINE_2}
                base={0.45}
                className="text-magenta-coral italic"
                style={{ fontSize: "clamp(3.4rem,10vw,9.6rem)", marginLeft: "-0.04em" }}
              />
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.95, ease: EASE }}
              className="mt-10 grid grid-cols-12 gap-6"
            >
              <div className="col-span-12 md:col-span-1 hidden md:flex justify-end">
                <span className="kicker rotate-180 [writing-mode:vertical-rl] text-pearl-white/45">
                  Lede / 01
                </span>
              </div>
              <div className="col-span-12 md:col-span-11 max-w-[46ch]">
                <p className="font-serif text-lg md:text-xl leading-[1.45] text-pearl-white/85 dropcap">
                  Kuratierte Specialty-Kaffees von 12 deutschen Röstereien —
                  frisch geröstet, ehrlich ausgewählt, direkt vor deine Tür.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    to="/shop"
                    className="btn-shimmer group inline-flex items-center gap-2.5 rounded-full bg-magenta-coral px-7 py-3.5 text-sm font-semibold text-ink-black transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Kollektion entdecken
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                  <Link
                    to="/community"
                    className="inline-flex items-center gap-2 rounded-full border border-pearl-white/20 px-7 py-3.5 text-sm text-pearl-white/75 transition-colors duration-300 hover:border-cyan-bloom/60 hover:text-cyan-bloom"
                  >
                    <span className="font-serif italic">↳</span> Community lesen
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: photo plate */}
          <div className="col-span-12 lg:col-span-5 mt-12 lg:mt-0">
            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
              className="relative"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-pearl-white/15">
                <motion.img
                  src={heroImg}
                  alt="Frisch gerösteter Specialty Coffee"
                  style={{ y: yImg, rotate: rotImg }}
                  className="h-[112%] w-full object-cover"
                  width={1600}
                  height={2000}
                  fetchPriority="high"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink-black/80 via-ink-black/25 to-transparent" />
                <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-pearl-white/60" />
                <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-pearl-white/60" />
                <span className="absolute left-2 bottom-2 h-3 w-3 border-l border-b border-pearl-white/60" />
                <span className="absolute right-2 bottom-2 h-3 w-3 border-r border-b border-pearl-white/60" />
              </div>
              <figcaption className="mt-3 flex items-start justify-between gap-4">
                <span className="kicker text-pearl-white/60">
                  Fig. 01 — Espresso, Ethiopia Guji
                </span>
                <span className="font-serif italic text-sm text-pearl-white/60">
                  Photographed in studio
                </span>
              </figcaption>
            </motion.figure>

            <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-pearl-white/15 bg-pearl-white/10">
              {[
                ["12+", "Röstereien"],
                ["80+", "Kaffees"],
                ["02", "Heimröster"],
              ].map(([n, l], i) => (
                <motion.div
                  key={l}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + i * 0.08, duration: 0.55 }}
                  className="bg-ink-black px-4 py-5"
                >
                  <span className="font-serif text-4xl font-bold leading-none">{n}</span>
                  <span className="kicker mt-2 block text-pearl-white/55">{l}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom ticker */}
      <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-t border-pearl-white/[0.08] bg-ink-black/80 backdrop-blur-md py-3">
        <div className="flex whitespace-nowrap">
          <span className="marquee-x">
            {[...TICKER, ...TICKER].map((item, i) => (
              <span
                key={i}
                className="kicker inline-flex items-center gap-6 px-8 text-pearl-white/40"
              >
                <span className="font-serif italic normal-case tracking-normal text-pearl-white/30">
                  №{String((i % TICKER.length) + 1).padStart(2, "0")}
                </span>
                {item}
                <span className="h-[3px] w-[3px] rounded-full bg-magenta-coral/70" />
              </span>
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
