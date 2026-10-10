const options = {
  tocSelector: '#toc',
  contentSelector: '.content',
  ignoreSelector: '[data-toc-skip]',
  headingSelector: 'h2, h3, h4',
  orderedList: false,
  scrollSmooth: false,
  headingsOffset: 16 * 2
};

const desktopMode = matchMedia('(min-width: 1200px)');

function show() {
  tocbot.init(options);
}

function init() {
  if (document.querySelector('main>article[data-toc="true"]') === null) {
    return;
  }

  if (!desktopMode.matches) {
    return;
  }

  show();

  desktopMode.onchange = (event) => {
    if (event.matches) {
      show();
    }
  };
}

export { init as initToc };
