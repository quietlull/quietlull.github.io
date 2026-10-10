# Comments removed from `_javascript/modules/components/fireworks-toggle.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// The greeting belongs to the top of the page, so it ends on the first real scroll gesture.`

```text
Owns the automatic firework stream.
  GREETING — the calm welcome at the top of the page. Always on, no switch: it stops once you
             scroll past the top and resumes when you come back.

There used to be a second REWARD stream, switched on by the Pyrotechnician achievement and
driven by a `#fireworks-toggle` switch in the old top bar. Rod scrapped every achievement
reward (D28), and the new bar never rendered the switch, so the stream, the switch and the
saved on/off setting were all deleted on 2026-08-31. The achievement itself still unlocks.

Relies on window.fireworkController being exposed by three-background.js.

NAME: the file and its export are still called "toggle" because there is no toggle left to
name them after. Renaming them is a follow-up (it touches _includes/chrome-scripts.html).
```

### Line 17, above `const GATE_FRACTION = 0.3;`

```text
The greeting belongs to the top of the page, so it ends on the first real scroll gesture.
```

### Line 20, above `// there allocated a fresh query object per scroll tick.`

```text
One MediaQueryList for the page. apply() runs on every scroll event, and calling matchMedia
```

### Line 21, above `const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');`

```text
there allocated a fresh query object per scroll tick.
```

### Line 39, above `function whenControllerReady(fn) {`

```text
three-background.js loads async, so the controller may not exist yet on first call.
```

### Line 52, above `setTimeout(() => clearInterval(check), 10000);`

```text
Give up after 10 seconds
```
