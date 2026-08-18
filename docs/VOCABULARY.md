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
- **callout** - a block lifted OUT of the running prose because it is not part of the argument:
  a note, a warning, a tip, an aside, a summary. Added 2026-08-18 because Rod flagged the term as
  unfamiliar and it was being used as though it were settled. Three ROLES on this site, and they are
  not interchangeable: (1) note/aside - "this breaks in URP 12"; (2) TL;DR / summary - what the post
  is about to say; (3) pull quote - a line already in the prose, given weight. A **code block is NOT
  a callout**: it is isolated because it is a different KIND of content, not a different kind of
  remark, which is why the component blockout keeps them as separate families.
- **seam band** - a 160px painted horizontal strip run BETWEEN sections instead of a gap, borrowed
  from harumaki `/ndt/`. Component exists at `extracted/components/seam-band`, unused: the painted
  dividers were rejected 2026-08-13 because they exist to divide flat colour fields and this site
  has one continuous live scene instead, so they read as stickers over it.
- **takeaway** - the "What I Learned" callout (`page.takeaway`). Rod's own stamp CSS, and the one
  callout with a legitimate attribution.
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
