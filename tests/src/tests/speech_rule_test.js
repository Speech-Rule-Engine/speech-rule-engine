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

goog.provide('sretest.SpeechRuleTest');

goog.require('sretest.AbstractTest');



/**
 * @constructor
 * @extends {sretest.AbstractTest}
 */
sretest.SpeechRuleTest = function() {
  sretest.SpeechRuleTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Speech rule tests.';
};
goog.inherits(sretest.SpeechRuleTest, sretest.AbstractTest);


/** Test objects for structural equality using JSON, otherwise use
 * normal equality.
 * @param {*} expected Expected value.
 * @param {*} actual The actual computed value.
 * @return {boolean}
 */
sretest.SpeechRuleTest.prototype.assertStructEquals =
    function(expected, actual) {
  if ((typeof(expected) == 'object' && typeof(actual) == 'object')) {
    return this.assert.deepEqual(JSON.stringify(expected),
        JSON.stringify(actual));
  }
  return this.assert.deepEqual(expected, actual);
};


/** Test speech rule grammar annotations.
 * @export
 */
sretest.SpeechRuleTest.prototype.testGrammar = function() {
  this.assertStructEquals(
      {'font': true,
        'annotation': '"unit"'
      },
      sretest.TestExternal.sre.SpeechRule.Component.grammarFromString(
      'font:annotation="unit"'));
  this.assertStructEquals(
      {'font': false,
        'annotation': '@unit'
      },
      sretest.TestExternal.sre.SpeechRule.Component.grammarFromString(
      '!font:annotation=@unit'));
  // Whitespace test.
  this.assertStructEquals(
      {'font': false,
        'annotation': '@unit'
      },
      sretest.TestExternal.sre.SpeechRule.Component.grammarFromString(
      ' !font : annotation = @unit '));
};


/** Test speech rule attributes.
 * @export
 */
sretest.SpeechRuleTest.prototype.testAttributes = function() {
  this.assertStructEquals(
      {'ctxtfunc': 'element',
        'separator': '"plus"',
        'volume': '0.5'},
      sretest.TestExternal.sre.SpeechRule.Component.attributesFromString(
      '(ctxtfunc:element,separator:"plus", volume:0.5)'));
  this.assertStructEquals(
      {'context': '"node"',
        'pitch': '0.5',
        'difference': 'true'},
      sretest.TestExternal.sre.SpeechRule.Component.attributesFromString(
      '(context:"node",pitch:0.5,difference)'));
  this.assertStructEquals(
      {'context': '"node"',
        'grammar': {
          'font': true,
          'annotation': '"unit"'
        }
      },
      sretest.TestExternal.sre.SpeechRule.Component.attributesFromString(
      '(context:"node",grammar:font:annotation="unit")'));
  this.assertStructEquals(
      {'grammar': {
        'font': true,
        'annotation': '"unit"'
      }
      },
      sretest.TestExternal.sre.SpeechRule.Component.attributesFromString(
      '(grammar:font:annotation="unit")'));
  // Whitespace test.
  this.assertStructEquals(
      {'context': '"node"',
        'pitch': '0.5',
        'difference': 'true'},
      sretest.TestExternal.sre.SpeechRule.Component.attributesFromString(
      '( context : "node" , pitch : 0.5 , difference )'));
};


/** Test simple speech rule components.
 * @export
 */
sretest.SpeechRuleTest.prototype.testSimpleComponents = function() {
  this.assertStructEquals(
      {'type': sretest.TestExternal.sre.SpeechRule.Type.MULTI,
        'content': './*'},
      sretest.TestExternal.sre.SpeechRule.Component.fromString('[m] ./*'));
  this.assertStructEquals(
      {'type': sretest.TestExternal.sre.SpeechRule.Type.NODE,
        'content': './*[1]'},
      sretest.TestExternal.sre.SpeechRule.Component.fromString('[n] ./*[1]'));
  this.assertStructEquals(
      {'type': sretest.TestExternal.sre.SpeechRule.Type.PERSONALITY,
        'attributes': {'pause': '200'}},
      sretest.TestExternal.sre.SpeechRule.Component.fromString('[p] (pause:200)'));
  this.assertStructEquals(
      {'type': sretest.TestExternal.sre.SpeechRule.Type.TEXT,
        'content': '"super"'},
      sretest.TestExternal.sre.SpeechRule.Component.fromString('[t] "super"'));
  this.assertStructEquals(
      {'type': sretest.TestExternal.sre.SpeechRule.Type.TEXT,
        'content': 'text()'},
      sretest.TestExternal.sre.SpeechRule.Component.fromString('[t] text()'));
};


/** Test speech rule components with attributes.
 * @export
 */
