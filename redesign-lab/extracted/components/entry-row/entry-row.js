/* entry-row - the page's own script, lifted out when the page became a bench fragment
   (2026-08-25). A <script> inside an innerHTML fragment never runs, so the bench contract
   is `export function init(root)`; the body below is unchanged apart from its indent. */
export function init() {
/* The readout MEASURES the first title and blurb of each version and compares them to the handed
   reservation. Nothing here is typed in, so the page cannot claim a fit it does not have. */
var RESV = { ttl: [838, 30], blurb: [1054, 45] };

function line(label, el, want) {
  if (!el) return label + '  not present in this version\n';
  var r = el.getBoundingClientRect();
  var dw = want[0] - r.width, dh = want[1] - r.height;
  var say = function (d) { return d < 0 ? 'OVER by ' + (-d).toFixed(1) : (d).toFixed(1) + ' spare'; };
  var bad = (dw < 0 || dh < 0) ? ' class="over"' : '';
  return '<span' + bad + '>' + label + '  measured ' + r.width.toFixed(1) + ' x ' + r.height.toFixed(1) +
         '   reserved ' + want[0] + ' x ' + want[1] +
         '   width ' + say(dw) + ', height ' + say(dh) + '</span>\n';
}

function readout() {
  document.querySelectorAll('[data-stage]').forEach(function (stage, i) {
    var out = document.querySelectorAll('[data-read]')[i];
    out.innerHTML = line('title', stage.querySelector('[data-ttl]'), RESV.ttl)
                  + line('blurb', stage.querySelector('[data-blurb]'), RESV.blurb);
  });
}

document.querySelectorAll('[data-col]').forEach(function (b) {
  b.addEventListener('click', function () {
    document.querySelectorAll('[data-col]').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
    b.setAttribute('aria-pressed', 'true');
    document.documentElement.style.setProperty('--er-col', b.dataset.col);
    readout();
  });
});
document.getElementById('tog').addEventListener('click', function () {
  var on = document.body.classList.toggle('no-rsv');
  this.setAttribute('aria-pressed', on ? 'false' : 'true');
});
document.fonts.ready.then(readout);
readout();
}
