# Comments removed from `_layouts/tag.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 8, above `{% assign posts = page.posts %}`

```text
A tag page. Ported to the redesign 2026-08-31; before that it was byte-identical stock Chirpy
(docs/THEME-BOUNDARY-AUDIT.md), which drew a Font Awesome tag icon, a dotted `.dash` leader and
a Bootstrap flex row per post. This is the layout behind 19 of the 53 built pages, so it was the
largest block of unported markup left on the site.

IT IS BUILT AS RAMBLINGS, on purpose and with nothing new designed. A tag page IS a filtered
list of posts, which is what ramblings already is, so the same three components do the whole
page: page-title-desc for the head, entry-row for the list, empty-state for a tag with nothing
in it. Keeping the two pages structurally identical is the point - it is what makes a tag page
look like this site instead of like Chirpy.

`layout: default` RATHER THAN `layout: page`, which is what every ported layout does. The old
chain went tag -> page -> default and page.html only added `<article class="px-1">`, a Bootstrap
class that D48 is removing anyway.

jekyll-archives supplies both variables used below: `page.title` is the tag itself and
`page.posts` is its post list (_config.yml, the `jekyll-archives` block).

NO SEARCH FIELD, unlike ramblings. The list is already filtered to one tag, so the field would
filter a filter, and it would cost a script include on 19 pages.

NO THUMBNAIL COLUMN either, unlike ramblings, and that IS a difference worth naming: the tag
pages are a lookup surface reached from a chip, so the rows stay dense. `er-row--media` is one
class away if Rod wants the pictures back.
```

### Line 41, above `<div class="page-heading page-heading--sub">`

```text
The plain `.ptd--sub` preset, not `.ptd--ramblings`: that modifier pins the title box to
380px and the description to 520px, both measured off the ramblings blockout. A tag name
is one word and has no blockout of its own, so it takes the component's own defaults.
```

### Line 53, above `<div class="es es--stack">`

```text
jekyll-archives only builds a page for a tag that has posts, so this cannot fire today.
It is here because the two other list pages carry it and a list page without an empty
state is the thing that breaks the day the generator config changes.
```

### Line 67, above `{% assign chips = post.tags | where_exp: 't', 't != page.title' %}`

```text
The tag this page IS gets no chip - it would link every row back here.
```
