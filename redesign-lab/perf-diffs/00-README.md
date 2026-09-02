# Perf audit proposals (request #52, 2026-09-01)

Each file is one problem the audit measured, with 2-3 coded solution options for Rod to pick
from. Nothing here is applied. The five minor fixes that WERE applied (his "minor single line
changes you may just change them" rule) are listed in the todo board's PERF AUDIT section and
in `docs/REQUESTS.md` #52.

How the numbers were measured: headless Chrome driven over CDP against localhost:4000,
software WebGL (SwiftShader = hardware acceleration off) with and without a 4x CPU throttle,
plus an RTX 3080 hardware pass for reference. Milliseconds per frame, not fps. Harness + raw
JSON: the session scratchpad (`profile.mjs`, `results-*.json`).

**MEASURED A/B (2026-09-01):** every option was runtime-patched into the live page and measured
against a same-load baseline (SwiftShader, 1x and 4x CPU throttle; control drift 0.4 / 0.04 ms).
Winners: the **ripple gate** (now SHIPPED - Rod approved); **shells-out-of-reflection** OR
**trail 5** each kill the burst frame-drop (p95 33.3 -> 16.8); **cheap-bleed** +1.25 ms. Duds:
far-water octave (nothing, withdrawn), and the buffer-shrink preset as first specced (nothing at
the dock - revised in 08). Each doc carries its measured block up top.

**One correction worth reading before trusting any "back to 60 fps" line:** re-measured on the
shipped build, the ripple gate is +3.8 ms at 1x (where the dock's typical frame does return to
16.7 ms) and +2.6 ms at 4x (where it does not cross the deadline). The milliseconds reproduce
everywhere; the 60 fps flip only happens when the machine is already close to the line.

| file | problem | headline |
|---|---|---|
| 01-one-bundle-honest-tiers.md | 8 page types download the full 843 KB bundle + FBX + fireworks they were never given | bytes + spikes on portal/projects/ramblings; VISIBLE changes, his call |
| 02-correctness-trio.md | water runs on frames not time; lanterns dodge a phantom cursor; ember scroll mapping goes stale after rotate | three behaviour fixes, options each, ~+2 lines total |
| 03-fireworks-spike-diet.md | bursts spike frames to 33-50 ms (99.9 ms throttled portal) | layers exclusion / trail count / program pinning + cap |
| 04-water-fragment-cuts.md | the dock view runs at 30 fps without a GPU; water shader is the biggest term | ripple-loop gate (free), 3-tap slope, far-water octave drop |
| 05-dead-code-batch.md | provably-dead code incl. a 259 KB texture fetched and never sampled | conservative/aggressive diffs per group, zero pixel change |
| 08-adaptive-quality.md | no degrade path exists: identical work for an RTX 3080 and SwiftShader | boot-time weak-machine preset + the missing reduced-motion path (D21) |
| 09-bloom-composite.md | bloom's full-res composite is ~89% of its fetch cost | pass-merge and paper-fetch options |

(06/07 were folded into 02; the old 04 ripple-gate card grew into the full water doc.)
