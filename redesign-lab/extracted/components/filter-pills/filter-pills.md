# filter-pills

The category filter row on the PROJECTS index. Three versions, all at the measured blockout size.

Files: `filter-pills.css`, `filter-pills.html` (self-contained bench, open at viewport 1440).

---

## The measured reservation

Read off `projects-blockout.html` at viewport **1440**, `body.sticker` (V1 MinionsArt, the variant
the file ships with `class="on"`; V5 hybrid is labelled SCRATCHED), with `getBoundingClientRect()`
and `getComputedStyle`:

| what | measured |
|---|---|
| `.filters` box | **500.00 x 58.00** at x 462.50, y 341.00 |
| `.filters` | padding 15px, gap 10px, `grid-template-columns: repeat(5, auto)` |
| `.filters .chip` | **28.00** tall x5; widths 79.95 / 98.09 / 86.00 / 86.00 / 79.95, **sum 430.00** |
| `.panel` | 1000 wide at x 212.50, padding 35px -> inner band **930**, from x 247.50 |
| `.search` | 400 x 34, bottom 317, so **24px** of clear space above the filter row |
| `.grid` | top 399 = `.filters` bottom, so the row contributes **no margin below itself** |

So: outer box **500 x 58**, centred in the 930 band, pill row inside it **470 x 28**.
The brief described the slot as "the 930-wide header band"; the row is a 500-wide element centred
in that band, not a 930-wide element. Both numbers are drawn in the demo.

## Fit result

All three versions measure **500.00 x 58.00** with a **28.00** pill height. Measured on the built
demo with the same rig, at 1440:

| version | row measured | pill widths | sum | fits |
|---|---|---|---|---|
| A TAB | 500.00 x 58.00 | 66.61 / 92.22 / 103.88 / 94.55 / 72.75 | 430.00 | yes, exactly |
| B BRACKET | 500.00 x 58.00 | 63.42 / 93.02 / 104.67 / 95.34 / 73.55 | 430.00 | yes, exactly |
| C UNDERLINE | 500.00 x 58.00 | 63.42 / 93.02 / 104.67 / 95.34 / 73.55 | 430.00 | yes, exactly |

A's pills differ by a few px because the selected tab carries MinionsArt's 2px border; the row
total is unchanged because the `auto` tracks redistribute.

**Headroom:** the five labels at their natural width total **350.70px** against **430.00px** of
track space, so there is **79.30px** of slack and the tracks are stretching, not overflowing.
The document scroll width stays 1440, so nothing overflows horizontally.

**One thing that had to be shrunk, stated rather than done silently:** MinionsArt's own
`.tab button` padding is `14px 16px` on a `line-height: 10px`, which is a 38px-tall pill and a
**500 x 68 row - 10px over the reserved 58**. The vertical padding is set to 9px instead
(28 - 10 line-height = 18, halved = 9). The horizontal 16px is untouched. If Rod wants their 14px
back, the reservation has to grow by 10px.

---

## Version A - TAB (MinionsArt)

**Tier: Remixed. Idea origin: theirs.**
Source: `https://minionsart.github.io/tutorials/style.css`, read from a downloaded copy of the live
stylesheet (the same download that produced `sources/minionsart-prose.md`; local evidence copy at
`.../scratchpad/callout-sources/minionsart/style.css`).

**Verified against the live site 2026-08-23.** The stylesheet was re-fetched from the live URL and
compared: `.buttons`, `.tab button`, `.tab button.active`, `.tab button:hover`, `.filterButton` and
`a:hover` all come back character-for-character as quoted below. **No discrepancy** between the
saved copy and the live site.

The filter is not a pill, it is a **tab**. Rest is bare text. The selected one fills with the
colour of the panel and reads as a recess in the surface rather than a button on top of it.

**Verbatim:** `.buttons` (style.css:280-289) as the row; `.tab button` (254-273) as the pill reset -
`background-color: inherit`, `border: none`, `cursor: pointer`, `font-size: 14px`,
`line-height: 10px`, the 16px horizontal padding, `transition: 0.3s`; `.tab button.active`
(248-252) as the selected state - fill with the surface colour plus a 2px border of that same
colour.

