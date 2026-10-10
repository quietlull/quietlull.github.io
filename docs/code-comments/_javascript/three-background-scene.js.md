# Comments removed from `_javascript/three-background-scene.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// The scene IS the main focus here. Water, dock, scroll camera, fireworks,`

```text
Three.js Scene — About page
```

### Line 2, above `// mouse avoidance, lanterns — the full interactive experience.`

```text
The scene IS the main focus here. Water, dock, scroll camera, fireworks,
```

### Line 3, above `import * as THREE from 'three';`

```text
mouse avoidance, lanterns — the full interactive experience.
```

### Line 33, above `loadLanternsFBX(fbxLoader, scene, lanternController, lanternMaterialManager);`

```text
Load all scene elements
```

### Line 37, above `let mirroredSurface = null;`

```text
Water with mirror reflection
```

### Line 52, on the line `waveSpeed: 1.5,`

```text
[water rework] procedural-noise animation speed (CONFIG default 0.1 was for the old shader)
```

### Line 59, above `mirroredSurface.mirrorPlane.visible = false;`

```text
Pre-warm: compile shader now to avoid first-scroll lag spike
```

### Line 66, above `// drag-vs-click guarded. The ripple feeds the reflection + the wave shading; getActiveRipple() drives the cha`

```text
Click the water -> ripple (water rework). Raycast the water MESH (so only clicks on the visible water ripple it),
```

### Line 67, above `const _rRay = new THREE.Raycaster(), _rNdc = new THREE.Vector2();`

```text
drag-vs-click guarded. The ripple feeds the reflection + the wave shading; getActiveRipple() drives the character look.
```

### Line 80, above `window.mirroredSurface = mirroredSurface;`

```text
Expose for the character's "watch the water" head-look (getActiveRipple) + debugging.
```

### Line 84, above `const EMBER_COUNT = 25;`

```text
Embers — white-yellow fireflies with organic, alive movement
```

### Line 112, above `const { updateScrollHeight } = setupScrollCamera(camera);`

```text
Scroll-based camera
```

### Line 115, above `setupResizeHandler(camera, renderer, composer, lanternController, {`

```text
Resize
```

### Line 121, above `startAnimationLoop(renderer, composer, [`

```text
Animation loop
```

### Line 129, above `window.scene = scene;`

```text
Debug globals
```

### Line 139, above `// It owns the bloom chain's targets. mirroredSurface is already exposed further down; it owns the`

```text
composer added 2026-08-18 so redesign-lab/scene-tuner.html can drive render-target sizes live.
```

### Line 140, above `// half-window reflection target that renders the whole scene a SECOND time every frame.`

```text
It owns the bloom chain's targets. mirroredSurface is already exposed further down; it owns the
```

### Line 141, above `window.composer = composer;`

```text
half-window reflection target that renders the whole scene a SECOND time every frame.
```

### Line 143, above `// is gone - Kawase won (D23) and is built by three-shared.js. Debug-only, like every line around it.`

```text
THREE itself, for poking at materials from the console. The runtime bloom A/B this was added for
```

### Line 144, above `window.THREE = THREE;`

```text
is gone - Kawase won (D23) and is built by three-shared.js. Debug-only, like every line around it.
```
