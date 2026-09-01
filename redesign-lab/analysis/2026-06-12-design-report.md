# Design Analysis Report — 2026-06-12

**Companion to** the a11y report (same date). **Procedure:** STYLE.md Section I (Laws of UX, soft)
judged against the design vision + priority stack (Step 0), NOT against a generic minimal
portfolio. Per Section I: festival personality operating as intended is NOT a finding; flagged
only where friction hits the floor (can't find the work / can't read / can't orient / no
hierarchy) or where the page contradicts Rod's OWN principles (de-glow, "reserve distinction,"
"look at this not look at me," intentional-not-algorithmic spacing).

**Scope:** `aggregate.html` as rendered (headless captures: top, cards, post). **Evidence:** the
three screenshots referenced inline. **Output:** report only. Every proposal cites a reference
source (Rod's standing requirement); where a fresh reference is needed it says so.

**Two framings up front:**
- Some items below are **known deferred debt** (font selection, spacing) — flagged as "here's the
  target," not "surprise defect." Marked `[expected]`.
- The aggregate is a Frankenstein by design (mixed-provenance sections). I'm judging the
  *direction*, not demanding the lab page be final.

---

## Findings table

| # | Sev | Basis | Location | One-line |
|---|-----|-------|----------|----------|
| D1 | Floor | Priority stack #2 (scannability) | hero + tools before cards | The work sits below hero(72vh)+tools — not "findable in one click / on the landing" |
| D2 | Floor | Von Restorff (P8) + "look at this" | top bar | 3 solid-orange toggles are the loudest thing in the bar — settings out-shout identity/nav |
| D3 | Major | Von Restorff (P8) + vision "reserve distinction" | whole page | Caveat hand-script on hero + every section header + card titles + footer = nothing special |
| D4 | Major | Jakob (P1) + cohesion debt `[expected]` | chrome vs sections | 4 display faces, no system: hero/headers Caveat, post title Shippori, kit/tools/list Inter |
| D5 | Major | de-glow principle (vision) | hero bloom | Center bloom is a bright warm wash — floods the "night" the lantern needs to read against |
| D6 | Minor | Von Restorff (P8) | palette | Near-monochrome amber; the reserved "rare pink pop" is unused, so nothing tops the hierarchy |
| D7 | Minor | intentional spacing (vision) `[expected]` | section rhythm | Vertical rhythm reads even/algorithmic — the exact Claude-tell; this is what the tuner is for |
| D8 | Minor | Hick (P3) + content priority | tools section | "What I work with" (8 placeholder icons) precedes the work; tools should support, not lead |
| D9 | Note | Peak-End (P9) | strengths | Cards + post internals are genuinely strong; the festival bloom is authentically his |

---

## Detail + proposals (each with a reference)

### D1 — The work is below the fold — Floor (priority stack #2)
**Observation (dx-top.png):** the landing is wordmark+nav, then a 72vh hero (hand-script name +
tagline + one toggle), then the **tools** section — the project cards don't appear until the
visitor scrolls well past the first screen. The priority stack says projects must be "findable
in a single click and on the landing page," and the imagined visitor is "bored, shuffling
through portfolios" — they may not scroll.
**Proposal:** shorten the hero (cap ~60vh or less) and/or let the top of the cards peek above the
fold; consider tools *after* the work. **Reference:** **merodev.net** (your card reference) puts
work near-immediately; **brittanychiang.com** keeps a compact hero with content close behind.
The spark (#1) still decorates the hero — this just stops it from *blocking* #2.

### D2 — Top-bar toggles out-shout the identity — Floor (Von Restorff inverted)
**Observation (dx-top.png):** three solid bright-orange slap pills (Breathing/Sparkler/Fireworks)
are the highest-contrast element in the bar — louder than "RODNEY FAN" and the nav. Visual weight
is landing on *settings* (the least important controls), which also reads as "look at my toggles"
rather than "look at the work." Von Restorff: distinction should mark the one thing that matters.
**Proposal:** quiet the resting state — ghost/outline pills, with the glow reserved for the *on*
state only (or the active feature). Three loud always-on pills is the issue, not the toggle
itself. **Reference:** **norikura** (the top-bar source you picked) uses restrained thin-line
toggles; **dimden.dev**'s neon-sign toggle is a *single* deliberate accent, not a row of three.
The bench already has a quieter small variant to build from.

### D3 — Hand-script is everywhere, so nothing is special — Major (vision: reserve distinction)
**Observation (all three):** Caveat carries the hero name, *every* section header (~the work~,
~find a project~, ~a write-up~, ~about~), the card titles, AND the footer. The design vision
explicitly wants distinction *reserved* for the thing that matters most per view; when the
"special" festival font is the default, the hero name no longer stands out and the eye stops
registering the tildes. This is the Von Restorff failure mode and adjacent to the Claude-tell
(decoration applied uniformly rather than intentionally placed).
**Proposal:** reserve Caveat for the **logo/wordmark + at most one ornament**; demote section
headers to the mono or serif workhorse (they can keep a small festival tic — a tilde or a
slash — without being full hand-script). **Reference:** **harumakigohan** and **hana.b-rave** use
hand-lettering *sparingly* (logo + one accent), serif/mono for structural headers — the exact
restraint that makes their hand-lettering feel special. (Ties to D4.)

### D4 — No unified type system across sections — Major (Jakob) `[expected]`
**Observation:** four display faces with no rule: hero + headers = Caveat; post title + prose =
Shippori serif; kit/tools/list (the stephan-derived sections) = Inter; body = M PLUS Rounded.
Inter clashing with M PLUS is the most visible seam. This is the **known cohesion debt** (font
selection was deliberately deferred), so it's direction, not surprise — but it's the single
biggest thing making the page read as assembled-from-parts rather than one site.
**Proposal:** lock the hybrid fork into ONE family per role and apply site-wide: **display**
(headers), **body** (prose + UI), **mono** (meta/code/tags), **hand** (logo only). Drop Inter —
fold the stephan sections onto the body face. **Reference:** the candidate set already in the
ledger from the **potg.art** scrape (`sources/potg-typography.md`): high-contrast serif display +
clean geometric sans body. This is the cohesion pass; D3 is a precondition for it.

### D5 — Hero bloom floods the night — Major (de-glow principle)
**Observation (dx-top.png):** the center bloom is a broad, fairly bright warm-orange wash. The
project's own de-glow principle is "lantern needs night" — the glow should *pool against
darkness* as a focal accent, not flood the central third. Right now the wash lowers the
night/contrast that makes a lantern read as a lantern.
**Proposal:** lower bloom intensity and/or tighten its radius so the dark dominates and the glow
becomes a deliberate pool behind the name. **Reference:** the de-glow principle in memory
`project_visual_references.md`; **hana.b-rave**'s actual bloom is subtle and off-center, not a
centered flood. Tunable live via the Palette page + the bloom alpha.

### D6 — One-hue palette has no top note — Minor (Von Restorff)
**Observation:** everything is amber/gold/orange on navy. That mono-warmth IS the
Shinsekai-sourced identity (intended). But the twilight-festival palette reserves a **rare pink
pop** (`--color-pink`, currently unused) — with zero secondary, the most important element (a
primary CTA, the pinned state) can't out-rank its neighbors by hue, only by glow.
**Proposal:** spend the pink pop on exactly one thing per view (e.g., the primary action or the
"pinned" marker). **Reference:** the twilight-festival palette (norikura + harumaki) you sourced
it from uses a sparing pink against the warm field. One accent, not a recolor.

### D7 — Spacing rhythm reads algorithmic — Minor (intentional-spacing) `[expected]`
**Observation:** section→header→content gaps look uniform top to bottom — the even, default
rhythm you named as the Claude-tell ("strange/unintentional spacing decisions"). Not a defect
yet; it's un-tuned. **Proposal:** this is precisely what the bench/aggregate spacing tuner exists
for — a deliberate per-section pass where gaps vary by intent (tighter within a cluster, generous
between). **Reference:** Gestalt proximity (P11) — group with whitespace; the dimden/Neocities
hand-placed feel comes from *uneven, intentional* spacing, not a grid.

### D8 — Tools precede the work — Minor (Hick / content priority)
**Observation:** "what I work with" (8 icons) sits between hero and cards. Tools are supporting
evidence; leading with them delays the work and front-loads a choice/scan. (Icons are also the
known placeholder geometry — parked.) **Proposal:** move tools below the work, or fold them into
the about/region; let the cards follow the hero directly (reinforces D1). **Reference:**
**stephanewillems.be** (the tools source) presents skills as a *secondary* section, not the
opener.

### D9 — What's working — Note (Peak-End)
Recorded so the next pass doesn't "fix" them: the **flip-tile cards are genuinely strong** (the
big Compute-Grass cell carrying real video is the best "look at this" moment on the page); the
**post internals are coherent** (norikura header → hana TL;DR/prose/code → harumaki stamp
takeaway reads as one editorial voice); the **bloom + lantern theme is authentically Rod's**, not
a veneer. Peak-End says the opener and closer carry the memory — the cards are a strong peak;
the footer is currently the weakest close (unremarkable, noted in final-picks).

---

## Suggested sequence (after approval; nothing changed here)
1. **D3 + D4 together** — the type system (reserve Caveat, drop Inter, lock the hybrid roles).
   Biggest coherence win; D3 unblocks D4. Needs the font-selection decision you deferred.
2. **D1 + D8** — hero height + section order so the work leads. Structural, cheap, high-impact on
   the priority floor.
3. **D2 + D5 + D6** — the "loudness" trio: quiet the toggles, calm the bloom, add the one pink
   accent. All tunable live (Palette page + toggle variant).
4. **D7** — the deliberate spacing pass, last, once order/sizes settle.

**On references:** D1–D8 all cite sites already in your curated set (merodev, norikura, hana,
harumaki, stephanewillems, dimden, potg) — nothing here needs a brand-new source. If you want
*fresh* references for any specific fix (e.g., quieter top-bar toggle patterns, or hero
compositions that lead with work), say which and I'll run the vibe-site-research skill rather
than free-hand it.
