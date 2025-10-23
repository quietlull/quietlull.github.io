/**
 * @module WaterShader
 * Water shader with mirror reflection
 */

/**
 * Simple water shader that mirrors the scene above it.
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
const WaterShader = {

	name: 'WaterShader',

	uniforms: {
		tMirror: { value: null }, // Set this when creating the material
		brightness: { value: 0.5 } // How dim the reflection is (0.0 - 1.0)
	},

	vertexShader: /* glsl */`

		varying vec2 vUv;
		
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`,

	fragmentShader: /* glsl */`

		uniform sampler2D tMirror;
		uniform float brightness;
		varying vec2 vUv;
		
		void main() {
			// Flip the UV vertically to create mirror effect
			vec2 mirrorUV = vec2(vUv.x, 1.0 - vUv.y);
			
			// Sample the mirrored scene
			vec4 mirrorColor = texture2D(tMirror, mirrorUV);
			
			// Dim it
			mirrorColor.rgb *= brightness;
			
			gl_FragColor = mirrorColor;
		}
	`

};

export { WaterShader };