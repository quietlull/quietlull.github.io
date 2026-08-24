# Merge worklist

Everything standing between today and the redesign living on the real site, in the order it has to
happen. Built 2026-08-18 from an eight-agent sweep (docs, lab backlog, in-code markers, live-vs-lab
gap, build health, content, quality gates, plus a completeness critic). Every line was verified
against the repo; nothing here is asserted from memory.

After this ships, [REFACTOR-PLAN.md](REFACTOR-PLAN.md) Phases 1-3 begin. Nothing in this note is
refactor work - the refactor is deliberately downstream of it.

## WHERE WE ARE - the whole road to the main site (2026-08-23)

Three stages, in order, and they cannot overlap. Stage 2 needs a finished lab; stage 3 needs the
redesign to have replaced the very surfaces it would refactor (D6).

```
  STAGE 1  FINISH THE LAB          24 of 97 slots approved      <- WE ARE HERE (merging components in)
  STAGE 2  THE PORT                gates 0-6 below, 0 done of 6
  STAGE 3  JEKYLL REFACTOR         REFACTOR-PLAN phases 1-3, all deferred
```

**Measured 2026-08-23, not estimated** - `[data-slot][data-state=approved]` counted on each page:

| surface | approved | slots | what it is waiting on |
|---|---|---|---|
| `final-portal` | **9** | 9 | **COMPLETE** - the centre mark is the line boil, 2026-08-23 |
| `final-landing` | **9** | 12 | project cards, and only their scaling |
| `final-post` | 4 | 19 | the component merge, blocked on the `.prose` prefix policy |
| `final-projects` | 1 | 19 | every element; card is circular-citation Slop |
| `final-about` | 1 | 26 | the 3B horizontal spacing call, then the trophy wall |
| `final-ramblings` | 1 | 12 | every element, all unsourced |

**The portal is now the most finished surface** (Rod 2026-08-23: everything approved but the centre
name), with the landing just behind it. Nothing else is above 4 of 19.

**Count correction, 2026-08-23.** These per-page totals were briefly overwritten with an inflated set
(105 slots) taken by grepping the bare string `data-slot`, which also matches the state panel's own
selector and the CSS. **The numbers in this table were right; the "measurement" that overruled them
was not.** Re-counted on the attribute: **97 slots**, and 24 approved once Rod signed off the portal and the demo reel.

### What actually gates progress, in dependency order

