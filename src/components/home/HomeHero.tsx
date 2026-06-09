import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-home.jpg";

export function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yFg = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="theme-dark relative isolate overflow-hidden bg-ink-black text-pearl-white min-h-[100svh] grain">
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <img src={heroImg} alt="Frisch gerösteter Specialty Coffee" className="h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-ink-black/55 to-ink-black/75" />
      </motion.div>

      {/* signature glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 -z-0 h-[60vh] w-[60vh] rounded-full bg-magenta-coral/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 -z-0 h-[60vh] w-[60vh] rounded-full bg-cyan-bloom/15 blur-3xl" />

      {/* bottom bridge — soft, long fade into the next section */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[40svh] z-[5] bg-gradient-to-b from-transparent via-ink-black/70 to-ink-black" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px z-[6] bg-gradient-to-r from-transparent via-magenta-coral/60 to-transparent" />


      <motion.div style={{ y: yFg, opacity }} className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10 pt-40 md:pt-48 pb-24 min-h-[100svh] flex flex-col justify-between">
        <div className="max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-pearl-white/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-magenta-coral" />
            <span>The Coffee Movement</span>
            <span className="mx-2 h-px w-8 bg-pearl-white/30" />
            <span className="text-cyan-bloom">Digital Bloom · 2026</span>
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display tracking-display text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.9]"
          >
            COFFEE CULTURE<br />
            <span className="text-magenta-coral">REIMAGINED.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-8 max-w-xl text-pearl-white/75 text-base md:text-lg leading-relaxed"
          >
            Frisch gerösteter Kaffee, Heimröster und eine Community für alle, die Kaffee neu erleben wollen.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link to="/kaffee" className="inline-flex items-center gap-2 rounded-full bg-magenta-coral px-7 py-4 text-sm font-medium text-ink-black shadow-[0_20px_60px_-15px_rgba(255,215,0,0.6)] transition-transform hover:-translate-y-0.5">
              Kaffee entdecken <span aria-hidden>→</span>
            </Link>
            <Link to="/community" className="inline-flex items-center gap-2 rounded-full border border-pearl-white/25 px-7 py-4 text-sm text-pearl-white hover:border-cyan-bloom hover:text-cyan-bloom transition-colors">
              Community erleben
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1 }}
          className="hidden md:flex items-end justify-between text-xs text-pearl-white/60"
        >
          <div className="flex gap-10">
            <div><div className="font-display text-2xl text-pearl-white">12+</div><div className="mt-1 uppercase tracking-[0.2em]">Röstereien</div></div>
            <div><div className="font-display text-2xl text-pearl-white">80+</div><div className="mt-1 uppercase tracking-[0.2em]">Kaffees kuratiert</div></div>
            <div><div className="font-display text-2xl text-pearl-white">2</div><div className="mt-1 uppercase tracking-[0.2em]">Heimröster</div></div>
          </div>
          <div className="flex items-center gap-3"><span className="h-px w-10 bg-cyan-bloom/60" /><span className="text-cyan-bloom">Scroll · Roast Journey</span></div>
        </motion.div>
      </motion.div>
    </section>
  );
}
