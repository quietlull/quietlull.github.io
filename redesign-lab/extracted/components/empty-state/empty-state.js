/* empty-state - the page's own script, lifted out when the page became a bench fragment
   (2026-08-25). A <script> inside an innerHTML fragment never runs, so the bench contract
   is `export function init(root)`; the body below is unchanged apart from its indent. */
export function init() {
/* Measures every version against the reservation drawn behind it. Nothing here is typed in.
   THE BOX ALONE WOULD LIE: min-height:60px means the outer box reports 60 even if the content
   inside it overflowed. So the content is measured separately and the leftover air is printed,
   which is the number that says whether the fit is real or just clamped. */
function round2(n) { return Math.round(n * 100) / 100; }

document.querySelectorAll('.read').forEach(function (out) {
  var want = out.dataset.measure.split('x').map(Number);
  var es = out.previousElementSibling.querySelector('.es');
  var content = es.querySelector('.es__content');
  var r = es.getBoundingClientRect();
  var w = round2(r.width);
  var h = round2(r.height);
  var cs = getComputedStyle(es);
  var natural = round2(content.getBoundingClientRect().height +
    parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom));
  var air = round2(want[1] - natural);
  var fits = w <= want[0] + 0.5 && natural <= want[1] + 0.5;
  out.innerHTML = 'box ' + w + ' x ' + h + '&nbsp; reserved ' + want[0] + ' x ' + want[1] +
    '&nbsp; natural height ' + natural + 'px, ' + air + 'px of air' +
    '&nbsp; <span class="' + (fits ? 'ok' : 'bad') + '">' +
    (fits ? 'FITS' : 'OVER by ' + round2(-air) + 'px') + '</span>';
});
}
