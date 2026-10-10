# Comments removed from `_javascript/modules/components/mouse-trail.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `import { STORAGE_KEYS } from '../config/storage-keys';`

```text
Mouse trail sparkler — night-market sparkler cursor effect.
Canvas2D overlay with additive blending, motion-blur lines,
life-based color gradient (white-hot → amber → deep orange).
Ring buffer pool for zero GC. Speed-based emission scaling.
Reactive: scroll sparks, color pickup from hovered elements.
Toggle via topbar switch, persisted in localStorage.
Mobile: touch burst. Respects prefers-reduced-motion.
```

### Line 23, above `const THEME_DEFAULT = {`

```text
Default amber theme — hot stays warm gold, never white
```

### Line 29, above `import { parseRGB, isWarmColor } from '../utils/color-utils';`

```text
── Color sampling utilities (shared via utils/color-utils) ──
```

### Line 35, above `//    walk that sniffed for a breathing animation; breathing is gone, so the walk went with it.`

```text
1. Check interactive ancestors (buttons, links, cards). This used to be step 2, behind a
```

### Line 36, above `const interactive = el.closest(INTERACTIVE_SELECTOR);`

```text
walk that sniffed for a breathing animation; breathing is gone, so the walk went with it.
```

### Line 46, above `const style = getComputedStyle(el);`

```text
2. Finally check the element itself
```

### Line 59, above `return {`

```text
Hot stays warm-tinted: boost red most, green less, blue barely
```

### Line 68, above `export function initMouseTrail() {`

```text
── Main sparkler ──
```

### Line 73, above `const toggle = document.getElementById('sparkler-toggle');`

```text
Toggle setup
```

### Line 81, above `const canvas = document.createElement('canvas');`

```text
Canvas setup
```

### Line 89, above `const pool = Array.from({ length: MAX_PARTICLES }, () => ({`

```text
Ring buffer pool
```

### Line 100, on the line `let mouseMoving = false;`

```text
true only while cursor is actively moving
```

### Line 175, above `// Hoist out of the per-particle loop (was up to 2*MAX_PARTICLES`

```text
delta is constant across the frame, so these are loop-invariant.
```

### Line 176, above `// Math.pow calls/frame; now 1). Bit-identical math.`

```text
Hoist out of the per-particle loop (was up to 2*MAX_PARTICLES
```

### Line 177, above `const dragFactor = Math.pow(DRAG, delta);`

```text
Math.pow calls/frame; now 1). Bit-identical math.
```

### Line 218, above `if (mouseMoving) {`

```text
Sparkler tip — jagged radial streaks (only while cursor is moving)
```

### Line 256, above `document.addEventListener('mouseenter', () => {`

```text
Track mouse presence — loop starts on movement, not just entering
```

### Line 267, above `//`

```text
Desktop: speed-based emission + color sampling on mousemove
```

### Line 268, above `// Perf notes:`

```text

```

### Line 269, above `// - Position (mouseX/mouseY) updates on EVERY event so the sparkler tip`

```text
Perf notes:
```

### Line 270, above `//   tracks the real cursor on 120/144Hz monitors. Previously this was`

```text
- Position (mouseX/mouseY) updates on EVERY event so the sparkler tip
```

### Line 271, above `//   behind a 16ms throttle, halving the effective sample rate.`

```text
tracks the real cursor on 120/144Hz monitors. Previously this was
```

### Line 272, above `// - Color sampling (getComputedStyle + elementFromPoint) is deferred to`

```text
behind a 16ms throttle, halving the effective sample rate.
```

### Line 273, above `//   rAF so it never blocks the mousemove event thread. Sync sampling`

```text
- Color sampling (getComputedStyle + elementFromPoint) is deferred to
```

### Line 274, above `//   was the #1 source of "feels laggy" input latency.`

```text
rAF so it never blocks the mousemove event thread. Sync sampling
```

### Line 275, above `let lastEmitTime = 0;`

```text
was the #1 source of "feels laggy" input latency.
```

### Line 281, on the line `const COLOR_SAMPLE_MIN_MOVE_SQ = 144;`

```text
~12px — skip sample if barely moved
```

### Line 304, above `// real cursor at display refresh rate for the site to feel responsive.`

```text
Update position EVERY event — the sparkler tip needs to track the
```

### Line 305, above `mouseX = e.clientX;`

```text
real cursor at display refresh rate for the site to feel responsive.
```

### Line 309, above `// so the synchronous getComputedStyle/elementFromPoint cost doesn't`

```text
Schedule color sampling off the event thread. rAF runs after paint
```

### Line 310, above `// inflate input latency.`

```text
so the synchronous getComputedStyle/elementFromPoint cost doesn't
```

### Line 311, above `if (!colorSampleScheduled) {`

```text
inflate input latency.
```

### Line 317, above `// on high-refresh-rate displays. This gate is on EMISSION only, not`

```text
Gate particle emission to ~60Hz so we don't spawn too many particles
```

### Line 318, above `// position — the tip still updates every event.`

```text
on high-refresh-rate displays. This gate is on EMISSION only, not
```

### Line 319, above `const now = performance.now();`

```text
position — the tip still updates every event.
```

### Line 332, above `// after 1px of movement, at 0.5 per pixel. Was 2px / 0.4.`

```text
Rod's tune, approved on the lab bench 2026-08 and ported here 2026-08-31: sparks start
```

### Line 333, above `if (speed > 1) {`

```text
after 1px of movement, at 0.5 per pixel. Was 2px / 0.4.
```

### Line 343, above `let lastScrollY = window.scrollY;`

```text
Scroll sparks — emit at cursor position based on scroll speed
```

### Line 355, above `document.addEventListener('touchstart', (e) => {`

```text
Mobile: burst on touch
```

### Line 361, above `window.sparklerBurst = (x, y) => {`

```text
Expose burst for page transitions
```
