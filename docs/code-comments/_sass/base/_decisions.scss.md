# Comments removed from `_sass/base/_decisions.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/decisions.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `/* Only ONE new hue is added here. Silver is a derivation of two colours Rod already approved,`

```text
THE TYPE LADDER AND EVERY SETTLED TEXT DECISION, in one file, so the pages cannot drift.
   Built 2026-08-23 from Rod's picks on text-decisions.html.
   TYPE AND TEXT ONLY. No layout, no spacing between sections, no page structure - those belong
   to each page, and D25 says layout is Rod's alone.
   Every block cites what decided it. A rule with no citation is a bug in this file.
   The full reasoning behind each one is in redesign-lab/decisions.md.
```

### Line 14, above `:root {`

```text
Only ONE new hue is added here. Silver is a derivation of two colours Rod already approved,
   measured 7.40:1 against the reading well - the only candidate that keeps the ramp descending.
```

### Line 17, on the line `--color-silver: #a3a19d;`

```text
= color-mix(in srgb, #f5f3ef 62%, #1c1a18)
```

### Line 19, above `--color-muted-warm: #7d7a76;          /* = color-mix(in srgb, #f5f3ef 45%, #1c1a18) */`

```text
--color-muted-warm was USED three times here and DEFINED nowhere, so every use fell back to
     a neutral grey on a token named "warm". Nothing errored; it just rendered wrong.
```

### Line 21, on the line `--color-muted-warm: #7d7a76;`

```text
= color-mix(in srgb, #f5f3ef 45%, #1c1a18)
```

### Line 23, above `--color-orange: #f86a03;                     /* Rod, 2026-08-23. Origin ROD, not a source. */`

```text
The signature orange, Rod 2026-08-23: "H1 and H0 should be #f86a03."
     A NEW TOKEN RATHER THAN A CHANGE TO --color-glow, which is used 75 times and does two jobs,
     a hue and an effect. Repointing it would have moved the tape too, on an instruction that
     named two headings.
     STILL OPEN: that leaves two oranges three shades apart on the same pages (REQUESTS P205).
```

### Line 28, on the line `--color-orange: #f86a03;`

```text
Rod, 2026-08-23. Origin ROD, not a source.
```

### Line 29, on the line `--h0-color: var(--color-orange);`

```text
signature orange
```

### Line 31, on the line `--h2-color: var(--color-gold, #fbbf24);`

```text
the yellow
```

### Line 33, above `--h3-color: var(--color-gold);`

```text
H3 went gold 2026-08-24 (Rod: "H3 should be yellow too"). Taking the whole rung rather than
     carving out .er-ttl, because carve-outs are the thing he told me not to build. H4 stays
     silver, so headings still recede - one rung later.
```

### Line 38, on the line `--emphasis-color: var(--color-gold, #fbbf24);`

```text
bold takes the H2 yellow - Rod 2026-08-23
```

### Line 41, above `/* H0 - the site mark. One per SITE, not per page, landing hero only.`

```text
THE H0-H4 LADDER, accepted by Rod 2026-08-23. The structure is his, the sizes are stripe's
   measured scale. The ladder itself is OURS; no single source supplies it.
   WEIGHT IS NEVER THE HIERARCHY - that is stripe's confirmed rule, and it is why nothing below
   is bold. Size and tracking carry it.
```

### Line 46, above `.d-h0 {`

```text
H0 - the site mark. One per SITE, not per page, landing hero only.
   PROVISIONAL: the line boil replaces this. The colour is the decision, the type is a stand-in.
```

### Line 54, above `h1, .heading-1-display, .prose > h1 {`

```text
H1 - the page title, one per page. stripe.dev (sources/stripe-dev-prose.md), and their
   margin rule comes with it: margin-TOP only, never bottom.
   THE BARE TAG IS IN THE SELECTOR ON PURPOSE. Every size rule here used to be scoped to .prose
   or .d-h*, and the landing has neither - so its h1 rendered at the browser default 32.64px/700
   while the colours were right. That is why it read as "a little weird" rather than broken.
   CASE G DOES NOT COME WITH IT: the counter and the divider stay on `.prose h2` below. They are
   a prose device, not the h2 scale. See redesign-lab/decisions.md.
```

