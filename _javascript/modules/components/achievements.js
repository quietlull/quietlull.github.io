/**
 * Achievement system: tracks visitor progress and shows toast
 * notifications when milestones are unlocked.
 *
 * Integration: other modules dispatch custom events on `document`:
 *   - 'achievement:firework'      (firework launched)
 *   - 'achievement:codecopy'      (code block copied)
 *   - 'achievement:imageenlarge'   (lightbox opened)
 *   - 'achievement:fireflytouched' (firefly clicked)
 *   - 'achievement:lanternknock'   (3D lantern clicked)
 *   - 'achievement:toolhover'      { detail: toolName }
 */
import { STORAGE_KEYS } from '../config/storage-keys';

// ── Achievement definitions ─────────────────────────────────────
// Categories: explorer, reader, interactor, secret, meta
const ACHIEVEMENTS = [
  // Scope tags: 'section' = achievable from one section, 'cross' = needs both sections,
  //             'site' = needs portal/about/ramblings, 'meta' = depends on other achievements

  // ── Explorer ──
  { id: 'first-light',    cat: 'explorer', scope: 'section', title: 'First Light',       desc: 'Welcome to the portfolio!',          icon: '\u{1F3EE}',
    check: (s) => s.visited.length >= 1 },
  { id: 'explorer',       cat: 'explorer', scope: 'cross',   title: 'Explorer',          desc: 'Visited both worlds',                icon: '\u{1F9ED}',
    check: (s) => s.visited.some(p => p.includes('/tech-art/')) && s.visited.some(p => p.includes('/game-design/')) },
  { id: 'curator',        cat: 'explorer', scope: 'section', title: 'Curator',           desc: 'Viewed 5 projects',                  icon: '\u{1F3A8}',
    check: (s) => s.visited.filter(p => p.includes('/posts/')).length >= 5 },
  { id: 'cartographer',   cat: 'explorer', scope: 'section', title: 'Cartographer',      desc: 'Visited 10 unique pages',            icon: '\u{1F5FA}',
    check: (s) => s.visited.length >= 10 },
  { id: 'deep-diver',     cat: 'explorer', scope: 'section', title: 'Deep Diver',        desc: 'Scrolled to the bottom of 5 pages',  icon: '\u{1F9FF}',
    check: (s) => s.pagesScrolledToEnd.length >= 5 },
  { id: 'the-nether',     cat: 'explorer', scope: 'site',    title: 'The Nether',        desc: 'Entered the portal',                 icon: '\u{1F30C}',
    check: (s) => s.visited.some(p => p === '/' || p === '/portal/' || p === '/portal') },
  { id: 'behind-curtain', cat: 'explorer', scope: 'site',    title: 'Behind the Curtain', desc: 'Found the person behind the work',  icon: '\u{1F3AD}',
    check: (s) => s.visited.some(p => p.includes('/about')) },
  { id: 'rabbit-hole',    cat: 'secret',   scope: 'site',    title: 'Down the Rabbit Hole', desc: 'Discovered the ramblings',        icon: '\u{1F407}',
    check: (s) => s.visited.some(p => p.includes('/ramblings') || p.includes('/blog')) },

  // ── Reader ──
  { id: 'scholar',        cat: 'reader',   scope: 'section', title: 'Scholar',           desc: 'Read an article to the end',         icon: '\u{1F4DC}',
    check: (s) => s.pagesScrolledToEnd.length >= 1 },
  { id: 'bookworm',       cat: 'reader',   scope: 'section', title: 'Bookworm',          desc: 'Read 3 articles to the end',         icon: '\u{1F4DA}',
    check: (s) => s.pagesScrolledToEnd.length >= 3 },
  { id: 'well-rounded',   cat: 'reader',   scope: 'section', title: 'Well-Rounded',      desc: 'Read posts from 5 different tags',   icon: '\u{1F4D6}',
    check: (s) => s.tagsRead.length >= 5, progress: (s) => [s.tagsRead.length, 5] },
  { id: 'connoisseur',    cat: 'reader',   scope: 'section', title: 'Connoisseur',       desc: 'Read posts from 10 different tags',  icon: '\u{1F9D0}',
    check: (s) => s.tagsRead.length >= 10, progress: (s) => [s.tagsRead.length, 10] },
  { id: 'completionist',  cat: 'reader',   scope: 'cross',   title: 'Completionist',     desc: 'Read a post from every tag',         icon: '\u{1F451}',
    check: (s) => s.tagsRead.length >= 15, progress: (s) => [s.tagsRead.length, 15] },
  { id: 'zoom-enhance',   cat: 'reader',   scope: 'section', title: 'Zoom Enhance',      desc: 'Clicked an image to enlarge it',     icon: '\u{1F50D}',
    check: (s) => s.imageEnlarged },

  // ── Interactor ──
  { id: 'pyrotechnician', cat: 'interactor', scope: 'section', title: 'Pyrotechnician',  desc: 'Launched 50 fireworks',              icon: '\u{1F386}',
    check: (s) => s.fireworkCount >= 50, progress: (s) => [s.fireworkCount, 50], reward: 'auto-fireworks' },
  { id: 'toolsmith',      cat: 'interactor', scope: 'section', title: 'Toolsmith',       desc: 'Hovered every tool on a landing page', icon: '\u{1F6E0}',
    check: (s) => s.allToolsHovered },
  { id: 'copy-that',      cat: 'interactor', scope: 'section', title: 'Copy That',       desc: 'Used the code copy button',          icon: '\u{1F4CB}',
    check: (s) => s.codeCopied },
  { id: 'fan-club',       cat: 'interactor', scope: 'section', title: 'Fan Club',        desc: 'Spent quality time with the avatar', icon: '\u{2B50}',
    check: (s) => s.avatarHoverTime >= 10, progress: (s) => [Math.min(s.avatarHoverTime, 10), 10] },
  { id: 'touched-my-fly', cat: 'interactor', scope: 'section', title: 'Hey, You Touched My Fly!', desc: 'Caught a firefly',          icon: '\u{1FAB2}',
    check: (s) => s.fireflyTouched },

  // ── Lantern progression ──
  { id: 'lantern-tapper',  cat: 'interactor', scope: 'section', title: 'Lantern Tapper',  desc: 'Knocked 25 lanterns',               icon: '\u{1F3EE}',
    check: (s) => s.lanternKnocks >= 25, progress: (s) => [s.lanternKnocks, 25], reward: 'lantern-shape' },
  { id: 'lantern-painter', cat: 'interactor', scope: 'section', title: 'Lantern Painter', desc: 'Knocked 50 lanterns',               icon: '\u{1F308}',
    check: (s) => s.lanternKnocks >= 50, progress: (s) => [s.lanternKnocks, 50], reward: 'lantern-color' },
  { id: 'lantern-master',  cat: 'interactor', scope: 'section', title: 'Lantern Master',  desc: 'Knocked 100 lanterns',              icon: '\u{1FA94}',
    check: (s) => s.lanternKnocks >= 100, progress: (s) => [s.lanternKnocks, 100], reward: 'lantern-panel' },

  // ── Secret ──
  { id: 'night-owl',      cat: 'secret',   scope: 'section', title: 'Night Owl',         desc: 'Visited between midnight and 4am',   icon: '\u{1F989}',
    check: (s) => s.nightOwl },
  { id: 'early-bird',     cat: 'secret',   scope: 'section', title: 'Early Bird',        desc: 'Visited between 5am and 7am',        icon: '\u{1F426}',
    check: (s) => s.earlyBird },

  // ── Meta (tiered completion) ──
  { id: 'getting-started',  cat: 'meta', scope: 'meta', title: 'Getting Started',  desc: 'Unlocked 5 achievements',                          icon: '\u{1F31F}',
    check: (s) => s.unlocked.length >= 5, progress: (s) => [s.unlocked.length, 5] },
  { id: 'collector',        cat: 'meta', scope: 'meta', title: 'Collector',        desc: 'Unlocked 15 achievements',                         icon: '\u{1F3C6}',
    check: (s) => s.unlocked.length >= 15, progress: (s) => [s.unlocked.length, 15] },
  { id: 'section-clear',    cat: 'meta', scope: 'meta', title: 'Section Clear',    desc: 'All achievements possible from one section',        icon: '\u{1F3AE}',
    check: (s) => { const needed = ACHIEVEMENTS.filter(a => a.scope === 'section'); return needed.every(a => s.unlocked.includes(a.id)); } },
  { id: 'golden-god',       cat: 'meta', scope: 'meta', title: 'Golden God',       desc: 'All section + cross-section achievements',          icon: '\u{1F3C5}',
    check: (s) => { const needed = ACHIEVEMENTS.filter(a => a.scope === 'section' || a.scope === 'cross'); return needed.every(a => s.unlocked.includes(a.id)); } },
  { id: '1001-percent',     cat: 'meta', scope: 'meta', title: '1001%',            desc: 'Every. Single. Achievement.',                       icon: '\u{1F48E}',
    check: (s) => s.unlocked.length >= ACHIEVEMENTS.length - 1 },
];

