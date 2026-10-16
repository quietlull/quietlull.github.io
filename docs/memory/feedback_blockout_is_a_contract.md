---
name: feedback-blockout-is-a-contract
description: "The approved blockout binds the aggregate - only its elements, nothing added; stages are hard dependencies and missing context means ASK, never improvise."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 917c315d-560c-4ab9-a30b-2dc96344072f
  modified: 2026-08-18T23:23:46.412Z
---

Rod, 2026-08-18, frustrated after a whole rejected page: **"whats the point of making a great
blockout if we just randomly slap things together later on?"** and **"things need to be systematic,
some things need to come first and have dependencies. you cant just skip things because you're
missing context. remember everything needs to be human reviewed and approved. we are not following
the provenance rule at all it seems."**

**THE RULE.** An aggregate may contain **only** the elements its approved blockout contains. Fewer
is fine - an unbuilt slot stays a `.ph` placeholder. **More is not.** Not one chip, not one link,
not one toggle, not a footer. Anything extra is a PROPOSAL: it goes back to the blockout, gets a
variant, gets judged.

**Why:** If the blockout does not bind, every hour spent sourcing variants for Rod to judge is
wasted, because the thing he judged is not the thing that got built.

**How I broke it (all one day):** six elements went into `final-landing.html` unasked - two-part
section head with "View all", filter/tag chips, a Technology/Personal skills switch, the demo reel
band, the footer. Plus a whole rejected `projects-aggregate.html`.

**The specific trap - it feels like reuse, it is not.** The elements came from
`a3-assembly.html`. Borrowing from another lab page feels safer than inventing. It is *worse*:
a3-assembly is an unjudged pile of everything, so the element arrives unapproved AND looking
sourced. Same for `rework-*.html` - see [[feedback-bench-is-ours-not-provenance]].

**Second trap:** "complete this stub" authorises completing it, NOT deciding what completes it.
Rod asking for the skills section to be finished did not authorise inventing a mode switch above it.

**Third:** I shipped a control with zero JS behind it and wrote "presentational here" in the markup.
A dead control teaches the user the interface lies. Either wire it or do not ship it.

**Fourth:** flagging debt in a file header is NOT permission. Rod reads the rendered page, not the
comments. He spotted both unsourced elements on the landing by eye.

**When context is missing: STOP AND ASK.** Batch the question if he is away. An assumption filled in
silently is indistinguishable from a fabrication by the time he sees it. Every skipped stage started
as a small gap I filled myself.

Full gates in repo `docs/PAGE-PROCESS.md` (THE BLOCKOUT IS A CONTRACT + STAGES ARE DEPENDENCIES),
tally entries appended per [[feedback-verify-the-premise]]. Related: [[project-pipeline-blockout-to-aggregate]].
