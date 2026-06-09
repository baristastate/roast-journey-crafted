import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PRODUCTS, HEIMROESTER } from "@/lib/data";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/shared/Reveal";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Barista State" },
      { name: "description", content: "Kaffees und Heimröster bei Barista State." },
      { property: "og:title", content: "Shop — Barista State" },
      { property: "og:description", content: "Frisch geröstete Kaffees und unsere Heimröster — alles auf einer Seite." },
    ],
  }),
  component: ShopPage,
});

const TABS = ["Alles", "Kaffee", "Heimröster"] as const;

function ShopPage() {
  const [tab, setTab] = useState<typeof TABS[number]>("Alles");

  return (
    <>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-cream-warm">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <Eyebrow>Shop</Eyebrow>
            <h1 className="mt-4 font-display tracking-display text-5xl md:text-7xl leading-[0.95]">Alles auf einer Seite.</h1>
          </div>
          <div className="flex gap-2">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-2 text-sm border ${tab === t ? "bg-foreground text-background border-foreground" : "border-border"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 space-y-20">

          {(tab === "Alles" || tab === "Heimröster") && (
            <div>
              <h2 className="font-display text-3xl mb-6">Heimröster</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {HEIMROESTER.map((m) => (
                  <Reveal key={m.id}>
                    <article className="rounded-3xl border border-border bg-card overflow-hidden group">
                      <div className="aspect-[5/4] overflow-hidden bg-espresso">
                        <img src={m.image} alt={m.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      </div>
                      <div className="p-7">
                        <div className="flex items-baseline justify-between">
                          <h3 className="font-display text-2xl">{m.name}</h3>
                          <span className="font-display text-2xl">{m.price} €</span>
                        </div>
                        <p className="mt-1 text-muted-foreground">{m.subtitle}</p>
                        <button className="mt-5 rounded-full bg-amber text-espresso px-5 py-2.5 text-sm font-medium">In den Warenkorb</button>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {(tab === "Alles" || tab === "Kaffee") && (
            <div>
              <h2 className="font-display text-3xl mb-6">Kaffee</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS.map((p) => (
                  <Reveal key={p.id}>
                    <Link to="/kaffee" className="group block rounded-2xl overflow-hidden bg-card border border-border hover:border-amber transition-colors">
                      <div className="aspect-[4/5] bg-beige overflow-hidden">
                        <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      </div>
                      <div className="p-4">
                        <div className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">{p.roastery}</div>
                        <div className="font-display text-lg mt-1 truncate">{p.name}</div>
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <span>{p.price.toFixed(2)} €</span>
                          <span className="text-amber">→</span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
