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


goog.provide('sre.ClearspeakFrenchMultiLineEntries');

goog.require('sre.ClearspeakFrenchRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakFrenchRuleTest}
*/
sre.ClearspeakFrenchMultiLineEntries = function() {
  sre.ClearspeakFrenchMultiLineEntries.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakFrenchMultiLineEntries rule tests.';
};
goog.inherits(sre.ClearspeakFrenchMultiLineEntries, sre.ClearspeakFrenchRuleTest);



//
// Multi-Line Entries Examples
//


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline001
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline001 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline002
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline002 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline003
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline003 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>+' +
      '</mo></mtd><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd>' +
      '<mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd>' +
      '<mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline004
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline004 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mtext>Equation 1:     </mtext>' +
      '<mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr><mtr>' +
      '<mtd><mtext>Equation 2: </mtext><mn>2</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline005
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline005 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mrow></mtd></mtr><mtr><mtd><mrow><mtext>Equation 2:' +
      '</mtext></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>=</mo><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline006
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline006 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd>' +
      '<mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr>' +
      '</mtable><mtext></mtext></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline007
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline007 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mn>4</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>+</mo><mn>2</mn><mi>z</mi><mo>=</mo><mn>17</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>4</mn><mi>y' +
      '</mi><mo>+</mo><mn>6</mn><mi>z</mi><mo>=</mo><mn>6</mn></mtd></mtr>' +
      '<mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>2</mn><mi>y</mi><mo>+' +
      '</mo><mn>5</mn><mi>z</mi><mo>=</mo><mn>1</mn></mtd></mtr></mtable>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline008
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline008 = function() {
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
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline009
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline009 = function() {
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
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline010
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline010 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable columnalign="left"><mtr><mtd><mi>x</mi><mo>≥' +
      '</mo><mn>0</mn></mtd></mtr><mtr><mtd><mi>y</mi><mo>≥</mo><mn>0</mn>' +
      '</mtd></mtr><mtr><mtd><mn>3</mn><mi>x</mi><mo>−</mo><mn>5</mn><mi>y' +
      '</mi><mo>≤</mo><mn>30</mn></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline011
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline011 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>8' +
      '</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd></mtr><mtr><mtd><mn>8</mn>' +
      '<mo>=</mo><mn>5</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi></mtd></mtr>' +
      '<mtr><mtd><mn>4</mn><mo>=</mo><mi>x</mi></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline012
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline012 = function() {
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
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline013
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline013 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mtext>Step 1:  </mtext><mn>3</mn>' +
      '<mi>x</mi><mo>+</mo><mn>8</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mtext>Step 2:  </mtext><mn>8</mn><mo>=</mo><mn>5' +
      '</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd></mtr><mtr><mtd>' +
      '<mtext>Step 3:  </mtext><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi>' +
      '</mtd></mtr><mtr><mtd><mtext>Step 4:  </mtext><mn>4</mn><mo>=</mo>' +
      '<mi>x</mi></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline014
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline014 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn>' +
      '</mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext>' +
      '<mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow>' +
      '</mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline015
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline015 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline016
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline016 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Case';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn>' +
      '</mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext>' +
      '<mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow>' +
      '</mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline017
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline017 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Case';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline018
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline018 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Case';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>f</mi><mo' +
      ' stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=' +
      '</mo><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext>' +
      '<mi>x</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>x' +
      '</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo>' +
      '<mn>0</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline019
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline019 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Equation';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline019a
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline019a = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Equation';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline020
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline020 = function() {
  var preference = 'MultiLinePausesBetweenColumns_Auto:' +
      'MultiLineOverview_Auto:MultiLineLabel_Line';
  var mathml = '<math style="background-color:#"><semantics><mtable><mtr>' +
      '<mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=' +
      '</mo><mn>17</mn></mtd></mtr></mtable></semantics></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline021
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline021 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Line';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline022
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline022 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Row';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline023
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline023 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Row';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline024
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline024 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Step';
  var mathml = '<math><mtable><mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>8' +
      '</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd></mtr><mtr><mtd><mn>8</mn>' +
      '<mo>=</mo><mn>5</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi></mtd></mtr>' +
      '<mtr><mtd><mn>4</mn><mo>=</mo><mi>x</mi></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline025
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline025 = function() {
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
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline026
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline026 = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_Constraint';
  var mathml = '<math><mtable columnalign="left"><mtr><mtd><mi>x</mi><mo>≥' +
      '</mo><mn>0</mn></mtd></mtr><mtr><mtd><mi>y</mi><mo>≥</mo><mn>0</mn>' +
      '</mtd></mtr><mtr><mtd><mn>3</mn><mi>x</mi><mo>−</mo><mn>5</mn><mi>y' +
      '</mi><mo>≤</mo><mn>30</mn></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


// Added examples for preference Label_None.
/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline026a
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline026a = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_None';
  var mathml = '<math><mtable columnalign="left"><mtr><mtd><mi>x</mi><mo>≥' +
      '</mo><mn>0</mn></mtd></mtr><mtr><mtd><mi>y</mi><mo>≥</mo><mn>0</mn>' +
      '</mtd></mtr><mtr><mtd><mn>3</mn><mi>x</mi><mo>−</mo><mn>5</mn><mi>y' +
      '</mi><mo>≤</mo><mn>30</mn></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline026b
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline026b = function() {
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
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline026c
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline026c = function() {
  var preference = 'MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineLabel_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn>' +
      '</mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext>' +
      '<mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow>' +
      '</mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline027
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline027 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline028
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline028 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline029
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline029 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>+' +
      '</mo></mtd><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd>' +
      '<mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd>' +
      '<mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline030
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline030 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mtext></mtext><mi>x' +
      '</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mrow></mtd></mtr>' +
      '<mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=</mo><mn>17' +
      '</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline031
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline031 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd>' +
      '<mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr>' +
      '</mtable><mtext></mtext></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline032
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline032 = function() {
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
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline033
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline033 = function() {
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
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline034
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline034 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline035
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline035 = function() {
  var preference = 'MultiLineLabel_Case:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline036
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline036 = function() {
  var preference = 'MultiLineLabel_Case:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtext></mtext><mtable><mtr><mtd><mrow><mi>f' +
      '</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mo>−</mo>' +
      '<mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>f</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>x</mi>' +
      '</mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0' +
      '</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline037
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline037 = function() {
  var preference = 'MultiLineLabel_Equation:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline038
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline038 = function() {
  var preference = 'MultiLineLabel_Line:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline039
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline039 = function() {
  var preference = 'MultiLineLabel_Row:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Long';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline040
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline040 = function() {
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
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline041
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline041 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline042
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline042 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>+' +
      '</mo></mtd><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd>' +
      '<mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd>' +
      '<mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline043
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline043 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mrow></mtd></mtr><mtr><mtd><mrow><mtext>Equation 2:' +
      '</mtext></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>=</mo><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline044
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline044 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd>' +
      '<mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr>' +
      '</mtable><mtext></mtext></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline045
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline045 = function() {
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
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline046
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline046 = function() {
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
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline047
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline047 = function() {
  var preference = 'MultiLineLabel_Auto:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline048
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline048 = function() {
  var preference = 'MultiLineLabel_Case:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline049
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline049 = function() {
  var preference = 'MultiLineLabel_Case:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtext></mtext><mtable><mtr><mtd><mrow><mi>f' +
      '</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mo>−</mo>' +
      '<mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>f</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>x</mi>' +
      '</mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0' +
      '</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline050
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline050 = function() {
  var preference = 'MultiLineLabel_Equation:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline051
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline051 = function() {
  var preference = 'MultiLineLabel_Line:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline052
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline052 = function() {
  var preference = 'MultiLineLabel_Row:MultiLineOverview_Auto:' +
      'MultiLinePausesBetweenColumns_Short';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline053
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline053 = function() {
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
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline054
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline054 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline055
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline055 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y' +
      '</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline056
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline056 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>+' +
      '</mo></mtd><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd>' +
      '<mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd>' +
      '<mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline057
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline057 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mtable><mtr><mtd><mtext>Equation 1:     </mtext>' +
      '<mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr><mtr>' +
      '<mtd><mtext>Equation 2: </mtext><mn>2</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline058
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline058 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mrow></mtd></mtr><mtr><mtd><mrow><mtext>Equation 2:' +
      '</mtext></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>=</mo><mn>17</mn></mrow></mtd></mtr></mtable>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline059
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline059 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:' +
      '</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd>' +
      '<mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow>' +
      '</mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr>' +
      '</mtable><mtext></mtext></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline060
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline060 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mtable><mtr><mtd><mn>4</mn><mi>x</mi><mo>+</mo><mn>3' +
      '</mn><mi>y</mi><mo>+</mo><mn>2</mn><mi>z</mi><mo>=</mo><mn>17</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>4</mn><mi>y' +
      '</mi><mo>+</mo><mn>6</mn><mi>z</mi><mo>=</mo><mn>6</mn></mtd></mtr>' +
      '<mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>2</mn><mi>y</mi><mo>+' +
      '</mo><mn>5</mn><mi>z</mi><mo>=</mo><mn>1</mn></mtd></mtr></mtable>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline061
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline061 = function() {
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
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline062
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline062 = function() {
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
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline063
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline063 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mtable><mtr><mtd><mtext>Step 1:  </mtext><mn>3</mn>' +
      '<mi>x</mi><mo>+</mo><mn>8</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mtext>Step 2:  </mtext><mn>8</mn><mo>=</mo><mn>5' +
      '</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd></mtr><mtr><mtd>' +
      '<mtext>Step 3:  </mtext><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi>' +
      '</mtd></mtr><mtr><mtd><mtext>Step 4:  </mtext><mn>4</mn><mo>=</mo>' +
      '<mi>x</mi></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline064
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline064 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn>' +
      '</mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext>' +
      '<mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow>' +
      '</mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline065
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline065 = function() {
  var preference = 'MultiLineLabel_Auto:' +
      'MultiLinePausesBetweenColumns_Auto:MultiLineOverview_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd>' +
      '<mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow>' +
      '</mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline066
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline066 = function() {
  var preference = 'MultiLineLabel_Case:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−' +
      '</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn>' +
      '</mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext>' +
      '<mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow>' +
      '</mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline067
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline067 = function() {
  var preference = 'MultiLineLabel_Case:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mrow><mtext></mtext><mtable><mtr><mtd><mrow><mi>f' +
      '</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mo>−</mo>' +
      '<mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi>' +
      '<mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>f</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>x</mi>' +
      '</mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0' +
      '</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline068
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline068 = function() {
  var preference = 'MultiLineLabel_Equation:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline069
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline069 = function() {
  var preference = 'MultiLineLabel_Line:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline070
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline070 = function() {
  var preference = 'MultiLineLabel_Row:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=' +
      '</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo>' +
      '<mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline071
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline071 = function() {
  var preference = 'MultiLineLabel_Step:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable><mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>8' +
      '</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd></mtr><mtr><mtd><mn>8</mn>' +
      '<mo>=</mo><mn>5</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi></mtd></mtr>' +
      '<mtr><mtd><mn>4</mn><mo>=</mo><mi>x</mi></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline072
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline072 = function() {
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
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMultiLineEntries Example Multiline073
 */
sre.ClearspeakFrenchMultiLineEntries.prototype.testMultiline073 = function() {
  var preference = 'MultiLineLabel_Constraint:MultiLineOverview_None:' +
      'MultiLinePausesBetweenColumns_Auto';
  var mathml = '<math><mtable columnalign="left"><mtr><mtd><mi>x</mi><mo>≥' +
      '</mo><mn>0</mn></mtd></mtr><mtr><mtd><mi>y</mi><mo>≥</mo><mn>0</mn>' +
      '</mtd></mtr><mtr><mtd><mn>3</mn><mi>x</mi><mo>−</mo><mn>5</mn><mi>y' +
      '</mi><mo>≤</mo><mn>30</mn></mtd></mtr></mtable></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};
