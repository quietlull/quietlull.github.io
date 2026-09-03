# Architecture handoff

> **UPDATED 2026-08-26, after the markup port.** All six pages are ported. Component reachability
> went **8 of 26 to 19 of 26**. The seven still unreachable need markup that does not exist yet:
> `bio-block`, `callout-family`, `figure-real`, `reference-links`, `slap-toggle`, `washi-tape`,
> `cursor-glow`. Any line below claiming 18 stylesheets render nowhere is stale.
>
> **STALENESS NOTICE, 2026-09-02. This note is a file-by-file snapshot of one night, and six of the
> files it inventories no longer exist.** Everything else in it still reads true, so it is corrected
> here at the top rather than rewritten. MEASURED, all six are off disk:
>
> | the note says | what is true now |
> | --- | --- |
> | `purgecss.js`, `_sass/vendors/_bootstrap.scss`, `_sass/main.bundle.scss` (rows at lines 78-82, and lines 179, 395, 463) | **deleted with Bootstrap (D48).** `assets/css/jekyll-theme-chirpy.scss` is a bare `@use 'main'`, so dev and production compile the identical sheet. No CSS build step, no machine-owned stylesheet. |
> | `_sass/components/_callout-family.scss` (lines 5, 134, 618) | **deleted.** The callout system is the `{% callout %}` Liquid block in `_plugins/callout.rb`, writing `.d-callout` styled from `_sass/base/_decisions.scss:507-638`. |
> | `_sass/components/_slap-toggle.scss` and `assets/js/components/top-bar.js` (lines 5, 142, 363-366, 619, 647-648) | **deleted** in the D47 strip. The slap toggle chain went with them. |
> | `_sass/pages/_home.scss` (line 170) and `_sass/layout/_blogspreview.scss` (line 171) | **renamed:** `_sass/pages/_stub-pages.scss` and `_sass/pages/_blog.scss`. |
> | "`redesign-lab/` is gitignored. It has no history." (lines 52, 710, 780) | **no longer true.** D49 put the lab in version control; `.gitignore:37-38` now holds only the two hold piles. Deletions there ARE recoverable. What keeps the lab off production is `.github/workflows/pages-deploy.yml:68`, which removes it from `_site` before upload. |
>
> New since this note: `tools/css-order-check.mjs`, which catches two partials painting the same
> property on the same element where only the `@forward` order decides the winner. That is the real
> version of the load-order question this note discusses.


Written for the agent who picks up the optimization and architecture restructure cold, with no
memory of the merge nights. Everything here was measured against the repo, not recalled.

**Measured 2026-08-26 at commit `0e5b8ca` on branch `refactor/01-tokens`. That branch has since
merged into `main` at `ff72c0e` and is pushed — so this describes `main` now.**

**Read this before you trust a line count.** A second agent was compressing comments across
`_sass/` while this was written, and HEAD moved five times during the measurement. The `_sass/`
counts below are a stamped snapshot, not a standing fact, and they were still falling when this
was saved (`_animations.scss` went 573 to 415 in one pass, `_topbar.scss` 494 to 427). Treat them
as **relative size**, which is what they are useful for, and re-derive the absolute number before
you act on it:

```sh
find _sass -name '*.scss' | sort | xargs wc -l
```

Structure, reachability, layers and tokens are stable. Line counts are not. Everything else in
this file was verified against a real production build, not inferred.

This file is the inventory and the reachability map. [ARCHITECTURE.md](ARCHITECTURE.md) is the
subsystem map (what each thing does). They do not overlap much. Two facts in ARCHITECTURE.md are
already stale: it says the type faces are Outfit / Plus Jakarta / JetBrains (the tokens now say
M PLUS Rounded 1c / Caveat / IBM Plex Mono), and it says `_sass/` holds 38 files (it holds 69).

---

## IF YOU READ NOTHING ELSE

1. Every colour, font and space in the redesign is a token in `_sass/abstracts/_tokens.scss`. 84 of
   them. That file is the whole palette.
2. A token that does not resolve renders its **fallback** and is wrong **without erroring**. This
   has bitten five times in two days. Measure the rendered page, do not grep and assume.
3. The ported CSS is wrapped in `@layer`. The old site's CSS is not. **Unlayered CSS beats every
   layer**, whatever the specificity or the load order.
4. Six class names still collide across that line: `post-card`, `card-title`, `card-body`,
   `card-meta`, `card-link`, `takeaway-text`. The old side wins all six.
5. The element-level collisions (`body`, `h1`-`h4`) were fixed tonight in `61ede67` and `9f6d826`.
   The type ladder now reaches the page. Do not re-break it.
6. 7 of the 26 ported component stylesheets style markup that exists on **zero** live pages. They
   compile into every page and paint nothing. That is the port being half done, not dead code.
7. The six `final-*` pages in `redesign-lab/` are the design. Their components and chrome are
   ported. The pages themselves are not.
8. `redesign-lab/` is gitignored. It has no history. Anything deleted there is gone for good.
9. Three files implement the same card tilt with byte-identical maths. Three JS files are
   byte-identical forks across lab and live.
10. Chirpy is upstream client code. Delete ours or delete theirs, never edit theirs.

**Re-derive the whole snapshot:**

```sh
JEKYLL_ENV=production bundle exec jekyll build --destination /tmp/check
# then read /tmp/check/assets/css/jekyll-theme-chirpy.css, which is what actually ships
```

---

## 1. Every file that matters

Grouped by role. "Loaded by" is the part that costs hours to rebuild, so it is the point of the
table.

Re-derive line counts:
`find _sass -name '*.scss' | sort | xargs wc -l`

### 1a. Build entry points

| File | Lines | What it does | Loaded by |
|---|---|---|---|
| `assets/css/jekyll-theme-chirpy.scss` | 11 | The one stylesheet the browser links. Picks `main` in dev, `main.bundle` in production. | `_includes/head.html` |
| `_sass/main.scss` | 10 | Forwards the five buckets in order: abstracts, base, components, layout, pages. | the above |
| `_sass/main.bundle.scss` | 2 | Production only. Bootstrap first, then `main`. | the above |
| `rollup.config.js` | 88 | Builds 11 JS bundles into `assets/js/dist/`. | `npm run build` |
| `purgecss.js` | 43 | Strips Bootstrap to used classes and wraps it in `@layer vendor`. | `npm run build` |
| `_config.yml` | 261 | Jekyll config. Section routing lives in `defaults` keyed on `_posts/` subdirectories. | jekyll |
| `_plugins/posts-lastmod-hook.rb` | 14 | Sets `last_modified_at` from git. | jekyll |

### 1b. Tokens and abstracts, all unlayered

