# stripe.dev - blog post prose system

Sourced 2026-08-18 by curl, then independently re-grepped by a second agent against the
downloaded files. Only declarations marked CONFIRMED below survived that check.

- **Article read:** https://stripe.dev/blog/what-it-feels-like-building-with-stripe-projects
- **Stylesheets downloaded:**
  - https://stripe.dev/_next/static/immutable/chunks/26mgwr_fts6qf.css
  - https://stripe.dev/_next/static/immutable/chunks/1z4yqbx7pa7w8.css
  - https://stripe.dev/_next/static/immutable/chunks/12lm5yee46pgk.css
  - https://stripe.dev/_next/static/immutable/chunks/329-8hipp0jv3.css

## Confirmed components (8)

### heading - `.BlogPost-module__ifVEqa__articleBody h2  /  .BlogPost-module__ifVEqa__articleBody > h2..h6  /  :is(...) strong`

Two devices. (1) The section heads are LIGHTER than the body copy, not heavier: weight 300 at 48px with -2.88px tracking (-0.06em) and line-height 100%, so hierarchy comes from size + tightness alone, and the `strong` override cancels the `**bold**` the markdown author typed. (2) Asymmetric rhythm: 40px above a heading vs 24px above a paragraph, with `>:first-child{margin:0}` zeroing the top of the article. Note also `h1{color:red;font-size:10px}` - a deliberate tripwire that makes a stray markdown h1 look broken rather than silently duplicate the page title.

Source file: https://stripe.dev/_next/static/immutable/chunks/12lm5yee46pgk.css

```css
.BlogPost-module__ifVEqa__articleBody>h2,.BlogPost-module__ifVEqa__articleBody>h3,.BlogPost-module__ifVEqa__articleBody>h4,.BlogPost-module__ifVEqa__articleBody>h5,.BlogPost-module__ifVEqa__articleBody>h6{margin:40px 0 0}:is(.BlogPost-module__ifVEqa__articleBody>h2,.BlogPost-module__ifVEqa__articleBody>h3,.BlogPost-module__ifVEqa__articleBody>h4,.BlogPost-module__ifVEqa__articleBody>h5,.BlogPost-module__ifVEqa__articleBody>h6) strong{font-weight:300}.BlogPost-module__ifVEqa__articleBody>:first-child{margin:0}.BlogPost-module__ifVEqa__articleBody h1{color:red;font-family:sohne-var,Helvetica Neue,Arial,sans-serif;font-size:10px;font-style:normal}.BlogPost-module__ifVEqa__articleBody h2{color:var(--bodyTextColor);letter-spacing:-2.88px;font-family:sohne-var,Helvetica Neue,Arial,sans-serif;font-size:48px;font-style:normal;font-weight:300;line-height:100%}.BlogPost-module__ifVEqa__articleBody h3{color:var(--bodyTextColor);letter-spacing:-1.8px;font-family:sohne-var,Helvetica Neue,Arial,sans-serif;font-size:36px;font-style:normal;font-weight:300;line-height:100%}.BlogPost-module__ifVEqa__articleBody h4{color:var(--bodyTextColor);letter-spacing:-1.4px;font-family:sohne-var,Helvetica Neue,Arial,sans-serif;font-size:28px;font-style:normal;font-weight:300;line-height:100%}
```

Used on the page as:

```html
From the live rendered DOM of the article (the curl'd HTML has an EMPTY .articleBody, see notes): <h2><strong>Building at the orchestration layer</strong></h2> ... <h2><strong>The operational comprehension problem</strong></h2>  (6 h2 elements, 0 h3-h6). The matching markdown in __NEXT_DATA__ props.pageProps.postData.content is: '## **Building at the orchestration layer**'.
```

