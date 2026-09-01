# SOURCE (True) — achievement unlock toast (Xbox-style), from robsawyer/robooneus

- **URL:** https://codepen.io/robooneus/pen/EKrLZV (Rod picked + pasted). Author credit: robsawyer.me.
- **Captured:** 2026-06-09 (Rod paste)
- **Used by:** `rework-hana.html` achievement unlock toast (NEW element) + a test trigger button.
- **Mechanic:** a fixed toast (`.ach`) parked off-screen (bottom:-5em) as a small circle. Adding `.achieved` runs a 3-stage chained animation: `ach_in` (slide up + circle->bar expand, 1.4s), `ach_cur` (hold, 3s), `ach_out` (collapse + slide down, 0.8s) via `animation-delay`. The icon (`i_in/i_current/i_out`) pops with a scale bounce; the text_wrap (`text_in/text_out`) reveals. No `forwards` fill, so it auto-resets to hidden after ~5.2s. A demo button toggles `.achieved`.

## Original code (verbatim core — toast HTML + CSS; demo-page chrome omitted)
```html
<div class="ach">
  <div class="icon"><i class="fa fa-bolt" aria-hidden="true"></i></div>
  <div class="text_wrap">
    <p class="title">Button Clicker!</p>
    <span class="detail">you clicked a button</span>
  </div>
</div>
<!-- demo trigger -->
<div class="button_wrap"><a class="button">Achieve something!</a></div>
```
```css
.ach { background:#14b5d1; display:block; position:fixed; bottom:-5em; left:50%; margin-left:-175px; width:350px; height:65px; color:#fff; font-size:16px; padding:0 1.2em 0 0; transition:all .1s ease-out; }
.ach .icon { float:left; font-size:2.2em; width:65px; padding:0.1em 0 0; text-align:center; }
.ach .text_wrap { position:absolute; left:65px; width:250px; top:0.7em; overflow:hidden; }
.ach .title { font-size:0.9em; width:260px; margin:0 0 -0.2em; padding:0; }
.ach .detail { font-size:0.7em; width:260px; margin:0; color:rgba(255,255,255,0.7); font-style:italic; }

@keyframes ach_in_anim { 0%{bottom:-5em;width:65px;margin-left:-32.5px;border-radius:50%} 15%{bottom:2.2em;width:65px;margin-left:-32.5px} 25%{bottom:1em;width:65px;margin-left:-32.5px} 75%{bottom:1em;width:65px;margin-left:-32.5px} 85%{bottom:1em;width:65px;margin-left:-32.5px;border-radius:50%} 92%{bottom:1em;width:380px;margin-left:-190px;border-radius:0} 100%{bottom:1em;width:350px;margin-left:-175px;border-radius:0} }
@keyframes ach_current { 0%{bottom:1em;width:350px;margin-left:-175px} 100%{bottom:1em;width:350px;margin-left:-175px} }
@keyframes ach_out_anim { 0%{bottom:1em;width:350px;margin-left:-175px;border-radius:50%} 16%{bottom:1em;width:65px;margin-left:-32.5px;border-radius:50%} 20%{bottom:1em;width:50px;margin-left:-25px} 34%{bottom:1em;width:65px;margin-left:-32.5px} 70%{bottom:1em;width:65px;margin-left:-32.5px} 100%{bottom:-5em;width:65px;margin-left:-32.5px;border-radius:50%} }
.achieved { animation: ach_in_anim 1.4s, ach_current 3s, ach_out_anim 0.8s; animation-delay: 0s, 1.4s, 4.4s; }

@keyframes i_in_anim { 0%{transform:scale(0)} 45%{transform:scale(0)} 46%{transform:scale(0.4)} 50%{transform:scale(1)} 55%{transform:scale(1.2)} 60%{transform:scale(1)} 100%{transform:scale(1)} }
@keyframes i_current { 0%{transform:scale(1)} 100%{transform:scale(1)} }
@keyframes i_out_anim { 0%{transform:scale(1)} 46%{transform:scale(1)} 47%{transform:scale(1.2)} 56%{transform:scale(1)} 60%{transform:scale(0.4)} 65%{transform:scale(0)} 100%{transform:scale(0)} }
.achieved .icon i { animation: i_in_anim 1.4s, i_current 3s, i_out_anim 0.8s; animation-delay: 0s, 1.4s, 4.4s; }

@keyframes text_in_anim { 0%{width:0} 85%{width:0} 100%{width:260px} }
@keyframes text_out_anim { 0%{width:260px} 12%{width:0} 100%{width:0} }
.achieved .text_wrap { animation: text_in_anim 1.4s, text_out_anim 0.8s; animation-delay: 0s, 4.4s; }
```

## Remix plan in rework-hana.html
- RELOCATE bottom-CENTER -> bottom-RIGHT (Steam-style, per Rod). Drop the `left:50%`/`margin-left` centering; anchor `right:1.5em`. Keyframes lose the margin-left track, keep `bottom`+`width` expand (right edge fixed).
- recolor `#14b5d1` cyan -> dark night panel (`rgba(8,12,30,.96)`) + amber border/glow + gold icon/title (twilight palette).
- icon glyph: FontAwesome `fa-bolt` -> unicode star (no FA dependency).
- ADD a test trigger button (`.achbtn`) on the page (Rod: "we need a button to trigger it on our test site"); JS restarts `.achieved` on click. `?ach=1` static-shows it for headless capture.
- base icon/text kept VISIBLE (source pattern) so the hold stage doesn't blank them.
- Tier: **Remixed**.
