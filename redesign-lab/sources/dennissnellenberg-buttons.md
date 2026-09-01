# SOURCE: dennissnellenberg.com/work — magnetic button + rising-circle fill (2026-06-14)

Rod-provided VERBATIM pull of the live button (HTML/CSS/JS). True-Code well for: the
**rising-circle fill** (`.btn-fill`), the **magnetic drift + text-follow**, and the **Elastic
release spring**. Upstream credit in their own source: codepen.io/tdesero/pen/RmoxQg.

CAVEAT (Rod): the extractor tripped a content filter and stripped a few `=` signs in transit;
Rod restored them. Logic/values intact, but **syntax-check before shipping**.
Deps in original: jQuery + GSAP 3.9.1 (Elastic, Power2/3/4). Our rebuild is dependency-free.

## HTML
```html
<div class="btn btn-round">           <!-- wrapper sets variant: btn-normal, btn-round, ... -->
  <a href="/contact" class="btn-click magnetic" data-strength="50" data-strength-text="25">
    <div class="btn-fill"></div>
    <span class="btn-text"><span class="btn-text-inner">Get in touch</span></span>
  </a>
</div>
```
`data-strength` = whole-button drift toward cursor; `data-strength-text` = smaller label drift
(lags behind = parallax). Round CTA = 50/25; inline buttons = 24/12.

## CSS (key bits)
Custom props: `--color-blue:#455CE9; --color-dark:#1C1D20; --color-white:#FFFFFF;`
`--animation-smooth: all .7s cubic-bezier(.7,0,.3,1)`.
```css
.btn { position:relative; z-index:5; } .btn:hover { z-index:15; }
.btn-click {
  cursor:pointer; border:0; background:transparent; border-radius:2.125em; height:4.25em;
  padding:0; overflow:hidden;            /* clips the fill circle */
  display:flex; align-items:center; justify-content:center; position:relative;
  text-decoration:none; will-change:transform; transform:translateZ(0) rotate(0.001deg);
}
/* the fill: oversized circle parked below, slid up on hover */
.btn-fill {
  background:var(--color-blue); position:absolute;
  width:150%; height:200%; border-radius:50%; top:-50%; left:-25%;
  transform:translate3d(0,-76%,0);       /* hidden below; JS animates y -> 0% */
  will-change:transform; transition:background-color .25s ease-in-out;
}
.btn-text {
  display:flex; align-items:center; justify-content:center; width:100%; height:100%;
  padding:0 2.5em; z-index:2; color:var(--color-dark); position:relative;
  transform:rotate(0.001deg); pointer-events:none; will-change:transform,color;
}
.btn-round .btn-click { width:clamp(9em,12vw,11em); height:clamp(9em,12vw,11em);
  border-radius:50%; background:var(--color-dark); }
.btn-round .btn-text { padding:0 1em; text-align:center; }
.btn-round .btn-text-inner { color:#fff; } .btn-round .btn-fill { background:var(--color-blue); }
.btn-normal .btn-click { box-shadow:inset 0 0 0 1px var(--color-border); }
.btn-normal.active .btn-click .btn-text-inner { color:var(--color-white)!important; }
.btn-normal.not-active .btn-click .btn-fill { background-color:var(--color-dark); transition:var(--animation-smooth); }
```
The trick: fill is a 150%x200% circle, bulk hidden below (`translateY(-76%)`), `overflow:hidden`
clips it; hover slides it to `0%`.

## JS (GSAP + jQuery — verbatim, sanitized)
```js
function initMagneticButtons() {
  var magnets = document.querySelectorAll('.magnetic');
  if (window.innerWidth > 540) {                 // magnetism only > 540px
    magnets.forEach((magnet) => {
      magnet.addEventListener('mousemove', moveMagnet);
      magnet.addEventListener('mouseleave', function (event) {   // spring back
        gsap.to(event.currentTarget, 1.5, { x:0, y:0, ease:Elastic.easeOut });
        gsap.to($(this).find(".btn-text"), 1.5, { x:0, y:0, ease:Elastic.easeOut });
      });
    });
    function moveMagnet(event) {
      var b = event.currentTarget, r = b.getBoundingClientRect();
      var s = b.getAttribute("data-strength"), st = b.getAttribute("data-strength-text");
      gsap.to(b, 1.5, {                            // whole button toward cursor
        x:(((event.clientX - r.left)/b.offsetWidth) - 0.5) * s,
        y:(((event.clientY - r.top)/b.offsetHeight) - 0.5) * s,
        rotate:"0.001deg", ease:Power4.easeOut });
      gsap.to($(this).find(".btn-text"), 1.5, {    // text a smaller amount = parallax lag
        x:(((event.clientX - r.left)/b.offsetWidth) - 0.5) * st,
        y:(((event.clientY - r.top)/b.offsetHeight) - 0.5) * st,
        rotate:"0.001deg", ease:Power4.easeOut });
    }
  }
  // ---- hover fill ----
  $('.btn-click.magnetic').on('mouseenter', function () {
    if ($(this).find(".btn-fill").length)
      gsap.to($(this).find(".btn-fill"), .6, { startAt:{ y:"76%" }, y:"0%", ease:Power2.easeInOut });
    if ($(this).find(".btn-text-inner.change").length)
      gsap.to($(this).find(".btn-text-inner.change"), .3, { startAt:{ color:"#1C1D20" }, color:"#FFFFFF", ease:Power3.easeIn });
  });
  $('.btn-click.magnetic').on('mouseleave', function () {
    if ($(this).find(".btn-fill").length)
      gsap.to($(this).find(".btn-fill"), .6, { y:"-76%", ease:Power2.easeInOut });
    if ($(this).find(".btn-text-inner.change").length)
      gsap.to($(this).find(".btn-text-inner.change"), .3, { color:"#1C1D20", ease:Power3.easeOut, delay:.3 });
  });
}
```

## Rebuild mapping (dependency-free, our stack)
- Magnet move: `Power4.easeOut` 1.5s tween -> our rAF + lerp(0.1) toward the SAME normalized-offset
  target. Text-follow = same formula x `data-strength-text` on the inner layer (we already do this).
- Release: GSAP `Elastic.easeOut` bounce -> hand-rolled spring (or lerp ease-out). Rod previously
  accepted the lerp approximation; now wants the richer follow, so a small spring may be worth it.
- Fill: pure CSS handles it — circle `translateY(76%->0)` on `:hover`/`.is-on`; no JS needed if we
  don't animate `startAt`. Keep `overflow:hidden` on the clickable.
- NOTE vs the unused nfranciosi left->right sweep currently in button-kit: this REPLACES it.
