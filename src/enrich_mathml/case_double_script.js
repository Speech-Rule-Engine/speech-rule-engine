// Copyright 2015-21 Volker Sorge
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
 * @fileoverview Specialist computations to deal with double script elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.CaseDoubleScript');

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
sre.CaseDoubleScript = function(semantic) {
  sre.CaseDoubleScript.base(this, 'constructor', semantic);

  /**
   * @type {!Element}
   */
  this.mml = semantic.mathmlTree;

};
goog.inherits(sre.CaseDoubleScript, sre.AbstractEnrichCase);


/**
 * Applicability test of the case.
 * @param {!sre.SemanticNode} semantic The semantic node.
 * @return {boolean} True if case is applicable.
 */
sre.CaseDoubleScript.test = function(semantic) {
  if (!semantic.mathmlTree || !semantic.childNodes.length) {
    return false;
  }
  var mmlTag = sre.DomUtil.tagName(semantic.mathmlTree);
  var role = semantic.childNodes[0].role;
  return (mmlTag === 'MSUBSUP' &&
          role === sre.SemanticAttr.Role.SUBSUP) ||
      (mmlTag === 'MUNDEROVER' &&
       role === sre.SemanticAttr.Role.UNDEROVER);
};


/**
 * @override
 */
sre.CaseDoubleScript.prototype.getMathml = function() {
  var ignore = this.semantic.childNodes[0];
  var baseSem = /**@type {!sre.SemanticNode}*/(ignore.childNodes[0]);
  var supSem = /**@type{!sre.SemanticNode}*/(this.semantic.childNodes[1]);
  var subSem = /**@type {!sre.SemanticNode}*/(ignore.childNodes[1]);
  var supMml = sre.EnrichMathml.walkTree(supSem);
  var baseMml = sre.EnrichMathml.walkTree(baseSem);
  var subMml = sre.EnrichMathml.walkTree(subSem);
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  this.mml.setAttribute(
      sre.EnrichMathml.Attribute.CHILDREN,
      sre.EnrichMathml.makeIdList([baseSem, subSem, supSem]));
  [baseMml, subMml, supMml].forEach(
      goog.bind(function(child) {
        (sre.EnrichMathml.getInnerNode(child)).setAttribute(
            sre.EnrichMathml.Attribute.PARENT,
            this.mml.getAttribute(sre.EnrichMathml.Attribute.ID));
      }, this));
  this.mml.setAttribute(sre.EnrichMathml.Attribute.TYPE,
      ignore.role);
  sre.EnrichMathml.addCollapsedAttribute(
      this.mml, [this.semantic.id,
                 [ignore.id, baseSem.id, subSem.id], supSem.id]);
  return this.mml;
};
