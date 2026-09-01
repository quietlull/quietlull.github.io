# stamp-callout - the TAKEAWAY block

Reasoning moved out of `_sass/components/_stamp-callout.scss` on 2026-08-25 under D45 (comments get
short). Nothing here was reworded; it is the original text, kept because it is the provenance
record. The stylesheet now points at this file.

CSS: `redesign-lab/extracted/components/stamp-callout/stamp-callout.css`
Demo: `redesign-lab/extracted/components/stamp-callout/stamp-callout.html`

This is the one callout Rod kept when he replaced the rest (his own stamp takeaway).

---

## Provenance

> stamp-callout - the TAKEAWAY block (final-picks: deliberately unique vs TL;DR).
> PROVENANCE (Remixed): Rod-provided stamp CSS - the perforated edge is a radial-gradient
> dot cutout repeated along an inset ring. Recolored amber-on-night in rework-harumaki.
> --stamp-paper is the block's own paper color; the ::before dots MUST match it exactly,
> which is why it is one local custom property and not two literals.

## Why the paper colour is derived from H1

> BRIGHTER, OPAQUE, AND DERIVED FROM H1. Rod 2026-08-24: "lets brighten the stamp a bit as
> well make it opaque and a darker version of the H1 color".
> Was `--color-stamp-paper` #1e160e - rgb(30,22,14), a near-black warm brown that read as a
> hole in the page. Now a 26% mix of the H1 orange with black: #401b01, which is the same hue
> the heading ladder uses rather than a neighbouring brown, and light enough to read as paper.
> DERIVED, not typed: `color-mix` keeps it tied to `--h1-color`, so if Rod retunes the
> signature orange the stamp follows instead of drifting away from it.
> Fully opaque on purpose - it sits over a live scene, and any alpha let the background
> through and muddied both the paper and its perforated edge, which share this one value.

## Why the bottom edge is flat

> BOTTOM EDGE FLAT. Rod 2026-08-24: "remove the stamps bottom edge so its flat down there".
> This layer is the perforation, and it only shows where it OVERHANGS the box - it sits behind
> (`z-index:-1`) and the stamp's own background covers the middle. So pulling the bottom inset
> from -7px to 0 removes the overhang there and nothing else: the torn fringe stays on the top
> and both sides, and the bottom reads as a cut edge. Nothing about the dot pattern changed.
