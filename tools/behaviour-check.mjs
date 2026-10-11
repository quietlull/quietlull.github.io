// Does everything that moves or reacts still do so? Drive it with a real mouse and keyboard and
// write down what happened.
//
//   node tools/behaviour-check.mjs before.json            (reads ./_site, takes about 3 minutes)
//   node tools/behaviour-check.mjs before-reduced.json reduced
//   ... make the change, rebuild ...
//   node tools/behaviour-check.mjs after.json
//   cmp before.json after.json                            (no output means nothing changed)
//
// The page fingerprint (tools/page-fingerprint.mjs) sees where things sit. It cannot see a card
// that stopped tilting. This can: it uses real pointer and key input over the DevTools Protocol,
// never an in-page dispatchEvent, which only proves a handler is attached.
//
// WHAT IT DRIVES, page by page:
//   /tech-art/             line boil (logo, hero, clock), drift at rest, magnet pull and release,
//                          border break on hover, cursor glow, card tilt, glow, dwell ring, flip, hover
//                          video, firework reach, the scene's dock and water
//   /tech-art/projects/    search box, filter pills, clear button, ?search= in the address, card
//                          drift and magnet, the ?scene= overrides
//   /game-design/blogs/    search on the list layout
//   /tech-art/about/       achievement wall: hover panel, tilt, press, orbit, rim glow, reload
//   /                      portal windows: placement, drift, drag, close, restore, lean, resize
//   a post                 cursor glow; over the comments frame: the glow follows while moving and
//                          after a pause, and a click straight after moving reaches the comments
//                          (needs the network: giscus loads from giscus.app, and the output says
//                          whether it did)
//   /404.html              the embers scene tier
//
// Every value is a yes/no or a rounded number, so two runs of unchanged code give the same file
// byte for byte. Capture twice before you start; if those two differ, the difference is noise in
// the check and not your change. Script errors on each page are part of the output.
//
// With `reduced` it emulates "prefers reduced motion": nothing should drift, pull, tilt or flip,
// while search and line boil keep working.
//
// Written by the js-raw simplification agent (docs/simplify/js-raw.md), which ran it before and
// after every batch of its 21 commits.
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch, sleep } from './real-browser.mjs';
import { serve } from './static-server.mjs';

const OUT = process.argv[2];
if (!OUT) {
  console.log('usage: behaviour-check.mjs <out.json> [reduced]');
  process.exit(2);
}
const REDUCED = process.argv[3] === 'reduced';
const site = await serve(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '_site'));
const page = await launch(0, 1440, 900);
const J = JSON.stringify;
const ev = (s) => page.evaluate(s);
const result = { mode: REDUCED ? 'reduced-motion' : 'normal' };

if (REDUCED) {
  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
}

let cur = { x: 5, y: 5 };
const to = async (x, y, steps = 8) => {
  await page.moveTo(x, y, steps, cur.x, cur.y);
  cur = { x, y };
};
const mouse = (type, x, y, extra = {}) => page.send('Input.dispatchMouseEvent', { type, x, y, ...extra });
const click = async (x, y) => {
  await to(x, y, 4);
  await mouse('mousePressed', x, y, { button: 'left', clickCount: 1 });
  await sleep(40);
  await mouse('mouseReleased', x, y, { button: 'left', clickCount: 1 });
};
const key = async (k, code, vk) => {
  await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk });
  await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk });
};
const rect = (sel, i = 0) => ev(`(() => {
  const e = document.querySelectorAll(${J(sel)})[${i}];
  if (!e) return null;
  const r = e.getBoundingClientRect();
  return { x: r.left, y: r.top, w: r.width, h: r.height, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
})()`);
const center = (sel, i = 0) => ev(`document.querySelectorAll(${J(sel)})[${i}].scrollIntoView({ block: 'center', behavior: 'instant' })`);
const probs = () => page.problems().filter((p) => !p.endsWith('favicon.ico'));
const open = async (p, settle = 2600) => {
  await page.goto(site.url + p, settle);
};
const noNav = () => ev('document.addEventListener(\'click\', (e) => { if (e.target.closest && e.target.closest(\'a[href]\')) e.preventDefault(); }, true)');
const r2 = (v) => Math.round(v / 2) * 2;

const translateOf = (sel, i = 0) => ev(`(() => {
  const e = document.querySelectorAll(${J(sel)})[${i}];
  const m = /^(-?[\\d.]+)px(?: (-?[\\d.]+)px)?/.exec(getComputedStyle(e).translate);
  return m ? [+m[1], +(m[2] || 0)] : null;
})()`);

