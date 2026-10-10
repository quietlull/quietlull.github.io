import * as THREE from 'three';
import { LanternShader } from './lanternShader.js';

export class LanternMaterialManager {
  constructor(config) {
    this.config = config;
    this.materials = [];
    this.time = 0;
  }

  createMaterial(options = {}) {
    const material = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(LanternShader.uniforms),
      vertexShader: LanternShader.vertexShader,
      fragmentShader: LanternShader.fragmentShader,
      transparent: false
    });

    const baseColor = options.baseColor || new THREE.Color(this.config.lanterns.glow.color);
    material.uniforms.baseColor.value = baseColor;

    material.uniforms.gradientStart.value = options.gradientStart ?? 1.0;
    material.uniforms.gradientEnd.value = options.gradientEnd ?? 0.35;
    material.uniforms.gradientCenter.value = options.gradientCenter ?? 0.0;
    material.uniforms.gradientRange.value = options.gradientRange ?? 100.0;

    const flickerSpeedVariation = 1.0 + (Math.random() - 0.5) * 0.3;
    material.uniforms.flickerSpeed.value = (options.flickerSpeed ?? 3.0) * flickerSpeedVariation;
    material.uniforms.flickerAmount.value = options.flickerAmount ?? 0.15;
    material.uniforms.flickerColorShift.value = options.flickerColorShift ?? 0.05;

    material.uniforms.emissiveIntensity.value = options.emissiveIntensity ?? this.config.lanterns.glow.intensity;

    material.userData.timeOffset = Math.random() * 100.0;

    this.materials.push(material);

    return material;
  }

  createMaterialForMesh(mesh, options = {}) {
    mesh.geometry.computeBoundingBox();
    const bbox = mesh.geometry.boundingBox;

    const gradientCenter = bbox.min.y;
    const gradientRange = (bbox.max.y - bbox.min.y) * .8;

    return this.createMaterial({
      ...options,
      gradientCenter,
      gradientRange
    });
  }

  update(deltaTime = 1.0) {
    this.time += 0.016 * deltaTime;

    const materials = this.materials;
    for (let i = 0; i < materials.length; i++) {
      const material = materials[i];
      if (material.uniforms && material.uniforms.time) {
        material.uniforms.time.value = this.time + material.userData.timeOffset;
      }
    }
  }

  setFlickerAmount(amount) {
    this.materials.forEach(material => {
      if (material.uniforms && material.uniforms.flickerAmount) {
        material.uniforms.flickerAmount.value = amount;
      }
    });
  }

  setFlickerSpeed(speed) {
    this.materials.forEach(material => {
      if (material.uniforms && material.uniforms.flickerSpeed) {
        const baseSpeed = material.uniforms.flickerSpeed.value / 3.0;
        material.uniforms.flickerSpeed.value = speed * baseSpeed;
      }
    });
  }

  setEmissiveIntensity(intensity) {
    this.materials.forEach(material => {
      if (material.uniforms && material.uniforms.emissiveIntensity) {
        material.uniforms.emissiveIntensity.value = intensity;
      }
    });
  }

  getMaterialCount() {
    return this.materials.length;
  }
}