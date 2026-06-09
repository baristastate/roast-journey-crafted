import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { POSTS } from "@/lib/data";

export function CommunityPreview() {
  const items = POSTS.slice(0, 6);
  const [featured, ...rest] = items;

  return (
    <section className="bg-background py-28 md:py-44 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16 md:mb-20">
          <Reveal>
            <Eyebrow>Community</Eyebrow>
            <h2
              className="mt-4 font-display tracking-display leading-[0.95] max-w-2xl font-bold"
              style={{ fontSize: "clamp(2.6rem,5.5vw,4.5rem)" }}
            >
              Geschichten,{" "}
              <em className="not-italic display-italic text-magenta-coral">die bleiben.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/community" className="link-slide text-sm font-medium">
              Alle Beiträge →
            </Link>
          </Reveal>
        </div>

        {/* Bento-style editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5">

          {/* Featured — large left */}
          <Reveal className="lg:col-span-7 lg:row-span-2">
            <article className="group relative h-full min-h-[440px] overflow-hidden rounded-3xl bg-ink-black">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-black/92 via-ink-black/30 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="text-[0.62rem] uppercase tracking-[0.28em] text-cyan-bloom mb-3">
                  {featured.category}
                </div>
                <h3 className="font-display font-bold text-pearl-white text-2xl md:text-3xl leading-tight">
                  {featured.title}
                </h3>
                <p className="mt-3 text-pearl-white/60 text-sm leading-relaxed max-w-sm">
                  {featured.teaser}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs text-pearl-white/40">
                  <span>{featured.author} · {featured.readTime}</span>
                  <span className="inline-flex items-center gap-1 text-magenta-coral/80">
                    ♥ {120}
                  </span>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Right column — 2 medium cards */}
          {rest.slice(0, 2).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07} className="lg:col-span-5">
              <article className="group relative overflow-hidden rounded-3xl bg-ink-black" style={{ minHeight: 210 }}>
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-65 transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black/90 via-ink-black/20 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="text-[0.6rem] uppercase tracking-[0.26em] text-cyan-bloom mb-2">
                    {p.category}
                  </div>
                  <h3 className="font-display font-bold text-pearl-white text-lg leading-tight">
                    {p.title}
                  </h3>
                  <div className="mt-2 flex items-center justify-between text-[0.68rem] text-pearl-white/35">
                    <span>{p.author} · {p.readTime}</span>
                    <span className="text-magenta-coral/70">♥ {120 + i * 37}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          {/* Bottom row — 3 small cards */}
          {rest.slice(2, 5).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06} className="lg:col-span-4">
              <article className="group overflow-hidden rounded-3xl border border-border bg-card hover:border-magenta-coral/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_-20px_rgba(245,200,66,0.12)]">
                <div
                  className={`overflow-hidden ${
                    p.aspect === "tall" ? "aspect-[4/3]" : "aspect-[5/3]"
                  }`}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="text-[0.62rem] uppercase tracking-[0.24em] text-cyan-bloom">
                    {p.category}
                  </div>
                  <h3 className="mt-2 font-display font-bold text-base leading-tight">{p.title}</h3>
                  <div className="mt-3 flex items-center justify-between text-[0.68rem] text-muted-foreground">
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

        {/* Bottom CTA strip */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex items-center justify-center gap-6 pt-10 border-t border-border">
            <span className="text-sm text-muted-foreground">
              Teil unserer Community aus leidenschaftlichen Kaffeetrinkern
            </span>
            <Link
              to="/community"
              className="btn-shimmer rounded-full bg-ink-black text-pearl-white px-6 py-2.5 text-sm font-semibold hover:-translate-y-px transition-transform"
            >
              Jetzt mitmachen
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
