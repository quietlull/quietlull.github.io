import { onCursor } from './cursor-coords.js';

const ACHIEVEMENTS = [
  { id: 'first-light', cat: 'explorer', title: 'First Light', icon: '\u{2600}', desc: 'Welcome to the portfolio!', hasProgress: false, reward: null },
  { id: 'explorer', cat: 'explorer', title: 'Explorer', icon: '\u{1F9ED}', desc: 'Visited both worlds', hasProgress: false, reward: null },
  { id: 'curator', cat: 'explorer', title: 'Curator', icon: '\u{1F3A8}', desc: 'Viewed 5 projects', hasProgress: false, reward: null },
  { id: 'cartographer', cat: 'explorer', title: 'Cartographer', icon: '\u{1F5FA}', desc: 'Visited 10 unique pages', hasProgress: false, reward: null },
  { id: 'deep-diver', cat: 'explorer', title: 'Deep Diver', icon: '\u{1F9FF}', desc: 'Scrolled to the bottom of 5 pages', hasProgress: false, reward: null },
  { id: 'the-nether', cat: 'explorer', title: 'The Nether', icon: '\u{1F30C}', desc: 'Entered the portal', hasProgress: false, reward: null },
  { id: 'behind-curtain', cat: 'explorer', title: 'Behind the Curtain', icon: '\u{1F3AD}', desc: 'Found the person behind the work', hasProgress: false, reward: null },
  { id: 'scholar', cat: 'reader', title: 'Scholar', icon: '\u{1F4DC}', desc: 'Read an article to the end', hasProgress: false, reward: null },
  { id: 'bookworm', cat: 'reader', title: 'Bookworm', icon: '\u{1F4DA}', desc: 'Read 3 articles to the end', hasProgress: false, reward: null },
  { id: 'well-rounded', cat: 'reader', title: 'Well-Rounded', icon: '\u{1F4D6}', desc: 'Read posts from 5 different tags', hasProgress: true, reward: null },
  { id: 'connoisseur', cat: 'reader', title: 'Connoisseur', icon: '\u{1F9D0}', desc: 'Read posts from 10 different tags', hasProgress: true, reward: null },
  { id: 'completionist', cat: 'reader', title: 'Completionist', icon: '\u{1F451}', desc: 'Read a post from every tag', hasProgress: true, reward: null },
  { id: 'zoom-enhance', cat: 'reader', title: 'Zoom Enhance', icon: '\u{1F50D}', desc: 'Clicked an image to enlarge it', hasProgress: false, reward: null },
  { id: 'pyrotechnician', cat: 'interactor', title: 'Pyrotechnician', icon: '\u{1F386}', desc: 'Launched 50 fireworks', hasProgress: true, reward: 'auto-fireworks' },
  { id: 'toolsmith', cat: 'interactor', title: 'Toolsmith', icon: '\u{1F6E0}', desc: 'Hovered every tool on a landing page', hasProgress: false, reward: null },
  { id: 'copy-that', cat: 'interactor', title: 'Copy That', icon: '\u{1F4CB}', desc: 'Used the code copy button', hasProgress: true, reward: null },
  { id: 'fan-club', cat: 'interactor', title: 'Fan Club', icon: '\u{2B50}', desc: 'Spent quality time with the avatar', hasProgress: true, reward: null },
  { id: 'touched-my-fly', cat: 'interactor', title: 'Hey, You Touched My Fly!', icon: '\u{1F99F}', desc: 'Caught a firefly', hasProgress: false, reward: null },
  { id: 'lantern-tapper', cat: 'interactor', title: 'Lantern Tapper', icon: '\u{1F3EE}', desc: 'Knocked 25 lanterns', hasProgress: true, reward: 'lantern-shape' },
  { id: 'lantern-painter', cat: 'interactor', title: 'Lantern Painter', icon: '\u{1F308}', desc: 'Knocked 50 lanterns', hasProgress: true, reward: 'lantern-color' },
  { id: 'lantern-master', cat: 'interactor', title: 'Lantern Master', icon: '\u{1FA94}', desc: 'Knocked 100 lanterns', hasProgress: true, reward: 'lantern-panel' },
  { id: 'rabbit-hole', cat: 'secret', title: 'Down the Rabbit Hole', icon: '\u{1F407}', desc: 'Discovered the ramblings', hasProgress: false, reward: null },
  { id: 'night-owl', cat: 'secret', title: 'Night Owl', icon: '\u{1F989}', desc: 'Visited between midnight and 4am', hasProgress: false, reward: null },
  { id: 'early-bird', cat: 'secret', title: 'Early Bird', icon: '\u{1F426}', desc: 'Visited between 5am and 7am', hasProgress: false, reward: null },
  { id: 'getting-started', cat: 'meta', title: 'Getting Started', icon: '\u{1F31F}', desc: 'Unlocked 5 achievements', hasProgress: true, reward: null },
  { id: 'collector', cat: 'meta', title: 'Collector', icon: '\u{1F3C6}', desc: 'Unlocked 15 achievements', hasProgress: true, reward: null },
  { id: 'section-clear', cat: 'meta', title: 'Section Clear', icon: '\u{1F3AE}', desc: 'All achievements possible from one section', hasProgress: false, reward: null },
  { id: 'golden-god', cat: 'meta', title: 'Golden God', icon: '\u{1F3C5}', desc: 'All section + cross-section achievements', hasProgress: false, reward: null },
  { id: '1001-percent', cat: 'meta', title: '1001%', icon: '\u{1F48E}', desc: 'Every. Single. Achievement.', hasProgress: false, reward: null }
];

