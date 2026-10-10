# Comments removed from `_javascript/three-background-minimal.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Tiny floating embers ONLY (white-yellow, organic flutter) — the edge lanterns the previous`

```text
Three.js Minimal — Ambient background for post pages and every section page.
```

### Line 2, above `// comment described were removed and only this note survived them. No fireworks, no water, no FBX.`

```text
Tiny floating embers ONLY (white-yellow, organic flutter) — the edge lanterns the previous
```

### Line 3, above `// Scroll-locked camera, mouse avoidance.`

```text
comment described were removed and only this note survived them. No fireworks, no water, no FBX.
```

### Line 4, above `import * as THREE from 'three';`

```text
Scroll-locked camera, mouse avoidance.
```

### Line 22, above `const lanternController = new LanternController(CONFIG, camera, {`

```text
Mouse avoidance enabled — stronger displacement than lanterns
```

### Line 30, above `camera.position.z = 1500;`

```text
Push camera far back so everything appears small and distant
```

### Line 38, above `function spawnElements() {`

```text
Defer spawning until page content is fully laid out
```

### Line 47, above `for (let i = 0; i < EMBER_COUNT; i++) {`

```text
--- Embers: white-yellow, organic flutter ---
```

### Line 63, above `x = (Math.random() - 0.5) * 1800;`

```text
Spread evenly across the full viewport width
```

### Line 77, above `setupScrollLockedCamera(camera);   /* side effect only, nothing reads the handle */`

```text
Scroll-locked camera — embers drift as user reads
```

### Line 78, on the line `setupScrollLockedCamera(camera);`

```text
side effect only, nothing reads the handle
```

### Line 80, above `setupResizeHandler(camera, renderer, composer, lanternController);`

```text
Resize
```

### Line 83, above `startAnimationLoop(renderer, composer, [`

```text
Animation loop (no fireworks)
```

### Line 89, above `window.scene = scene;`

```text
Debug globals
```