const CATEGORY_LABELS = {
  explorer: 'Explorer', reader: 'Reader', interactor: 'Interactor',
  secret: 'Secret', meta: 'Meta'
};

// ── State ───────────────────────────────────────────────────────
const DEFAULT_STATE = {
  unlocked: [],
  visited: [],
  pagesScrolledToEnd: [],  // array of paths (migrated from boolean scrolledToEnd)
  tagsRead: [],
  fireworkCount: 0,
  lanternKnocks: 0,
  codeCopied: false,
  imageEnlarged: false,
  fireflyTouched: false,
  allToolsHovered: false,
  avatarHoverTime: 0,
  nightOwl: false,
  earlyBird: false,
  breathingEnabled: false,  // kept for backwards compat
  toolsHoveredSet: [],      // which tools have been hovered on current page
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    // Merge saved state over defaults (old boolean scrolledToEnd is ignored —
    // pagesScrolledToEnd array must be earned fresh)
    const state = { ...DEFAULT_STATE, ...parsed };
    return state;
  } catch (_) {
    return { ...DEFAULT_STATE };
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(state));
  } catch (_) { /* storage full */ }
}

// ── Toast system ────────────────────────────────────────────────
const activeToasts = [];
const reducedMotion = typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function showToast(achievement) {
  const toast = document.createElement('div');
  toast.className = 'achievement-toast';
  toast.innerHTML =
    '<span class="toast-icon">' + achievement.icon + '</span>' +
    '<div class="toast-content">' +
      '<div class="toast-title">' + achievement.title + '</div>' +
      '<div class="toast-desc">' + achievement.desc + '</div>' +
    '</div>';

  const offset = activeToasts.length * 80;
  toast.style.bottom = (20 + offset) + 'px';
  if (reducedMotion) toast.style.opacity = '1';

  document.body.appendChild(toast);
  activeToasts.push(toast);

  // Sparkler burst at toast position
  if (typeof window.sparklerBurst === 'function') {
    const rect = toast.getBoundingClientRect();
    window.sparklerBurst(rect.left + rect.width / 2, rect.top);
  }

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
      const idx = activeToasts.indexOf(toast);
      if (idx !== -1) activeToasts.splice(idx, 1);
    }, 300);
  }, 4000);
}

