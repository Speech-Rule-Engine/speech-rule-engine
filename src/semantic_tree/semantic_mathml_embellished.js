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
 * Take a MathML element, compute the semantic tree and reinject the semantic
 * information into the MathML.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticMathmlEmbellished');

goog.require('sre.Debugger');
// goog.require('sre.SemanticMathml');
goog.require('sre.SemanticTree');
goog.require('sre.SemanticTree.Node');



/**
 * Create the namespace
 * @constructor
 * @param {sre.SemanticTree.Node} node The embellished fence node.
 */
sre.SemanticMathmlEmbellished = function(node) {

  /**
   * @type {sre.SemanticTree.Node}
   */
  this.node = node;

  /**
   * @type {sre.SemanticTree.Node}
   */
  this.fenced = null;

  /**
   * @type {Element}
   */
  this.fencedMml = null;

  /**
   * @type {sre.SemanticTree.Node}
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
   * @type {sre.SemanticTree.Node}
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
   * Maps outer nodes of to their MathML counter part.
   * @type {!Object.<number, Element>}
   */
  this.outerMap = {};

};


/**
 * Computes the Mathml element corresponding to this embellished fence node.
 * @return {Element} The newly compute Mathml element.
 */
sre.SemanticMathmlEmbellished.prototype.getMathml = function() {
  this.getFenced_();
  sre.SemanticMathmlEmbellished.printMap(this.ofenceMap);
  sre.SemanticMathmlEmbellished.printMap(this.cfenceMap);
  sre.SemanticMathmlEmbellished.printMap(this.outerMap);
  this.fencedMml = sre.SemanticMathml.walkTree(this.fenced);
  this.getFencesMml_();
  return this.rewrite_();
};


/**
 * Computes the components of the actual fenced node.
 * @private
 */
sre.SemanticMathmlEmbellished.prototype.getFenced_ = function() {
  var currentNode = this.node;
  while (currentNode.type !== sre.SemanticAttr.Type.FENCED) {
    this.outerMap[currentNode.id] = currentNode.mathmlTree;
    currentNode = currentNode.childNodes[0];
  }
  delete this.outerMap[currentNode.id];
  this.fenced = currentNode.childNodes[0];
  this.ofence = currentNode.contentNodes[0];
  this.cfence = currentNode.contentNodes[1];
  sre.SemanticMathmlEmbellished.fencedMap_(this.ofence, this.ofenceMap);
  sre.SemanticMathmlEmbellished.fencedMap_(this.cfence, this.cfenceMap);
};


/**
 * Collates the id numbers of the fenced node.
 * @param {sre.SemanticTree.Node} fence The fence expression.
 * @param {!Array.<string>} ids The list of id numbers.
 * @private
 */
sre.SemanticMathmlEmbellished.fencedMap_ = function(fence, ids) {
  ids[fence.id] = fence.mathmlTree;
  if (!fence.embellished) {
    return;
  }
  sre.SemanticMathmlEmbellished.fencedMap_(fence.childNodes[0], ids);
};


/**
 * Retrieve the actual MathMl element that forms the outermost layer of the
 * fences.
 * @private
 */
sre.SemanticMathmlEmbellished.prototype.getFencesMml_ = function() {
  var currentNode = this.node;
  var ofenceIds = Object.keys(this.ofenceMap);
  var cfenceIds = Object.keys(this.cfenceMap);
  while ((!this.ofenceMml || !this.cfenceMml) && currentNode !== this.fenced) {
    if (ofenceIds.indexOf(currentNode.embellished) !== -1 && !this.ofenceMml) {
      this.ofenceMml = currentNode.mathmlTree;
    }
    if (cfenceIds.indexOf(currentNode.embellished) !== -1 && !this.cfenceMml) {
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
    this.ofenceMml = sre.SemanticMathml.ascendNewNode(this.ofenceMml);
  }
  if (this.cfenceMml) {
    this.cfenceMml = sre.SemanticMathml.ascendNewNode(this.cfenceMml);
  }
};


/**
 * Rewrites the MathML node with embellished fences.
 * @return {!Element} The new MathML element.
 * @private
 */
sre.SemanticMathmlEmbellished.prototype.rewrite_ = function() {
  var currentNode = this.node;
  var result = null;
  var newNode = sre.SemanticMathml.introduceNewLayer(
      [this.ofenceMml, this.fencedMml, this.cfenceMml]);
  // The case of top element math.
  if (!newNode.parentNode) {
    var mrow = sre.SystemExternal.document.createElement('mrow');
    while (newNode.childNodes.length > 0) {
      mrow.appendChild(newNode.childNodes[0]);
    }
    newNode.appendChild(mrow);
    newNode = mrow;
  }
  // Sets the basics composition.
  sre.SemanticMathml.setAttributes(
      newNode, /** @type {!sre.SemanticTree.Node} */(this.fenced.parent));

  // TODO (sorge) Consider the msupsub case.
  while (currentNode.type !== sre.SemanticAttr.Type.FENCED) {
    var id = currentNode.id;
    var mml = /** @type {!Element} */(this.outerMap[id]);
    // if (sre.SemanticUtil.tagName(mml) === 'MSUBSUP') {
    //   sre.SemanticMathml.caseDoubleScript_(currentNode, mml);
    //   currentNode = currentNode.childNodes[0].childNodes[0];
    // } else {
      sre.SemanticMathml.setAttributes(mml, currentNode);
      for (var i = 1, child; child = currentNode.childNodes[i]; i++) {
        sre.SemanticMathml.walkTree(child);
      }
      currentNode = currentNode.childNodes[0];
    // }
    var dummy = sre.SystemExternal.document.createElement('dummy');
    var saveParent = newNode.parentNode;
    var saveChild = mml.childNodes[0];

    sre.DomUtil.replaceNode(mml, dummy);
    sre.DomUtil.replaceNode(newNode, mml);
    sre.DomUtil.replaceNode(mml.childNodes[0], newNode);
    sre.DomUtil.replaceNode(dummy, saveChild);
    mml.parentNode = saveParent;

    newNode = mml.childNodes[0];
    if (!result) {
      result = mml;
    }
  }

  // Walk the actual fences.
  sre.SemanticMathml.walkTree(
      /** @type {!sre.SemanticTree.Node} */(this.ofence));
  sre.SemanticMathml.walkTree(
      /** @type {!sre.SemanticTree.Node} */(this.cfence));

  return result || newNode;
};


sre.SemanticMathmlEmbellished.printMap = function(map) {
  for (var key in map) {
    console.log(key + ': ' + (map[key] ? map[key].toString() : 'Empty'));
  }
};