1. ~~**The callout family (#3).**~~ **DECIDED - D30.** Four categories, tape colour encodes type.
2. ~~**The `.prose` prefix policy.**~~ **SOLVED by cascade layers, D36** - not by either patch. The
   next question it leaves is whether a page's inline `<style>` may override the ladder.
2b. **THE MERGE ITSELF - this is now the work.** 22 of the 25 pending slot TYPES have a built
   component; only the post's metadata rail, the portal's identity mark and the About trophy wall do
   not. The components are on the bench and the final pages are clean. **Merging them in is stage
   1's remaining job.** Old text follows for the record: **Eight** components, **53** losing
   declarations, measured by `prose-collisions.html` off the real stylesheets. The worst case renders
   dark text on a dark panel at **1.06:1**. Both candidate fixes are rendered side by side at the top
   of that page and look identical, so the call is about portability, not looks.
3. ~~**The About 3B horizontal spacing call.**~~ **DECIDED - option A, built 2026-08-23.** The V6 tile
   rebuild and the achievements-as-scene-controls work (D34) are now unblocked behind it.
4. **The 12 circular-citation components (gate 3, item 16).** By the ledger's own rule Slop is not
   shippable, and the landing already links two of them - so the surface Rod calls done is not
   portable yet. Largest provenance debt on the project.
5. ~~**The portal rebuild.**~~ **BUILT AND APPROVED 2026-08-23**, 8 of 9 slots. The trophy wall is
   still unbuilt, but its tile design is settled (V6) and only its colours wait, on the About scene.
6. **The token bridge (gate 2, item 10).** 39 lab tokens vs 270 live, two names in common, no
   mapping file. Every one of the lab stylesheets depends on it and nothing can port without it.

### Stage 3 is not small and it is not optional

`REFACTOR-PLAN.md` phases 1-3 were deferred so the boundary work happens ONCE, on the final
surfaces. They are still ahead of us:
- **Phase 1** draw the theme boundary - diff every layout/include/sass/js against upstream Chirpy,
  extract our logic out of modified stock files, create the Sass override layer.
- **Phase 2** decouple - `data-breathing` as the single hook (kills both the manual
  `$breathe-selectors` list and the `animationName` string match), plus the **teardown + memory
  audit** that was deliberately parked here rather than done during the redesign.
- **Phase 3** theme-swap readiness - only meaningful once the boundary exists.

**The honest sequencing risk:** stage 2 ports lab code into files stage 3 then restructures. Some
port work will be redone. That is the accepted cost of D6 (boundary work happens once, on the final
surfaces) and it is cheaper than extracting a boundary around surfaces that are about to be
replaced - but it should not be a surprise when it happens.

## The thing to understand first

**Nothing of the redesign has ever touched the live site.** Grep every bench class name
(`top-bar__`, `slap-toggle`, `goo-toggle`, `drift-magnet`, `js-magnetic`, `draw-in-icons`,
`h__vert`, `h__clock`) across `_sass/ _layouts/ _includes/ _javascript/` and you get zero hits. So
"merge the new theme" is not a hookup. It is a first port.

And the two sides do not currently share a substrate. The critic measured all three gaps:

| | lab | live |
|---|---|---|
| tokens | 39 `--color-*` / `--font-*` in `extracted/styles/settings.css` | 270 custom properties in `_sass/themes/_dark.scss` |
| shared token names | **2** (`comm -12` of the sorted lists) | |
| CSS delivery | 27 flat `.css` files, one per component | 5-partial SCSS forward chain through `_sass/main.scss` |
| JS format | 18 ES modules exporting `init()` | 12 IIFE rollup bundles, chosen by a layout-name switch |

Those three decisions gate every individual component port, so they are sequenced ahead of the
component work rather than discovered during it.

---

## Gate 0 - stop the bleeding

**DONE 2026-08-18**, except one item that needs a GitHub action Rod has to take.

1. ~~Commit the working tree.~~ **Done.** Seven commits on `claude/water-rework`, since
   fast-forwarded into `main` by Rod and pushed. The docs system, the fireworks split, the flat
   emissive, the Sarah avoidance rework and the Umamusume post are all in history now.
2. ~~Recover `STYLE.md` and `_data/projects.yml`.~~ **Done.** Both are on `main`:
   - `_data/projects.yml` came over by cherry-picking `0c379a8`, which was already a clean
     single-purpose commit.
   - `STYLE.md` v2.1 (415 lines) was recovered as a FILE, not a cherry-pick, because its source
     commit on `feat/projects-registry` was called "Stuff" and also carried a machine-local
     settings change.
   - The `vibe-site-research` skill came over with it - style-not-niche reference hunting, which is
     the method the gallery and blockout passes run on.
   - `feat/projects-registry` now has **nothing unique left** except its
     `.claude/settings.local.json` permission allowlist. It is safe to delete.
   - **Currency note on STYLE.md:** its deviations log calls Rule 86 (accessible authentication)
     and Rule 60 (input purpose) "dormant - the site is static with no forms; they activate if
     comments ever ship." Comments HAVE shipped (giscus). Rod's call whether to wake those rules.
3. **Dependabot: CLOSE both PRs, do not rebase and do not merge.** Needs Rod - `gh` is not
   installed on this machine. Both branches were cut 2025-09-28 and their merge base is **227
   commits behind main**. Merging either as-is would:
   - revert `name` to `jekyll-theme-chirpy` and `author` to `Cotes Chung`;
   - re-add five packages main has since removed (`semantic-release` and its three plugins,
     `conventional-changelog-conventionalcommits`);
   - **drop `three` from dependencies entirely** - that alone breaks every scene on the site.

   The nine bumps they carry are worth having, three of them major
   (`@commitlint/cli` 19 -> 20, `@commitlint/config-conventional` 19 -> 20,
   `stylelint-config-standard-scss` 15 -> 16 - that last one will move the stylelint error count).
   Closing both makes Dependabot reopen against current main with only the packages that still
   exist, which is the accurate PR. Rebasing keeps the stale package set in the diff.

## Gate 1 - Rod's calls (everything downstream is blocked on these)

Per PAGE-PROCESS.md:190, *"you cannot aggregate components that do not exist yet"* - and components
cannot be built until the picks are made.

4. ~~Judge the six sub-page blockouts.~~ **DONE 2026-08-18, see [DECISIONS.md](DECISIONS.md) D15.**
   POST stripe.dev · **PROJECTS MinionsArt page + Kaito Note card** (new hybrid variant, built) ·
   **RAMBLINGS Eve hairline** · **PORTAL Space Jam orbital** · **RESUME dropped** ·
   **ABOUT carries TWO survivors** (dimden + Klubnika) forward to the aggregate stage on purpose -
   they differ most in how much live scene they cover, which a greybox cannot show. That makes
   "build both About aggregates" a real task rather than a decision: see gate 3/4.
5. **Pick the callout family** - BLOCKED ON BETTER EXAMPLES, not on Rod. He rejected the current set
   2026-08-18: *"honestly your examples arent great, maybe find some sites with great and warm
   examples for me on this one."* A six-angle warm-callout hunt is sourcing replacements (indie-web,
   gamedev artists, zine/papercraft, JP personal, digital gardens, TTRPG). The five other post
   components - code block, meta chips, prev/next, hero media, TOC - are still a straight pick.
   *(small once the examples land)*
