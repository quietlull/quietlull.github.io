# Comments removed from `assets/js/components/achievement-wall.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `export const ACHIEVEMENTS = [`

```text
achievement-wall - catalogue + detail.

  Ported from `redesign-lab/extracted/components/achievement-wall/` on 2026-08-26. One thing
  changed on the way over: the lab's DEMO_UNLOCKED and DEMO_PROGRESS are gone and the wall now
  reads the visitor's real state out of localStorage, which is what `achievements.js` writes.

  ROD'S INTERACTION MODEL, 2026-08-24, verbatim:
    "hovering should show the last hovered achievement's text on the right, clicking the
     achievement should force its border to shine and activate it."

  So HOVER and CLICK are two different gestures doing two different jobs, and that is what makes
  the thing readable: you can inspect all 29 without ever changing what the scene is doing. An
  earlier draft had click doing both, which meant you could not look at a tile's details without
  toggling its effect on and off.

  "LAST hovered" is load-bearing. The panel does NOT clear on mouseout - a panel that blanked every
  time the pointer left a 64px square would be unreadable, and he said "last hovered", not
  "hovered". Keyboard focus feeds the same channel, so a tab-through reads identically to a
  mouse-over rather than being a second, lesser path.

  WHAT IS REAL HERE AND WHAT IS NOT, because a demo that fakes things is worse than no demo:
    - The 29 achievements ARE the live site's, copied from `_javascript/modules/components/
      achievements.js` (that file is off-limits to edit under D22, so this is a transcription).
      Counts match the blockout exactly: explorer 7, reader 6, interactor 8, secret 3, meta 5.
    - `unlocked` and `progress` here are DEMO VALUES, marked as such. The real ones live in
      localStorage under `rod-achievements` and are per-visitor.
    - ACTIVE state is genuinely new - the live data model has `unlocked` (earned) but nothing for
      active (toggled). Earned and switched-on are different axes.
    - The Three.js hook does NOT exist and nothing here pretends it does. No stub function, no
      comment promising one. D34 says scene state has to persist across pages and 19b is still
      open, so writing a fake hook now would be inventing a contract.
```

### Line 35, above `{ id: 'first-light', cat: 'explorer', title: 'First Light', icon: '\u{2600}', desc: 'Welcome to the portfolio!`

```text
SUN, not the lantern. Rod 2026-08-24: "first light should use a sun emoji". It also clears a
    real defect: the lantern was shared with `lantern-tapper`, so on an icon-only wall those two
    tiles were pixel-identical and only the tooltip told them apart.
```

### Line 55, above `{ id: 'touched-my-fly', cat: 'interactor', title: 'Hey, You Touched My Fly!', icon: '\u{1F99F}', desc: 'Caught`

```text
MOSQUITO, and the choice between his two options was settled by measurement, not taste.
    Rod: "fly should use a fly or mosquito emoji". The beetle was rendering as TOFU on his own
    machine - and so does the FLY, U+1FAB0, because both are Unicode 13.0 and his Windows emoji
    font predates that block. Rasterised at 48px and compared against a known-missing control:
    fly and beetle are byte-identical to it, 0 coloured pixels, same 30.98 advance. The mosquito
    is Unicode 11.0 and renders (65.91 advance, 280 coloured px). Taking the fly would have
    swapped one empty box for another.
```

### Line 79, above `const EARNED_KEY = 'rod-achievements';`

```text
THE VISITOR'S OWN STATE, read from the same key `achievements.js` writes (STORAGE_KEYS.
  ACHIEVEMENTS). The lab shipped a hard-coded 15-of-29 demo set here, which is the right call on a
  bench page and a lie on the live site.

  PROGRESS IS DERIVED, not stored. `achievements.js` keeps raw counters - lanternKnocks, tagsRead,
  fireworkCount - and computes `[current, target]` per achievement at render time. The same eleven
  records are computed here from the same fields, so the wall and the old trophy case can never
  disagree about a number. The other 18 are booleans with no scale and report earned or not.
```

### Line 94, on the line `return {};`

```text
private mode, disabled storage, or corrupt JSON - show everything locked
```

### Line 119, above `function tierFor(cur, target) {`

```text
TIERS. Rod 2026-08-24: "make it go silver > gold > prismatic like in TFT."
  Thresholds are proportions of the achievement's own target, so a 10-lantern goal and a 100-lantern
  goal tier at the same felt progress rather than at the same raw count.
```

### Line 139, above `const name = a.title;`

```text
THE NAME IS ALWAYS SHOWN NOW, locked or not - Rod: "For locked ones give them just the name".
    This changes what the live site does for the three SECRET achievements, which render `???`
    until earned (`achievements.js:243-245`). His instruction says "do this for all achievements",
    so the later call wins, but it is a real behaviour change and not a styling one.
```

