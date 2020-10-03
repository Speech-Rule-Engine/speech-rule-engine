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


/**
 * @fileoverview Test simple annotations for Clearspeak.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.ClearspeakAnnotationTest');

goog.require('sre.AbstractJsonTest');
goog.require('sre.ClearspeakUtil');
goog.require('sre.Semantic');



/**
 * @constructor
 * @extends {sre.AbstractJsonTest}
 */
sre.ClearspeakAnnotationTest = function() {
  sre.ClearspeakAnnotationTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Clearspeak Simple Expression tests.';

  this.annotator = sre.ClearspeakUtil.simpleExpression();

};
goog.inherits(sre.ClearspeakAnnotationTest, sre.AbstractJsonTest);


/**
 * Tests simple annotator for Clearspeak.
 * @param {string} mml Snippet of a MathML expression.
 * @param {boolean} expected The expression is simple or not.
 */
sre.ClearspeakAnnotationTest.prototype.executeTest = function(mml, expected) {
  var mathMl = '<math xmlns="http://www.w3.org/1998/Math/MathML">' +
          mml + '</math>';
  var semantic = sre.Semantic.getTreeFromString(mathMl);
  this.annotator.annotate(semantic.root);
  this.assert.equal(semantic.root.hasAnnotation('clearspeak', 'simple'),
                    expected);
};


/**
 * @override
 */
sre.ClearspeakAnnotationTest.prototype.method = function(var_args) {
  let args = Array.prototype.slice.call(arguments, 0);
  this.executeTest(args[0], args[1]);
};