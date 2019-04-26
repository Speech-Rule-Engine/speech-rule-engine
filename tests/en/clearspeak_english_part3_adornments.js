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


goog.provide('sre.ClearspeakEnglishPart3Adornments');

goog.require('sre.ClearspeakEnglishRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakEnglishRuleTest}
*/
sre.ClearspeakEnglishPart3Adornments = function() {
  sre.ClearspeakEnglishPart3Adornments.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakEnglishPart3Adornments rule tests.';
};
goog.inherits(sre.ClearspeakEnglishPart3Adornments, sre.ClearspeakEnglishRuleTest);



//
// Part 3: Adornments
//


//
// Prime, Double Prime, and Triple Prime
//


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime001
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime001 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><msup><mi>A</mi><mo>′</mo></msup><msup><mi>B' +
      '</mi><mo>′</mo></msup></mrow></math>';
  var speech = 'A prime, B prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime002
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime002 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><msup><mi>A</mi><mo>″</mo></msup><msup><mi>B' +
      '</mi><mo>″</mo></msup></mrow></math>';
  var speech = 'A double prime, B double prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime003
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime003 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><msup><mi>A</mi><mo>‴</mo></msup><msup><mi>B' +
      '</mi><mo>‴</mo></msup></mrow></math>';
  var speech = 'A triple prime, B triple prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime004
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime004 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mo>′</mo></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f prime of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime005
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime005 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mo>″</mo></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f double prime of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime006
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime006 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mo>‴</mo></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f triple prime of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime007
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime007 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><msup><mn>1</mn><mo>′</mo></msup></math>';
  var speech = '1 foot';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime008
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime008 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><msup><mn>2</mn><mo>′</mo></msup></math>';
  var speech = '2 feet';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime009
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime009 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><msup><mn>1</mn><mo>″</mo></msup></math>';
  var speech = '1 inch';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime010
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime010 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><msup><mn>2</mn><mo>″</mo></msup></math>';
  var speech = '2 inches';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime011
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime011 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><msup><mn>16</mn><mo>′</mo></msup><msup><mn>10' +
      '</mn><mo>″</mo></msup></mrow></math>';
  var speech = '16 feet, 10 inches';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Better handling of degrees.
/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime012
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime012 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><mn>45</mn><mo>°</mo><msup><mn>10</mn><mo>′' +
      '</mo></msup></mrow></math>';
  var speech = '45 degrees, 10 minutes';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime013
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime013 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><mi>x</mi><mo>°</mo><msup><mi>y</mi><mo>′</mo>' +
      '</msup></mrow></math>';
  var speech = 'x degrees, y minutes';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime014
 */
sre.ClearspeakEnglishPart3Adornments.prototype.untestPrime014 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><mn>45</mn><mo>°</mo><msup><mn>10</mn><mo>′' +
      '</mo></msup><msup><mn>25</mn><mo>″</mo></msup></mrow></math>';
  var speech = '45 degrees, 10 minutes, 25 seconds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime015
 */
sre.ClearspeakEnglishPart3Adornments.prototype.untestPrime015 = function() {
  var preference = 'Prime_Auto';
  var mathml = '<math><mrow><mi>x</mi><mo>°</mo><msup><mi>y</mi><mo>′</mo>' +
      '</msup><msup><mi>z</mi><mo>″</mo></msup></mrow></math>';
  var speech = 'x degrees, y minutes, z seconds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime016
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime016 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><msup><mn>1</mn><mo>′</mo></msup></math>';
  var speech = '1 minute';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime017
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime017 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><msup><mi>x</mi><mo>′</mo></msup></math>';
  var speech = 'x minutes';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime018
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime018 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><msup><mn>2</mn><mo>′</mo></msup></math>';
  var speech = '2 minutes';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime019
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime019 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><msup><mn>1</mn><mo>″</mo></msup></math>';
  var speech = '1 second';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime020
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime020 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><msup><mi>x</mi><mo>″</mo></msup></math>';
  var speech = 'x seconds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime021
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime021 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><msup><mn>2</mn><mo>″</mo></msup></math>';
  var speech = '2 seconds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime022
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime022 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><msup><mn>16</mn><mo>′</mo></msup><msup><mn>10' +
      '</mn><mo>″</mo></msup></mrow></math>';
  var speech = '16 minutes, 10 seconds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime023
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime023 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><msup><mi>x</mi><mo>′</mo></msup><msup><mi>y' +
      '</mi><mo>″</mo></msup></mrow></math>';
  var speech = 'x minutes, y seconds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime024
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime024 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><mn>45</mn><mo>°</mo><msup><mn>10</mn><mo>′' +
      '</mo></msup></mrow></math>';
  var speech = '45 degrees, 10 minutes';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime025
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime025 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><mn>45</mn><mo>°</mo><msup><mn>10</mn><mo>′' +
      '</mo></msup><msup><mn>25</mn><mo>″</mo></msup></mrow></math>';
  var speech = '45 degrees, 10 minutes, 25 seconds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime026
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime026 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><msup><mi>A</mi><mo>′</mo></msup><msup><mi>B' +
      '</mi><mo>′</mo></msup></mrow></math>';
  var speech = 'A prime, B prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime027
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime027 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><msup><mi>A</mi><mo>″</mo></msup><msup><mi>B' +
      '</mi><mo>″</mo></msup></mrow></math>';
  var speech = 'A double prime, B double prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime028
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime028 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><msup><mi>A</mi><mo>‴</mo></msup><msup><mi>B' +
      '</mi><mo>‴</mo></msup></mrow></math>';
  var speech = 'A triple prime, B triple prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime029
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime029 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><msup><mi>f</mi><mo>′</mo></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f prime of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime030
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime030 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><msup><mi>f</mi><mo>″</mo></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f double prime of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime031
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime031 = function() {
  var preference = 'Prime_Angle';
  var mathml = '<math><mrow><msup><mi>f</mi><mo>‴</mo></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f triple prime of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime032
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime032 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><msup><mn>1</mn><mo>′</mo></msup></math>';
  var speech = '1 foot';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime033
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime033 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><msup><mi>x</mi><mo>′</mo></msup></math>';
  var speech = 'x feet';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime034
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime034 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><msup><mn>2</mn><mo>′</mo></msup></math>';
  var speech = '2 feet';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime035
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime035 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><msup><mn>1</mn><mo>″</mo></msup></math>';
  var speech = '1 inch';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime036
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime036 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><msup><mi>x</mi><mo>″</mo></msup></math>';
  var speech = 'x inches';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime037
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime037 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><msup><mn>2</mn><mo>″</mo></msup></math>';
  var speech = '2 inches';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Rewrite prime etc into superscript.
/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime038
 */
sre.ClearspeakEnglishPart3Adornments.prototype.untestPrime038 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><mn>16</mn><mo>′</mo></msup><mn>10</mn><mo>″' +
      '</mo></msup></mrow></math>';
  var speech = '16 feet 10 inches';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime039
 */
sre.ClearspeakEnglishPart3Adornments.prototype.untestPrime039 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><msup><mi>x</mi><mo>′</mo></msup><msup><mi>y' +
      '</mi><mo>″</mo></msup></mrow></math>';
  var speech = 'x feet y inches';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime040
 */
sre.ClearspeakEnglishPart3Adornments.prototype.untestPrime040 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><mn>45</mn><mo>°</mo><mn>10</mn><mo>′</mo>' +
      '</msup></mrow></math>';
  var speech = '45 degrees 10 minutes';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime041
 */
sre.ClearspeakEnglishPart3Adornments.prototype.untestPrime041 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><mn>45</mn><mo>°</mo><mn>10</mn><mo>′</mo>' +
      '</msup><mn>25</mn><mo>″</mo></msup></mrow></math>';
  var speech = '45 degrees 10 minutes 25 seconds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime042
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime042 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><msup><mi>A</mi><mo>′</mo></msup><msup><mi>B' +
      '</mi><mo>′</mo></msup></mrow></math>';
  var speech = 'A prime, B prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime043
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime043 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><msup><mi>A</mi><mo>″</mo></msup><msup><mi>B' +
      '</mi><mo>″</mo></msup></mrow></math>';
  var speech = 'A double prime, B double prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime044
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime044 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><msup><mi>A</mi><mo>‴</mo></msup><msup><mi>B' +
      '</mi><mo>‴</mo></msup></mrow></math>';
  var speech = 'A triple prime, B triple prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime045
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime045 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><msup><mi>f</mi><mo>′</mo></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f prime of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime046
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime046 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><msup><mi>f</mi><mo>″</mo></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f double prime of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Prime047
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testPrime047 = function() {
  var preference = 'Prime_Length';
  var mathml = '<math><mrow><msup><mi>f</mi><mo>‴</mo></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f triple prime of x';
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
 * Testing ClearspeakEnglishPart3Adornments Example CombPerm001
 */
sre.ClearspeakEnglishPart3Adornments.prototype.untestCombPerm001 = function() {
  var preference = 'CombinationPermutation_Auto';
  var mathml = '<math><mrow><mmultiscripts><mi>C</mi><mprescripts/><mi>n' +
      '</mi><none/></mmultiscripts><msub><mrow/><mi>r</mi></msub></mrow>' +
      '</math>';
  var speech = 'n C r';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example CombPerm002
 */
sre.ClearspeakEnglishPart3Adornments.prototype.untestCombPerm002 = function() {
  var preference = 'CombinationPermutation_Auto';
  var mathml = '<math><mrow><mmultiscripts><mi>P</mi><mprescripts/><mi>n' +
      '</mi><none/></mmultiscripts><msub><mrow/><mi>r</mi></msub></mrow>' +
      '</math>';
  var speech = 'n P r';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example CombPerm003
 */
sre.ClearspeakEnglishPart3Adornments.prototype.untestCombPerm003 = function() {
  var preference = 'CombinationPermutation_Auto';
  var mathml = '<math><mrow><mmultiscripts><mi>C</mi><mprescripts/><mrow>' +
      '<mn>10</mn></mrow><none/></mmultiscripts><msub><mrow/><mn>3</mn>' +
      '</msub></mrow></math>';
  var speech = '10 C 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example CombPerm004
 */
sre.ClearspeakEnglishPart3Adornments.prototype.untestCombPerm004 = function() {
  var preference = 'CombinationPermutation_Auto';
  var mathml = '<math><mrow><mmultiscripts><mi>P</mi><mprescripts/><mrow>' +
      '<mn>10</mn></mrow><none/></mmultiscripts><msub><mrow/><mn>3</mn>' +
      '</msub></mrow></math>';
  var speech = '10 P 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example CombPerm005
 */
sre.ClearspeakEnglishPart3Adornments.prototype.untestCombPerm005 = function() {
  var preference = 'CombinationPermutation_ChoosePermute';
  var mathml = '<math><mrow><mmultiscripts><mi>C</mi><mprescripts/><mi>n' +
      '</mi><none/></mmultiscripts><msub><mrow/><mi>r</mi></msub></mrow>' +
      '</math>';
  var speech = 'n choose r';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example CombPerm006
 */
sre.ClearspeakEnglishPart3Adornments.prototype.untestCombPerm006 = function() {
  var preference = 'CombinationPermutation_ChoosePermute';
  var mathml = '<math><mrow><mmultiscripts><mi>P</mi><mprescripts/><mi>n' +
      '</mi><none/></mmultiscripts><msub><mrow/><mi>r</mi></msub></mrow>' +
      '</math>';
  var speech = 'n permute r';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example CombPerm007
 */
sre.ClearspeakEnglishPart3Adornments.prototype.untestCombPerm007 = function() {
  var preference = 'CombinationPermutation_ChoosePermute';
  var mathml = '<math><mrow><mmultiscripts><mi>C</mi><mprescripts/><mrow>' +
      '<mn>10</mn></mrow><none/></mmultiscripts><msub><mrow/><mn>3</mn>' +
      '</msub></mrow></math>';
  var speech = '10 choose 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example CombPerm008
 */
sre.ClearspeakEnglishPart3Adornments.prototype.untestCombPerm008 = function() {
  var preference = 'CombinationPermutation_ChoosePermute';
  var mathml = '<math><mrow><mmultiscripts><mi>P</mi><mprescripts/><mrow>' +
      '<mn>10</mn></mrow><none/></mmultiscripts><msub><mrow/><mn>3</mn>' +
      '</msub></mrow></math>';
  var speech = '10 permute 3';
  this.executeRuleTest(mathml, speech, preference);
};


// Cleaned up tests with the correct usage of multiscript elements.
/**
 * Testing ClearspeakEnglishPart3Adornments Example CombPerm001
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testCombPerm001a = function() {
  var preference = 'CombinationPermutation_Auto';
  var mathml = '<math><mrow><mmultiscripts><mi>C</mi><mi>r</mi>' +
      '<mprescripts/><mi>n</mi><none/></mmultiscripts></mrow></math>';
  var speech = 'n C r';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example CombPerm002
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testCombPerm002a = function() {
  var preference = 'CombinationPermutation_Auto';
  var mathml = '<math><mrow><mmultiscripts><mi>P</mi><mi>r</mi>' +
      '<mprescripts/><mi>n</mi><none/></mmultiscripts></mrow></math>';
  var speech = 'n P r';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example CombPerm003
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testCombPerm003a = function() {
  var preference = 'CombinationPermutation_Auto';
  var mathml = '<math><mrow><mmultiscripts><mi>C</mi><mn>3</mn>' +
      '<mprescripts/><mrow><mn>10</mn></mrow><none/></mmultiscripts></mrow>' +
      '</math>';
  var speech = '10 C 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example CombPerm004
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testCombPerm004a = function() {
  var preference = 'CombinationPermutation_Auto';
  var mathml = '<math><mrow><mmultiscripts><mi>P</mi><mn>3</mn>' +
      '<mprescripts/><mrow><mn>10</mn></mrow><none/></mmultiscripts></mrow>' +
      '</math>';
  var speech = '10 P 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example CombPerm005
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testCombPerm005a = function() {
  var preference = 'CombinationPermutation_ChoosePermute';
  var mathml = '<math><mrow><mmultiscripts><mi>C</mi><mi>r</mi>' +
      '<mprescripts/><mi>n</mi><none/></mmultiscripts></mrow></math>';
  var speech = 'n choose r';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example CombPerm006
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testCombPerm006a = function() {
  var preference = 'CombinationPermutation_ChoosePermute';
  var mathml = '<math><mrow><mmultiscripts><mi>P</mi><mi>r</mi>' +
      '<mprescripts/><mi>n</mi><none/></mmultiscripts></mrow></math>';
  var speech = 'n permute r';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example CombPerm007
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testCombPerm007a = function() {
  var preference = 'CombinationPermutation_ChoosePermute';
  var mathml = '<math><mrow><mmultiscripts><mi>C</mi><mn>3</mn>' +
      '<mprescripts/><mrow><mn>10</mn></mrow><none/></mmultiscripts></mrow>' +
      '</math>';
  var speech = '10 choose 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example CombPerm008
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testCombPerm008a = function() {
  var preference = 'CombinationPermutation_ChoosePermute';
  var mathml = '<math><mrow><mmultiscripts><mi>P</mi><mn>3</mn>' +
      '<mprescripts/><mrow><mn>10</mn></mrow><none/></mmultiscripts></mrow>' +
      '</math>';
  var speech = '10 permute 3';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Bar
//


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar001
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar001 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mover accent="true"><mi>f</mi><mo>¯</mo></mover></math>';
  var speech = 'f bar';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar002
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar002 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mover accent="true"><mi>f</mi><mo>¯</mo>' +
      '</mover><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f bar of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar003
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar003 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mover accent="true"><mrow><msub><mi>f</mi>' +
      '<mn>1</mn></msub></mrow><mo stretchy="true">¯</mo></mover></mrow>' +
      '</math>';
  var speech = 'f sub 1, bar';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar004
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar004 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mover accent="true"><mrow><msub><mi>f</mi>' +
      '<mn>1</mn></msub></mrow><mo stretchy="true">¯</mo></mover><mrow>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1, bar of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar005
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar005 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mover accent="true"><mi>z</mi><mo>¯</mo></mover></math>';
  var speech = 'z bar';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar006
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar006 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mn>0</mn><mo>.</mo><mover accent="true"><mn>3' +
      '</mn><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'the repeating decimal 0 point followed by repeating digit 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar007
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar007 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mn>0</mn><mo>.</mo><mover accent="true"><mrow>' +
      '<mn>12</mn></mrow><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'the repeating decimal 0 point followed by repeating digits 1 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar008
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar008 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mn>2</mn><mo>.</mo><mover accent="true"><mrow>' +
      '<mn>134</mn></mrow><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'the repeating decimal 2 point followed by repeating digits' +
      ' 1 3 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar009
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar009 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mn>.13</mn><mover accent="true"><mrow><mn>467' +
      '</mn></mrow><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'the repeating decimal point 1 3 followed by repeating' +
      ' digits 4 6 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar010
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar010 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mn>25.12</mn><mover accent="true"><mrow>' +
      '<mn>632</mn></mrow><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'the repeating decimal 2 5 point 1 2 followed by repeating' +
      ' digits 6 3 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar011
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar011 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mi>z</mi><mtext></mtext><mover accent="true">' +
      '<mi>z</mi><mo>¯</mo></mover></mrow></math>';
  var speech = 'z, z bar';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar012
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar012 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mover accent="true"><mrow><mi>C</mi><mi>D</mi>' +
      '</mrow><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'the line segment C D';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar013
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar013 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mover accent="true"><mrow><msup><mi>C</mi>' +
      '<mo>′</mo></msup><msup><mi>D</mi><mo>′</mo></msup></mrow><mo' +
      ' stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'the line segment C prime D prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar014
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar014 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mover accent="true"><mrow><msup><mi>C</mi>' +
      '<mo>″</mo></msup><msup><mi>D</mi><mo>″</mo></msup></mrow><mo' +
      ' stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'the line segment C double prime D double prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar015
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar015 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mover accent="true"><mrow><msup><mi>C</mi>' +
      '<mo>‴</mo></msup><msup><mi>D</mi><mo>‴</mo></msup></mrow><mo' +
      ' stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'the line segment C triple prime D triple prime';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar016
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar016 = function() {
  var preference = 'Bar_Conjugate';
  var mathml = '<math><mover accent="true"><mi>z</mi><mo>¯</mo></mover></math>';
  var speech = 'the complex conjugate of z';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar017
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar017 = function() {
  var preference = 'Bar_Conjugate';
  var mathml = '<math><mrow><mi>z</mi><mtext></mtext><mover accent="true">' +
      '<mi>z</mi><mo>¯</mo></mover></mrow></math>';
  var speech = 'z, the complex conjugate of z';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar018
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar018 = function() {
  var preference = 'Bar_Conjugate';
  var mathml = '<math><mrow><mover accent="true"><mrow><mn>3</mn><mo>−</mo>' +
      '<mn>2</mn><mi>i</mi></mrow><mo stretchy="true">¯</mo></mover><mo>=' +
      '</mo><mn>3</mn><mo>+</mo><mn>2</mn><mi>i</mi></mrow></math>';
  var speech = 'the complex conjugate of 3 minus 2 i, equals 3 plus 2 i';
  this.executeRuleTest(mathml, speech, preference);
};


// Added! Test that still decimal period still works.
/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar006
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar006a = function() {
  var preference = 'Bar_Conjugate';
  var mathml = '<math><mrow><mn>0</mn><mo>.</mo><mover accent="true"><mn>3' +
      '</mn><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'the repeating decimal 0 point followed by repeating digit 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar007
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar007a = function() {
  var preference = 'Bar_Conjugate';
  var mathml = '<math><mrow><mn>0</mn><mo>.</mo><mover accent="true"><mrow>' +
      '<mn>12</mn></mrow><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'the repeating decimal 0 point followed by repeating digits 1 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar008
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar008a = function() {
  var preference = 'Bar_Conjugate';
  var mathml = '<math><mrow><mn>2</mn><mo>.</mo><mover accent="true"><mrow>' +
      '<mn>134</mn></mrow><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'the repeating decimal 2 point followed by repeating digits' +
      ' 1 3 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar009
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar009a = function() {
  var preference = 'Bar_Conjugate';
  var mathml = '<math><mrow><mn>.13</mn><mover accent="true"><mrow><mn>467' +
      '</mn></mrow><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'the repeating decimal point 1 3 followed by repeating' +
      ' digits 4 6 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Bar010
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testBar010a = function() {
  var preference = 'Bar_Conjugate';
  var mathml = '<math><mrow><mn>25.12</mn><mover accent="true"><mrow>' +
      '<mn>632</mn></mrow><mo stretchy="true">¯</mo></mover></mrow></math>';
  var speech = 'the repeating decimal 2 5 point 1 2 followed by repeating' +
      ' digits 6 3 2';
  this.executeRuleTest(mathml, speech, preference);
};




//
// Equals Sign with Adornments
//


/**
 * Testing ClearspeakEnglishPart3Adornments Example Equal001
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testEqual001 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mover><mo>=</mo><mrow><mtext>def</mtext>' +
      '</mrow></mover></mrow></math>';
  var speech = 'is defined to be';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Equal002
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testEqual002 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>∘</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mover><mo>=</mo><mrow><mtext>def</mtext></mrow></mover><mi>f' +
      '</mi><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, f composed with g, close paren, of x, is' +
      ' defined to be, f of, g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Equal003
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testEqual003 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mover><mo>=</mo><mo>?</mo></mover></mrow></math>';
  var speech = 'equals sign with question mark over it';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishPart3Adornments Example Equal004
 */
sre.ClearspeakEnglishPart3Adornments.prototype.testEqual004 = function() {
  var preference = 'Bar_Auto';
  var mathml = '<math><mrow><mi>x</mi><mo>+</mo><mn>2</mn><mover><mo>=</mo>' +
      '<mo>?</mo></mover><mn>4</mn></mrow></math>';
  var speech = 'x plus 2 equals sign with question mark over it 4';
  this.executeRuleTest(mathml, speech, preference);
};