### Line 145, above `const p = progressFrom(earnedState, a.id);`

```text
PROGRESS. Only 11 of 29 records carry a progress function; the other 18 are booleans with no
    scale, so they report earned/not rather than inventing an "0 / 1".
```

### Line 152, above `progress = '<div class="aw__val">' + p[0] + ' / ' + p[1]`

```text
The numbers first, then the criterion on its own line. An earlier version appended the
      achievement's own `desc` to the fraction and produced "25 / 50 knocked 50 lanterns" - the
      target said twice, once as a number and once as a sentence.
```

### Line 165, above `const flavor = '<div class="aw__val aw__val--empty">No flavor text available</div>';`

```text
FLAVOR AND EFFECT READ THE SAME ON EVERY ACHIEVEMENT, locked or earned. Rod 2026-09-02:
    "change all the flavor text in the achievements to 'No flavor text available' and all effects
    to 'No effects'". This overrides two earlier calls of his, both worth naming rather than
    quietly dropping: the redaction he asked for ("same amount of characters as real text but all
    in ?") is gone, since a fixed string has no shape to hide; and the four `reward` values stop
    being shown. Those were internal slugs (`auto-fireworks`, `lantern-shape`, `lantern-color`,
    `lantern-panel`), never display prose, and nothing outside this file reads them, so the field
    stays in the data as a record of intent. Restoring either behaviour is a local change here.
```

### Line 186, above `const ACTIVE_KEY = 'rod-achievements-active-v1';`

```text
ACTIVE STATE IS MULTI-SELECT AND IT PERSISTS. Rod 2026-08-24: "more than one can be active and
  they persist its like an Easter egg for those who decide to explore my page."
  That settles both open questions at once and it changes what this is. A picker would be a control
  panel; a set of independent switches that survive a reload is something you accumulate over
  visits, which is what makes it an easter egg rather than a settings screen.
  So persistence is not a nicety here - an easter egg that forgets itself on refresh is not an
  easter egg, and a demo without storage would be demoing the wrong thing.

  SEPARATE KEY, deliberately. The live site stores EARNED achievements under `rod-achievements`
  (`_javascript/modules/config/storage-keys.js:10`). ACTIVE is a different axis from EARNED, and
  writing into that object from the lab risks corrupting real unlock state Rod has accumulated.
```

### Line 203, above `if (!Array.isArray(ids)) return new Set();`

```text
Must be earned as well as real. Pins were saved against the lab's demo unlock set; live reads
      the visitor's own, so a pin can outlive the unlock that allowed it and come back on a locked
      tile. A locked achievement is never active.
```

### Line 209, on the line `return new Set();`

```text
private mode, disabled storage, or corrupt JSON - degrade to nothing on
```

### Line 214, on the line `try { localStorage.setItem(ACTIVE_KEY, JSON.stringify([...set])); } catch {  }`

```text
nothing to do
```

### Line 227, above `cat.innerHTML = CAT_ORDER.map((c) => {`

```text
build the catalogue, grouped, in the blockout's category order
```

### Line 233, above `const label = a.title + (unlocked ? '' : ' (locked)');`

```text
NAMES ARE SHOWN EVEN WHEN LOCKED - Rod: "For locked ones give them just the name". The
          secret ones lose their `???` masking as a result, which the live site does apply
          (`achievements.js:243-245`); his "do this for all achievements" is the later call.
```

### Line 237, above `/* the tier is put ON THE TILE, not just computed for the panel - Rod 2026-08-24:`

```text
aria-disabled, NOT disabled. A `disabled` button cannot be hovered, focused or tabbed to,
          which had silently pulled 15 of 29 tiles out of the keyboard and made more than half the
          wall unreadable. This announces "unavailable" while keeping the tile reachable; the click
          handler is what refuses the toggle.
```

### Line 241, above `const pr = progressFrom(earnedState, a.id);`

```text
the tier is put ON THE TILE, not just computed for the panel - Rod 2026-08-24:
          "prismatic cards get the prismatic text but not borders can you change that as well".
          Same function the panel uses, so the edge and the label can never disagree.
```

### Line 250, above `+ '<i class="aw__on" aria-hidden="true">&#9733;</i>'`

```text
the project card's pinned badge glyph, reused rather than redrawn - the same BLACK STAR
            it renders at `project-cards-expensive.html:23`.
```

### Line 267, above `cat.addEventListener('pointerover', (e) => {`

```text
Hover AND focus feed the same channel, so tabbing reads exactly like pointing. No mouseout
    handler on purpose - "last hovered" means the panel holds.
```

### Line 281, above `if (t.getAttribute('aria-disabled') === 'true') { read(t); return; }`

```text
A locked achievement still READS on click, it just does not toggle. Refusing here rather than
      with the `disabled` attribute is exactly what lets it stay hoverable and tabbable.
```

