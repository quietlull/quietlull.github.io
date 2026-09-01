# Infrastructure / Jekyll / Structure Audit — 2026-06-14

Report-only (per STYLE.md Section J norms). Produced from a 3-way parallel agent sweep of the SHIPPED site
(not the lab). Nothing here is implemented; the markdown-deletion list awaits Rod's go.

---

## 1. Feature setup status (what's live vs. needs setup)

| Feature | State | Evidence | Fix |
|---|---|---|---|
| GoatCounter analytics (tracking) | ✅ LIVE | `_config.yml:63-64` `analytics.goatcounter.id: aquietlull`; loaded via `_includes/head.html:116-122` | none (verify `aquietlull.goatcounter.com` exists) |
| **Visible pageview counter** | ⚠️ NEEDS SETUP — 1-word fix | `_config.yml:77-78` `pageviews.provider:` BLANK; counter gated on it (`_includes/js-selector.html:84-91`), but the id is already present | set `pageviews.provider: goatcounter` |
| **Comments** | ⚠️ OFF (no provider) | `_config.yml:112` `comments.provider:` blank; all backends empty (`:115`,`:118-119`,`:122-130`); posts opt in (`:182`,`:215`) but nothing renders | pick Giscus (best for GH Pages) + 4 IDs, or leave intentionally off |
| **Social preview image (og:image)** | ⚠️ NEEDS SETUP | `_config.yml:105` `social_preview_image:` BLANK — link shares unfurl with no card | add one image; highest-leverage SEO/marketing fix |
| Site verification (Search Console etc.) | ⚠️ blank | `_config.yml:48-54` all blank | add Google code if using Search Console |
| Contact links (ArtStation, itch.io, email, RSS) | ⚠️ disabled | `_data/contact.yml:14-28` commented "until profiles polished" — most relevant links for a tech-artist/game-dev are one uncomment away | re-enable when ready |
| Share buttons | ✅ but odd defaults | `_data/share.yml:5-15` Twitter/Facebook/Telegram on; LinkedIn/Bluesky commented `:19-50` | swap FB/Telegram → LinkedIn/Bluesky for a portfolio |
| PWA | ✅ LIVE | `_config.yml:141-148`; `sw.js`; manifest + icons present | none |
| RSS feed / sitemap / jekyll-seo-tag | ✅ LIVE | `assets/feed.xml`; gemspec plugins; title/desc/url filled | none |

**Underutilized Chirpy capabilities** (present, unused): MathJax (no `$$` in any post), Mermaid (no diagram block),
Categories archive (jekyll-archives `_config.yml:249` enables `[tags]` only, not categories). Decide: use or strip.

## 2. Chirpy default cruft (identity still says "Cotes Chung / cotes2020")

- `LICENSE` — still "Copyright (c) 2019 Cotes Chung" (Chirpy MIT).
- `package.json:2-15` — name `jekyll-theme-chirpy`, Cotes author, cotes2020 repo/homepage/bugs; `:76-147` full
  `semantic-release` block targeting a `production` branch Rod doesn't use (CI deploys from `main`); husky/
  commitlint/semantic-release devDeps `:38-53` are theme-publishing machinery.
