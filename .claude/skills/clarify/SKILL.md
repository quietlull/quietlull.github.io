---
name: clarify
description: Catch under-specified requests BEFORE building. Fires when Rod's ask contains a bare pronoun (it / that / this / these / them), a vague verb (fix / change / update / adjust / redo / make it better), a name this repo uses for more than one thing (card, portal, bench, header, button, blockout, breathing), or a screenshot/selection with no stated target. Echo back the reading, name the alternatives, ask one question. Do NOT fire on requests already pinned by the last message or by a file path.
allowed-tools: Read Grep Glob Bash
---

# Clarify before building

Rod, 2026-08-23: *"I want you to make a skill that helps you recognize when there isn't enough
information and to ask follow up... say back to me what you think i meant and ask if its correct."*

The failure this prevents is not "asking too little". It is **building the wrong thing confidently**
and burning a round trip plus Rod's attention on a rebuild. A wrong guess costs a whole cycle; a
one-line check costs seconds.

---

## 1. The trigger scan

Run this against the request before touching a file. Any hit = candidate.

| Signal | Looks like |
|---|---|
| **Bare pronoun** | "make **it** bigger", "move **that** down", "**these** are wrong" |
| **Vague verb** | "**fix** the spacing", "**change** the colour", "**update** the header", "make it **better**" |
| **Overloaded name** | any word in the collision table below |
| **Bare screenshot** | an image or a selected element with no sentence saying what about it |
| **Comparative with no anchor** | "make it more like the other one", "same as before" |
| **Silent scope** | "the buttons" - all of them? on this page? site-wide? |

---

## 2. The two-second test - is it ACTUALLY ambiguous?

Most hits resolve themselves. Ask only when a **wrong reading would produce different work.**

**Resolve it yourself and proceed when:**
- The previous message names the target and nothing has changed subject.
- Only one candidate exists on the surface being discussed. ("the close button" when one window is open.)
- A file path, URL or selected element pins it.
- Every reading leads to the same edit.
- It is a routine judgement call a careful colleague would just make.

**Ask when:**
- Two or more readings produce **materially different** work.
- The word is in the collision table and context does not disambiguate.
- The request touches LAYOUT - Rod's standing rule is that layout authority is his and must be
  direct and confirmed, never inferred from a nearby request or a fix's side effect.
- It would overwrite, delete or move something already approved.
- Rod is reporting a BUG and the cause is not established. Ask for the viewport / which element /
  what he sees, rather than guessing at a mechanism.

**Never ask** for something measurable. Go measure it. "Which windows overlap" is a script, not a
question. Reserve questions for intent.

---

## 3. How to ask

Echo back, name the fork, ask once. Keep it to a few lines - this is a checkpoint, not a meeting.

> **Reading it as:** \<the specific thing, named exactly - file, component, or slot\>
> **Could also mean:** \<the other candidate, and why it is plausible\>
> **\<one question\>**

Rules:
- **Name things exactly.** "the `.pwin__bar` title on the three door windows", not "the header".
- **Say what you will do under your reading**, so a "yes" is enough to proceed.
- **Batch.** One message, up to ~3 questions. Never a drip.
- **Offer the likely answer first** if you have one - Rod can confirm faster than he can compose.
- **If one reading is clearly dominant, say so and start on it**, flagging the assumption. Do not
  block on a question when the work is reversible and the odds are lopsided. Blocking is for when
  proceeding wrong would be unsafe or waste real work.

---

## 4. This repo's collision table

> **DATED SNAPSHOT - 2026-08-23, one session. Assume it is behind.**
> Rod flagged this the moment it was written: *"note that this is not the latest session this should
> be behind alot of iterations."* The table below was true when the portal was finished and the repo
> has moved since. **Treat every row as a lead, not a fact** - grep for the name and see what
> actually exists before you rely on it. Components get renamed (`prose-blockout` →
> `callout-selection` happened inside a single session), pages get retired, and a collision can
> resolve itself when one of the two things is deleted.
>
> The METHOD in sections 1-3 does not go stale. The nouns do. If a row turns out to be wrong, fix
> the row - that is the maintenance this file expects.

