---
name: feedback-finalized-goes-to-bench
description: "Every component Rod finalizes must be kept on the workbench (extracted/components/) for later tuning and optimization, not left inside the page that used it."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: cb950fe1-161f-4d76-8783-cfab7cc0ccf5
  modified: 2026-08-22T06:50:57.189Z
---

Rod, 2026-08-21: *"remember all finalized components need to be kept in the work bench for tuning
and optimization later."*

When Rod approves or finalizes ANY component, it gets its own workbench entry in
`redesign-lab/extracted/components/<name>/` as well as living in whatever page uses it.

**Why:** a component that only exists inline in `prose-blockout.html` or a `final-*` page cannot be
tuned, profiled, or optimised on its own, and it cannot be reused without copy-paste, which is how
the circular-citation problem started. The bench is where a finalized thing gets iterated. It also
means the eventual port has one place to read components from rather than scraping them back out of
pages.

**How to apply:** on any finalize signal ("lock it in", "keeper", "approved", "that's ok"), do BOTH:
run the `/ship-check` gates, and create or update the bench entry. Do not treat a component as done
while it only exists inside a page. Back-fill is owed for anything finalized before this rule.

Note the distinction that already exists: being ON the bench makes something OURS, it does NOT make
it sourced - see [[feedback-bench-is-ours-not-provenance]]. The bench entry still has to carry the
real external source in its header.

Related: [[feedback-request-tracker]], [[project-pipeline-blockout-to-aggregate]].