| File | Lines | What it does | Read by |
|---|---|---|---|
| `_sass/abstracts/_tokens.scss` | 265 | **The canonical palette.** 84 custom properties on `:root`. | everything |
| `_sass/abstracts/_index.scss` | 6 | Forwards the six abstracts. Tokens go first so `:root` exists before anything reads it. | `main.scss` |
| `_sass/abstracts/_variables.scss` | 245 | The OLD design's Sass variables. Compile-time, not custom properties. | old partials |
| `_sass/abstracts/_mixins.scss` | 455 | Old design mixins, glass morphism among them. | old partials |
| `_sass/abstracts/_placeholders.scss` | 219 | Old design `%placeholder` set. | old partials |
| `_sass/abstracts/_breakpoints.scss` | 73 | Old design media-query mixins. | old partials |
| `_sass/abstracts/_animations.scss` | 415 | Old design keyframes plus the breathing kill-switch selector list. | old partials |

### 1c. Base, the ground every page stands on

| File | Lines | Layer | What it does |
|---|---|---|---|
| `_sass/base/_index.scss` | 25 | mixed | Forwards the old base partials, then the three ported ones. Its header comment explains the order. |
| `_sass/base/_foundations.scss` | 67 | `reset` | Paints the page ground: warm wash, blue wash, three drifting orange blobs. |
| `_sass/base/_decisions.scss` | 913 | `prose` | The type ladder H0-H4 and every settled text decision. Declares 9 heading tokens of its own. |
| `_sass/base/_focus-ring.scss` | 48 | `overrides` | The global `:focus-visible` indicator. WCAG 2.4.7 and 2.4.11. |
| `_sass/base/_reset.scss` | 41 | none | Old design reset. |
| `_sass/base/_base.scss` | 650 | none | Old design page shell, `html` and `body` chrome. |
| `_sass/base/_typography.scss` | 248 | none | Old design type. Its heading rules were removed tonight so the ladder could reach the page. |
| `_sass/base/_syntax.scss` | 257 | none | Code highlighting. |
| `_sass/base/_a11y.scss` | 131 | none | Old design tap targets and contrast fixes. |

### 1d. Ported components, all in `@layer components`

All 26 came from `redesign-lab/extracted/components/<name>/<name>.css` on 2026-08-25. Forwarded
alphabetically by `_sass/components/_index.scss`. "On live pages" means at least one of the file's
own class names appears in the rendered HTML of the 53 built pages.

Re-derive: build the site, then grep the rendered HTML for each file's root class.

| File | Lines | On live pages |
|---|---|---|
| `_top-bar.scss` | 355 | yes |
| `_footer-line.scss` | 85 | yes |
| `_favicon.scss` | 77 | yes |
| `_line-boil.scss` | 105 | yes |
| `_portrait-frame.scss` | 349 | partly, only its favicon classes |
| `_toc-real.scss` | 216 | partly |
| `_project-cards-expensive.scss` | 219 | partly |
| `_merged-card.scss` | 408 | **no**, its root `.merged-cards` renders nowhere |
| `_achievement-wall.scss` | 519 | no |
| `_portal-window.scss` | 521 | no |
| `_washi-tape.scss` | 263 | no |
| `_entry-row.scss` | 286 | no |
| `_callout-family.scss` | 279 | no |
| `_empty-state.scss` | 246 | no |
| `_bio-block.scss` | 242 | no |
| `_page-title-desc.scss` | 225 | no |
| `_related-card-real.scss` | 215 | no |
| `_search-field.scss` | 135 | no |
| `_drift-magnet.scss` | 159 | no |
| `_button-kit.scss` | 149 | no |
| `_slap-toggle.scss` | 128 | no |
| `_figure-real.scss` | 59 | no |
| `_cursor-glow.scss` | 51 | no |
| `_section-head.scss` | 51 | no |
| `_stamp-callout.scss` | 46 | no |
| `_reference-links.scss` | 40 | no |

Two components predate the port and belong to the old design: `_buttons.scss` (68) and
`_popups.scss` (199). Both unlayered.

### 1e. The old design's CSS, all unlayered

This is the half that wins every fight it picks. `_projectspreview.scss` is the one that matters
most, because it owns five of the six surviving class collisions.

| File | Lines | Styles |
|---|---|---|
| `_sass/pages/_post.scss` | 996 | The post page. Largest file in the tree. |
| `_sass/themes/_dark.scss` | 523 | 265 custom properties on `html`. |
| `_sass/layout/_topbar.scss` | 427 | The old top bar. **Its markup no longer renders.** |
| `_sass/themes/_light.scss` | 373 | 183 custom properties on `html`. |
| `_sass/layout/_projectspreview.scss` | 342 | The project cards. Owns `.post-card`, `.card-title`, `.card-body`, `.card-meta`, `.card-link`, `.takeaway-text`. |
| `_sass/layout/_aboutmecontainer.scss` | 320 | The old about block. |
| `_sass/pages/_projects.scss` | 285 | Projects page. |
| `_sass/pages/_section-landing.scss` | 257 | Section landing page. |
| `_sass/pages/_portal.scss` | 218 | The portal at `/`. |
| `_sass/pages/_search.scss` | 186 | Search results. |
| `_sass/pages/_archives.scss` | 180 | Archives. Was never forwarded until 2026-08-25. |
| `_sass/pages/_home.scss` | 162 | Home. |
| `_sass/layout/_blogspreview.scss` | 158 | Blog preview cards. |
| `_sass/layout/_panel.scss` | 89 | The right-hand panel. |
| `_sass/pages/_categories.scss` | 88 | Categories. Was never forwarded until 2026-08-25. |
| `_sass/pages/_category-tag.scss` | 63 | `#page-tag`, which renders on 20 of 53 pages. Was never forwarded until 2026-08-25. |
| `_sass/layout/_searchbar.scss` | 63 | The old search bar. **Its markup no longer renders.** |
| `_sass/layout/_footer.scss` | 38 | The old footer. **Its markup no longer renders.** |
| `_sass/pages/_tags.scss` | 24 | Tags. Was never forwarded until 2026-08-25. |

`_sass/vendors/_bootstrap.scss` (8 lines, one of them 38 KB) is PurgeCSS output. Machine-owned,
never hand-edit. It is wrapped in `@layer vendor`, which is the lowest-priority layer, so it now
loses to everything of ours. That wrapper landed tonight in `c443d9d` and it fixed Bootstrap
silently winning the body colour and the whole type ladder.

`assets/css/chrome-scene.css` (83 lines) is a plain stylesheet linked from `head.html`. It paints
`#hana-bg` and `#scrim`. It is in `@layer components`. It sits outside `_sass/` only because a
second agent owned that tree on merge night, and it can be folded into `_sass/base/` with no
change to the rules.

### 1f. Layouts

`default.html` is the spine. Everything except `compress` reaches the browser through it.

