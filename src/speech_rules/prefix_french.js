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

goog.provide('sre.PrefixFrench');

goog.require('sre.DomUtil');
goog.require('sre.MathStore');
goog.require('sre.MathspeakUtil');



/**
 * Rule initialization.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.PrefixFrench = function() {
  sre.PrefixFrench.base(this, 'constructor');

  this.locale = 'fr';
  this.modality = 'prefix';
};
goog.inherits(sre.PrefixFrench, sre.MathStore);
goog.addSingletonGetter(sre.PrefixFrench);


/**
 * @type {sre.MathStore}
 */
sre.PrefixFrench.mathStore = sre.PrefixFrench.getInstance();


/** @private */
sre.PrefixFrench.defineRule_ = goog.bind(
    sre.PrefixFrench.mathStore.defineRule,
    sre.PrefixFrench.mathStore);


/** @private */
sre.PrefixFrench.defineRuleAlias_ = goog.bind(
    sre.PrefixFrench.mathStore.defineRulesAlias,
    sre.PrefixFrench.mathStore);


/** @private */
sre.PrefixFrench.addCustomString_ = goog.bind(
    sre.PrefixFrench.mathStore.customStrings.add,
    sre.PrefixFrench.mathStore.customStrings);


/**
 * String function to turn a child position into an ordinal.
 * @param {!Node} node The node for the string function.
 * @return {string} The ordinal string corresponding to the child position of
 *     the node.
 */
sre.PrefixFrench.ordinalPosition = function(node) {
  var children = sre.DomUtil.toArray(node.parentNode.childNodes);
  return sre.Messages.NUMBERS.simpleOrdinal(children.indexOf(node) + 1).toString();
  // TODO: redo gender
  // var gender = /** @type{string} */(
  //     sre.Grammar.getInstance().getParameter('gender'));
  // return sre.MathspeakFrenchUtil.simpleOrdinal(
  //     children.indexOf(node) + 1, gender).toString();
};


