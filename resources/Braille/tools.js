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
  'greek-capital.js', 'greek-small.js'
];

Tools.GREEK_REST_ = [
  'greek-scripts.js', 'greek-symbols.js'
];
// TODO: 'greek-scripts.js', 'greek-symbols.js' Make better!


Tools.GREEK_MATH_FONTS_ = [
  'greek-mathfonts-bold.js', 'greek-mathfonts-italic.js',
  'greek-mathfonts-sans-serif-bold.js'
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
// TODO: cleanup


/**
 * Array of JSON filenames containing symbol definitions for math speak.
 * @type {Array.<string>}
 * @const
 * @private
 */
Tools.LATIN_FILES_ = [
  // Latin
  'latin-lower-normal.js', 'latin-upper-normal.js'
];

Tools.LATIN_REST_ = [
  'latin-lower-double-accent.js', 
  'latin-lower-phonetic.js', 'latin-lower-single-accent.js',
  'latin-rest.js', 'latin-upper-double-accent.js',
  'latin-upper-single-accent.js'
];
  
Tools.LATIN_MATH_FONTS = [
  'latin-mathfonts-bold-fraktur.js', 'latin-mathfonts-bold.js',
  'latin-mathfonts-bold-script.js', 'latin-mathfonts-double-struck.js',
  'latin-mathfonts-fraktur.js', 'latin-mathfonts-italic.js',
  'latin-mathfonts-monospace.js', 'latin-mathfonts-sans-serif-bold.js',
  'latin-mathfonts-sans-serif-italic.js', 'latin-mathfonts-sans-serif.js',
  'latin-mathfonts-script.js'
];

Tools.GREEK_MATH_FONTS = [
  // Greek Mathfonts
  'greek-mathfonts-bold.js', 'greek-mathfonts-italic.js',
  'greek-mathfonts-sans-serif-bold.js', 
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
  'math_delimiters.js', 'math_geometry.js',
  'math_harpoons.js', 'math_non_characters.js', 'math_symbols.js',
  'math_whitespace.js', 'other_stars.js',
  'math_digits.js'
];
// TODO: math_digits, properly. hebrew.


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


// Tools.SHELL_COMMAND = 'lou_translate unicode.dis,nemeth.ctb ';
Tools.SHELL_COMMAND = 'lou_translate unicode.dis,en-us-mathtext.ctb ';

Tools.translateCharacter = function(char) {
  let command = 'echo ' + char + ' | ' + Tools.SHELL_COMMAND;
  let result = shell.exec(command, {silent: true});
  let braille = result.replace(/\n$/, '').replace(/\s/g, '⠀');
  return braille;
};


Tools.translateAll = function() {
  // Tools.file8Cell = {};
  // Tools.fileUntranslated = {};
  // Tools.translateSymbolFiles(
  //   [].concat(Tools.GREEK_FILES_, Tools.LATIN_FILES_),
  //   // [].concat(Tools.GREEK_FILES_, Tools.HEBREW_FILES_, Tools.LATIN_FILES_, Tools.SYMBOLS_FILES_),
  //   '/home/sorge/git/speech-rule-engine/src/mathmaps/en/symbols/',
  //   '/tmp/nemeth/symbols/'
  // );
  // Tools.translateAlphabetFiles(
  //   [].concat(Tools.LATIN_MATH_FONTS, Tools.GREEK_MATH_FONTS_),
  //   '/home/sorge/git/speech-rule-engine/src/mathmaps/en/symbols/',
  //   '/tmp/nemeth/symbols/'
  // );
  // Tools.translateSymbolFiles(
  //   [].concat(Tools.LATIN_REST_, Tools.SYMBOLS_FILES_),
  //   '/home/sorge/git/speech-rule-engine/src/mathmaps/en/symbols/',
  //   '/tmp/nemeth/symbols/'
  // );
  // Tools.translateSymbolFiles(
  //   Tools.FUNCTIONS_FILES_,
  //   '/home/sorge/git/speech-rule-engine/src/mathmaps/en/functions/',
  //   '/tmp/nemeth/functions/', true
  // );
  // Tools.translateSymbolFiles(
  //   Tools.UNITS_FILES_,
  //   '/home/sorge/git/speech-rule-engine/src/mathmaps/en/units/',
  //   '/tmp/nemeth/units/', true
  // );
  Tools.translateSymbolFiles(
    [].concat(Tools.LATIN_REST_, Tools.SYMBOLS_FILES_),
    '/home/sorge/git/speech-rule-engine/src/mathmaps/en/symbols/',
    '/tmp/nemeth-text/symbols/'
  );
};

Tools.translateSymbolFiles = function(files, src, dest, decode) {
  let symbols = Tools.retrieveFiles(files, src);
  Tools.translateSymbols(symbols, dest, decode);
};

Tools.translateAlphabetFiles = function(files, src, dest) {
  let alphabets = Tools.retrieveFiles(files, src);
  Tools.translateAlphabets(alphabets, dest);
};

Tools.GREEKLETTER = [
  "⠨⠠⠁", "⠨⠠⠃", "⠨⠠⠛", "⠨⠠⠙", "⠨⠠⠑", "⠨⠠⠱", "⠨⠠⠣", "⠨⠠⠹", "⠨⠠⠊", "⠨⠠⠅",
  "⠨⠠⠇", "⠨⠠⠍", "⠨⠠⠝", "⠨⠠⠭", "⠨⠠⠕", "⠨⠠⠏", "⠨⠠⠗", "⠨⠠⠎", "⠨⠠⠥", "⠨⠠⠥",
  "⠨⠠⠋", "⠨⠠⠯", "⠨⠠⠫", "⠨⠠⠺",
  "⠨⠁", "⠨⠃", "⠨⠛", "⠨⠙", "⠨⠑", "⠨⠱", "⠨⠦", "⠨⠹", "⠨⠊", "⠨⠅",
  "⠨⠇", "⠨⠍", "⠨⠝", "⠨⠭", "⠨⠕", "⠨⠏", "⠨⠗", "⠨⠒", "⠨⠎", "⠨⠞",
  "⠨⠥", "⠨⠋", "⠨⠯", "⠨⠓", "⠨⠕"
];

Tools.LATINLETTER = [
  "⠠⠁", "⠠⠃", "⠠⠉", "⠠⠙", "⠠⠑", "⠠⠋", "⠠⠛", "⠠⠓", "⠠⠊", "⠠⠚",
  "⠠⠅", "⠠⠇", "⠠⠍", "⠠⠝", "⠠⠕", "⠠⠏", "⠠⠟", "⠠⠗", "⠠⠎", "⠠⠞",
  "⠠⠥", "⠠⠧", "⠠⠺", "⠠⠭", "⠠⠽", "⠠⠵",
  "⠁", "⠃", "⠉", "⠙", "⠑", "⠋", "⠛", "⠓", "⠊", "⠚",
  "⠅", "⠇", "⠍", "⠝", "⠕", "⠏", "⠟", "⠗", "⠎", "⠞",
  "⠥", "⠧", "⠺", "⠭", "⠽", "⠵"
];


Tools.FONT = {
    'bold': '⠸',
    'bold-fraktur': '⠸⠀⠸',
    'bold-italic': '⠸⠨',
    'bold-script': '⠸⠈',
    'caligraphic': '',
    'caligraphic-bold': '⠸',
    'double-struck': '⠈',
    'double-struck-italic': '⠈⠨',
    'fraktur': '⠸',
    'italic': '⠨',
    'monospace': '',
    'normal': '',
    'oldstyle': '',
    'oldstyle-bold': '⠸',
    'script': '⠈',
    'sans-serif': '⠠⠨',
    'sans-serif-italic': '⠠⠨⠨',
    'sans-serif-bold': '⠠⠨⠸',
    'sans-serif-bold-italic': '⠠⠨⠸⠨',
    'unknown': ''
};
// script is the same as double struck!
// omitted: caligraphic, oldstyle, unknown, monospace

Tools.translateAlphabets = function(alphabets, dest) {
  for (let file in alphabets) {
    let alphabet = alphabets[file];
    // let caps = alphabet.slice(0, alphabet/2);
    // let small = alphabet.slice(alphabet/2);
    console.log(alphabet[0]);
    let split = alphabet[0].mappings.default.short.split(' ');
    let font = Tools.FONT[split.slice(0, split.length - 2).join('-')];
    if (typeof font === 'undefined') {
      console.log('EERRRRROR: ' + split);
    }
    let characters = split[split.length - 1] === 'alpha' ?
        Tools.GREEKLETTER : Tools.LATINLETTER;
    let result = [];
    for (let i = 0, element; element = alphabet[i]; i++) {
      element.mappings = {default: {default: font + characters[i]}};
      result.push(element);
    }
    Tools.writeFile(dest + file, result);
  }
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
//     { category: 'Sk', mappings: [Object], key: '00B4' } ],

Tools.translateSymbols = function(symbols, dest, decode) {
  for (let file in symbols) {
    let json = symbols[file];
    let result = [];
    let result8 = [];
    let resultUn = [];
    for (let element of json) {
      let key = decode ? element.key : sre.SemanticUtil.numberToUnicode(parseInt(element.key, 16));
      let nemeth = Tools.translateCharacter(key);
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


Tools.NEMETH_EXAMPLES = [
  'gh Nemeth Rule Viewer.html',
  'gh Nemeth Rule Viewer02.html',
  'gh Nemeth Rule Viewer03.html',
  'gh Nemeth Rule Viewer06.html',
  'gh Nemeth Rule Viewer07.html',
  'gh Nemeth Rule Viewer10.html',
  'gh Nemeth Rule Viewer11.html',
  'gh Nemeth Rule Viewer12.html',
  'gh Nemeth Rule Viewer13.html',
  'gh Nemeth Rule Viewer14.html',
  'gh Nemeth Rule Viewer15.html',
  'gh Nemeth Rule Viewer17.html',
  'gh Nemeth Rule Viewer18.html',
  'gh Nemeth Rule Viewer19.html',
  'gh Nemeth Rule Viewer23.html'
];

Tools.NEMETH_PATH = '/home/sorge/git/speech-rule-engine/resources/Braille/tests/';


// Loading xmldom and xpath.
let xmldom = require('xmldom-sre');
let xpath = function() {
  var window = {document: {}};
  var wgx = require('wicked-good-xpath');
  wgx.install(window);
  window.document.XPathResult = window.XPathResult;
  return window.document;
}();

Tools.loadHtmlFile = function(file) {
  let content = fs.readFileSync(file, {encoding: 'utf-8'});
  let dp = new xmldom.DOMParser();
  return dp.parseFromString(content, 'text/html');
};


Tools.retrieveBrailleBlocks = function(html) {
  let braille = xpath.evaluate(
    '//*[contains(@class, "unicodeBraille")]',
    html, null, xpath.XPathResult.ORDERED_NODE_ITERATOR_TYPE);
  let images = xpath.evaluate(
    '//img[not(contains(@class, "audio"))]',
    html, null, xpath.XPathResult.ORDERED_NODE_ITERATOR_TYPE);
  let mathspeak = xpath.evaluate(
    '//*[contains(@class, "mathSpeakCell") or contains(@class, "introMathSpeakCell")]',
    html, null, xpath.XPathResult.ORDERED_NODE_ITERATOR_TYPE);
  console.log(braille.snapshotLength + ' ' + images.snapshotLength + ' ' + mathspeak.snapshotLength);
  var results = [];
  // Convert result to JS array
  var counter = 0;
  var offset = braille.snapshotLength - images.snapshotLength;
  for (var brailleNode = braille.iterateNext();
       brailleNode;
       brailleNode = braille.iterateNext()) {
    counter++;
    var braillebox = brailleNode.getAttribute('class').match(/brailleBox/);
    // var mathspeakNode = mathspeak.iterateNext();
    // var intro = mathspeakNode && mathspeakNode.getAttribute('class').match(/introMathSpeakCell/);
    results.push(['<p>', brailleNode, (counter > offset) ? images.iterateNext() : '', mathspeak.iterateNext(),
                  '</p>'].join('\n'));
    // results.push(['<p>', brailleNode, images.iterateNext(), braillebox ? mathspeak.iterateNext() : '',
    //               '</p>'].join('\n'));
  }
  return results.join('\n\n');
};


Tools.writeHtmlFile = function(html, counter) {
  var output = '<html><body>' + html.replace(/Viewer([0-9])_/g, 'Viewer0$1_') + '</body></html>';
  fs.writeFileSync(Tools.NEMETH_PATH + counter + '.html', output, function() {});
};


Tools.transformBrailleFiles = function() {
  for (var i = 0, file; file = Tools.NEMETH_EXAMPLES[i]; i++) {
    var path = Tools.NEMETH_PATH + file;
    var html = Tools.retrieveBrailleBlocks(Tools.loadHtmlFile(path));
    var counter = file.match(/[0-9]+/);
    counter = counter ? counter[0] : '01';
    console.log(counter);
    Tools.writeHtmlFile(html, counter);
  }
};


// Offset:
// 14 ?? One mathspeak missing
// 15 ?? too much offset!
// 17 ?? functions need to be gotten extra
// 18  4 missing in the middle
