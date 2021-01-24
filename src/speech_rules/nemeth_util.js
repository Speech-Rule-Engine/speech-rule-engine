// Copyright 2014-18 Volker Sorge
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
 * @fileoverview Utility functions for nemeth rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.NemethUtil');

goog.require('sre.MathspeakUtil');
goog.require('sre.SemanticVisitor');


goog.scope(function() {
var msg = sre.Messages;


/**
 * Opening string for fractions in linear Nemeth.
 * @param {!Node} node The fraction node.
 * @return {string} The opening string.
 */
sre.NemethUtil.openingFraction = function(node) {
  var depth = sre.MathspeakUtil.fractionNestingDepth(node);
  return new Array(depth).join(msg.MS.FRACTION_REPEAT) + msg.MS.FRACTION_START;
};


/**
 * Closing string for fractions in linear Nemeth.
 * @param {!Node} node The fraction node.
 * @return {string} The closing string.
 */
sre.NemethUtil.closingFraction = function(node) {
  var depth = sre.MathspeakUtil.fractionNestingDepth(node);
  return new Array(depth).join(msg.MS.FRACTION_REPEAT) + msg.MS.FRACTION_END;
};


/**
 * Middle string for fractions in linear Nemeth.
 * @param {!Node} node The fraction node.
 * @return {string} The middle string.
 */
sre.NemethUtil.overFraction = function(node) {
  var depth = sre.MathspeakUtil.fractionNestingDepth(node);
  return new Array(depth).join(msg.MS.FRACTION_REPEAT) + msg.MS.FRACTION_OVER;
};


/**
 * Middle string for bevelled fractions in Nemeth.
 * @param {!Node} node The fraction node.
 * @return {string} The middle string.
 */
sre.NemethUtil.overBevelledFraction = function(node) {
  var depth = sre.MathspeakUtil.fractionNestingDepth(node);
  return new Array(depth).join(msg.MS.FRACTION_REPEAT) +
      '⠸' + msg.MS.FRACTION_OVER;
};


/**
 * Nested Braille radicals in Nemeth putting together the nesting counter with
 * the correct indicator string as postfix.
 * @param {!Node} node The radical node.
 * @param {string} postfix A postfix string.
 * @return {string} The opening string.
 */
sre.NemethUtil.nestedRadical = function(node, postfix) {
  var depth = sre.NemethUtil.radicalNestingDepth(node);
  if (depth === 1) {
    return postfix;
  }
  return new Array(depth).join(msg.MS.NESTED) + postfix;
};


/**
 * Computes and returns the nesting depth of radical nodes.
 * @param {!Node} node The radical node.
 * @param {number=} opt_depth The optional depth.
 * @return {number} The nesting depth. 0 if the node is not a radical.
 */
sre.NemethUtil.radicalNestingDepth = function(node, opt_depth) {
  var depth = opt_depth || 0;
  if (!node.parentNode) {
    return depth;
  }
  return sre.NemethUtil.radicalNestingDepth(
      node.parentNode,
      (node.tagName === 'root' || node.tagName === 'sqrt') ? depth + 1 : depth);
};


/**
 * Opening string for radicals in Nemeth.
 * @param {!Node} node The radical node.
 * @return {string} The opening string.
 */
sre.NemethUtil.openingRadical = function(node) {
  return sre.NemethUtil.nestedRadical(node, msg.MS.STARTROOT);
};


/**
 * Closing string for radicals in Nemeth.
 * @param {!Node} node The radical node.
 * @return {string} The closing string.
 */
sre.NemethUtil.closingRadical = function(node) {
  return sre.NemethUtil.nestedRadical(node, msg.MS.ENDROOT);
};


/**
 * Middle string for radicals in Nemeth.
 * @param {!Node} node The radical node.
 * @return {string} The middle string.
 */
sre.NemethUtil.indexRadical = function(node) {
  return sre.NemethUtil.nestedRadical(node, msg.MS.ROOTINDEX);
};


/**
 * Enlarges a fence operator. The enlargement indicator might need to be
 * interspersed if multiple neutral fences are used.
 * @param {string} text The text representing the fence.
 * @return {string} The fence with the enlargment indicator.
 */
sre.NemethUtil.enlargeFence = function(text) {
  var start = '⠠';
  if (text.length === 1) {
    return start + text;
  }
  var neut = '⠳';
  var split = text.split('');
  if (split.every(function(x) {return x === neut;})) {
    return start + split.join(start);
  }
  return text.slice(0, 1) + start + text.slice(1);
};


sre.Grammar.getInstance().setCorrection('enlargeFence',
                                        sre.NemethUtil.enlargeFence);


/**
 * @type {Array.<sre.SemanticAttr.Type>}
 * @private
 */
sre.NemethUtil.NUMBER_PROPAGATORS_ = [
  sre.SemanticAttr.Type.MULTIREL,
  sre.SemanticAttr.Type.RELSEQ,
  sre.SemanticAttr.Type.PUNCTUATED,
  sre.SemanticAttr.Type.APPL
];


/**
 * Checks if a Nemeth number indicator has to be propagated beyond the node's
 * parent.
 * @param {!sre.SemanticNode} node The node which can get a number indicator.
 * @return {boolean} True if parent is a relation, puntuation or application or
 *     a negative sign.
 * @private
 */
sre.NemethUtil.checkParent_ = function(node) {
  var parent = node.parent;
  if (!parent) {
    return false;
  }
  var type = parent.type;
  if (sre.NemethUtil.NUMBER_PROPAGATORS_.indexOf(type) !== -1 ||
      (type === sre.SemanticAttr.Type.PREFIXOP &&
      parent.role === sre.SemanticAttr.Role.NEGATIVE)) {
    return true;
  }
  return false;
};


/**
 * Propagates annotation for the Nemeth number indicator.
 * @param {sre.SemanticNode} node The semantic node.
 * @param {Object<?,*>} info The information, i.e., {number: true|false}.
 * @return {Array.<*>} Info pair consisting of a string and the updated
 *     information object.
 */
sre.NemethUtil.propagateNumber = function(node, info) {
  // TODO: Font indicator followed by number.
  if (!node.childNodes.length) {
    if (sre.NemethUtil.checkParent_(node)) {
      info.number = true;
    }
    return [info['number'] ? 'number' : '', {number: false}];
  }
  if (sre.NemethUtil.checkParent_(node)) {
    info.number = true;
  }
  return ['', info];
};


sre.SemanticAnnotations.getInstance().register(
  new sre.SemanticVisitor(
    'nemeth', 'number', sre.NemethUtil.propagateNumber, {number: true}));


/**
 * Component strings for tensor speech rules.
 * @enum {string}
 * @private
 */
sre.NemethUtil.componentString_ = {
  2 : 'CSFbaseline',
  1 : 'CSFsubscript',
  0 : 'CSFsuperscript'
};


/**
 * Child number translation for tensor speech rules.
 * @enum {number}
 * @private
 */
sre.NemethUtil.childNumber_ = {
  4 : 2,
  3 : 3,
  2 : 1,
  1 : 4,
  0 : 5
};


/**
 * Generates the rule strings and constraints for tensor rules.
 * @param {string} constellation Bitvector representing of possible tensor
 *     constellation.
 * @return {Array.<string>} A list consisting of additional constraints for the
 *     tensor rule plus the strings for the rule.
 * @private
 */
sre.NemethUtil.generateTensorRuleStrings_ = function(constellation) {
  var constraints = [];
  var verbString = '';
  var constel = parseInt(constellation, 2);

  for (var i = 0; i < 5; i++) {
    var childString = 'children/*[' + sre.NemethUtil.childNumber_[i] + ']';
    if (constel & 1) {
      var compString = sre.NemethUtil.componentString_[i % 3];
      verbString = '[t] ' + compString + 'Verbose; [n] ' + childString + ';' +
          verbString;
    } else {
      constraints.unshift('name(' + childString + ')="empty"');
    }
    constel >>= 1;
  }
  constraints.push(verbString);
  return constraints;
};


/**
 * Generator for tensor speech rules.
 * @param {sre.MathStore} store The mathstore to which the rules are added.
 */
sre.NemethUtil.generateTensorRules = function(store) {
  // Constellations are built as bitvectors with the meaning:
  //
  //  lsub lsuper base rsub rsuper
  var defineRule = goog.bind(store.defineRule, store);
  var defineRulesAlias = goog.bind(store.defineRulesAlias, store);
  var constellations = ['11111', '11110', '11101', '11100',
                        '10111', '10110', '10101', '10100',
                        '01111', '01110', '01101', '01100'
  ];
  for (var i = 0, constel; constel = constellations[i]; i++) {
    var name = 'tensor' + constel;
    var components = sre.NemethUtil.generateTensorRuleStrings_(constel);
    var verbStr = components.pop();
    var verbList = [name, 'default', verbStr, 'self::tensor'].
        concat(components);
    // Rules without neighbour.
    defineRule.apply(null, verbList);
    // Rules with baseline.
    var baselineStr = sre.NemethUtil.componentString_[2];
    verbStr += '; [t]' + baselineStr + 'Verbose';
    name = name + '-baseline';
    verbList = [name, 'default', verbStr, 'self::tensor',
                'following-sibling::*'].
        concat(components);
    defineRule.apply(null, verbList);
    // Rules without neighbour but baseline.
    var aliasList = [name, 'self::tensor', 'not(following-sibling::*)',
                     'ancestor::fraction|ancestor::punctuated|' +
                     'ancestor::fenced|ancestor::root|ancestor::sqrt|' +
                     'ancestor::relseq|ancestor::multirel|' +
                     '@embellished'].
        concat(components);
    defineRulesAlias.apply(null, aliasList);
  }
};

});  // goog.scope
