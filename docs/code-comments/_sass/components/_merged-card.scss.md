# Comments removed from `_sass/components/_merged-card.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/merged-card/merged-card.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `.merged-cards {`

```text
merged-card - the flip-tile LOOK with the merged-card FUNCTION. merged-card.js owns the tilt,
   the gyro and the dwell-flip; project-cards-expensive adds the cursor glow on top.
   Both citations route through rework-harumaki, which is a file in this repo, so treat the
   provenance the way project-cards-expensive's banner says to.
   THE INNER CLASS NAMES ARE THE SOURCE'S, NOT BEM, on purpose: the CSS and the JS are coupled and
   renaming one side is how they drift apart.
   The --z-* tokens below are the per-layer depths Rod tunes. `no-glass` on the body or the grid
   hides the glass plane for judging. See merged-card.md.
```

### Line 16, above `--z-cover: 2;`

```text
z-depth per layer, at rest and on hover. Rod tunes these.
```

### Line 64, on the line `min-height: 14rem;`

```text
the flip-tile cell height
```

### Line 120, above `.merged-cards .card-cover {`

```text
The cover IS the whole tile: media fills the cell and the gradient seats the text on it.
```

### Line 127, above `background: linear-gradient(160deg, var(--cover-hi), var(--cover-lo));`

```text
No top hotspot here on purpose. There used to be a radial gradient at 50% 0% burning at rest
     on every card, and the card is meant to be lit BY the cursor. Rod 2026-08-18.
```

### Line 178, above `--glass-sheen: linear-gradient(0deg, var(--color-glass-sheen-lo) 0%, var(--color-glass-sheen-hi) 100%);`

```text
The sheen is a token so the expensive card can slide its cursor spill under it without
     copying this gradient and drifting from it.
```

### Line 201, above `.merged-cards .card-body {`

```text
The body overlays the cover at the bottom, flip-tile style.
```

### Line 219, above `line-height: 1;`

```text
Half-empty on purpose. font-weight, font-size and color were deleted 2026-08-23 because
     decisions.scss owns this class and the component was restating all three. They only ever
     resolved right by accident of load order. Do not put them back. See merged-card.md.
```

### Line 232, above `// the odd one out. The old rule also painted a different amber, which is why the yellow looked off.`

```text
Underline on hover, not glow. Rod wants links behaving the same way everywhere, and the glow was
```

### Line 233, above `.merged-cards .post-card:hover .card-title {`

```text
the odd one out. The old rule also painted a different amber, which is why the yellow looked off.
```

### Line 242, above `// This is a deliberate step off the ladder for text that sits on top of animation.`

```text
Weight 400, not the ladder's 300. Thin type over a moving scene shimmers, and Rod could see it.
```

### Line 243, above `.merged-cards .card-title {`

```text
This is a deliberate step off the ladder for text that sits on top of animation.
```

### Line 250, on the line `font-size: 0.7rem;`

```text
T3-E: the floor for small text
```

### Line 282, above `.merged-cards .card-pin--star {`

```text
The star pin. Rod's own gallery tier-badge shape, a rounded square holding one star glyph.
   GOLD, BECAUSE PINK RESOLVED TO NOTHING. `--color-pink` is defined in no stylesheet anywhere, so
   `var(--color-pink, #ff7ec8)` was painting its fallback - an off-palette pink - and nothing
   errored. That is the whole trap: a plausible token name renders wrong in silence.
   See merged-card.md.
```

### Line 313, above `background: linear-gradient(160deg, var(--cover-hi), var(--cover-lo));`

```text
The back had a twin of that top glow and it went with it.
```

### Line 319, on the line `font-family: var(--font-display);`

```text
T0-B: the serif display face
```

### Line 337, on the line `font-size: 0.68rem;`

```text
T3-E: the floor for small text
```

### Line 407, above `.merged-cards--square .card-cover,`

```text
The square variant, Rod's 2026-08-11 shape pass. IT HAS TO STAY LAST IN THE FILE: it must
   out-cascade every radius above it, and the first draft sat before .card-back, lost the tie, and
   left the card backs rounded. The star pin keeps its 5px on purpose.
```
