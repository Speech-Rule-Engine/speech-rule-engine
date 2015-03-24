// Copyright 2015 Volker Sorge
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
 * @fileoverview Inject semantic information into MathML
 *
 * Take a MathML element, compute the semantic tree and reinject the semantic
 * information into the MathML.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticMathml');


// All this code is experimental and will eventually need refactoring!

goog.require('sre.SemanticTree');
goog.require('sre.System');


/**
 * Create the namespace
 * @constructor
 */
sre.SemanticMathml = function() {
};


/**
 * Creates a semantic tree from MathML expression string.
 * @param {!string} expr The MathML expression as a string.
 * @return {!Element}
 */
sre.SemanticMathml.fromString = function(expr) {
  var mml = sre.System.getInstance().parseInput(expr);
  var tree = new sre.SemanticTree(mml);
  //var semantic = sre.System.getInstance().getSemanticTree_(mathml);
  return tree;
};


/**
 * Creates formated output  for tMathML and semantic tree expression.
 * REMARK: Helper function.
 * @param {!string} expr The MathML expression as a string without math tags.
 */
sre.SemanticMathml.formattedOutput = function(expr) {
  var mmlExpr = '<math>' + expr + '</math>';
  var tree = sre.SemanticMathml.fromString(mmlExpr);
  console.log(sre.SemanticTree.formatXml(mmlExpr));
  console.log(sre.SemanticTree.formatXml(tree.toString()));
  console.log(sre.SemanticTree.formatXml(tree.toString(true)));
};


/**
 * Enriches a MathML element with semantics from the tree.
 * REMARK: Very experimental!
 * @param {!string} expr The MathML expression as a string without math tags.
 * @return {!Element} The modified MathML element.
 */
sre.SemanticMathml.enrich = function(expr) {
  var mmlExpr = '<math>' + expr + '</math>';
  var tree = sre.SemanticMathml.fromString(mmlExpr);
  // TODO (sorge) Redundant parsing!
  return sre.SemanticMathml.enrichMathml(
      sre.System.getInstance().parseInput(mmlExpr), tree);
};


// Some questions: 
// 1) Should we rewrite the existing element or simply build a new one?
//
/**
 * Enriches a MathML element with semantics from the tree.
 * REMARK: Very experimental!
 * @param {!Element} mml The MathML element.
 * @param {!Element} semantic The sematnic tree.
 * @return {!Element} The modified MathML element.
 */
sre.SemanticMathml.enrichMathml = function(mml, semantic) {
  semantic.root.mathml.forEach(function(node) {console.log(node.toString());});
  return mml.toString();
};
