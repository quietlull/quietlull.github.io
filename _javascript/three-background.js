import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// === CONFIGURATION ===
const CONFIG = {
  camera: {
    startRotationX: 60 * Math.PI / 180,
    endRotationX: 0,
    startPositionY: 120,
    endPositionY: 0,
    positionZ: 50,
  },
  lanterns: {
    bloom: {
      strength: 1.5,
      radius: 0.4,
      threshold: 0.1
    },
    float: {
      speed: 0.5,
      amount: 0.3
    },
    glow: {
      color: 0xffaa66,
      intensity: 2
    },
    avoidance: {
      proximityRadius: 200, // Increased - react from further away
      avoidanceStrength: .05, // Reduced - gentler push
      knockRadius: 2.5, // Added - distance for hard knock
      knockStrength: 2.5, // Increased knock power
      returnSpeed: 0.008, // Slower return
      boundaryForce: 0.5 // Stronger boundary push
    }
  }
};

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x080f1b);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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

window.bloomPass = bloomPass;

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

// Lanterns
const lanterns = [];

const lanternMaterial = new THREE.MeshBasicMaterial({ 
  color: CONFIG.lanterns.glow.color,
  emissive: CONFIG.lanterns.glow.color,
  emissiveIntensity: CONFIG.lanterns.glow.intensity
});

// Top lantern
const topLantern = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  lanternMaterial.clone()
);
topLantern.position.set(0, 0, 0);
topLantern.userData.basePosition = topLantern.position.clone();
topLantern.userData.floatOffset = 0;
topLantern.userData.avoidanceOffset = new THREE.Vector2(0, 0);
topLantern.userData.velocity = new THREE.Vector2(0, 0);
scene.add(topLantern);
lanterns.push(topLantern);

// Middle lantern
const midLantern = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  lanternMaterial.clone()
);
midLantern.position.set(0, 100, 0);
midLantern.userData.basePosition = midLantern.position.clone();
midLantern.userData.floatOffset = Math.PI * 0.66;
midLantern.userData.avoidanceOffset = new THREE.Vector2(0, 0);
midLantern.userData.velocity = new THREE.Vector2(0, 0);
scene.add(midLantern);
lanterns.push(midLantern);

// Bottom lantern
const bottomLantern = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  lanternMaterial.clone()
);
bottomLantern.position.set(0, 200, 0);
bottomLantern.userData.basePosition = bottomLantern.position.clone();
bottomLantern.userData.floatOffset = Math.PI * 1.33;
bottomLantern.userData.avoidanceOffset = new THREE.Vector2(0, 0);
bottomLantern.userData.velocity = new THREE.Vector2(0, 0);
scene.add(bottomLantern);
lanterns.push(bottomLantern);

// Mouse tracking
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const mouseWorldPos = new THREE.Vector3();
let isMouseOverCanvas = false;

function updateMouseWorldPosition(event) {
  // Use viewport coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  
  // Intersect with a plane at Z=0 (where lanterns are)
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  raycaster.ray.intersectPlane(plane, mouseWorldPos);
}

// Track mouse across entire document
document.addEventListener('mousemove', (event) => {
  updateMouseWorldPosition(event);
  isMouseOverCanvas = true;
});

// Only disable when mouse actually leaves the window
window.addEventListener('mouseleave', () => {
  isMouseOverCanvas = false;
});


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
});


let time = 0;

