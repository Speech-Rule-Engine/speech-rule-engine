// Copyright 2014 Volker Sorge
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



/**
 * @constructor
 * @extends {sre.AbstractWalker}
 * @override
 */
sre.SyntaxWalker = function(node, generator) {
  goog.base(this, node, generator);

  this.level = [this.currentId()];
};
goog.inherits(sre.SyntaxWalker, sre.AbstractWalker);


/**
 * @override
 */
sre.SyntaxWalker.prototype.up = function() {
  var parent = this.currentNode.getAttribute(
      sre.EnrichMathml.Attribute.PARENT);
  if (!parent) return null;
  this.level = [parent];
  return this.getBySemanticId(parent);
};


/**
 * @override
 */
sre.SyntaxWalker.prototype.down = function() {
  var children = sre.SyntaxWalker.splitAttribute(
      this.currentNode.getAttribute(sre.EnrichMathml.Attribute.CHILDREN));
  if (children.length === 0) {
    return null;
  }
  this.level = children;
  return this.getBySemanticId(children[0]);
};


/**
 * @override
 */
sre.SyntaxWalker.prototype.left = function() {
  var index = this.level.indexOf(this.currentId()) - 1;
  return index < 0 ? null : this.getBySemanticId(this.level[index]);
};


/**
 * @override
 */
sre.SyntaxWalker.prototype.right = function() {
  var index = this.level.indexOf(this.currentId()) + 1;
  return index >= this.level.length ? null :
    this.getBySemanticId(this.level[index]);
};


//TODO: Put into utilility class.
/**
 * A comma separated list of attribute values.
 * @param {string} attr The attribute value.
 * @return {!Array.<string>} A list of values.
 */
sre.SyntaxWalker.splitAttribute = function(attr) {
  return !attr ? [] : attr.split(/,/);
};
  

/**
 * Retrieves a node containing a given semantic id.
 * @param {string} id The id of a semantic node.
 * @return {Node} The node for that id.
 */
sre.SyntaxWalker.prototype.getBySemanticId = function(id) {
  var query = '[' + sre.EnrichMathml.Attribute.ID + '="' + id + '"]';
  return this.node.querySelector(query);
};


sre.SyntaxWalker.prototype.currentId = function() {
  return this.currentNode.getAttribute(sre.EnrichMathml.Attribute.ID);
};