const sceneInfo = () => ev(`(() => {
  const c = { sceneObject: typeof window.scene, dock: 0, dockVisible: 0, water: 0, waterVisible: 0, lanterns: 0 };
  if (!window.scene) return c;
  window.scene.traverse((o) => {
    if (!o.name) return;
    if (/^DockGroup/.test(o.name)) { c.dock++; if (o.visible) c.dockVisible++; }
    else if (/^WaterFace/.test(o.name)) { c.water++; if (o.material ? o.material.visible : o.visible) c.waterVisible++; }
    else if (/^(Rounded)?Lantern/.test(o.name)) c.lanterns++;
  });
  c.lanterns = c.lanterns > 0 ? 'some' : 0;
  return c;
})()`);

const boil = async (sel) => {
  await ev('window.__boilSamples = []');
  const samples = [];
  for (let i = 0; i < 9; i++) {
    samples.push(await ev(`[...document.querySelectorAll(${J(sel)})].flatMap((h) => [...h.querySelectorAll('.line-boil-text__g')].map((c) => c.style.fontFamily))`));
    await sleep(200);
  }
  const meta = await ev(`(() => {
    const hosts = [...document.querySelectorAll(${J(sel)})];
    const cells = hosts.flatMap((h) => [...h.querySelectorAll('.line-boil-text__g')]);
    return {
      hosts: hosts.length,
      cells: cells.length,
      classOnHosts: hosts.every((h) => h.classList.contains('line-boil-text')),
      allPinned: cells.every((c) => parseFloat(c.style.inlineSize) > 0),
      allMeasured: cells.every((c) => { const r = c.getBoundingClientRect(); return r.width > 0 || r.height > 0; }),
      text: hosts.map((h) => h.textContent).join('|'),
    };
  })()`);
  const n = samples[0].length;
  let changed = 0;
  for (let c = 0; c < n; c++) if (new Set(samples.map((s) => s[c])).size > 1) changed++;
  return { ...meta, allChanged: n > 0 && changed === n, fonts: [...new Set(samples.flat())].sort() };
};

// ---------------------------------------------------------------- landing
async function landing() {
  const o = {};
  await open('/tech-art/', 4200);
  await noNav();
  o.scene = await sceneInfo();
  o.body = await ev('document.body.className');

  o.boilLogo = await boil('.top-bar__logo');
  o.boilHero = await boil('.hero__vert .hero__col');
  const clock = await boil('.hero__clock');
  clock.text = await ev(`(() => {
    const t = document.querySelector('.hero__clock').textContent;
    const d = new Date();
    const now = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
    const m = /^(\\d\\d):(\\d\\d):(\\d\\d)$/.exec(t);
    const shown = m ? (+m[1]) * 3600 + (+m[2]) * 60 + (+m[3]) : -999;
    return m && Math.abs(shown - now) <= 2 ? 'HH:MM:SS, within 2s of now' : 'WRONG ' + t;
  })()`);
  o.boilClock = clock;

  const drift0 = await translateOf('.hero__social .dm-social');
  await sleep(700);
  const drift1 = await translateOf('.hero__social .dm-social');
  o.driftAtRest = {
    set: !!drift0,
    moved: !!drift0 && !!drift1 && (drift0[0] !== drift1[0] || drift0[1] !== drift1[1]),
    within7px: !!drift1 && Math.abs(drift1[0]) <= 7 && Math.abs(drift1[1]) <= 7,
    willChange: await ev('getComputedStyle(document.querySelector(\'.hero__social .dm-social\')).willChange'),
  };

  await to(500, 400);
  await sleep(120);
  o.cursorGlow = await ev('(() => { const g = document.querySelector(\'.cursorglow\'); return [g.style.getPropertyValue(\'--cx\'), g.style.getPropertyValue(\'--cy\')]; })()');
  await to(700, 250, 6);
  await sleep(120);
  o.cursorGlow2 = await ev('(() => { const g = document.querySelector(\'.cursorglow\'); return [g.style.getPropertyValue(\'--cx\'), g.style.getPropertyValue(\'--cy\')]; })()');

  await center('.hero__social .dm-social', 0);
  await sleep(300);
  const s = await rect('.hero__social .dm-social', 0);
  await to(s.x + s.w * 0.7, s.y + s.h * 0.7, 10);
  await sleep(700);
  const pulled = await translateOf('.hero__social .dm-social');
  const inner = await translateOf('.hero__social .dm-social .js-magnetic-inner');
  o.magnetSocial = {
    pulledPositive: !!pulled && pulled[0] > 4 && pulled[1] > 4,
    pulledWithin: !!pulled && Math.abs(pulled[0]) < 30 && Math.abs(pulled[1]) < 30,
    innerFollows: !!inner && inner[0] > 1 && inner[1] > 1 && inner[0] < pulled[0],
    willChange: await ev('getComputedStyle(document.querySelector(\'.hero__social .dm-social\')).willChange'),
  };
  const edge = () => ev('(() => { const s = getComputedStyle(document.querySelector(\'.hero__social .dm-social\')); return { offset: s.outlineOffset, faded: s.outlineColor === \'rgba(0, 0, 0, 0)\', glow: s.boxShadow !== \'none\' }; })()');
  o.borderBreak = { hovered: await edge() };
  await to(900, 700, 6);
  await sleep(900);
  o.borderBreak.afterLeaving = await edge();
  const back = await translateOf('.hero__social .dm-social');
  o.magnetSocial.releasedToDrift = !!back && Math.abs(back[0]) <= 7 && Math.abs(back[1]) <= 7;

  await ev('scrollTo({ top: 0, behavior: \'instant\' })');
  await sleep(300);
  const link = await rect('.top-bar__link.js-magnetic', 0);
  await to(link.x + link.w * 0.9, link.y + link.h * 0.5, 8);
  await sleep(600);
  const lt = await translateOf('.top-bar__link.js-magnetic', 0);
  o.magnetTopBar = { pulledRight: !!lt && lt[0] > 1 };
  await to(900, 500, 8);
  await sleep(900);
  o.magnetTopBar.releasedToNone = await ev('getComputedStyle(document.querySelectorAll(\'.top-bar__link.js-magnetic\')[0]).translate');

  o.cards = await cards();
  o.reach = await reach();
  o.problems = probs();
  return o;
}

