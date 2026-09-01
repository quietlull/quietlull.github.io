# kaitonote.com — Line-based page transition

- **URL:** https://kaitonote.com/  (works grid: https://kaitonote.com/works/)
- **Captured:** 2026-06-11
- **Assets pulled verbatim:**
  - HTML: `https://kaitonote.com/works/`
  - CSS:  `https://kaitonote.com/assets/css/style.css`  (38 KB, Tailwind build, minified)
  - JS:   `https://kaitonote.com/assets/js/index.js`    (696 KB, single bundle, minified)
- **Tier:** **Remixed** for the HTML/CSS scaffold below (verbatim DOM + CSS vars, reusable as-is). **Slop / reference-only** for the JS animation logic — it is a minified GSAP timeline that depends on bundled plugins (DrawSVG, CustomEase, ScrollTrigger), swup, and Lenis. The JS is recorded verbatim for technique study but must be **re-authored** against your own GSAP, not copy-pasted. See CHROME-AGENT REQUEST for a clean (un-minified) capture if you want the real timing curve.

---

## What Rod wants: the LINE transitions

Two distinct line techniques are present, both verbatim-confirmed in source:

1. **Vertical grid lines that sweep on page transition.** The page has 5 thin vertical rules
   (`[data-line-vertical]`, `width:0.5px`, `bg-sub`, `opacity:.2`) sitting on the 6-col `.base-grid`.
   On transition OUT they translate `y:"-100%"` (wipe up); on transition IN they slide back to
   `y:"0"` with a `0.35s` stagger. This is the "lines sweep during transition" effect.

2. **An SVG circle/arc that DRAWS during the transition** (`stroke-dashoffset` via GSAP **DrawSVG**
   plugin). `[data-parts-transition-circle] svg ellipse` is animated `drawSVG:"0%"` -> `"0% 100%"`
   -> `"100% 100%"` — i.e. the stroke draws on, then the start point chases the end to erase it.
   The site preloader uses the same arc-draw (confirmed by screenshot: a partial circle stroke
   drawing around a "%" counter — see below).

Stack detected in `index.js`: **GSAP** (441 refs) + **DrawSVGPlugin** + **CustomEase** +
**ScrollTrigger**, page routing by **swup** (71 refs), smooth scroll by **Lenis**, plus a WebGL
**fluid canvas** background (`[data-parts-transition-fluid]`) that is unrelated to the line work.

---

## VERBATIM — transition overlay markup (from /works/ HTML)

This is the reusable scaffold. The vertical lines and the draw-on ellipse live here.

```html
<div data-parts-transition class="pointer-events-none fixed inset-0 z-[-9999] m-auto overflow-hidden">
  <div data-parts-transition-cover class="transition-[background, opacity] footer-transition absolute z-[20] m-auto h-full w-full bg-main opacity-0"></div>
  <div class="base-grid absolute inset-0 z-[30] h-full w-full">
    <div class="col-start-2">
          <div data-line-vertical class="h-full w-[0.5px] bg-sub opacity-20"></div>
        </div><div class="col-start-3">
          <div data-line-vertical class="h-full w-[0.5px] bg-sub opacity-20"></div>
        </div><div class="col-start-4">
          <div data-line-vertical class="h-full w-[0.5px] bg-sub opacity-20"></div>
        </div><div class="col-start-5">
          <div data-line-vertical class="h-full w-[0.5px] bg-sub opacity-20"></div>
        </div><div class="col-start-6">
          <div data-line-vertical class="h-full w-[0.5px] bg-sub opacity-20"></div>
        </div>
  </div>

  <p data-parts-transition-text class="absolute inset-0 z-10 m-auto hidden text-4 md:text-6 leading-[1.4] w-fit h-fit overflow-hidden"></p>
  <div data-parts-transition-circle class="absolute inset-0 z-10 m-auto opacity-80 md:opacity-0 hidden aspect-square w-[195rem] md:w-[416rem] lg:w-[412rem] rotate-90">
    <svg width="824" height="824" viewBox="0 0 825.5 825.5" preserveAspectRatio="none">
  <ellipse class="h-full w-full stroke-sub" cx="412.5" cy="412.5" rx="412" ry="412" fill="none" stroke-width="1"/>
</svg>
  </div>
  <!-- 4 more decorative oversized [data-parts-transition-circle] ellipses pinned to each corner, stroke-width 0.5, omitted for brevity -->

  <picture>
	<source srcset="/assets/images/bg_ZT26So.avif" type="image/avif">
	<img src="/assets/images/bg_1k8YNA.jpg" data-parts-transition-bg="light" alt class="absolute z-[0] inset-0 h-full w-full object-cover object-left-bottom opacity-0" width="1920" height="1360" loading="lazy" decoding="async">
</picture>
  <canvas data-parts-transition-bg="light" data-parts-transition-fluid class="absolute inset-0 z-[1] h-full w-full opacity-0"></canvas>
</div>
```

