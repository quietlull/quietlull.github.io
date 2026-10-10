# Simplification pass: scripts served as written

Area: `assets/js/` except `effects/hana-bloom.js` (another session has it open), `dist/`, `lib/` and
`data/`. That is 12 hand-written ES modules (13 before `slap-toggle.js` went), loaded as native
modules by `_includes/chrome-scripts.html` and by the inline modules in `_includes/*-scripts.html`.
Baseline commit `b0443cd`. 22 commits on `main` (21 code, 1 report), none pushed. No template,
stylesheet or Rollup bundle was edited: `css-rule-diff` removed 0, added 0, changed 0, and
`assets/js/dist/` is untouched.

## Result

The 13 files went from 1639 to 1355 lines (284 fewer, 17%). One file is gone (`slap-toggle.js`, 38
lines). Nothing a visitor can see or feel changed, in normal motion or in reduced motion.

| File | Before | After |
|---|---|---|
| `components/drift-magnet.js` | 275 | 205 |
| `components/project-cards-expensive.js` | 88 | 41 |
| `effects/fireworks-reach.js` | 54 | 27 |
| `components/merged-card.js` | 227 | 200 |
| `effects/portal-windows.js` | 343 | 308 |
| `components/cursor-glow.js` | 58 | 47 |
| `effects/scene-mode.js` | 58 | 47 |
| `components/line-boil.js` | 102 | 94 |
| `components/search-field.js` | 97 | 93 |
| `components/achievement-wall.js` | 260 | 255 |
| `components/cursor-coords.js` | 30 | 29 |
| `chrome.js` | 9 | 9 |
| `components/slap-toggle.js` | 38 | deleted |

## How it was proved safe

Everything below ran in a real Chrome (`tools/real-browser.mjs`, real `Input.dispatchMouseEvent`
pointer events and real key events, never an in-page `dispatchEvent`) against `_site` served by
`tools/static-server.mjs`, one browser at a time. No server was started.

1. **One behaviour script, run before any edit and after every batch** (it lives in the session
   scratch folder, not in the repo). It writes a JSON file; the "before" file was captured twice
   and the two were byte for byte equal, in normal motion and in reduced motion, so nothing in it is
   noise. After every batch, and on the finished tree, the output is **IDENTICAL** to the "before"
   file in both modes. What it drives:
   - `/tech-art/` (full tier): the scene has the dock and water visible; line boil on the top-bar
     logo (9 cells), the three hero columns (24 cells) and the clock (8 cells), sampled every 200ms
     for 1.6s: every cell has a pinned non-zero size, every cell changes font-family, the fonts seen
     are Lineboil1 to 3, and the clock reads HH:MM:SS within 2s of now; a landing social icon
     drifts at rest (moves between samples, stays within 7px), is pulled toward the pointer (both
     axes, its inner glyph follows at a smaller offset), goes back to drifting on leave, and a real
     click adds `dm-flash` and the animation removes it; a top-bar link magnets right and returns to
     `none`; `--cx`/`--cy` on `.cursorglow` equal the pointer position; the project card under the
     pointer gets `rotateX(4deg) rotateY(4deg) translateY(-6px) scale(1.02)` with the 0.15s
     transition, the `--mx`/`--my` glow follows within 16px, the dwell ring shows (`is-on
     is-filling`), the card is not flipped early and is flipped after about 1s with the ring
     cleared, the cover video plays on hover and pauses on leave, the tilt, the flip and the ring
     reset on leave, and a 90px move at 500ms restarts the dwell (not flipped at 1.1s, flipped later);
     the patched `createAutoFirework` called 40 times puts every burst between 6% and 78% of the
     viewport height and 10% and 90% across, reaching both ends.
   - `/tech-art/projects/` (minimal tier): dock and water hidden; typing "unity" leaves 6 of 16
     cards and sets `?search=unity`; clearing with Backspace restores 16 and drops the parameter;
     "zzzz" shows the empty state with the quoted text and hides the pinned group and rule; a filter
     pill filters (6) and sets `aria-pressed`; two pills together; the clear button resets; loading
     `?search=unity` fills the box and filters; the first visible card drifts at rest (within 5px)
     and is pulled toward the pointer; `?scene=minimal` on `/tech-art/` hides the dock and water and
     `?scene=full` here shows them.
   - `/game-design/blogs/` (the other search host, `.er-list .er-row`): a title word leaves 2 of 4
     rows, an unmatched string hides the list and shows the empty state, clearing restores 4.
   - `/tech-art/about/`: 29 tiles in five groups; with a seeded save, hovering a tile fills the detail
     panel (Pyrotechnician reads 30 / 50 and SILVER, a locked tile reads Locked), a hovered tile gets
     the `perspective(...)` tilt, a click on a locked tile only reads it, a click on an unlocked tile
     sets `aria-pressed`, writes `rod-achievements-active-v1`, starts the orbit (both `--mx` and `--my`
     are percentages and change over time) and the panel says Active; the rim glow `--mx`/`--my` of
     unpressed tiles equal the pointer minus the tile's corner; after a reload the pressed tile and
     its orbit are restored; the name in the heading boils.
   - `/` (portal): all 8 windows placed (not all at 0,0), `--pscale` 1.633, `--bar-h`, `--win-w` and
     `--win-h` per window; the mark boils; the windows' `.pwin__inner` drift along x only; a real
     drag by the title bar moves a window exactly 60 by -40 and gives it z-index 30, it settles
     inside the field after release; a real click on a close button sets `is-closed` and
     `can-reset`; a real click on the centre restores every window and every position equals the
     start; a window leans toward a nearby pointer by 0.5 to 10px; resizing to 1100 wide changes
     `--pscale` to 1.440 and the sizes, and back to 1440 restores 1.633.
   - A post (`none` tier): no scene object; `--cx`/`--cy` follow the pointer; exactly one
     `.cursor-shield` inside `.post-comments`; over the comments the shield's `pointer-events` is ''
     at first, `none` after 140ms of stillness, and '' again once the pointer leaves the comments.
   - `/404.html` (embers tier): the scene exists with lanterns.
   - Script problems are recorded for every section: none, in either mode.
