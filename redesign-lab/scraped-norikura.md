# Scraped elements for norikura (2026-06-11)

Real HTML/CSS pulled via `Invoke-WebRequest` from Rod's picked sites. These are **`Remixed` sources** (verbatim code, cited) to recolor into our palette (night `#070C23` / amber `#F59E0B` / gold `#FBBF24` / orange-halo `#FF6A00`, hairlines in gold). Japanese label text dropped (mojibake in pull; we use our own copy).

Palette translation applied where noted: their `#fff`/`#333` hairlines → our gold; their dark bg → our night.

---

## 1. TOP NAV ← suwako-hanabi.com
**Source:** `suwako-hanabi.com` theme `layout.css` (`.gnavi`). The elegant version = inline-block items with `border-right` dividers + a **hairline underline that scales from 0 on hover** (`scaleX(0)→scaleX(1)`). Very on-register.

**HTML:**
```html
<nav class="gnavi">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">Projects</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Ramblings</a></li>
  </ul>
</nav>
```
**CSS (verbatim; recolor `#fff` → gold):**
```css
.gnavi{ overflow:hidden; letter-spacing:-.5em; line-height:1.3em; }   /* letter-spacing:-.5em kills inline-block gaps; reset on li */
.gnavi li{ letter-spacing:normal; display:inline-block; vertical-align:top; border-right:1px solid #fff; }  /* -> gold divider */
.gnavi li:last-child{ border-right:none; }
.gnavi li a{ display:block; padding:0 20px; position:relative; }
.gnavi li a:after{ content:''; position:absolute; bottom:-5px; left:0; right:0; margin:auto;
  width:80%; height:1px; background-color:#fff;            /* -> gold underline */
  transform:scaleX(0); transition:all .5s ease; }
.gnavi li a:hover::after{ transform:scaleX(1); }
```
(Alt: `#gnav` is a `display:table` version with a dropdown `.menu` on hover, bg `#19192b` — use if you want dropdowns. The `.gnavi` underline version is cleaner for us.)

---

## 2. BUTTONS ← restaurant.nelu.osaka
**Source:** `nelu.osaka` `main.css` (`.boxbutton`). Signature = **beveled/cut corners via `clip-path`** + an **inset hairline border** (`:before`, offset inward) + an **arrow** + the **hoverRoll** text animation (two stacked spans roll on hover). This is the hairline+arrow restraint motif, premium.

**HTML:**
```html
<a class="boxbutton hoverRoll" href="#">
  <div class="boxbutton__text hoverRoll__text"><span>View project</span></div>
  <div class="boxbutton__arrow"></div>
</a>
```
**CSS (verbatim; recolor `rgba(51,51,51,.5)` → gold hairline, arrow svg → gold):**
```css
.boxbutton{ position:relative; display:inline-flex; align-items:center; justify-content:center;
  clip-path:polygon(.8rem 0,calc(100% - .8rem) 0,100% .8rem,100% calc(100% - .8rem),calc(100% - .8rem) 100%,.8rem 100%,0 calc(100% - .8rem),0 .8rem);
  font-size:max(1.2rem,10px); gap:0 .8rem; line-height:1.41; min-height:4.4rem; min-width:14.5rem; padding:1.35rem 2rem; }
.boxbutton:before{ content:""; display:block; position:absolute; pointer-events:none;
  border:1px solid rgba(51,51,51,.5);                       /* -> gold hairline */
  top:.4rem; left:.4rem; height:calc(100% - .8rem); width:calc(100% - .8rem); }
.boxbutton__arrow{ position:relative; top:-1px; width:1.5rem; height:max(.5rem,5px);
  background:url(/images/common/arrow.svg) no-repeat bottom/contain; }   /* -> gold arrow */
.boxbutton.boxbutton--medium{ font-family:source-han-serif-japanese,serif; min-height:6.5rem; min-width:25.5rem; padding:2.2rem 2.5rem; }
/* hoverRoll text animation */
.hoverRoll__text{ display:block; position:relative; width:auto; height:auto; overflow:hidden; }
.hoverRoll__text span{ display:block; width:100%; }
.hoverRoll__text span+span{ position:absolute; left:0; top:calc(100% + 2px); }   /* duplicate the <span> for the roll */
.hoverRoll.hover .hoverRoll__text span{ animation:textRollOver .75s cubic-bezier(.19,1,.22,1); }
```
**GAPS to grab when wiring (cheap):** the `@keyframes textRollOver` (translateY roll) + a 3-line JS to toggle `.hover` on mouseenter (their JS bundle drives it; trivial to rewrite). The dark variant uses `.floatbtn.reverse → background:#1a1a1a; color:#f6f1eb` (→ our night/gold).

