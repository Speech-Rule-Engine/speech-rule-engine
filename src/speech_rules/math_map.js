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

  /**
   * Methods for parsing json structures.
   * @type {Object.<function(Array.<string>)>}
   */
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


sre.MathMap.prototype.retrieveFiles = function(locale) {
  var file = sre.BaseUtil.makePath(sre.SystemExternal.jsonPath) +
      locale + '.js';
  switch (sre.Engine.getInstance().mode) {
    case sre.Engine.Mode.ASYNC:
      sre.MathMap.toFetch_++;
        sre.MathMap.fromFile_(file,
            function(err, json) {
              sre.MathMap.toFetch_--;
              if (err) return;
              goog.bind(this.parse, this)(json);
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


sre.MathMap.prototype.parseMaps = function(json) {
  var js = /** @type {!Object<Array>} */(JSON.parse(json));
  this.addMaps(js);
};

sre.MathMap.prototype.addMaps = function(js) {
  for (var i = 0, key; key = Object.keys(js)[i]; i++) {
    var info = key.split('/');
    js[key].forEach(this.addRules[info[1]]);
  }
};


/**
 * Retrieves mappings and adds them to the respective stores.
 */
sre.MathMap.prototype.retrieveMaps = function() {
  if (sre.Engine.getInstance().isIE &&
      sre.Engine.getInstance().mode === sre.Engine.Mode.HTTP) {
    this.getJsonIE_();
    return;
  }
  for (var i = 0; i < sre.Variables.LOCALES.length; i++) {
    var locale = sre.Variables.LOCALES[i];
    sre.AlphabetGenerator.generate(locale, this.store);
    this.retrieveFiles(locale);
  }
};


/**
 * Gets JSON elements from the global JSON object in case of IE browsers.
 * @param {number=} opt_count Optional counter argument for callback.
 * @private
 */
sre.MathMap.prototype.getJsonIE_ = function(opt_count) {
  var count = opt_count || 1;
  if (!sre.BrowserUtil.mapsForIE) {
    if (count <= 5) {
      setTimeout(
        goog.bind(function() {this.getJsonIE_(count++);}, this),
          300);
    } else {
      sre.MathMap.toFetch_--;
    }
    return;
  }
  this.addMaps(sre.BrowserUtil.mapsForIE);
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
