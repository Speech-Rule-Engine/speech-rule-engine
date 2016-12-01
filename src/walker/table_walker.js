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
 * @fileoverview A table walker.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.TableWalker');

goog.require('sre.Focus');
goog.require('sre.Levels');
goog.require('sre.SyntaxWalker');
goog.require('sre.WalkerUtil');



/**
 * @constructor
 * @extends {sre.SyntaxWalker}
 * @override
 */
sre.TableWalker = function(node, generator, highlighter, xml) {
  sre.TableWalker.base(this, 'constructor', node, generator, highlighter, xml);

  /**
   * @type {boolean}
   */
  this.modifier = false;

};
goog.inherits(sre.TableWalker, sre.SyntaxWalker);


/**
 * @override
 */
sre.TableWalker.prototype.move = function(key) {
  var result = sre.TableWalker.base(this, 'move', key);
  this.modifier = false;
  return result;
};


/**
 * @override
 */
sre.TableWalker.prototype.up = function() {
  return this.eligibleCell_() ?
      this.verticalMove_(false) :
      sre.TableWalker.base(this, 'up');
};


/**
 * @override
 */
sre.TableWalker.prototype.down = function() {
  return this.eligibleCell_() ?
      this.verticalMove_(true) :
      sre.TableWalker.base(this, 'down');
};


/**
 * @return {boolean} True if the focused is an eligible table cell.
 * @private
 */
sre.TableWalker.prototype.eligibleCell_ = function() {
  var primary = this.getFocus().getSemanticPrimary();
  return this.modifier &&
      primary.type === sre.SemanticAttr.Type.CELL &&
      primary.role === sre.SemanticAttr.Role.TABLE;
};


/**
 * Performs a vertical move in a table.
 * @param {boolean} direction If true walk down, o/w up.
 * @return {?sre.Focus} The new focus.
 * @private
 */
sre.TableWalker.prototype.verticalMove_ = function(direction) {
  var parent = this.previousLevel();
  if (!parent) return null;
  var origFocus = this.getFocus();
  var origIndex = /** @type {number} */(
      this.levels.indexOf(this.primaryId()));
  var origLevel = this.levels.pop();
  var parentIndex = /** @type {number} */(
      this.levels.indexOf(parent));
  var row = /** @type {string} */(this.levels.get(
      direction ? parentIndex + 1 : parentIndex - 1));
  if (!row) {
    this.levels.push(origLevel);
    return null;
  }
  this.setFocus(this.singletonFocus(row));
  var children = this.nextLevel();
  var newNode = children[origIndex];
  if (!newNode) {
    this.setFocus(origFocus);
    this.levels.push(origLevel);
    return null;
  }
  this.levels.push(children);
  return this.singletonFocus(children[origIndex]);
};
