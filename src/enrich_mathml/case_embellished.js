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
 * @fileoverview Specialist computations to deal with embellished fences.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.CaseEmbellished');

goog.require('sre.AbstractEnrichCase');
goog.require('sre.CaseDoubleScript');
goog.require('sre.CaseMultiscripts');
goog.require('sre.DomUtil');
goog.require('sre.EnrichMathml');
goog.require('sre.SemanticAttr');
goog.require('sre.SemanticNode');



/**
 * @constructor
 * @extends {sre.AbstractEnrichCase}
 * @override
 * @final
 */
sre.CaseEmbellished = function(semantic) {
  sre.CaseEmbellished.base(this, 'constructor', semantic);

  /**
   * @type {sre.SemanticNode}
   */
  this.fenced = null;

  /**
   * @type {Element}
   */
  this.fencedMml = null;

  /**
   * @type {sre.SemanticNode}
   */
  this.ofence = null;

  /**
   * @type {Element}
   */
  this.ofenceMml = null;

  /**
   * @type {!Object.<number, Element>}
   */
  this.ofenceMap = {};

  /**
   * @type {sre.SemanticNode}
   */
  this.cfence = null;

  /**
   * @type {Element}
   */
  this.cfenceMml = null;

  /**
   * @type {!Object.<number, Element>}
   */
  this.cfenceMap = {};

  /**
   * List of elements that need to get the parents reset.
   * @type {!Array.<Element>}
   */
  this.parentCleanup = [];

};
goog.inherits(sre.CaseEmbellished, sre.AbstractEnrichCase);


/**
 * @override
 */
sre.CaseEmbellished.test = function(semantic) {
  return semantic.mathmlTree && semantic.fencePointer;
};


/**
 * @override
 */
sre.CaseEmbellished.prototype.getMathml = function() {
  this.getFenced_();
  this.fencedMml = sre.EnrichMathml.walkTree(
      /** @type {!sre.SemanticNode} */(this.fenced));
  this.getFencesMml_();
  return this.rewrite_();
};


/**
 * Computes the components of the actual fenced node.
 * @private
 */
sre.CaseEmbellished.prototype.getFenced_ = function() {
  var currentNode = this.semantic;
  while (currentNode.type !== sre.SemanticAttr.Type.FENCED) {
    currentNode = currentNode.childNodes[0];
  }
  this.fenced = currentNode.childNodes[0];
  this.ofence = currentNode.contentNodes[0];
  this.cfence = currentNode.contentNodes[1];
  sre.CaseEmbellished.fencedMap_(this.ofence, this.ofenceMap);
  sre.CaseEmbellished.fencedMap_(this.cfence, this.cfenceMap);
};


/**
 * Collates the id numbers of the fenced node.
 * @param {sre.SemanticNode} fence The fence expression.
 * @param {!Object.<number, Element>} ids The list of id numbers.
 * @private
 */
sre.CaseEmbellished.fencedMap_ = function(fence, ids) {
  ids[fence.id] = fence.mathmlTree;
  if (!fence.embellished) {
    return;
  }
  sre.CaseEmbellished.fencedMap_(fence.childNodes[0], ids);
};


/**
 * Retrieve the actual MathMl element that forms the outermost layer of the
 * fences.
 * @private
 */
sre.CaseEmbellished.prototype.getFencesMml_ = function() {
  var currentNode = this.semantic;
  var ofenceIds = Object.keys(this.ofenceMap);
  var cfenceIds = Object.keys(this.cfenceMap);
  while ((!this.ofenceMml || !this.cfenceMml) && currentNode !== this.fenced) {
    if (ofenceIds.indexOf(currentNode.fencePointer) !== -1 && !this.ofenceMml) {
      this.ofenceMml = currentNode.mathmlTree;
    }
    if (cfenceIds.indexOf(currentNode.fencePointer) !== -1 && !this.cfenceMml) {
      this.cfenceMml = currentNode.mathmlTree;
    }
    currentNode = currentNode.childNodes[0];
  }
  if (!this.ofenceMml) {
    this.ofenceMml = this.ofence.mathmlTree;
  }
  if (!this.cfenceMml) {
    this.cfenceMml = this.cfence.mathmlTree;
  }
  if (this.ofenceMml) {
    this.ofenceMml = sre.EnrichMathml.ascendNewNode(this.ofenceMml);
  }
  if (this.cfenceMml) {
    this.cfenceMml = sre.EnrichMathml.ascendNewNode(this.cfenceMml);
  }
};


/**
 * Rewrites the MathML node with embellished fences.
 * @return {!Element} The new MathML element.
 * @private
 */
