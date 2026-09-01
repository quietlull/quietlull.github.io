# page-title-desc

The page title + description block for the **projects** and **ramblings** indexes.
Built 2026-08-23 for the sourcing pass. This slot was on the unsourced list: `final-projects.html`
says of it, verbatim, *"no source. \"Section title + tagline\" is on the unsourced list."*

Files:

- `page-title-desc.css` - all three versions, sectioned, each with its own provenance header
- `page-title-desc.html` - the demo, every version at the measured reservation with the reservation
  drawn behind it as a dashed box and a live `getBoundingClientRect` readout under it
- `page-title-desc.md` - this file

---

## What was reused rather than rebuilt

**The H1 is not defined in this component at all.** `decisions.css` already decides it
(`.d-h1`: `--h1-color` signature orange, weight 300, `clamp(2.75rem, 7vw, 101px)`,
`line-height .92`, `letter-spacing -.06em`, `margin 0`). The demo **links the real
`decisions.css` by relative path instead of copying it**, so the two cannot drift. The only thing
this file gives the title is a width, plus one `border-bottom` in V3.

**The description colour is a reuse, not a new derivation.** potg softens secondary text by mixing
the primary colour with the ground rather than introducing a hue
(`color-mix(in srgb, var(--color-black-100) 70%, transparent)`, sources/potg-typography.md:122).
`--color-silver` is already that operation on our side: `decisions.css:20` defines it as
`color-mix(in srgb, #f5f3ef 62%, #1c1a18)`. So the mechanism is theirs, the token already existed,
and nothing new is derived. Their `transparent` half is deliberately dropped: a see-through
description over a live three.js scene loses legibility, the same reason `decisions.css:209`
swapped `--color-panel` for `--color-panel-solid` on the prose-link highlight.

No other component in `extracted/components/` does this job. `post-header-real/` is the closest
neighbour and it is the post's **metadata rail**, not a page title block; it also explicitly
declines to define the title, for the same reason this one does.

---

## Sources

**potg.art** - https://potg.art/about/ , stylesheet `https://potg.art/_astro/about.DQG1MDvI.css`.
Held as `sources/potg-typography.md`, tier True, captured 2026-06-11. In Rod's own gallery at
`reference-gallery.html:559-564`, tiered **A-**, his tags include serif-display, minimal-text,
elegant-fonts, generous-spacing.

**Re-verified against the live stylesheet on 2026-08-23 for this build.** Every value used below
came back identical to the saved note. **One field did not echo:** the live fetch returned
`.my__header__sub` as `font-size 12 / weight 300 / line-height 1` and did **not** show the
`letter-spacing:.05em` the saved note records for it. That selector is not used by any of the three
versions shipped here, so nothing depends on it, but the note should be re-checked before anyone
builds off that rule.

potg is the right parent because it actually **has** this component and almost nothing else in the
lab's source set does: an `<hgroup class="page-header">` holding a page title with a sub line under
it, plus two more real title-plus-secondary arrangements on the same site.

**acegikmo** - https://acegikmo.com/shapes/css/styles.css . Held as `sources/acegikmo-prose.md`,
already CONFIRMED, and **re-fetched live 2026-08-23**; the `h1` block came back verbatim. Used by
V3 only, for one declaration.

### Unit conversion, stated because it is a real decision

potg sets `html{font-size:calc(100 / var(--base-vw) * 1vw)}` with `--base-vw:1440`
(sources/potg-typography.md:61, 68-72), so **1rem on that site is 1px at a 1440 viewport**. Our root
is the default 16px. Their values are therefore carried across **as pixels**, not as rems:
16rem to 16px, 11rem to 11px, 12rem to 12px, 22rem to 22px, 23rem to 23px, 640rem to 640px.
Nothing is rounded and nothing is rescaled to taste.

---

## The versions

### V1 - the sub line

**Tier: Remixed. Idea-origin: theirs.**

