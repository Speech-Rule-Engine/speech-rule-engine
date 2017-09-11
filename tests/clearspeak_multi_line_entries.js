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


goog.provide('sre.ClearspeakMultiLineEntries');

goog.require('sre.ClearspeakRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakRuleTest}
*/
sre.ClearspeakMultiLineEntries = function() {
sre.ClearspeakMultiLineEntries.base(this, 'constructor');

/**
* @override
*/
this.information = 'ClearspeakMultiLineEntries rule tests.';

};
goog.inherits(sre.ClearspeakMultiLineEntries, sre.ClearspeakRuleTest);



//
// Multi-Line Entries Examples
//


/**
 * Testing ClearspeakMultiLineEntries Example Multiline001
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline001 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_Auto MultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '2 lines<br/>[line 1]<br/>long pause [line 2]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline002
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline002 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_Auto MultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '2 lines<br/>[line 1]<br/>long pause [line 2]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline003
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline003 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_Auto MultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>+</mo></mtd><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '2 lines<br/>[line 1]<br/>long pause [line 2]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline004
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline004 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_Auto MultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mtext>Equation 1:     </mtext><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr><mtr><mtd><mtext>Equation 2: </mtext><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '2 lines<br/>[line 1]<br/>long pause [line 2]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline005
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline005 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_Auto MultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:</mtext></mrow></mtd><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mrow></mtd></mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '2 lines<br/>[line 1]<br/>long pause [line 2]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline006
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline006 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_Auto MultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable><mtext></mtext></mrow></math>';
  var speech = '2 lines<br/>[line 1]<br/>long pause [line 2]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline007
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline007 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mn>4</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>+</mo><mn>2</mn><mi>z</mi><mo>=</mo><mn>17</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>4</mn><mi>y</mi><mo>+</mo><mn>6</mn><mi>z</mi><mo>=</mo><mn>6</mn></mtd></mtr><mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>2</mn><mi>y</mi><mo>+</mo><mn>5</mn><mi>z</mi><mo>=</mo><mn>1</mn></mtd></mtr></mtable></math>';
  var speech = '3 lines<br/>[line 1]<br/>Long pause [line 2]<br/>Long pause<br/>[line 3]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline008
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline008 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>4</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>2</mn><mi>z</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>4</mn><mi>y</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>6</mn><mi>z</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mrow><mn>3</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>2</mn><mi>y</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>5</mn><mi>z</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>1</mn></mtd></mtr></mtable></mrow></math>';
  var speech = '3 lines<br/>[line 1]<br/>Long pause [line 2]<br/>Long pause<br/>[line 3]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline009
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline009 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mtext>Equation 1: </mtext><mn>4</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>+</mo><mn>2</mn><mi>z</mi><mo>=</mo><mn>17</mn></mtd></mtr><mtr><mtd><mtext>Equation 2: </mtext><mn>2</mn><mi>x</mi><mo>+</mo><mn>4</mn><mi>y</mi><mo>+</mo><mn>6</mn><mi>z</mi><mo>=</mo><mn>6</mn></mtd></mtr><mtr><mtd><mtext>Equation 3: </mtext><mn>3</mn><mi>x</mi><mo>+</mo><mn>2</mn><mi>y</mi><mo>+</mo><mn>5</mn><mi>z</mi><mo>=</mo><mn>1</mn></mtd></mtr></mtable></math>';
  var speech = '3 lines<br/>[line 1]<br/>Long pause [line 2]<br/>Long pause<br/>[line 3]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline010
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline010 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable columnalign="left"><mtr><mtd><mi>x</mi><mo>≥</mo><mn>0</mn></mtd></mtr><mtr><mtd><mi>y</mi><mo>≥</mo><mn>0</mn></mtd></mtr><mtr><mtd><mn>3</mn><mi>x</mi><mo>−</mo><mn>5</mn><mi>y</mi><mo>≤</mo><mn>30</mn></mtd></mtr></mtable></math>';
  var speech = '3 lines<br/>[line 1]<br/>Long pause [line 2]<br/>Long pause<br/>[line 3]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline011
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline011 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>8</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd></mtr><mtr><mtd><mn>8</mn><mo>=</mo><mn>5</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd></mtr><mtr><mtd><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi></mtd></mtr><mtr><mtd><mn>4</mn><mo>=</mo><mi>x</mi></mtd></mtr></mtable></math>';
  var speech = '4 lines<br/>[line 1]<br/>long pause [line 2]<br/>Long pause<br/>[line 3]<br/>Long pause<br/>[line 4]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline012
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline012 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>3</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mo>−</mo></mtd><mtd><mrow><mn>3</mn><mi>x</mi></mrow></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>4</mn></mtd><mtd><mo>=</mo></mtd><mtd><mi>x</mi></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr></mtable></mrow></math>';
  var speech = '4 lines<br/>[line 1]<br/>long pause [line 2]<br/>Long pause<br/>[line 3]<br/>Long pause<br/>[line 4]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline013
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline013 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mtext>Step 1:  </mtext><mn>3</mn><mi>x</mi><mo>+</mo><mn>8</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd></mtr><mtr><mtd><mtext>Step 2:  </mtext><mn>8</mn><mo>=</mo><mn>5</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd></mtr><mtr><mtd><mtext>Step 3:  </mtext><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi></mtd></mtr><mtr><mtd><mtext>Step 4:  </mtext><mn>4</mn><mo>=</mo><mi>x</mi></mtd></mtr></mtable></math>';
  var speech = '4 lines<br/>[line 1]<br/>long pause [line 2]<br/>Long pause<br/>[line 3]<br/>Long pause<br/>[line 4]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline014
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline014 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = '<p>F of x =,</p><p>2 cases<br/>Case 1:<br/>[line 1]<br/>long pause<br/>Case 2: [line 2]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline015
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline015 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = '<p>F of x =,</p><p>2 cases<br/>Case 1:<br/>[line 1]<br/>long pause<br/>Case 2: [line 2]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline016
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline016 = function() {
  var preference = '_MultiLineLabel_CaseMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = '<p>F of x =,</p><p>2 cases.<br/>Case 1: [line 1]<br/>Long pause<br/>Case 2: [line 2]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline017
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline017 = function() {
  var preference = '_MultiLineLabel_CaseMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = '<p>F of x =,</p><p>2 cases.<br/>Case 1: [line 1]<br/>Long pause<br/>Case 2: [line 2]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline018
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline018 = function() {
  var preference = '_MultiLineLabel_CaseMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 cases</p><p>Case 1: [line 1]<br/>Long pause<br/>Case 2: [line 2]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline019
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline019 = function() {
  var preference = '_MultiLineLabel_EquationMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '<p>2 equations</p><p>Equation 1: [line 1]<br/>Long Pause<br/>Equation 2: [line 2]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline019a
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline019a = function() {
  var preference = '_MultiLineLabel_EquationMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<math style="background-color:#"> <semantics>  <mtable>   <mtr>    <mtd>     <mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn>    </mtd>   </mtr>   <mtr>    <mtd>     <mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn>    </mtd>   </mtr>  </mtable>     </semantics></math>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline020
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline020 = function() {
  var preference = '_MultiLineLabel_LineMultiLinePausesBetweenColumns_AutoMultiLineOverview_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 lines</p><p>Line 1: [line 1]<br/>Long pause<br/>Line 2: [line 2]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline021
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline021 = function() {
  var preference = '_MultiLineLabel_LineMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '<p>2 lines</p><p>Line 1: [line 1]<br/>Long Pause<br/>Line 2: [line 2]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline022
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline022 = function() {
  var preference = '_MultiLineLabel_RowMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 rows</p><p>Row 1: [line 1]<br/>Long Pause<br/>Row 2: [line 2]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline023
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline023 = function() {
  var preference = '_MultiLineLabel_RowMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>8</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd></mtr><mtr><mtd><mn>8</mn><mo>=</mo><mn>5</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd></mtr><mtr><mtd><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi></mtd></mtr><mtr><mtd><mn>4</mn><mo>=</mo><mi>x</mi></mtd></mtr></mtable></math>';
  var speech = '2 rows<br/>|Row 1: [line 1]<br/>Long Pause<br/>Row 2: [line 2]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline024
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline024 = function() {
  var preference = '_MultiLineLabel_StepMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>3</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mo>−</mo></mtd><mtd><mrow><mn>3</mn><mi>x</mi></mrow></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>4</mn></mtd><mtd><mo>=</mo></mtd><mtd><mi>x</mi></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>4 steps</p><p>Step 1: [line 1]<br/>Long Pause<br/>Step 2: [line 2]<br/>Long Pause<br/>Step 3: [line 3]<br/>Long Pause<br/>Step 4: [line 4]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline025
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline025 = function() {
  var preference = '_MultiLineLabel_StepMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable columnalign="left"><mtr><mtd><mi>x</mi><mo>≥</mo><mn>0</mn></mtd></mtr><mtr><mtd><mi>y</mi><mo>≥</mo><mn>0</mn></mtd></mtr><mtr><mtd><mn>3</mn><mi>x</mi><mo>−</mo><mn>5</mn><mi>y</mi><mo>≤</mo><mn>30</mn></mtd></mtr></mtable></math>';
  var speech = '<p>4 steps</p><p>Step 1: [line 1]<br/>Long Pause<br/>Step 2: [line 2]<br/>Long Pause<br/>Step 3: [line 3]<br/>Long Pause<br/>Step 4: [line 4]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline026
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline026 = function() {
  var preference = '_MultiLineLabel_ConstraintMultiLineOverview_AutoMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '<p>3 constraints</p><p>Constraint 1: [line 1]<br/>Long Pause<br/>Constraint 2: [line 2]<br/>Long Pause<br/>Constraint 3: [line 3]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline027
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline027 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Long';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 lines</p><p>[Contents of the two lines are spoken, with a long pause between them]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline028
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline028 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Long';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>+</mo></mtd><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 lines</p><p>[Contents of the lines are spoken, long pause between rows, and between columns ]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline029
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline029 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Long';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mtext></mtext><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mrow></mtd></mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 lines</p><p>[Contents of the lines are spoken, long pause between rows, and between columns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline030
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline030 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Long';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable><mtext></mtext></mrow></math>';
  var speech = '<p>2 lines</p><p>[Contents of the lines are spoken, long pause between rows, and between columns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline031
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline031 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Long';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>4</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>2</mn><mi>z</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>4</mn><mi>y</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>6</mn><mi>z</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mrow><mn>3</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>2</mn><mi>y</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>5</mn><mi>z</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>1</mn></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 lines</p><p>[Contents of the lines are spoken, long pause between rows, and between columns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline032
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline032 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Long';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>3</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mo>−</mo></mtd><mtd><mrow><mn>3</mn><mi>x</mi></mrow></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>4</mn></mtd><mtd><mo>=</mo></mtd><mtd><mi>x</mi></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>3 lines</p><p>[Contents of the lines are spoken, long pause between rows, and between columns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline033
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline033 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Long';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = '<p>4 lines</p><p>[Contents of the lines are spoken, long pause between rows, and between columns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline034
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline034 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Long';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = '<p>F of x =</p><p>2 cases</p><p>Case 1:</p><p>[Contents of line spoken, w/long pause between columns]</p><p>Long pause</p><p>Case 2 [Contents of line spoken, w/long pause between columns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline035
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline035 = function() {
  var preference = '_MultiLineLabel_CaseMultiLineOverview_AutoMultiLinePausesBetweenColumns_Long';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtext></mtext><mtable><mtr><mtd><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>F of x =</p><p>2 cases</p><p>Case 1:</p><p>[Contents of line spoken, w/long pause between columns]</p><p>Long pause</p><p>Case 2 [Contents of line spoken, w/long pause between columns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline036
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline036 = function() {
  var preference = '_MultiLineLabel_CaseMultiLineOverview_AutoMultiLinePausesBetweenColumns_Long';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 cases</p><p>Case 1: [Contents of line spoken, w/long pause between columns]</p><p>Long pause</p><p>Case 2 [Contents of line spoken, w/long pause between columns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline037
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline037 = function() {
  var preference = '_MultiLineLabel_EquationMultiLineOverview_AutoMultiLinePausesBetweenColumns_Long';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 equations</p><p>Equation 1: [Contents of line spoken, w/long pause between columns]</p><p>Long pause</p><p>Equation 2: [Contents of line spoken, w/long pause between columns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline038
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline038 = function() {
  var preference = '_MultiLineLabel_LineMultiLineOverview_AutoMultiLinePausesBetweenColumns_Long';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 lines</p><p>Line 1: [Contents of line spoken, w/long pause between columns]</p><p>Long pause</p><p>Line 2 [Contents of line spoken, w/long pause between columns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline039
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline039 = function() {
  var preference = '_MultiLineLabel_RowMultiLineOverview_AutoMultiLinePausesBetweenColumns_Long';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 rows</p><p>Row 1: [Contents of line spoken, w/long pause between columns]</p><p>Long pause</p><p>Row 2: [Contents of line spoken, w/long pause between columns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline040
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline040 = function() {
  var preference = '_MultiLineLabel_StepMultiLineOverview_AutoMultiLinePausesBetweenColumns_Long';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>3</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mo>−</mo></mtd><mtd><mrow><mn>3</mn><mi>x</mi></mrow></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>4</mn></mtd><mtd><mo>=</mo></mtd><mtd><mi>x</mi></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>4 Steps</p><p>Step 1: [Contents of line spoken, w/long pause between columns]</p><p>Long pause</p><p>Step 2 [Contents of line spoken, w/long pause between columns]</p><p>Long pause</p><p>Step 3: [Contents of line spoken, w/long pause between columns]</p><p>Long pause</p><p>Step 4: [Contents of line spoken, w/long pause between columns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline041
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline041 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Short';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 lines</p><p>[Contents of line spoken, w/short pause betweencolumns, long pause between rows]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline042
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline042 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Short';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>+</mo></mtd><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 lines</p><p>[Contents of line spoken, w/short pause betweencolumns, long pause between rows]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline043
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline043 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Short';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:</mtext></mrow></mtd><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mrow></mtd></mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 lines</p><p>[Contents of line spoken, w/short pause betweencolumns, long pause between rows]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline044
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline044 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Short';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable><mtext></mtext></mrow></math>';
  var speech = '<p>2 lines</p><p>[Contents of line spoken, w/short pause between columns, long pause between rows]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline045
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline045 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Short';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>4</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>2</mn><mi>z</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>4</mn><mi>y</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>6</mn><mi>z</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mrow><mn>3</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>2</mn><mi>y</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>5</mn><mi>z</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>1</mn></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>3 lines</p><p>[Contents of line spoken, w/short pause between columns, long pause between rows]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline046
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline046 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Short';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>3</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mo>−</mo></mtd><mtd><mrow><mn>3</mn><mi>x</mi></mrow></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>4</mn></mtd><mtd><mo>=</mo></mtd><mtd><mi>x</mi></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>4 lines</p><p>[Contents of line spoken, w/short pause between columns, long pause between rows]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline047
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline047 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_AutoMultiLinePausesBetweenColumns_Short';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = '<p>F of x =</p><p>[Contents of line spoken, w/short pause between columns, long pause between rows]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline048
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline048 = function() {
  var preference = '_MultiLineLabel_CaseMultiLineOverview_AutoMultiLinePausesBetweenColumns_Short';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = '<p>F of x =</p><p>2 cases</p><p>Case 1: [Contents of line spoken, w/short pause between columns] long pause</p><p>Case 2: [Contents of line spoken, w/short pause between columns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline049
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline049 = function() {
  var preference = '_MultiLineLabel_CaseMultiLineOverview_AutoMultiLinePausesBetweenColumns_Short';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtext></mtext><mtable><mtr><mtd><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 cases</p><p>Case 1: [Contents of line spoken, w/short pause between columns]</p><p>long pause</p><p>Case 2: [Contents of line spoken, w/short pause between columns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline050
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline050 = function() {
  var preference = '_MultiLineLabel_EquationMultiLineOverview_AutoMultiLinePausesBetweenColumns_Short';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 equations</p><p>Equation 1: [Contents of line spoken, w/short pause between columns] long pause</p><p>Equation 2: [Contents of line spoken, w/short pause between columns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline051
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline051 = function() {
  var preference = '_MultiLineLabel_LineMultiLineOverview_AutoMultiLinePausesBetweenColumns_Short';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 lines</p><p>Line 1: [Contents of line spoken, w/short pause between columns] long pause</p><p>Line 2: [Contents of line spoken, w/short pause between columns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline052
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline052 = function() {
  var preference = '_MultiLineLabel_RowMultiLineOverview_AutoMultiLinePausesBetweenColumns_Short';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 rows</p><p>Row 1: [Contents of line spoken, w/short pause between columns] long pause</p><p>Row 2: [Contents of line spoken, w/short pause between columns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline053
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline053 = function() {
  var preference = '_MultiLineLabel_StepMultiLineOverview_AutoMultiLinePausesBetweenColumns_Short';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>3</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mo>−</mo></mtd><mtd><mrow><mn>3</mn><mi>x</mi></mrow></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>4</mn></mtd><mtd><mo>=</mo></mtd><mtd><mi>x</mi></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>4 steps</p><p>Step 1: [Contents of line spoken, w/short pause between columns] long pause</p><p>Step 2: [Contents of line spoken, w/short pause between columns]</p><p>Long pause</p><p>Step 3: [Contents of line spoken, w/short pause between columns] long pause</p><p>Step 4: [Contents of line spoken, w/short pause between columns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline054
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline054 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '[line 1]<br/>long pause [line 2]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline055
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline055 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '[line 1]<br/>long pause<br/>[line 2]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline056
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline056 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>+</mo></mtd><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '[line 1]<br/>long pause<br/>[line 2]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline057
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline057 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mtext>Equation 1:     </mtext><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr><mtr><mtd><mtext>Equation 2: </mtext><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = '[line 1]<br/>long pause<br/>[line 2]]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline058
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline058 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:</mtext></mrow></mtd><mtd><mrow><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mrow></mtd></mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '[line 1]<br/>long pause<br/>[line 2]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline059
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline059 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mtext>Equation 1:</mtext></mrow></mtd><mtd><mrow><mtext></mtext><mi>x</mi><mo>+</mo><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>7</mn></mtd></mtr><mtr><mtd><mrow><mtext>Equation 2:</mtext></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>17</mn></mrow></mtd></mtr></mtable><mtext></mtext></mrow></math>';
  var speech = '[line 1]<br/>long pause<br/>[line 2]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline060
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline060 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mn>4</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>+</mo><mn>2</mn><mi>z</mi><mo>=</mo><mn>17</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>4</mn><mi>y</mi><mo>+</mo><mn>6</mn><mi>z</mi><mo>=</mo><mn>6</mn></mtd></mtr><mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>2</mn><mi>y</mi><mo>+</mo><mn>5</mn><mi>z</mi><mo>=</mo><mn>1</mn></mtd></mtr></mtable></math>';
  var speech = '[line 1]<br/>long pause [line 2]<br/>long pause<br/>[line 3]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline061
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline061 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>4</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>3</mn><mi>y</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>2</mn><mi>z</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>4</mn><mi>y</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>6</mn><mi>z</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mrow><mn>3</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>2</mn><mi>y</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mrow><mn>5</mn><mi>z</mi></mrow></mtd><mtd><mo>=</mo></mtd><mtd><mn>1</mn></mtd></mtr></mtable></mrow></math>';
  var speech = '[line 1]<br/>long pause [line 2]<br/>long pause<br/>[line 3]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline062
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline062 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mtext>Equation 1: </mtext><mn>4</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>+</mo><mn>2</mn><mi>z</mi><mo>=</mo><mn>17</mn></mtd></mtr><mtr><mtd><mtext>Equation 2: </mtext><mn>2</mn><mi>x</mi><mo>+</mo><mn>4</mn><mi>y</mi><mo>+</mo><mn>6</mn><mi>z</mi><mo>=</mo><mn>6</mn></mtd></mtr><mtr><mtd><mtext>Equation 3: </mtext><mn>3</mn><mi>x</mi><mo>+</mo><mn>2</mn><mi>y</mi><mo>+</mo><mn>5</mn><mi>z</mi><mo>=</mo><mn>1</mn></mtd></mtr></mtable></math>';
  var speech = '[line 1]<br/>long pause [line 2]<br/>long pause<br/>[line 3]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline063
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline063 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mtext>Step 1:  </mtext><mn>3</mn><mi>x</mi><mo>+</mo><mn>8</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd></mtr><mtr><mtd><mtext>Step 2:  </mtext><mn>8</mn><mo>=</mo><mn>5</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd></mtr><mtr><mtd><mtext>Step 3:  </mtext><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi></mtd></mtr><mtr><mtd><mtext>Step 4:  </mtext><mn>4</mn><mo>=</mo><mi>x</mi></mtd></mtr></mtable></math>';
  var speech = '[line 1]<br/>long pause [line 2]<br/>Long pause<br/>[line 3]<br/>Long pause<br/>[line 4]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline064
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline064 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = '<p>F of x =</p><p>Case 1:</p><p>[line 1]<br/>long pause<br/>Case 2: [line 2]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline065
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline065 = function() {
  var preference = '_MultiLineLabel_AutoMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mi>x</mi></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = '<p>F of x =,</p><p>Case 1:</p><p>[line 1]<br/>long pause<br/>Case 2: [line 2]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline066
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline066 = function() {
  var preference = '_MultiLineLabel_CaseMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mrow><mo>{</mo><mrow><mtable><mtr><mtd><mrow><mo>−</mo><mi>x</mi><mtext> if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mtext>   if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></mrow></mrow></math>';
  var speech = '<p>F of x =,</p><p>Case 1, [line 1]<br/>Long pause<br/>Case 2, [line 2]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline067
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline067 = function() {
  var preference = '_MultiLineLabel_CaseMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtext></mtext><mtable><mtr><mtd><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>x</mi></mrow></mtd><mtd><mrow><mtext>if </mtext><mi>x</mi><mo>≥</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = '<p>2 cases</p><p>Case 1: [Contents of line spoken, w/short pause betweencolumns]</p><p>Short pause</p><p>Case 2: [Contents of line spoken, w/short pause betweencolumns]</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline068
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline068 = function() {
  var preference = '_MultiLineLabel_EquationMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = 'Equation 1: [line 1]<br/>Long Pause<br/>Equation 2: [line 2]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline069
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline069 = function() {
  var preference = '_MultiLineLabel_LineMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = 'Line 1: [line 1]<br/>Long pause<br/>Line 2: [line 2]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline070
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline070 = function() {
  var preference = '_MultiLineLabel_RowMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>7</mn></mtd></mtr><mtr><mtd><mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>y</mi><mo>=</mo><mn>17</mn></mtd></mtr></mtable></math>';
  var speech = 'Row 1: [line 1]<br/>Long Pause<br/>Row 2: [line 2]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline071
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline071 = function() {
  var preference = '_MultiLineLabel_StepMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable><mtr><mtd><mn>3</mn><mi>x</mi><mo>+</mo><mn>8</mn><mo>=</mo><mn>5</mn><mi>x</mi></mtd></mtr><mtr><mtd><mn>8</mn><mo>=</mo><mn>5</mn><mi>x</mi><mo>−</mo><mn>3</mn><mi>x</mi></mtd></mtr><mtr><mtd><mn>8</mn><mo>=</mo><mn>2</mn><mi>x</mi></mtd></mtr><mtr><mtd><mn>4</mn><mo>=</mo><mi>x</mi></mtd></mtr></mtable></math>';
  var speech = 'Step 1: [line 1]<br/>Long Pause<br/>Step 2: [line 2]<br/>Long Pause<br/>Step 3: [line 3]<br/>Long Pause<br/>Step 4: [line 4]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline072
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline072 = function() {
  var preference = '_MultiLineLabel_StepMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mn>3</mn><mi>x</mi></mrow></mtd><mtd><mo>+</mo></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>5</mn><mi>x</mi></mrow></mtd><mtd><mo>−</mo></mtd><mtd><mrow><mn>3</mn><mi>x</mi></mrow></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>8</mn></mtd><mtd><mo>=</mo></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr><mtr><mtd><mrow/></mtd><mtd><mrow/></mtd><mtd><mn>4</mn></mtd><mtd><mo>=</mo></mtd><mtd><mi>x</mi></mtd><mtd><mrow/></mtd><mtd><mrow/></mtd></mtr></mtable></mrow></math>';
  var speech = 'Step 1: [line 1]<br/>Long Pause<br/>Step 2: [line 2]<br/>Long Pause<br/>Step 3: [line 3]<br/>Long Pause<br/>Step 4: [line 4]';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMultiLineEntries Example Multiline073
 */
sre.ClearspeakMultiLineEntries.prototype.untestMultiline073 = function() {
  var preference = '_MultiLineLabel_ConstraintMultiLineOverview_NoneMultiLinePausesBetweenColumns_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mtable columnalign="left"><mtr><mtd><mi>x</mi><mo>≥</mo><mn>0</mn></mtd></mtr><mtr><mtd><mi>y</mi><mo>≥</mo><mn>0</mn></mtd></mtr><mtr><mtd><mn>3</mn><mi>x</mi><mo>−</mo><mn>5</mn><mi>y</mi><mo>≤</mo><mn>30</mn></mtd></mtr></mtable></math>';
  var speech = 'Constraint 1: [line 1]<br/>Long Pause<br/>Constraint 2: [line 2]<br/>Long Pause<br/>Constraint 3: [line 3]';
  this.executeRuleTest(mathml, speech, preference);
};