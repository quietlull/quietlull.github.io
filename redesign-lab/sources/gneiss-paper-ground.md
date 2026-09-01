# Paper GROUND - a tiled photographed paper surface behind the content

- **Source URL:** https://gneiss.place/nonhtml/css/index.css
- **Captured:** 2026-08-21, read from the site's own served CSS.
- **Tier: True.** Verbatim below.

## The mechanism

The mat is not a colour, it is a photograph of a real surface, tiled. Content sits on top of it.
gneiss runs three of these at different scales: cork for the page shell, lined paper for the reading
column, notepad for small boxes. Then a separate stain overlay sells the "this is a real object".

```css
.content {
  background-image: url(/assets/images/backgrounds/lined2-rotated.png);
  background-size: 80%;
  background-position-y: -15px;
  background-repeat: repeat;
  padding: 10px;
  padding-top: 0px;
}
```

```css
.infobox {
  width: 32%;
  background-image: url(/assets/images/backgrounds/notepad.png);
  background-position: 91%;
  padding-top: 10px;
  padding-bottom: 15px;
  padding-left: 2px;
  background-size: 140%;
}
```

```css
/* the stain is its own overlay, not baked into the paper */
.coffeestain::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("/assets/images/coffeestain.png");
  background-size: 30%;
  background-position-x: 70%;
  background-repeat: no-repeat;
  opacity: 0.25;
  pointer-events: none;
  z-index: 0;
}
```

## Notes

- `background-size` is well over or under 100% on purpose, so the tile never reads as a tile.
- The stain being a separate `::before` at `opacity:.25` is the part worth stealing regardless of
  which option wins - it means one paper texture can wear many different marks.
- Their ink colour is `--ink: #584630` and shadows are warm brown `rgba(88,70,48,.5)`, never neutral
  black. That matches the warm-shadow finding already recorded for the taped callout.