- **Verbatim:** `font-size:16rem; font-weight:300; line-height:1; letter-spacing:.05em` from
  `hgroup.page-header .page-header__sub`. Their `margin-top:11rem` is the title-to-sub gap and is
  recorded in the CSS but not set live (see "the gap" below).
- **Ours:** the colour token only, and that is a reuse (above).
- **Could not transfer:** their typefaces (Dahlia / Hellix / Hiragino ProN are commercial or
  Japanese-only), so the description takes `--font-body`, which the six final pages already load.
  Their `#28224D` on white inverts under our palette.
- **Honest limit:** their sub is **one line** and `line-height:1` is drawn for one line. The
  projects blockout reserves **two**. At two lines a 16px sub at line-height 1 sets solid with no
  leading between them. V2 exists because of this.

### V2 - the softened paragraph

**Tier: Remixed. Idea-origin: theirs.**

- **Verbatim:** `font-size:16rem; font-weight:300; line-height:1.7; letter-spacing:.05em` from
  `section.first .first__text-ja`, potg's own answer for a secondary block that **wraps**, which is
  what a two-line page description is. Its container's `gap:23rem` is recorded, not set live.
- **Ours:** the colour token only, same reuse as V1.
- **Difference from V1 is exactly one declaration:** leading, 1 to 1.7. Same size, same weight,
  same tracking, same colour. That is the point - it isolates the one thing V1 gets wrong at two
  lines.
- **Could not transfer:** same typeface problem as V1.

### V3 - ruled title over a lede

**Tier: Remixed. Idea-origin: theirs (both halves). TWO PARENTS, filed as a remix because no single
source does both.**

- **Verbatim, half one (acegikmo):** `border-bottom: solid 1px` with **no** `border-color`, so the
  rule inherits the heading's own `color`. That is the whole device: title and rule move together
  on one colour change. Here that colour is the decided `--h1-color`.
- **Verbatim, half two (potg):** `font-size:22rem; font-weight:500; line-height:1.8;
  letter-spacing:-.02em` from `section.first .first__text-en`, plus its container's
  `max-width:640rem`. On their page the lede runs at **full** text colour while the support line
  under it is mixed down, so this description takes `--color-text` and becomes the brightest thing
  in the block. That agrees with `decisions.css:184-188`, where body copy is pristine white and the
  headings recede.
- **Not taken from acegikmo:** their typeface (commercial), their `font-weight:100` (the ladder says
  300), their `#ff1155` (palette law), their `margin-top:60px` (the blockout owns the space above).
- **Not taken from potg:** `.first__wrap{margin-left:auto}`, which right-aligns their lede to the
  page grid. Both blockouts centre this block, so their alignment cannot come with it.
- **Note the echo, so it reads as a choice and not an accident:** `decisions.css:89-95` already
  gives the H2 a rule, but by a different mechanism - a flex `::after` at 0.28 opacity **beside**
  the text. This is a rule **under** the text at full colour. Related, not identical.
- **Measured problem, see the open questions:** the rule collides with the descender in "Projects".

---

## The gap

Each version's source carries its own title-to-description gap (11px potg page-header, 23px potg
first-wrap). **None of them is set live.** Both blockouts reserve their own gap and
match-the-blockout is the hard constraint, so the two page arrangements set it:

- `.ptd--projects { --ptd-gap: 18px }` - `projects-blockout.html:232`, the literal
  `<div style="height:18px">` between the two boxes
- `.ptd--ramblings { --ptd-gap: 12px }` - `ramblings-blockout.html:126`, and
  `final-ramblings.html:110` `.titlebar .inner{gap:12px}`

The sourced values are kept in the CSS comments so the choice is reversible. The gap is therefore
**not** a difference between versions.

---

## Why the two pages differ, and why they are not unified

They are transcriptions of **two different sites**, not two attempts at one idea.

**PROJECTS is a full-width block.** Both boxes span the panel's 930px content width, so the title
box and the description box are the **same** width and only the copy is centred inside them.
`projects-blockout.html:232`; the 930 is the 1000px panel less its 2 x 35px padding
(`final-projects.html:101`).

