# top-bar - the three-zone chrome bar

Reasoning moved out of `_sass/components/_top-bar.scss` on 2026-08-25 under D45 (comments get
short). Nothing here was reworded; it is the original text, kept because it is the provenance
record. The stylesheet now points at this file.

CSS: `redesign-lab/extracted/components/top-bar/top-bar.css`
Demo: `redesign-lab/extracted/components/top-bar/top-bar.html`
The favicon inside it is its own component; see `favicon.md`.

---

## What it is

> top-bar - CHROME pick: norikura shell, RESTRUCTURED 2026-06-14 (Rod): 3-zone grid
> [favicon + name] | [nav centered] | [slap toggles]. Nav = transparent pill, lit only on
> active/hover (button-kit-primary "lit" look). Favicon styling = favicon component (dep).

The nav's rising-circle fill is dennissnellenberg's `.btn-fill`, the same one the buttons use.

## The height tokens are on :root, not on .top-bar

> DECLARED ON :root, NOT ON .top-bar (2026-08-18). The bar's height is not private to the bar -
> the hero sizes itself as "the viewport minus the bar", and when that was a hard-coded 96px it
> went wrong the moment the bar stacked to two rows. One source of truth, read by both.
> Full bar height including its border = calc(var(--top-bar-height) + var(--top-bar-border) * 2).

`--top-bar-border` exists as a token because the full-bleed mark has to clear it too, or the mark
stops one pixel short of the bar's edge.

## Sticky moved into the component, 2026-08-25

> All four lab pages that carry this bar declared
> `.top-bar{position:sticky;top:0;z-index:60}` in their OWN page style - four identical copies of
> one behaviour, none of them in the component. Ported that way, the live bar scrolled off the top
> because nothing on the live site repeated the incantation.
> It belongs to the bar, not to whatever page hosts it. `sticky` also occupies real layout space,
> which the pages below it depend on - `final-landing` subtracts the bar's height from its hero,
> and About did not, which is why About's hero currently runs past the fold.

## The nav centring fix

> Rod 2026-08-18: "the nav isnt centered". It was not, and the old
> `auto 1fr auto` is exactly why: the nav was centred inside its own middle COLUMN, and that
> column is only centred on the page when the left and right zones are the same width. They are
> not - at 1440 the left zone measures 341px and the toggles 429px, so the middle column ran
> 473..879, centre 676, against a viewport centre of 720. The nav sat 44px left of centre.
> `1fr auto 1fr` makes the outer columns share the free space equally, so the auto middle column
> is centred on the BAR by construction at every width.

> SCALING (Rod 2026-08-18): the 100px gap is by far the widest thing in the bar, so it is the
> first thing that gives. It holds at the baked 100px from 1440 up and then closes at 0.4x the
> rate the viewport narrows, which keeps all three zones on ONE row down to ~1120px.

> the 1fr outer columns now create the breathing room, so the explicit gap only has to guarantee
> a minimum separation. The old 100px is what made the spacing read as lopsided: it was added to
> unequal columns.

## The mark

> UNBUNDLED 2026-08-16 (Rod): the mark is the click target that returns you to the landing pages,
> so it gets its own place in the hierarchy instead of reading as one logo lockup with the name.
> Two levers do that - distance and size contrast - so the gap opens and the mark scales up.
> The name stays (Rod's call); only the pairing is broken.

> FULL-BLEED MARK (Rod 2026-08-16): the favicon fills the bar's ENTIRE vertical height and is
> anchored hard to the bar's left edge - no inset, no padding, no gap before it.
> It does NOT make the bar taller. The bar's height is unchanged; the mark escapes the bar's own
> padding with negative margins, so it spans edge to edge inside a 94px bar rather than sitting
> in the 62px content box. An earlier pass capped the mark at the wordmark's line box to avoid
> growing the bar - that cap was solving the wrong problem.
> Square, per the 2026-08-11 shape pass. Image keeps the favicon component's 62.5% ratio.

> The icon runs larger inside the white box than the favicon component's own 62.5% (Rod
> 2026-08-16), so the mark reads as artwork rather than an icon floating in a field.

