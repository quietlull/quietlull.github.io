# AUDIT 1 - DOES IT ACTUALLY WORK

Gate 1 of the audit sequence. Report only, nothing was changed.

**Measured 2026-08-25, 06:58 to 07:17 PDT**, against `bundle exec jekyll s` on localhost:4000 in
development mode, in headless Chrome at 1440x900. A second agent was porting `_layouts/` and
`_includes/` live throughout, and the post layout changed under me at ~07:05. Every number below
carries the time it was taken. Anything about post pages is a snapshot of 07:11-07:15.

---

## THE HEADLINE

**Every one of the 53 pages loads and renders. Nothing is blank, nothing is unstyled, nothing is
missing its bar or footer except the portal, which is meant to be. The chrome port is sound.**

What a visitor actually hits:

| # | What breaks | Where | Since |
|---|---|---|---|
| 1 | **63 broken images across 17 of the 19 post pages.** Grey boxes in the middle of the writing. | every post with body images or a related card | **new tonight, ~07:05** for 46 of them |
| 2 | **No comments anywhere.** giscus throws on its first line and never inserts itself. | all 19 posts | pre-existing, since `f272da2` |
| 3 | **No copy button on any code block.** 10 blocks on Compute Grass, zero buttons site-wide. | all posts with code | pre-existing |
| 4 | **Click-to-enlarge does nothing.** GLightbox loads on every post and has nothing to bind to. | all posts | pre-existing |
| 5 | **`/page2/` is a second copy of the portal**, and the homepage's `rel="next"` points at it. | `/page2/` | pre-existing |
| 6 | **The homepage has no title.** The browser tab reads `| Rodney Fan`. | `/` and `/page2/` | pre-existing |
| 7 | **Social previews 404 on 13 posts**, and some point at an `.mp4`. | post `og:image` | pre-existing |

Items 1 and 5 are the two a visitor notices in the first ten seconds. Everything else is a control
that quietly does nothing.

**SimpleJekyllSearch is confirmed gone.** It threw on all 53 pages before; it now appears nowhere in
the built site, and the only trace left in source is a comment in `_includes/js-selector.html:4`
explaining why it went. No `search.json`, no `#search-input`, no search markup anywhere.

---

## 1. EVERY PAGE

53 built HTML files, excluding `redesign-lab/`. All 53 returned **HTTP 200**. All 53 rendered real
text. All 51 that should carry chrome carry it, at a 96px bar and a 29px footer, on every single one.

**32 PASS / 3 WARN / 18 FAIL.** A page fails here if a reader sees something broken, not if the code
is untidy.

