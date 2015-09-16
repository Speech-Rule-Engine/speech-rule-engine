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

goog.require('sre.MathStore');
goog.require('sre.SpeechRule');



/**
 * A base store for simple Math objects.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.MathSimpleStore = function() {
  goog.base(this);
};
goog.inherits(sre.MathSimpleStore, sre.MathStore);


/**
 * Turns a domain mapping from its JSON representation containing simple strings
 * only into a list of speech rules.
 * @param {string} name Name for the rules.
 * @param {string} str String for precondition and constraints.
 * @param {Object.<string, Object.<string, string>>} mapping Simple string
 *     mapping.
 */
sre.MathSimpleStore.prototype.defineRulesFromMappings = function(
    name, str, mapping) {
  for (var domain in mapping) {
    for (var style in mapping[domain]) {
      var content = mapping[domain][style];
      if (str === '"') {
        var cstr = 'self::text() = \'' + str + '\'';
      } else {
        cstr = 'self::text() = "' + str + '"';
      }
      var rule = this.defineRule(
          name, domain + '.' + style, '[t] "' + content + '"',
          'self::text()', cstr);
    }
  }
};



/**
 * A compound store for simple Math objects.
 * @constructor
 */
sre.MathCompoundStore = function() {
  /**
   * A set of efficient substores.
   * @type {Object.<string, sre.MathStore>}
   * @private
   */
  this.subStores_ = {};
};
goog.addSingletonGetter(sre.MathCompoundStore);


/**
 * Function creates a rule store in the compound store for a particular string,
 * and populates it with a set of rules.
 * @param {string} name Name of the rule.
 * @param {string} str String used as key to refer to the rule store
 * precondition and constr
 * @param {Object} mappings JSON representation of mappings from styles and
 *     domains to strings, from which the speech rules will be computed.
 */
sre.MathCompoundStore.prototype.defineRules = function(name, str, mappings) {
  var store = new sre.MathSimpleStore();
  store.defineRulesFromMappings(name, str, mappings);
  this.subStores_[str] = store;
};


/**
 * Makes a speech rule for Unicode characters from its JSON representation.
 * @param {Object} json JSON object of the speech rules.
 */
sre.MathCompoundStore.prototype.addSymbolRules = function(json) {
  var key = sre.MathSimpleStore.parseUnicode_(json['key']);
  this.defineRules(json['key'], key, json['mappings']);
};


/**
 * Makes a speech rule for Function names from its JSON representation.
 * @param {Object} json JSON object of the speech rules.
 */
sre.MathCompoundStore.prototype.addFunctionRules = function(json) {
  var names = json['names'];
  var mappings = json['mappings'];
  for (var j = 0, name; name = names[j]; j++) {
    this.defineRules(name, name, mappings);
  }
};


/**
 * Makes a speech rule for Unit descriptors from its JSON representation.
 * @param {Object} json JSON object of the speech rules.
 */
sre.MathCompoundStore.prototype.addUnitRules = function(json) {
  var names = json['names'];
  if (names) {
    json['names'] = names.map(function(name) {return name + ':' + 'unit';});
  }
  this.addFunctionRules(json);
};


/**
 * Retrieves a rule for the given node if one exists.
 * @param {Node} node A node.
 * @param {!sre.SpeechRule.DynamicCstr} dynamic Additional dynamic
 *     constraints. These are matched against properties of a rule.
 * @return {sre.SpeechRule} The speech rule if it exists.
 */
sre.MathCompoundStore.prototype.lookupRule = function(node, dynamic) {
  var store = this.subStores_[node.textContent];
  if (store) {
    return store.lookupRule(node, dynamic);
  }
};


/**
 * Looks up a rule for a given string and executes its actions.
 * @param {string} text The text to be translated.
 * @param {!sre.SpeechRule.DynamicCstr} dynamic Additional dynamic
 *     constraints. These are matched against properties of a rule.
 * @return {!string} The string resulting from the action of speech rule.
 */
sre.MathCompoundStore.prototype.lookupString = function(text, dynamic) {
  var textNode = sre.XpathUtil.currentDocument ?
        sre.XpathUtil.currentDocument.createTextNode(text) :
        sre.SystemExternal.document.createTextNode(text);
  var rule = this.lookupRule(textNode, dynamic);
  if (!rule) {
    return '';
  }
  return rule.action.components
      .map(function(comp) {
           return comp.content.slice(1, -1);})
      .join(' ');
};


/**
 * Get a set of all dynamic constraint values.
 * @return {!Object.<sre.SpeechRule.DynamicCstrAttrib, Array.<string>>} The
 *     object with all annotations.
 */
sre.MathCompoundStore.prototype.getDynamicConstraintValues = function() {
  var newCstr = {};
  for (var store in this.subStores_) {
    var cstr = this.subStores_[store].getDynamicConstraintValues();
    for (var key in cstr) {
      var set = newCstr[key];
      if (set) {
        newCstr[key] = sre.MathUtil.union(set, cstr[key]);
      } else {
        newCstr[key] = cstr[key];
      }
    }
  }
  return newCstr;
};


/**
 * Parses a string with a hex representatino of a unicode code point into the
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