---

## 3. FOOTER ← sengokuhanabi.com
**Source:** `sengokuhanabi.com` `style.css` (`.footer`). "follow us" big display + centered SNS icon row (scale-on-hover) + absolute-centered copyright.

**HTML:**
```html
<footer class="footer">
  <div class="sns_wrap">
    <p class="follow">follow us</p>
    <div class="flex_wrap">
      <div class="icon"><a href="#"><img src="..." alt=""></a></div>
      <div class="icon"><a href="#"><img src="..." alt=""></a></div>
      <div class="icon"><a href="#"><img src="..." alt=""></a></div>
    </div>
  </div>
  <p class="copyright"><small>&copy; Rodney Fan</small></p>
</footer>
```
**CSS (verbatim; recolor bg `#381508` → our night, drop the hanabi bg image):**
```css
.footer{ margin:80px 0 0; padding:80px 0 20px; min-height:450px; position:relative;
  background:#381508 url("../images/bg_hanabi_02.png") no-repeat center top/cover; }  /* -> night, no image (or our Three.js shows through) */
.footer .sns_wrap .follow{ text-align:center; font-weight:400; font-size:6.4rem; margin:0 0 40px;
  font-family:"BebasNeue","Roboto",sans-serif; }                /* -> our display/mono */
.footer .sns_wrap .flex_wrap{ display:flex; justify-content:center; align-items:center; gap:30px; }
.footer .sns_wrap .flex_wrap .icon a img{ width:40px; height:40px; transition:all .3s; transform:scale(1); }
.footer .sns_wrap .flex_wrap .icon a:hover img{ transform:scale(1.1); }
.footer .copyright{ position:absolute; bottom:20px; left:50%; transform:translate(-50%,0); font-size:1.5rem; font-weight:500; }
```

---

## 4. POSTS SECTION ← sengokuhanabi.com `.decision` (event announcement)
**Source:** `sengokuhanabi.com` `.decision` — the centered serif event-announcement block (h2 + dated detail paragraphs). This is the "event info" presentation; reads as a clean dated post card. **CONFIRM** this is what you meant by "event inquiries" (their `#contact` is a separate inquiry form — say if you wanted that instead).

