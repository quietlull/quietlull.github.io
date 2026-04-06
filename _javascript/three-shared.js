// Shared Three.js scene utilities — common to all preset entry files.
// Each entry file (full/standard/minimal) imports what it needs from here.

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { CONFIG } from './three-config.js';

export { CONFIG };

// ---------------------------------------------------------------------------
// Scene + renderer + bloom
// ---------------------------------------------------------------------------

export function createBaseScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x080f1b);

  const camera = new THREE.PerspectiveCamera(
    55, window.innerWidth / window.innerHeight, 0.1, 10000
  );
  camera.position.z = CONFIG.camera.positionZ;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Post-processing bloom (identical on all pages)
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    CONFIG.lanterns.bloom.strength,
    CONFIG.lanterns.bloom.radius,
    CONFIG.lanterns.bloom.threshold
  );
  composer.addPass(bloomPass);

  // Canvas as fixed background
  const canvas = renderer.domElement;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  // Vignette overlay
  const vignette = document.createElement('div');
  vignette.style.position = 'fixed';
  vignette.style.top = '0';
  vignette.style.left = '0';
  vignette.style.width = '100%';
  vignette.style.height = '100%';
  vignette.style.pointerEvents = 'none';
  vignette.style.zIndex = '-1';
  vignette.style.background =
    'radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(0,0,0,0.8) 100%)';
  document.body.appendChild(vignette);

  return { scene, camera, renderer, composer, bloomPass };
}

// ---------------------------------------------------------------------------
// Responsive helpers
// ---------------------------------------------------------------------------

export function updateCameraFOV(camera) {
  camera.fov = window.innerWidth < window.innerHeight ? 80 : 55;
  camera.updateProjectionMatrix();
}

export function getResponsiveLanternScale() {
  const aspect = window.innerWidth / window.innerHeight;
  const referenceAspect = 16 / 9;
  const scaleFactor = Math.sqrt(Math.min(aspect / referenceAspect, 1.0));
  return Math.max(0.7, Math.min(1.0, scaleFactor));
}

// ---------------------------------------------------------------------------
// FBX loaders
// ---------------------------------------------------------------------------

export function loadLanternsFBX(
  fbxLoader, scene, lanternController, lanternMaterialManager,
  url = '/assets/mesh/lantern-night/Lanterns.fbx'
) {
  fbxLoader.load(
    url,
    (fbx) => {
      const currentScale = getResponsiveLanternScale();
      fbx.traverse((child) => {
        if (child.isMesh) {
          child.material = lanternMaterialManager.createMaterialForMesh(child, {
            gradientStart: CONFIG.lanterns.shader.gradientStart,
            gradientEnd: CONFIG.lanterns.shader.gradientEnd,
            gradientCenter: CONFIG.lanterns.shader.gradientCenter,
            gradientRange: CONFIG.lanterns.shader.gradientRange,
            flickerSpeed: CONFIG.lanterns.shader.flickerSpeed,
            flickerAmount: CONFIG.lanterns.shader.flickerAmount,
            flickerColorShift: CONFIG.lanterns.shader.flickerColorShift,
          });
          child.scale.multiplyScalar(currentScale);
          lanternController.addLantern(child);
        }
      });
      scene.add(fbx);
    },
    undefined,
    (error) => console.error('Error loading lanterns FBX:', error)
  );
}

export function loadDockFBX(fbxLoader, scene) {
  fbxLoader.load(
    '/assets/mesh/lantern-night/Dock.fbx',
    (fbx) => {
      fbx.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        }
      });
      scene.add(fbx);
    },
    undefined,
    (error) => console.error('Error loading dock FBX:', error)
  );
}

// ---------------------------------------------------------------------------
// Camera modes
// ---------------------------------------------------------------------------

export function setupScrollCamera(camera) {
  let scrollProgress = 0;
  let cachedScrollHeight = document.documentElement.scrollHeight - window.innerHeight;

  function updateCameraFromScroll() {
    const scrolled = window.scrollY;
    scrollProgress = cachedScrollHeight > 0 ? scrolled / cachedScrollHeight : 0;
    camera.rotation.x = THREE.MathUtils.lerp(
      CONFIG.camera.startRotationX, CONFIG.camera.endRotationX, scrollProgress
    );
    camera.position.y = THREE.MathUtils.lerp(
      CONFIG.camera.startPositionY, CONFIG.camera.endPositionY, scrollProgress
    );
  }

  window.addEventListener('scroll', updateCameraFromScroll, { passive: true });
  updateCameraFromScroll();

  return {
    updateScrollHeight() {
      cachedScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    },
  };
}

export function setupStaticCamera(camera) {
  camera.rotation.x = CONFIG.camera.startRotationX;
  camera.position.y = CONFIG.camera.startPositionY;
}

// ---------------------------------------------------------------------------
// Resize handler
// ---------------------------------------------------------------------------

export function setupResizeHandler(
  camera, renderer, composer, lanternController, options = {}
) {
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (options.updateScrollHeight) options.updateScrollHeight();
      updateCameraFOV(camera);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      lanternController.updateLanternSizes(getResponsiveLanternScale());
      if (options.getMirroredSurface) {
        const ms = options.getMirroredSurface();
        if (ms) ms.handleResize();
      }
    }, 100);
  });
}

// ---------------------------------------------------------------------------
// Animation loop
// ---------------------------------------------------------------------------

export function startAnimationLoop(renderer, composer, updatables) {
  let lastTime = performance.now();
  const TARGET_FRAME_TIME = 1000 / 60;

  function animate(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    const normalizedDelta = deltaTime / TARGET_FRAME_TIME;

    for (const u of updatables) {
      u.update(normalizedDelta);
    }
    composer.render();
  }

  renderer.setAnimationLoop(animate);
}
