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


goog.provide('sre.ClearspeakMatricesVectorsAndCombinatorics');

goog.require('sre.ClearspeakRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakRuleTest}
*/
sre.ClearspeakMatricesVectorsAndCombinatorics = function() {
sre.ClearspeakMatricesVectorsAndCombinatorics.base(this, 'constructor');

/**
* @override
*/
this.information = 'ClearspeakMatricesVectorsAndCombinatorics rule tests.';

};
goog.inherits(sre.ClearspeakMatricesVectorsAndCombinatorics, sre.ClearspeakRuleTest);



//
// ClearSpeak Rules and Preferences Examples: Matrices, Vectors, and Combinatorics
//


//
// Matrices, Vectors, and Combinatorics
//


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix001
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix001 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix002
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix002 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix003
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix003 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix004
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix004 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix005
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix005 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix006
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix006 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix007
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix007 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row matrix. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix008
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix008 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row matrix. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix008a
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix008a = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = 'the 1 by 1 matrix with entry 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix009
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix009 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column matrix Row 1: x plus 1 Row 2: x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix010
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix010 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix Row 1: 3 Row 2: 6 Row 3: 1 Row 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix011
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix011 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row matrix Column 1: x plus 1 Column 2: 2x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix012
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix012 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 Row matrix: Column 1: 3 Column 2: 6 Column 3: 1 Column 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix013
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix013 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3 ,5 ,2 Row 3: 1 ,4 ,7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix014
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix014 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1 , 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix015
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix015 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 5 matrix (pause) Row 1: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 5; Column 5, 3 Row 2: Column 1, 3 Column 2, 4: Column 3, 2; Column 4, 7: Column 5, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix016
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix016 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 2 matrix. Row 1: Column 1, 1; Column 2, 3. Row 2: Column 1, 4; Column 2, 2. Row 3: Column 1, 2; Column 2, 1. Row 4: Column 1, 0: Column 2, 5.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix017
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix017 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix018
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix018 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1 minus x. Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix019
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix019 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2x , 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example 
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untest = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2x, y , Row 2: one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix020
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix020 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix021
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix021 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><msub><mi>b</mi><mrow><mn>11</mn></mrow></msub></mrow></mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>12</mn></mrow></msub></mrow></mtd></mtr><mtr><mtd><mrow><msub><mi>b</mi><mrow><mn>21</mn></mrow></msub></mrow></mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>22</mn></mrow></msub></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: b sub 1 1, b sub 1 2 Row 2: b sub 2 1, b sub 2 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix022
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix022 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 times the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. times the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1; Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix023
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix023 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth times the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1 minus x: Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix024
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix024 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9 , Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0. times the 4 by 2 matrix. Row 1: Column 1, 1: Column 2, 3. Row 2: Column 1, 4; Column 2, 2. Row 3: Column 1, 2; Column 2, 1. Row 4: Column 1, 0; Column 2, 5.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix025
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix025 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix026
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix026 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix027
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix027 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5, 2 Row 3: 1, 4 ,7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix028
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix028 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5, 2 Row 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix029
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix029 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix030
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix030 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 3, 0.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix031
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix031 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix032
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix032 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix033
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix033 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix034
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix034 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix035
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix035 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2x, y Row 2: one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix036
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix036 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2x, y Row 2: one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix037
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix037 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix038
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix038 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix039
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix039 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1 Row 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix040
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix040 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1; Row 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix041
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix041 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1; Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix042
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix042 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1; Column 3, 4 Row 2: Column 1, 0; Column 2, 2; Column 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix043
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix043 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. Row 1: 1 Row 2: 2 Row 3: 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix044
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix044 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. Row 1: 1 Row 2: 2 Row 3: 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix045
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix045 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row matrix. Column 1: 3 Column 2: 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix046
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix046 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row matrix. Column 1: 3 Column 2: 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix047
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix047 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 Row matrix Column 1: 1 Column 2: 2 Column 3: 3 Column 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix048
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix048 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 Row matrix Column 1: 1 Column 2: 2 Column 3: 3 Column 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix049
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix049 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix Row 1: 1 Row 2: 2 Row 3: 3 Row 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix050
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix050 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix Row 1: 1 Row 2: 2 Row 3: 3 Row 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix051
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix051 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column matrix Row 1: x plus 1 Row 2: x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix052
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix052 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix Row 1: 3 Row 2: 6 Row 3: 1 Row 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix053
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix053 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row matrix Column 1: x plus 1 Column 2: 2x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix054
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix054 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 Row matrix: Column 1: 3 Column 2: 6 Column 3: 1 Column 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix055
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix055 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 3 matrix. Row 1: Column 1, 2; Column 2, 4; Column 3, 1; Row 2: Column 1, 3; Column 2, 5; Column 3, 2 Row 3: Column 1, 1; Column 2, 4; Column 3, 7 ,';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix056
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix056 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3; Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9 Row 3: Column 1, 3; Column 2, 0 Column 3, 2; Column 4, 4 Row 4: Column 1, 6 Column 2, 2 Column 3, 9 Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix057
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix057 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 5 matrix. Row 1: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 5; Column 5, 3 Row 2: Column 1, 3; Column 2, 4; Column 3, 2; Column 4, 7; Column 5, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix057a
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix057a = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 2 matrix. Row 1: Column 1, 1; Column 2, 3 Row 2: Column 1, 4; Column 2, 2 Row 3: Column 1, 2; Column 2, 1 Row 4: Column 1, 0; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix058
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix058 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1 Row 2: Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix059
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix059 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1 minus x; Column 3, 4 Row 2: Column 1, 0; Column 2, 2; Column 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix060
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix060 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2x ; Column 2, 1 Row 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix061
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix061 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: ; Column 1, 2x; Column 2, y Row 2: ; Column 1, one half ; Column 2, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix062
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix062 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, one half; Column 2, two thirds Row 2: Column 1, three fourths; Column 2, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix063
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix063 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><msub><mi>b</mi><mrow><mn>11</mn></mrow></msub></mrow></mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>12</mn></mrow></msub></mrow></mtd></mtr><mtr><mtd><mrow><msub><mi>b</mi><mrow><mn>21</mn></mrow></msub></mrow></mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>22</mn></mrow></msub></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, b sub 1 1; Column 2, b sub 1 2 Row 2: Column 1, b sub 2 1; Column 2, b sub 2 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix064
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix064 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 times the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1 Row 2: Column 1, 7; Column 2, 5 times the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1; Column 3, 4 Row 2: Column 1, 0; Column 2, 2; Column 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix065
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix065 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, one half; Column 2, two thirds Row 2: Column 1, three fourths; Column 2, one fifth times the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1 minus x; Column 3, 4 Row 2: Column 1, 0; Column 2, 2; Column 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix066
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix066 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3 Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9 Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1 Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0 times the 4 by 2 matrix. Row 1: Column 1, 1; Column 2, 3 Row 2: Column 1, 4; Column 2, 2 Row 3: Column 1, 2; Column 2, 1 Row 4: Column 1, 0 ; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix067
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix067 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1; Row 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix068
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix068 = function() {
  var preference = 'Matrix_';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1 Row 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix069
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix069 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: Column 1, 2, ; Column 2, 4; Column 3, 1 Row 2: Column 1, 3; Column 2, 5; Column 3, 2 Row 3: Column 1, 1; Column 2, 4; Column 3, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix070
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix070 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: Column 1, 2; Column 2, 4; Column 3, 1 Row 2: Column1, 3; Column 2, 5; Column 3, 2; Row 3: Column1, 1; Column 2, 4; Column 3, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix071
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix071 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3 Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9; Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1; Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix072
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix072 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1 Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3 Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9 Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1 Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix073
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix073 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1 Row 2: Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix074
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix074 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1 Row 2: Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix075
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix075 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2x Column 2, 1 Row 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix076
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix076 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2x; Column 2, 1 Row 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix077
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix077 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2x; Column 2, y, Row 2: Column 1, one half; Column 2, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix078
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix078 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2x; Column 2, y Row 2: Column 1, one half; Column 2, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix079
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix079 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, one half; Column 2, two thirds Row 2: Column 1, three fourths; Column 2, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix080
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix080 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, one half; Column 2, two thirds Row 2: Column 1, three fourths; Column 2, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix081
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix081 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix082
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix082 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix083
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix083 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix084
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix084 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix085
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix085 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 Column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix086
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix086 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 Column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix087
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix087 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row matrix 3 ,5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix088
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix088 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row matrix. 3 ,5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix089
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix089 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 Column matrix x plus 1, x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix090
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix090 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 Column matrix 3, 6, 1, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix091
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix091 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row matrix x plus 1, 2x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix092
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix092 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 Row matrix 3, 6, 1, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix092a
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix092a = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5, 2 Row 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix093
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix093 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: 0, 3, 4, 3 Row 2: 2, 1, 0, 9 Row 3: 3, 0, 2, 1 Row 4: 6, 2, 9, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix094
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix094 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 5 matrix. Row 1: 2, 1, 0, 5, 3 Row 2: 3, 4, 2, 7, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix095
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix095 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 2 matrix. Row 1: 1, 3; Row 2: 4, 2 Row 3: 2, 1 Row 4: 0, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix096
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix096 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix097
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix097 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1:3, 1 minus x, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix098
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix098 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix099
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix099 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2x, y Row 2: one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix100
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix100 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix101
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix101 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><msub><mi>b</mi><mrow><mn>11</mn></mrow></msub></mrow></mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>12</mn></mrow></msub></mrow></mtd></mtr><mtr><mtd><mrow><msub><mi>b</mi><mrow><mn>21</mn></mrow></msub></mrow></mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>22</mn></mrow></msub></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: b sub 1 1, b sub 1 2 Row 2: b sub 2 1 , b sub 2 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix102
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix102 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 times the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5 times the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix103
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix103 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1:one half, two thirds Row 2: three fourths, one fifth times the 2 by 3 matrix. Row 1: 3, 1 minus x, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix104
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix104 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: 0, 3, 4, 3 Row 2: 2, 1, 0, 9 Row 3: 3, 0, 2, 1 Row 4: 6, 2, 9, 0 times the 4 by 2 matrix. Row 1: 1, 3 Row 2: 4, 2 Row 3: 2, 1 Row 4: 0, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix105
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix105 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix106
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix106 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix107
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix107 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3 ,5, 2 Row 3: 1 ,4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix108
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix108 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5 ,2 Row 3: 1 ,4 ,7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix109
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix109 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: 0, 3, 4, 3 Row 2: 2, 1, 0, 9 Row 3: 3, 0, 2, 1 Row 4: 6, 2, 9, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix110
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix110 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: 0, 3, 4, 3 Row 2: 2, 1, 0, 9 Row 3: 3 0, 2, 1 Row 4: 6, 2, 9, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix111
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix111 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix112
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix112 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix113
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix113 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix114
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix114 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix115
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix115 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2x, y Row 2: one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix116
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix116 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2x, y Row 2: one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix117
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix117 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix118
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix118 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix119
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix119 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5 EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix120
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix120 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5 EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix121
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix121 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6 EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix122
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix122 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6 EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix123
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix123 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 Column matrix. Column 1: 1, 2, 3 EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix124
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix124 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 Column matrix. Column 1: 1, 2, 3 EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix125
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix125 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row matrix. Row 1: 3, 5 EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix126
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix126 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row matrix. Row 1: 3, 5 EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix127
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix127 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 Column matrix Row 1: x plus 1 Row 2: x minus 1 EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix128
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix128 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 Column matrix Row 1: 3 Row 2: 6 Row 3: 1 Row 4: 2 EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix129
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix129 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row matrix Column 1: x plus 1 Column 2: 2x EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix130
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix130 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 Row matrix: Column 1: 3 Column 2: 6 Column 3: 1 Column 4: 2 EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix131
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix131 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3 ,5 ,2 Row 3: 1 ,4 ,7 EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix132
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix132 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1 , 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0. EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix133
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix133 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 5 matrix (pause) Row 1: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 5; Column 5, 3 Row 2: Column 1, 3 Column 2, 4: Column 3, 2; Column 4, 7: Column 5, 0 EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix134
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix134 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 2 matrix. Row 1: Column 1, 1; Column 2, 3. Row 2: Column 1, 4; Column 2, 2. Row 3: Column 1, 2; Column 2, 1. Row 4: Column 1, 0: Column 2, 5. EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix135
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix135 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x. EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix136
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix136 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1 minus x. Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6. EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix137
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix137 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2x , 1 Row 2: 7, 5 EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix138
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix138 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2x, y , Row 2: one half, two thirds EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix139
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix139 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth. End Matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix140
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix140 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><msub><mi>b</mi><mrow><mn>11</mn></mrow></msub></mrow></mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>12</mn></mrow></msub></mrow></mtd></mtr><mtr><mtd><mrow><msub><mi>b</mi><mrow><mn>21</mn></mrow></msub></mrow></mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>22</mn></mrow></msub></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: b sub 1 1, b sub 1 2 Row 2: b sub 2 1, b sub 2 2 EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix141
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix141 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 times the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. End Matrix times the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6 EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix142
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix142 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth End Matrix times the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1 minus x: Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6. EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix143
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix143 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9 , Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0. End Matrix times the 4 by 2 matrix. Row 1: Column 1, 1: Column 2, 3. Row 2: Column 1, 4; Column 2, 2. Row 3: Column 1, 2; Column 2, 1. Row 4: Column 1, 0; Column 2, 5. EndMatrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix144
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix144 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5 End Determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix145
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix145 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5 End Determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix146
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix146 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5, 2 Row 3: 1, 4 ,7 End Determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix147
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix147 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5, 2 Row 3: 1, 4, 7 End Determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix148
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix148 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0. End Determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix149
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix149 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 3, 0. End Determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix150
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix150 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x. End Determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix151
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix151 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x. End Determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix152
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix152 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2x, 1 Row 2: 7, 5 End Determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix153
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix153 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2x, 1 Row 2: 7, 5 End Determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix154
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix154 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2x, y Row 2: one half, two thirds End Determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix155
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix155 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2x, y Row 2: one half, two thirds End Determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix156
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix156 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth End Determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix157
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix157 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth End Determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix158
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix158 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 Column vector: 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix159
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix159 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 Column vector: 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix160
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix160 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row vector: 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix161
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix161 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row vector: 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix162
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix162 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 Column vector Row 1: x plus 1 Row 2: x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix163
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix163 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 Column vector: Row 1: 3, Row 2: 6, Row 3: 1, Row 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix164
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix164 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row vector: Column 1: x plus 1 Column 2: 2x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix165
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix165 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr><mtr><mtd><mn>9</mn></mtd><mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row vector: 3, 2 times the 2 by 2 matrix: Row 1: 0, 5 Row 2: 9, 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix166
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix166 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>8</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 3 Row vector: 1, 2, 7 times the 3 by 3 matrix: Row 1: 3, 5, 4 Row 2: 8, 0, 6 Row 3: 1, 4, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix167
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix167 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr><mtr><mtd><mn>9</mn></mtd><mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix: Row 1: 0, 5 Row 2: 9, 4 times the 2 by 1 Column vector: 3, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix168
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix168 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>8</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 3 matrix: Row 1: 3, 5, 4 Row 2: 8, 0, 6 Row 3: 1, 4, 2 times the 1 by 3 Column vector: 1, 2, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix169
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix169 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 Column vector: 1, 2, 3, end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix170
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix170 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 Column vector: 1, 2, 3 end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix171
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix171 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row vector: 3, 5, end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix172
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix172 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row vector: 3, 5, end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix173
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix173 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 Column vector Row 1: x plus 1 Row 2: x minus 1, end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix174
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix174 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 Column vector: Row 1: 3, Row 2: 6, Row 3: 1, Row 4: 2, end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix175
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix175 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row vector: Column 1: x plus 1 Column 2: 2x, end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix176
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix176 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr><mtr><mtd><mn>9</mn></mtd><mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 Row vector: 3, 2, end vector times the 2 by 2 matrix: Row 1: 0, 5 Row 2: 9, 4, end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix177
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix177 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>8</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 3 Row vector: 1, 2, 7, end vector times the 3 by 3 matrix: Row 1: 3, 5, 4 Row 2: 8, 0, 6 Row 3: 1, 4, 2, end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix178
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix178 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr><mtr><mtd><mn>9</mn></mtd><mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix: Row 1: 0, 5 Row 2: 9, 4, end matrix times the 2 by 1 Column vector: 3, 2, end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix179
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix179 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>8</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 3 matrix: Row 1: 3, 5, 4 Row 2: 8, 0, 6 Row 3: 1, 4, 2, end matrix times the 3 by 1 column vector: 1, 2, 7, end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix180
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix180 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mi>n</mi></mtd></mtr><mtr><mtd><mi>r</mi></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'n choose r';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix181
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix181 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>10</mn></mrow></mtd></mtr><mtr><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '10 choose 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix182
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix182 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>15</mn></mrow></mtd></mtr><mtr><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '15 choose 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix183
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.untestMatrix183 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>8</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '8 choose 3';
  this.executeRuleTest(mathml, speech, preference);
};
