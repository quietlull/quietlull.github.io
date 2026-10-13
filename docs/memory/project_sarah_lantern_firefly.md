---
name: project-sarah-lantern-firefly
description: "SARAH track: the lantern/ember avoidance rework (kind-tagging + direct displacement field) — shipped to _javascript/ 2026-06-15, uncommitted. Knobs + re-tune caveat."
metadata: 
  node_type: memory
  type: project
  originSessionId: d0c58552-18a2-49ae-b75d-2ee8211fe4c8
  modified: 2026-08-11T18:29:40.050Z
---

# SARAH — lantern avoidance rework (compressed log; full step history in git + old transcripts)

Agent identity in Rod's multi-agent fork (Bob=water, Jane=fireworks, Hana=character). Scope = the LIVE Three.js lantern + ember scene. Edits to `_javascript/` three-bg source need `BUILD=production npx rollup -c` before they show (pages load `/assets/js/dist/*.min.js`).

## What shipped (2026-06-15, ported to `_javascript/`, NOT committed as of then)

Rework of `lantern-controller.js` + `three-config.js`, built step-by-step in `redesign-lab/lantern-lab.html` (Sarah's isolated venue) with Rod approving each step, knock behavior kept byte-identical:

1. **Kind tagging** — objects tagged `userData.kind` ('lantern'|'ember') once at add; no per-frame `geometry.type` string checks. Click handler REMOVED (Rod: unreachable).
2. **Parting = direct displacement field** — the gentle push is no longer a per-frame force accumulator; each frame sets a direct `fieldTarget` (old equilibrium magnitude) and `fieldOffset` lerps toward it. `avoidanceOffset` now carries ONLY the knock impulse. Verified equal magnitude to the old feel (1.853 = baseline).
3. **Layer B local push** near the cursor + squared-distance reject (`_addParting` helper).

**Rod-tuned values** (lab scale): proximityRadius 1000, avoidanceStrength 2, returnSpeed 0.05, rotationStrength 0.06, localRadius 90, localStrength 50.

## Durable caveats + open items

- **SCALE CAVEAT:** radii are world-units; the real scenes differ (about dS=3 vs general/minimal dS=1), so radii/strengths need a live RE-TUNE. Console knobs: `window.lanternController.config.lanterns.avoidance.*`.
- **No perf win and none expected** — measured A/B: -0.3% = noise; the controller was never the bottleneck (bloom + shaders are). The rework's value is correctness/maintainability. See [[feedback-anti-bloat]].
- Deferred (knock changes, separate round): ember-knock-radius shrink (Rod's original ask), per-kind localRadius.
- First lesson of the track: reworking all-at-once on the LIVE site broke knock and got reverted; the step-by-step lab process above is the way.
