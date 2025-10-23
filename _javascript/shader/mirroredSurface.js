import * as THREE from 'three';

/**
 * Creates a mirror surface material that reflects the scene
 * @param {THREE.Scene} scene - Your Three.js scene
 * @param {THREE.Camera} camera - Your Three.js camera  
 * @param {THREE.WebGLRenderer} renderer - Your Three.js renderer
 * @param {THREE.Mesh} mirrorPlane - The plane mesh that will show the reflection
 */
export class MirroredSurface {
  constructor(scene, camera, renderer, mirrorPlane, options = {}) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.mirrorPlane = mirrorPlane;
    this.time = 0;

    // Reflection appearance options
    this.reflectionIntensity = options.reflectionIntensity ?? 0.85; // 0-1, how bright the reflection is
    this.reflectionSaturation = options.reflectionSaturation ?? 0.7; // 0-1, how colorful (1=full color, 0=grayscale)
    this.reflectionTint = options.reflectionTint ?? new THREE.Color(0xffffff); // Color tint to apply

    // Get the mirror plane's Y position (the reflection plane)
    this.mirrorPlaneY = mirrorPlane.position.y;

    // Create the mirror camera
    this.mirrorCamera = new THREE.PerspectiveCamera(
      camera.fov,
      camera.aspect,
      camera.near,
      camera.far
    );

    // Create render target for reflection
    this.renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat
      }
    );

    // Create the material
    this.material = this.createMirrorMaterial();
  }

  createMirrorMaterial() {
    // Vertex Shader
    const vertexShader = `
      varying vec4 vWorldPosition;
      varying vec3 vNormal;
      
      void main() {
        // Calculate world position
        vWorldPosition = modelMatrix * vec4(position, 1.0);
        
        // Calculate world normal
        vNormal = normalize(normalMatrix * normal);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    // Fragment Shader
    const fragmentShader = `
      uniform sampler2D tReflection;
      uniform mat4 uMirrorViewMatrix;
      uniform mat4 uMirrorProjectionMatrix;
      uniform vec3 uCameraPosition;
      uniform float uReflectionIntensity;
      uniform float uReflectionSaturation;
      uniform vec3 uReflectionTint;
      
      varying vec4 vWorldPosition;
      varying vec3 vNormal;
      
      void main() {
        // Calculate view direction (from camera to fragment)
        vec3 viewDir = normalize(vWorldPosition.xyz - uCameraPosition);
        
        // Reflect the view direction across the plane normal
        vec3 reflectDir = reflect(viewDir, vNormal);
        
        // Calculate reflected position (where the reflection "comes from")
        vec3 reflectedPos = vWorldPosition.xyz + reflectDir * 0.01;
        
        // Transform to mirror camera's clip space
        vec4 mirrorSpacePos = uMirrorProjectionMatrix * uMirrorViewMatrix * vec4(reflectedPos, 1.0);
        
        // Perspective divide to get NDC coordinates
        vec3 ndc = mirrorSpacePos.xyz / mirrorSpacePos.w;
        
        // Convert from NDC (-1 to 1) to texture coordinates (0 to 1)
        vec2 reflectionUV = ndc.xy * 0.5 + 0.5;
        
        // Sample the reflection texture
        vec4 reflection = texture2D(tReflection, reflectionUV);
        
        // Desaturate: blend between grayscale and original color
        float gray = dot(reflection.rgb, vec3(0.299, 0.587, 0.114)); // Luminance
        vec3 desaturated = mix(vec3(gray), reflection.rgb, uReflectionSaturation);
        
        // Apply intensity (brightness/darkness)
        desaturated *= uReflectionIntensity;
        
        // Apply color tint
        desaturated *= uReflectionTint;
        
        gl_FragColor = vec4(desaturated, reflection.a);
      }
    `;

    // Create shader material
    const mirrorMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tReflection: { value: this.renderTarget.texture },
        uMirrorViewMatrix: { value: new THREE.Matrix4() },
        uMirrorProjectionMatrix: { value: new THREE.Matrix4() },
        uCameraPosition: { value: new THREE.Vector3() },
        uReflectionIntensity: { value: this.reflectionIntensity },
        uReflectionSaturation: { value: this.reflectionSaturation },
        uReflectionTint: { value: this.reflectionTint }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide
    });

    return mirrorMaterial;
  }

  update(normalizedDelta = 1.0) {
    // Mirror the camera position across the mirror plane
    this.mirrorCamera.position.copy(this.camera.position);
    // Mirror Y position relative to the mirror plane
    const distanceFromPlane = this.camera.position.y - this.mirrorPlaneY;
    this.mirrorCamera.position.y = this.mirrorPlaneY - distanceFromPlane;

    // Mirror the camera rotation
    // For a horizontal mirror plane (mirroring across Y axis):
    // - X rotation (pitch) is negated: looking down becomes looking up
    // - Y rotation (yaw) stays the same: left/right direction preserved
    // - Z rotation (roll) stays the same: tilt preserved
    this.mirrorCamera.rotation.x = -this.camera.rotation.x;
    this.mirrorCamera.rotation.y = this.camera.rotation.y;
    this.mirrorCamera.rotation.z = this.camera.rotation.z;

    this.mirrorCamera.updateMatrixWorld();
    this.mirrorCamera.updateProjectionMatrix();

    // Update shader uniforms
    this.material.uniforms.uMirrorViewMatrix.value = this.mirrorCamera.matrixWorldInverse;
    this.material.uniforms.uMirrorProjectionMatrix.value = this.mirrorCamera.projectionMatrix;
    this.material.uniforms.uCameraPosition.value.copy(this.camera.position);

    // Hide mirror plane and render reflection
    this.mirrorPlane.visible = false;
    this.renderer.setRenderTarget(this.renderTarget);
    this.renderer.render(this.scene, this.mirrorCamera);

    // Show mirror plane and render normal scene
    this.mirrorPlane.visible = true;
    this.renderer.setRenderTarget(null);
  }

  // Handle window resize
  handleResize() {
    this.renderTarget.setSize(window.innerWidth, window.innerHeight);
    this.mirrorCamera.aspect = this.camera.aspect;
    this.mirrorCamera.updateProjectionMatrix();
  }

  // Update reflection intensity (0-1, how bright the reflection is)
  setReflectionIntensity(value) {
    this.reflectionIntensity = Math.max(0, Math.min(1, value));
    this.material.uniforms.uReflectionIntensity.value = this.reflectionIntensity;
  }

  // Update reflection saturation (0-1, how colorful: 1=full color, 0=grayscale)
  setReflectionSaturation(value) {
    this.reflectionSaturation = Math.max(0, Math.min(1, value));
    this.material.uniforms.uReflectionSaturation.value = this.reflectionSaturation;
  }

  // Update reflection tint color
  setReflectionTint(color) {
    this.reflectionTint = color;
    this.material.uniforms.uReflectionTint.value = color;
  }

  // Clean up resources
  dispose() {
    this.renderTarget.dispose();
    this.material.dispose();
  }
}