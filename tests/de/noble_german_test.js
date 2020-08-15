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

/**
 * @fileoverview Testcases for mathspeak speech rules from Steve Nobles test
 *     set.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.NobleGermanTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.NobleGermanTest = function() {
  sre.NobleGermanTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Steve Noble\'s samples German tests.';

  /**
   * @override
   */
  this.domain = 'mathspeak';

  /**
   * @override
   */
  this.locale = 'de';

  this.compare = true;

  this.setActive('NobleSamplesGerman');
};
goog.inherits(sre.NobleGermanTest, sre.AbstractRuleTest);


/**
 * Testing Sample 1
 */
sre.NobleGermanTest.prototype.testSample_1 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>5</mn><mfrac>' +
      '<mn>1</mn>' +
      '<mn>5</mn>' +
      '</mfrac>' +
      '<mo>&#x2212;</mo><mn>6</mn><mfrac>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '</mfrac>' +
      '<mo>=</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, 'minus 5 ein fünftel minus 6 zwei drittel ist gleich', 'default');
  this.executeRuleTest(mml, 'minus 5 ein fünftel minus 6 zwei drittel ist gleich', 'brief');
  this.executeRuleTest(mml, 'minus 5 ein fünftel minus 6 zwei drittel ist gleich', 'sbrief');
};


/**
 * Testing Sample 2
 */
sre.NobleGermanTest.prototype.testSample_2 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>7</mn><mfrac>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfrac>' +
      '<mo>&#x2212;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>4</mn><mfrac>' +
      '<mn>7</mn>' +
      '<mn>8</mn>' +
      '</mfrac>' +
      '</mrow>' +
      '<mo>)</mo></mrow><mo>=</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, 'minus 7 drei viertel minus Klammer auf minus 4 sieben achtel Klammer zu ist gleich', 'default');
  this.executeRuleTest(mml, 'minus 7 drei viertel minus Klammer auf minus 4 sieben achtel Klammer zu ist gleich', 'brief');
  this.executeRuleTest(mml, 'minus 7 drei viertel minus Klammer auf minus 4 sieben achtel Klammer zu ist gleich', 'sbrief');
};


/**
 * Testing Sample 3
 */
sre.NobleGermanTest.prototype.testSample_3 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>24.15</mn><mo>&#x2212;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mn>13.7</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow><mo>=</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, 'minus 24,15 minus Klammer auf 13,7 Klammer zu ist gleich', 'default');
  this.executeRuleTest(mml, 'minus 24,15 minus Klammer auf 13,7 Klammer zu ist gleich', 'brief');
  this.executeRuleTest(mml, 'minus 24,15 minus Klammer auf 13,7 Klammer zu ist gleich', 'sbrief');
};


/**
 * Testing Sample 4
 */
sre.NobleGermanTest.prototype.testSample_4 = function() {
  var mml = '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>4</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow><mo>&#x00D7;</mo><mn>3</mn><mo>=</mo><mo>&#x2212;' +
      '</mo><mn>12</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'Klammer auf minus 4 Klammer zu mal 3 ist gleich minus 12', 'default');
  this.executeRuleTest(mml, 'Klammer auf minus 4 Klammer zu mal 3 ist gleich minus 12', 'brief');
  this.executeRuleTest(mml, 'Klammer auf minus 4 Klammer zu mal 3 ist gleich minus 12', 'sbrief');
};


/**
 * Testing Sample 5
 */
sre.NobleGermanTest.prototype.testSample_5 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>12</mn><mo>&#x00F7;</mo><mn>3</mn><mo>=</mo>' +
      '<mo>&#x2212;</mo><mn>4</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'minus 12 geteilt durch 3 ist gleich minus 4', 'default');
  this.executeRuleTest(mml, 'minus 12 geteilt durch 3 ist gleich minus 4', 'brief');
  this.executeRuleTest(mml, 'minus 12 geteilt durch 3 ist gleich minus 4', 'sbrief');
};


/**
 * Testing Sample 6
 */
sre.NobleGermanTest.prototype.testSample_6 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>12</mn><mo>&#x00F7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>4</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow><mo>=</mo><mn>3</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'minus 12 geteilt durch Klammer auf minus 4 Klammer zu ist gleich 3', 'default');
  this.executeRuleTest(mml, 'minus 12 geteilt durch Klammer auf minus 4 Klammer zu ist gleich 3', 'brief');
  this.executeRuleTest(mml, 'minus 12 geteilt durch Klammer auf minus 4 Klammer zu ist gleich 3', 'sbrief');
};


/**
 * Testing Sample 7
 */
sre.NobleGermanTest.prototype.testSample_7 = function() {
  var mml = '<mrow>' +
      '<mn>6</mn><mo>&#x00D7;</mo><mn>5</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, '6 mal 5', 'default');
  this.executeRuleTest(mml, '6 mal 5', 'brief');
  this.executeRuleTest(mml, '6 mal 5', 'sbrief');
};


/**
 * Testing Sample 8
 */
sre.NobleGermanTest.prototype.testSample_8 = function() {
  var mml = '<mrow>' +
      '<mn>6</mn><mo>&#x00D7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>5</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '6 mal Klammer auf minus 5 Klammer zu', 'default');
  this.executeRuleTest(mml, '6 mal Klammer auf minus 5 Klammer zu', 'brief');
  this.executeRuleTest(mml, '6 mal Klammer auf minus 5 Klammer zu', 'sbrief');
};


/**
 * Testing Sample 9
 */
sre.NobleGermanTest.prototype.testSample_9 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>6</mn><mo>&#x00D7;</mo><mn>5</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'minus 6 mal 5', 'default');
  this.executeRuleTest(mml, 'minus 6 mal 5', 'brief');
  this.executeRuleTest(mml, 'minus 6 mal 5', 'sbrief');
};


/**
 * Testing Sample 10
 */
sre.NobleGermanTest.prototype.testSample_10 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>6</mn><mo>&#x00D7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>5</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, 'minus 6 mal Klammer auf minus 5 Klammer zu', 'default');
  this.executeRuleTest(mml, 'minus 6 mal Klammer auf minus 5 Klammer zu', 'brief');
  this.executeRuleTest(mml, 'minus 6 mal Klammer auf minus 5 Klammer zu', 'sbrief');
};


/**
 * Testing Sample 11
 */
sre.NobleGermanTest.prototype.testSample_11 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>8</mn><mo>&#x00D7;</mo><mn>7</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'minus 8 mal 7', 'default');
  this.executeRuleTest(mml, 'minus 8 mal 7', 'brief');
  this.executeRuleTest(mml, 'minus 8 mal 7', 'sbrief');
};


/**
 * Testing Sample 12
 */
sre.NobleGermanTest.prototype.testSample_12 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>8</mn><mo>&#x00D7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>7</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, 'minus 8 mal Klammer auf minus 7 Klammer zu', 'default');
  this.executeRuleTest(mml, 'minus 8 mal Klammer auf minus 7 Klammer zu', 'brief');
  this.executeRuleTest(mml, 'minus 8 mal Klammer auf minus 7 Klammer zu', 'sbrief');
};


/**
 * Testing Sample 13
 */
sre.NobleGermanTest.prototype.testSample_13 = function() {
  var mml = '<mrow>' +
      '<mn>8</mn><mo>&#x00D7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>7</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '8 mal Klammer auf minus 7 Klammer zu', 'default');
  this.executeRuleTest(mml, '8 mal Klammer auf minus 7 Klammer zu', 'brief');
  this.executeRuleTest(mml, '8 mal Klammer auf minus 7 Klammer zu', 'sbrief');
};


/**
 * Testing Sample 14
 */
sre.NobleGermanTest.prototype.testSample_14 = function() {
  var mml = '<mrow><mn>8</mn><mo>&#x00D7;</mo><mn>7</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, '8 mal 7', 'default');
  this.executeRuleTest(mml, '8 mal 7', 'brief');
  this.executeRuleTest(mml, '8 mal 7', 'sbrief');
};


/**
 * Testing Sample 15
 */
sre.NobleGermanTest.prototype.testSample_15 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mn>1</mn><mo>=</mo><mi>30°</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'm Winkel 1 ist gleich 30 Grad', 'default');
  this.executeRuleTest(mml, 'm Winkel 1 ist gleich 30 Grad', 'brief');
  this.executeRuleTest(mml, 'm Winkel 1 ist gleich 30 Grad', 'sbrief');
};


/**
 * Testing Sample 16
 */
sre.NobleGermanTest.prototype.testSample_16 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mn>2</mn><mo>=</mo>' +
      '<mi>60°</mi>  </mrow>';
  this.executeRuleTest(mml, 'm Winkel 2 ist gleich 60 Grad', 'default');
  this.executeRuleTest(mml, 'm Winkel 2 ist gleich 60 Grad', 'brief');
  this.executeRuleTest(mml, 'm Winkel 2 ist gleich 60 Grad', 'sbrief');
};


/**
 * Testing Sample 17
 */
sre.NobleGermanTest.prototype.testSample_17 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mn>1</mn><mo>+</mo><mi>m</mi>' +
      '<mo>&#x2220;</mo><mn>2</mn><mo>=</mo>' +
      '<mi>90°</mi>  </mrow>';
  this.executeRuleTest(mml, 'm Winkel 1 plus m Winkel 2 ist gleich 90 Grad',
                       'default');
  this.executeRuleTest(mml, 'm Winkel 1 plus m Winkel 2 ist gleich 90 Grad',
                       'brief');
  this.executeRuleTest(mml, 'm Winkel 1 plus m Winkel 2 ist gleich 90 Grad',
                       'sbrief');
};


/**
 * Testing Sample 18
 */
sre.NobleGermanTest.prototype.testSample_18 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mi>M</mi><mo>+</mo><mi>m</mi>' +
      '<mo>&#x2220;</mo><mi>N</mi><mo>=</mo>' +
      '<mi>180°</mi>  </mrow>';
  this.executeRuleTest(mml, 'm Winkel großes M plus m Winkel großes N ist gleich 180 Grad', 'default');
  this.executeRuleTest(mml, 'm Winkel großes M plus m Winkel großes N ist gleich 180 Grad', 'brief');
  this.executeRuleTest(mml, 'm Winkel großes M plus m Winkel großes N ist gleich 180 Grad', 'sbrief');
};


/**
 * Testing Sample 19
 */
sre.NobleGermanTest.prototype.testSample_19 = function() {
  var mml = '<mrow>' +
      '<mi>A</mi><mo>=</mo><mfrac>' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '</mfrac>' +
      '<mi>b</mi><mi>h</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'großes A ist gleich ein halb b h', 'default');
  this.executeRuleTest(mml, 'großes A ist gleich ein halb b h', 'brief');
  this.executeRuleTest(mml, 'großes A ist gleich ein halb b h', 'sbrief');
};


/**
 * Testing Sample 20
 */
sre.NobleGermanTest.prototype.testSample_20 = function() {
  var mml = '<mrow>' +
      '<mfrac>' +
      '<mrow>' +
      '<mtext>area&#x00A0;of&#x00A0;triangle</mtext>' +
      '</mrow>' +
      '<mrow>' +
      '<mtext>area&#x00A0;of&#x00A0;square</mtext>' +
      '</mrow>' +
      '</mfrac>' +
      '<mo>=</mo><mfrac>' +
      '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mtext>1&#x00A0;unit</mtext>' +
      '</mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mtext>16&#x00A0;units</mtext>' +
      '</mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '</mfrac>' +
      '</mrow>';
  this.executeRuleTest(mml, 'Anfang Bruch area of triangle durch area of square Ende Bruch ist gleich Anfang Bruch 1 unit Quadrat durch 16 units Quadrat Ende Bruch', 'default');
  this.executeRuleTest(mml, 'Anfang Bruch area of triangle durch area of square Ende Bruch ist gleich Anfang Bruch 1 unit Quadrat durch 16 units Quadrat Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'Bruch area of triangle durch area of square Ende Bruch ist gleich Bruch 1 unit Quadrat durch 16 units Quadrat Ende Bruch', 'sbrief');
};


/**
 * Testing Sample 21
 */
sre.NobleGermanTest.prototype.testSample_21 = function() {
  var mml = '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mn>0.6</mn>' +
      '</mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>';
  this.executeRuleTest(mml, '0,6 Quadrat', 'default');
  this.executeRuleTest(mml, '0,6 Quadrat', 'brief');
  this.executeRuleTest(mml, '0,6 Quadrat', 'sbrief');
};


/**
 * Testing Sample 22
 */
sre.NobleGermanTest.prototype.testSample_22 = function() {
  var mml = '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mn>1.5</mn>' +
      '</mrow>' +
      '<mn>2</mn>' +
      '</msup>    ' +
      '</mrow>';
  this.executeRuleTest(mml, '1,5 Quadrat', 'default');
  this.executeRuleTest(mml, '1,5 Quadrat', 'brief');
  this.executeRuleTest(mml, '1,5 Quadrat', 'sbrief');
};


/**
 * Testing Sample 23
 */
sre.NobleGermanTest.prototype.testSample_23 = function() {
  var mml = '<mrow>' +
      '<mn>4</mn><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>x</mi>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '4 Klammer auf 2 x plus 3 x Klammer zu', 'default');
  this.executeRuleTest(mml, '4 Klammer auf 2 x plus 3 x Klammer zu', 'brief');
  this.executeRuleTest(mml, '4 Klammer auf 2 x plus 3 x Klammer zu', 'sbrief');
};


/**
 * Testing Sample 24
 */
sre.NobleGermanTest.prototype.testSample_24 = function() {
  var mml = '<mrow>' +
      '<mn>36</mn><mo>+</mo><mn>4</mn><mi>y</mi><mo>&#x2212;</mo><mn>1</mn>' +
      '<msup>' +
      '<mi>y</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo>+</mo><mn>5</mn><msup>' +
      '<mi>y</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo>&#x2212;</mo><mn>2</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, '36 plus 4 y minus 1 y Quadrat plus 5 y Quadrat minus 2', 'default');
  this.executeRuleTest(mml, '36 plus 4 y minus 1 y Quadrat plus 5 y Quadrat minus 2', 'brief');
  this.executeRuleTest(mml, '36 plus 4 y minus 1 y Quadrat plus 5 y Quadrat minus 2', 'sbrief');
};


/**
 * Testing Sample 25
 */
sre.NobleGermanTest.prototype.testSample_25 = function() {
  var mml = '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mn>5</mn><mo>+</mo><mn>9</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow><mo>&#x2212;</mo><mn>4</mn><mo>+</mo><mn>3</mn>' +
      '<mo>=</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, 'Klammer auf 5 plus 9 Klammer zu minus 4 plus 3 ist gleich', 'default');
  this.executeRuleTest(mml, 'Klammer auf 5 plus 9 Klammer zu minus 4 plus 3 ist gleich', 'brief');
  this.executeRuleTest(mml, 'Klammer auf 5 plus 9 Klammer zu minus 4 plus 3 ist gleich', 'sbrief');
};


/**
 * Testing Sample 26
 */
sre.NobleGermanTest.prototype.testSample_26 = function() {
  var mml = '<mrow>' +
      '<mover accent="true">' +
      '<mrow>' +
      '<mi>B</mi><mi>C</mi>' +
      '</mrow>' +
      '<mo stretchy="true">&#x2194;</mo>' +
      '</mover>' +
      '</mrow>';
  this.executeRuleTest(mml, 'modifiziert oben großes B großes C mit Linker rechter Pfeil', 'default');
  this.executeRuleTest(mml, 'mod oben großes B großes C mit Linker rechter Pfeil', 'brief');
  this.executeRuleTest(mml, 'mod oben großes B großes C mit Linker rechter Pfeil', 'sbrief');
};


/**
 * Testing Sample 27
 */
sre.NobleGermanTest.prototype.testSample_27 = function() {
  var mml = '<mrow>' +
      '<mover accent="true">' +
      '<mrow>' +
      '<mi>P</mi><mi>Q</mi>' +
      '</mrow>' +
      '<mo stretchy="true">&#x2192;</mo>' +
      '</mover>' +
      '</mrow>';
  this.executeRuleTest(mml, 'modifiziert oben großes P großes Q mit Pfeil nach rechts', 'default');
  this.executeRuleTest(mml, 'mod oben großes P großes Q mit Pfeil nach rechts', 'brief');
  this.executeRuleTest(mml, 'mod oben großes P großes Q mit Pfeil nach rechts', 'sbrief');
};


/**
 * Testing Sample 28
 */
sre.NobleGermanTest.prototype.testSample_28 = function() {
  var mml = '<mrow>' +
      '<mover accent="true">' +
      '<mrow>' +
      '<mi>G</mi><mi>H</mi>' +
      '</mrow>' +
      '<mo stretchy="true">&#x00AF;</mo>' +
      '</mover>' +
      '</mrow>';
  this.executeRuleTest(mml, 'modifiziert oben großes G großes H mit Überstrich', 'default');
  this.executeRuleTest(mml, 'mod oben großes G großes H mit Überstrich', 'brief');
  this.executeRuleTest(mml, 'mod oben großes G großes H mit Überstrich', 'sbrief');
};


/**
 * Testing Sample 29
 */
sre.NobleGermanTest.prototype.testSample_29 = function() {
  var mml = '<mrow>' +
      '<mover accent="true">' +
      '<mrow>' +
      '<mi>W</mi><mi>X</mi>' +
      '</mrow>' +
      '<mo stretchy="true">&#x00AF;</mo>' +
      '</mover>' +
      '<mo>&#x2245;</mo><mover accent="true">' +
      '<mrow>' +
      '<mi>Y</mi><mi>Z</mi>' +
      '</mrow>' +
      '<mo stretchy="true">&#x00AF;</mo>' +
      '</mover>' +
      '</mrow>';
  this.executeRuleTest(mml, 'modifiziert oben großes W großes X mit Überstrich ungefähr gleich modifiziert oben großes Y großes Z mit Überstrich',
                       'default');
  this.executeRuleTest(mml, 'mod oben großes W großes X mit Überstrich ungefähr gleich mod oben großes Y großes Z mit Überstrich', 'brief');
  this.executeRuleTest(mml, 'mod oben großes W großes X mit Überstrich ungefähr gleich mod oben großes Y großes Z mit Überstrich', 'sbrief');
};


/**
 * Testing Sample 30
 */
sre.NobleGermanTest.prototype.testSample_30 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2220;</mo><mi>B</mi><mi>E</mi><mi>F</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'Winkel großes B großes E großes F',
                       'default');
  this.executeRuleTest(mml, 'Winkel großes B großes E großes F',
                       'brief');
  this.executeRuleTest(mml, 'Winkel großes B großes E großes F',
                       'sbrief');
};


/**
 * Testing Sample 31
 */
sre.NobleGermanTest.prototype.testSample_31 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2220;</mo><mi>B</mi><mi>E</mi><mi>D</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'Winkel großes B großes E großes D',
                       'default');
  this.executeRuleTest(mml, 'Winkel großes B großes E großes D',
                       'brief');
  this.executeRuleTest(mml, 'Winkel großes B großes E großes D',
                       'sbrief');
};


/**
 * Testing Sample 32
 */
sre.NobleGermanTest.prototype.testSample_32 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2220;</mo><mi>D</mi><mi>E</mi><mi>F</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'Winkel großes D großes E großes F',
                       'default');
  this.executeRuleTest(mml, 'Winkel großes D großes E großes F',
                       'brief');
  this.executeRuleTest(mml, 'Winkel großes D großes E großes F',
                       'sbrief');
};


/**
 * Testing Sample 33
 */