goog.scope(function() {
var defineRule = sre.PrefixFrench.defineRule_;
var defineRuleAlias = sre.PrefixFrench.defineRuleAlias_;
var addCSF = sre.PrefixFrench.addCustomString_;


/**
 * Initialize the custom functions.
 * @private
 */
sre.PrefixFrench.initCustomFunctions_ = function() {

  addCSF('CSFordinalPosition', sre.PrefixFrench.ordinalPosition);

};


/**
 * Prefix rules.
 * @private
*/
sre.PrefixFrench.initPrefixFrench_ = function() {
  defineRule(
      'numerator', 'default.default',
      '[t] "numérateur"; [p] (pause:200)',
      'self::*', 'name(../..)="fraction"',
      'count(preceding-sibling::*)=0');
  defineRule(
      'denominator', 'default.default',
      '[t] "dénominateur"; [p] (pause:200)',
      'self::*', 'name(../..)="fraction"',
      'count(preceding-sibling::*)=1');
  defineRule(
      'base', 'default.default',
      '[t] "base"; [p] (pause:200)',
      'self::*', 'name(../..)="superscript" or name(../..)="subscript"' +
      ' or name(../..)="overscore" or name(../..)="underscore"' +
      ' or name(../..)="tensor" or name(../..)="limlower"' +
      ' or name(../..)="limupper"',
      'count(preceding-sibling::*)=0');
  defineRule( // New Additions
      'base-limit', 'default.default',
      '[t] "base"; [p] (pause:200)',
      'self::*', 'name(../..)="limboth"');
  defineRule(
      'exponent', 'default.default',
      '[t] "exposant"; [p] (pause:200)',
      'self::*', 'name(../..)="superscript"',
      'count(preceding-sibling::*)=1');
  defineRule(
      'subscript', 'default.default',
      '[t] "indice"; [p] (pause:200)',
      'self::*', 'name(../..)="subscript"',
      'count(preceding-sibling::*)=1');
  defineRule( // NEW additions!
      'overscript', 'default.default',
      '[t] "indice suscrit"; [p] (pause:200)',
      'self::*', 'name(../..)="overscore" or name(../..)="limupper" or name(../..)="limboth"',
      'count(preceding-sibling::*)=1 or count(preceding-sibling::*)=2');  // check this final disjunctive constraint
  defineRule( // NEW additions!
      'underscript', 'default.default',
      '[t] "indice souscrit"; [p] (pause:200)',
      'self::*', 'name(../..)="underscore" or name(../..)="limlower" or name(../..)="limboth"',
      'count(preceding-sibling::*)=1');
  defineRule(
      'radicand', 'default.default',
      '[t] "radicande"; [p] (pause:200)',
      'self::*', 'name(../..)="sqrt"');
  defineRule(
      'radicand', 'default.default',
      '[t] "radicande"; [p] (pause:200)',
      'self::*', 'name(../..)="root"',
      'count(preceding-sibling::*)=1');
  defineRule(
      'index', 'default.default',
      '[t] "indice"; [p] (pause:200)',
      'self::*', 'name(../..)="root"',
      'count(preceding-sibling::*)=0');
  defineRule(
      'leftsub', 'default.default',
      '[t] "indice inférieur gauche"; [p] (pause:200)',
      'self::*', 'name(../..)="tensor"',
      '@role="leftsub"');
  defineRule(
      'leftsub', 'default.default',
      '[t] CSFordinalPosition (grammar:gender="male");' +
      ' [t] "indice inférieur gauche"; [p] (pause:200)',
      'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
      '../../@role="leftsub"');
  defineRule(
      'leftsuper', 'default.default',
      '[t] "indice supérieur gauche"; [p] (pause:200)',
      'self::*', 'name(../..)="tensor"',
      '@role="leftsuper"');
  defineRule(
      'leftsuper', 'default.default',
      '[t] CSFordinalPosition (grammar:gender="male");' +
      ' [t] "indice supérieur gauche"; [p] (pause:200)',
      'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
      '../../@role="leftsuper"');
  defineRule(
      'rightsub', 'default.default',
      '[t] "indice inférieur droite"; [p] (pause:200)',
      'self::*', 'name(../..)="tensor"',
      '@role="rightsub"');
  defineRule(
      'rightsub', 'default.default',
      '[t] CSFordinalPosition (grammar:gender="male");' +
      ' [t] "indice inférieur droite"; [p] (pause:200)',
      'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
      '../../@role="rightsub"');
  defineRule(
      'rightsuper', 'default.default',
      '[t] "indice supérieur droite"; [p] (pause:200)',
      'self::*', 'name(../..)="tensor"',
      '@role="rightsuper"');
  defineRule(
      'rightsuper', 'default.default',
      '[t] CSFordinalPosition (grammar:gender="male");' +
      ' [t] "indice supérieur droite"; [p] (pause:200)',
      'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
      '../../@role="rightsuper"');
  defineRule(
      'choice', 'default.default',
      '[t] "nombre d\'éléments choisis"; [p] (pause:200)',
      'self::line', '@role="binomial"', 'parent::*/parent::vector',
      'count(preceding-sibling::*)=1');
  defineRule(
      'select', 'default.default',
      '[t] "nombre d\'éléments disponibles"; [p] (pause:200)',
      'self::line', '@role="binomial"', 'parent::*/parent::vector',
      'count(preceding-sibling::*)=0');

  // Positions in tables
  defineRule(
      'row', 'default.default',
      '[t] CSFordinalPosition (grammar:gender="female");' +
      ' [t] "rangée"; [p] (pause:200)',
      'self::row'
  );
  defineRuleAlias(
      'row', 'self::line'
  );
  defineRule(
      'cell', 'default.default',
      '[n] ../..; [t] CSFordinalPosition (grammar:gender="female"); ' +
      '[t] "colonne"; [p] (pause:200)',
      'self::cell', 'contains(@grammar,"depth")'
  );
  defineRule(
      'cell', 'default.default',
      '[t] CSFordinalPosition (grammar:gender="female"); ' +
      '[t] "colonne"; [p] (pause:200)',
      'self::cell'
  );
};

});  // goog.scope


sre.PrefixFrench.getInstance().initializer = [
  sre.PrefixFrench.initCustomFunctions_,
  sre.PrefixFrench.initPrefixFrench_
];

// TODO: Brief rules for indices:
// IndInfDroit, IndInfGauche, IndSupDroit, IndSupGauche,
//

