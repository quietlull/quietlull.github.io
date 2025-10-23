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
<<<<<<< HEAD
            varying vec4 vWorldPosition;
            varying vec3 vNormal;
            
            void main() {
                // Calculate world position
                vWorldPosition = modelMatrix * vec4(position, 1.0);
                
                // Calculate world normal
                vNormal = normalize(normalMatrix * normal);
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,

	fragmentShader: /* glsl */`

            uniform sampler2D tReflection;
            uniform mat4 uMirrorViewMatrix;
            uniform mat4 uMirrorProjectionMatrix;
            uniform vec3 uCameraPosition;
            
            varying vec4 vWorldPosition;
            varying vec3 vNormal;
            
            void main() {
                // Calculate view direction (from camera to fragment)
                vec3 viewDir = normalize(vWorldPosition.xyz - uCameraPosition);
                
                // Reflect the view direction across the plane normal
                vec3 reflectDir = reflect(viewDir, vNormal);
                
                // Calculate reflected position (where the reflection "comes from")
                // We project from the fragment position along the reflection direction
                vec3 reflectedPos = vWorldPosition.xyz + reflectDir * 0.01;
                
                // Transform to mirror camera's clip space
                vec4 mirrorSpacePos = uMirrorProjectionMatrix * uMirrorViewMatrix * vec4(reflectedPos, 1.0);
                
                // Perspective divide to get NDC coordinates
                vec3 ndc = mirrorSpacePos.xyz / mirrorSpacePos.w;
                
                // Convert from NDC (-1 to 1) to texture coordinates (0 to 1)
                vec2 reflectionUV = ndc.xy * 0.5 + 0.5;
                
                // Sample the reflection texture
                vec4 reflection = texture2D(tReflection, reflectionUV);
                
                // Add a slight tint to make it look more like a mirror
                reflection.rgb *= 0.95;
                
                gl_FragColor = reflection;
            }
        `
=======

		varying vec2 vUv;
    varying vec4 vPos;
    
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vPos = gl_Position;
		}
	`,

	fragmentShader: /* glsl */`

		uniform sampler2D tMirror;
		uniform float brightness;
		varying vec2 vUv;
		varying vec4 vPos;
        
		void main() {
			// Flip the UV vertically to create mirror effect
			vec4 mirrorUV = vec4(vPos.x, 1.0 - vPos.y, vPos.z, vPos.w);
			
			// Sample the mirrored scene
			vec4 mirrorColor = texture2D(tMirror, mirrorUV.xy);
			
			// Dim it
			mirrorColor.rgb *= brightness;
			
			gl_FragColor = mirrorColor;
		}
	`
>>>>>>> cf781fef5d40839370799f7581b355bedef9f943

};

export { WaterShader };
