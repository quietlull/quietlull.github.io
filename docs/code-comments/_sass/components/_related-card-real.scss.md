# Comments removed from `_sass/components/_related-card-real.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/related-card-real/related-card-real.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `/* The grid, 3-up for related (P9). The parent's 'min-height: 14rem' is a flip-tile leftover`

```text
related-card-real - the project card, stripped down so the text leads.
   TIER: OURS. IDEA-ORIGIN: ROD. There is no external parent, and yannesidibe, merodev and the
   unnamed CodePen must NOT be restated as provenance - the yannesidibe page is a 404 now and
   nothing on their live site matches the claim.
   BUILT STANDALONE, NOT AS A DIFF against project-cards-expensive. Subtracting three rules from
   a file with six transitions, two glow systems and a JS tilt does not give you a motionless
   card - and one of those three deletions ADDS glow, because the rule is a suppressor.
   See related-card-real.md, which carries that correction in full.
```

### Line 16, above `.rc-grid {`

```text
The grid, 3-up for related (P9). The parent's `min-height: 14rem` is a flip-tile leftover
   that fights aspect-ratio, and scaling is Rod's one open complaint, so it is left behind.
```

### Line 27, above `.rc {`

```text
The card. Square from the start, rather than the parent's trick of a --square modifier
   parked last in the file to out-cascade its own rounded base.
```

### Line 35, on the line `border: 1px solid var(--color-line-card);`

```text
the parent's resting border, verbatim
```

### Line 38, above `}`

```text
No transition, transform, filter, glass plane or glow ring, and that is the design.
     Rod: "keep them pretty motionless we dont want stuff interrupting their ability to focus
     on the text." You get motionless by not writing motion, not by deleting it later.
```

### Line 45, above `.rc__title {`

```text
Two lines, hard. Rod 2026-08-24: "the boxes should always be the same size". It took two
   fixes: the grid had `align-items: start`, which sizes each card to its own content, and even
   with `stretch` the tallest card still sets the row. The clamp caps what one card can demand.
```

### Line 61, on the line `font-size: 0.7rem;`

```text
the T3-E floor, from the parent
```

### Line 68, above `.rc:focus-visible {`

```text
FOCUS - the one part here with real external provenance, and it fixes a live bug.
   sources/focus-ring.md (Bootstrap 5.3, dev.to hybrid_alex, darekkay). Remixed, theirs.
   The card is a full-card <a> and NOTHING in merged-card, project-cards-expensive or foundations
   declares :focus-visible. That is a WCAG 2.4.7 failure today.
   Their glow option is out on Rod's instruction; the border colour change costs no motion and
   still clears the 3:1 non-text bar. See related-card-real.md.
```

### Line 75, on the line `outline: 2px solid transparent;`

```text
Windows High Contrast drops box-shadows; never make
                                        this outline:none
```

### Line 81, above `.rc:hover { border-color: var(--color-gold, #fbbf24); }`

```text
Hover is full gold. A tone-down to 0.55 was made and withdrawn by Rod the same day.
   Focus stays a SEPARATE rule on purpose, so a future hover retune cannot weaken keyboard
   focus. That split is not a taste call.
```

### Line 86, above `.rc::after { content: none; }`

```text
KEEP THIS. The card is an <a> inside .prose, so decisions.scss's underline-grow was drawing a
   2px bar 243px across the whole tile. That rule is written for a run of text. Answered here
   rather than with a :not() in the ladder, because components beats prose in the layer order.
   The bar is absolutely positioned, so switching it off moves no layout.
```

### Line 92, above `/* V1 - text only. The quietest answer to "focus on the text", and the cheapest to keep. */`

```text
Three versions, differing on how much of the parent's identity survives the strip.
   THE BLUE PROBLEM decides V2: the parent's cover fill is midnight blue, and those are among the
   last blue fills left in the bench after D27 turned every other surface warm grey. Building on
   them would re-import a dead palette.
```

### Line 97, above `.rc--v1 .rc__cover { display: none; }`

```text
V1 - text only. The quietest answer to "focus on the text", and the cheapest to keep.
```

### Line 100, above `.rc--v2 .rc__cover {`

```text
V2 - cover kept, everything else gone. PICKED BY ROD 2026-08-23, then corrected: the gradient
   used to run the panel toward BLACK, which put both stops below the night ground and made the
   card read as a muddy hole. It now runs from a LIFT of the panel down to the panel, which keeps
   the parent's light-to-dark direction and stays warm. Do not mix toward black again.
```

### Line 113, above `.rc__cover > video { max-width: 100%; }`

```text
THE COVER CAPS ITS OWN VIDEO (P534). Images are capped site-wide by the reset layer; videos are
   not, and the only rule that capped one here was the post page's `#post-page .content video`.
   Outside a post an uncapped video kept its full pixel width and forced its grid column open, so
   a 1920px clip beside a 616px one gave three unequal cards. Measured on a live post at 1440 and
   700 wide: identical, since the page rule already set the same value.
```

### Line 123, on the line `height: 62%;`

```text
the parent's number, verbatim
```

### Line 127, above `pointer-events: none;`

```text
The scrim was always correct; the muddiness was the cover under it.
```

### Line 131, above `.rc-grid--v3 { display: block; }`

```text
V3 - not a card at all, a hairline row. OURS, and it is the floor of the range: a related
   list is end matter, not a showcase. Here if V1 still reads as too much furniture.
```

### Line 149, above `}`

```text
No reduced-motion block, because nothing here moves. That absence is deliberate.
```
