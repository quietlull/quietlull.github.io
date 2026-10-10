# Comments removed from `_sass/components/_entry-row.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/entry-row/entry-row.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `/* The list and the row. Theirs, verbatim, except the two colour tokens. */`

```text
entry-row - one row of the ramblings index.
   Eve OFFICIAL, eveofficial.com/news, read from their stylesheet (analysis/subpage-specs/
   extract-5.md:42). Remixed, theirs.
   HONEST GAP: that read was not re-fetched when this was built. If a number here matters,
   re-fetch, and THE LIVE SITE WINS.
   D15 picked this variant for ONE property: a row with a picture and a row without keep the SAME
   LEFT EDGE. All three versions preserve it, and it must not be traded away.
   What could not transfer: their red category word (palette law), their flat hairline hex, their
   white underline, and their `transition: all`, which is a hazard on a row that also hovers.
   Eve is desktop-only by declaration, so any mobile behaviour here is ours.
   See entry-row.md for the verbatim rules and the seven numbered departures.
```

### Line 19, above `.er-list {`

```text
The list and the row. Theirs, verbatim, except the two colour tokens.
```

### Line 33, above `.er-row > a,`

```text
.er-body is the same box for version B, where the row is not one link. Both are the
   positioning context for the thumbnail, exactly as `li.tn a` is on Eve.
```

### Line 43, above `.er-row--media > a,`

```text
THE LEFT EDGE, and it is the whole reason D15 picked this: the picture is out of flow and
   paid for with RIGHT padding, so nothing on the left ever moves.
```

### Line 47, above `padding-right: 365px;`

```text
365, not the 270 in Rod's paste. The thumb went to 335 and the reserve stayed at 270, so
     text would have run 65px under the picture. 365 keeps his own 30px gutter.
```

### Line 69, above `.er-date {`

```text
The date line. Eve declares no font-size on it, so it inherits their root 16px, and
   line-height 1 makes the strip exactly 16px - which is exactly what the blockout reserves.
   Written as 1rem rather than left to inherit, so a host page's root size cannot drift it.
```

### Line 81, above `.er-cat {`

```text
The category word, inline and BEFORE the date. This is the one row in the whole ramblings
   reference set where the tag is native to the source rather than grafted on. Only the red
   could not come across.
```

### Line 89, above `.er-ttl {`

```text
The title and their underline, the one genuinely non-default mechanism on the page.
```

### Line 91, on the line `display: inline-block;`

```text
INFERRED, not read off Eve. See entry-row.md.
```

### Line 94, above `line-height: 1.5;`

```text
Line-height only. Rod's tune also gave a font-size of 24.5, which is half a pixel off the
     ladder's 24 and not worth undoing the deletions below for. This one is free: the ladder's h3
     declares no line-height, so these were inheriting body's 1.7 and setting a 40.8px line box.
```

### Line 101, above `}`

```text
Size, weight and colour were DELETED here 2026-08-24 so the ladder reaches these titles.
     Rod: "should follow the ladder at 38.4". They were 20px/400/#f5f3ef, a size on no rung at
     all, which is why this page looked like it was ignoring the ladder. These are <h2>, so
     removing them lets the bare h2 rule through. Do not put them back.
```

### Line 107, above `.er-link {`

```text
THE UNDERLINE LIVES ON THE ANCHOR, NOT THE HEADING, and moving it would be a regression.
   Rod 2026-08-24 asked for a two-line title to get two underlines. Eve's `.ttl` is a bare inline
   span, so their bar paints PER LINE FRAGMENT; our inline-block painted one bar under the whole
   box. Putting the gradient on the anchor reproduces their structure exactly.
   Making the h2 inline would also work but silently drops its max-width and moves the page 40px
   in the 1030-850 band. This route moves no layout at all. See entry-row.md.
```

### Line 117, on the line `background-size: 0% 1px;`

```text
theirs; a border cannot animate its width
```

### Line 121, above `.er-ttl:hover .er-link,`

```text
Version B only, which is what final-ramblings uses. :focus-within is what carries the keyboard
   state across the anchor-inside-heading nesting.
   FLAGGED: version A loses its underline this way. No page uses A today, and giving it one back
   is its own decision.
```

### Line 128, above `.er-blurb {`

```text
THE BLURB IS A GRAFT - Eve's row is date and title, nothing else. Type comes from
   decisions.scss, the 72% is the blockout's reservation, and both fractions are named so the
   column can be re-pointed in one line. Version C is the row without it.
```

### Line 146, above `/* VERSION B - the same row with filterable tags, and it is a TRADE rather than a skin.`

```text
VERSION A - Eve verbatim, whole row is one link, tag is a word. No extra CSS: everything
   above IS version A, and that is the point of it.
```

### Line 149, above `.er-strip {`

```text
VERSION B - the same row with filterable tags, and it is a TRADE rather than a skin.
   Eve's row is one link. A chip that filters has to be a link too, and an anchor inside an anchor
   is invalid HTML and a keyboard trap, so B gives up the whole-row hit target to buy the tags.
   Whether the tag is a filter or a label is still an open question for Rod.
   The chip is tag-badge, not rebuilt here - link both stylesheets. Even the 8px gap is Eve's.
```

### Line 164, above `.er-link { color: inherit; text-decoration: none; }`

```text
In version B the anchor sits INSIDE the heading, so it must not repaint it.
```

### Line 167, above `/* The one breakpoint, carried from final-ramblings rather than invented. Eve has no responsive`

```text
VERSION C - Eve's real row: date, title, nothing else. True, theirs. ZERO CSS, on purpose -
   it is version A with the blurb deleted, and that is the whole version.
   It exists because the blurb is the contested field on this page type: three of the four
   ramblings sources carry none. C is what the source actually supports.
```

### Line 172, above `@media (max-width: 820px) {`

```text
The one breakpoint, carried from final-ramblings rather than invented. Eve has no responsive
   rule at all, so this is OURS and is an open question, not a spec.
```

### Line 183, above `}`

```text
ROD PICKED B, 2026-08-23. Known and unfixed: tag-badge's own line-height makes the tag strip
   22.8px against a 16px reservation. That is the parent's size, so fix it at tag-badge rather
   than patching it here, or the two users of the badge drift apart.
   D15's property survives: the left edge is identical on all 8 rows.
```
