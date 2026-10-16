# The brief for a file-by-file audit agent (P553)

Rod, 2026-10-11: *"continue going though files that need clear rewrites when its unclear mark it as
so and i will check it when i wake up."*

Paste everything below the line to an agent, after filling in the two marked places. Run one agent
at a time, in the main checkout. The first attempt (2026-10-12) hit the weekly usage limit at its
first step, so check the usage window before starting.

**The four runs, in order:**

1. `assets/js/` (not `effects/hana-bloom.js`, `dist/`, `lib/`, `data/`) and the inline scripts in
   `_includes/*-scripts.html` and `_layouts/under-construction.html`. Order: `site-wide.js`,
   `behaviours/*`, `components/*`, `effects/*`, then the inline scripts.
2. `_javascript/modules/**` and the small entry files beside them (`commons.js`, `home.js`,
   `misc.js`, `page.js`, `post.js`, `theme.js`). Not `listening-test.js`, `modules/audio/` or
   `modules/utils/pairwise-test.js`: another session owns the switch test. `pwa/` only runs on the
   live site: notes only.
3. The 3D scene: `_javascript/*-controller.js`, `three-*.js`, `shader/*`. **Notes only, no
   rewrites.** Nothing here can be verified without Rod's eyes, and the scene's performance work
   is closed (do not reopen it).
4. The plain 1px edges in `_sass/components/` and `_sass/pages/` that could use the `border`
   class. Rod: `border` "should pretty much reach everything but only if it makes sense as a
   component thats meant to be shared across things". Also the tags (`.kit-tag`) onto
   `border-break`: their pressed state shares the hover rule and their edge is an outline, not a
   border, so expect that one to be UNCLEAR.

---

You are working on a Jekyll portfolio site at `C:\Users\Rod\Documents\ProjectFiles\Website`
(Windows; use the Bash tool, which is Git Bash). The owner, Rod, reads every line of this code by
hand, questions every field and line that is not needed, and wants short plain writing. Your job:
go through your files one by one, write each a review note, make the rewrites that are CLEAR, and
mark what is UNCLEAR for him to decide.

