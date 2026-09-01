# project-cards-expensive - the cursor-tracked band reveal

Reasoning moved out of `_sass/components/_project-cards-expensive.scss` on 2026-08-25 under D45
(comments get short). Nothing here was reworded; it is the original text, kept because it is the
provenance record. The stylesheet now points at this file.

CSS: `redesign-lab/extracted/components/project-cards-expensive/project-cards-expensive.css`
Demo: `redesign-lab/extracted/components/project-cards-expensive/project-cards-expensive.html`
The cards themselves are `merged-card`; this file only adds the reveal.

---

## The circular citation - this component is Slop until resourced

> !! CIRCULAR CITATION - CORRECTED 2026-08-16 !!
> The "PROVENANCE" line below points at a `rework-*.html` / `ref-*.html` page in THIS repo.
> Those are OUR OWN BUILDS, named after the sites that inspired them. They are source
> CANDIDATES, not sources. This component therefore has NO EXTERNAL PROVENANCE and is Slop
> until a real live site is found and its CSS read from source.
> Rod caught this on the callouts: "you are confidently lying because these are not anywhere
> to be found on hana, unless you mean our AI generated hana copy."
> A provenance comment is a CLAIM, not evidence. Check what it points AT.

The stated claim was:

> project-cards (expensive) - the combined keeper. Cards are styled by merged-card.css (dep);
> this adds the cursor-tracked band-reveal on the glass (front) + a mirrored copy on the back,
> and suppresses the card's static glows so the cursor glow is the one that reads.
> Band-reveal PROVENANCE: yannesidibe .glow (rework-merodev-yanne.html / yannesidibe.com/about).

**That citation is now known dead**, not merely circular. `related-card-real` re-fetched it:
yannesidibe.com/about returns HTTP 404, the root is Tailwind/Next, and a grep of the live site
returns zero hits for `glow`, `mask-composite`, `plus-lighter` or any `--mx` / `--my` cursor
property. See `related-card-real.md`.

This banner is also the one `achievement-wall` corrects: the file-level Slop stamp is wrong for
the RIM technique specifically, which has three older and more specific records behind it.

## The layouts

> Uniform-card layouts (Rod): both STAGGERED and REGULAR use uniform SQUARE cards (override the
> bento spans + heights). BENTO (default, no class) keeps the varied [6r2][6][6][12] sizes.

> STAGGERED - Studio Gohan "Works" brick: ~36px row spacing, cols 2 + 4 dropped ~58px (the zig-zag)

Note that the zig-zag is a STATIC offset with no transition and no motion. It is easy to mistake
for a reveal animation; it is not one.

## The reveal material - Rod's call on the glow-edge bench, 2026-08-13

> REVEAL MATERIAL (Rod 2026-08-13, chosen on the glow-edge bench): ADDITIVE + SOFT EDGE + SPILL.
> The reveal used to read as a metal band, and the construction is why: a constant-width 1.5px
> strip, hard-cut on both sides by the mask, with a bright spot sliding along it and no spill in
> any direction. That is how a specular highlight on polished trim is built. Three changes fix the
> MATERIAL without touching the card's shape, which was never in question:
>   soft edge     blur turns the mask's two hard cuts into falloff, so it stops being a strip
>   additive      plus-lighter EMITS light; metal reflects a highlight, a lantern adds one
>   inward spill  an unmasked wash beside the ring, because light off an edge lights the surface
> Tried on the same bench and rejected: long tail, dim core, rounding the glow's corners.
> Applied to the front AND the back, since the back carries the same reveal.

So `filter: blur(2.5px)` is load-bearing. Deleting it makes the ring hard-edged again, which is
exactly the "reads as a metal band" failure the blur was added to fix.

## The back

> back: same glow. The back is PRE-rotated 180deg, so when the flipper flips it reads
> un-mirrored -> use the normal --mx (not a mirrored coord).

> TWO layers in one masked pseudo = the front's two rings (::before main + ::after soft warm).
> First background layer paints on top, so the soft one leads, matching the front's order.

> BACK/FRONT PARITY (Rod 2026-08-13: "back looks different" - it was, in three ways):
> 1. the back's static border was rgba(251,191,36,.35) against the front cover's .14, so a hard
>    bright gold line rang the back at all times and the new soft glow just sat on top of it;
> 2. the front runs TWO ring layers (the 220px main + a 140px soft warm one), the back had one;
> 3. the front's spill rides the glass plane at inset 8px, the back's ran to the edge at 0.
> All three are matched below.

> the back's inward spill. z-index:-1 keeps it above the back's own background but UNDER the
> quote and the read link: .card-back is rotated, so it makes a stacking context and a negative
> child paints between the parent's background and its in-flow text. Without it the wash sits on
> top of the copy.

## The suppressor - read this before deleting the last rule in the file

> keep the card's own static cover hover-glow out of the way so the cursor reveal is the star

That rule is a SUPPRESSOR, and deleting it does the opposite of what its innocuous look suggests.
It overrides `merged-card`'s hover, which carries a 24px gold bloom and a 0.45 gold border. Both
selectors are specificity 0,4,0 and this one loads second on all six host pages, so it wins on
source order. Remove it and the card GAINS the bloom.
