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
goog.require('sre.BrailleStore');
goog.require('sre.ClearspeakPreferences');
goog.require('sre.Debugger');
goog.require('sre.DynamicCstr');
goog.require('sre.Engine');
goog.require('sre.MathMap');
goog.require('sre.MathStore');
goog.require('sre.SpeechRule');
goog.require('sre.SpeechRuleStores');



/**
 * @constructor
 */
sre.SpeechRuleEngine = function() {
  /**
   * The currently active speech rule store.
   * @type {sre.BaseRuleStore}
   * @private
   */
  this.activeStore_ = new sre.MathStore();

  /**
   * Flag indicating if the engine is ready. Not ready while it is updating!
   * @type {boolean}
   * @private
   */
  this.ready_ = true;

  /**
   * Default evaluators collated by locale and modality.
   * @type {Object.<Object.<function(!Node): !Array<sre.AuditoryDescription>>>}
   * @private
   */
  this.evaluators_ = {};

  this.prune = true;

  sre.Engine.registerTest(
      goog.bind(function(x) {return this.ready_;}, this));

};
goog.addSingletonGetter(sre.SpeechRuleEngine);


/**
 * Factory method for generating rule stores by modality.
 * @param {string} modality The modality.
 * @return {sre.BaseRuleStore} The generated rule store.
 * @private
 */