> Verify pass: Exists verbatim in 12lm5yee46pgk.css. Matched: `.BlogPost-module__ifVEqa__articleBody>h2,...>h3,...>h4,...>h5,...>h6{margin:40px 0 0}` and `:is(.BlogPost-module__ifVEqa__articleBody>h2,...>h6) strong{font-weight:300}`. The descendant form named in the selector also exists: `.BlogPost-module__ifVEqa__articleBody h2{color:var(--bodyTextColor);letter-spacing:-2.88px;font-family:sohne-var,Helvetica Neue,Arial,sans-serif;font-size:48px;font-style:normal;font-weight:300;line-height:100%}`. USAGE: articleBody is empty in static HTML (client-rendered), but the real prose has headings — article-content.md has 6 `## ` headings, article2-content.md has 2 `## ` plus 6 `### `. Headings genuinely render.

### prose-link - `.BlogPost-module__ifVEqa__articleBody a  /  .BlogPost-module__ifVEqa__articleBody a:hover`

The link is NOT coloured differently from the prose - it is marked only by a 1px border-bottom in --borderColor, then on hover the whole inline box floods with --highlightColor (a lime/green accent) and the text flips to --invertedTextColor. It reads as a highlighter marker swiping across the word, not as a tinted link, and the same flood-the-row hover is reused on list rows site-wide (.BlogPost-module__ifVEqa__link:hover, .AccordionListItem-module__xp6QzG__visible:hover).

Source file: https://stripe.dev/_next/static/immutable/chunks/12lm5yee46pgk.css

```css
.BlogPost-module__ifVEqa__articleBody a{border-bottom:1px solid var(--borderColor);transition:background-color .1s linear;position:relative}.BlogPost-module__ifVEqa__articleBody a:hover{background-color:var(--highlightColor);color:var(--invertedTextColor)}
```

Used on the page as:

```html
Live rendered DOM: <p>I set out to build a simple GitHub traffic dashboard in around an hour using <a href="https://docs.stripe.com/projects">Stripe Projects</a>. ...</p>  (10 anchors in the article body). Global reset in 26mgwr_fts6qf.css strips the native underline first: a{color:var(--buttonColor);text-decoration:none}
```

> Verify pass: Exists verbatim in 12lm5yee46pgk.css: `.BlogPost-module__ifVEqa__articleBody a{border-bottom:1px solid var(--borderColor);transition:background-color .1s linear;position:relative}` and `.BlogPost-module__ifVEqa__articleBody a:hover{background-color:var(--highlightColor);color:var(--invertedTextColor)}` — exact character match. USAGE: 10 `](http` links in article-content.md, 12 in article2-content.md. Caveat: a later 90s-vibes rule re-declares `.BlogPost-module__ifVEqa__articleBody a{border-bottom-color:#fff}`, so the quoted block is not the final cascade value under that theme.

### inlinecode - `.BlogPost-module__ifVEqa__articleBody code.BlogPost-module__ifVEqa__codeSnippet`

Inline code is a custom MDX component, not a bare <code>: a dedicated class with no padding declaration at all, so the tinted chip hugs the glyphs exactly, sized 16px (same as mobile body, i.e. deliberately SMALLER than the 18px desktop body so it does not bulge the line). `display:inline-block` + `text-wrap:pretty` keeps short tokens unbroken. It also gets its own ::selection colours so a highlight over a code chip stays legible against the chip's own background.

Source file: https://stripe.dev/_next/static/immutable/chunks/12lm5yee46pgk.css

```css
.BlogPost-module__ifVEqa__articleBody code.BlogPost-module__ifVEqa__codeSnippet{background:var(--navButtonBG);color:var(--bodyTextColor);text-wrap:pretty;border-radius:3px;font-family:sohne-mono;font-size:16px;display:inline-block}.BlogPost-module__ifVEqa__articleBody code::selection,.BlogPost-module__ifVEqa__articleBody code>span::selection{color:inherit;background:#ffffff26}.BlogPost-module__ifVEqa__articleBody code.BlogPost-module__ifVEqa__codeSnippet::selection{background:var(--windowFrameBG);color:var(--invertedTextColor)}
```

Used on the page as:

```html
Live rendered DOM, the only two <code> elements on the page: <code class="BlogPost-module__ifVEqa__codeSnippet">dev</code> and <code class="BlogPost-module__ifVEqa__codeSnippet">prod</code>
```

