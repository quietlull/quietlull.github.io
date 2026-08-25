# Architecture

Subsystem map with file pointers. Facts here were measured 2026-08-11; re-verify counts before
relying on them. If this disagrees with the code, this is stale - fix it.

## Build: two toolchains, one deploy

1. **Node** - `npm run build` runs both in parallel:
   - `rollup.config.js` - 11 targets: Chirpy-convention page bundles (`commons`, `home`, `page`,
     `post`, `categories`, `misc`), PWA `app`/`sw` (front matter injected by a custom plugin), and
     2 standalone Three.js bundles. Output: `assets/js/dist/` (gitignored, machine-owned).
     **Each Three.js bundle carries its OWN copy of three.js**, which is why `minimal` is ~525 KB to
     draw 35 spheres. Separate URLs get separate caches, so moving between a section page and About
     downloads two complete copies. A shared vendor chunk is the fix and has not been attempted.
   - `purgecss.js` - strips Bootstrap down to classes actually used in `_includes/**`,
     `_layouts/**`, `_javascript/**`. Output: `_sass/vendors/_bootstrap.scss` (checked in but
     machine-owned - never hand-edit).
2. **Ruby** - `bundle exec jekyll b` consumes the Node outputs.
3. **CI** (`.github/workflows/pages-deploy.yml`): Ruby setup -> npm build -> jekyll build ->
   htmlproofer (internal links only) -> GitHub Pages deploy.

## Rendering / content model

- **Vendored Chirpy fork** - no separation between site and theme; see
  [THEME-BOUNDARY.md](THEME-BOUNDARY.md).
- **Sections** - the site splits into two halves (tech-art, game-design) plus ramblings. Routing
  comes from `_config.yml` `defaults` scoped to `_posts/` subdirectories - the directory layout IS
  the routing contract.
- **Custom front matter** consumed by layouts/includes: `section`, `wip`, `takeaway`, `priority`,
  `pin`, `engine`, `role`, `team_size`, `duration`.
- **Custom layouts** (no Chirpy equivalent): `portal`, `section-landing`, `section-projects`,
  `section-about`, `ramblings`, `under-construction`.
- **Typography:** M PLUS Rounded 1c (headings) / M PLUS Rounded 1c (body) / IBM Plex Mono (code, tags).

## Custom JS subsystems (`_javascript/`, 48 files)

- **Breathing glow** - the ambient glow system; full note: [BREATHING.md](BREATHING.md).
- **Sparkler cursor** - `mouse-trail.js`; Canvas2D particle trail that samples color from breathing
  elements via `animationName` string-matching (a trap - see [TRAPS.md](TRAPS.md)).
- **Three.js scenes** - TWO bundles since 2026-08-22 (`general` was retired): `scene` for the
  About layout (water mirror, dock + lantern FBX, rotating scroll camera, fireworks) and `minimal`
  for everything else (35 embers, scroll-locked camera, mouse avoidance, and nothing else - no
  fireworks anywhere but About). Plus `three-shared.js` (`createBaseScene` owns renderer, composer,
  bloom and the paper filter), `three-config.js`, `lantern-controller.js` (physics, avoidance, click
  raycast), `firework-controller.js`, GLSL in `shader/`.
- **Post-processing is one pass, not several.** `shader/kawaseBloom.js` is a 2-level Dual Kawase
  with no bright pass (D23), and the paper-grain filter is composited INSIDE its final pass rather
  than added as its own - see D24. Two sheets from `assets/tex/paper-*.png`, which are baked
  normal+height maps (rg = normal xy, b = height), not photographs.
- **The scene has ZERO lights.** Lanterns are visible only through emissive materials; the sky
  colour and the water's moonlight terms are the lighting. Bloom was standing in for a rig until
  2026-08-21. Request #40 (light it properly) is still open.
- **Fireworks ownership is split across two files** and neither half makes sense alone.
  `firework-controller.js` runs two independent auto-launch emitters (`greeting`, `reward`), each
  with its own timer and its own cap on live shells, but it knows nothing about pages - it never
  decides who is active. `modules/components/fireworks-toggle.js` does: greeting = near the top of
  the page, reward = the topbar switch. Editing one without the other is the trap.
- **Achievements** - `achievements.js`, 29 achievements in 5 categories, event-driven hooks into
  other subsystems, debug panel Ctrl+Shift+A (`window.__achievements`), trophy case on About pages.
- **Post enhancements** - `post-enhance.js`: reading progress bar (clickable), section sparks, end
  confetti, ambient fireflies.
- **Interaction polish** - `card-tilt.js` (cursor + gyro tilt), `page-transition.js` (fade +
  sparkler burst on internal nav), `tool-taglines.js` (typewriter quips), `back-to-top.js`.
- **Search & discovery** - `post-filter.js` + filter pills (client-side title/tag search),
  `related-posts.html` (scores by shared tags 1pt, section 2pt, category 0.5pt).
- **PWA** - service worker via Chirpy's `pwa/` convention; keeps the session alive across
  navigations (listener-teardown discipline matters - see [TRAPS.md](TRAPS.md)).
- **Shared modules** - `config/storage-keys.js` (single source for localStorage keys),
  `utils/color-utils.js` (parseRGB, rgbToHSL, isWarmColor), `layouts/basic.js` (per-page init).
- Bundle selection: `_includes/js-selector.html` maps layout name -> bundle. A named contract -
  renaming layouts breaks JS loading, not just styling.

## SCSS (`_sass/`, 69 files)

Custom 7-bucket layout replacing Chirpy's stock structure: `abstracts/ base/ components/ layout/
pages/ themes/ vendors/`, composed with `@forward` index files. `themes/_dark.scss` and
`_light.scss` interleave stock Chirpy custom properties with our variables (Phase 1 target).
Site-wide glass morphism lives in `abstracts/_mixins.scss` / `_variables.scss`.

## Non-build directories

- `redesign-lab/` - gitignored ACTIVE design workbench for the redesign (component bench in
  `extracted/`, reference gallery, palette explorer, session logs). Holds intentionally separate
  copies of the live Three.js modules during the redesign - still a wrong-copy hazard (see
  [TRAPS.md](TRAPS.md)); fold/delete decision comes with the post-redesign refactor.
- `_gif-archive/` - 414 MB of original GIF sources kept post-compression; moving out of the repo.
- `tools/run.sh` - excluded from the Jekyll build.