**RAMBLINGS is a narrow centred title over a wider description**, inside a tinted full-width band.
The title box is deliberately **smaller** than the description box, the exact inverse of projects.
`ramblings-blockout.html:125-126`.

One correction to the brief, because code wins: **projects is not left-aligned.** Its host sets
`.panel .head{text-align:center}` (`final-projects.html:104`) and the blockout wraps the two boxes
in `<div style="text-align:center">` (`projects-blockout.html:231`). Both pages centre this block.
The structural disagreement is **full-width-equal-boxes vs narrow-title-over-wide-description**,
not alignment. Nothing has been unified; the component carries both arrangements as modifiers.

---

## MISMATCH FOUND: the ramblings reservation handed to this build is the wrong variant

The reservation given for ramblings - **380 x 100 title, 520 x 44 description** - is variant 1,
`?v=rulelog`, the **dimden** transcription (`ramblings-blockout.html:125-126`). That is the variant
the blockout page loads **by default**: `ramblings-blockout.html:89` is `<body class="rulelog">` and
`:252` is `show(m?m[1]:'rulelog')`. A measuring pass that opened the page without a `?v=` would have
measured it. So the number is a real measurement of the wrong page state.

The chosen variant is a different one. `final-ramblings.html:21`, verbatim:

    CHOSEN BLOCKOUT: ramblings-blockout.html?v=hairline

and the hairline title bar reserves **220 x 26** over **560 x 20**
(`ramblings-blockout.html:164-165`, repeated in the slot text at `final-ramblings.html:167`), inside
a band with 37px padding above and below (`final-ramblings.html:106`) and a 12px gap (`:110`).

**Both are drawn in the demo.** This is not resolved here - it is a contradiction between two
Rod-approved artefacts, the same shape as mismatch 2 in
`analysis/2026-08-23-blockout-contract.md`, and picking one is Rod's call.
It also means `analysis/2026-08-23-blockout-contract.md:50-51` records ramblings against the
un-chosen variant, and the same is true of its entry-row numbers: 1054 and 838 are 78% and 62% of
1351, which are the rulelog percentages at `ramblings-blockout.html:118, 121`, not Eve's fixed
1140px column.

---

## Fit against the measured boxes

