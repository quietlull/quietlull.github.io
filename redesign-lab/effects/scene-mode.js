/* WORKBENCH COPY, NOT THE SHIPPING FILE.
   The shipping version of this module is:
       assets/js/effects/scene-mode.js
   It has ALREADY DRIFTED from that file, so they are two different programs now.

   READ THIS BEFORE COPYING ANYTHING OUT OF HERE. The live tree is authoritative: it has
   received fixes this copy never saw, and a performance pass edits it independently. Porting
   from the lab to the site has already shipped stale code once, which is why this header
   exists rather than the file simply being deleted.

   IT IS KEPT ON PURPOSE, not by neglect. Checked 2026-09-02: every file under
   redesign-lab/scene/ and redesign-lab/effects/ is imported by something here. This one is
   reachable from the lab pages, and deleting it would break them. The scene files serve the
   character-scene track; the effects files serve the six final-*.html reference pages and
   the tuners Rod works from.

   Fixing a bug? Fix it in the shipping file. Change this one only when the LAB PAGE needs it. */
/* Scene tiers - lab only.
   ROD, P72 (2026-08-22): "for projects, portal, and ramblings please do a scene with only lanterns,
   the fireflies, and post processes this will become our minimal so about and landing have full,
   anything that wants the scene can keep minimal and none will be the blobs."

   THE TIERS, as he defined them:
     full     lanterns + fireflies + post-processing + DOCK + WATER   ->  landing, about
     minimal  lanterns + fireflies + post-processing, nothing else    ->  projects, portal, ramblings
   The earlier `bare` and `blobs` modes are GONE. He scrapped blobs by name, and `bare` (embers
   only) was my own comparison rung, not one of his tiers - keeping it would be keeping a mode
   nothing is ever going to use.

   WHAT IS ACTUALLY RUNNING, measured rather than assumed: every page that carries a scene loads
   `three-background-scene.min.js`, the FULL one. Nothing anywhere loads
   `three-background-minimal.min.js`, and that bundle is 35 spheres with NO lanterns - its own
   comment says the edge lanterns "were removed and only this note survived them". So "minimal" as
   Rod now defines it does not exist in the codebase at all; this builds it.

   HOW, WITHOUT A SECOND THREE.JS. Adding FBX lanterns to the minimal bundle would need FBXLoader
   from a CDN, which drags in a second copy of three, and meshes built by one copy do not reliably
   work with the other. Instead the FULL scene - which already has the real lantern models, the real
   shader and the real post chain - has its dock and water hidden. Same assets, no extra download,
   no version skew.

   THIS IS A DEMO, NOT THE PORT. At port time the honest change is to add the lantern load to
   `three-background-minimal.js` so the minimal bundle stops shipping 525 KB to draw 35 spheres.
   Hiding is how the tier gets JUDGED cheaply. Said out loud so nobody finds a `visible = false` in
   production and wonders what it is doing.

   THE POST PAGE IS DELIBERATELY NOT IN EITHER LIST. It loads no three.js at all - a deliberate
   845 KB saving (Rod, 2026-08-21) - and "none will be the blobs" reverses his earlier "hana colour
   blobs for post pages", so which tier it should get is an open question, not something to guess.
   It is left exactly as it is until he says.
*/

const TIERS = {
  '/redesign-lab/final-landing.html': 'full',
  '/redesign-lab/final-about.html': 'full',
  '/redesign-lab/final-projects.html': 'minimal',
  '/redesign-lab/final-portal.html': 'minimal',
  '/redesign-lab/final-ramblings.html': 'minimal',
};

/* Names verified by traversing the live scene graph, not guessed from the FBX:
     Group:DockGroup1 · Mesh:WaterFace · Group:Lanterns1 + Mesh:Lantern* / Mesh:RoundedLantern*
   The FIREFLIES are the ~25 unnamed meshes the scene spawns for ember drift. They are deliberately
   NOT matched here - nothing touches them, so they survive in both tiers, which is what "lanterns,
   the fireflies, and post processes" asks for. Post-processing is the composer and is never
   touched either. */
const DOCK = /^DockGroup/;
const WATER = /^WaterFace/;
const LANTERN = /^(Rounded)?Lantern/;

/* Water will NOT stay hidden via `visible`. three's Reflector rewrites that flag every frame as
   part of its own render pass - it hides the mesh, renders the reflection, restores it - so
   anything written from outside is gone by the next tick, silently. Measured: dock and lanterns
   obeyed immediately and only water refused. `material.visible` sits outside that cycle and holds. */
function setWater(mesh, wanted) {
  mesh.visible = wanted;
  if (mesh.material) mesh.material.visible = wanted;
}

function apply(tier) {
  const scene = window.scene;
  if (!scene) return false;

  const wantDockAndWater = tier === 'full';

  scene.traverse((o) => {
    if (!o.name) return;
    if (DOCK.test(o.name)) o.visible = wantDockAndWater;
    else if (WATER.test(o.name)) setWater(o, wantDockAndWater);
    else if (LANTERN.test(o.name)) o.visible = true;   // lanterns are in BOTH tiers now
  });

  return true;
}

/* `?scene=full|minimal` overrides the page's tier, so the two can be compared on the same page
   without editing anything. The page's own tier is the default. */
const override = (/[?&]scene=(full|minimal)/.exec(location.search) || [])[1];
const tier = override || TIERS[location.pathname] || 'full';

window.__sceneTier = {
  tier,
  fromOverride: Boolean(override),
  pageDefault: TIERS[location.pathname] || '(not listed - defaults to full)',
  set(next) { location.search = '?scene=' + next; },
  counts() {
    const c = { lanterns: 0, lanternsHidden: 0, dock: 0, dockHidden: 0, water: 0, waterHidden: 0, unnamedMeshes: 0 };
    window.scene?.traverse((o) => {
      if (!o.name) { if (o.isMesh) c.unnamedMeshes++; return; }
      if (LANTERN.test(o.name)) { c.lanterns++; if (!o.visible) c.lanternsHidden++; }
      else if (DOCK.test(o.name)) { c.dock++; if (!o.visible) c.dockHidden++; }
      else if (WATER.test(o.name)) { c.water++; if (!o.material?.visible) c.waterHidden++; }
    });
    return c;
  },
};

/* The bundle is deferred and the FBX lands later still, so one pass at load would find an empty
   graph. Re-apply until the lanterns exist, then stop - and cap the attempts so a page with no
   scene (the post page) does not leave a timer running. */
let tries = 0;
const timer = setInterval(() => {
  apply(tier);
  const c = window.__sceneTier.counts();
  /* The stop condition has to be the SATISFIED STATE, not "the lanterns exist". Lanterns and dock
     are two separate FBX loads and the lanterns win the race, so waiting on lanterns alone stopped
     the loop before `DockGroup1` was in the graph - the dock then arrived visible and nothing ever
     hid it. Measured on the minimal pages: 41 lanterns found, dockHidden 0, waterHidden 0. */
  const satisfied = tier === 'full'
    ? c.lanterns > 0 && c.dock > 0 && c.water > 0
    : c.lanterns > 0 && c.dock > 0 && c.water > 0
      && c.dockHidden === c.dock && c.waterHidden === c.water;
  if (satisfied || ++tries > 100) clearInterval(timer);
}, 100);
