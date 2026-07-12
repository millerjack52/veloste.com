# PERF-PLAN.md — Implementation Log

| Date | Task | Status | Notes |
|------|------|--------|-------|
| 2026-07-11 | Baseline measurement | **blocked** | rAF-based measurement requires a visible tab; Browser pane was hidden (`document.visibilityState === "hidden"`). Measure per PERF-PLAN.md protocol before/after deploying. |
| 2026-07-12 | Post-fix measurement (user, main axis) | done | While scrolling hard on a ~144 Hz display: **135 fps, p95 7 ms, 6/650+ frames over 33 ms**. Main scroll axis confirmed smooth. |
| 2026-07-11 | 1.1 Demand frameloop | done | `frameloop="demand"`; lerp invalidates until converged then snaps; input handlers invalidate via `useThree`. Settled-frame CSS flush added to SceneScrollDriver (parity throttle could skip final write). Verified statically: no time-based animations exist; drei Environment `frames={1}` bakes imperatively in an effect (demand-safe). |
| 2026-07-11 | 1.2 Remove halo clone | done | `LogoGlowHalo.tsx` deleted; glow now carried by existing emissive path (up to 12.5×) + Bloom. Visual check at peak glow pending (halo contributed ≤0.1-opacity additive silhouette at 1.045× scale). |
| 2026-07-11 | 1.3 Idle material churn | done | Glow epsilon check hoisted above the g≤0 restore branch; restore now runs once per transition. |
| 2026-07-11 | 2.1 MSAA 4→2 | done | Edge-quality screenshot comparison pending. |
| 2026-07-11 | 2.2 Consolidate lights | done | 5 punctual → 3 (key + rim directionals + under point light); two weak back directionals folded into baked Lightformer strips (11→15, 18→20, 12→13). 13 useFrame subscriptions → 1. Discovery: Lightformer per-frame boosts were visually inert (env map bakes once at `frames={1}`), so dropping them changes nothing. Lighting-mood screenshot comparison pending. |
| 2026-07-11 | 2.3 TipCircles alloc | done | `getCurrentViewport` now only on canvas resize. |
| 2026-07-11 | 3.1 Backdrop-filter | **partial** | Nav pill + scroll indicators left as-is: user-measured main-axis scroll is smooth (135 fps, p95 7 ms on ~144 Hz), so the plan's gate says don't touch them. |
| 2026-07-12 | 3.1a Work overlay blur | done | User reported case-studies pane "very choppy and slow" while main axis measured clean. Cause: `.work-scroll` scrolls *inside* the backdrop-filtered `.work-overlay` → full-viewport blur re-raster per scroll frame, compounded by the non-passive window wheel listener waiting on the main thread. Blur removed (was behind 94%-opaque white; bg bumped to 0.96). |
| 2026-07-11 | 3.2 Scope CSS vars | done | Per-frame `--veloste-*` vars now written to `.logo-wrap` (defaults moved from `:root`); `veloste-light`/`veloste-panel-open` class toggles stay on `<html>` (threshold-only, consumed as `html.veloste-*`). |
| 2026-07-11 | 3.3 Fonts + hygiene | done | OTF→woff2 (44 KB→~25 KB each) in `public/fonts/`, preloaded in index.html along with `/models/vstar.glb`; dead `App.css` deleted; unused `n8ao` dep removed (its `.d.ts` stub kept — `@react-three/postprocessing`'s types reference the global). |

## Verified

- `npm run lint` and `npm run build` pass.
- App boots: canvas + WebGL context live, scoped vars resolve on `.logo-wrap`, woff2 fonts load via preload (network shows early fetch + 304 on CSS request), no preload-mismatch warnings.

## Pending (requires visible tab / deployed site)

1. Idle + scroll FPS per the PERF-PLAN.md measurement protocol (before/after comparison).
2. Full scroll traversal: smooth lerp, About/Contact pane open/close + interactivity events, tip-circle flood, light-mode flip.
3. Peak-glow screenshot vs pre-change (halo removal) and logo edge quality (MSAA 2×).
4. Lighting mood at p = 0 / 0.5 / 1 (light consolidation).
5. Decision on deferred Task 3.1 (backdrop-filter) based on scroll trace.
