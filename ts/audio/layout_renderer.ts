//
// Copyright 2017-21 Volker Sorge
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
 * @file Class for SSML rendering of descriptions.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Debugger } from '../common/debugger';
import * as DomUtil from '../common/dom_util';
import * as EngineConst from '../common/engine_const';
import * as AudioUtil from './audio_util';
import { AuditoryDescription } from './auditory_description';
import { XmlRenderer } from './xml_renderer';

export class LayoutRenderer extends XmlRenderer {
  /**
   * @override
   */
  public finalize(str: string) {
    return setTwoDim(str);
  }

  /**
   * @override
   */
  public pause(_pause: AudioUtil.Pause) {
    return '';
  }

  /**
   * @override
   */
  public prosodyElement(attr: string, value: number) {
    return attr === EngineConst.personalityProps.LAYOUT ? `<${value}>` : '';
  }

  /**
   * @override
   */
  public closeTag(tag: string) {
    return `</${tag}>`;
  }

  /**
   * @override
   */
  public markup(descrs: AuditoryDescription[]) {
    // TODO: Include personality range computations.
    const result = [];
    let content: AuditoryDescription[] = [];
    for (const descr of descrs) {
      if (!descr.layout) {
        content.push(descr);
        continue;
      }
      result.push(this.processContent(content));
      content = [];
      const value = descr.layout;
      if (value.match(/^begin/)) {
        result.push('<' + value.replace(/^begin/, '') + '>');
        continue;
      }
      if (value.match(/^end/)) {
        result.push('</' + value.replace(/^end/, '') + '>');
        continue;
      }
      console.warn('Something went wrong with layout markup: ' + value);
    }
    result.push(this.processContent(content));
    return result.join('');
  }

  private processContent(content: AuditoryDescription[]) {
    const result = [];
    const markup = AudioUtil.personalityMarkup(content);
    for (let i = 0, descr: AudioUtil.Markup; (descr = markup[i]); i++) {
      if (descr.span) {
        result.push(this.merge(descr.span));
        continue;
      }
      if (AudioUtil.isPauseElement(descr)) {
        continue;
      }
    }
    return result.join(''); // this.merge(result);
  }
}

// Postprocessing
let twodExpr = '';

const handlers: { [key: string]: (node: Element) => string } = {
  TABLE: handleTable,
  CASES: handleCases,
  CAYLEY: handleCayley,
  MATRIX: handleMatrix,
  CELL: recurseTree,
  FENCE: recurseTree,
  ROW: recurseTree,
  FRACTION: handleFraction,
  NUMERATOR: handleFractionPart,
  DENOMINATOR: handleFractionPart
};

/**
 * Applies a handler to the text element.
 *
 * @param element The element.
 * @returns The text content possibly altered by a layout handler.
 */
function applyHandler(element: Element): string {
  const tag = DomUtil.tagName(element as Element);
  const handler = handlers[tag];
  return handler ? handler(element) : element.textContent;
}

/**
 * Sets into 2D.
 *
 * @param str The str to be set in 2D.
 * @returns The 2D expression.
 */
function setTwoDim(str: string): string {
  twodExpr = '';
  const dom = DomUtil.parseInput(`<all>${str}</all>`);
  Debugger.getInstance().output(DomUtil.formatXml(dom.toString()));
  twodExpr = recurseTree(dom);
  return twodExpr;
}

/**
 * Combines content of two strings, preserving the 2D layout.
 *
 * @param str1 String 1.
 * @param str2 String 2.
 * @returns The combined strings.
 */
function combineContent(str1: string, str2: string): string {
  if (!str1 || !str2) {
    return str1 + str2;
  }
  const height1 = strHeight(str1);
  const height2 = strHeight(str2);
  const diff = height1 - height2;
  str1 = diff < 0 ? padCell(str1, height2, strWidth(str1)) : str1;
  str2 = diff > 0 ? padCell(str2, height1, strWidth(str2)) : str2;
  const lines1 = str1.split(/\r\n|\r|\n/);
  const lines2 = str2.split(/\r\n|\r|\n/);
  const result = [];
  for (let i = 0; i < lines1.length; i++) {
    result.push(lines1[i] + lines2[i]);
  }
  return result.join('\n');
}

/**
 * Recurses the children of the given node by applying handlers and assembling a
 * layout element.
 *
 * @param dom A node.
 * @returns The resulting layout element.
 */
function recurseTree(dom: Element): string {
  let result = '';
  for (const child of Array.from(dom.childNodes)) {
    if (child.nodeType === DomUtil.NodeType.TEXT_NODE) {
      result = combineContent(result, child.textContent);
      continue;
    }
    result = combineContent(result, applyHandler(child as Element));
  }
  return result;
}

/**
 * Computes the 2D height of the string.
 *
 * @param str The input string.
 * @returns The height of the string.
 */
function strHeight(str: string): number {
  return str.split(/\r\n|\r|\n/).length;
}

/**
 * Computes the max 2D width of the string.
 *
 * @param str The input string.
 * @returns The width of the string.
 */
