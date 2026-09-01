# iquilezles.org - article prose

Sourced 2026-08-18 by curl, then independently re-grepped by a second agent against the
downloaded files. Only declarations marked CONFIRMED below survived that check.

- **Article read:** https://iquilezles.org/articles/smin (also fetched and cross-checked: /articles/raymarchingdf, /articles/simplepathtracing, /articles/filtering)
- **Stylesheets downloaded:**
  - https://iquilezles.org/style.css?v=2

## Confirmed components (11)

### codeblock - `.code / .codeK / .codeL / .codeS / .codeComment`

The code block has NO chrome at all: no background, no border, no padding, no border-radius, no filename bar, no copy button. It is a plain div separated from prose by three switches only - Courier, font-weight:bold, a lighter grey (#dcdcdc vs body #c0c0c0), and line-height dropped from 1.8 to 1.35. Highlighting is server-rendered spans (keyword/literal/string/comment) rather than a JS highlighter; there is no <pre> or <code> tag anywhere - white-space:pre on the div does the whole job.

Source file: https://iquilezles.org/style.css?v=2

```css
.code{overflow:auto;font-family:Courier,sans-serif,monospace;font-size:1em;font-weight:bold;color:#dcdcdc;text-align:left;vertical-align:text-top;white-space:pre;line-height:1.35;height:auto;}.codeK{color:#88a8c8;}.codeL{color:#c088a8;}.codeS{color:#da9f89;}.codeComment{color:#87b054;}
```

Used on the page as:

```html
<div class="code"><span class="codeK">float</span> min( <span class="codeK">float</span> a, <span class="codeK">float</span> b )
{
    <span class="codeK">return</span> (a&lt;b) ? a : b;
}</div><br>
```

> Verify pass: EXACT byte-for-byte substring match in style.css (grep -qF on the full claimed string succeeded): `.code{overflow:auto;font-family:Courier,sans-serif,monospace;font-size:1em;font-weight:bold;color:#dcdcdc;text-align:left;vertical-align:text-top;white-space:pre;line-height:1.35;height:auto;}.codeK{color:#88a8c8;}.codeL{color:#c088a8;}.codeS{color:#da9f89;}.codeComment{color:#87b054;}`. USAGE: `class="code"` x43 across the HTML (27 in article-smin.html, 12 in article-simplepathtracing.html, 4 in article-filtering.html); markup pattern is `<div class="code"><span class="codeComment">// sample a procedural pattern</span>` (article-filtering.html). codeK x438, codeL x192, codeComment x84 total. C

### codeblock - `::-webkit-scrollbar / ::-webkit-scrollbar-thumb`

Horizontal code overflow is handled by a global 8px scrollbar whose track is the exact page background (#282828) and whose thumb is a single mid-grey (#505050) with a 4px radius. The scrollbar track disappearing into the page means an unscrolled code block shows nothing at all - the chrome exists only when it is needed.

Source file: https://iquilezles.org/style.css?v=2

```css
::-webkit-scrollbar{height:8px;width:8px;background:#282828;}::-webkit-scrollbar-thumb{background:#505050;-webkit-border-radius:4px;}
```

Used on the page as:

```html
Global rule, not class-scoped. The only overflowing elements inside an article body are the code divs (.code has overflow:auto) and the one table wrapper: <div style="overflow-x:auto;"><table> ... </table></div> (article-smin.html). So in prose this rule reads as the code block's scroll chrome.
```

> Verify pass: EXACT match in style.css: `::-webkit-scrollbar{height:8px;width:8px;background:#282828;}::-webkit-scrollbar-thumb{background:#505050;-webkit-border-radius:4px;}` - it is the second rule in the file, right after `*{...box-sizing...}`. USAGE: pseudo-elements have no class to grep, so I verified scrollable containers exist that would trigger them: `.code{overflow:auto;...}` is applied 43 times, and article-smin.html:754 has `<div style="overflow-x:auto;"><table>`. Both produce the styled scrollbar.

### codeblock - `@media only screen and (max-width:1280px){ .code{...} }`

Rather than wrapping or scrolling more on narrow screens, the code is shrunk to 0.8em and the leading tightened to 120% so more columns fit before overflow kicks in. Prose font-size is left untouched - only the monospace run is scaled.

Source file: https://iquilezles.org/style.css?v=2

```css
.code{ font-size:0.8em;line-height:120%;}
```

Used on the page as:

```html
Same .code divs as above; this is the only responsive treatment given to them. Full context in the file: "@media only screen and (max-width:1280px){ ... .code{ font-size:0.8em;line-height:120%;} }"
```

> Verify pass: EXACT match in style.css: `.code{ font-size:0.8em;line-height:120%;}` (note the space after the brace, reproduced correctly in the claim). Verified it is INSIDE the media query by reading the brace scope: `@media only screen and (max-width:1280px){ body>div>header{...} ... figure{ padding-right:0px;}.code{ font-size:0.8em;line-height:120%;}}` - it is the final rule before the media block's closing brace, after which `.download-mtt{...}` resumes at top level. USAGE: the `.code` it overrides is used 43x (see claim 1).

### codeblock - `.partsC + .part50 (side-by-side code comparison)`

The site's entire layout vocabulary is one flex row (.parts / .partsL / .partsC / .partsB, differing only in justify-content) plus fixed-percentage children (.part25 .part30 .part40 .part50 .part60 .part70). Two code blocks sit side by side purely by wrapping them in .partsC + two .part50, and the media query flips the row to a column and every child to width:100%. Same primitive is reused for image pairs and figure grids - there is no separate figure system.

Source file: https://iquilezles.org/style.css?v=2

```css
.partsC{ display:flex;justify-content:space-around;padding:0px;margin:0px;flex-wrap:wrap;}
.part,.part25,.part30,.part40,.part50,.part60,.part70{ justify-content:flex-start;margin:0px;padding:0px;padding-bottom:32px;padding-right:32px;}.part50{ width:50%;}
/* and in the max-width:1280px media query: */
.partsC{ flex-direction:column;}
.part,.part25,.part30,.part40,.part50,.part60,.part70{ padding-right:0px;width:100%;}
```

Used on the page as:

```html
<div class="partsC">

<div class="part50">
<div class="code"><span class="codeComment">// exponential</span>
<span class="codeK">float</span> smin( <span class="codeK">float</span> a, <span class="codeK">float</span> b, <span class="codeK">float</span> k )
{
    k *= <span class="codeL">1.0</span>;
...
}</div>
</div>

<div class="part50">
<div class="code"><span class="codeComment">// root</span>
```

> Verify pass: All quoted fragments EXACT in style.css: `.partsC{ display:flex;justify-content:space-around;padding:0px;margin:0px;flex-wrap:wrap;}`, `.part,.part25,.part30,.part40,.part50,.part60,.part70{ justify-content:flex-start;margin:0px;padding:0px;padding-bottom:32px;padding-right:32px;}`, `.part50{ width:50%;}`, and inside the 1280px media query `.partsC{ flex-direction:column;}`. USAGE: `class="partsC"` x20, `class="part50"` x34, `class="part"` x51. The parenthetical 'side-by-side code comparison' is literally true - article-smin.html:96-99 reads `<div class="partsC">` / `<div class="part50">` / `<div class="code"><span class="codeComment">// exponential</span>`. MINOR: the claim's quote of the m

### inlinecode - `.formulaText`

Math is not code, so it gets the opposite switch from .code: a serif face (Times) at 1.25em instead of a mono face, 4px of horizontal breathing room, and slightly tightened leading. Sub-terms are tinted with per-instance inline colours that match the colours of the curves in the accompanying plot image, so text and figure are keyed to each other. This is the site's only non-mono typographic run.

Source file: https://iquilezles.org/style.css?v=2

```css
.formulaText{font-size:1.25em;font-family:"Times New Roman",Times,serif;padding-left:4px;padding-right:4px;line-height:1.5em;}
```

Used on the page as:

```html
<span class="formulaText"><span style="color:#9105D3">g(x)</span> = (x&middot;(2+x)+1)/4</span><br>
<span class="formulaText"><span style="color:#1F5CFE">g(x)</span> = (1+3x&middot;(x+1)-|x<sup>3</sup>|)/6</span><br>
```

> Verify pass: EXACT match in style.css: `.formulaText{font-size:1.25em;font-family:"Times New Roman",Times,serif;padding-left:4px;padding-right:4px;line-height:1.5em;}` - property order, the quoted font name, and the `1.5em` line-height all reproduced verbatim. USAGE: `class="formulaText"` appears 40 times (all in article-smin.html).

### figure - `.formula / .formulaInline (mix-blend-mode:screen)`

The plots and formulas are opaque PNGs rendered on black. mix-blend-mode:screen makes black pixels vanish into the #282828 page, so a rectangular raster image reads as transparent line-art with no alpha channel and no per-image cropping. .formulaInline adds vertical-align:middle so a raster equation sits on the text baseline mid-sentence. One declaration solves image-on-dark-background for the whole site.

Source file: https://iquilezles.org/style.css?v=2

```css
.formulaInline{vertical-align:middle;mix-blend-mode:screen;}.formula{max-width:100%;height:auto;mix-blend-mode:screen;}
```

Used on the page as:

```html
<div class="part50"><img class="myPicture formula" src="gfx04.png"/><br>min(a(x),b(x))</div>

and inline in a sentence:
So, lets start the analysis by calling our smooth-minimum <img class="formulaInline" src="for40.png"/>. Then its gradient will depend on the gradients of the input SDFs <b>a</b> and <b>b</b> like this:
```

> Verify pass: EXACT match in style.css: `.formulaInline{vertical-align:middle;mix-blend-mode:screen;}.formula{max-width:100%;height:auto;mix-blend-mode:screen;}` - the two rules are adjacent in the file exactly as quoted. USAGE: `grep -oh 'class="[^"]*formula[^"]*"' *.html` returns `class="formulaInline"` x2 and `class="myPicture formula"` x32. Worth noting `.formula` is never used alone - it is always composed onto `.myPicture` - but that is real usage, and the mix-blend-mode:screen is what knocks the black background out of the formula PNGs on the #282828 body.

### figure - `.myPicture / .imgFooter (and the unused figure{} rule)`

The caption is a <br> and a span - same size as body text (font-size:1em), same weight, left-aligned, no italic, no smaller grey. The only thing separating caption from prose is that it sits inside the image's layout box. Captions are often a single word ('Minimum'). Nothing draws a box, rule, or background around a figure; spacing comes from the .part padding-bottom:32px.

Source file: https://iquilezles.org/style.css?v=2

```css
.myFigure{margin:0px;}.myPicture{max-width:100%;height:auto;}
.imgFooter{font-size:1em;font-weight:normal;text-align:left;}
figure{padding:0px;padding-bottom:32px;padding-right:32px;display:inline-block;margin-left:auto;margin-right:auto;}
/* max-width:1280px: */ figure{ padding-right:0px;}
```

Used on the page as:

```html
Caption pattern actually used (article-simplepathtracing.html):
<center><img class="myPicture" src="gfx01.jpg" /><br><span class="imgFooter">A path traced fractal, brute forced, rendered in around one minute</span></center>

and the grid variant (article-smin.html):
<div class="partsC">
<div class="part"><img class="myPicture" src="gfx00.jpg"/><br>Minimum</div>
<div class="part"><img class="myPicture" src="gfx01.jpg"/><br>Smooth-minimum</div>
</div>

IMPORTANT: <figure> and <figcaption> appear ZERO times in all four fetched articles, and .myFigure appears zero times. The figure{} and .myFigure{} rules are dead in the article pages I fetched.
```

> Verify pass: All four quoted blocks EXACT in style.css: `.myFigure{margin:0px;}.myPicture{max-width:100%;height:auto;}`, `.imgFooter{font-size:1em;font-weight:normal;text-align:left;}`, `figure{padding:0px;padding-bottom:32px;padding-right:32px;display:inline-block;margin-left:auto;margin-right:auto;}`, and in the media query `figure{ padding-right:0px;}`. USAGE of the two NAMED selectors: `myPicture` x100 (59 smin, 36 raymarchingdf, 4 simplepathtracing, 1 filtering), e.g. `<img class="myPicture" src="gfx00.jpg"/>`; `imgFooter` x2, e.g. `<span class="imgFooter">A path traced fractal, brute forced, rendered in around one minute</span>`. The claim's own parenthetical correctly flags `figure{}` as unused - 

### heading - `h3 (+ bare <hr>, which has no CSS rule at all)`

Section headings are de-emphasised, not emphasised: font-weight is explicitly reset to normal and the only signal is pure white (#ffffff) against #c0c0c0 body text. The horizontal rule underneath is a completely unstyled <hr>, i.e. the browser default inset border, and vertical rhythm around it comes from literal <br> tags. Hierarchy is carried by colour value alone, with a hairline for the section break - no size jump, no bold, no numbering, no anchor link.

Source file: https://iquilezles.org/style.css?v=2

```css
h3{ color:#ffffff;font-weight:normal;}h2{ color:#ffffff;font-weight:normal;}
/* there is NO hr{} rule in style.css - grep -c 'hr{' returns 0 */
```

Used on the page as:

```html
<h3>Intro</h3><hr>
<br>
One of the basic building blocks of Signed Distance Field (SDF) modeling ...

<h3>A list of Smooth-minimums</h3><hr>

<h3>The <b>DD</b> Family</h3><hr>

(13 <hr> tags, 14 <h3> tags in article-smin.html; each section is preceded in source by a comment ruler: <!-- ---------------------------------------------------- -->)
```

> Verify pass: EXACT match in style.css: `h3{ color:#ffffff;font-weight:normal;}h2{ color:#ffffff;font-weight:normal;}`. The negative claim is TRUE - `grep -o 'hr{' style.css | wc -l` returns 0, and `grep -o 'hr *{' style.css | wc -l` also returns 0, so the <hr> is entirely browser-default. USAGE: 43 real `<h3>` tags across the pages, each immediately followed by a bare rule, e.g. article-smin.html:67 `<h3>Intro</h3><hr>` and :80 `<h3>A list of Smooth-minimums</h3><hr>`; <hr> counts are 13 (smin), 6 (simplepathtracing), 4 (filtering). CAVEAT: the quoted CSS bundles `h2{...}`, and `grep -oh '<h2>|<h3>' *.html | sort | uniq -c` returns ONLY `43 <h3>` - there is not a single <h2> in any downloaded page, so th

### prose-link - `a, a:hover, a.menu, a.menu:hover`

Two link colours, one hover target. Body links are a warm salmon (#ffa0a0) with text-decoration stripped entirely, and navigation/index links are the same grey as body text (#c0c0c0) so a list of 144 article titles reads as text, not as a wall of links. Both resolve to plain white on hover over a 0.2s transition, so hover is a value change (grey/salmon -> white) rather than an underline or background. External links get no marker of any kind.

Source file: https://iquilezles.org/style.css?v=2

```css
a{ color:#ffa0a0;text-decoration:none;transition:0.2s;}a:hover{ color:#ffffff;}a.menu{ color:#c0c0c0;transition:0.2s;} a.menu:hover{ color:#ffffff;}
```

Used on the page as:

```html
In-prose link (article-smin.html): "...SDF modeling based on <a href="../distfunctions">basic primitives</a> (as opposed to Grids or Neural Networks)..."

Index-list link (page.html): <a class="menu" href="smin">Smooth minimum for SDFs</a><br>
```

> Verify pass: EXACT match in style.css including the stray space before `a.menu:hover`: `a{ color:#ffa0a0;text-decoration:none;transition:0.2s;}a:hover{ color:#ffffff;}a.menu{ color:#c0c0c0;transition:0.2s;} a.menu:hover{ color:#ffffff;}`. USAGE: `<a class="menu"` x160 across the files (148 in page.html alone, 3 in each article), e.g. page.html `<a class="menu" href="/">Inigo Quilez`. Plain prose `<a>` is used throughout the articles, e.g. article-smin.html `<a href="../distfunctions">basic primitives</a>` and `<a href="https://www.shadertoy.com/view/WsSBzh">in Shadertoy</a>`.

### list - `li`

The entire list treatment is 12px of padding under each item. Markers, indentation, marker colour and list-style are all left to the browser default. The only authored decision is that items get air between them, because body line-height is already 1.8 and adjacent items would otherwise merge.

Source file: https://iquilezles.org/style.css?v=2

```css
li{padding-bottom:12px;}
```

Used on the page as:

```html
article-raymarchingdf.html:
<ul>
<li><a href="../">Articles on Raymarching</a> on this site</li>
<li><a href="/live">My video tutorials and streams about raymarching SDFs</a> on Youtube</li>
<li><a href="../nvscene2008">The lecture called "Rendering Worlds with Two Triangles" </a> that I have 2008 on the topic</li>
<li><a href="https://www.shadertoy.com/user/iq">All my Shadertoy examples</a>, some of which I list below:</li>
</ul>
(Lists are rare: 1 <ul> in raymarchingdf, none in smin, simplepathtracing or filtering.)
```

> Verify pass: EXACT match in style.css: `li{padding-bottom:12px;}`. USAGE is real but THIN, and I had to correct a false positive first: a naive `grep -c '<li'` reports 4-8 hits per file, but those are almost all `<link rel=...>` tags. `grep -c -- '<li>'` returns 0 / 0 / 0 / 0 for page.html, article-smin.html, article-filtering.html, article-simplepathtracing.html and 4 for article-raymarchingdf.html. That single list is the only list in the whole download: `<ul><li><a href="../">Articles on Raymarching</a> on this site</li><li><a href="/live">My video tutorials and streams about raymarching SDFs</a> on Youtube</li>...</ul>`. Rule exists, matches, and is exercised - on exactly one page.

### table - `<table> with per-article inline <style> (td, .ye, .no) and a scroll wrapper`

No borders, no zebra striping, no header row styling - column separation is a single padding-right:1rem on td, and the header row is just the first <tr> with an empty first cell. The comparison is carried entirely by colouring the words themselves (green #40e040 for Yes, red #ff6060 for No), so the table scans as a coloured grid of text with no ruling. It is wrapped in an inline overflow-x:auto div, which is the same escape hatch the code blocks use. Note the article defines these three rules in a page-local <style> block rather than in the global sheet.

Source file: https://iquilezles.org/style.css?v=2 (only .table/.tableRow/.tableCell live here - see note); the rules actually applied come from the inline <style> block in article-smin.html

```css
/* from style.css - defined, but NOT used in any fetched article (tableCell grep = 0): */
.table{display:table;}.tableRow{display:table-row;}.tableCell{display:table-cell;padding:12px;padding-right:24px;}

/* from the inline <style> block at line 60 of article-smin.html - this is what actually styles the table: */
td { padding-right:1rem; }
.ye{color:#40e040;}
.no{color:#ff6060;}
```

Used on the page as:

```html
<div style="overflow-x:auto;"><table>
<tr><td></td>                  <td>Rigid</td>          <td>Local</td>           <td>Cons.</td>        <td>Asso.</td></tr>
<tr><td>Quadratic</td>         <td class="ye">Yes</td> <td class="no">No</td>   <td class="ye">Yes</td>  <td class="no">No</td></tr>
<tr><td>Circular Geometric</td><td class="ye">Yes</td> <td class="ye">Yes</td>  <td class="no">No</td>   <td class="ye">Yes</td></tr>
</table></div>
```

> Verify pass: Both halves verified. (a) style.css contains EXACTLY `.table{display:table;}.tableRow{display:table-row;}.tableCell{display:table-cell;padding:12px;padding-right:24px;}`, and the claim's self-flag is TRUE: `grep -c 'tableCell|tableRow|class="table"' *.html` returns 0 for all five files. (b) The inline block IS at article-smin.html line 60 as claimed - `sed -n '60,64p'` gives `<style>` / `td { padding-right:1rem; }` / `.ye{color:#40e040;}` / `.no{color:#ff6060;}` / `</style>`, matching the quote character for character including the spaces inside the td braces. (c) The scroll wrapper is real: article-smin.html:754 `<div style="overflow-x:auto;"><table>` closing at :764 `</table></div>`. USAGE

## NOT confirmed - do NOT cite these (1)

- `.codigoInText` (inlinecode) - The rule EXISTS and matches exactly - grep -o 'codigoInText{[^}]*}' style.css returns `codigoInText{color:#40c040;}`. BUT IT IS NEVER USED. `grep -ic 'codigo' *.html` returns 0 for ALL five downloaded pages: article-filtering.html:0, article-raymarchingdf.html:0, article-simplepathtracing.html:0, ar

## Roles this site does NOT have

- callout
- pullquote
- blockquote
- aside-sidenote
- tldr-summary
- footnote
- toc

## Notes

HARD RESULT: this site has NO callouts, admonitions, notices, tips, warnings, pull quotes, blockquotes, asides, sidenotes, TL;DR boxes, footnotes or in-article TOC. Verified two ways: (1) style.css contains zero occurrences of the strings blockquote, aside, figcaption, note, notice, callout, admonition, warning, tip, alert, quote, pull, tldr, summary, sidenote, marginnote, footnote, toc, panel, box; (2) across the four fetched articles + the index page, grep for blockquote|aside|admonition|callout|"note|"warning|"tip|"info|tldr returns zero hits. There is also no pre{} or hr{} rule, and no <pre> or <code> tag in any article. Do not let anyone add a "note box" to this site's account - it does not have one.

SCALE: the entire site is ONE stylesheet, https://iquilezles.org/style.css?v=2, 4487 bytes, minified onto a single line (wc -l reports 0 newlines). No build system, no CSS-in-JS, no Tailwind, no hashed class names, no framework, no webfonts (font-family:sans-serif and Courier only), no JS beyond a 4-line menu script at the bottom. Articles are hand-written HTML with <meta charset="ISO-8859-1">. Paragraphs are mostly <br><br> rather than <p> (smin and raymarchingdf have zero <p> tags; simplepathtracing has 31, so the convention is inconsistent between articles).

THE RECIPE OF RESTRAINT (this is the transferable part). Everything is done with colour value on a single dark ground - no boxes, borders, backgrounds, radii, shadows or padding are ever used to separate a component from prose. The palette is literally: page #282828, body text #c0c0c0, headings/hover #ffffff, links #ffa0a0, code #dcdcdc, syntax #88a8c8 / #c088a8 / #da9f89 / #87b054, and per-article accents. Components differ from prose only by (a) colour, (b) font family, (c) line-height. Verbatim baseline: "body{background-color:#282828;color:#c0c0c0;font-style:normal;font-size:1.125rem;line-height:1.8;font-family:sans-serif;..." and the measure is set by "div#container{width:100%;max-width:120ch;min-height:100vh;padding-top:32px;padding-left:24px;padding-right:24px;margin-left:auto;margin-right:auto;}" - note max-width in ch, not px, and 120ch is very wide because the column is routinely split into two .part50 halves.

DEAD SELECTORS in the live sheet (defined, used nowhere in the pages I fetched): .codigoInText, .myFigure, figure{}, .table/.tableRow/.tableCell, .codeS, .blog_* (belongs to a separate blog section, not /articles/), .download-mtt. Treat these as history, not as design.

ONE RESPONSIVE BREAKPOINT for the whole site: @media only screen and (max-width:1280px), which flips every flex row to a column, sets every .partN to width:100%, and shrinks .code to 0.8em / 120% line-height. Nothing else changes.

MECHANISM WORTH STEALING: mix-blend-mode:screen on formula/plot images (.formula and .formulaInline). Black-background PNGs drop their background into the dark page with no alpha channel needed, and .formulaInline{vertical-align:middle} lets a raster equation sit inline in a sentence. Also worth noting: the inline formula colours (e.g. style="color:#9105D3") are chosen to match the curve colours in the plot image directly above, keying text to figure without a caption reference.

FILES ON DISK: C:\Users\Rod\AppData\Local\Temp\claude\C--Users-Rod-Documents-ProjectFiles-Website\54a6653a-b92f-48bd-aae5-34a6aa020cc6\scratchpad\callout-sources\iquilezles\ - page.html (the /articles/ index), article-smin.html, article-raymarchingdf.html, article-simplepathtracing.html, article-filtering.html, style.css.
