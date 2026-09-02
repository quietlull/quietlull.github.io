/* WORKBENCH COPY, NOT THE SHIPPING FILE.
   The shipping version of this module is:
       _javascript/shader/lanternShaderManager.js
   It is currently BYTE-IDENTICAL to that file, which will not stay true.

   READ THIS BEFORE COPYING ANYTHING OUT OF HERE. The live tree is authoritative: it has
   received fixes this copy never saw, and a performance pass edits it independently. Porting
   from the lab to the site has already shipped stale code once, which is why this header
   exists rather than the file simply being deleted.

   IT IS KEPT ON PURPOSE, not by neglect. Checked 2026-09-02: every file under
   redesign-lab/scene/ and redesign-lab/effects/ is imported by something here. This one is
   reachable from the lab pages, and deleting it would break them. The scene files serve the
   character-scene track; the effects files serve the six final-*.html reference pages and
   the tuners Rod works from.

   Fixing a bug? Fix it in the shipping file. Change this one only when the LAB PAGE needs it. */
import * as THREE from 'three';
import { LanternShader } from './lanternShader.js';

/**
 * Manages lantern materials with gradient glow and flicker animation
 */
export class LanternMaterialManager {
  constructor(config) {
    this.config = config;
    this.materials = [];
    this.time = 0;
  }

  /**
   * Create a new lantern material with custom properties
   * @param {Object} options - Material options
   * @param {THREE.Color} options.baseColor - Base color of the lantern
   * @param {number} options.flickerSpeed - Speed of flicker animation
   * @param {number} options.flickerAmount - Amount of brightness variation
   * @param {number} options.gradientCenter - Y position of brightest point
   * @param {number} options.gradientRange - Height range for gradient
   * @returns {THREE.ShaderMaterial} The created material
   */
  createMaterial(options = {}) {
    const material = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(LanternShader.uniforms),
      vertexShader: LanternShader.vertexShader,
      fragmentShader: LanternShader.fragmentShader,
      transparent: false
    });

    // Set base color from config or options
    const baseColor = options.baseColor || new THREE.Color(this.config.lanterns.glow.color);
    material.uniforms.baseColor.value = baseColor;

    // Set gradient properties
    material.uniforms.gradientStart.value = options.gradientStart ?? 1.0;
    material.uniforms.gradientEnd.value = options.gradientEnd ?? 0.35;
    material.uniforms.gradientCenter.value = options.gradientCenter ?? 0.0;
    material.uniforms.gradientRange.value = options.gradientRange ?? 100.0;

    // Set flicker properties with randomization for variety
    const flickerSpeedVariation = 1.0 + (Math.random() - 0.5) * 0.3; // ±15% variation
    material.uniforms.flickerSpeed.value = (options.flickerSpeed ?? 3.0) * flickerSpeedVariation;
    material.uniforms.flickerAmount.value = options.flickerAmount ?? 0.15;
    material.uniforms.flickerColorShift.value = options.flickerColorShift ?? 0.05;

    // Set emission intensity
    material.uniforms.emissiveIntensity.value = options.emissiveIntensity ?? this.config.lanterns.glow.intensity;

    // Add random time offset so lanterns don't all flicker in sync
    material.userData.timeOffset = Math.random() * 100.0;

    // Track material for updates
    this.materials.push(material);

    return material;
  }

  /**
   * Create material for a lantern mesh, auto-calculating gradient center
   * @param {THREE.Mesh} mesh - The lantern mesh
   * @param {Object} options - Additional material options
   * @returns {THREE.ShaderMaterial} The created material
   */
  createMaterialForMesh(mesh, options = {}) {
    // Calculate bounding box to determine gradient center
    mesh.geometry.computeBoundingBox();
    const bbox = mesh.geometry.boundingBox;

    // Set gradient center to bottom of lantern (where flame would be)
    const gradientCenter = bbox.min.y;
    const gradientRange = (bbox.max.y - bbox.min.y) * .8; // Slightly larger than lantern height

    return this.createMaterial({
      ...options,
      gradientCenter,
      gradientRange
    });
  }

  /**
   * Update all lantern materials (call in animation loop)
   * @param {number} deltaTime - Time elapsed since last frame (normalized to 60fps)
   */
  update(deltaTime = 1.0) {
    // Update time (runs at 60fps rate when deltaTime = 1.0)
    this.time += 0.016 * deltaTime;

    // Update all materials (plain loop: no per-frame closure allocation)
    const materials = this.materials;
    for (let i = 0; i < materials.length; i++) {
      const material = materials[i];
      if (material.uniforms && material.uniforms.time) {
        material.uniforms.time.value = this.time + material.userData.timeOffset;
      }
    }
  }

  /**
   * Set global flicker amount for all lanterns
   * @param {number} amount - Flicker amount (0.0 - 1.0)
   */
  setFlickerAmount(amount) {
    this.materials.forEach(material => {
      if (material.uniforms && material.uniforms.flickerAmount) {
        material.uniforms.flickerAmount.value = amount;
      }
    });
  }

  /**
   * Set global flicker speed for all lanterns
   * @param {number} speed - Flicker speed
   */
  setFlickerSpeed(speed) {
    this.materials.forEach(material => {
      if (material.uniforms && material.uniforms.flickerSpeed) {
        // Preserve individual variation
        const baseSpeed = material.uniforms.flickerSpeed.value / 3.0;
        material.uniforms.flickerSpeed.value = speed * baseSpeed;
      }
    });
  }

  /**
   * Set emission intensity for all lanterns
   * @param {number} intensity - Emission intensity
   */
  setEmissiveIntensity(intensity) {
    this.materials.forEach(material => {
      if (material.uniforms && material.uniforms.emissiveIntensity) {
        material.uniforms.emissiveIntensity.value = intensity;
      }
    });
  }

  /**
   * Get count of managed materials
   * @returns {number} Number of materials
   */
  getMaterialCount() {
    return this.materials.length;
  }
}