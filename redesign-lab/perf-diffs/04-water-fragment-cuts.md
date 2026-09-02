<!-- Status: OPTION A APPLIED AND SHIPPED (Rod approved 2026-09-01). Options B and C still open, and
     C is withdrawn on the measurement. -->

# Water fragment cost, three cuts

## OPTION A IS IN. Measured on the SHIPPED build, not a patch (2026-09-01)

Method: one page load, gate alternated on/off/on/off (with every slot dead the loop's output is
identical either way, so the two states are pixel-identical and only cost differs). SwiftShader,
dock view. This supersedes the runtime-patch numbers below it.

| | gate on (shipped) | gate off (old behaviour) | gain |
|---|---|---|---|
| 1x, average | 21.8 ms | 25.6 ms | **+3.8 ms** |
| 1x, typical frame (p50) | **16.7 ms (60fps)** | 33.25 ms (30fps) | **the dock view stops dropping to 30fps** |
| 4x throttle, average | 31.1 ms | 33.7 ms | **+2.6 ms** |
| 4x throttle, typical frame | 33.3 ms | 33.3 ms | no flip - see below |

**Correction to the first report, stated plainly:** the runtime-patch A/B measured +4.9 ms at 4x
*with* the typical frame flipping to 16.7, and I reported "back to 60 fps" on that. On the shipped
build that flip **reproduces at 1x but NOT at 4x**. The saving is real at both; whether it crosses
the 16.7 ms deadline depends on how close the machine already is to it. On a genuinely weak
machine expect the milliseconds, not the flip - the flip needs the other cuts too.

Also corrected: this doc claimed "Line delta: +4" and defended Option A on that figure. As applied
it is **4 code lines plus comments**, ~10 lines total after trimming the comments to the house
2-line cap.

- Option B 3-tap slope: +0.55 (1x) / +0.50 (4x) - real but small; stacked on A it added nothing
  beyond noise. Still open, still needs Rod's eye on the crest shading.
- Option C far-octave: **no gain measured** (-0.2 / -0.5, inside noise - the added branch appears
  to cost what the dropped octave saves). **Withdrawn.**

Verified before shipping: the idle loop returns exactly `vec2(0.0)` three times over (dead gate,
plus both `exp` terms underflowing to zero), so the early-out is bit-identical, not merely close.
The one behavioural difference found: a ripple's final frame can end up to one frame earlier, at
9.1% amplitude, on about half of clicks - and it was already a hard cut rather than a fade.

---


**Target file:** `C:/Users/Rod/Documents/ProjectFiles/Website/_javascript/shader/mirroredSurface.js` (the LIVE tree, which ships now per D22-lifted). The lab water track keeps its own copy of this module, so if you judge in a lab tuner page the same patch must be applied there or you will see nothing change.

**The bill (MEASURED, from the ablation run):** hiding the water's fragments gains **4.1 ms** at 1x and **10.8 ms** at 4x CPU throttle at the bottom of the About scroll, where the water covers 35-46% of the frame. The shader is ~2,100 scalar ops per fragment: 8 snoise calls (mirroredSurface.js:146-151, each tap runs the 2-octave height at :138-143) are ~61% of that (INFERENCE: ~160 ops per Ashima snoise), the 16-slot ripple loop (:189-199) is ~560 ops = ~27% and runs even when every slot is dead, the fresnel/sun tail is the rest. The water renders in the main pass at canvas resolution (dpr 0.5), so savings scale with its screen coverage.

All three options stack. None of them touches the reflection render, bloom, or paper, those are sibling proposals.

---

## Option A: skip the ripple loop while no ripple is alive

The 16 slots initialise to start = -1000 (:280), so `gate = step(age, uRippleLife)` is 0 in every iteration and the loop returns exactly `vec2(0.0)` (:196-198, MEASURED from code). It still executes 16 iterations of cos/exp/pow per fragment to compute that zero. Ripples only exist for 4 s after a click on the water (three-background-scene.js:71-78); most visitors never click, so the loop is dead weight ~100% of the time.