| Verdict | Page | Text | Bar | Footer | What is wrong |
|---|---|---|---|---|---|
| PASS | `/404.html` | 277 | 96px | 29px | - |
| PASS | `/archives/` | 765 | 96px | 29px | - |
| PASS | `/game-design/` | 512 | 96px | 29px | - |
| PASS | `/game-design/about/` | 2276 | 96px | 29px | - |
| PASS | `/game-design/blogs/` | 552 | 96px | 29px | - |
| PASS | `/game-design/projects/` | 514 | 96px | 29px | - |
| PASS | `/game-design/under-construction/` | 419 | 96px | 29px | - |
| PASS | `/ramblings/` | 732 | 96px | 29px | - |
| PASS | `/tech-art/` | 2575 | 96px | 29px | - |
| PASS | `/tech-art/about/` | 2166 | 96px | 29px | - |
| PASS | `/tech-art/projects/` | 5358 | 96px | 29px | - |
| PASS | `/tech-art/under-construction/` | 358 | 96px | 29px | - |
| PASS | `/tags/2d/` | 199 | 96px | 29px | - |
| PASS | `/tags/3d/` | 461 | 96px | 29px | - |
| PASS | `/tags/blog/` | 211 | 96px | 29px | - |
| PASS | `/tags/compute/` | 208 | 96px | 29px | - |
| PASS | `/tags/game-design/` | 200 | 96px | 29px | - |
| PASS | `/tags/game-jam/` | 130 | 96px | 29px | - |
| PASS | `/tags/godot/` | 134 | 96px | 29px | - |
| PASS | `/tags/ludum-dare/` | 150 | 96px | 29px | - |
| PASS | `/tags/ludum-dare-58/` | 153 | 96px | 29px | - |
| PASS | `/tags/project/` | 745 | 96px | 29px | - |
| PASS | `/tags/rigging/` | 166 | 96px | 29px | - |
| PASS | `/tags/roguelike/` | 168 | 96px | 29px | - |
| PASS | `/tags/shader/` | 544 | 96px | 29px | - |
| PASS | `/tags/study/` | 279 | 96px | 29px | - |
| PASS | `/tags/systems-design/` | 173 | 96px | 29px | - |
| PASS | `/tags/tool/` | 129 | 96px | 29px | - |
| PASS | `/tags/umamusume/` | 168 | 96px | 29px | - |
| PASS | `/tags/unity/` | 337 | 96px | 29px | - |
| PASS | `/tags/unreal/` | 223 | 96px | 29px | - |
| PASS | `/tags/vfx/` | 123 | 96px | 29px | - |
| WARN | `/` | 1529 | none | none | Bar and footer are off on purpose. The `<title>` is empty. |
| WARN | `/game-design/posts/UmamusumeInheritance/` | 6875 | 96px | 29px | No comments. |
| WARN | `/tech-art/posts/ComputeGrass/` | 9561 | 96px | 29px | 5 code blocks, no copy button. No comments. |
| FAIL | `/page2/` | 1456 | none | none | A byte-identical second portal. Empty `<title>`. |
| FAIL | `/posts/LudumDareWhatIf/` | 6754 | 96px | 29px | 5 broken images. No comments. |
| FAIL | `/game-design/posts/FishGame/` | 5923 | 96px | 29px | **14 broken images** of 18. No comments. |
| FAIL | `/tech-art/posts/FishGame/` | 4536 | 96px | 29px | 7 broken images of 12. No comments. |
| FAIL | `/tech-art/posts/Doomsday-Sales/` | 5859 | 96px | 29px | 7 broken images of 11. No comments. |
| FAIL | `/tech-art/posts/SpriteBaker9000/` | 5595 | 96px | 29px | 6 broken images of 11. No comments. |
| FAIL | `/tech-art/posts/Procedural3DMask/` | 6046 | 96px | 29px | 4 broken images. 1 code block, no copy button. No comments. |
| FAIL | `/tech-art/posts/DecompilingShaders/` | 6130 | 96px | 29px | 3 broken images. 6 code blocks, no copy button. No comments. |
| FAIL | `/tech-art/posts/2DPhysicsCompute/` | 882 | 96px | 29px | 3 broken related-card images. No comments. |
| FAIL | `/tech-art/posts/ArknightsEndfieldShaders/` | 842 | 96px | 29px | 3 broken related-card images. No comments. |
| FAIL | `/tech-art/posts/2DRotationUpscaling/` | 638 | 96px | 29px | 2 broken related-card images. No comments. |
| FAIL | `/tech-art/posts/ComputeDisplayShaders/` | 914 | 96px | 29px | 2 broken related-card images. No comments. |
| FAIL | `/tech-art/posts/PortalShadersGodot/` | 1029 | 96px | 29px | 2 broken related-card images. No comments. |
| FAIL | `/tech-art/posts/7SegmentDisplay/` | 634 | 96px | 29px | 1 broken related-card image. No comments. |
| FAIL | `/tech-art/posts/CGWorld-01/` | 641 | 96px | 29px | 1 broken related-card image. No comments. |
| FAIL | `/tech-art/posts/Snatchems/` | 616 | 96px | 29px | 1 broken related-card image. No comments. |
| FAIL | `/tech-art/posts/StudentProjects/` | 615 | 96px | 29px | 1 broken related-card image. No comments. |
| FAIL | `/tech-art/posts/UnrealRiggingContract/` | 828 | 96px | 29px | 1 broken related-card image. No comments. |

**Nothing overflows horizontally.** All 53 measured 0px of horizontal scroll at 1440px. The skip
link and the back-to-top button are present on all 53, including the portal.

### The type ladder

Measured on the rendered page. The spec is h1 61.44 / h2 38.4 / h3 24 / h4 15, weight 300, h2 and h3
gold `rgb(251,191,36)`, all in M PLUS Rounded 1c.

