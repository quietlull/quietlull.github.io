---
name: project-infra-jekyll
description: "Jekyll direction (stay + strip Chirpy), remaining infra gaps (og:image), and what already shipped (giscus, counter, contact links, identity cleanup)."
metadata: 
  node_type: memory
  type: project
  originSessionId: d0c58552-18a2-49ae-b75d-2ee8211fe4c8
  modified: 2026-08-11T18:29:50.569Z
---

# Site infrastructure + Jekyll direction (audited 2026-06-14; slimmed 2026-08-11)

Full audit: `redesign-lab/analysis/2026-06-14-infra-jekyll-audit.md`. Structural facts and housekeeping now live in the repo docs ([[project-docs-system]]: docs/STATUS.md, THEME-BOUNDARY.md, REFACTOR-PLAN.md).

## Direction (recommendation, Rod's call — not locked)

**Stay on Jekyll; strip Chirpy to a minimal custom theme; do NOT migrate generators.** The site builds via a custom GitHub Actions pipeline (not Pages' gem-restricted build), so the usual reason to leave Jekyll is void, and the custom Three.js/SCSS/Rollup work is already decoupled. The friction is half-Chirpy ambiguity — curable by deletion, not new tools. (Aligns with docs/DECISIONS.md D2/D3; the vendored-vs-gem call is deferred until the post-redesign refactor draws the boundary.)

## Shipped (2026-06-14, verified builds green; commit b6dc8a0)

Giscus comments fully wired; goatcounter pageview counter on; ArtStation + itch.io contact links; locales pruned to en; dead layouts/includes deleted; package.json/LICENSE rebranded (MIT kept, semantic-release removed, husky+commitlint kept). `jekyll-theme-chirpy.gemspec` is LOAD-BEARING (`Gemfile:5` reads it) — removing it means migrating deps first.

## Still open

- **`social_preview_image:` blank in `_config.yml`** — no og:image; needs a real asset.
- `_gif-archive/` (~414 MB, git-tracked) still to move out; `.claude/worktrees/` (~900 MB) to prune. (Tracked in docs/STATUS.md.)
- Underutilized Chirpy not yet stripped: MathJax + Mermaid (no post uses either), categories-archive.
- Nice-to-haves: one consolidated `card.html` preview include, `_data/projects.yml` registry, `abstracts/_tokens.scss` (landing spot for baked tuned values), PR-triggered lint CI, media to LFS/CDN.