| File | Lines | What it does | Used by |
|---|---|---|---|
| `_layouts/compress.html` | 10 | Strips whitespace from the final HTML. | `default` |
| `_layouts/default.html` | 167 | The page shell. Picks the scene tier, mounts the top bar, the footer and the chrome scripts. | every other layout |
| `_layouts/section-projects.html` | 225 | The projects grid. | `tech-art/projects.html`, `game-design/projects.html` |
| `_layouts/section-landing.html` | 220 | A section's front page. | `tech-art/index.html`, `game-design/index.html` |
| `_layouts/post.html` | 206 | A post. Pulls in TOC, related posts, post nav, comments. | every post |
| `_layouts/blog.html` | 122 | The blog index. | `_tabs/blogs.md` |
| `_layouts/under-construction.html` | 101 | The placeholder page. | two section stubs |
| `_layouts/ramblings.html` | 97 | Ramblings index. | `ramblings.html` |
| `_layouts/portal.html` | 67 | The root portal. Carries no bar and no footer. | `index.html` |
| `_layouts/section-about.html` | 61 | A section's about page. Only layout that gets the full scene. | `tech-art/about.md`, `game-design/about.md` |
| `_layouts/archives.html` | 35 | Archives. | `_tabs/archives.md` |
| `_layouts/home.html` | 30 | The Chirpy home layout. | nothing currently |
| `_layouts/tag.html` | 23 | A tag page. | jekyll-archives, 20 pages |
| `_layouts/tags.html` | 22 | The tag list. | jekyll-archives |
| `_layouts/page.html` | 20 | A generic page. | Chirpy convention |

The scene tier is keyed on the layout, not the URL, and `default.html` writes it onto
`<body data-scene-tier>`. `section-landing` and `section-about` get `full`, `post` gets `none`,
everything else gets `minimal`.

Layout names are a **named contract**. `_includes/js-selector.html` maps layout name to JS bundle,
so renaming a layout breaks the JavaScript, not just the styling.

### 1g. Includes that are reached

Re-derive: grep `_layouts/`, `_includes/` and `_config.yml` for each filename, and remember that
`comment.html` and `head.html` build include paths at runtime.

| File | Lines | What it does | Included by |
|---|---|---|---|
| `head.html` | 160 | The whole `<head>`. Fonts, stylesheets, the Bootstrap vendor-layer import, the JS selector. | `default` |
| `refactor-content.html` | 259 | Rewrites post HTML after Markdown: images, tables, code blocks, headings. | `default` |
| `related-posts.html` | 99 | Scores posts by shared tags, section and category. | `post` |
| `js-selector.html` | 94 | Maps layout name to a `dist/*.min.js` bundle. | `head`, `search-loader` |
| `top-bar.html` | 91 | The redesign top bar. Replaced `topbar.html` on 2026-08-25. | `default` |
| `projectspreview.html` | 77 | The old project card grid. | `home` |
| `blogspreview.html` | 78 | The old blog card grid. | `home` |
| `footer-line.html` | 67 | The redesign footer. Sits outside the content column so it anchors left. | `default` |
| `chrome-scripts.html` | 55 | Loads the scene bundle or the bloom, then the chrome module and the effects. | `default` |
| `post-sharing.html` | 52 | Share buttons. | `post` |
| `search-loader.html` | 49 | Boots the search. | `default` |
| `aboutmecontainer.html` | 47 | The old about block. | `home` |
| `post-nav.html` | 45 | Previous and next post. | `post` |
| `read-time.html` | 37 | Estimates reading time. | `post` |
| `media-url.html` | 37 | Resolves a media path against the CDN setting. | 5 callers |
| `section-nav.html` | 37 | Section links. | `topbar.html`, which is now dead |
| `tag-badges.html` | 36 | Tag chips. | `post`, `section-landing`, `section-projects` |
| `filter-pills.html` | 33 | The project filter row. | `section-projects` |
| `post-description.html` | 30 | Post blurb. | `related-posts` |
| `jsdelivr-combine.html` | 26 | Combines CDN URLs into one request. | `js-selector` |
| `favicons.html` | 19 | Favicon links. | `head` |
| `post-media.html` | 16 | Picks a post's hero image or video. | 5 callers |
| `origin-type.html` | 13 | Chooses the CDN or self-hosted asset set. | `default` |
| `language-alias.html` | 70 | Maps code-fence language aliases. | `refactor-content` |
| `datetime.html` | 20 | Formats a date. | 5 callers |
| `lang.html` | 10 | Resolves the page language. | 12 callers |
| `toc-status.html` | 10 | Decides whether a TOC should render. | `post`, `toc` |
| `toc.html` | 9 | The TOC container. | `post` |
| `search-results.html` | 9 | The search results container. | `default` |
| `comment.html` | 5 | Switches to the configured comment provider. | `post` |
| `metadata-hook.html` | 1 | An empty extension point Chirpy calls. | `head` |
| `comments/giscus.html` | 55 | Giscus. Reached because `_config.yml` sets `comments.provider: giscus`. | `comment.html` at runtime |
| `analytics/goatcounter.html` | 6 | GoatCounter. Reached because `_config.yml` sets an id. | `head.html` at runtime |
| `pageviews/goatcounter.html` | 21 | The view counter. Reached because `pageviews.provider` is set. | `js-selector` at runtime |

### 1h. Zero inbound references

Nothing on this list is reached by any template, any config value, or any runtime include path.
Verified by grepping `_layouts/`, `_includes/`, `_tabs/`, `_plugins/` and `_config.yml`, and by
checking the two dynamic include paths (`comments/{provider}` and `analytics/{platform}`).

| File | Lines | Why it is dead |
|---|---|---|
| `_includes/topbar.html` | 154 | Replaced by `top-bar.html` on 2026-08-25. Named only inside a comment now. |
| `_includes/footer.html` | 31 | Replaced by `footer-line.html`. Named only inside a comment now. |
| `_includes/searchbar.html` | 59 | Only `topbar.html` called it. |
| `_includes/post-paginator.html` | 91 | Chirpy stock, never wired up. |
| `_includes/trending-tags.html` | 46 | Chirpy stock, never wired up. |
| `_includes/update-list.html` | 40 | Chirpy stock, never wired up. |
| `_includes/notification.html` | 24 | Chirpy PWA update prompt, never wired up. |
| `_includes/comments/disqus.html` | 57 | Unused provider. |
| `_includes/comments/utterances.html` | 38 | Unused provider. |
| `_includes/analytics/*.html` (5 files) | 44 total | Unused providers: cloudflare, fathom, google, matomo, umami. |
| `_includes/embed/*.html` (6 files) | 142 total | Chirpy embed shortcodes, never called. |
| `_javascript/performance-monitor.js` | 70 | Imported by nothing. Unreachable from every entry point. |
| `assets/js/dist/three-background-minimal.min.js` | 525 KB | Every reference to it is now inside a comment. Rollup still builds it. |

`_includes/section-nav.html` (37) is transitively dead, because `topbar.html` was its only caller.