| Page type | h1 | h2 | h3 | h4 | Holds? |
|---|---|---|---|---|---|
| About | 61.44 / 300 | 38.4 / 300 gold | 24 / 300 gold | - | **Yes** |
| Landing | 61.44 / 300 | 38.4 / 300 gold | 15 / 300 (card title) | - | **Yes** |
| Projects | 61.44 / 300 | 38.4 / 300 gold | 15 / 300 (card title) | - | **Yes** |
| Ramblings | 61.44 / 300 | 24 / 300 gold | - | - | h2 is a row title, not a section head |
| Tags, archives | 61.44 / 300 | - | - | - | **Yes** |
| **Post** | **36 / 300** | 16.32 / **600** (TOC label) | 24 / 300 gold | **19.2 / 600 white** | **No** |
| **Blogs** | 61.44 / 300 | - | 24 / **600 white** | - | **No** |
| **Under construction** | **32 / 700** | - | - | - | **No**, off the ladder entirely |

Every page on the site renders in M PLUS Rounded 1c, and the loaded faces are 300 / 400 / 500 / 700.
No weight silently collapsed to 400.

The three page types that miss the ladder are the three that have not been ported yet. Post h1 at
36px may well be deliberate for a reading page; the 600-weight white h3 and h4 are Chirpy leftovers.

---

## 2. EVERY LINK

236 unique `href` / `src` / `og:image` targets across the built site. **63 are broken.**

### Internal - 46 broken, and all one bug

Every broken internal link is a post body image written as a bare filename.

| Post | Broken files |
|---|---|
| `/game-design/posts/FishGame/` | 66785.jpg, 6867e.jpg, 6675c.jpg, 68192.gif, 68ef3.jpg, 68ef6.png, 68ef8.png, 68efa.png, 68efb.png, 68efc.png, StickyNoteFishDieWhenLeavingWater.png, StickyNoteBreedFish.png, StickyNoteReadMind.png, StickyNoteTappingOnGlass.png |
| `/tech-art/posts/FishGame/` | 66785.jpg, 68ef3.jpg, 68ef6.png, 68ef8.png, 68efa.png, 68efb.png, 68efc.png |
| `/tech-art/posts/Doomsday-Sales/` | YB7fPy (1).png, five Screenshot 2025-12-30 *.jpg, UnrealEditor_ar7lJeTEpz.gif |
| `/tech-art/posts/SpriteBaker9000/` | example1.png through example6.png |
| `/posts/LudumDareWhatIf/` | Recettear_Shop.jpg, StickerShop.jpg, CSgo.jpg, BidingStage.webp, DressToImpress.png |
| `/tech-art/posts/Procedural3DMask/` | MaskWithoutNoise.gif, MaskWithNoise.gif, MaskTransparency.gif, Sphere.jpg |
| `/tech-art/posts/DecompilingShaders/` | FirstImage.jpg, SecondImage.jpg, ThirdImage.jpg |

**The mechanism.** Posts write images as bare filenames: `_posts/game-design/2024-10-01-FishGame.md:27`
is `![alt text](66785.jpg)`. The real file is at `/assets/media/AFishBasedGame/66785.jpg`, and
`_includes/refactor-content.html:135` was what prepended `page.media_subpath` to get there.

At 07:05 tonight `post` was added to the `full_bleed` list in `_layouts/default.html:85`. That list
routes a layout down the branch that emits `{{ content }}` raw, and `refactor-content.html` is only
called on the other branch (`_layouts/default.html:98-99`). So post pages stopped passing through it,
and every bare filename now resolves against the post's own URL.

Confirmed by the clock: at 07:00 these images resolved and the link sweep found none of them. At 07:15
all 46 are 404.

The same change is why **heading anchors and the image-popup wrapper also vanished from posts** -
`refactor-content.html` generated all three.

### External - 17 flagged, none of them actually dead

| Status | URL | Refs | Verdict |
|---|---|---|---|
| 404 | `https://fonts.googleapis.com` | 53 | **Fine.** A `preconnect` hint. Nothing ever fetches the bare origin. |
| 404 | `https://fonts.gstatic.com` | 53 | **Fine.** Same. |
| 999 | `https://www.linkedin.com/in/rodneyfan/` | 21 | **Fine.** 999 is LinkedIn's bot block. |
| 403 | `https://www.artstation.com/rodneyfan` | 21 | **Fine.** Returned 200 on the first sweep, 403 on the second - I rate-limited myself. |
| 403 | `https://www.patreon.com/posts/26438849` | 1 | **Unverifiable.** Patreon refuses bots. Worth Rod opening it once by hand. |
| 404 x13 | `quietlull.github.io/assets/media/<X>/assets/...` | 13 | **Real.** The `og:image` bug below. |

