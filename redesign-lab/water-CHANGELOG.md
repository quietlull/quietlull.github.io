# water-scene.html — version log [Bob, water agent]

Bob's track: water rework + ripples. Parallel to Hana (character), Jane (fireworks), Sarah (lanterns), Lucifer (fireflies).
Isolated from the others: water lives in `water-scene.html` + `scene/shader/mirroredSurface-bob.js` (a copy of Rod's
`mirroredSurface.js` so changes don't touch Hana's character-scene). Plan: `water-PLAN.md`. Sources: `sources/ameen-watermesh.md`,
`sources/water-ripple-formula.md`. Mechanical verify only (headless, rAF paused) via `window.__w`; Rod makes the visual call.

- **v1 (2026-06-15) [Bob] — scaffold + 4-sample noise A/B.**
  - New harness `water-scene.html`: Rod's real dock scene (lanterns + dock + water + 25 embers for reflection content),
    same camera/bloom as the site, OrbitControls target lowered to y=60 to keep the water in frame. No character.
  - New `scene/shader/mirroredSurface-bob.js`: faithful copy of Rod's water + ONE change — `uNoiseMode` (0 = original
    single scrolling DUDV sample / 1 = 4-sample averaged distortion = three.js `Water.getNoise` adapted to DUDV `.rg`).
    `setNoiseMode()` + GUI toggle ("Noise: 4-sample"). Default = 1 (new). Provenance: original = True (Rod);
    4-sample = Remixed (getNoise RGB-normal -> DUDV rg; `sources/ameen-watermesh.md`).
  - `window.__w = { mirror, material, scene, cam, composer, renderer, setNoiseMode }`.
  - Ripples NOT in yet (deferred per Rod — compare noise first). Next: v2 = click->world ripple (ldBXDD formula).
  - Page: http://localhost:4000/redesign-lab/water-scene.html
  - VERIFY: PASSED — composer.render no-throw, 67 meshes, water wears bob material, uNoiseMode toggles 0<->1, 0 console errors.

- **v2 (2026-06-15) [Bob] — normal-based reflection + Fresnel + specular (all tunable, realism off by default).**
  - Confirmed (sources/ameen-watermesh.md) ameen's water IS normal-based: 4 normal-map samples averaged -> a normal that
    drives reflection + specular + fresnel (three.js Water recipe). Rod: "lets try normals based."
  - `mirroredSurface-bob.js`: DUDV `.rg` reused as a SLOPE -> reconstruct a tilted NORMAL (`uNormalBased` 1) and reflect
    off THAT (vs `uNormalBased` 0 = original UV-offset off the flat normal, baseline preserved for exact A/B). Added
    `uFresnel` (mix reflection toward dark `uWaterColor` ~ scene navy by view angle = depth, low color cost) + `uSpecular`
    (glints off the normal toward `uLightDir`, white/warm + bloom = the water sparkle). Realism terms DEFAULT OFF so
    normal-based is seen in isolation first. Single light dir (NOT a per-lantern loop) to keep specular ~free.
  - GUI: Water folder (Normal-based toggle, 4-sample toggle, wave strength/speed, normal strength) + Realism folder
    (Fresnel depth, water color, Specular, tightness, glint color). No new asset (reuses DUV.png).
  - Provenance: original UV-offset = True (Rod); normal/fresnel/specular = Remixed (three.js Water + ameen). Idea = Rod (mine).
  - VERIFY: PASSED — 6 shader branches (flat/single, flat/4samp, normal, +fresnel, +spec, +fres+spec) all render no-throw,
    defaults correct (normalBased 1 / noiseMode 1 / fresnel 0 / specular 0), 0 console errors. Visual = Rod's call.
  - PERF: negligible. Water cost is dominated by the planar-reflection pass (full scene re-rendered to an RT each frame) =
    UNCHANGED. Added per-water-fragment cost = +3 texture samples (4-sample) + a normalize + (when on) 1 fresnel pow + 1
    specular pow, on water pixels only. No new draw calls. Frozen v2 = water-scene-v2.html.
  - Page: http://localhost:4000/redesign-lab/water-scene.html

