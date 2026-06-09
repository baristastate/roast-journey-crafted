import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import rawImg from "@/assets/journey-raw.jpg";
import roastImg from "@/assets/journey-roast.jpg";
import roesterei from "@/assets/roesterei-hero.jpg";
import community from "@/assets/community-hero.jpg";
import heimroaster from "@/assets/heimroester-hero.jpg";
import espresso from "@/assets/journey-espresso.jpg";

const CHAPTERS = [
  { title: "Rohkaffee", body: "Jede Bohne beginnt mit Herkunft, Charakter und Potenzial.", img: rawImg, tone: "green" },
  { title: "Röstung", body: "In der Röstung entstehen Süße, Tiefe und Aroma.", img: roastImg, tone: "fire" },
  { title: "Rösterei", body: "Wir zeigen Kaffees von Röstereien, die ihr Handwerk verstehen.", img: roesterei, tone: "warm" },
  { title: "Zuhause", body: "Du findest Kaffee, der zu deiner Zubereitung passt.", img: community, tone: "soft" },
  { title: "Heimrösten", body: "Mit dem richtigen Röster wird aus Kaffee ein eigenes Erlebnis.", img: heimroaster, tone: "dark" },
  { title: "Genuss", body: "Am Ende zählt der Moment in deiner Tasse.", img: espresso, tone: "espresso" },
];

export function RoastJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} className="theme-dark relative bg-espresso text-cream" style={{ height: `${CHAPTERS.length * 100}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {CHAPTERS.map((ch, i) => {
          const start = i / CHAPTERS.length;
          const end = (i + 1) / CHAPTERS.length;
          return <Chapter key={i} chapter={ch} index={i} total={CHAPTERS.length} progress={scrollYProgress} start={start} end={end} />;
        })}

        {/* progress rail */}
        <div className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-30">
          {CHAPTERS.map((c, i) => (
            <ProgressDot key={i} progress={scrollYProgress} index={i} total={CHAPTERS.length} label={c.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Chapter({
  chapter, progress, start, end, index, total,
}: { chapter: typeof CHAPTERS[number]; progress: any; start: number; end: number; index: number; total: number }) {
  const fadeIn = start === 0 ? 0 : start - 0.05;
  const fadeOut = end === 1 ? 1 : end - 0.02;
  const opacity = useTransform(progress, [fadeIn, start + 0.02, fadeOut - 0.02, fadeOut], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, end], [1.08, 1.0]);
  const y = useTransform(progress, [start, end], [40, -40]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale }} className="absolute inset-0">
        <img src={chapter.img} alt={chapter.title} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/30 to-espresso/60" />
      </motion.div>
      <motion.div style={{ y }} className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 md:px-10 pb-24 md:pb-32">
        <div className="text-xs uppercase tracking-[0.32em] text-cream/60">Kapitel {String(index + 1).padStart(2, "0")} · von {String(total).padStart(2, "0")}</div>
        <h2 className="mt-4 font-display tracking-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">{chapter.title}</h2>
        <p className="mt-5 max-w-xl text-cream/80 text-lg md:text-xl">{chapter.body}</p>
      </motion.div>
    </motion.div>
  );
}

function ProgressDot({ progress, index, total, label }: { progress: any; index: number; total: number; label: string }) {
  const start = index / total;
  const end = (index + 1) / total;
  const active = useTransform(progress, [start, end], [0, 1]);
  const w = useTransform(active, (v) => (v > 0.05 ? 32 : 8));
  return (
    <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.24em]">
      <motion.span style={{ width: w }} className="h-px bg-cream/70 transition-all duration-500" />
      <motion.span style={{ opacity: useTransform(active, [0, 0.1], [0.4, 1]) }} className="text-cream/80">{label}</motion.span>
    </div>
  );
}
