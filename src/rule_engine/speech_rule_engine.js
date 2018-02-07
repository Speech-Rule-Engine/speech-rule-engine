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
goog.require('sre.BaseUtil');
goog.require('sre.Debugger');
goog.require('sre.DynamicCstr');
goog.require('sre.Engine');
goog.require('sre.MathMap');
goog.require('sre.MathStore');
goog.require('sre.SpeechRule');
goog.require('sre.SpeechRuleStores');
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
   * Caches speech strings by node id.
   * @type {Object.<!Array.<sre.AuditoryDescription>>}
   * @private
   */
  this.cache_ = {};

  /**
   * Flag indicating if the engine is ready. Not ready while it is updating!
   * @type {boolean}
   * @private
   */
  this.ready_ = true;

  /**
   * Caches combined stores that have already been constructed.
   * @type {Object.<sre.BaseRuleStore>}
   * @private
   */
  this.combinedStores_ = {};

  sre.Engine.registerTest(
      goog.bind(function(x) {return this.ready_;}, this));

};
goog.addSingletonGetter(sre.SpeechRuleEngine);


/**
 * Parameterizes the speech rule engine.
 * @param {!Array.<string>} ruleSetNames The name of rule sets to use.
 */
sre.SpeechRuleEngine.prototype.parameterize = function(ruleSetNames) {
  var ruleSets = {};
  for (var i = 0, m = ruleSetNames.length; i < m; i++) {
    var name = ruleSetNames[i];
    var set = sre.SpeechRuleStores.getConstructor(name);
    if (set && set.getInstance) {
      ruleSets[name] = set.getInstance();
    }
  }
  this.parameterize_(ruleSets);
};


/**
 * Parameterizes the speech rule engine.
 * @param {!Object.<sre.BaseRuleStore>} ruleSets A list of rule sets to use as
 *     name to constructor mapping.
 * @private
 */
