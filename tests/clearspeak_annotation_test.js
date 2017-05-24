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


goog.provide('sre.ClearspeakAnnotationTest');

goog.require('sre.AbstractTest');
goog.require('sre.ClearspeakUtil');
goog.require('sre.Semantic');



/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.ClearspeakAnnotationTest = function() {
  sre.ClearspeakAnnotationTest.base(this, 'constructor');
  
  /**
   * @override
   */
  this.information = 'Clearspeak Simple Expression tests.';

  this.annotator = sre.ClearspeakUtil.simpleExpression();

};
goog.inherits(sre.ClearspeakAnnotationTest, sre.AbstractTest);


sre.ClearspeakAnnotationTest.prototype.executeTest = function(mml, expected) {
  var mathMl = '<math xmlns="http://www.w3.org/1998/Math/MathML">' +
          mml + '</math>';
  var semantic = sre.Semantic.getTreeFromString(mathMl);
  this.annotator.annotate(semantic.root);
  this.assert.equal(semantic.root.hasMeaning('clearspeak', 'simple'),
                    expected);
};


sre.ClearspeakAnnotationTest.prototype.testNumbers = function() {
  this.executeTest('<mn>1</mn>', true);
  this.executeTest('<mn>1.5</mn>', true);
  this.executeTest('<mn>1.5e+10</mn>', false);
  this.executeTest('<mfrac><mn>1</mn><mn>2</mn></mfrac>', true);
  this.executeTest('<mfrac><mn>5</mn><mn>3</mn></mfrac>', true);
  this.executeTest('<mfrac><mi>a</mi><mn>2</mn></mfrac>', false) ;
  this.executeTest('<mfrac><mi>5</mi><mn>3.5</mn></mfrac>', false);
};


sre.ClearspeakAnnotationTest.prototype.testLetters = function() {
  this.executeTest('<mi>a</mi>', true);
  this.executeTest('<mi>A</mi>', true);
  this.executeTest('<mi>a</mi><mi>b</mi>', true);
  this.executeTest('<mi>a</mi><mi>B</mi>', true);
  this.executeTest('<mi>a</mi><mo>+</mo><mi>b</mi>', false);
  this.executeTest('<mi>a</mi><mi>b</mi><mi>c</mi>', false);
  this.executeTest('<mi>ab</mi>', false);

  this.executeTest('<mi>α</mi>', true);
  this.executeTest('<mi>Α</mi>', true);
  this.executeTest('<mi>α</mi><mi>b</mi>', true);
  this.executeTest('<mi>α</mi><mo>+</mo><mi>b</mi>', false);
  this.executeTest('<mi>α</mi><mi>B</mi>', true);
  this.executeTest('<mi>α</mi><mi>b</mi><mi>c</mi>', false);
  this.executeTest('<mi>αb</mi>', false);

  this.executeTest('<mi>ℵ</mi>', true);
  this.executeTest('<mi>ℶ</mi>', true);
  this.executeTest('<mi>ℵ</mi><mi>b</mi>', true);
  this.executeTest('<mi>ℵ</mi><mi>B</mi>', true);
  this.executeTest('<mi>ℵ</mi><mo>+</mo><mi>B</mi>', false);
  this.executeTest('<mi>ℵ</mi><mi>b</mi><mi>c</mi>', false);
  this.executeTest('<mi>ℵb</mi>', false);

  this.executeTest('<mi>α</mi><mi>b</mi><mi>ℶ</mi>', false);
};


sre.ClearspeakAnnotationTest.prototype.testMixed = function() {
  this.executeTest('<mn>1</mn><mi>a</mi>', true);
  this.executeTest('<mn>1</mn><mi>a</mi><mi>b</mi>', true);
  this.executeTest('<mn>1</mn><mi>a</mi><mi>b</mi><mi>c</mi>', false);
  this.executeTest('<mn>1.5</mn><mi>a</mi>', true);
  this.executeTest('<mn>1.5</mn><mi>a</mi><mi>b</mi>', true);
  this.executeTest('<mn>1.5</mn><mi>a</mi><mi>b</mi><mi>c</mi>', false);
  this.executeTest('<mn>1.5e+10</mn><mi>a</mi>', false);
  this.executeTest('<mn>1.5e+10</mn><mi>a</mi><mi>b</mi>', false);
  this.executeTest('<mn>1.5e+10</mn><mi>a</mi><mi>b</mi><mi>c</mi>', false);

  this.executeTest('<mn>1</mn><mi>2</mi><mi>b</mi>', false);
  this.executeTest('<mn>1</mn><mi>a</mi><mi>3</mi>', false);
  this.executeTest('<mn>1</mn><mi>2</mi>', false);

  this.executeTest('<mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi>', true);
  this.executeTest('<mfrac><mn>1</mn><mn>2</mn></mfrac>' +
                   '<mi>a</mi><mi>b</mi>', true);
  this.executeTest('<mfrac><mn>1</mn><mn>2</mn></mfrac>' +
                   '<mi>a</mi><mi>b</mi><mi>c</mi>', false);

  this.executeTest('<mfrac><mn>1</mn><mn>2</mn></mfrac><mi>2</mi><mi>b</mi>', false);
  this.executeTest('<mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi><mi>3</mi>', false);
  this.executeTest('<mfrac><mn>1</mn><mn>2</mn></mfrac><mi>2</mi>', false);

  this.executeTest('<mfrac><mn>1.5</mn><mn>2</mn></mfrac><mi>a</mi>', false);
  this.executeTest('<mfrac><mn>1.5</mn><mn>2</mn></mfrac>' +
                   '<mi>a</mi><mi>b</mi>', false);
  this.executeTest('<mfrac><mn>1.5</mn><mn>2</mn></mfrac>' +
                   '<mi>a</mi><mi>b</mi><mi>c</mi>', false);

};


