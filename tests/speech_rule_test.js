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
 * @fileoverview Testcases for math speech rules.
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.SpeechRuleTest');

goog.require('sre.AbstractTest');



/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.SpeechRuleTest = function() {
  sre.SpeechRuleTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Speech rule tests.';
};
goog.inherits(sre.SpeechRuleTest, sre.AbstractTest);


/** Test objects for structural equality using JSON, otherwise use
 * normal equality.
 * @param {*} expected Expected value.
 * @param {*} actual The actual computed value.
 * @return {boolean}
 */
sre.SpeechRuleTest.prototype.assertStructEquals =
    function(expected, actual) {
  if ((typeof(expected) == 'object' && typeof(actual) == 'object')) {
    return this.assert.deepEqual(JSON.stringify(expected),
        JSON.stringify(actual));
  }
  return this.assert.deepEqual(expected, actual);
};


/** Test speech rule attributes.
 * @export
 */
sre.SpeechRuleTest.prototype.testAttributes = function() {
  this.assertStructEquals(
       {'ctxtfunc': 'element',
        'separator': '"plus"',
        'volume': '0.5'},
      sre.SpeechRule.Component.attributesFromString(
        '(ctxtfunc:element,separator:"plus", volume:0.5)'));
  this.assertStructEquals(
      {'context': '"node"',
       'pitch': '0.5',
       'difference': 'true'},
      sre.SpeechRule.Component.attributesFromString(
        '(context:"node",pitch:0.5,difference)'));
  this.assertStructEquals(
      {'context': '"node"',
       'grammar': {
         'font': true,
         'annotation': '"unit"'
       }
      },
      sre.SpeechRule.Component.attributesFromString(
        '(context:"node",grammar:font:annotation="unit")'));
};


/** Test simple speech rule components.
 * @export
 */
sre.SpeechRuleTest.prototype.testSimpleComponents = function() {
  this.assertStructEquals(
      {'type': sre.SpeechRule.Type.MULTI,
        'content': './*'},
      sre.SpeechRule.Component.fromString('[m] ./*'));
  this.assertStructEquals(
      {'type': sre.SpeechRule.Type.NODE,
        'content': './*[1]'},
      sre.SpeechRule.Component.fromString('[n] ./*[1]'));
  this.assertStructEquals(
      {'type': sre.SpeechRule.Type.PERSONALITY,
        'attributes': {'pause': '200'}},
      sre.SpeechRule.Component.fromString('[p] (pause:200)'));
  this.assertStructEquals(
      {'type': sre.SpeechRule.Type.TEXT,
        'content': '"super"'},
      sre.SpeechRule.Component.fromString('[t] "super"'));
  this.assertStructEquals(
      {'type': sre.SpeechRule.Type.TEXT,
        'content': 'text()'},
      sre.SpeechRule.Component.fromString('[t] text()'));
};


/** Test speech rule components with attributes.
 * @export
 */
sre.SpeechRuleTest.prototype.testComplexComponents = function() {
  this.assertStructEquals(
      {'type': sre.SpeechRule.Type.MULTI,
        'content': './*',
        'ctxtfunc': 'element',
        'separator': '"plus"',
        'volume': '0.5'},
      sre.SpeechRule.Component.fromString(
          '[m] ./* (ctxtfunc:element,separator:"plus", volume:0.5)'));
  this.assertStructEquals(
      {'type': sre.SpeechRule.Type.NODE,
        'content': './*[1]',
        'context': '"node"',
        'pitch': '0.5'},
      sre.SpeechRule.Component.fromString(
          '[n] ./*[1] (context:"node",pitch:0.5)'));
};


/** Test speech rules.
 * @export
 */
sre.SpeechRuleTest.prototype.testRules = function() {
  this.assertStructEquals(
      [
        {'type': sre.SpeechRule.Type.TEXT,
         'content': '"Square root of"'},
        {'type': sre.SpeechRule.Type.NODE,
         'content': './*[1]',
         'rate': '0.2'},
        {'type': sre.SpeechRule.Type.PERSONALITY,
         'pause': '400'}
      ],
      sre.SpeechRule.Action.fromString(
          '[t] "Square root of"; [n] ./*[1] (rate:0.2); [p] (pause:400)')
      .components
  );

  this.assertStructEquals(
      [
        {'type': sre.SpeechRule.Type.NODE,
         'content': './*[1]/*[1]/*[1]'},
        {'type': sre.SpeechRule.Type.TEXT,
         'content': '"sub"'},
        {'type': sre.SpeechRule.Type.NODE,
         'content': './*[1]/*[3]/*[1]',
         'pitch': '-0.35'},
        {'type': sre.SpeechRule.Type.PERSONALITY,
         'pause': '200'},
        {'type': sre.SpeechRule.Type.TEXT,
         'content': '"super"'},
        {'type': sre.SpeechRule.Type.NODE,
         'content': './*[1]/*[2]/*[1]',
         'pitch': '0.35'},
        {'type': sre.SpeechRule.Type.PERSONALITY,
         'pause': '300'}
      ],
      sre.SpeechRule.Action.fromString(
          '[n] ./*[1]/*[1]/*[1]; [t] "sub"; [n] ./*[1]/*[3]/*[1] ' +
          '(pitch:-0.35) ;[p](pause:200); [t] "super";' +
          '[n] ./*[1]/*[2]/*[1] (pitch:0.35) ;  [p] (pause:300)   ').components
  );
};


