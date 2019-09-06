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


goog.provide('sre.ClearspeakEnglishMultiLineEntries');

goog.require('sre.ClearspeakEnglishRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakEnglishRuleTest}
*/
sre.ClearspeakEnglishMultiLineEntries = function() {
  sre.ClearspeakEnglishMultiLineEntries.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakEnglishMultiLineEntries rule tests.';
};
goog.inherits(sre.ClearspeakEnglishMultiLineEntries, sre.ClearspeakEnglishRuleTest);



//
// Multi-Line Entries Examples
//


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline001
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline001 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '2 lines, Line 1: x plus y equals 7. Line 2: 2 x, plus 3 y,' +
      ' equals 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline002
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline002 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 lines, Line 1: x plus y; equals; 7. Line 2: 2 x, plus 3' +
      ' y; equals; 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline003
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline003 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>+' +
      '</mo></mtd><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd>' +
      '<mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd>' +
      '<mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = '2 lines, Line 1: x; plus; y; equals; 7. Line 2: 2 x; plus;' +
      ' 3 y; equals; 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline004
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline004 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mtext>Equation 1:     </mtext>' +
      '<mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr><mtr>' +
      '<mtd><mtext>Equation 2: </mtext><mn>2</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '2 lines, Line 1: Equation 1 colon x plus y equals 7. Line' +
      ' 2: Equation 2 colon 2 x, plus 3 y, equals 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline005
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline005 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mrow></mtd></mtr><mtr><mtd><mrow><mtext>Equation 2:' +
      '</mtext></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>=</mo><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = '2 lines, Line 1: Equation 1 colon; x plus y equals 7. Line' +
      ' 2: Equation 2 colon; 2 x, plus 3 y, equals 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline006
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline006 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd>' +
      '<mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr>' +
      '</mtable><mtext></mtext></mrow></math>';
  var speech = '2 lines, Line 1: Equation 1 colon; x plus y; equals; 7.' +
      ' Line 2: Equation 2 colon; 2 x, plus 3 y; equals; 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline007
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline007 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mn>4</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>+</mo><mn>2</mn><mi>z</mi><mo>=</mo><mn>17</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>4</mn><mi>y' +
      '</mi><mo>+</mo><mn>6</mn><mi>z</mi><mo>=</mo><mn>6</mn></mtd></mtr>' +
      '<mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>2</mn><mi>y</mi><mo>+' +
      '</mo><mn>5</mn><mi>z</mi><mo>=</mo><mn>1</mn></mtd></mtr></mtable>' +
      '</math>';
  var speech = '3 lines, Line 1: 4 x, plus 3 y, plus 2 z, equals 17. Line' +
      ' 2: 2 x, plus 4 y, plus 6 z, equals 6. Line 3: 3 x, plus 2 y, plus 5' +
      ' z, equals 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline008
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline008 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>4</mn><mi>x</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>2</mn><mi>z</mi>' +
      '</mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd>' +
      '<mtd><mrow><mn>4</mn><mi>y</mi></mrow></mtd><mtd><mo>+</mo></mtd>' +
      '<mtd><mrow><mn>6</mn><mi>z</mi></mrow></mtd><mtd><mo>=</mo></mtd>' +
      '<mtd><mn>6</mn></mtd></mtr><mtr><mtd><mrow><mn>3</mn><mi>x</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>2</mn><mi>y</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>5</mn><mi>z</mi>' +
      '</mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '</mtable></mrow></math>';
  var speech = '3 lines, Line 1: 4 x; plus; 3 y; plus; 2 z; equals; 1. Line' +
      ' 2: 2 x; plus; 4 y; plus; 6 z; equals; 6. Line 3: 3 x; plus; 2 y;' +
      ' plus; 5 z; equals; 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline009
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline009 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mtext>Equation 1: </mtext><mn>4' +
      '</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>+</mo><mn>2</mn>' +
      '<mi>z</mi><mo>=</mo><mn>17</mn></mtd></mtr><mtr><mtd><mtext>Equation' +
      ' 2: </mtext><mn>2</mn><mi>x</mi><mo>+</mo><mn>4</mn><mi>y</mi><mo>+' +
      '</mo><mn>6</mn><mi>z</mi><mo>=</mo><mn>6</mn></mtd></mtr><mtr><mtd>' +
      '<mtext>Equation 3: </mtext><mn>3</mn><mi>x</mi><mo>+</mo><mn>2</mn>' +
      '<mi>y</mi><mo>+</mo><mn>5</mn><mi>z</mi><mo>=</mo><mn>1</mn></mtd>' +
      '</mtr></mtable></math>';
  var speech = '3 lines, Line 1: Equation 1 colon 4 x, plus 3 y, plus 2 z,' +
      ' equals 17. Line 2: Equation 2 colon 2 x, plus 4 y, plus 6 z, equals' +
      ' 6. Line 3: Equation 3 colon 3 x, plus 2 y, plus 5 z, equals 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline010
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline010 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable columnalign="left"><mtr><mtd><mi>x</mi><mo>≥' +
      '</mo><mn>0</mn></mtd></mtr><mtr><mtd><mi>y</mi><mo>≥</mo><mn>0</mn>' +
      '</mtd></mtr><mtr><mtd><mn>3</mn><mi>x</mi><mo>−</mo><mn>5</mn><mi>y' +
      '</mi><mo>≤</mo><mn>30</mn></mtd></mtr></mtable></math>';
  var speech = '3 lines, Line 1: x is greater than or equal to 0. Line 2: y' +
      ' is greater than or equal to 0. Line 3: 3 x, minus 5 y, is less than' +
      ' or equal to 30';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline011
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline011 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>8' +
      '</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd></mtr><mtr><mtd><mn>8</mn>' +
      '<mo>=</mo><mn>5</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi></mtd></mtr>' +
      '<mtr><mtd><mn>4</mn><mo>=</mo><mi>x</mi></mtd></mtr></mtable></math>';
  var speech = '4 lines, Line 1: 3 x, plus 8 equals 5 x. Line 2: 8 equals 5' +
      ' x, minus 3 x. Line 3: 8 equals 2 x. Line 4: 4 equals x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline012
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline012 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>3</mn><mi>x</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mn>8</mn></mtd><mtd><mo>=' +
      '</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mrow/>' +
      '</mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/>' +
      '</mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mo>−</mo></mtd><mtd><mrow><mn>3' +
      '</mn><mi>x</mi></mrow></mtd></mtr><mtr><mtd><mrow/></mtd><mtd>' +
      '<mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/>' +
      '</mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>4</mn>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mi>x</mi></mtd><mtd><mrow/></mtd>' +
      '<mtd><mrow/></mtd></mtr></mtable></mrow></math>';
  var speech = '4 lines, Line 1: 3 x; plus; 8; equals; 5 x; blank; blank.' +
      ' Line 2: blank; blank; 8; equals; 5 x; minus; 3 x. Line 3: blank;' +
      ' blank; 8; equals; 2 x; blank; blank. Line 4: blank; blank; 4;' +
      ' equals; x; blank; blank';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline013
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline013 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mtext>Step 1:  </mtext><mn>3</mn>' +
      '<mi>x</mi><mo>+</mo><mn>8</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mtext>Step 2:  </mtext><mn>8</mn><mo>=</mo><mn>5' +
      '</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd></mtr><mtr><mtd>' +
      '<mtext>Step 3:  </mtext><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi>' +
      '</mtd></mtr><mtr><mtd><mtext>Step 4:  </mtext><mn>4</mn><mo>=</mo>' +
      '<mi>x</mi></mtd></mtr></mtable></math>';
  var speech = '4 lines, Line 1: Step 1 colon 3 x, plus 8 equals 5 x. Line' +
      ' 2: Step 2 colon 8 equals 5 x, minus 3 x. Line 3: Step 3 colon 8' +
      ' equals 2 x. Line 4: Step 4 colon 4 equals x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline014
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline014 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn>' +
      '</mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext>' +
      '<mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow>' +
      '</mrow></mrow></math>';
  var speech = 'f of x, equals, 2 cases, Case 1: negative x if x is less' +
      ' than 0. Case 2: x if x is greater than or equal to 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline015
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline015 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = 'f of x, equals, 2 cases, Case 1: negative x; if x is less' +
      ' than 0. Case 2: x; if x is greater than or equal to 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline016
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline016 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Case';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn>' +
      '</mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext>' +
      '<mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow>' +
      '</mrow></mrow></math>';
  var speech = 'f of x, equals, 2 cases, Case 1: negative x if x is less' +
      ' than 0. Case 2: x if x is greater than or equal to 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline017
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline017 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Case';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = 'f of x, equals, 2 cases, Case 1: negative x; if x is less' +
      ' than 0. Case 2: x; if x is greater than or equal to 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline018
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline018 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Case';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>f</mi><mo' +
      ' stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=' +
      '</mo><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext>' +
      '<mi>x</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>x' +
      '</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo>' +
      '<mn>0</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '2 cases, Case 1: f of x, equals negative x; if x is less' +
      ' than 0. Case 2: f of x, equals x; if x is greater than or equal to 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline019
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline019 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Equation';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '2 equations, Equation 1: x plus y equals 7. Equation 2: 2' +
      ' x, plus 3 y, equals 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline019a
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline019a = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Equation';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 equations, Equation 1: x plus y; equals; 7. Equation 2: 2' +
      ' x, plus 3 y; equals; 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline020
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline020 = function() {
  var preference = 'MultiLinePausesBetweenColumns_Auto:' +
      'MultiLineOverview_Auto:MultiLineLabel_Line';
  var mathml = '<math style="background-color:#"><semantics><mtable><mtr>' +
      '<mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=' +
      '</mo><mn>17</mn></mtd></mtr></mtable></semantics></math>';
  var speech = '2 lines, Line 1: x plus y equals 7. Line 2: 2 x, plus 3 y,' +
      ' equals 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline021
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline021 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Line';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 lines, Line 1: x plus y; equals; 7. Line 2: 2 x, plus 3' +
      ' y; equals; 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline022
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline022 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Row';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '2 rows, Row 1: x plus y equals 7. Row 2: 2 x, plus 3 y,' +
      ' equals 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline023
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline023 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Row';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 rows, Row 1: x plus y; equals; 7. Row 2: 2 x, plus 3 y;' +
      ' equals; 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline024
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline024 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Step';
  var mathml = '<math><mtable><mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>8' +
      '</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd></mtr><mtr><mtd><mn>8</mn>' +
      '<mo>=</mo><mn>5</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi></mtd></mtr>' +
      '<mtr><mtd><mn>4</mn><mo>=</mo><mi>x</mi></mtd></mtr></mtable></math>';
  var speech = '4 steps, Step 1: 3 x, plus 8 equals 5 x. Step 2: 8 equals 5' +
      ' x, minus 3 x. Step 3: 8 equals 2 x. Step 4: 4 equals x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline025
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline025 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Step';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>3</mn><mi>x</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mn>8</mn></mtd><mtd><mo>=' +
      '</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mrow/>' +
      '</mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/>' +
      '</mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mo>−</mo></mtd><mtd><mrow><mn>3' +
      '</mn><mi>x</mi></mrow></mtd></mtr><mtr><mtd><mrow/></mtd><mtd>' +
      '<mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/>' +
      '</mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>4</mn>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mi>x</mi></mtd><mtd><mrow/></mtd>' +
      '<mtd><mrow/></mtd></mtr></mtable></mrow></math>';
  var speech = '4 steps, Step 1: 3 x; plus; 8; equals; 5 x; blank; blank.' +
      ' Step 2: blank; blank; 8; equals; 5 x; minus; 3 x. Step 3: blank;' +
      ' blank; 8; equals; 2 x; blank; blank. Step 4: blank; blank; 4;' +
      ' equals; x; blank; blank';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline026
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline026 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Constraint';
  var mathml = '<math><mtable columnalign="left"><mtr><mtd><mi>x</mi><mo>≥' +
      '</mo><mn>0</mn></mtd></mtr><mtr><mtd><mi>y</mi><mo>≥</mo><mn>0</mn>' +
      '</mtd></mtr><mtr><mtd><mn>3</mn><mi>x</mi><mo>−</mo><mn>5</mn><mi>y' +
      '</mi><mo>≤</mo><mn>30</mn></mtd></mtr></mtable></math>';
  var speech = '3 constraints, Constraint 1: x is greater than or equal to' +
      ' 0. Constraint 2: y is greater than or equal to 0. Constraint 3: 3' +
      ' x, minus 5 y, is less than or equal to 30';
  this.executeRuleTest(mathml, speech, preference);
};


// Added examples for preference Label_None.
/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline026a
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline026a = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_None';
  var mathml = '<math><mtable columnalign="left"><mtr><mtd><mi>x</mi><mo>≥' +
      '</mo><mn>0</mn></mtd></mtr><mtr><mtd><mi>y</mi><mo>≥</mo><mn>0</mn>' +
      '</mtd></mtr><mtr><mtd><mn>3</mn><mi>x</mi><mo>−</mo><mn>5</mn><mi>y' +
      '</mi><mo>≤</mo><mn>30</mn></mtd></mtr></mtable></math>';
  var speech = '3 lines, x is greater than or equal to 0. y is greater than' +
      ' or equal to 0. 3 x, minus 5 y, is less than or equal to 30';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline026b
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline026b = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_None';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>3</mn><mi>x</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mn>8</mn></mtd><mtd><mo>=' +
      '</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mrow/>' +
      '</mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/>' +
      '</mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mo>−</mo></mtd><mtd><mrow><mn>3' +
      '</mn><mi>x</mi></mrow></mtd></mtr><mtr><mtd><mrow/></mtd><mtd>' +
      '<mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/>' +
      '</mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>4</mn>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mi>x</mi></mtd><mtd><mrow/></mtd>' +
      '<mtd><mrow/></mtd></mtr></mtable></mrow></math>';
  var speech = '4 lines, 3 x; plus; 8; equals; 5 x; blank; blank. blank;' +
      ' blank; 8; equals; 5 x; minus; 3 x. blank; blank; 8; equals; 2 x;' +
      ' blank; blank. blank; blank; 4; equals; x; blank; blank';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline026c
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline026c = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn>' +
      '</mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext>' +
      '<mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow>' +
      '</mrow></mrow></math>';
  var speech = 'f of x, equals, 2 cases, negative x if x is less than 0. x' +
      ' if x is greater than or equal to 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline027
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline027 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '2 lines, Line 1: x plus y equals 7. Line 2: 2 x, plus 3 y,' +
      ' equals 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline028
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline028 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 lines, Line 1: x plus y. equals. 7. Line 2: 2 x, plus 3' +
      ' y. equals. 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline029
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline029 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>+' +
      '</mo></mtd><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd>' +
      '<mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd>' +
      '<mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = '2 lines, Line 1: x. plus. y. equals. 7. Line 2: 2 x. plus.' +
      ' 3 y. equals. 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline030
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline030 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mtext></mtext><mi>x' +
      '</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mrow></mtd></mtr>' +
      '<mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=</mo><mn>17' +
      '</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '2 lines, Line 1: Equation 1 colon. x plus y equals 7. Line' +
      ' 2: Equation 2 colon. 2 x, plus 3 y, equals 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline031
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline031 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd>' +
      '<mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr>' +
      '</mtable><mtext></mtext></mrow></math>';
  var speech = '2 lines, Line 1: Equation 1 colon. x plus y. equals. 7.' +
      ' Line 2: Equation 2 colon. 2 x, plus 3 y. equals. 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline032
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline032 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>4</mn><mi>x</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>2</mn><mi>z</mi>' +
      '</mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd>' +
      '<mtd><mrow><mn>4</mn><mi>y</mi></mrow></mtd><mtd><mo>+</mo></mtd>' +
      '<mtd><mrow><mn>6</mn><mi>z</mi></mrow></mtd><mtd><mo>=</mo></mtd>' +
      '<mtd><mn>6</mn></mtd></mtr><mtr><mtd><mrow><mn>3</mn><mi>x</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>2</mn><mi>y</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>5</mn><mi>z</mi>' +
      '</mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '</mtable></mrow></math>';
  var speech = '3 lines, Line 1: 4 x. plus. 3 y. plus. 2 z. equals. 1. Line' +
      ' 2: 2 x. plus. 4 y. plus. 6 z. equals. 6. Line 3: 3 x. plus. 2 y.' +
      ' plus. 5 z. equals. 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline033
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline033 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>3</mn><mi>x</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mn>8</mn></mtd><mtd><mo>=' +
      '</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mrow/>' +
      '</mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/>' +
      '</mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mo>−</mo></mtd><mtd><mrow><mn>3' +
      '</mn><mi>x</mi></mrow></mtd></mtr><mtr><mtd><mrow/></mtd><mtd>' +
      '<mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/>' +
      '</mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>4</mn>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mi>x</mi></mtd><mtd><mrow/></mtd>' +
      '<mtd><mrow/></mtd></mtr></mtable></mrow></math>';
  var speech = '4 lines, Line 1: 3 x. plus. 8. equals. 5 x. blank. blank.' +
      ' Line 2: blank. blank. 8. equals. 5 x. minus. 3 x. Line 3: blank.' +
      ' blank. 8. equals. 2 x. blank. blank. Line 4: blank. blank. 4.' +
      ' equals. x. blank. blank';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline034
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline034 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = 'f of x, equals, 2 cases, Case 1: negative x. if x is less' +
      ' than 0. Case 2: x. if x is greater than or equal to 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline035
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline035 = function() {
  var preference = 'MultiLineLabel_Case:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = 'f of x, equals, 2 cases, Case 1: negative x. if x is less' +
      ' than 0. Case 2: x. if x is greater than or equal to 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline036
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline036 = function() {
  var preference = 'MultiLineLabel_Case:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtext></mtext><mtable><mtr><mtd><mrow><mi>f' +
      '</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mo>−</mo>' +
      '<mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>f</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>x</mi>' +
      '</mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0' +
      '</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '2 cases, Case 1: f of x, equals negative x. if x is less' +
      ' than 0. Case 2: f of x, equals x. if x is greater than or equal to 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline037
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline037 = function() {
  var preference = 'MultiLineLabel_Equation:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 equations, Equation 1: x plus y. equals. 7. Equation 2: 2' +
      ' x, plus 3 y. equals. 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline038
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline038 = function() {
  var preference = 'MultiLineLabel_Line:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 lines, Line 1: x plus y. equals. 7. Line 2: 2 x, plus 3' +
      ' y. equals. 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline039
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline039 = function() {
  var preference = 'MultiLineLabel_Row:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 rows, Row 1: x plus y. equals. 7. Row 2: 2 x, plus 3 y.' +
      ' equals. 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline040
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline040 = function() {
  var preference = 'MultiLineLabel_Step:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>3</mn><mi>x</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mn>8</mn></mtd><mtd><mo>=' +
      '</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mrow/>' +
      '</mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/>' +
      '</mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mo>−</mo></mtd><mtd><mrow><mn>3' +
      '</mn><mi>x</mi></mrow></mtd></mtr><mtr><mtd><mrow/></mtd><mtd>' +
      '<mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/>' +
      '</mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>4</mn>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mi>x</mi></mtd><mtd><mrow/></mtd>' +
      '<mtd><mrow/></mtd></mtr></mtable></mrow></math>';
  var speech = '4 steps, Step 1: 3 x. plus. 8. equals. 5 x. blank. blank.' +
      ' Step 2: blank. blank. 8. equals. 5 x. minus. 3 x. Step 3: blank.' +
      ' blank. 8. equals. 2 x. blank. blank. Step 4: blank. blank. 4.' +
      ' equals. x. blank. blank';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline041
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline041 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 lines, Line 1: x plus y, equals, 7. Line 2: 2 x, plus 3' +
      ' y, equals, 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline042
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline042 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>+' +
      '</mo></mtd><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd>' +
      '<mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd>' +
      '<mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = '2 lines, Line 1: x, plus, y, equals, 7. Line 2: 2 x, plus,' +
      ' 3 y, equals, 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline043
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline043 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mrow></mtd></mtr><mtr><mtd><mrow><mtext>Equation 2:' +
      '</mtext></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>=</mo><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = '2 lines, Line 1: Equation 1 colon, x plus y equals 7. Line' +
      ' 2: Equation 2 colon, 2 x, plus 3 y, equals 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline044
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline044 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd>' +
      '<mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr>' +
      '</mtable><mtext></mtext></mrow></math>';
  var speech = '2 lines, Line 1: Equation 1 colon, x plus y, equals, 7.' +
      ' Line 2: Equation 2 colon, 2 x, plus 3 y, equals, 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline045
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline045 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>4</mn><mi>x</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>2</mn><mi>z</mi>' +
      '</mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd>' +
      '<mtd><mrow><mn>4</mn><mi>y</mi></mrow></mtd><mtd><mo>+</mo></mtd>' +
      '<mtd><mrow><mn>6</mn><mi>z</mi></mrow></mtd><mtd><mo>=</mo></mtd>' +
      '<mtd><mn>6</mn></mtd></mtr><mtr><mtd><mrow><mn>3</mn><mi>x</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>2</mn><mi>y</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>5</mn><mi>z</mi>' +
      '</mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '</mtable></mrow></math>';
  var speech = '3 lines, Line 1: 4 x, plus, 3 y, plus, 2 z, equals, 1. Line' +
      ' 2: 2 x, plus, 4 y, plus, 6 z, equals, 6. Line 3: 3 x, plus, 2 y,' +
      ' plus, 5 z, equals, 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline046
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline046 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>3</mn><mi>x</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mn>8</mn></mtd><mtd><mo>=' +
      '</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mrow/>' +
      '</mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/>' +
      '</mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mo>−</mo></mtd><mtd><mrow><mn>3' +
      '</mn><mi>x</mi></mrow></mtd></mtr><mtr><mtd><mrow/></mtd><mtd>' +
      '<mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/>' +
      '</mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>4</mn>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mi>x</mi></mtd><mtd><mrow/></mtd>' +
      '<mtd><mrow/></mtd></mtr></mtable></mrow></math>';
  var speech = '4 lines, Line 1: 3 x, plus, 8, equals, 5 x, blank, blank.' +
      ' Line 2: blank, blank, 8, equals, 5 x, minus, 3 x. Line 3: blank,' +
      ' blank, 8, equals, 2 x, blank, blank. Line 4: blank, blank, 4,' +
      ' equals, x, blank, blank';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline047
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline047 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = 'f of x, equals, 2 cases, Case 1: negative x, if x is less' +
      ' than 0. Case 2: x, if x is greater than or equal to 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline048
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline048 = function() {
  var preference = 'MultiLineLabel_Case:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = 'f of x, equals, 2 cases, Case 1: negative x, if x is less' +
      ' than 0. Case 2: x, if x is greater than or equal to 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline049
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline049 = function() {
  var preference = 'MultiLineLabel_Case:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtext></mtext><mtable><mtr><mtd><mrow><mi>f' +
      '</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mo>−</mo>' +
      '<mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>f</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>x</mi>' +
      '</mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0' +
      '</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '2 cases, Case 1: f of x, equals negative x, if x is less' +
      ' than 0. Case 2: f of x, equals x, if x is greater than or equal to 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline050
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline050 = function() {
  var preference = 'MultiLineLabel_Equation:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 equations, Equation 1: x plus y, equals, 7. Equation 2: 2' +
      ' x, plus 3 y, equals, 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline051
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline051 = function() {
  var preference = 'MultiLineLabel_Line:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 lines, Line 1: x plus y, equals, 7. Line 2: 2 x, plus 3' +
      ' y, equals, 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline052
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline052 = function() {
  var preference = 'MultiLineLabel_Row:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 rows, Row 1: x plus y, equals, 7. Row 2: 2 x, plus 3 y,' +
      ' equals, 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline053
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline053 = function() {
  var preference = 'MultiLineLabel_Step:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>3</mn><mi>x</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mn>8</mn></mtd><mtd><mo>=' +
      '</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mrow/>' +
      '</mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/>' +
      '</mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mo>−</mo></mtd><mtd><mrow><mn>3' +
      '</mn><mi>x</mi></mrow></mtd></mtr><mtr><mtd><mrow/></mtd><mtd>' +
      '<mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/>' +
      '</mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>4</mn>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mi>x</mi></mtd><mtd><mrow/></mtd>' +
      '<mtd><mrow/></mtd></mtr></mtable></mrow></math>';
  var speech = '4 steps, Step 1: 3 x, plus, 8, equals, 5 x, blank, blank.' +
      ' Step 2: blank, blank, 8, equals, 5 x, minus, 3 x. Step 3: blank,' +
      ' blank, 8, equals, 2 x, blank, blank. Step 4: blank, blank, 4,' +
      ' equals, x, blank, blank';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline054
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline054 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = 'Line 1: x plus y equals 7. Line 2: 2 x, plus 3 y, equals 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline055
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline055 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = 'Line 1: x plus y; equals; 7. Line 2: 2 x, plus 3 y; equals; 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline056
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline056 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>+' +
      '</mo></mtd><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd>' +
      '<mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd>' +
      '<mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = 'Line 1: x; plus; y; equals; 7. Line 2: 2 x; plus; 3 y;' +
      ' equals; 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline057
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline057 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mtable><mtr><mtd><mtext>Equation 1:     </mtext>' +
      '<mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr><mtr>' +
      '<mtd><mtext>Equation 2: </mtext><mn>2</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = 'Line 1: Equation 1 colon x plus y equals 7. Line 2:' +
      ' Equation 2 colon 2 x, plus 3 y, equals 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline058
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline058 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mrow></mtd></mtr><mtr><mtd><mrow><mtext>Equation 2:' +
      '</mtext></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>=</mo><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = 'Line 1: Equation 1 colon; x plus y equals 7. Line 2:' +
      ' Equation 2 colon; 2 x, plus 3 y, equals 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline059
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline059 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd>' +
      '<mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr>' +
      '</mtable><mtext></mtext></mrow></math>';
  var speech = 'Line 1: Equation 1 colon; x plus y; equals; 7. Line 2:' +
      ' Equation 2 colon; 2 x, plus 3 y; equals; 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline060
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline060 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mtable><mtr><mtd><mn>4</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>+</mo><mn>2</mn><mi>z</mi><mo>=</mo><mn>17</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>4</mn><mi>y' +
      '</mi><mo>+</mo><mn>6</mn><mi>z</mi><mo>=</mo><mn>6</mn></mtd></mtr>' +
      '<mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>2</mn><mi>y</mi><mo>+' +
      '</mo><mn>5</mn><mi>z</mi><mo>=</mo><mn>1</mn></mtd></mtr></mtable>' +
      '</math>';
  var speech = 'Line 1: 4 x, plus 3 y, plus 2 z, equals 17. Line 2: 2 x,' +
      ' plus 4 y, plus 6 z, equals 6. Line 3: 3 x, plus 2 y, plus 5 z,' +
      ' equals 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline061
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline061 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>4</mn><mi>x</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>2</mn><mi>z</mi>' +
      '</mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd>' +
      '<mtd><mrow><mn>4</mn><mi>y</mi></mrow></mtd><mtd><mo>+</mo></mtd>' +
      '<mtd><mrow><mn>6</mn><mi>z</mi></mrow></mtd><mtd><mo>=</mo></mtd>' +
      '<mtd><mn>6</mn></mtd></mtr><mtr><mtd><mrow><mn>3</mn><mi>x</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>2</mn><mi>y</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>5</mn><mi>z</mi>' +
      '</mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '</mtable></mrow></math>';
  var speech = 'Line 1: 4 x; plus; 3 y; plus; 2 z; equals; 1. Line 2: 2 x;' +
      ' plus; 4 y; plus; 6 z; equals; 6. Line 3: 3 x; plus; 2 y; plus; 5 z;' +
      ' equals; 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline062
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline062 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mtable><mtr><mtd><mtext>Equation 1: </mtext><mn>4' +
      '</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>+</mo><mn>2</mn>' +
      '<mi>z</mi><mo>=</mo><mn>17</mn></mtd></mtr><mtr><mtd><mtext>Equation' +
      ' 2: </mtext><mn>2</mn><mi>x</mi><mo>+</mo><mn>4</mn><mi>y</mi><mo>+' +
      '</mo><mn>6</mn><mi>z</mi><mo>=</mo><mn>6</mn></mtd></mtr><mtr><mtd>' +
      '<mtext>Equation 3: </mtext><mn>3</mn><mi>x</mi><mo>+</mo><mn>2</mn>' +
      '<mi>y</mi><mo>+</mo><mn>5</mn><mi>z</mi><mo>=</mo><mn>1</mn></mtd>' +
      '</mtr></mtable></math>';
  var speech = 'Line 1: Equation 1 colon 4 x, plus 3 y, plus 2 z, equals' +
      ' 17. Line 2: Equation 2 colon 2 x, plus 4 y, plus 6 z, equals 6.' +
      ' Line 3: Equation 3 colon 3 x, plus 2 y, plus 5 z, equals 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline063
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline063 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mtable><mtr><mtd><mtext>Step 1:  </mtext><mn>3</mn>' +
      '<mi>x</mi><mo>+</mo><mn>8</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mtext>Step 2:  </mtext><mn>8</mn><mo>=</mo><mn>5' +
      '</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd></mtr><mtr><mtd>' +
      '<mtext>Step 3:  </mtext><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi>' +
      '</mtd></mtr><mtr><mtd><mtext>Step 4:  </mtext><mn>4</mn><mo>=</mo>' +
      '<mi>x</mi></mtd></mtr></mtable></math>';
  var speech = 'Line 1: Step 1 colon 3 x, plus 8 equals 5 x. Line 2: Step 2' +
      ' colon 8 equals 5 x, minus 3 x. Line 3: Step 3 colon 8 equals 2 x.' +
      ' Line 4: Step 4 colon 4 equals x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline064
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline064 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn>' +
      '</mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext>' +
      '<mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow>' +
      '</mrow></mrow></math>';
  var speech = 'f of x, equals, Case 1: negative x if x is less than 0.' +
      ' Case 2: x if x is greater than or equal to 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline065
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline065 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = 'f of x, equals, Case 1: negative x; if x is less than 0.' +
      ' Case 2: x; if x is greater than or equal to 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline066
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline066 = function() {
  var preference = 'MultiLineLabel_Case:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn>' +
      '</mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext>' +
      '<mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow>' +
      '</mrow></mrow></math>';
  var speech = 'f of x, equals, Case 1: negative x if x is less than 0.' +
      ' Case 2: x if x is greater than or equal to 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline067
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline067 = function() {
  var preference = 'MultiLineLabel_Case:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mtext></mtext><mtable><mtr><mtd><mrow><mi>f' +
      '</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mo>−</mo>' +
      '<mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>f</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>x</mi>' +
      '</mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0' +
      '</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = 'Case 1: f of x, equals negative x; if x is less than 0.' +
      ' Case 2: f of x, equals x; if x is greater than or equal to 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline068
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline068 = function() {
  var preference = 'MultiLineLabel_Equation:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = 'Equation 1: x plus y equals 7. Equation 2: 2 x, plus 3 y,' +
      ' equals 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline069
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline069 = function() {
  var preference = 'MultiLineLabel_Line:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = 'Line 1: x plus y equals 7. Line 2: 2 x, plus 3 y, equals 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline070
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline070 = function() {
  var preference = 'MultiLineLabel_Row:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = 'Row 1: x plus y equals 7. Row 2: 2 x, plus 3 y, equals 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline071
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline071 = function() {
  var preference = 'MultiLineLabel_Step:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>8' +
      '</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd></mtr><mtr><mtd><mn>8</mn>' +
      '<mo>=</mo><mn>5</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi></mtd></mtr>' +
      '<mtr><mtd><mn>4</mn><mo>=</mo><mi>x</mi></mtd></mtr></mtable></math>';
  var speech = 'Step 1: 3 x, plus 8 equals 5 x. Step 2: 8 equals 5 x, minus' +
      ' 3 x. Step 3: 8 equals 2 x. Step 4: 4 equals x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline072
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline072 = function() {
  var preference = 'MultiLineLabel_Step:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>3</mn><mi>x</mi>' +
      '</mrow></mtd><mtd><mo>+</mo></mtd><mtd><mn>8</mn></mtd><mtd><mo>=' +
      '</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mrow/>' +
      '</mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/>' +
      '</mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mo>−</mo></mtd><mtd><mrow><mn>3' +
      '</mn><mi>x</mi></mrow></mtd></mtr><mtr><mtd><mrow/></mtd><mtd>' +
      '<mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/>' +
      '</mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>4</mn>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mi>x</mi></mtd><mtd><mrow/></mtd>' +
      '<mtd><mrow/></mtd></mtr></mtable></mrow></math>';
  var speech = 'Step 1: 3 x; plus; 8; equals; 5 x; blank; blank. Step 2:' +
      ' blank; blank; 8; equals; 5 x; minus; 3 x. Step 3: blank; blank; 8;' +
      ' equals; 2 x; blank; blank. Step 4: blank; blank; 4; equals; x;' +
      ' blank; blank';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMultiLineEntries Example Multiline073
 */
sre.ClearspeakEnglishMultiLineEntries.prototype.testMultiline073 = function() {
  var preference = 'MultiLineLabel_Constraint:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable columnalign="left"><mtr><mtd><mi>x</mi><mo>≥' +
      '</mo><mn>0</mn></mtd></mtr><mtr><mtd><mi>y</mi><mo>≥</mo><mn>0</mn>' +
      '</mtd></mtr><mtr><mtd><mn>3</mn><mi>x</mi><mo>−</mo><mn>5</mn><mi>y' +
      '</mi><mo>≤</mo><mn>30</mn></mtd></mtr></mtable></math>';
  var speech = 'Constraint 1: x is greater than or equal to 0. Constraint' +
      ' 2: y is greater than or equal to 0. Constraint 3: 3 x, minus 5 y,' +
      ' is less than or equal to 30';
  this.executeRuleTest(mathml, speech, preference);
};
