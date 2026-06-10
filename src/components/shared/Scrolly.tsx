import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

export type ScrollyStep = {
  eyebrow?: string;
  title: string;
  body: string;
  image: string;
  alt?: string;
};

/**
 * Scrollytelling section: a sticky visual on one side, step-by-step
 * narrative on the other. Step text fades/slides on its own, the sticky
 * media cross-fades + parallaxes between step images.
 */
export function Scrolly({
  steps,
  side = "left",
  theme = "light",
  intro,
  id,
}: {
  steps: ScrollyStep[];
  side?: "left" | "right";
  theme?: "light" | "dark";
  intro?: { eyebrow?: string; title: string; body?: string };
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const dark = theme === "dark";
  return (
    <section
      id={id}
      ref={ref}
      className={`relative ${dark ? "theme-dark bg-ink-black text-pearl-white" : "bg-background text-foreground"}`}
      style={{ height: `${steps.length * 100}svh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="mx-auto h-full max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-2 gap-4 lg:gap-20 content-center lg:items-center">
          {/* Sticky visual */}
          <div
            className={`relative h-[38svh] lg:h-[72svh] rounded-2xl lg:rounded-3xl overflow-hidden ${side === "right" ? "lg:order-2" : ""}`}
          >
            {steps.map((s, i) => (
              <StickyImage
                key={i}
                step={s}
                index={i}
                total={steps.length}
                progress={scrollYProgress}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-pearl-white/10 rounded-3xl" />
            {/* Step counter */}
            <StepCounter total={steps.length} progress={scrollYProgress} />
          </div>

          {/* Narrative */}
          <div className="relative">
            {intro && (
              <div className="mb-4 lg:mb-10">
                {intro.eyebrow && (
                  <div
                    className={`text-xs uppercase tracking-[0.28em] ${dark ? "text-cyan-bloom" : "text-magenta-coral"}`}
                  >
                    {intro.eyebrow}
                  </div>
                )}
                <h2 className="mt-2 lg:mt-3 font-display tracking-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1]">
                  {intro.title}
                </h2>
                {intro.body && (
                  <p
                    className={`mt-2 lg:mt-4 text-sm lg:text-base max-w-md hidden sm:block ${dark ? "text-pearl-white/70" : "text-muted-foreground"}`}
                  >
                    {intro.body}
                  </p>
                )}
              </div>
            )}
            <div className="relative h-[22svh] sm:h-[28svh] lg:h-[40svh]">
              {steps.map((s, i) => (
                <StepText
                  key={i}
                  step={s}
                  index={i}
                  total={steps.length}
                  progress={scrollYProgress}
                  dark={dark}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StickyImage({
  step,
  index,
  total,
  progress,
}: {
  step: ScrollyStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const fadeIn = Math.max(0, start === 0 ? 0 : start - 0.06);
  const fadeOut = end === 1 ? 1 : end - 0.02;
  const inHi = Math.min(start + 0.02, fadeOut - 0.001);
  const outLo = Math.max(fadeOut - 0.02, inHi + 0.001);
  const opacity = useTransform(progress, [fadeIn, inHi, outLo, fadeOut], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, end], [1.12, 1.0]);
  const y = useTransform(progress, [start, end], [40, -40]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 will-change-transform">
      <motion.div style={{ scale, y }} className="h-full w-full">
        <img
          src={step.image}
          alt={step.alt ?? step.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-black/55 via-transparent to-transparent" />
    </motion.div>
  );
}

function StepText({
  step,
  index,
  total,
  progress,
  dark,
}: {
  step: ScrollyStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  dark: boolean;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const a = Math.max(0, start - 0.05);
  const b = Math.min(start + 0.04, end - 0.001);
  const c = Math.max(end - 0.06, b + 0.001);
  const d = end;
  const opacity = useTransform(progress, [a, b, c, d], [0, 1, 1, 0]);
  const y = useTransform(progress, [a, b, c, d], [40, 0, 0, -40]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0">
      <div
        className={`text-xs uppercase tracking-[0.32em] ${dark ? "text-cyan-bloom" : "text-magenta-coral"}`}
      >
        {step.eyebrow ?? `Step ${String(index + 1).padStart(2, "0")}`}
      </div>
      <h3 className="mt-2 lg:mt-4 font-display tracking-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[0.95]">
        {step.title}
      </h3>
      <p
        className={`mt-2 lg:mt-5 max-w-lg text-sm sm:text-base lg:text-lg hidden sm:block ${dark ? "text-pearl-white/80" : "text-muted-foreground"}`}
      >
        {step.body}
      </p>
    </motion.div>
  );
}

function StepCounter({ total, progress }: { total: number; progress: MotionValue<number> }) {
  return (
    <div className="absolute left-4 bottom-4 right-4 flex items-center gap-3 z-10">
      <div className="flex gap-1 flex-1">
        {Array.from({ length: total }).map((_, i) => (
          <Tick key={i} index={i} total={total} progress={progress} />
        ))}
      </div>
    </div>
  );
}

function Tick({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const fill = useTransform(progress, [start, end], ["0%", "100%"]);
  return (
    <div className="relative h-[3px] flex-1 rounded-full bg-pearl-white/20 overflow-hidden">
      <motion.div style={{ width: fill }} className="absolute inset-y-0 left-0 bg-cyan-bloom" />
    </div>
  );
}

/**
 * Sticky pinned hero with parallax background — use as a page intro on
 * any route to give it cinematic depth.
 */
export function ParallaxHero({
  image,
  alt = "",
  overlay = "dark",
  children,
  minH = "92svh",
}: {
  image: string;
  alt?: string;
  overlay?: "dark" | "light" | "none";
  children: ReactNode;
  minH?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className={`relative isolate overflow-hidden ${overlay === "dark" ? "theme-dark bg-ink-black text-pearl-white" : ""}`}
      style={{ minHeight: minH }}
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        <img src={image} alt={alt} className="h-full w-full object-cover" />
        {overlay === "dark" && (
          <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-ink-black/55 to-ink-black/35" />
        )}
        {overlay === "light" && (
          <div className="absolute inset-0 bg-gradient-to-t from-pearl-white via-pearl-white/55 to-pearl-white/20" />
        )}
      </motion.div>
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10 pt-32 md:pt-44 pb-20 md:pb-28"
      >
        {children}
      </motion.div>
    </section>
  );
}
