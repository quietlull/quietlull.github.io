# Comments removed from `_layouts/under-construction.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 5, above `<div class="under-construction">`

```text
Under construction, ported to the redesign 2026-08-31. It is a stub with three parts and each
one is now a component that already shipped:
  - the title and the line under it   -> page-title-desc  (`.ptd`, `.d-h1` off the type ladder)
  - the way back                      -> button-kit       (`.kit-button--pill`, the landing's)
  - the three suggestions             -> related-card-real (`.rc-grid` of `.rc--v1` text cards)

The lantern and its float are kept as they were. They are the page's one piece of character and
the animation is already in `_sass/abstracts/_animations.scss`.

DROPPED WITH THE OLD PAGE: `.btn.btn-outline-primary.mt-3` and the `me-1` on its icon, all four
of them Bootstrap classes, which D48 is deleting; and the hand-built `.recommendation-card`,
whose glass panel, hover lift and `.rec-label` / `.rec-title` pair the `.rc` card replaces.

THE SCRIPT IS UNCHANGED except for the markup it writes. It still reads `?title=` and `?tags=`,
still derives the section from the URL, and still falls back to the section's recent posts.
```

### Line 43, above `<script>`

```text
Build lean JSON of non-WIP posts for recommendations
```

### Line 47, above `var pathParts = window.location.pathname.split('/').filter(Boolean);`

```text
Derive section from URL path: /tech-art/under-construction/ -> tech-art
```

### Line 62, above `function addCard(container, rec, related) {`

```text
One card, so the two branches below cannot drift apart in markup the way they used to.
      `.rc--v1` is the text-only version of the related card: it hides the cover slot, which is
      what this page needs, because the JSON below carries no image.
```

### Line 112, above `if (top.length === 0) {`

```text
Fallback: if no tag matches, show most recent posts from same section
```

### Line 121, above `if (!tags && section) {`

```text
Fallback: no tags param at all - show recent posts from section
```
