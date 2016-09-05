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
 * @fileoverview Base class for all speech rule stores.
 *
 * The base rule store implements some basic functionality that is common to
 * most speech rule stores.
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.BaseRuleStore');

goog.require('sre.BaseUtil');
goog.require('sre.Debugger');
goog.require('sre.DomUtil');
goog.require('sre.Engine');
goog.require('sre.SpeechRule');
goog.require('sre.SpeechRuleEvaluator');
goog.require('sre.SpeechRuleFunctions');
goog.require('sre.SpeechRuleStore');
goog.require('sre.XpathUtil');



/**
 * @constructor
 * @implements {sre.SpeechRuleEvaluator}
 * @implements {sre.SpeechRuleStore}
 */
sre.BaseRuleStore = function() {
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

  //TODO: (MOSS) WP 1.3:
  // Replace by dedicated trie data structure.
  //
  /**
   * Set of speech rules in the store.
   * @type {!Array.<sre.SpeechRule>}
   * @private
   */
  this.speechRules_ = [];

  /**
   * A priority list of dynamic constraint attributes.
   * @type {!Array.<sre.SpeechRule.DynamicCstrAttrib>}
   */
  this.dynamicCstrAttribs = [sre.SpeechRule.DynamicCstrAttrib.STYLE];

  /**
   * List of TTS properties overridden by the store when it is active.
   * @type {!Array.<string>}
   */
  this.defaultTtsProps = [];
};


//TODO: (MOSS) WP 1.3:
// Replace library methods by trie indexing.
//
/**
 * @override
 */
sre.BaseRuleStore.prototype.lookupRule = function(node, dynamic) {
  if (!node ||
      (node.nodeType != sre.DomUtil.NodeType.ELEMENT_NODE &&
       node.nodeType != sre.DomUtil.NodeType.TEXT_NODE)) {
    return null;
  }
  var matchingRules = this.speechRules_.filter(
      goog.bind(
          function(rule) {
            return this.testDynamicConstraints(dynamic, rule) &&
                this.testPrecondition_(/** @type {!Node} */ (node), rule);},
          this));
  return (matchingRules.length > 0) ?
      this.pickMostConstraint_(dynamic, matchingRules) : null;
};


/**
 * @override
 */
sre.BaseRuleStore.prototype.defineRule = function(
    name, dynamic, action, prec, cstr) {
  try {
    var postc = sre.SpeechRule.Action.fromString(action);
    var cstrList = Array.prototype.slice.call(arguments, 4);
    var fullPrec = new sre.SpeechRule.Precondition(prec, cstrList);
    var dynamicCstr = {};
    dynamicCstr[sre.SpeechRule.DynamicCstrAttrib.STYLE] = dynamic;
    var rule = new sre.SpeechRule(name, dynamicCstr, fullPrec, postc);
  } catch (err) {
    if (err.name == 'RuleError') {
      console.log('Rule Error ', prec, '(' + dynamic + '):', err.message);
      return null;
    }
    else {
      throw err;
    }
  }
  this.addRule(rule);
  return rule;
};


/**
 * @override
 */
sre.BaseRuleStore.prototype.addRule = function(rule) {
  this.speechRules_.unshift(rule);
};


/**
 * @override
 */
sre.BaseRuleStore.prototype.deleteRule = function(rule) {
  var index = this.speechRules_.indexOf(rule);
  if (index != -1) {
    this.speechRules_.splice(index, 1);
  }
};


/**
 * @override
 */
sre.BaseRuleStore.prototype.findRule = function(pred) {
  for (var i = 0, rule; rule = this.speechRules_[i]; i++) {
    if (pred(rule)) {
      return rule;
    }
  }
  return null;
};


/**
 * @override
 */
sre.BaseRuleStore.prototype.findAllRules = function(pred) {
  return this.speechRules_.filter(pred);
};


/**
 * @override
 */
sre.BaseRuleStore.prototype.evaluateDefault = function(node) {
  return [new sre.AuditoryDescription({'text': node.textContent})];
};


/**
 * Test the applicability of a speech rule in debugging mode.
 * @param {sre.SpeechRule} rule Rule to debug.
 * @param {!Node} node DOM node to test applicability of given rule.
 */
sre.BaseRuleStore.prototype.debugSpeechRule = function(rule, node) {
  var prec = rule.precondition;
  var queryResult = this.applyQuery(node, prec.query);
  sre.Debugger.getInstance().output(
      prec.query, queryResult ? queryResult.toString() : queryResult);
  prec.constraints.forEach(
      goog.bind(function(cstr) {
        sre.Debugger.getInstance().output(
            cstr, this.applyConstraint(node, cstr));},
      this));
};


