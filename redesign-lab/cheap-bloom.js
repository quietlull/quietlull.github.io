/* MOVED, 2026-08-21. Nothing loads this file any more.

   The Dual Kawase pass now lives in the real bundle, at:

       _javascript/shader/kawaseBloom.js

   and three-shared.js builds it directly, so scene-tuner.html gets Kawase from
   /assets/js/dist/three-background-scene.min.js with no runtime swap. There is no second copy of
   the pass to drift out of sync any more (see docs/TRAPS.md on the wrong-copy hazard).

   What changed in the move: fixed at TWO levels (no setLevels, no generated-for-N composite), the
   bright pass and the threshold knob deleted outright, and every kernel weight named as a GLSL
   const instead of sitting in the arithmetic. The look is unchanged - same 5-tap down, same 8-tap
   tent up, same Unreal per-mip composite.

   The pre-move version of this file is not in git (redesign-lab/ is gitignored). If you need it,
   say so before this file is deleted. */
