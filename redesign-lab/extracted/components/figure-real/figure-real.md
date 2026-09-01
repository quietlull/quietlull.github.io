# figure-real — provenance

Built 2026-08-23. **Brief:** [`analysis/reference-briefs/figure--caption.md`](../../../analysis/reference-briefs/figure--caption.md)

**Premise: confirmed, zero discrepancy.** `tutorials.css` re-fetched live; the saved note matches
character for character.

**Tier: Remixed.** Six declarations transcribed verbatim, **one inverted** (`text-align`).
Idea-origin: **theirs** for the geometry and the italic-caption device, **ROD** for the left-align.
Not True, because the flipped declaration is load-bearing rather than cosmetic.

---

## The trap — and it would have caused a silent layout change

In their rule, `figure { text-align: center }` does **two jobs**: it centres the caption *and* the
image, because an `<img>` is inline-level so the block's `text-align` moves it. Their whole
"a 320px screenshot renders at 320px, centred in a 768px column" behaviour comes from that one
declaration.

**Flipping `text-align` on `figure` to satisfy "caption left-aligned" would have dragged every
image flush left too** — a layout change Rod did not ask for, arriving as a side effect.

Split instead: media centred explicitly (`display:block; margin-inline:auto`), `text-align:left` on
the **figcaption only**. Same rendered result as theirs for the image, Rod's result for the text.

---

## The three versions — how far the caption recedes

The brief turned up a finding that **contradicts what `decisions.css` currently ships**:

> catlikecoding has **no `.dark figcaption` and no `.dark figure` rule**. Their file has 20 `.dark`
> rules and not one touches figure. In dark mode the caption inherits body colour, identical to
> body text. **The caption is differentiated by typography alone, in both themes.**

Under our palette that argues for `--color-text` on the caption, **not** `--color-silver`.

| | caption | note |
|---|---|---|
| **V1** | body colour, italic only | **The faithful reading.** What the source actually does. |
| **V2** | silver | **What ships today** in `decisions.css`. Departs from the source — that departure is the point of showing it. |
| **V3** | silver + one size step down | **Ours.** The source has no third degree; this is an extrapolation and is labelled as one. |

---

## Palette law: not engaged

Worth stating plainly. Their `figure`, `figure img` and `figcaption` rules contain **zero colour
declarations** between them. Nothing to strip, no red or cool accent in play. No mat, no border and
no fill also means **no surface competing with the scene and no blur** — clean against the glass
tell by construction. Square is satisfied trivially: there is no border or radius in the source.

---

## Video has no source, and it is not optional

**Checked directly: no `video`, `iframe`, `picture` or `source` selector exists anywhere in
`tutorials.css`.** catlikecoding is images-only. Every line of video handling is **ours, Slop, zero
provenance from this source.**

And it has to exist: their entire anti-layout-shift premise rests on explicit intrinsic
`width`/`height` on every `<img>`. **Every in-post video in the corpus has neither** — they are all
`<video src="…" autoplay muted loop playsinline aria-label="…">`. Without an `aspect-ratio` the page
shifts on load.

**`16/9` is a default, not a measurement.** A real fix reads each clip's true ratio at build time.

---

## Four corpus facts that shaped this

1. **Zero captions exist today.** No `_caption_` lines, no `<figcaption>` anywhere. Caption text
   currently lives in `alt=` and in `aria-label=` — e.g. *"Using the zones to drive reveals, color
   changes and more!"*, which is a caption in disguise. **Whether captions get authored is a content
   decision for Rod**, not something the component can assume.
2. **Chirpy emits `<p><img></p>`, never `<figure>`.** So a `figure` selector matches nothing on the
   live site until the markup changes. Port-time concern (D22 defers it); the bench writes the
   figure markup by hand.
3. **46 images and 10 videos confirmed** — 44 markdown image lines, two of which carry two images.
4. **Two images share one line** in `SpriteBaker9000.md` at `width:64px` with
   `image-rendering:pixelated`, deliberately side by side. They live in a `<p>`, not a figure, so
   scoping to `figure img` / `figure video` **keeps that pair intact.** A bare `img { display:block }`
   would have broken it.