Everything else resolves: itch.io, GitHub, Twitter, the two tutorial citations, the jsdelivr bundles,
the Google Fonts stylesheet itself. **No dead domain found in this pass.**

### The og:image bug - separate, older, and live in production

`_includes/head.html:23` calls `media-url.html src=src subpath=page.media_subpath` where `src` is
already a root-absolute `page.image.path`. It prefixes anyway.

Compute Grass ships `og:image` as
`.../assets/media/GrassCompute/assets/media/GrassCompute/GrassHeroAndPreviewImage.mp4`.

That is a 404 **on the production host**, so every social share of a post shows nothing. On top of
that, several posts point `og:image` at an `.mp4`, which no platform renders as a preview even when
the path is right. 13 posts affected. This one is not from tonight and survived the port untouched.

---

## 3. THE CONTROLS

Driven with real CDP mouse and keyboard events, not by reading the code.

| Control | Verdict | Evidence |
|---|---|---|
| Top bar nav links | **Works** | 5 links, all correct. `is-active` lands on the right one. Clicking Home navigated. |
| Top bar section scoping | **Works** | Off-section shows Home + Ramblings; in-section adds Projects + About; game-design adds Blogs. |
| Magnetic hover on bar | **State present, motion not verified** | All 5 `.js-magnetic` carry live `mousemove` + `mouseleave` handlers. Per-frame, so Rod is the eyes. |
| Wordmark line boil | **Works** | Splits into 9 `.lb__g` glyph spans in Lineboil1/2/3. Needs ~5s - it waits on `document.fonts.ready`. |
| Portal centre mark boil | **Works** | 9 glyph spans, Lineboil3. |
| Achievement wall - hover reads | **Works** | Hovering tile 0 wrote "First Light / Earned / Inactive" into `.aw__detail`; tile 5 replaced it with "The Nether". |
| Achievement wall - click activates | **Works** | `aria-pressed` false to true, and `rod-achievements-active-v1` appeared in localStorage. |
| Achievement wall - locked tiles read but do not toggle | **Works** | Clicking a locked tile filled the panel and left `aria-pressed="false"`, `aria-disabled="true"`. |
| Achievement wall - persists across reload | **Works** | After reload, 1 tile still pressed, id `first-light`, from `rod-achievements-active-v1: ["first-light"]`. |
| Achievement wall - orbiting glow | **State present, motion not verified** | rAF loop starts only when something is active, which it now is. |
| Achievement wall - tilt | **State present, motion not verified** | `pointerover`/`pointermove` handlers bound. Keyboard has no equivalent, which the source already flags. |
| Ramblings search - typing filters | **Works** | Typed "umamusume": 2 rows to 1, URL gained `?search=umamusume`. |
| Ramblings search - empty state | **Works** | "zzzznope" hid all rows, hid the list's stray hairline, and showed "No ramblings matching ...". |
| Ramblings search - deep link | **Works** | Loading `?search=umamusume` cold rehydrated the field and the filter. |
| Projects filter pills | **Works** | 10 pills. Clicking "unity" set `aria-pressed="true"` and cut 16 cells to 6. The clear button unhid itself. |
| Projects search field | **Works** | Same module, present and bound on the page. |
| Projects card videos | **Works as designed** | All 8 paused at `readyState 4`. `project-cards-expensive.js:36` plays on `mouseenter` on purpose. |
| Portal windows - drag | **Works** | Window 1 moved from 392,55 to 619,169 under a real press-move-release. |
| Portal window links | **Works** | All 8 resolve. Clicking the Tech Art door landed on `/tech-art/`. |
| Portal drift | **State present, motion not verified** | `pointerdown`/`pointermove`/`pointerup`/`pointercancel`/`dragstart` all bound. |
| Portal text fill | **Partial** | The 3 section windows filled (359/399/479 chars). The 5 social windows filled 0 - they carry no `.pwin__fill`. Looks deliberate, worth a glance. |
| Back to top | **Works** | Hidden at scroll 0, `opacity 1` and `.show` at scroll 2000, click returned to 0. |
| Post TOC | **Works** | tocbot filled it - 5 links on Compute Grass, 7 on Doomsday Sales. |
| Post prev/next | **Works** | Three real links out of `.post-navigation`. |
| Post tag chips | **Works** | All 5 point at live `/tags/*` pages. |
| Post view counter | **Works in production terms** | Rendered "1". The dev CORS block is expected. |
| Related post cards | **Broken** | See below. |
| **Copy code button** | **Does not work - it does not exist** | Zero `.code-header` in the entire built site. 10 code blocks on Compute Grass, no button. |
| **Image zoom** | **Does not work** | `GLightbox` loads on every post and finds 0 elements. Zero `class="popup"` site-wide. |
| **giscus comments** | **Does not work** | No container, no iframe, on any post. |
| Heading anchors | **Gone** | Zero `.anchor` elements site-wide. |
| Scene canvases | **State present, motion not verified** | 2 canvases on scene pages, 3 on posts. The FBX dock model parses, which proves the scene initialised. |
| Fireworks | **State present, motion not verified** | `fireworks-reach.js` requested on every non-post page. |

