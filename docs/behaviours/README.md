# Behaviours: how the site's effects are built

Rod, 2026-10-11: *"the point of splitting everything is to keep easy to use and especially reuse
elements across many web elements and pages."* And: *"the object containing the multiple
behaviors should be in charge of how they interact with each other."*

## The rules

1. **One behaviour, one file, one class.** `assets/js/behaviours/drift.js` is switched on by the
   class `drift`. A behaviour that needs no script is a class in
   `_sass/components/_behaviours.scss` and nothing else.
2. **A behaviour knows nothing about any other behaviour, or about any component.** It produces a
   value (an offset, a position, a state class) and stops.
3. **The component decides.** Its stylesheet sets the behaviour's numbers, and decides how two
   behaviours combine. Example: `magnet` overrides `drift`, by one `translate` rule.
4. **Markup lists behaviours.** `<a class="dm-social border-break orb-fill drift magnet">`. No
   tuning numbers in the markup.
5. **`assets/js/site-wide.js` starts every behaviour on every page.** A page uses one by adding
   its class. Measured cost for two behaviours: 4 KB, at most 1.2 ms.

## What exists

| Class | Kind | Produces | Settings a component may set |
|---|---|---|---|
| `drift` | script | `--drift-x`, `--drift-y`, class `is-drifting` | `--drift-distance-x`, `--drift-distance-y` (6px), `--drift-speed` (1) |
| `magnet` | script | `--magnet-x`, `--magnet-y`, `--magnet-amount`, class `is-pulled`. Moves a `magnet-inner` child. | `--magnet-pull` (40), `--magnet-inner-pull` (20), `--magnet-limit` (0 = none) |
| `tilt` | script | `--tilt-rotate-x`, `--tilt-rotate-y`, class `is-tilting`. Leans toward the mouse, or with a phone. | `--tilt-max` (8) |
| `dwell` | script | class `is-dwelled` once the mouse has rested; draws the filling ring | `--dwell-time` (0.9s) |
| `border-glow` | script | `--border-glow-x`, `--border-glow-y`: the mouse position relative to the element | none |
| `hover-play-video` | script | plays the video inside while hovered, rests on a still frame | none |
| `orb-fill` | stylesheet | a circle that rises to fill the element on hover | `--orb-fill-color`, `--orb-fill-time`, `--orb-fill-rest`, `--orb-fill-hover` |
| `border-break` | stylesheet | the edge moves out and fades, a glow comes up | `--border-break-edge`, `--border-break-rest` |

**The project card has no script of its own.** Its markup lists `drift magnet tilt dwell
hover-play-video` and its stylesheet, `_sass/components/_project-card.scss`, decides the lift, the
grow and the flip. How it was split and proved: [project-card.md](project-card.md).

**Still to do:** the achievement wall has its own copy of the tilt and the glow, and the tags have
their own copy of the border break. Moving the wall changes three things a visitor can notice, so
it waits on Rod (see the hand-off at the end of [project-card.md](project-card.md)).

## How a script behaviour is written

Read `assets/js/behaviours/drift.js` and `magnet.js` first. They are the pattern.

- It exports one function, `initName(root = document)`.
- It finds its elements by its class under `root`.
- It reads its settings once per element with `getComputedStyle(element).getPropertyValue(...)`.
- It writes values as custom properties and a state class (`is-...`) on the element. It does not
  write `transform`, `translate` or any other finished style. The stylesheet does that.
- It returns early when the visitor's system asks for reduced motion, if it moves things.
- Its per-element record holds only what the loop needs between frames. Rod questions every field.
- No comments. Plain names, no abbreviations.

## How values are declared

At the top of `_behaviours.scss`, one line per value:

```scss
@include value(--magnet-pull, '<number>', 40);
```

That registers the value with a default and stops it passing down to children. Without it a tag
inside a card would inherit the card's numbers. A value that a child must read from its parent
(a card telling its tilting layer how far to tilt) is declared the same way but inheriting, or
left unregistered. Say which, and why, in the report.

## Proving a change

Nothing a visitor can see or feel may change unless Rod asked for it. Prove it, in this order:

1. **Before you change code, make the checks able to see it.** If `tools/behaviour-check.mjs`
   reads something your change will move (an inline style that becomes a stylesheet rule), change
   the check first so it reads the browser's computed value, and show its output is identical on
   the old code. Commit that alone. Then change the code.
2. `node tools/behaviour-check.mjs out.json`, normal and `reduced`. Capture twice before you start.
   Byte-identical before and after, or every difference explained.
3. **How it looks is Rod's to check, never a picture's.** No screenshots and no pixel
   comparisons, as proof or at all. Write him a short list: the page, what to do, what he should
   see. Rod, 2026-10-11: "We have established many times that pictures dont work and you should
   ask for manual review when needed."
4. `node tools/page-fingerprint.mjs capture ... --styles`, compared with `--ignore-classes` when
   class names changed.
5. `node tools/check-workbench.mjs`: 0 problems.
6. `npm test`. The load-order check files deliberate overrides under an element's class list
   (`classes:` in `tools/css-order-check.mjs`). When a class list changes, update that string and
   nothing else in the tool.
7. **Search the whole tree for an old name, every file type.** `assets/404.html` is outside the
   template folders and has been missed twice.

## What went wrong so far, so it is not repeated

- A tool that compared pictures before and after was built, used as proof and cited to Rod. Its
  "hovered" pictures were not hovered, and he does not accept pictures as proof in any case. The
  tool is deleted. Looks are checked by Rod.
- `git add` with one missing path stages nothing and says so only on the error stream. Never hide
  it. Check `git show --stat HEAD` after each commit.
- A file removed with `git rm` is already staged. The next commit takes it, whatever that commit
  was meant to be.
