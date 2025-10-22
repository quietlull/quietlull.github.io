'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var babel = require('@rollup/plugin-babel');
var terser = require('@rollup/plugin-terser');
var pluginNodeResolve = require('@rollup/plugin-node-resolve');
var fs = require('fs');
var pkg = require('./package.json');

const SRC_DEFAULT = '_javascript';
const SRC_PWA = `${SRC_DEFAULT}/pwa`;
const DIST = 'assets/js/dist';

const banner = `/*!
 * ${pkg.name} v${pkg.version} | © ${pkg.since} ${pkg.author} | ${pkg.license} Licensed | ${pkg.homepage}
 */`;
const frontmatter = '---\npermalink: /:basename\n---\n';
const isProd = process.env.BUILD === 'production';

let hasWatched = false;

function cleanup() {
  fs.rmSync(DIST, { recursive: true, force: true });
  console.log(`> Directory "${DIST}" has been cleaned.`);
}

function insertFrontmatter() {
  return {
    name: 'insert-frontmatter',
    generateBundle(_, bundle) {
      for (const chunkOrAsset of Object.values(bundle)) {
        if (chunkOrAsset.type === 'chunk') {
          chunkOrAsset.code = frontmatter + chunkOrAsset.code;
        }
      }
    }
  };
}

function build(
  filename,
  { src = SRC_DEFAULT, jekyll = false, outputName = null } = {}
) {
  const input = `${src}/${filename}.js`;
  const shouldWatch = hasWatched ? false : true;

  if (!hasWatched) {
    hasWatched = true;
  }

  return {
    input,
    output: {
      file: `${DIST}/${filename}.min.js`,
      format: 'iife',
      ...(outputName !== null && { name: outputName }),
      banner,
      sourcemap: !isProd && !jekyll
    },
    ...(shouldWatch && { watch: { include: `${SRC_DEFAULT}/**/*.js` } }),
    plugins: [
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/env'],
        plugins: [
          '@babel/plugin-transform-class-properties',
          '@babel/plugin-transform-private-methods'
        ]
      }),
      pluginNodeResolve.nodeResolve(),
      isProd && terser(),
      jekyll && insertFrontmatter()
    ]
  };
}

cleanup();

var rollup_config = [
  build('commons'),
  build('home'),
  build('categories'),
  build('page'),
  build('post'),
  build('misc'),
  build('theme', { outputName: 'Theme' }),
  build('app', { src: SRC_PWA, jekyll: true }),
  build('sw', { src: SRC_PWA, jekyll: true }),
  build('three-background'), 
  build('performance-monitor'),
  build('lantern-controller')
];

exports.default = rollup_config;
