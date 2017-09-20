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


goog.provide('sre.ClearspeakPart2Symbols');

goog.require('sre.ClearspeakRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakRuleTest}
*/
sre.ClearspeakPart2Symbols = function() {
sre.ClearspeakPart2Symbols.base(this, 'constructor');

/**
* @override
*/
this.information = 'ClearspeakPart2Symbols rule tests.';
  sre.Debugger.getInstance().init();
};
goog.inherits(sre.ClearspeakPart2Symbols, sre.ClearspeakRuleTest);



//
// Part 2: Symbols
//


//
// Multiplication Symbol 
//


/**
 * Testing ClearspeakPart2Symbols Example X001
 */
sre.ClearspeakPart2Symbols.prototype.testX001 = function() {
  var preference = 'MultsymbolX_Auto';
  var mathml = '<math><mrow><mn>6</mn><mo>×</mo><mn>8</mn></mrow></math>';
  var speech = '6 times 8';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example X002
 */
sre.ClearspeakPart2Symbols.prototype.testX002 = function() {
  var preference = 'MultsymbolX_Auto';
  var mathml = '<math><mrow><mi>m</mi><mo>×</mo><mi>n</mi></mrow></math>';
  var speech = 'm times n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example X003
 */
sre.ClearspeakPart2Symbols.prototype.testX003 = function() {
  var preference = 'MultsymbolX_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>×</mo><mn>3</mn></mrow></math>';
  var speech = '3 times 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example X004
 */
sre.ClearspeakPart2Symbols.prototype.testX004 = function() {
  var preference = 'MultsymbolX_By';
  var mathml = '<math><mrow><mn>6</mn><mo>×</mo><mn>8</mn></mrow></math>';
  var speech = '6 by 8';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example X005
 */
sre.ClearspeakPart2Symbols.prototype.testX005 = function() {
  var preference = 'MultsymbolX_By';
  var mathml = '<math><mrow><mi>m</mi><mo>×</mo><mi>n</mi></mrow></math>';
  var speech = 'm by n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example X006
 */
sre.ClearspeakPart2Symbols.prototype.testX006 = function() {
  var preference = 'MultsymbolX_By';
  var mathml = '<math><mrow><mn>3</mn><mo>×</mo><mn>3</mn></mrow></math>';
  var speech = '3 by 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example X007
 */
sre.ClearspeakPart2Symbols.prototype.testX007 = function() {
  var preference = 'MultsymbolX_Cross';
  var mathml = '<math><mrow><mstyle mathvariant="bold" mathsize="normal"><mi>u</mi></mstyle><mo>×</mo><mstyle mathvariant="bold" mathsize="normal"><mi>v</mi></mstyle></mrow></math>';
  var speech = 'u cross v';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Multiplication Symbol 
//


/**
 * Testing ClearspeakPart2Symbols Example Dot001
 */
sre.ClearspeakPart2Symbols.prototype.testDot001 = function() {
  var preference = 'MultsymbolDot_Auto';
  var mathml = '<math><mrow><mn>6</mn><mo>⋅</mo><mn>8</mn></mrow></math>';
  var speech = '6 times 8';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Dot002
 */
sre.ClearspeakPart2Symbols.prototype.testDot002 = function() {
  var preference = 'MultsymbolDot_Auto';
  var mathml = '<math><mrow><mi>m</mi><mo>⋅</mo><mi>n</mi></mrow></math>';
  var speech = 'm times n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Dot003
 */
sre.ClearspeakPart2Symbols.prototype.testDot003 = function() {
  var preference = 'MultsymbolDot_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>⋅</mo><mn>3</mn></mrow></math>';
  var speech = '3 times 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Dot004
 */
sre.ClearspeakPart2Symbols.prototype.testDot004 = function() {
  var preference = 'MultsymbolDot_Dot';
  var mathml = '<math><mrow><mn>6</mn><mo>⋅</mo><mn>8</mn></mrow></math>';
  var speech = '6 dot 8';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Dot005
 */
sre.ClearspeakPart2Symbols.prototype.testDot005 = function() {
  var preference = 'MultsymbolDot_Dot';
  var mathml = '<math><mrow><mi>m</mi><mo>⋅</mo><mi>n</mi></mrow></math>';
  var speech = 'm dot n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Dot006
 */
sre.ClearspeakPart2Symbols.prototype.testDot006 = function() {
  var preference = 'MultsymbolDot_Dot';
  var mathml = '<math><mrow><mn>3</mn><mo>⋅</mo><mn>3</mn></mrow></math>';
  var speech = '3 dot 3';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Triangle Symbol
//


/**
 * Testing ClearspeakPart2Symbols Example Triangle001
 */
sre.ClearspeakPart2Symbols.prototype.untestTriangle001 = function() {
  var preference = 'TriangleSymbol_Auto';
  var mathml = '<math><mrow><mi>Δ</mi><mi>A</mi><mi>B</mi><mi>C</mi></mrow></math>';
  var speech = 'triangle ABC';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Triangle002
 */
sre.ClearspeakPart2Symbols.prototype.untestTriangle002 = function() {
  var preference = 'TriangleSymbol_Auto';
  var mathml = '<math><mrow><mi>Δ</mi><mi>D</mi><mi>E</mi><mi>F</mi></mrow></math>';
  var speech = 'triangle DEF';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Triangle003
 */
sre.ClearspeakPart2Symbols.prototype.untestTriangle003 = function() {
  var preference = 'TriangleSymbol_Delta';
  var mathml = '<math><mrow><mi>Δ</mi><mi>x</mi></mrow></math>';
  var speech = 'delta x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Triangle004
 */
sre.ClearspeakPart2Symbols.prototype.untestTriangle004 = function() {
  var preference = 'TriangleSymbol_Delta';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>Δ</mi><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'F of, open paren, x plus delta x, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Ellipses
//


/**
 * Testing ClearspeakPart2Symbols Example Ellipses001
 */
sre.ClearspeakPart2Symbols.prototype.testEllipses001 = function() {
  var preference = 'Ellipses_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>,</mo><mtext></mtext><mn>2</mn><mo>,</mo><mtext></mtext><mn>3</mn><mo>,</mo><mtext></mtext><mo>…</mo></mrow></math>';
  var speech = '1 comma 2 comma 3 comma dot dot dot';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Ellipses002
 */
sre.ClearspeakPart2Symbols.prototype.testEllipses002 = function() {
  var preference = 'Ellipses_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>,</mo><mtext></mtext><mn>2</mn><mo>,</mo><mtext></mtext><mn>3</mn><mo>,</mo><mtext></mtext><mo>…</mo><mtext></mtext><mo>,</mo><mn>20</mn></mrow></math>';
  var speech = '1 comma 2 comma 3 comma dot dot dot comma 20';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Ellipses003
 */
sre.ClearspeakPart2Symbols.prototype.testEllipses003 = function() {
  var preference = 'Ellipses_Auto';
  var mathml = '<math><mrow><mo>…</mo><mtext></mtext><mo>,</mo><mo>−</mo><mn>2</mn><mo>,</mo><mtext></mtext><mo>−</mo><mn>1</mn><mo>,</mo><mtext></mtext><mn>0</mn><mo>,</mo><mtext></mtext><mn>1</mn><mo>,</mo><mtext></mtext><mn>2</mn><mo>,</mo><mtext></mtext><mo>…</mo></mrow></math>';
  var speech = 'dot dot dot comma, negative 2, comma, negative 1, comma 0 comma 1 comma 2 comma dot dot dot';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Ellipses004
 */
sre.ClearspeakPart2Symbols.prototype.testEllipses004 = function() {
  var preference = 'Ellipses_AndSoOn';
  var mathml = '<math><mrow><mn>1</mn><mo>,</mo><mtext></mtext><mn>2</mn><mo>,</mo><mtext></mtext><mn>3</mn><mo>,</mo><mtext></mtext><mo>…</mo></mrow></math>';
  var speech = '1 comma 2 comma 3 comma and so on';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Ellipses005
 */
sre.ClearspeakPart2Symbols.prototype.testEllipses005 = function() {
  var preference = 'Ellipses_AndSoOn';
  var mathml = '<math><mrow><mn>1</mn><mo>,</mo><mtext></mtext><mn>2</mn><mo>,</mo><mtext></mtext><mn>3</mn><mo>,</mo><mtext></mtext><mo>…</mo><mtext></mtext><mo>,</mo><mn>20</mn></mrow></math>';
  var speech = '1 comma 2 comma 3 comma and so on up to comma 20';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Ellipses006
 */
sre.ClearspeakPart2Symbols.prototype.testEllipses006 = function() {
  var preference = 'Ellipses_AndSoOn';
  var mathml = '<math><mrow><mo>…</mo><mtext></mtext><mo>,</mo><mo>−</mo><mn>2</mn><mo>,</mo><mtext></mtext><mo>−</mo><mn>1</mn><mo>,</mo><mtext></mtext><mn>0</mn><mo>,</mo><mtext></mtext><mn>1</mn><mo>,</mo><mtext></mtext><mn>2</mn><mo>,</mo><mtext></mtext><mo>…</mo></mrow></math>';
  var speech = 'dot dot dot comma, negative 2, comma, negative 1, comma 0 comma 1 comma 2 comma dot dot dot';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Vertical Line
//


/**
 * Testing ClearspeakPart2Symbols Example VertLine001
 */
sre.ClearspeakPart2Symbols.prototype.testVertLine001 = function() {
  var preference = 'VerticalLine_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>|</mo><mn>6</mn></mrow></math>';
  var speech = '3 divides 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example VertLine002
 */
sre.ClearspeakPart2Symbols.prototype.testVertLine002 = function() {
  var preference = 'VerticalLine_Auto';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mi>x</mi><mo>|</mo><mi>x</mi><mo>></mo><mn>0</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = 'the set of all x such that x is greater than 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example VertLine003
 */
sre.ClearspeakPart2Symbols.prototype.testVertLine003 = function() {
  var preference = 'VerticalLine_Auto';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mi>x</mi><mo>|</mo><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>></mo><mn>2</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = 'the set of all x such that, the absolute value of x, is greater than 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example VertLine004
 */
sre.ClearspeakPart2Symbols.prototype.testVertLine004 = function() {
  var preference = 'VerticalLine_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><msub><mo>|</mo><mrow><mi>x</mi><mo>=</mo><mn>5</mn></mrow></msub></mrow></math>';
  var speech = 'f of x, evaluated at x equals 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example VertLine005
 */
sre.ClearspeakPart2Symbols.prototype.testVertLine005 = function() {
  var preference = 'VerticalLine_Auto';
  var mathml = '<math><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>2</mn><mi>x</mi><msub><mo>|</mo><mrow><mi>x</mi><mo>=</mo><mn>2</mn></mrow></msub></mrow></math>';
  var speech = 'x squared plus 2 x, evaluated at x equals 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example VertLine006
 */
sre.ClearspeakPart2Symbols.prototype.testVertLine006 = function() {
  var preference = 'VerticalLine_Auto';
  var mathml = '<math><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mi>x</mi><msubsup><mstyle mathsize="140%" displaystyle="true"><mo>|</mo></mstyle><mn>0</mn><mn>1</mn></msubsup></mrow></math>';
  var speech = 'x squared plus x, evaluated at 1, minus the same expression evaluated at 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example VertLine007
 */
sre.ClearspeakPart2Symbols.prototype.testVertLine007 = function() {
  var preference = 'VerticalLine_SuchThat';
  var mathml = '<math><mrow><mrow><mo>{</mo><mrow><mi>x</mi><mo>|</mo><mi>x</mi><mo>></mo><mn>0</mn></mrow><mo>}</mo></mrow></mrow></math>';
  var speech = 'the set of all x such that x is greater than 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example VertLine008
 */
sre.ClearspeakPart2Symbols.prototype.testVertLine008 = function() {
  var preference = 'VerticalLine_Divides';
  var mathml = '<math><mrow><mn>3</mn><mo>|</mo><mn>6</mn></mrow></math>';
  var speech = '3 divides 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example VertLine009
 */
sre.ClearspeakPart2Symbols.prototype.testVertLine009 = function() {
  var preference = 'VerticalLine_Given';
  var mathml = '<math><mrow><mi>P</mi><mtext></mtext><mrow><mo>(</mo><mrow><mi>A</mi><mo>|</mo><mi>B</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'P of, open paren, A given B, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Set Membership Symbols
//


/**
 * Testing ClearspeakPart2Symbols Example MembSym001
 */
sre.ClearspeakPart2Symbols.prototype.untestMembSym001 = function() {
  var preference = 'VerticalLine_Auto';
  var mathml = '<math><mtext>If </mtext><mrow><mi>x</mi><mo>∈</mo><mi>ℤ</mi></mrow><mtext> then </mtext><mrow><mn>2</mn><mi>x</mi></mrow><mtext> is an even  number.</mtext></math>';
  var speech = 'If x is a member of the integers then 2 x, is an even number.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example MembSym002
 */
sre.ClearspeakPart2Symbols.prototype.untestMembSym002 = function() {
  var preference = 'VerticalLine_Auto';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|</mo><mi>x</mi><mo>></mo><mn>5</mn><mo>}</mo></mrow></math>';
  var speech = 'the set of all x in the integers such that x is greater than 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example MembSym003
 */
sre.ClearspeakPart2Symbols.prototype.untestMembSym003 = function() {
  var preference = 'VerticalLine_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mn>2</mn><mi>i</mi><mo>∉</mo><mi>ℝ</mi></mrow></math>';
  var speech = '3 plus 2 i, is not a member of the real numbers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example MembSym004
 */
sre.ClearspeakPart2Symbols.prototype.untestMembSym004 = function() {
  var preference = 'VerticalLine_Member';
  var mathml = '<math><mtext>If </mtext><mrow><mi>x</mi><mo>∈</mo><mi>ℤ</mi></mrow><mtext> then </mtext><mrow><mn>2</mn><mi>x</mi></mrow><mtext> is an even  number.</mtext></math>';
  var speech = 'If x is a member of the integers then 2 x, is an even number.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example MembSym005
 */
sre.ClearspeakPart2Symbols.prototype.untestMembSym005 = function() {
  var preference = 'VerticalLine_Member';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|</mo><mi>x</mi><mo>></mo><mn>5</mn><mo>}</mo></mrow></math>';
  var speech = 'the set of all x member of the integers such that x is greater than 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example MembSym006
 */
sre.ClearspeakPart2Symbols.prototype.untestMembSym006 = function() {
  var preference = 'VerticalLine_Member';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mn>2</mn><mi>i</mi><mo>∉</mo><mi>ℝ</mi></mrow></math>';
  var speech = '3 plus 2 i, is not a member of the real numbers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example MembSym007
 */
sre.ClearspeakPart2Symbols.prototype.untestMembSym007 = function() {
  var preference = 'VerticalLine_Element';
  var mathml = '<math><mtext>If </mtext><mrow><mi>x</mi><mo>∈</mo><mi>ℤ</mi></mrow><mtext> then </mtext><mrow><mn>2</mn><mi>x</mi></mrow><mtext> is an even  number.</mtext></math>';
  var speech = 'If x is an element of the integers then 2 x, is an even number';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example MembSym008
 */
sre.ClearspeakPart2Symbols.prototype.untestMembSym008 = function() {
  var preference = 'VerticalLine_Element';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|</mo><mi>x</mi><mo>></mo><mn>5</mn><mo>}</mo></mrow></math>';
  var speech = 'the set of all x element of the integers such that x is greater than 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example MembSym009
 */
sre.ClearspeakPart2Symbols.prototype.untestMembSym009 = function() {
  var preference = 'VerticalLine_Element';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mn>2</mn><mi>i</mi><mo>∉</mo><mi>ℝ</mi></mrow></math>';
  var speech = '3 plus 2 i, is not an element of the real numbers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example MembSym010
 */
sre.ClearspeakPart2Symbols.prototype.untestMembSym010 = function() {
  var preference = 'VerticalLine_Belongs';
  var mathml = '<math><mrow><mi>x</mi><mo>∈</mo><mi>ℤ</mi></mrow></math>';
  var speech = 'If x belongs to the integers then 2 x, is an even number';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example MembSym011
 */
sre.ClearspeakPart2Symbols.prototype.untestMembSym011 = function() {
  var preference = 'VerticalLine_Belongs';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|</mo><mi>x</mi><mo>></mo><mn>5</mn><mo>}</mo></mrow></math>';
  var speech = 'the set of all x belonging to the integers such that x is greater than 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example MembSym012
 */
sre.ClearspeakPart2Symbols.prototype.untestMembSym012 = function() {
  var preference = 'VerticalLine_Belongs';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mn>2</mn><mi>i</mi><mo>∉</mo><mi>ℝ</mi></mrow></math>';
  var speech = '3 plus 2 i, does not belong to the real numbers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example MembSym013
 */
sre.ClearspeakPart2Symbols.prototype.untestMembSym013 = function() {
  var preference = 'VerticalLine_Belongs';
  var mathml = '<math><mtext>If </mtext><mrow><mi>x</mi><mo>∈</mo><mi>ℤ</mi></mrow><mtext> then </mtext><mrow><mn>2</mn><mi>x</mi></mrow><mtext> is an even  number.</mtext></math>';
  var speech = 'If x belongs to the integers then 2 x, is an even number';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example MembSym014
 */
sre.ClearspeakPart2Symbols.prototype.untestMembSym014 = function() {
  var preference = 'VerticalLine_Belongs';
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|</mo><mi>x</mi><mo>></mo><mn>5</mn><mo>}</mo></mrow></math>';
  var speech = 'the set of all x belonging to the integers such that x is greater than 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example MembSym015
 */
sre.ClearspeakPart2Symbols.prototype.untestMembSym015 = function() {
  var preference = 'VerticalLine_Belongs';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mn>2</mn><mi>i</mi><mo>∉</mo><mi>ℝ</mi></mrow></math>';
  var speech = '3 plus 2 i, does not belong to the real numbers';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Two preferences set: One for Sets and one for SetMemberSymbol
//


/**
 * Testing ClearspeakPart2Symbols Example SetMemb001
 */
sre.ClearspeakPart2Symbols.prototype.untestSetMemb001 = function() {
  var preference = 'VerticalLine_Sets "woall" and SetMemberSymbol "belongs"';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>:</mo><mn>2</mn><mo>&lt;</mo><mi>x</mi><mo>&lt;</mo><mn>7</mn><mo>}</mo></mrow></math>';
  var speech = 'the set of x belonging to the integers such that 2 is less than x is less than 7.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example SetMemb002
 */
sre.ClearspeakPart2Symbols.prototype.untestSetMemb002 = function() {
  var preference = 'VerticalLine_Sets "woall" and SetMemberSymbol "member"';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mo>{</mo><mi>x</mi><mo>∈</mo><mi>ℤ</mi><mo>|</mo><mi>x</mi><mo>></mo><mn>5</mn><mo>}</mo></mrow></math>';
  var speech = 'the set of x member of the integers such that x is greater than 5';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Sums, Products, Unions, Intersections, and Integrals
//


/**
 * Testing ClearspeakPart2Symbols Example Sum001
 */
sre.ClearspeakPart2Symbols.prototype.testSum001 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munderover><mo>∑</mo><mrow><mi>n</mi><mo>=</mo><mn>1</mn></mrow><mrow><mn>10</mn></mrow></munderover><mi>n</mi></mstyle></mrow></math>';
  var speech = 'the sum from n equals 1 to 10 of n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Sum002
 */
sre.ClearspeakPart2Symbols.prototype.testSum002 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munderover><mo>∑</mo><mrow><mi>n</mi><mo>=</mo><mn>1</mn></mrow><mi>∞</mi></munderover><mi>n</mi></mstyle></mrow></math>';
  var speech = 'the sum from n equals 1 to infinity of n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Sum003
 */
sre.ClearspeakPart2Symbols.prototype.untestSum003 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munder><mo>∑</mo><mrow><mi>i</mi><mo>∈</mo><msup><mi>ℤ</mi><mo>+</mo></msup></mrow></munder><mi>i</mi></mstyle></mrow></math>';
  var speech = 'the sum over i is a member of the positive integers, of i';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Sum004
 */
sre.ClearspeakPart2Symbols.prototype.testSum004 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munder><mo>∑</mo><mi>S</mi></munder><mi>i</mi></mstyle></mrow></math>';
  var speech = 'the sum over S, of i';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Sum005
 */
sre.ClearspeakPart2Symbols.prototype.testSum005 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><mo>∑</mo><mrow><msub><mi>a</mi><mi>i</mi></msub></mrow></mstyle></mrow></math>';
  var speech = 'the sum of, a sub i';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Sum006
 */
sre.ClearspeakPart2Symbols.prototype.testSum006 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munderover><mo>∏</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mrow><mn>10</mn></mrow></munderover><mi>i</mi></mstyle></mrow></math>';
  var speech = 'the product from i equals 1 to 10 of i';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Sum007
 */
sre.ClearspeakPart2Symbols.prototype.untestSum007 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munder><mo>∏</mo><mrow><mi>i</mi><mo>∈</mo><msup><mi>ℤ</mi><mo>+</mo></msup></mrow></munder><mrow><mfrac><mi>i</mi><mrow><mi>i</mi><mo>+</mo><mn>1</mn></mrow></mfrac></mrow></mstyle></mrow></math>';
  var speech = 'the product over i is a member of the positive integers of the fraction with numerator 1 and denominator i plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Sum008
 */
sre.ClearspeakPart2Symbols.prototype.untestSum008 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munder><mo>∏</mo><mrow><msup><mi>ℤ</mi><mo>+</mo></msup></mrow></munder><mrow><mfrac><mi>i</mi><mrow><mi>i</mi><mo>+</mo><mn>1</mn></mrow></mfrac></mrow></mstyle></mrow></math>';
  var speech = 'the product over the positive integers of the fraction with numerator 1 and denominator i plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Sum009
 */
sre.ClearspeakPart2Symbols.prototype.testSum009 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><mo>∏</mo><mrow><msub><mi>a</mi><mi>i</mi></msub></mrow></mstyle></mrow></math>';
  var speech = 'the product of, a sub i';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Sum010
 */
sre.ClearspeakPart2Symbols.prototype.untestSum010 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munderover><mo>∩</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mrow><mn>10</mn></mrow></munderover><mrow><msub><mi>S</mi><mi>i</mi></msub></mrow></mstyle></mrow></math>';
  var speech = 'the intersection from i equals 1 to 10 of S sub i';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Sum011
 */
sre.ClearspeakPart2Symbols.prototype.untestSum011 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munderover><mo>∪</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mrow><mn>10</mn></mrow></munderover><mrow><msub><mi>S</mi><mi>i</mi></msub></mrow></mstyle></mrow></math>';
  var speech = 'the union from i equals 1 to 10 of S sub i';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Sum012
 */
sre.ClearspeakPart2Symbols.prototype.untestSum012 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><mo>∩</mo><mrow><msub><mi>S</mi><mi>i</mi></msub></mrow></mstyle></mrow></math>';
  var speech = 'the intersection of S sub i';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Sum013
 */
sre.ClearspeakPart2Symbols.prototype.untestSum013 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><mo>∪</mo><mrow><msub><mi>S</mi><mi>i</mi></msub></mrow></mstyle></mrow></math>';
  var speech = 'the union of S sub i';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Sum014
 */
sre.ClearspeakPart2Symbols.prototype.untestSum014 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munder><mo>∩</mo><mi>C</mi></munder><mrow><msub><mi>S</mi><mi>i</mi></msub></mrow></mstyle></mrow></math>';
  var speech = 'the intersection over C of S sub i';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Sum015
 */
sre.ClearspeakPart2Symbols.prototype.untestSum015 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><munder><mo>∪</mo><mi>C</mi></munder><mrow><msub><mi>S</mi><mi>i</mi></msub></mrow></mstyle></mrow></math>';
  var speech = 'the union over C of S sub i';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Sum016
 */
sre.ClearspeakPart2Symbols.prototype.testSum016 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><mrow><mo>∫</mo><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mtext></mtext></mrow></mrow></mstyle><mi>d</mi><mi>x</mi></mrow></math>';
  var speech = 'the integral of f of x, d x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Sum017
 */
sre.ClearspeakPart2Symbols.prototype.testSum017 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><mrow><msubsup><mo>∫</mo><mn>0</mn><mn>1</mn></msubsup><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mrow></mstyle><mtext></mtext><mi>d</mi><mi>x</mi></mrow></math>';
  var speech = 'the integral from 0 to 1 of f of x, d x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakPart2Symbols Example Sum018
 */
sre.ClearspeakPart2Symbols.prototype.untestSum018 = function() {
  var preference = 'default';
  var mathml = '<math><mrow><mstyle displaystyle="true"><mrow><munder><mo>∫</mo><mi>ℝ</mi></munder><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mrow></mstyle><mtext></mtext><mi>d</mi><mi>x</mi></mrow></math>';
  var speech = 'the integral over the real numbers of f of x, d x';
  this.executeRuleTest(mathml, speech, preference);
};
