# related-card-real — provenance

Built 2026-08-23. **Brief:** [`analysis/reference-briefs/related-post-card.md`](../../../analysis/reference-briefs/related-post-card.md)

**Tier: OURS. Idea-origin: ROD.** Not "Remixed", not "True" — there is no external parent.
Rod, 2026-08-22: *"we made the project cards together so its ok."* The child inherits a Rod-owned
taste call, not a reference.

---

## The correction — the spec I gave Rod was wrong

I told him "no glass, motion or glow" measures as **exactly three deletions**. I wrote that from a
grep. The reference pass read the **cascade**, and all three parts are wrong:

**(a) Deleting the hover rule *adds* glow.** `project-cards-expensive.css:209-213` is a
**suppressor** — its own comment says *"keep the card's own static cover hover-glow out of the
way"*. It overrides `merged-card.css`'s hover, which carries a **24px gold bloom and a 0.45 gold
border**. Both selectors are specificity `0,4,0`, and the suppressor loads second in all six host
pages, so it wins on source order. **Delete it and the card gains the bloom** — the exact opposite
of the instruction.

**(b) `translateY` is not a band reveal.** It is the Studio Gohan staggered-grid zig-zag: a
**static offset with no transition and no motion**, one instance inside a `max-width:760px` block.
Removing it is a **layout change**, and it only applies if `.is-staggered` is on the grid — which a
3-up related row would not have.

**(c) The three deletions remove neither the glass nor the motion.** Still live afterwards:
`.glass-plane` with its sheen and gold left border; the cursor-tracked masked glow rings using
`mix-blend-mode: plus-lighter` plus a 180px spill; and **six CSS transitions** plus the rAF tilt and
gyro in `merged-card.js`. Deleting `blur(2.5px)` only makes the glow ring **hard-edged** — which the
parent's own comment calls the *"reads as a metal band"* failure that blur was added to fix.

**So this component is built standalone, not as a diff.** Subtracting three rules from a file with
six transitions and two glow systems does not produce a motionless card. Corrected in
`decisions.css` and `COMPONENT-TABLE.md`.

---

## The dead citation

The parent's one external claim was `yannesidibe.com/about .glow`. **Fetched this session:**

| | |
|---|---|
| `/about` | **HTTP 404** — the page is gone |
| root | 200, now Tailwind/Next |
| `grep glow` · `mask-composite` · `plus-lighter` · `--mx/--my` | **0 hits each** |

**Live site wins: the citation is dead, not merely unread.** Do not restate yannesidibe, merodev,
or the unnamed CodePen (which `REQUESTS.md:104` records as returning 403 to this repo) as
provenance.

---

## The three versions

| | what survives |
|---|---|
| **V1** | Text only — no cover, no gradient. Quietest, cheapest to maintain. |
| **V2** | The cover gradient and its bottom seating scrim, because they are the card's visual identity. Glass, glow and motion do not. |
| **V3** | **Not a card** — a hairline row. If V1 is still too much furniture, this is the floor. |

**Motionless is achieved by not writing motion**, not by deleting it later. No transition,
transform, filter or backdrop-filter is authored anywhere. *No `prefers-reduced-motion` block is
needed, and its absence is deliberate rather than forgotten* — worth noting the parent's CSS
transitions had **no** reduced-motion path at all; only its JS tilt was gated.

---

## The blue problem, which decides V2

The parent's cover fill is `--color-cover-hi #1b2452` / `--color-cover-lo #0b1024` — both **midnight
blue** — plus a `rgba(11,16,36,.62)` seating gradient. These are among **the last blue fills left in
the bench**, and D27 already replaced blue with warm grey on every other surface. Building on them
would re-import a dead palette, so V2 uses the warm tokens. **The swap is stated rather than quiet.**

---

## Focus — real external provenance, and it fixes a bug that exists today

**Source:** `sources/focus-ring.md` (Bootstrap 5.3; dev.to hybrid_alex; darekkay). Tier Remixed,
origin theirs.

There is **no `:focus` or `:focus-visible` anywhere** in `merged-card.css`,
`project-cards-expensive.css` or `foundations.css`, and the card is a full-card `<a>`. **That is a
WCAG 2.4.7 failure today**, before any deletion — stripping hover only makes it more visible.

`outline: 2px solid transparent` is the source's non-negotiable base and is **not decoration**: it
survives Windows High Contrast Mode, where box-shadows are dropped. That is why the rule is not
`outline: none`.

Their Option B is a **glow** and is out on Rod's instruction. The border-colour change costs no
motion and no glow, and it is measurable: rest is `rgba(245,158,11,0.14)`, so moving to `#fbbf24`
clears the 3:1 non-text bar comfortably. **One rule, three declarations, zero motion.**

---

## Two things not carried forward