2. **Reduced motion, before and after** (same script, `prefers-reduced-motion: reduce` emulated):
   `body` gets `motion-off`, the icons, the card and the portal windows do not drift, the magnets do not
   pull, the cards do not tilt, flip or show the ring (the cover video still plays on hover), the
   portal windows do not lean, the line boil and the search still work. All identical before and after.
3. **Selector census over all 56 built pages** (a second script, loaded in the real browser with
   mouse movement and scrolling). Used as the evidence for every "no element matches" below.
4. **Mutation watch.** A MutationObserver installed before any page script (childList on the document,
   subtree) and another on `body`'s class, over the same 56 pages: no `js-magnetic` or `data-drift`
   element was ever removed from the DOM, and `body`'s class never changed after DOMContentLoaded. Re-run
   on the finished tree: same result, and no script problem on any page.
5. `npm test` exits 0 (eslint, stylelint, CSS load order, no comments). `css-rule-diff`: removed 0,
   added 0, changed 0. `check-workbench`: 51 specimens, 0 problems, output byte for byte equal to the
   start (see "A mistake caught" below). `page-fingerprint compare`: identical across 20 page views
   (see "The fingerprint depends on the time of day" below).

### A mistake caught by check-workbench

Commit `09fcd1f` removed the checks in `portal-windows.js` for `.pwin__bar`, `.pwin__title`,
`.pwin__close` and `.centre`, because `_layouts/portal.html` always writes them. The lab workbench does
not: it loads the script against single-window fragments (`components-portal-window-1` to `3`,
`components-button-kit-5`), where `.centre` or the bar is missing. `check-workbench` went to 4 problems
("Cannot read properties of null (reading 'addEventListener')") and four sizes changed. Commit
`6e9fd54` puts those checks back (it is a partial revert; only the `document.fonts` feature test stays
gone). The other guard removals in this pass were run through `check-workbench` too and pass.

### The fingerprint depends on the time of day

`/tech-art/about/` shows a Night Owl tile that unlocks on a visit between midnight and 4am
(Early Bird is 5 to 7am). A locked and an unlocked tile put their `i.aw__on` star 1px apart, so a
`page-fingerprint` baseline taken in the evening and compared after midnight reports "2 page views
differ" on `/tech-art/about/` at both widths, with exactly that one element. It happened here (baseline
21:02, comparison 00:20). To get a clean comparison I ran a scratch copy of `tools/page-fingerprint.mjs`
with `Emulation.setTimezoneOverride` set to a daytime zone: **identical across 20 page views**. With the
override and the new code, the Night Owl star sits at 410,1772 and 165,2160, which are exactly the
baseline's values. `tools/` is untouched. The style agents that follow should capture and compare in the
same part of the day or fake the clock the same way.

