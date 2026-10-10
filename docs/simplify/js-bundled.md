# Simplification pass: bundled scripts

Area: everything under `_javascript/` (39 files, 4161 lines), built by Rollup into
`assets/js/dist/*.min.js`. Baseline commit `897a537`. 18 commits on `main` (17 code, 1 report), none pushed. One
template file outside the area was edited, as the brief allowed: `_includes/js-selector.html`
(the dayjs block, 80 to 61 lines).

## Result

`_javascript/` went from 4161 to 3542 lines (619 fewer, 15%). Five files are gone
(`performance-monitor.js`, `card-tilt.js`, `tool-taglines.js`, `locale-datetime.js`,
`toc/toc-desktop.js`: 346 lines). No stylesheet, template output or visible behaviour changed.
`rollup.config.js` was not touched: every entry point is still requested by a built page.

### Bundle sizes (bytes)

| Bundle | Before | After | Change | Built pages that request it |
|---|---|---|---|---|
| `commons.min.js` | 23370 | 18547 | -4823 | 10 |
| `home.min.js` | 24618 | 18547 | -6071 | 2 (the About pages) |
| `misc.min.js` | 23992 | 18547 | -5445 | 21 (archives, tags) |
| `page.min.js` | 26393 | 18547 | -7846 | 2 (`/tech-art/`, `/game-design/`) |
| `post.min.js` | 30178 | 23456 | -6722 | 21 |
| `theme.min.js` | 1190 | 694 | -496 | 56 |
| `three-background-scene.min.js` | 843155 | 843112 | -43 | 34 |
| `three-background-minimal.min.js` | 525102 | 525054 | -48 | 1 (`/404.html`) |
| `app.min.js`, `sw.min.js` (pwa) | 662, 1112 | same | 0 | production only, untouched |

`commons`, `home`, `misc` and `page` are now byte for byte the same file (md5 `9855e258...`):
each contains only `basic()`. See "For Rod to decide", item 6.

### Lines per file

| File | Before | After |
|---|---|---|
| `modules/components/achievements.js` | 439 | 397 |
| `three-shared.js` | 325 | 274 |
| `modules/components/mouse-trail.js` | 317 | 295 |
| `modules/components/clipboard.js` | 104 | 75 |
| `modules/components/img-loading.js` | 57 | 16 |
| `modules/components/mermaid.js` | 54 | 33 |
| `modules/components/img-popup.js` | 45 | 16 |
| `three-config.js` | 102 | 89 |
| `modules/components/back-to-top.js` | 30 | 22 |
| `modules/components/toc.js` | 32 | 40 |
| `page.js` | 13 | 3 |
| `post.js` | 20 | 18 |
| `modules/components.js` | 14 | 11 |
| `modules/layouts/basic.js` | 15 | 12 |
| `home.js` | 5 | 3 |
| `misc.js` | 5 | 3 |
| `theme.js` | 34 | 32 |
| `lantern-controller.js` | 277 | 276 |
| `color-utils.js` | 27 | 27 (one `export` keyword) |
| `modules/components/card-tilt.js` | 130 | deleted |
| `modules/components/tool-taglines.js` | 96 | deleted |
| `performance-monitor.js` | 65 | deleted |
| `modules/components/locale-datetime.js` | 36 | deleted |
| `modules/components/toc/toc-desktop.js` | 19 | deleted |
| `_includes/js-selector.html` (the allowed template edit) | 80 | 61 |

`toc.js` grew by 8 lines because the class it used to import now lives in it; the folder as a whole
is 11 lines shorter.

## How it was proved safe

Everything was measured in a real Chrome (`tools/real-browser.mjs`, real `Input.dispatchMouseEvent`
pointer and wheel events, reduced motion off) against `_site` served by `tools/static-server.mjs`.
Nothing used an in-page `dispatchEvent`. No server was started other than those two tools.

1. **Selector check against the built pages.** All 56 built pages outside the lab were loaded and
   their scripts allowed to run; 37 selectors the modules look for were counted in the live DOM
   (not the HTML source, so anything a script adds is counted).
