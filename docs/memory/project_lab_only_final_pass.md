---
name: project-lab-only-final-pass
description: RESUME HERE - the one remaining job is finishing redesign-lab/ until it can replace the whole main site in a single port; the final-* page group is the build target.
metadata: 
  node_type: memory
  type: project
  originSessionId: 064b74c8-cb82-4e28-bada-09cab9cabcef
  modified: 2026-08-22T06:18:53.156Z
---

**State as of 2026-08-18. This is the resume point.**

## The job

**Finish `redesign-lab/` until it is complete enough to replace the entire main site in one port.**
Not incrementally, not by improving the live site. One lab, then one port. Rod (D22):
*"we are only working on the new design lab stuff, zero main page stuff at this point."*

Orient from repo `redesign-lab/HANDOFF.md` (rewritten 2026-08-18, current) then `docs/STATUS.md`.
Open work is repo `docs/REQUESTS.md` — read the OPEN table only, done rows are phantoms.

## The build target: the `final-*` group

Six pages started 2026-08-18, each containing **only its chosen blockout**, every slot greybox until
Rod approves that element. Each carries a state panel showing X of N approved.
`final-landing` is 3 of 8; the rest are at 0. Only three things on the whole site are approved: the
favicon (Rod's own Figma work), the V6 hero, and the scene bottom.

Layouts chosen (D15): post → stripe.dev · projects → MinionsArt · ramblings → Eve hairline ·
portal → Space Jam orbital · resume → DROPPED · about → **two survivors**, dimden and Klubnika,
because they differ in how much live scene they cover and a greybox cannot show that.

## Critical path

1. **Rod judges `prose-blockout.html` and `element-gallery.html`.** Everything is behind this.
2. Build the takes as real components, verbatim source saved to `sources/`.
3. Build the 11 elements that already have a saved source (no hunting, just code).
4. Re-source or delete the 12 circular-citation components.
5. Fill `final-*` slots one at a time with approval each time.
6. Then the port — `docs/MERGE-WORKLIST.md` gates 2-6.

## Numbers, measured

Of 72 tracked elements: **40 Slop with no source**, 11 Slop with a source already saved,
**12 circular-citation**, only **21 with real provenance**. Four of the circular twelve sit on the
landing. Full breakdown: `redesign-lab/analysis/2026-08-18-element-needs.md`.

Port substrate gap: lab has 39 tokens, live theme has 270, **2 names in common**. Plus 27 flat CSS
files vs a 5-partial SCSS chain, and 18 ES modules vs 12 IIFE rollup bundles. Those three decisions
gate every component port and are sequenced ahead of it.

## Two new artefacts worth knowing

- **`prose-blockout.html`** — the whole reading system in reading order at stripe's 663px measure,
  with all six callout candidates in real sequence. Built because judging a callout alone in a small
  card cannot show how it reads between a heading and a code block. **Callouts get judged here.**
- **`element-gallery.html`** — 9 real cropped screenshots of live elements captured at their own CSS
  selector, take/leave per card.

## What this session cost, so it is not repeated

A whole page (`projects-aggregate.html`) was built and rejected as *"the most ai generated page i
have seen"*, and six elements were added to the landing that Rod never asked for. Both failures have
the same root and are now hard gates in `docs/PAGE-PROCESS.md`:
[[feedback-blockout-is-a-contract]] and [[feedback-lab-only-scope]].

Related: [[project-pipeline-blockout-to-aggregate]], [[feedback-verify-the-premise]],
[[feedback-bench-is-ours-not-provenance]], [[feedback-request-tracker]].

---

## STATE AT 2026-08-22 (long session, Rod cleared context after)

**`final-landing.html` is BUILT OUT - 8 of 11 slots.** Rod: *"im fairly happy with what we have
now."* Done as a BUILD, not "everything approved". Three slots still pending, each for a reason:
top bar (his #26 taste call, plus #45 - and note **there is NO manual motion control anywhere on the
final pages**), project cards (circular citation, ledger still says Slop), demo reel (placeholder).

**`final-post.html` was rebuilt from the prose blockout** with Rod's real ComputeGrass text. Spine
1401, measure locked at **94 characters** held as a character count not a column span. Scene is off
on posts; they run the bloom instead.

**New bench components:** `section-head`, `skills-row`, `footer-line`, `tag-badge`, `washi-tape`.
Registry at 32. `footer-line` SUPERSEDES the circular-citation `site-footer` - retire the old one at
port time.

**Two standing rules came out of this session and outrank most detail work:**
- **D25** - only Rod asks for layout changes, and EVERY change gets checked for whether it moved
  one. See [[feedback-layout-changes-need-confirmation]].
- Finalized components go to the bench. See [[feedback-finalized-goes-to-bench]].

**Docs are synced** as of 2026-08-22: STATUS, CHANGELOG, HANDOFF, D25/D26/D27, and seven new TRAPS
entries covering things that cost real time (a stale breakpoint ladder, missing `pathLength`,
`background-blend-mode` on the wrong element, a backing shrinking its own contents, `em` resolving
against the wrong font-size, `grep -c` counting lines, and brand logos going invisible on the night
ground). **Read `docs/TRAPS.md` before debugging anything visual.**

**Next:** the washi tape's serrated tips - see [[project-tape-carries-the-colour]]. Rod asked for a
look at how OTHER SITES do it before anything gets built.
