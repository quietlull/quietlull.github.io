# Sparkler performance test plan (request #55)

**Status: PLANNED, NOT RUN.** Rod, 2026-09-02: *"The next thing i want to optimize is the cursor
sparkler it seems to cause significant lag as well can you make a full plan to test like you did
for the three.js scene before i compact you and ask you to run that."*

Written to be executed COLD by a session that has been compacted and remembers none of the
three.js pass. Everything needed is here or cited by path. The method is the one that worked on
request #52; where it differs, the reason is stated.

---

## 1. The job

`_javascript/modules/components/mouse-trail.js` (365 lines) draws the night-market sparkler that
follows the cursor. It runs on **every page** of the site, via `initMouseTrail()` in
`_javascript/modules/layouts/basic.js:15`. Rod reports it "causes significant lag". Find out
whether that is true, what it costs in milliseconds, and what can be cut without changing how it
looks.

Same contract as #52: **measure first, propose second, Rod picks.** Minor single-line invisible
fixes may land directly; anything visible or structural becomes a diff plus a measured saving for
his call.

---

## 2. FIRST, TEST THE PREMISE. This can save the entire pass.

**Do not start by profiling the sparkler.** Start by finding which of the site's several mouse
consumers actually costs the time, because moving the cursor on a scene page wakes all of these at
once (MEASURED by grep, 2026-09-02):

| Consumer | Where | Runs on |
|---|---|---|
| Sparkler | `mouse-trail.js:298` (`document mousemove`) | every page |
| Lantern/ember avoidance | `_javascript/lantern-controller.js:37` (`document mousemove` plus a rAF raycast, then per-object ray-plane maths every frame) | scene pages |
| Cursor glow | `assets/js/components/cursor-glow.js` via the shared broadcaster `assets/js/components/cursor-coords.js` (one `pointermove`, one rAF) | every page |
| Card tilt | `_javascript/modules/components/card-tilt.js:38,65` | pages with cards |
| Drift magnet, merged card, achievement wall, portal windows | `assets/js/components/*.js`, `assets/js/effects/portal-windows.js:164,296` | per page |

Rod's attribution is a hypothesis, not a finding. This repo has burned time twice on exactly this
shape (see `docs/TRAPS.md` and the `feedback-verify-the-premise` memory). **If the lag turns out to
be the lantern avoidance raycast or a card-tilt layout read, optimising the sparkler fixes nothing**
and the pass was still worth running.

Deliverable of this step: a per-consumer millisecond attribution, before any sparkler work.

### Check P515 before doing any of this

**A parallel session already dispatched a measuring agent at an overlapping question** and it may
have answered section 2 for free. `docs/REQUESTS.md` row **P515**, Rod: *"my post pages run really
poorly even though they have no three.js scene at all."* Its brief already names the sparkler as a
candidate, along with the cursor glow and its shared rAF loop, the reading progress bar, tocbot,
clipboard, a giscus iframe, and hana-bloom.

A post page is the **cleanest possible read on the sparkler**, since it has no Three.js at all, so
P515 and this plan are measuring the same thing from two directions. **Read P515's findings first.**
If that agent has already attributed post-page cost, start from its numbers instead of re-deriving
them, and reconcile rather than competing: two sessions producing two different answers about the
same cursor is worse than either answer alone.

One prior it flagged that this plan should carry: **`assets/js/components/line-boil.js`** - if it
drives an SVG filter per frame, that is among the most expensive things a browser can do, it runs on
the wordmark on every page, and it would not look like "a scene". Rule it in or out early.

---

## 3. Why the method changes from the three.js pass

The three.js scene was **fragment-bound on the GPU**, so ablation (turn a pass off, watch the frame
time recover) was the right primary tool and a CPU profile would have shown almost nothing.

The sparkler is the opposite: **main-thread JavaScript plus canvas raster, driven by input events.**
So:

- **Primary tool is the CPU profiler, not ablation.** Use CDP `Profiler.enable` / `Profiler.start` /
  `Profiler.stop` while driving the cursor, then attribute self-time by function. That answers "who
  is spending the time" directly, which ablation can only infer.
- **Ablation stays, as confirmation.** A profile says where time goes; an ablation proves what you
  get back.
- **Frame time alone is not the metric.** Rod said "lag", and the file's own comments
  (`mouse-trail.js:272-276`) record a past fight over *input latency* specifically. Measure
  event-to-paint latency as well as frame duration.
- **The page is idle until the mouse moves.** `animate()` stops itself when nothing is alive
  (`mouse-trail.js:246-250`), so a still cursor costs exactly zero. A test that does not move the
  mouse measures nothing at all, and that is the easiest way to get a fake clean result here.

---

## 4. The harness

Reuse the rig from #52. Working copies lived in the session scratchpad as `profile.mjs`,
`ab-test.mjs`, `gate-abab.mjs`; they will be gone after compaction, so rebuild from this spec.
Node 22, no dependencies, headless Chrome over CDP with a raw `WebSocket`.

