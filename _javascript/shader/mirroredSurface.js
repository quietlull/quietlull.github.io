import * as THREE from 'three';

/**
 * Water mirror surface for the About-page dock scene. Planar reflection + a NO-LIGHTING water look (the scene uses
 * flat materials, so nothing here adds a real light):
 *   - procedural snoise slope, isotropic world-xz [uProcNoise=1] -> 2D waves, no tiling seam / magnify artifact
 *   - (1) distance-attenuated reflection-UV distortion (three.js Water / ameen)
 *   - (2) Fresnel depth: blend reflection toward dark uWaterColor by view angle (geometric, no light)
 *   - (3) FAKE directional light (darken-biased): broad wave shading from a CONSTANT sun direction (no scene light)
 *   - (6) click ripples: expanding wave-packets (ldBXDD) feeding BOTH the reflection AND the shading normal
 * Tuned defaults are baked in the uniforms block. `spawnRipple(worldPoint)` + `getActiveRipple()` drive interaction
 * (e.g. the character's "watch the water" head-look).
 * Provenance: original planar reflection = Rod; distortion/Fresnel/directional = three.js examples/jsm/objects/Water.js
 * + ameen-abdullah.dev; ripple = Godot/Shadertoy ldBXDD; snoise = Ashima/Gustavson (public domain). Reworked in the
 * lab water track (see redesign-lab/water-CHANGELOG.md).
 */
export class MirroredSurface {
  constructor(scene, camera, renderer, mirrorPlane, options = {}) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.mirrorPlane = mirrorPlane;
    this.time = 0;

    this.reflectionIntensity = options.reflectionIntensity ?? 0.85;
    this.reflectionSaturation = options.reflectionSaturation ?? 0.7;
    this.reflectionTint = options.reflectionTint ?? new THREE.Color(0xffffff);

    this.waveStrength = options.waveStrength ?? 0.02;
    this.waveSpeed = options.waveSpeed ?? 0.5;
    this.waveScale = options.waveScale ?? 1.0;
    this.waveType = options.waveType ?? 1;
    this.noiseMode = options.noiseMode ?? 1;

    const worldPos = new THREE.Vector3();
    mirrorPlane.getWorldPosition(worldPos);
    this.mirrorPlaneY = worldPos.y;

    this.mirrorCamera = new THREE.PerspectiveCamera(camera.fov * 1, camera.aspect, 0.001, camera.far);

