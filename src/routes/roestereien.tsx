import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ROASTERIES } from "@/lib/data";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/shared/Reveal";
import { Scrolly } from "@/components/shared/Scrolly";
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
      <section className="grain relative min-h-[80svh] flex items-end theme-dark bg-espresso text-cream overflow-hidden pt-24">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Rösterei: Hände am Sack vor Trommelröster"
            className="parallax-img h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-espresso/30" />
        </div>
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 pb-16 md:pb-24 w-full">
          <Eyebrow>Röstereien · B2B</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mt-5 font-display tracking-display leading-[0.95] max-w-5xl"
            style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)" }}
          >
            Mehr Sichtbarkeit für Röstereien.
            <br />
            <em className="not-italic display-italic text-magenta-coral">Mehr Auswahl</em> für
            Kaffeeliebhaber.
          </motion.h1>
          <p className="mt-6 max-w-2xl text-cream/75 text-lg">
            Barista State ist ein kuratierter zusätzlicher Kanal für Röstereien, die ihre Kaffees
            sichtbarer machen wollen.
          </p>
        </div>
      </section>

      <section className="bg-background py-28 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <Eyebrow>Unser Versprechen</Eyebrow>
              <h2 className="mt-4 font-display tracking-display text-4xl md:text-5xl leading-[1]">
                Wir ersetzen nicht
                <br />
                deinen Direktvertrieb.
              </h2>
              <p className="mt-5 text-muted-foreground">
                Wir erzählen deine Geschichte, listen deine Kaffees und bringen dich zu Menschen,
                die besonderen Kaffee suchen. Du behältst Preis, Marke und Kontrolle.
              </p>
            </div>
            <ol className="lg:col-span-7 grid sm:grid-cols-3 gap-6">
              {[
                [
                  "01",
                  "Onboarding",
                  "Wir besuchen oder telefonieren mit dir, lernen deinen Stil kennen, schlagen Kaffees vor.",
                ],
                [
                  "02",
                  "Storytelling",
                  "Eigenes Rösterei-Profil mit echten Bildern, Aromaprofilen und Herkunft.",
                ],
                [
                  "03",
                  "Vertrieb",
                  "Du behältst Preis und Marke. Wir kümmern uns um Sichtbarkeit, Versand und Service.",
                ],
              ].map(([n, t, b]) => (
                <Reveal key={n}>
                  <li className="border-t border-border pt-5">
                    <span className="font-display text-amber text-2xl">{n}</span>
                    <h3 className="mt-2 font-display text-xl">{t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{b}</p>
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
      <section className="bg-cream-warm py-24 md:py-32 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Eyebrow>Partner-Röstereien</Eyebrow>
          <h2 className="mt-4 font-display tracking-display text-4xl md:text-5xl">
            Vier Häuser. Vier Handschriften.
          </h2>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {ROASTERIES.map((r) => (
              <Reveal key={r.name}>
                <article className="group relative rounded-3xl overflow-hidden bg-card border border-border">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-7">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-2xl">{r.name}</h3>
                        <div className="text-sm text-muted-foreground">
                          {r.city} · {r.region}
                        </div>
                      </div>
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-border font-display">
                        {r.name[0]}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{r.intro}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {r.aromas.map((a) => (
                        <span key={a} className="text-xs rounded-full bg-amber/15 px-2.5 py-1">
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
            <h2 className="mt-4 font-display tracking-display text-5xl md:text-6xl leading-[1]">
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