Launch flags (software rendering is the house method, `project_bloom_and_scene_cost` memory):

```
--disable-gpu --enable-unsafe-swiftshader --use-angle=swiftshader
--headless=new --no-first-run --mute-audio
--disable-background-timer-throttling --disable-renderer-backgrounding
--window-size=1300,900 --remote-debugging-port=<port> --user-data-dir=<temp>
```

Run each condition at **1x and at 4x CPU throttle** (`Emulation.setCPUThrottlingRate`), the
weak-machine proxy. Add one **hardware GPU** pass for reference and one **mobile viewport**
(`Emulation.setDeviceMetricsOverride`, 390x844, dpr 3), because canvas cost scales with pixels.

### Driving the cursor: this is the part that must be right

Use CDP `Input.dispatchMouseEvent` with `type: "mouseMoved"`. **Do NOT use
`element.dispatchEvent(new MouseEvent(...))` from page script.** A synthetic in-page event proves a
handler is attached and nothing else; it does not travel the browser's input pipeline. That exact
mistake already cost this repo two "verified" cursor fixes that did nothing (memory
`feedback-verify-the-premise`). CDP input is delivered by the browser and is the real thing.

Three movement profiles, each held for a fixed sample window:

| Profile | Motion | Why |
|---|---|---|
| `drift` | about 200 px/s, smooth | ordinary reading movement, the common case |
| `normal` | about 800 px/s | moving to a link |
| `scribble` | about 3000 px/s with direction changes | worst case: emission is speed-scaled at `mouse-trail.js:335` and capped at `MAX_EMIT_PER_FRAME` 12 per frame |

Dispatch at a fixed rate (120 events/sec) so runs compare, and record how many events were actually
delivered. Sweep the rate as well (60 / 120 / 240 Hz) for the listener-cost question in section 7.

---

## 5. What to measure

Per condition report **average, minimum, maximum, p50 and p95** (Rod asked for avg/min/max on #52;
p50 and p95 are what expose a dropped frame):

1. **Frame time**, from the rAF delta series.
2. **Sparkler self-time**: profile or wrap `animate()`; ms per frame and share of the frame.
3. **Per-event handler cost**: time inside the `mousemove` listener (`mouse-trail.js:298-341`), and
   separately `sampleColorAsync` (`:283-296`), which runs `elementFromPoint` plus up to six
   `getComputedStyle` reads.
4. **Input latency**: dispatch timestamp to the first frame reflecting the new position. This is
   what "feels laggy" actually means, and frame time will not show it.
5. **Long tasks**, via `PerformanceObserver` on `longtask`: count and worst duration.
6. **Live particle count** over time, so cost is read against real load rather than the 200 cap.
7. **Heap growth**, `performance.memory.usedJSHeapSize` sampled over a 60 s scribble, to catch the
   per-frame string allocation in section 7.
8. **Canvas raster cost**, via CDP `Tracing` if it is cheap to get; otherwise infer it from the
   clearRect and composite ablations.

Pages: **a post** (`none` tier, no WebGL, the sparkler nearly alone, cleanest read), **About**
(worst case, sparkler on top of the 30 fps dock view), and **the portal** (cards, drift magnets and
portal windows all listening).

---

## 6. Attribution and ablation matrix

Profile first, then confirm each with an ablation. How to turn each consumer off at runtime:

- **Sparkler**: `localStorage.setItem('sparkler-disabled', 'true')` then reload. This is the real
  disable path (`mouse-trail.js:76`, key from `_javascript/modules/config/storage-keys.js`), so it
  is a faithful off rather than a hack. Note there is **no user-facing toggle left in the markup**
  (`_includes/top-bar.html:18` records that the switch was removed while the effect stayed), so a
  visitor currently cannot turn it off.
- **Lantern avoidance**: `window.lanternController.avoidanceEnabled = false`, or neuter
  `lanternController.update`.
- **Cursor glow**: remove `.cursorglow` from the DOM, or unregister it from `cursor-coords`.
- **Card tilt**: compare a page with cards against one without, or remove the listeners.

Then ablate the sparkler's own internals to size each suspect: composite `lighter` to `source-over`,
tip streaks off, per-particle stroke replaced by a batched path, full `clearRect` replaced by a
dirty-rect clear.

---

## 7. Suspects from the code read (2026-09-02, MEASURED by reading the file)

Ranked by how likely they are to matter. The profile decides; this is where to look first.

1. **Up to 200 separate `stroke()` calls per frame.** `mouse-trail.js:203-211` gives every particle
   its own `beginPath` / `moveTo` / `lineTo` / `stroke`, and `MAX_PARTICLES` is 200 (`:13`). In
   Canvas2D each stroke with changed state is its own draw. The classic canvas trap, and the first
   thing to measure.
2. **A new colour string per particle per frame.** `:207` builds an `rgba(...)` template string
   inside the loop, so a full pool allocates 200 strings every frame, roughly 12,000 a second, pure
   GC churn. The file's header claims "Ring buffer pool for zero GC", which is true of the particles
   and not of their colours.
