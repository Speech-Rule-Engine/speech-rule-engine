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
goog.provide('sre.SpeechRuleFunctions.ContextFunctions');
goog.provide('sre.SpeechRuleFunctions.CustomQueries');
goog.provide('sre.SpeechRuleFunctions.CustomStrings');



/**
 * @constructor
 */
sre.SpeechRuleFunctions = function() { };



/**
 * Private superclass of all the custom function stores.
 * @constructor
 * @param {string} prefix A prefix string for the function names.
 * @param {Object.<string, Function>} store Storage object.
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
      /** @type {Object.<string, sre.SpeechRuleFunctions.CustomQuery>} */ ({});
  goog.base(this, 'CQF', store);
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
      /** @type {Object.<string, sre.SpeechRuleFunctions.CustomString>} */
      ({});
  goog.base(this, 'CSF', store);
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
      /** @type {Object.<string, sre.SpeechRuleFunctions.ContextFunction>} */
      ({});
  goog.base(this, 'CTXF', store);
};
goog.inherits(sre.SpeechRuleFunctions.ContextFunctions,
              sre.SpeechRuleFunctions.Store_);


/**
 * Checks validity for a custom function name.
 * @param {string} name The name of the custom function.
 * @return {!boolean} True if the name is valid.
 * @private
 */
sre.SpeechRuleFunctions.Store_.prototype.
    checkCustomFunctionSyntax_ = function(name) {
  var reg = new RegExp('^' + this.prefix_);
  if (!name.match(reg)) {
    console.log(
        'FunctionError: Invalid function name. Expected prefix' +
                this.prefix_);
    return false;
  }
  return true;
};
