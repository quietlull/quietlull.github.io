# Comments removed from `_includes/top-bar.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `{% assign nav_section = page.section | default: '' %}`

```text
============================================================================================
TOP BAR - the redesign's, ported from redesign-lab/extracted/components/top-bar/ on 2026-08-25.

Structure is the component's, unchanged: favicon + name LEFT, nav CENTRED, nothing right.
The toggles the lab component still carries are NOT here - they were removed 2026-08-18
(D20/D21), one combined control is to govern scene + motion and where it lives is still open.
Their absence is what makes the nav genuinely centred, so this is not a trim, it is the layout.

IT REPLACES `_includes/topbar.html`, which is left on disk untouched. That file renders a
261.61px three-row Chirpy header - avatar, site title, tagline, icon nav, four switches, the
contact row. Restoring it is one line in `_layouts/default.html`.

WHAT WENT WITH THE OLD BAR, said out loud because each is a control that no longer exists:
  #mode-toggle       light/dark flip. `modeWatcher()` no-ops without it (mode-toggle.js:8).
  #breathe-toggle    gone for good. Breathing is dead (D43) and so is everything that drove
                     this switch, so there is nothing left for it to control.
  #sparkler-toggle   the sparkler itself still runs - it is `initMouseTrail()` in every
                     bundle - but it can no longer be switched off from the page.
  #fireworks-toggle  already section-about-only, and already `.reward-locked`. Rod retired
                     unlocks outright (P77), so nothing is lost.
  contact icons      the socials. They live on the portal, which is where Rod put them.
All four JS entry points were checked and every one is null-safe, so nothing throws.

THE JS IS NOT OPTIONAL. `assets/js/chrome.js` runs the magnets and boils the wordmark.
Shipping this markup without it is exactly how the lab's projects page once rendered a bar
Rod called "clearly broken".
============================================================================================
```

### Line 48, above `<a class="top-bar__home" href="{{ home_url | relative_url }}">`

```text
The wordmark boils - it is the site mark at a smaller size (Rod 2026-08-23: "add the line
boil text to the top bar as well"). `.line-boil-text` is what line-boil.js adds itself; it is written
here too so the pinned-glyph CSS applies on the first paint rather than one frame late.

IT IS NOW A LINK HOME. Rod 2026-08-25: "can you also make sure clicking on my name takes you
to the home landing page as well?" This comment used to argue the opposite, that it should
stay a bare <span> because an <a> would hand it the site's link colour and hover. That
hazard is real and is handled in `.top-bar__home` rather than avoided: the anchor carries no
decoration and inherits colour, and the mark keeps setting its own gold, so nothing about
the rendered wordmark changes.
THE SPAN IS DELIBERATELY STILL THERE, wrapped rather than replaced. `line-boil.js` rewrites
its host's entire contents into pinned per-glyph cells, and every ported rule for the mark is
written against `.top-bar__logo`. Making the anchor itself the boil host would have moved
both of those onto an element nobody wrote them for.
`home_url` is the SECTION landing when you are in a section (`/tech-art/`) and the portal
otherwise, which is the same destination the favicon beside it already uses.
```

### Line 76, above `<a class="top-bar__link js-magnetic{% if page.url == projects_url or page.url contains '/posts/' %} is-active{`

```text
Projects and About are SECTION-SCOPED on this site - there is a /tech-art/projects/ and a
/game-design/projects/ and no /projects/ at all. Off a section page there is no single
destination for either, and picking one would be inventing a link. So outside a section
the bar carries Home and Ramblings only, and the section doors on the portal are how you
get to the other two. The lab's four-item bar is the IN-SECTION case.
```

### Line 89, above `<a class="top-bar__link js-magnetic{% if page.url == '/game-design/blogs/' %} is-active{% endif %}"`

```text
A fifth item, only here. `_tabs/blogs.md` is a real page at /game-design/blogs/ and the
old bar was its only route in - dropping it to keep the lab's tidy four would orphan it.
Rod gets to decide whether the page stays; silently stranding it is not that decision.
```

### Line 99, above `</nav>`

```text
Ramblings came out of the bar 2026-08-26. Rod: it should be reached from the portal, not from
inside a section. The bar is for moving around the section you are already in.
```
