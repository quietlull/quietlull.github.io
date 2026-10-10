# Comments removed from `_includes/chrome-scripts.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `{% if include.tier == 'none' %}`

```text
============================================================================================
THE SHARED CHROME'S SCRIPTS. Loaded once, at the end of <body>, by `_layouts/default.html`.

ORDER IS THE FINAL PAGES', because it is load-bearing in one place: the scene bundle must be
requested before the effect modules that patch the controller it creates. They poll for it
either way, so this only decides how many polls are wasted.

Expects `include.tier` - "full", "minimal" or "none". `_layouts/default.html` derives it from
the layout and also writes it onto <body data-scene-tier>, which is what scene-mode.js reads.

TWO OF THE LAB'S FOUR EFFECT MODULES ARE DELIBERATELY ABSENT. Both exist because no LAB page
loads `commons.min.js`; on this site that premise is false and loading them would double-init:

  sparkler-init.js       `basic()` already calls `initMouseTrail()` in every bundle
                         (_javascript/modules/layouts/basic.js:16). The sparkler runs today.
  fireworks-greeting.js  `basic()` already calls `fireworksToggle()`, which owns the SAME
                         scroll gate at the same GATE_FRACTION of 0.3
                         (_javascript/modules/components/fireworks-toggle.js:16).

Both were checked in the live source, not assumed from the lab comments.
============================================================================================
```

### Line 26, above `<script src="{{ '/assets/js/effects/hana-bloom.js' | relative_url }}"></script>`

```text
THE BLOOM IS THE BACKGROUND HERE, and only here. Rod 2026-08-21: "the posts shouldnt have the
full scene can you make them use the scene replacement bloom for now?" Not requesting the
bundle is the whole saving - hiding the scene would still download and run 843 KB and keep a
WebGL context alive.

IT IS NOT LOADED ON SCENE PAGES, which is a deliberate difference from the final-* pages and
the lab wrote down why: all five of those set `#hana-bg` to `opacity: 0` and load this anyway,
so it "was baking two canvases at load, upscaling them to 1024px, appending them, and they
were invisible and unstyled. Real work for no pixels on six pages" (final-post.html:96).
```

### Line 39, above `<script defer src="{{ '/assets/js/dist/three-background-minimal.min.js' | relative_url }}"></script>`

```text
Embers only, 525 KB instead of 843. The 404 used to load this AND the full scene, because
it asked for this one itself in its own front matter while the else branch below handed it
the big one as well. It is requested here now, so there is exactly one request.
```

### Line 52, above `<script type="module" src="{{ '/assets/js/effects/fireworks-reach.js' | relative_url }}"></script>`

```text
A runtime override of `createAutoFirework`, because auto bursts spawn between 20% and 70% down
the viewport and never reach the top - Rod raised it twice. The permanent fix is one line in
`_javascript/firework-controller.js:198`; it is not done tonight because that file is Rollup
input and rebuilding 1.4 MB of gitignored bundle mid-merge is the wrong risk to take. See the
file header for the exact removal steps.
```