- `jekyll-theme-chirpy.gemspec` — upstream gemspec; only needed to republish the theme as a gem.
- `_data/authors.yml:9-17` — sample authors `cotes` + `sille_bille` alongside Rod's real `Rod` entry.
- `_data/locales/` — 33 locale files; site is `lang: en`, so 32 are dead weight.
- `docs/{CHANGELOG,CODE_OF_CONDUCT,CONTRIBUTING,SECURITY}.md` — upstream theme docs (excluded from build but repo clutter).
- `tools/{init,release,run,test}.sh` — Chirpy maintenance scripts (excluded from build, unused).
- CLEAN (no cruft): no demo posts remain (all 18 are Rod's), custom favicon, rewritten README, customized deploy workflow.

## 3. Structural smells (verified)

- **`_gif-archive/` is git-TRACKED, ~414 MB / 14 GIFs** — the "originals for rollback" from task O10; the planned
  follow-up delete never happened. Bloats every clone + CI checkout (`fetch-depth: 0`). HIGHEST-IMPACT cleanup —
  gitignore or remove after confirming the MP4 conversions are deployed.
- **Two stray timestamped Rollup configs tracked**: `rollup.config-1761082564543.cjs`, `rollup.config-1775099493477.cjs`
  — `--bundleConfigAsCjs` temp artifacts accidentally committed; unreferenced; safe delete.
- **Dead layouts/includes**: `_layouts/projects.html` (0 `layout: projects` hits), `_includes/projectfilterandsearch.html`
  (0 refs) — both confirmed dead (match PROJECT-STATUS "Unused/Superseded"). `@keyframes breathing` unused.
- **Orphaned culled HTML** (lab, gitignored): `section-landing-A2-japanese.html`, `-B1-western.html`, `-B2-western.html`
  correspond to A2/B1/B2 element sets recorded CULLED in `element-tracker.md:22`.
- **Duplicate preview system**: `_includes/blogspreview.html` + `projectspreview.html` (+ their two SCSS files) are
  near-identical — consolidation candidate.
- Good hygiene confirmed: `assets/js/dist/` and `_site/` are gitignored (not tracked).

## 4. Jekyll fit — verdict: STAY on Jekyll, STRIP Chirpy in place (NOT a migration)

KEY FACT most analyses miss: **the site already builds via a custom GitHub Actions pipeline**
(`.github/workflows/pages-deploy.yml` runs `npm install && npm run build` → `bundle exec jekyll b` → htmlproofer →
deploy-pages), NOT GitHub Pages' native gem-restricted build. So the usual "Pages locks you to whitelisted gems"
reason to flee Jekyll **does not apply** — any plugin/generator is allowed while still hosting static on Pages.

The custom investment is ALREADY decoupled from Chirpy: Three.js scenes are plain `<script>` bundles; SCSS touches
Chirpy only at `vendors/_bootstrap.scss`; Rollup is independent. So Chirpy is mostly inert weight, not a blocker.

- (a) Status quo: zero cost, but ~20-30% dormant Chirpy machinery adds the "is this mine or Chirpy's?" friction
  that prompted this audit.
- (b) **RECOMMENDED — strip Chirpy to a minimal custom theme.** Subtractive work; keeps 100% of custom code, the
  `_posts` collection model, jekyll-archives, Rollup/SCSS pipeline. Delete dead layouts, drop semantic-release,
  rename package, remove author stubs + unused includes, slim `vendors/_bootstrap.scss`. Cures the actual friction.
- (c) Migrate to Astro/11ty/Vite: highest cost, weakest justification given the GH-Actions fact. Cost drivers:
  rewrite every Liquid layout/include, re-express the `_posts/{section}/` collection + jekyll-archives, new Sass
  path (trivial), Rollup→Vite (cheap, even nicer DX for Three.js HMR), 18 posts' front-matter schema pass.
  Multi-week rewrite whose main reward (Vite JS DX) only benefits a Three.js layer that already works.

**Recommendation = (b). Don't change generators; the friction is the half-Chirpy ambiguity, curable by deletion.**
Revisit Astro only if a future need genuinely requires islands/per-route hydration (none visible today).

## 5. Nice-to-haves (each tied to the repo)

- **`_data/projects.yml` registry** — projects are `_posts/{section}/*.md`; a data registry (title/section/thumb/MP4/
  tags/blurb/link) lets previews + portal + a future "featured" strip read one source. Matches the existing
  `media.yml`/`origin/` idiom.
- **Component-ize previews** — collapse `blogspreview.html`+`projectspreview.html` (+2 SCSS) to one param'd
  `card.html` + `_card.scss`. Removes the duplicate-system smell.
- **`abstracts/_tokens.scss`** — centralize spacing/radius/glass values (breathing hues already are CSS vars). This
  is the landing spot for the "bake tuned values" item parked in memory — makes lab→live a values copy, not a hunt.
- **CI lint on PRs** — `package.json` has `lint:js`/`lint:scss`, `.husky/` exists, but CI only runs htmlproofer on
  push-to-main. Add a PR job running `npm test` + build smoke-test to gate lab→main merges.
- **Media pipeline / LFS** — heavy media + tracked `_gif-archive` live in git history forever. Move to LFS/CDN +
  gitignore `_gif-archive`. Highest-impact; half-done already (MP4 conversion shipped; cleanup commit missing).
- **Bundle-size budget** — three scene bundles are 1.1-1.5 MB min each; add `rollup-plugin-visualizer`/size check,
  relevant to the ongoing JS-optimization work.

---

## 6. PHASE 2 PLAN — four sequenced refactors (Rod approved, to do in a fork)

Order: do **#1 (registry)** before **#3 (unified card)** — the card should consume registry data. Each SCSS step must
be pixel-identical; diff card/list rendering before/after.

**SCSS-OVERHAUL CAVEAT (2026-06-14, Rod):** the theme's SCSS is about to be overhauled during redesign integration.
Split this work by whether it touches SCSS:
- **Do independently / before the overhaul (unaffected):** #1 registry (pure data + Liquid; gives the new templates a
  clean data source from day one) and #4 media (pure git/asset infra).
