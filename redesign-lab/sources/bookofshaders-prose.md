# thebookofshaders.com - textbook prose

Sourced 2026-08-18 by curl, then independently re-grepped by a second agent against the
downloaded files. Only declarations marked CONFIRMED below survived that check.

- **Article read:** https://thebookofshaders.com/05/ (chapter "Algorithmic drawing / Shaping functions"). Discovered from href="05/" in the fetched root index, not guessed. Also fetched /00/, /01/, /03/, /11/, /13/, /appendix/, /glossary/ to cross-check which selectors are actually used.
- **Stylesheets downloaded:**
  - https://thebookofshaders.com/css/style.css
  - https://thebookofshaders.com/css/github.css
  - https://thebookofshaders.com/glslEditor/glslEditor.css
  - https://thebookofshaders.com/glslGallery/glslGallery.css

## Confirmed components (9)

### heading - `h1, h2 (and the shared h1, h2, h3 weight rule)`

The device is `line-height: 0px` on a 46px/34px italic serif heading: the line box collapses to zero, so the heading occupies no vertical space of its own and its rhythm is set entirely by `margin-top: 60px`. Hierarchy is carried by size + italic + a hard 60px gap, with zero weight change (font-weight: normal on h1/h2/h3), so a chapter title and its subtitle stack as one tight two-line unit rather than two separately-spaced blocks.

Source file: https://thebookofshaders.com/css/style.css

```css
h1 {
    font-size: 46px;
    font-style: italic;
    line-height: 0px;
    margin-top: 60px;
    color: #000;
}

h2 {
    font-size: 34px;
    font-style: italic;
    line-height: 0px;
    margin-top: 60px;
    color: #000;
}

h1, h2, h3 {
    font-weight: normal;
}
```

Used on the page as:

```html
<div id="content"><h1>Algorithmic drawing</h1>
<h2>Shaping functions</h2>
<p>This chapter could be named &quot;Mr. Miyagi's fence lesson.&quot; ...
```

> Verify pass: style.css:21-27 `h1 {` / `    font-size: 46px;` / `    font-style: italic;` / `    line-height: 0px;` / `    margin-top: 60px;` / `    color: #000;` / `}`; style.css:29-35 identical shape with `font-size: 34px` for h2; style.css:54-56 `h1, h2, h3 {` / `    font-weight: normal;` / `}`. All three blocks verbatim, no paraphrase. Note the h1,h2,h3 rule is NOT adjacent to h1/h2 - an `h3` block sits at 37-42 and `h4` at 44-52 between them, but the claim never asserted adjacency. USED: article.html:88 `<div id="content"><h1>Algorithmic drawing</h1>`, article.html:89 `<h2>Shaping functions</h2>`, article.html:101 `<h3>Step and Smoothstep</h3>`. h1/h2 present on 9/9 and 8/9 pages respectively.

### heading - `h4`

This is the site's ONLY callout-like device, and it is a heading rather than a box. h4 is reserved for two recurring labels, "Exercise" and "For your toolbox" (grep across the 6 chapter pages fetched returns only those two strings). The mechanism: 24px (larger than the 20px body) but greyed to #999 and indented 10px, so it reads as a quieter aside marker even though it is physically bigger than the prose. Half-leading (line-height: 12px on 24px text) again collapses it toward the following block.

Source file: https://thebookofshaders.com/css/style.css

```css
h4 {
    margin-top: 24px;
    margin-left: 10px;
    margin-bottom: 10px;
    font-size: 24px;
    line-height: 12px;
    font-weight: normal;
    color: #999;
}
```

Used on the page as:

```html
<h4>Exercise</h4>
<p>Take a look at the following table of equations made by <a href="http://www.kynd.info/log/">Kynd</a>. ...</p>
...
<h4>For your toolbox</h4>
<ul>
<li>
<p><a href="https://lygia.xyz/">LYGIA</a> is a shader library of reusable functions ...</p>
</li>
```

