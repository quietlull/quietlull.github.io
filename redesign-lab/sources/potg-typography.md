# potg.art — Typography & Presentation

- **URL:** https://potg.art/about/
- **Captured:** 2026-06-11
- **Tier: True** (verbatim from the site's own CSS + confirmed font src URLs; typeface names confirmed against the @font-face declarations and the Adobe Typekit kit reference, not guessed)
- **Stack:** Astro build. Inline critical CSS in `<head>` + external `/_astro/about.DQG1MDvI.css`. Self-hosted Latin fonts; Japanese face via Adobe Typekit (Web Font Loader).
- **Site palette anchor:** `--color-black-100:#28224D` (deep indigo, used as text color), `--color-white-100:#ffffff` (bg). So the "elegant" look = high-contrast serif in deep indigo on white.

---

## 1. IDENTIFIED TYPEFACES

| Role | Family (CSS) | What it actually is | Loaded how | Weights present |
|------|--------------|---------------------|------------|-----------------|
| **Display / headings / numerals** | `Dahlia` | **Dahlia** — a contemporary high-contrast display *serif* (didone/modern-serif feel: fine hairlines, elegant thin–thick contrast, old-style "%"). Commercial type-foundry face, self-hosted `.otf`. | Self-hosted `@font-face`, OpenType | 400 (Regular), 500 (Medium) |
| **Body / UI English (nav, intro EN, year labels)** | `Hellix` | **Hellix** — a geometric humanist *sans-serif* (by W Type Foundry). Clean, modern, slightly warm. Self-hosted `.ttf`. | Self-hosted `@font-face`, TrueType | 400 (Regular), 500 (Medium) |
| **Body Japanese (all JA text, default body)** | `hiragino-kaku-gothic-pron` | **Hiragino Kaku Gothic ProN** — served via **Adobe Typekit** kit (lowercase hyphenated name is the Typekit web-font slug). Fallbacks: Yu Gothic / YuGothic / 游ゴシック. | **Adobe Typekit**, kitId **`ntz0mxh`** via `https://use.typekit.net/ntz0mxh.js` (Web Font Loader) | — |

> Note: `selif` at the end of every stack is the author's typo for `serif` (the generic fallback). Verbatim — left as-is.

**Typeface ID confidence:** Dahlia and Hellix are confirmed by their literal `font-family` names in `@font-face` + matching self-hosted file names (`Dahlia-Regular.otf`, `Hellix-Regular.ttf`). Hiragino ProN confirmed by the Typekit slug `hiragino-kaku-gothic-pron` + the live `use.typekit.net` kit (`ntz0mxh`). The "elegant" character Rod is reacting to = **Dahlia** (display serif) over a deep-indigo-on-white scheme.

---

## 2. FONT LOADING (verbatim)

### Self-hosted `@font-face` (inline `<head>` + about.css, identical)
```css
@font-face{font-family:Dahlia;src:url(/_astro/Dahlia-Regular.BmQ7pNsS.otf) format("opentype");font-weight:400;font-style:normal}
@font-face{font-family:Dahlia;src:url(/_astro/Dahlia-Medium.BSDnN64e.otf) format("opentype");font-weight:500;font-style:normal}
@font-face{font-family:Hellix;src:url(/_astro/Hellix-Regular.Ca86Dmx8.ttf) format("truetype");font-weight:400;font-style:normal}
@font-face{font-family:Hellix;src:url(/_astro/Hellix-Medium.IfRVxP3Q.ttf) format("truetype");font-weight:500;font-style:normal}
```
Confirmed live (HTTP 200): `https://potg.art/_astro/Dahlia-Regular.BmQ7pNsS.otf` (`font/otf`), `https://potg.art/_astro/Hellix-Regular.Ca86Dmx8.ttf` (`font/ttf`).

### Head links (verbatim)
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" as="style" fetchpriority="high" href={googleFontsHref} />
<link rel="stylesheet" href={googleFontsHref} media="print" onload='this.media="all"' />
```
(`{googleFontsHref}` is an unrendered Astro template var — the Google Fonts preconnect is set up but the href didn't bind in the served HTML. The face that actually loads externally is the Typekit one below.)

### Adobe Typekit (Web Font Loader, inline JS) — verbatim
```js
config = {
  kitId: "ntz0mxh",
  scriptTimeout: 3000,
  async: true,
},
...
tk.src = "https://use.typekit.net/" + config.kitId + ".js";
```
Kit URL: `https://use.typekit.net/ntz0mxh.js`

---

## 3. TYPE SCALE & PRESENTATION (verbatim CSS)

> **Unit note:** the whole site uses `rem` as a *fluid* unit. `html` font-size = `calc(100 / var(--base-vw) * 1 * 1vw)`, with `--base-vw:1440` on desktop (390 mobile, capped at 1px ≥1581px). So **1rem ≈ 1px at a 1440px viewport** and scales with the window. Read every `Nrem` below as "N px at 1440w, fluid." This fluid-px-as-rem trick is a big part of why it feels precise/elegant at any size.

### Global root + body
```css
html{--color-black-100:#28224D;--color-white-100:#ffffff;--select-fill-color:var(--color-black-100);--select-text-color:var(--color-white-100)}
:root{--margin-1:40rem;--margin-2:100rem;--margin-3:320rem}
@media (max-width: 992px){:root{--margin-1:20rem;--margin-2:50rem;--margin-3:80rem}}
html{font-feature-settings:"palt" 1;font-size:calc(100 / var(--base-vw) * 1 * 1vw);--max-width:1580px;-ms-overflow-style:none;scrollbar-width:none}
@media (min-width: 1581px){html{font-size:1px}}
@media (max-width: 1580px){html{--base-vw:1440}}
@media (max-width: 992px){html{--base-vw:1100}}
@media (max-width: 750px){html{--base-vw:390}}
html,body{max-width:100vw;color:var(--color-black-100)}
body{color:var(--color-black-100);font-family:hiragino-kaku-gothic-pron,Yu Gothic Medium,Yu Gothic,YuGothic,"A+EqpB-游ゴシック体 Pr6N M",selif}
:root{--reading-trim:calc((1em - 1lh)/2)}
```
Key elegance levers: `font-feature-settings:"palt" 1` (proportional-metrics kerning for JA), hidden scrollbars, deep-indigo (`#28224D`) text instead of pure black, inverted selection colors.

### Display — big page title (e.g. "ABOUT")
```css
hgroup.page-header{margin-top:239rem; width:calc(100vw - var(--margin-2)*2); margin-inline:auto; max-width:1580px}
hgroup.page-header .page-header__title{
  font-size:200rem;
  font-family:Dahlia, hiragino-kaku-gothic-pron, ... selif;
  font-weight:400;
  -webkit-font-smoothing:antialiased;
  line-height:1
}
@media (max-width: 750px){ hgroup.page-header .page-header__title{font-size:100rem} }
hgroup.page-header .page-header__sub{
  font-size:16rem; font-family:hiragino-kaku-gothic-pron,...; font-weight:300;
  line-height:1; letter-spacing:.05em; margin-top:11rem
}
```
→ **200px Dahlia, weight 400, line-height 1** for the hero title. Huge, light, tight-leaded serif = the signature elegant move.

### Section headers ("My", "Client" etc.)
```css
section.my .my__header{display:flex;gap:12rem;flex-direction:row;align-items:baseline}
section.my .my__header__main{font-size:40rem;font-family:Dahlia,...;font-weight:400;line-height:1}
section.my .my__header__sub{font-size:12rem;font-family:hiragino-...;font-weight:300;letter-spacing:.05em;line-height:1}
```
→ **40px Dahlia 400** header paired *baseline-aligned* with a tiny **12px** light sub-label, 12px gap.

### Intro / lead paragraph (the "elegant presentation" block on /about)
```css
section.first .first__wrap{max-width:640rem;margin-left:auto;display:flex;flex-direction:column;gap:23rem}
section.first .first__text-en{
  font-size:22rem;
  font-family:Hellix,...;
  font-weight:500;
  letter-spacing:.05em;   /* then overridden -> */ letter-spacing:-.02em;
  line-height:1.8
}
@media (max-width:750px){ section.first .first__text-en{font-size:16rem;line-height:1.6} }
section.first .first__text-ja{
  font-size:16rem;
  font-family:hiragino-kaku-gothic-pron,...;
  font-weight:300;
  letter-spacing:.05em;
  line-height:1.7;
  color:color-mix(in srgb, var(--color-black-100) 70%, transparent 30%)  /* 70% indigo = soft */
}
@media (max-width:750px){ section.first .first__text-ja{font-size:14rem;line-height:1.6} }
```
→ Lead EN = **22px Hellix 500, line-height 1.8, letter-spacing -.02em**, in a **640px** max-width column **right-aligned to the page** (`margin-left:auto`). JA support text = **16px Hiragino 300, line-height 1.7, at 70% indigo** (softened). The generous **1.7–1.8 line-height + 640px measure + muted secondary color** is the core of the "elegant, airy" reading feel.

### Body comment text
```css
section.my .my__comments{display:flex;flex-direction:column;gap:20rem}
section.my .my__comments__text{font-size:14rem;font-family:hiragino-...;font-weight:300;letter-spacing:.05em;line-height:2}
```
→ **14px Hiragino 300, letter-spacing .05em, line-height 2.0** (very open leading).

### Client list / meta
```css
section.client .client__year{font-size:16rem;font-family:Hellix,...;font-weight:500;letter-spacing:.05em;line-height:1}
section.client .client__names{font-size:13rem;font-family:hiragino-...;font-weight:300;letter-spacing:.05em;line-height:1.5;...gap:20rem}
section.client .client__div-bar{min-width:70rem;height:1rem;background-color:color-mix(in srgb,var(--color-black-100) 40%,transparent 60%)}
```
→ Year labels in **Hellix 500 16px**; names in **Hiragino 300 13px**; separated by a hairline 1px rule at 40% indigo.

### Big "Contact" pill (display serif as a graphic)
```css
section.contact .contact__link{
  max-width:560rem; height:148rem;
  border:1rem solid var(--color-black-100);
  border-radius:calc(infinity * 1px);
  font-size:120rem;
  font-family:Dahlia,...;
  font-weight:400;
  overflow:hidden
}
section.contact .contact__link span{line-height:1;text-box:trim-both cap alphabetic;padding-left:40rem}
@media (max-width:750px){ section.contact .contact__link{font-size:40rem;height:64rem;max-width:293rem} }
```
→ **120px Dahlia 400** inside a fully-rounded (pill) 1px-outlined button; uses modern `text-box:trim-both cap alphabetic` for optical cap-height trimming.

### Header / footer nav (small caps-ish sans)
```css
header.base-header .base-header__nav__item{font-size:12rem;font-family:Hellix,...;font-weight:400;letter-spacing:.05em}
footer.base-footer .base-footer__text{font-size:14rem;font-family:Hellix,...;font-weight:400;letter-spacing:.05em;line-height:1}
footer.base-footer .base-footer__nav__item{font-size:13rem;font-family:Hellix,...;font-weight:400;letter-spacing:.05em}
```
→ Nav/footer = **Hellix 400, 12–14px, letter-spacing .05em**.

---

## 4. TYPE-SCALE SUMMARY (the recipe Rod can lift)

- **Two-font system:** display **serif (Dahlia)** for titles/numbers/the contact word; **sans (Hellix)** for English UI/lead/labels; Hiragino for JA. Deep indigo `#28224D` on white — *never pure black*.
- **Display ramp:** 200 / 120 / 40 px, all **Dahlia weight 400, line-height 1** (tight leading on big serif = elegance).
- **Body ramp:** lead 22px Hellix 500 (lh 1.8, tracking -.02em) → 16px (lh 1.7) → 14px (lh 2.0) → 13/12px meta. Body weights are **light (300)** with **letter-spacing .05em** and **open line-height (1.5–2.0)**.
- **Secondary text softened** via `color-mix(... 70% / 40%)` rather than a different hue.
- **Measure:** ~640px max reading column, right-aligned to the page grid.
- **Fluid sizing:** every size in `rem` where `1rem ≈ 1px @1440w` (`html{font-size:calc(100/var(--base-vw)*1vw)}`), so the whole scale breathes with the viewport but caps at 1px ≥1581px.
- **Detail polish:** `font-feature-settings:"palt" 1`, `-webkit-font-smoothing:antialiased`, hidden scrollbars, `text-box:trim-both cap alphabetic` on the big serif, inverted ::selection colors.

---

## 5. HONESTY / SCRAPE NOTES

- **Latin fonts are NOT obfuscated** — real names (Dahlia, Hellix) in `@font-face`, hashed filenames are just Astro asset fingerprints. Confirmed loadable (HTTP 200). Typeface identity is solid.
- **Dahlia & Hellix are commercial faces** (not free Google Fonts) — Rod would need to license them, or substitute a free high-contrast serif (e.g. *Fraunces*, *Newsreader*, *Cormorant*) for Dahlia and a geometric humanist sans (e.g. *Hanken Grotesk*, *Schibsted Grotesk*) for Hellix to reproduce the look.
- **Visual confirmation:** headless screenshot only reached the JS preloader (gated on real AVIF gallery downloads, can't pass via virtual-time), but it rendered the "15%/20%" counter in **Dahlia** — confirming a fine, high-contrast display serif in `#28224D` on white. Saved: `%TEMP%\potg.png`, `%TEMP%\potg2.png`.
- **CHROME-AGENT SCRAPE REQUEST (optional, low priority):** to see the *fully loaded* /about page (hero "ABOUT" in Dahlia at 200px, the lead column, the contact pill) the Chrome extension should open `https://potg.art/about/`, let the preloader finish (~real network), and screenshot full-page. Also Network tab → Fonts will list `Dahlia-*.otf`, `Hellix-*.ttf`, and the Typekit `ntz0mxh` CSS to double-confirm. Not required for typeface ID — that's already locked.