## Deletions, with the evidence

**1. `components/slap-toggle.js`** (38 lines, `0b2e312`). No template, layout, include or script
imports it (searched `_includes`, `_layouts`, `assets/js`, `_javascript`, `tools`). 0 elements match
`.slap-toggle__control` on 56 built pages. No stylesheet in `_sass` or `assets/css` styles
`.slap-toggle`. The lab imports its own copy (`redesign-lab/extracted/components/slap-toggle/slap-toggle.js`),
so no lab page loses anything. (`_site/sitemap.xml` lists a lab page of that name; that is a lab URL.)

**2. `drift-magnet.js`, four dead paths** (`86cf3b9`).
- `retune(element)`: no importer in the live tree. The lab bench imports a `retune` from its own copy
  (`redesign-lab/extracted/components/drift-magnet/drift-magnet.js`).
- The `[data-motion-toggle]` button handler: 0 elements on 56 pages, no template or script emits it.
- `body.cull-off` (`onScreenVisible()`): nothing sets it; the function is `entry.onScreen` now.
- The MutationObserver on `body`'s class. It only called `wake()`. The one class this module adds
  (`motion-off`) is added before the observer exists, and the mutation watch above saw no class change
  on any page. The null check before `cullObserver.observe()` went too (the observer is created before it).

**3. `drift-magnet.js`, removed-element clean-up and the second collection** (`864de6a`). The clean-up
for elements removed from the document had nothing to do: the mutation watch saw no tracked element
removed on any of 56 pages. Without it, the `entries` array and the `elementToEntry` map held the same
records in step, so `tick()` walks the map (same insertion order), `init()` asks the map instead of
building a Set on each call, and the IntersectionObserver callback no longer checks for a missing entry
or tracks a `changed` flag (every observed target has an entry, every callback has a record).

**4. Duplicate drift registration** (`3aa64a7`). `project-cards-expensive.js` and `portal-windows.js`
each called the drift engine's `init()` for elements `chrome.js` registers anyway. `chrome.js` runs on
every page (`_layouts/default.html:57` includes `chrome-scripts.html` unconditionally) and selects over
the whole document, which covers the cards (static markup, `_includes/project-card.html`) and the portal
windows' `.pwin__inner` (static, `_layouts/portal.html`). Measured: the card on `/tech-art/projects/`
still drifts and is pulled, the portal windows still drift along x only. The "already registered" check
in `init()` existed for those repeat calls and went with them.

**5. `project-cards-expensive.js`, `bindControls()`** (`5c1cf45`). It drove `[data-epx-layout]`,
`[data-epx-corners]` and `[data-epx-var]` and restyled `.wrapper-project-card-grid`. 0 elements match
any of the three on 56 pages and no template or script emits them. The lab's controls are in
`redesign-lab/extracted/components/project-cards-expensive/`, which loads its own copy. (`411cab3`)
Also: the module-level `revealBound` flag (each layout lists one script include, so `initCards` is
called once per page) and the `.post-card` ancestor check in `bindHoverVideo` (the selector is
`.post-card video`).

**6. `merged-card.js`, the glass toggle** (`a853445`). `.js-glass-toggle` matches 0 elements on 56
pages and nothing emits it. Guards and a dead variable (`bf59320`): a card already wired, or with no
`.card-tilt`, `.card-flipper` or `.card-back`: all 26 `.post-card` on the 4 pages that have any have all
three (they come from `_includes/project-card.html`, which always writes them) and `init()` runs once
per page. `.dwell-ring` is in no page's markup (only in the stylesheet), so the ring is created
unconditionally. `card.__tiltEnabled`, a function stored on every card for `setupCard` to call, is a
module variable. `rect` was assigned on `mouseenter` and cleared on `mouseleave` but only read in
`applyTilt`, which assigns it first; the `mouseenter` read was a layout flush with no consumer (the next
line, `startDwell`, flushes layout itself).

