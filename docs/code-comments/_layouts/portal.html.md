# Comments removed from `_layouts/portal.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 9, above `<div class="pground">`

```text
The portal, ported from `redesign-lab/final-portal.html`. It is a viewport-locked field of
draggable windows: sizes and positions come from spacejam.com/1996 (D15), the frame ratios from
zutomayo's served CSS, and the drag, throw, bounce and lean are ours. Full provenance lives in
`_sass/components/_portal-window.scss` and `assets/js/effects/portal-windows.js`.

It carries no top bar and no footer (Rod, 2026-08-23) and it does not scroll - `default.html`
handles both. `data-x/y/w/h` are Space Jam's measurements in its own 500x520 stage, not pixels on
this page; the JS rescales them. Do not correct them against what you measure here.
```

### Line 80, above `<div class="pwin pwin--social" data-x="224" data-y="388" data-w="62" data-h="62">`

```text
Inline SVG, not Font Awesome - the portal loads no icon font, and `.pwin__icon` styles a real svg.
```

### Line 157, above `{% comment %} The welcome line is a SIBLING: inside '.centre' the button's aria-label would swallow it. {% end`

```text
The mark doubles as the reset control - clicking it restores every closed window.
```

### Line 158, above `<div class="centre" role="button" tabindex="0" aria-label="Restore all closed windows">`

```text
The welcome line is a SIBLING: inside `.centre` the button's aria-label would swallow it.
```
