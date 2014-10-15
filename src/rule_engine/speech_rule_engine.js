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
 * @fileoverview Implementation of the speech rule engine.
 *
 * The speech rule engine chooses and applies speech rules. Rules are chosen
 * from a set of rule stores wrt. their applicability to a node in a particular
 * markup type such as MathML or HTML. Rules are dispatched either by
 * recursively computing new nodes and applicable rules or, if no further rule
 * is applicable to a current node, by computing a speech object in the form of
 * an array of auditory descriptions.
 *
 * Consequently the rule engine is parameterizable wrt. rule stores and
 * evaluator function.
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.SpeechRuleEngine');

goog.require('sre.AuditoryDescription');
goog.require('sre.BaseRuleStore');
goog.require('sre.Debugger');
goog.require('sre.Engine');
goog.require('sre.SpeechRule');
goog.require('sre.XpathUtil');



/**
 * @constructor
 */
sre.SpeechRuleEngine = function() {
  /**
   * The currently active speech rule store.
   * @type {sre.BaseRuleStore}
   * @private
   */
  this.activeStore_ = null;

  /**
   * Dynamic constraint annotation.
   * @type {!sre.SpeechRule.DynamicCstr}
   */
  this.dynamicCstr = {};
  this.dynamicCstr[sre.SpeechRule.DynamicCstrAttrib.STYLE] = 'short';

  /**
   * Object holding global parameters that can be set by the stores.
   * @type {Object.<string, string>}
   * @private
   */
  this.globalParameters_ = {};
};
goog.addSingletonGetter(sre.SpeechRuleEngine);


/**
 * Sets a global parameter in the speech rule engine's store.
 * @param {string} parameter The parameter name.
 * @param {string} value The parameter's value.
 */
sre.SpeechRuleEngine.prototype.setGlobalParameter = function(parameter, value) {
  this.globalParameters_[parameter] = value;
};


/**
 * Returns the a global parameter if it exists.
 * @param {string} parameter The parameter name.
 * @return {string} The parameter's value.
 */
sre.SpeechRuleEngine.prototype.getGlobalParameter = function(parameter) {
  return this.globalParameters_[parameter];
};


/**
 * Parameterizes the speech rule engine.
 * @param {sre.BaseRuleStore} store A speech rule store.
 */
sre.SpeechRuleEngine.prototype.parameterize = function(store) {
  try {
    store.initialize();
  } catch (err) {
    if (err.name == 'StoreError') {
      console.log('Store Error:', err.message);
    }
    else {
      throw err;
    }
  }
  this.activeStore_ = store;
};


/**
 * Parameterizes the dynamic constraint annotation for the speech rule
 * engine. This is a separate function as this can be done interactively, while
 * a particular speech rule store is active.
 * @param {sre.SpeechRule.DynamicCstr} dynamic The new dynamic constraint.
 */
sre.SpeechRuleEngine.prototype.setDynamicConstraint = function(dynamic) {
  if (dynamic) {
    this.dynamicCstr = dynamic;
  }
};


/**
 * Constructs a string from the node and the given expression.
 * @param {!Node} node The initial node.
 * @param {string} expr An Xpath expression string, a name of a custom
 *     function or a string.
 * @return {string} The result of applying expression to node.
 */
sre.SpeechRuleEngine.prototype.constructString = function(node, expr) {
  if (!expr) {
    return '';
  }
  if (expr.charAt(0) == '"') {
    return expr.slice(1, -1);
  }
  var func = this.activeStore_.customStrings.lookup(expr);
  if (func) {
    // We always return the result of the custom function, in case it
    // deliberately computes the empty string!
    return func(node);
  }
  // Finally we assume expr to be an xpath expression and calculate a string
  // value from the node.
  return sre.XpathUtil.evaluateString(expr, node);
};


// Dispatch functionality.
/**
 * Computes a speech object for a given node. Returns the empty list if
 * no node is given.
 * @param {Node} node The node to be evaluated.
 * @return {!Array.<sre.AuditoryDescription>} A list of auditory descriptions
 *   for that node.
 */
sre.SpeechRuleEngine.prototype.evaluateNode = function(node) {
  if (!node) {
    return [];
  }
  return this.evaluateTree_(node);
};


/**
 * Applies rules recursively to compute the final speech object.
 * @param {!Node} node Node to apply the speech rule to.
 * @return {!Array.<sre.AuditoryDescription>} A list of Auditory descriptions.
 * @private
 */
sre.SpeechRuleEngine.prototype.evaluateTree_ = function(node) {
  var rule = this.activeStore_.lookupRule(node, this.dynamicCstr);
  if (!rule) {
    return this.activeStore_.evaluateDefault(node);
  }
  sre.Debugger.getInstance().generateOutput(
      goog.bind(function() {
        return [rule.name,
                sre.SpeechRule.stringifyCstr(rule.dynamicCstr),
                node.toString()];},
      this));
  var components = rule.action.components;
  var result = [];
  for (var i = 0, component; component = components[i]; i++) {
    var descrs = [];
    var content = component['content'] || '';
    switch (component.type) {
      case sre.SpeechRule.Type.NODE:
        var selected = this.activeStore_.applyQuery(node, content);
        if (selected) {
          descrs = this.evaluateTree_(selected);
        }
        break;
      case sre.SpeechRule.Type.MULTI:
        selected = this.activeStore_.applySelector(node, content);
        if (selected.length > 0) {
          descrs = this.evaluateNodeList_(
              selected,
              component['sepFunc'],
              this.constructString(node, component['separator']),
              component['ctxtFunc'],
              this.constructString(node, component['context']));
        }
        break;
      case sre.SpeechRule.Type.TEXT:
        selected = this.constructString(node, content);
        if (selected) {
          descrs = [new sre.AuditoryDescription({text: selected})];
        }
        break;
      case sre.SpeechRule.Type.PERSONALITY:
      default:
        descrs = [new sre.AuditoryDescription({text: content})];
    }
    // Adding overall context and annotation if they exist.
    if (descrs[0] && component.type != sre.SpeechRule.Type.MULTI) {
      if (component['context']) {
        descrs[0]['context'] =
          this.constructString(node, component['context']) +
              (descrs[0]['context'] || '');
      }
      if (component['annotation']) {
        descrs[0]['annotation'] = component['annotation'];
      }
    }
    // Adding personality to the auditory descriptions.
    result = result.concat(this.addPersonality_(descrs, component));
  }
  return result;
};


