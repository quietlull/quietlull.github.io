# drift-magnet - the drifting, magnetic social circles

Reasoning moved out of `_sass/components/_drift-magnet.scss` on 2026-08-25 under D45 (comments get
short). Nothing here was reworded; it is the original text, kept because it is the provenance
record. The stylesheet now points at this file.

CSS: `redesign-lab/extracted/components/drift-magnet/drift-magnet.css`
Demo: `redesign-lab/extracted/components/drift-magnet/drift-magnet.html`
JS: `redesign-lab/extracted/components/drift-magnet/drift-magnet.js` owns the motion.

---

## Provenance

> drift-magnet - demo styles + the dennissnellenberg rising-circle FILL (pure CSS).
> The motion (drift + magnet) is owned by drift-magnet.js; CSS here is the shape/fill only.
> PROVENANCE: rising fill = dennissnellenberg.com/work .btn-fill (150%x200% circle parked below,
> slides to 0 on hover; overflow:hidden clips it) -> sources/dennissnellenberg-buttons.md, recolored
> to tokens.

The circles sit in the harumaki register: right of the hero, circle buttons.
The glyph inverting as the fill covers is dennissnellenberg's `.btn-text-inner.change`.
The click border-flash is phojanecki (codepen.io/phojanecki/pen/vwyZpY), the same ripple as
button-kit and the tags:

> --- BASE behavior (not demo-only): click border-flash ---
> the border ignites then flies outward and fades (phojanecki outline-ripple, on CLICK). Opt-in via
> data-click-flash; drift-magnet.js toggles .dm-flash. outline/box-shadow paint outside the box, so
> a social's own overflow:hidden does NOT clip them.

## The row squeezes instead of wrapping, and the percentages are exact

> SQUEEZE AND SHRINK INSTEAD OF STACKING (Rod 2026-08-24): "lower the gap for these when
> scaling make them squeeze together and shrink instead of stacking."
> 11.8483% is 40/337.56 and the 16.1137% below is 54.39/337.56, so 4 circles + 3 gaps come to
> exactly 100% of the row. Below the crossover the row is precisely full width and CANNOT wrap
> at any size. Percentages resolve against the flex container, which IS the rail, so this tracks
> the rail rather than the viewport and is not fooled by the 1401px page cap or the scrollbar.
> Measured: the wrap used to fire between viewport 1430 and 1429 and cost +94.39px of rail
> height; it no longer fires at any width. Circle floor 37.70px in the sticky band, comfortably
> clear of the 24px minimum for a link target.

Note the shipped numbers are `gap: min(1.625rem, 8.7957%)` and `width: min(3.4rem, 18.4032%)`,
which are the halved-gap pair; the comment quotes the earlier 11.8483 / 16.1137 derivation.
