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

**Two sessions write this file at once** (the redesign pass and the scene/perf pass) and collided on
numbers three times on 2026-08-21. Redesign-lab rows are therefore lettered `P<n>` (P for prose /
page work); the scene pass keeps the plain numbers. Pick a prefix rather than a next number.

| # | request (Rod's words, trimmed) | status | waiting on |
|---|---|---|---|
| 3 | Sort out the callouts section | **NEEDS ROD** | 6 warm candidates now captured at `element-gallery.html`. Waiting on TAKE/LEAVE, then the takes get built as components. |
| 19b | Export the localStorage palette as insurance | **BLOCKED** | **Rod.** One console line. The approved colours exist in no tracked file — this is a backup, not the palette decision (D18 defers that). |
| 20 | Projects page rejected — back to the drawing board in detail | **IN PROGRESS** | `final-projects.html` is blockout-only now. Elements pending #32. |
| 21 | Landing: change the headers and the demo reel element | **IN PROGRESS** | Reel pulled (no source at all). Headers have no source either — pending #32. |
| 22 | The scene is laggy — cards plus three.js? | **BLOCKED** | **Rod.** Mechanism found: 12 blurred `plus-lighter` layers repainting on mousemove, sharing a GPU with a 644 KB scene. Needs the FPS snippet run on his machine. |
| 26 | Top bar spacing weird, nav not centred | **PART DONE** | **Rod.** Nav was 44px off; now exactly 0. But gaps are 213/48 — centred nav vs balanced gaps is a taste call. |
| 32 | Mine the gallery for missing elements, screenshot them, list what's Slop/missing | **NEEDS ROD** | Needs list written (40 unsourced / 11 buildable / 12 circular). 9 elements captured and shown at `element-gallery.html`. **Waiting on TAKE/LEAVE per card.** 3 captures still to retry, 8 slots have nothing in the gallery. |
| 40 | Light the scene properly | **NOT STARTED** | The scene has ZERO lights - bloom was standing in for them. Sky/water/moonlight sliders exist in the tuner; the real fix is unmade. |
| 37 | Big performance check - performance is the biggest issue right now | **IN PROGRESS** | 5-area audit running: CSS paint cost, JS runtime, three.js, asset weight, and what actually ships live vs lab-only. |
| 38 | Manual code audit of everything written so far | **NOT STARTED** | Rod: *"I've been trusting you too much for code and that's on me. I'll be manually looking over all code from now on."* Starts after #37. Standing change recorded in memory. |
| 39 | Comprehensive prose rework with context (tags, headers, image boxes) | **PART DONE** | **JUDGED 2026-08-21.** Rod: *"Everything else is ok"* plus five specific changes, now #46-#50. The washi-tape callout (planity) is effectively TAKEN and becomes a site convention rather than one callout. |
| 41 | Code block colours | **THINKING** | Rod: type = our orange, then a square harmony (green/blue/pink), VS Code-ish roles. CONFLICT: palette law says no cool UI accent and no red. Syntax may be a carve-out but that needs saying out loud. Also out of sequence with D18 (colour last). |
| 42 | "read the current status" - fresh-session orientation | **DONE** | STATUS, HANDOFF, DECISIONS and this OPEN table read and verified against the working tree 2026-08-21. |
| 43 | "we are going to get everything done" - finish the lab until it can replace the whole site in one port | **IN PROGRESS** | Umbrella for the critical path. The bottleneck is Rod's judgement on #3, #32, #39 (prose), #41 and A. Nothing downstream of those can move. |
| 44 | "then we will be moving everything in redesign lab over to the main page" - THE PORT | **BLOCKED** | Needs #43 finished and #38 (audit) passed. Plan is MERGE-WORKLIST gates 2-6: token bridge (39 lab tokens vs 270 live, 2 names in common), the Rollup decision, the SCSS delivery decision. |
| 45 | Does the fireworks reward keep its own button, despite D21 folding all motion into one switch? | **NEEDS ROD** | **Rod.** Split out of the old #40 when that row closed. D12 made the reward an UNLOCKABLE, which only works if something can be unlocked. |
| 46 | "show me the full pass code for the kawase blur" | **DONE** | Shown in chat from `redesign-lab/cheap-bloom.js:99-242`. Read-only, no edit. |
| 47 | Finalize scene numbers: dpr 1, bloom res .5, refl res .5, str .7, radius .15, threshold 0 (delete the bright pass), remove tone mapping, sky #162237 | **DONE** | All applied and verified live. Kawase ported to `_javascript/shader/kawaseBloom.js`, UnrealBloom gone, tone-mapping control stripped from the tuner. Verified in-page: `bloomPass.name` kawase, no `threshold` property, sky 162237, `toneMapping` 0, reflectionScale 0.5. |
| 49 | Moonlight lift to 1.5 | **DONE** | `uSunLift` 0.2 -> 1.5 in `mirroredSurface.js`, tuner default matched. Verified live: crest gain is now 0.13 * 1.5 = 0.195 of uSunColor2. |
| 48 | Fix the pass at 2 levels and name every constant so they are readable | **DONE** | `setLevels` and the generated-for-N composite gone; kernel weights are named GLSL consts. Pyramid verified at 1280x800: half 640x400, quarter 320x200, wide 320x200, tight 640x400. |
| P1 | "i like the post header being in a box but we dont need the descriptions, tags, etc its on the side column already" | **DONE** | Header box keeps the TITLE only. Also ANSWERS the "judge here" question at prose-blockout.html:184 - tags go in the RAIL, not under the title. |
| P2 | "Tags in general shouldnt be with doted lines like in the reference we can use the tag badges we already have on the main site" | **DONE** | Live badge is `.post-tag`, `_sass/base/_base.scss:247`. Note the dashed border was the GREYBOX placeholder signal, not a design choice. Carries one conflict: that badge is `border-radius:.5rem`, and the 2026-08-11 shape pass says square by default. |
| P3 | "these cards with the left side bar lets make that washi tape too" | **DONE** | Rod chose "both / a new callout": a 7th candidate added, the left-bar admonition with the bar swapped for a tape strip down the edge. Form is our own `.post-takeaway`, tape is planity, idea origin ROD. |
| P4 | "for the padded backing of images lets also try to get a paper feel maybe" + "give me a few options to choose lets do three" | **NEEDS ROD** | Three built and rendering on `prose-blockout.html`, each a different WHERE: A edge (gneiss border-image), B ground (gneiss tiled surface + separate stain), C surface (ibelick feTurbulence, verbatim, no asset). All three sourced verbatim into `sources/`. **Pick A, B or C.**
| P5 | "once again for the L brackets lets make it washi tape as well" | **DONE** | `.co-brack`, the miroirs offset L-brackets. Reading it as tape at the two opposite corners so it stays distinct from the top-edge tape. |
| P6 | "identify whats next once we finish this part up" | **IN PROGRESS** | Standing ask each time a part closes, not a one-off. |
| P7 | "all finalized components need to be kept in the work bench for tuning and optimization later" | **PART DONE** | **NEW STANDING RULE**, recorded here and in memory. Bench entries created for the two things already settled: `extracted/components/washi-tape/` and `extracted/components/tag-badge/`. Back-fill still owed for anything finalized before 2026-08-21.
| P8 | "Not sure whats with these tape placements" - left-bar tape must match the card's side size; miroirs tape in the SHAPE of an L, side arms half the card height, top/bottom arms half its width | **NEEDS ROD** | Applied. The rule that came out of it is now written into the bench component: **tape is measured off the CARD, never a fixed pixel guess** - only its width is fixed, because real tape comes off a roll at one width. |
| P9 | "related posts should show 3 cards for posts if possible if not it stays empty" | **NEEDS ROD** | Three drawn. The COUNT is a layout decision and a blockout is where layout gets decided; the card DESIGN stays greybox because its ledger row points at Project-cards, which is itself one of the twelve circular citations. |
| A | About layout cannot be laid out until dimden vs Klubnika is judged | **BLOCKED** | **Rod.** D15 kept two survivors on purpose; the difference is how much live scene each covers, which a greybox cannot show. |

