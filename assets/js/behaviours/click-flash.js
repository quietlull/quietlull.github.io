export function initClickFlash(root = document) {
  for (const element of root.querySelectorAll('[data-click-flash]')) {
    element.addEventListener('click', () => {
      element.classList.remove('dm-flash');
      void element.offsetWidth;
      element.classList.add('dm-flash');
    });
    element.addEventListener('animationend', (event) => {
      if (event.animationName === 'dm-border-fly') {
        element.classList.remove('dm-flash');
      }
    });
  }
}
