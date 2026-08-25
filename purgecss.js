import { promises as fs } from 'fs';
import { PurgeCSS } from 'purgecss';

const DIST_PATH = '_sass/vendors';
const output = `${DIST_PATH}/_bootstrap.scss`;

const config = {
  content: ['_includes/**/*.html', '_layouts/**/*.html', '_javascript/**/*.js'],
  css: ['node_modules/bootstrap/dist/css/bootstrap.min.css'],
  keyframes: true,
  variables: true,
  // The `safelist` should be changed appropriately for future development
  safelist: {
    standard: [/^collaps/, /^w-/, 'shadow', 'border', 'kbd'],
    greedy: [/^col-/, /tooltip/]
  }
};

// Bootstrap is emitted before our own CSS and used to be unlayered, and unlayered CSS beats every
// cascade layer. That let it silently win every property it shares with the ported redesign - the
// body colour and the whole type ladder among them. Wrapping it puts it in `vendor`, and because
// `vendor` is the first layer any page sees it becomes the lowest-priority one.
// Bootstrap's utilities carry !important, which inverts layer order, so those still win.
// @charset has to stay on line 1 of the file, so it is lifted back out of the wrapper.
function wrapInVendorLayer(css) {
  const charset = '@charset "UTF-8";';
  const body = css.replace(/^@charset\s+"[^"]*";/i, '');
  return [charset, '@layer vendor {', body, '}', ''].join('\n');
}

function main() {
  fs.rm(DIST_PATH, { recursive: true, force: true })
    .then(() => fs.mkdir(DIST_PATH))
    .then(() => new PurgeCSS().purge(config))
    .then((result) => {
      return fs.writeFile(output, wrapInVendorLayer(result[0].css));
    })
    .catch((err) => {
      console.error('Error during PurgeCSS process:', err);
    });
}

main();
