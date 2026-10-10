# Comments removed from `_javascript/modules/components/toc.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 3, above `const desktopMode = matchMedia('(min-width: 1200px)');`

```text
ONE TOC, THE RAIL. The mobile bar/popup pair was deleted 2026-09-03 on Rod's word, so this no
  longer picks an implementation by viewport width - there is only one left. Below 1200px the
  rail is hidden by `_sass/pages/_post.scss` and no table of contents renders at all, which is
  the accepted cost of that removal rather than an oversight.
  The 1200px number still has to agree with the stylesheet: tocbot is only initialised above it,
  so initialising at a width where the rail is hidden would build a TOC nobody can see.
```