### Line 64, above `/* WEIGHT 300 -> 500, Rod 2026-08-25: "i dont like the current sans font ... i want to do a`

```text
3.84rem = 61.44px, because H2/H3/H4 are a perfect x1.6 scale (38.4 / 24 / 15) and H1 was
     the only rung off it. The old fluid clamp rendered 100.8px at 1440, which is 2.625x H2 -
     almost two rungs, so the eye read a MISSING LEVEL. It was also the only fluid size in the
     file, so its ratio drifted from 1.87 at 1024 to 2.63 at 1440. Now a constant 1.600.
```

### Line 69, above `font-size: 3.84rem;`

```text
WEIGHT 300 -> 500, Rod 2026-08-25: "i dont like the current sans font ... i want to do a
     rounded sans or more rounded fonts in general for my headings". The face was ALREADY the
     rounded one (D16, M PLUS Rounded 1c); what was missing is that its character lives in the
     rounded stroke ENDS, and at Light on a 61px heading the strokes are too thin to show them,
     so it read as a plain geometric sans. 500 is a real downloaded face, not a synthesised one
     (_includes/head.html requests 100;300;400;500;700), so nothing here is faux-bold.
```

### Line 82, above `h2, .prose h2, .d-h2 {`

```text
H2 - the section heading: case G's MECHANISM at a heading's SIZE. Rod 2026-08-24.
   D28 picked case G for SECTION BREAKS - catlikecoding's nested counters on acegikmo's ruled
   divider. Mapping that onto the top-level heading was a later implementation choice, and it is
   what made H2 render at 22px, thinner than the body it headed. Rod: "H2 isnt meant to look like
   how it is on the post page".
   So the mechanism stays and the size comes back. The QUIET treatment moved down to H3, which is
   what a sub-break actually is. See redesign-lab/decisions.md.
```

### Line 91, on the line `line-height: 1.7;`

```text
Bootstrap gives headings 1.2 and the ladder has to say otherwise
```

### Line 96, above `display: block;`

```text
BLOCK, NOT FLEX, and that is the whole fix. As a flex container the heading's text was one
     anonymous item, so a long heading wrapped the whole text block onto the next flex line and
     stranded the counter alone above it. As an inline ::before the number cannot be separated
     from the first word at any width. Rod 2026-08-24.
```

### Line 105, above `.prose h2, .d-h2 {`

```text
The hanging indent is scoped to the headings that actually carry a counter. On the bare `h2`
   selector it gave every other h2 on the site a 1.15em gutter with nothing to put in it - a
   wrapped ramblings title started 44px right of the row's left edge, which breaks the one
   property entry-row was picked for.
```

### Line 124, above `display: block;`

```text
block, and pulled back out of the hanging indent so the rule spans the full measure
```

### Line 134, above `/* H3 - the subsection, and now the QUIET one. This is where "the type stays quiet" lives after`

```text
The divider sits UNDER the heading, not beside it (Rod 2026-08-24). Beside it, the rule took
   whatever the heading left over, so a long heading ate it - one measured 0px while its
   neighbours had 217-395px. On its own row every heading gets the same full-width rule.
```

### Line 138, above `h3, .prose h3, .d-h3, .er-ttl {`

```text
H3 - the subsection, and now the QUIET one. This is where "the type stays quiet" lives after
   2026-08-24; a sub-break under a real heading is what D28 was describing.
   The size went 1.0625rem -> 1.5rem because at 17px it was SMALLER than the 18px body it headed.
   `.er-ttl` joins this rung (Rod: "this may be the time we use the H3"). THE TAG STAYS <h2> and
   only the size moves - retagging would leave ramblings running h1 straight to h3, which is the
   heading-order failure D31 ordered fixed on the post. See redesign-lab/decisions.md.
```

