import * as THREE from 'three';

export class FireworkController {
  constructor(scene, camera, config = {}) {
    this.scene = scene;
    this.camera = camera;
    this.fireWorkGroup = [];
    this.maxFireworks = config.maxFireworks ?? 50;

    this.config = {
      minZ: config.minZ ?? -10000,
      maxZ: config.maxZ ?? -10500,

      launchSpeed: config.launchSpeed ?? 0.4,
      minDelay: config.minDelay ?? 0.1,
      maxDelay: config.maxDelay ?? 0.3,

      maxHeight: config.maxHeight ?? 10000,
      sceneBottom: config.sceneBottom ?? -100,

      burstBottomFactor: config.burstBottomFactor ?? 1.69,

      particleCount: config.particleCount ?? 400,
      particleSize: config.particleSize ?? 20,
      explosionScaleMin: config.explosionScaleMin ?? 5.0,
      explosionScaleMax: config.explosionScaleMax ?? 10.0,
      explosionSpread: config.explosionSpread ?? 80.0,
      explosionDuration: config.explosionDuration ?? 1.2,

      particleBrightness: config.particleBrightness ?? 0.6,

      particleTrail: config.particleTrail ?? 10,

      rainbowChance: config.rainbowChance ?? 0.5,
    };

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

    this._removeGroup = [];

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

  screenToWorldAtDepth(ndcX, ndcY, targetZ) {
    const direction = new THREE.Vector3(ndcX, ndcY, 0.5)
      .unproject(this.camera)
      .sub(this.camera.position)
      .normalize();

    const distance = (targetZ - this.camera.position.z) / direction.z;
    return direction.multiplyScalar(distance).add(this.camera.position);
  }

  setupClickHandler() {
    window.addEventListener('click', (event) => {
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

    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;

    const randomZ = THREE.MathUtils.lerp(this.config.minZ, this.config.maxZ, Math.random());

    const scale = Math.random() * (this.config.explosionScaleMax - this.config.explosionScaleMin)
      + this.config.explosionScaleMin;

    const target = this.screenToWorldAtDepth(x, y, randomZ);

    const burstBottom = this.config.explosionSpread * this.config.burstBottomFactor * scale;
    const lowestCentre = this.config.sceneBottom + burstBottom;
    const worldY = Math.min(Math.max(target.y, lowestCentre), this.config.maxHeight);

    const endPoint = new THREE.Vector3(target.x, worldY, randomZ);

    const startPoint = new THREE.Vector3(target.x, this.config.sceneBottom - 200, randomZ);

    const explosionDelay = THREE.MathUtils.lerp(
      this.config.minDelay,
      this.config.maxDelay,
      Math.random()
    );

    const isRainbow = Math.random() < this.config.rainbowChance;

    this.createFirework(startPoint, endPoint, explosionDelay, isRainbow, source, scale);

    if (source === 'click') {
      document.dispatchEvent(new Event('achievement:firework'));
    }
  }

  createAutoFirework(source) {
    if (this.fireWorkGroup.length >= this.maxFireworks) {
      return;
    }

    const randomX = (Math.random() * 2 - 1) * 0.8;
    const randomY = (Math.random() * 0.5 + 0.3);

    this.createFireworkFromClick(
      (randomX * 0.5 + 0.5) * window.innerWidth,
      (1 - randomY) * window.innerHeight,
      source
    );
  }


  createFirework(startPoint, endPoint, explosionDelay = 0.5, isRainbow = false, source = 'click', scale = 1) {
    const color = new THREE.Color(
      Math.random() * 0.6 + 0.4,
      Math.random() * 0.6 + 0.4,
      Math.random() * 0.6 + 0.4
    );

    const firework = {
      explosion: null,
      color: color,
      isRainbow: isRainbow,
      scale: scale,
      startPoint: startPoint.clone(),
      endPoint: endPoint.clone(),
      explosionDelay: explosionDelay,
      clock: new THREE.Clock(),
      phase: 'launch',
      source: source
    };

    this.fireWorkGroup.push(firework);
  }

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
      blending: THREE.NormalBlending
    });

    material.onBeforeCompile = (shader) => {
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
    for (const source in this.emitters) {
      const emitter = this.emitters[source];
      if (!emitter.active) continue;

      emitter.timer += 0.016 * normalizedDelta;
      if (emitter.timer < emitter.next) continue;

      emitter.timer = 0;
      emitter.next = this.getRandomDelay(emitter);

      if (this.countLive(source) >= emitter.maxLive) continue;

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
        const explosionTime = firework.explosionClock.getElapsedTime();
        const bloomTime = Math.min(explosionTime / this.config.explosionDuration, 1);

        firework.explosion.userData.time.value = bloomTime;

        firework.explosion.material.size = this.config.particleSize * (1 - bloomTime) + 5;

        if (bloomTime >= 1) {
          removeGroup.push(firework);
        }
      }
    }

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

  getFireworkCount() {
    return this.fireWorkGroup.length;
  }

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

  setGreeting(enabled) {
    this.emitters.greeting.active = enabled;
  }
}