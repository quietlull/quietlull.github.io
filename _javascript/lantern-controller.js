import * as THREE from 'three';

// Lantern behavior controller
export class LanternController {
  constructor(config, camera, options = {}) {
    this.config = config;
    this.camera = camera;
    this.lanterns = [];
    this.time = 0;
    this.avoidanceEnabled = options.avoidance !== false;
    this.displacementScale = options.displacementScale || 1;

    if (this.avoidanceEnabled) {
      // Mouse tracking
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();
      this.mouseWorldPos = new THREE.Vector3();
      this.isMouseOverCanvas = false;

      // Reusable math objects (avoid per-frame allocations)
      this._plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      this._intersectTarget = new THREE.Vector3();
      this._worldPos = new THREE.Vector3();
      this._tempVec2 = new THREE.Vector2();

      // Debug visualization
      this.debugEnabled = false;
      this.debugObjects = [];

      this.setupMouseTracking();
    }
  }

  setupMouseTracking() {
    let mouseTicking = false;
    document.addEventListener('mousemove', (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      this.isMouseOverCanvas = true;

      if (!mouseTicking) {
        requestAnimationFrame(() => {
          this.raycaster.setFromCamera(this.mouse, this.camera);
          mouseTicking = false;
        });
        mouseTicking = true;
      }
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

    const floatConfig = this.config.lanterns.float;

    // Clear old debug objects
    if (this.avoidanceEnabled && this.debugEnabled) {
      this.clearDebug();
    }

    // Compute mouse world position once before the loop (approximate at z=0)
    let mouseWorld = null;
    if (this.avoidanceEnabled && this.isMouseOverCanvas) {
      this._plane.constant = 0;
      mouseWorld = this.raycaster.ray.intersectPlane(this._plane, this._intersectTarget);
    }

    this.lanterns.forEach((lantern, index) => {
      const offset = lantern.userData.floatOffset;

      // Base floating animation
      const floatX = Math.sin(this.time * floatConfig.speed + offset) * floatConfig.amount;
      const floatY = Math.cos(this.time * floatConfig.speed * 0.7 + offset) * floatConfig.amount * 0.5;

      // Mouse avoidance (skipped when avoidance disabled)
      if (mouseWorld) {
        const config = this.config.lanterns.avoidance;
        lantern.getWorldPosition(this._worldPos);

        if (this.debugEnabled) {
          const lanternZ = this._worldPos.z;
          // Show mouse cursor position
          const cursorSphere = this.createDebugSphere(5, 0xff00ff);
          cursorSphere.position.copy(mouseWorld);
          lantern.parent.add(cursorSphere);
          this.debugObjects.push(cursorSphere);

          // Show proximity radius circle
          const proximityCircle = this.createDebugCircle(config.proximityRadius, 0x00ff00, lanternZ);
          proximityCircle.position.x = this._worldPos.x;
          proximityCircle.position.y = this._worldPos.y;
          lantern.parent.add(proximityCircle);
          this.debugObjects.push(proximityCircle);

          // Show knock radius circle
          const knockCircle = this.createDebugCircle(config.knockRadius, 0xff0000, lanternZ);
          knockCircle.position.x = this._worldPos.x;
          knockCircle.position.y = this._worldPos.y;
          lantern.parent.add(knockCircle);
          this.debugObjects.push(knockCircle);
        }

        const dx = this._worldPos.x - mouseWorld.x;
        const dy = this._worldPos.y - mouseWorld.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.proximityRadius) {
          const avoidanceFactor = 1 - (distance / config.proximityRadius);

          if (distance < config.knockRadius) {
            const timeSinceLastKnock = this.time - lantern.userData.lastKnockTime;

            if (timeSinceLastKnock > config.knockCooldown) {
              this._tempVec2.set(dx, dy);
              if (this._tempVec2.length() > 0.01) {
                this._tempVec2.normalize();
                const knockDir = this._tempVec2;
                const knockForce = config.knockStrength * avoidanceFactor;
                lantern.userData.velocity.x += knockDir.x * knockForce;
                lantern.userData.velocity.y += knockDir.y * knockForce;

                const rotationForce = config.knockStrength * avoidanceFactor * config.rotationStrength;
                lantern.userData.rotationVelocity.z += knockDir.x * rotationForce;
                lantern.userData.rotationVelocity.x += -knockDir.y * rotationForce * 0.5;

                lantern.userData.lastKnockTime = this.time;

                // 🐛 DEBUG: Log knock event
                if (this.debugEnabled) {
                  console.log(`🔴 KNOCK! Lantern ${index}`);
                }
              }
            }
          } else {
            this._tempVec2.set(dx, dy);
            if (this._tempVec2.length() > 0.01) {
              this._tempVec2.normalize();
              const pushDir = this._tempVec2;
              lantern.userData.avoidanceOffset.x += pushDir.x * config.avoidanceStrength * avoidanceFactor * this.displacementScale;
              lantern.userData.avoidanceOffset.y += pushDir.y * config.avoidanceStrength * avoidanceFactor * this.displacementScale;
            }
          }
        }
      }

      if (this.avoidanceEnabled) {
        // Apply velocity from knock/push
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
        const config = this.config.lanterns.avoidance;
        const positionReturnSpeed = 1 - Math.pow(1 - config.returnSpeed, normalizedDelta);
        lantern.userData.avoidanceOffset.x *= (1 - positionReturnSpeed);
        lantern.userData.avoidanceOffset.y *= (1 - positionReturnSpeed);

        lantern.position.x = lantern.userData.basePosition.x + floatX + lantern.userData.avoidanceOffset.x;
        lantern.position.y = lantern.userData.basePosition.y + floatY + lantern.userData.avoidanceOffset.y;
      } else {
        // Float only — no avoidance physics
        lantern.position.x = lantern.userData.basePosition.x + floatX;
        lantern.position.y = lantern.userData.basePosition.y + floatY;
      }
    });
  }

  getLanternCount() {
    return this.lanterns.length;
  }
}
