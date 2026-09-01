# Theme boundary

Chirpy is upstream "client code". This note tracks what is stock, what is modified, what is wholly
ours - and every coupling that would break a theme swap. Phase 1 of the refactor fills in the file
audit; the couplings below were established by the 2026-08-11 scan.

## The structural fact

This repo IS the theme, forked and edited in place - Chirpy's own `jekyll-theme-chirpy.gemspec`
still sits at the root and `_config.yml` still says `theme: jekyll-theme-chirpy` while the actual
theme files are vendored siblings. There is no way to tell "installed by gem" from
"vendored + modified" except diffing against upstream. That diff is the Phase 1 audit.

## File audit (Phase 1 deliverable - fill in)

Label every file in `_layouts/`, `_includes/`, `_sass/`, `_javascript/` as one of:

- **stock** - byte-identical or trivially close to upstream Chirpy
- **modified** - upstream file with our logic spliced in (extraction candidates)
- **custom** - wholly ours, no upstream equivalent

**THE AUDIT IS DONE, 2026-08-25, and it lives in its own file because it is 165 rows:**
[THEME-BOUNDARY-AUDIT.md](THEME-BOUNDARY-AUDIT.md).

Headline after the strip pass and the tag/archive port (2026-08-25, same day): **25 stock, 46 modified, 81 ours, 39 upstream files deleted.** The stock column is the only strip-or-keep surface left, and it is mostly the live comment, analytics and TOC machinery now. Half the tree is
wholly ours. The deferral that kept this table empty said "post-redesign", and the redesign has
merged, so it expired rather than being waived.

Known-modified from the scan: `_layouts/default.html` (skip-link, `data-section` injection),
`_layouts/post.html` (worst offender - see below), `_includes/topbar.html`, `_includes/head.html`,
`_sass/themes/_dark.scss`, `_sass/themes/_light.scss`.
Known-custom: portal/section layouts, `_includes/{post-media, filter-pills, related-posts,
section-nav, tag-badges, js-selector}.html`, breathing/achievements/Three.js/sparkler JS,
`_sass/abstracts/_animations.scss`.

## The couplings that break a theme swap

1. **No site/theme boundary at all** (the structural fact above).
2. **`_layouts/post.html`** - Chirpy's skeleton with engine/role meta chips (hardcoded per-engine
   icon branching), the takeaway box, the `wip` placeholder branch, the project TL;DR box, and a
   Three.js script tag spliced inline. All of it must become our own includes that a layout merely
   calls.
3. **`_includes/topbar.html`** - rewritten around section-aware nav + the breathe/sparkler/
   fireworks toggles with achievement `reward-locked` hooks.
4. **Sass has no override layer** - our variables and Chirpy's interleave in the same theme files;
   `_animations.scss` mixes pruned stock utilities with the breathing system.
5. **PurgeCSS generates `_sass/vendors/_bootstrap.scss`** from scans of `_includes/**`,
   `_layouts/**`, `_javascript/**` - renaming those paths silently invalidates it, and the safelist
   regexes are tuned to current class usage.
6. **Rollup entries mirror Chirpy layout names** and `_includes/js-selector.html` maps layout ->
   bundle. Renaming layouts breaks JS delivery.
7. **`mouse-trail.js` string-matches computed `animationName`** against breathe/throb patterns -
   coupled to CSS internals instead of a semantic hook.
8. **`$breathe-selectors` is a manually synced list** of every breathing element.
9. **Custom front matter is read directly by many render sites** - `section-landing.html`,
   `post.html`, `related-posts.html`, `tag-badges.html` all reach into `section`/`wip`/`takeaway`/
   `priority`/`pin`/`engine`/`role` with no intermediate layer.
10. **`_config.yml` `defaults` make the `_posts/` directory layout load-bearing for routing** -
    moving content directories breaks URLs site-wide, independent of theme.
11. **`redesign-lab/` holds separate copies of the live Three.js modules** - intentional during
    the redesign (it is the ACTIVE workbench, not debt), but still a latent wrong-copy hazard;
    the fold/delete decision lands with the post-redesign refactor.

## End state

Every file is either "theirs, ideally untouched" or "ours". Custom behavior attaches through
declared contracts (data attributes, a documented layout->bundle map, an override Sass layer), so a
future theme provides the skeleton and our subsystems plug in. The vendored-fork vs gem-based
decision is DEFERRED until Phases 1-2 make it meaningful (see [DECISIONS.md](DECISIONS.md)).