## Open for Rod

1. **Which caption degree** — V1 faithful, V2 as-shipping, V3 quietest.
2. **Do captions get written at all?** Right now the text lives in `alt`/`aria-label`.
3. **Real video aspect ratios**, if the 16/9 default is not good enough.

---

# Appendix: reasoning moved out of the stylesheet, 2026-08-25

Moved from `_sass/components/_figure-real.scss` under D45 (comments get short). Original wording,
kept because it is the provenance record. The stylesheet points here.

## Header

> figure-real - catlikecoding geometry, no mat, LEFT-aligned caption (Rod's change).
> Built 2026-08-23 from analysis/reference-briefs/figure--caption.md.
>
> PREMISE: CONFIRMED, ZERO DISCREPANCY. tutorials.css re-fetched live; the saved note matches
> character for character.
>
> TIER: Remixed. Six declarations transcribed verbatim, ONE inverted (text-align). Idea-origin:
> theirs for the geometry and the italic-caption device, ROD for the left-align. Not True, because
> the flipped declaration is load-bearing rather than cosmetic - see THE TRAP below.
>
> PALETTE LAW IS NOT ENGAGED. Their figure / figure img / figcaption rules contain ZERO colour
> declarations between them. Nothing to strip, no red or cool accent in play. No mat, no border,
> no fill also means no surface competing with the scene and no blur - clean against the glass
> tell by construction. Square is satisfied trivially: there is no border or radius in the source.

## THE TRAP - why the media is centred by its own rule

> In their rule, `figure { text-align: center }` does TWO jobs: it centres the CAPTION and
> it centres the IMAGE (an <img> is inline-level, so the block's text-align moves it).
> Their whole "a 320px screenshot renders at 320px, centred in a 768px column" behaviour
> comes from that one declaration.
>
> Rod asked for the caption left-aligned. Flipping text-align on `figure` would SILENTLY
> DRAG THE IMAGE FLUSH LEFT TOO - a layout change he did not ask for.
> So the two jobs are split: media is centred explicitly, and text-align:left goes on the
> figcaption ONLY. Same rendered result as theirs for the image, Rod's result for the text.

## Their geometry, verbatim

> display:block, margin 2em auto (the 2em IS the rhythm idea - double their 1em paragraph gap),
> padding 0, max-width 100%, height auto. Their caption ratio is 14px against 16px prose, so it
> is held as 0.875em rather than a pixel value - use the ratio, not the px.

## The video handling has no source and is marked Slop

> Checked directly: NO `video`, `iframe`, `picture` or `source` selector exists anywhere in
> tutorials.css. catlikecoding is images-only. Every line of video handling below is OURS with
> zero provenance from that site.
>
> AND IT IS NOT OPTIONAL. Their entire anti-layout-shift premise rests on explicit intrinsic
> width/height on every <img>. Checked the corpus: every in-post video is
> `<video src="..." autoplay muted loop playsinline aria-label="...">` with NO width or height.
> So that premise does not hold for our video, and without an aspect-ratio the page shifts on
> load. 16/9 is a default, not a measurement - a real fix reads each clip's true ratio at build
> time from the front matter.

## The three versions differ on one thing: how far the caption recedes

> That is the genuinely open question, and the brief turned up a finding that contradicts what
> decisions.css currently does:
>
>   catlikecoding has NO `.dark figcaption` and NO `.dark figure` rule. Their file has 20 `.dark`
>   rules and not one touches figure. In dark mode the caption simply inherits body colour,
>   identical to body text. So THE CAPTION IS DIFFERENTIATED BY TYPOGRAPHY ALONE, IN BOTH THEMES.
>
> Under our palette that argues for --color-text on the caption, NOT --color-silver.
> `decisions.css` currently uses silver, so V1 below is the faithful reading and V2 is what is
> shipping. Drawn side by side rather than silently picking one.

- V1 FAITHFUL: caption is body colour; only italic and size separate it. What the source does.
- V2 WHAT SHIPS TODAY: caption in silver, receding on colour as well as typography.
- V3 RECEDES MOST: silver plus one more size step. OURS, an extrapolation, labelled as one.
