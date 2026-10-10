# Comments removed from `_javascript/modules/components/img-loading.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `const ATTR_DATA_SRC = 'data-src';`

```text
Setting up image lazy loading and LQIP switching
```

### Line 29, above `function switchLQIP() {`

```text
Switches the LQIP with the real image URL.
```

### Line 49, above `document.querySelectorAll('article img[loading="lazy"]').forEach((img) => {`

```text
Images loaded from the browser cache do not trigger the 'load' event
```

### Line 56, above `// so manually convert the URI to the URL of a high-resolution image.`

```text
LQIPs set by the data URI or WebP will not trigger the 'load' event,
```

### Line 57, above `const lqips = document.querySelectorAll(`

```text
so manually convert the URI to the URL of a high-resolution image.
```
