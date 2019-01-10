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


goog.provide('sre.ClearspeakFrenchMatricesAndCombinatorics');

goog.require('sre.ClearspeakFrenchRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakFrenchRuleTest}
*/
sre.ClearspeakFrenchMatricesAndCombinatorics = function() {
  sre.ClearspeakFrenchMatricesAndCombinatorics.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'ClearspeakFrench Matrices, Vectors, and Combinatorics ' +
      'rule tests.';

};
goog.inherits(sre.ClearspeakFrenchMatricesAndCombinatorics, sre.ClearspeakFrenchRuleTest);



//
// ClearSpeak Rules and Preferences Examples: Matrices, Vectors, and
// Combinatorics
//


//
// Matrices, Vectors, and Combinatorics
//


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix001
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix001 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix002
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix002 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix003
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix003 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix004
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix004 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix005
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix005 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix006
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix006 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix007
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix007 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix008
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix008 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix008a
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix008a = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mrow><mo>(</mo><mn>3' +
      '</mn><mo>)</mo></mrow></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = 'the 1 by 1 matrix with entry 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix008b
 * (Added!)
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix008b = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mo>(</mo><mtable><mtr><mtd><mrow><mrow><mn>3' +
      '</mn></mrow></mrow></mtd></mtr></mtable><mo>)</mo></mrow></math>';
  var speech = 'the 1 by 1 matrix with entry 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix009
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix009 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column matrix. Row 1: x plus 1 Row 2: x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix010
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix010 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. Row 1: 3 Row 2: 6 Row 3: 1 Row 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix011
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix011 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the 1 by 2 row matrix. Column 1: x plus 1 Column 2: 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix012
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix012 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 3 Column 2: 6 Column 3: 1' +
      ' Column 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix013
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix013 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5, 2 Row 3: 1,' +
      ' 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix014
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix014 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column' +
      ' 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0;' +
      ' Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column' +
      ' 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix015
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix015 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>5</mn>' +
      '</mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd>' +
      '<mn>4</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>0' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 5 matrix. Row 1: Column 1, 2; Column 2, 1; Column' +
      ' 3, 0; Column 4, 5; Column 5, 3. Row 2: Column 1, 3; Column 2, 4;' +
      ' Column 3, 2; Column 4, 7; Column 5, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix016
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix016 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 2 matrix. Row 1: Column 1, 1; Column 2, 3. Row 2:' +
      ' Column 1, 4; Column 2, 2. Row 3: Column 1, 2; Column 2, 1. Row 4:' +
      ' Column 1, 0; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix017
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix017 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2:' +
      ' Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix018
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix018 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd>' +
      '<mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1 minus x;' +
      ' Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix019
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix019 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2 x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix019b = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2 x, y Row 2: one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix020
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix020 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three' +
      ' fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix021
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix021 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<msub><mi>b</mi><mrow><mn>1</mn><mn>1</mn></mrow></msub></mrow>' +
      '</mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>1</mn><mn>2</mn></mrow>' +
      '</msub></mrow></mtd></mtr><mtr><mtd><mrow><msub><mi>b</mi><mrow>' +
      '<mn>2</mn><mn>1</mn></mrow></msub></mrow></mtd><mtd><mrow><msub>' +
      '<mi>b</mi><mrow><mn>2</mn><mn>2</mn></mrow></msub></mrow></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: b sub 1 1, b sub 1 2 Row 2: b sub' +
      ' 2 1, b sub 2 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix022
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix022 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1' +
      '</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  // var speech = '3 times the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. times the
  // 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1; Column 3, 4. Row 2: Column
  // 1, 0; Column 2, 2; Column 3, 6';
  var speech = '3 times the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. times' +
      ' the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix023
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix023 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd>' +
      '<mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4' +
      '</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd>' +
      '<mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three' +
      ' fourths, one fifth. times the 2 by 3 matrix. Row 1: Column 1, 3;' +
      ' Column 2, 1 minus x; Column 3, 4. Row 2: Column 1, 0; Column 2, 2;' +
      ' Column 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix024
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix024 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd>' +
      '<mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd>' +
      '<mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn>' +
      '</mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column' +
      ' 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0;' +
      ' Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column' +
      ' 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0.' +
      ' times the 4 by 2 matrix. Row 1: Column 1, 1; Column 2, 3. Row 2:' +
      ' Column 1, 4; Column 2, 2. Row 3: Column 1, 2; Column 2, 1. Row 4:' +
      ' Column 1, 0; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix025
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix025 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix026
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix026 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix027
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix027 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2:' +
      ' 3, 5, 2 Row 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix028
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix028 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd>' +
      '</mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2:' +
      ' 3, 5, 2 Row 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix029
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix029 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0;' +
      ' Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column' +
      ' 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0;' +
      ' Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column' +
      ' 3, 9; Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix030
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix030 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd>' +
      '<mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0;' +
      ' Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column' +
      ' 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0;' +
      ' Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column' +
      ' 3, 9; Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix031
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix031 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2;' +
      ' Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix032
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix032 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2;' +
      ' Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix033
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix033 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>' +
      '|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, 1 Row 2:' +
      ' 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix034
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix034 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd>' +
      '</mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, 1 Row 2:' +
      ' 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix035
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix035 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, y Row 2:' +
      ' one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix036
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix036 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd>' +
      '</mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>' +
      '</mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, y Row 2:' +
      ' one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix037
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix037 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two' +
      ' thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix038
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix038 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two' +
      ' thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix039
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix039 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2:' +
      ' Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix040
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix040 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2:' +
      ' Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix041
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix041 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1; Column' +
      ' 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix042
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix042 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1; Column' +
      ' 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix043
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix043 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. Row 1: 1 Row 2: 2 Row 3: 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix044
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix044 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. Row 1: 1 Row 2: 2 Row 3: 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix045
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix045 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. Column 1: 3 Column 2: 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix046
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix046 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. Column 1: 3 Column 2: 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix047
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix047 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 1 Column 2: 2 Column 3: 3' +
      ' Column 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix048
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix048 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 1 Column 2: 2 Column 3: 3' +
      ' Column 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix049
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix049 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. Row 1: 1 Row 2: 2 Row 3: 3 Row 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix050
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix050 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd></mtr></mtable></mrow>' +
      '<mo>]</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. Row 1: 1 Row 2: 2 Row 3: 3 Row 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix051
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix051 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column matrix. Row 1: x plus 1 Row 2: x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix052
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix052 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. Row 1: 3 Row 2: 6 Row 3: 1 Row 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix053
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix053 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the 1 by 2 row matrix. Column 1: x plus 1 Column 2: 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix054
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix054 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 3 Column 2: 6 Column 3: 1' +
      ' Column 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix055
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix055 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 3 matrix. Row 1: Column 1, 2; Column 2, 4; Column' +
      ' 3, 1. Row 2: Column 1, 3; Column 2, 5; Column 3, 2. Row 3: Column' +
      ' 1, 1; Column 2, 4; Column 3, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix056
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix056 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column' +
      ' 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0;' +
      ' Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column' +
      ' 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix057
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix057 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>5</mn>' +
      '</mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd>' +
      '<mn>4</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>0' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 5 matrix. Row 1: Column 1, 2; Column 2, 1; Column' +
      ' 3, 0; Column 4, 5; Column 5, 3. Row 2: Column 1, 3; Column 2, 4;' +
      ' Column 3, 2; Column 4, 7; Column 5, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix057a
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix057a = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 2 matrix. Row 1: Column 1, 1; Column 2, 3. Row 2:' +
      ' Column 1, 4; Column 2, 2. Row 3: Column 1, 2; Column 2, 1. Row 4:' +
      ' Column 1, 0; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix058
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix058 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2:' +
      ' Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix059
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix059 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd>' +
      '<mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1 minus x;' +
      ' Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix060
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix060 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2 x; Column 2, 1. Row' +
      ' 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix061
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix061 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2 x; Column 2, y. Row' +
      ' 2: Column 1, one half; Column 2, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix062
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix062 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, one half; Column 2, two' +
      ' thirds. Row 2: Column 1, three fourths; Column 2, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix063
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix063 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<msub><mi>b</mi><mrow><mn>1</mn><mn>1</mn></mrow></msub></mrow>' +
      '</mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>1</mn><mn>2</mn></mrow>' +
      '</msub></mrow></mtd></mtr><mtr><mtd><mrow><msub><mi>b</mi><mrow>' +
      '<mn>2</mn><mn>1</mn></mrow></msub></mrow></mtd><mtd><mrow><msub>' +
      '<mi>b</mi><mrow><mn>2</mn><mn>2</mn></mrow></msub></mrow></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, b sub 1 1; Column 2, b' +
      ' sub 1 2. Row 2: Column 1, b sub 2 1; Column 2, b sub 2 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix064
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix064 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1' +
      '</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '3 times the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1.' +
      ' Row 2: Column 1, 7; Column 2, 5. times the 2 by 3 matrix. Row 1:' +
      ' Column 1, 3; Column 2, 1; Column 3, 4. Row 2: Column 1, 0; Column' +
      ' 2, 2; Column 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix065
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix065 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd>' +
      '<mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4' +
      '</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd>' +
      '<mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, one half; Column 2, two' +
      ' thirds. Row 2: Column 1, three fourths; Column 2, one fifth. times' +
      ' the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1 minus x; Column' +
      ' 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix066
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix066 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd>' +
      '<mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd>' +
      '<mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn>' +
      '</mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column' +
      ' 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0;' +
      ' Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column' +
      ' 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0.' +
      ' times the 4 by 2 matrix. Row 1: Column 1, 1; Column 2, 3. Row 2:' +
      ' Column 1, 4; Column 2, 2. Row 3: Column 1, 2; Column 2, 1. Row 4:' +
      ' Column 1, 0; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix067
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix067 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2;' +
      ' Column 2, 1. Row 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix068
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix068 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2;' +
      ' Column 2, 1. Row 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix069
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix069 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: Column 1, 2;' +
      ' Column 2, 4; Column 3, 1. Row 2: Column 1, 3; Column 2, 5; Column' +
      ' 3, 2. Row 3: Column 1, 1; Column 2, 4; Column 3, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix070
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix070 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd>' +
      '</mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: Column 1, 2;' +
      ' Column 2, 4; Column 3, 1. Row 2: Column 1, 3; Column 2, 5; Column' +
      ' 3, 2. Row 3: Column 1, 1; Column 2, 4; Column 3, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix071
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix071 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0;' +
      ' Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column' +
      ' 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0;' +
      ' Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column' +
      ' 3, 9; Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix072
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix072 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd>' +
      '<mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0;' +
      ' Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column' +
      ' 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0;' +
      ' Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column' +
      ' 3, 9; Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix073
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix073 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2;' +
      ' Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix074
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix074 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2;' +
      ' Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix075
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix075 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>' +
      '|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2 x;' +
      ' Column 2, 1. Row 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix076
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix076 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd>' +
      '</mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2 x;' +
      ' Column 2, 1. Row 2: Column 1, 7; Column 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix077
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix077 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2 x;' +
      ' Column 2, y. Row 2: Column 1, one half; Column 2, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix078
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix078 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd>' +
      '</mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>' +
      '</mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2 x;' +
      ' Column 2, y. Row 2: Column 1, one half; Column 2, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix079
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix079 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, one' +
      ' half; Column 2, two thirds. Row 2: Column 1, three fourths; Column' +
      ' 2, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix080
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix080 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, one' +
      ' half; Column 2, two thirds. Row 2: Column 1, three fourths; Column' +
      ' 2, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix081
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix081 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix082
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix082 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix083
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix083 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix084
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix084 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix085
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix085 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix086
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix086 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix087
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix087 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix088
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix088 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix089
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix089 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column matrix. x plus 1, x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix090
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix090 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. 3, 6, 1, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix091
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix091 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the 1 by 2 row matrix. x plus 1, 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix092
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix092 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. 3, 6, 1, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix092a
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix092a = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5, 2 Row 3: 1,' +
      ' 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix093
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix093 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: 0, 3, 4, 3 Row 2: 2, 1, 0, 9 Row' +
      ' 3: 3, 0, 2, 1 Row 4: 6, 2, 9, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix094
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix094 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>5</mn>' +
      '</mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd>' +
      '<mn>4</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>0' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 5 matrix. Row 1: 2, 1, 0, 5, 3 Row 2: 3, 4, 2, 7, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix095
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix095 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 2 matrix. Row 1: 1, 3 Row 2: 4, 2 Row 3: 2, 1 Row' +
      ' 4: 0, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix096
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix096 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix097
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix097 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd>' +
      '<mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1 minus x, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix098
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix098 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2 x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix099
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix099 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2 x, y Row 2: one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix100
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix100 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three' +
      ' fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix101
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix101 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<msub><mi>b</mi><mrow><mn>1</mn><mn>1</mn></mrow></msub></mrow>' +
      '</mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>1</mn><mn>2</mn></mrow>' +
      '</msub></mrow></mtd></mtr><mtr><mtd><mrow><msub><mi>b</mi><mrow>' +
      '<mn>2</mn><mn>1</mn></mrow></msub></mrow></mtd><mtd><mrow><msub>' +
      '<mi>b</mi><mrow><mn>2</mn><mn>2</mn></mrow></msub></mrow></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: b sub 1 1, b sub 1 2 Row 2: b sub' +
      ' 2 1, b sub 2 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix102
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix102 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1' +
      '</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '3 times the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. times' +
      ' the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix103
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix103 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd>' +
      '<mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4' +
      '</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd>' +
      '<mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three' +
      ' fourths, one fifth. times the 2 by 3 matrix. Row 1: 3, 1 minus x, 4' +
      ' Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix104
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix104 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd>' +
      '<mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd>' +
      '<mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn>' +
      '</mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: 0, 3, 4, 3 Row 2: 2, 1, 0, 9 Row' +
      ' 3: 3, 0, 2, 1 Row 4: 6, 2, 9, 0. times the 4 by 2 matrix. Row 1: 1,' +
      ' 3 Row 2: 4, 2 Row 3: 2, 1 Row 4: 0, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix105
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix105 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix106
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix106 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix107
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix107 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2:' +
      ' 3, 5, 2 Row 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix108
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix108 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd>' +
      '</mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2:' +
      ' 3, 5, 2 Row 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix109
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix109 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: 0, 3, 4, 3 Row' +
      ' 2: 2, 1, 0, 9 Row 3: 3, 0, 2, 1 Row 4: 6, 2, 9, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix110
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix110 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd>' +
      '<mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: 0, 3, 4, 3 Row' +
      ' 2: 2, 1, 0, 9 Row 3: 3, 0, 2, 1 Row 4: 6, 2, 9, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix111
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix111 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7,' +
      ' 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix112
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix112 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7,' +
      ' 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix113
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix113 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>' +
      '|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, 1 Row 2:' +
      ' 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix114
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix114 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd>' +
      '</mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, 1 Row 2:' +
      ' 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix115
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix115 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, y Row 2:' +
      ' one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix116
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix116 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd>' +
      '</mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>' +
      '</mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, y Row 2:' +
      ' one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix117
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix117 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two' +
      ' thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix118
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix118 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two' +
      ' thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix119
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix119 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix120
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix120 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix121
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix121 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix122
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix122 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix123
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix123 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix124
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix124 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix125
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix125 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix126
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix126 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix127
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix127 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column matrix. Row 1: x plus 1 Row 2: x minus 1.' +
      ' end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix128
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix128 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. Row 1: 3 Row 2: 6 Row 3: 1 Row 4:' +
      ' 2. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix129
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix129 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the 1 by 2 row matrix. Column 1: x plus 1 Column 2: 2 x.' +
      ' end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix130
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix130 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 3 Column 2: 6 Column 3: 1' +
      ' Column 4: 2. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix131
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix131 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5, 2 Row 3: 1,' +
      ' 4, 7. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix132
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix132 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column' +
      ' 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0;' +
      ' Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column' +
      ' 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0.' +
      ' end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix133
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix133 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>5</mn>' +
      '</mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd>' +
      '<mn>4</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>0' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 5 matrix. Row 1: Column 1, 2; Column 2, 1; Column' +
      ' 3, 0; Column 4, 5; Column 5, 3. Row 2: Column 1, 3; Column 2, 4;' +
      ' Column 3, 2; Column 4, 7; Column 5, 0. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix134
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix134 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 2 matrix. Row 1: Column 1, 1; Column 2, 3. Row 2:' +
      ' Column 1, 4; Column 2, 2. Row 3: Column 1, 2; Column 2, 1. Row 4:' +
      ' Column 1, 0; Column 2, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix135
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix135 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2:' +
      ' Column 1, 7; Column 2, 5 plus x. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix136
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix136 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd>' +
      '<mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: Column 1, 3; Column 2, 1 minus x;' +
      ' Column 3, 4. Row 2: Column 1, 0; Column 2, 2; Column 3, 6. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix137
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix137 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2 x, 1 Row 2: 7, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix138
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix138 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2 x, y Row 2: one half, two' +
      ' thirds. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix139
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix139 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three' +
      ' fourths, one fifth. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Rewrite certain indices from implicit multiplication to
// punctuation.
/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix140
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix140 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<msub><mi>b</mi><mrow><mn>1</mn><mn>1</mn></mrow></msub></mrow>' +
      '</mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>1</mn><mn>2</mn></mrow>' +
      '</msub></mrow></mtd></mtr><mtr><mtd><mrow><msub><mi>b</mi><mrow>' +
      '<mn>2</mn><mn>1</mn></mrow></msub></mrow></mtd><mtd><mrow><msub>' +
      '<mi>b</mi><mrow><mn>2</mn><mn>2</mn></mrow></msub></mrow></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: b sub 1 1, b sub 1 2 Row 2: b sub' +
      ' 2 1, b sub 2 2. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix141
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix141 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1' +
      '</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '3 times the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. end' +
      ' matrix times the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6. end' +
      ' matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix142
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix142 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd>' +
      '<mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd><mtd><mn>4' +
      '</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd>' +
      '<mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three' +
      ' fourths, one fifth. end matrix times the 2 by 3 matrix. Row 1:' +
      ' Column 1, 3; Column 2, 1 minus x; Column 3, 4. Row 2: Column 1, 0;' +
      ' Column 2, 2; Column 3, 6. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix143
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix143 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd>' +
      '<mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow><mo></mo><mrow><mo>(</mo><mrow><mtable><mtr><mtd>' +
      '<mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn>' +
      '</mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>1</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column' +
      ' 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0;' +
      ' Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column' +
      ' 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0.' +
      ' end matrix times the 4 by 2 matrix. Row 1: Column 1, 1; Column 2,' +
      ' 3. Row 2: Column 1, 4; Column 2, 2. Row 3: Column 1, 2; Column 2,' +
      ' 1. Row 4: Column 1, 0; Column 2, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix144
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix144 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7,' +
      ' 5. end determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix145
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix145 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7,' +
      ' 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix146
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix146 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2:' +
      ' 3, 5, 2 Row 3: 1, 4, 7. end determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix147
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix147 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd>' +
      '</mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2:' +
      ' 3, 5, 2 Row 3: 1, 4, 7. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix148
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix148 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0;' +
      ' Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column' +
      ' 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0;' +
      ' Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column' +
      ' 3, 9; Column 4, 0. end determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix149
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix149 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd>' +
      '<mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0;' +
      ' Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column' +
      ' 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0;' +
      ' Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column' +
      ' 3, 9; Column 4, 0. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix150
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix150 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2;' +
      ' Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x. end determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix151
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix151 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2;' +
      ' Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix152
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix152 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>' +
      '|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, 1 Row 2:' +
      ' 7, 5. end determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix153
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix153 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd>' +
      '</mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, 1 Row 2:' +
      ' 7, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix154
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix154 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, y Row 2:' +
      ' one half, two thirds. end determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix155
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix155 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd>' +
      '</mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>' +
      '</mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, y Row 2:' +
      ' one half, two thirds. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix156
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix156 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two' +
      ' thirds Row 2: three fourths, one fifth. end determinant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix157
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix157 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two' +
      ' thirds Row 2: three fourths, one fifth. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix158
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix158 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column vector. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix159
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix159 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column vector. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix160
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix160 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix161
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix161 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix162
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix162 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column vector. Row 1: x plus 1 Row 2: x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix163
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix163 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column vector. Row 1: 3 Row 2: 6 Row 3: 1 Row 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix164
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix164 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the 1 by 2 row vector. Column 1: x plus 1 Column 2: 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix165
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix165 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd>' +
      '<mn>5</mn></mtd></mtr><mtr><mtd><mn>9</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 2. times the 2 by 2 matrix. Row' +
      ' 1: 0, 5 Row 2: 9, 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix166
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix166 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable>' +
      '</mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>4</mn></mtd></mtr>' +
      '<mtr><mtd><mn>8</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 3 row vector. 1, 2, 7. times the 3 by 3 matrix.' +
      ' Row 1: 3, 5, 4 Row 2: 8, 0, 6 Row 3: 1, 4, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix167
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix167 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr><mtr><mtd><mn>9</mn></mtd>' +
      '<mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow>' +
      '<mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd>' +
      '<mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 0, 5 Row 2: 9, 4. times the 2 by' +
      ' 1 column vector. 3, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix168
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix168 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>8</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow>' +
      '<mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 3 by 3 matrix. Row 1: 3, 5, 4 Row 2: 8, 0, 6 Row 3: 1,' +
      ' 4, 2. times the 3 by 1 column vector. 1, 2, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix169
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix169 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column vector. 1, 2, 3. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix170
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix170 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column vector. 1, 2, 3. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix171
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix171 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 5. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix172
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix172 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 5. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix173
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix173 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column vector. Row 1: x plus 1 Row 2: x minus 1.' +
      ' end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix174
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix174 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column vector. Row 1: 3 Row 2: 6 Row 3: 1 Row 4:' +
      ' 2. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix175
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix175 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the 1 by 2 row vector. Column 1: x plus 1 Column 2: 2 x.' +
      ' end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix176
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix176 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd>' +
      '<mn>5</mn></mtd></mtr><mtr><mtd><mn>9</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 2. end vector times the 2 by 2' +
      ' matrix. Row 1: 0, 5 Row 2: 9, 4. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix177
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix177 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable>' +
      '</mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>4</mn></mtd></mtr>' +
      '<mtr><mtd><mn>8</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 3 row vector. 1, 2, 7. end vector times the 3 by 3' +
      ' matrix. Row 1: 3, 5, 4 Row 2: 8, 0, 6 Row 3: 1, 4, 2. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix178
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix178 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr><mtr><mtd><mn>9</mn></mtd>' +
      '<mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow>' +
      '<mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd>' +
      '<mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 0, 5 Row 2: 9, 4. end matrix' +
      ' times the 2 by 1 column vector. 3, 2. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix179
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix179 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>8</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow>' +
      '<mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 3 by 3 matrix. Row 1: 3, 5, 4 Row 2: 8, 0, 6 Row 3: 1,' +
      ' 4, 2. end matrix times the 3 by 1 column vector. 1, 2, 7. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix180
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix180 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mi>n' +
      '</mi></mtd></mtr><mtr><mtd><mi>r</mi></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'n choose r';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix181
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix181 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>10</mn></mrow></mtd></mtr><mtr><mtd><mn>7</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '10 choose 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix182
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix182 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>15</mn></mrow></mtd></mtr><mtr><mtd><mn>0</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '15 choose 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchMatricesAndCombinatorics Example Matrix183
 */
sre.ClearspeakFrenchMatricesAndCombinatorics.prototype.testMatrix183 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>8' +
      '</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '8 choose 3';
  this.executeRuleTest(mathml, speech, preference);
};
