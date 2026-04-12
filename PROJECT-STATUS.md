# Project Status — Living Document

**Last updated:** 2026-04-12
**Purpose:** Single source of truth for AI sessions. Read this FIRST after context compaction. Run `/sync-docs` after making changes.

---

## Site Overview

**Theme:** Chinese lantern festival / night market portfolio for a Technical Artist & Game Designer.
**Goals:** Get hired. Instant role clarity ("know what you do in 3 seconds"). "Oh that's cool" first impression. Feels personal, not a template. Rewards exploration.
**Stack:** Jekyll (Chirpy theme) + Three.js + Rollup + SCSS + vanilla JS modules
**Worktree:** `C:\Users\Rod\Documents\ProjectFiles\Website\.claude\worktrees\elastic-morse`

---

## Feature Summary

### Visual Effects
| Feature | What it does | Key Files | Status |
|---------|-------------|-----------|--------|
| **Breathing Glow** | 4-tier ambient box-shadow/border animation on glass elements | `_animations.scss`, per-page SCSS | Complete |
| **Sparkler Cursor** | Canvas2D particle trail following mouse, samples colors from hovered elements | `mouse-trail.js` | Complete |
| **Fireworks** | Three.js particle fireworks on click + auto-launch | `firework-controller.js` | Complete |
| **3D Lantern Scene** | Three.js floating lanterns with mouse avoidance, bloom post-processing | `three-background-*.js`, `lantern-controller.js` | Complete |
| **Card Tilt** | 3D perspective tilt on hover (desktop) / gyroscope (mobile) | `card-tilt.js` | Complete |
| **Page Transitions** | Fade-out + sparkler burst on internal navigation | `page-transition.js` | Complete |
| **Lantern Shaders** | Custom GLSL for lantern glow/flicker with color shift | `lanternShader*.js` | Complete |

### Content & Reading
| Feature | What it does | Key Files | Status |
|---------|-------------|-----------|--------|
| **Post Reading Well** | 75ch content width, 92% opaque glass sections, split at h2 | `post-enhance.js`, `_post.scss` | Complete |
| **Reading Progress** | Thin amber bar at top tracking scroll position | `post-enhance.js`, `_post.scss` | Complete |
| **Section Completion Sparks** | Sparkler burst when a content section leaves viewport | `post-enhance.js` | Complete |
| **End-of-Article Confetti** | Physics-based confetti burst at article bottom | `post-enhance.js` | Complete |
| **TOC** | Desktop sidebar + mobile popup, auto-indexed via Tocbot | `toc.js`, `toc-desktop.js`, `toc-mobile.js` | Complete |
| **Image Lightbox** | GLightbox zoom with theme-aware image selection | `img-popup.js` | Complete |
| **Lazy Image Loading** | LQIP blur-fade placeholders, progressive enhancement | `img-loading.js` | Complete |
| **Code Copy** | Copy button on code blocks with sparkler burst feedback | `clipboard.js` | Complete |

### Navigation & Discovery
| Feature | What it does | Key Files | Status |
|---------|-------------|-----------|--------|
| **Portal** | Two-door landing (Tech Art / Game Design) with time-of-day greeting | `portal.html`, `_portal.scss` | Complete |
| **Section Landing** | Per-section hero with tool icon strip + typewriter taglines | `section-landing.html`, `tool-taglines.js` | Complete |
| **Search & Filter** | Client-side title/tag search with filter pills, empty states | `post-filter.js`, `search-display.js` | Complete |
| **Related Posts** | Smart algorithm scoring by shared tags (1pt), section (2pt), category (0.5pt) | `related-posts.html` | Complete |
| **Post Navigation** | Previous/Next + back-to-section with glass effect | `post-paginator.html` | Complete |
| **Category Tree** | Collapsible category list with folder icons | `category-collapse.js` | Complete |
| **Archives Timeline** | Animated timeline dots + year markers | `_archives.scss` | Complete |
| **Back to Top** | Scroll-triggered button with sparkler burst | `back-to-top.js` | Complete |

