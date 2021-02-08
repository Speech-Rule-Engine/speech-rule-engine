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

goog.require('sre.AlphabetGenerator');
goog.require('sre.BaseUtil');
goog.require('sre.BrowserUtil');
goog.require('sre.Engine');
goog.require('sre.MathCompoundStore');
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

  this.loaded_ = [];

  /**
   * Methods for parsing json structures.
   * @type {Object.<function(Array.<string>)>}
   */
  this.addRules = {
    functions: goog.bind(this.store.addFunctionRules, this.store),
    symbols: goog.bind(this.store.addSymbolRules, this.store),
    units: goog.bind(this.store.addUnitRules, this.store),
    si: goog.bind(this.addSiPrefixes, this)
  };

};
goog.addSingletonGetter(sre.MathMap);


/**
 * @type {Function}
 * @private
 */
sre.MathMap.oldInst_ = sre.MathMap.getInstance;


sre.MathMap.prototype.addSiPrefixes = function(json) {
  this.store.siPrefixes = json;
};


/**
 * @return {!sre.MathMap} The instance of the MathMap singleton.
 */
sre.MathMap.getInstance = function() {
  var instance = sre.MathMap.oldInst_();
  instance.loadLocale();
  return instance;
};


/**
 * Loads a new locale if necessary.
 */
sre.MathMap.prototype.loadLocale = function() {
  var locale = sre.Engine.getInstance().locale;
  if (this.loaded_.indexOf(locale) === -1) {
    var async = sre.Engine.getInstance().mode === sre.Engine.Mode.ASYNC;
    if (async) {
      sre.Engine.getInstance().mode = sre.Engine.Mode.SYNC;
    }
    this.loaded_.push(locale);
    this.retrieveMaps(locale);
    if (async) {
      sre.Engine.getInstance().mode = sre.Engine.Mode.ASYNC;
    }
  }
};


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
 * Retrieves JSON rule mappings for a given locale.
 * @param {string} locale The target locale.
 */
sre.MathMap.prototype.retrieveFiles = function(locale) {
  var file = sre.BaseUtil.makePath(sre.SystemExternal.jsonPath) +
      locale + '.js';
  switch (sre.Engine.getInstance().mode) {
    case sre.Engine.Mode.ASYNC:
      sre.MathMap.toFetch_++;
      var parse = goog.bind(this.parseMaps, this);
      sre.MathMap.fromFile_(file,
          function(err, json) {
            sre.MathMap.toFetch_--;
            if (err) return;
            parse(json);
          });
      break;
    case sre.Engine.Mode.HTTP:
      sre.MathMap.toFetch_++;
      this.getJsonAjax_(file);
      break;
    case sre.Engine.Mode.SYNC:
    default:
      var strs = sre.MathMap.loadFile(file);
      this.parseMaps(strs);
      break;
  }
};


/**
 * Parses JSON mappings from a string and them to the MathStore.
 * @param {string} json The json mappings string.
 */
sre.MathMap.prototype.parseMaps = function(json) {
  var js = /** @type {!Object<Array>} */(JSON.parse(json));
  this.addMaps(js);
};


/**
 * Adds JSON mappings to the mathmap store.
 * @param {!Object.<Array>} json The json mappings.
 * @param {string=} opt_locale Optionally the locale for the mappings to
 *     add. This is necessary for the single IE dictionary.
 */
sre.MathMap.prototype.addMaps = function(json, opt_locale) {
  for (var i = 0, key; key = Object.keys(json)[i]; i++) {
    var info = key.split('/');
    if (opt_locale && opt_locale !== info[0]) {
      continue;
    }
    json[key].forEach(this.addRules[info[1]]);
  }
};


/**
 * Retrieves mappings and adds them to the respective stores.
 * @param {string} locale The target locale.
 */
sre.MathMap.prototype.retrieveMaps = function(locale) {
  sre.AlphabetGenerator.generate(locale, this.store);
  if (sre.Engine.getInstance().isIE &&
      sre.Engine.getInstance().mode === sre.Engine.Mode.HTTP) {
    this.getJsonIE_(locale);
    return;
  }
  this.retrieveFiles(locale);
};


/**
 * Gets JSON elements from the global JSON object in case of IE browsers.
 * @param {string} locale The target locale.
 * @param {number=} opt_count Optional counter argument for callback.
 * @private
 */
sre.MathMap.prototype.getJsonIE_ = function(locale, opt_count) {
  var count = opt_count || 1;
  if (!sre.BrowserUtil.mapsForIE) {
    if (count <= 5) {
      setTimeout(
          goog.bind(function() {this.getJsonIE_(locale, count++);}, this),
          300);
    }
    return;
  }
  this.addMaps(sre.BrowserUtil.mapsForIE, locale);
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
    console.error('Unable to load file: ' + file + '\n' + x);
  }
  return '{}';
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
 * @private
 */
sre.MathMap.prototype.getJsonAjax_ = function(file) {
  var httpRequest = new XMLHttpRequest();
  var parse = goog.bind(this.parseMaps, this);
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      sre.MathMap.toFetch_--;
      if (httpRequest.status === 200) {
        parse(httpRequest.responseText);
      }
    }
  };
  httpRequest.open('GET', file, true);
  httpRequest.send();
};
