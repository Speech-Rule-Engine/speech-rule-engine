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
   * @type {!sre.Grammar.State}
   * @private
   */
  this.parameters_ = {};

  /**
   * Maps grammatical annotations to correction functions.
   * @type {Object.<Function>}
   * @private
   */
  this.corrections_ = {};

  /**
   * Maps grammatical annotations to preprocessor functions.
   * @type {Object.<Function>}
   * @private
   */
  this.preprocessors_ = {};

  /**
   * @type {Array.<Object.<sre.Grammar.Value>>}
   * @private
   */
  this.stateStack_ = [];

  /**
   * Current processing flags of the grammar. This is only filled during
   * application of grammatical structures to an input text.
   * @type {{adjust: (undefined|boolean),
   *         preprocess: (undefined|boolean),
   *         correct: (undefined|boolean),
   *         translate: (undefined|boolean)}}
   */
  this.currentFlags = {};

};
goog.addSingletonGetter(sre.Grammar);


/**
 * @typedef {boolean|string}
 */
sre.Grammar.Value;


/**
 * Defines grammar attribute for a component of a speech rule.
 * @typedef {!Object.<sre.Grammar.Value>}
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
 */
sre.Grammar.prototype.setParameter = function(parameter, value) {
  var oldValue = this.parameters_[parameter];
  value ? this.parameters_[parameter] = value :
      delete this.parameters_[parameter];
  return oldValue;
};


/**
 * Returns the value for a parameter.
 * @param {string} parameter The parameter name.
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
 * @return {string} A string version of the grammatical state.
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
 * @param {Object.<sre.Grammar.Value>} assignment A list of key value
 *     pairs.
 */
sre.Grammar.prototype.pushState = function(assignment) {
  for (var key in assignment) {
    assignment[key] = this.setParameter(key, assignment[key]);
  }
  this.stateStack_.push(assignment);
};


/**
 * Saves the current state of the grammar object.
 */
sre.Grammar.prototype.popState = function() {
  var assignment = this.stateStack_.pop();
  for (var key in assignment) {
    this.setParameter(key, assignment[key]);
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
 * Applies a grammatical preprocessors to a given description text.
 * @param {string} text The original description text.
 * @return {string} The grammatically corrected string.
 */
sre.Grammar.prototype.preprocess = function(text) {
  return this.runProcessors_(text, this.preprocessors_);
};


/**
 * Applies a grammatical corrections to a given description text.
 * @param {string} text The original description text.
 * @return {string} The grammatically corrected string.
 */
sre.Grammar.prototype.correct = function(text) {
  return this.runProcessors_(text, this.corrections_);
};


/**
 * Applies a grammatical processors to a given description text.
 * @param {string} text The original description text.
 * @param {Object.<Function>} funcs Dictionary of processor functions.
 * @return {string} The grammatically corrected string.
 * @private
 */
sre.Grammar.prototype.runProcessors_ = function(text, funcs) {
  for (var key in this.parameters_) {
    var func = funcs[key];
    if (!func) {
      continue;
    }
    var value = this.parameters_[key];
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
sre.Grammar.translateString_ = function(text) {
  var engine = sre.Engine.getInstance();
  var result = engine.evaluator(text, engine.dynamicCstr) || text;
  return sre.Grammar.cleanUnit_(result);
};


/**
 * Removes unit suffix in case no unit with this name was found.
 * @param {string} text The text.
 * @return {string} The cleaned text incase it contained the :unit suffix.
 */
sre.Grammar.cleanUnit_ =  function(text) {
  console.log(text);
  if (text.match(/:unit$/)) {
    return text.replace(/:unit$/, '');
  }
  return text;
};


/**
 * Apply grammatical adjustments of the current state to a text string.
 * @param {string} text The text string to be processed.
 * @param {{adjust: (undefined|boolean),
 *          preprocess: (undefined|boolean),
 *          correct: (undefined|boolean),
 *          translate: (undefined|boolean)}=} opt_flags Flags indicating
 *     what adjustments should be carried out.
 *
 * Description of flags:
 * adjust: All grammar adjustments are performed.
 * preprocess: Only grammar preprocessing is performed.
 * correct: Only grammar corrections are performed.
 * translate: Text element is translated with math mappings.
 *
 * @return {string} The transformed text.
 */
sre.Grammar.prototype.apply = function(text, opt_flags) {
  this.currentFlags = opt_flags || {};
  text = (this.currentFlags.adjust || this.currentFlags.preprocess) ?
      sre.Grammar.getInstance().preprocess(text) :
      text;
  if (this.parameters_['translate'] || this.currentFlags.translate) {
    text = sre.Grammar.translateString_(text);
  }
  text = (this.currentFlags.adjust || this.currentFlags.correct) ?
      sre.Grammar.getInstance().correct(text) :
      text;
  this.currentFlags = {};
  return text;
};


/**
 * Parses a state string that can be passed to the grammar.
 * @param {string} stateStr The state string for the grammar.
 * @return {sre.Grammar.State} The grammar structure.
 */
sre.Grammar.parseState = function(stateStr) {
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


/**
 * Processes the grammar annotations of a rule.
 * @param {string} grammar The grammar annotations.
 * @return {sre.Grammar.State} The grammar structure.
 */
sre.Grammar.parseInput = function(grammar) {
  var attributes = {};
  var components = grammar.split(':');
  for (var i = 0, l = components.length; i < l; i++) {
    var comp = components[i].split('=');
    var key = comp[0].trim();
    if (comp[1]) {
      attributes[key] = comp[1].trim();
      continue;
    }
    key.match(/^!/) ? attributes[key.slice(1)] = false : attributes[key] = true;
  }
  return attributes;
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
  correction =
      sre.Messages.MS_FUNC.FONT_REGEXP(sre.Locale.localFont(correction));
  return text.replace(correction, '');
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


// TODO: Check if that is still necessary!
/**
 * Method switches of translation of text elements if they match the regexp of
 * locale.
 * @param {string} text The text.
 * @return {string} The untranslated text.
 * @private
 */
sre.Grammar.noTranslateText_ = function(text) {
  if (text.match(new RegExp('^[' + sre.Messages.REGEXP.TEXT + ']+$'))) {
    sre.Grammar.getInstance().currentFlags['translate'] = false;
  }
  return text;
};


sre.Grammar.getInstance().setCorrection('ignoreFont',
                                        sre.Grammar.correctFont_);
sre.Grammar.getInstance().setPreprocessor('annotation',
                                          sre.Grammar.addAnnotation_);
sre.Grammar.getInstance().setPreprocessor('noTranslateText',
                                          sre.Grammar.noTranslateText_);
sre.Grammar.getInstance().setCorrection('ignoreCaps',
                                        sre.Grammar.correctFont_);
