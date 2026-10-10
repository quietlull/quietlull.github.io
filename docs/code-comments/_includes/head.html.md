# Comments removed from `_includes/head.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 16, above `{% if page.image %}`

```text
Setup Open Graph image
```

### Line 62, above `{% unless site.assets.self_host.enabled %}`

```text
Resource Hints
```

### Line 71, above `{% comment %}`

```text
Bootstrap
```

### Line 72, above `{% comment %}`

```text
Imported into the `vendor` cascade layer rather than linked, because a <link> cannot name a
layer and unlayered CSS beats every layer. Left unlayered, Bootstrap outranked the whole
ported redesign on anything they both set - the body colour and the entire type ladder.
`vendor` is the first layer the page sees, which makes it the lowest-priority one.
Production gets the same wrapper from purgecss.js instead, around the purged copy.
An @import blocks on its own request where a <link> would not; that cost is dev-only.
```

### Line 80, above `<!-- Theme style -->`

```text
BOOTSTRAP IS GONE ENTIRELY (D48, Rod 2026-09-01: "lets get rid of bootstrap completely
everything should be custom components anyways"). A dev-only CDN @import of the full
framework stood here, which is ALSO why "the dev build has no Bootstrap" was wrong twice
this session: the compiled sheet had none, and this tag quietly supplied it anyway.
```

### Line 87, above `<link rel="stylesheet" href="{{ '/assets/css/:THEME.css' | replace: ':THEME', site.theme | relative_url }}">`

```text
Theme style
```

### Line 90, above `<link rel="stylesheet" href="{{ '/assets/css/chrome-scene.css' | relative_url }}">`

```text
The scene backdrop - #hana-bg, #scrim and the bloom's baked canvases. A plain stylesheet
rather than a `_sass/` partial only because a second agent owns that tree tonight; it is
layered, so folding it in later changes nothing. Loaded AFTER the theme so a bare `body`
background in the theme cannot outrank it on specificity alone.
```

### Line 99, above `<link`

```text
THE WEB FONTS. Lifted verbatim from the `final-*` pages, which all load this one line.
This is the only font request now. The old Outfit / Plus Jakarta Sans / JetBrains Mono link
used to sit above it, and both shipped on every page; every reader of the old stack has been
repointed at --font-body / --font-display / --font-mono, so it went.

The six LINE BOIL faces are NOT here - they are local TTFs, declared with @font-face by
`line-boil.css` and served from /assets/fonts/. See docs/MERGE-NIGHT.md.

`font-display: swap` is Google's default here and is right for these three: a fallback flash
costs a reflow. The line boil deliberately uses `block` instead, because a flash there would
show the WRONG letterforms, not just the wrong metrics.
```

### Line 117, above `<link rel="stylesheet" href="{{ site.data.origin[type].fontawesome.css | relative_url }}">`

```text
Font Awesome Icons
```

### Line 120, above `{% if site.toc and page.toc %}`

```text
3rd-party Dependencies
```

### Line 131, above `<link rel="stylesheet" href="{{ site.data.origin[type].glightbox.css | relative_url }}">`

```text
Image Popup
```

### Line 135, above `{% comment %}`

```text
Scripts
```

### Line 137, above `<script src="{{ '/assets/js/dist/theme.min.js' | relative_url }}"></script>`

```text
NO defer, and upstream is right about this one. A perf pass (f272da2) deferred every
render-blocking script, but the stock giscus include runs an INLINE script that reads the
`Theme` global at parse time - a deferred global arrives after parse, so every post threw
"Theme is not defined" and the comments loaded with the wrong theme mapper. The bundle is
~2 KB, so the blocking cost is noise next to a broken script on all 19 posts.
```

### Line 149, above `{% if site.pwa.enabled %}`

```text
PWA
```

### Line 157, above `{% for analytics in site.analytics %}`

```text
Web Analytics
```
