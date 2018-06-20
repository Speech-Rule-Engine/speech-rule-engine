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
 * @fileoverview Classes for custom functions for the speech rule engine.
 *
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.SpeechRuleFunctions');



/**
 * @constructor
 */
sre.SpeechRuleFunctions = function() { };



/**
 * Private superclass of all the custom function stores.
 * @constructor
 * @param {string} prefix A prefix string for the function names.
 * @param {!Object.<Function>} store Storage object.
 * @private
 */
sre.SpeechRuleFunctions.Store_ = function(prefix, store) {
  /** @private */
  this.prefix_ = prefix;
  /** @private */
  this.store_ = store;
};


/**
 * Adds a new function for the function store.
 * @param {string} name A name.
 * @param {!Function} func A function.
 */
sre.SpeechRuleFunctions.Store_.prototype.add = function(name, func) {
  if (this.checkCustomFunctionSyntax_(name)) {
    this.store_[name] = func;
  }
};


/**
 * Adds the functions of another store.
 * @param {sre.SpeechRuleFunctions.Store_} store A speech rule store.
 */
sre.SpeechRuleFunctions.Store_.prototype.addStore = function(store) {
  var keys = Object.keys(store.store_);
  for (var i = 0, key; key = keys[i]; i++) {
    this.add(key, /** @type {!Function} */(store.store_[key]));
  }
};


/**
 * Retrieves a function with the given name if one exists.
 * @param {string} name A name.
 * @return {Function} The function if it exists.
 */
sre.SpeechRuleFunctions.Store_.prototype.lookup = function(name) {
  return this.store_[name];
};


/**
 * Context function for use in speech rules.
 * @typedef {function(!Node): Array.<Node>}
 */
sre.SpeechRuleFunctions.CustomQuery;



/**
 * @constructor
 * @extends {sre.SpeechRuleFunctions.Store_}
 */
sre.SpeechRuleFunctions.CustomQueries = function() {
  var store =
      /** @type {!Object.<sre.SpeechRuleFunctions.CustomQuery>} */ ({});
  sre.SpeechRuleFunctions.CustomQueries.base(this, 'constructor', 'CQF', store);
};
goog.inherits(sre.SpeechRuleFunctions.CustomQueries,
              sre.SpeechRuleFunctions.Store_);


/**
 * Context function for use in speech rules.
 * @typedef {function(!Node): string}
 */
sre.SpeechRuleFunctions.CustomString;



/**
 * @constructor
 * @extends {sre.SpeechRuleFunctions.Store_}
 */
sre.SpeechRuleFunctions.CustomStrings = function() {
  var store =
      /** @type {!Object.<sre.SpeechRuleFunctions.CustomString>} */
      ({});
  sre.SpeechRuleFunctions.CustomStrings.base(this, 'constructor', 'CSF', store);
};
goog.inherits(sre.SpeechRuleFunctions.CustomStrings,
              sre.SpeechRuleFunctions.Store_);


/**
 * Context function for use in speech rules.
 * @typedef {function(Array.<Node>, ?string): (function(): string)}
 */
sre.SpeechRuleFunctions.ContextFunction;



/**
 * @constructor
 * @extends {sre.SpeechRuleFunctions.Store_}
 */
sre.SpeechRuleFunctions.ContextFunctions = function() {
  var store =
      /** @type {!Object.<sre.SpeechRuleFunctions.ContextFunction>} */
      ({});
  sre.SpeechRuleFunctions.ContextFunctions.base(
      this, 'constructor', 'CTXF', store);
};
goog.inherits(sre.SpeechRuleFunctions.ContextFunctions,
              sre.SpeechRuleFunctions.Store_);


/**
 * Checks validity for a custom function name.
 * @param {string} name The name of the custom function.
 * @return {boolean} True if the name is valid.
 * @private
 */
sre.SpeechRuleFunctions.Store_.prototype.
    checkCustomFunctionSyntax_ = function(name) {
  var reg = new RegExp('^' + this.prefix_);
  if (!name.match(reg)) {
    console.log(
        'FunctionError: Invalid function name. Expected prefix ' +
                this.prefix_);
    return false;
  }
  return true;
};