The three old stylesheets whose markup no longer renders are `_sass/layout/_topbar.scss` (494),
`_sass/layout/_searchbar.scss` (63) and `_sass/layout/_footer.scss` (38). They still compile.

### 1i. JavaScript

Two worlds. `_javascript/` is Rollup input and becomes `assets/js/dist/*.min.js`.
`assets/js/` is served as native ES modules with no build step.

Re-derive the graph: parse `import ... from` across both trees and walk from the entry points.

**Rollup entry points and what requests them:**

| Bundle | Size | Requested by |
|---|---|---|
| `commons.min.js` | 77 KB | `js-selector.html` for `section-projects` and anything unmatched |
| `home.min.js` | 74 KB | `js-selector.html` for `home` and `section-about` |
| `page.min.js` | 77 KB | `js-selector.html` for `page` and `section-landing` |
| `post.min.js` | 82 KB | `js-selector.html` for `post` |
| `categories.min.js` | 74 KB | `js-selector.html` for `categories` |
| `misc.min.js` | 74 KB | `js-selector.html` for `archives`, `category`, `tag` |
| `theme.min.js` | 2 KB | `head.html`, on every page |
| `app.min.js` | 662 B | `head.html`, production only, PWA |
| `sw.min.js` | 1 KB | the service worker registration |
| `three-background-scene.min.js` | 843 KB | `chrome-scripts.html` for every non-post page |
| `three-background-minimal.min.js` | 525 KB | **nothing** |

The bundle path is built at runtime (`/assets/js/dist/{{ js }}.min.js`), so grepping for a literal
filename will wrongly report five of these as dead. It caught me. Read `js-selector.html` instead.

Each Three.js bundle carries its own full copy of three.js. That is why `minimal` is 525 KB to draw
35 spheres.

**`_javascript/` module graph.** `modules/components.js` (18) is the barrel every page bundle
imports. `modules/layouts/basic.js` (17) is the per-page init that decides what actually runs.

| File | Lines | Imported by |
|---|---|---|
| `modules/components/achievements.js` | 567 | `components.js` |
| `modules/components/mouse-trail.js` | 364 | `components.js` |
| `modules/components/post-enhance.js` | 324 | `components.js` |
| `modules/components/post-filter.js` | 174 | `components.js` |
| `modules/components/card-tilt.js` | 157 | `components.js` |
| `modules/components/clipboard.js` | 149 | `components.js` |
| `modules/components/toc/toc-mobile.js` | 125 | `modules/components/toc.js` |
| `modules/components/search-display.js` | 116 | `modules/layouts/searchbar.js` |
| `modules/components/tool-taglines.js` | 105 | `components.js` |
| `modules/components/img-loading.js` | 67 | `components.js` |
| `modules/components/fireworks-toggle.js` | 65 | `components.js` |
| `modules/components/page-transition.js` | 61 | `components.js` |
| `modules/components/mermaid.js` | 60 | `components.js` |
| `modules/components/locale-datetime.js` | 53 | `components.js` |
| `modules/components/img-popup.js` | 51 | `components.js` |
| `modules/components/back-to-top.js` | 36 | `components.js` |
| `modules/components/category-collapse.js` | 36 | `components.js` |
| `modules/components/toc.js` | 36 | `components.js` |
| `modules/components/toc/toc-desktop.js` | 20 | `modules/components/toc.js` |
| `modules/components/mode-toggle.js` | 15 | `components.js` |
| `modules/components/tooltip-loader.js` | 11 | `components.js` **DELETED 2026-09-02 (D50), the file no longer exists** |
| `modules/config/storage-keys.js` | 10 | 4 components. The single source for localStorage keys. |
| `modules/utils/color-utils.js` | 32 | `mouse-trail.js` |

**The Three.js side.** `three-background-scene.js` (147) is the only one still requested.

| File | Lines | Imported by |
|---|---|---|
| `firework-controller.js` | 521 | `three-background-scene.js` |
| `three-shared.js` | 396 | both scene bundles. `createBaseScene` owns renderer, composer, bloom, paper filter. |
| `shader/mirroredSurface.js` | 390 | `three-background-scene.js` |
| `shader/kawaseBloom.js` | 382 | `three-shared.js` |
| `lantern-controller.js` | 307 | both scene bundles |
| `shader/lanternShaderManager.js` | 144 | both scene bundles |
| `three-config.js` | 138 | `three-shared.js` |
| `shader/lanternShader.js` | 113 | `shader/lanternShaderManager.js` |

**`assets/js/`, native modules, no build step.**

| File | Lines | What it does | Loaded by |
|---|---|---|---|
| `chrome.js` | 32 | The shared chrome's entry. Imports the three component modules and starts them. | `chrome-scripts.html`, every page |
| `components/drift-magnet.js` | 339 | The page-level magnetic-drift engine. | `chrome.js`, `slap-toggle.js` |
| `components/line-boil.js` | 174 | Cycles six hand-drawn faces per glyph. Waits on `document.fonts` before measuring. | `chrome.js` |
| `components/slap-toggle.js` | 50 | The toggle switch. | `components/top-bar.js` |
| `components/top-bar.js` | 8 | Wires the bar's toggles. | `chrome.js` |
| `effects/scene-mode.js` | 114 | Reads `body[data-scene-tier]` and hides the dock and water for `minimal`. | `chrome-scripts.html` |
| `effects/fireworks-reach.js` | 101 | Runtime override so auto fireworks reach the top of the viewport. | `chrome-scripts.html`, non-post pages |
| `effects/hana-bloom.js` | 31 | Bakes two canvases as the whole background on post pages. | `chrome-scripts.html`, post pages only |
| `data/swconf.js` | 47 | Service worker config. | the service worker |
| `data/mathjax.js` | 25 | MathJax config. | `js-selector.html` when `page.math` |

`effects/fireworks-reach.js` exists only because fixing it properly means one line in
`_javascript/firework-controller.js:198` and a 1.4 MB rebuild. Its own header records the removal
steps. Do that during the restructure and delete the file.

### 1j. Content and pages

| Path | What it is |
|---|---|
| `index.html` (3) | The root portal. Layout `portal`. |
| `ramblings.html` (6) | Ramblings index. Layout `ramblings`. |
| `_tabs/blogs.md` (7), `_tabs/archives.md` (5) | The two Chirpy tabs still in use. |
| `tech-art/`, `game-design/` | Four files each: `index.html`, `projects.html`, `about.md`, `under-construction.html`. |
| `_posts/tech-art/`, `_posts/game-design/`, `_posts/blogs/` | The posts. The directory layout IS the routing contract, via `_config.yml` `defaults`. |
| `_data/projects.yml` (82) | The project registry. |
| `_data/contact.yml` (53), `share.yml` (50), `media.yml` (18), `authors.yml` (11) | Site data. |
| `_data/origin/basic.yml` (39), `cors.yml` (54) | CDN vs self-hosted asset URLs. `origin-type.html` picks one. |
| `_data/locales/en.yml` (91) | UI strings. |
| `_gif-archive/` | 414 MB of original GIF sources. Slated to move out of the repo. |
| `assets/media/`, `assets/tex/`, `assets/mesh/`, `assets/fonts/` | Binary assets. The six `Lineboil*` and `Numberboil*` TTFs feed `line-boil.js`. |