**HTML:**
```html
<section class="decision">
  <div class="decision_inner">
    <h2>Half a Million Blades of Grass</h2>
    <p>Mar 2026 &middot; Shaders &middot; 9 min read</p>
    <p>A GPU-instanced grass system: per-blade compute, wind via flow noise...</p>
  </div>
</section>
```
**CSS (verbatim; serif h2 is the key — already our Shippori/Newsreader register):**
```css
.decision{ display:flex; align-items:center; justify-content:center; min-height:338px; padding:0 1em;
  background:url(../images/bg_decision.svg) no-repeat center/min(1000px,100%) auto; }   /* -> a hairline frame instead of the svg */
.decision .decision_inner{ max-width:1000px; width:100%; margin:0 auto; padding:40px 50px; }
.decision .decision_inner h2{ font-weight:600; font-size:3rem; letter-spacing:.05em; line-height:1.6; text-align:center; margin-bottom:30px;
  font-family:YakuHanMP,"Newsreader","ShipporiMinchoB1","Noto Serif JP",serif; }   /* serif display — keep */
```
(They also have a floating ticket button `.floating_btn` fixed bottom-right — same idiom as norikura's CTA pill, available if useful.)

### 4b. Post container ← `.inner` (site-wide centered wrapper)
```css
.inner{ max-width:1200px; margin:0 auto; padding:0 6.4vw; }   /* the consistent centered measure that wraps every section */
```

### 4c. Info / contact card ← `.sec-contact .contact_wrap` (serif heading + deco-rule underline + structured rows)
Rod wants this WITH the `.decision` card + `.inner` as the post kit. For us: heading + meta rows (repo/read-time) instead of tel/mail.
**HTML:**
```html
<section class="sec-contact" id="contact">
  <div class="inner">
    <div class="contact_wrap">
      <h3 class="contact_heading">Project details</h3>
      <address>
        <p class="bold">Compute Grass</p>
        <p>Unity &middot; HLSL &middot; Compute &middot; Mar 2026</p>
        <div class="flex_wrap">
          <div class="tel_wrap"><span class="s_ttl">Repo</span><span class="tel"><a href="#">github.com/&hellip;</a></span></div>
          <div class="mail_wrap"><span class="s_ttl">Read</span><span class="mail"><a href="#">9 min</a></span></div>
        </div>
      </address>
    </div>
  </div>
</section>
```
**CSS (verbatim; recolor white card → dark hairline panel, brown → light/gold):**
```css
.sec-contact{ margin:70px 0 0; }
.sec-contact .contact_wrap{ max-width:1000px; margin:0 auto; padding:40px;
  background:rgba(255,255,255,.9); color:#381508; }            /* -> rgba(12,16,38,.66) panel + 1px gold hairline + light text */
.contact_wrap{ text-align:center; padding:30px; }
.contact_wrap .contact_heading{ position:relative; font-weight:700; font-size:2.4rem; letter-spacing:.05em;
  font-family:YakuHanMP,"Newsreader","ShipporiMinchoB1","Noto Serif JP",serif; }   /* serif display — keep */
.contact_wrap .contact_heading::after{ content:""; display:block; position:absolute; bottom:-20px; left:50%; transform:translate(-50%,0);
  width:50px; height:10px; background:url("../images/deco_heading_brown.svg") no-repeat center/contain; }  /* -> a short gold hairline rule */
.contact_wrap address{ margin:40px 0 0; }
.contact_wrap address p{ margin:0 0 12px; }
.contact_wrap address .flex_wrap{ display:flex; justify-content:center; align-items:center; gap:60px; }
```

**THE POST KIT (all from sengoku):** `.inner` container → holds a `.decision` announcement card (serif h2 + dated lines) + a `.contact_wrap` info card (serif heading w/ deco-rule underline + structured meta rows). Three pieces, one coherent post layout.

---

## 5. ARTICLE LAYOUT ← gagosian.com/quarterly — ⛔ DROPPED
**Rod (2026-06-11):** their single-article reading layout is plain; we don't need to copy it. The index-grid notes below are kept only as an optional reference; not part of the build.

**Source:** Next.js + **Tailwind** — the layout IS the utility classes in the markup, so it's lifted directly (no CSS file needed). The quarterly index uses a 12-col editorial grid with image-left/text patterns, dark sections.

**Structure (verbatim Tailwind from the page):**
```html
<main class="mx-auto flex w-full max-w-screen-3xl flex-1 flex-col">
  <section class="w-full px-4 dark:bg-gray-800 dark:text-white" data-theme="dark">
    <div class="mx-auto w-full max-w-screen-xl-nopad md:px-4" data-id="section-content">
      <a class="transition-opacity hover:opacity-35" href="...">
        <div class="grid grid-cols-12 items-end gap-x-4 sm:gap-x-5 md:gap-x-8">
          <div class="col-span-6">
            <div class="aspect-h-1 aspect-w-[--aspect-ratio] w-full relative" style="--aspect-ratio:0.726">
              <img class="absolute bottom-0 left-0 w-full" ...>
            </div>
          </div>
          <!-- col-span-6 text column: title / byline / dek -->
        </div>
      </a>
    </div>
  </section>
</main>
```
Key patterns to adopt: `max-w-screen-xl` centered measure · `grid grid-cols-12` editorial split · `col-span-6` image / text · `aspect-w-[--aspect-ratio]` CSS-var aspect images · section-level `dark:bg-gray-800` bands · `hover:opacity-35` link feedback · `border-b border-gray-300 dark:border-gray-700` hairline section dividers.
**GAP:** this is the *index* grid. For a single-article *reading* layout, point me at one article URL (e.g. a `/quarterly/2026/.../` link) and I'll lift that page's structure too.

---

## Provenance (for the ledger when wired)
| Element | Source | Tier |
|---|---|---|
| Top nav | suwako-hanabi.com `.gnavi` (layout.css) | Remixed (recolor → gold) |
| Buttons | nelu.osaka `.boxbutton`/`.hoverRoll` (main.css) | Remixed (recolor + keyframes/JS to add) |
| Footer | sengokuhanabi.com `.footer` (style.css) | Remixed (recolor → night) |
| Posts section | sengokuhanabi.com `.decision` (style.css) | Remixed (confirm vs `#contact`) |
| Article layout | gagosian.com/quarterly (Tailwind in markup) | Remixed (utilities lifted) |

**Small gaps to close on your go:** nelu `@keyframes textRollOver` + `.hover` JS trigger · gagosian single-article reading page · sengoku scroll-reveal (`.scroll`→`.active` via jquery.inview + GSAP, already visible in their markup).
