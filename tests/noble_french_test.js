// Copyright 2016 Volker Sorge
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

/**
 * @fileoverview Testcases for mathspeak speech rules from Steve Nobles test
 *     set.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.NobleFrenchTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.NobleFrenchTest = function() {
  sre.NobleFrenchTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Steve Noble\'s samples French tests.';

  /**
   * @override
   */
  this.domain = 'mathspeak';

  /**
   * @override
   */
  this.semantics = true;

  /**
   * @override
   */
  this.locale = 'fr';

  /**
   * @override
   */
  this.rules = ['MathspeakRules', 'MathspeakFrench'];

  this.setActive('NobleSamplesFrench');

};
goog.inherits(sre.NobleFrenchTest, sre.AbstractRuleTest);


/**
 * Testing Sample 1
 */
sre.NobleFrenchTest.prototype.testSample_1 = function() {
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
  this.executeRuleTest(mml, 'négatif 5 et un-cinquième moins 6 et deux-tiers égale', 'default');
  this.executeRuleTest(mml, 'négatif 5 et un-cinquième moins 6 et deux-tiers égale', 'brief');
  this.executeRuleTest(mml, 'négatif 5 et un-cinquième moins 6 et deux-tiers égale', 'sbrief');
};


/**
 * Testing Sample 2
 */
sre.NobleFrenchTest.prototype.testSample_2 = function() {
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
  this.executeRuleTest(mml, 'négatif 7 et trois-quarts moins parenthèse gauche négatif 4 et sept-huitièmes parenthèse droite égale', 'default');
  this.executeRuleTest(mml, 'négatif 7 et trois-quarts moins parenthèse gauche négatif 4 et sept-huitièmes parenthèse droite égale', 'brief');
  this.executeRuleTest(mml, 'négatif 7 et trois-quarts moins parenthèse gauche négatif 4 et sept-huitièmes parenthèse droite égale', 'sbrief');
};


/**
 * Testing Sample 3
 */
sre.NobleFrenchTest.prototype.testSample_3 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>24.15</mn><mo>&#x2212;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mn>13.7</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow><mo>=</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, 'négatif 24,15 moins parenthèse gauche 13,7 parenthèse droite égale', 'default');
  this.executeRuleTest(mml, 'négatif 24,15 moins parenthèse gauche 13,7 parenthèse droite égale', 'brief');
  this.executeRuleTest(mml, 'négatif 24,15 moins parenthèse gauche 13,7 parenthèse droite égale', 'sbrief');
};


/**
 * Testing Sample 4
 */
sre.NobleFrenchTest.prototype.testSample_4 = function() {
  var mml = '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>4</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow><mo>&#x00D7;</mo><mn>3</mn><mo>=</mo><mo>&#x2212;' +
      '</mo><mn>12</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'parenthèse gauche négatif 4 parenthèse droite multiplié par 3 égale négatif 12', 'default');
  this.executeRuleTest(mml, 'parenthèse gauche négatif 4 parenthèse droite multiplié par 3 égale négatif 12', 'brief');
  this.executeRuleTest(mml, 'parenthèse gauche négatif 4 parenthèse droite multiplié par 3 égale négatif 12', 'sbrief');
};


/**
 * Testing Sample 5
 */
sre.NobleFrenchTest.prototype.testSample_5 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>12</mn><mo>&#x00F7;</mo><mn>3</mn><mo>=</mo>' +
      '<mo>&#x2212;</mo><mn>4</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'négatif 12 divisé par 3 égale négatif 4', 'default');
  this.executeRuleTest(mml, 'négatif 12 divisé par 3 égale négatif 4', 'brief');
  this.executeRuleTest(mml, 'négatif 12 divisé par 3 égale négatif 4', 'sbrief');
};


/**
 * Testing Sample 6
 */
sre.NobleFrenchTest.prototype.testSample_6 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>12</mn><mo>&#x00F7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>4</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow><mo>=</mo><mn>3</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'négatif 12 divisé par parenthèse gauche négatif 4 parenthèse droite égale 3', 'default');
  this.executeRuleTest(mml, 'négatif 12 divisé par parenthèse gauche négatif 4 parenthèse droite égale 3', 'brief');
  this.executeRuleTest(mml, 'négatif 12 divisé par parenthèse gauche négatif 4 parenthèse droite égale 3', 'sbrief');
};


/**
 * Testing Sample 7
 */
sre.NobleFrenchTest.prototype.testSample_7 = function() {
  var mml = '<mrow>' +
      '<mn>6</mn><mo>&#x00D7;</mo><mn>5</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, '6 multiplié par 5', 'default');
  this.executeRuleTest(mml, '6 multiplié par 5', 'brief');
  this.executeRuleTest(mml, '6 multiplié par 5', 'sbrief');
};


/**
 * Testing Sample 8
 */
sre.NobleFrenchTest.prototype.testSample_8 = function() {
  var mml = '<mrow>' +
      '<mn>6</mn><mo>&#x00D7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>5</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '6 multiplié par parenthèse gauche négatif 5 parenthèse droite', 'default');
  this.executeRuleTest(mml, '6 multiplié par parenthèse gauche négatif 5 parenthèse droite', 'brief');
  this.executeRuleTest(mml, '6 multiplié par parenthèse gauche négatif 5 parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 9
 */
sre.NobleFrenchTest.prototype.testSample_9 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>6</mn><mo>&#x00D7;</mo><mn>5</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'négatif 6 multiplié par 5', 'default');
  this.executeRuleTest(mml, 'négatif 6 multiplié par 5', 'brief');
  this.executeRuleTest(mml, 'négatif 6 multiplié par 5', 'sbrief');
};


/**
 * Testing Sample 10
 */
sre.NobleFrenchTest.prototype.testSample_10 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>6</mn><mo>&#x00D7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>5</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, 'négatif 6 multiplié par parenthèse gauche négatif 5 parenthèse droite', 'default');
  this.executeRuleTest(mml, 'négatif 6 multiplié par parenthèse gauche négatif 5 parenthèse droite', 'brief');
  this.executeRuleTest(mml, 'négatif 6 multiplié par parenthèse gauche négatif 5 parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 11
 */
sre.NobleFrenchTest.prototype.testSample_11 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>8</mn><mo>&#x00D7;</mo><mn>7</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'négatif 8 multiplié par 7', 'default');
  this.executeRuleTest(mml, 'négatif 8 multiplié par 7', 'brief');
  this.executeRuleTest(mml, 'négatif 8 multiplié par 7', 'sbrief');
};


/**
 * Testing Sample 12
 */
sre.NobleFrenchTest.prototype.testSample_12 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>8</mn><mo>&#x00D7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>7</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, 'négatif 8 multiplié par parenthèse gauche négatif 7 parenthèse droite', 'default');
  this.executeRuleTest(mml, 'négatif 8 multiplié par parenthèse gauche négatif 7 parenthèse droite', 'brief');
  this.executeRuleTest(mml, 'négatif 8 multiplié par parenthèse gauche négatif 7 parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 13
 */
sre.NobleFrenchTest.prototype.testSample_13 = function() {
  var mml = '<mrow>' +
      '<mn>8</mn><mo>&#x00D7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>7</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '8 multiplié par parenthèse gauche négatif 7 parenthèse droite', 'default');
  this.executeRuleTest(mml, '8 multiplié par parenthèse gauche négatif 7 parenthèse droite', 'brief');
  this.executeRuleTest(mml, '8 multiplié par parenthèse gauche négatif 7 parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 14
 */
sre.NobleFrenchTest.prototype.testSample_14 = function() {
  var mml = '<mrow><mn>8</mn><mo>&#x00D7;</mo><mn>7</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, '8 multiplié par 7', 'default');
  this.executeRuleTest(mml, '8 multiplié par 7', 'brief');
  this.executeRuleTest(mml, '8 multiplié par 7', 'sbrief');
};


/**
 * Testing Sample 15
 */
sre.NobleFrenchTest.prototype.testSample_15 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mn>1</mn><mo>=</mo><mi>30°</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'm angle 1 égale 30 degrés', 'default');
  this.executeRuleTest(mml, 'm angle 1 égale 30 degrés', 'brief');
  this.executeRuleTest(mml, 'm angle 1 égale 30 degrés', 'sbrief');
};


/**
 * Testing Sample 16
 */
sre.NobleFrenchTest.prototype.testSample_16 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mn>2</mn><mo>=</mo>' +
      '<mi>60°</mi>  </mrow>';
  this.executeRuleTest(mml, 'm angle 2 égale 60 degrés', 'default');
  this.executeRuleTest(mml, 'm angle 2 égale 60 degrés', 'brief');
  this.executeRuleTest(mml, 'm angle 2 égale 60 degrés', 'sbrief');
};


/**
 * Testing Sample 17
 */
sre.NobleFrenchTest.prototype.testSample_17 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mn>1</mn><mo>+</mo><mi>m</mi>' +
      '<mo>&#x2220;</mo><mn>2</mn><mo>=</mo>' +
      '<mi>90°</mi>  </mrow>';
  this.executeRuleTest(mml, 'm angle 1 plus m angle 2 égale 90 degrés',
                       'default');
  this.executeRuleTest(mml, 'm angle 1 plus m angle 2 égale 90 degrés',
                       'brief');
  this.executeRuleTest(mml, 'm angle 1 plus m angle 2 égale 90 degrés',
                       'sbrief');
};


/**
 * Testing Sample 18
 */
sre.NobleFrenchTest.prototype.testSample_18 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mi>M</mi><mo>+</mo><mi>m</mi>' +
      '<mo>&#x2220;</mo><mi>N</mi><mo>=</mo>' +
      '<mi>180°</mi>  </mrow>';
  this.executeRuleTest(mml, 'm angle M majuscule plus m angle N majuscule égale 180 degrés', 'default');
  this.executeRuleTest(mml, 'm angle M majuscule plus m angle N majuscule égale 180 degrés', 'brief');
  this.executeRuleTest(mml, 'm angle M majuscule plus m angle N majuscule égale 180 degrés', 'sbrief');
};


/**
 * Testing Sample 19
 */
sre.NobleFrenchTest.prototype.testSample_19 = function() {
  var mml = '<mrow>' +
      '<mi>A</mi><mo>=</mo><mfrac>' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '</mfrac>' +
      '<mi>b</mi><mi>h</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'A majuscule égale un-demi b h', 'default');
  this.executeRuleTest(mml, 'A majuscule égale un-demi b h', 'brief');
  this.executeRuleTest(mml, 'A majuscule égale un-demi b h', 'sbrief');
};


/**
 * Testing Sample 20
 */
sre.NobleFrenchTest.prototype.testSample_20 = function() {
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
  this.executeRuleTest(mml, 'début fraction area of triangle sur area of square fin fraction égale début fraction 1 unit au carré sur 16 units au carré fin fraction', 'default');
  this.executeRuleTest(mml, 'début frac area of triangle sur area of square fin frac égale début frac 1 unit au carré sur 16 units au carré fin frac', 'brief');
  this.executeRuleTest(mml, 'frac area of triangle sur  area of square fin frac égale frac 1 unit au carré sur  16 units au carré fin frac', 'sbrief');
};


/**
 * Testing Sample 21
 */
sre.NobleFrenchTest.prototype.testSample_21 = function() {
  var mml = '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mn>0.6</mn>' +
      '</mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>';
  this.executeRuleTest(mml, '0,6 au carré', 'default');
  this.executeRuleTest(mml, '0,6 au carré', 'brief');
  this.executeRuleTest(mml, '0,6 au carré', 'sbrief');
};


/**
 * Testing Sample 22
 */
sre.NobleFrenchTest.prototype.testSample_22 = function() {
  var mml = '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mn>1.5</mn>' +
      '</mrow>' +
      '<mn>2</mn>' +
      '</msup>    ' +
      '</mrow>';
  this.executeRuleTest(mml, '1,5 au carré', 'default');
  this.executeRuleTest(mml, '1,5 au carré', 'brief');
  this.executeRuleTest(mml, '1,5 au carré', 'sbrief');
};


/**
 * Testing Sample 23
 */