// ── Achievement checking ────────────────────────────────────────
function checkAchievements(state) {
  let newUnlocks = 0;
  for (const a of ACHIEVEMENTS) {
    if (!state.unlocked.includes(a.id) && a.check(state)) {
      state.unlocked.push(a.id);
      saveState(state);
      showToast(a);
      newUnlocks++;
      // Apply rewards
      if (a.reward === 'auto-fireworks') {
        // Pyrotechnician unlocks auto-fireworks
        document.dispatchEvent(new CustomEvent('achievement:reward', { detail: { type: 'auto-fireworks' } }));
      }
    }
  }
  // Re-check meta achievements if we unlocked something (meta depends on unlock count)
  if (newUnlocks > 0) {
    for (const a of ACHIEVEMENTS.filter(a => a.cat === 'meta')) {
      if (!state.unlocked.includes(a.id) && a.check(state)) {
        state.unlocked.push(a.id);
        saveState(state);
        showToast(a);
      }
    }
  }
}

// Helper: update state, save, and re-check
function bump(state, mutator) {
  mutator(state);
  saveState(state);
  checkAchievements(state);
}

// ── Trackers ────────────────────────────────────────────────────
function setupTrackers(state) {
  const pathname = window.location.pathname;

  // ── Page visit tracking ──
  if (!state.visited.includes(pathname)) {
    state.visited.push(pathname);
    saveState(state);
  }

  // ── Time-of-day ──
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 4 && !state.nightOwl) {
    state.nightOwl = true;
    saveState(state);
  }
  if (hour >= 5 && hour < 7 && !state.earlyBird) {
    state.earlyBird = true;
    saveState(state);
  }

  // ── Scroll-to-end tracking (posts only) ──
  // Guard: only run on actual post pages (must have article + post-content-container)
  const isPostPage = !!document.querySelector('article') && !!document.querySelector('.post-content-container');
  if (isPostPage) {
    const postContent = document.querySelector('.post-content-container');
    const initialScroll = window.scrollY;  // capture load position
    let hasScrolled = false;

    function onScrollEnd() {
      // Require at least 200px of actual scrolling before checking
      if (!hasScrolled) {
        if (Math.abs(window.scrollY - initialScroll) > 200) {
          hasScrolled = true;
        } else {
          return;
        }
      }
      const scrolled = window.scrollY + window.innerHeight;
      const target = postContent.offsetTop + postContent.offsetHeight * 0.9;
      if (scrolled >= target && !state.pagesScrolledToEnd.includes(pathname)) {
        bump(state, (s) => {
          s.pagesScrolledToEnd.push(pathname);
          // Collect tags from the page
          const tagEls = document.querySelectorAll('.post-tag, .pin-tag, a[href*="/tags/"]');
          const pageTags = new Set();
          tagEls.forEach(el => {
            const tag = el.textContent.trim().toLowerCase().replace(/^#/, '');
            if (tag && tag !== 'project') pageTags.add(tag);
          });
          pageTags.forEach(t => {
            if (!s.tagsRead.includes(t)) s.tagsRead.push(t);
          });
        });
        window.removeEventListener('scroll', onScrollEnd);
      }
    }
    window.addEventListener('scroll', onScrollEnd, { passive: true });
  }

  // ── Firework counter ──
  document.addEventListener('achievement:firework', () => {
    bump(state, (s) => { s.fireworkCount++; });
  });

  // ── Code copy ──
  document.addEventListener('achievement:codecopy', () => {
    if (!state.codeCopied) {
      bump(state, (s) => { s.codeCopied = true; });
    }
  });

  // ── Image enlarge ──
  document.addEventListener('achievement:imageenlarge', () => {
    if (!state.imageEnlarged) {
      bump(state, (s) => { s.imageEnlarged = true; });
    }
  });

  // ── Firefly touched ──
  document.addEventListener('achievement:fireflytouched', () => {
    if (!state.fireflyTouched) {
      bump(state, (s) => { s.fireflyTouched = true; });
    }
  });

  // ── Lantern knock ──
  document.addEventListener('achievement:lanternknock', () => {
    bump(state, (s) => { s.lanternKnocks++; });
  });

  // ── Tool hover tracking ──
  const toolIcons = document.querySelectorAll('.tool-icon');
  if (toolIcons.length > 0) {
    const hoveredTools = new Set(state.toolsHoveredSet || []);
    const totalTools = toolIcons.length;

    toolIcons.forEach(icon => {
      const toolName = icon.getAttribute('title') || icon.textContent.trim();
      icon.addEventListener('mouseenter', () => {
        if (!hoveredTools.has(toolName)) {
          hoveredTools.add(toolName);
          state.toolsHoveredSet = Array.from(hoveredTools);
          if (hoveredTools.size >= totalTools && !state.allToolsHovered) {
            bump(state, (s) => { s.allToolsHovered = true; });
          } else {
            saveState(state);
          }
        }
      }, { passive: true });
    });
  }

  // ── Avatar hover time ──
  const avatar = document.getElementById('avatar');
  if (avatar) {
    let hoverStart = 0;
    function flushAvatarHover() {
      if (hoverStart > 0) {
        const elapsed = (Date.now() - hoverStart) / 1000;
        hoverStart = 0;
        if (elapsed > 0.1) { // ignore micro-hovers
          bump(state, (s) => { s.avatarHoverTime = Math.round((s.avatarHoverTime + elapsed) * 10) / 10; });
        }
      }
    }
    avatar.addEventListener('mouseenter', () => { hoverStart = Date.now(); }, { passive: true });
    avatar.addEventListener('mouseleave', flushAvatarHover, { passive: true });
    // Also flush on click (avatar is a link — navigates away before mouseleave fires)
    avatar.addEventListener('click', flushAvatarHover);
    window.addEventListener('beforeunload', flushAvatarHover);
  }

  // ── Breathing toggle (legacy, kept for Lantern Keeper if re-added) ──
  const breathingToggle = document.getElementById('breathing-toggle');
  if (breathingToggle) {
    breathingToggle.addEventListener('change', () => {
      if (breathingToggle.checked && !state.breathingEnabled) {
        bump(state, (s) => { s.breathingEnabled = true; });
      }
    });
  }
}

