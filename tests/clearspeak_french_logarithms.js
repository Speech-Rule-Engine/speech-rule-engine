// Copyright 2017 Volker Sorge
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

//
// With support from the Mozilla Foundation under a MOSS grant.
//


goog.provide('sre.ClearspeakFrenchLogarithms');

goog.require('sre.ClearspeakFrenchRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakFrenchRuleTest}
*/
sre.ClearspeakFrenchLogarithms = function() {
  sre.ClearspeakFrenchLogarithms.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakFrenchLogarithms rule tests.';

};
goog.inherits(sre.ClearspeakFrenchLogarithms, sre.ClearspeakFrenchRuleTest);



//
// Logarithms
//


/**
 * Testing ClearspeakFrenchLogarithms Example Log001
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog001 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><mi>x</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log002
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog002 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10' +
      '</mn></mrow></msub><mi>x</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log003
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog003 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mi>b</mi>' +
      '</msub><mi>a</mi><mi>x</mi><mo>=</mo><msub><mrow><mi>log</mi></mrow>' +
      '<mi>b</mi></msub><mi>a</mi><mo>+</mo><msub><mrow><mi>log</mi></mrow>' +
      '<mi>b</mi></msub><mi>x</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log004
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog004 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mi>b</mi>' +
      '</msub><mfrac><mi>S</mi><mi>T</mi></mfrac><mo>=</mo><msub><mrow>' +
      '<mi>log</mi></mrow><mi>b</mi></msub><mi>S</mi><mo>−</mo><msub><mrow>' +
      '<mi>log</mi></mrow><mi>b</mi></msub><mi>T</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log005
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog005 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mi>b</mi>' +
      '</msub><mrow><mo>(</mo><mrow><msup><mi>x</mi><mi>k</mi></msup>' +
      '</mrow><mo>)</mo></mrow><mo>=</mo><mi>k</mi><msub><mrow><mi>log</mi>' +
      '</mrow><mi>b</mi></msub><mi>x</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log006
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog006 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msup><mrow><mn>10</mn></mrow><mrow><msub>' +
      '<mrow><mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><mi>x</mi>' +
      '</mrow></msup><mo>=</mo><mi>x</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log007
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog007 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10' +
      '</mn></mrow></msub><msup><mrow><mn>10</mn></mrow><mi>x</mi></msup>' +
      '<mo>=</mo><mi>x</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log008
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog008 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msup><mrow><mn>10</mn></mrow><mrow><msub>' +
      '<mrow><mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><mn>5</mn>' +
      '</mrow></msup><mo>=</mo><mn>5</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log009
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog009 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10' +
      '</mn></mrow></msub><msup><mrow><mn>10</mn></mrow><mn>3</mn></msup>' +
      '<mo>=</mo><mn>3</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log010
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog010 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mi>a</mi>' +
      '</msub><mi>x</mi><mo>=</mo><mfrac><mrow><msub><mrow><mi>log</mi>' +
      '</mrow><mi>b</mi></msub><mi>x</mi></mrow><mrow><msub><mrow><mi>log' +
      '</mi></mrow><mi>b</mi></msub><mi>a</mi></mrow></mfrac></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log011
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog011 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mrow><mi>log</mi></mrow>' +
      '<mrow><mn>10</mn></mrow></msub><mn>18</mn></mrow><mrow><msub><mrow>' +
      '<mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><mn>3</mn></mrow>' +
      '</mfrac><mo>=</mo><msub><mrow><mi>log</mi></mrow><mn>3</mn></msub>' +
      '<mn>18</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log012
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog012 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mi>x</mi></mrow>' +
      '<mrow><mi>log</mi><mi>a</mi></mrow></mfrac></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log013
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog013 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><mo stretchy="false">(</mo><mi>x' +
      '</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log014
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog014 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><msup><mrow><mo stretchy="false">(' +
      '</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo>' +
      '</mrow><mn>2</mn></msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log015
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog015 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><mo stretchy="false">(</mo><mi>x' +
      '</mi><mi>y</mi><mo stretchy="false">)</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log016
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog016 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mrow><mo>(</mo><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>2</mn>' +
      '</mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log017
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog017 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mrow><mi>log</mi></mrow>' +
      '<mn>6</mn></msub><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>)</mo></mrow></mrow><mrow><msub><mrow><mi>log</mi>' +
      '</mrow><mn>6</mn></msub><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>2</mn></mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log018
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog018 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mn>40</mn><mo>+</mo>' +
      '<mi>log</mi><mn>60</mn></mrow><mrow><mi>log</mi><mn>5</mn></mrow>' +
      '</mfrac></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log019
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog019 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mrow><mi>log</mi></mrow>' +
      '<mn>3</mn></msub><mn>40</mn><mo>+</mo><msub><mrow><mi>log</mi>' +
      '</mrow><mn>3</mn></msub><mn>60</mn></mrow><mrow><msub><mrow><mi>log' +
      '</mi></mrow><mn>3</mn></msub><mn>5</mn></mrow></mfrac></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log020
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog020 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><mo stretchy="false">(</mo><msup>' +
      '<mn>3</mn><mn>4</mn></msup><msup><mrow><mn>12</mn></mrow><mn>9</mn>' +
      '</msup><mo stretchy="false">)</mo><mo>=</mo><mn>4</mn><mi>log</mi>' +
      '<mn>3</mn><mo>+</mo><mn>9</mn><mi>log</mi><mn>12</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log021
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog021 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mfrac><mi>x' +
      '</mi><mi>y</mi></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log022
 */
// TODO: Fix the vulgar fraction predicate!
sre.ClearspeakFrenchLogarithms.prototype.testLog022 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mfrac><mrow>' +
      '<msup><mn>3</mn><mn>4</mn></msup></mrow><mrow><msup><mn>8</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></mfrac></mrow><mo>)</mo></mrow>' +
      '<mo>=</mo><mn>4</mn><mi>log</mi><mn>3</mn><mo>−</mo><mn>10</mn>' +
      '<mi>log</mi><mn>8</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example Log023
 */
sre.ClearspeakFrenchLogarithms.prototype.testLog023 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msup><mrow><mn>10</mn></mrow><mrow><mi>log' +
      '</mi><mi>x</mi></mrow></msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example NatLog001
 */
sre.ClearspeakFrenchLogarithms.prototype.testNatLog001 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>ln</mi><mi>x</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example NatLog002
 */
sre.ClearspeakFrenchLogarithms.prototype.testNatLog002 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>ln</mi><mi>x</mi><mo>−</mo><mi>ln</mi><mo' +
      ' stretchy="false">(</mo><mi>x</mi><mo>−</mo><mn>1</mn><mo' +
      ' stretchy="false">)</mo><mo>=</mo><mi>ln</mi><mrow><mo>(</mo><mrow>' +
      '<mfrac><mi>x</mi><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mfrac>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example NatLog003
 */
sre.ClearspeakFrenchLogarithms.prototype.testNatLog003 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>ln</mi><mrow><mo>(</mo><mrow><msup><mi>e' +
      '</mi><mi>x</mi></msup></mrow><mo>)</mo></mrow><mo>=</mo><mi>x</mi>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example NatLog004
 */
sre.ClearspeakFrenchLogarithms.prototype.testNatLog004 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mi>ln</mi><mi>x</mi>' +
      '</mrow></msup><mo>=</mo><mi>x</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example NatLog005
 */
sre.ClearspeakFrenchLogarithms.prototype.testNatLog005 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>ln</mi><mrow><mo>(</mo><mrow><msup><mi>e' +
      '</mi><mi>x</mi></msup></mrow><mo>)</mo></mrow><mo>=</mo><mi>x</mi>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example NatLog006
 */
sre.ClearspeakFrenchLogarithms.prototype.testNatLog006 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mi>ln</mi><mn>4</mn>' +
      '</mrow></msup><mo>=</mo><mn>4</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example NatLog007
 */
sre.ClearspeakFrenchLogarithms.prototype.testNatLog007 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>ln</mi><mn>40</mn></mrow>' +
      '<mrow><mi>ln</mi><mn>5</mn></mrow></mfrac><mo>=</mo><msub><mrow>' +
      '<mi>log</mi></mrow><mn>5</mn></msub><mn>40</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example NatLog008
 */
sre.ClearspeakFrenchLogarithms.prototype.testNatLog008 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>ln</mi><mn>40</mn><mo>+</mo>' +
      '<mi>ln</mi><mn>60</mn></mrow><mrow><mi>ln</mi><mn>5</mn></mrow>' +
      '</mfrac></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example NatLog009
 */
sre.ClearspeakFrenchLogarithms.prototype.testNatLog009 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><mi>ln</mi><mi>x</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example NatLog010
 */
sre.ClearspeakFrenchLogarithms.prototype.testNatLog010 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><mi>ln</mi><mi>x</mi><mo>−</mo><mi>ln</mi><mo' +
      ' stretchy="false">(</mo><mi>x</mi><mo>−</mo><mn>1</mn><mo' +
      ' stretchy="false">)</mo><mo>=</mo><mi>ln</mi><mrow><mo>(</mo><mrow>' +
      '<mfrac><mi>x</mi><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mfrac>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example NatLog011
 */
sre.ClearspeakFrenchLogarithms.prototype.testNatLog011 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><mi>ln</mi><mrow><mo>(</mo><mrow><msup><mi>e' +
      '</mi><mi>x</mi></msup></mrow><mo>)</mo></mrow><mo>=</mo><mi>x</mi>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example NatLog012
 */
sre.ClearspeakFrenchLogarithms.prototype.testNatLog012 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mi>ln</mi><mi>x</mi>' +
      '</mrow></msup><mo>=</mo><mi>x</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example NatLog013
 */
sre.ClearspeakFrenchLogarithms.prototype.testNatLog013 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><mi>ln</mi><mrow><mo>(</mo><mrow><msup><mi>e' +
      '</mi><mi>x</mi></msup></mrow><mo>)</mo></mrow><mo>=</mo><mi>x</mi>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example NatLog014
 */
sre.ClearspeakFrenchLogarithms.prototype.testNatLog014 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mi>ln</mi><mn>4</mn>' +
      '</mrow></msup><mo>=</mo><mn>4</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example NatLog015
 */
sre.ClearspeakFrenchLogarithms.prototype.testNatLog015 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><mfrac><mrow><mi>ln</mi><mn>40</mn></mrow>' +
      '<mrow><mi>ln</mi><mn>5</mn></mrow></mfrac><mo>=</mo><msub><mrow>' +
      '<mi>log</mi></mrow><mn>5</mn></msub><mn>40</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchLogarithms Example NatLog016
 */
sre.ClearspeakFrenchLogarithms.prototype.testNatLog016 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><mfrac><mrow><mi>ln</mi><mn>40</mn><mo>+</mo>' +
      '<mi>ln</mi><mn>60</mn></mrow><mrow><mi>ln</mi><mn>5</mn></mrow>' +
      '</mfrac></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};
