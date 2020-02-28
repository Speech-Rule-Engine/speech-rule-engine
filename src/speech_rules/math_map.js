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

goog.require('sre.BaseUtil');
goog.require('sre.BrowserUtil');
goog.require('sre.Engine');
goog.require('sre.MathCompoundStore');
goog.require('sre.AlphabetGenerator');
goog.require('sre.SystemExternal');
goog.require('sre.Variables');



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

  this.addRules = {
    functions: goog.bind(this.store.addFunctionRules, this.store),
    symbols: goog.bind(this.store.addSymbolRules, this.store),
    units: goog.bind(this.store.addUnitRules, this.store)
  };

  var timeIn = (new Date()).getTime();
  this.retrieveMaps();
  var timeOut = (new Date()).getTime();
  console.log('Time:', timeOut - timeIn);

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


// /**
//  * Stringifies MathMap into JSON object.
//  * @return {string} The stringified version of the mapping.
//  */
// sre.MathMap.prototype.stringify = function() {
//   return JSON.stringify(this);
// };


// /**
//  * Subpath to dir containing ChromeVox JSON definitions for symbols.
//  * @type {string}
//  * @const
//  * @private
//  */
// sre.MathMap.SYMBOLS_PATH_ = 'symbols';


// /**
//  * Subpath to dir containing ChromeVox JSON definitions for functions.
//  * @type {string}
//  * @const
//  * @private
//  */
// sre.MathMap.FUNCTIONS_PATH_ = 'functions';


// /**
//  * Subpath to dir containing ChromeVox JSON definitions for units.
//  * @type {string}
//  * @const
//  * @private
//  */
// sre.MathMap.UNITS_PATH_ = 'units';


// /**
//  * Array of JSON filenames containing symbol definitions for math speak.
//  * @type {Array.<string>}
//  * @const
//  * @private
//  */
// sre.MathMap.SYMBOLS_FILES_ = [
//   // Greek
//   // 'greek-capital.js', 'greek-small.js', 
//   'greek-scripts.js', 'greek-symbols.js',
//   'greek-rest.js',

//   // Greek Mathfonts
//   // 'greek-mathfonts-bold.js', 'greek-mathfonts-italic.js',
//   // 'greek-mathfonts-bold-italic.js', 'greek-mathfonts-sans-serif-bold.js',
//   // 'greek-mathfonts-sans-serif-bold-italic.js',

//   // Hebrew
//   'hebrew_letters.js',

//   // Latin
//   // 'latin-lower-normal.js', 'latin-upper-normal.js',
//   'latin-lower-double-accent.js', 'latin-lower-phonetic.js',
//   'latin-lower-single-accent.js', 'latin-rest.js',
//   'latin-upper-double-accent.js', 'latin-upper-single-accent.js',

//   // Latin Mathfonts
//   // 'latin-mathfonts-bold-fraktur.js', 'latin-mathfonts-bold.js',
//   // 'latin-mathfonts-bold-italic.js', 'latin-mathfonts-bold-script.js',
//   // 'latin-mathfonts-double-struck.js', 'latin-mathfonts-fraktur.js',
//   // 'latin-mathfonts-italic.js', 'latin-mathfonts-monospace.js',
//   // 'latin-mathfonts-sans-serif-bold.js', 'latin-mathfonts-sans-serif-italic.js',
//   // 'latin-mathfonts-sans-serif-bold-italic.js', 'latin-mathfonts-sans-serif.js',
//   // 'latin-mathfonts-script.js',

//   // Math Symbols
//   'math_angles.js', 'math_arrows.js', 'math_characters.js',
//   'math_delimiters.js', 'math_geometry.js',
//   'math_harpoons.js', 'math_non_characters.js', 'math_symbols.js',
//   'math_whitespace.js', 'other_stars.js',
//   // 'math_digits.js',
//   'digits_rest.js'
// ];


// /**
//  * Array of JSON filenames containing symbol definitions for math speak.
//  * @type {Array.<string>}
//  * @const
//  * @private
//  */
// sre.MathMap.FUNCTIONS_FILES_ = [
//   'algebra.js', 'elementary.js', 'hyperbolic.js', 'trigonometry.js'
// ];


// /**
//  * Array of JSON filenames containing unit definitions for math speak.
//  * @type {Array.<string>}
//  * @const
//  * @private
//  */
// sre.MathMap.UNITS_FILES_ = [
//   'energy.js', 'length.js', 'memory.js', 'other.js', 'speed.js',
//   'temperature.js', 'time.js', 'volume.js', 'weight.js'
// ];


