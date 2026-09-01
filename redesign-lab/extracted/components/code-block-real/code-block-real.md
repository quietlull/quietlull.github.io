# code-block-real — provenance

Built 2026-08-23. **The chrome is decided** (D20: Maxime Heckel header strip, squared — Rod
re-confirmed 2026-08-23). **The three versions vary only the syntax scheme**, because that was the
open part.

**Brief:** [`analysis/reference-briefs/code-block--copy.md`](../../../analysis/reference-briefs/code-block--copy.md)

---

## Premise: confirmed, no drift

Every quoted declaration was re-diffed against the live article. **All 10 probes matched
byte-for-byte**, Stitches class hashes included, unchanged since the 2026-08-18 capture.

**But the saved note never recorded a single syntax colour** — which is exactly why this stayed
open. The schemes below were pulled live from each site's own stylesheet.

---

## The chrome — three things genuinely theirs

1. **The `--border` handshake.** The card sets `--border: 1px solid …` and uses it; the header
   strip reads that *same variable* back for its `border-bottom`. One variable, two consumers, so
   the divider can never drift from the frame. **Verified live: it holds.**
2. **The padding split** — the load-bearing bit. The `pre` has `padding: 8px 0`, **zero horizontal**;
   the 14px inset lives on each *line row*. That is the only reason a highlight wash and the 3px
   marker run true full-bleed. Put horizontal padding on the `pre` and the highlight stops short and
   looks broken. **Verified: `8px 0px` on the pre, `0px 14px` on the row.**
3. **The reserved marker.** `border-left: 3px solid transparent` is *always* present, so
   highlighting recolours instead of reflowing. **Verified: 3px, recolouring to gold.**

Plus the overflow veils — two opacity vars defaulting to `0`, so a non-scrolling block shows no
chrome and it degrades to nothing without JS.

**Not copied:** `backdrop-filter: var(--card-blur, none)`. `--card-blur` is **never assigned
anywhere** in their 72KB sheet, so it always resolves to `none` — dead code on their side, and the
glass tell being stripped site-wide. **Verified `none` on all three.**

**Ours, stated as ours:** the squaring, every colour, and the reduced-motion path. **Their sheet
has zero `prefers-reduced-motion` occurrences** — their copy button animates `transform 0.2s` with
`scale(1.1)`/`0.95` and no path at all. Authored here.

Squaring quietly fixes a real mismatch: their header asks for radius 8px while the card asks 12px,
invisible only because of `overflow:hidden`. At 0 it disappears.

---

## The three schemes

| | source | tier | origin | note |
|---|---|---|---|---|
| **V1** | **Rod's own** | n/a | **ROD** | Orange types, blue vars, green classes, pink functions. **"Same as VS Code" is explicitly not the citation** — his editor is on another theme. |
| **V2** | iquilezles.org | Remixed | theirs | Four tokens, hand-rolled, warm-neutral ground, **by a shader author**. Closest fit of anything sourced; only one hue is cool. |
| **V3** | catlikecoding.com | Remixed | theirs | **Strongest semantic match** — `.cg-function`, `.cg-macro`, `.directive` map onto real HLSL, not generic buckets. |

**One thing flagged rather than resolved in V1:** Rod assigned **green to classes**, and in most
editors green is the **comment** slot. Using it for both collides on the two most common tokens in
a shader, so comments take the warm grey until he says otherwise.

**Carried faithfully in V2:** their `.code` is `font-weight: bold` throughout. A specific choice,
not a neutral default — reproduced rather than quietly dropped.

---

## The carve-out, and why it is one

**No sourced dark scheme is palette-law clean.** Every real one spends a cool hue on keywords,
because that is what syntax highlighting has done for thirty years. So the cool-accent ban either
carves out `pre code` or no sourced scheme can be used at all.

The carve-out is **scoped to `pre code`**. These hues must never leak into UI, prose, links,
headings or chrome. Inline code stays on the warm text token (D31).

**Nothing was hue-rotated toward warm.** That would be inventing a scheme and citing a site that
does not use it.

---

## Rejected, recorded so nobody re-proposes them

- **Maxime's own scheme** — **five of seven tokens are the same blue hue**, and their comment token
  resolves to `#8795ad`, which is effectively Rod's **banned** `--color-muted #9aa3bd`. Taking their
  chrome does not oblige us to take their palette.
- **Book of Shaders** — flat `#ECECEC` panel, **no token colours at all**.
- **Ronja** — stock Hugo Chroma inline styles, light theme, and **visibly broken** on the fetched
  page: 23 spans of `color:#f00` — Chroma's error token failing to lex ShaderLab strings. Also red.
- **acegikmo** — stock highlight.js github theme, light, and credited in-file to Vasily Polovnyov,
  so it is not even their own design.

---

## The sample

Real HLSL from Rod's ComputeGrass post, chosen because it exercises **preprocessor, type, keyword,
intrinsic, number, comment, semantics (`SV_DispatchThreadID`) and swizzles**. A generic JS sample
would not have tested those — and V3 is the only scheme with a native class for shader macros; V1
and V2 borrow a bucket.

## Open for Rod

1. **Which scheme.**
2. **Line numbers** — their 45px gutter is theirs, but *whether we carry a gutter at all* is our
   call and Rod has not said. Drawn with one.
3. **V1's comment colour**, if green really should be comments rather than classes.
