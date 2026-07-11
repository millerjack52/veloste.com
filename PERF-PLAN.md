# Veloste.com Smoothness Plan (Agent Implementation Spec)

> **Audience:** coding agents. Each task is self-contained: context → exact change → acceptance criteria → verification.
> **Diagnosis date:** 2026-07-11. All file:line refs verified against `main` @ `d0cdcc7`.
>
> **Root cause summary:** The site is GPU/compositor-bound, not React-bound. The scroll pipeline is
> already ref-based (zero re-renders on scroll — do NOT "optimize" it into state/memo changes).
> Choppiness comes from: (1) an always-on R3F frameloop rendering a heavy scene every frame even
> when idle, (2) the full logo model cloned and drawn twice, (3) 4× MSAA + mipmap Bloom at up to
> 1.5 DPR, (4) three always-visible `backdrop-filter` blur surfaces that must re-blur the canvas
> every frame it repaints, and (5) per-frame CSS-variable writes on `document.documentElement`
> that scope style recalc to the whole tree.

---

## Ground rules for implementing agents

1. **Do not** convert refs to React state anywhere in the scroll path (`src/controls/ScrollProgress1D.tsx`, `src/context/ScrollProgressContext.tsx`, `src/components/SceneScrollDriver.tsx`). The ref architecture is intentional and correct.
2. **Do not** remove visual features (glow, bloom, glass look) — degrade cost, not appearance, unless a task explicitly says otherwise.
3. After each task: `npm run lint` and `npm run build` must pass (`tsc -b` runs in build).
4. Visual verification uses the built-in debug HUD: append `?debugScroll=1` to the URL — it shows frame times and long tasks (`src/components/ScrollDebugHud.tsx`, gated by `src/debug/scrollDebug.ts`).
5. **rAF measurement caveat:** frame-time scripts only work when the browser tab is *visible* (`document.visibilityState === "visible"`). rAF is suspended in hidden tabs.

## Measurement protocol (run before Task 1 and after each phase)

Start dev server (`vite-dev` in `.claude/launch.json`), open `http://localhost:5173`, ensure tab visible, then run in console:

```js
(async () => {
  const f = []; let last = performance.now();
  await new Promise(res => { const t0 = last;
    (function tick(t){ f.push(t-last); last=t; (t-t0>4000)?res():requestAnimationFrame(tick); })(last); });
  const s=[...f].sort((a,b)=>a-b), avg=f.reduce((a,b)=>a+b,0)/f.length;
  console.log({fps:(1000/avg)|0, p95:s[(f.length*.95)|0].toFixed(1), over33ms:f.filter(x=>x>33).length});
})()
```

Capture **idle** (no input) and **scrolling** (dispatch synthetic wheel events during measurement):

```js
setInterval(() => window.dispatchEvent(new WheelEvent('wheel', {deltaY: 40, cancelable: true})), 50)
```

Record results in `PERF-RESULTS.md` (create it) as a table: `date | task completed | idle fps/p95 | scroll fps/p95`.

---

## Phase 1 — Stop rendering when nothing changes (highest impact)

### Task 1.1 — Demand-driven frameloop

**Context:** `src/scenes/LogoScene.tsx:61-83` — `<Canvas>` has no `frameloop` prop → defaults to `"always"`. The whole pipeline (7 lights + IBL + duplicate model + 4× MSAA + Bloom) renders at max refresh even when fully idle. Every downstream cost (including CSS backdrop blur re-sampling) is multiplied by this.

**Change:**
1. Add `frameloop="demand"` to the `<Canvas>` in `LogoScene.tsx`.
2. In `ScrollProgressFrame` (`src/controls/ScrollProgress1D.tsx:17-26`): import `invalidate` from the `useFrame`/`useThree` state and call it whenever the lerp has not converged — i.e. while `Math.abs(pRef.current - pTargetRef.current) > 1e-4` (pick epsilon to match existing early-out thresholds). Pattern:
   ```tsx
   useFrame((state, dt) => {
     // existing lerp ...
     if (Math.abs(pRef.current - pTargetRef.current) > 1e-4) state.invalidate();
   });
   ```
