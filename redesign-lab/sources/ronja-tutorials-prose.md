# ronja-tutorials.com - shader tutorial prose

Sourced 2026-08-18 by curl, then independently re-grepped by a second agent against the
downloaded files. Only declarations marked CONFIRMED below survived that check.

- **Article read:** https://www.ronja-tutorials.com/post/012-fresnel/ (second article cross-checked: https://www.ronja-tutorials.com/post/054-unlit-dynamic-decals/)
- **Stylesheets downloaded:**
  - https://www.ronja-tutorials.com/dist/css/app.d876a0cc99d23e9edadbac7fc6abde13.css
  - https://www.ronja-tutorials.com/css/main.css

## Confirmed components (5)

### heading - `.hanchor:link / .hanchor:visited / .hanchor:hover`

The anchor mark is a literal emoji glyph (🔗 with U+FE0E text-presentation selector) sitting INLINE after the heading text, not an absolutely-positioned pilcrow in the margin. It is always visible, tinted silver so it reads as furniture rather than content, and darkens to gray on hover. Only 3 declarations and no JS. Note: the `visibility: visible` on :hover is vestigial - no rule anywhere in either stylesheet ever sets `visibility: hidden` on .hanchor (grep count of 'hanchor' in app.css is 0), so the mark never hides.

Source file: https://www.ronja-tutorials.com/css/main.css

```css
.hanchor:link {
	text-decoration: none;
	color:silver ;
}

.hanchor:visited {
	text-decoration: none;
	color:silver ;
}

.hanchor:hover { 
	visibility: visible;
	color:gray !important;
}
```

Used on the page as:

```html
<h2 id="summary">Summary <a href="#summary" class="hanchor" ariaLabel="Anchor">🔗&#xFE0E;</a> </h2>

and

<h2 id="highlighting-one-side-of-the-model">Highlighting one Side of the Model <a href="#highlighting-one-side-of-the-model" class="hanchor" ariaLabel="Anchor">🔗&#xFE0E;</a> </h2>
```

> Verify pass: EXISTS in the named file. main.css (298 bytes total, linked from every page as href="/css/main.css") contains this as lines 1-13 - it is literally the first thing in the file. Mechanical diff of the claimed text vs `sed 's/\r$//' main.css | sed -n '1,14p'` returned EXACT MATCH (file is CRLF; claim is LF - only difference). Actual lines: `.hanchor:link {` / tab `text-decoration: none;` / tab `color:silver ;` / `}` ... `.hanchor:hover { ` (note trailing space after brace, present in both) / tab `visibility: visible;` / tab `color:gray !important;`. USED on page: article.html has 4 occurrences, article2.html has 8. Real markup: `<h2 id="summary">Summary <a href="#summary" class="hanchor" ariaLa

### figure - `.nested-img img`

This is the site's OVERRIDE of the Tachyons default, and the override is the whole device: Tachyons ships `.nested-img img { width: 100%; max-width: 100%; display: block; }` (app.css:5643) which force-stretches every screenshot to full column width. main.css loads second and flips it to `width: auto` + `max-height: 400px`, so a tutorial screenshot renders at its intrinsic size, centred in the flow, capped at 400px tall. Small diagrams stay small; only the 100px min-width floor stops tiny sprites vanishing. No caption, no frame, no border - the image is bare in the prose.

Source file: https://www.ronja-tutorials.com/css/main.css

```css
.nested-img img {
	width: auto;
	min-width: 100px;
	max-width: 100%;
	max-height: 400px;
}
```

Used on the page as:

```html
Container: <div class="w-100 nested-copy-line-height lh-copy sans-serif f4 nested-links nested-img mid-gray pr4-l">
Image inside it: <img src="/assets/images/posts/012/Result.jpg" alt="Material with fresnel effect">
(no <figure> and no <figcaption> anywhere in either article fetched)
```

> Verify pass: EXISTS in the named file. main.css lines 16-21, the only other rule in that 298-byte file. Mechanical diff vs claim returned EXACT MATCH, including the file ending with no trailing newline after the closing `}`. Actual text: `.nested-img img {` / `width: auto;` / `min-width: 100px;` / `max-width: 100%;` / `max-height: 400px;` / `}`. USED on page: the container class appears in article.html and article2.html: `<div class="w-100 nested-copy-line-height lh-copy sans-serif f4 nested-links nested-img mid-gray pr4-l">`. The descendant `img` part of the selector genuinely matches - parsing 3000 chars after the container found 3 real images, e.g. `<img src="/assets/images/posts/012/Result.jpg" alt="

