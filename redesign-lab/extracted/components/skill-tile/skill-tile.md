# skill-tile - the 150 x 150 box for one tool mark, plus the flipper band

Built 2026-08-23. Demo: `/redesign-lab/extracted/index.html?c=skill-tile`

## What was REUSED and not rebuilt

**The row.** `extracted/components/skills-row/` is approved (Rod, 2026-08-22: seven marks, outline
and draw-in, deep gold, `pathLength="1"`, 0.09s stagger, reduced motion shows the finished outline).
The demo links `skills-row.css` and uses `.skills-row__icon` and `.skills-row__label` unchanged. The
seven `<path>` strings in the demo are byte-identical to `skills-row.html`. Nothing about the marks,
the stroke, the gold or the draw-in is redefined here.

**The switch.** `extracted/components/slap-toggle/` is already the Technology/Personal switch by
name, is already wired, and its JS dispatches a real `change` event so a page-level consumer hears
the flip. That is exactly the half that was missing when the switch shipped dead and you had it
removed (request #28). F1 imports its JS and uses its markup as it ships. No second switch was built
for that arrangement.

**The skills HEADER band (1421 x 72) is not in this component.** That is
`extracted/components/section-head/`, which you picked on 2026-08-22. Nothing new is owed there.

Two overrides of `skills-row` are made and both are declared in `skill-tile.css`: the mark size, and
the label colour (see the bug below).

## Fit against the measured reservation

| slot | reserved | built | fit |
|---|---|---|---|
| skill tile | 150 x 150 (x8) | `width:100%; aspect-ratio:1` of the blockout's own grid cell | **fits, by construction** |
| skill flipper band | 1421 x 120 | `min-height:120px; display:grid; place-items:center` | **fits**, both arrangements centred with room left |
| skills header band | 1421 x 72 | not built here - `section-head` already owns it | n/a |

The tile IS the cell, so it cannot overflow. The arithmetic behind the reservation, from
`landing-blockout.html:73`: band 1421, minus 60 + 60 padding = 1301, minus 7 gaps of 14 = 1203, over
8 columns = **150.375**. `aspect-ratio:1` at `landing-blockout.html:74` makes that the height too.
The reported "150 x 150" is 150.375 rounded by the measuring pass, so the dashed 150 square drawn in
the demo shows a 0.375 sliver of slack. That is the rounding, not an overrun.

Inside the tile the tallest stack is 94.97 (mark) + 8.8 (skills-row's own 0.55rem gap) + 9.28
(label at skills-row's 0.58rem, line-height 1) = **113.05 of the 150 available**. Even under V2's
widest arms nothing collides: at 6.25rem the brackets are still 1px lines at the very edge while the
mark spans 27.7 to 122.7.

---

## V1 - `.skill-tile--bare`. No box at all.

- **Tier: Remixed. Idea origin: theirs** (stephanewillems.be/skills,
  `sources/stephanewillems-skills.md`, Tier True there - read from the live DOM with the state
  driven live).
- **Verbatim:** their icon has no frame of any kind. The activation state, captured off the live DOM
  as a JS-applied inline style: `transform: scale(1.2) translateZ(0px)` and
  `drop-shadow(<colour> 2px 2px 10px)`. The scale, the two offsets, the blur and the `translateZ(0)`
  (which is there to hold it on the compositor) are all theirs. So is `tabindex="0"`, which makes
  hover and focus the same state.
- **Ours:** the 0.2s transition duration. Their state is applied by JS with no transition captured,
  so there is no source number to take.
- **Could not transfer:** the colour. The entire idea of their glow is that it is the icon's OWN
  brand colour - JS yellow, React cyan - and those are the cool accents and reds the palette law
  bans. skills-row already settled the equivalent problem by stroking every mark in one deep gold
  (measured: devicon's brand colours on the night ground run 1.04:1 to 2.68:1, invisible), so the
  glow follows the stroke.
- **Watch:** this is the only one of the three that adds a glow, and a live three.js scene sits
  behind the band. It is a drop-shadow on a 1px stroke rather than a panel bloom, but it is still a
  glow, and the de-glow principle says the lantern needs night. If it reads as one more thing
  competing, the cheapest fix is to drop the filter and keep the 1.2 scale.

## V2 - `.skill-tile--brackets`. Corner ticks at rest, the frame CLOSES on hover.

- **Tier: Remixed. Idea origin: theirs** (filipporuffini.com,
  `sources/filipporuffini-corner-brackets.md`, Tier True there - read from the site's own inline
  head style block and its Webflow stylesheet).
- **Verbatim:** the four one-sided-border boxes and the `is--tl / is--tr / is--br / is--bl` naming
  (their simpler variant D), `--corners-small: 3.125rem` as the rest arm, `--corners-large: 6.25rem`
  as the hover arm, and the easing `0.4s cubic-bezier(.77, 0, .175, 1)` from their cursor frame.
- **Ours:** two things, and both are said rather than buried.
  1. The line. Theirs is `1px solid #333333` on `#101010`; ours is the house gold hairline
     (`--color-line`, `settings.css:34`). A swap of value, not of mechanism.
  2. **The grow itself.** Filippo never grows a CONTENT frame - only their cursor grows. Applying
     that behaviour to their frame tiers is our move. The doubling ratio is still theirs (their
     cursor goes 0.5rem to 1rem, also exactly x2), and both arm values are theirs. What the numbers
     produce at 150.375 is not arbitrary: at 6.25rem the four arms overlap and the bracket closes
     into a complete border.
- **Not taken:** their `.corners { padding: .9375rem }`. Our corner boxes are absolutely positioned
  on the tile's border box rather than inset by padding, so a padding would shrink the mark in V2
  and V3 only and stop the three rows being comparable.
- **Alternatives that are also theirs, if 3.125rem reads wrong:** `--corners-cursor: 0.5rem`,
  `.egg-corner: 0.625rem`, `.p-corner: 2.5rem`, `--corners-large: 6.25rem`. One line each.

## V3 - `.skill-tile--frame`. Full frame at rest, retracting to brackets on hover.

- **Tier: Remixed. Idea origin: theirs** (Ashlook, codepen.io/Ashlook/pen/YzQQwdo,
  `sources/ashlook-scifi-button.md`, Tier True there - you pasted the pen verbatim).
- **Verbatim:** four boxes at `width:50%; height:50%` with `box-sizing:border-box`, each carrying one
  border side so that at rest they tile a complete border with no gaps; on hover they shrink to
  `$padding-x: 0.75em` by `$padding-y: 0.5em`; `transition: width 200ms ease-in, height 200ms
  ease-in`.
- **Ours:** the line colour only, same swap as V2.
- **Could not transfer:** their `::before` radial-gradient flash on `:active`, and their material
  `box-shadow`. Both are fills and lifts over what is, on our page, a live three.js scene. The
  glass/lift tell is being stripped site-wide, so taking them would have imported the exact thing
  being removed everywhere else.
- **Why this is a real alternative and not a repaint of V2:** it is the exact inverse. V2 is ticks
  that close on you; V3 is a box that opens for you. The question underneath is whether the SKILLS
  band reads as eight objects in eight boxes or as eight marks floating on the scene.

## F1 - flipper band, reusing `slap-toggle`

- **Tier: Remixed. Idea origin: theirs** (YarivFrd, codepen.io/YarivFrd/pen/PEOJLj), inherited from
  the existing component. No new build.
- The **band** is the only new CSS and it is `landing-blockout.html:69` verbatim:
  `height:120px; display:grid; place-items:center`.
- Used in its `--square` variant per the shape pass. It ships with `js-magnetic` and
  `data-strength="40"`, kept as-is; the magnet moves it a few px inside a 120 band, nowhere near the
  edges.

## F2 - flipper band, the source's own arrangement

- **Tier: Remixed. Idea origin: theirs** (stephanewillems.be/skills, same source file as V1, the
  switch measured off the live page).
- **Verbatim:** track 32 x 20, 4px padding, handle 12 x 12, track white at 40% (`bg-white
  bg-opacity-40`), handle solid white, 20px gap (`gap-5`), weight 300 (`font-light`), and the
  structural point - the two names sit OUTSIDE the track, so it reads as a choice between two named
  things rather than an on/off.
- **Ours:** the 12px travel (arithmetic off their own numbers, 32 - 4 - 4 - 12, not a new value);
  SQUARE instead of their `rounded-full` on both track and handle, per the shape pass; the
  transition duration (their handle is moved by JS and none was captured); real radios with
  `<label for>` instead of their `<p>` elements; the focus ring.
- **A gap in the source, not copied:** on their page the words are dead `<p>` tags and only the
  JS-driven track is clickable. That is a fault, so the labels here are real.
- **Kept even though it is arguably a fault:** their design shows the selected side ONLY by handle
  position. Neither word changes. That is state carried by position alone. Left as theirs rather
  than invented over, but it is worth a look.

---

## Open questions for Rod

1. **The band reserves 8 tiles. The approved set has 7 marks.** The eighth is drawn empty in every
   row. C#, HLSL and Compute are the three missing, each for a stated reason (Simple Icons carries
   no C# mark; HLSL and Compute are languages, not products). Does the band become 7 wide, or does
   the eighth get a DRAWN mark - which would be ours, not sourced?
2. **The PERSONAL face has no content anywhere in the lab.** The flipper is wired and it does
   switch, but nothing has ever been written down for the other side: no list, no marks. The demo
   shows an honest empty state rather than inventing your personal skills. What are they?
3. **`skills-row.css` is using the banned blue.** `.skills-row__label` is
   `color: var(--color-muted, #9aa3bd)`, and `#9aa3bd` is the one token the palette law names as
   never-in-text. The approved row is rendering it right now. It is corrected to `--color-silver`
   inside `.skill-tile` here, but the real fix belongs in `skills-row.css`, which is not mine to
   edit. Want it fixed there?
4. **Is a tile a link?** stephanewillems puts `tabindex="0"` on every icon so hover is also focus,
   and that is copied. But if a tile links nowhere, a focusable non-interactive element is noise for
   keyboard users. If a tile should go somewhere (a filtered project list, say Unity ->
   "Compute Grass" and "Sprite Baker 9000"), it wants to be an `<a>` and the whole question goes
   away.
5. **The mark size is a ratio, not a pick.** skills-row sizes its icon 3rem inside a 4.75rem item;
   the blockout cell is twice that item, so rather than choose a new number the ratio was carried
   across: 3rem / 4.75rem = 63.16% of the cell = 94.97px. If that reads too big or too small in the
   band, it is one value in `--tile-mark`.
6. **V2's arm length.** 3.125rem is Filippo's own `--corners-small` and it reads as a clear
   viewfinder tick at this size, but four of their tiers exist and any of them is defensible. Named
   in the section above.
