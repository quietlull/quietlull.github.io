# Magnetic / Cursor-Attraction Effect (the CHEVRON pull)

- **Source URL:** https://chriskalafatis.com/main.js (bundle linked from https://chriskalafatis.com/)
- **Captured:** 2026-06-11
- **Tier: True** (verbatim from the live minified bundle — logic is fully legible, NOT deobfuscated/guessed)

This is the priority effect Rod loves. The effect is a **custom lerp-based magnetic pull**, NOT a library black box. The site loads GSAP (referenced as `bn` in the bundle; `bn.utils.interpolate` is GSAP's `interpolate`, which is just standard lerp `(1-t)*a + t*b`) and Three.js, but the magnetic math itself is the hand-written code below.

## Verbatim code (from main.js, minified)

The magnetic button class `update()` method, captured verbatim:

```js
// constructor sets up the magnetic state object:
this.mag = {
  x: { current: 0, target: 0, lerp: .1 },
  y: { current: 0, target: 0, lerp: .1 }
};
this.s = 0;

// ... per-frame update (t = pointer {x,y}, e = scroll offset):
update(t, e) {
  if (!this.inView) return;
  if (!this.b) return;
  this.s = e;
  const i = t.x, n = t.y, { left: r, top: s, width: a, height: o } = this.b;
  let h = 0, l = 0;
  // distance from cursor to element center (note n+e adds scroll to pointer Y):
  ((t, e, i, n) => { let r = t - i, s = e - n; return Math.hypot(r, s) })(i, n + e, r + a / 2, this.top + o / 2) < 1.25 * a
    ? (
        clearTimeout(this.timer),
        this.innerText && (this.innerText.style.opacity = 0, this.hoverArrow.style.opacity = 1),
        h = .3 * (i - (r + a / 2)),          // target X = 30% of the way to cursor
        l = .3 * (n + e - (this.top + o / 2)), // target Y = 30% of the way to cursor
        this.mag.x.target = h,
        this.mag.y.target = l
      )
    : this.timer = setTimeout(() => {
        this.innerText && (this.innerText.style.opacity = 1, this.hoverArrow.style.opacity = 0),
        this.mag.x.target *= .2,   // decay back toward rest
        this.mag.y.target *= .2
      }, 150);
  // smooth follow (lerp):
  this.mag.x.current = bn.utils.interpolate(this.mag.x.current, this.mag.x.target, this.mag.x.lerp);
  this.mag.y.current = bn.utils.interpolate(this.mag.y.current, this.mag.y.target, this.mag.y.lerp);
  // apply, with LAYERED PARALLAX depth:
  this.el.style.transform     = `translate3d(${this.mag.x.current}px, ${this.mag.y.current}px, 0)`;       // wrapper 1.0x
  this.inner    && (this.inner.style.transform     = `translate3d(${1.5 * this.mag.x.current}px, ${1.5 * this.mag.y.current}px, 0)`); // inner circle 1.5x
  this.arrow    && (this.arrow.style.transform     = `translate3d(${.8 * this.mag.x.current}px, ${.8 * this.mag.y.current}px, 0)`);  // SVG arrow/chevron 0.8x
  this.hoverArrow && (this.hoverArrow.style.transform = `translate3d(${.8 * this.mag.x.current}px, ${.8 * this.mag.y.current}px, 0)`);
  this.text && this.text.forEach(t => { t.style.transform = `translate3d(${.8 * this.mag.x.current}px, ${.8 * this.mag.y.current}px, 0)`; });
}
```

GSAP's `interpolate` used above is literally lerp:
```js
interpolate: function(e, i, n) { return (1 - n) * e + n * i; }
```

## Plain-English technique

1. **Activation by proximity.** Each frame, compute the distance (`Math.hypot`) from the cursor to the element's center. If the cursor is within `1.25 * elementWidth` of the center, the element is "magnetized." (Scroll offset `e` is added to the pointer Y so the hit-test stays correct on a scrolling/canvas-driven page.)
2. **Target = 30% toward the cursor.** When active, the target offset is `0.3 * (cursorX - centerX)` (and Y). So the element never reaches the cursor — it leans 30% of the way. This is what gives the gentle "pull," not a snap.
3. **Smooth follow via lerp.** Every frame `current = lerp(current, target, 0.1)` eases the actual transform toward the target. The `0.1` factor is the springiness — lower = laggier/floatier, higher = snappier.
4. **Release decay.** When the cursor leaves the radius, after a 150ms timeout the target is multiplied by `0.2` repeatedly, so it eases back to rest instead of snapping home.
5. **Layered parallax depth (the magic touch).** The same `current` value is applied at different multipliers to nested layers: wrapper at `1.0x`, inner circle at `1.5x`, and the **SVG arrow/chevron + text at `0.8x`**. Because the layers move at different rates, you get a subtle 3D "depth" feel as the button leans — this is why the chevron feels alive.
6. Hover state cross-fades `innerText` opacity 1->0 and a `mag_hover` arrow 0->1.

### Reproduction recipe (vanilla, no Three.js needed for the magnet)
- Track pointer (`mousemove`), keep `requestAnimationFrame` loop.
- Per magnetic element, cache `getBoundingClientRect()` (recache on resize/scroll).
- Apply steps 1-5 above. The whole effect is ~25 lines of vanilla JS + a `lerp(a,b,t)=(1-t)*a+t*b` helper. No GSAP required — GSAP here only supplies the lerp.
- Tunables to expose in the lab: `radius` (1.25*w), `strength` (0.3), `lerp` (0.1), and the per-layer parallax multipliers (1.5 / 0.8).

## DOM structure it expects (from the live markup + selectors in code)
The magnetic button queries these children:
- `.innerCircle canvas` (the round canvas behind the arrow)
- `.innerArrow svg` (the chevron SVG — see chriskalafatis-chevron-divider.md)
- `.btn_inner_text` and `p` (label text)
- `.mag_hover` (the hover-state arrow)