### codeblock - `pre, .pre / pre code / pre`

The mechanism worth stealing is the geometry, not the colour: padding is applied to the inner `code` (block-level, 1.5em all round) while the scroll container is the outer `pre`, so the horizontal scrollbar rides the full block edge and the padding scrolls WITH the code instead of clipping it. `line-height: 2` at `font-size: .875rem` is very airy for code - roughly 28px rows on a 14px face. Also note the two conflicting overflow shorthands: `overflow-x/overflow-y` are immediately overwritten by `overflow: scroll` on the next line, so both bars are forced on. IMPORTANT: the `background-color: #222` on `pre` is dead - Hugo's Chroma writes an inline `background-color:#fff` on every `<pre>`, which wins. Every syntax colour is an inline style on a `<span>` (118 occurrences of `style="color:#` in one article); the `.highlight` wrapper class has ZERO CSS rules in either stylesheet (grep for '.highlight' in app.css returns nothing). There is no filename tab, no header strip, no copy button, no line numbers.

Source file: https://www.ronja-tutorials.com/dist/css/app.d876a0cc99d23e9edadbac7fc6abde13.css

```css
pre, .pre  {
  overflow-x: auto;
  overflow-y: hidden;
  overflow:   scroll;
}

pre  code {
  display: block;
  padding: 1.5em 1.5em;
  white-space: pre;
  font-size: .875rem;
  line-height: 2;

}

pre {
  background-color: #222;
  color: #222;
  white-space: pre;

  -webkit-hyphens: none;

      -ms-hyphens: none;

          hyphens: none;
  position: relative;
}
```

Used on the page as:

```html
<div class="highlight"><pre style="background-color:#fff;-moz-tab-size:2;-o-tab-size:2;tab-size:2"><code class="language-glsl" data-lang="glsl"><span style="color:#888">//input struct which is automatically filled by unity</span>
<span style="color:#080;font-weight:bold">struct</span> Input {
    float2 uv_MainTex;
    float3 worldNormal;
    INTERNAL_DATA
};
</code></pre></div>
```

> Verify pass: EXISTS in the named file. app.css (5940 lines, linked as href="/dist/css/app.d876a0cc99d23e9edadbac7fc6abde13.css" - hash matches the claimed URL) at lines 5727-5753. Mechanical diff of the full claimed 3-block text vs `sed -n '5727,5753p'` returned EXACT MATCH, preserving the odd double spaces in `pre, .pre  {` and `pre  code {`, the `overflow:   scroll;` triple space, the stray blank line before `}` in the `pre code` block, and the blank-line-separated `-webkit-hyphens` / `-ms-hyphens` / `hyphens` indentation ladder. USED on page: 8 `<pre>` in article.html, 11 in article2.html. IMPORTANT CAVEAT (flagged, not disqualifying): every `<pre>` on the page carries an inline override - `<pre style

### prose-link - `.nested-links a / .nested-links a:hover, .nested-links a:focus`

Colour-only link treatment scoped by a single container class - no underline rule at all, so links inherit the UA underline and only the hue changes. The device is that hover goes LIGHTER (#357edd -> #96ccff) against the near-white page rather than darker, which is unusual and reads as the link receding/softening on approach. `:focus` is grouped with `:hover` so keyboard users get the same feedback. The site's own one-line addition is `word-wrap: break-word`, purely so long bare tutorial URLs cannot blow out the 48rem measure. No external-link marker of any kind.

Source file: https://www.ronja-tutorials.com/dist/css/app.d876a0cc99d23e9edadbac7fc6abde13.css

```css
.nested-links a {
  color: #357edd;
  transition: color .15s ease-in;
}

