// Three.js Minimal — Lightest ambient background
// Lanterns only. No fireworks, no mouse avoidance, flat camera.
// Pure visual decoration with minimal performance cost.

import { LanternController } from './lantern-controller.js';
import { LanternMaterialManager } from './shader/lanternShaderManager.js';
import {
  CONFIG,
  createBaseScene,
  updateCameraFOV,
  spawnProceduralLanterns,
  setupResizeHandler,
  startAnimationLoop,
} from './three-shared.js';

{

const { scene, camera, renderer, composer, bloomPass } = createBaseScene();

const lanternController = new LanternController(CONFIG, camera, { avoidance: false });
const lanternMaterialManager = new LanternMaterialManager(CONFIG);

updateCameraFOV(camera);

// Procedural box lanterns — no FBX needed
spawnProceduralLanterns(scene, lanternController, lanternMaterialManager, 15);

// Resize
setupResizeHandler(camera, renderer, composer, lanternController);

// Animation loop (no fireworks)
startAnimationLoop(renderer, composer, [
  lanternMaterialManager,
  lanternController,
]);

// Debug globals
window.scene = scene;
window.camera = camera;
window.renderer = renderer;
window.THREEJS_CONFIG = CONFIG;
window.THREEJS_PRESET = 'minimal';
window.bloomPass = bloomPass;
window.lanternController = lanternController;
window.lanternMaterialManager = lanternMaterialManager;

}
