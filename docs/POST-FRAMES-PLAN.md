# Why post pages drop frames (P515) - investigation and optimization plan

**Status: PLANNED, NOT RUN. INVESTIGATION ONLY - see section 7 before touching anything.**

Rod, 2026-09-02: *"my post pages run really poorly even though they
have no three.js scene at all which would do that"*, then *"ill make you work on all of p515 make a
plan for it and start making optimizations"*, then the scope call: *"specifically im targeting
frames not like memory or stuff like that."*

Written to be executed COLD by the next session. Everything needed is here or cited by path. The
recon in section 3 was actually run on 2026-09-02, so it is fact, not guesswork; do not redo it.

---

## 1. Scope: FRAMES ONLY

**In scope:** anything that costs time every frame, or causes a dropped frame, or makes scrolling
and cursor movement stutter on a post page. Frame duration, jank, long tasks, forced style and
layout work, compositing and decode cost.

**Explicitly OUT of scope** (Rod's call, and it overrides the instinct to report them):

- Download weight and bundle size. Do not report kilobytes as a finding.
- Memory, heap growth, leaks.
- Load and first-paint time, unless a load-time cost is still burning frames after the page settles.

This matters because the biggest thing on a post page is also the easiest thing to mis-report:
there are tens of megabytes of video, and **the reason it belongs in this pass is per-frame decode,
not the megabytes.** Frame it that way or it will read as an out-of-scope finding.

---

## 2. Method: attribution first, and the premise is not settled

The question is "what is eating the frames", not "is the sparkler slow". Rod named the sparkler in a
separate request (#55, `docs/SPARKLER-PERF-PLAN.md`), but a post page runs several permanent costs
and the sparkler is only one candidate.

**Primary tool is the CPU profiler, not ablation.** This is main-thread JS plus compositing, not GPU
fragments, so a profile answers "who spends the time" directly. Use CDP `Profiler.enable` /
`Profiler.start` / `Profiler.stop` over a fixed window and attribute self-time by function and by
script URL. Then **confirm the top hits with ablation**, because a profile says where time goes and
an ablation proves what you get back.

Profiles do not see compositor or decode work, which on this page is likely to matter more than JS.
So pair every profile with a `Tracing` capture or with frame-time ablation, and treat "the JS
profile looks quiet" as evidence that the cost is NOT in JS rather than as evidence there is no cost.

If the sparkler turns out to be implicated, the deep-dive plan for it is already written at
`docs/SPARKLER-PERF-PLAN.md` (request #55). Do not duplicate it; run its method for that one
candidate.

---

## 3. What is already known (MEASURED 2026-09-02, do not redo)

Sample page used: `/tech-art/posts/ComputeGrass/`, one of the heaviest.

**Videos, and this is the leading hypothesis:**

- **10 `<video>` elements on that one post, every one of them `autoplay loop muted playsinline`.**
- **Nine carry no `preload` attribute at all**; exactly one has `preload="metadata"`. None has
  `preload="none"`.
- They autoplay and loop **regardless of whether they are on screen**, so a reader parked at the top
  of the article is decoding video for the whole article, continuously, forever.
- `/tech-art/posts/Procedural3DMask/` carries 5 mp4 plus **3 animated GIFs**. GIFs decode on the
  main thread and the largest on disk is 11.8 MB, so they are a different and possibly worse cost
  than the mp4s.
- On disk: 56.7 MB across 27 video files. **Quoted here only to size the decode load, not as a
  weight finding** (see section 1).

**Every rAF loop and timer on the post path** (grep, 2026-09-02):

| Thing | Mechanism | Idle behaviour |
|---|---|---|
| Sparkler | `mouse-trail.js:159,250` rAF | **self-terminating**, stops when no particle is alive and the cursor is still |
| Cursor glow | `cursor-coords.js:27` one rAF, shared broadcaster | driven by `pointermove` |
| Line boil (wordmark) | `line-boil.js:155` **`setInterval(1000 / rate)`** | **permanent, never stops**, on every page |
| hana-bloom | **no rAF and no timer at all** | bakes two canvases once at load |
| post-enhance | no rAF found | reading bar, section sparks, confetti, "ambient fireflies" appear to be event or CSS driven |

**Two corrections to P515's original brief, worth carrying:**

1. **hana-bloom has no JavaScript loop.** Its per-frame cost, if any, is pure CSS compositing: two
   canvases upscaled to 1024px carrying `filter: blur(20px)` plus an **infinite 12s opacity
   animation** (`assets/css/chrome-scene.css`, and reduced-motion freezes it at a fixed mix). A
   permanently animating filtered layer is a compositor cost every frame and will not show in a JS
   profile.
2. **That post has zero `<iframe>` elements.** The original brief assumed a giscus iframe. Either it
   loads lazily on scroll or it is not on every post. Verify before blaming it.

**Scripts a post loads:** `chrome.js`, `post.min.js`, `theme.min.js`, `hana-bloom.js`,
`scene-mode.js`, `clipboard.min.js`, `tocbot.min.js`, `glightbox.min.js`, `dayjs.min.js` plus three
dayjs locale/plugin files, `loading-attribute-polyfill`, `cdn.js`. No Three.js, confirmed: posts
resolve to script tier `none`.

---

## 4. Ranked candidates to test

Ordered by expected frame cost. The profile and ablations decide; this is where to look first.

1. **Ten simultaneously decoding looping videos.** Test by pausing every offscreen video and
   measuring the frame time recovered. Expect this to dominate, especially with hardware
   acceleration off, where decode is software and lands on the CPU.
2. **Animated GIFs** on posts that have them (`Procedural3DMask`). Unlike video they cannot be
   paused, so if they are expensive the only levers are converting them to video or not rendering
   them until near the viewport. Note the repo already has a `compress-media` skill for GIF to MP4.
3. **hana-bloom's permanently animating blurred layers.** Ablate by hiding `#hana-bg` and by
   freezing the opacity animation separately, so the blur cost and the animation cost are told
   apart.
4. **The line-boil interval**, the only permanent timer on the page. Measure its tick cost and,
   more importantly, whether each tick forces style, layout or paint on the top bar.
5. **The sparkler and the cursor glow**, which only cost while the cursor moves. Cover them with the
   movement profiles from `SPARKLER-PERF-PLAN.md` section 4.
6. **Scroll-driven work**: the reading progress bar and tocbot's scroll spy. Measure during a
   scripted scroll, not at idle.
7. **glightbox and the loading-attribute polyfill**, both third-party, both easy to overlook.

---

## 5. The harness

Same rig as request #52 (that pass's scripts lived in the session scratchpad and are gone; rebuild
from this spec). Node 22, no dependencies, headless Chrome over CDP with a raw `WebSocket`.

Launch flags, hardware acceleration off, which is the house method and also makes video decode
land on the CPU where it can be seen:

```
--disable-gpu --enable-unsafe-swiftshader --use-angle=swiftshader
--headless=new --no-first-run --mute-audio
--disable-background-timer-throttling --disable-renderer-backgrounding
--window-size=1300,900 --remote-debugging-port=<port> --user-data-dir=<temp>
```

Run every condition at **1x and 4x CPU throttle** (`Emulation.setCPUThrottlingRate`). Add one
**hardware GPU** reference pass, because video decode is the one thing here that may be hardware
accelerated in real life, and one **mobile viewport** pass.

**Three states per page, measured separately.** Rod said "run really poorly" without saying when, so
establish which symptom before chasing it:

- **Idle**: page settled, cursor still, no scrolling. This isolates the permanent costs (video,
  hana-bloom, line-boil).
- **Scrolling**: scripted, steady rate, via `Input.dispatchMouseEvent` wheel events or
  `Input.synthesizeScrollGesture`.
- **Cursor moving**: the movement profiles from `SPARKLER-PERF-PLAN.md` section 4, driven with CDP
  `Input.dispatchMouseEvent`, **never an in-page `dispatchEvent`** (that mistake has already cost
  this repo two "verified" cursor fixes that did nothing, memory `feedback-verify-the-premise`).

Compare against a page Rod does **not** call slow, so there is a reference for what normal is.

---

## 6. What to measure

Per state and condition, report **average, minimum, maximum, p50 and p95** frame time. Milliseconds,
not fps. The 16.7 ms line is the 60 fps deadline and 33.3 ms means a dropped frame.

1. **Frame time** from the rAF delta series.
2. **Long tasks**, via `PerformanceObserver` on `longtask`: count and worst duration.
3. **Dropped frames during scroll**, which is what jank actually is.
4. **Self-time attribution** from the CPU profile, by function and by script.
5. **Forced style and layout**, via the `Tracing` category for layout and recalc, to catch anything
   causing synchronous layout per tick.
6. **How much of the frame is compositing and decode rather than JS.** If JS is quiet and frames are
   still long, this is where the answer is.
7. **Live decoding video count**, since that is the number the top hypothesis predicts matters.

---

## 7. Optimization guardrails

**THIS PASS IS INVESTIGATION ONLY. DO NOT CHANGE ANY SHIPPING CODE.** Rod, 2026-09-02, overriding
the #52 contract for this request: *"this is just investigation for now not changes until verified
and i agree to it after looking at the visual change."*

So: **nothing lands, not even a one-line invisible fix.** That is a deliberate reversal of the #52
rule where minor invisible fixes could land directly, and it applies to everything here. Measure,
write the diff, show the number, show him the visual, and wait. He approves after looking, then it
lands.

Runtime patching for measurement is fine and expected, since it touches no file. Writing to
`_javascript/`, `assets/js/`, `_sass/`, `_includes/` or `_layouts/` is not.

The rest of the rules still apply to whatever he later approves:
- **P483 is not a blocker but must be respected.** Rod previously ruled **autoplaying videos
  "WONT FIX"**: *"i dont care enough to fix it and theres not enough motion in these to do anything
  crazy."* That ruling was about **motion and accessibility**, not frames, and it was answering a
  different question. **Do not remove autoplay** and do not turn videos into click-to-play, because
  that changes the behaviour he approved. **Pausing a video that is not on screen and resuming it
  when it scrolls into view keeps his look exactly** while removing the cost, so that is the shape
  to propose. Say the P483 nuance out loud when proposing it rather than letting him think it was
  ignored.
- **Rod is the eyes.** Never confirm a visual by screenshot. Make the change, link `localhost:4000`,
  ask what he sees.
- **Anti-bloat D5:** a fix that adds code has to justify itself against what it measured. An
  IntersectionObserver that pauses offscreen video is a few lines and should be argued on its
  measurement.
- **Reduced motion:** the scene still has no `prefers-reduced-motion` path (D21 debt). If a fix
  touches something that moves, check whether it should honour it.

---

## 8. A/B protocol for anything proposed

Cross-run comparison on a throttled machine is not trustworthy; background load changes between runs
and on #52 that produced a headline that did not reproduce.

- **Alternate within one page load: A / B / A / B**, and report the mean of each.
- **Include a control** that changes nothing, to size the drift. On #52 the control drifted 0.4 ms
  at 1x and 0.04 ms at 4x, which is what made the real gains believable.
- **After applying a fix to source, re-measure the built bundle**, not the runtime patch. On #52
  those two disagreed on a headline and only the rebuild caught it.
- **Frame time is vsync-quantised.** A move from 33.3 ms to 16.7 ms is crossing the 60 fps deadline,
  a step function that depends on how close the machine already was. Report the milliseconds as the
  result and the fps flip as a consequence, and never claim a flip that reproduced only once.

---

## 9. Traps carried forward

- **Check the dev server is alive before trusting a run.** A whole 15-condition pass on #52 returned
  "scene never ready" for every condition because a Jekyll server from another session had died.
  Assert HTTP 200 and the expected bytes first.
- **Another session is actively working this repo** and Rod has said not to worry about the churn.
  Still: check `git status` before committing, scope commits to your own files, and do not sweep
  another session's in-flight edits into them.
- **Rebuild after touching `_javascript/`**: `npm run build:js`. `assets/js/dist/` is machine-owned
  and gitignored; never hand-edit, never commit it.
- **`npm test` is the gate**: eslint, stylelint, and the load-order checker.
- **Shell quoting** has broken three writes this session. For any file with backticks or `${}`, use
  the Write or Edit tool, not a bash heredoc and not `node -e` inside double quotes.
- **Comments cap at 2 lines** (`docs/CONVENTIONS.md`).

---

## 10. Deliverables

1. **Which symptom**: idle, scroll or cursor. Answer this before chasing anything.
2. An attribution table: what costs how many milliseconds per frame, at 1x and 4x, on a heavy post
   and on a light one, against a page Rod does not call slow.
3. Two or three coded options per real problem, each with the diff, the measured saving, and the
   visible consequence. Duds recorded as duds so nobody re-proposes them.
4. **NOTHING APPLIED.** Every fix stays a proposal until Rod has seen the visual and said yes.
5. Docs synced per CLAUDE.md: CHANGELOG, REQUESTS P515, this file's status, and a todo row.

---

## 11. Run order

1. Confirm the dev server, bundle freshness, and `git status`.
2. Build the harness from section 5.
3. Establish **which symptom** (idle / scroll / cursor) on a heavy post versus a page Rod likes.
4. CPU profile plus tracing for each symptom; attribute.
5. Ablate the top hits to confirm, starting with pausing offscreen video.
6. Fan out read-only agents for static analysis and solution options in parallel; keep measurement
   serial, because parallel profiling on one CPU is worthless.
7. A/B every candidate within-load as a **runtime patch**. Do not apply anything to source.
8. Report, sync docs, and show Rod each change on the page so he can judge the visual before
   anything is applied.