.nested-links a:hover,
.nested-links a:focus {
  color: #96ccff;
  transition: color .15s ease-in;
}

/* and, appended later in the same file (line 5874), the site's own addition: */

.nested-links a{
  word-wrap: break-word;
}
```

Used on the page as:

```html
Container: <div class="w-100 nested-copy-line-height lh-copy sans-serif f4 nested-links nested-img mid-gray pr4-l">
Link inside prose: <p>You can generate the worldspace normals in non-surface shaders with a simple matrix multiplication, it&rsquo;s explained in my <a href="https://www.ronja-tutorials.com/post/010-triplanar-mapping/">triplanar mapping tutorial</a>.</p>
```

> Verify pass: EXISTS in the named file. app.css lines 5649-5658. Mechanical diff vs the claimed main block returned EXACT MATCH: `.nested-links a {` / `color: #357edd;` / `transition: color .15s ease-in;` / `}` then `.nested-links a:hover,` / `.nested-links a:focus {` / `color: #96ccff;` / `transition: color .15s ease-in;`. The claim's secondary assertion is also accurate: `grep -n 'nested-links' app.css` returns 5649, 5654, 5655, and 5874 - and `sed -n '5874,5876p'` yields exactly `.nested-links a{` / `word-wrap: break-word;` / `}`, confirming both the appended override AND the specific line number 5874 the claim cited (including the missing space before the brace, which distinguishes the site's own addi

### toc - `#TableOfContents ul li`

The entire in-article TOC is one declaration. It is an IN-FLOW block sitting between the post header and the first heading (not sticky, not a sidebar), it keeps the default UA bullets and indent, and the only intervention is 1em of breathing room between rows so the list reads as navigation rather than as a prose list. The 70px gap that separates it from the article body is a hardcoded INLINE style on the wrapper div, not CSS - worth knowing before copying, because it is unthemeable as shipped.

Source file: https://www.ronja-tutorials.com/dist/css/app.d876a0cc99d23e9edadbac7fc6abde13.css

```css
/* Put your custom styles here and run `npm start` from the "src" directory on */

#TableOfContents ul li {
  margin-bottom: 1em;
}
```

Used on the page as:

```html
<div style="margin-bottom: 70px;">
			<h3>Table Of Contents</h3>
			<nav id="TableOfContents">
  <ul>
    <li><a href="#summary">Summary</a></li>
    <li><a href="#highlighting-one-side-of-the-model">Highlighting one Side of the Model</a></li>
    <li><a href="#highlighting-the-outer-parts">Highlighting the outer Parts</a></li>
    <li><a href="#add-fresnel-color-and-intensity">Add Fresnel Color and Intensity</a></li>
  </ul>
</nav>
		</div>
```

> Verify pass: EXISTS in the named file. app.css lines 5857-5861. Mechanical diff including the leading comment returned EXACT MATCH: the comment `/* Put your custom styles here and run `npm start` from the "src" directory on */` then a blank line then `#TableOfContents ul li {` / `margin-bottom: 1em;` / `}`. The claim's pairing of that comment with this rule is correct - the comment is at 5857 and the rule immediately follows at 5859. USED on page: `<nav id="TableOfContents">` in article.html and article2.html. The descendant chain genuinely matches - parsing the node found 1 `<ul>` and 4 `<li>`: `<ul> <li><a href="#summary">Summary</a></li> <li><a href="#highlighting-one-side-of-the-model">...</a></li> .

## NOT confirmed - do NOT cite these (1)

- `.lh-copy blockquote` (blockquote) - CSS IS REAL BUT THE COMPONENT IS NEVER USED - this is the claim that fails. The selector does exist in the named file at app.css lines 5863-5872 and the mechanical diff returned EXACT MATCH, including the trailing blank line before the closing brace: `.lh-copy blockquote {` / `display: block;` / `fo

## Roles this site does NOT have

- callout / admonition (note, tip, warning, info) - THE PRIORITY ROLE, and it genuinely does not exist here
- pullquote
- inlinecode (no <code> outside <pre> in either article; no .code or inline-code rule in either stylesheet)
- figcaption (no <figure> or <figcaption> element in either article)
- aside-sidenote / marginnote
- tldr-summary (the 'Summary' on these pages is a plain <h2> section heading, not a styled box)
- footnote
- table
- list markers (no list-marker styling; article prose uses default UA <ul>/<ol> - the only list rule is `.nested-copy-line-height p, ul, ol { line-height: 1.5; }`)
- code block chrome: filename tab, header strip, copy button, line numbers

## Notes

HEADLINE FINDING, stated plainly: this site has NO callout/admonition system. The premise that a Unity/HLSL tutorial site is "near-certain to have note/warning boxes" is false for this one. Ronja writes warnings and asides as ordinary <p> paragraphs in the prose flow. I grepped both downloaded stylesheets for note|notice|callout|admonition|warning|tip|info|aside|alert|panel|box as class selectors and got zero hits, and grepped both fetched articles for the same words - the only matches were the word "info" inside "contentinfo" (a footer role attribute) and "tip" inside "multiplication"/"customisation". Do not let anyone downstream turn this into a callout source.

BUILD / STACK: Hugo 0.76.5 (per <meta name="generator">), Chroma for syntax highlighting, and TACHYONS as the CSS framework. This matters a lot for reuse: app.css is 5940 lines of which roughly the first 5700 are stock Tachyons utilities, and the markup is pure utility soup - the prose container is literally `class="w-100 nested-copy-line-height lh-copy sans-serif f4 nested-links nested-img mid-gray pr4-l"`. There are NO semantic component classes for prose. Every genuinely site-specific rule lives in two places: (a) the ~230 custom lines appended at the tail of app.css after the comment "Put your custom styles here", and (b) the 298-byte /css/main.css, which is the only file the author clearly hand-wrote and which loads SECOND so it wins overrides. main.css contains exactly two things: .hanchor and .nested-img img. That is the site's entire bespoke prose vocabulary.

MEASURE AND SCALE (context for the numbers above, all verbatim from app.css): `.mw7 { max-width: 48rem; }` on the <article> sets the column, `.f4 { font-size: 1.25rem; }` sets body prose at 20px, `.lh-copy { line-height: 1.5; }`, `.mid-gray { color: #555; }` for body text (not black), `.f1 { font-size: 3rem; }` + `.athelas { font-family: athelas, georgia, serif; }` for the h1, and the body face is the Tachyons `.sans-serif` system stack (-apple-system, BlinkMacSystemFont, 'avenir next', avenir, ...). So: 20px serif-titled / sans-body prose at 48rem, #555 on a near-white ground, code at 14px with line-height 2.

TWO DEAD/STALE RULES I VERIFIED RATHER THAN ASSUMED - do not copy these blind. (1) `pre { background-color: #222; color: #222; }` never takes effect because Chroma emits an inline `style="background-color:#fff"` on every <pre>; the code blocks are light, not dark. (2) `.hanchor:hover { visibility: visible; }` has no matching hidden state - "hanchor" appears 0 times in app.css and main.css defines no visibility:hidden, so the anchor emoji is permanently visible.

NO paywall, no JS-rendered content, no CSS-in-JS, no hashed/obfuscated class names (the one hash is on the bundle filename). Everything above came out of plain curl'd HTML and CSS with no rendering step. Only third-party script is a self-hosted Umami analytics beacon.

Files on disk for re-verification: C:/Users/Rod/AppData/Local/Temp/claude/C--Users-Rod-Documents-ProjectFiles-Website/54a6653a-b92f-48bd-aae5-34a6aa020cc6/scratchpad/callout-sources/ronja-tutorials/ containing page.html (site root), article.html (012-fresnel), article2.html (054-unlit-dynamic-decals), app.css, main.css.
