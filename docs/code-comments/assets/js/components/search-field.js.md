# Comments removed from `assets/js/components/search-field.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `const PARAM = 'search';`

```text
================================================================================================
  SEARCH FIELD - the filter behaviour, from ronja-tutorials.com.

  Ported from `redesign-lab/extracted/components/search-field/` on 2026-08-26. Three changes, all
  because the lab page did less than the live page has to:
    - the query is written into `.es__q`, so the empty state says what was searched for. The lab
      set it on a `data-q` attribute no stylesheet ever read, under a hard-coded example query.
    - the corpus reads `aria-label` as well as text, because the projects tags are icon-only and
      their `textContent` is empty - searching "unity" matched nothing.
    - THE TAG PILLS FILTER. The lab drew them and wired nothing, and the live page's own
      `post-filter.js` has been filtering those tags for months. An item must carry EVERY active
      tag, which is `post-filter.js`'s own AND semantics, so the behaviour does not change.
      Deliberately NOT ported with it: the results counter, the per-pill match counts and the
      empty-pill dimming. The lab lists all three as things the redesign does not have.

  Rod picked candidate A on `search-field.html` 2026-08-24. What that pick actually buys is stated
  plainly because it is unusual: **ronja supplies a MECHANISM and no look at all.** Both of its
  stylesheets were read and the only rules that match its input are normalize boilerplate plus a
  .25rem margin - not one design decision. So the behaviour below is theirs and the box is ours.

  WHAT IS THEIRS, verbatim from https://www.ronja-tutorials.com/ (read 2026-08-24):
    - a FILTER, not a search. No form, no submit, no results page. Rows hide in place.
    - case-insensitive `includes`, run on every `input` event, no debounce.
    - the query mirrors into a `?search=` URL param so a filtered list is LINKABLE, and is read
      back on load. `history.replaceState`, so it makes no history entries.
    - the param is dropped entirely when the field is empty.

  WHAT IS DELIBERATELY NOT THEIRS, and why:
    - **They read `.innerHTML`.** Our titles contain `&rsquo;` and `&mdash;`, so a literal port
      would let someone match the string "rsquo". We read `textContent`.
    - **They do not trim.** A trailing space fails to match on their site. `post-filter.js:47`,
      the live site's own filter, trims. Trimming is better and we follow our own code.
    - **They search title + summary and NOT tags.** Both our placeholders promise tags, so the
      corpus here is title + description + tags, matching `post-filter.js` rather than ronja.
      That is a documented departure, not an oversight.
    - **They have no empty state.** When everything filters out their list is simply blank. We
      have a built one and it gets toggled.

  ONE THING TO KNOW ABOUT THE EMPTY STATE. `empty-state.css` has `.es[hidden]{display:none}`, which
  exists because a class rule was beating the `hidden` attribute and the message was rendering
  underneath eight visible rows. **Toggle `hidden`, never `style.display`**, or that bug comes back.
  ==============================================================================================
```

### Line 46, above `const HOSTS = [`

```text
Each host page says what its items are and where the text lives, so one module serves both
  without a page name appearing anywhere in here.
```

### Line 50, above `item: '.pv2-grid .pv2-cell',`

```text
projects: cards in a grid. `display:none` removes a cell from grid auto-placement entirely
      and the survivors reflow up and left - `visibility:hidden` would leave a hole.
```

### Line 54, above `groups: [{ items: '.pv2-pinned .pv2-cell', also: ['.pv2-pinned', '.pv2-rule'] }],`

```text
the pinned grid has its own heading and rule above it. Hide all three pinned cards and the
      heading is left sitting over nothing, so the group goes with them.
```

### Line 62, above `groups: [{ items: '.er-list .er-row', also: ['.er-list'] }]`

```text
filtered to nothing, the list collapses to its own 1px border and the panel behind it to
      46px - a stray hairline floating over the empty state.
```

### Line 82, above `const items = [...root.querySelectorAll(host.item)].map(el => ({`

```text
Built once. Re-reading the DOM on every keystroke would be O(n) DOM work per character on a
    page with 16 cards and 45 tags.
```

### Line 87, above `tags: (el.dataset.tags || '').toLowerCase().split(',').filter(Boolean)`

```text
Jekyll writes the real tag list onto the cell, so a tag with an icon and no text still
      filters. Reading it from the markup rather than from the chips keeps the two in step.
```

### Line 147, above `const initial = new URL(window.location.href).searchParams.get(PARAM);`

```text
ronja's own rehydrate: a filtered list is linkable, so the param has to come back in.
```
