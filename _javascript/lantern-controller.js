import * as THREE from 'three';

// Lantern behavior controller
export class LanternController {
  constructor(config, camera) {
    this.config = config;
    this.camera = camera;
    this.lanterns = [];
    this.time = 0;
    
    // Mouse tracking
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.mouseWorldPos = new THREE.Vector3();
    this.isMouseOverCanvas = false;
    
    // Pre-calculate bounds once (updated on resize or scroll config change)
    this.bounds = this.calculateBounds();
    
    this.setupMouseTracking();
  }
  
  calculateBounds() {
    // APPROACH: Find what world Y coordinates are visible at top and bottom of scrollable page
    // accounting for camera tilt
    
    // Page dimensions
    const pageHeightPx = document.documentElement.scrollHeight;
    const viewportHeightPx = window.innerHeight;
    
    // Calculate world space dimensions for horizontal bounds (these don't change with tilt)
    const distance = this.camera.position.z; // 500
    const vFov = (this.camera.fov * Math.PI) / 180;
    const viewportHeightWorld = 2 * Math.tan(vFov / 2) * distance;
    const viewportWidthWorld = viewportHeightWorld * this.camera.aspect;
    
    // Horizontal bounds with margin
    const marginX = viewportWidthWorld * 0.8;
    const left = -viewportWidthWorld / 2 - marginX;
    const right = viewportWidthWorld / 2 + marginX;
    
    // For vertical bounds, we need to find what Y coordinates are visible at:
    // 1. Top of page (scroll = 0, camera at startPositionY with startRotationX)
    // 2. Bottom of page (scroll = max, camera at endPositionY with endRotationX)
    
    const startCameraY = this.config.camera.startPositionY; // 300
    const endCameraY = this.config.camera.endPositionY; // 100
    const startRotationX = this.config.camera.startRotationX; // 30 degrees (in radians)
    const endRotationX = this.config.camera.endRotationX; // 0 degrees
    
    // Calculate the top edge of visible area when camera is at start position
    // When camera is tilted up, it's looking higher in world space
    const topVisibleAtStart = startCameraY + viewportHeightWorld / 2 + 
                              (Math.tan(startRotationX) * distance);
    
    // Calculate the bottom edge of visible area when camera is at end position
    // Camera looking straight, at the bottom of the page
    const scrollRange = pageHeightPx - viewportHeightPx;
    const worldPerPixelY = viewportHeightWorld / viewportHeightPx;
    const totalScrollWorldHeight = scrollRange * worldPerPixelY;
    
    const bottomVisibleAtEnd = endCameraY - viewportHeightWorld / 2 - 
                               totalScrollWorldHeight +
                               (Math.tan(endRotationX) * distance);
    
    // Add generous vertical margins
    const marginY = viewportHeightWorld * 0.8;
    
    return {
      left: left,
      right: right,
      top: topVisibleAtStart + marginY,
      bottom: bottomVisibleAtEnd - marginY
    };
  }
  
  updateBounds() {
    this.bounds = this.calculateBounds();
  }
  
  setupMouseTracking() {
    document.addEventListener('mousemove', (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      this.raycaster.setFromCamera(this.mouse, this.camera);
      
      // Store the raycaster for per-lantern intersection
      // We'll calculate distance to each lantern individually in the update loop
      this.isMouseOverCanvas = true;
    });
    
    window.addEventListener('mouseleave', () => {
      this.isMouseOverCanvas = false;
    });
  }


  addLantern(mesh) {
    // Initialize userData for interaction
    mesh.userData.basePosition = mesh.position.clone();
    mesh.userData.floatOffset = Math.random() * Math.PI * 2;
    mesh.userData.avoidanceOffset = new THREE.Vector2(0, 0);
    mesh.userData.velocity = new THREE.Vector2(0, 0);
    mesh.userData.baseScale = mesh.scale.clone(); // Store original scale
    
    this.lanterns.push(mesh);
  }
  
  updateLanternSizes(scaleFactor) {
    this.lanterns.forEach(lantern => {
      // Scale based on original size
      lantern.scale.copy(lantern.userData.baseScale).multiplyScalar(scaleFactor);
    });
  }
  
   update(deltaTime = 0.016) {
    this.time += deltaTime;
    
    const config = this.config.lanterns.avoidance;
    const floatConfig = this.config.lanterns.float;
    
    this.lanterns.forEach(lantern => {
      const offset = lantern.userData.floatOffset;
      
      // Base floating animation
      const floatX = Math.sin(this.time * floatConfig.speed + offset) * floatConfig.amount;
      const floatY = Math.cos(this.time * floatConfig.speed * 0.7 + offset) * floatConfig.amount * 0.5;
      
      // Mouse avoidance
      if (this.isMouseOverCanvas) {
        // Calculate mouse position at THIS lantern's Z depth
        const lanternZ = lantern.position.z;
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -lanternZ);
        const mouseAtLanternDepth = new THREE.Vector3();
        this.raycaster.ray.intersectPlane(plane, mouseAtLanternDepth);
        
        if (mouseAtLanternDepth) {
          const dx = lantern.position.x - mouseAtLanternDepth.x;
          const dy = lantern.position.y - mouseAtLanternDepth.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < config.proximityRadius) {
            const avoidanceFactor = 1 - (distance / config.proximityRadius);
            
            if (distance < config.knockRadius) {
              // Knock - add velocity
              const knockDir = new THREE.Vector2(dx, dy);
              if (knockDir.length() > 0.01) {
                knockDir.normalize();
                const knockForce = config.knockStrength * avoidanceFactor;
                lantern.userData.velocity.x += knockDir.x * knockForce;
                lantern.userData.velocity.y += knockDir.y * knockForce;
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
      if (targetX < this.bounds.left) {
        lantern.userData.velocity.x += (this.bounds.left - targetX) * config.boundaryForce;
        targetX = this.bounds.left;
      } else if (targetX > this.bounds.right) {
        lantern.userData.velocity.x += (this.bounds.right - targetX) * config.boundaryForce;
        targetX = this.bounds.right;
      }
      
      if (targetY < this.bounds.bottom) {
        lantern.userData.velocity.y += (this.bounds.bottom - targetY) * config.boundaryForce;
        targetY = this.bounds.bottom;
      } else if (targetY > this.bounds.top) {
        lantern.userData.velocity.y += (this.bounds.top - targetY) * config.boundaryForce;
        targetY = this.bounds.top;
      }
      
      lantern.position.x = targetX;
      lantern.position.y = targetY;
    });
  }
  
  getLanternCount() {
    return this.lanterns.length;
  }
}