## Blocked on Rod specifically — clearable in one message

- **41** code-block colours: confirm syntax is a palette-law carve-out, then pick
- **39** judge the callouts in `prose-blockout.html` (supersedes judging them in isolation)
- **45** does the fireworks reward keep its own button
- **32 + 3** go through `element-gallery.html` and say TAKE or LEAVE per card - this one unblocks the most
- **19b** run `copy(localStorage.getItem('lab-palette'))` on the lab
- **22** run the FPS snippet with the scene on, then off
- **26** centred nav with lopsided gaps, or balanced gaps with an off-centre nav
- **A** dimden vs Klubnika for About, once both are built

---

# PHANTOMS — done, do not read

Kept only so a past request can be looked up if Rod asks for one directly.

<details>
<summary>2026-08-21 completed (2)</summary>

| # | request | note |
|---|---|---|
| 39 | Bloom: cheaper alternative, keep the 2-level Kawase | D23 (renumbered from D20). Unreal out, Kawase in at 2 levels, no threshold. Other implementations and the switcher deleted. |
| 40 | Where do the toggles go | D21: one switch, scene + all motion. Remaining fireworks-button thread reopened as #45. |

</details>

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

- **LAB ONLY (D22).** Zero main-site work. `_sass/`, `_layouts/`, `_includes/`, `_javascript/`, `_config.yml` are off limits until the port.

- Never ScheduleWakeup; run until out of usage.
- Always link the localhost:4000 preview URL for anything changed.
- Rod is the eyes: never verify visuals by screenshot; make the change and ask what he sees.
- Preview-first: show non-trivial changes before touching files.
- The blockout is a contract: an aggregate contains only its approved blockout's elements.
- Duplicate mistakes get re-logged to the REPEAT-OFFENCE TALLY, never tidied.
- Only components on the workbench are ours; `rework-*` and `a3-assembly` are never sources.
- **Every FINALIZED component gets kept on the workbench** (`extracted/components/`) so it can be tuned and optimised later. Rod, 2026-08-21.
- No em dashes in written content.
