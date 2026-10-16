# Starting from a cloud session

A cloud session has the repo and nothing else. It has no memory of earlier conversations, no
desktop preview, and none of the notes Claude keeps on Rod's desktop. This page fills that gap.

## Read, in this order

1. `CLAUDE.md` (loaded for you) and `docs/STATUS.md`, top entry: what is true now.
2. `docs/memory/MEMORY.md`: the index of everything learned about this project and about how Rod
   wants to be worked with. **Treat it as your memory.** Each line points at a file beside it.
   It is a copy taken from the desktop on the date in `docs/memory/README.md`, so check a claim
   against the code before relying on it.
3. `docs/REQUESTS.md`, the OPEN table: what Rod has asked for and where each stands.
4. `docs/behaviours/README.md` before touching any effect. `docs/CODE-AUDIT.md` before writing a
   note about a file.

## The rules that matter most

They are all in `docs/memory/`. These are the ones a new session breaks first.

- **Rod is the eyes.** Never check how something looks with a screenshot or by comparing pictures.
  Make the change, then give him a short list: the page, what to do, what he should see.
- **Show the proposed code in chat and get his go before building.** He questions every field
  and every line that is not needed.
- **Plain words, short sentences, related facts together.** No jargon, no abbreviations in names,
  no nicknames for tools. Say what a check does.
- **No comments in source files.** `npm test` fails on one. Explain in `docs/CODE-AUDIT.md`.
- **Small commits, one idea each.** Stage by explicit path. Check `git show --stat HEAD` after.
- **Queue every request in `docs/REQUESTS.md`** when it arrives.
- **No em dashes** in anything written. Do not tidy his own wording.
- **Never schedule a timed wake-up.** Keep working, or stop with the open questions listed.

## What is different from the desktop

- **Rod cannot see your localhost.** He sees a change when it is on the live site, or when he pulls
  and runs it himself. So describe what changed and what to look at.
- **A push to `main` publishes the site.** `.github/workflows/pages-deploy.yml` builds and deploys
  on every push. Ask before pushing, unless he has told you to.
- **`redesign-lab/` never ships.** The workflow deletes it from the built site. The lab's
  component page and the per-file review pages exist only in a local build.
- **Other sessions work in this repo**, on the desktop and in the cloud. Pull before you start.
  Never touch, stage or revert a file you did not change.
- **The network may block outside sites.** The comments on a post load from giscus.app, so
  `tools/behaviour-check.mjs` records `commentsFrameLoaded: false` when that is blocked. Only
  compare two runs taken in the same place.

## Setting up

```bash
bundle install
npm install
npm run build
bundle exec jekyll build
```

- `npm run build` must come before the Jekyll build. `assets/js/dist/` is not in git.
- Ruby 3.3 or newer (the deploy uses 3.3). Node 22 or newer: the tools need it.
- `npm test` runs the linters, the stylesheet load-order check and the no-comments check.

The lab pages need Python 3:

```bash
python3 tools/build_workbench.py --quiet
python3 tools/build_audit.py --quiet
```

They were written on Windows and have not been run on Linux. `jekyll serve` runs them after each
build through `_plugins/lab-pages-hook.rb`; set `PYTHON=python3` if `python` is not a command.

## Running the checks

They drive a real browser. Off Windows the tool looks for `chromium` on the PATH.

```bash
CHROME_PATH="$(which chromium || which google-chrome)" CHROME_FLAGS="--no-sandbox" \
  node tools/behaviour-check.mjs before.json
```

- `CHROME_FLAGS="--no-sandbox"` is needed when the session runs as root, which most cloud
  containers do.
- `tools/behaviour-check.mjs`: tilt, flip, drift, magnets, search, the achievement tiles, the
  portal, driven with a real mouse and keyboard. Byte-identical output for unchanged code.
- `tools/page-fingerprint.mjs capture <file> --styles`: every element's position and computed
  style on ten pages at two widths. `compare` lists what differs.
- `tools/check-workbench.mjs`: opens every component on the lab page and reports script errors.
- Capture before the change, twice, and compare the two. If they differ, the check is noisy
  there and proves nothing.

## Keeping the notes in step

`docs/memory/` is a copy. The desktop keeps the original and keeps adding to it.

- **In a cloud session, when Rod teaches you something lasting:** add a file to `docs/memory/` in
  the same shape as its neighbours and a line to `docs/memory/MEMORY.md`. Commit it.
- **On the desktop, to refresh the copy:** copy the memory folder over `docs/memory/` and change
  the date in `docs/memory/README.md`. To take in what a cloud session added, copy new files the
  other way.
