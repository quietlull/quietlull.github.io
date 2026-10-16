---
name: cloud-session-2026-10-16
description: "What the 2026-10-16 cloud session changed, for the local agent: switch tests, phone layout, touch glow, service worker, removed orb, skip link."
metadata:
  node_type: memory
  type: project
  modified: 2026-10-16
---

# Cloud session 2026-10-16: what changed

All of it is on `main` and in `docs/CHANGELOG.md` under 2026-10-16.

- **Hidden switch tests** in `norobots/`: the blind pair test and the 25-switch tier list with
  questions, "Your preferences" bars and flags. Media named after each switch:
  `assets/img/switches/`, `assets/media/sound-tiers/`, `assets/media/switch-test/`.
- **Phone layout** of `/tech-art/` and `/game-design/`: one block under 760px in
  `_sass/pages/_section-landing.scss`. The card squish was a grid bug (`span 12` in a 6-column
  grid, see TRAPS). Desktop proved unchanged at 760 to 1920px.
- **Touch lights nothing that follows the pointer:** `cursor-coords.js` ignores touch;
  `mouse-trail.js` ignores mouse moves and scroll without `(hover: hover)`. Tap sparks stay.
- **Deleted:** `body::before` background orb and its three tokens (Slop, no source).
- **Service worker** (`_javascript/pwa/sw.js`) is network-first for pages, scripts and styles.
  Before, the first visit after every deploy was the old site. Diverges from Chirpy (UPSTREAM).
- **Skip link** hidden with `opacity: 0` until focused; the iPhone bounce showed it.
- **Open:** the page ground on `body` should not paint every page (STATUS note). Tier list
  results from before the numbering change no longer open.
