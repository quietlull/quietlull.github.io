# Dead ends

Attempts that died and why. Do not re-litigate without new information. (The Underworld project's
version of this table killed hours of repeated re-suggestion - keep it honest and specific.)

| Attempt | Why it died |
| --- | --- |
| `-warm` keyframe variants for breathing colors | Every color needed its own copy of every keyframe; replaced by `--breathe-hue` / `--breathe-border-hue` CSS variable overrides. Any surviving `-warm` keyframe is a leftover ([BREATHING.md](BREATHING.md)). |
| `GLASS_SELECTOR` list in `mouse-trail.js` | A second manually synced selector list just for the sparkler; replaced by `animationName` auto-detection (itself slated for `data-breathing` in Phase 2). |
| Autonomous mass design generation (4 full site designs, 2026-08-09) | Produced AI slop: no see-and-adjust loop (agent is screenshot-blind) and fan-out diluted coherence. Design work is one small piece at a time, Rod as the eyes ([DECISIONS.md](DECISIONS.md) D7). |
| Wander/exploration navigation ("night market you explore") | Rod's reframe: aliveness = interesting elements on a NORMAL, openly laid out page; interaction is not exploration. Keep the festival aesthetic, drop the wander. |

Format: one row per attempt; the "why" names the mechanism, not just the verdict. If an attempt is
half-dead (works but rejected on taste/complexity), record that distinction - it may be revivable
under different constraints.
