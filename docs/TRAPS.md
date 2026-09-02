# Traps

Symptom-first: the symptom is what you search for when it bites. Each entry: how it presents ->
the real cause -> what to do. Add entries when something costs real time and is not inferable from
the code.

**You patch the water shader and the lab water page performs (or looks) exactly the same ->**
you patched the live file and the lab pages import their own copy. `water-scene.html`,
`character-scene.html` and `anime-glow-scene.html` all load
`redesign-lab/scene/shader/mirroredSurface-bob.js`, which as of 2026-09-01 is **five** changes
behind the live shader: `uRidge` 0 vs 1 (smooth hills vs sharp crests), `uSunLift` 0.2 vs 1.5
(crest moonlight, 7.5x), `uDistort` .05 vs .1, a full-window reflection target vs quarter-res,
and no ripple-loop gate. **Lab water milliseconds are not live milliseconds and lab water is not
the live look.** Profile the real thing through `scene-tuner.html`, which drives the rebuilt
bundle. There is also an orphan `redesign-lab/scene/shader/mirroredSurface.js` that nothing
imports and whose NAME matches the live file, which is the decoy that starts this.

**A measurement returns 0 for everything and reads like a real result ->**
the element was not in the document yet. `getBoundingClientRect()` on a detached node does not throw
and does not warn - it returns zeros, which look exactly like a measurement of something very small.
Cost: a pinned column built from those zeros collapsed to 0px, and the numbers said "pinned, zero
drift" because 0 minus 0 is 0. **Attach first, then measure.** Same shape as the font-loading trap:
the failure produces a green-looking number rather than an error.

**A word loses its spaces when you split it into per-glyph spans ->**
a `<span>` containing only a space collapses under normal white-space handling and measures ZERO
advance - not a narrow one. Splitting "rodney fan" into boxes therefore rendered RODNEYFAN. Put
`white-space: pre` on the measuring probe AND on the cell.

**Every component on a page loses its padding at once, and nothing errors ->**
the page keeps its own `*{box-sizing:border-box;margin:0;padding:0}` in an inline `<style>` while the
stylesheets moved into cascade layers. **Unlayered CSS beats every layer**, so a universal selector at
specificity (0,0,0) - which used to lose to every class - now outranks all of them. Measured on
`a3-assembly.html`: top bar padding `16px 32px` -> `0`, footer `40px` -> `0`, hero `64px 16px` -> `0`.
**It is worse than cosmetic where JS measures the DOM:** the portal sizes every window from its title
bar's computed padding, so a zeroed padding silently becomes wrong geometry - re-injecting the rule
moved 4 of 8 window sizes and 4 of 8 positions.
**Fix:** delete the duplicate if the page loads `foundations.css`, otherwise wrap it in
`@layer reset{}`. **Check for it with:** a page that has `*{box-sizing` outside a `@layer` block.
Cost: shipped broken across 40 lab pages, and the before/after harness could not see it because it
only sampled the pages that had already been fixed.

**A before/after comparison reports far fewer changes than really happened ->**
the sampler was choosing elements by a property of the thing it expected to change. Sampling
`querySelectorAll('[class]')` missed `.posthead h1`, which has no class, and reported a page with 37
changed values as having 1. Sampling only 15 CSS properties missed `outline-color`, so four focus
rings changed on the portal and the diff said zero. Sampling only the default state at one width
missed every `:hover`, `:focus-visible` and breakpoint.
**Rules that follow:** sample `body *`, not `[class]`; include `transform`, `position`, `z-index`,
`overflow`, `min-width`, `outline-color`; and **wait for `document.fonts.ready` plus any layout the
page re-runs on it** - fixed `setTimeout`s race the font swap. Also: **CSS transitions freeze in a
background tab**, so read `el.getAnimations().forEach(a => a.finish())` before measuring a hover or
focus state, or it silently reports the pre-transition value.

