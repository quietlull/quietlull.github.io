# HANDOFF — character dissolve / cherry-blossom petals (2026-06-15)

For the next agent picking up COLD. The work is a long iterative build of a **dissolving skinned character that
sheds cherry-blossom petals**, for the About-page dock scene (eventually Rod's own Mixamo character — see
`character-spec.md` for the ghost-spirit design intent + the Shinsekai-Yori palette).

**The file:** `redesign-lab/character-test.html` (standalone, gitignored). Served at
`http://localhost:4000/redesign-lab/character-test.html` (Jekyll preview: `preview_start` name `jekyll`, port 4000).

---

## ⛔ READ FIRST — how Rod works + the hard limits (these caused most of the pain)

1. **YOU CANNOT SEE THE PREVIEW.** The preview-tool browser runs headless/backgrounded → `requestAnimationFrame`
   is paused → `preview_screenshot` HANGS (30s timeout) and the animation never advances for you. You verify
   **mechanically only**: navigate via `preview_eval` `location.assign(url)`; check `window.__s` exists; call
   `window.__s.composer.render()` inside a try (no-throw ⇒ shaders compiled); `preview_console_logs` level `warn`
   (catches GL shader-compile errors); and numeric `preview_eval` probes. **Rod looks in HIS browser and
   describes it / pastes screenshots** — when he pastes an image you CAN see it. NEVER claim it looks right.
2. **PROVENANCE IS LAW** (`memory/project_code_provenance.md`). No free-handed or hallucinated code; every element
   from a REAL source (Shadertoy/CodePen/repo/reference), tiered True/Remixed/Slop. If no source, ASK.
   **I got caught HALLUCINATING** — I described Shadertoy shaders I never read. Do NOT describe sources you
   haven't actually fetched/read. The dissolve base is real: Codrops "Emissive Dissolve Effect" by Jatin Chopra,
   cloned to `redesign-lab/_ref-emissive-dissolve/`. Faithful 1-for-1 port = `dissolve-ref.html` (procedural
   meshes; Rod called it "perfect and beautiful"). `character-test.html` is the skinned remix of it.
3. **Rod is blunt and correct.** When he says it's wrong, it's wrong — debug, don't defend. "Better isn't a
   metric" — don't tune blindly; find real references, isolate variables, understand before implementing.
4. **Analyze → plan → ASK → implement** for non-trivial changes. He hates sweeping blind changes. When he wants
   you to just build, he says "/goal ...".
5. He pastes verified snippets; build from THOSE, not paraphrases.

---

## CURRENT ARCHITECTURE (what's in character-test.html right now — understand before changing)

- **Model:** `Soldier.glb` (jsdelivr `gh/mrdoob/three.js@r161/...`). Mixamo-style CLEAN rig. Loaded once, scaled
  to ~5 units (`REF`), centered at (0,1,0). **DO NOT use RobotExpressive** — its rig has a ~160× scale + degenerate
  weights that make CPU skinning return NaN and only 298 verts. Use Soldier/Xbot or Rod's eventual Mixamo char.
- **Body:** `MeshBasicMaterial` (flat gray, HDRI stripped for visibility) + dissolve injected via `onBeforeCompile`
  over `#include <dithering_fragment>`: `noise = snoise((position-uCenter)*uNoisePre * uFreq)*uAmp`; discard
  `noise < uProgress`; glow edge in `[uProgress, uProgress+uEdge]`. GPU auto-skins (SkinnedMesh + MeshBasicMaterial).
