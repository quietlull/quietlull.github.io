---
name: project-merge-cleanup-list
description: "The inventory of HTML and CSS to strip during the big merge - lab chrome, dead rules, components carrying deleted features, and the provenance debt. Lives in docs/MERGE-WORKLIST.md."
metadata: 
  node_type: memory
  type: project
  originSessionId: 9ff75216-2ae0-4a64-9c8d-2aeb20c5f7bd
  modified: 2026-08-24T01:11:25.203Z
---

Rod asked (2026-08-23) for a list of everything to clean during the big merge. **It lives in the
repo at `docs/MERGE-WORKLIST.md` under "THE MERGE CLEANUP LIST"** - counted by grep, not recalled,
and it must be re-counted before anyone relies on the numbers.

**Six categories, and the shape of each is what matters:**

1. **Lab chrome on the six `final-*` pages** - `.slot*` (243), `.cell` (164), `data-slot`/
   `data-state` (~97 each), `.slot__tag` (85), `show-state` (25), `#state` panel, `.labtag`,
   `#vbar` on About, plus 16-29 lab-chrome CSS rules in each page's inline `<style>`.
2. **Dead CSS** - `.two`/`.three`/`.stack` declared with zero uses on three pages; the `.wrap`
   1024px clamp. **And the inverse: `.bgcanvas` CSS is MISSING**, so `hana-bloom.js` renders a
   broken background on pages that load it. That one is a bug, not dead code.
3. **Components carrying code a decision already deleted** - `top-bar` still has the three toggles
   D20 removed (27 refs in its HTML, 23 in its CSS); `site-footer`, `code-block`, `post-header`,
   `skill-tile`, `seam-band` are all superseded.
4. **14 components carry a CIRCULAR CITATION banner** - a shipping gate, not a tidy-up, because
   the ledger's own rule is that Slop cannot ship.
5. **Delete after the port** - `redesign-lab/original-css/` (the frozen pre-refactor copy),
   `layer-diff.html`, `prose-collisions.html`.
6. **Deliberately NOT on the list** - unlayered inline `<style>` stays, because Rod ruled pages MAY
   override (P200); reduced-motion gaps stay out of scope (D34).

**The `.slot` count is the useful number.** A slot still present at port time is an element that
was never built, so the list doubles as the "what is missing" check.

Related: [[project_cascade_layers]], [[project_site_sections_and_plan]]
