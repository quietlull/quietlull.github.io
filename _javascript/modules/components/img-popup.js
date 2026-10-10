const lightImages = '.popup:not(.dark)';
const darkImages = '.popup:not(.light)';
let selector = lightImages;

export function imgPopup() {
  if (document.querySelector('.popup') === null) {
    return;
  }

  if (Theme.visualState === Theme.DARK) {
    selector = darkImages;
  }

  const current = GLightbox({ selector: `${selector}` });
  current.on('open', () => { document.dispatchEvent(new Event('achievement:imageenlarge')); });
}
