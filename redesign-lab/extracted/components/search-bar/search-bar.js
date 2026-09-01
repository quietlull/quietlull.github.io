/* search-bar - the page's own script, lifted out when the page became a bench fragment
   (2026-08-25). A <script> inside an innerHTML fragment never runs, so the bench contract
   is `export function init(root)`; the body below is unchanged apart from its indent. */
export function init() {
/* Fit evidence, not decoration: prints the real getBoundingClientRect of the reservation and of
   the component inside it, so "it fits" is a measurement on the page rather than a claim. */
document.querySelectorAll('.res').forEach(function (res) {
  var bar = res.querySelector('.sb');
  var out = res.parentElement.classList.contains('scrollx')
    ? res.parentElement.nextElementSibling
    : res.nextElementSibling;
  if (!bar || !out || !out.hasAttribute('data-readout')) return;
  var r = res.getBoundingClientRect();
  var b = bar.getBoundingClientRect();
  var dw = +(b.width - r.width).toFixed(2);
  var dh = +(b.height - r.height).toFixed(2);
  var fits = dw <= 0 && dh <= 0;
  out.innerHTML = 'reserved ' + res.dataset.res
    + ' &middot; component ' + b.width.toFixed(2) + ' x ' + b.height.toFixed(2)
    + ' &middot; delta ' + (dw >= 0 ? '+' : '') + dw + ' x ' + (dh >= 0 ? '+' : '') + dh
    + ' &middot; <span class="' + (fits ? 'ok">FITS' : 'no">OVERFLOWS') + '</span>';
});
}
