# Comments removed from `_layouts/section-about.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 10, above `<div id="about-page">`

```text
About, ported from `redesign-lab/final-about.html`. Rod's model, 2026-08-23: "about page is the
landing page except the about me is the hero, the achievements are the project cards."

Three bands in a column, then the scene gets the bottom of the page. The old `#home-page` markup -
landing box, profile container, trophy grid - is gone, and `_sass/pages/_about.scss` replaces the
`body.spacious` rules the lab page carried inline.

Dropped with the lab page: the `.gb` greybox wrappers, `.slot__tag`, `.slot__wait`, the `#state`
counter, the `.labtag`, and its own copies of the top bar and footer, which are shared includes.

THE HERO IS 50vh WITH A 590px FLOOR, Rod's own tune. It does NOT subtract the top bar the way the
landing does - the bar is `position: sticky` and takes real layout space, so About starts below it.
```

### Line 29, above `<div class="hero__fill">`

```text
`.hero__fill` is what holds the hero to a full first screen - layout, not decoration.
```

### Line 35, above `<div class="pf pf--window">`

```text
No portrait exists yet, so the frame shows the favicon and says so with `data-placeholder`.
```

### Line 49, above `<div class="biocol">`

```text
An h2, not an h3: this is a section head, and the tag has to match the role (WCAG 1.3.1).
```

### Line 59, above `<section class="band band--tight">`

```text
No big header here - Rod 2026-08-23: "second about me doesnt need a header maybe it can use a lesser header".
```

### Line 67, above `<section class="band">`

```text
The wall builds its own 29 tiles from the real achievement list, so the page hands it a root and nothing else.
```

### Line 79, above `{{ content }}`

```text
Pages that still write raw HTML into the body render here.
```

### Line 83, above `<div class="scenewide" aria-hidden="true"><div class="scenewide__hole"></div></div>`

```text
85vh of clear page so the dock and the water get a screen of their own, same as the landing reserves.
```