// ── Debug panel ─────────────────────────────────────────────────
function createDebugPanel(state) {
  let panel = document.getElementById('achievement-debug');
  if (panel) { panel.remove(); return; } // Toggle off

  panel = document.createElement('div');
  panel.id = 'achievement-debug';

  function render() {
    const cats = {};
    ACHIEVEMENTS.forEach(a => {
      if (!cats[a.cat]) cats[a.cat] = [];
      cats[a.cat].push(a);
    });

    let html = '<div class="achv-debug-header">' +
      '<h3>Achievements (' + state.unlocked.length + '/' + ACHIEVEMENTS.length + ')</h3>' +
      '<div class="achv-debug-actions">' +
        '<button id="achv-unlock-all">Unlock All</button>' +
        '<button id="achv-reset-all">Reset All</button>' +
        '<button id="achv-close">\u2715</button>' +
      '</div></div>';

    // Counters
    html += '<div class="achv-debug-counters">' +
      '<div>Pages: <b>' + state.visited.length + '</b></div>' +
      '<div>Read to end: <b>' + state.pagesScrolledToEnd.length + '</b></div>' +
      '<div>Tags read: <b>' + state.tagsRead.length + '/15</b> <span class="achv-debug-small">' + state.tagsRead.join(', ') + '</span></div>' +
      '<div>Fireworks: <b>' + state.fireworkCount + '/50</b></div>' +
      '<div>Lantern knocks: <b>' + state.lanternKnocks + '/100</b></div>' +
      '<div>Avatar hover: <b>' + state.avatarHoverTime.toFixed(1) + 's/10s</b></div>' +
      '<div>Tools hovered: <b>' + (state.toolsHoveredSet || []).length + '</b></div>' +
      '<div>Flags: ' +
        (state.codeCopied ? '\u2705' : '\u274C') + ' copy ' +
        (state.imageEnlarged ? '\u2705' : '\u274C') + ' image ' +
        (state.fireflyTouched ? '\u2705' : '\u274C') + ' firefly ' +
        (state.nightOwl ? '\u2705' : '\u274C') + ' night ' +
        (state.earlyBird ? '\u2705' : '\u274C') + ' early' +
      '</div></div>';

    // Achievements by category
    for (const [cat, label] of Object.entries(CATEGORY_LABELS)) {
      if (!cats[cat]) continue;
      html += '<div class="achv-debug-cat"><h4>' + label + '</h4>';
      for (const a of cats[cat]) {
        const unlocked = state.unlocked.includes(a.id);
        const progressInfo = a.progress ? a.progress(state) : null;
        const progStr = progressInfo ? ' (' + progressInfo[0] + '/' + progressInfo[1] + ')' : '';
        html += '<div class="achv-debug-row ' + (unlocked ? 'unlocked' : '') + '">' +
          '<span class="achv-debug-icon">' + (cat === 'secret' && !unlocked ? '?' : a.icon) + '</span>' +
          '<span class="achv-debug-name">' + (cat === 'secret' && !unlocked ? '???' : a.title) + '</span>' +
          '<span class="achv-debug-prog">' + progStr + '</span>' +
          '<button class="achv-debug-toggle" data-id="' + a.id + '">' + (unlocked ? 'Lock' : 'Unlock') + '</button>' +
        '</div>';
      }
      html += '</div>';
    }

    panel.innerHTML = html;

    // Event handlers
    panel.querySelector('#achv-close').onclick = () => panel.remove();
    panel.querySelector('#achv-unlock-all').onclick = () => {
      ACHIEVEMENTS.forEach(a => { if (!state.unlocked.includes(a.id)) state.unlocked.push(a.id); });
      saveState(state);
      render();
    };
    panel.querySelector('#achv-reset-all').onclick = () => {
      Object.assign(state, { ...DEFAULT_STATE });
      saveState(state);
      render();
    };
    panel.querySelectorAll('.achv-debug-toggle').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        if (state.unlocked.includes(id)) {
          state.unlocked = state.unlocked.filter(u => u !== id);
        } else {
          state.unlocked.push(id);
          const a = ACHIEVEMENTS.find(a => a.id === id);
          if (a) showToast(a);
        }
        saveState(state);
        render();
      };
    });
  }

  document.body.appendChild(panel);
  render();
}

// ── Main init ───────────────────────────────────────────────────
export function initAchievements() {
  const state = loadState();

  setupTrackers(state);
  checkAchievements(state);

  // Debug panel: Ctrl+Shift+A
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      e.preventDefault();
      createDebugPanel(state);
    }
  });

  // Expose for console debugging
  window.__achievements = {
    state: () => loadState(),
    reset: () => { Object.assign(state, { ...DEFAULT_STATE }); saveState(state); console.log('Achievements reset'); },
    panel: () => createDebugPanel(state),
  };
}
