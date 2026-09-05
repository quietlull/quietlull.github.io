"""Build redesign-lab/workbench.html - every component the site actually ships.

Run:  python tools/build_workbench.py

WHAT IT DOES. Reads the BUILT pages in _site/, counts class tokens to group blocks by the
stylesheet that defines them (that grouping IS the component list), pulls a real instance of each
component out of the built HTML with a proper parser, and writes a tabbed page that loads the LIVE
stylesheet.

WHY IT IS GENERATED AND NOT HAND-WRITTEN. A hand-made bench is a copy, and copies drift: the lab
has been bitten twice, once by cursor-ratios tuning a lab copy of cursor-glow, once by five lab
pages keeping their own CSS while importing live JS. Regenerating from _site/ means a tab cannot
disagree with the site - if it did, the site changed.

RE-RUN IT AFTER `bundle exec jekyll build`, since it reads _site/, not the source.
"""
import re, os, io, glob, collections, sys, html as htmlmod
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from markup_extract import grab

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SEP = os.sep
PAGES = collections.OrderedDict([
    ('portal',   '_site/index.html'),
    ('landing',  '_site/tech-art/index.html'),
    ('projects', '_site/tech-art/projects/index.html'),
    ('post',     '_site/tech-art/posts/ComputeGrass/index.html'),
    ('about',    '_site/tech-art/about/index.html'),
    ('blog',     '_site/ramblings/index.html'),
    ('archives', '_site/archives/index.html'),
])
BEHAVIOURS = {
    'js-magnetic': 'cursor magnetism', 'js-magnetic-inner': 'magnet (inner text)',
    'parallax-z-layer': 'hover depth', 'card-tilt': '3D tilt', 'card-flipper': 'dwell flip',
    'line-boil-text': 'line boil', 'reveal': 'scroll reveal',
}

src = {}
for name, p in PAGES.items():
    src[name] = io.open(os.path.join(REPO, p.replace('/', SEP)), encoding='utf-8', errors='ignore').read()


def tokens(s):
    s = re.sub(r'<script.*?</script>', '', s, flags=re.S)
    s = re.sub(r'<style.*?</style>', '', s, flags=re.S)
    s = re.sub(r'<!--.*?-->', '', s, flags=re.S)
    t = collections.Counter()
    for m in re.finditer(r'class="([^"]*)"', s):
        for tok in m.group(1).split():
            if '{' not in tok and '}' not in tok:
                t[tok] += 1
    return t


per = {n: tokens(s) for n, s in src.items()}
uses, pages, variants = collections.Counter(), collections.defaultdict(set), collections.defaultdict(set)
for name, toks in per.items():
    for tok, n in toks.items():
        b = re.split(r'__|--', tok)[0]
        uses[b] += n
        pages[b].add(name)
        variants[b].add(tok)

sheets = {}
for f in glob.glob(os.path.join(REPO, '_sass', '**', '*.scss'), recursive=True):
    sheets[os.path.relpath(f, REPO).replace(SEP, '/')] = io.open(f, encoding='utf-8', errors='ignore').read()

defined_in = {}
for b in uses:
    hits = []
    for t in sorted(variants[b]):
        pat = re.compile(r'\.' + re.escape(t) + r'(?![\w-])')
        for path, s in sheets.items():
            if pat.search(s) and path not in hits:
                hits.append(path)
    hits.sort(key=lambda p: (0 if '/components/' in p else 1 if '/pages/' in p else 2, p))
    defined_in[b] = hits

groups = collections.defaultdict(list)
for b in uses:
    groups[defined_in[b][0] if defined_in[b] else '(no stylesheet)'].append(b)


def title_of(sheet):
    if sheet == '(no stylesheet)':
        return 'Unstyled blocks'
    n = os.path.basename(sheet)
    n = re.sub(r'^_|\.scss$', '', n)
    return n.replace('-', ' ').replace('_', ' ').strip().capitalize()


# ---- build one panel per component -------------------------------------------------------------
panels, nav = [], []
# COMPONENTS FIRST, then page stylesheets, then the base/foundation ones. Sorting purely by use
# count landed the first tab on base/_decisions.scss, whose "specimen" is a 10x18px syntax token -
# true, and useless as the thing you see first.
def tier(k):
    if '/components/' in k: return 0
    if '/pages/' in k: return 1
    return 2

order = sorted([k for k in groups if k != '(no stylesheet)'],
               key=lambda k: (tier(k), -sum(uses[b] for b in groups[k]), k))
order.append('(no stylesheet)')

