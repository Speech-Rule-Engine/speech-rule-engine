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


goog.provide('sre.ClearspeakGermanSetsEnclosedInSetBrackets');

goog.require('sre.ClearspeakGermanRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakGermanRuleTest}
*/
sre.ClearspeakGermanSetsEnclosedInSetBrackets = function() {
  sre.ClearspeakGermanSetsEnclosedInSetBrackets.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakGermanSetsEnclosedInSetBrackets rule tests.';

};
goog.inherits(sre.ClearspeakGermanSetsEnclosedInSetBrackets, sre.ClearspeakGermanRuleTest);



//
// Sets Enclosed in Set Brackets
//


/**
 * Testing ClearspeakGermanSetsEnclosedInSetBrackets Example Set001
 */
sre.ClearspeakGermanSetsEnclosedInSetBrackets.prototype.testSet001 = function() {
  var preference = 'Sets_Auto';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|' +
      '</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}' +
      '</mo></mrow></math>';
  var speech = 'ensemble des x est un les nombres entiers tel que 2 inférieur à x inférieur à 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanSetsEnclosedInSetBrackets Example Set002
 */
sre.ClearspeakGermanSetsEnclosedInSetBrackets.prototype.testSet002 = function() {
  var preference = 'Sets_Auto';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>|</mo><mrow><mo>|</mo>' +
      '<mi>x</mi><mo>|</mo></mrow><mo>></mo><mn>2</mn><mo>}</mo></mrow></math>';
  var speech = 'ensemble des x tel que, la valeur absolue de x, supérieur à 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanSetsEnclosedInSetBrackets Example Set003
 */
sre.ClearspeakGermanSetsEnclosedInSetBrackets.prototype.testSet003 = function() {
  var preference = 'Sets_Auto';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>:' +
      '</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}' +
      '</mo></mrow></math>';
  var speech = 'ensemble des x est un les nombres entiers tel que 2 inférieur à x inférieur à 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanSetsEnclosedInSetBrackets Example Set004
 */
sre.ClearspeakGermanSetsEnclosedInSetBrackets.prototype.testSet004 = function() {
  var preference = 'Sets_Auto';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℕ</mi><mo>:' +
      '</mo><mi>x</mi><mtext> is an even number</mtext><mo>}</mo></mrow>' +
      '</math>';
  var speech = 'ensemble des x est un les nombres entier naturel tel que x is an even number';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanSetsEnclosedInSetBrackets Example Set005
 */
sre.ClearspeakGermanSetsEnclosedInSetBrackets.prototype.testSet005 = function() {
  var preference = 'Sets_Auto';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mn>1</mn><mo>,</mo>' +
      '<mtext></mtext><mn>2</mn><mo>,</mo><mtext></mtext><mtext></mtext>' +
      '<mn>3</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = 'ensemble 1 virgule 2 virgule 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanSetsEnclosedInSetBrackets Example Set006
 */
sre.ClearspeakGermanSetsEnclosedInSetBrackets.prototype.testSet006 = function() {
  var preference = 'Sets_Auto';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mn>1</mn><mo>,</mo>' +
      '<mn>112</mn><mo>,</mo><mtext></mtext><mn>1</mn><mo>,</mo><mn>253' +
      '</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = 'ensemble 1 virgule 112 virgule 1 virgule 253';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanSetsEnclosedInSetBrackets Example Set007
 */
sre.ClearspeakGermanSetsEnclosedInSetBrackets.prototype.testSet007 = function() {
  var preference = 'Sets_woAll';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|' +
      '</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}' +
      '</mo></mrow></math>';
  var speech = 'ensemble de x est un les nombres entiers tel que 2 inférieur à x inférieur à 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanSetsEnclosedInSetBrackets Example Set008
 */
sre.ClearspeakGermanSetsEnclosedInSetBrackets.prototype.testSet008 = function() {
  var preference = 'Sets_woAll';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>|</mo><mrow><mo>|</mo>' +
      '<mi>x</mi><mo>|</mo></mrow><mo>></mo><mn>2</mn><mo>}</mo></mrow></math>';
  var speech = 'ensemble de x tel que, la valeur absolue de x, supérieur à 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanSetsEnclosedInSetBrackets Example Set009
 */
sre.ClearspeakGermanSetsEnclosedInSetBrackets.prototype.testSet009 = function() {
  var preference = 'Sets_woAll';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>:' +
      '</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}' +
      '</mo></mrow></math>';
  var speech = 'ensemble de x est un les nombres entiers tel que 2 inférieur à x inférieur à 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanSetsEnclosedInSetBrackets Example Set010
 */
sre.ClearspeakGermanSetsEnclosedInSetBrackets.prototype.testSet010 = function() {
  var preference = 'Sets_woAll';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mn>1</mn><mo>,</mo>' +
      '<mtext></mtext><mn>2</mn><mo>,</mo><mtext></mtext><mtext></mtext>' +
      '<mn>3</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = 'ensemble 1 virgule 2 virgule 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanSetsEnclosedInSetBrackets Example Set011
 */
sre.ClearspeakGermanSetsEnclosedInSetBrackets.prototype.testSet011 = function() {
  var preference = 'Sets_woAll';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mn>1</mn><mo>,</mo>' +
      '<mtext></mtext><mn>112</mn><mo>,</mo><mtext></mtext><mn>1</mn><mo>,' +
      '</mo><mtext></mtext><mn>253</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = 'ensemble 1 virgule 112 virgule 1 virgule 253';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanSetsEnclosedInSetBrackets Example Set012
 */
sre.ClearspeakGermanSetsEnclosedInSetBrackets.prototype.testSet012 = function() {
  var preference = 'Sets_SilentBracket';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|' +
      '</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}' +
      '</mo></mrow></math>';
  var speech = 'ensemble des x est un les nombres entiers tel que 2 inférieur à x inférieur à 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanSetsEnclosedInSetBrackets Example Set013
 */
sre.ClearspeakGermanSetsEnclosedInSetBrackets.prototype.testSet013 = function() {
  var preference = 'Sets_SilentBracket';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>|</mo><mrow><mo>|</mo>' +
      '<mi>x</mi><mo>|</mo></mrow><mo>></mo><mn>2</mn><mo>}</mo></mrow></math>';
  var speech = 'ensemble des x tel que, la valeur absolue de x, supérieur à 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanSetsEnclosedInSetBrackets Example Set014
 */
sre.ClearspeakGermanSetsEnclosedInSetBrackets.prototype.testSet014 = function() {
  var preference = 'Sets_SilentBracket';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>:' +
      '</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}' +
      '</mo></mrow></math>';
  var speech = 'ensemble des x est un les nombres entiers tel que 2 inférieur à x inférieur à 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanSetsEnclosedInSetBrackets Example Set015
 */
sre.ClearspeakGermanSetsEnclosedInSetBrackets.prototype.testSet015 = function() {
  var preference = 'Sets_SilentBracket';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℕ</mi><mo>:' +
      '</mo><mi>x</mi><mtext> is an even number</mtext><mo>}</mo></mrow>' +
      '</math>';
  var speech = 'ensemble des x est un les nombres entier naturel tel que x is an even number';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanSetsEnclosedInSetBrackets Example Set016
 */
sre.ClearspeakGermanSetsEnclosedInSetBrackets.prototype.testSet016 = function() {
  var preference = 'Sets_SilentBracket';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mn>1</mn><mo>,</mo>' +
      '<mtext></mtext><mn>2</mn><mo>,</mo><mtext></mtext><mtext></mtext>' +
      '<mn>3</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = '1 virgule 2 virgule 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanSetsEnclosedInSetBrackets Example Set017
 */
sre.ClearspeakGermanSetsEnclosedInSetBrackets.prototype.testSet017 = function() {
  var preference = 'Sets_SilentBracket';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mn>1</mn><mo>,</mo>' +
      '<mtext></mtext><mn>112</mn><mo>,</mo><mtext></mtext><mn>1</mn><mo>,' +
      '</mo><mtext></mtext><mn>253</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = '1 virgule 112 virgule 1 virgule 253';
  this.executeRuleTest(mathml, speech, preference);
};
