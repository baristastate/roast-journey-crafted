# Port-Plan: React App → Shopify Liquid Theme

**Ziel:** `barista-state-theme.zip`, das du in Shopify Admin → Themes → "Add theme → Upload zip" hochladen kannst. Alle visuellen Effekte, Animationen, Inhalte aus der React-App werden in Liquid + CSS + Vanilla JS reproduziert.

---

## Erwartungs-Reality-Check (wichtig vorab)

| Feature der React-App | Im Liquid-Theme |
|---|---|
| Framer-Motion (`useScroll`, `useTransform`, shared-layout) | Ersetzt durch **Intersection Observer + CSS `animation-timeline: view()` + CSS-Transitions**. Visuell gleichwertig. |
| Shared-Layout Modal (Produkt → Overlay expansion) | **Vereinfacht zu FLIP-Animation** (vanilla JS) — Klick-Bild fliegt zur Overlay-Position. ~90% des Effekts. |
| RoastSequence (260svh sticky scroll, 22 OKLCH-Beans) | **Sticky + Scroll-Timeline CSS-Animationen**, 1:1 möglich da modernes CSS dies nativ kann. |
| Roast-Slider (Pointer-Drag, Spring-Physik, live OKLCH-Interpolation) | Vanilla JS Pointer-Events + `requestAnimationFrame`. **1:1 reproduzierbar**, ~250 Zeilen JS. |
| Aroma-Wheel (SVG, klickbare Segmente, rotierender Außenring) | **Inline SVG in Liquid + Vanilla JS**. 1:1. |
| Custom Cursor (Dot + Ring mit Lerp) | **1:1** via Vanilla JS. |
| Theme-Toggle (Light/Dark + System) | **1:1** via inline `<script>` in `theme.liquid` + localStorage. |
| Coffee-Finder Quiz (Multi-Step, Produkt-Scoring) | **1:1** Vanilla JS, Produkte aus Shopify-Liquid-Loop. |
| TanStack Router | **Shopify URL-Struktur**: `/` Home, `/collections/kaffee`, `/collections/heimroester`, `/pages/heimroester`, `/pages/community`, `/pages/roestereien`, `/pages/ueber-uns`. Redirect `/kaffee → /shop` via `redirects.csv`. |
| Daten aus `data.ts` (PRODUCTS, ROASTERIES, POSTS) | **Shopify Products + Metafields + Metaobjects + Blog Articles** (siehe Step 4). |

**Was du nach dem Upload manuell tun musst** (kann ich nicht im ZIP automatisieren):
1. **8 Demo-Produkte** + **2 Heimröster-Produkte** anlegen (oder per CSV-Import — ich liefere `products.csv`).
2. **4 Röstereien als Metaobjects** anlegen (ich liefere `metaobject-definitions.json` als Anleitung).
3. **Blog "Community"** mit 8 Beispiel-Artikeln.
4. **Metafield-Definitionen** für Produkte (roast, brews, gear, aromas, notes, bio) — ich liefere die genaue Anleitung in `SETUP.md`.

---

## Struktur des Theme-ZIP

