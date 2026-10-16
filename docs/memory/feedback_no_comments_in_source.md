---
name: feedback-no-comments-in-source
description: "Rod's rule since 2026-10-09: NO comments in scripts, stylesheets, templates or plugins. Explanation goes in docs/CODE-AUDIT.md. npm test fails on a comment. I had written ~3,000 lines of them."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 7b99f2df-fb04-446f-8298-d5557e883b9e
  modified: 2026-10-10T02:13:58.915Z
---

**Do not write comments in the site's source.** Not a header, not a "why", not a dated note about
what Rod said. Scripts, stylesheets, templates and plugins carry none. The only comments allowed
are instructions to a tool (a stylelint or eslint directive, a Ruby magic comment).

**Why:** Rod asked whether the refactor had made the code base smaller. Measured: code lines were
flat (13,207 to 12,972) while comment lines had nearly tripled (1,741 to 4,817, 27% of the code
base). I wrote most of that: history, reasoning, dead attempts, quotes of him with dates. One file
was 6 lines of code under 30 lines of comment. His words: *"strip them all out and place them in
the review area or place them in MD and not in the scripts themselves thats far too many comments.
Code should be self explanatory or documenting."* He is auditing every file by hand so he can
maintain the site himself; a quarter of each file being my prose works against that.

**How to apply:**
- Explain a file in `docs/CODE-AUDIT.md` (one `## path` section per file; its review page shows
  it). History and decisions go in the docs that already hold them (DECISIONS, TRAPS, REQUESTS).
- If code needs a comment to be understood, rename things or restructure until it does not.
- `npm run lint:comments` (part of `npm test`) fails if a comment appears. Do not add a skip to
  get around it.
- In notes, cite file and function names, not line numbers: they are wrong as soon as a file
  changes. Line numbers in docs written before 2026-10-10 refer to commit `e1b1351`.
- The 2,565 removed comments are in `docs/code-comments/`. Removal was done with parsers
  (`tools/strip-comments.mjs`), never a pattern: two templates hold `<!--` inside Liquid strings as
  logic, and a pattern would have deleted working code.

Related: [[feedback_anti_bloat]], [[feedback_manual_code_audit]], [[feedback_plain_language]].
