# favicon - the spinning lantern mark in the top bar

Reasoning moved out of `_sass/components/_favicon.scss` on 2026-08-25 under D45 (comments get
short). Nothing here was reworded; it is the original text, kept because it is the provenance
record. The stylesheet now points at this file.

CSS: `redesign-lab/extracted/components/favicon/favicon.css`
Demo: `redesign-lab/extracted/components/favicon/favicon.html`

---

## What it is

> favicon - magnetic-but-clamped icon that spins on hover; navigates home.
> overflow:hidden on the box visually enforces the clamp ("the icon can't escape its box").

The white backing exists so the black lantern-cluster icon reads against the dark bar.

`.favicon--square` is the Rod 2026-08-11 shape pass: square by default, round only by exception.

## The rotation is remembered

> spin ONLY on hover by default (counter-clockwise, continuous while hovered). The ALWAYS-ON
> continuous spin is the ACHIEVEMENT state - the achievement system flips .is-earned on the
> .favicon.
>
> ROTATION IS REMEMBERED (Rod 2026-08-18). The spin is not applied on hover and removed on
> hover-off - it is always attached and PAUSED, and hover only sets it running. A paused animation
> holds its current computed transform, so the mark keeps the angle it reached and the next hover
> carries on from there instead of snapping upright. The magnet POSITION still springs back to
> centre like every other magnetic element; only the rotation persists.

`.is-earned` re-declares the `animation` shorthand, and the shorthand resets `play-state` to
`running`, which is how the earned state spins unconditionally without a second rule.
