# Theme boundary

Chirpy is upstream "client code". This note tracks what is stock, what is modified, what is
wholly ours, and every coupling that would break a theme swap.

## The structural fact

This repo IS the theme, forked and edited in place. Chirpy's own `jekyll-theme-chirpy.gemspec`
still sits at the root and `_config.yml:4` still says `theme: jekyll-theme-chirpy`, while the
actual theme files are vendored siblings. There is no way to tell "installed by gem" from
"vendored and modified" except by diffing against upstream, which is what the audit below is.

> **THIS IS A DATED SNAPSHOT, and files have been deleted since. Corrected 2026-09-02.** Six rows
> below name files that no longer exist: `_sass/main.bundle.scss` (line 59),
> `_sass/vendors/_bootstrap.scss` (194) and `purgecss.js` went with Bootstrap under D48;
> `_sass/components/_callout-family.scss` (166) and `_sass/components/_slap-toggle.scss` were
> deleted with the callout rework and the D47 strip; `_sass/pages/_home.scss` (110) and
> `_sass/layout/_blogspreview.scss` (188) are `_sass/pages/_stub-pages.scss` and
> `_sass/pages/_blog.scss` now. The COUNTS in the table below are still the right ones to quote,
> because they were taken after the strip pass. Re-run the method rather than editing rows.

## The file audit (Phase 1 deliverable) - DONE 2026-08-25

**Method, so it can be re-run rather than trusted.** Downloaded the upstream tag the fork claims,
`v7.3.1` (`jekyll-theme-chirpy.gemspec:5`), and compared every file in `_layouts`, `_includes`,
`_sass` and `_javascript` byte for byte, ignoring only line endings and trailing whitespace.
The gem is NOT installed (`gem contents jekyll-theme-chirpy` finds nothing) - the repo is the
theme, which is exactly why this diff was the only way to know.

| Label | Count | Meaning |
| --- | --- | --- |
| stock | 25 | byte-identical to upstream 7.3.1 |
| modified | 46 | upstream file with our changes spliced in |
| ours | 81 | no upstream counterpart at all |
| deleted | 39 | upstream files this fork no longer carries |
| **audited** | **152** | |

**Read the shape, not just the counts.** Half the tree (81 of 152) is wholly ours, and the
modified column is not evenly spread: the top of it is barely Chirpy any more. `_sass/layout/_index.scss`
is 100% changed, `_sass/themes/_dark.scss` 96%, `_sass/components/_index.scss` 92%,
`_sass/abstracts/_variables.scss` 90%, `_sass/pages/_post.scss` 89%. Those are ours wearing an
upstream filename. The tail is the opposite: eight files are under 5% changed, which means a
handful of lines we could extract and then take the file back to stock.

### Stock - untouched Chirpy (25)

This is the real remaining Chirpy surface. Anything here is a strip-or-keep decision, not a
rewrite.

| File | Lines | Status |
| --- | --- | --- |
| `_layouts/compress.html` | 10 |  |
| `_layouts/page.html` | 20 |  |
| `_includes/analytics/goatcounter.html` | 6 |  |
| `_includes/comment.html` | 5 |  |
| `_includes/comments/giscus.html` | 55 |  |
| `_includes/datetime.html` | 20 |  |
| `_includes/favicons.html` | 19 |  |
| `_includes/jsdelivr-combine.html` | 26 |  |
| `_includes/lang.html` | 10 |  |
| `_includes/language-alias.html` | 70 |  |
| `_includes/metadata-hook.html` | 1 |  |
| `_includes/origin-type.html` | 13 |  |
| `_includes/post-description.html` | 30 |  |
| `_includes/toc-status.html` | 10 |  |
| `_sass/abstracts/_breakpoints.scss` | 73 |  |
| `_sass/base/_reset.scss` | 41 |  |
| `_sass/main.bundle.scss` | 2 |  |
| `_javascript/modules/components/img-loading.js` | 67 |  |
| `_javascript/modules/components/locale-datetime.js` | 53 |  |
| `_javascript/modules/components/mermaid.js` | 60 |  |
| `_javascript/modules/components/toc.js` | 36 |  |
| `_javascript/modules/components/toc/toc-desktop.js` | 20 |  |
| `_javascript/modules/components/toc/toc-mobile.js` | 125 |  |
| `_javascript/modules/components/tooltip-loader.js` | 11 |  |
| `_javascript/pwa/sw.js` | 92 |  |

**Three are provably unreachable today** and are the cheapest wins in the strip pass. The rest
are live or conditional: the analytics and pageviews partials only emit when their id is set,
and the six `embed/` partials are an author-facing API (`{% include embed/youtube.html %}`) that
no post uses yet. Unused is not the same as dead for those.

### Modified - upstream file, our changes (46)

