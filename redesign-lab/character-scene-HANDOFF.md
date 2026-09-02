# HANDOFF — CHARACTER-SCENE (dissolve spirit in the dock scene) — 2026-06-15

For an agent picking up the **character-in-the-dock-scene** work. Rod is working on the **redesign in parallel**, so
this is SCOPED — stay in your lane.

## AGENT NAME (Rod's convention, 2026-06-15)
This lane (Character + Animation) is worked by the agent named **Hana**. Rod assigns one named agent per Three.js
workstream so the shared memory/log files stay attributable — **SIGN every changelog/spec/log/memory entry with "Hana".**
Sibling lanes: water = **bob**, firework = **jane**, lantern = **sarah**, fireflies = **Lucifer**. (Full scope +
cross-lane dependencies in `character-spec.md` "Full Three.js rework scope + AGENT OWNERS".)

## ⛔ SCOPE / BOUNDARIES (parallel work is happening — do NOT collide)
- **TOUCH ONLY:** `redesign-lab/character-scene.html` (the working tip), `redesign-lab/scene/**` (copied scene
  modules), and the snapshots/`character-scene-vN.html`. Plus `character-spec.md` + the changelog for notes.
- **DO NOT TOUCH:** the redesign itself (`extracted/`, `bench/`, `rework-*.html`, `element-tracker.md`, `picker`,
  `final-picks.md`, `figma-iteration*`), the live site (`_javascript/`, `_sass/`, templates, `_config.yml`), or
  anything tracked. Rod is actively editing the redesign — leave it alone.
- **NO git** here. character-scene + scene/ are gitignored. Do NOT merge to main or push (that's the very last step,
  only when the WHOLE character is done and Rod says so — see NEXT).

## WHAT THIS IS
`character-scene.html` = the petal-dissolve white-spirit CHARACTER (developed in `character-test.html`) dropped into
Rod's REAL dock scene (lanterns + dock + water + fireworks). She cycles, dissolves into white petals, and her head/
arm track scene things by MODE. Eventual home: the About-page `three-background-scene.js` (final port).

`character-test.html` = the PURE character component (no scene). Keep it intact as the reference; do character-work
that's scene-independent there, scene-work in `character-scene.html`.

## CURRENT STATE (character-scene v9)
- Real dock scene loaded via Rod's modules copied to `redesign-lab/scene/` (faithful `cp`, provenance = his code):
  `three-shared.js` (createBaseScene NOT used — composer built manually), `lantern-controller.js`,
  `firework-controller.js`, `three-config.js`, `shader/{lanternShader,lanternShaderManager,mirroredSurface}.js`.
  Importmap adds `three/examples/jsm/`. FBX from `/assets/mesh/lantern-night/*.fbx` (served).
- `<meta Cache-Control no-store>` is in the head so normal reloads always serve fresh (no hard-refresh). Earlier
  "still broken after I fixed it" reports were STALE CACHED pages — keep this meta.
- Character scaled UP to REF=120 onto the dock; scene-scale defaults (uClickRadius 120, uBaseSize 5000, uDrift 3,
  uSway 8) — ALL GUESSES, Rod tunes by eye.
- Camera far (0,120,500), navy bg, **bloom = CONFIG default ~1.4? NO — Rod set 0.25** (hardcoded in the bloom ctor;
  radius/threshold from CONFIG). Live Scene/Bloom slider.
- **TRACKING MODES** (LOOK.mode) — each FORCES facing (faceMode + FACE_Y[mode] + tunable faceOffset) + sets head/arm target:
  - `cursor` (face toward, FACE_Y 0) -> the cursor (uMouse). Only mode that uses the cursor.
  - `lanterns` (face left, FACE_Y PI/2) -> the NEAREST lantern (lanternController.lanterns world pos).
  - `fireworks` (face away, FACE_Y PI) -> the LIVE rising rocket of HER OWN auto-launched firework.
- **Fireworks tracking (v6-v9):** auto-launch keeps one of HERS rising (`trackedFw`); follow its live pos =
  `lerp(start,end, rocket.trail.uProgress)`; track ONLY hers (cursor-launched fireworks ignored -> no cursor snap);
  rockets launch from BELOW the dock (start y=-100) so clamp `fireworkTarget.y >= FW_FLOOR(100)` (never point down);
  freeze the target when her rocket isn't rising (pooled objects reset on reuse). Verified: launch-> y clamps 100,
  mid 368, top 837, frozen-on-explode; arm dot=1.0 to firework / ~0 to cursor even facing away.
