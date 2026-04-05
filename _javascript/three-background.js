import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { LanternController } from './lantern-controller.js';
import { MirroredSurface } from './shader/mirroredSurface.js';
import { LanternMaterialManager } from './shader/lanternShaderManager.js';
import { FireworkController } from './firework-controller.js';

// === REDUCED MOTION FLAG (H1) ===
// When reduced motion is preferred, the scene still renders but animations
// (lantern floating, fireworks, camera scroll) are dampened/paused.
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
{

// === CONFIGURATION ===
const CONFIG = {
  debugEnabled: false,

  camera: {
    startRotationX: 25 * Math.PI / 180,
    endRotationX: 0,
    startPositionY: 500,
    endPositionY: 100,
    positionZ: 500,
  },
  lanterns: {
    bloom: {
      strength: 1.4,
      radius: 0.3,
      threshold: 0.45
    },
    float: {
      speed: 1,
      amount: 50
    },
    glow: {
      color: 0xffaa66,
      intensity: 2
    },
    avoidance: {
      proximityRadius: 10000, // Increased - react from further away
      avoidanceStrength: .1, // Reduced - gentler push
      knockRadius: 45, // Added - distance for hard knock
      knockStrength: 40, // Increased knock power
      returnSpeed: 0.08, // Slower return
      boundaryForce: 0.5, // Stronger boundary push
      rotationStrength: 0.005,
      knockCooldown: 0.1
    },
    shader: {
      // Gradient settings (object-space)
      gradientStart: 1.0,     // Brightness at center (full bright)
      gradientEnd: 0.35,      // Brightness at top — visible glow, not pitch dark
      gradientCenter: 1,
      gradientRange: 1,

      // Flicker settings
      flickerSpeed: .5,
      flickerAmount: .25,
      flickerColorShift: .5
    },
  },
  water: {
    // Reflection appearance options
    reflection: {
      reflectionIntensity: 1, // 0-1, how bright the reflection is
      reflectionTint: 0xffffff // Color tint to apply
    },
    waves: {
      waveStrength: 0.01, // How much to distort (0 = no waves, 0.1 = extreme)
      waveSpeed: .1,// Animation speed
      waveScale: 1,// Size of waves (higher = smaller waves)
      waveType: 0 // Which wave pattern to use (1-6)
    }
  }
};

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x080f1b); // Night sky color
//scene.fog = new THREE.FogExp2(0x080f1b, 0.0015); // Depth haze — distant lanterns fade into background

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.z = CONFIG.camera.positionZ;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Setup post-processing for bloom
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  CONFIG.lanterns.bloom.strength,
  CONFIG.lanterns.bloom.radius,
  CONFIG.lanterns.bloom.threshold
);
composer.addPass(bloomPass);

// Style the canvas as background
const canvas = renderer.domElement;
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';

document.body.appendChild(canvas);

// Vignette
const vignette = document.createElement('div');
vignette.style.position = 'fixed';
vignette.style.top = '0';
vignette.style.left = '0';
vignette.style.width = '100%';
vignette.style.height = '100%';
vignette.style.pointerEvents = 'none';
vignette.style.zIndex = '-1';
vignette.style.background = 'radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(0, 0, 0, 0.8) 100%)';
document.body.appendChild(vignette);



// Initialize controllers
const lanternController = new LanternController(CONFIG, camera);
const lanternMaterialManager = new LanternMaterialManager(CONFIG);

const fireworkController = new FireworkController(scene, camera, {
  maxFireworks: 50,
  minZ: 0,
  maxZ: -200
});


// Widen the FOV on portrait screens so the scene doesn't look cramped
function updateCameraFOV() {
  camera.fov = window.innerWidth < window.innerHeight ? 80 : 55;
  camera.updateProjectionMatrix();
}

// Responsive lantern sizing
function getResponsiveLanternScale() {
  const aspect = window.innerWidth / window.innerHeight;
  // Reference aspect ratio (16:9 desktop)
  const referenceAspect = 16 / 9;

  // Gentle scaling: use square root so narrow screens don't shrink lanterns too much
  // At 16:9 → 1.0, at 9:16 (portrait) → ~0.75 instead of ~0.4
  const scaleFactor = Math.sqrt(Math.min(aspect / referenceAspect, 1.0));

  // Clamp — never smaller than 0.7, never larger than 1.0
  return Math.max(0.7, Math.min(1.0, scaleFactor));
}


updateCameraFOV();
const initialScale = getResponsiveLanternScale();

// FBX Loader setup
const fbxLoader = new FBXLoader();

function loadLanternsFBX(url) {
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
            flickerColorShift: CONFIG.lanterns.shader.flickerColorShift
          });

          child.scale.multiplyScalar(currentScale);
          lanternController.addLantern(child);
        }
      });

      scene.add(fbx);
    },
    undefined,
    (error) => {
      console.error('Error loading lanterns FBX:', error);
    }
  );
}

//Load Lanterns
loadLanternsFBX('/assets/mesh/lantern-night/Lanterns.fbx');



