---
name: feedback-anti-bloat
description: "Anti-bloat law (2026-08-11): optimizations that add code are bloat. Supersedes the earlier 'optimize all JS files' lens - do not blindly optimize."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d0c58552-18a2-49ae-b75d-2ee8211fe4c8
  modified: 2026-08-11T18:28:53.881Z
---

# Anti-bloat outranks micro-optimization (Rod, 2026-08-11)

**The rule:** optimizations that ADD code - caches, dirty flags, defensive guards, hoisted values, helper extractions for micro-savings - are bloat. Fewer lines and readability win. A mechanism that only saves a trivial delta is never worth its complexity.

**This supersedes the June 2026 "optimize all js files" /loop passes.** Rod: "the work we did previously was under a different lens and now i know better than to just blindly optimize." Do not resume or propose that style of sweep.

**Why:** each micro-optimization trades readability for savings too small to measure, and the added mechanism is itself future maintenance. Proven empirically: the Sarah avoidance rework measured -0.3% (noise) - the real costs live in bloom/shaders, not JS loops.

**How to apply:** genuine wins are still welcome when they are algorithmic, measured, or REMOVE code - the bar is "deletes complexity or provably matters." Recorded in the repo as docs/DECISIONS.md D5 and the CLAUDE.md standing rules ([[project-docs-system]]).
