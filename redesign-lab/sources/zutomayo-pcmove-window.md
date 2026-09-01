# Floating WINDOW panels - zutomayo.net. **Tier: True.**

- **Source URL:** https://zutomayo.net/themes/zutomayo/_assets/css/app.css?26081001 (469,771 bytes)
- **Seen on:** https://zutomayo.net/ (the landing, which is the page ROD named)
- **Captured:** 2026-08-22, read from the site's own served CSS.

Rod, P64: *"this page is pretty scuffed we may have to go back to the drawing board. Maybe take
inspiration from zutomayas landing page instead? look at other pages with window popups and see if
we can choose something different here."*

## PREMISE CHECK - it passed, but not the way the search suggested

Grepping the landing for "window" returns **47 hits** and "close" another 47, which looks like a
page full of popup windows. **Most of those are false.** They are `window.dataLayer` JS references
and an image filename (`window_asics.jpg`). The `.remodal` and `.modal` classes in the stylesheet
are **third-party libraries** (Remodal and Bootstrap) shipped with the theme, not zutomayo's design.

**The real thing is called something else.** Their windows are `.ztmy-pcmove-menu` and
`.ztmy-pcmove-news` - `pcmove` reading as "movable on PC". That is the component Rod remembers, and
it is genuinely theirs. Anyone who searched for "popup" would have concluded this site had none.

## THE MECHANISM, verbatim

Two fixed panels, one top-left and one bottom-right, each with a title bar and a collapse state.

```css
.ztmy-pcmove-menu {
  display: block;
  position: fixed;
  z-index: 300;
  top: 80px;
  left: 26px;
  height: 580px;
  background-size: 100%;
  background-position: top;
  background-repeat: no-repeat;
  background-color: #E8D2E9;
  border: solid 1px #6F2ADD;
  box-shadow: 3px 3px 0 #A3919E;
  overflow: hidden;
  transition: height 0.3s;
}

.ztmy-pcmove-menu .title {
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 46px;
  line-height: 26px;
  color: #fff;
  background-color: #6F2ADD;
  padding: 10px;
  font-size: 20px;
}

.ztmy-pcmove-news {
  display: block;
  position: fixed;
  z-index: 300;
  bottom: 100px;
  right: 40px;
  width: 335px;
  height: 582px;
  background-image: url("../img/news_pc_window.png");
  overflow: hidden;
  transition: height 0.3s;
}

.ztmy-pcmove-news-inner {
  position: relative;
  padding: 46px 30px 0 30px;
}

.ztmy-pcmove-news-inner .btn-close-menu {
  pointer-events: none;
  position: absolute;
  top: 11px;
  right: 11px;
  width: 28px;
  height: 28px;
  font-size: 0;
  line-height: 0;
  background-image: url("../img/btn_news_window_close.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
```

**The collapse.** One class, one property. This is the whole "minimise" interaction:

```css
.ztmy-pcmove-menu.windowmini { height: 46px; }
.ztmy-pcmove-news.windowmini { height: 46px; }
.ztmy-pcmove-menu.windowmini  .btn-close-menu { background-image: url("../img/btn_news_window_open.png"); }
.ztmy-pcmove-news.windowmini  .btn-close-menu { background-image: url("../img/btn_news_window_open.png"); }
```

**The mobile answer, which is the cleverest part.** The same panel does not reflow or disappear on
small screens - it **rotates 90 degrees and docks to the right edge as a tab**:

```css
#spNews {
  display: none;
  transform: scale(0.6) rotate(0);
  transform-origin: right top;
  top: 36%;
  right: 0;
  transition: all 0.3s;
}
#spNews.windowmini {
  transform: scale(0.6) rotate(90deg);
  transform-origin: right top;
  right: -50px;
  top: 45%;
}
@media screen and (min-width: 769px) { #spNews.windowmini { transform: scale(0.8) rotate(90deg); } }

#spNews .header-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;
  cursor: pointer;
}
```

## The numbers worth keeping

| what | measured |
|---|---|
| panel height, open | **580px** (menu) / **582px** (news) |
| panel width | **335px** (news; menu is sized by its background art) |
| title bar / collapsed height | **46px**, and the collapse target is exactly this |
| collapse transition | `height 0.3s` - one property, nothing else animates |
| close button | **28 x 28** at `top:11 right:11`, i.e. centred in the 46px bar |
| drag/collapse handle | `.header-bar`, full width x **45px**, `cursor:pointer` |
| shadow | **`3px 3px 0`** - ZERO blur, zero spread |
| border | `solid 1px` |
| inner padding | `46px 30px 0 30px` - the top padding IS the title bar's height |
| desktop only | `.ztmy-pcmove-*` are `display:none` below **1400px** |

