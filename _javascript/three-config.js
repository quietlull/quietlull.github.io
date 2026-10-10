export const CONFIG = {
  debugEnabled: false,

  camera: {
    startRotationX: 25 * Math.PI / 180,
    endRotationX: 0,
    startPositionY: 500,
    endPositionY: 100,
    positionZ: 500,
  },

  lanterns: {
    bloom: {
      strength: 0.7,
      radius: 0.15,
      scale: 0.25,
    },

    paper: {
      sheet: 'paper-washi',
      tile: 1,
      sheet2: 'paper-coldpress',
      tile2: 4,
      blend: 2,
      mix: 0.5,
      amount: 1,
      bleed: 0.5,
      displace: 0.0075,
      tooth: 0.05,
      boilHz: 3.25,
    },
    float: {
      speed: 1,
      amount: 50,
    },
    glow: {
      color: 0xffaa66,
      intensity: 2,
    },
    avoidance: {
      proximityRadius: 1000,
      avoidanceStrength: 2,
      knockRadius: 45,
      knockStrength: 40,
      returnSpeed: 0.05,
      boundaryForce: 0.5,
      rotationStrength: 0.06,
      knockCooldown: 0.1,
      localRadius: 90,
      localStrength: 50,
    },
    shader: {
      gradientStart: 1.0,
      gradientEnd: 0.35,
      gradientCenter: 1,
      gradientRange: 1,
      flickerSpeed: 0.5,
      flickerAmount: 0.25,
      flickerColorShift: 0.5,
    },
  },

  fireworks: {
    maxFireworks: 50,

    minZ: -3000,
    maxZ: -4500,

    greeting: {
      delay: 0.85,
      delayVariation: 0.35,
      amount: 1,
      maxLive: 4,
    },
  },

  water: {
    reflection: {
      reflectionIntensity: 1,
      reflectionTint: 0xffffff,
    },
    waves: {
      waveStrength: 0.01,
      waveSpeed: 0.1,
      waveScale: 1,
      waveType: 0,
    },
  },
};
