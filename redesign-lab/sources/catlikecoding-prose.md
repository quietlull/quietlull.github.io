# catlikecoding.com - Unity tutorial prose

Sourced 2026-08-18 by curl, then independently re-grepped by a second agent against the
downloaded files. Only declarations marked CONFIRMED below survived that check.

- **Article read:** https://catlikecoding.com/unity/tutorials/basics/building-a-graph/
- **Stylesheets downloaded:**
  - https://catlikecoding.com/unity/tutorials/tutorials.css

## Confirmed components (9)

### callout - `aside / aside h3 / aside div / aside div.expanded / .dark aside`

The device is a disclosure box, not a static admonition: a bare <aside> gets a 2px flat border and a slightly darker fill than the article card, its <h3> is the same 14px size as the body of the box (no size hierarchy - the question does not shout), is centred, and carries cursor:pointer; the answer <div> is display:none until JS swaps in class 'expanded'. The whole box is one notch smaller than prose (14px vs 16px) so a run of unopened questions reads as a quiet secondary rail rather than a stack of banners. The print media query force-expands every answer, so the collapse degrades to a fully readable document.

Source file: https://catlikecoding.com/unity/tutorials/tutorials.css

```css
aside {
	background-color: #ddd;
	border: 2px solid #ccc;
	font-size: 14px;
	margin: 1em;
	padding: 0 1em
}

aside h3 {
	font-size: 14px;
	margin: 0 0 1em;
	padding: 1em 0 0;
	cursor: pointer
}

aside div {
	display: none
}

aside div.expanded {
	display: block
}

.tutorials ol,article aside h3 {
	text-align: center
}

.dark aside {
	background-color: #444;
	border-color: #555
}

@media print {
	aside div {
		display: block
	}
}
```

Used on the page as:

```html
<aside>
	<h3>Are cubes the best way to visualize graphs?</h3>
	<div>
		<p>You could also use a particle system or line segments, but individual cubes are the simplest to use.</p>
	</div>
</aside>

(and, with inline code inside the question:)
<aside>
	<h3>What is the full inheritance chain of <code>MonoBehaviour</code>?</h3>
	<div>
		<p><code>MonoBehaviour</code> extends <code>Behaviour</code>, which extends <code>Component</code>, which extends <code>Object</code>.</p>
	</div>
</aside>

38 occurrences of the token "aside" in the fetched article HTML - this is the site's main prose-interruption device.
```

> Verify pass: All blocks exist verbatim in tutorials.css. File reads: `aside {\n\tbackground-color: #ddd;\n\tborder: 2px solid #ccc;\n\tfont-size: 14px;\n\tmargin: 1em;\n\tpadding: 0 1em\n}`, `aside h3 {\n\tfont-size: 14px;\n\tmargin: 0 0 1em;\n\tpadding: 1em 0 0;\n\tcursor: pointer\n}`, `aside div {\n\tdisplay: none\n}`, `aside div.expanded {\n\tdisplay: block\n}`, `.tutorials ol,article aside h3 {\n\ttext-align: center\n}`, `.dark aside {\n\tbackground-color: #444;\n\tborder-color: #555\n}`. Every declaration matches character for character. USAGE: 19 `<aside` in article.html, structured exactly as the CSS expects: `<aside>\n<h3>Are cubes the best way to visualize graphs?</h3>\n<div>\n<p>You could also 

### codeblock - `pre / del,ins / del / .dark del,.dark ins`

The chrome is almost nothing (1px #999 hairline, 1em pad, 13px Courier, tab-size 4) and all the design load is carried by semantic <ins>/<del> inside the code: added lines get a yellow highlighter wash (#fafa99) and removed lines get the same wash plus line-through, with every inherited text property explicitly reset (color/font-style/font-weight: inherit, text-decoration: none) so the browser's default italic/underline for ins does not fight the syntax colours. That gives a per-line diff highlight using only built-in elements - no line-number gutter, no copy button, no filename tab. Note overflow: none is an invalid value and is dropped, so long lines simply overflow rather than scroll (the fixed width=768 viewport is what makes that survivable).

Source file: https://catlikecoding.com/unity/tutorials/tutorials.css

```css
pre {
	border-width: 1px;
	border-style: solid;
	border-color: #999;
	font: 13px Courier,monospace;
	padding: 1em;
	tab-size: 4;
	overflow: none;
	-moz-tab-size: 4;
	-webkit-text-size-adjust: 100%
}

