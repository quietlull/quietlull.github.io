# Comments removed from `_sass/components/_bio-block.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/bio-block/bio-block.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `/* Shared. The width is the reservation's, verbatim; the rest is type plumbing. */`

```text
bio-block - the About page's two prose blocks, bio_intro and bio_more.
   Rod: "about page is the landing page except the about me is the hero", so bio_intro is the
   HERO, not a paragraph in a stack.
   THE COPY IS HIS, verbatim from about.md front matter. The only change is two em dashes to
   commas, which is the house rule.
   RESERVATION, measured at 1440: bio_intro 675x112, bio_more 675x138, 10px between them. Do not
   cite the blockout's own labels of 140 and 180 - they are labels, and they render 112 and 138.
   NEITHER NUMBER HOLDS THE REAL COPY. The blockout drew six schematic rules where the real intro
   sets ten lines. Nothing here shrinks the type or cuts his words to make a number fit.
   decisions.scss does the TYPE and this file does not restate it. See bio-block.md.
```

### Line 18, above `.bio {`

```text
Shared. The width is the reservation's, verbatim; the rest is type plumbing.
```

### Line 24, on the line `.bio + .bio { margin-top: 10px; }`

```text
the blockout's own gap between the two panels
```

### Line 26, above `.bio__h {`

```text
The ladder's own sizes, taken from decisions.scss and not re-decided. `.bio__h` plays H2 and
   `--lesser` plays H3 (decisions.scss:571-578). Weight is 100 on both because hierarchy here is
   size and tracking, never weight.
   The H2 counter and hairline are deliberately left out - they number a post's sections, and
   About's two blocks would read "1" and "1.1". See bio-block.md.
```

### Line 36, on the line `margin: 0 0 2.25rem;`

```text
the ladder's own bottom margin, decisions.css:77
```

### Line 42, on the line `margin-bottom: 1.25rem;`

```text
the ladder's own, decisions.css:104
```

### Line 45, above `.bio .prose p { font-size: 16px; }`

```text
Body size and rhythm. A house decision from final-post.html, not provenance.
```

### Line 52, above `.bio--panel {`

```text
V1 - PANEL. The whole block is one translucent panel, heading plain inside it.
   dimden.dev `.box` (sources/section-and-heading-blocks.md B). Remixed, theirs, picked by Rod.
   Verbatim: the 2px border, its #383838, the 10px 15px padding.
   Three departures: radius 4px goes to 0 (shape rule), their 66% black fill becomes our warm
   grey panel, and their 5px margin becomes the blockout's 10px top gap.
   IT IS THE ONLY TRANSLUCENT OPTION in that source note, which is why it suits a live scene.
   See bio-block.md.
```

### Line 66, above `.bio--headcard .bio__h {`

```text
V2 - HEADING CARD. The heading is the box; the prose sits bare under it.
   cyanilux `h2, h3, h4` (sources/section-and-heading-blocks.md A). Remixed, theirs.
   Verbatim: padding 7px 20px and the 10px solid left edge.
   THE IDEA WORTH HAVING is that h2, h3 and h4 all get the SAME box - depth comes from position
   in the flow, not from size escalation. That is what this page needs.
   Departures: radius to 0, their cool cyan to the level's own ladder colour, their opaque fill
   to our translucent panel. Their nesting-by-fill is not taken: it keys off containment, and
   these two blocks are siblings. See bio-block.md.
```

### Line 83, above `// The lab original nested a second /* */ inside itself, and CSS comments do not nest: the inner`

```text
SASS LINE COMMENTS ON PURPOSE, do not convert this block back to *//* *//*.
```

### Line 84, above `// close ended the outer comment early, and the browser then ate the rule underneath. That is why`

```text
The lab original nested a second *//* *//* inside itself, and CSS comments do not nest: the inner
```

### Line 85, above `// '.bio--bare { padding: 0 }' was DEAD in the lab, silently, from the day it was written.`

```text
close ended the outer comment early, and the browser then ate the rule underneath. That is why
```

### Line 86, above `//`

```text
`.bio--bare { padding: 0 }` was DEAD in the lab, silently, from the day it was written.
```

### Line 87, above `// V3 - BARE. No box anywhere; the heading recedes and the prose leads.`

```text

```

### Line 88, above `// iquilezles.org (sources/iquilezles-prose.md). Remixed, theirs.`

```text
V3 - BARE. No box anywhere; the heading recedes and the prose leads.
```

### Line 89, above `// Their line: nothing is ever drawn to separate a component from prose - only colour, family and`

```text
iquilezles.org (sources/iquilezles-prose.md). Remixed, theirs.
```

### Line 90, above `// line-height differ. The section break is a bare <hr> with no rule written, and that ABSENCE is`

```text
Their line: nothing is ever drawn to separate a component from prose - only colour, family and
```

### Line 91, above `// the transcription, not an omission.`

```text
line-height differ. The section break is a bare <hr> with no rule written, and that ABSENCE is
```

### Line 92, above `// One inversion: their heading is white against grey body. Ours is the opposite, because our body`

```text
the transcription, not an omission.
```

### Line 93, above `// copy is the brightest thing on the page. Mechanism survives, direction flips.`

```text
One inversion: their heading is white against grey body. Ours is the opposite, because our body
```

### Line 94, above `// It is in the set as the floor of the range - without it every variant is a box and the`

```text
copy is the brightest thing on the page. Mechanism survives, direction flips.
```

### Line 95, above `// comparison is rigged. There is no rule to write for the block itself. That is the version.`

```text
It is in the set as the floor of the range - without it every variant is a box and the
```

### Line 96, above `.bio--bare { padding: 0; }`

```text
comparison is rigged. There is no rule to write for the block itself. That is the version.
```

### Line 99, above `.bio--v4 {`

```text
V4 IS THE ONE ROD PICKED, 2026-08-23: "bio block do v1 but the header has the line from v2".
   So V1's panel plus V2's 10px left edge on the heading, and nothing else of V2 - not its box,
   not its padding, not its fill. dimden supplies the panel, cyanilux supplies the edge, and the
   COMBINATION is ours because neither site does both.
   Their padding is not carried: the heading already sits inside the panel's padding and taking
   theirs too would double it. The edge takes the level's ladder colour, never their cyan.
   See bio-block.md.
```

### Line 107, above `background: var(--color-panel, rgba(28, 26, 24, 0.55));`

```text
V1's panel, unchanged
```

### Line 114, on the line `border-left: 10px solid var(--h2-color, #fbbf24);`

```text
V2's edge, verbatim width
```

### Line 115, on the line `padding-left: 20px;`

```text
their inline padding only
```

### Line 116, on the line `background: none;`

```text
NOT their fill - the panel is the ground
```
