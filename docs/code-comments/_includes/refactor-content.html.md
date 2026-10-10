# Comments removed from `_includes/refactor-content.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `{% assign _content = include.content %}`

```text
Refactor the HTML structure
```

### Line 5, above `{% if _content contains '<table' %}`

```text
In order to allow a wide table to scroll horizontally,
we suround the markdown table with `<div class="table-wrapper">` and `</div>`
```

### Line 19, above `{% if _content contains '<pre class="highlight">' %}`

```text
Fixed kramdown code highlight rendering:
https://github.com/penibelst/jekyll-compress-html/issues/101
https://github.com/penibelst/jekyll-compress-html/issues/71#issuecomment-188144901
```

### Line 32, above `{% if _content contains '<input type="checkbox"' %}`

```text
Change the icon of checkbox
```

### Line 43, above `{% assign IMG_TAG = '<img ' %}`

```text
Handle images
```

### Line 90, above `{% assign _wrapper_class = '' %}`

```text
take out classes
```

### Line 131, above `{%- capture _img_url -%}`

```text
OURS: preview images (post cover images) resolve without the post's media_subpath, so a
shared cover asset does not get a post folder prepended; everything else keeps upstream's
subpath handling (re-apply on Chirpy upgrade)
```

### Line 161, above `{% assign _left = _left | replace: 'src=', 'data-src=' | replace: ' lqip=', ' data-lqip="true" src=' %}`

```text
add image placeholder
```

### Line 168, above `{% if _lazyload %}`

```text
lazy-load images
```

### Line 173, above `<!-- combine -->`

```text
OURS: upstream wrapped every post image here in a lightbox link (a.popup.img-link) or a home preview div; the wrapper block is deleted and images render unwrapped. Re-apply this deletion on a Chirpy upgrade.
```

### Line 175, above `{% assign _img_content = _img_content | append: IMG_TAG | append: _left | append: _right %}`

```text
combine
```

### Line 184, above `{% if _content contains '<div class="highlight"><code>' %}`

```text
Add header for code snippets
```

### Line 210, above `{% assign _new_content = _new_content`

```text
`data-title-succeed` came off this button on 2026-09-02 with the tooltips (D48 fallout).
It carried the "Copied!" string for Bootstrap's Tooltip, and clipboard.js no longer reads
it - the button's real feedback is the icon swap to `fas fa-check`, which never depended on
the tooltip. A Liquid comment cannot sit inside an `assign` filter chain, which is why this
note is here rather than on the line it describes.
```

### Line 230, above `<!-- 'text-muted' on the anchor and 'me-2' on the span below were dead Bootstrap classes (D48),`

```text
Create heading anchors
```

### Line 231, above `{% assign heading_levels = '2,3,4,5' | split: ',' %}`

```text
`text-muted` on the anchor and `me-2` on the span below were dead Bootstrap classes (D48),
    matched no CSS, and have been removed. `anchor` itself is still styled.
```

### Line 270, above `{{ _content }}`

```text
return
```
