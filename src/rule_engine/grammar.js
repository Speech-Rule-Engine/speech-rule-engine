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
   * Grammatical annotations that need to be propagated.
   * @type {Object.<string, string|boolean>}
   * @private
   */
  this.parameters_ = {};

  /**
   * Maps grammatical annotations to correction functions.
   * @type {Object.<string, Function>}
   * @private
   */
  this.corrections_ = {};
  
};
goog.addSingletonGetter(sre.Grammar);


/**
 * @type {string}
 */
sre.Grammar.ATTRIBUTE = 'grammar';


/**
 * Clears the grammar object.
 */
sre.Grammar.prototype.clear = function() {
  this.parameters_ = {};
};


/**
 * Sets a grammar parameter.
 * @param {string} parameter The parameter name.
 * @param {boolean|string} value The parameter's value.
 */
sre.Grammar.prototype.setParameter = function(parameter, value) {
  value ? this.parameters_[parameter] = value :
    delete this.parameters_[parameter];
};


/**
 * Returns a grammar parameter if it exists.
 * @param {string} parameter The parameter name.
 * @return {boolean|string} The parameter's value.
 */
sre.Grammar.prototype.getParameter = function(parameter) {
  return this.parameters_[parameter];
};


/**
 * Sets a grammar correction.
 * @param {string} correction The correction name.
 * @param {Function} func The correction function.
 */
sre.Grammar.prototype.setCorrection = function(correction, func) {
  this.corrections_[correction] = func;
};


/**
 * Returns a grammar correction function if it exists.
 * @param {string} correction The grammar annotation.
 * @return {Function} The correction function.
 */
sre.Grammar.prototype.getCorrection = function(correction) {
  return this.corrections_[correction];
};


/**
 * @return {!string} A string version of the grammatical state.
 */
sre.Grammar.prototype.getState = function() {
  var pairs = [];
  for (var key in this.parameters_) {
    var value = this.parameters_[key];
    pairs.push(typeof value === 'string' ? key + ':' + value : key);
  }
  return pairs.join(' ');
};


/**
 * Adds grammatical annotations to an XML node.
 * @param {Node} node Adds a grammar value to the node.
 * @param {string} annotation The grammatical annotation.
 * @param {string|boolean} value The annotation value.
 */
sre.Grammar.prototype.addGrammar = function(node, annotation, value) {
  var grammar = node.getAttribute(sre.Grammar.ATTRIBUTE) || '';
  var attr = typeof value === 'string' ? annotation + ':' + value : annotation;
  if (!grammar.match(RegExp(' ' + attr))) {
    node.setAttribute(sre.Grammar.ATTRIBUTE, grammar + ' ' + attr);
  }
};


sre.Grammar.prototype.removeGrammar = function(node, annotation, value) {
  var grammar = node.getAttribute(sre.Grammar.ATTRIBUTE) || '';
  var attr = typeof value === 'string' ? annotation + ':' + value : annotation;
  var match = grammar.match(RegExp(' ' + attr));
  if (match) {
    grammar = grammar.slice(0, match.index) +
      grammar.slice(match.index + attr.length + 1);
    grammar ? node.setAttribute(sre.Grammar.ATTRIBUTE, grammar) :
      node.removeAttribute(sre.Grammar.ATTRIBUTE);
  }
};



/**
 * Applies a grammatical corrections to a given description text.
 * @param {string} state The saved state of the grammar.
 * @param {string} text The original description text.
 * @return {string} The grammatically corrected string.
 */
sre.Grammar.prototype.processCorrections = function(state, text) {
  var corrections = state.split(' ');
  for (var i = 0, l = corrections.length; i < l; i++) {
    var corr = corrections[i].split(':');
    var key = corr[0];
    var func = this.getCorrection(key);
    if (!func) {
      continue;
    }
    var value = corr[1];
    text = value ? func(text, value) : func(text);
  }
  return text;
};


// The following is temporary!
//
/**
 * Applies a corrective string to the given description text.
 * @param {string} text The original description text.
 * @param {string} correction The correction string to be applied.
 * @return {string} The cleaned up string.
 * @private
 */
sre.Grammar.processCorrections_ = function(text, correction) {
  if (!correction || !text) {
    return text;
  }
  var correctionComp = correction.split(/ |-/);
  var regExp = new RegExp('^' + correctionComp.join('( |-)') + '( |-)');
  return text.replace(regExp, '');
};

sre.Grammar.getInstance().setCorrection('remove', sre.Grammar.processCorrections_);



