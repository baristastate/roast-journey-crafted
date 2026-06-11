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
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="theme-dark relative isolate overflow-hidden bg-ink-black text-pearl-white"
      style={{ minHeight: "100svh" }}
    >
      {/* Full-bleed background */}
      <motion.img
        src={heroImg}
        alt="Frisch gerösteter Specialty Coffee"
        style={{ y: yImg, scale: scaleImg }}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        width={1600}
        height={2000}
        fetchPriority="high"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(115deg,rgba(12,12,16,0.92)_0%,rgba(12,12,16,0.7)_45%,rgba(12,12,16,0.3)_75%,rgba(12,12,16,0.55)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 30%, transparent 40%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* ── Masthead ─────────────────────────────── */}
      <div className="relative z-20 border-b border-pearl-white/10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-3 md:px-10">
          <div className="kicker flex items-center gap-3 text-pearl-white/80">
            <span className="font-serif italic normal-case tracking-normal text-base">№ 47</span>
            <span>Roast Journal</span>
            <span className="hidden h-px w-8 bg-pearl-white/30 md:inline-block" />
            <span className="hidden md:inline">Edition DE · 2026</span>
          </div>
          <div className="kicker hidden items-center gap-3 text-pearl-white/70 md:flex">
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
        className="kicker pointer-events-none absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 -rotate-90 origin-left text-pearl-white/60 md:block"
      >
        <span className="mr-3 font-serif italic normal-case tracking-normal">— </span>
        Cover Story
      </div>

      {/* Register-mark crop ticks */}
      <span className="pointer-events-none absolute left-4 top-16 z-20 h-3 w-3 border-l border-t border-pearl-white/60" />
      <span className="pointer-events-none absolute right-4 top-16 z-20 h-3 w-3 border-r border-t border-pearl-white/60" />
      <span className="pointer-events-none absolute left-4 bottom-20 z-20 h-3 w-3 border-l border-b border-pearl-white/60" />
      <span className="pointer-events-none absolute right-4 bottom-20 z-20 h-3 w-3 border-r border-b border-pearl-white/60" />

      {/* ── Editorial content ───────────────────────── */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto flex max-w-[1500px] flex-col justify-end px-5 pt-16 pb-28 md:px-10 md:pt-24 md:pb-32"
      >
        <div
          className="grid grid-cols-12 gap-6"
          style={{ minHeight: "calc(100svh - 16rem)" }}
        >
          <div className="col-span-12 flex flex-col justify-end lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="kicker mb-6 flex flex-wrap items-center gap-3 text-pearl-white/85"
            >
              <span className="font-serif italic normal-case tracking-normal text-sm opacity-70">
                Cover —
              </span>
              The Coffee Movement
              <span className="h-px w-6 bg-pearl-white/40" />
              <span className="text-cyan-bloom">Frühjahr 2026</span>
            </motion.div>

            <div className="mb-5 h-px w-24 origin-left bg-pearl-white/50 ink-sweep" />

            <h1
              className="font-serif font-bold leading-[0.86] tracking-tight"
              style={{ textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}
            >
              <Reveal
                words={LINE_1}
                base={0.15}
                style={{ fontSize: "clamp(4rem,12vw,12rem)" }}
              />
              <Reveal
                words={LINE_2}
                base={0.45}
                className="text-magenta-coral italic"
                style={{ fontSize: "clamp(3.4rem,10vw,10rem)", marginLeft: "-0.04em" }}
              />
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.95, ease: EASE }}
              className="mt-8 max-w-[52ch]"
            >
              <p className="font-serif text-lg md:text-xl leading-[1.45] text-pearl-white/90 dropcap">
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
                  className="inline-flex items-center gap-2 rounded-full border border-pearl-white/30 bg-ink-black/30 px-7 py-3.5 text-sm text-pearl-white/85 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-bloom/70 hover:text-cyan-bloom"
                >
                  <span className="font-serif italic">↳</span> Community lesen
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Stats anchored bottom-right */}
          <div className="col-span-12 flex items-end lg:col-span-3">
            <div className="grid w-full grid-cols-3 gap-px overflow-hidden rounded-sm border border-pearl-white/20 bg-pearl-white/10 backdrop-blur-md">
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
                  className="bg-ink-black/70 px-3 py-5"
                >
                  <span className="font-serif text-3xl font-bold leading-none">{n}</span>
                  <span className="kicker mt-2 block text-pearl-white/65">{l}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom ticker */}
      <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-t border-pearl-white/[0.12] bg-ink-black/85 backdrop-blur-md py-3">
        <div className="flex whitespace-nowrap">
          <span className="marquee-x">
            {[...TICKER, ...TICKER].map((item, i) => (
              <span
                key={i}
                className="kicker inline-flex items-center gap-6 px-8 text-pearl-white/50"
              >
                <span className="font-serif italic normal-case tracking-normal text-pearl-white/40">
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
