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


goog.provide('sre.ClearspeakEnglishMatricesAndCombinatorics');

goog.require('sre.ClearspeakEnglishRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakEnglishRuleTest}
*/
sre.ClearspeakEnglishMatricesAndCombinatorics = function() {
  sre.ClearspeakEnglishMatricesAndCombinatorics.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'ClearspeakEnglish Matrices, Vectors, and Combinatorics ' +
      'rule tests.';

};
goog.inherits(sre.ClearspeakEnglishMatricesAndCombinatorics, sre.ClearspeakEnglishRuleTest);



//
// ClearSpeak Rules and Preferences Examples: Matrices, Vectors, and
// Combinatorics
//


//
// Matrices, Vectors, and Combinatorics
//


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix001
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix001 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix002
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix002 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix003
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix003 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix004
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix004 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix005
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix005 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix006
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix006 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix007
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix007 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix008
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix008 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix008a
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix008a = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mrow><mo>(</mo><mn>3' +
      '</mn><mo>)</mo></mrow></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = 'the 1 by 1 matrix with entry 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix008b
 * (Added!)
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix008b = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mo>(</mo><mtable><mtr><mtd><mrow><mrow><mn>3' +
      '</mn></mrow></mrow></mtd></mtr></mtable><mo>)</mo></mrow></math>';
  var speech = 'the 1 by 1 matrix with entry 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix009
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix009 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column matrix. Row 1: x plus 1 Row 2: x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix010
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix010 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. Row 1: 3 Row 2: 6 Row 3: 1 Row 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix011
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix011 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the 1 by 2 row matrix. Column 1: x plus 1 Column 2: 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix012
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix012 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 3 Column 2: 6 Column 3: 1' +
      ' Column 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix013
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix013 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix014
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix014 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix015
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix015 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix016
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix016 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix017
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix017 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix018
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix018 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix019
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix019 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2 x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix019b = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix020
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix020 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix021
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix021 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix022
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix022 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix023
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix023 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix024
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix024 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix025
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix025 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix026
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix026 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix027
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix027 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix028
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix028 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix029
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix029 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix030
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix030 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix031
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix031 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix032
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix032 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix033
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix033 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix034
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix034 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix035
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix035 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix036
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix036 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix037
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix037 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix038
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix038 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix039
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix039 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix040
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix040 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix041
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix041 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix042
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix042 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix043
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix043 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. Row 1: 1 Row 2: 2 Row 3: 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix044
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix044 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. Row 1: 1 Row 2: 2 Row 3: 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix045
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix045 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. Column 1: 3 Column 2: 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix046
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix046 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. Column 1: 3 Column 2: 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix047
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix047 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 1 Column 2: 2 Column 3: 3' +
      ' Column 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix048
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix048 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 1 Column 2: 2 Column 3: 3' +
      ' Column 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix049
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix049 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. Row 1: 1 Row 2: 2 Row 3: 3 Row 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix050
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix050 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd></mtr></mtable></mrow>' +
      '<mo>]</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. Row 1: 1 Row 2: 2 Row 3: 3 Row 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix051
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix051 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column matrix. Row 1: x plus 1 Row 2: x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix052
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix052 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. Row 1: 3 Row 2: 6 Row 3: 1 Row 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix053
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix053 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the 1 by 2 row matrix. Column 1: x plus 1 Column 2: 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix054
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix054 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 3 Column 2: 6 Column 3: 1' +
      ' Column 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix055
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix055 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix056
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix056 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix057
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix057 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix057a
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix057a = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix058
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix058 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix059
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix059 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix060
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix060 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix061
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix061 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix062
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix062 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix063
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix063 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix064
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix064 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix065
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix065 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix066
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix066 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix067
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix067 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix068
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix068 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix069
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix069 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix070
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix070 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix071
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix071 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix072
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix072 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix073
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix073 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix074
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix074 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix075
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix075 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix076
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix076 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix077
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix077 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix078
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix078 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix079
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix079 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix080
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix080 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix081
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix081 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix082
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix082 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix083
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix083 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix084
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix084 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix085
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix085 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix086
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix086 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix087
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix087 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix088
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix088 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix089
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix089 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column matrix. x plus 1, x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix090
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix090 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column matrix. 3, 6, 1, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix091
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix091 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the 1 by 2 row matrix. x plus 1, 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix092
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix092 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. 3, 6, 1, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix092a
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix092a = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix093
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix093 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix094
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix094 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix095
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix095 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix096
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix096 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix097
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix097 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix098
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix098 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2 x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix099
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix099 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix100
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix100 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix101
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix101 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix102
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix102 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix103
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix103 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix104
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix104 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix105
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix105 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix106
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix106 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix107
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix107 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix108
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix108 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix109
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix109 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix110
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix110 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix111
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix111 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix112
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix112 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix113
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix113 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix114
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix114 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix115
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix115 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix116
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix116 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix117
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix117 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix118
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix118 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix119
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix119 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix120
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix120 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow>' +
      '</math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix121
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix121 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix122
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix122 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 2 by 3 matrix. Row 1: 3, 1, 4 Row 2: 0, 2, 6. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix123
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix123 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix124
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix124 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column matrix. 1, 2, 3. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix125
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix125 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix126
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix126 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row matrix. 3, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix127
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix127 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix128
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix128 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix129
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix129 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix130
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix130 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 1 by 4 row matrix. Column 1: 3 Column 2: 6 Column 3: 1' +
      ' Column 4: 2. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix131
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix131 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix132
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix132 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix133
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix133 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix134
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix134 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix135
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix135 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix136
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix136 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix137
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix137 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 2 x, 1 Row 2: 7, 5. end matrix';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix138
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix138 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix139
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix139 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix140
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix140 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix141
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix141 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix142
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix142 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix143
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix143 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix144
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix144 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix145
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix145 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix146
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix146 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix147
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix147 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix148
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix148 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix149
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix149 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix150
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix150 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix151
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix151 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix152
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix152 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix153
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix153 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix154
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix154 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix155
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix155 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix156
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix156 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix157
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix157 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix158
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix158 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column vector. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix159
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix159 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column vector. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix160
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix160 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix161
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix161 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix162
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix162 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 1 column vector. Row 1: x plus 1 Row 2: x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix163
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix163 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'the 4 by 1 column vector. Row 1: 3 Row 2: 6 Row 3: 1 Row 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix164
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix164 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the 1 by 2 row vector. Column 1: x plus 1 Column 2: 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix165
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix165 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix166
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix166 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix167
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix167 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix168
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix168 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix169
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix169 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column vector. 1, 2, 3. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix170
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix170 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'the 3 by 1 column vector. 1, 2, 3. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix171
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix171 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 5. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix172
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix172 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the 1 by 2 row vector. 3, 5. end vector';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix173
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix173 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix174
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix174 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix175
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix175 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix176
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix176 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix177
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix177 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix178
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix178 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix179
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix179 = function() {
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
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix180
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix180 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mi>n' +
      '</mi></mtd></mtr><mtr><mtd><mi>r</mi></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'n choose r';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix181
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix181 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>10</mn></mrow></mtd></mtr><mtr><mtd><mn>7</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '10 choose 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix182
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix182 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>15</mn></mrow></mtd></mtr><mtr><mtd><mn>0</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '15 choose 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishMatricesAndCombinatorics Example Matrix183
 */
sre.ClearspeakEnglishMatricesAndCombinatorics.prototype.testMatrix183 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>8' +
      '</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '8 choose 3';
  this.executeRuleTest(mathml, speech, preference);
};