6. ~~Settle the type decision.~~ **DONE 2026-08-18 - ROUNDED GOTHIC, see [DECISIONS.md](DECISIONS.md)
   D16.** `--font-display` moved from Shippori Mincho to M PLUS Rounded 1c at the token, so card
   titles, section heads, post header, dated timeline, quote block and stamp callout all moved
   together. The site is down to three faces. **Still gates a real file at port time:** fonts are
   requested from `_data/origin/cors.yml:19`, not from SCSS.
7. **Lock the palette - MOVED TO THE END** ([DECISIONS.md](DECISIONS.md) D18, Rod: *"colour
   hierarchy comes after space"*). Not a gate-1 item any more. **The EXPORT is still outstanding and
   is not a decision:** the colours rendering on `final-landing.html` live in
   `localStorage['lab-palette']` in Rod's browser and in no tracked file. One console line protects
   them whenever the lock eventually happens. *(small)*
8. **Rule on the ndt seam band** - Rod 2026-08-18: *"not sure what seam band is."* It is the 160px
   painted horizontal strip harumaki `/ndt/` runs between sections instead of a gap. The component
   exists and is unused (`extracted/components/seam-band`), because the borrowed painted dividers
   were rejected 2026-08-13: they exist to divide flat painted colour fields, and this site has one
   continuous live scene instead, so they read as stickers over it. **Currently OUT and the
   rejection already covers it** - this stays open only if Rod wants to overturn that call after
   seeing one in context at `a3-assembly.html?v=a3seam`. *(small)*
9. **Hold the About design conversation** before any About component is built. Related: the
   achievements design pass (backlog E1b) - the trophy grid and unlock toast are the About page's
   reason to exist and neither is built. *(medium)*

## Gate 2 - the substrate (before any component moves)

10. **Write the token bridge** between the lab's 39 tokens and the live theme's 270. Two names in
    common; no mapping file exists anywhere. Every one of the 27 lab stylesheets depends on it.
    *(claude, large)*
11. **Decide how the 18 lab ES modules enter the Rollup build** - new entries, or folded into the
    existing page bundles. `rollup.config.js:78-91` has a fixed 12-entry list emitting IIFE;
    `_includes/js-selector.html:66-79` maps layout name to exactly one bundle. *(claude, medium)*
12. **Decide the SCSS delivery shape** - 27 flat component `.css` files have to become partials in
    the `_sass/main.scss` forward chain.
13. **Extend the PurgeCSS content globs** before porting any markup outside `_includes`/`_layouts`/
    `_javascript`. `purgecss.js:8` does not scan `assets/**`, `_tabs/*.md`, `index.html`,
    `ramblings.html`, `tech-art/*.html`, `game-design/*.html` or `_posts/**`. Latent today -
    `assets/404.html:19` uses `me-2` and survives only because `_layouts` also uses it. *(small)*

## Gate 3 - build what does not exist

14. **Build the four sourced callout recipes** as real bench components. Sourced 2026-08-18, greybox
    only. *(claude, medium)*
15. **Build the six already-sourced post components** that `post-aggregate.html` still greyboxes:
    reading well, TOC, code block, meta chips, prev/next, hero media. Fold in the D13 addendum while
    building the code block - mono at 0.81-0.89x prose, authored to the column, shrink on mobile
    rather than scroll. *(claude, large)*
16. **Re-source or delete the 12 circular-citation components.** Each carries a CIRCULAR CITATION
    banner in its CSS header. By the ledger's own definition (`element-tracker.md:16`) Slop is *"not
    shippable"* - and the landing already links two of them. This is the single largest provenance
    debt. *(either, large)*
17. **Source the four deliberately-empty slots**: post header, reading progress bar, image lightbox,
    related-posts cards. *(claude, medium)*
18. **Source the surfaces that are still short of references**: ~~resume~~ (dropped), **portal -
    DONE 2026-08-23**, ramblings (2 of 4). Both portal window references are now read from source and
    saved: `sources/109ichiki-dialog-window.md` (genuinely draggable - `cursor:grab`) and
    `sources/zutomayo-pcmove-window.md` (collapses into its own title bar). **Two is what exists** -
    a further sweep returned template listicles, not readable sites, and the portal is exactly the
    rare page type where a quota manufactured false provenance last time. Space Jam orbital is
    REJECTED by Rod; the rebuild is directed (drag + magnetism + edge bounce) and not started.
    *(claude, medium)*
19. **Build the site-wide furniture the bench has never had**: back-to-top, tooltips, page
    transition, scrollbar, sparkler trail, and **skip-link + focus ring** - that last one is an
    accessibility gate, not a nicety. *(claude, large)*
20. **Repair the provenance ledger.** `element-tracker.md` has 72 rows: 51 Slop, 40 with an empty
    Source column, 34 with an unconfirmed `?` idea-origin, and **zero rows marked `claude`** even
    though line 45 states in prose that three cursor-lantern treatments are Claude-originated - so
    the <25% guardrail cannot currently be computed at all. It also has no rows for the 2026-08-18
    sourcing batch. *(claude, small)*

## Gate 4 - port and assemble

The live site is **nine surfaces**, and three layouts each serve two subjects:

| route | source | layout |
|---|---|---|
| `/` | `index.html` | portal |
| `/tech-art/` · `/game-design/` | `*/index.html` | **section-landing x2** |
| `/tech-art/projects/` · `/game-design/projects/` | `*/projects.html` | **section-projects x2** |
| `/tech-art/about/` · `/game-design/about/` | `*/about.md` | **section-about x2** |
| `/ramblings/` | `ramblings.html` | ramblings |
| `/archives/` · `/game-design/blogs/` | `_tabs/` | archives · blog |
| `/404.html` | `assets/404.html` | default |

21. **Port `final-landing.html` into `_layouts/section-landing.html` + `_sass/pages/_section-landing.scss`.**
    It has to work for **two different subjects** with different content. *(claude, large)*
22. **Port the top bar** into `_includes/topbar.html` + `_sass/layout/_topbar.scss`, with its
    favicon, slap-toggle and drift-magnet dependencies. *(claude, large)*
23. **Wire the redesign CSS/JS into the real build** - `final-landing.html` currently loads
    everything from `/redesign-lab/` absolute paths. *(claude, medium)*
24. **Decide and build the nav model** - the bench bar's four links are hardcoded `href="#"`.
    *(either, medium)*
25. ~~**Source and build a footer**~~ **BUILT 2026-08-23.** `footer-line` is on all six final
    pages: left-anchored at a 2.5vw gutter, sized to the lab tag, name links home, dead `#` socials
    removed. **Open:** the landing still carries the older 8-item version because it is approved
    there - the two need reconciling before the port. *(Rod, small)*
26. **Decide the fate of the demo reel** - `final-landing` drops it and it has no source. *(either)*
27. **Build aggregates for the five non-post blockouts**, then port them. *(claude, large)*
28. **Design the surfaces with zero redesign artefacts**: archives, tag page, under-construction,
    404. *(either, medium)*
29. ~~`resume-blockout.html` has no target.~~ **DROPPED 2026-08-18 (Rod).** No resume page is being
    built. The blockout stays on disk, unlinked. This removes a surface from the port AND from the
    sourcing backlog - it had zero tracker rows and needed 3+ references from scratch.

## Gate 5 - quality floor

30. **Run the Section J hard pass** against the current surfaces and the 28 bench components -
    once STYLE.md is back on the branch (Gate 0). *(claude, large)*
31. **Fireworks flash audit** against the 3-flashes-per-second threshold (WCAG 2.3.1 Level A), now
    that greeting and reward emitters can fire together. *(either, small)*
32. **`body.motion-off` does nothing.** No component stylesheet reacts to it. The motion toggle is
    currently decorative for CSS motion. *(claude, medium)*
33. **Four component stylesheets have no `prefers-reduced-motion` guard**: button-kit, code-block,
    hero, top-bar. Plus the card cursor-reveal in `project-cards-expensive` - the card system
    `final-landing.html` actually ships. *(claude, small)*
34. **Gate the merged-card cursor tilt and the gyro tilt on `body.motion-off`**, and audit gyro
    against WCAG 2.5.4 motion actuation. *(claude, medium)*
35. **Load the T4-A focus ring** (`extracted/styles/generic.css`) on the assembly surfaces, or port
    the ring into `_sass`. Re-apply the retired aggregate's skip-link, landmark and
    `scroll-padding-top` fixes to the current surfaces. *(claude, small)*

## Gate 6 - pre-merge checks

36. **There is no PR-triggered CI.** `.github/workflows/pages-deploy.yml` triggers only on push to
    main - merging deploys straight to production. The single gate is the htmlproofer step, which
    fails the deploy on any broken internal link. Do a full local build + htmlproofer dry run first.
    *(either, small)*
37. **Freeze the final URL map before merging.** giscus is configured `mapping: pathname` with
    `strict: "1"`, and the gemspec ships no `jekyll-redirect-from` - so any changed permalink
    silently detaches every existing comment thread, with no way to redirect. *(Rod, small)*
38. ~~Exclude `CLAUDE.md` and `STYLE.md`~~ **done 2026-08-18** - both were publishing as real
    pages. **`redesign-lab` is deliberately NOT excluded:** it is gitignored so CI never sees it and
    production is already safe, and excluding it would 404 every blockout URL the review workflow
    runs on. The only cost is a local sitemap listing lab pages. Revisit at merge time. *(done)*
39. **Rebrand the browser-chrome and PWA colours.** `_includes/favicons.html:19` emits an
    unconditional `theme-color: #ffffff` that lands last and wins on a dark-only site; TileColor is
    still Chirpy stock `#da532c`. *(claude, small)*
40. **Resolve the dead search subsystem.** `_includes/searchbar.html` is included by nothing, yet
    `search-loader.html` runs SimpleJekyllSearch against a null input on every page. *(Rod, medium)*
41. **Set `social_preview_image`** so non-post pages emit og:image, and **strip the redundant
    `assets/media/...` prefix** from every post's front-matter `image.path` (og:image currently
    resolves to a doubled 404 URL). **Point the 8 posts whose og:image is an `.mp4` at a still
    frame** - og:image cannot be a video. *(mixed, small)*

