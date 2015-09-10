// Copyright 2013 Google Inc.
// Copyright 2014 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview A class for loading and storing the maps for math atoms from
 * JSON files. The class (and entries) can then be used as via the
 * background page.
 * @author sorge@google.com (Volker Sorge)
 */


goog.provide('sre.MathMap');

goog.require('sre.MathCompoundStore');
goog.require('sre.MathUtil');
goog.require('sre.SystemExternal');



/**
 *
 * @constructor
 */
sre.MathMap = function() {

  /**
   * The compund store for symbol and function mappings.
   * @type {sre.MathCompoundStore}
   */
  this.store = sre.MathCompoundStore.getInstance();

  sre.MathMap.retrieveFiles(
    sre.MathMap.FUNCTIONS_FILES_,
    sre.MathMap.FUNCTIONS_PATH_,
    goog.bind(this.store.addFunctionRules, this.store));
  sre.MathMap.retrieveFiles(
    sre.MathMap.SYMBOLS_FILES_,
    sre.MathMap.SYMBOLS_PATH_,
    goog.bind(this.store.addSymbolRules, this.store));
  sre.MathMap.retrieveFiles(
    sre.MathMap.UNITS_FILES_,
    sre.MathMap.UNITS_PATH_,
    goog.bind(this.store.addUnitRules, this.store));

  var cstrValues = this.store.getDynamicConstraintValues();
  /**
   * Array of domain names.
   * @type {Array.<string>}
   */
  this.allDomains = cstrValues.domain;

  /**
   * Array of style names.
   * @type {Array.<string>}
   */
  this.allStyles = cstrValues.style;
};
goog.addSingletonGetter(sre.MathMap);


sre.MathMap.toFetch = 0;


/**
 * Stringifies MathMap into JSON object.
 * @return {string} The stringified version of the mapping.
 */
sre.MathMap.prototype.stringify = function() {
  return JSON.stringify(this);
};


/**
 * Path to dir containing ChromeVox JSON definitions for math speak.
 * @type {string}
 * @const
 * @private
 */
sre.MathMap.MATHMAP_PATH_ = sre.SystemExternal.jsonPath;


/**
 * Subpath to dir containing ChromeVox JSON definitions for symbols.
 * @type {string}
 * @const
 * @private
 */
sre.MathMap.SYMBOLS_PATH_ = sre.MathMap.MATHMAP_PATH_ + 'symbols/';


/**
 * Subpath to dir containing ChromeVox JSON definitions for functions.
 * @type {string}
 * @const
 * @private
 */
sre.MathMap.FUNCTIONS_PATH_ = sre.MathMap.MATHMAP_PATH_ + 'functions/';


/**
 * Subpath to dir containing ChromeVox JSON definitions for units.
 * @type {string}
 * @const
 * @private
 */
sre.MathMap.UNITS_PATH_ = sre.MathMap.MATHMAP_PATH_ + 'units/';


/**
 * Array of JSON filenames containing symbol definitions for math speak.
 * @type {Array.<string>}
 * @const
 * @private
 */
sre.MathMap.SYMBOLS_FILES_ = [
  // Greek
  'greek-capital.json', 'greek-small.json', 'greek-scripts.json',
  'greek-mathfonts.json', 'greek-symbols.json',

  // Hebrew
  'hebrew_letters.json',

  // Latin
  'latin-lower-double-accent.json', 'latin-lower-normal.json',
  'latin-lower-phonetic.json', 'latin-lower-single-accent.json',
  'latin-rest.json', 'latin-upper-double-accent.json',
  'latin-upper-normal.json', 'latin-upper-single-accent.json',
  'latin-mathfonts.json',

  // Math Symbols
  'math_angles.json', 'math_arrows.json', 'math_characters.json',
  'math_delimiters.json', 'math_digits.json', 'math_geometry.json',
  'math_harpoons.json', 'math_non_characters.json', 'math_symbols.json',
  'math_whitespace.json', 'other_stars.json'
];


/**
 * Array of JSON filenames containing symbol definitions for math speak.
 * @type {Array.<string>}
 * @const
 * @private
 */
sre.MathMap.FUNCTIONS_FILES_ = [
  'algebra.json', 'elementary.json', 'hyperbolic.json', 'trigonometry.json'
];


/**
 * Array of JSON filenames containing unit definitions for math speak.
 * @type {Array.<string>}
 * @const
 * @private
 */