Sorted by how far each has drifted. **High drift is an extraction candidate** (take the file
back to stock and move our part into our own file); **low drift is a revert candidate** (a few
lines to lift out, then the file is stock again).

| File | Changed | Lines |
| --- | --- | --- |
| `_sass/layout/_index.scss` | 100% | 3 |
| `_sass/themes/_dark.scss` | 97% | 411 |
| `_sass/components/_index.scss` | 92% | 46 |
| `_sass/abstracts/_variables.scss` | 90% | 245 |
| `_sass/pages/_archives.scss` | 90% | 48 |
| `_layouts/tag.html` | 89% | 86 |
| `_sass/pages/_post.scss` | 89% | 484 |
| `_sass/pages/_tags.scss` | 88% | 44 |
| `_includes/post-nav.html` | 82% | 45 |
| `_layouts/post.html` | 81% | 160 |
| `_sass/abstracts/_mixins.scss` | 81% | 456 |
| `_sass/pages/_index.scss` | 81% | 24 |
| `_sass/abstracts/_placeholders.scss` | 78% | 220 |
| `_layouts/archives.html` | 77% | 70 |
| `_sass/base/_index.scss` | 69% | 22 |
| `_layouts/default.html` | 66% | 215 |
| `_javascript/commons.js` | 60% | 5 |
| `_javascript/modules/layouts/basic.js` | 57% | 16 |
| `_javascript/theme.js` | 54% | 63 |
| `_javascript/pwa/app.js` | 52% | 40 |
| `_javascript/modules/layouts.js` | 50% | 1 |
| `_javascript/modules/components/back-to-top.js` | 49% | 36 |
| `_sass/main.scss` | 38% | 9 |
| `_javascript/home.js` | 38% | 5 |
| `_javascript/modules/components.js` | 38% | 16 |
| `_javascript/misc.js` | 33% | 5 |
| `_sass/base/_base.scss` | 31% | 639 |
| `_sass/abstracts/_index.scss` | 27% | 7 |
| `_sass/pages/_home.scss` | 24% | 163 |
| `_sass/base/_typography.scss` | 23% | 243 |
| `_includes/related-posts.html` | 20% | 121 |
| `_javascript/post.js` | 20% | 20 |
| `_includes/media-url.html` | 16% | 46 |
| `_sass/components/_popups.scss` | 16% | 199 |
| `_includes/head.html` | 15% | 160 |
| `_sass/components/_buttons.scss` | 14% | 67 |
| `_javascript/page.js` | 14% | 13 |
| `_includes/js-selector.html` | 12% | 96 |
| `_includes/refactor-content.html` | 8% | 259 |
| `_sass/pages/_categories.scss` | 7% | 88 |
| `_includes/pageviews/goatcounter.html` | 5% | 21 |
| `_sass/base/_syntax.scss` | 2% | 257 |
| `_sass/pages/_category-tag.scss` | 2% | 63 |
| `_javascript/modules/components/clipboard.js` | 2% | 149 |
| `_includes/read-time.html` | 1% | 36 |
| `_javascript/modules/components/img-popup.js` | 1% | 51 |

### Ours - no upstream counterpart (81)

Not a theme-swap risk by definition. Listed so the boundary is complete.

