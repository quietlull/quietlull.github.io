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
  let cachedScrollHeight = 0;

  function recalc() {
    cachedScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  }

  function updateCameraFromScroll() {
    if (cachedScrollHeight <= 0) {
      camera.rotation.x = CONFIG.camera.endRotationX;
      camera.position.y = CONFIG.camera.endPositionY;
      return;
    }
    const progress = Math.min(1, window.scrollY / cachedScrollHeight);
    camera.rotation.x = THREE.MathUtils.lerp(
      CONFIG.camera.startRotationX, CONFIG.camera.endRotationX, progress
    );
    camera.position.y = THREE.MathUtils.lerp(
      CONFIG.camera.startPositionY, CONFIG.camera.endPositionY, progress
    );
  }

  // ResizeObserver handles all timing: fonts, images, reflow, page transitions
  requestAnimationFrame(() => {
    const container = document.querySelector('#home-page') || document.body;
    new ResizeObserver(() => { recalc(); updateCameraFromScroll(); }).observe(container);
  });

  window.addEventListener('scroll', updateCameraFromScroll, { passive: true });

  return {
    updateScrollHeight() { recalc(); },
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
// Procedural lantern spawning (general/minimal — no FBX needed)
// ---------------------------------------------------------------------------

export function spawnProceduralLanterns(
  scene, lanternController, lanternMaterialManager, count = 25
) {
  const geometry = new THREE.BoxGeometry(25, 35, 25);
  geometry.computeBoundingBox();

  for (let i = 0; i < count; i++) {
    const mesh = new THREE.Mesh(geometry);

    mesh.material = lanternMaterialManager.createMaterialForMesh(mesh, {
      gradientStart: CONFIG.lanterns.shader.gradientStart,
      gradientEnd: CONFIG.lanterns.shader.gradientEnd,
      flickerSpeed: CONFIG.lanterns.shader.flickerSpeed,
      flickerAmount: CONFIG.lanterns.shader.flickerAmount,
      flickerColorShift: CONFIG.lanterns.shader.flickerColorShift,
    });

    // Distribute: 80% in far side margins, 20% deep behind content
    let x, y, z;
    if (Math.random() > 0.2) {
      // Side margins — far outside the content column
      const side = Math.random() > 0.5 ? 1 : -1;
      x = side * (400 + Math.random() * 350);
      y = (Math.random() - 0.5) * 700;
      z = -100 - Math.random() * 400;
    } else {
      // Behind content — very deep, dim from distance
      x = (Math.random() - 0.5) * 500;
      y = (Math.random() - 0.5) * 700;
      z = -500 - Math.random() * 300;
    }

    mesh.position.set(x, y, z);
    mesh.rotation.y = Math.random() * Math.PI * 2;

    lanternController.addLantern(mesh);
    scene.add(mesh);
  }
}

// ---------------------------------------------------------------------------
// Screen-to-world coordinate conversion
// ---------------------------------------------------------------------------

/**
 * Convert a pixel value to world units at a given Z depth for a perspective camera.
 * Returns { worldPerPixelX, worldPerPixelY, screenToWorldX(px), screenToWorldY(px) }
 */
export function screenToWorldMapper(camera) {
  const vFov = camera.fov * Math.PI / 180;
  const z = camera.position.z; // distance from camera to z=0 plane
  const visibleH = 2 * z * Math.tan(vFov / 2);
  const visibleW = visibleH * camera.aspect;
  const wppX = visibleW / window.innerWidth;
  const wppY = visibleH / window.innerHeight;

  return {
    worldPerPixelX: wppX,
    worldPerPixelY: wppY,
    // Screen pixel (client coords) → world XY at z=0
    screenToWorldX(px) { return (px - window.innerWidth / 2) * wppX; },
    screenToWorldY(px) { return -(px - window.innerHeight / 2) * wppY; },
  };
}

/**
 * Query all important DOM elements and return world-space exclusion rects.
 * Excludes #topbar. Adds padding in world units around each element.
 */
export function getExclusionZones(camera, padding = 20) {
  const mapper = screenToWorldMapper(camera);
  const scrollY = window.scrollY;

  // Everything except topbar
  const selectors = [
    '.landing-hero', '.demo-reel', '.section-header',
    '.post-card', 'footer',
  ];

  const zones = [];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      const r = el.getBoundingClientRect();
      // Convert client rect (viewport-relative) to absolute page position
      const pageTop = r.top + scrollY;
      const pageBottom = r.bottom + scrollY;

      // Convert to world coords (Y is inverted: page top = positive world Y)
      const worldLeft = mapper.screenToWorldX(r.left) - padding;
      const worldRight = mapper.screenToWorldX(r.right) + padding;
      const worldTop = mapper.screenToWorldY(pageTop) + padding;
      const worldBottom = mapper.screenToWorldY(pageBottom) - padding;

      zones.push({
        left: worldLeft,
        right: worldRight,
        top: worldTop,     // higher Y
        bottom: worldBottom, // lower Y
      });
    });
  });

  return zones;
}

