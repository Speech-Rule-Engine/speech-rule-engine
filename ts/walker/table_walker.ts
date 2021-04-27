//
// Copyright 2015-21 Volker Sorge
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


import {KeyCode} from '../common/event_util';
import {SemanticNode} from '../semantic_tree/semantic_node';

import {Focus} from './focus';
import {SyntaxWalker} from './syntax_walker';



/**
 * @override
 */
export class TableWalker extends sre.SyntaxWalker {
  static ELIGIBLE_CELL_ROLES: SemanticAttr.Role[];


  static ELIGIBLE_TABLE_TYPES: SemanticAttr.Type[];

  modifier: boolean = false;

  private key_: KeyCode|null = null;

  private row_: number = 0;

  private currentTable_: SemanticNode|null = null;

  firstJump: Focus = null;
  moved: any;
  constructor(node, generator, highlighter, xml) {
    super(node, generator, highlighter, xml);

    this.keyMapping[sre.EventUtil.KeyCode['0']] =
        goog.bind(this.jumpCell, this);
    this.keyMapping[sre.EventUtil.KeyCode['1']] =
        goog.bind(this.jumpCell, this);
    this.keyMapping[sre.EventUtil.KeyCode['2']] =
        goog.bind(this.jumpCell, this);
    this.keyMapping[sre.EventUtil.KeyCode['3']] =
        goog.bind(this.jumpCell, this);
    this.keyMapping[sre.EventUtil.KeyCode['4']] =
        goog.bind(this.jumpCell, this);
    this.keyMapping[sre.EventUtil.KeyCode['5']] =
        goog.bind(this.jumpCell, this);
    this.keyMapping[sre.EventUtil.KeyCode['6']] =
        goog.bind(this.jumpCell, this);
    this.keyMapping[sre.EventUtil.KeyCode['7']] =
        goog.bind(this.jumpCell, this);
    this.keyMapping[sre.EventUtil.KeyCode['8']] =
        goog.bind(this.jumpCell, this);
    this.keyMapping[sre.EventUtil.KeyCode['9']] =
        goog.bind(this.jumpCell, this);
  }


  /**
   * @override
   */
  move(key) {
    this.key_ = key;
    let result = super.move(key);
    this.modifier = false;
    return result;
  }


  /**
   * @override
   */
  up() {
    this.moved = sre.Walker.move.UP;
    return this.eligibleCell_() ? this.verticalMove_(false) : super.up();
  }


  /**
   * @override
   */
  down() {
    this.moved = sre.Walker.move.DOWN;
    return this.eligibleCell_() ? this.verticalMove_(true) : super.down();
  }


  /**
   * @return True if the focused is an eligible table cell.
   */
  private eligibleCell_(): boolean {
    let primary = this.getFocus().getSemanticPrimary();
    return this.modifier && primary.type === sre.SemanticAttr.Type.CELL &&
        TableWalker.ELIGIBLE_CELL_ROLES.indexOf(primary.role) !== -1;
  }


  /**
   * Performs a vertical move in a table.
   * @param direction If true walk down, o/w up.
   * @return The new focus.
   */
  private verticalMove_(direction: boolean): Focus|null {
    let parent = this.previousLevel();
    if (!parent) {
      return null;
    }
    let origFocus = this.getFocus();
    let origIndex = (this.levels.indexOf(this.primaryId()) as number);
    let origLevel = this.levels.pop();
    let parentIndex = (this.levels.indexOf(parent) as number);
    let row =
        (this.levels.get(direction ? parentIndex + 1 : parentIndex - 1) as
         string);
    if (!row) {
      this.levels.push(origLevel);
      return null;
    }
    this.setFocus(this.singletonFocus(row));
    let children = this.nextLevel();
    let newNode = children[origIndex];
    if (!newNode) {
      this.setFocus(origFocus);
      this.levels.push(origLevel);
      return null;
    }
    this.levels.push(children);
    return this.singletonFocus(children[origIndex]);
  }