/**
 * Retrieves JSON rule mappings from a list of files at a given path and adds
 * them as rules to the current store.
 * @param {Array.<string>} files List of file names.
 * @param {string} path A path name.
 * @param {function(JSONType)} func Method adding the rules.
 */
sre.MathMap.retrieveFiles = function(files, path, func) {
  if (files) return;
  path = sre.BaseUtil.makePath(sre.SystemExternal.jsonPath + path);
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
      var isIE = sre.Engine.getInstance().isIE;
      sre.MathMap.toFetch_ += files.length;
      for (i = 0; file = files[i]; i++) {
        isIE ?
            sre.MathMap.getJsonIE_(file, func) :
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


sre.MathMap.prototype.retrieveFilesNew = function(locale) {
  var file = sre.BaseUtil.makePath(sre.SystemExternal.jsonPath) +
      locale + '.js';
  console.log(sre.Engine.getInstance().mode);
  switch (sre.Engine.getInstance().mode) {
    case sre.Engine.Mode.ASYNC:
      sre.MathMap.toFetch_++;
        sre.MathMap.fromFile_(file,
            function(err, json) {
              sre.MathMap.toFetch_--;
              if (err) return;
              var js = JSON.parse(json);
              console.log(js);
            });
      break;
    // case sre.Engine.Mode.HTTP:
    //   var isIE = sre.Engine.getInstance().isIE;
    //   sre.MathMap.toFetch_ += files.length;
    //   for (i = 0; file = files[i]; i++) {
    //     isIE ?
    //         sre.MathMap.getJsonIE_(file, func) :
    //         sre.MathMap.getJsonAjax_(path + file, func);
    //   }
    //   break;
    case sre.Engine.Mode.SYNC:
    default:
    var strs = sre.MathMap.loadFile(file);
    var js = /** @type {!Object<Array>} */(JSON.parse(strs));
    console.log('Retrieving ' + locale);
    this.parseMaps(js);
      // var innerFunc = function(file) { return path + file; };
      // sre.MathMap.parseFiles(files.map(innerFunc)).
      //     forEach(function(json) {func(json);});
      break;
  }
};


sre.MathMap.prototype.parseMaps = function(json) {
  for (var i = 0, key; key = Object.keys(json)[i]; i++) {
    var info = key.split('/');
    json[key].forEach(this.addRules[info[1]]);
  }
};


/**
 * Retrieves mappings and adds them to the respective stores.
 */
sre.MathMap.prototype.retrieveMaps = function() {
  for (var i = 0; i < sre.Variables.LOCALES.length; i++) {
    var locale = sre.Variables.LOCALES[i];
    sre.AlphabetGenerator.generate(locale, this.store);
    this.retrieveFilesNew(locale);
    // Remove below!
    // sre.MathMap.retrieveFiles(
    //     sre.MathMap.FUNCTIONS_FILES_,
    //     locale + '/' + sre.MathMap.FUNCTIONS_PATH_,
    //     goog.bind(this.store.addFunctionRules, this.store));
    // sre.MathMap.retrieveFiles(
    //     sre.MathMap.SYMBOLS_FILES_,
    //     locale + '/' + sre.MathMap.SYMBOLS_PATH_,
    //     goog.bind(this.store.addSymbolRules, this.store));
    // sre.MathMap.retrieveFiles(
    //     sre.MathMap.UNITS_FILES_,
    //     locale + '/' + sre.MathMap.UNITS_PATH_,
    //     goog.bind(this.store.addUnitRules, this.store));
  }
};


/**
 * Gets JSON elements from the global JSON object in case of IE browsers.
 * @param {string} file The name of a JSON file.
 * @param {function(JSONType)} func Method adding the rules.
 * @param {number=} opt_count Optional counter argument for callback.
 * @private
 */
sre.MathMap.getJsonIE_ = function(file, func, opt_count) {
  var count = opt_count || 1;
  if (!sre.BrowserUtil.mapsForIE) {
    if (count <= 5) {
      setTimeout(
          function() {sre.MathMap.getJsonIE_(file, func, count++);},
          300);
    } else {
      sre.MathMap.toFetch_--;
    }
    return;
  }
  for (var i = 0; i < sre.Variables.LOCALES.length; i++) {
    var locale = sre.Variables.LOCALES[i];
    var json = sre.BrowserUtil.mapsForIE[locale + '/' + file];
    if (json) {
      json.forEach(function(x) {func(x);});
    }
  }
  sre.MathMap.toFetch_--;
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
    console.error('Unable to load file: ' + file + ', error: ' + x);
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
