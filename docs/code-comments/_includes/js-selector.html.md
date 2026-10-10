# Comments removed from `_includes/js-selector.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `{% comment %}`

```text
JS selector for site.
```

### Line 3, above `{% assign urls = '' %}`

```text
`urls` used to be seeded with SimpleJekyllSearch, which meant every page fetched the library.
Nothing rendered a search input, so it drove nothing. It starts empty now.
```

### Line 9, above `{% if page.layout == 'post' or page.layout == 'page' or page.layout == 'home' or page.layout == 'section-about`

```text
layout specified
```

### Line 15, above `{% assign urls = urls`

```text
image lazy-loading & popup & clipboard
```

### Line 56, above `{% assign urls = urls | remove_first: ',' %}`

```text
OURS (re-apply on Chirpy upgrade): the leading comma is stripped before the combiner sees
the list. `urls` starts empty since the search library left, and every append leads with a
comma, so the first split entry was '' and the combiner emitted a bare
<script defer src=""></script> on 44 pages - a no-op fetch of the page itself.
```

### Line 85, above `<script src="{{ '/assets/js/data/mathjax.js' | relative_url }}"></script>`

```text
MathJax
```

### Line 91, above `{% if page.layout == 'post' %}`

```text
Pageviews
```
