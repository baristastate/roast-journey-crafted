import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { PRODUCTS, type Brew, type Aroma } from "@/lib/data";
import { Eyebrow } from "@/components/shared/Eyebrow";

const Q = [
  {
    id: "brew" as const,
    q: "Wie trinkst du Kaffee?",
    a: [
      ["espresso", "Espresso"],
      ["filter", "Filter"],
      ["milch", "Milchgetränk"],
    ],
  },
  {
    id: "taste" as const,
    q: "Was magst du?",
    a: [
      ["Schokoladig", "Schokoladig"],
      ["Nussig", "Nussig"],
      ["Fruchtig", "Fruchtig"],
      ["Mild", "Mild"],
    ],
  },
  {
    id: "level" as const,
    q: "Wie erfahren bist du?",
    a: [
      ["beg", "Einsteiger"],
      ["mid", "Fortgeschritten"],
      ["nerd", "Coffee Nerd"],
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
    const key = Q[step].id;
    setAnswers((s) => ({ ...s, [key]: val }));
    setStep((s) => s + 1);
  };
  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <section className="bg-cream-warm py-28 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-12 gap-12 items-start">
        {/* Left sticky column */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <Eyebrow>Coffee Finder</Eyebrow>
          <h2
            className="mt-5 font-display tracking-display font-bold leading-[0.92]"
            style={{ fontSize: "clamp(2.8rem,5vw,3.75rem)" }}
          >
            Welcher Kaffee
            <br />
            <em className="not-italic display-italic text-roast">passt zu dir?</em>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
            Drei Fragen, eine ehrliche Empfehlung. Kein Algorithmus-Voodoo — nur Kaffee, sortiert
            nach dem, was dir schmeckt.
          </p>

          {/* Step indicator dots */}
          <div className="mt-8 flex gap-2">
            {Q.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i < step
                    ? "w-8 bg-magenta-coral"
                    : i === step && !done
                      ? "w-8 bg-cyan-bloom"
                      : "w-3 bg-border"
                }`}
              />
            ))}
            {done && <div className="h-1.5 w-8 rounded-full bg-raw-green" />}
          </div>
        </div>

        {/* Right card */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-black/[0.07] bg-white/70 backdrop-blur-sm p-7 md:p-10 shadow-[0_32px_80px_-30px_rgba(30,20,5,0.18),0_0_0_1px_rgba(0,0,0,0.04)]">
            <AnimatePresence mode="wait">
              {!done && (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground mb-6">
                    Frage {step + 1} von {Q.length}
                  </div>
                  <h3 className="font-display font-bold text-3xl md:text-4xl leading-tight">
                    {Q[step].q}
                  </h3>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {Q[step].a.map(([val, label]) => (
                      <button
                        key={val}
                        onClick={() => onPick(val)}
                        className="glow-border group relative overflow-hidden rounded-2xl border border-black/[0.08] bg-background px-5 py-6 text-left transition-all duration-300 hover:border-cyan-bloom/50 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(41,199,255,0.2)]"
                      >
                        <span className="font-display font-bold text-2xl">{label}</span>
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-cyan-bloom opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0 -translate-x-2">
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {done && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-[0.65rem] uppercase tracking-[0.3em] text-raw-green mb-6">
                    ✓ Ergebnis
                  </div>
                  <h3 className="font-display font-bold text-3xl md:text-4xl">
                    Drei Kaffees für dich.
                  </h3>
                  <div className="mt-6 space-y-3">
                    {matches.map((m, idx) => (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                      >
                        <Link
                          to="/kaffee"
                          className="group flex items-center gap-4 rounded-2xl border border-black/[0.07] bg-background/60 p-3 hover:border-cyan-bloom/40 hover:bg-background transition-all duration-300 hover:-translate-y-px"
                        >
                          <img
                            src={m.image}
                            alt={m.name}
                            className="h-20 w-20 rounded-xl object-cover"
                            loading="lazy"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-[0.65rem] uppercase tracking-[0.26em] text-cyan-bloom">
                              {m.roastery}
                            </div>
                            <div className="font-display font-bold text-xl mt-0.5 truncate">
                              {m.name}
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                              {m.notes.slice(0, 3).map((n) => (
                                <span
                                  key={n}
                                  className="text-[0.68rem] rounded-full bg-magenta-coral/12 text-magenta-coral px-2.5 py-0.5"
                                >
                                  {n}
                                </span>
                              ))}
                            </div>
                          </div>
                          <span className="text-magenta-coral opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0">
                            →
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-7 flex gap-3">
                    <Link
                      to="/kaffee"
                      className="btn-shimmer rounded-full bg-magenta-coral text-ink-black px-6 py-2.5 text-sm font-semibold transition-all hover:-translate-y-px hover:shadow-[0_8px_24px_-8px_rgba(245,200,66,0.5)]"
                    >
                      Alle Kaffees ansehen
                    </Link>
                    <button
                      onClick={reset}
                      className="rounded-full border border-border px-6 py-2.5 text-sm hover:border-foreground/40 transition-colors"
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