The footer reuses the same line motif (vertical rules turn `--color-gray-dark` when the footer
enters via ScrollTrigger):

```js
class FooterComponent{constructor(){}init(){
  const F=document.querySelector("[data-parts-transition-cover]"),
        z=document.querySelector("[data-header-progress]"),
        X=document.querySelectorAll("[data-line-vertical]");
  ScrollTrigger.create({trigger:"footer",start:()=>getDeviceType()==="sp"?"top top+=25%":"top top+=15%",invalidateOnRefresh:!0,
    onEnter:()=>{ /* ...set cover opacity 1, flip color vars... */ X&&gsap.set(X,{background:"var(--color-gray-dark)"}) }
  });
}}
```

---

## VERBATIM — CSS that backs the lines (from style.css)

```css
/* timing tokens used by the transition timeline */
--easing-1: cubic-bezier(.46, 0, .17, 1);
--easing-2: cubic-bezier(.33, 0, .03, .99);
--easing-3: cubic-bezier(.07, .84, .26, 1);
--duration-1:.4s; --duration-2:.6s; --duration-3:.8s; --duration-4:1s; --duration-5:1.2s;
--delay-1:.4s; --delay-2:.8s;

.footer-transition{transition-duration:var(--duration-4);transition-timing-function:var(--easing-2)}

/* the 6-column grid the vertical lines snap to */
.base-grid{display:grid;grid-template-columns:135rem 412rem 412rem 412rem 412rem 135rem;
  @media (width < 992px){grid-template-columns:80rem 208rem 208rem 208rem 208rem 80rem}
  @media (width < 768px){grid-template-columns:20rem 195rem 195rem 20rem}}

/* the line element itself is just: h-full w-[0.5px] bg-sub opacity-20  (Tailwind utilities) */
.w-\[0\.5px\]{width:.5px}
.h-full{height:100%}

/* path transform origin — relevant to the draw-on ellipse */
svg{width:inherit;height:inherit;path{transform-origin:center center}}
```

---

## VERBATIM — the JS transition timeline (REFERENCE ONLY / Slop tier)

Minified, depends on bundled GSAP+DrawSVG+CustomEase+swup. Recorded for the exact timing recipe.
`F`=transition-text node, `z`=NodeList of `[data-line-vertical]`, `X`=swup animation object,
`Y`=swup's done() callback, `Q`/`J`=GSAP timelines. `gsapWithCSS` is GSAP core, `splitText` is a
local SplitText-style helper, `$$1` is a `querySelector` wrapper.