> Verify pass: style.css:44-52 `h4 {` / `    margin-top: 24px;` / `    margin-left: 10px;` / `    margin-bottom: 10px;` / `    font-size: 24px;` / `    line-height: 12px;` / `    font-weight: normal;` / `    color: #999;` / `}` - verbatim, all seven declarations match in order. USED: article.html:175 `<h4>Exercise</h4>`, article.html:178 `<h4>For your toolbox</h4>`, ch11.html:239 `<h4>For your toolbox</h4>`, ch13.html:171 `<h4>For your toolbox</h4>`.

### prose-link - `a  /  a:hover, a:visited, a:link, a:active`

Underline is replaced by a `border-bottom` that is deliberately LIGHTER than the link text (#ccc rule under #555 text, against #222 body text). The rule sits at the border edge rather than at the text-decoration baseline, so it clears descenders without needing underline-offset/skip-ink. There is no hover state at all: the four :hover/:visited/:link/:active selectors only re-assert `text-decoration: none`, so links never change on interaction. Note the links are darker-grey than the surrounding #222 prose, i.e. they are marked by being *quieter*, not louder.

Source file: https://thebookofshaders.com/css/style.css

```css
a {
    text-decoration: none;
    color: #555;
    border-bottom: 1px solid #ccc;
}

a:hover, a:visited, a:link, a:active {
    text-decoration: none;
}
```

Used on the page as:

```html
<p><a href="../glossary/?search=pow"><code>pow()</code></a> is a native function in GLSL and there are many others.</p>
<p>Replace the power function on line 22. Try other ones like: <a href="../glossary/?search=exp"><code>exp()</code></a>, <a href="../glossary/?search=log"><code>log()</code></a> and <a href="../glossary/?search=sqrt"><code>sqrt()</code></a>.</p>
```

> Verify pass: style.css:68-72 `a {` / `    text-decoration: none;` / `    color: #555;` / `    border-bottom: 1px solid #ccc;` / `}`. The pseudo-class rule is real but lives 56 lines away at style.css:128-130 `a:hover, a:visited, a:link, a:active {` / `    text-decoration: none;` / `}` - the claim presented them stacked, which reads as adjacent; they are not, though the selector label's "/" separator signals two rules. Text of both is verbatim. USED as prose links: article.html:99 `<p><a href="../glossary/?search=pow"><code>pow()</code></a> is a native function in GLSL...`. 49 `<a ` tags in article.html, 185 in glossary.html.

### inlinecode - `code`

The entire inline-code treatment is a font swap plus a size step-down: 16px mono inside 20px Baskerville body. No background chip, no padding, no border, no radius, no colour change. The 16px figure is chosen so mono x-height matches the serif optically (mono ex-height runs larger per em), so `vec3` sits in the line without breaking the leading. Inline code is used very heavily in this article (34 <code> elements) which is exactly why it carries no box.

Source file: https://thebookofshaders.com/css/style.css

```css
code {
    font-family: monospace;
    font-size: 16px;
}
```

Used on the page as:

```html
<p><strong>Quick Note</strong>: The <code>vec3</code> type constructor &quot;understands&quot; that you want to assign the three color channels with the same value, while <code>vec4</code> understands that you want to construct a four dimensional vector ...</p>
```

> Verify pass: style.css:159-162 `code {` / `    font-family: monospace;` / `    font-size: 16px;` / `}` - verbatim, sits under the comment banner `/* Regular code blocks` at style.css:155. USED as inline code: article.html:92 `...the normalized value of the <em>x</em> coordinate (<code>st.x</code>) in two ways...`; article.html:94 `<code>vec3</code>`. 34 `<code` occurrences in article.html, 51 in ch03.html, 31 in ch11.html.

### codeblock - `.language-glsl (siblings: .language-bash, .language-cpp, .language-html, .language-processing)`

The block chrome hangs off the highlight.js language class on the <code>, not off <pre>, which is why `.language-bash` needs `display: block` while the others rely on <pre>. Device: flat #ECECEC panel, 15px padding, 14px/1.5em mono, no border, no radius, no filename tab, no copy button, no line numbers, and it is NOT inset from the 800px measure. Note this is a second, smaller step-down (16px inline -> 14px block), so block code is the smallest type on the page. Across the 6 chapter pages fetched, `language-glsl` is the only one of the five language variants that ever appears in the markup.

Source file: https://thebookofshaders.com/css/style.css

```css
code {
    font-family: monospace;
    font-size: 16px;
}

.language-bash {
    background-color: #ECECEC;
    display: block;

    font-size: 14px;
    line-height: 1.5em;
    padding: 15px;
}

.language-glsl {
    background-color: #ECECEC;

    font-size: 14px;
    line-height: 1.5em;
    padding: 15px;
}
```

Used on the page as:

```html
<pre><code class="language-glsl">float y = smoothstep(0.2,0.5,st.x) - smoothstep(0.5,0.8,st.x);</code></pre>
```

> Verify pass: style.css:173-179 `.language-glsl {` / `    background-color: #ECECEC;` / (blank) / `    font-size: 14px;` / `    line-height: 1.5em;` / `    padding: 15px;` / `}` - verbatim including the blank line after background-color. `.language-bash` at style.css:164-171 also verbatim (it alone additionally carries `display: block;`). Siblings .language-cpp/-html/-processing confirmed present at style.css:181-203. USED: article.html:109 `<pre><code class="language-glsl">float y = smoothstep(0.2,0.5,st.x) - smoothstep(0.5,0.8,st.x);</code></pre>`; also ch03.html:91,99 and ch11.html:112,116,118,177,181. CAVEAT: `grep -oh 'language-[a-z]*' *.html | sort | uniq -c` returns only `10 language-glsl` - the fo

### codeblock - `.codeAndCanvas / .codeAndCanvas canvas / .codeAndCanvas .ge_editor / .CodeMirror / .simpleFunction`

This is the site's signature prose device: a live code block. The markup is an empty div carrying a `data` attribute naming a .frag file; glslEditor.js injects a CodeMirror editor plus a WebGL canvas into it. The layout mechanic is minimal and worth stealing: `float: right` on the canvas with `clear: both` + `min-height: 250px` on the wrapper, so the running output sits in the right gutter and the editor text wraps around it, and the wrapper reserves height before JS fills it (no layout jump). The two contexts are distinguished by background alone (#ECECEC for the editable shader, #F9F9F9 for the lighter one-line function plotter), matching the static `.language-glsl` panel so live and dead code read as the same object. The `.ge_*` classes are injected at runtime and appear nowhere in the served HTML.

Source file: https://thebookofshaders.com/css/style.css

```css
.codeAndCanvas {
    height:auto;
    min-height:250px;
    clear:both;
}

.codeAndCanvas canvas {
    float: right;
    position: relative;
    z-index: 1;
}

.codeAndCanvas .ge_editor {
    background: #ECECEC;
}

.CodeMirror {
    background: #ECECEC;
    font-size: 14px;
    line-height: 1.5em;
}

.simpleFunction {
    margin-left: auto;
    margin-right: auto;
    max-width: 700px;

}

.simpleFunction .CodeMirror {
    background: #F9F9F9;
    font-size: 14px;
    line-height: 1.5em;
}
```

Used on the page as:

```html
<div class="codeAndCanvas" data="linear.frag"></div>
<div class="codeAndCanvas" data="expo.frag"></div>
<div class="simpleFunction" data="y = sin(x);"></div>
<div class="simpleFunction" data="y = mod(x,0.5); // return x modulo of 0.5
"></div>
```

> Verify pass: style.css:216-220 `.codeAndCanvas {` / `    height:auto;` / `    min-height:250px;` / `    clear:both;` / `}` (unspaced colons preserved); :222-226 `.codeAndCanvas canvas {` / `    float: right;` / `    position: relative;` / `    z-index: 1;` / `}`; :228-230 `.codeAndCanvas .ge_editor {` / `    background: #ECECEC;` / `}`; :232-236 `.CodeMirror {` / `    background: #ECECEC;` / `    font-size: 14px;` / `    line-height: 1.5em;` / `}`; :238-243 `.simpleFunction {` ... with a stray blank line at :242 before the closing brace - the claim reproduced that blank line, which is a strong verbatim tell. Quote truncates mid-token at `.simpl`. USED: article.html:93 `<div class="codeAndCanvas" data="li

### figure - `img  (and the unused .imgcontainer / .caption pair)`

The real device is the width relationship: images are capped at 520px inside an 800px measure, so every image is inset ~35% narrower than the text column and auto-centred, producing a consistent gutter on both sides without any wrapper element. Images are bare <img> inside a <p>, no figure semantics at all. The `.caption` rule (italic, 16px, `text-align: right`) is a right-aligned caption device the author wrote and then never shipped, so treat it as an intention, not evidence of a rendered pattern.

Source file: https://thebookofshaders.com/css/style.css

```css
#content {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
}

