// Take the comments out of the site's source, and keep them somewhere else.
//
//   node tools/strip-comments.mjs --check            list files that have comments; exit 1 if any
//   node tools/strip-comments.mjs --write            remove them, saving each to docs/code-comments/
//   ... --skip <path>                                leave a file alone (repeatable)
//
// Rod, 2026-10-09: "strip them all out and place them in the review area or place them in MD and
// not in the scripts themselves ... Code should be self explanatory". By then comments were 27% of
// the code base, 4,817 lines, most of them history.
//
// Comments are found with a parser for each language (espree, postcss-scss, Ruby's Ripper), never
// with a pattern, because a pattern cannot tell `//` in a URL or a regular expression from a
// comment and would delete code. Templates are the exception: Liquid and HTML comments have
// unambiguous delimiters, and inline scripts inside them are still parsed.
//
// Stylesheets get a second reading of the text itself, because postcss-scss only reports a comment
// that sits between statements and misses one inside a Sass map, a list, a selector list or a
// multi-line value. One case is reported as a NOTE and never removed: text after `//` inside a
// custom property's value. Sass does not treat that as a comment, the browser receives it, and
// taking it out changes the stylesheet.
//
// Kept: comments that are instructions to a tool (eslint and stylelint directives, Ruby magic
// comments, licence banners). Everything else goes to docs/code-comments/<path>.md with the line
// it sat on, and the review page for that file shows them.
import { spawnSync } from 'node:child_process';
import { existsSync, globSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as espree from 'espree';
import postcssScss from 'postcss-scss';

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ARCHIVE = 'docs/code-comments';
const SCOPE = ['_sass/**/*.scss', 'assets/css/*.css', 'assets/css/*.scss', 'assets/js/**/*.js', '_javascript/**/*.js',
  '_layouts/**/*.html', '_includes/**/*.html', '_plugins/*.rb', 'assets/*.html'];
const OUTSIDE = ['/dist/', '/lib/', '/vendors/'];
const TOOL_DIRECTIVE = /eslint-|stylelint-|^\s*(global|globals|jshint|istanbul)\b|@ts-|@license|@preserve|^!|[@#]__PURE__|frozen_string_literal|^\s*-\*-|\[if |endif\]/;

const args = process.argv.slice(2);
const write = args.includes('--write');
const skip = new Set(args.flatMap((arg, i) => (arg === '--skip' ? [args[i + 1]] : [])));

function scriptComments(code, offset, isModule) {
  const masked = code
    .replace(/\{\{[\s\S]*?\}\}/g, (tag) => '_'.repeat(tag.length))
    .replace(/\{%[\s\S]*?%\}/g, (tag) => tag.replace(/[^\n]/g, ' '));
  for (const sourceType of isModule ? ['module', 'script'] : ['script', 'module']) {
    try {
      const tree = espree.parse(masked, { ecmaVersion: 'latest', sourceType, comment: true, range: true });
      return tree.comments.map((c) => ({ start: offset + c.range[0], end: offset + c.range[1], body: c.value }));
    } catch { /* try the other source type */ }
  }
  return null;
}

function commentsByText(text, from) {
  const list = [];
  for (let i = from; i < text.length; i += 1) {
    const two = text.slice(i, i + 2);
    if (text[i] === '"' || text[i] === '\'') {
      const quote = text[i];
      for (i += 1; i < text.length && text[i] !== quote && text[i] !== '\n'; i += 1) if (text[i] === '\\') i += 1;
    } else if (/^url\(\s*[^'"\s]/.test(text.slice(i, i + 12))) {
      i = text.indexOf(')', i) === -1 ? text.length : text.indexOf(')', i);
    } else if (two === '//' || two === '/*') {
      const stop = two === '//' ? text.indexOf('\n', i) : text.indexOf('*/', i);
      const end = stop === -1 ? text.length : stop + (two === '//' ? 0 : 2);
      list.push({ start: i, end: text[end - 1] === '\r' ? end - 1 : end, body: text.slice(i + 2, two === '//' ? end : end - 2) });
      i = end - 1;
    }
  }
  return list;
}

function commentsIn(file, text) {
  const found = [];
  const unparsed = [];
  const shipped = [];
  if (file.endsWith('.js')) {
    const front = /^---\r?\n(?:[\s\S]*?\r?\n)?---\r?\n/.exec(text);
    const start = front ? front[0].length : 0;
    const list = scriptComments(text.slice(start), start, true);
    if (list) found.push(...list); else unparsed.push('the whole file');
  } else if (file.endsWith('.scss') || file.endsWith('.css')) {
    const front = /^---\r?\n(?:[\s\S]*?\r?\n)?---\r?\n/.exec(text);
    const start = front ? front[0].length : 0;
    const tree = postcssScss.parse(text.slice(start));
    tree.walkComments((node) => {
      const from = start + node.source.start.offset;
      const to = node.raws.inline ? (text.indexOf('\n', from) === -1 ? text.length : text.indexOf('\n', from)) : text.indexOf('*/', from) + 2;
      found.push({ start: from, end: text[to - 1] === '\r' ? to - 1 : to, body: node.text });
    });
    // The parser only reports a comment that sits between statements. One inside a Sass map, a
    // multi-line list, a selector list or a multi-line value is invisible to it, which is how three
    // survived the first strip. Read the text as well, skipping strings and url().
    const customValues = [];
    tree.walkDecls(/^--/, (node) => customValues.push([start + node.source.start.offset, start + node.source.end.offset]));
    for (const comment of commentsByText(text, start)) {
      if (found.some((known) => comment.start >= known.start && comment.start < known.end)) continue;
      // Sass copies a custom property's value out untouched, so this one is not a comment to the
      // compiler: the browser receives it as part of the value. Removing it changes the stylesheet.
      if (customValues.some(([a, b]) => comment.start >= a && comment.start <= b)) {
        shipped.push(`line ${text.slice(0, comment.start).split('\n').length}: "${text.slice(comment.start, comment.end).trim()}" is inside a custom property's value, so the browser receives it as part of the value; fix it by hand`);
      } else found.push(comment);
    }
  } else if (file.endsWith('.rb')) {
    const probe = 'require "ripper"; require "json"; src = File.read(ARGV[0], encoding: "utf-8"); ' +
      'puts Ripper.lex(src).select { |t| t[1] == :on_comment }.map { |t| [t[0][0], t[0][1], t[2]] }.to_json';
    const lines = text.split('\n');
    const lineStart = lines.reduce((acc, line) => acc.concat(acc[acc.length - 1] + Buffer.byteLength(line + '\n')), [0]);
    for (const [line, column, body] of JSON.parse(spawnSync('ruby', ['-e', probe, path.join(REPO, file)], { encoding: 'utf8' }).stdout)) {
      const bytes = Buffer.from(text);
      const from = Buffer.from(bytes.subarray(0, lineStart[line - 1] + column)).toString().length;
      found.push({ start: from, end: from + body.replace(/\r?\n$/, '').length, body: body.replace(/^#/, '') });
    }
  } else {
    const taken = [];
    const claim = (pattern, clean) => {
      for (const match of text.matchAll(pattern)) {
        if (taken.some(([a, b]) => match.index >= a && match.index < b)) continue;
        taken.push([match.index, match.index + match[0].length]);
        found.push({ start: match.index, end: match.index + match[0].length, body: clean(match[0]), liquid: /^\{%/.test(match[0]) ? match[0] : null });
      }
    };
    claim(/\{%-?\s*comment\s*-?%\}[\s\S]*?\{%-?\s*endcomment\s*-?%\}/g, (c) => c.replace(/^\{%-?\s*comment\s*-?%\}|\{%-?\s*endcomment\s*-?%\}$/g, ''));
    // Liquid comments are prose and often mention `<script>` or `<!--`. Blank them out before
    // looking for real ones, or a sentence in a comment gets read as the start of a script.
    const view = taken.reduce((seen, [a, b]) => seen.slice(0, a) + text.slice(a, b).replace(/[^\n]/g, ' ') + seen.slice(b), text);
    const bodies = [];
    for (const match of view.matchAll(/<(script|style)\b([^>]*)>([\s\S]*?)<\/\1>/g)) {
      const from = match.index + match[0].indexOf('>') + 1;
      bodies.push([from, from + match[3].length]);
      if (match[1] === 'style') {
        for (const c of match[3].matchAll(/\/\*[\s\S]*?\*\//g)) found.push({ start: from + c.index, end: from + c.index + c[0].length, body: c[0].slice(2, -2) });
      } else if (!/src=/.test(match[2]) && !/json/.test(match[2]) && match[3].trim()) {
        const list = scriptComments(match[3], from, /type="module"/.test(match[2]));
        if (list) found.push(...list.filter((c) => !taken.some(([a, b]) => c.start >= a && c.start < b)));
        else unparsed.push('an inline script near offset ' + from);
      }
    }
    // `<!--` inside a Liquid tag is a string the template is working with, not a comment:
    // post-description.html uses one to comment out table cells in generated HTML.
    const markup = view.replace(/\{%[\s\S]*?%\}|\{\{[\s\S]*?\}\}/g, (tag) => tag.replace(/[^\n]/g, ' '));
    for (const match of markup.matchAll(/<!--[\s\S]*?-->/g)) {
      const inside = (ranges) => ranges.some(([a, b]) => match.index >= a && match.index < b);
      if (inside(bodies) || inside(taken)) continue;
      found.push({ start: match.index, end: match.index + match[0].length, body: match[0].slice(4, -3) });
    }
  }
  const kept = found.filter((c) => TOOL_DIRECTIVE.test(c.body));
  return { remove: found.filter((c) => !TOOL_DIRECTIVE.test(c.body)).sort((a, b) => a.start - b.start), kept: kept.length, unparsed, shipped };
}

function strip(text, comments) {
  const lineOf = (offset) => text.lastIndexOf('\n', offset - 1) + 1;
  const endOf = (offset) => (text.indexOf('\n', offset) === -1 ? text.length : text.indexOf('\n', offset));
  const cuts = [];
  const notes = [];
  for (const comment of comments) {
    let { start, end } = comment;
    const before = text.slice(lineOf(start), start);
    const after = text.slice(end, endOf(end));
    const ownLines = !before.trim() && !after.trim();
    const anchorLine = ownLines
      ? (text.slice(endOf(end)).split('\n').find((line) => line.trim()) || '').trim()
      : (before + after).trim();
    notes.push({ line: text.slice(0, start).split('\n').length, where: ownLines ? 'above' : 'on the line', anchor: anchorLine.slice(0, 110), body: comment.body });
    // Liquid's `{%-` and `-%}` eat the whitespace beside them. The comment is going, so its eating
    // has to be done in the source or a space appears in the built page where there was none.
    if (comment.liquid && /^\{%-/.test(comment.liquid)) while (start > 0 && /\s/.test(text[start - 1])) start -= 1;
    if (comment.liquid && /-%\}$/.test(comment.liquid)) while (end < text.length && /\s/.test(text[end])) end += 1;
    else if (ownLines && !(comment.liquid && /^\{%-/.test(comment.liquid))) { start = lineOf(start); end = Math.min(text.length, endOf(end) + 1); }
    else if (!after.trim()) while (start > 0 && /[ \t]/.test(text[start - 1])) start -= 1;
    cuts.push([start, end]);
  }
  let out = '';
  let cursor = 0;
  for (const [start, end] of cuts) {
    if (start < cursor) continue;
    let piece = text.slice(cursor, start);
    // do not leave two blank lines where a comment used to separate them
    if (/\n[ \t]*\n$/.test(out + piece) && /^[ \t]*\r?\n/.test(text.slice(end))) piece = piece.replace(/\n[ \t]*\n$/, '\n');
    out += piece;
    cursor = end;
  }
  out += text.slice(cursor);
  return { text: out.replace(/^\s*\n(?!---)/, (lead) => (text.startsWith('---') ? lead : '')), notes };
}

function tidy(body) {
  const lines = body.replace(/\r/g, '').split('\n').map((line) => line.replace(/^\s*\*( |$)/, '').replace(/\s+$/, ''));
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  const indent = Math.min(...lines.filter((line) => line.trim()).map((line) => line.match(/^ */)[0].length));
  return lines.map((line) => line.slice(Number.isFinite(indent) ? indent : 0)).join('\n');
}

function archive(file, notes, commit) {
  const target = path.join(REPO, ARCHIVE, file + '.md');
  mkdirSync(path.dirname(target), { recursive: true });
  const fence = (body) => (body.includes('```') ? '~~~~' : '```');
  const head = existsSync(target) ? readFileSync(target, 'utf8').replace(/\s*$/, '\n\n') :
    `# Comments removed from \`${file}\`\n\nThe review page for this file shows these beside the code. Line numbers are the file as it was\nwhen each batch was removed.\n\n`;
  const batch = `## Removed ${new Date().toISOString().slice(0, 10)}, from the file at commit ${commit}\n\n` + notes.map((note) =>
    `### Line ${note.line}, ${note.anchor ? `${note.where} \`${note.anchor.replace(/`/g, '\'')}\`` : 'at the end of the file'}\n\n${fence(note.body)}text\n${tidy(note.body)}\n${fence(note.body)}\n`).join('\n');
  writeFileSync(target, head + batch);
}

const commit = spawnSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: REPO, encoding: 'utf8' }).stdout.trim();
const files = [...new Set(SCOPE.flatMap((pattern) => globSync(pattern, { cwd: REPO })))].map((file) => file.replace(/\\/g, '/'))
  .filter((file) => !OUTSIDE.some((part) => file.includes(part)) && !skip.has(file)).sort();
let total = 0, withComments = 0, keptTotal = 0;
const trouble = [];
for (const file of files) {
  const text = readFileSync(path.join(REPO, file), 'utf8');
  let result;
  try { result = commentsIn(file, text); } catch (error) { trouble.push(`${file}: ${error.message.split('\n')[0]}`); continue; }
  result.unparsed.forEach((what) => trouble.push(`${file}: could not parse ${what}; its comments were left in place`));
  result.shipped.forEach((what) => trouble.push(`${file} ${what}`));
  keptTotal += result.kept;
  if (!result.remove.length) continue;
  withComments += 1;
  total += result.remove.length;
  if (write) {
    const stripped = strip(text, result.remove);
    writeFileSync(path.join(REPO, file), stripped.text);
    archive(file, stripped.notes, commit);
  } else if (args.includes('--verbose')) {
    console.log(String(result.remove.length).padStart(4), file);
  }
}
trouble.forEach((line) => console.log('NOTE ' + line));
console.log(`${files.length} files in scope, ${withComments} with comments, ${total} comments ${write ? 'removed and saved under ' + ARCHIVE : 'found'}; ${keptTotal} tool directives kept` +
  (skip.size ? `; skipped: ${[...skip].join(', ')}` : ''));
process.exitCode = !write && total ? 1 : 0;
