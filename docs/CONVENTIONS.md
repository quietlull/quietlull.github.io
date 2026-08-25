# Conventions

House rules for this site, ported from the Underworld project 2026-08-11. Philosophy first - it
outranks any concrete rule below it. If a concrete rule and a principle conflict, the principle wins
and the rule gets rewritten.

---

## Philosophy

### How truth is established

- **Believe the observation, then verify the mechanism before naming a cause.** Reasoning from the
  code's intent produces confident, wrong diagnoses. What works: the rendered DOM, computed styles,
  the actual built CSS/JS output, measured numbers.
- **Verify a convention before calling it one.** Cite file:line, or say it is an inference.
- **Verify any brief or doc against live code before implementing from it.** Docs rot; code wins.
- **Separate PROVEN from inferred.** Where a claim was proven wrong, record that too.

### What deserves to exist

- **Document only what is expensive to rediscover and not inferable from the code.** Everything
  else is noise that goes stale.
- **Decisions keep their losers.** Rejected options get recorded with why - the losers keep getting
  re-suggested ([DECISIONS.md](DECISIONS.md)).
- **Dead ends get a table** - attempt, why it died, do not re-litigate ([DEAD-ENDS.md](DEAD-ENDS.md)).
- **Traps are written symptom-first** - the symptom is what a future reader searches for
  ([TRAPS.md](TRAPS.md)).
- **Reversals leave tombstones.** When a design flips, note how to recognize leftovers of the dead
  model.
- **Staleness is declared loudly.** A small fresh authoritative note beats patching a rotten pile.
- **Controlled vocabulary, banned terms listed** ([VOCABULARY.md](VOCABULARY.md)).

### How complexity is resisted

- **Reformulate before adding complexity.** When something needs special-case flags, first ask if
  you are holding it wrong - a different formulation often cancels the special cases.
- **Check whether the value already exists before deriving it.**
- **A requirement change can invalidate the STRUCTURE, not just the values.** Re-ask which shape
  fits instead of patching the old one.
- **Do not pattern-match handling between similar-looking things.** Two things that look alike can
  have opposite correct rules.
- **Optimizations that add code are bloat.** No caches, dirty flags, defensive guards, or hoisted
  values for micro-savings. A mechanism that only saves a trivial delta is never worth its
  complexity. (Confirmed by ROD 2026-08-11, superseding earlier micro-optimization passes -
  [DECISIONS.md](DECISIONS.md) D5.)
- **Debugging heuristic:** when behavior looks inverted or swapped, check whether a branch simply
  vanished before hunting for inverted conditions.

### Boundaries

- **Upstream (Chirpy) is client code.** Additions go in our files, not theirs, even at the cost of
  duplication - then plan the dedup. Upstream bugs are flagged ([UPSTREAM.md](UPSTREAM.md)), not
  silently fixed.
- **Machine-owned files are never hand-edited** (generated CSS/JS outputs).

### Provenance (design work)

- **Every design element derives from a REAL snippet** - a reference site, CodePen, or the live
  site - tiered **True** (as sourced) / **Remixed** (adapted with named source) / **Slop**
  (free-handed; not allowed to ship). No source? ASK Rod first.
- **Idea origin is tracked** (Rod / theirs / Claude); Claude-originated ideas stay under ~25% of
  the design or human intentionality is lost.
- Ledger: `redesign-lab/element-tracker.md`. Never autonomously generate finished designs; build
  one small piece, show Rod, iterate.

### Delivery

- **Preview-first.** Non-trivial changes are shown in chat and approved before files change.
  Rod is the eyes: do not verify visuals via screenshots - make the change, ask what he sees.
- **Stage-by-stage, each stage with a test recipe** - an observable pass condition named before the
  work starts. Debug aids are removed when their stage passes.
- **Ship check on every finalize.** When Rod locks in a creative step, the `/ship-check` skill
  runs its gates (provenance, tell fork, taste anchors, readability, quality floor, degradation,
  docs) before the step counts as done. Report-only - flags go to Rod, never silent fixes.
- **Formatting is for the human reader.** Aligned, named, unhurried code beats crammed code.
- **If a tool can enforce it, do not write prose about it.** Formatting rules live in eslint /
  stylelint / prettier config, not in this doc.

### Content

- **No em dashes in written content** - use commas, periods, or colons.
- **Editing Rod's prose = mechanical fixes only** (typos, agreement, punctuation). Never formalize
  or strip his casual voice.

---

## Naming

- **Zero abbreviations** - in JS, SCSS, Liquid variables, front-matter keys, file names, CSS
  classes. Spell every word out.
- **Names state purpose or the guarded invariant, not the implementation.** `data-breathing`
  (what it means) beats a name describing how it is detected.
- **Verb + object for functions** (`buildLanternScene`, `syncBreathingTargets`). Explicit where
  context is thin, implicit where the module already supplies it.
- **Booleans read as predicates** (`isFlipping`, `pointerOnCard`, `wip`).
- **Unfold single-use indirection.** A helper with one caller gets inlined or becomes a local
  function.
- For lookup tables, prefer **short labels + one legend comment** over long compound names.
- When naming is uncertain, offer 2-3 options with a recommendation.

## Comments

