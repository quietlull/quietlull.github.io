---
name: project-bloom-and-scene-cost
description: The three.js scene's post stack - Kawase bloom + paper filter in ONE pass (D23/D24), the resolutions that ride on it, and how to profile this project (accel OFF, read ms, fragment-bound).
metadata:
  node_type: memory
  type: project
  originSessionId: f5a1bed7-a11a-49bc-a6a8-6c9dbb584f05
  modified: 2026-09-02T23:12:00.314Z
---

Full record: repo `docs/DECISIONS.md` **D23** (bloom) and **D24** (paper + resolutions), plus
`docs/ARCHITECTURE.md` for the scene map. This is the pointer + the parts that are expensive to
rediscover.

## Current state (2026-08-22, live and pushed)

- Bloom is a **2-level Dual Kawase, no bright pass**, at `_javascript/shader/kawaseBloom.js`.
  Five renders / four targets. UnrealBloomPass is gone. NOTE D23 originally said "four passes, two
  targets" - that was an earlier draft and is corrected in the doc.
- A **paper-grain filter is composited INSIDE that pass**, not added as its own. Two baked sheets
  from `assets/tex/paper-*.png` (normal+height bakes: rg = normal xy, b = height).
- **The paper is what pays for the resolutions**: pixel ratio 0.5, bloom scale 0.25, reflection
  0.25. D24 treats them as one decision - do not move one without re-judging the other.
- **Two scene bundles, not three.** `scene` (About only) and `minimal` (everything else, 35 embers).
  `general` was retired. Only About has fireworks now.

## Traps that cost real time here (also in repo `docs/TRAPS.md`)

- **`EffectComposer` caches the pixel ratio at construction** and has its own `setPixelRatio()`.
  Setting only the renderer's makes the post chain render at the OLD ratio - lowering dpr made it
  ~4x SLOWER. Live code is safe only because `createBaseScene` sets the ratio before constructing
  the composer; moving that line breaks it silently.
- **A backgrounded tab throttles `setInterval` hard** (measured: 3 fires where 24 were asked for),
  so any timed load test silently under-delivers and looks like a pass. Use rAF + a time accumulator.
- **Check whether a per-vertex value actually varies before optimising around it.** The firework
  shader recomputed a constant direction (hash + acos + 2 sin + 2 cos + cbrt) every frame, once per
  trail copy - 200k evaluations/frame at the cap.
- **`sizeAttenuation` shrinks particles to ~1.4px**, so firework FILL was never the cost despite
  `particleSize: 20`. Spawn cost is ~0.207 ms/shell and allocation is only 0.015 ms of it, so a
  pool is not worth building.

## How to profile this project

- **Hardware acceleration OFF, always, first.** With it on: 240 fps and every ablation within noise.
  Rod's stated constraint is a no-GPU machine.
- **Read ms, not fps** - fps pins to vsync and hides the tail.
- **Fragment-bound, not geometry-bound**: 27 draw calls, 733 triangles. The levers are resolution,
  pass count and pixel ratio, never batching or poly count.
- Tools in `redesign-lab/`: `perf-probe.js` (ablation) and `scene-tuner.html` (live sliders for every
  knob above plus an ms/p95 HUD).

## RE-PROFILED 2026-09-01 (request #52) — these are the numbers to quote now

Measured over CDP: headless Chrome + SwiftShader (accel OFF), ±4x CPU throttle, RTX 3080 reference.
Harness + raw JSON: session scratchpad `profile.mjs` / `results-*.json`.

- **About TOP of scroll: 60 fps held** (avg 17.2 ms) even under SwiftShader. The 2026-08 resolution
  calls (dpr .5 / bloom .25 / refl .25) worked.
- **About BOTTOM (dock+water view): 30 fps** (p50 33.3, p95 50) under SwiftShader. Ablations there:
  water fragments −4.1 ms (−10.8 at 4x), paper −4.4, bloom −3.2 (−6.7 at 4x). The water shader is
  8 snoise + a 16-slot ripple loop that runs with zero ripples alive (~27% of it).
- **Fireworks are the spike source everywhere**: 8 shells → p95 33 ms; throttled portal hit 99.9 ms.
  4,000 verts/shell (400×10 trail), drawn twice (reflection), program recompiles when the sky empties.