function animate() {
  time += 0.016;
  
  const config = CONFIG.lanterns.avoidance;
  
  // Calculate page bounds in world space
  const scrollHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  const pageHeightRatio = scrollHeight / viewportHeight;
  
  const frustumHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
  const frustumWidth = frustumHeight * camera.aspect;
  const totalPageHeight = Math.abs(CONFIG.camera.startPositionY - CONFIG.camera.endPositionY) + frustumHeight;
  
  const bounds = {
    left: -frustumWidth / 2,
    right: frustumWidth / 2,
    top: CONFIG.camera.startPositionY + frustumHeight / 2,
    bottom: CONFIG.camera.endPositionY - frustumHeight / 2
  };
  
  // Update lanterns
  lanterns.forEach(lantern => {
    const floatSpeed = CONFIG.lanterns.float.speed;
    const floatAmount = CONFIG.lanterns.float.amount;
    const offset = lantern.userData.floatOffset;
    
    // Base floating
    const floatX = Math.sin(time * floatSpeed + offset) * floatAmount;
    const floatY = Math.cos(time * floatSpeed * 0.7 + offset) * floatAmount * 0.5;
    
    // Mouse avoidance
    if (isMouseOverCanvas && mouseWorldPos) {
      const dx = lantern.position.x - mouseWorldPos.x;
      const dy = lantern.position.y - mouseWorldPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Debug: log when very close
      if (distance < 1.0) {
        console.log(`Lantern distance: ${distance.toFixed(2)}, knock threshold: ${config.knockRadius}`);
      }
      
      if (distance < config.proximityRadius) {
        const avoidanceFactor = 1 - (distance / config.proximityRadius);
        
        if (distance < config.knockRadius) {
          // Knock - add velocity
          const knockDir = new THREE.Vector2(dx, dy);
          if (knockDir.length() > 0.01) { // Avoid division by zero
            knockDir.normalize();
            const knockForce = config.knockStrength * avoidanceFactor;
            lantern.userData.velocity.x += knockDir.x * knockForce;
            lantern.userData.velocity.y += knockDir.y * knockForce;
            console.log(`KNOCK! Force: ${knockForce.toFixed(2)}, Direction: (${knockDir.x.toFixed(2)}, ${knockDir.y.toFixed(2)})`);
          }
        } else {
          // Gentle push
          const pushDir = new THREE.Vector2(dx, dy);
          if (pushDir.length() > 0.01) {
            pushDir.normalize();
            lantern.userData.avoidanceOffset.x += pushDir.x * config.avoidanceStrength * avoidanceFactor;
            lantern.userData.avoidanceOffset.y += pushDir.y * config.avoidanceStrength * avoidanceFactor;
          }
        }
      }
    }
    
    // Apply velocity
    lantern.userData.avoidanceOffset.x += lantern.userData.velocity.x;
    lantern.userData.avoidanceOffset.y += lantern.userData.velocity.y;
    
    // Dampen velocity
    lantern.userData.velocity.multiplyScalar(0.92);
    
    // Gradually return to base
    lantern.userData.avoidanceOffset.x *= (1 - config.returnSpeed);
    lantern.userData.avoidanceOffset.y *= (1 - config.returnSpeed);
    
    // Calculate target position
    let targetX = lantern.userData.basePosition.x + floatX + lantern.userData.avoidanceOffset.x;
    let targetY = lantern.userData.basePosition.y + floatY + lantern.userData.avoidanceOffset.y;
    
    // Boundary enforcement
    if (targetX < bounds.left) {
      lantern.userData.velocity.x += (bounds.left - targetX) * config.boundaryForce;
      targetX = bounds.left;
    } else if (targetX > bounds.right) {
      lantern.userData.velocity.x += (bounds.right - targetX) * config.boundaryForce;
      targetX = bounds.right;
    }
    
    if (targetY < bounds.bottom) {
      lantern.userData.velocity.y += (bounds.bottom - targetY) * config.boundaryForce;
      targetY = bounds.bottom;
    } else if (targetY > bounds.top) {
      lantern.userData.velocity.y += (bounds.top - targetY) * config.boundaryForce;
      targetY = bounds.top;
    }
    
    lantern.position.x = targetX;
    lantern.position.y = targetY;
  });
  
  composer.render();
}

renderer.setAnimationLoop(animate);

// Expose config
window.THREEJS_CONFIG = CONFIG;
console.log('Lantern interaction ready! Try moving your mouse near them.');
console.log('Tune avoidance: window.THREEJS_CONFIG.lanterns.avoidance');