### Line 146, on the line `line-height: 1.7;`

```text
Bootstrap gives headings 1.2 and the ladder has to say otherwise
```

### Line 161, above `h4, .d-h4, .card-title {`

```text
H4 - the card and item title, the highest traffic rung: 8 on the landing alone.
   `.bio-h` WAS REMOVED FROM HERE 2026-08-24. It was listed on this rung AND mapped to the H2 role
   further down - the ladder contradicting itself - and this rung won on specificity, so About's
   bio heading was pinned to H4 and the page had to restate a size to escape it.
```

### Line 167, on the line `line-height: 1.7;`

```text
Bootstrap gives headings 1.2 and the ladder has to say otherwise
```

### Line 173, above `.prose h4 { counter-increment: d-h4; }`

```text
H4 KEEPS ITS NUMBER. Rod 2026-08-25: "if you know its broken you should just try to fix it
   there isnt really a decision to be made here". The lab numbered this rung and the port
   dropped it, so a post could show an unnumbered heading directly under a numbered one.
   SCOPED TO `.prose h4` AND NOTHING ELSE, deliberately. The rung selector above is
   `h4, .d-h4, .card-title`, and `.card-title` is on it - putting the counter there would have
   printed numbers on every project card on the site, and would also have let cards increment
   the counter between two real headings and corrupt the numbering. Only prose is numbered.
   Three levels rather than the lab's two: the lab reused the h3 counter because the article it
   was built against had no h3 at all, which would number an h4 as if it were an h3.
```

### Line 191, above `.prose, .d-counts { counter-reset: d-h2; }`

```text
The counter root. On the article, so numbering restarts per page rather than per site.
```

### Line 194, above `.d-anchor {`

```text
Heading anchors - picked A, Maxime Heckel (sources/maximeheckel-prose.md), Rod 2026-08-23.
   scroll-margin-top is the load-bearing half: without it the sticky bar covers the heading you
   just jumped to. :focus-visible is theirs too, and most implementations forget it.
   KNOWN LIMIT accepted with the pick: hover does not exist on touch. The TOC is the mobile route.
```

### Line 212, above `:is(.prose h2, .prose h3, .d-h2, .d-h3) .d-anchor {`

```text
These three cancels are load-bearing. The anchor is an <a> inside .prose h2, so it IS a
   `.prose a` and outranks `.d-anchor` - it was silently taking the prose link's colour, a gold
   hairline under the mark, and a gold FILLED BLOCK on focus. Maxime's own system cancels exactly
   this; the port kept the half that was fighting nothing and dropped the half that mattered.
   A focus indicator should be chosen, not inherited.
```

### Line 228, above `.prose h2, .prose h3, .d-h2, .d-h3 {`

```text
DERIVED, not Maxime's flat 6.6rem, which is calibrated to their nav and breaks on ours: at
   <=780px our bar is 107.6px and the heading TUCKS UNDER it, at <=560px it is covered outright.
   This evaluates to 105.6px at desktop, reproducing their number exactly, and self-corrects at
   both stacked tiers. The fallbacks matter - this file can load on pages without the top bar.
```

### Line 240, above `/* The measure is 94 characters, Rod's own call (P33). Type is stripe's weight 300 at 130%.`

```text
BODY TEXT
```

### Line 242, above `.prose {`

```text
The measure is 94 characters, Rod's own call (P33). Type is stripe's weight 300 at 130%.
   BODY COPY IS THE BRIGHTEST THING ON THE PAGE, deliberately: prose leads and headings recede.
   Measured 17.31:1 against the reading well, twice the contrast of the silver above it.
```

### Line 262, above `/* 'p' AND 'li', NEVER BARE '.prose a'. The related-post cards are links that sit inside .prose,`

