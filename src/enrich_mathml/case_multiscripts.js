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
 * @fileoverview Specialist computations to deal with multiscripts elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.CaseMultiscripts');

goog.require('sre.CaseMultiindex');
goog.require('sre.DomUtil');
goog.require('sre.EnrichMathml');
goog.require('sre.SemanticAttr');
goog.require('sre.SemanticNode');



/**
 * @constructor
 * @extends {sre.CaseMultiindex}
 * @override
 * @final
 */
sre.CaseMultiscripts = function(semantic) {
  sre.CaseMultiscripts.base(this, 'constructor', semantic);
};
goog.inherits(sre.CaseMultiscripts, sre.CaseMultiindex);


/**
 * @override
 */
sre.CaseMultiscripts.test = function(semantic) {
  if (!semantic.mathmlTree) {
    return false;
  }
  var mmlTag = sre.DomUtil.tagName(semantic.mathmlTree);
  return mmlTag === 'MMULTISCRIPTS' &&
      (semantic.type === sre.SemanticAttr.Type.SUPERSCRIPT ||
      semantic.type === sre.SemanticAttr.Type.SUBSCRIPT);
};


/**
 * @override
 */
sre.CaseMultiscripts.prototype.getMathml = function() {
  sre.EnrichMathml.setAttributes(this.mml, this.semantic);
  if (this.semantic.childNodes[0] &&
      this.semantic.childNodes[0].role === sre.SemanticAttr.Role.SUBSUP) {
    var ignore = this.semantic.childNodes[0];
    var baseSem = ignore.childNodes[0];
    var rsup = sre.CaseMultiindex.multiscriptIndex(this.semantic.childNodes[1]);
    var rsub = sre.CaseMultiindex.multiscriptIndex(ignore.childNodes[1]);
    var collapsed = [this.semantic.id, [ignore.id, baseSem.id, rsub], rsup];
    sre.EnrichMathml.addCollapsedAttribute(this.mml, collapsed);
    this.mml.setAttribute(sre.EnrichMathml.Attribute.TYPE,
        ignore.role);
    this.completeMultiscript(sre.EnrichMathml.interleaveIds(rsub, rsup), []);
  } else {
    var baseSem = this.semantic.childNodes[0];
    var rsup = sre.CaseMultiindex.multiscriptIndex(this.semantic.childNodes[1]);
    if (!sre.EnrichMathml.simpleCollapseStructure(rsup)) {
      var collapsed = [this.semantic.id, baseSem.id, rsup];
      sre.EnrichMathml.addCollapsedAttribute(this.mml, collapsed);
    }
  }
  var childIds = sre.EnrichMathml.collapsedLeafs(rsub || [], rsup);
  var base = sre.EnrichMathml.walkTree(
      /**@type {!sre.SemanticNode}*/(baseSem));
  sre.EnrichMathml.getInnerNode(base).setAttribute(
      sre.EnrichMathml.Attribute.PARENT, this.semantic.id);
  childIds.unshift(baseSem.id);
  this.mml.setAttribute(sre.EnrichMathml.Attribute.CHILDREN,
      childIds.join(','));
  return this.mml;
};
