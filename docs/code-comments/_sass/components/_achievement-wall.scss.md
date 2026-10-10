# Comments removed from `_sass/components/_achievement-wall.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer`

```text
Ported 2026-08-25 from redesign-lab/extracted/components/achievement-wall/achievement-wall.css.
```

### Line 2, above `// even at specificity 0 (D36, docs/TRAPS.md).`

```text
Never drop the next line. Layer order decides who wins, and unlayered CSS beats every layer
```

### Line 3, above `@layer reset, tokens, prose, components, overrides;`

```text
even at specificity 0 (D36, docs/TRAPS.md).
```

### Line 6, above `@keyframes aw-prism { to { background-position: 300% 0; } }`

```text
ACHIEVEMENT WALL - the catalogue and its detail panel, built to Rod's spec of 2026-08-24.
   THE RIM IS THE BEST-SOURCED THING ON THE PROJECT CARD, not the worst, and the Slop banner on
   project-cards-expensive is wrong for THIS technique. The real source is
   codepen.io/john_r_muir/pen/ExzJjqL (sources/john-r-muir-glow-border.md, pasted by Rod), and
   D1266 records him withdrawing the circular-citation objection. Remixed, theirs.
   STILL OWED: nobody has pinned a byte-verified capture of yannesidibe's CSS.
   ONE HONEST DIFFERENCE: john_r_muir's is a HOVER effect. The card build lights from cursor
   PROXIMITY instead, which is why `.aw--trigger` exists - it goes back to the source, and it is
   what makes the tiles legible to a keyboard.
   THE ORBIT RUNS FROM JS, NOT KEYFRAMES, and the CSS version looks correct while doing nothing:
   animating a custom property needs it REGISTERED with a type, and @property does not take in
   this Chrome. Measured - the glow sat at the 0% stop and never moved. See achievement-wall.md.
```

### Line 22, above `.aw { display: flex; gap: var(--aw-gap, 20px); align-items: flex-start; }`

```text
Every tunable is a custom property holding its own real value, so the component renders the
     same with no tuner attached and the tuner just writes the inputs the CSS already reads.
```

### Line 26, above `.aw {`

```text
ROD'S TUNE, 2026-08-24, pasted from the bench. 8 of 11 dials moved.
     WORTH NAMING: the panel is now 620 against the catalogue's ~360, so the DETAIL BOX sets this
     section's height, not the wall. Every earlier measurement of this row assumed the opposite.
     See achievement-wall.md for the full dial list.
```

### Line 41, above `.aw__cat { flex: 1; min-width: 0; }`

```text
The catalogue. Klubnika's geometry from the approved blockout: 64px tiles at a 72px pitch,
     which is 64 plus the 4px margin each side.
```

### Line 57, above `.aw__sr {`

```text
THE HIDDEN LABEL, AND IT HAS TO LIVE IN THIS FILE. It used to be `.visually-hidden`, which
     is defined in the bench page's chrome and in no stylesheet the real page loads - so on port,
     all 29 labels rendered as body text, spilling out of 64px squares and over the panel. Every
     computed-style check came back clean, because no box was wrong: the text was simply visible.
     A COMPONENT MAY NOT DEPEND ON A CLASS IT DOES NOT DEFINE.
     clip-path and the legacy clip, never display:none or visibility:hidden - those would take the
     name away from a screen reader too. See achievement-wall.md.
```

### Line 74, above `.aw__tile {`

```text
A tile is a REAL <button>, not a span with a role. Enter and Space come free, aria-pressed is
     real, and the global focus ring reaches it without a line of CSS. The older achievement-tile
     uses a span, which is why its own :focus-visible rule there can never fire.
```

### Line 80, above `flex: none;`

```text
`flex: none` or these squash instead of wrapping. Measured: a 64px tile rendering at 39px
       and every tile in the row a different size, below about 1100px.
```

### Line 87, on the line `font-size: var(--aw-icon, 25.6px);`

```text
the live site's own 1.6rem
```

### Line 90, above `background: var(--color-panel-solid, #1c1a18);`

```text
Warm grey, and it stays warm. This briefly went blue when Rod said "achievements still have
     bronze glow under them" - I read that as the fill and it was not, it was an EDGE glow, and he
     said so the same day: "the color was fine before now its too blue."
     The detail panel keeps a DIFFERENT value from the tiles, which is the one thing worth keeping
     from that wrong turn: when they shared a fill the panel vanished into its container.
```

### Line 97, on the line `border-radius: 0;`

```text
square by default, Rod's 2026-08-11 shape pass
```

### Line 103, above `.aw__tile::before,`

```text
THE RIM, lifted from project-cards-expensive unchanged: a 1.5px ring made by masking the
     padding box out of the border box, blurred, composited plus-lighter, and lit by a gradient
     whose centre the JS writes as --mx/--my. The soft layer becomes a variable here, which is the
     one deviation - the source hard-codes it, and at 64px the reach has to be tunable.
```