  /**
   * Jumps directly to a table cell if possible.
   */
  protected jumpCell(): Focus|null {
    if (!this.isInTable_() || this.key_ === null) {
      return this.getFocus();
    }
    if (this.moved === sre.Walker.move.ROW) {
      this.moved = sre.Walker.move.CELL;
      let column = this.key_ - sre.EventUtil.KeyCode['0'];
      if (!this.isLegalJump_(this.row_, column)) {
        return this.getFocus();
      }
      return this.jumpCell_(this.row_, column);
    }
    let row = this.key_ - sre.EventUtil.KeyCode['0'];
    if (row > this.currentTable_.childNodes.length) {
      return this.getFocus();
    }
    this.row_ = row;
    this.moved = sre.Walker.move.ROW;
    return this.getFocus().clone();
  }


  /**
   * Jumps to the cell at the given row column position.
   * @param row The row coordinate.
   * @param column The column coordinate.
   * @return The newly focused cell.
   */
  private jumpCell_(row: number, column: number): Focus {
    if (!this.firstJump) {
      this.firstJump = this.getFocus();
      this.virtualize(true);
    } else {
      this.virtualize(false);
    }
    // We know the cell position exists!
    let id = this.currentTable_.id.toString();
    // Pop foci until we have reached the table.
    do {
      let level = this.levels.pop();
    } while (level.indexOf(id) === -1);
    // Go to cell position by pushing row and cell onto levels.
    this.levels.push(level);
    this.setFocus(this.singletonFocus(id));
    this.levels.push(this.nextLevel());
    let semRow = this.currentTable_.childNodes[row - 1];
    this.setFocus(this.singletonFocus(semRow.id.toString()));
    this.levels.push(this.nextLevel());
    return this.singletonFocus(semRow.childNodes[column - 1].id.toString());
  }


  /**
   * Checks if a jump to a given row column position is possible in the current
   * table.
   * @param row The row coordinate.
   * @param column The column coordinate.
   * @return True if the cell exists.
   */
  private isLegalJump_(row: number, column: number): boolean {
    let xmlTable = sre.DomUtil.querySelectorAllByAttrValue(
        this.getRebuilt().xml, 'id', this.currentTable_.id.toString())[0];
    if (!xmlTable || xmlTable.hasAttribute('alternative')) {
      return false;
    }
    let rowNode = this.currentTable_.childNodes[row - 1];
    if (!rowNode) {
      return false;
    }
    let xmlRow = sre.DomUtil.querySelectorAllByAttrValue(
        xmlTable, 'id', rowNode.id.toString())[0];
    if (!xmlRow || xmlRow.hasAttribute('alternative')) {
      return false;
    }
    return !!(rowNode && rowNode.childNodes[column - 1]);
  }


  /**
   * @return True if we are inside a table.
   */
  private isInTable_(): boolean {
    let snode = this.getFocus().getSemanticPrimary();
    while (snode) {
      if (TableWalker.ELIGIBLE_TABLE_TYPES.indexOf(snode.type) !== -1) {
        this.currentTable_ = snode;
        return true;
      }
      snode = snode.parent;
    }
    return false;
  }


  /**
   * @override
   */
  undo() {
    let focus = super.undo();
    if (focus === this.firstJump) {
      this.firstJump = null;
    }
    return focus;
  }
}
goog.inherits(TableWalker, SyntaxWalker);
TableWalker.ELIGIBLE_CELL_ROLES = [
  sre.SemanticAttr.Role.DETERMINANT, sre.SemanticAttr.Role.ROWVECTOR,
  sre.SemanticAttr.Role.BINOMIAL, sre.SemanticAttr.Role.SQUAREMATRIX,
  sre.SemanticAttr.Role.MULTILINE, sre.SemanticAttr.Role.MATRIX,
  sre.SemanticAttr.Role.VECTOR, sre.SemanticAttr.Role.CASES,
  sre.SemanticAttr.Role.TABLE
];
TableWalker.ELIGIBLE_TABLE_TYPES = [
  sre.SemanticAttr.Type.MULTILINE, sre.SemanticAttr.Type.MATRIX,
  sre.SemanticAttr.Type.VECTOR, sre.SemanticAttr.Type.CASES,
  sre.SemanticAttr.Type.TABLE
];
