# Comments removed from `_javascript/three-shared.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// Each entry file (full/standard/minimal) imports what it needs from here.`

```text
Shared Three.js scene utilities — common to all preset entry files.
```

### Line 2, above `import * as THREE from 'three';`

```text
Each entry file (full/standard/minimal) imports what it needs from here.
```

### Line 12, above `// Scene + renderer + bloom`

```text
---------------------------------------------------------------------------
```

### Line 13, above `// ---------------------------------------------------------------------------`

```text
Scene + renderer + bloom
```

### Line 14, above `export function createBaseScene() {`

```text
---------------------------------------------------------------------------
```

### Line 18, above `scene.background = new THREE.Color(0x162237);`

```text
Raised from 0x080f1b on 2026-08-21 (Rod). The scene has no lights at all and the water is a
    mirror, so a near-black sky gave a near-black water and bloom was the only thing making the
    scene readable. The sky IS the lighting until request #40 lands.
```

### Line 28, above `const renderer = new THREE.WebGLRenderer({ antialias: false });`

```text
antialias:false is deliberate, not an oversight. The scene never renders to the default
    framebuffer - EffectComposer renders into its own WebGLRenderTarget, which carries no MSAA -
    so the flag antialiased nothing while still allocating a multisampled backbuffer. Removing it
    is a pure saving. (2026-08-18, measured under software rasterisation.)
```

### Line 33, above `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 0.5));`

```text
Capped at 0.5 (Rod, 2026-08-22; was 1, before that 1.5). This is a FRAGMENT lever and fragments
    are the whole cost here: the scene is 27 draw calls and 733 triangles, so nothing about it is
    geometry-bound. Half ratio shades a QUARTER of the pixels in every pass.
    It is only acceptable because of the paper filter - at 0.5 the scene is visibly soft on its own,
    and the paper grain is what turns that softness into a deliberate print look rather than a
    rendering fault. Do not raise the paper amount and this together without re-judging both.
    NOTE this must stay ABOVE the EffectComposer construction below: the composer captures the
    renderer's pixel ratio once, at construction, and never re-reads it.
```

### Line 44, above `const composer = new EffectComposer(renderer);`

```text
Post-processing bloom (identical on all pages)
```

### Line 47, above `const paper = CONFIG.lanterns.paper;`

```text
Dual Kawase, two levels, no bright pass (D23). Bloom runs at HALF resolution: it is a blur
    chain, so its output is low-frequency by definition and halving the buffer costs roughly a
    quarter of the fragments for a difference that is very hard to see.
    NOTE the size argument is the FULL frame, not the halved one UnrealBloomPass wanted. This pass
    applies CONFIG.lanterns.bloom.scale itself inside setSize, so it STAYS at half resolution
    after a window resize instead of being promoted to full by composer.setSize().
```

### Line 68, above `const paperLoader = new THREE.TextureLoader();`

```text
Loaded here rather than inside the pass so the pass never owns an asset path. Both sheets are
    baked normal+height maps; see assets/tex/ and the generator note in DECISIONS D24.
```

### Line 75, above `const canvas = renderer.domElement;`

```text
Canvas as fixed background
```

### Line 86, above `const vignette = document.createElement('div');`

```text
Vignette overlay
```

### Line 102, above `// Responsive helpers`

```text
---------------------------------------------------------------------------
```

### Line 103, above `// ---------------------------------------------------------------------------`

```text
Responsive helpers
```

### Line 104, above `export function updateCameraFOV(camera) {`

```text
---------------------------------------------------------------------------
```

### Line 118, above `// FBX loaders`

```text
---------------------------------------------------------------------------
```

### Line 119, above `// ---------------------------------------------------------------------------`

```text
FBX loaders
```

### Line 120, above `export function loadLanternsFBX(`

```text
---------------------------------------------------------------------------
```

### Line 168, above `// Camera modes`

```text
---------------------------------------------------------------------------
```