**Code samples render with random floating boxes around individual words ->**
short utility class names collided with the host page's own classes. A syntax sample used
`<span class="v">` for variables on a page where `.v` is the variant CARD
(`border:1px solid #2c2c2c; padding:18px; background:#171717`), so **58 identifiers each rendered as a
bordered dark card.** `.a` collided too, giving one of two side-by-side samples a different colour,
font-size and a 6px offset from the other - which reads as a rendering bug rather than a clash.
**Nothing errors and nothing is missing; the markup is valid and the CSS is valid.** On a 2,000-line
single-file page, one-or-two-letter class names WILL already be taken.
**Rule: namespace every class you add to a page you did not write** (`sy-v`, not `v`), and before
adding one, grep `\.<name>\{` in the host file. Cost: Rod seeing a broken page the first time he
opened a tab that was built for him.
**The same shape as the token traps below:** a name resolving to something you did not intend renders
wrong without erroring. Here the name resolved to somebody ELSE'S rule rather than to a fallback.

**A layout sized from measured text is right in your checks and wrong in Rod's browser ->**
the webfont had not arrived when the layout measured. Fonts load with `display=swap`, so the first
measurement of `scrollWidth` runs against the FALLBACK, the box gets sized to that, and the real face
then swaps in wider with nothing to trigger a re-measure. **Why it survived verification:** every
check forced a relayout first, which happens long after fonts settle - so the test measured a state
the page never reaches on its own. Two fixes, both needed: re-run the layout on
`document.fonts.ready`, and actually REQUEST the weight you style with (`font-weight: 700` against a
`wght@400;500` request makes the browser synthesise a wider faux bold). Cost: Rod reporting cut-off
headers three times while every measurement said they fit.

**A child grows past its parent and the parent's `overflow: hidden` eats a control ->**
grid and flex items default to `min-width: auto` / `min-height: auto`, so they refuse to shrink below
their content and grow straight through a clipping parent. Presented as "some cards have their X cut
off": the title bar was 135.7px inside an 86px window, and the close button sits at the far right, so
it was the first thing past the clip edge. Fix is `min-width: 0` (or `min-height: 0`) on the ITEM,
not on its child. **Caught once for height on a body and missed for width on its sibling bar** - if
you fix one axis, check the other.

**A pointer drag works from one part of an element and dies from another ->**
`<a>` is natively draggable. Pressing and moving over a link starts the browser's own drag-and-drop,
which tears down the pointer stream. Fix: `-webkit-user-drag: none` plus a `dragstart` preventDefault
on the container. **A synthetic `PointerEvent` test CANNOT reproduce this** and will report the drag
as working - native drag is not driven by pointer events, so the test measures the wrong mechanism.

**A CSS change reads as having no effect in the browser pane ->**
the pane does not advance its animation timeline, so any property under a `transition` reports its
START value forever, and `getAnimations()` shows the transition "running" while it never progresses.
rAF loops and `ResizeObserver` delivery freeze with it. This has now cost time three separate times
(a collapse height, throw physics, a hover fill - four attempts on the last). **The rule: set
`transition: none` before measuring a transitioned property, and drive rAF work manually rather than
waiting for it.**

**A layout fix works, then breaks again the next time sizes change ->**
you modelled the layout instead of measuring it. Re-solving positions in Python against a model of
the runtime's sizing drifts the moment the runtime gains a rule the model does not have - squaring,
header-fitting, tier floors. Solve it in the BROWSER against the real computed geometry, every
element against every other, at several viewport sizes. **Hand-nudging one pair at the sizes you
happen to pick will pass and then fail.**

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

**~~Styles vanish from a component after moving/renaming an include or layout~~ -> CANNOT HAPPEN
ANY MORE.** This trap was PurgeCSS: it scanned `_includes/**`, `_layouts/**`, `_javascript/**` to
generate `_sass/vendors/_bootstrap.scss`, so a moved file dropped its classes from the scan and they
got purged. D48 removed Bootstrap completely and `purgecss.js`, `_sass/vendors/` and
`_sass/main.bundle.scss` went with it. MEASURED 2026-09-02: none of those paths exist, there is no
`build:css` script, and nothing prunes CSS at build time. Kept struck through rather than deleted
because several older notes still send people here.