for i, sheet in enumerate(order):
    blocks = sorted(groups[sheet], key=lambda b: -uses[b])
    slug = re.sub(r'[^a-z0-9]+', '-', title_of(sheet).lower()).strip('-') or ('group-%d' % i)
    # PICK THE COMPONENT ROOT, NOT THE MOST-USED BLOCK. Sorting by uses picked parallax-z-layer for
    # the card group and grabbed a bare .card-cover: 0px wide, out of its card, meaningless. The
    # outermost element is the one that CONTAINS the others, so the largest extraction is the root.
    specimen, from_page, from_block = None, None, None
    for b in blocks:
        for pg in sorted(pages[b]):
            got = grab(src[pg], b)
            if got and (specimen is None or len(got) > len(specimen)):
                specimen, from_page, from_block = got, pg, b

    behav = sorted({BEHAVIOURS[t] for b in blocks for t in variants[b] if t in BEHAVIOURS})
    total = sum(uses[b] for b in blocks)
    allpages = sorted({p for b in blocks for p in pages[b]})

    rows = ''.join(
        '<tr><td><code>%s</code></td><td>%d</td><td>%d</td><td>%s</td></tr>'
        % (b, len(pages[b]), uses[b], ', '.join(sorted(pages[b])))
        for b in blocks)

    # A component is its MARKUP. Scripts captured inside a specimen belong to the page, not the
    # component, and one of them is giscus bootstrapping a live comment thread - which would mount
    # a real thread inside the workbench and throw ReferenceError: Theme is not defined.
    if specimen:
        specimen = re.sub(r"<script.*?</script>", "", specimen, flags=re.S)

    body = specimen if specimen else (
        '<p class="wb-none">No renderable instance found on the sampled pages. '
        'It may be state-dependent (a hover, an error, an empty list) or created by JavaScript.</p>')

    panels.append('''<section class="wb-panel" id="wb-%s">
  <header class="wb-head">
    <h2>%s</h2>
    <p class="wb-src">%s</p>
    <ul class="wb-facts">
      <li><b>%d</b> block%s</li>
      <li><b>%d</b> uses</li>
      <li>on <b>%d</b> page type%s: %s</li>
      <li>behaviours: %s</li>
    </ul>
  </header>
  <div class="wb-stage-label">rendered from the built site%s</div>
  <div class="wb-stage">%s</div>
  <table class="wb-table"><thead><tr><th>block</th><th>pages</th><th>uses</th><th>used on</th></tr></thead>
  <tbody>%s</tbody></table>
</section>''' % (
        slug, htmlmod.escape(title_of(sheet)),
        htmlmod.escape(sheet),
        len(blocks), '' if len(blocks) == 1 else 's',
        total, len(allpages), '' if len(allpages) == 1 else 's', ', '.join(allpages),
        ', '.join(behav) if behav else 'none declared',
        (' &mdash; <code>%s</code> from the %s page' % (from_block, from_page)) if specimen else '',
        body, rows))

    nav.append('<li><button class="wb-tab" data-target="wb-%s">%s <span>%d</span></button></li>'
               % (slug, htmlmod.escape(title_of(sheet)), total))

page = '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Workbench &middot; every component the site actually ships</title>

<!-- THE LIVE STYLESHEET. Not a copy. This is the whole point: a tab cannot drift from what
     ships, because it IS what ships. The lab has been bitten twice by copies - cursor-ratios
     was tuning a lab copy of cursor-glow, and five lab pages kept their own CSS while importing
     live JS. -->
<link rel="stylesheet" href="/assets/css/jekyll-theme-chirpy.css">
<link rel="stylesheet" href="/redesign-lab/workbench.css">
</head>
<body class="wb-body" data-scene-tier="none">

<div class="cursorglow" aria-hidden="true"></div>

<header class="wb-masthead">
  <h1>Workbench</h1>
  <p>Every component the site actually ships, pulled out of the built pages and rendered against
     the live stylesheet. <b>%d components</b>, <b>%d blocks</b>, sampled across
     <b>%d page types</b>.</p>
  <p class="wb-warn">This page never ships: the deploy workflow deletes <code>redesign-lab/</code>
     before upload.</p>
</header>

<div class="wb-layout">
  <nav class="wb-nav" aria-label="Components"><ul>%s</ul></nav>
  <main class="wb-main">%s</main>
</div>

<script type="module" src="/assets/js/chrome.js"></script>
<script>
  /* tabs, and nothing else - the components' own behaviour comes from the live modules */
  const panels = [...document.querySelectorAll('.wb-panel')];
  const tabs = [...document.querySelectorAll('.wb-tab')];
  function show(id) {
    panels.forEach((p) => { p.hidden = p.id !== id; });
    tabs.forEach((t) => t.setAttribute('aria-current', String(t.dataset.target === id)));
    history.replaceState(null, '', '#' + id);
  }
  tabs.forEach((t) => t.addEventListener('click', () => show(t.dataset.target)));
  show((location.hash || '').slice(1) || panels[0].id);
</script>
</body>
</html>
''' % (len(order), len(uses), len(PAGES), '\n'.join(nav), '\n'.join(panels))

io.open(os.path.join(REPO, 'redesign-lab', 'workbench.html'), 'w', encoding='utf-8', newline='').write(page)
found = sum(1 for p in panels if 'wb-none' not in p)
print('workbench.html written')
print('  components (tabs):', len(order))
print('  blocks covered   :', len(uses))
print('  tabs with a rendered specimen:', found, '/', len(order))
for i, sheet in enumerate(order):
    if 'wb-none' in panels[i]:
        print('    NO SPECIMEN:', sheet)
