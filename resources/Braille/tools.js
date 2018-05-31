require('/home/sorge/git/speech-rule-engine/lib/sre4node');
let shell = require('shelljs');

Tools = {};

/**
 * Array of JSON filenames containing symbol definitions for math speak.
 * @type {Array.<string>}
 * @const
 * @private
 */
Tools.GREEK_FILES_ = [
  // Greek
  'greek-capital.js', 'greek-small.js', 'greek-scripts.js',
  'greek-mathfonts.js', 'greek-symbols.js',
];

/**
 * Array of JSON filenames containing symbol definitions for math speak.
 * @type {Array.<string>}
 * @const
 * @private
 */
Tools.HEBREW_FILES_ = [
// Hebrew
  'hebrew_letters.js',
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
  'latin-upper-normal.js', 'latin-upper-single-accent.js',
];
  
Tools.MATH_FONTS = 'latin-mathfonts.js';

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
  'math_whitespace.js', 'other_stars.js',
];


/**
 * Array of JSON filenames containing symbol definitions for math speak.
 * @type {Array.<string>}
 * @const
 * @private
 */
Tools.FUNCTIONS_FILES_ = [
  'algebra.js', 'elementary.js', 'hyperbolic.js', 'trigonometry.js',
  'functions_spanish.js'
];


/**
 * Array of JSON filenames containing unit definitions for math speak.
 * @type {Array.<string>}
 * @const
 * @private
 */
Tools.UNITS_FILES_ = [
  'energy.js', 'length.js', 'memory.js', 'other.js', 'speed.js',
  'temperature.js', 'time.js', 'volume.js', 'weight.js',
  'units_spanish.js'
];


Tools.fileContent = {};

Tools.retrieveFiles = function(files, path, func) {
  path = sre.BaseUtil.makePath(sre.SystemExternal.jsonPath + path);
  for (var i = 0; i < files.length; i++) {
    let result = {};
    var file = files[i];
    var fullPath = path + file;
    var json = JSON.parse(sre.MathMap.loadFile(fullPath));
    json.map(function(x) {func(x, result);});
    Tools.fileContent[file] = result;
  }
};


Tools.SHELL_COMMAND = 'lou_translate unicode.dis,nemeth.ctb ';

Tools.translateCharacter = function(char) {
  let command = 'echo ' + char + ' | ' + Tools.SHELL_COMMAND;
  let result = shell.exec(command, {silent: true});
  let braille = result.replace(/\n$/, '').replace(/\s/g, '⠀');
  return braille;
};


Tools.translateAll = function(opt_files) {
  opt_files = opt_files ||
    [].concat(Tools.GREEK_FILES_, Tools.HEBREW_FILES, Tools.LATIN_FILES_, Tools.SYMBOLS_FILES_);
  // Tools.FUNCTIONS_FILES_, Tools.UNITS_FILES_);
  Tools.retrieveFiles(
    opt_files, sre.MathMap.SYMBOLS_PATH_,
    function(x, y) {
      if (typeof x.key !== 'undefined') {
        y[x.key] = sre.SemanticUtil.numberToUnicode(parseInt(x.key, 16));
      }
    });
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

Tools.translateFiles = function() {
  for (let key in Tools.fileContent) {
    let file = Tools.fileContent[key];
    let result = {};
    let result8 = {};
    let resultUn = {};
    for (let char in file) {
      let translate = Tools.translateCharacter(file[char]);
      if (Tools.stringIs6Cell(translate)) {
        result[char] = translate;
        continue;
      }
      if (Tools.stringIs8Cell(translate)) {
        result[char] = translate;
        result8[char] = translate;
        continue;
      }
      resultUn[char] = translate;
    }
    Tools.fileBraille[key] = result;
    Tools.file8Cell[key] = result8;
    Tools.fileUntranslated[key] = resultUn;
  }
};


Tools.writeFiles = function(path) {
  for (let key in Tools.fileBraille) {
    let json = [{"locale": "nemeth"}];
    let file = Tools.fileBraille[key];
    for (let code in file) {
      json.push({key: code, mappings: {nemeth: {default: file[code]}}});
    }
    let output = path + '/' + key;
    fs.writeFileSync(output, JSON.stringify(json, null, 2), function() {});
  }
};
