# Status chip + status terminal

Built 2026-08-23 for the about page. Three versions, three different live sites, all three read
from source on the day rather than from a saved note.

Files: `status-chip.css`, `status-chip.html` (self-contained bench, reservation drawn dashed behind
every specimen), this note.

---

## The measured reservation

Read off `about-blockout.html?v=panels` at viewport **1440** with `getBoundingClientRect()` and
`getComputedStyle`. Nothing below is from a label or a comment.

| slot | measured |
|---|---|
| status chip | **100 x 20** |
| status terminal, outer panel `.p.term` | **675 x 172** |
| terminal content box | 641 x 148 (2px border + 10px/15px padding) |
| terminal row | 641 x **22**, x6 |
| terminal row label cell | 250 x 12 |
| terminal row token box | 40 x 14 |
| terminal caption `.yy` | 641 x 10 (9px), margin-bottom 6 |

**One thing inside that reservation is not a design element.** The 10px caption plus its 6px margin
is the blockout's own greybox annotation, the text "STATUS TERMINAL - 2-col table, 250px first
cells". It labels the slot, it is not content. Strip it and the real reservation is
**675 x 156** (132px of rows + 20 padding + 4 border). Both readings are reported below because
the 16px difference decides whether version C fits.

---

## THE 250 CORRECTION - the blockout misdescribes its own parent

`about-blockout.html` says the terminal is dimden's live device, a *"monospace 2-column table, 250px
first cells, 6 rows at 22px, label .......... TOKEN"*, on `dimden.dev/about.html`.
Read live 2026-08-23 from `https://dimden.dev/` and `https://dimden.dev/css/main.css?9`
(18,447 bytes, the same byte count `sources/section-and-heading-blocks.md` records, so that note is
confirmed rather than assumed):

1. **dimden's about page has no status device at all.** It is seven plain `.box` paragraphs. The
   terminal is on the **home** page, `<div class="box terminal">`.
2. **`#statuses > td { width: 250px }` is the width of each of TWO columns**, not the first cell of a
   6-row table. The real arrangement is 2 columns of 3, not 6 stacked rows.
3. **The token comes first, in literal square brackets, and the label follows**: `[ OK ] dimden.dev`.
   There is no `label .......... TOKEN` and **there are no dotted leaders anywhere on that site**.

The live site wins, so version A follows the live site. The blockout's **675 x 172 geometry still
stands** - Rod approved that by eye and it is a measurement - but its description of where the
device came from and how it is arranged does not survive contact with the source.

---

## Version A - dimden bracket token

**Tier: Remixed. Idea origin: theirs (dimden).**
Source, read live 2026-08-23: `https://dimden.dev/css/main.css?9` + the home page markup.
dimden is **tier S** in `reference-gallery.html` and is the site `about-blockout.html` variant 1 was
drawn from, so the parent is Rod's pick rather than mine.

**Verbatim:** `.box { background-color:#000000a8; border:2px solid #383838; border-radius:4px;
color:white; padding:10px 15px; margin:5px }` - `#statuses > td { width:250px }` - the
`[<span class="status-ok"> OK </span>] label` construction with the brackets as literal text outside
the coloured span - the header line `Systems status: OK` with its token deliberately **un**bracketed
while the table rows are bracketed.

**Ours:** the six status facts; the 22px row line-height (that is the blockout's measured row, not
dimden's - they use bare `<br>` at the browser's natural leading); the token colour assignment.

**Could not transfer:**
- `.terminal { background-color: black }`. On their own page `.terminal` loads after `.box`
  (line 660 vs 167) and wins, so the panel renders **opaque black**. We have a live three.js scene
  behind this. Kept `.box`'s translucency, dropped `.terminal`'s fill.
- `.status-ok #36fda0` (green) and `.status-fail #ff5858` (red). Both fail the palette law.
- `text-shadow: 0 0 20px` on both states. That is a glow, and the de-glow principle strips it.
- `border-radius: 4px` -> 0, shape pass.
- `"Perfect DOS VGA 437 Win"`, a bitmap face we do not have or license.
- **On the chip only:** their `padding: 10px 15px`. Ten pixels of vertical padding cannot exist
  inside a 20px box. The chip keeps their 2px border and loses their padding.

---

## Version B - Klubnika registry ledger

**Tier: Remixed. Idea origin: theirs (Mike Klubnika).**
Source, read live 2026-08-23: `https://mikeklubnika.com/static/style/main.css` (8,021 bytes) + the
home page registry. Klubnika is **tier C+** in the gallery with Rod's own note, and
`about-blockout.html` variant 3 is his site.

**Verbatim:** `.ue { display:flex; flex-direction:row; justify-content:space-between;
margin-top:5px; margin-bottom:5px; font-family:bank; font-size:12px }` -
`.uebg { background-color: rgba(235,235,235,0.0333) }` - `.entrytext { font-family: monospace }` -
and the row shape `[30 Jul 2026] <a class="entrytext">Machine Party</a>` on the left against
`24 days ago` on the right.

