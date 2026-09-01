# Skills page - tool-icon grid, draw-in strokes, brand-colour glow, one tagline at a time

- **Source URL:** https://www.stephanewillems.be/skills
- **Captured:** 2026-08-21, read from the RENDERED DOM in a real browser, with the hover/focus state
  driven live to capture it.
- **Tier: True** for the markup, the measurements and the two state values below. All are quoted
  from the live page.

## Why this file exists, and one correction inside it

The ledger row said the source was `stephanewillems.be/skills (via ref-stephanewillems.html)`. The
part in brackets points at an in-repo file, which is our own reconstruction, so the citation was
circular and the real page had never been read. It has now.

**A correction, recorded because the mistake is instructive.** A first pass of this file claimed the
page had "no icon strip and no hover". That was wrong. It searched for `<img>` and Tailwind
`.group`/`.grayscale` classes and found none, and concluded the element did not exist. The icons are
**inline SVG** and the hover is applied as an **inline style by JS**, so both were invisible to that
search. Measured properly: 18 SVGs, 46 paths, **45 carrying `pathLength`** and a stroke-dasharray.
The ledger's "pathLength draw-in" claim was right all along.

The lesson worth keeping: absence of a selector is not absence of an element.

## The structure

A wrapped grid of tool icons, and separately one skill name plus a tagline, with a
Technology / Personal Skills switch above the whole thing.

```html
<div class="flex flex-wrap justify-center w-full gap-10 px-10 md:px-0 md:w-1/2 grid-rows-auto">
  <span class="flex items-center justify-center w-20 h-20" tabindex="0" style="filter: none;">
    <span class="relative cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
           viewBox="0 0 50 50">
        <path fill="#1E293B" stroke-width="0.5" stroke="rgba(255, 255, 255, 1) "
              stroke-linecap="round" d="M 6.667969 4 C 5.207031 4 4 5.207031 4 6.667969 ..." />
      </svg>
    </span>
  </span>
  <!-- x15 -->
</div>
```

- **15 icons**, `viewBox="0 0 50 50"` rendered at 100 x 100, in a 20 x 20 (`w-20 h-20`) box.
- `gap-10` = 40px, wrapping, constrained to `md:w-1/2` so the grid stays a block rather than a band.
- **`tabindex="0"` on every icon.** The element is keyboard reachable, and the hover state below is
  a FOCUS state too. That is worth copying regardless of anything else here.

## The draw-in, and the trick in it

```
pathLength="1"
stroke-width: 0.5
stroke: rgba(255,255,255,1)
stroke-linecap: round
fill: #1E293B
computed at rest: stroke-dasharray: 1px, 1px;  stroke-dashoffset: 0px
```

`pathLength="1"` renormalises every path to a length of 1 **regardless of its real geometry**. That
is the whole trick: one dasharray and one dashoffset animation drives fifteen completely different
icon paths identically, with no per-icon measurement. Animate dashoffset 1 to 0 and every icon draws
in over the same duration.

## The hover / focus state, captured live

Driven by JS as an inline style on the `w-20 h-20` wrapper. At rest it is `filter: none`. Active:

```css
filter: drop-shadow(rgb(33, 148, 240) 2px 2px 10px);
transform: scale(1.2) translateZ(0px);
```

The drop-shadow colour is **the icon's own brand colour**, not a site accent. Scale is 1.2, and
`translateZ(0)` is there to hold it on the compositor.

## The switch

The only two non-Tailwind class names on the entire page are `switch` and `handle`, so those are the
author's own and the JS drives them.

```html
<div class="flex justify-center gap-5 py-5 font-light text-white">
  <p>Technology</p>
  <div class="switch justify-start w-8 h-5 bg-white bg-opacity-40 flex p-1 rounded-full cursor-pointer">
    <div class="w-3 h-3 bg-white rounded-full handle"></div>
  </div>
  <p>Personal Skills</p>
</div>
```

Track **32 x 20px**, 4px padding, white at 40%. Handle **12 x 12px**, solid white. The labels sit
either side of the track rather than inside it, so it reads as a choice between two named things
rather than an on/off.

**This is where the dead switch came from.** Rod, 2026-08-18: *"The skills switch doesn't work"* -
the Technology / Personal switch on the landing shipped with zero JS and was removed (request #28).
It was transcribed from here without the behaviour. If it comes back, it comes back wired.

## The skill text

```html
<div class="flex flex-col items-center justify-center w-full">
  <h1 class="text-xl font-poppins" style="color: rgb(255, 223, 0);">Javascript</h1>
  <p class="font-light text-center w-96">While some are searching for the meaning of life, I'm here
    searching for the missing semicolon. JS keeps me on my toes, ensuring I never miss a beat (or a
    bracket).</p>
</div>
```

- Colour is set **inline, per skill**. `rgb(255,223,0)` is JS yellow.
- Measure `w-96` = 384px, centred, `font-light`.
- **Focus alone does not change it** (verified: focusing icons 0, 2 and 5 left the heading on
  Javascript while the icon's own glow state did change). So the tagline follows a SELECTED skill,
  not a hovered one. Hover glows the icon; choosing one changes the words.

## What transfers, and what does not

- **TRANSFERS:** `pathLength="1"` for uniform draw-in, the `tabindex` so hover is also focus, the
  scale-plus-glow on activation, and the switch that names both sides instead of being an on/off.
- **NEEDS ROD'S CALL:** the brand colours. JS yellow, React cyan and the rest are exactly the cool
  accents and reds the palette law bans. The glow's whole idea is that it is the icon's own colour,
  so dropping them changes the element rather than just recolouring it.
- **DOES NOT TRANSFER:** the icon SET. It is a web-dev list. Rod's real tools are HLSL, GLSL, Unity,
  Three.js, compute, RenderDoc, C#, Blender, and those want official SVGs rather than approximations.
  The existing bench component's geometry is hand-approximated, which is its own provenance problem.
- **NOT CODE:** the site is a Tailwind SPA. `/assets/index-fc98faf9.css` is 22 KB of utilities with
  no `.skills` or `.tool-icon` rule in it. Everything above is quoted as markup and computed values
  because that is the only honest way to read this page.
