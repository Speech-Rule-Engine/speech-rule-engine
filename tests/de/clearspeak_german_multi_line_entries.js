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


goog.provide('sre.ClearspeakGermanMultiLineEntries');

goog.require('sre.ClearspeakGermanRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakGermanRuleTest}
*/
sre.ClearspeakGermanMultiLineEntries = function() {
  sre.ClearspeakGermanMultiLineEntries.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakGermanMultiLineEntries rule tests.';
};
goog.inherits(sre.ClearspeakGermanMultiLineEntries, sre.ClearspeakGermanRuleTest);



//
// Multi-Line Entries Examples
//


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline001
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline001 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '2 Zeilen, Zeile 1: x plus y ist gleich 7. Zeile 2: 2 x, plus 3 y, ist gleich 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline002
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline002 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 Zeilen, Zeile 1: x plus y; ist gleich; 7. Zeile 2: 2 x, plus 3 y; ist gleich; 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline003
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline003 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>+' +
      '</mo></mtd><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd>' +
      '<mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd>' +
      '<mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = '2 Zeilen, Zeile 1: x; plus; y; ist gleich; 7. Zeile 2: 2 x; plus; 3 y; ist gleich; 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline004
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline004 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mtext>Equation 1:     </mtext>' +
      '<mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr><mtr>' +
      '<mtd><mtext>Equation 2: </mtext><mn>2</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '2 Zeilen, Zeile 1: Equation 1 Doppelpunkt x plus y ist gleich 7. Zeile 2: Equation 2 Doppelpunkt 2 x, plus 3 y, ist gleich 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline005
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline005 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mrow></mtd></mtr><mtr><mtd><mrow><mtext>Equation 2:' +
      '</mtext></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>=</mo><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = '2 Zeilen, Zeile 1: Equation 1 Doppelpunkt; x plus y ist gleich 7. Zeile 2: Equation 2 Doppelpunkt; 2 x, plus 3 y, ist gleich 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline006
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline006 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd>' +
      '<mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr>' +
      '</mtable><mtext></mtext></mrow></math>';
  var speech = '2 Zeilen, Zeile 1: Equation 1 Doppelpunkt; x plus y; ist gleich; 7. Zeile 2: Equation 2 Doppelpunkt; 2 x, plus 3 y; ist gleich; 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline007
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline007 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mn>4</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>+</mo><mn>2</mn><mi>z</mi><mo>=</mo><mn>17</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>4</mn><mi>y' +
      '</mi><mo>+</mo><mn>6</mn><mi>z</mi><mo>=</mo><mn>6</mn></mtd></mtr>' +
      '<mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>2</mn><mi>y</mi><mo>+' +
      '</mo><mn>5</mn><mi>z</mi><mo>=</mo><mn>1</mn></mtd></mtr></mtable>' +
      '</math>';
  var speech = '3 Zeilen, Zeile 1: 4 x, plus 3 y, plus 2 z, ist gleich 17. Zeile 2: 2 x, plus 4 y, plus 6 z, ist gleich 6. Zeile 3: 3 x, plus 2 y, plus 5 z, ist gleich 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline008
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline008 = function() {
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
  var speech = '3 Zeilen, Zeile 1: 4 x; plus; 3 y; plus; 2 z; ist gleich; 1. Zeile 2: 2 x; plus; 4 y; plus; 6 z; ist gleich; 6. Zeile 3: 3 x; plus; 2 y; plus; 5 z; ist gleich; 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline009
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline009 = function() {
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
  var speech = '3 Zeilen, Zeile 1: Equation 1 Doppelpunkt 4 x, plus 3 y, plus 2 z, ist gleich 17. Zeile 2: Equation 2 Doppelpunkt 2 x, plus 4 y, plus 6 z, ist gleich 6. Zeile 3: Equation 3 Doppelpunkt 3 x, plus 2 y, plus 5 z, ist gleich 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline010
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline010 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable columnalign="left"><mtr><mtd><mi>x</mi><mo>≥' +
      '</mo><mn>0</mn></mtd></mtr><mtr><mtd><mi>y</mi><mo>≥</mo><mn>0</mn>' +
      '</mtd></mtr><mtr><mtd><mn>3</mn><mi>x</mi><mo>−</mo><mn>5</mn><mi>y' +
      '</mi><mo>≤</mo><mn>30</mn></mtd></mtr></mtable></math>';
  var speech = '3 Zeilen, Zeile 1: x größer oder gleich 0. Zeile 2: y größer oder gleich 0. Zeile 3: 3 x, minus 5 y, kleiner oder gleich 30';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline011
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline011 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>8' +
      '</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd></mtr><mtr><mtd><mn>8</mn>' +
      '<mo>=</mo><mn>5</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi></mtd></mtr>' +
      '<mtr><mtd><mn>4</mn><mo>=</mo><mi>x</mi></mtd></mtr></mtable></math>';
  var speech = '4 Zeilen, Zeile 1: 3 x, plus 8 ist gleich 5 x. Zeile 2: 8 ist gleich 5 x, minus 3 x. Zeile 3: 8 ist gleich 2 x. Zeile 4: 4 ist gleich x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline012
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline012 = function() {
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
  var speech = '4 Zeilen, Zeile 1: 3 x; plus; 8; ist gleich; 5 x; leer; leer. Zeile 2: leer; leer; 8; ist gleich; 5 x; minus; 3 x. Zeile 3: leer; leer; 8; ist gleich; 2 x; leer; leer. Zeile 4: leer; leer; 4; ist gleich; x; leer; leer';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline013
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline013 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mtext>Step 1:  </mtext><mn>3</mn>' +
      '<mi>x</mi><mo>+</mo><mn>8</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mtext>Step 2:  </mtext><mn>8</mn><mo>=</mo><mn>5' +
      '</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd></mtr><mtr><mtd>' +
      '<mtext>Step 3:  </mtext><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi>' +
      '</mtd></mtr><mtr><mtd><mtext>Step 4:  </mtext><mn>4</mn><mo>=</mo>' +
      '<mi>x</mi></mtd></mtr></mtable></math>';
  var speech = '4 Zeilen, Zeile 1: Step 1 Doppelpunkt 3 x, plus 8 ist gleich 5 x. Zeile 2: Step 2 Doppelpunkt 8 ist gleich 5 x, minus 3 x. Zeile 3: Step 3 Doppelpunkt 8 ist gleich 2 x. Zeile 4: Step 4 Doppelpunkt 4 ist gleich x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline014
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline014 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn>' +
      '</mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext>' +
      '<mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow>' +
      '</mrow></mrow></math>';
  var speech = 'f von x, ist gleich, 2 Fälle, Fall 1: minus x if x kleiner als 0. Fall 2: x if x größer oder gleich 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline015
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline015 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = 'f von x, ist gleich, 2 Fälle, Fall 1: minus x; if x kleiner als 0. Fall 2: x; if x größer oder gleich 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline016
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline016 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Case';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn>' +
      '</mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext>' +
      '<mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow>' +
      '</mrow></mrow></math>';
  var speech = 'f von x, ist gleich, 2 Fälle, Fall 1: minus x if x kleiner als 0. Fall 2: x if x größer oder gleich 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline017
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline017 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Case';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = 'f von x, ist gleich, 2 Fälle, Fall 1: minus x; if x kleiner als 0. Fall 2: x; if x größer oder gleich 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline018
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline018 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Case';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>f</mi><mo' +
      ' stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=' +
      '</mo><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext>' +
      '<mi>x</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>x' +
      '</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo>' +
      '<mn>0</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '2 Fälle, Fall 1: f von x, ist gleich minus x; if x kleiner als 0. Fall 2: f von x, ist gleich x; if x größer oder gleich 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline019
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline019 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Equation';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '2 Gleichungen, Gleichung 1: x plus y ist gleich 7. Gleichung 2: 2 x, plus 3 y, ist gleich 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline019a
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline019a = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Equation';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 Gleichungen, Gleichung 1: x plus y; ist gleich; 7. Gleichung 2: 2 x, plus 3 y; ist gleich; 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline020
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline020 = function() {
  var preference = 'MultiLinePausesBetweenColumns_Auto:' +
      'MultiLineOverview_Auto:MultiLineLabel_Line';
  var mathml = '<math style="background-color:#"><semantics><mtable><mtr>' +
      '<mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=' +
      '</mo><mn>17</mn></mtd></mtr></mtable></semantics></math>';
  var speech = '2 Zeilen, Zeile 1: x plus y ist gleich 7. Zeile 2: 2 x, plus 3 y, ist gleich 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline021
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline021 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Line';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 Zeilen, Zeile 1: x plus y; ist gleich; 7. Zeile 2: 2 x, plus 3 y; ist gleich; 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline022
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline022 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Row';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '2 Zeilen, Zeile 1: x plus y ist gleich 7. Zeile 2: 2 x, plus 3 y, ist gleich 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline023
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline023 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Row';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 Zeilen, Zeile 1: x plus y; ist gleich; 7. Zeile 2: 2 x, plus 3 y; ist gleich; 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline024
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline024 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Step';
  var mathml = '<math><mtable><mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>8' +
      '</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd></mtr><mtr><mtd><mn>8</mn>' +
      '<mo>=</mo><mn>5</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi></mtd></mtr>' +
      '<mtr><mtd><mn>4</mn><mo>=</mo><mi>x</mi></mtd></mtr></mtable></math>';
  var speech = '4 Rechenschritte, Schritt 1: 3 x, plus 8 ist gleich 5 x. Schritt 2: 8 ist gleich 5 x, minus 3 x. Schritt 3: 8 ist gleich 2 x. Schritt 4: 4 ist gleich x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline025
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline025 = function() {
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
  var speech = '4 Rechenschritte, Schritt 1: 3 x; plus; 8; ist gleich; 5 x; leer; leer. Schritt 2: leer; leer; 8; ist gleich; 5 x; minus; 3 x. Schritt 3: leer; leer; 8; ist gleich; 2 x; leer; leer. Schritt 4: leer; leer; 4; ist gleich; x; leer; leer';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline026
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline026 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Constraint';
  var mathml = '<math><mtable columnalign="left"><mtr><mtd><mi>x</mi><mo>≥' +
      '</mo><mn>0</mn></mtd></mtr><mtr><mtd><mi>y</mi><mo>≥</mo><mn>0</mn>' +
      '</mtd></mtr><mtr><mtd><mn>3</mn><mi>x</mi><mo>−</mo><mn>5</mn><mi>y' +
      '</mi><mo>≤</mo><mn>30</mn></mtd></mtr></mtable></math>';
  var speech = '3 Bedingungen, Bedingung 1: x größer oder gleich 0. Bedingung 2: y größer oder gleich 0. Bedingung 3: 3 x, minus 5 y, kleiner oder gleich 30';
  this.executeRuleTest(mathml, speech, preference);
};


// Added examples for preference Label_None.
/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline026a
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline026a = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_None';
  var mathml = '<math><mtable columnalign="left"><mtr><mtd><mi>x</mi><mo>≥' +
      '</mo><mn>0</mn></mtd></mtr><mtr><mtd><mi>y</mi><mo>≥</mo><mn>0</mn>' +
      '</mtd></mtr><mtr><mtd><mn>3</mn><mi>x</mi><mo>−</mo><mn>5</mn><mi>y' +
      '</mi><mo>≤</mo><mn>30</mn></mtd></mtr></mtable></math>';
  var speech = '3 Zeilen, x größer oder gleich 0. y größer oder gleich 0. 3 x, minus 5 y, kleiner oder gleich 30';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline026b
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline026b = function() {
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
  var speech = '4 Zeilen, 3 x; plus; 8; ist gleich; 5 x; leer; leer. leer; leer; 8; ist gleich; 5 x; minus; 3 x. leer; leer; 8; ist gleich; 2 x; leer; leer. leer; leer; 4; ist gleich; x; leer; leer';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline026c
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline026c = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn>' +
      '</mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext>' +
      '<mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow>' +
      '</mrow></mrow></math>';
  var speech = 'f von x, ist gleich, 2 Fälle, minus x if x kleiner als 0. x if x größer oder gleich 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline027
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline027 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '2 Zeilen, Zeile 1: x plus y ist gleich 7. Zeile 2: 2 x, plus 3 y, ist gleich 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline028
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline028 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 Zeilen, Zeile 1: x plus y. ist gleich. 7. Zeile 2: 2 x, plus 3 y. ist gleich. 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline029
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline029 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>+' +
      '</mo></mtd><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd>' +
      '<mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd>' +
      '<mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = '2 Zeilen, Zeile 1: x. plus. y. ist gleich. 7. Zeile 2: 2 x. plus. 3 y. ist gleich. 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline030
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline030 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mtext></mtext><mi>x' +
      '</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mrow></mtd></mtr>' +
      '<mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=</mo><mn>17' +
      '</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '2 Zeilen, Zeile 1: Equation 1 Doppelpunkt. x plus y ist gleich 7. Zeile 2: Equation 2 Doppelpunkt. 2 x, plus 3 y, ist gleich 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline031
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline031 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd>' +
      '<mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr>' +
      '</mtable><mtext></mtext></mrow></math>';
  var speech = '2 Zeilen, Zeile 1: Equation 1 Doppelpunkt. x plus y. ist gleich. 7. Zeile 2: Equation 2 Doppelpunkt. 2 x, plus 3 y. ist gleich. 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline032
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline032 = function() {
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
  var speech = '3 Zeilen, Zeile 1: 4 x. plus. 3 y. plus. 2 z. ist gleich. 1. Zeile 2: 2 x. plus. 4 y. plus. 6 z. ist gleich. 6. Zeile 3: 3 x. plus. 2 y. plus. 5 z. ist gleich. 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline033
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline033 = function() {
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
  var speech = '4 Zeilen, Zeile 1: 3 x. plus. 8. ist gleich. 5 x. leer. leer. Zeile 2: leer. leer. 8. ist gleich. 5 x. minus. 3 x. Zeile 3: leer. leer. 8. ist gleich. 2 x. leer. leer. Zeile 4: leer. leer. 4. ist gleich. x. leer. leer';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline034
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline034 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = 'f von x, ist gleich, 2 Fälle, Fall 1: minus x. if x kleiner als 0. Fall 2: x. if x größer oder gleich 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline035
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline035 = function() {
  var preference = 'MultiLineLabel_Case:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = 'f von x, ist gleich, 2 Fälle, Fall 1: minus x. if x kleiner als 0. Fall 2: x. if x größer oder gleich 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline036
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline036 = function() {
  var preference = 'MultiLineLabel_Case:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtext></mtext><mtable><mtr><mtd><mrow><mi>f' +
      '</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mo>−</mo>' +
      '<mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>f</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>x</mi>' +
      '</mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0' +
      '</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '2 Fälle, Fall 1: f von x, ist gleich minus x. if x kleiner als 0. Fall 2: f von x, ist gleich x. if x größer oder gleich 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline037
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline037 = function() {
  var preference = 'MultiLineLabel_Equation:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 Gleichungen, Gleichung 1: x plus y. ist gleich. 7. Gleichung 2: 2 x, plus 3 y. ist gleich. 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline038
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline038 = function() {
  var preference = 'MultiLineLabel_Line:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 Zeilen, Zeile 1: x plus y. ist gleich. 7. Zeile 2: 2 x, plus 3 y. ist gleich. 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline039
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline039 = function() {
  var preference = 'MultiLineLabel_Row:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 Zeilen, Zeile 1: x plus y. ist gleich. 7. Zeile 2: 2 x, plus 3 y. ist gleich. 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline040
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline040 = function() {
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
  var speech = '4 Rechenschritte, Schritt 1: 3 x. plus. 8. ist gleich. 5 x. leer. leer. Schritt 2: leer. leer. 8. ist gleich. 5 x. minus. 3 x. Schritt 3: leer. leer. 8. ist gleich. 2 x. leer. leer. Schritt 4: leer. leer. 4. ist gleich. x. leer. leer';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline041
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline041 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 Zeilen, Zeile 1: x plus y, ist gleich, 7. Zeile 2: 2 x, plus 3 y, ist gleich, 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline042
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline042 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>+' +
      '</mo></mtd><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd>' +
      '<mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd>' +
      '<mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = '2 Zeilen, Zeile 1: x, plus, y, ist gleich, 7. Zeile 2: 2 x, plus, 3 y, ist gleich, 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline043
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline043 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mrow></mtd></mtr><mtr><mtd><mrow><mtext>Equation 2:' +
      '</mtext></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>=</mo><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = '2 Zeilen, Zeile 1: Equation 1 Doppelpunkt, x plus y ist gleich 7. Zeile 2: Equation 2 Doppelpunkt, 2 x, plus 3 y, ist gleich 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline044
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline044 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd>' +
      '<mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr>' +
      '</mtable><mtext></mtext></mrow></math>';
  var speech = '2 Zeilen, Zeile 1: Equation 1 Doppelpunkt, x plus y, ist gleich, 7. Zeile 2: Equation 2 Doppelpunkt, 2 x, plus 3 y, ist gleich, 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline045
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline045 = function() {
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
  var speech = '3 Zeilen, Zeile 1: 4 x, plus, 3 y, plus, 2 z, ist gleich, 1. Zeile 2: 2 x, plus, 4 y, plus, 6 z, ist gleich, 6. Zeile 3: 3 x, plus, 2 y, plus, 5 z, ist gleich, 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline046
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline046 = function() {
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
  var speech = '4 Zeilen, Zeile 1: 3 x, plus, 8, ist gleich, 5 x, leer, leer. Zeile 2: leer, leer, 8, ist gleich, 5 x, minus, 3 x. Zeile 3: leer, leer, 8, ist gleich, 2 x, leer, leer. Zeile 4: leer, leer, 4, ist gleich, x, leer, leer';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline047
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline047 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = 'f von x, ist gleich, 2 Fälle, Fall 1: minus x, if x kleiner als 0. Fall 2: x, if x größer oder gleich 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline048
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline048 = function() {
  var preference = 'MultiLineLabel_Case:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = 'f von x, ist gleich, 2 Fälle, Fall 1: minus x, if x kleiner als 0. Fall 2: x, if x größer oder gleich 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline049
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline049 = function() {
  var preference = 'MultiLineLabel_Case:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtext></mtext><mtable><mtr><mtd><mrow><mi>f' +
      '</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mo>−</mo>' +
      '<mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>f</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>x</mi>' +
      '</mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0' +
      '</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '2 Fälle, Fall 1: f von x, ist gleich minus x, if x kleiner als 0. Fall 2: f von x, ist gleich x, if x größer oder gleich 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline050
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline050 = function() {
  var preference = 'MultiLineLabel_Equation:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 Gleichungen, Gleichung 1: x plus y, ist gleich, 7. Gleichung 2: 2 x, plus 3 y, ist gleich, 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline051
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline051 = function() {
  var preference = 'MultiLineLabel_Line:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 Zeilen, Zeile 1: x plus y, ist gleich, 7. Zeile 2: 2 x, plus 3 y, ist gleich, 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline052
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline052 = function() {
  var preference = 'MultiLineLabel_Row:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '2 Zeilen, Zeile 1: x plus y, ist gleich, 7. Zeile 2: 2 x, plus 3 y, ist gleich, 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline053
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline053 = function() {
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
  var speech = '4 Rechenschritte, Schritt 1: 3 x, plus, 8, ist gleich, 5 x, leer, leer. Schritt 2: leer, leer, 8, ist gleich, 5 x, minus, 3 x. Schritt 3: leer, leer, 8, ist gleich, 2 x, leer, leer. Schritt 4: leer, leer, 4, ist gleich, x, leer, leer';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline054
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline054 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = 'Zeile 1: x plus y ist gleich 7. Zeile 2: 2 x, plus 3 y, ist gleich 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline055
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline055 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = 'Zeile 1: x plus y; ist gleich; 7. Zeile 2: 2 x, plus 3 y; ist gleich; 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline056
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline056 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>+' +
      '</mo></mtd><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd>' +
      '<mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd>' +
      '<mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = 'Zeile 1: x; plus; y; ist gleich; 7. Zeile 2: 2 x; plus; 3 y; ist gleich; 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline057
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline057 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mtable><mtr><mtd><mtext>Equation 1:     </mtext>' +
      '<mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr><mtr>' +
      '<mtd><mtext>Equation 2: </mtext><mn>2</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = 'Zeile 1: Equation 1 Doppelpunkt x plus y ist gleich 7. Zeile 2: Equation 2 Doppelpunkt 2 x, plus 3 y, ist gleich 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline058
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline058 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mrow></mtd></mtr><mtr><mtd><mrow><mtext>Equation 2:' +
      '</mtext></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>=</mo><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = 'Zeile 1: Equation 1 Doppelpunkt; x plus y ist gleich 7. Zeile 2: Equation 2 Doppelpunkt; 2 x, plus 3 y, ist gleich 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline059
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline059 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd>' +
      '<mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr>' +
      '</mtable><mtext></mtext></mrow></math>';
  var speech = 'Zeile 1: Equation 1 Doppelpunkt; x plus y; ist gleich; 7. Zeile 2: Equation 2 Doppelpunkt; 2 x, plus 3 y; ist gleich; 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline060
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline060 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mtable><mtr><mtd><mn>4</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>+</mo><mn>2</mn><mi>z</mi><mo>=</mo><mn>17</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>4</mn><mi>y' +
      '</mi><mo>+</mo><mn>6</mn><mi>z</mi><mo>=</mo><mn>6</mn></mtd></mtr>' +
      '<mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>2</mn><mi>y</mi><mo>+' +
      '</mo><mn>5</mn><mi>z</mi><mo>=</mo><mn>1</mn></mtd></mtr></mtable>' +
      '</math>';
  var speech = 'Zeile 1: 4 x, plus 3 y, plus 2 z, ist gleich 17. Zeile 2: 2 x, plus 4 y, plus 6 z, ist gleich 6. Zeile 3: 3 x, plus 2 y, plus 5 z, ist gleich 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline061
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline061 = function() {
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
  var speech = 'Zeile 1: 4 x; plus; 3 y; plus; 2 z; ist gleich; 1. Zeile 2: 2 x; plus; 4 y; plus; 6 z; ist gleich; 6. Zeile 3: 3 x; plus; 2 y; plus; 5 z; ist gleich; 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline062
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline062 = function() {
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
  var speech = 'Zeile 1: Equation 1 Doppelpunkt 4 x, plus 3 y, plus 2 z, ist gleich 17. Zeile 2: Equation 2 Doppelpunkt 2 x, plus 4 y, plus 6 z, ist gleich 6. Zeile 3: Equation 3 Doppelpunkt 3 x, plus 2 y, plus 5 z, ist gleich 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline063
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline063 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mtable><mtr><mtd><mtext>Step 1:  </mtext><mn>3</mn>' +
      '<mi>x</mi><mo>+</mo><mn>8</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mtext>Step 2:  </mtext><mn>8</mn><mo>=</mo><mn>5' +
      '</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd></mtr><mtr><mtd>' +
      '<mtext>Step 3:  </mtext><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi>' +
      '</mtd></mtr><mtr><mtd><mtext>Step 4:  </mtext><mn>4</mn><mo>=</mo>' +
      '<mi>x</mi></mtd></mtr></mtable></math>';
  var speech = 'Zeile 1: Step 1 Doppelpunkt 3 x, plus 8 ist gleich 5 x. Zeile 2: Step 2 Doppelpunkt 8 ist gleich 5 x, minus 3 x. Zeile 3: Step 3 Doppelpunkt 8 ist gleich 2 x. Zeile 4: Step 4 Doppelpunkt 4 ist gleich x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline064
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline064 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn>' +
      '</mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext>' +
      '<mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow>' +
      '</mrow></mrow></math>';
  var speech = 'f von x, ist gleich, Fall 1: minus x if x kleiner als 0. Fall 2: x if x größer oder gleich 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline065
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline065 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = 'f von x, ist gleich, Fall 1: minus x; if x kleiner als 0. Fall 2: x; if x größer oder gleich 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline066
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline066 = function() {
  var preference = 'MultiLineLabel_Case:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn>' +
      '</mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext>' +
      '<mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow>' +
      '</mrow></mrow></math>';
  var speech = 'f von x, ist gleich, Fall 1: minus x if x kleiner als 0. Fall 2: x if x größer oder gleich 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline067
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline067 = function() {
  var preference = 'MultiLineLabel_Case:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mtext></mtext><mtable><mtr><mtd><mrow><mi>f' +
      '</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mo>−</mo>' +
      '<mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>f</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>x</mi>' +
      '</mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0' +
      '</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = 'Fall 1: f von x, ist gleich minus x; if x kleiner als 0. Fall 2: f von x, ist gleich x; if x größer oder gleich 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline068
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline068 = function() {
  var preference = 'MultiLineLabel_Equation:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = 'Gleichung 1: x plus y ist gleich 7. Gleichung 2: 2 x, plus 3 y, ist gleich 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline069
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline069 = function() {
  var preference = 'MultiLineLabel_Line:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = 'Zeile 1: x plus y ist gleich 7. Zeile 2: 2 x, plus 3 y, ist gleich 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline070
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline070 = function() {
  var preference = 'MultiLineLabel_Row:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = 'Zeile 1: x plus y ist gleich 7. Zeile 2: 2 x, plus 3 y, ist gleich 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline071
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline071 = function() {
  var preference = 'MultiLineLabel_Step:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>8' +
      '</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd></mtr><mtr><mtd><mn>8</mn>' +
      '<mo>=</mo><mn>5</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi></mtd></mtr>' +
      '<mtr><mtd><mn>4</mn><mo>=</mo><mi>x</mi></mtd></mtr></mtable></math>';
  var speech = 'Schritt 1: 3 x, plus 8 ist gleich 5 x. Schritt 2: 8 ist gleich 5 x, minus 3 x. Schritt 3: 8 ist gleich 2 x. Schritt 4: 4 ist gleich x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline072
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline072 = function() {
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
  var speech = 'Schritt 1: 3 x; plus; 8; ist gleich; 5 x; leer; leer. Schritt 2: leer; leer; 8; ist gleich; 5 x; minus; 3 x. Schritt 3: leer; leer; 8; ist gleich; 2 x; leer; leer. Schritt 4: leer; leer; 4; ist gleich; x; leer; leer';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMultiLineEntries Example Multiline073
 */
sre.ClearspeakGermanMultiLineEntries.prototype.testMultiline073 = function() {
  var preference = 'MultiLineLabel_Constraint:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable columnalign="left"><mtr><mtd><mi>x</mi><mo>≥' +
      '</mo><mn>0</mn></mtd></mtr><mtr><mtd><mi>y</mi><mo>≥</mo><mn>0</mn>' +
      '</mtd></mtr><mtr><mtd><mn>3</mn><mi>x</mi><mo>−</mo><mn>5</mn><mi>y' +
      '</mi><mo>≤</mo><mn>30</mn></mtd></mtr></mtable></math>';
  var speech = 'Bedingung 1: x größer oder gleich 0. Bedingung 2: y größer oder gleich 0. Bedingung 3: 3 x, minus 5 y, kleiner oder gleich 30';
  this.executeRuleTest(mathml, speech, preference);
};
