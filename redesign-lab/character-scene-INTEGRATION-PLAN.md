# CHARACTER -> LIVE ABOUT SCENE: integration + performance plan (2026-09-01, request #52)

Written by the perf-audit session from a full read of `character-scene.html` (v21),
`character-test.html`, `character-spec.md`, the two handoffs and the changelog, against the
live `_javascript/three-background-scene.js` as it stands after the merge. This is the plan
for WHEN the character work resumes; nothing here is built. The lane's own handoff
(`character-scene-HANDOFF.md`) still governs how the lab work is done.

## What "the teleport" is

There is no separate teleport effect. It is the dissolve state machine: dissolve OUT
(uProgress -30 -> +17 at 12 units/s, ~3.9 s, petals scatter), a 0.8 s empty-stage gap in which
`applyState` moves root position + facing + clip + tracking mode in one call (the teleport
itself, zero per-frame cost), then materialize IN (~3.9 s, petals converge). The click
variant is a faster radial dissolve (~1.5 s). Cost while firing is the live petals only - the
body's dissolve noise already runs every frame regardless.

## What she adds per frame (from the lab code)

- Skinned body: ~67 bones + 2 IK target bones; one dissolve material (simplex noise per
  fragment, every frame, no rest gate); reference model was ~7.3k verts. Drawn TWICE while
  the water reflection renders. This is the biggest single risk under software WebGL.
- Petals: one THREE.Points, 1500 petals, frustumCulled=false, full GPU skinning (16 texel
  fetches) + noise per petal per frame - in BOTH renders. At rest EVERY petal is discarded
  (age < 0 with the shipped defaults): they cost vertex work and draw zero pixels.
- IK: CCDIKSolver, 2 links x 8 iterations, only while engaged - microseconds.
- Tracking CPU (nearest lantern scan, firework target, getActiveRipple): trivial.
- Mixer: one clip (two in a 0.3 s crossfade), ~0.05-0.2 ms CPU.

## Budget and the gates that make it fit

Target: character adds < 2 ms on a software-WebGL desktop, < 1 ms mobile. Only fits with ALL:

1. **Reflection exclusion** - root + petals on a camera layer the mirror camera skips. Halves
   her whole GPU cost. Her reflection at quarter scale under wave distortion is a few soft
   pixels; still a visual change -> always-on for mobile/software, Rod judges desktop.
2. **Idle petal gate** - `points.visible = (phase !== 'idle' || withinLifetimeTail)`. Exactly
   zero pixels change at rest (arithmetic on the shipped uniforms; re-check if uRiseStrength
   is ever tuned above 14) and it removes 1500 skinned verts x2 renders every idle frame.
3. **On-screen culling** - frustum-test her bounding sphere per frame (same pattern the water
   already uses); when out of view skip mixer + look + IK and PAUSE the cycle timer so
   dissolves never burn unseen.
4. **Low-poly export** - ask at Maya export time: <= ~8k triangles, .glb <= ~2 MB, the 4 SY
   colour zones as <= 4 materials. The flat-white silhouette tolerates low poly by design.
5. **Mobile cut** - `setPetalCount(500)` (exists already) on `(pointer: coarse)`, ikIter 8->4.
6. **prefers-reduced-motion** - per the spec: materialize once into one sit state, idle clip,
   petals off, head tracking only (or absent - Rod's call). The scene currently has NO
   reduced-motion path at all, so she should not be the first thing that ignores it.

## Port mechanics (the traps found by diffing lab vs live)

- **Units**: the live loop passes normalizedDelta in FRAMES; the character wants SECONDS with
  a 0.05 clamp. Wrapper: `{ update: (nd) => { const dt = Math.min(nd / 60, 0.05); ... } }`.
- **Ember tag mismatch**: lab skips fireflies via `userData.isEmber`; the LIVE embers carry
  `userData.kind === 'ember'`. Port must test `kind` or she points at fireflies.
- **Do NOT port the lab's composer** (UnrealBloom + OutputPass). Live is Kawase, no threshold:
  her white body will halate ~1.13x harder than anything she was judged under. Rod re-judges
  her whites under the live bloom + paper before anything locks.
- **Listeners**: the live scene already owns pointerdown/up (water ripples) and mousemove
  (avoidance). Porting the lab's water-mode pointerdown verbatim double-spawns ripples -
  integrate through the existing handler; add only the character-body raycast.
- **Click-through**: the live canvas is pointer-events:none, handlers are window-level, so a
  click on page content over the dock would also click-dissolve her. Guard on e.target or
  accept it - Rod's call.
- **Skeleton order**: IK target bones must be pushed into skeleton.bones BEFORE the first
  render allocates the bone texture (the lab does this; keep the order).
- **Tier gate**: the full bundle also runs on minimal-tier pages (until perf-diff 01 lands).
  Create her only when `document.body.dataset.sceneTier === 'full'`.
- **three r161 -> r180**: the injected shader-chunk names in SKIN_GLSL / onBeforeCompile are
  version-sensitive; one mechanical re-verify.
- **Load late**: self-host the .glb in assets/mesh/, load after first paint like the FBX
  already does; her entrance state is a materialize, so late arrival is invisible.
- **State 2 pacing**: if Rod picks "track existing bursts" over "launch her own shells",
  delete the whole fwTimer/busy pacing block rather than carrying dead state.

## Batched questions for Rod (also in the audit report)

1. Does she reflect in the water on desktop-hardware, or is exclusion universal?
2. State 2: her own shells (works anywhere on the page) or track the greeting stream only
   (free, but greeting only runs at the top of the page)?
3. Character on About only, or both full-tier pages (About + section landings)?
4. Reduced-motion: one static sit with head tracking, or fully absent?
5. Export budget confirmed (<= 8k tris, <= 2 MB, 4 zones)?
6. Click-on-content-over-dock triggering the dissolve: guard or keep?
