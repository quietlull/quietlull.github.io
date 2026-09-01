# The remaining five inline elements - kbd, mark, sup, sub, abbr

**Read from source 2026-08-23.** Rod: *"yes go find sources for the remaining five."*
These are the elements `text-decisions.html` could not build because no saved prose source defined
them. Every rule below was fetched and read from the live stylesheet named beside it.

**Sites searched (all CSS fetched and grepped, not assumed):** MDN (all 8 style bundles),
docs.astro.build / Starlight (8 bundles), catlikecoding, acegikmo, iquilezles, thebookofshaders,
ronja-tutorials, Tufte CSS, gwern.net.

**Preference honoured:** MDN and Starlight were already cited in the ledger (TOC and code block),
so three of the five come from sites already in the source set rather than new ones.

---

## kbd - MDN

```css
.content-section kbd{
  background-color: var(--color-background-primary);
  border: solid var(--color-border-primary);
  border-radius: var(--radius-normal);
  border-width: 1px 1px 2px;
  color: var(--color-text-secondary);
  font-family: var(--font-family-code);
  padding: .0625em .125em;
}
```

**The device is `border-width: 1px 1px 2px`.** A thicker BOTTOM border and nothing else - no shadow,
no gradient, no inset. That single asymmetry is what makes it read as a physical key with an edge
you could press. Everything else is a mono chip.

Cheap, and it survives the palette law untouched because every colour is a token reference.

---

## mark - two sources that disagree completely

```css
/* MDN, styles-left-sidebar: highlight, keep the text colour */
.left-sidebar mark{ background-color: var(--color-background-yellow); color: unset; }

/* Starlight / DocSearch, middleware bundle: NO background at all, colour only */
.DocSearch-Hits mark{ color: var(--docsearch-highlight-color); background: 0 0; }
.DocSearch-Hit[aria-selected=true] mark{ text-decoration: underline; }
```

Worth having both: they are opposite answers to the same question. MDN paints the ground and leaves
the text alone (`color:unset` is deliberate - it undoes the UA's black-on-yellow). Starlight kills
the ground entirely (`background:0 0`) and marks with colour, then adds an underline only when the
row is already selected, so the mark never competes with the selection.

**Both are search-result highlighting, not prose `<mark>`.** That is honest to report: neither site
uses `<mark>` in body copy. The mechanisms transfer; the context does not.

---

## sup - gwern.net, and it is the interesting one

```css
a.footnote-ref sup{ font-size: 0.75em; vertical-align: baseline; }

/* Deal with multiple footnote superscripts one after another; per Charuru */
sup + sup, a.footnote-ref{ margin-left: 0.125em; }

/* 'Foreign' footnotes. */
sup a, sub a{ margin-left: 0.10em; margin-right: 0.13em; }
sup a + a, sub a + a{ margin-left: 0.20em; margin-right: 0.13em; }

/* Ordinals get their own role, separate from footnotes. */
sup.ordinal{ text-transform: lowercase; top: 0.1em; text-shadow: none; }
.heading sup.ordinal{ font-variant-caps: small-caps; }
```

**`vertical-align: baseline` on a superscript is the whole idea.** A footnote marker does not rise -
it just shrinks to 0.75em and sits on the line. That keeps the leading perfectly even, which is the
usual cost of superscripts in body copy.

The rest is optical spacing that only a site with real footnotes would ever discover: consecutive
markers get 0.125em between them, linked ones get asymmetric 0.10/0.13em side bearings, and two
adjacent links get 0.20em. The `per Charuru` comment is theirs - the fix came from a reader.

**And `sup.ordinal` is a separate role from the footnote marker.** "1st" and "footnote 1" are
different objects and gwern styles them apart. Worth copying that distinction regardless of the CSS.

## sup - Tufte CSS, the minimal version

```css
sup{ line-height: 0; }
```

The entire rule. It stops the raised glyph from expanding the line box, and accepts the default
raise. One declaration, and it solves the only real problem superscripts cause in prose.

**Note for the ledger:** the `font-variant: small-caps` that appears near `sup` in Tufte's file
belongs to `span.newthought`, a different role. Checked, because it would have been an easy
misattribution.

---

## sub - gwern only, and thinly

`sub` is covered by the shared `sup a, sub a` optical-spacing rules above. The only `sub`-specific
rule anywhere is `.logotype-tex sub`, which exists to set the "E" in the TeX logo:

```css
.logotype-tex sub{ text-transform: uppercase; vertical-align: -0.50ex;
  margin-left: -0.08em; margin-right: -0.08em; font-size: 1em; }
```

**That does not generalise and should not be cited as a `sub` treatment.** Recorded so nobody
re-finds it and mistakes it for one. If `sub` needs a real design, it is currently UNSOURCED.

---

## abbr - genuinely unsourced, and that IS the finding

**Zero designed `abbr` rules across every site listed at the top of this file.** The only rule found
anywhere is normalize.css boilerplate, shipped inside Ronja's bundle:

```css
abbr[title]{ border-bottom: none; text-decoration: underline; text-decoration: underline dotted; }
```

That is a reset, not a design - the duplicated `text-decoration` is normalize's own fallback pattern
for browsers without `underline dotted`. Ronja did not choose it; Bootstrap put it there.

**So the honest position is: nobody designs `abbr`.** The dotted underline is the universal default
and every site read simply lets it happen. Presenting that as a sourced choice would be a false
citation. If Rod wants a designed `abbr`, it needs a new reference hunt with that as the goal.
