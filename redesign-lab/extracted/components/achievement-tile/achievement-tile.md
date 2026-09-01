# Achievement tile + locked state

Built 2026-08-23. **Six versions**, all fitting the measured blockout reservations exactly.

V1-V3 came first. **V4-V6 were added the same day** after the achievement-systems sourcing pass
(Minecraft, Steam, RetroAchievements, PlayStation, Xbox) and have their own half of this note,
starting at "Versions 4-6". **V1-V3 are untouched** - Rod prefers V2 and it stays as the thing
to beat.

**Scope.** The TILE and the LOCKED state only. Rod 2026-08-23: the trophy wall has no source and
needs a design conversation first, so nothing here proposes an arrangement. The tiles shown on the
demo are the blockout's own EXPLORER group reproduced at its measured pitch, because a tile cannot
be judged at any other size.

**Files**

- `achievement-tile.css` - all six versions, sectioned, each with its own provenance header
- `achievement-tile.html` - self-contained demo on the dark ground, reservations drawn as dashed
  outlines behind every element, with a live `getBoundingClientRect` readout under each stage
- `achievement-tile.md` - this file

---

## The measured boxes

Read off `about-blockout.html?v=panels` rendered at viewport **1440** with `getBoundingClientRect`
this session. Not from a label, not from memory.

| slot | measured |
|---|---|
| locked / empty state | **641 x 40** |
| tile | **88 x 31**, `box-sizing: border-box` |
| wall | `display:flex; flex-wrap:wrap; gap:10px` |
| tiles per row | **6** (6 x 88 + 5 x 10 = 578, leaving 63px of trailing slack inside 641) |

Where 641 comes from, so it never has to be guessed again: `.main` is 675 wide, `.p` is border-box
with `border: 2px` and `padding: 10px 15px`, so 675 - 4 - 30 = **641**.

**Annotation drift, same class as blockout-contract finding 1.** `about-blockout.html:236` calls
the panel content width **645**. It renders **641**. The rendered value wins; the label should be
corrected so the next reader is not measuring against a number the page does not honour.

**Which variant these came from.** V1 `panels` (dimden). It is the only one of the four whose
locked/empty box renders 641 wide: `strip` gives 896, `bands` 1240, `scatter` 1288. So the
reservation handed to me identifies the variant unambiguously.

---

## Fit result

Measured live in headless Chrome at 1440 against the built demo, not asserted:

| version | tile | locked / empty state | wall |
|---|---|---|---|
| V1 lit edge | 88.00 x 31.00 **EXACT** | 641.00 x 40.00 **EXACT** | 6 + 1 per row, gap 10px, inside 641 |
| V2 value only | 88.00 x 31.00 **EXACT** | 641.00 x 40.00 **EXACT** | 6 + 1 per row, gap 10px, inside 641 |
| V3 no slot | 88.00 x 31.00 **EXACT** | 641.00 x 40.00 **EXACT** | 4 per row (locked tiles are not drawn) |

Zero scroll overflow on all three rows. Row 1's line box is 15.39px inside 16px of content height.
V2's name is not ellipsised at 641 (560 available, 560 used). Page scroll width 1440, no horizontal
bleed.

---

## The finding that constrains V1-V5

**At 88 x 31 no title fits.** Using V2's own sourced padding (`0.25rem 0.35rem`) and icon slot
(`1.25rem`): 88 - 11.2 - 20 - 6.4 = **50.4px** left for the name, which is about five characters at
the mono face. Real titles are "First Light", "Behind the Curtain", "Hey, You Touched My Fly!".

So the tile is **icon only** in V1-V5, and the name is the accessible name rather than
visible text. That is consistent with where 88 x 31 comes from rather than a compromise forced on
it: dimden's own button is an IMAGE, with no text layout inside it.

Two consequences, both flagged rather than quietly absorbed:

1. **dimden's `padding: 10px 15px` cannot survive on an 88 x 31 tile** (it would leave 54 x 7 of
   content). It is kept verbatim on the 641 x 40 row, where it fits, and dropped on the tile.
