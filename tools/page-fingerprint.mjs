// Did a change move anything a visitor can see? Record where every element sits, then compare.
//
//   node tools/page-fingerprint.mjs capture before.json            (reads ./_site)
//   node tools/page-fingerprint.mjs capture after.json --site path/to/_site
//   node tools/page-fingerprint.mjs compare before.json after.json
//
// A capture loads ten sample pages at two widths in a real browser and writes down, for every
// element: its tag, its classes, and its position and size in whole pixels. `compare` exits 1 if
// any element moved, resized, appeared or disappeared, and lists them.
//
// TWO THINGS KEEP IT HONEST.
// - Every page is loaded twice and only elements that sat in the same place both times are kept,
//   so things that are random by design (fireflies, the portal windows, a drifting icon caught
//   mid-drift) cannot raise a false alarm. Reduced motion is switched on for the same reason, and
//   anything with a CSS animation running on it, or on an ancestor, is left out.
// - Script errors on a page are part of the fingerprint. A page that silently stopped running a
//   script still "looks the same" for a second; the error does not.
//
// It checks layout, not colour. A rule that only changed a colour would pass.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch } from './real-browser.mjs';
import { serve } from './static-server.mjs';

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = ['/', '/tech-art/', '/tech-art/projects/', '/tech-art/posts/ComputeGrass/', '/tech-art/about/',
  '/ramblings/', '/archives/', '/tags/blog/', '/tech-art/under-construction/', '/404.html'];
const WIDTHS = [1440, 390];

const READ = `(async () => {
  await document.fonts.ready;
  const rows = [];
  const animating = new Set(document.getAnimations().map((a) => a.effect && a.effect.target).filter(Boolean));
  const moving = (el) => { for (let n = el; n; n = n.parentElement) if (animating.has(n)) return true; return false; };
  for (const el of document.body.querySelectorAll('*')) {
    if (['SCRIPT', 'STYLE', 'BR', 'SOURCE'].includes(el.tagName) || el.closest('svg') && el.tagName !== 'svg') continue;
    if (moving(el)) continue;
    const box = el.getBoundingClientRect();
    rows.push([el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).join('.') : ''),
      Math.round(box.left + scrollX), Math.round(box.top + scrollY), Math.round(box.width), Math.round(box.height)]);
  }
  return rows;
})()`;

async function capture(out, siteDir) {
  const site = await serve(siteDir);
  const page = await launch(9570);
  const result = {};
  try {
    await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    for (const width of WIDTHS) {
      await page.resize(width, 900);
      for (const url of PAGES) {
        const passes = [];
        let problems = [];
        for (let pass = 0; pass < 2; pass += 1) {
          await page.goto(site.url + url, 2200);
          passes.push(await page.evaluate(READ));
          problems = problems.concat(page.problems().filter((p) => !p.endsWith('/favicon.ico')));
        }
        const [first, second] = passes;
        const steady = first.length === second.length
          ? first.filter((row, i) => row.join() === second[i].join())
          : first.filter((row) => second.some((other) => other.join() === row.join()));
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
  console.log(`\n${Object.keys(result).length} page views, ${steady} steady elements recorded -> ${out}`);
}

function compare(a, b) {
  const before = JSON.parse(readFileSync(a, 'utf8'));
  const after = JSON.parse(readFileSync(b, 'utf8'));
  let differences = 0;
  for (const view of Object.keys(before)) {
    const left = before[view], right = after[view];
    if (!right) { console.log(`${view}: missing from the second capture`); differences += 1; continue; }
    const notes = [];
    const want = new Map(), have = new Map();
    for (const row of left.steady) want.set(row.join(), (want.get(row.join()) || 0) + 1);
    for (const row of right.steady) have.set(row.join(), (have.get(row.join()) || 0) + 1);
    const gone = [...want].filter(([key, n]) => (have.get(key) || 0) < n).map(([key]) => key);
    const added = [...have].filter(([key, n]) => (want.get(key) || 0) < n).map(([key]) => key);
    if (gone.length || added.length) {
      notes.push(`${gone.length} element(s) moved, resized or removed; ${added.length} appeared`);
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
  await capture(first, flag > -1 ? process.argv[flag + 1] : path.join(REPO, '_site'));
} else if (mode === 'compare' && first && second) {
  compare(first, second);
} else {
  console.log('usage: page-fingerprint.mjs capture <out.json> [--site <dir>] | compare <a.json> <b.json>');
  process.exitCode = 2;
}
