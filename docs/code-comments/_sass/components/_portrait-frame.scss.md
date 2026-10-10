# Comments removed from `_sass/components/_portrait-frame.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/portrait-frame/portrait-frame.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `/* The reservation, and nothing else. 'position: relative' is load-bearing for V2 only, where the`

```text
portrait-frame - the portrait in the About rail. Three frames, one measured box.
   THE BOX IS A MEASUREMENT, NOT A CHOICE: 191 x 200, and 191 is the 225px rail minus the panel's
   own 2px borders and 15px padding. Confirmed against the rendered page. Every version fits by
   construction on both axes, so nothing here can overflow.
   V1 and V2 are `.fig` elements and the caption is figure-real's, not restated here. Their
   overrides use `.fig.pf` so they beat figure-real without depending on load order.
   Nothing animates, so there is no reduced-motion block; two source motions were dropped and both
   are recorded. THE REAL IMAGE DOES NOT EXIST YET. See portrait-frame.md.
```

### Line 16, above `.pf,`

```text
The reservation, and nothing else. `position: relative` is load-bearing for V2 only, where the
   four corner divs pin to it, but it costs nothing on the other two.
```

### Line 29, above `.pf .pf__media {`

```text
The media CROPS, which is a real departure: catlikecoding's figure premise is that an image
   renders at its intrinsic size, and a fixed 191x200 hole cannot honour one. The doubled selector
   is what beats figure-real without an !important or a load-order rule.
```

### Line 39, above `.pf .pf__media--empty {`

```text
No asset exists yet, so the placeholder says so rather than pretending.
```

### Line 54, above `.fig.pf figcaption {`

```text
The caption is figure-real's. The one thing added is a pinned line-height, because with
   `normal` the caption height is font-dependent and the image cell stops being a number anyone
   can state. This makes the caption block exactly 26.2px.
```

### Line 61, above `.fig.pf--plain {`

```text
V1 - NO FRAME, just the settled figure decision sized to the box (catlikecoding, via
   figure-real, Rod picked it 2026-08-23). Nothing new is invented here.
   `margin: 0` cancels figure-real's `2em auto`, which is the rhythm between figures in a prose
   column - in a rail slot it would push the component out of its own reservation.
   Image cell 191 x 173.8.
```

### Line 73, above `.fig.pf--brackets {`

```text
V2 - CORNER BRACKETS, a frame that is not a box. filipporuffini.com, re-verified live
   2026-08-23. Remixed, theirs. Their four-div variant, because the pseudo-element half of their
   system lives in an inline style block the fetch could not read - so this uses only what was
   actually verified.
   THE ARM IS 2.5rem BY ARITHMETIC, NOT TASTE: their large arm is 100px, and on a 191-wide box two
   of those would overlap by 9px. 40px leaves a 111px gap and the elbows still read as elbows.
   Their hover-grow is not carried - that is their CURSOR behaviour, not their frame's.
   Image cell 161 x 143.8. See portrait-frame.md.
```

### Line 85, on the line `padding: 0.9375rem;`

```text
verbatim, their .corners
```

### Line 88, above `.pf__corners {`

```text
Their .p-corners. The overlay is the full box, so the brackets sit on the outer edges while
   the media stays inset by the padding above.
```

### Line 96, above `.pf__corner {`

```text
Their .p-corner: a square with no background, painting two adjacent borders only.
```

### Line 131, above `.pf--window {`

```text
V3 - NAMED WINDOW, the portrait as an object with a title bar. THIS IS THE ONE ROD PICKED.
   109ichiki.com, re-verified live 2026-08-23. Remixed, theirs, and Rod named their popup windows
   himself (D15/P64). It is the portal's own dialog frame, so the portrait speaks the portal's
   language instead of inventing a second frame vocabulary.
   THE GRID ROW `2rem 1fr` IS THE POINT: the bar takes its height and the body takes the rest, at
   any size, with no padding number to keep in sync.
   Four departures: squared, their light-page border relationship remapped rather than their
   values, no solid ground because ours is a live scene, and no close button because a portrait
   pinned in a rail cannot be closed and the X would lie.
   No caption, and that is the version's argument: the bar already names the subject.
   Image cell 187 x 164, the largest of the three. See portrait-frame.md.
```

### Line 149, on the line `grid-template-rows: 2rem 1fr;`

```text
verbatim
```

### Line 161, on the line `padding: 0 0.5rem 1px 0.625rem;`

```text
verbatim
```

### Line 167, on the line `font-size: 0.9375rem;`

```text
verbatim; their --font-size-base-en, read live
```

### Line 168, on the line `padding-bottom: 1px;`

```text
verbatim
```

### Line 169, on the line `pointer-events: none;`

```text
verbatim
```

### Line 172, above `min-width: 0;`

```text
Ours. The usable title width is 169px and their windows are 280-340, so they never needed
     this. At 169 a long name has to end somewhere chosen.
```

### Line 184, on the line `contain: paint;`

```text
verbatim
```

### Line 187, above `.pf--window .pf__media[data-placeholder="true"] {`

```text
THE FRAME IS DECIDED AND THE CONTENT IS NOT. Rod 2026-08-23: "portrait should just be named
   window use my fav icon for now I need to make an image at some point."
   The favicon is an already-approved component, which is exactly why it is the right stand-in -
   it adds no sourcing debt. `data-placeholder="true"` in the markup is what actually stops it
   shipping by accident. See portrait-frame.md.
```

### Line 198, above `.pf--window .pf__media[data-placeholder="true"] .favicon { width: 100%; height: 100%; }`

```text
THE FAVICON FILLS THE WINDOW, Rod 2026-08-24: "make fav icon same size as the window". It used
   to be pinned small so it could not be mistaken for the real portrait; the later call wins, and
   the stand-in now occupies the frame the real image will. data-placeholder is the safeguard, not
   the size. 62.5% is measured against the window's SHORT side so it scales with the frame.
   `width: auto` because the source viewBox is 520x546 and forcing both axes would squash it.
```

### Line 207, above `}`

```text
STILL OPEN, and it is Rod's: the real portrait does not exist. Frame approved, content
   pending, and the two must not be conflated when the slot is marked done.
```
