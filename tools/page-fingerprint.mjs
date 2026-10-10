// Did a change move anything a visitor can see? Record where every element sits, then compare.
//
//   node tools/page-fingerprint.mjs capture before.json            (reads ./_site)
//   node tools/page-fingerprint.mjs capture after.json --site path/to/_site
//   node tools/page-fingerprint.mjs compare before.json after.json
//   node tools/page-fingerprint.mjs compare before.json after.json --ignore-classes
//
// --ignore-classes matches elements by tag and position only. Use it when a change removed class
// names from the markup on purpose: every element should still be where it was.
//
// A capture loads ten sample pages at two widths in a real browser and writes down, for every
// element: its tag, its classes, and its position and size in whole pixels. `compare` exits 1 if
// any element moved, resized, appeared or disappeared, and lists them.
//
// THREE THINGS KEEP IT HONEST.
// - Every page is loaded twice and only elements that sat in the same place both times are kept,
//   so things that are random by design (fireflies, the portal windows, a drifting icon caught
//   mid-drift) cannot raise a false alarm. Reduced motion is switched on for the same reason, and
//   anything with a CSS animation running on it, or on an ancestor, is left out.
// - Script errors on a page are part of the fingerprint. A page that silently stopped running a
//   script still "looks the same" for a second; the error does not.
// - Every page believes it was opened at noon on 15 January 2026. The achievement wall unlocks a
//   tile for a visit between midnight and 4am, which moves one star by a pixel, so a capture taken
//   in the evening and one taken after midnight used to disagree about a page nobody had touched.
//
// Without --styles it checks layout, not colour: a rule that only changed a colour would pass.
//
//   node tools/page-fingerprint.mjs capture before.json --styles
//
// --styles also records what every element looks like: a short code made from every style value
// the browser computed for it and for its ::before and ::after. Use it for any change to a
// stylesheet. `compare` then also reports an element whose colour, font, border, shadow or any
// other style changed while it stayed in place. Both captures must be taken the same way.
// It reads each element at rest; it does not hover or press anything. Custom properties (--name)
// are left out on purpose: one that nothing uses can be deleted without changing how anything looks.
// Each element is read twice, 200ms apart, on each of the two loads. One whose style changed by
// itself between any of those reads (the line boil lettering swaps fonts six times a second) is
// recorded as "looks changing", and `compare` checks only its position, in both captures.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch } from './real-browser.mjs';
import { serve } from './static-server.mjs';

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = ['/', '/tech-art/', '/tech-art/projects/', '/tech-art/posts/ComputeGrass/', '/tech-art/about/',
  '/ramblings/', '/archives/', '/tags/blog/', '/tech-art/under-construction/', '/404.html'];
const WIDTHS = [1440, 390];
const CHANGING = 'looks changing';
const place = (row) => row.slice(0, 5).join();

const OPENED_AT_NOON = `(() => {
  const Real = Date;
  const shift = new Real(2026, 0, 15, 12).getTime() - Real.now();
  function Shifted(...args) {
    if (!new.target) return new Real(Real.now() + shift).toString();
    return args.length ? new Real(...args) : new Real(Real.now() + shift);
  }
  Shifted.prototype = Real.prototype;
  Shifted.now = () => Real.now() + shift;
  Shifted.parse = Real.parse;
  Shifted.UTC = Real.UTC;
  window.Date = Shifted;
})()`;

const READ = (styles) => `(async () => {
  await document.fonts.ready;
  const rows = [];
  const animating = new Set(document.getAnimations().map((a) => a.effect && a.effect.target).filter(Boolean));
  const moving = (el) => { for (let n = el; n; n = n.parentElement) if (animating.has(n)) return true; return false; };
  const look = (el, part) => {
    const computed = getComputedStyle(el, part);
    if (part && ['none', 'normal'].includes(computed.content)) return '';
    let text = '';
    for (const name of computed) if (!name.startsWith('--')) text += name + ':' + computed.getPropertyValue(name) + ';';
    return text;
  };
  const code = (text) => {
    let h = 2166136261;
    for (let i = 0; i < text.length; i += 1) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
    return (h >>> 0).toString(36);
  };
  const elements = [...document.body.querySelectorAll('*')].filter((el) =>
    !['SCRIPT', 'STYLE', 'BR', 'SOURCE'].includes(el.tagName) && !(el.closest('svg') && el.tagName !== 'svg') && !moving(el));
  const looks = () => elements.map((el) => code(look(el) + '|' + look(el, '::before') + '|' + look(el, '::after')));
  let steadyLooks = null;
  if (${styles}) {
    const first = looks();
    await new Promise((resolve) => setTimeout(resolve, 200));
    const second = looks();
    steadyLooks = first.map((value, i) => (value === second[i] ? value : 'changing'));
  }
  elements.forEach((el, i) => {
    const box = el.getBoundingClientRect();
    const row = [el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).join('.') : ''),
      Math.round(box.left + scrollX), Math.round(box.top + scrollY), Math.round(box.width), Math.round(box.height)];
    if (steadyLooks) row.push('looks ' + steadyLooks[i]);
    rows.push(row);
  });
  return rows;
})()`;

