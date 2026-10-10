# Comments removed from `_includes/portal-scripts.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `<script type="module" src="{{ '/assets/js/effects/portal-windows.js' | relative_url }}"></script>`

```text
============================================================================================
THE PORTAL'S OWN JS, ported from the tail of `redesign-lab/final-portal.html` on 2026-08-26.
Reached through `script_includes` in `_layouts/portal.html`, so `_layouts/default.html` emits it
before the shared chrome scripts, exactly as the lab page ordered them.

`assets/js/chrome.js` already runs drift-magnet page-wide and boils the top bar's wordmark. The
portal carries no top bar, so the mark below is the only thing on the page that boils, and it has
to ask for itself.
============================================================================================
```

### Line 16, above `(function () {`

```text
THE TEXT FILL - a PLACEHOLDER, and deliberately a small one. Rod 2026-08-23: "do a spam of
    repeated text of what the header says inside the box for now."

    It is generated from each window's OWN title rather than written into the markup, for two
    reasons: eight windows times forty repeats is 300+ lines of noise in a file people have to
    read, and a baked copy would drift the moment a title changed.

    The fill is aria-hidden and each link carries a `.pwin__sr` label instead. Repeating a word
    forty times is texture to look at and pure noise to listen to, so a screen reader gets the name
    once. Deleting this script and the two spans is the whole removal when real content arrives.
```

### Line 39, above `import { initLineBoil } from '{{ '/assets/js/components/line-boil.js' | relative_url }}';`

```text
The centre identity mark boils like the landing's H0 - same component, same picked pattern.
```