## Content (parallel with everything above; only the last one gates a good first impression)

42. **10 of 19 posts are `wip: true`** and render zero visible content. Write them, or hide them
    until written. *(Rod, large)*
43. Umamusume post: crop the 4 reserved images, create `assets/media/UmamusumeInheritance/`,
    uncomment the hero block. *(Rod, medium)*
44. Replace the placeholder title *"CG World Translation: Article Title Here"*. *(Rod, small)*
45. `/ramblings/` is empty - give it content or remove the dangling `_posts/personal` routing scope.
    *(Rod, medium)*
46. Decide on the commented-out email and rss entries in `_data/contact.yml`; resolve the tech-art
    demo reel (`demo_reel` id or `show_reel: false`). *(Rod, small)*
47. Strip em dashes from the 7 pieces of shipped user-facing copy. *(claude, small)*

## Housekeeping (any time, blocks nothing)

- `_gif-archive/` - 414 MB, 14 GIFs still tracked by git. `git rm -r --cached` + gitignore.
- `.claude/worktrees/elastic-morse` - 906 MB; its branch is already an ancestor of main.
- `npm test` is red: **3317 of 3333 eslint problems are in `.claude/worktrees`**, 5 in
  `redesign-lab`, 11 real ones in `_javascript/`. Separately, 1223 stylelint errors in live `_sass/`
  (1157 auto-fixable) that STATUS does not mention at all. Fix by adding `.claude/**` and
  `redesign-lab/**` to `globalIgnores` in `eslint.config.js:6`, fixing the 11 real ones, and
  changing `package.json`'s `test` script so both linters run unconditionally.
