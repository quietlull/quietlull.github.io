# Filippo Ruffini — Corner-Bracket / Framing System

- **Source:** https://www.filipporuffini.com/ (Webflow site, dev: Federico Valla / vallafederico)
- **Asset (vars + bracket CSS):** inline `<style>` blocks in the page `<head>` / `.custom-corners.w-embed` embed
- **Asset (helper classes):** https://cdn.prod.website-files.com/643d4a3e40f13a5d541373e9/css/filippo-ruffini.webflow.98e69a3e9.css
- **Captured 2026-06-11**
- **Tier: True** (verbatim from live page source)

The signature look: thin 1px L-shaped brackets at each of the four corners of a block
(hero, image, menu link, custom cursor). The "frame" never has full edges — only the
corner elbows. Drawn with **pseudo-elements + one-sided borders**, sized by CSS variables
so the same markup scales from a 6.25rem hero frame down to a 0.5rem cursor frame.

---

## A. The CSS variables (verbatim, from page `:root`)

```css
:root {
  --app-height: 100%;
  --orange-color: #FD6746;
  --white: #ffffff;
  --black: #101010;
  --corners-large: 6.25rem;
  --corners-small: 3.125rem;
  --corner-style: 1px solid #333333;
  --corners-cursor: 0.5rem;
  --corners-hover: 1rem;
  --col-gap: 0.9375rem
}

@media screen and (max-width: 768px){
  :root {
    --corners-large: 3.75rem;
    --corners-small: 1.875rem;
  }
}

@media screen and (max-width: 479px){
  :root {
    --corners-large: 1.875rem;
  }
}
```

`--corner-style` is the single source of truth for the bracket line (`1px solid #333333`,
i.e. `--grey-tertiary`). Bracket arm length is `--corners-large/small/cursor/hover`.

---

## B. Pseudo-element bracket system (verbatim)

Markup: a positioned container holds two empty divs — `.corners__top` and `.corners__btm`.
Each div paints **two** corners via `::before` (left) and `::after` (right). Two divs = four
corners. Add `.is--small` to a div to shrink its arms.

```css
.corners__top::before{
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: var(--corners-large);
  height: var(--corners-large);
  border-top: var(--corner-style);
  border-left: var(--corner-style);
}

.corners__top::after{
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: var(--corners-large);
  height: var(--corners-large);
  border-top: var(--corner-style);
  border-right: var(--corner-style);
}

.corners__btm::before{
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: var(--corners-large);
  height: var(--corners-large);
  border-bottom: var(--corner-style);
  border-left: var(--corner-style);
}

.corners__btm::after{
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: var(--corners-large);
  height: var(--corners-large);
  border-bottom: var(--corner-style);
  border-right: var(--corner-style);
}

.corners__top.is--small::before,
.corners__top.is--small::after,
.corners__btm.is--small::before,
.corners__btm.is--small::after{
  width: var(--corners-small) !important;
  height: var(--corners-small) !important;
}
```

The matching positioning/wrapper rules from the main Webflow CSS (verbatim):

```css
.corners {
  width: 100%;
  height: 100%;
  padding: .9375rem;
  position: relative;
}
.corners.is--hero { height: 100%; }
.corners.height-auto { height: auto; }

.corners__top {
  position: absolute;
  top: 0%;
  bottom: auto;
  left: 0%;
  right: 0%;
}
.corners__btm {
  position: absolute;
  top: auto;
  bottom: 0%;
  left: 0%;
  right: 0%;
}
```

### Markup pattern (from page DOM)

```html
<div class="corners is--hero">
  <div class="corners__top"></div>
  <!-- ...content... -->
  <div class="corners__btm"></div>
</div>
```

---

## C. Custom-cursor variant (verbatim)

Same technique, smaller arms (`--corners-cursor`), and on hover the arms grow to
`--corners-hover`. This is how the crosshair/target cursor frame animates.

```css
.cursor-corners {
  width: 2rem;
  height: 2rem;
  transition: height .4s cubic-bezier(.77, 0, .175, 1), width .4s cubic-bezier(.77, 0, .175, 1);
  position: absolute;
}

.cursor-corners__top::before{
  content:""; position:absolute; left:0; top:0;
  width:var(--corners-cursor); height:var(--corners-cursor);
  border-top:var(--corner-style); border-left:var(--corner-style);
}
.cursor-corners__top::after{
  content:""; position:absolute; right:0; top:0;
  width:var(--corners-cursor); height:var(--corners-cursor);
  border-top:var(--corner-style); border-right:var(--corner-style);
}
.cursor-corners__btm::before{
  content:""; position:absolute; left:0; bottom:0;
  width:var(--corners-cursor); height:var(--corners-cursor);
  border-bottom:var(--corner-style); border-left:var(--corner-style);
}
.cursor-corners__btm::after{
  content:""; position:absolute; right:0; bottom:0;
  width:var(--corners-cursor); height:var(--corners-cursor);
  border-bottom:var(--corner-style); border-right:var(--corner-style);
}

/* grows on hover */
.cursor-e.is--hovering .cursor-corners { width: 5rem; height: 5rem; }
.cursor-e.is--hovering .cursor-corners__top::before,
.cursor-e.is--hovering .cursor-corners__top::after,
.cursor-e.is--hovering .cursor-corners__btm::before,
.cursor-e.is--hovering .cursor-corners__btm::after{
  width: var(--corners-hover) !important;
  height: var(--corners-hover) !important;
}
```

