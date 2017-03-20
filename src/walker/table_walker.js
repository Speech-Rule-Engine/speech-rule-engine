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

  this.keyMapping[sre.EventUtil.KeyCode['0']] = goog.bind(this.jumpCell, this);
  this.keyMapping[sre.EventUtil.KeyCode['1']] = goog.bind(this.jumpCell, this);
  this.keyMapping[sre.EventUtil.KeyCode['2']] = goog.bind(this.jumpCell, this);
  this.keyMapping[sre.EventUtil.KeyCode['3']] = goog.bind(this.jumpCell, this);
  this.keyMapping[sre.EventUtil.KeyCode['4']] = goog.bind(this.jumpCell, this);
  this.keyMapping[sre.EventUtil.KeyCode['5']] = goog.bind(this.jumpCell, this);
  this.keyMapping[sre.EventUtil.KeyCode['6']] = goog.bind(this.jumpCell, this);
  this.keyMapping[sre.EventUtil.KeyCode['7']] = goog.bind(this.jumpCell, this);
  this.keyMapping[sre.EventUtil.KeyCode['8']] = goog.bind(this.jumpCell, this);
  this.keyMapping[sre.EventUtil.KeyCode['9']] = goog.bind(this.jumpCell, this);
  // this.keyMapping[sre.EventUtil.KeyCode['U']] = goog.bind(this.backJump, this);

  /**
   * @type {?sre.EventUtil.KeyCode}
   */
  this.key = null;

  /**
   * @type {?number}
   */
  this.row = null;

  /**
   * @type {Array.<number>}
   */
  this.cell = null;

  /**
   * @type {!sre.Levels<string>}
   */
  this.undoStack = new sre.Levels();

  this.currentTable = null;
  
};
goog.inherits(sre.TableWalker, sre.SyntaxWalker);


/**
 * @override
 */
sre.TableWalker.prototype.move = function(key) {
  this.key = key;
  var result = sre.TableWalker.base(this, 'move', key);
  this.modifier = false;
  return result;
};


/**
 * @override
 */
sre.TableWalker.prototype.up = function() {
  this.moved = sre.Walker.move.UP;
  return this.eligibleCell_() ?
      this.verticalMove_(false) :
      sre.TableWalker.base(this, 'up');
};


/**
 * @override
 */
sre.TableWalker.prototype.down = function() {
  this.moved = sre.Walker.move.DOWN;
  return this.eligibleCell_() ?
      this.verticalMove_(true) :
      sre.TableWalker.base(this, 'down');
};


/**
 * @type {Array.<sre.SemanticAttr.Role>}
 */
sre.TableWalker.ELIGIBLE_CELL_ROLES = [
  sre.SemanticAttr.Role.DETERMINANT,
  sre.SemanticAttr.Role.ROWVECTOR,
  sre.SemanticAttr.Role.BINOMIAL,
  sre.SemanticAttr.Role.SQUAREMATRIX,
  sre.SemanticAttr.Role.MULTILINE,
  sre.SemanticAttr.Role.MATRIX,
  sre.SemanticAttr.Role.VECTOR,
  sre.SemanticAttr.Role.CASES,
  sre.SemanticAttr.Role.TABLE
];


/**
 * @type {Array.<sre.SemanticAttr.Type>}
 */
sre.TableWalker.ELIGIBLE_TABLE_TYPES = [
  sre.SemanticAttr.Type.MULTILINE,
  sre.SemanticAttr.Type.MATRIX,
  sre.SemanticAttr.Type.VECTOR,
  sre.SemanticAttr.Type.CASES,
  sre.SemanticAttr.Type.TABLE
  //
  // TODO: These two could be useful for the general check!
  // For now omitted.
  //
  // sre.SemanticAttr.Type.ROW,
  // sre.SemanticAttr.Type.CELL
];


/**
 * @return {boolean} True if the focused is an eligible table cell.
 * @private
 */
sre.TableWalker.prototype.eligibleCell_ = function() {
  var primary = this.getFocus().getSemanticPrimary();
  return this.modifier &&
        primary.type === sre.SemanticAttr.Type.CELL &&
    sre.TableWalker.ELIGIBLE_CELL_ROLES.indexOf(primary.role) !== -1;
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


/**
 * Indicates if a virtual summary is possible.
 * @return {?sre.Focus}
 * @protected
 */
sre.TableWalker.prototype.jumpCell = function() {
  if (!this.isInTable()) {
    return this.getFocus();
  }
  if (this.moved === sre.Walker.move.ROW) {
    this.moved = sre.Walker.move.CELL;
    var column = this.key - sre.EventUtil.KeyCode['0'];
    if (!this.isLegalJump(this.row, column)) {
      return this.getFocus();
    }
    this.cell = [this.row, column];
    return this.getFocus().clone();
  }
  this.row = (this.key - sre.EventUtil.KeyCode['0']);
  this.moved = sre.Walker.move.ROW;
  return this.getFocus().clone();
};


/**
 * @override
 */
sre.TableWalker.prototype.specialMove = function() {
  if (this.moved === sre.Walker.move.CELL) {
    return this.jumpCell_();
  }
  return null;
};


// Basic idea:
// -- Check if the cell position exists! (when?)
// -- Re-init the undo stack.
// -- Go up to the elibigle Table type.
// -- Pop foci off the levels.
// -- Push onto the undo stack.
// -- Go to cell position by pushing onto the levels.
sre.TableWalker.prototype.jumpCell_ = function() {
  console.log(this.currentTable);
  return 'Cell ' + this.row + ' ' + this.column; // this.getFocus();
};


sre.TableWalker.prototype.isLegalJump = function(row, column) {
  console.log(this.currentTable);
  var child = this.currentTable.childNodes[row];
  return child && child.childNodes[column];
};

/**
 * @return {boolean} True if we are inside a table.
 */
sre.TableWalker.prototype.isInTable = function() {
  var snode = this.getFocus().getSemanticPrimary();
  while (snode) {
    if (sre.TableWalker.ELIGIBLE_TABLE_TYPES.indexOf(snode.type) !== -1) {
      this.currentTable = snode;
      console.log(snode);
      return true;
    }
    snode = snode.parent;
  }
  return false;
};
