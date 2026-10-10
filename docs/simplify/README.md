# The simplification pass (P543)

Rod, 2026-10-09: *"please do a multi agent simplification pass as well."* Asked for straight after
he learned the refactor had not made the code base smaller: code lines were flat at about 13,000.

Several agents each take one area of the source and make it smaller and simpler **without
changing what the site does**. Rod will then read every remaining line by hand. The best outcome
for him is less to read, and nothing he has to re-test.

**They run one at a time, in the main checkout**, in this order: templates, bundled scripts,
scripts served as written, component and page styles, foundation styles. Outside in, so each can
remove what the one before left unused. The first plan was a worktree each, running together; a
copy of this repo is 1.4 GB and the drive had 1 GB free, so all five failed to start.

Each agent writes its report next to this file: `docs/simplify/<area>.md`.

## What counts as simplifying

- **Delete code that is measured dead.** A file nothing loads, an export nothing imports, a rule
  whose selector matches no element on any built page and is named by no script, a branch whose
  condition can never be true, a path that only the lab bench used.
- **Shorten what remains, keeping it equivalent.** Collapse a helper used once into its caller
  when that reads better. Remove a guard for a state that cannot happen. Replace a roundabout
  expression with the direct one. Remove duplication.
- **Prefer deleting to rewriting.** A deletion is easy for Rod to review. A rewrite is not.

## What is not allowed

- **No renames.** Not a class, id, data attribute, CSS custom property, function, export or file.
  The naming pass is Rod's, during his audit.
- **No comments.** `npm test` fails if one appears. If code needs explaining, say it in your report.
- **No new features, options, abstractions or helpers "for later".**
- **Nothing a visitor can see or feel may change.** Not a pixel, not a timing, not a behaviour.
- **Stay inside your own file list.** If something outside it should change, put it in your report.
- **Never touch:** `assets/css/chrome-scene.css`, `assets/js/effects/hana-bloom.js` (another session
  has them open), `_layouts/compress.html` (vendored), anything under `redesign-lab/`, `docs/` other
  than your own report, `tools/`.
- **Do not push.** Commit on `main`, your own files only.

The lab (`redesign-lab/`) never ships. If only the lab uses something, it is dead for the site and
may be cut; say so in the report so Rod knows a lab page lost it.

## Leave these alone: each is waiting on a decision from Rod

Some of this code is broken or looks dead. It is still not yours to delete, because Rod may want
it fixed instead. Report what you see and move on.

- **The post page's section sparks and fireflies** (`_javascript/modules/components/post-enhance.js`
  and their styles in `_sass/pages/_post.scss`). They never run: the script looks for
  `.post-content-container`, which no page has, and `@keyframes firefly-drift` does not exist. Rod
  asked for the sparks on 2026-09-03.
- **The post "Back to all projects" button** and its shimmer: `.btn.btn-outline-primary` in
  `_sass/base/_base.scss`, the shimmer mixin, the markup in `_includes/post-nav.html` (P535).
- **Font Awesome**: every `fa-*` class and its `<i>` markup (P524).
- **The washi tape** (`_sass/components/_washi-tape.scss`): unfinished on purpose.
- **The kit button's text magnet** (P536) and **the portal's `.pwin` rule** in
  `_sass/pages/_portal.scss` (P530).
- **Still social icons on posts** (`.dm-row` in `_layouts/post.html`): Rod's own call (P329).
- **Anything inside `{% if jekyll.environment == 'production' %}`**, the service worker
  (`_javascript/pwa/`) and analytics: a local build cannot show whether they still work.
- **The twelve visitor-visible issues** in `docs/WORKBENCH-CHECK.md` section 1. Do not fix them
  here; a fix changes what visitors see.

## Before you start

You are working in the real checkout, on `main`, and you are not the only one who uses it.

- **Other people's work is in this tree.** `git status` shows files you did not touch: posts under
  `_posts/`, `assets/css/chrome-scene.css`, `assets/js/effects/hana-bloom.js`, `.obsidian/`,
  `docs/POST-FRAMES-FINDINGS.md`. Never edit, stage, revert or stash them.
- **Stage by explicit path.** Never `git add -A`, `git add .`, `git commit -a`, `git stash`,
  `git checkout -- .`, `git restore .` or `git reset --hard`. To undo your own edit to one file,
  `git checkout -- path/to/that/file`.
- **The drive is nearly full** (between 0.5 and 3 GB free, and it moves). Do not copy the repo or
  `_site`. Keep your scratch folder to a few megabytes. Run one browser check at a time. If a
  command fails with "No space left on device", stop and report it; do not retry in a loop.
- **No servers.** Do not run `jekyll serve` or anything else that listens on a port or watches
  files. The checks serve `_site` themselves, and a second process rebuilding `_site` under you
  would corrupt your comparisons.

Bring everything up to date first, from the repo root, in the Bash tool:

```bash
npm run build
bundle exec jekyll build
python tools/build_workbench.py --quiet
python tools/build_audit.py --quiet
```