sre.SpeechRuleEngine.prototype.storeFactory_ = function(modality) {
  let constructors = {
    braille: sre.BrailleStore,
    speech: sre.MathStore
  };
  return new (constructors[modality] || sre.MathStore)();
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
  sre.Debugger.getInstance().output(
      engine.mode !== sre.Engine.Mode.HTTP ? node.toString() : node);
  sre.Grammar.getInstance().setAttribute(node);
  var rule = this.activeStore_.lookupRule(node, engine.dynamicCstr);
  if (!rule) {
    if (engine.strict) return [];
    var result = this.getEvaluator(engine.locale, engine.modality)(node);
    if (node.attributes) {
      this.addPersonality_(result, {}, false, node);
    }
    return result;
  }
  sre.Debugger.getInstance().generateOutput(
      goog.bind(function() {
        return [
          'Apply Rule:',
          rule.name, rule.dynamicCstr.toString(),
          engine.mode !== sre.Engine.Mode.HTTP ? node.toString() : node];},
      this));
  var context = rule.context || this.activeStore_.context;
  var components = rule.action.components;
  result = [];
  for (var i = 0, component; component = components[i]; i++) {
    var descrs = [];
    var content = component.content || '';
    var attributes = component.attributes || {};
    var multi = false;
    if (component.grammar) {
      this.processGrammar(context, node, component.grammar);
    }
    var saveEngine = null;
    // Retooling the engine
    if (attributes.engine) {
      saveEngine = sre.Engine.getInstance().dynamicCstr.getComponents();
      var features = sre.Grammar.parseInput(attributes.engine);
      sre.Engine.getInstance().setDynamicCstr(features);
    }
    switch (component.type) {
      case sre.SpeechRule.Type.NODE:
        var selected = context.applyQuery(node, content);
        if (selected) {
          descrs = this.evaluateTree_(selected);
        }
        break;
      case sre.SpeechRule.Type.MULTI:
        multi = true;
        selected = context.applySelector(node, content);
        if (selected.length > 0) {
          descrs = this.evaluateNodeList_(
              context,
              selected,
              attributes['sepFunc'],
              // TODO (span): Sort out those types better.
              /** @type {string} */(
              context.constructString(node, attributes['separator'])),
              attributes['ctxtFunc'],
              /** @type {string} */(
              context.constructString(node, attributes['context'])));
        }
        break;
      case sre.SpeechRule.Type.TEXT:
        // TODO (span): We need the span concept here as a parameter with xpath.
        var xpath = attributes['span'];
        var attrs = {};
        if (xpath) {
          var nodes = sre.XpathUtil.evalXPath(xpath, node);
          // TODO: Those could be multiple nodes!
          //       We need the right xpath expression and combine their
          //       attributes.
          // Generalise the following:
          if (nodes.length) attrs.extid = nodes[0].getAttribute('extid');
        }
        selected = context.constructString(node, content);
        if (selected) {
          if (Array.isArray(selected)) {
            descrs = selected.map(function(span) {
              return sre.AuditoryDescription.create(
                  {text: span.string, attributes: span.attributes},
                  {adjust: true});
            });
          } else {
            descrs = [sre.AuditoryDescription.create(
                {text: selected, attributes: attrs}, {adjust: true})];
          }
        }
        break;
      case sre.SpeechRule.Type.PERSONALITY:
      default:
        descrs = [sre.AuditoryDescription.create({text: content})];
    }
    // Adding overall context and annotation if they exist.
    if (descrs[0] && !multi) {
      if (attributes['context']) {
        descrs[0]['context'] =
            context.constructString(node, attributes['context']) +
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
    result = result.concat(this.addPersonality_(descrs, attributes, multi,
                                                node));
    if (saveEngine) {
      sre.Engine.getInstance().setDynamicCstr(saveEngine);
    }
  }
  return result;
};


/**
 * Evaluates a list of nodes into a list of auditory descriptions.
 * @param {sre.SpeechRuleContext} context The function context in which to
 *     evaluate the nodes.
 * @param {!Array.<Node>} nodes Array of nodes.
 * @param {string} sepFunc Name of a function used to compute a separator
 *     between every element.
 * @param {string} sepStr A string that is used as argument to the sepFunc or
 *     interspersed directly between each node if sepFunc is not supplied.
 * @param {string} ctxtFunc Name of a function applied to compute the context
 *     for every element in the list.
 * @param {string} ctxtStr Additional context string that is given to the
 *     ctxtFunc function or used directly if ctxtFunc is not supplied.
 * @return {Array.<sre.AuditoryDescription>} A list of Auditory descriptions.
 * @private
 */
sre.SpeechRuleEngine.prototype.evaluateNodeList_ = function(
    context, nodes, sepFunc, sepStr, ctxtFunc, ctxtStr) {
  if (nodes == []) {
    return [];
  }
  var sep = sepStr || '';
  var cont = ctxtStr || '';
  var cFunc = context.contextFunctions.lookup(ctxtFunc);
  var ctxtClosure = cFunc ? cFunc(nodes, cont) : function() {return cont;};
  var sFunc = context.contextFunctions.lookup(sepFunc);
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
 * @param {boolean} multi Multinode flag.
 * @param {Node} node The original XML node.
 * @return {Array.<sre.AuditoryDescription>} The modified array.
 * @private
 */
sre.SpeechRuleEngine.prototype.addPersonality_ = function(
    descrs, props, multi, node) {
  var personality = {};
  var pause = null;
  for (var key in sre.Engine.personalityProps) {
    var value = props[sre.Engine.personalityProps[key]];
    if (typeof value === 'undefined') {
      continue;
    }
    var numeral = parseFloat(value);
    // if (!isNaN(numeral)) {
    //   personality[sre.Engine.personalityProps[key]] = numeral;
    // }
    var realValue = isNaN(numeral) ?
        ((value.charAt(0) == '"') ? value.slice(1, -1) : value) :
        numeral;
    if (sre.Engine.personalityProps[key] ===
        sre.Engine.personalityProps.PAUSE) {
      pause = realValue;
    } else {
      personality[sre.Engine.personalityProps[key]] = realValue;
    }
  }
  // TODO: Deal with non-numeric values for personalities here.
  //       Possibly use simply an overwrite mechanism without adding.
  for (var i = 0, descr; descr = descrs[i]; i++) {
    this.addRelativePersonality_(descr, personality);
    this.addExternalAttributes_(descr, node);
  }
  // Removes the last joiner in a multi node element.
  if (multi && descrs.length) {
    delete descrs[descrs.length - 1].
        personality[sre.Engine.personalityProps.JOIN];
  }
  // Adds pause if there was one.
  if (pause && descrs.length) {
    var last = descrs[descrs.length - 1];
    if (last.text || Object.keys(last.personality).length) {
      descrs.push(sre.AuditoryDescription.create(
          {text: '', personality: {pause: pause}}));
    } else {
      last.personality[sre.Engine.personalityProps.PAUSE] = pause;
    }
  }
  return descrs;
};


/**
 * Adds external attributes if some are in the node
 * @param {sre.AuditoryDescription} descr An Auditory descriptions.
 * @param {Node} node The XML node.
 * @private
 */
sre.SpeechRuleEngine.prototype.addExternalAttributes_ = function(descr, node) {
  if (node.hasAttributes()) {
    var attrs = node.attributes;
    for (var i = attrs.length - 1; i >= 0; i--) {
      var key = attrs[i].name;
      if (!descr.attributes[key] && key.match(/^ext/)) {
        descr.attributes[key] = attrs[i].value;
      }
    }
  }
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
    if (descrPersonality[p] && typeof(descrPersonality[p]) == 'number' &&
        typeof(personality[p]) == 'number') {
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
  for (var key in settings) {
    save[key] = engine[key];
    engine[key] = settings[key];
  }
  engine.setDynamicCstr();
  var result = callback();
  for (key in save) {
    engine[key] = save[key];
  }
  engine.setDynamicCstr();
  return result;
};


/**
 * Adds a speech rule store to the speech rule engine. This method is called
 * when loading a rule set.
 * @param {Object.<string|Array>} set The definition of a speech rule set.
 */
sre.SpeechRuleEngine.prototype.addStore = function(set) {
  // This line is important to setup the context functions for stores.
  // It has to run __before__ the first speech rule store is added.
  sre.SpeechRuleStores.init();
  if (set && !set.functions) {
    set.functions = sre.SpeechRules.getInstance().getStore(
        set.locale, set.modality, set.domain);
  }
  let store = this.storeFactory_(set.modality);
  store.parse(set);
  store.initialize();
  store.getSpeechRules().forEach(
      goog.bind(function(x) {this.activeStore_.trie.addRule(x);}, this));
  this.addEvaluator(store);
  this.activeStore_.setSpeechRules(this.activeStore_.trie.collectRules());
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
  if (this.prune) {
    this.prune = false;
    this.adjustEngine();
  }
  sre.Engine.getInstance().evaluator =
      goog.bind(maps.store.lookupString, maps.store);
};


/**
 * Adjust Engine with local rule files.
 */
sre.SpeechRuleEngine.prototype.adjustEngine = function() {
  var engine = sre.Engine.getInstance();
  if (engine.prune) {
    var cstr = engine.prune.split('.');
    this.activeStore_.prune(cstr);
  }
  if (engine.rules) {
    // TODO: This needs to be made more robust.
    var path = sre.SystemExternal.jsonPath.replace(
        '/lib/mathmaps', '/src/mathmaps');
    var parse = function(json) {
      return sre.MathMap.getInstance().parseMaps(
          '{"' + engine.rules + '":' + json + '}'
      );
    };
    sre.MathMap.getInstance().retrieveFiles(path + engine.rules, parse);
  }
  setTimeout(goog.bind(this.updateEngine, this), 100);
};


/**
 * Processes the grammar annotations of a rule.
 * @param {sre.SpeechRuleContext} context The function context in which to
 *     evaluate the grammar expression.
 * @param {!Node} node The node to which the rule is applied.
 * @param {sre.Grammar.State} grammar The grammar annotations.
 */
sre.SpeechRuleEngine.prototype.processGrammar = function(
    context, node, grammar) {
  var assignment = {};
  for (var key in grammar) {
    var value = grammar[key];
    assignment[key] = (typeof(value) === 'string') ?
        context.constructString(node, value) : value;
  }
  sre.Grammar.getInstance().pushState(assignment);
};


/**
 * Enriches the dynamic constraint with default properties.
 * @private
 */
// TODO: Exceptions and ordering between locale and modality?
//       E.g, missing clearspeak defaults to mathspeak.
//       What if there is no default for a particular locale or modality?
//       We need a default constraint specification somewhere that defines the
//       orders.
//       Try to make this dependent on the order of the dynamicCstr.
sre.SpeechRuleEngine.prototype.updateConstraint_ = function() {
  var dynamic = sre.Engine.getInstance().dynamicCstr;
  var strict = sre.Engine.getInstance().strict;
  var trie = this.activeStore_.trie;
  var props = {};
  var locale = dynamic.getValue(sre.DynamicCstr.Axis.LOCALE);
  var modality = dynamic.getValue(sre.DynamicCstr.Axis.MODALITY);
  var domain = dynamic.getValue(sre.DynamicCstr.Axis.DOMAIN);
  if (!trie.hasSubtrie([locale, modality, domain])) {
    domain = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.DOMAIN];
    if (!trie.hasSubtrie([locale, modality, domain])) {
      modality = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY];
      if (!trie.hasSubtrie([locale, modality, domain])) {
        locale = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE];
      }
    }
  }
  props[sre.DynamicCstr.Axis.LOCALE] = [locale];
  // Normally modality cannot be mixed. But summary allows fallback to speech if
  // an expression can not be summarised.
  props[sre.DynamicCstr.Axis.MODALITY] =
      [modality !== 'summary' ? modality :
       sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY]];
  // For speech we do not want rule leaking across rule sets.
  props[sre.DynamicCstr.Axis.DOMAIN] =
      [modality !== 'speech' ?
       sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.DOMAIN] : domain];
  var order = dynamic.getOrder();
  for (var i = 0, axis; axis = order[i]; i++) {
    if (!props[axis]) {
      var value = dynamic.getValue(axis);
      var valueSet = this.makeSet_(
          value, /** @type {sre.ClearspeakPreferences} */(dynamic).preference);
      var def = sre.DynamicCstr.DEFAULT_VALUES[axis];
      if (!strict && value !== def) {
        valueSet.push(def);
      }
      props[axis] = valueSet;
    }}
  dynamic.updateProperties(props);
};