### Related post cards put a video in an `<img>` tag

`_includes/related-posts.html:83` renders `<img src="{{ rc_img | relative_url }}">` with no extension
check. When the related post's `image` is an `.mp4`, the browser gets an `<img>` pointing at a video
and draws a broken-image box. **17 of these across 10 post pages.**

`_includes/post-media.html` exists precisely to branch on the extension, and the *other* branch of
the same file (`related-posts.html:104`, the non-`rc` variant) already uses it. The v2 card just does
not call it.

### aria-pressed / aria-disabled / hidden vs what is on screen

Checked on About, Projects, Ramblings, a post and the portal. **Every attribute matches the screen.**

| Element | Attribute | On screen | Match |
|---|---|---|---|
| `.aw__tile` active | `aria-pressed="true"` | visible, 64x64 | Yes |
| `.aw__tile` locked | `aria-disabled="true"`, `aria-pressed="false"` | visible and still focusable, on purpose | Yes |
| `.kit-tag` filter pill | `aria-pressed="false"` | visible, 72x26 | Yes |
| Clear-filters button | `hidden` | `display:none`, 0x0 | Yes |
| `.es` empty state | `hidden` | `display:none`, 0x0 | Yes |

No element carries `hidden` while rendering, and no `aria-pressed` is stale. Zero `href="#"` dead
controls anywhere on the site.

---

## 4. WHAT USED TO WORK AND MIGHT NOT NOW

| Thing | Status | Note |
|---|---|---|
| Post pages | **Render, images broken** | See section 2. Collateral from tonight's `full_bleed` change. |
| Tag pages | **Fine** | All 20 render, list their posts, carry chrome and the right h1. |
| Category pages | **Do not exist and never did** | No `/categories/` is built and nothing links to one. Not a regression. |
| Archive | **Fine** | Renders all 19 posts grouped by year, with working links. |
| **Pagination** | **Broken** | `paginate: 10` runs against `index.html`, which is `layout: portal`. So `/page2/` renders the portal a second time and the homepage advertises it as `rel="next"`. |
| 404 page | **Fine** | Unknown paths return a real 404 and the lantern page renders with chrome. |
| **giscus comments** | **Broken** | Mechanism below. |
| **Copy code button** | **Broken** | Mechanism below. |
| **Image zoom** | **Broken** | Nothing carries `class="popup"` for GLightbox to bind. |
| Skip link | **Fine** | Present on all 53. |
| Back to top | **Fine** | Verified working. |
| Search subsystem removal | **Clean** | No leftovers, no errors, no dead markup. |

### Why comments are dead

`_includes/comments/giscus.html:4` runs `Theme.getThemeMapper(...)` as its very first statement.
`Theme` is defined by `assets/js/dist/theme.min.js`, which `_includes/head.html:136` loads with
`defer`. Deferred scripts run *after* parsing; this inline script runs *during* it. So the IIFE throws
on line 1, the giscus `<script>` node is never created, and no comment iframe is ever inserted.

Commit `f272da2 perf: defer render-blocking scripts` is what added that `defer`. Comments have been
dead since. The port did not cause it and did not fix it.

### Why there is no copy button

`_includes/refactor-content.html:181` splits the content on the literal string
`<div class="highlight"><code>`. Rouge with `line_numbers: true` actually emits
`<div class="highlight"><pre class="highlight"><code><table class="rouge-table">`. The condition never
matches, so the `.code-header` and its copy button are never appended. Zero in the whole built site.

This one predates tonight - it was already zero in the 06:58 build, before posts left
`refactor-content.html`. It is now dead twice over.

---

## 5. CONSOLE AND NETWORK

Per page, across all 53.

