# slap-toggle - the Technology / Personal switch

Reasoning moved out of `_sass/components/_slap-toggle.scss` on 2026-08-25 under D45 (comments get
short). Nothing here was reworded; it is the original text, kept because it is the provenance
record. The stylesheet now points at this file.

CSS: `redesign-lab/extracted/components/slap-toggle/slap-toggle.css`
Demo: `redesign-lab/extracted/components/slap-toggle/slap-toggle.html`

---

## Provenance

> slap-toggle - the hana/Technology-Personal switch.
> PROVENANCE (Remixed): EXACT copy of YarivFrd's slap toggle (codepen.io/YarivFrd/pen/PEOJLj),
> from rework-hana: scaled down, animation reduced, full pill (radius 40px so it never breaks
> on compress), recolored to the harumaki orange per Rod's tools-slot spec.
> State: `.is-on` is set by JS - the `:checked ~` sibling selector proved unreliable on
> display:none radios (rework-hana finding).

## Why the radios are invisible rather than display:none

> B1 fix (2026-06-12): focusable-but-invisible, NOT display:none. display:none removed the
> radios from the tab order, making the toggle keyboard-dead. The YarivFrd source uses real
> focusable radios; this returns to it. Labels drive pointer selection (for=), so the radios
> take pointer-events:none and the visible flap reads through.

## The scoped focus ring

> scoped focus ring (Rule 76): amber :focus-visible recipe from the live site's _a11y.scss.
> Scoped to the slap control only - the GLOBAL focus treatment (report B2) is still parked.

That global ring has since shipped, in `_sass/base/_focus-ring.scss`. The `outline: 2px solid
transparent` inside the recipe is for Windows High Contrast Mode, which drops box-shadows.

## Variants

- `--small` fits the top bar. Rod: "top bar should use slap toggle".
- `--square` is the Rod 2026-08-11 shape pass: square by default, round only by exception. The
  flap's right corners follow the control so the flipped flap still seats flush.

The control is a two-equal-column grid so the 50%-wide flap lands exactly on the boundary.