Then record the starting point, in a scratch folder of your own (not in the repo):

```bash
cp _site/assets/css/jekyll-theme-chirpy.css "$SCRATCH/before.css"
node tools/page-fingerprint.mjs capture "$SCRATCH/before.json"
node tools/check-workbench.mjs > "$SCRATCH/workbench-before.txt"
ls -la assets/js/dist/*.min.js > "$SCRATCH/bundles-before.txt"
node tools/behaviour-check.mjs "$SCRATCH/behaviour-before.json"
node tools/behaviour-check.mjs "$SCRATCH/behaviour-before-2.json"
node tools/behaviour-check.mjs "$SCRATCH/behaviour-reduced-before.json" reduced
cmp "$SCRATCH/behaviour-before.json" "$SCRATCH/behaviour-before-2.json"
```

The two behaviour files must be equal before you change anything. If they are not, the difference
is noise in the check: report it and do not use that value as evidence.

## Proving a change is safe

After each batch of edits:

```bash
npm test
npm run build                      # only if you changed _javascript/
bundle exec jekyll build && python tools/build_workbench.py --quiet
node tools/css-rule-diff.mjs "$SCRATCH/before.css" _site/assets/css/jekyll-theme-chirpy.css
node tools/page-fingerprint.mjs capture "$SCRATCH/after.json"
node tools/page-fingerprint.mjs compare "$SCRATCH/before.json" "$SCRATCH/after.json"
node tools/check-workbench.mjs > "$SCRATCH/workbench-after.txt"
node tools/behaviour-check.mjs "$SCRATCH/behaviour-after.json"
cmp "$SCRATCH/behaviour-before.json" "$SCRATCH/behaviour-after.json"
```

- `npm test` must pass.
- `css-rule-diff` must list only rules you meant to remove. Nothing added, nothing changed.
- `page-fingerprint compare` must say `identical`. It records the position and size of every
  element on ten pages at two widths. If you removed class names from markup on purpose, add
  `--ignore-classes`. Any other difference means you changed the layout: undo it.
- The workbench output must match the starting one: same sizes, 0 problems.
- **For anything that moves or reacts** (tilt, magnets, drift, line boil, flips, filters, the
  achievement wall, portal windows): the fingerprint does not see behaviour.
  `tools/behaviour-check.mjs` does. It drives all of those with a real mouse and keyboard and its
  output must be byte for byte the same before and after (`cmp` prints nothing). Its header lists
  what it covers. For anything it does not cover, drive it yourself with `tools/real-browser.mjs`
  and report the measurement before and after. Never use an in-page `dispatchEvent`: it proves a
  handler is attached and nothing else.
- **A style rule can be dead on every page at rest and alive for one second.** A class a script
  adds on hover, press, drag or scroll (`is-flipped`, `is-on`, `dm-flash`, `is-dragging`,
  `is-closed`, `can-reset`, `motion-off`, anything a script writes) matches no element in the
  built HTML. Search the scripts for the name before calling its rule dead.
- **If you change a stylesheet, capture with `--styles`**, before and after:
  `node tools/page-fingerprint.mjs capture "$SCRATCH/before-styles.json" --styles`. Without it the
  fingerprint checks position and size only, and a rule that only changed a colour would pass. With
  it, every element's full computed style (and its `::before` and `::after`) is part of the
  comparison. It reads elements at rest: it does not hover, focus or press anything, so a rule for
  `:hover`, `:focus`, `:active` or a class a script adds is yours to reason about.

## Evidence for "dead"

Before deleting, search all of these and quote what you found in your report:

- `_site/` (the built pages, minus `_site/redesign-lab/`) for the class, id or file name
- `assets/js/`, `_javascript/`, `_includes/`, `_layouts/` for a script or template that names it
- `redesign-lab/` to learn whether a lab page uses it (allowed to break; must be reported)

Starting points, all generated from the current code:

- `_site/redesign-lab/todo.html` and `_site/redesign-lab/audit/*.html`: per file, what loads it,
  what it imports and exports, and which class names it shares with which other files.
- `_site/redesign-lab/workbench.html`: per stylesheet, a "Named here, used nowhere" list.
- `docs/WORKBENCH-CHECK.md` section 2: dead code already found by hand.

These lists are leads. A class built by JavaScript at runtime, or present only in a post's own
HTML, will not show up where you expect. Check before you cut.

## Commits and report

- Small commits, one kind of change each. The message says what went and what proved it safe.
- End with a `Co-Authored-By` line naming the model you actually are, for example
  `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`. The templates agent was told to
  write Opus and was Sonnet; its 20 commits carry the wrong name.
- Write `docs/simplify/<area>.md` and commit it:
  - lines of code before and after, per file you touched
  - every deletion, with the evidence that it was dead
  - every simplification, with why it is equivalent
  - what you looked at and decided not to change, and why
  - anything that needs Rod's decision, or belongs to another area
