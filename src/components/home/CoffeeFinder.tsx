import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { PRODUCTS, type Brew, type Aroma } from "@/lib/data";
import { Eyebrow } from "@/components/shared/Eyebrow";

const Q = [
  { id: "brew" as const, q: "Wie trinkst du Kaffee?", a: [["espresso", "Espresso"], ["filter", "Filter"], ["milch", "Milchgetränk"]] },
  { id: "taste" as const, q: "Was magst du?", a: [["Schokoladig", "Schokoladig"], ["Nussig", "Nussig"], ["Fruchtig", "Fruchtig"], ["Mild", "Mild"]] },
  { id: "level" as const, q: "Wie erfahren bist du?", a: [["beg", "Einsteiger"], ["mid", "Fortgeschritten"], ["nerd", "Coffee Nerd"]] },
];

export function CoffeeFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ brew?: Brew; taste?: Aroma; level?: string }>({});
  const done = step >= Q.length;

  const matches = done
    ? PRODUCTS
        .filter((p) => (answers.brew ? p.brews.includes(answers.brew) : true))
        .map((p) => ({ p, s: (answers.taste && p.aromas.includes(answers.taste) ? 2 : 0) + (answers.brew && p.brews.includes(answers.brew) ? 1 : 0) }))
        .sort((a, b) => b.s - a.s)
        .slice(0, 3)
        .map(({ p }) => p)
    : [];

  const onPick = (val: string) => {
    const key = Q[step].id;
    setAnswers((s) => ({ ...s, [key]: val }));
    setStep((s) => s + 1);
  };
  const reset = () => { setAnswers({}); setStep(0); };

  return (
    <section className="bg-cream-warm py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <Eyebrow>Coffee Finder</Eyebrow>
          <h2 className="mt-4 font-display tracking-display text-5xl md:text-6xl leading-[1]">
            Welcher Kaffee<br />passt zu dir?
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md">
            Drei Fragen, eine ehrliche Empfehlung. Kein Algorithmus-Voodoo — nur Kaffee, sortiert nach dem, was dir schmeckt.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-border bg-card p-6 md:p-10 shadow-[0_30px_80px_-40px_rgba(60,30,10,0.25)]">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-muted-foreground">
              <span>{done ? "Ergebnis" : `Frage ${step + 1} von ${Q.length}`}</span>
              <div className="flex gap-1.5">
                {Q.map((_, i) => (
                  <span key={i} className={`h-1 w-8 rounded-full transition-colors ${i <= step ? "bg-cyan-bloom" : "bg-border"}`} />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!done && (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="mt-8"
                >
                  <h3 className="font-display text-3xl md:text-4xl">{Q[step].q}</h3>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {Q[step].a.map(([val, label]) => (
                      <button
                        key={val}
                        onClick={() => onPick(val)}
                        className="group relative overflow-hidden rounded-2xl border border-border bg-background px-5 py-6 text-left transition-all hover:border-cyan-bloom hover:-translate-y-0.5"
                      >
                        <span className="font-display text-2xl">{label}</span>
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-cyan-bloom opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              {done && (
                <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                  <h3 className="font-display text-3xl md:text-4xl">Drei Kaffees für dich.</h3>
                  <div className="mt-6 space-y-3">
                    {matches.map((m) => (
                      <Link
                        key={m.id} to="/kaffee"
                        className="group flex items-center gap-4 rounded-2xl border border-border bg-background p-3 hover:border-cyan-bloom transition-colors"
                      >
                        <img src={m.image} alt={m.name} className="h-20 w-20 rounded-xl object-cover" loading="lazy" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs uppercase tracking-[0.24em] text-cyan-bloom">{m.roastery}</div>
                          <div className="font-display text-xl truncate">{m.name}</div>
                          <div className="mt-1 flex flex-wrap gap-1.5">
                            {m.notes.slice(0, 3).map((n) => (
                              <span key={n} className="text-[0.7rem] rounded-full bg-magenta-coral/15 text-magenta-coral px-2 py-0.5">{n}</span>
                            ))}
                          </div>
                        </div>
                        <span className="text-magenta-coral opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Link to="/kaffee" className="rounded-full bg-magenta-coral text-ink-black px-5 py-2.5 text-sm">Alle Kaffees ansehen</Link>
                    <button onClick={reset} className="rounded-full border border-border px-5 py-2.5 text-sm">Neu starten</button>
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