img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 520px;
}

.imgcontainer {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 520px;
}

.caption {
    font-style: italic;
    font-size: 16px;
    line-height: 1.3;
    text-align: right;
}
```

Used on the page as:

```html
<p><img src="mr_miyagi.jpg" alt="The Karate Kid (1984)" /></p>
<p><img src="kynd.png" alt="Kynd - www.flickr.com/photos/kynd/9546075099/ (2013)" /></p>
<p><img src="graphtoy.png" alt="Iñigo Quilez - GraphToy (2010)" /></p>

IMPORTANT: `.caption` and `.imgcontainer` are NOT USED. grep for class="caption" and class="imgcontainer" across article.html plus /00/, /01/, /03/, /11/, /13/, /appendix/, /glossary/ returns zero hits, and there is no <figure> or <figcaption> element anywhere in any page fetched. The credit line lives in the alt attribute, which never renders.
```

> Verify pass: style.css:62-66 `#content {` / `    width: 800px;` / `    margin-left: auto;` / `    margin-right: auto;` / `}`; :74-79 `img {` / `    display: block;` / `    margin-left: auto;` / `    margin-right: auto;` / `    max-width: 520px;` / `}`; :81-86 `.imgcontainer {` (identical declarations to img); :88-93 `.caption {` / `    font-style: italic;` / `    font-size: 16px;` / `    line-height: 1.3;` / `    text-align: right;` / `}`. All verbatim. USED: article.html:88 `<div id="content">`, article.html:91 `<p><img src="mr_miyagi.jpg" alt="The Karate Kid (1984)" /></p>` (5 imgs in article.html, 24 in ch11.html). The claim's own "unused" hedge is CORRECT and independently verified: `imgcontainer` an

