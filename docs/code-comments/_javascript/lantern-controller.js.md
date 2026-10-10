# Comments removed from `_javascript/lantern-controller.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 3, above `export class LanternController {`

```text
Lantern behavior controller
```

### Line 15, above `this.raycaster = new THREE.Raycaster();`

```text
Mouse tracking
```

### Line 21, above `this._plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);`

```text
Reusable math objects (avoid per-frame allocations)
```

### Line 27, above `this.debugEnabled = false;`

```text
Debug visualization
```

### Line 55, above `// meant a visitor typing the letter d into any text field flipped on the debug rings, which`

```text
Toggle debug with 'D' key. Registered only when the config asks for it: unconditional, it
```

### Line 56, above `// allocate a sphere + two ring meshes per lantern per frame.`

```text
meant a visitor typing the letter d into any text field flipped on the debug rings, which
```

### Line 57, above `if (this.config.debugEnabled) document.addEventListener('keydown', (event) => {`

```text
allocate a sphere + two ring meshes per lantern per frame.
```

### Line 70, above `// so the update loop never has to inspect geometry type per frame.`

```text
Tag the object's kind ONCE (lantern = BoxGeometry, ember/firefly = SphereGeometry)
```

### Line 71, above `mesh.userData.kind = mesh.geometry.type === 'SphereGeometry' ? 'ember' : 'lantern';`

```text
so the update loop never has to inspect geometry type per frame.
```

### Line 74, above `mesh.userData.basePosition = mesh.position.clone();`

```text
Initialize userData for interaction
```

### Line 79, on the line `mesh.userData.avoidanceOffset = new THREE.Vector2(0, 0);`

```text
knock impulse only (Step 2)
```

### Line 80, on the line `mesh.userData.fieldOffset = new THREE.Vector2(0, 0);`

```text
parting field (Step 2: direct, not accumulated)
```

### Line 130, above `// (skips the sqrt for out-of-range objects -> Layer B stays cheap); linear falloff over 'radius'.`

```text
Radial push away from the cursor, accumulated into `out`. Squared-distance reject FIRST
```

### Line 131, above `_addParting(out, dx, dy, d2, radius, strength) {`

```text
(skips the sqrt for out-of-range objects -> Layer B stays cheap); linear falloff over `radius`.
```

### Line 146, above `if (this.avoidanceEnabled && this.debugEnabled) {`

```text
Clear old debug objects
```

### Line 151, above `const hasMouseRay = this.avoidanceEnabled && this.isMouseOverCanvas;`

```text
Mouse ray available for per-lantern intersection
```

### Line 154, above `// (was recomputing 4x Math.pow per lantern). Results are bit-identical -> no visual change.`

```text
Per-frame constants — identical for every lantern this frame, hoisted out of the loop
```

### Line 155, above `const avoidanceConfig = this.config.lanterns.avoidance;`

```text
(was recomputing 4x Math.pow per lantern). Results are bit-identical -> no visual change.
```

### Line 172, above `const fs = lantern.userData.floatScale;`

```text
Base floating animation
```

### Line 177, above `let fieldTargetX = 0;`

```text
Parting target for this frame (0 = no push / cursor far -> the field eases home)
```

### Line 181, above `if (hasMouseRay) {`

```text
Mouse avoidance — intersect ray at each lantern's z-depth for correct perspective
```

### Line 234, above `if (this.time - lantern.userData.lastAchievementDispatch > 1.0) {`

```text
Achievement dispatch (per-object 1s cooldown)
```

### Line 250, above `// push on closer elements). Both via _addParting; its squared-distance reject means`

```text
Parting target = Layer A (whole-screen, identical to Step 2) + Layer B (extra local
```

### Line 251, above `// Layer B costs nothing for the far majority. (Knock above is untouched.)`

```text
push on closer elements). Both via _addParting; its squared-distance reject means
```

### Line 252, above `const d2 = distance * distance;`

```text
Layer B costs nothing for the far majority. (Knock above is untouched.)
```

### Line 254, above `const sceneStrength = config.avoidanceStrength * this.displacementScale`

```text
Layer A strength = the equilibrium the old accumulator settled at: push*(1-r)/r.
```

### Line 268, above `lantern.userData.avoidanceOffset.x += lantern.userData.velocity.x * normalizedDelta;`

```text
Apply velocity from knock/push
```

### Line 272, above `lantern.rotation.x += lantern.userData.rotationVelocity.x * normalizedDelta;`

```text
Apply rotation velocity
```

### Line 277, above `lantern.userData.velocity.multiplyScalar(velocityDamping);`

```text
Dampen velocity and rotation (constants hoisted above the loop)
```

### Line 281, above `lantern.rotation.x += (lantern.userData.baseRotation.x - lantern.rotation.x) * rotationReturnSpeed;`

```text
Gradually return to base rotation
```

### Line 286, above `lantern.userData.avoidanceOffset.x *= (1 - positionReturnSpeed);`

```text
Knock impulse offset eases back to zero (parting now lives in fieldOffset)
```

### Line 290, above `// Same approach rate the old accumulator used, so the feel matches.`

```text
Parting field (Step 2): approach the direct target — set once, not accumulated.
```

### Line 291, above `const fo = lantern.userData.fieldOffset;`

```text
Same approach rate the old accumulator used, so the feel matches.
```

### Line 299, above `lantern.position.x = lantern.userData.basePosition.x + floatX;`

```text
Float only — no avoidance physics
```