2. **An unearned achievement has no icon by definition**, because you have not seen it. So no
   version invents a mystery glyph. What V1-V3 actually differ on is whether the empty slot is
   drawn at all, and how the earned one is marked.

**V6 breaks finding 1 deliberately** and says so in its own section: the finding is about
**titles**, and a four-to-six character count is not a title. It is measured on the page rather
than argued.

---

## Sources S1-S4 (V1-V3), and one correction

All three external sources were re-fetched live this session and diffed against the saved notes.

| id | source | status |
|---|---|---|
| S1 | `https://dimden.dev/css/main.css` | fetched live 2026-08-23. `.box` matches `sources/section-and-heading-blocks.md` section B byte for byte. |
| S2 | `https://www.cyanilux.com/css/style.css?v=12` | fetched live 2026-08-23. Matches section A byte for byte, commented-out `border-bottom` included. |
| S3 | the LIVE SITE, `_sass/abstracts/_animations.scss:392-404` | read, never edited (D22). CLAUDE.md's provenance law names the live site as a valid source. |
| S4 | `sources/iquilezles-prose.md` | already verified byte for byte in that note; used as a RULE, not as declarations. |

### CORRECTION to a citation already in this repo

`about-blockout.html:236` says the badge wall is dimden's `#webtiles-container` "at true size:
88x31 tiles, gap 10". Against the live stylesheet that is **half true**:

- `gap: 10px` **is** verbatim theirs. Kept.
- Their container is `display:flex; flex-direction:row; align-items:flex-start` with **no
  `flex-wrap`**. It holds a 250x270 iframe beside a paragraph. A **wrapping wall of tiles is
  ours**, not theirs.
- There is **no 88x31 rule anywhere in their CSS**. 88 x 31 is the intrinsic size of the button
  image they serve at `https://dimden.dev/services/images/88x31.gif`, the classic web-button
  footprint.

So the tile SIZE is sourced to an asset, the GAP to a rule, and the WRAPPING is ours. Recorded
because a half-true citation is exactly what the provenance law is written against, and this one
has already been copied forward once (`achievement-tests.html:382` repeats it, and additionally
cites `about-blockout.html` itself, which is a circular citation pointing inside this repo).

**The trophy grid's existing tracker row is honest and stays honest.** `element-tracker.md:161`
files the grid as **Slop / mine**. Nothing here upgrades the WALL - only the tile and the locked
state get real parents.

---

## Version 1 - lit edge

**Tier: Remixed. Idea origin: theirs** (dimden chassis + cyanilux marker).

Every slot is drawn. Earned gets a bar; locked is the same box, empty.

- **Verbatim:** dimden's `border: 2px solid #383838` and `gap: 10px`. cyanilux's
  `border-left: 10px solid <accent>` as the entire earned marker, which is exactly the job that
  declaration does on their site - it is the only thing distinguishing a heading from a paragraph
  there.
- **Ours:** putting the two together. Neither site marks an earned-versus-unearned anything.
- **Could not transfer:** cyanilux `#00aabb` is a cool accent (palette law) so the bar takes
  `--color-gold`; their 7px and dimden's 4px radius are squared per the shape pass; cyanilux's
  opaque `#282828` fill would sit on top of the live scene, so the chassis is dimden's translucent
  one; dimden's `10px 15px` padding does not fit 88 x 31.
- **Kept unchanged:** dimden's `#383838` is a neutral grey and survives the palette law as-is, so
  it is transcribed rather than re-derived.
- **The idea:** the wall's silhouette tells you the total, the lit edges tell you the score.
- **The honest cost:** 10px of an 88px tile is **11% of its width**. On cyanilux's full-width
  heading the same 10px is about 1%. It reads far heavier here than it does there. This is the
  open question on V1 and it is why V2 and V3 exist.

## Version 2 - value only

