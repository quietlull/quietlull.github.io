# Comments removed from `_layouts/ramblings.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 10, above `{% assign all_posts = site.posts | where_exp: 'item', 'item.hidden != true' | where: 'tags', 'ramblings' %}`

```text
Ramblings, ported from `redesign-lab/final-ramblings.html`. A fixed centred column of hairline
entry rows, read from eveofficial.com/news/ (D15): the one layout of the four that handles a mix
of illustrated and text-only rows without moving the row's left edge.

THE QUERY CHANGED, and it is the one thing here that is not a straight port. It filtered
Rod 2026-08-26: filter on `tags: ramblings`. Nothing carries that tag yet and that is fine - the
page renders empty until a post opts in, which is the right way round. It used to filter on
`tags: personal`, which also matched nothing, but by accident rather than on purpose.
tag it reads now. Its other six rows are marked `data-placeholder` and were never real.

The tag chips are still on every row and still searchable, but there is no filter row: Rod
2026-08-24, "for ramblings we can have tags but not show them let them search it up using the box."

Dropped with the lab page: `#state`, `.labtag`, the `.gb` outlines, every `data-slot` /
`data-state`, the two spacer divs (now margins in the stylesheet), and its own footer copy.
```

### Line 51, above `<div class="searchrow">`

```text
The same field the projects page uses, spanning the column so it matches a row's width.
It renders ONLY when there are rows to filter. Outside this branch it drew a live, styled,
focusable box over an empty list: `search-field.js:79-80` finds no `.er-list .er-row`, so it
returns before binding and typing in the field does nothing at all.
```

### Line 78, above `{% if thumb %}{% include post-media.html src=thumb alt='' class='er-thumb' %}{% endif %}`

```text
`image.path` is written from the site root, so it does not take `media_subpath`.
```

### Line 85, above `<div class="es es--stack" role="status" hidden>`

```text
A no-RESULTS state, so it stays hidden until a search matches nothing. The JS writes the query into `.es__q`.
```
