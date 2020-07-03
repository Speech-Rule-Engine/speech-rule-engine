// Copyright 2020 Volker Sorge
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
// This work was sponsored by ETH Zurich
//


goog.provide('sre.ClearspeakGermanParentheses');

goog.require('sre.ClearspeakGermanRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakGermanRuleTest}
*/
sre.ClearspeakGermanParentheses = function() {
  sre.ClearspeakGermanParentheses.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakGermanParentheses rule tests.';

};
goog.inherits(sre.ClearspeakGermanParentheses, sre.ClearspeakGermanRuleTest);



//
// Parentheses
//


/**
 * Testing ClearspeakGermanParentheses Example Paren001
 */
sre.ClearspeakGermanParentheses.prototype.testParen001 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>25</mn></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = '25';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren002
 */
sre.ClearspeakGermanParentheses.prototype.testParen002 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren003
 */
sre.ClearspeakGermanParentheses.prototype.testParen003 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mn>2</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 plus minus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren004
 */
sre.ClearspeakGermanParentheses.prototype.testParen004 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 minus minus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren004
 */
sre.ClearspeakGermanParentheses.prototype.testParen004a = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow></mrow></math>';
  var speech = '2 minus minus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren005
 */
sre.ClearspeakGermanParentheses.prototype.testParen005 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mo>−</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow><mn>3' +
      '</mn></msup></mrow></math>';
  var speech = '2 minus, Klammer auf, minus 2, Klammer zu, Kubik';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren006
 */
sre.ClearspeakGermanParentheses.prototype.testParen006 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = 'Klammer auf, 2 x, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren007
 */
sre.ClearspeakGermanParentheses.prototype.testParen007 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow><mrow><mi>y</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'Klammer auf, 2 x, Klammer zu, hoch y plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren008
 */
sre.ClearspeakGermanParentheses.prototype.testParen008 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'minus 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren009
 */
sre.ClearspeakGermanParentheses.prototype.testParen009 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup>' +
      '</mrow></math>';
  var speech = 'Klammer auf, minus 2 x, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren010
 */
sre.ClearspeakGermanParentheses.prototype.testParen010 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup>' +
      '</mrow></math>';
  var speech = 'minus, Klammer auf, 2 x, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren011
 */
sre.ClearspeakGermanParentheses.prototype.testParen011 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2' +
      '</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'ein halb';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren012
 */
sre.ClearspeakGermanParentheses.prototype.testParen012 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mn>3</mn><mn>4' +
      '</mn></mfrac><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  // TODO: (QUESTION) This is against the Paren_Auto rules! (page 31)!
  var speech = 'drei viertel x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren013
 */
sre.ClearspeakGermanParentheses.prototype.testParen013 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mrow><mn>11</mn>' +
      '</mrow><mrow><mn>22</mn></mrow></mfrac></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'Klammer auf, 11 geteilt durch 22, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren014
 */
sre.ClearspeakGermanParentheses.prototype.testParen014 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mn>4</mn>' +
      '</msup></mrow></math>';
  var speech = 'ein halb hoch 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren015
 */
sre.ClearspeakGermanParentheses.prototype.testParen015 = function() {
  var preference = 'Paren_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mfrac><mrow>' +
      '<mn>11</mn></mrow><mrow><mn>15</mn></mrow></mfrac></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'Klammer auf, 11 geteilt durch 15, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren016
 */
sre.ClearspeakGermanParentheses.prototype.testParen016 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>25</mn></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'Klammer auf, 25, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren017
 */
sre.ClearspeakGermanParentheses.prototype.testParen017 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Klammer auf, 2 x, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren018
 */
sre.ClearspeakGermanParentheses.prototype.testParen018 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mn>2</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 plus, Klammer auf, minus 2, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren019
 */
sre.ClearspeakGermanParentheses.prototype.testParen019 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 minus, Klammer auf, minus 2, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren020
 */
sre.ClearspeakGermanParentheses.prototype.testParen020 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mo>−</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow><mn>3' +
      '</mn></msup></mrow></math>';
  var speech = '2 minus, Klammer auf, minus 2, Klammer zu, Kubik';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren021
 */
sre.ClearspeakGermanParentheses.prototype.testParen021 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = 'Klammer auf, 2 x, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren022
 */
sre.ClearspeakGermanParentheses.prototype.testParen022 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow><mrow><mi>y</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'Klammer auf, 2 x, Klammer zu, hoch y plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren023
 */
sre.ClearspeakGermanParentheses.prototype.testParen023 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Klammer auf, minus 2 x, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren024
 */
sre.ClearspeakGermanParentheses.prototype.testParen024 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup>' +
      '</mrow></math>';
  var speech = 'Klammer auf, minus 2 x, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren025
 */
sre.ClearspeakGermanParentheses.prototype.testParen025 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup>' +
      '</mrow></math>';
  var speech = 'minus, Klammer auf, 2 x, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren026
 */
sre.ClearspeakGermanParentheses.prototype.testParen026 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2' +
      '</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Klammer auf, ein halb, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren027
 */
sre.ClearspeakGermanParentheses.prototype.testParen027 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mn>3</mn><mn>4' +
      '</mn></mfrac><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Klammer auf, drei viertel x, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren028
 */
sre.ClearspeakGermanParentheses.prototype.testParen028 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mrow><mn>11</mn>' +
      '</mrow><mrow><mn>22</mn></mrow></mfrac></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'Klammer auf, 11 geteilt durch 22, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren029
 */
sre.ClearspeakGermanParentheses.prototype.testParen029 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mn>4</mn>' +
      '</msup></mrow></math>';
  var speech = 'Klammer auf, ein halb, Klammer zu, hoch 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren030
 */
sre.ClearspeakGermanParentheses.prototype.testParen030 = function() {
  var preference = 'Paren_Speak';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mfrac><mrow>' +
      '<mn>11</mn></mrow><mrow><mn>15</mn></mrow></mfrac></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'Klammer auf, 11 geteilt durch 15, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren031
 */
sre.ClearspeakGermanParentheses.prototype.testParen031 = function() {
  var preference = 'Paren_CoordPoint';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>1</mn><mo>,</mo><mn>2' +
      '</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'der Punkt mit Koordinaten 1 Komma 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren032
 */
sre.ClearspeakGermanParentheses.prototype.testParen032 = function() {
  var preference = 'Paren_CoordPoint';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>,</mo><mi>y' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'der Punkt mit Koordinaten x Komma y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren033
 */
sre.ClearspeakGermanParentheses.prototype.testParen033 = function() {
  var preference = 'Paren_CoordPoint';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>1</mn><mo>,</mo><mn>2' +
      '</mn><mo>,</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'der Punkt mit Koordinaten 1 Komma 2 Komma 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren034
 */
sre.ClearspeakGermanParentheses.prototype.testParen034 = function() {
  var preference = 'Paren_CoordPoint';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>,</mo><mi>y' +
      '</mi><mo>,</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'der Punkt mit Koordinaten x Komma y Komma z';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren035
 */
sre.ClearspeakGermanParentheses.prototype.testParen035 = function() {
  var preference = 'Paren_CoordPoint';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>1</mn><mo>,</mo><mn>2' +
      '</mn><mo>,</mo><mn>386</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'der Punkt mit Koordinaten 1 Komma 2 Komma 386';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren036
 */
sre.ClearspeakGermanParentheses.prototype.testParen036 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>a</mi><mo>,</mo>' +
      '<mtext></mtext><mi>b</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'das Interval von a bis b, ohne a und b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren037
 */
sre.ClearspeakGermanParentheses.prototype.testParen037 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>0</mn><mo>,</mo>' +
      '<mtext></mtext><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'das Interval von 0 bis 1, ohne 0 und 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren038
 */
sre.ClearspeakGermanParentheses.prototype.testParen038 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mi>a</mi><mo>,</mo>' +
      '<mtext></mtext><mi>b</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'das Interval von a bis b, einschließlich a, aber ohne b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren039
 */
sre.ClearspeakGermanParentheses.prototype.testParen039 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>0</mn><mo>,</mo>' +
      '<mtext></mtext><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'das Interval von 0 bis 1, einschließlich 0, aber ohne 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren040
 */
sre.ClearspeakGermanParentheses.prototype.testParen040 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>a</mi><mo>,</mo>' +
      '<mtext></mtext><mi>b</mi></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'das Interval von a bis b, ohne a, aber einschließlich b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren041
 */
sre.ClearspeakGermanParentheses.prototype.testParen041 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>0</mn><mo>,</mo>' +
      '<mtext></mtext><mn>1</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'das Interval von 0 bis 1, ohne 0, aber einschließlich 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren042
 */
sre.ClearspeakGermanParentheses.prototype.testParen042 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mi>a</mi><mo>,</mo>' +
      '<mtext></mtext><mi>b</mi></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'das Interval von a bis b, einschließlich a und b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren043
 */
sre.ClearspeakGermanParentheses.prototype.testParen043 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>0</mn><mo>,</mo>' +
      '<mtext></mtext><mn>1</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'das Interval von 0 bis 1, einschließlich 0 und 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren044
 */
sre.ClearspeakGermanParentheses.prototype.testParen044 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mi>∞</mi><mo>,' +
      '</mo><mtext></mtext><mi>b</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'das Interval von minus unendlich bis b, ohne b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren045
 */
sre.ClearspeakGermanParentheses.prototype.testParen045 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mi>∞</mi><mo>,' +
      '</mo><mtext></mtext><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'das Interval von minus unendlich bis 1, ohne 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren046
 */
sre.ClearspeakGermanParentheses.prototype.testParen046 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mo>−</mo><mi>∞</mi>' +
      '<mo>,</mo><mi>b</mi><mo stretchy="false">]</mo></mrow></math>';
  var speech = 'das Interval von minus unendlich bis b, einschließlich b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren047
 */
sre.ClearspeakGermanParentheses.prototype.testParen047 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mo>−</mo><mi>∞</mi>' +
      '<mo>,</mo><mn>1</mn><mo stretchy="false">]</mo></mrow></math>';
  var speech = 'das Interval von minus unendlich bis 1, einschließlich 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren048
 */
sre.ClearspeakGermanParentheses.prototype.testParen048 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>a</mi><mo>,</mo>' +
      '<mtext></mtext><mi>∞</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'das Interval von a bis unendlich, ohne a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren049
 */
sre.ClearspeakGermanParentheses.prototype.testParen049 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>1</mn><mo>,</mo>' +
      '<mtext></mtext><mi>∞</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'das Interval von 1 bis unendlich, ohne 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren050
 */
sre.ClearspeakGermanParentheses.prototype.testParen050 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mo stretchy="false">[</mo><mi>a</mi><mo>,</mo>' +
      '<mi>∞</mi><mo stretchy="false">)</mo></mrow></math>';
  var speech = 'das Interval von a bis unendlich, einschließlich a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren051
 */
sre.ClearspeakGermanParentheses.prototype.testParen051 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mo stretchy="false">[</mo><mn>1</mn><mo>,</mo>' +
      '<mi>∞</mi><mo stretchy="false">)</mo></mrow></math>';
  var speech = 'das Interval von 1 bis unendlich, einschließlich 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren052
 */
sre.ClearspeakGermanParentheses.prototype.testParen052 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mi>∞</mi><mo>,' +
      '</mo><mtext></mtext><mi>∞</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'das Interval von minus unendlich bis unendlich';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Paren053
 */
sre.ClearspeakGermanParentheses.prototype.testParen053 = function() {
  var preference = 'Paren_Interval';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mi>∞</mi><mo>,' +
      '</mo><mtext></mtext><mo>+</mo><mi>∞</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'das Interval von minus unendlich bis plus unendlich';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Nest001
 */
sre.ClearspeakGermanParentheses.prototype.testNest001 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f von, g von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Nest002
 */
sre.ClearspeakGermanParentheses.prototype.testNest002 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f von, Klammer auf, g von, Klammer auf, x plus 1, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Nest003
 */
sre.ClearspeakGermanParentheses.prototype.testNest003 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>6</mn><mo>−</mo><mrow><mo>[</mo><mrow><mn>2' +
      '</mn><mo>−</mo><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>5</mn>' +
      '</mrow><mo>)</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '6 minus, eckige Klammer auf, 2 minus, Klammer auf, 3 plus 5, Klammer zu, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Nest004
 */
sre.ClearspeakGermanParentheses.prototype.testNest004 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>6</mn><mo>−</mo><mrow><mo>(</mo><mrow><mn>2' +
      '</mn><mo>−</mo><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>5</mn>' +
      '</mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '6 minus, Klammer auf, 2 minus, zweite Klammer auf, 3 plus 5, zweite Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Nest005
 */
sre.ClearspeakGermanParentheses.prototype.testNest005 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>4</mn><mrow><mo>[</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>3</mn><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>]</mo></mrow></mrow>' +
      '</math>';
  var speech = '4  , eckige Klammer auf, x plus 3  , Klammer auf, 2 x, plus 1, Klammer zu, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Nest006
 */
sre.ClearspeakGermanParentheses.prototype.testNest006 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>4</mn><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>3</mn><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = '4  , Klammer auf, x plus 3  , zweite Klammer auf, 2 x, plus 1, zweite Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Nest007
 */
sre.ClearspeakGermanParentheses.prototype.testNest007 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mrow><mo>(</mo><mrow><mn>2' +
      '</mn><mo>+</mo><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn>' +
      '</mrow><mo>)</mo></mrow><mo>−</mo><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mo>+</mo><mn>8</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = '1 plus, Klammer auf, 2 plus, zweite Klammer auf, 3 plus 7, zweite Klammer zu, minus, zweite Klammer auf, 2 plus 8, zweite Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Nest008
 */
sre.ClearspeakGermanParentheses.prototype.testNest008 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mrow><mo>(</mo><mrow><mn>2' +
      '</mn><mo>+</mo><mrow><mo>(</mo><mrow><mn>3</mn><mo>−</mo><mrow><mo>(' +
      '</mo><mrow><mn>4</mn><mo>−</mo><mn>5</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '1 plus, Klammer auf, 2 plus, zweite Klammer auf, 3 minus, dritte Klammer auf, 4 minus 5, dritte Klammer zu, zweite Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example Nest009
 */
sre.ClearspeakGermanParentheses.prototype.testNest009 = function() {
  var preference = 'Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mo>+</mo><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>4' +
      '</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>5</mn></mrow><mo>)</mo>' +
      '</mrow><mo>+</mo><mn>6</mn><mo>+</mo><mrow><mo>(</mo><mrow><mrow>' +
      '<mo>(</mo><mrow><mn>7</mn><mo>+</mo><mrow><mo>(</mo><mrow><mn>8</mn>' +
      '<mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '<mo>+</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'Klammer auf, zweite Klammer auf, 2 plus, dritte Klammer auf, 3 plus 4, dritte Klammer zu, plus 5, zweite Klammer zu, plus 6 plus, zweite Klammer auf, dritte Klammer auf, 7 plus, vierte Klammer auf, 8 plus 1, vierte Klammer zu, dritte Klammer zu, plus 2, zweite Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example SilParen001
 */
sre.ClearspeakGermanParentheses.prototype.testSilParen001 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>25</mn></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = '25';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example SilParen002
 */
sre.ClearspeakGermanParentheses.prototype.testSilParen002 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example SilParen003
 */
sre.ClearspeakGermanParentheses.prototype.testSilParen003 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 plus, minus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example SilParen004
 */
sre.ClearspeakGermanParentheses.prototype.testSilParen004 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 minus, minus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example SilParen005
 */
sre.ClearspeakGermanParentheses.prototype.testSilParen005 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mo>−</mo><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mo>−</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow><mn>3' +
      '</mn></msup></mrow></math>';
  var speech = '2 minus, minus 2, Kubik';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example SilParen006
 */
sre.ClearspeakGermanParentheses.prototype.testSilParen006 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = '2 x, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example SilParen007
 */
sre.ClearspeakGermanParentheses.prototype.testSilParen007 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow><mrow><mi>y</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mrow></math>';
  var speech = '2 x, hoch y plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example SilParen008
 */
sre.ClearspeakGermanParentheses.prototype.testSilParen008 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'minus 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example SilParen009
 */
sre.ClearspeakGermanParentheses.prototype.testSilParen009 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup>' +
      '</mrow></math>';
  var speech = 'minus 2 x, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example SilParen010
 */
sre.ClearspeakGermanParentheses.prototype.testSilParen010 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup>' +
      '</mrow></math>';
  var speech = 'minus, 2 x, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example SilParen011
 */
sre.ClearspeakGermanParentheses.prototype.testSilParen011 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2' +
      '</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'ein halb';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example SilParen012
 */
sre.ClearspeakGermanParentheses.prototype.testSilParen012 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mn>3</mn><mn>4' +
      '</mn></mfrac><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'drei viertel x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example SilParen013
 */
sre.ClearspeakGermanParentheses.prototype.testSilParen013 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mrow><mn>11</mn>' +
      '</mrow><mrow><mn>22</mn></mrow></mfrac></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = '11 geteilt durch 22';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example SilParen014
 */
sre.ClearspeakGermanParentheses.prototype.testSilParen014 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mn>4</mn>' +
      '</msup></mrow></math>';
  var speech = 'ein halb, hoch 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanParentheses Example SilParen015
 */
sre.ClearspeakGermanParentheses.prototype.testSilParen015 = function() {
  var preference = 'Paren_Silent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mfrac><mrow>' +
      '<mn>11</mn></mrow><mrow><mn>15</mn></mrow></mfrac></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = '11 geteilt durch 15, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};
