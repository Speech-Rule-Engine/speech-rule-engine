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

goog.provide('sre.ApiTest');

goog.require('sre.AbstractJsonTest');
goog.require('sre.Engine');
goog.require('sre.System');



/**
 * @constructor
 * @extends {sre.AbstractJsonTest}
 */
sre.ApiTest = function() {
  sre.ApiTest.base(this, 'constructor');

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
goog.inherits(sre.ApiTest, sre.AbstractJsonTest);


sre.ApiTest.SETUP = {
  locale: 'en', domain: 'mathspeak', style: 'default',
  modality: 'speech', speech: sre.Engine.Speech.NONE
};


/**
 * The quadratic equation as a MathML string. By default tests are run against
 * the quadratic equation unless a different input is provided.
 * @type {string}
 */
sre.ApiTest.QUADRATIC =
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
sre.ApiTest.prototype.setUpTest = function() {
  this.annotations = sre.SemanticAnnotations.getInstance().annotators;
  this.visitors = sre.SemanticAnnotations.getInstance().visitors;
  this.setupEngine(null);
  sre.SemanticAnnotations.getInstance().annotators = {};
  sre.SemanticAnnotations.getInstance().visitors = {};
};


/**
 * @override
 */
sre.ApiTest.prototype.tearDownTest = function() {
  sre.SemanticAnnotations.getInstance().annotators = this.annotations;
  sre.SemanticAnnotations.getInstance().visitors = this.visitors;
};



sre.ApiTest.prototype.setupEngine = function(feature) {
  sre.System.getInstance().setupEngine(feature || sre.ApiTest.SETUP);
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
sre.ApiTest.prototype.executeTest = function(func, expr, result, feature, json, move) {
  this.setupEngine(feature);
  expr = move ? sre.EventUtil.KeyCode[expr] : (expr || sre.ApiTest.QUADRATIC);
  var output = sre.System.getInstance()[func](expr);
  output = output ? (json ? JSON.stringify(output) : output.toString()) : output;
  this.assert.equal(output, result);
};


/**
 * @override
 */
sre.ApiTest.prototype.method = function(var_args) {
  let args = Array.prototype.slice.call(arguments, 0);
  this.executeTest(args[0], args[1], args[2], args[3], args[4], args[5]);
};
