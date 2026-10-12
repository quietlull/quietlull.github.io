# Why post pages drop frames (P515) - MEASURED RESULTS

**Status: INVESTIGATION COMPLETE. NOTHING APPLIED.** Every fix below is a proposal with a measured
number, waiting on Rod to look at the visual and say yes. Run 2026-09-04 against the plan in
[POST-FRAMES-PLAN.md](POST-FRAMES-PLAN.md).

Rig: headless Chrome over CDP, hardware acceleration off (`--disable-gpu --use-angle=swiftshader`),
1300x900, dev server on localhost:4000. Frame time from the rAF delta series. Every A/B alternates
within a single page load with a do-nothing control to size the drift.

---

## 1. Which symptom: IDLE

Not scrolling, not the cursor. A post page is already dropping three frames out of four while
sitting perfectly still.

| page | idle | scroll | cursor | long tasks |
|---|---|---|---|---|
| ComputeGrass (10 videos) | **43.87** | 44.77 | 43.68 | 0 |
| Procedural3DMask (5 videos, 3 GIFs) | **44.40** | 43.30 | 41.69 | 0 |
| ArknightsEndfieldShaders (no media of its own) | **40.31** | 43.00 | 41.20 | 0 |
| tech-art landing (runs a real Three.js scene) | **16.67** | 19.62 | 16.71 | 0 |
| portal (root) | **16.67** | 16.71 | 16.67 | 0 |

Milliseconds, average. 16.7 is the 60fps deadline, 33.3 is a dropped frame.

Two things in that table rule out JavaScript before any profiling:

- **Zero long tasks** on every post, in every state.
- **A 4x CPU throttle changes nothing.** ComputeGrass idles at 43.87 ms at 1x and 44.86 ms at 4x.
  CPU throttling only slows the renderer main thread, so a cost that ignores it is not main-thread
  JS. This is why the plan said to treat a quiet JS profile as evidence the cost is elsewhere.

The reference is the important row. The tech-art landing runs an actual Three.js scene and holds a
flat 16.67 ms. Rod's phrasing was *"my post pages run really poorly even though they have no
three.js scene at all which would do that"*, and the reason is exact: the pages **without** the
scene are the only ones that pay.

---

## 2. Attribution: what costs what, per frame

ComputeGrass, idle, 1x, hardware acceleration off. Control drift for this page was 1.56 ms, so
anything under about 2 ms is noise.

| what | ms per frame | how it was measured |
|---|---|---|
| **The hana bloom backdrop** | **26.7** | hiding `#hana-bg` takes the page 43.38 -> **16.67**, the exact vsync floor |
| Compositing the video layers | 0.7 to 6.7 | `display:none` on every video; inconsistent across pages, mostly drift |
| Decoding 10 looping offscreen videos | 0.6 to 1.5 | pausing all 10 moved 45.92 -> 45.30, inside the drift |
| The line-boil interval | none | 42.09 -> 43.95, i.e. slightly worse than doing nothing |
| Animated GIFs | none | -2.14 and -11.84, noise in both directions |

**Hiding one element accounts for the entire deficit.** The page does not land near 16.67, it lands
on it, matching the two reference pages to the decimal.

### The leading hypothesis was wrong, and this is how wrong

The plan's headline candidate was the ten autoplaying, looping, offscreen videos. It is a dud.

Pausing every offscreen video cut decode from **164 to 15 decoded frames per second**, a 10x
reduction in real decode work, and bought **1.49 ms** against a control that drifted 1.56 ms.
Pausing all ten, decode to a flat zero, bought 0.62 ms.

The compositor trace says the same thing from the other side. Over a 4 second window:

- bloom visible: **960 BeginFrames, 960 DrawFrames**, a full-viewport redraw every single vsync
- bloom hidden: **64 BeginFrames, 24 DrawFrames**, the compositor goes idle

The compositor nearly idles while ten videos are still decoding at 148 frames per second. Video
decode is not what is driving the redraw. The bloom is.

---

## 3. The mechanism

Three files, and the interaction between them is the bug.

1. [`_layouts/default.html:42`](../_layouts/default.html) gives `layout: post` the scene tier
   `none`. Posts are the only pages that get it.
2. [`assets/css/chrome-scene.css:36-38`](../assets/css/chrome-scene.css) hides `#hana-bg` with
   `opacity: 0` for the `full` and `minimal` tiers. It does not hide it for `none`. So the backdrop
   is painted on posts and nowhere else.
3. [`assets/css/chrome-scene.css:65-69`](../assets/css/chrome-scene.css) puts
   `filter: blur(20px) brightness(0.6) saturate(1.03)` on a viewport-sized layer, and then animates
   `opacity` on it forever:

```css
.bgcanvas { filter: blur(20px) brightness(0.6) saturate(1.03); }
.bg-2 { opacity: 0; animation: bgfade 12s ease-in-out infinite; }
```

A filtered layer whose opacity is changing cannot be composited from a cached texture. It is
re-rasterised every frame, at viewport size, forever, on a page that is otherwise completely still.