/**
 * Splits preference form style names into set of preference settings.
 * @param {string} value The value of the style setting.
 * @param {?Object.<string>} preferences Set of Clearspeak preferences or null.
 * @return {Array.<string>} The style settings. Either a single element or a
 *      pair associating a Clearspeak preference with a value.
 * @private
 */
sre.SpeechRuleEngine.prototype.makeSet_ = function(value, preferences) {
  if (!preferences || !Object.keys(preferences).length) {
    return [value];
  }
  return value.split(':');
};


/**
 * Adds an evaluation method by locale and modality.
 * @param {sre.SpeechRuleEvaluator} store The store whose evaluation method is
 *     added.
 */
sre.SpeechRuleEngine.prototype.addEvaluator = function(store) {
  var fun = goog.bind(store.evaluateDefault, store);
  var loc = this.evaluators_[store.locale];
  if (loc) {
    loc[store.modality] = fun;
    return;
  }
  let mod = {};
  mod[store.modality] = fun;
  this.evaluators_[store.locale] = mod;
};


/**
 * Selects a default evaluation method by locale and modality. If none exists it
 * takes the default evaluation method of the active combined store.
 * @param {string} locale The locale.
 * @param {string} modality The modality.
 * @return {!function(!Node): !Array<sre.AuditoryDescription>} The evaluation
 *     method.
 */
sre.SpeechRuleEngine.prototype.getEvaluator = function(locale, modality) {
  var loc = this.evaluators_[locale];
  var fun = loc ? loc[modality] : null;
  return fun ? fun :
      goog.bind(this.activeStore_.evaluateDefault, this.activeStore_);
};


/**
 * Collates information on dynamic constraint values of the currently active
 * trie of the engine.
 * @param {Object=} opt_info Initial dynamic constraint information.
 * @return {Object} The collated information.
 */
sre.SpeechRuleEngine.prototype.enumerate = function(opt_info) {
  return this.activeStore_.trie.enumerate(opt_info);
};
