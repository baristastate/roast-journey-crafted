import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { PRODUCTS, type Brew, type Aroma } from "@/lib/data";
import { Eyebrow } from "@/components/shared/Eyebrow";

const Q = [
  {
    id: "brew" as const,
    q: "Wie trinkst du Kaffee?",
    hint: "Dein tägliches Ritual",
    a: [
      { val: "espresso", label: "Espresso", sub: "Konzentriert, intensiv" },
      { val: "filter", label: "Filterkaffee", sub: "Klar, aromatisch" },
      { val: "milch", label: "Milchgetränk", sub: "Rund, cremig" },
    ],
  },
  {
    id: "taste" as const,
    q: "Was bewegt dich?",
    hint: "Dein Aromaanker",
    a: [
      { val: "Schokoladig", label: "Schokoladig", sub: "Tiefe Süße" },
      { val: "Nussig", label: "Nussig", sub: "Warme Röstaromen" },
      { val: "Fruchtig", label: "Fruchtig", sub: "Lebendige Säure" },
      { val: "Mild", label: "Mild", sub: "Sanfte Balance" },
    ],
  },
  {
    id: "level" as const,
    q: "Wo stehst du?",
    hint: "Deine Kaffee-Erfahrung",
    a: [
      { val: "beg", label: "Einsteiger", sub: "Ich möchte mehr verstehen" },
      { val: "mid", label: "Fortgeschritten", sub: "Ich kenne mein Profil" },
      { val: "nerd", label: "Coffee Nerd", sub: "Varietals und Terroir" },
    ],
  },
];

