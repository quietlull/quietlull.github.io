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
      // Retuned 2026-08-21 (Rod) for the Dual Kawase pass. No threshold knob any more: the bright
      // pass is gone, so the whole frame blurs and is added back (D23).
      // At these numbers the composite adds 0.7 * (0.88 + 0.74) = 1.13x the frame back as glow,
      // against 0.45 * 1.8 = 0.81x before, so roughly 1.4x more light than the old settings.
      // Radius is NOT a blur width - it rebalances the tight band against the wide one.
      strength: 0.7,
      radius: 0.15,
      // Fraction of the frame the blur chain runs at. Owned by the pass, applied in setSize.
      scale: 0.5,
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
      // Lantern/firefly avoidance — reworked 2026-06-15 (Sarah): layered direct-displacement field.
      // Layer A = whole-screen parting (proximityRadius/avoidanceStrength), Layer B = extra local
      // push (localRadius/localStrength), knock = impulse (knockRadius/knockStrength). Values tuned
      // in redesign-lab/lantern-lab.html on lab-scale props -> radii likely need a re-tune per scene.
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

    // Depth band, retuned 2026-08-16 once `??` stopped the old `||` from eating `minZ: 0`.
    // Measured on the About scene: real scene content ends at z -1130 and the water plane reaches
    // z -4500, so this band sits behind everything and still over the water. Kept NARROW on
    // purpose - the old effective range was -10000..-200, and that 9800-unit spread is what made
    // shells inconsistent, reading 110% of screen height at the near end and 7% at the far end.
    // At this depth a burst spans roughly 15-44% of screen height (fov 55, camera z 500).
    minZ: -3000,
    maxZ: -4500,

    // The permanent top-of-page GREETING (Rod 2026-08-16): calm, a few shells in the air at once.
    // It has no off switch by design — the topbar toggle belongs to the earned reward stream,
    // which stacks on top of this. maxLive caps only the greeting's own shells, so the reward is
    // free to fill the rest of the sky. Note maxLive is a CEILING, not a target: a shell lives
    // about 1.7s, so the delay is what actually decides how many are up at once.
    greeting: {
      delay: 0.85,            // Seconds between shells (3x the first pass, Rod judged it by eye)
      delayVariation: 0.35,   // Random +/- variation in seconds
      amount: 1,              // Shells per burst
      maxLive: 4,             // Greeting shells allowed on screen at once
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
