// Copyright 2016 Volker Sorge
// Copyright (c) 2016 The MathJax Consortium
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
 * @fileoverview Prefix rules.
 * @author v.sorge@mathjax.com (Volker Sorge)
 */

goog.provide('sre.PrefixRules');

goog.require('sre.MathStore');
goog.require('sre.MathmlStore');
goog.require('sre.MathspeakUtil');
goog.require('sre.StoreUtil');



/**
 * Rule initialization.
 * @constructor
 */
sre.PrefixRules = function() {
  sre.PrefixRules.initCustomFunctions_();
  sre.PrefixRules.initPrefixRules_();
};
goog.addSingletonGetter(sre.PrefixRules);


/**
 * @type {sre.MathStore}
 */
sre.PrefixRules.mathStore = sre.MathmlStore.getInstance();


/** @private */
sre.PrefixRules.defineRule_ = goog.bind(
    sre.PrefixRules.mathStore.defineRule,
    sre.PrefixRules.mathStore);


/** @private */
sre.PrefixRules.addCustomString_ = goog.bind(
    sre.PrefixRules.mathStore.customStrings.add,
    sre.PrefixRules.mathStore.customStrings);


/**
 * String function to turn a child position into an ordinal.
 * @param {!Node} node The node for the string function.
 * @return {string} The ordinal string corresponding to the child position of
 *     the node.
 */
sre.PrefixRules.ordinalPosition = function(node) {
  var children = sre.DomUtil.toArray(node.parentNode.childNodes);
  return sre.MathspeakUtil.simpleOrdinal(children.indexOf(node) + 1).toString();
};


goog.scope(function() {
var defineRule = sre.PrefixRules.defineRule_;
var addCSF = sre.PrefixRules.addCustomString_;


/**
 * Initialize the custom functions.
 * @private
 */
sre.PrefixRules.initCustomFunctions_ = function() {

  addCSF('CSFordinalPosition', sre.PrefixRules.ordinalPosition);
  
};

  
/**
 * Prefix rules.
 * @private
*/
sre.PrefixRules.initPrefixRules_ = function() {
  defineRule(
      'numerator', 'prefix.default',
      '[t] "Numerator"; [p] (pause:200)',
      'self::*', 'name(../..)="fraction"',
      'count(preceding-sibling::*)=0');
  defineRule(
      'denominator', 'prefix.default',
      '[t] "Denominator"; [p] (pause:200)',
      'self::*', 'name(../..)="fraction"',
      'count(preceding-sibling::*)=1');
  defineRule(
      'base', 'prefix.default',
      '[t] "Base"; [p] (pause:200)',
      'self::*', 'name(../..)="superscript" or name(../..)="subscript"' +
      ' or name(../..)="overscore" or name(../..)="underscore"' +
      ' or name(../..)="tensor"',
      'count(preceding-sibling::*)=0');
  defineRule(
      'exponent', 'prefix.default',
      '[t] "Exponent"; [p] (pause:200)',
      'self::*', 'name(../..)="superscript"',
      'count(preceding-sibling::*)=1');
  defineRule(
      'subscript', 'prefix.default',
      '[t] "Subscript"; [p] (pause:200)',
      'self::*', 'name(../..)="subscript"',
      'count(preceding-sibling::*)=1');
  defineRule(
      'overscript', 'prefix.default',
      '[t] "Overscript"; [p] (pause:200)',
      'self::*', 'name(../..)="overscore"',
      'count(preceding-sibling::*)=1');
  defineRule(
      'underscript', 'prefix.default',
      '[t] "Underscript"; [p] (pause:200)',
      'self::*', 'name(../..)="underscore"',
      'count(preceding-sibling::*)=1');
  defineRule(
      'radicand', 'prefix.default',
      '[t] "Radicand"; [p] (pause:200)',
      'self::*', 'name(../..)="sqrt"');
  defineRule(
      'radicand', 'prefix.default',
      '[t] "Radicand"; [p] (pause:200)',
      'self::*', 'name(../..)="root"',
      'count(preceding-sibling::*)=1');
  defineRule(
      'index', 'prefix.default',
      '[t] "Index"; [p] (pause:200)',
      'self::*', 'name(../..)="root"',
      'count(preceding-sibling::*)=0');
  defineRule(
      'leftsub', 'prefix.default',
      '[t] "Left Subscript"; [p] (pause:200)',
      'self::*', 'name(../..)="tensor"',
      'count(preceding-sibling::*)=1');
  defineRule(
      'leftsub', 'prefix.default',
      '[t] CSFordinalPosition; [t] "Left Subscript"; [p] (pause:200)',
      'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
      'count(../../preceding-sibling::*)=1');
  defineRule(
      'leftsuper', 'prefix.default',
      '[t] "Left Superscript"; [p] (pause:200)',
      'self::*', 'name(../..)="tensor"',
      'count(preceding-sibling::*)=2');
  defineRule(
      'leftsuper', 'prefix.default',
      '[t] CSFordinalPosition; [t] "Left Superscript"; [p] (pause:200)',
      'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
      'count(../../preceding-sibling::*)=2');
  defineRule(
      'rightsub', 'prefix.default',
      '[t] "Right Subscript"; [p] (pause:200)',
      'self::*', 'name(../..)="tensor"',
      'count(preceding-sibling::*)=3');
  defineRule(
      'rightsub', 'prefix.default',
      '[t] CSFordinalPosition; [t] "Right Subscript"; [p] (pause:200)',
      'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
      'count(../../preceding-sibling::*)=3');
  defineRule(
      'rightsuper', 'prefix.default',
      '[t] "Right Superscript"; [p] (pause:200)',
      'self::*', 'name(../..)="tensor"',
      'count(preceding-sibling::*)=4');
  defineRule(
      'rightsuper', 'prefix.default',
      '[t] CSFordinalPosition; [t] "Right Superscript"; [p] (pause:200)',
      'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
      'count(../../preceding-sibling::*)=4');
};

});  // goog.scope
