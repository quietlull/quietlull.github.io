# Comments removed from `_includes/skills-row.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `{% assign skills = include.skills | default: "unity,unreal,godot,blender,maya,python,git" | split: "," %}`

```text
The skills row, ported from `redesign-lab/final-landing.html`. Seven hand-drawn stroke icons that
draw themselves in on load, staggered by `--draw-delay`.

Driven by `page.skills`, so a section can name its own. The icon table is here because these are
single-path stroke marks - the site's `/assets/img/icons/*.svg` are filled logos and cannot be
drawn on. Falls back to the full seven.
```
