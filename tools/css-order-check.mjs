#!/usr/bin/env node
// CSS LOAD-ORDER CHECKER
//
// WHAT IT CATCHES, and why the old test was the wrong one. The comment that used to sit in
// `_sass/components/_index.scss` argued the alphabetical @forward order was safe because no two
// partials declare the same SELECTOR. That is true and it is the wrong question. An element carries
// several component classes at once, so two DIFFERENT selectors land on the SAME element: the
// wordmark is `class="top-bar__logo lb"`, so `_top-bar.scss` and `_line-boil.scss` both style it.
// Both are one class deep, in the same layer, so only source order separated them, and the wordmark
// painted in the wrong font and the wrong colour for weeks.
//
// So this asks the real question: for every element the site actually renders, do two partials
// declare the same PROPERTY at the same specificity, layer, media condition and state, with
// different values? That is the shape where the @forward order alone decides the paint.
//
// HOW IT READS THE CSS. It parses the built stylesheet TEXT and attributes every rule back to its
// partial through the Sass source map. It does not open a browser: `document.styleSheets` and naive
// greps have both under-reported here before (docs/TRAPS.md).
//
// Usage:  node tools/css-order-check.mjs [--strict] [--json] [--limit N] [--css PATH]
//   --strict  warnings (classes added at runtime by JS) also fail
//   --json    machine-readable output
//   --limit   max findings printed, default 40
//   --css     read another built stylesheet, for testing the checker itself
// Exit 1 when a hazard is found, 2 when it cannot run (no build to read).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CSS_FILE = 'assets/css/jekyll-theme-chirpy.css';
const SITE = path.join(ROOT, '_site');
const BS = String.fromCharCode(92);
const JS_PAIR_WINDOW = 800; // chars between a querySelector and a classList.add to call them related

const argv = process.argv.slice(2);
const STRICT = argv.includes('--strict');
const JSON_OUT = argv.includes('--json');
const flag = (name, fallback) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : fallback;
};
const LIMIT = Number(flag('--limit', 40));
const CSS_OVERRIDE = flag('--css', null); // for testing the checker against a doctored stylesheet

// ---------------------------------------------------------------- css text parsing

function stripComments(s) {
  const out = s.split('');
  let i = 0, str = null;
  while (i < s.length) {
    const c = s[i];
    if (str) {
      if (c === BS) { i += 2; continue; }
      if (c === str) str = null;
      i++; continue;
    }
    if (c === '"' || c === "'") { str = c; i++; continue; }
    if (c === '/' && s[i + 1] === '*') {
      let j = s.indexOf('*/', i + 2);
      if (j < 0) j = s.length - 2;
      for (let k = i; k < j + 2 && k < s.length; k++) out[k] = s[k] === '\n' ? '\n' : ' ';
      i = j + 2; continue;
    }
    i++;
  }
  return out.join('');
}

// Split on `sep` at nesting depth 0, respecting strings, parens and brackets.
function splitTop(s, sep) {
  const out = [];
  let depth = 0, str = null, cur = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (str) {
      cur += c;
      if (c === BS) { cur += s[++i] ?? ''; continue; }
      if (c === str) str = null;
      continue;
    }
    if (c === '"' || c === "'") { str = c; cur += c; continue; }
    if (c === '(' || c === '[') { depth++; cur += c; continue; }
    if (c === ')' || c === ']') { depth--; cur += c; continue; }
    if (c === sep && depth === 0) { out.push(cur); cur = ''; continue; }
    cur += c;
  }
  out.push(cur);
  return out;
}

const OPAQUE_AT = /^(keyframes|font-face|property|counter-style|page|font-feature-values|viewport)$/;

