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


import * as DomUtil from '../common/dom_util';
import {KeyCode} from '../common/event_util';
import {Highlighter} from '../highlighter/highlighter';
import {SemanticRole, SemanticType} from '../semantic_tree/semantic_attr';
import {SemanticNode} from '../semantic_tree/semantic_node';
import {SpeechGenerator} from '../speech_generator/speech_generator';

import {Focus} from './focus';
import {SyntaxWalker} from './syntax_walker';
import {WalkerMoves} from './walker';


export class TableWalker extends SyntaxWalker {

  public static ELIGIBLE_CELL_ROLES: SemanticRole[];


  public static ELIGIBLE_TABLE_TYPES: SemanticType[];

  public modifier: boolean = false;

  public firstJump: Focus = null;
  public moved: any;

  private key_: KeyCode|null = null;

  private row_: number = 0;

  private currentTable_: SemanticNode|null = null;

  /**
   * @override
   */
  constructor(
      public node: Element, public generator: SpeechGenerator,
      public highlighter: Highlighter, xml: string) {
    super(node, generator, highlighter, xml);

    this.keyMapping.set(KeyCode.ZERO, this.jumpCell.bind(this));
    this.keyMapping.set(KeyCode.ONE, this.jumpCell.bind(this));
    this.keyMapping.set(KeyCode.TWO, this.jumpCell.bind(this));
    this.keyMapping.set(KeyCode.THREE, this.jumpCell.bind(this));
    this.keyMapping.set(KeyCode.FOUR, this.jumpCell.bind(this));
    this.keyMapping.set(KeyCode.FIVE, this.jumpCell.bind(this));
    this.keyMapping.set(KeyCode.SIX, this.jumpCell.bind(this));
    this.keyMapping.set(KeyCode.SEVEN, this.jumpCell.bind(this));
    this.keyMapping.set(KeyCode.EIGHT, this.jumpCell.bind(this));
    this.keyMapping.set(KeyCode.NINE, this.jumpCell.bind(this));
  }


  /**
   * @override
   */
  public move(key: KeyCode) {
    this.key_ = key;
    let result = super.move(key);
    this.modifier = false;
    return result;
  }


  /**
   * @override
   */
  public up() {
    this.moved = WalkerMoves.UP;
    return this.eligibleCell_() ? this.verticalMove_(false) : super.up();
  }


  /**
   * @override
   */
  public down() {
    this.moved = WalkerMoves.DOWN;
    return this.eligibleCell_() ? this.verticalMove_(true) : super.down();
  }


  /**
   * Jumps directly to a table cell if possible.
   */
  protected jumpCell(): Focus|null {
    if (!this.isInTable_() || this.key_ === null) {
      return this.getFocus();
    }
    if (this.moved === WalkerMoves.ROW) {
      this.moved = WalkerMoves.CELL;
      let column = this.key_ - KeyCode.ZERO;
      if (!this.isLegalJump_(this.row_, column)) {
        return this.getFocus();
      }
      return this.jumpCell_(this.row_, column);
    }
    let row = this.key_ - KeyCode.ZERO;
    if (row > this.currentTable_.childNodes.length) {
      return this.getFocus();
    }
    this.row_ = row;
    this.moved = WalkerMoves.ROW;
    return this.getFocus().clone();
  }

  /**
   * @override
   */
  public undo() {
    let focus = super.undo();
    if (focus === this.firstJump) {
      this.firstJump = null;
    }
    return focus;
  }


  /**
   * @return True if the focused is an eligible table cell.
   */
  private eligibleCell_(): boolean {
    let primary = this.getFocus().getSemanticPrimary();
    return this.modifier && primary.type === SemanticType.CELL &&
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
    let level;
    // Pop foci until we have reached the table.
    do {
      level = this.levels.pop();
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
    let xmlTable = DomUtil.querySelectorAllByAttrValue(
        this.getRebuilt().xml, 'id', this.currentTable_.id.toString())[0];
    if (!xmlTable || xmlTable.hasAttribute('alternative')) {
      return false;
    }
    let rowNode = this.currentTable_.childNodes[row - 1];
    if (!rowNode) {
      return false;
    }
    let xmlRow = DomUtil.querySelectorAllByAttrValue(
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
}

TableWalker.ELIGIBLE_CELL_ROLES = [
  SemanticRole.DETERMINANT, SemanticRole.ROWVECTOR,
  SemanticRole.BINOMIAL, SemanticRole.SQUAREMATRIX,
  SemanticRole.MULTILINE, SemanticRole.MATRIX,
  SemanticRole.VECTOR, SemanticRole.CASES,
  SemanticRole.TABLE
];
TableWalker.ELIGIBLE_TABLE_TYPES = [
  SemanticType.MULTILINE, SemanticType.MATRIX,
  SemanticType.VECTOR, SemanticType.CASES,
  SemanticType.TABLE
];
