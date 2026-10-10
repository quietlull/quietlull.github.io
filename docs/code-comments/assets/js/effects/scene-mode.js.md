# Comments removed from `assets/js/effects/scene-mode.js`

The review page for this file shows these beside the code. Line numbers are the file as it was
when each batch was removed.

## Removed 2026-10-10, from the file at commit e1b1351

### Line 1, above `/* Names verified by traversing the live scene graph, not guessed from the FBX:`

```text
Scene tiers.
  Ported from `redesign-lab/effects/scene-mode.js` on 2026-08-25. The mechanism below is that
  file's, verbatim; only WHERE THE TIER COMES FROM changed, and that change is explained at the
  bottom.

  ROD, P72 (2026-08-22): "for projects, portal, and ramblings please do a scene with only lanterns,
  the fireflies, and post processes this will become our minimal so about and landing have full,
  anything that wants the scene can keep minimal and none will be the blobs."

  THE TIERS, as he defined them:
    full     lanterns + fireflies + post-processing + DOCK + WATER
    minimal  lanterns + fireflies + post-processing, nothing else
    none     no three.js at all - the hana bloom is the whole background
  The earlier `bare` and `blobs` modes are GONE. He scrapped blobs by name, and `bare` (embers
  only) was a comparison rung, not one of his tiers.

  HOW, WITHOUT A SECOND THREE.JS. Adding FBX lanterns to the minimal bundle would need FBXLoader
  from a CDN, which drags in a second copy of three, and meshes built by one copy do not reliably
  work with the other. Instead the FULL scene - which already has the real lantern models, the real
  shader and the real post chain - has its dock and water hidden. Same assets, no extra download,
  no version skew.

  THIS IS STILL A DEMO, NOT THE END STATE, and that is worth repeating now it is on the live site.
  The honest version is to add the lantern load to `_javascript/three-background-minimal.js` so the
  minimal bundle stops shipping 525 KB to draw 35 spheres, then serve the two bundles by tier.
  That is a Rollup rebuild and it was not done on merge night. Anyone who finds a `visible = false`
  in production and wonders what it is doing: this is what it is doing.
```

### Line 30, above `const DOCK = /^DockGroup/;`

```text
Names verified by traversing the live scene graph, not guessed from the FBX:
    Group:DockGroup1 · Mesh:WaterFace · Group:Lanterns1 + Mesh:Lantern* / Mesh:RoundedLantern*
  The FIREFLIES are the ~25 unnamed meshes the scene spawns for ember drift. They are deliberately
  NOT matched here - nothing touches them, so they survive in both tiers, which is what "lanterns,
  the fireflies, and post processes" asks for. Post-processing is the composer and is never
  touched either.
```

### Line 40, above `function setWater(mesh, wanted) {`

```text
Water will NOT stay hidden via `visible`. three's Reflector rewrites that flag every frame as
  part of its own render pass - it hides the mesh, renders the reflection, restores it - so
  anything written from outside is gone by the next tick, silently. Measured: dock and lanterns
  obeyed immediately and only water refused. `material.visible` sits outside that cycle and holds.
```

### Line 59, on the line `else if (LANTERN.test(o.name)) o.visible = true;`

```text
lanterns are in BOTH tiers
```

### Line 65, above `const override = (/[?&]scene=(full|minimal|none)/.exec(location.search) || [])[1];`

```text
THE TIER COMES FROM THE PAGE, NOT FROM A PATH LIST. The lab version keyed a hardcoded map on
  `location.pathname`, which worked there because the lab is six files with six fixed URLs. The
  live site is not: posts, tags, archives and every section multiply the URL space, and a map like
  that would silently default half the site to `full` and quietly ship the dock everywhere.
  `_layouts/default.html` writes the tier onto <body> from the LAYOUT, which is the thing the tier
  is actually a property of, and this reads it. One place to change it, and it is Liquid, not JS.
```

### Line 92, above `if (tier !== 'none' && tier !== 'embers') {`

```text
`none` pages never load the bundle at all, so there is nothing to wait for and no timer to
  start. Returning here rather than letting the poll below run and time out is the difference
  between a post page doing nothing and a post page polling ten seconds for a scene that is
  never coming. `embers` pages (the 404) skip for the mirror reason: their bundle spawns only
  unnamed ember meshes, so the lanterns/dock/water stop condition below can never be satisfied
  and the poll always burned its full ten seconds (measured at 30 fps on a throttled CPU).
```

### Line 99, above `let tries = 0;`

```text
The bundle is deferred and the FBX lands later still, so one pass at load would find an empty
    graph. Re-apply until the tier is satisfied, then stop - and cap the attempts so a page whose
    scene fails to load does not leave a timer running.
```

### Line 106, above `const satisfied = tier === 'full'`

```text
The stop condition has to be the SATISFIED STATE, not "the lanterns exist". Lanterns and dock
      are two separate FBX loads and the lanterns win the race, so waiting on lanterns alone stopped
      the loop before `DockGroup1` was in the graph - the dock then arrived visible and nothing ever
      hid it. Measured on the lab's minimal pages: 41 lanterns found, dockHidden 0, waterHidden 0.
```
