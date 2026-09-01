/* bio-block - the page's own script, lifted out when the page became a bench fragment
   (2026-08-25). A <script> inside an innerHTML fragment never runs, so the bench contract
   is `export function init(root)`; the body below is unchanged apart from its indent. */
export function init() {
/* The fit readout is MEASURED on load, so no number on this page is typed in by hand. */
document.querySelectorAll('.res').forEach(function (res) {
  var block = res.firstElementChild;
  var out = res.querySelector('.fit');
  var reserved = parseFloat(getComputedStyle(res).getPropertyValue('--res'));
  var rendered = Math.round(block.getBoundingClientRect().height);
  var delta = rendered - reserved;
  out.innerHTML = '<b>' + out.dataset.slot + '</b>reserved ' + reserved + 'px<br>rendered '
    + rendered + 'px<br>' + (delta > 0
      ? '<span class="over">OVER by ' + delta + 'px</span>'
      : 'fits, ' + (-delta) + 'px spare');
});

var toggle = document.getElementById('groundtoggle');
toggle.addEventListener('click', function () {
  var flat = document.body.classList.toggle('flat');
  toggle.textContent = flat ? 'ground on' : 'ground off';
});
}