```text
barista-state-theme/
├── layout/
│   └── theme.liquid              # HTML-Shell, Fonts, Theme-Toggle-Script, Header/Footer include
├── templates/
│   ├── index.json                # Home — JSON-Template mit allen Home-Sections
│   ├── product.json              # Produkt-Detail (ersetzt React-Overlay als eigene Seite)
│   ├── collection.kaffee.json    # Shop-Page (Kaffee)
│   ├── collection.heimroester.json
│   ├── page.heimroester.json
│   ├── page.community.json
│   ├── page.roestereien.json
│   ├── page.ueber-uns.json
│   ├── blog.json                 # Community-Feed (alternative)
│   ├── article.json
│   ├── cart.json
│   ├── 404.json
│   └── search.json
├── sections/
│   ├── header.liquid             # Sticky Header mit Dropdown + Theme-Toggle
│   ├── footer.liquid
│   ├── home-hero.liquid          # HomeHero mit Parallax + Word-Reveal
│   ├── roast-journey.liquid      # 600svh sticky scrollytelling
│   ├── manifesto-strip.liquid
│   ├── coffee-finder.liquid      # Quiz
│   ├── heimroester-teaser.liquid # mit Hotspots
│   ├── community-preview.liquid  # Bento-Grid
│   ├── premium-hero.liquid       # Wiederverwendbar (Shop, Community, etc.)
│   ├── shop-filters.liquid       # Tabs + Filter-Chips + Aroma-Wheel
│   ├── shop-products.liquid      # Produkt-Grid mit FLIP zur Detail-Page
│   ├── heimroester-sequence.liquid # 260svh scroll
│   ├── heimroester-firstcrack.liquid
│   ├── heimroester-slider.liquid   # Roast-Slider
│   ├── heimroester-hotspots.liquid
│   ├── heimroester-minidemo.liquid
│   ├── heimroester-faq.liquid
│   ├── heimroester-cta.liquid
│   ├── roestereien-promise.liquid
│   ├── roestereien-scrolly.liquid
│   ├── roestereien-partners.liquid
│   ├── roestereien-contact.liquid  # Contact-Form via Shopify `{% form 'contact' %}`
│   ├── community-feed.liquid       # Masonry, Like/Save (LocalStorage)
│   ├── ueber-uns-scrolly.liquid
│   ├── ueber-uns-story.liquid
│   ├── ueber-uns-values.liquid
│   └── ueber-uns-cta.liquid
├── snippets/
│   ├── product-card.liquid
│   ├── feed-card.liquid
│   ├── roastery-card.liquid
│   ├── badge.liquid
│   ├── reveal.liquid              # Scroll-reveal wrapper
│   ├── eyebrow.liquid
│   ├── icon-*.liquid              # Heart, Save, Search, Cart, Chevron, etc.
│   └── meta-tags.liquid           # SEO/OG aus head()
├── assets/
│   ├── theme.css                  # Komplettes Design-Token-System + Utility-Klassen aus styles.css
│   ├── theme.js                   # Custom Cursor, CupProgress, Theme-Toggle, Header-Scroll
│   ├── home.js                    # HomeHero, RoastJourney, ManifestoStrip, CoffeeFinder
│   ├── shop.js                    # Filter-Logic, Aroma-Wheel, FLIP-Overlay
│   ├── heimroester.js             # Sequence, Slider, MiniDemo, FAQ
│   ├── scrolly.js                 # Wiederverwendbares Scrollytelling-Modul
│   ├── reveal.js                  # Intersection-Observer Reveal
│   ├── mobile-menu.js
│   ├── hero-home.jpg              # Alle 16 Bilder aus src/assets/
│   ├── journey-raw.jpg
│   ├── … (alle Bilder)
│   ├── product-1.jpg
│   ├── feed-1.jpg … feed-6.jpg
│   └── grain.svg                  # extrahiert aus styles.css
├── config/
│   ├── settings_schema.json       # Theme-Editor-Einstellungen (Farben, Fonts, Toggles)
│   └── settings_data.json
├── locales/
│   ├── de.default.json            # Alle UI-Strings (Quiz-Fragen, FAQ, Buttons, etc.)
│   └── en.json                    # Englische Fallbacks
├── redirects.csv                  # /kaffee → /collections/kaffee
├── products.csv                   # 8 Demo-Produkte für Bulk-Import
├── SETUP.md                       # Schritt-für-Schritt für Metafields, Metaobjects, Blog
└── README.md
```

---

## Implementierungs-Schritte

Da das Volumen enorm ist (~30 Sections, ~6000 Zeilen Liquid/CSS/JS), schlage ich vor das in **5 Build-Phasen** zu liefern. Nach jeder Phase kannst du Preview machen und Feedback geben.

