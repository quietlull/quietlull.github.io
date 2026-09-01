# Torn / rough EDGES via SVG filters - two real implementations

Both read from source on 2026-08-22. These are the mechanism candidates for the washi tape's tips
(P51 / P52), and they are the two that produce a **fibrous tear** rather than a drawn zigzag.

---

## A. Daniel Jones - the minimal reusable utility. **Tier: True.**

- **Source URL:** https://danieldarrenjones.com/articles/how-to-make-rough-edges-with-css-and-svgs
- Corroborated by https://bengammon.co.uk/rough-css-borders-with-svg-filters/ (2024-05-03), which
  credits this article as its origin.
- Two primitives. Nothing else. This is the whole technique, verbatim:

```css
.squiggle {
    filter: url(#squiggle);
}
```

```html
<svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    height="0"
    width="0"
>
    <defs>
        <filter id="squiggle">
            <feTurbulence
                type="fractalNoise"
                id="turbulence"
                baseFrequency=".05"
                numOctaves="4"
            />
            <feDisplacementMap
                id="displacement"
                in="SourceGraphic"
                scale="4"
            />
        </filter>
    </defs>
</svg>
```

**Why it fits tape:** it displaces the element's own alpha, so a plain rectangle with a striped
background comes out with every edge roughened and the stripes still intact. No asset, no extra
markup on the strip, and it composes with the `repeating-linear-gradient` we already have.

**Costs, stated rather than discovered later:**
- The filter roughens **all four edges**, not just the two ends. On real tape that is arguably
  correct (washi is a paper fibre edge), but it is a change to the long edges too, so it moves what
  the strip looks like against the card - check it against the layout rule before shipping.
- `filter` establishes a containing block and rasterises. Applied to `.tape` (a small absolutely
  positioned `<i>`) that is cheap; applied to the CARD it would rasterise the card's text.
- `scale="4"` is in **user units**, so the raggedness does NOT scale with the strip. A 26 px-wide
  tape gets the same 4 px wander as a 116 px one. Ours is 26 px, the reference asset is 116 px, so
  4 is proportionally ~4.5x rougher on ours. **The reference number does not transfer unchanged** -
  matching the measured ~5% of width means about `scale="1.3"` at our 26 px width. That is
  arithmetic on their number, not a new number: say so if it ships.
- One `<filter>` id is shared by every element using it, so every strip on the page tears
  identically unless each gets its own `seed`.

---

## B. TornPaper.js - the full torn-page chain. **Tier: True.** MIT.

- **Source URL:** https://raw.githubusercontent.com/happy358/TornPaper/main/tornpaper.js
- TornPaper.js v0.0.3, Copyright (c) 2024 Wakana Y.K./happy358, MIT licence.
- The library is a thin wrapper that injects ONE filter. The filter is the whole product, verbatim
  from `tornpaper.js` (template literal, defaults substituted in square brackets):

```html
<filter id="filter_tornpaper">
  <feTurbulence type="fractalNoise" baseFrequency="[grungeFrequency 0.03]"
                result="paper_noise" numOctaves="10" seed="[seed]" />
  <feDiffuseLighting in="paper_noise" lighting-color="white"
                     surfaceScale="[grungeScale 3]" result="paper">
    <feDistantLight azimuth="45" elevation="60" />
  </feDiffuseLighting>
  <feTurbulence baseFrequency="[tornFrequency 0.05]" type="turbulence"
                numOctaves="10" seed="[seed]" result="edge_noise" />
  <feGaussianBlur stdDeviation="0.5" in="SourceGraphic" />
  <feMorphology operator="erode" radius="5" />
  <feOffset dx="-2" dy="-2" />
  <feDisplacementMap scale="[tornScale 10]" xChannelSelector="B" yChannelSelector="G"
                     in2="edge_noise" result="edge" />
  <feComposite in="paper" in2="edge" operator="atop" result="result_rough" />
  <feComposite in="SourceGraphic" in2="edge" operator="atop" result="result_sg" />
  <feBlend mode="multiply" in="result_rough" in2="result_sg" />
</filter>
```

Defaults, read off the constructor rather than the README:
`grungeFrequency 0.03`, `grungeScale 3`, `tornFrequency 0.05`, `tornScale 10`,
`seed = Math.floor(1e7 * Math.random())`.

**The three primitives that make this a TEAR and not a wobble**, and that (A) does not have:

1. `feGaussianBlur stdDeviation="0.5"` softens the alpha before displacement, so the displaced edge
   has a feathered fibre rather than a hard cut.
2. `feMorphology operator="erode" radius="5"` **eats 5 px in from every edge first**. That is what
   makes room for the tear to bite inward instead of only bulging outward.
3. `feOffset dx="-2" dy="-2"` shifts the eroded shape back so the erosion is not symmetric - the
   tear favours two sides.

The `xChannelSelector="B" yChannelSelector="G"` pair is also deliberate: taking x and y displacement
from **different** noise channels decorrelates them, so the edge wanders in two axes instead of
sliding along one.

The `feDiffuseLighting` half is a **paper grain**, not an edge effect. D27 took paper texture off
the cards, so that half is very likely NOT wanted here - it would put back the texture Rod removed.
Taking only the edge half is a legitimate subset, but it is a subset: label it Remixed, not True.

**Cost:** `erode radius="5"` on a strip only 26 px wide removes 5 px from each side, i.e. **38% of
the tape's width**. This chain is written for a page-sized sheet. Scaling it down is real work and
is exactly where a "close enough" transcription would go wrong.

---

## Where the numbers came from, honestly

`bengammon.co.uk` embeds its demo as a CodePen iframe and CodePen returns **403** to everything
available in this session (curl and the fetch tool alike, four pens tried). The filter above is
read from Daniel Jones's own article body and from the TornPaper source file, **not** from any pen.
No pen was opened, so no pen is cited.