2. **Behaviour, before and after** (`behaviour.mjs` in the scratch folder; output compared with
   volatile numbers normalised: the port, particle counts, a heading's pixel offset). Taken before
   the first edit, after each batch, and on the finished tree. The last comparison reads
   `IDENTICAL`. What it drives:
   - Post `/tech-art/posts/ComputeGrass/`: 5 table of contents links; scrolling 1500px twice moves
     the active link to "The Compute Pipeline" and the reading bar from 0% to 41.6%; scrolling to
     the bottom gives "What I Learned" and 100%; the back-to-top button is hidden at 0, shown after
     scrolling, and a real click returns `scrollY` to 0; a real click on TOC link 4 sets the hash
     and scrolls; a real click on the first code block's copy button swaps the icon
     `far fa-clipboard` to `fas fa-check`, sets the lock, unlocks the "Copy That" achievement
     (toast shown) and swaps back after 2s; resizing 1440 to 800 to 1440 keeps 5 links and the
     wrapper visible; Ctrl+Shift+A opens the achievement panel; a real click on a related card
     navigates.
   - Ten pages (`/`, `/tech-art/`, `/game-design/`, `/tech-art/projects/`, `/tech-art/about/`,
     `/archives/`, `/tags/shader/`, `/404.html`, `/ramblings/`, `/tech-art/under-construction/`):
     the sparkler canvas exists and lights pixels on real pointer movement (about 1300 to 1450
     lit pixels), `#back-to-top` exists, `window.scene` is set with children, the scene canvas is
     720x450 backing store at 1430x900 CSS, the lantern count is 58 (35 embers on `/404.html`,
     the `minimal` preset), no script problem.
   - `/tech-art/`: a real click on empty page makes a firework and increments the saved firework
     count; the greeting emitter is on at the top, off after scrolling 5000px, on again after
     scrolling back; real clicks on a link on `/tech-art/projects/` and `/archives/` navigate.
3. **Special cases the drive above does not reach** (`special.mjs`): with `sparkler-disabled=true`
   in localStorage the canvas is `display:none`, zero pixels are lit and `window.sparklerBurst` is
   still a function (same as before the mouse-trail edit); a scratch page holding the real
   `post.min.js` and `theme.min.js` with an `<img data-lqip="true" data-src="my image.png">`
   gets `src="my%20image.png"` and loses `data-src` (the lqip swap that img-loading.js keeps);
   `Theme.visualState`, `Theme.DARK`, `Theme.ID` and `Theme.getThemeMapper` still return
   `dark`, `dark`, `theme-mode`, `{light, dark}` on a post (giscus reads them).
4. **Network check for dayjs** (`netcheck.mjs`): resource timing of every script on all 56 pages.
   No page requests dayjs and no page has an HTTP status of 400 or more or a script exception.
   Before the dayjs commit 23 pages requested it through the jsdelivr combine URL. A production
   build (`JEKYLL_ENV=production`, into the scratch folder, deleted afterwards) renders the same
   script tags: the post's combine URL is polyfill, glightbox, clipboard, tocbot; the About pages'
   is the polyfill alone; `/tech-art/`, `archives` and the tag pages have none.
5. **Reduced motion ON**: four pages, mouse moved and scrolled: no sparkler canvas,
   `sparklerBurst` undefined, back-to-top still works, no script problem.
6. `npm test` passes (eslint, stylelint, css order, comments). `page-fingerprint compare`:
   `identical across 20 page views`. `css-rule-diff`: removed 0, added 0, changed 0.
   `check-workbench`: 51 specimens, 0 problems, output byte for byte the same as the start.

## Deletions, with the evidence

Each commit message repeats this evidence.

**1. `performance-monitor.js`** (65 lines, `5048ffd`). Not a Rollup entry (`rollup.config.js`) and
named by no file: searching the repo (minus `node_modules`, `_site`, `.git`) for
`performance-monitor` and `PerformanceMonitor` finds only docs and the lab's backup folder.
No bundle contained it.

**2. `card-tilt.js`** (130 lines, `f85c4ac`). Looked for `.post-card .card` and
`.vertical-bar-container`. In the live DOM of all 56 pages: 0 and 0, and 0 elements with class
`card` at all (`.post-card` is on 4 pages, but `_includes/project-card.html` puts `.card-link`,
`.card-tilt`, `.card-flipper`, `.card-front` inside it, never `.card`). No template, `assets/js`
file or post produces either selector. `initCardTilt()` returned at its `!cards.length` check
before attaching a listener, on every page, in five bundles. P520 in `docs/REQUESTS.md` had already
logged `merged-card.js` as the duplicate. Removed the file, its export, and the call in `basic.js`.

**3. `tool-taglines.js`** (96 lines, `8d8fc8a`). Needs `.landing-tagline` and
`.tool-icon[data-tool-desc]`: 0 elements for both and for `[data-tool-desc]` on all 56 pages; no
producer in the templates, `assets/js`, `_plugins` or `_posts`; its typewriter classes
(`typewriter-ready`, `tl-visible`, `tl-hidden`) are in no stylesheet. Returned at its first line on
every page. Removed the file, its export and the call.

**4. `locale-datetime.js`** (36 lines, `1a9d597`) **and the dayjs script** (`a3ec690`).
`initLocaleDatetime()` only acts on `[data-ts]`; 0 such elements on 56 pages. The only template
that wrote `data-ts` (`_includes/datetime.html`) was deleted by the templates pass. Searching
`_javascript/`, `assets/js/` (non-dist), `_includes/`, `_layouts/`, `assets/404.html`,
`assets/feed.xml` and every built page outside the lab found no other use of the `dayjs` global,
so the whole dayjs block (and its `locale` variable) came out of `_includes/js-selector.html`.
Calls removed from `home.js`, `misc.js`, `post.js`. Verified by the network check above.

**5. The copy-link half of `clipboard.js`** (`3a5f875`). `setLinkClipboard()` wants `#copy-link`:
0 elements on 56 pages, no producer in any template, script or post, and `docs/DECISIONS.md` D50
already records "nothing emits `id="copy-link"`". Because `setCodeClipboard()` was then called only
by the two-line `initClipboard()` wrapper, its body now sits in `initClipboard()`.

**6. `renderTrophyCase()` in `achievements.js`** (42 lines, `c97d52c`). Writes into `#trophy-grid`:
0 elements on 56 pages, no producer, and no stylesheet styles any `.trophy-*` class it would
emit (searched `_sass/`, `assets/css/`, `_includes/`, `_layouts/`). The achievement wall (D34)
replaced it. Its two call sites went with it. Unlock logic, toasts, debug panel and saved state
are untouched.

**7. The sparkler on/off checkbox in `mouse-trail.js`** (`430cf37`). Looked for `#sparkler-toggle`:
0 elements, no producer (the `.sparkler-switch` rules in `_sass/` style markup that no longer
exists), and Rod ruled the toggles out (P265, "we are removing them"). `setEnabled()` had no
caller. `enabled` is now a `const` read from the saved key once. The saved-key read stays so a
returning visitor with `sparkler-disabled=true` still gets no trail (checked, see item 3 above).

**8. Scene dead exports** (`0af82ef`, `2420856`, `b0b763c`, `5be6337`). Searched `_javascript/`,
`assets/js/`, `_includes/`, `_layouts/`, `tools/` and `redesign-lab/` (minus its backup and trash
folders). The lab pages import their own copies (`redesign-lab/scene/`, `redesign-lab/effects/`),
not these files.
- `three-shared.js`: `spawnProceduralLanterns()` (zero callers), `setupStaticCamera()` (zero
  callers; `redesign-lab/character-scene.html` imports the lab copy), and the `{ updateMapper }`
  that `setupScrollLockedCamera()` returned (its only caller, `three-background-minimal.js:67`,
  discards it).
- `three-config.js`: `PRESETS` (zero importers) and `lanterns.avoidance.boundaryForce` (defined,
  read nowhere in the whole repo, including the lab).
- `export` removed from three functions only used inside their own file: `getResponsiveLanternScale`,
  `screenToWorldMapper` (`three-shared.js`) and `rgbToHSL` (`color-utils.js`).
- `lantern-controller.js`: the `this.mouseWorldPos` allocation, never read (the raycast uses
  `this._intersectTarget`).
`redesign-lab/perf-diffs/05-dead-code-batch.md` group C had found the first four independently.
`three-background-scene.min.js` is 43 bytes smaller, `three-background-minimal.min.js` 48.

**9. The `.is-scrolling` toggle in `back-to-top.js`** (`8526f20`). Set on `<html>` on every scroll
event and cleared 150ms later, read by nothing: no selector, script or template names it. Its only
reader was the old top bar's backdrop-filter reduction in `_sass/layout/_topbar.scss`, deleted in
`f775729` (2026-08-25). The button's show/hide and click-to-top are unchanged.

**10. The theme-switch listeners in `img-popup.js` and `mermaid.js`, and `Theme.switchable`**
(`bff4b2d`). Both modules registered a `message` listener that reacts to a message with
`data.id === Theme.ID` (`'theme-mode'`). Nothing posts it: searching `postMessage` finds only
`pwa/app.js` (`SKIP_WAITING`) and giscus posting to its own iframe. The toggle that did went with
the old top bar. A second gate: both listeners sat behind `Theme.switchable`, which is false on
every page because `_layouts/default.html:10` writes `data-mode="dark"` on `<html>`.
Removed `updateImages()` and `hasDualImages` (`img-popup.js`), `refreshTheme()` and its listener
(`mermaid.js`), and the now-unread `Theme.switchable` (`theme.js`, which also shrank the bundle by
496 bytes because Babel no longer emits a static-private-field helper for it). Both modules are
otherwise intact (see "For Rod to decide").

## Simplifications (same behaviour, shorter)

- **`img-loading.js`, 57 to 16 lines** (`93e1f2c`). Its `load` listeners and its lazy-image loop
  only did `parentElement.classList.remove('shimmer' | 'blur')`. Nothing puts either class on an
  image's parent: 0 elements with `.shimmer` or `.blur` on 56 pages; `assets/js` and the templates
  never add them; `_includes/refactor-content.html` used to append them to `_wrapper_class` but
  never prints it (the templates pass removed those lines for the same reason). So every removal was
  a no-op. The `data-lqip` swap, which `refactor-content.html` still emits for a post written with
  the `lqip` option, is the original code unchanged.
- **`toc.js` absorbs `toc/toc-desktop.js`** (`1a9ebc1`). The class only held tocbot's options and
  called `tocbot.init()`; it was the desktop half of a pair whose mobile half was deleted on
  2026-09-03. `refresh()` had no caller. The "init, then reveal the wrapper" pair that appeared
  twice (first load, and when the viewport grows to 1200px) is one function. The early return that
  leaves the change listener unset when the page first loads narrow is kept; proved with a resize
  cycle (5 links, 5 links, 5 links and wrapper visible).
- **`page.js` and `home.js` keep only `basic()`** (`94ffa97`). `page.min.js` is requested by two
  pages (layout `section-landing`) and `home.min.js` by two (layout `section-about`). Their source
  files (`tech-art/index.html`, `tech-art/about.md` and the game-design twins) have front matter and
  no markdown body, so no authored image, code block or mermaid fence. The calls dropped each need
  something these pages lack: `imgPopup()` needs `.popup` (0 on all pages) and GLightbox (loaded for
  posts only, `_includes/js-selector.html`); `initClipboard()` needs `.code-header>button` (3 posts
  only) and ClipboardJS (posts only); `loadMermaid()` needs the mermaid library (only when a page
  sets `mermaid: true`); `loadImg()` needs `img[data-lqip]`. `post.js` is unchanged.

## Looked at and left alone, and why

**Waiting on Rod, as the README says (reported, untouched):**
- `post-enhance.js`. What I see on `/tech-art/posts/ComputeGrass/`: the reading progress bar works
  (0% to 41.6% to 100%); `initFireflies()` appends 8 `.post-firefly` divs to `<article>` (it falls
  back to the article when `.post-content-container` is missing) whose computed
  `animation-name` is `firefly-drift`, and `@keyframes firefly-drift` is defined nowhere
  (`_sass/pages/_post.scss:349` is the only mention); `.post-content-container` is on 0 pages and
  `.post-section` on 0, so `splitSections()`, `initSectionSparks()` and `initImagePopups()` return
  at their first check.

**Broken or switched off today but plausibly wanted, so not mine to delete:**
- **`page-transition.js`.** `#main-wrapper` is on 0 pages (the redesign dropped Chirpy's wrapper),
  but `_sass/abstracts/_animations.scss:110-117` still styles `#main-wrapper` (fade-in) and
  `.page-exit` (fade-out). So the fade and the sparkler burst on navigation never run: the click
  handler cancels the link and sets `window.location = url`, nothing more. Either give `<main>` or
  a wrapper that id (a visible change on every page: the fade-in would start) or delete the
  module. Your call.
- **Image zoom: `img-popup.js`.** Needs `.popup`, 0 on 56 pages; nothing emits it since the lightbox
  wrapper stopped being built. `docs/AUDIT-1-WORKING.md` item 7 ("Decide about image zoom") and
  `docs/MERGE-WORKLIST.md` item 17 (image lightbox) are both still open. Without it the
  `achievement:imageenlarge` event is never sent, so "Zoom Enhance" cannot unlock.
- **Mermaid: `mermaid.js`.** Needs `typeof mermaid !== 'undefined'`; the library is loaded only when a
  post sets `mermaid: true`, which none does. `.d-none` (`_sass/base/_foundations.scss:41`) and
  `.mermaid` (`_base.scss:362`) are still styled, so it is a live authoring switch.
- **The lqip image option** (`refactor-content.html` lines ~125-133 plus the `lqip` branch of
  `img-loading.js`). No post uses it. The templates pass left the template half to you; the script
  half is now 16 lines.
- **Debug view in `lantern-controller.js`** (the `D` key, `clearDebug`, `createDebugCircle`,
  `createDebugSphere` and three `if (this.debugEnabled)` blocks in the hot loop, about 55 lines).
  It is behind `CONFIG.debugEnabled: false`, so it is off today; `redesign-lab/perf-diffs/05-...`
  lists "the D-key debug gate" as do-not-touch.
- **Scene groups A, B, D in `redesign-lab/perf-diffs/05-dead-code-batch.md`** (lantern gradient
  uniforms, the water A/B paths plus a 259 KB texture, firework leftovers). They touch shader
  text or retune allocation, and are marked "NEEDS ROD". Not done.
- **Class methods with zero callers** in the scene: `LanternController.getLanternCount`,
  `FireworkController.getFireworkCount`, `LanternMaterialManager.setFlickerAmount / setFlickerSpeed /
  setEmissiveIntensity / getMaterialCount`, `MirroredSurface.setWave* / setReflection* /
  applyVersion / setNoiseMode`. Console and tuner affordances; one or two lines each.
- **Achievement trackers whose markup is gone** (`achievements.js`): `.tool-icon` (Toolsmith) and
  `#avatar` (Fan Club) match 0 elements, and the scroll-to-end tracker needs
  `.post-content-container` (0 pages; after scrolling a post to the bottom,
  `pagesScrolledToEnd` is still `[]`). That leaves Toolsmith, Fan Club, Zoom Enhance,
  Deep Diver, Scholar, Bookworm, Well-Rounded, Connoisseur, Completionist and the three meta
  achievements that need them impossible to unlock today. They are your design, not dead code:
  restore the markup or remove the achievements.
- **`mouse-trail.js` `INTERACTIVE_SELECTOR`** names `.card`, `.tool-icon`, `.fireworks-switch`,
  `.sparkler-switch`, `.post-tag`, `.pin-tag`, `.badge`; only `a` and `button` match anything. It
  picks the spark colour from the element under the cursor, so the list probably wants the new
  classes (`.kit-tag`, `.kit-button`) rather than shortening.
- **`CONFIG.water.waves.waveSpeed: 0.1`** in `three-config.js` is read by nothing:
  `three-background-scene.js:46` passes a literal `1.5`. A trap rather than dead code.

**Looked at, no change worth the risk:** `fireworks-toggle.js` (its 10-second poll runs on pages
with no scene; that is behaviour), `theme.js` otherwise (giscus reads it), `storage-keys.js`,
`modules/layouts.js` and the `components.js` barrel (every export is imported), `pwa/` (production
only, untouched). Micro-rewrites such as `isLocked()` in `clipboard.js` (8 lines to 1) were not done:
the README prefers deletion to rewriting.

## For Rod to decide

1. Image zoom, page transition, mermaid, the lqip option and the debug view (above): fix or delete.
2. The impossible achievements (above).
3. `CONFIG.water.waves.waveSpeed` versus the literal in `three-background-scene.js`.
4. Scene groups A, B, D from `perf-diffs/05-dead-code-batch.md`.
5. The unused scene methods.
6. **Merge the four identical bundles.** `commons`, `home`, `misc`, `page` are now the same file.
   `_includes/js-selector.html` could map every layout except `post` to `commons`, and
   `rollup.config.js` could drop three entries and `home.js`, `misc.js`, `page.js` could go. That is
   a template decision, so I left it. It also saves two bundle files per Rollup run.

## Hand-offs

**Templates:**
- `_includes/head.html:88` passes `lang=lang` to `js-selector.html`; nothing there reads
  `include.lang` any more.
- `_includes/js-selector.html` still decides what loads for `section-about`/`section-landing`; see
  item 6 above.

**Styles (rules whose only script user is gone, or whose markup is gone):**
- `.shimmer` (`_sass/base/_base.scss:256`) and the `.blur &` rule (`_sass/base/_typography.scss:32`):
  nothing puts either class on an element. `img-loading.js` no longer removes them. The shimmer
  mixin itself is still used by the Back button (`_base.scss:316`).
- `.tool-icon` (`_sass/components/_buttons.scss:59`, `_sass/abstracts/_animations.scss:90`), and
  `.sparkler-switch` / `.fireworks-switch` (`_buttons.scss:60-61`, `_sass/base/_a11y.scss:57-58`,
  `_animations.scss:92-93`): no markup anywhere.
- `'.posts-grid .card'`, `'.post-card .card'` (`_animations.scss:85`): no `.card` element exists.
- `.popup` (`_sass/base/_base.scss:143`, `_typography.scss:119`): wrapper not built (image zoom).
- `#main-wrapper` and `.page-exit` (`_animations.scss:100, 110-117`): see page-transition above.
- `@keyframes firefly-drift` is referenced but not defined (`_sass/pages/_post.scss:349`).

**Config and data:**
- `eslint.config.js` still declares `dayjs` as a global.
- `_data/origin/cors.yml` and `_data/origin/basic.yml`: the `dayjs` entries are now read by nothing
  (`relativeTime` already was). `_data/locales/en.yml`: `df.post.dayjs`, `df.archives.dayjs` and
  `button.share_link.*` (the copy-link strings) are read by no template.

**Docs:** `docs/code-comments/_javascript/` still has pages for the five deleted files
(`performance-monitor.js.md`, `modules/components/card-tilt.js.md`, `tool-taglines.js.md`,
`locale-datetime.js.md`, `modules/components/toc/toc-desktop.js.md`); its pages for the files that
shrank quote line numbers of the older versions. `docs/ARCHITECTURE-HANDOFF.md` (sections listing `card-tilt.js`,
`performance-monitor.js`, `page-transition.js`), `docs/ARCHITECTURE.md:71`,
`docs/THEME-BOUNDARY-AUDIT.md` and `docs/ELEMENT-INVENTORY.md` list files or behaviours that are gone.

**Lab:** nothing under `redesign-lab/` loads `commons`, `home`, `page`, `post`, `misc` or the deleted
modules. Lab pages that load `three-background-scene.min.js` (`scene-tuner.html`, `ref-norikura.html`,
`post-aggregate.html` loads the minimal one) are unaffected: no method or global they use was
removed (`fireworkController.clear()`, `window.mirroredSurface`, `window.scene` and the rest remain).
Generated pages `redesign-lab/todo.html` and `redesign-lab/audit/*.html` list the deleted files and
will drop them on their next build.

## Commit trailer

Every commit ends with `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.