**A rule paints the wrong thing and only the @forward ORDER decides it ->** two partials declare the
same PROPERTY on the same element at the same specificity, layer, media condition and state. The
wordmark is `class="top-bar__logo lb"`, so `_top-bar.scss` and `_line-boil.scss` both styled it and
it painted in the wrong font and colour for weeks. `node tools/css-order-check.mjs` finds these: it
parses the built stylesheet and attributes every rule back to its partial through the Sass source
map, because `document.styleSheets` and plain greps have both under-reported here before.

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
`three-config.js`, `three-shared.js`, and shaders. You edited the other copy. Check which one the
build actually uses before diagnosing anything. Live-site `_javascript/` three-bg edits also need
`BUILD=production npx rollup -c` before they show. **The split was "intentional during the
redesign"; the redesign shipped, so it is now just a hazard** (corrected 2026-09-02), and the copies
have drifted: the lab water is five changes behind live. Folding or deleting them is Phase 2 of
[REFACTOR-PLAN.md](REFACTOR-PLAN.md). Editing a lab copy changes nothing a visitor sees.

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

**The top bar grows ~12px and shoves every page's content down as the window narrows ->** the bar
is not scaling badly, it is STACKING for a zone that no longer exists. `top-bar.css`'s media ladder
was written while the bar still carried the three toggles - its own comment called row 1
"name + toggles" - and D20 removed them without the ladder being touched. From its breakpoint down,
the nav dropped to a second row for an empty cell. **When a decision removes an element, grep the
breakpoints that were laid out around it.** The same bug was in all three tiers.

**An icon row renders as outlines but nothing draws in ->** the stroke and dash-array are cosmetic;
the animation needs `pathLength="1"` on each `<path>`. Without it the dash values are in user units
and every icon needs its own measurement, so a single shared animation silently does nothing.
`pathLength="1"` renormalises any path to length 1 regardless of geometry, which is what lets ONE
dashoffset animation drive an entire set. Read off stephanewillems.be; recorded in
`redesign-lab/sources/stephanewillems-skills.md`.

**`background-blend-mode` appears to do nothing ->** it must be declared on the SAME element that
carries the `background-image` layers. Put it on a wrapper and the child composites normally with
no warning. Cost a full round of "the gradient map isn't working" on the paper tests.

**A backing added to a column shrinks everything inside it ->** `padding` and `border` on the box
eat its content width. The rail's metadata rows went from 277px to 225px in a 277px column that way.
If a surface needs a ground but must not move anything, paint it on an absolutely-positioned
`::before` with a negative `inset` - it costs the layout exactly nothing. Same reason lab chrome
should use `outline`, not `border`: an outline is outside the box model.

**A measure expressed in `em` on a wrapper comes out ~10% short ->** `em` resolves against THAT
element's own font-size, not the font-size its children actually use. `.prose` inherited 16.33px
while its paragraphs ran at 18px, so a 72-character measure rendered as 65. Derive a measure from
the size the TEXT uses, per breakpoint, not from the container's inherited size.

**Path/element counts from `grep -c` are wrong on minified or one-line files ->** `grep -c` counts
matching LINES, not matches. SVGs are routinely one line, so a 3-path icon reports as 1. Use
`grep -o ... | wc -l`. This produced a wrong claim that a whole icon set was single-path, which was
the basis of a recommendation.

**A brand logo disappears on the night background ->** brand marks are drawn for light pages.
Measured against `#070C23`: devicon Unity 2.29:1, Blender 2.55:1, Vulkan 2.68:1, and Unreal Engine's
own `#0E1128` is **1.04:1** - not dark, invisible. Check contrast before adopting any official mark;
a CSS `mask` re-tints one without editing the sourced file, so the citation stays true.

