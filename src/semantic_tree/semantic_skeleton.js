// Copyright 2015-16 Volker Sorge
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

  skeleton = skeleton || [];

  /**
   * @type {!sre.SemanticSkeleton.Sexp}
   */
  this.array = skeleton;

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
 * @return {!string} The structure as string.
 * @private
 */
sre.SemanticSkeleton.makeSexp_ = function(struct) {
  console.log(struct);
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
 * @param {sre.SemanticNode} node The root node of the tree.
 * @return {!sre.SemanticSkeleton} The new skeleton structure object.
 */
sre.SemanticSkeleton.fromTree = function(node) {
  return new sre.SemanticSkeleton(sre.SemanticSkeleton.fromTree_(node));
};


/**
 * Compute a skeleton structure for a semantic tree.
 * @param {sre.SemanticNode} node The root node of the tree.
 * @return {!sre.SemanticSkeleton.Sexp} The collapsed structure annotation
 *     representing the skeleton of the tree.
 * @private
 */
sre.SemanticSkeleton.fromTree_ = function(node) {
  if (!node) {
    return [];
  }
  var content = node.contentNodes;
  if (content.length) {
    var contentStructure = content.map(sre.SemanticSkeleton.fromTree_);
    contentStructure.unshift('c');
  }
  var children = node.childNodes;
  if (!children.length) {
    return content.length ? [node.id, contentStructure] : node.id;
  }
  var structure = children.map(sre.SemanticSkeleton.fromTree_);
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
 * Checks if the structure is simple, i.e., a single id number.
 * @param {sre.SemanticSkeleton.Sexp} strct The structure.
 * @return {boolean} True if a simple number.
 */
sre.SemanticSkeleton.contentCollapseStructure = function(strct) {
  console.log('here');
  return !sre.SemanticSkeleton.simpleCollapseStructure(strct) &&
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
    return coll.slice(1);
  };
  return Array.prototype.slice.call(arguments, 0).
      reduce(function(x, y) {
        return x.concat(collapseStructure(y));
      }, []);
};