---

## D. Simpler 4-div border variant (verbatim, no pseudo-elements)

Webflow also ships a plainer version using **four absolutely-positioned divs**, each with
two borders. Easier to drop into any markup without the `__top/__btm` pattern. Two flavours:
`.p-corner` (2.5rem arms) and `.egg-corner` (0.625rem arms).

```css
.p-corners {
  width: 100%; height: 100%;
  position: absolute; top: 0%; bottom: 0%; left: 0%; right: 0%;
}
.p-corner { width: 2.5rem; height: 2.5rem; position: absolute; }
.p-corner.is--tl {
  border-top: 1px solid var(--grey-tertiary);
  border-left: 1px solid var(--grey-tertiary);
  top: 0%; bottom: auto; left: 0%; right: auto;
}
.p-corner.is--tr {
  border-top: 1px solid var(--grey-tertiary);
  border-right: 1px solid var(--grey-tertiary);
  top: 0%; bottom: auto; left: auto; right: 0%;
}
.p-corner.is--br {
  border-right: 1px solid var(--grey-tertiary);
  border-bottom: 1px solid var(--grey-tertiary);
  top: auto; bottom: 0%; left: auto; right: 0%;
}
.p-corner.is--bl {
  border-bottom: 1px solid var(--grey-tertiary);
  border-left: 1px solid var(--grey-tertiary);
  top: auto; bottom: 0%; left: 0%; right: auto;
}

/* tiny variant ("egg"), 0.625rem arms, grey-secondary line */
.egg-corners {
  width: 100%; height: 100%;
  position: absolute; top: 0%; bottom: 0%; left: 0%; right: 0%;
}
.egg-corner { width: .625rem; height: .625rem; position: absolute; }
.egg-corner.is--tl {
  border-top: 1px solid var(--grey-secondary);
  border-left: 1px solid var(--grey-secondary);
  top: 0%; bottom: auto; left: 0%; right: auto;
}
.egg-corner.is--tr {
  border-top: 1px solid var(--grey-secondary);
  border-right: 1px solid var(--grey-secondary);
  top: 0%; bottom: auto; left: auto; right: 0%;
}
.egg-corner.is--br {
  border-right: 1px solid var(--grey-secondary);
  border-bottom: 1px solid var(--grey-secondary);
  top: auto; bottom: 0%; left: auto; right: 0%;
}
.egg-corner.is--bl {
  border-bottom: 1px solid var(--grey-secondary);
  border-left: 1px solid var(--grey-secondary);
  top: auto; bottom: 0%; left: 0%; right: auto;
}
```

(`--grey-tertiary: #333`, `--grey-secondary: #777` from the main Webflow CSS `:root`.)

---

## Technique explanation

- A corner bracket = a square box that only draws **two adjacent borders** (e.g.
  `border-top` + `border-left` -> a top-left elbow). The box has no background, so only the
  two arms are visible.
- Position the box flush into a corner of its `position:relative` parent (`top:0;left:0`
  for TL, etc.). The arm length is just the box `width/height`.
- Drive every arm length and the line stroke from CSS variables, so one set of `:root`
  vars (changed at breakpoints) resizes every frame on the page consistently.
- **Pseudo-element version (B/C):** two empty divs, four `::before/::after` — minimal DOM,
  scales by changing one var. Best when the frame is "always all four corners."
- **4-div version (D):** explicit `.is--tl/tr/br/bl` divs — more DOM but lets you show/hide
  or animate individual corners and is trivial to hand-author.

### De-glow fit for Rod's site
These are flat 1px `#333` hairlines on near-black `#101010` — no glow, no fill. They read as
precise "registration marks / viewfinder" framing. For the lantern/festival palette, swap
`--corner-style` to a dim ember tone and they become quiet corner accents that don't compete
with the lantern glow (night needs darkness). Pair the small/cursor sizes with hover-grow for
an interactive viewfinder feel.
