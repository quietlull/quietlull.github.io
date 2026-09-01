# Washi TAPE - the real asset and the rule that places it

- **Source URL:** https://gneiss.place/nonhtml/css/deco.css (imported by `/nonhtml/css/index.css`)
- **Markup seen on:** https://gneiss.place/pages/index/geology/fieldnotes/carbonitevolcanos
  -> `<div class="taped polaroid" style="rotate: 0.05deg;">`
- **Asset:** https://gneiss.place/assets/images/tape/tape1.png (316 x 136, 95,583 bytes)
- **Captured:** 2026-08-22, read from the site's own served CSS. **Tier: True.**

## PREMISE CHECK, because the earlier note nearly failed one

`washi-tape.css` cites "gneiss.place, selector `.taped`". That is TRUE, but the rule is **not** in
`index.css`, which is the file the earlier note named. `index.css` has **zero** occurrences of
`tape` or `washi`. The rule lives in `deco.css`, one of six `@import`s
(`box / headers / text / util / deco / animations`). Anyone re-checking the citation against
`index.css` alone would have concluded it was fabricated. It is not - it is one file deeper.

Also corrected: there is only **tape1.png**. `tape2/3/4.png` are 404.

## THE RULE, verbatim

```css
.taped::before {
  background-image: url("/assets/images/tape/tape1.png");
  background-repeat: no-repeat;
  display: block;
  content: " ";
  position: absolute;
  height: 50px;
  width: 150px;
  background-size: contain;
  top: -20px;
  left: 40%;
}
```

Its siblings in the same file, for context - the same one-liner pattern, different object:

```css
.pinned::before {
  background-image: url("/assets/images/thumbtack.png");
  background-repeat: no-repeat;
  display: block;
  content: " ";
  position: absolute;
  overflow: visible;
  height: 50px;
  width: 50px;
  background-size: contain;
  top: -20px;
  left: 40%;
  z-index: 9999;
}

.pinnedcorner::before {
  background-image: url("/assets/images/thumbtack.png");
  background-repeat: no-repeat;
  display: block;
  content: " ";
  position: absolute;
  height: 50px;
  width: 50px;
  background-size: contain;
  top: -12px;
  left: -15px;
  transform: rotate(-25deg);
  z-index: 9999;
}

.pinned::before,
.pinnedcorner::before { transition: transform 0.2s ease; }

.pinned:hover::before,
.pinnedcorner:hover::before { transform: scale(1.1); }
```

**The convention we adopted is visible here:** `deco.css` is a file of stick-on markers, each a
`::before` carrying one photographic PNG. Tape is one of three. That factoring is what Rod adopted
on 2026-08-21, not just the tape's look.

## THE ASSET, MEASURED (this is the part that answers "why does ours look fake")

Measured off `tape1.png` with an alpha threshold of 128, then rotated onto the strip's own
principal axis so the ends could be read perpendicular to the tape rather than to the canvas.

| what | measured |
|---|---|
| bitmap | 316 x 136 |
| tape drawn at | **5.42 degrees** off the bitmap's own axis |
| strip on its own axis | **298 px long x 116 px thick** = aspect **2.57 : 1** |
| displayed at | 150 x 50 (`background-size: contain`) = **3 : 1** |
| END raggedness, left | spread **21 px**, stdev **6.12 px** |
| END raggedness, right | spread **22 px**, stdev **5.80 px** |
| LONG edge, top | spread 27 px, stdev 4.16 px |
| LONG edge, bottom | spread 92 px, stdev 12.06 px |
| alpha | **essentially binary** - 3,670 opaque vs 1,124 transparent samples, only ~85 in between |

**The end is NOT a serration.** Its deviation from its own mean, read row by row down the 116 px
thickness, is:

```
-6 -12 -13 -11 -11 -6 -3 -1 -1 +0 +0 +0 +1 +6 +6 +6 +6 +6 +5 +2 +1 +0 +2 +2 +1 +0 +1
```

That is **two or three broad lobes across the whole width**, each roughly 30-40 px of the 116 px.
A dispenser blade would give ten to twenty alternations. So the real reference is a **low-frequency
hand-torn wander of about +/- 6 px on a 116 px width (~5%)**, not a fine zigzag.

**This contradicts the ask as worded.** Rod asked for "serrated edges like the tape was taken out
from a roller". The one real washi asset we hold measures as a tear, not a serration. Both are
drawn as variants on `washi-tape-tests.html` so he judges it rather than being told. Recording the
disagreement here rather than quietly building the one I measured.

## What our current component does differently, all measured

1. **Ours carries a `border: 1px solid`.** The real one has no outline at all. The component's own
   CSS comment says a grey border "reads as a sticker", then keeps a hue-matched border anyway.
2. **Ours is axis-aligned to the card.** The real asset is drawn at **5.42 degrees** off its own
   axis, so the tape is not parallel to the edge it sits on. `.taped` rotates the CARD, not the tape.
3. **Aspect.** Ours `.tape--top` is 110 x 30 = 3.67 : 1. Theirs displays at 3 : 1 and the artwork
   itself is 2.57 : 1. Ours is proportionally thinner.
4. **Ours has square ends.** Theirs wanders +/- 6 px.
5. **Ours is fully opaque.** So is theirs, measured - so opacity is NOT the difference, and
   "make it translucent" would be a guess, not a correction. Flagged so nobody adds it as a fix.

## What transfers and what does not

- TRANSFERS: the `::before` + one asset + `background-size: contain` factoring; `left: 40%` as the
  off-centre placement; the 3:1 displayed aspect; the sub-degree host rotation.
- DOES NOT: the artwork itself is a photograph of one physical tape in one colourway. D27 needs
  four section colours out of one definition, and a photo cannot recolour. Using the PNG as a
  **mask** instead of an image is the obvious remix, and it is OURS, not theirs - label it so.
