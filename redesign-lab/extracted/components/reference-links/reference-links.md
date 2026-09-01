# reference-links - the end-of-article reading list

Reasoning moved out of `_sass/components/_reference-links.scss` on 2026-08-25 under D45 (comments
get short). Nothing here was reworded; it is the original text, kept because it is the provenance
record. The stylesheet now points at this file.

CSS: `redesign-lab/extracted/components/reference-links/reference-links.css`

---

## Provenance

> SOURCE (True mechanism): sources/ronja-tutorials-prose.md - `.nested-links a` and
> `.nested-links a:hover, .nested-links a:focus`, read off
> ronja-tutorials.com/dist/css/app.d876a0cc99d23e9edadbac7fc6abde13.css
> TIER: Remixed. IDEA-ORIGIN: theirs.
> PICKED BY ROD 2026-08-24, from reference-block-tests.html: "A Ronja Tutorials, colour-only links".

## Why this replaced a box

> It replaces `.co-ref`, which was callout-family V1 (flamedfury's box) with D30's "reference =
> no tape". That shell was never judged on its own - it arrived with the callout merge, which is
> why Rod did not recognise it. Both alternatives he was shown dropped the box, and that was not
> a coincidence: the two gallery sites whose reference lists were actually transcribed are
> technical tutorial sites and NEITHER boxes its links.

## What is transcribed, and what is ours

THEIRS, verbatim in mechanism:

> - colour-only treatment scoped by ONE container class
> - NO underline rule of its own, so links keep the browser's own underline
> - hover goes LIGHTER, not darker. That is the device: the link recedes on approach rather
>   than hardening. Ronja runs #357edd -> #96ccff against a near-white page.
> - `:focus` grouped with `:hover`, so keyboard users get identical feedback
> - `word-wrap: break-word`, their own one-liner, purely so a long bare URL cannot blow the
>   measure out. Reference lists are exactly where bare URLs turn up.
> - no external-link marker of any kind

OURS (the Remix):

> - their blue becomes our gold -> glow, which keeps the lighter-on-hover direction intact on
>   a DARK page: gold #fbbf24 -> glow #FFE8B0 still moves toward the light end.
> - the small mono label. Ronja has no label; ours needs one because this block sits inside an
>   article rather than in a dedicated links region.

## Why the component sets no colour or hover

> COLOUR AND HOVER ARE NOT SET HERE. The ladder owns link appearance - decisions.css gives every
> `.prose a` the picked `.inline-link` behaviour (gold, underline growing from the left). This
> component owns only the LAYOUT of the list: the label, the bullet reset and the spacing.
> Rod 2026-08-24: "we shouldnt be making 100 exceptions just a few simple rules." A component
> restating the ladder's colours is exactly the drift that produced two different link styles on
> adjacent pages earlier in this project.
> `word-wrap` stays: it is a LAYOUT concern, and reference lists are where bare URLs turn up.