function parseStylesheet(clean) {
  const rules = [];
  walk(0, clean.length, []);
  return rules;

  function walk(from, to, stack) {
    let i = from, tokStart = from, str = null, depth = 0;
    while (i < to) {
      const c = clean[i];
      if (str) {
        if (c === BS) { i += 2; continue; }
        if (c === str) str = null;
        i++; continue;
      }
      if (c === '"' || c === "'") { str = c; i++; continue; }
      if (c === '(') { depth++; i++; continue; }
      if (c === ')') { depth--; i++; continue; }
      if (depth > 0) { i++; continue; }
      if (c === ';') { i++; tokStart = i; continue; }
      if (c === '}') { i++; tokStart = i; continue; }
      if (c !== '{') { i++; continue; }

      let j = i + 1, d = 1, s2 = null;
      while (j < to && d > 0) {
        const q = clean[j];
        if (s2) {
          if (q === BS) { j += 2; continue; }
          if (q === s2) s2 = null;
          j++; continue;
        }
        if (q === '"' || q === "'") { s2 = q; j++; continue; }
        if (q === '{') d++;
        else if (q === '}') d--;
        j++;
      }
      const prelude = clean.slice(tokStart, i).trim();
      if (prelude.startsWith('@')) {
        const name = prelude.slice(1).split(/[\s({]/)[0].toLowerCase();
        if (!OPAQUE_AT.test(name)) walk(i + 1, j - 1, [...stack, prelude]);
      } else if (prelude) {
        rules.push({ prelude, stack, offset: tokStart, body: clean.slice(i + 1, j - 1) });
      }
      i = j; tokStart = i;
    }
  }
}

function parseDeclarations(body) {
  const decls = [];
  for (const chunk of splitTop(body, ';')) {
    const text = chunk.trim();
    if (!text || text.includes('{')) continue;
    const at = splitTop(text, ':');
    if (at.length < 2) continue;
    const prop = at[0].trim().toLowerCase();
    if (!prop || /[\s{}]/.test(prop)) continue;
    let value = at.slice(1).join(':').trim();
    const important = /!\s*important$/i.test(value);
    if (important) value = value.replace(/!\s*important$/i, '').trim();
    decls.push({ prop, value, important });
  }
  return decls;
}

// ---------------------------------------------------------------- source map

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function decodeVLQ(str) {
  const out = [];
  let shift = 0, value = 0;
  for (const ch of str) {
    const d = B64.indexOf(ch);
    if (d < 0) return out;
    value += (d & 31) << shift;
    if (d & 32) { shift += 5; continue; }
    const negative = value & 1;
    value >>= 1;
    out.push(negative ? -value : value);
    value = 0; shift = 0;
  }
  return out;
}

function buildSourceLookup(css, map) {
  let srcIdx = 0, srcLine = 0, srcCol = 0;
  const segsByLine = map.mappings.split(';').map((line) => {
    let genCol = 0;
    const segs = [];
    for (const seg of line.split(',')) {
      if (!seg) continue;
      const f = decodeVLQ(seg);
      genCol += f[0];
      if (f.length >= 4) {
        srcIdx += f[1]; srcLine += f[2]; srcCol += f[3];
        segs.push([genCol, srcIdx, srcLine]);
      }
    }
    return segs;
  });

  const lineStarts = [0];
  for (let i = 0; i < css.length; i++) if (css[i] === '\n') lineStarts.push(i + 1);

  return (offset) => {
    let lo = 0, hi = lineStarts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (lineStarts[mid] <= offset) lo = mid; else hi = mid - 1;
    }
    const col = offset - lineStarts[lo];
    let best = null;
    for (const s of segsByLine[lo] || []) {
      if (s[0] <= col) best = s; else break;
    }
    if (!best) return null;
    const src = map.sources[best[1]] || '?';
    return { file: src.replace(/^(\.\.\/)+/, ''), line: best[2] + 1 };
  };
}

// ---------------------------------------------------------------- selectors

// User-driven state. Two rules only race if they are in the same state, so these are compared as a
// signature rather than evaluated. Structural pseudo-classes are evaluated against the tree instead.
const STATE_PSEUDO = new Set([
  'hover', 'focus', 'focus-visible', 'focus-within', 'active', 'visited', 'link', 'any-link',
  'target', 'target-within', 'checked', 'indeterminate', 'default', 'disabled', 'enabled',
  'read-only', 'read-write', 'placeholder-shown', 'valid', 'invalid', 'user-valid', 'user-invalid',
  'required', 'optional', 'in-range', 'out-of-range', 'autofill', 'open', 'popover-open',
  'fullscreen', 'picture-in-picture', 'defined', 'modal', 'paused', 'playing', 'current', 'past',
  'future', 'local-link'
]);
const FUNCTIONAL_FILTER = new Set(['not', 'is', 'where', 'matches', '-webkit-any', 'has']);
const NAME_CHAR = /[-\w -￿]/;

// Split a compound (no combinators) into simple selectors.
function parseCompound(text) {
  const parts = [];
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (c === '*') { parts.push({ kind: 'universal' }); i++; continue; }
    if (c === '#' || c === '.') {
      let j = i + 1;
      while (j < text.length && NAME_CHAR.test(text[j])) j++;
      parts.push({ kind: c === '#' ? 'id' : 'class', name: text.slice(i + 1, j) });
      i = j; continue;
    }
    if (c === '[') {
      let j = i + 1, str = null;
      while (j < text.length) {
        const q = text[j];
        if (str) { if (q === str) str = null; j++; continue; }
        if (q === '"' || q === "'") { str = q; j++; continue; }
        if (q === ']') break;
        j++;
      }
      parts.push({ kind: 'attr', raw: text.slice(i + 1, j) });
      i = j + 1; continue;
    }
    if (c === ':') {
      const double = text[i + 1] === ':';
      let j = i + (double ? 2 : 1);
      while (j < text.length && /[\w-]/.test(text[j])) j++;
      const name = text.slice(i + (double ? 2 : 1), j).toLowerCase();
      let args = null;
      if (text[j] === '(') {
        let d = 1, k = j + 1;
        while (k < text.length && d > 0) {
          if (text[k] === '(') d++;
          else if (text[k] === ')') d--;
          k++;
        }
        args = text.slice(j + 1, k - 1);
        j = k;
      }
      parts.push({ kind: double ? 'element' : 'pseudo', name, args, raw: text.slice(i, j) });
      i = j; continue;
    }
    let j = i;
    while (j < text.length && (NAME_CHAR.test(text[j]) || text[j] === "|")) j++;
    if (j === i) { i++; continue; }
    parts.push({ kind: 'type', name: text.slice(i, j).toLowerCase() });
    i = j;
  }
  return parts;
}