sre.NobleFrenchTest.prototype.testSample_23 = function() {
  var mml = '<mrow>' +
      '<mn>4</mn><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>x</mi>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '4 parenthèse gauche 2 x plus 3 x parenthèse droite', 'default');
  this.executeRuleTest(mml, '4 parenthèse gauche 2 x plus 3 x parenthèse droite', 'brief');
  this.executeRuleTest(mml, '4 parenthèse gauche 2 x plus 3 x parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 24
 */
sre.NobleFrenchTest.prototype.testSample_24 = function() {
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
  this.executeRuleTest(mml, '36 plus 4 y moins 1 y au carré plus 5 y au carré moins 2', 'default');
  this.executeRuleTest(mml, '36 plus 4 y moins 1 y au carré plus 5 y au carré moins 2', 'brief');
  this.executeRuleTest(mml, '36 plus 4 y moins 1 y au carré plus 5 y au carré moins 2', 'sbrief');
};


/**
 * Testing Sample 25
 */
sre.NobleFrenchTest.prototype.testSample_25 = function() {
  var mml = '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mn>5</mn><mo>+</mo><mn>9</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow><mo>&#x2212;</mo><mn>4</mn><mo>+</mo><mn>3</mn>' +
      '<mo>=</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, 'parenthèse gauche 5 plus 9 parenthèse droite moins 4 plus 3 égale', 'default');
  this.executeRuleTest(mml, 'parenthèse gauche 5 plus 9 parenthèse droite moins 4 plus 3 égale', 'brief');
  this.executeRuleTest(mml, 'parenthèse gauche 5 plus 9 parenthèse droite moins 4 plus 3 égale', 'sbrief');
};


/**
 * Testing Sample 26
 */
sre.NobleFrenchTest.prototype.testSample_26 = function() {
  var mml = '<mrow>' +
      '<mover accent="true">' +
      '<mrow>' +
      '<mi>B</mi><mi>C</mi>' +
      '</mrow>' +
      '<mo stretchy="true">&#x2194;</mo>' +
      '</mover>' +
      '</mrow>';
  this.executeRuleTest(mml, 'suscrire B majuscule C majuscule avec flèche bilatérale', 'default');
  this.executeRuleTest(mml, 'suscrire B majuscule C majuscule avec flèche bilatérale', 'brief');
  this.executeRuleTest(mml, 'suscrire B majuscule C majuscule avec flèche bilatérale', 'sbrief');
};


/**
 * Testing Sample 27
 */
sre.NobleFrenchTest.prototype.testSample_27 = function() {
  var mml = '<mrow>' +
      '<mover accent="true">' +
      '<mrow>' +
      '<mi>P</mi><mi>Q</mi>' +
      '</mrow>' +
      '<mo stretchy="true">&#x2192;</mo>' +
      '</mover>' +
      '</mrow>';
  this.executeRuleTest(mml, 'suscrire P majuscule Q majuscule avec flèche droite', 'default');
  this.executeRuleTest(mml, 'suscrire P majuscule Q majuscule avec flèche droite', 'brief');
  this.executeRuleTest(mml, 'suscrire P majuscule Q majuscule avec flèche droite', 'sbrief');
};


/**
 * Testing Sample 28
 */
sre.NobleFrenchTest.prototype.testSample_28 = function() {
  var mml = '<mrow>' +
      '<mover accent="true">' +
      '<mrow>' +
      '<mi>G</mi><mi>H</mi>' +
      '</mrow>' +
      '<mo stretchy="true">&#x00AF;</mo>' +
      '</mover>' +
      '</mrow>';
  this.executeRuleTest(mml, 'suscrire G majuscule H majuscule avec macron', 'default');
  this.executeRuleTest(mml, 'suscrire G majuscule H majuscule avec macron', 'brief');
  this.executeRuleTest(mml, 'suscrire G majuscule H majuscule avec macron', 'sbrief');
};


/**
 * Testing Sample 29
 */
sre.NobleFrenchTest.prototype.testSample_29 = function() {
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
  this.executeRuleTest(mml, 'suscrire W majuscule X majuscule avec macron approximativement égal à suscrire Y majuscule Z majuscule avec macron',
                       'default');
  this.executeRuleTest(mml, 'suscrire W majuscule X majuscule avec macron approximativement égal à suscrire Y majuscule Z majuscule avec macron', 'brief');
  this.executeRuleTest(mml, 'suscrire W majuscule X majuscule avec macron approximativement égal à suscrire Y majuscule Z majuscule avec macron', 'sbrief');
};


/**
 * Testing Sample 30
 */
sre.NobleFrenchTest.prototype.testSample_30 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2220;</mo><mi>B</mi><mi>E</mi><mi>F</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'angle B majuscule E majuscule F majuscule',
                       'default');
  this.executeRuleTest(mml, 'angle B majuscule E majuscule F majuscule',
                       'brief');
  this.executeRuleTest(mml, 'angle B majuscule E majuscule F majuscule',
                       'sbrief');
};


/**
 * Testing Sample 31
 */
sre.NobleFrenchTest.prototype.testSample_31 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2220;</mo><mi>B</mi><mi>E</mi><mi>D</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'angle B majuscule E majuscule D majuscule',
                       'default');
  this.executeRuleTest(mml, 'angle B majuscule E majuscule D majuscule',
                       'brief');
  this.executeRuleTest(mml, 'angle B majuscule E majuscule D majuscule',
                       'sbrief');
};


/**
 * Testing Sample 32
 */
sre.NobleFrenchTest.prototype.testSample_32 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2220;</mo><mi>D</mi><mi>E</mi><mi>F</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'angle D majuscule E majuscule F majuscule',
                       'default');
  this.executeRuleTest(mml, 'angle D majuscule E majuscule F majuscule',
                       'brief');
  this.executeRuleTest(mml, 'angle D majuscule E majuscule F majuscule',
                       'sbrief');
};


/**
 * Testing Sample 33
 */
sre.NobleFrenchTest.prototype.testSample_33 = function() {
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
  this.executeRuleTest(mml, 'x égale début fraction négatif b plus ou moins début racine carrée b au carré moins 4 a c fin racine carrée sur 2 a fin fraction', 'default');
  this.executeRuleTest(mml, 'x égale début frac négatif b plus ou moins début racine carrée b au carré moins 4 a c fin racine carrée sur 2 a fin frac', 'brief');
  this.executeRuleTest(mml, 'x égale frac négatif b plus ou moins racine carrée b au carré moins 4 a c fin racine carrée sur  2 a fin frac', 'sbrief');
};


/**
 * Testing Sample 34
 */
sre.NobleFrenchTest.prototype.testSample_34 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mi>x</mi></mrow><mrow>' +
      '<mn>2</mn></mrow></msup><mo>+</mo><mn>8</mn><mi>x</mi><mo>+</mo>' +
      '<mn>16</mn></mrow>';
  this.executeRuleTest(mml, 'y égale x au carré plus 8 x plus 16', 'default');
  this.executeRuleTest(mml, 'y égale x au carré plus 8 x plus 16', 'brief');
  this.executeRuleTest(mml, 'y égale x au carré plus 8 x plus 16', 'sbrief');
};


/**
 * Testing Sample 35
 */
sre.NobleFrenchTest.prototype.testSample_35 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mfrac><mrow><mn>1</mn></mrow><mrow>' +
      '<mn>3</mn></mrow></mfrac><mrow><mo>(</mo><msup><mrow><mn>3</mn>' +
      '</mrow><mrow><mi>x</mi></mrow></msup><mo>)</mo></mrow></mrow>';
  this.executeRuleTest(mml, 'y égale un-tiers parenthèse gauche 3 exposant x position de base parenthèse droite', 'default');
  this.executeRuleTest(mml, 'y égale un-tiers parenthèse gauche 3 sup x position de base parenthèse droite',
                       'brief');
  this.executeRuleTest(mml, 'y égale un-tiers parenthèse gauche 3 sup x position de base parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 36
 */
sre.NobleFrenchTest.prototype.testSample_36 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>10</mn><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow>';
  this.executeRuleTest(mml, 'y égale 10 moins 2 x', 'default');
  this.executeRuleTest(mml, 'y égale 10 moins 2 x', 'brief');
  this.executeRuleTest(mml, 'y égale 10 moins 2 x', 'sbrief');
};


/**
 * Testing Sample 37
 */
sre.NobleFrenchTest.prototype.testSample_37 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>2</mn><msup><mrow><mi>x</mi>' +
      '</mrow><mrow><mn>3</mn></mrow></msup><mo>+</mo><mn>5</mn></mrow>';
  this.executeRuleTest(mml, 'y égale 2 x cubique plus 5', 'default');
  this.executeRuleTest(mml, 'y égale 2 x cubique plus 5', 'brief');
  this.executeRuleTest(mml, 'y égale 2 x cubique plus 5', 'sbrief');
};


/**
 * Testing Sample 38
 */
sre.NobleFrenchTest.prototype.testSample_38 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mo>(</mo><msup><mrow><mo/><mi>x' +
      '</mi></mrow><mrow><mn>2</mn></mrow></msup><mo>+</mo><mn>1</mn>' +
      '<mrow><mo>)</mo><mo>(</mo><msup><mrow><mi>x</mi></mrow><mrow><mn>2' +
      '</mn></mrow></msup></mrow><mo>+</mo><mn>3</mn><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y égale parenthèse gauche x au carré plus 1 parenthèse droite parenthèse gauche x au carré plus 3 parenthèse droite', 'default');
  this.executeRuleTest(mml, 'y égale parenthèse gauche x au carré plus 1 parenthèse droite parenthèse gauche x au carré plus 3 parenthèse droite', 'brief');
  this.executeRuleTest(mml, 'y égale parenthèse gauche x au carré plus 1 parenthèse droite parenthèse gauche x au carré plus 3 parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 39
 */
sre.NobleFrenchTest.prototype.testSample_39 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mn>0.5</mn></mrow>' +
      '<mrow><mi>x</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'y égale 0,5 exposant x', 'default');
  this.executeRuleTest(mml, 'y égale 0,5 sup x', 'brief');
  this.executeRuleTest(mml, 'y égale 0,5 sup x', 'sbrief');
};


/**
 * Testing Sample 40
 */
sre.NobleFrenchTest.prototype.testSample_40 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>22</mn><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow>';
  this.executeRuleTest(mml, 'y égale 22 moins 2 x', 'default');
  this.executeRuleTest(mml, 'y égale 22 moins 2 x', 'brief');
  this.executeRuleTest(mml, 'y égale 22 moins 2 x', 'sbrief');
};


/**
 * Testing Sample 41
 */
sre.NobleFrenchTest.prototype.testSample_41 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mfrac><mrow><mn>3</mn></mrow><mrow>' +
      '<mi>x</mi></mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'y égale début fraction 3 sur x fin fraction', 'default');
  this.executeRuleTest(mml, 'y égale début frac 3 sur x fin frac', 'brief');
  this.executeRuleTest(mml, 'y égale frac 3 sur  x fin frac', 'sbrief');
};


/**
 * Testing Sample 42
 */
sre.NobleFrenchTest.prototype.testSample_42 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mo>(</mo><mi>x</mi><mo>+</mo><mn>4' +
      '</mn><mo>)</mo><mo>(</mo><mi>x</mi><mo>+</mo><mn>4</mn><mo>)</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, 'y égale parenthèse gauche x plus 4 parenthèse droite parenthèse gauche x plus 4 parenthèse droite', 'default');
  this.executeRuleTest(mml, 'y égale parenthèse gauche x plus 4 parenthèse droite parenthèse gauche x plus 4 parenthèse droite', 'brief');
  this.executeRuleTest(mml, 'y égale parenthèse gauche x plus 4 parenthèse droite parenthèse gauche x plus 4 parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 43
 */
sre.NobleFrenchTest.prototype.testSample_43 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mo>(</mo><mn>4</mn><mi>x</mi><mo>−' +
      '</mo><mn>3</mn><mo>)</mo><mo>(</mo><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '<mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y égale parenthèse gauche 4 x moins 3 parenthèse droite parenthèse gauche x plus 1 parenthèse droite', 'default');
  this.executeRuleTest(mml, 'y égale parenthèse gauche 4 x moins 3 parenthèse droite parenthèse gauche x plus 1 parenthèse droite', 'brief');
  this.executeRuleTest(mml, 'y égale parenthèse gauche 4 x moins 3 parenthèse droite parenthèse gauche x plus 1 parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 44
 */
sre.NobleFrenchTest.prototype.testSample_44 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>20</mn><mi>x</mi><mo>−</mo><mn>4' +
      '</mn><msup><mrow><mi>x</mi></mrow><mrow><mn>2</mn></mrow></msup>' +
      '</mrow>';
  this.executeRuleTest(mml, 'y égale 20 x moins 4 x au carré', 'default');
  this.executeRuleTest(mml, 'y égale 20 x moins 4 x au carré', 'brief');
  this.executeRuleTest(mml, 'y égale 20 x moins 4 x au carré', 'sbrief');
};


/**
 * Testing Sample 45
 */
sre.NobleFrenchTest.prototype.testSample_45 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mi>x</mi></mrow><mrow>' +
      '<mn>2</mn></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'y égale x au carré', 'default');
  this.executeRuleTest(mml, 'y égale x au carré', 'brief');
  this.executeRuleTest(mml, 'y égale x au carré', 'sbrief');
};


/**
 * Testing Sample 46
 */
sre.NobleFrenchTest.prototype.testSample_46 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mn>3</mn></mrow><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'y égale 3 exposant x moins 1', 'default');
  this.executeRuleTest(mml, 'y égale 3 sup x moins 1', 'brief');
  this.executeRuleTest(mml, 'y égale 3 sup x moins 1', 'sbrief');
};