Every ripple has the same lifetime, so the newest spawn is the last to die, which is exactly what `getActiveRipple()` (:371-376) already computes. One uniform mirrors it.

```diff
--- _javascript/shader/mirroredSurface.js
+++ _javascript/shader/mirroredSurface.js
@@ GLSL uniforms, after line 105
   uniform float uRippleSpeed, uRippleFreq, uRippleWidth, uRippleDecay, uRippleLife, uRippleAmp, uRippleSlope;
+  uniform float uRippleAlive;   // 0 = every slot expired; the loop sums to exactly 0.0 then, so skip it
@@ rippleOffset, line 187-188
   vec2 rippleOffset(vec2 worldXZ) {
+    if (uRippleAlive < 0.5) return vec2(0.0);
     vec2 acc = vec2(0.0);
@@ uniform init, line 281-282
         uRippleSpeed: { value: 80.0 }, uRippleFreq: { value: 0.2 }, uRippleWidth: { value: 30.0 },
-        uRippleDecay: { value: 0.6 }, uRippleLife: { value: 4.0 }, uRippleAmp: { value: 0.03 }, uRippleSlope: { value: 2.0 }
+        uRippleDecay: { value: 0.6 }, uRippleLife: { value: 4.0 }, uRippleAmp: { value: 0.03 }, uRippleSlope: { value: 2.0 },
+        uRippleAlive: { value: 0.0 }
@@ update(), after line 294
     this.material.uniforms.uTime.value = this.time;
+    // every ripple shares one lifetime, so the newest spawn is the last to die
+    this.material.uniforms.uRippleAlive.value = this.getActiveRipple() ? 1.0 : 0.0;
```

- **Predicted saving (INFERENCE from the 27% op share):** ~**1.1 ms** at 1x, ~**2.9 ms** at 4x, whenever no ripple is alive (the default state). Zero saving during the 4 s after a click, which is fine, that is when the ripple is earning its cost.
- **Visual risk: none.** The early-out returns the identical value the dead loop returns, down to the float. The JS gate cuts at `age > uRippleLife`, the same boundary the shader's `step(age, uRippleLife)` already hard-cuts at (:196, :374). Active ripples render exactly as today. No Rod-look needed.
- **Line delta:** +4.
- **D5 note:** this is a guard, so it is suspect by law. Defence: four lines, no new state (the uniform mirrors `_lastRipple`, which already exists), and it deletes ~27% of the shader's runtime for the idle case that is nearly always true. A per-slot `uRippleCount` dynamic loop bound was rejected: the pool is round-robin so live slots are not contiguous, and the only common case worth optimising is "all dead".
- **Prefer when:** always. This is free money.

---

## Option B: 3-tap forward-difference slope (8 snoise down to 6)

`proceduralSlope` (:146-151) estimates the gradient with 4 central-difference taps, 2 snoise each. A forward difference from a shared centre sample needs 3 taps. The step widens to `2e` so the smoothing width across a crease matches the old stencil, which is the width Rod's `uRidge = 1.0` crests (:273) were tuned at.

```diff
--- _javascript/shader/mirroredSurface.js
+++ _javascript/shader/mirroredSurface.js
@@ lines 144-151
-  // procedural slope = central-difference GRADIENT of the height. Ridged height -> the slope FLIPS sharply at each crest
-  // -> a sharp normal edge -> the directional light embosses it as a 3D ridge (the "depth" the ripple has).
-  vec2 proceduralSlope(vec2 p) {
-    float e = 0.35;
-    float hR = waterHeight(p + vec2(e, 0.0)), hL = waterHeight(p - vec2(e, 0.0));
-    float hU = waterHeight(p + vec2(0.0, e)), hD = waterHeight(p - vec2(0.0, e));
-    return vec2(hR - hL, hU - hD) / (2.0 * e);
-  }
+  // procedural slope = forward-difference GRADIENT of the height: 3 taps instead of 4 = 2 fewer snoise calls.
+  // Step is 2e so the smoothing width across a crease matches the old central-difference stencil. Ridged height
+  // -> the slope FLIPS sharply at each crest -> a sharp normal edge -> the directional light embosses it as a ridge.
+  vec2 proceduralSlope(vec2 p) {
+    float e = 0.35;
+    float h0 = waterHeight(p);
+    float hR = waterHeight(p + vec2(2.0 * e, 0.0));
+    float hU = waterHeight(p + vec2(0.0, 2.0 * e));
+    return vec2(hR - h0, hU - h0) / (2.0 * e);
+  }
```

