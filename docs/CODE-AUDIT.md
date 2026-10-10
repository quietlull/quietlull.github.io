# Code audit: how each file works

Rod's human audit, started 2026-10-09. He reads every script and template, asks questions, and has
things renamed until the site is something he can maintain by hand.

**This file holds only the hand-written half.** Each `## path` section below is the "How it works"
text shown on that file's review page. Everything else on a review page (what loads the file, what
it imports, which classes and CSS variables it touches, which other files share those names) is
measured from the source by `tools/build_audit.py` every time the site builds, and is not kept here.

The review list is in the lab to-do page: `http://localhost:4000/redesign-lab/todo.html`.

**Writing a section.** Describe the mechanism: state, lifecycle, the markup and CSS it depends on,
what it costs at runtime, and anything that would surprise a maintainer. Name files and functions,
not line numbers: a line number is wrong the moment the file changes, and these files are about to
change a lot. Put Rod's decisions under a `### Rod's calls` heading in the section as they are made.

**The source files carry no comments.** Rod, 2026-10-09: "strip them all out and place them in the
review area or place them in MD ... Code should be self explanatory". What a file needs explaining
goes here. The comments that were removed are kept in `docs/code-comments/`, one file per source
file, and each review page shows its own.

## assets/js/chrome.js

**Role.** The entry point for behaviour that every page has. It is loaded as a native module by
`_includes/chrome-scripts.html`, which `_layouts/default.html` includes at the end of
`<body>`. It is not bundled, exports nothing and has no init function: the module body runs once
when the browser has parsed the page (module scripts are deferred).

**What runs, in order.**

- `initMagnetic(document)` from `assets/js/components/drift-magnet.js`. Registers every element
  in the document that matches `.js-magnetic`, `[data-drift]`, `[data-drift-x]` or `[data-drift-y]`.
- `initLineBoil(mark)` from `assets/js/components/line-boil.js`, once for each `.top-bar__logo`.
- `initCursorGlow(document)` from `assets/js/components/cursor-glow.js`.

**What it depends on.** The `.cursorglow` element in `_layouts/default.html`, and the top bar
markup in `_includes/top-bar.html`. If either is missing the matching call does nothing; nothing
throws.

**This is the only place drift and magnet elements are registered.** Since the simplification pass
(2026-10-10) nothing else calls the engine's `init`. `project-cards-expensive.js` and
`portal-windows.js` used to call it again for elements this call already covers; those calls are
gone, and so is the engine's "already registered" check that made a repeat call harmless.

**Elements added after load are not picked up.** `initMagnetic` only sees what is in the document
when it runs. Code that builds markup later has to call it again **on a root that holds only the
new elements**: a second call over an element it already has would bind that element's mouse
listeners twice.

**Things a maintainer should know.**

- "chrome" here means the frame around the content (top bar, cursor, shared motion), not the
  browser. It is jargon and a rename candidate.
- It is three imports and three calls. A removed comment claimed these calls would "fold into
  `commons.js`". That is wrong: `commons.min.js` ships on 10 of the 56 pages and this file ships on
  all of them.
- Page-specific setup lives elsewhere, in the inline modules of the `*-scripts.html` includes.

## assets/js/components/cursor-coords.js

**Role.** A shared pointer-position broadcaster, so that several cursor effects cost one event
listener and one animation frame between them. It is plumbing, not an effect: it draws nothing.

**State.** Module-level, so there is exactly one per page: `handlers` (a Set of callbacks), the last
position `x`, `y` (starting at -9999, off screen), `pending` (a frame is already scheduled) and
`bound` (the window listener exists).

**`onCursor(fn)`** adds `fn` to the set. The first call also attaches one passive `pointermove`
listener to `window`. Each event stores `clientX`/`clientY` and, if no frame is pending, schedules
`flush` with `requestAnimationFrame`. `flush` calls every handler with `(x, y)`. So handlers run at
most once per frame, and only while the pointer is moving: an idle page does no work here.

It returns nothing. A handler cannot be removed once added, and the window listener is never
removed. (It used to return an unsubscribe function that no caller kept; that went in the
simplification pass.)

**Who subscribes.** All three import it normally.

- `assets/js/components/cursor-glow.js`: writes `--cx`, `--cy` on the glow.
- `assets/js/components/project-cards-expensive.js`: writes `--mx`, `--my` on each card for the
  glow band.
- `assets/js/components/achievement-wall.js`: the tile rim glow.

**What it cannot see.** A cross-origin iframe delivers no pointer events to the parent page. Over
the giscus comments the position simply stops updating, which is why `cursor-glow.js` adds a
shield element there.

## assets/js/components/cursor-glow.js

**Role.** Moves the `.cursorglow` element to the pointer. The element is a fixed, page-sized layer
with a radial gradient, styled in `_sass/components/_cursor-glow.scss`. This script only writes two
CSS custom properties on it, `--cx` and `--cy`, in client pixels; the stylesheet turns them into a
transform. Nothing is animated in JavaScript.

**State.** None at module level. The glow element is a local of `init`.

**`init(root = document)`.** Called once, by `assets/js/chrome.js`.

- Looks up the first `.cursorglow` under `root` and returns if there is none.
- Calls `setupCommentsShield()`.
- Subscribes one handler to `onCursor` from `assets/js/components/cursor-coords.js`. Because it
  takes the first match, a second `.cursorglow` on the same page is never driven.
- It is written to run once. A second call would add a second shield and a second subscriber; the
  guards against that were removed in the simplification pass because nothing calls it twice.

**`setupCommentsShield()`.** Only does anything on a page with `.post-comments`,
which `_includes/comments/giscus.html` emits. It appends a `div.cursor-shield` to that element.
`_sass/pages/_post.scss` stretches it, transparent, over the comments iframe.

- Why: the giscus iframe is cross-origin, so pointer events over it never reach this page and the
  glow would freeze at the iframe's edge. The shield is an element of this page lying on top, so
  `pointermove` reaches `window` again.
- The cost is that the shield would also catch clicks. So each `pointermove` on it restarts a
  140ms timer (`SETTLE_BEFORE_CLICK_MS`); when the pointer holds still that long, the shield gets
  `pointer-events: none` and a click goes through to the iframe.
- It re-arms when a `pointermove` arrives whose target is outside `.post-comments`.

**Names.** One thing has three names: the file is `cursor-glow`, the class is `cursorglow` with no
hyphen, and the comments call it the cursor lantern. "Lantern" also means the paper lanterns in the
three.js scene, which caused one misunderstanding already (P531).

## assets/js/components/drift-magnet.js

**Role.** One engine that gives elements three separate behaviours:

- **Drift**: a slow wander at rest. Opt in with `data-drift`, `data-drift-x` or `data-drift-y`.
- **Magnet**: the element leans toward the pointer while hovered. Opt in with class `js-magnetic`.
- **Click flash**: an outline ripple on click. Opt in with `data-click-flash`.

**The record per element (`createEntry`).** One object per registered element, kept in the
`elementToEntry` map (the loop walks the map in the order elements were added):

- Tuning read from the markup: `strength` (`data-strength`, default 40), `strengthText`
  (`data-strength-text`, default 20), `clamp` (`data-magnet-clamp`), drift amplitude `ampX`/`ampY`
  (`data-drift`, or per axis; 6px when the attribute has no number), and `data-drift-speed`.
- `inner`: the element's `.js-magnetic-inner` child, if it has one. It follows at
  `strengthText / strength` of the outer movement.
- Per-element randomness so neighbours do not move in step: a random phase per axis and a size
  jitter of plus or minus 15%. The two axes run at different speeds (0.45 and 0.57), which makes
  the path a slow figure rather than a line.
- Live state: `magnetActive`, the magnet's current and target offset, `blend` (0 is all drift, 1 is
  all magnet), `driftLevel` (a 0 to 1 ramp so drift fades in and out), `onScreen`, `promoted`.

**The loop (`tick`).** One `requestAnimationFrame` loop for every element.

- Each frame eases `driftLevel`, `blend` and the magnet offset toward their targets, then computes
  `drift * (1 - blend) + magnet * blend`. **That one expression is the rule that
  the magnet overrides drift.** It is the thing a split into two modules has to keep.
- It writes the result to `element.style.translate`. That is the standalone `translate` property,
  not `transform`, chosen so it adds to any CSS transform instead of replacing it. It only works
  on elements that are not `display: inline`, which is why the kit button's label never moved
  (P536).
- `will-change: translate` is set only while an element is moving and cleared when it settles.
- An element that is off screen and at rest is skipped. When nothing is moving and no visible
  element drifts, the loop stops (`rafId = null`) until `wake()` restarts it.
- A record is never dropped. If a registered element were removed from the page its record would
  stay in the map. No page does that today: a watch over all 56 built pages saw no registered
  element removed.

**Magnet input (`bindMagnet`).** A `mousemove` listener per magnetic element. The target
offset is the pointer's position inside the element, as a fraction from -0.5 to 0.5, times
`strength`. `mouseleave` sets it back to zero. Two guards: nothing happens below 541px viewport
width or when `body` has class `motion-off`. It listens for mouse events, not pointer events, so
touch does not trigger it. There is no attraction from outside the element.

**Click flash (`bindClickFlash`).** Adds class `dm-flash`, forcing a reflow first so a
second click restarts it, and removes it on `animationend` for the animation named `dm-border-fly`.
The keyframes are in `_sass/components/_drift-magnet.scss`.

**When the module loads** (before any `init` call): if the OS asks for reduced motion it adds
`motion-off` to `body`, and it creates one IntersectionObserver with a 200px margin that keeps each
record's `onScreen` current.

**`init(root)`.** Registers every matching element under `root`, binds its magnet and click-flash
listeners, and wakes the loop. Its only caller is `assets/js/chrome.js`. It does not check whether
an element is already registered, so a second call over the same element binds its listeners twice.

**`body.motion-off`** is read here and set only here. No stylesheet uses it.

**Removed in the simplification pass (2026-10-10)**, all measured unused on the 56 built pages:
`retune(element)` (the lab's tuning sliders used their own copy), the `[data-motion-toggle]` button
handler, `body.cull-off`, the MutationObserver on `body`'s class list, and the clean-up for elements
removed from the page. `git show b0443cd:assets/js/components/drift-magnet.js` has all of them.

**For the split (P516).** Drift and magnet share the record, the loop and the single `translate`
write. Two independent modules would both want to write `translate` on the same element, so a
split needs either one shared writer that sums contributions, or drift and magnet on different
properties. The override rule above has to live in whichever piece owns the write.

**Names to look at.** `e`, `r`, `tx`, `ty`, `rec`, `vis`, `mag`, `amp` and the `dm-` prefix are all
abbreviations.

## assets/js/components/line-boil.js

**Role.** Makes text look hand-drawn and alive by redrawing each letter in one of three fonts, six
times a second. The fonts are `Lineboil1`, `Lineboil2` and `Lineboil3`, declared with `@font-face`
in `_sass/components/_line-boil.scss`.

**`initLineBoil(host)`.** Returns immediately if `host` is null. The speed is the constant
`LINE_BOIL_RATE`, 6 changes a second; it is no longer an option, because no caller ever passed one.

- Adds class `line-boil-text` to the host.
- Waits for all three fonts: `document.fonts.load` for each, then `document.fonts.ready`. This is
  required, not a nicety: measuring before the fonts arrive would fix the fallback font's widths
  in place permanently, with no error.
- Then `pinGlyphAdvance(host, text)` and a `setInterval` calling `boilTick` every
  1000 / `LINE_BOIL_RATE` ms.
- Adds a `resize` listener on `window` that re-measures after 150ms. It re-reads the host's text,
  so a host whose text changes (the landing clock) keeps its new content.
- Returns nothing. The interval and the resize listener run for the life of the page and nothing
  can stop them. (It used to return a teardown function that no caller kept.)

**`pinGlyphAdvance`.** Replaces the host's text with one `span.line-boil-text__g` per
visible character, each with a fixed `inline-size`.

- The width is the widest of the three fonts' drawings of that character. Without this the line
  would change length every tick and everything after it would jitter.
- All digits share one width, so a clock does not shift as its numbers change.
- In a vertical writing mode every cell gets the same size.
- Spaces stay as plain text nodes, not cells.
- Each cell starts on a random font, stored in `data-face`. Without the random start every letter
  would change in step and it would read as the whole line swapping.

**`boilTick`.** Moves every cell to the next font by setting `font-family` inline.

**Who calls it.**

- `assets/js/chrome.js`: every `.top-bar__logo`.
- `_includes/landing-scripts.html`: the hero columns `.hero__vert .hero__col` and `.hero__clock`.
- `_includes/about-scripts.html`: `.bio-h .boil-word`.
- `_includes/portal-scripts.html`: the centre mark.

**A second file knows its markup.** The landing clock's inline script in
`_includes/landing-scripts.html` writes the time into the `.line-boil-text__g` cells directly, so
the cell class is a contract between the two files.

**Cost.** One timer per host at 6Hz, whether or not the host is on screen. Each tick changes
`font-family` on every cell, which makes the browser restyle them. It must be measured while
visible: inside a hidden container every width measures 0 and the text collapses (this broke the
first workbench).

**Names to look at.** `__g` (glyph) is an abbreviation. "Advance" is the typographer's word for
the width a character takes up.

## assets/js/effects/scene-mode.js

**Role.** Applies the page's scene tier to the three.js scene after it loads, by hiding parts of
it. It is how a `minimal` page shows lanterns and fireflies without the dock and the water.

**Where the tier comes from.** `_layouts/default.html` writes `data-scene-tier` on `<body>`
(`full`, `minimal`, `none`, or `embers` for the 404). A `?scene=full|minimal|none` query overrides
it for testing.

**What it does.** The scene bundle is deferred and its model loads later still, so this polls:
every 100ms, up to 100 times, it calls `apply(tier)` and stops once the result is in place.

- `apply` walks `window.scene`, the global that `_javascript/three-background-scene.js` sets,
  and matches nodes by name: `^DockGroup`, `^WaterFace`, `^(Rounded)?Lantern`.
- Dock and water are visible only on `full`. Lanterns are always visible.
- Water needs its material hidden as well (`setWater`), because three's Reflector resets
  the mesh's own `visible` flag every frame.
- For `none` and `embers` it does not poll at all.

**What it leaves behind.** Nothing. `counts()` is a private function that the polling uses to tell
when the scene has arrived and the tier is in place. To try a tier by hand, add `?scene=minimal`
(or `full`, `none`) to the address.

A console helper, `window.__sceneTier` (the tier, a `set()` that reloaded with the query, and
`counts()`), was removed in the simplification pass because nothing on the site read it.
`git show b0443cd:assets/js/effects/scene-mode.js` has it.

**The cost this file represents.** A `minimal` page downloads the full 823KB scene bundle,
including the dock and water, and then this hides them. 29 built pages are `minimal`. Not sending
them would need a separate bundle built without them.

**Loaded on every page**, by `_includes/chrome-scripts.html`, including pages with no scene.
