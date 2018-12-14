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
 * Subpath to dir containing ChromeVox JSON definitions for unused.
 * @type {string}
 * @const
 * @private
 */
SplitJson.UNUSED_PATH_ = 'unused';

/**
 * Array of JSON filenames containing symbol definitions for math speak.
 * @type {Array.<string>}
 * @const
 * @private
 */
SplitJson.SYMBOLS_FILES_ = [
  // Greek
  'greek-capital.js', 'greek-small.js', 'greek-scripts.js',
  'greek-mathfonts-bold.js', 'greek-mathfonts-italic.js',
  'greek-mathfonts-sans-serif-bold.js', 'greek-symbols.js',
  
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


/**
 * Array of JSON filenames containing unit unused unicode translations.
 * @type {Array.<string>}
 * @const
 * @private
 */
SplitJson.UNUSED_FILES_ = [
  'accented_characters.js', 'currencies_music.js', 'greek_accented.js',
  'private_area.js', 'special_symbols.js'
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


SplitJson.splitFile = function(path, files, locale, iso, model) {
  let fullPath = SplitJson.PATH_ + '/' + model + '/' + path + '/';
  let tmp = '/tmp/' + path + '/';
  shell.mkdir('-p', tmp);
  files.forEach(function(x) {
    SplitJson.intoFile(fullPath + x, tmp + x, locale, iso);
  });
};


SplitJson.splitFiles = function(path, files, locale, iso, type, model) {
  SplitJson.splitFile(path, files, locale, iso, model);
  let values = [];
  for(var key in locale) {
    values.push(locale[key]);
  }
  console.log(values.length);
  // Here we do the unused ones.
  fs.writeFileSync('/tmp/rest-' + type + '.js', JSON.stringify(values, null, 2));
};




SplitJson.allFiles = function(symbols, functions, units, path, iso) {
  let locale = SplitJson.loadLocale(symbols, path);
  SplitJson.splitFiles(SplitJson.SYMBOLS_PATH_,
                       SplitJson.SYMBOLS_FILES_, locale, iso, 'symbols', 'en');
  locale = SplitJson.loadLocale(functions, path);
  SplitJson.splitFiles(SplitJson.FUNCTIONS_PATH_,
                       SplitJson.FUNCTIONS_FILES_, locale, iso, 'functions', 'en');
  locale = SplitJson.loadLocale(units, path);
  SplitJson.splitFiles(SplitJson.UNITS_PATH_,
                       SplitJson.UNITS_FILES_, locale, iso, 'units', 'en');
  
};


SplitJson.localeToTable = function(content) {
  let table = [];
  for (let key in content) {
    let mappings = content[key].mappings;
    if (!mappings) {
      console.log('Missing: ' + key);
      continue;
    }
    // Not sure what that does.
    let text = mappings.mathspeak ? mappings.mathspeak.default :
        (mappings.default.short ? mappings.default.short :
         mappings.default.default);
    table.push('<tr><td>&#x' + key + ';</td><td>' + text + '</td></tr>');
  }
  return table;
};

SplitJson.compareLocaleToTable = function(english, locale) {
  let table = [];
  for (let key in english) {
    let mappings = english[key].mappings;
    if (!mappings) {
      console.log('Missing: ' + key);
      continue;
    }
    // Not sure what that does.
    let eng_text = mappings.mathspeak ? mappings.mathspeak.default :
        (mappings.default.short ? mappings.default.short :
         mappings.default.default);
    let loc_map = locale[key];
    let loc_text = '';
    if (loc_map) {
      loc_map = loc_map.mappings;
      loc_text = loc_map.mathspeak ? loc_map.mathspeak.default :
        (loc_map.default.short ? loc_map.default.short :
         loc_map.default.default);
    }
    table.push(`<tr><td>&#x${key};</td><td>${loc_text}</td><td>${eng_text}</td></tr>`);
  }
  return table;
};

SplitJson.toHTML = function(file, table, path = '/tmp/') {
  let filename = path + file + '.html';
  let style = '\n<style>\n' +
      'table, th, td {\n' +
      '  border: 1px solid black;' +
      '}\n</style>\n';
  let output = '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">';
  output += '\n<html><head>';
  output += '\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>';
  output += '\n<title>' + file + '</title>\n';
  output += style;
  output += '\n<body>';
  output += '\n<h2>' + file + '</h2>';
  output += '\n<table>\n';
  output += table.join('\n');
  output += '</body></html>';
  fs.writeFileSync(filename, output);
};

SplitJson.symbolsToHTML = function(compare = false,
                                   locale = 'en',
                                   path = '/tmp/symbols/') {
  let files = [];
  let localeContent = null;
  for (let file of SplitJson.SYMBOLS_FILES_) {
    let content = SplitJson.loadLocale([file], `${SplitJson.PATH_}/${locale}/symbols/`);
    if (compare) {
      localeContent = SplitJson.loadLocale([file], `${SplitJson.PATH_}/en/symbols/`);
    }
    let name = file.split('.')[0];
    files.push(name);
    let table = compare ?
        SplitJson.compareLocaleToTable(localeContent, content) :
        SplitJson.localeToTable(content);
    SplitJson.toHTML(name, table, path);
  }
  let index = '<html><head><title>Symbols</title></head>';
  index += '\n<body><ul>';
  for (let file of files) {
    index += '\n<li><a href="' + file + '.html">'  + file + '</a></li>';
  }
  index += '\n</ul></body></html>';
  fs.writeFileSync(path + 'index.html', index);
};


SplitJson.odsTable = function() {
  for (let file of SplitJson.SYMBOLS_FILES_) {
    let name = file.split('.')[0];
    console.log('<table:table table:name="' + name + '" table:style-name="ta1"><table:table-column table:style-name="co1" table:default-cell-style-name="Default"/><table:table-row table:style-name="ro1"><table:table-cell/></table:table-row></table:table><table:named-expressions/>');
  }
};

// SplitJson.defaultFiles = function() {
//   SplitJson.allFiles(SplitJson.SYMBOLS_FILES_, SplitJson.FUNCTIONS_FILES_)
// };

module.exports = SplitJson;

// SplitJson.splitFiles(SplitJson.SYMBOLS_PATH_,
//                       SplitJson.SYMBOLS_FILES_, french, 'fr', 'symbols');
// where french contained the locale.
// TODO: make an outer directory of the iso locale.


// Missing maths fonts:
// latin:
// bold-italic: seq 0x1d468 0x1d49b | while read n; do printf "%04X\n" $n; done
// sans-serif bold italic: seq 0X1D63C 0X1D66F | while read n; do printf "%04X\n" $n; done
//
// greek:
// Bold Italic : seq 0X1D71C 0X1D755 | while read n; do printf "%04X\n" $n; done
// sans-serif bold italic: seq 0X1D790 0X1D7C9 | while read n; do printf "%04X\n" $n; done
