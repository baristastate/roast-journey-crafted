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
    <section ref={ref} className="theme-dark relative isolate overflow-hidden bg-espresso text-cream min-h-[100svh] grain">
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <img src={heroImg} alt="Frisch geröstete Kaffeebohnen im warmen Licht" className="h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-espresso/70" />
      </motion.div>

      {/* steam */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -z-0 pointer-events-none">
        {[0, 1.6, 3.2].map((d, i) => (
          <span
            key={i}
            className="steam absolute block h-16 w-16 rounded-full bg-cream/30"
            style={{ left: `${(i - 1) * 30}px`, animationDelay: `${d}s` }}
          />
        ))}
      </div>

      <motion.div style={{ y: yFg, opacity }} className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10 pt-40 md:pt-48 pb-24 min-h-[100svh] flex flex-col justify-between">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-cream/70"
          >
            <span className="h-px w-8 bg-cream/40" /> Roast Journey · seit 2024
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display tracking-display text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95]"
          >
            Frisch gerösteter Kaffee.<br />
            <span className="text-amber italic font-light">Ausgewählt</span> für deinen perfekten Moment.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-7 max-w-xl text-cream/75 text-base md:text-lg leading-relaxed"
          >
            Entdecke besondere Kaffees von ausgewählten Röstereien — und lerne, wie einfach du Kaffee zuhause selbst rösten kannst.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link to="/kaffee" className="inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3.5 text-sm font-medium text-espresso transition-transform hover:-translate-y-0.5">
              Kaffee entdecken <span aria-hidden>→</span>
            </Link>
            <Link to="/heimroester" className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3.5 text-sm text-cream hover:bg-cream/5">
              Heimrösten erleben
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1 }}
          className="hidden md:flex items-end justify-between text-xs text-cream/60"
        >
          <div className="flex gap-10">
            <div><div className="font-display text-2xl text-cream">12+</div><div className="mt-1">Röstereien</div></div>
            <div><div className="font-display text-2xl text-cream">80+</div><div className="mt-1">Kaffees kuratiert</div></div>
            <div><div className="font-display text-2xl text-cream">2</div><div className="mt-1">Heimröster im Sortiment</div></div>
          </div>
          <div className="flex items-center gap-3"><span className="h-px w-10 bg-cream/30" />Scroll für die Reise</div>
        </motion.div>
      </motion.div>
    </section>
  );
}
