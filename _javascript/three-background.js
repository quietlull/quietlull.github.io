import * as THREE from 'three';

// Your three.js code for the background scene
class ThreeBackground {
  constructor() {
    this.init();
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / windowInnerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0); // Transparent background

    // Check if we have a container, if not, create one
    let container = document.getElementById('three-background-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'three-background-container';
      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.zIndex = '-1';
      container.style.pointerEvents = 'none';
      document.body.appendChild(container);
    }
    container.appendChild(this.renderer.domElement);

    this.camera.position.z = 5;

    // Add your lanterns and other objects here
    this.createLanterns();

    this.animate();

    window.addEventListener('resize', () => this.onResize());
  }

  createLanterns() {
    // Example: create a simple lantern (sphere)
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    this.lantern = new THREE.Mesh(geometry, material);
    this.scene.add(this.lantern);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Rotate the lantern
    if (this.lantern) {
      this.lantern.rotation.x += 0.01;
      this.lantern.rotation.y += 0.01;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize the ThreeBackground when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThreeBackground();
});