sre.NobleGermanTest.prototype.testSample_33 = function() {
  var mml = '<mrow>' +
      '<mi>x</mi>' +
      '<mo>=</mo>' +
      '<mfrac>' +
      '<mrow>' +
      '<mo>−</mo>' +
      '<mi>b</mi>' +
      '<mo>±</mo>' +
      '<msqrt>' +
      '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mi>b</mi>' +
      '</mrow>' +
      '<mrow>' +
      '<mn>2</mn>' +
      '</mrow>' +
      '</msup>' +
      '<mo>−</mo>' +
      '<mn>4</mn>' +
      '<mi>a</mi>' +
      '<mi>c</mi>' +
      '</mrow>' +
      '</msqrt>' +
      '</mrow>' +
      '<mrow>' +
      '<mn>2</mn>' +
      '<mi>a</mi>' +
      '</mrow>' +
      '</mfrac>' +
      '</mrow>';
  this.executeRuleTest(mml, 'x ist gleich Anfang Bruch minus b plus minus Anfang Quadratwurzel b Quadrat minus 4 a c Ende Quadratwurzel durch 2 a Ende Bruch', 'default');
  this.executeRuleTest(mml, 'x ist gleich Anfang Bruch minus b plus minus Anfang Quadratwurzel b Quadrat minus 4 a c Ende Quadratwurzel durch 2 a Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'x ist gleich Bruch minus b plus minus Quadratwurzel b Quadrat minus 4 a c Ende Quadratwurzel durch 2 a Ende Bruch', 'sbrief');
};


/**
 * Testing Sample 34
 */
sre.NobleGermanTest.prototype.testSample_34 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mi>x</mi></mrow><mrow>' +
      '<mn>2</mn></mrow></msup><mo>+</mo><mn>8</mn><mi>x</mi><mo>+</mo>' +
      '<mn>16</mn></mrow>';
  this.executeRuleTest(mml, 'y ist gleich x Quadrat plus 8 x plus 16', 'default');
  this.executeRuleTest(mml, 'y ist gleich x Quadrat plus 8 x plus 16', 'brief');
  this.executeRuleTest(mml, 'y ist gleich x Quadrat plus 8 x plus 16', 'sbrief');
};


/**
 * Testing Sample 35
 */
sre.NobleGermanTest.prototype.testSample_35 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mfrac><mrow><mn>1</mn></mrow><mrow>' +
      '<mn>3</mn></mrow></mfrac><mrow><mo>(</mo><msup><mrow><mn>3</mn>' +
      '</mrow><mrow><mi>x</mi></mrow></msup><mo>)</mo></mrow></mrow>';
  this.executeRuleTest(mml, 'y ist gleich ein drittel Klammer auf 3 hoch x Grundlinie Klammer zu', 'default');
  this.executeRuleTest(mml, 'y ist gleich ein drittel Klammer auf 3 hoch x Grund Klammer zu',
                       'brief');
  this.executeRuleTest(mml, 'y ist gleich ein drittel Klammer auf 3 hoch x Grund Klammer zu', 'sbrief');
};


/**
 * Testing Sample 36
 */
sre.NobleGermanTest.prototype.testSample_36 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>10</mn><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow>';
  this.executeRuleTest(mml, 'y ist gleich 10 minus 2 x', 'default');
  this.executeRuleTest(mml, 'y ist gleich 10 minus 2 x', 'brief');
  this.executeRuleTest(mml, 'y ist gleich 10 minus 2 x', 'sbrief');
};


/**
 * Testing Sample 37
 */
sre.NobleGermanTest.prototype.testSample_37 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>2</mn><msup><mrow><mi>x</mi>' +
      '</mrow><mrow><mn>3</mn></mrow></msup><mo>+</mo><mn>5</mn></mrow>';
  this.executeRuleTest(mml, 'y ist gleich 2 x Kubik plus 5', 'default');
  this.executeRuleTest(mml, 'y ist gleich 2 x Kubik plus 5', 'brief');
  this.executeRuleTest(mml, 'y ist gleich 2 x Kubik plus 5', 'sbrief');
};


/**
 * Testing Sample 38
 */
sre.NobleGermanTest.prototype.testSample_38 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mo>(</mo><msup><mrow><mo/><mi>x' +
      '</mi></mrow><mrow><mn>2</mn></mrow></msup><mo>+</mo><mn>1</mn>' +
      '<mrow><mo>)</mo><mo>(</mo><msup><mrow><mi>x</mi></mrow><mrow><mn>2' +
      '</mn></mrow></msup></mrow><mo>+</mo><mn>3</mn><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y ist gleich Klammer auf x Quadrat plus 1 Klammer zu Klammer auf x Quadrat plus 3 Klammer zu', 'default');
  this.executeRuleTest(mml, 'y ist gleich Klammer auf x Quadrat plus 1 Klammer zu Klammer auf x Quadrat plus 3 Klammer zu', 'brief');
  this.executeRuleTest(mml, 'y ist gleich Klammer auf x Quadrat plus 1 Klammer zu Klammer auf x Quadrat plus 3 Klammer zu', 'sbrief');
};


/**
 * Testing Sample 39
 */
sre.NobleGermanTest.prototype.testSample_39 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mn>0.5</mn></mrow>' +
      '<mrow><mi>x</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'y ist gleich 0,5 hoch x', 'default');
  this.executeRuleTest(mml, 'y ist gleich 0,5 hoch x', 'brief');
  this.executeRuleTest(mml, 'y ist gleich 0,5 hoch x', 'sbrief');
};


/**
 * Testing Sample 40
 */
sre.NobleGermanTest.prototype.testSample_40 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>22</mn><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow>';
  this.executeRuleTest(mml, 'y ist gleich 22 minus 2 x', 'default');
  this.executeRuleTest(mml, 'y ist gleich 22 minus 2 x', 'brief');
  this.executeRuleTest(mml, 'y ist gleich 22 minus 2 x', 'sbrief');
};


/**
 * Testing Sample 41
 */
sre.NobleGermanTest.prototype.testSample_41 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mfrac><mrow><mn>3</mn></mrow><mrow>' +
      '<mi>x</mi></mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'y ist gleich Anfang Bruch 3 durch x Ende Bruch', 'default');
  this.executeRuleTest(mml, 'y ist gleich Anfang Bruch 3 durch x Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'y ist gleich Bruch 3 durch x Ende Bruch', 'sbrief');
};


/**
 * Testing Sample 42
 */
sre.NobleGermanTest.prototype.testSample_42 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mo>(</mo><mi>x</mi><mo>+</mo><mn>4' +
      '</mn><mo>)</mo><mo>(</mo><mi>x</mi><mo>+</mo><mn>4</mn><mo>)</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, 'y ist gleich Klammer auf x plus 4 Klammer zu Klammer auf x plus 4 Klammer zu', 'default');
  this.executeRuleTest(mml, 'y ist gleich Klammer auf x plus 4 Klammer zu Klammer auf x plus 4 Klammer zu', 'brief');
  this.executeRuleTest(mml, 'y ist gleich Klammer auf x plus 4 Klammer zu Klammer auf x plus 4 Klammer zu', 'sbrief');
};


/**
 * Testing Sample 43
 */
sre.NobleGermanTest.prototype.testSample_43 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mo>(</mo><mn>4</mn><mi>x</mi><mo>−' +
      '</mo><mn>3</mn><mo>)</mo><mo>(</mo><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '<mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y ist gleich Klammer auf 4 x minus 3 Klammer zu Klammer auf x plus 1 Klammer zu', 'default');
  this.executeRuleTest(mml, 'y ist gleich Klammer auf 4 x minus 3 Klammer zu Klammer auf x plus 1 Klammer zu', 'brief');
  this.executeRuleTest(mml, 'y ist gleich Klammer auf 4 x minus 3 Klammer zu Klammer auf x plus 1 Klammer zu', 'sbrief');
};


/**
 * Testing Sample 44
 */
sre.NobleGermanTest.prototype.testSample_44 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>20</mn><mi>x</mi><mo>−</mo><mn>4' +
      '</mn><msup><mrow><mi>x</mi></mrow><mrow><mn>2</mn></mrow></msup>' +
      '</mrow>';
  this.executeRuleTest(mml, 'y ist gleich 20 x minus 4 x Quadrat', 'default');
  this.executeRuleTest(mml, 'y ist gleich 20 x minus 4 x Quadrat', 'brief');
  this.executeRuleTest(mml, 'y ist gleich 20 x minus 4 x Quadrat', 'sbrief');
};


/**
 * Testing Sample 45
 */
sre.NobleGermanTest.prototype.testSample_45 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mi>x</mi></mrow><mrow>' +
      '<mn>2</mn></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'y ist gleich x Quadrat', 'default');
  this.executeRuleTest(mml, 'y ist gleich x Quadrat', 'brief');
  this.executeRuleTest(mml, 'y ist gleich x Quadrat', 'sbrief');
};


/**
 * Testing Sample 46
 */
sre.NobleGermanTest.prototype.testSample_46 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mn>3</mn></mrow><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'y ist gleich 3 hoch x minus 1', 'default');
  this.executeRuleTest(mml, 'y ist gleich 3 hoch x minus 1', 'brief');
  this.executeRuleTest(mml, 'y ist gleich 3 hoch x minus 1', 'sbrief');
};


/**
 * Testing Sample 47
 */
sre.NobleGermanTest.prototype.testSample_47 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>16</mn><mo>−</mo><mn>2</mn><mo>(' +
      '</mo><mi>x</mi><mo>+</mo><mn>3</mn><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y ist gleich 16 minus 2 Klammer auf x plus 3 Klammer zu', 'default');
  this.executeRuleTest(mml, 'y ist gleich 16 minus 2 Klammer auf x plus 3 Klammer zu', 'brief');
  this.executeRuleTest(mml, 'y ist gleich 16 minus 2 Klammer auf x plus 3 Klammer zu', 'sbrief');
};


/**
 * Testing Sample 48
 */
sre.NobleGermanTest.prototype.testSample_48 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>4</mn><msup><mrow><mi>x</mi>' +
      '</mrow><mrow><mn>2</mn></mrow></msup><mo>−</mo><mi>x</mi><mo>−' +
      '</mo><mn>3</mn></mrow>';
  this.executeRuleTest(mml, 'y ist gleich 4 x Quadrat minus x minus 3',
                       'default');
  this.executeRuleTest(mml, 'y ist gleich 4 x Quadrat minus x minus 3', 'brief');
  this.executeRuleTest(mml, 'y ist gleich 4 x Quadrat minus x minus 3',
                       'sbrief');
};


/**
 * Testing Sample 49
 */
sre.NobleGermanTest.prototype.testSample_49 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mi>x</mi><mo>+</mo><mfrac><mrow>' +
      '<mn>1</mn></mrow><mrow><mi>x</mi></mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'y ist gleich x plus Anfang Bruch 1 durch x Ende Bruch', 'default');
  this.executeRuleTest(mml, 'y ist gleich x plus Anfang Bruch 1 durch x Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'y ist gleich x plus Bruch 1 durch x Ende Bruch', 'sbrief');
};


/**
 * Testing Sample 50
 */
sre.NobleGermanTest.prototype.testSample_50 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>4</mn><mi>x</mi><mo>(</mo><mn>5' +
      '</mn><mo>−</mo><mi>x</mi><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y ist gleich 4 x Klammer auf 5 minus x Klammer zu', 'default');
  this.executeRuleTest(mml, 'y ist gleich 4 x Klammer auf 5 minus x Klammer zu', 'brief');
  this.executeRuleTest(mml, 'y ist gleich 4 x Klammer auf 5 minus x Klammer zu', 'sbrief');
};


/**
 * Testing Sample 51
 */
sre.NobleGermanTest.prototype.testSample_51 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>2</mn><mo>(</mo><mi>x</mi><mo>−' +
      '</mo><mn>3</mn><mo>)</mo><mo>+</mo><mn>6</mn><mo>(</mo><mn>1</mn>' +
      '<mo>−</mo><mi>x</mi><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y ist gleich 2 Klammer auf x minus 3 Klammer zu plus 6 Klammer auf 1 minus x Klammer zu', 'default');
  this.executeRuleTest(mml, 'y ist gleich 2 Klammer auf x minus 3 Klammer zu plus 6 Klammer auf 1 minus x Klammer zu', 'brief');
  this.executeRuleTest(mml, 'y ist gleich 2 Klammer auf x minus 3 Klammer zu plus 6 Klammer auf 1 minus x Klammer zu', 'sbrief');
};


/**
 * Testing Sample 52
 */
sre.NobleGermanTest.prototype.testSample_52 = function() {
  var mml = '<mrow>' +
      '<mn>0.25</mn><mo>&#x003E;</mo><mfrac>' +
      '<mn>5</mn>' +
      '<mrow>' +
      '<mn>16</mn>' +
      '</mrow>' +
      '</mfrac>    ' +
      '</mrow>';
  this.executeRuleTest(mml, '0,25 größer als fünf sechzehntel', 'default');
  this.executeRuleTest(mml, '0,25 größer als fünf sechzehntel', 'brief');
  this.executeRuleTest(mml, '0,25 größer als fünf sechzehntel', 'sbrief');
};


/**
 * Testing Sample 53
 */
sre.NobleGermanTest.prototype.testSample_53 = function() {
  var mml = '<mrow>' +
      '<mn>32</mn><mo>&#x22C5;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mn>5</mn><mo>&#x22C5;</mo><mn>7</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '32 mal Klammer auf 5 mal 7 Klammer zu', 'default');
  this.executeRuleTest(mml, '32 mal Klammer auf 5 mal 7 Klammer zu', 'brief');
  this.executeRuleTest(mml, '32 mal Klammer auf 5 mal 7 Klammer zu', 'sbrief');
};


/**
 * Testing Sample 54
 */
sre.NobleGermanTest.prototype.testSample_54 = function() {
  var mml = '<mrow><mrow><mo>(</mo><mfrac><mrow><mn>1</mn></mrow><mrow>' +
      '<mn>2</mn></mrow></mfrac><mo>×</mo><mfrac><mrow><mn>1</mn></mrow>' +
      '<mrow><mn>2</mn></mrow></mfrac><mo>×</mo><mi>π</mi><mo>×</mo><mn>2' +
      '</mn><mo>)</mo></mrow><mo>+</mo><mrow><mo>(</mo><mn>2</mn><mo>×' +
      '</mo><mfrac><mrow><mn>1</mn></mrow><mrow><mn>2</mn></mrow></mfrac>' +
      '<mo>×</mo><mi>π</mi><mo>×</mo><mn>5</mn><mo>)</mo></mrow></mrow>';
  this.executeRuleTest(mml, 'Klammer auf ein halb mal ein halb mal pi mal 2 Klammer zu plus Klammer auf 2 mal ein halb mal pi mal 5 Klammer zu', 'default');
  this.executeRuleTest(mml, 'Klammer auf ein halb mal ein halb mal pi mal 2 Klammer zu plus Klammer auf 2 mal ein halb mal pi mal 5 Klammer zu',
                       'brief');
  this.executeRuleTest(mml, 'Klammer auf ein halb mal ein halb mal pi mal 2 Klammer zu plus Klammer auf 2 mal ein halb mal pi mal 5 Klammer zu', 'sbrief');
};


/**
 * Testing Sample 55
 */
sre.NobleGermanTest.prototype.testSample_55 = function() {
  var mml = '<mrow><munder><mtext>liminf</mtext><mrow><mi>n</mi>' +
      '<mo>&#x2192;</mo><mi>&#x221E;</mi></mrow></munder><msub><mi>E</mi>' +
      '<mrow><mi>n</mi></mrow></msub><mo>=</mo><munder><mo>&#x22C3;</mo>' +
      '<mrow><mi>n</mi><mo>&#x2265;</mo><mn>1</mn></mrow></munder>' +
      '<munder><mo>&#x22C2;</mo><mrow><mi>k</mi><mo>&#x2265;</mo><mi>n' +
      '</mi></mrow></munder><msub><mi>E</mi><mrow><mi>k</mi></mrow>' +
      '</msub><mo>,</mo><mspace width="0.2em" /><munder><mtext>limsup' +
      '</mtext><mrow><mi>n</mi><mo>&#x2192;</mo><mi>&#x221E;</mi></mrow>' +
      '</munder><msub><mi>E</mi><mrow><mi>n</mi></mrow></msub><mo>=</mo>' +
      '<munder><mo>&#x22C2;</mo><mrow><mi>n</mi><mo>&#x2265;</mo><mn>1' +
      '</mn></mrow></munder><munder><mo>&#x22C3;</mo><mrow><mi>k</mi>' +
      '<mo>&#x2265;</mo><mi>n</mi></mrow></munder><msub><mi>E</mi><mrow>' +
      '<mi>k</mi></mrow></msub><mo>.</mo></mrow>';
  this.executeRuleTest(mml, 'Limes inferior Unterschrift n Pfeil nach rechts unendlich Ende Unterschrift großes E Index n Grundlinie ist gleich N-stufige Vereinigung Unterschrift n größer oder gleich 1 Ende Unterschrift N-stufiger Durchschnitt Unterschrift k größer oder gleich n Ende Unterschrift großes E Index k Grundlinie Komma Limes superior Unterschrift n Pfeil nach rechts unendlich Ende Unterschrift großes E Index n Grundlinie ist gleich N-stufiger Durchschnitt Unterschrift n größer oder gleich 1 Ende Unterschrift N-stufige Vereinigung Unterschrift k größer oder gleich n Ende Unterschrift großes E Index k Grundlinie Punkt', 'default');
  this.executeRuleTest(mml, 'Limes inferior Unterschrift n Pfeil nach rechts unendlich Ende Unterschrift großes E Index n Grund ist gleich N-stufige Vereinigung Unterschrift n größer oder gleich 1 Ende Unterschrift N-stufiger Durchschnitt Unterschrift k größer oder gleich n Ende Unterschrift großes E Index k Grund Komma Limes superior Unterschrift n Pfeil nach rechts unendlich Ende Unterschrift großes E Index n Grund ist gleich N-stufiger Durchschnitt Unterschrift n größer oder gleich 1 Ende Unterschrift N-stufige Vereinigung Unterschrift k größer oder gleich n Ende Unterschrift großes E Index k Grund Punkt', 'brief');
  this.executeRuleTest(mml, 'Limes inferior Unterschrift n Pfeil nach rechts unendlich Ende Unterschrift großes E Index n Grund ist gleich N-stufige Vereinigung Unterschrift n größer oder gleich 1 Ende Unterschrift N-stufiger Durchschnitt Unterschrift k größer oder gleich n Ende Unterschrift großes E Index k Grund Komma Limes superior Unterschrift n Pfeil nach rechts unendlich Ende Unterschrift großes E Index n Grund ist gleich N-stufiger Durchschnitt Unterschrift n größer oder gleich 1 Ende Unterschrift N-stufige Vereinigung Unterschrift k größer oder gleich n Ende Unterschrift großes E Index k Grund Punkt', 'sbrief');
};


/**
 * Testing Sample 56
 */
