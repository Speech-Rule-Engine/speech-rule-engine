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


goog.provide('sre.ClearspeakEnglishParentheses');

goog.require('sre.ClearspeakEnglishRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakEnglishRuleTest}
*/
sre.ClearspeakEnglishParentheses = function() {
  sre.ClearspeakEnglishParentheses.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakEnglishParentheses rule tests.';

};
goog.inherits(sre.ClearspeakEnglishParentheses, sre.ClearspeakEnglishRuleTest);



//
// Parentheses
//


/**
 * Testing ClearspeakEnglishParentheses Example Paren001
 */
sre.ClearspeakEnglishParentheses.prototype.testParen001 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>25</mn></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = '25';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren002
 */
sre.ClearspeakEnglishParentheses.prototype.testParen002 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren003
 */
sre.ClearspeakEnglishParentheses.prototype.testParen003 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mn>2</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 plus negative 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren004
 */
sre.ClearspeakEnglishParentheses.prototype.testParen004 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 minus negative 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren005
 */
sre.ClearspeakEnglishParentheses.prototype.testParen005 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mo>−</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow><mn>3' +
      '</mn></msup></mrow></math>';
  var speech = '2 minus, open paren, negative 2, close paren, cubed';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren006
 */
sre.ClearspeakEnglishParentheses.prototype.testParen006 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = 'open paren, 2 x, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren007
 */
sre.ClearspeakEnglishParentheses.prototype.testParen007 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow><mrow><mi>y</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, 2 x, close paren, raised to the y plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren008
 */
sre.ClearspeakEnglishParentheses.prototype.testParen008 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'negative 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren009
 */
sre.ClearspeakEnglishParentheses.prototype.testParen009 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup>' +
      '</mrow></math>';
  var speech = 'open paren, negative 2 x, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren010
 */
sre.ClearspeakEnglishParentheses.prototype.testParen010 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup>' +
      '</mrow></math>';
  var speech = 'negative, open paren, 2 x, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren011
 */
sre.ClearspeakEnglishParentheses.prototype.testParen011 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2' +
      '</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren012
 */
sre.ClearspeakEnglishParentheses.prototype.testParen012 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mn>3</mn><mn>4' +
      '</mn></mfrac><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  // TODO: (QUESTION) This is against the Paren_Auto rules! (page 31)!
  // var speech = 'open paren, three fourths, x, close paren';
  var speech = 'three fourths x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren013
 */
sre.ClearspeakEnglishParentheses.prototype.testParen013 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mrow><mn>11</mn>' +
      '</mrow><mrow><mn>22</mn></mrow></mfrac></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'open paren, 11 over 22, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren014
 */
sre.ClearspeakEnglishParentheses.prototype.testParen014 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mn>4</mn>' +
      '</msup></mrow></math>';
  var speech = 'one half to the fourth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren015
 */
sre.ClearspeakEnglishParentheses.prototype.testParen015 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mfrac><mrow>' +
      '<mn>11</mn></mrow><mrow><mn>15</mn></mrow></mfrac></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'open paren, 11 over 15, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren016
 */
sre.ClearspeakEnglishParentheses.prototype.testParen016 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>25</mn></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'open paren, 25, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren017
 */
sre.ClearspeakEnglishParentheses.prototype.testParen017 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, 2 x, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren018
 */
sre.ClearspeakEnglishParentheses.prototype.testParen018 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mn>2</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 plus, open paren, negative 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren019
 */
sre.ClearspeakEnglishParentheses.prototype.testParen019 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 minus, open paren, negative 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren020
 */
sre.ClearspeakEnglishParentheses.prototype.testParen020 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mo>−</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow><mn>3' +
      '</mn></msup></mrow></math>';
  var speech = '2 minus, open paren, negative 2, close paren, cubed';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren021
 */
sre.ClearspeakEnglishParentheses.prototype.testParen021 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = 'open paren, 2 x, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren022
 */
sre.ClearspeakEnglishParentheses.prototype.testParen022 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow><mrow><mi>y</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, 2 x, close paren, raised to the y plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren023
 */
sre.ClearspeakEnglishParentheses.prototype.testParen023 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, negative 2 x, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren024
 */
sre.ClearspeakEnglishParentheses.prototype.testParen024 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup>' +
      '</mrow></math>';
  var speech = 'open paren, negative 2 x, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren025
 */
sre.ClearspeakEnglishParentheses.prototype.testParen025 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup>' +
      '</mrow></math>';
  var speech = 'negative, open paren, 2 x, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren026
 */
sre.ClearspeakEnglishParentheses.prototype.testParen026 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2' +
      '</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, one half, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren027
 */
sre.ClearspeakEnglishParentheses.prototype.testParen027 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mn>3</mn><mn>4' +
      '</mn></mfrac><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, three fourths x, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren028
 */
sre.ClearspeakEnglishParentheses.prototype.testParen028 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mrow><mn>11</mn>' +
      '</mrow><mrow><mn>22</mn></mrow></mfrac></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'open paren, 11 over 22, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren029
 */
sre.ClearspeakEnglishParentheses.prototype.testParen029 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mn>4</mn>' +
      '</msup></mrow></math>';
  var speech = 'open paren, one half, close paren, to the fourth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren030
 */
sre.ClearspeakEnglishParentheses.prototype.testParen030 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mfrac><mrow>' +
      '<mn>11</mn></mrow><mrow><mn>15</mn></mrow></mfrac></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'open paren, 11 over 15, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren031
 */
sre.ClearspeakEnglishParentheses.prototype.testParen031 = function() {
  var preference = 'Paren_CoordPoint';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>1</mn><mo>,</mo><mn>2' +
      '</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the point with coordinates 1 comma 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren032
 */
sre.ClearspeakEnglishParentheses.prototype.testParen032 = function() {
  var preference = 'Paren_CoordPoint';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>,</mo><mi>y' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the point with coordinates x comma y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren033
 */
sre.ClearspeakEnglishParentheses.prototype.testParen033 = function() {
  var preference = 'Paren_CoordPoint';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>1</mn><mo>,</mo><mn>2' +
      '</mn><mo>,</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the point with coordinates 1 comma 2 comma 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren034
 */
sre.ClearspeakEnglishParentheses.prototype.testParen034 = function() {
  var preference = 'Paren_CoordPoint';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>,</mo><mi>y' +
      '</mi><mo>,</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the point with coordinates x comma y comma z';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren035
 */
sre.ClearspeakEnglishParentheses.prototype.testParen035 = function() {
  var preference = 'Paren_CoordPoint';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>1</mn><mo>,</mo><mn>2' +
      '</mn><mo>,</mo><mn>386</mn></mrow><mo>)</mo></mrow></mrow></math>';
  // var speech = 'the point with coordinates 1 comma 2 comma three hundred
  // eighty six';
  var speech = 'the point with coordinates 1 comma 2 comma 386';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren036
 */
sre.ClearspeakEnglishParentheses.prototype.testParen036 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>a</mi><mo>,</mo>' +
      '<mtext></mtext><mi>b</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the interval from a to b, not including a or b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren037
 */
sre.ClearspeakEnglishParentheses.prototype.testParen037 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>0</mn><mo>,</mo>' +
      '<mtext></mtext><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the interval from 0 to 1, not including 0 or 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren038
 */
sre.ClearspeakEnglishParentheses.prototype.testParen038 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mi>a</mi><mo>,</mo>' +
      '<mtext></mtext><mi>b</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the interval from a to b, including a, but not including b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren039
 */
sre.ClearspeakEnglishParentheses.prototype.testParen039 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>0</mn><mo>,</mo>' +
      '<mtext></mtext><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the interval from 0 to 1, including 0, but not including 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren040
 */
sre.ClearspeakEnglishParentheses.prototype.testParen040 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>a</mi><mo>,</mo>' +
      '<mtext></mtext><mi>b</mi></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the interval from a to b, not including a, but including b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren041
 */
sre.ClearspeakEnglishParentheses.prototype.testParen041 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>0</mn><mo>,</mo>' +
      '<mtext></mtext><mn>1</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the interval from 0 to 1, not including 0, but including 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren042
 */
sre.ClearspeakEnglishParentheses.prototype.testParen042 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mi>a</mi><mo>,</mo>' +
      '<mtext></mtext><mi>b</mi></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the interval from a to b, including a and b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren043
 */
sre.ClearspeakEnglishParentheses.prototype.testParen043 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>0</mn><mo>,</mo>' +
      '<mtext></mtext><mn>1</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the interval from 0 to 1, including 0 and 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren044
 */
sre.ClearspeakEnglishParentheses.prototype.testParen044 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mi>∞</mi><mo>,' +
      '</mo><mtext></mtext><mi>b</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the interval from negative infinity to b, not including b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren045
 */
sre.ClearspeakEnglishParentheses.prototype.testParen045 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mi>∞</mi><mo>,' +
      '</mo><mtext></mtext><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the interval from negative infinity to 1, not including 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren046
 */
sre.ClearspeakEnglishParentheses.prototype.testParen046 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mo>−</mo><mi>∞</mi>' +
      '<mo>,</mo><mi>b</mi><mo stretchy="false">]</mo></mrow></math>';
  var speech = 'the interval from negative infinity to b, including b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren047
 */
sre.ClearspeakEnglishParentheses.prototype.testParen047 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mo>−</mo><mi>∞</mi>' +
      '<mo>,</mo><mn>1</mn><mo stretchy="false">]</mo></mrow></math>';
  var speech = 'the interval from negative infinity to 1, including 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren048
 */
sre.ClearspeakEnglishParentheses.prototype.testParen048 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>a</mi><mo>,</mo>' +
      '<mtext></mtext><mi>∞</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the interval from a to infinity, not including a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren049
 */
sre.ClearspeakEnglishParentheses.prototype.testParen049 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>1</mn><mo>,</mo>' +
      '<mtext></mtext><mi>∞</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the interval from 1 to infinity, not including 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren050
 */
sre.ClearspeakEnglishParentheses.prototype.testParen050 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mo stretchy="false">[</mo><mi>a</mi><mo>,</mo>' +
      '<mi>∞</mi><mo stretchy="false">)</mo></mrow></math>';
  var speech = 'the interval from a to infinity, including a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren051
 */
sre.ClearspeakEnglishParentheses.prototype.testParen051 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mo stretchy="false">[</mo><mn>1</mn><mo>,</mo>' +
      '<mi>∞</mi><mo stretchy="false">)</mo></mrow></math>';
  var speech = 'the interval from 1 to infinity, including 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren052
 */
sre.ClearspeakEnglishParentheses.prototype.testParen052 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mi>∞</mi><mo>,' +
      '</mo><mtext></mtext><mi>∞</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the interval from negative infinity to infinity';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Paren053
 */
sre.ClearspeakEnglishParentheses.prototype.testParen053 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mi>∞</mi><mo>,' +
      '</mo><mtext></mtext><mo>+</mo><mi>∞</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the interval from negative infinity to positive infinity';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Nest001
 */
sre.ClearspeakEnglishParentheses.prototype.testNest001 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f of, g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Nest002
 */
sre.ClearspeakEnglishParentheses.prototype.testNest002 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of, open paren, g of, open paren, x plus 1, close paren,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Nest003
 */
sre.ClearspeakEnglishParentheses.prototype.testNest003 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>6</mn><mo>−</mo><mrow><mo>[</mo><mrow><mn>2' +
      '</mn><mo>−</mo><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>5</mn>' +
      '</mrow><mo>)</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '6 minus, open bracket, 2 minus, open paren, 3 plus 5, close' +
      ' paren, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Nest004
 */
sre.ClearspeakEnglishParentheses.prototype.testNest004 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>6</mn><mo>−</mo><mrow><mo>(</mo><mrow><mn>2' +
      '</mn><mo>−</mo><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>5</mn>' +
      '</mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '6 minus, open paren, 2 minus, open second paren, 3 plus 5,' +
      ' close second paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Nest005
 */
sre.ClearspeakEnglishParentheses.prototype.testNest005 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>4</mn><mrow><mo>[</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>3</mn><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>]</mo></mrow></mrow>' +
      '</math>';
  var speech = '4 times, open bracket, x plus 3 times, open paren, 2 x,' +
      ' plus 1, close paren, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Nest006
 */
sre.ClearspeakEnglishParentheses.prototype.testNest006 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>4</mn><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>3</mn><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = '4 times, open paren, x plus 3 times, open second paren, 2' +
      ' x, plus 1, close second paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Nest007
 */
sre.ClearspeakEnglishParentheses.prototype.testNest007 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mrow><mo>(</mo><mrow><mn>2' +
      '</mn><mo>+</mo><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn>' +
      '</mrow><mo>)</mo></mrow><mo>−</mo><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mo>+</mo><mn>8</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = '1 plus, open paren, 2 plus, open second paren, 3 plus 7,' +
      ' close second paren, minus, open second paren, 2 plus 8, close' +
      ' second paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Nest008
 */
sre.ClearspeakEnglishParentheses.prototype.testNest008 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mrow><mo>(</mo><mrow><mn>2' +
      '</mn><mo>+</mo><mrow><mo>(</mo><mrow><mn>3</mn><mo>−</mo><mrow><mo>(' +
      '</mo><mrow><mn>4</mn><mo>−</mo><mn>5</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '1 plus, open paren, 2 plus, open second paren, 3 minus,' +
      ' open third paren, 4 minus 5, close third paren, close second paren,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example Nest009
 */
sre.ClearspeakEnglishParentheses.prototype.testNest009 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mo>+</mo><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>4' +
      '</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>5</mn></mrow><mo>)</mo>' +
      '</mrow><mo>+</mo><mn>6</mn><mo>+</mo><mrow><mo>(</mo><mrow><mrow>' +
      '<mo>(</mo><mrow><mn>7</mn><mo>+</mo><mrow><mo>(</mo><mrow><mn>8</mn>' +
      '<mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '<mo>+</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'open paren, open second paren, 2 plus, open third paren, 3' +
      ' plus 4, close third paren, plus 5, close second paren, plus 6 plus,' +
      ' open second paren, open third paren, 7 plus, open fourth paren, 8' +
      ' plus 1, close fourth paren, close third paren, plus 2, close second' +
      ' paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example SilParen001
 */
sre.ClearspeakEnglishParentheses.prototype.testSilParen001 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>25</mn></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = '25';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example SilParen002
 */
sre.ClearspeakEnglishParentheses.prototype.testSilParen002 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example SilParen003
 */
sre.ClearspeakEnglishParentheses.prototype.testSilParen003 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 plus, negative 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example SilParen004
 */
sre.ClearspeakEnglishParentheses.prototype.testSilParen004 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 minus, negative 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example SilParen005
 */
sre.ClearspeakEnglishParentheses.prototype.testSilParen005 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mo>−</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow><mn>3' +
      '</mn></msup></mrow></math>';
  var speech = '2 minus, negative 2, cubed';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example SilParen006
 */
sre.ClearspeakEnglishParentheses.prototype.testSilParen006 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = '2 x, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example SilParen007
 */
sre.ClearspeakEnglishParentheses.prototype.testSilParen007 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow><mrow><mi>y</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mrow></math>';
  var speech = '2 x, raised to the y plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example SilParen008
 */
sre.ClearspeakEnglishParentheses.prototype.testSilParen008 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'negative 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example SilParen009
 */
sre.ClearspeakEnglishParentheses.prototype.testSilParen009 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup>' +
      '</mrow></math>';
  var speech = 'negative 2 x, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example SilParen010
 */
sre.ClearspeakEnglishParentheses.prototype.testSilParen010 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup>' +
      '</mrow></math>';
  var speech = 'negative, 2 x, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example SilParen011
 */
sre.ClearspeakEnglishParentheses.prototype.testSilParen011 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2' +
      '</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example SilParen012
 */
sre.ClearspeakEnglishParentheses.prototype.testSilParen012 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mn>3</mn><mn>4' +
      '</mn></mfrac><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'three fourths x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example SilParen013
 */
sre.ClearspeakEnglishParentheses.prototype.testSilParen013 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mrow><mn>11</mn>' +
      '</mrow><mrow><mn>22</mn></mrow></mfrac></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = '11 over 22';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example SilParen014
 */
sre.ClearspeakEnglishParentheses.prototype.testSilParen014 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mn>4</mn>' +
      '</msup></mrow></math>';
  var speech = 'one half, to the fourth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishParentheses Example SilParen015
 */
sre.ClearspeakEnglishParentheses.prototype.testSilParen015 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mfrac><mrow>' +
      '<mn>11</mn></mrow><mrow><mn>15</mn></mrow></mfrac></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = '11 over 15, squared';
  this.executeRuleTest(mathml, speech, preference);
};
