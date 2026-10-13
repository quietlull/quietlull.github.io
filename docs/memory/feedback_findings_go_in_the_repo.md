---
name: feedback-findings-go-in-the-repo
description: "Agent findings and anything worth keeping go into the repo the moment they arrive, never into the session scratchpad: the scratchpad is deleted between sessions and took a six-agent report with it."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 7b99f2df-fb04-446f-8298-d5557e883b9e
  modified: 2026-10-09T23:21:34.879Z
---

Write findings into the repo (a `docs/` file, or the `docs/REQUESTS.md` row) as each one arrives.
Never park them in the session scratchpad to "fold in later".

**Why:** on 2026-09-29 six agents checked all 36 workbench tabs. I kept their combined findings in
`p538_findings.md` in the scratchpad, hit the usage limit, and told Rod the file was temporary. When
the session resumed ten days later the scratch folder was gone. The reports survived only because
they were still in the conversation; a compaction would have lost them. The same folder also held
the only copy of the real-browser driver, which had by then been rebuilt from scratch seven times.

**How to apply:** the scratchpad is for throwaway scripts and intermediate output only. A finding, a
measurement Rod will act on, or a tool that will be needed again goes in the repo straight away.
If a usage limit is close, saving to the repo comes before summarising to Rod.

Related: [[feedback_request_tracker]], [[feedback_agent_queue_workflow]].
