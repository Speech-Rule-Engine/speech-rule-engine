import {dirname, join} from 'path';
import {fileURLToPath} from 'url';

export const __dirname = dirname(fileURLToPath(import.meta.url)).replace(/js$/, '');
global.__dirname = __dirname;

let fileMap = new Map([
  ['at', 'analytics/analytics_test.js'],
  ['atrie', 'analytics/analytics_trie.js'],
  ['btrans', 'generate/braille_transformer.js'],
  ['cto', 'generate/char_test_output.js'],
  ['ct', 'generate/copy_tests.js'],
  ['ft', 'generate/fill_tests.js'],
  ['gt', 'generate/generate_tests.js'],
  ['ttrans', 'generate/tex_transformer.js'],
  ['trans', 'generate/transformers.js'],
  ['tu', 'base/test_util.js'],
  ['vis', 'generate/visualise.js']
]);


function byValue(mod: string) {
  for (let [k, v] of fileMap) {
    let [full, ext, base] = v.match(/.+\/((.+)\.js)/);
    if (mod === full || mod === ext || mod === base) {
      console.warn(`Module bound to variable ${k}`);
      return [k, v];
    }
  }
  return [,];
}


/**
 * Loads and binds a module to a global variable. This is nasty stuff... don't
 * try this at home!
 *
 * @param mod The module to load.
 */
export function load(mod: string) {
  let file = fileMap.get(mod);
  let old = mod;
  if (!file) {
    [mod, file] = byValue(mod);
    if (!file) {
      console.error(`Module ${old} does not exist.`);
      return;
    }
  }
  file = join(__dirname, 'js', file);
  eval(`import("${file}").then((m) => global.${mod} = m);`);
};

/**
 * Loads a module.
 *
 * @param mod The module to load.
 * @return Promise with loaded module.
 */
export async function loadPromise(mod: string) {
  let file = fileMap.get(mod);
  let old = mod;
  if (!file) {
    [mod, file] = byValue(mod);
    if (!file) {
      console.error(`Module ${old} does not exist.`);
      return;
    }
  }
  file = join(__dirname, 'js', file);
  return import(file);
};


