# Comments removed from `_layouts/section-landing.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 10, above `{% assign section = page.section %}`

```text
A section landing, ported from `redesign-lab/final-landing.html` on 2026-08-25. A full-screen hero
with the name set vertically down the right, then Featured Projects, Skills, the reel, and a
screen of clear page for the scene.

The old landing - centred title, tagline, tools strip, scroll indicator, YouTube embed - is gone,
and `_sass/pages/_section-landing.scss` was rewritten from the lab page's own rules.

THE HERO SUBTRACTS THE BAR, which About deliberately does not: the bar is sticky on both, but this
hero is meant to end exactly at the fold.

Dropped with the lab page: `#state`, `.labtag`, every `data-slot` / `data-state`, `.slot-lite`,
and its own footer copy, which `_layouts/default.html` already renders.
```

### Line 31, above `{% assign spans = '6,6,6,12,6,6,6,6' | split: ',' %}`

```text
The grid rhythm, read off the lab page cell by cell: a tall lead card, a full-width break at
position four, pairs after that. It is a layout, not data, so it is a list rather than a rule.
```

### Line 40, above `<h1 class="hero__name">{{ site.social.name | default: site.title }}</h1>`

```text
The visible mark is the vertical columns, so these two carry the heading for anyone reading the page rather than looking at it.
```

### Line 106, above `{% if page.show_reel %}`

```text
The reel plays one post hero at a time; `landing-scripts.html` builds the list from front matter.
```

### Line 110, above `<div class="reel__bar" id="reel-bar"></div>`

```text
This host stays in the markup for the page's whole life. The `<video>` itself is built
and destroyed by `landing-scripts.html` as the reel enters and leaves view.

IT WAS WRITTEN AS AN EDGE GHOST-BOX FIX AND IT IS NOT ONE - see that file. It stays on its
own merits: a section that is off screen most of the time should not be decoding video.
```

### Line 121, above `<div class="scene-space" aria-hidden="true"></div>`

```text
A screen of clear page so the dock and the water get one to themselves.
```
