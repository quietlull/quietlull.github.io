---
name: feedback_lab_only_scope
description: "D22 LAB-ONLY IS LIFTED and the merge has landed - the live site is what ships now, so tuning a redesign-lab final-*.html page lands somewhere visitors never see."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: e4c00238-6a61-4c02-a045-09ef5ba31608
  modified: 2026-08-25T17:39:50.746Z
---

**D22 (lab only) IS LIFTED, and this memory used to say the opposite.** Rod, 2026-08-25: *"d22 is
officially lifted"* (logged as D40/P448). `_sass/`, `_layouts/`, `_includes/`, `_javascript/`,
`_config.yml` are all IN SCOPE. The merge then landed on `main` ("Merge the redesign into main"),
so the redesign now ships from the real Jekyll tree.

**The trap this creates, and it bit on 2026-08-25.** `redesign-lab/` is no longer the thing that
ships, it is a reference copy. The six `final-*.html` pages and the `*-ratios.html` tuners preview
the LAB, not the site. So a tune applied to a lab page is invisible to visitors. Three of Rod's own
2026-08-25 portal changes (window size/position, the welcome-line gap, the "!") went into
`redesign-lab/final-portal.html` and never reached `_layouts/portal.html` or `_sass/pages/_portal.scss`.

**How to apply it:** before editing, ask which file actually renders the URL Rod is looking at. If he
quotes numbers from a `*-ratios.html` tuner, they land in the lab and need porting across as a second
step. If he reports a bug he saw on a real URL (`/`, `/tech-art/`, `/tech-art/about/`, `/ramblings/`,
`/tech-art/posts/...`), the fault is in the ported tree and the lab copy is probably still correct.
**Checking both is how you tell a port miss from a real bug** - see [[project_merge_port_divergence]].

Supersedes the old rule that all main-site paths were off limits. Related: [[project_merge_cleanup_list]],
[[feedback_later_decision_wins]], [[feedback_verify_the_premise]].