- **FOLD INTO the redesign, do NOT pre-do (throwaway otherwise):** #2 tokens — make it the redesign's value FOUNDATION,
  defined when the new values are; and #3 card — the redesign already rebuilds the project card, so build the unified
  blog+project card there ONCE. Tokenizing/consolidating the about-to-be-deleted SCSS now is wasted effort.

### 1. `_data/projects.yml` registry (make projects data-driven)
- Schema per project: `slug, section (tech-art|game-design), title, blurb, thumb (img|mp4), tags[], priority/pinned, post_url, links{repo,live,itch,artstation}`.
- One-time seed from existing `_posts/{section}/*.md` front matter.
- Rewrite `_includes/projectspreview.html` (+ section-projects, related-posts, any portal "featured" strip) to iterate `site.data.projects` instead of filtering `site.posts`. Posts stay as article bodies; registry drives cards + ordering + featuring.
- Source-of-truth: registry = canonical for listing/cards; post front matter only for the article; link by slug.
- Watch: `post-filter.js` reads `data-title`/`data-tags` off markup — registry-driven cards must still emit those.

### 2. `_sass/abstracts/_tokens.scss` (centralize values; bake lab tunes)
- Audit `pages/_*.scss` + `layout/_*.scss` for repeated literals: radii, glass alpha/blur, spacing, transition speeds (breathe durations already in Sass data lists).
- Create `_tokens.scss` = `:root { --space-*, --radius-*, --glass-*, --dur-* }` + Sass vars where compile-time needed; `@use 'tokens'` in main.
- Landing spot for redesign-lab tuned values (memory note: bake with `transform: scale()`, NOT the tuner's `zoom`).
- Replace literals file-by-file, diffing each — pixel-identical.

### 3. Consolidate preview includes → one `card.html` + `_card.scss`
- Diff `blogspreview.html` vs `projectspreview.html`; extract shared structure; parameterize via include params (`{% include card.html type='project' item=... %}`).
- Merge `_blogspreview.scss` + `_projectspreview.scss` → `_card.scss` with a `type` modifier. The Sass `@for` stagger (durations/delays/orb vars) DIFFERS blog vs project — preserve both (passed list / type branch, or move to tokens).
- Swap call sites; delete old includes + SCSS. Pixel-compare BOTH list types.
- Pairs with #1: unified card consumes registry data.

### 4. Media → LFS / CDN
- Short term (Rod's plan): after demo reel lands, `git rm -r _gif-archive` + gitignore (future commits; history keeps them).
- Purge from history (optional): `git filter-repo` to strip `_gif-archive` + big GIFs → smaller clones; rewrites history, coordinate + force-push.
- Ongoing LFS vs CDN: project moved OFF LFS earlier because Pages' NATIVE build doesn't fetch LFS — BUT the custom Actions build makes LFS viable again IF checkout sets `lfs: true`. Verify first. Recommend external bucket/CDN for heaviest demo media, LFS for moderate, small inline. Keep `_includes/post-media.html` video/img branching working.
