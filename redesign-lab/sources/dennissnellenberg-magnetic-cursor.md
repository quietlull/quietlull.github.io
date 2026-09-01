# Dennis Snellenberg — Magnetic Buttons + Sticky (Lerped) Cursor

**Source URL:** https://dennissnellenberg.com/
**Asset URL (verbatim origin):** https://dennissnellenberg.com/assets/js/index-new.js
  - `initMagneticButtons()` lines ~611–697
  - `initStickyCursorWithDelay()` lines ~703–813
**Libs:** GSAP 3.9.1 + jQuery 3.5.1
**Author's own credited sources (in their comments):**
  - Magnetic buttons: https://codepen.io/tdesero/pen/RmoxQg
  - Sticky cursor: https://greensock.com/forums/topic/21161-animated-mouse-cursor/

**Captured 2026-06-11**
**Tier: True** (verbatim from the site's own unminified `index-new.js` — not a bundle.)

---

## Effect 1 — Magnetic buttons (element pulled toward cursor)

Any element with `.magnetic` is attracted to the pointer while hovered. As the cursor moves inside the element, GSAP translates the element toward the cursor by a fraction of the offset-from-center, scaled by per-element `data-strength`. The inner `.btn-text` moves a *smaller* amount (`data-strength-text`) for a subtle parallax. On `mouseleave`, an `Elastic.easeOut` snaps it back to origin.

### VERBATIM JS

```javascript
function initMagneticButtons() {
    
  // Magnetic Buttons
  // Found via: https://codepen.io/tdesero/pen/RmoxQg
  var magnets = document.querySelectorAll('.magnetic');
  var strength = 100;
  
  // START : If screen is bigger as 540 px do magnetic
  if(window.innerWidth > 540){
  // Mouse Reset
  magnets.forEach( (magnet) => {
    magnet.addEventListener('mousemove', moveMagnet );
    $(this.parentNode).removeClass('not-active');
    magnet.addEventListener('mouseleave', function(event) {
        gsap.to( event.currentTarget, 1.5, {
          x: 0, 
          y: 0, 
          ease: Elastic.easeOut
        });
        gsap.to( $(this).find(".btn-text"), 1.5, {
          x: 0, 
          y: 0, 
          ease: Elastic.easeOut
        });
    });
  });

  // Mouse move
  function moveMagnet(event) {
    var magnetButton = event.currentTarget;
    var bounding = magnetButton.getBoundingClientRect();
    var magnetsStrength = magnetButton.getAttribute("data-strength");
    var magnetsStrengthText = magnetButton.getAttribute("data-strength-text");
      
    gsap.to( magnetButton, 1.5, {
        x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * magnetsStrength,
        y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * magnetsStrength,
        rotate: "0.001deg",
        ease: Power4.easeOut
    });
    gsap.to( $(this).find(".btn-text"), 1.5, {
        x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * magnetsStrengthText,
        y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * magnetsStrengthText,
        rotate: "0.001deg",
        ease: Power4.easeOut
    });
  }

  }; // END : If screen is bigger as 540 px do magnetic
  // ... (mouseenter/mouseleave wave-fill handlers continue here — see dennissnellenberg-wave-button.md)
}
```

### Technique explanation

- **Offset math:** `(clientX - bounding.left) / offsetWidth` gives 0..1 across the element; subtract `0.5` to center it to `-0.5..+0.5`; multiply by `data-strength` (px). So the element drifts toward the cursor, strongest at the edges.
- **`data-strength` / `data-strength-text`** are per-button attributes on the HTML (e.g. `data-strength="50" data-strength-text="25"`). Text uses the smaller value → parallax.
- **`Power4.easeOut` over 1.5s** makes the follow feel heavy/smooth (it lerps, never snaps to the raw position). **`Elastic.easeOut`** on leave gives the springy return.
- **`rotate:"0.001deg"`** is a GSAP trick to force GPU rasterization / sub-pixel smoothness.
- **Guarded to `window.innerWidth > 540`** — disabled on mobile (no hover).

### Pure-JS port (no GSAP) sketch
Replace the `gsap.to(..., 1.5, {x,y, ease:Power4.easeOut})` with a CSS `transition: transform .6s cubic-bezier(.23,1,.32,1)` on the element and set `el.style.transform = \`translate(${x}px,${y}px)\`` in `mousemove`; reset to `translate(0,0)` on `mouseleave`. The elastic return needs a springy cubic-bezier or a small JS spring.

---

## Effect 2 — Sticky cursor with delay (lerped custom cursor)

A custom cursor element (image / button / span follower) chases the real pointer with **per-layer lag**. A GSAP ticker runs every ~8.3ms (120fps) and eases each follower's stored position toward the live mouse coords by a divisor (`/12`, `/7`, `/6`) — classic linear-interpolation smoothing. Different divisors = different trailing speeds per layer.

### VERBATIM JS

```javascript
function initStickyCursorWithDelay() {
    
  // Sticky Cursor with delay
  // https://greensock.com/forums/topic/21161-animated-mouse-cursor/
  var cursorImage = $(".mouse-pos-list-image")
  var cursorBtn = $(".mouse-pos-list-btn");
  var cursorSpan = $(".mouse-pos-list-span");

  var posXImage = 0
  var posYImage = 0
  var posXBtn = 0
  var posYBtn = 0
  var posXSpan = 0
  var posYSpan = 0
  var mouseX = 0
  var mouseY = 0

  if(document.querySelector(".mouse-pos-list-image, .mouse-pos-list-btn, .mouse-post-list-span")) {
  gsap.to({}, 0.0083333333, {
    repeat: -1,
    onRepeat: function() {

      if(document.querySelector(".mouse-pos-list-image")) {
        posXImage += (mouseX - posXImage) / 12;
        posYImage += (mouseY - posYImage) / 12;
        gsap.set(cursorImage, {
          css: {
          left: posXImage,
          top: posYImage
          }
        });
      }
      if(document.querySelector(".mouse-pos-list-btn")) {
        posXBtn += (mouseX - posXBtn) / 7;
        posYBtn += (mouseY - posYBtn) / 7;
        gsap.set(cursorBtn, {
          css: {
          left: posXBtn,
          top: posYBtn
          }
        });
      }
      if(document.querySelector(".mouse-pos-list-span")) {
        posXSpan += (mouseX - posXSpan) / 6;
        posYSpan += (mouseY - posYSpan) / 6;   
        gsap.set(cursorSpan, {
          css: {
          left: posXSpan,
          top: posYSpan
          }
        });
      }
    }
  });
  }

  $(document).on("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // hover state toggles (add/remove .active / .active-big / .pressed on the followers)
  $('.mouse-pos-list-image-wrap a').on('mouseenter', function() {
    $('.mouse-pos-list-image, .mouse-pos-list-btn, .mouse-pos-list-span, .mouse-pos-list-span-big').addClass('active');
  });
  $('.mouse-pos-list-image-wrap a').on('mouseleave', function() {
    $('.mouse-pos-list-image, .mouse-pos-list-btn, .mouse-pos-list-span, .mouse-pos-list-span-big').removeClass('active');
  });
  $('.single-tile-wrap a, .mouse-pos-list-archive a, .next-case-btn').on('mouseenter', function() {
    $('.mouse-pos-list-btn, .mouse-pos-list-span').addClass('active-big');
  });
  $('.single-tile-wrap a, .mouse-pos-list-archive a, .next-case-btn').on('mouseleave', function() {
    $('.mouse-pos-list-btn, .mouse-pos-list-span').removeClass('active-big');
  });
  $('main').on('mousedown', function() {
    $(".mouse-pos-list-btn, .mouse-pos-list-span").addClass('pressed');
  });
  $('main').on('mouseup', function() {
    $(".mouse-pos-list-btn, .mouse-pos-list-span").removeClass('pressed');
  });
}
```

### Technique explanation

- **The lerp:** `pos += (mouse - pos) / N` each tick. Larger `N` = more lag / slower catch-up. Image follower (`/12`) trails most; span (`/6`) is snappiest.
- **Driven by a GSAP dummy tween** (`gsap.to({}, 0.0083s, {repeat:-1, onRepeat})`) used purely as a 120fps ticker. A modern equivalent is `gsap.ticker.add(...)` or a plain `requestAnimationFrame` loop.
- **`mousemove` only stores coords** (`mouseX/mouseY`); the ticker does the smoothing — decoupling input from render is what makes it buttery.
- **State classes** (`active`, `active-big`, `pressed`) are toggled on hover/press to grow/shrink/restyle the follower (the visual change lives in CSS — see `.mouse-pos-list-btn` / `.mouse-pos-list-span` rules in `style-new.css`, lines ~1717–1860).

### Pure-JS port (no GSAP)
```js
let mx=0,my=0,px=0,py=0;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
function tick(){ px+=(mx-px)/8; py+=(my-py)/8;
  cursor.style.transform=`translate(${px}px,${py}px)`; requestAnimationFrame(tick); }
tick();
```
(Prefer `transform: translate()` over `left/top` for performance — the original uses `left/top`, which is the one thing worth modernizing on port.)

---

## Notes for Rod's stack
- Both effects depend on **GSAP + jQuery**. The site loads GSAP 3.9.1, jQuery 3.5.1, ScrollTrigger, Locomotive Scroll, and Barba. The magnetic + lerp-cursor logic does NOT require Locomotive/Barba — only GSAP (and jQuery, which is trivially removable).
- The magnetic follow and the wave-fill button live in the **same** `.magnetic` element family (`initMagneticButtons` handles both), which is why they feel like one effect on the live site.