/** Test translation of speech rule attributes.
 * @export
 */
sre.SpeechRuleTest.prototype.testAttributesString = function() {
  this.assertStructEquals(
      ['context:"node"', 'pitch:0.5'],
      sre.SpeechRule.Component.fromString(
          '[n] ./ (context:"node", pitch:0.5)').getAttributes());

  this.assertStructEquals(
      ['ctxtfunc:element', 'separator:"plus"', 'volume:0.5'],
      sre.SpeechRule.Component.fromString(
          '[t] "irrelevant" (ctxtfunc:element,' +
              'separator:"plus",' +
                  'volume:0.5)').getAttributes());
};


/** Test translation of simple speech rule components.
 * @export
 */
sre.SpeechRuleTest.prototype.testSimpleComponentsString = function() {
  this.assertStructEquals(
      '[m] ./*',
      sre.SpeechRule.Component.fromString('[m] ./*').toString());

  this.assertStructEquals(
      '[n] ./*[1]',
      sre.SpeechRule.Component.fromString('[n] ./*[1]').toString());

  this.assertStructEquals(
      '[p] (pause:200)',
      sre.SpeechRule.Component.fromString('[p] (pause:200)').toString());

  this.assertStructEquals(
      '[t] "super"',
      sre.SpeechRule.Component.fromString('[t] "super"').toString());

  this.assertStructEquals(
      '[t] text()',
      sre.SpeechRule.Component.fromString('[t] text()').toString());
};


/** Test translation of speech rule components with attributes.
 * @export
 */
sre.SpeechRuleTest.prototype.testComplexComponentsString = function() {
  var comp1 = '[m] ./* (ctxtfunc:element, separator:"plus", volume:0.5)';
  this.assertStructEquals(comp1,
      sre.SpeechRule.Component.fromString(comp1).toString());

  var comp2 = '[n] ./*[1] (context:"node", pitch:0.5)';
  this.assertStructEquals(comp2,
      sre.SpeechRule.Component.fromString(comp2).toString());
};


/** Test translation of speech rules.
 * @export
 */
sre.SpeechRuleTest.prototype.testRulesString = function() {
  var rule1 = '[t] "Square root of"; [n] ./*[1] (rate:0.2); [p] (pause:400)';
  this.assertStructEquals(rule1,
      sre.SpeechRule.Action.fromString(rule1).toString());

  var rule2 =
      '[n] ./*[1]/*[1]/*[1]; [t] "sub"; [n] ./*[1]/*[3]/*[1] ' +
      '(pitch:-0.35); [p] (pause:200); [t] "super";' +
      ' [n] ./*[1]/*[2]/*[1] (pitch:0.35); [p] (pause:300)';
  this.assertStructEquals(rule2,
      sre.SpeechRule.Action.fromString(rule2).toString());
};


/** Tests for double quoted string syntax.
 * @export
 */
sre.SpeechRuleTest.prototype.testSeparatorsInStrings = function() {
  var rule1 = '[t] "matrix; 3 by 3"; [n] ./*[1]';
  this.assertStructEquals(
      rule1, sre.SpeechRule.Action.fromString(rule1).toString());

  var rule2 = '[t] "matrix; 3;""by 3"; [n] ./*[1]';
  this.assertStructEquals(
      rule2, sre.SpeechRule.Action.fromString(rule2).toString());

  var rule3 = '[t] "matrix; by 3"; [n] ./*[1] ' +
              '(context:"where, who; why, when", separator:@separator)';
  var sprule3 = sre.SpeechRule.Action.fromString(rule3);
  this.assertStructEquals(rule3, sprule3.toString());
  this.assert.equal('[t] "matrix; by 3"', sprule3.components[0].toString());
  this.assert.equal('"where, who; why, when"',
                    sprule3.components[1]['context']);
};
