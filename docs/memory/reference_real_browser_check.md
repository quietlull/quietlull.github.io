---
name: reference-real-browser-check
description: "How to verify behaviour with real input when the in-app browser pane is hidden: tools/real-browser.mjs drives headless Chrome. Also: Edge IS installed on Rod's machine."
metadata:
  node_type: memory
  type: reference
  originSessionId: 7b99f2df-fb04-446f-8298-d5557e883b9e
  modified: 2026-10-11T00:35:12.866Z
---

**The in-app Browser pane is usually HIDDEN in this project** (`document.visibilityState` reads
"hidden", screenshots fail with "not compositing frames"). A hidden tab runs no animation frames, so
drift, magnets, tilt, flips and line boil all read as dead there. Static reads (computed styles,
sizes, console errors) are still valid in the pane; anything that moves is not.

**Use `tools/real-browser.mjs`** (in the repo since 2026-10-09). It launches headless Chrome over
the DevTools Protocol with no dependencies (Node 22 has a global WebSocket) and gives real input:
`launch()`, `goto(url)`, `moveTo(x, y)` (stepped mouse moves), `evaluate(js)`, `problems()` (exceptions,
console errors, 4xx), `send()` for raw protocol calls such as mouse clicks. Six agents and I each
rebuilt this in a temp folder before it was kept. `tools/check-workbench.mjs` is the worked example:
it loads all workbench specimens and reports errors and sizes.

**Chrome:** `C:/Program Files/Google/Chrome/Application/chrome.exe`.
**Edge is installed too:** `C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`. Set
`CHROME_PATH` to it. This matters for the parked Edge reel ghost: the working assumption all through
September was "only Rod can check, nobody else has Edge". That was never tested. A compositor
ghost may not reproduce headless, but it has not been tried.

**Headless Edge was tried on 2026-10-10 and is NOT a usable instrument here.** It launches and
answers protocol calls, but it draws no frames: `requestAnimationFrame` never fires (glow and
sparkler read as dead on a page that works), and a mouse move dispatched over a cross-origin
iframe never returns, so the script hangs. A hung run leaves about 19 `msedge.exe` processes and a
locked profile; kill them by command line (`*real-browser-*`) before deleting the profile. So an
Edge claim still needs Rod's own eyes. Say "not verified in Edge" plainly.

**Rod's desktop reports a touch device beside its mouse** (`(any-pointer: coarse)` true,
`maxTouchPoints` 2, `(hover: hover)` true; read in the in-app pane 2026-10-10). Never gate a
mouse effect on "no touch device": it would switch off on his own machine. Use `(hover: hover)`
or the event's `pointerType`.

**A sampling trap that cost one false alarm:** line boil cycles three faces at 6 changes a second,
so two reads 500ms apart land on the same frame and it looks frozen. Sample at an interval that is
not a multiple of the cycle (200ms worked).

Related: [[feedback-verify-the-premise]], [[project_element_vocabulary]].

## THE C: DRIVE IS NEARLY FULL (measured 2026-10-10: 466 GB, about 2 GB free)

- **Never give agents a git worktree each** (`isolation: "worktree"`). A copy of this repo is
  1.4 GB; five at once failed with "No space left on device". Run agents ONE AT A TIME in the main
  checkout instead, with disjoint file lists and the rules in repo `docs/simplify/README.md`.
- `tools/real-browser.mjs` now deletes its throwaway profile on close. Before that fix, twelve
  leftover profiles in the Temp folder (named `real-browser-*`) held 969 MB. If the drive is tight, look there and in
  the session scratchpad first.
- Do not copy `_site` or the repo for a baseline. `tools/page-fingerprint.mjs` (a JSON of element
  positions), a copy of the compiled CSS, and the built `.html` files are enough, a few MB.
- While an agent is working in the main checkout, do not edit the repo yourself and keep
  `jekyll serve` stopped: a second process rebuilding `_site` corrupts its comparisons.
