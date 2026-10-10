# Comments removed from `_sass/components/_top-bar.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/top-bar/top-bar.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 7, above `:root {`

```text
top-bar - the norikura shell, restructured by Rod 2026-06-14 into three zones:
   [mark + name] | [nav centred] | [toggles]. The nav pill is invisible at rest and lit by
   dennissnellenberg's rising-circle fill, the same one the buttons use.
   THESE TOKENS ARE ON :root, NOT ON .top-bar, and that matters. The hero sizes itself as "the
   viewport minus the bar", so the height cannot be private to the bar. It was hard-coded 96px
   once and broke the moment the bar stacked to two rows. See top-bar.md.
```

### Line 14, on the line `--top-bar-height: 5.875rem;`

```text
94px, the padding box
```

### Line 17, on the line `--top-bar-border: 1px;`

```text
the mark has to clear this too, or it stops 1px short of the edge
```

### Line 20, above `.top-bar {`

```text
STICKY BELONGS TO THE BAR, not to the page hosting it. All four lab pages declared their own
   identical copy, so when this was ported the live bar just scrolled away. Sticky also occupies
   real layout space, which the pages below it depend on. See top-bar.md.
```

### Line 29, above `grid-template-columns: 1fr auto 1fr;`

```text
1fr auto 1fr, NOT auto 1fr auto. The old version centred the nav inside its own column, and
     that column only sits centre-page when the two outer zones match - they do not, so the nav
     sat 44px left of centre. Equal outer columns centre it by construction. Rod 2026-08-18.
```

### Line 36, above `width: 100%;`

```text
The 1fr columns make the breathing room, so this only has to guarantee a minimum. The old flat
     100px is what read as lopsided - it was being added to columns that were already unequal.
```

### Line 46, above `.top-bar__left {`

```text
The mark is unbundled from the name (Rod 2026-08-16): it is the way back to the landing pages,
   so it gets its own place rather than reading as one logo lockup. The gap and the size do it.
```

### Line 55, above `.top-bar__left .favicon {`

```text
FULL BLEED, and the negative margins are how. The mark fills the bar's whole height and hugs
   its left edge by escaping the bar's own padding - it does NOT make the bar taller. An earlier
   pass capped it at the wordmark's line box to avoid growing the bar, which solved the wrong
   problem. Rod 2026-08-16.
```

### Line 69, above `.top-bar__left .favicon__img {`

```text
Larger than the favicon component's own 62.5%, so it reads as artwork rather than an icon
   floating in a field. Rod 2026-08-16.
```

### Line 72, on the line `width: 4.6rem;`

```text
~77% of the 96px mark
```

### Line 76, above `/* The wordmark is wrapped in this link so clicking the name goes home (Rod 2026-08-25). It exists`

```text
NO font-family HERE, and its absence is the fix rather than an oversight. This element is
   `class="top-bar__logo lb"` (_includes/top-bar.html:57), so line-boil styles it too, and `.line-boil-text`
   and `.top-bar__logo` are both one class deep inside `@layer components` - nothing but SOURCE
   ORDER separated them. `_sass/components/_index.scss` forwards line-boil at :33 and top-bar at
   :46, so this rule used to win and the name painted in Caveat until the boil script wrote a real
   face inline onto each glyph. Rod 2026-08-25: "boil text should start off with the boil font it
   shouldnt change to boil font afterwards". The same bug was logged and fixed once before, P296.
   DELETING the declaration beats reordering the two forwards, and the lab had already reached the
   same answer for the identical fault on the landing clock: "font-family REMOVED 2026-08-24. This
   unlayered rule forced IBM Plex Mono and beat `.line-boil-text` ... the same flash Rod caught on the top bar"
   (redesign-lab/final-landing.html:174). A deletion cannot come back the next time that index is
   re-sorted, and the file's stated policy is alphabetical order, so a reorder would have been a
   trap left armed for the next person.
   `color` STAYS ON PURPOSE. It also beat `.line-boil-text`, which is why the mark renders gold #f59e0b rather
   than the boil's own orange #f86a03, and that turned out to be a real design change the port made
   silently. Put to Rod 2026-08-25 and he chose to keep it: "it should stay the gold it is now".
   `font-weight: 700` is likewise unchanged and is NOT a new synthetic-bold problem: the glyph cells
   already inherit it, so the boiled text has always rendered faux-bold over the Regular-only boil
   faces. This edit changes the FIRST PAINT only.
```

