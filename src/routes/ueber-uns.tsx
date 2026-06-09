import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/shared/Reveal";
import { Scrolly } from "@/components/shared/Scrolly";
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
      { name: "description", content: "Barista State bringt dich näher an besseren Kaffee — kuratiert, transparent, mit echtem Handwerk." },
      { property: "og:title", content: "Über uns — Barista State" },
      { property: "og:description", content: "Wir machen guten Kaffee sichtbarer, verständlicher und erlebbarer." },
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
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-cream-warm">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Über uns</Eyebrow>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="mt-5 font-display tracking-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95]">
              Wir bringen dich näher an<br /><span className="italic text-roast font-light">besseren Kaffee.</span>
            </motion.h1>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden aspect-[5/4]">
              <img src={heroImg} alt="Tasse Kaffee neben Notizbuch und Bohnen" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-28 md:py-36">
        <div className="mx-auto max-w-[1100px] px-5 md:px-10">
          <Reveal>
            <div className="grid md:grid-cols-12 gap-10">
              <div className="md:col-span-4">
                <Eyebrow>Unsere Geschichte</Eyebrow>
              </div>
              <div className="md:col-span-8 space-y-6 text-lg md:text-xl leading-relaxed text-foreground/85">
                <p>
                  Barista State entstand aus der Idee, guten Kaffee sichtbarer, verständlicher und erlebbarer zu machen. Viele Röstereien leisten großartige Arbeit — aber nicht jeder findet sie.
                </p>
                <p>
                  Gleichzeitig wollen immer mehr Menschen zuhause besseren Kaffee zubereiten, mehr verstehen und unabhängiger entdecken. Wir bringen beides zusammen — kuratiert, ehrlich und ohne Lärm.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-warm py-24 md:py-32 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Eyebrow>Werte</Eyebrow>
          <h2 className="mt-4 font-display tracking-display text-4xl md:text-5xl">Fünf Sätze, an denen wir uns messen lassen.</h2>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.05}>
                <article className={`group rounded-3xl overflow-hidden bg-card border border-border ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                  <div className={`overflow-hidden ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                    <img src={v.img} alt={v.t} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl">{v.t}</h3>
                    <p className="mt-2 text-muted-foreground">{v.b}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-dark bg-espresso text-cream py-28 text-center">
        <Reveal>
          <h2 className="font-display tracking-display text-4xl md:text-6xl">Magst du anfangen?</h2>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/kaffee" className="rounded-full bg-amber px-6 py-3.5 text-sm font-medium text-espresso">Kaffee entdecken</Link>
            <Link to="/heimroester" className="rounded-full border border-cream/30 px-6 py-3.5 text-sm">Heimröster ansehen</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
