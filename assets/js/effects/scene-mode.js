const DOCK = /^DockGroup/;
const WATER = /^WaterFace/;
const LANTERN = /^(Rounded)?Lantern/;

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
    else if (LANTERN.test(o.name)) o.visible = true;
  });

  return true;
}

const override = (/[?&]scene=(full|minimal|none)/.exec(location.search) || [])[1];
const pageDefault = document.body.dataset.sceneTier || 'full';
const tier = override || pageDefault;

window.__sceneTier = {
  tier,
  fromOverride: Boolean(override),
  pageDefault,
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

if (tier !== 'none' && tier !== 'embers') {
  let tries = 0;
  const timer = setInterval(() => {
    apply(tier);
    const c = window.__sceneTier.counts();
    const satisfied = tier === 'full'
      ? c.lanterns > 0 && c.dock > 0 && c.water > 0
      : c.lanterns > 0 && c.dock > 0 && c.water > 0
        && c.dockHidden === c.dock && c.waterHidden === c.water;
    if (satisfied || ++tries > 100) clearInterval(timer);
  }, 100);
}
