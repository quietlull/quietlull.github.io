# Comments removed from `_javascript/modules/components/card-tilt.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `const TILT_MAX = 8;          // max degrees of rotation`

```text
3D card tilt effect — cursor-driven on desktop, gyro on mobile.
Applies inline transform on mousemove, resets on mouseleave.
CSS hover transform acts as fallback when JS hasn't set a style.
```

### Line 7, on the line `const TILT_MAX = 8;`

```text
max degrees of rotation
```

### Line 8, on the line `const SCALE_HOVER = 1.02;`

```text
slight scale on hover
```

### Line 9, on the line `const LIFT_PX = 6;`

```text
translateY lift on hover
```

### Line 18, above `// Prevents cards from starting tilted when cursor is already over them at load.`

```text
Global gate: require real mouse movement before enabling tilt.
```

### Line 19, above `let tiltEnabled = false;`

```text
Prevents cards from starting tilted when cursor is already over them at load.
```

### Line 33, on the line `if (dx * dx + dy * dy > 16) {`

```text
4px movement threshold
```

### Line 40, above `const invalidators = [];`

```text
ONE shared scroll/resize listener invalidates every card's cached rect (was N per-card listeners).
```

### Line 52, above `// Invalidated on scroll/resize so tilt stays accurate if layout shifts.`

```text
Cache rect on mouseenter to avoid forced layout on every mousemove.
```

### Line 53, above `let cachedRect = null;`

```text
Invalidated on scroll/resize so tilt stays accurate if layout shifts.
```

### Line 67, above `if (!cachedRect) cachedRect = card.getBoundingClientRect();`

```text
Recompute rect only if the cache was invalidated (scroll/resize).
```

### Line 70, above `const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;`

```text
Normalise cursor position to -1..1 from card center
```

### Line 74, above `// rotateY: positive x moves right toward viewer`

```text
rotateX: negative y moves top toward viewer
```

### Line 75, above `const rotateX = -y * TILT_MAX;`

```text
rotateY: positive x moves right toward viewer
```

### Line 90, above `// initCardTilt calls this to invalidate the cache so the next mousemove re-reads once.`

```text
Layout can shift between mouseenter and mousemove. The shared scroll/resize listener in
```

### Line 91, above `return invalidateRect;`

```text
initCardTilt calls this to invalidate the cache so the next mousemove re-reads once.
```

### Line 98, above `// but fire beta=0/gamma=0 which causes all cards to tilt -8deg on load.`

```text
Only enable gyro tilt on touch devices — desktop browsers expose the API
```

### Line 99, above `const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;`

```text
but fire beta=0/gamma=0 which causes all cards to tilt -8deg on load.
```

### Line 103, above `const requestPermission = typeof DeviceOrientationEvent.requestPermission === 'function';`

```text
iOS 13+ requires permission
```

### Line 106, above `// Desktops/touchscreen laptops report constant beta=0, gamma=0 which`

```text
Require real device movement before enabling gyro tilt.
```

### Line 107, above `// would tilt every card -8deg on load.`

```text
Desktops/touchscreen laptops report constant beta=0, gamma=0 which
```

### Line 108, above `let gyroEnabled = false;`

```text
would tilt every card -8deg on load.
```

### Line 119, above `// and a subtler effect feels less twitchy. Also cap at half TILT_MAX.`

```text
Gyro tilt reduced vs desktop mouse tilt — mobile gyro input is noisier
```

### Line 120, above `const GYRO_MAX = TILT_MAX * 0.5;`

```text
and a subtler effect feels less twitchy. Also cap at half TILT_MAX.
```

### Line 127, above `if (card.matches(':hover')) return;`

```text
Only apply gyro when not being mouse-controlled
```

### Line 141, above `let permissionRequested = false;`

```text
Will be triggered by a user gesture (first touch)
```