**The blur radius is not the problem, the existence of the filter is.** Dropping the radius from
20px to 8px bought 3.25 ms. Removing the filter entirely bought 27 ms. Baking the blur into the
bitmap but leaving `brightness(0.6) saturate(1.03)` in CSS still left about 11 ms on the table, and
so did a colour-only filter with no blur at all. Any `filter` on the animating layer costs roughly
the same.

### Confirmed a second time, with no patching at all

The stylesheet already stops this animation for reduced-motion users
([chrome-scene.css:78-80](../assets/css/chrome-scene.css)). Emulating that preference and changing
nothing else:

| page | normal | `prefers-reduced-motion: reduce` |
|---|---|---|
| ComputeGrass | 61.32 ms | **26.81 ms** |
| ArknightsEndfieldShaders | 42.01 ms | **18.52 ms** |

Shipped CSS, no runtime patch, same mechanism. Anyone browsing with reduced motion on has never
seen this problem.

---

## 4. The one caveat that decides how much you care

**With a real GPU, an RTX 3080 absorbs this completely.** Frame time was pinned at 4.17 ms
(240 Hz) with the bloom on or off, at 1300x900 through 2560x1440, and 8.09 ms at 3840x2160.

So the honest statement is: the bloom forces a full-viewport blurred redraw every vsync forever, and
whether that becomes visible jank depends entirely on how fast the rasteriser is. Software
rendering collapses to 20 fps. A discrete GPU eats it.

This matters because it decides whether the fix is urgent or just correct. **Rod: is hardware
acceleration on in your Chrome (`chrome://gpu`, top line), and what refresh rate is your monitor?**
There is a console snippet in section 7 that measures it on your actual machine in about 35 seconds.

Either way the redraw is real work being done for nothing on 19 post pages, and it costs battery
and heat on any laptop that opens one.

---

## 5. Options

Every one of these is measured. None is applied.

### Option A - bake the blur and the colour into the bitmap, drop the CSS filter

**Measured: 44.41 -> 17.46 ms (saves 26.95) and 44.44 -> 17.14 ms (saves 27.30), three reps each,
every rep consistent.** p50 goes 44.4 -> 16.7, p95 goes 77.7 -> 16.8.

The two canvases are static. They are baked once from a 32x18 grid and never change again. Blurring
them on every frame is pure waste, so blur them once at bake time and let the compositor treat them
as ordinary images.

`assets/js/effects/hana-bloom.js`, in `lum()`, fold the colour grade into the colour computation at
float precision rather than post-multiplying an 8-bit canvas (that ordering is what avoids banding
in the dark areas):

```js
  function lum(l){var t=Math.min(1,l/86),tr=Math.pow(t,1.18);
    var r=base[0]+(peak[0]-base[0])*Math.pow(tr,0.85),
        g=base[1]+(peak[1]-base[1])*Math.pow(tr,0.9),
        b=base[2]+(peak[2]-base[2])*tr;
    var lm=0.213*r+0.715*g+0.072*b, s=1.03;               // saturate(1.03)
    r=(lm+(r-lm)*s)*0.6; g=(lm+(g-lm)*s)*0.6; b=(lm+(b-lm)*s)*0.6;   // brightness(0.6)
    return[Math.round(r),Math.round(g),Math.round(b)];}
```

and in `bake()`, blur the final upscale once:

```js
      nc.width=nw;nc.height=nh;var nctx=nc.getContext('2d');
      nctx.imageSmoothingEnabled=true;nctx.imageSmoothingQuality='high';
      // object-fit:cover, so the radius divides by whichever axis drives the scale
      if(nw===1024)nctx.filter='blur('+(20/Math.max(innerWidth/nw,innerHeight/nh)).toFixed(2)+'px)';
      nctx.drawImage(cur,0,0,nw,nh);cur=nc;w=nw;
```

The measured run used exactly that radius: at 1300x900 the cover scale is 1.398 and the baked
radius was 14.31px.

`assets/css/chrome-scene.css`, delete one line:

```diff
-  filter: blur(20px) brightness(0.6) saturate(1.03);
```

**What a reader sees change: nothing, by intent.** I compared the two orderings pixel for pixel at
display resolution in-page: mean absolute difference **0.148 out of 255 (0.058%)**, worst single
channel 5/255. That is well under a perceptible step, but it is a number, not your eyes, so look
before this lands.

**The one real trade-off, stated plainly:** a CSS `blur(20px)` is 20 screen pixels at every window
size. A baked blur is fixed in the bitmap, so its on-screen softness scales with the window. Wider
window, slightly softer bloom. It is arguably the more correct behaviour for a background that
scales, but it is a genuine difference and it is yours to judge. If you dislike it, re-baking on a
debounced resize is a few more lines, which is worth arguing against D5 anti-bloat.

### Option B - freeze the cross-fade, one line

**Measured: saves 18.65 to 24.80 ms, landing at 19.3 to 26.1 ms.** Better, but it does not reach
60 fps, because the blurred layer is still there and still being composited.

```diff
-.bg-2 { opacity: 0; animation: bgfade 12s ease-in-out infinite; }
+.bg-2 { opacity: 0.6; }
```