**Ours / changed:**
- `border-radius: 10px` -> `0` (shape pass).
- vertical padding 14 -> 9 (the arithmetic above).
- the 4-stop `rgb(7,59,136)` text-shadow **dropped** - cool blue, banned by the palette law, and it
  is a hand-rolled outline hack that the de-glow pass removes anyway.
- `font-weight: bold` **dropped with it**, not separately: the bold exists to keep 14px legible
  under that outline, and with the outline gone it is carrying nothing.
- `outline: none` **not taken** - killing the focus ring on a keyboard control is a WCAG 2.4.7
  failure. Every version gives `:focus-visible` the same treatment as `:hover`.
- `font-family: "Franklin Gothic Medium", serif` cannot transfer; type is the cohesion pass's.
- `color: white` -> `--color-silver` at rest. White is the body-copy tone (decisions.css:189,
  "body copy is the brightest thing on the page"), so an unselected filter must not outrank it.
- the hover is **replaced**. Theirs is `.tab button:hover { background-color: #ddd }`, a pill FILL,
  which Rod rejected. The replacement is the same site's own `a:hover` (25-28) recoloured to gold,
  with its `filter: brightness(150%)` dropped as a glow lift.

**What could not transfer, and it matters:**
1. **The shape pass erases half the active state.** Their selected tab is fill **plus**
   `border-radius: 10px 10px 0px 0px` - the squared bottom is what makes it merge downward into
   the panel. Radius 0 makes that declaration a no-op, so the whole signal is the fill alone.
   This version reads quieter here than it does on their site.