| Message | Pages | New or pre-existing |
|---|---|---|
| `ReferenceError: Theme is not defined` | 19 posts | **Pre-existing.** Known. Kills comments. |
| goatcounter CORS on `aquietlull.goatcounter.com` | 19 posts | **Pre-existing.** Dev only, expected. |
| `THREE.FBXLoader: unknown material type "openPBRSurface"` | 34 (every page that runs the scene) | **Pre-existing warning.** The dock FBX uses a material Three does not know and falls back to Phong. Loud, harmless, worth silencing one day. |
| `WARNING: Multiple instances of Three.js being imported` | 1 | **Worth a look.** Fired once. Two Three copies in one page means one is wasted download. |
| `Failed to load resource: 404` | 17 posts | **New tonight.** The broken images. |
| `SimpleJekyllSearch` | **0** | **Gone.** Confirmed removed. |

**No page threw anything else.** The console splits cleanly in two: the 34 scene pages carry only
the FBXLoader warning, and the 19 post pages carry only the giscus and goatcounter pair. 33 pages are
clean apart from that one Three.js warning; `/404.html` is the only page with a second, different one.

Nothing is requested and unused except the two dead subsystems already named: GLightbox loads on
every post page and binds to zero elements, and clipboard.js loads and finds zero copy buttons. Both
ride the same jsdelivr combine URL, so removing them saves a real request.

---

## 6. WHAT I COULD NOT VERIFY, AND WILL NOT CLAIM

`requestAnimationFrame` behaviour cannot be trusted from a headless pane, so none of the following is
reported as working. For each I checked only that the state it needs exists.

| Thing | What I confirmed | What is unknown |
|---|---|---|
| The three.js scene | Canvases present, FBX dock model loaded and parsed, no exceptions | whether it animates |
| Magnetic hover | `mousemove` + `mouseleave` bound to all 5 bar elements | whether elements actually move |
| Element drift | drift-magnet imported and run page-wide from `chrome.js` | whether anything drifts |
| Fireworks | bundle requested on every non-post page, scroll gate exists in source | whether bursts appear |
| Achievement wall orbit | rAF loop starts on activation, `--aw-orbit` read from CSS | whether the glow walks the border |
| Achievement wall tilt | pointer handlers bound, delegated on the catalogue | whether tiles tilt |
| Portal window drift | pointer handlers bound, drag proven | whether idle drift runs |
| Sparkler cursor trail | `initMouseTrail()` runs from `basic()` in every bundle | whether it draws |

**Rod is the eyes on all eight.**

Two further caveats. WebGL ran on SwiftShader, not real hardware, so anything GPU-dependent may
behave differently on his machine. And the whole audit ran in development mode, so the PWA service
worker, analytics and the purged production CSS were all absent.

---

## 7. THE SHORT LIST

Ordered by what a visitor hits first.

1. **Put the media path back on post images.** 46 broken images, 8 posts, caused at 07:05 tonight.
   Either post pages route through `refactor-content.html` again, or the bare filenames in the
   markdown become root-absolute paths.
2. **Make the related card check the file extension.** `related-posts.html:83` should call
   `post-media.html` the way its own sibling branch already does. 17 broken thumbnails.
3. **Stop `/page2/` existing.** The paginator is pointed at the portal.
4. **Give the homepage a title.**
5. **Load `theme.min.js` without `defer`, or move the giscus script.** Comments come back site-wide.
6. **Fix the code-block split string, or delete the copy button and clipboard.js.** Right now it is
   downloaded and useless.
7. **Decide about image zoom.** GLightbox ships on every post and binds to nothing.
8. **Fix `og:image`.** 13 posts have a 404 social preview in production, some pointing at video files.

---

## HOW THIS WAS MEASURED

- `_site` walked for the page list; 53 files outside `redesign-lab/`.
- Each page loaded in headless Chrome over CDP at 1440x900, given 2.6s to settle, then probed for
  render facts, computed styles, console output and failed requests.
- Every `href`, `src`, `srcset` and `og:image` in the built site collected and requested. 236 unique.
- Controls driven with `Input.dispatchMouseEvent` and `Input.insertText`. Handler binding confirmed
  with `DOMDebugger.getEventListeners`, not by reading source.
- One harness bug caught and fixed mid-run: the first pass clicked at page coordinates rather than
  viewport coordinates, so it reported the achievement wall as dead. It is not. Elements are now
  scrolled into view and re-measured before every synthetic click.
