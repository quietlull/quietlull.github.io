# Traps

Symptom-first: the symptom is what you search for when it bites. Each entry: how it presents ->
the real cause -> what to do. Add entries when something costs real time and is not inferable from
the code.

**A reference-site screenshot comes back empty, cut short, or with the navbar repeated down it ->**
plain `chrome --headless --screenshot` fires at the load event, long before lazy images and
scroll-reveals arrive, so most of the page never paints. Four distinct causes, all solved by the
`web-preview` skill (`~/.claude/skills/web-preview/`, user-level, NOT in this repo): (1) no wait for
network idle; (2) `captureBeyondViewport` paints the ground but not the content; (3) setting the
viewport to full page height re-lays-out sites that size sections in `vh`; (4) some sites scroll an
inner `overflow:auto` container, so `window.scrollTo` never moves them. The rule that matters:
**a page that looks like an empty background almost certainly did not finish loading - verify a
contact sheet of mid/last screens before using any capture.**

**A selector matching an element by its inline `style.background` silently never fires ->** the
browser normalises CSS shorthand back out on write, so what JS set is not what JS reads. The scene's
vignette is written as `radial-gradient(ellipse at center, ...)` and reads back as
`radial-gradient(transparent 0%, ...)`, because `ellipse at center` is the default. Match on a
distinctive non-default fragment, or on structure (bare body-level div, no id or class). Same trap
applies to colours (`#fff` becomes `rgb(255, 255, 255)`) and to `background` vs `background-image`.

**An overlay you added over the three.js scene has no visible effect ->** the scene's canvas is
`position:fixed; z-index:-1`, and among siblings at the SAME z-index paint order falls back to DOM
order. The canvas is appended by script, so it lands late and paints over any `z-index:-1` overlay
declared in the markup. That is exactly how `#scrim` (a vertical readability gradient) sat dead in
six lab pages: it rendered, then the canvas covered it. The scene's own vignette works only because
`three-shared.js` appends it AFTER its canvas. To sit above the scene but below content, use
`z-index:0`, not `-1`. `#scrim` was deleted from `a3-assembly.html` on 2026-08-13 (ROD) once this was
proven; the copies in `aggregate/home/new-landing/rework-hana/palette-explorer` are still there and
still need checking one at a time, since a page with no scene canvas would actually show its scrim.

**Styles vanish from a component after moving/renaming an include or layout ->** PurgeCSS scans
`_includes/**`, `_layouts/**`, `_javascript/**` to generate `_sass/vendors/_bootstrap.scss`; a
moved file drops its classes from the scan and they get purged. Re-run `npm run build:css` and
review the output diff after any structural move. Never hand-edit the generated file.

**A page's JS features silently stop working after a layout rename ->** `_includes/js-selector.html`
maps layout name -> Rollup bundle. Renaming a layout without updating the map loads no bundle.
The map is a named contract - update both ends in the same change.

**Sparkler ignores (or wrongly grabs) an element ->** `mouse-trail.js` string-matches computed
`animationName` against breathe/throb patterns. Renaming a keyframe or adding a breathing element
without a matching animation name breaks detection. (Phase 2 replaces this with `data-breathing`.)

**An element will not stop breathing via the kill switch (or ignores reduced-motion) ->**
`$breathe-selectors` in `_sass/abstracts/_animations.scss` is a manually synced list feeding BOTH
`html.no-breathe` and the `prefers-reduced-motion` block (with `$reduced-motion-extras`); the
element is missing from it. (Phase 2 removes the list.)

**Post URLs 404 after reorganizing `_posts/` ->** routing lives in `_config.yml` `defaults` scoped
to specific `_posts/` subdirectories - the directory layout is the routing contract. Moving content
between subdirectories changes its permalink site-wide.

**A Three.js change works in redesign-lab but not on the live site (or vice versa) ->**
`redesign-lab/scene/` holds a separate copy of `lantern-controller.js`, `firework-controller.js`,
`three-config.js`, `three-shared.js`, and shaders (intentional during the redesign). You edited
the other copy. Check which one the build actually uses before diagnosing anything. Live-site
`_javascript/` three-bg edits also need `BUILD=production npx rollup -c` before they show.

