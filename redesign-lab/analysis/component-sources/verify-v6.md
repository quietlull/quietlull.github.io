All five verified against live sources. Findings below.

---

## Per-candidate verdicts

**1. TheRealMJP — CONFIRMED (accuracy) / provenance claim is WRONG**
URL resolves (200). `<div class="post-nav thin">` is present in the article, immediately before `<div id="comments">`. All five CSS rules are **byte-for-byte identical** to the claim in `style.min.4bc523c643bd50ebce05154df32e255bc3b0c9bae8e5b0be991a7f5163fae5af.css` (the exact hashed filename cited). Markup verbatim including the inverted class names, the `<br>` stack, and the inline feather SVGs.

The one thing that does **not** survive: this is not Matt Pettineo's craft. The footer says "Theme [Hermit](github.com/Track3/hermit)", and I pulled the upstream theme source — `assets/scss/style.scss:719-739` contains the identical rule block, and `layouts/posts/single.html:57-68` emits the identical markup, feather SVGs and `<br>` included. **MJP's post-nav is 100% unmodified Hermit boilerplate.** The candidate set explicitly ranks PaperMod as "the weakest of the four... theme boilerplate, not an author's own craft" while treating MJP as authored design. That ranking is inverted. Also minor: the "inverted class names" are not arbitrary, they track Hugo's `.NextInSection`/`.PrevInSection` (Next = newer).

**2. The Book of Shaders — CONFIRMED (accuracy) / PARTIAL on relevance**
URL resolves (200). Markup verbatim, including the literal ASCII `&lt; &lt; Previous` — genuinely typed characters, not icons, as claimed. Both CSS rules verbatim in `/css/style.css`, `cursor: hand` included. I confirmed `previusPage()`, `homePage()`, `nextPage()` exist in `/src/main.js` and that the `<li>` elements carry **no `href`** — the accessibility criticism is accurate and self-disclosed. Relevance caveat: this is linear book-chapter nav, not post prev/next, and the whole component is five declarations. The claim discloses this honestly, so it is not the failure mode you are screening for, but it is thin to build on.

**3. Jendrik Illner — CONFIRMED**
URL resolves (200). Markup verbatim. All four `.pager` rules and the `:root` tokens verbatim in `/css/article.css` (claim quoted 3 of 5 tokens, trimmed but not misquoted). I independently verified two supporting claims: Bootstrap 5.3.3 is loaded and contains **zero** occurrences of `.pager` or `.previous`, so the dead-class reading is correct. I also brace-matched the enclosing scope, because the rules are indented in the source and looked nested — they are **top level, not inside either of the file's two media queries**. This is the only candidate of the five whose component CSS is genuinely hand-written by the site author.

**4. Hugo PaperMod — CONFIRMED**
URL resolves (200). Hashed stylesheet filename matches the citation exactly. All eight rules verbatim (trivial ordering difference: `.paginav .title` precedes `.paginav a` in the actual file). Token values verbatim: `--radius:8px`, `--secondary:rgb(108,108,108)`, `--code-bg:rgb(245,245,245)`, `--border:rgb(238,238,238)`. Guillemets are literal `\xab`/`\xbb` characters in the markup, as claimed. The grouped selector sharing the skin with `.post-tags a` and `.share-buttons` is real. Its self-assessment as convention evidence rather than craft is correct — and applies equally to MJP.

**5. VitePress — PARTIAL (verification incomplete, not contradicted)**
URL resolves (200), `<nav class="prev-next">` present, scope hash `data-v-76cbe665` matches the citation exactly. The claimed CSS was **truncated mid-declaration in the brief I was given** (`grid-row-gap:.5rem` cut off), so most of it was unverifiable. The visible fragment is verbatim. For the record, the real rules are:
```
.prev-next{border-top:1px solid var(--vp-c-divider);grid-row-gap:.5rem;padding-top:1.5rem;display:grid}
.prev-next{grid-column-gap:1rem;grid-template-columns:repeat(2,1fr)}
.pager-link{border:1px solid var(--vp-c-divider);border-radius:.5rem;width:100%;height:100%;padding:.6875rem 1rem .8125rem;transition:border-color .25s;display:block}
.pager-link:hover{border-color:var(--vp-c-brand-1)}
.desc{color:var(--vp-c-text-2);font-size:.75rem;font-weight:500;line-height:1.66667;display:block}
.title{color:var(--vp-c-brand-1);font-size:.875rem;font-weight:500;line-height:1.42857;display:block}
```
Re-submit the full quote before it goes in the ledger. Note it is also framework boilerplate.

**Image-vs-CSS check: clean.** Nothing claimed as CSS is artwork in any of the five. MJP's arrows are inline SVG and are described as such; PaperMod/Jendrik use text guillemets; Book of Shaders uses literal ASCII.

---

## Stake the row on: **Jendrik Illner**

It is the only candidate that is both verbatim-accurate *and* genuinely author-written. Custom `article.css` on his own domain, hand-formatted with inconsistent indentation, no framework providing the class, confirmed top-level rather than breakpoint-scoped — and it is a real indie graphics-programming blog, the exact site genre this project draws from. Tier it **True**.

Two corrections to carry into the ledger regardless of which row you write:

- **Re-tier MJP.** Do not cite it as authored design. If you want its kicker-over-title geometry, the honest citation is `Track3/hermit` `assets/scss/style.scss:719`, and the tier is convention/boilerplate — same class as PaperMod, not above it.
- **The kicker+title pattern has no craft source in this set.** MJP (Hermit), PaperMod, and VitePress are all theme/framework defaults; Jendrik has no title. If the design you want is the kicker-over-title split, you currently have convention evidence but no True source for it, which under the provenance law means it needs one more real reference or an explicit ask to Rod before it is built.