sre.CaseEmbellished.prototype.rewrite_ = function() {
  var currentNode = this.semantic;
  var result = null;
  var newNode = this.introduceNewLayer_();
  // Sets the basics composition.
  sre.EnrichMathml.setAttributes(
      newNode, /** @type {!sre.SemanticNode} */(this.fenced.parent));

  while (currentNode.type !== sre.SemanticAttr.Type.FENCED) {
    var mml = /** @type {!Element} */(currentNode.mathmlTree);
    var specialCase = this.specialCase_(currentNode, mml);
    if (specialCase) {
      currentNode = specialCase;
    } else {
      sre.EnrichMathml.setAttributes(mml, currentNode);
      var mmlChildren = [];
      for (var i = 1, child; child = currentNode.childNodes[i]; i++) {
        mmlChildren.push(sre.EnrichMathml.walkTree(child));
      }
      currentNode = currentNode.childNodes[0];
    }

    // Reordering the nodes in the tree.
    var dummy = sre.DomUtil.createElement('dummy');
    var saveParent = newNode.parentNode;
    var saveChild = mml.childNodes[0];

    sre.DomUtil.replaceNode(mml, dummy);
    sre.DomUtil.replaceNode(newNode, mml);
    sre.DomUtil.replaceNode(mml.childNodes[0], newNode);
    sre.DomUtil.replaceNode(dummy, saveChild);
    mml.parentNode = saveParent;

    newNode = /** @type {!Element} */(mml.childNodes[0]);
    if (!result) {
      result = mml;
    }
  }

  // Walk the actual fences.
  sre.EnrichMathml.walkTree(
      /** @type {!sre.SemanticNode} */(this.ofence));
  sre.EnrichMathml.walkTree(
      /** @type {!sre.SemanticNode} */(this.cfence));

  this.cleanupParents_();
  return result || newNode;
};


/**
 * Treatment of special cases like msubsup and rewritten mmultiscripts.
 * @param {!sre.SemanticNode} semantic The current semantic node.
 * @param {!Element} mml The MathML node associated with the semantic node.
 * @return {sre.SemanticNode} The next semantic node to be rewritten, if
 *     the original semantic node was a special case.
 * @private
 */
sre.CaseEmbellished.prototype.specialCase_ = function(semantic, mml) {
  var mmlTag = sre.DomUtil.tagName(mml);
  var parent = null;
  var caller;
  if (mmlTag === 'MSUBSUP') {
    parent = semantic.childNodes[0];
    caller = sre.CaseDoubleScript;
  } else if (mmlTag === 'MMULTISCRIPTS') {
    if (semantic.type === sre.SemanticAttr.Type.SUPERSCRIPT ||
        semantic.type === sre.SemanticAttr.Type.SUBSCRIPT) {
      caller = sre.CaseMultiscripts;
    } else if (semantic.type === sre.SemanticAttr.Type.TENSOR) {
      caller = sre.CaseTensor;
    }
    if (caller && semantic.childNodes[0] &&
        semantic.childNodes[0].role === sre.SemanticAttr.Role.SUBSUP) {
      parent = semantic.childNodes[0];
    } else {
      parent = semantic;
    }
  }
  if (!parent) {
    return null;
  }
  var base = parent.childNodes[0];
  var empty = sre.CaseEmbellished.makeEmptyNode_(base.id);
  parent.childNodes[0] = empty;
  mml = new caller(semantic).getMathml();
  parent.childNodes[0] = base;
  this.parentCleanup.push(mml);
  return parent.childNodes[0];
};


/**
 * Creates an empty semantic node with an associated empty mrow MathML element.
 * @param {number} id The id number of the node.
 * @return {!sre.SemanticNode} The new empty node.
 * @private
 */
sre.CaseEmbellished.makeEmptyNode_ = function(id) {
  var mrow = sre.DomUtil.createElement('mrow');
  var empty = new sre.SemanticNode(id);
  empty.type = sre.SemanticAttr.Type.EMPTY;
  empty.mathmlTree = mrow;
  return empty;
};


/**
 * Introduces a new layer if necessary before rewriting the fence.
 * @return {!Element} The node representing the active layer.
 * @private
 */
sre.CaseEmbellished.prototype.introduceNewLayer_ = function() {
  var fullOfence = this.fullFence(this.ofenceMml);
  var fullCfence = this.fullFence(this.cfenceMml);
  // Introduce a definite new layer.
  var newNode = sre.DomUtil.createElement('mrow');
  sre.DomUtil.replaceNode(/** @type {!Element} */(this.fencedMml), newNode);
  newNode.appendChild(this.fencedMml);
  newNode.insertBefore(fullOfence, this.fencedMml);
  newNode.appendChild(fullCfence);
  // The case of top element math.
  if (!newNode.parentNode) {
    var mrow = sre.DomUtil.createElement('mrow');
    while (newNode.childNodes.length > 0) {
      mrow.appendChild(newNode.childNodes[0]);
    }
    newNode.appendChild(mrow);
    newNode = mrow;
  }
  return newNode;
};


/**
 * Retrieves the original embellished fence for the given fence.
 * @param {Element} fence A simple fence.
 * @return {Element} The embellished version of that fence. Can be the fence
 *     itself if it was not embellished.
 */
sre.CaseEmbellished.prototype.fullFence = function(fence) {
  var parent = this.fencedMml.parentNode;
  var currentFence = fence;
  while (currentFence.parentNode && currentFence.parentNode !== parent) {
    currentFence = currentFence.parentNode;
  }
  return /** @type {Element} */(currentFence);
};


/**
 * Sets the correct parent pointer for MathML nodes treated and collated in the
 * special cases. In particular we set the parent of the first child of a node
 * to the parent of the remaining children.
 * @private
 */
sre.CaseEmbellished.prototype.cleanupParents_ = function() {
  this.parentCleanup.forEach(function(x) {
    var parent = x.childNodes[1].getAttribute(
        sre.EnrichMathml.Attribute.PARENT);
    x.childNodes[0].setAttribute(sre.EnrichMathml.Attribute.PARENT, parent);
  });
};