function strWidth(str: string): number {
  return str.split(/\r\n|\r|\n/).reduce((max, x) => Math.max(x.length, max), 0);
}

/**
 * Pads a string to the given height.
 *
 * @param str The input string.
 * @param height The height.
 * @returns The padded string.
 */
function padHeight(str: string, height: number): string {
  const padding = height - strHeight(str);
  return str + (padding > 0 ? new Array(padding + 1).join('\n') : '');
}

/**
 * Pads a string to the given width.
 *
 * @param str The input string.
 * @param width The width.
 * @returns The padded string.
 */
function padWidth(str: string, width: number): string {
  const lines = str.split(/\r\n|\r|\n/);
  const result = [];
  for (const line of lines) {
    const padding = width - line.length;
    result.push(line + (padding > 0 ? new Array(padding + 1).join('⠀') : ''));
  }
  return result.join('\n');
}

/**
 * Pads a cell to the necessary height and width.
 *
 * @param str The input string.
 * @param height The height.
 * @param width The width.
 * @returns The padded cell.
 */
function padCell(str: string, height: number, width: number): string {
  str = padHeight(str, height);
  return padWidth(str, width);
}

declare type row = {
  lfence: string;
  rfence: string;
  sep: string;
  cells: string[];
  height: number;
  width: number[];
};

/**
 * Clean row elements and assemble row structure of a matrix.
 *
 * @param matrix The matrix element.
 * @returns List of matrix rows.
 */
function assembleRows(matrix: Element): row[] {
  const children = Array.from(matrix.childNodes);
  const mat = [];
  for (const row of children) {
    if (row.nodeType !== DomUtil.NodeType.ELEMENT_NODE) {
      continue;
    }
    mat.push(handleRow(row as Element));
  }
  return mat;
}

/**
 * Compute max height and width of a matrix structure.
 *
 * @param mat Matrix as a list of rows.
 * @returns Pair of max height and width.
 */
function getMaxParameters(mat: row[]): [number, number[]] {
  const maxHeight = mat.reduce((max, x) => Math.max(x.height, max), 0);
  const maxWidth = [];
  for (let i = 0; i < mat[0].width.length; i++) {
    maxWidth.push(
      mat.map((x) => x.width[i]).reduce((max, x) => Math.max(max, x), 0)
    );
  }
  return [maxHeight, maxWidth];
}

/**
 * Pad cells and assemble rows of a matrix structure.
 *
 * @param mat The matrix structure as a list of rows.
 * @param maxWidth The maximum width.
 * @returns The combined and padded rows.
 */
function combineCells(mat: row[], maxWidth: number[]): row[] {
  const newMat = [];
  for (const row of mat) {
    if (row.height === 0) {
      continue;
    }
    const newCells = [];
    for (let i = 0; i < row.cells.length; i++) {
      newCells.push(padCell(row.cells[i], row.height, maxWidth[i]));
    }
    row.cells = newCells;
    newMat.push(row);
  }
  return newMat;
}

/**
 * Combine rows into matrix.
 *
 * @param mat The matrix structure as a list of rows.
 * @param maxHeight The maximum height.
 * @returns The single string with combined and padded columns.
 */
function combineRows(mat: row[], maxHeight: number): string {
  // If all rows are of heigth 1 assemble them directly.
  if (maxHeight === 1) {
    return mat
      .map((row) => row.lfence + row.cells.join(row.sep) + row.rfence)
      .join('\n');
  }
  const result = [];
  // Otherwise insert extra empty rows if necessary
  for (const row of mat) {
    const sep = verticalArrange(row.sep, row.height);
    let str = row.cells.shift();
    while (row.cells.length) {
      str = combineContent(str, sep);
      str = combineContent(str, row.cells.shift());
    }
    str = combineContent(verticalArrange(row.lfence, row.height), str);
    str = combineContent(str, verticalArrange(row.rfence, row.height));
    result.push(str);
    result.push(
      row.lfence + new Array(strWidth(str) - 3).join(row.sep) + row.rfence
    );
  }
  return result.slice(0, -1).join('\n');
}

/**
 * Vertically arranges characters in a matrix or table.
 *
 * @param char The characters.
 * @param height The height of the matrix.
 * @returns The newly arranged line.
 */
function verticalArrange(char: string, height: number) {
  let str = '';
  while (height) {
    str += char + '\n';
    height--;
  }
  return str.slice(0, -1);
}

/**
 * Retrieves the fence in the xml element.
 *
 * @param node The node.
 * @returns The string representing the fence.
 */
function getFence(node: Node): string {
  if (
    node.nodeType === DomUtil.NodeType.ELEMENT_NODE &&
    DomUtil.tagName(node as Element) === 'FENCE'
  ) {
    return applyHandler(node as Element);
  }
  return '';
}

/**
 * Handler that transforms matrix into 2D layout.
 *
 * @param matrix The matrix element.
 * @returns The tranformed string.
 */
function handleMatrix(matrix: Element): string {
  let mat = assembleRows(matrix);
  const [maxHeight, maxWidth] = getMaxParameters(mat);
  mat = combineCells(mat, maxWidth);
  return combineRows(mat, maxHeight);
}

