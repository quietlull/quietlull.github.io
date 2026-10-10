# Comments removed from `_javascript/three-config.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Bloom, lanterns, fireworks, and avoidance are identical everywhere.`

```text
Shared scene configuration — single source of truth for all pages.
```

### Line 2, above `// Only water, dock, and scroll camera vary by page preset.`

```text
Bloom, lanterns, fireworks, and avoidance are identical everywhere.
```

### Line 3, above `export const CONFIG = {`

```text
Only water, dock, and scroll camera vary by page preset.
```

### Line 18, above `// pass is gone, so the whole frame blurs and is added back (D23).`

```text
Retuned 2026-08-21 (Rod) for the Dual Kawase pass. No threshold knob any more: the bright
```

### Line 19, above `// At these numbers the composite adds 0.7 * (0.88 + 0.74) = 1.13x the frame back as glow,`

```text
pass is gone, so the whole frame blurs and is added back (D23).
```

### Line 20, above `// against 0.45 * 1.8 = 0.81x before, so roughly 1.4x more light than the old settings.`

```text
At these numbers the composite adds 0.7 * (0.88 + 0.74) = 1.13x the frame back as glow,
```

### Line 21, above `// Radius is NOT a blur width - it rebalances the tight band against the wide one.`

```text
against 0.45 * 1.8 = 0.81x before, so roughly 1.4x more light than the old settings.
```

### Line 22, above `strength: 0.7,`

```text
Radius is NOT a blur width - it rebalances the tight band against the wide one.
```

### Line 25, above `// 0.5 -> 0.25 (Rod, 2026-08-22). Only viable because of the paper filter below: Rod judged`

```text
Fraction of the frame the blur chain runs at. Owned by the pass, applied in setSize.
```

### Line 26, above `// that it "completely masks" the artefacts this resolution would otherwise show.`

```text
0.5 -> 0.25 (Rod, 2026-08-22). Only viable because of the paper filter below: Rod judged
```

### Line 27, above `scale: 0.25,`

```text
that it "completely masks" the artefacts this resolution would otherwise show.
```

### Line 31, above `paper: {`

```text
PAPER FILTER (Rod, approved 2026-08-22). Two baked sheets at different tilings, composited
      inside the bloom pass so it costs no extra pass - see shader/kawaseBloom.js.
      This is what pays for the low bloom/reflection resolutions and the 0.5 pixel ratio: Rod,
      "the artifacts ... get completely masked and makes it look intentional with the paper grain."
```

### Line 36, above `// at 4x sits inside it as tooth. SUBTRACT, not crossfade - the sheets cancel where they`

```text
BAKED 2026-08-22 (Rod). Washi at screen scale carries the big fibre structure; cold press
```

### Line 37, above `// agree, which keeps the combined field from just reading as more noise.`

```text
at 4x sits inside it as tooth. SUBTRACT, not crossfade - the sheets cancel where they
```

### Line 38, above `sheet: 'paper-washi',`

```text
agree, which keeps the combined field from just reading as more noise.
```

### Line 43, on the line `blend: 2,`

```text
2 = subtract; see blendSheets() in shader/kawaseBloom.js
```

### Line 60, above `// Layer A = whole-screen parting (proximityRadius/avoidanceStrength), Layer B = extra local`

```text
Lantern/firefly avoidance — reworked 2026-06-15 (Sarah): layered direct-displacement field.
```

### Line 61, above `// push (localRadius/localStrength), knock = impulse (knockRadius/knockStrength). Values tuned`

```text
Layer A = whole-screen parting (proximityRadius/avoidanceStrength), Layer B = extra local
```

### Line 62, above `// in redesign-lab/lantern-lab.html on lab-scale props -> radii likely need a re-tune per scene.`

```text
push (localRadius/localStrength), knock = impulse (knockRadius/knockStrength). Values tuned
```

### Line 63, above `proximityRadius: 1000,`

```text
in redesign-lab/lantern-lab.html on lab-scale props -> radii likely need a re-tune per scene.
```

### Line 89, above `// Measured on the About scene: real scene content ends at z -1130 and the water plane reaches`

```text
Depth band, retuned 2026-08-16 once `??` stopped the old `||` from eating `minZ: 0`.
```

### Line 90, above `// z -4500, so this band sits behind everything and still over the water. Kept NARROW on`

```text
Measured on the About scene: real scene content ends at z -1130 and the water plane reaches
```

### Line 91, above `// purpose - the old effective range was -10000..-200, and that 9800-unit spread is what made`

```text
z -4500, so this band sits behind everything and still over the water. Kept NARROW on
```

### Line 92, above `// shells inconsistent, reading 110% of screen height at the near end and 7% at the far end.`

```text
purpose - the old effective range was -10000..-200, and that 9800-unit spread is what made
```

### Line 93, above `// At this depth a burst spans roughly 15-44% of screen height (fov 55, camera z 500).`

```text
shells inconsistent, reading 110% of screen height at the near end and 7% at the far end.
```

### Line 94, above `minZ: -3000,`

```text
At this depth a burst spans roughly 15-44% of screen height (fov 55, camera z 500).
```

### Line 98, above `// It has no off switch by design, and since the earned reward stream was scrapped (D28) it is`

```text
The permanent top-of-page GREETING (Rod 2026-08-16): calm, a few shells in the air at once.
```

### Line 99, above `// the only automatic stream left. Note maxLive is a CEILING, not a target: a shell lives about`

```text
It has no off switch by design, and since the earned reward stream was scrapped (D28) it is
```

### Line 100, above `// 1.7s, so the delay is what actually decides how many are up at once.`

```text
the only automatic stream left. Note maxLive is a CEILING, not a target: a shell lives about
```

### Line 101, above `greeting: {`

```text
1.7s, so the delay is what actually decides how many are up at once.
```

### Line 103, on the line `delay: 0.85,`

```text
Seconds between shells (3x the first pass, Rod judged it by eye)
```

### Line 104, on the line `delayVariation: 0.35,`

```text
Random +/- variation in seconds
```

### Line 105, on the line `amount: 1,`

```text
Shells per burst
```

### Line 106, on the line `maxLive: 4,`

```text
Greeting shells allowed on screen at once
```

### Line 124, above `// Bloom, lanterns, fireworks, and mouse avoidance are always active.`

```text
Page presets — only water, dock, and scroll camera vary.
```

### Line 125, above `export const PRESETS = {`

```text
Bloom, lanterns, fireworks, and mouse avoidance are always active.
```

### Line 127, on the line `full: {`

```text
About page: full scene with water, dock, scroll camera
```

### Line 132, on the line `standard: {`

```text
All other pages: no water/dock, static camera
```
