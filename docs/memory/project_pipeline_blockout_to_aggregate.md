---
name: project-pipeline-blockout-to-aggregate
description: "The full replicable pipeline a surface goes through: reference gathering -> layout blockout -> component sourcing -> component blockout -> component build -> bench tune -> aggregate."
metadata:
  node_type: memory
  type: project
---

# The pipeline, landing blockout -> aggregate

**Authoritative version lives in the repo: `docs/PAGE-PROCESS.md`.** Read that first; this is the
pointer plus the one rule that keeps getting broken.

0. **Reference gathering** - `redesign-lab/reference-gallery.html` FIRST (99 sites, tiered by Rod,
   his own notes, Sub-pages section by page type). Captures via the `web-preview` skill, verified by
   eye on a contact sheet before use.
1. **LAYOUT BLOCKOUT** - `<surface>-blockout.html`. Greybox, one grey language, no colour. 4+
   variants, each transcribed from a named live site, 4+ sites per page type. Provenance panel.
2. **COMPONENT SOURCING** - real live source per slot, CSS saved verbatim to `redesign-lab/sources/`,
   row in `element-tracker.md` with Tier/Idea/Source.
3. **COMPONENT BLOCKOUT** - greybox variants of each COMPONENT, several sourced treatments judged
   side by side on the same content. (Added by Rod 2026-08-16.)
4. **COMPONENT BUILD** - `extracted/components/<name>/`, lands on the bench at `?c=<id>`.
5. **BENCH TUNE** - Rod turns the live tuner knobs, hits Copy tunes, numbers get BAKED into the
   component defaults. **This is where the design is actually decided, by Rod, not by me.**
6. **AGGREGATE** - `new-landing.html` / `a3-assembly.html`: real components + set colours + the live
   scene, with `.ph` placeholders reserving space for anything still missing.
7. `/ship-check` then `/sync-docs`.

## The rule the sub-pages broke

**You cannot aggregate components that do not exist yet.** The landing aggregate is good because
stages 2-5 happened first. The post aggregate read as slop because it jumped stage 1 straight to
stage 6 and assembled bench files that were never re-proven after the 2026-06-09 trust reset.

If a surface is missing components, the honest artifact is the BLOCKOUT plus a build list, not an
aggregate wearing placeholder parts. See [[feedback-blockout-vs-aggregate]].