**Tier: Remixed. Idea origin: ROD** (his own live rule) **+ theirs** (iquilezles' recipe).

No box on anything. Earned and locked differ by value alone.

- **Verbatim** from `_animations.scss:392-404`: the flex row, `align-items:center`, `gap:0.4rem`,
  `padding:0.25rem 0.35rem`, the icon slot at `font-size:1rem; width:1.25rem; text-align:center;
  flex-shrink:0`, the name at `flex:1` in `--text-muted-color` (rgba(232,224,212,.78),
  `_dark.scss:55`), the progress figure at `--gold-50` (rgba(251,191,36,.5), `_dark.scss:164`) and
  `0.65rem`, and the `rgba(255,255,255,0.03)` hover. Kept in rem so it stays their ratio.
- **Why this source matters:** it is the one real achievement display that already exists, and
  **its locked state is a colour swap and nothing else** - same box, same icon slot, same name, one
  declaration different.
- **Ours:** their 6px radius squared; `--link-hover-color` `#fcd34d` becomes `#fbbf24` because
  `#fcd34d` is not a lab token; and the one real invention, labelled rather than dressed up - the
  source uses `rgba(255,255,255,0.03)` as a **hover** value and here it is the **resting ground of
  a locked slot**. Same value, different job.
- **Could not transfer:** nothing else. The source is already borderless and fill-free.
- **Corroboration:** iquilezles' verified recipe says a component differs from its surroundings by
  colour, family and line-height and never by a box. Two independent sources agreeing on "value,
  not chrome" is the strongest argument any version here has.
- **The idea:** over 29 tiles V1 draws 29 bordered fills and V2 draws none, on the page carrying
  the heaviest scene.

## Version 3 - no slot

**Tier: Remixed. Idea origin: theirs** (iquilezles) **+ ROD** (D28).

Locked achievements are not drawn at all. The 641 x 40 reservation carries the whole locked state.

- **Verbatim as a RULE rather than as declarations,** and that distinction is the honest one:
  iquilezles has no achievement anything. What is taken is their verified recipe, quoted from the
  note: "no boxes, borders, backgrounds, radii, shadows or padding are ever used to separate a
  component from prose. Components differ from prose only by (a) colour, (b) font family,
  (c) line-height." Their own instance is `.code` against `body`: `#dcdcdc` vs `#c0c0c0`, Courier
  vs sans-serif, 1.35 vs 1.8. **Their 1.35 leading is kept as a number.**
- **Ours:** the decision that a locked achievement is not drawn at all, and the two colours (their
  greys are cool-neutral, ours are the warm tokens). D28 scrapped every reward, so there is nothing
  behind a locked tile left to tease.
- **Could not transfer:** their hues, and their `font-weight: bold`, which on 11px mono over a live
  scene reads as shouting rather than as a switch.
- **Held constant on purpose:** the earned tile keeps the dimden chassis, so V3 changes the LOCKED
  state only and can be judged against V1 with one variable moving instead of two.
- **The honest cost:** you lose the sense of how much is left. The wall becomes a shelf, and the
  count in the line is the only thing carrying it.

---

## Reused rather than rebuilt

- **The unlock toast is already picked** and is not touched or duplicated: dimden `.box` at
  200 x 76, `achievement-tests.html .t-pick`.
- **`.d-tag` and `.d-meta`** in `decisions.css` are the tag and meta chips and are deliberately NOT
  reused here. Different job: those are text chips that size to their content; a tile is a fixed
  88 x 31 graphic slot with no text in it.
- **`rgba(255,255,255,0.03)`** is already `--color-surface-faint` in `extracted/styles/settings.css`
  and is referenced by name rather than redefined.
- No new token is introduced by this component.

## Compliance notes

- Every radius is `0`. All three sources round (dimden 4, cyanilux 7, live 6) and all three are
  squared per the 2026-08-11 shape pass. **No exception is claimed anywhere in this component.**
- No `backdrop-filter`, no blur, no shadow. The only fills used are `--color-panel` (55%) and
  `--color-surface-faint` (3%), both chosen so the live scene reads through.
- `--color-muted` (#9aa3bd) is not referenced. No red, no cool accent.
- Four transitions exist, all of them colour, all covered by a `prefers-reduced-motion: reduce`
  block at the end of the CSS.
- Content is real: the seven EXPLORER achievements transcribed from
  `_javascript/modules/components/achievements.js:22-34`, titles and descriptions verbatim, icons
  written as numeric character references so the files stay ASCII.

---

## Open questions for Rod

1. **Is 88 x 31 still the tile you want?** It is dimden's badge footprint and the blockout renders
   it, but it cannot hold a title, so on desktop the name is a hover tooltip and **on touch there
   is no visible name at all**. If achievement names should be readable, the tile has to grow and
   the blockout's reservation changes with it. Not assumed either way.

2. **Which locked reading?** V1 draws every slot and lights the earned ones, V2 draws no chrome and
   lets value carry it, V3 does not draw a locked slot at all. This is the actual choice and the
   three are genuinely different answers, not three finishes on one answer.

3. **The 10px bar on V1.** It is cyanilux's verbatim value, but at 88px wide it takes 11% of the
   tile where on their heading it takes about 1%. Keep the value and accept the weight, or scale it
   to their ratio, which would make it OURS rather than a transcription?

4. **Emoji.** The tile mark is the achievement's own emoji from `achievements.js`. Two things worth
   knowing before locking it: emoji **ignore `color`**, so no locked state can be carried on the
   mark itself, and emoji render differently on every platform, which
   `achievement-tests.html` already flagged when it put cyanilux's no-icon case in front of you.
   If the marks should be drawn glyphs instead, that is its own sourcing job.

5. **Does V2's row spoil secrets?** V2's locked row shows the achievement's name and progress
   ("Cartographer, visited 10 unique pages, 6 / 10"), which is what the live rule does. For the
   three SECRET achievements that gives the surprise away. Suppress names for the secret category,
   or accept it?

6. **The empty-state copy is placeholder wording, not a design.** "3 of the 7 Explorer achievements
   are still hidden." Your voice, your call.

---

# Versions 4-6

Added 2026-08-23, same day, after the achievement-systems sourcing pass. **V1-V3 are untouched.**
Rod prefers V2, so V2 stays as the reference point to beat and nothing below replaces it.

## Why three more, and why they are not three skins

V1, V2 and V3 all move the same dial: **how much chrome a locked slot gets** (a full box, a 3%
breath, nothing at all). Reading five shipping achievement systems end to end showed that the
thing they actually differ on is three dials, and only one of them was being turned:

| axis | what varies | the systems' answers |
|---|---|---|
| **A** | how LOCKED reads | dimmed (Steam, PlayStation, Xbox) / hue-swapped (Minecraft) / partly filled (Steam) / absent (Minecraft's `hidden`) |
| **B** | is RARITY encoded | not at all / by colour (RetroAchievements, PlayStation) / by SILHOUETTE (Minecraft) |
| **C** | what METADATA rides | nothing (Minecraft) / a count / a global percentage (Steam) / a date / a score (Xbox, PlayStation) |

**V4 moves A. V5 moves B. V6 moves C.** Each holds the other two still, which is the only way they
can be judged one variable at a time and against V2.

---

## Sources S5-S7, and a provenance warning that has to come first

**Minecraft has no stylesheet.** The advancement screen is drawn by the game from PNG sprites.
There is no CSS anywhere to transcribe, none was invented, and no Minecraft URL is cited as
something that was read as CSS, because there is not one. What is cited instead is (a) the decoded
sprite files and (b) the vanilla advancement JSON, both with their repos named. **Every CSS
declaration in V4 and V5 is ours expressing their mechanism**, and both versions are tiered
Remixed on exactly that basis. Steam and RetroAchievements are the opposite case: both have real
public stylesheets, both were fetched, and V6 quotes actual declarations.

| id | source | what kind of source it is |
|---|---|---|
| **S5** | Minecraft advancement UI | **NO CSS EXISTS.** Sprites decoded from `github.com/InventivetalentDev/minecraft-assets @1.21.4`; frame distribution counted over all 126 vanilla advancement JSON files in `github.com/misode/mcmeta @data`; layout constants cross-checked against `BetterAdvancementWidget.java` in `github.com/way2muchnoise/BetterAdvancements`. **Mechanism only.** |
| **S6** | `community.akamai.steamstatic.com/public/css/skin_1/game_achievements.css` | real CSS, fetched. `.achieveFill`, `.achieveTxtHolder`, `.achievePercent` quoted verbatim in the stylesheet header. |
| **S7** | `github.com/RetroAchievements/RAWeb`, `resources/css/badge.css` + `completion-progress.css` | real CSS, open source. `.badgeimg` / `.goldimage` and the four-state ring quoted verbatim. |

### What the sprites actually measure

Decoded rather than remembered, and it is the whole basis of V4 and V5:

| sprite | size | note |
|---|---|---|
| `task_frame_{obtained,unobtained}.png` | **26 x 26** | plain square |
| `goal_frame_*` | **26 x 26** | corners chamfered |
| `challenge_frame_*` | **26 x 26** | corner spikes, waisted middle |
| `box_{obtained,unobtained}.png` | **200 x 26**, nine-slice, border 10 | the name bar |

```
box_unobtained  fill #036A96  hi #0489C1  lo #012E40  outline #000000
box_obtained    fill #B98F2C  hi #DBA213  lo #493606  outline #000000
```

All three frames occupy the same footprint. **Rarity costs interior area (400 / 368 / 382 px of
icon well), never grid space.** That single fact is the only reason a rarity system can exist
inside a fixed 641 x 40 reservation at all.

### What was rejected, with the reason rather than a preference

- **All desaturation-based locking** - Steam's separate `_BW.jpg` asset, PlayStation and Xbox
  dimming client-side. Across 29 tiles it is a wall of grey, and the greys those systems use
  (`#8F98A0`, `#898989`) are the cool-grey family `--color-muted` is banned for.
- **RetroAchievements' `blur-[10px]` mastery glow** and its `border-image` holo sweep, which is a
  rainbow gradient: red and a cool accent in one declaration.
- **Minecraft's `"hidden": true`**, which removes an unearned advancement from the screen
  entirely. It would punch a hole where the 3 Secret tiles live inside a fixed 641 x 40 box.
- **Xbox gamerscore and PlayStation point values.** They exist to feed a lifetime total, there is
  no total here, so a number on every tile would be decoration dressed as data.
- **Steam's 7-per-row cap and `+N` overflow chip.** The 29 tiles are the deliverable, not a teaser.
- **Padlocks and `?` mystery boxes** (`.achieveHiddenBox`, Xbox's locked glyph). Every one of them
  promises something behind the tile, and D28 says the tile is the payoff.

---

## Fit result for V4-V6

Measured live in the browser against the built page at `localhost:4000`, not asserted. Every
number below is printed under its own stage and re-measures on every load.

| version | tile | locked / empty state | explorer wall | all 29 |
|---|---|---|---|---|
| V4 hue swap | 88.00 x 31.00 **EXACT** | 641.00 x 40.00 **EXACT** | 6 + 1 per row, gap 10px | 6+6+6+6+5, block **641 x 195** inside 641 |
| V5 silhouette | 88.00 x 31.00 **EXACT** | 641.00 x 40.00 **EXACT** | 6 + 1 per row, gap 10px | 6+6+6+6+5, block **641 x 195** inside 641 |
| V6 the bar | 88.00 x 31.00 **EXACT** | 641.00 x 40.00 **EXACT** | 6 + 1 per row, gap 10px | 6+6+6+6+5, block **641 x 195** inside 641 |

Three claims each version makes were verified rather than repeated:

- **V4** - earned renders `88 x 31` and locked renders `88 x 31`: *identical geometry, only the
  four colours differ*, which is the sprite finding reproduced.
- **V5** - **all 29 tiles render at `88 x 31`** across three different silhouettes, so rarity
  costs no grid space. Frame census off the live data: task 19 (66%), goal 5 (17%), challenge 5
  (17%), against Minecraft vanilla's 72 / 8 / 20.
- **V6** - widest count is `"31/100"` at **30.78px**; icon 20.70 + gap 4.00 + count 30.78 =
  **55.48px** against **78.00px** free inside the tile, leaving **22.52px spare**. A title needed
  about 50px and could not fit.

**Compliance, measured on the rendered page, not read off the source:** 0 elements exceed their
dashed reservation; no `backdrop-filter`, no `filter`, no `text-shadow` anywhere in the component;
the only `box-shadow`s present are V4's bevels, and they compute to `1px 1px 0px 0px inset` /
`-1px -1px 0px 0px inset` - **zero blur, zero spread**, which are hard lines and not shadows. No
console errors. No horizontal page overflow.

---

## The data behind V4-V6

All 29 achievements are transcribed from the `ACHIEVEMENTS` array in
`_javascript/modules/components/achievements.js` - every title, description, icon, category and
`scope` value is that file's, read and never edited (D22). **Explorer 7, Reader 6, Interactor 8,
Secret 3, Meta 5 = 29**, re-counted live by the readout rather than trusted from a label.

The earned set and the progress numbers come from **one state vector**, so they cannot contradict
each other: `unlocked 14, tagsRead 3, lanternKnocks 31, fireworkCount 18, avatarHoverTime 6`. That
produces the blockout's own **14 of 29**, keeps the Explorer group at the 4 of 7 that V1-V3
already show, earns lantern-tapper (`>= 25`) but not lantern-painter (`>= 50`), and earns
getting-started (`>= 5`) but not collector (`>= 15`).

**Secrets are not spoiled, and it costs nothing.** The locked accessible name is
`"Locked achievement."` in every version, so the three Secret tiles say no more than any other
locked one. That is PlayStation's `trophyHidden` rule - the model's own words are that further
details are not displayed unless earned. The tile stays, the text goes.

---

## Version 4 - hue swap (axis A: how locked reads)

**Tier: Remixed. Idea origin: theirs (Minecraft), mechanism only - there is no CSS.**

**Locked is not dimmer than earned. It is a different colour at the same weight.**

- **The mechanism, measured off the sprites:** between `box_unobtained` and `box_obtained` the
  **geometry is byte-identical**. Only four colours change, and they change **hue, not
  brightness** - `#036A96` blue against `#B98F2C` gold, both saturated, near-equal luminance.
- **The finding that matters:** of the five systems read, **Minecraft is the only one that does
  not fade its locked state**, and that is precisely why a screen of mostly-unearned advancements
  does not read as a screen of failures. Every other system makes a wall of grey.
- **How it is expressed:** the four colours are custom properties on the tile and the two state
  classes swap all four and nothing else. That is not a style choice, it is the finding - the two
  rules are the same shape with a different palette, which is what the two sprites are. The row
  shares the same two rules rather than restating them, because their name bar is nine-sliced and
  the bevel stays 1px at any width.
- **Ours:** every declaration, because there is nothing to copy; the translucent fills, because
  their plate is opaque and would sit on top of the water; and the two hues.
- **Metadata: none.** Minecraft carries a title, a description and an icon and nothing else - no
  date, no score, no percentage. The row carries a criteria count because theirs does.
- **THE OPEN QUESTION, and it is the whole version:** the mechanism needs two hues at equal
  strength, and the palette has exactly one non-warm hue - `--color-accent-cool #3090a8`, "the
  cool sky the warm lanterns hang in", which `settings.css` says to spend **rarely**, on the
  single most important mark per view. **V4 spends it on 15 locked tiles.** That is the opposite
  of rarely. Two warm hues at equal luminance would read as two golds rather than as two states,
  so there is no quiet fix: either the sky stops being rare on this one panel, or V4 loses its
  premise. Flagged rather than resolved.

## Version 5 - silhouette (axis B: rarity)

**Tier: Remixed. Idea origin: theirs (Minecraft frames, mechanism only) + theirs
(RetroAchievements, real CSS).**

**Every tile keeps the same 88 x 31 footprint; the outline changes.**

- **The mechanism:** three frames, all 26 x 26. Task is a plain rect, goal chamfers, challenge
  steps out into corner spikes and in at the waist. The well shrinks with each and the outer box
  never moves.
- **The second axis is free,** and it is RetroAchievements': `badge.css` puts the tier entirely in
  the border (`.badgeimg` transparent vs `.goldimage` gold, both `content-box` so the art never
  shrinks), and `completion-progress.css` gets four states out of one 20px circle by crossing
  **colour = which tier** with **hollow vs filled = how far**. Here shape says which tier and fill
  says earned.
- **The rarity is NOT invented.** There is no rarity field in `achievements.js`, so rather than
  assigning one by taste it is derived from a field that is already there, `scope`:

  | `scope` | frame | count | share |
  |---|---|---|---|
  | `section` | task (plain) | 19 | 66% |
  | `cross` / `site` | goal (chamfer) | 5 | 17% |
  | `meta` | challenge (spikes + waist) | 5 | 17% |

  Minecraft's own vanilla distribution, counted over all 126 files, is **72 / 8 / 20**. Same
  shape, same order, and the fancy silhouette stays a minority - which is what keeps a wall of
  them calm. **The mapping is ours; the field and both counts are not.**
- **Ours:** the polygons. Their spikes were drawn for a 1:1 box and this tile is **2.84:1**, so
  they are **re-cut to sit at the four corners of 88 x 31** instead of being stretched sideways,
  and the waist pinches the left and right edges at mid-height, which is the wide-box reading of
  "in at the vertical middle". Re-cutting is a real design act and is logged as ours, not as a
  transcription. Also ours: dropping RetroAchievements' `content-box` border, because a
  `clip-path` has no border to size - the frame here is a painted parent with an inset well, which
  is how the sprites are built anyway, and it makes the interior shrink at the waist on its own.
- **Metadata: none on the tile.** The shape is the only thing it says.
- **The honest cost:** 5 of 29 tiles get a silhouette nobody has been taught to read. Minecraft
  teaches it over hundreds of hours. A portfolio gets one visit.

## Version 6 - the tile is the bar (axis C: metadata)

**Tier: Remixed. Idea origin: theirs (Steam) + ROD (the count is his content idea, 2026-08-23).**

**The only version that carries a number, and it adds nothing to carry it.**

- **Verbatim,** from `game_achievements.css`:
  `.achieveFill { position:absolute; top:2px; left:2px; bottom:2px; z-index:10; background:#17435c }`
  inside `.achieveTxtHolder { border:1px solid #17435c; overflow:hidden; background:rgba(0,0,0,0.5) }`,
  with the markup setting the width inline: `<div class="achieveFill" style="width: 62%">`.
- **The finding:** the row **is** the bar. The fill colour and the border colour are the same
  value, so a fully-earned thing reads as a solid plate and a barely-started one as a thin stub,
  with no second element, no track and no extra row. Minecraft does the same trick a different
  way: `BetterAdvancementWidget.java` computes `floor(pct * width)` and blits that many pixels
  from the obtained texture and the rest from the unobtained one, so the bar and its own
  background are one object.
- **It also answers the live scene.** Steam's achievement page sits over a full-bleed game hero
  and their entire answer is `background: rgba(0,0,0,0.5)`. One flat scrim, no blur, one
  declaration - a shipping precedent for the same problem, and the reason `--color-panel` is used
  here instead of reaching for a `backdrop-filter`.
- **Why it exists.** Rod, 2026-08-23: *"maybe we can track posts written vs posts read and the
  achievements and then we can track this across design, tech art, and ramblings."* That needs a
  tile that can hold a **count**, and this is the one that can - the number goes in the space the
  icon does not use, and the progress is the tile's own background.
- **The count is real data.** `achievements.js` already ships a `progress` function on **ten of
  the 29**: well-rounded `[n,5]`, connoisseur `[n,10]`, completionist `[n,15]`, pyrotechnician
  `[n,50]`, fan-club `[n,10]`, lantern-tapper `[n,25]`, lantern-painter `[n,50]`, lantern-master
  `[n,100]`, getting-started `[n,5]`, collector `[n,15]`. The other 19 are booleans and correctly
  show no number, **so the version degrades on its own** with no rule needed to switch between
  them. Counts are clamped to their target on display, which is the source's own behaviour
  (fan-club uses `Math.min(s.avatarHoverTime, 10)`).
- **This one breaks the icon-only finding on purpose,** and the distinction matters: that finding
  was that no **title** fits, measured at about 50px of free width against names like "Behind the
  Curtain". A count is not a title. Measured on the page: `"31/100"` is 30.78px, icon + gap +
  count is 55.48px against 78.00px free, **22.52px spare**.
- **Ours:** translucent fills, because `#17435c` is opaque and this sits on a live scene; the
  hues; and `z-index: 0` instead of their 10, so the numeral sits above its own bar.
- **The honest cost:** a half-filled tile says "not yet, and here is exactly how far off you are".
  That is the closest any of the six comes to pointing at something you have not got, and D28
  scrapped the rewards precisely so nothing would. A count is not a reward, but it does point
  forward, and that is worth deciding on purpose rather than inheriting.

---

## Which version can carry a count

**V6, and only V6 without adding chrome.**

- **V6** - built for it. The count is text in the dead space beside the icon and the progress is
  the tile's own background, so nothing is added. The same object works unchanged at row scale,
  which is what a per-section total would need if the categories ever became design / tech-art /
  ramblings. **The taxonomy is not touched here** - only the demonstration that one row and one
  tile can each carry a count with no new element.
- **V4** - could, but it would cost the version its point. Minecraft's own name bar does split
  into a progress bar, but V4's whole claim is "almost no metadata", and giving it a count makes
  it V6 with a different palette. The split was deliberately left to V6 so the three stay
  separable.
- **V5** - could not, without a second axis. It is already spending shape on rarity and fill on
  earned; a count would need a third channel, which means new chrome.

`prefers-reduced-motion` note: V6 is the only version in this file whose transition is not a
colour. It animates **width**, which is real motion, and it is covered by the reduce block at the
end of the stylesheet.

---

## Additional open questions for Rod (V4-V6)

7. **V4's sky spend.** The hue swap is the strongest single idea in this pass and it needs
   `--color-accent-cool` on 15 tiles, against a token that is documented as "spend rarely, on the
   single most important mark per view". Does the sky stop being rare on this one panel, or does
   V4 die? There is no middle version of it.

8. **Does a rarity tier even exist here?** V5 derives one from `scope` because that field is real,
   but nothing in the site has ever told a visitor that a `meta` achievement is rarer than a
   `section` one. If the answer is "there is no rarity", V5 is answering a question nobody asked
   and V4 and V6 are the real pair.

9. **Does a count point at a reward?** D28 scrapped the unlocks so the tile is the payoff. A tile
   reading `31/100` does not promise anything, but it does say there is somewhere else to be. That
   is the one place V6 brushes against D28 and it should be decided rather than absorbed.

10. **The count changes what the tile is for.** V1-V5 tiles are trophies. A V6 tile with a live
    count is a **meter** - it changes while you read, which is a different object with different
    manners (it wants to not animate under the reader's eye, hence the reduced-motion path). Worth
    knowing before the content idea is committed to.

11. **Not yet in the tracker.** `redesign-lab/element-tracker.md` has not been updated for V4-V6 -
    this pass wrote only inside `extracted/components/achievement-tile/`. Three rows are owed once
    a version is picked, and the existing `Slop / mine` row for the trophy GRID still stands
    because nothing here upgrades the wall.