3. In the input handlers (`ScrollProgress1D.tsx` `onWheel`/`onTouchMove`/`veloste:setProgress` handler): after mutating `pTargetRef.current`, trigger one invalidate. These handlers live outside the Canvas, so expose an invalidate hook — simplest: have `ScrollProgressFrame` (inside Canvas) register `state.invalidate` into a module-level or context ref that the input component reads. `ScrollProgressInput` (`ScrollProgress1D.tsx:41`) already shares the same context — add an `invalidateRef` to `ScrollProgressContext` (`src/context/ScrollProgressContext.tsx`).
4. Audit every other animated ref for convergence-driven invalidation: `sceneRefs.glow / lightBoost / overlayBlur` (`SceneScrollDriver.tsx:103-105`) all derive from `pRef` each frame, so invalidation driven by the scroll lerp covers them. `LogoGlowHalo` pulse/scale and `TipCircles` fades also derive from scroll-derived values — verify by scrolling through the full axis after the change and confirming no visual freezes/stuck animation. If any element animates from a source other than `pRef` (search `useFrame` in `src/components/Lights.tsx`, `LogoGlowHalo.tsx`, `TipCircles.tsx`, `VelosteLogoModel.tsx` for time-based animation e.g. `clock.elapsedTime`), that element needs its own invalidate-while-active loop or must be excluded from demand mode — report it rather than guessing.

**Acceptance criteria:**
- Idle (no input for >1s, scroll settled): GPU/canvas repaint stops. Verify: in DevTools → Rendering → "Frame Rendering Stats", FPS meter drops to 0/no frames when idle; or add a temporary `console.count` in a `useFrame` and confirm it stops firing.
- During scroll: identical visual behavior to before (smooth lerp, glow, pane fades, tip circles, halo).
- The `veloste:leftInteractive`/`rightInteractive` threshold events still fire (open About and Contact panes to confirm interactivity toggles).
- `npm run build` passes.

**Risk:** anything animated by elapsed time rather than scroll will freeze between inputs. That is the main regression class to test for.

### Task 1.2 — Eliminate the duplicate model draw (LogoGlowHalo clone)

**Context:** `src/components/LogoGlowHalo.tsx:14-36` clones the entire GLB (`scene.clone(true)`) and renders a full second copy with additive `MeshBasicMaterial` for the glow halo. Doubles draw calls + vertex work whenever glow > 0.04 (i.e. during most scroll motion).

