import * as THREE from 'three';

/**
 * Creates a mirror surface material that reflects the scene with wave distortion
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
    this.reflectionIntensity = options.reflectionIntensity ?? 0.85;
    this.reflectionSaturation = options.reflectionSaturation ?? 0.7;
    this.reflectionTint = options.reflectionTint ?? new THREE.Color(0xffffff);

    // Wave distortion options
    this.waveStrength = options.waveStrength ?? 0.02;
    this.waveSpeed = options.waveSpeed ?? 0.5;
    this.waveScale = options.waveScale ?? 1.0;
    this.waveType = options.waveType ?? 1;

    // Get the mirror plane's Y position (the reflection plane)
    const worldPos = new THREE.Vector3();
    mirrorPlane.getWorldPosition(worldPos);
    this.mirrorPlaneY = worldPos.y;

    // Create the mirror camera
    this.mirrorCamera = new THREE.PerspectiveCamera(
      camera.fov * 1,
      camera.aspect,
      0.001,
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

    const textureLoader = new THREE.TextureLoader();
    this.dudvTexture = textureLoader.load('/assets/tex/DUV.png');
    this.dudvTexture.wrapS = THREE.RepeatWrapping;
    this.dudvTexture.wrapT = THREE.RepeatWrapping;

    // Create the material
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
  varying vec2 vUv;
  varying vec4 vWorldPosition;
  varying vec3 vNormal;
  
  void main() {
    vec3 viewDir = normalize(vWorldPosition.xyz - uCameraPosition);
    vec3 reflectDir = reflect(viewDir, vNormal);
    vec3 reflectedPos = vWorldPosition.xyz + reflectDir * 0.01;
    vec4 mirrorSpacePos = uMirrorProjectionMatrix * uMirrorViewMatrix * vec4(reflectedPos, 1.0);

    vec3 ndc = mirrorSpacePos.xyz / mirrorSpacePos.w;
    vec2 reflectionUV = ndc.xy * 0.5 + 0.5;

    // Sample distortion
    vec2 dudvUV = vUv * vec2(.01, 10.0) + uTime * uWaveSpeed * 0.05;
    vec2 distortion = texture2D(tDudv, dudvUV).rg;
    distortion = (distortion * 2.0 - 1.0) * uWaveStrength;
    
    // Apply distortion to reflection UV
    vec2 distortedReflectionUV = reflectionUV + distortion;
    
    // Sample distorted reflection 
    vec4 Dreflection = texture2D(tReflection, distortedReflectionUV);
    
    // Calculate distortion strength for highlighting
    float distortionStrength = length(distortion) * 1.0; // Amplify for visibility
    
    // Create wave highlights - brighten areas with distortion
    vec3 waveHighlight = vec3(0.3, 0.5, 0.7) * distortionStrength; // Blue tint
    
    // Add the highlights to the reflection
    vec3 finalColor = Dreflection.rgb + waveHighlight;
    
    gl_FragColor = vec4(finalColor, 1.0);
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
        uWaveType: { value: this.waveType }
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

    this.mirrorCamera.position.copy(this.camera.position);
    const distanceFromPlane = this.camera.position.y - this.mirrorPlaneY;
    this.mirrorCamera.position.y = this.mirrorPlaneY - distanceFromPlane;

    this.mirrorCamera.rotation.x = -this.camera.rotation.x;
    this.mirrorCamera.rotation.y = this.camera.rotation.y;
    this.mirrorCamera.rotation.z = this.camera.rotation.z;

    this.mirrorCamera.updateMatrixWorld();
    this.mirrorCamera.updateProjectionMatrix();

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

  setWaveStrength(value) {
    this.waveStrength = value;
    this.material.uniforms.uWaveStrength.value = value;
  }

  setWaveSpeed(value) {
    this.waveSpeed = value;
    this.material.uniforms.uWaveSpeed.value = value;
  }

  setWaveScale(value) {
    this.waveScale = value;
    this.material.uniforms.uWaveScale.value = value;
  }

  setWaveType(type) {
    this.waveType = Math.floor(type);
    this.material.uniforms.uWaveType.value = Math.floor(type);
  }

  setReflectionIntensity(value) {
    this.reflectionIntensity = Math.max(0, Math.min(1, value));
    this.material.uniforms.uReflectionIntensity.value = this.reflectionIntensity;
  }

  setReflectionSaturation(value) {
    this.reflectionSaturation = Math.max(0, Math.min(1, value));
    this.material.uniforms.uReflectionSaturation.value = this.reflectionSaturation;
  }

  setReflectionTint(color) {
    this.reflectionTint = color;
    this.material.uniforms.uReflectionTint.value = color;
  }

  dispose() {
    this.renderTarget.dispose();
    this.material.dispose();
  }
}
