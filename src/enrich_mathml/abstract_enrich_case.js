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
 * @fileoverview Abstract procedure for special cases in semantic enrichment of
 *     MathML.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AbstractEnrichCase');

goog.require('sre.EnrichCase');



/**
 * @constructor
 * @implements {sre.EnrichCase}
 * @param {!sre.SemanticTree.Node} node The semantic node that is enriched.
 */
sre.AbstractEnrichCase = function(node) {

  /**
   * @type {!sre.SemanticTree.Node}
   */
  this.node = node;

};


/**
 * @override
 */
sre.AbstractEnrichCase.prototype.getMathml = goog.abstractMethod;


/**
 * Applicability test of the case.
 * @param {!sre.SemanticTree.Node} node semantic node.
 * @return {boolean} True if case is applicable.
 */
sre.AbstractEnrichCase.test = goog.abstractMethod;
