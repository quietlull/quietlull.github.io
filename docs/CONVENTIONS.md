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
