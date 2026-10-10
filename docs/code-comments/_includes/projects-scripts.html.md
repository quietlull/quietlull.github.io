# Comments removed from `_includes/projects-scripts.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `<script type="module">`

```text
Projects' own JS. A component is its markup AND its container AND its JS - the lab shipped these
cards without this block once and Rod called the page "clearly broken": nothing magnetic
initialised, no card could flip, and no cover video played.
```

### Line 8, above `import { init as initCards } from '{{ '/assets/js/components/project-cards-expensive.js' | relative_url }}';`

```text
initCards also runs merged-card and drift-magnet internally.
```
