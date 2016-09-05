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
 * @fileoverview Abstract class for cases of multiindex structures.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.CaseMultiindex');

goog.require('sre.AbstractEnrichCase');
goog.require('sre.DomUtil');
goog.require('sre.EnrichMathml');
goog.require('sre.SemanticAttr');
goog.require('sre.SemanticNode');
goog.require('sre.SemanticUtil');



/**
 * @constructor
 * @extends {sre.AbstractEnrichCase}
 * @override
 */
sre.CaseMultiindex = function(semantic) {
  goog.base(this, semantic);

  /**
   * @type {!Element}
   */
  this.mml = semantic.mathmlTree;

};
goog.inherits(sre.CaseMultiindex, sre.AbstractEnrichCase);


/**
 * Completes the mmultiscript by adding missing None nodes and sorting out the
 * right order of children.
 * @param {!sre.EnrichMathml.Collapsed_} rightIndices The ids of the leaf
 *     nodes of the right indices.
 * @param {!sre.EnrichMathml.Collapsed_} leftIndices The ids of the leaf
 *     nodes of the left indices.
 * @protected
 */
sre.CaseMultiindex.prototype.completeMultiscript = function(
    rightIndices, leftIndices) {
  var children = sre.DomUtil.toArray(this.mml.childNodes).slice(1);
  var childCounter = 0;
  var completeIndices = goog.bind(function(indices) {
    for (var i = 0, index; index = indices[i]; i++) {
      var child = children[childCounter];
      if (!child ||
          index != sre.EnrichMathml.getInnerNode(child).
              getAttribute(sre.EnrichMathml.Attribute.ID)) {
        var query = this.semantic.querySelectorAll(
            function(x) {return x.id === index;});
        this.mml.insertBefore(
            sre.CaseMultiindex.createNone_(query[0]), child || null);
      } else {
        sre.EnrichMathml.getInnerNode(child).
            setAttribute(sre.EnrichMathml.Attribute.PARENT, this.semantic.id);
        childCounter++;
      }
    }
  }, this);
  // right sub and superscripts
  completeIndices(rightIndices);
  // mprescripts
  if (children[childCounter] &&
      sre.SemanticUtil.tagName(children[childCounter]) !== 'MPRESCRIPTS') {
    this.mml.insertBefore(
        children[childCounter],
        sre.DomUtil.createElement('mprescripts'));
  } else {
    childCounter++;
  }
  // left sub and superscripts
  completeIndices(leftIndices);
};


/**
 * Creates a None node.
 * @param {sre.SemanticNode} semantic An empty semantic node.
 * @return {!Element} The corresponding MathML <None/> node.
 * @private
 */
sre.CaseMultiindex.createNone_ = function(semantic) {
  var newNode = sre.DomUtil.createElement('none');
  if (semantic) {
    sre.EnrichMathml.setAttributes(newNode, semantic);
  }
  newNode.setAttribute(sre.EnrichMathml.Attribute.ADDED, 'true');
  return newNode;
};


/**
 * Treats the index nodes of a multiscript tensor, possibly collapsing dummy
 * punctuations.
 * @param {sre.SemanticNode} index The index node of a tensor.
 * @return {!sre.EnrichMathml.Collapsed_} If the index node was a
 *     dummy punctuation, i.e. consisted of more than one index, a list of
 *     strings for the collapsed structure is returned, otherwise the node id.
 * @protected
 */
sre.CaseMultiindex.multiscriptIndex = function(index) {
  if (index.type === sre.SemanticAttr.Type.PUNCTUATED &&
      index.contentNodes[0].role === sre.SemanticAttr.Role.DUMMY) {
    var role = index.role;
    var parentId = index.parent.id;
    var childIds = [index.id];
    for (var i = 0, child; child = index.childNodes[i]; i++) {
      var mmlChild = sre.EnrichMathml.walkTree(child);
      var innerNode = sre.EnrichMathml.getInnerNode(mmlChild);
      innerNode.setAttribute(sre.EnrichMathml.Attribute.PARENT, parentId);
      innerNode.setAttribute(sre.EnrichMathml.Attribute.ROLE, role);
      childIds.push(child.id);
    }
    return childIds;
  }
  sre.EnrichMathml.walkTree(index);
  return index.id;
};
