# Comments removed from `_includes/post-media.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `{%- assign _ext = include.src | split: '.' | last | downcase -%}`

```text
Render a post preview image OR autoplay video based on file extension.
Params:
  - src       (required): path to the media file
  - alt       (required): alt text / aria-label
  - class     (optional): CSS class(es)
  - width     (optional): explicit width in pixels
  - height    (optional): explicit height in pixels
  - lqip      (optional): low-quality image placeholder data URI (img only)
```