async function cards() {
  const o = {};
  const idx = await ev('[...document.querySelectorAll(\'.post-card\')].findIndex((c) => c.querySelector(\'video\'))');
  o.cardCount = await ev('document.querySelectorAll(\'.post-card\').length');
  o.videoCardFound = idx >= 0;
  const i = Math.max(idx, 0);
  await ev(`window.__cardIndex = ${i}`);
  await center('.post-card', i);
  await sleep(500);
  await to(80, 300, 4);
  await to(120, 330, 4);
  const c = await rect('.post-card .card-tilt', i);
  const px = c.x + c.w * 0.75;
  const py = c.y + c.h * 0.25;
  await to(px, py, 10);
  await sleep(250);
  const state = () => ev(`(() => {
    const card = document.querySelectorAll('.post-card')[${i}];
    const tilt = card.querySelector('.card-tilt');
    const ring = document.querySelector('.dwell-ring');
    const v = card.querySelector('video');
    return {
      tilt: tilt.style.transform,
      transition: tilt.style.transition,
      willChange: tilt.style.willChange,
      flipped: card.querySelector('.card-flipper').classList.contains('is-flipped'),
      ring: ring ? ring.className : null,
      ringCount: document.querySelectorAll('.dwell-ring').length,
      videoPlaying: v ? !v.paused : null,
      mx: tilt.style.getPropertyValue('--mx'),
      my: tilt.style.getPropertyValue('--my'),
    };
  })()`);
  const s1 = await state();
  const m = /rotateX\((-?[\d.]+)deg\) rotateY\((-?[\d.]+)deg\) translateY\((-?[\d.]+)px\) scale\(([\d.]+)\)/.exec(s1.tilt);
  const tr = await rect('.post-card .card-tilt', i);
  o.hover = {
    tiltTransform: m ? { rotX: r2(+m[1]), rotY: r2(+m[2]), lift: +m[3], scale: +m[4] } : s1.tilt,
    transition: s1.transition,
    willChange: s1.willChange,
    glowMx: Math.abs(parseFloat(s1.mx) - (px - tr.x)) < 16,
    glowMy: Math.abs(parseFloat(s1.my) - (py - tr.y)) < 16,
    ring: s1.ring,
    ringCount: s1.ringCount,
    flippedEarly: s1.flipped,
    videoPlaying: s1.videoPlaying,
  };
  await sleep(1100);
  const s2 = await state();
  o.dwell = { flippedAfter1s: s2.flipped, ringAfterFlip: s2.ring, videoStillPlaying: s2.videoPlaying };
  await to(c.x + c.w * 0.1, c.y + c.h * 0.9, 6);
  await sleep(250);
  const s2b = await state();
  o.afterMoveInsideFlipped = s2b.flipped;
  await to(1330, 60, 10);
  await sleep(700);
  const s3 = await state();
  o.leave = { tilt: s3.tilt, flipped: s3.flipped, ring: s3.ring, videoPlaying: s3.videoPlaying, transition: s3.transition, willChange: s3.willChange };

  await to(px, py, 10);
  await sleep(500);
  await to(px - 90, py + 30, 5);
  await sleep(600);
  const s4 = await state();
  o.dwellReset = { notFlippedAfterBigMove: !s4.flipped, ringOn: !!(s4.ring && s4.ring.includes('is-on')) };
  await sleep(700);
  o.dwellReset.flippedLater = (await state()).flipped;
  await to(1330, 60, 10);
  await sleep(500);
  return o;
}

