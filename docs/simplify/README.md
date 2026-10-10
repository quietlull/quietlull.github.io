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

## Result (finished 2026-10-10)

All five areas ran, plus a five-commit sweep of one-line leftovers that fell between areas: 108
simplification commits on `main`, with 8 report commits and 5 tool commits beside them. None pushed.

| Area | Report | File lines before | after | fewer |
|---|---|---|---|---|
| Templates (`_layouts`, `_includes`) | [templates.md](templates.md) | 2,233 | 2,071 | 162 |
| Bundled scripts (`_javascript`) | [js-bundled.md](js-bundled.md) | 4,161 | 3,542 | 619 |
| Scripts served as written (`assets/js`) | [js-raw.md](js-raw.md) | 1,639 | 1,355 | 284 |
| Component and page styles | [scss-components-pages.md](scss-components-pages.md) | 4,203 | 3,314 | 889 |
| Foundation styles | [scss-foundation.md](scss-foundation.md) | 3,009 | 1,884 | 1,125 |

- **Lines of code** (blank lines not counted, same counter as the P541 answer): 12,972 before the
  pass, **10,250** after. 2,722 fewer, 21%. For scale, the old site the day before the redesign
  merged was 13,207.
- **Source files deleted:** sixteen. Four templates, six scripts, six stylesheets.
- **The stylesheet a visitor downloads:** 121,474 bytes to 95,555 (21% smaller), 993 rules to 772.
- **Scripts:** `commons`, `home`, `misc` and `page` bundles are now the same 18,547 bytes; `post` is
  23,374.

**How "nothing a visitor can see or feel changed" was checked.** Each agent proved its own work
(its report says how). Then the coordinator re-ran the checks independently after every agent,
against captures taken before that agent started:

- `npm test` passes.
- `tools/page-fingerprint.mjs --styles`: on ten pages at two widths, all 4,541 elements have the
  same position, size and computed style (their `::before` and `::after` included) as before the
  two style agents ran.
- `tools/behaviour-check.mjs`: tilt, flip, drift, magnets, line boil, search, the achievement
  wall and the portal windows, driven with a real mouse and keyboard, give a byte-identical
  result to the run from before the script agents, in normal and in reduced motion.
- `tools/check-workbench.mjs`: 51 specimens, 0 problems, throughout.
- Compiled stylesheet, rule by rule: 244 rules removed, 0 added that are new (one selector list
  lost two dead parts), 3 changed, and those three differ only by custom properties nothing reads.

**What those checks do not cover:** hover and focus colours (reasoned per deleted rule in the two
style reports, not measured), the 46 pages outside the ten sampled (the style agents counted
matching elements on all 56, but the computed-style comparison is the ten), touch input, and
anything that only runs in production (analytics, the service worker).

**Three tools came out of it**, all in `tools/`: `behaviour-check.mjs` (written by the js-raw agent,
kept), `page-fingerprint.mjs --styles`, and a no-comments check that also reads stylesheet text
(the parser it used could not see a comment inside a Sass map, which is how three survived P542).

## Waiting on Rod

Nothing below was applied. Each is a decision, and several would change what a visitor sees.

**Broken today, found by the pass. Fixing any of them is visible.**

1. **The glass shadow does not render.** `--glass-shadow` in `_sass/themes/_dark.scss` has two
   `//` notes inside its value ("Deep shadow", "Ambient glow"). Sass ships them, the value is
   invalid, and every `box-shadow: var(--glass-shadow)` computes to `none`. Measured on the post's
   previous/next cards. Deleting the two notes makes the shadow appear. This predates the pass.
2. **The page transition never runs.** `page-transition.js` needs `#main-wrapper`, which no page
   has. No fade, no sparkler burst on navigation. Its styles were dead and are now gone, so the
   script is the only piece left. Fix (a visible change on every page) or delete.
3. **Image zoom is off.** `img-popup.js` needs a `.popup` wrapper that is no longer built. Kept for
   your call: the script, six GLightbox rules in `_post.scss`, `.popup` and `.img-link` in
   `_sass/base`. Without it the "Zoom Enhance" achievement cannot unlock.
