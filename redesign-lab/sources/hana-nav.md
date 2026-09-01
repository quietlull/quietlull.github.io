# SOURCE (True) — HANA PC top-nav, from the live hana.b-rave.tokyo site

- **URL:** hana.b-rave.tokyo (Rod extracted from live `style.min.css` / `module.min.css` / `script.min.js`)
- **Captured:** 2026-06-09 (Rod, via web agent — de-minified)
- **Used by:** `rework-hana.html` top-bar **nav links** (the per-letter drop-shadow ignite-glow + active `.is-focus`). NOTE: our topbar is its own layout (avatar/toggles/social) — we take the NAV-LINK GLOW TREATMENT, not hana's full fixed-bar layout.
- **Scaling:** hana sizes everything via `calc(N * ((var(--pv) * 100) / var(--base)))` with `--base:3840` (design width) and `--pv ~= viewportWidth/270`. We drop this 3840-scaling and use normal rem/px.
- **Libs:** GSAP (per-letter rollover tween) + Lenis (smooth scroll) + global `consts.device`. The base ignite is pure CSS (drop-shadow on the `<a>`); the per-letter `<span>` GSAP stagger is an enhancement.
- **Caveat (Rod):** JS de-minified from the bundle; the GSAP rollover tween config was cut off at the bundle boundary. Mobile drawer `.page-nav--sd` excluded. `<font>` tags in live DOM = Google Translate injection, not original.

## HTML structure (verbatim)
```html
<nav class="page-nav page-nav--pc is-intersection" data-intersection>
  <div class="nav-logo">
    <a href="#top"><picture><source><img alt="HANA"></picture></a>
  </div>
  <div class="nav-link">
    <div class="link-items">
      <div class="items-item">
        <a data-focus data-rollover href="#news">
          <!-- each letter wrapped in its own <span> for the glow rollover -->
          <span>N</span><span>E</span><span>W</span><span>S</span>
        </a>
      </div>
      <!-- repeat items-item for: #schedule #ticket #merchandise #fanclub #tour #attention -->
    </div>
  </div>
  <div class="nav-aside">
    <div class="aside-items">
      <div class="items-item"><a data-rollover href="https://www.instagram.com/hana_brave_official/"><img></a></div>
      <!-- tiktok, x, youtube similarly -->
    </div>
  </div>
  <div class="nav-brave"><a href="..."><img></a></div>
</nav>
```
Anchors: `#news #schedule #ticket #merchandise #fanclub #tour #attention`. Active link gets `class="is-focus"`.

## CSS (verbatim, as authored)
```css
.page .page-nav--pc { position: fixed; left: 0; top: 0; width: 100%; z-index: 3; }
@media (hover: none) and (pointer: coarse), (max-width: 1024px) {
  .page .page-nav--pc { display: none; }
}
/* Logo (top-left) */
.page .page-nav--pc .nav-logo { position: absolute; left: calc(40 * ((var(--pv) * 100) / var(--base))); top: calc(30 * ((var(--pv) * 100) / var(--base))); }
.page .page-nav--pc .nav-logo a { display: block; width: calc(435 * ((var(--pv) * 100) / var(--base))); }
/* Center menu */
.page .page-nav--pc .nav-link { position: absolute; left: 0; right: 0; top: calc(60 * ((var(--pv) * 100) / var(--base))); width: fit-content; margin: auto; }
.page .page-nav--pc .nav-link .link-items { display: flex; gap: calc(70 * ((var(--pv) * 100) / var(--base))); }
.page .page-nav--pc .nav-link .link-items .items-item a { font-family: scotch-display, sans-serif; font-weight: 700; font-size: calc(48 * ((var(--pv) * 100) / var(--base))); line-height: 1; color: rgb(196, 0, 24); }
.page .page-nav--pc .nav-link .link-items .items-item a { filter: drop-shadow(0 0 calc(24 * ((var(--pv) * 100) / var(--base))) rgba(255,26,0,0)) drop-shadow(0 0 calc(24 * ((var(--pv) * 100) / var(--base))) rgba(255,26,0,0)) drop-shadow(0 0 calc(24 * ((var(--pv) * 100) / var(--base))) rgba(255,26,0,0)); transition: filter 0.125s cubic-bezier(0.215, 0.61, 0.355, 1); }
.page .page-nav--pc .nav-link .link-items .items-item a.is-focus { filter: drop-shadow(0 0 calc(24 * ((var(--pv) * 100) / var(--base))) rgba(255,26,0,0.8)) drop-shadow(0 0 calc(24 * ((var(--pv) * 100) / var(--base))) rgba(255,26,0,0.8)); transition: filter 0.125s cubic-bezier(0.215, 0.61, 0.355, 1); }
/* Social icons (right) */
.page .page-nav--pc .nav-aside { position: absolute; right: calc(290 * ((var(--pv) * 100) / var(--base))); top: calc(60 * ((var(--pv) * 100) / var(--base))); }
.page .page-nav--pc .nav-aside .aside-items { display: flex; gap: calc(60 * ((var(--pv) * 100) / var(--base))); }
.page .page-nav--pc .nav-aside .aside-items .items-item a { display: block; width: calc(50 * ((var(--pv) * 100) / var(--base))); }
.page .page-nav--pc .nav-aside .aside-items .items-item a { filter: drop-shadow(0 0 calc(24 * ((var(--pv) * 100) / var(--base))) rgba(15,12,9,0.4)) drop-shadow(0 0 calc(24 * ((var(--pv) * 100) / var(--base))) rgba(15,12,9,0.4)) drop-shadow(0 0 calc(24 * ((var(--pv) * 100) / var(--base))) rgba(15,12,9,0.4)); transition: filter 0.25s cubic-bezier(0.215, 0.61, 0.355, 1); }
[data-hover] .page .page-nav--pc .nav-aside .aside-items .items-item a:hover { filter: drop-shadow(0 0 calc(24 * ((var(--pv) * 100) / var(--base))) rgba(255,26,0,0.4)) drop-shadow(0 0 calc(24 * ((var(--pv) * 100) / var(--base))) rgba(255,26,0,0.4)); transition: filter 0.125s cubic-bezier(0.215, 0.61, 0.355, 1); }
/* B-RAVE button (far right) */
.page .page-nav--pc .nav-brave { position: absolute; right: calc(40 * ((var(--pv) * 100) / var(--base))); top: calc(40 * ((var(--pv) * 100) / var(--base))); }
.page .page-nav--pc .nav-brave a { display: block; width: calc(175 * ((var(--pv) * 100) / var(--base))); }
/* Reveal animation: elements start pushed up, slide down once on-screen */
.page .page-nav--pc { translate: 0; transition: translate 0.25s cubic-bezier(0.215, 0.61, 0.355, 1) 0.25s; }
.page .page-nav--pc .nav-logo, .page .page-nav--pc .nav-link, .page .page-nav--pc .nav-aside, .page .page-nav--pc .nav-brave { translate: 0 calc(-200 * ((var(--pv) * 100) / var(--base))); }
.page .page-nav--pc.is-intersection .nav-logo { translate: 0; transition: translate 0.5s cubic-bezier(0.215, 0.61, 0.355, 1); }
.page .page-nav--pc.is-intersection .nav-link  { translate: 0; transition: translate 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0.1s; }
.page .page-nav--pc.is-intersection .nav-aside { translate: 0; transition: translate 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0.2s; }
.page .page-nav--pc.is-intersection .nav-brave { translate: 0; transition: translate 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0.3s; }
/* Hidden state (e.g. at page bottom) */
.page .page-nav--pc.is-inactive { translate: 0 calc(-200 * ((var(--pv) * 100) / var(--base))); transition: translate 0.25s cubic-bezier(0.215, 0.61, 0.355, 1); }
```
Required vars: `--base:3840;` `--pv` (~viewportWidth/270). Font: Adobe Typekit `scotch-display`.

