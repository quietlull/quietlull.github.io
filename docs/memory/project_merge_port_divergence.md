---
name: project_merge_port_divergence
description: "The three ways the 2026-08-25 merge broke previously-fixed things, and the audit findings that came out of it (30 checks in redesign-lab/todo.html)."
metadata: 
  node_type: memory
  type: project
  originSessionId: e4c00238-6a61-4c02-a045-09ef5ba31608
  modified: 2026-08-25T17:40:08.507Z
---

Rod, 2026-08-25: *"can you do an agent audit of all previously fixed issues to see if they land in
the new environment?"* Five agents ran it. **30 checks are filed in `redesign-lab/todo.html`** under
the section "AUDIT - did the old fixes survive the merge?", each a tickable row keyed `aud::*`.
Open rows live in `docs/REQUESTS.md` as P457-P462.

**Findings cluster into exactly three causes, and knowing which one you are looking at saves the
diagnosis:**

1. **Unlayered old CSS beats every ported component.** The 26 ported partials are all wrapped in
   `@layer components`; surviving old-site partials are not, and unlayered wins regardless of
   specificity. `_sass/layout/_projectspreview.scss` is the confirmed case (the card-title hover
   glow Rod rejected still renders, plus a hairline over every card meta row).
2. **The lab owned the fix, the live file was off limits at the time.** D22 kept `_javascript/` out
   of scope during the redesign, so decisions and tunes applied to lab copies only, and the merge
   carried the live files across untouched. Cases: the scrapped rewards (fireworks + 3 lantern
   tiers + confetti + full-size popups all still shipping) and Rod's sparkler tune.
3. **Load ORDER decides ties, and the port's ordering rationale tests the wrong thing.**
   `_sass/components/_index.scss` loads alphabetically and justifies it with "no top-level selector
   is declared by two of these 26 files." True, and the wrong test: **an element can carry two
   different component classes at once**, and `class="top-bar__logo lb"` does. That is what broke
   the boil font. Nothing watches for it.

**The two biggest open items, both measured, both needing Rod's word:**
- **Sticky is dead site-wide.** Top bar goes 0 -> -600 at scrollY 600; the post contents rail too.
  `body{overflow-x:hidden}` plus `html{overflow-y:scroll}` makes BODY the scroll container. `TRAPS.md`
  already records the fix (`clip`, not `hidden`); the port carried the bug instead.
- **The live portal is missing three of Rod's own changes** - see [[feedback_lab_only_scope]].

**Method note worth reusing:** to see what the stylesheets alone decide on an element JS has
rewritten, append a fresh probe element with the same classes and read its computed style. That is
how the Caveat-vs-Lineboil and the gold-vs-orange questions were both settled.

Related: [[project_cascade_layers]], [[feedback_measure_dont_trust_tokens]], [[feedback_manual_code_audit]].
