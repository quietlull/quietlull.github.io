# entry-row - the ramblings entry row

Built 2026-08-23. Bench only, nothing approved.
Files: `entry-row.css`, `entry-row.html`, this note.

---

## READ THIS FIRST: the reservation I was handed is a different variant's

I was given the reservation **blurb 1054 x 45, title 838 x 30, x8 rows**, and told the source was
the **Eve hairline** variant, picked by D15 for one property: the left edge is identical on all 8
rows.

Those two things do not go together. I measured both variants of `ramblings-blockout.html` in a
browser at viewport 1440 (clientWidth 1425) rather than reasoning about it:

| slot | variant 1, dimden `?v=rulelog` | variant 3, **Eve** `?v=hairline` | handed to me |
|---|---|---|---|
| entry title | **840.09 x 30** | 574.19 x 28 (media row) / 752.4 (text row) | **838 x 30** |
| entry blurb | **1056.89 x 45** | 626.39 x 48 (media) / 820.8 (text) | **1054 x 45** |
| search | **1355 x 40** | 360 x 40 | **1351 x 40** |
| empty state | **1355 x 60** | 1140 x 60 | **1351 x 60** |
| page description | **520 x 44** | 560 x 20 | **520 x 44** |
| page title | **380 x 100** centred | 220 x 26 | **380 x 100** centred |

**All six handed numbers are dimden's. None of them is Eve's.**

The small deltas are only my viewport: dimden's column is `clientWidth - 70` (`.page{padding:35px}`,
`ramblings-blockout.html:40`), so it is 1355 at my clientWidth 1425 and **1351 at clientWidth 1421**,
which is the width the contract was taken at. At 1351: 62% = 837.6 -> **838**, 78% = 1053.8 ->
**1054**. Exact, both of them, from `ramblings-blockout.html:118` and `:120`.

**Why it happened:** the file opens on `body class="rulelog"` and its own script falls back to
`show(m ? m[1] : 'rulelog')` (`ramblings-blockout.html:89, :252`). A measuring pass that loads
`ramblings-blockout.html` with no `?v=` measures **dimden**. The RAMBLINGS block of
`analysis/2026-08-23-blockout-contract.md:42-51` is that page.

Also worth noting: dimden's variant has **no thumbnails at all** (`ramblings-blockout.html:203`:
"NO THUMBNAILS"). So the property the brief cites for choosing this layout - identical left edge
across illustrated and text-only rows - cannot be a property of the variant the numbers came from.

**I built to Eve.** D15 (`docs/DECISIONS.md:328`) picked Eve, `final-ramblings.html:21-22` names Eve
as its chosen blockout, and the left-edge property is Eve's. I then measured the fit against the
handed box anyway, below, so the choice costs nothing.

---

## The source

**Eve OFFICIAL, https://eveofficial.com/news/** - tier **B** in Rod's own gallery
(`reference-gallery.html:617`, "Good spacing").

CSS read from `https://eveofficial.com/css/style.css?ver=260816230345` (36,914 bytes, 1,654 lines).
The read is recorded verbatim in `analysis/subpage-specs/extract-5.md:42`, with the fetch method
(curl, desktop UA, sheet read end to end) at `extract-5.md:92`. The root type rule is at
`extract-3.md:64`.

**Honest gap:** I did **not** re-fetch eveofficial.com this session - the fetch tool was
rate-limited. Everything here is copied from that saved read, which is a record of a live fetch and
not a repo-internal claim, but it is one step removed. **Re-fetch before locking anything in, and
the live site wins.**

Rules taken verbatim:

```
.wf { margin:0 auto; width:1140px; position:relative }
ul:first-of-type { border-top:1px solid #2c2c2c }
li { border-bottom:1px solid #2c2c2c; padding:30px 0 }
li a { display:block }
.date { margin:0 0 15px; display:block; line-height:1 }
.date span { margin:0 8px 0 0; color:#a40000 }
.ttl { font-size:20px; line-height:28px; background-image:linear-gradient(#fff,#fff);
       background-position:0% 100%; background-repeat:no-repeat; background-size:0% 1px }
       -> hover background-size:100% 1px, transition: all .3s ease-out
li.tn a  { padding-right:270px; min-height:180px; position:relative }
li.tn .img { width:240px; height:180px; position:absolute; top:0; right:0 }  hover opacity .6
html { font: normal 16px/26px "Yu Mincho", ... }
```

