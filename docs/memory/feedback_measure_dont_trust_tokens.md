---
name: feedback-measure-dont-trust-tokens
description: "A CSS name that resolves to a fallback renders wrong WITHOUT erroring - measure tokens and font weights, never assume they load."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 5b134360-884e-4a99-88bf-dcdb6d975d1c
  modified: 2026-08-23T20:06:36.692Z
---

**Three instances in one session (2026-08-23), each silently wrong for an unknown length of time:**

1. **Font weights.** Every page requested `wght@400;500;700`; `decisions.css` asked for **100 and
   300**. Neither face loaded, so `font-weight:100` rendered as 400. **Measured: 100, 300 and 400
   all produced exactly 438.25px.** The whole "hierarchy is size and tracking, never weight" ladder
   was collapsed, and **every judgement Rod made before the fix was against weight 400.**
2. **`--nav-h`** - used 9x in `toc-real.css`, defined nowhere. Fell back to 3.5rem against a real
   96px bar, so the mobile TOC sat *under* the top bar, fully hidden below 780px.
3. **`--color-muted-warm`** - used 3x, defined never. Rendered a neutral grey on a token named warm.

**Why:** `var(--x, fallback)` and an unloaded `@font-face` both fail *silently and plausibly*. The
page looks finished. Nothing errors. A screenshot cannot tell you, and neither can reading the CSS -
the CSS is correct, it is the resolution that is wrong.

**How to apply:**
- **Before trusting any token, grep for its definition.** `grep -- "--token-name *:"` across the
  repo. Zero hits means every use is a fallback.
- **Before trusting a font weight, measure two weights and compare widths.** Identical width means
  one face is doing both.
- **Before trusting "the component inherits the global X"**, check that X is actually linked on the
  page. Six components declined to write a focus ring because they inherited one; `generic.css` was
  linked by **zero** of the six final pages.
- Applies equally to a stylesheet you assume is loaded, a class you assume wins the cascade, and a
  reservation you assume the component fits. See [[feedback_verify_the_premise]].

**The one-line version: a name that looks right is not evidence.** Measure it.
