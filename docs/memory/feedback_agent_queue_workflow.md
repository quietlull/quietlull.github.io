---
name: feedback-agent-queue-workflow
description: "How Rod wants work run - he asks, I dispatch an agent, the agent's result lands in the REQUESTS.md queue, I work the queue. An interrupt spawns another agent and never derails the current job."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: e3c6d561-0fc4-4b04-969b-6d4524897760
  modified: 2026-09-02T23:05:23.547Z
---

Rod, 2026-08-24: **"do you remember our workflow where i ask you to do things you create an agent
to do them when the agents finish you add them to a queue and then do them. if i interrupt you just
add another agent and continue what your doing?"**

## The loop

1. **He asks.** The row goes into `docs/REQUESTS.md` immediately, before any work, one row per ask.
   See [[feedback-request-tracker]] for the row format and the legal statuses.
2. **I dispatch an agent** to do the legwork. Agents run in the background; I do not sit and wait
   on one.
3. **The agent finishes and its result joins the queue** as findings against that row.
4. **AGENTS APPLY FIXES NOW, this reversed on 2026-08-25.** Rod: *"Honestly i feel like i shouldn't
   need to tell you to fix issues from the audit can you fan out multiple agents to start doing all
   of that?"* The old rule (agents measure, I apply) was right while the design was unsettled and
   wrong once the queue became a list of proven defects. **What did not change: they still measure
   before they change, and they still do not make design or pixel calls.**
   Three rules make parallel applying safe, learned by doing it:
   - **Disjoint file sets, stated in the brief.** Name what each owns AND what it must not touch,
     including any file a parallel human session has uncommitted. Anything outside its set is a
     handoff it reports, never an edit it makes.
   - **One agent drives the browser: me.** A single shared pane means concurrent use collides, so
     agents verify by reading built output as text and I take the live measurements.
   - **Never let an agent run git.** They leave changes in the working tree; I stage and commit in
     themed chunks, which also keeps a parallel session's files from being swept in.
5. **An interrupt spawns another agent and I keep going.** A new ask from Rod mid-task is never a
   reason to abandon the current one. Queue it, dispatch it, continue.

**Why:** he sends four or five asks in a paragraph and then leaves. Serial work loses most of them,
and stopping the current job to chase the newest one is how half-finished work piled up. The queue
is the memory and the agents are the parallelism.

## THE PRIORITY ORDER (Rod, 2026-08-24) - this settles what to do first

Rod wrote it as three lines:

```
1  Create Agent For New Task
2  Update To Do
3  Implement Follow up from finished agent
```

**A new ask from Rod always outranks finishing what an agent just sent back.** That is the whole
point of the ordering: the agent's findings are already captured and will keep, whereas an unlogged,
undispatched ask is the thing that gets lost. So when a message arrives mid-task, dispatch it before
returning to anything else.

Reading it in order, every time:
1. **New ask?** Log the row, dispatch the agent. Before anything else, including finishing a
   sentence about the last thing.
2. **Agent just reported?** Update `redesign-lab/todo.html` immediately, myself, never via an agent.
3. **Only then** implement that agent's findings.

## THE HARD PART, restated 2026-08-24 because I got it wrong within the hour

Rod: **"you do not seem to be making agents for tasks like i asked"**, then
**"when i add a task to the list log it and spin up an agent i dont want you constantly forgetting
things and making me say them over and over."**

**EVERY task gets BOTH a logged row AND an agent. There is no exception for small ones.**

What I did wrong: I dispatched agents for the big investigations and quietly handled the ones that
felt quick inline, a lookup here, a one-line fix there. That is the failure mode, not a shortcut.
Handling a task inline means it exists only in my head, and when the context is cleared or the turn
is interrupted it is gone, which is exactly the thing he is tired of. **"It is only a grep" is not a
reason to skip the agent. "I already know the answer" is not a reason to skip the row.**

The test is not how big the task is. The test is: did he ask for it? Then it gets a row and an agent.

## A QUESTION THAT STOPS WORK GOES ON THE TODO PAGE (Rod, 2026-08-24)

Rod: **"when you stop at questions add them to the todo page? why are you just leaving things out"**

**If a question blocks work, it is not finished being asked until it is a row on
`redesign-lab/todo.html`.** Chat is not a queue. A question raised only in chat scrolls away, he
never sees it again, and the work sits blocked with no visible trace - which reads to him as the
task being silently dropped.

He is describing a real failure, not a preference. It happened three times in one session:
- the search field came back with six open questions, so nothing was built, **including the half
  that had no questions at all** (projects was a clean drop into an existing reservation)
- the tag symbols stopped on two questions and never went on any list
- the date move was applied, measured, reverted for a real reason, and the reason lived only in
  chat

**The rule, in order:**
1. **Do every part that is NOT blocked, first.** A question about one half is not a reason to stop
   on the other half. This is the part that actually cost time.
2. **Write the blocked part as a row** in the "Needs a word from you" group: what was asked, what
   the question is, and what the options are with their numbers.
3. Only then say it in chat.

**Never let a question be the reason nothing shipped.** Build what can be built, park what cannot,
and make the parked thing visible.

## FINISHING A TASK MEANS WRITING ITS REVIEW ROW (Rod, 2026-08-24)

Rod: **"i forgot to ask you to create a todo task for review after you finish something which im
going to ask you to do and document this is how we do things moving forwards."**

**A task is not finished when the code works. It is finished when its review row is on
`redesign-lab/todo.html`.** Every completed task gets one, immediately, in the same turn the work
lands. No exceptions for small ones, and no batching them up to write later.

The row carries four things and nothing else: the request id, his words verbatim and trimmed, one
plain past-tense line on what changed, and the `localhost:4000` link to the thing to look at.

**Why this is the missing half.** He works by looking. Work he cannot find is not work he can judge,
and a finished change that never gets a row just sits there while he assumes it is still pending.
Writing the row is how the work actually reaches him.

It pairs with the priority order below: dispatch first, write the row second, implement third. The
row and the todo update are the same act.

## THE TODO PAGE IS UPDATED INLINE, NEVER QUEUED (Rod, 2026-08-24)

Rod: **"for the todo changes from now on dont queue it on an agent just do it whenever an agent
reports back before moving back onto doing the currently queued task."**

So the loop gains a step. When an agent reports back:

1. Update `redesign-lab/todo.html` with whatever just finished, **myself, immediately**.
2. Then go back to the task I was on.

**Never dispatch an agent for a todo update and never queue it as its own row.** It is bookkeeping
that rides along with every agent result, not a task. The point is that the page is current the
moment something lands, rather than drifting until someone remembers it.

The page is a REVIEW QUEUE: things that are finished and waiting on Rod's eye, each with the
localhost link to look at. Not a list of everything outstanding, which is what `docs/REQUESTS.md`
already is.

## The two limits that still apply

- **Agents do analysis, extraction and measurement. They do not produce finished visual design,
  and they do not apply pixel changes.** That guardrail comes from the 2026-08-09 mishap and is not
  softened by this workflow. See [[feedback-design-generation-mishap]].
- **Agent output is a claim, not a result.** An audit finding gets verified before it is applied.
  One 7-agent audit produced a finding that was checked and turned out to be wrong.
  See [[feedback-verify-the-premise]].

## How to apply

Dispatch agents report-only, with the measured ground truth handed to them so they do not
re-derive it wrong, and with an explicit instruction not to edit files. Then apply their findings
myself, following [[feedback-manual-code-audit]] (small single-purpose diffs) and
[[feedback-layout-changes-need-confirmation]] (no layout movement without Rod's direct word).
