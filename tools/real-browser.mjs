// A real browser, driven with real input. Chrome DevTools Protocol, no dependencies (Node 22+).
//
// WHY THIS EXISTS. The house rule is to drive the real input: an in-page `dispatchEvent` proves a
// handler is attached and nothing else (docs/TRAPS.md). The in-app browser pane is often hidden,
// and a hidden tab runs no animation frames, so drift, magnets, tilt and line boil all read as
// dead there. Three sessions each rebuilt this driver in a temp folder before it was kept here.
//
//   import { launch, sleep } from './real-browser.mjs';
//   const page = await launch();
//   await page.goto('http://localhost:4000/tech-art/');
//   await page.moveTo(400, 300);              // real mouse movement, stepped
//   console.log(await page.evaluate('document.title'), page.problems());
//   await page.close();
//
// Set CHROME_PATH to use another Chromium browser (Edge works).
//
// Each launch gets a throwaway profile and lets the browser pick a free debugging port, which it
// writes into that profile. So any number of checks can run at once without colliding; the first
// argument of launch() used to be a port number and is ignored.
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

export async function launch(_unused, width = 1440, height = 900) {
  const profile = mkdtempSync(path.join(os.tmpdir(), 'real-browser-'));
  const proc = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
    `--window-size=${width},${height}`, '--no-first-run', '--no-default-browser-check',
    '--autoplay-policy=no-user-gesture-required', 'about:blank',
  ], { stdio: 'ignore' });

  let targets;
  for (let i = 0; i < 80 && !targets; i++) {
    try {
      const port = Number(readFileSync(path.join(profile, 'DevToolsActivePort'), 'utf8').split('\n')[0]);
      targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    } catch { await sleep(250); }
  }
  if (!targets) throw new Error('Chrome did not open its debugging port');
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });

  let nextId = 1;
  const waiting = new Map();
  const listeners = [];
  ws.onmessage = (message) => {
    const data = JSON.parse(message.data);
    if (data.id && waiting.has(data.id)) {
      const { resolve, reject } = waiting.get(data.id);
      waiting.delete(data.id);
      data.error ? reject(new Error(data.error.message)) : resolve(data.result);
    } else if (data.method) {
      listeners.forEach((fn) => fn(data.method, data.params));
    }
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = nextId++;
    waiting.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

  let problems = [];
  listeners.push((method, params) => {
    if (method === 'Runtime.exceptionThrown') {
      const d = params.exceptionDetails;
      problems.push('EXCEPTION ' + ((d.exception && d.exception.description) || d.text).split('\n')[0]);
    } else if (method === 'Runtime.consoleAPICalled' && params.type === 'error') {
      problems.push('console.error ' + params.args.map((a) => a.value || a.description || '').join(' ').slice(0, 160));
    } else if (method === 'Network.responseReceived' && params.response.status >= 400) {
      problems.push(params.response.status + ' ' + params.response.url);
    }
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });

  return {
    send,
    async goto(url, settle = 1200) {
      problems = [];
      const loaded = new Promise((resolve) => {
        const fn = (method) => { if (method === 'Page.loadEventFired') { listeners.splice(listeners.indexOf(fn), 1); resolve(); } };
        listeners.push(fn);
      });
      await send('Page.navigate', { url });
      await Promise.race([loaded, sleep(15000)]);
      await sleep(settle);
    },
    problems: () => problems.slice(),
    async evaluate(expression) {
      const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
      if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception.description);
      return result.result.value;
    },
    async moveTo(x, y, steps = 8, fromX = 5, fromY = 5) {
      for (let i = 1; i <= steps; i++) {
        await send('Input.dispatchMouseEvent', {
          type: 'mouseMoved', x: fromX + ((x - fromX) * i) / steps, y: fromY + ((y - fromY) * i) / steps,
        });
        await sleep(30);
      }
    },
    async resize(w, h) {
      await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false });
    },
    async close() {
      try { await send('Browser.close'); } catch { /* already gone */ }
      proc.kill();
    },
  };
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
