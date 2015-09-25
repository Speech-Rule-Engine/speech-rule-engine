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

  this.levels.push([this.currentId()]);
};
goog.inherits(sre.SyntaxWalker, sre.AbstractWalker);


/**
 * @override
 */
sre.SyntaxWalker.prototype.up = function() {
  var parent = this.currentNode.getAttribute(
      sre.EnrichMathml.Attribute.PARENT);
  if (!parent) return null;
  this.levels.pop();
  return this.getBySemanticId(parent);
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
  return this.getBySemanticId(children[0]);
};


/**
 * Computes the next lower level from children and content.
 * @return {!Array.<string>} The next lower level.
 * @private
 */
sre.SyntaxWalker.prototype.nextLevel_ = function() {
  var children = sre.WalkerUtil.splitAttribute(
      this.currentNode.getAttribute(sre.EnrichMathml.Attribute.CHILDREN));
  var content = sre.WalkerUtil.splitAttribute(
      this.currentNode.getAttribute(sre.EnrichMathml.Attribute.CONTENT));
  return sre.WalkerUtil.combineContentChildren(
      this.currentNode.getAttribute(sre.EnrichMathml.Attribute.TYPE),
      this.currentNode.getAttribute(sre.EnrichMathml.Attribute.ROLE),
      content, children);
};


/**
 * @override
 */
sre.SyntaxWalker.prototype.left = function() {
  var index = this.levels.indexOf(this.currentId()) - 1;
  var id = this.levels.get(index);
  return id ? this.getBySemanticId(id) : null;
};


/**
 * @override
 */
sre.SyntaxWalker.prototype.right = function() {
  var index = this.levels.indexOf(this.currentId()) + 1;
  var id = this.levels.get(index);
  return id ? this.getBySemanticId(id) : null;
};
