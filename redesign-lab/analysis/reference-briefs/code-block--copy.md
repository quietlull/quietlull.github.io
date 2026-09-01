Premise verified against the live site. Here is the brief.

---

# REFERENCE BRIEF: Code block + copy

## 1. Premise verdict: CONFIRMED, no drift

`redesign-lab/sources/maximeheckel-prose.md` exists and covers the component in four sections (lines 98-183). I refetched the live article and diffed every quoted declaration against it.

**All 10 probes matched byte-for-byte, and even the Stitches class hashes are unchanged** since the 2026-08-18 capture. The saved note is trustworthy. No live-site-wins discrepancy on the chrome.

Evidence pulled this session (scratchpad `.../5b134360-.../scratchpad/`): `mh-article.html` (1,415,500 B), `mh-style-0.css` (72,620 B, the real component sheet), `mh-style-1.css` (517 B, font tokens), `iq-style.css`, `cc-tutorials.css`, `ronja.html`.

**But the note does not answer the open question.** It captures the chrome and never records a single syntax colour. The `--token-*` values are not in it. I pulled them live; see section 4.

## 2. Verbatim CSS, theirs

Source: inline `<style>` block #0 of `https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/`

```css
/* card frame */
.c-kreyRl{position:relative;background:var(--card-bg, var(--card-background));-webkit-backdrop-filter:var(--card-blur, none);backdrop-filter:var(--card-blur, none);border-radius:var(--border-radius-2);box-shadow:var(--card-shadow);overflow:hidden;--border:1px solid var(--border-color);border:var(--border)}
.c-kreyRl-cNNFmd-depth-1{--card-shadow:
        0.5px 1px 1px hsl(var(--shadow-color) / 0.333)
      }

/* header strip */
.c-cuGhLv{display:flex;justify-content:space-between;align-items:center;border-top-left-radius:var(--border-radius-1);border-top-right-radius:var(--border-radius-1);padding:12px 12px;color:var(--text-tertiary);font-weight:500;font-size:var(--font-size-1);border-bottom:var(--border)}
.c-cuGhLv-iCgbKV-css{z-index:3;background-color:var(--code-snippet-background);padding:var(--space-2) var(--space-3)}
.c-jSxxNn{margin-block-start:0px;font-size:var(--font-size-1);margin-bottom:0px;color:var(--text-primary);font-weight:500}

/* pre + overflow veils */
.c-dGhWkF{--shadow-size:70px;--shadow-color:oklch(from var(--gray-000) l c h / 0.75);margin-top:0;margin-bottom:0;text-align:left;padding:var(--space-2) 0px;border-bottom-left-radius:var(--border-radius-2);border-bottom-right-radius:var(--border-radius-2);background-color:var(--code-snippet-background);font-family:var(--font-mono-code);font-size:var(--font-size-1);line-height:24px;overflow-x:auto}
.c-dGhWkF::before,.c-dGhWkF::after{content:"";position:absolute;top:0;width:var(--shadow-size, 40px);height:100%;pointer-events:none;z-index:2}
.c-dGhWkF::before{left:0;opacity:var(--shadow-opacity-left, 0);background:linear-gradient(to right, var(--shadow-color), transparent)}
.c-dGhWkF::after{right:0;opacity:var(--shadow-opacity-right, 0);background:linear-gradient(to left, var(--shadow-color), transparent)}

/* line rows */
.c-QIkcn{display:table;border-collapse:collapse;padding:0px 14px;border-left:3px solid transparent}
.c-QIkcn.highlight-line{background:var(--emphasis);border-color:var(--accent)}
.c-QIkcn:hover{background-color:var(--emphasis)}
.c-eotEYs{width:45px;padding:0 12px;-webkit-user-select:none;user-select:none;opacity:1;color:var(--text-tertiary)}
.c-hJePes{display:table-cell;width:100%}

/* copy button (note never quoted this; pulled live this session) */
.c-dkLMcm{...display:flex;justify-content:center;align-items:center;flex-shrink:0;outline:none;cursor:pointer;opacity:var(--opacity, 1);background:var(--button-background, var(--foreground));color:var(--color, var(--text-tertiary));transform:scale(var(--button-content-scale, 1)) translateZ(0);border-radius:var(--corner, var(--border-radius-1));box-shadow:var(--shadow, none);border:var(--border-thickness, 1px) solid var(--border-color, oklch(from var(--border-color) l c h / 60%));transition:box-shadow 0.3s ease, border 0.2s, border-color 0.2s, color 0.3s ease, background 0.3s ease, transform 0.2s}
.c-dkLMcm-ldyxZf-variant-tertiary{--border-color:transparent;--button-background:transparent}
.c-dkLMcm-ldyxZf-variant-tertiary:hover:not(:disabled){--button-background:oklch(from var(--gray-900) l c h / var(--opacity, 0.3));--color:var(--text-primary)}
.c-dkLMcm-gbNEuh-size-small{width:30px;height:30px}
.c-dkLMcm-gbNEuh-size-small svg{width:16px;height:16px}
```

