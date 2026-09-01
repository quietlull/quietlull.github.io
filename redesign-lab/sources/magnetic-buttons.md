# SOURCE: magnetic ("sticky") buttons — Rod-provided reverse-engineering (2026-06-12)

Rod researched and provided both implementations verbatim. This is the True-Code well for the
cursor-stick behavior specced for KIT and LIST in `final-picks.md`.

## Source A — chriskalafatis.com (custom engine)
- Class-based, no data attributes. Per-frame `update(mouse, scroll)` loop, `gsap.utils.interpolate`
  lerp with factor **0.1**.
- **Activation radius = 1.25 × button width** from button center (works without hovering the element).
- Pull strength = **0.3 ×** (cursor − center).
- Ease-out on exit: 150 ms timeout, then `target *= 0.2` decay.
- **Per-layer parallax multipliers**: whole button 1×, inner circle **1.5×**, arrow/text **0.8×**
  (`translate3d` per layer).
- Their wavy line separator = a SEPARATE Three.js shader (16×16 plane, fbm displacement via uMouse) —
  NOT the magnetic pattern; parked, not needed for kit/list.

```js
// heart of it (de-minified by Rod's research):
if (dist < 1.25 * width) {
  h = 0.3 * (mx - (left + width / 2));
  l = 0.3 * (my + e - (this.top + height / 2));
  this.mag.x.target = h; this.mag.y.target = l;
} else {
  this.timer = setTimeout(() => { this.mag.x.target *= 0.2; this.mag.y.target *= 0.2; }, 150);
}
this.mag.x.current = gsap.utils.interpolate(this.mag.x.current, this.mag.x.target, 0.1);
el.style.transform = `translate3d(${this.mag.x.current}px, ${this.mag.y.current}px, 0)`;
inner.style.transform = `translate3d(${1.5 * x}px, ${1.5 * y}px, 0)`;   // parallax in
text.style.transform  = `translate3d(${0.8 * x}px, ${0.8 * y}px, 0)`;   // parallax lag
```

## Source B — dennissnellenberg.com/work (tdesero pattern)
- Upstream credit IN THEIR SOURCE: **codepen.io/tdesero/pen/RmoxQg** (open CodePen).
- jQuery + GSAP 3.9.1. Markup hook: `class="magnetic" data-strength="50" data-strength-text="25"`.
- `mousemove` on the element itself → GSAP `to(…, 1.5s, Power4.easeOut)` toward
  `((cursor − left)/width − 0.5) × strength`; inner `.btn-text` same formula with the smaller
  `data-strength-text` (parallax).
- `mouseleave` → spring back with **Elastic.easeOut** (the bouncy release).
- Disabled at `window.innerWidth <= 540` (touch guard).
- Separate `.btn-fill` blob (border-radius 50%, 150%×200%, parked at translateY(-76%)) wipes up
  on enter — that part is their fill hover, independent of the magnet.

## Extraction decision (recorded for the ledger)
`extracted/components/magnetic/magnetic.js` = **Remixed**, parents A + B, both cited:
- API + math from B (tdesero): `data-strength` / `data-strength-text`, normalized offset formula,
  hover-bound activation, ≤540 px guard.
- Engine from A (chriskalafatis): rAF + lerp(0.1) loop instead of GSAP tweens — the site has no
  GSAP/jQuery dependency and isn't taking one for a button.
- DEVIATION (flagged): B's `Elastic.easeOut` bounce on release is approximated by the lerp ease-out;
  a true spring needs GSAP or hand-rolled spring physics. Revisit if Rod misses the bounce.