// Complex selector -> [{ combinator, compound: [...simple] }], first combinator is null.
function parseComplex(sel) {
  const units = [];
  let cur = '', combinator = null, depth = 0, str = null;
  const flush = () => {
    const t = cur.trim();
    if (t) units.push({ combinator, compound: parseCompound(t) });
    cur = '';
  };
  for (let i = 0; i < sel.length; i++) {
    const c = sel[i];
    if (str) { cur += c; if (c === str) str = null; continue; }
    if (c === '"' || c === "'") { str = c; cur += c; continue; }
    if (c === '(' || c === '[') { depth++; cur += c; continue; }
    if (c === ')' || c === ']') { depth--; cur += c; continue; }
    if (depth === 0 && (c === '>' || c === '+' || c === '~')) {
      flush(); combinator = c; continue;
    }
    if (depth === 0 && /\s/.test(c)) {
      if (cur.trim()) {
        // Peek: an explicit combinator after the space replaces the descendant one.
        let k = i;
        while (k < sel.length && /\s/.test(sel[k])) k++;
        if ('>+~'.includes(sel[k])) { flush(); combinator = sel[k]; i = k; continue; }
        flush(); combinator = ' ';
      }
      continue;
    }
    cur += c;
  }
  flush();
  return units;
}

function specificity(units) {
  const s = [0, 0, 0];
  const add = (parts) => {
    for (const p of parts) {
      if (p.kind === 'id') s[0]++;
      else if (p.kind === 'class' || p.kind === 'attr') s[1]++;
      else if (p.kind === 'type') s[2]++;
      else if (p.kind === 'element') s[2]++;
      else if (p.kind === 'pseudo') {
        if (p.name === 'where') continue;
        if (FUNCTIONAL_FILTER.has(p.name) && p.args) {
          // :is()/:not()/:has() take the specificity of their most specific argument.
          let best = [0, 0, 0];
          for (const branch of splitTop(p.args, ',')) {
            const b = specificity(parseComplex(branch.trim()));
            if (b[0] > best[0] || (b[0] === best[0] && (b[1] > best[1] || (b[1] === best[1] && b[2] > best[2])))) best = b;
          }
          s[0] += best[0]; s[1] += best[1]; s[2] += best[2];
        } else if (p.name === 'nth-child' || p.name === 'nth-last-child') {
          s[1]++;
          if (p.args && / of /i.test(p.args)) {
            const of = p.args.split(/ of /i)[1];
            const b = specificity(parseComplex(of.trim()));
            s[0] += b[0]; s[1] += b[1]; s[2] += b[2];
          }
        } else s[1]++;
      }
    }
  };
  for (const u of units) add(u.compound);
  return s;
}

// Everything that makes two rules apply in DIFFERENT circumstances even on the same element.
function stateSignature(units) {
  const tokens = [];
  const scan = (parts) => {
    for (const p of parts) {
      if (p.kind === 'element') tokens.push('::' + p.name);
      else if (p.kind === 'pseudo') {
        if (STATE_PSEUDO.has(p.name)) tokens.push(':' + p.name);
        else if (p.args && FUNCTIONAL_FILTER.has(p.name) && /:[a-z-]+/.test(p.args)) {
          const inner = [...p.args.matchAll(/:([a-z-]+)/g)].map((m) => m[1]).filter((n) => STATE_PSEUDO.has(n));
          if (inner.length) tokens.push(`:${p.name}(${inner.map((n) => ':' + n).join(',')})`);
        }
      }
    }
  };
  // Only the key compound targets our element; ancestor state is a different circumstance too.
  units.forEach((u, idx) => {
    const before = tokens.length;
    scan(u.compound);
    if (idx !== units.length - 1) {
      for (let k = before; k < tokens.length; k++) tokens[k] = 'anc' + idx + tokens[k];
    }
  });
  return tokens.sort().join('');
}

// ---------------------------------------------------------------- html -> element trees

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
  'param', 'source', 'track', 'wbr']);
