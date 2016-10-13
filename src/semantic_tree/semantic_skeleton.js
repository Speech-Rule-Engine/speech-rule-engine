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
 * Type annotation for arrays representing collapsed node structures.
 * @typedef {number|Array.<sre.SemanticSkeleton.Sexp>}
 * @private
 */
sre.SemanticSkeleton.Sexp;


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
  if (sre.EnrichMathml.simpleCollapseStructure(struct)) {
    return struct.toString();
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
  var children = node.childNodes;
  if (!children.length) {
    return node.id;
  }
  var structure = children.map(sre.SemanticSkeleton.fromTree_);
  structure.unshift(node.id);
  return structure;
};
