// Copyright 2015-21 Volker Sorge
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
 * @fileoverview An API for the enrichment of MathML elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.Enrich');

goog.require('sre.Debugger');
goog.require('sre.DomUtil');
goog.require('sre.Engine');
goog.require('sre.EnrichCases');
goog.require('sre.EnrichMathml');
goog.require('sre.Semantic');


/**
 * Semantically enriches a MathML node.
 * @param {!Element} mml The original MathML node.
 * @return {!Element} Semantically enriched MathML node.
 */
sre.Enrich.semanticMathmlNode = function(mml) {
  var clone = mml.cloneNode(true);
  var tree = sre.Semantic.getTree(clone);
  return sre.EnrichMathml.enrich(clone, tree);
};


/**
 * Reads a MathML element from a string and semantically enriches its.
 * @param {string} expr The MathML expression as a string without math tags.
 * @return {!Element} The modified MathML element.
 */
sre.Enrich.semanticMathmlSync = function(expr) {
  var mml = sre.DomUtil.parseInput(expr);
  return sre.Enrich.semanticMathmlNode(mml);
};


/**
 * Reads a MathML element from a string and semantically enriches its.
 * @param {string} expr The MathML expression as a string without math tags.
 * @param {function(!Element)} callback Function to apply on the result.
 */
sre.Enrich.semanticMathml = function(expr, callback) {
  if (!sre.Engine.isReady()) {
    setTimeout(function() { sre.Enrich.semanticMathml(expr, callback); }, 500);
    return;
  }
  var mml = sre.DomUtil.parseInput(expr);
  callback(sre.Enrich.semanticMathmlNode(mml));
};


/**
 * Tests for an expression with debugger output.
 * @param {string} expr MathML expression.
 * @return {string} The enriched MathML expression.
 */
sre.Enrich.testTranslation__ = function(expr) {
  new sre.EnrichCases(); // dummy call
  sre.Debugger.getInstance().init();
  var mml = sre.Enrich.semanticMathmlSync(
      sre.Enrich.prepareMmlString(expr)).toString();
  sre.EnrichMathml.removeAttributePrefix(mml);
  sre.Debugger.getInstance().exit();
  return mml;
};


/**
 * Adds Math tags to a MathML string, if necessary.
 * @param {string} expr MathML string.
 * @return {string} The augmented expression.
 */
sre.Enrich.prepareMmlString = function(expr) {
  if (!expr.match(/^<math/)) {
    expr = '<math>' + expr;
  }
  if (!expr.match(/\/math>$/)) {
    expr += '</math>';
  }
  return expr;
};
