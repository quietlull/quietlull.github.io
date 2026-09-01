/**
 * @module LanternShader
 * Custom shader for lanterns with gradient glow and flickering animation
 */

/**
 * Lantern shader that simulates flame-based lighting with:
 * - Vertical gradient (bright at bottom/center, still glowing at top)
 * - Animated color flicker for flame effect
 * - Emission for bloom post-processing
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
const LanternShader = {

  name: 'LanternShader',

  uniforms: {
    // Base lantern color (warm orange)
    baseColor: { value: null }, // THREE.Color

    // Gradient controls
    gradientStart: { value: 1.0 }, // Brightness at center (1.0 = full bright)
    gradientEnd: { value: 0.35 },  // Brightness at edges (still glows at top)
    gradientCenter: { value: 0.0 }, // Y position of brightest point (world coords)
    gradientRange: { value: 100.0 }, // Height range for gradient falloff

    // Flicker animation
    time: { value: 0.0 },
    flickerSpeed: { value: 3.0 },
    flickerAmount: { value: 0.15 },
    flickerColorShift: { value: 0.05 },

    // Overall intensity
    emissiveIntensity: { value: 2.0 }
  },

  vertexShader: /* glsl */`
		varying vec3 vPosition;
		varying vec3 vNormal;
		varying vec2 vUv;

		void main() {
			vPosition = position;
			vNormal = normalize(normalMatrix * normal);
			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`,

  fragmentShader: /* glsl */`
		uniform vec3 baseColor;
		uniform float gradientStart;
		uniform float gradientEnd;
		uniform float gradientCenter;
		uniform float gradientRange;

		uniform float time;
		uniform float flickerSpeed;
		uniform float flickerAmount;
		uniform float flickerColorShift;
		uniform float emissiveIntensity;

		varying vec3 vPosition;
		varying vec2 vUv;

		// Noise function for organic flicker
		float noise(float t) {
			return fract(sin(t * 12.9898) * 43758.5453);
		}

		// Smooth noise
		float smoothNoise(float t) {
			float i = floor(t);
			float f = fract(t);
			float a = noise(i);
			float b = noise(i + 1.0);
			return mix(a, b, smoothstep(0.0, 1.0, f));
		}

		void main() {
			// Calculate gradient based on Y position
			float distanceFromCenter = abs(vPosition.y - gradientCenter);
			float gradientFactor = clamp(distanceFromCenter / gradientRange, 0.0, 1.0);
			float baseBrightness = mix(gradientStart, gradientEnd, gradientFactor);

			// Flicker: two octaves of noise for organic feel (third octave removed for perf)
			float flicker1 = smoothNoise(time * flickerSpeed);
			float flicker2 = smoothNoise(time * flickerSpeed * 1.7 + 100.0) * 0.5;
			float flickerValue = (flicker1 + flicker2) / 1.5;

			float brightness = baseBrightness * (1.0 - flickerAmount + flickerValue * flickerAmount);

			// Color shift for flicker (slightly more yellow/red when brighter)
			vec3 flickerColor = baseColor;
			flickerColor.r += flickerValue * flickerColorShift;
			flickerColor.g += flickerValue * flickerColorShift * 0.5;

			vec3 emissive = flickerColor * brightness * emissiveIntensity;

			gl_FragColor = vec4(emissive, 1.0);
		}
	`

};

export { LanternShader };