4. **Twelve achievements cannot be earned:** Toolsmith, Fan Club, Zoom Enhance, Deep Diver,
   Scholar, Bookworm, Well-Rounded, Connoisseur, Completionist and three that depend on them. Their
   triggers look for markup that is gone (`.tool-icon`, `#avatar`, `.post-content-container`).
5. **The post sparks and fireflies** still do not run (`@keyframes firefly-drift` does not exist).
6. **The cursor sparkler picks its colour from old class names.** `mouse-trail.js` lists `.card`,
   `.tool-icon`, `.post-tag` and others that no longer exist; only links and buttons match.
7. The twelve visitor-visible issues already in `docs/WORKBENCH-CHECK.md` section 1.
8. Inference, not measured: the portal's `pagehide` handler may leave the windows frozen after
   the browser's back button restores the page.

**Deleted, say if you want any back** (each is one `git revert` or `git show` away):

9. Three console helpers: `window.__sceneTier`, `window.__portalWindows`, `window.__fireworkReach`.
   Nothing on the site read them. If you used them by hand in the browser console, they matter.
10. Styles for hand-written post HTML that no post uses: `.fig*`, `.figmat`, `.figcap`,
    `.reference-links`, and the old `.bio*` block.
11. Fifteen rules in `_decisions.scss` for `.d-*` classes and `body.spacious` that only lab pages
    used.

**Still in the code, yours to cut or keep:**

12. **Merge the four identical bundles** (`commons`, `home`, `misc`, `page`) into one. A template
    change in `_includes/js-selector.html` plus three Rollup entries.
13. Switches that are off or have one value: mermaid, the lqip image option, the lantern debug view
    (the D key), `social_preview_image`, `site.cdn`, `theme_mode`, `pwa.enabled`, `toc`,
    `comments.provider`, `pageviews.provider`, `skills=page.skills`, and the Chirpy image options in
    `refactor-content.html` (about 36 lines).
14. Scene leftovers: unused methods on the lantern, firework and water classes; groups A, B and D
    of `redesign-lab/perf-diffs/05-dead-code-batch.md`; `CONFIG.water.waves.waveSpeed`, which
    nothing reads because the scene passes a literal `1.5`.
15. Achievement data nothing reads: `hasProgress` and `reward` on all 29.
16. Styles kept on purpose: washi tape (17 rules), 8 `.tok-*` rules, embed styles (about 45
    lines), and 118 rules for content no post uses yet (nested lists, `h4`, footnotes, `kbd`,
    callout prompts, math). The last group should stay unless you never want that content.
17. Dead parts inside live selector lists, 43 rules across the two style reports. One-line edits
    each, left because editing a list rewrites a surviving rule.
18. The `@layer reset, tokens, prose, components, overrides;` line repeated at the top of about 25
    stylesheets. Only the first one in the output sets the order.
19. Short-name tokens in `_foundations.scss` that nothing reads: `--glow`, `--glow-soft`, `--gold`,
    `--gold-deep`, `--panel`, `--pink`, `--muted`, `--head-scale`, `--space-scale`, `--measure`. Also
    `--color-white` and `--color-black` defined twice with the same value, and `--z-overlay`
    defined as 200 and 500 (200 is the one in effect).
20. Guards in `portal-windows.js` that only the lab workbench needs.
21. About 42 comment lines inside the shader code in `_javascript/shader/` and
    `firework-controller.js`. They are text inside a script string, so the no-comments check
    cannot see them, and they ship in the scene bundle.
22. Config and data nothing reads: the `assets:` block and the `tabs` default `layout: page` in
    `_config.yml` (that layout no longer exists), `_data/origin/basic.yml`, entries in
    `_data/origin/cors.yml` and `_data/locales/en.yml`. Listed in `templates.md` and `js-bundled.md`.

---

Everything below is the contract the agents worked to, kept as the record.

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