### Reuse rather than rebuild

The tag chip in version B is **not built here**. It is
`extracted/components/tag-badge/tag-badge.css` - the live site's own `.post-tag`, carried forward
and squared, finalized by Rod 2026-08-21. `entry-row.css` adds zero chip styling; the demo links
both sheets. Nothing else in the components folder does any part of this row.

---

## Version A - Eve verbatim. The whole row is one link, the tag is a WORD

- **Tier: Remixed.** Idea-origin: **theirs**.
- **Verbatim:** the 1140 column, the top hairline plus per-row bottom hairline, `padding:30px 0`,
  the whole row as one block-level link, `.date{margin:0 0 15px;line-height:1}`, the category word
  inline before the date at `margin:0 8px 0 0`, the title at `20px/28px`, the 0% -> 100%
  background-size underline and its `.3s ease-out`, and the entire thumbnail arrangement
  (`padding-right:270px`, `min-height:180px`, a 240x180 image at `top:0;right:0`, hover `opacity:.6`).
- **Ours:** every colour token (their `#2c2c2c` hairline and `#111` ground do not survive a live
  three.js background); `transition:all` narrowed to the two properties that move; `:focus-visible`
  sharing the hover state, which Eve does not have at all and WCAG 2.4.7 requires on a row that is
  a link; the blurb (see below).
- **Could not transfer:**
  - **`#a40000` on the category word.** Palette law bans red. Taken to `--color-gold`. The
    mechanism is 100% theirs; only the hue is ours.
  - **Their `#fff` underline** taken to `--color-gold`, because gold is this site's link language
    everywhere else (`decisions.css` `.prose a`). Deliberate, flagged, easy to revert.
  - **The whole responsive story.** `body{min-width:1140px}` plus
    `<meta name="viewport" content="width=1280">` - Eve is desktop-only by declaration and has no
    responsive column. The one breakpoint in the CSS is carried from `final-ramblings.html:130-131`,
    not from Eve, and it is an open question rather than a spec.
  - **`.ttl`'s display value is not in the read.** `display:inline-block` is an **inference**, not
    a measurement: a 0% -> 100% background-size underline only reads as a text underline if the box
    hugs the text, and on their page it visibly does.
- **The blurb is a GRAFT and is marked as one.** Eve's row is date + title, no blurb
  (`analysis/subpage-specs/synth-ramblings.md:23`: "the blurb line is an addition"). Its type comes
  from `decisions.css:195-200` (weight 300, line-height 1.3, letter-spacing -0.18px,
  `--color-text`), which is the settled house body rule; its 15px offset reuses Eve's own `.date`
  rhythm, which is a reuse and not a read.

## Version B - the same row with FILTERABLE tags

- **Tier: Remixed** (Eve) plus **reused** (tag-badge). Idea-origin: **theirs** for the row,
  **Rod** for the chip. Offering the trade is mine; neither half is.
- **This is not a skin change, it is a trade.** Eve's row is one link (`li a{display:block}`). A
  chip that filters must be a link too, and an anchor inside an anchor is invalid HTML and a
  keyboard trap. So B gives up the whole-row hit target to buy filterable tags. That is the actual
  difference between A and B; the chips are the visible half of it.
  `synth-ramblings.md` openQuestion 2 asks Rod this exact question and it is still open.
- **Verbatim:** the entire row from version A, unchanged. Even the strip's 8px gap is Eve's
  `.date span { margin:0 8px 0 0 }`.
- **Ours:** the flex strip, and `:focus-within` on `.er-ttl` (the anchor is nested inside the
  heading here, so `:focus-visible` on the anchor cannot reach the heading that carries the
  underline).
- **Side effect worth seeing before choosing:** in A the **date** is the left edge of the row. In B
  the chips are, and the date sits after them (measured: date left 341.42 in B against 142.5 in A).
  The row's left edge is unchanged; the date's is not. The blockout draws it B's way
  (`ramblings-blockout.html:157`: three tags, then the date).

## Version C - Eve's REAL row: date line, title, nothing else

- **Tier: True.** Idea-origin: **theirs**.
- **Zero new CSS.** It is version A with the `<p class="er-blurb">` deleted, so nothing is written
  for it on purpose.
- **Verbatim:** all of it. This is the only version in the file with nothing grafted onto it, and
  its measured text row is **120px** tall, which is Eve's own row height exactly
  (30 + 16 + 15 + 28 + 30 + 1).
