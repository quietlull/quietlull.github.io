# Comments removed from `_sass/components/_toc-real.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/toc-real/toc-real.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `.toc { --pad-inline: 0.5rem; }`

```text
toc-real - Starlight's desktop rail, ported without their mobile popup.
   docs.astro.build, read from their served file. Remixed: theirs structurally, ours for every
   colour, the squaring and the sticky-not-fixed choice.

   THIS FILE STATES NO BREAKPOINT, AND THAT IS THE FIX. The narrow-width TOC on the live site is
   Chirpy's `#toc-bar` plus its `<dialog id="toc-popup">`, because `toc.js` decides which of the
   two tocbot instances runs from `matchMedia('(min-width: 1200px)')` and below that it fills
   `#toc-popup-content`, never `#toc`. The rail is empty under 1200px whatever CSS says, so the
   number belongs to the JS and the one CSS statement of it lives with the page that owns the
   rail's layout: `_sass/pages/_post.scss` hides `#toc-wrapper`, the whole Contents block, label
   included. Hiding `.toc--v3` from here as well left the label stranded above nothing, and did
   it at a different number (72rem / 1152px), which is what put a second breakpoint in play.

   Starlight's `.toc-pop` popup went with it. It was ported as a full component and no markup for
   it was ever written, on this page or any other, so what shipped below 1152px was always the
   Chirpy bar and the popup CSS was dead weight. The lab page still has both, in its own copy at
   redesign-lab/extracted/components/toc-real/toc-real.css, which this file does not feed.
   See toc-real.md.
```

### Line 30, above `.toc a {`

```text
The indent formula, theirs, and the core of the treatment: one inline `style="--depth"` drives
   the whole hierarchy. They write it on four elements; only `a` reads it, so we set it there.
```

### Line 35, on the line `border-radius: 0;`

```text
theirs is .25rem; squared per the house rule
```

### Line 38, on the line `font-size: 0.8125rem;`

```text
their --sl-text-xs
```

### Line 39, on the line `color: var(--color-silver, #a3a19d);`

```text
theirs is a cool grey #888c96; ours is warm
```

### Line 41, on the line `overflow-wrap: anywhere;`

```text
theirs; a long heading must not blow the rail out
```

### Line 42, on the line `border-bottom: 0;`

```text
cancels the global prose-link hairline
```

### Line 47, above `.toc a[aria-current="true"] { color: var(--color-gold, #fbbf24); }`

```text
The active state, and the nuance that keeps the rail quiet: Starlight carries it with a
   LIGHTNESS STEP, not a hue pop. Gold against silver is the same step. Take the hue without the
   lightness relationship and you get a much louder rail than theirs. See toc-real.md.
```

### Line 52, above `.toc--v1 {`

```text
V1 - Starlight faithful, a FIXED rail. The cost is theirs and is why V2 exists: top:0 forces
   a padding-top equal to the nav height just to push content back under the header.
```

### Line 61, on the line `padding-top: var(--nav-h, 3.5rem);`

```text
the compensation a fixed rail forces
```

### Line 65, above `.toc--v2 {`

```text
V2 - sticky instead of fixed. OURS, and a real simplification: a sticky rail never leaves the
   flow, so it needs no padding-top compensation at all. Everything else matches V1.
```

### Line 76, above `.toc--v3 {`

```text
V3 - sticky, plus a second channel on the active item. OURS. Marking it by colour alone is a
   WCAG 1.4.1 exposure; Starlight has it and we do not have to inherit it.
```

### Line 91, above `/* No reduced-motion path is needed: nothing here transitions. If motion is ever added, copy`

```text
THE ANCHOR-UNDER-HEADER FIX IS DELIBERATELY NOT HERE. decisions.scss already sets
   scroll-margin-top on the heading targets, and adding scroll-padding-top on html does not
   override it - THE TWO ADD, and every in-page jump overshot by 80 to 116px. One offset, on the
   target, is enough. Starlight's own formula is worth keeping in mind if the offset ever moves
   off the targets, and it is in toc-real.md.
```

### Line 97, above `/* NOT TAKEN, and each would need its own source: their base64 checkmark and a sliding marker`

```text
No reduced-motion path is needed: nothing here transitions. If motion is ever added, copy
   Starlight's inverse gate and opt IN to motion instead:
   @media (prefers-reduced-motion: no-preference).
```

### Line 101, above `}`

```text
NOT TAKEN, and each would need its own source: their base64 checkmark and a sliding marker
   instead of a colour swap - that last one is VitePress's geometry, not Starlight's.
```