### System & Polish
| Feature | What it does | Key Files | Status |
|---------|-------------|-----------|--------|
| **Achievements** | 29 achievements across 5 categories, debug panel (Ctrl+Shift+A), event-driven tracking | `achievements.js` | Complete |
| **Breathing Toggle** | Enable/disable all breathing animations, respects prefers-reduced-motion | `breathe-toggle.js`, `_animations.scss` | Complete |
| **Sparkler Toggle** | Enable/disable cursor sparkler effect | `fireworks-toggle.js` (shared pattern) | Complete |
| **Fireworks Toggle** | Enable/disable auto-fireworks | `fireworks-toggle.js` | Complete |
| **Dark/Light Theme** | Theme switcher with system preference detection | `theme.js`, `_dark.scss`, `_light.scss` | Complete |
| **PWA** | Service worker with offline cache + update notifications | `pwa/sw.js`, `pwa/app.js` | Complete |
| **Performance Monitor** | FPS/frame time tracking (debug) — DO NOT REMOVE | `performance-monitor.js` | Complete |
| **Typography** | Outfit (headings) / Plus Jakarta Sans (body) / JetBrains Mono (code/tags) | `_typography.scss` | Complete |
| **Glass Morphism** | Site-wide backdrop-blur + border + shadow on containers | `_mixins.scss`, `_variables.scss` | Complete |
| **Custom Scrollbar** | Amber thumb, dark track, hover glow | Chirpy theme + `_dark.scss` | Complete |

---

## Architecture Overview

### Breathing System
Color-adaptive CSS animations via `--breathe-hue` (RGB triplet, default `251,191,36` gold) and `--breathe-border-hue` (default `245,158,11` amber). Override per-element for orange: `--breathe-hue: 249,115,22; --breathe-border-hue: 234,88,12;`.

**No `-warm` keyframe variants exist.** All color variation is done via CSS variable overrides.

**Stacking bands** — each tier's resting glow >= tier below's peak, so hierarchy never collapses:

| Tier | Keyframe | Outer rest/peak | Inner rest/peak | Border rest/peak | Scale |
|------|----------|----------------|----------------|-----------------|-------|
| T1 Ember | `breathe-ember` | 0.06/0.20 | 0.04/0.12 | 0.10/0.20 | none |
| T2 Glow | `breathe-glow` | 0.18/0.35 | 0.10/0.25 | 0.18/0.28 | none |
| T3 Lantern | `breathe-slow` | 0.30/0.50 | 0.22/0.40 | 0.25/0.35 | none |
| T4 Beacon | `breathe-beacon` | 0.45/0.70 | 0.35/0.55 | 0.30/0.40 | 1.0/1.03 |

**Special keyframes:**
- `throb-glow` — T4-level smooth pulse, used for active nav + breathing toggle
- `throb-dot` — scale 1->1.5 + glow swell, used for icon dots
- `breathe-toggle-glow` — legacy hardcoded gold toggle glow (kept as option)
- `pulse-scale` — opacity+scale pulse (kept for future dot/indicator use)

### Kill Switch
Single shared `$breathe-selectors` Sass list in `_animations.scss`. Used by both:
- `html.no-breathe { }` — manual toggle
- `@media (prefers-reduced-motion)` — OS-level (combined with `$reduced-motion-extras`)

**To add breathing to a new element:**
1. Add animation in element's SCSS file
2. Add selector to `$breathe-selectors` in `_animations.scss`
3. Test toggle off + reduced-motion

### Sparkler Integration
`mouse-trail.js` auto-detects breathing elements by checking `animationName` for `breathe`/`throb` patterns. It walks up the DOM from the hovered element and samples `borderColor` from the first breathing ancestor. No separate selector list to maintain — any element with a breathing animation automatically works with the sparkler.