> Verify pass: Exists verbatim in 12lm5yee46pgk.css: `.BlogPost-module__ifVEqa__articleBody code.BlogPost-module__ifVEqa__codeSnippet{background:var(--navButtonBG);color:var(--bodyTextColor);text-wrap:pretty;border-radius:3px;font-family:sohne-mono;font-size:16px;display:inline-block}` plus the quoted `code::selection,...code>span::selection{color:inherit;background:#ffffff26}`. USAGE: 3 real inline-code spans in prose — `dev` and `prod` (article-content.md), `Idempotency-Key` (article2-content.md). NOTE: the string `codeSnippet` occurs 0 times in any downloaded HTML, so the class-to-inline-code mapping is inferred from the MDX prose, not directly observed. Do NOT count the 3 `<code>` tags in p-building-..

### figure - `.BlogPost-module__ifVEqa__imageWrapper / __imageContainer / __imageExpandButton / __imageExpandIcon`

A physical MAT, not a caption: the image sits inside a container with 8px (16px >=760px) of padding filled with --blogImageBG and hairlined with --blogImageBorder, and both the mat and the image are rounded 4px - so you get a visible border of backing card around the picture, like a mounted print. There is NO <figure> and NO <figcaption> anywhere in the CSS or the DOM; captions live only in the alt text. The whole thing is wrapped in <span>s inside a <p> (valid inline nesting for a markdown image renderer).

Source file: https://stripe.dev/_next/static/immutable/chunks/12lm5yee46pgk.css

```css
.BlogPost-module__ifVEqa__videoWrapper,.BlogPost-module__ifVEqa__imageWrapper{justify-content:center;display:flex}.BlogPost-module__ifVEqa__videoContainer,.BlogPost-module__ifVEqa__imageContainer{border:1px solid var(--blogImageBorder);background:var(--blogImageBG);border-radius:4px;padding:8px}.BlogPost-module__ifVEqa__imageWrapper img{border-radius:4px;display:block;overflow:hidden}.BlogPost-module__ifVEqa__imageExpandButton{cursor:zoom-in;background:0 0;border:none;border-radius:4px;padding:0;display:block;position:relative}.BlogPost-module__ifVEqa__imageExpandIcon{color:#fff;opacity:0;pointer-events:none;background:#0009;border-radius:999px;justify-content:center;align-items:center;width:26px;height:26px;transition:opacity .15s;display:flex;position:absolute;top:8px;right:8px}.BlogPost-module__ifVEqa__imageExpandButton:hover .BlogPost-module__ifVEqa__imageExpandIcon,.BlogPost-module__ifVEqa__imageExpandButton:focus-visible .BlogPost-module__ifVEqa__imageExpandIcon{opacity:1}@media (min-width:760px){.BlogPost-module__ifVEqa__videoContainer,.BlogPost-module__ifVEqa__imageContainer{padding:16px}}
```

Used on the page as:

```html
Live rendered DOM (4 images, all this shape): <p><span class="BlogPost-module__ifVEqa__imageWrapper"><span class="BlogPost-module__ifVEqa__imageContainer"><img alt="The final result" src="/images/what-it-feels-like-building-with-stripe-projects/image2.png"></span></span></p>
```

