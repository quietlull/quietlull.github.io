# Comments removed from `_layouts/section-projects.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 10, above `{% assign section = page.section %}`

```text
Projects, ported from `redesign-lab/final-projects.html` on 2026-08-25. A 1176px column: title,
a controls panel holding the search field and the tag row, the pinned grid, a rule, then the rest.

THE CARDS ARE `.merged-cards` NOW, which is the point of this commit beyond the look. Five old
class rules - `post-card`, `card-body`, `card-meta`, `card-link`, `takeaway-text` - could not be
deleted while their replacements only existed under a class no live page carried. This page
carries it.

Dropped with the lab page: `#state`, `.labtag`, every `data-slot` / `data-state`, and the trailing
spacer div. Dropped with the OLD page: the Bootstrap card grid, the results counter, the per-pill
match counts and the empty-pill dimming - the lab lists all three as things the redesign does not
have, and the approved `.es` empty state replaces the injected one.

There is no `description` on either projects page, so the title stands alone. Rod, 2026-08-24:
"we dont need a tagline under tech art projects."
```

### Line 68, above `{% for post in normal %}`

```text
The a/b alternation runs across both grids, so this one picks up where the pinned grid stopped.
```

### Line 85, above `<div class="es es--stack" role="status" hidden>`

```text
A no-RESULTS state: hidden until a search or a tag matches nothing.
```
