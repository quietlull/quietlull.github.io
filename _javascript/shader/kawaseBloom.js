import * as THREE from 'three';

/**
 * Dual Kawase bloom - Marius Bjorge's dual filtering, fixed at TWO levels with no bright pass.
 *
 * WHY IT REPLACED UnrealBloomPass (DECISIONS D23): the stock pass builds a 5-level mip chain and
 * runs a separable gaussian at every level - two passes per mip plus a composite, ~12 passes over
 * 11 render targets. Ablation profiling on Rod's machine with hardware acceleration OFF measured
 * bloom at 8.5 ms/frame, 52% of a 16.5 ms scene, and that was already at HALF resolution. The
 * scene is 27 draw calls and 733 triangles, so it is fragment-bound: passes are the cost.
 *
 * This is five renders over four targets, all at half resolution or below:
 *   1 copy       frame    -> half      (no threshold, so nothing is cut)
 *   2 down       half     -> quarter   (5-tap)
 *   3 up         quarter  -> wide      (8-tap tent, stays at quarter res)
 *   4 up         wide     -> tight     (8-tap tent, back to half res)
 *   5 composite  base + tight*f0 + wide*f1
 *
 * NO BRIGHT PASS IS DELIBERATE. The whole frame blurs and is added back, which lifts the dark
 * water as well as the lanterns. That matters because the scene has ZERO lights - the lanterns are
 * visible only through emissive materials, and bloom has been standing in for a lighting rig.
 *
 * `wide` and `tight` are kept as SEPARATE targets so each survives as its own frequency band; that
 * is what the two-sampler composite sums. Every tap is offset to land between texels, so the GPU's
 * bilinear filter fetches four texels per sample for free.
 *
 * Ducks three's Pass interface (enabled / needsSwap / setSize / render), so EffectComposer drives
 * it exactly like the stock pass.
 */

/* Buffer size as a fraction of the frame. A blur chain is low-frequency by definition, so half
   resolution costs a quarter of the fragments for a difference that is very hard to see. */
const DEFAULT_SCALE = 0.5;

/* Tap offset. uHalfTexel is HALF_TEXEL/size, so taps land BETWEEN texels; uTapOffset then scales
   that, making the reach in SOURCE TEXELS equal to
       HALF_TEXEL * (TAP_OFFSET_BASE + radius * TAP_OFFSET_PER_RADIUS)
   which is 0.25 texels at radius 0 and a full texel at radius 1. */
const HALF_TEXEL = 0.5;
const TAP_OFFSET_BASE = 0.5;
const TAP_OFFSET_PER_RADIUS = 1.5;

/* Rod's numbers, 2026-08-21. Radius is not a blur width: see lerpBloomFactor below. */
const DEFAULT_STRENGTH = 0.7;
const DEFAULT_RADIUS = 0.15;

