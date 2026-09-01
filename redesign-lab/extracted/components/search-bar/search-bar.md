# search-bar

Built 2026-08-23. Three files, no JS.

- `search-bar.css` - the box plus two caret versions
- `search-bar.html` - demo on the dark ground, every version at every measured reservation, each
  reservation drawn as a dashed outline and each fit printed as a live `getBoundingClientRect`
  readout rather than asserted
- `search-bar.md` - this

---

## Which spec I followed, and the reconciliation

**I followed the ledger's canonical spec, not the generic pill.** `element-tracker.md:107` records
it as Rod's: *"square, always-open, `//` prefix, blinking caret, real typeable input, NO
expand/animation (he rejected animated examples). Concept Rod's; re-source code. CARET now Remixed
(atelierbram border-caret ...) in rework-hana; box/prefix still Slop."*

The two clauses that read like a contradiction are not one. **"Blinking caret" and "no animation"
are about different objects**: the animation Rod rejected is the box that grows out of a magnifier
icon on click, and the blink is the thing he asked for by name in the same sentence. So the box
never moves and the caret blinks. Both clauses are honoured, neither is traded away.

**The ledger's "box/prefix still Slop" is now half stale, and it is the box half that moved.** That
line predates `decisions.css`, in which Rod names the search's shape himself:

> *"squares for tags on project cards, rectangles from the buttons for the search and post meta
> data."* - decisions.css:399-401

So the box is `.d-meta` **reused, not rebuilt**: radius 0, `1px solid var(--color-line-soft)`,
`var(--color-silver)`, `0.82rem`, weight 500, `1.5rem` horizontal padding, every value read off
decisions.css:426-435 rather than re-picked. The `//` is still Rod's own idea, which is an
**origin**, not a gap.

---

## One citation I checked, and it came back negative

decisions.css:413 says of that padding: *"the sole inherited value here is padding 0.7rem 1.5rem.
Checking stephanewillems' live CSS would close even that."*

I fetched it: `https://stephanewillems.be/assets/index-fc98faf9.css`, 22,087 bytes, 2026-08-23.
It is a Tailwind build. **There is no `padding: 0.7rem 1.5rem` in it and no utility that produces
one** - the nearest pairs are `.px-5`/`.py-2.5` (1.25rem / 0.625rem) and `.px-8`/`.py-2`
(2rem / 0.5rem). That padding is **ours**. It is used here because Rod locked it, and the fact that
its hoped-for parent does not exist is reported rather than left to be discovered later.

## The gallery has almost no search bar, and that is a finding

Ten gallery sites were fetched and grepped for a text input (shadertoy/browse, dimden.dev/blog,
readsomethingwonderful, unit.software, insilicoterminal, n-o-d-e, melonking, catlikecoding,
cyanilux, minionsart). **Zero.** The only real search field in the 87-site gallery is
ronja-tutorials.com:

```html
<input id="SearchField" class="mb1" type="text" oninput="filterPosts(this.value)" />
```

and grepping **both** of its stylesheets - `/css/main.css` (298 bytes) and
`/dist/css/app.d876a0cc99d23e9edadbac7fc6abde13.css` (134,426 bytes) - returns zero rules matching
`#SearchField` or any bare `input` selector. Their box is a browser default carrying one margin
class. So the gallery supplies the **behaviour** and supplies **nothing at all** for the look,
which is exactly why both carets below come from the two already-verified caret notes instead of
from a fresh site. The live site's own `.search-wrapper` (`_sass/pages/_projects.scss:47`) is no
help either: it is `backdrop-filter: blur()` plus `$radius-lg`, both of which are being stripped.

---

## VERSION A - bar caret

**Tier: Remixed.** **Idea-origin:** theirs (atelierbram) for the caret; **Rod** for the `//`, the
square and the no-animation rule; **ours** (house decision) for the box.

**Source:** `sources/atelierbram-border-caret.md` -> https://codepen.io/atelierbram/pen/abrbyQ.
CodePen is Cloudflare-blocked to an agent; the note carries the CSS verbatim as Rod pasted it, and
it is the note that was built from. Flagged, not hidden: this one source could not be re-verified
live today the way ronja's and stephanewillems' were.