function loadDockFBX(url, material = null) {
  fbxLoader.load(
    url,
    (fbx) => {
      const dockMaterial = material || new THREE.MeshBasicMaterial({ color: 0xffffff });

      fbx.traverse((child) => {
        if (child.isMesh) {
          child.material = dockMaterial;
        }
      });

      scene.add(fbx);
    },
    undefined,
    (error) => {
      console.error('Error loading dock FBX:', error);
    }
  );
}

loadDockFBX('/assets/mesh/lantern-night/Dock.fbx', new THREE.MeshBasicMaterial({
  color: 0x000000
}));


let mirroredSurface = null;

function loadWaterFBX(url) {
  fbxLoader.load(url, (fbx) => {
    let waterMesh = null;
    fbx.traverse((child) => {
      if (child.isMesh) waterMesh = child;
    });

    // Position water BEFORE creating MirroredSurface
    //fbx.position.y = CONFIG.camera.endPositionY - 10;
    scene.add(fbx);

    // Create with options from CONFIG
    mirroredSurface = new MirroredSurface(scene, camera, renderer, waterMesh, {
      reflectionIntensity: CONFIG.water.reflection.reflectionIntensity,
      reflectionTint: new THREE.Color(CONFIG.water.reflection.reflectionTint),
      // Add wave options:
      waveStrength: CONFIG.water.waves.waveStrength,
      waveSpeed: CONFIG.water.waves.waveSpeed,
      waveScale: CONFIG.water.waves.waveScale,
      waveType: CONFIG.water.waves.waveType
    });

    waterMesh.material = mirroredSurface.material;

    // Pre-warm: force one reflection render so the shader compiles now
    // instead of causing a lag spike when the water first scrolls into view
    mirroredSurface.mirrorPlane.visible = false;
    renderer.setRenderTarget(mirroredSurface.renderTarget);
    renderer.render(scene, mirroredSurface.mirrorCamera);
    renderer.setRenderTarget(null);
    mirroredSurface.mirrorPlane.visible = true;
  });
}

loadWaterFBX('/assets/mesh/lantern-night/Water.fbx');


// Generic FBX loader for other static objects
function loadStaticFBX(url, options = {}) {
  const {
    position = { x: 0, y: 0, z: 0 },
    scale = 1,
    material = null
  } = options;

  fbxLoader.load(
    url,
    (fbx) => {
      if (material) {
        fbx.traverse((child) => {
          if (child.isMesh) {
            child.material = material;
          }
        });
      }

      fbx.position.set(position.x, position.y, position.z);
      fbx.scale.setScalar(scale);
      scene.add(fbx);
    },
    undefined,
    (error) => {
      console.error('Error loading static FBX:', error);
    }
  );
}


// Scroll-based camera movement
let scrollProgress = 0;
let cachedScrollHeight = document.documentElement.scrollHeight - window.innerHeight;

function updateCameraFromScroll() {
  const scrolled = window.scrollY;
  scrollProgress = cachedScrollHeight > 0 ? scrolled / cachedScrollHeight : 0;

  camera.rotation.x = THREE.MathUtils.lerp(
    CONFIG.camera.startRotationX,
    CONFIG.camera.endRotationX,
    scrollProgress
  );

  camera.position.y = THREE.MathUtils.lerp(
    CONFIG.camera.startPositionY,
    CONFIG.camera.endPositionY,
    scrollProgress
  );
}

// Update camera immediately on scroll (no RAF debounce — avoids frame lag)
window.addEventListener('scroll', updateCameraFromScroll, { passive: true });
updateCameraFromScroll();

// Handle window resize (debounced — fires once after user stops resizing)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    cachedScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    updateCameraFOV();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    const newScale = getResponsiveLanternScale();
    lanternController.updateLanternSizes(newScale);
    if (mirroredSurface) {
      mirroredSurface.handleResize();
    }
  }, 100);
});


// Frame-rate independent timing
let lastTime = performance.now();
const TARGET_FRAME_TIME = 1000 / 60; // 60 FPS in milliseconds

// Animation loop with proper deltaTime
function animate(currentTime) {
  // Calculate actual time elapsed since last frame
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  // Normalize deltaTime to 60fps scale (so speeds stay consistent)
  // If running at 120fps, deltaTime will be ~8ms, normalized to ~0.5
  // If running at 60fps, deltaTime will be ~16ms, normalized to ~1.0
  const normalizedDelta = deltaTime / TARGET_FRAME_TIME;

  lanternMaterialManager.update(normalizedDelta);
  fireworkController.update(normalizedDelta);
  lanternController.update(normalizedDelta);
  if (mirroredSurface) {
    mirroredSurface.update();
  }
  composer.render();
}

renderer.setAnimationLoop(animate);

// Expose for debugging
window.scene = scene;
window.camera = camera;
window.renderer = renderer;
window.mirroredSurface = mirroredSurface;
window.THREEJS_CONFIG = CONFIG;
window.bloomPass = bloomPass;
window.lanternController = lanternController;
window.lanternMaterialManager = lanternMaterialManager;
window.loadLanternsFBX = loadLanternsFBX;
window.fireworkController = fireworkController;

} // end reduced-motion guard
