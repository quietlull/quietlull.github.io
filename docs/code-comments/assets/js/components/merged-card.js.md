# Comments removed from `assets/js/components/merged-card.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `const TILT_MAX = 8;`

```text
merged-card behavior — VERBATIM port of merged card v2 (rework-harumaki.html lines 400-431):
  parallax z-layer tilt + dwell-flip + gyro tilt on touch. Changes vs source, per the contract:
  - scoped to a passed root (bench mounts/unmounts components);
  - dwell ring classes renamed on/fill -> is-on/is-filling (Rule 27 state prefixes);
  - the document-level "first mouse move arms tilt" guard kept as in source.
  Also wires the lab glass toggle (Rod: judge dropping the glass).
```

### Line 18, on the line `return;`

```text
idempotent: safe to re-run init after appending more cards
```

### Line 40, on the line `rect = tilt.getBoundingClientRect();`

```text
recompute each frame (one hovered card) -> no scroll listener needed
```

### Line 54, on the line `void ring.offsetWidth;`

```text
restart the conic fill animation
```

### Line 188, above `export function init(root = document) {`

```text
CARD COVER VIDEOS ARE NOT HANDLED HERE. `setupCardVideos` used to sit at this spot: it stripped
  `autoplay`, paused each cover, seeked it to a real poster frame and wired hover-to-play, all
  behind `if (!motionOff()) return;`. Two things were wrong with it, and it was deleted on
  2026-08-31. Its header claimed "the markup keeps `autoplay`" - `_includes/project-card.html:40`
  emits no autoplay at all, so nothing was auto-playing and the 2.2.2 pause path it existed to
  provide was already satisfied by the markup. And because it bailed whenever motion was on, the
  poster seek never ran on an ordinary visit, which is why every card video sat on a black frame.
  Pause, poster frame and hover-play now live in ONE place, `project-cards-expensive.js`, which is
  the only file that reaches this one.
```

### Line 207, above `let tiltEnabled = false;`

```text
source guard: tilt only arms after the cursor genuinely moves (avoids load-position jank)
```
