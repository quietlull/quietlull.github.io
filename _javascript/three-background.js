import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { PerformanceMonitor } from './performance-monitor.js';
import { LanternController } from './lantern-controller.js';
import { createWaterMaterial } from './shader/createWaterMaterial.js';

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
      speed: 2,
      amount: 30
    },
    glow: {
      color: 0xffaa66,
      intensity: 2
    },
    avoidance: {
      proximityRadius: 10000, // Increased - react from further away
      avoidanceStrength: 1.5, // Reduced - gentler push
      knockRadius: 40, // Added - distance for hard knock
      knockStrength: 40, // Increased knock power
      returnSpeed: 0.08, // Slower return
      boundaryForce: 0.5, // Stronger boundary push
      rotationStrength: 0.005,
      knockCooldown: 0.1
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


const waterMaterial = createWaterMaterial(scene, camera, renderer);
waterMaterial.setBrightness(0.4);


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


const initialScale  = getResponsiveLanternScale();

/*
// Create test lanterns
const lanternMaterial = new THREE.MeshBasicMaterial({ 
  color: CONFIG.lanterns.glow.color,
});

// Top lantern
const topLantern = new THREE.Mesh(
  new THREE.BoxGeometry(50, 50, 50),
  lanternMaterial.clone()
);
topLantern.position.set(0, 0, 0);
scene.add(topLantern);
lanternController.addLantern(topLantern);

// Middle lantern
const midLantern = new THREE.Mesh(
  new THREE.BoxGeometry(50, 50, 50),
  lanternMaterial.clone()
);
midLantern.position.set(0, 100, 0);
scene.add(midLantern);
lanternController.addLantern(midLantern);

// Bottom lantern
const bottomLantern = new THREE.Mesh(
  new THREE.BoxGeometry(50, 50, 50),
  lanternMaterial.clone()
);
bottomLantern.position.set(0, 700, 0);
scene.add(bottomLantern);
lanternController.addLantern(bottomLantern);
perfMonitor.setLanternCount(lanternController.getLanternCount()); // Update count every frame
*/









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
          // Apply emissive material for bloom
          child.material = new THREE.MeshBasicMaterial({
            color: CONFIG.lanterns.glow.color,
          });
          
          // Apply responsive scale
          child.scale.multiplyScalar(currentScale);
          
          lanternController.addLantern(child);
          console.log('Added lantern mesh:', child.name, 'at position:', child.position);
        }
      });
      
      scene.add(fbx);
      perfMonitor.setLanternCount(lanternController.getLanternCount());
      console.log(`Loaded ${lanternController.getLanternCount() - 3} lanterns from FBX (plus 3 test cubes)`);
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
      fbx.position.y = CONFIG.camera.endPositionY - 100;
      
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



loadDockFBX('/assets/mesh/lantern-night/Water.fbx', waterMaterial);

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
  waterMaterial.onResize(window.innerWidth, window.innerHeight);
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
  
  perfMonitor.update();
  lanternController.update(normalizedDelta);
  waterMaterial.updateMirror();
  composer.render();
}

renderer.setAnimationLoop(animate);

// Expose for debugging
window.THREEJS_CONFIG = CONFIG;
window.bloomPass = bloomPass;
window.perfMonitor = perfMonitor;
window.lanternController = lanternController;
window.loadLanternsFBX = loadLanternsFBX;

console.log('Three.js scene ready!');
console.log('Load lanterns: window.loadLanternsFBX("/path/to/lanterns.fbx")');

console.log('Toggle performance: window.perfMonitor.remove()');
