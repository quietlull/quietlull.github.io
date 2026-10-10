# Comments removed from `_includes/tag-badges.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `{% comment %}`

```text
Tag badges for project cards. One icon table for the whole site.
Usage: {% include tag-badges.html tags=post.tags %}                 the old design's `.tag-badge`
       {% include tag-badges.html tags=post.tags variant='kit' %}   the redesign's `.kit-tag`
Both wrap the same icons; only the element and its classes differ. The generic "project" tag
never gets a badge. The icon colours are inline because they were, on both sides - they are
brand hues with no token, and minting seven names for them is a separate call.
```

### Line 10, above `{% assign badge_tags = include.tags | where_exp: 't', 't != "project"' %}`

```text
THE ICON COLOURS LIVE IN CSS NOW, not on the elements. They were eight raw hex values written
inline here, which broke two rules (STYLE.md forbids inline style; D42 says every colour is a
token so it can be changed in one place) and caused one visible fault: the FILTER ROW above
these cards paints the same seven icons, so when that row moved to tokens on 2026-09-02 and
this file did not, the same icon rendered two different colours on the same screen.
Both sides now read the `--pill-icon-*` tokens through the `.pill-icon--*` classes.
```