/**
 * Function to initialize the store with speech rules. It is called by the
 * speech rule engine upon parametrization with this store. The function allows
 * us to define sets of rules in separate files while depending on functionality
 * that is defined in the rule store.
 * Essentially it is a way of getting around dependencies.
 */
sre.BaseRuleStore.prototype.initialize = goog.abstractMethod;


/**
 * Removes duplicates of the given rule from the rule store. Thereby duplicates
 * are identified by having the same precondition and dynamic constraint.
 * @param {sre.SpeechRule} rule The rule.
 */
sre.BaseRuleStore.prototype.removeDuplicates = function(rule) {
  for (var i = this.speechRules_.length - 1, oldRule;
       oldRule = this.speechRules_[i]; i--) {
    if (oldRule != rule &&
        sre.BaseRuleStore.compareDynamicConstraints_(
        oldRule.dynamicCstr, rule.dynamicCstr) &&
        sre.BaseRuleStore.comparePreconditions_(oldRule, rule)) {
      this.speechRules_.splice(i, 1);
    }
  }
};


// TODO (sorge) These should move into the speech rule functions.
/**
 * Checks if we have a custom query and applies it. Otherwise returns null.
 * @param {!Node} node The initial node.
 * @param {string} funcName A function name.
 * @return {Array.<Node>} The list of resulting nodes.
 */
