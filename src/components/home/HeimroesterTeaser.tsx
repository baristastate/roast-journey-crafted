import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";
import img from "@/assets/heimroester-hero.jpg";

export function HeimroesterTeaser() {
  return (
    <section className="theme-dark bg-ink-black text-pearl-white relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-28 md:py-40 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          {/* signature glow */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(255,215,0,0.22),transparent_60%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,rgba(41,199,255,0.18),transparent_60%)]" />
          <Reveal>
            <Eyebrow>Heimrösten · Tech</Eyebrow>
            <h2 className="mt-5 font-display tracking-display text-5xl md:text-7xl leading-[0.95]">
              Röste deinen Kaffee
              <br />
              selbst. <span className="text-magenta-coral">Frame</span>
              <br />
              by <span className="text-cyan-bloom">frame.</span>
            </h2>
            <p className="mt-6 max-w-md text-pearl-white/75 text-lg">
              Rohkaffee rein. Profil wählen. Rösten. Genießen. Mit unseren Heimröstern steuerst du
              Frische, Röstgrad und Geschmack direkt zuhause.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/heimroester"
                className="btn-shimmer rounded-full bg-magenta-coral text-ink-black px-7 py-4 text-sm font-semibold shadow-[0_20px_60px_-15px_rgba(255,215,0,0.6)] hover:-translate-y-px transition-transform"
              >
                Heimröster entdecken
              </Link>
              <Link
                to="/heimroester"
                className="rounded-full border border-pearl-white/25 px-7 py-4 text-sm hover:border-cyan-bloom hover:text-cyan-bloom transition-colors"
              >
                So funktioniert es
              </Link>
            </div>
            <ul className="mt-10 grid sm:grid-cols-3 gap-4 text-sm">
              {[
                ["10–14 min", "pro Röstung"],
                ["3 Profile", "vorprogrammiert"],
                ["250 g", "Rohkaffee Kapazität"],
              ].map(([a, b]) => (
                <li key={a} className="border-t border-cream/15 pt-3">
                  <div className="font-display text-2xl text-cream">{a}</div>
                  <div className="text-cream/60 text-xs uppercase tracking-[0.2em] mt-1">{b}</div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
            <img
              src={img}
              alt="Barista State Heimröster mit Rohkaffee"
              className="parallax-img h-full w-full object-cover"
              loading="lazy"
            />
            {/* hotspots */}
            {[
              { t: "22%", l: "58%", lbl: "Profil wählen" },
              { t: "48%", l: "66%", lbl: "Temperatur" },
              { t: "74%", l: "42%", lbl: "Rohkaffee" },
            ].map((h, i) => (
              <div key={i} className="absolute" style={{ top: h.t, left: h.l }}>
                <div className="relative">
                  <span className="block h-3 w-3 rounded-full bg-cyan-bloom ring-4 ring-cyan-bloom/30 animate-[ping_2.5s_ease-out_infinite]" />
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink-black/85 backdrop-blur px-3 py-1 text-xs border border-cyan-bloom/40 text-pearl-white">
                    {h.lbl}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
