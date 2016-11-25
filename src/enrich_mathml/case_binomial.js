// Copyright 2015 Volker Sorge
//
// Licensed under the Apache on 2.0 (the "License");
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
 * @fileoverview Specialist computations to deal with line elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.CaseBinomial');

goog.require('sre.AbstractEnrichCase');
goog.require('sre.EnrichMathml');
goog.require('sre.SemanticAttr');



/**
 * @constructor
 * @extends {sre.AbstractEnrichCase}
 * @override
 * @final
 */
sre.CaseBinomial = function(semantic) {
  sre.CaseBinomial.base(this, 'constructor', semantic);

  /**
   * @type {!Element}
   */
  this.mml = semantic.mathmlTree;

};
goog.inherits(sre.CaseBinomial, sre.AbstractEnrichCase);


/**
 * @override
 */
sre.CaseBinomial.test = function(semantic) {
  return !semantic.mathmlTree &&
    semantic.type === sre.SemanticAttr.Type.LINE &&
    semantic.role === sre.SemanticAttr.Role.BINOMIAL;
};


/**
 * @override
 */
sre.CaseBinomial.prototype.getMathml = function() {
  if (!this.semantic.childNodes.length) {
    return this.mml;
  }
  var child = this.semantic.childNodes[0];
  this.mml = sre.EnrichMathml.walkTree(/**@type{!sre.SemanticNode}*/(child));
  // Adds a redundant mrow to include the line information.
  if (this.mml.hasAttribute(sre.EnrichMathml.Attribute.TYPE)) {
    var mrow = sre.DomUtil.createElement('mrow');
    mrow.setAttribute(sre.EnrichMathml.Attribute.ADDED, 'true');
    sre.DomUtil.replaceNode(this.mml, mrow);
    mrow.appendChild(this.mml);
    this.mml = mrow;
  }
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  return this.mml;
};