### Line 96, above `.top-bar__home {`

```text
The wordmark is wrapped in this link so clicking the name goes home (Rod 2026-08-25). It exists
   to carry the href and NOTHING else: the mark's own colour, size and weight stay on
   `.top-bar__logo` inside it, so this must not introduce a colour, an underline or a hover of its
   own. `text-decoration` is the one that would actually reach the text, because it propagates to
   descendants where `color` does not. The focus ring is deliberately NOT touched - this is a real
   link now and keyboard users need to see it (base/_focus-ring.scss owns that).
```

### Line 114, on the line `font-size: 2.2rem;`

```text
Rod: the name was too small at 1.6rem
```

### Line 115, on the line `letter-spacing: 0;`

```text
the boil faces want no tracking either
```

### Line 123, on the line `gap: 10px;`

```text
baked from the bench tune
```

### Line 124, on the line `margin-bottom: 2px;`

```text
baked from the bench tune
```

### Line 130, on the line `--bloom: 4.25;`

```text
hover glow size, still tunable from the bench Tune panel
```

### Line 131, on the line `--tspeed: 480ms;`

```text
state transition speed, same
```

### Line 134, above `.top-bar__link {`

```text
An invisible pill at rest, lit by a rising circle from below on hover. overflow:hidden is what
   clips that circle into a pill.
```

### Line 142, on the line `padding: 0.45rem 1rem;`

```text
T3-D: keeps the tap target at 24px or more
```

### Line 152, above `.top-bar__link::before {`

```text
The fill: an oversized circle parked below that rises on hover.
```

### Line 186, above `@media (max-width: 780px) {`

```text
THE SCALING LADDER. Every tier DERIVES --top-bar-height from its rows plus the block padding,
   so the full-bleed mark still matches the bar edge to edge however the zones stack. Rows are
   fixed, never auto - an auto row that grows when a zone wraps is the exact bug this fixes.
     >=781  one row     [mark+name | nav]                 96px
     <=780  two rows    [mark+name] / [nav]              108px
     <=720  as above, type and inline padding tightened
     <=560  three rows  [mark+name] / [toggles] / [nav]  124px, mark goes inset
   780 IS MEASURED, NOT GUESSED: the bar needs 710px on one row, so 780 leaves about 70px of slack.
   It was 1200 until 2026-08-22, and that was stacking for the toggle zone D20 had already
   removed - which is what Rod saw as "weird scaling". See top-bar.md.
```

### Line 198, on the line `--top-bar-row-1: 3.4rem;`

```text
the name, and the toggles on bench copies that still have them
```

### Line 199, on the line `--top-bar-row-2: 2.2rem;`

```text
the nav
```

### Line 200, on the line `--top-bar-padding-block: 0.5rem;`

```text
two rows carry the height now, so the padding gives way
```

### Line 212, above `.top-bar__left {`

```text
The name stacks on top of the nav (Rod 2026-08-22). `display: contents` is what makes that
     possible with no markup change: it promotes the mark and the name out of .top-bar__left so
     each takes its own grid cell. The mark keeps column 1 across both rows and stays full-bleed.
```

### Line 244, on the line `font-size: 1.9rem;`

```text
it has to sit inside row 1
```

### Line 287, above `.top-bar {`

```text
The smallest tier is a centred stack: mark, name, nav, top to bottom (Rod 2026-08-22).
     THE NAV DEFINES THE WIDTH - it stretches the full content box and spreads its links, and the
     other two centre on that same axis. See top-bar.md.
```

### Line 328, above `}`

```text
The ghosted-toggle block that stood here is gone, 2026-08-25. It styled the bar's third
   zone, which D20 emptied when the toggles left the design, and its own comment had said so
   since the port: "styles a zone the layout no longer uses. It is on the merge cleanup
   list." The component stylesheet went with it.
```