### Line 120, above `.aw__tile::before {`

```text
THE NAME IS `--aw-glow-r`, NOT `--glow-r`, and getting that wrong was a live defect: the
     tune block Rod approved writes --aw-glow-r, nothing read it, and the gradient fell through to
     its 90px fallback so his value never rendered once. --glow-r is the project card's own name.
     The reach is deliberately much weaker than the cards'. Their 220px is 3.4x a tile, so the
     falloff across 64px was flat and every tile in range lit the same. Rod 2026-08-24.
```

### Line 137, above `/* ACTIVE runs the SAME machinery as hover, on a timer instead of a mouse: the rim's light`

```text
HOVER READS, CLICK ACTIVATES - two different gestures, so you can read every achievement
     without changing what the scene is doing. Rod 2026-08-24. The panel keeps the LAST hovered
     one rather than blanking on mouseout; his word was "last hovered".
```

### Line 141, above `.aw__tile[aria-pressed="true"] {`

```text
ACTIVE runs the SAME machinery as hover, on a timer instead of a mouse: the rim's light
     position is already two custom properties, so an active tile just drives them from an
     animation. No second effect, no extra element, no JS. Rod 2026-08-24.
```

### Line 148, above `.aw--trigger .aw__tile[aria-pressed="true"]::before,`

```text
It has to survive the trigger reading too, where the rim is dark at rest.
```

### Line 152, above `.aw--uniform .aw__tile[aria-pressed="true"] {`

```text
The uniform reading, kept switchable so the two can be compared instead of described.
```

### Line 158, above `.aw__on {`

```text
THE STAR IS THE PROJECT CARD'S PINNED BADGE, REUSED, not redrawn - 1.7rem square, 5px
     radius, gold on night, same shadow, carried verbatim from merged-card. Only the corner moves
     and the glyph gets bigger, which is what Rod asked for 2026-08-24.
     Gold, not the pink that badge used to paint from a token defined nowhere.
```

### Line 178, above `/* RARITY EDGES: HOVER OR PINNED, NEVER AT REST. A permanently shimmering edge was doing the`

```text
LOCKED TILES STAY REAL BUTTONS. `disabled` would take them out of the tab order and kill
     their hover, which removed 15 of 29 tiles from the keyboard entirely. `aria-disabled` tells a
     screen reader the control is unavailable while leaving it focusable, so nothing activates
     that should not and nothing becomes unreadable. Rod's call 2026-08-24, and it reversed mine.
     Locked marks grey with a FILTER, not `color`, because emoji ignore colour.
```

### Line 184, above `/* EACH TIER DECLARES ITS COLOUR EXACTLY ONCE, into --aw-tier-grad, and no state rule below`

```text
RARITY EDGES: HOVER OR PINNED, NEVER AT REST. A permanently shimmering edge was doing the
     same job as the pinned state, so five tiles looked switched on when nothing was. Rarity is
     information you go looking for; pinned is a state you set. Rod 2026-08-25.
     A border cannot be a gradient, so this is the two-layer background trick: the fill is clipped
     to the PADDING box, the gradient to the BORDER box, and the border itself is transparent.
     Focus is grouped with hover deliberately - dropping it breaks the rarest tiles first.
```

### Line 191, above `.aw__tile[data-tier] {`

```text
EACH TIER DECLARES ITS COLOUR EXACTLY ONCE, into --aw-tier-grad, and no state rule below
     ever names a colour - they only decide the fill behind it and whether it is lit.
     That is structural, not tidying: the old version wrote a gradient into every state rule, and
     the pinned rule listed prismatic and silver together while painting prismatic, so pinning a
     silver tile turned it prismatic. Four tiers times three states is twelve places to drift.
     Rod 2026-08-25. See achievement-wall.md.
```

### Line 206, above `.aw__tile[data-tier="bronze"]    { --aw-tier-grad: linear-gradient(90deg, var(--tier-bronze-dark), var(--tier-`

```text
The four palettes, and the only place any of them appears. The cursor RIM takes the tier
     colour here too - it was left on the orange glow for all 29 tiles, so a silver tile still got
     a bronze edge. Measured at 170px: 13 of 29 tiles lit from one cursor position, all orange.
```

### Line 218, above `.aw__tile[data-tier="prismatic"] { --aw-tier-grad: linear-gradient(90deg, var(--color-gold), var(--color-glow)`

```text
Prismatic is the only one that is not a single hue, because in TFT prismatic is the absence
     of one. Its cool stops are a deliberate exception to the palette law, flagged not hidden.
```

### Line 222, above `--aw-tier-glow: var(--tier-prismatic-rim); --aw-tier-glow-soft: var(--color-white); }`

