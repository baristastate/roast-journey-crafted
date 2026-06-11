import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/shared/Reveal";
import { PremiumHero } from "@/components/shared/PremiumHero";
import { HEIMROESTER } from "@/lib/data";
import heroImg from "@/assets/heimroester-hero.jpg";

export const Route = createFileRoute("/heimroester")({
  head: () => ({
    meta: [
      { title: "Heimröster — Röste deinen Kaffee selbst | Barista State" },
      {
        name: "description",
        content:
          "Mit unseren Heimröstern steuerst du Frische, Röstgrad und Geschmack zuhause. Einfach, kontrolliert, emotional.",
      },
      { property: "og:title", content: "Heimröster — Barista State" },
      { property: "og:description", content: "Aus Rohkaffee wird dein persönlicher Kaffee." },
    ],
  }),
  component: HeimroesterPage,
});

const ROAST_PROFILES = [
  {
    id: "hell",
    label: "Hell",
    color: "oklch(0.55 0.09 60)",
    aroma: "Fruchtig, klar, lebendig.",
    profile: "Höhere Temperatur, kurze Entwicklung. Säure bleibt erhalten.",
    temp: 196,
    time: 10.5,
    agtron: 75,
    acidity: 0.85,
    body: 0.35,
    sweetness: 0.55,
    chips: ["Bergamotte", "Hibiskus", "Honig", "Zitrus"],
  },
  {
    id: "mittel",
    label: "Mittel",
    color: "oklch(0.38 0.07 45)",
    aroma: "Ausgewogen, süß, rund.",
    profile: "Mittlere Entwicklung. Süße und Körper im Vordergrund.",
    temp: 210,
    time: 12.5,
    agtron: 55,
    acidity: 0.55,
    body: 0.65,
    sweetness: 0.85,
    chips: ["Karamell", "Milchschokolade", "Mandel", "Rohrzucker"],
  },
  {
    id: "dunkel",
    label: "Dunkel",
    color: "oklch(0.22 0.04 35)",
    aroma: "Kräftig, schokoladig, intensiv.",
    profile: "Längere Röstung. Tiefe Aromen, weniger Säure.",
    temp: 224,
    time: 14.5,
    agtron: 35,
    acidity: 0.25,
    body: 0.95,
    sweetness: 0.6,
    chips: ["Zartbitter", "Tabak", "Walnuss", "Melasse"],
  },
] as const;


function HeimroesterPage() {
  return (
    <>
      <Hero />
      <RoastSequence />
      <FirstCrack />
      <RoastSlider />
      <Hotspots />
      <MiniDemo />
      <FAQ />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <PremiumHero
      image={heroImg}
      alt="Heimröster im Lichtkegel"
      eyebrow="USP · Heimrösten"
      eyebrowMeta="Rohkaffee → Tasse"
      lines={[
        { text: "Röste deinen Kaffee selbst." },
        { text: "Einfacher, als du denkst.", italic: true },
      ]}
      subtitle="Mit unseren Heimröstern steuerst du Frische, Röstgrad und Geschmack direkt zuhause."
      bgClass="theme-dark bg-espresso text-cream"
      overlay="espresso"
      orb="gold"
      minH="100svh"
    >
      <a
        href="#sortiment"
        className="btn-shimmer rounded-full bg-magenta-coral px-6 py-3.5 text-sm font-semibold text-ink-black hover:-translate-y-px transition-transform shadow-[0_12px_40px_-10px_rgba(245,200,66,0.45)]"
      >
        Heimröster entdecken
      </a>
      <a href="#so-gehts" className="rounded-full border border-cream/30 px-6 py-3.5 text-sm">
        So funktioniert es
      </a>
    </PremiumHero>
  );
}

function RoastSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const stages = [
    { c: "oklch(0.72 0.11 130)", label: "Rohkaffee" },
    { c: "oklch(0.68 0.10 100)", label: "Trocknung" },
    { c: "oklch(0.62 0.10 80)", label: "Gelbphase" },
    { c: "oklch(0.55 0.10 60)", label: "Cinnamon" },
    { c: "oklch(0.45 0.09 50)", label: "First Crack" },
    { c: "oklch(0.36 0.08 45)", label: "City" },
    { c: "oklch(0.28 0.05 40)", label: "Full City" },
    { c: "oklch(0.22 0.04 35)", label: "Vienna" },
  ];
  const idx = useTransform(scrollYProgress, [0, 1], [0, stages.length - 1]);

  return (
    <section
      id="so-gehts"
      ref={ref}
      className="theme-dark bg-espresso text-cream"
      style={{ height: "260svh" }}
    >
      <div className="sticky top-0 h-[100svh] flex items-center overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full">
          <div className="relative flex items-center justify-center">
            <div className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px] overflow-hidden relative shrink-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="[transform:scale(0.57)] sm:[transform:scale(0.76)] lg:[transform:scale(1)] origin-center">
                  <RoastBeans idx={idx} stages={stages} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Eyebrow>Frame-by-frame</Eyebrow>
            <h2 className="mt-4 font-display tracking-display text-4xl md:text-6xl leading-[1]">
              Aus Rohkaffee wird dein
              <br />
              <em className="not-italic display-italic text-magenta-coral">persönlicher Kaffee.</em>
            </h2>
            <p className="mt-6 text-cream/70 max-w-md">
              Beim Scrollen folgst du der Bohne durch jede Phase der Röstung — von hellgrün bis tief
              schokoladig.
            </p>
            <StageList idx={idx} stages={stages} />
          </div>
        </div>
      </div>
    </section>
  );
}

