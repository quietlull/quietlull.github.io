---
name: feedback-manual-code-audit
description: "Rod reviews ALL code manually from now on - write for a human auditor, keep diffs small and reviewable, never bury a change inside a large edit."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 917c315d-560c-4ab9-a30b-2dc96344072f
  modified: 2026-08-21T23:44:47.490Z
---

Rod, 2026-08-18: **"I realized I've been trusting you too much for code and that's on me. I'll be
manually looking over all code from now on."**

He is right, and this is not a punishment to argue with - it is a correction to work with. The
session that prompted it produced a rejected page, two unsourced elements shipped onto the landing,
a control with no JS behind it, and a glow removed from the wrong element. All of that would have
been caught by a human reading the diff.

## What this changes about how I write code

- **Small, single-purpose diffs.** One change per edit. A big rewrite that bundles five decisions is
  unauditable, and unauditable means it gets rejected wholesale rather than fixed.
- **Never bury a change.** If an edit touches something Rod did not ask about, it goes in its own
  edit with its own explanation, or it does not happen. Adding to an unrelated edit is how the tag
  buttons and the skills switch got in.
- **Say what the diff does before he reads it**, in plain terms, including anything I am unsure of.
  Lead with the risky part rather than the tidy part.
- **Flag my own uncertainty.** If I have not verified a mechanism, say "inference" rather than
  asserting it. He is now checking, so a confident wrong claim is worse than an admitted gap.
- **No silent cleverness.** Anything non-obvious gets a comment explaining WHY, not what. He should
  never have to reverse-engineer intent from code.
- **Do not defend rejected code.** If he says it is wrong, fix it; argue only when I have evidence,
  and lead with the evidence.

## What it changes about review

Expect and invite: him reading every line, asking why something exists, and cutting things I thought
were fine. When he asks "where did this come from", the answer must be a real source or an honest
"I added that, it was not asked for".

Related: [[feedback-blockout-is-a-contract]] (nothing enters a page unapproved),
[[feedback-anti-bloat]] (fewer lines wins), [[project-code-provenance]].
