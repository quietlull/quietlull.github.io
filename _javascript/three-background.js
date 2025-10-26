import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { PerformanceMonitor } from './performance-monitor.js';
import { LanternController } from './lantern-controller.js';
import { MirroredSurface } from './shader/mirroredSurface.js';
import { LanternMaterialManager } from './shader/lanternShaderManager.js';

// === CONFIGURATION ===
const CONFIG = {
  camera: {
    startRotationX: 25 * Math.PI / 180,
    endRotationX: 0,
    startPositionY: 500,
    endPositionY: 100,
    positionZ: 500,
  },
  lanterns: {
    bloom: {
      strength: 2,
      radius: 0.4,
      threshold: 0.1
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
      knockRadius: 40, // Added - distance for hard knock
      knockStrength: 40, // Increased knock power
      returnSpeed: 0.08, // Slower return
      boundaryForce: 0.5, // Stronger boundary push
      rotationStrength: 0.005,
      knockCooldown: 0.1
    },
    shader: {
      // Gradient settings
      gradientStart: 1.0,     // Brightness at bottom (full bright)
      gradientEnd: 0.3,       // Brightness at top (dim)

      // Flicker settings
      flickerSpeed: 1,      // How fast the flicker
      flickerAmount: .25,    // How much brightness variation (0.0 - 1.0)
      flickerColorShift: .5 // How much color shifts towards red/yellow
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
scene.background = new THREE.Color(0x080f1b); // Night sky color#05090f #080f1b color from shinsekaiyori #121e36

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
const perfMonitor = new PerformanceMonitor();
const lanternController = new LanternController(CONFIG, camera);
const lanternMaterialManager = new LanternMaterialManager(CONFIG);

// Responsive lantern sizing //TO FIX DOESNT WORK
function getResponsiveLanternScale() {
  // Calculate how wide the viewport is in world units
  const frustumHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
  const frustumWidth = frustumHeight * camera.aspect;

  // Reference frustum width (1920x1080 screen = aspect 1.778)
  const referenceFrustumWidth = frustumHeight * (1920 / 1080);

  // Scale lanterns proportionally to frustum width
  // Narrower viewport = smaller lanterns (so they don't dominate the screen)
  const scaleFactor = frustumWidth / referenceFrustumWidth;

  // Clamp between 0.4 and 1.0
  return Math.max(0.4, Math.min(1.0, scaleFactor));
}


const initialScale = getResponsiveLanternScale();

// FBX Loader setup
const fbxLoader = new FBXLoader();

function loadLanternsFBX(url) {
  fbxLoader.load(
    url,
    (fbx) => {
      console.log('FBX loaded:', fbx);

      const currentScale = getResponsiveLanternScale();

      fbx.traverse((child) => {
        if (child.isMesh) {
          // Apply custom shader material with gradient and flicker
          child.material = lanternMaterialManager.createMaterialForMesh(child, {
            gradientStart: CONFIG.lanterns.shader.gradientStart,
            gradientEnd: CONFIG.lanterns.shader.gradientEnd,

            flickerSpeed: CONFIG.lanterns.shader.flickerSpeed,
            flickerAmount: CONFIG.lanterns.shader.flickerAmount,
            flickerColorShift: CONFIG.lanterns.shader.flickerColorShift
          });

          child.scale.multiplyScalar(currentScale);
          lanternController.addLantern(child);
          console.log('Added lantern mesh:', child.name, 'at position:', child.position);
        }
      });

      scene.add(fbx);
      perfMonitor.setLanternCount(lanternController.getLanternCount());
      console.log(`Loaded ${lanternController.getLanternCount()} lanterns from FBX`);
      console.log(`Created ${lanternMaterialManager.getMaterialCount()} shader materials`);
    },
    (progress) => {
      console.log((progress.loaded / progress.total * 100) + '% loaded');
    },
    (error) => {
      console.error('Error loading FBX:', error);
    }
  );
}

//Load Lanterns
loadLanternsFBX('/assets/mesh/lantern-night/Lanterns.fbx');



function loadDockFBX(url, material = null) {
  fbxLoader.load(
    url,
    (fbx) => {
      console.log('Dock FBX loaded:', fbx);

      // Default unlit white material if none provided
      const dockMaterial = material || new THREE.MeshBasicMaterial({
        color: 0xffffff
      });

      fbx.traverse((child) => {
        if (child.isMesh) {
          child.material = dockMaterial;
          console.log('Added dock mesh:', child.name);
        }
      });

      // Position dock at bottom of scene
      //fbx.position.y = CONFIG.camera.endPositionY - 100;

      scene.add(fbx);
      console.log('Dock loaded at Y:', fbx.position.y);
    },
    (progress) => {
      console.log('Dock: ' + (progress.loaded / progress.total * 100) + '% loaded');
    },
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
      console.log('Static FBX loaded:', fbx);

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
      console.log('Static object loaded at:', fbx.position);
    },
    (progress) => {
      console.log((progress.loaded / progress.total * 100) + '% loaded');
    },
    (error) => {
      console.error('Error loading static FBX:', error);
    }
  );
}


// Scroll-based camera movement
let scrollProgress = 0;

function updateCameraFromScroll() {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  scrollProgress = scrollHeight > 0 ? scrolled / scrollHeight : 0;

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

window.addEventListener('scroll', updateCameraFromScroll);
updateCameraFromScroll();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);

  // Recalculate bounds on resize
  lanternController.updateBounds();

  // Update lantern sizes for new screen width
  const newScale = getResponsiveLanternScale();
  lanternController.updateLanternSizes(newScale)
  if (mirroredSurface) {
    mirroredSurface.handleResize();
  }
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

  // Update lantern flicker animation
  lanternMaterialManager.update(normalizedDelta);

  perfMonitor.update();
  lanternController.update(normalizedDelta);
  if (mirroredSurface) {
    mirroredSurface.update();
  }
  composer.render();
}

renderer.setAnimationLoop(animate);

// Expose for debugging
// Expose for debugging
window.scene = scene;
window.camera = camera;
window.renderer = renderer;
window.mirroredSurface = mirroredSurface;
window.THREEJS_CONFIG = CONFIG;
window.bloomPass = bloomPass;
window.perfMonitor = perfMonitor;
window.lanternController = lanternController;
window.lanternMaterialManager = lanternMaterialManager;  // ← ADD THIS LINE
window.loadLanternsFBX = loadLanternsFBX;

console.log('Three.js scene ready!');
console.log('Load lanterns: window.loadLanternsFBX("/path/to/lanterns.fbx")');

console.log('Toggle performance: window.perfMonitor.remove()');
