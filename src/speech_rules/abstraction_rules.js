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
 * @fileoverview Abstraction rules for collapsed elements.
 * @author v.sorge@mathjax.com (Volker Sorge)
 */

goog.provide('sre.AbstractionRules');

goog.require('sre.MathStore');
goog.require('sre.MathmlStore');
goog.require('sre.MathspeakUtil');
goog.require('sre.StoreUtil');



/**
 * Rule initialization.
 * @constructor
 */
sre.AbstractionRules = function() {
  sre.AbstractionRules.initCustomFunctions_();
  sre.AbstractionRules.initAbstractionRules_();
};
goog.addSingletonGetter(sre.AbstractionRules);


/**
 * @type {sre.MathStore}
 */
sre.AbstractionRules.mathStore = sre.MathmlStore.getInstance();


/** @private */
sre.AbstractionRules.defineRule_ = goog.bind(
    sre.AbstractionRules.mathStore.defineRule,
    sre.AbstractionRules.mathStore);


goog.scope(function() {
var defineRule = sre.AbstractionRules.defineRule_;

/**
 * Abstraction rules.
 * @private
*/
sre.AbstractionRules.initAbstractionRules_ = function() {
  //TODO: Need some means to prioritise these rules over other rules.
  defineRule(
    'abstr-identifier', 'mathspeak.default',
    '[t] "long identifier"',
    'self::identifier[@alternative]',
    'self::*', 'self::*', 'self::*', 'self::*', 'self::*'
  );
  defineRule(
    'abstr-identifier', 'mathspeak.short',
    '[t] "identifier"',
    'self::identifier[@alternative]',
    'self::*', 'self::*', 'self::*', 'self::*', 'self::*'
  );

  defineRule(
    'abstr-number', 'mathspeak.default',
    '[t] "long number"',
    'self::number[@alternative]'
  );
  defineRule(
    'abstr-number', 'mathspeak.short',
    '[t] "number"',
    'self::number[@alternative]'
  );
  defineRule(
    'abstr-mixed-number', 'mathspeak.default',
    '[t] "long mixed number"',
    'self::number[@alternative]', '@role="mixed"'
  );
  defineRule(
    'abstr-mixed-number', 'mathspeak.short',
    '[t] "mixed number"',
    'self::number[@alternative]', '@role="mixed"'
  );

  defineRule(
    'abstr-text', 'mathspeak.default',
    '[t] "text"',
    'self::text[@alternative]'
  );
  defineRule(
    'abstr-appl', 'mathspeak.default',
    '[t] "appl"',
    'self::appl[@alternative]'
  );
  defineRule(
    'abstr-function', 'mathspeak.default',
    '[t] "function"',
    'self::function[@alternative]'
  );
  defineRule(
    'abstr-default', 'mathspeak.default',
    '[t] "default"',
    'self::default[@alternative]'
  );
  defineRule(
    'abstr-fraction', 'mathspeak.default',
    '[t] "fraction"',
    'self::fraction[@alternative]'
  );
  defineRule(
    'abstr-sqrt', 'mathspeak.default',
    '[t] "sqrt"',
    'self::sqrt[@alternative]'
  );
  defineRule(
    'abstr-root', 'mathspeak.default',
    '[t] "root"',
    'self::root[@alternative]'
  );
  defineRule(
    'abstr-superscript', 'mathspeak.default',
    '[t] "superscript"',
    'self::superscript[@alternative]'
  );
  defineRule(
    'abstr-subscript', 'mathspeak.default',
    '[t] "subscript"',
    'self::subscript[@alternative]'
  );
  defineRule(
    'abstr-subsup', 'mathspeak.default',
    '[t] "subsup"',
    'self::subsup[@alternative]'
  );
  defineRule(
    'abstr-vector', 'mathspeak.default',
    '[t] "vector"',
    'self::vector[@alternative]'
  );
  defineRule(
    'abstr-binomial', 'mathspeak.default',
    '[t] "binomial"',
    'self::binomial[@alternative]'
  );
  defineRule(
    'abstr-determinant', 'mathspeak.default',
    '[t] "determinant"',
    'self::determinant[@alternative]'
  );
  defineRule(
    'abstr-default', 'mathspeak.default',
    '[t] "default"',
    'self::default[@alternative]'
  );
  defineRule(
    'abstr-matrix', 'mathspeak.default',
    '[t] "matrix"',
    'self::matrix[@alternative]'
  );
  defineRule(
    'abstr-squarematrix', 'mathspeak.default',
    '[t] "squarematrix"',
    'self::squarematrix[@alternative]'
  );
  defineRule(
    'abstr-rowvector', 'mathspeak.default',
    '[t] "rowvector"',
    'self::rowvector[@alternative]'
  );
  defineRule(
    'abstr-columnvector', 'mathspeak.default',
    '[t] "columnvector"',
    'self::columnvector[@alternative]'
  );
  defineRule(
    'abstr-determinant', 'mathspeak.default',
    '[t] "determinant"',
    'self::determinant[@alternative]'
  );
  defineRule(
    'abstr-cases', 'mathspeak.default',
    '[t] "cases"',
    'self::cases[@alternative]'
  );
  defineRule(
    'abstr-infixop', 'mathspeak.default',
    '[t] @role',
    'self::infixop[@alternative]', '*', '*'
  );
  defineRule(
    'abstr-addition', 'mathspeak.default',
    '[t] "addition"',
    'self::addition[@alternative]'
  );
  defineRule(
    'abstr-subtraction', 'mathspeak.default',
    '[t] "subtraction"',
    'self::subtraction[@alternative]'
  );
  defineRule(
    'abstr-multiplication', 'mathspeak.default',
    '[t] "multiplication"',
    'self::multiplication[@alternative]'
  );
  defineRule(
    'abstr-implicit', 'mathspeak.default',
    '[t] "implicit"',
    'self::implicit[@alternative]'
  );
  defineRule(
    'abstr-punctuated', 'mathspeak.default',
    '[t] "punctuated"',
    'self::punctuated[@alternative]'
  );
  defineRule(
    'abstr-text', 'mathspeak.default',
    '[t] "text"',
    'self::text[@alternative]'
  );
  defineRule(
    'abstr-default', 'mathspeak.default',
    '[t] "default"',
    'self::default[@alternative]'
  );
  
};
  
});  // goog.scope
