# button-kit - buttons, tags and the inline link

Reasoning moved out of `_sass/components/_button-kit.scss` on 2026-08-25 under D45 (comments get
short). Nothing here was reworded; it is the original text, kept because it is the provenance
record. The stylesheet now points at this file.

CSS: `redesign-lab/extracted/components/button-kit/button-kit.css`
Demo: `redesign-lab/extracted/components/button-kit/button-kit.html`

---

## THE CIRCULAR CITATION WARNING - still open

> !! CIRCULAR CITATION - CORRECTED 2026-08-16 !!
> The "PROVENANCE" line below points at a `rework-*.html` / `ref-*.html` page in THIS repo.
> Those are OUR OWN BUILDS, named after the sites that inspired them. They are source
> CANDIDATES, not sources. This component therefore has NO EXTERNAL PROVENANCE and is Slop
> until a real live site is found and its CSS read from source.
> Rod caught this on the callouts: "you are confidently lying because these are not anywhere
> to be found on hana, unless you mean our AI generated hana copy."
> A provenance comment is a CLAIM, not evidence. Check what it points AT.

This applies to the SHAPES line below (`rework-stephan.html`). The CodePen citations are real
external sources and are not affected.

## Stated provenance

> button-kit - KIT pick from final-picks.md: stephan SHAPES x hana BEHAVIOR x magnetic cursor-stick.
> PROVENANCE:
> - shapes (radius, padding, chip tags): rework-stephan.html (stephan rework, amber-mapped)
> - primary hover ripple: phojanecki (codepen.io/phojanecki/pen/vwyZpY), recolored
> - outline/pill fill-sweep: nfranciosi (codepen.io/nfranciosi/pen/eGRKON -> sources/nfranciosi-button-fill.md)
> - inline link: harumaki rework (Caveat + grow underline)
> - magnetic: ../magnetic/magnetic.js (sources/magnetic-buttons.md)
> Font is the body token, not stephan's Inter - type is owned by the cohesion pass.

The rising-circle fill actually shipped is dennissnellenberg's, not nfranciosi's:

> rising-circle fill (dennissnellenberg .btn-fill): an oversized circle parked below, slides up on
> hover; overflow:hidden on the button clips it. Replaces the old nfranciosi left->right sweep.

The tags:

> tags: stephan chip geometry + hana BEHAVIOR (phojanecki ripple - outline floats out and
> fades while the chip ignites), per Rod's batch-1 feedback.

`.inline-link` uses the body font, not the hand font: T0-B reserves the hand for the logo. The
underline-grow behaviour is what Rod picked.

## Why .kit-tag resets border, measured

> BORDER RESET IS LOAD-BEARING. Rod 2026-08-24: "tags are weird amalgams".
> Measured on final-projects-v2: `button.kit-tag` rendered 52.22x28.59 WITH a 2px black outset
> bevel, `span.kit-tag` rendered 47.27x27.55 without - the SAME CLASS, two different boxes, 44
> instances of the bevel on one page. Cause: this rule styles the edge with `outline` and never
> touches `border`, so a <button> keeps the browser's default 2px outset while a <span> has none,
> and foundations' `*` reset only handles box-sizing/margin/padding.
> Declared here rather than in the page because the component owns its own shape - a page-local
> fix would have to be repeated on every page that uses a tag as a control.
