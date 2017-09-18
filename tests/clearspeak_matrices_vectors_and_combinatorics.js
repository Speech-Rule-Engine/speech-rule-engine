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

  // sre.Debugger.getInstance().init();

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
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix002 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix003
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix003 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix004
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix004 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix005
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix005 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix006
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix006 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix007
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix007 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix008
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix008 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix008a
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix008a = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = 'the 1 by 1 matrix with entry 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix008b
 * (Added!)
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix008b = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mo>(</mo><mtable><mtr><mtd><mrow><mrow><mn>3</mn></mrow></mrow></mtd></mtr></mtable><mo>)</mo></mrow></math>';
  var speech = 'the 1 by 1 matrix with entry 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix009
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix009 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column matrix. Row 1: x plus 1 Row 2: x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix010
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix010 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. Row 1: 3 Row 2: 6 Row 3: 1 Row 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix011
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix011 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. Column 1: x plus 1 Column 2: 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix012
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix012 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 3 Column 2: 6 Column 3: 1 Column 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix013
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix013 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5, 2 Row 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix014
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix014 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix015
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix015 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 5 matrix. Row 1: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 5; Column 5, 3. Row 2: Column 1, 3; Column 2, 4; Column 3, 2; Column 4, 7; Column 5, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix016
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix016 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 2 matrix. Row 1: Column 1, 1; Column 2, 3. Row 2: Column 1, 4; Column 2, 2. Row 3: Column 1, 2; Column 2, 1. Row 4: Column 1, 0; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix017
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix017 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix018
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix018 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1 minus x; Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix019
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix019 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2 x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example 
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix019b = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2 x, y Row 2: one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix020
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix020 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix021
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix021 = function() {
  var preference = 'Matrix_Auto';
  // var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><msub><mi>b</mi><mrow><mn>11</mn></mrow></msub></mrow></mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>12</mn></mrow></msub></mrow></mtd></mtr><mtr><mtd><mrow><msub><mi>b</mi><mrow><mn>21</mn></mrow></msub></mrow></mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>2</mn><mn>2</mn></mrow></msub></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><msub><mi>b</mi><mrow><mn>1</mn><mn>1</mn></mrow></msub></mrow></mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>1</mn><mn>2</mn></mrow></msub></mrow></mtd></mtr><mtr><mtd><mrow><msub><mi>b</mi><mrow><mn>2</mn><mn>1</mn></mrow></msub></mrow></mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>2</mn><mn>2</mn></mrow></msub></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: b sub 1 1, b sub 1 2 Row 2: b sub 2 1, b sub 2 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix022
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix022 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  // var speech = '3 times the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. times the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1; Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6';
  var speech = '3 times the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. times the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix023
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix023 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth. times the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1 minus x; Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix024
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix024 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0. times the 4 by 2 matrix. Row 1: Column 1, 1; Column 2, 3. Row 2: Column 1, 4; Column 2, 2. Row 3: Column 1, 2; Column 2, 1. Row 4: Column 1, 0; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix025
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix025 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix026
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix026 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix027
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix027 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5, 2 Row 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix028
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix028 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5, 2 Row 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix029
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix029 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix030
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix030 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix031
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix031 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix032
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix032 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix033
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix033 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix034
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix034 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix035
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix035 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, y Row 2: one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix036
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix036 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, y Row 2: one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix037
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix037 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix038
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix038 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix039
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix039 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix040
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix040 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix041
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix041 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1; Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix042
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix042 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1; Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix043
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix043 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. Row 1: 1 Row 2: 2 Row 3: 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix044
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix044 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. Row 1: 1 Row 2: 2 Row 3: 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix045
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix045 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. Column 1: 3 Column 2: 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix046
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix046 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. Column 1: 3 Column 2: 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix047
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix047 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 1 Column 2: 2 Column 3: 3 Column 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix048
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix048 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 1 Column 2: 2 Column 3: 3 Column 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix049
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix049 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. Row 1: 1 Row 2: 2 Row 3: 3 Row 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix050
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix050 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. Row 1: 1 Row 2: 2 Row 3: 3 Row 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix051
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix051 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column matrix. Row 1: x plus 1 Row 2: x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix052
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix052 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. Row 1: 3 Row 2: 6 Row 3: 1 Row 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix053
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix053 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. Column 1: x plus 1 Column 2: 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix054
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix054 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 3 Column 2: 6 Column 3: 1 Column 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix055
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix055 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 3 matrix. Row 1: Column 1, 2; Column 2, 4; Column 3, 1. Row 2: Column 1, 3; Column 2, 5; Column 3, 2. Row 3: Column 1, 1; Column 2, 4; Column 3, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix056
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix056 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix057
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix057 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 5 matrix. Row 1: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 5; Column 5, 3. Row 2: Column 1, 3; Column 2, 4; Column 3, 2; Column 4, 7; Column 5, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix057a
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix057a = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 2 matrix. Row 1: Column 1, 1; Column 2, 3. Row 2: Column 1, 4; Column 2, 2. Row 3: Column 1, 2; Column 2, 1. Row 4: Column 1, 0; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix058
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix058 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix059
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix059 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1 minus x; Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix060
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix060 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2 x; Column 2, 1. Row 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix061
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix061 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2 x; Column 2, y. Row 2: Column 1, one half; Column 2, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix062
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix062 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, one half; Column 2, two thirds. Row 2: Column 1, three fourths; Column 2, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix063
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix063 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><msub><mi>b</mi><mrow><mn>1</mn><mn>1</mn></mrow></msub></mrow></mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>1</mn><mn>2</mn></mrow></msub></mrow></mtd></mtr><mtr><mtd><mrow><msub><mi>b</mi><mrow><mn>2</mn><mn>1</mn></mrow></msub></mrow></mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>2</mn><mn>2</mn></mrow></msub></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, b sub 1 1; Column 2, b sub 1 2. Row 2: Column 1, b sub 2 1; Column 2, b sub 2 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix064
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix064 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 times the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5. times the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1; Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix065
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix065 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, one half; Column 2, two thirds. Row 2: Column 1, three fourths; Column 2, one fifth. times the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1 minus x; Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix066
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix066 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0. times the 4 by 2 matrix. Row 1: Column 1, 1; Column 2, 3. Row 2: Column 1, 4; Column 2, 2. Row 3: Column 1, 2; Column 2, 1. Row 4: Column 1, 0; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix067
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix067 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix068
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix068 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix069
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix069 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: Column 1, 2; Column 2, 4; Column 3, 1. Row 2: Column 1, 3; Column 2, 5; Column 3, 2. Row 3: Column 1, 1; Column 2, 4; Column 3, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix070
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix070 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: Column 1, 2; Column 2, 4; Column 3, 1. Row 2: Column 1, 3; Column 2, 5; Column 3, 2. Row 3: Column 1, 1; Column 2, 4; Column 3, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix071
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix071 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix072
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix072 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix073
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix073 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix074
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix074 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix075
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix075 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2 x; Column 2, 1. Row 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix076
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix076 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2 x; Column 2, 1. Row 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix077
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix077 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2 x; Column 2, y. Row 2: Column 1, one half; Column 2, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix078
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix078 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2 x; Column 2, y. Row 2: Column 1, one half; Column 2, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix079
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix079 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, one half; Column 2, two thirds. Row 2: Column 1, three fourths; Column 2, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix080
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix080 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, one half; Column 2, two thirds. Row 2: Column 1, three fourths; Column 2, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix081
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix081 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix082
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix082 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix083
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix083 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix084
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix084 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix085
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix085 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix086
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix086 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix087
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix087 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix088
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix088 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix089
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix089 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column matrix. x plus 1, x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix090
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix090 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. 3, 6, 1, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix091
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix091 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. x plus 1, 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix092
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix092 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. 3, 6, 1, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix092a
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix092a = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5, 2 Row 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix093
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix093 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: 0, 3, 4, 3 Row 2: 2, 1, 0, 9 Row 3: 3, 0, 2, 1 Row 4: 6, 2, 9, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix094
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix094 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 5 matrix. Row 1: 2, 1, 0, 5, 3 Row 2: 3, 4, 2, 7, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix095
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix095 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 2 matrix. Row 1: 1, 3 Row 2: 4, 2 Row 3: 2, 1 Row 4: 0, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix096
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix096 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix097
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix097 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1 minus x, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix098
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix098 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2 x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix099
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix099 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2 x, y Row 2: one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix100
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix100 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix101
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix101 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><msub><mi>b</mi><mrow><mn>1</mn><mn>1</mn></mrow></msub></mrow></mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>1</mn><mn>2</mn></mrow></msub></mrow></mtd></mtr><mtr><mtd><mrow><msub><mi>b</mi><mrow><mn>2</mn><mn>1</mn></mrow></msub></mrow></mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>2</mn><mn>2</mn></mrow></msub></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: b sub 1 1, b sub 1 2 Row 2: b sub 2 1, b sub 2 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix102
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix102 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 times the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. times the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix103
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix103 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth. times the 2 by 3 matrix. Row 1: 3, 1 minus x, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix104
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix104 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: 0, 3, 4, 3 Row 2: 2, 1, 0, 9 Row 3: 3, 0, 2, 1 Row 4: 6, 2, 9, 0. times the 4 by 2 matrix. Row 1: 1, 3 Row 2: 4, 2 Row 3: 2, 1 Row 4: 0, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix105
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix105 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix106
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix106 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix107
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix107 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5, 2 Row 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix108
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix108 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5, 2 Row 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix109
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix109 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: 0, 3, 4, 3 Row 2: 2, 1, 0, 9 Row 3: 3, 0, 2, 1 Row 4: 6, 2, 9, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix110
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix110 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: 0, 3, 4, 3 Row 2: 2, 1, 0, 9 Row 3: 3, 0, 2, 1 Row 4: 6, 2, 9, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix111
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix111 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix112
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix112 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix113
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix113 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix114
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix114 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix115
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix115 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, y Row 2: one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix116
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix116 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, y Row 2: one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix117
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix117 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix118
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix118 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix119
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix119 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix120
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix120 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix121
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix121 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix122
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix122 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix123
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix123 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix124
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix124 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix125
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix125 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix126
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix126 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix127
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix127 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column matrix. Row 1: x plus 1 Row 2: x minus 1. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix128
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix128 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. Row 1: 3 Row 2: 6 Row 3: 1 Row 4: 2. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix129
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix129 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. Column 1: x plus 1 Column 2: 2 x. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix130
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix130 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 3 Column 2: 6 Column 3: 1 Column 4: 2. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix131
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix131 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5, 2 Row 3: 1, 4, 7. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix132
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix132 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix133
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix133 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 5 matrix. Row 1: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 5; Column 5, 3. Row 2: Column 1, 3; Column 2, 4; Column 3, 2; Column 4, 7; Column 5, 0. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix134
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix134 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 2 matrix. Row 1: Column 1, 1; Column 2, 3. Row 2: Column 1, 4; Column 2, 2. Row 3: Column 1, 2; Column 2, 1. Row 4: Column 1, 0; Column 2, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix135
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix135 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix136
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix136 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1 minus x; Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix137
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix137 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2 x, 1 Row 2: 7, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix138
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix138 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2 x, y Row 2: one half, two thirds. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix139
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix139 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Rewrite certain indices from implicit multiplication to punctuation.
/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix140
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix140 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><msub><mi>b</mi><mrow><mn>1</mn><mn>1</mn></mrow></msub></mrow></mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>1</mn><mn>2</mn></mrow></msub></mrow></mtd></mtr><mtr><mtd><mrow><msub><mi>b</mi><mrow><mn>2</mn><mn>1</mn></mrow></msub></mrow></mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>2</mn><mn>2</mn></mrow></msub></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: b sub 1 1, b sub 1 2 Row 2: b sub 2 1, b sub 2 2. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix141
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix141 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 times the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. end matrix times the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix142
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix142 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth. end matrix times the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1 minus x; Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix143
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix143 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0. end matrix times the 4 by 2 matrix. Row 1: Column 1, 1; Column 2, 3. Row 2: Column 1, 4; Column 2, 2. Row 3: Column 1, 2; Column 2, 1. Row 4: Column 1, 0; Column 2, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix144
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix144 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. end determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix145
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix145 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix146
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix146 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5, 2 Row 3: 1, 4, 7. end determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix147
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix147 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5, 2 Row 3: 1, 4, 7. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix148
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix148 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0. end determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix149
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix149 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix150
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix150 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x. end determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix151
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix151 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix152
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix152 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, 1 Row 2: 7, 5. end determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix153
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix153 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, 1 Row 2: 7, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix154
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix154 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, y Row 2: one half, two thirds. end determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix155
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix155 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, y Row 2: one half, two thirds. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix156
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix156 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth. end determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix157
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix157 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix158
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix158 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column vector. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix159
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix159 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column vector. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix160
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix160 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix161
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix161 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix162
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix162 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column vector. Row 1: x plus 1 Row 2: x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix163
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix163 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column vector. Row 1: 3 Row 2: 6 Row 3: 1 Row 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix164
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix164 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. Column 1: x plus 1 Column 2: 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix165
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix165 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr><mtr><mtd><mn>9</mn></mtd><mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 2. times the 2 by 2 matrix. Row 1: 0, 5 Row 2: 9, 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix166
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix166 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>8</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 3 row vector. 1, 2, 7. times the 3 by 3 matrix. Row 1: 3, 5, 4 Row 2: 8, 0, 6 Row 3: 1, 4, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix167
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix167 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr><mtr><mtd><mn>9</mn></mtd><mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 0, 5 Row 2: 9, 4. times the 2 by 1 column vector. 3, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix168
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix168 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>8</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 3 matrix. Row 1: 3, 5, 4 Row 2: 8, 0, 6 Row 3: 1, 4, 2. times the 3 by 1 column vector. 1, 2, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix169
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix169 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column vector. 1, 2, 3. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix170
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix170 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column vector. 1, 2, 3. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix171
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix171 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 5. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix172
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix172 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 5. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix173
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix173 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column vector. Row 1: x plus 1 Row 2: x minus 1. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix174
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix174 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column vector. Row 1: 3 Row 2: 6 Row 3: 1 Row 4: 2. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix175
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix175 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. Column 1: x plus 1 Column 2: 2 x. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix176
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix176 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr><mtr><mtd><mn>9</mn></mtd><mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 2. end vector times the 2 by 2 matrix. Row 1: 0, 5 Row 2: 9, 4. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix177
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix177 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>8</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 3 row vector. 1, 2, 7. end vector times the 3 by 3 matrix. Row 1: 3, 5, 4 Row 2: 8, 0, 6 Row 3: 1, 4, 2. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix178
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix178 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr><mtr><mtd><mn>9</mn></mtd><mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 0, 5 Row 2: 9, 4. end matrix times the 2 by 1 column vector. 3, 2. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix179
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix179 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>8</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 3 matrix. Row 1: 3, 5, 4 Row 2: 8, 0, 6 Row 3: 1, 4, 2. end matrix times the 3 by 1 column vector. 1, 2, 7. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix180
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix180 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mi>n</mi></mtd></mtr><mtr><mtd><mi>r</mi></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'n choose r';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix181
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix181 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>10</mn></mrow></mtd></mtr><mtr><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '10 choose 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix182
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix182 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow><mn>15</mn></mrow></mtd></mtr><mtr><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '15 choose 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesVectorsAndCombinatorics Example Matrix183
 */
sre.ClearspeakMatricesVectorsAndCombinatorics.prototype.testMatrix183 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>8</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '8 choose 3';
  this.executeRuleTest(mathml, speech, preference);
};
