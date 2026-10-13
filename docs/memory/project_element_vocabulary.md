---
name: project_element_vocabulary
description: "Rod's own definitions of element / wrapper / component / behaviour, the composition-over-inheritance call, and the audit blind spot that let stranded markup survive every previous pass."
metadata:
  node_type: memory
  type: project
---

# THE VOCABULARY IS ROD'S, AND IT IS LOAD-BEARING (2026-09-04)

He stopped the whole pass to check I meant the same things he did. Use these words this way.

- **ELEMENT** - a part of the page you can point at with *inspect element*. A button, a tag, the
  favicon. **Elements contain sub-elements**: the top bar contains the favicon, the nav buttons and
  the name. The pointing test is his and it is the tiebreaker.
- **WRAPPER** - exists only to hold other things, and is **named explicitly as a wrapper**. His
  reason: *"i cant point at a wrapper using select element"*. **Spacers ARE elements**, not wrappers.
- **COMPONENT** - the reusable definition an element is an instance of. What earns a workbench tab.
  His scale rule: *"debugging 50 components is possible, debugging 500 is not."*
- **BEHAVIOUR** - *"a visible consequence of components, a thing that is defined by a component"*.
  Drift, magnet, tilt, flip, border glow. **A behaviour is declared BY a component**; it does not
  float free. I had this wrong first and he corrected it.

## D-LEVEL CALL: COMPOSITION WITH MODIFIERS, NEVER CHILD COMPONENTS THAT INHERIT

Rod asked for a recommendation and took it. **The argument that won it is his own 50-vs-500
number: inheritance MULTIPLIES, composition ADDS.** Ten components and six behaviours composed is
16 things to debug; expressed as children that inherit and override, every *combination* becomes
its own subclass - up to 60. That is the exact mechanism that turns a 50-component design into a
500-component codebase.

So: **a variant is a MODIFIER on one component** (`--achievement`), not a child of it. A separate
component is justified only when the **markup structure** differs, never when it merely looks
different. And because two behaviours can touch the same property, **each component needs ONE
explicit place saying which behaviours it has and how conflicts resolve** - magnet-overrides-drift
works today only because the two share a closure, and the split will break that unless it is
written down.

**This is finishing a convention, not importing one.** The repo already uses block/element/modifier
in places (`.post-card`, `.card-front`, `.merged-cards--square`, `.kit-button--outline`). It is
applied inconsistently, which is most of why the site feels bespoke.

## THE EVIDENCE THAT MADE IT CONCRETE

The section landing: **76 distinct class names, 44 top-level blocks, on ONE page.** The project
card alone is **14 independent top-level names** - `post-card ct-glow-card card-link card-tilt
card-flipper card-front card-cover glass-plane card-body card-title card-meta card-back back-read
card-pin` - none of which say they belong to one component, and two of which (`glass-plane`,
`back-read`) do not even share the prefix. That single card is about a third of the page's whole
vocabulary.

## THE AUDIT BLIND SPOT, which is the durable lesson

Rod: *"we have done many audits and this has never been brought up how did you find this and why
did we never catch this before?"*

**Because no audit had ever enumerated the BUILT HTML by class token.** Every audit run on this
repo reads source, or looks at a rendered page, or measures one axis: contrast (AUDIT-A11Y), CSS
load order (`tools/css-order-check.mjs`), perf, provenance. **None of them counts what markup
actually shipped.** Frequency analysis over built output is a different instrument and it found
things in one pass that four audits missed. There is a checker for CSS order and none for markup.

**And the first run of that instrument produced a false positive I reported before verifying** -
`table-wrapper`, which turned out to be a class name inside an HTML COMMENT that Chirpy's
`refactor-content.html` emits into every page. Strip comments and scripts before counting. The
real finding hiding under it: **32 HTML comments ship to the visitor** on that page.

Related: [[feedback_plain_language]], [[feedback_verify_the_premise]], [[project_cascade_layers]],
[[project_chirpy_strip_and_port]].
