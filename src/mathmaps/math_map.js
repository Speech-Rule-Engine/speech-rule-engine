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

goog.require('sre.Engine');
goog.require('sre.MathCompoundStore');
goog.require('sre.MathUtil');
goog.require('sre.SystemExternal');



//TODO: (sorge)
// Refactor code to have uniform retrieval methods for the three system modes.
// Combine similar code for async and http.
// Provide a generic restarts function.
//
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

  /**
   * Array of domain names.
   * @type {Array.<string>}
   */
  this.allDomains = [];

  /**
   * Array of style names.
   * @type {Array.<string>}
   */
  this.allStyles = [];

  this.retrieveMaps();

  this.getDynamicConstraintValues();
};
goog.addSingletonGetter(sre.MathMap);


/**
 * Files left to fetch in asynchronous mode.
 * @type {number}
 * @private
 */
sre.MathMap.toFetch_ = 0;
sre.Engine.registerTest(function() {
  return sre.MathMap.getInstance() && !sre.MathMap.toFetch_;
});


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
 */
sre.MathMap.retrieveFiles = function(files, path, func) {
  switch (sre.Engine.getInstance().mode) {
    case sre.Engine.Mode.ASYNC:
      sre.MathMap.toFetch_ += files.length;
      for (var i = 0, file; file = files[i]; i++) {
        sre.MathMap.fromFile_(path + file,
            function(err, json) {
              sre.MathMap.toFetch_--;
              if (err) return;
              JSON.parse(json).forEach(function(x) {func(x);});
            });
      }
      break;
    case sre.Engine.Mode.HTTP:
      var isIE = sre.MathMap.isIE();
      sre.MathMap.toFetch_ += files.length;
      for (i = 0; file = files[i]; i++) {
        isIE ?
          sre.MathMap.getJsonIE_(file, func):
          sre.MathMap.getJsonAjax_(path + file, func);
      }
      break;
    case sre.Engine.Mode.SYNC:
    default:
      var innerFunc = function(file) { return path + file; };
      sre.MathMap.parseFiles(files.map(innerFunc)).
          forEach(function(json) {func(json);});
      break;
  }
};



/**
 * Retrieves mappings and adds them to the respective stores.
 */
sre.MathMap.prototype.retrieveMaps = function() {
  if (sre.Engine.getInstance().mode === sre.Engine.Mode.HTTP &&
      sre.MathMap.isIE()) {
    sre.MathMap.loadForIE_();
  }
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
};



/**
 * Predicate to check for MS Internet Explorer.
 * @return {boolean} True if the browser is IE.
 */
sre.MathMap.isIE = function() {
  return "ActiveXObject" in window && "clipboardData" in window;
};


/**
 * JSON object with mappings for IE.
 * @type{Object}
 */
sre.MathMap.forIE = null;


/**
 * Gets JSON elements from the global JSON object in case of IE browsers.
 * @param {string} file The name of a JSON file.
 * @param {function(JSONType)} func Method adding the rules.
 * @param {number=} opt_count Optional counter argument for callback. 
 */
sre.MathMap.getJsonIE_ = function(file, func, opt_count) {
  var count = opt_count || 1;
  if (!sre.MathMap.forIE) {
    if (count <= 5) {
      setTimeout(
        function() {sre.MathMap.getJsonIE_(file, func, count++);},
        300);
    } else {
      sre.MathMap.toFetch_--;
    }
    return;
  }
  var json = sre.MathMap.forIE[file];
  if (json) {
    json.forEach(function(x) {func(x);});
  }
  sre.MathMap.toFetch_--;
};


/**
 * Loads all JSON mappings for IE using a script tag.
 */
sre.MathMap.loadForIE_ = function() {
  var scr = sre.SystemExternal.document.createElement('script');
  scr.type = 'text/javascript';
  scr.src = sre.MathMap.MATHMAP_PATH_ + 'mathmaps_ie.js';
  sre.SystemExternal.document.head ?
    sre.SystemExternal.document.head.appendChild(scr) :
    sre.SystemExternal.document.body.appendChild(scr);
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
 * @return {string} A string representing a JSON array.
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


/**
 * Sents AJAX request to retrieve a JSON rule file.
 * @param {string} file The file to retrieve.
 * @param {function(JSONType)} func Method adding the retrieved rules.
 * @private
 */
sre.MathMap.getJsonAjax_ = function(file, func) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      sre.MathMap.toFetch_--;
      if (httpRequest.status === 200) {
        JSON.parse(httpRequest.responseText).forEach(function(x) {func(x);});
      }
    }
  };
  httpRequest.open('GET', file, true);
  httpRequest.send();
};


/**
 * Sets the set of all possible dynamic constraint values.
 */
sre.MathMap.prototype.getDynamicConstraintValues = function() {
  if (sre.MathMap.toFetch_) {
    setTimeout(goog.bind(this.getDynamicConstraintValues, this), 300);
  } else {
    var cstr = this.store.getDynamicConstraintValues();
    this.allDomains = cstr.domain;
    this.allStyles = cstr.style;
  }
};