const RAW_TEXT = new Set(['script', 'style', 'textarea', 'title']);

function parseAttrs(text) {
  const attrs = {};
  const re = /([a-zA-Z_:@][-\w:.]*)\s*(?:=\s*("[^"]*"|'[^']*'|[^\s"'>]+))?/g;
  let m;
  while ((m = re.exec(text))) {
    const raw = m[2] ?? '';
    attrs[m[1].toLowerCase()] = raw.replace(/^["']|["']$/g, '');
  }
  return attrs;
}

function classTokens(value) {
  // Liquid-tolerant: keep the literal text inside {% if %} branches, drop {{ }} interpolations.
  return value
    .replace(/\{\{[\s\S]*?\}\}/g, ' ')
    .replace(/\{%[\s\S]*?%\}/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function makeElement(tag, attrs, origin) {
  return {
    tag,
    id: attrs.id || null,
    classes: new Set(classTokens(attrs.class || '')),
    attrs,
    origin,
    parent: null,
    children: [],
    index: 0
  };
}

function parseHtml(html, file) {
  const root = makeElement('#document', {}, `${file}:0`);
  const stack = [root];
  const all = [];
  let i = 0;
  const lineAt = (off) => 1 + (html.slice(0, off).match(/\n/g) || []).length;

  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt < 0) break;
    if (html.startsWith('<!--', lt)) {
      const end = html.indexOf('-->', lt);
      i = end < 0 ? html.length : end + 3;
      continue;
    }
    if (html[lt + 1] === '!' || html[lt + 1] === '?') {
      const end = html.indexOf('>', lt);
      i = end < 0 ? html.length : end + 1;
      continue;
    }
    if (html[lt + 1] === '/') {
      const end = html.indexOf('>', lt);
      const name = html.slice(lt + 2, end < 0 ? html.length : end).trim().toLowerCase();
      for (let k = stack.length - 1; k > 0; k--) {
        if (stack[k].tag === name) { stack.length = k; break; }
      }
      i = end < 0 ? html.length : end + 1;
      continue;
    }
    const nameMatch = /^<([a-zA-Z][-\w:]*)/.exec(html.slice(lt, lt + 64));
    if (!nameMatch) { i = lt + 1; continue; }
    let end = lt + 1, str = null;
    while (end < html.length) {
      const c = html[end];
      if (str) { if (c === str) str = null; end++; continue; }
      if (c === '"' || c === "'") { str = c; end++; continue; }
      if (c === '>') break;
      end++;
    }
    const tag = nameMatch[1].toLowerCase();
    const inner = html.slice(lt + 1 + tag.length, end);
    const selfClosing = inner.trimEnd().endsWith('/');
    const el = makeElement(tag, parseAttrs(inner), `${file}:${lineAt(lt)}`);
    const parent = stack[stack.length - 1];
    el.parent = parent;
    el.index = parent.children.length;
    parent.children.push(el);
    all.push(el);
    i = end + 1;
    if (RAW_TEXT.has(tag) && !selfClosing) {
      const close = html.toLowerCase().indexOf(`</${tag}`, i);
      i = close < 0 ? html.length : close;
      continue;
    }
    if (!VOID.has(tag) && !selfClosing) stack.push(el);
  }
  return all;
}

// ---------------------------------------------------------------- matcher

const YES = 2, MAYBE = 1, NO = 0;
const weakest = (a, b) => Math.min(a, b);

function matchAttr(raw, el) {
  const m = /^\s*([-\w:]+)\s*(?:([~^$*|]?=)\s*("[^"]*"|'[^']*'|[^\]\s]+)\s*(i|s)?)?\s*$/.exec(raw);
  if (!m) return MAYBE;
  const name = m[1].toLowerCase();
  if (!(name in el.attrs)) return NO;
  if (!m[2]) return YES;
  let want = m[3].replace(/^["']|["']$/g, '');
  let have = el.attrs[name];
  if (m[4] === 'i') { want = want.toLowerCase(); have = have.toLowerCase(); }
  switch (m[2]) {
    case '=': return have === want ? YES : NO;
    case '~=': return have.split(/\s+/).includes(want) ? YES : NO;
    case '^=': return have.startsWith(want) ? YES : NO;
    case '$=': return have.endsWith(want) ? YES : NO;
    case '*=': return have.includes(want) ? YES : NO;
    case '|=': return have === want || have.startsWith(want + '-') ? YES : NO;
    default: return MAYBE;
  }
}

function matchCompound(compound, el) {
  let result = YES;
  for (const p of compound) {
    if (p.kind === 'universal') continue;
    if (p.kind === 'type') { if (el.tag !== p.name) return NO; continue; }
    if (p.kind === 'id') { if (el.id !== p.name) return NO; continue; }
    if (p.kind === 'class') { if (!el.classes.has(p.name)) return NO; continue; }
    if (p.kind === 'attr') { result = weakest(result, matchAttr(p.raw, el)); if (!result) return NO; continue; }
    if (p.kind === 'element') continue; // pseudo-element: carried in the state signature
    // pseudo-class
    if (STATE_PSEUDO.has(p.name)) continue; // carried in the state signature
    if (p.name === 'root') { if (el.tag !== 'html') return NO; continue; }
    if (p.name === 'not') {
      let anyHit = NO;
      for (const branch of splitTop(p.args || '', ',')) {
        anyHit = Math.max(anyHit, matchComplex(parseComplex(branch.trim()), el));
      }
      if (anyHit === YES) return NO;
      if (anyHit === MAYBE) result = weakest(result, MAYBE);
      continue;
    }
    if (p.name === 'is' || p.name === 'where' || p.name === 'matches' || p.name === '-webkit-any') {
      let best = NO;
      for (const branch of splitTop(p.args || '', ',')) {
        best = Math.max(best, matchComplex(parseComplex(branch.trim()), el));
      }
      if (!best) return NO;
      result = weakest(result, best);
      continue;
    }
    if (p.name === 'has') { result = weakest(result, MAYBE); continue; }
    if (p.name === 'first-child') { if (el.parent && el.index !== 0) return NO; continue; }
    if (p.name === 'last-child') {
      if (el.parent && el.index !== el.parent.children.length - 1) return NO;
      continue;
    }
    if (p.name === 'only-child') {
      if (el.parent && el.parent.children.length !== 1) return NO;
      continue;
    }
    result = weakest(result, MAYBE);
  }
  return result;
}

function matchComplex(units, el) {
  if (!units.length) return NO;
  const last = units[units.length - 1];
  let r = matchCompound(last.compound, el);
  if (!r) return NO;
  if (units.length === 1) return r;

  const rest = units.slice(0, -1);
  const comb = last.combinator;
  if (comb === ' ' || comb === '>') {
    if (!el.parent) return NO;
    if (comb === '>') return weakest(r, matchComplex(rest, el.parent));
    let best = NO;
    for (let a = el.parent; a; a = a.parent) best = Math.max(best, matchComplex(rest, a));
    return weakest(r, best);
  }
  if (comb === '+' || comb === '~') {
    if (!el.parent) return NO;
    const sibs = el.parent.children;
    let best = NO;
    if (comb === '+') {
      if (el.index === 0) return NO;
      best = matchComplex(rest, sibs[el.index - 1]);
    } else {
      for (let k = 0; k < el.index; k++) best = Math.max(best, matchComplex(rest, sibs[k]));
    }
    return weakest(r, best);
  }
  return NO;
}

// ---------------------------------------------------------------- inputs

function walkFiles(dir, ext, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkFiles(full, ext, out);
    else if (ext.some((x) => e.name.endsWith(x))) out.push(full);
  }
  return out;
}

const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');

// Rendered pages. Only pages that actually LINK the stylesheet are in its cascade - `_site` also
// carries the redesign-lab pages, which load their own CSS and must not be judged against this one.
function collectRenderedElements() {
  const elements = [];
  for (const file of walkFiles(SITE, ['.html'])) {
    const html = fs.readFileSync(file, 'utf8');
    if (!html.includes(CSS_FILE)) continue;
    elements.push(...parseHtml(html, rel(file)));
  }
  return elements;
}

// Templates. Rendered pages miss classes that only appear on a branch nothing currently takes
// (`is-active` on a nav link, `er-row--media` without a thumb), so read the source too. These have
// no reliable ancestry, so they only ever satisfy combinator-free selectors.
function collectTemplateElements() {
  const elements = [];
  for (const file of [...walkFiles(path.join(ROOT, '_layouts'), ['.html']),
    ...walkFiles(path.join(ROOT, '_includes'), ['.html'])]) {
    const text = fs.readFileSync(file, 'utf8');
    for (const el of parseHtml(text, rel(file))) {
      if (el.classes.size >= 2) elements.push(el);
    }
  }
  return elements;
}

// JS. Two things: HTML written into template literals (real markup, real ancestry), and classes
// added at runtime. A runtime class cannot be tied to one element statically, so a file that both
// queries selectors and adds classes yields "these elements MAY also carry these classes" - a
// warning tier, never a hard failure unless --strict.
function collectJsFiles() {
  return [
    ...walkFiles(path.join(ROOT, '_javascript'), ['.js']),
    ...walkFiles(path.join(ROOT, 'assets', 'js'), ['.js'])
  ].filter((f) => !rel(f).includes('/dist/')); // dist/ is Rollup output of _javascript/, already read
}

function collectJsFragments() {
  const fragments = [];
  for (const file of collectJsFiles()) {
    const src = fs.readFileSync(file, 'utf8');
    for (const m of src.matchAll(/`([^`]*<[a-zA-Z][^`]*)`/g)) {
      if (/class\s*=/.test(m[1])) fragments.push(...parseHtml(m[1], rel(file)));
    }
  }
  return fragments;
}

function collectJsAugmented(markupElements) {
  const augmented = [];
  for (const file of collectJsFiles()) {
    const src = fs.readFileSync(file, 'utf8');
    const name = rel(file);

    // `classList.add` ADDS to an element that already has classes, so it can create the collision.
    // `el.className = '...'` REPLACES the whole list, so it cannot - a freshly built element ends up
    // with exactly those tokens and nothing to race against. That is why only `add` is read here.
    const addSites = [...src.matchAll(/classList\s*\.\s*(?:add|toggle)\s*\(([^)]*)\)/g)].map((m) => ({
      at: m.index,
      tokens: [...m[1].matchAll(/['"]([^'"]+)['"]/g)].flatMap((lit) => classTokens(lit[1]))
    })).filter((s) => s.tokens.length);
    if (!addSites.length) continue;

    const querySites = [...src.matchAll(/(?:querySelectorAll|querySelector|closest|matches)\s*\(\s*['"]([^'"]+)['"]/g)]
      .map((m) => ({ at: m.index, selector: m[1] }));
    if (!querySites.length) continue;

    // Which element receives the class is a data-flow question no regex can answer, so pair an add
    // with the queries NEAR it rather than with every query in the file. File-wide pairing invented
    // elements that do not exist (one `<a>` carrying skip-link, the progress bar and a firefly).
    for (const site of addSites) {
      const hosts = querySites
        .filter((q) => Math.abs(q.at - site.at) <= JS_PAIR_WINDOW)
        .flatMap((q) => splitTop(q.selector, ',').map((s) => parseComplex(s.trim())));
      if (!hosts.length) continue;
      for (const el of markupElements) {
        if (!hosts.some((u) => matchComplex(u, el) === YES)) continue;
        augmented.push({ ...el, classes: new Set([...el.classes, ...site.tokens]), viaJs: name });
      }
    }
  }
  return augmented;
}

// ---------------------------------------------------------------- pinned order dependencies
//
// Every entry below is a place where two partials really do race and the ALPHABET happens to pick
// the winner we want. Pinning one is not a fix and not a licence: it is a statement that the order
// was checked, the winner is the intended one, and the reason is written down. A collision that is
// NOT on this list fails the build.
//
// Match key is the element's class set plus the property plus the two partials. Values are not part
// of the key, so retuning a colour keeps its pin; adding a NEW property to the same pair does not.
// Mirror any change here in the comment at the top of `_sass/components/_index.scss`.

const PINNED = [
  {
    classes: 'lb top-bar__logo',
    props: ['color'],
    partials: ['_sass/components/_line-boil.scss', '_sass/components/_top-bar.scss'],
    winner: '_sass/components/_top-bar.scss',
    why: "Rod's call, docs/REQUESTS.md P457: offered the boil's orange or the port's gold he said " +
      '"it should stay the gold it is now". The top bar and the portal centre mark are deliberately ' +
      'different colours. The font-family half of the same collision was fixed by deleting the ' +
      'declaration from _top-bar.scss rather than by reordering.'
  },
  {
    classes: 'card-cover z-layer',
    props: ['border-color', 'box-shadow'],
    partials: ['_sass/components/_merged-card.scss', '_sass/components/_project-cards-expensive.scss'],
    winner: '_sass/components/_project-cards-expensive.scss',
    why: 'Deliberate suppressor, _sass/components/_project-cards-expensive.scss:205: it holds ' +
      "merged-card's hover down so the cursor reveal is the one that reads. The grid is " +
      'class="merged-cards merged-cards--square epx-cards" and the card is ' +
      'class="post-card ct-glow-card", so both partials hit the same cover.'
  },
  {
    classes: 'kit-button kit-button--outline pwin__enter',
    props: ['border-radius', 'color', 'font-size', 'z-index'],
    partials: ['_sass/components/_button-kit.scss', '_sass/components/_portal-window.scss'],
    winner: '_sass/components/_portal-window.scss',
    why: 'Deliberate override, _sass/components/_portal-window.scss:296: the Enter affordance IS ' +
      "button-kit's primary and this file adds placement, squares off the kit's 8px radius against " +
      'the locked square rule, and sizes the label to the window header.'
  }
];

// The winner is part of the key on purpose. Pinning the PAIR alone would stay green if someone
// resorted the forwards and flipped which partial wins, which is the regression this exists to stop.
function pinFor(finding) {
  const last = finding.participants[finding.participants.length - 1];
  return PINNED.find((p) => p.classes === finding.classSet
    && p.props.includes(finding.prop)
    && p.winner === last.file
    && finding.participants.every((x) => p.partials.includes(x.file)));
}

function fail(msg) {
  process.stderr.write(`css-order-check: ${msg}\n`);
  process.exit(2);
}

const cssPath = CSS_OVERRIDE ? path.resolve(CSS_OVERRIDE) : path.join(SITE, CSS_FILE);
const mapPath = cssPath + '.map';
if (!fs.existsSync(cssPath)) fail(`no built CSS at ${rel(cssPath)}. Run \`bundle exec jekyll build\` first.`);
if (!fs.existsSync(mapPath)) fail(`no source map at ${rel(mapPath)}. It is what attributes a rule to its partial.`);

const cssText = fs.readFileSync(cssPath, 'utf8');
const lookupSource = buildSourceLookup(cssText, JSON.parse(fs.readFileSync(mapPath, 'utf8')));
const parsed = parseStylesheet(stripComments(cssText));

const rules = [];
for (const raw of parsed) {
  const decls = parseDeclarations(raw.body);
  if (!decls.length) continue;
  const layers = raw.stack.filter((s) => /^@layer\b/.test(s)).map((s) => s.slice(6).trim().replace(/\s+/g, ' '));
  const conditions = raw.stack.filter((s) => !/^@layer\b/.test(s)).map((s) => s.replace(/\s+/g, ' ')).sort();
  const src = lookupSource(raw.offset) || { file: '(unmapped)', line: 0 };
  for (const selText of splitTop(raw.prelude, ',')) {
    const sel = selText.trim();
    if (!sel) continue;
    const units = parseComplex(sel);
    if (!units.length) continue;
    rules.push({
      selector: sel,
      units,
      spec: specificity(units),
      state: stateSignature(units),
      layer: layers.join('|') || '(unlayered)',
      conditions: conditions.join(' && ') || '(none)',
      decls,
      file: src.file,
      line: src.line,
      order: rules.length
    });
  }
}

const rendered = collectRenderedElements();
const templates = collectTemplateElements();
const fragments = collectJsFragments();
const augmented = collectJsAugmented([...rendered, ...fragments]);

const population = [
  ...rendered.map((el) => ({ el, tier: 'error' })),
  ...fragments.map((el) => ({ el, tier: 'error' })),
  ...templates.map((el) => ({ el, tier: 'error', flat: true })),
  ...augmented.map((el) => ({ el, tier: 'warn' }))
].filter((e) => e.el.classes.size >= 2);

// One representative per distinct class set keeps the scan honest and fast: the hazard is a property
// of the class COMBINATION, not of the individual node.
const seen = new Map();
for (const entry of population) {
  const key = [entry.tier, entry.el.tag, [...entry.el.classes].sort().join(' '),
    entry.el.parent ? [...entry.el.parent.classes].sort().join(' ') + '/' + entry.el.parent.tag : ''].join('|');
  if (!seen.has(key)) seen.set(key, entry);
}
const sample = [...seen.values()];

const findings = new Map();
let equalValueCollisions = 0;

for (const { el, tier, flat } of sample) {
  const matched = [];
  for (const rule of rules) {
    if (flat && rule.units.length > 1) continue; // template elements have no trustworthy ancestry
    if (matchComplex(rule.units, el) !== YES) continue;
    matched.push(rule);
  }
  if (matched.length < 2) continue;

  // Bucket by everything that must be equal for source order to be the ONLY tie-breaker.
  const buckets = new Map();
  for (const r of matched) {
    const key = `${r.layer}|${r.conditions}|${r.state}|${r.spec.join(',')}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(r);
  }

  for (const [key, group] of buckets) {
    if (group.length < 2) continue;
    const byProp = new Map();
    for (const r of group) {
      for (const d of r.decls) {
        const pk = `${d.prop}|${d.important}`;
        if (!byProp.has(pk)) byProp.set(pk, []);
        byProp.get(pk).push({ rule: r, decl: d });
      }
    }
    for (const [pk, hits] of byProp) {
      const partials = new Set(hits.map((h) => h.rule.file));
      if (partials.size < 2) continue;
      if (new Set(hits.map((h) => h.decl.value)).size < 2) { equalValueCollisions++; continue; }

      const [prop, important] = pk.split('|');
      const ordered = [...hits].sort((a, b) => a.rule.order - b.rule.order);
      const id = [tier, prop, key, ordered.map((h) => h.rule.selector + '@' + h.rule.file).join(' vs ')].join('#');
      if (findings.has(id)) { findings.get(id).elements.add(el.origin); continue; }
      findings.set(id, {
        tier,
        prop,
        important: important === 'true',
        layer: key.split('|')[0],
        conditions: key.split('|')[1],
        state: key.split('|')[2],
        spec: key.split('|')[3],
        participants: ordered.map((h) => ({
          selector: h.rule.selector, file: h.rule.file, line: h.rule.line, value: h.decl.value
        })),
        element: `<${el.tag} class="${[...el.classes].join(' ')}">`,
        classSet: [...el.classes].sort().join(' '),
        viaJs: el.viaJs || null,
        elements: new Set([el.origin])
      });
    }
  }
}

// A partial that loses its `@layer components` wrapper goes UNLAYERED, and unlayered CSS beats every
// layer, so it silently wins over everything (D36, docs/TRAPS.md - it shipped broken to 40 pages
// once). A file whose rules come out split across layered and unlayered is the shape that happens
// when a wrapper closes early or a rule is added below it.
const layerCensus = new Map();
for (const r of rules) {
  if (!layerCensus.has(r.file)) layerCensus.set(r.file, new Map());
  const byLayer = layerCensus.get(r.file);
  byLayer.set(r.layer, (byLayer.get(r.layer) || 0) + 1);
}
const splitLayer = [...layerCensus.entries()]
  .filter(([file, byLayer]) => file.startsWith('_sass/components/')
    && byLayer.size > 1 && byLayer.has('(unlayered)'))
  .map(([file, byLayer]) => ({ file, layers: [...byLayer].map(([l, n]) => `${l}:${n}`).join(', ') }));

// ---------------------------------------------------------------- report

const raw = [...findings.values()];
for (const f of raw) {
  const pin = pinFor(f);
  if (pin) { f.tier = 'pinned'; f.why = pin.why; }
}
const rank = { error: 0, warn: 1, pinned: 2 };
const all = raw.sort((a, b) => rank[a.tier] - rank[b.tier]);
const errors = all.filter((f) => f.tier === 'error');
const warns = all.filter((f) => f.tier === 'warn');
const pinned = all.filter((f) => f.tier === 'pinned');

const stalePins = PINNED.filter((p) => !pinned.some((f) => pinFor(f) === p));

const broken = errors.length || splitLayer.length || (STRICT && warns.length);

if (JSON_OUT) {
  process.stdout.write(JSON.stringify({
    rules: rules.length,
    partials: new Set(rules.map((r) => r.file)).size,
    elements: sample.length,
    equalValueCollisions,
    splitLayer,
    stalePins: stalePins.map((p) => p.classes),
    findings: all.map((f) => ({ ...f, elements: [...f.elements].slice(0, 5) }))
  }, null, 2) + '\n');
} else {
  const line = (s = '') => process.stdout.write(s + '\n');
  const TAG = { error: 'HAZARD', warn: 'WARN  ', pinned: 'pinned' };
  line(`css-order-check  ${rules.length} rules from ${new Set(rules.map((r) => r.file)).size} partials, `
    + `${sample.length} distinct multi-class elements`);
  line();

  for (const s of splitLayer) {
    line(`HAZARD  ${s.file} emits rules both inside and outside a layer (${s.layers}).`);
    line('        Unlayered CSS beats every layer, so the stray rules win over everything. D36.');
    line();
  }

  let shown = 0;
  for (const f of all) {
    if (f.tier === 'pinned' && shown >= LIMIT) continue;
    if (shown++ >= LIMIT) { line(`... ${all.length - LIMIT} more (raise --limit)`); break; }
    line(`${TAG[f.tier]}  ${f.prop}${f.important ? ' !important' : ''}   ${f.element}`);
    for (const p of f.participants) {
      const wins = p === f.participants[f.participants.length - 1] ? '  <- wins on load order' : '';
      line(`        ${p.selector.padEnd(38)} ${p.file}:${p.line}`);
      line(`        ${''.padEnd(38)} ${p.value}${wins}`);
    }
    line(`        layer ${f.layer} | media ${f.conditions} | state ${f.state || 'none'} | specificity ${f.spec}`);
    line(`        seen at ${[...f.elements].slice(0, 3).join(', ')}`);
    if (f.viaJs) line(`        class added at runtime by ${f.viaJs}`);
    if (f.why) line(`        pinned: ${f.why}`);
    line();
  }

  for (const p of stalePins) {
    line(`stale pin  "${p.classes}" no longer collides. Delete it from PINNED and from`);
    line('           the note at the top of _sass/components/_index.scss.');
  }
  if (stalePins.length) line();

  line(`${errors.length} hazard(s), ${warns.length} warning(s), ${pinned.length} pinned, `
    + `${splitLayer.length} broken layer wrapper(s). ${equalValueCollisions} same-value overlap(s) ignored.`);
  if (!broken) line('Nothing new is decided by @forward order alone.');
  else if (errors.length) line('A property is decided by load order and nobody wrote down why. Fix it, or pin it in tools/css-order-check.mjs with the reason.');
}

process.exit(broken ? 1 : 0);
