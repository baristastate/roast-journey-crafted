import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/shared/Reveal";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { POSTS } from "@/lib/data";

export function CommunityPreview() {
  const items = POSTS.slice(0, 6);
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <Eyebrow>Community</Eyebrow>
            <h2
              className="mt-4 font-display tracking-display leading-[1] max-w-2xl"
              style={{ fontSize: "clamp(2.4rem,5vw,3.75rem)" }}
            >
              Geschichten, die Kaffee{" "}
              <em className="not-italic display-italic text-magenta-coral">verständlicher</em>{" "}
              machen.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/community" className="link-slide text-sm font-medium">
              Zur Community →
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <article className="mb-6 break-inside-avoid group">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={p.image}
                    alt={p.title}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
                      p.aspect === "tall"
                        ? "aspect-[4/5]"
                        : p.aspect === "wide"
                          ? "aspect-[5/3]"
                          : "aspect-square"
                    }`}
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 px-1">
                  <div className="text-[0.7rem] uppercase tracking-[0.24em] text-cyan-bloom">
                    {p.category}
                  </div>
                  <h3 className="mt-2 font-display text-2xl leading-tight">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.teaser}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {p.author} · {p.readTime}
                    </span>
                    <span className="inline-flex items-center gap-1 text-magenta-coral">
                      ♥ <span className="tabular-nums">{120 + i * 37}</span>
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