- **v3 (2026-06-15) [Bob] — REBUILD the normal path correctly + 6 switchable versions.**
  - Rod's correction (right): the v2 normal-based used `reflect(viewDir, N)` with a ~0.01 tilt -> barely bent the
    reflection -> looked FLATTER than the DUDV offset. WRONG way. The correct three.js Water / ameen way: `normal.xy`
    (the slope) drives the reflection-UV offset DIRECTLY, with DISTANCE FALLOFF (strong near cam, calm far). Also: a
    normal map IS usable with NO lighting -> Fresnel + sparkle are geometric (dot vs camera / a CONSTANT dir), not scene lights.
  - `mirroredSurface-bob.js` rewritten with 4 independent, switchable effect terms + verbatim original, via per-effect
    strength uniforms + `applyVersion(name)`:
    1. NORMAL distortion = slope * uDistort * (uDistortFalloff/dist clamped). Distance-attenuated UV warp.
    2. FRESNEL depth = mix reflection toward dark uWaterColor by `pow(1-dot(N,-view),uFresnelPow)`. Geometric, no light.
    3. SPARKLE = `pow(dot(reflect(view,N), uLightDir), uShininess) * uSparkle`. Constant dir, bloom-amplified. No light.
    4. CREST = bright lines where `length(slope)` peaks (smoothstep) — extends Rod's waveHighlight.
  - 6 VERSIONS via a GUI dropdown (Original / 1 Normal / 2 Fresnel / 3 Sparkle / 4 Crest / Combined) — each isolates one
    technique on the reflection so Rod can judge what he likes; plus per-effect folders (Distortion / Fresnel / Sparkle /
    Crest / Wave field / Scene) for free-tuning. Default load = Combined.
  - Provenance: ORIGINAL = True (Rod). NORMAL/FRESNEL/SPARKLE = Remixed (three.js Water + ameen, sources/ameen-watermesh.md).
    CREST = Remixed from Rod's waveHighlight + smoothstep. No new asset (reuses DUV.png). Idea = Rod (mine).
  - VERIFY: PASSED — all 6 versions render no-throw, preset uniforms set correctly (original useOrig=1; isolated presets zero
    the others), all 15 new uniforms present, 0 console errors. Visual = Rod's call. Frozen v3 = water-scene-v3.html.
  - PERF: still negligible — same reflection-pass cost; the new terms are a few ALU/texture ops on water pixels only, each
    gated by its strength uniform (off = skipped). No new draw calls.
  - Page: http://localhost:4000/redesign-lab/water-scene.html

- **v4 (2026-06-15) [Bob] — fix the striped noise: isotropic world-xz sampling (+ switch back to original).**
  - Rod's catch (correct): the noise made STRAIGHT-LINE SLICES because the sample coord was `vUv * vec2(0.01, 10.0)` — a
    1000:1 U:V stretch, so the field varied almost only along V (UV-space, mesh-dependent). All 4 layers inherited the
    same anisotropy -> averaging kept the stripes. Fine as a tiny reflection smear; exposed once read as a NORMAL.
  - FIX (`slopeRaw`): `uNoiseSpace` toggle. 1 (default) = sample `vWorldPosition.xz * uWorldScale` — isotropic WORLD-xz
    (what three.js Water / ameen do: noise input = world xz), with 4 ROTATED + decorrelated layers (`rot2()` per layer) ->
    genuine 2D waves, mesh-UV-independent. 0 = the original anisotropic UV sampling (the stripes), kept for A/B.
    New uniforms `uNoiseSpace` (1) + `uWorldScale` (0.02). GUI: Wave field -> "Noise: world-xz (off = original UV)" + World scale.
  - This improves ALL field-driven effects at once (distortion + Fresnel read the same `slopeRaw`).
  - Rod's per-effect verdict so far: KEEP normal distortion + Fresnel depth; sparkle ~invisible at the site camera angle
    (cut/optional); crest disliked (off). Trim after he confirms the noise fix.
  - Provenance: world-xz isotropic sampling = Remixed from three.js Water / ameen (sources/ameen-watermesh.md, `Am.xz`);
    rotated octaves = standard multi-octave noise. Original UV path kept verbatim. No new asset.
  - VERIFY: PASSED — both noise spaces (0 and 1) render no-throw across combined/normal/fresnel, uNoiseSpace+uWorldScale
    present, default world-xz, 0 console errors. Visual = Rod's call. Frozen v4 = water-scene-v4.html.
  - Page: http://localhost:4000/redesign-lab/water-scene.html

