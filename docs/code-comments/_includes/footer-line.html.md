# Comments removed from `_includes/footer-line.html`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `{% assign nav_section = page.section | default: '' %}`

```text
============================================================================================
FOOTER-LINE - ported from redesign-lab/extracted/components/footer-line/ on 2026-08-25.

Rod 2026-08-22: "i actually really like the way we do our lab footers i think we should do
them all like this." ORIGIN: ROD. It is the lab's `.labtag` treatment promoted from tooling
into a real element - ours, not sourced, and it must never be filed as though a reference
site supplied it.

A FOOTNOTE, NOT A SECOND NAVIGATION. The top bar already carries the nav, so columns and
headings here would only duplicate it. That is the reason it is one quiet line.

ONE COPY, WHICH IS THE POINT OF THE INCLUDE. Six inline copies used to exist in the lab, one
per final page, and they had already drifted - the landing was still on the old padding at
.66rem while the other five were on the corrected values. Rod 2026-08-23: "for the footer put
it in the workbench so we can get it right across the site." Do not inline a variant of this
in a layout; change it here.

NO "Built by hand" END SLOT. Rod removed it 2026-09-02. It was the only `.footer-line__end`
on the site, so its two CSS rules went with it; nothing else moves, because a `margin-left:auto`
item pulls only itself. It was also the last of the four sub-4.5:1 contrast failures listed in
docs/AUDIT-A11Y.md, at 3.76:1 on eight pages, so that row is closed by deletion rather than a fix.

It REPLACES `_includes/footer.html` (the copyright line), which is left on disk untouched.
THE COPYRIGHT NOTICE IS GONE WITH IT and that is a real loss, not a tidy-up - it was
`© <year> <name>` plus the locale copyright tooltip. The lab footer has no slot for it and
inventing one is a layout decision. Flagged for Rod rather than quietly restored.
============================================================================================
```

### Line 43, above `{% if page.url != landing_url %}`

```text
The way back, first item, exactly where the lab tag puts its own "&larr; lab".
Rod 2026-08-23: "for pages that arent the landing add the back arrow to landing too."
The landing does not get one - it would link to itself.
```

### Line 57, above `{% if nav_section != '' %}`

```text
Same section-scoping as the bar: there is no site-wide /projects/ or /about/, so off a
section page those two have no destination and are left out rather than pointed at a guess.
The three social links the landing once carried are NOT here - Rod 2026-08-22 (P106): "not
to have all these links". All three were href="#", which is a dead control in a costume.
The socials live on the portal.
```
