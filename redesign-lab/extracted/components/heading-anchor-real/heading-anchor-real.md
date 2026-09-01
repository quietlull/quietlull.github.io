# heading-anchor-real — provenance

Built 2026-08-23. **Brief:** [`analysis/reference-briefs/heading-anchor-maxime-heckel.md`](../../../analysis/reference-briefs/heading-anchor-maxime-heckel.md)

**Premise: confirmed byte-for-byte.** The four rules appear at byte offset 25555 of the live
stylesheet, **in one contiguous run, in exactly the claimed order, with exactly the claimed
declarations** — same build hash the note recorded. No discrepancy.

**Tier: True** for the mechanism — geometry, transition, timing and structure all lift verbatim.
**Idea-origin: theirs.** The departures below are **corrections forced by our palette and our nav
bar**, not new design.

---

## Three defects in my `decisions.css` port that this corrects

**(a) `scroll-margin-top: 6.6rem` is calibrated to *their* nav and breaks on ours.**

| our bar | full height | 6.6rem leaves |
|---|---|---|
| ≥781px | 96px | +9.6px — correct |
| ≤780px | 107.6px | **−2px — the heading tucks under the bar** |
| ≤560px | 123.6px | **−18px — the heading is covered** |

Our bar really is sticky (`final-post.html:175`), so **the failure is real, not theoretical.**
Derived instead — already the house pattern for this exact problem. At desktop the derivation
evaluates to 105.6px, **reproducing their 6.6rem exactly**, and it self-corrects at the two stacked
tiers.

**(b) Our own `.prose a` was silently overriding the anchor and adding chrome theirs never had.**

The anchor is an `<a>` inside `.prose h2`, so it **is** a `.prose a` — specificity (0,1,1) against
`.d-anchor`'s (0,1,0), and later in the file. So the port was:

- killing the anchor's own `color` — it rendered `--color-text`, not the muted tone
- giving it a **gold hairline `border-bottom`** under the mark
- giving `:focus-visible` a **gold filled block** instead of their colour swap

Maxime's `--anchor-border-color: transparent !important` was **precisely the cancel for this** in
their own system. My port kept the half that was fighting nothing (`text-decoration:none`, which
`.prose a` already sets) and **dropped the half that mattered.** Fixed at winning specificity.
*A focus indicator should be chosen, not inherited by accident.*

**(c) `--color-muted-warm` was used and never defined** — fixed separately in `decisions.css`.

---

## Their own bug, not copied

`h4:hover .anchor-link { opacity: 1 }` reveals on h4, but their `scroll-margin-top` covers only
`h2, h3`. **So an h4 anchor on their site jumps under their own nav.** One heading set here, both
halves applied to it.

---

## The three versions — the mark

**Rod judged variant A and its demo used a plain `#`, not the chain SVG. So what he picked is the
*behaviour*; the glyph has never been decided.**

| | |
|---|---|
| **V1** | `#` — what he actually saw. Zero assets, zero sourcing debt. |
| **V2** | **Their chain-link SVG** — a True-tier external snippet. `stroke="currentColor"`, so it inherits the colour rules free. |
| **V3** | `#` **always visible** at 0.28 opacity — **ours.** |

**V3 exists for a real reason:** hover does not exist on touch, so **V1 and V2 are unreachable on a
phone.** That limit was accepted when the variant was picked, on the grounds that the TOC covers
mobile — but **if the TOC lands as the sticky rail only, this is the cheap fallback.** Costs a
permanent faint mark beside every heading.

---

## What is genuinely theirs

`opacity:0` at rest **with the element still occupying layout**, so the heading never reflows when
the mark appears; the reveal driven by hovering **the heading, not the mark**, so the hit area is
the whole heading; `transition: opacity .2s ease`; `margin-left: .33rem`; the
`inline-flex` / `align-items:center` / `vertical-align:middle` trio that seats an icon on a text
baseline; **`:focus-visible` as a co-equal reveal trigger**; and `scroll-margin-top` as the paired
half.

## Cannot transfer

Both their colour slots are blue-hued and blocked: `--text-tertiary` resolves to hue 262 — **the
`--color-muted` failure mode exactly** — and `--accent` is a saturated blue. Swapped to
`--color-silver` and `--color-gold`.

Their `--anchor-border-color: transparent !important` is a **Stitches-specific cancel for a selector
that does not exist here**, so its *purpose* is reproduced rather than the declaration.

Their `.anchor-icon` and `space-window-top` hooks have **zero CSS rules** in the live sheet — dead
hooks, not carried.