sre.NobleGermanTest.prototype.testSample_56 = function() {
  var mml = '<mrow><mtable columnalign="left"><mtr><mtd columnalign="left">' +
      '<mrow><mtext>(i)</mtext></mrow></mtd><mtd columnalign="left">' +
      '<mrow><mspace width="0.2em" /><mi>&#x1D4AE;</mi><mo>&#x2208;</mo>' +
      '<mi>&#x1D49C;</mi><mo>;</mo></mrow></mtd></mtr><mtr><mtd' +
      ' columnalign="right" columnspan="1"><mrow><mtext>(ii)</mtext>' +
      '</mrow></mtd><mtd columnalign="left"><mrow><mspace width="0.2em"' +
      ' /><mtext>if</mtext><mi>E</mi><mo>&#x2208;</mo><mi>&#x1D49C;</mi>' +
      '<mspace width="0.2em" /><mtext>then</mtext><mspace width="0.2em"' +
      ' /><mover><mrow><mi>E</mi></mrow><mrow><mrow /><mo>&#x203E;</mo>' +
      '</mrow></mover><mo>&#x2208;</mo><mi>&#x1D49C;</mi><mo>;</mo>' +
      '</mrow></mtd></mtr><mtr><mtd columnalign="right" columnspan="1">' +
      '<mrow><mtext>(iii)</mtext></mrow></mtd><mtd columnalign="left">' +
      '<mrow><mspace width="0.2em" /><mtext>if</mtext><msub><mi>E</mi>' +
      '<mrow><mn>1</mn></mrow></msub><mo>,</mo><msub><mi>E</mi><mrow>' +
      '<mn>2</mn></mrow></msub><mo>&#x2208;</mo><mi>&#x1D49C;</mi><mspace' +
      ' width="0.2em" /><mtext>then</mtext><mspace width="0.2em" /><msub>' +
      '<mi>E</mi><mrow><mn>1</mn></mrow></msub><mo>&#x222A;</mo><msub>' +
      '<mi>E</mi><mrow><mn>2</mn></mrow></msub><mo>&#x2208;</mo>' +
      '<mi>&#x1D49C;</mi><mo>.</mo></mrow></mtd></mtr></mtable></mrow>';
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile 1. Spalte Klammer auf i Klammer zu 2. Spalte Schreibschrift großes S Element von Schreibschrift großes A Strichpunkt 2. Zeile 1. Spalte Klammer auf ii Klammer zu 2. Spalte if großes E Element von Schreibschrift großes A then großes E Überstrich Element von Schreibschrift großes A Strichpunkt 3. Zeile 1. Spalte Klammer auf iii Klammer zu 2. Spalte if großes E 1 Komma großes E 2 Element von Schreibschrift großes A then großes E 1 Vereinigung großes E 2 Element von Schreibschrift großes A Punkt Ende Anordnung', 'default');
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile 1. Spalte Klammer auf i Klammer zu 2. Spalte Schreibschrift großes S Element von Schreibschrift großes A Strichpunkt 2. Zeile 1. Spalte Klammer auf ii Klammer zu 2. Spalte if großes E Element von Schreibschrift großes A then mod oben großes E mit Überschrift Element von Schreibschrift großes A Strichpunkt 3. Zeile 1. Spalte Klammer auf iii Klammer zu 2. Spalte if großes E 1 Komma großes E 2 Element von Schreibschrift großes A then großes E 1 Vereinigung großes E 2 Element von Schreibschrift großes A Punkt Ende Anordnung', 'brief');
  this.executeRuleTest(mml, 'Anordnung 1. Zeile 1. Spalte Klammer auf i Klammer zu 2. Spalte Schreibschrift großes S Element von Schreibschrift großes A Strichpunkt 2. Zeile 1. Spalte Klammer auf ii Klammer zu 2. Spalte if großes E Element von Schreibschrift großes A then mod oben großes E mit Überschrift Element von Schreibschrift großes A Strichpunkt 3. Zeile 1. Spalte Klammer auf iii Klammer zu 2. Spalte if großes E 1 Komma großes E 2 Element von Schreibschrift großes A then großes E 1 Vereinigung großes E 2 Element von Schreibschrift großes A Punkt Ende Anordnung', 'sbrief');
};


/**
 * Testing Sample 57
 */
sre.NobleGermanTest.prototype.testSample_57 = function() {
  var mml = '<mrow><mtable columnalign="left"><mtr><mtd columnalign="left">' +
      '<mrow /></mtd><mtd columnalign="left"><mrow /></mtd><mtd' +
      ' columnalign="left"><mrow><mo stretchy="false">(</mo><mi' +
      ' mathvariant="normal">A</mi><mo mathvariant="normal">.</mo><mn>1' +
      '</mn><mo stretchy="false">)</mo><mspace width="0.2em" /><mi' +
      ' mathvariant="normal">If</mi><mspace width="0.2em" /><mi>A</mi>' +
      '<mo>&#x2208;</mo><mrow><mi>&#x2131;</mi></mrow><mspace' +
      ' width="0.2em" /><mi mathvariant="normal">then</mi><mspace' +
      ' width="0.2em" /><mn>0</mn><mo>&#x2264;</mo><mi>P</mi><mo' +
      ' stretchy="false">{</mo><mi>A</mi><mo stretchy="false">}</mo>' +
      '<mo>&#x2264;</mo><mn>1</mn><mo>.</mo></mrow></mtd><mtd' +
      ' columnalign="left"><mo stretchy="false">(</mo><mn>1</mn><mo' +
      ' stretchy="false">)</mo></mtd></mtr><mtr><mtd columnalign="right"' +
      ' columnspan="1"><mrow /></mtd><mtd columnalign="left"><mrow />' +
      '</mtd><mtd columnalign="left"><mrow><mo stretchy="false">(</mo><mi' +
      ' mathvariant="normal">A</mi><mo mathvariant="normal">.</mo><mn>2' +
      '</mn><mo stretchy="false">)</mo><mspace width="0.2em" /><mi>P</mi>' +
      '<mo stretchy="false">{</mo><mrow><mi>&#x1D4AE;</mi></mrow><mo' +
      ' stretchy="false">}</mo><mo>=</mo><mn>1</mn><mo>.</mo></mrow>' +
      '</mtd><mtd columnalign="left"><mo stretchy="false">(</mo><mn>2' +
      '</mn><mo stretchy="false">)</mo></mtd></mtr><mtr><mtd' +
      ' columnalign="right" columnspan="1"><mrow /></mtd><mtd' +
      ' columnalign="left"><mrow /></mtd><mtd columnalign="left"><mrow>' +
      '<mo stretchy="false">(</mo><mi mathvariant="normal">A</mi><mo' +
      ' mathvariant="normal">.</mo><mn>3</mn><mo stretchy="false">)</mo>' +
      '<mspace width="0.2em" /><mi mathvariant="normal">If</mi><mspace' +
      ' width="0.2em" /><mo stretchy="false">{</mo><msub><mi>E</mi><mrow>' +
      '<mi>n</mi></mrow></msub><mo>,</mo><mi>n</mi><mo>&#x2265;</mo><mn>1' +
      '</mn><mo stretchy="false">}</mo><mo>&#x2208;</mo><mrow>' +
      '<mi>&#x2131;</mi></mrow><mspace width="0.2em" /><mtext>is a' +
      ' sequence of</mtext><mspace width="0.2em" /><mtext>disjoint' +
      '</mtext></mrow></mtd><mtd columnalign="left"><mo' +
      ' stretchy="false">(</mo><mn>3</mn><mo stretchy="false">)</mo>' +
      '</mtd></mtr></mtable></mrow>';
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile 1. Spalte leer 2. Spalte leer 3. Spalte Klammer auf normales großes A Punkt 1 Klammer zu normales großes I f großes A Element von Schreibschrift großes F t h e n 0 kleiner oder gleich großes P geschwungene Klammer auf großes A geschwungene Klammer zu kleiner oder gleich 1 Punkt 4. Spalte Klammer auf 1 Klammer zu 2. Zeile 1. Spalte leer 2. Spalte leer 3. Spalte Klammer auf normales großes A Punkt 2 Klammer zu großes P geschwungene Klammer auf Schreibschrift großes S geschwungene Klammer zu ist gleich 1 Punkt 4. Spalte Klammer auf 2 Klammer zu 3. Zeile 1. Spalte leer 2. Spalte leer 3. Spalte Klammer auf normales großes A Punkt 3 Klammer zu normales großes I f geschwungene Klammer auf großes E Index n Grundlinie Komma n größer oder gleich 1 geschwungene Klammer zu Element von Schreibschrift großes F is a sequence of disjoint 4. Spalte Klammer auf 3 Klammer zu Ende Anordnung', 'default');
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile 1. Spalte leer 2. Spalte leer 3. Spalte Klammer auf normales großes A Punkt 1 Klammer zu normales großes I f großes A Element von Schreibschrift großes F t h e n 0 kleiner oder gleich großes P geschwungene Klammer auf großes A geschwungene Klammer zu kleiner oder gleich 1 Punkt 4. Spalte Klammer auf 1 Klammer zu 2. Zeile 1. Spalte leer 2. Spalte leer 3. Spalte Klammer auf normales großes A Punkt 2 Klammer zu großes P geschwungene Klammer auf Schreibschrift großes S geschwungene Klammer zu ist gleich 1 Punkt 4. Spalte Klammer auf 2 Klammer zu 3. Zeile 1. Spalte leer 2. Spalte leer 3. Spalte Klammer auf normales großes A Punkt 3 Klammer zu normales großes I f geschwungene Klammer auf großes E Index n Grund Komma n größer oder gleich 1 geschwungene Klammer zu Element von Schreibschrift großes F is a sequence of disjoint 4. Spalte Klammer auf 3 Klammer zu Ende Anordnung', 'brief');
  this.executeRuleTest(mml, 'Anordnung 1. Zeile 1. Spalte leer 2. Spalte leer 3. Spalte Klammer auf normales großes A Punkt 1 Klammer zu normales großes I f großes A Element von Schreibschrift großes F t h e n 0 kleiner oder gleich großes P geschwungene Klammer auf großes A geschwungene Klammer zu kleiner oder gleich 1 Punkt 4. Spalte Klammer auf 1 Klammer zu 2. Zeile 1. Spalte leer 2. Spalte leer 3. Spalte Klammer auf normales großes A Punkt 2 Klammer zu großes P geschwungene Klammer auf Schreibschrift großes S geschwungene Klammer zu ist gleich 1 Punkt 4. Spalte Klammer auf 2 Klammer zu 3. Zeile 1. Spalte leer 2. Spalte leer 3. Spalte Klammer auf normales großes A Punkt 3 Klammer zu normales großes I f geschwungene Klammer auf großes E Index n Grund Komma n größer oder gleich 1 geschwungene Klammer zu Element von Schreibschrift großes F is a sequence of disjoint 4. Spalte Klammer auf 3 Klammer zu Ende Anordnung', 'sbrief');
};


/**
 * Testing Sample 58
 */
sre.NobleGermanTest.prototype.testSample_58 = function() {
  var mml = '<mrow><mi>P</mi><mo stretchy="false">{</mo><msub><mi>B</mi>' +
      '<mrow><mi>j</mi></mrow></msub><mi>|</mi><mi>A</mi><mo' +
      ' stretchy="false">}</mo><mo>=</mo><mfrac><mrow><mi>P</mi><mo' +
      ' stretchy="false">{</mo><msub><mi>B</mi><mrow><mi>j</mi></mrow>' +
      '</msub><mo stretchy="false">}</mo><mi>P</mi><mo stretchy="false">{' +
      '</mo><mi>A</mi><mi>|</mi><msub><mi>B</mi><mrow><mi>j</mi></mrow>' +
      '</msub><mo stretchy="false">}</mo></mrow><mrow><munder>' +
      '<mo>&#x2211;</mo><mrow><mi>j</mi><mo>&#x2032;</mo><mo>&#x2208;' +
      '</mo><mi>J</mi></mrow></munder><mi>P</mi><mo stretchy="false">{' +
      '</mo><msub><mi>B</mi><mrow><mi>j</mi><mo>&#x2032;</mo></mrow>' +
      '</msub><mo stretchy="false">}</mo><mi>P</mi><mo stretchy="false">{' +
      '</mo><mi>A</mi><mi>|</mi><msub><mi>B</mi><mrow><mi>j</mi>' +
      '<mo>&#x2032;</mo></mrow></msub><mo stretchy="false">}</mo></mrow>' +
      '</mfrac><mo>.</mo></mrow>';
  this.executeRuleTest(mml, 'großes P geschwungene Klammer auf großes B Index j Grundlinie senkrechter Strich großes A geschwungene Klammer zu ist gleich Anfang Bruch großes P geschwungene Klammer auf großes B Index j Grundlinie geschwungene Klammer zu großes P geschwungene Klammer auf großes A senkrechter Strich großes B Index j Grundlinie geschwungene Klammer zu durch Summe Unterschrift j Strich Element von großes J Ende Unterschrift großes P geschwungene Klammer auf großes B Index j Strich Grundlinie geschwungene Klammer zu großes P geschwungene Klammer auf großes A senkrechter Strich großes B Index j Strich Grundlinie geschwungene Klammer zu Ende Bruch Punkt',
                       'default');
  this.executeRuleTest(mml, 'großes P geschwungene Klammer auf großes B Index j Grund senkrechter Strich großes A geschwungene Klammer zu ist gleich Anfang Bruch großes P geschwungene Klammer auf großes B Index j Grund geschwungene Klammer zu großes P geschwungene Klammer auf großes A senkrechter Strich großes B Index j Grund geschwungene Klammer zu durch Summe Unterschrift j Strich Element von großes J Ende Unterschrift großes P geschwungene Klammer auf großes B Index j Strich Grund geschwungene Klammer zu großes P geschwungene Klammer auf großes A senkrechter Strich großes B Index j Strich Grund geschwungene Klammer zu Ende Bruch Punkt', 'brief');
  this.executeRuleTest(mml, 'großes P geschwungene Klammer auf großes B Index j Grund senkrechter Strich großes A geschwungene Klammer zu ist gleich Bruch großes P geschwungene Klammer auf großes B Index j Grund geschwungene Klammer zu großes P geschwungene Klammer auf großes A senkrechter Strich großes B Index j Grund geschwungene Klammer zu durch Summe Unterschrift j Strich Element von großes J Ende Unterschrift großes P geschwungene Klammer auf großes B Index j Strich Grund geschwungene Klammer zu großes P geschwungene Klammer auf großes A senkrechter Strich großes B Index j Strich Grund geschwungene Klammer zu Ende Bruch Punkt', 'sbrief');
};


/**
 * Testing Sample 59
 */
sre.NobleGermanTest.prototype.testSample_59 = function() {
  var mml = '<mrow><msub><mi>&#x03BC;</mi><mrow><mn>1</mn></mrow></msub><mo' +
      ' stretchy="false">(</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=' +
      '</mo><msub><mo>&#x222B;</mo><mrow><mi>B</mi></mrow></msub><mi>f' +
      '</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)' +
      '</mo><mi>d</mi><msub><mi>&#x03BC;</mi><mrow><mn>2</mn></mrow>' +
      '</msub><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)' +
      '</mo></mrow>';
  this.executeRuleTest(mml, 'my 1 Klammer auf großes B Klammer zu ist gleich Integral Unterschrift großes B Ende Unterschrift f Klammer auf x Klammer zu d my 2 Klammer auf x Klammer zu', 'default');
  this.executeRuleTest(mml, 'my 1 Klammer auf großes B Klammer zu ist gleich Integral Unterschrift großes B Ende Unterschrift f Klammer auf x Klammer zu d my 2 Klammer auf x Klammer zu', 'brief');
  this.executeRuleTest(mml, 'my 1 Klammer auf großes B Klammer zu ist gleich Integral Unterschrift großes B Ende Unterschrift f Klammer auf x Klammer zu d my 2 Klammer auf x Klammer zu', 'sbrief');
};


/**
 * Testing Sample 60
 */
sre.NobleGermanTest.prototype.testSample_60 = function() {
  var mml = '<mrow><munder><mtext>lim</mtext><mrow><mi>n</mi><mo>&#x2192;' +
      '</mo><mi>&#x221E;</mi></mrow></munder><mi>E</mi><mo' +
      ' stretchy="false">{</mo><mo>&#x007C;</mo><msub><mi>X</mi><mrow>' +
      '<mi>n</mi></mrow></msub><mo>&#x2212;</mo><mi>X</mi><mo>&#x007C;' +
      '</mo><mo stretchy="false">}</mo><mo>=</mo><mi>E</mi><mrow><mo>{' +
      '</mo><munder><mtext>lim</mtext><mrow><mi>n</mi><mo>&#x2192;</mo>' +
      '<mi>&#x221E;</mi></mrow></munder><mo>&#x007C;</mo><msub><mi>X</mi>' +
      '<mrow><mi>n</mi></mrow></msub><mo>&#x2212;</mo><mi>X</mi>' +
      '<mo>&#x007C;</mo><mo>}</mo></mrow><mo>=</mo><mn>0</mn><mo>.</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, 'Limes Unterschrift n Pfeil nach rechts unendlich Ende Unterschrift großes E geschwungene Klammer auf Anfang Betrag großes X Index n Grundlinie minus großes X Ende Betrag geschwungene Klammer zu ist gleich großes E geschwungene Klammer auf Limes Unterschrift n Pfeil nach rechts unendlich Ende Unterschrift Anfang Betrag großes X Index n Grundlinie minus großes X Ende Betrag geschwungene Klammer zu ist gleich 0 Punkt', 'default');
  this.executeRuleTest(mml, 'Limes Unterschrift n Pfeil nach rechts unendlich Ende Unterschrift großes E geschwungene Klammer auf Anfang Betrag großes X Index n Grund minus großes X Ende Betrag geschwungene Klammer zu ist gleich großes E geschwungene Klammer auf Limes Unterschrift n Pfeil nach rechts unendlich Ende Unterschrift Anfang Betrag großes X Index n Grund minus großes X Ende Betrag geschwungene Klammer zu ist gleich 0 Punkt', 'brief');
  this.executeRuleTest(mml, 'Limes Unterschrift n Pfeil nach rechts unendlich Ende Unterschrift großes E geschwungene Klammer auf Betrag großes X Index n Grund minus großes X Ende Betrag geschwungene Klammer zu ist gleich großes E geschwungene Klammer auf Limes Unterschrift n Pfeil nach rechts unendlich Ende Unterschrift Betrag großes X Index n Grund minus großes X Ende Betrag geschwungene Klammer zu ist gleich 0 Punkt', 'sbrief');
};


/**
 * Testing Sample 61
 */
sre.NobleGermanTest.prototype.testSample_61 = function() {
  var mml = '<mrow><mtable columnalign="left"><mtr><mtd' +
      ' columnalign="left"><mrow><msub><mi>P</mi><mrow><mi>&#x03BC;' +
      '</mi><mo>,</mo>' +
      '<mi>&#x03C3;</mi></mrow></msub><mo stretchy="false">{</mo><mi>Y' +
      '</mi><mo>&#x2265;</mo><msub><mi>l</mi><mrow><mi>&#x03B2;</mi>' +
      '</mrow></msub><mo stretchy="false">(</mo><msub><mover><mrow><mi>Y' +
      '</mi></mrow><mrow><mrow /><mo>&#x203E;</mo></mrow></mover><mrow>' +
      '<mi>n</mi></mrow></msub><mo>,</mo><msub><mi>S</mi><mrow><mi>n</mi>' +
      '</mrow></msub><mo stretchy="false">)</mo><mo stretchy="false">}' +
      '</mo><mo>=</mo><msub><mi>P</mi><mrow><mi>&#x03BC;</mi><mo>,</mo>' +
      '<mi>&#x03C3;</mi></mrow></msub><mo stretchy="false">{</mo><mo' +
      ' stretchy="false">(</mo><mi>Y</mi><mo>&#x2212;</mo><msub><mover>' +
      '<mrow><mi>Y</mi></mrow><mrow><mrow /><mo>&#x203E;</mo></mrow>' +
      '</mover><mrow><mi>n</mi></mrow></msub><mo stretchy="false">)</mo>' +
      '<mo>/</mo><mrow><mo>(</mo><mi>S</mi><mo>&#x00B7;</mo><msup><mrow>' +
      '<mo>(</mo><mn>1</mn><mo>+</mo><mfrac><mrow><mn>1</mn></mrow><mrow>' +
      '<mi>n</mi></mrow></mfrac><mo>)</mo></mrow><mrow><mn>1</mn><mo>/' +
      '</mo><mn>2</mn></mrow></msup><mo>)</mo></mrow><mo>&#x2265;</mo>' +
      '<mo>&#x2212;</mo><msub><mi>t</mi><mrow><mi>&#x03B2;</mi></mrow>' +
      '</msub><mo stretchy="false">[</mo><mi>n</mi><mo>&#x2212;</mo><mn>1' +
      '</mn><mo stretchy="false">]</mo><mo stretchy="false">}</mo><mo>=' +
      '</mo><mi>&#x03B2;</mi><mo>,</mo></mrow></mtd></mtr><mtr><mtd' +
      ' columnalign="right" columnspan="1"><mrow /></mtd><mtd' +
      ' columnalign="left"><mo stretchy="false">(</mo><mn>1</mn><mo' +
      ' stretchy="false">)</mo></mtd></mtr></mtable></mrow>';
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile 1. Spalte großes P Index my Komma sigma Grundlinie geschwungene Klammer auf großes Y größer oder gleich l Index beta Grundlinie Klammer auf großes Y Überstrich Index n Grundlinie Komma großes S Index n Grundlinie Klammer zu geschwungene Klammer zu ist gleich großes P Index my Komma sigma Grundlinie geschwungene Klammer auf Klammer auf großes Y minus großes Y Überstrich Index n Grundlinie Klammer zu Schrägstrich Klammer auf großes S mal Klammer auf 1 plus Anfang Bruch 1 durch n Ende Bruch Klammer zu hoch 1 Schrägstrich 2 Grundlinie Klammer zu größer oder gleich minus t Index beta Grundlinie eckige Klammer auf n minus 1 eckige Klammer zu geschwungene Klammer zu ist gleich beta Komma 2. Zeile 1. Spalte leer 2. Spalte Klammer auf 1 Klammer zu Ende Anordnung', 'default');
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile 1. Spalte großes P Index my Komma sigma Grund geschwungene Klammer auf großes Y größer oder gleich l Index beta Grund Klammer auf mod oben großes Y mit Überschrift Index n Grund Komma großes S Index n Grund Klammer zu geschwungene Klammer zu ist gleich großes P Index my Komma sigma Grund geschwungene Klammer auf Klammer auf großes Y minus mod oben großes Y mit Überschrift Index n Grund Klammer zu Schrägstrich Klammer auf großes S mal Klammer auf 1 plus Anfang Bruch 1 durch n Ende Bruch Klammer zu hoch 1 Schrägstrich 2 Grund Klammer zu größer oder gleich minus t Index beta Grund eckige Klammer auf n minus 1 eckige Klammer zu geschwungene Klammer zu ist gleich beta Komma 2. Zeile 1. Spalte leer 2. Spalte Klammer auf 1 Klammer zu Ende Anordnung', 'brief');
  this.executeRuleTest(mml, 'Anordnung 1. Zeile 1. Spalte großes P Index my Komma sigma Grund geschwungene Klammer auf großes Y größer oder gleich l Index beta Grund Klammer auf mod oben großes Y mit Überschrift Index n Grund Komma großes S Index n Grund Klammer zu geschwungene Klammer zu ist gleich großes P Index my Komma sigma Grund geschwungene Klammer auf Klammer auf großes Y minus mod oben großes Y mit Überschrift Index n Grund Klammer zu Schrägstrich Klammer auf großes S mal Klammer auf 1 plus Bruch 1 durch n Ende Bruch Klammer zu hoch 1 Schrägstrich 2 Grund Klammer zu größer oder gleich minus t Index beta Grund eckige Klammer auf n minus 1 eckige Klammer zu geschwungene Klammer zu ist gleich beta Komma 2. Zeile 1. Spalte leer 2. Spalte Klammer auf 1 Klammer zu Ende Anordnung', 'sbrief');
};


