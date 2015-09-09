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
 * @fileoverview An API for the semantic translation of MathML.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.Semantic');
goog.provide('sre.Semantic.Attr');
goog.provide('sre.Semantic.Font');
goog.provide('sre.Semantic.Role');
goog.provide('sre.Semantic.Type');

goog.require('sre.DomUtil');
goog.require('sre.SemanticAttr');
goog.require('sre.SemanticTree');


/** Exports font attributes. */
sre.Semantic.Font = sre.SemanticAttr.Font;


/** Exports role attributes. */
sre.Semantic.Role = sre.SemanticAttr.Role;


/** Exports type attributes. */
sre.Semantic.Type = sre.SemanticAttr.Type;


/**
 * Union type of semantic attributes.
 * @typedef {sre.Semantic.Font|sre.Semantic.Role|sre.Semantic.Type}
 */
sre.Semantic.Attr;


/**
 * Creates the semantic tree for a given MathML node.
 * @param {!Element} mml The MathML node.
 * @return {Node} Semantic tree for input node as XML node.
 */
sre.Semantic.getTree = function(mml) {
  return (new sre.SemanticTree(mml)).xml();
};


/**
 * Creates the semantic tree for a MathML string.
 * @param {!string} expr The string representing the MathML expression.
 * @return {sre.SemanticTree} Semantic tree for input string as XML node.
 */
sre.Semantic.getTreeFromString = function(expr) {
  var mml = sre.DomUtil.parseInput(expr);
  return new sre.SemanticTree(mml);
};

// console.log(sre.SemanticTree.formatXml(sre.Semantic.getTreeFromString('<math><mo>(</mo><mi>x</mi><msup><mo>)</mo><mn>2</mn></msup></math>').toString()));