**What a reader sees change: the 12 second breathing stops.** You can look at this one right now
without any code change, because it is exactly what reduced-motion users already get. In Chrome
DevTools: Rendering panel, "Emulate CSS media feature prefers-reduced-motion: reduce".

Zero risk and almost zero code, but it gives up the effect to get two thirds of the win, where
Option A keeps the effect and gets all of it.

### Option C - stop painting the bloom on posts, like every other tier

**Measured: 43.38 -> 16.67 ms (saves 26.71), landing exactly on the reference pages.**

```diff
 body[data-scene-tier="full"] #hana-bg,
-body[data-scene-tier="minimal"] #hana-bg {
+body[data-scene-tier="minimal"] #hana-bg,
+body[data-scene-tier="none"] #hana-bg {
   opacity: 0;
 }
```

**What a reader sees change: posts lose the bloom and get the flat night background.** This is a
design change, not a performance fix, and it is listed only because it is the cheapest possible diff
and it brackets the other two. The CSS comment at line 33 says the bloom **is** the background on a
`none` page, so this probably reads as a downgrade. Included for completeness.

---

## 6. Duds, recorded so nobody re-proposes them

| tried | result | verdict |
|---|---|---|
| Pause offscreen videos on scroll (the plan's leading candidate) | 1.49 ms vs 1.56 ms control drift | **dud** |
| Pause all 10 videos, decode to zero | 0.62 ms | **dud** |
| `will-change: opacity` on the bloom layers | 0.27, -1.96, -0.76, 0.18 ms | **dud**, four times |
| `contain: paint` on the bloom | -1.53, 0.27, -0.99, 0.35 ms | **dud** |
| Stop the line-boil interval | -1.86 and 0.57 ms | **dud**, the only permanent timer costs nothing |
| Hide the animated GIFs | -2.14 and -11.84 ms | **dud**, noise |
| Reduce blur 20px to 8px | 3.25 to 5.03 ms, and changes the look | not worth it |
| Remove the radial mask on `#hana-bg` | 3.96 to 6.98 ms, and changes the look | not worth it |
| Bake the blur but keep the colour filter in CSS | lands at 27 to 29 ms, not 17 | **partial**, proves any filter costs ~11 ms |

The video result deserves a note against P483. Rod previously ruled autoplaying video "WONT FIX" on
motion grounds. Nothing here asks to revisit that, and the offscreen-pause idea the plan proposed as
the P483-respecting shape is **not worth building**, because it does not buy frames. Not because of
the earlier ruling, but because it was measured at 1.49 ms against 1.56 ms of drift.

---

## 7. Measure it on your own machine

Paste into the console on any post page. It alternates bloom on and off twice, about 35 seconds,
and changes nothing permanently. Script also saved at
`scratchpad/rod-console-test.js` in this session.

```js
(async()=>{const s=document.createElement('style');document.head.appendChild(s);
const on=()=>s.textContent='',off=()=>s.textContent='#hana-bg{display:none!important}';
const smp=ms=>new Promise(r=>{const d=[];let l=0,t0=performance.now();const f=t=>{if(l)d.push(t-l);l=t;
t-t0<ms?requestAnimationFrame(f):r(d)};requestAnimationFrame(f)});
const st=a=>{const q=[...a].sort((x,y)=>x-y);return{avg:+(q.reduce((x,y)=>x+y,0)/q.length).toFixed(2),
p50:+q[q.length>>1].toFixed(2),p95:+q[Math.floor(q.length*.95)].toFixed(2)}};
const A=[],B=[];for(let i=0;i<2;i++){on();await new Promise(r=>setTimeout(r,800));A.push(st(await smp(6000)));
off();await new Promise(r=>setTimeout(r,800));B.push(st(await smp(6000)))}on();s.remove();
const m=(r,k)=>+(r.reduce((a,b)=>a+b[k],0)/r.length).toFixed(2);
console.table({'bloom ON (shipped)':{avg:m(A,'avg'),p50:m(A,'p50'),p95:m(A,'p95')},
'bloom OFF':{avg:m(B,'avg'),p50:m(B,'p50'),p95:m(B,'p95')}});
console.log('saving',(m(A,'avg')-m(B,'avg')).toFixed(2),'ms/frame');})()
```

---

## 8. Notes for whoever picks this up

- **19 post pages are affected**, every page with `layout: post`. Nothing else on the site is.
- **The 404 is not affected**, correcting an inference I made from the CSS alone. It carries
  `#hana-bg` but hana-bloom.js never appends canvases there, so there is no `.bg-2` and it measures
  a clean 16.67 ms. Believe the measurement over the stylesheet.
- **`will-change` and `contain` do not help.** Worth knowing, because both are the reflex answer for
  a compositing problem and both were measured at zero, four times each.
- **hana-bloom's per-frame cost is invisible to a JS profile**, exactly as the plan predicted. There
  is no rAF and no timer. Anyone profiling JS on a post page will find a quiet main thread and
  conclude wrongly.
- Reduced motion already dodges this, so D21's missing reduced-motion path is not a factor here.
