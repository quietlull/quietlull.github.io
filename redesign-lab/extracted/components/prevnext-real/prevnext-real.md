# prevnext-real — provenance

Built 2026-08-23. **Brief:** [`analysis/reference-briefs/brief.md`](../../../analysis/reference-briefs/brief.md)

**Premise:** the stated source is `analysis/component-sources/source-prev-next.md`, which is **inside
this repo** and is therefore a **claim, not provenance**. The live site was fetched to verify it —
`therealmjp.github.io`'s stylesheet (17,512 chars) matches the note **character for character**. The
claim holds, but it was *checked* rather than trusted.

**"No box" is real absence evidence, not a summary.** Every rule whose selector mentions
`post-nav`, `next-post` or `prev-post` was regexed: **exactly five, and none sets `border`,
`background`, `box-shadow` or `border-radius`.** That is why it works over a live scene.

**Tier: Remixed.** The geometry, kicker recipe, boxlessness and Newer/Older labelling are **theirs**
and verified live — that half is True. **One change makes the whole thing Remixed** and is logged as
ours: replacing their `<br>` stack with a flex column + gap. Same geometry, but it **survives long
titles**, which theirs does not.

---

## The note's blind spot — and it would have shipped a broken component

The note says *"the rules contain zero colour, so it drops onto a night ground unchanged."* That is
true of the five `.post-nav` rules and **misleading about the component**.

`.post-nav` is a **sibling of `</article>`**, so it sits **outside `.content`** and picks up the
global anchor rules:

```css
a { color:#e8eef2; transition-property:color; transition-duration:.4s; ease-out }
a:hover { color:#fff; text-shadow:0 0 1px #fff }
```

**Building from the note alone ships this component with no hover state at all.**

Also inherited and easy to miss: `html { letter-spacing: .06em }`. **The uppercase kicker gets its
tracking free from that** and has no `letter-spacing` of its own. Our stack has no global tracking,
so it is declared explicitly — otherwise the kicker looks wrong.

---

## The three versions — the hover

This is the one place the source and the **de-glow principle** disagree, so it is drawn three ways
rather than picked.

| | |
|---|---|
| **V1** | Theirs, warmed — colour lift **plus** the 1px shadow, in gold. Closest to source; argues with de-glow. |
| **V2** | Colour lift only — their transition and colour change, shadow dropped. |
| **V3** | No transition at all — instant. Consistent with the motionless related cards. |

---

## A trap not copied

**Their class names are inverted:** `.next-post` is the **LEFT, newer** one — confirmed by its
`text-align:left`. Our class names say what they mean instead (`.pn__newer` / `.pn__older`).

---

## Two gaps in the source, filled as ours

**No focus style.** Grepped the whole stylesheet: the only `:focus` rules are
`.screen-reader-text:focus` and `.content a.anchor:focus svg`. **There is no `:focus-visible` for
these links** — under WCAG 2.2 AA that is a defect in the source.

**But nothing is declared here.** A global focus ring already exists at
`extracted/styles/generic.css:25`, sourced in `sources/focus-ring.md`. **The component inherits it
and declares nothing** — re-declaring would be duplicate code for no gain (anti-bloat, D5).

**Reduced motion does not cover this.** Their `@media (prefers-reduced-motion)` block targets only
`.animated`, so their 0.4s link transition **runs regardless**. V1 and V2 get their own path, and
that path is ours.

---

## Cannot transfer

- `#e8eef2` is a **cool-tinted** near-white → `--color-text`.
- `a:hover{text-shadow:0 0 1px #fff}` is a **white glow** — transfers as geometry, but the glow is a
  taste call against the de-glow principle. **Flagged, not assumed.**
- **`#018574` teal must not follow the component.** It appears in `.content a`, `.post-info a:hover`
  and `#TableOfContents a:hover`. Because `.post-nav` sits *outside* `.content` it never touches
  this component — **the risk is grabbing the wrong anchor rule.**

## Arrows

Their feather SVGs are **not carried**. Whatever replaces them needs **its own source**. Typed ASCII
chevrons have a real precedent in **Book of Shaders** (`< <` / `> >`, verified in the same note) and
are a cheap hand-made tell — that is what the demo uses. Anything hand-drawn would be **unsourced
and Slop until cited.**