/**
 * Testing Sample 47
 */
sre.NobleFrenchTest.prototype.testSample_47 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>16</mn><mo>−</mo><mn>2</mn><mo>(' +
      '</mo><mi>x</mi><mo>+</mo><mn>3</mn><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y égale 16 moins 2 parenthèse gauche x plus 3 parenthèse droite', 'default');
  this.executeRuleTest(mml, 'y égale 16 moins 2 parenthèse gauche x plus 3 parenthèse droite', 'brief');
  this.executeRuleTest(mml, 'y égale 16 moins 2 parenthèse gauche x plus 3 parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 48
 */
sre.NobleFrenchTest.prototype.testSample_48 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>4</mn><msup><mrow><mi>x</mi>' +
      '</mrow><mrow><mn>2</mn></mrow></msup><mo>−</mo><mi>x</mi><mo>−' +
      '</mo><mn>3</mn></mrow>';
  this.executeRuleTest(mml, 'y égale 4 x au carré moins x moins 3',
                       'default');
  this.executeRuleTest(mml, 'y égale 4 x au carré moins x moins 3', 'brief');
  this.executeRuleTest(mml, 'y égale 4 x au carré moins x moins 3',
                       'sbrief');
};


/**
 * Testing Sample 49
 */
sre.NobleFrenchTest.prototype.testSample_49 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mi>x</mi><mo>+</mo><mfrac><mrow>' +
      '<mn>1</mn></mrow><mrow><mi>x</mi></mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'y égale x plus début fraction 1 sur x fin fraction', 'default');
  this.executeRuleTest(mml, 'y égale x plus début frac 1 sur x fin frac', 'brief');
  this.executeRuleTest(mml, 'y égale x plus frac 1 sur  x fin frac', 'sbrief');
};


/**
 * Testing Sample 50
 */