- **Predicted saving (INFERENCE):** 2 of 8 snoise ≈ 15% of the shader ≈ **0.6 ms** at 1x, **1.6 ms** at 4x. Always on, ripples or not.
- **Visual risk: subtle.** What actually changes: (1) each slope estimate is centred `e` off-axis, so the whole shaded wave field shifts by ~`e` in noise space, about 43 world units at the shipped `uWorldScale` 0.0082 (:268), a rigid offset inside an animated noise field, invisible; (2) both slope axes now share the `h0` sample, so their noise errors correlate, which can read as a faint diagonal bias in the crest shading. The `uRidge` crease lines themselves survive, the fold is still measured from both sides. `uSunLift` moonlight (:278) is untouched math on the slightly shifted normals. **Rod looks once:** the crest shading at the dock, checking for a diagonal smear in the light bands.
- **Detail lost:** the derivative drops from 2nd-order to 1st-order accuracy, meaning slightly asymmetric shading either side of a smooth swell. On the ridged fold both schemes just measure the two sides of the kink.
- **Line delta:** +1 (a comment line).
- **Rejected inside B, for the record:**
  - *2 taps via screen-space derivatives* (`dFdx/dFdy` of one height sample, 2 snoise total): normals go constant per 2x2 pixel block and the thin crease lines stair-step. Too risky for the one Rod-tuned surface.
  - *Dropping the 2.3x chop octave "inside the taps only"*: `waterHeight` has no call site outside these taps (MEASURED, :138-151), so this deletes the fine chop from the render entirely. 8 to 4 snoise, ~1.2 ms / 3.3 ms, but the small secondary waves visibly vanish everywhere. Listed only in case Rod likes calmer water anyway.
- **Prefer when:** you want an always-on cut and will accept one look-check.

---

## Option C: drop the chop octave on far water only

The shader already encodes "far = calm" for the reflection wobble: `falloff = clamp(uDistortFalloff / dist, ...)` (:224-226, `uDistortFalloff` = 150). But the shading normal uses the full 2-octave slope at every distance, and far away the 2.3x chop octave oscillates at subpixel frequency, contributing shimmer more than shape. Cut it beyond 3x the falloff distance, reusing the existing knob rather than adding a uniform.

