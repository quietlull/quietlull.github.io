import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { KawaseBloomPass } from './shader/kawaseBloom.js';
import { CONFIG } from './three-config.js';

export { CONFIG };


export function createBaseScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x162237);

  const camera = new THREE.PerspectiveCamera(
    55, window.innerWidth / window.innerHeight, 0.1, 10000
  );
  camera.position.z = CONFIG.camera.positionZ;

  const renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 0.5));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const paper = CONFIG.lanterns.paper;
  const bloomPass = new KawaseBloomPass(window.innerWidth, window.innerHeight, {
    strength: CONFIG.lanterns.bloom.strength,
    radius: CONFIG.lanterns.bloom.radius,
    scale: CONFIG.lanterns.bloom.scale,
    paperAmount: paper.amount,
    paperTile: paper.tile,
    paperTile2: paper.tile2,
    paperMix: paper.mix,
    paperBlend: paper.blend,
    paperBleed: paper.bleed,
    paperDisplace: paper.displace,
    paperTooth: paper.tooth,
    paperBoilHz: paper.boilHz
  });
  const paperLoader = new THREE.TextureLoader();
  bloomPass.setPaperTexture(paperLoader.load(`/assets/tex/${paper.sheet}.png`), 0);
  bloomPass.setPaperTexture(paperLoader.load(`/assets/tex/${paper.sheet2}.png`), 1);
  composer.addPass(bloomPass);

  const canvas = renderer.domElement;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

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

  requestAnimationFrame(() => {
    const container = document.querySelector('#home-page') || document.body;
    new ResizeObserver(() => { recalc(); updateCameraFromScroll(); }).observe(container);
  });

  window.addEventListener('scroll', updateCameraFromScroll, { passive: true });

  return {
    updateScrollHeight() { recalc(); },
  };
}

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


export function screenToWorldMapper(camera) {
  const vFov = camera.fov * Math.PI / 180;
  const z = camera.position.z;
  const visibleH = 2 * z * Math.tan(vFov / 2);
  const visibleW = visibleH * camera.aspect;
  const wppX = visibleW / window.innerWidth;
  const wppY = visibleH / window.innerHeight;

  return {
    worldPerPixelX: wppX,
    worldPerPixelY: wppY,
    screenToWorldX(px) { return (px - window.innerWidth / 2) * wppX; },
    screenToWorldY(px) { return -(px - window.innerHeight / 2) * wppY; },
  };
}




export function setupScrollLockedCamera(camera) {
  const mapper = screenToWorldMapper(camera);
  const startY = camera.position.y;

  function onScroll() {
    camera.position.y = startY - window.scrollY * mapper.worldPerPixelY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}


export function startAnimationLoop(renderer, composer, updatables) {
  let lastTime = performance.now();
  const TARGET_FRAME_TIME = 1000 / 60;
  let running = false;

  function animate(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    const normalizedDelta = deltaTime / TARGET_FRAME_TIME;

    for (const u of updatables) {
      u.update(normalizedDelta);
    }
    composer.render();
  }

  function start() {
    if (running) return;
    running = true;
    lastTime = performance.now();
    renderer.setAnimationLoop(animate);
  }

  function stop() {
    if (!running) return;
    running = false;
    renderer.setAnimationLoop(null);
  }

  let pageVisible = !document.hidden;
  let canvasOnScreen = true;

  function sync() {
    if (pageVisible && canvasOnScreen) start();
    else stop();
  }

  document.addEventListener('visibilitychange', () => {
    pageVisible = !document.hidden;
    sync();
  });

  const canvas = renderer.domElement;
  if ('IntersectionObserver' in window && canvas) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        canvasOnScreen = entry.isIntersecting;
      }
      sync();
    }, { threshold: 0 });
    observer.observe(canvas);
  } else {
    start();
  }
}
