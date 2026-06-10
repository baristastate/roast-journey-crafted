import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  animate,
  useInView,
  useMotionValue,
} from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import {
  PRODUCTS,
  HEIMROESTER,
  AROMAS,
  type Aroma,
  type Roast,
  type Brew,
  type Gear,
  type Product,
} from "@/lib/data";

const GEAR_LABELS: Record<Gear, string> = {
  siebtraeger: "Siebträger",
  vollautomat: "Vollautomat",
  pourover: "Pour Over",
  frenchpress: "French Press",
  aeropress: "AeroPress",
  kaffeemaschine: "Kaffeemaschine",
  moka: "Moka-Kanne",
};
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/shared/Reveal";
import shopHero from "@/assets/kaffee-hero.jpg";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Barista State" },
      {
        name: "description",
        content: "Frisch geröstete Kaffees und Heimröster. Alles auf einer Seite.",
      },
      { property: "og:title", content: "Shop — Barista State" },
      {
        property: "og:description",
        content: "Frisch geröstete Kaffees und unsere Heimröster — kuratiert, direkt, ohne Lärm.",
      },
    ],
  }),
  component: ShopPage,
});

type Tab = "alle" | "kaffee" | "heimroester";
const TABS: { id: Tab; label: string }[] = [
  { id: "alle", label: "Alle" },
  { id: "kaffee", label: "Kaffee" },
  { id: "heimroester", label: "Heimröster" },
];

