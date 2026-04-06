// Three.js General — Landing pages, Projects
// Ambient background that adds liveliness. Lanterns, fireworks, mouse avoidance.
// No water, no dock, no FBX loading. Camera scrolls with page (Y only, no rotation).
// Lanterns placed procedurally, avoiding important DOM elements.

import { LanternController } from './lantern-controller.js';
import { LanternMaterialManager } from './shader/lanternShaderManager.js';
import { FireworkController } from './firework-controller.js';
import {
  CONFIG,
  createBaseScene,
  updateCameraFOV,
  spawnDOMAvoidingLanterns,
  setupScrollLockedCamera,
  setupResizeHandler,
  startAnimationLoop,
} from './three-shared.js';

{

const { scene, camera, renderer, composer, bloomPass } = createBaseScene();

const lanternController = new LanternController(CONFIG, camera);
const lanternMaterialManager = new LanternMaterialManager(CONFIG);
const fireworkController = new FireworkController(scene, camera, CONFIG.fireworks);

updateCameraFOV(camera);

// Scroll-locked camera (Y movement only, no rotation)
const scrollCamera = setupScrollLockedCamera(camera);

// Spawn lanterns after DOM is ready, avoiding important elements
function initLanterns() {
  spawnDOMAvoidingLanterns(scene, camera, lanternController, lanternMaterialManager, 30);
}

if (document.readyState === 'complete') {
  initLanterns();
} else {
  window.addEventListener('load', initLanterns);
}

// Resize
setupResizeHandler(camera, renderer, composer, lanternController);

// Animation loop
startAnimationLoop(renderer, composer, [
  lanternMaterialManager,
  fireworkController,
  lanternController,
]);

// Debug globals
window.scene = scene;
window.camera = camera;
window.renderer = renderer;
window.THREEJS_CONFIG = CONFIG;
window.THREEJS_PRESET = 'general';
window.bloomPass = bloomPass;
window.lanternController = lanternController;
window.lanternMaterialManager = lanternMaterialManager;
window.fireworkController = fireworkController;

}
