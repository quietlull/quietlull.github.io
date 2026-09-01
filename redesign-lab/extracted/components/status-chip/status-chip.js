/* status-chip - the fit readout, lifted out of the page when it became a bench fragment
   (2026-08-25). Scripts inside an innerHTML fragment never execute, so the bench contract is
   `export function init(root)` and this is the same IIFE it always was, one indent shallower.
   It reads getBoundingClientRect at whatever viewport the bench is open at. Open at 1440 to
   compare against the contract. */
export function init() {
  var RES = { chip: [100, 20], term: [675, 172] };
  function measure(id, kind) {
    var el = document.getElementById(id);
    var b = el.getBoundingClientRect();
    var w = Math.round(b.width * 100) / 100, h = Math.round(b.height * 100) / 100;
    var rw = RES[kind][0], rh = RES[kind][1];
    var dw = Math.round((w - rw) * 100) / 100, dh = Math.round((h - rh) * 100) / 100;
    return { id: id, w: w, h: h, dw: dw, dh: dh, rw: rw, rh: rh };
  }
  function say(m) {
    var wtxt = m.dw === 0 ? 'width exact' : (m.dw > 0 ? 'width OVER by ' + m.dw : 'width under by ' + (-m.dw));
    var htxt = m.dh === 0 ? 'height exact' : (m.dh > 0 ? 'height OVER by ' + m.dh : 'height under by ' + (-m.dh));
    return 'renders <b>' + m.w + ' x ' + m.h + '</b> in a ' + m.rw + ' x ' + m.rh + ' box, ' + wtxt + ', ' + htxt + '.';
  }
  var rows = [
    ['fitA', measure('termA', 'term'), measure('chipA', 'chip')],
    ['fitB', measure('termB', 'term'), measure('chipB', 'chip')],
    ['fitC', measure('termC', 'term'), measure('chipC', 'chip')]
  ];
  rows.forEach(function (r) {
    document.getElementById(r[0]).innerHTML = 'terminal ' + say(r[1]) + '<br>chip ' + say(r[2]);
  });
  document.getElementById('fitC6').innerHTML = 'six lines ' + say(measure('termC6', 'term'));
  document.getElementById('fitAstack').innerHTML = 'stacked ' + say(measure('termAstack', 'term'));

  var out = 'MEASURED IN THIS BROWSER, viewport ' + window.innerWidth + ' x ' + window.innerHeight + '\n';
  out += 'reservation  chip 100 x 20   terminal 675 x 172\n\n';
  ['chipA', 'termA', 'termAstack', 'chipB', 'termB', 'chipC', 'termC', 'termC6'].forEach(function (id) {
    var kind = id.indexOf('chip') === 0 ? 'chip' : 'term';
    var m = measure(id, kind);
    out += id.padEnd(9) + String(m.w).padStart(8) + ' x ' + String(m.h).padStart(7) +
           '   dw ' + String(m.dw).padStart(7) + '   dh ' + String(m.dh).padStart(7) + '\n';
  });
  document.getElementById('readout').innerHTML = out;
}
