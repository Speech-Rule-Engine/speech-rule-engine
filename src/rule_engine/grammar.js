// Copyright 2016 Volker Sorge
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
//
// Supported by MOSS grant.

/**
 * @fileoverview A data structure to maintain grammatical context.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.Grammar');



/**
 * @constructor
 */
sre.Grammar = function() {

  /**
   * Object holding global parameters that can be set by the stores.
   * @type {Object.<string, string>}
   * @private
   */
  this.parameters_ = {};


  
  
};
goog.addSingletonGetter(sre.Grammar);


/**
 * Sets a grammar parameter.
 * @param {string} parameter The parameter name.
 * @param {string} value The parameter's value.
 */
sre.Grammar.prototype.setParameter = function(parameter, value) {
  this.parameters_[parameter] = value;
};


/**
 * Returns a grammar parameter if it exists.
 * @param {string} parameter The parameter name.
 * @return {string} The parameter's value.
 */
sre.Grammar.prototype.getParameter = function(parameter) {
  return this.parameters_[parameter];
};


