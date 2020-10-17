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
 * @fileoverview Rule stores for the basic components of math expressions:
 *    Unicode symbols and functions.
 *
 *    The idea of these stores is to provide a more efficient data structure to
 *    look up rules in the background page than the usual flat array of rules
 *    implemented by other stores.
 *
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.MathCompoundStore');
goog.provide('sre.MathSimpleStore');

goog.require('sre.DynamicCstr');
goog.require('sre.MathStore');
goog.require('sre.SpeechRule');



/**
 * A base store for simple Math objects.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.MathSimpleStore = function() {
  sre.MathSimpleStore.base(this, 'constructor');

  /**
   * @type {string}
   */
  this.category = '';

};
goog.inherits(sre.MathSimpleStore, sre.MathStore);


/**
 * Turns a domain mapping from its JSON representation containing simple strings
 * only into a list of speech rules.
 * @param {string} name Name for the rules.
 * @param {string} str String for precondition and constraints.
 * @param {Object.<Object.<string>>} mapping Simple string
 *     mapping.
 */
sre.MathSimpleStore.prototype.defineRulesFromMappings = function(
    name, str, mapping) {
  for (var domain in mapping) {
    for (var style in mapping[domain]) {
      var content = mapping[domain][style];
      this.defineRuleFromStrings(name, domain, style, str, content);
    }
  }
};


/**
 * Creates a single rule from strings.
 * @param {string} name Name of the rule.
 * @param {string} domain The domain axis.
 * @param {string} style The style axis.
 * @param {string} str String for precondition and constraints.
 * @param {string} content The content for the postcondition.
 */
sre.MathSimpleStore.prototype.defineRuleFromStrings = function(
    name, domain, style, str, content) {
  if (str === '"') {
    var cstr = 'self::text() = \'' + str + '\'';
  } else {
    cstr = 'self::text() = "' + str + '"';
  }
  this.defineRule(name, domain + '.' + style, '[t] "' + content + '"',
                  'self::text()', cstr);
};


/**
 * @override
 */
sre.MathSimpleStore.prototype.lookupRule = function(node, dynamic) {
  // node is actually null!
  var rules = this.getSpeechRules().filter(
      function(rule) {
        return sre.MathSimpleStore.testDynamicConstraints_(dynamic, rule);
      });
  return rules.length ?
      rules.sort(function(r1, r2) {
        return sre.Engine.getInstance().comparator.
           compare(r1.dynamicCstr, r2.dynamicCstr);})[0] : null;
};


/**
 * Tests whether a speech rule satisfies a set of dynamic constraints.  Unless
 * the engine is in strict mode, the dynamic constraints can be "relaxed", that
 * is, a default value can also be choosen.
 * @param {!sre.DynamicCstr} dynamic Dynamic constraints.
 * @param {sre.SpeechRule} rule The rule.
 * @return {boolean} True if the preconditions apply to the node.
 * @private
 */
sre.MathSimpleStore.testDynamicConstraints_ = function(
    dynamic, rule) {
  if (sre.Engine.getInstance().strict) {
    return rule.dynamicCstr.equal(dynamic);
  }
  return sre.Engine.getInstance().comparator.match(rule.dynamicCstr);
};



/**
 * A compound store for simple Math objects.
 * @constructor
 */
sre.MathCompoundStore = function() {
  /**
   * A set of efficient substores.
   * @type {!Object.<sre.MathStore>}
   * @private
   */
  this.subStores_ = {};


  /**
   * @type {string}
   */
  this.locale = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE];

  /**
   * @type {string}
   */
  this.modality = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY];

  this.siPrefixes = {};

};
goog.addSingletonGetter(sre.MathCompoundStore);


/**
 * Retrieves a substore for a key. Creates a new one if it does not exist.
 * @param {string} key The key for the store.
 * @return {sre.MathStore} The rule store.
 * @private
 */
sre.MathCompoundStore.prototype.getSubStore_ = function(key) {
  var store = this.subStores_[key];
  if (store) {
    sre.Debugger.getInstance().output('Store exists! ' + key);
    return store;
  }
  store = new sre.MathSimpleStore();
  this.subStores_[key] = store;
  return store;
};


/**
 * Transfers parameters of the compound store to a substore.
 * @param {sre.MathStore} store
 * @param {string=} opt_cat The category if it exists.
 * @private
 */
sre.MathCompoundStore.prototype.setupStore_ = function(store, opt_cat) {
  store.locale = this.locale;
  store.modality = this.modality;
  if (opt_cat) {
    store.category = opt_cat;
  }
};


/**
 * Function creates a rule store in the compound store for a particular string,
 * and populates it with a set of rules.
 * @param {string} name Name of the rule.
 * @param {string} str String used as key to refer to the rule store
 * precondition and constr
 * @param {string} cat The category if it exists.
 * @param {Object} mappings JSON representation of mappings from styles and
 *     domains to strings, from which the speech rules will be computed.
 */
sre.MathCompoundStore.prototype.defineRules = function(
    name, str, cat, mappings) {
  var store = this.getSubStore_(str);
  this.setupStore_(store, cat);
  store.defineRulesFromMappings(name, str, mappings);
};


/**
 * Creates a single rule from strings.
 * @param {string} name Name of the rule.
 * @param {string} domain The domain axis.
 * @param {string} style The style axis.
 * @param {string} cat The category if it exists.
 * @param {string} str String for precondition and constraints.
 * @param {string} content The content for the postcondition.
 */
