import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";
import img from "@/assets/heimroester-hero.jpg";

export function HeimroesterTeaser() {
  return (
    <Section tone="dark" size="lg" className="overflow-hidden">
      {/* Signature glows */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-32 -left-20 h-[60vh] w-[60vw] rounded-full bg-magenta-coral/[0.10] blur-[140px]" />
        <div className="absolute -bottom-32 -right-20 h-[55vh] w-[55vw] rounded-full bg-cyan-bloom/[0.08] blur-[140px]" />
      </div>

      <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Copy column — 6/12 */}
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow dark>Heimrösten · Tech</Eyebrow>
            <h2 className="mt-5 font-display font-bold tracking-display leading-[0.92] text-[clamp(2.6rem,6vw,5.5rem)] text-balance">
              Röste deinen Kaffee
              <br />
              selbst. <span className="text-magenta-coral">Frame</span>
              <br />
              by <span className="text-cyan-bloom">frame.</span>
            </h2>
            <p className="mt-6 max-w-md text-pearl-white/70 text-base md:text-lg leading-relaxed">
              Rohkaffee rein. Profil wählen. Rösten. Genießen. Mit unseren Heimröstern steuerst du
              Frische, Röstgrad und Geschmack direkt zuhause.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/heimroester" className="btn-pill btn-primary btn-shimmer">
                Heimröster entdecken →
              </Link>
              <Link to="/heimroester" className="btn-pill btn-ghost">
                So funktioniert es
              </Link>
            </div>

            <ul className="mt-10 grid grid-cols-3 gap-4 text-sm border-t border-pearl-white/10 pt-6">
              {[
                ["10–14", "min pro Röstung"],
                ["3", "Profile preset"],
                ["250 g", "Kapazität"],
              ].map(([a, b]) => (
                <li key={a}>
                  <div className="font-display font-bold text-2xl md:text-3xl text-cream tabular-nums">
                    {a}
                  </div>
                  <div className="mt-1 text-cream/55 text-[0.68rem] uppercase tracking-[0.2em] leading-snug">
                    {b}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Visual column — 6/12, taller proportion */}
        <Reveal delay={0.1} className="lg:col-span-6">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-pearl-white/10">
            <img
              src={img}
              alt="Barista State Heimröster mit Rohkaffee"
              className="parallax-img h-full w-full object-cover"
              loading="lazy"
            />
            {/* Editorial overlay tag */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-[0.6rem] uppercase tracking-[0.3em] text-pearl-white/80">
              <span className="rounded-full bg-ink-black/60 backdrop-blur px-3 py-1.5 border border-pearl-white/15">
                Modell · Drum 250
              </span>
              <span className="rounded-full bg-magenta-coral text-ink-black px-3 py-1.5 font-semibold">
                Live
              </span>
            </div>

            {/* Hotspots */}
            {[
              { t: "32%", l: "60%", lbl: "Profil wählen" },
              { t: "52%", l: "68%", lbl: "Temperatur" },
              { t: "72%", l: "40%", lbl: "Rohkaffee" },
            ].map((h, i) => (
              <div key={i} className="absolute" style={{ top: h.t, left: h.l }}>
                <div className="relative">
                  <span className="block h-3 w-3 rounded-full bg-cyan-bloom ring-4 ring-cyan-bloom/30 animate-[ping_2.5s_ease-out_infinite]" />
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink-black/85 backdrop-blur px-3 py-1 text-[0.68rem] border border-cyan-bloom/40 text-pearl-white">
                    {h.lbl}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