- **Particles = GPU-SKINNED points, one per body vertex** (this was the hard-won fix — see lessons). The particle
  vertex shader runs `SKIN_GLSL` (three's exact skinning: boneTexture + skinIndex/skinWeight + bindMatrix), so each
  petal sits EXACTLY on its body vertex. The Points object is a CHILD of the SkinnedMesh (so `modelMatrix` matches).
  Must `re.render()` once after load so `skeleton.boneTexture` exists before wiring the uniform.
- **PROGRESS-INDEPENDENT MOTION (the latest fix, Rod's core ask):** each petal's whole life is driven by
  **`age = uProgress - vNoise`** (how far the dissolve front has passed THIS vertex), computed in the shader:
  - `age < 0` → not spawned (discard). `age in [0, uLifetime]` → alive. `age > uLifetime` → dead (discard).
  - drift = `aVel * max(age,0) * uDrift` (outward, born at the dissolving edge) + **time-based sway**
    (`sin(position*.. + uTime)*uSway`, so they flutter even when progress is PAUSED — the independence Rod wanted).
  - fade-in then fade-out by `age/uLifetime`; tumble = flip-squash gated by `uFlipOn` (the verified canvas trick:
    scale gl_PointCoord by `0.6+|cos(flip)|/3` × `0.8+|sin(flip)|/5`); slow in-plane spin.
  - **NO per-frame CPU particle loop** — it's all in the shader; CPU only updates `uTime` + the mixer. Cheap.
  - Per-particle STATIC attributes set once: `aVel` (outward+up dir), `aFlip`/`aFlipSpeed`, `aSeed`, `aOpacity`.
- **Petal mask:** `makePetalTexture()` draws a sakura single-petal silhouette (notched tip) to a canvas; white fill,
  `uColor` tints it (sakura pink), alpha = the petal shape. (Form referenced from Shadertoy sakura shaders; it's a
  geometric construction — Rod accepted the look, may want it swapped for a sourced texture later.)
- **GUI (Tweakpane):** Dissolve {Progress, Auto, Edge, Frequency, Amplitude} · Petals {Lifetime(age), Drift, Sway,
  Tumble 0/1, Size, Color, Brightness}. Bloom is selective-ish (threshold 0.85 so only the bright edge/petals glow).
- `window.__s = { U, P, skinned, scene, cam, composer, pmat:()=>pmat }`.

**Rod's last verdict (the version that's live now):** "looks more correct" — the progress-jitter/reset is fixed.

---

## STATUS UPDATE (2026-06-15) — items 1 & 2 DONE (the "/goal")

`character-test.html` was refactored into a **reusable swappable component** and VERIFIED at runtime:
- `buildCharacter(gltf, {position, petals})` → `{ root, mixer, update(dt), setAnimation(name), setPetalCount(n),
  setPosition(x,y,z), dispose(), anims, animNames, pmat() }`. Self-contained (own body mat + particles + mixer);
  to merge into the background: load a GLTF, `scene.add(root)`, call `update(dt)` each frame. `window.__loadModel`
  + `MODELS` registry (Soldier, Xbot). `window.__s = { U, P, character, ... }`.
- **#1 petal density DONE**: particles built from a SAMPLED SUBSET of vertices (`P.petals`, default 1500, GUI
  100–8000, live rebuild). Was all 7325.
- **#2 model/anim/position DONE + verified**: Soldier↔Xbot swap works end-to-end (old disposed, new rebuilt,
  shaders recompile, 0 errors); animation dropdown repopulates per model (crossfade switch); `setPosition` +
  auto-scale-to-REF + center. Add a model = add a `MODELS` entry (any clean Mixamo rig; Rod's char drops in).

## STILL PENDING — Rod's requests (DO THESE; ask/verify per the rules above)
3. **FLOW FIELD SHOULD TRACK THE CURSOR.** Rod: "is the flow field now unavailable? I wanted it to track with the
   cursor." The old sine "flow field" was removed when we went age-based; the current sway is time-only. RE-ADD a
   cursor-driven flow: add a `uMouse` uniform (cursor → world point, or a screen-space direction via raycast/
   unproject) and bias the petal drift/sway toward/around it so the petals stream with the cursor. (This is backlog
   B1a "mouse flow" — finally wire it here.)
4. **CLICK-CENTERED DISSOLVE (raycast).** Rod: "the dissolve to come from the point of the click on the model."
   Raycast the click → world hit point → `uClickPoint` uniform. Bias the dissolve THRESHOLD by distance from it so
   it dissolves outward from the contact point. Needs the SKINNED WORLD position per fragment: add `varying vWorldPos`
   in the BODY vertex (world of `transformed` after skinning) and bias `effectiveProgress = uProgress +
   clickStrength*(1 - clamp(dist(vWorldPos,uClickPoint)/radius,0,1))` in the body fragment; mirror the same bias into
   the particle `age` so petals spawn from the click region. (This is backlog B1c.) Reuse the lantern-controller
   raycast pattern conceptually; here just raycast the soldier mesh.

Also note the eventual goal (character-spec.md): this becomes Rod's **Mixamo character** (he sends the FBX) as a
ghostly white spirit at the **dock in the About scene** (`three-background-scene.js`), cross-fading poses.

---

## LESSONS (landmines already hit — do not repeat)

- **Skinned-mesh particles MUST be GPU-skinned** (three's skinning in the particle shader). CPU `applyBoneTransform`
  DIVERGES for GLTF rigs (gave NaN / spread blobs). The body uses GPU skinning; match it exactly.
- **RobotExpressive = booby-trapped rig** (160× scale, NaN, 298 verts). Use Soldier/Xbot/Mixamo.
- **The dissolve-band visibility gate is what caused the "petals reset every frame"** — decoupling to
  `age = progress - noise` fixed it. Don't reintroduce live-band gating for particle visibility.
- **CodePen blocks WebFetch (403).** GitHub raw + jsdelivr work. Shadertoy GLSL is hard to fetch — don't pretend
  you read it.
- Backlog for all this: `redesign-lab/feature-backlog.md` (B1, B1a mouse-flow, B1b petals, B1c click-dissolve,
  B1-LESSON gpu-skin). Design intent + provenance: `character-spec.md`. Memory index auto-loads `MEMORY.md`.

## VERIFY-LOOP RECIPE (since you can't screenshot)
`preview_start jekyll` → `preview_eval location.assign('http://localhost:4000/redesign-lab/character-test.html')`
→ wait, re-`preview_eval` to confirm `window.__s` set + `composer.render()` no-throw + numeric probes →
`preview_console_logs level:warn` (zero = shaders OK) → hand to Rod for the visual call.
