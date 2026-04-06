// Three.js General — Landing pages, Projects
// Ambient background that adds liveliness. Lanterns, fireworks, mouse avoidance.
// No water, no dock, static camera. The scene supports the page, not the focus.

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { LanternController } from './lantern-controller.js';
import { LanternMaterialManager } from './shader/lanternShaderManager.js';
import { FireworkController } from './firework-controller.js';
import {
  CONFIG,
  createBaseScene,
  updateCameraFOV,
  loadLanternsFBX,
  setupStaticCamera,
  setupResizeHandler,
  startAnimationLoop,
} from './three-shared.js';

{

const { scene, camera, renderer, composer, bloomPass } = createBaseScene();

const lanternController = new LanternController(CONFIG, camera);
const lanternMaterialManager = new LanternMaterialManager(CONFIG);
const fireworkController = new FireworkController(scene, camera, CONFIG.fireworks);
const fbxLoader = new FBXLoader();

updateCameraFOV(camera);

// Lanterns only — no dock, no water
loadLanternsFBX(fbxLoader, scene, lanternController, lanternMaterialManager);

// Static camera
setupStaticCamera(camera);

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
