require('/home/sorge/git/speech-rule-engine/lib/sre4node');
let shell = require('shelljs');
let fs = require('fs');

Tools = {};

/**
 * Array of JSON filenames containing symbol definitions for math speak.
 * @type {Array.<string>}
 * @const
 * @private
 */
Tools.GREEK_FILES_ = [
  // Greek
  'greek-capital.js', 'greek-small.js'];


Tools.GREEK_MATH_FONTS_ = [
  'greek-scripts.js', 'greek-mathfonts.js', 'greek-symbols.js'
];

/**
 * Array of JSON filenames containing symbol definitions for math speak.
 * @type {Array.<string>}
 * @const
 * @private
 */
Tools.HEBREW_FILES_ = [
// Hebrew
  'hebrew_letters.js'
];


/**
 * Array of JSON filenames containing symbol definitions for math speak.
 * @type {Array.<string>}
 * @const
 * @private
 */
Tools.LATIN_FILES_ = [
  // Latin
  'latin-lower-double-accent.js', 'latin-lower-normal.js',
  'latin-lower-phonetic.js', 'latin-lower-single-accent.js',
  'latin-rest.js', 'latin-upper-double-accent.js',
  'latin-upper-normal.js', 'latin-upper-single-accent.js'
];
  
Tools.LATIN_MATH_FONTS = [
  'latin-mathfonts-bold-fraktur.js', 'latin-mathfonts-bold.js',
  'latin-mathfonts-bold-script.js', 'latin-mathfonts-double-struck.js',
  'latin-mathfonts-fraktur.js', 'latin-mathfonts-italic.js',
  'latin-mathfonts-monospace.js', 'latin-mathfonts-sans-serif-bold.js',
  'latin-mathfonts-sans-serif-italic.js', 'latin-mathfonts-sans-serif.js',
  'latin-mathfonts-script.js'
];

/**
 * Array of JSON filenames containing symbol definitions for math speak.
 * @type {Array.<string>}
 * @const
 * @private
 */
Tools.SYMBOLS_FILES_ = [
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
Tools.FUNCTIONS_FILES_ = [
  'algebra.js', 'elementary.js', 'hyperbolic.js', 'trigonometry.js'
];


/**
 * Array of JSON filenames containing unit definitions for math speak.
 * @type {Array.<string>}
 * @const
 * @private
 */
Tools.UNITS_FILES_ = [
  'energy.js', 'length.js', 'memory.js', 'other.js', 'speed.js',
  'temperature.js', 'time.js', 'volume.js', 'weight.js'
];


Tools.fileContent = {};

Tools.retrieveFile = function(file) {
  let content = fs.readFileSync(file);
  let result = [];
  if (content) {
    JSON.parse(content).forEach(function(x) {
      let key = x['key'];
      if (key) {
        result.push(x);
      }
    }); 
  }
  return result;
};

Tools.retrieveFiles = function(files, path) {
  let result = {};
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    result[file] = Tools.retrieveFile(path + file);
  }
  return result;
};


Tools.SHELL_COMMAND = 'lou_translate unicode.dis,nemeth.ctb ';

Tools.translateCharacter = function(char) {
  let command = 'echo ' + char + ' | ' + Tools.SHELL_COMMAND;
  let result = shell.exec(command, {silent: true});
  let braille = result.replace(/\n$/, '').replace(/\s/g, '⠀');
  return braille;
};


Tools.translateAll = function() {
  Tools.file8Cell = {};
  Tools.fileUntranslated = {};
  Tools.translateSymbolFiles(
    [].concat(Tools.GREEK_FILES_),
    // [].concat(Tools.GREEK_FILES_, Tools.HEBREW_FILES_, Tools.LATIN_FILES_, Tools.SYMBOLS_FILES_),
    '/home/sorge/git/speech-rule-engine/src/mathmaps/en/symbols/',
    '/tmp/nemeth/symbols/'
  );
};

Tools.translateSymbolFiles = function(files, src, dest) {
  let symbols = Tools.retrieveFiles(files, src);
  Tools.translateSymbols(symbols, dest);
};

Tools.translateAlphabetFiles = function() {
  let alphabets = Tools.retrieveFiles(files, src);
  Tools.translateAlphabets(symbols, dest);
};

Tools.stringIs6Cell = function(str) {
  return !!str.match(/^[\u2800-\u283F]+$/);
};

Tools.stringIs8Cell = function(str) {
  return !!str.match(/^[\u2800-\u289F]+$/);
};

Tools.fileBraille = {};

Tools.file8Cell = {};

Tools.fileUntranslated = {};

Tools.translateSymbols = function(symbols, dest) {
  for (let file in symbols) {
    let json = symbols[file];
    let result = [];
    let result8 = [];
    let resultUn = [];
    for (let element of json) {
      let key = sre.SemanticUtil.numberToUnicode(parseInt(element.key, 16));
      console.log(key);
      let nemeth = Tools.translateCharacter(key);
      console.log(nemeth);
      element.mappings = {default: {default: nemeth}};
      if (Tools.stringIs6Cell(nemeth)) {
        result.push(element);
        continue;
      }
      if (Tools.stringIs8Cell(nemeth)) {
        result.push(element);
        result8.push(element);
        continue;
      }
      resultUn.push(element);
    }
    // Tools.fileBraille[file] = result;
    Tools.writeFile(dest + file, result);
    Tools.file8Cell[file] = result8;
    Tools.fileUntranslated[file] = resultUn;
  }
};


// Tools.writeFiles = function(path) {
//   for (let key in Tools.fileBraille) {
//     let json = [{"locale": "nemeth"}];
//     let file = Tools.fileBraille[key];
//     for (let code in file) {
//       json.push({key: code, mappings: {nemeth: {default: file[code]}}});
//     }
//     let output = path + '/' + key;
//     fs.writeFileSync(output, JSON.stringify(json, null, 2), function() {});
//   }
// };


Tools.writeFile = function(file, json) {
  json.unshift({"locale": "nemeth"});
  fs.writeFileSync(file, JSON.stringify(json, null, 2), function() {});
};
