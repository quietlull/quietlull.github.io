# Comments removed from `_javascript/firework-controller.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 3, above `export class FireworkController {`

```text
Firework Controller
Adapted from towrabbit's firework example
Integrated for lantern scene with camera at Z=500
```

### Line 15, above `// '??' not '||' throughout: a configured 0 is a real value, and '||' silently discarded it.`

```text
Configuration.
```

### Line 16, above `// That bug ran for a long time - 'minZ: 0' in three-config.js fell through to the -10000`

```text
`??` not `||` throughout: a configured 0 is a real value, and `||` silently discarded it.
```

### Line 17, above `// default, so shells spawned anywhere across a 9800-unit depth spread instead of the intended`

```text
That bug ran for a long time - `minZ: 0` in three-config.js fell through to the -10000
```

### Line 18, above `// band, which is why the same burst could read 110% of screen height or 7% of it.`

```text
default, so shells spawned anywhere across a 9800-unit depth spread instead of the intended
```

### Line 19, above `this.config = {`

```text
band, which is why the same burst could read 110% of screen height or 7% of it.
```

### Line 21, above `minZ: config.minZ ?? -10000,`

```text
Z-depth range
```

### Line 25, above `launchSpeed: config.launchSpeed ?? 0.4,`

```text
Launch timing
```

### Line 30, above `maxHeight: config.maxHeight ?? 10000,`

```text
Height limits
```

### Line 34, above `// explosionSpread: the particle sphere reaches ~1.1 and the shader's gravity term adds`

```text
How far below its centre a burst actually reaches, per unit of scale, as a multiple of
```

### Line 35, above `// ~0.588 by the end of the explosion. Used to keep a burst's bottom clear of the water.`

```text
explosionSpread: the particle sphere reaches ~1.1 and the shader's gravity term adds
```

### Line 36, above `// DERIVED FROM THE SHADER, not measured - particle positions are computed on the GPU and`

```text
~0.588 by the end of the explosion. Used to keep a burst's bottom clear of the water.
```

### Line 37, above `// cannot be read back, so this is a starting constant to confirm by eye.`

```text
DERIVED FROM THE SHADER, not measured - particle positions are computed on the GPU and
```

### Line 38, above `burstBottomFactor: config.burstBottomFactor ?? 1.69,`

```text
cannot be read back, so this is a starting constant to confirm by eye.
```

### Line 41, above `particleCount: config.particleCount ?? 400,`

```text
Explosion properties
```

### Line 49, above `particleBrightness: config.particleBrightness ?? 0.6,`

```text
Particle appearance
```

### Line 52, above `particleTrail: config.particleTrail ?? 10,`

```text
PARTICLE TRAIL: how many ghost copies of each particle are emitted, each one step further
        behind in time. This MULTIPLIES the vertex count - at 10 a 400-particle shell is 4000
        vertices - and every copy runs the full vertex shader. 1 = no trail.
```

### Line 57, above `rainbowChance: config.rainbowChance ?? 0.5,`

```text
Colors
```

### Line 61, above `// be in the air at once. GREETING is the calm welcome that runs while the top of the page is`

```text
The auto-launch stream: it has its own timer and its own cap on how many of its shells may
```

### Line 62, above `// on screen. Whether it is active is decided by the page, not here.`

```text
be in the air at once. GREETING is the calm welcome that runs while the top of the page is
```

### Line 63, above `// A second REWARD stream used to sit beside it, unlocked by the Pyrotechnician achievement and`

```text
on screen. Whether it is active is decided by the page, not here.
```

### Line 64, above `// switched on from the old top bar. Rod scrapped every reward (D28), so it was deleted on`

```text
A second REWARD stream used to sit beside it, unlocked by the Pyrotechnician achievement and
```

### Line 65, above `// 2026-08-31 together with its 'auto*' config keys. This stays a map of streams because the`

```text
switched on from the old top bar. Rod scrapped every reward (D28), so it was deleted on
```

### Line 66, above `// greeting may not be the last one this scene gets.`

```text
2026-08-31 together with its `auto*` config keys. This stays a map of streams because the
```

### Line 67, above `this.emitters = {`

```text
greeting may not be the last one this scene gets.
```

### Line 80, on the line `this._removeGroup = [];`

```text
reused each frame (avoid per-frame array allocation)
```

### Line 98, above `screenToWorldAtDepth(ndcX, ndcY, targetZ) {`

```text
Screen point (in normalized device coordinates) -> the world position on a given Z plane that
actually appears there, using the camera's own matrices.

This replaced frustum trigonometry (`ndcY * halfHeight + camera.y`) that silently assumed the
camera looks straight down -Z. The About page pitches the camera 25 degrees at the top of the
scroll, where that assumption put the top of the screen at world Y 1281 when the true value
was 2455 - so the top of the page was unreachable and clicks landed short. Unprojecting a ray
and intersecting the target plane is correct at any rotation, position, fov or aspect, which
also made the old `extraHeight` compensation (a hand-tuned curve bolted onto the wrong
projection) unnecessary; it was deleted rather than re-tuned.
```

### Line 121, above `window.addEventListener('click', (event) => {`

```text
Handle clicks on the window since canvas has pointer-events: none
```

### Line 123, above `if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {`

```text
Don't trigger if clicking on actual UI elements
```

### Line 137, above `const x = (clientX / window.innerWidth) * 2 - 1;`

```text
Convert screen coordinates to normalized device coordinates
```

### Line 141, above `const randomZ = THREE.MathUtils.lerp(this.config.minZ, this.config.maxZ, Math.random());`