Resolved tokens: `--space-2:8px --space-3:12px --font-size-1:14px --border-radius-1:8px --border-radius-2:12px --font-mono-code:'FiraCode'`. Markup confirmed live: 14x `aria-label="Copy code to clipboard"`, filename in `<p data-testid="codesnippet-title">`, no traffic lights anywhere.

## 3. THEIRS vs OURS

**Genuinely theirs, worth lifting:**

- **The `--border` handshake.** Card sets `--border:1px solid var(--border-color)` and uses it for itself; the header strip reads that same variable back for its `border-bottom`. The divider under the filename cannot drift from the frame. One variable, two consumers.
- **Padding split (the load-bearing bit, easy to get wrong).** The `pre` has `padding: 8px 0` with **zero horizontal padding**; the 14px horizontal inset lives on each line row (`.c-QIkcn{padding:0px 14px}`). That is the only reason the `highlight-line` wash and the 3px marker run true full-bleed to the block edge. Put the horizontal padding on the `pre` and the highlight stops short and looks broken.
- **Reserved 3px marker.** `border-left:3px solid transparent` is always present, so highlighting recolours instead of reflowing. No layout shift.
- **Overflow veils driven by two opacity variables defaulting to 0.** An unscrollable block shows no chrome at all. Genuinely nice, and it degrades to nothing without JS.
- **Header padding is really 8px 12px**, not the `12px 12px` in the base rule; `-iCgbKV-css` overrides it.

**Ours, not theirs:**

- Squaring it (D20). Their `border-radius-2` / `-1` / `overflow:hidden` clip stack all collapses to nothing. Note their header asks for 8px while the card is 12px, a mismatch invisible only because of `overflow:hidden`. At 0 the whole problem disappears, and `overflow:hidden` is then only needed for the veils.
- Every colour. See below.
- `prefers-reduced-motion`: **0 occurrences in their entire 72KB sheet.** Their copy button animates `transform 0.2s` with `scale(1.1)` on hover and `0.95` on active, with no reduced-motion path. We have to write that ourselves; it is not liftable.
- Line numbers: their 45px gutter is theirs, but whether we carry a gutter at all is our call and Rod has not said.

**Do not copy:** `-webkit-backdrop-filter:var(--card-blur, none)`. I checked, `--card-blur` is **never assigned anywhere in the sheet**, so it always resolves to `none`. It is dead code on their side, and it is exactly the glass tell being stripped site-wide. Drop the line, lose nothing.

## 4. THE COLOUR QUESTION

Rod said he likes "the colors of other code blocks" without naming which. I pulled every syntax scheme that already has a real source in `redesign-lab/sources/`, verified each against its live stylesheet, and resolved MH's oklch to hex.

### Scheme A: Maxime Heckel dark (the stated source's own scheme)

Live from `.maximeheckel-dark`, `--base-hue:262.04`:

| token | var | hex |
|---|---|---|
| comment | `--gray-1000` | `#8795ad` |
| punctuation / selector | `--blue-600` | `#a7c3f6` |
| keyword | `--blue-700` | `#79a3f0` |
| symbol | `--blue-800` | `#4a80e8` |
| function | `--pink-400` | `#ffbdd9` |
| operator | `--orange-1200` | `#ffd8b6` |
| ground / border / accent | gray-200 / gray-400 / blue-800 | `#0c0f14` / `#1d212a` / `#4a80e8` |

**Verdict: CANNOT TRANSFER.** Five of seven tokens are the same blue hue. And the collision is almost comic: their `--token-comment` resolves to **`#8795ad`, which is effectively Rod's banned `--color-muted (#9aa3bd)`**. Taking MH's chrome does not oblige us to take MH's palette, and we cannot.

### Scheme B: Inigo Quilez (`https://iquilezles.org/style.css?v=2`, verified live byte-exact)

