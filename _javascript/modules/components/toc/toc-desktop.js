export class TocDesktop {
  static options = {
    tocSelector: '#toc',
    contentSelector: '.content',
    ignoreSelector: '[data-toc-skip]',
    headingSelector: 'h2, h3, h4',
    orderedList: false,
    scrollSmooth: false,
    headingsOffset: 16 * 2
  };

  static refresh() {
    tocbot.refresh(this.options);
  }

  static init() {
    tocbot.init(this.options);
  }
}