- Three.js is bundled **three times** - 1.72 MB across scene/general/minimal, each with its own
  embedded copy. Worth deciding before the redesign adds more per-page JS.
- Delete the stale `.gitmodules` entry for `assets/lib` (tracked directly, not a gitlink).
- Delete the dead `z-index:-1 #scrim` from final-landing, home, new-landing, rework-hana.
- Fix the achievements breathing-toggle id typo; delete three dead lantern shader uniforms threaded
  through 8 call sites.

## Doc corrections the sweep found (code wins)

- **UPSTREAM.md:10-11 and THEME-BOUNDARY.md:9-11 are wrong**: the root gemspec is not vestigial, it
  is load-bearing. `Gemfile:5` is a bare `gemspec` directive, so the gemspec is the sole dependency
  manifest for jekyll, paginate, seo-tag, archives, sitemap and include-cache. Deleting it breaks
  the build outright.
- **UPSTREAM.md:12-13 says the upstream base version is unknown.** It is readable today:
  `jekyll-theme-chirpy.gemspec:5` says **7.3.1**, untouched since fork commit `7d07a04`.
- **"Porting the new top bar deletes light mode" is false.** `theme_mode: dark` at `_config.yml:91`
  already suppresses the toggle, and `_sass/themes/_light.scss` (374 lines) is `@use`d by nothing.
  Light mode is already unreachable - the open question is whether to revive it, not preserve it.
