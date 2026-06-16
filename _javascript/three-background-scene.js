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

const lanternController = new LanternController(CONFIG, camera, { displacementScale: 3, intersectionZ: -150 });
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
    waveSpeed: 1.5,   // [water rework] procedural-noise animation speed (CONFIG default 0.1 was for the old shader)
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

  // Click the water -> ripple (water rework). Raycast the water MESH (so only clicks on the visible water ripple it),
  // drag-vs-click guarded. The ripple feeds the reflection + the wave shading; getActiveRipple() drives the character look.
  const _rRay = new THREE.Raycaster(), _rNdc = new THREE.Vector2();
  let _rdx = 0, _rdy = 0, _rdt = 0;
  addEventListener('pointerdown', (e) => { _rdx = e.clientX; _rdy = e.clientY; _rdt = performance.now(); });
  addEventListener('pointerup', (e) => {
    if (!mirroredSurface) return;
    if (Math.hypot(e.clientX - _rdx, e.clientY - _rdy) > 6 || performance.now() - _rdt > 500) return;
    _rNdc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    _rRay.setFromCamera(_rNdc, camera);
    const hit = _rRay.intersectObject(waterMesh, false)[0];
    if (hit) mirroredSurface.spawnRipple(hit.point);
  });

  // Expose for the character's "watch the water" head-look (getActiveRipple) + debugging.
  window.mirroredSurface = mirroredSurface;
});

// Embers — white-yellow fireflies with organic, alive movement
const EMBER_COUNT = 25;
const emberGeometry = new THREE.SphereGeometry(5, 8, 6);
emberGeometry.computeBoundingBox();

for (let i = 0; i < EMBER_COUNT; i++) {
  const mesh = new THREE.Mesh(emberGeometry);

  mesh.material = lanternMaterialManager.createMaterialForMesh(mesh, {
    baseColor: new THREE.Color(0xfff4cc),
    gradientStart: 1.0,
    gradientEnd: 0.35,
    flickerSpeed: (2.0 + Math.random() * 4.0),
    flickerAmount: (0.5 + Math.random() * 0.4),
    flickerColorShift: 0.2 + Math.random() * 0.15,
  });

  const side = Math.random() > 0.5 ? 1 : -1;
  const x = side * (300 + Math.random() * 500);
  const y = -50 + Math.random() * 450;
  const z = -50 - Math.random() * 350;

  mesh.position.set(x, y, z);
  mesh.userData.floatScale = 1.0 + Math.random() * 0.5;
  lanternController.addLantern(mesh);
  scene.add(mesh);
}

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
