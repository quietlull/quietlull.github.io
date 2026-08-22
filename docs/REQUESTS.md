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
| 52 | "remove general and just replace it with minimal" - consolidate the three.js scenes | **DONE** | 3 bundles -> 2. `three-background-general.js` deleted; `home`/`portal`/`section-landing`/`section-projects` now load `minimal`. `spawnDOMAvoidingLanterns` + `getExclusionZones` (101 dead lines) removed with it. Verified served: About = scene, everything else = minimal. **Consequence: those pages lost fireworks**, so the topbar toggle was narrowed to `section-about` or it would have controlled nothing. |
| 51 | Paper filter test: sliders + checkbox, bake it to PNG, give me 3 to choose between | **NEEDS ROD** | Built and live in the tuner. 3 sheets baked to `assets/tex/paper-{wove,coldpress,washi}.png` (~170 KB each). Filter folded into the bloom composite, so zero extra passes. **Waiting on: which sheet, and does it survive at dpr 0.5 / bloom 0.25 / refl 0.25.** Provenance needs the Shadertoy URL from Rod. |
| 50 | Fix the tuner's dpr slider | **DONE** | `composer.setPixelRatio(v)` was never called, so lowering dpr made the post chain render ~4x the canvas. Verified: composer target now follows the ratio (640x400 at dpr 0.5, was 1280x800). All dpr readings before 2026-08-22 were wrong. |
| 49 | Moonlight lift to 1.5 | **DONE** | `uSunLift` 0.2 -> 1.5 in `mirroredSurface.js`, tuner default matched. Verified live: crest gain is now 0.13 * 1.5 = 0.195 of uSunColor2. |
| 48 | Fix the pass at 2 levels and name every constant so they are readable | **DONE** | `setLevels` and the generated-for-N composite gone; kernel weights are named GLSL consts. Pyramid verified at 1280x800: half 640x400, quarter 320x200, wide 320x200, tight 640x400. |
| P1 | "i like the post header being in a box but we dont need the descriptions, tags, etc its on the side column already" | **DONE** | Header box keeps the TITLE only. Also ANSWERS the "judge here" question at prose-blockout.html:184 - tags go in the RAIL, not under the title. |
| P2 | "Tags in general shouldnt be with doted lines like in the reference we can use the tag badges we already have on the main site" | **DONE** | Live badge is `.post-tag`, `_sass/base/_base.scss:247`. Note the dashed border was the GREYBOX placeholder signal, not a design choice. Carries one conflict: that badge is `border-radius:.5rem`, and the 2026-08-11 shape pass says square by default. |
| P3 | "these cards with the left side bar lets make that washi tape too" | **DONE** | Rod chose "both / a new callout": a 7th candidate added, the left-bar admonition with the bar swapped for a tape strip down the edge. Form is our own `.post-takeaway`, tape is planity, idea origin ROD. |
| P4 | "for the padded backing of images lets also try to get a paper feel maybe" + "give me a few options to choose lets do three" | **NEEDS ROD** | Three built and rendering on `prose-blockout.html`, each a different WHERE: A edge (gneiss border-image), B ground (gneiss tiled surface + separate stain), C surface (ibelick feTurbulence, verbatim, no asset). All three sourced verbatim into `sources/`. **Pick A, B or C.**
| P5 | "once again for the L brackets lets make it washi tape as well" | **DONE** | `.co-brack`, the miroirs offset L-brackets. Reading it as tape at the two opposite corners so it stays distinct from the top-edge tape. |
| P6 | "identify whats next once we finish this part up" | **IN PROGRESS** | Standing ask each time a part closes, not a one-off. |
| P7 | "all finalized components need to be kept in the work bench for tuning and optimization later" | **PART DONE** | **NEW STANDING RULE**, recorded here and in memory. Bench entries created for the two things already settled: `extracted/components/washi-tape/` and `extracted/components/tag-badge/`. Back-fill still owed for anything finalized before 2026-08-21.
| P8 | (superseded by P10) "Not sure whats with these tape placements" - left-bar tape must match the card's side size; miroirs tape in the SHAPE of an L, side arms half the card height, top/bottom arms half its width | **NEEDS ROD** | Applied. The rule that came out of it is now written into the bench component: **tape is measured off the CARD, never a fixed pixel guess** - only its width is fixed, because real tape comes off a roll at one width. |
| P9 | "related posts should show 3 cards for posts if possible if not it stays empty" | **NEEDS ROD** | Three drawn. The COUNT is a layout decision and a blockout is where layout gets decided; the card DESIGN stays greybox because its ledger row points at Project-cards, which is itself one of the twelve circular citations. |
| P10 | Tape is "too long and also overlaps with the main card way too much and would obscure text"; "only touching the edge"; "theres a minimum and maximum washi tape distance" | **NEEDS ROD** | Two named rules now, not tuned numbers: `--tape-bite` (how much lands on the card, 7px, the rest overhangs) and `--tape-min`/`--tape-max` clamping the length. Follow-up "wheres the vertical tape now though?" fixed too - see the note below. |
| P11 | "instead of blank bars can you add text to these cards too" | **NEEDS ROD** | All six callout candidates carry real copy at real length and role. The words are placeholder, written to be judged for fit, not final content. |
| P12 | "clone this page to start to creating the Post Final and we will go through the creation of all these things with real text and replace them with elements too" | **NEEDS ROD** | `final-post.html` rebuilt from prose-blockout. **Text is Rod's own ComputeGrass post, verbatim** (abridged for length, never reworded). New `.raw` state added: real content with no approved design renders plainly with a RAW badge, because a greybox cannot hold real text. 1 of 12 slots approved. |
| P13 | "Where is the top bar?" | **NEEDS ROD** | Added to `final-post.html`, COPIED from `final-landing.html` rather than rewritten so the two cannot diverge. Favicon approved, bar still pending (#26). Worth recording: `post-blockout.html?v=stripe` never declared a top bar, so this is Rod adding to the contract, not an element arriving on its own. |
| P14 | "replace the tags with the squared tags from main for now" | **NEEDS ROD** | Now the live `.post-tag` verbatim, squared, with its two colours resolved from the real dark theme rather than approximated: border `rgba(245,158,11,.2)` and text `rgba(232,224,212,.78)`. "For now" is his word - a stand-in, not a pick. |
| P15 | "lets start replacing stuff/working on it in the work bench" | **IN PROGRESS** | `washi-tape` and `tag-badge` registered on the bench (29 entries) with `data-tune` groups, so both are tunable. Found while doing it: the bench `top-bar` component still carries the THREE TOGGLES that D20 removed. Flagged, not fixed. |
| P16 | "tags dont behave the way they should with the hover effects" + "where did you get the tags from again?" | **NEEDS ROD** | Answered: `_sass/base/_base.scss:247`, which is shape ONLY and carries no hover. The live tag is five rules across five files with TWO different hovers. Rod picked `%tag-hover` (`_placeholders.scss:101`), applied to bench + final-post with the `:active` scale. The `_panel.scss` hover was rejected on purpose: it is built on the glass mixin, and glass is the tell the redesign replaces with paper. |
| P17 | "we should actually probably finish finalizing that instead" - the LANDING | **IN PROGRESS** | Pivot off the post page. `final-landing.html` is 3 of 8. Verified: none of its four content slots had a saved source. **First one now closed:** the skills/tools row is sourced from the LIVE stephanewillems.be/skills DOM (`sources/stephanewillems-skills.md`), replacing a circular "via ref-stephanewillems.html" citation. Remaining: section head (no source), project cards (circular), demo reel (no source, and Rod already pulled it). |
| P18 | "consolidate the final pages I'm supposed to look at like the sub page layouts... drop projects aggregate, A3 assembly, and prose-blockout from the top section" | **NEEDS ROD** | `index.html` top section is now: the six FINAL pages on one consolidated row with live approval counts, then element gallery, component blockout, sub-page layouts, and the locked hero. The three named pages moved DOWN to Active build, not deleted, each with why. Header counts remeasured (they were stale). All 60+ links verified 200. |
| P19 | "the posts shouldnt have the full scene can you make them use the scene replacement bloom for now?" | **NEEDS ROD** | `final-post.html` no longer REQUESTS the scene bundle at all (hiding it would still download 845 KB and hold a WebGL context). Bloom is visible and running. Measured after: 14 resources, **79 KB total, zero WebGL canvases**, `window.THREE` undefined. Was ~905 KB. **Bug found doing it:** all six final-* pages load `hana-bloom.js` but none carried the `.bgcanvas` CSS and all set `#hana-bg` to opacity 0, so the script was baking two 1024px canvases invisibly on every one. Fixed on final-post only; the other five still do it. |
| P20 | "with the bloom its clear that all the text need some kind of backing like the original" | **NEEDS ROD** | Article and rail now sit on the live reading well's ground: `rgba(8,15,27,.92)` + amber hairline + lifted shadow + its asymmetric padding, from `_sass/pages/_post.scss:72`. **NOT taken:** its `backdrop-filter:blur(16px)` (does nothing at 92% opacity, is the glass tell, and is a full-size blur on a scrolling surface) and its radius (squared per the shape pass). Stripe's 663px measure is PRESERVED - the backing bleeds outward 2rem instead of padding inward, since the article column is only 671px. Verified 663 at 1120 / 1440 / 1920. Still a "for now" stand-in on a PENDING slot. |
| P21 | "i notice a scroll bar at the top above the topbar which is broken" | **BLOCKED** | **Rod.** Could not reproduce at 1098 / 1120 / 1440 / 1920: no document overflow at any of them, top bar sticks at top 0, rail sticks, and the only element-level scrollbar on the page is the `<pre>` code block (709px of HLSL in a 661px box, `overflow-x:auto`). Needs his viewport width and where exactly. **Two real bugs found while looking, both fixed:** `94vw` includes the scrollbar so the new backing overflowed by 7px, now `calc(100% - 5rem)`; and separately the bar drops to a TWO-column grid below ~1120px, which is why the nav is not centred there (that one is NOT fixed - it lives in the shared `top-bar.css` and belongs to #26). |
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
