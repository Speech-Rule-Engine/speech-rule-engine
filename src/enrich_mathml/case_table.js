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
 * @fileoverview Specialist computations to deal with table elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.CaseTable');

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
sre.CaseTable = function(semantic) {
  goog.base(this, semantic);

  /**
   * @type {!Element}
   */
  this.mml = semantic.mathmlTree;

};
goog.inherits(sre.CaseTable, sre.AbstractEnrichCase);


/**
 * @override
 */
sre.CaseTable.test = function(semantic) {
  return semantic.mathmlTree &&
      (semantic.type === sre.SemanticAttr.Type.MATRIX ||
      semantic.type === sre.SemanticAttr.Type.VECTOR ||
      semantic.type === sre.SemanticAttr.Type.CASES);
};


/**
 * @override
 */
sre.CaseTable.prototype.getMathml = function() {
  var lfence = sre.EnrichMathml.cloneContentNode(
      /**@type{!sre.SemanticTree.Node}*/(this.semantic.contentNodes[0]));
  var rfence = this.semantic.contentNodes[1] ?
      sre.EnrichMathml.cloneContentNode(
          /**@type{!sre.SemanticTree.Node}*/(this.semantic.contentNodes[1])) :
      null;
  this.semantic.childNodes.map(/**@type{Function}*/(sre.EnrichMathml.walkTree));
  if (sre.SemanticUtil.tagName(this.mml) === 'MFENCED') {
    var children = this.mml.childNodes;
    this.mml.insertBefore(lfence, children[0]);
    rfence && this.mml.appendChild(rfence);
    this.mml = sre.EnrichMathml.rewriteMfenced(this.mml);
  } else {
    var newChildren = [lfence, this.mml];
    rfence && newChildren.push(rfence);
    this.mml = sre.EnrichMathml.introduceNewLayer(newChildren);
  }
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  return this.mml;
};