```text
Calculate world position at a random Z depth
```

### Line 144, above `// rather than inside createFirework.`

```text
How big this burst will be decides how low it is allowed to sit, so the scale is drawn here
```

### Line 145, above `const scale = Math.random() * (this.config.explosionScaleMax - this.config.explosionScaleMin)`

```text
rather than inside createFirework.
```

### Line 151, above `// reach burstBottomFactor * explosionSpread * scale below the centre. Small shells may`

```text
A burst must never be half-drowned, so its FLOOR scales with its own size: the particles
```

### Line 152, above `// therefore burst low over the water while big ones are pushed high, with no special case.`

```text
reach burstBottomFactor * explosionSpread * scale below the centre. Small shells may
```

### Line 153, above `const burstBottom = this.config.explosionSpread * this.config.burstBottomFactor * scale;`

```text
therefore burst low over the water while big ones are pushed high, with no special case.
```

### Line 160, above `const startPoint = new THREE.Vector3(target.x, this.config.sceneBottom - 200, randomZ);`

```text
Start point is BELOW the scene bottom (-100)
```

### Line 163, above `const explosionDelay = THREE.MathUtils.lerp(`

```text
Random delay before explosion
```

### Line 170, above `const isRainbow = Math.random() < this.config.rainbowChance;`

```text
Random rainbow or solid color
```

### Line 175, above `// its own forever, so counting it would unlock the reward while the visitor sits still.`

```text
Only shells the visitor actually launched count toward Pyrotechnician. The greeting runs on
```

### Line 176, above `if (source === 'click') {`

```text
its own forever, so counting it would unlock the reward while the visitor sits still.
```

### Line 187, above `const randomX = (Math.random() * 2 - 1) * 0.8; // Stay within 80% of screen`

```text
Random position across the screen, but above scene bottom
```

### Line 188, on the line `const randomX = (Math.random() * 2 - 1) * 0.8;`

```text
Stay within 80% of screen
```

### Line 189, on the line `const randomY = (Math.random() * 0.5 + 0.3);`

```text
Upper/middle portion of screen
```

### Line 200, above `const color = new THREE.Color(`

```text
Random color
```

### Line 207, above `const firework = {`

```text
Store data for explosion
```

### Line 209, on the line `explosion: null,`

```text
Will be created once the launch delay has elapsed
```

### Line 217, on the line `phase: 'launch',`

```text
'launch' or 'explode'
```

### Line 218, on the line `source: source`

```text
'click' | 'greeting' | 'reward' — drives each emitter's live cap
```

### Line 224, above `randomDirectionInSphere() {`

```text
Uniform point in a shell of radius 0.9-1.1, matching the sphere maths this replaced in the
    vertex shader. That version was fed three hashed values; three Math.random() calls have the
    same distribution, so shells are statistically identical rather than bit-identical.
```

### Line 253, above `const [x, y, z] = this.randomDirectionInSphere();`

```text
position IS the direction - the shader uses it as-is
```

### Line 296, on the line `blending: THREE.NormalBlending`

```text
CHANGED from AdditiveBlending
```

### Line 300, above `shader.fragmentShader = '`

```text
Fragment shader - handles opacity fade
```

### Line 351, above `shader.vertexShader = shader.vertexShader.replace(`

```text
Vertex shader - handles particle animation
```

### Line 399, above `for (const source in this.emitters) {`

```text
Auto-generate fireworks — every active emitter runs its own delay-based timer
```

### Line 404, on the line `emitter.timer += 0.016 * normalizedDelta;`

```text
Increment timer (60fps baseline)
```

### Line 407, above `emitter.timer = 0;`

```text
Reset timer and get new random delay
```

### Line 411, above `if (this.countLive(source) >= emitter.maxLive) continue;`

```text
Hold the burst if this stream already has its share of the sky
```

### Line 414, above `const variation = Math.floor(Math.random() * emitter.amountVariation * 2) - emitter.amountVariation;`

```text
Fire burst of fireworks
```

### Line 434, above `if (time < explosionDelay) continue;`

```text
LAUNCH is now purely a delay - nothing is drawn during it. The rocket trail that used to
          animate here was removed 2026-08-22 (Rod: "they cannot be seen anyways"), which also took
          a draw call and a ShaderMaterial per shell with it. The delay stays because it is what
          staggers the explosions instead of letting a burst detonate all at once.
```

### Line 455, above `const explosionTime = firework.explosionClock.getElapsedTime();`

```text
EXPLOSION PHASE - particles spreading
```

### Line 461, above `// custom fragment shader computes its own fade from uTime and never reads the material's`

```text
Shrink over the burst. The opacity write that used to sit beside this was dead: the
```

### Line 462, above `// opacity uniform, so three uploaded it every frame for nothing.`

```text
custom fragment shader computes its own fade from uTime and never reads the material's
```

### Line 463, above `firework.explosion.material.size = this.config.particleSize * (1 - bloomTime) + 5;`

```text
opacity uniform, so three uploaded it every frame for nothing.
```

### Line 466, above `if (bloomTime >= 1) {`

```text
Remove when animation is complete
```

### Line 473, above `for (let firework of removeGroup) {`

```text
Clean up finished fireworks
```

### Line 488, above `getFireworkCount() {`

```text
Debug info
```

### Line 493, above `clear() {`

```text
Clear all fireworks
```

### Line 505, above `setGreeting(enabled) {`

```text
Enable/disable the top-of-page greeting stream
```
