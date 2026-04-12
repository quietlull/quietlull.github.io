/**
 * Achievement system: tracks visitor progress and shows toast
 * notifications when milestones are unlocked.
 */
import { STORAGE_KEYS } from '../config/storage-keys';

export function initAchievements() {
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const STORAGE_KEY = STORAGE_KEYS.ACHIEVEMENTS;

  const ACHIEVEMENTS = [
    {
      id: 'first-light',
      title: 'First Light',
      desc: 'Welcome to the portfolio!',
      icon: '\u{1F3EE}',
      check: (state) => state.visited.length === 1
    },
    {
      id: 'explorer',
      title: 'Explorer',
      desc: 'Visited both worlds',
      icon: '\u{1F9ED}',
      check: (state) =>
        state.visited.some((p) => p.includes('/tech-art/')) &&
        state.visited.some((p) => p.includes('/game-design/'))
    },
    {
      id: 'scholar',
      title: 'Scholar',
      desc: 'Read an article to the end',
      icon: '\u{1F4DC}',
      check: (state) => state.scrolledToEnd
    },
    {
      id: 'curator',
      title: 'Curator',
      desc: 'Viewed 5 projects',
      icon: '\u{1F3A8}',
      check: (state) =>
        state.visited.filter((p) => p.includes('/posts/')).length >= 5
    },
    {
      id: 'lantern-keeper',
      title: 'Lantern Keeper',
      desc: 'Embraced the glow',
      icon: '\u2728',
      check: (state) => state.breathingEnabled
    }
  ];

  // ── State management ──────────────────────────────────────
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          unlocked: parsed.unlocked || [],
          visited: parsed.visited || [],
          scrolledToEnd: !!parsed.scrolledToEnd,
          breathingEnabled: !!parsed.breathingEnabled
        };
      }
    } catch (_) {
      // Corrupt or unavailable storage — start fresh
    }
    return {
      unlocked: [],
      visited: [],
      scrolledToEnd: false,
      breathingEnabled: false
    };
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {
      // Storage full or unavailable
    }
  }

  // ── Toast system ──────────────────────────────────────────
  const activeToasts = [];

  function showToast(achievement) {
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML =
      '<span class="toast-icon">' + achievement.icon + '</span>' +
      '<div class="toast-content">' +
        '<div class="toast-title">' + achievement.title + '</div>' +
        '<div class="toast-desc">' + achievement.desc + '</div>' +
      '</div>';

    // Offset for stacking
    const offset = activeToasts.length * 80;
    toast.style.bottom = (20 + offset) + 'px';

    if (reducedMotion) {
      toast.style.opacity = '1';
    }

    document.body.appendChild(toast);
    activeToasts.push(toast);

    // Exit after 4s
    setTimeout(() => {
      toast.classList.add('toast-exit');

      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
        const idx = activeToasts.indexOf(toast);
        if (idx !== -1) activeToasts.splice(idx, 1);
      }, 300);
    }, 4000);
  }

  // ── Check achievements ────────────────────────────────────
  function checkAchievements(state) {
    for (const achievement of ACHIEVEMENTS) {
      if (
        !state.unlocked.includes(achievement.id) &&
        achievement.check(state)
      ) {
        state.unlocked.push(achievement.id);
        saveState(state);
        showToast(achievement);
      }
    }
  }

  // ── Init ──────────────────────────────────────────────────
  const state = loadState();

  // Track current page visit
  const pathname = window.location.pathname;
  if (!state.visited.includes(pathname)) {
    state.visited.push(pathname);
    saveState(state);
  }

  // Initial check
  checkAchievements(state);

  // ── Scroll tracking for "Scholar" ─────────────────────────
  const postContent = document.querySelector('.post-content-container') || document.querySelector('.post-content');
  if (postContent) {
    function onScroll() {
      const rect = postContent.getBoundingClientRect();
      const scrolled = window.scrollY + window.innerHeight;
      const target = postContent.offsetTop + postContent.offsetHeight * 0.9;

      if (scrolled >= target && !state.scrolledToEnd) {
        state.scrolledToEnd = true;
        saveState(state);
        checkAchievements(state);
        window.removeEventListener('scroll', onScroll);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ── Breathing toggle for "Lantern Keeper" ─────────────────
  const breathingToggle = document.getElementById('breathing-toggle');
  if (breathingToggle) {
    breathingToggle.addEventListener('change', () => {
      if (breathingToggle.checked && !state.breathingEnabled) {
        state.breathingEnabled = true;
        saveState(state);
        checkAchievements(state);
      }
    });
  }
}
