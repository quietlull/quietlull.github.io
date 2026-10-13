---
name: feedback-later-decision-wins
description: "When two Rod-approved decisions conflict, assume the LATER one is correct; checking is welcome but do not stall on it."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 5b134360-884e-4a99-88bf-dcdb6d975d1c
  modified: 2026-08-23T15:27:34.254Z
---

Rod, 2026-08-23: *"please always just assume the later decision is correct when possible it doesn't
hurt to check though I will say good job on that indeed its the 94 character one that's correct."*

**Why:** this project accumulates approved artefacts that go stale rather than being deleted -
blockouts, decision entries, source notes, ledger rows. Two of Rod's own calls can therefore
contradict each other, and treating that as a blocker stalls work that should just proceed. The
later call is the one made with more information.

**How to apply:**
- **Default to the later decision and keep building.** Do not stop and ask when the chronology is
  clear.
- **Still surface the conflict**, briefly, with both dates and what each says. He explicitly said
  checking "doesn't hurt" and called it out as the right move - the fault would be *stalling* on it,
  not *raising* it.
- **Then fix the stale artefact** so it stops misleading the next reader, rather than leaving two
  contradicting sources live.
- Worked example: the post blockout reserves a 711px content column; `final-post.html` renders 767px
  (94 characters, P33). **767 is correct** - the blockout is 56px out of date. See
  [[project_site_sections_and_plan]].

**The related trap, learned the same day:** check whether a decision was ever *implemented* before
calling a change to it an "overturn". A decision recorded in `DECISIONS.md` is not the same as a
decision that shipped - D27 assigned tape colours to site sections and that was never built, so
changing it overturned nothing. See [[feedback_verify_the_premise]].
