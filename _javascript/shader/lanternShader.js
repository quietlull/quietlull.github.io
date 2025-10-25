/**
 * @module LanternShader
 * Custom shader for lanterns with gradient glow and flickering animation
 */

/**
 * Lantern shader that simulates flame-based lighting with:
 * - Vertical gradient (bright at bottom/center, dim at top)
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
    gradientStart: { value: 1.0 }, // Brightness at bottom (1.0 = full bright)
    gradientEnd: { value: 0.3 },   // Brightness at top (0.3 = dim)
    gradientCenter: { value: 0.0 }, // Y position of brightest point (world coords)
    gradientRange: { value: 100.0 }, // Height range for gradient falloff

    // Flicker animation
    time: { value: 0.0 },
    flickerSpeed: { value: 3.0 },    // How fast the flicker
    flickerAmount: { value: 0.15 },  // How much brightness variation (0.0 - 1.0)
    flickerColorShift: { value: 0.05 }, // How much color shifts (towards red/yellow)

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
		varying vec3 vNormal;
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
			// Distance from gradient center
			float distanceFromCenter = abs(vPosition.y - gradientCenter);
			
			// Normalize distance (0 at center, 1 at gradientRange distance)
			float gradientFactor = clamp(distanceFromCenter / gradientRange, 0.0, 1.0);
			
			// Apply gradient (bright at center/bottom, dim at top)
			float baseBrightness = mix(gradientStart, gradientEnd, gradientFactor);
			
			// Add flicker animation
			// Use multiple octaves of noise for organic feel
			float flicker1 = smoothNoise(time * flickerSpeed);
			float flicker2 = smoothNoise(time * flickerSpeed * 1.7 + 100.0) * 0.5;
			float flicker3 = smoothNoise(time * flickerSpeed * 2.3 + 200.0) * 0.25;
			float flickerValue = (flicker1 + flicker2 + flicker3) / 1.75;
			
			// Apply flicker to brightness
			float brightness = baseBrightness * (1.0 - flickerAmount + flickerValue * flickerAmount);
			
			// Color shift for flicker (slightly more yellow/red when brighter)
			vec3 flickerColor = baseColor;
			flickerColor.r += flickerValue * flickerColorShift;
			flickerColor.g += flickerValue * flickerColorShift * 0.5;
			
			// Calculate final color
			vec3 emissive = flickerColor * brightness * emissiveIntensity;
			
			gl_FragColor = vec4(emissive, 1.0);
		}
	`

};

export { LanternShader };