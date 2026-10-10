# Comments removed from `_javascript/shader/mirroredSurface.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 3, above `export class MirroredSurface {`

```text
Water mirror surface for the About-page dock scene. Planar reflection + a NO-LIGHTING water look (the scene uses flat
materials, so nothing here adds a real light). The depth/wave read comes from the SHADING (a normal embossed by a fake
directional light), not from displacement:
  - procedural snoise HEIGHT field -> central-difference gradient = slope (uProcNoise=1 default)
  - uRidge: 1 - abs(height) creases the smooth hills into SHARP ridge lines, so the directional light embosses real crests
  - (1) distance-attenuated reflection-UV distortion (three.js Water / ameen)
  - (2) Fresnel depth: blend reflection toward dark uWaterColor by view angle (geometric, no light)
  - (3) fake directional light (darken-biased): broad wave shading from a CONSTANT sun direction (no scene light)
  - (6) click ripples: expanding wave-packets (ldBXDD) feeding the reflection AND the shading normal
`spawnRipple(worldPoint)` + `getActiveRipple()` drive interaction (e.g. the character's "watch the water" head-look).
Provenance: original planar reflection = Rod; distortion/Fresnel/directional = three.js examples Water.js + ameen-abdullah.dev;
ridge = standard ridged-noise; ripple = Godot/Shadertoy ldBXDD; snoise = Ashima/Gustavson (public domain). Reworked in the
lab water track (see redesign-lab/water-CHANGELOG.md).
```

### Line 42, above `this.reflectionScale = options.reflectionScale ?? 0.25;`

```text
Quarter resolution (Rod: 0.5 on 2026-08-21, then 0.25 on 2026-08-22). This target renders the
      ENTIRE scene a SECOND time every frame, so it is the second biggest fragment cost after bloom.
      The reflection is read through a distorted, fresnel-blended UV on a moving water surface, so
      the detail it loses is detail the water shader was already destroying - and since 08-22 the
      paper filter masks the rest.
      NOTE this scales window.innerWidth (CSS pixels), NOT the drawing buffer, so it does NOT
      compound with the renderer's pixel ratio the way the bloom scale does. At dpr 0.5 the
      reflection lands at half the canvas, not a quarter. The tuner does the same arithmetic, so
      what Rod judged is what ships - but change one and the other will not follow.
```

### Line 272, on the line `uNoiseSpace: { value: 1.0 }, uWorldScale: { value: 0.0082 },`

```text
Rod-tuned (procedural)
```

### Line 273, on the line `uProcNoise: { value: 1.0 },`

```text
default = procedural (Rod trying it for big artifact-free waves)
```

### Line 274, above `uUseOriginal: { value: 0.0 },`

```text
version: default to COMBINED so the new water shows on load (Version dropdown switches it)
```

### Line 277, on the line `uRidge: { value: 1.0 },`

```text
Rod-tuned: sharp crests
```

### Line 279, above `// to zero back when bloom was the lighting rig; with the sky doing that job the crest lift is`

```text
uSunLift 0.2 -> 1.5 (Rod, 2026-08-21), the top of the tuner's range. It was dialled almost
```

### Line 280, above `// real moonlight now. It multiplies uSunDiffuse, so crests gain 0.13 * 1.5 = 0.195 of uSunColor2.`

```text
to zero back when bloom was the lighting rig; with the sky doing that job the crest lift is
```

### Line 281, above `uSunDiffuse: { value: 0.13 }, uSunLift: { value: 1.5 }, uSunDir2: { value: new THREE.Vector3(0.4, 0.5, 0.3).no`

```text
real moonlight now. It multiplies uSunDiffuse, so crests gain 0.13 * 1.5 = 0.195 of uSunColor2.
```

### Line 282, on the line `uSunDiffuse: { value: 0.13 }, uSunLift: { value: 1.5 }, uSunDir2: { value: new THREE.Vector3(0.4, 0.5, 0.3).no`

```text
moonlight (cool blue-white)
```

### Line 284, on the line `uRippleStart: { value: new Array(16).fill(-1000.0) },`

```text
far-past = inactive
```

### Line 287, on the line `uRippleAlive: { value: 0.0 }`

```text
owned by update(); starts dead
```

### Line 300, above `this.material.uniforms.uRippleAlive.value = this.getActiveRipple() ? 1.0 : 0.0;`

```text
Every ripple shares one lifetime, so the newest is the last to die. Set before the frustum
      early-return below, so the flag cannot go stale while the water is off-screen.
```

### Line 315, above `if (this.mirrorPlane.material && this.mirrorPlane.material.visible === false) return;`

```text
When the water is hidden (scene-mode's minimal tier sets material.visible = false) nothing
      ever samples the reflection texture, so the second full-scene render below was pure waste
      on every minimal-tier page. Zero pixel change: this only skips while the water is already
      invisible.
```

### Line 352, above `applyVersion(name) {`

```text
[Bob] preset switch — sets the per-effect strengths for one of the 6 versions. Returns the uniforms it changed.
```

### Line 368, above `// (same base as the shader's uTime). getActiveRipple() drives the character's "watch the water" head-look.`

```text
Spawn a ripple at a WORLD point (Vector3). Round-robins a 16-slot pool. Start time = the material's own clock
```

### Line 369, above `// THE ONLY legal way to start a ripple: writing uRippleStart directly leaves uRippleAlive at 0 and the`

```text
(same base as the shader's uTime). getActiveRipple() drives the character's "watch the water" head-look.
```

### Line 370, above `// shader's early-out swallows the ripple silently. Same reason getActiveRipple() must keep its exact window.`

```text
THE ONLY legal way to start a ripple: writing uRippleStart directly leaves uRippleAlive at 0 and the
```

### Line 371, above `spawnRipple(worldPoint) {`

```text
shader's early-out swallows the ripple silently. Same reason getActiveRipple() must keep its exact window.
```