**Ours:** the six status facts; dimming the right-hand value.

**Could not transfer:**
- `font-family: bank`, a face on their server. Their own `.entrytext` is already `monospace`, so
  half the row was mono before we touched it.
- **A panel.** Klubnika's registry has no container of its own; it sits inside their 58em column
  whose two hairlines belong to the page, not to the widget. So this version has no chrome and its
  measured box is the row stack alone.
- Their two faces per row. With one mono for both halves that distinction is gone, so the value is
  dimmed instead.

**Why it is worth Rod's time:** it is the only one of the three with **no frame and no fill**. The
only paint is a 3.33% white zebra. On the page carrying the full water and dock scene, version A
puts a 675 x 172 panel over the water and this puts nothing.

---

## Version C - terminal.shop editor lines

**Tier: Remixed. Idea origin: theirs (terminal.shop).**
Source, read live 2026-08-23: `https://www.terminal.shop/_astro/about.CSjCn8a_.css` (30,551 bytes,
a Tailwind build) + the home page markup.
**Stated plainly: terminal.shop is catalogued in `reference-gallery.html` but UNTIERED.** It is the
one parent here Rod has not scored. His note on it is *"Peak engineered UI, the merodev/dimden
'screams internet' vein taken to its logical end"*, which is why it is a candidate at all.

**Verbatim:** `.editor { counter-reset: editor-counter }` / `.line { counter-increment:
editor-counter }` / `.line:before { content: counter(editor-counter); width: 2rem; flex-shrink: 0;
align-self: flex-start }` - `@keyframes blink { 0%,25%,to{opacity:1} 50%,75%{opacity:0} }` with
`animation: blink 1.45s infinite step-start` - `#ff5e00` orange - `line-height: 2.5rem` -
`border-left-width: 2px` on a transparent border that goes orange on the active line - the caret's
`w-[10px] h-[21px]`.

**Ours:** the four status facts; the warm recolour; the reduced-motion rule.

**Could not transfer:**
- **Their greys are cool.** `#e5f2ff78`, `#f0f7ff9e`, `#e1f0fe24` are blue-whites. Palette law puts
  blue in the sky only, so they become the warm text tokens and a warm 6% tint. This is the biggest
  single change to their look.
- **`line-height: 2.5rem` at chip scale.** Forty pixels of leading is the thing that makes this read
  as a code editor and a 20px chip cannot hold it. The chip drops to 20px leading, which is why the
  chip is the weakest half of this version.
- `px-4 sm:px-[22px]` keeps 22px, their >=640px value. A 675px slot never renders at their small
  breakpoint.
- Their `#ff5e00` -> our `--color-glow #ff6a00`. Twelve units of red apart, so this one costs
  nothing.
- **They ship no reduced-motion rule for the blink.** Ours has to. The caret stays visible with the
  animation switched off rather than being hidden, because it marks where the line ends.

**Why it is worth Rod's time:** A and B both answer *"a status is a list of label/value pairs"*.
This answers *"a status is a file you are looking at"* - numbered lines, an active-line marker, a
caret on the last one. It is the only one where the device implies the page is live rather than
printed.

---

## Fit, measured

Every number below was read in headless Chrome at viewport 1440 off `status-chip.html`, which prints
the same table into the page so it can be re-checked without me.

| specimen | reservation | renders | fit |
|---|---|---|---|
| chip A | 100 x 20 | **100 x 20** | exact |
| chip B | 100 x 20 | **100 x 20** | exact |
| chip C | 100 x 20 | **100 x 20** | exact |
| terminal A, dimden's 2 x 3 | 675 x 172 | **675 x 134** | width exact, **38px under** |
| terminal A, stacked 6 x 1 | 675 x 172 | **675 x 200** | width exact, **28px over** |
| terminal B, 6 rows | 675 x 172 | **675 x 109** | width exact, **63px under** |
| terminal C, 4 lines | 675 x 172 | **675 x 160** | width exact, **12px under** |
| terminal C, 6 lines | 675 x 172 | **675 x 240** | width exact, **68px over** |

Zero horizontal or vertical content overflow in every specimen (`scrollWidth - clientWidth` and
`scrollHeight - clientHeight` are 0 throughout), and the demo page's own `scrollWidth` stays at 1440.

**Against the annotation-stripped 675 x 156** (see the reservation section): A = 22 under,
A stacked = 44 over, B = 47 under, C at 4 lines = **4 over**, C at 6 lines = 84 over.