### 1k. Machine-owned, never hand-edit

- `_sass/vendors/_bootstrap.scss`, written by `purgecss.js`.
- `assets/js/dist/`, written by Rollup, and gitignored.

---

## 2. The layer model

**The one paragraph.** Every stylesheet the redesign brought over opens with
`@layer reset, tokens, prose, components, overrides;` and wraps its body in one of those layers.
Bootstrap gets wrapped in `vendor`, which registers first and is therefore lowest. The old site's
partials are wrapped in nothing at all, and **unlayered CSS beats every cascade layer regardless of
specificity or load order**. So a one-class unlayered rule from 2025 beats a three-class layered
rule written tonight, and it does it silently. This is the project's most-repeated fault: it has
shipped broken to 40 pages once already (D36). The repeated order statement is idempotent, the
first one the browser sees wins and the rest are no-ops, so restating it in 30 files is correct
rather than redundant. The footgun is a file that loses its wrapper, because that file then wins
over everything.

**Layer order as it actually ships:** `vendor`, `reset`, `tokens`, `prose`, `components`,
`overrides`, then unlayered on top of all of them.

`tokens` is declared and used by nothing. `_tokens.scss` declares its `:root` unlayered, which is
fine and arguably right, since the canonical palette should not be outrankable. Decide during the
restructure whether to move it into `tokens` or drop the name from the statement.

**Rule counts in the shipping production CSS:**

| Layer | Rules | Whose |
|---|---|---|
| `vendor` | 403 | Bootstrap, purged |
| `reset` | 24 | ported |
| `prose` | 73 | ported |
| `components` | 482 | ported |
| `overrides` | 4 | ported |
| unlayered | 987 | the old design, and it wins |

### Collisions, measured against a real production build at `978888b`

