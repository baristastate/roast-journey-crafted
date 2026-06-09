import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { POSTS, type Post } from "@/lib/data";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/shared/Reveal";
import heroImg from "@/assets/community-hero.jpg";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Barista State" },
      { name: "description", content: "Geschichten, Guides und Setups rund um besseren Kaffee, Heimrösten und Specialty." },
      { property: "og:title", content: "Community — Barista State" },
      { property: "og:description", content: "Lerne, entdecke, speichere und teile Wissen rund um besseren Kaffee." },
    ],
  }),
  component: CommunityPage,
});

const CATEGORIES = ["Alle", "Heimrösten", "Espresso", "Filterkaffee", "Röstereien", "Setups", "Guides", "Herkunft", "Produktwissen"] as const;
type Cat = typeof CATEGORIES[number];

function CommunityPage() {
  const [cat, setCat] = useState<Cat>("Alle");
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const items = useMemo(() => cat === "Alle" ? POSTS : POSTS.filter((p) => p.category === cat), [cat]);

  return (
    <>
      {/* HERO */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-24 overflow-hidden bg-cream-warm">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="drift-y absolute inset-0 grid grid-cols-3 gap-2">
            {[...POSTS, ...POSTS].map((p, i) => (
              <img key={i} src={p.image} alt="" aria-hidden className="aspect-square object-cover rounded-xl" loading="lazy" />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-cream-warm via-cream-warm/70 to-cream-warm" />
        </div>
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 relative">
          <Eyebrow>Community</Eyebrow>
          <h1 className="mt-5 font-display tracking-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
            Die Community für Kaffee,<br /><span className="italic text-roast font-light">Röstung & Home-Barista-Kultur.</span>
          </h1>
          <p className="mt-7 max-w-xl text-muted-foreground text-lg">
            Lerne, entdecke, speichere und teile Wissen rund um besseren Kaffee.
          </p>
        </div>
        <img src={heroImg} alt="" aria-hidden className="sr-only" />
      </section>

      {/* CATEGORIES */}
      <section className="bg-background border-y border-border sticky top-16 z-30 backdrop-blur-xl bg-background/85">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-3 flex gap-2 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <button
              key={c} onClick={() => setCat(c)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm border transition-colors ${cat === c ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/50"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* FEED */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {items.map((p, i) => (
              <FeedCard
                key={p.id} post={p}
                liked={!!liked[p.id]} saved={!!saved[p.id]}
                onLike={() => setLiked((s) => ({ ...s, [p.id]: !s[p.id] }))}
                onSave={() => setSaved((s) => ({ ...s, [p.id]: !s[p.id] }))}
                delay={i * 0.04}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function FeedCard({ post, liked, saved, onLike, onSave, delay }: {
  post: Post; liked: boolean; saved: boolean; onLike: () => void; onSave: () => void; delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <article className="mb-6 break-inside-avoid group rounded-3xl bg-card border border-border overflow-hidden">
        <div className="overflow-hidden">
          <img
            src={post.image} alt={post.title}
            className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
              post.aspect === "tall" ? "aspect-[4/5]" : post.aspect === "wide" ? "aspect-[5/3]" : "aspect-square"
            }`}
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-[0.7rem] uppercase tracking-[0.24em] text-cyan-bloom">{post.category}</span>
            <span className="text-xs text-muted-foreground">{post.readTime}</span>
          </div>
          <h3 className="mt-2 font-display text-2xl leading-tight">{post.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{post.teaser}</p>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <span className="text-xs text-muted-foreground">{post.author}</span>
            <div className="flex items-center gap-1">
              <button onClick={onLike} aria-label="Like" className="h-8 w-8 grid place-items-center rounded-full hover:bg-muted">
                <motion.span key={String(liked)} animate={liked ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: 0.4 }} className={liked ? "text-cyan-bloom" : "text-muted-foreground"}>
                  {liked ? "●" : "○"}
                </motion.span>
              </button>
              <button onClick={onSave} aria-label="Speichern" className="h-8 w-8 grid place-items-center rounded-full hover:bg-muted text-sm">
                <span className={saved ? "text-amber" : "text-muted-foreground"}>{saved ? "▮" : "▯"}</span>
              </button>
              <button aria-label="Lesen" className="ml-1 text-sm text-amber pl-2">Lesen →</button>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