## JS behavior (de-minified)
```js
// 1) Hide bar at very bottom
window.addEventListener("scroll", () => {
  if (window.scrollY + window.innerHeight + 50 >= document.documentElement.scrollHeight) {
    document.querySelector(".page-nav--pc").classList.add("is-inactive");
    document.querySelector(".page-container .container-footer").classList.add("is-active");
  } else {
    document.querySelector(".page-nav--pc").classList.remove("is-inactive");
    document.querySelector(".page-container .container-footer").classList.remove("is-active");
  }
});
window.dispatchEvent(new Event("scroll"));
// 2) Active-link highlight via IntersectionObserver (centered-viewport rootMargin)
if (consts.device === "pc") {
  this.objs.intersectionObserver.id = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll("[data-focus]").forEach((link) => {
          if (link.getAttribute("href") === "#" + entry.target.id) link.classList.add("is-focus");
          else link.classList.remove("is-focus");
        });
      }
    });
  }, { root: null, rootMargin: "-50% 0% -50% 0%" });
  document.querySelectorAll("[data-id]").forEach((el) => this.objs.intersectionObserver.id.observe(el));
}
// 3) One-time reveal: add .is-intersection when bar enters view
this.objs.intersectionObserver.intersection = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-intersection"); });
}, { root: null, rootMargin: "0% 0% -25% 0%" });
// 4) Hover rollover glow (GSAP) on each link's letter <span>s  [CONFIG CUT OFF at bundle boundary]
if (consts.device === "pc") {
  document.querySelectorAll("[data-rollover]").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      if (!el.classList.contains("is-focus")) {
        gsap.killTweensOf(el.querySelectorAll("span"));
        gsap.to(el.querySelectorAll("span"), {
          filter: "drop-shadow(0px 0px " + (window.innerWidth / 3840 * 24) + "px rgba(255,26,0,0.8)) ...",
        });
      }
    });
  });
}
```

## Remix plan for rework-hana
- Take the **drop-shadow ignite-glow** on nav `<a>` (3 stacked `drop-shadow`, transparent->colored on hover/active, `transition:filter .125s`), recolored red `rgba(255,26,0,...)` -> our orange/amber `--glow`.
- Active link = `.is-focus` persistent glow (drive via our existing active-nav logic).
- Drop hana's 3840 `--pv/--base` scaling; use normal units.
- Per-letter `<span>` GSAP stagger = OPTIONAL enhancement (would need the cut-off GSAP config + GSAP lib). Base CSS ignite is enough for the element.
- Tier: **Remixed**.
