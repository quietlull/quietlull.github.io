---
name: project-cascade-layers
description: "The redesign lab's CSS is in cascade layers (D36). The one rule that bites - unlayered CSS beats every layer - and the page-override decision that followed."
metadata: 
  node_type: memory
  type: project
  originSessionId: 9ff75216-2ae0-4a64-9c8d-2aeb20c5f7bd
  modified: 2026-08-24T01:11:38.811Z
---

**All 60 `redesign-lab/` stylesheets are wrapped in cascade layers** (2026-08-23, Rod: *"this is
how CSS is intended to be used to begin with"*). Order, repeated at the top of every file so each
is correct on its own:

```
@layer reset, tokens, prose, components, overrides;
```

reset = `foundations.css` · tokens = `extracted/styles/*` · prose = `decisions.css` ·
components = `extracted/components/*` · overrides = `focus-ring.css`

**It replaced a specificity war**, not a bug: `.prose` element rules were beating 53 declarations
across 8 components. Layers made the question disappear with **zero component selectors rewritten**.
Full record and the rejected `:where()` route: `docs/DECISIONS.md` **D36**.

**THE ONE RULE THAT BITES: unlayered CSS beats every layer.** A page keeping its own
`*{margin:0;padding:0}` in an inline `<style>` outranks every component it loads and wipes their
padding. **This shipped broken to 40 lab pages** before an audit caught it. Fix pattern: delete the
duplicate if the page loads `foundations.css`, otherwise wrap it in `@layer reset{}`.
Symptom-first entry is in `docs/TRAPS.md`.

**Rod ruled that pages MAY override the ladder** (P200, 2026-08-23). So a page's inline `<style>`
winning is correct, not damage - and it means **a component merged into a page can silently lose to
that page's own greybox CSS**. Strip a slot's page-local rules WITH the component that replaces it.
The proposed guard is a lint that fails on any unlayered rule in a `final-*` page.

**A frozen pre-refactor copy of every stylesheet is served at `redesign-lab/original-css/`**, and
`redesign-lab/layer-diff.html` renders any page against it with tabs. The whole refactor reverses by
copying that directory back. Both get deleted after the port.

Related: [[project_merge_cleanup_list]], [[feedback_measure_dont_trust_tokens]]
