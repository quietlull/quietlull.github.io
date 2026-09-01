# Paper GRAIN - pure CSS, no asset, via an SVG feTurbulence data URI

- **Source URL:** https://ibelick.com/blog/create-grainy-backgrounds-with-css
- **Captured:** 2026-08-21.
- **Tier: True** for the data URI and the two numbers below, which are quoted from the article.

## The mechanism

A `::before` overlay whose background is an inline SVG containing one `feTurbulence` filter over a
full-size rect. No image request, resolution independent, and monochrome by construction, so it is
the only one of the three options that is legal inside a greybox without bending D8.

```css
.card:before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E");
  opacity: 0.12;
  background-size: 182px;
}
```

- `baseFrequency: .65` - high frequency, so it reads as grain rather than cloud.
- `numOctaves: 3`
- `opacity: 0.12`
- `background-size: 182px` - the tile is scaled down from the 600 viewBox, which is what stops the
  noise looking like a repeating pattern.

## Honest caveat

This is FILM GRAIN, not paper. It gives a surface a tooth; it does not give it fibre, deckle, or a
torn edge. If the thing Rod means by "paper feel" is the object-ness of the gneiss mats, grain alone
will not get there. It is, however, free, needs no artwork, and can be layered UNDER either of the
other two later.

## Why the grain source we already held could not be used

`chriskalafatis-noise-grain.md` in this folder is honest that its grain is a WebGL fragment shader
buried in a 756 KB bundle, with no verbatim CSS saved. It is not usable as a snippet.