/**
 * Handler that transforms a table into 2D layout.
 *
 * @param table The table element.
 * @returns The transformed string.
 */
function handleTable(table: Element): string {
  let mat = assembleRows(table);
  // TODO: Adapt this so cells of length one will be retained!
  mat.forEach((row) => {
    row.cells = row.cells.slice(1).slice(0, -1);
    row.width = row.width.slice(1).slice(0, -1);
  });
  const [maxHeight, maxWidth] = getMaxParameters(mat);
  mat = combineCells(mat, maxWidth);
  return combineRows(mat, maxHeight);
}

// TODO: Check with Michael why the number indicator is omitted (e.g., 16.4-1)
/**
 * Handler that transforms a case statement into 2D layout.
 *
 * @param cases The cases element.
 * @returns The transformed string.
 */
function handleCases(cases: Element): string {
  let mat = assembleRows(cases);
  mat.forEach((row) => {
    row.cells = row.cells.slice(0, -1);
    row.width = row.width.slice(0, -1);
  });
  const [maxHeight, maxWidth] = getMaxParameters(mat);
  mat = combineCells(mat, maxWidth);
  return combineRows(mat, maxHeight);
}

/**
 * Handler that transforms a Cayley table into 2D layout.
 *
 * @param cayley The table element.
 * @returns The transformed string.
 */
function handleCayley(cayley: Element): string {
  let mat = assembleRows(cayley);
  mat.forEach((row) => {
    row.cells = row.cells.slice(1).slice(0, -1);
    row.width = row.width.slice(1).slice(0, -1);
    row.sep = row.sep + row.sep;
  });
  const [maxHeight, maxWidth] = getMaxParameters(mat);
  const bar = {
    lfence: '',
    rfence: '',
    cells: maxWidth.map((x) => '⠐' + new Array(x).join('⠒')),
    width: maxWidth,
    height: 1,
    sep: mat[0].sep
  };
  mat.splice(1, 0, bar);
  mat = combineCells(mat, maxWidth);
  return combineRows(mat, maxHeight);
}

/**
 * Handler for transforming a table row.
 *
 * @param row The row element.
 * @returns The internal row representation to pass to the next handler.
 */
function handleRow(row: Element): row {
  const children = Array.from(row.childNodes);
  const lfence = getFence(children[0]);
  const rfence = getFence(children[children.length - 1]);
  if (lfence) {
    children.shift();
  }
  if (rfence) {
    children.pop();
  }
  let sep = '';
  const cells = [];
  for (const child of children) {
    if (child.nodeType === DomUtil.NodeType.TEXT_NODE) {
      sep = child.textContent;
      continue;
    }
    const result = applyHandler(child as Element);
    cells.push(result);
  }
  return {
    lfence: lfence,
    rfence: rfence,
    sep: sep,
    cells: cells,
    height: cells.reduce((max, x) => Math.max(strHeight(x), max), 0),
    width: cells.map(strWidth)
  };
}

/**
 * Centers the cell of a fraction.
 *
 * @param cell The cell.
 * @param width The width of the fraction line.
 * @returns The padded and centered cell.
 */
function centerCell(cell: string, width: number): string {
  const cw = strWidth(cell);
  const center = (width - cw) / 2;
  const [lpad, rpad] =
    Math.floor(center) === center
      ? [center, center]
      : [Math.floor(center), Math.ceil(center)];
  const lines = cell.split(/\r\n|\r|\n/);
  const result = [];
  const [lstr, rstr] = [
    new Array(lpad + 1).join('⠀'),
    new Array(rpad + 1).join('⠀')
  ];
  for (const line of lines) {
    result.push(lstr + line + rstr);
  }
  return result.join('\n');
}

/**
 * Handler for transforming a fraction into 2D layout.
 *
 * @param frac The fraction node.
 * @returns The transformed string.
 */
function handleFraction(frac: Node): string {
  const [open, num, , den, close] = Array.from(frac.childNodes);
  const numerator = applyHandler(num as Element);
  const denominator = applyHandler(den as Element);
  const nwidth = strWidth(numerator);
  const dwidth = strWidth(denominator);
  let maxWidth = Math.max(nwidth, dwidth);
  const bar = open + new Array(maxWidth + 1).join('⠒') + close;
  maxWidth = bar.length;
  return (
    `${centerCell(numerator, maxWidth)}\n${bar}\n` +
    `${centerCell(denominator, maxWidth)}`
  );
}

/**
 * Handler for denominator or numerator of a fraction. Ensures that indicators
 * are correctly set.
 *
 * @param prt The element representing numerator or denominator.
 * @returns The transformed string.
 */
function handleFractionPart(prt: Element): string {
  const fchild = prt.firstChild as Element;
  const content = recurseTree(prt);
  if (fchild && fchild.nodeType === DomUtil.NodeType.ELEMENT_NODE) {
    if (DomUtil.tagName(fchild) === 'ENGLISH') {
      return '⠰' + content;
    }
    if (DomUtil.tagName(fchild) === 'NUMBER') {
      return '⠼' + content;
    }
  }
  return content;
}