> Verify pass: All quoted rules exist verbatim in 12lm5yee46pgk.css: `.BlogPost-module__ifVEqa__videoWrapper,.BlogPost-module__ifVEqa__imageWrapper{justify-content:center;display:flex}`, `.BlogPost-module__ifVEqa__videoContainer,.BlogPost-module__ifVEqa__imageContainer{border:1px solid var(--blogImageBorder);background:var(--blogImageBG);border-radius:4px;padding:8px}`, `.BlogPost-module__ifVEqa__imageWrapper img{border-radius:4px;display:block;overflow:hidden}`. Also present: `.BlogPost-module__ifVEqa__imageExpandButton{cursor:zoom-in;background:0 0;border:none;border-radius:4px;padding:0;display:block;position:relative}` and `.BlogPost-module__ifVEqa__imageExpandIcon{color:#fff;opacity:0;pointer-events:n

### heading - `.TableHeader-module__qdaoaq__container / .TableHeader-module__qdaoaq__label (+ global .text-smallcaps)`

The site's whole zoning device, and the strongest thing on the page to steal: a 12px uppercase MONO label prefixed by a literal <span>/</span> slash, sitting 6px above a 0.5px hairline that spans the grid column. It labels a region the way a spec sheet or a table header does, so major page zones (Metadata / Article / About the author / Related) are announced without a single large heading competing with the h1.

Source file: https://stripe.dev/_next/static/immutable/chunks/1z4yqbx7pa7w8.css

```css
.TableHeader-module__qdaoaq__container{grid-template-columns:subgrid;border-bottom:.5px solid var(--sectionLabels,--fontColor);align-self:start;padding-bottom:6px;display:grid}.TableHeader-module__qdaoaq__label{color:var(--sectionLabels,--fontColor);grid-column:1/-1;gap:4px;display:flex}

/* from 26mgwr_fts6qf.css: */
.text-smallcaps{color:var(--squareTextColor,--fontColor);letter-spacing:-.012em;text-transform:uppercase;font-family:sohne-mono;font-size:12px;font-style:normal;font-weight:300}
```

Used on the page as:

```html
From the curl'd page.html (server-rendered, appears 4x on the page): <div class="TableHeader-module__qdaoaq__container BlogPost-module__ifVEqa__articleHeader"><div class="TableHeader-module__qdaoaq__label text-smallcaps"><span>/</span>Article</div></div>  - and identically for /Metadata and /About the author.
```

> Verify pass: STRONGEST claim — the only one with directly observable rendered markup. Verbatim in 1z4yqbx7pa7w8.css (grep -l confirms it is in that file and no other): `.TableHeader-module__qdaoaq__container{grid-template-columns:subgrid;border-bottom:.5px solid var(--sectionLabels,--fontColor);align-self:start;padding-bottom:6px;display:grid}` and `.TableHeader-module__qdaoaq__label{color:var(--sectionLabels,--fontColor);grid-column:1/-1;gap:4px;display:flex}`. The cross-file attribution is also correct: `.text-smallcaps{color:var(--squareTextColor,--fontColor);letter-spacing:-.012em;text-transform:uppercase;font-family:sohne-mono;font-size:12px;font-style:normal;font-weight:300}` is in 26mgwr_fts6qf.cs

### list - `.BlogPost-module__ifVEqa__articleBody ul  /  ol  /  p,li`

The list is a `display:grid` with `gap:8px` rather than margins on <li>, so item spacing (8px) is decoupled from the block spacing (24px) and can never collapse or double up. Markers are left at browser default - the indent is deliberately asymmetric (ul 28px vs ol 24px) so bullets and numerals optically align to the same left edge. Body copy is weight 300 at 130% with negative tracking (-0.18px), and the ONLY responsive type change on the page is 16px -> 18px at 960px.

Source file: https://stripe.dev/_next/static/immutable/chunks/12lm5yee46pgk.css

```css
.BlogPost-module__ifVEqa__articleBody p,.BlogPost-module__ifVEqa__articleBody li{color:var(--bodyTextColor);letter-spacing:-.18px;font-family:sohne-var,Helvetica Neue,Arial,sans-serif;font-size:16px;font-style:normal;font-weight:300;line-height:130%}.BlogPost-module__ifVEqa__articleBody ol{gap:8px;margin:24px 0 0;padding-left:24px;display:grid}.BlogPost-module__ifVEqa__articleBody ul{gap:8px;margin:24px 0 0;padding-left:28px;display:grid}