**The zero-blur offset shadow is the transferable bit and it is already load-bearing here.** D15
called `5px 10px 0 0` "a sticker on paper, not a glass panel" for the MinionsArt projects panel.
zutomayo reaches for the same device at `3px 3px 0`. Two independent sites, same move - that makes
it a convention rather than one site's habit.

## What transfers and what does not

- **TRANSFERS:** the title-bar-as-collapse-target rule (collapsed height == title height, so the
  window folds into its own bar); the single-property `height` transition; the zero-blur offset
  shadow; the close button centred in the bar; the rotate-and-dock mobile answer.
- **DOES NOT:** their panel backgrounds are drawn PNGs (`news_pc_window.png`), so the frame itself
  is artwork, not CSS. Same problem the washi tape had. Their purple `#6F2ADD` on `#E8D2E9` is
  theirs and cannot come across under the palette law.
- ~~**NOT VERIFIED:** whether the panels actually DRAG.~~ **RESOLVED 2026-08-23 - and the old
  reasoning here was wrong, not merely incomplete.** See the section below.

---

# THE JS, READ 2026-08-23 (Rod: "try to go to zutomayo's real site and scrape the code")

Fetched `https://zutomayo.net/themes/zutomayo/_assets/js/common.js?260306` (38,125 bytes) with a
browser UA and referer, alongside `app.css` (469,771 bytes). Their own script, not a library.

## They DO drag, and the old note's reasoning was reading the wrong selector

The panels are draggable. The mechanism, described rather than copied:

- Elements carrying `.drag-and-drop` bind **`mousedown` and `touchstart`**.
- On press the handler stamps a `.drag` class on the element and stores the **press-relative
  offset** - cursor page coords minus the element's `offsetLeft` / `offsetTop`.
- `mousemove` / `touchmove` on `document.body` then writes `style.top` and `style.left` as
  `pageY - y` / `pageX - x`. So they move by **absolute position, not transform**.
- `mouseup` unbinds the move listeners and drops the `.drag` class.

**The CSS that settles it, and that the earlier note missed:**

```css
.drag-and-drop { cursor: move; position: fixed; z-index: 1000; }
```

`cursor: move`. The old note argued "`cursor:pointer` means a click target, not a drag handle" -
but that `cursor:pointer` is on **`#spNews .header-bar`**, which is the MOBILE COLLAPSE TAB, a
different element entirely. The draggable thing was never the one being inspected.
**Lesson worth keeping: the note reasoned confidently from a selector it had not checked was the
right selector.** The conclusion happened to be cautious, so it did no damage - but it was wrong.

## The whole panel is the handle, not the title bar

`.drag-and-drop` is on the panel itself. Their answer to the link-versus-drag problem is blunt:
`$(".drag-and-drop a").on('click', ...)` simply ends the drag. Ours uses a 4px movement threshold
instead, which keeps a click a click without needing every link to know about dragging.

## What they do NOT do - this is exactly where our code stops being theirs

- **No inertia.** `mouseup` only removes listeners. There is no velocity, no coast, no easing.
  **So the THROW is ours.**
- **No clamping of any kind.** Nothing constrains the panel to the viewport; drag it off and it
  goes off. **So the BOUNCE and the page-edge bounds are ours.**
- **No proximity magnet.** Nothing in their code attracts a panel toward the cursor.
  **So the LEAN is ours.**

## Two controls, not one - our earlier mapping was wrong

- `.btn-close` / `.btn-no` -> `Close()`, which is a jQuery **`fadeOut(150)`**. It really closes.
- `.btn-close-menu` / `.header-bar` -> `Mini()`, which toggles **`windowmini`**. The collapse.

So **the collapse was never on the close button**. We had wired collapse to close; it is now
removed entirely on Rod's instruction ("remove the collapse, i didnt ask for that"), which makes
the mapping moot - but the record should be right.

## Panel geometry, re-read from the live CSS

| what | menu | news |
|---|---|---|
| size | height **580**, width from background art | **335 x 582** |
| aspect | - | **0.575** (portrait, roughly 4:7) |
| title bar | **46px**, `font-size:20px`, `line-height:26px`, `padding:10px` | 46px |
| bar as share of height | **7.9%** | 7.9% |
| inner padding | `59px 8px 0 8px` | `46px 30px 0 30px` |
| body type | list links **22px** | list `p` and `time` **14px**, items `padding:12px 0` |
| border / shadow | `1px` solid, `3px 3px 0` zero-blur | (background art) |
| desktop only | `.ztmy-pcmove-*` hidden below **1400px** | same |
