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


goog.provide('sre.ClearspeakMatricesAndCombinatorics');

goog.require('sre.ClearspeakRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakRuleTest}
*/
sre.ClearspeakMatricesAndCombinatorics = function() {
  sre.ClearspeakMatricesAndCombinatorics.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Clearspeak Matrices, Vectors, and Combinatorics ' +
      'rule tests.';

};
goog.inherits(sre.ClearspeakMatricesAndCombinatorics, sre.ClearspeakRuleTest);



//
// ClearSpeak Rules and Preferences Examples: Matrices, Vectors, and
// Combinatorics
//


//
// Matrices, Vectors, and Combinatorics
//


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix001
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix001 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix002
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix002 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix003
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix003 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix004
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix004 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix005
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix005 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix006
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix006 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix007
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix007 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix008
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix008 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix008a
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix008a = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mrow><mo>(</mo><mn>3' +
      '</mn><mo>)</mo></mrow></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = 'the 1 by 1 matrix with entry 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix008b
 * (Added!)
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix008b = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mo>(</mo><mtable><mtr><mtd><mrow><mrow><mn>3' +
      '</mn></mrow></mrow></mtd></mtr></mtable><mo>)</mo></mrow></math>';
  var speech = 'the 1 by 1 matrix with entry 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix009
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix009 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column matrix. Row 1: x plus 1 Row 2: x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix010
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix010 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. Row 1: 3 Row 2: 6 Row 3: 1 Row 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix011
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix011 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the 1 by 2 row matrix. Column 1: x plus 1 Column 2: 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix012
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix012 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 3 Column 2: 6 Column 3: 1' +
      ' Column 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix013
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix013 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix014
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix014 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix015
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix015 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix016
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix016 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix017
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix017 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix018
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix018 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix019
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix019 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2 x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix019b = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix020
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix020 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix021
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix021 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix022
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix022 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix023
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix023 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix024
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix024 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix025
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix025 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix026
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix026 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix027
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix027 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix028
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix028 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix029
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix029 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix030
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix030 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix031
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix031 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix032
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix032 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix033
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix033 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix034
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix034 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix035
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix035 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix036
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix036 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix037
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix037 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix038
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix038 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix039
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix039 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix040
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix040 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix041
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix041 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix042
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix042 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix043
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix043 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. Row 1: 1 Row 2: 2 Row 3: 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix044
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix044 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. Row 1: 1 Row 2: 2 Row 3: 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix045
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix045 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. Column 1: 3 Column 2: 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix046
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix046 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. Column 1: 3 Column 2: 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix047
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix047 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 1 Column 2: 2 Column 3: 3' +
      ' Column 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix048
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix048 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 1 Column 2: 2 Column 3: 3' +
      ' Column 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix049
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix049 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. Row 1: 1 Row 2: 2 Row 3: 3 Row 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix050
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix050 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd></mtr></mtable></mrow>' +
      '<mo>]</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. Row 1: 1 Row 2: 2 Row 3: 3 Row 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix051
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix051 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column matrix. Row 1: x plus 1 Row 2: x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix052
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix052 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. Row 1: 3 Row 2: 6 Row 3: 1 Row 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix053
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix053 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the 1 by 2 row matrix. Column 1: x plus 1 Column 2: 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix054
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix054 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 3 Column 2: 6 Column 3: 1' +
      ' Column 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix055
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix055 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix056
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix056 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix057
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix057 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix057a
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix057a = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix058
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix058 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix059
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix059 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix060
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix060 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix061
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix061 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix062
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix062 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix063
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix063 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix064
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix064 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix065
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix065 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix066
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix066 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix067
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix067 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix068
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix068 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix069
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix069 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix070
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix070 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix071
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix071 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix072
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix072 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix073
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix073 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix074
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix074 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix075
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix075 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix076
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix076 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix077
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix077 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix078
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix078 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix079
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix079 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix080
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix080 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix081
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix081 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix082
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix082 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix083
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix083 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix084
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix084 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix085
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix085 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix086
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix086 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix087
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix087 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix088
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix088 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix089
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix089 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column matrix. x plus 1, x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix090
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix090 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. 3, 6, 1, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix091
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix091 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the 1 by 2 row matrix. x plus 1, 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix092
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix092 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. 3, 6, 1, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix092a
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix092a = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix093
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix093 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix094
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix094 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix095
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix095 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix096
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix096 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix097
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix097 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix098
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix098 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2 x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix099
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix099 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix100
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix100 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix101
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix101 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix102
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix102 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix103
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix103 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix104
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix104 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix105
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix105 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix106
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix106 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix107
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix107 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix108
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix108 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix109
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix109 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix110
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix110 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix111
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix111 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix112
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix112 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix113
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix113 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix114
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix114 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix115
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix115 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix116
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix116 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix117
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix117 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix118
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix118 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix119
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix119 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix120
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix120 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix121
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix121 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix122
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix122 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix123
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix123 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix124
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix124 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix125
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix125 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix126
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix126 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix127
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix127 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix128
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix128 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix129
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix129 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix130
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix130 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 3 Column 2: 6 Column 3: 1' +
      ' Column 4: 2. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix131
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix131 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix132
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix132 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix133
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix133 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix134
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix134 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix135
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix135 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix136
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix136 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix137
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix137 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2 x, 1 Row 2: 7, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix138
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix138 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix139
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix139 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix140
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix140 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix141
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix141 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix142
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix142 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix143
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix143 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix144
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix144 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix145
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix145 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix146
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix146 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix147
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix147 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix148
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix148 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix149
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix149 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix150
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix150 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix151
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix151 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix152
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix152 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix153
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix153 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix154
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix154 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix155
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix155 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix156
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix156 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix157
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix157 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix158
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix158 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column vector. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix159
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix159 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column vector. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix160
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix160 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix161
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix161 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix162
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix162 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column vector. Row 1: x plus 1 Row 2: x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix163
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix163 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column vector. Row 1: 3 Row 2: 6 Row 3: 1 Row 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix164
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix164 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the 1 by 2 row vector. Column 1: x plus 1 Column 2: 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix165
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix165 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix166
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix166 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix167
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix167 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix168
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix168 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix169
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix169 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column vector. 1, 2, 3. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix170
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix170 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column vector. 1, 2, 3. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix171
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix171 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 5. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix172
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix172 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 5. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix173
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix173 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix174
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix174 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix175
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix175 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix176
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix176 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix177
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix177 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix178
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix178 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix179
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix179 = function() {
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
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix180
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix180 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mi>n' +
      '</mi></mtd></mtr><mtr><mtd><mi>r</mi></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'n choose r';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix181
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix181 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>10</mn></mrow></mtd></mtr><mtr><mtd><mn>7</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '10 choose 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix182
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix182 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>15</mn></mrow></mtd></mtr><mtr><mtd><mn>0</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '15 choose 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakMatricesAndCombinatorics Example Matrix183
 */
sre.ClearspeakMatricesAndCombinatorics.prototype.testMatrix183 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>8' +
      '</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '8 choose 3';
  this.executeRuleTest(mathml, speech, preference);
};
