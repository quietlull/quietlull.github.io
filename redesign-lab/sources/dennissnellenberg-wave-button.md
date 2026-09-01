# Dennis Snellenberg — Wave-Fill Button

**Source URL:** https://dennissnellenberg.com/
**Asset URLs (verbatim origin of this code):**
- CSS: https://dennissnellenberg.com/assets/css/styleguide.css (lines ~404–485, ~624–658)
- JS:  https://dennissnellenberg.com/assets/js/index-new.js (`initMagneticButtons`, lines ~611–697)
- Libs: GSAP 3.9.1 (`gsap.min.js`) + jQuery 3.5.1

**Captured 2026-06-11**
**Tier: True** (verbatim, copied directly from the site's own unminified `styleguide.css` and `index-new.js` — these are the author's own readable source files, NOT a webpack/GSAP bundle.)

---

## What the effect is

On hover, a **blue blob sweeps up from the bottom of the button** and the label flips to white. The blob is NOT a rectangle — it is a large **ellipse** (`border-radius: 50%`, `150% × 200%`) parked below the button. Because its top edge is curved, as it slides up the fill enters with a **rounded, wave-like bulge** rather than a flat line. That curved leading edge is the entire "wave" illusion. GSAP animates the slide with an ease, jQuery toggles it on `mouseenter` / `mouseleave`.

The button text and fill are separate layers stacked by `z-index`; `overflow: hidden` on `.btn-click` clips the oversized ellipse to the pill shape.

---

## HTML structure (the markup these rules target)

```html
<div class="btn btn-normal magnetic btn-click" data-strength="50" data-strength-text="25">
  <a class="btn-click magnetic" href="...">
    <span class="btn-fill"></span>
    <span class="btn-text">
      <span class="btn-text-inner change">Label</span>
    </span>
  </a>
</div>
```
(`.btn-fill` = the sweeping ellipse, `.btn-text` = label layer above it, `.change` = the inner text whose color GSAP tweens to white.)

---

## CSS — VERBATIM from styleguide.css

```css
.btn {
    margin-bottom: calc(var(--gap-padding) / 2);
    position: relative;
    z-index: 5;
    border: 0;
    outline: 0;
}

.btn:hover {
    z-index: 15;
}

.btn-click {
	cursor: pointer;
	border: 0;
	color: var(--primary-dark);
	background: transparent;
	border-radius: 2.125em;
	min-width: 1em;
	height: 4.25em;
	padding: 0;
	font-size: 1em;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
    position: relative;
    text-decoration: none;
    will-change: transform;
    outline: 0;
    transform: translateZ(0) rotate(0.001deg);
}

.btn-normal .btn-click {
    -webkit-box-shadow: inset 0px 0px 0px 1px var(--color-border); 
    box-shadow: inset 0px 0px 0px 1px var(--color-border);
}

.btn-fill {
    background: var(--color-blue);
	position: absolute;
	width: 150%;
	height: 200%;
	border-radius: 50%;
	top: -50%;
	left: -25%;
	transform: translate3d(0,-76%,0);
    will-change: transform;
    transition: background-color ease-in-out .25s;
}

.btn-text {
    display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
    padding: 0 2.5em;
    z-index: 2;
    color: var(--color-dark);
    position: relative;
    transform: rotate(0.001deg);
    pointer-events: none;
    will-change: transform, color;
}

/* "active" / "not-active" state variants (used when JS toggles classes
   instead of, or in addition to, the GSAP tween) */
.btn-normal.active .btn-click .btn-text-inner {
    color: var(--color-white) !important;
}
.btn-normal.not-active .btn-click .btn-text-inner {
    transition: var(--animation-smooth);
}
.btn-normal.active .btn-click .btn-fill {
    transform: translate3d(0,0%,0) !important;
    background-color: var(--color-dark);
} 
.btn-normal.not-active .btn-click .btn-fill {
    background-color: var(--color-dark);
    transition: var(--animation-smooth);
}

/* Round (circle) button variant — same .btn-fill ellipse, just a circular clip */
.btn-round .btn-click {
    width: clamp(9em, 12vw, 11em);
    height: clamp(9em, 12vw, 11em);
    border-radius: 50%;
    border: 0;
    background: var(--color-dark);
}
.btn-round .btn-fill {
    background: var(--color-blue);
}
```

---

## JS — VERBATIM from index-new.js (hover-fill half of `initMagneticButtons`)

```javascript
  // Mouse Enter
  $('.btn-click.magnetic').on('mouseenter', function() {
    if($(this).find(".btn-fill").length) {
    gsap.to($(this).find(".btn-fill"), .6, {
        startAt: {y: "76%"},
        y: "0%",
        ease: Power2.easeInOut
    });
    }
    if($(this).find(".btn-text-inner.change").length) {
    gsap.to($(this).find(".btn-text-inner.change"), .3, {
        startAt: {color: "#1C1D20"},
        color: "#FFFFFF",
        ease: Power3.easeIn,
    });
    }
    $(this.parentNode).removeClass('not-active');
  });

  // Mouse Leave
  $('.btn-click.magnetic').on('mouseleave', function() {
    if($(this).find(".btn-fill").length) {
    gsap.to($(this).find(".btn-fill"), .6, {
        y: "-76%",
        ease: Power2.easeInOut
    });
    }
    if($(this).find(".btn-text-inner.change").length) {
    gsap.to($(this).find(".btn-text-inner.change"), .3, {
        color: "#1C1D20",
        ease: Power3.easeOut,
        delay: .3
    });
    }
    $(this.parentNode).removeClass('not-active');
  });
```

---

## Technique explanation / how to reuse

1. **The wave = a clipped ellipse, not a gradient.** `.btn-fill` is `150%` wide, `200%` tall, with `border-radius:50%` → a big ellipse. It sits behind the text, parked at `translateY(-76%)` (mostly above, peeking nothing) on the *normal* button, or below for the hover-up version. `overflow:hidden` on the pill clips it.
2. **On hover GSAP slides it to `y:0%`** over `.6s` with `Power2.easeInOut`. Because the ellipse's leading edge is round, the fill arrives as a curved sweep — the "wave."
3. **Text recolors in parallel** — a separate `.3s` GSAP tween fades `.btn-text-inner.change` from dark `#1C1D20` to white `#FFFFFF`, with a `delay:.3` on the way out so the text stays readable until the fill recedes.
4. **Two trigger paths exist:** the GSAP tween (above) AND CSS class toggles (`.active` / `.not-active`) that move the same `.btn-fill` via `transform: translate3d(0,0%,0)`. Pick one; GSAP gives the smoother ease.
5. **Pure-CSS port (no GSAP):** put `transition: transform .6s cubic-bezier(.65,0,.35,1)` on `.btn-fill`, default `transform: translateY(76%)`, and on `:hover .btn-fill { transform: translateY(0); }` plus `:hover .btn-text-inner { color:#fff; }`. That reproduces ~90% of it without jQuery/GSAP.

**Required CSS vars to define:** `--color-blue` (fill), `--color-dark` / `--primary-dark` (text + border), `--color-white`, `--color-border`, `--gap-padding`, `--animation-smooth` (a transition shorthand).
