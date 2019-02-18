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


goog.provide('sre.ClearspeakFrenchSetsEnclosedInSetBrackets');

goog.require('sre.ClearspeakFrenchRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakFrenchRuleTest}
*/
sre.ClearspeakFrenchSetsEnclosedInSetBrackets = function() {
  sre.ClearspeakFrenchSetsEnclosedInSetBrackets.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakFrenchSetsEnclosedInSetBrackets rule tests.';

};
goog.inherits(sre.ClearspeakFrenchSetsEnclosedInSetBrackets, sre.ClearspeakFrenchRuleTest);



//
// Sets Enclosed in Set Brackets
//


/**
 * Testing ClearspeakFrenchSetsEnclosedInSetBrackets Example Set001
 */
sre.ClearspeakFrenchSetsEnclosedInSetBrackets.prototype.testSet001 = function() {
  var preference = 'Sets_Auto';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|' +
      '</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}' +
      '</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchSetsEnclosedInSetBrackets Example Set002
 */
sre.ClearspeakFrenchSetsEnclosedInSetBrackets.prototype.testSet002 = function() {
  var preference = 'Sets_Auto';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>|</mo><mrow><mo>|</mo>' +
      '<mi>x</mi><mo>|</mo></mrow><mo>></mo><mn>2</mn><mo>}</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchSetsEnclosedInSetBrackets Example Set003
 */
sre.ClearspeakFrenchSetsEnclosedInSetBrackets.prototype.testSet003 = function() {
  var preference = 'Sets_Auto';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>:' +
      '</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}' +
      '</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchSetsEnclosedInSetBrackets Example Set004
 */
sre.ClearspeakFrenchSetsEnclosedInSetBrackets.prototype.testSet004 = function() {
  var preference = 'Sets_Auto';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℕ</mi><mo>:' +
      '</mo><mi>x</mi><mtext> is an even number</mtext><mo>}</mo></mrow>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchSetsEnclosedInSetBrackets Example Set005
 */
sre.ClearspeakFrenchSetsEnclosedInSetBrackets.prototype.testSet005 = function() {
  var preference = 'Sets_Auto';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mn>1</mn><mo>,</mo>' +
      '<mtext></mtext><mn>2</mn><mo>,</mo><mtext></mtext><mtext></mtext>' +
      '<mn>3</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchSetsEnclosedInSetBrackets Example Set006
 */
sre.ClearspeakFrenchSetsEnclosedInSetBrackets.prototype.testSet006 = function() {
  var preference = 'Sets_Auto';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mn>1</mn><mo>,</mo>' +
      '<mn>112</mn><mo>,</mo><mtext></mtext><mn>1</mn><mo>,</mo><mn>253' +
      '</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchSetsEnclosedInSetBrackets Example Set007
 */
sre.ClearspeakFrenchSetsEnclosedInSetBrackets.prototype.testSet007 = function() {
  var preference = 'Sets_woAll';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|' +
      '</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}' +
      '</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchSetsEnclosedInSetBrackets Example Set008
 */
sre.ClearspeakFrenchSetsEnclosedInSetBrackets.prototype.testSet008 = function() {
  var preference = 'Sets_woAll';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>|</mo><mrow><mo>|</mo>' +
      '<mi>x</mi><mo>|</mo></mrow><mo>></mo><mn>2</mn><mo>}</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchSetsEnclosedInSetBrackets Example Set009
 */
sre.ClearspeakFrenchSetsEnclosedInSetBrackets.prototype.testSet009 = function() {
  var preference = 'Sets_woAll';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>:' +
      '</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}' +
      '</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchSetsEnclosedInSetBrackets Example Set010
 */
sre.ClearspeakFrenchSetsEnclosedInSetBrackets.prototype.testSet010 = function() {
  var preference = 'Sets_woAll';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mn>1</mn><mo>,</mo>' +
      '<mtext></mtext><mn>2</mn><mo>,</mo><mtext></mtext><mtext></mtext>' +
      '<mn>3</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchSetsEnclosedInSetBrackets Example Set011
 */
sre.ClearspeakFrenchSetsEnclosedInSetBrackets.prototype.testSet011 = function() {
  var preference = 'Sets_woAll';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mn>1</mn><mo>,</mo>' +
      '<mtext></mtext><mn>112</mn><mo>,</mo><mtext></mtext><mn>1</mn><mo>,' +
      '</mo><mtext></mtext><mn>253</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchSetsEnclosedInSetBrackets Example Set012
 */
sre.ClearspeakFrenchSetsEnclosedInSetBrackets.prototype.testSet012 = function() {
  var preference = 'Sets_SilentBracket';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|' +
      '</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}' +
      '</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchSetsEnclosedInSetBrackets Example Set013
 */
sre.ClearspeakFrenchSetsEnclosedInSetBrackets.prototype.testSet013 = function() {
  var preference = 'Sets_SilentBracket';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>|</mo><mrow><mo>|</mo>' +
      '<mi>x</mi><mo>|</mo></mrow><mo>></mo><mn>2</mn><mo>}</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchSetsEnclosedInSetBrackets Example Set014
 */
sre.ClearspeakFrenchSetsEnclosedInSetBrackets.prototype.testSet014 = function() {
  var preference = 'Sets_SilentBracket';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>:' +
      '</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}' +
      '</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchSetsEnclosedInSetBrackets Example Set015
 */
sre.ClearspeakFrenchSetsEnclosedInSetBrackets.prototype.testSet015 = function() {
  var preference = 'Sets_SilentBracket';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℕ</mi><mo>:' +
      '</mo><mi>x</mi><mtext> is an even number</mtext><mo>}</mo></mrow>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchSetsEnclosedInSetBrackets Example Set016
 */
sre.ClearspeakFrenchSetsEnclosedInSetBrackets.prototype.testSet016 = function() {
  var preference = 'Sets_SilentBracket';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mn>1</mn><mo>,</mo>' +
      '<mtext></mtext><mn>2</mn><mo>,</mo><mtext></mtext><mtext></mtext>' +
      '<mn>3</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchSetsEnclosedInSetBrackets Example Set017
 */
sre.ClearspeakFrenchSetsEnclosedInSetBrackets.prototype.testSet017 = function() {
  var preference = 'Sets_SilentBracket';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mn>1</mn><mo>,</mo>' +
      '<mtext></mtext><mn>112</mn><mo>,</mo><mtext></mtext><mn>1</mn><mo>,' +
      '</mo><mtext></mtext><mn>253</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};
