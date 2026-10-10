# Comments removed from `_includes/project-card.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `{% assign post = include.post %}`

```text
One project card, ported from `redesign-lab/final-projects.html` on 2026-08-25. The projects grid
and the landing's featured block both render this, so there is one card on the site.

Takes: post, section, hue ('a' or 'b'), and variant. The cover, the flip and the tilt are the
`project-cards-expensive` component; everything here is the markup it drives.

TWO VARIANTS, because the two pages ask the card for different things.
  (default) projects  a `.pv2-cell` in a fixed three-up grid, with a description, a meta rule and
                      an icon tag row. `data-tags` is what the search field filters on.
  landing             a `[data-column-span]` cell in the merged grid, title and tech line only.
                      Takes `span` and `rowspan`.
```

### Line 21, above `{% if post.wip and words < 20 %}`

```text
A WIP stub with no post behind it yet goes to the placeholder page, not to an empty post.
```

### Line 40, above `<video loop muted playsinline preload="metadata"><source src="{{ cover | relative_url }}" type="video/{{ ext }`

```text
No autoplay: project-cards-expensive.js starts the cover on hover.
```

### Line 53, above `{% assign tech = card_tags | slice: 0, 3 %}`

```text
The tech line, from the post's own tags rather than a hand-written string.
```

### Line 66, above `<div class="card-back">`

```text
`.takeaway-quote` is drawn by the component and is NOT emitted: the lab's pull quotes were
hand-written per card and no front-matter field holds one. It is copy Rod owes, not markup.
```