**Change (preferred):** Drive the glow via the existing per-material emissive path in `VelosteLogoModel.tsx:103-154` (it already writes `emissive`/`emissiveIntensity` per frame) and let Bloom (`LogoScene.tsx:104-110`, luminanceThreshold 0.72) produce the halo — raise emissiveIntensity above bloom threshold at peak glow instead of drawing a second model. Then delete the clone render path in `LogoGlowHalo.tsx` (keep the component API/mount point so `LogoScene.tsx` doesn't restructure; it can return null or just the scale/pulse logic applied to the original group).

**Fallback (if visual parity unacceptable):** keep the clone but replace the cloned full geometry with a single merged low-cost proxy (e.g. one merged geometry via `BufferGeometryUtils.mergeGeometries` at mount, one material, one draw call).

**Acceptance criteria:**
- At peak glow (scroll to the position that maximizes glow), the logo still reads as "glowing" — compare before/after screenshots at the same scroll progress value (set deterministically: `window.dispatchEvent(new CustomEvent("veloste:setProgress", {detail: <value>}))` — see handler in `ScrollProgress1D.tsx:137`).
- Draw call count drops: verify via `gl.info.render.calls` (log from a `useFrame` temporarily) before vs after — expect roughly half at peak glow.
- Build + lint pass.

### Task 1.3 — Fix idle material churn in VelosteLogoModel

**Context:** `src/components/VelosteLogoModel.tsx:103-154` — when `g <= 0` (idle, no glow), the branch at lines ~113-123 rewrites `color/emissive/metalness/roughness/envMapIntensity` on **every material every frame** and never updates `lastGlowRef`, so the early-out at line 125 never engages while idle.

**Change:** Move/extend the dirty check so the `g <= 0` restore branch runs **once** per transition to idle: update `lastGlowRef.current = g` inside that branch (or hoist the `Math.abs(g - lastGlowRef.current) < 1e-4` early-out above it). Preserve exact restore semantics on the first idle frame.

**Acceptance criteria:** with a temporary counter, confirm the material-write loop executes 0 times per frame while idle at glow 0, and exactly once on the glow→0 transition. Visuals unchanged when scrolling in/out of glow. (Note: after Task 1.1 idle frames stop entirely — this task still matters for during-scroll frames at clamped positions and for robustness if demand mode is ever reverted.)

---

## Phase 2 — Cut per-frame GPU cost (do after Phase 1, re-measure between tasks)

### Task 2.1 — Reduce MSAA and cap effective resolution

**Context:** `src/scenes/LogoScene.tsx:104` — `<EffectComposer multisampling={maxDpr > 1.25 ? 4 : 0}>` → 4× MSAA on an HDR target at DPR up to 1.5, plus mipmap Bloom. Dominant fill-rate cost on desktop.

**Change:** Drop to `multisampling={maxDpr > 1.25 ? 2 : 0}`. If edge quality visibly suffers on the logo silhouette, try adding SMAA (cheap post AA from `@react-three/postprocessing`) with multisampling 0 and compare.

**Acceptance criteria:** side-by-side zoomed screenshots of the logo edge at rest (same scroll progress) — acceptable if no obvious stair-stepping at 100% zoom. Scroll-time p95 frame time improves or holds. Build passes.

### Task 2.2 — Consolidate lights

**Context:** `src/components/Lights.tsx:108-138` — ambient + hemisphere + **4 directionals + 1 point**, all evaluated per-fragment on `MeshStandardMaterial`, on top of IBL from the baked `Environment` (7 Lightformers, `frames={1}`, already cheap). Also 13 separate `useFrame` subscriptions (one per Boosted* wrapper) add fixed loop overhead.

**Change:**
1. Reduce punctual lights: target **2 directionals + ambient/hemisphere**, compensating with `envMapIntensity` and Lightformer intensities (the env map is baked once — free at runtime). Tune to match current look at scroll extremes and midpoint.
2. Replace the per-light `useFrame` boost wrappers (`BoostedDirectionalLight` ×4, `BoostedPointLight`, `BoostedLightformer` ×7) with **one** `useFrame` in `Lights` that reads `sceneRefs.lightBoost` once and writes `.intensity` on an array of refs.

**Acceptance criteria:** screenshots at scroll progress 0 / 0.5 / 1 before vs after — lighting mood preserved (exact match not required; no blown highlights or dead-black faces). `useFrame` subscription count in Lights.tsx drops from 13 to 1. Build passes.

### Task 2.3 — TipCircles per-frame allocation

**Context:** `src/components/TipCircles.tsx:47` — `viewport.getCurrentViewport(camera, ...)` allocates per frame while scrolling, ×2 instances.

**Change:** viewport only changes on resize/camera change — compute it in the `useFrame` only when `size`/camera changed (cache by `size.width/height`), or hoist to a `useMemo` keyed on `size` via `useThree`.

**Acceptance criteria:** tip circles still track position correctly after window resize. No `getCurrentViewport` call in steady-state frames (temporary counter).

---

## Phase 3 — Compositor / CSS costs

### Task 3.1 — Tame backdrop-filter surfaces

**Context:** three always-visible `backdrop-filter` layers sit over the canvas; each forces a blur re-sample every canvas repaint:
- `.glass` nav pill: `src/index.css:83-84` — `blur(18px) saturate(140%)` (applied in `SiteNav.tsx:37`)
- `.veloste-scroll-indicator` ×2: `src/components/logoStyles.css:100-101` — `blur(10px) saturate(130%)`
- `.work-overlay` (modal only, acceptable): `logoStyles.css:204-205`

**Change (in order of preference):**
1. After Task 1.1, idle cost disappears (canvas stops repainting) — re-measure first; if scroll-time cost is still visible in the trace (long "Composite Layers" / rasterization in a DevTools Performance recording during scroll):
2. Scroll indicators: drop `backdrop-filter` entirely; replace with a semi-opaque `background: rgba(...)` tuned to read as glass (they are small pills — blur is barely perceptible at their size).
3. Nav pill: reduce to `blur(10px)` and/or add `will-change: backdrop-filter` is NOT a thing — instead ensure it's on its own compositor layer (`transform: translateZ(0)`), and reduce radius. Keep the glass look on this one element if measurement says it's affordable.

**Acceptance criteria:** DevTools Performance recording during a 3s scroll shows compositor/raster time reduced vs baseline; nav and indicators still visually acceptable (screenshot review). No layout shifts.

### Task 3.2 — Scope per-frame CSS variables away from :root

**Context:** `src/components/SceneScrollDriver.tsx:112-139` writes `--veloste-about-open`, `--veloste-left-opacity`, `--veloste-right-opacity`, `--veloste-indicator-opacity` onto `document.documentElement` every 2nd frame during scroll (quantized/diffed via `setCssVarIfChanged`, lines 25-37). Custom-property changes on the root invalidate style for the whole document.

**Change:** Write the variables onto the overlay root element instead (the container that holds `.bg-text`, panes, indicators — see `CircleContentOverlay.tsx` / the wrapper in `LogoScene.tsx`), passed in as a ref or found once by id. All selectors consuming `--veloste-*` (`logoStyles.css:64-83` etc.) must be descendants of that element — verify with `grep -n "veloste-about-open\|veloste-left-opacity\|veloste-right-opacity\|veloste-indicator-opacity" src -r` and move any consumer that isn't (the `veloste-panel-open`/`veloste-light` class toggles at `SceneScrollDriver.tsx:144,153` may also be scopeable — check consumers of those classes too; `body`-level theming may legitimately need root scope, leave those).

**Acceptance criteria:** all scroll-linked fades (bg-text, panes, indicators) behave identically across the full scroll axis; grep confirms no consumer of a moved variable sits outside the new scope. Build passes.

### Task 3.3 — Font + hygiene sweep (low priority, batch together)

1. Convert `src/assets/Dream-Orphans.otf` + `Dream-Orphans-Bd.otf` to woff2 (e.g. `npx fonttools` or any otf→woff2 CLI; if not feasible offline, skip conversion) and add `<link rel="preload" as="font" type="font/woff2" crossorigin>` for both in `index.html`. Update `@font-face` in `src/index.css:41-47` and `src/components/logoStyles.css:2-8`.
2. Delete dead `src/App.css` (unused Vite boilerplate — confirm nothing imports it first).
3. Add `<link rel="preload" href="/models/vstar.glb" as="fetch" crossorigin>` to `index.html` so the model starts downloading before the lazy `LogoScene` chunk resolves (`App.tsx:5`).

**Acceptance criteria:** no FOUT on hard reload with cache disabled (Network tab: fonts start loading before CSS finishes); GLB request starts earlier in the waterfall than before; build passes; no import errors.

---

## Explicitly NOT problems (do not "fix" these)

- Scroll input → ref pipeline (`ScrollProgress1D`, `ScrollProgressContext`): already optimal, zero re-renders per scroll event.
- React memoization: `LogoSceneCanvas`, `AboutPane`, `ContactPane` are memoized; threshold events fire ~2× per traversal. Fine.
- Asset weight: largest runtime asset is the 195 KB GLB; bundles are code-split. Fine.
- n8ao: in package.json but **never imported** — no runtime cost (optional: remove the dep + `src/types/postprocessing-n8ao.d.ts` stub as hygiene).
- No shadow maps, no transmission materials, no per-frame texture uploads, no scroll-driven mounts. Confirmed absent.
- Debug HUD timers: fully gated behind `?debugScroll=1`. Off in production.

## Sequencing

```
Baseline measurement
  → 1.1 (demand frameloop)  ── biggest win, unblocks honest measurement of the rest
  → 1.2 (halo clone) , 1.3 (idle churn)      [independent of each other]
  → re-measure
  → 2.1 (MSAA) → 2.2 (lights) → 2.3 (TipCircles)   [re-measure after each]
  → 3.1 (backdrop-filter — only if scroll trace still shows raster cost)
  → 3.2 (CSS var scope) , 3.3 (fonts/hygiene)      [independent]
  → final measurement + update PERF-RESULTS.md
```

Each task = one commit. If any acceptance criterion fails and can't be resolved within the task's stated approach + fallback, revert that task's changes and record the failure in PERF-RESULTS.md rather than forcing it.