### Line 169, above `// ---------------------------------------------------------------------------`

```text
Camera modes
```

### Line 170, above `export function setupScrollCamera(camera) {`

```text
---------------------------------------------------------------------------
```

### Line 194, above `requestAnimationFrame(() => {`

```text
ResizeObserver handles all timing: fonts, images, reflow, page transitions
```

### Line 212, above `// Resize handler`

```text
---------------------------------------------------------------------------
```

### Line 213, above `// ---------------------------------------------------------------------------`

```text
Resize handler
```

### Line 214, above `export function setupResizeHandler(`

```text
---------------------------------------------------------------------------
```

### Line 238, above `// Procedural lantern spawning (general/minimal — no FBX needed)`

```text
---------------------------------------------------------------------------
```

### Line 239, above `// ---------------------------------------------------------------------------`

```text
Procedural lantern spawning (general/minimal — no FBX needed)
```

### Line 240, above `export function spawnProceduralLanterns(`

```text
---------------------------------------------------------------------------
```

### Line 259, above `let x, y, z;`

```text
Distribute: 80% in far side margins, 20% deep behind content
```

### Line 262, above `const side = Math.random() > 0.5 ? 1 : -1;`

```text
Side margins — far outside the content column
```

### Line 268, above `x = (Math.random() - 0.5) * 500;`

```text
Behind content — very deep, dim from distance
```

### Line 282, above `// Screen-to-world coordinate conversion`

```text
---------------------------------------------------------------------------
```

### Line 283, above `// ---------------------------------------------------------------------------`

```text
Screen-to-world coordinate conversion
```

### Line 284, above `/**`

```text
---------------------------------------------------------------------------
```

### Line 286, above `export function screenToWorldMapper(camera) {`

```text
Convert a pixel value to world units at a given Z depth for a perspective camera.
Returns { worldPerPixelX, worldPerPixelY, screenToWorldX(px), screenToWorldY(px) }
```

### Line 292, on the line `const z = camera.position.z;`

```text
distance from camera to z=0 plane
```

### Line 301, above `screenToWorldX(px) { return (px - window.innerWidth / 2) * wppX; },`

```text
Screen pixel (client coords) → world XY at z=0
```

### Line 309, above `// Scroll-locked camera (Y only, no rotation)`

```text
---------------------------------------------------------------------------
```

### Line 310, above `// ---------------------------------------------------------------------------`

```text
Scroll-locked camera (Y only, no rotation)
```

### Line 311, above `export function setupScrollLockedCamera(camera) {`

```text
---------------------------------------------------------------------------
```

### Line 332, above `// Animation loop`

```text
---------------------------------------------------------------------------
```

### Line 333, above `// ---------------------------------------------------------------------------`

```text
Animation loop
```

### Line 334, above `export function startAnimationLoop(renderer, composer, updatables) {`

```text
---------------------------------------------------------------------------
```

### Line 355, above `lastTime = performance.now();`

```text
Reset lastTime so normalizedDelta doesn't spike with the gap since pause.
```

### Line 366, above `// separately (instead of each calling start/stop) prevents a hidden tab from being resumed by the`

```text
Render only when BOTH the tab is visible AND the canvas is on-screen. Tracking the two states
```

### Line 367, above `// intersection observer — output is identical whenever it's actually visible.`

```text
separately (instead of each calling start/stop) prevents a hidden tab from being resumed by the
```

### Line 368, above `let pageVisible = !document.hidden;`

```text
intersection observer — output is identical whenever it's actually visible.
```

### Line 370, on the line `let canvasOnScreen = true;`

```text
assumed until the observer reports; the observer drives the first start
```

### Line 382, above `// on long article pages where the background is usually not visible.`

```text
Also pause when the canvas is scrolled fully off-screen. Saves cycles
```

### Line 383, above `const canvas = renderer.domElement;`

```text
on long article pages where the background is usually not visible.
```