```text
a rim is one colour, so this takes a near-white rather than
                                        picking one hue and calling it prismatic
```

### Line 226, above `.aw__tile[data-tier]:hover,`

```text
Lit on hover, focus or pinned. Never at rest.
```

### Line 235, above `.aw__tile[data-tier][aria-pressed="true"] {`

```text
Pinned differs from hovered by its FILL, not its edge, so no second tier colour is invented
     for it.
```

### Line 243, above `.aw__tile[data-tier][aria-disabled="true"] {`

```text
Locked wins over rarity, whatever the tier, or an unearned achievement advertises that it is
     one of the rare ones.
```

### Line 251, above `--aw-tier-glow: var(--color-muted-warm, #9c8f7d);`

```text
The GLOW goes neutral too. If locked hides rarity on the border and not on the rim, the
       wall just announces rarity through the glow instead - and every bronze achievement is
       locked, so that was 10 tiles glowing bronze wherever the pointer went.
```

### Line 258, above `.aw__tile[aria-disabled="true"] { cursor: default; border-color: var(--color-black); }`

```text
Pure black, not the usual faint grey, and that is what makes it read as locked: a black edge
     is DARKER than the surface, so the tile reads as a hole. Every other tile's hairline is
     lighter than its fill, so the two states differ in direction, not just amount. Rod.
```

### Line 265, above `.aw__bar i { transition: width .3s ease; }`

```text
Progress tiers, bronze to prismatic like TFT (Rod 2026-08-24). Prismatic is a moving
     multi-stop gradient rather than a static rainbow, so it reads as a material and not a fifth
     hue - in TFT prismatic is the absence of a colour, not one more.
     Its cool hues are a flagged exception to the palette law. Say the word and it goes warm-only.
```

### Line 302, above `.aw__crit { display: block; margin: 6px 0 0; font-size: 13.12px; line-height: 1.6; color: var(--color-muted-wa`

```text
The criterion line under a progress bar. The comment that used to sit here described
     `.aw__val--masked`, which is deleted: Rod's 2026-09-02 call makes both the flavor and effect
     fields read one fixed string on every achievement, so there is no redacted value to style.
```

### Line 307, above `.aw--scale .aw__tile:not([disabled]):hover { scale: 1.3; z-index: 2; }`

```text
The blockout's hover scale, off by default because Rod took the rim instead. Kept switchable
     so the substitution is visible rather than assumed.
     USE `scale`, NOT `transform`. This and the tilt used to write the same property, so whichever
     ran last erased the other. `scale` is its own property and composes with the tilt for free.
```

### Line 313, above `.aw--trigger .aw__tile::before,`

```text
The john_r_muir reading: the rim is dark until the tile is actually hovered or focused,
     instead of lighting from proximity.
```

### Line 323, above `.aw__detail {`

```text
THE DETAIL PANEL. 333 wide is Klubnika's exactly. The HEIGHT IS A DEVIATION from the
     blockout's 250, recorded rather than slipped in: five labelled fields need about 328px once
     Flavor and Effect carry real sentences, so 250 overflows by ~78 the moment Rod fills in the
     two he called "empty for now". It costs no page height - the catalogue beside it is already
     360 tall. Rod 2026-08-24: "yes extend the panel".
```

### Line 334, above `background: color-mix(in srgb, var(--color-panel-solid) 78%, var(--color-black));`

```text
One step DARKER than both the section it sits in and the tiles beside it, so it separates
       from both without restating either. It used to be the exact fill of the section it sits
       inside, which made it an invisible box - and it read fine on the bench only because the
       bench stage is a different colour.
```

### Line 342, above `.aw--short .aw__detail { min-height: 250px; }`

```text
The blockout's original 250, kept switchable so the overflow is demonstrable.
```

### Line 359, above `color: var(--color-muted-warm, #9c8f7d);`

```text
Not .tagline's colour: it computes to #9aa3bd, the blue D31 bans. Warm muted instead.
```

### Line 364, above `.aw__val { display: block; margin: 0; font-size: 16.32px; line-height: 1.7; color: var(--color-text, #f5f3ef);`

```text
THESE ARE DIVS, NOT PARAGRAPHS, on purpose. About's page rule restyles every <p> to 16px
     body copy, so every value and label in this panel came out as body text - the 11.2px category
     label measured 16. A component that only works on pages which happen not to style `p` is not
     finished.
```

### Line 382, above `.aw__empty { display: block; color: var(--color-muted-warm, #9c8f7d); font-size: 16.32px; line-height: 1.7; ma`

```text
There is deliberately no activate button here. The tile is the control, and a second one
     would be two ways to reach one state. The panel reports the state, which is its whole job.

     Nothing hovered yet. Whatever sits here sets the panel's RESTING height, so it is a real
     state, not a blank.
```
