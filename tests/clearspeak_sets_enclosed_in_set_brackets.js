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


goog.provide('sre.ClearspeakSetsEnclosedInSetBrackets');

goog.require('sre.ClearspeakRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakRuleTest}
*/
sre.ClearspeakSetsEnclosedInSetBrackets = function() {
sre.ClearspeakSetsEnclosedInSetBrackets.base(this, 'constructor');

/**
* @override
*/
this.information = 'ClearspeakSetsEnclosedInSetBrackets rule tests.';

};
goog.inherits(sre.ClearspeakSetsEnclosedInSetBrackets, sre.ClearspeakRuleTest);



//
// Sets Enclosed in Set Brackets
//


/**
 * Testing ClearspeakSetsEnclosedInSetBrackets Example Set001
 */
sre.ClearspeakSetsEnclosedInSetBrackets.prototype.testSet001 = function() {
  var preference = 'Sets_Auto';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}</mo></mrow></math>';
  var speech = 'the set of all x in the integers such that 2 is less than x is less than 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakSetsEnclosedInSetBrackets Example Set002
 */
sre.ClearspeakSetsEnclosedInSetBrackets.prototype.testSet002 = function() {
  var preference = 'Sets_Auto';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>|</mo><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>></mo><mn>2</mn><mo>}</mo></mrow></math>';
  var speech = 'the set of all x such that, the absolute value of x, is greater than 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakSetsEnclosedInSetBrackets Example Set003
 */
sre.ClearspeakSetsEnclosedInSetBrackets.prototype.testSet003 = function() {
  var preference = 'Sets_Auto';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>:</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}</mo></mrow></math>';
  var speech = 'the set of all x in the integers such that 2 is less than x is less than 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakSetsEnclosedInSetBrackets Example Set004
 */
sre.ClearspeakSetsEnclosedInSetBrackets.prototype.testSet004 = function() {
  var preference = 'Sets_Auto';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℕ</mi><mo>:</mo><mi>x</mi><mtext> is an even number</mtext><mo>}</mo></mrow></math>';
  var speech = 'the set of all x in the natural numbers such that x is an even number';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakSetsEnclosedInSetBrackets Example Set005
 */
sre.ClearspeakSetsEnclosedInSetBrackets.prototype.testSet005 = function() {
  var preference = 'Sets_Auto';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mn>1</mn><mo>,</mo><mtext></mtext><mn>2</mn><mo>,</mo><mtext></mtext><mtext></mtext><mn>3</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = 'the set 1 comma 2 comma 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakSetsEnclosedInSetBrackets Example Set006
 */
sre.ClearspeakSetsEnclosedInSetBrackets.prototype.testSet006 = function() {
  var preference = 'Sets_Auto';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mn>1</mn><mo>,</mo><mn>112</mn><mo>,</mo><mtext></mtext><mn>1</mn><mo>,</mo><mn>253</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = 'the set 1 comma 112 comma 1 comma 253';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakSetsEnclosedInSetBrackets Example Set007
 */
sre.ClearspeakSetsEnclosedInSetBrackets.prototype.testSet007 = function() {
  var preference = 'Sets_woAll';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}</mo></mrow></math>';
  var speech = 'the set of x in the integers such that 2 is less than x is less than 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakSetsEnclosedInSetBrackets Example Set008
 */
sre.ClearspeakSetsEnclosedInSetBrackets.prototype.testSet008 = function() {
  var preference = 'Sets_woAll';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>|</mo><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>></mo><mn>2</mn><mo>}</mo></mrow></math>';
  var speech = 'the set of x such that, the absolute value of x, is greater than 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakSetsEnclosedInSetBrackets Example Set009
 */
sre.ClearspeakSetsEnclosedInSetBrackets.prototype.testSet009 = function() {
  var preference = 'Sets_woAll';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>:</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}</mo></mrow></math>';
  var speech = 'the set of x in the integers such that 2 is less than x is less than 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakSetsEnclosedInSetBrackets Example Set010
 */
sre.ClearspeakSetsEnclosedInSetBrackets.prototype.testSet010 = function() {
  var preference = 'Sets_woAll';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mn>1</mn><mo>,</mo><mtext></mtext><mn>2</mn><mo>,</mo><mtext></mtext><mtext></mtext><mn>3</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = 'the set 1 comma 2 comma 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakSetsEnclosedInSetBrackets Example Set011
 */
sre.ClearspeakSetsEnclosedInSetBrackets.prototype.testSet011 = function() {
  var preference = 'Sets_woAll';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mn>1</mn><mo>,</mo><mtext></mtext><mn>112</mn><mo>,</mo><mtext></mtext><mn>1</mn><mo>,</mo><mtext></mtext><mn>253</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = 'the set 1 comma 112 comma 1 comma 253';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakSetsEnclosedInSetBrackets Example Set012
 */
sre.ClearspeakSetsEnclosedInSetBrackets.prototype.testSet012 = function() {
  var preference = 'Sets_SilentBracket';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}</mo></mrow></math>';
  var speech = 'the set of all x in the integers such that 2 is less than x is less than 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakSetsEnclosedInSetBrackets Example Set013
 */
sre.ClearspeakSetsEnclosedInSetBrackets.prototype.testSet013 = function() {
  var preference = 'Sets_SilentBracket';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>|</mo><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>></mo><mn>2</mn><mo>}</mo></mrow></math>';
  var speech = 'the set of all x such that, the absolute value of x, is greater than 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakSetsEnclosedInSetBrackets Example Set014
 */
sre.ClearspeakSetsEnclosedInSetBrackets.prototype.testSet014 = function() {
  var preference = 'Sets_SilentBracket';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>:</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}</mo></mrow></math>';
  var speech = 'the set of all x in the integers such that 2 is less than x is less than 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakSetsEnclosedInSetBrackets Example Set015
 */
sre.ClearspeakSetsEnclosedInSetBrackets.prototype.testSet015 = function() {
  var preference = 'Sets_SilentBracket';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℕ</mi><mo>:</mo><mi>x</mi><mtext> is an even number</mtext><mo>}</mo></mrow></math>';
  var speech = 'the set of all x in the natural numbers such that x is an even number';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakSetsEnclosedInSetBrackets Example Set016
 */
sre.ClearspeakSetsEnclosedInSetBrackets.prototype.testSet016 = function() {
  var preference = 'Sets_SilentBracket';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mn>1</mn><mo>,</mo><mtext></mtext><mn>2</mn><mo>,</mo><mtext></mtext><mtext></mtext><mn>3</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = '1 comma 2 comma 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakSetsEnclosedInSetBrackets Example Set017
 */
sre.ClearspeakSetsEnclosedInSetBrackets.prototype.testSet017 = function() {
  var preference = 'Sets_SilentBracket';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mn>1</mn><mo>,</mo><mtext></mtext><mn>112</mn><mo>,</mo><mtext></mtext><mn>1</mn><mo>,</mo><mtext></mtext><mn>253</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = '1 comma 112 comma 1 comma 253';
  this.executeRuleTest(mathml, speech, preference);
};