async function reach() {
  return ev(`(async () => {
    const c = window.fireworkController;
    if (!c) return { controller: false };
    const orig = c.createFireworkFromClick;
    const log = [];
    c.createFireworkFromClick = function (x, y, s) { log.push([x / innerWidth, y / innerHeight, String(s)]); return orig.apply(this, arguments); };
    for (let i = 0; i < 40; i++) { c.createAutoFirework('probe'); await new Promise((r) => setTimeout(r, 120)); }
    c.createFireworkFromClick = orig;
    const probe = log.filter((l) => l[2] === 'probe');
    const ys = probe.map((l) => l[1]), xs = probe.map((l) => l[0]);
    return {
      controller: true,
      calls: probe.length > 20 ? 'many' : probe.length,
      yMinAtLeast006: Math.min(...ys) >= 0.0599,
      yMaxAtMost078: Math.max(...ys) <= 0.7801,
      yReachesHigh: Math.min(...ys) < 0.2,
      yReachesLow: Math.max(...ys) > 0.6,
      xMinAtLeast01: Math.min(...xs) >= 0.0999,
      xMaxAtMost09: Math.max(...xs) <= 0.9001,
    };
  })()`);
}

// ---------------------------------------------------------------- projects: tier + search
async function projects() {
  const o = {};
  await open('/tech-art/projects/', 4200);
  o.scene = await sceneInfo();
  const vis = (sel) => ev(`[...document.querySelectorAll(${J(sel)})].filter((e) => getComputedStyle(e).display !== 'none').length`);
  const cell = '.pv2-grid .pv2-cell';
  o.total = await vis(cell);
  const input = await rect('.sf__input');
  await click(input.cx, input.cy);
  await page.send('Input.insertText', { text: 'unity' });
  await sleep(300);
  o.typedUnity = {
    visible: await vis(cell),
    url: await ev('location.search'),
    pinnedBlock: await ev('getComputedStyle(document.querySelector(\'.pv2-pinned\')).display'),
    clearHidden: await ev('document.querySelector(\'.pv2-filters [data-clear]\').hidden'),
    emptyHidden: await ev('document.querySelector(\'.es\').hidden'),
  };
  for (let i = 0; i < 5; i++) await key('Backspace', 'Backspace', 8);
  await sleep(300);
  o.cleared = { visible: await vis(cell), url: await ev('location.search'), clearHidden: await ev('document.querySelector(\'.pv2-filters [data-clear]\').hidden') };
  await page.send('Input.insertText', { text: 'zzzz' });
  await sleep(300);
  o.nothing = {
    visible: await vis(cell),
    emptyHidden: await ev('document.querySelector(\'.es\').hidden'),
    said: await ev('document.querySelector(\'.es__q\').textContent'),
    pinnedBlock: await ev('getComputedStyle(document.querySelector(\'.pv2-pinned\')).display'),
    ruleBlock: await ev('getComputedStyle(document.querySelector(\'.pv2-rule\')).display'),
  };
  for (let i = 0; i < 4; i++) await key('Backspace', 'Backspace', 8);
  await sleep(300);
  o.restored = { visible: await vis(cell), emptyHidden: await ev('document.querySelector(\'.es\').hidden'), pinnedBlock: await ev('getComputedStyle(document.querySelector(\'.pv2-pinned\')).display') };

  const pill = await rect('.pv2-filters [data-tag]', 0);
  await click(pill.cx, pill.cy);
  await sleep(300);
  o.pill = await ev(`(() => {
    const p = document.querySelector('.pv2-filters [data-tag]');
    return { tag: p.dataset.tag, active: p.classList.contains('is-active'), pressed: p.getAttribute('aria-pressed'),
      clearHidden: document.querySelector('.pv2-filters [data-clear]').hidden,
      visible: [...document.querySelectorAll('.pv2-grid .pv2-cell')].filter((e) => getComputedStyle(e).display !== 'none').length,
      url: location.search, said: document.querySelector('.es__q').textContent };
  })()`);
  const pill2 = await rect('.pv2-filters [data-tag]', 3);
  await click(pill2.cx, pill2.cy);
  await sleep(300);
  o.twoPills = await ev(`(() => ({
    pressed: [...document.querySelectorAll('.pv2-filters [data-tag]')].filter((p) => p.getAttribute('aria-pressed') === 'true').map((p) => p.dataset.tag),
    visible: [...document.querySelectorAll('.pv2-grid .pv2-cell')].filter((e) => getComputedStyle(e).display !== 'none').length,
  }))()`);
  await page.send('Input.insertText', { text: '' });
  const clear = await rect('.pv2-filters [data-clear]');
  await click(clear.cx, clear.cy);
  await sleep(300);
  o.afterClear = await ev(`(() => ({
    visible: [...document.querySelectorAll('.pv2-grid .pv2-cell')].filter((e) => getComputedStyle(e).display !== 'none').length,
    pressed: document.querySelectorAll('.pv2-filters [aria-pressed="true"]').length,
    clearHidden: document.querySelector('.pv2-filters [data-clear]').hidden,
    value: document.querySelector('.sf__input').value,
  }))()`);

  await open('/tech-art/projects/?search=unity', 2500);
  o.fromUrl = await ev(`({ value: document.querySelector('.sf__input').value,
    visible: [...document.querySelectorAll('.pv2-grid .pv2-cell')].filter((e) => getComputedStyle(e).display !== 'none').length,
    clearHidden: document.querySelector('.pv2-filters [data-clear]').hidden })`);

  const ci = await ev('[...document.querySelectorAll(\'.post-card\')].findIndex((c) => getComputedStyle(c.closest(\'.pv2-cell\')).display !== \'none\')');
  await center('.post-card', ci);
  await sleep(400);
  const cd0 = await translateOf('.post-card', ci);
  await sleep(700);
  const cd1 = await translateOf('.post-card', ci);
  o.cardDrift = { set: !!cd0, moved: !!cd0 && !!cd1 && (cd0[0] !== cd1[0] || cd0[1] !== cd1[1]), within5: !!cd1 && Math.abs(cd1[0]) <= 5 && Math.abs(cd1[1]) <= 5 };
  const cr = await rect('.post-card', ci);
  await to(cr.x + cr.w * 0.85, cr.y + cr.h * 0.8, 8);
  await sleep(700);
  const cm = await translateOf('.post-card', ci);
  o.cardMagnet = { pulledPositive: !!cm && cm[0] > 1 && cm[1] > 1, within12: !!cm && Math.abs(cm[0]) < 12 && Math.abs(cm[1]) < 12 };
  await to(1300, 120, 8);
  await sleep(600);

  await open('/tech-art/?scene=minimal', 4200);
  o.overrideMinimalOnLanding = await sceneInfo();
  await open('/tech-art/projects/?scene=full', 4200);
  o.overrideFullOnProjects = await sceneInfo();
  o.problems = probs();
  return o;
}