**7. `cursor-glow.js`** (`761b24f`). `init()` is imported only by `chrome.js`, once. The `bound` flag, the
module-level `glowElement` and the null check inside the handler had nothing to guard. The
`.cursor-shield` already-present check: that class is in no page's markup, only in
`_sass/pages/_post.scss` and this script.

**8. `cursor-coords.js` unsubscribe and `achievement-wall.js`** (`ae010da`). `onCursor()` returned an
unsubscribe whose only user was the wall's returned teardown; `about-scripts.html` calls
`initAchievementWall(document)` and ignores the result. Both gone. The wall used a dynamic `import()` of
`cursor-coords.js` inside `init()` although `chrome.js` already loads that module on every page; it is a
normal import. `export` removed from `ACHIEVEMENTS` (no importer; the lab has its own copy). A one-use
alias (`name = a.title`) went.

**9. `line-boil.js` teardown and rate option** (`57c29be`). `initLineBoil()` returned a function clearing
the interval, the re-pin timer and the resize listener. All five call sites ignore the return value.
Nobody passes `{ rate }`. The `timer` variable existed only for the teardown.

**10. `portal-windows.js`, `window.__portalWindows`** (`b1f2827`). 25 lines of console accessors. Nothing
in the live tree reads it (searched `assets/js`, `_javascript`, `_includes`, `_layouts`, `tools`, `docs`;
the one doc hit is a past audit note, `docs/REQUESTS.md` P214, that drove it by hand). The lab has its own
copy with its own object. `scale` lived outside `layout()` only for the accessor; it is a local now.
`home0` and `frac` were built by the same two `clamp` expressions;
`home0` is built once and `frac` starts as a copy (`9dce7eb`).

**11. `scene-mode.js`, `window.__sceneTier`** (`2f1a663`). Nothing reads it except this file's own polling,
which calls `counts()` through it. Gone: `tier`, `fromOverride`, `pageDefault`, `set()` and the
`unnamedMeshes` count (console only). `counts()` is a plain function. `apply()` lost return values the
polling ignored, the two branches of the stop condition share their lantern/dock/water test, and the
`?scene=` override and the page default are one expression. The polling logic is the same: checked by
reading `window.scene` on all four tiers (see the behaviour list) and by the `?scene=` overrides.

**12. `fireworks-reach.js`, `window.__fireworkReach`** (`d46ad73`). The patched `createAutoFirework` pushed
every spawn height into a list that only `report()` read, and nothing reads that object. Gone with it:
`range`, `applied`, `samples`, `report`, and the `__reachPatched` mark, which guarded a second call the
polling never makes (it clears its timer on the first success). The spawn arithmetic and the
`Math.random()` calls are identical; checked with a spy on `createFireworkFromClick` (see above).

**13. `search-field.js`** (`2d63f03`, `c415294`). The `data-sf-bound` mark: each layout lists one script
include, so `init()` runs once per page, and nothing reads the attribute. The `.es` and `.es__q` null
checks: `blog.html`, `ramblings.html` and `section-projects.html` write a hidden `.es` with an `.es__q` in
the same branch that has the items, and `init()` returns earlier when there are no items; every page with
`.sf__input` has exactly one of each in the live DOM.

## What I looked at and left alone, and why

- **`portal-windows.js` checks for `.pwin__bar`, `.pwin__title`, `.pwin__close` and `.centre`.** Dead on
  the real portal, needed by the lab workbench (see "A mistake caught" above). Rod's call whether the
  workbench specimens should keep driving the guards.
- **`portal-windows.js` `pagehide` handler** (cancels the frame request but leaves `raf` set). Inference,
  not measured: if the browser restores the page from the back/forward cache, `raf` is still non-null, so
  `wake()` does nothing and the windows stop moving. Removing the handler would change that behaviour, so
  I did not touch it. Worth a look.
- **`merged-card.js` `setupGyroTilt` (68 lines).** Needs a touch device with `DeviceOrientationEvent`, so
  the real-pointer script cannot reach it. Live for phone visitors, kept.
- **`achievement-wall.js` data.** `hasProgress` and `reward` on each of the 29 achievements are read by
  nothing in `assets/js`, `_javascript` or the templates (`progressFrom()` has its own table). `reward`
  holds `auto-fireworks`, `lantern-shape`, `lantern-color` and `lantern-panel` on four entries, which
  looks like an unbuilt feature. Left for Rod. The two `pointerover` listeners on `cat` (one reads, one
  tilts) could be one; not worth the rewrite.