- **`min-height: 14rem`** on the parent's `.post-card` is a flip-tile leftover that **fights
  `aspect-ratio`** — and scaling is Rod's one named open complaint about the parent. Not inherited.
- **Square from the start**, rather than relying on the parent's `--square` modifier placed last in
  the file to out-cascade a 1rem radius. A host could forget the class.

## Ledger corrections owed

`element-tracker.md:146` still reads *"Related posts cards | Slop | theirs? | — | follows
Project-cards direction"*, and `:78` describes a **different card entirely** (hana panel +
john_r_muir ignite). Both rows need correcting to match Rod's 2026-08-22 withdrawal.

---

# Appendix: reasoning moved out of the stylesheet, 2026-08-25

Moved from `_sass/components/_related-card-real.scss` under D45 (comments get short). Original
wording, kept because it is the provenance record. The stylesheet points here.

## Header

> related-card-real - the project card, stripped for reading focus.
> Built 2026-08-23 from analysis/reference-briefs/related-post-card.md.
>
> TIER: OURS. IDEA-ORIGIN: ROD. Not "Remixed", not "True" - there is no external parent.
> Rod, docs/REQUESTS.md:41, 2026-08-22: "we made the project cards together so its ok biggest
> issue with them over anything else is scaling." Objection withdrawn; the child inherits a
> Rod-owned taste call, not a reference.
>
> DO NOT RESTATE yannesidibe, merodev, or the unnamed CodePen as provenance.

## The correction: the "three deletions" treatment does not do what it says

> I wrote that spec from a grep. The reference pass read the CASCADE and it is wrong.
>
> (a) DELETING THE HOVER RULE **ADDS** GLOW. `project-cards-expensive.css:209-213` is a
>     SUPPRESSOR - its own comment says "keep the card's own static cover hover-glow out of
>     the way". It overrides merged-card.css's hover, which carries a 24px gold bloom and a
>     0.45 gold border. Both selectors are specificity 0,4,0 and the suppressor loads second
>     in all six host pages, so it wins on source order. Delete it and the card GAINS the
>     bloom - the exact opposite of "no glow".
>
> (b) `translateY` IS NOT A BAND REVEAL. It is the Studio Gohan staggered-grid zig-zag: a
>     STATIC offset with no transition and no motion, and one of the two is inside a
>     max-width:760px block. Removing it is a LAYOUT change, and it only applies at all if
>     `.is-staggered` is on the grid - which a 3-up related row would not have.
>
> (c) THE THREE DELETIONS REMOVE NEITHER THE GLASS NOR THE MOTION. Still live after all
>     three: `.glass-plane` with its sheen and gold left border; the cursor-tracked masked
>     glow rings using mix-blend-mode:plus-lighter plus a 180px spill; and six transitions
>     (.card-tilt .4s, .z-layer .5s, .card-flipper .6s + rotateY dwell-flip, img scale,
>     title colour) plus the rAF tilt and gyro in merged-card.js.
>     Deleting `blur(2.5px)` only makes the glow ring HARD-EDGED - which the parent file's
>     own comment says is the "reads as a metal band" failure that blur was added to fix.

> SO THIS COMPONENT IS BUILT STANDALONE rather than as a diff against the parent. That is the
> only honest way to get "motionless" - subtracting three rules from a file with six transitions,
> two glow systems and a JS tilt does not produce a motionless card.

## The dead citation

> recorded so it is not restated. The parent's one external claim was
> yannesidibe.com/about `.glow`. Fetched this session:
>   /about -> HTTP 404 (the page is gone). Root -> 200, Tailwind/Next.
>   grep glow 0 - mask-composite 0 - plus-lighter 0 - --mx/--my/--mouse/--cursor 0
> Nothing on the live site matches. LIVE SITE WINS: the citation is DEAD, not merely unread.

## The grid and the card

> the grid. From `.epx-cards.is-regular`, 3-up for related (P9).
> `min-height: 14rem` from the parent is a flip-tile leftover that FIGHTS aspect-ratio, and
> scaling is Rod's one named open complaint about the parent - so it is deliberately not
> carried forward.

> the card. Square from the start rather than relying on a modifier a host might forget:
> the parent's base is border-radius 1rem on the cover and 12px on the glass plane, with a
> `--square` modifier placed last in the file to out-cascade them. Building square avoids that.

> NO transition, NO transform, NO filter, NO backdrop-filter, NO glass plane, NO glow ring.
> Rod: "keep them pretty motionless we dont want stuff interrupting their ability to focus
> on the text." Motionless is achieved by not writing motion, not by deleting it later.

## The two-line title clamp

> TITLE CLAMPED TO TWO LINES. Rod 2026-08-24: "the boxes should always be the same size bigger
> titles make it larger sometimes causing an uneven look."
> TWO causes, and fixing only one leaves it wrong either way. `.rc-grid` carried
> `align-items: start`, which in a grid sizes every item to its OWN content - the default
> `stretch` equalises a row for free, so that override was the thing preventing uniformity.
> But equalising alone just moves the problem: the tallest card still sets the row, so a
> three-line title would stretch all three boxes. The clamp caps what any one card can demand.

