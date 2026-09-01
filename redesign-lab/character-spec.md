# Three.js Character — spec (2026-06-14)

The animated character for the About-page dock scene. Backlog item B1.

## Concept
A **ghostly white spirit** (anime trope: fade in/out like a ghost) that lives at the DOCK in the existing
About scene (`three-background-scene.js`). Almost-entirely-WHITE flat/unlit shader — DELIBERATELY, to mask that
the model isn't well made (no lighting -> no shadows/normals to expose rough topology; reads as a silhouette
spirit). On-identity: glowing white spirit among night lanterns = Shinsekai Yori ED palette + festival ghost.
Bloom-friendly (the scene already has bloom; a white emissive mesh halates on its own).

## State machine
- **States** = array of `{ position (near dock), animationClip, facing }`. N states (start ~3-5).
- **Auto-cycle**: each state has a dwell timer (~6-12s TBD). On transition:
  1. FADE OUT (ghost dissolve/opacity -> 0)
  2. while invisible: teleport to the new position + switch to the next clip (play from start)
  3. FADE IN
- **NO skeletal cross-fade** — the full fade masks the switch, so animations are independent one-shot/loop
  clips that never need to blend into each other. (This is what makes the Mixamo multi-anim pipeline easy.)

## Interaction (DECIDED)
- **Click** (raycast — reuse `lantern-controller.js` click pattern = Rod's own code): fast-forwards the current
  dwell timer to its end and forces a transition to a **RANDOM state that isn't the current one**.
- The dissolve **emanates from the point of contact** (the raycast HIT POINT). Leading approach: pass the hit point
  as `uniform vec3 uContactPoint` in WORLD space; dissolve threshold = f(distance(worldPos, uContactPoint)) so the
  dissolve front expands radially in 3D from where she was touched (robust to camera angle; screen-space would
  ignore her depth/form). [Rod still thinking — world-space radial is the proposal, not locked.]
- Guard against clicks mid-transition (ignore or queue). Respects `prefers-reduced-motion` (no auto-cycle / instant).

## Fade technique (DECIDED): DISSOLVE / materialize shader + GLOWING DUST particles
Noise-threshold dissolve with a glowing burn edge (spirit assembles/scatters) AND **glowing dust particles** that
emit from the dissolve front — "she turns into glowing dust." MUST be SOURCED from a real shader reference, not
free-handed (provenance). Mechanism:
- Inject dissolve into a SKINNED material via `onBeforeCompile` (so Three.js keeps bone skinning + world-pos; same
  technique Rod already uses in `firework-controller.js`). Sample noise per-fragment; discard where `noise <
  threshold`; emissive edge band where noise ~= threshold.
- Animate `threshold` to materialize (in) / dissolve (out).
- RADIAL variant for clicks: local threshold biased by distance from `uContactPoint` (world space) -> dissolves
  outward from the touch point.
- **Dust particles**: glowing motes spawned at/near the dissolve edge, drifting up + fading (Points/particle
  system). Source from the same dissolve-particles reference.
- **OPEN: auto-cycle (non-click) dissolve origin** — there's no contact point on a timer transition. Options:
  uniform full-body shimmer / rise-from-feet / from-center / random point. Propose: auto = rise-from-feet or
  uniform; click = radial-from-contact.

## Shader colors (DECIDED) — modeled on the Shinsekai Yori spirit
Flat/unlit per-material-zone colors (no lighting -> hides topology). Sampled from SY, then **+5 per RGB channel**
to undo the reference's vignette darkening (per Rod). Target material colors (already +5-adjusted):
| Zone | SY sample | +5/channel (USE THIS) |
|---|---|---|
| Clothing (yukata) | #fafafa | **#ffffff** (pure white) |
| Skin | #ececee | **#f1f1f3** |
| Hair | #99929d | **#9e97a2** |
| Hair tie + obi + sandals | #44454d | **#494a52** |
So she is near-white with a few tinted zones, NOT monochrome. Model needs these 4 material zones assigned.
NOTE: the +5 compensates for SY's vignette; if Rod's scene later adds a vignette/heavier bloom, revisit.

## Animation pipeline (from the Maya export discussion)
- Asset = MIXAMO character on a MIXAMO rig. Rod sends the FBX later.
- **Route A (develop):** export character once (bind pose) + EACH animation as its own FBX (anim-only ok);
  in three.js load model + each anim FBX, grab `animFbx.animations[0]`, add all to ONE AnimationMixer. Shared
  `mixamorig:` skeleton -> binds directly, no retarget. (= Three.js skinning examples = real source.)
- **Route B (production):** bake the per-animation FBX into ONE `.glb` with named clips via Blender NLA strips.
  Smaller/faster, native multi-animation, no FBXLoader quirks.
- Maya export: Bake Animation on, FBX 2018/2019 binary, Y-up, identical bind pose + `mixamorig:` names across all.
- Root motion: likely IN-PLACE clips + position set by the state machine (since the ghost teleports between dock
  spots while invisible) rather than baking translation into clips. [confirm during build]

## Build plan
- STANDALONE TEST SCENE first (load model + N anims into one mixer, ghost-fade state machine + click). Can scaffold
  NOW with a Three.js sample skinned model (Xbot/RobotExpressive) to prove plumbing, swap in Rod's FBX later.
- FINAL: integrate into `three-background-scene.js` at the dock.

## Provenance
- **Dissolve + glowing-dust technique: Codrops "Implementing a Dissolve Effect with Shaders and Particles in
  Three.js" (2025-02-17, tympanus.net)** — cnoise via onBeforeCompile replacing `<dithering_fragment>`; particle
  visibility gated to the `[uProgress, uProgress+uEdge]` band. TRUE source -> REMIXED here (adapted for a skinned
  char + contact/rise origins + bbox-normalized noise). cnoise = Gustavson/Ashima webgl-noise (public domain).
- onBeforeCompile injection also matches Rod's `firework-controller.js`. Click raycast mirrors `lantern-controller.js`.
- White flat material: built-in MeshBasicMaterial (unlit -> hides topology).
- Character: Rod's Mixamo asset (final). Test placeholder: three.js sample RobotExpressive.glb.

## IMPLEMENTATION PLAN v2 — corrected concept (2026-06-15) [SUPERSEDES the OPEN notes above]
Working file `character-test.html` (built to v5; this plan = the NEXT pass, NOT yet implemented). Versions v1-v5
frozen + `character-test-CHANGELOG.md`.

### A. Dissolve origin = ONE unified mechanism, two spatial modes
Per-fragment dissolve threshold = global `uProgress` + a SPATIAL BIAS. Body discards where `noise < effProg`;
higher effProg = more dissolved. The bias makes the front START somewhere and SPREAD outward as uProgress ramps:
`effProg = uProgress + spatialBias`
- **Rise-from-feet (TIMER dissolve):** `spatialBias = uRiseStrength * (1 - clamp((worldY - feetY)/bodyHeight,0,1))`.
  Feet (low Y) dissolve first, front rises to the head.
- **Radial-from-click (CLICK dissolve):** `spatialBias = uClickStrength * (1 - clamp(dist(worldPos,uClickPoint)/uClickRadius,0,1))`.
  Click point dissolves first, front spreads outward.
- Only ONE mode active per dissolve (timer -> rise, uClickStrength 0; click -> radial, uRiseStrength 0 / point far).
- Mirror the SAME spatialBias into petal `age` so petals spawn AT the moving front.

**BUG (why click-origin doesn't read now):** `uClickRadius=2` but her body is ~5 tall -> the bias is a tiny 2-unit
bubble; `uClickStrength=6` over a ~34-unit progress sweep is a minor local lead. So the uniform global sweep
dominates and it looks ~uniform with a faint early patch, NOT a front from the click. **FIX:** radius must span her
full body (~5-6) and strength must be large enough that near-click is well ahead of the far edge, so the front
genuinely sweeps click->outward. Same logic for rise (height bias spans full height). Tune both live.

### B. Petal flow field = default direction + GRID knob + mouse DIRECTION nudge (NOT repulsion)
CORRECTION: the per-petal radial repulsion built in v3 is WRONG — remove it. Instead:
- Flow has a DEFAULT DIRECTION set by a Tweakpane GRID (inline XY pad), like dissolve-ref's `velocityFactor` picker.
- The MOUSE slightly nudges that GLOBAL direction OPPOSITE the cursor:
  `flowBias = -normalize(uMouse - charCenter) * uMouseFlow` (small, tunable), added to the flow vector for ALL
  petals (a global bend of the whole stream), NOT a localized bubble. Per-particle wave still gives spread.
- Petal SIZE default 280 -> 120.

### C. State machine (v5, keep) wired to the origin modes
idle(dwell) -> OUT (rise-from-feet) -> gap -> swap {model,anim,position} -> IN -> idle. CLICK in idle: skip dwell +
OUT radial-from-click. (Final: random different state; test: sequential ok.)

### D. Maya -> three.js FBX pipeline — DECISION NEEDED (Rod flagged "we have to determine the pipeline")
- **Route A:** export character once (bind pose) + EACH animation as its own FBX; at runtime load model + each anim
  FBX, take `animFbx.animations[0]`, add all to ONE AnimationMixer (shared mixamorig skeleton binds directly).
- **Route B:** bake the per-anim FBX into ONE `.glb` with named clips via Blender NLA, load that. Cleaner web asset.
- Needs Rod's pick (does he have/use Blender?).

### RESOLVED (2026-06-15) — all locked
- Q1 Mouse-flow = **global stream-bend away from cursor** (relative to her center), small + tunable. NO per-petal repulsion.
- Q2 Click dissolve = **full RADIAL FRONT spanning her whole body** from the contact point (radius ~ her height, strong).
- Q3 Materialize-IN = **TOP-DOWN** (head first). So: OUT(timer) rises feet->head; IN falls head->feet (inverted height bias). Click-OUT = radial.
- Q4 Default flow direction = **straight up** (grid knob retunes).
- Q5 FBX pipeline = **Route B — Blender-baked single `.glb` with named clips.** (Steps documented for when Rod's char is ready.)

### IMPLEMENTATION STEPS (next pass, on Rod's sign-off)
1. **Flow rework:** remove v3 per-petal repulsion; default flow dir = up; add Tweakpane XY GRID for (uFlowX,uFlowY);
   add global `flowBias = -normalize(uMouse - uCharCenter) * uMouseFlow` to all petals (new uCharCenter uniform,
   updated on position change; new uMouseFlow knob; drop uMouseStrength/uMouseRadius). Petal `uBaseSize` 280->120.
2. **Dissolve origin:** add `uRiseStrength` + a `uDir` sign (OUT=+ rise feet-first / IN=- fall head-first); make the
   click front body-spanning (`uClickRadius` ~ bodyHeight, strong `uClickStrength`). Need `feetY`+`bodyHeight`
   uniforms from the model bbox at build. effProg = uProgress + riseBias + clickBias (one active per dissolve);
   mirror both into petal `age`. State machine: timer OUT -> rise on, click off; click OUT -> radial on, rise off;
   IN -> rise inverted (top-down).
3. Verify mechanically, freeze v6, update changelog.

### Route B pipeline (for Rod, when his Mixamo char is ready)
Maya: export the rigged character + each animation (Bake Animation, FBX 2018/2019 binary, Y-up, identical bind pose
+ mixamorig names). Blender: import; each animation -> an Action -> push each Action to its own NLA strip; glTF
export with "Group by NLA Track" -> ONE `.glb` with named clips. three.js: GLTFLoader -> `gltf.animations[]` has
all named clips -> one AnimationMixer (the test scene's `buildCharacter` already consumes `gltf.animations`).

## FINAL OUTPUT (2026-06-15, Rod's high-level description) — the real dock scene
A loop of a few poses, each at the DOCK, each ending in a dissolve. Each state = `{ animation, position, facing
(Y-rotation), kind }`:
1. **WALK** — exaggerated walk animation to the EDGE of the dock, then dissolve. (kind: LOCOMOTION — she moves; the
   only state with visible travel. See open Q2.)
2. **SIT — edge, facing AWAY** from camera, then dissolve. (static)
3. **SIT — side profile, looking at the water**, then dissolve. (static)
4. **SIT — facing the camera (you)**, then dissolve. (static)
5. **SIT / STAND on a dock PILLAR**, then dissolve. (static)
Implementation read: states 2-5 = materialize-in (top-down) at position+facing in the pose -> idle the sit clip ->
dwell -> dissolve. State 1 = special locomotion phase between materialize and dissolve. State struct gains `facing`
(Y-rot) + a `kind` flag; the machine gets an optional ACTION phase for the walk. Sit/walk clips are Rod's (Mixamo),
delivered via the Route B `.glb`.

### Colors (5) — Shinsekai-Yori spirit palette + WHITE dissolve
4 flat/unlit material zones (sampled from SY, **+5 per RGB channel** to undo SY's vignette):
| Zone | SY sample | +5/ch (USE) |
|---|---|---|
| Clothing (yukata) | #fafafa | **#ffffff** |
| Skin | #ececee | **#f1f1f3** |
| Hair | #99929d | **#9e97a2** |
| Hair tie + obi + sandals | #44454d | **#494a52** |
**5th = PURE WHITE (#ffffff) for the DISSOLVE BAND *and* the PETALS.** (Currently the band is blue #6fc0ff + petals
pink #ffb7c5 -> change both to white. Doable in the test scene NOW; the 4 zones need Rod's multi-material model.)
[OPEN Q1: confirm "5 colors" = the 4 zone colors + white dissolve/petals.]

### RESOLVED (2026-06-15)
- A1: **4 colors** (Rod misspoke "5"). ALL boosted **+5 per RGB channel** (undo SY vignette) -> use the +5 values
  above. Dissolve band + petals = pure white #ffffff (separate from the 4 body zones).
- A2: WALK = **ROOT MOTION baked into the clip** (Route B; Rod authors/tunes in Maya, which holds the lantern scene).
  three.js consumes the clip's root translation. (Placeholder Xbot has no root-motion walk -> scripted glide stand-in
  until Rod's clip arrives.)

### Per-state INTERACTIONS (final, 6 states) — all head-look uses a CLAMPED constraint (no unnatural twisting)
1. **Walk to dock edge** — no interaction. (root motion)
2. **Sit, facing away, pointing at the sky** — a FIREWORK launches and her head points to it.
3. **Sit, facing the water** — a RIPPLE feature on the water; she reacts (head follows the ripple).
   - **v17 wired to Bob's real ripple** (`mirroredSurface-bob.js` `getActiveRipple().origin`, head-only, side profile).
   - **Rod feedback (2026-06-15, Hana):** head-tracking a spreading ripple is conceptually thin ("how would she anyway")
     and rapid per-ripple retargeting reads as head-shaking. PARK the real treatment for the FINAL-MODEL pass (calm
     general water-gaze, not edge-chasing). Facing handedness (currently right vs left) also resolves with the final
     rigged model. Fireworks + ripples firing on the same click is FINE (states react to one or the other).
4. **Sit, facing the camera** — her head follows the CURSOR (clamped, so it doesn't twist everywhere).
5. **Sit/stand on a pillar** — she POINTS (arm outstretched) at a lantern you knock/poke. STRETCH = arm IK; FALLBACK
   (if too high-scope) = she just looks at the poked lantern.
6. **Walk AWAY from the dock edge, off-screen** — no interaction. (root motion, exit)

Head-look targets per state: (2) the launched firework, (3) the ripple point, (4) the cursor world-point (uMouse),
(5) the poked lantern. In the standalone TEST, (2)/(3)/(5) use STAND-IN targets (a rising sphere / a clickable water
plane / a clickable lantern); the FINAL wires the real firework-controller, mirroredSurface water, and lanterns.
PROVENANCE NOTE: head-look = standard bone-lookAt + angle clamp (three.js standard). Water RIPPLE = NEEDS A SOURCED
technique (don't free-hand) + integrates with `mirroredSurface.js`. Arm IK (stretch) = needs a source if pursued.

### TRACKING MODES (2026-06-15, Rod) — facing drives the target; implemented in `character-scene.html`
Rod simplified the per-state look into 3 facing-keyed MODES (LOOK.mode); when a mode is on (faceMode), she is FORCED
to face that way (FACE_Y[mode] + a tunable faceOffset, since the model's forward axis is unknown):
- **cursor** — facing TOWARD the camera, head/arm track the CURSOR (uMouse). FACE_Y 0.
- **lanterns** — facing LEFT, track the NEAREST lantern (lanternController.lanterns, world pos). FACE_Y PI/2.
- **fireworks** — facing AWAY, track a LAUNCHED firework (auto-launched in mode; fireworkTarget = its endPoint). FACE_Y PI.
GUI: Tracking folder -> Mode dropdown + Force-facing + Facing-offset. In the FINAL, each of the 6 dock states maps
its facing to one of these modes automatically. (Real scene targets = lanternController/fireworkController, copied
into `redesign-lab/scene/`.)

## TEST SCENE STATUS (2026-06-14): BUILT -> `redesign-lab/character-test.html`
Standalone proof scaffold. VERIFIED (non-visual): page + importmap + three load; RobotExpressive.glb loads
(jsdelivr `/gh/mrdoob/three.js@r161/...` — the npm package omits example models); BOTH shaders compile (forced
sync render, zero GL errors); 5-state machine + clips bound; bbox normalization sane (sample geometry is ~0.01u,
now mapped to 0..1 so noise is scale-independent — works for any future model).
NOT verifiable here: the actual motion — the preview tab runs HIDDEN so rAF is paused. Needs Rod's eyes in a
foreground browser. Live tuning knobs exposed on `window.__char.U` (uFreq/uEdge/uContactStrength/uRadius/
uRiseStrength) + `window.__char.DUST` (uSize/uWindow/uDrift). Placeholder is flat near-white, NOT the 4-zone SY
palette yet.

## Full Three.js rework scope + AGENT OWNERS (context from Rod, 2026-06-15)
The dock-scene rework is **5 workstreams, one agent each** (Rod's convention so the shared memory/log files stay
attributable — every agent SIGNS its entries). **I am Hana (this lane).** Sign all my changelog/spec/log entries "Hana".
1. **Water rework (with ripples)** — agent **bob**. State-3's water-ripple reaction RIDES this; do NOT free-hand a
   separate ripple — the character's "watch the water" head-look hooks into bob's reworked water ripple, via `mirroredSurface.js`.
2. **Firework rework (remove artifacts)** — agent **jane**. Character fireworks-mode hooks into `firework-controller.js`;
   the burst-tracking (v10) may need re-wiring after jane's changes land.
3. **Lantern optimization** — agent **sarah**.
4. **Fireflies rework** — agent **Lucifer**. NOTE: my v11 only PORTED Rod's EXISTING embers into the lab dock scene
   (faithful copy) so it matches the About scene — that is NOT the rework; Lucifer owns the real firefly rework.
5. **Character + animation rework** — agent **Hana** = THIS work (the dissolve spirit + 6 dock states + tracking).

## ARM POINTING — "only point at what they can see" (Rod, 2026-06-15)
Per-state gate: the arm only engages when there is a CURRENTLY-PERCEIVABLE target, and EASES back to the animation
pose otherwise (no snapping, no frozen hold). Per mode:
- **fireworks** — engage ONLY while a firework is in `phase==='explode'` (the visible burst); target = its static
  `endPoint`. While rockets rise / between bursts -> relax. (Fixes the up/down rising-rocket snap.)
- **cursor** — cursor is always visible -> engaged (once moved).
- **lanterns** — the nearest/poked lantern is visible -> engaged.
IK (less-mechanical): replace the dead-straight collinear aim with **CCDIKSolver** (three.js `examples/jsm/animation/
CCDIKSolver.js`, approved 2026-06-15) that keeps a natural elbow bend, blended in by an eased engage weight (0<->1)
driven by the gate. Staged: v10 = gate + eased weight (snap fix); v11 = CCDIK bend.
**HEAD = BLEND, not override (Rod 2026-06-15):** the anim clips will move the head a little, so the head-look must
SLERP-blend the look-quat against the post-mixer animated head pose (weighted by the engage gate + a max-look weight),
not `bone.quaternion.copy` it. Head always retains its animated motion; the look adds on top. (Current `aimBone`
hard-overwrites -> must change for v10/v11.)