sre.ClearspeakAnnotationTest.prototype.testDegree = function() {
  this.executeTest('<mn>45</mn><mo>°</mo>', true);
  this.executeTest('<mo>-</mo><mn>32.5</mn><mo>°</mo>', true);
  this.executeTest('<mi>x</mi><mo>°</mo>', true);
  this.executeTest('<mo>-</mo><mi>x</mi><mo>°</mo>', true);
  this.executeTest('<mn>2</mn><mi>x</mi><mo>°</mo>', false);
  this.executeTest('<mi>xy</mi><mo>°</mo>', false);
  this.executeTest('<mo>-</mo><mi>xy</mi><mo>°</mo>', false);
  this.executeTest('<mo>°</mo><mi>x</mi>', false);
  this.executeTest('<mi>x</mi><mi>y</mi><mo>°</mo>', false);
};


sre.ClearspeakAnnotationTest.prototype.testFunctions = function() {
  this.executeTest('<mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo>', true);
  this.executeTest('<mi>sin</mi><mi>x</mi>', true);
  this.executeTest('<mi>sin</mi><mo>(</mo><mn>45</mn><mo>°</mo><mo>)</mo>', true);
  this.executeTest('<msup><mi>sin</mi><mn>2</mn></msup><mi>x</mi>', false);

  this.executeTest('<mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>', true);
  this.executeTest('<msup><mi>f</mi><mn>2</mn></msup><mo>(</mo><mi>x</mi><mo>)</mo>', false);
  this.executeTest('<mo>-</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>', false);

  this.executeTest('<mi>sin</mi><mo>(</mo><mi>x</mi><mi>y</mi><mo>)</mo>', true);
  this.executeTest('<mi>sin</mi><mo>(</mo><mn>3</mn><mi>x</mi><mi>y</mi><mo>)</mo>', true);
  this.executeTest('<mi>sin</mi><mo>(</mo><mo>-</mo><mi>x</mi><mi>y</mi><mo>)</mo>', true);
  this.executeTest('<mi>sin</mi><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo>)</mo>', false);
  this.executeTest('<mi>sin</mi><mo>(</mo><mi>x</mi><mi>y</mi><mi>z</mi><mo>)</mo>', false);

  // Not sure if these should be like that!
  this.executeTest('<mi>g</mi><mo>(</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>)</mo>', true);
  this.executeTest('<mi>sin</mi><mi>cos</mi><mi>x</mi>', true);

  this.executeTest('<mo>-</mo><mi>sin</mi><mi>cos</mi><mi>x</mi>', false);
};


sre.ClearspeakAnnotationTest.prototype.testNegativeNumbers = function() {
  this.executeTest('<mo>-</mo><mn>1</mn>', true);
  this.executeTest('<mo>-</mo><mn>1.5</mn>', true);
  this.executeTest('<mo>-</mo><mn>1.5e+10</mn>', false);
  this.executeTest('<mo>-</mo><mfrac><mn>1</mn><mn>2</mn></mfrac>', true);
  this.executeTest('<mo>-</mo><mfrac><mn>5</mn><mn>3</mn></mfrac>', true);
  this.executeTest('<mo>-</mo><mfrac><mi>a</mi><mn>2</mn></mfrac>', false) ;
  this.executeTest('<mo>-</mo><mfrac><mi>5</mi><mn>3.5</mn></mfrac>', false);
  this.executeTest('<mn>2</mn><mo>-</mo><mn>1</mn>', false);
  this.executeTest('<mo>--</mo><mn>1</mn>', false);
  this.executeTest('<mo>+</mo><mn>1</mn>', false);
  this.executeTest('<mo>-</mo><mo>-</mo><mn>1</mn>', false);
};


