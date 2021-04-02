// Copyright 2020 Volker Sorge
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
 * @fileoverview Specialist computations to deal with restructured limit
 *     elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.CaseLimit');

goog.require('sre.AbstractEnrichCase');
goog.require('sre.DomUtil');
goog.require('sre.EnrichMathml');
goog.require('sre.SemanticAttr');



/**
 * @constructor
 * @extends {sre.AbstractEnrichCase}
 * @override
 * @final
 */
sre.CaseLimit = function(semantic) {
  sre.CaseLimit.base(this, 'constructor', semantic);

  /**
   * @type {!Element}
   */
  this.mml = semantic.mathmlTree;

};
goog.inherits(sre.CaseLimit, sre.AbstractEnrichCase);


/**
 * Applicability test of the case.
 * @param {!sre.SemanticNode} semantic The semantic node.
 * @return {boolean} True if case is applicable.
 */
sre.CaseLimit.test = function(semantic) {
  if (!semantic.mathmlTree || !semantic.childNodes.length) {
    return false;
  }
  var mmlTag = sre.DomUtil.tagName(semantic.mathmlTree);
  var type = semantic.type;
  return ((type === sre.SemanticAttr.Type.LIMUPPER ||
           type === sre.SemanticAttr.Type.LIMLOWER) &&
          (mmlTag === 'MSUBSUP' || mmlTag === 'MUNDEROVER')) ||
    (type === sre.SemanticAttr.Type.LIMBOTH &&
     (mmlTag === 'MSUB' || mmlTag === 'MUNDER' ||
      mmlTag === 'MSUP' || mmlTag === 'MOVER'));
};


/**
 * @override
 */
sre.CaseLimit.prototype.getMathml = function() {
  let children = this.semantic.childNodes;
  if (this.semantic.type !== sre.SemanticAttr.Type.LIMBOTH &&
      this.mml.childNodes.length >= 3) {
    // Extra layer only necessary if a split upper/lower script. Second
    // condition excludes incomplete elements.
    this.mml = sre.EnrichMathml.introduceNewLayer([this.mml], this.semantic);
  }
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  children[0].mathmlTree = this.semantic.mathmlTree;
  children.forEach(sre.CaseLimit.walkTree_);
  return this.mml;
};


/**
 * Enriches a semantic node if it is given.
 * @param {sre.SemanticNode} node The semantic node.
 */
sre.CaseLimit.walkTree_ = function(node) {
  if (node) {
    sre.EnrichMathml.walkTree(/** @type{!sre.SemanticNode} */(node));
  }
};
