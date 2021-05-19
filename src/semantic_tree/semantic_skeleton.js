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
 * @fileoverview Skeleton structure for a tree that consists only of a nested
 *     array of node ids.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticSkeleton');
goog.provide('sre.SemanticSkeleton.Sexp');

goog.require('sre.BaseUtil');



/**
 * @constructor
 * @param {sre.SemanticSkeleton.Sexp} skeleton The skeleton array.
 */
sre.SemanticSkeleton = function(skeleton) {

  skeleton = (skeleton === 0) ? skeleton : (skeleton || []);

  /**
   * @type {!sre.SemanticSkeleton.Sexp}
   */
  this.array = skeleton;

  /**
   * @type {Object.<number, !Array.<number>>}
   */
  this.parents = null;

  /**
   * @type {Object.<number, sre.SemanticSkeleton.Sexp>}
   */
  this.levelsMap = null;

};


/**
 * Populates the mapping from id to parents and the mapping from id to levels in
 * the skeleton.
 */
sre.SemanticSkeleton.prototype.populate = function() {
  if (this.parents && this.levelsMap) {
    return;
  }
  this.parents = {};
  this.levelsMap = {};
  this.populate_(this.array, this.array, []);
};


/**
 * Traverses the skeleton tree and composes the parents and layer mappings.
 * @param {!sre.SemanticSkeleton.Sexp} element The current element to traverse.
 * @param {!sre.SemanticSkeleton.Sexp} layer The layer of which the element is a
 *     member.
 * @param {Array.<number>} parents The list of parents of that element.
 * @private
 */
sre.SemanticSkeleton.prototype.populate_ = function(element, layer, parents) {
  if (sre.SemanticSkeleton.simpleCollapseStructure(element)) {
    element = /** @type {number} */(element);
    this.levelsMap[element] = layer;
    this.parents[element] = element === parents[0] ? parents.slice(1) : parents;
    return;
  }
  var newElement = sre.SemanticSkeleton.contentCollapseStructure(element) ?
      element.slice(1) : element;
  var newParents = [newElement[0]].concat(parents);
  for (var i = 0, l = newElement.length; i < l; i++) {
    var current = newElement[i];
    this.populate_(current, element, newParents);
  }
};


/**
 * @override
 */
sre.SemanticSkeleton.prototype.toString = function() {
  return sre.SemanticSkeleton.makeSexp_(this.array);
};


/**
 * Turns collapsed element into an sexp like string.
 * @param {!sre.SemanticSkeleton.Sexp} struct Collapse structure.
 * @return {string} The structure as string.
 * @private
 */
sre.SemanticSkeleton.makeSexp_ = function(struct) {
  if (sre.SemanticSkeleton.simpleCollapseStructure(struct)) {
    return struct.toString();
  }
  if (sre.SemanticSkeleton.contentCollapseStructure(struct)) {
    return '(' + 'c ' +
        struct.slice(1).map(sre.SemanticSkeleton.makeSexp_).join(' ') + ')';
  }
  return '(' + struct.map(sre.SemanticSkeleton.makeSexp_).join(' ') + ')';
};


/**
 * Compute a skeleton structure for a semantic tree.
 * @param {sre.SemanticTree} tree The semantic tree.
 * @return {!sre.SemanticSkeleton} The new skeleton structure object.
 */
sre.SemanticSkeleton.fromTree = function(tree) {
  return sre.SemanticSkeleton.fromNode(tree.root);
};


/**
 * Compute a skeleton structure for a semantic tree.
 * @param {sre.SemanticNode} node The root node of the tree.
 * @return {!sre.SemanticSkeleton} The new skeleton structure object.
 */
sre.SemanticSkeleton.fromNode = function(node) {
  return new sre.SemanticSkeleton(sre.SemanticSkeleton.fromNode_(node));
};


/**
 * Compute a skeleton structure from a string representation.
 * @param {string} skel The skeleton string.
 * @return {!sre.SemanticSkeleton} The new skeleton structure object.
 */
sre.SemanticSkeleton.fromString = function(skel) {
  return new sre.SemanticSkeleton(sre.SemanticSkeleton.fromString_(skel));
};


