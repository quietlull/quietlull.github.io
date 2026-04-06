// Three.js Scene — About page
// The scene IS the main focus here. Water, dock, scroll camera, fireworks,
// mouse avoidance, lanterns — the full interactive experience.

import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { LanternController } from './lantern-controller.js';
import { LanternMaterialManager } from './shader/lanternShaderManager.js';
import { FireworkController } from './firework-controller.js';
import { MirroredSurface } from './shader/mirroredSurface.js';
import {
  CONFIG,
  createBaseScene,
  updateCameraFOV,
  loadLanternsFBX,
  loadDockFBX,
  setupScrollCamera,
  setupResizeHandler,
  startAnimationLoop,
} from './three-shared.js';

{

const { scene, camera, renderer, composer, bloomPass } = createBaseScene();

const lanternController = new LanternController(CONFIG, camera, { displacementScale: 3 });
const lanternMaterialManager = new LanternMaterialManager(CONFIG);
const fireworkController = new FireworkController(scene, camera, CONFIG.fireworks);
const fbxLoader = new FBXLoader();

updateCameraFOV(camera);

// Load all scene elements
loadLanternsFBX(fbxLoader, scene, lanternController, lanternMaterialManager);
loadDockFBX(fbxLoader, scene);

// Water with mirror reflection
let mirroredSurface = null;

fbxLoader.load('/assets/mesh/lantern-night/Water.fbx', (fbx) => {
  let waterMesh = null;
  fbx.traverse((child) => {
    if (child.isMesh) waterMesh = child;
  });

  scene.add(fbx);

  mirroredSurface = new MirroredSurface(scene, camera, renderer, waterMesh, {
    reflectionIntensity: CONFIG.water.reflection.reflectionIntensity,
    reflectionTint: new THREE.Color(CONFIG.water.reflection.reflectionTint),
    waveStrength: CONFIG.water.waves.waveStrength,
    waveSpeed: CONFIG.water.waves.waveSpeed,
    waveScale: CONFIG.water.waves.waveScale,
    waveType: CONFIG.water.waves.waveType,
  });

  waterMesh.material = mirroredSurface.material;

  // Pre-warm: compile shader now to avoid first-scroll lag spike
  mirroredSurface.mirrorPlane.visible = false;
  renderer.setRenderTarget(mirroredSurface.renderTarget);
  renderer.render(scene, mirroredSurface.mirrorCamera);
  renderer.setRenderTarget(null);
  mirroredSurface.mirrorPlane.visible = true;
});

// Scroll-based camera
const { updateScrollHeight } = setupScrollCamera(camera);

// Resize
setupResizeHandler(camera, renderer, composer, lanternController, {
  updateScrollHeight,
  getMirroredSurface: () => mirroredSurface,
});

// Animation loop
startAnimationLoop(renderer, composer, [
  lanternMaterialManager,
  fireworkController,
  lanternController,
  { update: () => { if (mirroredSurface) mirroredSurface.update(); } },
]);

// Debug globals
window.scene = scene;
window.camera = camera;
window.renderer = renderer;
window.THREEJS_CONFIG = CONFIG;
window.THREEJS_PRESET = 'scene';
window.bloomPass = bloomPass;
window.lanternController = lanternController;
window.lanternMaterialManager = lanternMaterialManager;
window.fireworkController = fireworkController;

}