### figure - `.canvas`

A running shader is treated as a figure and given its own width tier: 700px max, wider than the 520px image cap but still inside the 800px measure. Same auto-centred block mechanic as img, so static and live media share one alignment rule with two different caps. In chapter 11 the canvas is wrapped in an <a> to the site's editor, making the whole figure a click-through to an editable version, which is a figure-as-affordance move rather than a caption.

Source file: https://thebookofshaders.com/css/style.css

```css
.canvas {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 700px;
}
```

Used on the page as:

```html
<canvas id="custom" class="canvas" data-fragment-url="cmyk-halftone.frag" data-textures="vangogh.jpg" width="700px" height="320px"></canvas>   (from https://thebookofshaders.com/00/)
<p><a href="../edit.php#11/lava-lamp.frag"><canvas id="custom" class="canvas" data-fragment-url="lava-lamp.frag"  width="520px" height="200px"></canvas></a></p>   (from https://thebookofshaders.com/11/)
```

> Verify pass: style.css:209-214 `.canvas {` / `    display: block;` / `    margin-left: auto;` / `    margin-right: auto;` / `    max-width: 700px;` / `}` - verbatim, sits under the banner `/* Interactive GLSL Elements` at style.css:205. USED: page.html:100 `<canvas id="custom" class="canvas" data-fragment-url="src/moon/moon.frag" data-textures="src/moon/moon.jpg" width="350px" height="350px"></canvas>`; ch00.html:89; ch11.html:184,:230,:234.

### heading - `.header, .toc-header, .header .subtitle a, .header a`

A masthead built entirely from right-alignment and em-relative scaling: one 16px grey block, inside which the title line scales UP to 1.3em italic and the language row scales DOWN to 0.8em italic, so two ranks come from a single font-size declaration plus two multipliers. The `border: 0!important` exists specifically to strip the global `a { border-bottom: 1px solid #ccc }` underline rule inside this block, meaning the underline is the site-wide default and its ABSENCE is what marks chrome as distinct from prose. Terminated by a plain <hr> before the content div.