| File | Lines |
| --- | --- |
| `_layouts/blog.html` | 103 |
| `_layouts/portal.html` | 165 |
| `_layouts/ramblings.html` | 96 |
| `_layouts/section-about.html` | 85 |
| `_layouts/section-landing.html` | 119 |
| `_layouts/section-projects.html` | 96 |
| `_layouts/under-construction.html` | 101 |
| `_includes/about-scripts.html` | 15 |
| `_includes/blog-scripts.html` | 10 |
| `_includes/chrome-scripts.html` | 62 |
| `_includes/footer-line.html` | 67 |
| `_includes/kit-filter-pills.html` | 19 |
| `_includes/landing-scripts.html` | 87 |
| `_includes/portal-scripts.html` | 42 |
| `_includes/post-media.html` | 16 |
| `_includes/project-card.html` | 80 |
| `_includes/projects-scripts.html` | 13 |
| `_includes/ramblings-scripts.html` | 9 |
| `_includes/skills-row.html` | 53 |
| `_includes/social-sprite.html` | 12 |
| `_includes/tag-badges.html` | 57 |
| `_includes/top-bar.html` | 104 |
| `_sass/abstracts/_animations.scss` | 462 |
| `_sass/abstracts/_tokens.scss` | 294 |
| `_sass/base/_a11y.scss` | 128 |
| `_sass/base/_decisions.scss` | 640 |
| `_sass/base/_focus-ring.scss` | 31 |
| `_sass/base/_foundations.scss` | 63 |
| `_sass/components/_achievement-wall.scss` | 366 |
| `_sass/components/_bio-block.scss` | 112 |
| `_sass/components/_button-kit.scss` | 158 |
| `_sass/components/_callout-family.scss` | 170 |
| `_sass/components/_cursor-glow.scss` | 28 |
| `_sass/components/_drift-magnet.scss` | 136 |
| `_sass/components/_empty-state.scss` | 130 |
| `_sass/components/_entry-row.scss` | 177 |
| `_sass/components/_favicon.scss` | 70 |
| `_sass/components/_figure-real.scss` | 59 |
| `_sass/components/_footer-line.scss` | 85 |
| `_sass/components/_line-boil.scss` | 105 |
| `_sass/components/_merged-card.scss` | 405 |
| `_sass/components/_page-title-desc.scss` | 108 |
| `_sass/components/_portal-window.scss` | 377 |
| `_sass/components/_portrait-frame.scss` | 196 |
| `_sass/components/_project-cards-expensive.scss` | 208 |
| `_sass/components/_reference-links.scss` | 40 |
| `_sass/components/_related-card-real.scss` | 132 |
| `_sass/components/_search-field.scss` | 135 |
| `_sass/components/_section-head.scss` | 51 |
| `_sass/components/_stamp-callout.scss` | 46 |
| `_sass/components/_toc-real.scss` | 159 |
| `_sass/components/_top-bar.scss` | 313 |
| `_sass/components/_washi-tape.scss` | 146 |
| `_sass/layout/_blogspreview.scss` | 46 |
| `_sass/pages/_about.scss` | 164 |
| `_sass/pages/_portal.scss` | 99 |
| `_sass/pages/_projects.scss` | 180 |
| `_sass/pages/_ramblings.scss` | 43 |
| `_sass/pages/_section-landing.scss` | 181 |
| `_sass/vendors/_bootstrap.scss` | 8 |
| `_javascript/firework-controller.js` | 508 |
| `_javascript/lantern-controller.js` | 307 |
| `_javascript/modules/components/achievements.js` | 496 |
| `_javascript/modules/components/card-tilt.js` | 157 |
| `_javascript/modules/components/fireworks-toggle.js` | 50 |
| `_javascript/modules/components/mouse-trail.js` | 365 |
| `_javascript/modules/components/page-transition.js` | 61 |
| `_javascript/modules/components/post-enhance.js` | 210 |
| `_javascript/modules/components/post-filter.js` | 174 |
| `_javascript/modules/components/tool-taglines.js` | 105 |
| `_javascript/modules/config/storage-keys.js` | 9 |
| `_javascript/modules/utils/color-utils.js` | 32 |
| `_javascript/performance-monitor.js` | 71 |
| `_javascript/shader/kawaseBloom.js` | 382 |
| `_javascript/shader/lanternShader.js` | 113 |
| `_javascript/shader/lanternShaderManager.js` | 145 |
| `_javascript/shader/mirroredSurface.js` | 390 |
| `_javascript/three-background-minimal.js` | 99 |
| `_javascript/three-background-scene.js` | 147 |
| `_javascript/three-config.js` | 137 |
| `_javascript/three-shared.js` | 396 |

### Already deleted from upstream (39)

Mostly the merge, plus tonight's cleanup. Recorded because a Chirpy upgrade would try to
reintroduce every one of them.

- `_layouts/categories.html`
- `_layouts/category.html`
- `_layouts/home.html`
- `_layouts/tags.html`
- `_includes/analytics/cloudflare.html`
- `_includes/analytics/fathom.html`
- `_includes/analytics/google.html`
- `_includes/analytics/matomo.html`
- `_includes/analytics/umami.html`
- `_includes/comments/disqus.html`
- `_includes/comments/utterances.html`
- `_includes/embed/audio.html`
- `_includes/embed/bilibili.html`
- `_includes/embed/twitch.html`
- `_includes/embed/video.html`
- `_includes/embed/youtube.html`
- `_includes/footer.html`
- `_includes/notification.html`
- `_includes/post-paginator.html`
- `_includes/post-sharing.html`
- `_includes/search-loader.html`
- `_includes/search-results.html`
- `_includes/sidebar.html`
- `_includes/toc.html`
- `_includes/topbar.html`
- `_includes/trending-tags.html`
- `_includes/update-list.html`
- `_sass/layout/_footer.scss`
- `_sass/layout/_panel.scss`
- `_sass/layout/_sidebar.scss`
- `_sass/layout/_topbar.scss`
- `_sass/pages/_search.scss`
- `_sass/themes/_light.scss`
- `_javascript/categories.js`
- `_javascript/modules/components/category-collapse.js`
- `_javascript/modules/components/mode-toggle.js`
- `_javascript/modules/components/search-display.js`
- `_javascript/modules/layouts/sidebar.js`
- `_javascript/modules/layouts/topbar.js`
