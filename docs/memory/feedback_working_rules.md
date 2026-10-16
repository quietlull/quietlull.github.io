---
name: working-rules
description: "How Rod wants me to work: ask first, Rod is the eyes (no screenshot verify), always link preview page URLs, one small change at a time, ask before pixel changes."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d0c58552-18a2-49ae-b75d-2ee8211fe4c8
  modified: 2026-08-11T18:28:47.527Z
---

# Working rules (merged 2026-08-11 from no-assumptions + no-screenshot-verify + link-changed-files)

**Ask first, no assumptions.** "Look at" / "review" = ANALYZE and explain, never rewrite. No sweeping changes (refactors, restructures) without the specific change described and approved. Present options and wait; don't pick one and implement. One small change at a time, verify before the next. During the redesign: **ask before ANY change that could alter a rendered pixel.**

**Rod is the eyes.** Never verify visuals by screenshot (especially animation - static images can't show it, and it wastes turn time). Make the change, describe it, ASK Rod what he sees. I am screenshot-blind; Rod runs the see-and-adjust loop ([[feedback-design-generation-mishap]] is what happens when I forget this). Only capture an image if Rod explicitly asks. Preview-first: show non-trivial changes in chat and get a go BEFORE touching files (now also a standing rule in the repo CLAUDE.md).

**Always link the preview PAGE URL.** Every change I make or report gets a clickable `http://localhost:4000/...` page link so Rod can immediately see it rendered (lab: `/redesign-lab/<page>.html`; live: the page's route). Page link > file link; a `file:line` link is an optional extra. Every time, lab or live.

**Why:** Rod had to clean up unapproved sweeps and rejected slop; asking first and keeping him as the judge of every visual is the trust contract. Links save him hunting for the page.
**How to apply:** before acting, check the change was named and approved; after acting, report with the page URL and ask what he sees. Related: [[writing-voice-no-emdash]] (content edits), [[project-code-provenance]] (where code may come from), [[feedback-anti-bloat]] (what not to "improve").

**Link the THING, not just the page (Rod, 2026-08-22).** *"confused when referring to something
link to its page not sure what a toast letter is."* Letters, case labels and variant ids only mean
something inside the page that defines them - "case D", "option B", "toast letter" are noise in a
chat message. **Name the thing in words AND link the page it lives on, every time**, including in
question lists and summary tables. This extends the always-link-the-preview-URL rule from changes to
*references*: if I mention it, he must be able to click it.

**Use the REAL text. Never fake it with grey lines (Rod, 2026-08-23).** *"remember never to do this
weird like dividers do real text just use the about me page text directly its not like we dont have
any."* Placeholder rules standing in for prose are only honest when the copy genuinely does not
exist yet. His does: `tech-art/about.md` front matter carries `bio_intro` and `bio_more`, posts
carry their own body, and `_data/` holds the rest. **Beyond looking lazy it hides a real bug** - the
block gets sized around 1px rules instead of around prose, so measure, line-height and paragraph
spacing never get set and the panel is the wrong height the moment real text lands. Same instinct as
[[feedback-verify-the-premise]]: check whether the thing already exists before inventing a stand-in
for it.

## LINK THE PAGES THAT ARE READY FOR REVIEW (Rod, 2026-08-24)

**"remember to link to pages that are ready for review"**

Not just "link the preview URL for a change" - at the END of a working stretch, list the pages that
are now ready for his eye, as clickable `http://localhost:4000/...` links. He works by looking, so a
finished change he cannot find is not finished. If three pages changed, he gets three links, not a
prose summary mentioning them.

## PICTURES ARE NOT PROOF. THAT INCLUDES PIXEL COMPARISONS. (Rod, 2026-10-11, said with irritation)

**"We have established many times that pictures dont work and you should ask for manual reviee when
needed."**

What I had done: built `tools/picture-check.mjs` (photograph an element before and after, count
differing pixels), told an agent to use it, and reported "pixel-identical" to him as proof. I had
talked myself into "a pixel count is a measurement, not a judgement of looks". He does not accept
that distinction, and the tool had already burned me once the same day: its "hovered" pictures
were not hovered, so a claim I gave him was empty.

**How to apply:**
- Never take, compare or cite a picture to verify how something looks. Not a screenshot, not a
  pixel diff, not "0 pixels differ". Do not build tooling for it and do not brief agents to.
- For anything a visitor can see: make the change, then give Rod a **short manual checklist**:
  the page link, what to do (hover this, rest the mouse on that), what he should see. He is the
  check.
- Measurements that are not pictures are still fine and still expected: computed styles, element
  positions, script behaviour driven with a real mouse, lint.
- When this was written `tools/picture-check.mjs` and its mention in repo `docs/behaviours/README.md`
  still existed and were owed removal after the running agent finished.

## DO NOT USE MY TOOL NICKNAMES WITH HIM (same message)

**"i also dont know what tou mean by fingerprint and workbench"** - said after I listed "rebuild,
behaviour check, pictures, fingerprint, workbench" as an agent's proof run. Those are my names for
my tools. Say what the check does: "a comparison of every element's position and style, before and
after" and "the lab page that shows each component on its own; a check opens every one and looks
for script errors". Same rule as [[feedback_plain_language]].
