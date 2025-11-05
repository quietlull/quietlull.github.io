import * as THREE from 'three';

/**
 * Firework Controller
 * Adapted from towrabbit's firework example
 * Integrated for lantern scene with camera at Z=500
 */
export class FireworkController {
  constructor(scene, camera, config = {}) {
    this.scene = scene;
    this.camera = camera;
    this.fireWorkGroup = [];
    this.maxFireworks = config.maxFireworks || 50;

    // Configuration
    this.config = {
      minZ: config.minZ || -1000,
      maxZ: config.maxZ || -2500,
      launchSpeed: config.launchSpeed || 0.6, // How fast rockets travel up
      minDelay: config.minDelay || 0.3, // Min time before explosion
      maxDelay: config.maxDelay || 0.8, // Max time before explosion
      particleCount: config.particleCount || 400,
      rainbowChance: config.rainbowChance || 0.6, // 30% chance for rainbow
      autoFireworks: config.autoFireworks || false, // Auto-generate fireworks
      autoChance: config.autoChance || 0.15 // Chance per frame to spawn auto firework
    };

    this.setupClickHandler();
  }

  setupClickHandler() {
    // Handle clicks on the window since canvas has pointer-events: none
    window.addEventListener('click', (event) => {
      // Don't trigger if clicking on actual UI elements
      if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {
        return;
      }

      this.createFireworkFromClick(event.clientX, event.clientY);
    });
  }

  createFireworkFromClick(clientX, clientY) {
    if (this.fireWorkGroup.length >= this.maxFireworks) {
      return;
    }

    // Convert screen coordinates to normalized device coordinates
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;

    // Calculate world position at a random Z depth
    const randomZ = THREE.MathUtils.lerp(this.config.minZ, this.config.maxZ, Math.random());

    // Calculate the size of the view frustum at this Z depth
    const distance = Math.abs(this.camera.position.z - randomZ);
    const vFOV = THREE.MathUtils.degToRad(this.camera.fov);
    const height = 2 * Math.tan(vFOV / 2) * distance;
    const width = height * this.camera.aspect;

    // Convert NDC to world coordinates at this depth
    const worldX = x * (width / 2);
    let worldY = y * (height / 2) + this.camera.position.y;

    // Allow fireworks to go higher by extrapolating beyond screen bounds
    // If clicking in top 20% of screen, allow extra height
    if (y > 0.6) {
      const extraHeight = (y - 0.6) * 1000; // Can add up to 400 extra units
      worldY += extraHeight;
    }

    // Clamp max height to 1500
    worldY = Math.min(worldY, 1500);

    // CLAMP: If clicked below -100, place firework above -100
    const sceneBottom = -100;
    const clampedY = worldY < sceneBottom ? THREE.MathUtils.lerp(sceneBottom + 50, this.camera.position.y - 100, Math.random()) : worldY;

    // End point is where the click happened (or clamped position)
    const endPoint = new THREE.Vector3(worldX, clampedY, randomZ);

    // Start point is BELOW the scene bottom (-100)
    const startPoint = new THREE.Vector3(worldX, sceneBottom - 200, randomZ);

    // Random delay before explosion
    const explosionDelay = THREE.MathUtils.lerp(
      this.config.minDelay,
      this.config.maxDelay,
      Math.random()
    );

    // Random rainbow or solid color
    const isRainbow = Math.random() < this.config.rainbowChance;

    this.createFirework(startPoint, endPoint, explosionDelay, isRainbow);
  }

  createAutoFirework() {
    if (this.fireWorkGroup.length >= this.maxFireworks) {
      return;
    }

    // Random position across the screen, but above scene bottom (-100)
    const randomX = (Math.random() * 2 - 1) * 0.8; // Stay within 80% of screen
    const randomY = (Math.random() * 0.5 + 0.3); // Upper/middle portion of screen

    this.createFireworkFromClick(
      (randomX * 0.5 + 0.5) * window.innerWidth,
      (1 - randomY) * window.innerHeight
    );
  }