async function blogs() {
  const o = {};
  await open('/game-design/blogs/', 2500);
  const vis = () => ev('[...document.querySelectorAll(\'.er-list .er-row\')].filter((e) => getComputedStyle(e).display !== \'none\').length');
  o.total = await vis();
  const word = await ev('document.querySelector(\'.er-list .er-row .er-ttl\').textContent.trim().split(/\\s+/)[0].toLowerCase()');
  o.word = word;
  const input = await rect('.sf__input');
  await click(input.cx, input.cy);
  await page.send('Input.insertText', { text: word });
  await sleep(300);
  o.typed = { visible: await vis(), url: await ev('location.search'), listDisplay: await ev('getComputedStyle(document.querySelector(\'.er-list\')).display') };
  await page.send('Input.insertText', { text: 'qqqqq' });
  await sleep(300);
  o.nothing = { visible: await vis(), listDisplay: await ev('getComputedStyle(document.querySelector(\'.er-list\')).display'), emptyHidden: await ev('document.querySelector(\'.es\').hidden'), said: await ev('document.querySelector(\'.es__q\').textContent') };
  for (let i = 0; i < word.length + 5; i++) await key('Backspace', 'Backspace', 8);
  await sleep(300);
  o.cleared = { visible: await vis(), listDisplay: await ev('getComputedStyle(document.querySelector(\'.er-list\')).display'), url: await ev('location.search') };
  o.problems = probs();
  return o;
}

