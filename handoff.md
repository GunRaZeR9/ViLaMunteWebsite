# ViiLa Munte — Project Handoff & Context
**Updated:** 2026-05-20 | **Live site:** [viilamunte.ro](https://viilamunte.ro)

---

## Mission
Marketing + booking website for **ViiLa Munte**, an exclusive mountain cabin near Toplița (Munții Călimani, Harghita county, Romania). The cabin sleeps **20 guests** and is rented as a whole unit — ideal for teambuilding events, corporate retreats, and private gatherings. Amenities include billiards, sauna, hot tub (ciubăr), and Starlink internet.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Angular 21 (standalone components, signal-ready) |
| Build / monorepo | Nx 22.7.1 + `@angular/build` |
| Styling | SCSS — custom design system (no Tailwind). Palette: `$stone-*` variables, warm earthy tones |
| Typography | **Playfair Display** (headings) + **Inter** (body) — loaded non-blocking |
| i18n | `@ngx-translate` — Romanian (default) + English; `I18nService` + `TransferState` cache |
| SSR | `@angular/ssr` installed, partially wired up — **blocked on NG0401** (see below) |
| Testing | Vitest |
| Analytics | Google Tag Manager + Microsoft Clarity (via GTM) |
| SEO | `SeoService` — per-page title, description, canonical, OG tags, JSON-LD `LodgingBusiness` |
| Images | Sharp (`scripts/convert-webp.mjs`) — WebP conversion + srcset variants |
| Calendar | `angular-calendar` + `date-fns` — iCal feed via `ical-proxy.php` (PHP on server) |

---

## Architecture

```
src/
├── app/
│   ├── components/          # Shared UI
│   │   ├── header/          # Nav + language toggle (ro ↔ en)
│   │   ├── footer/
│   │   ├── hero/            # Reusable hero banner (@Input imageAlt, title, subtitle)
│   │   ├── reviews/         # Google Reviews async component
│   │   ├── availability-calendar/
│   │   ├── call-now-fab/    # Floating action button
│   │   └── cookie-banner/
│   ├── pages/               # Lazy-loaded route components
│   │   ├── home/            # Eager (entry point)
│   │   ├── amenities/       # Rooms, facilities, stacked-card gallery + lightbox
│   │   ├── teambuilding/    # Events page, stacked-card gallery + lightbox
│   │   ├── our-story/       # Access & local attractions
│   │   ├── book-now/        # Booking form + lazy Google Maps iframe
│   │   ├── rules/
│   │   ├── terms/
│   │   ├── privacy-policy/
│   │   └── cookie-policy/
│   ├── services/
│   │   ├── i18n.service.ts  # Language switching + localStorage persistence
│   │   ├── seo.service.ts   # Meta / canonical / OG updater
│   │   └── ical.service.ts  # Fetches availability from PHP iCal proxy
│   ├── directives/
│   │   └── fade-in.directive.ts  # IntersectionObserver scroll-reveal
│   ├── translations.tokens.ts    # TransferState key for SSR translation cache
│   ├── app.config.ts             # Browser app config (BrowserTranslateLoader)
│   ├── app.config.server.ts      # Server app config (InlineTranslateLoader + TransferState)
│   └── app.routes.ts             # All 8 non-home routes use loadComponent() (lazy)
├── assets/
│   ├── i18n/                # ro.json, en.json
│   ├── images/              # WebP assets (cabana/, drumul/, homepage/, rezervare/, teambuilding/)
│   └── data/
└── styles/                  # Global SCSS partials
```

**Key patterns:**
- All components are **standalone** (no NgModules)
- Non-home routes are **lazy-loaded** (separate JS chunks)
- `TransferState` prevents double-fetching translations on SSR → CSR hydration
- Google Maps iframe uses a **click-to-load facade** (no Google scripts on page load)
- Stacked-card gallery + lightbox is a reusable blueprint used in both `amenities` and `teambuilding`

---

## Pages & Routes

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, stats, reviews, CTAs |
| `/amenities` | Rooms, facilities, photo gallery |
| `/teambuilding` | Corporate events offering + gallery |
| `/our-story` | Access directions & local attractions |
| `/book-now` | Contact form + map + availability |
| `/rules` | House rules |
| `/terms` | Terms of service |
| `/privacy-policy` | GDPR privacy policy |
| `/cookie-policy` | Cookie policy |

---

## Website Theme / Design Language

- **Aesthetic:** Luxury rustic mountain cabin — warm, natural, premium feel
- **Color palette:** Stone/earthy tones (`$stone-600` for muted text, warm amber accents)
- **Typography:** Playfair Display for headings (editorial/premium), Inter for body (clean/readable)
- **Motion:** Subtle `FadeInDirective` scroll-reveal on sections
- **Language:** Romanian-first (`ro` default), English toggle in header
- **Voice:** Inviting, exclusive, nature-focused — targets corporate HR / event planners

---

## Current State & Open Work

### ✅ Done (Lighthouse optimization — Batches 1–3)
- SEO: canonical URLs, OG tags, JSON-LD schema, non-blocking fonts, preload hints
- Accessibility: form labels, ARIA roles/labels, contrast fixes, 44px touch targets, `.sr-only`
- Performance: lazy routes, Google Maps facade, WebP srcset script

### 🚧 Blocked — SSR Prerendering (Batch 4)
`@angular/ssr` is installed and source files exist (`src/main.server.ts`, `app.config.server.ts`, `app.routes.server.ts`) but the build fails with **NG0401** during route extraction when prerender is enabled in `project.json`. The `server`/`outputMode`/`prerender` keys are currently **commented out** to keep the build passing.

**Options to fix:**
- **Option A:** `npx ng add @angular/ssr` — let the schematic regenerate bootstrap files
- **Option B:** Change `main.server.ts` export to `export default bootstrapApplication(App, config)` (no wrapper function)
- **Option C/D:** Align all `@angular/*` + `@angular/ssr` versions to the same minor

---

## Key Commands

```bash
npm start           # nx serve — dev server at localhost:4200
npm run build       # production build → dist/vilamunte/browser/
npm test            # Vitest unit tests
npm run convert-images  # WebP re-encode + srcset generation (Sharp)
```

---

## Key Files Quick Reference

| File | Purpose |
|------|---------|
| `src/index.html` | HTML shell, preload hints, GTM, JSON-LD |
| `src/app/app.routes.ts` | All routes (lazy) |
| `src/app/services/seo.service.ts` | Per-page SEO metadata |
| `src/app/services/i18n.service.ts` | Language switching |
| `src/app/components/hero/` | Shared hero banner |
| `public/.htaccess` | Apache rewrite rules (SPA fallback) |
| `public/sitemap.xml` | Main sitemap |
| `ical-proxy.php` | Server-side iCal proxy (PHP) |
| `scripts/convert-webp.mjs` | Image optimization script |
| `project.json` | Nx build config (SSR options disabled) |
