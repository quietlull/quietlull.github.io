# Comments removed from `_javascript/modules/components/achievements.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `import { STORAGE_KEYS } from '../config/storage-keys';`

```text
Achievement system: tracks visitor progress and shows toast
notifications when milestones are unlocked.

Integration: other modules dispatch custom events on `document`:
  - 'achievement:firework'      (firework launched)
  - 'achievement:codecopy'      (code block copied)
  - 'achievement:imageenlarge'   (lightbox opened)
  - 'achievement:fireflytouched' (firefly clicked)
  - 'achievement:lanternknock'   (3D lantern clicked)
  - 'achievement:toolhover'      { detail: toolName }
```

### Line 15, above `// Categories: explorer, reader, interactor, secret, meta`

```text
── Achievement definitions ─────────────────────────────────────
```

### Line 16, above `const ACHIEVEMENTS = [`

```text
Categories: explorer, reader, interactor, secret, meta
```

### Line 18, above `//             'site' = needs portal/about/ramblings, 'meta' = depends on other achievements`

```text
Scope tags: 'section' = achievable from one section, 'cross' = needs both sections,
```

### Line 19, above `// ── Explorer ──`

```text
'site' = needs portal/about/ramblings, 'meta' = depends on other achievements
```

### Line 21, above `{ id: 'first-light',    cat: 'explorer', scope: 'section', title: 'First Light',       desc: 'Welcome to the p`

```text
── Explorer ──
```

### Line 39, above `{ id: 'scholar',        cat: 'reader',   scope: 'section', title: 'Scholar',           desc: 'Read an article `

```text
── Reader ──
```

### Line 53, above `{ id: 'pyrotechnician', cat: 'interactor', scope: 'section', title: 'Pyrotechnician',  desc: 'Launched 50 fire`

```text
── Interactor ──
```

### Line 65, above `{ id: 'lantern-tapper',  cat: 'interactor', scope: 'section', title: 'Lantern Tapper',  desc: 'Knocked 25 lant`

```text
── Lantern progression ──
```

### Line 73, above `{ id: 'night-owl',      cat: 'secret',   scope: 'section', title: 'Night Owl',         desc: 'Visited between `

```text
── Secret ──
```

### Line 79, above `{ id: 'getting-started',  cat: 'meta', scope: 'meta', title: 'Getting Started',  desc: 'Unlocked 5 achievement`

```text
── Meta (tiered completion) ──
```

### Line 97, above `const DEFAULT_STATE = {`

```text
── State ───────────────────────────────────────────────────────
```

### Line 101, on the line `pagesScrolledToEnd: [],`

```text
array of paths (migrated from boolean scrolledToEnd)
```

### Line 112, on the line `toolsHoveredSet: [],`

```text
which tools have been hovered on current page
```

### Line 120, above `// pagesScrolledToEnd array must be earned fresh)`

```text
Merge saved state over defaults (old boolean scrolledToEnd is ignored —
```

### Line 121, above `return { ...DEFAULT_STATE, ...parsed };`

```text
pagesScrolledToEnd array must be earned fresh)
```

### Line 131, on the line `} catch {  }`

```text
storage full
```

### Line 134, above `const activeToasts = [];`

```text
── Toast system ────────────────────────────────────────────────
```

### Line 156, above `if (typeof window.sparklerBurst === 'function') {`

```text
Sparkler burst at toast position
```

### Line 172, above `function checkAchievements(state) {`

```text
── Achievement checking ────────────────────────────────────────
```

### Line 183, above `if (newUnlocks > 0) {`

```text
Re-check meta achievements if we unlocked something (meta depends on unlock count)
```

### Line 193, above `renderTrophyCase(state);`

```text
The trophy wall IS the payoff (D28: every reward is scrapped)
```

### Line 197, above `function renderTrophyCase(state) {`

```text
── Trophy case (About page) ──────────────────────────────────
```

### Line 211, above `for (const a of ACHIEVEMENTS) {`

```text
ACHIEVEMENTS array is already ordered by category — render flat
```

### Line 239, above `function bump(state, mutator) {`

```text
Helper: update state, save, and re-check
```

### Line 246, above `function setupTrackers(state) {`

```text
── Trackers ────────────────────────────────────────────────────
```

### Line 250, above `if (!state.visited.includes(pathname)) {`

```text
── Page visit tracking ──
```

### Line 256, above `const hour = new Date().getHours();`

```text
── Time-of-day ──
```

### Line 267, above `// Guard: only run on actual post pages (must have article + post-content-container)`

```text
── Scroll-to-end tracking (posts only) ──
```

### Line 268, above `const isPostPage = !!document.querySelector('article') && !!document.querySelector('.post-content-container');`

```text
Guard: only run on actual post pages (must have article + post-content-container)
```

### Line 272, on the line `const initialScroll = window.scrollY;`

```text
capture load position
```

### Line 276, above `// (not abs) so mobile scroll-restoration / address-bar jumps on page`

```text
Require real DOWNWARD user scrolling before checking. Directional
```

### Line 277, above `// load don't count as "reading to the end" and fire the achievement.`

```text
(not abs) so mobile scroll-restoration / address-bar jumps on page
```

### Line 278, above `if (!hasScrolled) {`

```text
load don't count as "reading to the end" and fire the achievement.
```

### Line 291, above `const tagEls = document.querySelectorAll('.post-tag, .pin-tag, a[href*="/tags/"]');`

```text
Collect tags from the page
```

### Line 308, above `document.addEventListener('achievement:firework', () => {`

```text
── Firework counter ──
```

### Line 313, above `document.addEventListener('achievement:codecopy', () => {`

```text
── Code copy ──
```

### Line 320, above `document.addEventListener('achievement:imageenlarge', () => {`

```text
── Image enlarge ──
```

### Line 327, above `document.addEventListener('achievement:fireflytouched', () => {`

```text
── Firefly touched ──
```

### Line 334, above `document.addEventListener('achievement:lanternknock', () => {`

```text
── Lantern knock ──
```

### Line 339, above `const toolIcons = document.querySelectorAll('.tool-icon');`

```text
── Tool hover tracking ──
```

### Line 361, above `const avatar = document.getElementById('avatar');`

```text
── Avatar hover time ──
```

### Line 369, on the line `if (elapsed > 0.1) {`

```text
ignore micro-hovers
```

### Line 376, above `avatar.addEventListener('click', flushAvatarHover);`

```text
Also flush on click (avatar is a link — navigates away before mouseleave fires)
```

### Line 382, above `function createDebugPanel(state) {`

```text
── Debug panel ─────────────────────────────────────────────────
```

### Line 385, on the line `if (panel) { panel.remove(); return; }`

```text
Toggle off
```

### Line 405, above `html += '<div class="achv-debug-counters">' +`

```text
Counters
```

### Line 422, above `for (const [cat, label] of Object.entries(CATEGORY_LABELS)) {`

```text
Achievements by category
```

### Line 442, above `panel.querySelector('#achv-close').onclick = () => panel.remove();`

```text
Event handlers
```

### Line 474, above `export function initAchievements() {`

```text
── Main init ───────────────────────────────────────────────────
```

### Line 482, above `document.addEventListener('keydown', (e) => {`

```text
Debug panel: Ctrl+Shift+A
```

### Line 490, above `window.__achievements = {`

```text
Expose for console debugging
```
