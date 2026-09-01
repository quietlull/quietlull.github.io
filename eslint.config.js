import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';

export default defineConfig([
  /* THE IGNORE LIST WAS INVERTED. `assets/*` skipped the 15 hand-written ES modules under
     `assets/js/` that ship on every page, while `redesign-lab/` - a gitignored workbench that never
     ships - WAS linted and produced about 3,500 errors, which is why `npm test` had stopped being
     run at all. Now the shipped code is checked and the workbench is not. Only Rollup's output and
     the vendored bundles stay ignored, since those are machine-owned. */
  globalIgnores([
    'assets/js/dist/*',
    /* Jekyll templates, not JavaScript. Both open with `---` front matter and a `layout:`,
       so eslint parses the YAML as code and reports "Assigning to rvalue". */
    'assets/js/data/*',
    'assets/lib/*',
    'redesign-lab/*',
    '.claude/*',
    'node_modules/*',
    '_site/*'
  ]),
  js.configs.recommended,
  {
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single']
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ['_javascript/**/*.js'],
    languageOptions: {
      globals: {
        ClipboardJS: 'readonly',
        GLightbox: 'readonly',
        Theme: 'readonly',
        dayjs: 'readonly',
        mermaid: 'readonly',
        tocbot: 'readonly',
        importScripts: 'readonly',
        swconf: 'readonly'
      }
    }
  }
]);
