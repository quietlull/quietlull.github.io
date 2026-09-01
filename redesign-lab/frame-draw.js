/* Injects the 6-span draw-on-reveal frame into every .card / .cell.
   Pair with the .frame CSS + sliders.js (which adds .in on scroll-in). The border
   draws itself segment-by-segment (hana technique: top halves + bottom halves + sides,
   each scaling from 0 along its own transform-origin). */
(function(){
  var els=document.querySelectorAll('.card, .cell, .text-card');
  for(var i=0;i<els.length;i++){
    if(els[i].querySelector(':scope > .frame')) continue;
    var f=document.createElement('span'); f.className='frame';
    f.innerHTML='<span></span><span></span><span></span><span></span><span></span><span></span>';
    els[i].insertBefore(f, els[i].firstChild);
  }
})();
