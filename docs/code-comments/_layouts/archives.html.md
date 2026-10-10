# Comments removed from `_layouts/archives.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 8, above `{% assign years = site.posts | group_by_exp: 'post', 'post.date | date: "%Y"' %}`

```text
The archive, every post on the site by year. Ported to the redesign 2026-08-31; before that it
was byte-identical stock Chirpy (docs/THEME-BOUNDARY-AUDIT.md), which drew a vertical timeline
with dots and a striped list, none of which exists anywhere else on the site any more.

SAME COMPONENTS AS THE TAG PAGE, which is the point: page-title-desc for the head, entry-row for
the list, empty-state if there is nothing to list. The archive is a list of posts, so it gets the
list-of-posts components and nothing is designed here.

THE ROWS ARE DATE AND TITLE, NOTHING ELSE. That is entry-row's version C, which the component
documents as the source's own row - "Eve's real row: date, title, nothing else". No blurb, no
picture and no tag chips: this is the page you come to when you want to find one post, and
19 dense rows beat 19 tall ones. It keeps entry-row's version B markup (the link inside the
heading) so the hover underline still works, which version C on its own gives up.

YEARS COME FROM `group_by_exp`, replacing Chirpy's open-and-close-the-`<ul>`-by-hand loop. That
loop emitted an unbalanced list whenever a year boundary and the last post lined up, and it put
the year in a bare `<time>` element with no heading at all. Grouping first makes each year a real
section with a real `<h2>`, so the page has a heading outline.

`site.posts` is already newest first, so the groups come out newest first too.
```

### Line 58, above `<span class="er-date">{{ post.date | date: '%m.%d' }}</span>`

```text
Month and day only. The heading above the list carries the year.
```