sretest.SpeechRuleTest.prototype.testComplexComponents = function() {
  this.assertStructEquals(
      {'type': sretest.TestExternal.sre.SpeechRule.Type.MULTI,
        'content': './*',
        'attributes': {
          'ctxtfunc': 'element',
          'separator': '"plus"',
          'volume': '0.5'}},
      sretest.TestExternal.sre.SpeechRule.Component.fromString(
          '[m] ./* (ctxtfunc:element,separator:"plus", volume:0.5)'));
  this.assertStructEquals(
      {'type': sretest.TestExternal.sre.SpeechRule.Type.NODE,
        'content': './*[1]',
        'attributes': {
          'context': '"node"',
          'pitch': '0.5'}},
      sretest.TestExternal.sre.SpeechRule.Component.fromString(
          '[n] ./*[1] (context:"node",pitch:0.5)'));
  this.assertStructEquals(
      {'type': sretest.TestExternal.sre.SpeechRule.Type.NODE,
        'content': './*[1]',
        'attributes': {
          'context': '"node"'},
        'grammar': {
          'font': true,
          'annotation': '"unit"'
        }},
      sretest.TestExternal.sre.SpeechRule.Component.fromString(
          '[n] ./*[1] (context:"node",grammar:font:annotation="unit")'));
  this.assertStructEquals(
      {'type': sretest.TestExternal.sre.SpeechRule.Type.NODE,
        'content': './*[1]',
        'grammar': {
          'font': true,
          'annotation': '"unit"'
        }},
      sretest.TestExternal.sre.SpeechRule.Component.fromString(
          '[n] ./*[1] (grammar:font:annotation="unit")'));
};


/** Test speech rules.
 * @export
 */
sretest.SpeechRuleTest.prototype.testRules = function() {
  this.assertStructEquals(
      [
        {'type': sretest.TestExternal.sre.SpeechRule.Type.TEXT,
         'content': '"Square root of"'},
        {'type': sretest.TestExternal.sre.SpeechRule.Type.NODE,
         'content': './*[1]',
          'attributes': {
            'rate': '0.2'}},
        {'type': sretest.TestExternal.sre.SpeechRule.Type.PERSONALITY,
         'attributes': {
           'pause': '400'}}
      ],
      sretest.TestExternal.sre.SpeechRule.Action.fromString(
          '[t] "Square root of"; [n] ./*[1] (rate:0.2); [p] (pause:400)')
      .components
  );

  this.assertStructEquals(
      [
        {'type': sretest.TestExternal.sre.SpeechRule.Type.NODE,
         'content': './*[1]/*[1]/*[1]'},
        {'type': sretest.TestExternal.sre.SpeechRule.Type.TEXT,
         'content': '"sub"'},
        {'type': sretest.TestExternal.sre.SpeechRule.Type.NODE,
         'content': './*[1]/*[3]/*[1]',
         'attributes': {
           'pitch': '-0.35'}},
        {'type': sretest.TestExternal.sre.SpeechRule.Type.PERSONALITY,
         'attributes': {
           'pause': '200'}},
        {'type': sretest.TestExternal.sre.SpeechRule.Type.TEXT,
         'content': '"super"'},
        {'type': sretest.TestExternal.sre.SpeechRule.Type.NODE,
         'content': './*[1]/*[2]/*[1]',
         'attributes': {
           'pitch': '0.35'}},
        {'type': sretest.TestExternal.sre.SpeechRule.Type.PERSONALITY,
         'attributes': {
           'pause': '300'}}
      ],
      sretest.TestExternal.sre.SpeechRule.Action.fromString(
          '[n] ./*[1]/*[1]/*[1]; [t] "sub"; [n] ./*[1]/*[3]/*[1] ' +
          '(pitch:-0.35) ;[p](pause:200); [t] "super";' +
          '[n] ./*[1]/*[2]/*[1] (pitch:0.35) ;  [p] (pause:300)   ').components
  );
};


/** Test translation of speech rule attributes.
 * @export
 */
sretest.SpeechRuleTest.prototype.testAttributesList = function() {
  this.assertStructEquals(
      ['context:"node"', 'pitch:0.5'],
      sretest.TestExternal.sre.SpeechRule.Component.fromString(
          '[n] ./ (context:"node", pitch:0.5)').getAttributes());

  this.assertStructEquals(
      ['ctxtfunc:element', 'separator:"plus"', 'volume:0.5'],
      sretest.TestExternal.sre.SpeechRule.Component.fromString(
          '[t] "irrelevant" (ctxtfunc:element,' +
              'separator:"plus",' +
                  'volume:0.5)').getAttributes());
};


/** Test speech rule grammar annotations.
 * @export
 */
sretest.SpeechRuleTest.prototype.testGrammarString = function() {
  var grammar1 = 'font:annotation="unit"';
  this.assertStructEquals(
      grammar1,
      sretest.TestExternal.sre.SpeechRule.Component.fromString('[p] (grammar:' + grammar1 + ')').
      grammarToString());
  var grammar2 = '!font:annotation=@unit';
  this.assertStructEquals(
      grammar2,
      sretest.TestExternal.sre.SpeechRule.Component.fromString('[p] (grammar:' + grammar2 + ')').
      grammarToString());
};


/** Test speech rule attributes.
 * @export
 */
