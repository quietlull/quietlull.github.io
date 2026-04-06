// Shared scene configuration — single source of truth for all pages.
// Bloom, lanterns, fireworks, and avoidance are identical everywhere.
// Only water, dock, and scroll camera vary by page preset.

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
      strength: 1.4,
      radius: 0.3,
      threshold: 0.45,
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
      proximityRadius: 10000,
      avoidanceStrength: 0.2,
      knockRadius: 45,
      knockStrength: 40,
      returnSpeed: 0.08,
      boundaryForce: 0.5,
      rotationStrength: 0.005,
      knockCooldown: 0.1,
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
    minZ: 0,
    maxZ: -200,
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

// Page presets — only water, dock, and scroll camera vary.
// Bloom, lanterns, fireworks, and mouse avoidance are always active.
export const PRESETS = {
  full: {     // About page: full scene with water, dock, scroll camera
    water: true,
    dock: true,
    scrollCamera: true,
  },
  standard: { // All other pages: no water/dock, static camera
    water: false,
    dock: false,
    scrollCamera: false,
  },
};