sre.MathCompoundStore.prototype.defineRule = function(
    name, domain, style, cat, str, content) {
  var store = this.getSubStore_(str);
  this.setupStore_(store, cat);
  store.defineRuleFromStrings(name, domain, style, str, content);
};


/**
 * Changes the internal locale for the rule definitions if the given JSON
 * element is a locale instruction.
 * @param {Object} json JSON object of a speech rules.
 * @return {boolean} True if the locale was changed.
 * @private
 */
sre.MathCompoundStore.prototype.changeLocale_ = function(json) {
  if (!json['locale'] && !json['modality']) {
    return false;
  }
  this.locale = json['locale'] || this.locale;
  this.modality = json['modality'] || this.modality;
  return true;
};


/**
 * Makes a speech rule for Unicode characters from its JSON representation.
 * @param {Object} json JSON object of the speech rules.
 */
sre.MathCompoundStore.prototype.addSymbolRules = function(json) {
  if (this.changeLocale_(json)) {
    return;
  }
  var key = sre.MathSimpleStore.parseUnicode_(json['key']);
  this.defineRules(json['key'], key, json['category'], json['mappings']);
};


/**
 * Makes a speech rule for Function names from its JSON representation.
 * @param {Object} json JSON object of the speech rules.
 */
sre.MathCompoundStore.prototype.addFunctionRules = function(json) {
  if (this.changeLocale_(json)) {
    return;
  }
  var names = json['names'];
  var mappings = json['mappings'];
  var category = json['category'];
  for (var j = 0, name; name = names[j]; j++) {
    this.defineRules(name, name, category, mappings);
  }
};


/**
 * Makes a speech rule for Unit descriptors from its JSON representation.
 * @param {Object} json JSON object of the speech rules.
 */
sre.MathCompoundStore.prototype.addUnitRules = function(json) {
  if (this.changeLocale_(json)) {
    return;
  }
  if (json['si']) {
    this.addSiUnitRules(json);
    return;
  }
  this.addUnitRules_(json);
};


sre.MathCompoundStore.prototype.addUnitRules_ = function(json) {
  var names = json['names'];
  if (names) {
    json['names'] = names.map(function(name) {return name + ':' + 'unit';});
  }
  this.addFunctionRules(json);
};

sre.MathCompoundStore.prototype.addSiUnitRules = function(json) {
  for (var key of Object.keys(this.siPrefixes)) {
    var newJson = Object.assign({}, json);
    newJson.mappings = {};
    var prefix = this.siPrefixes[key];
    newJson['key'] = key + newJson['key'];
    newJson['names'] = newJson['names'].map(function(name) { return key + name; });
    for (var domain of Object.keys(json['mappings'])) {
      newJson.mappings[domain] = {};
      for (var style of Object.keys(json['mappings'][domain])) {
        newJson['mappings'][domain][style] =
          sre.Locale[this.locale].SI(
              prefix, json['mappings'][domain][style]);
      }
    }
    this.addUnitRules_(newJson);
  }
  this.addUnitRules_(json);
};

/**
 * Retrieves a rule for the given node if one exists.
 * @param {string} node A node.
 * @param {!sre.DynamicCstr} dynamic Additional dynamic
 *     constraints. These are matched against properties of a rule.
 * @return {sre.SpeechRule} The speech rule if it exists.
 */
sre.MathCompoundStore.prototype.lookupRule = function(node, dynamic) {
  var store = this.subStores_[node];
  return store ? store.lookupRule(null, dynamic) : null;
};


/**
 * Retrieves the category of a character or string if it has one.
 * @param {string} character The character or string.
 * @return {string} The category if it exists.
 */
sre.MathCompoundStore.prototype.lookupCategory = function(character) {
  var store = this.subStores_[character];
  return store ? store.category : '';
};


/**
 * Looks up a rule for a given string and executes its actions.
 * @param {string} text The text to be translated.
 * @param {!sre.DynamicCstr} dynamic Additional dynamic
 *     constraints. These are matched against properties of a rule.
 * @return {string} The string resulting from the action of speech rule.
 */
sre.MathCompoundStore.prototype.lookupString = function(text, dynamic) {
  var rule = this.lookupRule(text, dynamic);
  if (!rule) {
    return '';
  }
  return rule.action.components
      .map(function(comp) {
           return comp.content.slice(1, -1);})
      .join(' ');
};


/**
 * Collates information on dynamic constraint values of the currently active
 * trie of the engine.
 * @param {Object=} opt_info Initial dynamic constraint information.
 * @return {Object} The collated information.
 */
sre.MathCompoundStore.prototype.enumerate = function(opt_info) {
  var info = opt_info || {};
  for (var store in this.subStores_) {
    info = this.subStores_[store].trie.enumerate(info);
  }
  return info;
};


/**
 * Parses a string with a hex representation of a unicode code point into the
 * corresponding unicode character.
 * @param {string} number The code point to be parsed.
 * @return {string} The unicode character.
 * @private
 */
sre.MathSimpleStore.parseUnicode_ = function(number) {
  var keyValue = parseInt(number, 16);
  if (keyValue < 0x10000) {
    return String.fromCharCode(keyValue);
  }
  keyValue -= 0x10000;
  var hiSurrogate = (keyValue >> 10) + 0xD800;
  var lowSurrogate = (keyValue & 0x3FF) + 0xDC00;
  return String.fromCharCode(hiSurrogate, lowSurrogate);
};