const CAT_LABEL = { explorer: 'Explorer', reader: 'Reader', interactor: 'Interactor', secret: 'Secret', meta: 'Meta' };
const CAT_ORDER = ['explorer', 'reader', 'interactor', 'secret', 'meta'];

const EARNED_KEY = 'rod-achievements';

function loadEarned() {
  try {
    const raw = localStorage.getItem(EARNED_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function progressFrom(state, id) {
  const tags = (state.tagsRead || []).length;
  const won = (state.unlocked || []).length;
  const knocks = state.lanternKnocks || 0;
  const table = {
    'well-rounded': [tags, 5],
    'connoisseur': [tags, 10],
    'completionist': [tags, 15],
    'pyrotechnician': [state.fireworkCount || 0, 50],
    'fan-club': [Math.min(state.avatarHoverTime || 0, 10), 10],
    'lantern-tapper': [knocks, 25],
    'lantern-painter': [knocks, 50],
    'lantern-master': [knocks, 100],
    'getting-started': [won, 5],
    'collector': [won, 15]
  };
  return table[id];
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function tierFor(cur, target) {
  const p = target > 0 ? cur / target : 0;
  if (p >= 1) return 'prismatic';
  if (p >= 0.66) return 'gold';
  if (p >= 0.33) return 'silver';
  return 'bronze';
}

let earnedState = {};
let earnedSet = new Set();

function panelMarkup(a, isActive) {
  if (!a) {
    return '<div class="aw__empty">Hover an achievement to read it. Click one to switch its effect on.</div>';
  }
  const unlocked = earnedSet.has(a.id);

  const p = progressFrom(earnedState, a.id);
  let progress;
  if (p) {
    const pct = Math.min(100, Math.round((p[0] / p[1]) * 100));
    const tier = tierFor(p[0], p[1]);
    progress = '<div class="aw__val">' + p[0] + ' / ' + p[1]
      + ' <span class="aw__tier aw__tier--' + tier + '">' + tier + '</span></div>'
      + '<div class="aw__bar aw__bar--' + tier + '"><i style="width:' + pct + '%"></i></div>'
      + '<div class="aw__crit">' + esc(a.desc) + '</div>';
  } else {
    progress = '<div class="aw__val">' + (unlocked ? 'Earned' : 'Not yet earned') + '</div>';
  }

  const state = unlocked ? (isActive ? 'Active' : 'Inactive') : 'Locked';

  const flavor = '<div class="aw__val aw__val--empty">No flavor text available</div>';
  const effect = '<div class="aw__val aw__val--empty">No effects</div>';

  return ''
    + '<h3 class="aw__dttl">' + esc(a.title) + '</h3>'
    + '<div class="aw__field"><span class="aw__lbl">Progress</span>' + progress + '</div>'
    + '<div class="aw__field"><span class="aw__lbl">State</span>'
    + '<span class="aw__state' + (isActive ? ' is-on' : '') + '"><i class="aw__dot"></i>'
    + '<span class="aw__val">' + state + '</span></span></div>'
    + '<div class="aw__field"><span class="aw__lbl">Flavor Text</span>' + flavor + '</div>'
    + '<div class="aw__field"><span class="aw__lbl">Effect</span>' + effect + '</div>';
}

const ACTIVE_KEY = 'rod-achievements-active-v1';

function loadActive() {
  try {
    const raw = localStorage.getItem(ACTIVE_KEY);
    const ids = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(ids)) return new Set();
    return new Set(ids.filter((id) => ACHIEVEMENTS.some((a) => a.id === id) && earnedSet.has(id)));
  } catch {
    return new Set();
  }
}

function saveActive(set) {
  try { localStorage.setItem(ACTIVE_KEY, JSON.stringify([...set])); } catch {}
}

export function init(root = document) {
  const host = root.querySelector('.aw');
  if (!host) return;
  const cat = host.querySelector('.aw__cat');
  const detail = host.querySelector('.aw__detail');
  earnedState = loadEarned();
  earnedSet = new Set(earnedState.unlocked || []);
  const active = loadActive();
  let lastHovered = null;

  cat.innerHTML = CAT_ORDER.map((c) => {
    const items = ACHIEVEMENTS.filter((a) => a.cat === c);
    return '<div class="aw__group"><div class="aw__grouplbl">' + CAT_LABEL[c] + ' &middot; ' + items.length + '</div>'
      + '<div class="aw__groupgrid">' + items.map((a) => {
        const unlocked = earnedSet.has(a.id);
        const label = a.title + (unlocked ? '' : ' (locked)');
        const pr = progressFrom(earnedState, a.id);
        const tier = pr ? tierFor(pr[0], pr[1]) : (unlocked ? 'gold' : 'bronze');
        return '<button type="button" class="aw__tile tilt" data-id="' + a.id + '" data-tier="' + tier + '"'
          + ' aria-pressed="' + (active.has(a.id) ? 'true' : 'false') + '"'
          + (unlocked ? '' : ' aria-disabled="true"')
          + '><span aria-hidden="true">' + a.icon + '</span>'
          + '<i class="aw__on" aria-hidden="true">&#9733;</i>'
          + '<span class="aw__sr">' + esc(label) + '</span></button>';
      }).join('') + '</div></div>';
  }).join('');

  const render = () => {
    detail.innerHTML = panelMarkup(lastHovered, lastHovered && active.has(lastHovered.id));
  };
  render();

  const read = (el) => {
    const a = ACHIEVEMENTS.find((x) => x.id === el.dataset.id);
    if (a) { lastHovered = a; render(); }
  };

  cat.addEventListener('pointerover', (e) => {
    const t = e.target.closest('.aw__tile');
    if (t) read(t);
  });
  cat.addEventListener('focusin', (e) => {
    const t = e.target.closest('.aw__tile');
    if (t) read(t);
  });

  cat.addEventListener('click', (e) => {
    const t = e.target.closest('.aw__tile');
    if (!t) return;
    if (t.getAttribute('aria-disabled') === 'true') { read(t); return; }
    const on = t.getAttribute('aria-pressed') !== 'true';
    t.setAttribute('aria-pressed', String(on));
    if (on) active.add(t.dataset.id); else active.delete(t.dataset.id);
    saveActive(active);
    startOrbit();
    if (!on) { t.style.removeProperty('--mx'); t.style.removeProperty('--my'); }
    read(t);
  });

  const ORBIT_MS = (parseFloat(getComputedStyle(host).getPropertyValue('--aw-orbit')) || 2.8) * 1000;
  let raf = 0;
  const orbit = (t) => {
    if (!active.size) { raf = 0; return; }
    const phase = (t % ORBIT_MS) / ORBIT_MS * 4;
    const leg = Math.floor(phase), f = phase - leg;
    const pts = [[0, 0], [100, 0], [100, 100], [0, 100], [0, 0]];
    const [x0, y0] = pts[leg], [x1, y1] = pts[leg + 1];
    const mx = (x0 + (x1 - x0) * f) + '%';
    const my = (y0 + (y1 - y0) * f) + '%';
    cat.querySelectorAll('.aw__tile[aria-pressed="true"]').forEach((tile) => {
      tile.style.setProperty('--mx', mx);
      tile.style.setProperty('--my', my);
    });
    raf = requestAnimationFrame(orbit);
  };
  const startOrbit = () => { if (!raf && active.size) raf = requestAnimationFrame(orbit); };
  startOrbit();

  const tiles = [...cat.querySelectorAll('.aw__tile')];
  onCursor((cx, cy) => {
    for (const tile of tiles) {
      if (tile.getAttribute('aria-pressed') === 'true') continue;
      const r = tile.getBoundingClientRect();
      tile.style.setProperty('--mx', (cx - r.left) + 'px');
      tile.style.setProperty('--my', (cy - r.top) + 'px');
    }
  });
}
