# Morning review packet — 2026-08-23

Everything that changed while you were away, in the order worth looking at it.
**Start the server first:** `bundle exec jekyll s`, then the links below work.

---

## 1. Look at this first — the six pages now carry your decisions

| page | what changed on it |
|---|---|
| [post](http://localhost:4000/redesign-lab/final-post.html) | **Most changed.** H1 orange, section breaks now real `<h2>` with case-G counters, H3 silver, body pristine white. Callout slots renamed to your five categories. |
| [landing](http://localhost:4000/redesign-lab/final-landing.html) | Section heads yellow at weight 100 (were white at 700). Card titles silver at 15px (were 27px gold at 700) — its inverted scale is fixed. |
| [about](http://localhost:4000/redesign-lab/final-about.html) | Both bio heads re-levelled: yellow + silver. **Its two-different-golds contradiction is gone.** |
| [projects](http://localhost:4000/redesign-lab/final-projects.html) · [ramblings](http://localhost:4000/redesign-lab/final-ramblings.html) | No design headings yet, so they adopt the ladder for free the moment they grow one. |
| portal | **Untouched — the other agent has it.** One exception noted in §5. |

All of it comes from one file, [`decisions.css`](decisions.css) — every block cites the decision that made it.

**The pages are otherwise still CLEAN**, as you asked. Only type and colour went on. No components.

---

## 2. The decision page — 23 picks recorded

**[text-decisions.html](http://localhost:4000/redesign-lab/text-decisions.html)** · 7 tabs

- [Headings](http://localhost:4000/redesign-lab/text-decisions.html#headings) — the ladder, the colour ramp, the measured inventory
- [Body text](http://localhost:4000/redesign-lab/text-decisions.html#body) — links, inline code, emphasis, the five inline elements, lists
- [Callouts & code](http://localhost:4000/redesign-lab/text-decisions.html#callouts) — the five categories, the tape placements, the code block
- [Media](http://localhost:4000/redesign-lab/text-decisions.html#media) · [Navigation](http://localhost:4000/redesign-lab/text-decisions.html#nav) · [Tables](http://localhost:4000/redesign-lab/text-decisions.html#tables) · [No source](http://localhost:4000/redesign-lab/text-decisions.html#nosource)

---

## 3. Things I got wrong and you caught — corrected in the record

Worth reading because the corrections changed what the docs now say.

1. **"Sections lose their colour identity."** Wrong — verified zero hits. Section colours were **never built**, so D30 redirects an unbuilt plan rather than overturning a live one. There is no hole.
2. **"button-kit is Slop."** Wrong — I repeated that file's own blanket warning without checking what it pointed at, which is exactly the mistake the warning is about. Only its *shapes* line is circular; ripple, fill-sweep and magnetic are genuinely sourced.
3. **"Green tape is unsourced."** Wrong — the tape's *mechanism* is sourced; only the colour is your pick, and D27's own condition was *"or Rod picking it"*. Filed origin ROD.
4. **"The pull quote cannot be taped."** Overstated — tape needs only `position:relative`. The honest word was "has no precedent."

**The lesson I've written into the docs:** check whether a decision was ever *implemented* before calling a change an overturn.

---

## 4. Things the agents found — two verified by me independently

- **The washi tape rotation was 10× too big.** We shipped `-0.5deg`; gneiss's actual value is `0.05deg`. **Corrected.** Measured consequence: on a 700px card 0.5deg lifts a corner 6.11px (visible tilt), 0.05deg lifts it 0.61px — so the card now effectively **stops looking tilted**, which is what gneiss's own does. If you want visible tilt back, that is ours and needs labelling.
- **`--color-muted-warm` was used 3× in `decisions.css` and defined nowhere.** My bug. It silently fell back to a neutral grey on a token named *warm*. Now defined properly.
- acegikmo has **no bare `th` rule** — the real selector is `.feature-table th`. Citation corrected.
- Starlight's mobile TOC is **not "zero JS"**, and its dropdown uses solid fills plus four stacked shadows that will fight the scene.
- **No sourced dark syntax scheme is palette-law clean** — every real one spends a cool hue on keywords. That is the strongest argument that your code-block carve-out is a genuine carve-out.

---

## 5. Open — needs you

**Small, one word each:**

1. **Tape rotation** — corrected to gneiss's value, which means no visible tilt. Keep it, or go back to a visible tilt labelled as ours?
2. **`button-kit` shapes** — I can fetch stephanewillems' live CSS and check whether their real buttons carry that padding. If they do, the last circular citation on that component closes. Worth doing?
3. **Reading progress bar** — you said remove it. It lives in `_javascript/`, which D22 puts off limits until the port. Port-time task, or touch it now?

**Larger:**

4. **The quote callout.** It has **no honest home** in your best-developed post — pulling a line would duplicate something the reader meets moments later, in a five-section post. It is also the one category that had to be bent to exist (L-corners need corners, so it gained a card, contradicting both its sources). **Worth deciding whether it should exist at all.**
5. **`element-gallery.html`** — I will surface those elements as competition when the components they would compete with are built, per your note about needing context.

---

## 6. THE COMPONENTS ARE BUILT — 8 components, 3 versions each

**→ [`component-review.html`](http://localhost:4000/redesign-lab/component-review.html) — the batch review page.**

| # | component | the three versions differ on |
|---|---|---|
| 1 | **Callout family** | how loud the box is, and whether its shadow blurs ([full demo](http://localhost:4000/redesign-lab/extracted/index.html?c=callout-family)) |
| 2 | **Code block** | the **syntax scheme** — chrome was already decided ([full demo](http://localhost:4000/redesign-lab/extracted/index.html?c=code-block-real)) |
| 3 | **Figure + caption** | how far the caption recedes |
| 4 | **Table** | literal vs effect, and whether it actually scrolls |
| 5 | **Related post card** | how much of the parent survives |
| 6 | **Prev / next** | the hover |
| 7 | **Heading anchor** | the mark — you picked the *behaviour*, not the glyph |
| 8 | **TOC** | fixed vs sticky, and how the active item is marked |

**The workflow died on a session limit, not a code fault** — 8 craft agents failed at once with
"session limit, resets 7:50am". **The 8 reference briefs had already completed**, so I built the
components myself from them. The briefs are saved in
[`analysis/reference-briefs/`](analysis/reference-briefs/) — 84KB of verified source work.

### Six of the eight briefs found a real error

Three of them were **mine**, and they change specs I had already given you:

1. **The related-card "exactly three deletions" spec was wrong.** I wrote it from a grep. The hover
   rule I told you to delete is a **suppressor** — deleting it *adds* a 24px gold bloom. The
   `translateY` is a static layout offset, not a band reveal. And the three deletions remove
   **neither** the glass nor the motion: six transitions and two glow systems survive them.
2. **The heading anchor's `scroll-margin-top: 6.6rem` is calibrated to Maxime's nav, not ours.** At
   ≤780px it leaves **−2px** and at ≤560px **−18px** — the heading tucks under our sticky bar.
3. **Our own `.prose a` was silently overriding that anchor** — killing its colour, adding a gold
   hairline under the mark, replacing its focus state with a gold filled block.

The other three were in the sources or the saved notes:

4. **The related card's one external citation is dead** — `yannesidibe.com/about` is a 404 and the
   site is now Tailwind/Next, with zero hits for `glow`, `mask-composite` or `plus-lighter`.
5. **gneiss has no callout system at all** — all six stylesheets, zero hits. The tape is sourced;
   the box never was.
6. **acegikmo's real table is the one the note missed** — `.shape-prop-line` at **126 uses** against
   the pill grid's 1.

All corrected in `decisions.css` and `COMPONENT-TABLE.md`.

## 7. Still running

The **8-component reference + craft session**. Reference finished all 8 and the briefs are good. Craft was interrupted and has been **restarted with the reference results cached**, so it resumes at the build step.

**When it lands, each component gets:** 2–3 real versions, a demo page at the real measure, and a provenance note per version. Then a consistency and provenance audit across all of them.

**Nothing from it is ready to review yet.** I would rather tell you that than point you at empty folders.

Worklist and status: [`COMPONENT-TABLE.md`](COMPONENT-TABLE.md).

---

## 8. Where the record lives

- [`docs/DECISIONS.md`](../docs/DECISIONS.md) — **D31** (the text system, 23 picks) and **D30** (the callout family)
- [`docs/REQUESTS.md`](../docs/REQUESTS.md) — OPEN table, rows P116–P149 from this session
- [`docs/CHANGELOG.md`](../docs/CHANGELOG.md) — the session entry with the why
- [`analysis/2026-08-23-callout-placements.md`](analysis/2026-08-23-callout-placements.md) — where each callout actually fits in ComputeGrass. **Headline: your TL;DR already exists** — the six-bullet pipeline summary at the top of that post is one, unmarked.
