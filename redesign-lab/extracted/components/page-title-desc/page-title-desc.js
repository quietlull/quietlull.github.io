/* page-title-desc - the page's own script, lifted out when the page became a bench fragment
   (2026-08-25). A <script> inside an innerHTML fragment never runs, so the bench contract
   is `export function init(root)`; the body below is unchanged apart from its indent. */
export function init() {
function px(n){ return (Math.round(n*10)/10) + 'px'; }
/* the title BOX is set to the reserved width, so the box can never disagree with it and only the
   TEXT can overflow. A Range over the contents is the only honest width for it. */
function inkWidth(el){
  var rg = document.createRange();
  rg.selectNodeContents(el);
  return rg.getBoundingClientRect().width;
}
function line(name, el, spec, useInk){
  var p = spec.split('x'), rw = +p[0], rh = +p[1];
  var r = el.getBoundingClientRect();
  var w = useInk ? inkWidth(el) : r.width;
  var dw = w - rw, dh = r.height - rh;
  function part(label, delta){
    if (delta > 0.5) return '<span class="over">OVER by ' + px(delta) + ' ' + label + '</span>';
    if (delta < -0.5) return '<span class="fits">' + px(-delta) + ' ' + label + ' to spare</span>';
    return '<span class="fits">' + label + ' exact</span>';
  }
  return name + ': measured ' + px(w) + (useInk ? ' (text) x ' : ' x ') + px(r.height)
       + ' vs reserved ' + rw + ' x ' + rh + '  ->  ' + part('wide', dw) + ' / ' + part('tall', dh);
}
function report(){
  document.querySelector('.vw').textContent = 'viewport ' + window.innerWidth + 'px'
    + (window.innerWidth === 1440 ? '' : '  (blockout was measured at 1440)');
  document.querySelectorAll('.stage').forEach(function(stage){
    var out = stage.nextElementSibling;
    var t = stage.querySelector('.ptd__title'), d = stage.querySelector('.ptd__desc');
    var gap = +stage.dataset.gap;
    var block = stage.querySelector('.ptd').getBoundingClientRect().height;
    var rt = stage.dataset.title.split('x'), rd = stage.dataset.desc.split('x');
    var resTotal = (+rt[1]) + gap + (+rd[1]);
    var bd = block - resTotal;
    out.innerHTML = line('title', t, stage.dataset.title, true) + '<br>'
      + line('desc ', d, stage.dataset.desc, false) + '<br>'
      + 'block: measured ' + px(block) + ' vs reserved ' + resTotal + 'px (' + rt[1]
      + ' + ' + gap + ' + ' + rd[1] + ')  ->  '
      + (bd > 0.5 ? '<span class="over">OVER by ' + px(bd) + '</span>'
                  : '<span class="fits">' + px(-bd) + ' to spare</span>');
  });
}
if (document.fonts && document.fonts.ready) { document.fonts.ready.then(report); } else { report(); }
window.addEventListener('resize', report);
}
