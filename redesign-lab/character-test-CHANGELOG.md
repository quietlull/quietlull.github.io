# character-test.html — version log

Each build point is frozen as `character-test-vN.html` so regressions are diffable. `character-test.html` is the
working tip (= latest). Mechanical verify per point (can't screenshot — headless tab pauses rAF): `composer.render()`
no-throw (shaders compiled) + `console warn` clean + uniform probes. **Visual call is Rod's.**

- **v1** — baseline (the as-handed-off scene: GPU age-based petal dissolve, model/anim/position swap, petal density).
- **v2 — Point 1: FLOW FIELD restored.** Recovered the Codrops `dissolve-ref` flow (velocityFactor x/y +
  `calculateWaveOffset` multi-frequency spatial sine field) that the age-based rewrite dropped. Adapted CPU
  per-frame integration -> GPU age-driven, so progress-independence is preserved (NO reintroduced band gating).
  New uniforms `uFlowX`(2.5)/`uFlowY`(2.0)/`uWave`(1.0) + GUI; particle base velocity now matches the reference
  (vx/vy 0.5-1, vz tiny); `uDrift` default 0.5->0.12 to keep total displacement sane with the larger flow magnitude.
  Provenance: REMIX of dissolve-ref (True, Codrops/Jatin Chopra). VERIFIED: shaders compile, 0 warns, uniforms live.
- **v3 — Point 2: CURSOR REPULSION.** Petals nudged AWAY from the mouse (like the lantern/firefly avoidance).
  `uMouse` (shared in U) set on `pointermove` by raycasting the cursor onto a plane through the orbit target at
  the character's depth; particle shader adds `normalize(worldPos-uMouse) * (1-clamp(d/uMouseRadius)) *
  uMouseStrength`. GUI: Mouse Push / Mouse Radius. VERIFIED: render no-throw, pointermove maps center->(0,1.4,0).
- **v4 — Point 3: CLICK-CENTERED DISSOLVE.** Click raycasts the model -> `uClickPoint`; dissolve threshold biased
  by distance from it on BOTH body (new `varying vWorldPos` = skinned world pos, injected after
  `<skinning_vertex>`) and particle `age` (from skinned worldBase), so it blooms outward from the contact point.
  pointerdown/up w/ 6px move + 500ms threshold so it doesn't fight OrbitControls; `onCharacterClick` hook left for
  Point 4. GUI: Click Strength / Click Radius. VERIFIED: both shaders compile, center-click raycast HIT at
  (0.005,1.453,0.43), uClickPoint updated. Provenance: bias math per handoff spec, riding the Codrops dissolve.
- **v5 — Point 4: STATE-MACHINE CYCLE.** Replaced the progress-bounce with phases: idle (CYC.dwell s) -> dissolve
  OUT (ramp uProgress -17->17 at CYC.speed) -> gap (CYC.gap s) -> swap STATE {model,anim,pos} (async-safe via
  `_onLoaded`) -> dissolve IN (17->-17) -> idle. `onCharacterClick` skips the dwell (click dissolve = radial from
  contact; timer dissolve = uniform, uClickPoint reset far). uProgress init -17 (starts visible). GUI: Cycle toggle
  + Idle/Gap/Dissolve-speed. VERIFIED: __s set (=> buildGUI+state machine ran w/o reference error), shaders
  compile, 0 console errors, cycle flag on. NOTE: rAF is paused in the headless preview, so the cycle MOTION is
  unverified mechanically — needs Rod's eyes.

- **v6 — FOUNDATIONAL pass (agreed concept, post sign-off).** (1) Base model -> **Xbot** (Rod's call; placeholder
  for all states). (2) **White** dissolve band (uEdgeColor #fff) + **white** petals (uColor #fff). (3) Petal size
  280->**120**. (4) **Flow rework**: removed the wrong per-petal repulsion; default flow dir = straight up [0,2];
  Tweakpane **XY grid** for flow dir; **global mouse-bend** (`uFlowBias`, JS-computed = away from cursor * mouseFlow).
  (5) **Dissolve origin** unified: rise-from-feet via bind-local height bias `uRiseStrength*(1-heightNorm)` (always
  on -> feet dissolve first on OUT, materialize last on IN = top-down) + body-spanning radial click
  (`uClickRadius` 2->5, `uClickStrength` 6->16); same bias mirrored into petal age. P_VISIBLE -17->**-30** (so she's
  fully solid at rest despite the rise offset), CYC.speed 9->12. State machine toggles: timer OUT = rise+uniform;
  click OUT = pure radial (rise temporarily 0); IN = rise restored (top-down). `uBindFeetY/uBindHeight` from the bind
  bbox. VERIFIED: both shaders compile, 0 warns, Xbot loaded, all uniforms correct (rise 12, clickR 5, white, size
  120, flow [0,2], flowBias wired, repulsion gone). NOTE: motion/visual = Rod's call (rAF paused in headless).

- **v7 — two fixes + flow-sign.** (1) MOUSE FLOW reworked: was a full-strength world-space bias with a Y component
  (fought the rise) that flipped at center; now a HORIZONTAL-only lean (`y=0`) away from the cursor with smooth
  distance falloff `-dir * mouseFlow/(1+hd*0.5)` (no flip). (1b) `uFlowSign` (+1 OUT / -1 IN) reverses the BASE flow
  on materialize so petals CONVERGE; mouse bias added AFTER (un-reversed). (2) CLICK now DRIVES the dissolve:
  `uClickActive` (1 during click-OUT) collapses noise amp via `mix(1, uClickNoiseScale=0.12, uClickActive)` so
  distance-from-click dominates and noise -> edge jitter (Rod's "turn off freq/amp" finding, now a live `Click Noise`
  knob); radius already spans the body (5). State machine sets uFlowSign/uClickActive per phase. VERIFIED: shaders
  compile, flowBias horizontal `(-0.41,0,0)` away from a right-side cursor, 0 warns.

- **v8 — GUI fix + remove Click Noise.** The Tweakpane panel was 932px and overflowed short viewports (controls
  cut off the bottom, "I don't see it"). Added `.tp-dfwv { max-height: calc(100vh - 16px); overflow-y: auto }` so it
  caps to the window and scrolls. Removed the **Click Noise** slider; `uClickNoiseScale` defaulted to **0** = pure
  white click front (no noise), Rod's preferred look. VERIFIED: 26 controls, Click Noise gone, overflow-y auto, render ok.

- **v9 — head + arm tracking + mouse-flow snap fix.** (a) Mouse-flow SNAP at center fixed: was `-normalize(offset)`
  (direction flipped 180deg at full magnitude through center); now scales the RAW offset `-offset*mouseFlow/(1.5+hd)`
  so the bias passes smoothly through ZERO at her center. uMouse init -> her center (no lean before first move).
  (b) HEAD + ARM tracking: `aimBone()` (standard three.js worldToLocal + setFromUnitVectors + angle clamp + persistent
  slerp smoothing), applied AFTER mixer.update so it overrides the animation. Bones `mixamorigHead` + `mixamorigRightArm`.
  Target = cursor world point for now. Tracking GUI folder: Head/Arm toggles, Max angle, Smooth, and HeadFwd/ArmFwd
  axis pickers (-1/0/1) — Rod flips these so the bone forward actually points at the cursor (Mixamo bones don't share
  a forward axis, and I can't see it). VERIFIED: bones found, head quat shifts 0.59 over 30 frames toward the cursor,
  0 errors. Visual correctness (which axis) = Rod's tune.

- **v10 — click-delay fix + arm pointing.** (a) The click "delay" was uProgress sitting at idle -30 (needed for
  rise-mode rest-visibility) while click mode needs ~-16 to begin -> ~1s dead ramp. Fix: on click, JUMP uProgress to
  `-uClickStrength+1` (front starts immediately) and end the click OUT at `uProgress 2` (not the rise-mode max 17),
  since click mode has no noise so she's fully gone by ~0. The GAP is unchanged (still only the post-full-dissolve,
  pre-reappear pause). (b) ARM now POINTS: the single upper-arm aim just swiveled because the animated elbow stayed
  bent; now the forearm (`mixamorigRightForeArm`) is slerped toward identity (straightened) during arm-tracking, THEN
  the upper arm aims -> the whole arm extends and points. VERIFIED: forearm found + straightening (0.066/30f), render
  ok, 0 errors. (Arm forward axis still Rod's tune via ArmFwd knobs.)

## character-scene.html — DOCK SCENE INTEGRATION (separate file; character-test.html stays the pure component)
- **scene-v1 (2026-06-15)** — Rod chose "full dock scene, scale her up into it." Copied his REAL scene modules into
  `redesign-lab/scene/` (three-shared, lantern-controller, firework-controller, three-config, shaders) — provenance:
  his code, faithful `cp`. `character-scene.html` = character-test + the real scene: far camera (0,120,500), navy bg,
  CONFIG bloom, `LanternController` + `LanternMaterialManager` + `FireworkController` + FBX lanterns/dock/water +
  `MirroredSurface`. Character scaled to REF=120 (charScale ~66x) onto the dock; scene-scale defaults (uClickRadius
  120, uBaseSize 5000, uDrift 3, uSway 8) + GUI ranges, all TUNABLE. Custom loop: controllers get normalizedDelta
  (dt*60), character gets seconds. VERIFIED: loads, renders no-throw, 4 scene groups present (lanterns 8 / dock 33 /
  water 1 / character), 0 errors. NOTE: all scale/placement defaults are GUESSES — Rod tunes by eye (position, petal
  size/drift, click radius, camera). The convention mismatch (build centers her; setPosition sets root directly) is
  fine since placement is eyeballed. NEXT: wire head->firework + arm->knocked-lantern (currently both track cursor);
  real 6 dock states + facings; then port to the real three-background-scene.js (branch/merge/push) once Rod's happy.

- **scene-v3 (2026-06-15)** — bloom reverted to the ORIGINAL scene value (CONFIG 1.4/0.3/0.45; Rod: keep original) +
  a live Scene/Bloom slider. **TRACKING MODES** (the integration): LOOK.mode cursor/lanterns/fireworks, each FORCES
  facing (FACE_Y 0/PI-half/PI + tunable faceOffset) and sets the head/arm target — cursor=uMouse, lanterns=nearest
  lantern (lanternController), fireworks=auto-launched firework endPoint. GUI Tracking: Mode dropdown + Force-facing +
  Facing-offset. `window.__s` now exposes LOOK/bloom/controllers for testing. VERIFIED: render no-throw, facing snaps
  cursor->0 / lanterns->1.57 / fireworks->3.14, lantern target resolves to a real lantern, 0 errors. NOTE: bloom reads
  were noisy during edits (Jekyll mid-rebuild) but settle to 1.4. Forward axes (HeadFwd/ArmFwd) + faceOffset still
  Rod's visual tune. States recorded in character-spec.md "TRACKING MODES".

- **scene-v5 (2026-06-15) — PROPER arm pointing.** Diagnosis: the old arm aim GUESSED a forward axis (ArmFwd) but a
  Mixamo arm bone's down-the-bone axis is a DIAGONAL (no clean ±1 ever aligns -> why Rod's flipping never worked) and
  it only aimed the upper arm. FIX: derive each bone's real axis from the rig (armChildDir = normalize(foreArm.position),
  foreChildDir = normalize(hand.position)) and aim BOTH upper arm + forearm at the target (`aimArm` -> `aimSeg`, no
  clamp). The whole arm becomes a straight shoulder->target line. VERIFIED definitively: shoulder->hand vs
  shoulder->target dot = 1.0 (points exactly at the target). Removed the obsolete ArmFwd/armMaxAngle GUI knobs. Bloom
  default 0.25. Also: dedicated `character-scene-HANDOFF.md` written (scoped, parallel to Rod's redesign).

- **scene-v6 (2026-06-15) — firework LIVE tracking.** Was pointing at a static endpoint; now `updateFireworkTarget()`
  (called each frame in fireworks mode, after the controller advances) follows the latest RISING rocket's live
  position = `lerp(startPoint, endPoint, rocket.trail.uProgress)`. VERIFIED: target lerps start(-100)->mid(312)->
  end(724) with progress 0/0.5/1.0. (Rocket rises on wall-clock time, so a tight probe loop can't advance it — tested
  by setting uProgress directly.) `__s` exposes launchTrackedFirework + updateFireworkTarget.

- **scene-v7/v8/v9 (2026-06-15) — fireworks tracking polish.** v7: track only HER auto-launched firework (trackedFw),
  not cursor-launched ones (arm verified dot=1.0 to firework, ~0 to cursor even facing away -> earlier "snap to cursor"
  was a STALE CACHE). v8: added `<meta Cache-Control no-store>` (stop serving stale pages -> no hard-refresh) +
  continuous launch (one of hers always rising). v9: Rod's catch — rockets launch from BELOW the dock (start y=-100)
  so tracking off the pad pointed her DOWN. Fix: clamp fireworkTarget.y >= FW_FLOOR(100) + freeze the target when her
  rocket isn't rising (pooled objects reset on reuse). VERIFIED: launch y -100 -> clamped 100, mid 368, top 837,
  frozen-on-explode. She never aims below the horizon now.

- **scene-v10 (2026-06-15, Hana) — arm/head ENGAGE GATE + firework burst fix + head BLEND.** Rod: "only point at what
  they can see"; the arm was snapping up/down tracking the RISING rocket. FIX: (a) `getEngage()` returns
  {engaged,target} per mode — fireworks engages ONLY when her tracked rocket hits `phase==='explode'` (a VISIBLE
  burst), target = its STATIC `endPoint` (no rising-rocket lerp); cursor engages after first move; lanterns = nearest
  REAL lantern (embers skipped via `userData.isEmber`). (b) `LOOK.weight` eases 0<->1 by `engageSpeed` (new GUI knob)
  so the arm RAISES/RELAXES smoothly instead of snapping. (c) HEAD now BLENDS (Rod: clips will animate the head a
  little): `aimBone`/`aimSeg` capture the post-mixer animated pose (`_animQ`) and `slerp(anim, look, weight)` instead
  of overwriting -> the head keeps its animated motion, the look adds on top. VERIFIED mechanically: render no-throw,
  0 errors; fireworks weight 0->0.916 while exploding, decays to 0.077 when merely rising; target = static endPoint
  (41.2,629.9,-99.8); cursor 0 (no move) -> 0.916 (moved); lanterns -> 0.71 (real lantern). Visual call = Rod's.
  Straight-arm aim unchanged this step (still collinear) -> v12 swaps it for CCDIK bend. NEXT (v11): fireflies.

- **scene-v11 (2026-06-15, Hana) — fireflies (embers) added to the dock scene.** Faithful copy of Rod's About-scene ember
  block (`three-background-scene.js:67-93`, provenance: his code): 25 `SphereGeometry(5,8,6)` meshes, lantern flicker
  material via `lanternMaterialManager.createMaterialForMesh` (baseColor #fff4cc, gradientStart/End 1.0/0.35,
  randomized flickerSpeed/Amount/ColorShift), placed x ±300-800 / y -50..400 / z -50..-400, `floatScale` randomized,
  added to `lanternController` (so the existing loop animates float/avoid + flicker) + `scene`. ONLY addition =
  `userData.isEmber` so the character's lantern-tracking skips them as point targets. VERIFIED: 25 embers, all 25 with
  shader uniforms, all 25 in scene; lanterns-mode target is a NON-ember (skip works); render no-throw, 0 errors. Visual
  call = Rod's (placement/density are at his scene's scale — tune if needed). NEXT (v12): CCDIK arm bend.

- **scene-v12 (2026-06-15, Hana) — CCDIK arm bend (less mechanical, Rod-approved).** Replaced the dead-straight
  collinear 2-bone aim with three.js `CCDIKSolver` (`three/addons/animation/CCDIKSolver.js`): effector =
  `mixamorigRightHand`, links = [forearm, upper arm], target = a new `ikArmTarget` Bone placed at the world look-target
  each frame -> CCD bends forearm + upper arm so the hand reaches it. SAFE skeleton add (the pitfall): pushed the target
  bone to `skeleton.bones` AND a matching `Matrix4` to `skeleton.boneInverses`, so `skeleton.update()` never hits an
  undefined inverse. Solve is smoothed across frames (persistent `ikQ` slerp) then BLENDED over the animated pose by the
  v10 engage weight (raises/relaxes with the gate). Old straight aim kept as fallback (`LOOK.useIK` off / no solver).
  GUI: 'Arm IK (CCDIK)' toggle + 'IK iterations'. Links are LIMIT-FREE for now -> per-joint elbow rotation limits are
  Rod's visual tune (the bend axis is rig-dependent; can't set blind). VERIFIED mechanically: ikReady true; render
  no-throw BEFORE + AFTER 80 IK frames (skinning intact); boneCount == boneInverses == 68 (matched); weight -> 0.993;
  hand points dot = 1.0 at target; 0 console errors. Bend QUALITY = Rod's call (CCD straightens for far targets, bends
  for near). NEXT: the real 6 dock states (character-spec FINAL OUTPUT).

- **scene-v13 (2026-06-15, Hana) — firework pointing ACTUALLY fixed + per-state tracking-off + cursor front-Z flip.**
  ROOT CAUSE of the ~5-attempt firework failure (traced by me + TWO independent subagents, all three converged): the
  relaunch gate keyed on `!rising`, and `fwTimer = 0.8s` ~= the rocket's ~0.75s launch time (launchSpeed 0.4 /
  explosionDelay 0.3), so `launchTrackedFirework()` reassigned `trackedFw` to a fresh launch rocket ~0.05s AFTER the
  burst -> `getEngage` saw `phase==='explode'` for only ~3 frames -> `LOOK.weight` (eased 0.06/f) peaked ~0.17 -> an
  imperceptible twitch, never a point. GEOMETRY WAS NEVER THE PROBLEM (world-space IK target, high +Y endPoint); every
  prior axis/faceOffset attempt was doomed. FIX: relaunch gate is now `busy = trackedFw in group && (phase 'launch' OR
  'explode')` -> holds `trackedFw` through the full ~1.2s burst -> engaged ~1.2s -> weight -> ~1 -> a full, held point.
  TRADEOFF: fireworks are now one-at-a-time (synced to her point); a richer ambient sky can be decoupled later.
  (2) `none` tracking mode: `getEngage` returns disengaged + `faceMode` guarded against undefined `FACE_Y` -> a state
  can fully disable head+arm (for walk states 1 & 6 "no interaction"). (3) cursor `frontZFlip` (default on): in
  cursor/front facing she points TOWARD the viewer -- mirror the cursor world point's Z about her depth
  (`2*rootZ - z`), since she faces +Z but the raycast world point sat behind her (Rod's call). GUI: Mode dropdown gains
  'None (off)'; new 'Cursor Z-flip (front)' toggle. VERIFIED mechanically: render no-throw, 0 errors; none -> weight
  0.6->0.027 + facing finite; Z-flip target.z = 2*charZ-uz (on) / = uz (off); firework busy=true + weight 0->0.976 over
  the held burst. Visual call = Rod's. NEXT: the real 6 dock states (each maps facing->mode; walk states use 'none').

- **scene-v14 (2026-06-15, Hana) — calm arm + main-site scroll-camera lock.** Rod: motion too fast/snappy, and the
  free-orbit camera made it hard to judge from the real view. (1) CALM: `LOOK.engageSpeed` 0.06->0.03 (slow raise/relax)
  + `LOOK.smooth` 0.15->0.07 (slow hand-follow) so she glides, not snaps (both still GUI-tunable). (2) CAMERA: replaced
  free OrbitControls with his `setupScrollCamera` (provenance: three-shared.js) = the SAME camera as
  three-background-scene.js -> fixed Z=500, scrollY lerps camera.position.y 500->100 + rotation.x 25deg->0. Enabled page
  scroll (canvas position:fixed + a 250vh #scrollspace; removed body overflow:hidden). Free orbit demoted to an opt-in
  'Free orbit (inspect)' toggle (Scene folder, default OFF). Cursor->world plane now uses a fixed `_lookPt(0,100,0)`.
  VERIFIED: render no-throw, 0 errors; smooth 0.07 / engage 0.03; orbit off; camZ 500; scroll top y500/rx0.436 ->
  bottom y100/rx0. Visual call = Rod's. STILL OPEN (Rod to re-judge from this fixed view): pointing to screen-LEFT
  barely moves the arm / loses the illusion -- likely the RIGHT arm can't cross the body to its far side + limit-free
  CCD; fix options = accept human-like cross-body limit, or add a LEFT-arm chain and point with whichever reaches.

- **scene-v15 (2026-06-15, Hana) — fireworks pushed out (left/right reads) + track the LATEST burst (any source).**
  Rod: arm "barely changes trajectory / doesn't track left-right" + "push fireworks further, z -1000 min." DIAGNOSED via
  probe (not a guess): the arm DOES follow the target, but the old spawn burst nearly OVERHEAD (y 600-1000, z -50..-200)
  so she pointed ~straight up every time (both L/R dirs y~0.95, x lean tiny, dot 0.87). FIX: spawn far + lower + wide via
  a tunable `FW` { xSpread 800, yMin 300, yRange 400, zMin 1000, zRange 600 } -> z -1000..-1600, y 300-700, x ±400 ->
  arm points OUTWARD (z -0.9, y 0.25) so the horizontal swing reads (verified L x-0.36 -> R x+0.35, xSwing 0.71). New
  GUI 'Fireworks spawn' folder (X spread / Y min / Y range / Z dist / Z range). ALSO: `updateFireworkTarget` now scans
  the group NEWEST-first and points at the latest BURSTING firework from ANY source (her auto OR cursor clicks) -> she
  tracks the latest burst, not only her auto one (verified: picks newest of two simultaneous bursts). `trackedFw` is now
  just auto-launch pacing. VERIFIED: render no-throw, 0 errors. Visual call = Rod's.

- **scene-v16 (2026-06-15, Hana) — water-watching state (state 3 stand-in).** Rod: implement the water-watching state
  now (the real ripple = Bob's water track, later); for now she looks at WHERE HE CLICKS on the water. New `water`
  tracking mode: side-profile facing (FACE_Y PI/2), HEAD-ONLY (arm gated off in water mode -> she watches, doesn't
  point), engages after the first click. `pointerdown` raycasts the click onto the (now module-hoisted) `waterMesh`; the
  hit point -> `clickTarget` -> clamped head-look follows it. GUI Mode dropdown gains 'Water (watch click)'.
  `lookAtWater(x,y,z)` test hook + `clickTarget` on `__s`. VERIFIED: render no-throw, 0 errors; rests before click
  (weight 0), facing 1.571; after click weight 0.936, head turns toward the point, IK arm untouched (head-only), target
  = clicked point. NOTE: head FORWARD AXIS (`LOOK.headFwd`) is still Rod's visual tune if the head doesn't visibly face
  the click; and the firework-controller's click handler still launches a firework on every click (pre-existing) — can
  gate it to fireworks-mode only if distracting. REMAINING states: locomotion enter/exit (root motion, Rod's clips) +
  real water ripple (Bob).

- **scene-v17 (2026-06-15, Hana) — water state wired to Bob's REAL ripple (flip approved by Rod).** Swapped the v16
  click stand-in for Bob's reworked water. Import `./scene/shader/mirroredSurface.js` -> `mirroredSurface-bob.js`
  (drop-in: same constructor/`update()`; this ALSO switches the rendered water to Bob's rework LOOK). `water`-mode
  `getEngage` now reads `mirroredSurface.getActiveRipple()` -> engaged at `.origin` while active (null past uRippleLife
  ~4s -> head rests), mirroring fireworks. `pointerdown` in water mode calls `mirroredSurface.spawnRipple(hit.point)`
  (his module doesn't self-handle clicks) so clicking the water makes a REAL ripple she watches; `lookAtWater(x,y,z)`
  test hook now fires a real ripple. Removed `clickTarget`/`waterClicked`; `__s.getActiveRipple()` probe added.
  VERIFIED: Bob's module loads + renders no-throw, 0 errors; spawnRipple->getActiveRipple origin [250,0,150]; water
  weight 0->0.936; head turns toward the ripple; IK arm untouched (head-only). Cross-agent contract = Bob's
  getActiveRipple()/spawnRipple. Visual call = Rod's (incl. Bob's new water look, now active). NOTE: clicking in water
  mode now spawns a ripple AND (pre-existing) launches a firework via the controller's click handler -> can gate
  firework-on-click to fireworks mode if that double-effect is distracting. REMAINING: locomotion enter/exit (root motion).

- **scene-v18 (2026-06-15, Hana) — the 6 DOCK STATE DRIVER (auto-cycle + auto facing->mode).** Extended the existing
  `stepCycle` 4-placeholder machine into the real 6 dock states (character-spec FINAL OUTPUT). Each `STATES` entry now =
  `{kind, anim, mode, facing?, pos, end?}`. New `applyState(st)` sets position + anim + `LOOK.mode` per state -> sit
  states (2-5) AUTO-force facing via faceMode (fireworks PI / water PI/2 / cursor 0 / lanterns PI/2); walk states (1,6,
  mode 'none') set facing manually + GLIDE (lerp pos->end across the dwell = root-motion stand-in until Rod's Maya
  clips). Cycle: idle(dwell; walk glides) -> dissolve OUT -> gap -> applyNextState(next pos/facing/mode/anim) ->
  materialize IN -> idle, wrapping 1..6..1. Starts on state 1 (enter walk). anim falls back to idle if a clip's missing.
  VERIFIED: render no-throw, 0 errors; advancing all 6 gives the exact table — idx0 none / 1 fireworks PI (0,40) /
  2 water PI2 (-50,30) / 3 cursor 0 (0,20) / 4 lanterns PI2 (70,0) / 5 none PI2 (0,40) / wrap none (-240,60); cycle
  wraps. POSITIONS/FACINGS/end = scene-scale PLACEHOLDERS for Rod to tune. `__s.STATES/nextState/getStateIdx` probes.
  Visual call = Rod's. REMAINING to completion: Rod's Maya clips (root-motion walk + real sit poses, Route B .glb) +
  SY 4-zone palette (multi-material model) + per-state tuning + polish (reduced-motion / culling / mobile petal cut) +
  FINAL port into three-background-scene.js (multi-agent convergence).

- **scene-v19 (2026-06-15, Hana) — firework arm HOLDS the point + switchable pointing arm (Rod test).**
  (1) HOLD: in fireworks mode, once she points at a burst she STAYS pointed at that last burst BETWEEN explosions (new
  `fwHeld` flag) — `getEngage` retargets on each new burst but never relaxes to idle. VERIFIED: weight 0->0.839 on the
  burst, then the burst clears and weight HOLDS + keeps rising to 0.974 (does NOT decay), target stays the last burst
  [300,-1000]. (2) ARM SWITCH: refactored the single right-arm CCDIK into a per-arm `buildArm(side)` -> `ARMS {right,
  left}`, each with its own IK chain + target bone; `aimArm` uses `activeArm() = ARMS[LOOK.armSide]`. New GUI 'Point arm'
  Right/Left toggle; **default set to LEFT** for Rod's test. VERIFIED: both arms build (skeleton boneCount 69 ==
  boneInverses; render no-throw; 0 errors); right + left both point dot 0.999. Return object now exposes
  `arms`/`getActiveArm` (replaced single armBone/handBone/ikTarget). Visual call = Rod's (which arm reads better).

- **scene-v20 (2026-06-15, Hana) — firework REACTION DELAY (look AFTER the burst, not on it).** Rod: she reacted on the
  same frame `phase` flips to 'explode' (= the frame the burst is created), so she anticipated. FIX: `updateFireworkTarget`
  now only treats a burst as a valid target once its `explosionClock.getElapsedTime() >= FW.react` (default 0.25s,
  tunable in the 'Fireworks spawn' GUI as 'Reaction delay (s)'). During the delay she HOLDS the previous point (v19), then
  snaps to the new burst -> reads as "burst, beat, then she looks." VERIFIED: render no-throw, 0 errors; at explosion
  (age 0) updateFireworkTarget=false, after delay (age>react)=true. Visual call = Rod's (tune the delay to taste).

- **scene-v21 (2026-06-15, Hana) — firework reaction SYNCED to each firework's own time-to-explode.** Rod: the flat
  0.25s delay wasn't long enough + firework explode-timing is VARIABLE. FIX: the reaction threshold is now
  `explosionClock.getElapsedTime() >= fw.explosionDelay / fireworkController.config.launchSpeed + FW.react` -- i.e. THIS
  firework's own time-to-explode (rise duration, variable per firework: autos ~0.75s, clicks lerp(minDelay,maxDelay))
  PLUS a tiny tunable extra (`FW.react` now 0.1, GUI 'Reaction +delay (s)'). So her reaction syncs per-firework instead
  of a flat delay. VERIFIED: render no-throw, 0 errors; auto fw (explosionDelay 0.3) reacts at 0.85s, a slower fw
  (explosionDelay 0.6) reacts at 1.6s -> different synced thresholds. Visual call = Rod's (tune the tiny extra).

## STILL TO BUILD (reactive pass, v11+) — the 6 states + per-state interactions (firework/ripple/lantern targets, walk root-motion), SY palette, reduced-motion, perf culling, dock integration, sourced water ripple
Real 6 states with `{anim, position, facing, kind, interaction}`; a CLAMPED head-look-at system; per-state targets
(2=firework stand-in, 3=ripple stand-in, 4=cursor, 5=poked-lantern stand-in); walk states 1 & 6 (root-motion when
Rod's clip lands; scripted glide stand-in on Xbot). Water RIPPLE needs a SOURCED technique + mirroredSurface
integration (don't free-hand). Arm-IK (state 5) = stretch; fallback = head look.
