# Comments removed from `_includes/kit-filter-pills.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `<div class="pv2-filters">`

```text
The projects filter row, redesign variant. Same ten tags the old `.filter-pill` row carried, drawn
as `kit-tag` buttons. The Clear button starts hidden and `search-field.js` unhides it once
something is filtering.

ICON COLOUR IS CSS, NOT MARKUP, as of 2026-09-02. Each icon used to carry its colour in an inline
`style=` attribute, which STYLE.md Rule 13 forbids and D42 forbids again for colour specifically.
The class is the only thing here now; the colours are `--pill-icon-*` in
`_sass/abstracts/_tokens.scss` and the rules that read them are in `_sass/pages/_projects.scss`.
```
