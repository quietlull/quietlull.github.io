/* socials-row - the page's own script, lifted out when the page became a bench fragment
   (2026-08-25). A <script> inside an innerHTML fragment never runs, so the bench contract
   is `export function init(root)`; the body below is unchanged apart from its indent. */
export function init() {
/* MEASURE, do not label. Reads what actually rendered and compares it to the reservation. */
(function () {
  var W = 191, H = 120;
  function report() {
    document.querySelectorAll('[data-measure]').forEach(function (el) {
      var name = el.getAttribute('data-measure');
      var out = document.querySelector('[data-readout="' + name + '"]');
      if (!out) return;
      var r = el.getBoundingClientRect();
      var w = Math.round(r.width * 10) / 10;
      var h = Math.round(r.height * 10) / 10;
      var list = el.querySelector('.socials-row__list');
      var overflowX = list ? list.scrollWidth > list.clientWidth : false;
      var dh = Math.round((H - h) * 10) / 10;
      var cls = (h <= H && !overflowX) ? 'fit' : 'over';
      var verdict = (h <= H && !overflowX)
        ? 'FITS, ' + dh + 'px of height to spare'
        : (overflowX ? 'OVERFLOWS horizontally' : 'OVER by ' + (-dh) + 'px');
      out.innerHTML = '<b>measured</b> ' + w + ' x ' + h +
        '<br><b>reserved</b> ' + W + ' x ' + H +
        '<br><span class="' + cls + '">' + verdict + '</span>';
    });
  }
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(report); }
  report();
  window.addEventListener('resize', report);
})();
}
