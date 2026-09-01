# SOURCE (True) — yoshito-illustration.com (buttons, section dividers, layout)

- **URL:** https://yoshito-illustration.com (built by bokoko33, same designer as 109ichiki)
- **Captured:** 2026-06-11 via Chrome extension (DOM) + PowerShell raw-CSS fetch.
- **Raw CSS file (full provenance):** `sources/yoshito-style.css` (55,995 bytes, the site's `style.DqNLyeag.css`).
- **Rod wants:** buttons, section dividers, layout. **NOTE palette is LIGHT/blue (#379be3 on #fcfeff) — recolor to amber-night.** Fonts: `termina` (Adobe Typekit `use.typekit.net/kyn6slr.css`) + `M PLUS 1`.
- Uses CSS vars (`--color-main/-text/-border/-bg/-white`, `--duration-material-hover`, `--ease-material-base`, `--duration-transform-base`, `--ease-transform-base`) — defs are in the raw css; recolor on adapt.

## Pill button + Menu/Close text-slide (verbatim)
```css
._button_9xpj9_61{position:relative;display:flex;align-items:center;height:1.25rem;padding:0 1.125rem;border-radius:100vh;font-size:.8125rem;color:#379be3;background-color:var(--color-bg);border:solid 1px var(--color-white);touch-action:manipulation;transition:color var(--duration-material-hover) var(--ease-material-base),background-color var(--duration-material-hover) var(--ease-material-base)}
._button_9xpj9_61:before{content:"";position:absolute;inset:0;margin:auto;width:100%;height:100%;transform:scale(2)} /* hit area */
@media(hover:hover)and (pointer:fine){._button_9xpj9_61:hover{background-color:var(--color-main);color:var(--color-white)}}
/* the Menu<->Close vertical text swap */
._buttonInner_9xpj9_101{position:relative;display:block;clip-path:inset(0)}
._buttonInner_9xpj9_101 span{display:block;transition:transform var(--duration-transform-base) var(--ease-transform-base)}
[aria-expanded=true] ._buttonInner_9xpj9_101 span{transform:translate3d(0,-1.35em,0)}
._buttonInner_9xpj9_101 span+span{position:absolute;top:1.35em;left:0}
```
HTML: `<button class="_button" aria-expanded="false"><span class="_buttonInner"><span>Menu</span><span>Close</span></span></button>`

## Section divider — glowing line + sparkle stars (verbatim) ★ very on-theme
```css
._separator_1weq6_1{position:relative;width:100%;height:1px}
._separator_1weq6_1:before{content:"";display:block;width:100%;height:100%;background-color:var(--color-border);transform:translateZ(0);filter:drop-shadow(0 0 4px rgb(from var(--color-text) r g b/.25)) drop-shadow(0 0 2px rgb(from var(--color-main) r g b/.2))}
._star_1weq6_16{display:flex;align-items:center;justify-content:center;width:.875rem;aspect-ratio:1;position:absolute;top:50%;color:var(--color-text);transform:translate3d(0,-50%,0);filter:drop-shadow(0 0 4px rgb(from var(--color-text) r g b/.25)) drop-shadow(0 0 2px rgb(from var(--color-main) r g b/.2))}
._star_1weq6_16:first-of-type{left:-2rem}
._star_1weq6_16:last-of-type{right:-2rem}
```
HTML: `<div class="_separator"><div class="_separatorInner"><div class="_star">{4-point-star SVG}</div>...<div class="_star">{star}</div></div></div>`
Star SVG path: `M7 0C7 0 7.3931 3.3931 9 5C10.6069 6.6069 14 7 14 7C14 7 10.6069 7.3931 9 9C7.3931 10.6069 7 14 7 14C7 14 6.6069 10.6069 5 9C3.3931 7.3931 0 7 0 7C0 7 3.3931 6.6069 5 5C6.6069 3.3931 7 0 7 0Z`

## Layout — absolute-positioned KV blocks + square stacked blocks
```css
._kvBlock_1xc6f_112{position:absolute} /* hero pieces placed by data-name */
._kvBlock_1xc6f_112[data-name=profile]{width:18.75rem;aspect-ratio:16/9;top:3.65625rem;left:0}
._kvBlock_1xc6f_112[data-name=works]{width:11.25rem;aspect-ratio:1;bottom:13.6875rem;right:0}
._kvBlock_1xc6f_112[data-name=gallery]{width:11.25rem;aspect-ratio:1;bottom:0;right:0}
._block_1el9j_88{position:relative;display:block;width:100%;aspect-ratio:1}
._block_1el9j_88+._block_1el9j_88{margin-top:2.4375rem}
@media(hover:hover)and (pointer:fine){._block_1el9j_88:hover img{transform:scale(1.08) translateZ(0)} ._block_1el9j_88:hover ._blockTagInner{transform:rotate(-7deg)}}
```
(Hand-placed, asymmetric, non-grid — matches Rod's "intentional spacing, not algorithmic" goal.)
