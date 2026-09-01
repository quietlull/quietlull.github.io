/* tune-store — shared per-element tune values (mt/mb/zoom/gap/maxw), persisted in
   localStorage so the bench's adjustments flow OUT to aggregate.html (which reads the
   same key through a component->section bridge). Keys: `${componentId}|${tuneKey}`. */
const STORAGE_KEY = 'lab-element-tunes';

export function loadTunes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function saveTunes(tunes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tunes));
}

export function applyTune(element, tune) {
  const has = (value) => value !== undefined && value !== null && value !== '';
  element.style.marginTop = has(tune?.mt) ? `${tune.mt}px` : '';
  element.style.marginBottom = has(tune?.mb) ? `${tune.mb}px` : '';
  element.style.zoom = has(tune?.z) ? tune.z : ''; // size
  element.style.maxWidth = has(tune?.mw) ? `${tune.mw}px` : '';
  element.style.gap = has(tune?.gap) ? `${tune.gap}px` : '';
  // CSS-var knobs components can opt into: --bloom (glow multiplier), --tspeed (state transition)
  element.style.setProperty('--bloom', has(tune?.bloom) ? tune.bloom : '');
  element.style.setProperty('--tspeed', has(tune?.tspd) ? `${tune.tspd}ms` : '');
}
