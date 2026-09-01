/* view-all-button - the page's own script, lifted out when the page became a bench fragment
   (2026-08-25). A <script> inside an innerHTML fragment never runs, so the bench contract
   is `export function init(root)`; the body below is unchanged apart from its indent. */
export function init() {
/* Reports the rendered box against the 84.98 x 28 reservation. Written so the page cannot claim
   a fit it does not have: every number here comes from getBoundingClientRect at read time. */
(function () {
  var RES_W = 84.98, RES_H = 28;
  var rows = [['A', 'vaA'], ['B', 'vaB'], ['C', 'vaC']].map(function (p) {
    var r = document.getElementById(p[1]).getBoundingClientRect();
    var dw = r.width - RES_W, dh = r.height - RES_H;
    var f = function (d) {
      return d <= 0 ? '<b>fits</b> (' + (-d).toFixed(2) + ' spare)'
                    : '<span class="over">OVER by ' + d.toFixed(2) + '</span>';
    };
    return p[0] + '  ' + r.width.toFixed(2) + ' x ' + r.height.toFixed(2) +
           '   width: ' + f(dw) + '   height: ' + f(dh);
  });
  document.getElementById('fit').innerHTML =
    'reservation 84.98 x 28 (band 1421 x 64)<br>' + rows.join('<br>');
})();
}