3. **Per-particle state changes.** `strokeStyle` (`:207`) and `lineWidth` (`:208`) are set per
   particle, which defeats batching even if the paths were merged. Any batching fix has to handle
   alpha and width varying per particle; there are only three colour bands (`:195-201`), so
   bucketing by band is the obvious shape.
4. **A full-viewport clear plus additive blend every frame.** `:165` clears the whole canvas and
   `:166` sets `globalCompositeOperation = "lighter"`, on a fixed full-screen canvas at
   `z-index: 500` with `alpha: true` (`:81-84`). That is a screen-sized compositor layer blended
   every frame for an effect covering a few hundred pixels near the cursor. A dirty-rect clear is
   the obvious cut and needs care: particles fall under gravity and tip streaks reach about 22 px,
   so the rect must bound real motion.
5. **`clearTimeout` plus `setTimeout` on every single mousemove.** `:301-302`. At a 240 Hz mouse
   that is 480 timer operations a second to maintain an idle flag; a timestamp comparison does the
   same job with no allocation.
6. **Colour sampling forces style work.** `sampleColorAsync` (`:283-296`) runs
   `document.elementFromPoint` then up to six `getComputedStyle` property reads (`findWarmColor`,
   `:32-53`). It is already throttled to 100 ms and 12 px and deferred to rAF, which was a
   deliberate past fix, so **verify before touching it** and measure the throttle's real hit rate
   rather than assuming.
7. **Tip streaks add 5 to 10 more strokes per frame** while the cursor moves (`:216-243`).
8. **The canvas is sized in CSS pixels, not device pixels** (`:125-126`). Cheap to draw and blurry
   on a HiDPI screen, since the compositor upscales it. A quality observation rather than a cost
   one, and worth knowing before someone "fixes" it into a 4x more expensive canvas.

Explicitly NOT a suspect: idle cost. The loop stops (`:246-250`).

---

## 8. A/B protocol for any proposed fix (the refinement that mattered on #52)

Cross-run comparison is not trustworthy on a throttled machine: background load changes between
runs, and on #52 that produced a headline claim that did not reproduce. **Use within-load
alternation.**

For each candidate: one page load, then sample **A / B / A / B**, alternating the change on and off
at runtime, and report the mean of each. Include a **control** condition that changes nothing, to
size the drift. On #52 the control drifted 0.4 ms at 1x and 0.04 ms at 4x, which is what made the
real gains believable.

Once a fix is applied to source, **re-measure the built bundle**, not the runtime patch. On #52 the
patch and the shipped build disagreed on one headline and only the rebuild caught it.

**Frame time is vsync-quantised.** A change moving the typical frame from 33.3 ms to 16.7 ms has
crossed the 60 fps deadline, which is a step function depending on how close the machine already
was. Report milliseconds as the result and the fps flip as a consequence, and never claim a flip
that reproduced on only one run.

---

## 9. Traps carried forward

- **Check the dev server is alive before trusting a run.** A whole 15-condition pass on #52 returned
  "scene never ready" for every condition because a Jekyll server from another session had died.
  Assert an HTTP 200 and the expected bundle bytes first.
- **Another session may be working in this repo.** Check `git status` and unpushed commits before
  committing, and scope commits to your own files.
- **Rebuild after touching `_javascript/`**: `npm run build:js`. `assets/js/dist/` is machine-owned
  and gitignored; CI rebuilds it. Never hand-edit it, never commit it.
- **Rod is the eyes.** Never confirm a visual by screenshot. Make the change, link `localhost:4000`,
  ask what he sees.
- **`npm test` is the gate**: eslint, stylelint, and the load-order checker.
- **Comments cap at 2 lines** (`docs/CONVENTIONS.md`), and D5 says a fix that adds code has to
  justify itself against what it measures.

---

## 10. Deliverables

1. A per-consumer attribution table answering the premise question in section 2.
2. Sparkler cost with avg / min / max / p50 / p95, at 1x and 4x, on a post page, About and the
   portal, plus the mobile viewport and a hardware reference.
3. Input latency numbers, since that is what "lag" means.
4. Two or three coded options per real problem, each with the diff, the measured saving from the
   A/B, and the visible consequence. Duds recorded as duds so nobody re-proposes them.
5. Anything invisible and single-line may land directly, with its numbers.
6. Docs synced per CLAUDE.md: CHANGELOG, REQUESTS, this file's status, and a todo row.

---

## 11. Run order

1. Confirm the server, bundle freshness and `git status`.
2. Build the harness, or restore it from this spec.
3. **Premise check first**: profile every mouse consumer on About and the portal. If the sparkler is
   not the cost, stop and report that before going any further.
4. Sparkler cost across pages, viewports, throttles and movement profiles.
5. Fan out read-only agents for the static analysis and the solution options, in parallel with the
   measurement work. Measurement itself stays serial, because parallel profiling on one CPU is
   worthless.
6. A/B every candidate within-load; rebuild and re-measure anything applied.
7. Report, sync docs, let Rod pick.
