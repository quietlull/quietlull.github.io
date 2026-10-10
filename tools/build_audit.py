"""Build the code-audit pages: one page per source file, listed in the lab to-do page.

Run:  python tools/build_audit.py      (the serve hook normally does it, after every build)

Rod, 2026-10-09: "put each script and item to review in the site to do and have me click into it
with a little page that shows the code and describes what it does", then "describe it in
technical detail and where it might connect to other components and pieces of code".

EVERY CONNECTION ON A PAGE IS MEASURED FROM THE SOURCE, here, each time: what a file imports,
what imports it, which built pages load it, which classes, ids, data attributes and CSS custom
properties it reads or writes, and which stylesheets and templates use the same names. Nothing
in that part is written by hand, so it cannot drift from the code.

The "How it works" part IS written by hand, in docs/CODE-AUDIT.md, one `## path` section per
file. A file with no section says so, and shows its own header comment instead.

Like the workbench, this writes into `_site/redesign-lab/` only.
"""
import collections
import glob
import html
import io
import os
import re
import shutil
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build_workbench as wb  # noqa: E402

REPO, SITE, SEP = wb.REPO, wb.SITE, os.sep
LAB = os.path.join(SITE, 'redesign-lab')
OUT = os.path.join(LAB, 'audit')
NOTES = os.path.join(REPO, 'docs', 'CODE-AUDIT.md')

GROUPS = [
    ('Scripts served as written', 'assets/js: plain ES modules, no build step', ['assets/js/**/*.js']),
    ('Scripts bundled by Rollup', '_javascript: built into assets/js/dist/*.min.js', ['_javascript/**/*.js']),
    ('Layouts', 'one per page type', ['_layouts/*.html']),
    ('Includes', 'template parts the layouts pull in', ['_includes/**/*.html']),
    ('Build plugins', 'Ruby, run by Jekyll at build time', ['_plugins/*.rb']),
    ('Stylesheets', 'compiled into one stylesheet', ['_sass/**/*.scss', 'assets/css/*.css']),
]
BROWSER = set('''addEventListener removeEventListener innerWidth innerHeight matchMedia location
    requestAnimationFrame cancelAnimationFrame devicePixelRatio scrollY scrollX scrollTo scrollBy
    getComputedStyle setTimeout clearTimeout setInterval clearInterval performance navigator history
    localStorage sessionStorage document open prompt dispatchEvent pageYOffset pageXOffset screen
    visualViewport IntersectionObserver MutationObserver ResizeObserver DeviceOrientationEvent
    getSelection fetch URL URLSearchParams console alert confirm top parent self origin
    CustomEvent Event Image crypto requestIdleCallback'''.split())


def read(path):
    return io.open(path, encoding='utf-8-sig', errors='ignore').read()


def esc(value):
    return html.escape(str(value), quote=True)


def slug(path):
    return re.sub(r'[^a-z0-9]+', '-', path.lower()).strip('-')


def kind_of(path):
    return {'.js': 'js', '.html': 'html', '.rb': 'rb'}.get(os.path.splitext(path)[1], 'css')


# ---------------------------------------------------------------------------------------------
# reading a file: code versus comment, the header comment, comment-free text for analysis
# ---------------------------------------------------------------------------------------------

COMMENTS = {
    'js': r'/\*.*?\*/|//[^\n]*',
    'css': r'/\*.*?\*/|//[^\n]*',
    'html': r'\{%-?\s*comment\s*-?%\}.*?\{%-?\s*endcomment\s*-?%\}|<!--.*?-->',
    'rb': r'#[^\n]*',
}
STRINGS = r'"(?:\\.|[^"\\\n])*"|\'(?:\\.|[^\'\\\n])*\'|`(?:\\.|[^`\\])*`'


def split_comments(text, kind):
    """(text with comments blanked, list of comment strings). Strings are stepped over first, so
    a `//` inside a URL string is not taken for a comment."""
    found = []
    pattern = COMMENTS[kind] if kind == 'html' else '(%s)|(?:%s)' % (COMMENTS[kind], STRINGS)

    def blank(match):
        comment = match.group(0) if kind == 'html' else match.group(1)
        if not comment:
            return match.group(0)
        found.append(comment)
        return re.sub(r'[^\n]', ' ', comment)

    return re.sub(pattern, blank, text, flags=re.S), found


