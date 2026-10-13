---
name: feedback-request-tracker
description: Every request Rod makes gets queued and status-tracked in repo docs/REQUESTS.md the moment he makes it - one row per part of a multi-part message.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 917c315d-560c-4ab9-a30b-2dc96344072f
  modified: 2026-08-18T23:45:56.849Z
---

Rod, 2026-08-18: **"when I make a request queue it up and add it to memory. often when I make many
requests it doesn't get tracked and I have to ask over and over if need be. number them, letter
them, whatever it is, just keep them in memory. maybe make a spreadsheet that tracks the status of
requests, so even if you don't finish them they are clearly marked either finished, blocked, in
progress, or not done."**

**Why:** he had to repeat himself repeatedly in one session. The favicon took four asks. The tag
buttons, the dead skills switch and the demo reel all needed a second message. Requests were being
lost inside multi-part messages, not refused.

## The rule

The queue lives in the repo at **`docs/REQUESTS.md`** — tracked in git, diffable, and read by every
agent because it is in `docs/`. Add the row **when the request arrives, before starting work**.

- **One row per REQUEST, not per message.** Rod routinely sends five asks in one paragraph. That is
  five rows. Splitting them is the whole point; a merged row is how they got lost.
- **Quote him**, trimmed. Not my paraphrase of what he meant.
- **Statuses:** `DONE` · `IN PROGRESS` · `BLOCKED` (say what it waits on) · `NOT DONE` ·
  `DROPPED` (only when Rod cancels it, with his words).
- **Never close a row silently.** If something is abandoned because it got hard or I ran out of
  context, it is `NOT DONE`, not missing.
- **BLOCKED must name the blocker** and whether it is on Rod or on another task. "Blocked" with no
  reason is how a thing quietly dies.
- Report the open rows back to him at the end of a working stretch, especially the ones blocked on
  him — he can clear several in one message if he can see them together.

**A spreadsheet is available if he wants one** (the xlsx skill can emit it), but markdown in `docs/`
is the primary because agents read it and git tracks its history.

Related: [[feedback-blockout-is-a-contract]], [[feedback-working-rules]].
