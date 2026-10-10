# Comments removed from `_sass/base/_foundations.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/foundations.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `:root{`

```text
The ground every page is painted on. Palette locked 2026-06-04: night behind everything, amber
   for warm fills, gold for the bright accent, and a hotter SATURATED orange for the glow halos -
   like hana's saturated red, never pale cream. No pink.

   THE SHORT NAMES BELOW ARE A DELIBERATE SECOND SET, NOT A LEFTOVER. --night, --panel, --gold,
   --text and --muted hold the same values as --color-night, --color-panel-solid, --color-gold,
   --color-text and --color-muted in abstracts/_tokens.scss. Both sets are live and both are read.
   DO NOT DELETE EITHER ONE - dropping the short names takes the page ground with them.
```

### Line 16, on the line `--night:#070C23; --night2:#0a1030; --panel:#1c1a18;`

```text
the warm grey, Rod 2026-08-23
```

### Line 33, above `overflow-x:clip;`

```text
CLIP, NOT HIDDEN, and this is what makes the top bar sticky again. Rod 2026-08-25 asked why the
     bar scrolls away; measured on a post at 1200 wide, it sat at 0 and went to -600 after scrolling
     600. `overflow-x:hidden` normally propagates to the viewport and leaves sticky alone, but
     _sass/base/_base.scss also gives the ROOT an overflow at >=850px, and a non-visible root stops
     that propagation - so BODY became the scroll container and every sticky element inside it stuck
     to a box that never scrolls. Probed it: the bar's nearest scrollable ancestor really was BODY.
     `clip` hides the same overflow WITHOUT creating a scroll container, so sticky survives. This is
     the fix docs/TRAPS.md already recorded; the port carried the bug across instead of the fix.
     Six sticky elements depend on it: the top bar, the post contents rail and four more.
```

### Line 46, above `body::before{content:"";position:fixed;inset:-12%;z-index:-1;pointer-events:none;opacity:.8;`

```text
The saturated-orange glow across the page. It used to breathe on a 16s cycle; breathing is
   dead (D43), so it holds still at the .8 the reduced-motion branch had already settled on.
   THE ONE PLACE THIS FILE DIVERGES FROM THE LAB ORIGINAL.
```

### Line 55, above `.reveal{opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.2,.6,.2,1),transform .7s cub`

```text
The card-in reveal. An IntersectionObserver in sliders.js adds .in.
```

### Line 64, above `}`

```text
THE BENCH FURNITURE IS GONE, 2026-08-25. Rod: "the lab tuning panel styling ships on the real
   site ... clean this". This file always said it would go: the block that stood here was headed
   "EVERYTHING BELOW THIS LINE IS BENCH FURNITURE, not the design".
   It was the greybox placeholder, the lantern demo and the lab's own slider panel, about 20 lines
   compiled into every page a visitor loads. VERIFIED UNUSED BY EXACT CLASS TOKEN, not by substring:
   .ph .lantern .lab .labtag match ZERO elements across the real built pages. Every apparent hit was
   inside _site/redesign-lab/, which is the workbench Jekyll also copies locally and is not the site.
   That distinction mattered - a careless grep counted 33 hits for ".lab" purely from the word
   "redesign-lab" in other class names.
    above is deliberately KEPT: it sits above the old bench line, so it is real ground.
```

### Line 76, above `.d-none { display: none !important; }`

```text
THE TWO SURVIVORS OF BOOTSTRAP (D48). Everything else the framework supplied was either unused
   or already re-specified by our own components; these two class names are toggled or carried by
   markup and scripts we keep, so they get three lines here instead of a framework:
     .d-none     - mermaid.js:29 hides the pre-render backup element with it
     .invisible  - `#toc-wrapper` ships with it and toc.js removes it once the rail is built.
                   (It used to name the post's #toc-bar too; that element was deleted 2026-09-03.)
   Named identically on purpose: renaming would mean editing stock Chirpy scripts (D2).
   THEY SIT OUTSIDE EVERY LAYER DELIBERATELY, which the load-order checker flags unless it is
   said out loud here. Unlayered CSS beats every layer, and that is exactly what a hiding
   utility needs: `.d-none` must win over whatever a component says about display, or the
   thing it is meant to hide stays visible. `.d-none` carries !important for the same reason.
   This is the ONE place in the codebase where beating the layers is the intent.
```