// ---------------------------------------------------------------- about: achievement wall
async function about() {
  const o = {};
  await open('/tech-art/about/', 3500);
  await ev(`(() => {
    const s = JSON.parse(localStorage.getItem('rod-achievements') || '{}');
    s.unlocked = ['first-light', 'pyrotechnician', 'curator'];
    s.fireworkCount = 30; s.tagsRead = ['a', 'b', 'c'];
    localStorage.setItem('rod-achievements', JSON.stringify(s));
    localStorage.removeItem('rod-achievements-active-v1');
    return true;
  })()`);
  await open('/tech-art/about/', 3500);
  await noNav();
  o.scene = await sceneInfo();
  o.tiles = await ev('document.querySelectorAll(\'.aw__tile\').length');
  o.groups = await ev('[...document.querySelectorAll(\'.aw__grouplbl\')].map((g) => g.textContent)');
  o.tiers = await ev('[...document.querySelectorAll(\'.aw__tile\')].filter((t) => ![\'night-owl\', \'early-bird\'].includes(t.dataset.id)).map((t) => t.dataset.id + \':\' + t.dataset.tier + \':\' + t.getAttribute(\'aria-disabled\') + \':\' + t.getAttribute(\'aria-pressed\')).join(\' \')');
  o.emptyPanel = await ev('document.querySelector(\'.aw__detail\').textContent');
  o.boilName = await boil('.bio-h .boil-word');

  const tile = (id) => ev(`(() => { const t = document.querySelector('.aw__tile[data-id=${J(id)}]'); t.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = t.getBoundingClientRect(); return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, x: r.left, y: r.top, w: r.width, h: r.height }; })()`);
  const detail = () => ev('document.querySelector(\'.aw__detail\').innerText.replace(/\\s+/g, \' \').trim()');

  let t = await tile('pyrotechnician');
  await sleep(300);
  await to(t.cx, t.cy, 8);
  await sleep(350);
  o.hoverPyro = { panel: await detail(), tilt: (await ev('document.querySelector(\'.aw__tile[data-id="pyrotechnician"]\').style.transform')).replace(/[\d.-]+/g, '#') };
  t = await tile('toolsmith');
  await to(t.cx, t.cy, 6);
  await sleep(350);
  o.hoverLocked = await detail();
  await click(t.cx, t.cy);
  await sleep(150);
  o.lockedClick = { pressed: await ev('document.querySelector(\'.aw__tile[data-id="toolsmith"]\').getAttribute(\'aria-pressed\')'), stored: await ev('localStorage.getItem(\'rod-achievements-active-v1\')') };

  t = await tile('first-light');
  await to(t.cx, t.cy, 6);
  await sleep(250);
  await click(t.cx, t.cy);
  await sleep(200);
  const orbitSamples = [];
  for (let i = 0; i < 6; i++) {
    orbitSamples.push(await ev('document.querySelector(\'.aw__tile[data-id="first-light"]\').style.getPropertyValue(\'--mx\') + \' \' + document.querySelector(\'.aw__tile[data-id="first-light"]\').style.getPropertyValue(\'--my\')'));
    await sleep(150);
  }
  o.activate = {
    pressed: await ev('document.querySelector(\'.aw__tile[data-id="first-light"]\').getAttribute(\'aria-pressed\')'),
    stored: await ev('localStorage.getItem(\'rod-achievements-active-v1\')'),
    panel: await detail(),
    orbitPercent: orbitSamples.every((m) => m.split(' ').every((v) => v.endsWith('%'))),
    orbitMoves: new Set(orbitSamples).size >= 3,
  };

  t = await tile('curator');
  await to(t.cx + 400, t.cy + 120, 8);
  await sleep(700);
  const rim = await ev(`(() => {
    const out = [];
    for (const id of ['curator', 'explorer', 'cartographer']) {
      const el = document.querySelector('.aw__tile[data-id="' + id + '"]');
      const r = el.getBoundingClientRect();
      out.push([id, parseFloat(el.style.getPropertyValue('--mx')), parseFloat(el.style.getPropertyValue('--my')), r.left, r.top]);
    }
    return out;
  })()`);
  const px = cur.x, py = cur.y;
  o.rimGlow = rim.map(([id, mx, my, l, tp]) => [id, Math.abs(mx - (px - l)) < 2, Math.abs(my - (py - tp)) < 2]);

  await open('/tech-art/about/', 3000);
  o.afterReload = await ev(`({
    pressed: [...document.querySelectorAll('.aw__tile[aria-pressed="true"]')].map((t) => t.dataset.id),
    stored: localStorage.getItem('rod-achievements-active-v1'),
  })`);
  await sleep(800);
  o.orbitAfterReload = await ev('document.querySelector(\'.aw__tile[data-id="first-light"]\').style.getPropertyValue(\'--my\').endsWith(\'%\')');
  o.problems = probs();
  return o;
}

