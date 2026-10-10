# Comments removed from `_includes/about-scripts.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `<script type="module">`

```text
About's own JS. `assets/js/chrome.js` already runs the top bar, the magnets and the wordmark boil,
so only the two things this page alone has are here.
```

### Line 7, above `import { initLineBoil } from '{{ '/assets/js/components/line-boil.js' | relative_url }}';`

```text
One word inside the bio heading. The boil is a per-glyph font swap, not an overlay, so an
    inline span is a legal host and the text stays real selectable text.
```

### Line 12, above `import { init as initAchievementWall } from '{{ '/assets/js/components/achievement-wall.js' | relative_url }}'`

```text
The wall builds all 29 tiles and owns its own hover, click and persistence.
```