Source file: https://thebookofshaders.com/css/style.css

```css
.header {
    font-size: 16px;
    line-height: 16px;
    margin-top: 60px;
    text-align: right;
    color: #999;
}

.toc-header {
    font-size: 16px;
    line-height: 16px;
    margin-top: 24px;
    margin-bottom: 24px;
    text-align: right;
    color: #999;
}

.header .subtitle a,
.toc-header .subtitle a {
    font-size: 1.3em;
    font-style: italic;
    text-decoration: none;
    border: 0!important;
}

.header a,
.toc-header a {
    font-size: 0.8em;
    font-style: italic;
    text-decoration: none;
    border: 0!important;
}
```

Used on the page as:

```html
<div class="header">
    <p class="subtitle"><a href="https://thebookofshaders.com/">The Book of Shaders</a> by <a href="http://patriciogonzalezvivo.com">Patricio Gonzalez Vivo</a> &amp; <a href="http://jenlowe.net">Jen Lowe</a> </p>
    <p>  <a href="?lan=id">Bahasa Indonesia</a> - <a href="?lan=vi">Tiếng Việt</a> - <a href="?lan=jp">日本語</a> - ... - <a href=".">English</a></p>
</div>
<hr>
```

> Verify pass: style.css:95-101 `.header {` / `    font-size: 16px;` / `    line-height: 16px;` / `    margin-top: 60px;` / `    text-align: right;` / `    color: #999;` / `}`; :103-110 `.toc-header {` same shape with `margin-top: 24px;` plus `margin-bottom: 24px;`; :112-118 `.header .subtitle a,` / `.toc-header .subtitle a {` / `    font-size: 1.3em;` / `    font-style: italic;` / `    text-decoration: none;` / `    border: 0!important;` / `}`. All verbatim. The quote truncates mid-declaration at `border: 0` - actual is `border: 0!important;` - but that is truncation, not a wrong value. The fourth named selector is real too: style.css:120-126 `.header a,` / `.toc-header a {` / `    font-size: 0.8em;` ... 

## NOT confirmed - do NOT cite these (3)

