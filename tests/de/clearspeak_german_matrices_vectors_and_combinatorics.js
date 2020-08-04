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


goog.provide('sre.ClearspeakGermanMatricesAndCombinatorics');

goog.require('sre.ClearspeakGermanRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakGermanRuleTest}
*/
sre.ClearspeakGermanMatricesAndCombinatorics = function() {
  sre.ClearspeakGermanMatricesAndCombinatorics.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'ClearspeakGerman Matrices, Vectors, and Combinatorics ' +
      'rule tests.';

};
goog.inherits(sre.ClearspeakGermanMatricesAndCombinatorics, sre.ClearspeakGermanRuleTest);



//
// ClearSpeak Rules and Preferences Examples: Matrices, Vectors, and
// Combinatorics
//


//
// Matrices, Vectors, and Combinatorics
//


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix001
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix001 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix002
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix002 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow>' +
      '</math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix003
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix003 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 3 Matrize. Zeile 1: 3, 1, 4 Zeile 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix004
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix004 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 3 Matrize. Zeile 1: 3, 1, 4 Zeile 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix005
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix005 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 3 mal 1 Spaltenmatrize. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix006
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix006 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'die 3 mal 1 Spaltenmatrize. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix007
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix007 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'die 1 mal 2 Zeilenmatrize. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix008
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix008 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'die 1 mal 2 Zeilenmatrize. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix008a
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix008a = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mtable><mtr><mtd><mrow><mrow><mo>(</mo><mn>3' +
      '</mn><mo>)</mo></mrow></mrow></mtd></mtr></mtable></mrow></math>';
  var speech = 'die 1 mal 1 Matrize mit Element 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix008b
 * (Added!)
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix008b = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mo>(</mo><mtable><mtr><mtd><mrow><mrow><mn>3' +
      '</mn></mrow></mrow></mtd></mtr></mtable><mo>)</mo></mrow></math>';
  var speech = 'die 1 mal 1 Matrize mit Element 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix009
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix009 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 1 Spaltenmatrize. Zeile 1: x plus 1 Zeile 2: x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix010
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix010 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'die 4 mal 1 Spaltenmatrize. Zeile 1: 3 Zeile 2: 6 Zeile 3: 1 Zeile 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix011
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix011 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'die 1 mal 2 Zeilenmatrize. Spalte 1: x plus 1 Spalte 2: 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix012
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix012 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 1 mal 4 Zeilenmatrize. Spalte 1: 3 Spalte 2: 6 Spalte 3: 1 Spalte 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix013
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix013 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 3 mal 3 Matrize. Zeile 1: 2, 4, 1 Zeile 2: 3, 5, 2 Zeile 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix014
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix014 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'die 4 mal 4 Matrize. Zeile 1: Spalte 1, 0; Spalte 2, 3; Spalte 3, 4; Spalte 4, 3. Zeile 2: Spalte 1, 2; Spalte 2, 1; Spalte 3, 0; Spalte 4, 9. Zeile 3: Spalte 1, 3; Spalte 2, 0; Spalte 3, 2; Spalte 4, 1. Zeile 4: Spalte 1, 6; Spalte 2, 2; Spalte 3, 9; Spalte 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix015
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix015 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>5</mn>' +
      '</mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd>' +
      '<mn>4</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>0' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 5 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1; Spalte 3, 0; Spalte 4, 5; Spalte 5, 3. Zeile 2: Spalte 1, 3; Spalte 2, 4; Spalte 3, 2; Spalte 4, 7; Spalte 5, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix016
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix016 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 4 mal 2 Matrize. Zeile 1: Spalte 1, 1; Spalte 2, 3. Zeile 2: Spalte 1, 4; Spalte 2, 2. Zeile 3: Spalte 1, 2; Spalte 2, 1. Zeile 4: Spalte 1, 0; Spalte 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix017
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix017 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix018
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix018 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd>' +
      '<mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'die 2 mal 3 Matrize. Zeile 1: Spalte 1, 3; Spalte 2, 1 minus x; Spalte 3, 4. Zeile 2: Spalte 1, 0; Spalte 2, 2; Spalte 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix019
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix019 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 2 x, 1 Zeile 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix019b = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 2 x, y Zeile 2: ein halb, zwei drittel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix020
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix020 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: ein halb, zwei drittel Zeile 2: drei viertel, ein fünftel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix021
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix021 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<msub><mi>b</mi><mrow><mn>1</mn><mn>1</mn></mrow></msub></mrow>' +
      '</mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>1</mn><mn>2</mn></mrow>' +
      '</msub></mrow></mtd></mtr><mtr><mtd><mrow><msub><mi>b</mi><mrow>' +
      '<mn>2</mn><mn>1</mn></mrow></msub></mrow></mtd><mtd><mrow><msub>' +
      '<mi>b</mi><mrow><mn>2</mn><mn>2</mn></mrow></msub></mrow></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: b Index 1 1, b Index 1 2 Zeile 2: b Index 2 1, b Index 2 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix022
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix022 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1' +
      '</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '3   die 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5.   die 2 mal 3 Matrize. Zeile 1: 3, 1, 4 Zeile 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix023
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix023 = function() {
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
  var speech = 'die 2 mal 2 Matrize. Zeile 1: ein halb, zwei drittel Zeile 2: drei viertel, ein fünftel.   die 2 mal 3 Matrize. Zeile 1: Spalte 1, 3; Spalte 2, 1 minus x; Spalte 3, 4. Zeile 2: Spalte 1, 0; Spalte 2, 2; Spalte 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix024
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix024 = function() {
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
  var speech = 'die 4 mal 4 Matrize. Zeile 1: Spalte 1, 0; Spalte 2, 3; Spalte 3, 4; Spalte 4, 3. Zeile 2: Spalte 1, 2; Spalte 2, 1; Spalte 3, 0; Spalte 4, 9. Zeile 3: Spalte 1, 3; Spalte 2, 0; Spalte 3, 2; Spalte 4, 1. Zeile 4: Spalte 1, 6; Spalte 2, 2; Spalte 3, 9; Spalte 4, 0.   die 4 mal 2 Matrize. Zeile 1: Spalte 1, 1; Spalte 2, 3. Zeile 2: Spalte 1, 4; Spalte 2, 2. Zeile 3: Spalte 1, 2; Spalte 2, 1. Zeile 4: Spalte 1, 0; Spalte 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix025
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix025 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>' +
      '</math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix026
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix026 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix027
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix027 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 3 mal 3 Matrize. Zeile 1: 2, 4, 1 Zeile 2: 3, 5, 2 Zeile 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix028
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix028 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd>' +
      '</mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 3 mal 3 Matrize. Zeile 1: 2, 4, 1 Zeile 2: 3, 5, 2 Zeile 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix029
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix029 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 4 mal 4 Matrize. Zeile 1: Spalte 1, 0; Spalte 2, 3; Spalte 3, 4; Spalte 4, 3. Zeile 2: Spalte 1, 2; Spalte 2, 1; Spalte 3, 0; Spalte 4, 9. Zeile 3: Spalte 1, 3; Spalte 2, 0; Spalte 3, 2; Spalte 4, 1. Zeile 4: Spalte 1, 6; Spalte 2, 2; Spalte 3, 9; Spalte 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix030
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix030 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd>' +
      '<mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 4 mal 4 Matrize. Zeile 1: Spalte 1, 0; Spalte 2, 3; Spalte 3, 4; Spalte 4, 3. Zeile 2: Spalte 1, 2; Spalte 2, 1; Spalte 3, 0; Spalte 4, 9. Zeile 3: Spalte 1, 3; Spalte 2, 0; Spalte 3, 2; Spalte 4, 1. Zeile 4: Spalte 1, 6; Spalte 2, 2; Spalte 3, 9; Spalte 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix031
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix031 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix032
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix032 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix033
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix033 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>' +
      '|</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: 2 x, 1 Zeile 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix034
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix034 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd>' +
      '</mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: 2 x, 1 Zeile 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix035
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix035 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: 2 x, y Zeile 2: ein halb, zwei drittel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix036
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix036 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd>' +
      '</mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>' +
      '</mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: 2 x, y Zeile 2: ein halb, zwei drittel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix037
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix037 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: ein halb, zwei drittel Zeile 2: drei viertel, ein fünftel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix038
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix038 = function() {
  var preference = 'Matrix_Auto';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: ein halb, zwei drittel Zeile 2: drei viertel, ein fünftel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix039
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix039 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix040
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix040 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow>' +
      '</math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix041
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix041 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 3 Matrize. Zeile 1: Spalte 1, 3; Spalte 2, 1; Spalte 3, 4. Zeile 2: Spalte 1, 0; Spalte 2, 2; Spalte 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix042
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix042 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 3 Matrize. Zeile 1: Spalte 1, 3; Spalte 2, 1; Spalte 3, 4. Zeile 2: Spalte 1, 0; Spalte 2, 2; Spalte 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix043
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix043 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 3 mal 1 Spaltenmatrize. Zeile 1: 1 Zeile 2: 2 Zeile 3: 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix044
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix044 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'die 3 mal 1 Spaltenmatrize. Zeile 1: 1 Zeile 2: 2 Zeile 3: 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix045
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix045 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'die 1 mal 2 Zeilenmatrize. Spalte 1: 3 Spalte 2: 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix046
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix046 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'die 1 mal 2 Zeilenmatrize. Spalte 1: 3 Spalte 2: 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix047
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix047 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 1 mal 4 Zeilenmatrize. Spalte 1: 1 Spalte 2: 2 Spalte 3: 3 Spalte 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix048
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix048 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'die 1 mal 4 Zeilenmatrize. Spalte 1: 1 Spalte 2: 2 Spalte 3: 3 Spalte 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix049
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix049 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'die 4 mal 1 Spaltenmatrize. Zeile 1: 1 Zeile 2: 2 Zeile 3: 3 Zeile 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix050
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix050 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd></mtr></mtable></mrow>' +
      '<mo>]</mo></mrow></mrow></math>';
  var speech = 'die 4 mal 1 Spaltenmatrize. Zeile 1: 1 Zeile 2: 2 Zeile 3: 3 Zeile 4: 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix051
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix051 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 1 Spaltenmatrize. Zeile 1: x plus 1 Zeile 2: x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix052
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix052 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'die 4 mal 1 Spaltenmatrize. Zeile 1: 3 Zeile 2: 6 Zeile 3: 1 Zeile 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix053
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix053 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'die 1 mal 2 Zeilenmatrize. Spalte 1: x plus 1 Spalte 2: 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix054
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix054 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 1 mal 4 Zeilenmatrize. Spalte 1: 3 Spalte 2: 6 Spalte 3: 1 Spalte 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix055
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix055 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 3 mal 3 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 4; Spalte 3, 1. Zeile 2: Spalte 1, 3; Spalte 2, 5; Spalte 3, 2. Zeile 3: Spalte 1, 1; Spalte 2, 4; Spalte 3, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix056
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix056 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'die 4 mal 4 Matrize. Zeile 1: Spalte 1, 0; Spalte 2, 3; Spalte 3, 4; Spalte 4, 3. Zeile 2: Spalte 1, 2; Spalte 2, 1; Spalte 3, 0; Spalte 4, 9. Zeile 3: Spalte 1, 3; Spalte 2, 0; Spalte 3, 2; Spalte 4, 1. Zeile 4: Spalte 1, 6; Spalte 2, 2; Spalte 3, 9; Spalte 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix057
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix057 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>5</mn>' +
      '</mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd>' +
      '<mn>4</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>0' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 5 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1; Spalte 3, 0; Spalte 4, 5; Spalte 5, 3. Zeile 2: Spalte 1, 3; Spalte 2, 4; Spalte 3, 2; Spalte 4, 7; Spalte 5, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix057a
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix057a = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 4 mal 2 Matrize. Zeile 1: Spalte 1, 1; Spalte 2, 3. Zeile 2: Spalte 1, 4; Spalte 2, 2. Zeile 3: Spalte 1, 2; Spalte 2, 1. Zeile 4: Spalte 1, 0; Spalte 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix058
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix058 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix059
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix059 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd>' +
      '<mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'die 2 mal 3 Matrize. Zeile 1: Spalte 1, 3; Spalte 2, 1 minus x; Spalte 3, 4. Zeile 2: Spalte 1, 0; Spalte 2, 2; Spalte 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix060
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix060 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: Spalte 1, 2 x; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix061
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix061 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: Spalte 1, 2 x; Spalte 2, y. Zeile 2: Spalte 1, ein halb; Spalte 2, zwei drittel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix062
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix062 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: Spalte 1, ein halb; Spalte 2, zwei drittel. Zeile 2: Spalte 1, drei viertel; Spalte 2, ein fünftel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix063
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix063 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<msub><mi>b</mi><mrow><mn>1</mn><mn>1</mn></mrow></msub></mrow>' +
      '</mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>1</mn><mn>2</mn></mrow>' +
      '</msub></mrow></mtd></mtr><mtr><mtd><mrow><msub><mi>b</mi><mrow>' +
      '<mn>2</mn><mn>1</mn></mrow></msub></mrow></mtd><mtd><mrow><msub>' +
      '<mi>b</mi><mrow><mn>2</mn><mn>2</mn></mrow></msub></mrow></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: Spalte 1, b Index 1 1; Spalte 2, b Index 1 2. Zeile 2: Spalte 1, b Index 2 1; Spalte 2, b Index 2 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix064
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix064 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1' +
      '</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '3   die 2 mal 2 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5.   die 2 mal 3 Matrize. Zeile 1: Spalte 1, 3; Spalte 2, 1; Spalte 3, 4. Zeile 2: Spalte 1, 0; Spalte 2, 2; Spalte 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix065
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix065 = function() {
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
  var speech = 'die 2 mal 2 Matrize. Zeile 1: Spalte 1, ein halb; Spalte 2, zwei drittel. Zeile 2: Spalte 1, drei viertel; Spalte 2, ein fünftel.   die 2 mal 3 Matrize. Zeile 1: Spalte 1, 3; Spalte 2, 1 minus x; Spalte 3, 4. Zeile 2: Spalte 1, 0; Spalte 2, 2; Spalte 3, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix066
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix066 = function() {
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
  var speech = 'die 4 mal 4 Matrize. Zeile 1: Spalte 1, 0; Spalte 2, 3; Spalte 3, 4; Spalte 4, 3. Zeile 2: Spalte 1, 2; Spalte 2, 1; Spalte 3, 0; Spalte 4, 9. Zeile 3: Spalte 1, 3; Spalte 2, 0; Spalte 3, 2; Spalte 4, 1. Zeile 4: Spalte 1, 6; Spalte 2, 2; Spalte 3, 9; Spalte 4, 0.   die 4 mal 2 Matrize. Zeile 1: Spalte 1, 1; Spalte 2, 3. Zeile 2: Spalte 1, 4; Spalte 2, 2. Zeile 3: Spalte 1, 2; Spalte 2, 1. Zeile 4: Spalte 1, 0; Spalte 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix067
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix067 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>' +
      '</math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix068
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix068 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix069
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix069 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 3 mal 3 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 4; Spalte 3, 1. Zeile 2: Spalte 1, 3; Spalte 2, 5; Spalte 3, 2. Zeile 3: Spalte 1, 1; Spalte 2, 4; Spalte 3, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix070
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix070 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd>' +
      '</mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 3 mal 3 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 4; Spalte 3, 1. Zeile 2: Spalte 1, 3; Spalte 2, 5; Spalte 3, 2. Zeile 3: Spalte 1, 1; Spalte 2, 4; Spalte 3, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix071
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix071 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 4 mal 4 Matrize. Zeile 1: Spalte 1, 0; Spalte 2, 3; Spalte 3, 4; Spalte 4, 3. Zeile 2: Spalte 1, 2; Spalte 2, 1; Spalte 3, 0; Spalte 4, 9. Zeile 3: Spalte 1, 3; Spalte 2, 0; Spalte 3, 2; Spalte 4, 1. Zeile 4: Spalte 1, 6; Spalte 2, 2; Spalte 3, 9; Spalte 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix072
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix072 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd>' +
      '<mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 4 mal 4 Matrize. Zeile 1: Spalte 1, 0; Spalte 2, 3; Spalte 3, 4; Spalte 4, 3. Zeile 2: Spalte 1, 2; Spalte 2, 1; Spalte 3, 0; Spalte 4, 9. Zeile 3: Spalte 1, 3; Spalte 2, 0; Spalte 3, 2; Spalte 4, 1. Zeile 4: Spalte 1, 6; Spalte 2, 2; Spalte 3, 9; Spalte 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix073
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix073 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix074
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix074 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix075
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix075 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>' +
      '|</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: Spalte 1, 2 x; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix076
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix076 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd>' +
      '</mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: Spalte 1, 2 x; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix077
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix077 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: Spalte 1, 2 x; Spalte 2, y. Zeile 2: Spalte 1, ein halb; Spalte 2, zwei drittel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix078
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix078 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd>' +
      '</mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>' +
      '</mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: Spalte 1, 2 x; Spalte 2, y. Zeile 2: Spalte 1, ein halb; Spalte 2, zwei drittel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix079
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix079 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: Spalte 1, ein halb; Spalte 2, zwei drittel. Zeile 2: Spalte 1, drei viertel; Spalte 2, ein fünftel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix080
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix080 = function() {
  var preference = 'Matrix_SpeakColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: Spalte 1, ein halb; Spalte 2, zwei drittel. Zeile 2: Spalte 1, drei viertel; Spalte 2, ein fünftel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix081
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix081 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix082
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix082 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow>' +
      '</math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix083
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix083 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 3 Matrize. Zeile 1: 3, 1, 4 Zeile 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix084
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix084 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 3 Matrize. Zeile 1: 3, 1, 4 Zeile 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix085
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix085 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 3 mal 1 Spaltenmatrize. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix086
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix086 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'die 3 mal 1 Spaltenmatrize. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix087
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix087 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'die 1 mal 2 Zeilenmatrize. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix088
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix088 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'die 1 mal 2 Zeilenmatrize. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix089
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix089 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 1 Spaltenmatrize. x plus 1, x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix090
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix090 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'die 4 mal 1 Spaltenmatrize. 3, 6, 1, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix091
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix091 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'die 1 mal 2 Zeilenmatrize. x plus 1, 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix092
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix092 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 1 mal 4 Zeilenmatrize. 3, 6, 1, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix092a
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix092a = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 3 mal 3 Matrize. Zeile 1: 2, 4, 1 Zeile 2: 3, 5, 2 Zeile 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix093
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix093 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'die 4 mal 4 Matrize. Zeile 1: 0, 3, 4, 3 Zeile 2: 2, 1, 0, 9 Zeile 3: 3, 0, 2, 1 Zeile 4: 6, 2, 9, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix094
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix094 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>5</mn>' +
      '</mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd>' +
      '<mn>4</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>0' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 5 Matrize. Zeile 1: 2, 1, 0, 5, 3 Zeile 2: 3, 4, 2, 7, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix095
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix095 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 4 mal 2 Matrize. Zeile 1: 1, 3 Zeile 2: 4, 2 Zeile 3: 2, 1 Zeile 4: 0, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix096
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix096 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix097
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix097 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd>' +
      '<mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'die 2 mal 3 Matrize. Zeile 1: 3, 1 minus x, 4 Zeile 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix098
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix098 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 2 x, 1 Zeile 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix099
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix099 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 2 x, y Zeile 2: ein halb, zwei drittel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix100
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix100 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: ein halb, zwei drittel Zeile 2: drei viertel, ein fünftel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix101
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix101 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<msub><mi>b</mi><mrow><mn>1</mn><mn>1</mn></mrow></msub></mrow>' +
      '</mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>1</mn><mn>2</mn></mrow>' +
      '</msub></mrow></mtd></mtr><mtr><mtd><mrow><msub><mi>b</mi><mrow>' +
      '<mn>2</mn><mn>1</mn></mrow></msub></mrow></mtd><mtd><mrow><msub>' +
      '<mi>b</mi><mrow><mn>2</mn><mn>2</mn></mrow></msub></mrow></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: b Index 1 1, b Index 1 2 Zeile 2: b Index 2 1, b Index 2 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix102
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix102 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1' +
      '</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '3   die 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5.   die 2 mal 3 Matrize. Zeile 1: 3, 1, 4 Zeile 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix103
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix103 = function() {
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
  var speech = 'die 2 mal 2 Matrize. Zeile 1: ein halb, zwei drittel Zeile 2: drei viertel, ein fünftel.   die 2 mal 3 Matrize. Zeile 1: 3, 1 minus x, 4 Zeile 2: 0, 2, 6';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix104
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix104 = function() {
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
  var speech = 'die 4 mal 4 Matrize. Zeile 1: 0, 3, 4, 3 Zeile 2: 2, 1, 0, 9 Zeile 3: 3, 0, 2, 1 Zeile 4: 6, 2, 9, 0.   die 4 mal 2 Matrize. Zeile 1: 1, 3 Zeile 2: 4, 2 Zeile 3: 2, 1 Zeile 4: 0, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix105
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix105 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>' +
      '</math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix106
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix106 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix107
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix107 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 3 mal 3 Matrize. Zeile 1: 2, 4, 1 Zeile 2: 3, 5, 2 Zeile 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix108
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix108 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd>' +
      '</mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 3 mal 3 Matrize. Zeile 1: 2, 4, 1 Zeile 2: 3, 5, 2 Zeile 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix109
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix109 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 4 mal 4 Matrize. Zeile 1: 0, 3, 4, 3 Zeile 2: 2, 1, 0, 9 Zeile 3: 3, 0, 2, 1 Zeile 4: 6, 2, 9, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix110
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix110 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd>' +
      '<mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 4 mal 4 Matrize. Zeile 1: 0, 3, 4, 3 Zeile 2: 2, 1, 0, 9 Zeile 3: 3, 0, 2, 1 Zeile 4: 6, 2, 9, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix111
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix111 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix112
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix112 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix113
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix113 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>' +
      '|</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: 2 x, 1 Zeile 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix114
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix114 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd>' +
      '</mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: 2 x, 1 Zeile 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix115
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix115 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: 2 x, y Zeile 2: ein halb, zwei drittel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix116
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix116 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd>' +
      '</mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>' +
      '</mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: 2 x, y Zeile 2: ein halb, zwei drittel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix117
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix117 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: ein halb, zwei drittel Zeile 2: drei viertel, ein fünftel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix118
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix118 = function() {
  var preference = 'Matrix_SilentColNum';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: ein halb, zwei drittel Zeile 2: drei viertel, ein fünftel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix119
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix119 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix120
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix120 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow>' +
      '</math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix121
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix121 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 3 Matrize. Zeile 1: 3, 1, 4 Zeile 2: 0, 2, 6. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix122
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix122 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 3 Matrize. Zeile 1: 3, 1, 4 Zeile 2: 0, 2, 6. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix123
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix123 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 3 mal 1 Spaltenmatrize. 1, 2, 3. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix124
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix124 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'die 3 mal 1 Spaltenmatrize. 1, 2, 3. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix125
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix125 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'die 1 mal 2 Zeilenmatrize. 3, 5. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix126
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix126 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'die 1 mal 2 Zeilenmatrize. 3, 5. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix127
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix127 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 1 Spaltenmatrize. Zeile 1: x plus 1 Zeile 2: x minus 1. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix128
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix128 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'die 4 mal 1 Spaltenmatrize. Zeile 1: 3 Zeile 2: 6 Zeile 3: 1 Zeile 4: 2. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix129
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix129 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'die 1 mal 2 Zeilenmatrize. Spalte 1: x plus 1 Spalte 2: 2 x. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix130
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix130 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>6</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 1 mal 4 Zeilenmatrize. Spalte 1: 3 Spalte 2: 6 Spalte 3: 1 Spalte 4: 2. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix131
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix131 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 3 mal 3 Matrize. Zeile 1: 2, 4, 1 Zeile 2: 3, 5, 2 Zeile 3: 1, 4, 7. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix132
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix132 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'die 4 mal 4 Matrize. Zeile 1: Spalte 1, 0; Spalte 2, 3; Spalte 3, 4; Spalte 4, 3. Zeile 2: Spalte 1, 2; Spalte 2, 1; Spalte 3, 0; Spalte 4, 9. Zeile 3: Spalte 1, 3; Spalte 2, 0; Spalte 3, 2; Spalte 4, 1. Zeile 4: Spalte 1, 6; Spalte 2, 2; Spalte 3, 9; Spalte 4, 0. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix133
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix133 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>5</mn>' +
      '</mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd>' +
      '<mn>4</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd><mtd><mn>0' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 5 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1; Spalte 3, 0; Spalte 4, 5; Spalte 5, 3. Zeile 2: Spalte 1, 3; Spalte 2, 4; Spalte 3, 2; Spalte 4, 7; Spalte 5, 0. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix134
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix134 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>5</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 4 mal 2 Matrize. Zeile 1: Spalte 1, 1; Spalte 2, 3. Zeile 2: Spalte 1, 4; Spalte 2, 2. Zeile 3: Spalte 1, 2; Spalte 2, 1. Zeile 4: Spalte 1, 0; Spalte 2, 5. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix135
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix135 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5 plus x. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix136
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix136 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mrow><mn>1</mn><mo>−</mo><mi>x</mi></mrow></mtd>' +
      '<mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'die 2 mal 3 Matrize. Zeile 1: Spalte 1, 3; Spalte 2, 1 minus x; Spalte 3, 4. Zeile 2: Spalte 1, 0; Spalte 2, 2; Spalte 3, 6. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix137
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix137 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 2 x, 1 Zeile 2: 7, 5. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix138
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix138 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 2 x, y Zeile 2: ein halb, zwei drittel. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix139
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix139 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: ein halb, zwei drittel Zeile 2: drei viertel, ein fünftel. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Rewrite certain indices from implicit multiplication to
// punctuation.
/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix140
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix140 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<msub><mi>b</mi><mrow><mn>1</mn><mn>1</mn></mrow></msub></mrow>' +
      '</mtd><mtd><mrow><msub><mi>b</mi><mrow><mn>1</mn><mn>2</mn></mrow>' +
      '</msub></mrow></mtd></mtr><mtr><mtd><mrow><msub><mi>b</mi><mrow>' +
      '<mn>2</mn><mn>1</mn></mrow></msub></mrow></mtd><mtd><mrow><msub>' +
      '<mi>b</mi><mrow><mn>2</mn><mn>2</mn></mrow></msub></mrow></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: b Index 1 1, b Index 1 2 Zeile 2: b Index 2 1, b Index 2 2. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix141
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix141 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd><mtd><mn>1' +
      '</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '3   die 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5. Ende Matrize   die 2 mal 3 Matrize. Zeile 1: 3, 1, 4 Zeile 2: 0, 2, 6. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix142
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix142 = function() {
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
  var speech = 'die 2 mal 2 Matrize. Zeile 1: ein halb, zwei drittel Zeile 2: drei viertel, ein fünftel. Ende Matrize   die 2 mal 3 Matrize. Zeile 1: Spalte 1, 3; Spalte 2, 1 minus x; Spalte 3, 4. Zeile 2: Spalte 1, 0; Spalte 2, 2; Spalte 3, 6. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix143
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix143 = function() {
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
  var speech = 'die 4 mal 4 Matrize. Zeile 1: Spalte 1, 0; Spalte 2, 3; Spalte 3, 4; Spalte 4, 3. Zeile 2: Spalte 1, 2; Spalte 2, 1; Spalte 3, 0; Spalte 4, 9. Zeile 3: Spalte 1, 3; Spalte 2, 0; Spalte 3, 2; Spalte 4, 1. Zeile 4: Spalte 1, 6; Spalte 2, 2; Spalte 3, 9; Spalte 4, 0. Ende Matrize   die 4 mal 2 Matrize. Zeile 1: Spalte 1, 1; Spalte 2, 3. Zeile 2: Spalte 1, 4; Spalte 2, 2. Zeile 3: Spalte 1, 2; Spalte 2, 1. Zeile 4: Spalte 1, 0; Spalte 2, 5. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix144
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix144 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>' +
      '</math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5. Ende Determinante';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix145
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix145 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix146
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix146 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 3 mal 3 Matrize. Zeile 1: 2, 4, 1 Zeile 2: 3, 5, 2 Zeile 3: 1, 4, 7. Ende Determinante';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix147
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix147 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd>' +
      '</mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 3 mal 3 Matrize. Zeile 1: 2, 4, 1 Zeile 2: 3, 5, 2 Zeile 3: 1, 4, 7. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix148
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix148 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 4 mal 4 Matrize. Zeile 1: Spalte 1, 0; Spalte 2, 3; Spalte 3, 4; Spalte 4, 3. Zeile 2: Spalte 1, 2; Spalte 2, 1; Spalte 3, 0; Spalte 4, 9. Zeile 3: Spalte 1, 3; Spalte 2, 0; Spalte 3, 2; Spalte 4, 1. Zeile 4: Spalte 1, 6; Spalte 2, 2; Spalte 3, 9; Spalte 4, 0. Ende Determinante';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix149
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix149 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd>' +
      '<mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd>' +
      '<mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 4 mal 4 Matrize. Zeile 1: Spalte 1, 0; Spalte 2, 3; Spalte 3, 4; Spalte 4, 3. Zeile 2: Spalte 1, 2; Spalte 2, 1; Spalte 3, 0; Spalte 4, 9. Zeile 3: Spalte 1, 3; Spalte 2, 0; Spalte 3, 2; Spalte 4, 1. Zeile 4: Spalte 1, 6; Spalte 2, 2; Spalte 3, 9; Spalte 4, 0. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix150
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix150 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2' +
      '</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
      '<mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5 plus x. Ende Determinante';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix151
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix151 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn>' +
      '</mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5 plus x. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix152
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix152 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr>' +
      '<mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>' +
      '|</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: 2 x, 1 Zeile 2: 7, 5. Ende Determinante';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix153
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix153 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd>' +
      '</mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: 2 x, 1 Zeile 2: 7, 5. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix154
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix154 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: 2 x, y Zeile 2: ein halb, zwei drittel. Ende Determinante';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix155
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix155 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd>' +
      '</mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>' +
      '</mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd>' +
      '</mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: 2 x, y Zeile 2: ein halb, zwei drittel. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix156
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix156 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow></math>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: ein halb, zwei drittel Zeile 2: drei viertel, ein fünftel. Ende Determinante';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix157
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix157 = function() {
  var preference = 'Matrix_EndMatrix';
  var mathml = '<math><mrow><mi>det</mi><mrow><mo>(</mo><mrow><mtable><mtr>' +
      '<mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr>' +
      '<mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd>' +
      '<mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die Determinante von der 2 mal 2 Matrize. Zeile 1: ein halb, zwei drittel Zeile 2: drei viertel, ein fünftel. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix158
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix158 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'der 3 mal 1 Spaltenvektor. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix159
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix159 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'der 3 mal 1 Spaltenvektor. 1, 2, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix160
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix160 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'der 1 mal 2 Zeilenvektor. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix161
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix161 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'der 1 mal 2 Zeilenvektor. 3, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix162
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix162 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'der 2 mal 1 Spaltenvektor. Zeile 1: x plus 1 Zeile 2: x minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix163
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix163 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'der 4 mal 1 Spaltenvektor. Zeile 1: 3 Zeile 2: 6 Zeile 3: 1 Zeile 4: 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix164
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix164 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'der 1 mal 2 Zeilenvektor. Spalte 1: x plus 1 Spalte 2: 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix165
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix165 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd>' +
      '<mn>5</mn></mtd></mtr><mtr><mtd><mn>9</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'der 1 mal 2 Zeilenvektor. 3, 2.   die 2 mal 2 Matrize. Zeile 1: 0, 5 Zeile 2: 9, 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix166
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix166 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable>' +
      '</mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>4</mn></mtd></mtr>' +
      '<mtr><mtd><mn>8</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'der 1 mal 3 Zeilenvektor. 1, 2, 7.   die 3 mal 3 Matrize. Zeile 1: 3, 5, 4 Zeile 2: 8, 0, 6 Zeile 3: 1, 4, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix167
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix167 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr><mtr><mtd><mn>9</mn></mtd>' +
      '<mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow>' +
      '<mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd>' +
      '<mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 0, 5 Zeile 2: 9, 4.   der 2 mal 1 Spaltenvektor. 3, 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix168
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix168 = function() {
  var preference = 'Matrix_Vector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>8</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow>' +
      '<mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'die 3 mal 3 Matrize. Zeile 1: 3, 5, 4 Zeile 2: 8, 0, 6 Zeile 3: 1, 4, 2.   der 3 mal 1 Spaltenvektor. 1, 2, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix169
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix169 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'der 3 mal 1 Spaltenvektor. 1, 2, 3. Ende Vektor';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix170
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix170 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3' +
      '</mn></mtd></mtr></mtable></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'der 3 mal 1 Spaltenvektor. 1, 2, 3. Ende Vektor';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix171
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix171 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'der 1 mal 2 Zeilenvektor. 3, 5. Ende Vektor';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix172
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix172 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = 'der 1 mal 2 Zeilenvektor. 3, 5. Ende Vektor';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix173
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix173 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'der 2 mal 1 Spaltenvektor. Zeile 1: x plus 1 Zeile 2: x minus 1. Ende Vektor';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix174
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix174 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>1' +
      '</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'der 4 mal 1 Spaltenvektor. Zeile 1: 3 Zeile 2: 6 Zeile 3: 1 Zeile 4: 2. Ende Vektor';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix175
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix175 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mrow><mn>2</mn>' +
      '<mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'der 1 mal 2 Zeilenvektor. Spalte 1: x plus 1 Spalte 2: 2 x. Ende Vektor';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix176
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix176 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd>' +
      '<mn>5</mn></mtd></mtr><mtr><mtd><mn>9</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'der 1 mal 2 Zeilenvektor. 3, 2. Ende Vektor   die 2 mal 2 Matrize. Zeile 1: 0, 5 Zeile 2: 9, 4. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix177
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix177 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable>' +
      '</mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>4</mn></mtd></mtr>' +
      '<mtr><mtd><mn>8</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'der 1 mal 3 Zeilenvektor. 1, 2, 7. Ende Vektor   die 3 mal 3 Matrize. Zeile 1: 3, 5, 4 Zeile 2: 8, 0, 6 Zeile 3: 1, 4, 2. Ende Matrize';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix178
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix178 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>0' +
      '</mn></mtd><mtd><mn>5</mn></mtd></mtr><mtr><mtd><mn>9</mn></mtd>' +
      '<mtd><mn>4</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow>' +
      '<mo>(</mo><mrow><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd>' +
      '<mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 0, 5 Zeile 2: 9, 4. Ende Matrize   der 2 mal 1 Spaltenvektor. 3, 2. Ende Vektor';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix179
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix179 = function() {
  var preference = 'Matrix_EndVector';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>3' +
      '</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr>' +
      '<mtd><mn>8</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>6</mn></mtd>' +
      '</mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>2</mn>' +
      '</mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow>' +
      '<mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd>' +
      '</mtr><mtr><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'die 3 mal 3 Matrize. Zeile 1: 3, 5, 4 Zeile 2: 8, 0, 6 Zeile 3: 1, 4, 2. Ende Matrize   der 3 mal 1 Spaltenvektor. 1, 2, 7. Ende Vektor';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix180
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix180 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mi>n' +
      '</mi></mtd></mtr><mtr><mtd><mi>r</mi></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'n über r';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix181
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix181 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>10</mn></mrow></mtd></mtr><mtr><mtd><mn>7</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '10 über 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix182
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix182 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mrow>' +
      '<mn>15</mn></mrow></mtd></mtr><mtr><mtd><mn>0</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '15 über 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanMatricesAndCombinatorics Example Matrix183
 */
sre.ClearspeakGermanMatricesAndCombinatorics.prototype.testMatrix183 = function() {
  var preference = 'Matrix_Combinatoric';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>8' +
      '</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '8 über 3';
  this.executeRuleTest(mathml, speech, preference);
};