// ---------------------------------------------------------------- portal
async function portal() {
  const o = {};
  await open('/', 4200);
  await noNav();
  const pos = () => ev('[...document.querySelectorAll(\'.pwin\')].map((w) => { const m = /translate3d\\((-?[\\d.]+)px, (-?[\\d.]+)px/.exec(w.style.transform); return m ? [Math.round(+m[1]), Math.round(+m[2])] : null; })');
  const raw = () => ev('[...document.querySelectorAll(\'.pwin\')].map((w) => { const m = /translate3d\\((-?[\\d.]+)px, (-?[\\d.]+)px/.exec(w.style.transform); return m ? [+m[1], +m[2]] : null; })');
  o.scene = await sceneInfo();
  const base = await pos();
  o.placed = base;
  o.notAllZero = base.some(([x, y]) => x > 0 || y > 0);
  o.vars = await ev(`(() => { const f = document.querySelector('.field'); return { scale: f.style.getPropertyValue('--pscale'), bar: f.style.getPropertyValue('--bar-h'),
    sizes: [...document.querySelectorAll('.pwin')].map((w) => w.style.getPropertyValue('--win-w') + 'x' + w.style.getPropertyValue('--win-h')) }; })()`);
  o.boilMark = await boil('.centre__mark');
  o.fill = await ev('[...document.querySelectorAll(\'.pwin__fill\')].map((f) => f.textContent.split(\' \').length)');

  const d0 = await translateOf('.pwin__inner', 0);
  await sleep(700);
  const d1 = await translateOf('.pwin__inner', 0);
  o.drift = { set: !!d0, moved: !!d0 && !!d1 && d0[0] !== d1[0], yStaysZero: !!d1 && d1[1] === 0, within28: !!d1 && Math.abs(d1[0]) <= 28 };

  const drag = 3;
  const bar = await rect('.pwin .pwin__bar', drag);
  const startRaw = (await raw())[drag];
  await to(bar.x + 20, bar.cy, 4);
  await mouse('mousePressed', cur.x, cur.y, { button: 'left', clickCount: 1 });
  await sleep(60);
  await to(cur.x + 60, cur.y - 40, 6);
  await sleep(120);
  const mid = (await raw())[drag];
  o.drag = {
    dx: Math.round(mid[0] - startRaw[0]),
    dy: Math.round(mid[1] - startRaw[1]),
    draggingClass: await ev(`document.querySelectorAll('.pwin')[${drag}].classList.contains('is-dragging')`),
    zIndex: await ev('[...document.querySelectorAll(\'.pwin\')].map((w) => w.style.zIndex).join(\',\')'),
  };
  await mouse('mouseReleased', cur.x, cur.y, { button: 'left', clickCount: 1 });
  await sleep(1500);
  const settled = (await raw())[drag];
  o.drag.releasedClass = await ev(`document.querySelectorAll('.pwin')[${drag}].classList.contains('is-dragging')`);
  o.drag.settledInField = settled[0] >= -1 && settled[1] >= -1 && settled[0] < 1440 && settled[1] < 900 && settled.every(Number.isFinite);
  o.drag.movedFromHome = Math.hypot(settled[0] - startRaw[0], settled[1] - startRaw[1]) > 20;

  const close = await rect('.pwin .pwin__close', 1);
  await click(close.cx, close.cy);
  await sleep(300);
  o.closed = await ev(`({ closed: [...document.querySelectorAll('.pwin')].map((w) => w.classList.contains('is-closed')),
    canReset: document.querySelector('.centre').classList.contains('can-reset') })`);
  const centre = await rect('.centre');
  await click(centre.cx, centre.cy);
  await sleep(500);
  o.restored = await ev(`({ closed: [...document.querySelectorAll('.pwin')].map((w) => w.classList.contains('is-closed')),
    canReset: document.querySelector('.centre').classList.contains('can-reset') })`);
  const after = await pos();
  o.restored.backHome = JSON.stringify(after) === JSON.stringify(base);
  o.restored.differences = after.map((p, i) => (p[0] !== base[i][0] || p[1] !== base[i][1] ? i : -1)).filter((i) => i >= 0);

  await to(1300, 120, 6);
  await sleep(900);
  const quiet = await raw();
  const w2 = await rect('.pwin', 1);
  await to(w2.cx + 70, w2.cy + 50, 10);
  await sleep(800);
  const leaned = await raw();
  const dist = Math.hypot(leaned[1][0] - quiet[1][0], leaned[1][1] - quiet[1][1]);
  o.lean = { leans: dist > 0.5, withinMax: dist <= 10.5, towardPointer: leaned[1][0] > quiet[1][0] };

  await page.resize(1100, 800);
  await sleep(900);
  o.resized = await ev(`(() => { const f = document.querySelector('.field'); return { scale: f.style.getPropertyValue('--pscale'),
    sizes: [...document.querySelectorAll('.pwin')].map((w) => w.style.getPropertyValue('--win-w') + 'x' + w.style.getPropertyValue('--win-h')) }; })()`);
  await page.resize(1440, 900);
  await sleep(700);
  o.resizedBack = await ev('document.querySelector(\'.field\').style.getPropertyValue(\'--pscale\')');
  o.problems = probs();
  return o;
}