/**
 * Parses the skeleton structure into an array of integer arrays.
 * @param {string} skeleton String containing the skeleton structure.
 * @return {!sre.SemanticSkeleton.Sexp} The array of integer arrays.
 * @private
 */
sre.SemanticSkeleton.fromString_ = function(skeleton) {
  var str = skeleton.replace(/\(/g, '[');
  str = str.replace(/\)/g, ']');
  str = str.replace(/ /g, ',');
  str = str.replace(/c/g, '"c"');
  return /** @type {!Array} */(JSON.parse(str));
};


/**
 * Compute a skeleton structure for a semantic tree.
 * @param {sre.SemanticNode} node The root node of the tree.
 * @return {!sre.SemanticSkeleton.Sexp} The collapsed structure annotation
 *     representing the skeleton of the tree.
 * @private
 */
sre.SemanticSkeleton.fromNode_ = function(node) {
  if (!node) {
    return [];
  }
  var content = node.contentNodes;
  if (content.length) {
    var contentStructure = content.map(sre.SemanticSkeleton.fromNode_);
    contentStructure.unshift('c');
  }
  var children = node.childNodes;
  if (!children.length) {
    return content.length ? [node.id, contentStructure] : node.id;
  }
  var structure = children.map(sre.SemanticSkeleton.fromNode_);
  if (content.length) {
    structure.unshift(contentStructure);
  }
  structure.unshift(node.id);
  return structure;
};


/**
 * Type annotation for arrays representing collapsed node structures.
 * @typedef {number|Array.<sre.SemanticSkeleton.Sexp>}
 * @private
 */
sre.SemanticSkeleton.Sexp;


/**
 * Checks if the structure is simple, i.e., a single id number.
 * @param {sre.SemanticSkeleton.Sexp} strct The structure.
 * @return {boolean} True if a simple number.
 */
sre.SemanticSkeleton.simpleCollapseStructure = function(strct) {
  return (typeof strct === 'number');
};


/**
 * Checks if the structure represents collapsed content nodes, i.e., it starts
 * with a c.
 * @param {sre.SemanticSkeleton.Sexp} strct The structure.
 * @return {boolean} True if a content structure.
 */
sre.SemanticSkeleton.contentCollapseStructure = function(strct) {
  return !!strct && !sre.SemanticSkeleton.simpleCollapseStructure(strct) &&
      (strct[0] === 'c');
};


/**
 * Interleaves the ids of two index lists.
 * @param {!sre.SemanticSkeleton.Sexp} first A structured list of
 *     ids.
 * @param {!sre.SemanticSkeleton.Sexp} second A structured list of
 *     ids.
 * @return {!sre.SemanticSkeleton.Sexp} A simple list of ids.
 */
sre.SemanticSkeleton.interleaveIds = function(first, second) {
  return sre.BaseUtil.interleaveLists(
      sre.SemanticSkeleton.collapsedLeafs(first),
      sre.SemanticSkeleton.collapsedLeafs(second));
};


/**
 * Returns a list of the leaf ids for the given collapsed structures.
 * @param {...sre.SemanticSkeleton.Sexp} var_args The collapsed structure
 *     annotations.
 * @return {!Array.<number>} The leafs of the structure annotations.
 */
sre.SemanticSkeleton.collapsedLeafs = function(var_args) {
  var collapseStructure = function(coll) {
    if (sre.SemanticSkeleton.simpleCollapseStructure(coll)) {
      return [coll];
    }
    return sre.SemanticSkeleton.contentCollapseStructure(coll[1]) ?
        coll.slice(2) : coll.slice(1);
  };
  return Array.prototype.slice.call(arguments, 0).
      reduce(function(x, y) {
        return x.concat(collapseStructure(y));
      }, []);
};


/**
 * Computes skeletal structure for a semantic tree folding together content and
 * child nodes in a "syntactic" manner.
 * @param {!Element} mml A mml node to add a structure to.
 * @param {!sre.SemanticTree} tree A semantic tree.
 * @return {!sre.SemanticSkeleton} The skeletal structure.
 */