def measure(text, bare):
    code = sum(1 for line in bare.split('\n') if line.strip())
    total = sum(1 for line in text.split('\n') if line.strip())
    return code, total - code


def summary_of(comments):
    if not comments:
        return ''
    first = re.sub(r'\{%-?\s*(end)?comment\s*-?%\}|<!--|-->|/\*+|\*+/|^\s*(//+|#+|\*)', ' ', comments[0], flags=re.M)
    first = re.sub(r'[=\-_]{4,}', ' ', first)
    first = re.sub(r'\s+', ' ', first).strip()
    sentence = re.split(r'(?<=[.!?])\s', first)[0]
    return sentence[:170] + ('...' if len(sentence) > 170 else '')


# ---------------------------------------------------------------------------------------------
# what a script touches
# ---------------------------------------------------------------------------------------------

def literals(text):
    return [m.group(2) for m in re.finditer(r'([\'"`])((?:(?!\1)[^\\\n]|\\.)*)\1', text)]


def kebab(name):
    return 'data-' + re.sub(r'([A-Z])', lambda m: '-' + m.group(1).lower(), name)


def script_facts(bare):
    facts = collections.OrderedDict()
    selectors = [m.group(2) for m in re.finditer(
        r'(?:querySelector(?:All)?|closest|matches)\(\s*([\'"`])((?:(?!\1).)+?)\1', bare, flags=re.S)]
    ids = sorted({'#' + m.group(2) for m in re.finditer(r'getElementById\(\s*([\'"])(.+?)\1', bare)})
    written = set()
    for m in re.finditer(r'classList\.(?:add|remove|toggle|contains|replace)\(([^)]*)\)', bare):
        written.update(literals(m.group(1)))
    for m in re.finditer(r'className\s*=\s*([\'"`])(.+?)\1', bare):
        written.update(m.group(2).split())
    written = {name for name in written if re.fullmatch(r'[A-Za-z_][\w-]*', name)}
    data = {kebab(m.group(1)) for m in re.finditer(r'dataset\.([A-Za-z]\w*)', bare)}
    data |= {m.group(2) for m in re.finditer(r'(?:get|has|set|remove)Attribute\(\s*([\'"])(data-[\w-]+)\1', bare)}
    data |= {m.group(1) for sel in selectors for m in re.finditer(r'\[(data-[\w-]+)', sel)}
    props = sorted({m.group(2) for m in re.finditer(r'([\'"`])(--[A-Za-z][\w-]*)', bare)})
    events = collections.OrderedDict()
    for m in re.finditer(r'([\w.$\]\)]+)\s*\.addEventListener\(\s*([\'"])([\w:-]+)\2', bare):
        events.setdefault(m.group(3), set()).add(m.group(1).split('.')[-1] if m.group(1) not in ('window', 'document') else m.group(1))
    timing = [(label, len(re.findall(pattern, bare))) for label, pattern in (
        ('requestAnimationFrame', r'requestAnimationFrame\('), ('setInterval', r'setInterval\('),
        ('setTimeout', r'setTimeout\('), ('IntersectionObserver', r'new IntersectionObserver'),
        ('MutationObserver', r'new MutationObserver'), ('ResizeObserver', r'new ResizeObserver'))]
    constants = dict(re.findall(r'(?:const|let|var)\s+([A-Z][A-Z0-9_]*)\s*=\s*[\'"]([^\'"\n]+)[\'"]', bare))
    storage = set()
    for m in re.finditer(r'(?:local|session)Storage\.(?:get|set|remove)Item\(\s*([^,)]+)', bare):
        key = m.group(1).strip()
        storage.add(key.strip('\'"`') if key[0] in '\'"`' else '%s = "%s"' % (key, constants[key]) if key in constants else key)
    own = {m.group(1) for m in re.finditer(r'window\.([A-Za-z_$][\w$]*)\s*=[^=]', bare)}
    seen = {m.group(1) for m in re.finditer(r'window\.([A-Za-z_$][\w$]*)', bare)} - BROWSER
    exports = [m.group(1) for m in re.finditer(r'export\s+(?:async\s+)?(?:function\*?|const|let|class)\s+([A-Za-z_$][\w$]*)', bare)]
    for m in re.finditer(r'export\s*\{([^}]*)\}', bare):
        exports += [part.split(' as ')[-1].strip() for part in m.group(1).split(',') if part.strip()]
    if re.search(r'export\s+default', bare):
        exports.append('default')
    functions = sorted(set(re.findall(r'(?:^|\n)\s*(?:export\s+)?(?:async\s+)?function\*?\s+([A-Za-z_$][\w$]*)', bare)))

    classes = set(written)
    for sel in selectors:
        classes.update(re.findall(r'\.(-?[A-Za-z_][\w-]*)', sel))
    facts['exports'] = exports
    facts['functions'] = [name for name in functions if name not in exports]
    facts['selectors it looks up'] = sorted(set(selectors)) + ids
    facts['classes it adds or removes'] = sorted(written)
    facts['elements it creates'] = sorted(set(re.findall(r'createElement(?:NS)?\((?:[^,)]*,\s*)?[\'"]([\w-]+)[\'"]\)', bare)))
    facts['data attributes it reads or writes'] = sorted(data)
    facts['CSS custom properties it names'] = props
    facts['events it listens for'] = ['%s (on %s)' % (name, ', '.join(sorted(targets))) for name, targets in events.items()]
    facts['timers and observers'] = ['%s x%d' % pair for pair in timing if pair[1]]
    facts['storage keys'] = sorted(storage)
    facts['globals it sets on window'] = sorted(own)
    facts['globals it reads from window'] = sorted(seen - own)
    facts['network'] = sorted(set(re.findall(r'fetch\(\s*([^,)]{1,80})', bare)))
    return facts, classes


