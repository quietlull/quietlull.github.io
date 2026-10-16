---
name: feedback-layout-changes-need-confirmation
description: "After EVERY change, check whether it moved the layout. Only Rod can ask for a layout change, and the ask must be direct and confirmed."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: cb950fe1-161f-4d76-8783-cfab7cc0ccf5
  modified: 2026-08-22T09:11:50.623Z
---

Rod, 2026-08-22: *"after every change you NEED to check if it changed the layout. if not continue,
if so remember only I the user can ask for layout changes and they always need to be direct and
confirmed."*

**The rule has two halves and both are binding.**

1. **A check after every change, not just layout-shaped ones.** Before moving on from any edit, ask
   whether it moved anything: box sizes, positions, spacing, measure, wrapping, column widths,
   stacking. A CSS edit that "only" changes a colour can still reflow (a font-size on a label, a
   border on a box, a padding for a badge). If nothing moved, carry on and say nothing.
2. **If something DID move, it needed Rod's direct, confirmed instruction first.** Layout authority
   is his alone. Not inferred from a nearby request, not justified as a side effect of a fix, not
   "it looked wrong so I improved it". If a change he asked for cannot be done without moving the
   layout, that is a QUESTION, asked before the edit, not a decision reported after it.

**Why:** on 2026-08-21/22 a request for a text backing and one for heading colour turned into a page
width change, the backing moving from the column to the measure, a new rhythm, and a zone label
being added. Some of that was defensible on its own terms, and none of it was asked for. Rod reads
the rendered page, so unrequested movement is exactly what he sees first, and it costs him a review
cycle every time. The same root as [[feedback-blockout-is-a-contract]]: extra is never free.

**How to apply:**
- Measure before and after when unsure. The browser tools make this cheap: box rects, computed
  measure, `documentElement.scrollWidth > clientWidth`, gutters. Empirical beats "it should be fine".
- Lab chrome must never move the design. A badge, a state panel or a debug outline that needs room
  is a badge that needs repositioning, not a page that needs padding.
- If an edit reveals the layout is genuinely wrong against the reference, say so and show the
  numbers. Do not fix it in the same breath. See [[feedback-verify-the-premise]].
- "Direct and confirmed" means his words naming the change, not a plausible reading of them.

Related: [[feedback-working-rules]] (ask before ANY pixel change, Rod is the eyes),
[[feedback-manual-code-audit]] (small single-purpose diffs, never bury an unasked change).