/**
 * Testing Sample 62
 */
sre.NobleGermanTest.prototype.testSample_62 = function() {
  var mml = '<mrow><mi>L</mi><mo>=</mo><mrow><mo>(</mo><mtable><mtr><mtd' +
      ' columnalign="center"><mrow><mn>1</mn></mrow></mtd><mtd' +
      ' columnalign="center"><mrow><mspace width="0.2em" /><mo>&#x2212;' +
      '</mo><mn>1</mn></mrow></mtd><mtd columnalign="center"><mrow>' +
      '<mspace width="0.2em" /></mrow></mtd><mtd columnalign="center">' +
      '<mrow><mspace width="0.2em" /></mrow></mtd><mtd' +
      ' columnalign="center"><mrow><mspace width="0.2em" /></mrow></mtd>' +
      '<mtd columnalign="center"><mrow><mspace width="0.2em" /></mrow>' +
      '</mtd></mtr><mtr><mtd columnalign="center"><mrow /></mtd><mtd' +
      ' columnalign="center"><mrow><mspace width="0.2em" /><mn>1</mn>' +
      '</mrow></mtd><mtd columnalign="center"><mrow><mspace width="0.2em"' +
      ' /><mo>&#x2212;</mo><mn>1</mn></mrow></mtd><mtd' +
      ' columnalign="center"><mrow><mspace width="0.2em" /></mrow></mtd>' +
      '<mtd columnalign="center"><mrow><mspace width="0.2em" /><mn>0</mn>' +
      '</mrow></mtd><mtd columnalign="center"><mrow><mspace width="0.2em"' +
      ' /></mrow></mtd></mtr><mtr><mtd columnalign="center"><mrow />' +
      '</mtd><mtd columnalign="center"><mrow><mspace width="0.2em" />' +
      '</mrow></mtd><mtd columnalign="center"><mrow><mspace width="0.2em"' +
      ' /></mrow></mtd><mtd columnalign="center"><mrow><mspace' +
      ' width="0.2em" /></mrow></mtd><mtd columnalign="center"><mrow>' +
      '<mspace width="0.2em" /></mrow></mtd><mtd columnalign="center">' +
      '<mrow><mspace width="0.2em" /></mrow></mtd></mtr><mtr><mtd' +
      ' columnalign="center"><mrow /></mtd><mtd columnalign="center">' +
      '<mrow><mspace width="0.2em" /><mn>0</mn></mrow></mtd><mtd' +
      ' columnalign="center"><mrow><mspace width="0.2em" /></mrow></mtd>' +
      '<mtd columnalign="center"><mrow><mspace width="0.2em" /></mrow>' +
      '</mtd><mtd columnalign="center"><mrow><mspace width="0.2em" />' +
      '</mrow></mtd><mtd columnalign="center"><mrow><mspace width="0.2em"' +
      ' /></mrow></mtd></mtr><mtr><mtd columnalign="center"><mrow />' +
      '</mtd><mtd columnalign="center"><mrow><mspace width="0.2em" />' +
      '</mrow></mtd><mtd columnalign="center"><mrow><mspace width="0.2em"' +
      ' /></mrow></mtd><mtd columnalign="center"><mrow><mspace' +
      ' width="0.2em" /></mrow></mtd><mtd columnalign="center"><mrow>' +
      '<mspace width="0.2em" /><mn>1</mn></mrow></mtd><mtd' +
      ' columnalign="center"><mrow><mspace width="0.2em" /><mo>&#x2212;' +
      '</mo><mn>1</mn></mrow></mtd></mtr></mtable><mo>)</mo></mrow><mo>.' +
      '</mo></mrow>';
  this.executeRuleTest(mml, 'großes L ist gleich Anfang 5 mal 6 Matrize 1. Zeile 1. Spalte 1 2. Spalte minus 1 3. Spalte leer 4. Spalte leer 5. Spalte leer 6. Spalte leer 2. Zeile 1. Spalte leer 2. Spalte 1 3. Spalte minus 1 4. Spalte leer 5. Spalte 0 6. Spalte leer 3. Zeile 1. Spalte leer 2. Spalte leer 3. Spalte leer 4. Spalte leer 5. Spalte leer 6. Spalte leer 4. Zeile 1. Spalte leer 2. Spalte 0 3. Spalte leer 4. Spalte leer 5. Spalte leer 6. Spalte leer 5. Zeile 1. Spalte leer 2. Spalte leer 3. Spalte leer 4. Spalte leer 5. Spalte 1 6. Spalte minus 1 Ende Matrize Punkt',
                       'default');
  this.executeRuleTest(mml, 'großes L ist gleich Anfang 5 mal 6 Matrize 1. Zeile 1. Spalte 1 2. Spalte minus 1 3. Spalte leer 4. Spalte leer 5. Spalte leer 6. Spalte leer 2. Zeile 1. Spalte leer 2. Spalte 1 3. Spalte minus 1 4. Spalte leer 5. Spalte 0 6. Spalte leer 3. Zeile 1. Spalte leer 2. Spalte leer 3. Spalte leer 4. Spalte leer 5. Spalte leer 6. Spalte leer 4. Zeile 1. Spalte leer 2. Spalte 0 3. Spalte leer 4. Spalte leer 5. Spalte leer 6. Spalte leer 5. Zeile 1. Spalte leer 2. Spalte leer 3. Spalte leer 4. Spalte leer 5. Spalte 1 6. Spalte minus 1 Ende Matrize Punkt',
                       'brief');
  this.executeRuleTest(mml, 'großes L ist gleich 5 mal 6 Matrize 1. Zeile 1. Spalte 1 2. Spalte minus 1 3. Spalte leer 4. Spalte leer 5. Spalte leer 6. Spalte leer 2. Zeile 1. Spalte leer 2. Spalte 1 3. Spalte minus 1 4. Spalte leer 5. Spalte 0 6. Spalte leer 3. Zeile 1. Spalte leer 2. Spalte leer 3. Spalte leer 4. Spalte leer 5. Spalte leer 6. Spalte leer 4. Zeile 1. Spalte leer 2. Spalte 0 3. Spalte leer 4. Spalte leer 5. Spalte leer 6. Spalte leer 5. Zeile 1. Spalte leer 2. Spalte leer 3. Spalte leer 4. Spalte leer 5. Spalte 1 6. Spalte minus 1 Ende Matrize Punkt', 'sbrief');
};


/**
 * Testing Sample 63
 */
sre.NobleGermanTest.prototype.testSample_63 = function() {
  var mml = '<mrow><msqrt><mrow><mi>n</mi></mrow></msqrt><mo' +
      ' stretchy="false">[</mo><msub><mover><mrow><mi>Y</mi></mrow><mrow>' +
      '<mrow /><mo>&#x203E;</mo></mrow></mover><mrow><mi>n</mi></mrow>' +
      '</msub><mo>&#x2212;</mo><mo stretchy="false">(</mo><mi>&#x03BC;' +
      '</mi><mo>+</mo><msub><mi>z</mi><mrow><mi>&#x03B2;</mi></mrow>' +
      '</msub><mi>&#x03C3;</mi><mo stretchy="false">)</mo><mo' +
      ' stretchy="false">]</mo><mo>/</mo><msub><mi>S</mi><mrow><mi>n</mi>' +
      '</mrow></msub><mo>~</mo><mfrac><mrow><mi>U</mi><mo>+</mo><msqrt>' +
      '<mrow><mi>n</mi></mrow></msqrt><mspace width="0.2em" /><msub><mi>z' +
      '</mi><mrow><mn>1</mn><mo>&#x2212;</mo><mi>&#x03B2;</mi></mrow>' +
      '</msub></mrow><mrow><mo stretchy="false">(</mo><msup><mi>&#x03C7;' +
      '</mi><mrow><mn>2</mn></mrow></msup><mo stretchy="false">[</mo>' +
      '<mi>n</mi><mo>&#x2212;</mo><mn>1</mn><mo stretchy="false">]</mo>' +
      '<mo>/</mo><mo stretchy="false">(</mo><mi>n</mi><mo>&#x2212;</mo>' +
      '<mn>1</mn><mo stretchy="false">)</mo><mo stretchy="false">)</mo>' +
      '<msup><mi /><mrow><mn>1</mn><mo>/</mo><mn>2</mn></mrow></msup>' +
      '</mrow></mfrac><mo>~</mo><mi>t</mi><mo stretchy="false">[</mo>' +
      '<mi>n</mi><mo>&#x2212;</mo><mn>1</mn><mo>;</mo><msqrt><mrow><mi>n' +
      '</mi></mrow></msqrt><mspace width="0.2em" /><msub><mi>z</mi><mrow>' +
      '<mn>1</mn><mo>&#x2212;</mo><mi>&#x03B2;</mi></mrow></msub><mo' +
      ' stretchy="false">]</mo><mo>,</mo></mrow>';
  this.executeRuleTest(mml, 'Anfang Quadratwurzel n Ende Quadratwurzel eckige Klammer auf großes Y Überstrich Index n Grundlinie minus Klammer auf my plus z Index beta Grundlinie sigma Klammer zu eckige Klammer zu Schrägstrich großes S Index n Grundlinie tilde Anfang Bruch großes U plus Anfang Quadratwurzel n Ende Quadratwurzel z Index 1 minus beta Grundlinie durch Klammer auf chi Quadrat eckige Klammer auf n minus 1 eckige Klammer zu Schrägstrich Klammer auf n minus 1 Klammer zu Klammer zu hoch 1 Schrägstrich 2 Grundlinie Ende Bruch tilde t eckige Klammer auf n minus 1 Strichpunkt Anfang Quadratwurzel n Ende Quadratwurzel z Index 1 minus beta Grundlinie eckige Klammer zu Komma', 'default');
  this.executeRuleTest(mml, 'Anfang Quadratwurzel n Ende Quadratwurzel eckige Klammer auf mod oben großes Y mit Überschrift Index n Grund minus Klammer auf my plus z Index beta Grund sigma Klammer zu eckige Klammer zu Schrägstrich großes S Index n Grund tilde Anfang Bruch großes U plus Anfang Quadratwurzel n Ende Quadratwurzel z Index 1 minus beta Grund durch Klammer auf chi Quadrat eckige Klammer auf n minus 1 eckige Klammer zu Schrägstrich Klammer auf n minus 1 Klammer zu Klammer zu hoch 1 Schrägstrich 2 Grund Ende Bruch tilde t eckige Klammer auf n minus 1 Strichpunkt Anfang Quadratwurzel n Ende Quadratwurzel z Index 1 minus beta Grund eckige Klammer zu Komma', 'brief');
  this.executeRuleTest(mml, 'Quadratwurzel n Ende Quadratwurzel eckige Klammer auf mod oben großes Y mit Überschrift Index n Grund minus Klammer auf my plus z Index beta Grund sigma Klammer zu eckige Klammer zu Schrägstrich großes S Index n Grund tilde Bruch großes U plus Quadratwurzel n Ende Quadratwurzel z Index 1 minus beta Grund durch Klammer auf chi Quadrat eckige Klammer auf n minus 1 eckige Klammer zu Schrägstrich Klammer auf n minus 1 Klammer zu Klammer zu hoch 1 Schrägstrich 2 Grund Ende Bruch tilde t eckige Klammer auf n minus 1 Strichpunkt Quadratwurzel n Ende Quadratwurzel z Index 1 minus beta Grund eckige Klammer zu Komma',
                       'sbrief');
};


/**
 * Testing Sample 64
 */
sre.NobleGermanTest.prototype.testSample_64 = function() {
  var mml = '<mrow><mtable columnalign="left"><mtr><mtd columnalign="left">' +
      '<mrow><mi>&#x03B3;</mi></mrow></mtd><mtd columnalign="left"><mrow>' +
      '<mo>=</mo><mi>P</mi><mo stretchy="false">{</mo><msub><mi>E</mi>' +
      '<mrow><mi>p</mi><mo>,</mo><mi>q</mi></mrow></msub><mo>&#x2282;' +
      '</mo><mo stretchy="false">(</mo><msub><mi>X</mi><mrow><mo' +
      ' stretchy="false">(</mo><mi>r</mi><mo stretchy="false">)</mo>' +
      '</mrow></msub><mo>,</mo><msub><mi>X</mi><mrow><mo' +
      ' stretchy="false">(</mo><mi>s</mi><mo stretchy="false">)</mo>' +
      '</mrow></msub><mo stretchy="false">}</mo></mrow></mtd></mtr><mtr>' +
      '<mtd columnalign="right" columnspan="1"><mrow /></mtd><mtd' +
      ' columnalign="left"><mrow><mo>=</mo><mfrac><mrow><mi>n</mi><mo>!' +
      '</mo></mrow><mrow><mo stretchy="false">(</mo><mi>r</mi>' +
      '<mo>&#x2212;</mo><mn>1</mn><mo stretchy="false">)</mo><mo>!</mo>' +
      '</mrow></mfrac><munderover><mo>&#x2211;</mo><mrow><mi>j</mi><mo>=' +
      '</mo><mn>0</mn> </mrow><mrow><mi>s</mi><mo>&#x2212;</mo><mi>r</mi>' +
      '<mo>&#x2212;</mo><mn>1</mn></mrow></munderover><mo' +
      ' stretchy="false">(</mo><mo>&#x2212;</mo><mn>1</mn><mo' +
      ' stretchy="false">)</mo><msup><mi /><mrow><mi>j</mi></mrow></msup>' +
      '<mfrac><mrow><msup><mi>p</mi><mrow><mi>r</mi><mo>+</mo><mi>j</mi>' +
      '</mrow></msup></mrow><mrow><mo stretchy="false">(</mo><mi>n</mi>' +
      '<mo>&#x2212;</mo><mi>r</mi><mo>&#x2212;</mo><mi>j</mi><mo' +
      ' stretchy="false">)</mo><mo>!</mo><mi>j</mi><mo>!</mo></mrow>' +
      '</mfrac><msub><mi>I</mi><mrow><mn>1</mn><mo>&#x2212;</mo><mi>q' +
      '</mi></mrow></msub><mo stretchy="false">(</mo><mi>n</mi>' +
      '<mo>&#x2212;</mo><mi>s</mi><mo>+</mo><mn>1</mn><mo>,</mo><mi>s' +
      '</mi><mo>&#x2212;</mo><mi>r</mi><mo>&#x2212;</mo><mi>j</mi><mo' +
      ' stretchy="false">)</mo><mo>.</mo></mrow></mtd></mtr></mtable></mrow>';
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile 1. Spalte gamma 2. Spalte ist gleich großes P geschwungene Klammer auf großes E Index p Komma q Grundlinie echte Teilmenge von Klammer auf großes X Index Klammer auf r Klammer zu Grundlinie Komma großes X Index Klammer auf s Klammer zu Grundlinie geschwungene Klammer zu 2. Zeile 1. Spalte leer 2. Spalte ist gleich Anfang Bruch n Fakultät durch Klammer auf r minus 1 Klammer zu Fakultät Ende Bruch Summe Unterschrift j ist gleich 0 Überschrift s minus r minus 1 Ende Überschrift Klammer auf minus 1 Klammer zu hoch j Grundlinie Anfang Bruch p hoch r plus j Grundlinie durch Klammer auf n minus r minus j Klammer zu Fakultät j Fakultät Ende Bruch großes I Index 1 minus q Grundlinie Klammer auf n minus s plus 1 Komma s minus r minus j Klammer zu Punkt Ende Anordnung', 'default');
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile 1. Spalte gamma 2. Spalte ist gleich großes P geschwungene Klammer auf großes E Index p Komma q Grund echte Teilmenge von Klammer auf großes X Index Klammer auf r Klammer zu Grund Komma großes X Index Klammer auf s Klammer zu Grund geschwungene Klammer zu 2. Zeile 1. Spalte leer 2. Spalte ist gleich Anfang Bruch n Fakultät durch Klammer auf r minus 1 Klammer zu Fakultät Ende Bruch Summe Unterschrift j ist gleich 0 Überschrift s minus r minus 1 Ende Überschrift Klammer auf minus 1 Klammer zu hoch j Grund Anfang Bruch p hoch r plus j Grund durch Klammer auf n minus r minus j Klammer zu Fakultät j Fakultät Ende Bruch großes I Index 1 minus q Grund Klammer auf n minus s plus 1 Komma s minus r minus j Klammer zu Punkt Ende Anordnung', 'brief');
  this.executeRuleTest(mml, 'Anordnung 1. Zeile 1. Spalte gamma 2. Spalte ist gleich großes P geschwungene Klammer auf großes E Index p Komma q Grund echte Teilmenge von Klammer auf großes X Index Klammer auf r Klammer zu Grund Komma großes X Index Klammer auf s Klammer zu Grund geschwungene Klammer zu 2. Zeile 1. Spalte leer 2. Spalte ist gleich Bruch n Fakultät durch Klammer auf r minus 1 Klammer zu Fakultät Ende Bruch Summe Unterschrift j ist gleich 0 Überschrift s minus r minus 1 Ende Überschrift Klammer auf minus 1 Klammer zu hoch j Grund Bruch p hoch r plus j Grund durch Klammer auf n minus r minus j Klammer zu Fakultät j Fakultät Ende Bruch großes I Index 1 minus q Grund Klammer auf n minus s plus 1 Komma s minus r minus j Klammer zu Punkt Ende Anordnung', 'sbrief');
};


/**
 * Testing Sample 65
 */