The name uses `--font-hand`, the harumaki hero font, at 2.2rem - it was 1.6rem and Rod said it was
too small. The hand font takes no tracking. The nav's `--bloom` and `--tspeed` are baked bench-tune
values and are still tunable from the bench Tune panel.

## The scaling ladder

> THE SCALING LADDER (Rod 2026-08-18). One rule holds at every tier: --top-bar-height is DERIVED
> from the rows plus the block padding, so the full-bleed mark (a square of exactly that height)
> matches the bar edge to edge no matter how the zones are stacked. Rows are fixed, never auto -
> an auto row that grows when the toggles wrap is precisely the bug this fixes.
>
> >=781px   one row     [mark+name | nav]               bar 96px
> <=780px   two rows    [mark+name] / [nav]              bar 108px; block padding halves so the
>                                                        second row costs 12px, not 34
> <=720px   as above, type and inline padding tightened
> <=560px   three rows  [mark+name] / [toggles] / [nav]  bar 124px, mark goes INSET
>
> BREAKPOINT MOVED 1200 -> 780 on 2026-08-22 (Rod: "the top bar has a bit of weird scaling where
> when the tab is scaled down horizontally the top bar moves down a bit").
> It was not scaling weirdly, it was STACKING for a zone that no longer exists. This ladder was
> written while the bar still carried the three toggles - row 1 was literally "name + toggles".
> D20 removed them, and nothing here was updated, so from 1200px down the nav dropped to its own
> row and the bar grew 96 -> 108px, pushing every page's content down 12px.
> 780 is measured, not guessed: with the toggles gone the bar needs
> 264 (mark + name) + 382 (nav) + 64 (inline padding) = 710px on one row, so 780 leaves ~70px of
> slack before the stack is genuinely required.

### The 780 tier - the name stacks on top of the nav

> Rod 2026-08-22: "once it runs out of space to place the name and the nav bar side by side the
> name should just stack on top of the nav".
> Before this the whole left zone spanned both rows, so the name sat vertically centred against
> the full bar while the nav sat bottom-right, with column 2 row 1 empty. That empty cell was
> the toggles' slot, and D20 took the toggles - so the layout was holding a gap for a thing that
> no longer exists, which is what read as the weird spacing.
>
> `display: contents` promotes the mark and the name out of .top-bar__left so each can take its
> own grid cell, with no markup change. The mark keeps column 1 and still spans both rows, so it
> stays full-bleed; the name and the nav stack in column 2, left-aligned to each other.

Two rows already carry the height, so the block padding gives way to 0.5rem at this tier.

### The 560 tier - a centred stack

> THE SMALLEST TIER IS A CENTRED STACK: mark / name / nav, top to bottom.
> Rod 2026-08-22: "minimum size should be nav bar with name above it and fav icon above that,
> both should try to take up all the horizontal space that the nav bar gives."
>
> What was here before was also toggle-era: its own comment reasoned about "the toggles need 356
> of the 358px left on a 390px screen", and it put the MARK AND NAME together in row 1 with the
> toggles in row 2. D20 removed the toggles, so row 2 was reserved for nothing and the name had
> no row of its own. Every tier of this ladder was laid out around a zone that no longer exists.
>
> .top-bar__left is display:contents from the 780 tier up, so the mark and the name are already
> separate grid items and can each take a row without any markup change.
>
> The NAV defines the width: it stretches the full content box and spreads its links, and the
> mark and name centre on that same axis.

## The toggles

> T3-A: ghost the bar toggles at rest; only an ON feature glows (quiets design-report D2).

The toggles themselves are the `slap-toggle` component; these rules only quiet them down for the
bar. Note that D20 removed the toggles from the design, so this block styles a zone the current
layout does not use - it is on the merge cleanup list.