function RoastBeans({
  idx,
  stages,
}: {
  idx: MotionValue<number>;
  stages: { c: string; label: string }[];
}) {
  const color = useTransform(
    idx,
    stages.map((_, i) => i),
    stages.map((s) => s.c),
  );
  const wobble = useTransform(idx, (v: number) => Math.sin(v * 6) * 4);
  const beans = Array.from({ length: 22 });
  return (
    <motion.div
      className="relative h-[420px] w-[420px] max-w-full rounded-full"
      style={{
        background: "radial-gradient(circle at 50% 40%, rgba(232,180,90,0.15), transparent 65%)",
      }}
    >
      {beans.map((_, i) => {
        const angle = (i / beans.length) * Math.PI * 2;
        const r = 110 + (i % 3) * 18;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        return (
          <motion.span
            key={i}
            style={{ background: color, x: x, y: wobble }}
            className="absolute left-1/2 top-1/2 -ml-3 -mt-2 block h-4 w-6 rounded-[40%] shadow-[inset_-2px_-2px_3px_rgba(0,0,0,0.25)]"
            animate={{ y: [y - 2, y + 2, y - 2] }}
            transition={{
              duration: 3 + (i % 4) * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.08,
            }}
          />
        );
      })}
      <motion.div
        style={{ background: color }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-20 rounded-[40%] shadow-2xl"
      />
    </motion.div>
  );
}

function StageList({
  idx,
  stages,
}: {
  idx: MotionValue<number>;
  stages: { c: string; label: string }[];
}) {
  return (
    <ul className="mt-10 grid grid-cols-2 gap-3 text-sm">
      {stages.map((s, i) => (
        <StageRow key={i} idx={idx} target={i} label={s.label} color={s.c} />
      ))}
    </ul>
  );
}
function StageRow({
  idx,
  target,
  label,
  color,
}: {
  idx: MotionValue<number>;
  target: number;
  label: string;
  color: string;
}) {
  const op = useTransform(idx, (v: number) => Math.max(0.3, 1 - Math.abs(v - target) * 0.6));
  return (
    <motion.li style={{ opacity: op }} className="flex items-center gap-2">
      <span className="block h-3 w-3 rounded-full" style={{ background: color }} />
      <span>{label}</span>
    </motion.li>
  );
}

function FirstCrack() {
  return (
    <section className="theme-dark bg-espresso-soft text-cream py-32 border-y border-cream/10">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <Eyebrow>First Crack</Eyebrow>
          <h2 className="mt-4 font-display tracking-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1]">
            Der Moment, in dem
            <br />
            <em className="not-italic display-italic text-magenta-coral">Kaffee entsteht.</em>
          </h2>
          <p className="mt-6 text-cream/70 max-w-md">
            Du hörst ihn. Ein leises, klares Knacken. Die Bohne bricht auf — Zucker karamellisiert,
            Aromen entfalten sich. Ab hier bestimmst du, wohin der Kaffee geht.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <TempCurve />
        </Reveal>
      </div>
    </section>
  );
}

function TempCurve() {
  return (
    <div className="relative aspect-[5/3] rounded-3xl border border-cream/15 p-6 bg-espresso">
      <div className="text-[0.7rem] uppercase tracking-[0.24em] text-cream/50 mb-2">
        Bohnen-Temperatur · °C
      </div>
      <svg viewBox="0 0 500 250" className="w-full h-[calc(100%-2rem)]">
        <defs>
          <linearGradient id="curve" x1="0" x2="1">
            <stop offset="0" stopColor="oklch(0.55 0.18 40)" />
            <stop offset="1" stopColor="var(--amber)" />
          </linearGradient>
        </defs>
        {[50, 100, 150, 200].map((y) => (
          <line key={y} x1="0" x2="500" y1={y} y2={y} stroke="rgba(232,228,220,0.06)" />
        ))}
        <path
          d="M 0 230 C 80 200 140 170 220 130 S 360 60 500 30"
          fill="none"
          stroke="url(#curve)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="800"
          strokeDashoffset="0"
        >
          <animate attributeName="stroke-dashoffset" from="800" to="0" dur="2.4s" fill="freeze" />
        </path>
        {/* first crack point */}
        <g>
          <circle cx="320" cy="92" r="6" fill="var(--amber)">
            <animate attributeName="r" values="6;10;6" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <text x="332" y="86" fill="var(--cream)" fontSize="12" className="font-medium">
            First Crack · ~196°C
          </text>
        </g>
      </svg>
    </div>
  );
}

function RoastSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0.5); // 0..1 continuous
  const [dragging, setDragging] = useState(false);
  const lastIdxRef = useRef(1);

  const idxFloat = t * (ROAST_PROFILES.length - 1);
  const i = Math.round(idxFloat);
  const p = ROAST_PROFILES[i];

  // Interpolate readouts between neighbours for tactile feel.
  const lo = ROAST_PROFILES[Math.floor(idxFloat)];
  const hi = ROAST_PROFILES[Math.min(ROAST_PROFILES.length - 1, Math.floor(idxFloat) + 1)];
  const k = idxFloat - Math.floor(idxFloat);
  const lerp = (a: number, b: number) => a + (b - a) * k;
  const liveTemp = lerp(lo.temp, hi.temp);
  const liveTime = lerp(lo.time, hi.time);
  const liveAgtron = lerp(lo.agtron, hi.agtron);
  const liveAcidity = lerp(lo.acidity, hi.acidity);
  const liveBody = lerp(lo.body, hi.body);
  const liveSweet = lerp(lo.sweetness, hi.sweetness);

  // Snap & haptic when active index changes.
  if (lastIdxRef.current !== i) {
    lastIdxRef.current = i;
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        (navigator as Navigator & { vibrate?: (p: number) => void }).vibrate?.(8);
      } catch {
        /* noop */
      }
    }
  }

  const setFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    setT(next);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setDragging(true);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    // snap to nearest profile with eased motion
    setT(Math.round(t * (ROAST_PROFILES.length - 1)) / (ROAST_PROFILES.length - 1));
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight")
      setT(Math.min(1, (i + 1) / (ROAST_PROFILES.length - 1)));
    if (e.key === "ArrowLeft")
      setT(Math.max(0, (i - 1) / (ROAST_PROFILES.length - 1)));
  };

  return (
    <section className="bg-cream-warm py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <Eyebrow>Röstgrad-Profil</Eyebrow>
            <h2 className="mt-4 font-display tracking-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1]">
              Wähle, wie weit
              <br />
              du gehst.
            </h2>
            <p className="mt-5 text-muted-foreground max-w-md">
              Greif den Knopf, zieh ihn — und spür, wie sich Bohne, Säure und Aroma in Echtzeit
              verändern.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-sm">
              <Readout label="Temperatur" value={`${liveTemp.toFixed(0)}°C`} />
              <Readout label="Röstzeit" value={`${liveTime.toFixed(1)} min`} />
              <Readout label="Agtron" value={liveAgtron.toFixed(0)} />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-border bg-card p-8 md:p-12 overflow-hidden">
              {/* Bean morph */}
              <div className="flex items-center justify-center mb-10 h-40">
                <motion.div
                  className="relative h-32 w-48 rounded-[50%]"
                  animate={{
                    background: p.color,
                    scale: dragging ? 1.06 : 1,
                    rotate: (idxFloat - 1) * 4,
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  style={{
                    boxShadow:
                      "inset -8px -10px 22px rgba(0,0,0,0.32), inset 6px 8px 18px rgba(255,255,255,0.06)",
                  }}
                >
                  {/* steam */}
                  {[0, 1, 2].map((s) => (
                    <motion.span
                      key={s}
                      className="absolute left-1/2 top-0 h-10 w-1 -translate-x-1/2 rounded-full bg-foreground/15"
                      animate={{ y: [-4, -36], opacity: [0, 0.7, 0], scaleX: [1, 1.6, 0.4] }}
                      transition={{
                        duration: 2.4 + s * 0.4,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: s * 0.6,
                      }}
                      style={{ left: `${40 + s * 12}%` }}
                    />
                  ))}
                </motion.div>
              </div>

              {/* Tactile slider */}
              <div className="px-2 select-none">
                <div
                  ref={trackRef}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                  className="relative h-12 cursor-grab active:cursor-grabbing touch-none"
                  role="slider"
                  tabIndex={0}
                  aria-valuemin={0}
                  aria-valuemax={2}
                  aria-valuenow={i}
                  aria-label="Röstgrad"
                  onKeyDown={onKey}
                >
                  {/* track gradient */}
                  <div
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, oklch(0.62 0.10 70), oklch(0.40 0.08 50), oklch(0.20 0.04 30))",
                    }}
                  />
                  {/* ticks */}
                  {ROAST_PROFILES.map((_, n) => {
                    const pos = n / (ROAST_PROFILES.length - 1);
                    const active = n === i;
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setT(pos)}
                        aria-label={ROAST_PROFILES[n].label}
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 grid place-items-center"
                        style={{ left: `${pos * 100}%` }}
                      >
                        <span
                          className={`block rounded-full transition-all duration-300 ${active ? "h-4 w-4 bg-amber ring-4 ring-amber/25" : "h-2 w-2 bg-foreground/40"}`}
                        />
                      </button>
                    );
                  })}
                  {/* knob */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                    animate={{
                      left: `${t * 100}%`,
                      scale: dragging ? 1.15 : 1,
                    }}
                    transition={
                      dragging
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 360, damping: 26 }
                    }
                  >
                    <div className="relative">
                      <span
                        className="block h-10 w-10 rounded-full border border-foreground/15 bg-card shadow-[0_10px_28px_-8px_rgba(0,0,0,0.35),inset_0_-3px_6px_rgba(0,0,0,0.12),inset_0_2px_3px_rgba(255,255,255,0.6)]"
                      />
                      <span
                        className="absolute inset-1.5 rounded-full"
                        style={{ background: p.color }}
                      />
                      {/* value bubble */}
                      <motion.div
                        initial={false}
                        animate={{ opacity: dragging ? 1 : 0, y: dragging ? -6 : 0 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground text-background px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em]"
                      >
                        {p.label}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-3 flex justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {ROAST_PROFILES.map((r) => (
                    <span key={r.id}>{r.label}</span>
                  ))}
                </div>
              </div>

              {/* Profile body */}
              <div className="mt-10 border-t border-border pt-6 grid sm:grid-cols-2 gap-6">
                <motion.div
                  key={`txt-${p.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="font-display text-2xl">
                    {p.label} · {p.aroma}
                  </h3>
                  <p className="mt-2 text-muted-foreground text-sm">{p.profile}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.chips.map((c) => (
                      <motion.span
                        key={c}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-full border border-foreground/15 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.16em]"
                      >
                        {c}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
                <div className="space-y-3">
                  <Meter label="Säure" value={liveAcidity} />
                  <Meter label="Körper" value={liveBody} />
                  <Meter label="Süße" value={liveSweet} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Readout({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3">
      <div className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
      <div className="font-display text-xl tabular-nums mt-0.5">{value}</div>
    </div>
  );
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
        <span>{label}</span>
        <span className="tabular-nums">{Math.round(value * 100)}</span>
      </div>
      <div className="mt-1.5 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
        <motion.div
          className="h-full bg-amber"
          animate={{ width: `${value * 100}%` }}
          transition={{ type: "spring", stiffness: 180, damping: 24 }}
        />
      </div>
    </div>
  );
}


function Hotspots() {
  const items = [
    ["01", "Röstprofil wählen", "Drei vorprogrammierte Profile oder eigenes Setup."],
    ["02", "Temperatur kontrollieren", "Steuere die Bohnen-Temperatur über den gesamten Verlauf."],
    ["03", "Bohnenentwicklung beobachten", "Echtzeit-Feedback via Display oder App."],
    [
      "04",
      "Frische selbst bestimmen",
      "Röste, wenn du brauchst — nicht, wenn ein Lager es zulässt.",
    ],
    ["05", "Für zuhause gemacht", "Leise, kompakt, geruchsarm — der Küche zugewandt."],
  ];
  return (
    <section className="theme-dark bg-espresso text-cream py-28 md:py-36 border-y border-cream/10">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <Eyebrow>Maschine</Eyebrow>
          <h2 className="mt-4 font-display tracking-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1] max-w-3xl">
            Fünf Hebel, mit denen du deinen Kaffee in der Hand hast.
          </h2>
        </Reveal>
        <ul className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/10 rounded-3xl overflow-hidden">
          {items.map(([n, t, b], i) => (
            <Reveal key={n} delay={i * 0.05}>
              <li className="bg-espresso p-8 h-full">
                <div className="font-display text-amber text-3xl">{n}</div>
                <h3 className="mt-3 font-display text-2xl">{t}</h3>
                <p className="mt-3 text-cream/65 text-sm">{b}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MiniDemo() {
  const beans = [
    { id: "b1", label: "Brasilien Mogiana", note: "süß, nussig" },
    { id: "b2", label: "Äthiopien Sidamo", note: "fruchtig, hell" },
    { id: "b3", label: "Kolumbien Huila", note: "ausgewogen" },
  ];
  const roasts = ROAST_PROFILES;
  const [bean, setBean] = useState<string | null>(null);
  const [roast, setRoast] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const result = beans.find((b) => b.id === bean);
  const r = roasts.find((rr) => rr.id === roast);

  return (
    <section id="sortiment" className="bg-background py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="max-w-2xl">
          <Eyebrow>Mini-Demo</Eyebrow>
          <h2 className="mt-4 font-display tracking-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1]">
            Teste deine
            <br />
            erste Röstung.
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <DemoStep n={1} title="Rohkaffee auswählen" active={!bean}>
            <div className="grid gap-2">
              {beans.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBean(b.id)}
                  className={`text-left rounded-xl border p-3 ${bean === b.id ? "border-amber bg-amber/10" : "border-border hover:border-foreground/40"}`}
                >
                  <div className="font-display text-lg">{b.label}</div>
                  <div className="text-xs text-muted-foreground">{b.note}</div>
                </button>
              ))}
            </div>
          </DemoStep>
          <DemoStep n={2} title="Röstgrad wählen" active={!!bean && !roast}>
            <div className="grid gap-2">
              {roasts.map((rr) => (
                <button
                  key={rr.id}
                  disabled={!bean}
                  onClick={() => setRoast(rr.id)}
                  className={`text-left rounded-xl border p-3 disabled:opacity-40 ${roast === rr.id ? "border-amber bg-amber/10" : "border-border hover:border-foreground/40"}`}
                >
                  <div className="font-display text-lg">{rr.label}</div>
                  <div className="text-xs text-muted-foreground">{rr.aroma}</div>
                </button>
              ))}
            </div>
          </DemoStep>
          <DemoStep n={3} title="Profil starten" active={!!roast}>
            <button
              disabled={!roast}
              onClick={() => setStarted(true)}
              className="w-full rounded-xl bg-amber text-espresso py-3 disabled:opacity-40 font-medium"
            >
              Röstung starten →
            </button>
            {started && result && r && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl border border-border bg-card p-4"
              >
                <div className="text-xs uppercase tracking-[0.24em] text-amber">Dein Profil</div>
                <div className="mt-1 font-display text-xl">
                  {result.label} · {r.label}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{r.aroma}</div>
              </motion.div>
            )}
          </DemoStep>
        </div>

        {/* Sortiment */}
        <div className="mt-24">
          <Eyebrow>Sortiment</Eyebrow>
          <h3 className="mt-4 font-display tracking-display text-4xl md:text-5xl">
            Zwei Heimröster. Ein Versprechen.
          </h3>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {HEIMROESTER.map((m) => (
              <Reveal key={m.id}>
                <article className="rounded-3xl border border-border bg-card overflow-hidden group">
                  <div className="aspect-[5/4] bg-espresso overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="font-display text-3xl">{m.name}</h4>
                      <span className="font-display text-2xl">{m.price} €</span>
                    </div>
                    <p className="mt-1 text-muted-foreground">{m.subtitle}</p>
                    <dl className="mt-5 grid grid-cols-2 gap-y-2 text-sm">
                      <dt className="text-muted-foreground">Kapazität</dt>
                      <dd>{m.capacity}</dd>
                      <dt className="text-muted-foreground">Röstzeit</dt>
                      <dd>{m.time}</dd>
                    </dl>
                    <Link
                      to="/shop"
                      className="mt-6 inline-flex rounded-full bg-foreground text-background px-5 py-2.5 text-sm"
                    >
                      Details ansehen →
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoStep({
  n,
  title,
  children,
  active,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border p-6 transition-colors ${active ? "border-amber bg-amber/5" : "border-border bg-card"}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`grid h-7 w-7 place-items-center rounded-full text-xs ${active ? "bg-amber text-espresso" : "bg-muted text-muted-foreground"}`}
        >
          {n}
        </span>
        <span className="text-sm font-medium">{title}</span>
      </div>
      {children}
    </div>
  );
}

function FAQ() {
  const items = [
    [
      "Ist Heimrösten schwer?",
      "Nein. Mit vorprogrammierten Profilen läuft die erste Röstung praktisch von allein. Wer mehr will, kann jeden Parameter selbst steuern.",
    ],
    [
      "Wie lange dauert eine Röstung?",
      "Je nach Profil zwischen 10 und 16 Minuten. Inklusive Abkühlphase planst du etwa 25 Minuten ein.",
    ],
    [
      "Riecht das Rösten stark?",
      "Es duftet — angenehm und ähnlich wie frisch gebackenes Brot. Unsere Röster haben Filter und Abluft, sodass nichts überhand nimmt.",
    ],
    [
      "Welchen Rohkaffee brauche ich?",
      "Unverarbeiteten, grünen Kaffee. Du bekommst kuratierte Lots direkt bei uns — sortenrein oder als Probier-Set.",
    ],
    [
      "Für wen lohnt sich ein Heimröster?",
      "Für alle, die Frische direkt erleben, mehr Kontrolle wollen oder einfach Lust auf ein eigenes Handwerk in der Küche haben.",
    ],
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-cream-warm py-28 md:py-36 border-t border-border">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <Eyebrow>Häufige Fragen</Eyebrow>
        <h2 className="mt-4 font-display tracking-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1]">
          Was du vielleicht noch wissen willst.
        </h2>
        <ul className="mt-12 divide-y divide-border border-y border-border">
          {items.map(([q, a], i) => (
            <li key={q}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full text-left py-6 flex items-start gap-6"
              >
                <span className="font-display text-sm text-amber w-8">0{i + 1}</span>
                <span className="flex-1 font-display text-2xl md:text-3xl">{q}</span>
                <span className="text-2xl font-light pt-1">{open === i ? "−" : "+"}</span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                className="overflow-hidden"
              >
                <p className="pb-6 pl-8 sm:pl-14 pr-4 sm:pr-10 text-muted-foreground max-w-3xl">{a}</p>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="theme-dark bg-espresso text-cream py-28 md:py-36 text-center">
      <div className="mx-auto max-w-[900px] px-5 md:px-10">
        <Reveal>
          <h2 className="font-display tracking-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-[1]">
            Bereit für deine
            <br />
            <em className="not-italic display-italic text-magenta-coral">erste eigene Röstung?</em>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop"
              className="btn-shimmer rounded-full bg-magenta-coral px-6 py-3.5 text-sm font-semibold text-ink-black hover:-translate-y-px transition-transform"
            >
              Heimröster kaufen
            </Link>
            <Link
              to="/kaffee"
              className="rounded-full border border-cream/30 px-6 py-3.5 text-sm hover:border-cyan-bloom hover:text-cyan-bloom transition-colors"
            >
              Rohkaffee ansehen
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