sre.NobleGermanTest.prototype.testSample_65 = function() {
  var mml = '<mrow><msub><mrow><mi>S</mi></mrow><mrow><mi>i</mi></mrow>' +
      '</msub><mfenced open="[" close="]"><mrow><mtable><mtr><mtd><mi>t' +
      '</mi></mtd></mtr><mtr><mtd><mi>x</mi></mtd></mtr></mtable></mrow>' +
      '</mfenced><mo>=</mo><mfenced open="[" close="]"><mrow><mtable>' +
      '<mtr><mtd><mn>1</mn><mo stretchy="false">/</mo><mi>m</mi></mtd>' +
      '<mtd><mn>0</mn></mtd></mtr><mtr><mtd><msub><mrow><mi>a</mi></mrow>' +
      '<mrow><mi>i</mi></mrow></msub></mtd><mtd><msub><mrow><mi>r</mi>' +
      '</mrow><mrow><mi>i</mi></mrow></msub></mtd></mtr></mtable></mrow>' +
      '</mfenced><mfenced open="[" close="]"><mrow><mtable><mtr><mtd>' +
      '<mi>t</mi></mtd></mtr><mtr><mtd><mi>x</mi></mtd></mtr></mtable>' +
      '</mrow></mfenced><mo>+</mo><mfenced open="[" close="]"><mrow>' +
      '<mtable><mtr><mtd><mo stretchy="false">(</mo><mi>i</mi>' +
      '<mo>&#x2212;</mo><mn>1</mn><mo stretchy="false">)</mo><mo' +
      ' stretchy="false">/</mo><mi>m</mi></mtd></mtr><mtr><mtd><msub>' +
      '<mrow><mi>b</mi></mrow><mrow><mi>i</mi></mrow></msub></mtd></mtr>' +
      '</mtable></mrow></mfenced><mo>,</mo></mrow>';
  this.executeRuleTest(mml, 'großes S Index i Grundlinie Anfang Binomialkoeffizient x aus t Ende Binomialkoeffizient ist gleich Anfang 2 mal 2 Matrize 1. Zeile 1. Spalte 1 Schrägstrich m 2. Spalte 0 2. Zeile 1. Spalte a Index i Grundlinie 2. Spalte r Index i Grundlinie Ende Matrize Anfang Binomialkoeffizient x aus t Ende Binomialkoeffizient plus Anfang Binomialkoeffizient b Index i Grundlinie aus Klammer auf i minus 1 Klammer zu Schrägstrich m Ende Binomialkoeffizient Komma', 'default');
  this.executeRuleTest(mml, 'großes S Index i Grund Anfang Binomial x aus t Ende Binomial ist gleich Anfang 2 mal 2 Matrize 1. Zeile 1. Spalte 1 Schrägstrich m 2. Spalte 0 2. Zeile 1. Spalte a Index i Grund 2. Spalte r Index i Grund Ende Matrize Anfang Binomial x aus t Ende Binomial plus Anfang Binomial b Index i Grund aus Klammer auf i minus 1 Klammer zu Schrägstrich m Ende Binomial Komma', 'brief');
  this.executeRuleTest(mml, 'großes S Index i Grund Binomial x aus t Ende Binomial ist gleich 2 mal 2 Matrize 1. Zeile 1. Spalte 1 Schrägstrich m 2. Spalte 0 2. Zeile 1. Spalte a Index i Grund 2. Spalte r Index i Grund Ende Matrize Binomial x aus t Ende Binomial plus Binomial b Index i Grund aus Klammer auf i minus 1 Klammer zu Schrägstrich m Ende Binomial Komma', 'sbrief');
};


/**
 * Testing Sample 66
 */
sre.NobleGermanTest.prototype.testSample_66 = function() {
  var mml = '<mrow><msub><mrow><mi>c</mi></mrow><mrow><mn>1</mn></mrow>' +
      '</msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn><mo>&#x2212;' +
      '</mo><mn>2</mn><mi>s</mi></mrow></msup><mo>&#x2264;</mo><mfrac>' +
      '<mrow><mn>1</mn></mrow><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<msubsup><mrow><mo>&#x222B;</mo></mrow><mrow><mo>&#x2212;</mo>' +
      '<mi>T</mi></mrow><mrow><mi>T</mi></mrow></msubsup><msup><mrow><mo' +
      ' stretchy="false">(</mo><mi>f</mi><mo stretchy="false">(</mo><mi>t' +
      '</mi><mo>+</mo><mi>h</mi><mo stretchy="false">)</mo><mo>&#x2212;' +
      '</mo><mi>f</mi><mo stretchy="false">(</mo><mi>t</mi><mo' +
      ' stretchy="false">)</mo><mo stretchy="false">)</mo></mrow><mrow>' +
      '<mn>2</mn></mrow></msup><mi mathvariant="normal">d</mi><mi>t</mi>' +
      '<mo>&#x2264;</mo><msub><mrow><mi>c</mi></mrow><mrow><mn>2</mn>' +
      '</mrow></msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn>' +
      '<mo>&#x2212;</mo><mn>2</mn><mi>s</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'c 1 h hoch 4 minus 2 s Grundlinie kleiner oder gleich Anfang Bruch 1 durch 2 großes T Ende Bruch Integral Index minus großes T Hoch großes T Grundlinie Klammer auf f Klammer auf t plus h Klammer zu minus f Klammer auf t Klammer zu Klammer zu Quadrat normales d t kleiner oder gleich c 2 h hoch 4 minus 2 s', 'default');
  this.executeRuleTest(mml, 'c 1 h hoch 4 minus 2 s Grund kleiner oder gleich Anfang Bruch 1 durch 2 großes T Ende Bruch Integral Index minus großes T Hoch großes T Base Klammer auf f Klammer auf t plus h Klammer zu minus f Klammer auf t Klammer zu Klammer zu Quadrat normales d t kleiner oder gleich c 2 h hoch 4 minus 2 s', 'brief');
  this.executeRuleTest(mml, 'c 1 h hoch 4 minus 2 s Grund kleiner oder gleich Bruch 1 durch 2 großes T Ende Bruch Integral Index minus großes T Hoch großes T Base Klammer auf f Klammer auf t plus h Klammer zu minus f Klammer auf t Klammer zu Klammer zu Quadrat normales d t kleiner oder gleich c 2 h hoch 4 minus 2 s', 'sbrief');
};


/**
 * Testing Sample 67
 */
sre.NobleGermanTest.prototype.testSample_67 = function() {
  var mml = '<mrow><mi>C</mi><mo stretchy="false">(</mo><mn>0</mn><mo' +
      ' stretchy="false">)</mo><mo>&#x2212;</mo><mi>C</mi><mo' +
      ' stretchy="false">(</mo><mi>h</mi><mo stretchy="false">)</mo>' +
      '<mo>&#x2243;</mo><mi>c</mi><msup><mrow><mi>h</mi></mrow><mrow>' +
      '<mn>4</mn><mo>&#x2212;</mo><mn>2</mn><mi>s</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'großes C Klammer auf 0 Klammer zu minus großes C Klammer auf h Klammer zu asymptotisch gleich c h hoch 4 minus 2 s', 'default');
  this.executeRuleTest(mml, 'großes C Klammer auf 0 Klammer zu minus großes C Klammer auf h Klammer zu asymptotisch gleich c h hoch 4 minus 2 s', 'brief');
  this.executeRuleTest(mml, 'großes C Klammer auf 0 Klammer zu minus großes C Klammer auf h Klammer zu asymptotisch gleich c h hoch 4 minus 2 s', 'sbrief');
};


/**
 * Testing Sample 68
 */
sre.NobleGermanTest.prototype.testSample_68 = function() {
  var mml = '<mrow><mi>S</mi><mo stretchy="false">(</mo><mi>&#x03C9;</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><munder><mrow><mi>lim</mi>' +
      '</mrow><mrow><mi>T</mi><mo>&#x2192;</mo><mi>&#x221E;</mi></mrow>' +
      '</munder><mfrac><mrow><mn>1</mn></mrow><mrow><mn>2</mn><mi>T</mi>' +
      '</mrow></mfrac><msup><mrow><mfenced open="|" close="|"><msubsup>' +
      '<mrow><mo>&#x222B;</mo></mrow><mrow><mo>&#x2212;</mo><mi>T</mi>' +
      '</mrow><mrow><mi>T</mi></mrow></msubsup><mi>f</mi><mo' +
      ' stretchy="false">(</mo><mi>t</mi><mo stretchy="false">)</mo>' +
      '<msup><mrow><mi mathvariant="normal">e</mi></mrow><mrow><mi' +
      ' mathvariant="italic">it</mi><mi>&#x03C9;</mi></mrow></msup><mi' +
      ' mathvariant="normal">d</mi><mi>t</mi></mfenced></mrow><mrow><mn>2' +
      '</mn></mrow></msup><mo>.</mo></mrow>';
  this.executeRuleTest(mml, 'großes S Klammer auf omega Klammer zu ist gleich Limes Unterschrift großes T Pfeil nach rechts unendlich Ende Unterschrift Anfang Bruch 1 durch 2 großes T Ende Bruch Anfang Betrag Integral Index minus großes T Hoch großes T Grundlinie Komma f Komma Klammer auf Komma t Komma Klammer zu Komma normales e hoch i t omega Grundlinie Komma normales d Komma t Ende Betrag Quadrat Punkt', 'default');
  this.executeRuleTest(mml, 'großes S Klammer auf omega Klammer zu ist gleich Limes Unterschrift großes T Pfeil nach rechts unendlich Ende Unterschrift Anfang Bruch 1 durch 2 großes T Ende Bruch Anfang Betrag Integral Index minus großes T Hoch großes T Base Komma f Komma Klammer auf Komma t Komma Klammer zu Komma normales e hoch i t omega Grund Komma normales d Komma t Ende Betrag Quadrat Punkt', 'brief');
  this.executeRuleTest(mml, 'großes S Klammer auf omega Klammer zu ist gleich Limes Unterschrift großes T Pfeil nach rechts unendlich Ende Unterschrift Bruch 1 durch 2 großes T Ende Bruch Betrag Integral Index minus großes T Hoch großes T Base Komma f Komma Klammer auf Komma t Komma Klammer zu Komma normales e hoch i t omega Grund Komma normales d Komma t Ende Betrag Quadrat Punkt', 'sbrief');
};


/**
 * Testing Sample 69
 */
sre.NobleGermanTest.prototype.testSample_69 = function() {
  var mml = '<mrow><msubsup><mrow><mo>&#x222B;</mo></mrow><mrow><mn>0</mn>' +
      '</mrow><mrow><mn>1</mn></mrow></msubsup><mspace width="-0.2em" />' +
      '<msubsup><mrow><mo>&#x222B;</mo></mrow><mrow><mn>0</mn></mrow>' +
      '<mrow><mn>1</mn></mrow></msubsup><msup><mrow><mrow><mo' +
      ' stretchy="false">[</mo><mrow><mo>&#x007C;</mo><mi>f</mi><mo' +
      ' stretchy="false">(</mo><mi>t</mi><mo stretchy="false">)</mo>' +
      '<mo>&#x2212;</mo><mi>f</mi><mo stretchy="false">(</mo><mi>u</mi>' +
      '<mo stretchy="false">)</mo><msup><mrow><mo>&#x007C;</mo></mrow>' +
      '<mrow><mn>2</mn></mrow></msup><mo>+</mo><mo>&#x007C;</mo><mi>t' +
      '</mi><mo>&#x2212;</mo><mi>u</mi><msup><mrow><mo>&#x007C;</mo>' +
      '</mrow><mrow><mn>2</mn></mrow></msup></mrow><mo stretchy="false">]' +
      '</mo></mrow></mrow><mrow><mo>&#x2212;</mo><mi>s</mi><mo' +
      ' stretchy="false">/</mo><mn>2</mn></mrow></msup><mi' +
      ' mathvariant="normal">d</mi><mi>t</mi><mi mathvariant="normal">d' +
      '</mi><mi>u</mi><mo>&lt;</mo><mi>&#x221E;</mi></mrow>';
  this.executeRuleTest(mml, 'Integral Index 0 Hoch 1 Grundlinie Integral Index 0 Hoch 1 Grundlinie eckige Klammer auf Anfang Betrag f Klammer auf t Klammer zu minus f Klammer auf u Klammer zu Ende Betrag Quadrat plus Anfang Betrag t minus u Ende Betrag Quadrat eckige Klammer zu hoch minus s Schrägstrich 2 Grundlinie normales d t normales d u kleiner als unendlich',
                       'default');
  this.executeRuleTest(mml, 'Integral Index 0 Hoch 1 Base Integral Index 0 Hoch 1 Base eckige Klammer auf Anfang Betrag f Klammer auf t Klammer zu minus f Klammer auf u Klammer zu Ende Betrag Quadrat plus Anfang Betrag t minus u Ende Betrag Quadrat eckige Klammer zu hoch minus s Schrägstrich 2 Grund normales d t normales d u kleiner als unendlich',
                       'brief');
  this.executeRuleTest(mml, 'Integral Index 0 Hoch 1 Base Integral Index 0 Hoch 1 Base eckige Klammer auf Betrag f Klammer auf t Klammer zu minus f Klammer auf u Klammer zu Ende Betrag Quadrat plus Betrag t minus u Ende Betrag Quadrat eckige Klammer zu hoch minus s Schrägstrich 2 Grund normales d t normales d u kleiner als unendlich', 'sbrief');
};


/**
 * Testing Sample 70
 */
sre.NobleGermanTest.prototype.testSample_70 = function() {
  var mml = '<mrow><mi mathvariant="sans-serif">E</mi><mfenced open="("' +
      ' close=")"><mrow><munder><mrow><mo stretchy="true">&#x2211;</mo>' +
      '</mrow><mrow><mi>I</mi><mo>&#x2208;</mo><msub><mrow><mi>E</mi>' +
      '</mrow><mrow><mi>k</mi><mo>+</mo><mn>1</mn></mrow></msub></mrow>' +
      '</munder><mo>&#x007C;</mo><mi>I</mi><msup><mrow><mo>&#x007C;</mo>' +
      '</mrow><mrow><mi>s</mi></mrow></msup></mrow></mfenced><mo>=</mo>' +
      '<mi mathvariant="sans-serif">E</mi><mfenced open="(" close=")">' +
      '<mrow><munder><mrow><mo stretchy="true">&#x2211;</mo></mrow><mrow>' +
      '<mi>I</mi><mo>&#x2208;</mo><msub><mrow><mi>E</mi></mrow><mrow>' +
      '<mi>k</mi></mrow></msub></mrow></munder><mo>&#x007C;</mo><mi>I' +
      '</mi><msup><mrow><mo>&#x007C;</mo></mrow><mrow><mi>s</mi></mrow>' +
      '</msup></mrow></mfenced><mi mathvariant="sans-serif">E</mi><mo' +
      ' stretchy="false">(</mo><msubsup><mrow><mi>R</mi></mrow><mrow>' +
      '<mn>1</mn></mrow><mrow><mi>s</mi></mrow></msubsup><mo>+</mo>' +
      '<msubsup><mrow><mi>R</mi></mrow><mrow><mn>2</mn></mrow><mrow><mi>s' +
      '</mi></mrow></msubsup><mo stretchy="false">)</mo><mo>.</mo></mrow>';
  this.executeRuleTest(mml, 'serifenloses großes E Klammer auf Summe Unterschrift großes I Element von großes E Index k plus 1 Grundlinie Ende Unterschrift Anfang Betrag großes I Ende Betrag hoch s Grundlinie Klammer zu ist gleich serifenloses großes E Klammer auf Summe Unterschrift großes I Element von großes E Index k Grundlinie Ende Unterschrift Anfang Betrag großes I Ende Betrag hoch s Grundlinie Klammer zu serifenloses großes E Klammer auf großes R 1 hoch s Grundlinie plus großes R 2 hoch s Grundlinie Klammer zu Punkt', 'default');
  this.executeRuleTest(mml, 'serifenloses großes E Klammer auf Summe Unterschrift großes I Element von großes E Index k plus 1 Grund Ende Unterschrift Anfang Betrag großes I Ende Betrag hoch s Grund Klammer zu ist gleich serifenloses großes E Klammer auf Summe Unterschrift großes I Element von großes E Index k Grund Ende Unterschrift Anfang Betrag großes I Ende Betrag hoch s Grund Klammer zu serifenloses großes E Klammer auf großes R 1 hoch s Grund plus großes R 2 hoch s Grund Klammer zu Punkt',
                       'brief');
  this.executeRuleTest(mml, 'serifenloses großes E Klammer auf Summe Unterschrift großes I Element von großes E Index k plus 1 Grund Ende Unterschrift Betrag großes I Ende Betrag hoch s Grund Klammer zu ist gleich serifenloses großes E Klammer auf Summe Unterschrift großes I Element von großes E Index k Grund Ende Unterschrift Betrag großes I Ende Betrag hoch s Grund Klammer zu serifenloses großes E Klammer auf großes R 1 hoch s Grund plus großes R 2 hoch s Grund Klammer zu Punkt', 'sbrief');
};


/**
 * Testing Sample 71
 */
sre.NobleGermanTest.prototype.testSample_71 = function() {
  var mml = '<mrow>' +
      '<mo stretchy="false">(</mo><msub>' +
      '<mi>x</mi>' +
      '<mn>1</mn>' +
      '</msub>' +
      '<mo>,</mo><msub>' +
      '<mi>y</mi>' +
      '<mn>1</mn>' +
      '</msub>' +
      '<mo stretchy="false">)</mo></mrow>';
  this.executeRuleTest(mml, 'Klammer auf x 1 Komma y 1 Klammer zu',
                       'default');
  this.executeRuleTest(mml, 'Klammer auf x 1 Komma y 1 Klammer zu', 'brief');
  this.executeRuleTest(mml, 'Klammer auf x 1 Komma y 1 Klammer zu', 'sbrief');
};


/**
 * Testing Sample 72
 */
sre.NobleGermanTest.prototype.testSample_72 = function() {
  var mml = '<mrow>' +
      '<mo stretchy="false">(</mo><msub>' +
      '<mi>x</mi>' +
      '<mn>2</mn>' +
      '</msub>' +
      '<mo>,</mo><msub>' +
      '<mi>y</mi>' +
      '<mn>2</mn>' +
      '</msub>' +
      '<mo stretchy="false">)</mo></mrow>';
  this.executeRuleTest(mml, 'Klammer auf x 2 Komma y 2 Klammer zu',
                       'default');
  this.executeRuleTest(mml, 'Klammer auf x 2 Komma y 2 Klammer zu', 'brief');
  this.executeRuleTest(mml, 'Klammer auf x 2 Komma y 2 Klammer zu', 'sbrief');
};


/**
 * Testing Sample 73
 */
sre.NobleGermanTest.prototype.testSample_73 = function() {
  var mml = '<mrow>' +
      '<mi>d</mi><mo>=</mo><msqrt>' +
      '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mo stretchy="false">(</mo><msub>' +
      '<mi>x</mi>' +
      '<mn>2</mn>' +
      '</msub>' +
      '<mo>&#x2212;</mo><msub>' +
      '<mi>x</mi>' +
      '<mn>1</mn>' +
      '</msub>' +
      '<mo stretchy="false">)</mo></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo>+</mo><msup>' +
      '<mrow>' +
      '<mo stretchy="false">(</mo><msub>' +
      '<mi>y</mi>' +
      '<mn>2</mn>' +
      '</msub>' +
      '<mo>&#x2212;</mo><msub>' +
      '<mi>y</mi>' +
      '<mn>1</mn>' +
      '</msub>' +
      '<mo stretchy="false">)</mo></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '</msqrt>' +
      '</mrow>';
  this.executeRuleTest(mml, 'd ist gleich Anfang Quadratwurzel Klammer auf x 2 minus x 1 Klammer zu Quadrat plus Klammer auf y 2 minus y 1 Klammer zu Quadrat Ende Quadratwurzel', 'default');
  this.executeRuleTest(mml, 'd ist gleich Anfang Quadratwurzel Klammer auf x 2 minus x 1 Klammer zu Quadrat plus Klammer auf y 2 minus y 1 Klammer zu Quadrat Ende Quadratwurzel', 'brief');
  this.executeRuleTest(mml, 'd ist gleich Quadratwurzel Klammer auf x 2 minus x 1 Klammer zu Quadrat plus Klammer auf y 2 minus y 1 Klammer zu Quadrat Ende Quadratwurzel', 'sbrief');
};


/**
 * Testing Sample 74
 */
sre.NobleGermanTest.prototype.testSample_74 = function() {
  var mml = '<mi>&#x211D;</mi>';
  this.executeRuleTest(mml, 'großes R mit Doppelstrich', 'default');
  this.executeRuleTest(mml, 'großes R mit Doppelstrich', 'brief');
  this.executeRuleTest(mml, 'großes R mit Doppelstrich', 'sbrief');
};