Your files: **[FILL IN: the run's file list from above]**

## Read these first, fully

1. `docs/REVIEW-WHEN-AWAKE.md`: the list Rod reads, and the definition of a CLEAR rewrite.
2. `docs/behaviours/README.md`: the architecture (one behaviour, one file, one class; the
   component's stylesheet decides) and "Proving a change". How something LOOKS is checked by Rod,
   never by pictures. No screenshots, no pixel comparisons.
3. `docs/CODE-AUDIT.md`: its top section is the exact shape and style of a review note. Then the
   notes already written.
4. `docs/behaviours/border.md` and `docs/behaviours/achievement-wall.md`, skim: how earlier jobs
   were proved and reported.
5. `docs/simplify/README.md`, only the section "Before you start".
6. The header comments of `tools/behaviour-check.mjs`, `tools/page-fingerprint.mjs`,
   `tools/check-workbench.mjs`, `tools/real-browser.mjs`.
7. `git log --oneline -30`.

## For each file, three things

**1. Write or refresh its note in `docs/CODE-AUDIT.md`.** One `## path` section, in the shape that
file's top section defines. If a note exists, check every sentence against the code as it is now.

**2. Make the CLEAR rewrites.** All of these must hold:

- it is one of: deleting code measured dead; removing a guard, field or option that measurement
  shows can never matter; moving an effect onto a behaviour or class that already exists;
  replacing a hand-written copy of something `_sass/components/_behaviours.scss` provides;
  renaming a LOCAL variable that is an abbreviation;
- nothing a visitor can see or feel changes, and the checks prove it;
- it needs no decision about design, about the name of anything public (class, id, file, export,
  attribute, CSS custom property), or about behaviour.

Each rewrite is its own small commit, proved before the next.

**3. Mark what is UNCLEAR.** Leave the code alone and write the question. Always unclear: a public
name that is an abbreviation or jargon; anything a visitor could notice, however slight; a feature
that is broken or half-built; anything that cannot be verified here (a phone, Edge, code that only
runs on the live site); a choice between two reasonable designs.

Already decided by Rod, do not reopen: the names `drift`, `magnet`, `tilt`, `dwell`,
`track-mouse`, `hover-play-video`, `border`, `border-glow`, `border-break`, `orb-fill`,
`site-wide`, `project-card`; that behaviours start from `site-wide.js` on every page; that tuning
numbers live in the component's stylesheet.

## The list

After each file, append a row to `docs/REVIEW-WHEN-AWAKE.md` under "## The list" and commit it
with the file's note:

```
### `path/to/file`

**REWRITTEN** (or **NOTE ONLY**, or **UNCLEAR**; a file can be both REWRITTEN and UNCLEAR)

- What changed, one line each, with the commit hash. How it was measured.
- Where to look, if anything visible is nearby: the page address and what to do.
- **Unclear:** the question, in one or two sentences, with what each answer would mean.
```

## Proof for every rewrite

- Baseline before the first edit: build everything, then `node tools/behaviour-check.mjs` twice
  in normal motion (equal) and once `reduced`; `node tools/page-fingerprint.mjs capture <file>
  --styles` twice (equal); `node tools/check-workbench.mjs`.
- If a check reads something the change will move, change the check first so it sees both, show
  its output identical on the old code, commit that alone.
- After each rewrite: rebuild, the behaviour check in both modes byte-identical, the comparison of
  every element's position and style identical (`--ignore-classes` if class names changed), the
  lab-page component check at 0 problems, `npm test` passing.
- "Dead" needs evidence: search `_site/` (not `_site/redesign-lab/`), `assets/js/`,
  `_javascript/`, `_includes/`, `_layouts/`, `_plugins/`, `assets/404.html`.
- After each commit, `git show --stat HEAD`.
- If a check fails and the cause is not found in a few minutes, undo that one change, mark the
  file UNCLEAR with what happened, and move on. Never leave the tree failing `npm test`.

## Rules for this machine

- **[FILL IN: is `jekyll serve` running?]** If it is, do not build: it rebuilds `_site` within
  about 15 seconds of a change; wait for `_site` to show the change plus 12 seconds, and build
  yourself only once `http://localhost:4000/` stops answering. If it is not, build yourself with
  `bundle exec jekyll build && python tools/build_workbench.py --quiet`. Never start a server.
- Real checkout, on `main`. Stage by explicit path only. Never `git add -A`, `git add .`,
  `git commit -a`, `git stash`, `git reset --hard`. Another session may have uncommitted work in
  the tree; never touch a file you did not change.
- Change only your own files, a stylesheet when a clear rewrite of one of your scripts needs it,
  `docs/CODE-AUDIT.md`, `docs/REVIEW-WHEN-AWAKE.md`, and `tools/behaviour-check.mjs` (plus the
  `classes:` strings in `tools/css-order-check.mjs`). Not `redesign-lab/`, not the other docs.
- Disk space is tight. Never copy the repo or `_site`. Scratch stays under a few megabytes, in the
  session scratch folder. One browser at a time; every script that calls `launch()` closes it in
  a `finally`.
- Bash heredocs mangle backslashes: write any script with backslashes or regular expressions with
  the Write tool, then run it. Python prints in cp932: start scripts with
  `sys.stdout.reconfigure(encoding='utf-8')` and open files with `newline=''`. Git Bash rewrites
  an argument that starts with `/` into a Windows path.
- No comments in any source file. No em dashes in anything you write. Plain full-word names.
- Do not push. End each commit message with the model you actually are.
- Be conservative. When in doubt it is UNCLEAR.

## When you finish

Report per file one line (REWRITTEN / NOTE ONLY / UNCLEAR and the gist), the commits, the state
of the checks, anything that went wrong, and how many UNCLEAR questions the list holds. If you are
running low on room, stop at a file boundary with the tree clean and say which file is next.