- Terse, plain language, one line stating what/when. Rationale only when it guards a trap.
- **Comments must stand alone out of context.** No dev-note tone, no refactor-history narration
  ("no longer used, kept for now" is banned), no addressing a reader.
- Comments at most 2 lines unless the subject is genuinely complex.
- **Comment-vs-code drift is a first-class defect** - audit for it on its own.

## Structure

- **Magic numbers become named constants** at the top of the module - JS `const UPPER_SNAKE`, SCSS
  variables or custom properties. Never a literal repeated in two places.
- **Dials vs invariants.** Genuine tuning knobs get CSS custom properties / config entries and a
  line in the knob inventory; calibration invariants get locked constants. Do not serialize what
  never needs tuning.
- **One concern per file.** Declarations at top, setup in execution order, teardown last.
- **Symmetric lifecycle.** Every `addEventListener` / observer / requestAnimationFrame loop has a
  teardown twin. Page transitions and the PWA make orphaned listeners a real leak vector here.
- **Fail loudly.** Unreachable branches and broken contracts throw or `console.error` naming the
  exact invariant - never a silent no-op.
- **Cross-boundary string contracts get a comment stating the exact literal and the failure mode
  if it drifts.** Live examples: the layout-to-bundle map in `_includes/js-selector.html`, PurgeCSS
  safelist regexes, any selector list a JS module depends on.
- **Dead code is flagged and deleted**, never left with a "maybe later" comment.

## Process

- **Code wins** - stated at the top of every living doc.
- **Grep-verify before writing a claim down.** "Zero callers" gets proven, not assumed. And textual
  analysis is not a substitute for running the actual build - one Underworld compile break slipped
  past both an audit and a review that only read the code.
- **Don't-touch guards are declared before any cleanup pass**, not discovered mid-pass.
- **Audits** use: declare guards -> scoped finding passes -> adversarial verification against live
  code -> disposition (KEPT / MERGED / REJECTED / RESTORED, rejections kept on record with cause)
  -> severity score + [TASTE] flag separating opinion from rule violations -> run the real build as
  the final gate.
- **Docs are part of done** - touched note + STATUS + CHANGELOG entry before a change batch is
  finished.

## How work is run (Rod, 2026-08-24)

**The priority order, in his own words:**

```
1  Create Agent For New Task
2  Update To Do
3  Implement Follow up from finished agent
```

Read it in order every time. **A new ask from Rod outranks finishing what an agent just sent back**,
because the agent's findings are already captured and will keep, whereas an unlogged, undispatched
ask is the thing that gets lost.

### The loop

1. **Rod asks.** The row goes into [REQUESTS.md](REQUESTS.md) immediately, before any work, one row
   per ask and not per message - his messages routinely carry four or five. Quote him, trimmed.
2. **Dispatch an agent.** Every task, not just the big ones. "It is only a grep" is not a reason to
   skip it: work handled inline exists only in one session's head, and when that context clears it
   is gone. This is the failure Rod got tired of.
3. **An agent reports.** Update `redesign-lab/todo.html` **yourself, immediately** - never dispatch
   an agent for a todo update and never queue it as its own row. It is bookkeeping that rides along
   with every agent result.
4. **Then implement** that agent's findings.
5. **When the work lands, write its review row** on `redesign-lab/todo.html` in the same turn.
   **A task is not finished when the code works, it is finished when its review row exists.** Rod
   works by looking; a change he cannot find is one he cannot judge, and he will go on assuming it
   is still pending. The row carries four things and nothing else: the request id, his words
   verbatim and trimmed, one plain past-tense line on what changed, and the `localhost:4000` link
   to the thing to look at.
6. **A question that blocks work goes on the todo page too**, in its "needs a word from you"
   group, with the options and their numbers. **Chat is not a queue.** A question raised only in
   chat scrolls away and the work then sits blocked with no visible trace, which reads as the task
   being silently dropped. And before parking anything: **do every part that is NOT blocked first.**
   A question about one half is never a reason to stop on the other half - that is what actually
   costs time. Never let a question be the reason nothing shipped.
7. **An interrupt spawns another agent and never derails the current job.** Queue it, dispatch it,
   continue.

### The two limits that bind it

- **Agents do analysis, extraction and measurement. They do not produce finished visual design and
  they do not apply pixel changes.** That guardrail comes from the 2026-08-09 mishap, where a
  screenshot-blind multi-agent fan-out produced ten pages of slop. Multi-agent dilutes coherence
  because the agents cannot see either. Rod is the eyes; agents measure; the main session assembles.
- **Agent output is a claim, not a result.** Verify before applying. One seven-agent audit produced
  a finding that was checked and turned out to be wrong, and a "0 changed" result on a page that
  loads one component is close to no evidence at all.

### What the two lists are for

- **[REQUESTS.md](REQUESTS.md)** is the queue: everything asked, with status. Read the OPEN table
  only; done rows are phantoms and reading them wastes the context the open ones need.
- **`redesign-lab/todo.html`** is the review queue: things that are FINISHED and waiting on Rod's
  eye, each with the `localhost:4000` link to look at. Not a second copy of REQUESTS - two
  hand-maintained lists of the same thing drift, and this repo has been bitten by exactly that.
