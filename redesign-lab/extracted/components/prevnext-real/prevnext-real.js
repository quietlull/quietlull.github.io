/* prevnext-real - the page's own script, lifted out when the page became a bench fragment
   (2026-08-25). A <script> inside an innerHTML fragment never runs, so the bench contract
   is `export function init(root)`; the body below is unchanged apart from its indent. */
export function init() {
(function () {
  var lane = document.querySelector('.pn--cards .pn__lane');
  var h = Math.round(lane.getBoundingClientRect().height);
  var w = Math.round(lane.getBoundingClientRect().width);
  document.getElementById('readout').textContent =
    'measured lane: ' + w + ' x ' + h + 'px   |   blockout reserved 345 x 44   |   ' +
    'over by ' + (h - 44) + 'px in height, which is the card, not a bug';
})();
}