@media (min-width:960px){.BlogPost-module__ifVEqa__articleBody p,.BlogPost-module__ifVEqa__articleBody li{font-size:18px}}
```

Used on the page as:

```html
Live rendered DOM (2 <ul>, 0 <ol>): <ul>\n<li>Auth0 infrastructure</li>\n<li>Supabase infrastructure</li>\n<li>Vercel deployments</li>\n<li>deployment connections</li>\n<li>authentication flows</li>\n<li>environment variables</li>\n<li>scheduled background jobs</li>\n</ul>
```

> Verify pass: Exists verbatim in 12lm5yee46pgk.css: `.BlogPost-module__ifVEqa__articleBody p,.BlogPost-module__ifVEqa__articleBody li{color:var(--bodyTextColor);letter-spacing:-.18px;font-family:sohne-var,Helvetica Neue,Arial,sans-serif;font-size:16px;font-style:normal;font-weight:300;line-height:130%}`, `...ol{gap:8px;margin:24px 0 0;padding-left:24px;display:grid}`, `...ul{gap:8px;margin:24px 0 0;padding-left:28px;display:grid}` (ul is padding-left:28px vs ol 24px — the claim truncated just before this). USAGE: article-content.md has 12 `* ` bullets (ul), article2-content.md has 11 ordered `1. ` items (ol). Both list types genuinely render. ACCURACY FLAG: a later rule `.BlogPost-module__ifVEqa__articleB

### aside-sidenote - `.BlogPost-module__ifVEqa__sidebar / __metaDataItem / __metaDataShare`

This is the site's answer to a sidenote rail: a position:sticky column pinned at --stickyOffset (60px) occupying grid columns 1/7 of a 24-column grid, while the prose sits at 8/25 but its text is clamped to 1/14 within that - i.e. the measure is narrow and there is deliberate empty gutter to the right of the prose. Each metadata row is a 1fr 1fr grid (label | value) closed by a 1px DOTTED rule, and `:last-child{border-bottom:none}` kills the trailing rule so the stack ends clean.

Source file: https://stripe.dev/_next/static/immutable/chunks/12lm5yee46pgk.css

```css
.BlogPost-module__ifVEqa__sidebar{grid-column:1/-1;grid-template-columns:subgrid;align-self:start;row-gap:24px;display:grid}@media (min-width:960px){.BlogPost-module__ifVEqa__sidebar{top:var(--stickyOffset);grid-column:1/7;position:sticky}}.BlogPost-module__ifVEqa__metaDataItem{border-bottom:1px dotted var(--dottedBorderColor);grid-template-columns:1fr 1fr;row-gap:16px;padding:12px 0;display:grid}.BlogPost-module__ifVEqa__metaDataShare{border-bottom:1px dotted var(--dottedBorderColor);row-gap:12px;padding:12px 0;display:grid}.BlogPost-module__ifVEqa__metaDataShare:last-child{border-bottom:none}

/* article column, for the pairing: */
@media (min-width:960px){.BlogPost-module__ifVEqa__article{grid-column:8/25}.BlogPost-module__ifVEqa__articleBody,.BlogPost-module__ifVEqa__aboutAuthor,.BlogPost-module__ifVEqa__additionalResources{grid-column:1/14}}@media (min-width:1400px){.BlogPost-module__ifVEqa__articleBody,.BlogPost-module__ifVEqa__aboutAuthor,.BlogPost-module__ifVEqa__additionalResources{grid-column:1/13}}
```

Used on the page as:

```html
From the curl'd page.html: <div class="BlogPost-module__ifVEqa__sidebar"><div class="BlogPost-module__ifVEqa__metadata"><div class="TableHeader-module__qdaoaq__container BlogPost-module__ifVEqa__metadataHeader"><div class="TableHeader-module__qdaoaq__label text-smallcaps"><span>/</span>Metadata</div></div><div class="BlogPost-module__ifVEqa__metadata"><div class="text-smallcaps BlogPost-module__ifVEqa__metaDataItem"><span>Date:</span><span>2026.5.26</span></div><div class="text-smallcaps BlogPost-module__ifVEqa__metaDataItem"><span>Reading time:</span><span>7 min read</span></div> ...
```