sre.MathMap.UNITS_FILES_ = [
  'energy.json', 'length.json', 'memory.json', 'other.json', 'speed.json',
  'temperature.json', 'time.json', 'volume.json', 'weight.json'
];


/**
 * Retrieves JSON rule mappings from a list of files at a given path and adds
 * them as rules to the current store.
 * @param {Array.<string>} files List of file names.
 * @param {string} path A path name.
 * @param {function(JSONType)} func Method adding the rules.
 * @param {string=} opt_mode The mode of operation.
 */
sre.MathMap.retrieveFiles = function(files, path, func, opt_mode) {
  var mode = opt_mode || 'sync';
  switch (mode) {
  case 'async':
    // sre.MathMap.toFetch = sre.MathMap.toFetch === -1 ? files.length : sre.MathMap.toFetch + files.length;
    sre.MathMap.toFetch += files.length;
    console.log(sre.MathMap.toFetch);
    for (var i = 0, file; file = files[i]; i++) {
      sre.MathMap.file = file;
      sre.MathMap.fromFile_(path + file,
                            function(err, json) {
                              console.log(sre.MathMap.toFetch);
                              sre.MathMap.toFetch--;
                              if (err) {return;}
                              var retr = JSON.parse(json);
                              retr.forEach(function(x) {func(x);});
                            });
  }
    break;
  case 'http':
    break;
  case 'sync':
  default:
    var innerFunc = function(file) { return path + file; };
    sre.MathMap.parseFiles(files.map(innerFunc)).
        forEach(function(json) {func(json);});
    break;
  }
  
};


// sre.MathMap.synchroniseRules = function() {
//   if (Object.keys(sre.MathMap.toFetch).length === 0) {
//     sre.MathMap.redoSynchroniseRules();
//   }
//   // if (sre.MathMap.fetched !== sre.MathMap.toFetch) {
//   //   console.log('continue');
//   //   setTimeout(sre.MathMap.synchroniseRules, 500);
//   // }
// };

// sre.MathMap.redoSynchroniseRules = function() {
//   setTimeout(sre.MathMap.synchroniseRules, 500);
//   sre.MathMap.pausecomp(1000);
//   //sre.MathMap.synchroniseRules();
// };

sre.MathMap.pausecomp = function(ms) {
  ms += new Date().getTime();
  while (new Date() < ms){}
};

/**
 * Takes path to a JSON file and returns a JSON object.
 * @param {string} path Contains the path to a JSON file.
 * @param {function(string, string)} func Method adding the rules.
 * @return {string} JSON.
 * @private
 */
sre.MathMap.fromFile_ = function(path, func) {
  return sre.SystemExternal.fs.readFile(path, 'utf8', func);
};


/**
 * Loads JSON for a given file name.
 * @param {string} file A valid filename.
 * @return {string} A string representing JSON array.
 */
sre.MathMap.loadFile = function(file) {
  try {
    return sre.MathMap.readJSON_(file);
  } catch (x) {
    console.log('Unable to load file: ' + file + ', error: ' + x);
  }
};


/**
 * Loads a list of JSON files.
 * @param {Array.<string>} files An array of valid filenames.
 * @return {Array.<string>} A string representing JSON array.
 */
sre.MathMap.loadFiles = function(files) {
  return files.map(sre.MathMap.loadFile);
};


/**
 * Creates an array of JSON objects from a list of files.
 * @param {Array.<string>} files An array of filenames.
 * @return {Array.<JSONType>} Array of JSON objects.
 */
sre.MathMap.parseFiles = function(files) {
  var strs = sre.MathMap.loadFiles(files);

  return [].concat.apply([], strs.map(
      // Note: As JSON.parse does not expect the value index as the second
      // parameter, we wrap it.
      function(value) { return JSON.parse(value); }));
};


/**
 * Takes path to a JSON file and returns a JSON object.
 * @param {string} path Contains the path to a JSON file.
 * @return {string} JSON.
 * @private
 */
sre.MathMap.readJSON_ = function(path) {
  return sre.SystemExternal.fs.readFileSync(path);
};


sre.MathMap.getJsonAjax_ = function(file) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      console.log('Fetching from URL');
      console.log(JSON.parse(httpRequest.responseText));
    }
  };
  httpRequest.open('GET', sre.MathMap.FUNCTIONS_PATH_ + file, true);
  httpRequest.send();
};


sre.MathMap.getAjaxFiles_ = function() {
  sre.MathMap.FUNCTIONS_FILES_.map(sre.MathMap.getJsonAjax_);
};