**Verbatim:** the mechanic (the caret is a *border on the text element*, not an element), the
keyframe shape `from,to { transparent } 50% { colour }`, and the `1s infinite` timing.

**Ours, each a deliberate change:**
- `border-right` -> `border-left`. Theirs trails a shrink-wrapped typewriter line; ours leads a
  full-width field, where a right border renders at the far edge of a 400px box and reads as a box
  edge rather than a caret.
- `#000` -> the gold token.
- the keyframe toggles `border-left-color` specifically, since only that border exists.
- the decorative caret yields on `:focus-within` or `:not(:placeholder-shown)`, so the native gold
  `caret-color` is the only caret once the field is live and there are never two.

**Could not transfer:** their entire `typing` width animation, its `steps(25, end)`, and the 5s
delay that only existed to wait for the typewriter to finish - this is a real typeable input, and
Rod rejected animated search boxes. Their `white-space:nowrap; overflow:hidden; display:inline-block`
go with it (they exist to make the width animation work) and so does their `font-style:italic`.

---

## VERSION B - underscore caret

**Tier: Remixed.** **Idea-origin:** theirs (109ichiki) for the caret; **Rod** and **ours** as above.

**Source:** `sources/109ichiki-caret.md` -> https://109ichiki.com, captured from the live page.

**Verbatim:** the keyframe block and the full animation shorthand
`1s step-start 0s infinite normal none <name>`, renamed off their hashed CSS-Modules class
(`_cursor_1ppyp_1`) exactly as their own note instructs. The blink is a hard snap, no fade - that
is the `step-start`, and it is what makes this read as a terminal rather than a pulse.

**Ours:**
- it hangs off the `//` prefix rather than an `<h1>`, because `::after` cannot be applied to an
  `<input>` at all - an input is a replaced element and has no pseudo children. Their own host is a
  heading for the same structural reason, so this is the same move, not a workaround.
- theirs never hides. Ours does once the field is live, or you get `// _Compute Grass`. `:has()` is
  doing that, because the prefix is an *earlier* sibling than the input and no sibling combinator
  reaches backwards.

**Could not transfer:** their `text-transform:uppercase` host, and their `opacity:0` +
Framer-Motion JS reveal - the heading fades in under JS and the blink is independent of it. We have
no reveal to be independent of.

---

## Why two versions and not three

The box, the sigil, the square, the "always open" and the "no expand animation" are all **settled**
- three of them by Rod directly and one by the D20 shape pass. The only thing genuinely still open
for this component is **which caret**, so the two versions are the same box and differ in nothing
else, and each caret comes from a different verified external source.

A third was considered and rejected rather than padded in: a **bottom-rule-only** field exists in
the blockout (`projects-blockout.html:160`, the tuyu/`reel` variant, `border-bottom:1px solid`).
Building it would contradict a locked decision (Rod named the button *rectangle* as the search's
shape) and that variant was rejected for projects anyway. Making layout alternatives is not mine to
do - D25 puts layout authority with Rod.

## What is reused, and what was deliberately not

`extracted/components/list-controls/` already contains a search field with the same atelierbram
caret. It is **not** reused wholesale, for four measurable reasons:

1. its own header (`list-controls.css:1-9`) declares it circular-citation Slop
2. `border-radius: 10px` - the shape pass squares this
3. `color: var(--color-muted)` - `#9aa3bd`, **the blue the palette law rules out**
4. `max-width: 340px` with `0.7rem 1rem` padding - it cannot become 400x34 or 1351x40

What **is** carried across is its genuinely sourced part: the border-caret and the finding that the
decorative caret must yield once the field is live. One thing is improved rather than copied -
list-controls sets a `.has-text` class from JS to do that, and `:not(:placeholder-shown)` does it in
CSS, so this component ships **zero JavaScript**.

No focus rule is written either: `extracted/styles/generic.css:25` already defines the house
`:focus-visible` ring (transparent outline for High Contrast Mode + gold ring + ember bloom) and the
field inherits it. A second copy could only drift.

## Reduced motion

Both carets stop; **neither disappears**. A caret that vanishes is worse than one that does not
blink, because the prompt is the affordance. Verified under emulated
`prefers-reduced-motion: reduce`: version A resting border is `1px rgb(251,191,36)` with
`animation-name: none`; version B's `::after` is `"_"` at `opacity: 1` with `animation-name: none`.