sre.SemanticSkeleton.fromStructure = function(mml, tree) {
  return new sre.SemanticSkeleton(sre.SemanticSkeleton.tree_(mml, tree.root));
};


/**
 * Recursively computes skeletal structure for a semantic tree starting at the
 * given node; folding together content and child nodes in a "syntactic" manner.
 * @param {Node} mml A mml node to add a structure to.
 * @param {sre.SemanticNode} node A semantic node.
 * @return {!sre.SemanticSkeleton.Sexp} The sexp structure.
 * @private
 */
sre.SemanticSkeleton.tree_ = function(mml, node) {
  if (!node) {
    return [];
  }
  if (!node.childNodes.length) {
    return node.id;
  }
  var id = node.id;
  var skeleton = [id];
  var mmlChild = sre.XpathUtil.evalXPath(
      './/self::*[@' + sre.EnrichMathml.Attribute.ID + '=' + id + ']', mml)[0];
  var children = sre.SemanticSkeleton.combineContentChildren(
      node, node.contentNodes.map(function(x) {return x;}),
      node.childNodes.map(function(x) {return x;}));
  if (mmlChild) {
    sre.SemanticSkeleton.addOwns_(mmlChild, children);
  }
  for (var i = 0, child; child = children[i]; i++) {
    skeleton.push(sre.SemanticSkeleton.tree_(mml, child));
  }
  return skeleton;
};


/**
 * Adds an aria owns attribute to a given node.
 * @param {Node} node An mml node to add the owns attribute to.
 * @param {Array.<Node>} children Its semantic children with content nodes
 *     already interspersed.
 * @private
 */
sre.SemanticSkeleton.addOwns_ = function(node, children) {
  var collapsed = node.getAttribute(sre.EnrichMathml.Attribute.COLLAPSED);
  var leafs = collapsed ? sre.SemanticSkeleton.realLeafs_(
      sre.SemanticSkeleton.fromString(collapsed).array) :
      children.map(x => x.id);
  node.setAttribute(
      sre.EnrichMathml.Attribute.OWNS, leafs.join(' '));
};


/**
 * Computes the existing leafs from a collapse skeleton structure.
 * @param {sre.SemanticSkeleton.Sexp} sexp The sexpression.
 * @return {Array.<number>} The actual leaf ids.
 * @private
 */
sre.SemanticSkeleton.realLeafs_ = function(sexp) {
  if (sre.SemanticSkeleton.simpleCollapseStructure(sexp)) {
    return [sexp];
  }
  if (sre.SemanticSkeleton.contentCollapseStructure(sexp)) {
    return [];
  }
  let result = [];
  for (var i = 1; i < sexp.length; i++) {
    result = result.concat(sre.SemanticSkeleton.realLeafs_(sexp[i]));
  }
  return result;
};


/**
 * Combines content and children lists depending on the type of the semantic
 * node.
 * @template T
 * @param {!sre.SemanticNode} semantic The semantic tree node.
 * @param {!Array.<!T>} content The list of content nodes.
 * @param {!Array.<!T>} children The list of child nodes.
 * @return {!Array.<!T>} The combined list.
 */
sre.SemanticSkeleton.combineContentChildren = function(
    semantic, content, children) {
  switch (semantic.type) {
    case sre.Semantic.Type.RELSEQ:
    case sre.Semantic.Type.INFIXOP:
    case sre.Semantic.Type.MULTIREL:
      return sre.BaseUtil.interleaveLists(children, content);
    case sre.Semantic.Type.PREFIXOP:
      return content.concat(children);
    case sre.Semantic.Type.POSTFIXOP:
      return children.concat(content);
    case sre.Semantic.Type.FENCED:
      children.unshift(content[0]);
      children.push(content[1]);
      return children;
    case sre.Semantic.Type.APPL:
      return [children[0], content[0], children[1]];
    case sre.Semantic.Type.ROOT:
      return [children[1], children[0]];
    case sre.Semantic.Type.ROW:
    case sre.Semantic.Type.LINE:
      if (content.length) {
        children.unshift(content[0]);
      }
      return children;
    default:
      return children;
  }
};