Words that name more than one real thing here. Grep before assuming.

| Word | Candidates |
|---|---|
| **card** | `merged-card` / `project-cards-expensive` (the landing's project cards) · `card-tests` · `related-card-real` · `card-greys-tests.html` · **and the portal WINDOWS, which Rod calls cards** |
| **portal** | `final-portal.html` (the page) · `portal-blockout.html` (its greybox) · `extracted/components/portal-window/` (the component) |
| **bench / workbench** | `extracted/index.html` (the component bench, `?c=<id>`) · `redesign-lab/` as a whole · `rework-*.html` (source CANDIDATES, never sources) |
| **header** | a window's `.pwin__bar` title · `.prose h2` · `post-header` · `section-head` · the page top bar |
| **button** | `button-kit` primary / outline / pill · the portal's Enter affordance (a span, not a button) · `.pwin__close` · the nav links |
| **blockout** | seven `*-blockout.html` pages, plus `component-blockout.html` |
| **final page** | six `final-*.html` |
| **breathing** | the `breathe-bg` system in `foundations.css` · drift-magnet's ambient drift · the `breathe-*` keyframe tiers in BREATHING.md. **Rod has used "breathing" for the drift** - correct symptom, different mechanism. Confirm which is moving before removing anything. |
| **the wave / the fill** | `.top-bar__link::before` (nav) · `.kit-button__fill` (kit outline/pill). Same dennissnellenberg device, two homes - so "like the nav" may mean *use the other variant*, not restyle. |
| **glow** | the phojanecki ripple (button-kit) · the `ct-glow-card` masked edge ring · the scene bloom · `--color-glow` the token |
| **callout selection** | was `prose-blockout.html`, renamed 2026-08-23. Old name may still be in play. |

**Maintain this table.** When a name turns out to be overloaded, add it - that is the whole value.

---

## 5. Worked examples, all real

*Same caveat as the table: these are from 2026-08-23 and the numbers in them are historical. They
are here to show the REASONING, which keeps. Do not quote their figures as current state.*

**Screenshot, no sentence.** Rod sent a portal screenshot: *"lets do something like this?"*
Right move: measure first. The window SIZES matched the build but the POSITIONS did not - so he had
dragged them himself. Reading offered: "bake this arrangement as default", with the measured cost
(door gaps 820px → ~493px) so the trade was visible. Confirmed, then built.

**Overloaded name, resolved by asking.** *"the cards themselves should be the deep blues of the
site"* - "cards" could be the landing's project cards or the portal windows. Context (mid-portal
work) made windows dominant, so: proceed on that reading, state it, flag that the project cards are
still blue and the two would then disagree. That flag turned out to be the real question.

**Vague verb where asking was WRONG.** *"make the magnet strength higher maybe double it"* - one
constant, one file, reversible. Asking would have been friction. Doubled it, measured the new curve,
reported both numbers.

**Where NOT asking cost a rebuild.** *"give them the features consistent to other page buttons like
magnetism..."* was read as REPLACE the existing proximity lean. It meant ADD. Rod: *"why did we lose
proximity lean?"* The tell was there - "consistent with" is additive language, and the lean was a
tuned behaviour with his own constraint already in it. **Removing something that already works is
the highest-value place to check first.**

**A bug report with no established cause.** *"Some cards have their X cut off"* - measured at four
viewports, could not reproduce, reported that honestly and asked for the width. His next message
(*"the boxes need to be wide enough to fit their header text"*) named the real cause. Guessing at a
mechanism would have shipped a fix for the wrong thing.

---

## 6. The one-line version

**Would a wrong reading change what I build?** If yes, echo it back and ask. If no, build it and say
which reading you took.