```js
pageTransition(){
  const F=document.querySelector("[data-parts-transition-text]"),
        z=document.querySelectorAll("[data-line-vertical]"),
  X={from:"(.*)",to:"(.*)",
    // ----- OUT (leaving current page) -----
    out:Y=>{
      $$1("[data-menu]").getAttribute("data-menu")==="open"&&this.menuComponent?.closeMenu(),
      gsapWithCSS.set("[data-parts-transition-circle], [data-parts-transition-text]",{display:"block"}),
      gsapWithCSS.set("[data-parts-transition-circle] svg ellipse",{drawSVG:"0%"});
      const K=["Born in 1997","While Raising Child","Play Football","Blood Type is A","Nervousness","Good Job is Danger"],
            J=K[Math.floor(Math.random()*K.length)];
      F&&(F.innerHTML="",F.innerHTML=J);
      const Z=splitText(F,"chars");
      gsapWithCSS.effects.setTitle(Z.chars);
      const Q=gsapWithCSS.timeline();
      Q.to("[data-container]",{opacity:0,pointerEvents:"none",duration:.8,onComplete:()=>{ scrollSet("stop"); /* custom-cursor scramble + scale, omitted */ }},"in"),
      Q.set("[data-parts-transition-cover]",{opacity:0,duration:.4},"in"),
      $$1('[data-container="index"]')&&Q.to("[data-parts-transition-bg]",{opacity:1,duration:.8},"in"),
      Q.to("header",{opacity:0,duration:.8},"in"),
      // >>> the LINES sweep UP <<<
      Q.to(z,{y:"-100%",duration:.8,ease:"power1.inOut"},"in"),
      // >>> the ARC DRAWS ON <<<
      Q.to("[data-parts-transition-circle] svg ellipse",{drawSVG:"0% 100%",duration:1.2,ease:"power1.out",
        onStart:()=>{setColorVariables(/* flip light/dark vars */)}},"in+=0.75"),
      Q.inTitle(Z.chars,{stagger:"0.05"},"in+=0.75"),
      // >>> the ARC ERASES (start chases end) <<<
      Q.to("[data-parts-transition-circle] svg ellipse",{drawSVG:"100% 100%",duration:1.8,ease:"power3.inOut",overwrite:"auto"},"in+=2"),
      Q.to(Z.chars,{ease:"power3.inOut",y:"-110%",duration:.8,overwrite:"auto"},getDeviceType()==="sp"?"in+=3.35":"in+=3.15"),
      Q.add(()=>{ ScrollTrigger.getAll().forEach(ee=>{ee.kill()}); Y(); },getDeviceType()==="sp"?"in+=3.9":"in+=3.6")
    },
    // ----- IN (entering next page) -----
    in:Y=>{
      const K=$$1('[data-container="index"]');
      K||this.allInit();
      scrollSet("start");
      const J=gsapWithCSS.timeline({});
      K||J.set("[data-container]",{opacity:1,pointerEvents:"auto",duration:.8},"in+=3");
      K&&( J.fromTo("[data-container]",{opacity:0},{opacity:1,pointerEvents:"auto",duration:1,onComplete:()=>{K&&this.allInit()}},"in"),
           J.set("[data-parts-transition-bg]",{opacity:0},"in+=1") );
      // >>> the LINES slide back DOWN with a 0.35s stagger <<<
      J.to(z,{y:"0",duration:2,ease:"power3.out",stagger:.35},K?"in+=1":"in"),
      J.to("header",{opacity:1,duration:.8},"in"),
      J.call(()=>{Y()})
    }
  };
  // swup wiring (minified ctor names): new Swup({ containers:["[data-container]"],
  //   plugins:[ new SwupGsapPlugin({animations:[X]}), new SwupHeadPlugin(...), new SwupGtagPlugin(...) ],
  //   animateHistoryBrowsing:true, cache:false })
  new _({containers:["[data-container]"],plugins:[new s$1({animations:[X]}),new i({/*persistTags*/}),new a({gaMeasurementId:"G-6VQ3TFKJ0W"})],animateHistoryBrowsing:!0,cache:!1})
}
```

### VERBATIM — GSAP effects + ease used for the transition title (from index.js)

```js
gsapWithCSS.registerEffect({name:"setTitle",extendTimeline:!0,
  effect:G=>gsapWithCSS.set(G,{y:"100%"})});
gsapWithCSS.registerEffect({name:"inTitle",extendTimeline:!0,
  effect:(G,F)=>gsapWithCSS.to(G,{duration:F.duration,y:0,
    ease:CustomEase.create("custom","M0,0 C0.068,0.007 0.105,0.014 0.14,0.117 0.174,0.219 0.198,0.353 0.214,0.502 0.225,0.614 0.268,0.772 0.341,0.86 0.448,0.99 0.704,1 1,1 "),
    stagger:F.stagger}),
  defaults:{stagger:.1,duration:1.6}});
```

