import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-home.jpg";

const TICKER = [
  "Specialty Coffee",
  "Frisch geröstet",
  "Heimröster",
  "Single Origin",
  "Rohkaffee",
  "Community",
  "Barista State",
  "12 Röstereien",
  "Digital Bloom 2026",
  "Pour Over",
];

const EASE = [0.22, 1, 0.36, 1] as const;

const LINE_1 = "Specialty Coffee.".split(" ");
const LINE_2 = "Endlich zu Hause.".split(" ");

/** Tailwind `md` breakpoint — keep heavy parallax/blur off small screens. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

function Reveal({
  words,
  base = 0.1,
  className = "",
  style,
  reduced = false,
}: {
  words: string[];
  base?: number;
  className?: string;
  style?: React.CSSProperties;
  reduced?: boolean;
}) {
  return (
    <span className={`block ${className}`} style={style}>
      {words.map((w, i) => (
        <span key={w + i} className="mr-[0.16em] inline-block overflow-hidden last:mr-0">
          <motion.span
            initial={reduced ? { y: 0, opacity: 0 } : { y: "108%" }}
            animate={reduced ? { y: 0, opacity: 1 } : { y: "0%" }}
            transition={{
              delay: reduced ? 0 : base + i * 0.08,
              duration: reduced ? 0.3 : 0.95,
              ease: EASE,
            }}
            className="inline-block will-change-transform"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

type CtaKey = "discover" | "quiz" | "shop";

const CTAS: Record<
  CtaKey,
  { label: string; sub: string; to: string; hash?: string }
> = {
  discover: { label: "Kollektion entdecken", sub: "Kuratiert · 80+ Kaffees", to: "/kaffee" },
  quiz: { label: "Finde deinen Kaffee", sub: "3-Schritte-Quiz", to: "/", hash: "finder" },
  shop: { label: "Direkt zum Shop", sub: "Versandfertig in 24h", to: "/shop" },
};

function CtaCluster({
  primary,
  progress,
}: {
  primary: CtaKey;
  progress: MotionValue<number>;
}) {
  // Subtle motion on the cluster as the user scrolls
  const y = useTransform(progress, [0, 1], [0, -8]);
  const order: CtaKey[] = ["discover", "quiz", "shop"];
  const rest = order.filter((k) => k !== primary);

  const renderPrimary = (key: CtaKey) => {
    const c = CTAS[key];
    const to = c.to;
    return (
      <Link
        key={key}
        to={to}
        hash={c.hash}
        className="btn-shimmer group inline-flex items-center gap-3 rounded-full bg-magenta-coral px-7 py-3.5 text-sm font-semibold text-ink-black shadow-[0_10px_30px_-12px_rgba(255,90,120,0.6)] outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-pearl-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black"
        data-cta={key}
      >
        <span>{c.label}</span>
        <span aria-hidden className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </Link>
    );
  };

  const renderSecondary = (key: CtaKey) => {
    const c = CTAS[key];
    return (
      <Link
        key={key}
        to={c.to}
        hash={c.hash}
        className="inline-flex items-center gap-2 rounded-full border border-pearl-white/40 bg-ink-black/40 px-6 py-3 text-sm text-pearl-white backdrop-blur-sm outline-none transition-colors duration-300 hover:border-cyan-bloom hover:text-cyan-bloom focus-visible:ring-2 focus-visible:ring-pearl-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black"
      >
        <span className="font-serif italic" aria-hidden>
          ↳
        </span>
        <span>{c.label}</span>
      </Link>
    );
  };

  return (
    <motion.div style={{ y }} className="mt-8">
      <div className="flex flex-wrap items-center gap-3">
        {renderPrimary(primary)}
        {rest.map(renderSecondary)}
      </div>
      <p className="kicker mt-3 text-pearl-white/65">
        <span className="font-serif italic normal-case tracking-normal opacity-75">
          Empfohlen jetzt —
        </span>{" "}
        {CTAS[primary].sub}
      </p>
    </motion.div>
  );
}

export function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  const animate = !prefersReduced;
  const parallax = animate && isDesktop;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Gate transforms behind the parallax flag (mobile + reduced-motion = static)
  const yImg = useTransform(scrollYProgress, [0, 1], parallax ? ["0%", "16%"] : ["0%", "0%"]);
  const scaleImg = useTransform(
    scrollYProgress,
    [0, 1],
    parallax ? [1.04, 1.1] : [1, 1],
  );
  const yText = useTransform(scrollYProgress, [0, 1], parallax ? ["0%", "-8%"] : ["0%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], animate ? [1, 0] : [1, 1]);

  // Scroll-intent CTA: discover (top) → quiz (mid) → shop (bottom)
  const [primaryCta, setPrimaryCta] = useState<CtaKey>("discover");
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setPrimaryCta(v < 0.25 ? "discover" : v < 0.6 ? "quiz" : "shop");
    });
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <section
      ref={ref}
      aria-labelledby="home-hero-title"
      className="theme-dark relative isolate overflow-hidden bg-ink-black text-pearl-white"
      style={{ minHeight: "100svh" }}
    >
      {/* Full-bleed background */}
      <motion.img
        src={heroImg}
        alt=""
        aria-hidden="true"
        style={{ y: yImg, scale: scaleImg }}
        className="absolute inset-0 z-0 h-full w-full object-cover will-change-transform [transform:translateZ(0)]"
        width={1600}
        height={2000}
        fetchPriority="high"
        decoding="async"
      />

      {/* Layered overlays — tuned for WCAG AA contrast on white text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(115deg,rgba(8,8,12,0.95)_0%,rgba(8,8,12,0.78)_40%,rgba(8,8,12,0.5)_72%,rgba(8,8,12,0.7)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(120% 80% at 22% 32%, transparent 38%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* Reading scrim behind the headline column for guaranteed contrast */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[78svh] bg-gradient-to-t from-ink-black via-ink-black/70 to-transparent lg:w-[78%]"
      />

      {/* Skip link — first in tab order for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-pearl-white focus:px-4 focus:py-2 focus:text-ink-black"
      >
        Zum Inhalt springen
      </a>

      {/* ── Masthead ─────────────────────────────── */}
      <div className="relative z-20 border-b border-pearl-white/15">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-3 md:px-10">
          <p className="kicker flex items-center gap-3 text-pearl-white">
            <span className="font-serif italic normal-case tracking-normal text-base">№ 47</span>
            <span>Roast Journal</span>
            <span aria-hidden className="hidden h-px w-8 bg-pearl-white/40 md:inline-block" />
            <span className="hidden md:inline opacity-85">Edition DE · 2026</span>
          </p>
          <p className="kicker hidden items-center gap-3 text-pearl-white md:flex">
            <motion.span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-magenta-coral"
              animate={animate ? { opacity: [0.4, 1, 0.4] } : { opacity: 1 }}
              transition={animate ? { duration: 2.2, repeat: Infinity } : undefined}
            />
            <span className="opacity-90">Heute frisch aus 12 Röstereien</span>
          </p>
        </div>
      </div>

      {/* Rotated marginalia — only on tall, wide screens to avoid clipping */}
      <p
        aria-hidden
        className="kicker pointer-events-none absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 -rotate-90 origin-left text-pearl-white/75 lg:[@media(min-height:760px)]:block"
      >
        <span className="mr-3 font-serif italic normal-case tracking-normal">— </span>
        Cover Story
      </p>

      {/* Adaptive register-mark crop ticks — clamp away from header/footer */}
      {(
        [
          ["left-3 md:left-5", "top-[clamp(3.5rem,8svh,6rem)]", "border-l border-t"],
          ["right-3 md:right-5", "top-[clamp(3.5rem,8svh,6rem)]", "border-r border-t"],
          ["left-3 md:left-5", "bottom-[clamp(5rem,12svh,8rem)]", "border-l border-b"],
          ["right-3 md:right-5", "bottom-[clamp(5rem,12svh,8rem)]", "border-r border-b"],
        ] as const
      ).map(([x, y, edges], i) => (
        <span
          key={i}
          aria-hidden
          className={`pointer-events-none absolute ${x} ${y} z-20 h-3 w-3 ${edges} border-pearl-white/70`}
        />
      ))}

      {/* ── Editorial content ───────────────────────── */}
      <motion.div
        id="main-content"
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto flex max-w-[1500px] flex-col justify-end px-5 pt-12 pb-24 md:px-10 md:pt-20 md:pb-28"
      >
        <div
          className="grid grid-cols-12 gap-6"
          style={{ minHeight: "calc(100svh - 14rem)" }}
        >
          <div className="col-span-12 flex flex-col justify-end lg:col-span-9">
            <motion.p
              initial={animate ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="kicker mb-6 flex flex-wrap items-center gap-3 text-pearl-white"
            >
              <span className="font-serif italic normal-case tracking-normal text-sm opacity-80">
                Cover —
              </span>
              The Coffee Movement
              <span aria-hidden className="h-px w-6 bg-pearl-white/50" />
              <span className="text-cyan-bloom">Frühjahr 2026</span>
            </motion.p>

            <div aria-hidden className="mb-5 h-px w-24 origin-left bg-pearl-white/60 ink-sweep" />

            <h1
              id="home-hero-title"
              className="font-serif font-bold leading-[0.86] tracking-tight"
              style={{ textShadow: "0 2px 28px rgba(0,0,0,0.55)" }}
            >
              <span className="sr-only">Specialty Coffee. Endlich zu Hause.</span>
              <span aria-hidden>
                <Reveal
                  words={LINE_1}
                  base={0.15}
                  reduced={!animate}
                  style={{ fontSize: "clamp(2.75rem,11vw,12rem)" }}
                />
                <Reveal
                  words={LINE_2}
                  base={0.45}
                  reduced={!animate}
                  className="text-magenta-coral italic"
                  style={{ fontSize: "clamp(2.4rem,9.5vw,10rem)", marginLeft: "-0.04em" }}
                />
              </span>
            </h1>

            <motion.div
              initial={animate ? { opacity: 0, y: 14 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: animate ? 0.95 : 0, ease: EASE }}
              className="mt-8 max-w-[52ch]"
            >
              <p className="font-serif text-lg md:text-xl leading-[1.45] text-pearl-white dropcap">
                Kuratierte Specialty-Kaffees von 12 deutschen Röstereien —
                frisch geröstet, ehrlich ausgewählt, direkt vor deine Tür.
              </p>
              <CtaCluster primary={primaryCta} progress={scrollYProgress} />
            </motion.div>
          </div>

          {/* Stats anchored bottom-right */}
          <div className="col-span-12 flex items-end lg:col-span-3">
            <dl className="grid w-full grid-cols-3 gap-px overflow-hidden rounded-sm border border-pearl-white/25 bg-pearl-white/10 backdrop-blur-md">
              {[
                ["12+", "Röstereien"],
                ["80+", "Kaffees"],
                ["02", "Heimröster"],
              ].map(([n, l], i) => (
                <motion.div
                  key={l}
                  initial={animate ? { opacity: 0, y: 10 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: animate ? 1.0 + i * 0.08 : 0, duration: 0.55 }}
                  className="bg-ink-black/80 px-3 py-5"
                >
                  <dt className="kicker order-2 mt-2 block text-pearl-white/80">{l}</dt>
                  <dd className="font-serif text-3xl font-bold leading-none text-pearl-white">
                    {n}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </motion.div>

      {/* Bottom ticker */}
      <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-t border-pearl-white/[0.15] bg-ink-black/90 backdrop-blur-md py-3">
        <div className="flex whitespace-nowrap" aria-hidden>
          <span className={animate ? "marquee-x" : "px-4"}>
            {[...TICKER, ...TICKER].map((item, i) => (
              <span
                key={i}
                className="kicker inline-flex items-center gap-6 px-8 text-pearl-white/65"
              >
                <span className="font-serif italic normal-case tracking-normal text-pearl-white/55">
                  №{String((i % TICKER.length) + 1).padStart(2, "0")}
                </span>
                {item}
                <span className="h-[3px] w-[3px] rounded-full bg-magenta-coral/80" />
              </span>
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
