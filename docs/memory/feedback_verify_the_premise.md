---
name: feedback-verify-the-premise
description: "Every failure this project has had came from verifying mechanics while never testing the premise. Check the premise first, drive the REAL input, and log repeat offences to docs/PAGE-PROCESS.md."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 44ce946e-ba74-4e0e-b1da-32a1620ad724
  modified: 2026-09-04T01:48:59.497Z
---

# Verify the premise, not just the mechanics

Four separate failures on 2026-08-16, one root cause. In every case the WORK was sound - CSS
genuinely fetched, geometry genuinely measured, confidence fields honestly marked
"read-from-source" - and the PREMISE underneath was never tested.

1. **Rod's own pick was dropped.** He chose stripe.dev for the post page. A research workflow
   sourced its own four references and the blockout was built from that without ever diffing
   against his pick. **A reference the user names is a requirement, not a candidate.**
2. **Two "portal" sources were not portals.** potg.art is a portfolio with a nav bar; lyra.horse is
   a homepage with project links. Ask of every reference: *does this site actually have to solve
   the problem this page type solves?* That is a SEPARATE test from reading its CSS.
3. **"A bench file exists" is not provenance.** The 2026-06-09 trust reset put every element back
   to Slop until re-proven.
4. **An invention inherited a real source's credibility.** A `/ contents` TOC was added to stripe's
   rail; stripe has no TOC. Anything added beyond the transcription must be labelled as ours AT THE
   MOMENT it is added.

Also: **a minimum-source quota manufactures false provenance on rare page types.** And: **withdraw
wrong claims explicitly** rather than quietly moving on.

## DRIVE THE REAL INPUT (2026-09-03, and this one cost three shipped fixes in a row)

**A synthetic `dispatchEvent` proves that a handler is attached. It proves NOTHING about whether
the browser would ever fire that event there.** I shipped a cursor-glow fix "verified" exactly that
way; the event it listened for never fires in reality, so the fix did nothing. Rod had to tell me.

Then I shipped a second fix on the same wrong assumption, and he had to tell me again.

**The measurement that should have come first, and took ten minutes:** arm a counter on the real
event, then drive the actual cursor across the boundary. Result: a cross-origin iframe delivers
**zero** events to the parent - not pointermove, and not the boundary events either. Both fixes had
assumed the parent gets told when the cursor arrives. It never does.

**The tell that I was reasoning instead of testing:** I could explain the mechanism fluently and
had not once observed it. Fluency is not evidence. If the explanation is doing the work, stop and
go measure.

## "WHY DOES THAT KEEP HAPPENING" IS A DIAGNOSTIC, NOT A COMPLAINT (2026-09-03)

Rod asked three times why the giscus comments kept rendering unthemed. Twice I blamed a mid-deploy
fetch window - and wrote that guess into the codebase as though it were established. It was not.
`jekyll serve` **replaces `site.url` with the local server address**, so the theme URL rendered as
`http://localhost:4000/...`, which the widget's own iframe cannot fetch. It failed on **every local
view, deterministically.**

**"Keeps happening" means deterministic, and deterministic means reproducible, and reproducible
means measurable.** An intermittent-sounding excuse (a deploy window, a cache, a race) is the wrong
shape of answer for a symptom that recurs every time. Treat the recurrence itself as the clue.

## It applies to CODE and to PLANS too (2026-09-02)

- **A plan item built on a false mechanism.** REFACTOR-PLAN's teardown audit said listeners leak
  across navigations via the PWA. Measured: navigation is a full page load, so nothing leaks that
  way. **Check the mechanism before auditing against it.**
- **A tool that had never been shown to fail.** A checker reporting "0 hazards" is worthless until
  it has reported non-zero on a real fault.
- **An instruction whose literal execution would break things.** "Keep only character-scene files"
  would have deleted what six lab pages import. **Report, then delete.**

Also: a claim in your OWN commit message or comment can be the false premise, and a comment
asserting a cause is not evidence of that cause - two were corrected this way.

## Rod's reinforcement rule (2026-08-16)

**Duplicate mistakes get logged AGAIN in `docs/PAGE-PROCESS.md` under REPEAT-OFFENCE TALLY**, on
purpose, because "your notes to your own memory are very leaky". Do not merge or tidy that tally.