- **`analysis/2026-08-16-component-gaps.md:132-133` is stale**: it lists the favicon tier as
  unresolved; `element-tracker.md:52` records Rod resolving it the same day as his own Figma work.
- **`npm run build:css` staleness is not a production risk** - CI runs `npm run build` before every
  Jekyll build. The real symptom is local-vs-CI divergence.

## THE MERGE CLEANUP LIST - every HTML and CSS thing to remove (2026-08-23, ROD)

Rod: *"can you list all HTML and CSS we need to clean during the big merge?"* Counted by grep on
2026-08-23, not recalled. **Re-count before relying on any number here - they rot.**

### 1. Lab chrome on the six `final-*` pages - none of it may reach the live site

| chrome | count today | note |
|---|---|---|
| `class="slot*"` | **243** | greybox placeholders. **Each one is also an unbuilt element**, so this doubles as the "what is still missing" check |
| `class="cell"` | **164** | greybox fill inside the slots |
| `data-state=` | **98** | what the state panel counts |
| `data-slot=` | **97** | ditto |
| `.slot__tag` badges | **85** | PENDING markers |
| `show-state` | **25** | body class + the toggle that drives it |
| `catlabel` | **12** | greybox captions |
| `#state` panel + its `<script>` | **6** (one per page) | the slot counter |
| `.labtag` | **6** | the bottom-left lab breadcrumb |
| `class="gb"` | **3** | greybox blocks |
| `#vbar` variant bar | **1** (`final-about`) | the `?v=panels/strip/spacious` switcher, plus the script that reads the query string |
| lab-chrome CSS rules in each page's inline `<style>` | about 16-29 per page | `#state`, `.slot*`, `.ok`, `.labtag`, `#vbar`, `.cell`, `.catlabel`, `.sp__h`, `body.show-state` |