- `.hljs` (codeblock) - CSS TEXT IS CORRECT: github.css:7-13 `.hljs {` / `  display: block;` / `  overflow-x: auto;` / `  padding: 0.5em;` / `  color: #333;` / `  background: #f8f8f8;` / `}`; :15-19 `.hljs-comment,` / `.hljs-quote {` / `  color: #998;` / `  font-style: italic;` / `}`; :21-26 `.hljs-keyword,` / `.hljs-selec
- `ul / li  (prose lists)  +  .navigationBar, li.navigationBar` (list) - THE 'ul / li (prose lists)' HALF OF THIS SELECTOR DOES NOT EXIST. `grep -nE '^\s*(ul|ol|li)\s*[,{]' style.css` returns no matches, exit 1. There is no bare `ul`, `ol`, or `li` rule anywhere in the 408-line file - prose lists on this site receive zero styling from style.css and inherit browser defaul
- `[data-theme='dark'] and its counter-invert children` (aside-sidenote) - CSS TEXT IS CORRECT: style.css:378-388 `.themeSwitcher {` / `    appearance: none;` / `    background: none;` / `    border: none;` / `    margin-bottom: 1.25em;` / `    font: inherit;` / `    font-size: 0.8em;` / `    font-style: italic;` / `    color: #555;` / `    cursor: pointer;` / `}`; :390-39

## Roles this site does NOT have

- callout
- pullquote
- blockquote
- tldr-summary
- table
- footnote
- toc

## Notes

BUILD: Plain static HTML generated from Markdown (the prose shape - `<p><img ...></p>`, `<pre><code class=\"language-glsl\">`, `<ul><li><p>` loose lists - is textbook Markdown output). No CSS-in-JS, no Tailwind, no hashed class names, no build hashes on the CSS URLs. Only 4 stylesheets total, and the site's own is 407 lines / 6.2KB. Everything is directly readable and quotable. style.css carries a header comment crediting Scott Murray's alignedleft.com as its base, so some of these rules originate there.\n\nTHE HEADLINE FINDING - THERE ARE NO CALLOUTS. This site has no admonition/note/tip/warning boxes of any kind. grep across style.css, github.css, glslGallery.css and glslEditor.css for note/notice/callout/admonition/warning/tip/info/alert/aside/panel/box/tldr/summary/sidenote/marginnote/footnote produces nothing usable. The class inventory across all 7 pages fetched is exhaustively: navigationBar, language-glsl, codeAndCanvas, simpleFunction, subtitle, header, toc-header, canvas, glslGallery. That is the entire vocabulary.\n\nWhat the site does INSTEAD of a callout is worth more than a box would be. Two substitutes, both provable:\n(1) The inline bolded lead-in. Verbatim from /05/: `<p><strong>Quick Note</strong>: The <code>vec3</code> type constructor ...</p>`. That is a normal paragraph. There is NO CSS rule for it - no `strong` rule exists in style.css at all, so it is just browser-default bold. The note is set off by wording alone.\n(2) The h4 hanging label (\"Exercise\", \"For your toolbox\"), reported as a finding above. Grey, indented 10px, larger than body but quieter in colour. It is the only structural aside device on the site.\n\nNO BLOCKQUOTE ANYWHERE. Zero `<blockquote>` elements across all 7 pages, and zero blockquote rules in any stylesheet (the only `quote` hit is `.hljs-quote`, a syntax-highlighting token for quoted strings, not a prose quote). Same for `<figure>`/`<figcaption>` (zero), `<table>` (zero), footnotes (zero), and any in-article TOC (zero - `.toc-header` is the language-switcher strip on the index page, not a contents list).\n\nDEAD CSS - do not treat as shipped patterns. `.caption` (italic 16px right-aligned) and `.imgcontainer` are defined in style.css but used nowhere in any HTML fetched. Four of the five `.language-*` code-block variants (bash, cpp, html, processing) are also unused; only `language-glsl` appears. Photo credits live in `alt` attributes (`alt=\"Kynd - www.flickr.com/photos/kynd/9546075099/ (2013)\"`), which never render, so there is no visible caption on this site at all.\n\nRUNTIME-INJECTED, NOT IN SOURCE. Three things are styled in CSS but absent from the served markup: highlight.js `.hljs-*` classes (added by ../src/highlight.min.js), the glslEditor `.ge_*` / `.CodeMirror` chrome (injected into `<div class=\"codeAndCanvas\" data=\"linear.frag\"></div>`), and the dark-mode `.themeSwitcher` button plus `[data-theme]` attribute (set by ../src/main.js). Each is flagged in its finding's htmlUsage. I did not run JS, so those are CSS-provable and markup-unprovable.\n\nTHE TRANSFERABLE SYSTEM, for what it's worth to a post page: 20px Baskerville body at line-height 1.3, #222 on white, in a fixed 800px column. Three nested width tiers - text 800px, live shader canvas 700px, static image 520px - all auto-centred, which is what gives the page its rhythm. Type steps DOWN as it gets more technical: 20px serif prose, 16px mono inline code, 14px mono block code. Headings go italic and lose their line box (`line-height: 0`) so spacing is pure margin. Links are grey-on-grey with a #ccc bottom border and literally no hover state. Flat #ECECEC code panels, no radius, no border, no shadow, no chrome, no copy button. Nothing is decorated; every distinction is size, italic, grey value, or whitespace. No responsive rules whatsoever - the 800px `#content` and 60px body margins are fixed, there is not a single media query in the file.\n\nCaveat on provenance for reuse: style.css opens with \"Copyright 2015 Patricio Gonzalez Vivo\" and credits Scott Murray's design/code (2011-2012) as its base, so if any of this gets adapted, log it as Remixed with that attribution chain rather than True.\n\nDownloads kept at C:\\Users\\Rod\\AppData\\Local\\Temp\\claude\\C--Users-Rod-Documents-ProjectFiles-Website\\54a6653a-b92f-48bd-aae5-34a6aa020cc6\\scratchpad\\callout-sources\\bookofshaders\\ (page.html, article.html, ch00/01/03/11/13.html, appendix.html, glossary.html, style.css, github.css, glslEditor.css, glslGallery.css).