**Fireworks do not reach the top, AND the unprojection entry above does not fix it ->** there are
TWO causes with one symptom, and the second is not a bug at all. `createAutoFirework` picks
`randomY = Math.random() * 0.5 + 0.3` and spawns at `(1 - randomY) * innerHeight`, so auto bursts
land between **20% and 70% down the viewport** - the top fifth is excluded by construction. The
comment above it reads "Upper/middle portion of screen", which is exactly what the code does; the
range is just not what was wanted. **The lesson is about the TRAPS file itself:** a symptom that
already has an entry invites you to re-apply that entry and conclude the fix regressed. Check
whether the recorded cause is still the cause before re-fixing it. Measured 2026-08-22 by recording
50 auto spawns and reading back the fraction of viewport height each burst used.

**An effect "is not showing" and its code looks fine ->** check whether it is on the page at all
before reading a line of it. The sparkler was reported missing across the whole new landing; it
lives in `_javascript/modules/components/mouse-trail.js`, which Rollup bundles into
`commons.min.js`, and **no lab page loads that bundle** - `final-landing.html` requested exactly two
scripts. Cheapest possible check, and it beats any amount of reading:
`document.querySelectorAll('[class*=spark]').length` and
`[...document.querySelectorAll('script[src]')].map(s => s.src)`. Same class of mistake as debugging
CSS that was never linked.

**A three.js object will not stay hidden and `visible` keeps flipping back to true ->** something
else owns that flag. `Reflector` (the water) sets its own mesh invisible, renders the reflection
pass, then restores it, every frame - so anything written to `visible` from outside is overwritten
on the next tick, silently and with no error. `material.visible` is not part of that cycle and
holds. Symptom to recognise: sibling objects obey the same code immediately and only one refuses.

**A module copied out of `_javascript/` into the lab 404s on its own imports ->** the live modules
use extensionless specifiers (`from '../config/storage-keys'`) because Rollup resolves them. A
browser loading the same file as a plain ES module does not, and the failure is a bare 404 in the
network panel rather than anything that names the cause. Add `.js` to every relative import when
copying, and say in the header that this is the only edit, so the copy still diffs cleanly against
its original.

**An editing pass changes a component's CSS and the page does not move ->** the page has its own
inline copy. `final-landing.html` inlines `skills-row`, `section-head` and the tape rather than
linking `extracted/components/*`, so editing the component alone is a no-op on the rendered page,
and editing the page alone silently forks it from the bench. `text-decisions.html` keeps a greybox
twin of the tape for the same reason. Before changing any component, grep the lab for its selector:
`grep -rln '<selector>' redesign-lab --include=*.html`.

**A CSS change is reported as applied and the page still shows the old value ->** a later rule with
the same specificity is overriding it, and the source edit looks perfectly correct. This bit three
times in one session: the skills draw duration (the landing inlines its own copy of the component
CSS), the washi tape (`text-decisions.html` keeps a greybox twin), and the post's section heading
(`final-post.html` had TWO `.prose h3` rules and the older one came later in the file, carrying
`margin: 0` that cancelled the new `2em 0 1em`). Equal specificity means LAST WINS, so an edit near
the top of a file can be dead on arrival with no warning of any kind.
**The rule that catches all three: never report a CSS change as done from the source edit. Read the
COMPUTED value off the rendered page.** `getComputedStyle(el).marginTop` would have caught every
one in a second. And when two rules share a selector, MERGE them - adding a third only moves the
fight further down the file.
Cheap audit for any selector before editing it:
`[...document.styleSheets].flatMap(ss=>[...ss.cssRules]).filter(r=>r.selectorText==='<sel>').length`

**A panel looks "connected to the top" and its own padding is demonstrably correct ->** a
`position:fixed` bar above it is overlapping, and the page reserves room for that bar with a
CONSTANT that no longer matches. `final-about.html` set `body{padding-top:44px}` when its variant
bar was one row; adding a third button wrapped the bar to 55px, so it covered the panel by 11px.
Every measurement of the panel says it is fine, because the panel IS fine - the thing on top of it
is not in any of those numbers. **Measure the gap BETWEEN them**
(`panel.getBoundingClientRect().top - bar.getBoundingClientRect().bottom`); a negative result names
the cause instantly. Fix by making the bar `position:sticky` rather than raising the constant: a
sticky bar occupies real layout space at whatever height it wraps to, so there is no constant left
to drift. Same family as the top-bar entry above, and the same lesson - derive the space from the
bar, never guess it.

