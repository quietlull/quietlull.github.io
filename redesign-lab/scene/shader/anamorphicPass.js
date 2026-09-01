/**
 * @module anamorphicPass
 * Star / streak glare, ported to classic WebGL from the three.js official example
 * `webgpu_postprocessing_anamorphic`, then cut down to the controls Rod actually uses.
 *
 * SOURCE (read from the example's own file, never a summary of it - see docs/TRAPS.md):
 *   https://github.com/mrdoob/three.js/blob/dev/examples/webgpu_postprocessing_anamorphic.html
 *
 *   bloomPass.highPassFn = Fn( ( { input, threshold, smoothWidth } ) => {
 *     const v = luminance( input.rgb );
 *     const alpha = smoothstep( threshold, threshold.add( smoothWidth ), v );
 *     const brightPass = rtt( mix( vec4( 0 ), input, alpha ), ... MirroredRepeatWrapping );
 *     const total = vec4( 0 ); const halfSamples = samples.div( 2 );
 *     const invSize = vec2( 1.0 ).div( viewportSize );
 *     Loop( { start: halfSamples.negate(), end: halfSamples }, ( { i } ) => {
 *       let softness = float( i ).abs().div( halfSamples ).oneMinus(); softness = softness.pow( 2.0 );
 *       const shiftedUV = vec2( uv().x.add( invSize.x.mul( i ).mul( 4.0 ) ), uv().y );
 *       total.addAssign( brightPass.sample( shiftedUV ).mul( softness ) );
 *     } );
 *     return total.div( samples.div( 3.0 ) );
 *   } );
 *
 * THE STRUCTURE, which is the part that matters: this replaces the bloom's HIGH PASS, not the
 * bloom. The smeared bright buffer still runs through the whole mip chain, so you get a directional
 * core AND a soft halo. A bare streak pass with no bloom behind it looks nothing like the example.
 *
 * WHAT ROD PINNED (2026-08-13), now constants rather than sliders:
 *   pixel step 0.5   he ran it at the minimum every time; with `samples` also scaling the length,
 *                    two multiplied length controls was one too many
 *   tint white       so the pass's bloomTintColors just stay at their default and the writes are gone
 *   radius 0         the source's own value
 *   threshold        follows the real scene bloom instead of the example's 0.3
 *
 * ARMS generalises the source's single horizontal streak. Arms are spread evenly over 180 degrees,
 * and each arm draws two opposing points, so 1 arm = a 2-point streak (the source exactly),
 * 2 arms = the 4-point cross of a physical star filter, 3 arms = a 6-point star.
 * Arms are NOT divided down: a real star filter does not dim its arms as you add points, so going
 * from 2-point to 6-point roughly triples the glare and wants the strength pulled back.
 *
 * PORT DIFFERENCE: the example caches the thresholded image in an `rtt` and samples that; a classic
 * ShaderPass has no such cache, so this re-thresholds per sample. Same result, more ALU.
 */

const STEP_TEXELS = 0.5;   // Rod's pinned value, baked in

/**
 * Swap an UnrealBloomPass's high-pass filter for the streaking one - the classic-WebGL equivalent
 * of the example's `bloomPass.highPassFn = Fn(...)`. Everything downstream (the 5-mip blur chain,
 * the composite, strength and radius) is left exactly as three.js built it.
 *
 * @param {UnrealBloomPass} bloomPass - the pass to convert. Mutated in place.
 * @returns {{uSamples: object, uInvSize: object, uArms: object, uAspect: object}} added uniforms.
 */
export function patchHighPassToStreak(bloomPass) {
  const u = bloomPass.highPassUniforms;

  u.uSamples = { value: 8.0 };
  u.uInvSize = { value: null };   // the page sets a Vector2: 1 / bright-buffer size
  u.uArms = { value: 2.0 };       // 1 = 2-point, 2 = 4-point cross, 3 = 6-point star
  u.uAspect = { value: 16 / 9 };

  bloomPass.materialHighPassFilter.fragmentShader = /* glsl */`
		uniform sampler2D tDiffuse;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		uniform float uSamples;
		uniform vec2 uInvSize;
		uniform float uArms;
		uniform float uAspect;

		varying vec2 vUv;

		const int MAX_SAMPLES = 128;
		const int MAX_ARMS = 3;
		const float STEP_TEXELS = ${STEP_TEXELS.toFixed(1)};
		const float PI = 3.14159265;

		// the source wraps its bright buffer MirroredRepeat, so samples that walk off screen mirror
		// back. Plain clamp-to-edge would smear border pixels into false streaks down every edge.
		vec2 mirrorUV(vec2 uv) {
			return abs(mod(uv - 1.0, 2.0) - 1.0);
		}

		vec4 brightAt(vec2 uv) {
			vec4 texel = texture2D(tDiffuse, mirrorUV(uv));
			float v = dot(texel.xyz, vec3(0.2126, 0.7152, 0.0722));
			return mix(vec4(0.0), texel, smoothstep(luminosityThreshold, luminosityThreshold + smoothWidth, v));
		}

		// TSL's Loop({start:-half, end:half}) is end-EXCLUSIVE, so this runs n samples over
		// -half .. half-1 to match it rather than being one sample wider.
		vec4 smear(vec2 axis) {
			vec4 total = vec4(0.0);
			int n = int(uSamples);
			int halfN = n / 2;
			float halfF = max(float(halfN), 1.0);
			for (int i = 0; i < MAX_SAMPLES; i++) {
				if (i >= n) break;
				float fi = float(i - halfN);
				float softness = 1.0 - abs(fi) / halfF;
				softness *= softness;
				total += brightAt(vUv + axis * uInvSize * fi * STEP_TEXELS) * softness;
			}
			return total / (uSamples / 3.0);   // source normalisation: deliberately hot, not a mean
		}

		void main() {
			int arms = int(uArms);
			vec4 total = vec4(0.0);
			for (int k = 0; k < MAX_ARMS; k++) {
				if (k >= arms) break;
				float ang = PI * float(k) / float(arms);        // evenly spaced over 180 degrees
				// y scaled by aspect so every arm reads the same LENGTH on screen, not in UV
				total += smear(vec2(cos(ang), sin(ang) * uAspect));
			}
			gl_FragColor = total;
		}
	`;
  bloomPass.materialHighPassFilter.needsUpdate = true;

  return { uSamples: u.uSamples, uInvSize: u.uInvSize, uArms: u.uArms, uAspect: u.uAspect };
}
