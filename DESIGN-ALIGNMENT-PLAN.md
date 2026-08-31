# Design & UX Alignment Plan — static pages ↔ homepage

**Goal:** make the agent-built SEO/content pages (`/web-developer-calgary/`, `/resources/website-brief-calgary/`, `/case-studies/juniper-hotel/`, tombstones) feel like rooms of the same building as the homepage — visually and experientially — without touching the SEO substance (URLs, copy, headings, schema, canonicals, noindex decisions).

---

## Where the two systems stand

**Homepage (the reference):**
- Strict monochrome. Black landing with glass tokens (`--glass-*` in `src/index.css`); About/Contact/Work read as **black text on white**. No color accent anywhere.
- Type: Dream Orphans Bd uppercase display at ~0.88–0.94 line-height; `ui-monospace` letterspaced micro-labels (eyebrows, tags, buttons); system-ui body.
- Shape: pill (999px) nav/tags/buttons; hairline borders; **flat square-edged imagery**; hovers invert to solid black⇄white.
- Motion: `work-rise` entrances (560ms `cubic-bezier(0.22,1,0.36,1)`, staggered), 320ms fades, `prefers-reduced-motion` respected.
- Flow: 1D scroll axis; every path funnels to the contact **form** ("Get a scoped quote", posts to `/api/contact`).

**Static pages (`public/seo-pages.css`, 1007 lines):**
- Dark editorial/brutalist — close cousin, not the same family. Already shares: Dream Orphans display, uppercase headings, hairline borders, mono micro-labels, pill CTAs.
- Diverges on: **acid-lime `#d8ff45` accent everywhere** (buttons, eyebrows, numbers, hovers, focus rings, giant contact type, tinted gradients incl. a body-wide radial glow); warm off-white ink `#f7f7f2` on `#050505` vs. the homepage's pure `#fff`/`#000`; conventional sticky header with logo + link row vs. the floating glass pill; square-cornered form inputs vs. the contact pane's 12px-radius fields; heading scale up to 8.8rem vs. the homepage's ~6.75rem cap; **zero motion**; `mailto:` pills as the only conversion path (no form).

## The organizing idea

The homepage's signature move is **black → white**: a dark, cinematic landing that floods white when you reach content. Every static page should re-enact that in miniature:

> **Dark monochrome hero band (star mark, glass-pill nav, display headline) → white content body (black text, hairline rules, mono eyebrows) → black-pill CTA into the same contact experience.**

This resolves the "which theme?" question without picking a side: the dark surface is for arrival, the white surface is for reading — exactly as the homepage does it. It also means the case studies and brief builder inherit the Work-overlay look (`.work-*` styles in `src/components/logoStyles.css`), which is already the site's proven "content on white" language.

*Cheaper fallback if you'd rather not re-theme the page bodies:* keep the pages dark and do only Phases 1, 3, 4 (kill the lime, unify tokens, swap the nav, fix the CTA flow). ~60% of the perceived alignment for ~30% of the work. The phases are ordered so this is a clean stopping point.

---

## Phase 1 — Shared design tokens (foundation)