`.rc__meta` sits at the T3-E floor of 0.7rem, taken from the parent.

## Focus - the one part with real external provenance

> and it fixes a bug that exists TODAY.
>
> SOURCE: sources/focus-ring.md (Bootstrap 5.3 focus-ring helper; dev.to hybrid_alex "Better CSS
> outlines with box-shadows"; darekkay). TIER: Remixed, idea-origin theirs.
>
> There is NO :focus or :focus-visible anywhere in merged-card.css, project-cards-expensive.css
> or foundations.css. The card is a full-card <a>. THAT IS A WCAG 2.4.7 FAILURE TODAY, before any
> deletion - stripping hover only makes it more visible.
>
> `outline: 2px solid transparent` is the source's non-negotiable base and is NOT decoration: it
> survives Windows High Contrast Mode, where box-shadows are dropped. It is why the rule is not
> `outline: none`.
>
> Their Option B is a GLOW and is out here on Rod's instruction. The border-colour change costs
> no motion and no glow, and it is measurable: rest is rgba(245,158,11,0.14), so moving to
> --color-gold #fbbf24 is a large delta against the fill and clears the 3:1 non-text bar
> comfortably. One rule, three declarations, zero motion.

> HOVER IS FULL GOLD, AND FOCUS IS SPLIT OFF FROM IT ON PURPOSE.
> A tone-down to 0.55 alpha was made 2026-08-24 and then WITHDRAWN by Rod the same day:
> "related card glow is ok remove that from the agent list". Reverted to the full
> `--color-gold`; measured resting alpha is 0.14, so hover is still a clear step up.
> THE FOCUS SPLIT IS KEPT from that same change, because it is not a taste call: an
> independent `:focus-visible` means keyboard focus cannot be weakened by a future hover
> retune, and it keeps the transparent outline that survives Windows High Contrast Mode.

## Why `.rc::after { content: none }` exists

> THE SECOND HALF OF THE LIGHT-UP, AND IT WAS NEVER THIS COMPONENT'S.
> The card is an <a> and it sits inside .prose, so decisions.css `.prose a::after` was landing
> on it: a 2px rgb(245,158,11) bar at bottom:-1px growing 0 -> 243px over 0.25s across the
> entire card. That rule is the inline-link underline-grow, written for a run of TEXT, and a
> 245x257 tile is not that.
> Answered HERE rather than with an exception in the ladder: components beats prose in the layer
> order, so the component states its own value and decisions.css keeps one unconditional rule
> for text links. No :not(), no page-local override. The bar is absolutely positioned, so
> switching it off moves no layout.

## The three versions

> THE BLUE PROBLEM, which decides V2. The parent's cover fill is
> --color-cover-hi #1b2452 / --color-cover-lo #0b1024, both MIDNIGHT BLUE, plus a
> rgba(11,16,36,.62) seating gradient. Those are among the LAST BLUE FILLS LEFT IN THE BENCH,
> and D27 already replaced blue with warm grey on every other surface. Building the new component
> on them would re-import a dead palette - so V2 uses the warm tokens and the swap is stated.

> V1 - TEXT ONLY. No cover, no image, no gradient. The quietest possible answer to "focus on the
> text", and the cheapest to maintain.

> V2 - COVER KEPT, everything else gone. The parent's cover gradient and its bottom seating
> scrim survive because they are the card's visual identity; the glass, glow and motion do not.
> Cover tokens swapped blue -> warm per D27.
>
> PICKED 2026-08-23, with a colour correction. Rod: "related post should be V2 the colors
> however seem off."
> THE CAUSE, and it was mine: the gradient ran --color-panel-solid toward BLACK, so both stops
> sat below the night ground's own lightness and the card read as a muddy hole rather than a
> warm surface. The parent's gradient runs LIGHT to DARK across a visible range; mixing toward
> black collapses that range to almost nothing.
> Corrected to run from a LIFT of the panel down to the panel itself, which keeps the parent's
> light-to-dark direction and stays warm. Same two-stop structure, same 160deg.

The scrim's 62% height is the parent's number, verbatim, and the scrim itself was never the
problem - the muddiness was the cover beneath it.

> V3 - NOT A CARD. A hairline row, closer to the ramblings entry rows than to a project card.
> OURS. Offered because "focus on the text" argues for the lightest possible container, and a
> related-posts list is end matter rather than a showcase. If V1 still reads as too much
> furniture, this is the floor.

## Reduced motion

> No prefers-reduced-motion block is needed: this component authors no transition, transform or
> animation at all. Stated so the absence reads as deliberate rather than forgotten.
> (The parent's CSS transitions had NO reduced-motion path - only its JS tilt was gated.)