def html_classes(bare):
    found = set()
    for match in re.finditer(r'class="([^"]*)"', bare):
        value = re.sub(r'\{%.*?%\}|\{\{.*?\}\}', ' ', match.group(1), flags=re.S)
        found.update(token for token in value.split() if re.fullmatch(r'-?[A-Za-z_][\w-]*', token))
    return found


# ---------------------------------------------------------------------------------------------
# rendering
# ---------------------------------------------------------------------------------------------

KEYWORDS = {
    'js': r'\b(?:import|export|from|const|let|var|function|return|if|else|for|while|of|in|new|class|extends|async|await|try|catch|finally|throw|switch|case|break|continue|default|typeof|instanceof|null|undefined|true|false|this)\b',
    'css': r'@[\w-]+|\$[\w-]+|--[A-Za-z][\w-]*',
    'html': r'\{%.*?%\}|\{\{.*?\}\}',
    'rb': r'\b(?:def|end|do|if|unless|else|elsif|next|return|module|class|require|nil|true|false)\b',
}


def highlight(text, kind):
    pattern = re.compile('(?P<c>%s)|(?P<s>%s)|(?P<k>%s)' % (COMMENTS[kind], STRINGS, KEYWORDS[kind]), re.S)
    out, last = [], 0
    for match in pattern.finditer(text):
        out.append(esc(text[last:match.start()]))
        out.append('<span class="%s">%s</span>' % (match.lastgroup, esc(match.group(0))))
        last = match.end()
    out.append(esc(text[last:]))
    return ''.join(out)


def notes_to_html(markdown, link):
    def inline(text):
        text = esc(text)
        text = re.sub(r'`([^`]+)`', lambda m: link(html.unescape(m.group(1))), text)
        return re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', text)

    out = []
    for block in re.split(r'\n\s*\n', markdown.strip()):
        lines = block.strip().split('\n')
        if lines[0].startswith('### '):
            out.append('<h3>%s</h3>' % inline(lines[0][4:]))
            lines = lines[1:]
            if not lines:
                continue
        if all(line.lstrip().startswith('- ') or line.startswith('  ') for line in lines):
            items, current = [], ''
            for line in lines:
                if line.lstrip().startswith('- '):
                    if current:
                        items.append(current)
                    current = line.lstrip()[2:]
                else:
                    current += ' ' + line.strip()
            items.append(current)
            out.append('<ul>%s</ul>' % ''.join('<li>%s</li>' % inline(item) for item in items))
        else:
            out.append('<p>%s</p>' % inline(' '.join(line.strip() for line in lines)))
    return '\n'.join(out)