```text
Prose links are button-kit's `.inline-link` behaviour, promoted to the ladder so no page needs
   an exception. Rod 2026-08-24: "we shouldnt be making 100 exceptions just a few simple rules."
   SUPERSEDES stripe's highlighter fill, which was his own earlier pick - the later call wins.
```

### Line 266, above `.prose p a,`

```text
`p` AND `li`, NEVER BARE `.prose a`. The related-post cards are links that sit inside .prose,
   so a bare selector grew a 2px underline across every card on hover. Scoping to running text is
   the whole fix and keeps it one rule: a link that IS a block never matches in the first place.
```

### Line 301, above `/* stylelint-disable-next-line selector-not-notation -- the complex :not() is the point:`

```text
Inline code - picked B, Maxime Heckel (sources/maximeheckel-prose.md), Rod 2026-08-23.
   Squared per the shape pass, and their box-shadow is dropped - it is a lift, which is the glass
   tell being stripped everywhere. box-decoration-break: clone is the part worth having: it keeps
   the border intact on a chip that wraps across a line.
```

### Line 323, above `.prose strong, .prose b {`

```text
Inline emphasis - acegikmo's coloured bold plus catlikecoding's strikeout, Rod 2026-08-23.
   A REMIX, filed as one: no single source does both.
   BOLD IS TAKEN AS A LOOK, NOT A MECHANISM. acegikmo marks it with custom elements markdown
   cannot emit, so it becomes strong{} driven by ordinary **bold**. Their #ff1155 cannot transfer.
   WATCH AT BUILD: a whole sentence in bold is a whole sentence in yellow.
```

### Line 333, above `/* del / ins - catlikecoding (sources/catlikecoding-prose.md), the only source that defines them.`

```text
Italic gets the browser default and nothing else. No source designs it and Rod uses it zero
   times in 19 posts, so there is nothing to invent.
```

### Line 336, above `.prose del, .prose ins {`

```text
del / ins - catlikecoding (sources/catlikecoding-prose.md), the only source that defines them.
   Both get the highlight, only del gets the line, and stripping ins's underline is theirs too.
   Their light-mode yellow becomes their own dark-mode #411, which survives the palette law.
```

### Line 350, above `.prose sup { font-size: 0.75em; vertical-align: baseline; }`

```text
sup - gwern.net, accepted by Rod 2026-08-23. `vertical-align: baseline` is the whole idea: a
   footnote marker shrinks but does NOT rise, so the leading stays even.
```

### Line 360, above `/* abbr is deliberately unstyled, and that is the decision. Zero designed abbr rules across nine`

```text
sub takes the browser default plus the spacing above. No source has a general sub design.
```

### Line 362, above `/* kbd and mark are rejected outright (Rod 2026-08-23) and used zero times in 19 posts. */`

```text
abbr is deliberately unstyled, and that is the decision. Zero designed abbr rules across nine
   sites read. Writing one would be inventing a design and citing the absence of one.
```

### Line 365, above `/* Lists - picked B, Maxime Heckel (sources/maximeheckel-prose.md), Rod 2026-08-23.`

```text
kbd and mark are rejected outright (Rod 2026-08-23) and used zero times in 19 posts.
```

### Line 367, above `.prose ol {`

```text
Lists - picked B, Maxime Heckel (sources/maximeheckel-prose.md), Rod 2026-08-23.
   `counters()` is PLURAL, which is what gives 2.1 and 2.1.1 for free on nesting.
   34 of Rod's 45 list items are numbered, so this is the highest-traffic pick on the page.
```

### Line 396, above `.prose figure, .d-figure {`

```text
Figures - picked B, catlikecoding, with the caption pushed LEFT (Rod 2026-08-23). That one
   flipped declaration is why this is a remix and not a transcription.
   NO MAT, NO BORDER, NO FILL - the 2em margin does all the separating, which is 46 images not
   competing with the live scene behind them. A hero is just a figure; Rod rejected all three mask
   treatments. line-height 0 is Maxime's, killing the descender gap under the image.
```

### Line 420, on the line `text-align: left;`

