const DOCK = /^DockGroup/;
const WATER = /^WaterFace/;
const LANTERN = /^(Rounded)?Lantern/;

function setWater(mesh, wanted) {
  mesh.visible = wanted;
  if (mesh.material) mesh.material.visible = wanted;
}

function apply(tier) {
  const scene = window.scene;
  if (!scene) return;

  const wantDockAndWater = tier === 'full';

  scene.traverse((o) => {
    if (!o.name) return;
    if (DOCK.test(o.name)) o.visible = wantDockAndWater;
    else if (WATER.test(o.name)) setWater(o, wantDockAndWater);
    else if (LANTERN.test(o.name)) o.visible = true;
  });
}

function counts() {
  const c = { lanterns: 0, dock: 0, dockHidden: 0, water: 0, waterHidden: 0 };
  window.scene?.traverse((o) => {
    if (!o.name) return;
    if (LANTERN.test(o.name)) c.lanterns++;
    else if (DOCK.test(o.name)) { c.dock++; if (!o.visible) c.dockHidden++; }
    else if (WATER.test(o.name)) { c.water++; if (!o.material?.visible) c.waterHidden++; }
  });
  return c;
}

const override = (/[?&]scene=(full|minimal|none)/.exec(location.search) || [])[1];
const tier = override || document.body.dataset.sceneTier || 'full';

if (tier !== 'none' && tier !== 'embers') {
  let tries = 0;
  const timer = setInterval(() => {
    apply(tier);
    const c = counts();
    const found = c.lanterns > 0 && c.dock > 0 && c.water > 0;
    const satisfied = found && (tier === 'full' || (c.dockHidden === c.dock && c.waterHidden === c.water));
    if (satisfied || ++tries > 100) clearInterval(timer);
  }, 100);
}
