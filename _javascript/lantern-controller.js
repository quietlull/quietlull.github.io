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

    // Debug visualization
    this.debugEnabled = true; // Set to false to disable
    this.debugObjects = [];

    this.setupMouseTracking();
  }

  calculateBounds() {
    //TO DO: REMOVE
  }

  updateBounds() {
    //TO DO: REMOVE
  }

  setupMouseTracking() {
    document.addEventListener('mousemove', (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      this.isMouseOverCanvas = true;
    });

    window.addEventListener('mouseleave', () => {
      this.isMouseOverCanvas = false;
    });

    // Toggle debug with 'D' key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'd' || event.key === 'D') {
        this.debugEnabled = !this.debugEnabled;
        console.log('Debug mode:', this.debugEnabled ? 'ON' : 'OFF');
        if (!this.debugEnabled) {
          this.clearDebug();
        }
      }
    });
  }

  addLantern(mesh) {
    // Initialize userData for interaction
    mesh.userData.basePosition = mesh.position.clone();
    mesh.userData.baseRotation = mesh.rotation.clone();
    mesh.userData.floatOffset = Math.random() * Math.PI * 2;
    mesh.userData.avoidanceOffset = new THREE.Vector2(0, 0);
    mesh.userData.velocity = new THREE.Vector2(0, 0);
    mesh.userData.rotationVelocity = new THREE.Vector3(0, 0, 0);
    mesh.userData.baseScale = mesh.scale.clone();
    mesh.userData.lastKnockTime = 0;

    this.lanterns.push(mesh);
  }

  updateLanternSizes(scaleFactor) {
    this.lanterns.forEach(lantern => {
      lantern.scale.copy(lantern.userData.baseScale).multiplyScalar(scaleFactor);
    });
  }

  clearDebug() {
    this.debugObjects.forEach(obj => {
      if (obj.parent) {
        obj.parent.remove(obj);
      }
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    });
    this.debugObjects = [];
  }

  createDebugCircle(radius, color, z) {
    const geometry = new THREE.RingGeometry(radius - 2, radius + 2, 32);
    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });
    const circle = new THREE.Mesh(geometry, material);
    circle.position.z = z;
    return circle;
  }

  createDebugSphere(radius, color) {
    const geometry = new THREE.SphereGeometry(radius, 16, 16);
    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.7
    });
    return new THREE.Mesh(geometry, material);
  }

  update(normalizedDelta = 1.0) {
    this.time += 0.016 * normalizedDelta;

    const config = this.config.lanterns.avoidance;
    const floatConfig = this.config.lanterns.float;

    // Clear old debug objects
    if (this.debugEnabled) {
      this.clearDebug();
    }

    this.lanterns.forEach((lantern, index) => {
      const offset = lantern.userData.floatOffset;

      // Base floating animation
      const floatX = Math.sin(this.time * floatConfig.speed + offset) * floatConfig.amount;
      const floatY = Math.cos(this.time * floatConfig.speed * 0.7 + offset) * floatConfig.amount * 0.5;

      // Mouse avoidance
      if (this.isMouseOverCanvas) {
        const lanternZ = lantern.position.z;
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -lanternZ);
        const mouseAtLanternDepth = new THREE.Vector3();
        this.raycaster.ray.intersectPlane(plane, mouseAtLanternDepth);

        if (mouseAtLanternDepth) {
          // 🐛 DEBUG VISUALIZATION
          if (config.debugEnabled) {
            // Show mouse cursor at this depth
            const cursorSphere = this.createDebugSphere(5, 0xff00ff);
            cursorSphere.position.copy(mouseAtLanternDepth);
            lantern.parent.add(cursorSphere);
            this.debugObjects.push(cursorSphere);

            // Show proximity radius circle
            const proximityCircle = this.createDebugCircle(config.proximityRadius, 0x00ff00, lanternZ);
            proximityCircle.position.x = lantern.position.x;
            proximityCircle.position.y = lantern.position.y;
            lantern.parent.add(proximityCircle);
            this.debugObjects.push(proximityCircle);

            // Show knock radius circle
            const knockCircle = this.createDebugCircle(config.knockRadius, 0xff0000, lanternZ);
            knockCircle.position.x = lantern.position.x;
            knockCircle.position.y = lantern.position.y;
            lantern.parent.add(knockCircle);
            this.debugObjects.push(knockCircle);


          }

          const dx = lantern.position.x - mouseAtLanternDepth.x;
          const dy = lantern.position.y - mouseAtLanternDepth.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.proximityRadius) {
            const avoidanceFactor = 1 - (distance / config.proximityRadius);

            if (distance < config.knockRadius) {
              const timeSinceLastKnock = this.time - lantern.userData.lastKnockTime;

              if (timeSinceLastKnock > config.knockCooldown) {
                const knockDir = new THREE.Vector2(dx, dy);
                if (knockDir.length() > 0.01) {
                  knockDir.normalize();
                  const knockForce = config.knockStrength * avoidanceFactor;
                  lantern.userData.velocity.x += knockDir.x * knockForce;
                  lantern.userData.velocity.y += knockDir.y * knockForce;

                  const rotationForce = config.knockStrength * avoidanceFactor * config.rotationStrength;
                  lantern.userData.rotationVelocity.z += knockDir.x * rotationForce;
                  lantern.userData.rotationVelocity.x += -knockDir.y * rotationForce * 0.5;

                  lantern.userData.lastKnockTime = this.time;

                  // 🐛 DEBUG: Log knock event
                  if (config.debugEnabled) {
                    console.log(`🔴 KNOCK! Lantern ${index} at Z: ${lanternZ.toFixed(0)}`);
                  }
                }
              }
            } else {
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
      lantern.userData.avoidanceOffset.x += lantern.userData.velocity.x * normalizedDelta;
      lantern.userData.avoidanceOffset.y += lantern.userData.velocity.y * normalizedDelta;

      // Apply rotation velocity
      lantern.rotation.x += lantern.userData.rotationVelocity.x * normalizedDelta;
      lantern.rotation.y += lantern.userData.rotationVelocity.y * normalizedDelta;
      lantern.rotation.z += lantern.userData.rotationVelocity.z * normalizedDelta;

      // Dampen velocity and rotation
      const velocityDamping = Math.pow(0.92, normalizedDelta);
      const rotationDamping = Math.pow(0.90, normalizedDelta);
      lantern.userData.velocity.multiplyScalar(velocityDamping);
      lantern.userData.rotationVelocity.multiplyScalar(rotationDamping);

      // Gradually return to base rotation
      const rotationReturnSpeed = 1 - Math.pow(1 - 0.05, normalizedDelta);
      lantern.rotation.x += (lantern.userData.baseRotation.x - lantern.rotation.x) * rotationReturnSpeed;
      lantern.rotation.y += (lantern.userData.baseRotation.y - lantern.rotation.y) * rotationReturnSpeed;
      lantern.rotation.z += (lantern.userData.baseRotation.z - lantern.rotation.z) * rotationReturnSpeed;

      // Gradually return to base position
      const positionReturnSpeed = 1 - Math.pow(1 - config.returnSpeed, normalizedDelta);
      lantern.userData.avoidanceOffset.x *= (1 - positionReturnSpeed);
      lantern.userData.avoidanceOffset.y *= (1 - positionReturnSpeed);

      // Calculate target position
      let targetX = lantern.userData.basePosition.x + floatX + lantern.userData.avoidanceOffset.x;
      let targetY = lantern.userData.basePosition.y + floatY + lantern.userData.avoidanceOffset.y;

      lantern.position.x = targetX;
      lantern.position.y = targetY;
    });
  }

  getLanternCount() {
    return this.lanterns.length;
  }
}