LIVE SITE PAGE-TYPE INVENTORY (repo root: `C:/Users/Rod/Documents/ProjectFiles/Website`)

---

## 0. THE SHARED SHELL — every page type inherits this

`C:/Users/Rod/Documents/ProjectFiles/Website/_layouts/default.html` wraps ALL 7 page types (`default` itself wraps into `_layouts/compress.html`, the whitespace-stripper). Its slot list:

1. `<head>` — `_includes/head.html` (jekyll-seo, `_includes/favicons.html`, resource hints, Bootstrap 5.3.6 CDN link in NON-production only, `/assets/css/:THEME.css`, webfonts, FontAwesome, `theme.min.js`, then `_includes/js-selector.html`)
2. `<body>` open
3. `a.skip-link` -> `#main-content` (default.html:22)
4. `header#topbar.d-flex.flex-column.align-items-center` — `_includes/topbar.html`
   - `.profile-wrapper` (avatar `a#avatar` 50x50 img + `.site-titles` > `a.site-title` + `p.site-subtitle`)
   - `nav.w-100 > ul.nav.justify-content-center` — branches 3 ways: section pages get `_includes/section-nav.html` (HOME / PROJECTS / ABOUT, + BLOGS only for game-design); `layout == 'portal'` gets HOME + ARCHIVES; everything else gets HOME only
   - `.topbar-bottom` — `#mode-toggle` button, `label.breathe-switch#breathe-toggle`, `label.sparkler-switch#sparkler-toggle`, `label.fireworks-switch.reward-locked#fireworks-toggle` (rendered ONLY for layouts `home`, `section-about`, `section-landing`, `section-projects` — topbar.html:91), `.icon-border`, then contact icon links from `_data/contact`
5. `div#main-wrapper.d-flex.justify-content-center`
   - `div.container.d-flex.flex-column.px-xxl-5`
     - `div.row.flex-grow-1#main-content`
       - `<main aria-label="Main Content">` — class is `col-12 col-lg-11 col-xl-10 px-md-4` IF the layout declares `panel_includes`, else `col-12 px-md-4`. Gets `data-section="{{ page.section }}"` when set. (default.html:30/32)
       - PAGE CONTENT (run through `_includes/refactor-content.html` when the layout sets `refactor: true`)
       - `<aside id="panel-wrapper" class="col-xl-2 ps-2 text-muted">` — ONLY when `panel_includes` exists (post only)
     - `div.row > div#tail-wrapper` (`col-12 col-lg-11 col-xl-10 px-md-4` with panel, else `col-12 px-md-4`) — `tail_includes` then `_includes/footer.html`
     - `_includes/search-results.html` -> `div#search-result-wrapper.d-none > div.col-11.content`
   - `aside > button#back-to-top.btn.btn-lg.btn-box-shadow`
6. `div#mask.d-none.position-fixed.w-100.h-100.z-1`
7. `script_includes` (post only -> `_includes/comment.html`)
8. `_includes/search-loader.html` inline SimpleJekyllSearch bootstrap

Notable: `_includes/searchbar.html` exists but is **included by nothing** — the search input in the topbar was removed; only `search-results.html` + `search-loader.html` survive. The section index pages roll their own `#post-search` inputs instead.

---

## 1. POST