```text
<- Rod's change. catlikecoding centres this.
```

### Line 424, above `.prose .table-scroll { overflow-x: auto; max-width: 100%; }`

```text
Tables - iquilezles' minimal body and scroll wrapper, acegikmo's coloured header row.
   A REMIX with two parents that genuinely contradict: acegikmo's table draws a box, iquilezles'
   has none, and we take iq's boxlessness.
   THE SCROLL WRAPPER IS LOAD-BEARING: the measure is 767px and a feature matrix will exceed it.
   Their four semantic cell states are not taken - four colours, including red and cool.
```

### Line 451, above `.d-tag {`

```text
Tags and meta chips - two shapes, two jobs, settled 2026-08-21. Rod: "squares for tags on
   project cards, rectangles from the buttons for the search and post meta data."
   SQUARES ARE OURS - the live site's own .post-tag, squared. The bench makes a thing ours, not
   sourced. RECTANGLES are button-kit, squared, and its --color-muted blue is NOT carried.
```

### Line 476, above `.d-relcard {`

```text
Related post cards - the project card, stripped. OURS, origin Rod, whose citation objection he
   withdrew 2026-08-22. "keep them pretty motionless we dont want stuff interrupting their ability
   to focus on the text."
   BUILT STANDALONE, not as a diff against the parent - see related-card-real, which carries the
   correction. Subtracting three rules from a file with six transitions does not give you a
   motionless card, and one of those three deletions ADDS the glow.
   The hover border change is an accessibility requirement, not a style choice: with hover gone
   there is no affordance that a link is a link.
```

### Line 498, above `.d-callout {`

```text
The callout family - four categories, one tape placement each. The tape itself is
   washi-tape.scss and is NOT redefined here; this only maps categories onto its placements.
     warning -> D, four diagonal corner tabs    note  -> A, over the top edge
     tldr    -> B, down the left edge           quote -> C, L-shaped corners
   COLOUR NOW ENCODES CALLOUT TYPE, NOT SITE SECTION, and *** THAT OVERTURNS THE COLOUR HALF OF
   D27 ***. Rod chose meaning over location with the conflict in front of him. D27's other half
   still holds: the tape is the site's one loud object.
   CONSEQUENCE: sections no longer have a colour identity via the tape. If they need one it has
   to come from somewhere else. Reference takes no tape at all. See redesign-lab/decisions.md.
```

### Line 515, above `transform: rotate(-0.05deg);`

```text
0.05deg is gneiss's real value; we shipped -0.5, ten times too much. On a 700px card 0.5deg
     lifts a corner 6.11px and reads as a tilt, 0.05 lifts it 0.61px and reads as none. So the
     card now looks unrotated, which is what theirs looks like. A visible tilt would be OURS.
```

### Line 526, above `.d-callout__label {`

```text
The category label. MOVED HERE 2026-09-01 from components/_callout-family.scss (.co__label)
   when Rod picked this box for every category and the co shells were retired: the label was the
   one piece of that family the winner still needed. Declarations unchanged. Free text, not a
   fixed severity set (maxime's pattern).
```

### Line 540, above `.d-callout--warning { padding: calc(1rem + 8px) calc(1.25rem + 8px); }`

```text
Warning's four corner tabs overhang into the box, so the text takes the same +8px clearance
   the retired shells gave it (old .co--v1.co--warning: padding + 8px). Base padding on
   .d-callout is 1rem 1.25rem.
```

### Line 545, above `/* PAGE MAPPING - which existing element on each page plays which ladder role. The six pages`

```text
The takeaway keeps the stamp and takes no tape. It is Rod's own CSS, lives in stamp-callout,
   and is not redefined here.
```

### Line 548, above `/* --- LANDING --- */`

```text
PAGE MAPPING - which existing element on each page plays which ladder role. The six pages
   were built before the ladder and use their own class names.
   SPECIFICITY IS MATCHED, NEVER EXCEEDED. This file loads last, so an equal-specificity selector
   wins on source order and the page can still override where it genuinely needs to.
   The landing's own h1 is screen-reader-only, so it has no visible H1 and none is invented.
   See redesign-lab/decisions.md for what was measured before this was written.
```

