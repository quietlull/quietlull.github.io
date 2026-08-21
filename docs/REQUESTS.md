# Request tracker

Rod, 2026-08-18: *"when I make a request queue it up and add it to memory. often when I make many
requests it doesn't get tracked and I have to ask over and over... number them, letter them,
whatever it is. track the status so even if you don't finish them they are clearly marked either
finished, blocked, in progress, or not done."*

And: *"if a task is done you don't need to read it. pretend that done tasks in the lookup table are
phantoms, just for future reference if asked for by me directly."*

## How to use this file

**Read the OPEN table. Skip the phantom table entirely** unless Rod asks about a specific past
request. The phantoms are history, not working set — reading them wastes the context that should go
on the open ones.

Add a row **when the request arrives, before starting work**. One row per REQUEST, not per message —
Rod routinely sends five asks in one paragraph, and merging them is exactly how they got lost.
Quote him, trimmed. Never close a row silently: if something was abandoned, it is `NOT DONE`, not
absent. `BLOCKED` must name what it waits on and whether that is Rod or another task.

---

# OPEN — this is the working set

| # | request (Rod's words, trimmed) | status | waiting on |
|---|---|---|---|
| 3 | Sort out the callouts section | **NEEDS ROD** | 6 warm candidates now captured at `element-gallery.html`. Waiting on TAKE/LEAVE, then the takes get built as components. |
| 19b | Export the localStorage palette as insurance | **BLOCKED** | **Rod.** One console line. The approved colours exist in no tracked file — this is a backup, not the palette decision (D18 defers that). |
| 20 | Projects page rejected — back to the drawing board in detail | **IN PROGRESS** | `final-projects.html` is blockout-only now. Elements pending #32. |
| 21 | Landing: change the headers and the demo reel element | **IN PROGRESS** | Reel pulled (no source at all). Headers have no source either — pending #32. |
| 22 | The scene is laggy — cards plus three.js? | **BLOCKED** | **Rod.** Mechanism found: 12 blurred `plus-lighter` layers repainting on mousemove, sharing a GPU with a 644 KB scene. Needs the FPS snippet run on his machine. |
| 26 | Top bar spacing weird, nav not centred | **PART DONE** | **Rod.** Nav was 44px off; now exactly 0. But gaps are 213/48 — centred nav vs balanced gaps is a taste call. |
| 32 | Mine the gallery for missing elements, screenshot them, list what's Slop/missing | **NEEDS ROD** | Needs list written (40 unsourced / 11 buildable / 12 circular). 9 elements captured and shown at `element-gallery.html`. **Waiting on TAKE/LEAVE per card.** 3 captures still to retry, 8 slots have nothing in the gallery. |
| 37 | Big performance check - performance is the biggest issue right now | **IN PROGRESS** | 5-area audit running: CSS paint cost, JS runtime, three.js, asset weight, and what actually ships live vs lab-only. |
| 38 | Manual code audit of everything written so far | **NOT STARTED** | Rod: *"I've been trusting you too much for code and that's on me. I'll be manually looking over all code from now on."* Starts after #37. Standing change recorded in memory. |
| A | About layout cannot be laid out until dimden vs Klubnika is judged | **BLOCKED** | **Rod.** D15 kept two survivors on purpose; the difference is how much live scene each covers, which a greybox cannot show. |

## Blocked on Rod specifically — clearable in one message

- **32 + 3** go through `element-gallery.html` and say TAKE or LEAVE per card - this one unblocks the most
- **19b** run `copy(localStorage.getItem('lab-palette'))` on the lab
- **22** run the FPS snippet with the scene on, then off
- **26** centred nav with lopsided gaps, or balanced gaps with an off-centre nav
- **A** dimden vs Klubnika for About, once both are built

---

# PHANTOMS — done, do not read

Kept only so a past request can be looked up if Rod asks for one directly.

<details>
<summary>2026-08-18 completed (29)</summary>

| # | request | note |
|---|---|---|
| 1 | Read current status | |
| 2 | Add stripe.dev to the gallery, tag and summarise it | 3 cards; recaptured at the exact URL. |
| 4 | Lab page doesn't link the blockouts; clean it up | Index rebuilt, 4 pages retired, links verified. |
| 5 | Favicon: returns to centre, rotation stays | Spin always-attached and paused. |
| 6 | Fix top bar scaling | `--top-bar-height` derived per tier. |
| 7 | Commit everything | 7 commits. |
| 8 | Show me the full list | `docs/MERGE-WORKLIST.md`, 111 findings. |
| 9 | Help complete gate 0 | STYLE.md + `_data/projects.yml` recovered. |
| 10 | Judge the sub-page blockouts | D15. |
| 11 | Link the pages you refer to | Standing rule. |
| 12 | Projects: MinionsArt + Kaito Note cards | DROPPED by Rod. |
| 12b | Build it with our current cards | Built, then rejected — see #20. |
| 13 | Landing headers / skills / reel stubs | Superseded by #21, #27, #28. |
| 14 | What is a callout? | Defined in VOCABULARY. |
| 16 | Rounded gothic for cards and headers | D16, moved at the token. |
| 17 | Remove the chevron | D17. |
| 18 | What is a seam band? | Already rejected 2026-08-13. |
| 19 | Palette waits until the end | D18. |
| 23 | Remove the orb on the project cards | Corrected after a wrong first attempt. |
| 24 | Self-loop the anti-AI rules | PAGE-PROCESS gates + tally + memory. |
| 25 | Blockouts aren't followed; things added without approval | Same gates. |
| 27 | Landing has tag buttons I never wanted | Removed. |
| 28 | The skills switch doesn't work | Removed — zero JS behind it. |
| 29 | What's the point of a blockout? | Made binding. |
| 30 | Be systematic; dependencies; review; provenance | Hard gates. |
| 31 | What are these python files? | Scratchpad, outside the repo. |
| 33 | Start the `final` page group | 6 pages, slot state panels. |
| 34 | Track requests with statuses | This file. |
| 35 | Done tasks are phantoms | This structure. |
| 15 | Find WARM callout examples | 6-angle hunt, 21 candidates, 5 survived both checks. Captured. |
| 9b | Resolve both dependabot merges | Dev-deps: theirs' versions, ours' package list. Prod-deps: bootstrap from theirs, `three` from ours - that one WOULD have deleted `three`. Both merged and pushed. |
| 36 | Fix the other dependabot conflict | Same merge, one line. |

</details>

---

## Standing rules Rod has set (always on, not tasks)

- Never ScheduleWakeup; run until out of usage.
- Always link the localhost:4000 preview URL for anything changed.
- Rod is the eyes: never verify visuals by screenshot; make the change and ask what he sees.
- Preview-first: show non-trivial changes before touching files.
- The blockout is a contract: an aggregate contains only its approved blockout's elements.
- Duplicate mistakes get re-logged to the REPEAT-OFFENCE TALLY, never tidied.
- Only components on the workbench are ours; `rework-*` and `a3-assembly` are never sources.
- No em dashes in written content.
