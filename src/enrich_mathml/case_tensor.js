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
 * @fileoverview Specialist computations to deal with tensor elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.CaseTensor');

goog.require('sre.AbstractEnrichCase');
goog.require('sre.EnrichMathml');
goog.require('sre.SemanticAttr');
goog.require('sre.SemanticTree.Node');



/**
 * @constructor
 * @extends {sre.AbstractEnrichCase}
 * @override
 * @final
 */
sre.CaseTensor = function(semantic) {
  goog.base(this, semantic);

  /**
   * @type {!Element}
   */
  this.mml = semantic.mathmlTree;
  
};
goog.inherits(sre.CaseTensor, sre.AbstractEnrichCase);


/**
 * @override
 */
sre.CaseTensor.test = function(semantic) {
  return semantic.mathmlTree && semantic.type === sre.SemanticAttr.Type.TENSOR;
};


/**
 * @override
 */
sre.CaseTensor.prototype.getMathml = function() {
  sre.EnrichMathml.walkTree(
      /**@type{!sre.SemanticTree.Node}*/(this.semantic.childNodes[0]));
  var lsub = sre.EnrichMathml.multiscriptIndex(this.semantic.childNodes[1]);
  var lsup = sre.EnrichMathml.multiscriptIndex(this.semantic.childNodes[2]);
  var rsub = sre.EnrichMathml.multiscriptIndex(this.semantic.childNodes[3]);
  var rsup = sre.EnrichMathml.multiscriptIndex(this.semantic.childNodes[4]);
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  var collapsed = [this.semantic.id, lsub, lsup, rsub, rsup];
  if (!collapsed.every(sre.EnrichMathml.simpleCollapseStructure)) {
    sre.EnrichMathml.addCollapsedAttribute(this.mml, collapsed);
  }
  var childIds = sre.EnrichMathml.collapsedLeafs(lsub, lsup, rsub, rsup);
  childIds.unshift(this.semantic.childNodes[0].id);
  this.mml.setAttribute(sre.EnrichMathml.Attribute.CHILDREN,
      childIds.join(','));
  sre.EnrichMathml.completeMultiscript(
      this.semantic, this.mml,
      sre.EnrichMathml.interleaveIds(rsub, rsup),
      sre.EnrichMathml.interleaveIds(lsub, lsup));
  return this.mml;
};