### Line 555, above `/* The h2 element itself carried no role - its visible text lives in a child span, so the tag's`

```text
--- LANDING ---
```

### Line 557, above `/* Section heads take the ladder's weight (Rod 2026-08-24: "make the section heads 300 too so`

```text
The h2 element itself carried no role - its visible text lives in a child span, so the tag's
   own colour and weight sat unused. Wrong to anything that reads the element, and what a
   heading-hierarchy check reports. Mapped so the tag and the role agree.
```

### Line 561, above `h2.section-head { color: var(--h2-color); font-weight: 500; }`

```text
Section heads take the ladder's weight (Rod 2026-08-24: "make the section heads 300 too so
   they match"). This rule set 100 while the ladder set 300, so one heading LEVEL rendered two
   different weights depending which page you were on. It was the last h2-level split (P337).
   The colour stays declared because section-head.scss deliberately removed it in Rod's option-B
   call, so the intent stays readable at the point it applies.
```

### Line 568, above `h1 .section-head__name { font-size: 3.84rem; }`

```text
Size by role: the tag decides the rung. About's page title is an h1 and takes the H1 rung,
   which is what Rod asked for - its three headings all rendered 38.4px and read as one level.
```

### Line 577, above `font-weight: 500;`

```text
THIS is the rule that renders. The visible text lives in this span, so setting only the h2
     above moved the element's computed weight and nothing on screen. Both are set now.
```

### Line 583, above `.merged-cards .card-title {`

```text
The ~ ~ ornament is section-head's own device and is left alone. Only type and colour move.
```

### Line 591, above `/* This also settles About's two-different-golds contradiction: .bio-h was #f59e0b and`

```text
--- ABOUT ---
```

### Line 593, above `/* The bio headings take 300 too (Rod 2026-08-24: "just make things match site wide"). These were`

```text
This also settles About's two-different-golds contradiction: .bio-h was #f59e0b and
   .bio-h--lesser #fbbf24, two colours for two levels of the same thing.
```

### Line 596, above `body.spacious .bio-h {`

```text
The bio headings take 300 too (Rod 2026-08-24: "just make things match site wide"). These were
   the last two heading rules still at 100. The whole ladder is now one weight per level.
   `.prose th` stays at 100 deliberately - a table header is not a heading level, and matching it
   would be matching two different things because they share a number.
```

### Line 610, above `/* The post already matched on size and weight. Only the colour moves, to the signature orange. */`

```text
--- POST ---
```

### Line 612, above `.posthead h1 { color: var(--h1-color); }`

```text
The post already matched on size and weight. Only the colour moves, to the signature orange.
```

### Line 615, above `/* The four categories, colour hard-coded by MEANING (Rod 2026-08-23). Each sets --tape-hue on`

```text
NOT DONE HERE, so the gap is visible rather than silent: the post skips H2 and runs h1
   straight to h3, which is a WCAG 1.3.1 heading-order failure. The fix is a MARKUP change, not a
   CSS one - styling h3 to look like h2 would hide the failure instead of fixing it.
   Projects, ramblings and portal have no design headings yet, so they adopt the ladder for free.
```

### Line 620, above `.d-callout--warning { --tape-hue: var(--tape-pink); --tape-hue-2: color-mix(in srgb, var(--tape-pink) 62%, var`

```text
The four categories, colour hard-coded by MEANING (Rod 2026-08-23). Each sets --tape-hue on
   the HOST, which is how washi-tape is built to be recoloured: one place per card and every strip
   follows. The hue values already existed; only the assignment is new.
   Green is settled as origin ROD - D27's condition was "a real asset OR Rod picking it".
```

### Line 634, above `.d-callout--reference { transform: none; }`