function ShopPage() {
  const [tab, setTab] = useState<Tab>("alle");
  const [aroma, setAroma] = useState<Aroma | null>(null);
  const [roasts, setRoasts] = useState<Roast[]>([]);
  const [brews, setBrews] = useState<Brew[]>([]);
  const [gears, setGears] = useState<Gear[]>([]);
  const [bio, setBio] = useState(false);
  const [open, setOpen] = useState<Product | null>(null);

  const filtered = useMemo(
    () =>
      PRODUCTS.filter((p) => {
        if (aroma && !p.aromas.includes(aroma)) return false;
        if (roasts.length > 0 && !roasts.includes(p.roast)) return false;
        if (brews.length > 0 && !brews.some((b) => p.brews.includes(b))) return false;
        if (gears.length > 0 && !gears.some((g) => p.gear.includes(g))) return false;
        if (bio && !p.bio) return false;
        return true;
      }),
    [aroma, roasts, brews, gears, bio],
  );

  const hasFilters = !!(aroma || roasts.length > 0 || brews.length > 0 || gears.length > 0 || bio);
  const resetFilters = () => {
    setAroma(null);
    setRoasts([]);
    setBrews([]);
    setGears([]);
    setBio(false);
  };

  const toggleRoast = (r: Roast) =>
    setRoasts((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]));
  const toggleBrew = (b: Brew) =>
    setBrews((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  const toggleGear = (g: Gear) =>
    setGears((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));

  const showKaffee = tab === "alle" || tab === "kaffee";
  const showHeimroester = tab === "alle" || tab === "heimroester";

  return (
    <>
      {/* ── HERO ────────────────────────────────── */}
      <section className="grain relative bg-ink-black text-pearl-white overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20 min-h-[56svh] flex items-end">
        {/* Parallax image */}
        <div className="absolute inset-0 -z-10">
          <img
            src={shopHero}
            alt=""
            aria-hidden
            fetchPriority="high"
            className="parallax-img h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-ink-black/70 to-ink-black/10" />
        </div>

        {/* Ambient floating orbs */}
        <div className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
          <motion.div
            className="absolute top-[20%] right-[15%] h-[420px] w-[420px] rounded-full bg-magenta-coral/10 blur-[100px]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[10%] left-[10%] h-[300px] w-[300px] rounded-full bg-cyan-bloom/7 blur-[80px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute top-[50%] left-[40%] h-[200px] w-[200px] rounded-full bg-magenta-coral/8 blur-[60px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </div>

        <div className="mx-auto max-w-[1400px] px-5 md:px-10 w-full">
          <Eyebrow>Shop · Barista State</Eyebrow>
          <h1
            className="mt-5 font-display tracking-display leading-[0.92] max-w-3xl"
            style={{ fontSize: "clamp(3rem,8vw,7rem)" }}
          >
            Alles, was du brauchst.
            <br />
            <em className="not-italic display-italic text-magenta-coral">Auf einer Seite.</em>
          </h1>
          <div className="mt-10 flex flex-wrap gap-8">
            {([
              [12, "+", "Röstereien"],
              [PRODUCTS.length, "", "Kaffees"],
              [HEIMROESTER.length, "", "Heimröster"],
            ] as [number, string, string][]).map(([n, suffix, l]) => (
              <div key={l}>
                <div className="font-display font-bold text-2xl text-pearl-white">
                  <CountUp to={n} />{suffix}
                </div>
                <div className="text-pearl-white/45 text-[0.65rem] uppercase tracking-[0.22em] mt-0.5">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY TAB + FILTER BAR ─────────────── */}
      <div className="sticky top-12 z-40 bg-background/92 backdrop-blur-2xl border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          {/* Tabs */}
          <div className="flex items-center gap-1 py-2.5 border-b border-border/50">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  tab === id ? "text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === id && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-foreground -z-[1]"
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                {label}
              </button>
            ))}
            <span className="ml-auto text-[0.7rem] text-muted-foreground tabular-nums">
              {showKaffee && `${filtered.length} Kaffees`}
              {showKaffee && showHeimroester && " · "}
              {showHeimroester && `${HEIMROESTER.length} Heimröster`}
            </span>
          </div>

          {/* Filter chips */}
          <AnimatePresence initial={false}>
            {showKaffee && (
              <motion.div
                key="filters"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                {/* Filter row 1 — scrollable on mobile */}
                <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 border-b border-border/40 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="flex items-center gap-2 pt-2 pb-1 text-xs min-w-max md:min-w-0 md:flex-wrap">
                    <FilterChips
                      label="Röstgrad"
                      selected={roasts}
                      options={[
                        ["hell", "Hell"],
                        ["mittel", "Mittel"],
                        ["dunkel", "Dunkel"],
                        ["omni", "Omni"],
                      ]}
                      onToggle={toggleRoast}
                      onClear={() => setRoasts([])}
                    />
                    <span className="w-px h-3.5 bg-border shrink-0" />
                    <FilterChips
                      label="Zubereitung"
                      selected={brews}
                      options={[
                        ["espresso", "Espresso"],
                        ["filter", "Filter"],
                        ["milch", "Milch"],
                      ]}
                      onToggle={toggleBrew}
                      onClear={() => setBrews([])}
                    />
                    <span className="w-px h-3.5 bg-border shrink-0" />
                    <button
                      onClick={() => setBio((b) => !b)}
                      className={`rounded-full px-2.5 py-1 border text-[0.7rem] transition-colors shrink-0 ${
                        bio
                          ? "bg-foreground text-background border-foreground"
                          : "border-border hover:border-foreground/50"
                      }`}
                    >
                      Bio
                    </button>
                    <AnimatePresence>
                      {hasFilters && (
                        <motion.button
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -6 }}
                          onClick={resetFilters}
                          className="ml-2 shrink-0 text-[0.7rem] text-muted-foreground hover:text-foreground transition-colors"
                        >
                          × Reset
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Equipment filter row — scrollable on mobile */}
                <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="flex items-center gap-2 py-1.5 pb-2 text-xs min-w-max md:min-w-0 md:flex-wrap">
                    <FilterChips
                      label="Mein Equipment"
                      selected={gears}
                      options={(Object.entries(GEAR_LABELS) as [Gear, string][]).map(
                        ([v, l]) => [v, l],
                      )}
                      onToggle={toggleGear}
                      onClear={() => setGears([])}
                    />
                  </div>
                </div>

                {/* Active combination summary */}
                <AnimatePresence>
                  {(roasts.length > 1 || brews.length > 1 || (roasts.length > 0 && brews.length > 0)) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-center gap-1.5 pb-2 text-[0.65rem] text-muted-foreground">
                        <span className="uppercase tracking-[0.15em]">Aktive Kombination</span>
                        <span className="text-border">·</span>
                        {roasts.length > 0 && (
                          <span className="text-foreground/70">{roasts.join(" + ")}</span>
                        )}
                        {roasts.length > 0 && brews.length > 0 && (
                          <span className="text-border">·</span>
                        )}
                        {brews.length > 0 && (
                          <span className="text-foreground/70">{brews.join(" + ")}</span>
                        )}
                        <span className="ml-auto tabular-nums text-magenta-coral">
                          {filtered.length} Treffer
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── CONTENT ─────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* HEIMRÖSTER */}
          {showHeimroester && (
            <section className="relative bg-ink-black py-16 md:py-20 border-b border-border overflow-hidden">
              {/* Background glow */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 left-1/4 h-[300px] w-[500px] rounded-full bg-magenta-coral/5 blur-[80px]" />
              </div>
              <div className="mx-auto max-w-[1400px] px-5 md:px-10 relative">
                <div className="flex items-baseline justify-between mb-8">
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-pearl-white">Heimröster</h2>
                  <span className="text-sm text-pearl-white/40">
                    {HEIMROESTER.length} Modelle
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {HEIMROESTER.map((m, i) => (
                    <Reveal key={m.id} delay={i * 0.1}>
                      <article className="group rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-magenta-coral/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_0_1px_rgba(245,200,66,0.2),0_40px_80px_-24px_rgba(245,200,66,0.15)]">
                        <div className="relative aspect-[5/4] overflow-hidden bg-ink-black/50">
                          <img
                            src={m.image}
                            alt={m.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                            loading="lazy"
                          />
                          {/* Shine sweep on hover */}
                          <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="img-shine absolute inset-0" />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-ink-black/80 via-ink-black/20 to-transparent" />
                          <div className="absolute bottom-5 left-6 text-pearl-white">
                            <div className="text-[0.65rem] uppercase tracking-[0.24em] text-pearl-white/50 mb-1">
                              Heimröster
                            </div>
                            <div className="font-display font-bold text-2xl">{m.name}</div>
                          </div>
                          <div className="absolute top-4 right-4 flex gap-2">
                            {[
                              [m.capacity, "Kapazität"],
                              [m.time, "Röstzeit"],
                            ].map(([v, l]) => (
                              <div
                                key={l}
                                className="rounded-xl bg-ink-black/80 backdrop-blur px-3 py-1.5 text-center border border-white/10"
                              >
                                <div className="text-[0.68rem] font-semibold text-pearl-white">
                                  {v}
                                </div>
                                <div className="text-[0.58rem] text-pearl-white/45 uppercase tracking-[0.15em]">
                                  {l}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-7 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-pearl-white/50 text-sm">{m.subtitle}</p>
                            <div className="font-display font-bold text-3xl mt-2 text-pearl-white">
                              {m.price.toLocaleString("de")} €
                            </div>
                          </div>
                          <button className="btn-shimmer shrink-0 rounded-full bg-magenta-coral text-ink-black px-5 py-2.5 text-sm font-semibold hover:-translate-y-px transition-transform shadow-[0_8px_24px_-8px_rgba(245,200,66,0.4)]">
                            In den Warenkorb
                          </button>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* KAFFEE */}
          {showKaffee && (
            <section className="relative bg-cream-warm py-16 md:py-24 overflow-hidden">
              {/* Ambient background glow */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-magenta-coral/8 blur-[100px]" />
                <div className="absolute bottom-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-cyan-bloom/5 blur-[80px]" />
              </div>
              <div className="mx-auto max-w-[1400px] px-5 md:px-10 relative">
                {/* Aroma wheel */}
                <div className="mb-16 grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <Eyebrow>Aromarad</Eyebrow>
                    <h2
                      className="mt-4 font-display font-bold tracking-display leading-[1]"
                      style={{ fontSize: "clamp(2.2rem,4vw,3.5rem)" }}
                    >
                      Wähle ein Aroma —<br />
                      <em className="not-italic display-italic text-magenta-coral">
                        wir filtern den Rest.
                      </em>
                    </h2>
                    <p className="mt-5 text-muted-foreground max-w-md">
                      Klick auf ein Segment im Rad. Die Kaffeeauswahl passt sich sofort an dein
                      Profil an.
                    </p>
                    <AnimatePresence>
                      {aroma && (
                        <motion.button
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          onClick={() => setAroma(null)}
                          className="mt-4 text-sm border-b border-foreground pb-0.5"
                        >
                          Filter „{aroma}" aufheben ×
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex justify-center">
                    <AromaWheel selected={aroma} onSelect={setAroma} />
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-6">
                  <h2 className="font-display font-bold text-3xl md:text-4xl">Kaffee</h2>
                  <motion.span
                    key={filtered.length}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-muted-foreground"
                  >
                    {filtered.length} {filtered.length === 1 ? "Kaffee" : "Kaffees"}
                  </motion.span>
                </div>

                <LayoutGroup>
                  <motion.div
                    layout
                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                  >
                    <AnimatePresence>
                      {filtered.map((p, i) => (
                        <motion.button
                          layout
                          key={p.id}
                          layoutId={`card-${p.id}`}
                          onClick={() => setOpen(p)}
                          custom={i}
                          variants={{
                            hidden: { opacity: 0, y: 24 },
                            visible: (idx: number) => ({
                              opacity: 1,
                              y: 0,
                              transition: {
                                delay: idx * 0.04,
                                duration: 0.45,
                                ease: [0.22, 1, 0.36, 1],
                              },
                            }),
                            exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
                          }}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="group text-left bg-card rounded-3xl overflow-hidden border border-border hover:border-magenta-coral/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_0_1px_rgba(245,200,66,0.15),0_32px_64px_-16px_rgba(245,200,66,0.1),0_30px_60px_-24px_rgba(60,30,10,0.2)]"
                        >
                          <motion.div
                            layoutId={`img-${p.id}`}
                            className="relative aspect-[4/5] overflow-hidden bg-beige"
                          >
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                              loading="lazy"
                            />
                            {/* Shine sweep */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                              <div className="img-shine absolute inset-0" />
                            </div>
                            <div className="absolute top-3 left-3 flex gap-1.5">
                              <span className="text-[0.62rem] uppercase tracking-[0.2em] bg-background/85 backdrop-blur px-2 py-1 rounded-full">
                                {p.roast}
                              </span>
                              {p.bio && (
                                <span className="text-[0.62rem] uppercase tracking-[0.2em] bg-raw-green text-espresso px-2 py-1 rounded-full">
                                  Bio
                                </span>
                              )}
                            </div>
                            <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {p.notes.map((n) => (
                                <span
                                  key={n}
                                  className="text-[0.65rem] rounded-full bg-magenta-coral/90 text-espresso px-2 py-0.5"
                                >
                                  {n}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                          <div className="p-5">
                            <div className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                              {p.roastery} · {p.origin}
                            </div>
                            <h3 className="mt-2 font-display font-bold text-xl leading-tight">
                              {p.name}
                            </h3>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {p.aromas.slice(0, 3).map((a) => (
                                <span
                                  key={a}
                                  className="text-[0.62rem] rounded-full bg-muted text-foreground/65 px-2 py-0.5"
                                >
                                  {a}
                                </span>
                              ))}
                            </div>
                            {/* Gear badges */}
                            <div className="mt-2 flex flex-wrap gap-1">
                              {p.gear.map((g) => (
                                <span
                                  key={g}
                                  className={`text-[0.58rem] rounded-full border px-1.5 py-0.5 transition-colors ${
                                    gears.includes(g)
                                      ? "border-magenta-coral/60 text-magenta-coral bg-magenta-coral/8"
                                      : "border-border/60 text-muted-foreground/60"
                                  }`}
                                >
                                  {GEAR_LABELS[g]}
                                </span>
                              ))}
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <span className="font-display font-bold text-xl">
                                {p.price.toFixed(2)} €
                              </span>
                              <span className="text-[0.75rem] text-magenta-coral group-hover:translate-x-0.5 transition-transform duration-200">
                                Warenkorb →
                              </span>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </LayoutGroup>

                {filtered.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-24 text-center text-muted-foreground"
                  >
                    Keine Kaffees gefunden —{" "}
                    <button onClick={resetFilters} className="underline hover:text-foreground">
                      Filter zurücksetzen
                    </button>
                  </motion.div>
                )}
              </div>
            </section>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── PRODUCT OVERLAY ─────────────────────── */}
      <ProductOverlay product={open} onClose={() => setOpen(null)} />
    </>
  );
}

// ── Sub-components ────────────────────────────

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(motionVal, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = motionVal.on("change", (v) => setDisplay(Math.round(v)));
    return () => {
      ctrl.stop();
      unsub();
    };
  }, [inView, to, motionVal]);

  return <span ref={ref}>{display}</span>;
}

function FilterChips<T extends string>({
  label,
  selected,
  options,
  onToggle,
  onClear,
}: {
  label: string;
  selected: T[];
  options: [T, string][];
  onToggle: (v: T) => void;
  onClear: () => void;
}) {
  const allClear = selected.length === 0;
  return (
    <div className="flex items-center gap-1 flex-wrap">
      <span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground mr-1">
        {label}
        {selected.length > 0 && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-1 inline-flex h-3.5 min-w-[0.875rem] items-center justify-center rounded-full bg-foreground px-1 text-[0.55rem] text-background"
          >
            {selected.length}
          </motion.span>
        )}
      </span>
      {/* "Alle" = clear */}
      <button
        onClick={onClear}
        className={`rounded-full px-2.5 py-1 border text-[0.7rem] transition-colors duration-150 ${
          allClear
            ? "bg-foreground text-background border-foreground"
            : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
        }`}
      >
        Alle
      </button>
      {options.map(([v, l]) => {
        const active = selected.includes(v);
        return (
          <motion.button
            key={v}
            onClick={() => onToggle(v)}
            whileTap={{ scale: 0.92 }}
            className={`relative rounded-full px-2.5 py-1 border text-[0.7rem] transition-colors duration-150 ${
              active
                ? "bg-foreground text-background border-foreground"
                : "border-border hover:border-foreground/50"
            }`}
          >
            {l}
          </motion.button>
        );
      })}
    </div>
  );
}

function AromaWheel({
  selected,
  onSelect,
}: {
  selected: Aroma | null;
  onSelect: (a: Aroma | null) => void;
}) {
  const size = 380;
  const r = 175;
  const innerR = 48;
  const cx = size / 2;
  const cy = size / 2;
  const seg = (2 * Math.PI) / AROMAS.length;

  const PALETTE = [
    "#f5c842", "#f5d96b", "#e8b830", "#f5c842",
    "#fce28a", "#e8a820", "#f5c842", "#fce28a",
    "#e8b830", "#f5c842", "#fce28a", "#e8a820",
  ];

  return (
    <div className="relative w-full max-w-[420px]">
      {/* Outer glow ring when something selected */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: "0 0 60px 20px rgba(245,200,66,0.15)" }}
          />
        )}
      </AnimatePresence>

      <svg viewBox={`0 0 ${size} ${size}`} className="w-full drop-shadow-sm">
        {/* Outer decorative dashed ring */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={r + 14}
          fill="none"
          stroke="rgba(245,200,66,0.2)"
          strokeWidth="1"
          strokeDasharray="6 5"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        {/* Inner decorative ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r + 4}
          fill="none"
          stroke="rgba(245,200,66,0.08)"
          strokeWidth="1"
        />

        {/* Segments */}
        {AROMAS.map((a, i) => {
          const a0 = i * seg - Math.PI / 2;
          const a1 = a0 + seg;
          const x0 = cx + r * Math.cos(a0);
          const y0 = cy + r * Math.sin(a0);
          const x1 = cx + r * Math.cos(a1);
          const y1 = cy + r * Math.sin(a1);
          const mid = a0 + seg / 2;
          const tx = cx + r * 0.65 * Math.cos(mid);
          const ty = cy + r * 0.65 * Math.sin(mid);
          const active = selected === a;
          const baseColor = i % 2 === 0 ? "var(--beige)" : "var(--cream-warm)";

          return (
            <g
              key={a}
              className="cursor-pointer"
              onClick={() => onSelect(active ? null : a)}
              style={{
                filter: active
                  ? `drop-shadow(0 0 10px ${PALETTE[i % PALETTE.length]}88)`
                  : undefined,
                transformOrigin: `${cx}px ${cy}px`,
                transition: "filter 0.3s ease, transform 0.2s ease",
              }}
            >
              <path
                d={`M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1} Z`}
                fill={active ? PALETTE[i % PALETTE.length] : baseColor}
                stroke="var(--border)"
                strokeWidth="1.5"
                style={{ transition: "fill 0.2s ease" }}
              />
              <text
                x={tx}
                y={ty}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[10px] select-none pointer-events-none"
                style={{
                  fill: active ? "var(--ink-black)" : "var(--foreground)",
                  fontWeight: active ? 700 : 400,
                  fontSize: "10px",
                  transition: "fill 0.2s ease",
                }}
              >
                {a}
              </text>
            </g>
          );
        })}

        {/* Center circle */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={innerR}
          fill="var(--ink-black)"
          animate={selected ? { r: innerR + 4 } : { r: innerR }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx={cx}
          cy={cy}
          r={innerR - 6}
          fill="none"
          stroke="rgba(245,200,66,0.3)"
          strokeWidth="1"
          animate={selected ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
        <text
          x={cx}
          y={cy - 7}
          textAnchor="middle"
          style={{ fill: "var(--cream)", fontSize: 9, letterSpacing: 2 }}
        >
          AROMA
        </text>
        <motion.text
          x={cx}
          y={cy + 9}
          textAnchor="middle"
          style={{ fill: "var(--magenta-coral)", fontSize: 9 }}
          animate={selected ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          wählen
        </motion.text>
        <AnimatePresence>
          {selected && (
            <motion.text
              key={selected}
              x={cx}
              y={cy + 9}
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ fill: "var(--magenta-coral)", fontSize: 8, fontWeight: 600 }}
            >
              {selected}
            </motion.text>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}

function ProductOverlay({ product, onClose }: { product: Product | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[70] bg-espresso/65 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            layoutId={`card-${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="bg-card text-card-foreground w-full md:max-w-4xl rounded-t-3xl md:rounded-3xl overflow-hidden grid md:grid-cols-2 max-h-[92svh] overflow-y-auto"
          >
            <motion.div
              layoutId={`img-${product.id}`}
              className="relative aspect-[4/5] md:aspect-auto md:min-h-[520px]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>
            <div className="relative p-8 md:p-10">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full border border-border bg-background/80 backdrop-blur text-sm hover:border-foreground/40 transition-colors"
                aria-label="Schließen"
              >
                ×
              </button>
              <div className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                {product.roastery}
              </div>
              <h2 className="mt-2 font-display font-bold text-4xl leading-tight">{product.name}</h2>
              <div className="mt-1 text-muted-foreground text-sm">
                {product.origin} · {product.region}
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {product.notes.map((n) => (
                  <span
                    key={n}
                    className="text-xs rounded-full bg-magenta-coral/15 text-espresso px-2.5 py-1"
                  >
                    {n}
                  </span>
                ))}
              </div>
              <dl className="mt-8 grid grid-cols-2 gap-y-3 text-sm border-t border-border pt-6">
                <dt className="text-muted-foreground">Röstgrad</dt>
                <dd className="capitalize font-medium">{product.roast}</dd>
                <dt className="text-muted-foreground">Zubereitung</dt>
                <dd className="capitalize font-medium">{product.brews.join(", ")}</dd>
                <dt className="text-muted-foreground">Aromen</dt>
                <dd className="font-medium">{product.aromas.join(", ")}</dd>
                <dt className="text-muted-foreground">Herkunft</dt>
                <dd className="font-medium">{product.origin}</dd>
                <dt className="text-muted-foreground col-span-2 pt-2 border-t border-border mt-1">Geeignet für</dt>
                <dd className="col-span-2 flex flex-wrap gap-1.5 mt-1">
                  {product.gear.map((g) => (
                    <span
                      key={g}
                      className="text-xs rounded-full border border-border px-2.5 py-1 text-foreground/70"
                    >
                      {GEAR_LABELS[g]}
                    </span>
                  ))}
                </dd>
              </dl>
              <div className="mt-8 flex items-center justify-between">
                <span className="font-display font-bold text-3xl">
                  {product.price.toFixed(2)} €
                </span>
                <button className="btn-shimmer rounded-full bg-magenta-coral px-6 py-3 text-sm font-semibold text-espresso hover:-translate-y-px transition-transform">
                  In den Warenkorb
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
