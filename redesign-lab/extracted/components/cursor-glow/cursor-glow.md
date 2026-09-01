# cursor-glow - the pointer lantern

Reasoning moved out of `_sass/components/_cursor-glow.scss` on 2026-08-25 under D45 (comments get
short). Nothing here was reworded; it is the original text, kept because it is the provenance
record. The stylesheet now points at this file.

CSS: `redesign-lab/extracted/components/cursor-glow/cursor-glow.css`
Demo: `redesign-lab/extracted/components/cursor-glow/cursor-glow.html`

---

## Provenance

> cursor-glow - warm "cursor-as-lantern" vignette that follows the pointer.
> Technique: brittanychiang / merodev `.cursorglow` fixed full-viewport radial at --cx/--cy.
> Remix: recolored from merodev's purple to the festival gold (Rule 32 - token, no magic color);
> swap --cursor-glow-tint to --color-accent-cool for a cool wash instead.

TIER: Remixed. IDEA-ORIGIN: theirs.

`--cursor-glow-radius: 350px` is Rod's, 2026-08-25. merodev's source value was 520px.

## Why z-index is 600, and why that is safe

> Rod 2026-08-25, tuned on the bench: 600, which is ABOVE the sparkler canvas at 500, not the
> 499 the bench proposed as "under the sparkler". A deliberate swap of the two, recorded rather
> than assumed - the glow now paints over the sparks instead of behind them.
> Safe at any height because `pointer-events: none` is on the next line: this element covers the
> whole viewport, so without it a z-index this high would swallow every click on the site.
