# Handoff — viilamunte.ro Performance & SEO Optimization
**Date:** 2026-05-15  
**Session:** Batches 1, 2 & 3 complete. Batch 4 (SSR) PARTIALLY DONE — blocked, needs investigation.

---

## Goal
Raise Lighthouse scores from baseline (mobile perf < 65, a11y < 85) to ≥ 90 performance and ≥ 90 accessibility on both mobile and desktop.

## Baseline Scores (measured start of session — lighthouse-reports/SUMMARY.json)

| Page | Device | Perf | A11y | BP | SEO | LCP | FCP | TBT | CLS |
|------|--------|------|------|----|-----|-----|-----|-----|-----|
| home | mobile | **65** ❌ | **72** ❌ | 100 | 92 | **10.9s** ❌ | 2.0s | 90ms | **0.177** ❌ |
| home | desktop | 95 ✅ | 84 ❌ | 100 | 92 | 1.4s | 0.5s | 0ms | 0.04 |
| book-now | mobile | 81 | **62** ❌ | 100 | 92 | 4.5s | 2.0s | 70ms | 0.069 |
| book-now | desktop | 98 ✅ | **71** ❌ | 100 | 92 | 1.0s | 0.7s | 0ms | 0.038 |
| amenities | mobile | 80 | 86 ✅ | 100 | 92 | 4.5s | 2.1s | 120ms | 0.063 |
| amenities | desktop | 93 ✅ | 92 ✅ | 100 | 92 | 1.7s | 0.6s | 0ms | 0.036 |
| teambuilding | mobile | 96 ✅ | 86 ✅ | 100 | 92 | 2.6s | 1.4s | 80ms | 0.053 |
| teambuilding | desktop | 100 ✅ | 92 ✅ | 100 | 92 | 0.6s | 0.5s | 0ms | 0.036 |
| our-story | mobile | 77 | **71** ❌ | 100 | 92 | 4.3s | 1.4s | 70ms | **0.182** ❌ |
| our-story | desktop | 94 ✅ | 82 ❌ | 100 | 92 | 1.6s | 0.7s | 0ms | 0.035 |
| rules | mobile | 78 | **73** ❌ | 96 | 92 | 2.3s | 2.0s | 90ms | **0.387** ❌ |
| rules | desktop | 91 ✅ | 83 ❌ | 100 | 92 | 0.3s | 0.3s | 0ms | **0.197** ❌ |

---

## Progress

### ✅ Batch 1 — SEO & Head (DONE)
Files changed: `src/index.html`, `src/app/services/seo.service.ts`, `src/app/pages/rules/rules.component.ts`

- Fixed wrong canonical URL (`gunrazer9.github.io` → `https://viilamunte.ro/`)
- Added `og:image`, `og:image:width/height`, `og:url` meta tags
- Added LCP hero preload with `fetchpriority="high"`
- Google Fonts made non-blocking (`rel="preload"` + `onload` swap + `<noscript>`)
- Font weights trimmed (removed Inter 300/500, Playfair Display 500/600 — unused)
- Google Analytics moved to end of `<body>` with `defer`
- JSON-LD `LodgingBusiness` schema added to `<head>`
- `SeoService` now injects `DOCUMENT`, updates `<link rel="canonical">` + `og:url` on navigation
- `canonical` field added to all 6 page entries (including new `rules` entry)
- `RulesComponent` now calls `seo.set('rules')` in `ngOnInit`

### ✅ Batch 2 — Accessibility (DONE)
Files changed: `book-now.component.html`, `hero.component.ts/.html`, `reviews.component.html`, `home.component.html`, `amenities.component.html`, `teambuilding.component.html`, `our-story.component.html`, `amenities.component.scss`, `teambuilding.component.scss`, `styles.scss`

- All 8 booking form fields now have paired `for`/`id` attributes (biggest a11y fix)
- `HeroComponent` gets `@Input() imageAlt: string = 'ViiLa Munte'`; all 4 callers pass descriptive Romanian alt text
- Both lightbox dialogs get `[attr.aria-label]="lightboxLabel"` on `role="dialog"` element
- Star ratings: container gets `role="img"` + `aria-label="N stele din 5"`; individual stars get `aria-hidden="true"`
- All decorative emoji spans get `aria-hidden="true"` (home stats, booking rules, outdoor list, tech section, feature cards)
- Emoji-only contact headings (📞, ✉️) get `aria-hidden` wrapper + `.sr-only` fallback text
- `$text-muted` bumped from `$stone-500` → `$stone-600` (contrast fix)
- `.sr-only` utility class added to `src/styles.scss`
- Lightbox close buttons: 2.25rem → 2.75rem (36px → 44px touch target)

### ✅ Batch 3 — Performance: Bundle + Images (DONE)
Build passes with zero errors.

1. **Lazy routes** — `src/app/app.routes.ts`: All 8 non-home routes converted to `loadComponent()`. Each page is now a separate JS chunk, reducing initial bundle.
2. **Google Maps facade** — `book-now.component.html/.ts/.scss`: The Google Maps iframe only loads on user click. `mapLoaded = false` in component. Prevents Google loading on every page visit.
3. **angular-calendar kept** — user confirmed it will be used in the future (calendar placeholder already in place).
4. **Image script extended** — `scripts/convert-webp.mjs`: Re-encodes WebP > 500 KB at quality 75 / max 1920px, generates `*-820w.webp` srcset variants, outputs before/after manifest. Run: `npm run convert-images`.

---

## 🚧 Batch 4 — SSR Prerendering (PARTIALLY DONE — BLOCKED)

