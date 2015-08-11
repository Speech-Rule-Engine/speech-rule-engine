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
 * @fileoverview Specialist computations to deal with double script elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.CaseDoubleScript');

goog.require('sre.AbstractEnrichCase');
goog.require('sre.EnrichMathml');
goog.require('sre.SemanticAttr');
goog.require('sre.SemanticTree.Node');
goog.require('sre.SemanticUtil');



/**
 * @constructor
 * @extends {sre.AbstractEnrichCase}
 * @override
 * @final
 */
sre.CaseDoubleScript = function(semantic) {
  goog.base(this, semantic);

  /**
   * @type {!Element}
   */
  this.mml = semantic.mathmlTree;
  
};
goog.inherits(sre.CaseDoubleScript, sre.AbstractEnrichCase);


/**
 * @override
 */
sre.CaseDoubleScript.test = function(semantic) {
  if (!semantic.mathmlTree) {
    return false;
  }
  var mmlTag = sre.SemanticUtil.tagName(semantic.mathmlTree);
  return (mmlTag === 'MSUBSUP' &&
          semantic.type === sre.SemanticAttr.Type.SUPERSCRIPT) ||
    (mmlTag === 'MUNDEROVER' &&
     semantic.type === sre.SemanticAttr.Type.OVERSCORE);
};


/**
 * @override
 */
sre.CaseDoubleScript.prototype.getMathml = function() {
  // TODO (sorge) Needs some refactoring!
  //
  var supSem = /**@type{!sre.SemanticTree.Node}*/(this.semantic.childNodes[1]);
  var ignore = this.semantic.childNodes[0];
  var baseSem = /**@type {!sre.SemanticTree.Node}*/(ignore.childNodes[0]);
  var subSem = /**@type {!sre.SemanticTree.Node}*/(ignore.childNodes[1]);
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
      this.mml, [this.semantic.id, [ignore.id, baseSem.id, subSem.id], supSem.id]);
  return this.mml;
};