- **Why it is here rather than padding:** the blurb is the contested field for this whole page
  type. Three of the four ramblings sources - dimden, Klubnika and Eve - carry no blurb; their row
  is date + title (`extract-5.md:92`). `synth-ramblings.md` openQuestion 3 puts it to Rod directly:
  is the blurb load-bearing on ramblings, or is it a habit carried over from the projects grid? C
  is what the source actually supports.

---

## FIT - measured, not asserted

Measured with `getBoundingClientRect()` in a browser at viewport **1440** (clientWidth 1425), Eve's
1140 column. The demo prints these live under each version, so the page cannot claim a fit it does
not have.

| slot | measured | reserved (handed) | result |
|---|---|---|---|
| entry title | 28.0 tall, cap 752.4 wide | 838 x 30 | **fits** - 2.0 tall spare, 85.6 wide spare |
| entry blurb | 41.59 tall, 820.8 wide | 1054 x 45 | **fits** - 3.41 tall spare, 233.2 wide spare |

Against the Eve blockout's own reservation (`ramblings-blockout.html:158-159`, measured 752.4 x 28
and 820.8 x 48): title **exact** on both axes, blurb exact on width and **6.41px under on height**
(41.59 against 48), because the blurb takes `decisions.css`'s settled 1.3 line-height rather than
the blockout's 24px. Nothing overflows anywhere.

**The one place a number can exceed its box.** At the 1351-wide dimden field the title's cap is
66% x 1351 = **891.66**, which is **53.66px over the 838 reservation**. It is a cap, not a width:
Rod's longest real title, "Decompiling the Shaders of a 2004 Racing Game", measures **448.98px** at
20px, so nothing actually reaches it. If it ever matters, `--er-ttl-w` and `--er-blurb-w` re-point
it in one line each.

**Row heights,** none of which was reserved by the contract, recorded so the page can be planned:

| version | text-only row | with-thumbnail row |
|---|---|---|
| A | 176.59 | 241 |
| B | 183.39 (the chip strip is 6.8 taller than the date line) | 241 |
| C | 120 | 241 |

**The left edge, which is the whole reason for this layout.** Every `.er-date`, `.er-ttl`,
`.er-blurb` and `.er-strip` in all three versions, media rows and text rows alike, measures to
**one single left value** (142.5 at the 1140 column, 37 at 1351). Verified, not assumed.

**One reservation IS overrun, and it is version B's tag strip.** The blockout reserves the
tag/date strip at **16px** (`ramblings-blockout.html:157`). Version A's date line measures exactly
**16.0**. Version B's strip measures **22.8** - **over by 6.8px** - because `tag-badge` is
`line-height:1.3rem` (20.8px) plus its own 1px border top and bottom. That is the reused
component's own size, not a choice made here, so shrinking it would mean forking the chip.

---

## Open questions for Rod

1. **Which contract does ramblings actually run on?** The measured reservation is dimden's; D15
   picked Eve. Nothing downstream of this page can be "matched to the blockout" until that is
   settled, exactly like the 711-vs-767 problem in
   `analysis/2026-08-23-blockout-contract.md:78-87`. The cheapest fix is re-measuring
   `ramblings-blockout.html?v=hairline` and correcting the contract's RAMBLINGS block; nothing
   built here changes either way.
2. **Thumbnail height: 180 or 135?** Eve's live CSS is **240 x 180** with `min-height:180px`
   (`extract-5.md:42`). The blockout draws **240 x 135** (`ramblings-blockout.html:160`), and
   `final-ramblings.html:115` reserves 135 too. I built the source's 180, which makes a picture row
   **241px** tall against a 176.59px text row. At 135 the picture row would be 196. Their vertical
   positions do agree, incidentally: Eve's `top:0` is relative to the anchor inside the 30px
   padding, which is the blockout's `top:30px` relative to the row - same pixel.
3. **Is the tag a LABEL or a FILTER?** Version A or version B. It is not a look, it is whether the
   row stays one click target.
4. **Does the blurb stay?** Version C is the row Eve actually ships. If the blurb goes, the row
   drops from 176.59 to 120 and the page holds roughly half again as many entries per screen.
5. **The gold underline.** Eve's is white. I took it to gold to match the site's link language.
   One-line revert if that reads too loud on a row that already has a gold category word.
