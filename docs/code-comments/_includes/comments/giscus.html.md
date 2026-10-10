# Comments removed from `_includes/comments/giscus.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `{% comment %}`

```text
https://giscus.app/
```

### Line 3, above `<div class="post-comments"></div>`

```text
A REAL MOUNT POINT, so the widget lands in the post column instead of the page footer.
Stock giscus anchors on `document.querySelector('footer')` and inserts itself beside it. On this
layout the footer lives in `.footer-wrap`, which is FULL BLEED - so the comments measured
1894px wide against a ~760px column and read as a bar bolted to the bottom of the page. Rod:
"can we also make the spacing match the center so its not like a huge bar at the bottom and
feels connected to the post?"
`_layouts/post.html` already includes this inside `.post-foot`, right under prev/next, which is
where comments belong. There was simply no ELEMENT there to anchor to - the include is a bare
<script> - so the stock code fell through to the footer. This div is that anchor.
```

### Line 17, above `// document.querySelector('footer'). The redesign moved the footer BELOW main, so at parse`

```text
OURS (re-apply on Chirpy upgrade): stock runs this IIFE at parse time and anchors on
```

### Line 18, above `// time it did not exist yet and the mount threw on null. DOMContentLoaded is the smallest`

```text
document.querySelector('footer'). The redesign moved the footer BELOW main, so at parse
```

### Line 19, above `// change that waits for it; everything inside is stock.`

```text
time it did not exist yet and the mount threw on null. DOMContentLoaded is the smallest
```

### Line 20, above `document.addEventListener('DOMContentLoaded', function () {`

```text
change that waits for it; everything inside is stock.
```

### Line 22, above `const themeMapper = Theme.getThemeMapper(`

```text
OUR OWN THEME, `assets/css/giscus.css`.

THE URL IS HARDCODED, AND `{{ site.url }}` IS EXACTLY THE BUG THAT KEEPS BRINGING THE WHITE
BLOCK BACK. Rod, twice: "the giscus section is white again", "the non themed giscus is back
why does that keep happening?"

MEASURED: under `jekyll serve` this rendered
  data-theme="http://localhost:4000/assets/css/giscus.css"
because Jekyll REPLACES `site.url` with the local server address while serving, even though
_config.yml sets it to the production domain. giscus fetches the theme from inside its own
iframe on giscus.app, which is HTTPS - so a localhost URL is cross-origin AND mixed content,
is refused, and giscus falls back to its DEFAULT theme, which is LIGHT. That is the white
block, every time, on every local view. It was never the deploy; an earlier note in this file
blamed the deploy and was wrong.

So the literal production URL is written out. It has to be absolute and public for giscus to
reach it at all, and it has to survive `jekyll serve`, which `site.url` does not.

THE COST, unchanged: this file must be DEPLOYED before any edit to it is visible anywhere,
localhost included. That is the price of the iframe fetching it over the public internet.
```

### Line 51, above `if (lang.length > 2 && !lang.startsWith('zh')) {`

```text
https://github.com/giscus/giscus/tree/main/locales
```