### Line 287, on the line `saveActive(active);`

```text
without this the easter egg forgets itself on reload, which is the
                              one thing it must not do. Caught by measuring storage after a click
                              rather than by reading the code back.
```

### Line 292, on the line `read(t);`

```text
clicking also reads it, so the panel always describes what you just touched
```

### Line 295, above `const TILT_DEG = 8, TILT_LIFT = 1, TILT_SCALE = 1.02, TILT_PERSPECTIVE = 170;`

```text
THE TILT. Rod 2026-08-24: "make the achievement cards also have the card tilt."
    Ported from `merged-card.js:8-12, 35-44, 72-115`, delegated on the catalogue rather than bound
    29 times. The angles are carried UNCHANGED because degrees are scale-free; the two PIXEL terms
    are not, and both are scaled by the size ratio 64/376:
      perspective  1000px -> 170px   (1000 * 64/376 = 170.2)
      lift            6px ->   1px   (6 * 64/376 = 1.02)
    That ratio is not a guess. Apparent depth is `half-size * sin(angle) / perspective`: the card
    gives 188*sin8/1000 = 0.0262, and holding that at 32px half-size needs 170px. Left at the
    card's 1000px a 64px tile projects 1.0147 against the card's 1.0385 - the depth simply is not
    there. At 170px the two measure 1.0385 / 1.0377, the same card.
    `perspective()` INSIDE the transform rather than on a parent, deliberately: the project card's
    perspective sits on the card itself so each one has its own vanishing point at its own centre.
    A shared perspective on the row would give one vanishing point at the row's middle and fisheye
    the tiles at either end.

    PROVENANCE, stated because it is not clean: the tilt has NO external source. `merged-card.js:1`
    cites `rework-harumaki.html`, a file in this repo, and nothing in `sources/` mentions tilt. So
    this is internal reuse and needs a ledger row saying exactly that - the same shape as the
    portal-window row, which says outright "internal reuse, NOT an external citation". Idea origin
    ROD, since he asked for it.

    KEYBOARD: pointer only, and that is a real gap rather than an oversight. Pointer position has
    no keyboard equivalent, and the wall is otherwise the one component here where tabbing reads
    exactly like hovering. Flagged for Rod rather than decided - a fixed small angle on focus would
    work, but inventing one is a design call.
```

### Line 329, above `tiltEl.style.transform = 'perspective(' + TILT_PERSPECTIVE + 'px)'`

```text
The tilt no longer knows the hover scale exists - Rod 2026-08-25, transform-lane rule. It used
      to read `.aw--scale` off the host and fold 1.3 in by hand, because both wrote `transform` and
      the later write won. The hover now owns the `scale` property and this owns `transform`, so
      they compose without either being aware of the other.
```

### Line 355, above `t.style.transition = 'transform .4s ease-out';`

```text
the slower easing on the way out is the card's own asymmetry, .15s in and .4s out
```

### Line 361, above `/* THE LAP TIME IS READ FROM '--aw-orbit', NOT HARD-CODED. It was 2800 in JS, and that was a live`

```text
THE ORBIT. Active tiles walk their glow around their own border. This lives here rather than in
    a CSS keyframe because animating a custom property needs it REGISTERED, and the `@property`
    rules parse but do not register in this Chrome - measured, the glow sat on the 0% stop and never
    moved. See the note at the top of achievement-wall.css.
    It runs ONLY while something is active and cancels itself when nothing is, so an untouched wall
    costs no frames at all.
```

### Line 367, above `const ORBIT_MS = (parseFloat(getComputedStyle(host).getPropertyValue('--aw-orbit')) || 2.8) * 1000;`

```text
THE LAP TIME IS READ FROM `--aw-orbit`, NOT HARD-CODED. It was 2800 in JS, and that was a live
    defect the moment the orbit moved out of CSS: the tuner still offered a "how long one lap takes"
    dial, the copy-out still emitted `--aw-orbit`, and NOTHING consumed it - Rod's first tune set it
    to 5s and it would have changed nothing at all, silently. A dial that does nothing is worse than
    no dial, because the export carries it into the file as if it worked.
```

### Line 376, on the line `const phase = (t % ORBIT_MS) / ORBIT_MS * 4;`

```text
0..4, one unit per edge
```

### Line 378, above `const pts = [[0, 0], [100, 0], [100, 100], [0, 100], [0, 0]];`

```text
the four corners, so the light tracks the edge the rim is actually drawn on
```

### Line 392, above `let stop = () => {};`

```text
THE RIM. One shared window pointermove + one rAF via cursor-coords, the same broadcaster the
    project cards use, rather than a second listener and loop of our own.
```

### Line 399, on the line `if (tile.getAttribute('aria-pressed') === 'true') continue;`

```text
active tiles hold their own centre
```