/**
 * Evaluates a list of nodes into a list of auditory descriptions.
 * @param {!Array.<Node>} nodes Array of nodes.
 * @param {string} sepFunc Name of a function used to compute a separator
 *     between every element.
 * @param {string} separator A string that is used as argument to the sepFunc or
 *     interspersed directly between each node if sepFunc is not supplied.
 * @param {string} ctxtFunc Name of a function applied to compute the context
 *     for every element in the list.
 * @param {string} context Additional context string that is given to the
 *     ctxtFunc function or used directly if ctxtFunc is not supplied.
 * @return {Array.<sre.AuditoryDescription>} A list of Auditory descriptions.
 * @private
 */
sre.SpeechRuleEngine.prototype.evaluateNodeList_ = function(
    nodes, sepFunc, separator, ctxtFunc, context) {
  if (nodes == []) {
    return [];
  }
  var sep = separator || '';
  var cont = context || '';
  var cFunc = this.activeStore_.contextFunctions.lookup(ctxtFunc);
  var ctxtClosure = cFunc ? cFunc(nodes, cont) : function() {return cont;};
  var sFunc = this.activeStore_.contextFunctions.lookup(sepFunc);
  var sepClosure = sFunc ? sFunc(nodes, sep) : function() {return sep;};
  var result = [];
  for (var i = 0, node; node = nodes[i]; i++) {
    var descrs = this.evaluateTree_(node);
    if (descrs.length > 0) {
      descrs[0]['context'] = ctxtClosure() + (descrs[0]['context'] || '');
      result = result.concat(descrs);
      if (i < nodes.length - 1) {
        var text = sepClosure();
        if (text) {
          result.push(new sre.AuditoryDescription({text: text,
            preprocess: true}));
        }
      }
    }
  }
  return result;
};


/**
 * Adds personality to every Auditory Descriptions in input list.
 * @param {Array.<sre.AuditoryDescription>} descrs A list of Auditory
 *     descriptions.
 * @param {Object} props Property dictionary.
 * TODO (sorge) Fully specify, when we have finalised the speech rule
 * format.
 * @return {Array.<sre.AuditoryDescription>} The modified array.
 * @private
 */
sre.SpeechRuleEngine.prototype.addPersonality_ = function(descrs, props) {
  var personality = {};
  for (var key in sre.Engine.personalityProps) {
    var value = parseFloat(props[sre.Engine.personalityProps[key]]);
    if (!isNaN(value)) {
      personality[key] = value;
    }
  }
  descrs.forEach(goog.bind(function(descr) {
    this.addRelativePersonality_(descr, personality);
  }, this));
  return descrs;
};


/**
 * Adds relative personality entries to the personality of a Auditory
 * Description.
 * @param {sre.AuditoryDescription} descr Auditory Description.
 * @param {!Object} personality Dictionary with relative personality entries.
 * @return {sre.AuditoryDescription} Updated description.
 * @private
 */
sre.SpeechRuleEngine.prototype.addRelativePersonality_ = function(
    descr, personality) {
  if (!descr['personality']) {
    descr['personality'] = personality;
    return descr;
  }
  var descrPersonality = descr['personality'];
  for (var p in personality) {
    // This could be capped by some upper and lower bound.
    if (descrPersonality[p] && typeof(descrPersonality[p]) == 'number') {
      descrPersonality[p] = descrPersonality[p] + personality[p];
    } else {
      descrPersonality[p] = personality[p];
    }
  }
  return descr;
};


/**
 * Prints the list of all current rules in ChromeVox to the console.
 * @return {string} A textual representation of all rules in the speech rule
 *     engine.
 */
sre.SpeechRuleEngine.prototype.toString = function() {
  var allRules = this.activeStore_.findAllRules(function(x) {return true;});
  return allRules.map(function(rule) {return rule.toString();}).
      join('\n');
};


/**
 * Test the precondition of a speech rule in debugging mode.
 * @param {sre.SpeechRule} rule A speech rule.
 * @param {!Node} node DOM node to test applicability of the rule.
 */
sre.SpeechRuleEngine.debugSpeechRule = function(rule, node) {
  var store = sre.SpeechRuleEngine.getInstance().activeStore_;
  if (store) {
    store.debugSpeechRule(rule, node);
  }
};


/**
 * Test the precondition of a speech rule in debugging mode.
 * @param {string} name Rule to debug.
 * @param {!Node} node DOM node to test applicability of the rule.
 */
sre.SpeechRuleEngine.debugNamedSpeechRule = function(name, node) {
  var store = sre.SpeechRuleEngine.getInstance().activeStore_;
  if (store) {
    var allRules = store.findAllRules(
      function(rule) {return rule.name == name;});
    for (var i = 0, rule; rule = allRules[i]; i++) {
      sre.Debugger.getInstance().output('Rule', name, 'number', i);
      store.debugSpeechRule(rule, node);
    }
  }
};
