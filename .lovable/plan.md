
# Barista State — Roast Journey Interface

A premium, editorial coffee experience. Not a shop template: a scroll-driven journey from green bean to cup, with interactive tools (Aroma Wheel, Coffee Finder, Roast Slider) and a tactile, warm visual language.

## Design system

**Palette (oklch tokens in `src/styles.css`)**
- `--espresso` deep near-black brown (background base)
- `--cream` warm off-white (light surfaces)
- `--beige` warm sand (secondary surface)
- `--roast` mid roasted brown
- `--amber` copper accent (CTAs, highlights)
- `--raw-green` muted raw-coffee green (small accents, finder/quiz)
- Plus semantic mappings (background, foreground, primary, muted, border) for both light and dark sections; sections switch palette as the journey progresses.

**Typography**
- Display: an elegant modern serif (e.g. Fraunces or Instrument Serif) for headlines and editorial moments.
- UI/body: a refined geometric sans (e.g. Inter Tight or Geist) for navigation, product cards, body copy.
- Loaded via `<link>` in `__root.tsx`, registered as `--font-display` / `--font-sans` in `@theme`.

**Motion principles**
- Calm, weighty, cinematic. No bouncy springs, no glow stacks.
- Framer Motion for component animation; native `IntersectionObserver` + scroll progress for sticky scrollytelling; CSS transitions for hover micro-interactions.
- Mobile: simplify (fade/translate only), keep story beats, drop heavy parallax and frame sequences.
- Respects `prefers-reduced-motion`.

**Image strategy**
- Generated editorial imagery (beans, steam, portafilter, roastery hands, packaging, raw vs roasted beans, home roaster product shots) via `imagegen` into `src/assets/`, imported as ES modules.
- Frame-by-frame roast sequence: ~12 generated bean stages (green → yellow → cinnamon → city → full city → dark) preloaded and swapped on scroll progress.

## Routes (file-based, TanStack Router)

```
src/routes/
  __root.tsx              shell, fonts, header, footer
  index.tsx               Home — Roast Journey
  kaffee.tsx              Coffee catalog with Aroma Wheel + filters
  heimroester.tsx         Home roaster landing (key USP)
  community.tsx           Editorial feed (Blog/Community)
  roestereien.tsx         Roasteries / B2B partner page
  ueber-uns.tsx           Editorial About
  shop.tsx                Product overview grid
```

Each route sets distinct `head()` meta (title, description, og:title/description; og:image on leaves only).

## Global chrome (`__root.tsx`)

- Sticky header: transparent over hero, becomes `backdrop-blur` + cream/8% background on scroll.
- Logo (wordmark) left, nav center (Kaffee · Heimröster · Community · Röstereien · Über uns · Shop), amber CTA "Kaffee entdecken" right.
- Mobile: fullscreen overlay menu with large serif links, slow stagger.
- Footer: editorial three-column (Brand story snippet · Navigation · Newsletter), warm beige on espresso.

## Home — the Roast Journey

1. **Cinematic hero** — layered parallax: background roastery photo, mid-layer steam (slow drift via CSS), foreground bean cluster, staggered headline → subheadline → dual CTA reveal. Subtle film grain overlay.
2. **Signature sticky scrollytelling** — pinned viewport, 6 chapters (Rohkaffee → Röstung → Rösterei → Zuhause → Heimrösten → Genuss). Background color, image, and copy crossfade with scroll progress. Palette shifts from raw-green tint → roast browns → cream.
3. **Coffee Finder quiz** — 3-step interactive card; soft transitions between steps; on completion reveals 3 matched coffee cards with amber tag highlights. State is local React.
4. **Heimröster teaser** — dark split-screen, product reveal from light cone, CTA to `/heimroester`.
5. **Community preview** — 6-card masonry with category chips, hover lift, link to `/community`.
6. **Tassenfüllung scroll-progress** — slim cup-fill indicator in corner that fills as the page is read.

## Kaffee page

- Warm light hero, large serif headline.
- **Aroma Wheel** — SVG radial of 8 aromas (Schokoladig, Nussig, Fruchtig, Floral, Karamellig, Würzig, Kräftig, Mild). Click an aroma → product grid filters with soft fade/stagger; selected segment glows amber.
- Sticky filter bar (brew method, roast level, region, certifications, flavor) — chip toggles, multi-select.
- Product cards: image, roastery, origin, aroma tags, roast indicator, brew icon, price, primary "In den Warenkorb" + secondary "Details". Hover: bean tags surface, image scale 1.03, lift.
- "View-transition-like" detail open: clicking a card uses Framer Motion `layoutId` to expand the card into a full overlay product view.

## Heimröster page (USP centerpiece)

