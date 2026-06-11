import { createFileRoute } from "@tanstack/react-router";

import { ROASTERIES } from "@/lib/data";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/shared/Reveal";
import { Scrolly } from "@/components/shared/Scrolly";
import { PremiumHero } from "@/components/shared/PremiumHero";
import heroImg from "@/assets/roesterei-hero.jpg";
import journeyRaw from "@/assets/journey-raw.jpg";
import journeyRoast from "@/assets/journey-roast.jpg";
import journeyEspresso from "@/assets/journey-espresso.jpg";

export const Route = createFileRoute("/roestereien")({
  head: () => ({
    meta: [
      { title: "Röstereien & B2B — Barista State" },
      {
        name: "description",
        content:
          "Mehr Sichtbarkeit für Röstereien. Mehr Auswahl für Kaffeeliebhaber. Werde Partner von Barista State.",
      },
      { property: "og:title", content: "Röstereien — Barista State" },
      {
        property: "og:description",
        content:
          "Wir erzählen deine Geschichte und bringen dich zu Menschen, die besonderen Kaffee suchen.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PremiumHero
        image={heroImg}
        alt="Rösterei: Hände am Sack vor Trommelröster"
        eyebrow="Röstereien · B2B"
        eyebrowMeta="Partnerprogramm"
        lines={[
          { text: "Mehr Sichtbarkeit für Röstereien." },
          { text: "Mehr Auswahl für Kaffeeliebhaber.", italic: true },
        ]}
        subtitle="Barista State ist ein kuratierter zusätzlicher Kanal für Röstereien, die ihre Kaffees sichtbarer machen wollen."
        bgClass="theme-dark bg-espresso text-cream"
        overlay="espresso"
        orb="gold"
        minH="92svh"
        stats={[
          { value: "12+", label: "Partner-Röstereien" },
          { value: "80+", label: "Kaffees gelistet" },
          { value: "0 %", label: "Markenkompromisse" },
        ]}
      />

      <section className="bg-background section-y">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <Eyebrow>Unser Versprechen</Eyebrow>
              <h2 className="mt-4 font-display font-bold tracking-display leading-[0.95] text-[clamp(2.2rem,4.8vw,4rem)] text-balance">
                Wir ersetzen nicht
                <br />
                <em className="not-italic display-italic text-magenta-coral">deinen Direktvertrieb.</em>
              </h2>
              <p className="mt-6 max-w-md text-muted-foreground leading-relaxed">
                Wir erzählen deine Geschichte, listen deine Kaffees und bringen dich zu Menschen,
                die besonderen Kaffee suchen. Du behältst Preis, Marke und Kontrolle.
              </p>
            </div>
            <ol className="lg:col-span-7 grid sm:grid-cols-3 gap-6 lg:gap-8">
              {[
                ["01", "Onboarding", "Wir besuchen oder telefonieren mit dir, lernen deinen Stil kennen, schlagen Kaffees vor."],
                ["02", "Storytelling", "Eigenes Rösterei-Profil mit echten Bildern, Aromaprofilen und Herkunft."],
                ["03", "Vertrieb", "Du behältst Preis und Marke. Wir kümmern uns um Sichtbarkeit, Versand und Service."],
              ].map(([n, t, b]) => (
                <Reveal key={n}>
                  <li className="border-t-2 border-foreground pt-5">
                    <span className="font-display font-bold text-amber text-3xl tabular-nums">{n}</span>
                    <h3 className="mt-3 font-display font-bold text-xl">{t}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{b}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>


      {/* SCROLLYTELLING — So arbeiten wir zusammen */}
      <Scrolly
        side="right"
        intro={{
          eyebrow: "Partnerschaft · Schritt für Schritt",
          title: "So arbeiten wir mit Röstereien.",
          body: "Vom ersten Gespräch bis zum laufenden Listing — transparent, persönlich und ohne Reibung.",
        }}
        steps={[
          {
            eyebrow: "01 · Kennenlernen",
            title: "Wir lernen euch persönlich kennen.",
            body: "Besuch, Call, Tasting — wir wollen verstehen, was euer Kaffee besonders macht, bevor irgendetwas online geht.",
            image: journeyRaw,
          },
          {
            eyebrow: "02 · Storytelling",
            title: "Eure Geschichte wird sichtbar.",
            body: "Rösterei-Profil, Aroma-Notizen, echte Bilder. Kein Stockfoto-Look — eure Handschrift bleibt eure.",
            image: journeyRoast,
          },
          {
            eyebrow: "03 · Reichweite",
            title: "Wir holen Käufer ab, ihr behaltet die Marke.",
            body: "Wir kümmern uns um Sichtbarkeit, Versand und Service — Preis und Brand bleiben in eurer Hand.",
            image: journeyEspresso,
          },
        ]}
      />

      {/* PARTNERS */}
      <section className="bg-cream-warm section-y border-t border-border">
        <div className="container-x">
          <header className="section-head">
            <Reveal>
              <div>
                <Eyebrow>Partner-Röstereien</Eyebrow>
                <h2 className="mt-4 font-display font-bold tracking-display leading-[0.95] text-[clamp(2.4rem,5.2vw,4.5rem)] text-balance">
                  Vier Häuser.{" "}
                  <em className="not-italic display-italic text-magenta-coral">Vier Handschriften.</em>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="max-w-[42ch] text-[0.95rem] leading-relaxed opacity-70 lg:text-right lg:ml-auto">
                Jede Rösterei bringt ihre eigene Philosophie mit — wir kuratieren, ohne zu glätten.
              </p>
            </Reveal>
          </header>
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {ROASTERIES.map((r) => (
              <Reveal key={r.name}>
                <article className="tile group h-full">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-7 md:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-display font-bold text-2xl md:text-3xl truncate">{r.name}</h3>
                        <div className="mt-1 text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
                          {r.city} · {r.region}
                        </div>
                      </div>
                      <span className="shrink-0 grid h-11 w-11 place-items-center rounded-full border border-foreground/15 font-display font-bold">
                        {r.name[0]}
                      </span>
                    </div>
                    <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{r.intro}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
                      {r.aromas.map((a) => (
                        <span key={a} className="text-[0.7rem] uppercase tracking-[0.14em] rounded-full bg-amber/15 px-2.5 py-1">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="theme-dark bg-espresso text-cream py-28 md:py-36">
        <div className="mx-auto max-w-[1100px] px-5 md:px-10 grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <Eyebrow>Partner werden</Eyebrow>
            <h2 className="mt-4 font-display tracking-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1]">
              Lass uns über
              <br />
              <em className="not-italic display-italic text-magenta-coral">deinen Kaffee</em>{" "}
              sprechen.
            </h2>
            <p className="mt-5 text-cream/70 max-w-md">
              Kurzes Formular, schnelle Antwort. Wir melden uns in der Regel innerhalb von zwei
              Werktagen.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <form
              className="space-y-4 rounded-3xl border border-cream/15 p-7 bg-espresso-soft"
              onSubmit={(e) => e.preventDefault()}
            >
              {[
                ["Rösterei", "z. B. Stadtkind Coffee"],
                ["Ansprechperson", "Vor- und Nachname"],
                ["E-Mail", "kontakt@deine-roesterei.de"],
              ].map(([l, p]) => (
                <label key={l} className="block">
                  <span className="text-xs uppercase tracking-[0.2em] text-cream/60">{l}</span>
                  <input
                    className="mt-1 w-full bg-transparent border-b border-cream/20 py-2 focus:outline-none focus:border-amber"
                    placeholder={p}
                  />
                </label>
              ))}
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-cream/60">Über euch</span>
                <textarea
                  rows={3}
                  className="mt-1 w-full bg-transparent border-b border-cream/20 py-2 focus:outline-none focus:border-amber"
                  placeholder="Stil, Lots, was euch wichtig ist."
                />
              </label>
              <button
                type="submit"
                className="btn-shimmer mt-4 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-espresso hover:-translate-y-px transition-transform"
              >
                Anfrage senden →
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
