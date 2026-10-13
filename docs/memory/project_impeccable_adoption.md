---
name: project-impeccable-adoption
description: "How we're adopting github.com/pbakaus/impeccable for the redesign: selective, pillars-as-razor, earn-every-AI-tell, quality checks wholesale."
metadata: 
  node_type: memory
  type: project
  originSessionId: 76ad9361-5fac-44c0-8963-cd4321815abd
  modified: 2026-08-08T14:48:53.506Z
---

Decision (2026-08-08) on **impeccable** (github.com/pbakaus/impeccable — an AI-design anti-slop guidance system: philosophy + `init`→DESIGN.md/PRODUCT.md + 23 commands + a 64-rule anti-pattern detector).

**Adopt selectively. Never wire the auto-hook / never let `detect` auto-fix.** Rod's own PILLARS are the razor, not impeccable's rulebook.

- **Take:** the DESIGN.md/init discipline (consolidate our scattered foundations into one doc), the command *vocabulary* (bolder/quieter/distill/delight/animate/layout) as shared language, and the **quality detector subset WHOLESALE** — contrast, line-length (65–75ch), cramped padding, skipped-heading, tight leading, tiny text, `layout-transition` (don't animate width/height). These match STYLE.md, zero playfulness risk.
- **THE LAW (Rod, 2026-08-08) — every AI tell hits a fork, there is NO "keep as-is" branch:**
  1. **A pillar backs it** (playful / alive-living / festival theme / etc.) → do NOT ship the generic version; ship an **elevated or alternative** version that is distinctly ours (our glow = a drifting lantern that ignites, not "a dark glow").
  2. **No pillar backs it** → it **just does not exist.** Collides with the slop barrier + nothing defends it = cut entirely. No neutral middle.
  The **pillar** is what we design around; the tell is only a warning ("if you do this, you owe a reason AND a better version, or drop it"). This supersedes the softer "earn every tell" wording.
- **Paper-morphism is just ONE example** of branch 1 (elevating the glassmorphism tell → translucent *washi/paper* grain panels instead of frosted blur; ties into "texture over glow", non-slop because few do it). The same elevate-or-delete move applies to EVERY tell, not just glass.
- **Act on now:** glassmorphism (cull/lower prevalence or replace w/ paper-morphism), **halo glows** (radial-halo / radial-spotlight-glow — reduce), **icon-tile-stacks** (tool-icon tiles above headings — reduce). Each must pass the fork.

impeccable's TOP tells (side-tab accent borders, nested cards, cream palette, purple/cyan gradients, icon-tile-stack) are things Rod already killed → strong validation of the de-glow direction. See [[project-visual-references]], [[project-design-vision]], [[project-reference-site-breakdowns]]. Full rule catalog was fetched from `.claude/skills/impeccable/scripts/detector/registry/antipatterns.mjs`.
