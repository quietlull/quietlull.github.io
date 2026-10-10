# Comments removed from `_sass/components/_search-field.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/search-field/search-field.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 6, above `@layer components {`

```text
SEARCH FIELD - six candidates, each built from CSS read off a live site 2026-08-24.
   Sources: redesign-lab/sources/search-fields-2026-08-24.md
   The slot exists because `list-controls`, the current search, cites a file inside this repo and
   is therefore Slop and cannot ship. All six are Remixed: their mechanism, our tokens, squared.
   See search-field.md, which also lists the house rules they are built against.
```

### Line 13, above `.sf {`

```text
Skeleton only. Every visible decision lives in a variant, so one can be lifted out clean.
```

### Line 34, above `.sf__mark {`

```text
The magnifier. The placement wells are Paris Review's and A24's; the mark itself is ours,
     because theirs is Font Awesome and does not carry over.
```

### Line 47, above `.sf--ronja {`

```text
A - ronja. https://www.ronja-tutorials.com/, always open inline, filters as you type.
     Their site styles the field NOT AT ALL, so this is the browser's box drawn just far enough
     to read on a dark ground. Idea theirs, look unavoidably ours.
```

### Line 57, above `.sf--pr-desk {`

```text
B - paris-review desktop. `input.search-input { padding: 0 2.25em; background: #f7f7f7 }`.
     The fill IS the box: no border, square, icons sitting in asymmetric padding wells rather than
     as siblings. That asymmetry is the idea, kept exactly. Their light fill maps to our panel.
```

### Line 70, above `.sf--pr-mob {`

```text
C - paris-review mobile. `#int-nav-search-input_mobile { background: transparent;
     border-bottom: 1px solid #333 }` with the fill arriving on focus. The same site's other
     treatment, and the one that survives our scene rule. Remixed only in colour.
```

### Line 82, above `.sf--cinra {`

```text
D - cinra. A border that exists at rest but matches the fill, then darkens on focus, so
     focus costs zero layout: nothing grows, nothing reflows, the edge just appears.
     Their trick needs an opaque fill and ours sits over the scene, so the resting border takes
     the fill's own colour instead. Their 4px radius is squared.
```

### Line 97, above `.sf--craigmod {`

```text
E - craigmod. `#fastSearch input { background:#000; border-radius: 8px 8px 0 0 }`.
     Input and results are one continuous slab, which is why only its top corners are round.
     Squaring it costs that reading, and that is flagged, not hidden. Their blur and their blue
     <mark> are both dropped: blur is the glass tell, blue is a cool accent outside the sky.
```

### Line 113, above `.sf--a24 {`

```text
F - a24. `.search-form { font-size: 48px; line-height: .92; letter-spacing: -.04em }`.
     No field chrome at all - the input IS the display type and the label is the affordance.
     Their 74px will not fit a 50px box, so the size is ours and the proportions are theirs.
```

### Line 133, above `@layer overrides {`

```text
THIS BLOCK HAS TO BE IN `overrides` AND CANNOT MOVE. Rod asked for the yellow highlight on
   the search box to go (2026-08-24). `.sf__input { outline: none }` above did not stop it,
   because that rule is in `components` and the global ring is in `overrides`, and layer order
   beats specificity outright.
   What replaces it is cinra's own trade, already built as variant D: the resting border simply
   turns gold. Measured 5.27:1 against its own hairline, so it clears WCAG 2.4.7 and 2.4.13.
   Deleting the ring with nothing in its place would fail 2.4.7. See search-field.md.
```