### Phase 1 — Theme-Skelett & Design-System (Foundation)
- `layout/theme.liquid` mit Fonts, Theme-Toggle-Inline-Script, Meta-Tags
- `assets/theme.css` — kompletter Token-Port aus `src/styles.css` (Palette, Typo, alle Utility-Klassen, Section-Tones, Animations, Light/Dark)
- `assets/theme.js` — Custom Cursor, CupProgress, Theme-Toggle, Header-Scroll-State, Reveal-Observer
- `sections/header.liquid` mit Dropdown-Mega-Menu + Mobile-Menu
- `sections/footer.liquid`
- `config/settings_schema.json` Basis
- Alle 16 Bilder + Fonts in `assets/`

**Output Phase 1:** Theme uploadbar, Home-Page leer, aber Chrome (Header/Footer/Theme-Toggle/Cursor/Progress) funktioniert vollständig.

### Phase 2 — Home (`/`)
- `home-hero.liquid` (Parallax + Word-Reveal + Stats + Marquee)
- `roast-journey.liquid` (600svh sticky scrollytelling, 6 chapters)
- `manifesto-strip.liquid`
- `coffee-finder.liquid` (Quiz mit JS)
- `heimroester-teaser.liquid` (mit Ping-Hotspots)
- `community-preview.liquid` (Bento-Grid)
- `templates/index.json`

### Phase 3 — Shop & Produkt-Detail
- `premium-hero.liquid` (wiederverwendbar)
- `shop-filters.liquid` (Tabs, Filter-Chips, Aroma-Wheel SVG)
- `shop-products.liquid` (Grid + FLIP-Animation zur Product-Page)
- `templates/collection.kaffee.json`, `collection.heimroester.json`
- `templates/product.json` mit Notes/Specs/Aromas/Gear-Anzeige
- `products.csv` mit 8 Demo-Produkten + Metafield-Werten
- `SETUP.md` Abschnitt "Metafields anlegen"

### Phase 4 — Heimröster, Röstereien, Über uns
- Alle 8 Heimröster-Sections (Sequence, FirstCrack, Slider, Hotspots, MiniDemo, FAQ, CTA)
- Alle 5 Röstereien-Sections (Promise, Scrolly, Partners, Contact-Form)
- Alle 5 Über-uns-Sections (Scrolly, Story, Values-Bento, CTA)
- Metaobject-Definition "Roastery"

### Phase 5 — Community + Polish + ZIP
- `community-feed.liquid` (Masonry + Like/Save via LocalStorage)
- Blog-Template oder Page-basierte Lösung
- `redirects.csv`
- `locales/de.default.json` finalisieren (alle Strings)
- `README.md` + `SETUP.md` finalisieren
- **ZIP-Erstellung** und Bereitstellung als `<presentation-artifact>` (Download in `/mnt/documents/`)

---

## Was ich JETZT brauche von dir

1. **OK für Phase 1 starten?** (Skelett + Design-System + Header/Footer/Chrome) — ohne diese Foundation kann ich keine Section bauen.
2. **Theme-Sprache: nur Deutsch** oder **auch Englisch parallel** (i18n)?
3. **Demo-Produkte:** Soll ich `products.csv` mit den 8 Beispiel-Kaffees aus `data.ts` mitliefern (damit du sie per Bulk-Import in 1 Klick hast), oder reicht leeres Theme + Anleitung?
4. **Custom Cursor:** Auf Touch-Geräten automatisch aus, auf Desktop aktiv — ist das ok, oder im Theme-Editor als Toggle?
5. **Browser-Support:** Modern only (Chrome/Safari/Firefox aktuell) — okay? CSS `animation-timeline: view()` ist in Firefox noch hinter Flag, dort fallback ohne Parallax. Acceptable trade-off?

Sobald du diese 5 Punkte bestätigst, starte ich Phase 1 sofort und liefere am Ende jeder Phase eine Vorab-Preview-ZIP, damit du iterieren kannst.
