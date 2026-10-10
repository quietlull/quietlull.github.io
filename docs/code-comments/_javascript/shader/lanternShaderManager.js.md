# Comments removed from `_javascript/shader/lanternShaderManager.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 4, above `export class LanternMaterialManager {`

```text
Manages lantern materials with gradient glow and flicker animation
```

### Line 14, above `createMaterial(options = {}) {`

```text
Create a new lantern material with custom properties
@param {Object} options - Material options
@param {THREE.Color} options.baseColor - Base color of the lantern
@param {number} options.flickerSpeed - Speed of flicker animation
@param {number} options.flickerAmount - Amount of brightness variation
@param {number} options.gradientCenter - Y position of brightest point
@param {number} options.gradientRange - Height range for gradient
@returns {THREE.ShaderMaterial} The created material
```

### Line 32, above `const baseColor = options.baseColor || new THREE.Color(this.config.lanterns.glow.color);`

```text
Set base color from config or options
```

### Line 36, above `material.uniforms.gradientStart.value = options.gradientStart ?? 1.0;`

```text
Set gradient properties
```

### Line 42, above `const flickerSpeedVariation = 1.0 + (Math.random() - 0.5) * 0.3; // ±15% variation`

```text
Set flicker properties with randomization for variety
```

### Line 43, on the line `const flickerSpeedVariation = 1.0 + (Math.random() - 0.5) * 0.3;`

```text
±15% variation
```

### Line 48, above `material.uniforms.emissiveIntensity.value = options.emissiveIntensity ?? this.config.lanterns.glow.intensity;`

```text
Set emission intensity
```

### Line 51, above `material.userData.timeOffset = Math.random() * 100.0;`

```text
Add random time offset so lanterns don't all flicker in sync
```

### Line 54, above `this.materials.push(material);`

```text
Track material for updates
```

### Line 60, above `createMaterialForMesh(mesh, options = {}) {`

```text
Create material for a lantern mesh, auto-calculating gradient center
@param {THREE.Mesh} mesh - The lantern mesh
@param {Object} options - Additional material options
@returns {THREE.ShaderMaterial} The created material
```

### Line 67, above `mesh.geometry.computeBoundingBox();`

```text
Calculate bounding box to determine gradient center
```

### Line 71, above `const gradientCenter = bbox.min.y;`

```text
Set gradient center to bottom of lantern (where flame would be)
```

### Line 73, on the line `const gradientRange = (bbox.max.y - bbox.min.y) * .8;`

```text
Slightly larger than lantern height
```

### Line 82, above `update(deltaTime = 1.0) {`

```text
Update all lantern materials (call in animation loop)
@param {number} deltaTime - Time elapsed since last frame (normalized to 60fps)
```

### Line 87, above `this.time += 0.016 * deltaTime;`

```text
Update time (runs at 60fps rate when deltaTime = 1.0)
```

### Line 90, above `const materials = this.materials;`

```text
Update all materials (plain loop: no per-frame closure allocation)
```

### Line 100, above `setFlickerAmount(amount) {`

```text
Set global flicker amount for all lanterns
@param {number} amount - Flicker amount (0.0 - 1.0)
```

### Line 112, above `setFlickerSpeed(speed) {`

```text
Set global flicker speed for all lanterns
@param {number} speed - Flicker speed
```

### Line 119, above `const baseSpeed = material.uniforms.flickerSpeed.value / 3.0;`

```text
Preserve individual variation
```

### Line 126, above `setEmissiveIntensity(intensity) {`

```text
Set emission intensity for all lanterns
@param {number} intensity - Emission intensity
```

### Line 138, above `getMaterialCount() {`

```text
Get count of managed materials
@returns {number} Number of materials
```