export function CoffeeFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ brew?: Brew; taste?: Aroma; level?: string }>({});
  const done = step >= Q.length;

  const matches = done
    ? PRODUCTS.filter((p) => (answers.brew ? p.brews.includes(answers.brew) : true))
        .map((p) => ({
          p,
          s:
            (answers.taste && p.aromas.includes(answers.taste) ? 2 : 0) +
            (answers.brew && p.brews.includes(answers.brew) ? 1 : 0),
        }))
        .sort((a, b) => b.s - a.s)
        .slice(0, 3)
        .map(({ p }) => p)
    : [];

  const onPick = (val: string) => {
    setAnswers((s) => ({ ...s, [Q[step].id]: val }));
    setStep((s) => s + 1);
  };
  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <section id="finder" className="theme-dark relative overflow-hidden bg-ink-black text-pearl-white py-28 md:py-44">
      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 grain opacity-50" />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 right-0 h-[50vh] w-[50vw] rounded-full bg-cyan-bloom/[0.06] blur-[100px]" />
        <div className="absolute top-0 left-1/4 h-[40vh] w-[40vw] rounded-full bg-magenta-coral/[0.07] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-12 gap-16 items-start">
        {/* Left column */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <Eyebrow dark>Coffee Finder</Eyebrow>
          <h2
            className="mt-6 font-display tracking-display font-bold leading-[0.92]"
            style={{ fontSize: "clamp(2.8rem,5vw,4rem)" }}
          >
            Welcher Kaffee
            <br />
            <em className="not-italic display-italic text-magenta-coral">passt zu dir?</em>
          </h2>
          <p className="mt-6 text-pearl-white/55 max-w-sm leading-relaxed text-base">
            Drei Fragen. Eine ehrliche Empfehlung. Kein Algorithmus — nur Kaffee,
            sortiert nach dem was dir schmeckt.
          </p>

          {/* Progress indicator */}
          <div className="mt-10 flex items-center gap-4">
            {Q.map((_, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <motion.div
                  className="rounded-full"
                  animate={{
                    width: i < step ? 32 : i === step && !done ? 32 : 6,
                    height: 4,
                    backgroundColor:
                      i < step
                        ? "var(--magenta-coral)"
                        : i === step && !done
                          ? "var(--cyan-bloom)"
                          : "rgba(255,255,255,0.15)",
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
                {i < Q.length - 1 && (
                  <div className="h-px w-4 bg-pearl-white/10" />
                )}
              </div>
            ))}
            {done && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-1 rounded-full bg-raw-green/20 border border-raw-green/40 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-raw-green"
              >
                Fertig
              </motion.div>
            )}
          </div>

          {/* Current step label */}
          <AnimatePresence mode="wait">
            {!done && (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-5"
              >
                <div className="text-[0.62rem] uppercase tracking-[0.3em] text-pearl-white/30">
                  {Q[step].hint}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right — question cards */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-pearl-white/[0.08] bg-pearl-white/[0.03] backdrop-blur-sm overflow-hidden">
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="p-8 md:p-12"
                >
                  <div className="text-[0.62rem] uppercase tracking-[0.32em] text-pearl-white/30 mb-6">
                    Frage {step + 1} / {Q.length}
                  </div>
                  <h3
                    className="font-display font-bold leading-[1] tracking-display"
                    style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}
                  >
                    {Q[step].q}
                  </h3>
                  <div className="mt-10 grid gap-3">
                    {Q[step].a.map(({ val, label, sub }, i) => (
                      <motion.button
                        key={val}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => onPick(val)}
                        className="group flex items-center justify-between rounded-2xl border border-pearl-white/[0.08] bg-pearl-white/[0.04] px-6 py-5 text-left transition-all duration-300 hover:border-magenta-coral/40 hover:bg-magenta-coral/[0.06] hover:-translate-y-0.5"
                      >
                        <div>
                          <div className="font-display font-bold text-xl text-pearl-white/90 group-hover:text-pearl-white transition-colors">
                            {label}
                          </div>
                          <div className="mt-0.5 text-sm text-pearl-white/35 group-hover:text-pearl-white/55 transition-colors">
                            {sub}
                          </div>
                        </div>
                        <span className="text-magenta-coral opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-lg">
                          →
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="p-8 md:p-12"
                >
                  <div className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.32em] text-raw-green mb-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-raw-green" />
                    Dein Profil steht
                  </div>
                  <h3
                    className="font-display font-bold leading-[1] tracking-display"
                    style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
                  >
                    Drei Kaffees{" "}
                    <em className="not-italic display-italic text-magenta-coral">für dich.</em>
                  </h3>
                  <div className="mt-8 space-y-3">
                    {matches.map((m, idx) => (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                      >
                        <Link
                          to="/shop"
                          className="group flex items-center gap-4 rounded-2xl border border-pearl-white/[0.08] bg-pearl-white/[0.04] p-4 transition-all duration-300 hover:border-magenta-coral/40 hover:bg-magenta-coral/[0.06] hover:-translate-y-px"
                        >
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                            <img
                              src={m.image}
                              alt={m.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[0.62rem] uppercase tracking-[0.26em] text-cyan-bloom/80">
                              {m.roastery}
                            </div>
                            <div className="mt-0.5 font-display font-bold text-lg text-pearl-white/90 truncate">
                              {m.name}
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {m.notes.slice(0, 3).map((n) => (
                                <span
                                  key={n}
                                  className="text-[0.65rem] rounded-full bg-magenta-coral/15 text-magenta-coral px-2 py-0.5"
                                >
                                  {n}
                                </span>
                              ))}
                            </div>
                          </div>
                          <span className="text-magenta-coral opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0">
                            →
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-8 flex gap-3">
                    <Link
                      to="/shop"
                      className="btn-shimmer rounded-full bg-magenta-coral text-ink-black px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-px hover:shadow-[0_8px_28px_-8px_rgba(245,200,66,0.5)]"
                    >
                      Alle Kaffees
                    </Link>
                    <button
                      onClick={reset}
                      className="rounded-full border border-pearl-white/15 px-6 py-3 text-sm text-pearl-white/60 hover:border-pearl-white/30 hover:text-pearl-white/80 transition-colors"
                    >
                      Neu starten
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