6. **Mobile.** Eve has no responsive rule of any kind. The single breakpoint here is carried from
   `final-ramblings.html:130-131`, so it is ours, not sourced, and nobody has looked at it.
7. **The thumbnail is a flat labelled placeholder** in the demo - there is no artwork in this
   folder. Eve's is a 240x180 photograph.

## Provenance ledger row

| element | tier | idea origin | source |
|---|---|---|---|
| entry row A (Eve verbatim) | Remixed | theirs | eveofficial.com/news/, CSS read at `analysis/subpage-specs/extract-5.md:42` |
| entry row B (filterable tags) | Remixed + reuse | theirs / ROD | as above, plus `extracted/components/tag-badge/tag-badge.css` (Rod's own `.post-tag`) |
| entry row C (no blurb) | True | theirs | as above; this is their row unmodified |

---

# Appendix: reasoning moved out of the stylesheet, 2026-08-25

Moved from `_sass/components/_entry-row.scss` under D45 (comments get short). Original wording,
kept because it is the provenance record. The stylesheet points here.

## Header

> entry-row - ONE row of the ramblings index. Built 2026-08-23.
>
> SOURCE: Eve OFFICIAL, https://eveofficial.com/news/
> CSS read from https://eveofficial.com/css/style.css?ver=260816230345 (36,914 bytes, 1,654
> lines). The read is recorded verbatim in redesign-lab/analysis/subpage-specs/extract-5.md:42,
> with the fetch method (curl, desktop UA, sheet read end to end) documented at extract-5.md:92.
> The site's root type rule is at extract-3.md:64.
>
> HONEST GAP, stated first because it changes how much weight these numbers carry:
> I did NOT re-fetch eveofficial.com in this session (the fetch tool was rate-limited). Every
> declaration below is copied from that saved read, which is itself a record of a live fetch, not
> a repo-internal claim. If anything here matters, re-fetch and THE LIVE SITE WINS.
>
> WHY THIS SOURCE: D15 (docs/DECISIONS.md:328) - "RAMBLINGS -> Eve OFFICIAL, the hairline
> variant", chosen for exactly one property: a row with a picture and a row without keep the
> SAME LEFT EDGE. That property is preserved in all three versions below and is the one thing
> that must not be traded away.

### Eve's rules, verbatim (extract-5.md:42)

