import * as THREE from 'three';
import { WaterShader } from './waterShader.js';

/**
 * Creates a water material that mirrors the scene
 * @param {THREE.Scene} scene - Your Three.js scene
 * @param {THREE.Camera} camera - Your Three.js camera  
 * @param {THREE.WebGLRenderer} renderer - Your Three.js renderer
 * @returns {Object} Object containing the material and update function
 */
export function createWaterMaterial(scene, camera, renderer) {
  // Create render target for mirror
  const mirrorRenderTarget = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight
  );
  
  // Create the material
  const material = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.clone(WaterShader.uniforms),
    vertexShader: WaterShader.vertexShader,
    fragmentShader: WaterShader.fragmentShader
  });
  
  // Set the mirror texture
  material.uniforms.tMirror.value = mirrorRenderTarget.texture;
  
  // Track meshes using this material
  const waterMeshes = [];
  
  // Function to update the mirror - call this in your animate loop BEFORE rendering
  material.updateMirror = function() {
    // Hide water meshes
    waterMeshes.forEach(mesh => mesh.visible = false);
    
    // Render scene to texture
    renderer.setRenderTarget(mirrorRenderTarget);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
    
    // Show water meshes again
    waterMeshes.forEach(mesh => mesh.visible = true);
  };
  
  // Function to register meshes that use this material
  material.registerMesh = function(mesh) {
    waterMeshes.push(mesh);
  };
  
  // Function for resize
  material.onResize = function(width, height) {
    mirrorRenderTarget.setSize(width, height);
  };
  
  // Helper to set brightness
  material.setBrightness = function(value) {
    material.uniforms.brightness.value = value;
  };
  
  return material;
}
