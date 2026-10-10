# Comments removed from `_sass/components/_line-boil.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/line-boil/line-boil.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `// Paths repointed 2026-08-25 out of the gitignored lab folder into /assets/fonts/.`

```text
line-boil - the H0 site mark, animated by swapping between three hand-drawn faces.
   ORIGIN: ROD. The faces are his own scratch fonts. The mechanism is traditional 2D animation,
   three drawings cycled in order - nothing here is transcribed from a website.
   Rod picked the pattern 2026-08-23: "Sequential per glyph 6sec on 4's looks best for me."
   Each glyph must start on a RANDOM face or the whole word changes as a block, which is a no-op.
   The three faces DISAGREE ON METRICS - 55 of 68 glyphs differ in advance width - so the JS pins
   each glyph's box once and the letter boils inside it. Every metric they disagree on has to come
   out of the layout, which is what the two rules below are for. See line-boil.md.
```

### Line 16, above `// A 404 here does NOT render as a missing font. The boil pins each glyph's width in pixels at`

```text
Paths repointed 2026-08-25 out of the gitignored lab folder into /assets/fonts/.
```

### Line 17, above `// load, so a face that fails to load pins FALLBACK metrics and the wordmark stays mis-spaced`

```text
A 404 here does NOT render as a missing font. The boil pins each glyph's width in pixels at
```

### Line 18, above `// forever, silently. Check it with 'document.fonts.check('1em Lineboil1')' in the page.`

```text
load, so a face that fails to load pins FALLBACK metrics and the wordmark stays mis-spaced
```

### Line 19, above `@font-face {`

```text
forever, silently. Check it with `document.fonts.check('1em Lineboil1')` in the page.
```

### Line 26, on the line `line-gap-override: 0%;`

```text
block, not swap: a swap flash would show the wrong letterforms
```

### Line 47, above `@font-face {`

```text
The digit faces are NOT a fourth font. `unicode-range` lets one family name be built from
   several files, so "Lineboil1" means Rod's letters plus Rod's numerals, and a clock boils by
   the same code path as a word.
   The colon is deliberately outside this range - none of the number faces even contains it, so it
   falls through to the letter face on its own and the JS needs no special case.
   Declared after the letter faces on purpose: the later rule wins, and the letter faces have no
   digits to lose. See line-boil.md.
```

### Line 84, above `/* This is the jiggle Rod reported three times, and nothing on the page was ever moving.`

```text
The host. Colour comes from the H0 token so the mark cannot drift from the ladder.
```

### Line 86, above `.line-boil-text {`

```text
This is the jiggle Rod reported three times, and nothing on the page was ever moving.
   Chrome's scroll anchoring watches content above the viewport and nudges scrollTop to hold the
   view steady when it changes. The boil replaces every glyph six times a second, so the browser
   re-anchored six times a second and the page rocked. Measured: scrollY drifted 8px in time with
   the boil while every box stayed stable to three decimals. Fixed to 0. See line-boil.md.
```

### Line 100, above `/* vertical-align: top is load-bearing, not tidying. An inline-block sits on the baseline of its`

```text
One box per glyph, sized from font 1 and never resized. `inline-size`, not `width`, because
   the hero runs vertical-rl and width would pin the wrong axis.
```

### Line 103, above `.line-boil-text__g {`

```text
vertical-align: top is load-bearing, not tidying. An inline-block sits on the baseline of its
   own text, and the three faces do not share one, so every swap re-seated the cell and the line
   box grew and shrank by a pixel six times a second. `top` takes them off the baseline entirely.
   Measured on the top-bar mark: container swung 59.84 <-> 60.84. See line-boil.md.
```

### Line 108, on the line `overflow-anchor: none;`

```text
the swapped element itself; see .line-boil-text above
```

### Line 114, above `}`

```text
Reduced motion is deliberately not handled. Rod ruled it out of scope (D34). Do not "fix" it.
```
