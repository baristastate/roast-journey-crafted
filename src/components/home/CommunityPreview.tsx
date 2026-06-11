import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/Reveal";
import { Section, SectionHeader } from "@/components/shared/Section";
import { POSTS } from "@/lib/data";

export function CommunityPreview() {
  const items = POSTS.slice(0, 6);
  const [featured, ...rest] = items;

  return (
    <Section tone="light" size="lg" className="overflow-hidden">
      <SectionHeader
        eyebrow="Community"
        title={
          <>
            Geschichten,{" "}
            <em className="not-italic display-italic text-magenta-coral">die bleiben.</em>
          </>
        }
        lede="Guides, Setups und Reportagen aus der deutschen Specialty-Szene. Wöchentlich neu — kuratiert von uns und unserer Community."
        aside={
          <Link to="/community" className="btn-pill btn-ghost self-start lg:self-end">
            Alle Beiträge →
          </Link>
        }
      />

      {/* Editorial bento — 7/5 split, mit konsistenter Gap-Skala */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
        {/* Featured */}
        <Reveal className="lg:col-span-7 lg:row-span-2">
          <article className="group relative h-full min-h-[460px] overflow-hidden rounded-3xl bg-ink-black">
            <img
              src={featured.image}
              alt={featured.title}
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-ink-black/40 to-transparent" />
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
              <div className="text-[0.62rem] uppercase tracking-[0.28em] text-cyan-bloom mb-3">
                Editor’s Pick · {featured.category}
              </div>
              <h3 className="font-display font-bold text-pearl-white text-3xl md:text-4xl leading-[1.02] max-w-xl">
                {featured.title}
              </h3>
              <p className="mt-4 text-pearl-white/65 text-sm md:text-base leading-relaxed max-w-md">
                {featured.teaser}
              </p>
              <div className="mt-6 flex items-center justify-between text-xs text-pearl-white/45 border-t border-pearl-white/10 pt-4">
                <span>{featured.author} · {featured.readTime}</span>
                <span className="inline-flex items-center gap-1 text-magenta-coral/80">♥ 120</span>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Two medium cards right */}
        {rest.slice(0, 2).map((p, i) => (
          <Reveal key={p.id} delay={i * 0.07} className="lg:col-span-5">
            <article className="group relative overflow-hidden rounded-3xl bg-ink-black min-h-[220px] h-full">
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 h-full w-full object-cover opacity-65 transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-black/90 via-ink-black/20 to-transparent" />
              <div className="absolute inset-0 p-6 md:p-7 flex flex-col justify-end">
                <div className="text-[0.6rem] uppercase tracking-[0.26em] text-cyan-bloom mb-2">
                  {p.category}
                </div>
                <h3 className="font-display font-bold text-pearl-white text-xl md:text-2xl leading-tight">
                  {p.title}
                </h3>
                <div className="mt-3 flex items-center justify-between text-[0.7rem] text-pearl-white/40">
                  <span>{p.author} · {p.readTime}</span>
                  <span className="text-magenta-coral/70">♥ {120 + i * 37}</span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}

        {/* Bottom row — 3 uniform small cards */}
        {rest.slice(2, 5).map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06} className="lg:col-span-4">
            <article className="tile group">
              <div className="aspect-[5/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="text-[0.62rem] uppercase tracking-[0.24em] text-cyan-bloom">
                  {p.category}
                </div>
                <h3 className="mt-2 font-display font-bold text-lg leading-snug text-balance">
                  {p.title}
                </h3>
                <div className="mt-4 flex items-center justify-between text-[0.7rem] text-muted-foreground border-t border-border pt-3">
                  <span>{p.readTime}</span>
                  <motion.span
                    className="inline-flex items-center gap-1 text-magenta-coral/70"
                    whileHover={{ scale: 1.15 }}
                  >
                    ♥ {120 + (i + 2) * 37}
                  </motion.span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Footer CTA strip */}
      <Reveal delay={0.2}>
        <div className="mt-16 md:mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-border">
          <p className="text-sm text-muted-foreground max-w-md text-center sm:text-left">
            Werde Teil unserer Community aus leidenschaftlichen Kaffeetrinkern, Röstern und Home-Baristas.
          </p>
          <Link to="/community" className="btn-pill bg-ink-black text-pearl-white">
            Jetzt mitmachen →
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
