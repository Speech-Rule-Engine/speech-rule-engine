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

goog.require('sre.Engine');



/**
 * @constructor
 */
sre.Grammar = function() {

  /**
   * Grammatical annotations that need to be propagated.
   * @type {Object.<string, sre.Grammar.Value>}
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
   * @type {Array.<Object.<string, sre.Grammar.Value>>}
   * @private
   */
  this.stateStack_ = [];

};
goog.addSingletonGetter(sre.Grammar);


/**
 * @typedef {boolean|string}
 */
sre.Grammar.Value;


/**
 * Defines grammar attribute for a component of a speech rule.
 * @typedef {!Object.<string, sre.Grammar.Value>}
 */
sre.Grammar.State;


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
 * @param {sre.Grammar.Value} value The parameter's value.
 * @return {sre.Grammar.Value} The old value if it existed.
 * @private
 */
sre.Grammar.prototype.setParameter_ = function(parameter, value) {
  var oldValue = this.parameters_[parameter];
  value ? this.parameters_[parameter] = value :
      delete this.parameters_[parameter];
  return oldValue;
};


/**
 * @return {sre.Grammar.Value} Value of a parameter if it exists.
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
 * @param {Object.<string, sre.Grammar.Value>} assignment A list of key value
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
 * @param {sre.Grammar.State} state The saved state of the grammar.
 * @param {string} text The original description text.
 * @return {string} The grammatically corrected string.
 */
sre.Grammar.prototype.runCorrections = function(state, text) {
  return this.runProcessors_(state, text, this.corrections_);
};


/**
 * Applies a grammatical preprocessors to a given description text.
 * @param {sre.Grammar.State} state The saved state of the grammar.
 * @param {string} text The original description text.
 * @return {string} The grammatically corrected string.
 */
sre.Grammar.prototype.runPreprocessors = function(state, text) {
  return this.runProcessors_(state, text, this.preprocessors_);
};


/**
 * Applies a grammatical processors to a given description text.
 * @param {sre.Grammar.State} state The saved state of the grammar.
 * @param {string} text The original description text.
 * @param {Object.<string, Function>} funcs Dictionary of processor functions.
 * @return {string} The grammatically corrected string.
 * @private
 */
sre.Grammar.prototype.runProcessors_ = function(state, text, funcs) {
  for (var key in state) {
    var func = funcs[key];
    if (!func) {
      continue;
    }
    var value = state[key];
    text = (value === true) ? func(text) : func(text, value);
  }
  return text;
};


/**
 * Process a math expression into a string suitable for a speech engine.
 * @param {string} text Text representing a math expression.
 * @return {string} The string with a spoken version of the math expression.
 * @private
 */
sre.Grammar.preprocessString_ = function(text) {
  // TODO (sorge) Find a proper treatment of single numbers.
  //
  // (MOSS) Do with grammar annotation for numbers in mathspeak or possibly in
  // the actual evaluation unit, when all WPs are combined.
  var engine = sre.Engine.getInstance();
  if (engine.domain == 'mathspeak' && text.match(/^\d{1}$/)) {
    return text;
  }
  var result = engine.evaluator(text, engine.dynamicCstr);
  return result || text;
};


//TODO: This could become a prototype method if we directly process before
//      saving the state!
/**
 * Preprocess the text of an auditory description if necessary.
 * @param {string} text The text string to be processed.
 * @param {string} stateStr The state of the grammar.
 * @param {boolean=} opt_preprocess The preprocessing flag.
 * @return {string} The transformed text.
 */
sre.Grammar.applyState = function(text, stateStr, opt_preprocess) {
  var state = sre.Grammar.readStateStr_(stateStr);
  text = sre.Grammar.getInstance().runPreprocessors(
      state, text);
  if (opt_preprocess) {
    text = sre.Grammar.preprocessString_(text);
  }
  text = sre.Grammar.getInstance().runCorrections(
     state, text);
  return text;
};


sre.Grammar.readStateStr_ = function(stateStr) {
  var state = {};
  var corrections = stateStr.split(' ');
  for (var i = 0, l = corrections.length; i < l; i++) {
    var corr = corrections[i].split(':');
    var key = corr[0];
    var value = corr[1];
    state[key] = value ? value : true;
  }
  return state;
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
