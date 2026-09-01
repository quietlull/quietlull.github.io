/* ================================================================================================
   SEARCH FIELD - the filter behaviour, from ronja-tutorials.com.

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
   ============================================================================================== */

const PARAM = 'search';

/* Each host page says what its items are and where the text lives, so one module serves both
   without a page name appearing anywhere in here. */
const HOSTS = [
  {
    /* projects: cards in a grid. `display:none` removes a cell from grid auto-placement entirely
       and the survivors reflow up and left - `visibility:hidden` would leave a hole. */
    item: '.pv2-grid .pv2-cell',
    text: ['.card-title', '.pv2-desc', '.pv2-tags .kit-tag'],
    /* the pinned grid has its own heading and rule above it. Hide all three pinned cards and the
       heading is left sitting over nothing, so the group goes with them. */
    groups: [{ items: '.pv2-pinned .pv2-cell', also: ['.pv2-pinned', '.pv2-rule'] }]
  },
  {
    item: '.er-list .er-row',
    text: ['.er-ttl', '.er-blurb', '.er-strip .kit-tag'],
    /* filtered to nothing, the list collapses to its own 1px border and the panel behind it to
       46px - a stray hairline floating over the empty state. */
    groups: [{ items: '.er-list .er-row', also: ['.er-list'] }]
  }
];

const corpus = (el, sel) =>
  sel.flatMap(s => [...el.querySelectorAll(s)])
     .map(n => n.textContent)
     .join(' ')
     .toLowerCase();

export function init(root = document) {
  const input = root.querySelector('.sf__input');
  if (!input || input.dataset.sfBound) return;
  input.dataset.sfBound = '1';

  const host = HOSTS.find(h => root.querySelector(h.item));
  if (!host) return;

  /* Built once. Re-reading the DOM on every keystroke would be O(n) DOM work per character on a
     page with 16 cards and 45 tags. */
  const items = [...root.querySelectorAll(host.item)].map(el => ({ el, hay: corpus(el, host.text) }));
  const empty = root.querySelector('.es');

  const run = (raw) => {
    const q = raw.trim().toLowerCase();
    let shown = 0;
    items.forEach(({ el, hay }) => {
      const hit = !q || hay.includes(q);
      el.style.display = hit ? '' : 'none';
      if (hit) shown++;
    });

    host.groups.forEach(g => {
      const gone = [...root.querySelectorAll(g.items)].every(el => el.style.display === 'none');
      g.also.forEach(sel => {
        const el = root.querySelector(sel);
        if (el) el.style.display = gone ? 'none' : '';
      });
    });

    if (empty) {
      empty.hidden = shown !== 0;
      const said = empty.querySelector('.es__title');
      if (said && q) said.dataset.q = raw.trim();
    }

    const url = new URL(window.location.href);
    if (q) url.searchParams.set(PARAM, raw.trim());
    else url.searchParams.delete(PARAM);
    window.history.replaceState(null, '', url);
  };

  input.addEventListener('input', () => run(input.value));

  /* ronja's own rehydrate: a filtered list is linkable, so the param has to come back in. */
  const initial = new URL(window.location.href).searchParams.get(PARAM);
  if (initial) {
    input.value = initial;
    run(initial);
  }
}