// ---------------------------------------------------------------- post
async function post() {
  const o = {};
  await open('/tech-art/posts/ComputeGrass/', 3500);
  o.scene = await sceneInfo();
  o.body = await ev('document.body.className');
  o.boilLogo = await boil('.top-bar__logo');
  await to(333, 222, 8);
  await sleep(150);
  o.cursorGlow = await ev('(() => { const g = document.querySelector(\'.cursorglow\'); return [g.style.getPropertyValue(\'--cx\'), g.style.getPropertyValue(\'--cy\')]; })()');
  o.shieldExists = await ev('document.querySelectorAll(\'.post-comments .cursor-shield\').length');
  await center('.post-comments', 0);
  let frameLoaded = false;
  for (let i = 0; i < 30 && !frameLoaded; i++) {
    await sleep(500);
    frameLoaded = await ev('(() => { const f = document.querySelector(\'.post-comments iframe\'); return !!f && f.getBoundingClientRect().height > 100; })()');
  }
  await sleep(1500);
  await center('.post-comments', 0);
  await sleep(300);
  const sh = await rect('.post-comments .cursor-shield');
  o.shield = { commentsFrameLoaded: frameLoaded, area: sh.w > 10 && sh.h > 10 };
  if (o.shield.area) {
    const glowIsAtThePointer = async () => {
      await sleep(120);
      const [x, y] = await ev('(() => { const g = document.querySelector(\'.cursorglow\'); return [parseFloat(g.style.getPropertyValue(\'--cx\')), parseFloat(g.style.getPropertyValue(\'--cy\'))]; })()');
      return Math.hypot(x - cur.x, y - cur.y) < 8;
    };
    const y = Math.min(Math.max(sh.y, 80) + 60, 800);
    await to(sh.x + 80, y, 8);
    await to(sh.x + 260, y + 30, 10);
    o.shield.glowFollowsWhileMoving = await glowIsAtThePointer();
    await sleep(400);
    await to(sh.x + 120, y + 10, 10);
    o.shield.glowFollowsAfterAPause = await glowIsAtThePointer();
    await click(cur.x + 30, cur.y);
    await sleep(150);
    o.shield.aClickStraightAfterMovingReachesTheComments = await ev('document.activeElement.tagName === \'IFRAME\'');
  }
  o.magnets = await ev('document.querySelectorAll(\'.js-magnetic, [data-drift]\').length');
  o.problems = probs();
  return o;
}

async function embers() {
  const o = {};
  await open('/404.html', 3500);
  o.scene = await sceneInfo();
  o.tier = await ev('document.body.dataset.sceneTier');
  o.problems = probs();
  return o;
}

try {
  result.landing = await landing();
  result.projects = await projects();
  result.blogs = await blogs();
  result.about = await about();
  result.portal = await portal();
  result.post = await post();
  result.embers = await embers();
} catch (error) {
  result.crash = String(error && error.stack || error);
} finally {
  await page.close();
  site.close();
}
writeFileSync(OUT, JSON.stringify(result, null, 1));
console.log('wrote', OUT, result.crash ? 'CRASH ' + result.crash.split('\n')[0] : 'ok');