> Verify pass: Exists verbatim in 12lm5yee46pgk.css: `.BlogPost-module__ifVEqa__sidebar{grid-column:1/-1;grid-template-columns:subgrid;align-self:start;row-gap:24px;display:grid}`, the media query `@media (min-width:960px){.BlogPost-module__ifVEqa__sidebar{top:var(--stickyOffset);grid-column:1/7;position:sticky}`, and `.BlogPost-module__ifVEqa__metaDataItem{border-bottom:1px dotted var(--dottedBorderColor);grid-template-columns:1fr 1fr;row-gap:16px;padding:12px 0;display:grid}`. metaDataShare is also real: `{border-bottom:1px dotted var(--dottedBorderColor);row-gap:12px;padding:12px 0;display:grid}` plus `:last-child{border-bottom:none}`. USAGE: directly observable in static HTML — `<div class="...ifVEqa__

### list - `.BlogPost-module__ifVEqa__link / __label / __arrow / .SquareIcon-module__6K7DfG__icon / .ListItem-module__kBFJiq__listItem`

A directory-row pattern worth stealing for prev/next and related links: `grid-template-columns:subgrid` inherits the page's 24-col grid so the label spans 1/-2 and the arrow is pinned to -2/-1 (last column, justify-self:end) - the arrows line up perfectly down the page regardless of title length. The bullet is a hard 8px SQUARE div (no border-radius, min-width/min-height so it never squashes), and hover floods the entire row with --highlightColor while `:hover *` re-binds the --squareTextColor custom property so the square bullet inverts along with the text. Gated behind @media (pointer:fine) so touch devices never get a stuck hover state.

Source file: https://stripe.dev/_next/static/immutable/chunks/12lm5yee46pgk.css

```css
.ListItem-module__kBFJiq__listItem{grid-template-columns:subgrid;border-bottom:.5px solid var(--borderColor,--fontColor);color:var(--listItemText);grid-column:1/-1;display:grid}

.BlogPost-module__ifVEqa__additionalResourcesList{grid-column:1/-1;grid-template-columns:subgrid;margin:0;padding:0;list-style:none;display:grid}.BlogPost-module__ifVEqa__link{grid-column:1/-1;grid-template-columns:subgrid;align-items:center;padding:12px 0;display:grid}@media (pointer:fine){.BlogPost-module__ifVEqa__link:hover{background-color:var(--highlightColor)}.BlogPost-module__ifVEqa__link:hover *{--squareTextColor:var(--invertedTextColor);color:var(--invertedTextColor)}}.BlogPost-module__ifVEqa__label{grid-column:1/-2;justify-content:flex-start;align-items:center;gap:8px;display:flex}.BlogPost-module__ifVEqa__arrow{grid-column:-2/-1;justify-self:end}

.SquareIcon-module__6K7DfG__icon{background-color:var(--squareTextColor);width:8px;min-width:8px;height:8px;min-height:8px;margin-top:.5px}
```

Used on the page as:

```html
From the curl'd page.html (the prev/next-style 'more from this author' rows): <li class="ListItem-module__kBFJiq__listItem"><a class="BlogPost-module__ifVEqa__link" href="/blog/introducing-stripe-workflows"><span class="text-smallcaps BlogPost-module__ifVEqa__label"><div class="SquareIcon-module__6K7DfG__icon"></div>Introducing Stripe Workflows: Tailoring Payments to Your Business Needs</span><svg class="BlogPost-module__ifVEqa__arrow ArrowIcon-module__56PCEG__icon" viewBox="0 0 7 7" ...>
```

> Verify pass: Exists verbatim in 12lm5yee46pgk.css (grep -l confirms ListItem and SquareIcon live in THIS file, not another): `.ListItem-module__kBFJiq__listItem{grid-template-columns:subgrid;border-bottom:.5px solid var(--borderColor,--fontColor);color:var(--listItemText);grid-column:1/-1;display:grid}`, `.BlogPost-module__ifVEqa__additionalResourcesList{grid-column:1/-1;grid-template-columns:subgrid;margin:0;padding:0;list-style:none;display:grid}`, `.BlogPost-module__ifVEqa__link{grid-column:1/-1;grid-template-columns:subgrid;align-items:center;padding:12px 0;display:grid}`. USAGE: directly observable — 15 listItem and 2 additionalResourcesList per page: `<ul class="...additionalResourcesList"><li clas