del,ins {
	background-color: #fafa99;
	color: inherit;
	font-style: inherit;
	font-weight: inherit;
	text-decoration: none
}

del {
	text-decoration: line-through
}

.dark del,.dark ins {
	background-color: #411
}
```

Used on the page as:

```html
<pre translate="no"><ins>using UnityEngine;</ins>

<ins>public class Graph : MonoBehaviour {</ins>

	<ins>[SerializeField]</ins>
	<ins>Transform pointPrefab;</ins>
<ins>}</ins></pre>

and a change-in-place example:

<pre translate="no">		Transform point = Instantiate(pointPrefab);
		point.localPosition = Vector3.right;

<del>//		Transform point = Instantiate(pointPrefab);</del>
		<ins>point = Instantiate(pointPrefab);</ins>
		point.localPosition = Vector3.right * 2f;</pre>

69 <pre blocks, 96 <ins> and 15 <del> in the fetched article.
```

> Verify pass: Verbatim in tutorials.css: `pre {\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: #999;\n\tfont: 13px Courier,monospace;\n\tpadding: 1em;\n\ttab-size: 4;\n\toverflow: none;\n\t-moz-tab-size: 4;\n\t-webkit-text-size-adjust: 100%\n}` - note `overflow: none` is an invalid CSS value and the claim reproduces it faithfully, which argues the extraction was mechanical rather than paraphrased. Also `del,ins {\n\tbackground-color: #fafa99;\n\tcolor: inherit;\n\tfont-style: inherit;\n\tfont-weight: inherit;\n\ttext-decoration: none\n}`, `del {\n\ttext-decoration: line-through\n}`, and the truncated tail resolves to `.dark del,.dark ins {\n\tbackground-color: #411\n}`. USAGE: 69 `<pre`, 9

### inlinecode - `b,code,i / code / .keyword,.constant,.comment,.directive,.type family`

Inline code gets no pill, no background, no border - only a font swap to 13px Courier and, crucially, white-space: nowrap shared with <b> and <i>, so an identifier can never be broken across a line. The nowrap-on-emphasis trick is the actual device: it treats any short emphasised run as an atom. UI element names use <em translate="no"> rather than <code>, keeping code-vs-interface a semantic distinction. Syntax colours are keyed to meaning (types green and bold, keywords dark red, constants magenta) rather than to a generic theme, and are re-mapped wholesale for dark mode.

Source file: https://catlikecoding.com/unity/tutorials/tutorials.css

```css
b,code,i {
	white-space: nowrap
}

code {
	font: 13px Courier,monospace
}

.directive {
	color: #aa616a;
	font-weight: 700
}

.comment {
	color: #555;
	font-style: italic
}

.constant {
	color: #909
}

.keyword {
	color: #900
}

.cc-type,.msdn-type,.type,.unity-type {
	color: #050!important;
	font-weight: 700
}

.unity-method {
	color: #000!important;
	font-weight: 700
}

.cg-function,.cg-macro {
	color: #009!important;
	font-weight: 700
}
```

Used on the page as:

```html
<p>Graphs are created by placing points at the appropriate coordinates. To do this, we need a 3D visualization of a point. We'll simply use Unity's default cube game object for this. Add one to the scene and name it <em translate="no">Point</em>. Remove its <code>BoxCollider</code> component, as we won't use physics.</p>

161 <code occurrences in the fetched article. The syntax-token classes (.keyword, .unity-type, etc.) are NOT present as literal class attributes in the served HTML - they are applied at runtime by tutorials.js, which the page loads at the end of <body> and which reads a per-page `var customTypes = { Graph: 1 };` inline script in <head>.
```

> Verify pass: Verbatim: `b,code,i {\n\twhite-space: nowrap\n}`, `code {\n\tfont: 13px Courier,monospace\n}`, `.directive {\n\tcolor: #aa616a;\n\tfont-weight: 700\n}`, `.comment {\n\tcolor: #555;\n\tfont-style: italic\n}`, `.constant {\n\tcolor: #909\n}`, `.keyword {\n\tcolor: #900\n}`, `.cc-type,.msdn-type,.type,.unity-type {\n\tcolor: #050!important;\n\tfont-weight: 700\n}`, `.unity-method {\n\tcolor: #000!important;\n\tfont-weight: 700\n}`, truncated tail resolves to `.cg-function,.cg-macro {\n\tcolor: #009!important;\n\tfont-weight: 700\n}`. USAGE: 74 `<code` in article.html, e.g. `<code>BoxCollider</code> component, as we won't use physics.` The syntax classes are ZERO in static HTML and are injected 

### figure - `figure / figure img / figcaption`

Images are never full-bleed: every <img> carries explicit intrinsic width/height attributes in the HTML and the CSS only caps them (max-width:100%; height:auto), so a 320px screenshot renders at 320px centred inside the 768px column and never gets upscaled into blur. Vertical rhythm is a flat 2em auto, double the 1em paragraph gap, so figures separate sections without any rule or frame. The caption is 14px italic with no colour change - it reads as an aside by typography alone, and it can carry links.

Source file: https://catlikecoding.com/unity/tutorials/tutorials.css

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

@media print {
	aside,figure,p,pre,section section,table,footer {
		page-break-inside: avoid
	}
}
```

Used on the page as:

```html
<figure>
	<img src="creating-a-line-of-cubes/graph.png" width="400" height="400">
	<figcaption>Graph with `x` between &minus;2 and 2, made with <a href="https://www.desmos.com/calculator/di84egsf7a">Desmos</a>.</figcaption>
</figure>

<figure>
	<img src="creating-a-line-of-cubes/graph-with-prefab.png" width="320" height="225">
	<figcaption>Graph game object with reference to prefab.</figcaption>
</figure>

118 "figure" / 98 "figcaption" tokens in the fetched article.
```

> Verify pass: Verbatim: `figure {\n\ttext-align: center;\n\tdisplay: block;\n\tmargin: 2em auto;\n\tpadding: 0\n}`, `figure img {\n\tmax-width: 100%;\n\theight: auto\n}`, `figcaption {\n\tfont-size: 14px;\n\tfont-style: italic\n}`. The trailing print rule is also real: inside `@media print` the file has `aside,figure,p,pre,section section,table,footer {\n\t\tpage-break-inside: avoid\n\t}`. USAGE: 49 `<figure` and 49 `<figcaption` in article.html - a perfect 1:1 pairing. Sample: `<figcaption>Using cubes to show a sine wave.</figcaption>` and `<figcaption>Graph with `x` between &minus;2 and 2, made with <a href="https://www.desmos.com/calculator/di84egsf7a">Desmos</a>.</figcaption>`. CAVEAT: the @media prin

### heading - `body{counter-reset:h2} / h2{counter-reset:h3} / h2:before,h3:before / article section h2:before / section>h3:before`

Two nested CSS counters (h2 reset on body, h3 reset on each h2) produce 1, 1.1, 1.2, 2, 2.1 automatically, and the numbers are deliberately DE-emphasised - the ::before is 14px #888 while the h2 itself is 20px #222, so the number is a small grey tick sitting before a heading that is barely larger than body text (20px against 16px prose). The manuscript numbering carries the hierarchy so the type sizes never have to. No rule, no anchor icon, no colour. h2 also forces a page break in print, making the section the unit of the document.

Source file: https://catlikecoding.com/unity/tutorials/tutorials.css

```css
body {
	counter-reset: h2
}

h2:before,h3:before {
	color: #888;
	font-size: 14px
}

h2 {
	counter-reset: h3
}

section>h3 {
	font-size: 18px;
	margin: 1.5em 0 1em
}

section>h3:before {
	counter-increment: h3;
	content: counter(h2)"."counter(h3)" "
}

article section h2 {
	font-size: 20px;
	margin: 2em 0 1em
}

article section h2:before {
	counter-increment: h2;
	content: counter(h2)" "
}

@media print {
	article section h2 {
		page-break-before: always
	}
}
```

Used on the page as:

```html
<section>
	<h2>Creating a Line of Cubes</h2>
	...
	<section>
		<h3>Prefabs</h3>
		<p>Graphs are created by placing points at the appropriate coordinates. ...</p>
	</section>
</section>

Four top-level <h2> sections in the fetched article (lines 93, 540, 645, 990: "Creating a Line of Cubes", "Creating More Cubes", "Coloring the Graph", "Animating the Graph"). The numbers "1", "1.1" etc. appear nowhere in the HTML - they are pure CSS counters. Section id attributes are added at runtime by tutorials.js.
```

> Verify pass: The counter machinery is all real and verbatim: `h2:before,h3:before {\n\tcolor: #888;\n\tfont-size: 14px\n}`, `h2 {\n\tcounter-reset: h3\n}`, `section>h3 {\n\tfont-size: 18px;\n\tmargin: 1.5em 0 1em\n}`, `section>h3:before {\n\tcounter-increment: h3;\n\tcontent: counter(h2)"."counter(h3)" "\n}`, `article section h2 {\n\tfont-size: 20px;\n\tmargin: 2em 0 1em\n}`, `article section h2:before {\n\tcounter-increment: h2;\n\tcontent: counter(h2)" "\n}`. FLAG - PARTIAL QUOTE: `body { counter-reset: h2 }` is NOT a standalone rule. The actual body rule is `body {\n\tbackground-color: #eee;\n\tcolor: #222;\n\tfont: 16px"Lucida Grande",Arial,sans-serif;\n\tline-height: 1.5em;\n\tmargin: 0;\n\tpadding:

### tldr-summary - `article header h1 / article header p / article header ul / article header ul li`

This is a TL;DR with no box at all. The subtitle is a plain <p> forced to display:inline-block with a .5em left margin so it sits on the SAME baseline as the 32px h1 as a bold trailing tag rather than a second line. Under it, the takeaway list drops its bullets entirely (list-style-type:none, padding:0) and is set in italic with a 1.5em margin all round - the italic plus the whitespace island is the only signal that this block is a summary rather than prose. Each item is a single imperative sentence, so the list reads as five flush italic lines.

Source file: https://catlikecoding.com/unity/tutorials/tutorials.css

```css
article header h1 {
	display: inline-block;
	font-size: 32px;
	margin: 0
}

article header p {
	display: inline-block;
	font-weight: 700;
	margin: 0 0 0 .5em
}

article header ul {
	font-style: italic;
	list-style-type: none;
	margin: 1.5em;
	padding: 0
}

article header ul li {
	margin: 0;
	padding: 0
}
```

Used on the page as:

```html
<article>
	<header>
		<h1>Building a Graph</h1>
		<p>Visualizing Math</p>
		<ul>
			<li>Create a prefab.</li>
			<li>Instantiate multiple cubes.</li>
			<li>Show a mathematical function.</li>
			<li>Create a surface shader and shader graph.</li>
			<li>Animate the graph.</li>
		</ul>
	</header>
```

> Verify pass: Verbatim, and these four rules ARE genuinely contiguous in the file: `article header h1 {\n\tdisplay: inline-block;\n\tfont-size: 32px;\n\tmargin: 0\n}`, `article header p {\n\tdisplay: inline-block;\n\tfont-weight: 700;\n\tmargin: 0 0 0 .5em\n}`, `article header ul {\n\tfont-style: italic;\n\tlist-style-type: none;\n\tmargin: 1.5em;\n\tpadding: 0\n}`, `article header ul li {\n\tmargin: 0;\n\tpadding: 0\n}`. USAGE: exact structure at top of article.html - `<article>\n<header>\n<h1>Building a Graph</h1>\n<p>Visualizing Math</p>\n<ul>\n<li>Create a prefab.</li>\n<li>Instantiate multiple cubes.</li>\n<li>Show a mathematical function.</li>\n<li>Create a surface shader and shader graph.</li>\n<li

### prose-link - `a,a:visited / a:hover,a:visited:hover / article a,article a:visited / .dark a / .dark article a`

Two link registers from one rule pair: chrome links (breadcrumbs, nav, footer) are the same #000 as body text and therefore invisible until hovered, while links inside <article> are the site's single accent, a dark red #a00. Underline exists only on :hover for both. So in running prose a link is a colour shift and nothing else - no underline-offset, no external-link mark, no visited state (a:visited is explicitly given the same colour as a). Dark mode lifts the accent from #a00 to #f44 rather than reusing it, keeping the contrast against #333 article ground.

Source file: https://catlikecoding.com/unity/tutorials/tutorials.css

```css
a,a:visited {
	color: #000;
	text-decoration: none
}

a:hover,a:visited:hover {
	text-decoration: underline
}

.dark a,.dark a:visited {
	color: #aaa
}

article a,article a:visited {
	color: #a00
}

.dark article a,.dark article a:visited {
	color: #f44
}
```

Used on the page as:

```html
<p>This is the second tutorial in a series about learning the <a href="https://catlikecoding.com/unity/tutorials/basics/">basics</a> of working with Unity. This time we'll use game objects to build a graph, so we can show mathematical formulas.</p>

<figcaption>Graph with `x` between &minus;2 and 2, made with <a href="https://www.desmos.com/calculator/di84egsf7a">Desmos</a>.</figcaption>

<p>The next tutorial is <a href="https://catlikecoding.com/unity/tutorials/basics/mathematical-surfaces/">Mathematical Surfaces</a>.</p>
```

> Verify pass: All verbatim and in the same relative order as the file: `a,a:visited {\n\tcolor: #000;\n\ttext-decoration: none\n}`, `a:hover,a:visited:hover {\n\ttext-decoration: underline\n}`, `.dark a,.dark a:visited {\n\tcolor: #aaa\n}`, `article a,article a:visited {\n\tcolor: #a00\n}`, `.dark article a,.dark article a:visited {\n\tcolor: #f44\n}`. This is the one claim with no reordering. USAGE: 18 `<a ` in article.html inside `<article>`, e.g. the Desmos link inside a figcaption and `<a href="https://catlikecoding.com/unity/tutorials/license/" class="license">license</a>`. The `.dark` variants are reachable, not dead: tutorials.js:6 and :16 both do `document.body.className = 'dark';` driven by `loca

### toc - `#toc / #toc :before / #toc a,#toc div / #toc ol / #toc li / .toc-h2:before / .toc-h3:before`

The TOC mirrors the heading device exactly: a second pair of counters (toc-h2 / toc-h3) regenerates the same "1", "1.1" numbering client-side, so the panel and the document can never disagree about numbering even though neither number is authored. Visually it is a 13px fixed panel pinned to the top-right with the page background colour reused as a 4px border (border:4px solid #eee against body #eee) - the border is a bleed gap, not a frame, so the panel appears to float free of the article card. It collapses to the single word "contents" via a click handler on its own header.

Source file: https://catlikecoding.com/unity/tutorials/tutorials.css

```css
#theme-switcher,#toc {
	font-size: 13px
}

#toc {
	border: 4px solid #eee;
	position: fixed;
	top: 0;
	right: 0;
	padding: 0 10px;
	counter-reset: toc-h2
}

#toc :before {
	color: #555
}

#toc a,#toc div {
	cursor: pointer
}

#toc ol,.tutorials ol {
	list-style-type: none;
	margin: 0;
	padding: 0
}

#toc li {
	margin: 2px 1em;
	padding: 0
}

.dark #toc {
	border-color: #111
}

.toc-h2:before {
	counter-reset: toc-h3;
	counter-increment: toc-h2;
	content: counter(toc-h2)" "
}

.toc-h3:before {
	counter-increment: toc-h3;
	content: counter(toc-h2)"."counter(toc-h3)" "
}

@media print {
	#theme-switcher,#toc,article a[download] {
		display: none
	}
}
```

Used on the page as:

```html
NOT PRESENT in the served HTML - grep for "toc" in the fetched article returns 0 matches. The element is constructed at runtime by https://catlikecoding.com/unity/tutorials/tutorials.js, which walks every <section>, assigns header.id = "1" / "1.1", and builds the list:

	li.className = isH2 ? 'toc-h2' : 'toc-h3';
	...
	const toc = document.createElement('div');
	toc.id = 'toc';
	const header = toc.appendChild(document.createElement('div'));
	header.innerHTML = 'contents';
	header.onclick = toggleToC;
	toc.appendChild(topLevel);
	document.getElementsByTagName('body')[0].appendChild(toc);
```

> Verify pass: Verbatim: `#theme-switcher,#toc {\n\tfont-size: 13px\n}`, `#toc {\n\tborder: 4px solid #eee;\n\tposition: fixed;\n\ttop: 0;\n\tright: 0;\n\tpadding: 0 10px;\n\tcounter-reset: toc-h2\n}`, `#toc :before {\n\tcolor: #555\n}`, `#toc a,#toc div {\n\tcursor: pointer\n}`, `#toc ol,.tutorials ol {\n\tlist-style-type: none;\n\tmargin: 0;\n\tpadding: 0\n}`, `#toc li {\n\tmargin: 2px 1em;\n\tpadding: 0\n}`, `.dark #toc {\n\tborder-color: #111\n}`; truncated tail resolves to `.toc-h2:before {\n\tcounter-reset: toc-h3;\n\tcounter-increment: toc-h2;\n\tcontent: counter(toc-h2)" "\n}`. USAGE IS RUNTIME-ONLY - a static grep for id="toc" in article.html and page.html returns NOTHING, so this would look unuse

### footnote - `.license,.repository,a[download]`

End-matter (license / repository / PDF) is not a card, a button row, or a footer block - each is an inline <a> forced to display:block and text-align:right at 14px, so the three links stack as a right-aligned ragged column hanging off the end of the article. The attribute selector a[download] means the PDF link needs no class at all; the download attribute itself is the hook. Print hides the PDF link and keeps the license and repository ones, so the printed page still carries its provenance.

Source file: https://catlikecoding.com/unity/tutorials/tutorials.css

```css
.license,.repository,a[download] {
	display: block;
	margin: 1em;
	font-size: 14px;
	text-align: right
}

@media print {
	#theme-switcher,#toc,article a[download] {
		display: none
	}
}
```

Used on the page as:

```html
<p>The next tutorial is <a href="https://catlikecoding.com/unity/tutorials/basics/mathematical-surfaces/">Mathematical Surfaces</a>.</p>

<a href="https://catlikecoding.com/unity/tutorials/license/" class="license">license</a>
<a href="https://bitbucket.org/catlikecodingunitytutorials/basics-02-building-a-graph/" class="repository">repository</a>
<a href="Building-a-Graph.pdf" download rel="nofollow">PDF</a>
```

> Verify pass: Verbatim: `.license,.repository,a[download] {\n\tdisplay: block;\n\tmargin: 1em;\n\tfont-size: 14px;\n\ttext-align: right\n}`. The print rule is real too - inside `@media print` the file has `#theme-switcher,#toc,article a[download] {\n\t\tdisplay: none\n\t}`. USAGE: all three variants present at the foot of article.html - line 1184 `<a href="https://catlikecoding.com/unity/tutorials/license/" class="license">license</a>`, line 1185 `<a href="https://bitbucket.org/catlikecodingunitytutorials/basics-02-building-a-graph/" class="repository">repository</a>`, line 1186 `<a href="Building-a-Graph.pdf" download rel="nofollow">PDF</a>`. The `download` attribute is bare, so the `a[download]` attribu

## NOT confirmed - do NOT cite these (1)

- `article table / article tr:nth-child(even) / article td / .dark article tr:nth-c` (table) - REJECTED ON USAGE, NOT ON CSS. The CSS is real and quoted exactly, in the file's own order: `article table {\n\tmargin: 0 auto;\n\ttext-align: center;\n\tborder-collapse: collapse\n}`, `article tr:nth-child(even) {\n\tbackground-color: #ddd\n}`, `.dark article tr:nth-child(even) {\n\tbackground-colo

## Roles this site does NOT have

- pullquote - no .pullquote / .pull / quote-as-feature rule anywhere in tutorials.css, and no such markup in the article
- blockquote - the string 'blockquote' does not appear in tutorials.css at all, and there is no <blockquote> in the fetched article; quoting is not part of this site's prose vocabulary
- aside-sidenote / marginnote - <aside> here is an inline full-width collapsible Q&A box (see the callout finding), NOT a margin note. There is no float, no negative margin, no side-column rule in the stylesheet
- list (prose list markers) - no rule styles article <ul>/<ol>/<li> markers. The only list rules are article header ul (bullets removed, see tldr-summary), #toc ol/li, and .tutorials ol/li which is the index-page card grid, not prose
- code block chrome - no filename tab, no header strip, no copy button, no line numbers, and no horizontal scroll (see the codeblock finding: 'overflow: none' is an invalid value and is discarded)
- callout VARIANTS - there is exactly one box type. No note/tip/warning/info/danger distinction, no colour-coded left border, no icon, no severity system

## Notes

BUILD / TOOLING: no build system, no CSS-in-JS, no hashed or utility class names, no CSS custom properties, no @import, no webfonts. The article loads exactly ONE stylesheet - https://catlikecoding.com/unity/tutorials/tutorials.css, 6267 bytes / 472 lines total - and zero inline <style> blocks. Class names are plain semantic English (.license, .repository, .keyword, .unity-type). Everything above is copyable as-is.

THE SITE'S ACTUAL SIGNATURE, in order of usefulness:
1. The collapsible <aside> Q&A. This is the one to steal. Every callout on the site is an anticipated reader question as a clickable 14px heading with the answer hidden behind display:none / .expanded. There is no note/tip/warning taxonomy at all - one box, one behaviour, and it force-expands in print.
2. <ins>/<del> as a yellow-highlighter diff INSIDE <pre>. Semantic HTML doing the whole job, with every inherited decoration explicitly reset. No plugin, no diff language tag.
3. Nested CSS counters producing 1 / 1.1 / 1.2 from bare <section><h2>, with the number set SMALLER and greyer than the heading it numbers.

SELECTORS PRESENT IN CSS BUT UNUSED IN THE FETCHED HTML (flagged per-finding, repeated here): #toc and .toc-h2/.toc-h3 (injected at runtime by tutorials.js), #theme-switcher (same), article table / tr:nth-child(even) / td (zero <table> elements on this page), and .formula { padding: 0 0 0 1em } (the class appears nowhere in the article; the word 'formula' at line 83 is prose).

DARK MODE: toggled by a .dark class on <body>, set by tutorials.js via an injected #theme-switcher, NOT by prefers-color-scheme - that media query does not appear in the stylesheet. Every dark rule is a hand-written override of a specific selector (.dark article, .dark aside, .dark del, .dark .keyword, ...). Palette: light = #eee page / #fafafa article card / #222 text / #a00 accent; dark = #111 page / #333 article card / #aaa text / #f44 accent. Syntax token colours are fully re-mapped for dark rather than reused.

FIXED WIDTH, NOT RESPONSIVE: <meta name="viewport" content="width=768"> plus max-width:768px on article, body>header and body>footer. The site opts out of responsive layout entirely and lets mobile browsers zoom a 768px page. That is why the non-scrolling <pre> is survivable and why the fixed top-right #toc never collides with content. Do not copy the geometry decisions without accounting for this.

INVALID CSS WORTH KNOWING: pre { overflow: none } - 'none' is not a valid overflow value, so the declaration is dropped and long code lines visibly overflow the block instead of scrolling. If you adapt the pre rule, use overflow-x: auto.

MARKUP CONVENTIONS THAT CARRY DESIGN MEANING: <code> for code identifiers, <em translate="no"> for Unity UI element names (Point, Graph, Point Prefab) - two different registers for two kinds of proper noun. Both <pre translate="no"> and <em translate="no"> suppress machine translation. Both are semantic, unstyled beyond the base rules.

No paywall, no JS-gated content - the full article body is in the served HTML. tutorials.js (45355 bytes, https://catlikecoding.com/unity/tutorials/tutorials.js) was also downloaded to confirm the aside-toggle and TOC-injection mechanisms quoted above; it is JS, not CSS, so it is not listed in cssFilesFetched.

Downloaded evidence lives at C:\Users\Rod\AppData\Local\Temp\claude\C--Users-Rod-Documents-ProjectFiles-Website\54a6653a-b92f-48bd-aae5-34a6aa020cc6\scratchpad\callout-sources\catlikecoding\ (page.html, basics-index.html, article.html, tutorials.css, tutorials.js).