```text
Margin notes are DROPPED (Rod 2026-08-23). One candidate instance in 19 posts, and it cost a
   permanently off-centre article plus a fight with the TOC for the one gutter. That instance
   becomes a regular note. Nothing in the family steps outside the column any more.
   Reference takes no tape and no rotation - it is end matter, not an interruption.
```

### Line 640, above `.prose div.highlight {`

```text
SYNTAX COLOURS ARE AN EXPLICIT CARVE-OUT FROM THE PALETTE LAW, and it has to be stated rather
   than assumed. Highlighting needs mutually distinguishable hues and a warm-only set cannot give
   one - four warm hues would be four oranges at 13px. Rod named blue and pink deliberately.
   THE CARVE-OUT IS SCOPED TO `pre code` ONLY. These hues must never reach UI, prose, links,
   headings or chrome, and inline code is not included (D31).
   The hues are Dark+'s, the ROLES are Rod's. "same as VS Code" was retired as the citation on
   2026-08-23 ("so it seems my vs code isnt using vs code dark+ but i like it anyways its fine"),
   so the role list in redesign-lab/text-decisions.html is the spec and Dark+ is only where the
   values came from.

   THE SELECTOR IS `div.highlight`, AND THAT IS THE WHOLE BUG THIS FIXES. It used to be
   `.prose pre code`, which MATCHES NOTHING: with `line_numbers: true`, Rouge emits its table
   layout and nests code as `code > table > td > pre`, so the <code> is the PARENT of <pre>, not
   the child. Every --syn-* below was therefore undefined, every `var(--syn-*)` resolved to
   nothing, and all 1,001 token spans inherited one flat colour - for as long as this file has
   existed. Nothing errored, because an undefined custom property is not an error.
   `div.highlight` is what Rouge wraps every code BLOCK in, and inline code never has one, so
   D31's "inline code is not included" now holds by CONSTRUCTION rather than by a selector that
   has to be kept correct. See TRAPS.
```

### Line 660, on the line `--syn-type: #d79a5b;`

```text
types + storage keywords - ROD's ORANGE, pick B on 2026-09-03.
                               Was #ce9178, which is Dark+'s STRING colour and was only ever
                               borrowed while "same as VS Code" was still the citation.
```

### Line 663, on the line `--syn-const: #569cd6;`

```text
named CONSTANTS - Rod 2026-08-23 "keep dark blue for constants"
```

### Line 664, on the line `--syn-semantic: #4ec9b0;`

```text
HLSL semantics - POSITION, TEXCOORD0, SV_Target. Rod picked the
                               class green (option iii) on 2026-09-03, over the constant blue it
                               shipped on for a day. DELIBERATELY THE SAME VALUE AS --syn-class:
                               a semantic and a struct name are both reserved type-like names, so
                               they read as one family, and they are NOT distinguishable from each
                               other. That is the accepted cost - the alternative was sharing with
                               constants (i) or with plain variables (ii), both of which are far
                               commoner tokens and would have collided constantly.
```

### Line 672, on the line `--syn-var: #9cdcfe;`

```text
plain variables - the lighter blue, so const reads apart from var
```

### Line 673, on the line `--syn-class: #4ec9b0;`

```text
classes / type NAMES - Dark+ teal-green
```

### Line 674, on the line `--syn-func: #c586c0;`

```text
functions - ROD's PINK. Control flow SHARES it, his call
                               2026-09-03: "SAMPLE_TEXTURE2D is a function and should be purple
                               too" - so if/else/return and the calls are deliberately one hue.
```

### Line 677, on the line `--syn-comment: #6a9955;`

```text
GREEN, and this closes an AA failure rather than a taste call: the
                               old #6a6a6a placeholder measured 3.53:1 on the night ground and
                               failed. This measures 5.73:1. The green-vs-comments question is
                               answered by taking VS Code's own comment green.
```

### Line 682, on the line `--syn-string: #ce9178;`

```text
SHARES nothing now - types moved to #d79a5b, so the old string /
                               type collision is gone as a side effect of the orange pick.
```