### Smooth scroll (Lenis) init, verbatim — relevant because the lines/draw read smoother under Lenis

```js
scrollInit(){
  const F=z=>1-Math.pow(1-z,4);              // easeOutQuart
  window.lenis=new Lenis({duration:1.3,easing:F,autoRaf:!0});
}
```

---

## Technique explanation (how to rebuild it cleanly, with your own GSAP)

1. **Vertical lines.** Drop N thin (`0.5px`) full-height divs aligned to your grid columns,
   `position:absolute`, low opacity. Animate `y` between `-100%` (out) and `0%` (in). Out is fast
   (`0.8s`, `power1.inOut`); in is slow and staggered (`2s`, `power3.out`, `stagger:0.35`) so the
   lines cascade back in one after another. **This is the headline "line sweep" effect.**
2. **Arc draw.** One `<ellipse fill="none" stroke-width="1">` inside an SVG. Use GSAP's
   **DrawSVGPlugin**: set `drawSVG:"0%"`, then tween to `"0% 100%"` (stroke draws on), then to
   `"100% 100%"` (start point chases the end -> erases). The first tween reveals, the second wipes.
   If you don't have the (paid/Club) DrawSVG plugin, replicate with native
   `stroke-dasharray` + `stroke-dashoffset` and tween `stroke-dashoffset` 0 <-> pathLength.
3. **Orchestration.** A single GSAP timeline keyed with labels (`"in"`, `"in+=0.75"`, `"in+=2"`)
   sequences container fade, line sweep, arc draw, title reveal, then arc erase. Page routing is
   swup; the whole timeline is swup's `out` hook, and the reverse plays in the `in` hook. None of
   this requires swup specifically — any view-transition / barba / manual SPA hook works.
4. **De-glow note for Rod:** the dark version of this site puts the draw-on stroke (white/`--color-sub`)
   on a near-black field — the line *is* the light. That matches the "lantern needs night" principle.
   The blue radial glow in the screenshot is the WebGL fluid canvas, which is separate and optional.

---

## SCREENSHOT (headless, froze at preloader)

`shot.ps1` of https://kaitonote.com/ rendered the **preloader only** — the SPA never reaches the
content in headless Chrome (matches prior research note). What it DID capture is itself useful:
a partial **circular SVG stroke drawing** around a numeric "%" counter, over black with a faint
blue WebGL glow. This is the same DrawSVG arc technique used in the page transition, so the
screenshot visually confirms the mechanism even though the grid never loaded.
(Saved during capture to a temp PNG; not committed.)

---

## CHROME-AGENT SCRAPE REQUESTS

The line/arc motion is JS-timeline-driven and the bundle is minified, so the *exact* runtime values
(final eases after plugin defaults, the swup ctor real names, the DrawSVG plugin build) are best
captured live in a real browser. Requests for Rod's Chrome agent:

1. **URL:** https://kaitonote.com/ then click any nav link (INDEX -> WORKS -> PROFILE).
   **Capture:** a screen recording (or GIF) of the full page transition at 60fps. Specifically
   watch the 5 vertical lines sweeping up then cascading back, and the white circle stroke drawing
   on then wiping off. This gives the real-world timing the minified labels only approximate.

2. **URL:** https://kaitonote.com/assets/js/index.js
   **Capture:** run it through a JS beautifier (Prettier / `js-beautify`) and save the de-minified
   `pageTransition()`, `FooterComponent`, and the GSAP `registerEffect` blocks. Confirm whether
   DrawSVG is the real GSAP Club plugin or a custom `stroke-dashoffset` shim, and grab the exact
   swup plugin class (the minified ctor is `s$1` = likely `@swup/gsap-plugin` or a custom adapter).

3. **In DevTools on a loaded page:** with the page idle, in the Console run
   `getComputedStyle(document.querySelector('[data-line-vertical]')).cssText` and
   `document.querySelector('[data-parts-transition-circle] svg ellipse').getTotalLength()`
   to capture the real line styling and the ellipse path length (needed if rebuilding the draw with
   native `stroke-dasharray` instead of DrawSVG).
