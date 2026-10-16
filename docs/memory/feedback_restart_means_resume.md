---
name: feedback-restart-means-resume
description: "Rod's \"restart/relaunch the agents\" always means resume them WITH their prior memory (cache replay or transcript-injected context), never a fresh re-run. A skill encodes the procedure."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 282b2118-43dd-4431-a2f9-2b916f475ec3
  modified: 2026-10-10T12:44:19.737Z
---

Rod, 2026-09-01, after a session-limit interruption killed 2 of 7 workflow agents and the
relaunch re-ran them fresh: "i didnt want you to rerun them i wanted you to start them up with
the memory they already got ... when i try to ask you to restart agents i mean to start them
back up with their previous memory."

**Why:** a fresh re-run throws away context that was already paid for and re-does finished
work; his mental model of agents is persistent workers, not stateless jobs.

**How to apply:** follow the `resume-agents` skill (`~/.claude/skills/resume-agents/SKILL.md`):
ListAgents for survivors first (SendMessage, don't respawn), Workflow resumeFromRunId for cache
replay, and for agents that died mid-flight recover their partial transcript
(`subagents/workflows/<run>/agent-<id>.jsonl`) and inject a summary of what they had already
established into the replacement's prompt. Report which agents resumed vs restarted. Related:
[[feedback-agent-queue-workflow]], [[feedback-no-timed-wakeups]].

**Simpler path, confirmed twice on 2026-10-10 (my observation, not Rod's instruction):** an
Agent-tool subagent that was killed by the usage limit does NOT appear in `ListAgents`, but
`SendMessage` to its agent id still works and replays its own transcript ("Resuming agent ..."), so
no summary injection is needed. In the resume message, state what landed while it was gone
(`git log`, `git status`) and tell it to bring its proof up to date before doing more: one agent
had been stopped between a commit and its lint run, and the tree was failing `npm test`. Run
`npm test` yourself before resuming so you can tell it.