- **v5 (2026-06-15) [Bob] — fake DIRECTIONAL LIGHT (broad wave shading); drop sparkle/crest from the keeper set.**
  - Re-checked ameen (sources/ameen-watermesh.md): it HAS a tight sun SPECULAR (secondary) but NO crest/foam term. The
    workhorse that makes it read as water = the DIFFUSE directional term `d = max(dot(sunDir, N), 0) * sunColor` — broad
    surface shading by wave orientation. Rod's insight: fake a directional light, tunable in GUI.
  - Added effect (5) DIRECTIONAL LIGHT: `uSunDiffuse` * `uSunColor2` * (dot(N, uSunDir2) - L.y) -> brightens slopes toward
    the fake sun, darkens away = large light/dark wave bands, NO tiny shapes (fits Rod's "avoid tiny shapes / mostly static"
    style). Uniforms uSunDiffuse (0.5) / uSunDir2 (0.4,0.5,0.3) / uSunColor2 (warm 0xffe0b0). Provenance: Remixed from ameen
    diffuse term. GUI: "5 - Directional light" folder (strength/dir/color) + version dropdown entry; isolation preset `sun`.
  - COMBINED preset reworked to the KEEPERS: distortion + Fresnel + directional-light (sparkle=0, crest=0). Sparkle/crest
    kept as toggles/versions but OUT of combined (sparkle invisible at site camera; crest disliked + not in ameen).
  - World-scale slider widened: min 0.002 -> 0.0002 (lower = bigger/calmer waves) for the mostly-static scene; relabeled
    "lower = bigger waves" so the direction is clear.
  - VERIFY: PASSED — original/normal/fresnel/sun/combined all render no-throw, uSun* uniforms present, combined uses sun
    (sparkle/crest 0), 0 console errors. Visual = Rod's call. Frozen v5 = water-scene-v5.html.
  - Page: http://localhost:4000/redesign-lab/water-scene.html

- **v6 (2026-06-15) [Bob] — temper the water (#1 darken-biased shading) so it stops feeding bloom.**
  - Rod confirmed the dock-black lift was BLOOM: my v5 directional term ADDED brightness -> water crossed the bloom
    threshold -> bloom bled onto the unlit dock. Fix #1: wave depth is CONTRAST not absolute brightness, so darken the
    troughs instead of brightening the crests -> net darker -> under the bloom threshold -> dock stays black.
  - Directional term reworked: `dev = dot(N,L) - L.y`; `color *= max(0, 1 - uSunDiffuse*trough)` (DARKEN troughs, NEUTRAL
    multiply = no color shift) + `color += uSunColor2 * uSunDiffuse * uSunLift * crest` (small warm crest lift).
    New uniform `uSunLift` (0.3; 0 = pure darkening, no added brightness at all). GUI: "Crest lift (0 = pure dark)" slider.
  - Keeps the broad wave shading; lowers mean luminance so the water no longer blooms onto the dock. Rod can set uSunLift
    -> 0 for guaranteed zero added brightness, and still has bloom strength/threshold sliders.
  - Provenance: still the ameen diffuse term, re-centered to darken-biased (Remixed). No new asset.
  - VERIFY: PASSED — sun/combined/original render no-throw, uSunLift present, pure-dark (uSunLift=0) compiles, 0 console
    errors. Visual = Rod's call (does the dock go black again?). Frozen v6 = water-scene-v6.html.
  - Page: http://localhost:4000/redesign-lab/water-scene.html

- **v7 (2026-06-15) [Bob] — KEEPER SET locked + Rod's tuned values baked. Sparkle + Crest-lines REMOVED.**
  - Rod's call: keep distortion + Fresnel + directional-light (with its crest-LIFT); REMOVE sparkle (effect 3, invisible at
    site camera) and crest-LINES (effect 4, disliked, not in ameen). NOTE the two "crests": kept = `uSunLift` (directional
    crest lift); removed = `uCrest` (crest lines). Fully deleted uSparkle/uShininess/uLightDir/uSpecColor + uCrest/uCrestThresh/
    uCrestSoft/uCrestColor from shader, uniforms, GUI, version dropdown, and applyVersion.
  - Rod's tuned values BAKED as defaults: uWorldScale 0.002, uWaveSpeed 1.5, uDistort 0.13, uDistortFalloff 90, uFresnel 0.45,
    uFresnelPow 5, uSunDiffuse 0.13, uSunLift 0.52. Combined preset = {distort 0.13, fresnel 0.45, sun 0.13}.
  - Versions now: Original / 1 Normal distortion / 2 Fresnel / 3 Directional light / Combined. `uNormalUp` (shared normal
    tilt) relocated into the Directional-light folder.
  - OPEN — Rod wants World scale LOWER (bigger waves) but it ARTIFACTS: at low uWorldScale the DUDV texture is MAGNIFIED
    (base = worldXZ*scale -> tiny UV range -> texels stretched -> blocky/banding). FIX to allow bigger waves = swap the
    texture noise for PROCEDURAL noise (snoise, already in the scene = Ashima/Rod) -> infinite resolution, no magnify
    artifact. Proposed next; not yet built.
  - VERIFY: PASSED — sparkle/crest uniforms GONE, all 8 baked values correct, 5 versions render no-throw, 0 console errors.
    Visual = Rod's call. Frozen v7 = water-scene-v7.html.
  - Page: http://localhost:4000/redesign-lab/water-scene.html

