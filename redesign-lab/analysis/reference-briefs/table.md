All four live files verified. Everything the notes claim is byte-exact against the live sites, plus I found two things the notes got imprecise and one table the acegikmo note missed entirely.

---

# REFERENCE BRIEF: Table

## Premise check: PASS, with three corrections

Both source files exist and both cover the `table` role. Live re-fetch confirms every quoted declaration byte-for-byte. Files on disk: `C:\Users\Rod\AppData\Local\Temp\claude\C--Users-Rod-Documents-ProjectFiles-Website\5b134360-884e-4a99-88bf-dcdb6d975d1c\scratchpad\tbl\` (`iq-style.css` 4487 B, `iq-smin.html`, `ace-styles.css` 5792 B, `ace-docs.html`).

**Correction 1 (matters most).** The iquilezles table body is not in the global stylesheet. `iq-style.css` contains **zero** bare `table`, `th`, `td`, `tr` rules (grep counts: 0/0/0). What actually styles the table is a page-local `<style>` at line 60 of `article-smin.html`. So the "minimal body" is literally **one declaration plus the absence of everything else**. The craft stage must not go looking for more; there is no more.

**Correction 2.** The treatment says "acegikmo `th{color;font-weight:100}`". There is **no bare `th` rule** on acegikmo. The real selector is `.feature-table th` (line 360). Cite it correctly or the citation is wrong.

**Correction 3.** iquilezles has **no `<th>` anywhere** (`grep -c '<th'` = 0). Their "header row" is the first `<tr>` of plain `<td>` with an empty corner cell and carries **no styling at all**. So the header row in our treatment is not iq's, and it is not a blend either. It is entirely the acegikmo half.

## Verbatim: the iquilezles half (the body)

From the page-local `<style>` block, `article-smin.html` line 60, confirmed with `cat -A`:

```css
td { padding-right:1rem; }
.ye{color:#40e040;}
.no{color:#ff6060;}
```

The scroll wrapper, `article-smin.html` line 754, an inline style on a bare div:

```html
<div style="overflow-x:auto;"><table>
<tr><td></td>                  <td>Rigid</td>          <td>Local</td>           <td>Cons.</td>        <td>Asso.</td></tr>
<tr><td>Quadratic</td>         <td class="ye">Yes</td> <td class="no">No</td>   <td class="ye">Yes</td>  <td class="no">No</td></tr>
</table></div>
```

Defined in `style.css` but **used zero times** on the live page (confirmed, grep = 0). Do not cite these as the table:

```css
.table{display:table;}.tableRow{display:table-row;}.tableCell{display:table-cell;padding:12px;padding-right:24px;}
```

Context that makes the body read the way it does:

```css
body{background-color:#282828;color:#c0c0c0;...font-size:1.125rem;line-height:1.8;font-family:sans-serif;...text-align:left;...}
div#container{width:100%;max-width:120ch;...}
::-webkit-scrollbar{height:8px;width:8px;background:#282828;}::-webkit-scrollbar-thumb{background:#505050;-webkit-border-radius:4px;}
```

## Verbatim: the acegikmo half (the header row)

`ace-styles.css` line 360, confirmed with `cat -A` (tabs shown as `^I` in the raw check):

```css
.feature-table th{
	font-family: Renogare;
	font-weight: 100;
	border-radius: 4px;
	color: #ff1155;
	padding-left: 4px;
	padding-right: 4px;
}
```

Its parent, line 344, for context only:

```css
.feature-table{
	margin-top: 8px;
    border-spacing: 1px;
    border: solid 1px #ccc;
    border-radius: 8px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    padding: 8px;
}
```

Markup, `ace-docs.html` line 516: `<table class="feature-table">` then a `<tr>` of seven bare `<th>`. No wrapper of any kind around it.

## Which half is whose

| Element | Parent |
|---|---|
| No borders, no zebra, no background, no rules, no radius on the body | iquilezles (by absence) |
| `padding-right:1rem` as the only column separation | iquilezles, verbatim |
| Row height from `line-height:1.8` alone, no authored vertical padding | iquilezles |
| `overflow-x:auto` wrapper div | iquilezles, verbatim |
| Scrollbar chrome sized 8px, track = page bg, mid-grey thumb | iquilezles, verbatim |
| Header row exists at all, and is the page accent colour | acegikmo |
| `font-weight:100` on the header cells | acegikmo, verbatim |
| `padding-left/right:4px` on header cells | acegikmo, verbatim |
| `#fbbf24` instead of `#ff1155` | **OURS** (token swap) |
| Squaring every radius | **OURS** (square-by-default law) |

Tier: **Remixed**. Idea origin: **theirs** for both halves and for the pairing device; the only Claude-side content is the palette substitution and the squaring, both of which are law-mandated rather than invented.

## Cannot transfer under the palette law

- iq `.no{color:#ff6060;}` is **red**. Banned. And it is the pair-mate of `.ye{color:#40e040;}`, so the whole two-colour yes/no device dies with it. The iq half arrives as body geometry only, no semantic colour.
- acegikmo `td.on` / `td.off` / `td.na` / `td.depends` were already excluded by the brief. Confirming the reason holds on inspection: `td.off` is `#ff111180` on `#bd003dc7` (red), `td.on` is green, `td.na` uses `#ccc` (cool neutral, same family as the banned `--color-muted`), and all four are **solid `background-color` fills**, which is exactly what competes with the Three.js scene. Four colours, two of them illegal, all four opaque. Correctly dropped.
- `.feature-table` `border: solid 1px #ccc` plus `padding:8px` plus `border-radius:8px` draws a box around the table. The iq half deliberately has no box, and the two parents contradict each other here. Treatment picked iq for the body, so the border goes.
- All three acegikmo radii (`8px` table, `4px` td, `4px` th) and the `-webkit-border-radius:4px` on iq's scrollbar thumb: square them.
- Every acegikmo colour is tuned for a **white page** (`body{font-family:sans-serif; font-size:15px; color:#222;}`, no background declared). Only structure transfers from that half, never values.

## Four mechanical traps the craft stage will hit

1. **`font-weight:100` is visually inert on the source site.** Acegikmo loads exactly one `@font-face`: `Renogare-Regular.otf`, single weight, no weight descriptor. No browser synthesises thin, so on the live page `font-weight:100` renders at regular and its only real effect is **cancelling the UA default `th{font-weight:bold}`**. That de-bolding is the transferable effect. If our stack has a genuine 100 or 200 weight, copying the literal `100` produces a *thinner* header than acegikmo actually shows. Decide which you want; do not assume the number is the look.

2. **`th` alignment will split from `td` by default.** Acegikmo gets centred headers from `text-align:center` on `.feature-table`, not from the `th` rule. iq's page is `text-align:left`. Take the `th` rule without a table-level alignment and you get centred headers over left cells, which reads as a bug. Declare `text-align` on `th` explicitly.

3. **No `border-collapse` is declared anywhere on either site.** Both inherit the UA default (`separate`, with UA `border-spacing`). If the craft stage writes `border-collapse: collapse`, that is a departure from both parents, not a copy. Fine to do, but log it as ours.

4. **The `overflow-x:auto` wrapper alone will not scroll.** Default table layout is `auto`, so a too-wide table wraps its text to fit the container rather than overflowing it. iq gets away with the bare wrapper because their cells are single words (`Quadratic`, `Yes`, `Circular Geometric`) that barely wrap. At our 767px measure with real content, the wrapper fires only if something refuses to wrap. The honest sourcing for the fix: iq's *code block* pairs `overflow:auto` with `white-space:pre`, which is precisely why that one scrolls (`.code{overflow:auto;...white-space:pre;...}`). Same site, same escape hatch, different component. Reusing that pairing on the table is a **cross-component remix within one parent** and should be labelled as such, not as iq's table.

Also note their measure is `max-width:120ch`, very wide, and split into `.part50` halves. Ours is 767px. The wrapper is more load-bearing for us than for them, exactly as the treatment says.

## One thing the acegikmo note missed

The note reports `.feature-table` as the site's table and records 1 use. The live page has **19 tables**, and the dominant pattern is `<table class="shape-prop-line">` at **126 uses**, which the note never mentions. Its entire rule is one declaration (`ace-styles.css` line 213):

```css
.shape-prop-line{
	border-bottom: solid 1px #efefef;
}
```

A two-column name/description row with a single hairline under it. Flagging because it is a real, heavily-exercised, sourced alternative to the pill grid, it sits inside the already-approved source site so it is not a substitution, and a single hairline row rule survives the dark ground and the scene far better than tinted pill cells would. Not part of the decided treatment, offered as a legal option if the header-row-only version reads too bare.