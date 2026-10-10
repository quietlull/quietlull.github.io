# Comments removed from `_layouts/post.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 8, above `{% include toc-status.html %}`

```text
A post, ported from `redesign-lab/final-post.html` on 2026-08-25. A 24-column spine: a header box
across the top, a sticky rail on the left carrying metadata, contents, tags and socials, and the
reading well on the right.

`panel_includes` and `tail_includes` are gone. Both put their content in the Bootstrap grid this
page no longer uses - the rail replaces the panel, and post-nav and the comments are placed
explicitly at the foot of the article instead.

`.prose` ALSO CARRIES `.content`. tocbot reads `contentSelector: '.content'` for the headings, and
`post-enhance.js` and `clipboard.js` bind to it for image popups and code copying. One element
keeps all three working while `.prose > * + *` still reaches the post's own paragraphs.

IT IS A JS HOOK HERE AND NOTHING ELSE. `.content` in base/_base.scss used to size its own text,
unlayered, so it beat the prose layer and set the inherited size for the whole post body. It is
scoped to `:not(.prose)` now, so the prose ladder owns the type on this page.

Dropped with the lab page: `#state`, `.labtag`, every `data-slot` / `data-state`, and its
hand-written article - callouts, code blocks, figures and pull quotes are all things a Markdown
post cannot emit today, so the slots for them are not carried as empty furniture. The takeaway
stamp is the one that has real data behind it, and it stays.
```

### Line 33, above `<article id="post-page" data-toc="{{ enable_toc }}">`

```text
An <article>, and a DIRECT child of <main>, because `toc.js` gates the whole TOC on
`main > article[data-toc="true"]` and returns early otherwise. That module is Rollup input and
its bundle is gitignored build output, so the markup meets the JS rather than the other way round.
```

### Line 65, above `{% comment %} 'toc.js' also un-hides '#toc-wrapper' by id. It is NOT given the 'invisible'`

```text
tocbot fills this from the headings in `.content`.
```

### Line 66, above `<div class="railblock" id="toc-wrapper">`

```text
`toc.js` also un-hides `#toc-wrapper` by id. It is NOT given the `invisible`
         class the old layout used: if the bundle ever fails the TOC should be a beat late, not gone.
```

### Line 123, above `{% if page.takeaway %}`

```text
Rod's own stamp, the one callout on this page with real data behind it.
```

### Line 145, at the end of the file

```text
THE NARROW-VIEWPORT TOC IS DELETED (Rod, 2026-09-03, asked twice: "this is weird and shouldnt
exist", then "the toc button still exists AGAIN").

What went: `#toc-solo-trigger`, the inline Contents button; `#toc-bar`, the sticky strip that
replaced it on scroll; and `#toc-popup`, the dialog they both opened. Measured before removing,
so the loss is stated rather than discovered later: at a 1023px viewport that bar was rendering
`display:flex`, 1045x48, sticky, with one visible trigger - it was not a leftover, it worked.

WHAT THIS COSTS: under 1200px there is now no table of contents at all. The rail
(`#toc-wrapper`) is the only one left and `_sass/pages/_post.scss` hides it below 1199.98px.
Headings still carry their anchors, so deep links keep working.

`toc-mobile.js` is deleted with it and `toc.js` no longer branches on width.
```
