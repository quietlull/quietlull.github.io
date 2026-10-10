# Comments removed from `_sass/components/_project-cards-expensive.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/project-cards-expensive/project-cards-expensive.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `.epx {`

```text
project-cards-expensive - the cursor-tracked band reveal. merged-card.scss styles the cards
   themselves; this only adds the glow on the glass, front and back.
   SLOP, AND THE CITATION IS DEAD. It claimed yannesidibe .glow via a rework page in this repo,
   which is our own build, and a re-fetch found the source page returns 404 with nothing matching
   on the live site. Do not restate it. A provenance comment is a claim, not evidence.
   Note the exception: achievement-wall corrects this stamp for the RIM technique specifically,
   which does have older and more specific records. See project-cards-expensive.md.
```

### Line 65, above `.wrapper-project-card-grid.is-staggered,`

```text
Rod's uniform layouts: staggered and regular both use square cards. Bento, the default with no
   class, keeps the varied [6r2][6][6][12] sizes.
```

### Line 88, on the line `aspect-ratio: 1 / 1;`

```text
uniform squares
```

### Line 91, above `.wrapper-project-card-grid.is-staggered {`

```text
Staggered - Studio Gohan's "Works" brick. The zig-zag is a STATIC offset, not an animation.
```

### Line 101, above `.wrapper-project-card-grid.is-regular {`

```text
Regular - uniform squares, no offset.
```

### Line 118, on the line `transform: translateY(36px);`

```text
2-col zig-zag on narrow screens
```

### Line 122, above `.wrapper-project-card-grid .ct-glow-card .glass-plane {`

```text
THE REVEAL MATERIAL, Rod's pick on the glow-edge bench 2026-08-13: additive, soft edge, spill.
   It used to read as a metal band, because a hard-cut 1.5px strip with a bright spot sliding
   along it IS how you build a specular highlight on polished trim.
   All three fixes below are load-bearing. blur turns the mask's hard cuts into falloff so it
   stops being a strip; plus-lighter EMITS light where metal only reflects it; the unmasked wash
   is the surface being lit by the edge. Take the blur out and the metal band comes back.
   See project-cards-expensive.md.
```

### Line 162, above `.wrapper-project-card-grid .ct-glow-card .card-back::before {`

```text
The back carries the same glow. It is PRE-rotated 180deg, so it reads un-mirrored once the
   flipper flips - which is why this uses the normal --mx and not a mirrored coordinate.
```

### Line 168, on the line `z-index: 1;`

```text
above the spill below, matching the front's layer order
```

### Line 176, above `background:`

```text
Two layers in one pseudo, matching the front's two rings. The first background layer paints
     on top, so the soft one has to lead to match the front's order.
```

### Line 185, above `.wrapper-project-card-grid .ct-glow-card .card-back {`

```text
Rod 2026-08-13: "back looks different". It was, in three ways - a brighter static border, one
   ring layer instead of two, and a spill running to the edge instead of inset 8px. All matched.
```

### Line 191, above `.wrapper-project-card-grid .ct-glow-card .card-back::after {`

```text
The back's inward spill. z-index:-1 is what puts it above the back's background but UNDER the
   text - .card-back is rotated, so it makes a stacking context and a negative child paints in
   between. Without it the wash sits on top of the copy.
```

### Line 205, above `.wrapper-project-card-grid .ct-glow-card:hover .card-cover {`

```text
A SUPPRESSOR, not decoration. It holds merged-card's hover down so the cursor reveal is the
   one that reads. Delete it and the card GAINS a 24px gold bloom - the opposite of what it looks
   like this rule does. See project-cards-expensive.md.
```
