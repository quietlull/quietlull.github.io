---
name: ship-check
description: Pre-ship gate checklist. Run whenever Rod FINALIZES any step of the creative process - "lock it in", "that's the keeper", "finalize", "approved", "bake it", "ship it", "good, next section", picking a bench element for the real page, or ending a tuning pass. Also on request via /ship-check. Report-only - never auto-fix.
allowed-tools: Read Grep Glob Bash
---

# Ship check

Rod just finalized something (an element, a section, a tune, a design step). Before it counts as
done, walk these gates against what was ACTUALLY produced (read the real files, grep the real
ledger - no answering from recall). Output a short PASS / FLAG report per gate. FLAGs are
findings for Rod to rule on, NEVER silent fixes (matches STYLE.md Section J: report-only).

## Gate 1 - Provenance (the hard law)

- The element has a row in `redesign-lab/element-tracker.md`: Tier is **True or Remixed** (Slop
  cannot ship), Source cited (URL / `sources/<name>.md` / live-site file), Idea flag set
  (mine/theirs/claude).
- Claude-idea ratio still under ~25% (check the ledger rollup).
- Any Rod-pasted snippet saved verbatim to `redesign-lab/sources/` and cited.

## Gate 2 - The tell fork (anti-slop)

Scan the element for AI tells (glassmorphism, halo glow, icon-tile-stack, gradient-on-dark,
center popup, generic card grid, breathing-everything). Each tell found takes exactly one branch:

1. **A pillar backs it** -> it must be the ELEVATED, distinctly-ours version (name the pillar and
   what makes it ours), or FLAG.
2. **No pillar backs it** -> FLAG for deletion. There is no "keep as-is" branch.

## Gate 3 - Taste anchors (anti-corporate)

- Passes the pillars razor: warm not corporate, handmade not sterile, open not cluttered.
- De-glow respected: ignites on interaction, not constant-glow-everything.
- **Rod actually saw it**: a preview page URL (http://localhost:4000/...) was given and Rod
  confirmed what he sees. If the finalize happened without Rod laying eyes on the rendered
  result, FLAG - I am not the eyes.

## Gate 4 - Code readability (docs/CONVENTIONS.md spot-check on changed files)

- Names: no abbreviations, purpose-stating, booleans as predicates.
- No bloat mechanisms (caches, dirty flags, micro-guards) - D5. Dead code deleted, not commented.
- Magic numbers named; genuine knobs are tunable, invariants locked.
- Every addEventListener / observer / rAF loop has its teardown twin.
- Comments stand alone (no dev-note tone, no history narration).

## Gate 5 - Quality floor (adopted detector subset + STYLE.md)

- Text contrast OK on the night background; body line-length 65-75ch; no cramped padding; no
  tiny text; headings in order.
- No width/height animation (transform/opacity only); reduced-motion path exists; focus visible;
  interactive targets ~44px.
- Flashing content (fireworks-adjacent) stays under 3 flashes/sec.

## Gate 6 - Performance / degradation (hard constraint)

- Heavy effect (WebGL, shader, particles, video)? It needs its no-HW-accel / low-end-mobile
  fallback path (static bake, CSS-only, or clean absence). FLAG anything that assumes a GPU.

## Gate 7 - Docs are part of done

- Ledger row updated NOW (not "later").
- Lab work: the session log / HANDOFF reflects the finalized state.
- The finalize closed out a section or feature? Run /sync-docs (touched note + STATUS +
  CHANGELOG) - that is how the learning reaches every other agent on this repo.

## Output format

One line per gate: `PASS` or `FLAG: <what + where (file:line)>`. End with the single next action
if any gate flagged. Keep it under ~15 lines - this is a gate, not an audit; the deep version is
STYLE.md Section J on request.