>   .wf { margin:0 auto; width:1140px; position:relative }
>   ul:first-of-type { border-top:1px solid #2c2c2c }
>   li { border-bottom:1px solid #2c2c2c; padding:30px 0 }
>   li a { display:block }
>   .date { margin:0 0 15px; display:block; line-height:1 }
>   .date span { margin:0 8px 0 0; color:#a40000 }
>   .ttl { font-size:20px; line-height:28px;
>          background-image:linear-gradient(#fff,#fff);
>          background-position:0% 100%; background-repeat:no-repeat; background-size:0% 1px }
>          -> hover background-size:100% 1px, transition: all .3s ease-out
>   li.tn a { padding-right:270px; min-height:180px; position:relative }
>   li.tn .img { width:240px; height:180px; position:absolute; top:0; right:0 }  hover opacity .6
> and the root, from extract-3.md:64:
>   html { font: normal 16px/26px "Yu Mincho", ... }

### What is ours, and why (no silent swaps)

> 1. #a40000 on the category word CANNOT TRANSFER. Palette law bans red. Taken to --color-gold.
>    The mechanism (a coloured word inline before the date, 8px apart) is 100% theirs.
> 2. #2c2c2c hairlines -> --color-line-soft. Their hairline sits on a flat #111 page; ours sits
>    over a live three.js scene, so it is expressed as a token, not a hex.
> 3. Their underline gradient is linear-gradient(#fff,#fff). Taken to --color-gold, because gold
>    is this site's link language everywhere else (decisions.css .prose a). Flagged, not hidden.
> 4. `transition: all .3s ease-out` narrowed to the two properties that actually move. `all` on
>    a row that also carries a hover is a hazard, not a style.
> 5. `.ttl` display is NOT in the read. `display:inline-block` here is INFERRED, not measured:
>    a 0% -> 100% background-size underline only reads as a text underline if the box hugs the
>    text, and it visibly does on their page. Marked inference, per house rule.
> 6. THE BLURB IS A GRAFT. Eve's row is date + title, no blurb at all
>    (synth-ramblings.md:23: "the blurb line is an addition"). Its type comes from
>    decisions.css:195-200 (weight 300, line-height 1.3, letter-spacing -0.18px, --color-text),
>    which is the settled house body rule, and its 15px offset reuses Eve's own .date rhythm.
>    Version C below is the row WITHOUT it, which is the only un-grafted row in the set.
> 7. Focus is OURS and is a requirement, not a taste call: Eve ships no focus style and the row
>    is a link (WCAG 2.4.7). :focus-visible shares the hover appearance, which costs nothing.

### Not taken

> Eve's fixed shell: body{min-width:1140px} plus <meta name="viewport" content="width=1280">.
> The site is desktop-only by declaration and has NO responsive column, so any mobile behaviour
> would be invented. The one breakpoint below is the blockout's own (ramblings-blockout is
> silent; final-ramblings.html:130-131 drops the 270px reserve and stacks the thumb at 820px),
> carried across rather than re-invented, and it is still an OPEN QUESTION.

## The row and the left edge

> `li a { display:block }`. .er-body is the same box for version B, where the row is not one
> link. Both are the positioning context for the thumbnail, exactly as `li.tn a` is on Eve.

> THE LEFT EDGE. This is the whole reason D15 picked this variant: the picture is taken out of
> flow and paid for with RIGHT padding, so nothing on the left ever moves.

> 365, NOT the 270 in Rod's paste. The tuner's own readout flags this red and here is why: the
> thumbnail went to 335px wide but the reserve stayed at 270, so the text would have run 65px
> UNDER the picture. 365 keeps the 30px gutter his own pre-tune values had (270 - 240). The dial
> for this exists; he moved the width and not the reserve.

## The date line

> `.date { margin:0 0 15px; display:block; line-height:1 }`.
> font-size is NOT declared on Eve's .date, so it inherits their root 16px (extract-3.md:64).
> line-height:1 therefore makes the strip exactly 16px tall - which is also exactly what the
> blockout reserves for it (ramblings-blockout.html:157). Sourced rule, matching reservation,
> nothing invented. It is written as 1rem here rather than left to inherit so the strip cannot
> drift if a host page moves its root size.

> `.date span { margin:0 8px 0 0; color:#a40000 }` - the category word, inline, BEFORE the date.
> This is the one row in the whole ramblings reference set where the tag is native to the source
> rather than grafted on (synth-ramblings.md:22). Red is the only thing that could not come.

## The title, and the three declarations deleted from it

> LINE-HEIGHT ONLY, AND THE SIZE DELIBERATELY LEFT ALONE. Rod's tune came back with
> `font-size: 24.5px; line-height: 1.5` and the tuner asked him to pick a destination for it.
> Taking neither, for a measured reason: **24.5 against the ladder's 24 is half a pixel**, and
> both destinations cost real things - carving the size back out of `entry-row.css` undoes the
> three deletions that put these titles ON the ladder today, and moving the rung moves every h3
> on every final page. Half a pixel is not worth either.
> The line-height IS worth taking and costs nothing: the ladder's h3 declares none, so these
> were inheriting `body { line-height: 1.7 }` - a 40.8px line box on 24px type. 1.5 is his
> number and it restates nothing the ladder owns.

> SIZE, WEIGHT AND COLOUR DELETED 2026-08-24 so the ladder reaches these. Rod, asked whether
> the entry titles should follow the ladder or carve out: "should follow the ladder at 38.4".
> They were 20px / 400 / #f5f3ef - a size on NO rung of the ladder (which is 61.44 / 38.4 / 24
> / 15) and set outside `decisions.css` entirely, which is why this page read as not following
> the ladder while every other page moved. These are `<h2>` elements, so deleting the three
> declarations lets the bare `h2` rule through at 38.4 / 300 / gold.
> `line-height: 28px` goes with them: it was Eve's 20/28 pair and would crush a 38.4px line.

## The underline moved to the anchor, 2026-08-24

> Rod: "the line only appears on the bottom of the text it should underline both the top and
> bottom text if split into two lines if possible."
>
> IT WAS A COPY ERROR, NOT A REMIX, and that is why it is worth fixing rather than deciding.
> Eve's own sheet was re-fetched (`eveofficial.com/css/style.css?ver=260825084214`, rule at
> 765-773) and their `.ttl` is a `<span>` that declares NO `display`, so it is `display: inline`
> and their bar paints PER LINE FRAGMENT. Measured on their live page with a forced wrap: a
> 2-line title gets two bars at 281px and 229px, a 3-line title gets three. Our
> `display: inline-block` - which note 5 in this file's own header flags as INFERRED - painted
> ONE bar under the whole box.
>
> WHY THE ANCHOR AND NOT THE HEADING. Their arrangement is a block anchor wrapping an inline
> span; ours is an inline-block h2 wrapping an inline anchor. Putting the gradient on the ANCHOR
> reproduces their structure exactly. Making the h2 inline instead would also work, but it would
> silently drop `max-width: 66%` (which does not apply to a non-replaced inline) and would remove
> a wrap in the 1030-850 band, moving the page 40px. This route moves NO layout: page height is
> identical at 1440, 1280, 1024, 950 and 475.
>
> WORTH KNOWING: at desktop widths nothing wraps today, so this is a narrow-window fix now and a
> permanent one the moment a title longer than ~625px lands.

> The first two are version A, where the whole row is the link. The last two are version B, where
> the anchor is INSIDE the heading - :focus-within is what carries the keyboard state across that
> nesting, and it is the reason the underline is driven off .er-ttl rather than off the anchor.

> Version B only, which is what `final-ramblings.html` uses. `:focus-within` is still what carries
> the keyboard state, it just lands on the anchor now.
> FLAGGED, NOT IMPROVISED: version A (whole row is the link, no `.er-link`) loses its underline by
> this change. Giving it one back is its own decision and no page uses it today.

## The blurb

> A GRAFT. Type from decisions.css:195-200; the 15px is Eve's own .date rhythm
> reused, which is a reuse and not a read. Width 72% is the blockout's reservation
> (ramblings-blockout.html:159), not a declaration on Eve - their title and body are plain
> blocks with no width rule at all. Both fractions are named so they can be re-pointed in one
> line if the column changes.

## The three versions

> VERSION A - EVE VERBATIM. The whole row is one link and the tag is a WORD.
> Tier: Remixed. Idea-origin: theirs.
> No extra CSS. Everything above IS version A - that is the point of it.

> VERSION B - THE SAME ROW WITH FILTERABLE TAGS.
> Tier: Remixed (Eve) + REUSED (tag-badge). Idea-origin: theirs (Eve geometry) / ROD (the chip).
>
> THIS IS NOT A SKIN CHANGE, it is a trade, and the trade is the reason the version exists:
> Eve's row is ONE link (`li a { display:block }`). A chip that FILTERS must be a link too, and
> an anchor inside an anchor is invalid HTML and a keyboard trap. So B gives up the whole-row
> hit target to buy filterable tags. synth-ramblings.md openQuestion 2 asks Rod this exact
> question ("is the tag a FILTER or a LABEL?") and it is still open.
>
> THE CHIP IS NOT REBUILT. It is extracted/components/tag-badge/tag-badge.css, which Rod
> finalized 2026-08-21 and squared. This file adds NO chip styling - link both stylesheets.
> The 8px gap is Eve's own `.date span { margin:0 8px 0 0 }`, so even the strip spacing is hers.

> VERSION C - EVE'S REAL ROW. Date line, title, nothing else.
> Tier: True. Idea-origin: theirs.
>
> ZERO CSS. It is version A with the <p class="er-blurb"> deleted, and that is the whole
> version, so nothing is written here on purpose.
>
> It exists because the blurb is the contested field in this entire page type. Three of the four
> ramblings sources - dimden, Klubnika and Eve - carry NO blurb; their row is date + title
> (extract-5.md:92). synth-ramblings.md openQuestion 3 puts it to Rod directly: is the blurb
> load-bearing on ramblings, or is it a habit carried over from the projects grid? C is what the
> source actually supports, and it is the only version in this file with nothing grafted onto it.

## Rod picked B, 2026-08-23

> "I like B for entry row for the blogs/ramblings."
> CARRIED FORWARD HONESTLY: B reuses `tag-badge`, and the reused component's own
> `line-height: 1.3rem` makes the tag strip 22.8px against a 16px reservation - 6.8px over. That
> is the PARENT's size, not a choice made here, and it was reported rather than hidden when B was
> built. It is worth fixing at tag-badge rather than patching it here, so the two places that use
> the badge do not drift apart.
> The property D15 picked this layout for is intact: the left edge is identical on all 8 rows.

The one breakpoint at 820px is carried from `final-ramblings.html:130-131` rather than invented.
Eve has no responsive rule of any kind, so it is OURS and is an open question, not a spec.