### JS Module System
48 JS source files (~6,800 lines), 7 Rollup entry points.

**Entry points** (each pulled into a separate bundle):
| Entry | Page type | Key components loaded |
|-------|-----------|----------------------|
| `home.js` | Home / section landing | layout, searchbar, locale |
| `commons.js` | Blog/project lists | layout, post-filter |
| `page.js` | General pages | images, popups, clipboard, mermaid, TOC |
| `post.js` | Post pages | page.js components + post-enhance (sections, progress, confetti, fireflies) |
| `categories.js` | Category page | category-collapse, searchbar |
| `misc.js` | Misc pages | layout, locale |
| `pwa/app.js` | All pages (async) | service worker registration |

**Shared modules:**
- `layouts/basic.js` — initializes mode watcher, breathe/fireworks/sparkler toggles, back-to-top, achievements, card-tilt, tool-taglines, mouse-trail, page-transition
- `config/storage-keys.js` — single source for all localStorage keys
- `utils/color-utils.js` — parseRGB, rgbToHSL, isWarmColor

**Three.js (loaded as separate scripts, not Rollup bundles):**
| Script | Used on | Features |
|--------|---------|----------|
| `three-background-general.js` | Landing, portal, projects | Procedural lanterns + fireworks + mouse avoidance |
| `three-background-scene.js` | About page | FBX lanterns, dock, water reflection, embers, scroll camera |
| `three-background-minimal.js` | Post pages | Embers only, scroll-locked camera, mouse avoidance |

Supporting: `three-config.js` (shared constants), `three-shared.js` (scene setup, camera, FBX loader, lantern spawning, animation loop), `lantern-controller.js` (physics + avoidance + click raycast), `firework-controller.js` (particle system), shaders (`lanternShader.js`, `lanternShaderManager.js`, `mirroredSurface.js`)

### Sass Organization
38 SCSS files (~7,658 lines, excluding vendor).

