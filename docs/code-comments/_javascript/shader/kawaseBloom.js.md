# Comments removed from `_javascript/shader/kawaseBloom.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 3, above `/* Buffer size as a fraction of the frame. A blur chain is low-frequency by definition, so half`

```text
Dual Kawase bloom - Marius Bjorge's dual filtering, fixed at TWO levels with no bright pass.

WHY IT REPLACED UnrealBloomPass (DECISIONS D23): the stock pass builds a 5-level mip chain and
runs a separable gaussian at every level - two passes per mip plus a composite, ~12 passes over
11 render targets. Ablation profiling on Rod's machine with hardware acceleration OFF measured
bloom at 8.5 ms/frame, 52% of a 16.5 ms scene, and that was already at HALF resolution. The
scene is 27 draw calls and 733 triangles, so it is fragment-bound: passes are the cost.

This is five renders over four targets, all at half resolution or below:
  1 copy       frame    -> half      (no threshold, so nothing is cut)
  2 down       half     -> quarter   (5-tap)
  3 up         quarter  -> wide      (8-tap tent, stays at quarter res)
  4 up         wide     -> tight     (8-tap tent, back to half res)
  5 composite  base + tight*f0 + wide*f1

NO BRIGHT PASS IS DELIBERATE. The whole frame blurs and is added back, which lifts the dark
water as well as the lanterns. That matters because the scene has ZERO lights - the lanterns are
visible only through emissive materials, and bloom has been standing in for a lighting rig.

`wide` and `tight` are kept as SEPARATE targets so each survives as its own frequency band; that
is what the two-sampler composite sums. Every tap is offset to land between texels, so the GPU's
bilinear filter fetches four texels per sample for free.

Ducks three's Pass interface (enabled / needsSwap / setSize / render), so EffectComposer drives
it exactly like the stock pass.
```

### Line 31, above `const DEFAULT_SCALE = 0.5;`

```text
Buffer size as a fraction of the frame. A blur chain is low-frequency by definition, so half
  resolution costs a quarter of the fragments for a difference that is very hard to see.
```

### Line 35, above `const HALF_TEXEL = 0.5;`

```text
Tap offset. uHalfTexel is HALF_TEXEL/size, so taps land BETWEEN texels; uTapOffset then scales
  that, making the reach in SOURCE TEXELS equal to
      HALF_TEXEL * (TAP_OFFSET_BASE + radius * TAP_OFFSET_PER_RADIUS)
  which is 0.25 texels at radius 0 and a full texel at radius 1.
```

### Line 43, above `const DEFAULT_STRENGTH = 0.7;`

```text
Rod's numbers, 2026-08-21. Radius is not a blur width: see lerpBloomFactor below.
```

### Line 50, above `const COPY_FRAG = 'uniform sampler2D tDiffuse;`

```text
Straight blit of the frame into the top of the pyramid. This is where the bright pass used to
  be, and removing it is the whole difference between "glow on highlights" and "lift everything".
```

### Line 56, above `const DOWN_FRAG = 'uniform sampler2D tDiffuse;`

```text
5-tap downsample: centre plus four diagonals.
```

### Line 76, above `const UP_FRAG = 'uniform sampler2D tDiffuse;`

```text
8-tap tent upsample: four axis taps at double reach, four diagonals at single reach and double
  weight. The tent is what keeps the halo smooth despite so few taps.
```

### Line 101, above `const COMPOSITE_FRAG = 'uniform sampler2D tDiffuse;`

```text
Unreal's composite, written out for exactly two bands.
  FACTOR_TIGHT/FACTOR_WIDE are the first two of its [1.0, 0.8, 0.6, 0.4, 0.2] mip weights, and
  lerpBloomFactor flips that ramp as radius rises. That is why radius rebalances TIGHT against
  WIDE rather than changing the blur size, exactly as the stock knob did.
```

### Line 237, above `this.paper = {`

```text
Paper filter. Rod's numbers, approved 2026-08-22: it masks the artefacts from the low bloom
      and reflection resolutions and makes them read as intentional. Source: Shadertoy
      bump-from-depth paper displacement, remixed (procedural fbm replaced with a baked texture).
```

### Line 243, on the line `tile2: options.paperTile2 ?? 12,`

```text
second sheet, deliberately a different scale
```

### Line 244, on the line `mix: options.paperMix ?? 0.5,`

```text
0 = first sheet only
```

### Line 245, on the line `blend: options.paperBlend ?? 0,`

```text
see blendSheets() in COMPOSITE_FRAG
```

### Line 246, on the line `bleed: options.paperBleed ?? 0.5,`

```text
the source blended 0.4/0.6; Rod took it to 0.5
```

### Line 249, on the line `boilHz: options.paperBoilHz ?? 2`

```text
the hand-drawn boil; the source used 4
```

### Line 277, above `this.quadScene = new THREE.Scene();`

```text
one fullscreen quad, its material swapped per pass
```

### Line 300, above `setPaperTexture(texture, slot = 0) {`

```text
The pass does not load the texture itself - the caller owns that, so the tuner can swap between
    paper variants without the pass knowing they exist.
```

### Line 327, above `this.copy.uniforms.tDiffuse.value = readBuffer.texture;`

```text
1. whole frame into the top of the pyramid
```

### Line 331, above `this.down.uniforms.tDiffuse.value = this.half.texture;`

```text
2. half -> quarter
```

### Line 337, above `this.tent(renderer, this.quarter, this.wide, tapOffset);`

```text
3 and 4. tent at quarter res for the WIDE band, then back up to half res for the TIGHT one
```

### Line 341, above `const u = this.composite.uniforms;`

```text
5. sum both bands over the original frame
```

### Line 353, above `u.uPaperMix.value = u.tPaper2.value ? p.mix : 0;`

```text
no second texture bound = no second layer, whatever the mix says
```

### Line 359, above `if (p.boilHz > 0) {`

```text
The "boil": re-roll the sheet a few times a second rather than every frame, so it reads as
      hand-drawn rather than as video noise. Quantised in JS so the shader stays arithmetic-free.
```
