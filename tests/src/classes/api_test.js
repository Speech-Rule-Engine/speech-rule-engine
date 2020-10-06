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
 * @fileoverview Tests of API functions.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sretest.ApiTest');

goog.require('sretest.AbstractJsonTest');



/**
 * @constructor
 * @extends {sretest.AbstractJsonTest}
 */
sretest.ApiTest = function() {
  sretest.ApiTest.base(this, 'constructor');

  this.information = 'API function test.';

  /**
   * @type {Object.<sre.SemanticAnnotator>}
   */
  this.annotations = null;

  /**
   * @type {Object.<sre.SemanticVisitor>}
   */
  this.visitors = null;

  this.pickFields = ['type', 'input', 'expected',
                     'setup', 'json', 'move'];

};
goog.inherits(sretest.ApiTest, sretest.AbstractJsonTest);


sretest.ApiTest.SETUP = {
  locale: 'en', domain: 'mathspeak', style: 'default',
  modality: 'speech', speech: sretest.TestExternal.sre.Engine.Speech.NONE
};


/**
 * The quadratic equation as a MathML string. By default tests are run against
 * the quadratic equation unless a different input is provided.
 * @type {string}
 */
sretest.ApiTest.QUADRATIC =
    '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">' +
    '<mi>x</mi>' +
    '<mo>=</mo>' +
    '<mfrac>' +
    '<mrow>' +
    '<mo>&#x2212;<!-- − --></mo>' +
    '<mi>b</mi>' +
    '<mo>&#x00B1;<!-- ± --></mo>' +
    '<msqrt>' +
    '<msup>' +
    '<mi>b</mi>' +
    '<mn>2</mn>' +
    '</msup>' +
    '<mo>&#x2212;<!-- − --></mo>' +
    '<mn>4</mn>' +
    '<mi>a</mi>' +
    '<mi>c</mi>' +
    '</msqrt>' +
    '</mrow>' +
    '<mrow>' +
    '<mn>2</mn>' +
    '<mi>a</mi>' +
    '</mrow>' +
    '</mfrac>' +
    '</math>';


/**
 * @override
 */
sretest.ApiTest.prototype.setUpTest = function() {
  this.annotations = sretest.TestExternal.sre.SemanticAnnotations.getInstance().annotators;
  this.visitors = sretest.TestExternal.sre.SemanticAnnotations.getInstance().visitors;
  this.setupEngine(null);
  sretest.TestExternal.sre.SemanticAnnotations.getInstance().annotators = {};
  sretest.TestExternal.sre.SemanticAnnotations.getInstance().visitors = {};
};


/**
 * @override
 */
sretest.ApiTest.prototype.tearDownTest = function() {
  sretest.TestExternal.sre.SemanticAnnotations.getInstance().annotators = this.annotations;
  sretest.TestExternal.sre.SemanticAnnotations.getInstance().visitors = this.visitors;
};



sretest.ApiTest.prototype.setupEngine = function(feature) {
  sretest.TestExternal.sre.System.getInstance().setupEngine(feature || sretest.ApiTest.SETUP);
};


/**
 * Executes single API tests.
 * @param {string} func The API function to test.
 * @param {string} expr The input expression.
 * @param {?(string)} result The expected result.
 * @param {Object} feature Feature vector for engine setup.
 * @param {boolean} json Json output expected?
 * @param {boolean} move Is this a move with some keyboard input?
 */
sretest.ApiTest.prototype.executeTest = function(func, expr, result, feature, json, move) {
  this.setupEngine(feature);
  expr = move ? sretest.TestExternal.sre.EventUtil.KeyCode[expr] : (expr || sretest.ApiTest.QUADRATIC);
  var output = sretest.TestExternal.sre.System.getInstance()[func](expr);
  output = output ? (json ? JSON.stringify(output) : output.toString()) : output;
  this.assert.equal(output, result);
};


/**
 * @override
 */
sretest.ApiTest.prototype.method = function(var_args) {
  let args = Array.prototype.slice.call(arguments, 0);
  this.executeTest(args[0], args[1], args[2], args[3], args[4], args[5]);
};
