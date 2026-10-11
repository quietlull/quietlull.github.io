"""Build the lab workbench: every component the site ships, each in its own small document.

Run:  python tools/build_workbench.py          (after `bundle exec jekyll build`)
      python tools/build_workbench.py --report (also print what it decided, tab by tab)

It writes into the BUILT site, `_site/redesign-lab/`, never into the source tree. Under
`jekyll serve` the hook in `_plugins/workbench-hook.rb` runs it after every build, so the
workbench cannot go stale. The first version was generated once on 2026-09-04 and was three weeks
out of date when it was checked.

WHAT A SPECIMEN IS. One real element from one real built page, kept inside the chain of ancestors
it had there (as empty wrappers), with that page's own stylesheets, fonts, icon sprite and module
scripts. Nothing is copied by hand and nothing is restyled. Add `?bare=1` and the ancestors are
removed, which is the test of whether the component stands on its own: the "View projects" button
only clipped its fill because every page happened to put it in a flex parent (P529).

WHY ONE DOCUMENT PER SPECIMEN. The first version put all 36 specimens in one page and hid 35 of
them. That alone caused four separate faults: line boil measured its letters inside a hidden
panel and pinned them 0px wide; the portal's `body:has(.pground)` rule switched the page glow off
for every tab; ids repeated across tabs; and 47 videos started loading at once.

WHO OWNS A CLASS. A class belongs to the stylesheet where it is the first class of a top-level
rule; failing that, where it starts any compound selector; failing that, to the component it only
ever qualifies (`.kit-tag.is-active`). Components win over base, base wins over pages, because a
page stylesheet is allowed to override a component and does not own it by doing so. Comments,
quoted strings, mixins and placeholders are ignored: the first version credited a class to a file
that only mentioned it in a comment. This is still a heuristic. The table on each tab shows what
it decided, so a wrong call is visible.

Details and the check that led here: docs/WORKBENCH-CHECK.md.
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
from markup_tree import open_tag, parse, serialize  # noqa: E402

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(REPO, '_site')
LAB = os.path.join(SITE, 'redesign-lab')
OUT = os.path.join(LAB, 'workbench')
SEP = os.sep

# One representative page per page type. Specimens are taken from these, earliest first.
SAMPLES = [
    ('landing', '/tech-art/'),
    ('projects', '/tech-art/projects/'),
    ('post', '/tech-art/posts/ComputeGrass/'),
    ('about', '/tech-art/about/'),
    ('portal', '/'),
    ('ramblings', '/ramblings/'),
    ('archives', '/archives/'),
    ('tag', '/tags/blog/'),
    ('under construction', '/tech-art/under-construction/'),
    ('404', '/404.html'),
]
MAX_SPECIMENS = 6

# Scripts a specimen does not run. Module scripts are the redesign's own and are replayed; these
# two only exist to steer the three.js scene, which a specimen does not have.
SKIP_MODULES = ('fireworks-reach', 'scene-mode')
# Inline scripts are replayed unless they talk to the network or inject another script: a
# specimen must not ping the page-view counter or mount a live comment thread.
SKIP_INLINE = re.compile(r'fetch\(|XMLHttpRequest|giscus|goatcounter|createElement\([\'"]script')

CLASS = re.compile(r'\.(-?[A-Za-z_][\w-]*)')


def read(path):
    return io.open(path, encoding='utf-8-sig', errors='ignore').read()


def rel(path):
    return os.path.relpath(path, REPO).replace(SEP, '/')


def base_of(token):
    return re.split(r'__|--', token)[0]


def built_path(url):
    return os.path.join(SITE, *(url.strip('/').split('/') + (['index.html'] if url.endswith('/') else [])))


# ---------------------------------------------------------------------------------------------
# 1. The stylesheets: which class is defined where
# ---------------------------------------------------------------------------------------------

def clean_scss(text):
    text = re.sub(r'/\*.*?\*/', ' ', text, flags=re.S)
    text = re.sub(r'(?m)(^|[\s;{}])//[^\n]*', r'\1', text)
    text = re.sub(r'"[^"\n]*"|\'[^\'\n]*\'', '""', text)
    return re.sub(r'#\{[^{}]*\}', 'X', text)


def strip_parens(text):
    previous = None
    while previous != text:
        previous = text
        text = re.sub(r'\([^()]*\)', '', text)
    return text


def rules(text):
    """Yield (selector, top_level) for every real rule. Skips mixins, functions, placeholders."""
    stack, start = [], 0
    for i, char in enumerate(text):
        if char == ';':
            start = i + 1
        elif char == '}':
            if stack:
                stack.pop()
            start = i + 1
        elif char == '{':
            header = text[start:i].strip()
            start = i + 1
            if header.startswith(('@mixin', '@function', '%')):
                stack.append('mixin')
            elif not header or header.startswith('@'):
                stack.append('other')
            else:
                selector = strip_parens(header)
                if 'mixin' not in stack:
                    yield selector, 'class' not in stack
                stack.append('class' if CLASS.search(selector) else 'other')


def compounds(selector):
    """Yield (first_class, other_classes, is_leftmost, is_subject) for each compound with a class.

    The subject is the element a rule actually styles: its last compound. `.wrapper-project-card-grid
    .card-title` styles the title, so the title is the subject. `.bio .prose p` styles a paragraph,
    so it has no class subject and `.prose` is only being used as a landmark."""
    for part in selector.split(','):
        pieces = [piece for piece in re.split(r'[\s>+~]+', part.strip()) if piece]
        leftmost_open = not part.strip().startswith('&')
        for index, compound in enumerate(pieces):
            classes = CLASS.findall(compound)
            if classes:
                yield classes[0], classes[1:], leftmost_open, index == len(pieces) - 1
                leftmost_open = False


def tier(sheet):
    if '/components/' in sheet:
        return 0
    return 2 if '/pages/' in sheet else 1


def read_stylesheets():
    scope = collections.defaultdict(set)     # token -> sheets where it leads a top-level rule
    subject = collections.defaultdict(set)   # token -> sheets where a rule styles it directly
    first = collections.defaultdict(set)     # token -> sheets where it starts any compound
    hosts = collections.defaultdict(collections.Counter)  # qualifier -> the classes it rides on
    in_sheet = collections.defaultdict(set)  # sheet -> every class its selectors name
    paths = glob.glob(os.path.join(REPO, '_sass', '**', '*.scss'), recursive=True)
    paths.append(os.path.join(REPO, 'assets', 'css', 'chrome-scene.css'))
    for path in sorted(paths):
        sheet = rel(path)
        if '/vendors/' in sheet or not os.path.exists(path):
            continue
        for selector, top_level in rules(clean_scss(read(path))):
            for lead, others, leftmost, styled in compounds(selector):
                first[lead].add(sheet)
                in_sheet[sheet].add(lead)
                if top_level and leftmost:
                    scope[lead].add(sheet)
                if styled:
                    subject[lead].add(sheet)
                for other in others:
                    hosts[other][lead] += 1
                    in_sheet[sheet].add(other)
    return scope, subject, first, hosts, in_sheet


# ---------------------------------------------------------------------------------------------
# 2. The built site: which class is used where
# ---------------------------------------------------------------------------------------------

def page_tokens(text):
    for pattern in (r'<script.*?</script>', r'<style.*?</style>', r'<!--.*?-->'):
        text = re.sub(pattern, '', text, flags=re.S)
    counts = collections.Counter()
    for match in re.finditer(r'class="([^"]*)"', text):
        for token in match.group(1).split():
            if '{' not in token and '}' not in token:
                counts[token] += 1
    return counts


def read_site():
    uses = collections.Counter()
    on_pages = collections.Counter()
    total = 0
    for path in glob.glob(os.path.join(SITE, '**', '*.html'), recursive=True):
        if (SEP + 'redesign-lab' + SEP) in path:
            continue
        total += 1
        for token, count in page_tokens(read(path)).items():
            uses[token] += count
            on_pages[token] += 1
    return uses, on_pages, total


def read_js():
    chunks = []
    for pattern in ('assets/js/**/*.js', '_javascript/**/*.js', '_includes/*.html', '_layouts/*.html'):
        for path in glob.glob(os.path.join(REPO, *pattern.split('/')), recursive=True):
            if (SEP + 'dist' + SEP) not in path:
                chunks.append(read(path))
    return '\n'.join(chunks)


# ---------------------------------------------------------------------------------------------
# 3. Sample pages, parsed once
# ---------------------------------------------------------------------------------------------

class Page:
    def __init__(self, name, url):
        self.name, self.url = name, url
        text = self.source = read(built_path(url))
        self.tokens = page_tokens(text)
        tree = parse(text)
        self.html = tree.find('html')
        self.head = tree.find('head')
        self.body = tree.find('body')
        self.links = [serialize(node) for node in self.head.walk()
                      if node.tag == 'link' and ((node.get('rel') or '') in ('stylesheet', 'preconnect')
                                                 or 'icon' in (node.get('rel') or ''))]
        self.sprites = [node for node in self.body.walk()
                        if node.tag == 'svg' and any(child.tag == 'symbol' for child in node.walk())]
        self.glow = next((node for node in self.body.walk() if 'cursorglow' in node.classes), None)
        self.scripts, self.skipped = [], []
        for node in tree.walk():
            if node.tag != 'script':
                continue
            kind, src = node.get('type') or '', node.get('src')
            if 'json' in kind:
                continue
            if kind == 'module':
                if src and any(name in src for name in SKIP_MODULES):
                    self.skipped.append(src.rsplit('/', 1)[-1])
                else:
                    self.scripts.append(serialize(node, skip=()))
            elif src:
                self.skipped.append(src.split('?')[0].rsplit('/', 1)[-1] or src)
            else:
                code = serialize(node, skip=())
                if SKIP_INLINE.search(code):
                    self.skipped.append('an inline script that fetches or injects')
                else:
                    self.scripts.append(code)


# ---------------------------------------------------------------------------------------------
# 4. Decide ownership, find the specimens
# ---------------------------------------------------------------------------------------------

def decide_owners(tokens, scope, subject, first, hosts):
    blocks = collections.defaultdict(set)
    for token in tokens:
        blocks[base_of(token)].add(token)

    owner, how = {}, {}
    for block, members in blocks.items():
        scoped = set().union(*(scope[t] for t in members))
        styled = set().union(*(subject[t] for t in members))
        started = set().union(*(first[t] for t in members))
        # Components before base before pages. Inside a tier, leading a top-level rule beats
        # being styled as part of something else: `.card-title` is a part of the card even
        # though a base stylesheet also names it at top level.
        ranked = [(tier(sheet), 0, sheet, 'scope') for sheet in scoped]
        ranked += [(tier(sheet), 1, sheet, 'part') for sheet in styled - scoped]
        if ranked:
            _, _, owner[block], how[block] = min(ranked)
        elif started:
            owner[block], how[block] = min(started, key=lambda sheet: (tier(sheet), sheet)), 'part'
    for block, members in blocks.items():        # qualifiers follow the class they ride on
        if block in owner:
            continue
        ridden = collections.Counter()
        for token in members:
            ridden.update(hosts[token])
        for host, _ in ridden.most_common():
            if base_of(host) in owner:
                owner[block], how[block] = owner[base_of(host)], 'qualifier'
                break
    return blocks, owner, how


def find_roots(pages, eligible):
    """An element is a root for a stylesheet if it carries one of that sheet's top-level classes
    and no ancestor does. The outermost element is the component; the rest are its parts."""
    found = collections.defaultdict(list)

    def visit(node, active, page):
        here = {eligible[token] for token in node.classes if token in eligible}
        for sheet in here - active:
            found[sheet].append((page, node))
        inner = active | here
        for child in node.children:
            if child.tag:
                visit(child, inner, page)

    for page in pages:
        visit(page.body, frozenset(), page)
    return found


def hooks_in(node):
    names = set()
    for element in [node] + list(node.walk()):
        names.update(token for token in element.classes if token.startswith('js-'))
        names.update(name for name, _ in element.attrs if name.startswith('data-'))
    return sorted(names)


def specimen_document(page, node, title):
    chain = [a for a in node.ancestors() if a.tag not in ('body', 'html')]
    opened = ''.join(open_tag(a, extra=[('data-wb-wrap', None)], drop=('hidden',)) for a in reversed(chain))
    closed = ''.join('</%s>' % a.tag for a in chain)
    extras = [serialize(sprite) for sprite in page.sprites
              if sprite is not node and node not in sprite.ancestors()]
    if page.glow is not None and page.glow is not node and page.glow not in list(node.walk()):
        extras.append(serialize(page.glow))
    return '''<!doctype html>
%s
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>%s</title>
%s
</head>
%s
%s%s%s
%s
<script>
/* Workbench furniture, and the only code here that is not the page's own. ?bare=1 lifts the
   element out of its ancestors. Links are held, so a click cannot navigate the specimen away. */
(function () {
  var bare = new URLSearchParams(location.search).has('bare');
  var root = document.querySelector('[data-wb-root]');
  var outer = document.querySelector('[data-wb-wrap]');
  if (bare && outer) outer.replaceWith(root);
  if (bare) document.body.style.padding = '24px';
  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href]');
    if (link && link.getAttribute('href').charAt(0) !== '#') event.preventDefault();
  }, true);
})();
</script>
%s
</body>
</html>
''' % (open_tag(page.html), html.escape(title), '\n'.join(page.links), open_tag(page.body),
       opened, serialize(node, extra=[('data-wb-root', None)], drop=('hidden',)), closed,
       '\n'.join(extras), '\n'.join(page.scripts))


# ---------------------------------------------------------------------------------------------
# 5. Write it
# ---------------------------------------------------------------------------------------------

def title_of(sheet):
    name = re.sub(r'^_|\.s?css$', '', os.path.basename(sheet))
    return name.replace('-', ' ').replace('_', ' ').strip().capitalize()


def slug_of(sheet):
    return re.sub(r'[^a-z0-9]+', '-', re.sub(r'^_sass/|\.s?css$', '', sheet).replace('/_', '/').lower()).strip('-')


def esc(value):
    return html.escape(str(value))


def main():
    started = time.time()
    report = '--report' in sys.argv
    quiet = '--quiet' in sys.argv
    if not os.path.isdir(SITE):
        sys.exit('No _site/ folder. Run `bundle exec jekyll build` first.')

    scope, subject, first, hosts, in_sheet = read_stylesheets()
    uses, on_pages, total_pages = read_site()
    js_text = read_js()
    pages = [Page(name, url) for name, url in SAMPLES if os.path.exists(built_path(url))]

    styled = set(first) | set(hosts)
    blocks, owner, how = decide_owners(set(uses) | styled, scope, subject, first, hosts)

    # which classes can stand as a component root: top-level in their owner, and not a sub-part
    eligible = {}
    for block, members in blocks.items():
        if how.get(block) == 'scope':
            for token in members:
                if '__' not in token:
                    eligible[token] = owner[block]
    roots = find_roots(pages, eligible)
    missing = {sheet for sheet in set(eligible.values()) if not roots.get(sheet)}
    if missing:                                  # look beyond the sample for anything not yet found
        wanted = {token: sheet for token, sheet in eligible.items() if sheet in missing and uses[token]}
        for path in sorted(glob.glob(os.path.join(SITE, '**', '*.html'), recursive=True)):
            if not wanted or (SEP + 'redesign-lab' + SEP) in path:
                continue
            text = read(path)
            if any('"%s' % t in text or ' %s' % t in text for t in wanted):
                url = '/' + rel(path)[len('_site/'):]
                url = url[:-len('index.html')] if url.endswith('index.html') else url
                extra = Page(url.strip('/').split('/')[-1] or 'home', url)
                for sheet, hits in find_roots([extra], wanted).items():
                    roots[sheet] = hits
                wanted = {t: sh for t, sh in wanted.items() if not roots.get(sh)}

    sheets = sorted({sheet for sheet in in_sheet if in_sheet[sheet]},
                    key=lambda sheet: (tier(sheet), -sum(uses[t] for b in blocks if owner.get(b) == sheet
                                                         for t in blocks[b]), sheet))
    shared = collections.defaultdict(list)       # one element claimed by several stylesheets
    for sheet in sheets:
        for page, node in roots.get(sheet, []):
            shared[(page.name, id(node))].append(sheet)

    shutil.rmtree(OUT, ignore_errors=True)
    os.makedirs(OUT)

    def also_in(block, sheet):
        return sorted(os.path.basename(s) for s in in_sheet if s != sheet and blocks[block] & in_sheet[s])

    def table(sheet, own):
        if not own:
            return ''
        rows = []
        for block in sorted(own, key=lambda b: -sum(uses[t] for t in blocks[b])):
            members = sorted(t for t in blocks[block] if uses[t])
            where = [page.name for page in pages if any(page.tokens[t] for t in members)]
            names = ' '.join(members)
            rows.append('<tr><td><code>%s</code></td><td>%d</td><td>%d of %d</td><td>%s</td>'
                        '<td>%s</td><td>%s</td></tr>' % (
                            esc(block), sum(uses[t] for t in members),
                            max(on_pages[t] for t in members), total_pages,
                            esc(', '.join(where) or 'not on a sampled page'),
                            esc(names if len(names) < 90 else names[:87] + '...'),
                            esc(', '.join(also_in(block, sheet)) or '')))
        return ('<h3>What this stylesheet owns</h3><table class="wb-table"><thead><tr><th>class</th>'
                '<th>uses</th><th>pages</th><th>seen on</th><th>forms</th><th>also styled in</th>'
                '</tr></thead><tbody>%s</tbody></table>' % ''.join(rows))

    def unused(sheet):
        dead = sorted(t for t in in_sheet[sheet]
                      if not uses[t] and not re.search(r'(?<![\w-])%s(?![\w-])' % re.escape(t), js_text))
        if not dead:
            return ''
        return ('<h3>Named here, used nowhere</h3><p class="wb-note">No built page carries these and no '
                'script mentions them. Candidates for deletion, not a verdict.</p><p class="wb-dead">%s</p>'
                % ' '.join('<code>%s</code>' % esc(t) for t in dead))

    def page_for(sheet):
        """A page stylesheet says which page it is for: the id it wraps its rules in. Failing
        that, the sampled page carrying the most of its classes."""
        wrapper = re.search(r'(?m)^\s*#([A-Za-z][\w-]*)\s*\{', clean_scss(read(os.path.join(REPO, sheet))))
        if wrapper:
            marker = 'id="%s"' % wrapper.group(1)
            for page in pages:
                if marker in page.source:
                    return page
            for path in sorted(glob.glob(os.path.join(SITE, '**', '*.html'), recursive=True)):
                if (SEP + 'redesign-lab' + SEP) not in path and marker in read(path):
                    url = '/' + rel(path)[len('_site/'):]
                    return Page(wrapper.group(1), url[:-len('index.html')] if url.endswith('index.html') else url)
            return None
        best = max(pages, key=lambda page: sum(1 for t in in_sheet[sheet] if page.tokens[t]))
        return best if any(best.tokens[t] for t in in_sheet[sheet]) else None

    nav = collections.OrderedDict([('Components', []), ('Foundations', []), ('Pages', [])])
    panels, count_specimens, summary = [], 0, []
    for sheet in sheets:
        own = [b for b in blocks if owner.get(b) == sheet and any(uses[t] for t in blocks[b])]
        slug, title = slug_of(sheet), title_of(sheet)
        section = ('Components', 'Foundations', 'Pages')[tier(sheet)]
        body = []

        if section == 'Pages':
            best = page_for(sheet)
            if best:
                body.append('<figure class="wb-specimen"><figcaption>The real page, running everything '
                            'it runs for a visitor: <a href="%s" target="_blank">%s</a></figcaption>'
                            '<div class="wb-frame"><iframe data-src="%s" data-page="1" title="%s"></iframe>'
                            '</div></figure>' % (esc(best.url), esc(best.url), esc(best.url), esc(title)))
            else:
                body.append('<p class="wb-note">No sampled page uses anything from this stylesheet.</p>')
            summary.append((sheet, 'page', best.url if best else 'no page found'))
        else:
            seen, shown, extra = set(), [], 0
            for page, node in roots.get(sheet, []):
                signature = node.tag + '.' + '.'.join(node.classes)
                if signature in seen:
                    continue
                seen.add(signature)
                if len(shown) == MAX_SPECIMENS:
                    extra += 1
                    continue
                shown.append((page, node, signature))
            for index, (page, node, signature) in enumerate(shown, 1):
                name = '%s-%d.html' % (slug, index)
                io.open(os.path.join(OUT, name), 'w', encoding='utf-8', newline='').write(
                    specimen_document(page, node, '%s: %s' % (title, signature)))
                count_specimens += 1
                notes = []
                hooks = hooks_in(node)
                if hooks:
                    notes.append('hooks in this markup: ' + ', '.join(hooks[:10]))
                if node.has('hidden'):
                    notes.append('the page keeps this hidden until it is needed; shown here')
                twins = [title_of(s) for s in shared[(page.name, id(node))] if s != sheet]
                if twins:
                    notes.append('the same element is also styled by: ' + ', '.join(twins))
                body.append('<figure class="wb-specimen"><figcaption><code>%s</code> from the %s page'
                            ' <a href="workbench/%s" target="_blank">open alone</a>%s</figcaption>'
                            '<div class="wb-frame"><iframe data-src="workbench/%s" title="%s"></iframe></div>'
                            '</figure>' % (esc(signature), esc(page.name), name,
                                           ''.join('<span>%s</span>' % esc(n) for n in notes),
                                           name, esc(signature)))
            if extra:
                body.append('<p class="wb-note">%d more variant%s on the sampled pages, not shown.</p>'
                            % (extra, '' if extra == 1 else 's'))
            if not shown:
                body.append('<p class="wb-note">%s</p>' % (
                    'Nothing here stands on its own: every class this stylesheet owns is styled '
                    'inside another component.' if own else
                    'No element on any sampled page uses this stylesheet.'))
            summary.append((sheet, len(shown), '; '.join('%s <%s>' % (sig, page.name) for page, _, sig in shown)
                            + (' (+%d more)' % extra if extra else '')))

        panels.append('<section class="wb-panel" id="wb-%s" hidden><header class="wb-head"><h2>%s</h2>'
                      '<p class="wb-src">%s</p></header>%s%s%s</section>'
                      % (slug, esc(title), esc(sheet), ''.join(body), table(sheet, own), unused(sheet)))
        nav[section].append('<li><button class="wb-tab" data-target="wb-%s">%s<span>%d</span></button></li>'
                            % (slug, esc(title), sum(uses[t] for b in own for t in blocks[b])))

    # classes used on the site that no stylesheet owns
    loose = sorted((t for t in uses if base_of(t) not in owner), key=lambda t: -uses[t])
    rows = ''.join('<tr><td><code>%s</code></td><td>%d</td><td>%d of %d</td><td>%s</td></tr>' % (
        esc(t), uses[t], on_pages[t], total_pages,
        'script hook' if t.startswith('js-') else 'Font Awesome' if t.startswith('fa') else
        'syntax highlighter' if t.startswith(('rouge', 'language-', 'highlight')) else '') for t in loose)
    panels.append('<section class="wb-panel" id="wb-unstyled" hidden><header class="wb-head"><h2>No stylesheet</h2>'
                  '<p class="wb-src">classes the built pages carry that no rule of ours starts from</p></header>'
                  '<table class="wb-table"><thead><tr><th>class</th><th>uses</th><th>pages</th><th>kind</th></tr>'
                  '</thead><tbody>%s</tbody></table></section>' % rows)
    nav['Other'] = ['<li><button class="wb-tab" data-target="wb-unstyled">No stylesheet<span>%d</span></button></li>'
                    % len(loose)]

    shell = SHELL % {
        'tabs': len(panels), 'specimens': count_specimens, 'pages': total_pages,
        'when': time.strftime('%Y-%m-%d %H:%M'),
        'skipped': esc(', '.join(sorted({name for page in pages for name in page.skipped}))),
        'nav': ''.join('<h2>%s</h2><ul>%s</ul>' % (name, ''.join(items)) for name, items in nav.items() if items),
        'panels': '\n'.join(panels),
    }
    io.open(os.path.join(LAB, 'workbench.html'), 'w', encoding='utf-8', newline='').write(shell)

    if report:
        for sheet, what, more in summary:
            print('%-48s %s %s' % (sheet, what, more if more else ''))
    if not quiet:
        print('workbench: %d tabs, %d specimens, from %d built pages, in %.1fs'
              % (len(panels), count_specimens, total_pages, time.time() - started))


SHELL = '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Workbench</title>
<link rel="icon" href="data:,">
<link rel="stylesheet" href="workbench.css">
</head>
<body class="wb">
<header class="wb-masthead">
  <div>
    <h1>Workbench</h1>
    <p>%(tabs)d stylesheets, %(specimens)d specimens, read from %(pages)d built pages on %(when)s.
       Each specimen is a real element from a real page, inside its own ancestors, with that
       page's stylesheets and scripts. This never ships: the deploy deletes <code>redesign-lab/</code>.</p>
    <p class="wb-small">Not run inside a specimen: %(skipped)s. The Pages tabs run everything.</p>
  </div>
  <div class="wb-controls">
    <div class="wb-widths" role="group" aria-label="Specimen width">
      <button data-width="" aria-pressed="true">Fit</button>
      <button data-width="1440">1440</button>
      <button data-width="768">768</button>
      <button data-width="390">390</button>
    </div>
    <label class="wb-bare"><input type="checkbox" id="wb-bare"> Bare: take the page away from around it</label>
  </div>
</header>
<div class="wb-layout">
  <nav class="wb-nav" aria-label="Stylesheets">%(nav)s</nav>
  <main class="wb-main">
%(panels)s
  </main>
</div>
<script>
(function () {
  var panels = [].slice.call(document.querySelectorAll('.wb-panel'));
  var tabs = [].slice.call(document.querySelectorAll('.wb-tab'));
  var bare = document.getElementById('wb-bare');
  var main = document.querySelector('.wb-main');

  function address(frame) {
    return frame.dataset.src + (bare.checked && !frame.dataset.page ? '?bare=1' : '');
  }
  function load(panel, again) {
    [].forEach.call(panel.querySelectorAll('iframe'), function (frame) {
      if (again || !frame.dataset.on) { frame.dataset.on = '1'; frame.src = address(frame); }
    });
  }
  /* A tab you have left stops running. Otherwise every specimen you ever opened keeps playing
     its videos and animations behind the one you are looking at. */
  function unload(panel) {
    [].forEach.call(panel.querySelectorAll('iframe'), function (frame) {
      if (frame.dataset.on) { delete frame.dataset.on; frame.src = 'about:blank'; }
    });
  }
  /* Size a specimen to its element once, after it loads. Once, because content sized in
     viewport units would chase the frame's own height for ever. */
  function fit(frame) {
    if (frame.dataset.page) return;
    try {
      var doc = frame.contentDocument;
      var root = doc.querySelector('[data-wb-root]');
      var box = root.getBoundingClientRect();
      var style = doc.defaultView.getComputedStyle(root);
      var unseen = style.visibility === 'hidden' || style.display === 'none' || +style.opacity === 0 ||
        box.width === 0 || box.height === 0;
      frame.style.height = Math.max(110, Math.min(720, box.bottom + doc.defaultView.scrollY + 40)) + 'px';
      frame.closest('.wb-specimen').classList.toggle('is-unseen', unseen);
    } catch (error) { /* a page frame, or not ready */ }
  }
  function show(id) {
    var panel = document.getElementById(id) || panels[0];
    panels.forEach(function (p) { p.hidden = p !== panel; if (p.hidden) unload(p); });
    tabs.forEach(function (t) { t.setAttribute('aria-current', String(t.dataset.target === panel.id)); });
    load(panel, false);
    if (location.hash.slice(1) !== panel.id) history.replaceState(null, '', '#' + panel.id);
    main.scrollTop = 0;
  }

  [].forEach.call(document.querySelectorAll('iframe'), function (frame) {
    frame.addEventListener('load', function () { setTimeout(function () { fit(frame); }, 350); });
  });
  tabs.forEach(function (tab) { tab.addEventListener('click', function () { show(tab.dataset.target); }); });
  window.addEventListener('hashchange', function () { show(location.hash.slice(1)); });

  bare.addEventListener('change', function () {
    panels.forEach(function (panel) { if (!panel.hidden) load(panel, true); });
  });
  [].forEach.call(document.querySelectorAll('.wb-widths button'), function (button) {
    button.addEventListener('click', function () {
      [].forEach.call(document.querySelectorAll('.wb-widths button'), function (b) {
        b.setAttribute('aria-pressed', String(b === button));
      });
      main.style.setProperty('--wb-width', button.dataset.width ? button.dataset.width + 'px' : '100%%');
    });
  });
  show(location.hash.slice(1));
})();
</script>
</body>
</html>
'''

if __name__ == '__main__':
    main()
