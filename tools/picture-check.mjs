// Does it still look the same? Photograph one element before and after a change and count the
// pixels that differ.
//
//   node tools/picture-check.mjs capture before.png tech-art/posts/ComputeGrass/ ".dm-row"
//   node tools/picture-check.mjs capture before-hover.png 404.html ".kit-button" --hover ".kit-button"
//   ... make the change, rebuild ...
//   node tools/picture-check.mjs capture after.png tech-art/posts/ComputeGrass/ ".dm-row"
//   node tools/picture-check.mjs compare before.png after.png
//
// Write the page's address WITHOUT a leading slash (use "" for the home page). Git Bash rewrites an
// argument that starts with a slash into a Windows folder path.
//
// `capture` reads ./_site, photographs the first element matching the selector (with a 16px
// margin, at twice the size) and saves a PNG. With --hover it first moves a real mouse to the
// centre of that selector and waits for the transition to finish (--wait 1400 by default).
// `compare` prints how many pixels differ and exits 1 if any do.
//
// TO GET A STILL PICTURE it switches reduced motion on and hides every canvas, video and the
// cursor glow, so the 3D scene and drifting elements cannot differ between two runs. That means:
// - it sees stylesheet effects (a hover fill, a border, a colour), not scripted ones. Tilt, flip,
//   drift and magnets do not run under reduced motion. Use tools/behaviour-check.mjs for those.
// - ALWAYS capture twice before the change and compare the two. If they differ, something in the
//   picture moves by itself (the hand-drawn lettering does) and that spot cannot be compared.
//
// It photographs the whole window and cuts the element out afterwards. Asking the browser for a
// clipped picture directly makes it draw a fresh frame with nothing hovered: the hovered and the
// resting picture then come out identical, and a comparison of two "hovered" pictures proves
// nothing. That mistake was made once (2026-10-11) and is why `capture` refuses to save a --hover
// picture that equals the resting one.
//
// Why pictures at all: tools/page-fingerprint.mjs --styles compares computed styles, which change
// when markup is restructured even if the result looks identical (an element drawn by a span
// yesterday and by ::before today). Pixels do not care how it was built.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch, sleep } from './real-browser.mjs';
import { serve } from './static-server.mjs';

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const STILL = 'canvas, video, .cursorglow { visibility: hidden !important; } *, *::before, *::after { animation: none !important; }';
const args = process.argv.slice(2);
const option = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback);
const [mode, first, second, third] = args;

async function capture(out, address, selector) {
  const url = '/' + address.replace(/^\/+/, '');
  const hover = option('--hover', null);
  const wait = Number(option('--wait', 1400));
  const site = await serve(path.join(REPO, '_site'));
  const page = await launch(0, 1440, 900);
  try {
    await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await page.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
    await page.goto(site.url + url, 2500);
    await page.evaluate(`(() => { const s = document.createElement('style'); s.textContent = ${JSON.stringify(STILL)}; document.head.appendChild(s); })()`);
    await page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 3, y: 3 });
    const box = await page.evaluate(`(() => {
      const e = document.querySelector(${JSON.stringify(selector)});
      if (!e) return null;
      e.scrollIntoView({ block: 'center', behavior: 'instant' });
      const r = e.getBoundingClientRect();
      return { x: Math.round(r.left) - 16, y: Math.round(r.top) - 16, width: Math.round(r.width) + 32, height: Math.round(r.height) + 32 };
    })()`);
    if (!box) throw new Error(`nothing on ${url} matches ${selector}`);
    await sleep(900);
    const resting = (await page.send('Page.captureScreenshot', { format: 'png' })).data;
    let whole = resting;
    if (hover) {
      const point = await page.evaluate(`(() => { const r = document.querySelector(${JSON.stringify(hover)}).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`);
      await page.moveTo(point.x, point.y, 5, 3, 3);
      await sleep(wait);
      whole = (await page.send('Page.captureScreenshot', { format: 'png' })).data;
      if (whole === resting) throw new Error('the hovered picture is identical to the resting one, so hovering changed nothing that can be seen');
    }
    await page.goto('about:blank', 200);
    const cut = await page.evaluate(`(async () => {
      const image = await new Promise((resolve) => { const i = new Image(); i.onload = () => resolve(i); i.src = 'data:image/png;base64,' + ${JSON.stringify(whole)}; });
      const c = document.createElement('canvas');
      c.width = ${box.width * 2};
      c.height = ${box.height * 2};
      c.getContext('2d').drawImage(image, ${-box.x * 2}, ${-box.y * 2});
      return c.toDataURL('image/png').split(',')[1];
    })()`);
    writeFileSync(out, Buffer.from(cut, 'base64'));
    console.log(`${url} ${selector}${hover ? ' (hovered)' : ''}: ${box.width}x${box.height} -> ${out}`);
  } finally {
    await page.close();
    site.close();
  }
}

async function compare(a, b) {
  const page = await launch(0, 800, 600);
  try {
    await page.goto('about:blank', 200);
    const result = await page.evaluate(`(async () => {
      const load = (data) => new Promise((resolve) => { const image = new Image(); image.onload = () => resolve(image); image.src = 'data:image/png;base64,' + data; });
      const [one, two] = await Promise.all([load(${JSON.stringify(readFileSync(a).toString('base64'))}), load(${JSON.stringify(readFileSync(b).toString('base64'))})]);
      if (one.width !== two.width || one.height !== two.height) return { sizes: [one.width, one.height, two.width, two.height] };
      const pixels = (image) => { const c = document.createElement('canvas'); c.width = image.width; c.height = image.height; const x = c.getContext('2d'); x.drawImage(image, 0, 0); return x.getImageData(0, 0, c.width, c.height).data; };
      const p = pixels(one), q = pixels(two);
      let differing = 0, largest = 0;
      for (let k = 0; k < p.length; k += 4) {
        const d = Math.max(Math.abs(p[k] - q[k]), Math.abs(p[k + 1] - q[k + 1]), Math.abs(p[k + 2] - q[k + 2]));
        if (d > 0) { differing += 1; largest = Math.max(largest, d); }
      }
      return { total: p.length / 4, differing, largest };
    })()`);
    if (result.sizes) {
      console.log(`the two pictures are different sizes: ${result.sizes.slice(0, 2).join('x')} and ${result.sizes.slice(2).join('x')}`);
      process.exitCode = 1;
    } else {
      console.log(`${result.differing} of ${result.total} pixels differ${result.differing ? `, largest colour step ${result.largest} of 255` : ''}`);
      process.exitCode = result.differing ? 1 : 0;
    }
  } finally {
    await page.close();
  }
}

if (mode === 'capture' && first && second !== undefined && third) {
  await capture(first, second, third);
} else if (mode === 'compare' && first && second) {
  await compare(first, second);
} else {
  console.log('usage: picture-check.mjs capture <out.png> <url path> <selector> [--hover <selector>] [--wait <ms>] | compare <a.png> <b.png>');
  process.exitCode = 2;
}
