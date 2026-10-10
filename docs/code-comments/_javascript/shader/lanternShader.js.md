# Comments removed from `_javascript/shader/lanternShader.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `/**`

```text
@module LanternShader
Custom shader for lanterns with FLAT emissive and flickering animation
```

### Line 6, above `const LanternShader = {`

```text
Lantern shader that simulates flame-based lighting with:
- Flat emissive across the mesh, so the bloom wraps a hard silhouette (Rod 2026-08-13)
- Animated color flicker for flame effect
- Emission for bloom post-processing

@constant
@type {ShaderMaterial~Shader}
```

### Line 20, above `baseColor: { value: null }, // THREE.Color`

```text
Base lantern color (warm orange)
```

### Line 21, on the line `baseColor: { value: null },`

```text
THREE.Color
```

### Line 23, above `// kept because every call site and the material manager still pass them.`

```text
Brightness. Only gradientStart is read now (the emissive is flat); the other three are
```

### Line 24, above `gradientStart: { value: 1.0 }, // the single flat emissive level`

```text
kept because every call site and the material manager still pass them.
```

### Line 25, on the line `gradientStart: { value: 1.0 },`

```text
the single flat emissive level
```

### Line 26, on the line `gradientEnd: { value: 0.35 },`

```text
UNUSED since 2026-08-13 (flat emissive)
```

### Line 27, on the line `gradientCenter: { value: 0.0 },`

```text
UNUSED since 2026-08-13
```

### Line 28, on the line `gradientRange: { value: 100.0 },`

```text
UNUSED since 2026-08-13
```

### Line 30, above `time: { value: 0.0 },`

```text
Flicker animation
```

### Line 36, above `emissiveIntensity: { value: 2.0 }`

```text
Overall intensity
```

### Line 40, on the line `vertexShader: '`

```text
glsl
```

### Line 54, on the line `fragmentShader: '`

```text
glsl
```
