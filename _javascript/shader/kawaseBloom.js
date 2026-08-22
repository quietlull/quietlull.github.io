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

  uniform sampler2D tPaper;
  uniform sampler2D tPaper2;
  uniform float uPaperAmount;
  uniform vec2 uPaperTile;
  uniform vec2 uPaperTile2;
  uniform float uPaperMix;
  uniform int uPaperBlend;
  uniform vec2 uPaperOffset;
  uniform float uPaperBleed;
  uniform float uPaperDisplace;
  uniform float uPaperTooth;

  varying vec2 vUv;

  const float FACTOR_TIGHT = 1.0;
  const float FACTOR_WIDE = 0.8;
  const float LERP_PIVOT = 1.2;

  float lerpBloomFactor(float f){ return mix(f, LERP_PIVOT - f, uRadius); }

  /* How the two sheets combine. Both operands are SIGNED here - xy is a surface normal in -1..1 and
     z is height re-centred on 0 - so these behave like signal ops, not like Photoshop layer modes:
       LERP     crossfade, the two sheets never coexist at full strength
       ADD      both sheets at once, roughness accumulates
       SUBTRACT sheet B carves into sheet A, cancelling where they agree
       MODULATE B rides A's amplitude, so A's coarse cells gate where B's grain shows
       MAX/MIN   whichever sheet is more extreme wins, keeping hard features intact */
  vec3 blendSheets(vec3 a, vec3 b, float m) {
    if (uPaperBlend == 1) return a + b * m;
    if (uPaperBlend == 2) return a - b * m;
    if (uPaperBlend == 3) return a * (1.0 + b * m * 2.0);
    if (uPaperBlend == 4) return mix(a, max(a, b), m);
    if (uPaperBlend == 5) return mix(a, min(a, b), m);
    return mix(a, b, m);
  }

  void main(){
    vec3 glow = lerpBloomFactor(FACTOR_TIGHT) * texture2D(tMipTight, vUv).rgb
              + lerpBloomFactor(FACTOR_WIDE) * texture2D(tMipWide, vUv).rgb;
    vec3 base = texture2D(tDiffuse, vUv).rgb;

    /* PAPER (uniform branch, so it costs nothing while amount is 0).
       tPaper is a BAKED normal+height map: rg = surface normal xy, b = height. The Shadertoy this
       came from derived that from a 4-octave simplex fbm evaluated ~24 times per pixel, which is
       impossible on a software rasteriser - baking makes it one fetch. */
    if (uPaperAmount > 0.0) {
      vec3 paper = texture2D(tPaper, vUv * uPaperTile + uPaperOffset).rgb;
      vec2 slope = paper.rg * 2.0 - 1.0;
      float tooth = paper.b - 0.5;

      /* SECOND SHEET at a different size. Real paper has structure at more than one scale - a
         coarse tooth with a finer grain sitting inside it - and one tiling of one sheet can only
         ever give you one. This costs exactly ONE extra fetch, because the two normals are combined
         BEFORE the displaced tap rather than the frame being sampled twice. The offset is scaled by
         a non-integer so the two sheets do not boil in lockstep. */
      if (uPaperMix > 0.0) {
        vec3 paper2 = texture2D(tPaper2, vUv * uPaperTile2 + uPaperOffset * 1.7).rgb;
        vec3 combined = blendSheets(
          vec3(slope, tooth),
          vec3(paper2.rg * 2.0 - 1.0, paper2.b - 0.5),
          uPaperMix
        );
        slope = combined.xy;
        tooth = combined.z;
      }

      /* ink bleeding into the fibres: blend the straight tap with one pulled along the paper
         normal. This is the 0.4/0.6 two-tap blend from the source, made tunable. */
      vec3 bled = texture2D(tDiffuse, vUv + slope * uPaperDisplace).rgb;
      base = mix(base, bled, uPaperBleed * uPaperAmount);
      /* the sheet's own tooth, applied OVER the glow so the image reads as printed ON the paper
         rather than behind it. Centred on 0.5 so it both catches light and casts into the weave. */
      vec3 lit = base + glow * uStrength;
      gl_FragColor = vec4(lit + tooth * uPaperTooth * uPaperAmount, 1.0);
      return;
    }

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
    /* Paper filter. Rod's numbers, approved 2026-08-22: it masks the artefacts from the low bloom
       and reflection resolutions and makes them read as intentional. Source: Shadertoy
       bump-from-depth paper displacement, remixed (procedural fbm replaced with a baked texture). */
    this.paper = {
      amount: options.paperAmount ?? 1,
      tile: options.paperTile ?? 4,
      tile2: options.paperTile2 ?? 12,       // second sheet, deliberately a different scale
      mix: options.paperMix ?? 0.5,          // 0 = first sheet only
      blend: options.paperBlend ?? 0,        // see blendSheets() in COMPOSITE_FRAG
      bleed: options.paperBleed ?? 0.5,      // the source blended 0.4/0.6; Rod took it to 0.5
      displace: options.paperDisplace ?? 0.0075,
      tooth: options.paperTooth ?? 0.05,
      boilHz: options.paperBoilHz ?? 2       // the hand-drawn boil; the source used 4
    };

    this.composite = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        tMipTight: { value: null },
        tMipWide: { value: null },
        uStrength: { value: this.strength },
        uRadius: { value: this.radius },
        tPaper: { value: null },
        tPaper2: { value: null },
        uPaperAmount: { value: 0 },
        uPaperTile: { value: new THREE.Vector2() },
        uPaperTile2: { value: new THREE.Vector2() },
        uPaperMix: { value: this.paper.mix },
        uPaperBlend: { value: 0 },
        uPaperOffset: { value: new THREE.Vector2() },
        uPaperBleed: { value: this.paper.bleed },
        uPaperDisplace: { value: this.paper.displace },
        uPaperTooth: { value: this.paper.tooth }
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

  /* The pass does not load the texture itself - the caller owns that, so the tuner can swap between
     paper variants without the pass knowing they exist. */
  setPaperTexture(texture, slot = 0) {
    if (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    }
    this.composite.uniforms[slot === 1 ? 'tPaper2' : 'tPaper'].value = texture;
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
    const u = this.composite.uniforms;
    u.tDiffuse.value = readBuffer.texture;
    u.tMipTight.value = this.tight.texture;
    u.tMipWide.value = this.wide.texture;
    u.uStrength.value = this.strength;
    u.uRadius.value = this.radius;

    const p = this.paper;
    u.uPaperAmount.value = p.amount;
    u.uPaperTile.value.set(p.tile, p.tile);
    u.uPaperTile2.value.set(p.tile2, p.tile2);
    /* no second texture bound = no second layer, whatever the mix says */
    u.uPaperMix.value = u.tPaper2.value ? p.mix : 0;
    u.uPaperBlend.value = p.blend;
    u.uPaperBleed.value = p.bleed;
    u.uPaperDisplace.value = p.displace;
    u.uPaperTooth.value = p.tooth;
    /* The "boil": re-roll the sheet a few times a second rather than every frame, so it reads as
       hand-drawn rather than as video noise. Quantised in JS so the shader stays arithmetic-free. */
    if (p.boilHz > 0) {
      const step = Math.floor(performance.now() * 0.001 * p.boilHz);
      const frac = (x) => x - Math.floor(x);
      u.uPaperOffset.value.set(
        frac(Math.sin(step * 12.9898) * 43758.5453),
        frac(Math.sin(step * 78.233) * 43758.5453)
      );
    } else {
      u.uPaperOffset.value.set(0, 0);
    }

    this.blit(renderer, this.composite, this.renderToScreen ? null : writeBuffer);

    renderer.setRenderTarget(previousTarget);
  }

  dispose() {
    [this.half, this.quarter, this.wide, this.tight].forEach((t) => t && t.dispose());
    [this.copy, this.down, this.up, this.composite].forEach((m) => m && m.dispose());
    this.quad.geometry.dispose();
  }
}
