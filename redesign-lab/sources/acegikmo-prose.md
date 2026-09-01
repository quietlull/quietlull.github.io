# acegikmo.com/shapes/docs - documentation prose

Sourced 2026-08-18 by curl, then independently re-grepped by a second agent against the
downloaded files. Only declarations marked CONFIRMED below survived that check.

- **Article read:** https://acegikmo.com/shapes/docs/
- **Stylesheets downloaded:**
  - https://acegikmo.com/shapes/css/styles.css
  - https://acegikmo.com/shapes/js/styles/github.css
  - https://acegikmo.com/bezier/BezierStyles.css

## Confirmed components (12)

### inlinecode - `msp`

An invented bare custom element (not <code>, no class) used as a semantic inline chip for menu paths and inspector values. The device is asymmetric padding: 0px vertical, 4px horizontal, so the chip hugs the text height exactly and never disturbs the prose line-height, while 4px radius keeps it reading as a soft token rather than a box.

Source file: https://acegikmo.com/shapes/css/styles.css

```css
msp{
	font-family: monospace;
	background: #eee;
	padding: 0px 4px;
	border-radius: 4px;
}
```

Used on the page as:

```html
Used 81 times in the fetched article. Example: `To add shapes to your scene, go to the top menu bar <msp>Shapes/Create/...</msp></li>` and `<msp>size 2, spacing 0.5</msp>`
```

> Verify pass: EXISTS in shapes-styles.css at line 256, byte-exact match. `cat -A` output: `msp{$` / `^Ifont-family: monospace;$` / `^Ibackground: #eee;$` / `^Ipadding: 0px 4px;$` / `^Iborder-radius: 4px;$` / `}$`. All four declarations and their values match the claim character for character. USED: 58 occurrences of `<msp>` in shapes-docs.html, e.g. line 61: `To add shapes to your scene, go to the top menu bar <msp>Shapes/Create/...</msp>` and line 77: `<msp>size 1, spacing 1</msp>`. Note it is a custom (non-standard) HTML element, not a class.

### inlinecode - `propname`

A second inline-code tier that carries no background at all, distinguished from `msp` only by brand-pink colour plus bold monospace. Two inline code roles are separated by treatment (chip vs. tinted text) rather than by weight alone, so a sentence can contain both without the reader confusing a property name for a menu path.

Source file: https://acegikmo.com/shapes/css/styles.css

```css
propname{
	color: #ff1155;
    font-weight: bold;
    font-family: monospace;
}
```

Used on the page as:

```html
Used 77 times in the fetched article. Example: `<propname>Start</propname>`, `<propname>Thickness</propname>`, and inside the figure caption: `<td><propname>Fast LAA</propname></td>`
```

> Verify pass: EXISTS in shapes-styles.css at line 249, byte-exact including the mixed indentation the claim reproduced. `cat -A`: `propname{$` / `^Icolor: #ff1155;$` / `    font-weight: bold;$` / `    font-family: monospace;$` / `}$`. USED: 39 occurrences of `<propname>` in shapes-docs.html, e.g. line 65: `Lines are defined by a <propname>Start</propname> point and an <propname>End</propname> point, along with a configurable <propname>Thickness</propname>.` Also a custom element, not a class.

### codeblock - `.hljs`

The whole device is one line: an INSET box-shadow offset down-and-right (2px 2px 4px, black at 15% alpha) which makes the code block read as pressed into the page instead of floating on it, the inverse of the usual card shadow. Note two literal facts from the file: `border-radius` is declared twice (4px then 6px, so 6px wins), and because github.css loads AFTER styles.css with equal specificity, this rule's `background: #eee` is overridden to #f8f8f8 while the radius and inset shadow survive.

Source file: https://acegikmo.com/shapes/css/styles.css

```css
.hljs{
	background: #eee;
	border-radius: 4px;
	border-radius: 6px;
	box-shadow: inset 2px 2px 4px 0px #00000026;
}
```

Used on the page as:

```html
5 code blocks in the fetched article, all as `<pre><code class="cs">...` (highlight.js adds the `hljs` class at runtime). Example: `<pre><code class="cs">[ExecuteAlways] public class MyScript : ImmediateModeShapeDrawer {`
```

> Verify pass: EXISTS in shapes-styles.css at line 263, byte-exact INCLUDING the duplicated property the claim faithfully reproduced. `cat -A`: `.hljs{$` / `^Ibackground: #eee;$` / `^Iborder-radius: 4px;$` / `^Iborder-radius: 6px;$` / `^Ibox-shadow: inset 2px 2px 4px 0px #00000026;$` / `}$`. USED, but only at runtime: `class="hljs"` appears 0 times in the static HTML; highlight.js applies it via `hljs.initHighlightingOnLoad();` (shapes-docs.html line 24) to five blocks `<pre><code class="cs">` at lines 152, 267, 279, 305, 330. CASCADE CAVEAT: github.css is linked after styles.css at equal specificity, so its `background: #f8f8f8` overrides the `background: #eee` quoted here; the border-radius:6px and box-s

### codeblock - `.hljs`

Horizontal overflow is handled by `overflow-x: auto` on the code element itself rather than a wrapper, so the scroll region is exactly the code box. THIRD PARTY: this is the stock highlight.js github theme, credited in the file header as `github.com style (c) Vasily Polovnyov <vast@whiteants.net>` - it is not Freya's own design. Only the styles.css block above is site-authored.

Source file: https://acegikmo.com/shapes/js/styles/github.css

```css
.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #333;
  background: #f8f8f8;
}
```

Used on the page as:

```html
Same 5 `<pre><code class="cs">` blocks. This file is loaded second: `<link rel="stylesheet"\n      href="js/styles/github.css">`
```

> Verify pass: EXISTS in shapes-styles.css at line 263, byte-exact INCLUDING the duplicated property the claim faithfully reproduced. `cat -A`: `.hljs{$` / `^Ibackground: #eee;$` / `^Iborder-radius: 4px;$` / `^Iborder-radius: 6px;$` / `^Ibox-shadow: inset 2px 2px 4px 0px #00000026;$` / `}$`. USED, but only at runtime: `class="hljs"` appears 0 times in the static HTML; highlight.js applies it via `hljs.initHighlightingOnLoad();` (shapes-docs.html line 24) to five blocks `<pre><code class="cs">` at lines 152, 267, 279, 305, 330. CASCADE CAVEAT: github.css is linked after styles.css at equal specificity, so its `background: #f8f8f8` overrides the `background: #eee` quoted here; the border-radius:6px and box-s

### figure - `.captioned-image-holder / .captioned-image-holder-inner / .captioned-image-holder-inner img`

A shrink-to-fit caption rig built without <figure>/<figcaption>. The three-part mechanism: outer div centres via text-align, inner div is `display:inline-block` so it collapses to the image's intrinsic width, and `img{display:block}` kills the inline-baseline gap so the caption sits flush. The caption itself is a fixed-layout <table> whose width matches the image, giving evenly divided column labels that align to the image regions they describe - a multi-panel comparison caption, not a sentence.

Source file: https://acegikmo.com/shapes/css/styles.css

```css
.captioned-image-holder{
	margin-top: 16px;
	text-align: center;
}

.captioned-image-holder-inner{
	position: relative;
	display: inline-block;
}

.captioned-image-holder-inner img{
	display: block;
}
```

Used on the page as:

```html
2 uses. Verbatim: `<div class="captioned-image-holder"><div class="captioned-image-holder-inner"><img src="https://www.acegikmo.com/shapes/images/aa-comparison.png"><table style="table-layout: fixed; width: 384px;"><tr><td><propname>No LAA</propname></td>\n<td><propname>Fast LAA</propname></td>\n<td><propname>Corrected LAA</propname></td>\n</tr></table></div></div>`
```

> Verify pass: ALL THREE rules EXIST in shapes-styles.css starting line 275, byte-exact. `cat -A`: `.captioned-image-holder{$` / `^Imargin-top: 16px;$` / `^Itext-align: center;$` / `}$` ... `.captioned-image-holder-inner{$` / `^Iposition: relative;$` / `^Idisplay: inline-block;$` / `}$` ... `.captioned-image-holder-inner img{$` / `^Idisplay: block;$` / `}$`. USED with the exact nesting the descendant selector requires, at shapes-docs.html lines 357 and 370, e.g. line 370: `<div class="captioned-image-holder"><div class="captioned-image-holder-inner"><img src="https://www.acegikmo.com/shapes/images/line-aa-comparison-spheres.gif">`.

### heading - `h1 / h3 / h4 / h5`

Two devices worth stealing. (1) h1 is a full-width section rule: centred display-face type with `border-bottom: solid 1px` and no colour on the border, so the rule inherits the pink `color` and the heading reads as a ruled chapter divider. (2) h5 is `display: inline` - a run-in heading that flows into the paragraph beside it rather than occupying its own line. Note the whole scale runs `font-weight: 100` against a display face, and every level uses a tight `.3em` bottom margin so the heading sticks to the text it labels.

Source file: https://acegikmo.com/shapes/css/styles.css

```css
h1{
	font-family: "Renogare";
	text-align: center;
	margin-top: 60px;
	color: #ff1155;
	font-weight: 100;
	border-bottom: solid 1px;
}

h3{
	font-family: "Renogare";
	color: #ff1155;
	font-weight: 100;
	margin-block-start: 0em;
    margin-block-end: .3em;
}

h4{
	font-family: "Renogare";
	color: #ff1155;
	font-weight: 100;
	margin-block-start: 1.3em;
    margin-block-end: .3em;
}

h5{
	font-size: 15px;
	font-family: "Renogare";
	display: inline;
	color: #ff1155;
	font-weight: 100;
	margin-block-start: 1.3em;
    margin-block-end: .3em;
}
```

Used on the page as:

```html
h1: `<h1 id="shapes">Shapes</h1>`, `<h1 id="anti-aliasing">Anti-Aliasing</h1>`. h4: `<h4>Geometry</h4>`, `<h4>End Caps</h4>`, `<h4>Dashed Lines</h4>`, `<h4>Joins</h4>`. h5 exists in CSS but I found NO `<h5>` in the fetched article HTML.
```

> Verify pass: ALL EXIST in shapes-styles.css: h1 line 25, h3 line 34, h4 line 42, h5 line 50. The h1, h3, h4 blocks match the claim byte-exact (h1: `font-family: "Renogare"; text-align: center; margin-top: 60px; color: #ff1155; font-weight: 100; border-bottom: solid 1px;`). The claim's h5 block is TRUNCATED at `font-size: ` — everything quoted is correct, the real rule continues `font-size: 15px; font-family: "Renogare"; display: inline; color: #ff1155; font-weight: 100; margin-block-start: 1.3em; margin-block-end: .3em;`. USED in shapes-docs.html: h1 x11 (e.g. line 54 `<h1 id="docs-index">Index</h1>`, line 508 `<h1 id="shapes-feature-table">Shapes Feature Table</h1>`), h3 x4, h4 x26 (e.g. line 77 `<h4>Da

### toc - `#toc`

The styling is only three declarations - the real device is the generation rule: query all h1s, skip any without an id and skip the index heading itself, emit absolute `docs/#id` links. It is a flat single-level TOC by construction (h1 only, no nesting), and the `1.8em` line-height is what turns a dense <li> stack into a scannable index. The container is a made-up `<lt>` element, so nothing inherits UA list styling.

Source file: https://acegikmo.com/shapes/css/styles.css

```css
#toc{
	font-family: "Renogare";
    color: #ff1155;
    line-height: 1.8em;
}
```

Used on the page as:

```html
`<h1 id="docs-index">Index</h1><lt id="toc"><!-- Table Of Contents is autogenerated here --></lt>` - populated at runtime by inline JS in the page: `let toc = document.getElementById("toc");\n\tlet headers = document.querySelectorAll("h1");\n\tfor( const node of headers ){\n\t\tif( node.id == "" || node.id == "docs-index" )\n\t\t\tcontinue;\n\t\ttoc.innerHTML += `<li><a href="docs/#${node.id}">${node.innerHTML}</a></li>`;\n\t}`
```

> Verify pass: EXISTS in shapes-styles.css at line 67, byte-exact. `cat -A`: `#toc{$` / `^Ifont-family: "Renogare";$` / `    color: #ff1155;$` / `    line-height: 1.8em;$` / `}$`. USED at shapes-docs.html line 54: `<h1 id="docs-index">Index</h1><lt id="toc"><!-- Table Of Contents is autogenerated here --></lt>`. Container is empty in static HTML but is populated at runtime by the inline script at lines 788-795: `let toc = document.getElementById("toc");` ... `toc.innerHTML += `<li><a href="docs/#${node.id}">${node.innerHTML}</a></li>`;` iterating `document.querySelectorAll("h1")`. Note the container is a nonstandard `<lt>` element wrapping `<li>` children, which is invalid markup, worth knowing before copy

### footnote - `span.footnote`

A superscript marker built without <sup>: `vertical-align: top` raises it, 12px shrinks it, and `letter-spacing: 1px` is the load-bearing bit - it opens up the bracketed `[V]` token so the brackets stay legible at 12px. Because it avoids <sup> there is no line-height disturbance in the table row. There is no matching footnote-definition style anywhere in the CSS; the meaning lives in an HTML comment (`<!--Vector based-->`), so this is a marker with no visible target.

Source file: https://acegikmo.com/shapes/css/styles.css

```css
span.footnote{
	font-size: 12px;
    font-weight: 100;
    letter-spacing: 1px;
    vertical-align: top;
}
```

Used on the page as:

```html
24 uses, all inside the feature comparison table, never in running prose. Verbatim: `<td class="on">yes<span class="footnote">[V]</span></td><!--Vector based-->`
```

> Verify pass: EXISTS in shapes-styles.css at line 393, byte-exact. `cat -A`: `span.footnote{$` / `^Ifont-size: 12px;$` / `    font-weight: 100;$` / `    letter-spacing: 1px;$` / `    vertical-align: top;$` / `}$`. USED and the element-qualified selector actually matches: all 24 occurrences in shapes-docs.html are on span elements. `grep -o '<[a-z]* class="footnote"'` returns `24 <span class="footnote"` with no other tag, so the `span.` qualifier is never a dead constraint. Occurrences at lines 591, 600, 609, 611, 612 and onward.

### aside-sidenote - `span.shape-type-note`

This is the closest thing on the site to an aside, and it is honestly tiny: an inline qualifier that disambiguates two rows with the same name. Identical to span.footnote minus the letter-spacing. Included so the record is complete, but it is a label qualifier, not a sidenote or margin note - the site has no true aside mechanism.

Source file: https://acegikmo.com/shapes/css/styles.css

```css
span.shape-type-note{
	font-size: 12px;
    font-weight: 100;
    vertical-align: top;
}
```

Used on the page as:

```html
Only 2 uses, both in table label cells: `<td>Line <span class="shape-type-note">(flat/billboarded)</span></td>` and `<td>Line <span class="shape-type-note">(volumetric)</span></td>`
```

> Verify pass: EXISTS in shapes-styles.css at line 400 (final rule in the file), byte-exact. `cat -A`: `span.shape-type-note{$` / `^Ifont-size: 12px;$` / `    font-weight: 100;$` / `    vertical-align: top;$` / `}$`. USED: 2 occurrences in shapes-docs.html at lines 563 and 653, both on spans, verified by `grep -o '<[a-z]* class="shape-type-note"'` returning `2 <span class="shape-type-note"`. Note this is byte-identical to span.footnote minus `letter-spacing: 1px` — a near-duplicate rule, not a distinct design token.

### prose-link - `a / a:hover`

Underline-on-hover-only, with the colour deliberately restated identically in the hover rule so hue never shifts - the underline alone is the entire hover response. No `text-underline-offset`, no external-link mark, no visited style anywhere in the file. Links are identified purely by the single brand pink #ff1155, which is the same colour every heading uses, so link and heading share one accent.

Source file: https://acegikmo.com/shapes/css/styles.css

```css
a{
	color: #ff1155;
	text-decoration: none;
}

a:hover {
	color: #ff1155;
	text-decoration: underline;
}
```

Used on the page as:

```html
Inline in prose: `<a href="docs/#thickness-units">units</a>` and `<a href="docs/#thickness-units">meters, pixels or noots</a>`. Also nav: `<a href="/shapes/docs">Documentation</a>`
```

> Verify pass: BOTH EXIST in shapes-styles.css, `a{` at line 15 and `a:hover {` at line 20, byte-exact including the space before the brace on the hover rule that the claim reproduced. Verbatim: `a{` / `\tcolor: #ff1155;` / `\ttext-decoration: none;` / `}` and `a:hover {` / `\tcolor: #ff1155;` / `\ttext-decoration: underline;` / `}`. USED: 42 `<a href` elements in shapes-docs.html, e.g. line 65 `<a href="docs/#thickness-units">units</a>`. The hover rule is a state so it cannot be observed statically, but the anchors it targets are present. Note the color is unchanged between states, only text-decoration flips.

### table - `.feature-table / .feature-table td / .feature-table th / td.on / td.off / td.na / td.depends`

The device is `border-spacing: 1px` combined with `border-radius: 4px` on every cell: the 1px gutter separates the rounded cells so the tinted state colours read as a grid of individual pills, not a striped table, and the 8px outer radius wraps them. The four state classes are a real semantic legend (on/off/na/depends) each pairing a pale tinted background with a saturated same-hue text colour, two of them using 8-digit hex alpha (#ff111180, #ffa10554) so the tint sits over the page rather than being a flat swatch.

Source file: https://acegikmo.com/shapes/css/styles.css

```css
.feature-table{
	margin-top: 8px;
    border-spacing: 1px;
    border: solid 1px #ccc;
    border-radius: 8px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    padding: 8px;
}

.feature-table td{
	border-radius: 4px;

}

.feature-table th{
	font-family: Renogare;
	font-weight: 100;
	border-radius: 4px;
	color: #ff1155;
	padding-left: 4px;
	padding-right: 4px;
}

td.on{
	font-weight: 700;
	background-color: #daffce;
    color: #29b948;
}

td.off{
    font-weight: 700;
    background-color: #ff111180;
    color: #bd003dc7;
}

td.na{
	font-weight: 700;
	background-color: transparent;
    color: #ccc;
}

td.depends{
    font-weight: 700;
    background-color: #ffa10554;
    color: #ca5400;
}
```

Used on the page as:

```html
1 use, `<table class="feature-table">`, with cells like `<td class="on">yes</td><!--Vector based-->` and row labels `<td>Line <span class="shape-type-note">(flat/billboarded)</span></td>`
```

> Verify pass: ALL EXIST in shapes-styles.css: .feature-table line 344, .feature-table td line ~355 (`^Iborder-radius: 4px;$` then a blank line before `}` exactly as claimed), .feature-table th line ~360, td.on 369, td.off 375, td.na 381, td.depends 387. Byte-exact for everything quoted, including per-block indentation switches (`td.on{` / `^Ifont-weight: 700;` / `^Ibackground-color: #daffce;` / `    color: #29b948;` versus td.off which is all-spaces). Claim TRUNCATED at `td.on{ f`; the real continuation is as just quoted. USED at shapes-docs.html line 516 `<table class="feature-table">` with 7 `<th>` children at lines 518-524 (`<th>2D Shapes</th>`, `<th>Vector Based</th>`, `<th>LAA</th>` ...) and the stat

### prose-link - `faded`

Listed for completeness of the inline-element family: a one-declaration bare custom element used to mark the 'negative' half of a before/after comparison label. Same authoring pattern as msp/propname/center-img - Freya defines unregistered bare tags rather than classes for inline prose roles, which keeps the article markup extremely short.

Source file: https://acegikmo.com/shapes/css/styles.css

```css
faded{
	color: #ccc;
}
```

Used on the page as:

```html
4 uses, as image-comparison labels: `<faded>AA off</faded>`, `<faded>No Thin Fade</faded>`
```

> Verify pass: EXISTS in shapes-styles.css at line 270, byte-exact: `faded{$` / `^Icolor: #ccc;$` / `}$`. USED: 3 occurrences of `<faded>` in shapes-docs.html at lines 370-372, e.g. line 370 `<td><faded>AA off</faded><br><faded>No Thin Fade</faded></td>` and line 372 `<td><faded>AA off</faded><br><propname>Thin Fade</propname></td>`. Custom element again, not a class. FLAG ON THE ROLE LABEL, not the CSS: this was tagged role `prose-link`, but the rule contains no link styling and every real usage is a de-emphasised image-caption label inside a comparison table, never an anchor. The declaration is real and used; the role classification is wrong.

## Roles this site does NOT have

- callout
- pullquote
- blockquote
- tldr-summary
- list

## Notes

HONEST HEADLINE: this site has NO callouts, admonitions, notices, warnings, tips, blockquotes, pull quotes, TL;DR boxes, or true sidenotes. I grepped all three downloaded stylesheets for callout|admonition|notice|warning|tip|info|aside|alert|blockquote|quote|pullquote|tldr|summary|sidenote|marginnote|panel|figcaption and the ONLY hit in any file was `.hljs-quote` in the third-party highlight.js theme (a syntax-highlighting token for quoted strings, not a blockquote). The article HTML contains zero <blockquote>, <aside>, <figure>, and <figcaption> tags. If you came here for callout designs, the correct answer is that there are none.

SITE STRUCTURE / DISCOVERY: https://acegikmo.com/ is a link-in-bio page (a single inline <style> block, one Google Font, centred card layout) with no articles of its own. I enumerated every href in it; only three point back to the domain: /bezier/, /shapes/docs/, /trianglesolver/. The long-form Bezier essay everyone knows is hosted on acegikmo.medium.com, i.e. Medium's CSS, not hers - out of scope. /shapes/docs/ is the only real long-form prose page on the domain and is what I analysed. /bezier/ is an interactive jQuery-UI toy: I downloaded BezierStyles.css (62 lines) and it contains only canvas/slider/control chrome, zero prose components, so nothing from it is reported.

A GOTCHA THAT COSTS YOU AN HOUR IF YOU MISS IT: /shapes/docs/ declares `<base href="/shapes/">`. Its relative stylesheet hrefs therefore resolve to /shapes/css/styles.css and /shapes/js/styles/github.css, NOT /shapes/docs/css/... . My first fetch against the naive path returned an Apache 404. Also, the second <link> tag is split across two lines, so a single-line `grep '<link[^>]*>'` silently misses github.css entirely.

CASCADE FACT worth knowing before you copy the code block: styles.css is linked first, github.css second, and both define a bare `.hljs` rule at equal specificity. github.css therefore wins on `background` (#f8f8f8, not the #eee that styles.css asks for) and on `color`. What survives from Freya's own rule is `border-radius: 6px` (declared twice, 4px then 6px) and the inset box-shadow. So the shipped look is a light #f8f8f8 block with a pressed-in inner shadow.

NO BUILD SYSTEM, NO OBFUSCATION: this is hand-written static HTML with hand-written CSS - 403 readable lines with tabs, occasional empty rules (`.legal-table{ }`), a duplicated property, and a typo in the page's own JS console log ("geberatuing TOC"). No Tailwind, no CSS-in-JS, no hashed class names, no framework, no paywall. Everything is directly readable, which is why the evidence above is quotable verbatim.

DISTINCTIVE AUTHORING PATTERN (the actual transferable idea here): rather than classes, Freya defines styles on invented BARE CUSTOM ELEMENTS - `msp`, `propname`, `faded`, `center-img`. Unregistered unknown tags are valid HTML5, inherit as inline, and carry zero UA styling, so `<msp>Shapes/Create/...</msp>` is dramatically shorter to author than a span-with-class. Be aware this is technically non-conforming (custom element names are supposed to contain a hyphen) and gives you no fallback if CSS fails to load. `center-img` is defined in the CSS but I found ZERO uses of it in the fetched article - a dead rule.

CONTENT-TYPE CAVEAT: this is API reference documentation, not an essay. Its "prose components" are consequently reference-shaped - property chips, feature matrices, comparison figures - rather than the narrative devices (callouts, pull quotes, asides) a blog post would need. Two selectors are near-unused: span.shape-type-note has only 2 instances and h5 has none at all in the fetched HTML.

TOC IS JS-GENERATED: the #toc container is empty in the served HTML (`<lt id=\"toc\"><!-- Table Of Contents is autogenerated here --></lt>`) and filled by an inline script at runtime. I have quoted that script verbatim in the finding, so the generation rule is proven from source, but a curl-only capture shows an empty element.

NO CODE-BLOCK CHROME: there are no filename tabs, no header strips, no copy buttons, and no line numbers anywhere - I grepped for copy|clipboard|linenum|line-num across the CSS and article HTML and the only hit was the string "&copy;" in the footer. Horizontal scroll is present but comes from the stock highlight.js theme, not from site-authored CSS. Likewise there is NO list styling of any kind: no list-style, no ul/ol/li rules, no ::marker in the entire stylesheet.