sre.ClearspeakAnnotationTest.prototype.testNegativeLetters = function() {
  this.executeTest('<mo>-</mo><mi>a</mi>', true);
  this.executeTest('<mo>-</mo><mi>A</mi>', true);
  this.executeTest('<mo>-</mo><mi>a</mi><mi>b</mi>', true);
  this.executeTest('<mo>-</mo><mi>a</mi><mi>B</mi>', true);
  this.executeTest('<mo>-</mo><mi>a</mi><mo>+</mo><mi>b</mi>', false);
  this.executeTest('<mo>-</mo><mi>a</mi><mi>b</mi><mi>c</mi>', false);
  this.executeTest('<mo>-</mo><mi>ab</mi>', false);

  this.executeTest('<mo>-</mo><mi>α</mi>', true);
  this.executeTest('<mo>-</mo><mi>Α</mi>', true);
  this.executeTest('<mo>-</mo><mi>α</mi><mi>b</mi>', true);
  this.executeTest('<mo>-</mo><mi>α</mi><mo>+</mo><mi>b</mi>', false);
  this.executeTest('<mo>-</mo><mi>α</mi><mi>B</mi>', true);
  this.executeTest('<mo>-</mo><mi>α</mi><mi>b</mi><mi>c</mi>', false);
  this.executeTest('<mo>-</mo><mi>αb</mi>', false);

  this.executeTest('<mo>-</mo><mi>ℵ</mi>', true);
  this.executeTest('<mo>-</mo><mi>ℶ</mi>', true);
  this.executeTest('<mo>-</mo><mi>ℵ</mi><mi>b</mi>', true);
  this.executeTest('<mo>-</mo><mi>ℵ</mi><mi>B</mi>', true);
  this.executeTest('<mo>-</mo><mi>ℵ</mi><mo>+</mo><mi>B</mi>', false);
  this.executeTest('<mo>-</mo><mi>ℵ</mi><mi>b</mi><mi>c</mi>', false);
  this.executeTest('<mo>-</mo><mi>ℵb</mi>', false);

  this.executeTest('<mo>-</mo><mi>α</mi><mi>b</mi><mi>ℶ</mi>', false);
};


sre.ClearspeakAnnotationTest.prototype.testNegativeMixed = function() {
  this.executeTest('<mo>-</mo><mn>1</mn><mi>a</mi>', true);
  this.executeTest('<mo>-</mo><mn>1</mn><mi>a</mi><mi>b</mi>', true);
  this.executeTest('<mo>-</mo><mn>1</mn><mi>a</mi><mi>b</mi><mi>c</mi>', false);
  this.executeTest('<mo>-</mo><mn>1.5</mn><mi>a</mi>', true);
  this.executeTest('<mo>-</mo><mn>1.5</mn><mi>a</mi><mi>b</mi>', true);
  this.executeTest('<mo>-</mo><mn>1.5</mn><mi>a</mi><mi>b</mi><mi>c</mi>', false);
  this.executeTest('<mo>-</mo><mn>1.5e+10</mn><mi>a</mi>', false);
  this.executeTest('<mo>-</mo><mn>1.5e+10</mn><mi>a</mi><mi>b</mi>', false);
  this.executeTest('<mo>-</mo><mn>1.5e+10</mn><mi>a</mi><mi>b</mi><mi>c</mi>', false);

  this.executeTest('<mo>-</mo><mn>1</mn><mi>2</mi><mi>b</mi>', false);
  this.executeTest('<mo>-</mo><mn>1</mn><mi>a</mi><mi>3</mi>', false);
  this.executeTest('<mo>-</mo><mn>1</mn><mi>2</mi>', false);

  this.executeTest('<mo>-</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi>', true);
  this.executeTest('<mo>-</mo><mfrac><mn>1</mn><mn>2</mn></mfrac>' +
                   '<mi>a</mi><mi>b</mi>', true);
  this.executeTest('<mo>-</mo><mfrac><mn>1</mn><mn>2</mn></mfrac>' +
                   '<mi>a</mi><mi>b</mi><mi>c</mi>', false);

  this.executeTest('<mo>-</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>2</mi><mi>b</mi>', false);
  this.executeTest('<mo>-</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi><mi>3</mi>', false);
  this.executeTest('<mo>-</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>2</mi>', false);

  this.executeTest('<mo>-</mo><mfrac><mn>1.5</mn><mn>2</mn></mfrac><mi>a</mi>', false);
  this.executeTest('<mo>-</mo><mfrac><mn>1.5</mn><mn>2</mn></mfrac>' +
                   '<mi>a</mi><mi>b</mi>', false);
  this.executeTest('<mo>-</mo><mfrac><mn>1.5</mn><mn>2</mn></mfrac>' +
                   '<mi>a</mi><mi>b</mi><mi>c</mi>', false);

};


  // this.executeTest('<mo>-</mo><mi>x</mi><mi>y</mi><mo>°</mo>', false);
  // this.executeTest('<mo>-</mo><mi>sin</mi><mn>x</mn>', false);