Measured at **viewport 1440**, over http, with the real fonts loaded, via
`getBoundingClientRect()`. Title width is reported as the **text advance** (a Range over the
heading's contents), because the title box is set to the reserved width, so the box always
"matches" and only the text can overflow it.

### PROJECTS - title 930 x 44, gap 18, description 930 x 50 (block 112)

| | title box | title text advance | description | block |
|---|---|---|---|---|
| V1 | 930 x **92.72** - **OVER 48.72 tall** | 347.47, fits 930 | 930 x 32 - 18 to spare | 142.72 - **OVER 30.72** |
| V2 | 930 x **92.72** - **OVER 48.72 tall** | 347.47, fits 930 | 930 x 54.38 - **OVER 4.38** | 165.09 - **OVER 53.09** |
| V3 | 930 x **93.72** - **OVER 49.72 tall** | 347.47, fits 930 | 640 x 158.38 - **OVER 108.38 tall**, 290 narrow | 270.09 - **OVER 158.09** |

### RAMBLINGS as handed (rulelog) - title 380 x 100, gap 12, description 520 x 44 (block 156)

| | title box | title text advance | description | block |
|---|---|---|---|---|
| V1 | 380 x 92.72 - 7.28 tall to spare | **421.16 - OVER the 380 box by 41.16** | 520 x 48 - **OVER 4** | 152.72 - 3.28 to spare |
| V2 | 380 x 92.72 - 7.28 tall to spare | **421.16 - OVER by 41.16** | 520 x 81.56 - **OVER 37.56** | 186.28 - **OVER 30.28** |
| V3 | 380 x 93.72 - 6.28 tall to spare | **421.16 - OVER by 41.16** | 520 x 118.78 - **OVER 74.78** | 224.5 - **OVER 68.5** |

### RAMBLINGS as chosen (hairline) - title 220 x 26, gap 12, description 560 x 20 (block 58)

| | title box | title text advance | description | block |
|---|---|---|---|---|
| V1 | 220 x **92.72 - OVER 66.72 tall** | **421.16 - OVER by 201.16** | 560 x 32 - **OVER 12** | 136.72 - **OVER 78.72** |
| V2 | 220 x **92.72 - OVER 66.72 tall** | **421.16 - OVER by 201.16** | 560 x 54.38 - **OVER 34.38** | 159.09 - **OVER 101.09** |
| V3 | 220 x **93.72 - OVER 67.72 tall** | **421.16 - OVER by 201.16** | 560 x 118.78 - **OVER 98.78** | 224.5 - **OVER 166.5** |

Description copy is identical across the three versions on each page, so the only variable in a
column is the treatment. The copy is real: the projects line names Compute Grass, 2D Physics on the
GPU, Procedural 3D Mask and Sprite Baker 9000; the ramblings line names the 2004 racing game post.
A shorter line changes the description rows and nothing else.

---

## THE ONE THING THAT MATTERS MOST: the decided H1 does not fit any title reservation

This is not a property of the three versions. It is the title itself, and all three inherit it.

`.d-h1` is `clamp(2.75rem, 7vw, 101px)` at `line-height .92`. At a 1440 viewport that resolves to
**font-size 100.8px** and a **92.736px** box (both read off computed style, not calculated by hand).
Every title reservation in both blockouts was drawn smaller than that:

- projects reserves **44** tall. Over by **48.72**.
- ramblings rulelog reserves **100** tall and **380** wide. Height fits with 7.28 to spare, but
  "Ramblings" measures **421.16** wide, so the word overflows its own box by **41.16**, centred, so
  it spills about 20.6px past each edge.
- ramblings hairline reserves **26** tall and **220** wide. Over by **66.72** tall and **201.16**
  wide.

Nothing has been shrunk to hide this. **What it would take**, derived from the measurements above
and applied to nothing:

- for the projects 44px box: font-size 44 / 0.92 = **47.83px**
- for "Ramblings" to fit 380 wide: 380 / 421.16 x 100.8 = **90.95px**
- for the hairline 220 box: 220 / 421.16 x 100.8 = **52.66px**; for its 26px height, 26 / 0.92 =
  **28.26px**

Note that `clamp`'s **minimum**, 2.75rem, is exactly **44px** - the projects reservation. The
blockout and the ladder agree at the clamp floor and diverge everywhere above it. That may be a
coincidence and is flagged as one rather than treated as intent.

---

## Open questions for Rod

1. **Which is wrong, the blockout or the ladder?** The decided H1 renders 92.74px tall and every
   title reservation is smaller. Either the reservations move up or the H1's clamp moves down; both
   are approved decisions and this component cannot pick. The derived numbers are above.

2. **Which ramblings variant is the contract?** The reservation this build was handed
   (380 x 100 / 520 x 44) is `?v=rulelog`, the blockout's default. `final-ramblings.html:21` says
   the chosen one is `?v=hairline` (220 x 26 / 560 x 20). Both are drawn. This also affects the
   ramblings rows in `analysis/2026-08-23-blockout-contract.md`.

3. **The H1's weight 300 currently has no font file.** Measured, not inferred: at 100.8px with
   `letter-spacing:-.06em`, "Ramblings" is **421.16px** at weight 300 and **421.16px** at weight
   400, while weight 500 is 430.72 and weight 700 is 410.5. Identical 300 and 400 advances means no
   300 face is loaded and 300 is being served by the 400 file. The final pages request
   `M+PLUS+Rounded+1c:wght@400;500;700`, and `decisions.css:63` asks for 300. So the "weight 300"
   half of the accepted ladder is not in effect on any page today. The fix is one token in the
   Google Fonts query on pages this build must not touch.

4. **V3's rule cuts the descender.** The font's natural line box at 100.8px measures **149px**;
   `line-height:.92` crops it to 92.736, so the glyph content area sticks out **28.13px** above and
   below the box. `border-bottom` sits on the box edge, which lands inside the descender region, so
   the **j** in "Projects" crosses the rule. The demo draws it rather than describing it. The
   cheapest fix is `padding-bottom` on the title, which would be **ours**, would make the title box
   taller than it already is, and is not added without his say-so.

5. **V3's description does not fill the projects reservation.** potg's lede measure is 640px and the
   projects box is 930px, so the description sits 290px narrower than its box. That is faithful to
   the source; widening it to 930 would be ours.

6. **Should the description be a `<p>` under the `<h1>` or a real `<hgroup>`?** potg uses
   `<hgroup class="page-header">`. The demo uses a plain div with an h1 and a p, which is what the
   final pages' greybox slots are shaped like. `<hgroup>` would be the faithful transcription and
   costs nothing, but it is a markup change in the final pages, which are Rod's to merge.

---

## Motion and accessibility

Nothing in this component animates or transitions, so there is no `prefers-reduced-motion` block.
That is a statement, not an omission.

No fill, no border box, no blur, no `backdrop-filter`, no shadow: this block sits straight on the
live scene. Square by default; nothing here rounds anything. `--color-muted` (#9aa3bd) is not used
anywhere in the file. The demo's own "over the box" readout is coloured `--color-gold`, not red.

---

# Appendix: reasoning moved out of the stylesheet, 2026-08-25

Moved from `_sass/components/_page-title-desc.scss` under D45 (comments get short). Original
wording, kept because it is the provenance record. The stylesheet points here.

## Header

> page-title-desc - the PAGE TITLE + DESCRIPTION block for the projects and ramblings indexes.
> Built 2026-08-23 for the SOURCING PASS. This slot was on the unsourced list: final-projects.html
> says of it, verbatim, "no source. Section title + tagline is on the unsourced list."

### The title is not defined here, on purpose

> The H1 is already decided in decisions.css (.d-h1: signature orange --h1-color, weight 300,
> clamp(2.75rem, 7vw, 101px), line-height .92, letter-spacing -.06em, margin 0). This file does
> NOT restate any of it. The title element in the demo carries .d-h1 and the demo LINKS the real
> decisions.css by relative path rather than copying it, so the two cannot drift.
> The only thing this file gives the title is a WIDTH, because the two blockouts reserve
> different widths for it, and one border-bottom in V3.

### Primary source

> potg.art - https://potg.art/about/ , stylesheet https://potg.art/_astro/about.DQG1MDvI.css
> Held in the lab as sources/potg-typography.md, tier True, captured 2026-06-11.
> In Rod's own gallery at reference-gallery.html:559-564, tiered A-, his tags include
> "serif-display", "minimal-text", "elegant-fonts", "generous-spacing".
> RE-VERIFIED AGAINST THE LIVE STYLESHEET 2026-08-23 for this build. Every number below came
> back identical to the saved note. ONE FIELD DID NOT ECHO: the live fetch returned
> .my__header__sub as font-size 12 / weight 300 / line-height 1 and did not show the
> letter-spacing .05em the saved note records. It is flagged at V1 rather than assumed.
>
> potg is the right parent because it has this exact component and almost nothing else does:
> an <hgroup class="page-header"> holding a page title with a sub line under it, plus two other
> real title+sub arrangements on the same site. Three versions, three of THEIR arrangements.

### Unit conversion, stated because it is a real decision

> potg sets html{font-size:calc(100 / var(--base-vw) * 1vw)} with --base-vw:1440, so 1rem on
> that site is 1px at a 1440 viewport (sources/potg-typography.md:61,68-72). Our root is the
> default 16px. Their values are therefore carried across AS PIXELS, not as rems:
> 16rem -> 16px, 11rem -> 11px, 12rem -> 12px, 22rem -> 22px, 23rem -> 23px, 640rem -> 640px.
> Nothing is rounded and nothing is re-scaled to taste.

### What could not transfer, palette, motion

> Their typefaces (Dahlia, Hellix, Hiragino ProN) are commercial or Japanese-only and are not
> carried. The description takes --font-body, which is what the six final pages already load.
> Their #28224D-on-white scheme is inverted here by the palette, so their color-mix softening
> becomes --color-silver - see the colour note at V1.

> --color-muted (#9aa3bd) is not used anywhere in this file. The description takes
> --color-silver (#a3a19d) in V1 and V2 and --color-text in V3.
> No blur, no backdrop-filter, no shadow, no fill: this block sits straight on the live scene.
> Square by default and nothing here rounds anything.

> Nothing in this component animates or transitions, so there is no prefers-reduced-motion
> block. That is a statement, not an omission.

## The block

> Two children and a gap. The gap is a variable because the two blockouts reserve DIFFERENT
> gaps and the blockout is the contract.

## V1 - the sub line

> potg's own page-header, geometry verbatim. TIER: Remixed. IDEA-ORIGIN: theirs.
>
> VERBATIM from https://potg.art/_astro/about.DQG1MDvI.css, re-verified live 2026-08-23:
>   hgroup.page-header .page-header__sub{ font-size:16rem; font-weight:300; line-height:1;
>                                          letter-spacing:.05em; margin-top:11rem }
> Their margin-top:11rem is the gap between title and sub. It is recorded here and NOT set as a
> live declaration, because both blockouts reserve their own gap (18px projects, 12px
> ramblings) and match-the-blockout outranks it. Reversible: delete the page arrangement and
> the default --ptd-gap:11px above is theirs.
>
> COLOUR IS OURS, and it is a REUSE rather than a new decision: potg softens secondary text by
> MIXING the primary colour with the ground (color-mix(in srgb, var(--color-black-100) 70%,
> transparent), sources/potg-typography.md:122) instead of introducing a second hue.
> --color-silver is already exactly that operation on our side - decisions.css:20 defines it as
> color-mix(in srgb, #f5f3ef 62%, #1c1a18). So the mechanism is theirs and the token already
> existed; nothing new is derived here. Their `transparent` half is deliberately NOT copied: a
> see-through description over a live three.js scene loses legibility, which is the same reason
> decisions.css:209 swapped --color-panel for --color-panel-solid on the prose link highlight.
>
> FLAGGED: their sub is ONE line, and line-height:1 is drawn for one line. The projects blockout
> reserves TWO lines. At two lines a 16px sub at line-height 1 sets solid with no leading. V2
> exists because of this.

## V2 - the softened paragraph

> potg's own multi-line secondary text. TIER: Remixed. IDEA-ORIGIN: theirs.
>
> VERBATIM from the same stylesheet, re-verified live 2026-08-23:
>   section.first .first__text-ja{ font-size:16rem; font-weight:300; line-height:1.7;
>                                  letter-spacing:.05em }
> and its container section.first .first__wrap{ gap:23rem }.
> This is the site's real answer for a secondary block that WRAPS, which is what a two-line page
> description is. Same size and weight as V1; only the leading changes, 1 -> 1.7.
> Their 23px wrap gap is recorded and not set live, same reason as V1.
>
> OURS: the colour token only, same reuse as V1.

## V3 - the ruled title over a lede, two parents

> TWO PARENTS, so it is filed as a REMIX and neither citation is allowed to carry the other.
> TIER: Remixed. IDEA-ORIGIN: theirs (both halves). No source does both.
>
> HALF ONE - THE RULE. acegikmo, https://acegikmo.com/shapes/css/styles.css, verbatim, held as
> sources/acegikmo-prose.md and re-verified live 2026-08-23:
>   h1{ font-family:"Renogare"; text-align:center; margin-top:60px; color:#ff1155;
>       font-weight:100; border-bottom: solid 1px; }
> The ONE declaration taken is `border-bottom: solid 1px` with NO border-color, which is the
> whole device: the rule inherits the heading's own `color`, so the title and its rule move
> together with a single colour change. Here that colour is the decided --h1-color.
> NOT TAKEN: their typeface (commercial), their weight 100 (the ladder says 300), their
> #ff1155 (palette law), their margin-top:60px (the blockout owns the spacing above).
> NOTE THE ECHO, so it is a choice and not an accident: decisions.css:89-95 already gives the H2
> a rule, but by a different mechanism (a flex ::after at 0.28 opacity beside the text). This is
> a rule UNDER the text at full colour. They read as related, not identical.
>
> HALF TWO - THE LEDE. potg, same stylesheet, re-verified live 2026-08-23:
>   section.first .first__text-en{ font-size:22rem; font-weight:500; line-height:1.8;
>                                  letter-spacing:-.02em }
>   section.first .first__wrap{ max-width:640rem }
> This is their lead paragraph, and it is the only one of the three that is NOT softened: on
> their page the lede runs at full text colour while the support line under it is mixed down.
> Carried across that way, so the description here takes --color-text and becomes the brightest
> thing in the block. That agrees with decisions.css:184-188, which makes body copy pristine
> white and the brightest thing on the page while the headings recede.
>
> NOT TAKEN from potg: their .first__wrap{margin-left:auto}, which right-aligns the lede to the
> page grid. Both blockouts centre this block, so their alignment cannot come with it.
>
> WATCH AT BUILD, measured not guessed: .d-h1 is line-height .92, which crops the em box tighter
> than the glyphs. "Projects" has a descender. A border-bottom sits on the bottom of that
> cropped box, so the j may cross the rule. The demo draws it so this can be looked at rather
> than argued about.

## The two page arrangements - where the blockout wins

> The two pages disagree structurally and they are NOT unified here, because both are approved
> blockout geometry and D25 says layout is Rod's alone:
>
>   PROJECTS is a FULL-WIDTH block. Both boxes span the panel's 930px content width, so the
>   title box and the description box are the same width and only the copy is centred inside
>   them. Nothing is narrowed.
>     projects-blockout.html:232 - box(44,'PAGE TITLE') + height:18px + box(50,'DESCRIPTION')
>     final-projects.html:104    - .panel .head{text-align:center}
>     930 = the 1000px panel less its 2 x 35px padding (final-projects.html:101).
>
>   RAMBLINGS is a NARROW CENTRED TITLE over a WIDER description, both inside a tinted
>   full-width band. The title box is deliberately SMALLER than the description box, which is
>   the exact inverse of projects, where they are equal.
>     ramblings-blockout.html:125-126 - b('380px',100) + height:12px + b('520px',44)
>
> WHY THEY DIFFER, since the instruction was to say why: they are transcriptions of two
> different sites, not two attempts at one idea. Projects is MinionsArt's tutorials page, where
> the header is a band across the top of a boxed panel and everything in the panel shares one
> width. Ramblings is a personal blog index whose header is a centred mark with a line under it,
> so the title is sized to the WORD and the description is sized to the SENTENCE. Unifying them
> would mean overriding one of the two chosen blockouts, which is Rod's call and not this
> component's.

## The other ramblings reservation - unresolved on purpose

> The reservation handed to this build for ramblings (380 x 100 title, 520 x 44 description) is
> variant 1, `?v=rulelog`, the dimden transcription. That is the variant ramblings-blockout.html
> loads BY DEFAULT (line 89, <body class="rulelog">, and line 252, show(m?m[1]:'rulelog')), so a
> measuring pass that opened the page without a ?v= would have measured it.
>
> The CHOSEN variant is not that one. final-ramblings.html:21 says, verbatim:
>   CHOSEN BLOCKOUT: ramblings-blockout.html?v=hairline
> and the hairline title bar reserves DIFFERENT boxes:
>   ramblings-blockout.html:164-165 - b('220px',26,'PAGE TITLE') + 12px + b('560px',20,'PAGE DESCRIPTION')
>   final-ramblings.html:167 repeats it: "220x26 title over 560x20 description, centred"
> Both are drawn in the demo. This is NOT resolved here - it is a contradiction between two
> Rod-approved artefacts and picking one is his call, exactly like mismatch 2 in
> analysis/2026-08-23-blockout-contract.md.