  createFirework(startPoint, endPoint, explosionDelay = 0.5, isRainbow = false) {
    // Random color
    const color = new THREE.Color(
      Math.random() * 0.6 + 0.4,
      Math.random() * 0.6 + 0.4,
      Math.random() * 0.6 + 0.4
    );

    // Create rocket trail that spans from start to end
    const rocketTrail = this.createRocketTrail(color, startPoint, endPoint);

    // More varied scale for explosion size (0.5 to 1.5x)
    const scale = Math.random() * 1.0 + 0.5; // 0.5 - 1.5

    // Store data for explosion
    const firework = {
      rocket: rocketTrail,
      explosion: null, // Will be created when rocket reaches target
      color: color,
      isRainbow: isRainbow,
      scale: scale,
      startPoint: startPoint.clone(),
      endPoint: endPoint.clone(),
      explosionDelay: explosionDelay,
      clock: new THREE.Clock(),
      phase: 'launch' // 'launch' or 'explode'
    };

    this.fireWorkGroup.push(firework);
    this.scene.add(rocketTrail);
  }

  createRocketTrail(color, startPoint, endPoint) {
    // Create a single cylinder stretched from start to end point
    const direction = new THREE.Vector3().subVectors(endPoint, startPoint);
    const length = direction.length();
    const midPoint = new THREE.Vector3().addVectors(startPoint, endPoint).multiplyScalar(0.5);

    // Cylinder geometry along Y axis by default, we'll rotate it
    const geometry = new THREE.CylinderGeometry(3, 3, length, 8, 1);

    // Create custom shader material for animated gradient
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(color.r * 0.8, color.g * 0.8, color.b * 0.8) },
        uProgress: { value: 0.0 }, // 0 to 1 as rocket travels
        uGradientWidth: { value: 0.3 } // How wide the glowing section is
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uProgress;
        uniform float uGradientWidth;
        
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          // vUv.y goes from 0 (bottom) to 1 (top)
          // Progress goes from 0 to 1 as rocket travels
          
          // Calculate distance from current progress point
          float distFromProgress = abs(vUv.y - uProgress);
          
          // Create gradient that follows the progress
          // Bright near progress point, fade out behind
          float brightness = 1.0 - smoothstep(0.0, uGradientWidth, distFromProgress);
          
          // Only show trail BEHIND the rocket (below progress)
          if (vUv.y > uProgress) {
            brightness = 0.0;
          }
          
          // Fade out the tail
          float tailFade = smoothstep(max(0.0, uProgress - uGradientWidth - 0.3), uProgress, vUv.y);
          brightness *= tailFade;
          
