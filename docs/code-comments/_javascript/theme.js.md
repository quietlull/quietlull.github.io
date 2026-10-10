# Comments removed from `_javascript/theme.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `class Theme {`

```text
Theme state. Read-only.

The site is dark-only. `theme_mode: dark` (_config.yml:91) stamps data-mode="dark" onto <html>
(_layouts/default.html:12), and _sass/themes/_light.scss was deleted in the merge, so there is
no light theme left to switch to. The flip button, the mode writers, the sessionStorage cache
and the system-preference listener were all removed in the D47 strip: nothing could reach them.

What survives is exactly what img-popup.js and mermaid.js read. Both use the bare `Theme`
identifier rather than importing it, because this file is bundled as a global
(rollup.config.js:82, `outputName: 'Theme'`) and loaded on every page (_includes/head.html:136).
```

### Line 17, above `static switchable = !document.documentElement.hasAttribute(this.#modeAttr);`

```text
True only if no mode is pinned on <html>. Always false while `theme_mode` is set.
```

### Line 30, above `static get ID() {`

```text
@returns {string} Theme mode identifier
```

### Line 37, above `static get visualState() {`

```text
The pinned mode if there is one, otherwise whatever the system is asking for.

@returns {string} 'dark' or 'light'
```

### Line 49, above `static getThemeMapper(light, dark) {`

```text
Maps theme modes to provided values
@param {string} light Value for light mode
@param {string} dark Value for dark mode
@returns {Object} Mapped values
```
