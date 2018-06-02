let fs = require('fs');
let shell = require('shelljs');
let SplitJson = {};

SplitJson.PATH_ = '/home/sorge/git/speech-rule-engine/src/mathmaps';

/**
 * Subpath to dir containing ChromeVox JSON definitions for symbols.
 * @type {string}
 * @const
 * @private
 */
SplitJson.SYMBOLS_PATH_ = 'symbols';


/**
 * Subpath to dir containing ChromeVox JSON definitions for functions.
 * @type {string}
 * @const
 * @private
 */
SplitJson.FUNCTIONS_PATH_ = 'functions';


/**
 * Subpath to dir containing ChromeVox JSON definitions for units.
 * @type {string}
 * @const
 * @private
 */
SplitJson.UNITS_PATH_ = 'units';

/**
 * Array of JSON filenames containing symbol definitions for math speak.
 * @type {Array.<string>}
 * @const
 * @private
 */
SplitJson.SYMBOLS_FILES_ = [
  // Greek
  'greek-capital.js', 'greek-small.js', 'greek-scripts.js',
  'greek-mathfonts.js', 'greek-symbols.js',

  // Hebrew
  'hebrew_letters.js',

  // Latin
  'latin-lower-double-accent.js', 'latin-lower-normal.js',
  'latin-lower-phonetic.js', 'latin-lower-single-accent.js',
  'latin-rest.js', 'latin-upper-double-accent.js',
  'latin-upper-normal.js', 'latin-upper-single-accent.js',

  // Latin Mathfonts
  'latin-mathfonts-bold-fraktur.js', 'latin-mathfonts-bold.js',
  'latin-mathfonts-bold-script.js', 'latin-mathfonts-double-struck.js',
  'latin-mathfonts-fraktur.js', 'latin-mathfonts-italic.js',
  'latin-mathfonts-monospace.js', 'latin-mathfonts-sans-serif-bold.js',
  'latin-mathfonts-sans-serif-italic.js', 'latin-mathfonts-sans-serif.js',
  'latin-mathfonts-script.js',

  // Math Symbols
  'math_angles.js', 'math_arrows.js', 'math_characters.js',
  'math_delimiters.js', 'math_digits.js', 'math_geometry.js',
  'math_harpoons.js', 'math_non_characters.js', 'math_symbols.js',
  'math_whitespace.js', 'other_stars.js'

];


/**
 * Array of JSON filenames containing symbol definitions for math speak.
 * @type {Array.<string>}
 * @const
 * @private
 */
SplitJson.FUNCTIONS_FILES_ = [
  'algebra.js', 'elementary.js', 'hyperbolic.js', 'trigonometry.js'
];


/**
 * Array of JSON filenames containing unit definitions for math speak.
 * @type {Array.<string>}
 * @const
 * @private
 */
SplitJson.UNITS_FILES_ = [
  'energy.js', 'length.js', 'memory.js', 'other.js', 'speed.js',
  'temperature.js', 'time.js', 'volume.js', 'weight.js'
];

//  'units_spanish.js'
// TODO: Sort this similar to the above.
// Localisation
// 'spanish.js', 'spanish_mathfonts.js'
//  'functions_spanish.js'



SplitJson.loadLocale = function(files, path) {
  path = path || '';
  let currentLocale = {};
  for (let file of files) {
    let content = fs.readFileSync(path + file);
    if (content) {
      JSON.parse(content).forEach(function(x) {
        let key = x['key'];
        if (key && key.length === 5 && key[0] === '0') {
          key = key.slice(1);
          x['key'] = key;
        }
        currentLocale[key] = x;
      }); 
    }
  }
  return currentLocale;
};


SplitJson.intoFile = function(src, dest, locale, iso) {
  let content = fs.readFileSync(src);
  if (!content) return;
  let list = JSON.parse(content);
  let result = SplitJson.splitContent(list, locale);
  result.unshift({"locale": iso});
  fs.writeFileSync(dest, JSON.stringify(result, null, 2));
};


SplitJson.splitContent = function(list, locale) {
  let result = [];
  for (let element of list) {
    let key = element['key'];
    let loc = locale[key];
    if (loc) {
      if (element.category) {
        loc.category = element.category;
      }
      if (element.names) {
        loc.names = element.names;
      }
      result.push(loc);
      delete locale[key];
    }
  }
  return result;
};


SplitJson.splitFile = function(path, files, locale, iso) {
  let fullPath = SplitJson.PATH_ + '/en/' + path + '/';
  let tmp = '/tmp/' + path + '/';
  shell.mkdir('-p', tmp);
  files.forEach(function(x) {
    SplitJson.intoFile(fullPath + x, tmp + x, locale, iso);
  });
};


SplitJson.splitFiles = function(path, files, locale, iso, type) {
  SplitJson.splitFile(path, files, locale, iso);
  let values = [];
  for(var key in locale) {
    values.push(locale[key]);
  }
  console.log(values.length);
  fs.writeFileSync('/tmp/rest-' + type + '.json', JSON.stringify(values, null, 2));
};


SplitJson.allFiles = function(symbols, functions, units, path, iso) {
  let locale = SplitJson.loadLocale(symbols, path);
  SplitJson.splitFiles(SplitJson.SYMBOLS_PATH_,
                      SplitJson.SYMBOLS_FILES_, locale, iso, 'symbols');
  locale = SplitJson.loadLocale(functions, path);
  SplitJson.splitFiles(SplitJson.FUNCTIONS_PATH_,
                      SplitJson.FUNCTIONS_FILES_, locale, iso, 'functions');
  locale = SplitJson.loadLocale(units, path);
  SplitJson.splitFiles(SplitJson.UNITS_PATH_,
                      SplitJson.UNITS_FILES_, locale, iso, 'units');
};