**Cleanup numbers do not match an old log ->** doc counts go stale within weeks (CLEANUP-LOG
logged `_animations.scss` at 401 lines; later measured 574). Do not trust any doc's counts
without re-measuring - code wins.

**A listener or observer fires on a page it should not ->** page transitions + the PWA keep the
session alive across navigations; a module that registered a listener without a teardown twin leaks
it into the next page. Check for the missing teardown before suspecting the event logic.

**A ported effect is structurally wrong, not just mistuned, and no amount of slider work fixes it ->**
it was built from a SUMMARY of the reference rather than the reference's source. A fetched
description of three.js's `webgpu_postprocessing_anamorphic` said it "performs horizontal blur
sampling across the bright areas", which reads as "the streak replaces the bloom". The actual code
replaces the bloom's HIGH PASS (`bloomPass.highPassFn = Fn(...)`), so the smeared bright buffer
still runs through the whole mip chain: hard core AND soft halo. Building from the summary produced
a bare smear with no bloom behind it, plus three quieter errors that only reading the source
exposes - the offset is in PIXELS (`invSize.x * i * 4.0`) not a screen fraction, the normalisation
is `total / (samples/3)` which is deliberately ~3x hot rather than a weighted mean, and the whole
pass runs at `setResolutionScale(0.25)`. **The provenance law means the actual file, not a
description of it.** WebFetch summarising through a small model is a description.

**A ported three.js pass looks close but the scale is off by 2 ->** `BloomNode` and
`UnrealBloomPass` size their internals differently. BloomNode: `renderTargetBright = screen *
resolutionScale`. UnrealBloomPass: `renderTargetBright = resolution / 2`. So reproducing
`setResolutionScale(0.25)` means constructing the classic pass at `screen * 0.5`, not `screen *
0.25`. Also check wrapping: TSL bright-pass RTTs are often `MirroredRepeatWrapping`, while a plain
`texture2D` clamps, which smears border pixels into false streaks down the frame edges.

**A lab page "does not update" but the file on disk is right ->** check the served bytes before
touching the code: `curl -s localhost:4000/<path> | grep <new-thing>`. Jekyll serves from `_site`,
so there are three places to be stale (source, `_site`, browser cache) and they fail differently.
If `_site` and the HTTP response both have the new code, it is the browser - hard reload.

**A number you set in `three-config.js` has no effect, and the scene behaves like the old value ->**
the option is read with `||`, so a configured **0 is silently discarded** and the hardcoded default
wins. This ran unnoticed for a long time: `fireworks.minZ: 0` fell through to `-10000`, so shells
spawned across a 9800-unit depth spread and the same burst could read 110% of screen height or 7%
of it depending on luck. Fixed in `firework-controller.js` by reading every option with `??`
(2026-08-16), but the pattern exists elsewhere - check the constructor before believing a config
value. Symptom to recognise: `window.THREEJS_CONFIG.<x>` and `controller.config.<x>` disagree.

**Fireworks do not reach the top of the screen, or a click puts one somewhere else ->** screen-to-
world was being done with frustum trigonometry that assumes the camera looks straight down -Z. The
About page pitches the camera 25 degrees at the top of the scroll, where that assumption put the
top of the screen at world Y 1281 instead of 2455. Anything that maps NDC to world must unproject
through the camera's real matrices, not `ndcY * halfHeight + camera.y`. Beware "fixes" that ADD
height to compensate (the deleted `extraHeightMultiplier` did): they are curves fitted to one
tilt and wrong at every other scroll position, which is why the symptom kept returning.