- HEAD aim = `aimBone` with a GUESSED face axis (LOOK.headFwd, tunable, clamp LOOK.maxAngle 0.7 = the head's only
  tune). ARM aim (v5) = PROPER rig-derived 2-bone point: `aimArm()` aims the upper arm + forearm so each bone's REAL
  down-the-bone axis (= normalize of its child's local position: armChildDir/foreChildDir) points at the target. NO
  guessed axis, no clamp -> she points STRAIGHT at the target (verified dot=1.0). The old ArmFwd/armMaxAngle knobs are
  REMOVED.
- `window.__s = { U, P, character, scene, cam, composer, LOOK, FACE_Y, bloom, lanternController, fireworkController,
  getLookTarget, launchTrackedFirework, updateFireworkTarget }` — use for probes.

## UPDATES since v9 -> v16 (Hana, 2026-06-15) — SUPERSEDES the stale bits in CURRENT STATE above
- **v10** arm/head ENGAGE GATE + eased weight (`LOOK.weight`/`engageSpeed`); head now BLENDS over the animated pose
  (not overwrite). Firework tracking moved from the RISING rocket to the BURST.
- **v11** fireflies (embers) added — faithful copy of `three-background-scene.js:67-93`, tagged `userData.isEmber` so
  lantern-tracking skips them.
- **v12** arm pointing = **CCDIKSolver** (natural bend), blended by weight; old straight aim = fallback (`LOOK.useIK`).
  Target bone pushed to `skeleton.bones` + a matching `boneInverse`.
- **v13** firework gate FIXED — `busy = trackedFw in group && (phase launch|explode)` holds it through the ~1.2s burst.
  New `none` mode (no head/arm). Cursor `frontZFlip` (point toward the viewer).
- **v14** CALM defaults (`engageSpeed 0.03`, `smooth 0.07`). CAMERA = his `setupScrollCamera` (scroll y500->100 + tilt
  25->0); free OrbitControls demoted to an off-by-default 'Free orbit (inspect)' toggle; page scroll enabled.
- **v15** firework spawn pushed FAR/lower/wider (tunable `FW {xSpread,yMin,yRange,zMin,zRange}`, z -1000..-1600) so the
  arm points OUTWARD and left/right reads; tracking = the LATEST burst from ANY source (auto OR cursor clicks).
- **v16** WATER-WATCHING state (`water` mode, side profile, head-only, CLICK STAND-IN) — see the BOB water section below.
- **Tracking MODES now:** `none / cursor / lanterns / fireworks / water`. `__s` also has `CAM, FW, scrollCam,
  clickTarget, lookAtWater`. Verify recipe unchanged (probe `__s`).

## ⚠️ HOW TO VERIFY (you CANNOT screenshot — the preview tab is headless, rAF paused)
Recipe: `preview_start` name `jekyll` (port 4000) -> `preview_eval location.assign('http://localhost:4000/redesign-lab/
character-scene.html?v='+Date.now())` -> probe `window.__s`: `composer.render()` in a try (no-throw = shaders compiled),
drive logic by setting `__s.LOOK.mode` + calling `__s.character.update(0.016)` in a loop + reading bone quaternions /
`__s.character.root.rotation.y` / `__s.getLookTarget()`, then `preview_console_logs level:error`. **Rod does the
visual call** — never claim it looks right. NOTE: rapid edits race Jekyll's rebuild, so a fresh value can read stale
for a few seconds; reload once more to confirm (this bit me on the bloom value).

## OPEN — ROD'S VISUAL TUNE (do not guess these blind; they need his eyes)
- **Head forward axis**: `Tracking -> HeadFwd X/Y/Z` (flip ±1) so her head faces the target. (ARM needs NO tune — rig-derived.)
- **Facing offset**: `Tracking -> Facing offset` if her whole body faces backwards (model forward unknown).
- **Scale/placement**: `Model -> x/y/z` (feet on the dock); `Petals -> Size/Drift`; `Dissolve -> Click Radius` — all
  scene-scale guesses.
- **FW_FLOOR** (100) — the firework aim floor; raise if she still dips, lower if she should look more level.
When Rod gives final values, BAKE them into the defaults (LOOK.headFwd, faceOffset, the uniform defaults, FW_FLOOR).

## NEXT (in order)
1. Bake Rod's tuned forward-axes / facing-offset / scale values into defaults.
2. The real **6 dock states** with facings (character-spec.md "FINAL OUTPUT"): walk-to-edge, sit-facing-away
   (fireworks), sit-side-profile-water, sit-facing-camera (cursor), sit/stand-on-pillar (point at lantern), walk-off.
   Map each state's facing -> a tracking mode automatically.
3. Walk states = ROOT MOTION (Rod's baked Maya clips, Route B `.glb`).
4. SY 4-zone white palette (needs Rod's multi-material model), reduced-motion, on-screen culling + mobile petal cut.
5. FINAL: port the character into the real `three-background-scene.js`, branch, merge to main, push (ONLY when the
   whole thing is done + Rod approves).

## HARD RULES (Rod)
- PROVENANCE is law: every element from a real source, tiered. The dissolve/petals = Codrops (`dissolve-ref.html`);
  scene = Rod's copied modules; bone look-at = standard three.js. No free-handing.
- Ask before any change that could alter a rendered pixel on the LIVE site (not applicable here — lab only).
- Don't screenshot to verify (esp. animation). Make the change, ASK Rod what he sees.
- Point-by-point; present options; don't batch sweeping changes.

## POINTERS
- Design intent + the 6 states + tracking modes + SY palette: `character-spec.md`.
- Full change history: `character-test-CHANGELOG.md` (character-test vN + character-scene vN).
- The pure component (scene-independent character work): `character-test.html`.
- Provenance contract: memory `project_code_provenance.md`.

## [BOB handoff -> Hana, AS-BUILT 2026-06-15] RIPPLE HEAD-TRACK for STATE 3 ("sit, side-profile, watch the water")
Bob's reworked water is in the lab as a **SEPARATE drop-in module**: `redesign-lab/scene/shader/mirroredSurface-bob.js`
(it does NOT overwrite the original `mirroredSurface.js` — Bob deliberately split them so my stable scene isn't coupled
to his WIP water look). Same `class MirroredSurface` / constructor `(scene, camera, renderer, mirrorPlane, options)` /
`update()` as the original; ADDS the ripple API + his new look. Provenance: ripple math = `sources/water-ripple-formula.md`.

**Bob's cross-agent contract (this is what state 3 reads):**
- `mirroredSurface.getActiveRipple()` -> `{ origin: THREE.Vector3 (world, on the water plane), age: seconds }`, or
  **`null`** once `age > uRippleLife` (default **4s**). `origin` = the head-look TARGET for "watch the water".
  **AS OF 2026-09-01 THE WATER SHADER READS THIS TOO** and it is now load-bearing for rendering, not
  just for her head: `update()` gates the ripple loop on it (`uRippleAlive`), so narrowing this
  method's window, or making it return something always-truthy, changes what the WATER draws and
  what it costs. Change ripple duration through `uRippleLife`, never by editing this method. Its
  `origin` is also returned BY REFERENCE - mutating it in place corrupts every later read.
- `mirroredSurface.spawnRipple(worldPoint)` -> seeds a ripple (16-slot pool, start = the material clock). **His module
  does NOT self-handle clicks** — the CALLER spawns (the character's pointerdown in the test, or the live scene's click).

**ALREADY BUILT (v16):** the `water` LOOK mode exists in `character-scene.html` — `FACE_Y.water = PI/2` (side profile),
HEAD-ONLY (arm gated off in water mode), clamped head-look via the SAME `aimBone(headBone, LOOK.headFwd, target,
LOOK.maxAngle, weight)` as cursor/lanterns/fireworks. It currently uses a **CLICK STAND-IN** (`clickTarget`: pointerdown
raycasts the click onto `waterMesh`; `__s.lookAtWater(x,y,z)` test hook). So the facing + clamped head-look + arm-off are
done; only the TARGET SOURCE still needs to swap from the stand-in to Bob's ripple.

**TO FLIP THE STAND-IN TO BOB'S REAL RIPPLE (~3-line swap — NOT done yet; needs Rod's OK because it changes the water VISUAL):**
1. Import swap: `./scene/shader/mirroredSurface.js` -> `./scene/shader/mirroredSurface-bob.js` (drop-in; this ALSO
   switches the rendered water to Bob's rework look — that's the visual change to clear with Rod).
2. `getEngage()` water branch: replace the clickTarget stand-in with
   `const r = mirroredSurface && mirroredSurface.getActiveRipple(); return r ? {engaged:true, target:r.origin} : {engaged:false, target:null};`
3. pointerdown (water mode): call `mirroredSurface.spawnRipple(hit.point)` instead of setting `clickTarget`, so clicking
   makes a REAL ripple she then watches (or auto-fire a ripple every few seconds for a hands-off demo).
At FINAL integration into `three-background-scene.js` the instance is `window.mirroredSurface` — same `getActiveRipple()` contract.
— recipe verified against `mirroredSurface-bob.js` + reconciled with the as-built v16 water mode by Hana.