### What was set up (all files compile, build passes WITHOUT prerender active):

**New files created:**
- `src/main.server.ts` — server bootstrap entry point
- `src/app/app.config.server.ts` — server app config (InlineTranslateLoader reads from JSON imports)
- `src/app/app.routes.server.ts` — explicit prerender routes (9 routes, no wildcard)

**Existing files fixed for SSR compatibility:**
- `src/app/services/i18n.service.ts` — `localStorage` guarded with `isPlatformBrowser`
- `src/app/directives/fade-in.directive.ts` — `IntersectionObserver` guarded with `isPlatformBrowser`
- `src/app/components/cookie-banner/cookie-banner.component.ts` — `localStorage` in `ngOnInit` guarded with `isPlatformBrowser`
- `src/app/app.config.ts` — `provideHttpClient(withFetch())` added for SSR-compatible HttpClient

**Packages installed:**
- `@angular/ssr@21.2.11`
- `@angular/platform-server@21.2.11`

**tsconfig.json:** `"resolveJsonModule": true` added (needed for JSON imports in server config).

### The blocker: `NG0401` during route extraction

When `"server": "src/main.server.ts"` + `"outputMode": "static"` + `"prerender": true` are added to `project.json`, the build fails with:

```
An error occurred while extracting routes.
Error: NG0401
    at Rk (chunk-VCV7A7ZD.mjs:32:73025)     ← Angular internal chunk
    at Ut (chunk-DA4IBDU6.mjs:2:11362)
    at [main.server.mjs:350 and :49]
    at async extractRoutes (routes-extractor-worker.js:60:50)
```

**Root cause identified:** `NG0401` = `RuntimeError(-401, 'Missing Platform: This may be due to using bootstrapApplication on the server without a server platform.')`. Angular's route extractor calls `platformServer([...])` then calls our `bootstrap({platformRef})` — but our bootstrap `() => bootstrapApplication(App, config)` ignores the `platformRef` argument. In Angular 21, `bootstrapApplication` detects `ngServerMode = true` but can't find the platform via `getPlatform()`, even though `platformServer()` was called first. Likely a module instance isolation issue in the prerender worker.

### What was tried:
1. Removed `**` catch-all from server routes — no change
2. Removed `withRoutes(serverRoutes)` from `provideServerRendering()` — no change
3. Set `"prerender": { "discoverRoutes": false }` — no change (route extraction still runs)
4. Fixed `localStorage` in `CookieBannerComponent` (which WAS a real bug, now fixed)
5. Tried various `app.config.server.ts` configurations

### Current `project.json` state:
The `server`/`outputMode`/`prerender` options are NOT in `project.json` (removed to restore working build). The SSR source files are still in place.

### To re-enable SSR when ready to debug:

Add to `project.json` build `options`:
```json
"server": "src/main.server.ts",
"outputMode": "static",
"prerender": true,
```

Then investigate the `NG0401` issue.

### Suggested next steps to fix SSR:

**Option A — Run `ng add @angular/ssr` fresh:**
```bash
npx ng add @angular/ssr
```
The official schematic generates `main.server.ts` and `app.config.server.ts` with the exact pattern for the installed Angular version. This might use a slightly different bootstrap pattern that works with the prerender worker.

**Option B — Check `main.server.ts` bootstrap signature:**
The route extractor calls `bootstrap({ platformRef })`. In Angular 21, the bootstrap function might need to accept and use `platformRef` differently. Try:
```typescript
// src/main.server.ts
export default bootstrapApplication(App, config);  // NOTE: no wrapping function
```
vs the current:
```typescript
const bootstrap = () => bootstrapApplication(App, config);
export default bootstrap;
```

**Option C — Check Angular version compatibility:**
- `@angular/build@21.2.9` vs `@angular/ssr@21.2.11` — minor version mismatch. Try `@angular/ssr@21.2.9`.

**Option D — Upgrade all Angular packages to same version:**
```bash
npx ng update @angular/core @angular/cli @angular/ssr --allow-dirty --legacy-peer-deps
```

---

## Key File Locations

- `src/index.html` — main HTML shell ✅ updated
- `src/app/services/seo.service.ts` — meta/canonical service ✅ updated
- `src/app/components/hero/hero.component.ts/.html` — shared hero ✅ updated
- `src/app/pages/book-now/book-now.component.html/.ts/.scss` — Maps facade ✅ done
- `src/app/app.routes.ts` — lazy routes ✅ done
- `scripts/convert-webp.mjs` — image conversion script ✅ extended
- `src/app/app.config.ts` — app config ✅ withFetch added
- `src/main.server.ts` — server bootstrap (SSR, compile-only ✅)
- `src/app/app.config.server.ts` — server config (SSR, compile-only ✅)
- `src/app/app.routes.server.ts` — server routes (SSR, compile-only ✅)
- `project.json` — build config (SSR options removed, needs re-add when fixed)
- `src/assets/images/` — all image assets (Sharp `^0.34.5` available in devDependencies)
- `package.json` — `@angular/ssr` and `@angular/platform-server` installed

## Resume Prompt
"I have a handoff.md. Batches 1-3 are done and build passes. Batch 4 (SSR prerendering) is blocked by NG0401 during route extraction. The SSR files exist (src/main.server.ts, app.config.server.ts, app.routes.server.ts) but prerender options are disabled in project.json. Investigate Option A (ng add @angular/ssr), B (export default bootstrapApplication without wrapper function), or C/D (version alignment) from the handoff to fix the prerender step."
