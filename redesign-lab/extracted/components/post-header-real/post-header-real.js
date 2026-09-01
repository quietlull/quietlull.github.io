/* post-header-real - the page's own script, lifted out when the page became a bench fragment
   (2026-08-25). A <script> inside an innerHTML fragment never runs, so the bench contract
   is `export function init(root)`; the body below is unchanged apart from its indent. */
export function init() {
/* Measures the three rails so the difference is a number, not an impression. */
(function () {
  var rails = document.querySelectorAll('.ph-rail');
  var out = [];
  rails.forEach(function (r, i) {
    out.push('V' + (i + 1) + ': ' + Math.round(r.getBoundingClientRect().height) + 'px tall');
  });
  document.getElementById('readout').textContent = out.join('   |   ');
})();
}