### Line 684, on the line `--syn-bracket: #ffd700;`

```text
Brackets only, not all punctuation. This is VS Code's bracket-pair
                               colourisation level 1, read out of Rod's own install (the THEME
                               does not define it, so VS Code falls back to built-ins). Rouge has
                               no nesting depth, so only level 1 is reproducible.
```

### Line 690, above `.prose pre .tok-type,     .prose pre .tok-keyword  { color: var(--syn-type); }`

```text
Rod settled this 2026-08-23: "Keep dark blue for constants but 100% a." His role list wins.
   WHAT IT CORRECTED: the block above used to hold Dark+'s own values under a comment claiming it
   followed his list. It did not - type was blue where he said orange and func was yellow where he
   said pink. TWO OF FOUR ROLES RENDERED AGAINST SPEC for as long as the file existed, with a
   comment above them asserting the opposite. A comment is not evidence.
   WHAT COUNTS AS A CONSTANT: SCREAMING_SNAKE_CASE only. Unity's `_Prefixed` uniforms are
   VARIABLES - they change per material and per frame, and the underscore is a naming convention.
   STILL OPEN: HLSL semantics like SV_Target, and types now share the string colour so the two
   render identically. Neither is guessed at here. See redesign-lab/decisions.md.
```

### Line 711, above `.prose pre .kt, .prose pre .k,  .prose pre .kd,`

```text
THE SAME ROLES, BOUND TO THE CLASSES THE SITE ACTUALLY EMITS. Rod 2026-08-25: "the code
   colours you picked can never show up ... fix this too".
   The `.tok-*` rules above are correct and have never rendered once, because NOTHING writes a
   `tok-` class. The site highlights with Rouge (_config.yml), which emits its own two-letter
   names, so every code block on the site rendered in one flat colour while a full, argued
   palette sat directly above it. Measured on the built page before this: 1,001 colour spans,
   zero matching rules.
   THE MAPPING IS READ OFF THE REAL OUTPUT, not off Rouge's documentation, because what a
   highlighter calls a token varies per language. Sampled from the ComputeGrass post:
     .kt  float2 float4 void          -> type      (Rod's orange)
     .k   else if return              -> type      (his own .tok-keyword mapping does the same)
     .nb  abs cos dot lerp saturate   -> func      (builtin functions, so they read as functions)
     .nf  UpdateDecay                 -> func      (his pink)
     .n   _BladeWidth CameraInput     -> var       (matches his rule that _Prefixed uniforms
                                                    are VARIABLES, not constants)
     .mi .mo .mf .mh .mb              -> number
     .c1 .c .cm .cs                   -> comment
   `.p` punctuation and `.o` operators are deliberately left uncoloured, so the eye has
   somewhere to rest. `.no` `.nc` `.s*` are mapped for languages this post does not use.
   THE OPEN ITEMS ABOVE ARE UNCHANGED BY THIS: HLSL semantics like SV_DispatchThreadID land in
   `.n` and so render as variables, which is the honest result rather than a guess, and strings
   still share the type orange. Both are still open in redesign-lab/decisions.md.
```

### Line 762, above `.prose pre .x-type,`

```text
---------------------------------------------------------------------------------------------
   THE RE-TAG OVERRIDES. `_plugins/syntax-retag.rb` adds these classes ALONGSIDE Rouge's own at
   build time, because Rouge puts tokens with different roles in the same class and no selector
   can separate them. Each rule below exists because Rod looked at a rendered block and caught it.

   THEIR POSITION IN THIS FILE IS LOAD-BEARING. A span reads `class="n x-type"`, so both rules
   match at the same specificity (0,2,0) and the LAST one wins. Written above the block, every
   one of these silently loses and the token keeps Rouge's colour - which is the exact failure
   tools/css-order-check.mjs exists to catch, and which I shipped into the bench page once before
   noticing. Do not move them up.
   ---------------------------------------------------------------------------------------------
```