- **Layout:** `C:/Users/Rod/Documents/ProjectFiles/Website/_layouts/post.html` (auto-applied to all of `_posts/` by `_config.yml:176-184` defaults, with `comments: true`, `toc: true`, permalink `/posts/:title/`, overridden to `/tech-art/posts/:title/` and `/game-design/posts/:title/` per subfolder). Only layout with `panel_includes`.
- **Slot list (inside `<main class="col-12 col-lg-11 col-xl-10 px-md-4">`):**
  1. `<script defer src="/assets/js/dist/three-background-minimal.min.js">` (post.html:16)
  2. `article.px-1[data-toc]`
  3. `header` > `h1[data-toc-skip]` -> `p.post-desc.fw-light.mb-4` (if `page.description`)
  4. `.post-project-meta.mb-4` (only if `page.engine` or `page.role`) — `span.meta-chip` engine (Unity/Unreal/Godot SVG or FA fallback), `span.meta-chip` role, then `_includes/tag-badges.html`
  5. `.post-meta.text-muted > .post-meta-row` — posted date (`_includes/datetime.html`), optional lastmod, `_includes/read-time.html`, `em#pageviews` (goatcounter)
  6. `.mt-3.mb-3.preview-img-wrap` (if `page.image`) — `_includes/post-media.html` picks `<video autoplay muted loop playsinline>` for .mp4/.webm else `<img>`; optional `figcaption`
  7. TOC trio, only when `enable_toc` (`_includes/toc-status.html`: `site.toc && page.toc && content has <h2|<h3`): `div#toc-bar` (sticky), `button#toc-solo-trigger`, `dialog#toc-popup`
  8. `.post-tldr` — only if `page.description` AND tags contain `project`
  9. `.post-content-container > .content` with `{{ content }}` — OR a `.wip-placeholder` variant when `page.wip` and the rendered content is empty (post.html:136-155)
  10. `.post-takeaway` (if `page.takeaway`)
  11. `.post-tags` > `a.post-tag` per tag
  12. `.post-tail-bottom.d-flex` — `.license-wrapper` + `_includes/post-sharing.html`
  - **Panel aside (`#panel-wrapper`, `col-xl-2`):** `_includes/related-posts.html` (`aside#related-posts` with a 1/2/3-col card nav, scored by shared tags with a +2 same-section bonus) then `_includes/toc.html` (`section#toc-wrapper.position-sticky > nav#toc`)
  - **Tail (`#tail-wrapper`):** `_includes/post-nav.html` (`nav.post-navigation > .post-nav-grid` 2-up prev/next cards + a `.post-nav-back` button to `/{section}/projects/`), then footer
  - **Script includes:** `_includes/comment.html` -> giscus
- **JS bundle:** `post.min.js` (`_includes/js-selector.html:59`) + `three-background-minimal.min.js`. Also pulls dayjs, glightbox, clipboard, lazy-polyfill via jsDelivr combine, plus the goatcounter pageviews include.
- **Structurally notable:** the ONLY page type with a right-hand panel column, so it is the only one where `<main>` is `col-lg-11 col-xl-10` instead of `col-12`. `#panel-wrapper` is `display: none` below the `xl` (1200px) breakpoint (`_sass/layout/_panel.scss:65-67`). `.post-content-container` is a hard-coded near-opaque dark card (`rgba(8,15,27,0.92)`, `blur(16px)`, padding `0.75rem 3rem 2.5rem`) at `_sass/pages/_post.scss:72-86`, and it self-nullifies (`background:none; padding:0`) when the content contains `.post-section` (`_sass/pages/_post.scss:866`). Reading measure is `max-width: 75ch; margin: 0 auto` in two places (`_post.scss:90` for `.content`, `:834` for `.post-section > p/ul/ol/blockquote`). Sticky: `#toc-bar` (`_post.scss:523`), `#toc-wrapper` (`.position-sticky` class), plus a sticky pseudo-element at `_post.scss:424`. Fixed: `.reading-progress-bar` (`_post.scss:877`, injected by `_javascript/modules/components/post-enhance.js:72`) and a `::after` at `_post.scss:504`.

---

## 2. PROJECTS INDEX