### 2. Dead CSS measured on the pages

- **`.two` / `.three` / `.stack`** - declared in the inline `<style>` of `final-portal`,
  `final-projects` and `final-ramblings`, **0 uses in the markup of any of them**.
- **`.wrap`** - `foundations.css` clamps it to `--measure` (64rem = 1024px) while pages set only
  `width`, so on several pages the clamp silently wins. Dead on some pages, actively wrong on
  others. **Flagged, not fixed - it is a layout question.**
- **`.bgcanvas` / `.bg-1` / `.bg-2` / `@keyframes bgfade`** - the opposite problem. `hana-bloom.js`
  REQUIRES the host page to supply these and **no sheet does**, so two canvases render
  `position:static` inside a fixed parent with no crossfade. The rule exists at `a3-assembly.html`
  if it needs porting. **This is a live broken background, not dead code.**

### 3. Components carrying code that a decision already removed

- **`top-bar`** - still carries the three toggles **D20 deleted**: 27 references in
  `top-bar.html`, 23 in `top-bar.css` (`slap-toggle`, `goo-toggle`, `breathe-*`). The six final
  pages do NOT use them, so this is dead weight in the component only. **Delete during the merge.**
- **`site-footer`** - the OLD footer, superseded by `footer-line`, and it carries a CIRCULAR
  CITATION banner. Still linked by **3** bench pages. Retire rather than port.
- **`code-block`, `post-header`, `skill-tile`** - superseded by `code-block-real`,
  `post-header-real`, and by Rod's "keep the skills row as it is". Linked by **0** pages.
- **`seam-band`** - built, rejected 2026-08-13, still linked by 1 bench page.

### 4. The provenance debt, which is a shipping gate not a tidy-up

**14 components carry a CIRCULAR CITATION banner**: button-kit, card-tests, code-block,
draw-in-icons, empty-state, footer-line, hero, list-controls, post-header,
project-cards-expensive, quote-block, reel-band, site-footer, tldr-callout.
By the ledger's own rule **Slop cannot ship**. Several are already on approved surfaces.
Note `footer-line`'s banner is now stale - its origin is ROD and the file says so.

### 5. Delete after the port

- **`redesign-lab/original-css/`** - the frozen pre-refactor copy (60 files) that
  `layer-diff.html` renders against. Its only job is the before/after comparison.
- **`layer-diff.html`, `prose-collisions.html`** - diagnostic surfaces, not design.

### 6. Deliberately NOT on this list

- **Unlayered inline `<style>` blocks.** Rod ruled 2026-08-23 (P200) that **pages may override**.
  They stay. What they need instead is the lint in D36 so an override is always deliberate.
- **`prefers-reduced-motion` gaps.** Out of scope by Rod's call (D34).

**The `.slot` count is the useful number in all of this.** A slot still present at port time is an
element that was never built.

## Lab chrome to strip at port time (added 2026-08-21, ROD)

Rod: *"remember what we need to remove later."* The `final-*` pages carry judging apparatus that is
NOT part of the design. None of it may reach the live site. It is listed here rather than only in
each file's header, because a header comment is not a checklist.

| chrome | where | note |
|---|---|---|
| `#state` panel + its `<script>` | every `final-*` page | the slot counter and the toggle button |
| `.slot`, `.slot__name`, `.slot__wait`, `.slot__tag` | every `final-*` page | greybox placeholders; each one is also an unbuilt element, so these mark real gaps |
| `.raw` + its `::before` badge | `final-post.html` | real content, no approved design |
| `.ok` | every `final-*` page | badge REMOVED 2026-08-21 on Rod's call, but the class and `data-state` remain as hooks |
| `data-slot` / `data-state` / `data-raw` attributes | every `final-*` page | what the panel counts |
| `.labtag` | every `final-*` page | the bottom-left lab breadcrumb |
| `body class="show-state"` | `final-post.html` | badges default to visible while judging |

**The `.slot` entries are the useful part of this list.** A slot left at port time is an element
that was never built, so this doubles as the "what is still missing" check before the port runs.