1. **Dark cinematic product reveal** — espresso background, light-cone gradient mask, machine image fades in with subtle scale; floating feature hotspots animate in after.
2. **Frame-by-frame roast scroll** — sticky canvas, ~12 bean-stage frames swapped via scroll progress; copy alongside.
3. **First-Crack moment** — pulsing temperature curve (SVG path stroke-dashoffset loop), bean micro-jitter, headline reveal.
4. **Roast-grade slider** — three-stop slider (hell/mittel/dunkel); bean image, aroma copy, profile hint, and recommended product update reactively.
5. **Machine hotspots** — annotated product diagram with 5 numbered points; click reveals a side panel.
6. **Mini-demo "Teste deine erste Röstung"** — 3-step interactive (Rohkaffee → Röstgrad → Profil), result card.
7. **FAQ** — accordion (shadcn), 5 entries.
8. Final CTA band.

## Community page

- Hero with slowly drifting background masonry (CSS keyframe translate, very slow).
- Category filter chips.
- Editorial masonry feed (CSS columns) — cards with image, category, title, teaser, author, read time, like/comment/save microinteractions (bean-pulse on like, fill on save).
- Save/like state is local (no backend in this phase).

## Röstereien / B2B

- Roastery atmosphere hero.
- Depth-effect partner cards: image with subtle parallax on hover, stable logo, region, aroma tags.
- "Wie wir Röstereien stärken" 3-step editorial block.
- Partner-werden CTA section with simple inquiry form (client-only, posts to a stubbed handler — no backend yet).

## Über uns

- Calm editorial hero (cup, notes, beans).
- Long-form story block with serif headline + sans body.
- Five values as editorial photo cards (not icon cards) — image + title + 1–2 line caption.
- Closing CTA to Kaffee.

## Shop

- Lightweight overview: same product card component as `/kaffee`, simpler filters (category, price), banner linking to Heimröster.

## Shared components

```
src/components/
  layout/  Header.tsx · Footer.tsx · MobileMenu.tsx · CupProgress.tsx
  home/    Hero.tsx · RoastJourney.tsx · CoffeeFinder.tsx · HeimroesterTeaser.tsx · CommunityPreview.tsx
  coffee/  AromaWheel.tsx · ProductCard.tsx · ProductDetailOverlay.tsx · FilterBar.tsx
  roaster/ ProductReveal.tsx · RoastFrames.tsx · FirstCrack.tsx · RoastSlider.tsx · Hotspots.tsx · MiniDemo.tsx
  community/ FeedCard.tsx · CategoryChips.tsx
  shared/  SectionHeading.tsx · CTAButton.tsx · Grain.tsx · Reveal.tsx (in-view fade/translate)
src/lib/
  motion.ts (variants, easings) · products.ts (mock catalog) · posts.ts (mock feed) · roasteries.ts
```

## Performance & accessibility

- Generated images sized appropriately, `loading="lazy"` below the fold, explicit width/height to prevent CLS.
- Frame sequences preloaded via hidden `<link rel="preload" as="image">`; gated behind reduced-motion.
- All interactive controls are real buttons with focus rings (amber on espresso, espresso on cream).
- Color contrast verified on both palettes.
- Semantic HTML, single H1 per route, alt text on every image.

## Out of scope (this phase)

- No cart/checkout backend, no auth, no CMS. Product/post data is typed mocks so layouts and flows are real and a backend can be wired later without refactor.
- No payments integration.

## Technical notes

- Add deps: `framer-motion`.
- Tailwind v4: tokens in `src/styles.css` `@theme`; section-level palette swaps via data attributes + CSS variables, not utility overrides.
- All routes are public (no auth middleware); safe to use loaders if needed, though most data is static mocks imported directly.
- View-transition-like card→detail uses Framer Motion `layoutId` (works without the View Transitions API and degrades cleanly).
- Frame-by-frame roast: bean images generated as a numbered sequence in `src/assets/roast/`, imported via `import.meta.glob` eagerly so Vite fingerprints them.

## Build order

1. Design tokens, fonts, base layout (`__root.tsx`, Header, Footer, MobileMenu).
2. Mock data (`products.ts`, `posts.ts`, `roasteries.ts`).
3. Generate hero + section imagery in batches (parallel `imagegen` calls).
4. Home route (hero → roast journey → coffee finder → teaser → community preview).
5. Kaffee (Aroma Wheel + filters + cards + detail overlay).
6. Heimröster (reveal → frame scroll → first-crack → slider → hotspots → mini-demo → FAQ).
7. Community, Röstereien, Über uns, Shop.
8. Polish pass: reduced-motion, mobile simplification, meta tags, accessibility sweep, slop-sweep.