sretest.SpeechRuleTest.prototype.testAttributesString = function() {
  var attrs1 = '(ctxtfunc:element, separator:"plus", volume:0.5)';
  this.assertStructEquals(
      attrs1,
      sretest.TestExternal.sre.SpeechRule.Component.fromString('[p] ' + attrs1).
      attributesToString());
  var attrs2 = '(context:"node", pitch:0.5, difference)';
  this.assertStructEquals(
      attrs2,
      sretest.TestExternal.sre.SpeechRule.Component.fromString('[p] ' + attrs2).
      attributesToString());
  var attrs3 = '(context:"node", grammar:font:annotation="unit")';
  this.assertStructEquals(
      attrs3,
      sretest.TestExternal.sre.SpeechRule.Component.fromString('[p] ' + attrs3).
      attributesToString());
  var attrs4 = '(grammar:font:annotation="unit")';
  this.assertStructEquals(
      attrs4,
      sretest.TestExternal.sre.SpeechRule.Component.fromString('[p] ' + attrs4).
      attributesToString());
};


/** Test translation of simple speech rule components.
 * @export
 */
sretest.SpeechRuleTest.prototype.testSimpleComponentsString = function() {
  this.assertStructEquals(
      '[m] ./*',
      sretest.TestExternal.sre.SpeechRule.Component.fromString('[m] ./*').toString());

  this.assertStructEquals(
      '[n] ./*[1]',
      sretest.TestExternal.sre.SpeechRule.Component.fromString('[n] ./*[1]').toString());

  this.assertStructEquals(
      '[p] (pause:200)',
      sretest.TestExternal.sre.SpeechRule.Component.fromString('[p] (pause:200)').toString());

  this.assertStructEquals(
      '[t] "super"',
      sretest.TestExternal.sre.SpeechRule.Component.fromString('[t] "super"').toString());

  this.assertStructEquals(
      '[t] text()',
      sretest.TestExternal.sre.SpeechRule.Component.fromString('[t] text()').toString());
};


/** Test translation of speech rule components with attributes.
 * @export
 */
sretest.SpeechRuleTest.prototype.testComplexComponentsString = function() {
  var comp1 = '[m] ./* (ctxtfunc:element, separator:"plus", volume:0.5)';
  this.assertStructEquals(comp1,
      sretest.TestExternal.sre.SpeechRule.Component.fromString(comp1).toString());

  var comp2 = '[n] ./*[1] (context:"node", pitch:0.5)';
  this.assertStructEquals(comp2,
      sretest.TestExternal.sre.SpeechRule.Component.fromString(comp2).toString());
  var comp3 = '[n] ./*[1] (context:"node", grammar:font:annotation="unit")';
  this.assertStructEquals(comp3,
      sretest.TestExternal.sre.SpeechRule.Component.fromString(comp3).toString());
  var comp4 = '[n] ./*[1] (grammar:font:annotation="unit")';
  this.assertStructEquals(comp4,
      sretest.TestExternal.sre.SpeechRule.Component.fromString(comp4).toString());
};


/** Test translation of speech rules.
 * @export
 */
sretest.SpeechRuleTest.prototype.testRulesString = function() {
  var rule1 = '[t] "Square root of"; [n] ./*[1] (rate:0.2); [p] (pause:400)';
  this.assertStructEquals(rule1,
      sretest.TestExternal.sre.SpeechRule.Action.fromString(rule1).toString());

  var rule2 =
      '[n] ./*[1]/*[1]/*[1]; [t] "sub"; [n] ./*[1]/*[3]/*[1] ' +
      '(pitch:-0.35); [p] (pause:200); [t] "super";' +
      ' [n] ./*[1]/*[2]/*[1] (pitch:0.35); [p] (pause:300)';
  this.assertStructEquals(rule2,
      sretest.TestExternal.sre.SpeechRule.Action.fromString(rule2).toString());
};


/** Tests for double quoted string syntax.
 * @export
 */
sretest.SpeechRuleTest.prototype.testSeparatorsInStrings = function() {
  var rule1 = '[t] "matrix; 3 by 3"; [n] ./*[1]';
  this.assertStructEquals(
      rule1, sretest.TestExternal.sre.SpeechRule.Action.fromString(rule1).toString());

  var rule2 = '[t] "matrix; 3;""by 3"; [n] ./*[1]';
  this.assertStructEquals(
      rule2, sretest.TestExternal.sre.SpeechRule.Action.fromString(rule2).toString());

  var rule3 = '[t] "matrix; by 3"; [n] ./*[1] ' +
              '(context:"where, who; why, when", separator:@separator)';
  var sprule3 = sretest.TestExternal.sre.SpeechRule.Action.fromString(rule3);
  this.assertStructEquals(rule3, sprule3.toString());
  this.assert.equal('[t] "matrix; by 3"', sprule3.components[0].toString());
  this.assert.equal('"where, who; why, when"',
                    sprule3.components[1].attributes['context']);
};
