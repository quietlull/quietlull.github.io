/* perf-probe — ablation profiler. Measures what each feature ACTUALLY costs on a real page by
   turning things off one at a time and watching the frame rate recover.

   WHY ABLATION: counting blurs or listing bundle sizes tells you what exists, not what costs. The
   only honest attribution is "turn it off, see what you get back". Everything here is a measured
   delta against a baseline re-taken between every condition, so thermal drift and background load
   do not land on one feature.

   USAGE, on any lab page:
     const s = document.createElement('script'); s.src = '/redesign-lab/perf-probe.js';
     document.head.appendChild(s);
     // then, when window.__perf.done is true:
     window.__perf.table()

   It restores every change it makes. Nothing here is a permanent edit to the page. */
(() => {
  const SAMPLE_MS = 1400;
  const SETTLE_MS = 260;

  const state = { done: false, progress: '', results: [], baselines: [], env: {} };
  window.__perf = state;

  const sample = (ms) =>
    new Promise((resolve) => {
      let frames = 0;
      let long = 0;
      let worst = 0;
      const t0 = performance.now();
      let last = t0;
      const tick = (t) => {
        frames++;
        const d = t - last;
        if (d > 33) long++;
        if (d > worst) worst = d;
        last = t;
        if (t - t0 < ms) requestAnimationFrame(tick);
        else resolve({ fps: +(frames / ((t - t0) / 1000)).toFixed(1), long, worst: +worst.toFixed(1) });
      };
      requestAnimationFrame(tick);
    });

  const heapMB = () =>
    performance.memory ? +(performance.memory.usedJSHeapSize / 1048576).toFixed(1) : null;

  /* Each condition is [name, disable, restore]. disable() must be cheap and fully reversible -
     an irreversible condition would poison every measurement after it. */
  const conditions = [
    ['three.js scene (canvas + loop)', () => {
      const c = [...document.querySelectorAll('canvas')].filter((x) => !x.classList.contains('bgcanvas'));
      c.forEach((x) => { x.dataset.pd = x.style.display; x.style.display = 'none'; });
      document.body.classList.add('bloom-mode');
      return () => { c.forEach((x) => { x.style.display = x.dataset.pd || ''; }); document.body.classList.remove('bloom-mode'); };
    }],
    ['BLOOM pass only (scene still renders)', () => {
      const b = window.bloomPass;
      if (!b) return () => {};
      b.enabled = false;
      return () => { b.enabled = true; };
    }],
    ['CSS blur filters', () => {
      const els = [...document.querySelectorAll('*')].filter((e) => /blur/.test(getComputedStyle(e).filter));
      els.forEach((e) => { e.dataset.pf = e.style.filter; e.style.setProperty('filter', 'none', 'important'); });
      return () => els.forEach((e) => { e.style.filter = e.dataset.pf || ''; });
    }],
    ['backdrop-filter', () => {
      const els = [...document.querySelectorAll('*')].filter((e) => /blur/.test(getComputedStyle(e).backdropFilter || ''));
      els.forEach((e) => { e.dataset.pb = e.style.backdropFilter; e.style.setProperty('backdrop-filter', 'none', 'important'); });
      return () => els.forEach((e) => { e.style.backdropFilter = e.dataset.pb || ''; });
    }],
    ['mix-blend-mode', () => {
      const els = [...document.querySelectorAll('*')].filter((e) => getComputedStyle(e).mixBlendMode !== 'normal');
      els.forEach((e) => { e.dataset.pm = e.style.mixBlendMode; e.style.setProperty('mix-blend-mode', 'normal', 'important'); });
      return () => els.forEach((e) => { e.style.mixBlendMode = e.dataset.pm || ''; });
    }],
    ['box-shadows', () => {
      const els = [...document.querySelectorAll('*')].filter((e) => getComputedStyle(e).boxShadow !== 'none');
      els.forEach((e) => { e.dataset.ps = e.style.boxShadow; e.style.setProperty('box-shadow', 'none', 'important'); });
      return () => els.forEach((e) => { e.style.boxShadow = e.dataset.ps || ''; });
    }],
    ['CSS animations', () => {
      const els = [...document.querySelectorAll('*')].filter((e) => getComputedStyle(e).animationName !== 'none');
      els.forEach((e) => { e.dataset.pa = e.style.animationPlayState; e.style.setProperty('animation-play-state', 'paused', 'important'); });
      return () => els.forEach((e) => { e.style.animationPlayState = e.dataset.pa || ''; });
    }],
    ['drift + magnet engine', () => {
      document.body.classList.add('motion-off');
      return () => document.body.classList.remove('motion-off');
    }],
    ['project cards (all)', () => {
      const g = [...document.querySelectorAll('.merged-cards, .epx-cards')];
      g.forEach((e) => { e.dataset.pg = e.style.display; e.style.display = 'none'; });
      return () => g.forEach((e) => { e.style.display = e.dataset.pg || ''; });
    }],
    ['videos', () => {
      const v = [...document.querySelectorAll('video')];
      v.forEach((x) => { x.dataset.pv = x.paused ? '1' : '0'; x.pause(); x.style.setProperty('display', 'none', 'important'); });
      return () => v.forEach((x) => { x.style.display = ''; if (x.dataset.pv === '0') x.play().catch(() => {}); });
    }],
    ['hana bloom background', () => {
      const b = document.getElementById('hana-bg');
      if (!b) return () => {};
      const prev = b.style.display;
      b.style.display = 'none';
      return () => { b.style.display = prev; };
    }],
  ];

  async function run() {
    state.env = {
      page: document.title,
      viewport: [innerWidth, innerHeight],
      dpr: devicePixelRatio,
      cores: navigator.hardwareConcurrency,
      memoryGB: navigator.deviceMemory || null,
      domNodes: document.querySelectorAll('*').length,
      heapStartMB: heapMB(),
    };

    /* counts first, so a zero-cost condition can be told apart from a zero-COUNT condition -
       "blur costs nothing" and "there are no blurs" are completely different answers. */
    const all = [...document.querySelectorAll('*')];
    const cs = (e) => getComputedStyle(e);
    state.env.counts = {
      blurFilter: all.filter((e) => /blur/.test(cs(e).filter)).length,
      backdropBlur: all.filter((e) => /blur/.test(cs(e).backdropFilter || '')).length,
      blendMode: all.filter((e) => cs(e).mixBlendMode !== 'normal').length,
      boxShadow: all.filter((e) => cs(e).boxShadow !== 'none').length,
      animations: all.filter((e) => cs(e).animationName !== 'none').length,
      willChange: all.filter((e) => cs(e).willChange !== 'auto').length,
      magnets: document.querySelectorAll('.js-magnetic').length,
      drifters: document.querySelectorAll('[data-drift]').length,
      cards: document.querySelectorAll('.post-card').length,
      videos: document.querySelectorAll('video').length,
      canvases: document.querySelectorAll('canvas').length,
    };

    await sample(600); // discard, lets the page settle after load

    for (let i = 0; i < conditions.length; i++) {
      const [name, disable] = conditions[i];
      state.progress = `${i + 1}/${conditions.length} ${name}`;

      const before = await sample(SAMPLE_MS);
      const restore = disable();
      await new Promise((r) => setTimeout(r, SETTLE_MS));
      const off = await sample(SAMPLE_MS);
      const heapOff = heapMB();
      restore();
      await new Promise((r) => setTimeout(r, SETTLE_MS));

      state.baselines.push(before.fps);
      state.results.push({
        feature: name,
        baselineFps: before.fps,
        withoutFps: off.fps,
        gainFps: +(off.fps - before.fps).toFixed(1),
        longFramesBefore: before.long,
        longFramesAfter: off.long,
        worstMsBefore: before.worst,
        worstMsAfter: off.worst,
        heapMB: heapOff,
      });
    }

    state.env.heapEndMB = heapMB();
    state.done = true;
    state.progress = 'done';
  }

  state.table = () =>
    state.results
      .slice()
      .sort((a, b) => b.gainFps - a.gainFps)
      .map((r) => `${String(r.gainFps).padStart(6)} fps  ${r.feature}`)
      .join('\n');

  run();
})();
