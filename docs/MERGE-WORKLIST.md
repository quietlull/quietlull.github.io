# Merge worklist

Everything standing between today and the redesign living on the real site, in the order it has to
happen. Built 2026-08-18 from an eight-agent sweep (docs, lab backlog, in-code markers, live-vs-lab
gap, build health, content, quality gates, plus a completeness critic). Every line was verified
against the repo; nothing here is asserted from memory.

After this ships, [REFACTOR-PLAN.md](REFACTOR-PLAN.md) Phases 1-3 begin. Nothing in this note is
refactor work - the refactor is deliberately downstream of it.

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
5. **Pick the callout family** from `component-blockout.html`: three separate objects, or one object
   in three roles. Plus the five other post components - code block, meta chips, prev/next, hero
   media, TOC. *(small)*
6. **Settle the type decision.** mincho vs rounded gothic. `final-landing.html` commits to the
   rounded gothic because that is what A3 ndt is - if it ships, the decision is made by default.
   It also gates a real file: fonts are loaded from `_data/origin/cors.yml:19`, not from SCSS.
   *(small)*
7. **Lock the palette.** Sodium & Sky is the frontrunner. **Urgent for a non-obvious reason:** the
   colours on `final-landing.html` come from `palette-store.js` reading `localStorage['lab-palette']`
   - they live in Rod's browser, not in any tracked file. Export them before they are lost, bake
   them into `settings.css`, and drop the runtime palette store from the port. *(small)*
8. **Rule on the ndt seam band** - back in, or does space carry the transitions? *(small)*
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
18. **Source the surfaces that are still short of references**: ~~resume~~ (dropped), portal (2 of 4 found; fold in the 109ichiki/zutomayo popup windows to replace the
    unlabelled satellites), ramblings (2 of 4). *(claude, medium)*
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
25. **Source and build a footer**, or explicitly keep the live one. *(either, medium)*
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