sre.SpeechRuleEngine.prototype.parameterize_ = function(ruleSets) {
  try {
    this.activeStore_ = this.combineStores_(ruleSets);
  } catch (err) {
    if (err.name == 'StoreError') {
      console.log('Store Error:', err.message);
    }
    else {
      throw err;
    }
  }
  this.updateEngine();
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


/**
 * Clears the cache.
 */
sre.SpeechRuleEngine.prototype.clearCache = function() {
  this.cache_ = {};
};


/**
 * An iterator over the cache elements.
 * @param {function(string, !Array.<sre.AuditoryDescription>)} iter
 *     The iterator function.
 */
sre.SpeechRuleEngine.prototype.forCache = function(iter) {
  for (var key in this.cache_) {
    iter(key, this.cache_[key]);
  }
};


/**
 * Retrieves a cached value for a particular element.
 * @param {Node} node The element to lookup.
 * @return {Array.<sre.AuditoryDescription>} The cached value if it exists.
 * @private
 */
sre.SpeechRuleEngine.prototype.getCacheForNode_ = function(node) {
  if (!node || !node.getAttribute) return null;
  var key = node.getAttribute('id');
  if (key === 'undefined' || key === '') return null;
  return this.getCache(key);
};


/**
 * Retrieves a cached value by key.
 * @param {string} key The node id.
 * @return {!Array.<sre.AuditoryDescription>} A list of auditory descriptions.
 */
sre.SpeechRuleEngine.prototype.getCache = function(key) {
  var descr = this.cache_[key];
  return descr ? this.cloneCache(descr) : descr;
};


/**
 * Clones a list of auditory descriptions to insulate cache from changes.
 * @param {!Array.<sre.AuditoryDescription>} descrs List of descriptions.
 * @return {!Array.<sre.AuditoryDescription>} The cloned list.
 */
sre.SpeechRuleEngine.prototype.cloneCache = function(descrs) {
  return descrs.map(function(x) {return x.clone();});
};


/**
 * Caches speech for a particular node.
 * @param {!Node} node The node to cache speech for.
 * @param {!Array.<sre.AuditoryDescription>} speech A list of auditory
 *     descriptions.
 * @private
 */
sre.SpeechRuleEngine.prototype.pushCache_ = function(node, speech) {
  if (!sre.Engine.getInstance().cache || !node.getAttribute) return;
  var id = node.getAttribute('id');
  if (id) {
    this.cache_[id] = this.cloneCache(speech);
  }
};


// Dispatch functionality.
// The timing function is temporary until the MOSS deliverable is done.
/**
 * Computes a speech object for a given node. Returns the empty list if
 * no node is given.
 * @param {Node} node The node to be evaluated.
 * @return {!Array.<sre.AuditoryDescription>} A list of auditory descriptions
 *   for that node.
 */
sre.SpeechRuleEngine.prototype.evaluateNode = function(node) {
  var timeIn = (new Date()).getTime();
  var result = this.evaluateNode_(node);
  var timeOut = (new Date()).getTime();
  sre.Debugger.getInstance().output('Time:', timeOut - timeIn);
  return result;
};


/**
 * Computes a speech object for a given node. Returns the empty list if
 * no node is given.
 * @param {Node} node The node to be evaluated.
 * @return {!Array.<sre.AuditoryDescription>} A list of auditory descriptions
 *   for that node.
 * @private
 */
sre.SpeechRuleEngine.prototype.evaluateNode_ = function(node) {
  if (!node) {
    return [];
  }
  // Update the preferences of the dynamic constraint.
  this.updateConstraint_();
  return this.evaluateTree_(node);
};


/**
 * Applies rules recursively to compute the final speech object.
 * @param {!Node} node Node to apply the speech rule to.
 * @return {!Array.<sre.AuditoryDescription>} A list of Auditory descriptions.
 * @private
 */
sre.SpeechRuleEngine.prototype.evaluateTree_ = function(node) {
  var engine = sre.Engine.getInstance();
  if (engine.cache) {
    var result = this.getCacheForNode_(node);
    if (result) {
      return result;
    }
  }
  sre.Grammar.getInstance().setAttribute(node);
  var rule = this.activeStore_.lookupRule(node, engine.dynamicCstr);
  if (!rule) {
    if (engine.strict) return [];
    result = this.activeStore_.evaluateDefault(node);
    this.pushCache_(node, result);
    return result;
  }
  sre.Debugger.getInstance().generateOutput(
      goog.bind(function() {
        return [rule.name, rule.dynamicCstr.toString(), node.toString()];},
      this));
  var components = rule.action.components;
  result = [];
  for (var i = 0, component; component = components[i]; i++) {
    var descrs = [];
    var content = component.content || '';
    var attributes = component.attributes || {};
    if (component.grammar) {
      this.processGrammar(node, component.grammar);
    }
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
              attributes['sepFunc'],
              this.constructString(node, attributes['separator']),
              attributes['ctxtFunc'],
              this.constructString(node, attributes['context']));
        }
        break;
      case sre.SpeechRule.Type.TEXT:
        selected = this.constructString(node, content);
        if (selected) {
          descrs = [sre.AuditoryDescription.create(
              {text: selected}, {adjust: true})];
        }
        break;
      case sre.SpeechRule.Type.PERSONALITY:
      default:
        descrs = [sre.AuditoryDescription.create({text: content})];
    }
    // Adding overall context and annotation if they exist.
    if (descrs[0] && component.type != sre.SpeechRule.Type.MULTI) {
      if (attributes['context']) {
        descrs[0]['context'] =
            this.constructString(node, attributes['context']) +
            (descrs[0]['context'] || '');
      }
      if (attributes['annotation']) {
        descrs[0]['annotation'] = attributes['annotation'];
      }
    }
    if (component.grammar) {
      sre.Grammar.getInstance().popState();
    }
    // Adding personality to the auditory descriptions.
    result = result.concat(this.addPersonality_(descrs, attributes));
  }
  this.pushCache_(node, result);
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
  var sepClosure = sFunc ? sFunc(nodes, sep) :
      function() {return sre.AuditoryDescription.create(
      {text: sep}, {translate: true});};
  var result = [];
  for (var i = 0, node; node = nodes[i]; i++) {
    var descrs = this.evaluateTree_(node);
    if (descrs.length > 0) {
      descrs[0]['context'] = ctxtClosure() + (descrs[0]['context'] || '');
      result = result.concat(descrs);
      if (i < nodes.length - 1) {
        var text = sepClosure();
        result = result.concat(text);
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
 * @return {Array.<sre.AuditoryDescription>} The modified array.
 * @private
 */
sre.SpeechRuleEngine.prototype.addPersonality_ = function(descrs, props) {
  var personality = {};
  for (var key in sre.Engine.personalityProps) {
    var value = parseFloat(props[sre.Engine.personalityProps[key]]);
    if (!isNaN(value)) {
      personality[sre.Engine.personalityProps[key]] = value;
    }
  }
  for (var i = 0, descr; descr = descrs[i]; i++) {
    this.addRelativePersonality_(descr, personality);
  }
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
      sre.Debugger.getInstance().output(
          'Rule', name, 'DynamicCstr:',
          rule.dynamicCstr.toString(),
          'number', i);
      store.debugSpeechRule(rule, node);
    }
  }
};


/**
 * Runs a function in the temporary context of the speech rule engine.
 * @param {Object} settings The temporary settings for the speech rule
 *     engine. They can contain the usual features.
 * @param {function():!Array.<sre.AuditoryDescription>} callback The runnable
 *     function that computes speech results.
 * @return {!Array.<sre.AuditoryDescription>} The result of the callback.
 */
sre.SpeechRuleEngine.prototype.runInSetting = function(settings, callback) {
  var engine = sre.Engine.getInstance();
  var save = {};
  var store = null;
  for (var key in settings) {
    if (key === 'rules') {
      store = this.activeStore_;
      engine.ruleSets = settings[key];
      this.parameterize(engine.ruleSets);
      continue;
    }
    save[key] = engine[key];
    engine[key] = settings[key];
  }
  //TODO: This needs to be refactored as a message signal for the speech rule
  //      engine to update itself.
  engine.dynamicCstr = sre.DynamicCstr.create(
      engine.locale, engine.domain, engine.style);
  var result = callback();
  for (key in save) {
    engine[key] = save[key];
  }
  if (store) {
    this.activeStore_ = store;
  }
  engine.dynamicCstr = sre.DynamicCstr.create(
      engine.locale, engine.domain, engine.style);
  return result;
};


/**
 * Initializes the combined rule store
 * @param {!Object.<sre.BaseRuleStore>} ruleSets A list of rule sets to use as
 *     name to constructor mapping.
 * @return {!sre.BaseRuleStore} The combined math store.
 * @private
 */
sre.SpeechRuleEngine.prototype.combineStores_ = function(ruleSets) {
  var combined = this.cachedStore_(ruleSets);
  if (combined) {
    return combined;
  }
  combined = new sre.MathStore();
  for (var name in ruleSets) {
    var store = ruleSets[name];
    store.initialize();
    store.getSpeechRules().forEach(function(x) {combined.trie.addRule(x);});
    combined.contextFunctions.addStore(store.contextFunctions);
    combined.customQueries.addStore(store.customQueries);
    combined.customStrings.addStore(store.customStrings);
  }
  combined.setSpeechRules(combined.trie.collectRules());
  this.combinedStores_[this.combinedStoreName_(Object.keys(ruleSets))] =
      combined;
  return combined;
};


/**
 * Compute a standardized name for combined stores.
 * @param {!Array.<string>} names A list of individual store names.
 * @return {string} The combined name.
 * @private
 */
sre.SpeechRuleEngine.prototype.combinedStoreName_ = function(names) {
  return names.sort().join('-');
};


/**
 * Retrieves a cached combined store if it exists. If one of the individual
 * stores is not yet initialized or needs reinitialization, it also returns
 * null.
 * @param {!Object.<sre.BaseRuleStore>} ruleSets A list of rule sets to use as
 *     name to constructor mapping.
 * @return {?sre.BaseRuleStore} The combined store if it exists.
 * @private
 */
sre.SpeechRuleEngine.prototype.cachedStore_ = function(ruleSets) {
  var names = Object.keys(ruleSets);
  if (names.some(function(name) {return !ruleSets[name].initialized;})) {
    return null;
  }
  return this.combinedStores_[this.combinedStoreName_(names)];
};


/**
 * Updates adminstrative info in the base Engine.
 * During update the engine is not ready!
 */
sre.SpeechRuleEngine.prototype.updateEngine = function() {
  this.ready_ = true;
  var maps = sre.MathMap.getInstance();
  if (!sre.Engine.isReady()) {
    this.ready_ = false;
    setTimeout(goog.bind(this.updateEngine, this), 250);
    return;
  }
  sre.Engine.getInstance().evaluator =
      goog.bind(maps.store.lookupString, maps.store);
};


/**
 * Processes the grammar annotations of a rule.
 * @param {!Node} node The node to which the rule is applied.
 * @param {sre.Grammar.State} grammar The grammar annotations.
 */
sre.SpeechRuleEngine.prototype.processGrammar = function(node, grammar) {
  var assignment = {};
  for (var key in grammar) {
    var value = grammar[key];
    assignment[key] = (typeof(value) === 'string') ?
        this.constructString(node, value) : value;
  }
  sre.Grammar.getInstance().pushState(assignment);
};


/**
 * Enriches the dynamic constraint with default properties.
 * @private
 */
sre.SpeechRuleEngine.prototype.updateConstraint_ = function() {
  var dynamic = sre.Engine.getInstance().dynamicCstr;
  var strict = sre.Engine.getInstance().strict;
  var props = {};
  var values = [dynamic.getValue(sre.DynamicCstr.Axis.LOCALE),
                dynamic.getValue(sre.DynamicCstr.Axis.DOMAIN)];
  var defLocale = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE];
  var defDomain = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.DOMAIN];
  var exists = this.activeStore_.trie.hasSubtrie(values);
  // Get the trie exceptions
  props[sre.DynamicCstr.Axis.LOCALE] = [exists ? values[0] : defLocale];
  exists = exists ? exists :
      this.activeStore_.trie.hasSubtrie([defLocale, values[1]]);
  props[sre.DynamicCstr.Axis.DOMAIN] = [exists ? values[1] : defDomain];
  var order = dynamic.getOrder();
  order.forEach(function(axis) {
    if (!props[axis]) {
      var value = dynamic.getValue(axis);
      var def = sre.DynamicCstr.DEFAULT_VALUES[axis];
      props[axis] = (strict || value === def) ? [value] : [value, def];
    }});
  dynamic.updateProperties(props);
};


