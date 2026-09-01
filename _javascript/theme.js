/**
 * Theme state. Read-only.
 *
 * The site is dark-only. `theme_mode: dark` (_config.yml:91) stamps data-mode="dark" onto <html>
 * (_layouts/default.html:12), and _sass/themes/_light.scss was deleted in the merge, so there is
 * no light theme left to switch to. The flip button, the mode writers, the sessionStorage cache
 * and the system-preference listener were all removed in the D47 strip: nothing could reach them.
 *
 * What survives is exactly what img-popup.js and mermaid.js read. Both use the bare `Theme`
 * identifier rather than importing it, because this file is bundled as a global
 * (rollup.config.js:82, `outputName: 'Theme'`) and loaded on every page (_includes/head.html:136).
 */
class Theme {
  static #modeAttr = 'data-mode';
  static #darkMedia = window.matchMedia('(prefers-color-scheme: dark)');

  /**
   * True only if no mode is pinned on <html>. Always false while `theme_mode` is set.
   */
  static switchable = !document.documentElement.hasAttribute(this.#modeAttr);

  static get DARK() {
    return 'dark';
  }

  static get LIGHT() {
    return 'light';
  }

  /**
   * @returns {string} Theme mode identifier
   */
  static get ID() {
    return 'theme-mode';
  }

  /**
   * The pinned mode if there is one, otherwise whatever the system is asking for.
   *
   * @returns {string} 'dark' or 'light'
   */
  static get visualState() {
    return (
      document.documentElement.getAttribute(this.#modeAttr) ||
      (this.#darkMedia.matches ? this.DARK : this.LIGHT)
    );
  }

  /**
   * Maps theme modes to provided values
   * @param {string} light Value for light mode
   * @param {string} dark Value for dark mode
   * @returns {Object} Mapped values
   */
  static getThemeMapper(light, dark) {
    return {
      [this.LIGHT]: light,
      [this.DARK]: dark
    };
  }
}

export default Theme;