- **Layout:** `C:/Users/Rod/Documents/ProjectFiles/Website/_layouts/section-projects.html`. Two instances: `tech-art/projects.html` (`/tech-art/projects/`) and `game-design/projects.html` (`/game-design/projects/`). `refactor: false`.
- **Slot list:**
  1. `<script defer src="/assets/js/dist/three-background-general.min.js">`
  2. `div#blog-page` (yes — the projects index reuses the blog page's root ID)
  3. `header.blog-header.mb-4` > `h1.page-title` + optional `p.page-description.text-muted`
  4. `.blog-controls.mb-4` > `.search-wrapper.mb-3 > .input-group` with `input#post-search`; then `_includes/filter-pills.html` **only when `section == 'tech-art'`** (section-projects.html:36) — a hardcoded 10-pill list (unity/unreal/godot/shader/tool/vfx/rigging/2d/3d/study). Game-design's projects page therefore has search but no filter pills.
  5. `section.pinned-section.mb-5` (if any pinned) — `h2.section-title.h4` + `.posts-grid.row.g-4` of `.col-12.col-md-6.col-lg-4.post-item` cards with `.card.border-danger`, `.badge-pinned`, optional `.badge-wip`; ends with `<hr class="my-4">`
  6. `section.all-posts-section > .posts-grid.row.g-4#posts-container` — same card shape without `border-danger`
  7. Empty state `.no-posts.text-center.py-5`
- Card internals (both grids): `article.post-card.h-100` > `a.card-link` > `.card.h-100` > `.card-img-wrapper` (or `.placeholder-img`) > `_includes/post-media.html`, then `.card-body.d-flex.flex-column` (`h3.card-title.h5`, `p.card-text` truncated to 120, `p.card-role`, `.card-meta.mt-auto` with date + computed reading time + `_includes/tag-badges.html`), then `.card-takeaway-overlay` if `post.takeaway`.
- Each `.post-item` carries `data-post-item`, `data-date`, `data-title`, `data-tags` — the hooks `initPostFilter` reads.
- **WIP redirect:** posts with `wip` and `< 20` words link to `/{section}/under-construction/?title=…&tags=…` instead of the post URL (section-projects.html:56-61, 143-149).
- **JS bundle:** `commons.min.js` (`js-selector.html:63-64` maps `section-projects` -> `commons`) + `three-background-general.min.js`. `commons.js` is the only entry that actually calls `initSearchbar()` and `initPostFilter()`.
- **Structurally notable:** `<main>` is `col-12 px-md-4` (no panel). Grid is Bootstrap 12-col: 1 / 2 / 3 across at md (768) / lg (850). `.blog-controls` is a breathing glass card (`_sass/pages/_projects.scss:29-40`). No max-width of its own — inherits the container.

---

## 3. ABOUT

- **Layout:** `C:/Users/Rod/Documents/ProjectFiles/Website/_layouts/section-about.html`. Two instances: `tech-art/about.md` (`/tech-art/about/`), `game-design/about.md` (`/game-design/about/`). `refactor: true`.
- **Slot list:**
  1. `<script defer src="/assets/js/dist/three-background-scene.min.js">` — the ONLY page type that loads the full water/dock/scroll-camera scene
  2. `div#home-page.home-content`
  3. `section#landing-box.flex-grow-1.px-xl-1`
     - `.text-container > h1#landing-title.landing-box-title` = `page.section_title`
     - `.landing-content` > `div#about-me-image.profile-container` (empty div, filled by CSS/JS) + `.about-text > .text-container` = `page.bio_intro | markdownify`
     - `.additional-content > .text-container` = `page.bio_more | markdownify` (conditional)
     - `.trophy-case > .text-container` > `h3.trophy-title` + `p.trophy-subtitle` + `div#trophy-grid.trophy-grid` (populated by `achievements.js`)
     - `{{ content }}` — legacy escape hatch, currently empty for both instances (both use `bio_intro`/`bio_more` frontmatter)
  4. `div.scene-spacer[aria-hidden]` — a full `100vh` of empty space (`_sass/base/_base.scss:511-513`) so you can scroll past content into the bare dock/lake scene
- **JS bundle:** `home.min.js` (`js-selector.html:57` maps `section-about` -> `home`) + `three-background-scene.min.js`. Note `home.js` imports `initSearchbar` but never calls it.
- **Structurally notable:** `.text-container` is the recurring unit — glass + `card-hover` + `padding: 25px` + `breathe-slow` animation, with per-instance hue/orb CSS vars set at `_sass/layout/_aboutmecontainer.scss:125-160`. `.profile-img` is `width:100%; max-width:300px` (250px on mobile). `.trophy-grid` is `repeat(auto-fill, minmax(135px, 1fr))`, 110px on mobile (`_aboutmecontainer.scss:226, 315`). `.home-content > section + section` gets a gradient separator rule (`_base.scss:496-507`) but with only one `<section>` here it never fires. Uses the `home` bundle but is NOT the `home` layout.

---

## 4. RAMBLINGS / BLOG INDEX — two separate layouts

### 4a. Ramblings
- **Layout:** `C:/Users/Rod/Documents/ProjectFiles/Website/_layouts/ramblings.html`, served by root `ramblings.html` at permalink `/ramblings/`. Source set = `site.posts` where `tags` contains `personal` and `hidden != true`.
- **Slot list:** NO Three.js script tag (only page type besides 404-adjacent that omits one — see note). `div#blog-page` > `header.blog-header.mb-4` (`h1.page-title` + `p.page-description`) > `.blog-controls.mb-4` (search only, no filter pills) > `div#post-list.flex-grow-1.px-xl-1 > .posts-vertical#posts-container` > repeated `.post-vertical-bar.post-item[data-post-item][data-title][data-date]` (note: **no `data-tags`**) > `a.vertical-bar-link` > `.vertical-bar-container.d-flex.align-items-stretch.shadow-sm.rounded-end` > `.vertical-bar-img-wrapper` (raw `<img>`, not `post-media.html`) + `.vertical-bar-content.flex-grow-1.p-3` (`h3.h5`, `p.text-muted.small`, date). Empty state uses a coffee icon.
- **JS bundle:** `commons.min.js` (falls into the `else` branch of `js-selector.html:67-68`). No Three.js background at all.

### 4b. Blogs
- **Layout:** `C:/Users/Rod/Documents/ProjectFiles/Website/_layouts/blog.html`, served by `_tabs/blogs.md` at permalink `/game-design/blogs/` with `section: game-design`. Source set = tags contains `blog`.
- **Slot list:** identical skeleton to ramblings, with two additions: the `.blog-controls` block **derives filter pills dynamically** from the union of post tags minus `blog` (blog.html:33-51, `div.filter-pills#filter-pills` of `button.filter-pill[data-tag]`), and each row carries `data-tags` plus a computed reading-time span.
- **JS bundle:** `commons.min.js`. Also no Three.js script tag — but because `page.section` is set, the topbar renders the full section nav and this page reads as a game-design section page with no background scene.

---

## 5. RESUME

**NONE.** There is no `resume` layout, no resume page, no route. The only match in the repo is `redesign-lab/resume-tests.html`, a gitignored lab bench file, not wired to the live site.

---

## 6. PORTAL / ROOT

- **Layout:** `C:/Users/Rod/Documents/ProjectFiles/Website/_layouts/portal.html`, served by root `index.html` (`layout: portal`, no other frontmatter). `refactor: true`.
- **Slot list:**
  1. `<script defer src="/assets/js/dist/three-background-general.min.js">`
  2. `div#portal-page`
  3. `.portal-header.text-center.mb-5` — `p.portal-greeting#portal-greeting` (filled by an inline IIFE at portal.html:15-26 that branches on `new Date().getHours()`), `h1.portal-title` "Rodney Fan", `p.portal-subtitle`
  4. `.portal-doors` — two `a.portal-door` (`.portal-door-tech-art` -> `/tech-art/`, `.portal-door-game-design` -> `/game-design/`), each `> .door-content > .door-icon > i` + `h2.door-title` + `p.door-description` + `span.door-cta`
  5. `.portal-extras.text-center.mt-5` — one `a.portal-side-link` to `/ramblings/` with an inline animated coffee-steam SVG (`.coffee-steam-wrap` + 3 `path.steam-line`)
- **JS bundle:** `commons.min.js` (else branch) + `three-background-general.min.js`.
- **Structurally notable:** `#portal-page` is `display:flex; flex-direction:column; align-items:center; min-height:60vh; padding:2rem 0` (`_sass/pages/_portal.scss:9-15`). `.portal-doors` is the site's only explicit content max-width: `grid-template-columns: 1fr 1fr; gap: 2rem; width: 100%; max-width: 900px`, collapsing to `1fr` at `<=768px` (`_portal.scss:59-68`). Topbar nav here is the 2-item portal branch (HOME + ARCHIVES). The fireworks toggle is NOT rendered (portal is not in the allowed-layout list at topbar.html:91).

---

## 7. 404

- **Layout:** none of its own — uses bare `_layouts/default.html`. File is `C:/Users/Rod/Documents/ProjectFiles/Website/assets/404.html` (`layout: default`, `title: "404"`, `permalink: /404.html`).
- **Slot list:**
  1. `<script src="/assets/js/dist/three-background-minimal.min.js">` — note: **no `defer`**, unlike every other page type
  2. `.not-found` > `.not-found-lantern` (🏮 emoji) > `h1.not-found-title` > `p.not-found-subtitle` > `.not-found-code` ("404") > `a.not-found-btn` -> `/`
- **JS bundle:** `commons.min.js` (`js-selector.html` else branch, since `default` matches nothing in the case) + `three-background-minimal.min.js`.
- **Structurally notable:** because `layout.refactor` is unset but `layout.layout == 'default'` is false at the page level, content passes through `refactor-content.html` only if the chain matches — here the page's own layout IS `default`, so `layout.layout` is `compress`, and `layout.refactor` is nil, so the content renders raw via `{{ content }}` (default.html:34-38). Styles live in `_sass/abstracts/_animations.scss:520-540` (`.not-found-subtitle { max-width: 450px }`) — an odd home for page styles.

---

## SUPPORTING PAGE TYPES (not asked for, but they exist and share the shell)

- `_layouts/home.html` — **ORPHANED**. Nothing in the repo sets `layout: home`; root `index.html` uses `portal`. It still loads `three-background-general.min.js` and pulls `_includes/aboutmecontainer.html` (hardcoded prose, a duplicate of what `section-about` now does via frontmatter), `_includes/blogspreview.html`, `_includes/projectspreview.html`. Its `View All` links point at `/blogs` and `/projects`, neither of which is a live route. Also note `home.html` is not closed — no `</div>` for `#home-page`.
- `_layouts/under-construction.html` — 2 instances (`/tech-art/under-construction/`, `/game-design/under-construction/`). `.under-construction` > emoji > `h1#construction-title` > subtitle > `a#back-link` > `#recommendations > #recommendations-list.recommendations-grid`. Reads `?title=` and `?tags=` from the query string and inlines a full JSON dump of every non-WIP post to score recommendations. Bundle: `commons.min.js`, no Three.js.
- `_layouts/archives.html` -> wraps `_layouts/page.html`; served by `_tabs/archives.md` at `/archives/`. Bundle: `misc.min.js`.
- `_layouts/tag.html` / `_layouts/tags.html` -> also wrap `page.html`. Bundle: `misc.min.js` (tag) / `commons.min.js` (tags falls to else).
- `_layouts/page.html` — generic `article.px-1` with `h1.dynamic-title` + `.content`. Bundle: `page.min.js`.

---

## JS BUNDLE MAP (source of truth: `_includes/js-selector.html:56-69`)

| layout | bundle | Three.js scene |
|---|---|---|
| `post` | `post.min.js` | `three-background-minimal.min.js` |
| `section-projects` | `commons.min.js` | `three-background-general.min.js` |
| `section-about` | `home.min.js` | `three-background-scene.min.js` |
| `section-landing` | `page.min.js` | `three-background-general.min.js` |
| `ramblings` | `commons.min.js` (else) | none |
| `blog` | `commons.min.js` (else) | none |
| `portal` | `commons.min.js` (else) | `three-background-general.min.js` |
| `default` (404) | `commons.min.js` (else) | `three-background-minimal.min.js`, non-deferred |
| `archives`, `tag` | `misc.min.js` | none |
| `page`, `tags` | `page.min.js` / `commons.min.js` | none |
| `under-construction` | `commons.min.js` | none |
| `home` (orphaned) | `home.min.js` | `three-background-general.min.js` |

Every bundle calls `basic()` from `_javascript/modules/layouts/basic.js`, which is the real global payload: `modeWatcher, breatheToggle, fireworksToggle, back2top, loadTooptip, initPageTransition, initAchievements, initCardTilt, initToolTaglines, initMouseTrail`. Bundle sizes: `commons` 77KB, `home` 75KB, `page` 77KB, `post` 83KB, `misc` 75KB; Three scenes are `minimal` 521KB, `general` 539KB, `scene` 659KB. `initSearchbar` is imported by `home.js`, `page.js`, `post.js`, and `misc.js` but only ever *called* in `commons.js`.

---

## _SASS WIDTH INVENTORY — what actually constrains layout today

**Breakpoints** (`_sass/abstracts/_breakpoints.scss:3-13`) — custom, NOT Bootstrap's:
`sm 576 / md 768 / lg 850 / xl 1200 / xxl 1400 / xxxl 1650`. Note `lg: 850px` diverges from Bootstrap's own `lg: 992px`, so `.col-lg-*` classes and the `bp.lg` mixin fire at different widths.

**The one global container rule** — `_sass/base/_base.scss:424-472`:
```
#main-wrapper > .container {
  min-height: 100vh;
  <=768px      -> max-width: 100%, padding 0
  <850px       -> max-width: 100%
  992-1199px   -> .col-lg-11 { flex: 0 0 96%; max-width: 96% }
  <1200px      -> > .row { justify-content: center !important }
  >=1650px     -> max-width: 1400px  ($main-content-max-width)
}
```
Between 850px and 1650px there is no explicit max-width — Bootstrap's own `.container` tiers govern (the vendored `_sass/vendors/_bootstrap.scss`, PurgeCSS output, never hand-edited). The site only reaches its 1400px ceiling at >=1650px viewport.

**Named width variables** — `_sass/abstracts/_variables.scss`:
- `$main-content-max-width: 1400px` (:123) — the only one that shapes page width; also used in `_sass/components/_buttons.scss:32` to position `#back-to-top` and in `_sass/pages/_search.scss:33,57`
- `$search-max-width: 200px` (:120)
- `$topbar-height: 260px` / `$topbar-height-large: 300px` (:101-102) — **declared but the topbar is `position: static` with no height set** (`_sass/layout/_topbar.scss:21`), so these are dead
- `$sidebar-width: 0px` / `$sidebar-width-large: 0px` (:110-111) — explicitly zeroed legacy; the `margin-left` that used them in `#main-wrapper` is commented out (`_base.scss:431-439`)
- `$container-sm/md/lg/xl/2xl: 640/768/1024/1280/1536px` (:238-242) — **declared, referenced nowhere**
- `$grid-columns: 12`, `$grid-gap: 1.5rem` (:229-231) — also unreferenced

**Per-component widths actually in force:**
| Selector | Rule | File:line |
|---|---|---|
| `#main-wrapper > .container` | `max-width: 1400px` @>=1650px | `base/_base.scss:467` |
| `.post-content-container .content` | `max-width: 75ch` centered | `pages/_post.scss:90` |
| `.post-section > p/ul/ol/blockquote` | `max-width: 75ch` | `pages/_post.scss:834` |
| `.portal-doors` | `grid 1fr 1fr`, `max-width: 900px`, -> `1fr` @<=768 | `pages/_portal.scss:61-68` |
| `.landing-tagline` | `max-width: 600px` | `pages/_section-landing.scss:33` |
| `.demo-reel` | `max-width: 420px` centered, 100% @<=768 | `pages/_section-landing.scss:222-227` |
| `.profile-img` | `width:100%; max-width: 300px` (250px mobile) | `layout/_aboutmecontainer.scss:39, 307` |
| `.trophy-grid` | `repeat(auto-fill, minmax(135px,1fr))` (110px mobile) | `layout/_aboutmecontainer.scss:226, 315` |
| `.post-nav-grid` | `1fr 1fr` -> `1fr` @<=768 | `pages/_post.scss:348-352` |
| `.recommendations` | `width:100%; max-width: 700px`; grid `repeat(3,1fr)` -> `1fr` @768 | `abstracts/_animations.scss:448-463` |
| `.construction-subtitle` | `max-width: 500px` | `abstracts/_animations.scss:443` |
| `.not-found-subtitle` | `max-width: 450px` | `abstracts/_animations.scss:533` |
| `#search-result-wrapper > div` | `max-width: 1400px` @>=850, `700px` @850-1199 | `pages/_search.scss:57, 67` |
| `.wip-placeholder-subtitle` | `max-width: 480px` | `pages/_post.scss:141` |
| `.achievement-toast` | `max-width: 280px` | `abstracts/_animations.scss:300` |
| `.tooltip-inner` | `max-width: 220px` | `base/_base.scss:337` |

**Sticky / fixed elements across the site:**
- `#topbar` — `position: static`, `z-index: 1000`, `pointer-events: none` on the header with `auto` re-enabled on interactive children (`layout/_topbar.scss:21-33`). It does NOT stick.
- `#toc-wrapper` — `.position-sticky` (Bootstrap) via `_includes/toc.html:5`; post only, hidden below 1200px
- `#toc-bar` — `position: sticky` (`pages/_post.scss:523`); post only
- `.reading-progress-bar` — `position: fixed; top:0; height:3px; z-index:9999` (`pages/_post.scss:877`); injected by JS on posts
- `.scroll-indicator` — `position: fixed; bottom:4rem; left:50%; z-index:999` (`pages/_section-landing.scss:185`); section-landing only, hidden by an inline IIFE after first scroll past 80px
- `#back-to-top` — `position: fixed` (`components/_buttons.scss:9`); all pages
- `#mask` — `position: fixed; inset: 0` (`base/_base.scss:420`); all pages
- `.achievement-toast` / `#achievement-debug` — `position: fixed` (`abstracts/_animations.scss:293, 327`)
- `.scene-spacer` — `height: 100vh` (`base/_base.scss:511`); section-about only
- `#searchbar-wrapper` — `position: sticky` (`layout/_searchbar.scss:7`), but the include that would render it is never called, so this is dead CSS