- **v8 (2026-06-15) [Bob] — PROCEDURAL noise toggle (fixes the low-scale magnify + tiling-seam artifacts).**
  - Problem: DUV.png texture noise has a hard resolution floor -> at low World scale it MAGNIFIES (blocky texels) and shows
    TILING SEAMS. Fix Rod approved: procedural noise = infinite resolution, no texel to magnify, no tile to seam.
  - Added Ashima/Gustavson 3D simplex `snoise` (public domain; SAME one Rod's character dissolve uses) + `proceduralSlope`
    (3 octaves, two decorrelated channels = the DUDV .rg analog; animates via the z axis at uWaveSpeed). `uProcNoise` toggle
    (default 1 = procedural) branches `slopeRaw` BEFORE the texture paths; samples world-xz * uWorldScale -> continuous, so
    push World scale as low as you want for big calm swells, artifact-free + seamless.
  - GUI: Wave field -> "Procedural noise (off = texture)" + "Texture space: world (off = UV)". World-scale slider widened to
    min 0.00005 (step 0.00005) so big waves are reachable.
  - Provenance: snoise = Ashima webgl-noise (public domain), already in Rod's scene = True. proceduralSlope octave assembly =
    standard fBm-style multi-octave (Remixed). No new asset.
  - PERF: procedural path = ~6 snoise calls/water-fragment (heavier than 1-4 texture fetches) but on water pixels only, still
    dwarfed by the reflection pass. Texture path kept as the cheaper fallback toggle if needed.
  - VERIFY: PASSED — procedural renders no-throw at scales 0.002 / 0.0005 / 0.0001 (big waves), texture path still ok,
    uProcNoise present + default 1, snoise compiled (0 GL errors), 0 console errors. Visual = Rod's call. Frozen v8 = water-scene-v8.html.
  - Page: http://localhost:4000/redesign-lab/water-scene.html

- **v9 (2026-06-15) [Bob] — Rod-tuned procedural values baked.** Procedural confirmed working. Defaults: uWorldScale
  0.002 -> **0.0082**, uSunLift 0.52 -> **0.2**. VERIFY: loads with worldScale 0.0082 / sunLift 0.2 / proc 1, render no-throw,
  0 console errors. Frozen v9 = water-scene-v9.html.

- **v10 (2026-06-15) [Bob] — more Rod-tuned bakes + MOONLIGHT.** uDistort 0.13->**0.05**, uDistortFalloff 90->**150**,
  uFresnel 0.45->**0.35**, uFresnelPow 5->**4.3**, uSunColor2 warm 0xffe0b0 -> **cool moonlight 0xaec6f0** (blue-white).
  Updated both uniform defaults and the applyVersion presets (combined/normal/fresnel). VERIFY: loads with distort 0.05 /
  falloff 150 / fresnel 0.35 / pow 4.3 / sun b0.87>r0.42 (moonlight), render no-throw, 0 console errors. Frozen v10 = water-scene-v10.html.
  CURRENT BAKED WATER = procedural noise (worldScale 0.0082, speed 1.5) + distortion(0.05/falloff150) + Fresnel(0.35/pow4.3) +
  moonlight directional-light(0.13, crest-lift 0.2, color 0xaec6f0).

- **v11 (2026-06-15) [Bob] — CLICK RIPPLES (the original v2 goal).**
  - Pointer/tap raycasts the water plane (THREE.Plane at mirrorPlaneY; drag-vs-click guard 6px/500ms) -> `spawnRipple(worldPoint)`.
  - 8-slot round-robin pool: `uRippleOrigin[8]` (world xz) + `uRippleStart[8]` (spawn time in the material's own clock).
  - Shader `rippleOffset(worldXZ)`: per slot, expanding wave-packet = `cos((d - front)*uRippleFreq)` [front = age*uRippleSpeed]
    x gaussian ring `exp(-((d-front)/uRippleWidth)^2)` x time-decay `exp(-uRippleDecay*age)` x gate, scaled by uRippleAmp,
    pushed along the outward dir. Added to the SAME reflection-UV offset as the ambient distortion. Source: ldBXDD (Godot/
    Shadertoy) + annulus + decay (sources/water-ripple-formula.md) = Remixed; raycast = lantern-controller pattern (Rod's).
  - Cross-agent: `spawnRipple(Vec3)` + `getActiveRipple() -> {origin:Vec3, age}` (newest active) on the MirroredSurface +
    on window.__w -> Hana wires her state-3 head-look to it without touching the shader.
  - GUI: "Ripples (click the water)" folder = Test-ripple button + Speed/Frequency/Ring width/Decay/Lifetime/Amplitude.
    Defaults speed 80 / freq 0.2 / width 30 / decay 0.6 / life 4 / amp 0.03 (world-scale guesses, Rod tunes by eye).
  - BUG CAUGHT + FIXED: `active` is a RESERVED word in GLSL -> shader failed to compile. Renamed -> `gate`.
  - VERIFY METHOD LESSON: `composer.render()` NO-throw does NOT prove the shader compiled (a compile failure only shows in
    console / via `renderer.debug.onShaderError`). The first "ok" probe missed the reserved-word error; the console caught it.
    NOW the standard: force `material.needsUpdate=true` + render + check `renderer.debug.onShaderError` (fires only on failure).
  - VERIFY: PASSED definitively — onShaderError silent on forced recompile (compiledClean), source fresh (gate/no active),
    spawnRipple sets origin (12,-34)/time, pool head advances, getActiveRipple returns the ripple. Frozen v11 = water-scene-v11.html.
  - Page: http://localhost:4000/redesign-lab/water-scene.html

- **v12 (2026-06-15) [Bob] — ripple now drives the NORMAL too (Fresnel + directional light), not just the reflection.**
  - Rod's catch: v11 ripple only offset the reflection-UV lookup, so it never touched the noise/normal that Fresnel +
    directional-light read -> the ripple was invisible in the shaded/colored water (only the planar mirror rippled).
  - Fix: `rippleOffset` now returns the RAW field (~[-1,1], dropped the inline uRippleAmp). In main it feeds BOTH:
    reflection UV (`+ rip * uRippleAmp`) AND the shading normal (`sN = s + rip * uRippleSlope` -> N). So the ripple's slope
    tilts the normal -> it shows up as moving Fresnel-depth + light/dark directional shading along the ring, like a real disturbance.
  - New uniform `uRippleSlope` (2.0) = how hard the ripple tilts the shading normal. GUI: "Shading slope (fresnel/light)"
    (the amp slider relabeled "Amplitude (reflection)").
  - VERIFY (onShaderError method): compiledClean (hook silent on forced recompile), source fresh (rip*uRippleSlope +
    rip*uRippleAmp present), uRippleSlope wired = 2.0. Frozen v12 = water-scene-v12.html.
  - Page: http://localhost:4000/redesign-lab/water-scene.html

- **v13 (2026-06-15) [Bob] — UNLOCKABLE hover distortion (Rod's idea).** Click the water enough times -> unlock a cursor
  "smudge" that turbulence-distorts the water on hover.
  - Shader (7) HOVER: when `uMouseActive`, localized procedural turbulence follows the cursor = `snoise` (the one already in
    the shader) sampled tighter (uWorldScale*uHoverScale), masked by `smoothstep(uHoverRadius,0,dist-to-cursor)`. Feeds BOTH
    the reflection (`hov*uHoverAmp`) and the shading normal (`sN += hov*uHoverSlope`) like the ripple, so it shows in the
    color too. Uniforms: uMouseWorld/uMouseActive + uHoverRadius(120)/uHoverScale(3)/uHoverAmp(0.04)/uHoverSlope(2).
    `setHover(worldPoint|null)` method.
  - Unlock gate (harness JS): water clicks counted; at `HOVER.unlockAt` (default 5) hover unlocks. pointermove raycasts the
    water plane -> `setHover(hit)` ONLY when unlocked; pointerleave -> setHover(null). HUD shows clicks N/M + lock state.
    GUI "Hover distortion (unlockable)": Force-unlock (test), Clicks-to-unlock, Radius, Noise scale, Amplitude, Shading slope,
    Reset-clicks. In the FINAL this gate maps to Rod's achievement system (click-water achievement -> feature unlock).
  - Provenance: snoise = Ashima (True, in-scene) + smoothstep radial mask (True) -> Remixed. Idea = Rod (mine): unlockable
    hover distortion. `__w.hover.{state,click}` + `__w.setHover` exposed for testing.
  - VERIFY (onShaderError): compiledClean, source fresh, 6 hover uniforms present, starts LOCKED, 5 clicks -> unlocked,
    setHover(pt)->active 1 + world (20,10), setHover(null)->active 0. Frozen v13 = water-scene-v13.html.
  - Page: http://localhost:4000/redesign-lab/water-scene.html

- **v14 (2026-06-15) [Bob] — hover now leaves a propagating WAKE (Rod: it shouldn't vanish when the cursor moves on).**
  - v13 hover was a static smudge locked to the cursor -> teleported with the mouse, no persistence. Fix: as the cursor
    moves (unlocked), DEPOSIT ripples along its path into the existing propagating ripple system, so each touched spot keeps
    rippling + fading after the cursor leaves = a wake. The live smudge stays as the at-cursor turbulence on top.
  - Harness: pointermove deposits `spawnRipple(hit)` each time the cursor travels > `HOVER.depositDist` (25) world units
    since the last deposit (`_lastDep`). GUI: "Leave a wake (deposit ripples)" toggle + "Wake spacing" slider. Deposited
    ripples reuse the click-ripple params (Rod tunes globally).
  - Ripple pool enlarged 8 -> 16 (GLSL loop + arrays, uniforms init, spawnRipple modulo) so the wake has length without
    starving click ripples.
  - VERIFY (onShaderError): compiledClean, source fresh (i < 16), pool len 16 / start len 16, 17 spawns wrap head -> 1.
    Frozen v14 = water-scene-v14.html.
  - Page: http://localhost:4000/redesign-lab/water-scene.html

- **v15 (2026-06-15) [Bob] — REMOVED the hover/unlock distortion (Rod: not what he wanted). Water finalized.**
  - Stripped: shader (7) HOVER block + uMouseWorld/uMouseActive/uHover* uniforms + setHover(); harness pointermove/
    pointerleave handlers, click-unlock counter, HOVER object, updateHud, the Hover GUI folder, and __w.setHover/hover.
  - Reverted pointerup to plain click->spawnRipple. Ripple pool KEPT at 16 (benign; more simultaneous click ripples).
  - VERIFY (onShaderError): compiledClean, no uHover* uniforms (hoverGone), __w.setHover/hover undefined, click ripple
    still works, 0 console errors. Frozen v15 = water-scene-v15.html.
  - **FINAL LAB STATE:** procedural noise (worldScale 0.0082, speed 1.5) + distortion(0.05/falloff150) + Fresnel(0.35/pow4.3)
    + moonlight directional-light(0.13, crest-lift 0.2, #aec6f0) + CLICK RIPPLES (ldBXDD, feeds reflection + normal,
    spawnRipple/getActiveRipple for Hana). All in `scene/shader/mirroredSurface-bob.js` (Bob's copy; live mirroredSurface.js
    UNTOUCHED). NOT yet ported to the live site.
  - NOTE on "push": `redesign-lab/` is GITIGNORED -> nothing to git-commit from this work; the live port (-> `_javascript/`
    + rollup + branch/push) is the deferred FINAL step, out of Bob's lab lane + parallel to Jane/Sarah/Lucifer/Hana. Pending Rod.
  - Page: http://localhost:4000/redesign-lab/water-scene.html

- **PORTED TO LIVE (2026-06-15) [Bob] — Rod said "B port it in and push".**
  - Replaced live `_javascript/shader/mirroredSurface.js` with the reworked module (drop-in; identical class/constructor;
    adds the new water look + spawnRipple/getActiveRipple). Wired `_javascript/three-background-scene.js`: waveSpeed->1.5,
    click-the-water-MESH -> spawnRipple, `window.mirroredSurface` exposed for the character head-look.
  - BUILD: `BUILD=production npx rollup -c` succeeds (three-background-scene.min.js). `assets/js/dist` is gitignored -> CI
    rebuilds; only the two `_javascript/` sources committed.
  - VERIFY (live /tech-art/about/): window.mirroredSurface set, water shader compiledClean (onShaderError), tuned defaults
    present (proc 1 / worldScale 0.0082 / waveSpeed 1.5 / moonlight sun), ripple API works (16 slots), 0 console errors.
  - PUSH: branch `claude/water-rework` (d7f6eb0) committed + pushed.
  - **MERGED TO MAIN + DEPLOYED (2026-06-15, Rod said "merge to main please"):** fast-forward `main` 0c663ca -> d7f6eb0,
    pushed origin/main -> triggers GitHub Actions Build & Deploy (npm rollup build -> jekyll -> htmlproofer -> Pages). The
    live About page (`/tech-art/about/`, `/game-design/about/`) gets the new water. NOTE: a parallel agent's UNCOMMITTED WIP
    (`_javascript/lantern-controller.js` + `_javascript/three-config.js`, likely Sarah) was in the shared tree the whole time
    -> left 100% untouched (only my 2 water files are in d7f6eb0). HEAD restored to `claude/water-rework`.
  - HANA: ripple head-track instructions for state 3 appended to `character-scene-HANDOFF.md` (getActiveRipple()-> head-look target).

- **v16 (2026-06-15) [Bob] — base-water DEPTH knob (uNoiseSlope).** Rod noticed ripples have strong depth but the base
  water is flat. Cause: the normal `sN = s + rip*uRippleSlope` weighted the ripple x2.0 but the noise x1.0 (and the noise's
  reflection distortion is distance-attenuated; ripple's is not). Fix: `sN = s * uNoiseSlope + rip * uRippleSlope` + new
  uniform `uNoiseSlope` (default 1.0 = unchanged; raise toward ~2 to give the base water ripple-like Fresnel/directional
  depth). GUI: "1 - Distortion" -> "Depth (noise -> normal)". LAB ONLY for now; port to live + push once Rod picks a value.
  VERIFY (onShaderError): compiledClean, uNoiseSlope present (1.0), source fresh, 0 console errors. Frozen v16 = water-scene-v16.html.

- **v17 (2026-06-15) [Bob] — Distortion sliders -> max 100; NOISE-vs-RIPPLE channel map (tracked).** Raised "Strength
  (reflection)" (uDistort) + "Depth (noise->normal)" (uNoiseSlope) slider maxes to 100 for deep tuning. EXHAUSTIVE trace
  (verified in the live shader source): `rip` and `s` each appear in EXACTLY two effect sites, so both feed the SAME
  channels -> the only differences are weight, distance-falloff, and spatial/time behavior:

  | Effect channel | NOISE (s) | RIPPLE (rip) |
  |---|---|---|
  | Reflection-UV warp | YES `* uDistort(0.05) * falloff` (distance-fades) | YES `* uRippleAmp(0.03)` (NO falloff) |
  | Surface normal N | YES `* uNoiseSlope` (1.0, now tunable) | YES `* uRippleSlope(2.0)` |
  | -> Fresnel depth (via N) | YES | YES |
  | -> Directional-light shading (via N) | YES | YES |
  | Spatial extent | global (everywhere) | localized at spawn pts, expanding ring |
  | Time | continuous (steady amp) | transient (grows + decays, ~uRippleLife 4s) |

  KEY: nothing the ripple touches is hidden from the noise -> they hit identical effects. The depth gap = the NORMAL weight
  (ripple 2.0 vs noise 1.0) + the ripple being a sharper/steeper feature. uNoiseSlope closes it. Frozen v17 = water-scene-v17.html.

- **v18 (2026-06-15) [Bob] — GUI split into REFLECTION distort vs SURFACE distort (Rod's two-channel model).** Diagnosis
  confirmed with Rod: uNoiseSlope saturates (N = normalize(vec3(s*uNoiseSlope, uNormalUp, ...)) -> scaling s only rotates N
  toward horizontal asymptotically); the REAL tilt lever is uNormalUp (lower = steeper = wavier shading), and it ONLY feeds
  Fresnel + directional (never the reflection). uDistort is the only thing warping the planar reflection, and it garbles when large.
  - GUI: folder "Reflection distort" = uDistort + uDistortFalloff (channel A, warps the mirror). New folder "Surface distort"
    = uNormalUp ("Surface tilt, lower = wavier", range extended to 0.02) + uNoiseSlope ("Noise -> normal") (channel B, shading
    only, non-destructive). Moved uNormalUp out of the Directional-light folder. No shader change; uniforms unchanged.
  - DIRECTION: sell the waves via channel B (drop uNormalUp low -> strong Fresnel/directional), keep uDistort small so the
    expensive planar reflection stays clean. Next: if shading still not "wavy" enough, add a sharp color-only surface term.
  - VERIFY: pane builds (all folders incl. Reflection/Surface distort), uniforms present, 0 console errors. Frozen v18 = water-scene-v18.html.

- **v19 (2026-06-15) [Bob] — SWELL layer (the actual depth cue).** Insight (confirmed w/ Rod): depth = COHERENT displacement
  of the REFLECTED image, which the ripple does (uRippleAmp) but Surface distort (normal/shading only) can NEVER do (the
  reflection bounces off the FLAT vNormal; the reconstructed N only feeds Fresnel/directional). uDistort displaces the
  reflection too but smears, because the fine noise is high-freq/global. FIX: a separate low-frequency `swellSlope()` (1
  smooth snoise octave at uSwellScale) -> feeds the reflection at `uSwellAmp` (a COHERENT bulge = depth, doesn't smear) AND
  the normal at `uSwellSlope` (so swells shade too). Decoupled from the fine detail (uDistort/uNoiseSlope) and the ripple.
  - New uniforms uSwellAmp(0.06) / uSwellScale(0.002, lower=bigger) / uSwellSlope(1.5). GUI folder "Swell (coherent
    reflection DEPTH)": Reflection bulge / Swell size / Swell shading. snoise = Ashima (already in shader). Remixed (big-swell
    + fine-chop = standard ocean layering).
  - Rod is manually reviewing the code; this is staged for when he's done. VERIFY (onShaderError): compiledClean, swell
    uniforms present, source fresh (swellSlope + swell*uSwellAmp + swell*uSwellSlope), 0 console errors. Frozen v19 = water-scene-v19.html.

- **v20 (2026-06-15) [Bob] — "Solo water" toggle + CORRECTED depth model.** Rod's experiment (hide the scene -> nothing to
  reflect): the RIPPLE STILL READS AS DEPTH. So depth = the SHADING (normal -> Fresnel/directional), NOT the reflection
  displacement. My earlier "depth = reflection" was WRONG. Added Scene-folder toggle "Solo water (hide scene)" (hides all
  scene.children except the water fbx group) for ongoing diagnosis. VERIFY: 27/28 children hidden on solo, water visible,
  render no-throw, 0 console errors. Frozen v20 = water-scene-v20.html.
  - OPEN DIAGNOSIS (next): noise & ripple feed the normal at COMPARABLE magnitudes (noise ~1, ripple ~2) -> NOT a strength
    issue. Difference = STRUCTURE: ripple = coherent, sharp, MOVING wavefront (expanding ring) -> reads as a wave; ambient
    snoise = isotropic blobs -> reads as flat texture. Hypothesis: ambient water needs COHERENT DIRECTIONAL TRAVELING waves
    (sum-of-sines / Gerstner), not isotropic noise. Propose a directional-wave test term before building it out. Confirm w/ Rod.

- **v21 (2026-06-15) [Bob] — SINE-CREST vs NOISE toggle; removed the swell.** Rod confirmed the depth model and asked: reuse
  the existing field (no need for directional), just toggle sharp sine crests vs the blobby noise. REMOVED the swell layer
  (swellSlope fn + uSwellAmp/Scale/Slope uniforms + reflection/normal usage + GUI folder). ADDED `sineCrestSlope()` = gradient
  of a sum-of-sines (3 mixed-direction components -> reads NON-directional overall; animates by phase) + `uFieldMode` toggle
  (0 = established proc noise / 1 = sine crests) checked first in slopeRaw. Both modes feed the SAME shading path (apples-to-
  apples). GUI: Wave field -> "Field: SINE CRESTS (off = noise)". Provenance: sum-of-sines = standard ocean technique; idea
  (crests for ambient depth) = Rod. VERIFY (onShaderError): both modes compiledClean, swell gone, uFieldMode toggles, source
  fresh (sineCrestSlope), 0 console errors. Frozen v21 = water-scene-v21.html.

- **v22 (2026-06-15) [Bob] — RIDGE control (the real depth lever, corrected model).** Rod's pushback (correct): the ripple
  gets strong depth on the SAME flat plane via the SAME shading -> geometry is NOT the ceiling (I was wrong about that).
  Re-derived: the ripple reads as depth because it feeds the normal a SHARP, high-contrast EDGE (gaussian ring front) that
  the directional light EMBOSSES (sharp bright->dark = a 3D ridge). Ambient noise/sine are SMOOTH/low-spatial-frequency ->
  gentle gradients -> read flat. It's the SHARPNESS (spatial rate-of-change) of the normal, not magnitude (magnitude
  saturates the normalize, which is why uNoiseSlope did nothing).
  - FIX: procedural field reworked to a scalar HEIGHT (`waterHeight`, 2 octaves) + central-difference GRADIENT for the slope.
    `uRidge` creases the height via `1 - abs(h)` (V-shaped creases at zero-crossings -> sharp ridge lines); its gradient
    flips sharply at crests -> sharp normal edges -> directional light embosses real ridges separated by calm troughs.
    `uRidge` 0 = smooth, 1 = sharp. GUI: Surface distort -> "Ridge / crest sharpness". (Replaces the old 2-channel proc slope.)
  - Cost note: ~8 snoise/water-fragment (height x4 finite-diff). Fine in lab; flag for mobile-LOD before porting.
  - VERIFY (onShaderError): ridge 0 + ridge 1 both compiledClean, uRidge present, source fresh (waterHeight / 1-abs(h)),
    0 console errors. Frozen v22 = water-scene-v22.html.

- **v23 (2026-06-15) [Bob] — RIDGE is the keeper; dead-ends removed.** Rod: "Normal ridge was it; remove the rest of the
  changes." Ridging the normal (emboss sharp crests) is the depth solution. REMOVED the failed depth experiments: sine
  crests (uFieldMode + sineCrestSlope + the toggle) and uNoiseSlope (the saturating noise->normal knob). (Swell already gone v21.)
  - KEPT: uRidge + the height-gradient procedural field (needed for ridge); the Reflection-distort/Surface-distort GUI split
    (Surface distort = Surface tilt + Ridge now); the established keepers (distortion, Fresnel, directional, ripples); and the
    Solo-water debug toggle + the proc/texture noise A/B (harmless lab helpers - flagged to Rod, easy to cut if he wants).
  - CURRENT LAB WATER: procedural height field (uRidge for crest sharpness) -> distortion(reflection) + Fresnel + darken-biased
    directional + click ripples. Diverges from LIVE (live still has the old 2-channel field, no ridge) -> ridge port pending.
  - VERIFY (onShaderError): compiledClean, sineGone, noiseSlopeGone, ridge kept, 0 console errors. Frozen v23 = water-scene-v23.html.