Re-derive by building, then parsing the compiled CSS with brace matching that skips strings (a
naive matcher trips over Bootstrap's SVG data-URIs and reports false collisions).

**Elements: none left.** `body`, `h1`, `h2`, `h3` and `h4` are still declared on both sides, but
they no longer share a single property. Commits `61ede67` and `9f6d826` removed the old heading and
body rules tonight, which is what let the type ladder reach the page. What survives unlayered is
`scroll-margin-top` on the headings and `padding` plus `-webkit-font-smoothing` on `body`. `html`
is declared on both sides and shares nothing: unlayered sets `color-scheme` and the old theme
tokens, `reset` sets `scroll-behavior`.

**Classes: six, all still live.**

| Class | Layered rule | Unlayered rule | Status |
|---|---|---|---|
| `card-title` | `h4,.d-h4,.card-title` in `prose`, plus 3 in `components` | `_projectspreview.scss:200`, and `#post-list .card .card-body .card-title` sets `color` | **live**, the old `color` wins on post-list pages |
| `post-card` | 10 rules in `components`, all under `.merged-cards` | 18 rules in `_projectspreview.scss` | latent, `.merged-cards` renders nowhere |
| `card-body` | 1 rule, under `.merged-cards` | 13 rules | latent |
| `card-meta` | 1 rule, under `.merged-cards` | 1 rule | latent |
| `card-link` | 1 rule, under `.merged-cards` | 1 rule | latent |
| `takeaway-text` | 1 rule, under `.merged-cards` | 2 rules | latent |

"Latent" means the ported rules are scoped under `.merged-cards`, and no rendered page carries that
class yet. The moment the merged card ships as real markup, all five go live and the old side wins
all five. Fix them before that, not after.

**IDs: none.**

### The trap that will get you

`.jekyll-cache/` and stale build output will hand you the wrong CSS. Worse, another agent
regenerating `_sass/vendors/_bootstrap.scss` mid-session changed the answer under me once tonight.
Build to a scratch destination and read that file, and check `git log` before you trust a
measurement that is more than a few minutes old.

---

## 3. The tokens

`_sass/abstracts/_tokens.scss` is the canonical set. **84 custom properties, all on one unlayered
`:root`, no duplicates.** 36 came from the redesign. 48 were promoted from hard-coded literals
during the port on 2026-08-25, none of which changed a rendered value.

Re-derive: `grep -cE '^\s+--[a-z0-9-]+:' _sass/abstracts/_tokens.scss` after stripping comments.

### The 36 originals

| Group | Names |
|---|---|
| Core palette (4) | `--color-night` `#070c23`, `--color-night-2` `#0a1030`, `--color-text` `#f5f3ef`, `--color-muted` `#9aa3bd` |
| Warm lantern ramp (4) | `--color-glow-soft` `#ffd9a8`, `--color-gold` `#fbbf24`, `--color-gold-deep` `#f59e0b`, `--color-glow` `#ff6a00` |
| The one cool accent (1) | `--color-accent-cool` `#3090a8`. Spend it rarely, on the single most important mark per view. |
| Surfaces and lines (8) | `--color-panel` `rgba(28,26,24,.55)`, `--color-panel-solid` `#1c1a18`, `--color-glass` `rgba(7,12,35,.4)`, `--color-line` `rgba(251,191,36,.26)`, `--color-line-soft` `rgba(255,255,255,.1)`, `--color-line-faint` `rgba(255,255,255,.06)`, `--color-surface` `rgba(255,255,255,.05)`, `--color-surface-faint` `rgba(255,255,255,.03)` |
| Component-anchored (9) | `--color-ink` `#1a1a1a`, `--color-cover-hi` `#1b2452`, `--color-cover-lo` `#0b1024`, `--color-warm-muted` `rgba(245,232,208,.72)`, `--color-stamp-paper` `#1e160e`, `--color-code-bg` `#0a0e22`, `--color-code-text` `#cdd3e8`, `--color-code-green` `#9bdc8a`, `--color-icon-stroke` = `--color-gold-deep` |
| Type (4) | `--font-hand` Caveat, `--font-display` M PLUS Rounded 1c, `--font-body` M PLUS Rounded 1c, `--font-mono` IBM Plex Mono |
| Spacing (6) | `--space-1` .25rem, `--space-2` .5rem, `--space-3` 1rem, `--space-4` 1.5rem, `--space-5` 2.5rem, `--space-6` 4rem |
| Z-index (3) | `--z-content` 1, `--z-chrome` 60, `--z-overlay` 200 |

`--font-display` and `--font-body` are the same face on purpose. Rod settled it on 2026-08-18: the
site has one text face, one hand face and one mono, and nothing reaches for a serif.

### The 48 promoted on 2026-08-25

| Group | Names |
|---|---|
| Achievement rarity ladder (8) | `--tier-bronze-dark` `#8a5222`, `--tier-bronze` `#b87333`, `--tier-bronze-light` `#d99a5c`, `--tier-silver-dark` `#8f9096`, `--tier-silver` `#c9cbd1`, `--tier-silver-light` `#f2f3f5`, `--tier-gold-dark` `#a9740f`, `--tier-gold-light` `#ffe6a3`. Gold has no base token because its base is `--color-gold`. |
| Prismatic tier (4) | `--tier-prismatic-pink` `#e879a6`, `--tier-prismatic-sky` `#7dd3fc`, `--tier-prismatic-green` `#86efac`, `--tier-prismatic-rim` `#eaf4ff`. The flagged exception to keeping cool colour in the sky. |
| Hairlines (3) | `--color-line-card` `rgba(245,158,11,.14)`, `--color-line-panel` `rgba(245,158,11,.15)`, `--color-line-tag` `rgba(245,158,11,.2)`. Three amber hairlines one alpha step apart. Flagged, not unified, because collapsing them would change what renders. |
| Panels (1) | `--color-panel-blue` `rgba(8,15,27,.92)`. Not yet referenced by anything in `_sass`; its consumers are the unported `final-*` pages. |
| Black and white (2) | `--color-black` `#000000`, `--color-white` `#ffffff`. The only two names the old themes also define, at the same values. |
| Shadows (5) | `--color-shadow` `.45`, `--color-shadow-card` `.55`, `--color-shadow-lift` `.6`, `--color-shadow-text` `.9`, `--color-shadow-warm` `rgba(88,70,48,.5)`. Named by the job, not the number. |
| The glass plane (5) | `--color-glass-sheen-lo`, `--color-glass-sheen-hi`, `--color-glass-edge`, `--color-glass-edge-soft`, `--color-window-bar` |
| Card covers (2) | `--color-cover-mid` `rgba(11,16,36,.62)`, `--color-cover-mid-warm` `rgba(28,26,24,.62)` |
| Dwell ring (2) | `--color-ring-track` `rgba(255,255,255,.16)`, `--color-ring-hole` `rgba(8,12,30,.9)` |
| Marks and quiet text (4) | `--color-tag-text`, `--color-highlight` `#412c11`, `--color-line-grey` `#383838`, `--color-text-quiet` |
| Tape hues (2) | `--tape-pink` `#f078f0`, `--tape-green` `#6fbf73`. The other two tape colours are `--color-glow` and `--color-accent-cool`. |
| The page ground (7) | `--color-ground-warm`, `--color-ground-warm-0`, `--color-ground-sky` `#16224a`, `--color-ground-sky-0`, `--color-glow-drift-left`, `--color-glow-drift-right`, `--color-glow-drift-bottom` |
| Line-tag alpha and misc (3) | remainder of the promoted block |

The `-0` tokens exist because a gradient to plain `transparent` fades through grey in some engines.
Each must keep the same rgb triplet as its partner at zero alpha. Do not "simplify" them away.

### A second, smaller token source

`_sass/base/_decisions.scss` declares its own `:root` inside `@layer prose` with 9 names:
`--color-silver`, `--color-muted-warm`, `--color-orange`, `--h0-color` through `--h4-color`, and
`--emphasis-color`. That is the heading semantic layer. `--color-orange` `#f86a03` is deliberately
not `--color-glow` `#ff6a00`, because `--color-glow` is used 75 times and does two jobs. Two oranges
three shades apart now live on the same pages, and which other uses should follow is Rod's call
(REQUESTS P205).

### The old tokens

`_sass/themes/_dark.scss` declares 265 custom properties on `html`, `_light.scss` declares 183, for
276 distinct names. D42 declares them dead. Two facts make removing them safe, both measured:

- `_includes/`, `_layouts/`, `_javascript/` and `assets/` reference them **zero** times. There is no
  `var(--)` and no `setProperty` anywhere outside `_sass/`. Chirpy never read them.
- Exactly **one** ported file reads a name that sounds like an old token: `_merged-card.scss:302`
  reads `--gold-35`. It defines it itself at line 32. So the true cross-boundary count is **zero**.

Only two names ever overlapped between the two sets, `--z-content` and `--z-overlay`, both z-index
plumbing, neither a colour.

### The failure mode, and the diagnostic that finds it

**A token name that does not resolve renders its FALLBACK and is wrong WITHOUT ERRORING.** No
console message, no build failure, no lint hit. Five real cases in two days:

| Case | What happened |
|---|---|
| `--color-pink` | Defined in no stylesheet anywhere. `var(--color-pink, #ff7ec8)` rendered its fallback pink for weeks, in two components. |
| `--aw-glow-r` | The declaration said `--aw-glow-r`, the reader said `--glow-r`. The gradient fell back to 90px instead of 170px. |
| `--aw-orbit` | Declared and read by nothing after a refactor removed the keyframe. |
| `.visually-hidden` | Not a token, same shape of bug. The class lived only on the bench page's chrome, so 29 labels rendered as visible text once ported. |
| a shadowed `size` variable | An inner scope quietly took over an outer name. |

**Do not diagnose this by grepping.** Grep tells you the name exists somewhere, which is exactly
what a fallback bug looks like. Diagnose it by measuring the rendered page:

```js
getComputedStyle(el).getPropertyValue('--token-name')   // empty string means it does not resolve
getComputedStyle(el).fontWeight                         // measure TWO weights, not one
document.elementFromPoint(x, y)                         // "is this actually painted, and by what"
```

Measure two values of anything laddered. The font-weight ladder collapsed to 400 across the whole
site once because weights 100 and 300 never loaded, and checking one weight would have looked fine.

The current sheet has 630 custom properties defined and 536 distinct `var()` reads. The reads with
no definition anywhere are all either Bootstrap internals, Font Awesome internals, or per-instance
variables that a parent rule sets. None of them is a live defect today, but re-run the check after
any deletion pass:

```js
// in the compiled CSS: collect every `--x:` and every `var(--x)`, then diff the two sets
```

---

## 4. Known duplication, ranked

Counts re-verified at `29a9ee2`.

### 4.1 Three tilt implementations, byte-identical maths

| File | Lines | Perspective | Lift | Plumbing it adds |
|---|---|---|---|---|
| `_javascript/modules/components/card-tilt.js` | 157 | `800px`, inside the transform | 6px | Selector list, a "wait for real mouse movement" gate, rect caching, one shared scroll/resize invalidator, gyro |
| `redesign-lab/extracted/components/merged-card/merged-card.js` | 271 | on the parent | 6px | Dwell ring at 900ms, gyro, card flip |
| `redesign-lab/extracted/components/achievement-wall/achievement-wall.js` | 396 | `170px`, inside the transform | 1px | Tier rendering, counter bar, toast queue |

All three compute the identical thing:

```js
const x = ((px - rect.left) / rect.width  - 0.5) * 2;
const y = ((py - rect.top)  / rect.height - 0.5) * 2;
// rotateX(-y * MAX) rotateY(x * MAX)
```

All three use `MAX = 8` degrees and `scale 1.02`. The 170px perspective is not a different
decision, it is `1000 * 64/376`, the same apparent depth at a smaller tile.

**A shared home** would be `pointerTilt(el, { maxDeg, liftPx, scale, perspective })` in
`_javascript/modules/utils/`, returning a teardown function, owning nothing but the `transform`
property. Roughly 60 lines replacing about 120 of duplicated core across the three, and it is the
natural place to put the rect-caching and the movement gate that only `card-tilt.js` currently has.

### 4.2 `prefers-reduced-motion`, 20 independent checks, 3 contracts in JS

8 JavaScript checks in 8 files, plus 12 CSS `@media` blocks. **Nothing listens for the query
changing**, so flipping the OS setting mid-session does nothing anywhere.

| Contract | Behaviour | Sites |
|---|---|---|
| A. Refuse to start | `if (matches) return;` at init | `card-tilt.js:23`, `mouse-trail.js:86`, `post-enhance.js:121` |
| B. Read once, an explicit toggle can override | the saved user preference wins | `breathe-toggle.js:20`, `fireworks-toggle.js:44`, `achievements.js:151` |
| C. Decide later, or translate into a class | per-click, or sets `body.motion-off` and everything reads the class | `page-transition.js:39`, `drift-magnet.js:274` |

Contract C via `body.motion-off` is the only one that can respond to a change, and it is the right
model. **A shared home** is one module that resolves the preference once, applies `body.motion-off`,
listens for the media query changing, and exports a `motionAllowed()` predicate. Every other site
then reads the class or calls the predicate. That collapses three contracts into one and fixes the
"never re-checks" bug for free.

The 12 CSS blocks live in `_animations.scss`, `_decisions.scss` (x2), `_foundations.scss`,
`_callout-family.scss`, `_empty-state.scss`, `_entry-row.scss`, `_favicon.scss`,
`_merged-card.scss`, `_slap-toggle.scss`, `chrome-scene.css`, and one `no-preference` block in
`_toc-real.scss`. Those are per-component and mostly fine, but they should all key off the same
body class once contract C is the only contract.

### 4.3 Easing curves, 22 uses, 11 distinct curves

| Curve | Uses | Note |
|---|---|---|
| `cubic-bezier(0.4, 0, 0.2, 1)` | 4 | Material standard |
| `cubic-bezier(0.4, 0, 1, 1)` | 3 | Material accelerate |
| `cubic-bezier(0.0, 0, 0.2, 1)` | 3 | Material decelerate |
| `cubic-bezier(.22,1,.36,1)` | 2 | same curve as the next row, different spelling |
| `cubic-bezier(0.22, 1, 0.36, 1)` | 1 | same curve as the previous row |
| `cubic-bezier(.2,.6,.2,1)` | 2 | within rounding distance of the next row |
| `cubic-bezier(0.2, 0.7, 0.2, 1)` | 1 | within rounding distance of the previous row |
| 4 others | 1 each | `(0.34,1.56,0.64,1)`, `(0,0,0.3,2)`, `(.4,.4,0,1)` and one more |

Two pairs are the same or near-same curve written twice. **A shared home** is four tokens next to
the spacing scale: `--ease-standard`, `--ease-in`, `--ease-out`, `--ease-spring`. That is a naming
job, not a retune, and it makes "the site's motion feels inconsistent" a one-file fix.

### 4.4 Byte-identical lab and live JS forks

| Live file | Lab file | State |
|---|---|---|
| `assets/js/components/drift-magnet.js` | `redesign-lab/extracted/components/drift-magnet/drift-magnet.js` | **identical, 339 lines** |
| `assets/js/components/line-boil.js` | `redesign-lab/extracted/components/line-boil/line-boil.js` | **identical, 174 lines** |
| `assets/js/effects/hana-bloom.js` | `redesign-lab/hana-bloom.js` | **identical, 31 lines** |
| `assets/js/components/slap-toggle.js` | `.../slap-toggle/slap-toggle.js` | 2 lines differ |
| `assets/js/components/top-bar.js` | `.../top-bar/top-bar.js` | 2 lines differ |
| `assets/js/effects/fireworks-reach.js` | `redesign-lab/effects/fireworks-reach.js` | 15 lines differ |
| `assets/js/effects/scene-mode.js` | `redesign-lab/effects/scene-mode.js` | 231 lines differ |

Three files are already drifting and nobody edited them twice on purpose. This is the wrong-copy
hazard in TRAPS.md, made concrete.

### 4.5 The 26 forked component stylesheets

Every one of the 26 ported components exists twice: `_sass/components/_<name>.scss` and
`redesign-lab/extracted/components/<name>/<name>.css`. Comparing them at HEAD, ignoring line
endings, the difference is about 22 lines of port header for most of them, and more for these:

| Component | Differing lines | Header is ~22 of them |
|---|---|---|
| `bio-block` | 88 | real drift |
| `merged-card` | 46 | real drift |
| `achievement-wall` | 39 | real drift |
| `portal-window` | 36 | real drift |
| `washi-tape` | 36 | real drift |
| `top-bar` | 32 | modest drift |
| the other 20 | 3 to 28 | header only |

The lab files use CRLF, the ported ones do not, so a plain `diff` reports every line as changed.
Use `diff --strip-trailing-cr`, or you will conclude the files are unrelated.

### 4.6 Smaller repeats

- `bgfade` appears in `assets/css/chrome-scene.css` and `assets/js/effects/hana-bloom.js` in the
  live tree, and in 17 more files inside `redesign-lab/`. Only the two live ones matter for the
  restructure; the rest die with the lab.
- Two draw-in keyframes animate `stroke-dashoffset` to 0 under different names, in
  `redesign-lab/extracted/components/draw-in-icons/` and `.../skills-row/`. Neither is ported yet,
  so fix it once, on the way in.
- 40 distinct `@keyframes` names in `_sass/`, each declared once. Seven of them are `breathe*`
  variants. Worth a look during the restructure, but there is no name collision.
- 26 inline `style=` attributes across 5 template files, carrying 14 distinct hard-coded hex
  colours and 16 distinct style strings. See section 8.

---

## 5. The rules that must hold

These are not preferences. Each one is written because breaking it cost a session.

1. **One behaviour per transform lane.** Movement owns `translate`, size owns `scale`, perspective
   and rotation own `transform`. Whoever writes `transform` is then the only writer on that element.
   The achievement wall broke because the hover folded `1.3` into `transform` by hand and the tilt
   wrote `transform` too, so the later write won. Splitting them into separate properties fixed it
   with no maths change.
2. **Every colour is a token.** Rod's reason is reversibility: "so we can return later if need be".
   A hard-coded colour is a value that cannot be found, changed, or reverted. This applies to
   template `style=` attributes as much as to CSS.
3. **A component may not depend on a class it does not define.** `.visually-hidden` lived only on
   the bench page's own chrome, so porting the component made 29 labels render as visible text. If
   a component needs a utility, it ships the utility or it stops needing it.
4. **Comments are ONE SPOKEN LINE, active voice (D45).** "This file draws the top bar", not "This
   file is responsible for the rendering of the top bar component". The reasoning, the provenance
   and the rejected alternatives live in the component's `.md`, not above the code.
5. **Chirpy is upstream client code (D2).** Add in our own files rather than editing theirs, even at
   the cost of duplication. When ours and theirs conflict, delete ours or delete theirs. Never edit
   theirs. Upstream bugs get flagged in [UPSTREAM.md](UPSTREAM.md), not silently fixed.
6. **`redesign-lab/` is gitignored, so it has no history.** Nothing there is recoverable after
   deletion. Copy before you cut. The existing `redesign-lab/_BACKUP-pre-deletion-2026-08-26/` and
   `redesign-lab/_TRASH-2026-08-25/` are exactly that discipline, and both should outlive the merge
   until the port is verified.
7. **Layout is Rod's alone.** After every change, check whether it moved the layout. If it did, it
   needed his direct instruction first, and a fix's side effect is not instruction.
8. **Anti-bloat.** An optimization that adds code (a cache, a dirty flag, a guard, a helper
   extracted to save three lines) is bloat. Fewer lines and readability win. This supersedes the
   earlier micro-optimization passes (D5). The consolidations in section 4 pass this test because
   each one deletes more than it adds.
9. **Verify empirically.** Check the rendered page, the computed styles and the built output, never
   the code's intent. Cite `file:line` or say "inference".

---

## 6. What is deliberately unfinished

### 6.1 The six `final-*` pages are not ported

`redesign-lab/final-landing.html`, `final-projects.html`, `final-about.html`, `final-post.html`,
`final-ramblings.html` and `final-portal.html` are the design. What has been ported is their
**components** (26 stylesheets), their **chrome** (top bar, footer line, scene backdrop, the
`chrome.js` module) and their **tokens**. The pages themselves have not been turned into Jekyll
layouts.

That is why 7 of the 26 ported component stylesheets currently paint nothing. The CSS is waiting
for markup that only exists inside those six HTML files.

Each page also carries page-level CSS in its own `<style>` block that the port did not cover.
`--color-panel-blue` is the visible symptom: it is a token with three consumers, all of them inside
`final-about`, `final-post` and `final-ramblings`. When a page gets ported, its page CSS has to be
stripped **with** the component that replaces it, because a page rule at P200 can legitimately
override a layered component and you will not notice which is which afterwards.

### 6.2 The bench consolidation

`redesign-lab/extracted/components/` holds the built components. Everything else in
`redesign-lab/` is workbench: `rework-*.html`, `*-tests.html`, the reference gallery, the palette
explorer, the session logs. **Only the workbench components are ours.** `rework-*.html` and the
loose files in `extracted/` are source *candidates*, never sources, and a CSS header claiming
provenance is a claim rather than evidence. Check what it points at, and if it points inside this
repo there is no source.

`docs/MERGE-WORKLIST.md` is the strip list for the merge: lab chrome, dead CSS, components carrying
deleted features, and 14 circular citations. Re-count before trusting its numbers.

### 6.3 The 13 to 16 inline style rules

26 `style=` attributes across 5 files, 16 distinct style strings, 14 distinct hard-coded hex
colours. Every one is a hard override that no component and no token can reach.

| File | Count | What they are |
|---|---|---|
| `_layouts/section-landing.html` | 10 | Tool icon brand colours and four gradient text fills |
| `_includes/filter-pills.html` | 7 | Filter pill icon colours |
| `_includes/tag-badges.html` | 7 | Tag badge icon colours |
| `_layouts/post.html` | 1 | One tool icon colour |
| `_layouts/under-construction.html` | 1 | `display:none` on a container, which is behaviour rather than paint |

The colours are third-party brand colours (Unity orange `#f5792a`, Python blue `#3776ab`, Blender
and so on), so they are a legitimate exception to "every colour is a token" in origin, but not in
mechanism. They should become `--tool-unity`, `--tool-python` and friends, set as a class on the
element. That removes the hard override and makes the set auditable.

### 6.4 `original-css/` must outlive the merge

`redesign-lab/original-css/` is a frozen copy of every lab stylesheet as it stood **before** the
cascade-layer refactor of 2026-08-23. Rod asked for it: "keep a copy of the original to see what
breaks". Nothing links it. `redesign-lab/layer-diff.html` renders a page twice, once against that
set and once against the live set, and it is the only way to tell a layer regression from a
deliberate change. It is also gitignored, so if it goes, it is gone.

**Do not delete it during the merge.** It stops being useful only once the last `final-*` page is
ported and verified.

### 6.5 Other known-open items

- `three-background-minimal.min.js` (525 KB) is built by Rollup and requested by nothing. Remove
  the Rollup target and `_javascript/three-background-minimal.js` (99 lines) once you have
  confirmed the `minimal` scene tier is genuinely served by the `scene` bundle plus
  `scene-mode.js`.
- Each Three.js bundle carries its own copy of three.js. A shared vendor chunk is the fix and has
  never been attempted.
- `assets/js/effects/fireworks-reach.js` is a runtime monkey-patch standing in for a one-line
  change at `_javascript/firework-controller.js:198`. Make the change, rebuild, delete the file.
- `assets/css/chrome-scene.css` and `assets/js/chrome.js` both live outside their natural homes
  (`_sass/base/` and `commons.js`) purely because two agents were working in parallel. Fold them in.
- `_javascript/performance-monitor.js` (70 lines) is imported by nothing.
- `_gif-archive/` is 414 MB and is slated to move out of the repo.

---

## 7. Where to start

The dependency order that will not fight itself:

1. Finish the class collisions in section 2 while `.merged-cards` is still latent. Five of the six
   are free right now and will not be after the merged card ships.
2. Delete the old CSS whose markup no longer renders (`_topbar.scss`, `_searchbar.scss`,
   `_footer.scss`) and the includes in section 1h. Zero-risk, and it shrinks the unlayered side
   that everything else has to fight.
3. Then the token deletion. The measurement says the blast radius is exactly the old design's own
   partials, and that nothing outside `_sass/` reads them.
4. Then the duplication consolidations in section 4, cheapest first: easing tokens, then
   reduced-motion, then tilt.
5. Port the six `final-*` pages last, because every earlier step reduces what a ported page has to
   fight.