/**
 * Testing Sample 75
 */
sre.NobleGermanTest.prototype.testSample_75 = function() {
  var mml = '<mrow>' +
      '<mi>&#x211D;</mi><mo>=</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mi>&#x221E;</mi><mo>,</mo><mi>&#x221E;</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>';
  this.executeRuleTest(mml, 'großes R mit Doppelstrich ist gleich Klammer auf minus unendlich Komma unendlich Klammer zu', 'default');
  this.executeRuleTest(mml, 'großes R mit Doppelstrich ist gleich Klammer auf minus unendlich Komma unendlich Klammer zu', 'brief');
  this.executeRuleTest(mml, 'großes R mit Doppelstrich ist gleich Klammer auf minus unendlich Komma unendlich Klammer zu', 'sbrief');
};


/**
 * Testing Sample 76
 */
sre.NobleGermanTest.prototype.testSample_76 = function() {
  var mml = '<mrow><mrow><mo>{</mo> <mrow>' +
      '<mn>1</mn><mo>,</mo><mn>2</mn><mo>,</mo><mn>3</mn></mrow> <mo>}</mo>' +
      '</mrow></mrow>';
  this.executeRuleTest(mml, 'Anfang Menge 1 Komma 2 Komma 3 Ende Menge', 'default');
  this.executeRuleTest(mml, 'Anfang Menge 1 Komma 2 Komma 3 Ende Menge', 'brief');
  this.executeRuleTest(mml, 'Menge 1 Komma 2 Komma 3 Ende Menge', 'sbrief');
};


/**
 * Testing Sample 77
 */
sre.NobleGermanTest.prototype.testSample_77 = function() {
  var mml = '<mrow>' +
      '<mn>1</mn><mo>&#x2208;</mo><mi>S</mi></mrow>';
  this.executeRuleTest(mml, '1 Element von großes S', 'default');
  this.executeRuleTest(mml, '1 Element von großes S', 'brief');
  this.executeRuleTest(mml, '1 Element von großes S', 'sbrief');
};


/**
 * Testing Sample 78
 */
sre.NobleGermanTest.prototype.testSample_78 = function() {
  var mml = '<mrow>' +
      '<mn>3</mn><mo>&#x2208;</mo><mi>S</mi></mrow>';
  this.executeRuleTest(mml, '3 Element von großes S', 'default');
  this.executeRuleTest(mml, '3 Element von großes S', 'brief');
  this.executeRuleTest(mml, '3 Element von großes S', 'sbrief');
};


/**
 * Testing Sample 79
 */
sre.NobleGermanTest.prototype.testSample_79 = function() {
  var mml = '<mrow>' +
      '<mn>4</mn><mo>&#x2209;</mo><mi>S</mi></mrow>';
  this.executeRuleTest(mml, '4 nicht Element von großes S', 'default');
  this.executeRuleTest(mml, '4 nicht Element von großes S', 'brief');
  this.executeRuleTest(mml, '4 nicht Element von großes S', 'sbrief');
};


/**
 * Testing Sample 80
 */
sre.NobleGermanTest.prototype.testSample_80 = function() {
  var mml = '<mrow>' +
      '<mi>a</mi><mo>=</mo><msqrt>' +
      '<mrow>' +
      '<mn>3</mn><mi>x</mi><mo>&#x2212;</mo><mn>1</mn></mrow>' +
      '</msqrt>' +
      '<mo>+</mo><msup>' +
      '<mrow>' +
      '<mo stretchy="false">(</mo><mn>1</mn><mo>+</mo><mi>x</mi><mo' +
      ' stretchy="false">)</mo></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>';
  this.executeRuleTest(mml, 'a ist gleich Anfang Quadratwurzel 3 x minus 1 Ende Quadratwurzel plus Klammer auf 1 plus x Klammer zu Quadrat', 'default');
  this.executeRuleTest(mml, 'a ist gleich Anfang Quadratwurzel 3 x minus 1 Ende Quadratwurzel plus Klammer auf 1 plus x Klammer zu Quadrat', 'brief');
  this.executeRuleTest(mml, 'a ist gleich Quadratwurzel 3 x minus 1 Ende Quadratwurzel plus Klammer auf 1 plus x Klammer zu Quadrat', 'sbrief');
};


/**
 * Testing Sample 81
 */
