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
 * @fileoverview A simple syntax walker.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SyntaxWalker');

goog.require('sre.AbstractWalker');
goog.require('sre.Levels');
goog.require('sre.WalkerUtil');



/**
 * @constructor
 * @extends {sre.AbstractWalker}
 * @override
 */
sre.SyntaxWalker = function(node, generator) {
  goog.base(this, node, generator);

  /**
   * Caching of levels.
   * @type {!sre.Levels<string>}
   */
  this.levels = new sre.Levels();

  this.levels.push([this.primaryId()]);
};
goog.inherits(sre.SyntaxWalker, sre.AbstractWalker);


//TODO: Make proper copies of focus to retain all properties.
/**
 * Creates a simple focus for a solitary node.
 * @param {!Node} node The node to focus.
 * @return {!sre.Focus} A focus containing only this node and the other
 *     properties of the old focus.
 * @private
 */
sre.SyntaxWalker.prototype.singletonFocus_ = function(node) {
  return new sre.Focus({nodes: [node], primary: node});
};


/**
 * Makes a singleton focus from an semantic id, if a corresponding node exits.
 * @param {string} id The semantic id.
 * @return {?sre.Focus} The singleton focus for the node.
 * @private
 */
sre.SyntaxWalker.prototype.focusFromId_ = function(id) {
  var node = this.getBySemanticId(id);
  return node ? this.singletonFocus_(node) : null;
};


/**
 * @override
 */
sre.SyntaxWalker.prototype.up = function() {
  var parent = this.primaryAttribute(sre.EnrichMathml.Attribute.PARENT);
  if (!parent) return null;
  this.levels.pop();
  return this.focusFromId_(parent);
};


/**
 * @override
 */
sre.SyntaxWalker.prototype.down = function() {
  var children = this.nextLevel_();
  if (children.length === 0) {
    return null;
  }
  this.levels.push(children);
  return this.focusFromId_(children[0]);
};


/**
 * Computes the next lower level from children and content.
 * @return {!Array.<string>} The next lower level.
 * @private
 */
sre.SyntaxWalker.prototype.nextLevel_ = function() {
  var children = sre.WalkerUtil.splitAttribute(
      this.primaryAttribute(sre.EnrichMathml.Attribute.CHILDREN));
  var content = sre.WalkerUtil.splitAttribute(
      this.primaryAttribute(sre.EnrichMathml.Attribute.CONTENT));
  var primary = /** @type{!Node} */ (this.getFocus().getPrimary());
  var type = sre.WalkerUtil.getAttribute(
      primary, sre.EnrichMathml.Attribute.TYPE);
  var role = sre.WalkerUtil.getAttribute(
      primary, sre.EnrichMathml.Attribute.ROLE);
  return sre.WalkerUtil.combineContentChildren(
      /** @type{!sre.SemanticAttr.Type} */ (type),
      /** @type{!sre.SemanticAttr.Role} */ (role),
      content, children);
};


/**
 * @override
 */
sre.SyntaxWalker.prototype.left = function() {
  var index = this.levels.indexOf(this.primaryId()) - 1;
  var id = this.levels.get(index);
  return id ? this.focusFromId_(id) : null;
};


/**
 * @override
 */
sre.SyntaxWalker.prototype.right = function() {
  var index = this.levels.indexOf(this.primaryId()) + 1;
  var id = this.levels.get(index);
  return id ? this.focusFromId_(id) : null;
};