sre.NobleFrenchTest.prototype.testSample_50 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>4</mn><mi>x</mi><mo>(</mo><mn>5' +
      '</mn><mo>−</mo><mi>x</mi><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y égale 4 x parenthèse gauche 5 moins x parenthèse droite', 'default');
  this.executeRuleTest(mml, 'y égale 4 x parenthèse gauche 5 moins x parenthèse droite', 'brief');
  this.executeRuleTest(mml, 'y égale 4 x parenthèse gauche 5 moins x parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 51
 */
sre.NobleFrenchTest.prototype.testSample_51 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>2</mn><mo>(</mo><mi>x</mi><mo>−' +
      '</mo><mn>3</mn><mo>)</mo><mo>+</mo><mn>6</mn><mo>(</mo><mn>1</mn>' +
      '<mo>−</mo><mi>x</mi><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y égale 2 parenthèse gauche x moins 3 parenthèse droite plus 6 parenthèse gauche 1 moins x parenthèse droite', 'default');
  this.executeRuleTest(mml, 'y égale 2 parenthèse gauche x moins 3 parenthèse droite plus 6 parenthèse gauche 1 moins x parenthèse droite', 'brief');
  this.executeRuleTest(mml, 'y égale 2 parenthèse gauche x moins 3 parenthèse droite plus 6 parenthèse gauche 1 moins x parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 52
 */
sre.NobleFrenchTest.prototype.testSample_52 = function() {
  var mml = '<mrow>' +
      '<mn>0.25</mn><mo>&#x003E;</mo><mfrac>' +
      '<mn>5</mn>' +
      '<mrow>' +
      '<mn>16</mn>' +
      '</mrow>' +
      '</mfrac>    ' +
      '</mrow>';
  this.executeRuleTest(mml, '0,25 supérieur à cinq-seizièmes', 'default');
  this.executeRuleTest(mml, '0,25 supérieur à cinq-seizièmes', 'brief');
  this.executeRuleTest(mml, '0,25 supérieur à cinq-seizièmes', 'sbrief');
};


/**
 * Testing Sample 53
 */
sre.NobleFrenchTest.prototype.testSample_53 = function() {
  var mml = '<mrow>' +
      '<mn>32</mn><mo>&#x22C5;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mn>5</mn><mo>&#x22C5;</mo><mn>7</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '32 opérateur point parenthèse gauche 5 opérateur point 7 parenthèse droite', 'default');
  this.executeRuleTest(mml, '32 opérateur point parenthèse gauche 5 opérateur point 7 parenthèse droite', 'brief');
  this.executeRuleTest(mml, '32 opérateur point parenthèse gauche 5 opérateur point 7 parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 54
 */
sre.NobleFrenchTest.prototype.testSample_54 = function() {
  var mml = '<mrow><mrow><mo>(</mo><mfrac><mrow><mn>1</mn></mrow><mrow>' +
      '<mn>2</mn></mrow></mfrac><mo>×</mo><mfrac><mrow><mn>1</mn></mrow>' +
      '<mrow><mn>2</mn></mrow></mfrac><mo>×</mo><mi>π</mi><mo>×</mo><mn>2' +
      '</mn><mo>)</mo></mrow><mo>+</mo><mrow><mo>(</mo><mn>2</mn><mo>×' +
      '</mo><mfrac><mrow><mn>1</mn></mrow><mrow><mn>2</mn></mrow></mfrac>' +
      '<mo>×</mo><mi>π</mi><mo>×</mo><mn>5</mn><mo>)</mo></mrow></mrow>';
  this.executeRuleTest(mml, 'parenthèse gauche un-demi multiplié par un-demi multiplié par pi multiplié par 2 parenthèse droite plus parenthèse gauche 2 multiplié par un-demi multiplié par pi multiplié par 5 parenthèse droite', 'default');
  this.executeRuleTest(mml, 'parenthèse gauche un-demi multiplié par un-demi multiplié par pi multiplié par 2 parenthèse droite plus parenthèse gauche 2 multiplié par un-demi multiplié par pi multiplié par 5 parenthèse droite',
                       'brief');
  this.executeRuleTest(mml, 'parenthèse gauche un-demi multiplié par un-demi multiplié par pi multiplié par 2 parenthèse droite plus parenthèse gauche 2 multiplié par un-demi multiplié par pi multiplié par 5 parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 55
 */
sre.NobleFrenchTest.prototype.testSample_55 = function() {
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
  this.executeRuleTest(mml, 'liminf début souscript n flèche droite infini fin scripts E majuscule indice n position de base égale réunion de la famille début souscript n plus grand ou égal à 1 fin scripts intersection de la famille début souscript k plus grand ou égal à n fin scripts E majuscule indice k position de base virgule limsup début souscript n flèche droite infini fin scripts E majuscule indice n position de base égale intersection de la famille début souscript n plus grand ou égal à 1 fin scripts réunion de la famille début souscript k plus grand ou égal à n fin scripts E majuscule indice k position de base point', 'default');
  this.executeRuleTest(mml, 'liminf début souscript n flèche droite infini fin scripts E majuscule sub n position de base égale réunion de la famille début souscript n plus grand ou égal à 1 fin scripts intersection de la famille début souscript k plus grand ou égal à n fin scripts E majuscule sub k position de base virgule limsup début souscript n flèche droite infini fin scripts E majuscule sub n position de base égale intersection de la famille début souscript n plus grand ou égal à 1 fin scripts réunion de la famille début souscript k plus grand ou égal à n fin scripts E majuscule sub k position de base point', 'brief');
  this.executeRuleTest(mml, 'liminf début souscript n flèche droite infini fin scripts E majuscule sub n position de base égale réunion de la famille début souscript n plus grand ou égal à 1 fin scripts intersection de la famille début souscript k plus grand ou égal à n fin scripts E majuscule sub k position de base virgule limsup début souscript n flèche droite infini fin scripts E majuscule sub n position de base égale intersection de la famille début souscript n plus grand ou égal à 1 fin scripts réunion de la famille début souscript k plus grand ou égal à n fin scripts E majuscule sub k position de base point', 'sbrief');
};


/**
 * Testing Sample 56
 */
sre.NobleFrenchTest.prototype.testSample_56 = function() {
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
  this.executeRuleTest(mml, 'début tableau 1re rangée 1re colonne parenthèse gauche i parenthèse droite 2e colonne S majuscule en script appartient à A majuscule en script point virgule 2e rangée 1re colonne parenthèse gauche ii parenthèse droite 2e colonne if E majuscule appartient à A majuscule en script then suscrire E majuscule avec tiret en chef appartient à A majuscule en script point virgule 3e rangée 1re colonne parenthèse gauche iii parenthèse droite 2e colonne if E majuscule indice 1 position de base virgule E majuscule indice 2 position de base appartient à A majuscule en script then E majuscule indice 1 position de base union E majuscule indice 2 position de base appartient à A majuscule en script point fin tableau', 'default');
  this.executeRuleTest(mml, 'début tableau 1re rangée 1re colonne parenthèse gauche i parenthèse droite 2e colonne S majuscule en script appartient à A majuscule en script point virgule 2e rangée 1re colonne parenthèse gauche ii parenthèse droite 2e colonne if E majuscule appartient à A majuscule en script then suscrire E majuscule avec tiret en chef appartient à A majuscule en script point virgule 3e rangée 1re colonne parenthèse gauche iii parenthèse droite 2e colonne if E majuscule 1 virgule E majuscule 2 appartient à A majuscule en script then E majuscule 1 union E majuscule 2 appartient à A majuscule en script point fin tableau', 'brief');
  this.executeRuleTest(mml, 'tableau 1re rangée 1re colonne parenthèse gauche i parenthèse droite 2e colonne S majuscule en script appartient à A majuscule en script point virgule 2e rangée 1re colonne parenthèse gauche ii parenthèse droite 2e colonne if E majuscule appartient à A majuscule en script then suscrire E majuscule avec tiret en chef appartient à A majuscule en script point virgule 3e rangée 1re colonne parenthèse gauche iii parenthèse droite 2e colonne if E majuscule 1 virgule E majuscule 2 appartient à A majuscule en script then E majuscule 1 union E majuscule 2 appartient à A majuscule en script point fin tableau', 'sbrief');
};


/**
 * Testing Sample 57
 */
sre.NobleFrenchTest.prototype.testSample_57 = function() {
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
  this.executeRuleTest(mml, 'début tableau 1re rangée 1re colonne vide 2e colonne vide 3e colonne parenthèse gauche A majuscule en normal point 1 parenthèse droite I majuscule f A majuscule appartient à F ronde majuscule en script t h e n 0 plus petit ou égal à P majuscule accolade gauche A majuscule accolade droite plus petit ou égal à 1 point 4e colonne parenthèse gauche 1 parenthèse droite 2e rangée 1re colonne vide 2e colonne vide 3e colonne parenthèse gauche A majuscule en normal point 2 parenthèse droite P majuscule accolade gauche S majuscule en script accolade droite égale 1 point 4e colonne parenthèse gauche 2 parenthèse droite 3e rangée 1re colonne vide 2e colonne vide 3e colonne parenthèse gauche A majuscule en normal point 3 parenthèse droite I majuscule f accolade gauche E majuscule indice n position de base virgule n plus grand ou égal à 1 accolade droite appartient à F ronde majuscule en script is a sequence of disjoint 4e colonne parenthèse gauche 3 parenthèse droite fin tableau', 'default');
  this.executeRuleTest(mml, 'début tableau 1re rangée 1re colonne vide 2e colonne vide 3e colonne parenthèse gauche A majuscule en normal point 1 parenthèse droite I majuscule f A majuscule appartient à F ronde majuscule en script t h e n 0 plus petit ou égal à P majuscule accolade gauche A majuscule accolade droite plus petit ou égal à 1 point 4e colonne parenthèse gauche 1 parenthèse droite 2e rangée 1re colonne vide 2e colonne vide 3e colonne parenthèse gauche A majuscule en normal point 2 parenthèse droite P majuscule accolade gauche S majuscule en script accolade droite égale 1 point 4e colonne parenthèse gauche 2 parenthèse droite 3e rangée 1re colonne vide 2e colonne vide 3e colonne parenthèse gauche A majuscule en normal point 3 parenthèse droite I majuscule f accolade gauche E majuscule sub n position de base virgule n plus grand ou égal à 1 accolade droite appartient à F ronde majuscule en script is a sequence of disjoint 4e colonne parenthèse gauche 3 parenthèse droite fin tableau', 'brief');
  this.executeRuleTest(mml, 'tableau 1re rangée 1re colonne vide 2e colonne vide 3e colonne parenthèse gauche A majuscule en normal point 1 parenthèse droite I majuscule f A majuscule appartient à F ronde majuscule en script t h e n 0 plus petit ou égal à P majuscule accolade gauche A majuscule accolade droite plus petit ou égal à 1 point 4e colonne parenthèse gauche 1 parenthèse droite 2e rangée 1re colonne vide 2e colonne vide 3e colonne parenthèse gauche A majuscule en normal point 2 parenthèse droite P majuscule accolade gauche S majuscule en script accolade droite égale 1 point 4e colonne parenthèse gauche 2 parenthèse droite 3e rangée 1re colonne vide 2e colonne vide 3e colonne parenthèse gauche A majuscule en normal point 3 parenthèse droite I majuscule f accolade gauche E majuscule sub n position de base virgule n plus grand ou égal à 1 accolade droite appartient à F ronde majuscule en script is a sequence of disjoint 4e colonne parenthèse gauche 3 parenthèse droite fin tableau', 'sbrief');
};


/**
 * Testing Sample 58
 */
sre.NobleFrenchTest.prototype.testSample_58 = function() {
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
  this.executeRuleTest(mml, 'P majuscule accolade gauche B majuscule indice j position de base barre verticale A majuscule accolade droite égale début fraction P majuscule accolade gauche B majuscule indice j position de base accolade droite P majuscule accolade gauche A majuscule barre verticale B majuscule indice j position de base accolade droite sur sommation début souscript j prime appartient à J majuscule fin scripts P majuscule accolade gauche B majuscule indice j prime position de base accolade droite P majuscule accolade gauche A majuscule barre verticale B majuscule indice j prime position de base accolade droite fin fraction point',
                       'default');
  this.executeRuleTest(mml, 'P majuscule accolade gauche B majuscule sub j position de base barre verticale A majuscule accolade droite égale début frac P majuscule accolade gauche B majuscule sub j position de base accolade droite P majuscule accolade gauche A majuscule barre verticale B majuscule sub j position de base accolade droite sur sommation début souscript j prime appartient à J majuscule fin scripts P majuscule accolade gauche B majuscule sub j prime position de base accolade droite P majuscule accolade gauche A majuscule barre verticale B majuscule sub j prime position de base accolade droite fin frac point', 'brief');
  this.executeRuleTest(mml, 'P majuscule accolade gauche B majuscule sub j position de base barre verticale A majuscule accolade droite égale frac P majuscule accolade gauche B majuscule sub j position de base accolade droite P majuscule accolade gauche A majuscule barre verticale B majuscule sub j position de base accolade droite sur  sommation début souscript j prime appartient à J majuscule fin scripts P majuscule accolade gauche B majuscule sub j prime position de base accolade droite P majuscule accolade gauche A majuscule barre verticale B majuscule sub j prime position de base accolade droite fin frac point', 'sbrief');
};


/**
 * Testing Sample 59
 */
sre.NobleFrenchTest.prototype.testSample_59 = function() {
  var mml = '<mrow><msub><mi>&#x03BC;</mi><mrow><mn>1</mn></mrow></msub><mo' +
      ' stretchy="false">(</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=' +
      '</mo><msub><mo>&#x222B;</mo><mrow><mi>B</mi></mrow></msub><mi>f' +
      '</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)' +
      '</mo><mi>d</mi><msub><mi>&#x03BC;</mi><mrow><mn>2</mn></mrow>' +
      '</msub><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)' +
      '</mo></mrow>';
  this.executeRuleTest(mml, 'mû indice 1 position de base parenthèse gauche B majuscule parenthèse droite égale intégrale début souscript B majuscule fin scripts f parenthèse gauche x parenthèse droite d mû indice 2 position de base parenthèse gauche x parenthèse droite', 'default');
  this.executeRuleTest(mml, 'mû 1 parenthèse gauche B majuscule parenthèse droite égale intégrale début souscript B majuscule fin scripts f parenthèse gauche x parenthèse droite d mû 2 parenthèse gauche x parenthèse droite', 'brief');
  this.executeRuleTest(mml, 'mû 1 parenthèse gauche B majuscule parenthèse droite égale intégrale début souscript B majuscule fin scripts f parenthèse gauche x parenthèse droite d mû 2 parenthèse gauche x parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 60
 */
sre.NobleFrenchTest.prototype.testSample_60 = function() {
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
  this.executeRuleTest(mml, 'limite début souscript n flèche droite infini fin scripts E majuscule accolade gauche début valeur absolue X majuscule indice n position de base moins X majuscule fin valeur absolue accolade droite égale E majuscule accolade gauche limite début souscript n flèche droite infini fin scripts début valeur absolue X majuscule indice n position de base moins X majuscule fin valeur absolue accolade droite égale 0 point', 'default');
  this.executeRuleTest(mml, 'limite début souscript n flèche droite infini fin scripts E majuscule accolade gauche début valeur absolue X majuscule sub n position de base moins X majuscule fin valeur absolue accolade droite égale E majuscule accolade gauche limite début souscript n flèche droite infini fin scripts début valeur absolue X majuscule sub n position de base moins X majuscule fin valeur absolue accolade droite égale 0 point', 'brief');
  this.executeRuleTest(mml, 'limite début souscript n flèche droite infini fin scripts E majuscule accolade gauche valeur absolue X majuscule sub n position de base moins X majuscule fin valeur absolue accolade droite égale E majuscule accolade gauche limite début souscript n flèche droite infini fin scripts valeur absolue X majuscule sub n position de base moins X majuscule fin valeur absolue accolade droite égale 0 point', 'sbrief');
};


/**
 * Testing Sample 61
 */
sre.NobleFrenchTest.prototype.testSample_61 = function() {
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
  this.executeRuleTest(mml, 'début tableau 1re rangée 1re colonne P majuscule indice mû virgule sigma position de base accolade gauche Y majuscule plus grand ou égal à l indice bêta position de base parenthèse gauche suscrire Y majuscule avec tiret en chef indice n position de base virgule S majuscule indice n position de base parenthèse droite accolade droite égale P majuscule indice mû virgule sigma position de base accolade gauche parenthèse gauche Y majuscule moins suscrire Y majuscule avec tiret en chef indice n position de base parenthèse droite barre oblique parenthèse gauche S majuscule point médian parenthèse gauche 1 plus début fraction 1 sur n fin fraction parenthèse droite exposant 1 barre oblique 2 position de base parenthèse droite plus grand ou égal à négatif t indice bêta position de base crochet gauche n moins 1 crochet droit accolade droite égale bêta virgule 2e rangée 1re colonne vide 2e colonne parenthèse gauche 1 parenthèse droite fin tableau', 'default');
  this.executeRuleTest(mml, 'début tableau 1re rangée 1re colonne P majuscule sub mû virgule sigma position de base accolade gauche Y majuscule plus grand ou égal à l sub bêta position de base parenthèse gauche suscrire Y majuscule avec tiret en chef sub n position de base virgule S majuscule sub n position de base parenthèse droite accolade droite égale P majuscule sub mû virgule sigma position de base accolade gauche parenthèse gauche Y majuscule moins suscrire Y majuscule avec tiret en chef sub n position de base parenthèse droite barre oblique parenthèse gauche S majuscule point médian parenthèse gauche 1 plus début frac 1 sur n fin frac parenthèse droite sup 1 barre oblique 2 position de base parenthèse droite plus grand ou égal à négatif t sub bêta position de base crochet gauche n moins 1 crochet droit accolade droite égale bêta virgule 2e rangée 1re colonne vide 2e colonne parenthèse gauche 1 parenthèse droite fin tableau', 'brief');
  this.executeRuleTest(mml, 'tableau 1re rangée 1re colonne P majuscule sub mû virgule sigma position de base accolade gauche Y majuscule plus grand ou égal à l sub bêta position de base parenthèse gauche suscrire Y majuscule avec tiret en chef sub n position de base virgule S majuscule sub n position de base parenthèse droite accolade droite égale P majuscule sub mû virgule sigma position de base accolade gauche parenthèse gauche Y majuscule moins suscrire Y majuscule avec tiret en chef sub n position de base parenthèse droite barre oblique parenthèse gauche S majuscule point médian parenthèse gauche 1 plus frac 1 sur  n fin frac parenthèse droite sup 1 barre oblique 2 position de base parenthèse droite plus grand ou égal à négatif t sub bêta position de base crochet gauche n moins 1 crochet droit accolade droite égale bêta virgule 2e rangée 1re colonne vide 2e colonne parenthèse gauche 1 parenthèse droite fin tableau', 'sbrief');
};


/**
 * Testing Sample 62
 */
sre.NobleFrenchTest.prototype.testSample_62 = function() {
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
  this.executeRuleTest(mml, 'L majuscule égale début matrice 5 par 6 1re rangée 1re colonne 1 2e colonne négatif 1 3e colonne vide 4e colonne vide 5e colonne vide 6e colonne vide 2e rangée 1re colonne vide 2e colonne 1 3e colonne négatif 1 4e colonne vide 5e colonne 0 6e colonne vide 3e rangée 1re colonne vide 2e colonne vide 3e colonne vide 4e colonne vide 5e colonne vide 6e colonne vide 4e rangée 1re colonne vide 2e colonne 0 3e colonne vide 4e colonne vide 5e colonne vide 6e colonne vide 5e rangée 1re colonne vide 2e colonne vide 3e colonne vide 4e colonne vide 5e colonne 1 6e colonne négatif 1 fin matrice point',
                       'default');
  this.executeRuleTest(mml, 'L majuscule égale début matrice 5 par 6 1re rangée 1re colonne 1 2e colonne négatif 1 3e colonne vide 4e colonne vide 5e colonne vide 6e colonne vide 2e rangée 1re colonne vide 2e colonne 1 3e colonne négatif 1 4e colonne vide 5e colonne 0 6e colonne vide 3e rangée 1re colonne vide 2e colonne vide 3e colonne vide 4e colonne vide 5e colonne vide 6e colonne vide 4e rangée 1re colonne vide 2e colonne 0 3e colonne vide 4e colonne vide 5e colonne vide 6e colonne vide 5e rangée 1re colonne vide 2e colonne vide 3e colonne vide 4e colonne vide 5e colonne 1 6e colonne négatif 1 fin matrice point',
                       'brief');
  this.executeRuleTest(mml, 'L majuscule égale matrice 5 par 6 1re rangée 1re colonne 1 2e colonne négatif 1 3e colonne vide 4e colonne vide 5e colonne vide 6e colonne vide 2e rangée 1re colonne vide 2e colonne 1 3e colonne négatif 1 4e colonne vide 5e colonne 0 6e colonne vide 3e rangée 1re colonne vide 2e colonne vide 3e colonne vide 4e colonne vide 5e colonne vide 6e colonne vide 4e rangée 1re colonne vide 2e colonne 0 3e colonne vide 4e colonne vide 5e colonne vide 6e colonne vide 5e rangée 1re colonne vide 2e colonne vide 3e colonne vide 4e colonne vide 5e colonne 1 6e colonne négatif 1 fin matrice point', 'sbrief');
};


/**
 * Testing Sample 63
 */
sre.NobleFrenchTest.prototype.testSample_63 = function() {
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
  this.executeRuleTest(mml, 'début racine carrée n fin racine carrée crochet gauche suscrire Y majuscule avec tiret en chef indice n position de base moins parenthèse gauche mû plus z indice bêta position de base sigma parenthèse droite crochet droit barre oblique S majuscule indice n position de base tilde début fraction U majuscule plus début racine carrée n fin racine carrée z indice 1 moins bêta position de base sur parenthèse gauche chi au carré crochet gauche n moins 1 crochet droit barre oblique parenthèse gauche n moins 1 parenthèse droite parenthèse droite exposant 1 barre oblique 2 position de base fin fraction tilde t crochet gauche n moins 1 point virgule début racine carrée n fin racine carrée z indice 1 moins bêta position de base crochet droit virgule', 'default');
  this.executeRuleTest(mml, 'début racine carrée n fin racine carrée crochet gauche suscrire Y majuscule avec tiret en chef sub n position de base moins parenthèse gauche mû plus z sub bêta position de base sigma parenthèse droite crochet droit barre oblique S majuscule sub n position de base tilde début frac U majuscule plus début racine carrée n fin racine carrée z sub 1 moins bêta position de base sur parenthèse gauche chi au carré crochet gauche n moins 1 crochet droit barre oblique parenthèse gauche n moins 1 parenthèse droite parenthèse droite sup 1 barre oblique 2 position de base fin frac tilde t crochet gauche n moins 1 point virgule début racine carrée n fin racine carrée z sub 1 moins bêta position de base crochet droit virgule', 'brief');
  this.executeRuleTest(mml, 'racine carrée n fin racine carrée crochet gauche suscrire Y majuscule avec tiret en chef sub n position de base moins parenthèse gauche mû plus z sub bêta position de base sigma parenthèse droite crochet droit barre oblique S majuscule sub n position de base tilde frac U majuscule plus racine carrée n fin racine carrée z sub 1 moins bêta position de base sur  parenthèse gauche chi au carré crochet gauche n moins 1 crochet droit barre oblique parenthèse gauche n moins 1 parenthèse droite parenthèse droite sup 1 barre oblique 2 position de base fin frac tilde t crochet gauche n moins 1 point virgule racine carrée n fin racine carrée z sub 1 moins bêta position de base crochet droit virgule',
                       'sbrief');
};


/**
 * Testing Sample 64
 */
sre.NobleFrenchTest.prototype.testSample_64 = function() {
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
  this.executeRuleTest(mml, 'début tableau 1re rangée 1re colonne gamma 2e colonne égale P majuscule accolade gauche E majuscule indice p virgule q position de base sous-ensemble de parenthèse gauche X majuscule indice parenthèse gauche r parenthèse droite position de base virgule X majuscule indice parenthèse gauche s parenthèse droite position de base accolade droite 2e rangée 1re colonne vide 2e colonne égale début fraction n factorielle sur parenthèse gauche r moins 1 parenthèse droite factorielle fin fraction sommation début souscript j égale 0 début suscript s moins r moins 1 fin scripts parenthèse gauche négatif 1 parenthèse droite exposant j position de base début fraction p exposant r plus j position de base sur parenthèse gauche n moins r moins j parenthèse droite factorielle j factorielle fin fraction I majuscule indice 1 moins q position de base parenthèse gauche n moins s plus 1 virgule s moins r moins j parenthèse droite point fin tableau', 'default');
  this.executeRuleTest(mml, 'début tableau 1re rangée 1re colonne gamma 2e colonne égale P majuscule accolade gauche E majuscule sub p virgule q position de base sous-ensemble de parenthèse gauche X majuscule sub parenthèse gauche r parenthèse droite position de base virgule X majuscule sub parenthèse gauche s parenthèse droite position de base accolade droite 2e rangée 1re colonne vide 2e colonne égale début frac n factorielle sur parenthèse gauche r moins 1 parenthèse droite factorielle fin frac sommation début souscript j égale 0 début suscript s moins r moins 1 fin scripts parenthèse gauche négatif 1 parenthèse droite sup j position de base début frac p sup r plus j position de base sur parenthèse gauche n moins r moins j parenthèse droite factorielle j factorielle fin frac I majuscule sub 1 moins q position de base parenthèse gauche n moins s plus 1 virgule s moins r moins j parenthèse droite point fin tableau', 'brief');
  this.executeRuleTest(mml, 'tableau 1re rangée 1re colonne gamma 2e colonne égale P majuscule accolade gauche E majuscule sub p virgule q position de base sous-ensemble de parenthèse gauche X majuscule sub parenthèse gauche r parenthèse droite position de base virgule X majuscule sub parenthèse gauche s parenthèse droite position de base accolade droite 2e rangée 1re colonne vide 2e colonne égale frac n factorielle sur  parenthèse gauche r moins 1 parenthèse droite factorielle fin frac sommation début souscript j égale 0 début suscript s moins r moins 1 fin scripts parenthèse gauche négatif 1 parenthèse droite sup j position de base frac p sup r plus j position de base sur  parenthèse gauche n moins r moins j parenthèse droite factorielle j factorielle fin frac I majuscule sub 1 moins q position de base parenthèse gauche n moins s plus 1 virgule s moins r moins j parenthèse droite point fin tableau', 'sbrief');
};


/**
 * Testing Sample 65
 */
sre.NobleFrenchTest.prototype.testSample_65 = function() {
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
  this.executeRuleTest(mml, 'S majuscule indice i position de base début binomiale x parmi t fin binomiale égale début matrice 2 par 2 1re rangée 1re colonne 1 barre oblique m 2e colonne 0 2e rangée 1re colonne a indice i position de base 2e colonne r indice i position de base fin matrice début binomiale x parmi t fin binomiale plus début binomiale b indice i position de base parmi parenthèse gauche i moins 1 parenthèse droite barre oblique m fin binomiale virgule', 'default');
  this.executeRuleTest(mml, 'S majuscule sub i position de base début binomiale x parmi t fin binomiale égale début matrice 2 par 2 1re rangée 1re colonne 1 barre oblique m 2e colonne 0 2e rangée 1re colonne a sub i position de base 2e colonne r sub i position de base fin matrice début binomiale x parmi t fin binomiale plus début binomiale b sub i position de base parmi parenthèse gauche i moins 1 parenthèse droite barre oblique m fin binomiale virgule', 'brief');
  this.executeRuleTest(mml, 'S majuscule sub i position de base binomiale t parmi x fin binomiale égale matrice 2 par 2 1re rangée 1re colonne 1 barre oblique m 2e colonne 0 2e rangée 1re colonne a sub i position de base 2e colonne r sub i position de base fin matrice binomiale t parmi x fin binomiale plus binomiale parenthèse gauche i moins 1 parenthèse droite barre oblique m parmi b sub i position de base fin binomiale virgule', 'sbrief');
};


/**
 * Testing Sample 66
 */
sre.NobleFrenchTest.prototype.testSample_66 = function() {
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
  this.executeRuleTest(mml, 'c indice 1 position de base h exposant 4 moins 2 s position de base plus petit ou égal à début fraction 1 sur 2 T majuscule fin fraction intégrale indice inférieur négatif T majuscule indice supérieur T majuscule position de base parenthèse gauche f parenthèse gauche t plus h parenthèse droite moins f parenthèse gauche t parenthèse droite parenthèse droite au carré d en normal t plus petit ou égal à c indice 2 position de base h exposant 4 moins 2 s', 'default');
  this.executeRuleTest(mml, 'c 1 h sup 4 moins 2 s position de base plus petit ou égal à début frac 1 sur 2 T majuscule fin frac intégrale inf négatif T majuscule sup T majuscule position de base parenthèse gauche f parenthèse gauche t plus h parenthèse droite moins f parenthèse gauche t parenthèse droite parenthèse droite au carré d en normal t plus petit ou égal à c 2 h sup 4 moins 2 s', 'brief');
  this.executeRuleTest(mml, 'c 1 h sup 4 moins 2 s position de base plus petit ou égal à frac 1 sur  2 T majuscule fin frac intégrale inf négatif T majuscule sup T majuscule position de base parenthèse gauche f parenthèse gauche t plus h parenthèse droite moins f parenthèse gauche t parenthèse droite parenthèse droite au carré d en normal t plus petit ou égal à c 2 h sup 4 moins 2 s', 'sbrief');
};


/**
 * Testing Sample 67
 */
sre.NobleFrenchTest.prototype.testSample_67 = function() {
  var mml = '<mrow><mi>C</mi><mo stretchy="false">(</mo><mn>0</mn><mo' +
      ' stretchy="false">)</mo><mo>&#x2212;</mo><mi>C</mi><mo' +
      ' stretchy="false">(</mo><mi>h</mi><mo stretchy="false">)</mo>' +
      '<mo>&#x2243;</mo><mi>c</mi><msup><mrow><mi>h</mi></mrow><mrow>' +
      '<mn>4</mn><mo>&#x2212;</mo><mn>2</mn><mi>s</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'C majuscule parenthèse gauche 0 parenthèse droite moins C majuscule parenthèse gauche h parenthèse droite asymptotiquement égal à c h exposant 4 moins 2 s', 'default');
  this.executeRuleTest(mml, 'C majuscule parenthèse gauche 0 parenthèse droite moins C majuscule parenthèse gauche h parenthèse droite asymptotiquement égal à c h sup 4 moins 2 s', 'brief');
  this.executeRuleTest(mml, 'C majuscule parenthèse gauche 0 parenthèse droite moins C majuscule parenthèse gauche h parenthèse droite asymptotiquement égal à c h sup 4 moins 2 s', 'sbrief');
};


/**
 * Testing Sample 68
 */
sre.NobleFrenchTest.prototype.testSample_68 = function() {
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
  this.executeRuleTest(mml, 'S majuscule parenthèse gauche oméga parenthèse droite égale limite début souscript T majuscule flèche droite infini fin scripts début fraction 1 sur 2 T majuscule fin fraction début valeur absolue intégrale indice inférieur négatif T majuscule indice supérieur T majuscule position de base virgule f virgule parenthèse gauche virgule t virgule parenthèse droite virgule e en normal exposant i t en italique oméga position de base virgule d en normal virgule t fin valeur absolue au carré point', 'default');
  this.executeRuleTest(mml, 'S majuscule parenthèse gauche oméga parenthèse droite égale limite début souscript T majuscule flèche droite infini fin scripts début frac 1 sur 2 T majuscule fin frac début valeur absolue intégrale inf négatif T majuscule sup T majuscule position de base virgule f virgule parenthèse gauche virgule t virgule parenthèse droite virgule e en normal sup i t en italique oméga position de base virgule d en normal virgule t fin valeur absolue au carré point', 'brief');
  this.executeRuleTest(mml, 'S majuscule parenthèse gauche oméga parenthèse droite égale limite début souscript T majuscule flèche droite infini fin scripts frac 1 sur  2 T majuscule fin frac valeur absolue intégrale inf négatif T majuscule sup T majuscule position de base virgule f virgule parenthèse gauche virgule t virgule parenthèse droite virgule e en normal sup i t en italique oméga position de base virgule d en normal virgule t fin valeur absolue au carré point', 'sbrief');
};


/**
 * Testing Sample 69
 */
sre.NobleFrenchTest.prototype.testSample_69 = function() {
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
  this.executeRuleTest(mml, 'intégrale indice inférieur 0 indice supérieur 1 position de base intégrale indice inférieur 0 indice supérieur 1 position de base crochet gauche début valeur absolue f parenthèse gauche t parenthèse droite moins f parenthèse gauche u parenthèse droite fin valeur absolue au carré plus début valeur absolue t moins u fin valeur absolue au carré crochet droit exposant négatif s barre oblique 2 position de base d en normal t d en normal u inférieur à infini',
                       'default');
  this.executeRuleTest(mml, 'intégrale inf 0 sup 1 position de base intégrale inf 0 sup 1 position de base crochet gauche début valeur absolue f parenthèse gauche t parenthèse droite moins f parenthèse gauche u parenthèse droite fin valeur absolue au carré plus début valeur absolue t moins u fin valeur absolue au carré crochet droit sup négatif s barre oblique 2 position de base d en normal t d en normal u inférieur à infini',
                       'brief');
  this.executeRuleTest(mml, 'intégrale inf 0 sup 1 position de base intégrale inf 0 sup 1 position de base crochet gauche valeur absolue f parenthèse gauche t parenthèse droite moins f parenthèse gauche u parenthèse droite fin valeur absolue au carré plus valeur absolue t moins u fin valeur absolue au carré crochet droit sup négatif s barre oblique 2 position de base d en normal t d en normal u inférieur à infini', 'sbrief');
};


/**
 * Testing Sample 70
 */
sre.NobleFrenchTest.prototype.testSample_70 = function() {
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
  this.executeRuleTest(mml, 'E majuscule en sans empattement parenthèse gauche sommation début souscript I majuscule appartient à E majuscule indice k plus 1 position de base fin scripts début valeur absolue I majuscule fin valeur absolue exposant s position de base parenthèse droite égale E majuscule en sans empattement parenthèse gauche sommation début souscript I majuscule appartient à E majuscule indice k position de base fin scripts début valeur absolue I majuscule fin valeur absolue exposant s position de base parenthèse droite E majuscule en sans empattement parenthèse gauche R majuscule indice 1 exposant s position de base plus R majuscule indice 2 exposant s position de base parenthèse droite point', 'default');
  this.executeRuleTest(mml, 'E majuscule en sans empattement parenthèse gauche sommation début souscript I majuscule appartient à E majuscule sub k plus 1 position de base fin scripts début valeur absolue I majuscule fin valeur absolue sup s position de base parenthèse droite égale E majuscule en sans empattement parenthèse gauche sommation début souscript I majuscule appartient à E majuscule sub k position de base fin scripts début valeur absolue I majuscule fin valeur absolue sup s position de base parenthèse droite E majuscule en sans empattement parenthèse gauche R majuscule 1 sup s position de base plus R majuscule 2 sup s position de base parenthèse droite point',
                       'brief');
  this.executeRuleTest(mml, 'E majuscule en sans empattement parenthèse gauche sommation début souscript I majuscule appartient à E majuscule sub k plus 1 position de base fin scripts valeur absolue I majuscule fin valeur absolue sup s position de base parenthèse droite égale E majuscule en sans empattement parenthèse gauche sommation début souscript I majuscule appartient à E majuscule sub k position de base fin scripts valeur absolue I majuscule fin valeur absolue sup s position de base parenthèse droite E majuscule en sans empattement parenthèse gauche R majuscule 1 sup s position de base plus R majuscule 2 sup s position de base parenthèse droite point', 'sbrief');
};


/**
 * Testing Sample 71
 */
sre.NobleFrenchTest.prototype.testSample_71 = function() {
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
  this.executeRuleTest(mml, 'parenthèse gauche x indice 1 position de base virgule y indice 1 position de base parenthèse droite',
                       'default');
  this.executeRuleTest(mml, 'parenthèse gauche x 1 virgule y 1 parenthèse droite', 'brief');
  this.executeRuleTest(mml, 'parenthèse gauche x 1 virgule y 1 parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 72
 */
sre.NobleFrenchTest.prototype.testSample_72 = function() {
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
  this.executeRuleTest(mml, 'parenthèse gauche x indice 2 position de base virgule y indice 2 position de base parenthèse droite',
                       'default');
  this.executeRuleTest(mml, 'parenthèse gauche x 2 virgule y 2 parenthèse droite', 'brief');
  this.executeRuleTest(mml, 'parenthèse gauche x 2 virgule y 2 parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 73
 */
sre.NobleFrenchTest.prototype.testSample_73 = function() {
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
  this.executeRuleTest(mml, 'd égale début racine carrée parenthèse gauche x indice 2 position de base moins x indice 1 position de base parenthèse droite au carré plus parenthèse gauche y indice 2 position de base moins y indice 1 position de base parenthèse droite au carré fin racine carrée', 'default');
  this.executeRuleTest(mml, 'd égale début racine carrée parenthèse gauche x 2 moins x 1 parenthèse droite au carré plus parenthèse gauche y 2 moins y 1 parenthèse droite au carré fin racine carrée', 'brief');
  this.executeRuleTest(mml, 'd égale racine carrée parenthèse gauche x 2 moins x 1 parenthèse droite au carré plus parenthèse gauche y 2 moins y 1 parenthèse droite au carré fin racine carrée', 'sbrief');
};


/**
 * Testing Sample 74
 */
sre.NobleFrenchTest.prototype.testSample_74 = function() {
  var mml = '<mi>&#x211D;</mi>';
  this.executeRuleTest(mml, 'R majuscule en ajouré', 'default');
  this.executeRuleTest(mml, 'R majuscule en ajouré', 'brief');
  this.executeRuleTest(mml, 'R majuscule en ajouré', 'sbrief');
};


/**
 * Testing Sample 75
 */
sre.NobleFrenchTest.prototype.testSample_75 = function() {
  var mml = '<mrow>' +
      '<mi>&#x211D;</mi><mo>=</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mi>&#x221E;</mi><mo>,</mo><mi>&#x221E;</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>';
  this.executeRuleTest(mml, 'R majuscule en ajouré égale parenthèse gauche négatif infini virgule infini parenthèse droite', 'default');
  this.executeRuleTest(mml, 'R majuscule en ajouré égale parenthèse gauche négatif infini virgule infini parenthèse droite', 'brief');
  this.executeRuleTest(mml, 'R majuscule en ajouré égale parenthèse gauche négatif infini virgule infini parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 76
 */
sre.NobleFrenchTest.prototype.testSample_76 = function() {
  var mml = '<mrow><mrow><mo>{</mo> <mrow>' +
      '<mn>1</mn><mo>,</mo><mn>2</mn><mo>,</mo><mn>3</mn></mrow> <mo>}</mo>' +
      '</mrow></mrow>';
  this.executeRuleTest(mml, 'début ensemble 1 virgule 2 virgule 3 fin ensemble', 'default');
  this.executeRuleTest(mml, 'début ensemble 1 virgule 2 virgule 3 fin ensemble', 'brief');
  this.executeRuleTest(mml, 'ensemble 1 virgule 2 virgule 3 fin ensemble', 'sbrief');
};


/**
 * Testing Sample 77
 */
sre.NobleFrenchTest.prototype.testSample_77 = function() {
  var mml = '<mrow>' +
      '<mn>1</mn><mo>&#x2208;</mo><mi>S</mi></mrow>';
  this.executeRuleTest(mml, '1 appartient à S majuscule', 'default');
  this.executeRuleTest(mml, '1 appartient à S majuscule', 'brief');
  this.executeRuleTest(mml, '1 appartient à S majuscule', 'sbrief');
};


/**
 * Testing Sample 78
 */
sre.NobleFrenchTest.prototype.testSample_78 = function() {
  var mml = '<mrow>' +
      '<mn>3</mn><mo>&#x2208;</mo><mi>S</mi></mrow>';
  this.executeRuleTest(mml, '3 appartient à S majuscule', 'default');
  this.executeRuleTest(mml, '3 appartient à S majuscule', 'brief');
  this.executeRuleTest(mml, '3 appartient à S majuscule', 'sbrief');
};


/**
 * Testing Sample 79
 */
sre.NobleFrenchTest.prototype.testSample_79 = function() {
  var mml = '<mrow>' +
      '<mn>4</mn><mo>&#x2209;</mo><mi>S</mi></mrow>';
  this.executeRuleTest(mml, '4 n\'appartient pas à S majuscule', 'default');
  this.executeRuleTest(mml, '4 n\'appartient pas à S majuscule', 'brief');
  this.executeRuleTest(mml, '4 n\'appartient pas à S majuscule', 'sbrief');
};


/**
 * Testing Sample 80
 */
sre.NobleFrenchTest.prototype.testSample_80 = function() {
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
  this.executeRuleTest(mml, 'a égale début racine carrée 3 x moins 1 fin racine carrée plus parenthèse gauche 1 plus x parenthèse droite au carré', 'default');
  this.executeRuleTest(mml, 'a égale début racine carrée 3 x moins 1 fin racine carrée plus parenthèse gauche 1 plus x parenthèse droite au carré', 'brief');
  this.executeRuleTest(mml, 'a égale racine carrée 3 x moins 1 fin racine carrée plus parenthèse gauche 1 plus x parenthèse droite au carré', 'sbrief');
};


/**
 * Testing Sample 81
 */
sre.NobleFrenchTest.prototype.testSample_81 = function() {
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
  this.executeRuleTest(mml, 'a égale début fraction parenthèse gauche b plus c parenthèse droite au carré sur d fin fraction plus début fraction parenthèse gauche e plus f parenthèse droite au carré sur g fin fraction', 'default');
  this.executeRuleTest(mml, 'a égale début frac parenthèse gauche b plus c parenthèse droite au carré sur d fin frac plus début frac parenthèse gauche e plus f parenthèse droite au carré sur g fin frac', 'brief');
  this.executeRuleTest(mml, 'a égale frac parenthèse gauche b plus c parenthèse droite au carré sur  d fin frac plus frac parenthèse gauche e plus f parenthèse droite au carré sur  g fin frac', 'sbrief');
};


/**
 * Testing Sample 82
 */
sre.NobleFrenchTest.prototype.testSample_82 = function() {
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
  this.executeRuleTest(mml, 'x égale crochet gauche parenthèse gauche a plus b parenthèse droite au carré parenthèse gauche c moins b parenthèse droite au carré crochet droit plus crochet gauche parenthèse gauche d plus e parenthèse droite au carré parenthèse gauche f moins e parenthèse droite au carré crochet droit',
                       'default');
  this.executeRuleTest(mml, 'x égale crochet gauche parenthèse gauche a plus b parenthèse droite au carré parenthèse gauche c moins b parenthèse droite au carré crochet droit plus crochet gauche parenthèse gauche d plus e parenthèse droite au carré parenthèse gauche f moins e parenthèse droite au carré crochet droit',
                       'brief');
  this.executeRuleTest(mml, 'x égale crochet gauche parenthèse gauche a plus b parenthèse droite au carré parenthèse gauche c moins b parenthèse droite au carré crochet droit plus crochet gauche parenthèse gauche d plus e parenthèse droite au carré parenthèse gauche f moins e parenthèse droite au carré crochet droit',
                       'sbrief');
};


/**
 * Testing Sample 83
 */
sre.NobleFrenchTest.prototype.testSample_83 = function() {
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
  this.executeRuleTest(mml, 'x égale crochet gauche parenthèse gauche a plus b parenthèse droite au carré crochet droit plus crochet gauche parenthèse gauche f moins e parenthèse droite au carré crochet droit', 'default');
  this.executeRuleTest(mml, 'x égale crochet gauche parenthèse gauche a plus b parenthèse droite au carré crochet droit plus crochet gauche parenthèse gauche f moins e parenthèse droite au carré crochet droit', 'brief');
  this.executeRuleTest(mml, 'x égale crochet gauche parenthèse gauche a plus b parenthèse droite au carré crochet droit plus crochet gauche parenthèse gauche f moins e parenthèse droite au carré crochet droit', 'sbrief');
};


/**
 * Testing Sample 84
 */
sre.NobleFrenchTest.prototype.testSample_84 = function() {
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
  this.executeRuleTest(mml, 'x égale crochet gauche parenthèse gauche a plus b parenthèse droite au carré crochet droit', 'default');
  this.executeRuleTest(mml, 'x égale crochet gauche parenthèse gauche a plus b parenthèse droite au carré crochet droit', 'brief');
  this.executeRuleTest(mml, 'x égale crochet gauche parenthèse gauche a plus b parenthèse droite au carré crochet droit', 'sbrief');
};


/**
 * Testing Sample 85
 */
sre.NobleFrenchTest.prototype.testSample_85 = function() {
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
  this.executeRuleTest(mml, 'x égale parenthèse gauche a plus b parenthèse droite au carré', 'default');
  this.executeRuleTest(mml, 'x égale parenthèse gauche a plus b parenthèse droite au carré', 'brief');
  this.executeRuleTest(mml, 'x égale parenthèse gauche a plus b parenthèse droite au carré', 'sbrief');
};


/**
 * Testing Sample 86
 */
sre.NobleFrenchTest.prototype.testSample_86 = function() {
  var mml = '<mrow><mi>x</mi><mo>=</mo><mi>a</mi><mo>+</mo><msup>' +
      '<mi>b</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>';
  this.executeRuleTest(mml, 'x égale a plus b au carré', 'default');
  this.executeRuleTest(mml, 'x égale a plus b au carré', 'brief');
  this.executeRuleTest(mml, 'x égale a plus b au carré', 'sbrief');
};


/**
 * Testing Sample 87
 */
sre.NobleFrenchTest.prototype.testSample_87 = function() {
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
  this.executeRuleTest(mml, 'début début fraction un-demi sur sur trois-quarts fin fin fraction égale deux-tiers', 'default');
  this.executeRuleTest(mml, 'début début frac un-demi sur sur trois-quarts fin fin frac égale deux-tiers', 'brief');
  this.executeRuleTest(mml, 'frac1imbriquée un-demi sur1imbriquée trois-quarts fin frac1imbriquée égale deux-tiers', 'sbrief');
};


/**
 * Testing Sample 88
 */
sre.NobleFrenchTest.prototype.testSample_88 = function() {
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
  this.executeRuleTest(mml, '2 parenthèse gauche parenthèse gauche x plus 1 parenthèse droite parenthèse gauche x plus 3 parenthèse droite moins 4 parenthèse gauche parenthèse gauche x moins 1 parenthèse droite parenthèse gauche x plus 2 parenthèse droite moins 3 parenthèse droite parenthèse droite égale y', 'default');
  this.executeRuleTest(mml, '2 parenthèse gauche parenthèse gauche x plus 1 parenthèse droite parenthèse gauche x plus 3 parenthèse droite moins 4 parenthèse gauche parenthèse gauche x moins 1 parenthèse droite parenthèse gauche x plus 2 parenthèse droite moins 3 parenthèse droite parenthèse droite égale y', 'brief');
  this.executeRuleTest(mml, '2 parenthèse gauche parenthèse gauche x plus 1 parenthèse droite parenthèse gauche x plus 3 parenthèse droite moins 4 parenthèse gauche parenthèse gauche x moins 1 parenthèse droite parenthèse gauche x plus 2 parenthèse droite moins 3 parenthèse droite parenthèse droite égale y', 'sbrief');
};


/**
 * Testing Sample 89
 */
sre.NobleFrenchTest.prototype.testSample_89 = function() {
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
  this.executeRuleTest(mml, 'cosinus x égale 1 moins début fraction x au carré sur 2 factorielle fin fraction plus début fraction x exposant 4 position de base sur 4 factorielle fin fraction moins points de suspension', 'default');
  this.executeRuleTest(mml, 'cosinus x égale 1 moins début frac x au carré sur 2 factorielle fin frac plus début frac x sup 4 position de base sur 4 factorielle fin frac moins points de suspension', 'brief');
  this.executeRuleTest(mml, 'cosinus x égale 1 moins frac x au carré sur  2 factorielle fin frac plus frac x sup 4 position de base sur  4 factorielle fin frac moins points de suspension', 'sbrief');
};


/**
 * Testing Sample 90
 */
sre.NobleFrenchTest.prototype.testSample_90 = function() {
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
  this.executeRuleTest(mml, 'x égale début fraction négatif b plus ou moins début racine carrée b au carré moins 4 a c fin racine carrée sur 2 a fin fraction', 'default');
  this.executeRuleTest(mml, 'x égale début frac négatif b plus ou moins début racine carrée b au carré moins 4 a c fin racine carrée sur 2 a fin frac', 'brief');
  this.executeRuleTest(mml, 'x égale frac négatif b plus ou moins racine carrée b au carré moins 4 a c fin racine carrée sur  2 a fin frac', 'sbrief');
};


/**
 * Testing Sample 91
 */
sre.NobleFrenchTest.prototype.testSample_91 = function() {
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
  this.executeRuleTest(mml, 'x plus y exposant début fraction 2 sur k plus 1 fin fraction', 'default');
  this.executeRuleTest(mml, 'x plus y sup début frac 2 sur k plus 1 fin frac', 'brief');
  this.executeRuleTest(mml, 'x plus y sup frac 2 sur  k plus 1 fin frac', 'sbrief');
};


/**
 * Testing Sample 92
 */
sre.NobleFrenchTest.prototype.testSample_92 = function() {
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
  this.executeRuleTest(mml, 'limite début souscript x flèche droite 0 fin scripts début fraction sinus x sur x fin fraction égale 1', 'default');
  this.executeRuleTest(mml, 'limite début souscript x flèche droite 0 fin scripts début frac sinus x sur x fin frac égale 1', 'brief');
  this.executeRuleTest(mml, 'limite début souscript x flèche droite 0 fin scripts frac sinus x sur  x fin frac égale 1', 'sbrief');
};


/**
 * Testing Sample 93
 */
sre.NobleFrenchTest.prototype.testSample_93 = function() {
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
  this.executeRuleTest(mml, 'd égale début racine carrée parenthèse gauche x indice 2 position de base moins x indice 1 position de base parenthèse droite au carré plus parenthèse gauche y indice 2 position de base moins y indice 1 position de base parenthèse droite au carré fin racine carrée', 'default');
  this.executeRuleTest(mml, 'd égale début racine carrée parenthèse gauche x 2 moins x 1 parenthèse droite au carré plus parenthèse gauche y 2 moins y 1 parenthèse droite au carré fin racine carrée', 'brief');
  this.executeRuleTest(mml, 'd égale racine carrée parenthèse gauche x 2 moins x 1 parenthèse droite au carré plus parenthèse gauche y 2 moins y 1 parenthèse droite au carré fin racine carrée', 'sbrief');
};


/**
 * Testing Sample 94
 */
sre.NobleFrenchTest.prototype.testSample_94 = function() {
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
  this.executeRuleTest(mml, 'F majuscule indice n position de base égale F majuscule indice n moins 1 position de base plus F majuscule indice n moins 2', 'default');
  this.executeRuleTest(mml, 'F majuscule sub n position de base égale F majuscule sub n moins 1 position de base plus F majuscule sub n moins 2', 'brief');
  this.executeRuleTest(mml, 'F majuscule sub n position de base égale F majuscule sub n moins 1 position de base plus F majuscule sub n moins 2', 'sbrief');
};


/**
 * Testing Sample 95
 */
sre.NobleFrenchTest.prototype.testSample_95 = function() {
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
  this.executeRuleTest(mml, 'Pi majuscule en gras égale début matrice 6 par 6 1re rangée 1re colonne pi indice 11 position de base 2e colonne pi indice 12 position de base 3e colonne pi indice 12 position de base 4e colonne 0 5e colonne 0 6e colonne 0 2e rangée 1re colonne pi indice 12 position de base 2e colonne pi indice 11 position de base 3e colonne pi indice 12 position de base 4e colonne 0 5e colonne 0 6e colonne 0 3e rangée 1re colonne pi indice 12 position de base 2e colonne pi indice 12 position de base 3e colonne pi indice 11 position de base 4e colonne 0 5e colonne 0 6e colonne 0 4e rangée 1re colonne 0 2e colonne 0 3e colonne 0 4e colonne pi indice 44 position de base 5e colonne 0 6e colonne 0 5e rangée 1re colonne 0 2e colonne 0 3e colonne 0 4e colonne 0 5e colonne pi indice 44 position de base 6e colonne 0 6e rangée 1re colonne 0 2e colonne 0 3e colonne 0 4e colonne 0 5e colonne 0 6e colonne pi indice 44 fin matrice', 'default');
  this.executeRuleTest(mml, 'Pi majuscule en gras égale début matrice 6 par 6 1re rangée 1re colonne pi 11 2e colonne pi 12 3e colonne pi 12 4e colonne 0 5e colonne 0 6e colonne 0 2e rangée 1re colonne pi 12 2e colonne pi 11 3e colonne pi 12 4e colonne 0 5e colonne 0 6e colonne 0 3e rangée 1re colonne pi 12 2e colonne pi 12 3e colonne pi 11 4e colonne 0 5e colonne 0 6e colonne 0 4e rangée 1re colonne 0 2e colonne 0 3e colonne 0 4e colonne pi 44 5e colonne 0 6e colonne 0 5e rangée 1re colonne 0 2e colonne 0 3e colonne 0 4e colonne 0 5e colonne pi 44 6e colonne 0 6e rangée 1re colonne 0 2e colonne 0 3e colonne 0 4e colonne 0 5e colonne 0 6e colonne pi 44 fin matrice', 'brief');
  this.executeRuleTest(mml, 'Pi majuscule en gras égale matrice 6 par 6 1re rangée 1re colonne pi 11 2e colonne pi 12 3e colonne pi 12 4e colonne 0 5e colonne 0 6e colonne 0 2e rangée 1re colonne pi 12 2e colonne pi 11 3e colonne pi 12 4e colonne 0 5e colonne 0 6e colonne 0 3e rangée 1re colonne pi 12 2e colonne pi 12 3e colonne pi 11 4e colonne 0 5e colonne 0 6e colonne 0 4e rangée 1re colonne 0 2e colonne 0 3e colonne 0 4e colonne pi 44 5e colonne 0 6e colonne 0 5e rangée 1re colonne 0 2e colonne 0 3e colonne 0 4e colonne 0 5e colonne pi 44 6e colonne 0 6e rangée 1re colonne 0 2e colonne 0 3e colonne 0 4e colonne 0 5e colonne 0 6e colonne pi 44 fin matrice', 'sbrief');
};


/**
 * Testing Sample 96
 */
sre.NobleFrenchTest.prototype.testSample_96 = function() {
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
  this.executeRuleTest(mml, 's indice 11 position de base égale début fraction c indice 11 position de base plus c indice 12 position de base sur parenthèse gauche c indice 11 position de base moins c indice 12 position de base parenthèse droite parenthèse gauche c indice 11 position de base plus 2 c indice 12 position de base parenthèse droite fin fraction',
                       'default');
  this.executeRuleTest(mml, 's 11 égale début frac c 11 plus c 12 sur parenthèse gauche c 11 moins c 12 parenthèse droite parenthèse gauche c 11 plus 2 c 12 parenthèse droite fin frac', 'brief');
  this.executeRuleTest(mml, 's 11 égale frac c 11 plus c 12 sur  parenthèse gauche c 11 moins c 12 parenthèse droite parenthèse gauche c 11 plus 2 c 12 parenthèse droite fin frac', 'sbrief');
};


/**
 * Testing Sample 97
 */
sre.NobleFrenchTest.prototype.testSample_97 = function() {
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
  this.executeRuleTest(mml, 'S majuscule i O majuscule en normal indice 2 position de base plus 6 H majuscule en normal F majuscule en normal flèche droite H majuscule en normal indice 2 position de base S majuscule i F majuscule en normal indice 6 position de base plus 2 H majuscule en normal indice 2 position de base O majuscule en normal', 'default');
  this.executeRuleTest(mml, 'S majuscule i O majuscule en normal 2 plus 6 H majuscule en normal F majuscule en normal flèche droite H majuscule en normal 2 S majuscule i F majuscule en normal 6 plus 2 H majuscule en normal 2 O majuscule en normal', 'brief');
  this.executeRuleTest(mml, 'S majuscule i O majuscule en normal 2 plus 6 H majuscule en normal F majuscule en normal flèche droite H majuscule en normal 2 S majuscule i F majuscule en normal 6 plus 2 H majuscule en normal 2 O majuscule en normal', 'sbrief');
};


/**
 * Testing Sample 98
 */
sre.NobleFrenchTest.prototype.testSample_98 = function() {
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
  this.executeRuleTest(mml, 'début fraction d sur d x fin fraction parenthèse gauche E majuscule parenthèse gauche x parenthèse droite A majuscule parenthèse gauche x parenthèse droite début fraction d w parenthèse gauche x parenthèse droite sur d x fin fraction parenthèse droite plus p parenthèse gauche x parenthèse droite égale 0', 'default');
  this.executeRuleTest(mml, 'début frac d sur d x fin frac parenthèse gauche E majuscule parenthèse gauche x parenthèse droite A majuscule parenthèse gauche x parenthèse droite début frac d w parenthèse gauche x parenthèse droite sur d x fin frac parenthèse droite plus p parenthèse gauche x parenthèse droite égale 0', 'brief');
  this.executeRuleTest(mml, 'frac d sur  d x fin frac parenthèse gauche E majuscule parenthèse gauche x parenthèse droite A majuscule parenthèse gauche x parenthèse droite frac d w parenthèse gauche x parenthèse droite sur  d x fin frac parenthèse droite plus p parenthèse gauche x parenthèse droite égale 0', 'sbrief');
};


/**
 * Testing Sample 99
 */
sre.NobleFrenchTest.prototype.testSample_99 = function() {
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
  this.executeRuleTest(mml, 'TCS indice gas position de base égale négatif un-demi parenthèse gauche début fraction P majuscule indice seal position de base sur P majuscule indice max position de base fin fraction parenthèse droite parenthèse gauche début fraction 1 sur T majuscule indice seal position de base fin fraction parenthèse droite',
                       'default');
  this.executeRuleTest(mml, 'TCS sub gas position de base égale négatif un-demi parenthèse gauche début frac P majuscule sub seal position de base sur P majuscule sub max position de base fin frac parenthèse droite parenthèse gauche début frac 1 sur T majuscule sub seal position de base fin frac parenthèse droite', 'brief');
  this.executeRuleTest(mml, 'TCS sub gas position de base égale négatif un-demi parenthèse gauche frac P majuscule sub seal position de base sur  P majuscule sub max position de base fin frac parenthèse droite parenthèse gauche frac 1 sur  T majuscule sub seal position de base fin frac parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 100
 */
sre.NobleFrenchTest.prototype.testSample_100 = function() {
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
  this.executeRuleTest(mml, 'B majuscule indice p position de base égale début début fraction début fraction 7 moins v au carré sur 3 fin fraction parenthèse gauche 1 plus début fraction c au carré sur a au carré fin fraction plus début fraction c exposant 4 position de base sur a exposant 4 position de base fin fraction parenthèse droite plus début fraction parenthèse gauche 3 moins v parenthèse droite au carré c au carré sur parenthèse gauche 1 plus v parenthèse droite a au carré fin fraction sur sur parenthèse gauche 1 moins v parenthèse droite parenthèse gauche 1 moins début fraction c exposant 4 position de base sur a exposant 4 position de base fin fraction parenthèse droite parenthèse gauche 1 moins début fraction c au carré sur a au carré fin fraction parenthèse droite fin fin fraction', 'default');
  this.executeRuleTest(mml, 'B majuscule sub p position de base égale début début frac début frac 7 moins v au carré sur 3 fin frac parenthèse gauche 1 plus début frac c au carré sur a au carré fin frac plus début frac c sup 4 position de base sur a sup 4 position de base fin frac parenthèse droite plus début frac parenthèse gauche 3 moins v parenthèse droite au carré c au carré sur parenthèse gauche 1 plus v parenthèse droite a au carré fin frac sur sur parenthèse gauche 1 moins v parenthèse droite parenthèse gauche 1 moins début frac c sup 4 position de base sur a sup 4 position de base fin frac parenthèse droite parenthèse gauche 1 moins début frac c au carré sur a au carré fin frac parenthèse droite fin fin frac', 'brief');
  this.executeRuleTest(mml, 'B majuscule sub p position de base égale frac1imbriquée frac 7 moins v au carré sur  3 fin frac parenthèse gauche 1 plus frac c au carré sur  a au carré fin frac plus frac c sup 4 position de base sur  a sup 4 position de base fin frac parenthèse droite plus frac parenthèse gauche 3 moins v parenthèse droite au carré c au carré sur  parenthèse gauche 1 plus v parenthèse droite a au carré fin frac sur1imbriquée parenthèse gauche 1 moins v parenthèse droite parenthèse gauche 1 moins frac c sup 4 position de base sur  a sup 4 position de base fin frac parenthèse droite parenthèse gauche 1 moins frac c au carré sur  a au carré fin frac parenthèse droite fin frac1imbriquée', 'sbrief');
};


/**
 * Testing Sample 101
 */
sre.NobleFrenchTest.prototype.testSample_101 = function() {
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
  this.executeRuleTest(mml, 'Q majuscule indice tank exposant series position de base égale début fraction 1 sur R majuscule indice s position de base fin fraction début racine carrée début fraction L majuscule indice s position de base sur C majuscule indice s position de base fin fraction fin racine carrée', 'default');
  this.executeRuleTest(mml, 'Q majuscule sub tank sup series position de base égale début frac 1 sur R majuscule sub s position de base fin frac début racine carrée début frac L majuscule sub s position de base sur C majuscule sub s position de base fin frac fin racine carrée', 'brief');
  this.executeRuleTest(mml, 'Q majuscule sub tank sup series position de base égale frac 1 sur  R majuscule sub s position de base fin frac racine carrée frac L majuscule sub s position de base sur  C majuscule sub s position de base fin frac fin racine carrée', 'sbrief');
};


/**
 * Testing Sample 102
 */
sre.NobleFrenchTest.prototype.testSample_102 = function() {
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
  this.executeRuleTest(mml, 'Delta majuscule phi droit indice peak position de base égale tangente exposant négatif 1 position de base parenthèse gauche k au carré Q majuscule indice tank exposant series position de base parenthèse droite', 'default');
  this.executeRuleTest(mml, 'Delta majuscule phi droit sub peak position de base égale tangente sup négatif 1 position de base parenthèse gauche k au carré Q majuscule sub tank sup series position de base parenthèse droite', 'brief');
  this.executeRuleTest(mml, 'Delta majuscule phi droit sub peak position de base égale tangente sup négatif 1 position de base parenthèse gauche k au carré Q majuscule sub tank sup series position de base parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 103
 */
sre.NobleFrenchTest.prototype.testSample_103 = function() {
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
  this.executeRuleTest(mml, 'f égale 1,013 début fraction W majuscule sur L majuscule au carré fin fraction début racine carrée début fraction E majuscule sur rho fin fraction fin racine carrée début racine carrée parenthèse gauche 1 plus 0,293 début fraction L majuscule au carré sur EW au carré fin fraction sigma parenthèse droite fin racine carrée', 'default');
  this.executeRuleTest(mml, 'f égale 1,013 début frac W majuscule sur L majuscule au carré fin frac début racine carrée début frac E majuscule sur rho fin frac fin racine carrée début racine carrée parenthèse gauche 1 plus 0,293 début frac L majuscule au carré sur EW au carré fin frac sigma parenthèse droite fin racine carrée', 'brief');
  this.executeRuleTest(mml, 'f égale 1,013 frac W majuscule sur  L majuscule au carré fin frac racine carrée frac E majuscule sur  rho fin frac fin racine carrée racine carrée parenthèse gauche 1 plus 0,293 frac L majuscule au carré sur  EW au carré fin frac sigma parenthèse droite fin racine carrée',
                       'sbrief');
};


/**
 * Testing Sample 104
 */
sre.NobleFrenchTest.prototype.testSample_104 = function() {
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
  this.executeRuleTest(mml, 'u indice n position de base parenthèse gauche x parenthèse droite égale gamma indice n position de base parenthèse gauche cosinus hyperbolique k indice n position de base x moins cosinus k indice n position de base x parenthèse droite plus parenthèse gauche sinus hyperbolique k indice n position de base x moins sinus k indice n position de base x parenthèse droite', 'default');
  this.executeRuleTest(mml, 'u sub n position de base parenthèse gauche x parenthèse droite égale gamma sub n position de base parenthèse gauche cosinus hyperbolique k sub n position de base x moins cosinus k sub n position de base x parenthèse droite plus parenthèse gauche sinus hyperbolique k sub n position de base x moins sinus k sub n position de base x parenthèse droite', 'brief');
  this.executeRuleTest(mml, 'u sub n position de base parenthèse gauche x parenthèse droite égale gamma sub n position de base parenthèse gauche cosinus hyperbolique k sub n position de base x moins cosinus k sub n position de base x parenthèse droite plus parenthèse gauche sinus hyperbolique k sub n position de base x moins sinus k sub n position de base x parenthèse droite', 'sbrief');
};


/**
 * Testing Sample 105
 */
sre.NobleFrenchTest.prototype.testSample_105 = function() {
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
  this.executeRuleTest(mml, 'début tableau 1re rangée 1re colonne B majuscule 2e colonne égale début début fraction début fraction F majuscule indice 0 position de base sur m fin fraction sur sur début racine carrée parenthèse gauche oméga indice 0 au carré moins oméga au carré parenthèse droite au carré plus 4 n au carré oméga au carré fin racine carrée fin fin fraction 2e rangée 1re colonne vide 2e colonne égale début début fraction début fraction F majuscule indice 0 position de base sur k fin fraction sur sur début racine carrée parenthèse gauche 1 moins parenthèse gauche oméga barre oblique oméga indice 0 au carré parenthèse droite au carré parenthèse droite au carré plus 4 parenthèse gauche n barre oblique oméga indice 0 position de base parenthèse droite au carré parenthèse gauche oméga barre oblique oméga indice 0 position de base parenthèse droite au carré fin racine carrée fin fin fraction fin tableau', 'default');
  this.executeRuleTest(mml, 'début tableau 1re rangée 1re colonne B majuscule 2e colonne égale début début frac début frac F majuscule 0 sur m fin frac sur sur début racine carrée parenthèse gauche oméga 0 au carré moins oméga au carré parenthèse droite au carré plus 4 n au carré oméga au carré fin racine carrée fin fin frac 2e rangée 1re colonne vide 2e colonne égale début début frac début frac F majuscule 0 sur k fin frac sur sur début racine carrée parenthèse gauche 1 moins parenthèse gauche oméga barre oblique oméga 0 au carré parenthèse droite au carré parenthèse droite au carré plus 4 parenthèse gauche n barre oblique oméga 0 parenthèse droite au carré parenthèse gauche oméga barre oblique oméga 0 parenthèse droite au carré fin racine carrée fin fin frac fin tableau', 'brief');
  this.executeRuleTest(mml, 'tableau 1re rangée 1re colonne B majuscule 2e colonne égale frac1imbriquée frac F majuscule 0 sur  m fin frac sur1imbriquée racine carrée parenthèse gauche oméga 0 au carré moins oméga au carré parenthèse droite au carré plus 4 n au carré oméga au carré fin racine carrée fin frac1imbriquée 2e rangée 1re colonne vide 2e colonne égale frac1imbriquée frac F majuscule 0 sur  k fin frac sur1imbriquée racine carrée parenthèse gauche 1 moins parenthèse gauche oméga barre oblique oméga 0 au carré parenthèse droite au carré parenthèse droite au carré plus 4 parenthèse gauche n barre oblique oméga 0 parenthèse droite au carré parenthèse gauche oméga barre oblique oméga 0 parenthèse droite au carré fin racine carrée fin frac1imbriquée fin tableau', 'sbrief');
};


/**
 * Testing Sample 106
 */
sre.NobleFrenchTest.prototype.testSample_106 = function() {
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
  this.executeRuleTest(mml, 'p en normal parenthèse gauche A majuscule a n d B majuscule parenthèse droite égale p en normal parenthèse gauche A majuscule parenthèse droite p en normal parenthèse gauche B majuscule barre verticale A majuscule parenthèse droite',
                       'default');
  this.executeRuleTest(mml, 'p en normal parenthèse gauche A majuscule a n d B majuscule parenthèse droite égale p en normal parenthèse gauche A majuscule parenthèse droite p en normal parenthèse gauche B majuscule barre verticale A majuscule parenthèse droite',
                       'brief');
  this.executeRuleTest(mml, 'p en normal parenthèse gauche A majuscule a n d B majuscule parenthèse droite égale p en normal parenthèse gauche A majuscule parenthèse droite p en normal parenthèse gauche B majuscule barre verticale A majuscule parenthèse droite',
                       'sbrief');
};


/**
 * Testing Sample 107
 */
sre.NobleFrenchTest.prototype.testSample_107 = function() {
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
  this.executeRuleTest(mml, 'P majuscule M majuscule F majuscule parenthèse gauche x parenthèse droite proportionnel à parenthèse gauche début fraction 1 sur x fin fraction parenthèse droite exposant alpha', 'default');
  this.executeRuleTest(mml, 'P majuscule M majuscule F majuscule parenthèse gauche x parenthèse droite proportionnel à parenthèse gauche début frac 1 sur x fin frac parenthèse droite sup alpha', 'brief');
  this.executeRuleTest(mml, 'P majuscule M majuscule F majuscule parenthèse gauche x parenthèse droite proportionnel à parenthèse gauche frac 1 sur  x fin frac parenthèse droite sup alpha', 'sbrief');
};


/**
 * Testing Sample 108
 */
sre.NobleFrenchTest.prototype.testSample_108 = function() {
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
  this.executeRuleTest(mml, 'f parenthèse gauche x parenthèse droite égale début fraction 1 sur début racine carrée 2 pi fin racine carrée fin fraction exp parenthèse gauche négatif x au carré barre oblique 2 parenthèse droite',
                       'default');
  this.executeRuleTest(mml, 'f parenthèse gauche x parenthèse droite égale début frac 1 sur début racine carrée 2 pi fin racine carrée fin frac exp parenthèse gauche négatif x au carré barre oblique 2 parenthèse droite', 'brief');
  this.executeRuleTest(mml, 'f parenthèse gauche x parenthèse droite égale frac 1 sur  racine carrée 2 pi fin racine carrée fin frac exp parenthèse gauche négatif x au carré barre oblique 2 parenthèse droite',
                       'sbrief');
};


/**
 * Testing Sample 109
 */
sre.NobleFrenchTest.prototype.testSample_109 = function() {
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
  this.executeRuleTest(mml, 'début fraction d x sur d thêta fin fraction égale début fraction bêta sur cosinus au carré thêta fin fraction', 'default');
  this.executeRuleTest(mml, 'début frac d x sur d thêta fin frac égale début frac bêta sur cosinus au carré thêta fin frac', 'brief');
  this.executeRuleTest(mml, 'frac d x sur  d thêta fin frac égale frac bêta sur  cosinus au carré thêta fin frac', 'sbrief');
};


/**
 * Testing Sample 110
 */
sre.NobleFrenchTest.prototype.testSample_110 = function() {
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
  this.executeRuleTest(mml, 's barre oblique début racine carrée 2 parenthèse gauche n moins 1 parenthèse droite fin racine carrée', 'default');
  this.executeRuleTest(mml, 's barre oblique début racine carrée 2 parenthèse gauche n moins 1 parenthèse droite fin racine carrée', 'brief');
  this.executeRuleTest(mml, 's barre oblique racine carrée 2 parenthèse gauche n moins 1 parenthèse droite fin racine carrée', 'sbrief');
};

