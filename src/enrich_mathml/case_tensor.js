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

goog.require('sre.CaseMultiindex');
goog.require('sre.EnrichMathml');
goog.require('sre.SemanticAttr');



/**
 * @constructor
 * @extends {sre.CaseMultiindex}
 * @override
 * @final
 */
sre.CaseTensor = function(semantic) {
  sre.CaseTensor.base(this, 'constructor', semantic);
};
goog.inherits(sre.CaseTensor, sre.CaseMultiindex);


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
      /**@type{!sre.SemanticNode}*/(this.semantic.childNodes[0]));
  var lsub = sre.CaseMultiindex.multiscriptIndex(this.semantic.childNodes[1]);
  var lsup = sre.CaseMultiindex.multiscriptIndex(this.semantic.childNodes[2]);
  var rsub = sre.CaseMultiindex.multiscriptIndex(this.semantic.childNodes[3]);
  var rsup = sre.CaseMultiindex.multiscriptIndex(this.semantic.childNodes[4]);
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  var collapsed = [this.semantic.id, lsub, lsup, rsub, rsup];
  if (!collapsed.every(sre.SemanticSkeleton.simpleCollapseStructure)) {
    sre.EnrichMathml.addCollapsedAttribute(this.mml, collapsed);
  }
  var childIds = sre.SemanticSkeleton.collapsedLeafs(lsub, lsup, rsub, rsup);
  childIds.unshift(this.semantic.childNodes[0].id);
  this.mml.setAttribute(sre.EnrichMathml.Attribute.CHILDREN,
      childIds.join(','));
  this.completeMultiscript(
      sre.SemanticSkeleton.interleaveIds(rsub, rsup),
      sre.SemanticSkeleton.interleaveIds(lsub, lsup));
  return this.mml;
};