const VERT = `varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

/* Straight blit of the frame into the top of the pyramid. This is where the bright pass used to
   be, and removing it is the whole difference between "glow on highlights" and "lift everything". */
const COPY_FRAG = `uniform sampler2D tDiffuse;
  varying vec2 vUv;
  void main(){ gl_FragColor = texture2D(tDiffuse, vUv); }`;

/* 5-tap downsample: centre plus four diagonals. */
const DOWN_FRAG = `uniform sampler2D tDiffuse;
  uniform vec2 uHalfTexel;
  uniform float uTapOffset;
  varying vec2 vUv;

  const float CENTRE_WEIGHT = 4.0;
  const float CORNER_WEIGHT = 1.0;
  const float WEIGHT_SUM = 8.0;            // CENTRE_WEIGHT + 4.0 * CORNER_WEIGHT

  void main(){
    vec2 d = uHalfTexel * uTapOffset;
    vec4 sum = texture2D(tDiffuse, vUv) * CENTRE_WEIGHT;
    sum += texture2D(tDiffuse, vUv + vec2( d.x,  d.y)) * CORNER_WEIGHT;
    sum += texture2D(tDiffuse, vUv + vec2(-d.x, -d.y)) * CORNER_WEIGHT;
    sum += texture2D(tDiffuse, vUv + vec2( d.x, -d.y)) * CORNER_WEIGHT;
    sum += texture2D(tDiffuse, vUv + vec2(-d.x,  d.y)) * CORNER_WEIGHT;
    gl_FragColor = sum / WEIGHT_SUM;
  }`;

/* 8-tap tent upsample: four axis taps at double reach, four diagonals at single reach and double
   weight. The tent is what keeps the halo smooth despite so few taps. */
const UP_FRAG = `uniform sampler2D tDiffuse;
  uniform vec2 uHalfTexel;
  uniform float uTapOffset;
  varying vec2 vUv;

  const float AXIS_REACH = 2.0;
  const float AXIS_WEIGHT = 1.0;
  const float DIAGONAL_WEIGHT = 2.0;
  const float WEIGHT_SUM = 12.0;           // 4.0 * AXIS_WEIGHT + 4.0 * DIAGONAL_WEIGHT

  void main(){
    vec2 d = uHalfTexel * uTapOffset;
    vec4 sum = texture2D(tDiffuse, vUv + vec2(-d.x * AXIS_REACH, 0.0)) * AXIS_WEIGHT;
    sum += texture2D(tDiffuse, vUv + vec2( d.x * AXIS_REACH, 0.0)) * AXIS_WEIGHT;
    sum += texture2D(tDiffuse, vUv + vec2(0.0,  d.y * AXIS_REACH)) * AXIS_WEIGHT;
    sum += texture2D(tDiffuse, vUv + vec2(0.0, -d.y * AXIS_REACH)) * AXIS_WEIGHT;
    sum += texture2D(tDiffuse, vUv + vec2(-d.x,  d.y)) * DIAGONAL_WEIGHT;
    sum += texture2D(tDiffuse, vUv + vec2( d.x,  d.y)) * DIAGONAL_WEIGHT;
    sum += texture2D(tDiffuse, vUv + vec2( d.x, -d.y)) * DIAGONAL_WEIGHT;
    sum += texture2D(tDiffuse, vUv + vec2(-d.x, -d.y)) * DIAGONAL_WEIGHT;
    gl_FragColor = sum / WEIGHT_SUM;
  }`;

/* Unreal's composite, written out for exactly two bands.
   FACTOR_TIGHT/FACTOR_WIDE are the first two of its [1.0, 0.8, 0.6, 0.4, 0.2] mip weights, and
   lerpBloomFactor flips that ramp as radius rises. That is why radius rebalances TIGHT against
   WIDE rather than changing the blur size, exactly as the stock knob did. */
const COMPOSITE_FRAG = `uniform sampler2D tDiffuse;
  uniform sampler2D tMipTight;
  uniform sampler2D tMipWide;
  uniform float uStrength;
  uniform float uRadius;
  varying vec2 vUv;

  const float FACTOR_TIGHT = 1.0;
  const float FACTOR_WIDE = 0.8;
  const float LERP_PIVOT = 1.2;

  float lerpBloomFactor(float f){ return mix(f, LERP_PIVOT - f, uRadius); }

  void main(){
    vec3 glow = lerpBloomFactor(FACTOR_TIGHT) * texture2D(tMipTight, vUv).rgb
              + lerpBloomFactor(FACTOR_WIDE) * texture2D(tMipWide, vUv).rgb;
    vec3 base = texture2D(tDiffuse, vUv).rgb;
    gl_FragColor = vec4(base + glow * uStrength, 1.0);
  }`;

function makeTarget(w, h) {
  return new THREE.WebGLRenderTarget(Math.max(1, w | 0), Math.max(1, h | 0), {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    type: THREE.HalfFloatType,
    depthBuffer: false,
    stencilBuffer: false
  });
}

export class KawaseBloomPass {
  constructor(width, height, options = {}) {
    this.enabled = true;
    this.needsSwap = true;
    this.clear = false;
    this.renderToScreen = false;
    this.name = 'kawase';

    this.strength = options.strength ?? DEFAULT_STRENGTH;
    this.radius = options.radius ?? DEFAULT_RADIUS;
    this.scale = options.scale ?? DEFAULT_SCALE;

    this.copy = new THREE.ShaderMaterial({
      uniforms: { tDiffuse: { value: null } },
      vertexShader: VERT,
      fragmentShader: COPY_FRAG
    });
    this.down = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        uHalfTexel: { value: new THREE.Vector2() },
        uTapOffset: { value: 1 }
      },
      vertexShader: VERT,
      fragmentShader: DOWN_FRAG
    });
    this.up = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        uHalfTexel: { value: new THREE.Vector2() },
        uTapOffset: { value: 1 }
      },
      vertexShader: VERT,
      fragmentShader: UP_FRAG
    });
    this.composite = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        tMipTight: { value: null },
        tMipWide: { value: null },
        uStrength: { value: this.strength },
        uRadius: { value: this.radius }
      },
      vertexShader: VERT,
      fragmentShader: COMPOSITE_FRAG,
      depthTest: false,
      depthWrite: false
    });

    // one fullscreen quad, its material swapped per pass
    this.quadScene = new THREE.Scene();
    this.quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.copy);
    this.quadScene.add(this.quad);

    this.setSize(width, height);
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    [this.half, this.quarter, this.wide, this.tight].forEach((t) => t && t.dispose());
    const halfW = Math.max(1, Math.round(width * this.scale));
    const halfH = Math.max(1, Math.round(height * this.scale));
    const quarterW = Math.max(1, halfW >> 1);
    const quarterH = Math.max(1, halfH >> 1);
    this.half = makeTarget(halfW, halfH);
    this.quarter = makeTarget(quarterW, quarterH);
    this.wide = makeTarget(quarterW, quarterH);
    this.tight = makeTarget(halfW, halfH);
  }

  blit(renderer, material, target) {
    this.quad.material = material;
    renderer.setRenderTarget(target);
    renderer.render(this.quadScene, this.quadCamera);
  }

  tent(renderer, source, target, tapOffset) {
    this.up.uniforms.tDiffuse.value = source.texture;
    this.up.uniforms.uHalfTexel.value.set(HALF_TEXEL / source.width, HALF_TEXEL / source.height);
    this.up.uniforms.uTapOffset.value = tapOffset;
    this.blit(renderer, this.up, target);
  }

  render(renderer, writeBuffer, readBuffer) {
    const previousTarget = renderer.getRenderTarget();
    const tapOffset = TAP_OFFSET_BASE + this.radius * TAP_OFFSET_PER_RADIUS;

    // 1. whole frame into the top of the pyramid
    this.copy.uniforms.tDiffuse.value = readBuffer.texture;
    this.blit(renderer, this.copy, this.half);

    // 2. half -> quarter
    this.down.uniforms.tDiffuse.value = this.half.texture;
    this.down.uniforms.uHalfTexel.value.set(HALF_TEXEL / this.half.width, HALF_TEXEL / this.half.height);
    this.down.uniforms.uTapOffset.value = tapOffset;
    this.blit(renderer, this.down, this.quarter);

    // 3 and 4. tent at quarter res for the WIDE band, then back up to half res for the TIGHT one
    this.tent(renderer, this.quarter, this.wide, tapOffset);
    this.tent(renderer, this.wide, this.tight, tapOffset);

    // 5. sum both bands over the original frame
    this.composite.uniforms.tDiffuse.value = readBuffer.texture;
    this.composite.uniforms.tMipTight.value = this.tight.texture;
    this.composite.uniforms.tMipWide.value = this.wide.texture;
    this.composite.uniforms.uStrength.value = this.strength;
    this.composite.uniforms.uRadius.value = this.radius;
    this.blit(renderer, this.composite, this.renderToScreen ? null : writeBuffer);

    renderer.setRenderTarget(previousTarget);
  }

  dispose() {
    [this.half, this.quarter, this.wide, this.tight].forEach((t) => t && t.dispose());
    [this.copy, this.down, this.up, this.composite].forEach((m) => m && m.dispose());
    this.quad.geometry.dispose();
  }
}
