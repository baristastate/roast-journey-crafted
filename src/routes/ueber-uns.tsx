import { createFileRoute, Link } from "@tanstack/react-router";
import { PremiumHero } from "@/components/shared/PremiumHero";
import { Reveal } from "@/components/shared/Reveal";
import { Scrolly } from "@/components/shared/Scrolly";
import { Section, SectionHeader } from "@/components/shared/Section";
import heroImg from "@/assets/about-hero.jpg";
import f1 from "@/assets/feed-1.jpg";
import f2 from "@/assets/feed-2.jpg";
import f3 from "@/assets/feed-3.jpg";
import f4 from "@/assets/feed-4.jpg";
import f5 from "@/assets/feed-5.jpg";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über uns — Barista State" },
      {
        name: "description",
        content:
          "Barista State bringt dich näher an besseren Kaffee — kuratiert, transparent, mit echtem Handwerk.",
      },
      { property: "og:title", content: "Über uns — Barista State" },
      {
        property: "og:description",
        content: "Wir machen guten Kaffee sichtbarer, verständlicher und erlebbarer.",
      },
    ],
  }),
  component: Page,
});

const VALUES = [
  { t: "Handwerk", b: "Wir arbeiten mit Menschen, die ihr Handwerk ernst nehmen — auf jeder Ebene.", img: f5 },
  { t: "Frische", b: "Wir verkaufen Kaffee, der frisch geröstet ist. Punkt.", img: f4 },
  { t: "Transparenz", b: "Herkunft, Verarbeitung, Röstdatum — sichtbar, immer.", img: f3 },
  { t: "Community", b: "Kaffee ist ein Gespräch. Wir machen Raum dafür.", img: f1 },
  { t: "Neugier", b: "Wir probieren, lernen, verändern. Auch uns selbst.", img: f2 },
];

function Page() {
  return (
    <>
      <PremiumHero
        image={heroImg}
        alt="Tasse Kaffee neben Notizbuch und Bohnen"
        eyebrow="Über uns"
        eyebrowMeta="Manifest"
        lines={[
          { text: "Wir bringen dich näher an" },
          { text: "besseren Kaffee.", italic: true },
        ]}
        subtitle="Kuratiert. Transparent. Mit echtem Handwerk — von der grünen Bohne bis in deine Tasse."
        bgClass="theme-dark bg-ink-black text-pearl-white"
        overlay="dark"
        orb="magenta"
        minH="90svh"
      />

      <Scrolly
        side="left"
        theme="dark"
        intro={{
          eyebrow: "Was uns trägt",
          title: "Fünf Werte. Eine Haltung.",
          body: "Scroll dich durch die Prinzipien, an denen wir uns jeden Tag messen lassen.",
        }}
        steps={VALUES.map((v, i) => ({
          eyebrow: `Wert ${String(i + 1).padStart(2, "0")}`,
          title: v.t,
          body: v.b,
          image: v.img,
          alt: v.t,
        }))}
      />

      {/* Story */}
      <Section tone="light" size="md" narrow>
        <SectionHeader
          eyebrow="Unsere Geschichte"
          title={<>Wir bringen guten Kaffee <em className="not-italic display-italic text-magenta-coral">an einen Tisch.</em></>}
          lede="Viele Röstereien leisten großartige Arbeit — aber nicht jeder findet sie. Gleichzeitig wollen immer mehr Menschen zuhause besseren Kaffee zubereiten."
        />
        <Reveal>
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5 text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground border-t border-border pt-4">
              Gegründet 2024 · Deutschland
            </div>
            <div className="md:col-span-7 space-y-5 text-lg leading-relaxed text-foreground/85">
              <p className="dropcap">
                Barista State entstand aus der Idee, guten Kaffee sichtbarer, verständlicher und
                erlebbarer zu machen. Wir kuratieren Röstereien, die wir kennen und schätzen — und
                bringen sie zu Menschen, die mehr suchen als nur eine Bohne.
              </p>
              <p>
                Mit dem Heimröster schließen wir den Kreis: vom grünen Kaffee bis zur Tasse — alles
                in deiner Hand. Ehrlich, transparent und ohne Lärm.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Werte-Grid */}
      <Section tone="warm" size="md" className="border-t border-border">
        <SectionHeader
          eyebrow="Werte"
          title="Fünf Sätze, an denen wir uns messen lassen."
          lede="Jeder dieser Werte zeigt sich in einer konkreten Entscheidung — bei jeder Rösterei, jedem Produkt, jeder Geschichte."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={i * 0.05}>
              <article className={`tile group h-full ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                <div className={`overflow-hidden ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                  <img
                    src={v.img}
                    alt={v.t}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-7">
                  <div className="text-[0.62rem] uppercase tracking-[0.28em] text-magenta-coral">
                    Wert · {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-2 font-display font-bold text-2xl md:text-3xl">{v.t}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{v.b}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section tone="espresso" size="md" className="text-center">
        <Reveal>
          <div className="text-[0.7rem] uppercase tracking-[0.32em] text-cyan-bloom mb-5">
            Magst du anfangen?
          </div>
          <h2 className="font-display font-bold tracking-display leading-[0.95] text-[clamp(2.4rem,6vw,5rem)] max-w-3xl mx-auto text-balance">
            Frischer Kaffee.{" "}
            <em className="not-italic display-italic text-magenta-coral">Direkt zu dir.</em>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/kaffee" className="btn-pill btn-primary btn-shimmer">
              Kaffee entdecken →
            </Link>
            <Link to="/heimroester" className="btn-pill btn-ghost">
              Heimröster ansehen
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
