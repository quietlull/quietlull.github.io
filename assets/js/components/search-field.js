const PARAM = 'search';

const HOSTS = [
  {
    item: '.pv2-grid .pv2-cell',
    text: ['.card-title', '.pv2-desc', '.pv2-tags .kit-tag'],
    groups: [{ items: '.pv2-pinned .pv2-cell', also: ['.pv2-pinned', '.pv2-rule'] }],
    pills: '.pv2-filters'
  },
  {
    item: '.er-list .er-row',
    text: ['.er-ttl', '.er-blurb', '.er-strip .kit-tag'],
    groups: [{ items: '.er-list .er-row', also: ['.er-list'] }]
  }
];

const corpus = (el, sel) =>
  sel.flatMap(s => [...el.querySelectorAll(s)])
     .map(n => n.textContent + ' ' + (n.getAttribute('aria-label') || ''))
     .join(' ')
     .toLowerCase();

export function init(root = document) {
  const input = root.querySelector('.sf__input');
  if (!input) return;

  const host = HOSTS.find(h => root.querySelector(h.item));
  if (!host) return;

  const items = [...root.querySelectorAll(host.item)].map(el => ({
    el,
    hay: corpus(el, host.text),
    tags: (el.dataset.tags || '').toLowerCase().split(',').filter(Boolean)
  }));
  const empty = root.querySelector('.es');

  const pillBox = host.pills ? root.querySelector(host.pills) : null;
  const pills = pillBox ? [...pillBox.querySelectorAll('[data-tag]')] : [];
  const clear = pillBox ? pillBox.querySelector('[data-clear]') : null;
  const active = new Set();

  const run = (raw) => {
    const q = raw.trim().toLowerCase();
    let shown = 0;
    items.forEach(({ el, hay, tags }) => {
      const hit = (!q || hay.includes(q))
        && (active.size === 0 || [...active].every(t => tags.includes(t)));
      el.style.display = hit ? '' : 'none';
      if (hit) shown++;
    });

    if (clear) clear.hidden = active.size === 0 && q === '';

    host.groups.forEach(g => {
      const gone = [...root.querySelectorAll(g.items)].every(el => el.style.display === 'none');
      g.also.forEach(sel => {
        const el = root.querySelector(sel);
        if (el) el.style.display = gone ? 'none' : '';
      });
    });

    empty.hidden = shown !== 0;
    empty.querySelector('.es__q').textContent = '“' + raw.trim() + '”';

    const url = new URL(window.location.href);
    if (q) url.searchParams.set(PARAM, raw.trim());
    else url.searchParams.delete(PARAM);
    window.history.replaceState(null, '', url);
  };

  input.addEventListener('input', () => run(input.value));

  pills.forEach(pill => pill.addEventListener('click', () => {
    const tag = pill.dataset.tag.toLowerCase();
    if (active.has(tag)) active.delete(tag); else active.add(tag);
    pill.classList.toggle('is-active', active.has(tag));
    pill.setAttribute('aria-pressed', String(active.has(tag)));
    run(input.value);
  }));

  if (clear) clear.addEventListener('click', () => {
    active.clear();
    pills.forEach(p => { p.classList.remove('is-active'); p.setAttribute('aria-pressed', 'false'); });
    input.value = '';
    run('');
  });

  const initial = new URL(window.location.href).searchParams.get(PARAM);
  if (initial) {
    input.value = initial;
    run(initial);
  }
}