**Placeholder "text" drawn as grey 1px rules hides a real problem ->** the block gets sized around
the rules instead of around prose, so line-height, measure and paragraph spacing are never set and
nobody notices until real copy lands and the panel is the wrong height. Rod, 2026-08-23: *"never to
do this weird like dividers do real text just use the about me page text directly its not like we
dont have any."* **If the copy exists in the repo, use it** - `tech-art/about.md` front matter
carries `bio_intro` and `bio_more` verbatim, and the post pages carry their own. Grey lines are only
honest for copy that genuinely has not been written yet.

**A new surface gets type that "looks about right" and Rod asks why that size ->** because it was
picked freehand when a decided spec already existed on another page. The post's prose type is not a
preference, it is P33: Rod chose a 94-character measure after seeing 72 and 94 side by side, and
`final-post.html:417-422` encodes it (16px, 18px above 960, weight 300, line-height 130%,
letter-spacing -.18px, 24px paragraph rhythm, measure as `--char-w x --measure-ch`). **Before setting
type on any new surface, grep for an existing rule and copy it** rather than choosing. The same goes
for section rhythm (the landing's `padding-block: 30px 60px`), card fill (`--color-panel`) and
heading margins (catlike's `2em 0 1em`) - every one of those was re-picked at least once in this
project before someone noticed it was already decided.

## "The viewport moves" did not mean anything moved

**Symptom:** Rod reported the page jiggling in time with the line boil, three times. Two fixes
failed because both hunted for something changing SIZE.

**What it actually was:** at his reproduction - scrolled half way down the hero - 26 off-beat
samples showed font-size, the pinned advance, cell and column boxes ALL STABLE to three decimals.
The only value that moved was `window.scrollY`, drifting **394 <-> 402, eight pixels**, in time
with the boil. **Chrome's scroll anchoring** adjusts `scrollTop` to hold the visual position when
content above the viewport changes; the boil replaces every glyph six times a second, so the
browser re-anchored six times a second. The browser was helping.

**Fix:** `overflow-anchor: none` on the boil host and its cells. 8px -> 0px.
**The lesson:** "the viewport moves" is not the same claim as "an element moves", and assuming it
was cost two rounds of measuring the wrong things.

## Setting a property on the element when the text lives in a child

**Symptom:** changed `h2.section-head` to `font-weight: 300`. The element computed 300. Nothing
changed on screen.

**Why:** the visible text is in a `.section-head__name` child which carried its own
`font-weight: 100`. The parent's weight is irrelevant to text it does not contain.
**Catch it by:** measuring the element that renders the TEXT, not the one that carries the class.

## A computed weight of 300 does not prove weight 300 loaded

Three faces at 100 / 300 / 700 must produce three DIFFERENT rendered widths for the same string.
Measured on the landing: 310.7 / 316.3 / 337.3px. If they match, the ladder has collapsed to one
fallback face and every computed value is still reporting the number you asked for. This project
has already shipped that bug once.

## A regex that needs N closing tags will eat past the element

**Symptom:** lifting a `.toc-pop` block out of the post's rail silently deleted the TAGS block.
Rod noticed before I did: *"you just removed the tags where are they now?"*

**Why:** the pattern ended `</div>\s*</div>\s*</div>` - three closes - and the popup has two, so
the non-greedy `.*?` ran past the end of the popup and swallowed the next sibling whole.
**Rule:** never bound an HTML extraction by counting closing tags. Match the open tag and walk the
nesting depth, or rebuild the container wholesale.

## Restating a shorthand PARTIALLY keeps inheriting the half you left out

**Symptom:** the rebuilt projects page sat 76px right of centre - gutters 208 / 56 against the live
page's 132 / 132.

**Why:** its inline `.wrap` rule restated `padding` but not `width`, so `foundations.css`'s
`.wrap{max-width:var(--measure)}` was still in force - and `--measure` is 64rem. `.wrap` computed
**1024px** while `.col` is 1176, so the column overflowed its own wrapper. Every sibling page
declares `width:min(1180px,92vw)`; this one dropped it.

**The shape:** a partial restatement READS as "this rule owns .wrap now" and does not. The
properties you omit keep resolving from a layer you have stopped thinking about.

## The same class rendering two different boxes

**Symptom:** Rod - "tags are weird amalgams". `button.kit-tag` measured 52.22x28.59 WITH a 2px black
outset bevel; `span.kit-tag` 47.27x27.55 without. 44 bevels on one page.

**Why:** `.kit-tag` styles its edge with `outline` and never declares `border`, so a `<button>`
keeps the UA default. `foundations.css`'s `*` reset only covers box-sizing, margin and padding.

**Rule:** a component that can land on BOTH a control and a plain element must neutralise the UA
control styling - `border`, `background`, `font`, `appearance` - or it is two components sharing
one class name.

## A component that renders visible text where it should render nothing

**Symptom:** a ported component looks catastrophic on its new page - text everywhere, overlapping,
spilling out of small boxes - while every measurement of it comes back clean.

**Cause:** the component used a utility class it did not define. `.visually-hidden` (or any
`.sr-only`-style helper) lived in the BENCH PAGE'S own `<style>`, so on the bench it worked and on
the destination page the rule did not exist and every hidden label rendered as body text.
Happened 2026-08-25 with `achievement-wall` on `final-about.html`: 29 accessible labels became
visible titles inside 64px tiles.

**Why the usual checks miss it:** nothing is wrong with any box. Sizes, tiers, cascade layers and
computed styles are all correct - the text is simply *visible*, which is a property of the rule that
does not exist rather than of any rule that does. Three rounds of computed-style and bounding-box
checks reported "fine".

**What finds it in one call:** `document.elementFromPoint(x, y)` over the middle of the component.
It answers "what is actually painted here", which computed styles cannot. It returned
`SPAN.visually-hidden` and named the bug immediately.

**The rule:** a component may not depend on a class it does not define. Utility classes go in the
component's own file under its own namespace, never in the bench page's chrome.

## Measuring the wrong thing invents bugs that are not there

Merge night, 2026-08-25/26. Seven times a value was wrong while nothing errored. **Three times I
reported a defect that did not exist**, every one because I measured something adjacent to the
question instead of the question.

| what I asked | what I should have asked |
|---|---|
| `getComputedStyle(body).backgroundColor` - reported "no page ground" | the ground is painted with GRADIENTS, so it is `backgroundImage`. `backgroundColor` is transparent by definition. |
| grepped `margin:51px` in a formatted SCSS file - reported "the tune did not port" | the lab is minified and the live file is formatted. I matched string SHAPE, not value. |
| called `.focus()` and read the ring - reported "clean" | `:focus-visible` only matches KEYBOARD focus. The bug lives in a state a script cannot enter. It reproduced on the first real Tab. |
| regexed `^\s*(--[a-z-]+):` - reported six tokens undefined | they sit on multi-token lines (`--night:#070C23; --night2:#0a1030;`). The regex only saw the first per line. |

**The diagnostics that actually work:**

- **`document.elementFromPoint(x, y)`** answers "what is painted here". It found a component
  rendering 29 visible labels in one call, after three rounds of computed-style checks called it fine.
- **Drive real input.** A synthetic `.focus()` or `.click()` skips the states half of CSS lives in.
- **Compare values, never the text that spells them.** Two files can hold the same number and never
  grep alike.
- **Read the property the browser actually sets.** `background` is four properties; `transform`,
  `translate` and `scale` are three separate ones now.

**The rule: a single measurement is a hypothesis. Confirm it a second way before reporting it as a
finding, and especially before telling someone else to go fix it.**
