# Comments removed from `_layouts/blog.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 10, above `{% assign all_blogs = site.posts | where_exp: 'item', 'item.hidden != true' | where: 'tags', 'blog' %}`

```text
Blogs, ported to the redesign 2026-08-31. It is the SAME ROW LIST AS RAMBLINGS on purpose, not
for want of a second idea: both pages are a dated index of posts where some rows carry a picture
and some do not, and `entry-row` is the layout D15 picked for exactly that case, because a row
with a picture and a row without keep the same left edge. Nothing new was designed here. Every
visible part is a component that already shipped: page-title-desc, search-field, entry-row,
empty-state.

DROPPED WITH THE OLD PAGE. All of it was Bootstrap card markup with no redesign counterpart, and
each one is Rod's to reverse:
  - the `.vertical-bar-*` card row, the `input-group` search box, the `.filter-pill` tag row
  - the reading-time chip. No row on any ported index carries one.
  - the "Pinned" badge. Pinned posts already sort to the top of the list, which is how Projects
    and Ramblings show a pin.
  - the `.no-posts` block that `post-filter.js` injected. The approved `.es` empty state
    replaces both it and the "No blog posts yet" message.

THE SEARCH BOX IS THE FILTER NOW, the same trade Ramblings made. Rod 2026-08-24, about
Ramblings: "we can have tags but not show them let them search it up using the box." The tag
chips stay on the row and stay searchable. `search-field.js` already matches a
`.er-list .er-row` host, so this page needed no new JS, only the two-line include that starts it.
```

### Line 41, above `<div class="page-heading page-heading--sub">`

```text
No page modifier on `.ptd`. Both of the component's modifiers are transcriptions of a
specific blockout, and there is no blockout for this page, so it takes the component's own
defaults rather than borrowing a width that was measured for Ramblings.
```

### Line 60, above `<div class="blog-searchrow">`

```text
Rendered ONLY when there are rows to filter, the same guard Ramblings carries: outside this
branch `search-field.js` finds no `.er-list .er-row`, returns before binding, and the page is
left with a live-looking box that does nothing.
```

### Line 86, above `{% if thumb %}{% include post-media.html src=thumb alt='' class='er-thumb' %}{% endif %}`

```text
`image.path` is written from the site root, so it does not take `media_subpath`.
```

### Line 93, above `<div class="es es--stack" role="status" hidden>`

```text
A no-RESULTS state, so it stays hidden until a search matches nothing. The JS writes the query into `.es__q`.
```