- **Mobile viewport pins 16.7** even throttled — buffers are tiny; mobile risk is CPU not pixels.
- **No leaks**: heap flat, geometries/textures/programs return to baseline after shells die.
- **The old "27 draw calls / 733 tris" is stale**: measured 38-42 calls at top, 104-118 at bottom.
- Landed 2026-09-01 (5 invisible minors): reflection render skipped when water material invisible
  (was a full second scene render on EVERY minimal-tier page), 404 scene-mode poll gated, matchMedia
  hoist, dead opacity write gone, D-key debug gated on CONFIG.debugEnabled.
- ⛔ **THE REST IS ICEBOXED** (Rod, 2026-09-02: "leave the remaining performance boosts to
  iceboxed"). The audit is CLOSED and the remaining proposals are parked, not open work - **do not
  re-raise them, re-audit the scene, or re-propose the two measured duds** (far-water octave cut,
  buffer-shrink preset). They keep their measured numbers in `redesign-lab/perf-diffs/` and are
  indexed by the single ICEBOX row in `redesign-lab/todo.html`. Biggest thing left on the table if
  he reopens: the fireworks levers (either one kills the burst frame-drop alone). The character
  integration plan is parked with them.
- Solution options (2-3 per problem, with code) live in `redesign-lab/perf-diffs/`; findings are
  rows keyed `perf::*` in `redesign-lab/todo.html`; character plan in
  `redesign-lab/character-scene-INTEGRATION-PLAN.md`. **Rod picks; nothing else applied.**
- **THE RIPPLE GATE SHIPPED 2026-09-01, confirmed by Rod and PUSHED** (`46e83fc`; audit docs
  `50dbf17`). 4 code lines in `mirroredSurface.js`:
  `uRippleAlive` written from `getActiveRipple()` in `update()`, early-out in `rippleOffset()`.
  Re-measured on the BUILT bundle, gate alternated within one load: **+3.8ms at 1x (dock's typical
  frame back to 16.7ms = 60fps), +2.6ms at 4x (real saving, NO flip)**. The earlier "back to 60fps
  everywhere" was overstated - it came off a run sitting on the vsync cliff; the milliseconds
  reproduce, the flip only does when the machine is already close. **`spawnRipple()` is now the
  ONLY legal way to start a ripple, and `getActiveRipple()` is load-bearing for RENDERING** (a
  future edit narrowing its window changes what the water draws). Lab water copies deliberately
  NOT updated - they are 5 changes behind live already (now in TRAPS).
- **A/B-MEASURED (runtime-patched live page, same-load baselines):** the ripple gate was most of
  the whole win.
  Burst spikes die with EITHER shells-out-of-reflection OR trail 10->5 (p95 33.3 -> 16.8; trail 7
  does NOT clear it). Cheap-bleed +1.25ms. Measured DUDS: far-water octave drop (~0), and the
  buffer-shrink weak-machine preset (bloom/refl 0.125) - nothing at the dock, its levers miss the
  real costs; 08's recipe was revised to gate+trail5+cheap-bleed+single-sheet. Full stack +5.6ms.
  Rig: scratchpad `ab-test.mjs` + `patches-*.js` (exact-anchor shader patches over CDP).

## Open debts on this work

Rod owes the **Shadertoy URL** for the paper filter's `element-tracker.md` row (it is live without
provenance). There is **no `prefers-reduced-motion` path anywhere in the scene code** although D21
requires one, and the paper "boil" re-rolls the whole screen 3.25x/sec behind body text on every
post page. At tooth 0.05 that clears WCAG 2.3.1 on amplitude (~2.5%, limit 10%) but NOT on
frequency, so raising tooth past ~0.2 would cross it. There is also no WebGL-absent fallback.

**Still true and still open: the scene has ZERO lights.** Lanterns are visible only through emissive
materials. The sky colour and the water's moonlight terms (`uSunLift` now 1.5, was 0.2) are the
lighting. Request **#40** (light it properly) is unstarted. Related:
[[feedback-manual-code-audit]], [[feedback-verify-the-premise]].
