/**
 * @module LanternShaderFlat
 * FLAT variant of Rod's lantern shader, for the anime-glow test scene.
 *
 * WHY: bloom reads as anime glow because it wraps a HARD-EDGED, FLAT source. Rod's live shader
 * ramps brightness continuously down the lantern body (lanternShader.js:84-88), so the halo has no
 * edge to sit against and soft-on-soft turns to mush.
 *
 * ROD'S RULE (2026-08-13): gradients are fine in general, Shinsekai yori uses them freely. They are
 * only forbidden on things that FEED THE BLOOM. This shader is the bloom-feeding case.
 *
 * This is the whole change: one emissive value across the mesh, no vertical ramp. Flicker stays,
 * because it varies over TIME, not across the surface, so it costs no hard edge.
 *
 * gradientStart is reused as the flat level so Rod's LanternMaterialManager drives this unchanged.
 * gradientEnd/Center/Range are still set by the manager but go unused here; three.js simply ignores
 * uniforms a program does not declare, and they are needed again the moment the scene A/Bs back to
 * the gradient shader.
 *
 * SUPERSEDED (2026-08-13): a first version quantised the ramp into `uBands` flat steps. It looked
 * wrong and Rod caught it. createMaterialForMesh sets gradientRange to mesh height * 0.8, so
 * gradientFactor is clamped at exactly 1.0 over the top 20% of every lantern, and floor(1.0)/1.0
 * is 1.0 rather than 0.0 - so that cap alone landed on gradientEnd and the "flat" lantern came out
 * two-tone with a hard line across it. Bands are gone; flat means flat.
 */

const LanternShaderFlat = {
  name: 'LanternShaderFlat',

  fragmentShader: /* glsl */`
		uniform vec3 baseColor;
		uniform float gradientStart;   // reused as the single flat emissive level

		uniform float time;
		uniform float flickerSpeed;
		uniform float flickerAmount;
		uniform float flickerColorShift;
		uniform float emissiveIntensity;

		varying vec3 vPosition;
		varying vec2 vUv;

		// Noise function for organic flicker (unchanged from the original)
		float noise(float t) {
			return fract(sin(t * 12.9898) * 43758.5453);
		}

		// Smooth noise (unchanged from the original)
		float smoothNoise(float t) {
			float i = floor(t);
			float f = fract(t);
			float a = noise(i);
			float b = noise(i + 1.0);
			return mix(a, b, smoothstep(0.0, 1.0, f));
		}

		void main() {
			// THE CHANGE: no vertical ramp at all. One level over the whole mesh, so the bloom
			// wraps a hard silhouette instead of fading into another soft gradient.
			float baseBrightness = gradientStart;

			// Flicker is temporal, not spatial, so it survives untouched.
			float flicker1 = smoothNoise(time * flickerSpeed);
			float flicker2 = smoothNoise(time * flickerSpeed * 1.7 + 100.0) * 0.5;
			float flickerValue = (flicker1 + flicker2) / 1.5;

			float brightness = baseBrightness * (1.0 - flickerAmount + flickerValue * flickerAmount);

			vec3 flickerColor = baseColor;
			flickerColor.r += flickerValue * flickerColorShift;
			flickerColor.g += flickerValue * flickerColorShift * 0.5;

			vec3 emissive = flickerColor * brightness * emissiveIntensity;

			gl_FragColor = vec4(emissive, 1.0);
		}
	`,
};

export { LanternShaderFlat };