---

## FIT - measured, not asserted

Headless Chrome at **1440 x 1080**, page served over HTTP, `getBoundingClientRect()` on both the
reservation and the component. **All eight instances fit exactly - delta 0.00 x 0.00, and
`scrollWidth - clientWidth` / `scrollHeight - clientHeight` are both 0, so nothing is clipped
either.**

| reservation | source of the number | component measured | delta |
|---|---|---|---|
| 400 x 34 | contract line 29 / final-projects.html:105 / projects-blockout.html:69 | 400.00 x 34.00 | 0.00 x 0.00 |
| 1351 x 40 | contract line 48 | 1351.00 x 40.00 | 0.00 x 0.00 |
| 360 x 40 | ramblings-blockout.html:166 / final-ramblings.html:167 | 360.00 x 40.00 | 0.00 x 0.00 |

Confirmed alongside: `border-radius: 0px`, `border-top: 1px rgba(255,255,255,0.1)`,
`padding-left/right: 24px`, `font: "IBM Plex Mono" 13.12px 500`.

The fit is exact **by construction, not by luck**: the height is an explicit
`height: var(--sb-h)` with `box-sizing: border-box`, not a padding-derived height. `.d-meta`
reaches its height through `0.7rem` vertical padding, which lands wherever the font metrics land;
the reservations are measured pixel heights and have to be hit on the nose. The horizontal `1.5rem`
is kept verbatim. Width is `100%`, which is how one component serves a 400px slot and a 1351px slot
without a second build.

Interior measurements, for the record: the typeable field is **326.25 x 22.31** at 400x34 (version
A; 318.38 in version B, where the `_` widens the prefix from 15.75 to 23.63), **1277.25** at
1351x40, and **286.25** at 360x40.

---

## THE CONTRACT PROBLEM I HIT - ramblings is measured off the REJECTED variant

The 1351 x 40 I was handed is real, but it is **not the approved page**.

- `ramblings-blockout.html:252` defaults to `rulelog` (dimden). Its search is `b('100%', 40, ...)`
  - full width, so 1351 at viewport 1440. **That is what the contract measured.**
- **D15 picked Eve, the `hairline` variant.** Its search is `ramblings-blockout.html:166`:
  `b('360px', 40, ...)` inside a `justify-content: flex-end` row.
- `final-ramblings.html:167` agrees with the hairline variant, not with 1351:
  `min-height:40px; width:360px`, and its own note calls the search a declared deviation whose
  geometry is the live site's `#post-search`.

**The height agrees in both (40). Only the width disagrees, and width here is layout, so it is
Rod's call and not mine.** The component is width-fluid and fits both, which is why both are drawn
in the demo instead of one being quietly picked.

---

## OPEN QUESTIONS FOR ROD

1. **The `0.7rem 1.5rem` padding is not stephanewillems'.** I fetched their live CSS; it is
   Tailwind and has no such value. The padding is ours. Keep it (it is what he locked in
   decisions.css) or re-pick it against something real?
2. **Projects: is "200 x 34 inner" a reservation or a stale label?** `projects-blockout.html:234`
   prints the string `SEARCH - 200x34 inner`, but the blockout's own `box()` helper renders that
   div at 100% of the 400px parent - so the blockout does not itself draw a 200px inner. Right now
   the field fills the box (326.25px wide). It is drawn dotted in the demo so the gap is visible.
3. **Ramblings: 1351 or 360?** See the section above. The contract measured the rejected variant.
4. **The field takes `--font-mono`, not `.d-meta`'s `--font-body`.** Reason: `//` is a code sigil
   and both caret parents are monospace terminal type (atelierbram:
   `"Consolas","Menlo","Monaco","Courier New",monospace`; 109ichiki: their IBM face). This is a
   real departure from a locked rule and it reverts by changing one token, `--sb-face`.
5. **The house focus ring lands on the input, which sits 24px in from the box edge**, so the gold
   ring draws inside the rectangle rather than around it. No extra CSS was added to change that
   (D5). If he wants the ring on the box it is one rule.
6. **Placeholder wording is mine** (`search projects` / `search posts`). Ronja's field has no
   placeholder at all, so nothing was copied and nothing is claimed. Rod's words would be better.