    this.renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBFormat
    });

    const textureLoader = new THREE.TextureLoader();
    this.dudvTexture = textureLoader.load('/assets/tex/DUV.png');
    this.dudvTexture.wrapS = THREE.RepeatWrapping;
    this.dudvTexture.wrapT = THREE.RepeatWrapping;

    this.material = this.createMirrorMaterial();
  }

  createMirrorMaterial() {
    const vertexShader = `
      varying vec4 vWorldPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      void main() {
        vWorldPosition = modelMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
  uniform sampler2D tReflection;
  uniform sampler2D tDudv;
  uniform mat4 uMirrorViewMatrix;
  uniform mat4 uMirrorProjectionMatrix;
  uniform vec3 uCameraPosition;
  uniform float uReflectionIntensity;
  uniform vec3 uReflectionTint;
  uniform float uTime;
  uniform float uWaveStrength;
  uniform float uWaveSpeed;
  uniform float uWaveScale;
  uniform float uNoiseMode;
  uniform float uNoiseSpace, uWorldScale;   // 0 = original anisotropic UV (stripes) / 1 = isotropic world-xz (2D waves)
  uniform float uProcNoise;   // 0 = DUV texture noise / 1 = procedural snoise (infinite res -> no magnify/seam artifacts)
  uniform float uUseOriginal;
  uniform float uDistort, uDistortFalloff, uNormalUp;   // (1) distance-attenuated normal distortion
  uniform float uFresnel, uFresnelPow; uniform vec3 uWaterColor;   // (2) depth
  uniform float uSunDiffuse, uSunLift; uniform vec3 uSunDir2, uSunColor2;   // (3) fake directional light (darken-biased)
  uniform vec2 uRippleOrigin[16]; uniform float uRippleStart[16];   // (6) click ripples: world xz + spawn time per slot
  uniform float uRippleSpeed, uRippleFreq, uRippleWidth, uRippleDecay, uRippleLife, uRippleAmp, uRippleSlope;
  varying vec2 vUv;
  varying vec4 vWorldPosition;
  varying vec3 vNormal;

  mat2 rot2(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

  // Ashima/Gustavson 3D simplex noise (public domain webgl-noise) — same one the character dissolve uses.
  vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0); const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g; vec3 i1 = min(g.xyz, l.zxy); vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx; vec3 x2 = x0 - i2 + 2.0 * C.xxx; vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0 / 7.0; vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z); vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy; vec4 y = y_ * ns.x + ns.yyyy; vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0; vec4 s1 = floor(b1) * 2.0 + 1.0; vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x); vec3 p1 = vec3(a0.zw, h.y); vec3 p2 = vec3(a1.xy, h.z); vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0); m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  // procedural slope in ~[-1,1]: 3 octaves, two decorrelated channels (analog of the DUDV .rg). Animates via the z axis.
  vec2 proceduralSlope(vec2 p) {
    float t = uTime * uWaveSpeed * 0.1;
    vec2 s = vec2(0.0);
    s += vec2(snoise(vec3(p * 1.0, t)),        snoise(vec3(p * 1.0 + 19.7, t)))        * 1.0;
    s += vec2(snoise(vec3(p * 2.3, t * 1.3)),  snoise(vec3(p * 2.3 + 7.1, t * 1.3)))   * 0.5;
    s += vec2(snoise(vec3(p * 4.7, t * 0.8)),  snoise(vec3(p * 4.7 + 41.3, t * 0.8)))  * 0.25;
    return s * 0.6;
  }

  // DUDV slope in ~[-1,1] (NO waveStrength). Procedural (default) or texture (world-xz isotropic / original anisotropic UV).
  vec2 slopeRaw(vec2 uv) {
    if (uProcNoise > 0.5) {
      return proceduralSlope(vWorldPosition.xz * uWorldScale);   // continuous -> no magnify artifact, no tiling seam
    }
    if (uNoiseSpace > 0.5) {
      vec2 base = vWorldPosition.xz * uWorldScale;
      float tt = uTime * uWaveSpeed * 0.05;
      if (uNoiseMode > 0.5) {
        vec2 d0 = texture2D(tDudv, rot2(0.0) * base * 1.0 + tt * vec2( 1.0,  0.3)).rg;
        vec2 d1 = texture2D(tDudv, rot2(1.3) * base * 1.9 + tt * vec2(-0.6,  0.8)).rg;
        vec2 d2 = texture2D(tDudv, rot2(2.5) * base * 0.5 + tt * vec2( 0.2, -0.9)).rg;
        vec2 d3 = texture2D(tDudv, rot2(3.9) * base * 3.1 + tt * vec2(-0.8, -0.4)).rg;
        return (d0 + d1 + d2 + d3) * 0.5 - 1.0;
      }
      return texture2D(tDudv, base + tt * vec2(0.7, 0.5)).rg * 2.0 - 1.0;
    }
    vec2 base = uv * vec2(0.01, 10.0) * uWaveScale;
    if (uNoiseMode > 0.5) {
      vec2 t = vec2(uTime * uWaveSpeed * 0.05);
      vec2 d0 = texture2D(tDudv, base * 1.0 + t * vec2( 1.0,  0.6)).rg;
      vec2 d1 = texture2D(tDudv, base * 1.7 - t * vec2(-0.5,  0.8)).rg;
      vec2 d2 = texture2D(tDudv, base * 0.4 + t * vec2( 0.3,  0.2)).rg;
      vec2 d3 = texture2D(tDudv, base * 2.3 - t * vec2( 0.7,  0.4)).rg;
      return (d0 + d1 + d2 + d3) * 0.5 - 1.0;
    }
    return texture2D(tDudv, base + uTime * uWaveSpeed * 0.05).rg * 2.0 - 1.0;
  }

  // click ripples: each active slot adds an expanding wave-packet UV offset from its world-xz origin.
  // ldBXDD core cos((d - front)*freq) [front = age*speed] x gaussian ring around the front x time-decay.
  vec2 rippleOffset(vec2 worldXZ) {
    vec2 acc = vec2(0.0);
    for (int i = 0; i < 16; i++) {
      float age = uTime - uRippleStart[i];
      float d = distance(worldXZ, uRippleOrigin[i]);
      float front = age * uRippleSpeed;
      float wave = cos((d - front) * uRippleFreq);
      float band = exp(-pow((d - front) / uRippleWidth, 2.0));   // ring concentrated at the expanding front
      float env = exp(-uRippleDecay * max(age, 0.0));            // fade over time
      float gate = step(0.0, age) * step(age, uRippleLife);    // skip empty/old slots (branchless)
      vec2 dir = (d > 1e-4) ? (worldXZ - uRippleOrigin[i]) / d : vec2(0.0);
      acc += dir * wave * band * env * gate;   // RAW field (~[-1,1]); amp/slope gains applied by the caller
    }
    return acc;
  }

  void main() {
    vec3 viewDir = normalize(vWorldPosition.xyz - uCameraPosition);
    vec3 reflectDir = reflect(viewDir, vNormal);
    vec3 reflectedPos = vWorldPosition.xyz + reflectDir * 0.01;
    vec4 mirrorSpacePos = uMirrorProjectionMatrix * uMirrorViewMatrix * vec4(reflectedPos, 1.0);
    vec2 reflectionUV = (mirrorSpacePos.xyz / mirrorSpacePos.w).xy * 0.5 + 0.5;

    // ===== ORIGINAL (verbatim Rod water; single sample regardless of noise mode) =====
    if (uUseOriginal > 0.5) {
      vec2 dudvUV = vUv * vec2(.01, 10.0) + uTime * uWaveSpeed * 0.05;
      vec2 distortion = (texture2D(tDudv, dudvUV).rg * 2.0 - 1.0) * uWaveStrength;
      vec3 col = texture2D(tReflection, reflectionUV + distortion).rgb + vec3(0.3, 0.5, 0.7) * length(distortion);
      gl_FragColor = vec4(col, 1.0);
      return;
    }

    // ===== NEW path =====
    vec2 s = slopeRaw(vUv);
    vec2 rip = rippleOffset(vWorldPosition.xz);   // (6) RAW click-ripple field; feeds BOTH the reflection AND the normal

    // (1) NORMAL DISTORTION — distance falloff: strong near the camera, calm toward the horizon (three.js Water / ameen)
    float dist = length(uCameraPosition - vWorldPosition.xyz);
    float falloff = clamp(uDistortFalloff / max(dist, 1.0), 0.0, 1.0);
    vec2 distortion = s * uDistort * falloff;
    vec3 color = texture2D(tReflection, reflectionUV + distortion + rip * uRippleAmp).rgb;

    // normal = slope + ripple slope, so the ripple shows in Fresnel + directional light too
    vec2 sN = s + rip * uRippleSlope;
    vec3 N = normalize(vec3(sN.x, uNormalUp, sN.y));

    // (2) FRESNEL depth — geometric (normal vs camera), blends reflection toward dark water by view angle
    if (uFresnel > 0.001) {
      float fres = pow(1.0 - max(dot(N, -viewDir), 0.0), uFresnelPow);
      color = mix(uWaterColor, color, mix(1.0 - uFresnel, 1.0, fres));
    }
    // (3) DIRECTIONAL LIGHT — a FAKE constant sun bends across the normals (ameen diffuse term), darken-biased so it
    //     darkens troughs (neutral) + gently lifts crests -> broad light/dark wave bands, no scene light, no bloom spike.
    if (uSunDiffuse > 0.001) {
      vec3 L = normalize(uSunDir2);
      float dev = dot(N, L) - L.y;                              // signed wave orientation (+ toward sun, - away)
      float trough = max(-dev, 0.0);                            // slope facing AWAY from the sun
      float crest  = max( dev, 0.0);                            // slope facing TOWARD it
      color *= max(0.0, 1.0 - uSunDiffuse * trough);            // DARKEN troughs (neutral) -> net darker, stops feeding bloom
      color += uSunColor2 * (uSunDiffuse * uSunLift * crest);   // gently LIFT crests (small, cool moonlight)
    }
    gl_FragColor = vec4(color, 1.0);
  }
`;

    const mirrorMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tReflection: { value: this.renderTarget.texture },
        tDudv: { value: this.dudvTexture },
        uMirrorViewMatrix: { value: new THREE.Matrix4() },
        uMirrorProjectionMatrix: { value: new THREE.Matrix4() },
        uCameraPosition: { value: new THREE.Vector3() },
        uReflectionIntensity: { value: this.reflectionIntensity },
        uReflectionSaturation: { value: this.reflectionSaturation },
        uReflectionTint: { value: this.reflectionTint },
        uTime: { value: 1 },
        uWaveStrength: { value: this.waveStrength },
        uWaveSpeed: { value: this.waveSpeed },
        uWaveScale: { value: this.waveScale },
        uWaveType: { value: this.waveType },
        uNoiseMode: { value: this.noiseMode },
        uNoiseSpace: { value: 1.0 }, uWorldScale: { value: 0.0082 },   // tuned (procedural)
        uProcNoise: { value: 1.0 },   // default = procedural (big artifact-free waves)
        uUseOriginal: { value: 0.0 },   // default = the new combined look (set uUseOriginal=1 for the old water)
        uDistort: { value: 0.05 }, uDistortFalloff: { value: 150.0 }, uNormalUp: { value: 0.6 },
        uFresnel: { value: 0.35 }, uFresnelPow: { value: 4.3 }, uWaterColor: { value: new THREE.Color(0x0a1426) },
        uSunDiffuse: { value: 0.13 }, uSunLift: { value: 0.2 }, uSunDir2: { value: new THREE.Vector3(0.4, 0.5, 0.3).normalize() }, uSunColor2: { value: new THREE.Color(0xaec6f0) },   // moonlight (cool blue-white)
        uRippleOrigin: { value: Array.from({ length: 16 }, () => new THREE.Vector2()) },
        uRippleStart: { value: new Array(16).fill(-1000.0) },   // far-past = inactive
        uRippleSpeed: { value: 80.0 }, uRippleFreq: { value: 0.2 }, uRippleWidth: { value: 30.0 },
        uRippleDecay: { value: 0.6 }, uRippleLife: { value: 4.0 }, uRippleAmp: { value: 0.03 }, uRippleSlope: { value: 2.0 }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide
    });

    return mirrorMaterial;
  }

  update(normalizedDelta = 1.0) {
    this.time += normalizedDelta * 0.016;
    this.material.uniforms.uTime.value = this.time;

    if (!this._frustum) {
      this._frustum = new THREE.Frustum();
      this._projScreenMatrix = new THREE.Matrix4();
    }
    this._projScreenMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    this._frustum.setFromProjectionMatrix(this._projScreenMatrix);

    if (!this._frustum.intersectsObject(this.mirrorPlane)) {
      return;
    }

    this.mirrorCamera.position.copy(this.camera.position);
    const distanceFromPlane = this.camera.position.y - this.mirrorPlaneY;
    this.mirrorCamera.position.y = this.mirrorPlaneY - distanceFromPlane;

    this.mirrorCamera.rotation.x = -this.camera.rotation.x;
    this.mirrorCamera.rotation.y = this.camera.rotation.y;
    this.mirrorCamera.rotation.z = this.camera.rotation.z;

    this.mirrorCamera.updateMatrixWorld();

    this.material.uniforms.uMirrorViewMatrix.value = this.mirrorCamera.matrixWorldInverse;
    this.material.uniforms.uMirrorProjectionMatrix.value = this.mirrorCamera.projectionMatrix;
    this.material.uniforms.uCameraPosition.value.copy(this.camera.position);

    this.mirrorPlane.visible = false;
    this.renderer.setRenderTarget(this.renderTarget);
    this.renderer.render(this.scene, this.mirrorCamera);

    this.mirrorPlane.visible = true;
    this.renderer.setRenderTarget(null);
  }

  handleResize() {
    this.renderTarget.setSize(window.innerWidth, window.innerHeight);
    this.mirrorCamera.aspect = this.camera.aspect;
    this.mirrorCamera.updateProjectionMatrix();
  }

  // preset switch — sets the per-effect strengths for one of the 5 versions (original/normal/fresnel/sun/combined).
  applyVersion(name) {
    const u = this.material.uniforms;
    const P = {
      original: { uUseOriginal: 1, uDistort: 0.05, uFresnel: 0,    uSunDiffuse: 0    },
      normal:   { uUseOriginal: 0, uDistort: 0.05, uFresnel: 0,    uSunDiffuse: 0    },
      fresnel:  { uUseOriginal: 0, uDistort: 0,    uFresnel: 0.35, uSunDiffuse: 0    },
      sun:      { uUseOriginal: 0, uDistort: 0,    uFresnel: 0,    uSunDiffuse: 0.13 },
      combined: { uUseOriginal: 0, uDistort: 0.05, uFresnel: 0.35, uSunDiffuse: 0.13 },
    }[name] || {};
    for (const k in P) u[k].value = P[k];
    return P;
  }

  setNoiseMode(mode) { this.noiseMode = mode ? 1 : 0; this.material.uniforms.uNoiseMode.value = this.noiseMode; }

  // Spawn a ripple at a WORLD point (Vector3). Round-robins a 16-slot pool. Start time = the material's own clock
  // (same base as the shader's uTime). Cross-feature: getActiveRipple() drives the character's "watch the water" head-look.
  spawnRipple(worldPoint) {
    const U = this.material.uniforms;
    if (this._rippleHead === undefined) this._rippleHead = 0;
    const i = this._rippleHead;
    U.uRippleOrigin.value[i].set(worldPoint.x, worldPoint.z);
    U.uRippleStart.value[i] = this.time;
    this._lastRipple = { origin: worldPoint.clone(), start: this.time };
    this._rippleHead = (i + 1) % 16;
  }
  getActiveRipple() {
    if (!this._lastRipple) return null;
    const age = this.time - this._lastRipple.start;
    if (age > this.material.uniforms.uRippleLife.value) return null;
    return { origin: this._lastRipple.origin, age };
  }
  setWaveStrength(value) { this.waveStrength = value; this.material.uniforms.uWaveStrength.value = value; }
  setWaveSpeed(value) { this.waveSpeed = value; this.material.uniforms.uWaveSpeed.value = value; }
  setWaveScale(value) { this.waveScale = value; this.material.uniforms.uWaveScale.value = value; }
  setWaveType(type) { this.waveType = Math.floor(type); this.material.uniforms.uWaveType.value = Math.floor(type); }

  setReflectionIntensity(value) {
    this.reflectionIntensity = Math.max(0, Math.min(1, value));
    this.material.uniforms.uReflectionIntensity.value = this.reflectionIntensity;
  }
  setReflectionSaturation(value) {
    this.reflectionSaturation = Math.max(0, Math.min(1, value));
    this.material.uniforms.uReflectionSaturation.value = this.reflectionSaturation;
  }
  setReflectionTint(color) { this.reflectionTint = color; this.material.uniforms.uReflectionTint.value = color; }

  dispose() {
    this.renderTarget.dispose();
    this.material.dispose();
  }
}
