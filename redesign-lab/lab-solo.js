/* lab-solo.js — LAB TOOLING (claude, never ships).
   Gives each rework page a "solo mode" for the picker compositor (picker.html).
   Without ?solo= in the URL this script does NOTHING — pages behave exactly as before.
   With ?solo=<slot>: shows only that slot's elements (per the SLOT maps below, one
   central map per page — no markup tagging), makes the background transparent so the
   picker's chosen bg shows through, reports content height to the parent, and accepts
   tune/font/highlight commands via postMessage. */
(function () {
  'use strict';

  var KEY = (location.pathname.match(/rework-([a-z0-9-]+)\.html/) || [])[1];
  var Q = new URLSearchParams(location.search);
  var SLOT = Q.get('solo');
  if (!KEY || !SLOT) return; // normal standalone page -> total no-op

  /* ---- per-page slot maps (content selectors; preceding .lbl/.shead labels auto-included) ---- */
  var MAPS = {
    'hana': {
      bg: '#hana-bg, #scrim, #bgToggle',
      chrome: 'header.bar',
      toggles: '.bar .tg',
      hero: 'section.hero',
      kit: '.wrap > .kit',
      cards: '.wrap > .cards',
      list: '.wrap > .search, .wrap > .filters, .wrap > .empty',
      post: 'article.post',
      about: '.wrap > .bios, .wrap > .stats, .wrap > .trophies, .wrap > .status, button.achbtn, .ach',
      footer: 'footer.foot'
    },
    'harumaki': {
      bg: '#bgToggle',
      chrome: '.menu, nav.rail',
      toggles: '.hero > svg, .hero .tg',
      hero: 'section.hero, #haloToggle',
      kit: '.wrap > .kit',
      cards: '.posts-grid, .tile-layout, .wrap > .cards, .bento, #bentoToggle',
      band: '.band',
      list: '.wrap > .search, .wrap > .filters, .wrap > .empty, .pages',
      post: 'article.post',
      about: '.wrap > .bios, .wrap > .stats, .wrap > .trophies, .wrap > .status',
      footer: 'footer.foot'
    },
    'norikura': {
      bg: '', /* bg = the Three.js canvas itself (JS-injected, survives pruning) */
      chrome: 'nav.rail, header.bar',
      toggles: '.bar .tg',
      hero: 'section.hero',
      kit: '.wrap > .kit',
      cards: '.wrap > .cards',
      list: '.wrap > .search, .wrap > .filters, .wrap > .empty',
      post: '.wrap > .inner',
      about: '.wrap > .bios, .wrap > .stats, .wrap > .trophies, .wrap > .status',
      footer: 'footer.footer'
    },
    'stephan': {
      chrome: 'header.bar',
      toggles: '.wrap > .toggle',
      tools: '.wrap > .toggle, .wrap > .icons',
      hero: 'section.hero',
      kit: '.wrap > .kit',
      cards: '.wrap > .cards',
      list: '.wrap > .search, .wrap > .filters, .wrap > .empty',
      post: 'article.post',
      about: '.wrap > .bios, .wrap > .stats, .wrap > .trophies, .wrap > .status',
      footer: 'footer.foot'
    },
    'merodev-yanne': {
      bg: '.glow-top, .cursorglow, #bgToggle',
      chrome: 'header.bar, .toggles',
      toggles: '.toggles',
      hero: 'section.hero',
      kit: '.wrap > .kit',
      cards: '.wrap > .cards',
      list: '.wrap > .term, .wrap > .filters, .wrap > .empty',
      post: 'article.post',
      about: '.wrap > .bios, .wrap > .stats, .wrap > .trophies, .wrap > .status',
      footer: 'footer.foot'
    }
  };

  /* ---- per-page font-role selector maps (preview-grade coverage, not exhaustive) ---- */
  var FONTS = {
    'hana': {
      display: 'h1,h2,h3,.logo,.card-title,.eh,.ach .at',
      body: 'body',
      mono: '.kick,.lbl,.m,.tag,.n,.filters,.search input,code,.codeblock,.stat .l,.status,.nav a,.soc a,.foot,.bgtoggle',
      hand: ''
    },
    'harumaki': {
      display: '.shead .nm,.tile__header,.cards .card-title,.post-card .card-title,.phead h1,.prose h2,.bio h3,.card-back .takeaway-quote',
      body: 'body',
      mono: '.shead .num,.m,.menu,.tag,.t,.tile__text,code,.codeblock,.search,.pages,.filters,.status,.stat .l,.card-role,.card-meta,.card-text,.bgtoggle,.band span,.goosw .word,.goosw .state',
      hand: '.logo,.txtlink,.tldr b,.takeaway b,blockquote,.stat .n,.foot'
    },
    'norikura': {
      display: 'h1,h2,h3,.logo,.decision_inner h2,.bio h3,.stat .n',
      body: 'body',
      mono: '.lbl,.en,.stamp,.m,.tag,.t,code,.codeblock,.filters,.search,.status,.stat .l,.nav a,.rail a,.boxbutton',
      hand: ''
    },
    'stephan': {
      display: 'h1,h2,h3,.bio h3,.stat .n',
      body: 'body',
      mono: '.lbl,.m,.tag,.t,code,.codeblock,.filters,.search,.status,.stat .l,.nav a,.lab2',
      hand: '.logo'
    },
    'merodev-yanne': {
      display: '.hcen h1,h2,h3,.ti,.bio h3,.stat .n',
      body: 'body',
      mono: '.lbl,.m,.tag,code,.codeblock,.filters,.term,.status,.stat .l,.bar,.toggles,.foot,.k,.ro,.nm,.view,.sub,.btn',
      hand: ''
    }
  };
  var FALLBACK = { display: 'serif', body: 'sans-serif', mono: 'monospace', hand: 'cursive' };

  var MAP = MAPS[KEY] || {};
  var sel = MAP[SLOT];
  var root = document.documentElement;
  root.classList.add('solo', 'solo-' + SLOT);

  /* ---- early CSS (script sits in <head>, so this lands before first paint) ---- */
  var base = document.createElement('style');
  base.textContent =
    'html.solo,html.solo body{background:transparent !important}' +
    'html.solo body::before,html.solo body::after{display:none !important}' +
    'html.solo section.hero{min-height:0 !important}' +
    'html.solo .labtag,html.solo .provlegend{display:none !important}' +
    (SLOT !== 'bg' ? 'html.solo canvas{display:none !important}' : 'html.solo-bg body{min-height:100vh}');
  document.head.appendChild(base);

  var byId = {};   // labId -> element
  var items = [];  // [{id,label}] in DOM order

  function labelOf(el) {
    var c = (el.className && String(el.className).trim().split(/\s+/)[0]) || el.tagName.toLowerCase();
    if (el.matches && el.matches('.lbl,.shead')) {
      var t = el.textContent.replace(/\s+/g, ' ').trim().slice(0, 26);
      return c + ' · ' + t;
    }
    return el.tagName.toLowerCase() + '.' + c;
  }

  function prune() {
    var matched = [];
    if (sel) {
      document.querySelectorAll(sel).forEach(function (el) { matched.push(el); });
    }
    // auto-include the section label right before each matched element
    matched.slice().forEach(function (el) {
      var p = el.previousElementSibling;
      if (p && p.matches && p.matches('.lbl,.shead') && matched.indexOf(p) < 0) matched.push(p);
    });
    var M = new Set(matched);
    var K = new Set(); // ancestors to keep (but recurse into)
    matched.forEach(function (el) {
      var p = el.parentElement;
      while (p && p !== document.body) { K.add(p); p = p.parentElement; }
    });
    (function walk(node) {
      Array.prototype.slice.call(node.children).forEach(function (ch) {
        var tag = ch.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'LINK') return;
        if (M.has(ch)) return;             // matched: keep whole subtree
        if (K.has(ch)) { walk(ch); return; } // ancestor of a match: keep shell, recurse
        ch.style.setProperty('display', 'none', 'important');
      });
    })(document.body);

    // assign ids in DOM order
    var ordered = matched.sort(function (a, b) {
      return (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
    });
    ordered.forEach(function (el, i) {
      var id = SLOT + '/' + i;
      byId[id] = el;
      el.__labId = id;
      items.push({ id: id, label: labelOf(el) });
    });
  }

  function send(msg) { try { parent.postMessage(msg, '*'); } catch (e) { /* standalone open */ } }

  function contentH() {
    /* body.scrollHeight floors at the iframe viewport, so short slots would stick at the
       parent's default height — measure the real extent of in-flow content instead */
    var m = 0;
    Array.prototype.forEach.call(document.body.children, function (c) {
      var tag = c.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'LINK') return;
      var cs = getComputedStyle(c);
      if (cs.display === 'none' || cs.position === 'fixed') return;
      var r = c.getBoundingClientRect();
      m = Math.max(m, r.bottom + (parseFloat(cs.marginBottom) || 0));
    });
    return Math.ceil(m + window.scrollY) + 2;
  }

  function reportHeight() {
    send({ type: 'lab-h', key: KEY, slot: SLOT, h: SLOT === 'bg' ? 0 : contentH() });
  }

  function applyTune(d) {
    var el = byId[d.id]; if (!el) return;
    el.style.marginTop = (d.mt === null || d.mt === undefined || d.mt === '') ? '' : d.mt + 'px';
    el.style.marginBottom = (d.mb === null || d.mb === undefined || d.mb === '') ? '' : d.mb + 'px';
    el.style.zoom = d.z || '';
    el.style.maxWidth = d.mw ? d.mw + 'px' : '';
    if (d.gap !== undefined) el.style.gap = d.gap ? d.gap + 'px' : '';
  }

  var loadedFonts = {};
  function applyFont(d) {
    var map = FONTS[KEY]; if (!map) return;
    var s = map[d.role];
    var st = document.getElementById('lab-font-' + d.role);
    if (!st) { st = document.createElement('style'); st.id = 'lab-font-' + d.role; document.head.appendChild(st); }
    if (!d.family || !s) { st.textContent = ''; return; }
    if (!loadedFonts[d.family]) {
      var l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=' + d.family.trim().replace(/ /g, '+') + ':wght@400;500;600;700&display=swap';
      document.head.appendChild(l);
      loadedFonts[d.family] = 1;
    }
    st.textContent = s + '{font-family:"' + d.family + '",' + FALLBACK[d.role] + ' !important}';
  }

  window.addEventListener('message', function (e) {
    var d = e.data; if (!d || typeof d.type !== 'string') return;
    if (d.type === 'lab-tune') applyTune(d);
    else if (d.type === 'lab-font') applyFont(d);
    else if (d.type === 'lab-hl') {
      var el = byId[d.id]; if (!el) return;
      el.style.outline = d.on ? '2px dashed #ff8c00' : '';
      el.style.outlineOffset = d.on ? '3px' : '';
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    prune();
    send({ type: 'lab-ready', key: KEY, slot: SLOT, items: items });
    reportHeight();
    if (window.ResizeObserver) {
      var raf = 0;
      new ResizeObserver(function () {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(reportHeight);
      }).observe(document.body);
    }
    window.addEventListener('load', reportHeight);
    setTimeout(reportHeight, 800); // late layout (fonts/videos) safety net
    // Alt-click an element -> tell the picker to focus its Tune controls
    document.addEventListener('click', function (e) {
      if (!e.altKey) return;
      e.preventDefault(); e.stopPropagation();
      var n = e.target;
      while (n && n !== document.body && !n.__labId) n = n.parentElement;
      if (n && n.__labId) send({ type: 'lab-picked', key: KEY, slot: SLOT, id: n.__labId });
    }, true);
  });
})();