# ---------------------------------------------------------------------------------------------
# main
# ---------------------------------------------------------------------------------------------

def main():
    started = time.time()
    if not os.path.isdir(SITE):
        sys.exit('No _site/ folder. Run `bundle exec jekyll build` first.')

    # ---- the files -----------------------------------------------------------------------------
    items = collections.OrderedDict()
    for group, _, patterns in GROUPS:
        for pattern in patterns:
            for path in sorted(glob.glob(os.path.join(REPO, *pattern.split('/')), recursive=True)):
                name = wb.rel(path)
                if any(part in name for part in ('/dist/', '/lib/', '/vendors/')) or name in items:
                    continue
                text = read(path)
                kind = kind_of(name)
                bare, comments = split_comments(text, kind)
                code, comment = measure(text, bare)
                items[name] = {'group': group, 'kind': kind, 'text': text, 'bare': bare, 'code': code,
                               'comment': comment, 'summary': summary_of(comments),
                               'header': comments[0] if comments and text.lstrip().startswith(comments[0][:12]) else ''}

    notes = {}
    if os.path.exists(NOTES):
        for section in re.split(r'(?m)^## ', read(NOTES))[1:]:
            title, _, body = section.partition('\n')
            notes[title.strip().strip('`')] = body.strip()

    def link(text):
        target = re.match(r'([\w./-]+?)(:\d+(?:-\d+)?)?$', text)
        if target and target.group(1) in items:
            return '<a href="%s.html"><code>%s</code></a>' % (slug(target.group(1)), esc(text))
        return '<code>%s</code>' % esc(text)

    def links(paths):
        return ', '.join(link(path) for path in paths) or 'nothing'

    # ---- scripts: who imports whom ---------------------------------------------------------------
    scripts = [name for name, item in items.items() if item['kind'] == 'js']
    imports, importers, external = collections.defaultdict(list), collections.defaultdict(set), collections.defaultdict(set)

    def resolve(spec, origin):
        if spec.startswith('/'):
            candidate = spec.lstrip('/')
        elif spec.startswith('.'):
            candidate = os.path.normpath(os.path.join(os.path.dirname(origin), spec)).replace(SEP, '/')
        else:
            return None
        for option in (candidate, candidate + '.js', candidate + '/index.js'):
            if option in items:
                return option
        return None

    def read_imports(code, origin):
        found = []
        for clause, spec in re.findall(r'(?:import|export)\s+([^\'";]*?)\s*from\s*[\'"]([^\'"]+)[\'"]', code):
            found.append((spec, re.sub(r'\s+', ' ', clause).strip()))
        for spec in re.findall(r'import\s*[\'"]([^\'"]+)[\'"]', code) + re.findall(r'import\(\s*[\'"]([^\'"]+)[\'"]', code):
            found.append((spec, ''))
        # A service worker pulls files in with importScripts, and the path is from the site root.
        for spec in re.findall(r'importScripts\(\s*[\'"]([^\'"]+)[\'"]', code):
            found.append(('/' + spec.lstrip('./'), 'importScripts'))
        resolved = []
        for spec, clause in found:
            target = resolve(spec, origin)
            if target:
                resolved.append((target, clause))
            elif not spec.startswith(('.', '/')) or spec.startswith('http'):
                external[origin].add(spec)
        return resolved

    for name in scripts:
        for target, clause in read_imports(items[name]['bare'], name):
            imports[name].append((target, clause))
            importers[target].add(name)

    def reach(start):
        seen, queue = set(), list(start)
        while queue:
            current = queue.pop()
            if current in seen:
                continue
            seen.add(current)
            queue.extend(target for target, _ in imports[current])
        return seen

    # templates that name a script, directly or in an inline module
    templates = [name for name, item in items.items() if item['kind'] == 'html']
    named_by = collections.defaultdict(set)
    for name in templates:
        for path in set(re.findall(r'/(assets/js/[\w./-]+?\.js)', items[name]['text'])):
            if path in items:
                named_by[path].add(name)

    # Rollup entry points -> the modules each bundle contains
    bundles = {}
    config = os.path.join(REPO, 'rollup.config.js')
    if os.path.exists(config):
        for entry, options in re.findall(r"build\('([\w-]+)'(?:,\s*\{([^}]*)\})?", read(config)):
            path = '_javascript/%s%s.js' % ('pwa/' if 'SRC_PWA' in (options or '') else '', entry)
            if path in items:
                bundles[entry] = reach([path])

    # built pages: which scripts does each one really load
    page_count, total_pages = collections.Counter(), 0
    bundle_pages = collections.Counter()
    for built in glob.glob(os.path.join(SITE, '**', '*.html'), recursive=True):
        if (SEP + 'redesign-lab' + SEP) in built:
            continue
        total_pages += 1
        text = read(built)
        loaded = {p for p in re.findall(r'/(assets/js/[\w./-]+?\.js)', text) if p in items}
        for target, _ in read_imports(''.join(re.findall(r'<script[^>]*type="module"[^>]*>(.*?)</script>', text, flags=re.S)), 'page'):
            loaded.add(target)
        loaded = reach(loaded)
        for entry in set(re.findall(r'/([\w-]+)\.min\.js', text)):
            if entry in bundles:
                bundle_pages[entry] += 1
                loaded |= bundles[entry]
        for path in loaded:
            page_count[path] += 1

    # ---- shared names: classes across scripts, templates and stylesheets --------------------------
    _, _, _, _, in_sheet = wb.read_stylesheets()
    styled_in = collections.defaultdict(set)
    for sheet, tokens in in_sheet.items():
        for token in tokens:
            styled_in[token].add(sheet)
    facts, used_by_script, used_by_template = {}, collections.defaultdict(set), collections.defaultdict(set)
    for name in scripts:
        facts[name], classes = script_facts(items[name]['bare'])
        items[name]['classes'] = classes
        for token in classes:
            used_by_script[token].add(name)
    for name in templates:
        items[name]['classes'] = html_classes(items[name]['bare'])
        inline = ''.join(re.findall(r'<script(?![^>]*src=)[^>]*>(.*?)</script>', items[name]['text'], flags=re.S))
        if inline.strip():
            facts[name], script_classes = script_facts(split_comments(inline, 'js')[0])
            for token in script_classes:
                used_by_script[token].add(name)
        for token in items[name]['classes']:
            used_by_template[token].add(name)

    # templates: includes and layouts
    includes, included_by, children = collections.defaultdict(set), collections.defaultdict(set), collections.defaultdict(set)
    def include(owner, path):
        if path in items and path != owner:
            includes[owner].add(path)
            included_by[path].add(owner)

    for name in templates:
        bare = items[name]['bare']
        for target in re.findall(r'\{%-?\s*include(?:_cached|_relative)?\s+([\w./-]+\.html)', bare):
            include(name, '_includes/' + target)
        # An include whose name is built from a variable: `analytics/{{ platform }}.html`. Every
        # file in that folder is a possible target, so every one counts as included from here.
        for folder in re.findall(r'([\w-]+/)\{\{[^}]*\}\}', bare):
            for path in items:
                if path.startswith('_includes/' + folder):
                    include(name, path)
        # A layout can also hand `_layouts/default.html` a list of includes in its front matter.
        front = re.search(r'\A---\s*\n(.*?)\n---', items[name]['text'], flags=re.S)
        listed = front and re.search(r'^script_includes:[ \t]*\n((?:[ \t]+-[ \t]*\S+[ \t]*\n?)+)', front.group(1) + '\n', flags=re.M)
        if listed:
            for target in re.findall(r'-[ \t]*([\w/-]+)', listed.group(1)):
                include(name, '_includes/%s.html' % target)
        parent = re.search(r'\A---\s*\n.*?^layout:\s*([\w-]+)', items[name]['text'], flags=re.S | re.M)
        if parent and '_layouts/%s.html' % parent.group(1) in items:
            items[name]['parent'] = '_layouts/%s.html' % parent.group(1)
            children[items[name]['parent']].add(name)
    layout_users = collections.Counter()
    for content in glob.glob(os.path.join(REPO, '**', '*.md'), recursive=True) + glob.glob(os.path.join(REPO, '*.html')):
        if any(part in content for part in (SEP + '_site' + SEP, SEP + 'node_modules' + SEP, SEP + 'redesign-lab' + SEP, SEP + 'docs' + SEP)):
            continue
        front = re.search(r'\A---\s*\n(.*?)\n---', read(content), flags=re.S)
        named = front and re.search(r'^layout:\s*([\w-]+)', front.group(1), flags=re.M)
        if named:
            layout_users[named.group(1)] += 1

    shutil.rmtree(OUT, ignore_errors=True)
    os.makedirs(OUT)

    def shared_table(name):
        rows = []
        for token in sorted(items[name].get('classes', ())):
            sheets = sorted(os.path.basename(s) for s in styled_in.get(token, ()))
            markup = sorted(used_by_template.get(token, set()) - {name})
            code = sorted(used_by_script.get(token, set()) - {name})
            if sheets or markup or code:
                rows.append('<tr><td><code>.%s</code></td><td>%s</td><td>%s</td><td>%s</td></tr>' % (
                    esc(token), esc(', '.join(sheets)), links(markup) if markup else '', links(code) if code else ''))
        if not rows:
            return ''
        return ('<h2>Class names it shares with other files</h2><p class="hint">Renaming one of these means '
                'changing every file on its row.</p><table><thead><tr><th>class</th><th>styled in</th>'
                '<th>in templates</th><th>used by scripts</th></tr></thead><tbody>%s</tbody></table>' % ''.join(rows))

    def fact_list(name):
        rows = ['<tr><th>%s</th><td>%s</td></tr>' % (esc(label), ' '.join('<code>%s</code>' % esc(v) for v in values))
                for label, values in facts.get(name, {}).items() if values]
        return '<table class="facts">%s</table>' % ''.join(rows) if rows else ''

    def removed_comments(name, text):
        """The comments that used to be in this file. They were taken out of the source on Rod's
        instruction (P542) and live in docs/code-comments/, one file per source file."""
        saved = os.path.join(REPO, 'docs', 'code-comments', *(name + '.md').split('/'))
        if not os.path.exists(saved):
            return ''
        lines = text.split('\n')
        entries = []
        for was, place, body in re.findall(r'(?m)^### Line (\d+), (.*?)\n\n(?:```|~~~~)text\n(.*?)\n(?:```|~~~~)$', read(saved), flags=re.S):
            anchor = re.search(r'`(.*)`', place)
            now = next((i + 1 for i, line in enumerate(lines) if anchor and line.strip().startswith(anchor.group(1)[:60])), None)
            entries.append('<li><p class="where">%s%s</p><pre class="quote">%s</pre></li>' % (
                esc(place.replace('`', '')), ' <span class="hint">now line %d</span>' % now if now else '', esc(body)))
        if not entries:
            return ''
        return ('<details class="removed"><summary>%d comment%s removed from this file (kept in <code>docs/code-comments/%s.md</code>)'
                '</summary><ol>%s</ol></details>' % (len(entries), '' if len(entries) == 1 else 's', esc(name), ''.join(entries)))

    todo_rows = collections.OrderedDict((group, []) for group, _, _ in GROUPS)
    for name, item in items.items():
        kind, body = item['kind'], []
        share = round(100 * item['comment'] / max(1, item['code'] + item['comment']))
        where = ''

        if kind == 'js':
            in_bundles = sorted(entry for entry, members in bundles.items() if name in members)
            pages = page_count[name]
            where = 'on %d of %d pages' % (pages, total_pages)
            reached = bool(named_by[name] or importers[name] or in_bundles)
            body.append('<h2>What loads it</h2><ul class="conn">')
            body.append('<li><b>Built pages that end up running it:</b> %d of %d.</li>' % (pages, total_pages))
            if named_by[name]:
                body.append('<li><b>Named directly by templates:</b> %s</li>' % links(sorted(named_by[name])))
            if in_bundles:
                body.append('<li><b>Inside Rollup bundles:</b> %s</li>' % ', '.join(
                    '<code>%s.min.js</code> (%d pages)' % (entry, bundle_pages[entry]) for entry in in_bundles))
            body.append('<li><b>Imported by:</b> %s</li>' % links(sorted(importers[name])))
            if imports[name]:
                body.append('<li><b>It imports:</b> %s</li>' % ', '.join(
                    '%s%s' % (link(target), ' <span class="hint">%s</span>' % esc(clause) if clause else '')
                    for target, clause in imports[name]))
            if external[name]:
                body.append('<li><b>Packages:</b> %s</li>' % ' '.join('<code>%s</code>' % esc(p) for p in sorted(external[name])))
            body.append('</ul>')
            if not reached:
                where = 'NOTHING REFERENCES IT'
                body.append('<p class="flag">No template, bundle entry or other script in the live tree names this '
                            'file. A candidate for deletion; check whether the lab uses it before cutting.</p>')
            elif not pages:
                where = 'referenced, but not loaded in the local build'
                body.append('<p class="flag">Something names this file (see below), but no page in this LOCAL build '
                            'ends up loading it. It is behind a condition that is false here: a front matter '
                            'switch no page sets, or a production-only block. The service worker and analytics '
                            'are only switched on in the production build, which these pages do not measure.</p>')
            body.append('<h2>What it touches</h2>' + fact_list(name))
        elif kind == 'html':
            body.append('<h2>Where it sits</h2><ul class="conn">')
            if item.get('parent'):
                body.append('<li><b>Its own layout:</b> %s</li>' % link(item['parent']))
            if name.startswith('_layouts/'):
                layout = os.path.basename(name)[:-5]
                body.append('<li><b>Pages and posts that name it as their layout:</b> %d (posts can also get '
                            'theirs from <code>_config.yml</code> defaults)</li>' % layout_users[layout])
                body.append('<li><b>Layouts built on it:</b> %s</li>' % links(sorted(children[name])))
            else:
                body.append('<li><b>Included by:</b> %s</li>' % links(sorted(included_by[name])))
                if not included_by[name]:
                    where = 'NOT INCLUDED by any template'
                    body.append('</ul><p class="flag">No layout or include pulls this file in by name. It may be '
                                'included through a variable; check before cutting.</p><ul class="conn">')
            body.append('<li><b>It includes:</b> %s</li>' % links(sorted(includes[name])))
            body.append('<li><b>Scripts it names:</b> %s</li>' % links(sorted(
                path for path in items if items[path]['kind'] == 'js' and name in named_by[path])))
            inputs = collections.OrderedDict((label, sorted(set(re.findall(pattern, item['bare'])))) for label, pattern in (
                ('Parameters it expects (include.x)', r'include\.(\w+)'), ('Page front matter it reads (page.x)', r'page\.(\w+)'),
                ('Site data it reads (site.data.x)', r'site\.data\.([\w.]+)'), ('Ids it emits', r'\bid="([A-Za-z][\w-]*)"')))
            for label, values in inputs.items():
                if values:
                    body.append('<li><b>%s:</b> %s</li>' % (label, ' '.join('<code>%s</code>' % esc(v) for v in values)))
            body.append('</ul>')
            if name in facts:
                body.append('<h2>What its inline scripts touch</h2>' + fact_list(name))
        elif kind == 'css':
            named = in_sheet.get(name, set())
            body.append('<h2>Where it sits</h2><ul class="conn">')
            uses = sorted(set(re.findall(r'@(?:use|forward|import)\s+[\'"]([^\'"]+)', item['text'])))
            if uses:
                body.append('<li><b>It pulls in:</b> %s</li>' % ' '.join('<code>%s</code>' % esc(u) for u in uses))
            body.append('<li><b>Class names in its selectors:</b> %d</li>' % len(named))
            body.append('<li><b>Templates that emit one of them:</b> %s</li>' % links(sorted(
                {t for token in named for t in used_by_template.get(token, ())})))
            body.append('<li><b>Scripts that use one of them:</b> %s</li>' % links(sorted(
                {t for token in named for t in used_by_script.get(token, ())})))
            body.append('<li><a href="../workbench.html#wb-%s">See it on the workbench</a></li></ul>' % wb.slug_of(name))
        else:
            hooks = re.findall(r'Jekyll::Hooks\.register\s+([^\n]+?)\s+do', item['bare'])
            body.append('<h2>Where it sits</h2><ul class="conn"><li><b>Jekyll hooks it registers:</b> %s</li></ul>'
                        % (' '.join('<code>%s</code>' % esc(h) for h in hooks) or 'none'))

        if name in notes:
            how = '<h2>How it works</h2><div class="notes">%s</div>' % notes_to_html(notes[name], link)
        else:
            how = ('<h2>How it works</h2><p class="hint">Technical notes for this file are not written yet. '
                   'Everything under the other headings is measured from the code.</p>')
        how += removed_comments(name, item['text'])

        total_lines = item['text'].count('\n') + 1
        page = PAGE % {
            'path': esc(name), 'kind': {'js': 'script', 'html': 'template', 'css': 'stylesheet', 'rb': 'plugin'}[kind],
            'code': item['code'], 'comment': item['comment'], 'share': share,
            'editor': 'vscode://file/' + esc(os.path.join(REPO, name).replace(SEP, '/')),
            'how': how, 'body': ''.join(body), 'shared': shared_table(name) if kind in ('js', 'html') else '',
            'numbers': '\n'.join(str(n) for n in range(1, total_lines + 1)),
            'source': highlight(item['text'], kind), 'when': time.strftime('%Y-%m-%d %H:%M'),
        }
        io.open(os.path.join(OUT, slug(name) + '.html'), 'w', encoding='utf-8', newline='').write(page)

        line = notes[name].split('\n\n')[0] if name in notes else item['summary']
        line = re.sub(r'\*\*|`', '', re.sub(r'\s+', ' ', line))
        todo_rows[item['group']].append((-page_count[name] if kind == 'js' else 0, name, (
            '<div class="row"><input type="checkbox" data-key="audit::%s"><div>'
            '<p class="id">%d lines of code%s%s%s</p>'
            '<p class="said"><a href="audit/%s.html">%s</a></p><p class="did">%s</p></div></div>' % (
                esc(name), item['code'],
                ' &middot; %d of comment (%d%%)' % (item['comment'], share) if item['comment'] else '',
                ' &middot; ' + esc(where) if where else '',
                '' if name in notes else ' &middot; notes not written yet',
                slug(name), esc(name), esc(line[:230] + ('...' if len(line) > 230 else ''))))))

    # ---- the list, written into the built to-do page ------------------------------------------------
    sections = []
    described = sum(1 for name in items if name in notes)
    for (group, hint, _) in GROUPS:
        rows = [row for _, _, row in sorted(todo_rows[group])]
        sections.append('<h2 class="sec">CODE AUDIT &middot; %s (%d)</h2><p class="secnote">%s. Each opens a page '
                        'with the code, how it works, and what it connects to.</p>%s' % (esc(group), len(rows), esc(hint), ''.join(rows)))
    block = '<!-- AUDIT-LIST:start -->\n%s\n<!-- AUDIT-LIST:end -->' % '\n'.join(sections)
    todo = os.path.join(LAB, 'todo.html')
    if os.path.exists(todo):
        text = read(todo)
        if '<!-- AUDIT-LIST -->' in text:
            text = text.replace('<!-- AUDIT-LIST -->', block)
        else:
            text = re.sub(r'<!-- AUDIT-LIST:start -->.*?<!-- AUDIT-LIST:end -->', lambda _: block, text, flags=re.S)
        io.open(todo, 'w', encoding='utf-8', newline='').write(text)

    if '--quiet' not in sys.argv:
        print('audit: %d files, %d with technical notes, in %.1fs' % (len(items), described, time.time() - started))


PAGE = '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>%(path)s</title>
<link rel="icon" href="data:,">
<link rel="stylesheet" href="../audit.css">
</head>
<body>
<header>
  <p class="crumb"><a href="../todo.html">&larr; the review list</a></p>
  <h1>%(path)s</h1>
  <p class="meta">%(kind)s &middot; %(code)d lines of code, %(comment)d of comment
    &middot; <a href="%(editor)s">open in VS Code</a></p>
</header>
<main>
%(how)s
%(body)s
%(shared)s
<h2>The code</h2>
<div class="source"><pre class="numbers">%(numbers)s</pre><pre class="lines"><code>%(source)s</code></pre></div>
<p class="hint">Read from the source on %(when)s. This page is regenerated after every local build.</p>
</main>
</body>
</html>
'''

if __name__ == '__main__':
    main()
