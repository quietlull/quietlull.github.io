# The scene version trail, condensed

Rod, 2026-08-25: "you keep the final and keep a list of what changed so you can look it up
later." The 54 numbered snapshots that lived in this directory are deleted; the FINAL of each
family survives as the live file at the lab root, and each was verified BYTE-IDENTICAL to its
newest snapshot before anything was removed:

- `redesign-lab/character-scene.html` == `character-scene-v21.html`
- `redesign-lab/character-test.html` == `character-test-v10.html`
- `redesign-lab/water-scene.html` == `water-scene-v23.html`

Below is the mechanical diff trail: per step, the size delta, how many lines changed, and the
changed lines that carry meaning (new or altered comments, tuned constants, titles). It is
extracted from the files themselves, not remembered, so it is exactly as informative as the
code was. All snapshots are from 2026-06-15; timestamps are file mtimes.

## character-scene (v1 to v21)

- **v1** (09:59, 34.3 KB) - the starting point
- **v2** (10:18, 34.9 KB) +8/-1 lines
  - note: ONE bloom pass. Strength dropped from the site's 1.4 -> 0.7: the bright white character over-blooms at 1.4
  - note: (it's far brighter than the lanterns the site value was tuned for). Tunable live in the Scene GUI folder.
- **v3** (10:37, 37.1 KB) +44/-9 lines
  - note: MODE drives BOTH what she looks at AND (faceMode) which way she faces:
  - note: cursor   = facing TOWARD us, head tracks the cursor
  - note: lanterns = facing LEFT,      tracks the nearest lantern
  - note: fireworks= facing AWAY,      tracks a launched firework
  - fireworkTarget = new THREE.Vector3(0, 800, -100)
  - note: ONE bloom pass, using the ORIGINAL scene's bloom values (Rod: keep the original). Tunable in the Scene GUI folder.
  - (and 6 more changed lines of note)
- **v4** (10:40, 37.3 KB) +10/-9 lines
  - note: ONE bloom pass. Strength 0.25 (Rod's pick); radius/threshold from the original scene CONFIG. Tunable in Scene GUI.
  - note: straighten the elbow so the arm EXTENDS (a point), THEN aim the whole arm at the target (wide clamp)
- **v5** (10:48, 38.2 KB) +29/-17 lines
  - note: Each arm bone's REAL down-the-bone axis = the local position of its child (elbow / hand). Derived from the rig,
  - note: so no guessed forward axis is needed (Mixamo arm bones are diagonal, never a clean x/y/z axis).
  - note: Aim ONE bone so its REAL down-the-bone axis (childDir) points at the target. No clamp -> free to point anywhere.
  - note: PROPER pointing: aim the upper arm at the target, refresh, then aim the forearm at the same target from the new
  - note: elbow -> the whole arm becomes a straight line shoulder->target and the hand points at it.
  - note: HEAD still needs a forward (face) axis — flip these until her head faces the target. ARM is now rig-derived (no knob).
- **v6** (10:54, 39.0 KB) +14/-1 lines
  - note: Track the latest RISING rocket's LIVE position (lerp start->end by its trail uProgress) so she follows it going up.
  - fwg = fireworkController.fireWorkGroup
  - fw = fwg[i]
- **v7** (11:15, 39.3 KB) +10/-11 lines
  - fwTimer = 0, trackedFw = null
  - note: Follow ONLY her own tracked rocket's live position (lerp start->end by trail uProgress). Cursor-launched fireworks
  - note: are NOT tracked, so moving/clicking the mouse never snaps her arm in fireworks mode.
- **v8** (11:22, 39.6 KB) +6/-1 lines - mechanical/tuning changes only, nothing self-describing
- **v9** (11:47, 39.9 KB) +6/-5 lines
  - FW_FLOOR = 100
  - note: Only update while HER rocket is genuinely rising. When it's gone/exploded (pooled objects get reset), STOP
  - note: updating so the target stays frozen near the last burst (up) instead of snapping down to a reset/relaunch.
- **v10** (12:39, 41.3 KB) +46/-33 lines
  - lookTarget = new THREE.Vector3()
  - _animQ = new THREE.Quaternion()
  - note: What she aims at + whether there's a CURRENTLY-VISIBLE target ("only point at what she can see"), per mode.
  - bd = Infinity, found = false
  - d = _ltmp.distanceToSquared(cp)
  - note: Point at a firework ONLY when it actually GOES OFF: her tracked rocket reaches 'explode'. Target = its static burst
  - (and 4 more changed lines of note)
- **v11** (12:42, 42.5 KB) +27/-0 lines
  - note: Embers — white-yellow fireflies with organic, alive movement.
  - note: Faithful copy of Rod's About scene `three-background-scene.js:67-93` (provenance: his code). The only addition is
  - note: `userData.isEmber` so the character's lantern-tracking skips them as point targets (they float + flicker, not poke).
  - EMBER_COUNT = 25
  - emberGeometry = new THREE.SphereGeometry(5, 8, 6)
  - mesh = new THREE.Mesh(emberGeometry)
  - (and 4 more changed lines of note)
- **v12** (12:57, 45.1 KB) +39/-6 lines
  - note: --- CCDIK arm chain (three.js CCDIKSolver) so the arm BENDS naturally instead of a dead-straight collinear aim ---
  - ikSolver = null, ikTarget = null
  - note: CCDIK pointing: the hand reaches toward the world target; CCD bends forearm + upper arm to get there (natural,
  - note: not a dead-straight board). Blended over the animated pose by the engage weight. Old straight aim = fallback.
- **v13** (13:40, 46.0 KB) +15/-7 lines
  - note: HOLD the tracked firework through its WHOLE life (launch AND explode) so she has the full ~1.2s burst to point at.
  - note: Bug fixed (v13): relaunching at 0.8s ~= the 0.75s launch time stole trackedFw ~0.05s into the burst -> arm never engaged.
- **v14** (13:51, 47.0 KB) +19/-11 lines
  - note: DEFAULT view = the site's scroll camera (same as three-background-scene.js -> setupScrollCamera). Free orbit is opt-in inspect.
  - CAM = { freeOrbit: false }
  - scrollCam = setupScrollCamera(cam)
  - _lookPt = new THREE.Vector3(0, 100, 0)
- **v15** (16:04, 47.9 KB) +25/-11 lines
  - fwTimer = 0, trackedFw = null
  - ex = (Math.random()-0.5)*FW.xSpread
  - ey = FW.yMin + Math.random()*FW.yRange
  - ez = -FW.zMin - Math.random()*FW.zRange
  - note: Point at the LATEST firework that's actually BURSTING — any source (her auto-launches OR cursor clicks), newest
  - note: first. Target = its static burst center (endPoint) -> no rising-rocket lerp, no cursor snap. False if none bursting.
  - (and 2 more changed lines of note)
- **v16** (16:13, 49.1 KB) +21/-6 lines
  - mirroredSurface = null, waterMesh = null
  - note: WATER-WATCHING state (state 3 stand-in until the real water ripple lands — Bob's track). She watches WHERE YOU CLICK
  - note: on the water: raycast the click onto the water mesh, head-look at that point (arm stays down; she watches, not points).
  - clickTarget = new THREE.Vector3()
  - waterClicked = false
- **v17** (21:32, 49.4 KB) +9/-10 lines
  - note: WATER-WATCHING state (state 3) — wired to Bob's REAL ripple (mirroredSurface-bob.js). Clicking the water SPAWNS a
  - note: ripple (his module doesn't self-handle clicks); getEngage() then head-looks at the latest active ripple's origin.
- **v18** (21:46, 51.2 KB) +28/-16 lines
  - note: kind 'walk' = glide stand-in (real root-motion clip later): lerps pos -> end across the dwell; mode 'none' (no head/arm).
  - note: kind 'sit'  = materialize at pos -> idle the clip -> dwell -> dissolve; mode AUTO-forces the facing (faceMode).
  - names = character.animNames
  - model = st.model || 'Xbot'
  - st = STATES[stateIdx]
  - t = Math.min(1, phaseT / CYC.dwell)
- **v19** (21:58, 51.6 KB) +44/-37 lines
  - skinned = null, best = 0, headBone = null
  - _bones = {}
  - note: --- CCDIK chain per ARM (three.js CCDIKSolver) so the arm BENDS naturally; LOOK.armSide picks which arm points. ---
  - note: Each bone's REAL down-the-bone axis = the local position of its child (rig-derived; Mixamo arm bones are diagonal).
  - ikTarget = new THREE.Bone()
  - A = activeArm()
- **v20** (22:02, 51.9 KB) +4/-2 lines - mechanical/tuning changes only, nothing self-describing
- **v21** (22:09, 52.0 KB) +5/-4 lines
  - note: REACTION DELAY synced to THIS firework's own time-to-explode (explosionDelay/launchSpeed, variable per firework) + a tiny extra:

## character-test (v1 to v10)

- **v1** (03:05, 18.7 KB) - the starting point
- **v2** (03:07, 19.5 KB) +17/-8 lines
  - note: Flow-field base velocity (verbatim from Codrops dissolve-ref: vx/vy random 0.5-1, vz tiny).
  - note: FLOW FIELD restored from Codrops dissolve-ref (velocityFactor + calculateWaveOffset),
  - note: adapted from CPU per-frame integration to GPU age-driven (keeps progress-independence).
- **v3** (03:10, 20.8 KB) +20/-0 lines
  - note: Cursor -> world point at the character's depth (drives petal repulsion, Point 2).
  - note: Cursor repulsion — nudge petals AWAY from the mouse (like the lantern/firefly avoidance).
- **v4** (03:13, 22.6 KB) +31/-6 lines
  - note: Click ON the model -> world hit point -> uClickPoint (dissolve origin). Point 4 wires onCharacterClick.
  - onCharacterClick = null
  - _downX = 0, _downY = 0, _downT = 0
- **v5** (03:17, 24.8 KB) +61/-11 lines
  - cb = _onLoaded
  - note: ---------- Point 4: state-machine cycle ----------
  - note: idle X s -> dissolve OUT -> gap -> swap (model+pos+anim) -> dissolve IN -> idle ...; click skips the dwell.
  - P_VISIBLE = -17, P_DISSOLVED = 17
  - CYC = { dwell: 6.0, gap: 0.8, speed: 9.0 }
  - note: timer dissolve = uniform; click dissolve radiates from the contact point (uClickPoint already set by the handler)
  - (and 1 more changed lines of note)
- **v6** (04:10, 26.8 KB) +55/-38 lines
  - mouseFlow = 1.0
  - note: global flow bend = direction AWAY from the cursor (from cursor back toward her center), scaled small
  - note: dissolve ORIGIN: rise-from-feet (height bias, always on) + radial-from-click (body-spanning)
  - REF = 5.0, PMIN = -32, PMAX = 17
  - note: ORIGIN BIAS: rise-from-feet (feet dissolve first / materialize last) + radial-from-click (body-spanning).
  - note: bind-pose height extent -> feeds the rise-from-feet origin (stable regardless of pose/world position)
  - (and 6 more changed lines of note)
- **v7** (04:33, 28.4 KB) +26/-10 lines
  - note: global flow bend: a HORIZONTAL lean of the whole stream AWAY from the cursor, stronger as the cursor nears her,
  - note: fading with distance. Y is zeroed so it never fights the vertical rise; falloff is smooth so it can't flip at 0.
  - hd = _bendTmp.length()
  - note: In CLICK mode the noise amplitude collapses (mix -> uClickNoiseScale) so DISTANCE-from-click drives the
  - note: whole dissolve and the noise is only a thin edge jitter. Otherwise full noise (the crumbly rise dissolve).
  - note: uFlowSign reverses the BASE flow on dissolve-IN (petals converge, not scatter); uFlowBias (mouse) is
  - (and 1 more changed lines of note)
- **v8** (04:50, 28.5 KB) +3/-2 lines
  - note: let the Tweakpane panel scroll instead of overflowing off-screen (it's taller than short viewports)
- **v9** (04:57, 31.2 KB) +54/-11 lines
  - mouseFlow = 1.0
  - mouseMoved = false
  - note: Head/arm tracking config (GUI-exposed). Forward axes are TUNABLE because Mixamo bones don't share a forward axis.
  - _IDENTITY = new THREE.Quaternion()
  - note: HORIZONTAL lean away from the cursor. Scale the RAW offset (NOT normalized) so the bias passes smoothly through
  - note: ZERO at her center instead of snapping 180deg; magnitude grows 0 -> ~mouseFlow with distance.
  - (and 2 more changed lines of note)
- **v10** (05:03, 31.9 KB) +19/-6 lines
  - note: straighten the elbow so the arm EXTENDS (a point), THEN aim the whole arm at the target
  - note: click mode has no noise so she's fully gone by ~uProgress 0; don't ramp to the rise-mode max (dead time).

## water-scene (v1 to v23)

- **v1** (13:44, 7.7 KB) - the starting point
- **v2** (15:56, 8.4 KB) +14/-5 lines
  - U = mirroredSurface.material.uniforms
- **v3** (16:30, 9.5 KB) +38/-18 lines - mechanical/tuning changes only, nothing self-describing
- **v4** (16:44, 9.8 KB) +6/-2 lines - mechanical/tuning changes only, nothing self-describing
- **v5** (17:17, 10.3 KB) +7/-2 lines - mechanical/tuning changes only, nothing self-describing
- **v6** (17:31, 10.4 KB) +2/-1 lines - mechanical/tuning changes only, nothing self-describing
- **v7** (17:52, 9.6 KB) +4/-15 lines - mechanical/tuning changes only, nothing self-describing
- **v8** (17:57, 9.7 KB) +5/-3 lines - mechanical/tuning changes only, nothing self-describing
- **v9** (17:57, 9.7 KB) +0/-0 lines - mechanical/tuning changes only, nothing self-describing
- **v10** (17:57, 9.7 KB) +0/-0 lines - mechanical/tuning changes only, nothing self-describing
- **v11** (18:14, 11.5 KB) +26/-1 lines
  - note: Click/tap a point on the water -> spawn a ripple there. Raycast the water plane (same idea as lantern-controller).
  - _wPlane = null, _dx = 0, _dy = 0, _dt = 0
- **v12** (18:23, 11.6 KB) +2/-1 lines - mechanical/tuning changes only, nothing self-describing
- **v13** (18:40, 13.7 KB) +42/-6 lines
  - note: Water interaction: click = ripple (+ unlock counter). Once UNLOCKED, hover = localized noise distortion.
  - waterClicks = 0, hoverUnlocked = false
  - HOVER = { unlockAt: 5, forceUnlock: false }
  - hud = document.getElementById('hud')
  - hit = rayToWater(e.clientX, e.clientY)
- **v14** (18:45, 14.3 KB) +11/-3 lines
  - hit = rayToWater(e.clientX, e.clientY)
  - note: leave a propagating WAKE: deposit a ripple each time the cursor travels far enough -> persists + spreads after the cursor moves on
- **v15** (21:01, 11.6 KB) +7/-51 lines
  - note: Click/tap a point on the water -> spawn a ripple there (raycast the water plane; lantern-controller pattern).
- **v16** (08:37, 11.7 KB) +2/-1 lines - mechanical/tuning changes only, nothing self-describing
- **v17** (08:42, 11.7 KB) +2/-2 lines - mechanical/tuning changes only, nothing self-describing
- **v18** (08:57, 11.9 KB) +6/-4 lines - mechanical/tuning changes only, nothing self-describing
- **v19** (09:09, 12.3 KB) +5/-0 lines - mechanical/tuning changes only, nothing self-describing
- **v20** (09:26, 12.6 KB) +7/-2 lines
  - mirroredSurface = null, pane = null, waterFbx = null
  - solo = { water: false }
- **v21** (09:33, 12.4 KB) +2/-4 lines
  - fm = { sine: U.uFieldMode.value > 0.5 }
- **v22** (10:52, 12.5 KB) +1/-0 lines - mechanical/tuning changes only, nothing self-describing
- **v23** (11:25, 12.2 KB) +0/-3 lines - mechanical/tuning changes only, nothing self-describing
