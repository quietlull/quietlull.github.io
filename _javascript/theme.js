class Theme {
  static #modeAttr = 'data-mode';
  static #darkMedia = window.matchMedia('(prefers-color-scheme: dark)');

  static switchable = !document.documentElement.hasAttribute(this.#modeAttr);

  static get DARK() {
    return 'dark';
  }

  static get LIGHT() {
    return 'light';
  }

  static get ID() {
    return 'theme-mode';
  }

  static get visualState() {
    return (
      document.documentElement.getAttribute(this.#modeAttr) ||
      (this.#darkMedia.matches ? this.DARK : this.LIGHT)
    );
  }

  static getThemeMapper(light, dark) {
    return {
      [this.LIGHT]: light,
      [this.DARK]: dark
    };
  }
}

export default Theme;
