import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS, AROMAS, type Aroma, type Roast, type Brew, type Product } from "@/lib/data";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Scrolly } from "@/components/shared/Scrolly";
import kaffeeHero from "@/assets/kaffee-hero.jpg";
import journeyRaw from "@/assets/journey-raw.jpg";
import journeyRoast from "@/assets/journey-roast.jpg";
import journeyEspresso from "@/assets/journey-espresso.jpg";

export const Route = createFileRoute("/kaffee")({
  head: () => ({
    meta: [
      { title: "Kaffee — Barista State" },
      { name: "description", content: "Frisch geröstete Specialty-Kaffees, sortiert nach Aroma, Zubereitung und Herkunft." },
      { property: "og:title", content: "Kaffee — Barista State" },
      { property: "og:description", content: "Finde den Kaffee, der zu dir passt — interaktiv über das Aromarad." },
    ],
  }),
  component: KaffeePage,
});

function KaffeePage() {
  const [aroma, setAroma] = useState<Aroma | null>(null);
  const [roast, setRoast] = useState<Roast | "alle">("alle");
  const [brew, setBrew] = useState<Brew | "alle">("alle");
  const [bio, setBio] = useState(false);
  const [open, setOpen] = useState<Product | null>(null);

  const filtered = useMemo(() => PRODUCTS.filter((p) => {
    if (aroma && !p.aromas.includes(aroma)) return false;
    if (roast !== "alle" && p.roast !== roast) return false;
    if (brew !== "alle" && !p.brews.includes(brew)) return false;
    if (bio && !p.bio) return false;
    return true;
  }), [aroma, roast, brew, bio]);

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 bg-cream-warm overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Kaffee · Kollektion</Eyebrow>
            <h1 className="mt-5 font-display tracking-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
              Finde den Kaffee,<br /><span className="italic text-roast font-light">der zu dir passt.</span>
            </h1>
            <p className="mt-6 max-w-xl text-muted-foreground text-lg">
              Frisch geröstete Kaffees von ausgewählten Röstereien — sortiert nach Geschmack, Zubereitung und Herkunft.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden aspect-[5/4]">
              <img src={kaffeeHero} alt="Drei Kaffeebeutel im warmen Licht" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* AROMA WHEEL */}
      <section className="bg-background py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Aromarad</Eyebrow>
            <h2 className="mt-4 font-display tracking-display text-4xl md:text-5xl leading-[1]">
              Wähle ein Aroma — wir filtern den Rest.
            </h2>
            <p className="mt-5 text-muted-foreground max-w-md">
              Klick auf ein Segment im Rad. Die Kaffeeauswahl unten passt sich weich an dein Profil an.
            </p>
            <div className="mt-6">
              {aroma ? (
                <button onClick={() => setAroma(null)} className="text-sm border-b border-foreground pb-0.5">Filter „{aroma}" aufheben ×</button>
              ) : (
                <span className="text-sm text-muted-foreground">Kein Aroma aktiv — alle Kaffees sichtbar.</span>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <AromaWheel selected={aroma} onSelect={setAroma} />
          </div>
        </div>
      </section>

      {/* FILTERS + GRID */}
      <section className="bg-cream-warm py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="sticky top-16 z-30 -mx-5 md:-mx-10 px-5 md:px-10 py-4 mb-10 backdrop-blur-xl bg-cream-warm/80 border-b border-border">
            <div className="flex flex-wrap gap-2 text-sm">
              <FilterChips
                label="Röstgrad" value={roast}
                options={[["alle","Alle"],["hell","Hell"],["mittel","Mittel"],["dunkel","Dunkel"],["omni","Omni"]]}
                onChange={(v) => setRoast(v as Roast | "alle")}
              />
              <FilterChips
                label="Zubereitung" value={brew}
                options={[["alle","Alle"],["espresso","Espresso"],["filter","Filter"],["milch","Milchgetränk"]]}
                onChange={(v) => setBrew(v as Brew | "alle")}
              />
              <button
                onClick={() => setBio((b) => !b)}
                className={`rounded-full px-3 py-1.5 border ${bio ? "bg-foreground text-background border-foreground" : "border-border"}`}
              >
                Bio
              </button>
            </div>
          </div>

          <LayoutGroup>
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.map((p) => (
                  <motion.button
                    layout
                    key={p.id}
                    layoutId={`card-${p.id}`}
                    onClick={() => setOpen(p)}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="group text-left bg-card rounded-3xl overflow-hidden border border-border hover:border-amber transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(60,30,10,0.25)]"
                  >
                    <motion.div layoutId={`img-${p.id}`} className="relative aspect-[4/5] overflow-hidden bg-beige">
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <span className="text-[0.65rem] uppercase tracking-[0.2em] bg-background/85 backdrop-blur px-2 py-1 rounded-full">{p.roast}</span>
                        {p.bio && <span className="text-[0.65rem] uppercase tracking-[0.2em] bg-raw-green text-espresso px-2 py-1 rounded-full">Bio</span>}
                      </div>
                      <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {p.notes.map((n) => (
                          <span key={n} className="text-[0.7rem] rounded-full bg-amber/90 text-espresso px-2 py-0.5">{n}</span>
                        ))}
                      </div>
                    </motion.div>
                    <div className="p-5">
                      <div className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">{p.roastery} · {p.origin}</div>
                      <h3 className="mt-2 font-display text-2xl leading-tight">{p.name}</h3>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.aromas.map((a) => (
                          <span key={a} className="text-[0.7rem] rounded-full bg-muted text-foreground/70 px-2 py-0.5">{a}</span>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center justify-between">
                        <span className="font-display text-xl">{p.price.toFixed(2)} €</span>
                        <span className="text-amber text-sm">In den Warenkorb →</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">Keine Kaffees gefunden — bitte Filter anpassen.</div>
          )}
        </div>
      </section>

      <ProductOverlay product={open} onClose={() => setOpen(null)} />
    </>
  );
}

function FilterChips<T extends string>({
  label, value, options, onChange,
}: { label: string; value: T; options: [T, string][]; onChange: (v: T) => void }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mr-2">{label}</span>
      {options.map(([v, l]) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`rounded-full px-3 py-1.5 border ${value === v ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/50"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function AromaWheel({ selected, onSelect }: { selected: Aroma | null; onSelect: (a: Aroma | null) => void }) {
  const size = 360;
  const r = 170;
  const cx = size / 2;
  const cy = size / 2;
  const seg = (2 * Math.PI) / AROMAS.length;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[420px]">
      {AROMAS.map((a, i) => {
        const a0 = i * seg - Math.PI / 2;
        const a1 = a0 + seg;
        const x0 = cx + r * Math.cos(a0); const y0 = cy + r * Math.sin(a0);
        const x1 = cx + r * Math.cos(a1); const y1 = cy + r * Math.sin(a1);
        const path = `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1} Z`;
        const mid = a0 + seg / 2;
        const tx = cx + (r * 0.66) * Math.cos(mid);
        const ty = cy + (r * 0.66) * Math.sin(mid);
        const active = selected === a;
        const fill = active ? "var(--amber)" : i % 2 === 0 ? "var(--beige)" : "var(--cream-warm)";
        return (
          <g key={a} className="cursor-pointer" onClick={() => onSelect(active ? null : a)}>
            <path d={path} fill={fill} stroke="var(--border)" strokeWidth="1" className="transition-colors" />
            <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle" className="text-[11px]" style={{ fill: active ? "var(--espresso)" : "var(--foreground)", fontWeight: active ? 600 : 400 }}>
              {a}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={40} fill="var(--espresso)" />
      <text x={cx} y={cy - 4} textAnchor="middle" className="text-[10px] uppercase" style={{ fill: "var(--cream)", letterSpacing: 2 }}>
        Aroma
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" className="text-[10px]" style={{ fill: "var(--amber)" }}>
        wählen
      </text>
    </svg>
  );
}

function ProductOverlay({ product, onClose }: { product: Product | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[70] bg-espresso/70 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            layoutId={`card-${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="bg-card text-card-foreground w-full md:max-w-4xl rounded-t-3xl md:rounded-3xl overflow-hidden grid md:grid-cols-2 max-h-[92svh] overflow-y-auto"
          >
            <motion.div layoutId={`img-${product.id}`} className="relative aspect-[4/5] md:aspect-auto md:min-h-[520px]">
              <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
            </motion.div>
            <div className="p-8 md:p-10">
              <button onClick={onClose} className="absolute top-4 right-4 h-9 w-9 rounded-full border border-border bg-background/80 backdrop-blur" aria-label="Schließen">×</button>
              <div className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">{product.roastery}</div>
              <h2 className="mt-2 font-display text-4xl leading-tight">{product.name}</h2>
              <div className="mt-2 text-muted-foreground">{product.origin} · {product.region}</div>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {product.notes.map((n) => (
                  <span key={n} className="text-xs rounded-full bg-amber/15 text-espresso px-2.5 py-1">{n}</span>
                ))}
              </div>
              <dl className="mt-8 grid grid-cols-2 gap-y-3 text-sm">
                <dt className="text-muted-foreground">Röstgrad</dt><dd className="capitalize">{product.roast}</dd>
                <dt className="text-muted-foreground">Zubereitung</dt><dd className="capitalize">{product.brews.join(", ")}</dd>
                <dt className="text-muted-foreground">Aromen</dt><dd>{product.aromas.join(", ")}</dd>
                <dt className="text-muted-foreground">Herkunft</dt><dd>{product.origin}</dd>
              </dl>
              <div className="mt-8 flex items-center justify-between">
                <span className="font-display text-3xl">{product.price.toFixed(2)} €</span>
                <button className="rounded-full bg-amber px-6 py-3 text-sm font-medium text-espresso">In den Warenkorb</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
