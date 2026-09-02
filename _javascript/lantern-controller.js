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
    this.intersectionZ = options.intersectionZ || 0;

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

    // Toggle debug with 'D' key. Registered only when the config asks for it: unconditional, it
    // meant a visitor typing the letter d into any text field flipped on the debug rings, which
    // allocate a sphere + two ring meshes per lantern per frame.
    if (this.config.debugEnabled) document.addEventListener('keydown', (event) => {
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
    // Tag the object's kind ONCE (lantern = BoxGeometry, ember/firefly = SphereGeometry)
    // so the update loop never has to inspect geometry type per frame.
    mesh.userData.kind = mesh.geometry.type === 'SphereGeometry' ? 'ember' : 'lantern';

    // Initialize userData for interaction
    mesh.userData.basePosition = mesh.position.clone();
    mesh.userData.baseRotation = mesh.rotation.clone();
    mesh.userData.floatOffset = Math.random() * Math.PI * 2;
    mesh.userData.floatScale = mesh.userData.floatScale || 1;
    mesh.userData.avoidanceOffset = new THREE.Vector2(0, 0); // knock impulse only (Step 2)
    mesh.userData.fieldOffset = new THREE.Vector2(0, 0);     // parting field (Step 2: direct, not accumulated)
    mesh.userData.velocity = new THREE.Vector2(0, 0);
    mesh.userData.rotationVelocity = new THREE.Vector3(0, 0, 0);
    mesh.userData.baseScale = mesh.scale.clone();
    mesh.userData.lastKnockTime = 0;
    mesh.userData.lastAchievementDispatch = 0;

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

  // Radial push away from the cursor, accumulated into `out`. Squared-distance reject FIRST
  // (skips the sqrt for out-of-range objects -> Layer B stays cheap); linear falloff over `radius`.
  _addParting(out, dx, dy, d2, radius, strength) {
    if (d2 >= radius * radius) return;
    const d = Math.sqrt(d2);
    if (d < 0.01) return;
    const mag = strength * (1 - d / radius);
    out.x += (dx / d) * mag;
    out.y += (dy / d) * mag;
  }

  update(normalizedDelta = 1.0) {
    this.time += 0.016 * normalizedDelta;

    const floatConfig = this.config.lanterns.float;

    // Clear old debug objects
    if (this.avoidanceEnabled && this.debugEnabled) {
      this.clearDebug();
    }

    // Mouse ray available for per-lantern intersection
    const hasMouseRay = this.avoidanceEnabled && this.isMouseOverCanvas;

    // Per-frame constants — identical for every lantern this frame, hoisted out of the loop
    // (was recomputing 4x Math.pow per lantern). Results are bit-identical -> no visual change.
    const avoidanceConfig = this.config.lanterns.avoidance;
    let velocityDamping = 1;
    let rotationDamping = 1;
    let rotationReturnSpeed = 0;
    let positionReturnSpeed = 0;
    if (this.avoidanceEnabled) {
      velocityDamping = Math.pow(0.92, normalizedDelta);
      rotationDamping = Math.pow(0.90, normalizedDelta);
      rotationReturnSpeed = 1 - Math.pow(1 - 0.05, normalizedDelta);
      positionReturnSpeed = 1 - Math.pow(1 - avoidanceConfig.returnSpeed, normalizedDelta);
    }

    for (let index = 0; index < this.lanterns.length; index++) {
      const lantern = this.lanterns[index];
      const offset = lantern.userData.floatOffset;

      // Base floating animation
      const fs = lantern.userData.floatScale;
      const floatX = Math.sin(this.time * floatConfig.speed + offset) * floatConfig.amount * fs;
      const floatY = Math.cos(this.time * floatConfig.speed * 0.7 + offset) * floatConfig.amount * 0.5 * fs;

      // Parting target for this frame (0 = no push / cursor far -> the field eases home)
      let fieldTargetX = 0;
      let fieldTargetY = 0;

      // Mouse avoidance — intersect ray at each lantern's z-depth for correct perspective
      if (hasMouseRay) {
        const config = avoidanceConfig;
        lantern.getWorldPosition(this._worldPos);
        this._plane.constant = -this._worldPos.z;
        const mouseWorld = this.raycaster.ray.intersectPlane(this._plane, this._intersectTarget);

        if (mouseWorld) {
          if (this.debugEnabled) {
            const lanternZ = this._worldPos.z;
            const cursorSphere = this.createDebugSphere(5, 0xff00ff);
            cursorSphere.position.copy(mouseWorld);
            lantern.parent.add(cursorSphere);
            this.debugObjects.push(cursorSphere);

            const localCircle = this.createDebugCircle(config.localRadius, 0xffaa00, lanternZ);
            localCircle.position.x = this._worldPos.x;
            localCircle.position.y = this._worldPos.y;
            lantern.parent.add(localCircle);
            this.debugObjects.push(localCircle);

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

                  // Achievement dispatch (per-object 1s cooldown)
                  if (this.time - lantern.userData.lastAchievementDispatch > 1.0) {
                    lantern.userData.lastAchievementDispatch = this.time;
                    if (lantern.userData.kind === 'ember') {
                      document.dispatchEvent(new Event('achievement:fireflytouched'));
                    } else {
                      document.dispatchEvent(new Event('achievement:lanternknock'));
                    }
                  }

                  if (this.debugEnabled) {
                    console.log(`🔴 KNOCK! Lantern ${index}`);
                  }
                }
              }
            } else {
              // Parting target = Layer A (whole-screen, identical to Step 2) + Layer B (extra local
              // push on closer elements). Both via _addParting; its squared-distance reject means
              // Layer B costs nothing for the far majority. (Knock above is untouched.)
              const d2 = distance * distance;
              // Layer A strength = the equilibrium the old accumulator settled at: push*(1-r)/r.
              const sceneStrength = config.avoidanceStrength * this.displacementScale
                * (1 - config.returnSpeed) / config.returnSpeed;
              this._tempVec2.set(0, 0);
              this._addParting(this._tempVec2, dx, dy, d2, config.proximityRadius, sceneStrength);
              this._addParting(this._tempVec2, dx, dy, d2, config.localRadius, config.localStrength * this.displacementScale);
              fieldTargetX = this._tempVec2.x;
              fieldTargetY = this._tempVec2.y;
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

        // Dampen velocity and rotation (constants hoisted above the loop)
        lantern.userData.velocity.multiplyScalar(velocityDamping);
        lantern.userData.rotationVelocity.multiplyScalar(rotationDamping);

        // Gradually return to base rotation
        lantern.rotation.x += (lantern.userData.baseRotation.x - lantern.rotation.x) * rotationReturnSpeed;
        lantern.rotation.y += (lantern.userData.baseRotation.y - lantern.rotation.y) * rotationReturnSpeed;
        lantern.rotation.z += (lantern.userData.baseRotation.z - lantern.rotation.z) * rotationReturnSpeed;

        // Knock impulse offset eases back to zero (parting now lives in fieldOffset)
        lantern.userData.avoidanceOffset.x *= (1 - positionReturnSpeed);
        lantern.userData.avoidanceOffset.y *= (1 - positionReturnSpeed);

        // Parting field (Step 2): approach the direct target — set once, not accumulated.
        // Same approach rate the old accumulator used, so the feel matches.
        const fo = lantern.userData.fieldOffset;
        fo.x += (fieldTargetX - fo.x) * positionReturnSpeed;
        fo.y += (fieldTargetY - fo.y) * positionReturnSpeed;

        lantern.position.x = lantern.userData.basePosition.x + floatX + lantern.userData.avoidanceOffset.x + fo.x;
        lantern.position.y = lantern.userData.basePosition.y + floatY + lantern.userData.avoidanceOffset.y + fo.y;
      } else {
        // Float only — no avoidance physics
        lantern.position.x = lantern.userData.basePosition.x + floatX;
        lantern.position.y = lantern.userData.basePosition.y + floatY;
      }
    }
  }

  getLanternCount() {
    return this.lanterns.length;
  }
}