/**
 * Spawn procedural lanterns avoiding DOM exclusion zones.
 * Lanterns placed at z=0 plane so they scroll 1:1 with the page.
 */
export function spawnDOMAvoidingLanterns(
  scene, camera, lanternController, lanternMaterialManager, count = 25
) {
  const mapper = screenToWorldMapper(camera);
  const scrollY = window.scrollY;
  const zones = getExclusionZones(camera);

  // World-space bounds for the full page
  const pageH = document.documentElement.scrollHeight;
  const worldPageTop = mapper.screenToWorldY(0);
  const worldPageBottom = mapper.screenToWorldY(pageH);
  const worldLeft = mapper.screenToWorldX(0);
  const worldRight = mapper.screenToWorldX(window.innerWidth);
  // Add side margins beyond the viewport
  const marginX = (worldRight - worldLeft) * 0.4;

  const geometry = new THREE.BoxGeometry(25, 35, 25);
  geometry.computeBoundingBox();

  let placed = 0;
  let attempts = 0;
  const maxAttempts = count * 20;

  while (placed < count && attempts < maxAttempts) {
    attempts++;

    const x = (worldLeft - marginX) + Math.random() * (worldRight - worldLeft + marginX * 2);
    const y = worldPageBottom + Math.random() * (worldPageTop - worldPageBottom);
    const z = -30 - Math.random() * 200;

    // Check against exclusion zones
    let blocked = false;
    for (const zone of zones) {
      if (x > zone.left && x < zone.right && y < zone.top && y > zone.bottom) {
        blocked = true;
        break;
      }
    }
    if (blocked) continue;

    const mesh = new THREE.Mesh(geometry);
    mesh.material = lanternMaterialManager.createMaterialForMesh(mesh, {
      gradientStart: CONFIG.lanterns.shader.gradientStart,
      gradientEnd: CONFIG.lanterns.shader.gradientEnd,
      flickerSpeed: CONFIG.lanterns.shader.flickerSpeed,
      flickerAmount: CONFIG.lanterns.shader.flickerAmount,
      flickerColorShift: CONFIG.lanterns.shader.flickerColorShift,
    });
    mesh.position.set(x, y, z);
    mesh.rotation.y = Math.random() * Math.PI * 2;

    lanternController.addLantern(mesh);
    scene.add(mesh);
    placed++;
  }

  return placed;
}

// ---------------------------------------------------------------------------
// Scroll-locked camera (Y only, no rotation)
// ---------------------------------------------------------------------------

export function setupScrollLockedCamera(camera) {
  const mapper = screenToWorldMapper(camera);
  const startY = camera.position.y;

  function onScroll() {
    camera.position.y = startY - window.scrollY * mapper.worldPerPixelY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  return {
    updateMapper() {
      const newMapper = screenToWorldMapper(camera);
      mapper.worldPerPixelY = newMapper.worldPerPixelY;
    },
  };
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