2. **Their row is outside the panel.** `.tab` lives in `header.html`, above `.mainbody`; the fill
   contrasts against the header artwork and merges into the panel below. The approved blockout puts
   the row **inside** the 1000px panel, so there is nothing to merge into. Translated by taking
   `--color-panel-solid` (#1c1a18, the opaque twin of the .55 translucent panel the row sits on) so
   it still reads as a recess.
3. `.buttons` is real CSS in their real stylesheet but is **dead on their live page** - nothing
   there carries `class="buttons"`. Their live filter row is `.tab`, a centred flex of twelve
   `.tablinks` buttons (`header.html:33-56`). The blockout transcribed `.buttons` and Rod approved
   that geometry, so 500 x 58 stands, but the row is sourced from a rule the source site does not
   use, and that is worth knowing before anyone calls it "the MinionsArt filter row".

---

## Version B - BRACKET (Filippo Ruffini)

**Tier: Remixed. Idea origin: theirs (the mechanism) / Claude (using it as a filter's selected
state).** Flagged: they bracket heroes, images, menu links and the cursor, never a filter, so the
application is Claude-originated and counts against the under-25% budget.
Source: `sources/filipporuffini-corner-brackets.md`, tier True, from the live page source of
`https://www.filipporuffini.com/` plus their Webflow stylesheet
`.../css/filippo-ruffini.webflow.98e69a3e9.css`.

**Verified against the live site 2026-08-23** by fetching both files raw (WebFetch's markdown
conversion strips `<style>` blocks and reported everything ABSENT, which is a tooling artefact, not
a finding - `curl` found all of it). The saved note is accurate: the `:root` variables
(`--corner-style: 1px solid #333333`, `--corners-cursor: 0.5rem`, `--corners-hover: 1rem`,
`--corners-large: 6.25rem`, `--corners-small: 3.125rem`), all four `.corners__top/__btm` elbow
rules, the `.cursor-corners` base rule and the `!important` hover-grow rule all come back
character-for-character.

**The live fetch DID correct one thing this component was doing.** Their transition is **not on the
arms**: `.cursor-corners { transition: height .4s cubic-bezier(.77,0,.175,1), width .4s
cubic-bezier(.77,0,.175,1) }` eases the FRAME BOX from 2rem to 5rem, and the arm pseudo-elements
carry no transition at all - the arms **snap**. This build moves the easing onto the arms, which is
**ours, not theirs**, and deliberate: our pill box is pinned to the measured 28px so the frame
cannot grow, and the arms are the only thing left that can carry the "viewfinder opens" motion.
Their curve, our property. If Rod wants strict fidelity the arms snap instead.

No box and no fill in any state. Four 1px corner elbows frame each pill. Hover grows the arms;
the selected one turns the line gold and brightens the label. This is the most direct answer to
"he rejected pill-fill hover" - there is nothing to fill.

**Verbatim:** the elbow mechanism (a zero-background box painting only two adjacent borders), their
two-element DOM (`corners__top` / `corners__btm`, because four elbows needs four pseudo-elements and
one element only has two), `--corner-style` as the single source of truth for the line, the arm
sizes `--corners-cursor: 0.5rem` and `--corners-hover: 1rem`, the easing curve
`.4s cubic-bezier(.77, 0, .175, 1)`, and their hover-grow behaviour.

**Ours / changed:**
- the easing moved from their frame box onto the arms (see the verification note above).
- their `.corners` wrapper (`padding: .9375rem; position: relative`) is not used; the button itself
  is the positioned parent, at the 9px/16px padding the reservation forces.
- the line colour: their `1px solid #333333` on #101010 becomes `--color-line-soft` at rest and
  `--color-gold` when selected. Their own note calls out exactly this swap for a warm palette.
- `!important` dropped - they need it to beat Webflow's generated cascade; here it would only make
  the component un-overridable.
- their arm sizes are used at the small end: `--corners-large` (6.25rem) and `--corners-small`
  (3.125rem) are both bigger than the whole 28px pill, so `--corners-cursor` (0.5rem = 8px, built
  for their 2rem cursor box) is the closest thing they ship to a 28px chip.

**Measured consequence:** on hover the arms go to 1rem = 16px. The pill is 28px tall, so a 16px arm
from the top and one from the bottom **overlap by 4px**: the left and right sides draw as continuous
edges while the top and bottom stay open (the pills are 63-105px wide, so the horizontal arms never
meet). The frame reads as "closing" on hover. That is the 28px reservation's doing, not theirs.
14px is the largest arm that cannot overlap, if Rod wants the elbows to stay open.

**Measured contrast:** the rest elbows are 1.32:1 against the panel. That is deliberately quiet and
faithful - theirs measures 1.51:1 on their own ground - but it does mean the rest brackets whisper.
No WCAG 1.4.11 problem: the SELECTED state is identified by gold elbows (10.98:1) plus the label
going silver -> white, both well over 3:1. If Rod wants the rest brackets actually visible, the
alternative is `--color-silver` (7.11:1), which is a much louder row.

---

## Version C - UNDERLINE (MauriciAbad)

**Tier: Remixed. Idea origin: Rod (he picked and pasted this pen himself, per the source note) /
Claude (applying a link mechanic to a filter).**
Source: `sources/mauriciabad-underline-link.md`, tier True,
`https://codepen.io/MauriciAbad/pen/QJmwOY`.

**Verified against the live pen 2026-08-23** (via `https://cdpn.io/MauriciAbad/fullpage/QJmwOY`;
codepen.io itself returns 403 to a plain fetch). The saved note is accurate character-for-character,
including the `body { font-size: 3em }` that makes their 0.05em rule 2.4px on their page and 0.70px
on ours. No discrepancy.

Not a pill at all. The filters are words. The rule draws itself in left-to-right under the one you
point at and retracts right-to-left when you leave, so moving along the row feels like one line
travelling. The selected filter keeps its rule drawn and goes gold.

**Verbatim:** the whole `::after` draw-in - `width: 100%`, `transform: scaleX(0)`, `bottom: 0`,
`left: 0`, `background: currentcolor`, `transform-origin: bottom right` flipping to `bottom left`,
`transition: transform 0.25s ease-out`. `background: currentcolor` is the load-bearing half: the
rule takes the label's colour for free, so the selected state only changes `color` and the line
follows.

**Ours / changed:**
- `height: 0.05em` -> `max(1px, 0.05em)`. Their demo body is `font-size: 3em`, so 0.05em is 2.4px
  there; at our 14px it is 0.70px and renders as a grey blur rather than a line. Their formula is
  kept and floored, not replaced. Verified: the built rule computes to 1px.
- `border-radius: 5px` dropped (shape pass, and inert at a sub-pixel height on their page too).
- the underline is on an inner label span rather than the button, so it hugs the text the way theirs
  hugs an inline-block link; on the button it would span the 16px padding as well.

---

## Reuse check (anti-bloat)

- **`list-controls/list-controls.css` `.list-controls__filter` already claims this job and was NOT
  reused.** Three reasons, and the first is the file's own: its header says it is **Slop** because
  its provenance line points at `rework-stephan.html` inside this repo (a circular citation). It
  also uses `--color-muted` (#9aa3bd), the blue the palette law rules out, and `border-radius: 8px`
  against the shape pass. Rebuilding rather than reusing is deliberate here, not an oversight.
- **`tag-badge` (`.d-tag`) and `button-kit` (`.d-meta`)** are the two settled chip shapes, but
  neither has a selected state, which is the entire problem a filter has. They are the reference for
  the proportion question below, not a component to extend.
- Inside this file the row and the pill reset are defined **once** and shared by all three versions;
  only the rest/hover/selected treatment differs.

## States, motion, accessibility

- All three drive `:hover` and `:focus-visible` identically, and no version sets `outline: none`.
- Real `<button>` elements with `aria-pressed`, wrapped in a `role="group"` with a label.
- `prefers-reduced-motion: reduce` kills the three transitions. Every state still CHANGES - the
  bracket arms snap to size, the underline snaps to full width - so nothing that carried meaning is
  lost, only the travel.
- Measured contrast on the panel composite (rgb(19,20,29)): rest label 7.11:1, selected label
  10.98:1, selected tab label on its fill 15.66:1.
- No `backdrop-filter` anywhere. The only solid fill in the set is A's selected tab.

---

## Open questions for Rod

1. **Which of the three, and is a filter even a "pill"?** A says it is a tab that opens into the
   panel, B says it is a bracketed square with no fill, C says it is not a box at all. These are
   three different answers to the shape question you have not ruled on, not three skins.
2. **The proportion question, separately.** Tags on cards are SQUARES (`.d-tag`, padding
   `0.35rem 0.6rem`) and search/meta are RECTANGLES (`.d-meta`, padding `0.7rem 1.5rem`). All three
   versions here use MinionsArt's own 16px horizontal padding, which lands between the two. Should
   filters match one of the settled shapes instead, or stay a third proportion?
3. **A's fill.** You rejected pill-fill on HOVER. Version A does not fill on hover, but it DOES
   fill when selected, because that is MinionsArt's whole mechanism. Is the rejection about hover
   specifically, or about pill fills in general? If the latter, A is out and B or C is the answer.
4. **Layout, yours alone (D25), so raised and not done:** MinionsArt's tab merge only works because
   their filter row sits ABOVE the panel and the selected tab opens downward into it. The approved
   blockout puts the row inside the panel. Moving the row above the panel would restore their effect
   exactly; leaving it inside means A is a translation rather than a transcription.
5. **B's rest brackets are nearly invisible** (1.32:1), faithfully so - theirs are 1.51:1. Keep them
   as a whisper, or brighten the rest line to `--color-silver` and accept a much louder row?
6. **The row is sourced from a dead rule.** `.buttons` exists in MinionsArt's stylesheet but nothing
   on their page uses it; their real row is `.tab`. The blockout you approved transcribed `.buttons`.
   Worth knowing before this gets cited as "their filter row" anywhere downstream.
7. **Five slots is a hard number, and which five is unsettled.** `grid-template-columns` is five
   explicit `auto` tracks; a sixth filter needs a sixth track and the row does not wrap. Counted
   across the 19 posts in `_posts/`: shader 12, unity 6, study 4, unreal 4, compute 3, rigging 2,
   godot 1, tool 1. The demo uses All / Shader / Compute / Rigging / Tool because those are real
   tags, but by volume `unity` (6) and `study` (4) both outrank `tool` (1). Which five the row
   carries is a content decision nobody has made.
