# Paper EDGE via border-image (torn page / picture frame)

- **Source URL:** https://gneiss.place/nonhtml/css/index.css + the page-scoped Astro style on
  https://gneiss.place/pages/index/geology/fieldnotes/carbonitevolcanos
- **Captured:** 2026-08-21, read from the site's own served CSS.
- **Tier: True.** Verbatim below.

## IMPORTANT - this is the washi-tape site

`planity.neocities.org` now 302-redirects to `gneiss.place`. Same site, new domain. The element
gallery card for the taped callout still points at the neocities URL and will rot.

## The mechanism

The mat has no drawn border. Its EDGE is a photograph of torn paper (or a picture frame), sliced
with `border-image` so it stretches around any size box. The content sits in the middle.

```css
/* picture frame around the whole page shell */
.index {
  padding: 20.5px;
  box-shadow: 20px 10px 10px rgba(0, 0, 0, 0.75);
  image-rendering: initial;
  background: url(../../assets/images/backgrounds/cork2.png);
  background-position: center;
  background-size: 60%;
  border: 13px solid;
  border-image: url(/assets/images/borders/frame1.png) 10 round;
}
```

```css
/* torn-page edge on a nav box - note the ASYMMETRIC slice and width, and the .1deg rotation */
.navbox {
  image-rendering: optimizeQuality;
  border-style: solid;
  border-color: #0000;
  border-image-source: url(/assets/images/backgrounds/rippedpagenew.png);
  border-image-slice: 60 25 50 44 fill;
  border-image-width: 13px 12px 6px 21px;
  border-image-repeat: stretch round;
  margin: 3px 3px 5px;
  padding: 12px 2px 10px 18px;
  transform: rotate(-.1deg);
}
```

```css
/* an image gets the frame directly */
.button-image {
  border: 5px solid;
  border-image: url(/assets/images/borders/frame1.png) 10 round;
  max-width: 100%;
  height: auto;
}
```

## What transfers and what does not

- TRANSFERS: the technique. `border-image-slice` with `fill`, asymmetric `border-image-width`, and a
  sub-degree rotation so nothing sits perfectly square.
- DOES NOT TRANSFER: their PNGs. We would need our own torn-paper and frame assets. That is drawn
  artwork, which under D10 is the side of the line Rod does not work on, so this option has an
  asset cost the other two do not.
