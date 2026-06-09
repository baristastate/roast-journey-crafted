import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const LINES = [
  {
    pre: "Du weißt, dass Kaffee",
    em: "besser sein kann.",
    post: "",
    dir: -1,
  },
  {
    pre: "Wir rösten, kuratieren und liefern —",
    em: "für dich.",
    post: "",
    dir: 1,
  },
  {
    pre: "Barista State. Nicht für jeden.",
    em: "Für dich.",
    post: "",
    dir: -1,
  },
];

export function ManifestoStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section
      ref={ref}
      className="theme-dark relative overflow-hidden bg-ink-black text-pearl-white py-32 md:py-48"
    >
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0 grain opacity-60" />

      {/* Warm glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-magenta-coral/[0.07] blur-[120px]" />
      </div>

      {/* Decorative line top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pearl-white/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pearl-white/10 to-transparent" />

      <motion.div
        style={{ y: lineY }}
        className="mx-auto max-w-[1400px] px-5 md:px-10 flex flex-col gap-10 md:gap-14"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.4em] text-pearl-white/30"
        >
          <span className="h-px w-8 bg-magenta-coral/60" />
          Unser Versprechen
        </motion.div>

        {/* Statement lines */}
        {LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: line.dir * 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              delay: i * 0.12,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`flex flex-wrap items-baseline gap-x-[0.3em] ${
              i % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <span
              className="font-display font-bold tracking-display text-pearl-white/85 leading-[1]"
              style={{ fontSize: "clamp(2rem,5.5vw,5.5rem)" }}
            >
              {line.pre}
            </span>
            {line.em && (
              <span
                className="font-display font-bold tracking-display text-magenta-coral display-italic leading-[1]"
                style={{ fontSize: "clamp(2rem,5.5vw,5.5rem)" }}
              >
                {line.em}
              </span>
            )}
            {line.post && (
              <span
                className="font-display font-bold tracking-display text-pearl-white/85 leading-[1]"
                style={{ fontSize: "clamp(2rem,5.5vw,5.5rem)" }}
              >
                {line.post}
              </span>
            )}
          </motion.div>
        ))}

        {/* Divider + signature */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.5, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="h-px bg-gradient-to-r from-magenta-coral/60 via-pearl-white/20 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex items-center justify-between text-[0.62rem] uppercase tracking-[0.32em] text-pearl-white/25"
        >
          <span>Barista State</span>
          <span>Seit 2024 · Deutschland</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
