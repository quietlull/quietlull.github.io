# WATER REWORK — implementation & analysis plan [Bob, 2026-06-15]

Track: **Bob** (water + ripples). Parallel to Hana (character), Jane (fireworks), Sarah (lanterns), Lucifer (fireflies).
Lives in `water-scene.html` (isolated harness) + lab `scene/shader/mirroredSurface.js`. Log: `water-CHANGELOG.md`.

## HARD CONSTRAINTS (Rod)
- **NO vertex offsetting.** Scene is flat colors; the water plane stays geometrically flat. ALL wave/ripple = fragment-shader
  reflection-UV distortion. (Both Rod's water AND ameen's are already fragment-only — constraint is satisfied by design.)
- Provenance is law. Ripple source = **Godot/Shadertoy ldBXDD** (Rod's pick), `sources/water-ripple-formula.md`.
  Noise source = three.js `Water.getNoise` + ameen capture (`sources/ameen-watermesh.md`). Raycast = Rod's `lantern-controller.js`.
- Verify mechanically only (headless, rAF paused). Rod makes every visual call. Freeze each step as `water-scene-vN.html`.

---

## 1. ANALYSIS — ameen's water (from the verbatim capture)
ameen's `WaterMesh` = the **stock three.js `Water` example re-expressed in TSL NodeMaterial**:
- `B7()` = TSL `reflector()` node (planar reflection RT).
- **Noise** = 4 `waterNormals` texture samples at 4 scaled+scrolling UVs, averaged into one distorted normal (`getNoise`).
- Sun **specular** `pow(dot,100)*sunColor`; **diffuse** `waterColor`; **fresnel** mix `pow(1-dot,5)`.
- Reflection-UV offset `f = normal.xz * (0.001 + 1/dist) * distortionScale` (distance falloff).

### What we TAKE vs LEAVE
| ameen component | Take? | Why |
|---|---|---|
| TSL NodeMaterial + `reflector()` node | **LEAVE** | WebGPU/node paradigm; Rod is WebGL `ShaderMaterial` + manual mirror camera. Porting = swap the whole render path (collides w/ scene + Sarah's perf). |
| **4-sample averaged normal (noise)** | **TAKE** (as GLSL) | The "change the noise" Rod wants. Smoother/organic vs one DUDV scroll. Plain GLSL, drops into existing shader. |
| Fresnel view-angle mix | **OPTIONAL** | Could add depth, but "flat colors" — default OFF, offer later. |
| Sun specular glint | **LEAVE/OPTIONAL** | Night scene has no sun; lanterns are the lights. Skip unless Rod wants a moon-glint. |
| `1/dist` distortion falloff | **OPTIONAL** | Subtle realism (distortion calms with distance). Cheap; offer as a toggle. |

---

## 2. COMPARISON — Rod's `mirroredSurface.js` vs ameen
| Aspect | Rod (mirroredSurface.js) | ameen (WaterMesh) | PLAN |
|---|---|---|---|
| Paradigm | WebGL `ShaderMaterial` + manual mirror-camera RT | TSL NodeMaterial + `reflector()` | **Keep Rod's** |
| Reflection | mirror cam renders scene -> RT, NDC reproject | reflector node RT | Keep Rod's |
| Distortion source | ONE `DUV.png` (DUDV) sample, scrolled | 4 normal samples averaged | **Adopt 4-sample (reuse DUV.png 4x, no new asset)** |
| Surface normal | flat geometry normal (~up) | per-fragment from samples | Keep flat normal; distortion stays a UV offset (simpler, on-style) |
| Lighting/color | `waveHighlight` blue tint by distortion length | specular + diffuse + fresnel | Keep simple highlight; fresnel-lite OPTIONAL |
| Distortion falloff | none (constant) | `1/dist` | OPTIONAL adopt |
| Ripples | **none** | none | **ADD (ldBXDD formula, fragment-only)** |
| Vertex offset | none | none | matches "no vertex offset" |
| Perf | frustum-cull skips reflection pass off-screen | reflector internal | **Keep the cull** |

**Takeaway:** keep Rod's entire reflection plumbing + cull. Change exactly two things in the fragment shader —
(a) compute the ambient distortion from 4 averaged DUDV samples instead of 1, and (b) add the click-ripple offset to
that same distortion before it perturbs the reflection UV. Minimal, surgical, fragment-only.

---

## 3. IMPLEMENTATION — phased

### Phase 0 — scaffold `water-scene.html` (freeze v1)
Isolated harness: importmap, `<meta Cache-Control no-store>`, the dock + water + a few lanterns (so the reflection has
content), Rod's modules from `scene/`. Expose `window.__w = { material, mirror, spawnRipple, getActiveRipple, U, cam,
composer, renderer }`. Mechanical verify: page loads, `composer.render()` no-throw, water group present, 0 console errors.

### Phase 1 — noise rework (freeze v2)  [source: three.js Water.getNoise + ameen]
In the fragment shader, replace the single DUDV sample with a 4-sample average:
- Sample `tDudv` at 4 UVs (different scales + scroll directions/speeds, mirroring `getNoise`'s 103/107/8907/1091 offsets,
  adapted to scrolling), average the `rg` offsets, `*2-1`, scale by `uWaveStrength`. New tunables: `uNoiseScale`,
  per-layer speed. The reflection plumbing is untouched. Verify: render no-throw, uniforms live. (Remixed: getNoise is an
  RGB-normal technique; we adapt to DUDV `rg` — cite + note the change.)

### Phase 2 — click ripple (freeze v3)  [source: Godot/Shadertoy ldBXDD + annulus + decay]
**JS (Rod's raycast pattern):** on `pointerdown`/tap, `THREE.Plane(normal=up, const=-mirrorPlaneY)` ray-intersect ->
world hit -> `spawnRipple(worldXZ)`. Ripple pool N=6: `{originXZ, startTime}`; new click overwrites the oldest slot.
Uniforms: `uRippleOrigin[6]` (vec2), `uRippleStart[6]` (float), `uRippleCount`.
**GLSL (fragment-only), per active ripple, accumulate then add to the existing `distortion`:**
```
d    = distance(vWorldPos.xz, origin)
age  = uTime - start
front= age * uRippleSpeed                                   // expanding radius
wave = cos(d * uRippleFreq - age * uRippleSpeed)            // ldBXDD core (dir*cos)
mask = smoothstep(front+uRingW, front, d)*smoothstep(front-uRingW, front, d)  // annulus at the front
env  = exp(-uRippleDecay*age) * exp(-uRippleDistFalloff*d)  // fade
dir  = normalize(vWorldPos.xz - origin)
rippleOffset += dir * wave * mask * env * uRippleAmp
```
`distortedReflectionUV = reflectionUV + distortion + rippleOffset;`  // same injection point as the DUDV distortion
DETAIL: ripple geometry is computed in WORLD space (correct expanding ring on the plane); the resulting 2D offset is
applied as a small UV-space perturbation (direction = world xz dir). World-dir->uv mapping is cosmetic + tunable (the
offset is tiny). Tunables: freq/speed/amp/decay/distFalloff/ringWidth/poolSize.
**Cross-agent interface (for Hana state 3):** `spawnRipple(worldPoint)` (scene can drop a ripple, not just cursor) +
`getActiveRipple() -> {origin:Vec3, age}` (newest active) so Hana's head-look reads it without touching the shader.
Verify: render no-throw; after `spawnRipple`, probe `uRippleOrigin/Start` updated + `uRippleCount`; drive `uTime`, 0 GL errors.

### Phase 3 — OPTIONAL depth (Rod's call; default OFF)
Fresnel-lite view-angle tint and/or ameen's `1/dist` distortion falloff. Only if Rod wants more than flat reflection+ripple.

### Phase 4 — handoff/integration (LAST, Rod's sign-off)
Wire `getActiveRipple()` to Hana's state-3 head-look; then port the reworked `mirroredSurface.js` into the live
`three-background-scene.js` (branch/merge/push) ONLY when the whole scene set is done and Rod approves.

---

## 4. PROVENANCE (this track)
- Reflection plumbing + scene modules + raycast = Rod's code (True, his).
- Noise 4-sample = three.js `Water.getNoise` + ameen capture (True ref -> Remixed for DUDV). `sources/ameen-watermesh.md`.
- Click ripple core = Godot/Shadertoy ldBXDD (True, verbatim) + annulus mask (JBlackCat) + decay (Mejdi) -> Remixed.
  `sources/water-ripple-formula.md`.
- Idea origin: ripple-on-click + watch-the-water = Rod's (`mine`). Noise upgrade = `theirs` (three.js/ameen).

## 5. OPEN DECISIONS FOR ROD
1. Phase 3 extras (fresnel / dist-falloff): include or skip? (Bob recommends **skip for now** — keep it flat + clean.)
2. Normal asset: **reuse DUV.png sampled 4x** (no new asset) vs add a dedicated tiling normal map. (Bob recommends reuse first.)
3. Ripple triggers: cursor-only for now, or also ambient auto-ripples / lantern-fall ripples later? (`spawnRipple()` keeps it open.)
