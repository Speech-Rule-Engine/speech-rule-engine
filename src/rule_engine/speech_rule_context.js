// Copyright 2019 Volker Sorge
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
 * @fileoverview Context for custom functions of a speech rule.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

goog.provide('sre.SpeechRuleContext');

goog.require('sre.SpeechRuleFunctions');
goog.require('sre.XpathUtil');



/**
 * @constructor
 */
sre.SpeechRuleContext = function() {

  /**
   * Set of custom query functions for the store.
   * @type {sre.SpeechRuleFunctions.CustomQueries}
   */
  this.customQueries = new sre.SpeechRuleFunctions.CustomQueries();

  /**
   * Set of custom strings for the store.
   * @type {sre.SpeechRuleFunctions.CustomStrings}
   */
  this.customStrings = new sre.SpeechRuleFunctions.CustomStrings();

  /**
   * Set of context functions for the store.
   * @type {sre.SpeechRuleFunctions.ContextFunctions}
   */
  this.contextFunctions = new sre.SpeechRuleFunctions.ContextFunctions();

  /**
   * Set of custom generators for the store.
   * @type {sre.SpeechRuleFunctions.CustomGenerators}
   */
  this.customGenerators = new sre.SpeechRuleFunctions.CustomGenerators();

};


/**
 * Checks if we have a custom query and applies it. Otherwise returns null.
 * @param {!Node} node The initial node.
 * @param {string} funcName A function name.
 * @return {Array.<Node>} The list of resulting nodes.
 */
sre.SpeechRuleContext.prototype.applyCustomQuery = function(
    node, funcName) {
  var func = this.customQueries.lookup(funcName);
  return func ? func(node) : null;
};


/**
 * Applies either an Xpath selector or a custom query to the node
 * and returns the resulting node list.
 * @param {!Node} node The initial node.
 * @param {string} expr An Xpath expression string or a name of a custom
 *     query.
 * @return {Array.<Node>} The list of resulting nodes.
 */
sre.SpeechRuleContext.prototype.applySelector = function(node, expr) {
  var result = this.applyCustomQuery(node, expr);
  return result || sre.XpathUtil.evalXPath(expr, node);
};


/**
 * Applies either an Xpath selector or a custom query to the node
 * and returns the first result.
 * @param {!Node} node The initial node.
 * @param {string} expr An Xpath expression string or a name of a custom
 *     query.
 * @return {Node} The resulting node.
 */
sre.SpeechRuleContext.prototype.applyQuery = function(node, expr) {
  var results = this.applySelector(node, expr);
  if (results.length > 0) {
    return results[0];
  }
  return null;
};


/**
 * Applies either an Xpath selector or a custom query to the node and returns
 * true if the application yields a non-empty result.
 * @param {!Node} node The initial node.
 * @param {string} expr An Xpath expression string or a name of a custom
 *     query.
 * @return {boolean} True if application was successful.
 */
sre.SpeechRuleContext.prototype.applyConstraint = function(node, expr) {
  var result = this.applyQuery(node, expr);
  return !!result || sre.XpathUtil.evaluateBoolean(expr, node);
};


/**
 * Constructs a string from the node and the given expression.
 * @param {!Node} node The initial node.
 * @param {string} expr An Xpath expression string, a name of a custom
 *     function or a string.
 * @return {string} The result of applying expression to node.
 */
sre.SpeechRuleContext.prototype.constructString = function(node, expr) {
  if (!expr) {
    return '';
  }
  if (expr.charAt(0) == '"') {
    return expr.slice(1, -1);
  }
  var func = this.customStrings.lookup(expr);
  if (func) {
    // We always return the result of the custom function, in case it
    // deliberately computes the empty string!
    return func(node);
  }
  // Finally we assume expr to be an xpath expression and calculate a string
  // value from the node.
  return sre.XpathUtil.evaluateString(expr, node);
};


/**
 * Parses a list of context functions.
 * @param {!(Array.<Array.<string>> | Object.<string>)} functions The list of context
 *     function assignments.
 */
sre.SpeechRuleContext.prototype.parse = function(functions) {
  var functs = Array.isArray(functions) ? functions : Object.entries(functions);
  for (var i = 0, func; func = functs[i]; i++) {
    let kind = func[0].slice(0, 3);
    let map = {
      CQF: this.customQueries,
      CSF: this.customStrings,
      CTF: this.contextFunctions,
      CGF: this.customGenerators
    };
    let call = map[kind];
    if (call) {
      call.add(func[0], func[1]);
    } else {
      console.error('FunctionError: Invalid function name ' + func[0]);
    }
  }
};
