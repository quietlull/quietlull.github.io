# Comments removed from `_includes/datetime.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `{% assign df_strftime = site.data.locales[include.lang].df.post.strftime | default: '%d/%m/%Y' %}`

```text
Date format snippet
See: ${JS_ROOT}/utils/locale-dateime.js
```

### Line 9, above `<time`

```text
include.tooltip removed - it only added Bootstrap's tooltip-trigger attributes, and Bootstrap
is gone (D48). No caller was passing tooltip=true anyway (only caller is related-posts.html,
without the param), so nothing here changed what ships.
```
