// Three.js Minimal — Ambient background for post pages
// Tiny floating embers (white-yellow, organic flutter) + a few edge lanterns.
// Scroll-locked camera, mouse avoidance.

import * as THREE from 'three';
import { LanternController } from './lantern-controller.js';
import { LanternMaterialManager } from './shader/lanternShaderManager.js';
import {
  CONFIG,
  createBaseScene,
  updateCameraFOV,
  setupResizeHandler,
  setupScrollLockedCamera,
  startAnimationLoop,
} from './three-shared.js';

{

const { scene, camera, renderer, composer, bloomPass } = createBaseScene();

/* Mouse avoidance enabled — stronger displacement than lanterns */
const lanternController = new LanternController(CONFIG, camera, {
  avoidance: true,
  displacementScale: 2,
  intersectionZ: -300,
});
const lanternMaterialManager = new LanternMaterialManager(CONFIG);

/* Push camera far back so everything appears small and distant */
camera.position.z = 1500;
updateCameraFOV(camera);

const EMBER_COUNT = 35;
const emberGeometry = new THREE.SphereGeometry(8, 8, 6);
emberGeometry.computeBoundingBox();

/* Defer spawning until page content is fully laid out */
function spawnElements() {
  const vFov = camera.fov * Math.PI / 180;
  const worldPerPixelY = (2 * camera.position.z * Math.tan(vFov / 2)) / window.innerHeight;
  const pageWorldHeight = document.documentElement.scrollHeight * worldPerPixelY;

  const yTop = pageWorldHeight * 0.1;
  const yBottom = -(pageWorldHeight * 1.1);

  /* --- Embers: white-yellow, organic flutter --- */
  for (let i = 0; i < EMBER_COUNT; i++) {
    const mesh = new THREE.Mesh(emberGeometry);

    mesh.material = lanternMaterialManager.createMaterialForMesh(mesh, {
      baseColor: new THREE.Color(0xfff4cc),
      gradientStart: CONFIG.lanterns.shader.gradientStart,
      gradientEnd: CONFIG.lanterns.shader.gradientEnd,
      flickerSpeed: (1.5 + Math.random() * 2.5),
      flickerAmount: (0.4 + Math.random() * 0.3),
      flickerColorShift: 0.15 + Math.random() * 0.1,
    });

    let x, y, z;
    const yPos = yTop + Math.random() * (yBottom - yTop);

    /* Spread evenly across the full viewport width */
    x = (Math.random() - 0.5) * 1800;
    y = yPos;
    z = -100 - Math.random() * 500;

    mesh.position.set(x, y, z);
    lanternController.addLantern(mesh);
    scene.add(mesh);
  }

}

window.addEventListener('load', spawnElements);

/* Scroll-locked camera — embers drift as user reads */
const scrollCam = setupScrollLockedCamera(camera);

/* Resize */
setupResizeHandler(camera, renderer, composer, lanternController);

/* Animation loop (no fireworks) */
startAnimationLoop(renderer, composer, [
  lanternMaterialManager,
  lanternController,
]);

/* Debug globals */
window.scene = scene;
window.camera = camera;
window.renderer = renderer;
window.THREEJS_CONFIG = CONFIG;
window.THREEJS_PRESET = 'minimal';
window.bloomPass = bloomPass;
window.lanternController = lanternController;
window.lanternMaterialManager = lanternMaterialManager;

}
