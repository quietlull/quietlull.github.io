# flamedfury.com - the orb callout (`aside`)

**Read from source 2026-08-23.** Page:
<https://flamedfury.com/posts/contain-the-web-with-firefox-containers/>
Stylesheets: `https://flamedfury.com/z2Ai70SrDv.css` (103,170 bytes) and
`/NHCiW0pww7.css` (4,929 bytes). Rules below are VERBATIM from the first.

**Why this file exists:** Rod picked this callout on 2026-08-22 - *"i kinda like the
flamedfury.com callout with the orb but move it to the top right instead maybe"* - and until now
the only artefact backing it was a SCREENSHOT (`references/elements/callout-flamedfury.png`) plus
a URL. `callout-selection.html` drew it tagged `GEOMETRY ONLY`, from the picture. A screenshot is not
provenance. This is the CSS.

## Markup, verbatim from the page

```html
<aside class="aside flow warning">
```

One element. The role is a second class (`note` / `warning` / `tip` / `skateboard`) and it changes
**only the icon**, nothing else. That is the same "one object covers all three roles" property the
alevirita note has, arrived at differently.

## The rules, verbatim

```css
.post aside, .styleguide aside, .page aside {
  --border-width: 0.2rem;
  --border: var(--border-width) solid #999;
  border: var(--border);
  border-radius: var(--border-radius);
  padding-inline: var(--space-s-m);
  position: relative;
  color: var(--color-text);
  background-color: var(--color-bg);
  padding-inline-start: var(--space-l-xl);
  padding-block: var(--space-s-m);
  margin-block: var(--space-m-l);
}

.post aside:before, .styleguide aside:before, .page aside:before {
  --size: 2.25em;
  border-radius: 100%;
  content: '';
  display: flex;
  font-size: 1.15em;
  block-size: 2.15em;
  inset-inline-start: calc(var(--size) / -2 - var(--border-width) / 2);
  line-height: 1;
  position: absolute;
  inset-block-start: 1em;
  inline-size: var(--size);
  background-color: var(--color-bg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.post aside.warning:before { background-image: url('../assets/svg/misc/warning.svg'); }
.post aside.note:before    { background-image: url('../assets/svg/misc/note.svg'); }
.post aside.tip:before     { background-image: url('../assets/svg/misc/tip.svg'); }
```

Tokens resolved from the same file:

```css
--space-s-m:  clamp(0.625rem,  0.41rem + 1.06vw, 1.3125rem);
--space-l-xl: clamp(1.1875rem, 0.48rem + 3.56vw, 3.5rem);
--space-m-l:  clamp(0.875rem,  0.55rem + 1.63vw, 1.9375rem);
--color-bg:   var(--bg);
--color-text: var(--ink);
```

## What the device actually IS, stated so it survives translation

**The orb is a hole, not a badge.** It is `background-color: var(--color-bg)` - the page's own
background - sitting on `border-radius: 100%` and straddling the border line. The offset
`calc(var(--size) / -2 - var(--border-width) / 2)` puts its centre exactly on the border's centre,
so the circle eats a bite out of the frame and the frame reappears around it. Nothing is drawn on
top of anything. That is the whole trick and it is one line.

**Consequence for OUR site, and it is not small:** their `--color-bg` is opaque, so the punch
works. Ours is `--color-panel: rgba(28,26,24,.55)` over a LIVE THREE.JS SCENE. A circle filled with
a 55% panel colour over a moving scene does not read as a hole punched in a border - it reads as a
translucent disc, and the scene moves through it. Either the orb takes `--color-panel-solid`
(`#1c1a18`) while the card stays translucent, or the punch has to be a real cutout. **This needs
deciding before it is built, and it is not a taste question.**

## Three things measured that are NOT worth taking

1. **`#999` grey.** The border and the icon strokes are both `#999`. Under the palette law that is
   dead colour on a warm site. The earlier verifier flagged this and it is confirmed from source.
2. **Stock Tabler icons.** `warning.svg` is Tabler's `alert-circle`, verbatim, `stroke="#999"`,
   `stroke-width="2"`. Fetched and checked.
3. **`border-radius: var(--border-radius)` is a DEAD TOKEN.** The file defines
   `--border-radius-medium: 0.3rem` and `--border-radius-small: 0.1875rem`, and never
   `--border-radius`. So the declaration resolves to nothing and the aside renders SQUARE.
   Convenient rather than awkward: our shape pass squares corners anyway (D20).

## Rod's modification

*"move it to the top right instead maybe."* Mechanically that is `inset-inline-end` in place of
`inset-inline-start` with the same negative-half-size offset, and the `padding-inline-start:
var(--space-l-xl)` reservation moves to `padding-inline-end`. **`inset-block-start: 1em` is the
open part** - "top right" could mean their same 1em drop on the other side, or the corner proper
(which needs BOTH insets negative and lands the orb diagonally on the corner). The first keeps
their geometry; the second is a different object. **Ask.**

## Measured after building it: the orb is an ELLIPSE, and it is probably their bug

`inline-size: var(--size)` is `2.25em`, but `block-size` is hard-coded `2.15em` and does **not**
use `--size`. So the "circle" is **4.6% wider than it is tall**. Measured in our build, which is
their geometry verbatim: **42.22 x 40.34px**.

They declare `--size` and then only half-use it, which reads as an oversight rather than a choice.
**Flagged, not silently fixed** - our build inherits the ellipse so the transcription stays honest.
Making it a true circle is a one-word change (`block-size: var(--size)`) and it is Rod's call.

**A second sub-pixel note, so nobody re-finds it as a bug:** the orb's centre lands 0.105px off the
border line's centre. `--border-width: 0.2rem` = 3.2px, which the browser rounds to a **3px** used
border while `calc()` keeps the full 3.2px. Their own code does exactly the same thing. A tenth of
a pixel, invisible, and correct-as-transcribed.
