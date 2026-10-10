# Comments removed from `assets/js/components/drift-magnet.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `const MIN_VIEWPORT_WIDTH = 541;   // dennissnellenberg/tdesero touch guard (> 540px)`

```text
drift-magnet — the ambient-drift + cursor-magnetism BASE.
  All drifting/magnetic elements (buttons, socials, favicon, nav) derive from this one engine.

  PROVENANCE (Remixed):
  - 2-axis ambient drift: breakdance4fun.supadezign GSAP floating recipe (independent-axis sine,
    ease sine.inOut, yoyo) -> ported to vanilla rAF as two desynced sines (refs-floating-and-palette.md).
  - cursor magnetism: dennissnellenberg.com/work (tdesero pattern, codepen.io/tdesero/pen/RmoxQg):
    normalized-offset * data-strength; inner text * data-strength-text (sources/dennissnellenberg-buttons.md).
  - lerp engine: chriskalafatis.com (rAF + lerp, no GSAP/jQuery dependency).
  - orchestration RULES (magnet fully overrides drift; motion-off is graceful, never mid-drift):
    Rod (Idea = mine).

  Hooks:
    .js-magnetic        cursor-stick      (data-strength, data-strength-text)
    [data-drift]        ambient drift     (value = amplitude px; data-drift-speed = multiplier)
    .js-magnetic-inner  optional inner parallax layer (e.g. label / glyph)
    data-magnet-clamp   cap magnet offset in px (e.g. favicon "can't escape its box")

  Motion gate: body.motion-off (set by the motion toggle / prefers-reduced-motion) ramps drift back
  to origin and suspends magnetism GRACEFULLY -- it finishes the return before it stops, so nothing
  freezes at an awkward offset mid-drift.
```

### Line 23, on the line `const MIN_VIEWPORT_WIDTH = 541;`

```text
dennissnellenberg/tdesero touch guard (> 540px)
```

### Line 24, on the line `const MAGNET_LERP = 0.12;`

```text
cursor-follow speed
```

### Line 25, on the line `const BLEND_LERP = 0.12;`

```text
drift <-> magnet handoff speed
```

### Line 26, on the line `const DRIFT_LEVEL_LERP = 0.05;`

```text
graceful ramp of ambient drift on/off (slow = no pop)
```

### Line 30, on the line `const DEFAULT_DRIFT_AMP = 6;`

```text
px
```

### Line 47, above `function onScreenVisible(entry) {`

```text
activation culling: an off-screen element does no work. body.cull-off disables culling so the
  cost difference is visible (and so culling can be turned off globally if ever needed).
```

### Line 60, above `const axis = (v) => (v === undefined || v === '' ? base : Number(v));`

```text
`??` NOT `||`, fixed 2026-08-24. `Number("0") || base` is `base`, so a deliberate
    `data-drift-y="0"` silently fell back to the DEFAULT_DRIFT_AMP of 6 - the engine could not be
    told "move on one axis only". Caught building the portal's horizontal-only drift, where the
    vertical budget is measured at ZERO on short viewports: two window pairs there are held apart
    by their vertical gap alone and 6px of it would have closed them.
    A zero amplitude is a legitimate value; only an ABSENT attribute should fall back.
```

### Line 77, above `return {`

```text
will-change is set ONLY while moving (see tick) and cleared on settle -> no permanent layers
```

### Line 88, above `speedX: drift.speedX,`

```text
independent-speed sines -> Lissajous wander (breakdance: speedx != speedy). Per-element random
      phase + slight amplitude jitter so siblings never sync.
```

### Line 101, on the line `blend: 0,`

```text
0 = pure drift, 1 = pure magnet
```

### Line 102, on the line `driftLevel: drift.ampX > 0 || drift.ampY > 0 ? 1 : 0,`

```text
graceful ramp 0..1
```

### Line 103, on the line `onScreen: true,`

```text
set by the cull IntersectionObserver
```

### Line 104, on the line `promoted: false,`

```text
true while will-change:transform is applied
```

### Line 117, above `if (cullObserver) {`

```text
element was removed (e.g. bench remount) -> prune so it can GC and the loop stays lean
```

### Line 132, on the line `continue;`

```text
off-screen + at rest -> zero cost (activation culling)
```

### Line 148, above `const x = driftX * (1 - e.blend) + e.magX * e.blend;`

```text
magnet fully overrides drift at blend = 1
```

### Line 158, above `if (moving) {`

```text
THE TRANSLATE LANE. Rod 2026-08-25, approving the transform-lane rule as part of the cleanup.
      This used to write `transform`, which is the single property magnet, drift, tilt and every
      hover scale all reached for - so on any element carrying two of them the last writer silently
      won and the others did nothing. It had already forced `achievement-wall.js` to hardcode
      knowledge of a hover scale inside its tilt, which is exactly the coupling being removed.
      `translate` is its own property. The browser applies translate, then rotate, then scale, then
      transform, in that fixed order, always - so a movement behaviour and a size behaviour and a
      tilt now compose with no coordination at all.
      `will-change` names `translate` to match: promoting `transform` would promote a property this
      code no longer writes.
```

### Line 170, on the line `e.element.style.willChange = 'translate';`

```text
promote ONLY while moving (frees mobile GPU memory)
```

### Line 180, on the line `e.element.style.translate = 'none';`

```text
settled -> drop the compositor layer
```

### Line 196, on the line `rafId = null;`

```text
nothing visible drifting and nothing settling -> sleep
```

### Line 232, above `function bindClickFlash(element) {`

```text
click border-flash: the phojanecki outline-ripple (button-kit/tags hover effect) fired on CLICK.
  outline + box-shadow paint outside the box, so a social's own overflow:hidden does NOT clip them.
```

### Line 237, on the line `void element.offsetWidth;`

```text
force reflow so the animation restarts on a repeat click
```

### Line 247, above `export function retune(element) {`

```text
live re-read of an element's tunables (data-strength / -text / -drift[-x/-y] / -drift-speed) so a
  tuner can change them without a reload. No-op if the element was never registered.
```

### Line 271, on the line `document.body.classList.add('motion-off');`

```text
Rule 89: respect the OS preference by default
```

### Line 273, above `new MutationObserver(() => wake()).observe(document.body, {`

```text
re-evaluate when the motion / cull toggles flip a body class
```

### Line 278, above `cullObserver = new IntersectionObserver(`

```text
activation culling: track which elements are on-screen (+200px buffer)
```

### Line 299, above `'.js-magnetic, [data-drift], [data-drift-x], [data-drift-y]').forEach((el) => {`

```text
The axis attributes were readable but not COLLECTABLE: `readDrift` has understood
      `data-drift-x` / `data-drift-y` all along, but this selector only looked for `[data-drift]`,
      so an element carrying axes alone was never picked up and simply did not move. Found wiring
      the portal's horizontal-only drift - the attributes were on all 8 windows and travel measured
      exactly 0 on both axes.
```

### Line 323, above `const motionBtn = root.querySelector('[data-motion-toggle]');`

```text
demo-only control; in production the motion switch is the repurposed slap toggle (body.motion-off)
```