sre.BaseRuleStore.prototype.applyCustomQuery = function(
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
sre.BaseRuleStore.prototype.applySelector = function(node, expr) {
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
sre.BaseRuleStore.prototype.applyQuery = function(node, expr) {
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
sre.BaseRuleStore.prototype.applyConstraint = function(node, expr) {
  var result = this.applyQuery(node, expr);
  return !!result || sre.XpathUtil.evaluateBoolean(expr, node);
};


//TODO: (MOSS) WP 1.2:
// Replace by flexible and customisable rule ordering.
//
/**
 * Tests whether a speech rule satisfies a set of dynamic constraints.  Unless
 * the engine is in strict mode, the dynamic constraints can be "relaxed", that
 * is, a default value can also be choosen.
 * @param {!sre.SpeechRule.DynamicCstr} dynamic Dynamic constraints.
 * @param {sre.SpeechRule} rule The rule.
 * @return {boolean} True if the preconditions apply to the node.
 * @protected
 */
sre.BaseRuleStore.prototype.testDynamicConstraints = function(
    dynamic, rule) {
  if (sre.Engine.getInstance().strict) {
    return this.equalDynamicConstraints(dynamic, rule);
  }
  // We allow a default value for each dynamic constraints attribute.
  // The idea is that when we can not find a speech rule matching the value for
  // a particular attribute in the dynamic constraint we choose the one that has
  // the value 'default'.
  var allKeys = /** @type {Array.<sre.SpeechRule.DynamicCstrAttrib>} */ (
      Object.keys(dynamic));
  return allKeys.every(
      function(key) {
        return dynamic[key] == rule.dynamicCstr[key] ||
            // TODO (sorge) Sort this out with a ordered list of constraints.
            rule.dynamicCstr[key] == 'short' ||
            rule.dynamicCstr[key] == 'default';
      });
};


/**
 * Tests whether a speech rule's dynamic constraint is equal to the given one.
 * This is the default behaviour if the engine is in strict mode.
 * @param {!sre.SpeechRule.DynamicCstr} dynamic Dynamic constraints.
 * @param {sre.SpeechRule} rule The rule.
 * @return {boolean} True if the preconditions apply to the node.
 * @protected
 */
sre.BaseRuleStore.prototype.equalDynamicConstraints = function(
    dynamic, rule) {
  var allKeys = /** @type {Array.<sre.SpeechRule.DynamicCstrAttrib>} */ (
      Object.keys(dynamic));
  return allKeys.every(
      function(key) {
        return dynamic[key] == rule.dynamicCstr[key];
      });
};


/**
 * Get a set of all dynamic constraint values.
 * @return {!Object.<sre.SpeechRule.DynamicCstrAttrib, Array.<string>>} The
 *     object with all annotations.
 */
sre.BaseRuleStore.prototype.getDynamicConstraintValues = function() {
  var result = {};
  for (var i = 0, rule; rule = this.speechRules_[i]; i++) {
    for (var key in rule.dynamicCstr) {
      var newKey = [rule.dynamicCstr[key]];
      if (result[key]) {
        result[key] = sre.BaseUtil.union(result[key], newKey);
      } else {
        result[key] = newKey;
      }
    }
  }
  return result;
};


/**
 * Counts how many dynamic constraint values match exactly in the order
 * specified by the store.
 * @param {sre.SpeechRule.DynamicCstr} dynamic Dynamic constraints.
 * @param {sre.SpeechRule} rule The speech rule to match.
 * @return {number} The number of matching dynamic constraint values.
 * @private
 */
sre.BaseRuleStore.prototype.countMatchingDynamicConstraintValues_ = function(
    dynamic, rule) {
  var result = 0;
  for (var i = 0, key; key = this.dynamicCstrAttribs[i]; i++) {
    if (dynamic[key] === rule.dynamicCstr[key]) {
      result++;
    } else break;
  }
  return result;
};


/**
 * Picks the result of the most constraint rule by prefering those:
 * 1) that best match the dynamic constraints.
 * 2) with the most additional constraints.
 * @param {sre.SpeechRule.DynamicCstr} dynamic Dynamic constraints.
 * @param {!Array.<sre.SpeechRule>} rules An array of rules.
 * @return {sre.SpeechRule} The most constraint rule.
 * @private
 */
sre.BaseRuleStore.prototype.pickMostConstraint_ = function(dynamic, rules) {
  rules.sort(goog.bind(
      function(r1, r2) {
        var count1 = this.countMatchingDynamicConstraintValues_(dynamic, r1);
        var count2 = this.countMatchingDynamicConstraintValues_(dynamic, r2);
        // Rule one is a better match, don't swap.
        if (count1 > count2) {
          return -1;
        }
        // Rule two is a better match, swap.
        if (count2 > count1) {
          return 1;
        }
        // When same number of dynamic constraint attributes matches for
        // both rules, compare length of static constraints.
        return (r2.precondition.constraints.length -
            r1.precondition.constraints.length);},
      this));
  sre.Debugger.getInstance().generateOutput(
      goog.bind(function() {
        return rules.map(function(x) {
          return x.name + '(' +
              sre.SpeechRule.stringifyCstr(x.dynamicCstr) + ')';});
      }, this)
  );
  return rules[0];
};


/**
 * Test the precondition of a speech rule.
 * @param {!Node} node on which to test applicability of the rule.
 * @param {sre.SpeechRule} rule The rule to be tested.
 * @return {boolean} True if the preconditions apply to the node.
 * @private
 */
sre.BaseRuleStore.prototype.testPrecondition_ = function(node, rule) {
  var prec = rule.precondition;
  var result = this.applyQuery(node, prec.query);
  return this.applyQuery(node, prec.query) === node &&
      prec.constraints.every(
          goog.bind(function(cstr) {
        return this.applyConstraint(node, cstr);},
      this));
};


// TODO (sorge) Define the following methods directly on the dynamic constraint
//     and precondition classes, respectively.
/**
 * Compares two dynamic constraints and returns true if they are equal.
 * @param {sre.SpeechRule.DynamicCstr} cstr1 First dynamic constraints.
 * @param {sre.SpeechRule.DynamicCstr} cstr2 Second dynamic constraints.
 * @return {boolean} True if the dynamic constraints are equal.
 * @private
 */
sre.BaseRuleStore.compareDynamicConstraints_ = function(
    cstr1, cstr2) {
  if (Object.keys(cstr1).length != Object.keys(cstr2).length) {
    return false;
  }
  for (var key in cstr1) {
    if (!cstr2[key] || cstr1[key] !== cstr2[key]) {
      return false;
    }
  }
  return true;
};


/**
 * Compares two static constraints (i.e., lists of precondition constraints) and
 * returns true if they are equal.
 * @param {Array.<string>} cstr1 First static constraints.
 * @param {Array.<string>} cstr2 Second static constraints.
 * @return {boolean} True if the static constraints are equal.
 * @private
 */
sre.BaseRuleStore.compareStaticConstraints_ = function(
    cstr1, cstr2) {
  if (cstr1.length != cstr2.length) {
    return false;
  }
  for (var i = 0, cstr; cstr = cstr1[i]; i++) {
    if (cstr2.indexOf(cstr) == -1) {
      return false;
    }
  }
  return true;
};


/**
 * Compares the preconditions of two speech rules.
 * @param {sre.SpeechRule} rule1 The first speech rule.
 * @param {sre.SpeechRule} rule2 The second speech rule.
 * @return {boolean} True if the preconditions are equal.
 * @private
 */
sre.BaseRuleStore.comparePreconditions_ = function(rule1, rule2) {
  var prec1 = rule1.precondition;
  var prec2 = rule2.precondition;
  if (prec1.query != prec2.query) {
    return false;
  }
  return sre.BaseRuleStore.compareStaticConstraints_(
      prec1.constraints, prec2.constraints);
};


/**
 * @return {!Array.<sre.SpeechRule>} Set of all speech rules in the store.
 */
sre.BaseRuleStore.prototype.getSpeechRules = function() {
  return this.speechRules_;
};


/**
 * Sets the speech rule set of the store.
 * @param {!Array.<sre.SpeechRule>} rules New rule set.
 */
sre.BaseRuleStore.prototype.setSpeechRules = function(rules) {
  this.speechRules_ = rules;
};
