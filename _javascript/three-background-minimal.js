// Three.js Minimal — Lightest ambient background
// Lanterns only. No fireworks, no mouse avoidance, static camera.
// Pure visual decoration with minimal performance cost.

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { LanternController } from './lantern-controller.js';
import { LanternMaterialManager } from './shader/lanternShaderManager.js';
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
const fbxLoader = new FBXLoader();

updateCameraFOV(camera);

// Lanterns only
loadLanternsFBX(fbxLoader, scene, lanternController, lanternMaterialManager);

// Static camera
setupStaticCamera(camera);

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
