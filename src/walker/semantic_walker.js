// Copyright 2015 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
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
 * @fileoverview New key explorer facilities.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticWalker');

goog.require('sre.AbstractWalker');
goog.require('sre.Levels');
goog.require('sre.WalkerUtil');



/**
 * @constructor
 * @extends {sre.AbstractWalker}
 * @override
 */
sre.SemanticWalker = function(node, generator) {
  goog.base(this, node, generator);

  /**
   * Caching of levels.
   * @type {!sre.Levels<string>}
   */
  this.levels = new sre.Levels();

  this.levels.push([this.primaryId()]);
};
goog.inherits(sre.SemanticWalker, sre.AbstractWalker);


//TODO: Remove or refactor.
/**
 * Creates a simple focus for a solitary node.
 * @param {!Node} node The node to focus.
 * @return {!sre.Focus} A focus containing only this node and the other
 *     properties of the old focus.
 * @private
 */
sre.SemanticWalker.prototype.singletonFocus_ = function(node) {
  return new sre.Focus({nodes: [node], primary: node});
};


/**
 * Makes a singleton focus from an semantic id, if a corresponding node exits.
 * @param {string} id The semantic id.
 * @return {?sre.Focus} The singleton focus for the node.
 * @private
 */
sre.SemanticWalker.prototype.focusFromId_ = function(id) {
  var node = this.getBySemanticId(id);
  return node ? this.singletonFocus_(node) : null;
};


/**
 * @override
 */
sre.SemanticWalker.prototype.up = function() {
  var parent = this.primaryAttribute(sre.EnrichMathml.Attribute.PARENT);
  if (!parent) return null;
  this.levels.pop();
  return this.focusFromId_(parent);
};


/**
 * @override
 */
sre.SemanticWalker.prototype.down = function() {
  var children = sre.WalkerUtil.splitAttribute(
      this.primaryAttribute(sre.EnrichMathml.Attribute.CHILDREN));
  if (children.length === 0) {
    return null;
  }
  this.levels.push(children);
  return this.focusFromId_(children[0]);
};


/**
 * @override
 */
sre.SemanticWalker.prototype.left = function() {
  var index = this.levels.indexOf(this.primaryId()) - 1;
  var id = this.levels.get(index);
  return id ? this.focusFromId_(id) : null;
};


/**
 * @override
 */
sre.SemanticWalker.prototype.right = function() {
  var index = this.levels.indexOf(this.primaryId()) + 1;
  var id = this.levels.get(index);
  return id ? this.focusFromId_(id) : null;
};