**`position:sticky` silently does nothing, and the CSS looks correct ->** an ancestor has
`overflow` set to anything other than `visible`. `redesign-lab/foundations.css` sets
`body{overflow-x:hidden}`, which makes body a scroll container and kills sticky for EVERY
descendant on any lab page that loads foundations. Nothing errors and nothing warns; the element
just scrolls away. Found 2026-08-16 when the post aggregate's metadata rail - the single device
that design is built around - refused to pin, while the same rail worked fine in
`post-blockout.html` (which does not load foundations). Fix is `overflow-x:clip`, which prevents
the same horizontal overflow WITHOUT creating a scroll container. Symptom to recognise: sticky
works in an isolated test page and fails in the real one.

**A fixed-height element stops matching the bar/panel it is pinned to, but only at some window
widths ->** the container's height is `auto` (or `min-height`) and something inside it wrapped, so
the container grew while the pinned element stayed at its constant. The top bar hit this at 910px:
`flex-wrap:wrap` on the toggles stacked them three rows deep, the bar went 96 -> 147px, and the
96px favicon was left floating inside it. Do not chase it with a taller constant - derive the
constant FROM the rows (`--top-bar-height: calc(row1 + row2 + padding*2)`) and make the rows fixed,
so the two cannot disagree. Symptom to recognise: it looks perfect at your own window width and
only breaks when someone resizes or zooms.

**A CSS hover animation snaps back to its start the moment the cursor leaves, and you reach for JS
to remember where it stopped ->** don't. Attach the animation permanently with
`animation-play-state: paused` and let hover set it `running`. A paused animation holds its current
computed transform, so the element keeps its angle/position for free and the next hover continues
from there. Reading the matrix in a `mouseleave` handler does NOT work reliably: the `:hover` state
is already gone by the time the handler runs, so `getComputedStyle().transform` can flush as
`none`. Used for the favicon spin (2026-08-18).

**A reference capture on disk is of the right SITE but the wrong PAGE ->** blog templates look
identical across articles, so a stale capture passes every eyeball check. `stripe-dev-post-*.jpg`
had been captured from a sibling article, not the URL ROD named. If a card cites a specific URL,
re-capture that URL rather than trusting a plausibly-named file. Cheap check: read the headline in
the capture and compare it to the link.

**Lowering the pixel-ratio slider makes post-processing SLOWER, not faster ->** `EffectComposer`
caches the renderer's pixel ratio at CONSTRUCTION and has its own `setPixelRatio()`. Calling only
`renderer.setPixelRatio(v)` shrinks the canvas while the composer keeps the old ratio, so
`composer.setSize(w, h)` sizes every internal target at `w * OLD_ratio` - at dpr 0.5 the post chain
renders ~4x the canvas pixels and discards them on the final blit. Fixed in the scene tuner
2026-08-22; **every dpr reading taken before that date measured the inverted effect.** Live code is
safe only because `createBaseScene` sets the ratio BEFORE constructing the composer and never
changes it at runtime - moving that line below the `new EffectComposer` reintroduces this silently,
which is why there is a comment on it.

**A load test built on `setInterval` quietly under-delivers and looks like a pass ->** a
backgrounded tab throttles timers hard. Measured in the scene tuner: an 83 ms interval fired **3
times in 2 seconds instead of 24**, so a "12 spawns/sec" stress test proved nothing while appearing
to prove the system was fine. Drive load tests from `requestAnimationFrame` with a time
accumulator - rAF pauses outright when the page is hidden, which is honest, rather than running at
a wrong rate you cannot see.

**A firework/particle vertex shader recomputing a constant every frame ->** the explosion shader
derived each particle's direction from a hash plus `acos`, two `sin`, two `cos` and a `cbrt` on
every frame, once per trail copy - ten times per particle, at a 50-shell cap that is 200,000
evaluations a frame of a value that never changes during a shell's life. Check whether a per-vertex
computation's inputs actually vary before optimising anything around it; here the inputs were the
position attribute and `floor(uTime)`, and `uTime` only ever runs 0..1. Baked to the position
attribute on the CPU 2026-08-22. Related: with `sizeAttenuation` on, those points are ~1.4px on
screen, so **fill was never the cost** despite `particleSize: 20` looking alarming.
