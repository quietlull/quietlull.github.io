## Verification method
Re-fetched every URL and stylesheet with `curl` (no cache), then brace-walked the CSS to resolve real media-query context, and fetched every referenced mask asset to check it returns 200 and matches the quoted path data.

---

## Candidate 1 — HERALBONY Inclusive, `https://www.heralbony.jp/inclusive/with-google`

**VERDICT: CONFIRMED**

- **Live:** HTTP 200, 158 KB. Single stylesheet `/assets/css/bundle.css?170449613` (200, 187 KB).
- **Has the component:** Yes, unambiguously. The served HTML contains `inclusiveArticleHeroImage_inner` ×3, `data-hero-format` ×3 with values `vertical` ×1 and `horizontal` ×2 — so both formats really are on this one page, as claimed. The quoted markup block is byte-identical to what the server sends, including `data-parallax="zoom"` and the `2.webp` src.
- **CSS present, not paraphrased:** All nine `_inner` rules found verbatim, including the exact `mask-position:center center; mask-size:100% auto; mask-repeat:no-repeat` triple and `img{width:auto;height:100%;object-fit:cover}`.
- **Media-query context re-derived properly (the quote flattens this):** `hero_mask_square.svg` applies at **all widths** (no media context); `hero_mask_horizontal.svg` is inside `@media (min-width:901px)`; `hero_mask_horizontal-sp.svg` inside `@media (max-width:900px)` with `aspect-ratio:390/356`. The "separate SP mask" claim is therefore correct.
- **Image-vs-CSS separation is honest:** the candidate itself flags the two SVGs as artwork. Confirmed — both fetch 200 as `image/svg+xml` and the `rect x="-102" width="1644" rx="370"` capsule and the 4-lobe `M795.956 245.412C…` path match the quote character-for-character.

**Two small inaccuracies (do not change the verdict):**
1. The quote merges `aspect-ratio`/`width` and `mask-image` into single rule blocks. They are separate rules in the real file.
2. It lists `[data-hero-format=vertical] .inclusiveArticleHeroImage{width:66.38%}` and `{order:2;margin-top:160px}` side by side as if both apply. They are on **opposite breakpoints** (min-901 and max-900 respectively). Also unmentioned: a `width:89.7%` mobile variant of `_inner`.

---

## Candidate 2 — UGOKKO, `https://ugokko.jp/blog/954/`

**VERDICT: PARTIAL**

What survives:
- **Live:** HTTP 200. `common.css` and `blog.css` both 200.
- **The hero band mask is real and on this URL.** `<section id="h_fv" class="inview -h760">` is in the served HTML, and `#h_fv` + `#h_fv.-h760` carry `mask-repeat:repeat-x`, `mask-position:0 100%`, `mask-image:url(../img/common/h-fv_bg-760.png)`, `mask-size:2064px 760px`, `animation:wave-mask-loop 100s linear infinite`, with the keyframe walking to `-2064px`. All verbatim. Mobile `mask-image:none` + `50s` + `-1375px` + `border-radius:40px` overrides all confirmed. `h-fv_bg-760.png` fetches 200 (44.7 KB raster — correctly flagged as artwork, not CSS).
- `#h_fv.-h760 .img_area .img{aspect-ratio:1/1;border-radius:80px;overflow:hidden}` confirmed verbatim, as is the `.illust` character overlapping at `left:-73px`.

Why it is not CONFIRMED:
1. **The hero *media* is not masked into a shape on this URL.** It is a square with an 80px radius. What is masked is the surrounding coloured *section band*. For a component defined as "hero image or video masked into a shape rather than a plain rectangle", this URL delivers the device one level up from the media. The candidate says this itself, which is to its credit, but the citation still overreaches.
2. **The strongest evidence cited is on the wrong URL.** The rotating SVG shape masks (`.blog-links … -hexa/-cloud/-moko/-octa/-oval`) are **absent from `/blog/954/`** — `blog-links`, `swiper`, and every one of the five modifier strings count **0** in that page's HTML. Its related-post areas are `.kiji-link_area` and `.menu_area .archive`, neither of which is masked. Those selectors do render, but on `https://ugokko.jp/blog/` (index), where I counted all of them present. This is exactly the failure mode the project has been burned by: a real device cited against a page that does not have it.
3. **Same for `-h500`.** `#h_fv.-h500{background-color:var(--base-color-green); mask-image:h-fv_bg-500v2.webp; mask-size:2744px 500px}` is genuinely in `blog.css`, but this article is `-h760`, so that rule never fires here.
4. **Undercount:** there are **six** thumb masks, not five — `blog-mask_wave.svg` also exists in `blog.css` alongside hex/cloud/moko/octa/oval.

*(Note: the CSS quoted for UGOKKO is reformatted — the served files are expanded and indented, the quote is compacted. Declarations and values match exactly; only whitespace differs.)*

---

## Stake the ledger row on

**HERALBONY (`https://www.heralbony.jp/inclusive/with-google`)** — the only candidate where the component is the hero media itself, the page actually renders it in both format variants, and every quoted declaration and asset re-verified verbatim from source today.

Ledger row should carry these corrections: the mask-image and aspect-ratio declarations are separate rules; the vertical `width:66.38%` and `order:2;margin-top:160px` are opposite breakpoints, not one block; and the two SVGs are HERALBONY brand artwork — the transferable part is the mechanism (mask-carrier div + `aspect-ratio` + `object-fit:cover` child + one data attribute switching mask/ratio/width), not the paths.

Keep UGOKKO as a **secondary/partial** reference for the scrolling-wave *section* mask only, and if the rotating shape-mask thumbs are wanted, re-cite them against `https://ugokko.jp/blog/`, not `/blog/954/`.