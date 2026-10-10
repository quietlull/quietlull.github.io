# Comments removed from `_includes/media-url.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `{% assign url = include.src %}`

```text
Generate media resource final URL based on `site.cdn`, `page.media_subpath`

Arguments:
  src - required, basic media resources path
  subpath - optional, relative path of media resources
  absolute - optional, boolean, if true, generate absolute URL

Return:
  media resources URL
```

### Line 17, above `{% assign _abs = url | slice: 0, 1 %}`

```text
OURS: absolute-path guard, PATCHED, see docs/UPSTREAM.md (re-apply on Chirpy upgrade).
Upstream prepends the subpath to any path without a scheme, including root-relative ones
that are already resolved. A post declaring media_subpath and pointing at a shared asset
got /assets/media/X/assets/img/placeholder-wip.svg. 21 broken images and html-proofer
fails on every one.
```

### Line 29, above `{% if site.cdn %}`

```text
Prepend CND URL
```
