import { TocDesktop as desktop } from './toc/toc-desktop';

const desktopMode = matchMedia('(min-width: 1200px)');

function init() {
  if (document.querySelector('main>article[data-toc="true"]') === null) {
    return;
  }

  if (!desktopMode.matches) {
    return;
  }

  desktop.init();

  const $tocWrapper = document.getElementById('toc-wrapper');
  if ($tocWrapper) {
    $tocWrapper.classList.remove('invisible');
  }

  desktopMode.onchange = (event) => {
    if (event.matches) {
      desktop.init();
      const $wrapper = document.getElementById('toc-wrapper');
      if ($wrapper) {
        $wrapper.classList.remove('invisible');
      }
    }
  };
}

export { init as initToc };