```css
.code{...color:#dcdcdc;...}.codeK{color:#88a8c8;}.codeL{color:#c088a8;}.codeS{color:#da9f89;}.codeComment{color:#87b054;}
/* page ground #282828, scrollbar thumb #505050 */
```

keyword `#88a8c8`, literal `#c088a8` dusty pink, string `#da9f89` warm tan, comment `#87b054` olive. Four tokens, hand-rolled, dark, on a warm-neutral `#282828` ground, by a shader author. **Closest fit of anything sourced.** Only `#88a8c8` (keyword) is cool. Caveat: `.code` is `font-weight:bold` throughout, which is a strong and specific choice, not a neutral default.

### Scheme C: Catlike Coding dark (`https://catlikecoding.com/unity/tutorials/tutorials.css`, fetched live)

```css
.dark .directive { color: #a67 }
.dark .comment { color: #888a85 }
.dark .constant { color: #edd400 }
.dark .keyword { color: #099 }
.dark .cc-type,.dark .msdn-type,.dark .type,.dark .unity-type { color: #ad7fa7!important }
.dark .unity-method { color: #aaa!important }
.dark .cg-function,.dark .cg-macro { color: #719ecf!important }
```

**Strongest semantic match to Rod's actual writing:** these classes exist because Jasper writes Cg/HLSL shader tutorials, so `.cg-function` / `.cg-macro` / `.directive` map onto real HLSL constructs instead of generic web-highlighter buckets. Two of seven are cool (`#099` keyword, `#719ecf` cg-function). `constant #edd400` sits very close to `--color-gold #fbbf24`.

### Checked and rejected, so nobody spends a slot on them

- **Book of Shaders**: flat `#ECECEC` panel, no token colours at all. Nothing to take.
- **Ronja Tutorials**: syntax is stock Hugo Chroma written as inline styles, light theme (`#333` punctuation, `#888` comment, `#080` keyword, `#00d`/`#40e` numbers), and on the page I fetched it is **visibly broken**: 23 spans of `color:#f00;background-color:#faa`, which is Chroma's error token failing to lex the ShaderLab strings. Also red. Do not use.
- **acegikmo**: stock highlight.js github theme, light, and credited in-file to Vasily Polovnyov, so it is not even Freya's design.

### The honest problem

**No sourced scheme is palette-law clean.** Every real dark scheme in the lab spends a cool hue on keywords, because that is what syntax highlighting has done for thirty years. So one of these has to happen, and it is Rod's call, not ours:

1. Treat code as a quotation surface where the cool-accent ban does not reach (the ban targets UI accents, and a code block is arguably content).
2. Keep only the warm members of a scheme and drop to two or three token classes.
3. Rod names the site whose code colours he meant, and we source that one directly.

I did not hue-rotate anything toward warm. That would be inventing a scheme and citing a site that does not use it.

## 5. Notes for the craft stage

- **HLSL sample.** Whatever scheme is picked has to carry: preprocessor (`#pragma` / `#include`), type (`float3`, `half4`), keyword (`struct`, `return`), function/intrinsic (`saturate`, `lerp`), number, comment, and **semantics** (`: SV_POSITION`, `: TEXCOORD0`) plus swizzles (`.xyz`). Scheme C is the only one with a native class for shader macros; A and B have to borrow a bucket.
- **Squaring.** Radius to 0 on card, header and pre. Keep `overflow:hidden` only for the veils.
- **Reduced motion** must be authored by us; the source has none.
- Filename left / copy right is a plain flex `space-between` with no third element. Confirmed, no traffic lights on their site.

## Files

- Stated source: `C:\Users\Rod\Documents\ProjectFiles\Website\redesign-lab\sources\maximeheckel-prose.md` (lines 98-183)
- Cross-refs: `...\sources\iquilezles-prose.md` (line 12), `...\sources\catlikecoding-prose.md` (lines 81, 142), `...\sources\bookofshaders-prose.md` (line 134), `...\sources\ronja-tutorials-prose.md` (line 73)
- Live evidence this session: `C:\Users\Rod\AppData\Local\Temp\claude\C--Users-Rod-Documents-ProjectFiles-Website\5b134360-884e-4a99-88bf-dcdb6d975d1c\scratchpad\` (`mh-article.html`, `mh-style-0.css`, `mh-style-1.css`, `iq-style.css`, `cc-tutorials.css`, `ronja.html`)
- Existing lab files, untouched: `...\redesign-lab\extracted\components\code-block\{code-block.css,code-block.html,code-block.js}`

No files written this stage, as instructed.