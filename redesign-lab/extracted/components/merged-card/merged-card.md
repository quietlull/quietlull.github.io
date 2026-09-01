# merged-card - the project card, flip-tile look with merged-card function

Reasoning moved out of `_sass/components/_merged-card.scss` on 2026-08-25 under D45 (comments get
short). Nothing here was reworded; it is the original text, kept because it is the provenance
record. The stylesheet now points at this file.

CSS: `redesign-lab/extracted/components/merged-card/merged-card.css`
Demo: `redesign-lab/extracted/components/merged-card/merged-card.html`
JS: `redesign-lab/extracted/components/merged-card/merged-card.js` owns the tilt, gyro and flip.
The cursor-tracked glow on top of it is `project-cards-expensive`.

---

## Provenance

> merged-card - CARDS pick from final-picks.md: flip-tile LOOK x merged-card FUNCTION.
> PROVENANCE:
> - cover-style tile (image fills the cell, body overlaid bottom, 6/12-col bento spans,
>   min 14rem cells): Rod-provided flip-tile CodePen via rework-harumaki .tile-layout/.tile
> - z-layer parallax, dwell-flip, tilt, gyro, card-back: merged card v2 via rework-harumaki
>   (.post-card family; portable copy merged-card-bundle.html)
> DEVIATION (documented): inner class names keep the merged-card source vocabulary
> (.card-tilt/.card-flipper/.z-layer...) instead of strict BEM - renaming a working
> source's coupled CSS+JS invites exactly the drift the provenance contract exists to stop.
> TUNABLE Z DEPTHS: --z-* custom props below are the per-layer depths Rod wants to adjust.
> GLASS: body.no-glass (or .merged-cards.no-glass) hides the glass plane for judging.

Note that both citations route through `rework-harumaki`, a file in this repo. See the circular
citation warning on `project-cards-expensive`; the same caution applies to anything here that
claims a reference site rather than a CodePen Rod supplied.

## The always-on top glow, removed

> TOP GLOW REMOVED (Rod 2026-08-18): "on the very top of the cards there's a glow that's ALWAYS
> active, which is not what i want." It was a radial-gradient anchored at 50% 0% - top-centre -
> burning at rest on every card whether or not the cursor was near it. The card is meant to be
> lit BY the cursor, so a permanent hot edge was competing with the thing that does the lighting.
> The linear cover ramp stays; only the always-on hotspot goes.

The card back carried a twin of the same glow and it went with it.

## The glass sheen is a token

> the sheen is a token so a component that adds a layer UNDER it (the expensive card's cursor
> spill) can restate the stack without duplicating this gradient and drifting from it

## Three declarations deleted from .card-title

The title looks half-empty on purpose. All three were beating the type ladder:

> font-weight removed 2026-08-23 (Rod chose option B). decisions.css owns this class and sets
> font-weight: 300. The component was restating it as 700, and the two only resolved correctly by
> accident of load order. The ladder is the system; the component defers.

> font-size removed 2026-08-23 (Rod chose option B). decisions.css owns this class and sets
> font-size: 0.9375rem. The component was restating it as 1.7rem, and the two only resolved
> correctly by accident of load order. The ladder is the system; the component defers.

> color removed 2026-08-23 (Rod chose option B). decisions.css owns this class and sets
> color: var(--h4-color). The component was restating it as var(--color-gold-deep), and the two
> only resolved correctly by accident of load order. The ladder is the system; the component
> defers.

## The star pin - gold, because pink resolved to nothing

> STAR pin (Rod 2026-08-11): the reference-gallery tier-badge shape (rounded square, radius 5px)
> holding just a star glyph - no "Pinned" text. Pink = the palette's spot color.
> PROVENANCE: reference-gallery.html .tier badge (Rod's own gallery UI).

> GOLD, NOT PINK. `--color-pink` IS DEFINED NOWHERE - grep across every stylesheet in the lab
> returns zero definitions - so `var(--color-pink, #ff7ec8)` was rendering its FALLBACK: an
> off-palette pink, on the three pinned star badges. It is the loudest single answer to Rod's
> 2026-08-24 "doesnt match any of the colors or conventions of anything else in the finals".
> This is the measure-don't-trust-tokens trap: a plausible token name resolves to a fallback and
> renders wrong WITHOUT erroring. It also made this file's own comment false - it says the
> thumbtack's red is 'not carried forward', while in fact it had been swapped for a colour that
> is in no palette at all. Pink is not in Rod's palette (warm + blue DNA, blue only in the sky,
> one odd-one-out accent, no red), so it takes the gold the rest of the site uses for emphasis.

## The square variant has to be last

> SQUARE variant (Rod 2026-08-11 shape pass): unrounded perfect squares/rectangles.
> LAST in the file on purpose - it must out-cascade every base radius above (the first draft sat
> before .card-back and lost the tie, leaving card backs rounded).
> The star pin KEEPS its 5px radius - the deliberate exception, like the tier badge.

## Small notes

- `.card-meta` and `.back-read` sit at 0.7rem and 0.68rem, which is the T3-E floor for small text.
- `.takeaway-quote` uses the display face per T0-B.
- `--depth` drops to 0 under `@media (hover: none)`, which switches the parallax off on touch.
- `.dwell-ring` animates a registered `@property --dp` so a conic-gradient can be transitioned;
  the reduced-motion block drops that transition and keeps the opacity fade.
