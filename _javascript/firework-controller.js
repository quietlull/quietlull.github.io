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
    this.maxFireworks = config.maxFireworks ?? 50;

    // Configuration.
    // `??` not `||` throughout: a configured 0 is a real value, and `||` silently discarded it.
    // That bug ran for a long time - `minZ: 0` in three-config.js fell through to the -10000
    // default, so shells spawned anywhere across a 9800-unit depth spread instead of the intended
    // band, which is why the same burst could read 110% of screen height or 7% of it.
    this.config = {
      // Z-depth range
      minZ: config.minZ ?? -10000,
      maxZ: config.maxZ ?? -10500,

      // Launch timing
      launchSpeed: config.launchSpeed ?? 0.4,
      minDelay: config.minDelay ?? 0.1,
      maxDelay: config.maxDelay ?? 0.3,

      // Height limits
      maxHeight: config.maxHeight ?? 10000,
      sceneBottom: config.sceneBottom ?? -100,

      // How far below its centre a burst actually reaches, per unit of scale, as a multiple of
      // explosionSpread: the particle sphere reaches ~1.1 and the shader's gravity term adds
      // ~0.588 by the end of the explosion. Used to keep a burst's bottom clear of the water.
      // DERIVED FROM THE SHADER, not measured - particle positions are computed on the GPU and
      // cannot be read back, so this is a starting constant to confirm by eye.
      burstBottomFactor: config.burstBottomFactor ?? 1.69,

      // Explosion properties
      particleCount: config.particleCount ?? 400,
      particleSize: config.particleSize ?? 20,
      explosionScaleMin: config.explosionScaleMin ?? 5.0,
      explosionScaleMax: config.explosionScaleMax ?? 10.0,
      explosionSpread: config.explosionSpread ?? 80.0,
      explosionDuration: config.explosionDuration ?? 1.2,

      // Particle appearance
      particleBrightness: config.particleBrightness ?? 0.6,

      /* PARTICLE TRAIL: how many ghost copies of each particle are emitted, each one step further
         behind in time. This MULTIPLIES the vertex count - at 10 a 400-particle shell is 4000
         vertices - and every copy runs the full vertex shader. 1 = no trail. */
      particleTrail: config.particleTrail ?? 10,

      // Colors
      rainbowChance: config.rainbowChance ?? 0.5,
    };

    // The auto-launch stream: it has its own timer and its own cap on how many of its shells may
    // be in the air at once. GREETING is the calm welcome that runs while the top of the page is
    // on screen. Whether it is active is decided by the page, not here.
    // A second REWARD stream used to sit beside it, unlocked by the Pyrotechnician achievement and
    // switched on from the old top bar. Rod scrapped every reward (D28), so it was deleted on
    // 2026-08-31 together with its `auto*` config keys. This stays a map of streams because the
    // greeting may not be the last one this scene gets.
    this.emitters = {
      greeting: {
        active: false, timer: 0, next: 0, maxLive: 4,
        delay: 2.5, delayVariation: 1.0, amount: 1, amountVariation: 0,
      },
    };
    Object.assign(this.emitters.greeting, config.greeting);

    for (const emitter of Object.values(this.emitters)) {
      emitter.next = this.getRandomDelay(emitter);
    }

    this._removeGroup = []; // reused each frame (avoid per-frame array allocation)

    this.setupClickHandler();
  }

  getRandomDelay(emitter) {
    const variation = (Math.random() * 2 - 1) * emitter.delayVariation;
    return Math.max(0.5, emitter.delay + variation);
  }

  countLive(source) {
    let live = 0;
    for (const firework of this.fireWorkGroup) {
      if (firework.source === source) live++;
    }
    return live;
  }

  /**
   * Screen point (in normalized device coordinates) -> the world position on a given Z plane that
   * actually appears there, using the camera's own matrices.
   *
   * This replaced frustum trigonometry (`ndcY * halfHeight + camera.y`) that silently assumed the
   * camera looks straight down -Z. The About page pitches the camera 25 degrees at the top of the
   * scroll, where that assumption put the top of the screen at world Y 1281 when the true value
   * was 2455 - so the top of the page was unreachable and clicks landed short. Unprojecting a ray
   * and intersecting the target plane is correct at any rotation, position, fov or aspect, which
   * also made the old `extraHeight` compensation (a hand-tuned curve bolted onto the wrong
   * projection) unnecessary; it was deleted rather than re-tuned.
   */
  screenToWorldAtDepth(ndcX, ndcY, targetZ) {
    const direction = new THREE.Vector3(ndcX, ndcY, 0.5)
      .unproject(this.camera)
      .sub(this.camera.position)
      .normalize();

    const distance = (targetZ - this.camera.position.z) / direction.z;
    return direction.multiplyScalar(distance).add(this.camera.position);
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

  createFireworkFromClick(clientX, clientY, source = 'click') {
    if (this.fireWorkGroup.length >= this.maxFireworks) {
      return;
    }

    // Convert screen coordinates to normalized device coordinates
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;

    // Calculate world position at a random Z depth
    const randomZ = THREE.MathUtils.lerp(this.config.minZ, this.config.maxZ, Math.random());

    // How big this burst will be decides how low it is allowed to sit, so the scale is drawn here
    // rather than inside createFirework.
    const scale = Math.random() * (this.config.explosionScaleMax - this.config.explosionScaleMin)
      + this.config.explosionScaleMin;

    const target = this.screenToWorldAtDepth(x, y, randomZ);

    // A burst must never be half-drowned, so its FLOOR scales with its own size: the particles
    // reach burstBottomFactor * explosionSpread * scale below the centre. Small shells may
    // therefore burst low over the water while big ones are pushed high, with no special case.
    const burstBottom = this.config.explosionSpread * this.config.burstBottomFactor * scale;
    const lowestCentre = this.config.sceneBottom + burstBottom;
    const worldY = Math.min(Math.max(target.y, lowestCentre), this.config.maxHeight);

    const endPoint = new THREE.Vector3(target.x, worldY, randomZ);

    // Start point is BELOW the scene bottom (-100)
    const startPoint = new THREE.Vector3(target.x, this.config.sceneBottom - 200, randomZ);

    // Random delay before explosion
    const explosionDelay = THREE.MathUtils.lerp(
      this.config.minDelay,
      this.config.maxDelay,
      Math.random()
    );

    // Random rainbow or solid color
    const isRainbow = Math.random() < this.config.rainbowChance;

    this.createFirework(startPoint, endPoint, explosionDelay, isRainbow, source, scale);

    // Only shells the visitor actually launched count toward Pyrotechnician. The greeting runs on
    // its own forever, so counting it would unlock the reward while the visitor sits still.
    if (source === 'click') {
      document.dispatchEvent(new Event('achievement:firework'));
    }
  }

  createAutoFirework(source) {
    if (this.fireWorkGroup.length >= this.maxFireworks) {
      return;
    }

    // Random position across the screen, but above scene bottom
    const randomX = (Math.random() * 2 - 1) * 0.8; // Stay within 80% of screen
    const randomY = (Math.random() * 0.5 + 0.3); // Upper/middle portion of screen

    this.createFireworkFromClick(
      (randomX * 0.5 + 0.5) * window.innerWidth,
      (1 - randomY) * window.innerHeight,
      source
    );
  }


  createFirework(startPoint, endPoint, explosionDelay = 0.5, isRainbow = false, source = 'click', scale = 1) {
    // Random color
    const color = new THREE.Color(
      Math.random() * 0.6 + 0.4,
      Math.random() * 0.6 + 0.4,
      Math.random() * 0.6 + 0.4
    );

    // Store data for explosion
    const firework = {
      explosion: null, // Will be created once the launch delay has elapsed
      color: color,
      isRainbow: isRainbow,
      scale: scale,
      startPoint: startPoint.clone(),
      endPoint: endPoint.clone(),
      explosionDelay: explosionDelay,
      clock: new THREE.Clock(),
      phase: 'launch', // 'launch' or 'explode'
      source: source   // 'click' | 'greeting' | 'reward' — drives each emitter's live cap
    };

    this.fireWorkGroup.push(firework);
  }

  /* Uniform point in a shell of radius 0.9-1.1, matching the sphere maths this replaced in the
     vertex shader. That version was fed three hashed values; three Math.random() calls have the
     same distribution, so shells are statistically identical rather than bit-identical. */
  randomDirectionInSphere() {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = Math.cbrt(Math.random()) * 0.2 + 0.9;
    const sinPhi = Math.sin(phi);
    return [radius * sinPhi * Math.cos(theta), radius * sinPhi * Math.sin(theta), radius * Math.cos(phi)];
  }

  buildExplosionGeometry(number, times, isRainbow) {
    const step = 0.005;
    const positionAttribute = new THREE.Float32BufferAttribute(number * 3 * times, 3);
    const delayAttribute = new THREE.Float32BufferAttribute(number * 2 * times, 2);
    const vertexColorAttribute = isRainbow
      ? new THREE.Float32BufferAttribute(number * 4 * times, 4)
      : null;

    for (let i = 0; i < number; i++) {
      if (vertexColorAttribute) {
        const r = Math.random();
        const g = Math.random();
        const b = Math.random();
        for (let j = 0; j < times; j++) {
          vertexColorAttribute.setXYZW(i * times + j, r, g, b, 1);
        }
      }

      // position IS the direction - the shader uses it as-is
      const [x, y, z] = this.randomDirectionInSphere();

      for (let j = 0; j < times; j++) {
        delayAttribute.setXY(i * times + j, j * step, 0);
        positionAttribute.setXYZ(i * times + j, x, y, z);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', positionAttribute);
    geometry.setAttribute('delay', delayAttribute);
    if (vertexColorAttribute) {
      geometry.setAttribute('color', vertexColorAttribute);
    }
    return geometry;
  }

  createPoints(color, number, endPoint, startPoint, isRainbow) {
    const times = this.config.particleTrail;
    const geometry = this.buildExplosionGeometry(number, times, isRainbow);

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
      size: this.config.particleSize,
      color: isRainbow ? new THREE.Color(1, 1, 1) : color,
      transparent: true,
      alphaTest: 0.05,
      sizeAttenuation: true,
      depthTest: true,
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
          vec3 finalColor = diffuse * ${this.config.particleBrightness.toFixed(2)};
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
        `
      );

      shader.vertexShader = shader.vertexShader.replace(
        '#include <project_vertex>',
        `
        /* transformed.xyz IS the baked direction, written by randomDirectionInSphere() on the CPU.
           Until 2026-08-22 this was re-derived here every frame from a hash + acos + 2 sin + 2 cos
           + cbrt (1 Newton + 1 Halley iteration), once per trail copy - so ten times per particle,
           sixty times a second, for a value that is constant across the shell's whole life. */
        float t = uTime - delay.x;
        if(t < 0.) {
          t = 0.;
        }
        
        // Easing for expansion
        float d1 = 1. - (1.-t)*(1.-t)*(1.-t);
        
        // Gravity
        float grav = 0.7;
        vec3 gravP = vec3(0., -1., 0.) * (t*t*grav*grav) * 1.2;
        
        vec3 newP = (transformed.xyz * d1 * ${this.config.explosionSpread.toFixed(1)}) + gravP * ${this.config.explosionSpread.toFixed(1)};
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
    // Auto-generate fireworks — every active emitter runs its own delay-based timer
    for (const source in this.emitters) {
      const emitter = this.emitters[source];
      if (!emitter.active) continue;

      emitter.timer += 0.016 * normalizedDelta; // Increment timer (60fps baseline)
      if (emitter.timer < emitter.next) continue;

      // Reset timer and get new random delay
      emitter.timer = 0;
      emitter.next = this.getRandomDelay(emitter);

      // Hold the burst if this stream already has its share of the sky
      if (this.countLive(source) >= emitter.maxLive) continue;

      // Fire burst of fireworks
      const variation = Math.floor(Math.random() * emitter.amountVariation * 2) - emitter.amountVariation;
      const amount = Math.max(1, emitter.amount + variation);

      for (let i = 0; i < amount; i++) {
        this.createAutoFirework(source);
      }
    }

    const removeGroup = this._removeGroup;
    removeGroup.length = 0;

    for (let firework of this.fireWorkGroup) {
      const elapsed = firework.clock.getElapsedTime();
      const launchSpeed = this.config.launchSpeed;
      const explosionDelay = firework.explosionDelay;

      const time = elapsed * launchSpeed;

      if (firework.phase === 'launch') {
        /* LAUNCH is now purely a delay - nothing is drawn during it. The rocket trail that used to
           animate here was removed 2026-08-22 (Rod: "they cannot be seen anyways"), which also took
           a draw call and a ShaderMaterial per shell with it. The delay stays because it is what
           staggers the explosions instead of letting a burst detonate all at once. */
        if (time < explosionDelay) continue;
        firework.phase = 'explode';

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
        firework.explosionClock = new THREE.Clock();
        this.scene.add(explosion);
      } else if (firework.phase === 'explode') {
        // EXPLOSION PHASE - particles spreading
        const explosionTime = firework.explosionClock.getElapsedTime();
        const bloomTime = Math.min(explosionTime / this.config.explosionDuration, 1);

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
      if (firework.explosion && firework.explosion.parent) {
        this.scene.remove(firework.explosion);
        if (firework.explosion.geometry) firework.explosion.geometry.dispose();
        if (firework.explosion.material) firework.explosion.material.dispose();
      }
    }
    this.fireWorkGroup = [];
  }

  // Enable/disable the top-of-page greeting stream
  setGreeting(enabled) {
    this.emitters.greeting.active = enabled;
  }
}