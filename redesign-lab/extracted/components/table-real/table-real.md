# table-real — provenance

Built 2026-08-23. **Brief:** [`analysis/reference-briefs/table.md`](../../../analysis/reference-briefs/table.md)
— all four live files re-verified byte-exact.

**Tier: Remixed.** Idea-origin **theirs** for both halves and for the pairing. The only Claude-side
content is the palette substitution and the squaring, both law-mandated rather than invented.

---

## Three corrections to the stated treatment

1. **The iq table is not in the global stylesheet.** `iq-style.css` has **zero** bare
   `table`/`th`/`td`/`tr` rules. What styles their table is a page-local `<style>` in
   `article-smin.html`. **The "minimal body" is literally one declaration plus the absence of
   everything else.** There is no more to find.
2. **There is no bare `th` rule on acegikmo.** The real selector is `.feature-table th`. The
   earlier citation was wrong and is corrected.
3. **iquilezles has no `<th>` anywhere.** Their "header row" is the first `<tr>` of plain `<td>`
   with an empty corner cell, carrying **no styling at all**. So the header row is **not a blend** —
   it is entirely the acegikmo half.

---

## Which half is whose

| | parent |
|---|---|
| No borders, zebra, background, rules or radius on the body | **iquilezles, by absence** |
| `padding-right: 1rem` as the only column separation | iquilezles, verbatim |
| Row height from `line-height` alone, no authored vertical padding | iquilezles |
| `overflow-x: auto` wrapper | iquilezles, verbatim |
| Scrollbar chrome 8px, track = ground, mid-grey thumb | iquilezles, verbatim |
| A header row existing at all, in the page accent | **acegikmo** |
| `font-weight: 100` and `padding-left/right: 4px` on header cells | acegikmo, verbatim |
| `#fbbf24` instead of `#ff1155`, and every radius squared | **ours** (law-mandated) |

---

## The three versions

| | what differs |
|---|---|
| **V1** | The decided treatment exactly as specified. Keeps the **literal** `font-weight:100`. |
| **V2** | Keeps the **effect** instead of the literal, and **makes the scroll actually work**. |
| **V3** | acegikmo's **other** table — the hairline row, 126 uses, which the source note missed. |

---

## Four traps the brief caught

**1. `font-weight:100` is visually inert on the source site.** acegikmo loads exactly one
`@font-face` — `Renogare-Regular.otf`, single weight, no weight descriptor. **No browser
synthesises thin**, so on their live page `100` renders at *regular*, and its only real effect is
cancelling the UA default `th{font-weight:bold}`. **That de-bolding is the transferable effect.**
Our stack has real light weights, so copying the literal `100` gives a **thinner header than
acegikmo actually shows**. V1 keeps the literal, V2 keeps the effect. *Do not assume the number is
the look.*

**2. `th` alignment splits from `td` by default.** acegikmo gets centred headers from
`text-align:center` on `.feature-table`, **not** from the `th` rule; iq's page is left-aligned. Take
the `th` rule without a table-level alignment and you get centred headers over left cells, which
reads as a bug. Declared explicitly.

**3. No `border-collapse` is declared on either site.** Both inherit the UA default. Writing
`collapse` would be a **departure from both parents**, not a copy — so it is deliberately not
written.

**4. The `overflow-x:auto` wrapper alone will not scroll.** Default table layout is `auto`, so a
too-wide table **wraps its text to fit** rather than overflowing. iq gets away with the bare wrapper
because their cells are single words. At our 767px measure with real content **it would never
fire.**

The honest fix and its sourcing: iq's own **code block** pairs `overflow:auto` with
`white-space:pre`, which is precisely why *that* one scrolls. Same site, same escape hatch,
different component — a **cross-component remix within one parent**, labelled as such rather than
passed off as iq's table.

---

## Cannot transfer

- iq `.no{color:#ff6060}` is **red**, banned — and it is the pair-mate of `.ye{color:#40e040}`, so
  **the whole two-colour yes/no device dies with it.** The iq half arrives as body geometry only.
- acegikmo `td.on/.off/.na/.depends` — four colours, two illegal (red, and `#ccc` from the banned
  cool-neutral family), and **all four are solid background fills**, exactly what competes with the
  scene.
- `.feature-table`'s border + padding + radius draws a box. The iq half deliberately has none and
  **the two parents contradict here**; the treatment picked iq for the body, so the border goes.
- Every acegikmo colour is tuned for a **white page**. Only structure transfers from that half.

---

## The thing the source note missed

The note recorded `.feature-table` as the site's table, **1 use**. The live page has **19 tables**,
and the dominant pattern is `<table class="shape-prop-line">` at **126 uses** — one declaration:

```css
.shape-prop-line { border-bottom: solid 1px #efefef; }
```

A two-column name/description row with a single hairline under it. **Offered as V3** because it is
real, heavily exercised, sits inside the already-approved source site (so not a substitution), and
**a single hairline survives the dark ground and the live scene far better than tinted pill cells
would.**

## Open for Rod

1. **Which version** — and note V1 will render a *thinner* header than the source actually shows.
2. **V3 is a genuine alternative** if the header-row-only version reads too bare. It is the pattern
   that site actually uses 126 times.
