# Everything left — to create, to test, to decide

Rod, 2026-08-23: *"please list out everything left to be created or tested so I'm not waiting for
you to finish and asking you to start again."*

**This file is the working list.** It is kept honest: nothing is marked done that has not been
measured, and nothing is omitted because it is awkward.

Companion files: [`COMPONENT-TABLE.md`](COMPONENT-TABLE.md) (the worklist),
[`analysis/2026-08-23-blockout-contract.md`](analysis/2026-08-23-blockout-contract.md) (the measured
contract), [`REVIEW.md`](REVIEW.md) (the review packet).

---

## A. BUILT AND READY FOR YOU — 10 components, 30 versions

All on **[`component-review.html`](component-review.html)**. Pick one per row.

callout family · code block · figure + caption · table · related post card · prev/next ·
heading anchor · TOC · post header + metadata rail · image zoom

**Six of the eight briefs found a real error, three of them mine.** Detailed in `REVIEW.md` §6.

## B. BUILDING NOW — 12 components, in flight

`search-bar` · `empty-state` · `filter-pills` · `page-title-desc` · `entry-row` ·
`view-all-button` · `skill-tile` · `status-chip` · `portrait-frame` · `achievement-tile` ·
`socials-row` · `bio-block`

Each is handed its **measured** blockout box and must draw that reservation as a dashed outline
behind it, so the fit is visible rather than claimed. An audit pass follows that checks fit,
provenance, palette and scope across all twelve.

## C. STILL TO CREATE — not started

| # | component | blocked on |
|---|---|---|
| C1 | **Trophy wall / achievements catalogue + detail** | **You.** No source, and you said it needs a design conversation first (backlog E1b). The *tile* and *locked state* are in group B; the **wall** is not, deliberately. |
| C2 | **Demo reel** | No sourced design. You pulled the section on 08-18 and said "we will fix it later". Blockout reserves **1421 × 540** with a **960 × 540** player. |
| C3 | **Skill flipper band** | Blockout reserves **1421 × 120**. The skills *row* is approved; the flipper is a separate device with no source yet. |
| C4 | **Top bar toggles** | **You.** D21 says one control for scene + all motion; #45 asked where it lives and is still unanswered. **There is currently no manual motion control anywhere on the final pages.** |
| C5 | **Reading progress bar** | **Cut by you** — but the deletion touches `_javascript/`, which D22 blocks. **Port-time task.** |
| C6 | **Project card scaling fix** | Your one named complaint about the parent: *"biggest issue with them over anything else is scaling."* Not yet addressed. |

## D. TESTED TODAY — results in hand

### D1. Line boil — [`line-boil-test.html`](line-boil-test.html) ✅ **built, and it answers the question**

You asked to test a font-change boil before providing the fonts. **The useful test is the
constraint, not the effect** — P100 records it as *"identical metrics across all three or the text
reflows every frame."*

**Measured, three fonts we already have:**

| font | width | drift | height |
|---|---|---|---|
| M PLUS Rounded 1c | 527.95px | — | 68px |
| Caveat | 518.42px | **−9.53px** | 64px |
| IBM Plex Mono | 579.61px | **+51.66px** | 60px |

**FAIL — max drift 51.66px, 9.8% of the line.** Heights differ too.

**What that means for your three scratch fonts:** they have to be cut from **one skeleton with
identical advance widths per glyph**, not drawn independently. Three separately hand-drawn
alphabets will land here, not at zero. **Swap them into the harness and it answers immediately** —
one array at the top of the file, nothing else changes.

**And the clock is the hard case**: a digit changing every second on top of a boiling swap compounds
both drifts. The page also carries **procedural path jitter** (rough.js precedent, tiered Remixed)
as the route STATUS already assigns to the clock — its bounding box varies by at most the amplitude
and **never reflows**, which is the whole difference.

### D2. Heading hierarchy across all six pages ⚠️ **was NOT shared — now fixed**

You asked if all pages share the corrected hierarchy. **They did not.** Measured:

| page | finding |
|---|---|
| **post** | ✅ clean — no off-ladder headings, no weight-700 left |
| **about** | ❌ `"Hey There, I'm Rod"` was an **`<h3>` doing an `<h2>`'s job** — the same fault the post had. **Fixed → `<h2>`.** `"More About Me"` correctly stays `h3`. |
| **landing** | ⚠️ the **`h2` elements carried no ladder role** — the style lived on a `.section-head__name` child, so the `h2`'s own colour stayed white/700 and unused. Harmless on screen, wrong to anything reading the element. **Mapped.** |
| **projects · ramblings** | **zero design headings** — still blockout stubs, so "sharing the hierarchy" is vacuous until they grow one |
| **portal** | 2 chrome `h4`s at weight 700 — **the other agent's file, left alone** |

### D3. Blockout fit ⚠️ **four mismatches, three resolved**

1. Blockout **labels** say `701`, it **renders** `711` — a 10px gap inside one file. *Rendered wins.*
2. **Content column: blockout 711 vs page 767** → **RESOLVED, 767 is correct** (your call). The
   blockout is 56px stale.
3. **Callout reserved 80px, renders 130** → **reservation corrected to the measured 130px.** The old
   76px came from a single-line, *unlabelled* callout. Measured: V2 102, V1 130, V3 150.
4. **Prev/next: blockout reserves 345 × 44 each**, the source rule is a 50% flex. `345 × 2 = 690`,
   which is neither 711 nor 767 — **the blockout's own prev/next does not fill its own column.**
   Still open.

---

## E. NEEDS A DECISION FROM YOU — nothing can proceed on these

| # | question |
|---|---|
| E1 | **Pick one per row** on `component-review.html` — 10 rows. This is the biggest unblock. |
| E2 | **Tape rotation** — corrected to gneiss's real `0.05deg`, which means **no visible tilt**. Keep, or a visible tilt labelled as ours? |
| E3 | **Does the quote callout survive?** No home in your best post, and it had to be bent (gaining a card) to exist. |
| E4 | **Prev/next fit** — 345px fixed, or the source's 50% flex at 767? |
| E5 | **Trophy wall** — needs the design conversation before anything can be built. |
| E6 | **Top bar / motion control** — where does the single control live? |
| E7 | **`button-kit` shapes** — want me to fetch stephanewillems' live CSS and close its last circular citation? |

---

## F. KNOWN DEBT, carried and not forgotten

- **No `prefers-reduced-motion` path anywhere in the scene**, though D21 requires one. The paper
  boil runs 3.25/sec behind body text on every post.
- **No WebGL-absent fallback.**
- **Nothing re-profiled since UnrealBloomPass was removed** — every ms figure in D23 describes a pass
  that no longer exists.
- **The Shadertoy URL is still owed** for the paper filter's ledger row.
- **`element-tracker.md` rows are stale** for the related card (`:146` still says Slop) and `:78`
  describes a different card entirely.
- **Green tape** has no external reference. Origin ROD, which is legitimate — recorded, not a gap.
