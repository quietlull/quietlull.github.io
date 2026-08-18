# Vocabulary

Controlled terms. Use these precisely in code, docs, and chat; banned terms are listed with their
replacement. Add a term when two names for the same thing show up; ban the loser.

## Terms

- **section** - one of the site's two halves: tech-art or game-design. Set per-post via
  `_config.yml` defaults, read from `page.section`.
- **portal** - the two-door landing page (`_layouts/portal.html`).
- **post** - any `_posts/` entry, project or blog alike.
- **project post** - a post tagged `project`; gets the TL;DR box and meta chips.
- **WIP post** - `wip: true`; renders the under-construction placeholder.
- **card** - a post preview tile on section/landing pages.
- **meta chips** - the engine/role badges on a project post.
- **takeaway** - the "What I Learned" callout (`page.takeaway`).
- **breathing** - the ambient glow animation system, tiers T1-T4.
- **kill switch** - the mechanism that disables breathing per element (currently
  `$breathe-selectors`; becomes `data-breathing` in Phase 2).
- **sparkler** - the mouse-trail cursor effect.
- **scene** - a Three.js background (lantern/firework variants).
- **bundle** - one Rollup output loaded per layout via js-selector.
- **knob** - a genuine tuning dial (CSS custom property / config entry), as opposed to a locked
  calibration invariant.
- **stock / modified / custom** - the three theme-boundary labels; see
  [THEME-BOUNDARY.md](THEME-BOUNDARY.md).

## Banned

- **~~category~~** for the site's two halves -> **section**. "Category" stays reserved for Chirpy's
  own taxonomy pages so the two never blur.
- **~~tile~~** -> **card**. One name for the preview unit.
- (propose more as collisions appear; ROD arbitrates)
