import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-home.jpg";

const TICKER_ITEMS = [
  "Specialty Coffee",
  "Frisch geröstet",
  "Heimröster",
  "Community",
  "Rohkaffee",
  "Aromarad",
  "Barista State",
  "Digital Bloom 2026",
];

export function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yFg = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="theme-dark relative isolate overflow-hidden bg-ink-black text-pearl-white grain"
      style={{ minHeight: "100svh" }}
    >
      {/* Parallax background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Frisch gerösteter Specialty Coffee"
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black/95 via-ink-black/50 to-ink-black/70" />
      </motion.div>

      {/* Signature glows */}
      <div className="pointer-events-none absolute -top-32 -left-32 -z-0 h-[55vh] w-[55vh] rounded-full bg-magenta-coral/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-20 -z-0 h-[40vh] w-[40vh] rounded-full bg-cyan-bloom/12 blur-[100px]" />

      {/* Bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[12svh] z-[5] bg-gradient-to-b from-transparent to-ink-black"
      />

      {/* Content */}
      <motion.div
        style={{ y: yFg, opacity }}
        className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10 pt-32 md:pt-44 pb-20 flex flex-col gap-12"
      >
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 text-[0.68rem] uppercase tracking-[0.34em] text-pearl-white/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-magenta-coral animate-pulse" />
            The Coffee Movement
            <span className="h-px w-10 bg-pearl-white/20" />
            <span className="text-cyan-bloom">Digital Bloom · 2026</span>
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-display tracking-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.88] font-bold"
          >
            Coffee Culture
            <br />
            <em className="not-italic text-magenta-coral display-italic">Reimagined.</em>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.38 }}
            className="mt-8 max-w-lg text-pearl-white/65 text-base md:text-lg leading-relaxed font-light"
          >
            Frisch gerösteter Kaffee, Heimröster und eine Community — für alle, die Kaffee neu
            erleben wollen.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.56 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link
              to="/kaffee"
              className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-magenta-coral px-7 py-4 text-sm font-semibold text-ink-black shadow-[0_0_40px_-8px_rgba(245,200,66,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_55px_-8px_rgba(245,200,66,0.75)]"
            >
              Kaffee entdecken
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              to="/community"
              className="inline-flex items-center gap-2 rounded-full border border-pearl-white/18 px-7 py-4 text-sm text-pearl-white/80 transition-all duration-300 hover:border-cyan-bloom/60 hover:text-cyan-bloom hover:bg-cyan-bloom/5"
            >
              Community erleben
            </Link>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="hidden md:flex items-end justify-between text-[0.7rem] text-pearl-white/50"
        >
          <div className="flex gap-10">
            {[
              ["12+", "Röstereien"],
              ["80+", "Kaffees kuratiert"],
              ["2", "Heimröster"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl font-bold text-pearl-white tabular-nums">
                  {n}
                </div>
                <div className="mt-1 uppercase tracking-[0.22em]">{l}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-cyan-bloom/50" />
            <span className="text-cyan-bloom tracking-[0.2em] uppercase text-[0.65rem]">
              Scroll · Roast Journey
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom ticker marquee */}
      <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-t border-pearl-white/8 bg-ink-black/60 backdrop-blur-sm py-3">
        <div className="flex whitespace-nowrap">
          <span className="marquee-x">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-5 px-8 text-[0.65rem] uppercase tracking-[0.3em] text-pearl-white/35"
              >
                {item}
                <span className="h-1 w-1 rounded-full bg-magenta-coral/50" />
              </span>
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