- **`scene-mode.js` `else if (LANTERN.test(o.name)) o.visible = true`.** Lanterns are never hidden by this
  file; if the lantern controller never hides them it is dead, but I did not prove that.
- **`line-boil.js` digit-width block and `chrome.js`**: live and tiny.
- **`hana-bloom.js`**: not mine.
- **The known search-field bug** (empty quotes in the heading when only filter pills are used) is
  untouched and still reproduced by the behaviour script (`pill.said` is two empty quotes).

## For Rod to decide

1. Three console objects are gone: `window.__sceneTier` (tier, set, counts), `window.__portalWindows`
   and `window.__fireworkReach`. Each is in git history (`git show b0443cd:assets/js/effects/<file>`).
   `docs/MERGE-NIGHT.md` lines 197 and 295 tell the reader to check `__fireworkReach.applied`.
2. The `pagehide` handler (above).
3. `hasProgress` and `reward` in the achievement data.
4. Whether the workbench should keep dictating guards in `portal-windows.js`.
5. The drift engine now has one registrar, `chrome.js`. Anything built after load needs its own
   `init()` call again (that is what the "already registered" check used to make safe).

## Hand-offs

**Styles (classes whose only script setter is gone, or whose only markup was lab-only):**
- `no-glass` on `body` and `.merged-cards`: `_sass/components/_merged-card.scss:178-179`
  (`body.no-glass .glass-plane, .merged-cards.no-glass .glass-plane`). The toggle was the only setter.
- `.is-staggered` and `.is-regular` on `.wrapper-project-card-grid`:
  `_sass/components/_project-cards-expensive.scss:55-99`. The layout button was the only setter.
- `.epx-note`, `.epx-controls`, `.epx-ctl` (`_sass/components/_project-cards-expensive.scss:11-50`): the
  markup for them was lab-only; no template or script mentions them.
- Nothing styles `.slap-toggle`, `.js-glass-toggle`, `[data-motion-toggle]` or `motion-off` (the last is
  still set from script, for reduced motion).
- Still live, do not remove: `merged-cards--square`, `dm-flash`, `dwell-ring` and its `is-on`/`is-filling`,
  `cursor-shield`, `line-boil-text` and `line-boil-text__g` (the landing clock's inline script writes
  into the cells), `is-dragging`, `is-closed`, `can-reset`, every `aw__*` class.

**Templates:** nothing to change. `initLineBoil` and `initAchievementWall` return nothing now; every
inline module and `chrome.js` already ignored the return value.

**Docs (not mine to edit):** `docs/CODE-AUDIT.md` sections for `chrome.js` ("Elements added after load
are not picked up ... project-cards-expensive.js does exactly that"), `cursor-coords.js` (unsubscribe, the
wall's dynamic import), `cursor-glow.js` (state: `glowElement` and `bound`; "a second call to init only
refreshes ..."), `drift-magnet.js` (`retune`, the dead paths, `init.gated`, "Elements removed from the
document are dropped", `entries`), `line-boil.js` (returns a teardown, `{ rate }`) and `scene-mode.js`
("What it leaves behind", the debug object) now describe code that is gone.
`docs/code-comments/assets/js/components/slap-toggle.js.md`, and the pages for `retune`, the glass toggle
and the debug objects, describe removed code. `docs/MERGE-NIGHT.md` (above).

**Lab:** no lab page loses anything. Every lab page that uses one of these effects loads its own copy
under `redesign-lab/` (`effects/portal-windows.js`, `effects/scene-mode.js`, `effects/fireworks-reach.js`,
`extracted/components/...`), not `assets/js`. The generated `redesign-lab/todo.html` and
`redesign-lab/audit/*.html` will drop `slap-toggle.js` and the removed names on their next build.

## Housekeeping

- My Python edits briefly wrote CRLF into some working copies (`core.autocrlf` is `input`, so every
  commit holds LF). I converted the working copies back to LF; `git diff` is empty for them and
  `git status` lists only the files that were modified or untracked before the pass started.
- The drive had 0.5 to 1.7 GB free throughout. Scratch stayed under 1 MB, one headless Chrome ran at a
  time and each script closes its page in a `finally`. No command hit ENOSPC.

## Commit trailer

Every commit ends with `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.