          vec3 finalColor = uColor * brightness;
          float alpha = brightness;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });

    const trail = new THREE.Mesh(geometry, material);

    // Position the cylinder at midpoint
    trail.position.copy(midPoint);

    // Rotate cylinder to point from start to end
    trail.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );

    return trail;
  }

  createPoints(color, number, endPoint, startPoint, isRainbow) {
    const times = 10; // Trail length
    const step = 0.005;

    const positionAttribute = new THREE.Float32BufferAttribute(number * 3 * times, 3);
    const vertexColorAttribute = new THREE.Float32BufferAttribute(number * 4 * times, 4);
    const delayAttribute = new THREE.Float32BufferAttribute(number * 2 * times, 2);

    for (let i = 0; i < number; i++) {
      // Random color for rainbow mode
      if (isRainbow) {
        const r = Math.random();
        const g = Math.random();
        const b = Math.random();
        for (let j = 0; j < times; j++) {
          vertexColorAttribute.setXYZW(i * times + j, r, g, b, 1);
        }
      }

      // Random position for initial spread
      const x = Math.random();
      const y = Math.random();
      const z = Math.random();

      for (let j = 0; j < times; j++) {
        delayAttribute.setXY(i * times + j, j * step, 0);
        positionAttribute.setXYZ(i * times + j, x, y, z);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', positionAttribute);
    geometry.setAttribute('delay', delayAttribute);
    if (isRainbow) {
      geometry.setAttribute('color', vertexColorAttribute);
    }

    const timeUniform = { value: 0 };
    const material = this.createMaterial(timeUniform, color, isRainbow);

    const points = new THREE.Points(geometry, material);
    points.userData.time = timeUniform;
    points.userData.clock = new THREE.Clock();
    points.userData.startPoint = startPoint;
    points.userData.endPoint = endPoint;

    return points;
  }

  createMaterial(timeUniform, color, isRainbow) {
    const material = new THREE.PointsMaterial({
      size: 50, // World space size
      color: isRainbow ? new THREE.Color(1, 1, 1) : color,
      transparent: true,
      alphaTest: 0.05,
      sizeAttenuation: true,
      depthTest: false,
      vertexColors: isRainbow,
      blending: THREE.NormalBlending // CHANGED from AdditiveBlending
    });

    material.onBeforeCompile = (shader) => {
      // Fragment shader - handles opacity fade
      shader.fragmentShader = `
        uniform vec3 diffuse;
        uniform float opacity;
        
        #include <common>
        uniform float uTime;
        #include <color_pars_fragment>
        #include <map_particle_pars_fragment>
        #include <alphatest_pars_fragment>
        #include <alphahash_pars_fragment>
        #include <fog_pars_fragment>
        #include <logdepthbuf_pars_fragment>
        #include <clipping_planes_pars_fragment>
        
        void main() {
          #include <clipping_planes_fragment>
          
          // Circular mask
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;
          
          // Soft edge for smooth circles
          float softEdge = 1.0 - smoothstep(0.35, 0.5, dist);
          
          vec3 outgoingLight = vec3( 0.0 );
          
          // Fade out over time with curve
          float op = (0.9 - fract(uTime) * fract(uTime)) * 1.6;
          
          // With normal blending, we can use brighter colors
          vec3 finalColor = diffuse * 0.6; // 60% brightness
          vec4 diffuseColor = vec4( finalColor, op * softEdge );
          
          #include <logdepthbuf_fragment>
          #include <map_particle_fragment>
          #include <color_fragment>
          #include <alphatest_fragment>
          #include <alphahash_fragment>
          
          outgoingLight = diffuseColor.rgb;
          
          #include <opaque_fragment>
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
          #include <fog_fragment>
          #include <premultiplied_alpha_fragment>
        }
      `;

      // Vertex shader - handles particle animation
      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
        #include <common>
        uniform float uTime;
        attribute vec2 delay;
        
        #define NEWTON_ITER 1
        #define HALLEY_ITER 1
        
        vec3 hash13(uint n) {
          n = (n << 13U) ^ n;
          n = n * (n * n * 15731U + 789221U) + 1376312589U;
          uvec3 k = n * uvec3(n, n*16807U, n*48271U);
          return vec3(k & uvec3(0x7fffffffU))/float(0x7fffffff);
        }
        
        float cbrt(float x) {
          float y = sign(x) * uintBitsToFloat(floatBitsToUint(abs(x)) / 3u + 0x2a514067u);
          for(int i = 0; i < NEWTON_ITER; ++i)
            y = (2. * y + x / (y * y)) * .333333333;
          for(int i = 0; i < HALLEY_ITER; ++i) {
            float y3 = y * y * y;
            y *= (y3 + 2. * x) / (2. * y3 + x);
          }
          return y;
        }
        
        vec3 randomPositionInSphere(float u, float v, float w) {
          float theta = u * 2. * PI;
          float phi = acos(2. * v - 1.);
          float r = cbrt(w) * 0.2 + 0.9;
          float sinTheta = sin(theta);
          float cosTheta = cos(theta);
          float sinPhi = sin(phi);
          float cosPhi = cos(phi);
          float x = r * sinPhi * cosTheta;
          float y = r * sinPhi * sinTheta;
          float z = r * cosPhi;
          return vec3(x, y, z);
        }
        `
      );

      shader.vertexShader = shader.vertexShader.replace(
        '#include <project_vertex>',
        `
        vec3 randomPosition = hash13(uint(transformed.x*65526.+transformed.y*65526.+transformed.z*65526.+floor(uTime)));
        vec3 randomOnSphere = randomPositionInSphere(randomPosition.x, randomPosition.y, randomPosition.z);
        transformed.xyz = randomOnSphere;
        
        float t = uTime - delay.x;
        if(t < 0.) {
          t = 0.;
        }
        
        // Easing for expansion
        float d1 = 1. - (1.-t)*(1.-t)*(1.-t);
        
        // Gravity
        float grav = 0.7;
        vec3 gravP = vec3(0., -1., 0.) * (t*t*grav*grav) * 1.2;
        
        vec3 newP = (transformed.xyz * d1 * 80.0) + gravP * 80.0; // Scale up for world space
        transformed.xyz = newP;
        
        #include <project_vertex>
        `
      );

      shader.vertexShader = shader.vertexShader.replace(
        'gl_PointSize = size;',
        'gl_PointSize = size * (1. - delay.x * 10.);'
      );

      shader.uniforms['uTime'] = timeUniform;
    };

    return material;
  }

  update(normalizedDelta = 1.0) {
    // Auto-generate fireworks if enabled
    if (this.config.autoFireworks && Math.random() < this.config.autoChance * normalizedDelta) {
      this.createAutoFirework();
    }

    const removeGroup = [];

    for (let firework of this.fireWorkGroup) {
      const elapsed = firework.clock.getElapsedTime();
      const launchSpeed = this.config.launchSpeed;
      const explosionDelay = firework.explosionDelay;

      const time = elapsed * launchSpeed;

      if (firework.phase === 'launch') {
        // LAUNCH PHASE - animate the gradient moving up the trail
        const launchProgress = Math.min(time / explosionDelay, 1);

        if (launchProgress < 1) {
          // Gentler ease-out: fast start, gradual deceleration to peak
          // Using quadratic ease-out instead of cubic for less extreme slowdown
          const t = launchProgress;
          const eased = 1 - Math.pow(1 - t, 2); // Quadratic instead of cubic

          // Update the shader progress uniform - gradient moves up the trail
          firework.rocket.material.uniforms.uProgress.value = eased;

        } else {
          // Reached target - EXPLODE!
          firework.phase = 'explode';

          // Remove rocket trail
          this.scene.remove(firework.rocket);
          if (firework.rocket.geometry) firework.rocket.geometry.dispose();
          if (firework.rocket.material && firework.rocket.material.dispose) {
            firework.rocket.material.dispose();
          }

          // Create explosion particles
          const explosion = this.createPoints(
            firework.color,
            this.config.particleCount,
            firework.endPoint,
            firework.startPoint,
            firework.isRainbow
          );
          explosion.scale.setScalar(firework.scale);
          explosion.position.copy(firework.endPoint);

          firework.explosion = explosion;
          firework.explosionClock = new THREE.Clock(); // New clock for explosion timing
          this.scene.add(explosion);
        }
      } else if (firework.phase === 'explode') {
        // EXPLOSION PHASE - particles spreading
        const explosionTime = firework.explosionClock.getElapsedTime();
        const bloomTime = Math.min(explosionTime / 1.2, 1); // 1.2 second explosion duration

        firework.explosion.userData.time.value = bloomTime;

        // Fade out and shrink
        firework.explosion.material.size = 20 * (1 - bloomTime) + 5;
        firework.explosion.material.opacity = 1 - bloomTime;

        // Remove when animation is complete
        if (bloomTime >= 1) {
          removeGroup.push(firework);
        }
      }
    }

    // Clean up finished fireworks
    for (let firework of removeGroup) {
      const index = this.fireWorkGroup.indexOf(firework);
      if (index > -1) {
        this.fireWorkGroup.splice(index, 1);

        if (firework.explosion) {
          this.scene.remove(firework.explosion);
          firework.explosion.geometry.dispose();
          firework.explosion.material.dispose();
        }
        if (firework.rocket && firework.rocket.parent) {
          this.scene.remove(firework.rocket);
          if (firework.rocket.geometry) firework.rocket.geometry.dispose();
          if (firework.rocket.material && firework.rocket.material.dispose) {
            firework.rocket.material.dispose();
          }
        }
      }
    }
  }

  // Debug info
  getFireworkCount() {
    return this.fireWorkGroup.length;
  }

  // Clear all fireworks
  clear() {
    for (let firework of this.fireWorkGroup) {
      if (firework.rocket && firework.rocket.parent) {
        this.scene.remove(firework.rocket);
        if (firework.rocket.geometry) firework.rocket.geometry.dispose();
        if (firework.rocket.material) {
          if (firework.rocket.material.dispose) firework.rocket.material.dispose();
        }
      }
      if (firework.explosion && firework.explosion.parent) {
        this.scene.remove(firework.explosion);
        if (firework.explosion.geometry) firework.explosion.geometry.dispose();
        if (firework.explosion.material) firework.explosion.material.dispose();
      }
    }
    this.fireWorkGroup = [];
  }

  // Enable/disable auto fireworks
  setAutoFireworks(enabled) {
    this.config.autoFireworks = enabled;
  }
}