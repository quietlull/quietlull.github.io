// Check the workbench: load every specimen twice (inside its page, and bare) in a real browser
// and report script errors and the element's size. It serves `_site` itself, so it needs a
// built site with the workbench in it (`python tools/build_workbench.py`), not the dev server.
//
//   node tools/check-workbench.mjs
//
// "DIFF" in the last column is not a fault by itself: a block element is simply wider with no
// page around it. Read it as a prompt. A component whose HEIGHT or shape changes when bare is
// borrowing something from its page.
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch } from './real-browser.mjs';
import { serve } from './static-server.mjs';

const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '_site', 'redesign-lab', 'workbench');
const site = await serve(path.join(DIR, '..', '..'));
const BASE = site.url + '/redesign-lab/workbench/';
const files = readdirSync(DIR).filter((f) => f.endsWith('.html')).sort();

const MEASURE = `(() => {
  const r = document.querySelector('[data-wb-root]');
  if (!r) return { missing: true };
  const b = r.getBoundingClientRect(), s = getComputedStyle(r);
  return { vis: document.visibilityState, w: Math.round(b.width), h: Math.round(b.height),
    x: Math.round(b.left), y: Math.round(b.top),
    unseen: s.visibility === 'hidden' || s.display === 'none' || +s.opacity === 0,
    fontsLoaded: [...document.fonts].filter(f => f.status === 'loaded').length,
    wraps: document.querySelectorAll('[data-wb-wrap]').length };
})()`;

const page = await launch(9555);
const rows = [];
for (const file of files) {
  await page.goto(BASE + file, 1100);
  const inside = await page.evaluate(MEASURE);
  const insideProblems = page.problems();
  await page.goto(BASE + file + '?bare=1', 900);
  const bare = await page.evaluate(MEASURE);
  rows.push({ file, inside, bare, problems: [...new Set([...insideProblems, ...page.problems()])] });
}
await page.close();
site.close();

let errors = 0;
console.log('specimen'.padEnd(46), 'in page'.padEnd(13), 'bare'.padEnd(13), 'same?  notes');
for (const { file, inside, bare, problems } of rows) {
  const a = `${inside.w}x${inside.h}`, b = `${bare.w}x${bare.h}`;
  const same = Math.abs(inside.w - bare.w) <= 1 && Math.abs(inside.h - bare.h) <= 1;
  const notes = [];
  if (inside.unseen) notes.push('invisible');
  if (inside.w === 0 || inside.h === 0) notes.push('ZERO SIZE in page');
  if (inside.wraps === 0) notes.push('no ancestors');
  const real = problems.filter((problem) => !problem.endsWith('/favicon.ico'));
  if (real.length) { errors += real.length; notes.push(...real); }
  console.log(file.replace('.html', '').padEnd(46), a.padEnd(13), b.padEnd(13), (same ? 'same ' : 'DIFF ') + ' ' + notes.join(' | '));
}
console.log(`\n${rows.length} specimens, ${errors} problems, tab ${rows[0].inside.vis}`);
process.exitCode = errors ? 1 : 0;
