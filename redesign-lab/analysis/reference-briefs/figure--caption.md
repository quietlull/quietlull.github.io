Verified. Here is the brief.

---

# REFERENCE BRIEF: figure + caption

## 1. Premise check: CONFIRMED, zero discrepancy

`redesign-lab/sources/catlikecoding-prose.md` lines 201-248 exists and does cover the component. I refetched `https://catlikecoding.com/unity/tutorials/tutorials.css` live. The note's four blocks match the live stylesheet **character for character**. The saved note is accurate; no LIVE-SITE-WINS override needed.

## 2. Verbatim declarations (live, `tutorials.css`)

```css
figure {
	text-align: center;
	display: block;
	margin: 2em auto;
	padding: 0
}

figure img {
	max-width: 100%;
	height: auto
}

figcaption {
	font-size: 14px;
	font-style: italic
}
```

Inside `@media print`:
```css
aside,figure,p,pre,section section,table,footer {
	page-break-inside: avoid
}
```

Supporting context, also verbatim, needed to read the numbers correctly:
```css
article { background-color: #fafafa; box-sizing: border-box; padding: 1em; margin: 1em auto; max-width: 768px }
body { background-color: #eee; color: #222; font: 16px"Lucida Grande",Arial,sans-serif; line-height: 1.5em; margin: 0; padding: 0; counter-reset: h2 }
```
So: 14px caption against 16px prose = **0.875em**, in a **768px** column. Use the ratio, not the px.

## 3. Two gaps the source note did NOT flag (I checked the live file directly)

- **No `video`, `iframe`, `picture`, or `source` selector exists anywhere in `tutorials.css`.** Verified NONE. catlikecoding is images-only. Every line of video handling is **OURS**, with zero provenance from this source. The craft stage must either source video separately or mark that part Slop in the header.
- **No `.dark figcaption` and no `.dark figure` rule exists.** Their file has 20 `.dark` rules (I enumerated them) and not one touches figure. In dark mode the caption simply inherits `body.dark { background-color:#111; color:#aaa }`, identical to body text. This *strengthens* the note's claim: the caption is differentiated by **typography alone, in both themes**. Under our palette that argues for `--color-text` on the caption, not `--color-silver`.

## 4. THE TRAP: `text-align:center` is doing two jobs

This is the most important thing on this page. In their rule, `figure { text-align:center }` centres the **caption** *and* the **image** (the `<img>` is inline-level, so the block's text-align centres it). Their whole "a 320px screenshot renders at 320px centred inside the 768px column" behaviour comes from that one declaration.

Rod's change is "caption LEFT-ALIGNED". Flipping `text-align` on `figure` would silently drag the **image** flush left too, which he did not ask for and which is a layout change. Split the two jobs:

- centre the media explicitly (`display:block; margin-inline:auto`), keeping their centring intent,
- put `text-align:left` on `figcaption` only.

Same rendered result as theirs for the image, Rod's result for the caption.

## 5. Corpus reality (checked `_posts/`, read-only)

The brief's "46 images and 10 videos" is **confirmed**: 44 markdown image lines where two lines carry two images each = 46; `<video` appears exactly 10 times across 3 files.

Four facts that change the build:

1. **Zero captions exist today.** No `_caption_` lines anywhere (Chirpy's convention), no `<figcaption>` in any post. Caption text currently lives in `alt=` for images and in `aria-label=` for videos, e.g. `aria-label="Using the zones to drive reveals, color changes and more!"` That is a caption in disguise. Whether captions get authored is a content decision for Rod, not something the component can assume.
2. **Chirpy emits `<p><img></p>`, never `<figure>`.** `_includes/refactor-content.html` splits on `'<img '` and post-processes; it does not wrap in figure. So a `figure` selector matches nothing on the live site until the markup changes. That is a port-time concern (D22 defers it) - the bench file just writes the figure markup by hand.
3. **Videos carry no `width`/`height`.** Every one is `<video src="..." autoplay muted loop playsinline aria-label="...">`. catlikecoding's entire anti-blur premise rests on explicit intrinsic dimensions on every `<img>`. That premise **does not hold for our video**, so video needs `aspect-ratio` or it will shift layout on load. `_includes/post-media.html` *can* emit width/height but the in-post videos do not use it.
4. **Two images share one line** in `2026-03-25-SpriteBaker9000.md` lines 42 and 46, at `width:64px` with `image-rendering:pixelated`, deliberately side by side. They live in a `<p>`, not a figure, so a `figure img { display:block }` will not reach them. Keep it scoped to `figure img` / `figure video` and that pair stays intact.

## 6. Theirs vs ours

**Genuinely THEIRS (transcribe):** `display:block`, `margin: 2em auto` (the 2em is the whole rhythm idea, double their 1em paragraph gap), `padding: 0`, `max-width:100%`, `height:auto`, caption at 0.875em, `font-style:italic`, no colour change on the caption, no rule/frame/fill, `page-break-inside:avoid`.

**OURS (Rod):** `text-align:left` on the caption, replacing their `center`.

**OURS (unsourced):** all video handling, and any `aspect-ratio` fallback.

## 7. Palette law: not engaged

Worth stating plainly. Their `figure`, `figure img` and `figcaption` rules contain **zero colour declarations** between them. Nothing has to be stripped or substituted, and no red or cool accent is even in play. No mat, no border, no fill also means no surface competing with the Three.js scene, and no blur, so this component is clean against the glass-tell rule by construction. Square by default is satisfied trivially since there is no border or radius anywhere in the source.

## 8. Tier

**REMIXED.** Six declarations transcribed verbatim, one inverted (`text-align`). Idea-origin: **theirs** for the geometry and the italic-caption device, **Rod** for the left-align. Not True, because the flipped declaration is load-bearing (see section 4) rather than cosmetic. The video path within the same component has **no source** and must be headed as such.

Relevant paths: source `C:/Users/Rod/Documents/ProjectFiles/Website/redesign-lab/sources/catlikecoding-prose.md`; corpus `C:/Users/Rod/Documents/ProjectFiles/Website/_posts/`; Chirpy image processor `C:/Users/Rod/Documents/ProjectFiles/Website/_includes/refactor-content.html`; media include `C:/Users/Rod/Documents/ProjectFiles/Website/_includes/post-media.html`. I wrote no files. `extracted/components/picture-frame/` is a viewport frame from 109ichiki and is unrelated, so there is no prior lab art to reconcile.