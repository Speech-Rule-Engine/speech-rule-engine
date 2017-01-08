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
// Supported by the Mozilla Foundation.

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

  /**
   * Maps grammatical annotations to preprocessor functions.
   * @type {Object.<string, Function>}
   * @private
   */
  this.preprocessors_ = {};

  /**
   * @type {Array.<Object.<string, string|boolean>>}
   * @private
   */
  this.stateStack_ = [];

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
  this.stateStack_ = [];
};


/**
 * Sets a grammar parameter.
 * @param {string} parameter The parameter name.
 * @param {boolean|string} value The parameter's value.
 * @return {boolean|string} The old value if it existed.
 * @private
 */
sre.Grammar.prototype.setParameter_ = function(parameter, value) {
  var oldValue = this.parameters_[parameter];
  value ? this.parameters_[parameter] = value :
      delete this.parameters_[parameter];
  return oldValue;
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
 * Sets a grammar preprocessor.
 * @param {string} preprocessor The preprocessor name.
 * @param {Function} func The preprocessor function.
 */
sre.Grammar.prototype.setPreprocessor = function(preprocessor, func) {
  this.preprocessors_[preprocessor] = func;
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
 * Saves the current state of the grammar object.
 * @param {Object.<string, string|boolean>} assignment A list of key value
 *     pairs.
 */
sre.Grammar.prototype.pushState = function(assignment) {
  for (var key in assignment) {
    assignment[key] = this.setParameter_(key, assignment[key]);
  }
  this.stateStack_.push(assignment);
};


/**
 * Saves the current state of the grammar object.
 */
sre.Grammar.prototype.popState = function() {
  var assignment = this.stateStack_.pop();
  for (var key in assignment) {
    this.setParameter_(key, assignment[key]);
  }
};


/**
 * Adds the grammatical state as attributed to an XML node.
 * @param {Node} node Adds a grammar value to the node.
 */
sre.Grammar.prototype.setAttribute = function(node) {
  if (node && node.nodeType === sre.DomUtil.NodeType.ELEMENT_NODE) {
    var state = this.getState();
    if (state) {
      node.setAttribute(sre.Grammar.ATTRIBUTE, state);
    }
  }
};


/**
 * Applies a grammatical corrections to a given description text.
 * @param {string} state The saved state of the grammar.
 * @param {string} text The original description text.
 * @return {string} The grammatically corrected string.
 */
sre.Grammar.prototype.runCorrections = function(state, text) {
  return this.runProcessors_(state, text, this.corrections_);
};


/**
 * Applies a grammatical preprocessors to a given description text.
 * @param {string} state The saved state of the grammar.
 * @param {string} text The original description text.
 * @return {string} The grammatically corrected string.
 */
sre.Grammar.prototype.runPreprocessors = function(state, text) {
  return this.runProcessors_(state, text, this.preprocessors_);
};


/**
 * Applies a grammatical processors to a given description text.
 * @param {string} state The saved state of the grammar.
 * @param {string} text The original description text.
 * @param {Object.<string, Function>} funcs Dictionary of processor functions.
 * @return {string} The grammatically corrected string.
 * @private
 */
sre.Grammar.prototype.runProcessors_ = function(state, text, funcs) {
  var corrections = state.split(' ');
  for (var i = 0, l = corrections.length; i < l; i++) {
    var corr = corrections[i].split(':');
    var key = corr[0];
    var func = funcs[key];
    if (!func) {
      continue;
    }
    var value = corr[1];
    text = value ? func(text, value) : func(text);
  }
  return text;
};


// TODO: The following is temporary and needs a better place.
//
/**
 * Applies a corrective string to the given description text.
 * @param {string} text The original description text.
 * @param {string} correction The correction string to be applied.
 * @return {string} The cleaned up string.
 * @private
 */
sre.Grammar.correctFont_ = function(text, correction) {
  if (!correction || !text) {
    return text;
  }
  var correctionComp = correction.split(/ |-/);
  var regExp = new RegExp('^' + correctionComp.join('( |-)') + '( |-)');
  return text.replace(regExp, '');
};


/**
 * Attaches an annotation to a description.
 * @param {string} text The original description text.
 * @param {string} annotation The annotation string to be applied.
 * @return {string} The cleaned up string.
 * @private
 */
sre.Grammar.addAnnotation_ = function(text, annotation) {
  return text + ':' + annotation;
};


sre.Grammar.getInstance().setCorrection('ignoreFont',
                                        sre.Grammar.correctFont_);
sre.Grammar.getInstance().setPreprocessor('annotation',
                                          sre.Grammar.addAnnotation_);