- **abstracts/** — variables, mixins, placeholders, animations (core foundation)
- **base/** — reset, typography, base element styles
- **components/** — buttons, popups
- **layout/** — topbar, about container, blog/project previews, panel, sidebar
- **pages/** — per-page styles (post, portal, section-landing, projects, archives, tags, categories)
- **themes/** — dark.scss (270 vars), light.scss (185 vars)
- Stagger loops use Sass `@for` with data lists (blog/project previews)

### Unused / Superseded Files
| File | Status | Notes |
|------|--------|-------|
| `_includes/projectfilterandsearch.html` | Unused | Superseded by `filter-pills.html` + inline search in layouts |
| `_layouts/projects.html` | Unused | Superseded by `_layouts/section-projects.html` — no pages use `layout: projects` |
| `@keyframes breathing` in `_animations.scss` | Unused | Zero references anywhere. The `breathe` keyframe (no -ing) IS used by `.card-icon-box` |

---

## Breathing Element Map

### Topbar (`_topbar.scss`)
| Element | Tier | Keyframe | Duration | Hue | Line |
|---------|------|----------|----------|-----|------|
| `#topbar` | T1 | breathe-ember | 6s | gold | 11 |
| `#avatar` | T4 | breathe-beacon | 6.5s | gold | 64 |
| `.nav-link` (default) | T2 | breathe-glow | 8.9s | gold | 136 |
| `.nav-link` nth(2) | T2 | breathe-glow | 7.1s | orange | 175 |
| `.nav-link` nth(3) | T2 | breathe-glow | 9.7s | gold | 176 |
| `.nav-item.active .nav-link` | — | throb-glow | 6.3s | gold | 184 |
| `.topbar-bottom a` (default) | T1 | breathe-ember | 8.3s | gold | 247 |
| `.topbar-bottom a` nth(2) | T1 | breathe-ember | 6.9s | orange | 250 |
| `.topbar-bottom a` nth(3) | T1 | breathe-ember | 7.7s | gold | 251 |
| `.topbar-bottom a` nth(4) | T1 | breathe-ember | 9.1s | orange | 252 |
| breathe-switch track (checked) | — | throb-glow | 5s | gold | 310 |
| sparkler-switch track (checked) | T1 | breathe-ember | 7.9s | orange | 378 |
| fireworks-switch track (checked) | T1 | breathe-ember | 8.3s | orange | 440 |

### Landing Page (`_section-landing.scss`)
| Element | Tier | Keyframe | Duration | Hue | Line |
|---------|------|----------|----------|-----|------|
| `.tool-icon` | T1 | breathe-ember | 8.7s | gold | 90 |
| `.section-icon-box .icon-dot` | — | throb-dot | 2s | gold | 176 |
| `.demo-reel-placeholder` | T2 | breathe-glow | 7.3s | gold | 193 |
| `.demo-reel-embed` | T2 | breathe-glow | 8.1s | gold | 205 |
| `.demo-reel-placeholder i` | — | pulse-slow | 4s | gold | 210 |

### Base Elements (`_base.scss`)
| Element | Tier | Keyframe | Duration | Hue | Line |
|---------|------|----------|----------|-----|------|
| `.section-icon-box` | T4 | breathe-beacon | 4.5s | gold | 532 |
| `.section-icon-box .icon-dot` | — | throb-dot | 2s | gold | 564 |
| `.card-icon-box` | — | breathe | 4s | gold | 578 |

### Cards & Previews
**Blog previews** (`_blogspreview.scss`) — Sass @for loop, 6-child stagger:
| nth | Tier | Duration | Hue |
|-----|------|----------|-----|
| 6n+1 | T3 | 6s | gold |
| 6n+2 | T3 | 5s | orange |
| 6n+3 | T3 | 7s | gold |
| 6n+4 | T3 | 7.5s | orange |
| 6n+5 | T3 | 6.5s | gold |
| 6n+6 | T3 | 5.5s | orange |

**Project cards** (`_projectspreview.scss`) — same pattern, different durations:
| nth | Tier | Duration | Hue |
|-----|------|----------|-----|
| 6n+1 | T3 | 5.5s | gold |
| 6n+2 | T3 | 7s | orange |
| 6n+3 | T3 | 6s | gold |
| 6n+4 | T3 | 5s | orange |
| 6n+5 | T3 | 7.5s | gold |
| 6n+6 | T3 | 6.5s | orange |

### Portal (`_portal.scss`)
| Element | Tier | Keyframe | Duration | Hue | Line |
|---------|------|----------|----------|-----|------|
| `.portal-door` (tech-art) | T3 | breathe-slow | 6s | gold | 89 |
| `.portal-door` (game-design) | T3 | breathe-slow | 6.5s | orange | 96 |
| `.portal-side-link` | T2 | breathe-glow | 7.7s | gold | 173 |

### Post Pages (`_post.scss`)
| Element | Tier | Keyframe | Duration | Hue | Line |
|---------|------|----------|----------|-----|------|
| `article > header` | T3 | breathe-slow | 6.7s | orange | 25 |
| `.post-tldr` | T3 | breathe-slow | 8.1s | orange | 53 |
| `.post-takeaway` | T3 | breathe-slow | 9.3s | gold | 82 |
| `.meta-chip` | T1 | breathe-ember | 6.3s | gold | 149 |
| `.post-nav-card` (prev) | T2 | breathe-glow | 7.9s | gold | 339 |
| `.post-nav-card` (next) | T2 | breathe-glow | 8.3s | orange | 534 |
| `.post-content-container` | T3 | breathe-slow | 6.7s | gold | 625 |
| `.post-section` | T3 | breathe-slow | 7.9s | gold | 736 |
| `#toc-solo-trigger` | T3 | breathe-slow | 7.3s | gold | 790 |

### Projects Page (`_projects.scss`)
| Element | Tier | Keyframe | Duration | Hue | Line |
|---------|------|----------|----------|-----|------|
| `.blog-controls` | T3 | breathe-slow | 7s | gold | 36 |

### About Page (`_aboutmecontainer.scss`)
| Element | Tier | Keyframe | Duration | Hue | Line |
|---------|------|----------|----------|-----|------|
| `#landing-box::before` | — | pulse-slow | 5s | gold | 80 |
| `#landing-box::after` | — | pulse-slow | 5s | gold | 100 |
| `#landing-box > .text-container` | T3 | breathe-slow | 6.5s | gold | 120 |
| `.about-text .text-container` | T3 | breathe-slow | 5.5s | orange | 132 |
| `.additional-content .text-container` | T3 | breathe-slow | 7s | gold | 143 |

### Other
| Element | Tier | Keyframe | Duration | File | Line |
|---------|------|----------|----------|------|------|
| `#searchbar-wrapper` | T1 | breathe-ember | 9.1s | _searchbar.scss | 13 |
| `#back-to-top.show` | T1 | breathe-ember | 8.3s | _buttons.scss | 54 |

---

## Task List

### Completed (All Sessions)

| Task | What was done |
|------|--------------|
| B0 | Breathing toggle fixed — scoped `$breathe-selectors` list replaces wildcard `*` kill |
| B13/B14 | Breathing intensity increased — stacking bands system with raised resting values |
| 9 | Scroll stutter fixed (pixel ratio cap, intersectPlane, CSS compositor hints) |
| 8 | Color palette/theme (dark-only, centralized CSS vars) |
| 2b | Glow hierarchy audit (tier system, breathing->hover fix) |
| 1 | Three.js on landing + projects (procedural lanterns, DOM avoidance, per-page presets) |
| 11 | 3D card tilt (cursor + gyro) + card hover consistency |
| 5/L1 | Tool icon hover taglines (typewriter reveal with crossfade) |
| — | Typography overhaul (Outfit/Plus Jakarta Sans/JetBrains Mono) |
| — | Post reading well (75ch, 92% opaque, image framing) |
| — | Color refinement (warm stone body text, off-white headings) |
| 2 | Sparkler cursor (additive blending, color sampling, scroll sparks, toggle) |
| 4 | Page transition sparkler burst |
| F3 | Custom amber scrollbar |
| F5 | Amber focus outlines |
| I2 | Link hover animated underline with glow |
| I3 | Button press micro-animation (scale 0.97) |
| J2-J4 | Search glow, filter pills, no-results state |
| P3 | Portal door cards breathing |
| P5 | Portal entrance stagger |
| P7 | Time-of-day greeting on portal |
| — | CSS variable breathing system (`--breathe-hue` / `--breathe-border-hue`) — eliminated 4 `-warm` keyframe variants |
| — | Sass @for loop stagger refactors (blog/project previews) |
| — | Shared kill-switch `$breathe-selectors` list |
| — | JS centralization: `storage-keys.js`, `color-utils.js`, cached DOM ops |
| — | `throb-glow` on active nav + breathing toggle |
| — | Dead code cleanup: 19 unused classes, 9 unused keyframes, 50% `_animations.scss` reduction |
| — | `/sync-docs` skill + `PROJECT-STATUS.md` + `CLEANUP-LOG.md` created |
| — | Sparkler auto-detects breathing elements — removed `GLASS_SELECTOR`, uses `animationName` pattern match instead |
| — | `breathe-toggle-glow` upgraded to CSS variable system with wider spread for small elements |
| L-FIX | Broken HTML stagger attributes already removed in prior session |
| L1 | Hero entrance: `fade-in-up` stagger on title (0.15s) → tagline (0.4s) → tools (0.7s) |
| L4 | "View All" shimmer via `shimmer-effect` mixin on `.btn-outline-primary` |
| L5 | Section header heartbeat: `throb-dot 2s` scale+glow on `.icon-dot` |
| P1 | Three.js general background added to `portal.html` |
| B9 | Recommendation cards: `breathe-slow` with stagger on `#related-posts` |
| I4 | Back-to-top ember burst: `sparklerBurst()` in `back-to-top.js` |
| R3 | Heading anchor hover glow in `_placeholders.scss` |
| R4 | Glass-morphism GLightbox overlay (`backdrop-filter: blur(12px)`) |
| R5 | Related post cards breathing with stagger delays |
| A3 | Ember burst on achievement unlock via `sparklerBurst()` |
| O6 | Card tilt polished: `TILT_MAX = 8` conservative angle |
| O7 | Custom tool tagline quips: personal `data-tool-desc` attributes |
| R6 | Reading progress bar clickable — click-to-jump + hover widen |
| R1 | Post ambient fireflies — 8 dots with `firefly-drift`, added to kill-switch |
| A4 | Achievements expanded from 5 → 27 across 5 categories (Explorer, Reader, Interactor, Secret, Meta) |
| A3/A5/A7/A8/A10 | Event-driven achievement tracking: fireworks, code copy, image enlarge, firefly touch, tool hover, avatar hover, tag reading, page-bottom, time-of-day |
| — | Achievement debug panel: Ctrl+Shift+A, shows all counters + progress + lock/unlock per achievement |
| — | Firefly touch + lantern knock via Three.js raycast click handler in `lantern-controller.js` |
| — | Pyrotechnician fixed: only counts actual firework launches (not blocked clicks) |
| — | Zoom Enhance fixed: GLightbox `.on('open')` in both `img-popup.js` and `post-enhance.js` |
| — | Fan Club fixed: flush hover time on click + beforeunload (avatar is a link) |
| — | Scholar fixed: requires actual 200px+ scroll on post pages only, removed legacy migration |
| — | Meta achievements: Section Clear, Golden God, 1001% tiers with scope-based checks |
| A1/A2 | Trophy case on About page — flat badge grid, progress bar, locked/secret states, glass morphism, responsive |
| — | Achievement knock triggers moved from click to mouse avoidance (knock proximity), 1s per-object cooldown |

### Phase 0: Foundation
| # | Task | Status | Notes |
|---|------|--------|-------|
| L-FIX | Fix broken HTML stagger attributes | ✅ Done | Already removed in a prior session |

### Phase 1: Landing Page — "Blow Them Away"
| # | Task | Status | Notes |
|---|------|--------|-------|
| L1 | Hero entrance animation | ✅ Done | `fade-in-up` stagger: title 0.15s → tagline 0.4s → tools 0.7s |
| L4 | "View All" shimmer | ✅ Done | `shimmer-effect` mixin applied to `.btn-outline-primary` |
| L5 | Section header heartbeat | ✅ Done | `throb-dot 2s` on `.icon-dot` — scale 1→1.5 + glow |
| L9 | Hero title glow pulse | Partial | Static `text-shadow` exists, no breathing animation yet |
| L2 | Tool strip entrance stagger | Not started | Each icon fades in 80ms apart, JS-driven delay |
| L3 | Scroll-triggered card reveal | Not started | Cards fade-in-up via IntersectionObserver |
| L6 | Demo reel sizing | Not started | 240px → 560px, 1:1 → 16:9 for YouTube embed |
| L7 | Scroll indicator | Not started | "Scroll to explore" chevron below hero, fades on first scroll |
| L8 | Bottom CTA | Not started | "See all projects" or "Want to work together?" after card grid |

### Phase 2: Portal Page
| # | Task | Status | Notes |
|---|------|--------|-------|
| P1 | Add Three.js general background | ✅ Done | Script tag in `portal.html` line 9 |
| P4 | Ambient background orbs | Not started | Pulsing radial-gradient pseudo-elements |
| P2 | Lantern gateway animation | Not started | CSS/SVG lanterns above door cards. Higher effort |
| P6 | Ramblings link personality | Not started | Coffee icon exists, needs steam animation |

### Phase 3: Breathing Expansion
| # | Task | Status | Notes |
|---|------|--------|-------|
| B9 | Recommendation cards | ✅ Done | `breathe-slow` on `#related-posts a.post-preview` with stagger |
| B4 | View All / CTA button breathing | Not started | `breathe-slow 8s` subtle |
| B5 | Sidebar panel sections | Not started | `breathe-slow 7s` staggered |
| B6 | Archive timeline year dots | Not started | `pulse-slow 4s` |

### Phase 4: Interaction Polish
| # | Task | Status | Notes |
|---|------|--------|-------|
| I4 | Back-to-top ember burst | ✅ Done | `sparklerBurst()` in `back-to-top.js` lines 29-33 |

### Phase 5: Posts/Reading
| # | Task | Status | Notes |
|---|------|--------|-------|
| R3 | Heading anchor hover glow | ✅ Done | `text-shadow` + opacity in `_placeholders.scss` lines 171-191 |
| R4 | Image zoom glass overlay | ✅ Done | `backdrop-filter: blur(12px)` on `.goverlay` in `_post.scss` |
| R5 | Related post cards breathing | ✅ Done | `breathe-slow` with stagger on `#related-posts` cards |
| R6 | Scroll progress bar clickable | ✅ Done | `pointer-events: auto`, click-to-jump, hover widens to 6px |
| R1 | Post ambient fireflies | ✅ Done | 8 dots, `firefly-drift` keyframe, 0.06-0.14 opacity, 10-20s cycle |

### Phase 6: Achievements — "The Game Experience"
| # | Task | Status | Notes |
|---|------|--------|-------|
| A3 | Ember burst on unlock | ✅ Done | `sparklerBurst()` on every toast |
| A4 | Expand to 29 achievements | ✅ Done | 5 categories: Explorer(8), Reader(6), Interactor(8), Secret(2), Meta(5) |
| A5 | Firework counter + unlock | ✅ Done | Tracks launches, `achievement:firework` event, Pyrotechnician at 50 |
| A7 | Page-bottom tracker | ✅ Done | `pagesScrolledToEnd[]` array, also collects tags for reader achievements |
| A8 | Tool icon interaction tracker | ✅ Done | Toolsmith: tracks hover on each `.tool-icon`, unlocks when all hovered |
| A10 | Secret achievements | ✅ Done | Night Owl (midnight-4am), Early Bird (5-7am), Down the Rabbit Hole (ramblings) |
| — | Achievement debug panel | ✅ Done | Ctrl+Shift+A or `window.__achievements.panel()`, shows all counters + lock/unlock |
| — | Event-driven tracking | ✅ Done | Custom events: firework, codecopy, imageenlarge, fireflytouched, lanternknock, toolhover |
| — | Tag diversity reader achievements | ✅ Done | Well-Rounded (5), Connoisseur (10), Completionist (15 = all tags) |
| — | "Hey, You Touched My Fly!" | ✅ Done | Fireflies are clickable with expanded hit area |
| — | Lantern progression | ✅ Done | Tapper(25), Painter(50), Master(100) — tracking ready, rewards deferred until meshes added |
| — | Meta achievements | ✅ Done | Getting Started(5), Collector(15), Achievement Hunter(all) |
| A6 | Lantern knock raycast | ✅ Done | Click handler in `lantern-controller.js`, BoxGeometry = lantern knock, SphereGeometry = firefly touch |
| A1 | Trophy case on About page | ✅ Done | Flat grid of badges ordered by category, progress bar, locked/secret states. On both tech-art and game-design about pages |
| A2 | Achievement categories UI | ✅ Done | Ordered by category internally, no visible headers (per user preference) |
| A9 | Feature unlock system | Not started | Hide toggles until earned (Pyrotechnician → auto-fireworks) |

### Phase 7: Polish & Optional
| # | Task | Status | Notes |
|---|------|--------|-------|
| O6 | Polish card tilt | ✅ Done | `TILT_MAX = 8` — conservative, polished angle |
| O7 | Custom tool tagline quips | ✅ Done | Personal `data-tool-desc` on each icon in `section-landing.html` |
| O2 | Custom 404 page | Not started | "This lantern has drifted away..." |
| O5 | Upgrade Three.js models | Not started | Replace box lanterns with FBX/GLTF. High effort |
| O8 | Personalize achievement names | Not started | Reference TV shows, movies, games, anime Rod likes. Rework names/descriptions/icons |

### Easter Eggs (Backburner)
| # | Task | Notes |
|---|------|-------|
| E1 | Avatar click combo | 10x clicks -> spin + achievement |
| E3 | Long-press lantern burst | Lantern -> fireflies. Needs 3D work. |
| E4 | Card drag-release bounce | Spring physics bounce back. |

---

## Mistakes to Avoid

| Mistake | Context | What to do instead |
|---------|---------|-------------------|
| **Lowering opacity when asked to increase** | User said "barely noticeable", I reduced values | Read the request carefully. "Boost" / "barely noticeable" = increase, never decrease |
| **Removing things without asking** | Deleted keyframes user wanted to keep | Always ask before removing. Present what you plan to remove and get approval |
| **Assuming sweep changes are OK** | Made broad changes across many files without approval | One feature at a time. Verify after each. "If unclear, ask." |
| **Creating -warm keyframe variants** | Old approach before CSS variable system | Use `--breathe-hue` / `--breathe-border-hue` overrides instead |
| **Forgetting to update kill-switch** | Added breathing but didn't add selector to `$breathe-selectors` | Always update `$breathe-selectors` when adding breathing to new elements |
| **Breaking reduced-motion** | Kill-switch referenced deleted classes | Keep `$reduced-motion-extras` in sync with actual classes |

---

## Key Files Quick Reference

| What | Path |
|------|------|
| Breathing keyframes + kill-switch | `_sass/abstracts/_animations.scss` |
| Breathing hue CSS vars | `_sass/themes/_dark.scss` |
| Sass variables | `_sass/abstracts/_variables.scss` |
| Mixins (card-hover, radial-glow, glass) | `_sass/abstracts/_mixins.scss` |
| Topbar (nav, avatar, toggles) | `_sass/layout/_topbar.scss` |
| Post styles | `_sass/pages/_post.scss` |
| Portal styles | `_sass/pages/_portal.scss` |
| Landing page styles | `_sass/pages/_section-landing.scss` |
| Project cards | `_sass/layout/_projectspreview.scss` |
| Blog previews | `_sass/layout/_blogspreview.scss` |
| About container | `_sass/layout/_aboutmecontainer.scss` |
| Sparkler / mouse trail | `_javascript/modules/components/mouse-trail.js` |
| Breathing toggle JS | `_javascript/modules/components/breathe-toggle.js` |
| Achievements JS | `_javascript/modules/components/achievements.js` |
| Post enhancement (sections, progress, confetti) | `_javascript/modules/components/post-enhance.js` |
| Card tilt | `_javascript/modules/components/card-tilt.js` |
| Tool taglines / typewriter | `_javascript/modules/components/tool-taglines.js` |
| Storage keys | `_javascript/modules/config/storage-keys.js` |
| Color utilities | `_javascript/modules/utils/color-utils.js` |
| Three.js general scene | `_javascript/three-background-general.js` |
| Three.js minimal scene (posts) | `_javascript/three-background-minimal.js` |
| Three.js about scene (water/dock) | `_javascript/three-background-scene.js` |
| Lantern controller | `_javascript/lantern-controller.js` |
| Firework controller | `_javascript/firework-controller.js` |
| Performance monitor | `_javascript/performance-monitor.js` |
| Cleanup log | `CLEANUP-LOG.md` |
| Implementation plan (original) | `~/.claude/plans/harmonic-baking-cherny.md` |
