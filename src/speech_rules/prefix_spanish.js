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

goog.provide('sre.PrefixSpanish');

goog.require('sre.DomUtil');
goog.require('sre.MathStore');
goog.require('sre.MathspeakUtil');



/**
 * Rule initialization.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.PrefixSpanish = function() {
  sre.PrefixSpanish.base(this, 'constructor');

  this.locale = 'es';
  this.modality = 'prefix';
};
goog.inherits(sre.PrefixSpanish, sre.MathStore);
goog.addSingletonGetter(sre.PrefixSpanish);


/**
 * @type {sre.MathStore}
 */
sre.PrefixSpanish.mathStore = sre.PrefixSpanish.getInstance();


/** @private */
sre.PrefixSpanish.defineRule_ = goog.bind(
    sre.PrefixSpanish.mathStore.defineRule,
    sre.PrefixSpanish.mathStore);


/** @private */
sre.PrefixSpanish.defineRuleAlias_ = goog.bind(
    sre.PrefixSpanish.mathStore.defineRulesAlias,
    sre.PrefixSpanish.mathStore);


/** @private */
sre.PrefixSpanish.addCustomString_ = goog.bind(
    sre.PrefixSpanish.mathStore.customStrings.add,
    sre.PrefixSpanish.mathStore.customStrings);


/**
 * String function to turn a child position into an ordinal.
 * @param {!Node} node The node for the string function.
 * @return {string} The ordinal string corresponding to the child position of
 *     the node.
 */
sre.PrefixSpanish.ordinalPosition = function(node) {
  var children = sre.DomUtil.toArray(node.parentNode.childNodes);
  var gender = /** @type{string} */(
      sre.Grammar.getInstance().getParameter('gender'));
  return sre.MathspeakSpanishUtil.simpleOrdinal(
      children.indexOf(node) + 1, gender).toString();
};


goog.scope(function() {
var defineRule = sre.PrefixSpanish.defineRule_;
var defineRuleAlias = sre.PrefixSpanish.defineRuleAlias_;
var addCSF = sre.PrefixSpanish.addCustomString_;


/**
 * Initialize the custom functions.
 * @private
 */
sre.PrefixSpanish.initCustomFunctions_ = function() {

  addCSF('CSFordinalPosition', sre.PrefixSpanish.ordinalPosition);

};


/**
 * Prefix rules.
 * @private
*/
sre.PrefixSpanish.initPrefixSpanish_ = function() {
  defineRule(
      'numerator', 'default.default',
      '[t] "numerador"; [p] (pause:200)',
      'self::*', 'name(../..)="fraction"',
      'count(preceding-sibling::*)=0');
  defineRule(
      'denominator', 'default.default',
      '[t] "denominador"; [p] (pause:200)',
      'self::*', 'name(../..)="fraction"',
      'count(preceding-sibling::*)=1');
  defineRule(
      'base', 'default.default',
      '[t] "base"; [p] (pause:200)',
      'self::*', 'name(../..)="superscript" or name(../..)="subscript"' +
      ' or name(../..)="overscore" or name(../..)="underscore"' +
      ' or name(../..)="tensor"',
      'count(preceding-sibling::*)=0');
  defineRule(
      'exponent', 'default.default',
      '[t] "exponente"; [p] (pause:200)',
      'self::*', 'name(../..)="superscript"',
      'count(preceding-sibling::*)=1');
  defineRule(
      'subscript', 'default.default',
      '[t] "subíndice"; [p] (pause:200)',
      'self::*', 'name(../..)="subscript"',
      'count(preceding-sibling::*)=1');
  defineRule(
      'overscript', 'default.default',
      '[t] "sobreíndice"; [p] (pause:200)',
      'self::*', 'name(../..)="overscore"',
      'count(preceding-sibling::*)=1');
  defineRule(
      'underscript', 'default.default',
      '[t] "bajoíndice"; [p] (pause:200)',
      'self::*', 'name(../..)="underscore"',
      'count(preceding-sibling::*)=1');
  defineRule(
      'radicand', 'default.default',
      '[t] "radicand"; [p] (pause:200)',
      'self::*', 'name(../..)="sqrt"');
  defineRule(
      'radicand', 'default.default',
      '[t] "radicand"; [p] (pause:200)',
      'self::*', 'name(../..)="root"',
      'count(preceding-sibling::*)=1');
  defineRule(
      'index', 'default.default',
      '[t] "índice"; [p] (pause:200)',
      'self::*', 'name(../..)="root"',
      'count(preceding-sibling::*)=0');
  defineRule(
      'leftsub', 'default.default',
      '[t] "subíndice izquierdo"; [p] (pause:200)',
      'self::*', 'name(../..)="tensor"',
      '@role="leftsub"');
  defineRule(
      'leftsub', 'default.default',
      '[t] CSFordinalPosition (grammar:gender="male"); ' +
      '[t] "subíndice izquierdo"; [p] (pause:200)',
      'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
      '../../@role="leftsub"');
  defineRule(
      'leftsuper', 'default.default',
      '[t] "superíndice izquierdo"; [p] (pause:200)',
      'self::*', 'name(../..)="tensor"',
      '@role="leftsuper"');
  defineRule(
      'leftsuper', 'default.default',
      '[t] CSFordinalPosition (grammar:gender="male"); ' +
      '[t] "superíndice izquierdo"; [p] (pause:200)',
      'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
      '../../@role="leftsuper"');
  defineRule(
      'rightsub', 'default.default',
      '[t] "subíndice derecho"; [p] (pause:200)',
      'self::*', 'name(../..)="tensor"',
      '@role="rightsub"');
  defineRule(
      'rightsub', 'default.default',
      '[t] CSFordinalPosition (grammar:gender="male"); ' +
      '[t] "subíndice derecho"; [p] (pause:200)',
      'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
      '../../@role="rightsub"');
  defineRule(
      'rightsuper', 'default.default',
      '[t] "superíndice derecho"; [p] (pause:200)',
      'self::*', 'name(../..)="tensor"',
      '@role="rightsuper"');
  defineRule(
      'rightsuper', 'default.default',
      '[t] CSFordinalPosition (grammar:gender="male"); ' +
      '[t] "superíndice derecho"; [p] (pause:200)',
      'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
      '../../@role="rightsuper"');
  defineRule(
      'choice', 'default.default',
      '[t] "cantidad de elección"; [p] (pause:200)',
      'self::line', '@role="binomial"', 'parent::*/parent::vector',
      'count(preceding-sibling::*)=0');
  defineRule(
      'select', 'default.default',
      '[t] "cantidad de selección"; [p] (pause:200)',
      'self::line', '@role="binomial"', 'parent::*/parent::vector',
      'count(preceding-sibling::*)=1');

  // Positions in tables
  defineRule(
      'row', 'default.default',
      '[t] CSFordinalPosition (grammar:gender="female");' +
      ' [t] "fila"; [p] (pause:200)',
      'self::row'
  );
  defineRuleAlias(
      'row', 'self::line'
  );
  defineRule(
      'cell', 'default.default',
      '[n] ../..; [t] CSFordinalPosition (grammar:gender="female");' +
      ' [t] "columna"; [p] (pause:200)',
      'self::cell', 'contains(@grammar,"depth")'
  );
  defineRule(
      'cell', 'default.default',
      '[t] CSFordinalPosition (grammar:gender="female"); ' +
      '[t] "columna"; [p] (pause:200)',
      'self::cell'
  );
};

});  // goog.scope


sre.PrefixSpanish.getInstance().initializer = [
  sre.PrefixSpanish.initCustomFunctions_,
  sre.PrefixSpanish.initPrefixSpanish_
];
