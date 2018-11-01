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


SplitJson.toHTML = function(file, content, path = '/tmp/') {
  let filename = path + file + '.html';
  let table = [];
  for (let key in content) {
    let mappings = content[key].mappings;
    if (!mappings) {
      console.log('Missing: ' + key);
      continue;
    }
    let text = mappings.mathspeak ? mappings.mathspeak.default :
        (mappings.default.short ? mappings.default.short :
         mappings.default.default);
    table.push('<tr><td>&#x' + key + ';</td><td>' + text + '</td></tr>');
  }
  var style = '\n<style>\n' +
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

SplitJson.symbolsToHTML = function(path = '/tmp/symbols/') {
  let files = [];
  for (let file of SplitJson.SYMBOLS_FILES_) {
    let content = SplitJson.loadLocale([file], SplitJson.PATH_ + '/en/symbols/');
    let name = file.split('.')[0];
    files.push(name);
    SplitJson.toHTML(name, content, path);
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