```diff
--- _javascript/shader/mirroredSurface.js
+++ _javascript/shader/mirroredSurface.js
@@ waterHeight, lines 138-143
-  float waterHeight(vec2 p) {
-    float t = uTime * uWaveSpeed * 0.1;
-    float h = (snoise(vec3(p, t)) + 0.5 * snoise(vec3(p * 2.3 + 7.1, t * 1.4))) * 0.7;
+  // fine = 1 keeps the small 2.3x chop octave; 0 drops it (far water, where the chop is under a pixel)
+  float waterHeight(vec2 p, float fine) {
+    float t = uTime * uWaveSpeed * 0.1;
+    float h = snoise(vec3(p, t));
+    if (fine > 0.5) h += 0.5 * snoise(vec3(p * 2.3 + 7.1, t * 1.4));
+    h *= 0.7;
     float ridged = (1.0 - abs(h)) * 2.0 - 1.0;
     return mix(h, ridged, uRidge);
   }
@@ proceduralSlope, lines 146-151 (shown against current file; merges trivially with Option B)
-  vec2 proceduralSlope(vec2 p) {
+  vec2 proceduralSlope(vec2 p, float fine) {
     float e = 0.35;
-    float hR = waterHeight(p + vec2(e, 0.0)), hL = waterHeight(p - vec2(e, 0.0));
-    float hU = waterHeight(p + vec2(0.0, e)), hD = waterHeight(p - vec2(0.0, e));
+    float hR = waterHeight(p + vec2(e, 0.0), fine), hL = waterHeight(p - vec2(e, 0.0), fine);
+    float hU = waterHeight(p + vec2(0.0, e), fine), hD = waterHeight(p - vec2(0.0, e), fine);
     return vec2(hR - hL, hU - hD) / (2.0 * e);
   }
@@ slopeRaw, lines 156-159
   vec2 slopeRaw(vec2 uv) {
     if (uProcNoise > 0.5) {
-      return proceduralSlope(vWorldPosition.xz * uWorldScale);   // continuous -> no magnify artifact, no tiling seam
+      // past 3x the distortion falloff distance the chop octave is under a pixel: shade with the big swells only
+      float fine = step(length(uCameraPosition - vWorldPosition.xyz), uDistortFalloff * 3.0);
+      return proceduralSlope(vWorldPosition.xz * uWorldScale, fine);   // continuous -> no magnify artifact, no tiling seam
     }
```

- **Predicted saving (INFERENCE, depends on how much water sits past 450 world units):** far pixels run 4 snoise instead of 8. If roughly half the water's screen area is far, that is ~17% of the shader ≈ **0.7 ms** at 1x, **1.8 ms** at 4x. The branch is spatially coherent (a distance band), so real GPUs pay it per warp and SwiftShader genuinely skips the math.
- **Visual risk: subtle-to-visible, at the far band.** Beyond the cutoff the `uRidge` creases become swell-only, fewer and broader, and the `uSunDiffuse`/`uSunLift` light bands calm down. Crease positions out there shift, because ridging folds a different height sum. Near water is bit-identical. There is also a hard line at the cutoff where the chop pops off. **Rod looks once:** the mid-water at the dock view, hunting a horizontal band where the texture changes. If it shows, `step` becomes a `smoothstep` fade (+1 line, slightly less saving in the fade zone). Plausible upside: less subpixel shimmer at the horizon (INFERENCE, unverified).
- **Line delta:** +8.
- **D5 note:** the flag threads through two functions, which is real added plumbing for a mid-size win, and the `* 3.0` is a taste constant that needs Rod to bless a distance. This is the weakest option per line of code.
- **Prefer when:** A and B have landed, the sibling tracks (reflection, paper, bloom) have landed, and the 4x budget is still missed.

---

## Set aside: baking the height field to a texture

The paper filter proves the precedent, a 24-evaluations-per-pixel Shadertoy fbm became one baked fetch (kawaseBloom.js:152-155), and a baked 2-octave slope texture would cut all 8 snoise to 1-2 fetches, ~55-60% of the water cost (~2.3 ms / 6+ ms). Not proposed because the current motion comes from time sliding through the noise's 3rd axis (:139-140): the waves MORPH in place. A scrolled 2D bake SLIDES instead, which changes what `uWaveSpeed` renders, a character change to a Rod-tuned surface, and matching the morph needs crossfaded layers plus a bake script plus a new asset with its own provenance entry. If the budget is still missed after everything above, revisit this in the lab water track as an A/B, not as a straight swap.

---

## Stacking (all INFERENCE, against the 4.1 / 10.8 ms measured water cost)

| Picks | 1x saving | 4x saving | Look-checks |
|---|---|---|---|
| A | ~1.1 ms (idle) | ~2.9 ms (idle) | none |
| A + B | ~1.7 ms | ~4.5 ms | 1 |
| A + B + C | ~2.2 ms | ~5.9 ms | 2 |

**Recommendation:** take A immediately (bit-identical output, +4 lines), take B with one crest-shading look, hold C until the sibling reflection/paper/bloom cuts land and the 4x number is re-measured.