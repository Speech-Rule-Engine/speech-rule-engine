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


goog.provide('sre.ClearspeakFrenchParentheses');

goog.require('sre.ClearspeakFrenchRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakFrenchRuleTest}
*/
sre.ClearspeakFrenchParentheses = function() {
  sre.ClearspeakFrenchParentheses.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakFrenchParentheses rule tests.';

};
goog.inherits(sre.ClearspeakFrenchParentheses, sre.ClearspeakFrenchRuleTest);



//
// Parentheses
//


/**
 * Testing ClearspeakFrenchParentheses Example Paren001
 */
sre.ClearspeakFrenchParentheses.prototype.testParen001 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>25</mn></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren002
 */
sre.ClearspeakFrenchParentheses.prototype.testParen002 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren003
 */
sre.ClearspeakFrenchParentheses.prototype.testParen003 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mn>2</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren004
 */
sre.ClearspeakFrenchParentheses.prototype.testParen004 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren004
 */
sre.ClearspeakFrenchParentheses.prototype.testParen004a = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren005
 */
sre.ClearspeakFrenchParentheses.prototype.testParen005 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mo>−</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow><mn>3' +
      '</mn></msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren006
 */
sre.ClearspeakFrenchParentheses.prototype.testParen006 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren007
 */
sre.ClearspeakFrenchParentheses.prototype.testParen007 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow><mrow><mi>y</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren008
 */
sre.ClearspeakFrenchParentheses.prototype.testParen008 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren009
 */
sre.ClearspeakFrenchParentheses.prototype.testParen009 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren010
 */
sre.ClearspeakFrenchParentheses.prototype.testParen010 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren011
 */
sre.ClearspeakFrenchParentheses.prototype.testParen011 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2' +
      '</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren012
 */
sre.ClearspeakFrenchParentheses.prototype.testParen012 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mn>3</mn><mn>4' +
      '</mn></mfrac><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  // TODO: (QUESTION) This is against the Paren_Auto rules! (page 31)!
  // var speech = '';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren013
 */
sre.ClearspeakFrenchParentheses.prototype.testParen013 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mrow><mn>11</mn>' +
      '</mrow><mrow><mn>22</mn></mrow></mfrac></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren014
 */
sre.ClearspeakFrenchParentheses.prototype.testParen014 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mn>4</mn>' +
      '</msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren015
 */
sre.ClearspeakFrenchParentheses.prototype.testParen015 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mfrac><mrow>' +
      '<mn>11</mn></mrow><mrow><mn>15</mn></mrow></mfrac></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren016
 */
sre.ClearspeakFrenchParentheses.prototype.testParen016 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>25</mn></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren017
 */
sre.ClearspeakFrenchParentheses.prototype.testParen017 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren018
 */
sre.ClearspeakFrenchParentheses.prototype.testParen018 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mn>2</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren019
 */
sre.ClearspeakFrenchParentheses.prototype.testParen019 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren020
 */
sre.ClearspeakFrenchParentheses.prototype.testParen020 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mo>−</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow><mn>3' +
      '</mn></msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren021
 */
sre.ClearspeakFrenchParentheses.prototype.testParen021 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren022
 */
sre.ClearspeakFrenchParentheses.prototype.testParen022 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow><mrow><mi>y</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren023
 */
sre.ClearspeakFrenchParentheses.prototype.testParen023 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren024
 */
sre.ClearspeakFrenchParentheses.prototype.testParen024 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren025
 */
sre.ClearspeakFrenchParentheses.prototype.testParen025 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren026
 */
sre.ClearspeakFrenchParentheses.prototype.testParen026 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2' +
      '</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren027
 */
sre.ClearspeakFrenchParentheses.prototype.testParen027 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mn>3</mn><mn>4' +
      '</mn></mfrac><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren028
 */
sre.ClearspeakFrenchParentheses.prototype.testParen028 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mrow><mn>11</mn>' +
      '</mrow><mrow><mn>22</mn></mrow></mfrac></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren029
 */
sre.ClearspeakFrenchParentheses.prototype.testParen029 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mn>4</mn>' +
      '</msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren030
 */
sre.ClearspeakFrenchParentheses.prototype.testParen030 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mfrac><mrow>' +
      '<mn>11</mn></mrow><mrow><mn>15</mn></mrow></mfrac></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren031
 */
sre.ClearspeakFrenchParentheses.prototype.testParen031 = function() {
  var preference = 'Paren_CoordPoint';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>1</mn><mo>,</mo><mn>2' +
      '</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren032
 */
sre.ClearspeakFrenchParentheses.prototype.testParen032 = function() {
  var preference = 'Paren_CoordPoint';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>,</mo><mi>y' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren033
 */
sre.ClearspeakFrenchParentheses.prototype.testParen033 = function() {
  var preference = 'Paren_CoordPoint';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>1</mn><mo>,</mo><mn>2' +
      '</mn><mo>,</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren034
 */
sre.ClearspeakFrenchParentheses.prototype.testParen034 = function() {
  var preference = 'Paren_CoordPoint';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>,</mo><mi>y' +
      '</mi><mo>,</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren035
 */
sre.ClearspeakFrenchParentheses.prototype.testParen035 = function() {
  var preference = 'Paren_CoordPoint';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>1</mn><mo>,</mo><mn>2' +
      '</mn><mo>,</mo><mn>386</mn></mrow><mo>)</mo></mrow></mrow></math>';
  // var speech = '';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren036
 */
sre.ClearspeakFrenchParentheses.prototype.testParen036 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>a</mi><mo>,</mo>' +
      '<mtext></mtext><mi>b</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren037
 */
sre.ClearspeakFrenchParentheses.prototype.testParen037 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>0</mn><mo>,</mo>' +
      '<mtext></mtext><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren038
 */
sre.ClearspeakFrenchParentheses.prototype.testParen038 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mi>a</mi><mo>,</mo>' +
      '<mtext></mtext><mi>b</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren039
 */
sre.ClearspeakFrenchParentheses.prototype.testParen039 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>0</mn><mo>,</mo>' +
      '<mtext></mtext><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren040
 */
sre.ClearspeakFrenchParentheses.prototype.testParen040 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>a</mi><mo>,</mo>' +
      '<mtext></mtext><mi>b</mi></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren041
 */
sre.ClearspeakFrenchParentheses.prototype.testParen041 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>0</mn><mo>,</mo>' +
      '<mtext></mtext><mn>1</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren042
 */
sre.ClearspeakFrenchParentheses.prototype.testParen042 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mi>a</mi><mo>,</mo>' +
      '<mtext></mtext><mi>b</mi></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren043
 */
sre.ClearspeakFrenchParentheses.prototype.testParen043 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>0</mn><mo>,</mo>' +
      '<mtext></mtext><mn>1</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren044
 */
sre.ClearspeakFrenchParentheses.prototype.testParen044 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mi>∞</mi><mo>,' +
      '</mo><mtext></mtext><mi>b</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren045
 */
sre.ClearspeakFrenchParentheses.prototype.testParen045 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mi>∞</mi><mo>,' +
      '</mo><mtext></mtext><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren046
 */
sre.ClearspeakFrenchParentheses.prototype.testParen046 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mo>−</mo><mi>∞</mi>' +
      '<mo>,</mo><mi>b</mi><mo stretchy="false">]</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren047
 */
sre.ClearspeakFrenchParentheses.prototype.testParen047 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mo>−</mo><mi>∞</mi>' +
      '<mo>,</mo><mn>1</mn><mo stretchy="false">]</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren048
 */
sre.ClearspeakFrenchParentheses.prototype.testParen048 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>a</mi><mo>,</mo>' +
      '<mtext></mtext><mi>∞</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren049
 */
sre.ClearspeakFrenchParentheses.prototype.testParen049 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>1</mn><mo>,</mo>' +
      '<mtext></mtext><mi>∞</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren050
 */
sre.ClearspeakFrenchParentheses.prototype.testParen050 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mo stretchy="false">[</mo><mi>a</mi><mo>,</mo>' +
      '<mi>∞</mi><mo stretchy="false">)</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren051
 */
sre.ClearspeakFrenchParentheses.prototype.testParen051 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mo stretchy="false">[</mo><mn>1</mn><mo>,</mo>' +
      '<mi>∞</mi><mo stretchy="false">)</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren052
 */
sre.ClearspeakFrenchParentheses.prototype.testParen052 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mi>∞</mi><mo>,' +
      '</mo><mtext></mtext><mi>∞</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Paren053
 */
sre.ClearspeakFrenchParentheses.prototype.testParen053 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mi>∞</mi><mo>,' +
      '</mo><mtext></mtext><mo>+</mo><mi>∞</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Nest001
 */
sre.ClearspeakFrenchParentheses.prototype.testNest001 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Nest002
 */
sre.ClearspeakFrenchParentheses.prototype.testNest002 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Nest003
 */
sre.ClearspeakFrenchParentheses.prototype.testNest003 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>6</mn><mo>−</mo><mrow><mo>[</mo><mrow><mn>2' +
      '</mn><mo>−</mo><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>5</mn>' +
      '</mrow><mo>)</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Nest004
 */
sre.ClearspeakFrenchParentheses.prototype.testNest004 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>6</mn><mo>−</mo><mrow><mo>(</mo><mrow><mn>2' +
      '</mn><mo>−</mo><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>5</mn>' +
      '</mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Nest005
 */
sre.ClearspeakFrenchParentheses.prototype.testNest005 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>4</mn><mrow><mo>[</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>3</mn><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>]</mo></mrow></mrow>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Nest006
 */
sre.ClearspeakFrenchParentheses.prototype.testNest006 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>4</mn><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>3</mn><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Nest007
 */
sre.ClearspeakFrenchParentheses.prototype.testNest007 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mrow><mo>(</mo><mrow><mn>2' +
      '</mn><mo>+</mo><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn>' +
      '</mrow><mo>)</mo></mrow><mo>−</mo><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mo>+</mo><mn>8</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Nest008
 */
sre.ClearspeakFrenchParentheses.prototype.testNest008 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mrow><mo>(</mo><mrow><mn>2' +
      '</mn><mo>+</mo><mrow><mo>(</mo><mrow><mn>3</mn><mo>−</mo><mrow><mo>(' +
      '</mo><mrow><mn>4</mn><mo>−</mo><mn>5</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example Nest009
 */
sre.ClearspeakFrenchParentheses.prototype.testNest009 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mo>+</mo><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>4' +
      '</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>5</mn></mrow><mo>)</mo>' +
      '</mrow><mo>+</mo><mn>6</mn><mo>+</mo><mrow><mo>(</mo><mrow><mrow>' +
      '<mo>(</mo><mrow><mn>7</mn><mo>+</mo><mrow><mo>(</mo><mrow><mn>8</mn>' +
      '<mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '<mo>+</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example SilParen001
 */
sre.ClearspeakFrenchParentheses.prototype.testSilParen001 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>25</mn></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example SilParen002
 */
sre.ClearspeakFrenchParentheses.prototype.testSilParen002 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example SilParen003
 */
sre.ClearspeakFrenchParentheses.prototype.testSilParen003 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example SilParen004
 */
sre.ClearspeakFrenchParentheses.prototype.testSilParen004 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example SilParen005
 */
sre.ClearspeakFrenchParentheses.prototype.testSilParen005 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mo>−</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow><mn>3' +
      '</mn></msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example SilParen006
 */
sre.ClearspeakFrenchParentheses.prototype.testSilParen006 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example SilParen007
 */
sre.ClearspeakFrenchParentheses.prototype.testSilParen007 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow><mrow><mi>y</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example SilParen008
 */
sre.ClearspeakFrenchParentheses.prototype.testSilParen008 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example SilParen009
 */
sre.ClearspeakFrenchParentheses.prototype.testSilParen009 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example SilParen010
 */
sre.ClearspeakFrenchParentheses.prototype.testSilParen010 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example SilParen011
 */
sre.ClearspeakFrenchParentheses.prototype.testSilParen011 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2' +
      '</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example SilParen012
 */
sre.ClearspeakFrenchParentheses.prototype.testSilParen012 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mn>3</mn><mn>4' +
      '</mn></mfrac><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example SilParen013
 */
sre.ClearspeakFrenchParentheses.prototype.testSilParen013 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mrow><mn>11</mn>' +
      '</mrow><mrow><mn>22</mn></mrow></mfrac></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example SilParen014
 */
sre.ClearspeakFrenchParentheses.prototype.testSilParen014 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mn>4</mn>' +
      '</msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchParentheses Example SilParen015
 */
sre.ClearspeakFrenchParentheses.prototype.testSilParen015 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mfrac><mrow>' +
      '<mn>11</mn></mrow><mrow><mn>15</mn></mrow></mfrac></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};