async function capture(out, siteDir, styles) {
  const site = await serve(siteDir);
  const page = await launch(9570);
  const result = {};
  try {
    await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await page.send('Page.addScriptToEvaluateOnNewDocument', { source: OPENED_AT_NOON });
    for (const width of WIDTHS) {
      await page.resize(width, 900);
      for (const url of PAGES) {
        const passes = [];
        let problems = [];
        for (let pass = 0; pass < 2; pass += 1) {
          await page.goto(site.url + url, 2200);
          passes.push(await page.evaluate(READ(styles)));
          problems = problems.concat(page.problems().filter((p) => !p.endsWith('/favicon.ico')));
        }
        const [first, second] = passes;
        const settle = (row, other) => (row.length > 5 && row[5] !== other[5] ? [...row.slice(0, 5), CHANGING] : row);
        const steady = first.flatMap((row, i) => {
          const other = first.length === second.length ? second[i] : second.find((candidate) => place(candidate) === place(row));
          return other && place(other) === place(row) ? [settle(row, other)] : [];
        });
        result[`${url} @${width}`] = {
          elements: first.length, steady,
          problems: [...new Set(problems.map((p) => p.replace(site.url, '')))],
        };
        process.stdout.write('.');
      }
    }
  } finally {
    await page.close();
    site.close();
  }
  writeFileSync(out, JSON.stringify(result));
  const steady = Object.values(result).reduce((sum, entry) => sum + entry.steady.length, 0);
  console.log(`\n${Object.keys(result).length} page views, ${steady} steady elements recorded${styles ? ' with their styles' : ''} -> ${out}`);
}

const tagsOnly = process.argv.includes('--ignore-classes');

function compare(a, b) {
  const before = JSON.parse(readFileSync(a, 'utf8'));
  const after = JSON.parse(readFileSync(b, 'utf8'));
  const withStyles = (capture) => Object.values(capture).some((view) => view.steady.some((row) => row.length > 5));
  if (withStyles(before) !== withStyles(after)) {
    console.log('one capture was taken with --styles and the other without; take both the same way');
    process.exitCode = 2;
    return;
  }
  let differences = 0;
  for (const view of Object.keys(before)) {
    const left = before[view], right = after[view];
    if (!right) { console.log(`${view}: missing from the second capture`); differences += 1; continue; }
    const notes = [];
    const want = new Map(), have = new Map();
    const unsettled = new Set([...left.steady, ...right.steady].filter((row) => row[5] === CHANGING).map(place));
    const key = (row) => {
      const kept = unsettled.has(place(row)) ? row.slice(0, 5) : row;
      return (tagsOnly ? [kept[0].split('.')[0], ...kept.slice(1)] : kept).join();
    };
    for (const row of left.steady) want.set(key(row), (want.get(key(row)) || 0) + 1);
    for (const row of right.steady) have.set(key(row), (have.get(key(row)) || 0) + 1);
    const gone = [...want].filter(([key, n]) => (have.get(key) || 0) < n).map(([key]) => key);
    const added = [...have].filter(([key, n]) => (want.get(key) || 0) < n).map(([key]) => key);
    if (gone.length || added.length) {
      notes.push(`${gone.length} element(s) moved, resized, restyled or removed; ${added.length} appeared`);
      gone.slice(0, 6).forEach((key) => notes.push('  was: ' + key));
      added.slice(0, 6).forEach((key) => notes.push('  now: ' + key));
    }
    const fresh = right.problems.filter((p) => !left.problems.includes(p));
    if (fresh.length) notes.push('new script problems: ' + fresh.join(' | '));
    if (notes.length) { differences += 1; console.log(`${view}:\n  ${notes.join('\n  ')}`); }
  }
  console.log(differences ? `\n${differences} page view(s) differ` : `identical across ${Object.keys(before).length} page views`);
  process.exitCode = differences ? 1 : 0;
}

const [mode, first, second] = process.argv.slice(2);
if (mode === 'capture' && first) {
  const flag = process.argv.indexOf('--site');
  await capture(first, flag > -1 ? process.argv[flag + 1] : path.join(REPO, '_site'), process.argv.includes('--styles'));
} else if (mode === 'compare' && first && second) {
  compare(first, second);
} else {
  console.log('usage: page-fingerprint.mjs capture <out.json> [--site <dir>] | compare <a.json> <b.json>');
  process.exitCode = 2;
}
