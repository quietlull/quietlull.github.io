# blog.maximeheckel.com - post prose system

Sourced 2026-08-18 by curl, then independently re-grepped by a second agent against the
downloaded files. Only declarations marked CONFIRMED below survived that check.

- **Article read:** https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/ (secondary article also fetched for blockquote evidence: https://blog.maximeheckel.com/posts/learning-in-public/)
- **Stylesheets downloaded:**
  - https://blog.maximeheckel.com/_next/static/css/266efdc9435911cb.css?dpl=dpl_D55AwAuhiG9aofCjTHPmq72NeKkp
  - inline <style> block #0 embedded in https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/ (72,655 bytes, Stitches SSR sheet, saved locally as inline-style-0.css)
  - inline <style> block #1 embedded in https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/ (517 bytes, font tokens)
  - inline <style> block #0 embedded in https://blog.maximeheckel.com/posts/learning-in-public/ (64,748 bytes, saved locally as a2-inline-style-0.css)

## Confirmed components (13)

### callout - `.c-kKupis  /  .c-kKupis-kQOVSk-variant-info  /  .c-kKupis-cPfNZW-variant-danger  /  .c-kKupis-ibPddok-css`

The whole box is one CSS custom property away from being a different severity: border is always 1px solid var(--emphasis) and the fill is background:var(--callout-background, var(--emphasis)) -- so the default state is a tinted-glass panel where fill and border are literally the same token, giving an almost-borderless wash, and a variant only re-points --callout-background. The wash colours are alpha-derived from the theme accent (--emphasis is oklch(from var(--blue-900) l c h / 5%)), so the callout tints with the palette instead of carrying its own hardcoded colour.

Source file: inline <style> block #0 of https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/

```css
.c-kKupis{position:relative;padding:16px 16px;border-radius:var(--border-radius-1);color:var(--text-primary);border:1px solid var(--emphasis);background:var(--callout-background, var(--emphasis))}
.c-kKupis-kQOVSk-variant-info{--callout-background:var(--emphasis)}
.c-kKupis-cPfNZW-variant-danger{--callout-background:var(--danger-emphasis)}
.c-kKupis-ibPddok-css{margin-top:var(--space-3)}
```

Used on the page as:

```html
<aside class="c-kKupis c-kKupis-kQOVSk-variant-info c-kKupis-ibPddok-css"><div data-testid="callout-icon-info" class="c-kirPJY c-kirPJY-fTjxTx-variant-info"><svg ... ></svg></div><div class="c-dhzjXW c-dhzjXW-gjemnU-alignItems-start c-dhzjXW-iTKOFX-direction-column c-dhzjXW-kSZaEC-gap-6 c-dhzjXW-kVNAnR-wrap-nowrap"><p class="c-fDhfVa ...">Going forward, we will refer to the size of the Sector as the <strong ...>kernel size</strong>.</p></div></aside>   -- 16 such <aside class="c-kKupis ..."> instances in this one article. NOTE: only the -variant-info class is ever emitted in the HTML of either article fetched; .c-kKupis-cPfNZW-variant-danger exists in the CSS but appears in ZERO class attributes (0 hits in both articles) -- it is a declared-but-unused variant here.
```

> Verify pass: All four rules exist verbatim in inline-style-0.css (= inline <style> block #0 of article.html, canonical on-crafting-painterly-shaders). Matched: '.c-kKupis{position:relative;padding:16px 16px;border-radius:var(--border-radius-1);color:var(--text-primary);border:1px solid var(--emphasis);background:var(--callout-background, var(--emphasis))}', '.c-kKupis-kQOVSk-variant-info{--callout-background:var(--emphasis)}', '.c-kKupis-cPfNZW-variant-danger{--callout-background:var(--danger-emphasis)}', '.c-kKupis-ibPddok-css{margin-top:var(--space-3)}'. USAGE in article.html markup (style blocks stripped): real element found: '<aside class="c-kKupis c-kKupis-kQOVSk-variant-info c-kKupis-ibPddok-css">'

### callout - `.c-kirPJY  /  .c-kirPJY-fTjxTx-variant-info  /  .c-kirPJY-hTvZpY-variant-danger`

The device is a badge that escapes its own box: top:-20px;right:-20px pushes a 50% circle outside the callout's top-right corner, and border:6px solid var(--background) is not decoration but a knockout ring -- it punches the page background back in around the disc so the badge reads as sitting on top of the callout edge rather than clipped by it. The icon glyph is coloured var(--background) (the page colour) on an accent disc, so it is a hole in the accent, not ink.

Source file: inline <style> block #0 of https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/

```css
.c-kirPJY{position:absolute;display:flex;top:-20px;right:-20px;border-radius:50%;padding:4px;color:var(--background);border:6px solid var(--background);background:var(--icon-background, var(--background))}
.c-kirPJY-fTjxTx-variant-info{--icon-background:var(--accent)}
.c-kirPJY-hTvZpY-variant-danger{--icon-background:var(--danger)}
```

Used on the page as:

```html
<div data-testid="callout-icon-info" class="c-kirPJY c-kirPJY-fTjxTx-variant-info"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" class="c-PJLV c-PJLV-bHjGOQ-variant-default c-PJLV-hKgDZV-outline-true c-PJLV-gyinzs-size-4"><circle cx="12" cy="12" r="10"></circle><path d="M12 16V11.5"></path><path d="M12 8.01172V8.00172"></path></svg></div>  (first child of the <aside class="c-kKupis ...">)
```

> Verify pass: Exists verbatim in inline-style-0.css: '.c-kirPJY{position:absolute;display:flex;top:-20px;right:-20px;border-radius:50%;padding:4px;color:var(--background);border:6px solid var(--background);background:var(--icon-background, var(--background))}', '.c-kirPJY-fTjxTx-variant-info{--icon-background:var(--accent)}', '.c-kirPJY-hTvZpY-variant-danger{--icon-background:var(--danger)}'. USAGE: c-kirPJY appears 16x and c-kirPJY-fTjxTx-variant-info 8x in article.html markup (8 real elements; Next.js duplicates HTML into the RSC flight payload). CAVEAT: c-kirPJY-hTvZpY-variant-danger = 0 occurrences, unused on this page.

### callout - `.c-hwIklu  /  .c-hwIklu-fTjxTx-variant-info  /  .c-hwIklu-hTvZpY-variant-danger`

Same escape trick as the icon badge but as a WORD instead of a glyph: a small rounded accent tab hung at top:-16px;right:-8px so the label straddles the callout's top edge like a file tab. It is the same custom-property slot (--icon-background), so label-callouts and icon-callouts share one variant system, and the label text is free-form ("Sources", "Reminder") rather than a fixed set of severities.

Source file: inline <style> block #0 of https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/

```css
.c-hwIklu{position:absolute;display:flex;top:-16px;right:-8px;border-radius:var(--border-radius-1);padding:6px;color:var(--background);font-size:var(--font-size-1);font-weight:var(--font-weight-500);-webkit-user-select:none;user-select:none;background:var(--icon-background, var(--background))}
.c-hwIklu-fTjxTx-variant-info{--icon-background:var(--accent)}
.c-hwIklu-hTvZpY-variant-danger{--icon-background:var(--danger)}
```

Used on the page as:

```html
<aside class="c-kKupis c-kKupis-kQOVSk-variant-info c-kKupis-ibPddok-css"><div data-testid="callout-label-info" class="c-hwIklu c-hwIklu-fTjxTx-variant-info">Sources</div>...  and elsewhere the same element with the text "Reminder": <div data-testid="callout-label-info" class="c-hwIklu c-hwIklu-fTjxTx-variant-info">Reminder</div>
```

> Verify pass: Exists verbatim in inline-style-0.css: '.c-hwIklu{position:absolute;display:flex;top:-16px;right:-8px;border-radius:var(--border-radius-1);padding:6px;color:var(--background);font-size:var(--font-size-1);font-weight:var(--font-weight-500);-webkit-user-select:none;user-select:none;background:var(--icon-background, var(--background))}', plus '.c-hwIklu-fTjxTx-variant-info{--icon-background:var(--accent)}' and '.c-hwIklu-hTvZpY-variant-danger{--icon-background:var(--danger)}' (the claim's own quote was truncated at '--icon-bac', the full value matches). USAGE: real element '<div data-testid="callout-label-info" class="c-hwIklu c-hwIklu-fTjxTx-variant-info">Sources</div>' — 8 instances. CAVEAT: 

### blockquote - `.c-cZflSx  +  .c-dErIMx  +  .c-dErIMx p`

There is no bar, no rule, no quote glyph and no background. The entire device is typographic contrast plus a width break: it swaps to var(--font-serif) italic at var(--font-size-7) (32px, roughly double body size) with line-height 1.6818, centres it, and lets its max-width:1020px blow past the 663px article column so the quote physically escapes the measure. Note the inner <p> still carries the ordinary size-3 body classes -- the !important on font-size/line-height/font-weight is how the container overrides the text component from outside.

Source file: inline <style> block #0 of https://blog.maximeheckel.com/posts/learning-in-public/ (identical rules also present in the on-crafting-painterly-shaders inline sheet)

```css
.c-cZflSx{padding-top:32px;padding-bottom:32px;width:100%;margin:0}
.c-dErIMx{max-width:1020px;padding:0 var(--space-2);text-align:center;width:100%;margin:0 auto;color:var(--text-primary)}
.c-dErIMx p{font-family:var(--font-serif);margin-bottom:0;font-style:italic;font-size:var(--font-size-7) !important;line-height:1.6818 !important;font-weight:var(--font-weight-400) !important}
```

Used on the page as:

```html
<blockquote class="c-cZflSx"><div class="c-PJLV c-dErIMx">
<p class="c-fDhfVa c-fDhfVa-NUBYH-spaced-true c-fDhfVa-jFCKZD-family-default c-fDhfVa-grGuE-size-3 c-fDhfVa-hYBDYy-variant-default c-fDhfVa-kHnRXL-weight-2">&quot;open-source knowledge can scale just like open-source code&quot; &mdash; <a href="https://twitter.com/swyx/status/1247558714103496705" class="c-kySERo c-kySERo-ceiqTR-external-true c-kySERo-iGeyqa-underline-true c-kySERo-igFbDfV-css">@swyx</a></p>
</div></blockquote>   -- from learning-in-public. ZERO <blockquote> elements exist in on-crafting-painterly-shaders.
```

> Verify pass: All three rules exist verbatim in a2-inline-style-0.css (= block #0 of article2.html, canonical /posts/learning-in-public/): '.c-cZflSx{padding-top:32px;padding-bottom:32px;width:100%;margin:0}', '.c-dErIMx{max-width:1020px;padding:0 var(--space-2);text-align:center;width:100%;margin:0 auto;color:var(--text-primary)}', '.c-dErIMx p{font-family:var(--font-serif);margin-bottom:0;font-style:italic;font-size:var(--font-size-7) !important;line-height:1.6818 !important;font-weight:var(--font-weight-400) !important}'. The claim's parenthetical is also true: identical rules are present in inline-style-0.css. USAGE in article2.html: '<blockquote class="c-cZflSx"><div class="c-PJLV c-dErIMx">' wrappin

### codeblock - `.c-kreyRl  /  .c-kreyRl-cNNFmd-depth-1  /  .c-cuGhLv  /  .c-cuGhLv-iCgbKV-css  /  .c-jSxxNn`

The chrome is a card whose header strip inherits the card's own border via a custom property: .c-kreyRl sets --border:1px solid var(--border-color) then uses it for its own border, and .c-cuGhLv reads that same --border back for its border-bottom -- so the divider under the filename can never drift from the frame. overflow:hidden on the card is what makes the pre's square bottom corners clip to the card radius. The header is a plain flex space-between: filename (--text-primary, 14px, weight 500) left, icon-button right, no other structure.

Source file: inline <style> block #0 of https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/

```css
.c-kreyRl{position:relative;background:var(--card-bg, var(--card-background));-webkit-backdrop-filter:var(--card-blur, none);backdrop-filter:var(--card-blur, none);border-radius:var(--border-radius-2);box-shadow:var(--card-shadow);overflow:hidden;--border:1px solid var(--border-color);border:var(--border)}
.c-kreyRl-cNNFmd-depth-1{--card-shadow:
        0.5px 1px 1px hsl(var(--shadow-color) / 0.333)
      }
.c-cuGhLv{display:flex;justify-content:space-between;align-items:center;border-top-left-radius:var(--border-radius-1);border-top-right-radius:var(--border-radius-1);padding:12px 12px;color:var(--text-tertiary);font-weight:500;font-size:var(--font-size-1);border-bottom:var(--border)}
.c-cuGhLv-iCgbKV-css{z-index:3;background-color:var(--code-snippet-background);padding:var(--space-2) var(--space-3)}
.c-jSxxNn{margin-block-start:0px;font-size:var(--font-size-1);margin-bottom:0px;color:var(--text-primary);font-weight:500}
```

Used on the page as:

```html
<div class="c-PJLV c-kreyRl c-kreyRl-cNNFmd-depth-1 c-PJLV-ijxdteJ-css"><div class="c-cuGhLv c-cuGhLv-iCgbKV-css"><p data-testid="codesnippet-title" class="c-jSxxNn">Implementation of the Kuwahara filter in GLSL</p><button aria-label="Copy code to clipboard" class="c-dkLMcm c-dkLMcm-ldyxZf-variant-tertiary c-dkLMcm-gbNEuh-size-small"><div class="c-dhzjXW ..."><svg ...></svg></div></button></div><pre class="c-dGhWkF prism-code language-glsl">...</pre></div>
```

> Verify pass: All five exist in inline-style-0.css. '.c-kreyRl{position:relative;background:var(--card-bg, var(--card-background));-webkit-backdrop-filter:var(--card-blur, none);backdrop-filter:var(--card-blur, none);border-radius:var(--border-radius-2);box-shadow:var(--card-shadow);overflow:hidden;--border:1px solid var(--border-color);border:var(--border)}' matches exactly. The claim's quote truncates mid-value; the real rule is '.c-kreyRl-cNNFmd-depth-1{--card-shadow:\n        0.5px 1px 1px hsl(var(--shadow-color) / 0.333)\n      }' — the quoted prefix is accurate. Also present: '.c-cuGhLv{display:flex;justify-content:space-between;align-items:center;border-top-left-radius:var(--border-radius-1);...}',

### codeblock - `.c-dGhWkF  /  .c-dGhWkF::before, .c-dGhWkF::after`

Horizontal overflow is signalled by two 70px full-height gradient veils pinned inside the pre (::before left-to-transparent, ::after right-to-transparent), each faded in independently by its own custom property --shadow-opacity-left / --shadow-opacity-right, defaulting to 0. So a code block with nothing to scroll shows no chrome at all, and a scrolled one fades only on the side that still has content off-screen. The veil colour is derived from the page ground at 75% alpha via oklch(from var(--gray-000) l c h / 0.75), so it dims rather than tints.

Source file: inline <style> block #0 of https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/

```css
.c-dGhWkF{--shadow-size:70px;--shadow-color:oklch(from var(--gray-000) l c h / 0.75);margin-top:0;margin-bottom:0;text-align:left;padding:var(--space-2) 0px;border-bottom-left-radius:var(--border-radius-2);border-bottom-right-radius:var(--border-radius-2);background-color:var(--code-snippet-background);font-family:var(--font-mono-code);font-size:var(--font-size-1);line-height:24px;overflow-x:auto}
.c-dGhWkF::before,.c-dGhWkF::after{content:"";position:absolute;top:0;width:var(--shadow-size, 40px);height:100%;pointer-events:none;z-index:2}
.c-dGhWkF::before{left:0;opacity:var(--shadow-opacity-left, 0);background:linear-gradient(to right, var(--shadow-color), transparent)}
.c-dGhWkF::after{right:0;opacity:var(--shadow-opacity-right, 0);background:linear-gradient(to left, var(--shadow-color), transparent)}
```

Used on the page as:

```html
<pre class="c-dGhWkF prism-code language-glsl"><div data-testid="line" class="c-QIkcn token-line"><div data-testid="number-line" class="c-eotEYs">1</div><span class="c-hJePes"><span data-testid="content-line" class="token macro property directive-hash">#</span>...</span></div>...</pre>   -- the two --shadow-opacity-* variables are driven at runtime (2 occurrences of "shadow-opacity" in the fetched HTML, both in this CSS; the values are written by script on scroll, not baked into the markup).
```

> Verify pass: Base rule matches character-for-character in inline-style-0.css: '.c-dGhWkF{--shadow-size:70px;--shadow-color:oklch(from var(--gray-000) l c h / 0.75);margin-top:0;margin-bottom:0;text-align:left;padding:var(--space-2) 0px;border-bottom-left-radius:var(--border-radius-2);border-bottom-right-radius:var(--border-radius-2);background-color:var(--code-snippet-background);font-family:var(--font-mono-code);font-size:var(--font-size-1);line-height:24px;overflow-x:auto}'. The pseudo-element rule exists as '.c-dGhWkF::before,.c-dGhWkF::after{content:"";position:absolute;top:0;width:var(--shadow-size, 40px);height:100%;pointer-events:none;z-index:2}' — note the real file has NO space after the comma (

### codeblock - `.c-QIkcn  /  .c-QIkcn.highlight-line  /  .c-QIkcn:hover  /  .c-eotEYs  /  .c-hJePes`

Each line is its own display:table row with a permanently reserved border-left:3px solid transparent, so turning a line on with .highlight-line only recolours that existing 3px strip plus the background -- no layout shift between highlighted and normal lines, which is the usual failure mode of highlighted code. The line-number cell is a fixed 45px non-selectable gutter in --text-tertiary, and .c-QIkcn:hover reuses the exact same --emphasis wash as the highlight, so hovering previews the highlight state.

Source file: inline <style> block #0 of https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/

```css
.c-QIkcn{display:table;border-collapse:collapse;padding:0px 14px;border-left:3px solid transparent}
.c-QIkcn.highlight-line{background:var(--emphasis);border-color:var(--accent)}
.c-QIkcn:hover{background-color:var(--emphasis)}
.c-eotEYs{width:45px;padding:0 12px;-webkit-user-select:none;user-select:none;opacity:1;color:var(--text-tertiary)}
.c-hJePes{display:table-cell;width:100%}
```

Used on the page as:

```html
<div data-testid="highlight-line" class="c-QIkcn token-line highlight-line">  (87 occurrences of highlight-line across the fetched article) and the plain form <div data-testid="line" class="c-QIkcn token-line"><div data-testid="number-line" class="c-eotEYs">1</div><span class="c-hJePes">...</span></div>
```

> Verify pass: All five exist as one contiguous run in inline-style-0.css exactly as quoted: '.c-QIkcn{display:table;border-collapse:collapse;padding:0px 14px;border-left:3px solid transparent}.c-QIkcn.highlight-line{background:var(--emphasis);border-color:var(--accent)}.c-QIkcn:hover{background-color:var(--emphasis)}.c-eotEYs{width:45px;padding:0 12px;-webkit-user-select:none;user-select:none;opacity:1;color:var(--text-tertiary)}.c-hJePes{display:table-cell;width:100%}'. I specifically checked whether :hover was wrapped in an @media (hover:hover) block — it is NOT, so quoting it bare is accurate. USAGE: c-QIkcn 359x, c-eotEYs 359x, c-hJePes 359x, and 'highlight-line' 86x in article.html markup (line rows,

### inlinecode - `.c-kEZxkv`

It is styled as a physical chip, not a tint: 1px border plus a 0.5px 1px 1px shadow in hsl(var(--shadow-color) / 0.333) gives it a hairline lift off the paragraph, and -webkit-box-decoration-break:clone means a chip that wraps across two lines gets its border, radius and shadow drawn on BOTH fragments instead of one open-ended sausage. Its text colour is --token-punctuation, i.e. it is coloured from the same syntax-theme token set as the code blocks, so inline and block code agree.

Source file: inline <style> block #0 of https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/

```css
.c-kEZxkv{font-family:var(--font-mono-code);line-height:1.45rem;border-radius:var(--border-radius-1);background-color:var(--foreground);color:var(--token-punctuation);padding:2px 6px;padding-inline-start:6px;padding-inline-end:6px;font-size:var(--font-size-1);font-weight:var(--font-weight-400) !important;word-break:break-word;border:1px solid var(--border-color);box-shadow:
        0.5px 1px 1px hsl(var(--shadow-color) / 0.333)
      ;-webkit-box-decoration-break:clone}
```

Used on the page as:

```html
the <code class="c-kEZxkv">Pass</code> class from the <code class="c-kEZxkv">post-processing</code> package.
```

> Verify pass: Exists verbatim in inline-style-0.css, including the multi-line box-shadow the claim truncated at 'h': '.c-kEZxkv{font-family:var(--font-mono-code);line-height:1.45rem;border-radius:var(--border-radius-1);background-color:var(--foreground);color:var(--token-punctuation);padding:2px 6px;padding-inline-start:6px;padding-inline-end:6px;font-size:var(--font-size-1);font-weight:var(--font-weight-400) !important;word-break:break-word;border:1px solid var(--border-color);box-shadow:\n        0.5px 1px 1px hsl(var(--shadow-color) / 0.333)\n      ;-webkit-box-decoration-break:clone...}'. USAGE: real elements '<code class="c-kEZxkv">i = 1</code>' and '<code class="c-kEZxkv">n</code>'; 81 occurrences i

### figure - `.c-biNcLm  /  .c-biNcLm-igndADY-css  /  .c-kMTwio  /  .c-dhzjXW-ienyssl-css  /  .c-fDhfVa-iigfBMF-css  (+ global figure{})`

The image frame is a heavy 2px --border-color box at the LARGEST radius token (--border-radius-3, 16px) with overflow:hidden and line-height:0 -- the line-height:0 is the load-bearing bit, it kills the inline-descender gap that otherwise leaves a sliver of frame under the image. The aspect-ratio is written inline per image so the frame reserves its exact box before load. The caption is not a bespoke style at all: it is the generic Text component at size-1 / variant-tertiary / weight-3 with only line-height:1.5;padding-top:10px added, i.e. small, dim, tight, 10px below the frame.

Source file: inline <style> block #0 of https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/ ; the bare `figure` reset is in https://blog.maximeheckel.com/_next/static/css/266efdc9435911cb.css

```css
.c-biNcLm{position:relative;box-sizing:border-box;overflow:hidden;line-height:0;border:2px solid var(--border-color);border-radius:var(--border-radius-3)}
.c-kMTwio{all:unset;cursor:zoom-in;width:100%;height:100%;line-height:0}
.c-dhzjXW-ienyssl-css{margin:0;width:100%}
.c-biNcLm-igndADY-css{width:100%;z-index:auto}
.c-fDhfVa-iigfBMF-css{line-height:1.5;padding-top:10px}

/* from 266efdc9435911cb.css: */
figure{margin-left:0;margin-right:0}
img{max-width:100%}
```

Used on the page as:

```html
<figure class="c-dhzjXW c-dhzjXW-gjemnU-alignItems-start c-dhzjXW-iTKOFX-direction-column c-dhzjXW-kVNAnR-wrap-nowrap c-dhzjXW-ienyssl-css"><div role="button" type="button" tabindex="0" data-base-ui-click-trigger="" id="base-ui-_R_5e7n9um_" class="c-kMTwio"><div style="aspect-ratio:2.1671826625387;border-radius:var(--border-radius-3)" class="c-biNcLm c-biNcLm-igndADY-css"><img alt="Diagram showcasing both box-shaped and circular kernels..." loading="lazy" width="700" height="323" ... class="c-PJLV c-PJLV-iicYOmZ-css" ...></div></div><figcaption class="c-fDhfVa c-fDhfVa-NUBYH-spaced-true c-fDhfVa-jFCKZD-family-default c-fDhfVa-icJbem-size-1 c-fDhfVa-duxZVi-variant-tertiary c-fDhfVa-jmCwYG-weight-3 c-fDhfVa-iigfBMF-css">Diagram showcasing both box-shaped and circular kernels and highlighting which parts of the image are being smoothed while maintaining the sharpness of the edges.</figcaption></figure>   (10 <figure> elements in the article)
```

> Verify pass: All five exist verbatim in inline-style-0.css: '.c-biNcLm{position:relative;box-sizing:border-box;overflow:hidden;line-height:0;border:2px solid var(--border-color);border-radius:var(--border-radius-3)}', '.c-kMTwio{all:unset;cursor:zoom-in;width:100%;height:100%;line-height:0}', '.c-dhzjXW-ienyssl-css{margin:0;width:100%}', '.c-biNcLm-igndADY-css{width:100%;z-index:auto}', '.c-fDhfVa-iigfBMF-css{line-height:1.5;padding-top:10px}'. The bare reset is in main.css (the only _next/static/css file linked from the article, 266efdc9435911cb.css): 'figure{margin-left:0;margin-right:0}'. USAGE: full real nesting found — '<figure class="c-dhzjXW ... c-dhzjXW-ienyssl-css"><div role="button" ... class="

### heading - `.anchor-link  /  h2:hover .anchor-link, h3:hover .anchor-link, h4:hover .anchor-link  /  .anchor-link:focus-visible  /  h2,h3{scroll-margin-top}`

A chain-link mark that lives INSIDE the heading text flow (inline-flex, vertical-align:middle, margin-left:.33rem) and is revealed by hovering the whole heading, not the link itself -- so the hit area is the heading. Because it occupies layout at opacity:0, the heading never reflows when it appears. It also has to fight the site's own link component: --anchor-border-color:transparent!important cancels the prose-link underline it inherits from .c-kySERo-iGeyqa-underline-true. h2,h3{scroll-margin-top:6.6rem} is the matching piece that keeps the target clear of the fixed nav. NOTE: the sibling class `space-window-top` in the markup has NO rule in either fetched stylesheet (0 hits) -- it is a dead or JS-only hook. `.anchor-icon` likewise has no CSS rule.

Source file: https://blog.maximeheckel.com/_next/static/css/266efdc9435911cb.css?dpl=dpl_D55AwAuhiG9aofCjTHPmq72NeKkp

```css
.anchor-link{--anchor-border-color:transparent!important;opacity:0;text-decoration:none!important;transition:opacity .2s ease;margin-left:.33rem;display:inline-flex;align-items:center;vertical-align:middle;color:var(--text-tertiary)}
h2,h3{scroll-margin-top:6.6rem}
h2:hover .anchor-link,h3:hover .anchor-link,h4:hover .anchor-link{opacity:1}
.anchor-link:focus-visible{opacity:1;color:var(--accent)}
```

Used on the page as:

```html
<h2 id="the-papari-extension" class="c-fDhfVa c-fDhfVa-NUBYH-spaced-true c-fDhfVa-jFCKZD-family-default c-fDhfVa-cdSgsb-size-4 c-fDhfVa-eRpaQu-variant-primary c-fDhfVa-gYdJvx-weight-4">The Papari extension<a href="#the-papari-extension" class="c-kySERo c-kySERo-iGeyqa-underline-true c-kySERo-igJWTOZ-css anchor-link space-window-top"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="16" height="16" class="anchor-icon"><path d="M10 19.0004L9.82843 19.1719C8.26634 20.734 5.73368 20.734 4.17158 19.1719..."></path></svg></a></h2>
```

> Verify pass: All present in main.css (the sole _next/static/css/266efdc9435911cb.css linked from article.html), and in exactly the claimed order: '.anchor-link{--anchor-border-color:transparent!important;opacity:0;text-decoration:none!important;transition:opacity .2s ease;margin-left:.33rem;display:inline-flex;align-items:center;vertical-align:middle;color:var(--text-tertiary)}h2,h3{scroll-margin-top:6.6rem}h2:hover .anchor-link,h3:hover .anchor-link,h4:hover .anchor-link{opacity:1}.anchor-link:focus-visible{opacity:1;color:var(--accent)}'. USAGE: 24 occurrences in article.html markup, e.g. '<a href="#painterly-post-processing-with-the-kuwahara-filter" class="c-kySERo c-kySERo-iGeyqa-underline-true c-kyS

### prose-link - `.c-kySERo  /  :focus  /  :hover  /  -iGeyqa-underline-true  /  -ceiqTR-external-true:after  /  -jpwuUW-favicon-true:before  /  -bDjvza-discreet-true`

Two separate devices. (1) The underline is a border-bottom held at transparent and only coloured on hover/focus via --anchor-border-color, transitioned by border-color 0.3s -- so the rule is always present in layout and just fades in, no text-decoration jump. (2) The external/favicon marks are a single mechanism reused: an empty pseudo-element whose SVG is injected as a MASK (mask-image:var(--icon)) with background-color:currentColor, so the icon is always exactly the link's own colour and inherits the hover transition for free; the per-link icon is swapped by setting --icon to a base64 data URI on a one-off class. The negative margin-right:-0.36em on the external mark pulls the following text back so the arrow does not open a gap.

Source file: inline <style> block #0 of https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/

```css
.c-kySERo{font-size:inherit;line-height:inherit;color:var(--color, var(--hyperlink));font-weight:inherit;word-break:break-word;text-decoration:none;outline:none;transition:border-color 0.3s ease, color 0.3s ease;--hover-color:var(--text-primary)}
.c-kySERo:focus{--color:var(--hover-color, var(--accent));--hover-translation-distance:var(--arrow-translation, 0)}
@media (hover: hover) and (pointer: fine){.c-kySERo:hover{--color:var(--hover-color, var(--accent)); --hover-translation-distance:var(--arrow-translation, 0)}}
.c-kySERo-iGeyqa-underline-true{border-bottom:1px solid;border-color:var(--anchor-border-color, transparent);--hover-color:unset}
.c-kySERo-iGeyqa-underline-true:focus{--anchor-border-color:var(--accent)}
@media (hover: hover) and (pointer: fine){.c-kySERo-iGeyqa-underline-true:hover{--anchor-border-color:var(--accent)}}
.c-kySERo-ceiqTR-external-true{--size:1.4em}
.c-kySERo-ceiqTR-external-true:after{content:"";display:inline-block;vertical-align:middle;width:var(--size, 1.05em);height:var(--size, 1.05em);-webkit-mask-image:var(--icon);mask-image:var(--icon);-webkit-mask-repeat:no-repeat;background-color:currentColor;margin-left:0.18em;margin-right:-0.36em;transform:translateY(2px)}
.c-kySERo-jpwuUW-favicon-true{--size:1em}
.c-kySERo-jpwuUW-favicon-true:before{content:"";display:inline-block;vertical-align:middle;width:var(--size, 1.05em);height:var(--size, 1.05em);-webkit-mask-image:var(--icon);mask-image:var(--icon);-webkit-mask-repeat:no-repeat;background-color:currentColor;margin-right:0.18em;transform:translateY(-2px)}
.c-kySERo-bDjvza-discreet-true{--color:var(--text-tertiary)}
.c-kySERo-igFbDfV-css{--icon:url(data:image/svg+xml;base64,PHN2ZyBzdHJva2U9ImN1cnJlbnRDb2xvciIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyIiAuLi4=)}   /* base64 truncated here for length; full value is an external-link arrow-out-of-box SVG */
.c-kySERo-idwngVA-css{--icon:url(data:image/svg+xml;base64,...feather-twitter...)}
.c-kySERo-ibfgeSs-css{--icon:url(data:image/svg+xml;base64,...feather-github...)}
```

Used on the page as:

```html
external + underlined: <a href="https://www.youtube.com/watch?v=chfGe0aTDjs" class="c-kySERo c-kySERo-ceiqTR-external-true c-kySERo-iGeyqa-underline-true c-kySERo-igFbDfV-css">Watercolor-like compositing in Blender</a>   ---   favicon + discreet: <a href="https://twitter.com/arpeegee" class="c-kySERo c-kySERo-bDjvza-discreet-true c-kySERo-jpwuUW-favicon-true c-kySERo-idwngVA-css">@arpeegee</a>
```

> Verify pass: Quoted portion matches exactly in inline-style-0.css: '.c-kySERo{font-size:inherit;line-height:inherit;color:var(--color, var(--hyperlink));font-weight:inherit;word-break:break-word;text-decoration:none;outline:none;transition:border-color 0.3s ease, color 0.3s ease;--hover-color:var(--text-primary)}.c-kySERo:focus{--color:var(--hover-color, var(--accent));--hover-translation-distance:var(--arrow-translation, 0)}@media (hover: hover) and (pointer: fine){.c-kySERo:hover{...}}' — the truncated '@media (hover: hover) and (pointer: f' is accurate. I separately confirmed every named variant is a REAL rule, not just an entry in the --sxs registry: '.c-kySERo-iGeyqa-underline-true{border-bottom:1px

### list - `.c-iUzKch  /  -jmtdjB-variant-unordered li  /  -iGtUUo-variant-ordered li:before  /  .c-fvFIDZ  /  .c-fvFIDZ div[data-list-item]`

The unordered marker is thrown away entirely (list-style:none) and replaced by a real SVG arrow element inside the <li>, with the li itself becoming display:flex so the arrow and the text are two flex children -- that is what gives correct hanging indent on wrapped lines without list-style-position hacks, and the marker is nudged onto the text baseline with transform:translateY(4px) rather than by fiddling line-height. The ordered variant hides that same SVG (li svg{display:none}) and uses content:counters(li,'.') '. ' in the accent colour, so nested ordered lists number as 1.1, 1.2 automatically.

Source file: inline <style> block #0 of https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/

```css
.c-iUzKch{margin:0;padding:0;color:inherit;list-style-position:outside;list-style-image:none}
.c-iUzKch-jmtdjB-variant-unordered li{list-style:none}
.c-iUzKch-iGtUUo-variant-ordered li{counter-increment:li}
.c-iUzKch-iGtUUo-variant-ordered li svg{display:none}
.c-iUzKch-iGtUUo-variant-ordered li:before{content:counters(li, '.') '. ';color:var(--accent);margin-right:6px}
.c-fvFIDZ{list-style:none;display:flex;margin-bottom:calc(1.45rem / 2);line-height:1.9;letter-spacing:0.3px}
.c-fvFIDZ div[data-list-item]{padding-right:8px;transform:translateY(4px)}
.c-fvFIDZ > ol{margin-left:1.45rem;margin-bottom:calc(1.45rem / 2);margin-top:calc(1.45rem / 2)}
.c-fvFIDZ > ul{margin-left:1.45rem;margin-bottom:calc(1.45rem / 2);margin-top:calc(1.45rem / 2)}
.c-fvFIDZ > p{margin-bottom:calc(1.45rem / 2)}
```

Used on the page as:

```html
<ul class="c-iUzKch c-iUzKch-jmtdjB-variant-unordered">
<li class="c-fvFIDZ"><div data-list-item="true" class="c-PJLV"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" class="c-PJLV c-PJLV-fBaGsk-variant-info c-PJLV-hKgDZV-outline-true c-PJLV-gyinzs-size-4"><path d="M18.5 12L4.99997 12"></path><path d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"></path></svg></div><div>Output the resulting scene.</div></li>
</ul>
```

> Verify pass: Every rule exists verbatim, but NOT contiguously as the claim's formatting implies. In the file '.c-iUzKch{margin:0;padding:0;color:inherit;list-style-position:outside;list-style-image:none}' is immediately followed by '.c-fvFIDZ{list-style:none;display:flex;margin-bottom:calc(1.45rem / 2);line-height:1.9;letter-spacing:0.3px}.c-fvFIDZ div[data-list-item]{padding-right:8px;transform:translateY(4px)}'. The variant rules live elsewhere in the sheet: '.c-iUzKch-jmtdjB-variant-unordered li{list-style:none}' and '.c-iUzKch-iGtUUo-variant-ordered li{counter-increment:li}.c-iUzKch-iGtUUo-variant-ordered li svg{display:none}.c-iUzKch-iGtUUo-variant-ordered li:before{content:counters(li, '.') '. ';co

### heading - `.c-kedQaz  (article prose container)  +  the Text component variants used by h2 / h3 / p`

This is the surprising part and worth stating plainly as measured fact, not taste: in-article headings are NOT scaled up. h2 is 18px/weight 560, h3 is 16px/weight 500, and body text is the same 16px at weight 400. The h2 is one 2px step and one weight step above the paragraph. Hierarchy is carried almost entirely by vertical space (h3{padding-top:2.5rem}) and by colour (--text-primary headings against a --text-secondary prose container), with the prose column capped at max-width:700px and its blocks separated by a single gap:var(--space-5) on a flex column rather than per-element margins.

Source file: inline <style> block #0 of https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/

```css
.c-kedQaz{padding:var(--space-8) 0px;color:var(--text-secondary)}
.c-kedQaz h3{padding-top:2.5rem}
.c-kedQaz p{font-weight:var(--font-weight-400);letter-spacing:0.15px}
.c-kedQaz li{font-weight:var(--font-weight-400)}
.c-kedQaz section{display:flex;flex-direction:column;gap:var(--space-5);max-width:700px;width:100%}

/* the variant atoms the headings actually compose from: */
.c-fDhfVa{margin:0;padding:0;text-rendering:optimizeLegibility}
.c-fDhfVa-NUBYH-spaced-true{letter-spacing:0.3px;line-height:1.75}
.c-fDhfVa-cdSgsb-size-4{font-size:var(--font-size-4)}
.c-fDhfVa-grGuE-size-3{font-size:var(--font-size-3)}
.c-fDhfVa-eRpaQu-variant-primary{color:var(--text-primary)}
.c-fDhfVa-gYdJvx-weight-4{font-weight:var(--font-weight-600)}
.c-fDhfVa-jmCwYG-weight-3{font-weight:var(--font-weight-500)}

/* the tokens those resolve to (:root): */
--font-size-3:16px;--font-size-4:18px;--font-weight-400:400;--font-weight-500:500;--font-weight-600:560
```

Used on the page as:

```html
h2: <h2 id="the-papari-extension" class="c-fDhfVa c-fDhfVa-NUBYH-spaced-true c-fDhfVa-jFCKZD-family-default c-fDhfVa-cdSgsb-size-4 c-fDhfVa-eRpaQu-variant-primary c-fDhfVa-gYdJvx-weight-4">   ---   h3: <h3 id="circular-kernel" class="c-fDhfVa c-fDhfVa-NUBYH-spaced-true c-fDhfVa-jFCKZD-family-default c-fDhfVa-grGuE-size-3 c-fDhfVa-eRpaQu-variant-primary c-fDhfVa-jmCwYG-weight-3">   ---   body p: <p class="c-fDhfVa c-fDhfVa-NUBYH-spaced-true c-fDhfVa-jFCKZD-family-default c-fDhfVa-grGuE-size-3 c-fDhfVa-hYBDYy-variant-default c-fDhfVa-kHnRXL-weight-2">
```

> Verify pass: Exists as a contiguous run in inline-style-0.css exactly as quoted: '.c-kedQaz{padding:var(--space-8) 0px;color:var(--text-secondary)}.c-kedQaz h3{padding-top:2.5rem}.c-kedQaz p{font-weight:var(--font-weight-400);letter-spacing:0.15px}.c-kedQaz li{font-weight:var(--font-weight-400)}.c-kedQaz section{display:flex;flex-direction:column;gap:var(--space-5);max-width:700px;width:100%}'. The claim OMITS two further rules that follow ('.c-kedQaz .katex-display>.katex>.katex-html>.tag{display:none}' and '.c-kedQaz .katex-display>.katex{text-align:left;white-space:normal}') — an omission, not a fabrication. The Text atom is also real: '.c-fDhfVa{margin:0;padding:0;text-rendering:optimizeLegibility}' 

## Roles this site does NOT have

- pullquote (as a distinct device -- the only quote treatment is the <blockquote> above; there is no separate pull-quote component in either fetched article)
- aside-sidenote / marginnote (the <aside> element IS the callout; there is no margin-column or side note anywhere -- the article grid is a single centred column, grid-template-columns:1fr minmax(auto, 663px) 1fr)
- tldr-summary (0 occurrences of 'TL;DR' or 'tldr' in either article's HTML; no summary-box component in the CSS)
- table (0 <table> elements in either article; no table rules in the fetched CSS)
- footnote (1 stray 'footnote' substring in the article HTML and no footnote CSS rule; no footnote markers or footnote list rendered)
- toc / in-article table of contents (0 occurrences of 'Table of' or 'toc'; the only <nav> is the fixed top header pill, class c-PJLV c-PJLV-ijZqNlo-css -- there is no per-article heading index)
- code block filename TABS (there is a filename strip but it is a single title, no multi-file tabbed switcher)

## Notes

BUILD SYSTEM / CAVEATS FOR ANYONE REUSING THIS

1. CSS-in-JS with hashed class names. The site is Next.js + Stitches. The linked stylesheet /_next/static/css/266efdc9435911cb.css is 27.8KB and is almost entirely KaTeX @font-face + KaTeX layout; only its last ~1.5KB is site CSS (the global reset, ::selection, and the .anchor-link rules I quoted). ALL component CSS lives in an inline <style> block in the HTML document (72,655 bytes on the shader article), emitted server-side by Stitches. Every class is a hash: .c-kKupis is the callout, .c-dGhWkF is the pre, .c-fDhfVa is the Text primitive. These hashes are build output and WILL change on their next deploy, so treat them as anonymous selectors -- the declarations are the durable part, the names are not.

2. Stitches variant convention, so you can read the markup. A component's classes come in three shapes: base (.c-kKupis), variant (.c-kKupis-kQOVSk-variant-info -> base hash + variant hash + human-readable variant name), and one-off inline css prop (.c-kKupis-ibPddok-css). The human-readable tail (-variant-info, -size-4, -weight-3, -underline-true, -external-true) is the only self-documenting part and is reliable.

3. The whole system is custom-property-driven. Almost no component hardcodes a colour. Callouts read --callout-background / --icon-background, links read --color / --anchor-border-color / --icon, code cards read --card-shadow / --border, pills read --pill-background / --pill-color. Themes are two class-scoped token sets, .maximeheckel-light and .maximeheckel-dark, both defined in the same inline block, using oklch() including relative colour syntax (e.g. --emphasis:oklch(from var(--blue-900) l c h / 5%)). If you lift a device, you must lift or substitute its tokens; the geometry alone will render colourless.

4. Declared-but-unused, stated honestly. .c-kKupis-cPfNZW-variant-danger and .c-kirPJY-hTvZpY-variant-danger / .c-hwIklu-hTvZpY-variant-danger exist in the CSS but appear in ZERO class attributes across both articles I fetched -- I verified with a class-attribute-scoped grep (0 hits in each). Only the info variant is actually used in prose. Similarly the classes `space-window-top` and `anchor-icon` appear in the heading-anchor markup but have no matching rule in either downloaded stylesheet. And there is a third pill component (.c-fxJvkM with -variant-success / -info / -warning, --pill-background/--pill-color) that IS used 21 times, but in interactive shader widgets and UI, not as a prose callout -- I did not report it as a prose component.

5. There is a SECOND aside style, and it is not a prose callout. <aside class="c-gxxMrz"> (3 uses) is the "buy me a coffee" / support block: same 16px padding + --emphasis border recipe as the callout but with overflow:hidden;width:100%;display:inline-grid;gap:var(--space-5) and background falling back to var(--foreground) instead of var(--emphasis). Worth knowing so you do not mistake it for a second callout severity.

6. Content is server-rendered. No paywall, no JS gate; curl with a desktop UA returned the full article markup and the full inline stylesheet, so everything above is read from static bytes on disk. The only runtime-only values are the code block's --shadow-opacity-left / --shadow-opacity-right (set by scroll script; the CSS defaults them to 0) and the copy-to-clipboard button behaviour.

7. Fonts referenced by the devices: --font-mono-code:'FiraCode', --font-display:'inter', --font-mono:'DepartureMono' (inline <style> block #1), plus --font-serif used by the blockquote -- note that --font-serif is CONSUMED by .c-dErIMx p but I could not find its DEFINITION in either fetched stylesheet, so the blockquote's serif face is resolved from somewhere I did not capture (likely a later-injected font block). Flagging rather than guessing.

Local evidence files (all downloaded this session): C:\Users\Rod\AppData\Local\Temp\claude\C--Users-Rod-Documents-ProjectFiles-Website\54a6653a-b92f-48bd-aae5-34a6aa020cc6\scratchpad\callout-sources\maximeheckel\ containing page.html, article.html, article2.html, main.css, inline-style-0.css, inline-style-0.pretty.css, inline-style-1.css, a2-inline-style-0.css, a2-inline-style-1.css.