sre.NobleGermanTest.prototype.testSample_81 = function() {
  var mml = '<mrow>' +
      '<mi>a</mi><mo>=</mo><mfrac>' +
      '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>b</mi><mo>+</mo><mi>c</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '<mi>d</mi>' +
      '</mfrac>' +
      '<mo>+</mo><mfrac>' +
      '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>e</mi><mo>+</mo><mi>f</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '<mi>g</mi>' +
      '</mfrac>' +
      '</mrow>';
  this.executeRuleTest(mml, 'a ist gleich Anfang Bruch Klammer auf b plus c Klammer zu Quadrat durch d Ende Bruch plus Anfang Bruch Klammer auf e plus f Klammer zu Quadrat durch g Ende Bruch', 'default');
  this.executeRuleTest(mml, 'a ist gleich Anfang Bruch Klammer auf b plus c Klammer zu Quadrat durch d Ende Bruch plus Anfang Bruch Klammer auf e plus f Klammer zu Quadrat durch g Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'a ist gleich Bruch Klammer auf b plus c Klammer zu Quadrat durch d Ende Bruch plus Bruch Klammer auf e plus f Klammer zu Quadrat durch g Ende Bruch', 'sbrief');
};


/**
 * Testing Sample 82
 */
sre.NobleGermanTest.prototype.testSample_82 = function() {
  var mml = '<mrow><mi>x</mi><mo>=</mo><mrow><mo>[</mo> <mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>a</mi><mo>+</mo><mi>b</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>c</mi><mo>&#x2212;</mo><mi>b</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow> <mo>]</mo></mrow><mo>+</mo><mrow><mo>[</mo> <mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>d</mi><mo>+</mo><mi>e</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>f</mi><mo>&#x2212;</mo><mi>e</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow> <mo>]</mo></mrow></mrow>';
  this.executeRuleTest(mml, 'x ist gleich eckige Klammer auf Klammer auf a plus b Klammer zu Quadrat Klammer auf c minus b Klammer zu Quadrat eckige Klammer zu plus eckige Klammer auf Klammer auf d plus e Klammer zu Quadrat Klammer auf f minus e Klammer zu Quadrat eckige Klammer zu',
                       'default');
  this.executeRuleTest(mml, 'x ist gleich eckige Klammer auf Klammer auf a plus b Klammer zu Quadrat Klammer auf c minus b Klammer zu Quadrat eckige Klammer zu plus eckige Klammer auf Klammer auf d plus e Klammer zu Quadrat Klammer auf f minus e Klammer zu Quadrat eckige Klammer zu',
                       'brief');
  this.executeRuleTest(mml, 'x ist gleich eckige Klammer auf Klammer auf a plus b Klammer zu Quadrat Klammer auf c minus b Klammer zu Quadrat eckige Klammer zu plus eckige Klammer auf Klammer auf d plus e Klammer zu Quadrat Klammer auf f minus e Klammer zu Quadrat eckige Klammer zu',
                       'sbrief');
};


/**
 * Testing Sample 83
 */
sre.NobleGermanTest.prototype.testSample_83 = function() {
  var mml = '<mrow>' +
      '<mi>x</mi><mo>=</mo><mrow><mo>[</mo> <mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>a</mi><mo>+</mo><mi>b</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow> <mo>]</mo></mrow><mo>+</mo><mrow><mo>[</mo> <mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>f</mi><mo>&#x2212;</mo><mi>e</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow> <mo>]</mo></mrow></mrow>';
  this.executeRuleTest(mml, 'x ist gleich eckige Klammer auf Klammer auf a plus b Klammer zu Quadrat eckige Klammer zu plus eckige Klammer auf Klammer auf f minus e Klammer zu Quadrat eckige Klammer zu', 'default');
  this.executeRuleTest(mml, 'x ist gleich eckige Klammer auf Klammer auf a plus b Klammer zu Quadrat eckige Klammer zu plus eckige Klammer auf Klammer auf f minus e Klammer zu Quadrat eckige Klammer zu', 'brief');
  this.executeRuleTest(mml, 'x ist gleich eckige Klammer auf Klammer auf a plus b Klammer zu Quadrat eckige Klammer zu plus eckige Klammer auf Klammer auf f minus e Klammer zu Quadrat eckige Klammer zu', 'sbrief');
};


/**
 * Testing Sample 84
 */
sre.NobleGermanTest.prototype.testSample_84 = function() {
  var mml = '<mrow>' +
      '<mi>x</mi><mo>=</mo><mrow><mo>[</mo> <mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>a</mi><mo>+</mo><mi>b</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow> <mo>]</mo></mrow></mrow>';
  this.executeRuleTest(mml, 'x ist gleich eckige Klammer auf Klammer auf a plus b Klammer zu Quadrat eckige Klammer zu', 'default');
  this.executeRuleTest(mml, 'x ist gleich eckige Klammer auf Klammer auf a plus b Klammer zu Quadrat eckige Klammer zu', 'brief');
  this.executeRuleTest(mml, 'x ist gleich eckige Klammer auf Klammer auf a plus b Klammer zu Quadrat eckige Klammer zu', 'sbrief');
};


/**
 * Testing Sample 85
 */
sre.NobleGermanTest.prototype.testSample_85 = function() {
  var mml = '<mrow>' +
      '<mi>x</mi><mo>=</mo><msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>a</mi><mo>+</mo><mi>b</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>';
  this.executeRuleTest(mml, 'x ist gleich Klammer auf a plus b Klammer zu Quadrat', 'default');
  this.executeRuleTest(mml, 'x ist gleich Klammer auf a plus b Klammer zu Quadrat', 'brief');
  this.executeRuleTest(mml, 'x ist gleich Klammer auf a plus b Klammer zu Quadrat', 'sbrief');
};


/**
 * Testing Sample 86
 */
sre.NobleGermanTest.prototype.testSample_86 = function() {
  var mml = '<mrow><mi>x</mi><mo>=</mo><mi>a</mi><mo>+</mo><msup>' +
      '<mi>b</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>';
  this.executeRuleTest(mml, 'x ist gleich a plus b Quadrat', 'default');
  this.executeRuleTest(mml, 'x ist gleich a plus b Quadrat', 'brief');
  this.executeRuleTest(mml, 'x ist gleich a plus b Quadrat', 'sbrief');
};


/**
 * Testing Sample 87
 */
sre.NobleGermanTest.prototype.testSample_87 = function() {
  var mml = '<mrow>' +
      '<mfrac>' +
      '<mrow>' +
      '<mfrac>' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '</mfrac>' +
      '</mrow>' +
      '<mrow>' +
      '<mfrac>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfrac>' +
      '</mrow>' +
      '</mfrac>' +
      '<mo>=</mo><mfrac>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '</mfrac>' +
      '</mrow>';
  this.executeRuleTest(mml, 'Anfang Bruch ein halb durch drei viertel Ende Bruch ist gleich zwei drittel', 'default');
  this.executeRuleTest(mml, 'Anfang Bruch ein halb durch drei viertel Ende Bruch ist gleich zwei drittel', 'brief');
  this.executeRuleTest(mml, 'Bruch ein halb durch drei viertel Ende Bruch ist gleich zwei drittel', 'sbrief');
};


/**
 * Testing Sample 88
 */
sre.NobleGermanTest.prototype.testSample_88 = function() {
  var mml = '<mrow>' +
      '<mn>2</mn><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>x</mi><mo>+</mo><mn>3</mn></mrow>' +
      '<mo>)</mo></mrow><mo>&#x2212;</mo><mn>4</mn><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>x</mi><mo>&#x2212;</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>x</mi><mo>+</mo><mn>2</mn></mrow>' +
      '<mo>)</mo></mrow><mo>&#x2212;</mo><mn>3</mn></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow><mo>=</mo><mi>y</mi></mrow>';
  this.executeRuleTest(mml, '2 Klammer auf Klammer auf x plus 1 Klammer zu Klammer auf x plus 3 Klammer zu minus 4 Klammer auf Klammer auf x minus 1 Klammer zu Klammer auf x plus 2 Klammer zu minus 3 Klammer zu Klammer zu ist gleich y', 'default');
  this.executeRuleTest(mml, '2 Klammer auf Klammer auf x plus 1 Klammer zu Klammer auf x plus 3 Klammer zu minus 4 Klammer auf Klammer auf x minus 1 Klammer zu Klammer auf x plus 2 Klammer zu minus 3 Klammer zu Klammer zu ist gleich y', 'brief');
  this.executeRuleTest(mml, '2 Klammer auf Klammer auf x plus 1 Klammer zu Klammer auf x plus 3 Klammer zu minus 4 Klammer auf Klammer auf x minus 1 Klammer zu Klammer auf x plus 2 Klammer zu minus 3 Klammer zu Klammer zu ist gleich y', 'sbrief');
};


/**
 * Testing Sample 89
 */
sre.NobleGermanTest.prototype.testSample_89 = function() {
  var mml = '<mrow><mi>cos</mi><mi>x</mi><mo>=</mo><mn>1</mn>' +
      '<mo>&#x2212;</mo><mfrac>' +
      '<mrow>' +
      '<msup>' +
      '<mi>x</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '<mrow>' +
      '<mn>2</mn><mo>!</mo></mrow>' +
      '</mfrac>' +
      '<mo>+</mo><mfrac>' +
      '<mrow>' +
      '<msup>' +
      '<mi>x</mi>' +
      '<mn>4</mn>' +
      '</msup>' +
      '</mrow>' +
      '<mrow>' +
      '<mn>4</mn><mo>!</mo></mrow>' +
      '</mfrac>' +
      '<mo>&#x2212;</mo><mo>&#x2026;</mo></mrow>';
  this.executeRuleTest(mml, 'Kosinus x ist gleich 1 minus Anfang Bruch x Quadrat durch 2 Fakultät Ende Bruch plus Anfang Bruch x hoch 4 Grundlinie durch 4 Fakultät Ende Bruch minus horizontale Ellipsis', 'default');
  this.executeRuleTest(mml, 'Kosinus x ist gleich 1 minus Anfang Bruch x Quadrat durch 2 Fakultät Ende Bruch plus Anfang Bruch x hoch 4 Grund durch 4 Fakultät Ende Bruch minus horizontale Ellipsis', 'brief');
  this.executeRuleTest(mml, 'Kosinus x ist gleich 1 minus Bruch x Quadrat durch 2 Fakultät Ende Bruch plus Bruch x hoch 4 Grund durch 4 Fakultät Ende Bruch minus horizontale Ellipsis', 'sbrief');
};


/**
 * Testing Sample 90
 */
sre.NobleGermanTest.prototype.testSample_90 = function() {
  var mml = '<mrow><mi>x</mi><mo>=</mo><mfrac>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mi>b</mi><mo>&#x00B1;</mo><msqrt>' +
      '<mrow>' +
      '<msup>' +
      '<mi>b</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo>&#x2212;</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow>' +
      '</msqrt>' +
      '</mrow>' +
      '<mrow>' +
      '<mn>2</mn><mi>a</mi></mrow>' +
      '</mfrac>' +
      '</mrow>';
  this.executeRuleTest(mml, 'x ist gleich Anfang Bruch minus b plus minus Anfang Quadratwurzel b Quadrat minus 4 a c Ende Quadratwurzel durch 2 a Ende Bruch', 'default');
  this.executeRuleTest(mml, 'x ist gleich Anfang Bruch minus b plus minus Anfang Quadratwurzel b Quadrat minus 4 a c Ende Quadratwurzel durch 2 a Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'x ist gleich Bruch minus b plus minus Quadratwurzel b Quadrat minus 4 a c Ende Quadratwurzel durch 2 a Ende Bruch', 'sbrief');
};


/**
 * Testing Sample 91
 */
sre.NobleGermanTest.prototype.testSample_91 = function() {
  var mml = '<mrow><mi>x</mi><mo>+</mo><msup>' +
      '<mi>y</mi>' +
      '<mrow>' +
      '<mfrac>' +
      '<mn>2</mn>' +
      '<mrow>' +
      '<mi>k</mi><mo>+</mo><mn>1</mn></mrow>' +
      '</mfrac>' +
      '</mrow>' +
      '</msup>' +
      '</mrow>';
  this.executeRuleTest(mml, 'x plus y hoch Anfang Bruch 2 durch k plus 1 Ende Bruch', 'default');
  this.executeRuleTest(mml, 'x plus y hoch Anfang Bruch 2 durch k plus 1 Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'x plus y hoch Bruch 2 durch k plus 1 Ende Bruch', 'sbrief');
};


/**
 * Testing Sample 92
 */
sre.NobleGermanTest.prototype.testSample_92 = function() {
  var mml = '<mrow><munder>' +
      '<mrow>' +
      '<mi>lim</mi></mrow>' +
      '<mrow>' +
      '<mi>x</mi><mo>&#x2192;</mo><mn>0</mn></mrow>' +
      '</munder>' +
      '<mfrac>' +
      '<mrow>' +
      '<mi>sin</mi><mi>x</mi></mrow>' +
      '<mi>x</mi>' +
      '</mfrac>' +
      '<mo>=</mo><mn>1</mn></mrow>';
  this.executeRuleTest(mml, 'Limes Unterschrift x Pfeil nach rechts 0 Ende Unterschrift Anfang Bruch Sinus x durch x Ende Bruch ist gleich 1', 'default');
  this.executeRuleTest(mml, 'Limes Unterschrift x Pfeil nach rechts 0 Ende Unterschrift Anfang Bruch Sinus x durch x Ende Bruch ist gleich 1', 'brief');
  this.executeRuleTest(mml, 'Limes Unterschrift x Pfeil nach rechts 0 Ende Unterschrift Bruch Sinus x durch x Ende Bruch ist gleich 1', 'sbrief');
};


/**
 * Testing Sample 93
 */
sre.NobleGermanTest.prototype.testSample_93 = function() {
  var mml = '<mrow><mi>d</mi><mo>=</mo><msqrt>' +
      '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mo stretchy="false">(</mo><msub>' +
      '<mi>x</mi>' +
      '<mn>2</mn>' +
      '</msub>' +
      '<mo>&#x2212;</mo><msub>' +
      '<mi>x</mi>' +
      '<mn>1</mn>' +
      '</msub>' +
      '<mo stretchy="false">)</mo></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo>+</mo><msup>' +
      '<mrow>' +
      '<mo stretchy="false">(</mo><msub>' +
      '<mi>y</mi>' +
      '<mn>2</mn>' +
      '</msub>' +
      '<mo>&#x2212;</mo><msub>' +
      '<mi>y</mi>' +
      '<mn>1</mn>' +
      '</msub>' +
      '<mo stretchy="false">)</mo></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '</msqrt>' +
      '</mrow>';
  this.executeRuleTest(mml, 'd ist gleich Anfang Quadratwurzel Klammer auf x 2 minus x 1 Klammer zu Quadrat plus Klammer auf y 2 minus y 1 Klammer zu Quadrat Ende Quadratwurzel', 'default');
  this.executeRuleTest(mml, 'd ist gleich Anfang Quadratwurzel Klammer auf x 2 minus x 1 Klammer zu Quadrat plus Klammer auf y 2 minus y 1 Klammer zu Quadrat Ende Quadratwurzel', 'brief');
  this.executeRuleTest(mml, 'd ist gleich Quadratwurzel Klammer auf x 2 minus x 1 Klammer zu Quadrat plus Klammer auf y 2 minus y 1 Klammer zu Quadrat Ende Quadratwurzel', 'sbrief');
};


/**
 * Testing Sample 94
 */
sre.NobleGermanTest.prototype.testSample_94 = function() {
  var mml = '<mrow>' +
      '<msub>' +
      '<mi>F</mi>' +
      '<mi>n</mi>' +
      '</msub>' +
      '<mo>=</mo><msub>' +
      '<mi>F</mi>' +
      '<mrow>' +
      '<mi>n</mi><mo>&#x2212;</mo><mn>1</mn></mrow>' +
      '</msub>' +
      '<mo>+</mo><msub>' +
      '<mi>F</mi>' +
      '<mrow>' +
      '<mi>n</mi><mo>&#x2212;</mo><mn>2</mn></mrow>' +
      '</msub>' +
      '</mrow>';
  this.executeRuleTest(mml, 'großes F Index n Grundlinie ist gleich großes F Index n minus 1 Grundlinie plus großes F Index n minus 2', 'default');
  this.executeRuleTest(mml, 'großes F Index n Grund ist gleich großes F Index n minus 1 Grund plus großes F Index n minus 2', 'brief');
  this.executeRuleTest(mml, 'großes F Index n Grund ist gleich großes F Index n minus 1 Grund plus großes F Index n minus 2', 'sbrief');
};


/**
 * Testing Sample 95
 */
sre.NobleGermanTest.prototype.testSample_95 = function() {
  var mml = '<mrow>' +
      '<mi mathvariant="bold">Π</mi>' +
      '<mo>=</mo>' +
      '<mo>(</mo>' +
      '<mtable>' +
      '<mtr>' +
      '<mtd columnalign="right">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>11</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>12</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="left">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>12</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '</mtr>' +
      '<mtr>' +
      '<mtd columnalign="right">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>12</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>11</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="left">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>12</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '</mtr>' +
      '<mtr>' +
      '<mtd columnalign="right">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>12</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>12</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="left">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>11</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '</mtr>' +
      '<mtr>' +
      '<mtd columnalign="right">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="left">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>44</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '</mtr>' +
      '<mtr>' +
      '<mtd columnalign="right">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="left">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>44</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '</mtr>' +
      '<mtr>' +
      '<mtd columnalign="right">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="left">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>44</mn>' +
      '</msub>' +
      '</mtd>' +
      '</mtr>' +
      '</mtable>' +
      '<mo>)</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, 'fettes großes Pi ist gleich Anfang 6 mal 6 Matrize 1. Zeile 1. Spalte pi 11 2. Spalte pi 12 3. Spalte pi 12 4. Spalte 0 5. Spalte 0 6. Spalte 0 2. Zeile 1. Spalte pi 12 2. Spalte pi 11 3. Spalte pi 12 4. Spalte 0 5. Spalte 0 6. Spalte 0 3. Zeile 1. Spalte pi 12 2. Spalte pi 12 3. Spalte pi 11 4. Spalte 0 5. Spalte 0 6. Spalte 0 4. Zeile 1. Spalte 0 2. Spalte 0 3. Spalte 0 4. Spalte pi 44 5. Spalte 0 6. Spalte 0 5. Zeile 1. Spalte 0 2. Spalte 0 3. Spalte 0 4. Spalte 0 5. Spalte pi 44 6. Spalte 0 6. Zeile 1. Spalte 0 2. Spalte 0 3. Spalte 0 4. Spalte 0 5. Spalte 0 6. Spalte pi 44 Ende Matrize', 'default');
  this.executeRuleTest(mml, 'fettes großes Pi ist gleich Anfang 6 mal 6 Matrize 1. Zeile 1. Spalte pi 11 2. Spalte pi 12 3. Spalte pi 12 4. Spalte 0 5. Spalte 0 6. Spalte 0 2. Zeile 1. Spalte pi 12 2. Spalte pi 11 3. Spalte pi 12 4. Spalte 0 5. Spalte 0 6. Spalte 0 3. Zeile 1. Spalte pi 12 2. Spalte pi 12 3. Spalte pi 11 4. Spalte 0 5. Spalte 0 6. Spalte 0 4. Zeile 1. Spalte 0 2. Spalte 0 3. Spalte 0 4. Spalte pi 44 5. Spalte 0 6. Spalte 0 5. Zeile 1. Spalte 0 2. Spalte 0 3. Spalte 0 4. Spalte 0 5. Spalte pi 44 6. Spalte 0 6. Zeile 1. Spalte 0 2. Spalte 0 3. Spalte 0 4. Spalte 0 5. Spalte 0 6. Spalte pi 44 Ende Matrize', 'brief');
  this.executeRuleTest(mml, 'fettes großes Pi ist gleich 6 mal 6 Matrize 1. Zeile 1. Spalte pi 11 2. Spalte pi 12 3. Spalte pi 12 4. Spalte 0 5. Spalte 0 6. Spalte 0 2. Zeile 1. Spalte pi 12 2. Spalte pi 11 3. Spalte pi 12 4. Spalte 0 5. Spalte 0 6. Spalte 0 3. Zeile 1. Spalte pi 12 2. Spalte pi 12 3. Spalte pi 11 4. Spalte 0 5. Spalte 0 6. Spalte 0 4. Zeile 1. Spalte 0 2. Spalte 0 3. Spalte 0 4. Spalte pi 44 5. Spalte 0 6. Spalte 0 5. Zeile 1. Spalte 0 2. Spalte 0 3. Spalte 0 4. Spalte 0 5. Spalte pi 44 6. Spalte 0 6. Zeile 1. Spalte 0 2. Spalte 0 3. Spalte 0 4. Spalte 0 5. Spalte 0 6. Spalte pi 44 Ende Matrize', 'sbrief');
};


/**
 * Testing Sample 96
 */
sre.NobleGermanTest.prototype.testSample_96 = function() {
  var mml = '<mrow>' +
      '<msub>' +
      '<mi>s</mi>' +
      '<mn>11</mn>' +
      '</msub>' +
      '<mo>=</mo>' +
      '<mfrac>' +
      '<mrow>' +
      '<msub>' +
      '<mi>c</mi>' +
      '<mn>11</mn>' +
      '</msub>' +
      '<mo>+</mo>' +
      '<msub>' +
      '<mi>c</mi>' +
      '<mn>12</mn>' +
      '</msub>' +
      '</mrow>' +
      '<mrow>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<msub>' +
      '<mi>c</mi>' +
      '<mn>11</mn>' +
      '</msub>' +
      '<mo>−</mo>' +
      '<msub>' +
      '<mi>c</mi>' +
      '<mn>12</mn>' +
      '</msub>' +
      '</mrow>' +
      '</mfenced>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<msub>' +
      '<mi>c</mi>' +
      '<mn>11</mn>' +
      '</msub>' +
      '<mo>+</mo>' +
      '<mrow>' +
      '<mn>2</mn>' +
      '<msub>' +
      '<mi>c</mi>' +
      '<mn>12</mn>' +
      '</msub>' +
      '</mrow>' +
      '</mrow>' +
      '</mfenced>' +
      '</mrow>' +
      '</mfrac>' +
      '</mrow>';
  this.executeRuleTest(mml, 's 11 ist gleich Anfang Bruch c 11 plus c 12 durch Klammer auf c 11 minus c 12 Klammer zu Klammer auf c 11 plus 2 c 12 Klammer zu Ende Bruch',
                       'default');
  this.executeRuleTest(mml, 's 11 ist gleich Anfang Bruch c 11 plus c 12 durch Klammer auf c 11 minus c 12 Klammer zu Klammer auf c 11 plus 2 c 12 Klammer zu Ende Bruch', 'brief');
  this.executeRuleTest(mml, 's 11 ist gleich Bruch c 11 plus c 12 durch Klammer auf c 11 minus c 12 Klammer zu Klammer auf c 11 plus 2 c 12 Klammer zu Ende Bruch', 'sbrief');
};


/**
 * Testing Sample 97
 */
sre.NobleGermanTest.prototype.testSample_97 = function() {
  var mml = '<mrow>' +
      '<mi mathvariant="normal">Si</mi>' +
      '<msub><mi mathvariant="normal">O</mi>' +
      '<mn>2</mn>' +
      '</msub>' +
      '<mo>+</mo>    ' +
      '<mn>6</mn>' +
      '<mi mathvariant="normal">H</mi>' +
      '<mi mathvariant="normal">F</mi>' +
      '<mo>&#x2192;</mo>        ' +
      '<msub>' +
      '<mi mathvariant="normal">H</mi>' +
      '<mn>2</mn>' +
      '</msub>    ' +
      '<mi mathvariant="normal">Si</mi>' +
      '<msub><mi mathvariant="normal">F</mi>' +
      '<mn>6</mn>' +
      '</msub>' +
      '<mo>+</mo>    ' +
      '<mn>2</mn>' +
      '<msub>' +
      '<mi mathvariant="normal">H</mi>' +
      '<mn>2</mn>' +
      '</msub>' +
      '<mi mathvariant="normal">O</mi>    ' +
      '</mrow>';
  this.executeRuleTest(mml, 'normales großes S i normales großes O 2 plus 6 normales großes H normales großes F Pfeil nach rechts normales großes H 2 normales großes S i normales großes F 6 plus 2 normales großes H 2 normales großes O', 'default');
  this.executeRuleTest(mml, 'normales großes S i normales großes O 2 plus 6 normales großes H normales großes F Pfeil nach rechts normales großes H 2 normales großes S i normales großes F 6 plus 2 normales großes H 2 normales großes O', 'brief');
  this.executeRuleTest(mml, 'normales großes S i normales großes O 2 plus 6 normales großes H normales großes F Pfeil nach rechts normales großes H 2 normales großes S i normales großes F 6 plus 2 normales großes H 2 normales großes O', 'sbrief');
};


/**
 * Testing Sample 98
 */
sre.NobleGermanTest.prototype.testSample_98 = function() {
  var mml = '<mrow>' +
      '<mfrac>' +
      '<mtext>d</mtext>' +
      '<mrow>' +
      '<mtext>d</mtext>' +
      '<mi>x</mi>' +
      '</mrow>' +
      '</mfrac>' +
      '<mrow>' +
      '<mo stretchy="true">(</mo>' +
      '<mrow>' +
      '<mi>E</mi>' +
      '<mo stretchy="false">(</mo>' +
      '<mi>x</mi>' +
      '<mo stretchy="false">)</mo>' +
      '<mi>A</mi>' +
      '<mo stretchy="false">(</mo>' +
      '<mi>x</mi>' +
      '<mo stretchy="false">)</mo>' +
      '<mfrac>' +
      '<mrow>' +
      '<mtext>d</mtext>' +
      '<mi>w</mi>' +
      '<mo stretchy="false">(</mo>' +
      '<mi>x</mi>' +
      '<mo stretchy="false">)</mo>' +
      '</mrow>' +
      '<mrow>' +
      '<mtext>d</mtext>' +
      '<mi>x</mi>' +
      '</mrow>' +
      '</mfrac>' +
      '</mrow>' +
      '<mo stretchy="true">)</mo>' +
      '</mrow>' +
      '<mo>+</mo>' +
      '<mi>p</mi>' +
      '<mo stretchy="false">(</mo>' +
      '<mi>x</mi>' +
      '<mo stretchy="false">)</mo>' +
      '<mo>=</mo>' +
      '<mn>0</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'Anfang Bruch d durch d x Ende Bruch Klammer auf großes E Klammer auf x Klammer zu großes A Klammer auf x Klammer zu Anfang Bruch d w Klammer auf x Klammer zu durch d x Ende Bruch Klammer zu plus p Klammer auf x Klammer zu ist gleich 0', 'default');
  this.executeRuleTest(mml, 'Anfang Bruch d durch d x Ende Bruch Klammer auf großes E Klammer auf x Klammer zu großes A Klammer auf x Klammer zu Anfang Bruch d w Klammer auf x Klammer zu durch d x Ende Bruch Klammer zu plus p Klammer auf x Klammer zu ist gleich 0', 'brief');
  this.executeRuleTest(mml, 'Bruch d durch d x Ende Bruch Klammer auf großes E Klammer auf x Klammer zu großes A Klammer auf x Klammer zu Bruch d w Klammer auf x Klammer zu durch d x Ende Bruch Klammer zu plus p Klammer auf x Klammer zu ist gleich 0', 'sbrief');
};


/**
 * Testing Sample 99
 */
sre.NobleGermanTest.prototype.testSample_99 = function() {
  var mml = '<mrow><msub>' +
      '<mtext>TCS</mtext>' +
      '<mtext>gas</mtext>' +
      '</msub>' +
      '<mo>=</mo>' +
      '<mrow>' +
      '<mo>−</mo>' +
      '<mrow>' +
      '<mfrac>' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '</mfrac>' +
      '<mfenced open="(" close=")">' +
      '<mfrac>' +
      '<msub>' +
      '<mi>P</mi>' +
      '<mtext>seal</mtext>' +
      '</msub>' +
      '<msub>' +
      '<mi>P</mi>' +
      '<mtext>max</mtext>' +
      '</msub>' +
      '</mfrac>' +
      '</mfenced>' +
      '<mfenced open="(" close=")">' +
      '<mfrac>' +
      '<mn>1</mn>' +
      '<msub>' +
      '<mi>T</mi>' +
      '<mtext>seal</mtext>' +
      '</msub>' +
      '</mfrac>' +
      '</mfenced>' +
      '</mrow>' +
      '</mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, 'TCS Index gas Grundlinie ist gleich minus ein halb Klammer auf Anfang Bruch großes P Index seal Grundlinie durch großes P Index Maximum Grundlinie Ende Bruch Klammer zu Klammer auf Anfang Bruch 1 durch großes T Index seal Grundlinie Ende Bruch Klammer zu',
                       'default');
  this.executeRuleTest(mml, 'TCS Index gas Grund ist gleich minus ein halb Klammer auf Anfang Bruch großes P Index seal Grund durch großes P Index Maximum Grund Ende Bruch Klammer zu Klammer auf Anfang Bruch 1 durch großes T Index seal Grund Ende Bruch Klammer zu', 'brief');
  this.executeRuleTest(mml, 'TCS Index gas Grund ist gleich minus ein halb Klammer auf Bruch großes P Index seal Grund durch großes P Index Maximum Grund Ende Bruch Klammer zu Klammer auf Bruch 1 durch großes T Index seal Grund Ende Bruch Klammer zu', 'sbrief');
};


/**
 * Testing Sample 100
 */
sre.NobleGermanTest.prototype.testSample_100 = function() {
  var mml = '<mrow>' +
      '<msub>' +
      '<mi>B</mi>' +
      '<mi>p</mi>' +
      '</msub>' +
      '<mo>=</mo>' +
      '<mfrac>' +
      '<mrow>' +
      '<mrow>' +
      '<mfrac>' +
      '<mrow>' +
      '<mn>7</mn>' +
      '<mo>−</mo>' +
      '<msup>' +
      '<mi>v</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '<mn>3</mn>' +
      '</mfrac>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<mn>1</mn>' +
      '<mo>+</mo>' +
      '<mfrac>' +
      '<msup>' +
      '<mi>c</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<msup>' +
      '<mi>a</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mfrac>' +
      '<mo>+</mo>' +
      '<mfrac>' +
      '<msup>' +
      '<mi>c</mi>' +
      '<mn>4</mn>' +
      '</msup>' +
      '<msup>' +
      '<mi>a</mi>' +
      '<mn>4</mn>' +
      '</msup>' +
      '</mfrac>' +
      '</mrow>' +
      '</mfenced>' +
      '</mrow>' +
      '<mo>+</mo>' +
      '<mfrac>' +
      '<mrow>' +
      '<msup>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<mn>3</mn>' +
      '<mo>−</mo>' +
      '<mi>v</mi>' +
      '</mrow>' +
      '</mfenced>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<msup>' +
      '<mi>c</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '<mrow>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<mn>1</mn>' +
      '<mo>+</mo>' +
      '<mi>v</mi>' +
      '</mrow>' +
      '</mfenced>' +
      '<msup>' +
      '<mi>a</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '</mfrac>' +
      '</mrow>' +
      '<mrow>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<mn>1</mn>' +
      '<mo>−</mo>' +
      '<mi>v</mi>' +
      '</mrow>' +
      '</mfenced>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<mn>1</mn>' +
      '<mo>−</mo>' +
      '<mfrac>' +
      '<msup>' +
      '<mi>c</mi>' +
      '<mn>4</mn>' +
      '</msup>' +
      '<msup>' +
      '<mi>a</mi>' +
      '<mn>4</mn>' +
      '</msup>' +
      '</mfrac>' +
      '</mrow>' +
      '</mfenced>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<mn>1</mn>' +
      '<mo>−</mo>' +
      '<mfrac>' +
      '<msup>' +
      '<mi>c</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<msup>' +
      '<mi>a</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mfrac>' +
      '</mrow>' +
      '</mfenced>' +
      '</mrow>' +
      '</mfrac>' +
      '</mrow>';
  this.executeRuleTest(mml, 'großes B Index p Grundlinie ist gleich Anfang Anfang Bruch Anfang Bruch 7 minus v Quadrat durch 3 Ende Bruch Klammer auf 1 plus Anfang Bruch c Quadrat durch a Quadrat Ende Bruch plus Anfang Bruch c hoch 4 Grundlinie durch a hoch 4 Grundlinie Ende Bruch Klammer zu plus Anfang Bruch Klammer auf 3 minus v Klammer zu Quadrat c Quadrat durch Klammer auf 1 plus v Klammer zu a Quadrat Ende Bruch durch durch Klammer auf 1 minus v Klammer zu Klammer auf 1 minus Anfang Bruch c hoch 4 Grundlinie durch a hoch 4 Grundlinie Ende Bruch Klammer zu Klammer auf 1 minus Anfang Bruch c Quadrat durch a Quadrat Ende Bruch Klammer zu Ende Ende Bruch', 'default');
  this.executeRuleTest(mml, 'großes B Index p Grund ist gleich Anfang Anfang Bruch Anfang Bruch 7 minus v Quadrat durch 3 Ende Bruch Klammer auf 1 plus Anfang Bruch c Quadrat durch a Quadrat Ende Bruch plus Anfang Bruch c hoch 4 Grund durch a hoch 4 Grund Ende Bruch Klammer zu plus Anfang Bruch Klammer auf 3 minus v Klammer zu Quadrat c Quadrat durch Klammer auf 1 plus v Klammer zu a Quadrat Ende Bruch durch durch Klammer auf 1 minus v Klammer zu Klammer auf 1 minus Anfang Bruch c hoch 4 Grund durch a hoch 4 Grund Ende Bruch Klammer zu Klammer auf 1 minus Anfang Bruch c Quadrat durch a Quadrat Ende Bruch Klammer zu Ende Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'großes B Index p Grund ist gleich geschachteltBruch Bruch 7 minus v Quadrat durch 3 Ende Bruch Klammer auf 1 plus Bruch c Quadrat durch a Quadrat Ende Bruch plus Bruch c hoch 4 Grund durch a hoch 4 Grund Ende Bruch Klammer zu plus Bruch Klammer auf 3 minus v Klammer zu Quadrat c Quadrat durch Klammer auf 1 plus v Klammer zu a Quadrat Ende Bruch geschachteltdurch Klammer auf 1 minus v Klammer zu Klammer auf 1 minus Bruch c hoch 4 Grund durch a hoch 4 Grund Ende Bruch Klammer zu Klammer auf 1 minus Bruch c Quadrat durch a Quadrat Ende Bruch Klammer zu geschachteltEnde Bruch', 'sbrief');
};


/**
 * Testing Sample 101
 */
sre.NobleGermanTest.prototype.testSample_101 = function() {
  var mml = '<mrow>' +
      '<msubsup>' +
      '<mi>Q</mi>' +
      '<mtext>tank</mtext>' +
      '<mtext>series</mtext>' +
      '</msubsup>' +
      '<mo>=</mo>' +
      '<mrow>' +
      '<mfrac>' +
      '<mn>1</mn>' +
      '<msub>' +
      '<mi>R</mi>' +
      '<mtext>s</mtext>' +
      '</msub>' +
      '</mfrac>' +
      '<msqrt>' +
      '<mfrac>' +
      '<msub>' +
      '<mi>L</mi>' +
      '<mtext>s</mtext>' +
      '</msub>' +
      '<msub>' +
      '<mi>C</mi>' +
      '<mtext>s</mtext>' +
      '</msub>' +
      '</mfrac>' +
      '</msqrt>' +
      '</mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, 'großes Q Index tank hoch series Grundlinie ist gleich Anfang Bruch 1 durch großes R Index s Grundlinie Ende Bruch Anfang Quadratwurzel Anfang Bruch großes L Index s Grundlinie durch großes C Index s Grundlinie Ende Bruch Ende Quadratwurzel', 'default');
  this.executeRuleTest(mml, 'großes Q Index tank hoch series Grund ist gleich Anfang Bruch 1 durch großes R Index s Grund Ende Bruch Anfang Quadratwurzel Anfang Bruch großes L Index s Grund durch großes C Index s Grund Ende Bruch Ende Quadratwurzel', 'brief');
  this.executeRuleTest(mml, 'großes Q Index tank hoch series Grund ist gleich Bruch 1 durch großes R Index s Grund Ende Bruch Quadratwurzel Bruch großes L Index s Grund durch großes C Index s Grund Ende Bruch Ende Quadratwurzel', 'sbrief');
};


/**
 * Testing Sample 102
 */
sre.NobleGermanTest.prototype.testSample_102 = function() {
  var mml = '<mrow><mtext>Δ</mtext>' +
      '<msub>' +
      '<mi>ϕ</mi>' +
      '<mtext>peak</mtext>' +
      '</msub>' +
      '<mo>=</mo>' +
      '<msup>' +
      '<mo>tan</mo>' +
      '<mrow>' +
      '<mo>−</mo>' +
      '<mn>1</mn>' +
      '</mrow>' +
      '</msup>' +
      '<mo>(</mo>' +
      '<msup>' +
      '<mi>k</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<msubsup>' +
      '<mi>Q</mi>' +
      '<mtext>tank</mtext>' +
      '<mtext>series</mtext>' +
      '</msubsup>' +
      '<mo>)</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, 'großes Delta phi Index peak Grundlinie ist gleich Tangens hoch minus 1 Grundlinie Klammer auf k Quadrat großes Q Index tank hoch series Grundlinie Klammer zu', 'default');
  this.executeRuleTest(mml, 'großes Delta phi Index peak Grund ist gleich Tangens hoch minus 1 Grund Klammer auf k Quadrat großes Q Index tank hoch series Grund Klammer zu', 'brief');
  this.executeRuleTest(mml, 'großes Delta phi Index peak Grund ist gleich Tangens hoch minus 1 Grund Klammer auf k Quadrat großes Q Index tank hoch series Grund Klammer zu', 'sbrief');
};


/**
 * Testing Sample 103
 */
sre.NobleGermanTest.prototype.testSample_103 = function() {
  var mml = '<mrow><mi>f</mi>' +
      '<mo>=</mo>' +
      '<mn>1.013</mn>' +
      '<mfrac>' +
      '<mi>W</mi>' +
      '<msup>' +
      '<mi>L</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mfrac>' +
      '<msqrt>' +
      '<mfrac>' +
      '<mi>E</mi>' +
      '<mi>ρ</mi>' +
      '</mfrac>' +
      '</msqrt>' +
      '<msqrt>' +
      '<mo>(</mo>' +
      '<mn>1</mn>' +
      '<mo>+</mo>' +
      '<mn>0.293</mn>' +
      '<mfrac>' +
      '<msup>' +
      '<mi>L</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mrow>' +
      '<msup>' +
      '<mtext>EW</mtext>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '</mfrac>' +
      '<mi>σ</mi>' +
      '<mo>)</mo>' +
      '</msqrt>' +
      '</mrow>';
  this.executeRuleTest(mml, 'f ist gleich 1.013 Anfang Bruch großes W durch großes L Quadrat Ende Bruch Anfang Quadratwurzel Anfang Bruch großes E durch rho Ende Bruch Ende Quadratwurzel Anfang Quadratwurzel Klammer auf 1 plus 0.293 Anfang Bruch großes L Quadrat durch EW Quadrat Ende Bruch sigma Klammer zu Ende Quadratwurzel', 'default');
  this.executeRuleTest(mml, 'f ist gleich 1.013 Anfang Bruch großes W durch großes L Quadrat Ende Bruch Anfang Quadratwurzel Anfang Bruch großes E durch rho Ende Bruch Ende Quadratwurzel Anfang Quadratwurzel Klammer auf 1 plus 0.293 Anfang Bruch großes L Quadrat durch EW Quadrat Ende Bruch sigma Klammer zu Ende Quadratwurzel', 'brief');
  this.executeRuleTest(mml, 'f ist gleich 1.013 Bruch großes W durch großes L Quadrat Ende Bruch Quadratwurzel Bruch großes E durch rho Ende Bruch Ende Quadratwurzel Quadratwurzel Klammer auf 1 plus 0.293 Bruch großes L Quadrat durch EW Quadrat Ende Bruch sigma Klammer zu Ende Quadratwurzel',
                       'sbrief');
};


/**
 * Testing Sample 104
 */
sre.NobleGermanTest.prototype.testSample_104 = function() {
  var mml = '<mrow><mrow>' +
      '<msub>' +
      '<mi>u</mi>' +
      '<mi>n</mi>' +
      '</msub>' +
      '<mfenced open="(" close=")">' +
      '<mi>x</mi>' +
      '</mfenced>' +
      '</mrow>' +
      '<mo>=</mo>' +
      '<mrow>' +
      '<mrow>' +
      '<msub>' +
      '<mi>γ</mi>' +
      '<mi>n</mi>' +
      '</msub>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<mrow>' +
      '<mi>cosh</mi>' +
      '<msub>' +
      '<mi>k</mi>' +
      '<mi>n</mi>' +
      '</msub>' +
      '<mi>x</mi>' +
      '</mrow>' +
      '<mo>−</mo>' +
      '<mrow>' +
      '<mi>cos</mi>' +
      '<msub>' +
      '<mi>k</mi>' +
      '<mi>n</mi>' +
      '</msub>' +
      '<mi>x</mi>' +
      '</mrow>' +
      '</mrow>' +
      '</mfenced>' +
      '</mrow>' +
      '<mo>+</mo>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<mrow>' +
      '<mi>sinh</mi>' +
      '<msub>' +
      '<mi>k</mi>' +
      '<mi>n</mi>' +
      '</msub>' +
      '<mi>x</mi>' +
      '</mrow>' +
      '<mo>−</mo>' +
      '<mrow>' +
      '<mi>sin</mi>' +
      '<msub>' +
      '<mi>k</mi>' +
      '<mi>n</mi>' +
      '</msub>' +
      '<mi>x</mi>' +
      '</mrow>' +
      '</mrow>' +
      '</mfenced>' +
      '</mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, 'u Index n Grundlinie Klammer auf x Klammer zu ist gleich gamma Index n Grundlinie Klammer auf Kosinus hyperbolicus k Index n Grundlinie x minus Kosinus k Index n Grundlinie x Klammer zu plus Klammer auf Sinus hyperbolicus k Index n Grundlinie x minus Sinus k Index n Grundlinie x Klammer zu', 'default');
  this.executeRuleTest(mml, 'u Index n Grund Klammer auf x Klammer zu ist gleich gamma Index n Grund Klammer auf Kosinus hyperbolicus k Index n Grund x minus Kosinus k Index n Grund x Klammer zu plus Klammer auf Sinus hyperbolicus k Index n Grund x minus Sinus k Index n Grund x Klammer zu', 'brief');
  this.executeRuleTest(mml, 'u Index n Grund Klammer auf x Klammer zu ist gleich gamma Index n Grund Klammer auf Kosinus hyperbolicus k Index n Grund x minus Kosinus k Index n Grund x Klammer zu plus Klammer auf Sinus hyperbolicus k Index n Grund x minus Sinus k Index n Grund x Klammer zu', 'sbrief');
};


/**
 * Testing Sample 105
 */
sre.NobleGermanTest.prototype.testSample_105 = function() {
  var mml = '<mtable><mtr>' +
      '<mtd columnalign="left">' +
      '<mi>B</mi>' +
      '</mtd>' +
      '<mtd columnalign="left">' +
      '<mo>=</mo>' +
      '<mfrac>' +
      '<mfrac>' +
      '<msub>' +
      '<mi>F</mi>' +
      '<mn>0</mn>' +
      '</msub>' +
      '<mi>m</mi>' +
      '</mfrac>' +
      '<mrow>' +
      '<msqrt>' +
      '<mo stretchy="false">(</mo>' +
      '<msubsup>' +
      '<mi>ω</mi>' +
      '<mn>0</mn>' +
      '<mn>2</mn>' +
      '</msubsup>' +
      '<mo>−</mo>' +
      '<msup>' +
      '<mi>ω</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<msup>' +
      '<mo stretchy="false">)</mo>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo>+</mo>' +
      '<mn>4</mn>' +
      '<msup>' +
      '<mi>n</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<msup>' +
      '<mi>ω</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</msqrt>' +
      '</mrow>' +
      '</mfrac>' +
      '</mtd>' +
      '</mtr>' +
      '<mtr>' +
      '<mtd/>' +
      '<mtd columnalign="left">' +
      '<mo>=</mo>' +
      '<mfrac>' +
      '<mfrac>' +
      '<mrow>' +
      '<msub>' +
      '<mi>F</mi>' +
      '<mn>0</mn>' +
      '</msub>' +
      '</mrow>' +
      '<mi>k</mi>' +
      '</mfrac>' +
      '<mrow>' +
      '<msqrt>' +
      '<mo>(</mo>' +
      '<mn>1</mn>' +
      '<mo>−</mo>' +
      '<mo stretchy="false">(</mo>' +
      '<mi>ω</mi>' +
      '<mo stretchy="true">/</mo>' +
      '<msubsup>' +
      '<mi>ω</mi>' +
      '<mn>0</mn>' +
      '<mn>2</mn>' +
      '</msubsup>' +
      '<msup>' +
      '<mo stretchy="false">)</mo>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<msup>' +
      '<mo>)</mo>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo>+</mo>' +
      '<mn>4</mn>' +
      '<mo stretchy="false">(</mo>' +
      '<mi>n</mi>' +
      '<mo stretchy="true">/</mo>' +
      '<msub>' +
      '<mi>ω</mi>' +
      '<mn>0</mn>' +
      '</msub>' +
      '<msup>' +
      '<mo stretchy="false">)</mo>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo stretchy="false">(</mo>' +
      '<mi>ω</mi>' +
      '<mo stretchy="true">/</mo>' +
      '<msub>' +
      '<mi>ω</mi>' +
      '<mn>0</mn>' +
      '</msub>' +
      '<msup>' +
      '<mo stretchy="false">)</mo>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</msqrt>' +
      '</mrow>' +
      '</mfrac>' +
      '</mtd>' +
      '</mtr>' +
      '</mtable>';
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile 1. Spalte großes B 2. Spalte ist gleich Anfang Anfang Bruch Anfang Bruch großes F 0 durch m Ende Bruch durch durch Anfang Quadratwurzel Klammer auf omega 0 Quadrat minus omega Quadrat Klammer zu Quadrat plus 4 n Quadrat omega Quadrat Ende Quadratwurzel Ende Ende Bruch 2. Zeile 1. Spalte leer 2. Spalte ist gleich Anfang Anfang Bruch Anfang Bruch großes F 0 durch k Ende Bruch durch durch Anfang Quadratwurzel Klammer auf 1 minus Klammer auf omega Schrägstrich omega 0 Quadrat Klammer zu Quadrat Klammer zu Quadrat plus 4 Klammer auf n Schrägstrich omega 0 Klammer zu Quadrat Klammer auf omega Schrägstrich omega 0 Klammer zu Quadrat Ende Quadratwurzel Ende Ende Bruch Ende Anordnung', 'default');
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile 1. Spalte großes B 2. Spalte ist gleich Anfang Anfang Bruch Anfang Bruch großes F 0 durch m Ende Bruch durch durch Anfang Quadratwurzel Klammer auf omega 0 Quadrat minus omega Quadrat Klammer zu Quadrat plus 4 n Quadrat omega Quadrat Ende Quadratwurzel Ende Ende Bruch 2. Zeile 1. Spalte leer 2. Spalte ist gleich Anfang Anfang Bruch Anfang Bruch großes F 0 durch k Ende Bruch durch durch Anfang Quadratwurzel Klammer auf 1 minus Klammer auf omega Schrägstrich omega 0 Quadrat Klammer zu Quadrat Klammer zu Quadrat plus 4 Klammer auf n Schrägstrich omega 0 Klammer zu Quadrat Klammer auf omega Schrägstrich omega 0 Klammer zu Quadrat Ende Quadratwurzel Ende Ende Bruch Ende Anordnung', 'brief');
  this.executeRuleTest(mml, 'Anordnung 1. Zeile 1. Spalte großes B 2. Spalte ist gleich geschachteltBruch Bruch großes F 0 durch m Ende Bruch geschachteltdurch Quadratwurzel Klammer auf omega 0 Quadrat minus omega Quadrat Klammer zu Quadrat plus 4 n Quadrat omega Quadrat Ende Quadratwurzel geschachteltEnde Bruch 2. Zeile 1. Spalte leer 2. Spalte ist gleich geschachteltBruch Bruch großes F 0 durch k Ende Bruch geschachteltdurch Quadratwurzel Klammer auf 1 minus Klammer auf omega Schrägstrich omega 0 Quadrat Klammer zu Quadrat Klammer zu Quadrat plus 4 Klammer auf n Schrägstrich omega 0 Klammer zu Quadrat Klammer auf omega Schrägstrich omega 0 Klammer zu Quadrat Ende Quadratwurzel geschachteltEnde Bruch Ende Anordnung', 'sbrief');
};


/**
 * Testing Sample 106
 */
sre.NobleGermanTest.prototype.testSample_106 = function() {
  var mml = '<mrow>' +
      '<mi mathvariant="normal">p</mi>' +
      '<mo>(</mo>' +
      '<mi>A</mi>' +
      '<mspace width="3.33333pt"/>' +
      '<mi>and</mi>' +
      '<mspace width="3.33333pt"/>' +
      '<mi>B</mi>' +
      '<mo>)</mo>' +
      '<mo>=</mo>' +
      '<mi mathvariant="normal">p</mi>' +
      '<mo>(</mo>' +
      '<mi>A</mi>' +
      '<mo>)</mo>' +
      '<mspace width="3.33333pt"/>' +
      '<mi mathvariant="normal">p</mi>' +
      '<mo>(</mo>' +
      '<mi>B</mi>' +
      '<mo>|</mo>' +
      '<mi>A</mi>' +
      '<mo>)</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, 'normales p Klammer auf großes A a n d großes B Klammer zu ist gleich normales p Klammer auf großes A Klammer zu normales p Klammer auf großes B senkrechter Strich großes A Klammer zu',
                       'default');
  this.executeRuleTest(mml, 'normales p Klammer auf großes A a n d großes B Klammer zu ist gleich normales p Klammer auf großes A Klammer zu normales p Klammer auf großes B senkrechter Strich großes A Klammer zu',
                       'brief');
  this.executeRuleTest(mml, 'normales p Klammer auf großes A a n d großes B Klammer zu ist gleich normales p Klammer auf großes A Klammer zu normales p Klammer auf großes B senkrechter Strich großes A Klammer zu',
                       'sbrief');
};


/**
 * Testing Sample 107
 */
sre.NobleGermanTest.prototype.testSample_107 = function() {
  var mml = '<mrow>' +
      '<mi>PMF</mi>' +
      '<mrow>' +
      '<mo>(</mo>' +
      '<mi>x</mi>' +
      '<mo>)</mo>' +
      '</mrow>' +
      '<mo>∝</mo>' +
      '<msup>' +
      '<mfenced close=")" open="(" separators="">' +
      '<mfrac>' +
      '<mn>1</mn>' +
      '<mi>x</mi>' +
      '</mfrac>' +
      '</mfenced>' +
      '<mi>α</mi>' +
      '</msup>' +
      '</mrow>';
  this.executeRuleTest(mml, 'großes P großes M großes F Klammer auf x Klammer zu proportional zu Klammer auf Anfang Bruch 1 durch x Ende Bruch Klammer zu hoch alpha', 'default');
  this.executeRuleTest(mml, 'großes P großes M großes F Klammer auf x Klammer zu proportional zu Klammer auf Anfang Bruch 1 durch x Ende Bruch Klammer zu hoch alpha', 'brief');
  this.executeRuleTest(mml, 'großes P großes M großes F Klammer auf x Klammer zu proportional zu Klammer auf Bruch 1 durch x Ende Bruch Klammer zu hoch alpha', 'sbrief');
};


/**
 * Testing Sample 108
 */
sre.NobleGermanTest.prototype.testSample_108 = function() {
  var mml = '<mrow>' +
      '<mi>f</mi>' +
      '<mrow>' +
      '<mo>(</mo>' +
      '<mi>x</mi>' +
      '<mo>)</mo>' +
      '</mrow>' +
      '<mo>=</mo>' +
      '<mfrac>' +
      '<mn>1</mn>' +
      '<msqrt>' +
      '<mrow>' +
      '<mn>2</mn>' +
      '<mi>π</mi>' +
      '</mrow>' +
      '</msqrt>' +
      '</mfrac>' +
      '<mo form="prefix">exp</mo>' +
      '<mrow>' +
      '<mo>(</mo>' +
      '<mo>-</mo>' +
      '<msup>' +
      '<mi>x</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo>/2)</mo>' +
      '</mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, 'f Klammer auf x Klammer zu ist gleich Anfang Bruch 1 durch Anfang Quadratwurzel 2 pi Ende Quadratwurzel Ende Bruch exp Klammer auf minus x Quadrat Schrägstrich 2 Klammer zu',
                       'default');
  this.executeRuleTest(mml, 'f Klammer auf x Klammer zu ist gleich Anfang Bruch 1 durch Anfang Quadratwurzel 2 pi Ende Quadratwurzel Ende Bruch exp Klammer auf minus x Quadrat Schrägstrich 2 Klammer zu', 'brief');
  this.executeRuleTest(mml, 'f Klammer auf x Klammer zu ist gleich Bruch 1 durch Quadratwurzel 2 pi Ende Quadratwurzel Ende Bruch exp Klammer auf minus x Quadrat Schrägstrich 2 Klammer zu',
                       'sbrief');
};


/**
 * Testing Sample 109
 */
sre.NobleGermanTest.prototype.testSample_109 = function() {
  var mml = '<mrow><mfrac>' +
      '<mrow>' +
      '<mi>d</mi>' +
      '<mi>x</mi>' +
      '</mrow>' +
      '<mrow>' +
      '<mi>d</mi>' +
      '<mi>θ</mi>' +
      '</mrow>' +
      '</mfrac>' +
      '<mo>=</mo>' +
      '<mfrac>' +
      '<mi>β</mi>' +
      '<mrow>' +
      '<msup>' +
      '<mo form="prefix">cos</mo>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mi>θ</mi>' +
      '</mrow>' +
      '</mfrac>' +
      '</mrow>';
  this.executeRuleTest(mml, 'Anfang Bruch d x durch d theta Ende Bruch ist gleich Anfang Bruch beta durch Kosinus Quadrat theta Ende Bruch', 'default');
  this.executeRuleTest(mml, 'Anfang Bruch d x durch d theta Ende Bruch ist gleich Anfang Bruch beta durch Kosinus Quadrat theta Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'Bruch d x durch d theta Ende Bruch ist gleich Bruch beta durch Kosinus Quadrat theta Ende Bruch', 'sbrief');
};


/**
 * Testing Sample 110
 */
sre.NobleGermanTest.prototype.testSample_110 = function() {
  var mml = '<mrow><mi>s</mi>' +
      '<mo>/</mo>' +
      '<msqrt>' +
      '<mrow>' +
      '<mn>2</mn>' +
      '<mo>(</mo>' +
      '<mi>n</mi>' +
      '<mo>-</mo>' +
      '<mn>1</mn>' +
      '<mo>)</mo>' +
      '</mrow>' +
      '</msqrt>' +
      '</mrow>';
  this.executeRuleTest(mml, 's Schrägstrich Anfang Quadratwurzel 2 Klammer auf n minus 1 Klammer zu Ende Quadratwurzel', 'default');
  this.executeRuleTest(mml, 's Schrägstrich Anfang Quadratwurzel 2 Klammer auf n minus 1 Klammer zu Ende Quadratwurzel', 'brief');
  this.executeRuleTest(mml, 's Schrägstrich Quadratwurzel 2 Klammer auf n minus 1 Klammer zu Ende Quadratwurzel', 'sbrief');
};