1. Create `public/tokens.css` as the single source of truth: `--ink` scales for dark-on-light and light-on-dark, `--glass-*`, radii (999 pill / 12 field / 0 imagery), type stacks (display / mono / body), the type scale (cap display at the homepage's `clamp(44px, 8vw, 108px)` — the current 8.8rem h1 shouts louder than the homepage ever does), and the motion curve + durations.
2. Load it from both `src/index.css` (replacing the duplicated `:root` block) and the static pages (`<link>` before `seo-pages.css`).
3. In `seo-pages.css`: delete `--accent`/`--accent-ink` and the lime radial/gradient washes; remap `--bg → #000`, `--ink → #fff` (drop the warm `#f7f7f2` cast); express everything through the shared tokens.
4. **Accent replacement rule** (the lime does real work — each use needs a monochrome successor):
   - Primary buttons: lime fill → solid `#000` on white surfaces / solid `#fff` on dark, mono uppercase label — i.e. `.work-cta` / `.contact-submit` verbatim.
   - Eyebrows & `01`–`06` numbers: lime → `ui-monospace` at 55% ink, letterspaced (the `.work-eyebrow` treatment).
   - Link/FAQ hovers, focus rings: lime → invert or underline + high-contrast outline, matching `.work-link:hover` and `.contact-field:focus`.
   - Giant lime contact type: keep the scale, set it in plain ink.

## Phase 2 — White content bodies (the re-theme)

Restyle page bodies to the Work-overlay language; copy and DOM order stay untouched.

1. **`/web-developer-calgary/`** — dark hero (headline, trust strip, star mark) then white from the services grid down. Service/process cards become hairline-bordered flat cells on white (they're already table-like — mostly a palette swap). Featured-work images keep the flat square-edge treatment; drop the `saturate(.82)` filter or verify it reads well on white.
2. **`/resources/website-brief-calgary/`** — white body makes the currently-inverted `.brief-output` panel native. Restyle the form fields to `.contact-field` (12px radius, `rgba(0,0,0,0.035)` fill, focus → white + dark border); checkboxes lose the lime check for black. Keep `brief-builder.js` and the print stylesheet as-is.
3. **`/case-studies/juniper-hotel/`** — closest existing kin to the Work overlay; align gallery/figure treatment with `.work-shot` (flat, square, `#f2f2f2` placeholder ground). Consider a horizontal scroll-snap strip for the gallery to echo the overlay exactly.
4. **Tombstones** (`/case-studies/uptown-workroom/`, `/uptown-workroom/`, `/service-areas/calgary-region/`) — minimal monochrome card; define or replace the currently-undefined `button-link` class. Keep `noindex` and canonicals exactly as they are.
5. **Motion** — add `work-rise` entrance staggers to heroes/cards and 180ms invert transitions on interactive elements, all inside `@media (prefers-reduced-motion: no-preference)`. CSS-only; these pages should stay JS-free.

## Phase 3 — One nav, one shell

1. Replace the sticky logo-and-links header with the **floating glass pill**, port of `.site-nav` (dark glass over the hero, inverting via the `veloste-light` treatment once the white body scrolls under it — a tiny IntersectionObserver or `scroll-timeline` can toggle the class; static pages have no scroll driver).
2. Pill contents on static pages: star mark → `/`, About → `/#about`, Work → `/#work`, Contact → `/#contact` (deep links from Phase 4), plus the page's own anchor links where they exist today. Mobile behavior mirrors the homepage's compact pill.
3. Rebuild the footer monochrome (same four links it has now — they're good) and use it as the shared closing block on every static page.
4. These pages are hand-built HTML with duplicated shells — keep that, but converge on one canonical header/footer snippet documented at the top of `seo-pages.css` so future pages copy the right one.

## Phase 4 — Experiential flow (the UX half)

1. **Deep links into the SPA:** in `App.tsx`, read `location.hash` on load — `#contact` → `setProgress(1)`, `#about` → `setProgress(-1)`, `#work` → open Work overlay (`veloste:openWork`). This is the keystone: today the static pages can't hand a visitor to the site's actual conversion surface, which is why every CTA is a `mailto:`.
2. **CTA unification:** primary CTAs become black/white pills labeled with the homepage's language ("Start a conversation" / "Get a scoped quote") linking to `/#contact`. Keep `mailto:` + `tel:` as secondary inline links (they matter for local SEO and for users who prefer them) — demoted from hero treatment to the contact-meta style.
   - *Optional upgrade:* embed the real form on `/web-developer-calgary/` (a ~40-line vanilla-JS port of `ContactPane`'s POST to `/api/contact`), so the highest-intent SEO page converts in place. Worth it; do it after the deep link ships.
3. **Round trips:** every static page already links home via brand + footer — keep. Add a "← Back to case studies" style link on case-study pages that opens `/#work`, so the overlay ⇄ case-study loop closes in both directions.
4. **Homepage-side discoverability:** the About pane's `about-resource-links` block is currently the only in-app doorway to the SEO pages. Restyle it as `.work-link` pills, and add a matching quiet link row to the Contact pane meta ("Prefer to scope it yourself? Try the website brief builder").

## Phase 5 — Cleanup & verification

1. Delete orphaned `public/uptown-workroom/src/` + unused assets (old multicolor paper-style site, no longer referenced — confirm nothing external hotlinks the images first).
2. Convert `/service-areas/calgary-region/`'s meta-refresh into a real 301 in `vercel.json` (faster, cleaner for crawlers); the tombstone file can then go.
3. Check `og-calgary-v2.png` — if it carries the lime palette, re-export monochrome to match the new pages.
4. QA sweep: axe/contrast on the new white surfaces (the 55%-ink mono labels are near the AA floor — verify), `prefers-reduced-motion`, mobile widths (nav pill vs. long page titles), print stylesheet on the brief builder, Lighthouse on `/web-developer-calgary/`.
5. SEO regression check: `scripts/seo-audit.mjs` passes; titles/descriptions/schema/canonicals byte-identical; sitemap unchanged; GSC URL inspection on the four indexed pages after deploy.

## Guardrails

- **No SEO substance changes:** URLs, copy, heading text/hierarchy, JSON-LD, canonicals, hreflang, robots directives all stay byte-identical through Phases 1–3.
- Static pages stay static — no React, no build step, no new JS beyond the nav-invert observer and the optional contact form.
- `backdrop-filter` only on the nav pill (one small element), per PERF-PLAN.md findings.
- Ship phases as separate commits so any visual regression bisects cleanly.

## Order & effort

| Phase | Effort | Ships alone? |
|---|---|---|
| 1 — Tokens & de-lime | ~half day | Yes — biggest visual win per hour |
| 2 — White bodies | ~1–1.5 days | Yes, page-by-page |
| 3 — Pill nav & shell | ~half day | Yes |
| 4 — Deep links & CTAs | ~half day (+form: +half day) | Deep link first; everything else hangs off it |
| 5 — Cleanup & QA | ~half day | Last |
