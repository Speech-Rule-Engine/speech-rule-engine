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


goog.provide('sre.ClearspeakFrenchPart2Symbols');

goog.require('sre.ClearspeakFrenchRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakFrenchRuleTest}
*/
sre.ClearspeakFrenchPart2Symbols = function() {
  sre.ClearspeakFrenchPart2Symbols.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'ClearspeakFrenchPart2Symbols rule tests.';
};
goog.inherits(sre.ClearspeakFrenchPart2Symbols, sre.ClearspeakFrenchRuleTest);



//
// Part 2: Symbols
//


//
// Multiplication Symbol
//


/**
 * Testing ClearspeakFrenchPart2Symbols Example X001
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testX001 = function() {
  var preference = 'MultsymbolX_Auto';
  var mathml = '<math><mrow><mn>6</mn><mo>×</mo><mn>8</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example X002
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testX002 = function() {
  var preference = 'MultsymbolX_Auto';
  var mathml = '<math><mrow><mi>m</mi><mo>×</mo><mi>n</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example X003
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testX003 = function() {
  var preference = 'MultsymbolX_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>×</mo><mn>3</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example X004
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testX004 = function() {
  var preference = 'MultsymbolX_By';
  var mathml = '<math><mrow><mn>6</mn><mo>×</mo><mn>8</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example X005
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testX005 = function() {
  var preference = 'MultsymbolX_By';
  var mathml = '<math><mrow><mi>m</mi><mo>×</mo><mi>n</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example X006
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testX006 = function() {
  var preference = 'MultsymbolX_By';
  var mathml = '<math><mrow><mn>3</mn><mo>×</mo><mn>3</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example X007
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testX007 = function() {
  var preference = 'MultsymbolX_Cross';
  var mathml = '<math><mrow><mstyle mathvariant="bold" mathsize="normal">' +
      '<mi>u</mi></mstyle><mo>×</mo><mstyle mathvariant="bold"' +
      ' mathsize="normal"><mi>v</mi></mstyle></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Multiplication Symbol
//


/**
 * Testing ClearspeakFrenchPart2Symbols Example Dot001
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testDot001 = function() {
  var preference = 'MultsymbolDot_Auto';
  var mathml = '<math><mrow><mn>6</mn><mo>⋅</mo><mn>8</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Dot002
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testDot002 = function() {
  var preference = 'MultsymbolDot_Auto';
  var mathml = '<math><mrow><mi>m</mi><mo>⋅</mo><mi>n</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Dot003
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testDot003 = function() {
  var preference = 'MultsymbolDot_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>⋅</mo><mn>3</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Dot004
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testDot004 = function() {
  var preference = 'MultsymbolDot_Dot';
  var mathml = '<math><mrow><mn>6</mn><mo>⋅</mo><mn>8</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Dot005
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testDot005 = function() {
  var preference = 'MultsymbolDot_Dot';
  var mathml = '<math><mrow><mi>m</mi><mo>⋅</mo><mi>n</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Dot006
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testDot006 = function() {
  var preference = 'MultsymbolDot_Dot';
  var mathml = '<math><mrow><mn>3</mn><mo>⋅</mo><mn>3</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Triangle Symbol
//


/**
 * Testing ClearspeakFrenchPart2Symbols Example Triangle001
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testTriangle001 = function() {
  var preference = 'TriangleSymbol_Auto';
  var mathml = '<math><mrow><mi>Δ</mi><mi>A</mi><mi>B</mi><mi>C</mi></mrow>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Triangle002
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testTriangle002 = function() {
  var preference = 'TriangleSymbol_Auto';
  var mathml = '<math><mrow><mi>Δ</mi><mi>D</mi><mi>E</mi><mi>F</mi></mrow>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Triangle003
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testTriangle003 = function() {
  var preference = 'TriangleSymbol_Delta';
  var mathml = '<math><mrow><mi>Δ</mi><mi>x</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Triangle004
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testTriangle004 = function() {
  var preference = 'TriangleSymbol_Delta';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mi>Δ</mi><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Ellipses
//


/**
 * Testing ClearspeakFrenchPart2Symbols Example Ellipses001
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testEllipses001 = function() {
  var preference = 'Ellipses_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>,</mo><mtext></mtext><mn>2</mn>' +
      '<mo>,</mo><mtext></mtext><mn>3</mn><mo>,</mo><mtext></mtext><mo>…' +
      '</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Ellipses002
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testEllipses002 = function() {
  var preference = 'Ellipses_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>,</mo><mtext></mtext><mn>2</mn>' +
      '<mo>,</mo><mtext></mtext><mn>3</mn><mo>,</mo><mtext></mtext><mo>…' +
      '</mo><mtext></mtext><mo>,</mo><mn>20</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Ellipses003
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testEllipses003 = function() {
  var preference = 'Ellipses_Auto';
  var mathml = '<math><mrow><mo>…</mo><mtext></mtext><mo>,</mo><mo>−</mo>' +
      '<mn>2</mn><mo>,</mo><mtext></mtext><mo>−</mo><mn>1</mn><mo>,</mo>' +
      '<mtext></mtext><mn>0</mn><mo>,</mo><mtext></mtext><mn>1</mn><mo>,' +
      '</mo><mtext></mtext><mn>2</mn><mo>,</mo><mtext></mtext><mo>…</mo>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Ellipses004
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testEllipses004 = function() {
  var preference = 'Ellipses_AndSoOn';
  var mathml = '<math><mrow><mn>1</mn><mo>,</mo><mtext></mtext><mn>2</mn>' +
      '<mo>,</mo><mtext></mtext><mn>3</mn><mo>,</mo><mtext></mtext><mo>…' +
      '</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Ellipses005
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testEllipses005 = function() {
  var preference = 'Ellipses_AndSoOn';
  var mathml = '<math><mrow><mn>1</mn><mo>,</mo><mtext></mtext><mn>2</mn>' +
      '<mo>,</mo><mtext></mtext><mn>3</mn><mo>,</mo><mtext></mtext><mo>…' +
      '</mo><mtext></mtext><mo>,</mo><mn>20</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Ellipses006
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testEllipses006 = function() {
  var preference = 'Ellipses_AndSoOn';
  var mathml = '<math><mrow><mo>…</mo><mtext></mtext><mo>,</mo><mo>−</mo>' +
      '<mn>2</mn><mo>,</mo><mtext></mtext><mo>−</mo><mn>1</mn><mo>,</mo>' +
      '<mtext></mtext><mn>0</mn><mo>,</mo><mtext></mtext><mn>1</mn><mo>,' +
      '</mo><mtext></mtext><mn>2</mn><mo>,</mo><mtext></mtext><mo>…</mo>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Vertical Line
//


/**
 * Testing ClearspeakFrenchPart2Symbols Example VertLine001
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testVertLine001 = function() {
  var preference = 'VerticalLine_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>|</mo><mn>6</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example VertLine002
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testVertLine002 = function() {
  var preference = 'VerticalLine_Auto';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mi>x</mi><mo>|</mo><mi>x' +
      '</mi><mo>></mo><mn>0</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example VertLine003
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testVertLine003 = function() {
  var preference = 'VerticalLine_Auto';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mi>x</mi><mo>|</mo>' +
      '<mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>></mo><mn>2</mn>' +
      '</mrow><mo>}</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example VertLine004
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testVertLine004 = function() {
  var preference = 'VerticalLine_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><msub><mo>|</mo><mrow><mi>x</mi><mo>=</mo><mn>5</mn></mrow>' +
      '</msub></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example VertLine005
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testVertLine005 = function() {
  var preference = 'VerticalLine_Auto';
  var mathml = '<math><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo>' +
      '<mn>2</mn><mi>x</mi><msub><mo>|</mo><mrow><mi>x</mi><mo>=</mo><mn>2' +
      '</mn></mrow></msub></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example VertLine006
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testVertLine006 = function() {
  var preference = 'VerticalLine_Auto';
  var mathml = '<math><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo>' +
      '<mi>x</mi><msubsup><mstyle mathsize="140%" displaystyle="true"><mo>|' +
      '</mo></mstyle><mn>0</mn><mn>1</mn></msubsup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example VertLine007
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testVertLine007 = function() {
  var preference = 'VerticalLine_SuchThat';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mi>x</mi><mo>|</mo><mi>x' +
      '</mi><mo>></mo><mn>0</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example VertLine008
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testVertLine008 = function() {
  var preference = 'VerticalLine_Divides';
  var mathml = '<math><mrow><mn>3</mn><mo>|</mo><mn>6</mn></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example VertLine009
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testVertLine009 = function() {
  var preference = 'VerticalLine_Given';
  var mathml = '<math><mrow><mi>P</mi><mtext></mtext><mrow><mo>(</mo><mrow>' +
      '<mi>A</mi><mo>|</mo><mi>B</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Set Membership Symbols
//


/**
 * Testing ClearspeakFrenchPart2Symbols Example MembSym001
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testMembSym001 = function() {
  var preference = 'SetMemberSymbol_Auto';
  var mathml = '<math><mtext>If </mtext><mrow><mi>x</mi><mo>∈</mo><mi>ℤ' +
      '</mi></mrow><mtext> then </mtext><mrow><mn>2</mn><mi>x</mi></mrow>' +
      '<mtext> is an even  number.</mtext></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example MembSym002
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testMembSym002 = function() {
  var preference = 'SetMemberSymbol_Auto';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|' +
      '</mo><mi>x</mi><mo>></mo><mn>5</mn><mo>}</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example MembSym003
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testMembSym003 = function() {
  var preference = 'SetMemberSymbol_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mn>2</mn><mi>i</mi><mo>∉' +
      '</mo><mi>ℝ</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example MembSym004
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testMembSym004 = function() {
  var preference = 'SetMemberSymbol_Member';
  var mathml = '<math><mtext>If </mtext><mrow><mi>x</mi><mo>∈</mo><mi>ℤ' +
      '</mi></mrow><mtext> then </mtext><mrow><mn>2</mn><mi>x</mi></mrow>' +
      '<mtext> is an even  number.</mtext></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example MembSym005
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testMembSym005 = function() {
  var preference = 'SetMemberSymbol_Member';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|' +
      '</mo><mi>x</mi><mo>></mo><mn>5</mn><mo>}</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example MembSym006
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testMembSym006 = function() {
  var preference = 'SetMemberSymbol_Member';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mn>2</mn><mi>i</mi><mo>∉' +
      '</mo><mi>ℝ</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example MembSym007
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testMembSym007 = function() {
  var preference = 'SetMemberSymbol_Element';
  var mathml = '<math><mtext>If </mtext><mrow><mi>x</mi><mo>∈</mo><mi>ℤ' +
      '</mi></mrow><mtext> then </mtext><mrow><mn>2</mn><mi>x</mi></mrow>' +
      '<mtext> is an even  number.</mtext></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example MembSym008
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testMembSym008 = function() {
  var preference = 'SetMemberSymbol_Element';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|' +
      '</mo><mi>x</mi><mo>></mo><mn>5</mn><mo>}</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example MembSym009
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testMembSym009 = function() {
  var preference = 'SetMemberSymbol_Element';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mn>2</mn><mi>i</mi><mo>∉' +
      '</mo><mi>ℝ</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example MembSym010
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testMembSym010 = function() {
  var preference = 'SetMemberSymbol_Belongs';
  var mathml = '<math><mtext>If </mtext><mrow><mi>x</mi><mo>∈</mo><mi>ℤ' +
      '</mi></mrow><mtext> then </mtext><mrow><mn>2</mn><mi>x</mi></mrow>' +
      '<mtext> is an even  number.</mtext></math>';
  // var mathml = '<math><mrow><mi>x</mi><mo>∈</mo><mi>ℤ</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example MembSym011
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testMembSym011 = function() {
  var preference = 'SetMemberSymbol_Belongs';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|' +
      '</mo><mi>x</mi><mo>></mo><mn>5</mn><mo>}</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example MembSym012
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testMembSym012 = function() {
  var preference = 'SetMemberSymbol_Belongs';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mn>2</mn><mi>i</mi><mo>∉' +
      '</mo><mi>ℝ</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example MembSym013
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testMembSym013 = function() {
  var preference = 'SetMemberSymbol_Belongs';
  var mathml = '<math><mtext>If </mtext><mrow><mi>x</mi><mo>∈</mo><mi>ℤ' +
      '</mi></mrow><mtext> then </mtext><mrow><mn>2</mn><mi>x</mi></mrow>' +
      '<mtext> is an even  number.</mtext></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example MembSym014
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testMembSym014 = function() {
  var preference = 'SetMemberSymbol_Belongs';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|' +
      '</mo><mi>x</mi><mo>></mo><mn>5</mn><mo>}</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example MembSym015
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testMembSym015 = function() {
  var preference = 'SetMemberSymbol_Belongs';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mn>2</mn><mi>i</mi><mo>∉' +
      '</mo><mi>ℝ</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Two preferences set: One for Sets and one for SetMemberSymbol
//


/**
 * Testing ClearspeakFrenchPart2Symbols Example SetMemb001
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSetMemb001 = function() {
  var preference = 'Sets_woAll:SetMemberSymbol_Belongs';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>:' +
      '</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}' +
      '</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example SetMemb002
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSetMemb002 = function() {
  var preference = 'Sets_woAll:SetMemberSymbol_Member';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|' +
      '</mo><mi>x</mi><mo>></mo><mn>5</mn><mo>}</mo></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Sums, Products, Unions, Intersections, and Integrals
//


/**
 * Testing ClearspeakFrenchPart2Symbols Example Sum001
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSum001 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munderover><mo>∑' +
      '</mo><mrow><mi>n</mi><mo>=</mo><mn>1</mn></mrow><mrow><mn>10</mn>' +
      '</mrow></munderover><mi>n</mi></mstyle></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Sum002
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSum002 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munderover><mo>∑' +
      '</mo><mrow><mi>n</mi><mo>=</mo><mn>1</mn></mrow><mi>∞</mi>' +
      '</munderover><mi>n</mi></mstyle></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Sum003
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSum003 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munder><mo>∑</mo>' +
      '<mrow><mi>i</mi><mo>∈</mo><msup><mi>ℤ</mi><mo>+</mo></msup></mrow>' +
      '</munder><mi>i</mi></mstyle></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Sum004
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSum004 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munder><mo>∑</mo>' +
      '<mi>S</mi></munder><mi>i</mi></mstyle></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Sum005
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSum005 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><mo>∑</mo><mrow>' +
      '<msub><mi>a</mi><mi>i</mi></msub></mrow></mstyle></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Sum006
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSum006 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munderover><mo>∏' +
      '</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mrow><mn>10</mn>' +
      '</mrow></munderover><mi>i</mi></mstyle></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Sum007
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSum007 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munder><mo>∏</mo>' +
      '<mrow><mi>i</mi><mo>∈</mo><msup><mi>ℤ</mi><mo>+</mo></msup></mrow>' +
      '</munder><mrow><mfrac><mi>i</mi><mrow><mi>i</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></mfrac></mrow></mstyle></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Sum008
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSum008 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munder><mo>∏</mo>' +
      '<mrow><msup><mi>ℤ</mi><mo>+</mo></msup></mrow></munder><mrow><mfrac>' +
      '<mi>i</mi><mrow><mi>i</mi><mo>+</mo><mn>1</mn></mrow></mfrac></mrow>' +
      '</mstyle></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Sum009
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSum009 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><mo>∏</mo><mrow>' +
      '<msub><mi>a</mi><mi>i</mi></msub></mrow></mstyle></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Sum010
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSum010 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munderover><mo>∩' +
      '</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mrow><mn>10</mn>' +
      '</mrow></munderover><mrow><msub><mi>S</mi><mi>i</mi></msub></mrow>' +
      '</mstyle></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Sum011
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSum011 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munderover><mo>∪' +
      '</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mrow><mn>10</mn>' +
      '</mrow></munderover><mrow><msub><mi>S</mi><mi>i</mi></msub></mrow>' +
      '</mstyle></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Sum012
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSum012 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><mo>∩</mo><mrow>' +
      '<msub><mi>S</mi><mi>i</mi></msub></mrow></mstyle></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Sum013
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSum013 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><mo>∪</mo><mrow>' +
      '<msub><mi>S</mi><mi>i</mi></msub></mrow></mstyle></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Sum014
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSum014 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munder><mo>∩</mo>' +
      '<mi>C</mi></munder><mrow><msub><mi>S</mi><mi>i</mi></msub></mrow>' +
      '</mstyle></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Sum015
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSum015 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munder><mo>∪</mo>' +
      '<mi>C</mi></munder><mrow><msub><mi>S</mi><mi>i</mi></msub></mrow>' +
      '</mstyle></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Sum016
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSum016 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><mrow><mo>∫</mo>' +
      '<mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mtext>' +
      '</mtext></mrow></mrow></mstyle><mi>d</mi><mi>x</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Sum017
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSum017 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><mrow><msubsup>' +
      '<mo>∫</mo><mn>0</mn><mn>1</mn></msubsup><mrow><mi>f</mi><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></mrow></mstyle><mtext>' +
      '</mtext><mi>d</mi><mi>x</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchPart2Symbols Example Sum018
 */
sre.ClearspeakFrenchPart2Symbols.prototype.testSum018 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><mrow><munder><mo>∫' +
      '</mo><mi>ℝ</mi></munder><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></mrow></mstyle><mtext></mtext><mi>d</mi>' +
      '<mi>x</mi></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};
