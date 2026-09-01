# SOURCE (True) — button fill-sweep (two-layer translateX), from nfranciosi

- **URL:** https://codepen.io/nfranciosi/pen/eGRKON (Rod picked + pasted; CodePen un-fetchable via agent)
- **Captured:** 2026-06-09 (Rod paste)
- **Used by:** `rework-hana.html` outline/pill button fill-sweep (replaces the free-handed `background-position` gradient sweep).
- **Mechanic:** TWO pseudo layers slide in on hover. `::before` (z-index 1) sits at `translateX(-100%)` and slides to `0` on hover (the main fill, from the left). `::after` (z-index 0) sits at `translateX(100%)` and slides to `0` on hover with a delay (a second layer from the right). The text `<span>` (z-index 5) recolors on hover. `overflow:hidden` clips the sliding layers; the result is a directional fill-sweep with a layered finish.

## Original CSS (verbatim, as pasted)
```css
.container{
  width: 80%;
  display: flex;
  text-align: center;
  margin: 0 auto;
  text-align: center;
  margin-top: 100px;
}

a{
  display: block;
  position: relative;
  text-decoration: none;
  font-family: "Helvetica", sans-serif;
  color: black;
  background: transparent;
  padding: 20px;
  border: 3px solid black;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
  width: 160px;
  overflow: hidden;
}

span {
  z-index: 5;
  position: relative;
  transition: color 350ms ease;
}
a:hover span{
  color: white;
}

a::after, a::before{
  content: " ";
  display: block;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  background: red;
  z-index: -1;
}

a::before {
/*   background: blue; */
  transform: translateX(-100%);
  z-index: 1;
}

a:hover:before {
  transform: translateX(0);
  transition: transform 350ms ease;
}

a::after {
   z-index: 0;
  transform: translateX(100%);
  transition: none;
  transition: transform 350ms ease;
}

a:hover:after {
  opacity: 1;
  transform: translateX(0);
 transition: transform 350ms 360ms ease;
}
```

## Remix plan in rework-hana.html (what changes)
- recolor `red`/`black`/`white` -> `--gold-deep` fill, `--gold` text, `--night` hover text (twilight palette).
- keep the two-layer translateX sweep + `overflow:hidden`; drop the demo `.container` wrapper.
- apply to `.btn-out` / `.btn-pill` (square + pill); text wrapped in a `<span>` (z-index above the layers).
- Tier: **Remixed** (nfranciosi two-layer sweep, recolored + adapted to our button markup).
