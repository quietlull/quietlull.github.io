---
name: explicit-go-every-change
description: "A go covers only the change it was given for. For a newly found problem, explain the cause, which pages, and the fix, then wait."
metadata:
  node_type: memory
  type: feedback
  modified: 2026-10-16
---

# Get an explicit go for every change

**Rod, 2026-10-16:** "For the skip link explain whats causing it what pages show up and how you are
going to fix it. This seems like an obvious ai artifact and you seem to move ahead without explicit
go ahead too often."

- A go covers the change it was given for. Approving the cache fix did not approve a skip link
  edit raised in the same message. Approving "push" once does not approve the next push.
- When Rod reports something new: say what causes it, where it shows up (which pages, which
  devices), where it came from, and the options. Then stop.
- Measuring is fine without a go. Editing a file is not.
- If a stop hook or tool demands a commit, commit only what was approved and say so.
- He suspects past sessions added things nobody asked for ("AI artifacts"): the background orb and
  the skip link were both that. Check `git log -S` for where a thing came from before defending it.
