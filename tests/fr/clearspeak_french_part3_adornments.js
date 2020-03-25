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


goog.provide('sre.ClearspeakFrenchPart3Adornments');

goog.require('sre.ClearspeakFrenchRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakFrenchRuleTest}
*/
sre.ClearspeakFrenchPart3Adornments = function() {
  sre.ClearspeakFrenchPart3Adornments.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakFrenchPart3Adornments rule tests.';
};
goog.inherits(sre.ClearspeakFrenchPart3Adornments, sre.ClearspeakFrenchRuleTest);



//
// Part 3: Adornments
//


//
// Prime, Double Prime, and Triple Prime
//


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime001
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime001 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><msup><mi>A</mi><mo>′</mo></msup><msup><mi>B' +
      '</mi><mo>′</mo></msup></mrow></math>';
  var speech = 'A prime, B prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime002
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime002 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><msup><mi>A</mi><mo>″</mo></msup><msup><mi>B' +
      '</mi><mo>″</mo></msup></mrow></math>';
  var speech = 'A double prime, B double prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime003
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime003 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><msup><mi>A</mi><mo>‴</mo></msup><msup><mi>B' +
      '</mi><mo>‴</mo></msup></mrow></math>';
  var speech = 'A triple prime, B triple prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime004
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime004 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mo>′</mo></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f prime de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime005
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime005 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mo>″</mo></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f double prime de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime006
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime006 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mo>‴</mo></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f triple prime de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime007
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime007 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><msup><mn>1</mn><mo>′</mo></msup></math>';
  var speech = '1 foot';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime008
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime008 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><msup><mn>2</mn><mo>′</mo></msup></math>';
  var speech = '2 feet';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime009
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime009 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><msup><mn>1</mn><mo>″</mo></msup></math>';
  var speech = '1 inch';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime010
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime010 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><msup><mn>2</mn><mo>″</mo></msup></math>';
  var speech = '2 inches';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime011
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime011 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><msup><mn>16</mn><mo>′</mo></msup><msup><mn>10' +
      '</mn><mo>″</mo></msup></mrow></math>';
  var speech = '16 feet, 10 inches';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Better handling of degrees.
/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime012
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime012 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><mn>45</mn><mo>°</mo><msup><mn>10</mn><mo>′' +
      '</mo></msup></mrow></math>';
  var speech = '45 degrés, 10 minutes';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime013
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime013 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><mi>x</mi><mo>°</mo><msup><mi>y</mi><mo>′</mo>' +
      '</msup></mrow></math>';
  var speech = 'x degrés, y minutes';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime014
 */
sre.ClearspeakFrenchPart3Adornments.prototype.untestPrime014 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><mn>45</mn><mo>°</mo><msup><mn>10</mn><mo>′' +
      '</mo></msup><msup><mn>25</mn><mo>″</mo></msup></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime015
 */
sre.ClearspeakFrenchPart3Adornments.prototype.untestPrime015 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><mi>x</mi><mo>°</mo><msup><mi>y</mi><mo>′</mo>' +
      '</msup><msup><mi>z</mi><mo>″</mo></msup></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime016
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime016 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><msup><mn>1</mn><mo>′</mo></msup></math>';
  var speech = '1 minute';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime017
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime017 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><msup><mi>x</mi><mo>′</mo></msup></math>';
  var speech = 'x minutes';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime018
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime018 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><msup><mn>2</mn><mo>′</mo></msup></math>';
  var speech = '2 minutes';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime019
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime019 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><msup><mn>1</mn><mo>″</mo></msup></math>';
  var speech = '1 second';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime020
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime020 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><msup><mi>x</mi><mo>″</mo></msup></math>';
  var speech = 'x seconds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime021
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime021 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><msup><mn>2</mn><mo>″</mo></msup></math>';
  var speech = '2 seconds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime022
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime022 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><msup><mn>16</mn><mo>′</mo></msup><msup><mn>10' +
      '</mn><mo>″</mo></msup></mrow></math>';
  var speech = '16 minutes, 10 seconds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime023
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime023 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><msup><mi>x</mi><mo>′</mo></msup><msup><mi>y' +
      '</mi><mo>″</mo></msup></mrow></math>';
  var speech = 'x minutes, y seconds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime024
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime024 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><mn>45</mn><mo>°</mo><msup><mn>10</mn><mo>′' +
      '</mo></msup></mrow></math>';
  var speech = '45 degrees, 10 minutes';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime025
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime025 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><mn>45</mn><mo>°</mo><msup><mn>10</mn><mo>′' +
      '</mo></msup><msup><mn>25</mn><mo>″</mo></msup></mrow></math>';
  var speech = '45 degrees, 10 minutes, 25 seconds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime026
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime026 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><msup><mi>A</mi><mo>′</mo></msup><msup><mi>B' +
      '</mi><mo>′</mo></msup></mrow></math>';
  var speech = 'A prime, B prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime027
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime027 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><msup><mi>A</mi><mo>″</mo></msup><msup><mi>B' +
      '</mi><mo>″</mo></msup></mrow></math>';
  var speech = 'A double prime, B double prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime028
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime028 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><msup><mi>A</mi><mo>‴</mo></msup><msup><mi>B' +
      '</mi><mo>‴</mo></msup></mrow></math>';
  var speech = 'A triple prime, B triple prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime029
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime029 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><msup><mi>f</mi><mo>′</mo></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f prime de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime030
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime030 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><msup><mi>f</mi><mo>″</mo></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f double prime de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime031
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime031 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><msup><mi>f</mi><mo>‴</mo></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f triple prime de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime032
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime032 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><msup><mn>1</mn><mo>′</mo></msup></math>';
  var speech = '1 foot';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime033
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime033 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><msup><mi>x</mi><mo>′</mo></msup></math>';
  var speech = 'x feet';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime034
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime034 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><msup><mn>2</mn><mo>′</mo></msup></math>';
  var speech = '2 feet';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime035
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime035 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><msup><mn>1</mn><mo>″</mo></msup></math>';
  var speech = '1 inch';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime036
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime036 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><msup><mi>x</mi><mo>″</mo></msup></math>';
  var speech = 'x inches';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime037
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime037 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><msup><mn>2</mn><mo>″</mo></msup></math>';
  var speech = '2 inches';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Rewrite prime etc into superscript.
/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime038
 */
sre.ClearspeakFrenchPart3Adornments.prototype.untestPrime038 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><mn>16</mn><mo>′</mo></msup><mn>10</mn><mo>″' +
      '</mo></msup></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime039
 */
sre.ClearspeakFrenchPart3Adornments.prototype.untestPrime039 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><msup><mi>x</mi><mo>′</mo></msup><msup><mi>y' +
      '</mi><mo>″</mo></msup></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime040
 */
sre.ClearspeakFrenchPart3Adornments.prototype.untestPrime040 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><mn>45</mn><mo>°</mo><mn>10</mn><mo>′</mo>' +
      '</msup></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime041
 */
sre.ClearspeakFrenchPart3Adornments.prototype.untestPrime041 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><mn>45</mn><mo>°</mo><mn>10</mn><mo>′</mo>' +
      '</msup><mn>25</mn><mo>″</mo></msup></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime042
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime042 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><msup><mi>A</mi><mo>′</mo></msup><msup><mi>B' +
      '</mi><mo>′</mo></msup></mrow></math>';
  var speech = 'A prime, B prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime043
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime043 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><msup><mi>A</mi><mo>″</mo></msup><msup><mi>B' +
      '</mi><mo>″</mo></msup></mrow></math>';
  var speech = 'A double prime, B double prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime044
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime044 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><msup><mi>A</mi><mo>‴</mo></msup><msup><mi>B' +
      '</mi><mo>‴</mo></msup></mrow></math>';
  var speech = 'A triple prime, B triple prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime045
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime045 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><msup><mi>f</mi><mo>′</mo></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f prime de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime046
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime046 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><msup><mi>f</mi><mo>″</mo></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f double prime de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Prime047
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testPrime047 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><msup><mi>f</mi><mo>‴</mo></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f triple prime de x';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Combinations and Permutations
//


// These 8 tests come out of the clearspeak documents from MathType.  The MathML
// has a redundant use of subscripts leaving the actual correct placing of the
// right index in the multiscript empty.
//
// TODO: (Simons) Have a cleanup heuristic to combine multiscripts with
//                sub/superscripts.
/**
 * Testing ClearspeakFrenchPart3Adornments Example CombPerm001
 */
sre.ClearspeakFrenchPart3Adornments.prototype.untestCombPerm001 = function() {
  var preference = 'CombinationPermutation_Auto';
  var mathml = '<math><mrow><mmultiscripts><mi>C</mi><mprescripts/><mi>n' +
      '</mi><none/></mmultiscripts><msub><mrow/><mi>r</mi></msub></mrow>' +
      '</math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example CombPerm002
 */
sre.ClearspeakFrenchPart3Adornments.prototype.untestCombPerm002 = function() {
  var preference = 'CombinationPermutation_Auto';
  var mathml = '<math><mrow><mmultiscripts><mi>P</mi><mprescripts/><mi>n' +
      '</mi><none/></mmultiscripts><msub><mrow/><mi>r</mi></msub></mrow>' +
      '</math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example CombPerm003
 */
sre.ClearspeakFrenchPart3Adornments.prototype.untestCombPerm003 = function() {
  var preference = 'CombinationPermutation_Auto';
  var mathml = '<math><mrow><mmultiscripts><mi>C</mi><mprescripts/><mrow>' +
      '<mn>10</mn></mrow><none/></mmultiscripts><msub><mrow/><mn>3</mn>' +
      '</msub></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example CombPerm004
 */
sre.ClearspeakFrenchPart3Adornments.prototype.untestCombPerm004 = function() {
  var preference = 'CombinationPermutation_Auto';
  var mathml = '<math><mrow><mmultiscripts><mi>P</mi><mprescripts/><mrow>' +
      '<mn>10</mn></mrow><none/></mmultiscripts><msub><mrow/><mn>3</mn>' +
      '</msub></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example CombPerm005
 */
sre.ClearspeakFrenchPart3Adornments.prototype.untestCombPerm005 = function() {
  var preference = 'CombinationPermutation_ChoosePermute';
  var mathml = '<math><mrow><mmultiscripts><mi>C</mi><mprescripts/><mi>n' +
      '</mi><none/></mmultiscripts><msub><mrow/><mi>r</mi></msub></mrow>' +
      '</math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example CombPerm006
 */
sre.ClearspeakFrenchPart3Adornments.prototype.untestCombPerm006 = function() {
  var preference = 'CombinationPermutation_ChoosePermute';
  var mathml = '<math><mrow><mmultiscripts><mi>P</mi><mprescripts/><mi>n' +
      '</mi><none/></mmultiscripts><msub><mrow/><mi>r</mi></msub></mrow>' +
      '</math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example CombPerm007
 */
sre.ClearspeakFrenchPart3Adornments.prototype.untestCombPerm007 = function() {
  var preference = 'CombinationPermutation_ChoosePermute';
  var mathml = '<math><mrow><mmultiscripts><mi>C</mi><mprescripts/><mrow>' +
      '<mn>10</mn></mrow><none/></mmultiscripts><msub><mrow/><mn>3</mn>' +
      '</msub></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example CombPerm008
 */
sre.ClearspeakFrenchPart3Adornments.prototype.untestCombPerm008 = function() {
  var preference = 'CombinationPermutation_ChoosePermute';
  var mathml = '<math><mrow><mmultiscripts><mi>P</mi><mprescripts/><mrow>' +
      '<mn>10</mn></mrow><none/></mmultiscripts><msub><mrow/><mn>3</mn>' +
      '</msub></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


// Cleaned up tests with the correct usage of multiscript elements.
/**
 * Testing ClearspeakFrenchPart3Adornments Example CombPerm001
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testCombPerm001a = function() {
  var preference = 'CombinationPermutation_Auto';
  var mathml = '<math><mrow><mmultiscripts><mi>C</mi><mi>r</mi>' +
      '<mprescripts/><mi>n</mi><none/></mmultiscripts></mrow></math>';
  var speech = 'n C r';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example CombPerm002
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testCombPerm002a = function() {
  var preference = 'CombinationPermutation_Auto';
  var mathml = '<math><mrow><mmultiscripts><mi>P</mi><mi>r</mi>' +
      '<mprescripts/><mi>n</mi><none/></mmultiscripts></mrow></math>';
  var speech = 'n P r';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example CombPerm003
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testCombPerm003a = function() {
  var preference = 'CombinationPermutation_Auto';
  var mathml = '<math><mrow><mmultiscripts><mi>C</mi><mn>3</mn>' +
      '<mprescripts/><mrow><mn>10</mn></mrow><none/></mmultiscripts></mrow>' +
      '</math>';
  var speech = '10 C 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example CombPerm004
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testCombPerm004a = function() {
  var preference = 'CombinationPermutation_Auto';
  var mathml = '<math><mrow><mmultiscripts><mi>P</mi><mn>3</mn>' +
      '<mprescripts/><mrow><mn>10</mn></mrow><none/></mmultiscripts></mrow>' +
      '</math>';
  var speech = '10 P 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example CombPerm005
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testCombPerm005a = function() {
  var preference = 'CombinationPermutation_ChoosePermute';
  var mathml = '<math><mrow><mmultiscripts><mi>C</mi><mi>r</mi>' +
      '<mprescripts/><mi>n</mi><none/></mmultiscripts></mrow></math>';
  var speech = 'combinaison de; parmi r';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example CombPerm006
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testCombPerm006a = function() {
  var preference = 'CombinationPermutation_ChoosePermute';
  var mathml = '<math><mrow><mmultiscripts><mi>P</mi><mi>r</mi>' +
      '<mprescripts/><mi>n</mi><none/></mmultiscripts></mrow></math>';
  var speech = 'permutation de n parmi r';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example CombPerm007
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testCombPerm007a = function() {
  var preference = 'CombinationPermutation_ChoosePermute';
  var mathml = '<math><mrow><mmultiscripts><mi>C</mi><mn>3</mn>' +
      '<mprescripts/><mrow><mn>10</mn></mrow><none/></mmultiscripts></mrow>' +
      '</math>';
  var speech = 'combinaison de; parmi 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example CombPerm008
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testCombPerm008a = function() {
  var preference = 'CombinationPermutation_ChoosePermute';
  var mathml = '<math><mrow><mmultiscripts><mi>P</mi><mn>3</mn>' +
      '<mprescripts/><mrow><mn>10</mn></mrow><none/></mmultiscripts></mrow>' +
      '</math>';
  var speech = 'permutation de 10 parmi 3';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Bar
//


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar001
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar001 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mover accent="true"><mi>f</mi><mo>¯</mo></mover></math>';
  var speech = 'f macron';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar002
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar002 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mover accent="true"><mi>f</mi><mo>¯</mo>' +
      '</mover><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f macron de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar003
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar003 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mover accent="true"><mrow><msub><mi>f</mi>' +
      '<mn>1</mn></msub></mrow><mo stretchy="true">¯</mo></mover></mrow>' +
      '</math>';
  var speech = 'f sub 1, macron';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar004
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar004 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mover accent="true"><mrow><msub><mi>f</mi>' +
      '<mn>1</mn></msub></mrow><mo stretchy="true">¯</mo></mover><mrow>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1, macron de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar005
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar005 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mover accent="true"><mi>z</mi><mo>¯</mo></mover></math>';
  var speech = 'z macron';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar006
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar006 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mn>0</mn><mo>.</mo><mover accent="true"><mn>3' +
      '</mn><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'la décimale 0 virgule suivi par le chiffre répété 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar007
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar007 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mn>0</mn><mo>.</mo><mover accent="true"><mrow>' +
      '<mn>12</mn></mrow><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'la décimale 0 virgule suivi par les chiffres répétés 1 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar008
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar008 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mn>2</mn><mo>.</mo><mover accent="true"><mrow>' +
      '<mn>134</mn></mrow><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'la décimale 2 virgule suivi par les chiffres répétés 1 3 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar009
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar009 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mn>.13</mn><mover accent="true"><mrow><mn>467' +
      '</mn></mrow><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'la décimale point 1 3 suivi par les chiffres répétés 4 6 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar010
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar010 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mn>25.12</mn><mover accent="true"><mrow>' +
      '<mn>632</mn></mrow><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'la décimale 2 5 point 1 2 suivi par les chiffres répétés 6 3 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar011
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar011 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mi>z</mi><mtext></mtext><mover accent="true">' +
      '<mi>z</mi><mo>¯</mo></mover></mrow></math>';
  var speech = 'z, z macron';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar012
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar012 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mover accent="true"><mrow><mi>C</mi><mi>D</mi>' +
      '</mrow><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'le segment C D';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar013
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar013 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mover accent="true"><mrow><msup><mi>C</mi>' +
      '<mo>′</mo></msup><msup><mi>D</mi><mo>′</mo></msup></mrow><mo' +
      ' stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'le segment C prime D prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar014
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar014 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mover accent="true"><mrow><msup><mi>C</mi>' +
      '<mo>″</mo></msup><msup><mi>D</mi><mo>″</mo></msup></mrow><mo' +
      ' stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'le segment C double prime D double prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar015
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar015 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mover accent="true"><mrow><msup><mi>C</mi>' +
      '<mo>‴</mo></msup><msup><mi>D</mi><mo>‴</mo></msup></mrow><mo' +
      ' stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'le segment C triple prime D triple prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar016
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar016 = function() {
  var preference = 'Bar_Conjugate';
  var mathml = '<math><mover accent="true"><mi>z</mi><mo>¯</mo></mover></math>';
  var speech = 'le complexe conjugué de z';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar017
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar017 = function() {
  var preference = 'Bar_Conjugate';
  var mathml = '<math><mrow><mi>z</mi><mtext></mtext><mover accent="true">' +
      '<mi>z</mi><mo>¯</mo></mover></mrow></math>';
  var speech = 'z, le complexe conjugué de z';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar018
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar018 = function() {
  var preference = 'Bar_Conjugate';
  var mathml = '<math><mrow><mover accent="true"><mrow><mn>3</mn><mo>−</mo>' +
      '<mn>2</mn><mi>i</mi></mrow><mo stretchy="true">¯</mo></mover><mo>=' +
      '</mo><mn>3</mn><mo>+</mo><mn>2</mn><mi>i</mi></mrow></math>';
  var speech = 'le complexe conjugué de 3 moins 2 i, égale 3 plus 2 i';
  this.executeRuleTest(mathml, speech, preference);
};


// Added! Test that still decimal period still works.
/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar006
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar006a = function() {
  var preference = 'Bar_Conjugate';
  var mathml = '<math><mrow><mn>0</mn><mo>.</mo><mover accent="true"><mn>3' +
      '</mn><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'la décimale 0 virgule suivi par le chiffre répété 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar007
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar007a = function() {
  var preference = 'Bar_Conjugate';
  var mathml = '<math><mrow><mn>0</mn><mo>.</mo><mover accent="true"><mrow>' +
      '<mn>12</mn></mrow><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'la décimale 0 virgule suivi par les chiffres répétés 1 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar008
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar008a = function() {
  var preference = 'Bar_Conjugate';
  var mathml = '<math><mrow><mn>2</mn><mo>.</mo><mover accent="true"><mrow>' +
      '<mn>134</mn></mrow><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'la décimale 2 virgule suivi par les chiffres répétés 1 3 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar009
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar009a = function() {
  var preference = 'Bar_Conjugate';
  var mathml = '<math><mrow><mn>.13</mn><mover accent="true"><mrow><mn>467' +
      '</mn></mrow><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'la décimale point 1 3 suivi par les chiffres répétés 4 6 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Bar010
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testBar010a = function() {
  var preference = 'Bar_Conjugate';
  var mathml = '<math><mrow><mn>25.12</mn><mover accent="true"><mrow>' +
      '<mn>632</mn></mrow><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'la décimale 2 5 point 1 2 suivi par les chiffres répétés 6 3 2';
  this.executeRuleTest(mathml, speech, preference);
};




//
// Equals Sign with Adornments
//


/**
 * Testing ClearspeakFrenchPart3Adornments Example Equal001
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testEqual001 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mover><mo>=</mo><mrow><mtext>def</mtext>' +
      '</mrow></mover></mrow></math>';
  var speech = 'est défini par';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Equal002
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testEqual002 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>∘</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mover><mo>=</mo><mrow><mtext>def</mtext></mrow></mover><mi>f' +
      '</mi><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'parenthèse gauche, f opérateur rond g, parenthèse droite, de x, est défini par, f de, g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Equal003
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testEqual003 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mover><mo>=</mo><mo>?</mo></mover></mrow></math>';
  var speech = 'signe égale avec point d\'interrogation dessus';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart3Adornments Example Equal004
 */
sre.ClearspeakFrenchPart3Adornments.prototype.testEqual004 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mi>x</mi><mo>+</mo><mn>2</mn><mover><mo>=</mo>' +
      '<mo>?</mo></mover><mn>4</mn></mrow></math>';
  var speech = 'x plus 2 signe égale avec point d\'interrogation dessus 4';
  this.executeRuleTest(mathml, speech, preference);
};
