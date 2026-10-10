# Comments removed from `_sass/components/_empty-state.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/empty-state/empty-state.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `/* The container is PatternFly's '.pf-v6-c-empty-state' verbatim EXCEPT padding-block, which is`

```text
empty-state - the "your search returned nothing" block. Three versions, 930x60 and 1351x60.
   PatternFly's EmptyState, fetched and token-resolved to literals rather than trusted. Remixed,
   all three: their box is a 2rem-padded centred stack and squeezing it into a 60px band is ours.
   The title copy is the LIVE SITE'S own sentence (post-filter.js), origin Rod. The second line is
   Claude's and still wants Rod's voice.
   No icon on purpose - theirs is Font Awesome, which is not shipping, and drawing one would be
   unsourced. See empty-state.md.
```

### Line 15, above `/* KEEP THIS LINE. '.es' below sets display:flex, which beats the browser's own [hidden] rule,`

```text
The container is PatternFly's `.pf-v6-c-empty-state` verbatim EXCEPT padding-block, which is
   the biggest departure in the file: theirs is 1rem, and 1rem of it plus the two lines comes to
   90px in a 60px box. So vertical padding goes to 0 and min-height plus align-items do the
   centring. min-height, not height, so it can grow when the row versions wrap.
```

### Line 20, above `.es[hidden] { display: none; }`

```text
KEEP THIS LINE. `.es` below sets display:flex, which beats the browser's own [hidden] rule,
   so without this the empty state renders on top of a full list. It did, on final-ramblings.
```

### Line 35, above `.es__content {`

```text
PatternFly's 350px max-width, verbatim. The row versions override it to their own `none`.
```

### Line 40, above `.es__title {`

```text
Their `__title-text`, size and line-height verbatim. Weight is the one departure: theirs is
   600 and nothing on this site is bold, because hierarchy here is size and tracking.
```

### Line 50, above `.es__title b {`

```text
The echoed tag and query. Colour carries the emphasis, not weight - hence 300 again.
```

### Line 56, above `.es__body {`

```text
Their `__body`, stepped down one of their own sizes so the two-line stack fits 60px.
   Silver, never --color-muted: that is the last blue in the set and the palette law bans it.
```

### Line 67, above `.es__action {`

```text
PatternFly's `__actions` slot, but their action is a Button and this site does not put a
   button in a list index. So the look is decisions.scss `.prose a` copied verbatim, duplicated
   on purpose: an empty state is not inside `.prose`, and `.prose` carries a 767px measure that
   would fight the 930px box. Adding `.es__action` to that selector list deletes this block.
```

### Line 84, above `@media (prefers-reduced-motion: reduce) {`

```text
No focus ring here on purpose - the global one in _focus-ring.scss covers it (D5).
```

### Line 90, above `/* Their smallest spacer, not their 1rem: 1rem leaves 2.5px of air in a 60px box. */`

```text
V1 - CENTRED STACK. The closest thing to PatternFly that fits: two lines in a 350px column.
   The action sits inside the second sentence rather than in their separate footer, which is ours
   and is forced - their footer costs a third line and the box only has 60px.
   Measures 43.0px of content inside 60.
```

### Line 95, above `.es--stack .es__body {`

```text
Their smallest spacer, not their 1rem: 1rem leaves 2.5px of air in a 60px box.
```

### Line 100, above `.es--row .es__content {`

```text
V2 - CENTRED ROW. Title, next step and action on one line. The flex rule is PatternFly's own
   `__actions` block verbatim, applied to the whole content instead of just the buttons.
   `align-items: baseline` is TheRealMJP's list row, borrowed because it is the same situation:
   text at two sizes that has to sit on one line. 20.8px, or 47 if it wraps. See empty-state.md.
```

### Line 113, above `.es--split {`

```text
V3 - SPLIT ROW. Message hard left, action hard right, and the only version that uses the
   width. Geometry is TheRealMJP's list row, taken from their LIST rather than their prev/next
   because an empty state sits in a list. Their `opacity: .6` is NOT taken - opacity over a live
   scene is a window, not a colour. text-align: left is ours; PatternFly centres. 44.8px.
```