**Nothing here overflows its box.** Three of the five underfill, and the reason is the same in each
case: the reservation was drawn for six 22px rows stacked in one column, and none of the three real
parents arranges six items that way.
- **A** puts them in two columns of three, so it needs half the height.
- **B**'s rows are 12px on 5px margins, so six of them are 109 tall; their registry is a 19-entry
  list, i.e. a device built for far more rows than we have facts for. Filling 172 at their rhythm
  needs **9 rows**, so three more real status facts.
- **C**'s 2.5rem leading means four lines fit and six do not. Six needs the reservation to go
  172 -> 240, or their leading to drop, which is the one thing that makes it read as an editor.

**No number here was invented or rounded to look tidy.** Where a value is derived rather than
measured it says so: the only derived number in the build is version C's chip caret, which holds
their caret's *ratio* to the line box (21/40 tall, 10/21 wide) rather than their pixels, because a
21px caret does not fit a 20px chip.

---

## The T3-E font floor check, as asked

The ledger's floor: T3-E, `analysis/2026-06-12-remediation-plan.md:205` - *"Floor UI text at
~11-12px"*, recorded DONE at line 225 with `card-meta 11.2px, back-read .68rem`. The lowest value
actually shipped under it is **0.68rem = 10.88px** (`extracted/components/merged-card/merged-card.css:310`).

| version | chip type | floor | verdict |
|---|---|---|---|
| A | 11px mono | ~11px | **at the floor**, not under it |
| B | **12px** mono (klubnika's own `.ue` size, verbatim) | ~11px | **clears it** |
| C | 11px mono | ~11px | **at the floor** |

Character budget at 100px wide, measured rather than estimated (the demo's fallback mono has a
6.048px advance at 11px and 6.598px at 12px; IBM Plex Mono, if the webfont is loaded, is wider at
0.6em, so both are given):

| version | inner width | budget, fallback mono | budget, IBM Plex Mono | content used |
|---|---|---|---|---|
| A | 96 (2px border x2, no padding) | 15 chars | 14 chars | `[ OK ] ONLINE` = 13 |
| B | 100 (no border, no padding) | 15 chars | 13 chars | `[ AVAILABLE ]` = 13 |
| C | 77 (2px rule, 6px padding x2, 5px caret, 4px gap) | 12 chars | 11 chars | `AVAILABLE` = 9 |

So the chip is legible at the floor, but **the budget is the real constraint, not the size**:
`[ OK ] AVAILABLE` is 16 characters and does **not** fit version A at 11px, which is why A says
ONLINE. Version B fits `[ AVAILABLE ]` because it spends nothing on chrome. Version B is the only
one with headroom on both axes.

---

## Reuse check

Nothing in `extracted/components/` does this job or part of it. `tag-badge/` is the closest thing
and is a different job: it is the live site's `.post-tag` carried forward for **tags**, sized in
`em` off its host with `min-width: 2rem` and `line-height: 1.3rem`, so it has no fixed box and no
state token. Reusing it would have meant overriding its width, its height, its font size and its
colour, which is rebuilding it with extra steps. `cursor-coords/` is a JS HUD ticker with no CSS.
Nothing is duplicated and no existing component was rebuilt.

The three versions share no base class **on purpose**: they come from three different sites, and a
shared base would be a fourth design nobody sourced.

---

## Open questions for Rod

1. **The status colours.** dimden's states are green `#36fda0` for OK and red `#ff5858` for fail.
   The palette law rules out both. I have used gold for OK, silver for neutral and glow-orange for
   attention, but **gold against orange is a much weaker separation than green against red**, and
   the whole point of a status token is that you cannot confuse two states. `decisions.css` already
   carries an explicit carve-out from the palette law for exactly this reason (syntax colours,
   because "a warm-only set cannot provide four mutually distinguishable hues"). **Does the status
   token get the same carve-out, or does it live inside the warm ramp and accept the weaker
   separation?** I have not assumed either way.

2. **The height gap, and which reservation is real.** The 172 includes 16px of greybox annotation
   that will not exist in the built page. Should the terminal's reservation be corrected to
   **675 x 156**, and should the blockout's `.yy` caption be excluded from every slot measurement
   the same way? That question is bigger than this component.

3. **How many status facts are there actually?** The reservation reserves six rows. I used six real
   ones from the repo: available for work, Compute Grass in progress, Sprite Baker 9000 as the
   latest post, Unity / HLSL, 19 posts, 14 / 29 achievements. Version B wants **nine** at klubnika's
   rhythm and version C wants **four** at terminal.shop's. If the real list is a different length
   the fit answers move.

4. **terminal.shop is untiered.** It is the only parent in this set Rod has not scored. If it is not
   to his taste, version C should be dropped rather than tuned, and there is no fourth candidate
   waiting behind it that I would call honest.

5. **The blockout's caption should be corrected.** It currently tells the next reader that dimden's
   about page has a 6-row dotted-leader table with 250px first cells. None of that is true of the
   live site. I have not edited `about-blockout.html` (D22, and it is a blockout), so the wrong
   description is still sitting in it.