## NOT confirmed - do NOT cite these (3)

- `.BlogPost-module__ifVEqa__articleBody pre > div / .BlogPost-module__ifVEqa__code` (codeblock) - REJECTED ON USAGE, not on existence. The CSS is genuine and verbatim in 12lm5yee46pgk.css: `.BlogPost-module__ifVEqa__articleBody pre,.BlogPost-module__ifVEqa__articleBody>p{margin:24px 0 0}` and `.BlogPost-module__ifVEqa__articleBody pre>div:not(.BlogPost-module__ifVEqa__codeBlockWrapper),.BlogPost
- `.BlogPost-module__ifVEqa__articleBody blockquote` (blockquote) - REJECTED ON USAGE. CSS is genuine and verbatim in 12lm5yee46pgk.css: `.BlogPost-module__ifVEqa__articleBody blockquote{border-left:2px solid var(--bodyTextColor);margin:24px 0 0 12px;padding-left:16px}`, and the cross-file global reset is accurate as stated — `h1,h2,h3,h4,h5,h6,p,blockquote,pre,figu
- `.BlogPost-module__ifVEqa__articleBody table / th / tr / td / thead tr` (table) - REJECTED ON USAGE. All five rules are genuine and verbatim in 12lm5yee46pgk.css: `...table{border-collapse:collapse;margin:56px 0 24px}`, `...table a:after{transform:translateY(calc(100% - 1px))}`, `...th{text-align:left;padding:4px 0;font-weight:300}`, `...tr{border-bottom:1px dotted var(--dottedBo

## Roles this site does NOT have

- callout / admonition (note, tip, warning, info) - EXHAUSTIVE grep across all 4 stylesheets for callout|admonition|notice|warning|tip|infobox|alert|sidenote|marginnote|footnote|pullquote|tldr returned exactly one hit, .ThemeVisuals-module__9p67Hq__ninetiesBanner, which is a 90s-theme decoration and not a prose component. This site has NO callout system.
- pullquote - no dedicated selector exists; the article's emphasised line is a plain <p><em>...</em></p>
- tldr-summary - no summary/TLDR box in the article body. The post summary exists only as data (postData.summary in __NEXT_DATA__) and is used for the LinkedIn share URL and meta, never rendered as a box.
- footnote - no footnote, sup, or backref selectors anywhere in the fetched CSS
- toc (in-article) - a sticky TOC component exists in 1z4yqbx7pa7w8.css (.RouterSection-module__0qNhaW__tocSection{top:var(--stickyOffset);grid-column:1/7;display:none;position:sticky} ... @media (min-width:960px){...display:grid}) but the string 'RouterSection' appears ZERO times in the fetched blog-post HTML. It belongs to a different page type; blog posts have a sticky METADATA rail instead.
- figcaption - no figcaption or <figure> in the CSS or the DOM; images use span wrappers and alt text only
- aside / details / summary / mark / kbd / hr - grep for these element selectors across all 4 stylesheets returned nothing

## Notes

BUILD SYSTEM. Next.js (pages router - there is an id="__NEXT_DATA__" JSON script, not an RSC flight payload) with CSS Modules. Class names are build-hashed in the form Component-module__HASH__localName, e.g. BlogPost-module__ifVEqa__articleBody. The hash changes every build, so the SELECTOR NAMES are not stable to reference - only the declaration blocks are durable. No Tailwind, no CSS-in-JS runtime; all styling is in static .css chunks. Zero <style> blocks in the served HTML.

CLIENT-RENDERED BODY - IMPORTANT FOR EVIDENCE. The curl'd HTML ships the article shell but an EMPTY body: <div class="BlogPost-module__ifVEqa__articleBody"></div>. The prose is markdown stored at props.pageProps.postData.content inside __NEXT_DATA__ (10,028 chars, saved to article-content.md) and rendered client-side. Every htmlUsage snippet above marked "live rendered DOM" was read verbatim from the hydrated page via the browser tool's outerHTML (not summarised, not reconstructed); the header/sidebar/related-links snippets came straight out of the curl'd page.html which does server-render those.

FOURTH STYLESHEET. Only three <link rel="stylesheet"> tags are in the served HTML; a fourth chunk (329-8hipp0jv3.css) is injected at runtime. I found it via document.styleSheets on the live page and curl'd it - it turned out to contain only feed/accordion/related-list components, no prose components.

THEME TOKENS ARE NOT IN THE CSS. --bodyTextColor, --codeBG, --codeBorderColor, --dottedBorderColor, --blogImageBG, --blogImageBorder, --navButtonBG, --invertedTextColor and --sectionLabels are all consumed by the prose rules but defined NOWHERE in the four stylesheets - they are injected at runtime by a theme switcher (body carries data-theme). The global :root in 26mgwr_fts6qf.css only defines the light defaults, notably --highlightColor:#c4e817 (acid lime) and --fontColor:#1e1e1e. On my visit the body had data-theme="night-owl" and computed to: --bodyTextColor #5F7D97, --highlightColor #AAE87B, --codeBG #00070D, --codeBorderColor #011627, --dottedBorderColor #C0C7D1, --borderColor #5F7D97, --navButtonBG #0A2534, --blogImageBG #0e2232, --blogImageBorder #273947, --invertedTextColor #011627. If you lift these components, you must supply your own token values. The only theme with hardcoded CSS is body[data-theme="90s-vibes"], which overrides the whole article body to #fff Times New Roman.

NOTE ON var() FALLBACK SYNTAX. Many rules use var(--buttonColor,--fontColor) / var(--sectionLabels,--fontColor). That fallback is INVALID CSS - a bare custom-property name is not a valid fallback value, it needs var(--fontColor). If the first token is unset those declarations drop entirely. Do not copy that pattern.

VESTIGIAL CODE. .articleBody sets counter-reset:label-count but there is no counter-increment or counter() call anywhere in the four stylesheets - a dead hook for a heading/figure numbering scheme that is not shipped. Also .readingModeButton is fully styled (>=960px, grid-area 1/13, opacity .6) and .readingModeBody has image rules, but the button did not exist in the DOM on my visit.

FONTS. Self-hosted Sohne: sohne-var (variable, weight axis 1-10000, used for all prose) and sohne-mono (used for .text-smallcaps labels and inline code chips). Body prose is weight 300, bold is 500, headings are 300 - a narrow weight band across the whole page.

TYPE SCALE IS ESSENTIALLY FIXED. The only responsive type change in the entire article body is p/li 16px -> 18px at min-width:960px. Headings never change size; h2 stays 48px with -2.88px letter-spacing at every viewport.

ARTICLES CHECKED FOR CODE BLOCKS. /blog/what-it-feels-like-building-with-stripe-projects (target), /blog/because-nobody-likes-being-charged-twice, /blog/introducing-stripe-workflows - none contain fenced code blocks, blockquotes or tables. A fourth slug (/blog/building-financial-operations-agents-with-hypermode) returned a payload with no postData key. Saved artifacts: page.html, page.pretty.html, next-data.json, article-content.md, article2-content.md, plus the four .css files and .css.fmt pretty-printed copies, all in C:/Users/Rod/AppData/Local/Temp/claude/C--Users-Rod-Documents-ProjectFiles-Website/54a6653a-b92f-48bd-aae5-34a6aa020cc6/scratchpad/callout-sources/stripe-dev/

BOTTOM LINE FOR A DESIGNER. If Rod named this as the post-page reference for CALLOUTS, it cannot supply them - there is no callout system here at all. What it does supply is a coherent "spec sheet" prose language: slash-prefixed mono smallcaps zone labels over hairlines, lighter-than-body headings at tight negative tracking, dotted-rule metadata rows in a sticky rail, links marked by a border-bottom that floods with a highlighter colour on hover, images on a padded backing mat, and rules-only tables. The whole system is hairlines (0.5px solid / 1px dotted) plus one loud accent colour used exclusively as a hover flood.
