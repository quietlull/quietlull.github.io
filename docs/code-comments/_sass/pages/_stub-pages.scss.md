# Comments removed from `_sass/pages/_stub-pages.scss`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `// the redesign.`

```text
The two stub pages, the 404 and Under construction, written 2026-08-31 when both were ported to
```

### Line 2, above `// WHAT WAS HERE, and why it went. This was Chirpy's '_home.scss', the stylesheet for`

```text
the redesign.
```

### Line 4, above `// '_layouts/home.html'. That layout was deleted in the merge, and the file's last live selector`

```text
WHAT WAS HERE, and why it went. This was Chirpy's `_home.scss`, the stylesheet for
```

### Line 5, above `// was '#post-list', which only '_layouts/blog.html' still carried. The blog port dropped it, so`

```text
`_layouts/home.html`. That layout was deleted in the merge, and the file's last live selector
```

### Line 6, above `// every rule in the file ('#post-list', '.card-wrapper', '.card', '.preview-img', '.card-body',`

```text
was `#post-list`, which only `_layouts/blog.html` still carried. The blog port dropped it, so
```

### Line 7, above `// '.post-meta' and the whole '.pagination' block, which lost its markup when`

```text
every rule in the file (`#post-list`, `.card-wrapper`, `.card`, `.preview-img`, `.card-body`,
```

### Line 8, above `// '_includes/post-paginator.html' was deleted) was styling nothing on any page.`

```text
`.post-meta` and the whole `.pagination` block, which lost its markup when
```

### Line 9, above `// THE FILENAME IS NOW WRONG, and that is a handoff rather than an oversight. Nothing here is about`

```text
`_includes/post-paginator.html` was deleted) was styling nothing on any page.
```

### Line 11, above `// a home page. Suggested name '_stub-pages.scss', which means editing '_sass/pages/_index.scss',`

```text
THE FILENAME IS NOW WRONG, and that is a handoff rather than an oversight. Nothing here is about
```

### Line 12, above `// and that belongs to another pass.`

```text
a home page. Suggested name `_stub-pages.scss`, which means editing `_sass/pages/_index.scss`,
```

### Line 13, above `// UNLAYERED ON PURPOSE: page stylesheets sit outside the layers so a page can override a`

```text
and that belongs to another pass.
```

### Line 15, above `// component (D36). Do not wrap this in '@layer'.`

```text
UNLAYERED ON PURPOSE: page stylesheets sit outside the layers so a page can override a
```

### Line 16, above `// ---- 404 ---------------------------------------------------------------------------------------`

```text
component (D36). Do not wrap this in `@layer`.
```

### Line 18, above `/* THE 404 FITS ONE SCREEN. Rod 2026-08-25: "dont let it scroll down anymore."`

```text
---- 404 ---------------------------------------------------------------------------------------
```

### Line 20, above `.not-found { min-height: calc(100dvh - var(--top-bar-height) - 40px); }`

```text
THE 404 FITS ONE SCREEN. Rod 2026-08-25: "dont let it scroll down anymore."
   The fix went through three shapes and the history matters enough to keep: the page measured
   1025px in a 900px window because Bootstrap's container carried a 100vh minimum from an
   ID-bearing rule in _base.scss, and two overrides lost to that ID before one carried the ID too.
   THEN D48 DELETED THE WHOLE SCAFFOLD (2026-09-01), container, rule and all, so no override is
   needed any more - the sizing below is the entire mechanism now.

   The block takes the screen the bar and the footer leave and centres its contents in it.
   THE 40px IS A BUDGET, not one measurement: 29px is the footer's own stated height, 2px the bar
   border its token excludes, 9px slack so a rounding error cannot put the page back over the top.
   `--top-bar-height` sits on `:root` and grows when the bar stacks, so this follows every
   breakpoint. `dvh`, not `vh`, so a phone's collapsing address bar cannot reintroduce the scroll.
```

### Line 34, above `.not-found .page-heading {`

```text
The title and the line under it are `page-title-desc` now, so the geometry the old
   `.not-found-title` / `.not-found-subtitle` rules carried has to be restated on the component's
   own hooks. 450px is the old subtitle's measure, unchanged.
```

### Line 44, above `.not-found .page-heading__title {`

```text
Two things at once. The margin: `main h1 { margin-top: 3rem }` in base/_typography.scss is
   unlayered, so it beats the type ladder's own `h1 { margin: 0 }`, and Ramblings, Projects and the
   post page all restate it the same way. The animation: the page's own entrance stagger,
   re-pointed at the elements that replaced the ones it used to name. Same keyframe, same
   duration, same three delays.
```

### Line 58, above `@media (prefers-reduced-motion: reduce) {`

```text
The old `.not-found-*` animations never honoured this and the kill-switch list in
   abstracts/_animations.scss never named them. Anything this file starts, this file stops.
```

### Line 68, above `/* Same two restatements as the 404, for the same two reasons. 500px is the old`

```text
---- Under construction ------------------------------------------------------------------------
```

### Line 70, above `.under-construction .page-heading {`

```text
Same two restatements as the 404, for the same two reasons. 500px is the old
   `.construction-subtitle` measure and 2rem is the gap it left before the way back, both
   unchanged.
```

### Line 82, above `.page-column {`

```text
The one plain column for pages outside the full-bleed list - today the 404 and
   under-construction. Replaces Bootstrap's container: same centring, no framework, and the
   1170px matches the ported list pages so a stub does not read narrower than a real page.
```
