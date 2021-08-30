//
// Copyright 2014-21 Volker Sorge
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
 * @fileoverview A processor for building semantic trees.
 *
 * This implements the basic heuristics for generating semantic trees from
 * already existing semantic nodes.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util';
import {SemanticAttr, SemanticFont, SemanticRole, SemanticType} from './semantic_attr';
import {SemanticHeuristics} from './semantic_heuristics';
import {SemanticNode} from './semantic_node';
import {SemanticNodeFactory} from './semantic_node_factory';
import * as SemanticPred from './semantic_pred';
import * as SemanticUtil from './semantic_util';


interface BoundsType {
  type: SemanticType;
  length: number;
  accent?: boolean;
  }


export default class SemanticProcessor {

  private static readonly FENCE_TO_PUNCT_: {[key: string]: SemanticRole} = {
    [SemanticRole.METRIC]: SemanticRole.METRIC,
    [SemanticRole.NEUTRAL]: SemanticRole.VBAR,
    [SemanticRole.OPEN]: SemanticRole.OPENFENCE,
    [SemanticRole.CLOSE]: SemanticRole.CLOSEFENCE,
  };

  private static readonly MML_TO_LIMIT_: {[key: string]: BoundsType} = {
        'MSUB': {type: SemanticType.LIMLOWER, length: 1},
        'MUNDER': {type: SemanticType.LIMLOWER, length: 1},
        'MSUP': {type: SemanticType.LIMUPPER, length: 1},
        'MOVER': {type: SemanticType.LIMUPPER, length: 1},
        'MSUBSUP': {type: SemanticType.LIMBOTH, length: 2},
        'MUNDEROVER': {type: SemanticType.LIMBOTH, length: 2}
  };


  /**
   * {Object.<{type: SemanticType,
   *         length: number, accent: boolean}>}
   *
   */
  private static readonly MML_TO_BOUNDS_: {[key: string]: BoundsType} = {
       'MSUB': {type: SemanticType.SUBSCRIPT, length: 1, accent: false},
       'MSUP': {type: SemanticType.SUPERSCRIPT, length: 1, accent: false},
       'MSUBSUP': {type: SemanticType.SUBSCRIPT, length: 2, accent: false},
       'MUNDER': {type: SemanticType.UNDERSCORE, length: 1, accent: true},
       'MOVER': {type: SemanticType.OVERSCORE, length: 1, accent: true},
       'MUNDEROVER': {type: SemanticType.UNDERSCORE, length: 2, accent: true}
     };


  private static readonly CLASSIFY_FUNCTION_: {[key: string]: string} = {
    [SemanticRole.INTEGRAL]: 'integral',
    [SemanticRole.SUM]: 'bigop',
    [SemanticRole.PREFIXFUNC]: 'prefix',
    [SemanticRole.LIMFUNC]: 'prefix',
    [SemanticRole.SIMPLEFUNC]: 'prefix',
    [SemanticRole.COMPFUNC]: 'prefix'
  };


  /**
   * Maps mathjax font variants to semantic font names.
   */
  private static readonly MATHJAX_FONTS: {[key: string]: SemanticFont} = {
    '-tex-caligraphic': SemanticFont.CALIGRAPHIC,
    '-tex-caligraphic-bold': SemanticFont.CALIGRAPHICBOLD,
    '-tex-calligraphic': SemanticFont.CALIGRAPHIC,
    '-tex-calligraphic-bold': SemanticFont.CALIGRAPHICBOLD,
    '-tex-oldstyle': SemanticFont.OLDSTYLE,
    '-tex-oldstyle-bold': SemanticFont.OLDSTYLEBOLD,
    '-tex-mathit': SemanticFont.ITALIC
  };


  // TODO (TS): Keeping this as a singleton for the time being.
  private static instance: SemanticProcessor;


  /**
   * Table for caching explicit function applications.
   */
  public funcAppls: {[key: string]: SemanticNode} = {};


  private factory_: SemanticNodeFactory;

  /**
   * @return The SemanticProcessor object.
   */
  public static getInstance(): SemanticProcessor {
    SemanticProcessor.instance = SemanticProcessor.instance ||
      new SemanticProcessor();
    return SemanticProcessor.instance;
  }


  /**
   * Rewrites a table to multiline structure, simplifying it by getting rid of
   * the cell hierarchy level.
   * @param table The node to be rewritten a multiline.
   */
  public static tableToMultiline(table: SemanticNode) {
    if (!SemanticPred.tableIsMultiline(table)) {
      SemanticProcessor.classifyTable(table);
      return;
    }
    table.type = SemanticType.MULTILINE;
    for (let i = 0, row; row = table.childNodes[i]; i++) {
      SemanticProcessor.rowToLine_(row, SemanticRole.MULTILINE);
    }
    if (table.childNodes.length === 1 &&
        SemanticPred.isFencedElement(table.childNodes[0].childNodes[0])) {
      SemanticProcessor.tableToMatrixOrVector_(
          SemanticProcessor.rewriteFencedLine_(table));
    }
    SemanticProcessor.binomialForm_(table);
    SemanticProcessor.classifyMultiline(table);
  }


  /**
   * Processes a number node and adapts its role and font if necessary.
   * @param node The semantic tree node.
   */
  public static number(node: SemanticNode) {
    if (node.type === SemanticType.UNKNOWN ||
        // In case of latin numbers etc.
        node.type === SemanticType.IDENTIFIER) {
      node.type = SemanticType.NUMBER;
    }
    SemanticProcessor.numberRole_(node);
    SemanticProcessor.exprFont_(node);
  }


  /**
   * Semantically classifies a multiline table in terms of equation system it
   * might be.
   * @param multiline A multiline expression.
   */
  public static classifyMultiline(multiline: SemanticNode) {
    let index = 0;
    let length = multiline.childNodes.length;
    let line;
    while (index < length &&
           (!(line = multiline.childNodes[index]) || !line.childNodes.length)) {
      index++;
    }
    if (index >= length) {
      return;
    }
    let firstRole = line.childNodes[0].role;
    if (firstRole !== SemanticRole.UNKNOWN &&
        multiline.childNodes.every(function(x) {
          let cell = x.childNodes[0];
          return !cell ||
              cell.role === firstRole &&
            (SemanticPred.isType(cell, SemanticType.RELATION) ||
              SemanticPred.isType(cell, SemanticType.RELSEQ));
        })) {
      multiline.role = firstRole;
    }
  }


  /**
   * Semantically classifies a table in terms of equation system it might be.
   * @param table The table node.
   */
  public static classifyTable(table: SemanticNode) {
    let columns = SemanticProcessor.computeColumns_(table);
    SemanticProcessor.classifyByColumns_(
      table, columns, SemanticRole.EQUALITY) ||
      SemanticProcessor.classifyByColumns_(
        table, columns, SemanticRole.INEQUALITY, [SemanticRole.EQUALITY]) ||
      SemanticProcessor.classifyByColumns_(
        table, columns, SemanticRole.ARROW) ||
      SemanticProcessor.detectCaleyTable(table);
  }


  /**
   * Classifies a Cayley table.
   * @param table The table.
   * @return True if it is a Cayley table.
   */
  private static detectCaleyTable(table: SemanticNode) {
    if (!table.mathmlTree) {
      return false;
    }
    const tree = table.mathmlTree;
    const cl = tree.getAttribute('columnlines');
    const rl = tree.getAttribute('rowlines');
    if (!cl || !rl) {
      return false;
    }
    if (SemanticProcessor.cayleySpacing(cl) &&
      SemanticProcessor.cayleySpacing(rl)) {
      table.role = SemanticRole.CAYLEY;
      return true;
    }
    return false;
  }


  /**
   * Checks for the table if it has bars between first and second column and
   * first and second row, only.
   *
   * @param lines The lines attribute string.
   * @return True if the lines attribute indicate a Cayley table.
   */
  private static cayleySpacing(lines: string): boolean {
    const list = lines.split(' ');
    return (list[0] === 'solid' || list[0] === 'dashed') &&
      list.slice(1).every(x => x === 'none');
  }


  // Inference rules (Simons)
  // This is top down parsing, so we have to keep the bottom-up processor
  // available.
  /**
   * Parses a proof node.
   * @param node The node.
   * @param semantics Its semantics attribute value.
   * @param parse The
   *     current semantic parser for list of nodes.
   * @return The semantic node.
   */
  public static proof(
      node: Element, semantics: string,
      parse: (p1: Element[]) => SemanticNode[]): SemanticNode {
    let attrs = SemanticProcessor.separateSemantics(semantics);
    return SemanticProcessor.getInstance().proof(node, attrs, parse);
  }


  // Utilities
  // This one should be prefix specific!
  /**
   *
   * @param node The mml node.
   * @param attr The attribute name.
   * @param opt_value The attribute value.
   * @return True if the semantic attribute is in the node.
   */
  public static findSemantics(node: Element, attr: string, opt_value?: string):
      boolean {
    let value = opt_value == null ? null : opt_value;
    let semantics = SemanticProcessor.getSemantics(node);
    if (!semantics) {
      return false;
    }
    if (!semantics[attr]) {
      return false;
    }
    return value == null ? true : semantics[attr] === value;
  }


  /**
   * Retrieves the content of a semantic attribute in a node as an association
   * list.
   * @param node The mml node.
   * @return The association list.
   */
  public static getSemantics(node: Element): {[key: string]: string} {
    let semantics = node.getAttribute('semantics');
    if (!semantics) {
      return null;
    }
    return SemanticProcessor.separateSemantics(semantics);
  }


  /**
   * Removes prefix from a semantic attribute.
   * @param name The semantic attribute.
   * @return Name with prefix removed.
   */
  public static removePrefix(name: string): string {
    let [ , ...rest] = name.split('_');
    return rest.join('_');
  }


  /**
   * Separates a semantic attribute into it's components.
   * @param attr Content of the semantic attribute.
   * @return Association list of semantic attributes.
   */
  public static separateSemantics(attr: string): {[key: string]: string} {
    let result: {[key: string]: string} = {};
    attr.split(';').forEach(function(x) {
      let [name, value] = x.split(':');
      result[SemanticProcessor.removePrefix(name)] = value;
    });
    return result;
  }


  /**
   * Matches juxtaposition with existing spaces by adding the potentially nested
   * space elements as mathmlTree elements. This has the effect that newly
   * introduced invisible times operators will enrich the spaces rather than add
   * new empty elements.
   * @param nodes The operands.
   * @param ops A list of invisible times operators.
   */
  private static matchSpaces_(nodes: SemanticNode[], ops: SemanticNode[]) {
    for (let i = 0, op; op = ops[i]; i++) {
      let node = nodes[i];
      let mt1 = node.mathmlTree;
      let mt2 = nodes[i + 1].mathmlTree;
      if (!mt1 || !mt2) {
        continue;
      }
      let sibling = (mt1.nextSibling as Element);
      if (!sibling || sibling === mt2) {
        continue;
      }
      let spacer = SemanticProcessor.getSpacer_(sibling);
      if (spacer) {
        op.mathml.push(spacer);
        op.mathmlTree = spacer;
        op.role = SemanticRole.SPACE;
      }
    }
  }


  // TODO (TS): Make this optional conditions.
  /**
   * Recursively retrieves an embedded space element.
   * @param node The mml element.
   * @return The space element if it exists.
   */
  private static getSpacer_(node: Element): Element {
    if (DomUtil.tagName(node) === 'MSPACE') {
      return node;
    }
    while (SemanticUtil.hasEmptyTag(node) && node.childNodes.length === 1) {
      node = (node.childNodes[0] as Element);
      if (DomUtil.tagName(node) === 'MSPACE') {
        return node;
      }
    }
    return null;
  }


  /**
   * Rewrite fences into punctuation. This is done with any "leftover" fence.
   * @param fence Fence.
   */
  private static fenceToPunct_(fence: SemanticNode) {
    let newRole = SemanticProcessor.FENCE_TO_PUNCT_[fence.role];
    if (!newRole) {
      return;
    }
    while (fence.embellished) {
      fence.embellished = SemanticType.PUNCTUATION;
      if (!(SemanticPred.isRole(fence, SemanticRole.SUBSUP) ||
        SemanticPred.isRole(fence, SemanticRole.UNDEROVER))) {
        fence.role = newRole;
      }
      fence = fence.childNodes[0];
    }
    fence.type = SemanticType.PUNCTUATION;
    fence.role = newRole;
  }


  /**
   * Classifies a function wrt. the heuristic that should be applied.
   * @param funcNode The node to be classified.
   * @param restNodes The remainder list of
   *     nodes. They can be useful to look ahead if there is an explicit
   * function application. If there is one, it will be destructively removed!
   * @return The string specifying the heuristic.
   */
  private static classifyFunction_(
      funcNode: SemanticNode, restNodes: SemanticNode[]): string {
    //  We do not allow double function application. This is not lambda
    //  calculus!
    if (funcNode.type === SemanticType.APPL ||
        funcNode.type === SemanticType.BIGOP ||
        funcNode.type === SemanticType.INTEGRAL) {
      return '';
    }
    // Find and remove explicit function applications.
    // We now treat funcNode as a prefix function, regardless of what its actual
    // content is.
    if (restNodes[0] &&
        restNodes[0].textContent === SemanticAttr.functionApplication()) {
      // Store explicit function application to be reused later.
      SemanticProcessor.getInstance().funcAppls[funcNode.id] =
          restNodes.shift();
      let role = SemanticRole.SIMPLEFUNC;
      SemanticHeuristics.run('simple2prefix', funcNode);
      if (funcNode.role === SemanticRole.PREFIXFUNC ||
          funcNode.role === SemanticRole.LIMFUNC) {
        role = funcNode.role;
      }
      SemanticProcessor.propagateFunctionRole_(funcNode, role);
      return 'prefix';
    }
    let kind = SemanticProcessor.CLASSIFY_FUNCTION_[funcNode.role];
    return kind ? kind :
                  SemanticPred.isSimpleFunctionHead(funcNode) ? 'simple' : '';
  }


  /**
   * Propagates a function role in a node.
   * @param funcNode The node whose role is to be
   *     rewritten.
   * @param tag The function role to be inserted.
   */
  private static propagateFunctionRole_(
      funcNode: SemanticNode, tag: SemanticRole) {
    if (funcNode) {
      if (funcNode.type === SemanticType.INFIXOP) {
        return;
      }
      if (!(SemanticPred.isRole(funcNode, SemanticRole.SUBSUP) ||
        SemanticPred.isRole(funcNode, SemanticRole.UNDEROVER))) {
        funcNode.role = tag;
      }
      SemanticProcessor.propagateFunctionRole_(funcNode.childNodes[0], tag);
    }
  }


  /**
   * Finds the function operator in a partial semantic tree if it exists.
   * @param tree The partial tree.
   * @param pred Predicate for the
   *    function operator.
   * @return The function operator.
   */
  private static getFunctionOp_(
      tree: SemanticNode, pred: (p1: SemanticNode) => boolean): SemanticNode {
    if (pred(tree)) {
      return tree;
    }
    for (let i = 0, child; child = tree.childNodes[i]; i++) {
      let op = SemanticProcessor.getFunctionOp_(child, pred);
      if (op) {
        return op;
      }
    }
    return null;
  }


  /**
   * Replaces a fenced node by a matrix or vector node and possibly specialises
   * it's role.
   * @param node The fenced node to be rewritten.
   * @return The matrix or vector node.
   */
  private static tableToMatrixOrVector_(node: SemanticNode): SemanticNode {
    let matrix = node.childNodes[0];
    SemanticPred.isType(matrix, SemanticType.MULTILINE) ?
        SemanticProcessor.tableToVector_(node) :
        SemanticProcessor.tableToMatrix_(node);
    node.contentNodes.forEach(matrix.appendContentNode.bind(matrix));
    for (let i = 0, row; row = matrix.childNodes[i]; i++) {
      SemanticProcessor.assignRoleToRow_(
          row, SemanticProcessor.getComponentRoles_(matrix));
    }
    matrix.parent = null;
    return matrix;
  }


  /**
   * Assigns a specialised roles to a vector node inside the given fenced node.
   * @param node The fenced node containing the vector.
   */
  private static tableToVector_(node: SemanticNode) {
    let vector = node.childNodes[0];
    vector.type = SemanticType.VECTOR;
    if (vector.childNodes.length === 1) {
      SemanticProcessor.tableToSquare_(node);
      return;
    }
    SemanticProcessor.binomialForm_(vector);
  }


  /**
   * Assigns a binomial role if a table consists of two lines only.
   * @param node The table node.
   */
  private static binomialForm_(node: SemanticNode) {
    if (SemanticPred.isBinomial(node)) {
      node.role = SemanticRole.BINOMIAL;
      node.childNodes[0].role = SemanticRole.BINOMIAL;
      node.childNodes[1].role = SemanticRole.BINOMIAL;
    }
  }


  /**
   * Assigns a specialised roles to a matrix node inside the given fenced node.
   * @param node The fenced node containing the matrix.
   */
  private static tableToMatrix_(node: SemanticNode) {
    let matrix = node.childNodes[0];
    matrix.type = SemanticType.MATRIX;
    if (matrix.childNodes && matrix.childNodes.length > 0 &&
        matrix.childNodes[0].childNodes &&
        matrix.childNodes.length === matrix.childNodes[0].childNodes.length) {
      SemanticProcessor.tableToSquare_(node);
      return;
    }
    if (matrix.childNodes && matrix.childNodes.length === 1) {
      matrix.role = SemanticRole.ROWVECTOR;
    }
  }


  /**
   * Assigns a role to a square, fenced table.
   * @param node The fenced node containing a square
   *     table.
   */
  private static tableToSquare_(node: SemanticNode) {
    let matrix = node.childNodes[0];
    if (SemanticPred.isNeutralFence(node)) {
      matrix.role = SemanticRole.DETERMINANT;
      return;
    }
    matrix.role = SemanticRole.SQUAREMATRIX;
  }


  /**
   * Cmoputes the role for the components of a matrix. It is either the role of
   * that matrix or its type.
   * @param node The matrix or vector node.
   * @return The role to be assigned to the components.
   */
  private static getComponentRoles_(node: SemanticNode): SemanticRole {
    let role = node.role;
    if (role && role !== SemanticRole.UNKNOWN) {
      return role;
    }
    return node.type.toLowerCase() as SemanticRole ||
        SemanticRole.UNKNOWN;
  }


  /**
   * Makes case node out of a table and a fence.
   * @param table The table containing the cases.
   * @param openFence The left delimiter of the case
   *     statement.
   * @return The cases node.
   */
  private static tableToCases_(table: SemanticNode, openFence: SemanticNode):
      SemanticNode {
    for (let i = 0, row; row = table.childNodes[i]; i++) {
      SemanticProcessor.assignRoleToRow_(row, SemanticRole.CASES);
    }
    table.type = SemanticType.CASES;
    table.appendContentNode(openFence);
    if (SemanticPred.tableIsMultiline(table)) {
      SemanticProcessor.binomialForm_(table);
    }
    return table;
  }


  // TODO: (Simons) Is this heuristic really what we want? Make it selectable?
  /**
   * Heuristic to rewrite a single fenced line in a table into a square matrix.
   * @param table The node to be rewritten.
   * @return The rewritten node.
   */
  private static rewriteFencedLine_(table: SemanticNode): SemanticNode {
    let line = table.childNodes[0];
    let fenced = table.childNodes[0].childNodes[0];
    let element = table.childNodes[0].childNodes[0].childNodes[0];
    fenced.parent = table.parent;
    table.parent = fenced;
    element.parent = line;
    fenced.childNodes = [table];
    line.childNodes = [element];
    return fenced;
  }


  /**
   * Converts a row that only contains one cell into a single line.
   * @param row The row to convert.
   * @param opt_role The new role for the line.
   */
  private static rowToLine_(row: SemanticNode, opt_role?: SemanticRole) {
    let role = opt_role || SemanticRole.UNKNOWN;
    if (SemanticPred.isType(row, SemanticType.ROW)) {
      row.type = SemanticType.LINE;
      row.role = role;
      if (row.childNodes.length === 1 &&
        SemanticPred.isType(row.childNodes[0], SemanticType.CELL)) {
        row.childNodes = row.childNodes[0].childNodes;
        row.childNodes.forEach(function(x) {
          x.parent = row;
        });
      }
    }
  }


  /**
   * Assign a row and its contained cells a new role value.
   * @param row The row to be updated.
   * @param role The new role for the row and its cells.
   */
  private static assignRoleToRow_(row: SemanticNode, role: SemanticRole) {
    if (SemanticPred.isType(row, SemanticType.LINE)) {
      row.role = role;
      return;
    }
    if (SemanticPred.isType(row, SemanticType.ROW)) {
      row.role = role;
      row.childNodes.forEach(function(cell) {
        if (SemanticPred.isType(cell, SemanticType.CELL)) {
          cell.role = role;
        }
      });
    }
  }


  /**
   * Constructs a closure that returns separators for an MathML mfenced
   * expression.
   * Separators in MathML are represented by a list and used up one by one
   * until the final element is used as the default.
   * Example: a b c d e  and separators [+,-,*]
   * would result in a + b - c * d * e.
   * @param separators String representing a list of mfenced separators.
   * @return A closure that returns the next separator
   * for an mfenced expression starting with the first node in nodes.
   */
  private static nextSeparatorFunction_(separators: string):
      (() => string)|null {
    let sepList: string[];
    if (separators) {
      // Mathjax does not expand empty separators.
      if (separators.match(/^\s+$/)) {
        return null;
      } else {
        sepList =
            separators.replace(/\s/g, '').split('').filter(function(x) {
              return x;
            });
      }
    } else {
      // When no separator is given MathML uses comma as default.
      sepList = [','];
    }

    return function() {
      if (sepList.length > 1) {
        return sepList.shift();
      }
      return sepList[0];
    };
  }


  /**
   * Compute the role of a number if it does not have one already.
   * @param node The semantic tree node.
   */
  private static numberRole_(node: SemanticNode) {
    if (node.role !== SemanticRole.UNKNOWN) {
      return;
    }
    let content = SemanticUtil.splitUnicode(node.textContent);
    let meaning = content.map(SemanticAttr.lookupMeaning);
    if (meaning.every(function(x) {
          return x.type === SemanticType.NUMBER &&
              x.role === SemanticRole.INTEGER ||
              x.type === SemanticType.PUNCTUATION &&
              x.role === SemanticRole.COMMA;
        })) {
      node.role = SemanticRole.INTEGER;
      if (content[0] === '0') {
        node.addAnnotation('general', 'basenumber');
      }
      return;
    }
    if (meaning.every(function(x) {
          return x.type === SemanticType.NUMBER &&
              x.role === SemanticRole.INTEGER ||
              x.type === SemanticType.PUNCTUATION;
        })) {
      node.role = SemanticRole.FLOAT;
      return;
    }
    node.role = SemanticRole.OTHERNUMBER;
  }


  /**
   * Updates the font of a node if a single font can be determined.
   * @param node The semantic tree node.
   */
  private static exprFont_(node: SemanticNode) {
    if (node.font !== SemanticFont.UNKNOWN) {
      return;
    }
    let content = SemanticUtil.splitUnicode(node.textContent);
    let meaning = content.map(SemanticAttr.lookupMeaning);
    let singleFont = meaning.reduce(function(prev, curr) {
      if (!prev || !curr.font || curr.font === SemanticFont.UNKNOWN ||
          curr.font === prev) {
        return prev;
      }
      if (prev === SemanticFont.UNKNOWN) {
        return curr.font;
      }
      return null;
    }, SemanticFont.UNKNOWN);
    if (singleFont) {
      node.font = singleFont;
    }
  }


  /**
   * Rewrites a fences partition to remove non-eligible embellished fences.
   * It rewrites all other fences into punctuations.
   * For eligibility see sre.SemanticPred.isElligibleEmbellishedFence
   * @param {{rel: !Array.<sre.SemanticNode>,
   *          comp: !Array.<!Array.<sre.SemanticNode>>}} partition A partition
   * for fences.
   * @return {{rel: !Array.<sre.SemanticNode>,
   *           comp: !Array.<!Array.<sre.SemanticNode>>}} The cleansed
   * partition.
   */
  private static purgeFences_(partition: {
    rel: SemanticNode[],
    comp: SemanticNode[][]
  }): {rel: SemanticNode[], comp: SemanticNode[][]} {
    let rel = partition.rel;
    let comp = partition.comp;
    let newRel = [];
    let newComp = [];

    while (rel.length > 0) {
      let currentRel = rel.shift();
      let currentComp = comp.shift();
      if (SemanticPred.isElligibleEmbellishedFence(currentRel)) {
        newRel.push(currentRel);
        newComp.push(currentComp);
        continue;
      }
      SemanticProcessor.fenceToPunct_(currentRel);
      currentComp.push(currentRel);
      currentComp = currentComp.concat(comp.shift());
      comp.unshift(currentComp);
    }
    newComp.push(comp.shift());
    return {rel: newRel, comp: newComp};
  }


  /**
   * Rewrites a fenced node by pulling some embellishments from fences to the
   * outside.
   * @param fenced The fenced node.
   * @return The rewritten node.
   */
  private static rewriteFencedNode_(fenced: SemanticNode): SemanticNode {
    let ofence = (fenced.contentNodes[0] as SemanticNode);
    let cfence = (fenced.contentNodes[1] as SemanticNode);
    let rewritten = SemanticProcessor.rewriteFence_(fenced, ofence);
    fenced.contentNodes[0] = rewritten.fence;
    rewritten = SemanticProcessor.rewriteFence_(rewritten.node, cfence);
    fenced.contentNodes[1] = rewritten.fence;
    fenced.contentNodes[0].parent = fenced;
    fenced.contentNodes[1].parent = fenced;
    rewritten.node.parent = null;
    return rewritten.node;
  }


  /**
   * Rewrites a fence by removing embellishments and putting them around the
   * node. The only embellishments that are not pulled out are overscore and
   * underscore.
   * @param node The original fenced node.
   * @param fence The fence node.
   * @return {{node: !sre.SemanticNode,
   *           fence: !sre.SemanticNode}} The rewritten node and fence.
   */
  // TODO (sorge) Maybe remove the superfluous MathML element.
  private static rewriteFence_(node: SemanticNode, fence: SemanticNode):
      {node: SemanticNode, fence: SemanticNode} {
    if (!fence.embellished) {
      return {node: node, fence: fence};
    }
    let newFence = (fence.childNodes[0] as SemanticNode);
    let rewritten = SemanticProcessor.rewriteFence_(node, newFence);
    if (SemanticPred.isType(fence, SemanticType.SUPERSCRIPT) ||
      SemanticPred.isType(fence, SemanticType.SUBSCRIPT) ||
      SemanticPred.isType(fence, SemanticType.TENSOR)) {
      // Fence is embellished and needs to be rewritten.
      if (!SemanticPred.isRole(fence, SemanticRole.SUBSUP)) {
        fence.role = node.role;
      }
      if (newFence !== rewritten.node) {
        fence.replaceChild(newFence, rewritten.node);
        newFence.parent = node;
      }
      SemanticProcessor.propagateFencePointer_(fence, newFence);
      return {node: fence, fence: rewritten.fence};
    }
    fence.replaceChild(newFence, rewritten.fence);
    if (fence.mathmlTree && fence.mathml.indexOf(fence.mathmlTree) === -1) {
      fence.mathml.push(fence.mathmlTree);
    }
    return {node: rewritten.node, fence: fence};
  }


  /**
   * Propagates the fence pointer, that is, the embellishing node links to the
   * actual fence it embellishes. If the link is valid on the new node, the old
   * node will point to that link as well. Note, that this fence might still be
   * embellished itself, e.g. with under or overscore.
   * @param oldNode The old embellished node.
   * @param newNode The new embellished node.
   */
  private static propagateFencePointer_(
      oldNode: SemanticNode, newNode: SemanticNode) {
    oldNode.fencePointer = newNode.fencePointer || newNode.id.toString();
    oldNode.embellished = null;
  }


  /**
   * Classifies table by columns and a given relation.
   * @param table The table node.
   * @param columns The columns.
   * @param relation The main relation to classify.
   * @param alternatives Alternative relations that are
   *     permitted in addition to the main relation.
   * @return True if classification was successful.
   */
  private static classifyByColumns_(
      table: SemanticNode, columns: SemanticNode[][], relation: SemanticRole,
      _alternatives?: SemanticRole[]): boolean {
    // TODO: For more complex systems, work with permutations/alternations of
    // column indices.
    let test1 = (x: SemanticNode) => SemanticProcessor.isPureRelation_(x, relation);
    let test2 = (x: SemanticNode) => SemanticProcessor.isEndRelation_(x, relation) ||
      SemanticProcessor.isPureRelation_(x, relation);
    let test3 = (x: SemanticNode) => SemanticProcessor.isEndRelation_(x, relation, true) ||
          SemanticProcessor.isPureRelation_(x, relation);

    if (columns.length === 3 &&
            SemanticProcessor.testColumns_(columns, 1, test1) ||
        columns.length === 2 &&
            (SemanticProcessor.testColumns_(columns, 1, test2) ||
             SemanticProcessor.testColumns_(columns, 0, test3))) {
      table.role = relation;
      return true;
    }
    return false;
  }


  /**
   * Check for a particular end relations, i.e., either a sole relation symbols
   * or the relation ends in an side.
   * @param node The node.
   * @param relation The relation to be tested.
   * @param opt_right From the right side?
   * @return True if the node is an end relation.
   */
  private static isEndRelation_(node: SemanticNode, relation: SemanticRole,
                                opt_right?: boolean): boolean {
    let position = opt_right ? node.childNodes.length - 1 : 0;
    return SemanticPred.isType(node, SemanticType.RELSEQ) &&
      SemanticPred.isRole(node, relation) &&
      SemanticPred.isType(node.childNodes[position], SemanticType.EMPTY);
  }


  /**
   * Check for a particular relations.
   * @param node The node.
   * @param relation The relation to be tested.
   * @return True if the node is an end relation.
   */
  private static isPureRelation_(node: SemanticNode, relation: SemanticRole):
      boolean {
    return SemanticPred.isType(node, SemanticType.RELATION) &&
        SemanticPred.isRole(node, relation);
  }


  /**
   * Computes columns from a table. Note that the columns are reduced, i.e.,
   * empty cells are simply omitted. Consequently, rows are not preserved, i.e.,
   * elements at the same index in different columns are not necessarily in the
   * same row in the original table!
   * @param table The table node.
   * @return The columns.
   */
  private static computeColumns_(table: SemanticNode): SemanticNode[][] {
    let columns = [];
    for (let i = 0, row; row = table.childNodes[i]; i++) {
      for (let j = 0, cell; cell = row.childNodes[j]; j++) {
        let column = columns[j];
        column ? columns[j].push(cell) : columns[j] = [cell];
      }
    }
    return columns;
  }


  /**
   * Test if all elements in the i-th column have the same property.
   * @param columns The columns.
   * @param index The column to be tested.
   * @param pred Predicate to test against.
   * @return True if all elements of the given column satisfy pred.
   */
  private static testColumns_(
      columns: SemanticNode[][], index: number,
      pred: (p1: SemanticNode) => boolean): boolean {
    let column = columns[index];
    return column ? column.some(function(cell) {
      return cell.childNodes.length &&
          pred((cell.childNodes[0] as SemanticNode));
    }) && column.every(function(cell) {
      return !cell.childNodes.length ||
          pred((cell.childNodes[0] as SemanticNode));
    }) :
                    false;
  }


  /**
   * Sets the node factory the processor is using.
   * @param factory New node factory.
   */
  public setNodeFactory(factory: SemanticNodeFactory) {
    SemanticProcessor.getInstance().factory_ = factory;
    SemanticHeuristics.factory = SemanticProcessor.getInstance().factory_;
  }


  /**
   * Getter for the node factory.
   * @return The node factory.
   */
  public getNodeFactory(): SemanticNodeFactory {
    return SemanticProcessor.getInstance().factory_;
  }


  /**
   * Processes an identifier node, with particular emphasis on font
   * disambiguation.
   * @param leaf The identifier node.
   * @param font The original mml font for the
   *     identifier. Could be empty if not font was given.
   * @param unit The class of the identifier which is important if it is
   *     a unit.
   * @return The semantic identifier node.
   */
  public identifierNode(leaf: SemanticNode, font: SemanticFont, unit: string):
      SemanticNode {
    if (unit === 'MathML-Unit') {
      leaf.type = SemanticType.IDENTIFIER;
      leaf.role = SemanticRole.UNIT;
    } else if (
        !font && leaf.textContent.length === 1 &&
        (leaf.role === SemanticRole.INTEGER ||
         leaf.role === SemanticRole.LATINLETTER ||
         leaf.role === SemanticRole.GREEKLETTER) &&
        leaf.font === SemanticFont.NORMAL) {
      // If single letter or single integer and font normal but no mathvariant
      // then this letter/number should be in italic font.
      leaf.font = SemanticFont.ITALIC;
      return SemanticHeuristics.run('simpleNamedFunction', leaf) as SemanticNode;
    }
    if (leaf.type === SemanticType.UNKNOWN) {
      leaf.type = SemanticType.IDENTIFIER;
    }
    SemanticProcessor.exprFont_(leaf);
    return SemanticHeuristics.run('simpleNamedFunction', leaf) as SemanticNode;
  }


  /**
   * Process a list of nodes and create a node for implicit operations,
   * currently assumed to be of multiplicative type. Determines mixed numbers
   * and unit elements.
   * @param nodes The operands.
   * @return The new branch node.
   */
  public implicitNode(nodes: SemanticNode[]): SemanticNode {
    nodes = SemanticProcessor.getInstance().getMixedNumbers_(nodes);
    nodes = SemanticProcessor.getInstance().combineUnits_(nodes);
    if (nodes.length === 1) {
      return nodes[0];
    }
    let node = SemanticProcessor.getInstance().implicitNode_(nodes);
    return SemanticHeuristics.run('combine_juxtaposition', node) as SemanticNode;
  }


  /**
   * Create an text node, keeping string notation correct.
   * @param leaf The text node.
   * @param type The type of the text node.
   * @return The new semantic text node.
   */
  public text(leaf: SemanticNode, type: string): SemanticNode {
    // TODO (simons): Here check if there is already a type or if we can compute
    // an interesting number role. Than use this.
    SemanticProcessor.exprFont_(leaf);
    leaf.type = SemanticType.TEXT;
    if (type === 'MS') {
      leaf.role = SemanticRole.STRING;
      return leaf;
    }
    if (type === 'MSPACE' || leaf.textContent.match(/^\s*$/)) {
      leaf.role = SemanticRole.SPACE;
      return leaf;
    }
    // TODO (simons): Process single element in text. E.g., check if a text
    //      element represents a function or a single letter, number, etc.
    return leaf;
  }


  /**
   * Processes a list of nodes, combining expressions by delimiters, tables,
   * punctuation sequences, function/big operator/integral applications to
   * generate a syntax tree with relation and operator precedence.
   *
   * This is the main heuristic to rewrite a flat row of terms into a meaningful
   * term tree.
   * @param nodes The list of nodes.
   * @return The root node of the syntax tree.
   */
  public row(nodes: SemanticNode[]): SemanticNode {
    nodes = nodes.filter(function(x) {
      return !SemanticPred.isType(x, SemanticType.EMPTY);
    });
    if (nodes.length === 0) {
      return SemanticProcessor.getInstance().factory_.makeEmptyNode();
    }
    nodes = SemanticProcessor.getInstance().getFencesInRow_(nodes);
    nodes = SemanticProcessor.getInstance().tablesInRow(nodes);
    nodes = SemanticProcessor.getInstance().getPunctuationInRow_(nodes);
    nodes = SemanticProcessor.getInstance().getTextInRow_(nodes);
    nodes = SemanticProcessor.getInstance().getFunctionsInRow_(nodes);
    return SemanticProcessor.getInstance().relationsInRow_(nodes);
  }


  /**
   * Creates a limit node from a sub/superscript or over/under node if the
   * central element is a big operator. Otherwise it creates the standard
   * elements.
   * @param mmlTag The tag name of the original node.
   * @param children The children of the
   *     original node.
   * @return The newly created limit node.
   */
  public limitNode(mmlTag: string, children: SemanticNode[]): SemanticNode {
    if (!children.length) {
      return SemanticProcessor.getInstance().factory_.makeEmptyNode();
    }
    let center = children[0];
    let type = SemanticType.UNKNOWN;
    if (!children[1]) {
      return center;
    }

    let result: BoundsType;
    if (SemanticPred.isLimitBase(center)) {
      result = SemanticProcessor.MML_TO_LIMIT_[mmlTag];
      let length = result.length;
      type = result.type;
      children = children.slice(0, result.length + 1);
      // Heuristic to deal with accents around limit functions/operators.
      if (length === 1 && SemanticPred.isAccent(children[1]) ||
          length === 2 && SemanticPred.isAccent(children[1]) &&
              SemanticPred.isAccent(children[2])) {
        result = SemanticProcessor.MML_TO_BOUNDS_[mmlTag];
        return SemanticProcessor.getInstance().accentNode_(
            center, children, result.type, result.length, result.accent);
      }
      if (length === 2) {
        if (SemanticPred.isAccent(children[1])) {
          center = SemanticProcessor.getInstance().accentNode_(
              center, [center, children[1]], {
                'MSUBSUP': SemanticType.SUBSCRIPT,
                'MUNDEROVER': SemanticType.UNDERSCORE
              }[mmlTag],
              1, true);
          return !children[2] ? center :
                                SemanticProcessor.getInstance().makeLimitNode_(
                                    center, [center, children[2]], null,
                                    SemanticType.LIMUPPER);
        }
        if (children[2] && SemanticPred.isAccent(children[2])) {
          center = SemanticProcessor.getInstance().accentNode_(
              center, [center, children[2]], {
                'MSUBSUP': SemanticType.SUPERSCRIPT,
                'MUNDEROVER': SemanticType.OVERSCORE
              }[mmlTag],
              1, true);
          return SemanticProcessor.getInstance().makeLimitNode_(
              center, [center, children[1]], null, SemanticType.LIMLOWER);
        }
        // Limit nodes only the number of children has to be restricted.
        if (!children[length]) {
          type = SemanticType.LIMLOWER;
        }
      }
      return SemanticProcessor.getInstance().makeLimitNode_(center, children, null, type);
    }
    // We either have an indexed, stacked or accented expression.
    result = SemanticProcessor.MML_TO_BOUNDS_[mmlTag];
    return SemanticProcessor.getInstance().accentNode_(
        center, children, result.type, result.length, result.accent);
  }


  // Improve table recognition, multiline alignments for pausing.
  // Maybe labels, interspersed text etc.
  /**
   * Rewrites tables into matrices or case statements in a list of nodes.
   * @param nodes List of nodes to rewrite.
   * @return The new list of nodes.
   */
  public tablesInRow(nodes: SemanticNode[]): SemanticNode[] {
    // First we process all matrices:
    let partition = SemanticUtil.partitionNodes(
        nodes, SemanticPred.tableIsMatrixOrVector);
    let result: SemanticNode[] = [];
    for (let i = 0, matrix; matrix = partition.rel[i]; i++) {
      result = result.concat(partition.comp.shift());
      result.push(SemanticProcessor.tableToMatrixOrVector_(matrix));
    }
    result = result.concat(partition.comp.shift());
    // Process the remaining tables for cases.
    partition = SemanticUtil.partitionNodes(
        result, SemanticPred.isTableOrMultiline);
    result = [];
    for (let i = 0, table; table = partition.rel[i]; i++) {
      let prevNodes = partition.comp.shift();
      if (SemanticPred.tableIsCases(table, prevNodes)) {
        SemanticProcessor.tableToCases_(
            table, (prevNodes.pop() as SemanticNode));
      }
      result = result.concat(prevNodes);
      result.push(table);
    }
    return result.concat(partition.comp.shift());
  }


  /**
   * Process an fenced node, effectively given in an mfenced style.
   * @param open Textual representation of the opening fence.
   * @param close Textual representation of the closing fence.
   * @param sepValue Textual representation of separators.
   * @param children List of already translated
   *     children.
   * @return The semantic node.
   */
  public mfenced(
      open: string|null, close: string|null, sepValue: string|null,
      children: SemanticNode[]): SemanticNode {
    if (sepValue && children.length > 0) {
      let separators = SemanticProcessor.nextSeparatorFunction_(sepValue);
      let newChildren = [children.shift()];
      children.forEach((child) => {
        newChildren.push(
            SemanticProcessor.getInstance().factory_.makeContentNode(
                separators()));
        newChildren.push(child);
      });
      children = newChildren;
    }
    // If both open and close are given, we assume those elements to be fences,
    // regardless of their initial semantic interpretation. However, if only one
    // of the fences is given we do not explicitly interfere with the semantic
    // interpretation. In other worde the mfence is ignored and the content is
    // interpreted as usual. The only effect of the mfence node here is that the
    // content will be interpreted into a single node.
    if (open && close) {
      return SemanticProcessor.getInstance().horizontalFencedNode_(
          SemanticProcessor.getInstance().factory_.makeContentNode(open),
          SemanticProcessor.getInstance().factory_.makeContentNode(close),
          children);
    }
    if (open) {
      children.unshift(
          SemanticProcessor.getInstance().factory_.makeContentNode(open));
    }
    if (close) {
      children.push(
          SemanticProcessor.getInstance().factory_.makeContentNode(close));
    }
    return SemanticProcessor.getInstance().row(children);
  }


  /**
   * Creates a fraction node with the appropriate role.
   * @param denom The denominator node.
   * @param enume The enumerator node.
   * @param linethickness The line thickness attribute value.
   * @param bevelled Is it a bevelled fraction?
   * @return The new fraction node.
   */
  public fractionLikeNode(
      denom: SemanticNode, enume: SemanticNode, linethickness: string,
      bevelled: boolean): SemanticNode {
    // return sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
    //     SemanticType.MULTILINE, [child0, child1], []);
    let node;
    if (!bevelled && SemanticUtil.isZeroLength(linethickness)) {
      let child0 = SemanticProcessor.getInstance().factory_.makeBranchNode(
          SemanticType.LINE, [denom], []);
      let child1 = SemanticProcessor.getInstance().factory_.makeBranchNode(
          SemanticType.LINE, [enume], []);
      node = SemanticProcessor.getInstance().factory_.makeBranchNode(
          SemanticType.MULTILINE, [child0, child1], []);
      SemanticProcessor.binomialForm_(node);
      SemanticProcessor.classifyMultiline(node);
      return node;
    } else {
      node = SemanticProcessor.getInstance().fractionNode_(denom, enume);
      if (bevelled) {
        node.addAnnotation('general', 'bevelled');
      }
      return node;
    }
  }


  /**
   * Create a tensor node.
   * @param base The base node.
   * @param lsub The left subscripts.
   * @param lsup The left superscripts.
   * @param rsub The right subscripts.
   * @param rsup The right superscripts.
   * @return The semantic tensor node.
   */
  public tensor(base: SemanticNode, lsub: SemanticNode[], lsup: SemanticNode[],
                rsub: SemanticNode[], rsup: SemanticNode[]): SemanticNode {
    let newNode = SemanticProcessor.getInstance().factory_.makeBranchNode(
        SemanticType.TENSOR,
        [
          base,
          SemanticProcessor.getInstance().scriptNode_(
              lsub, SemanticRole.LEFTSUB),
          SemanticProcessor.getInstance().scriptNode_(
              lsup, SemanticRole.LEFTSUPER),
          SemanticProcessor.getInstance().scriptNode_(
              rsub, SemanticRole.RIGHTSUB),
          SemanticProcessor.getInstance().scriptNode_(
              rsup, SemanticRole.RIGHTSUPER)
        ],
        []);
    newNode.role = base.role;
    newNode.embellished = SemanticPred.isEmbellished(base);
    return newNode;
  }


  /**
   * Creates a limit node from an original mmultiscript node, that only has
   * non-empty right sub and superscript elements.
   * @param base The base node.
   * @param sub The subscripts.
   * @param sup The superscripts.
   * @return The semantic tensor node.
   */
  public pseudoTensor(base: SemanticNode, sub: SemanticNode[],
                      sup: SemanticNode[]): SemanticNode {
    let isEmpty = (x: SemanticNode) => !SemanticPred.isType(x, SemanticType.EMPTY);
    let nonEmptySub = sub.filter(isEmpty).length;
    let nonEmptySup = sup.filter(isEmpty).length;
    if (!nonEmptySub && !nonEmptySup) {
      return base;
    }
    let mmlTag = nonEmptySub ? nonEmptySup ? 'MSUBSUP' : 'MSUB' : 'MSUP';
    let mmlchild = [base];
    if (nonEmptySub) {
      mmlchild.push(SemanticProcessor.getInstance().scriptNode_(
          sub, SemanticRole.RIGHTSUB, true));
    }
    if (nonEmptySup) {
      mmlchild.push(SemanticProcessor.getInstance().scriptNode_(
          sup, SemanticRole.RIGHTSUPER, true));
    }
    return SemanticProcessor.getInstance().limitNode(mmlTag, mmlchild);
  }


  /**
   * Cleans font names of potential MathJax prefixes.
   * @param font The font name.
   * @return The clean name.
   */
  public font(font: string): SemanticFont {
    let mathjaxFont = SemanticProcessor.MATHJAX_FONTS[font];
    return mathjaxFont ? mathjaxFont : (font as SemanticFont);
  }


  /**
   * Parses a proof node.
   * @param node The node.
   * @param semantics Association of semantic keys to values.
   * @param parse The
   *     current semantic parser for list of nodes.
   * @return The semantic node for the proof.
   */
  public proof(
      node: Element, semantics: {[key: string]: string},
      parse: (p1: Element[]) => SemanticNode[]): SemanticNode {
    if (!semantics['inference'] && !semantics['axiom']) {
      console.log('Noise');
    }
    // do some preprocessing!
    // Put in an invisible comma!
    // Axiom case!
    if (semantics['axiom']) {
      let cleaned = SemanticProcessor.getInstance().cleanInference(node.childNodes);
      let axiom = cleaned.length ?
          SemanticProcessor.getInstance().factory_.makeBranchNode(
              SemanticType.INFERENCE, parse(cleaned), []) :
          SemanticProcessor.getInstance().factory_.makeEmptyNode();
      axiom.role = SemanticRole.AXIOM;
      axiom.mathmlTree = node;
      return axiom;
    }
    let inference = SemanticProcessor.getInstance().inference(node, semantics, parse);
    if (semantics['proof']) {
      inference.role = SemanticRole.PROOF;
      inference.childNodes[0].role = SemanticRole.FINAL;
    }
    return inference;
  }


  /**
   * Parses a single inference node.
   * @param node The node.
   * @param semantics Association of semantic keys to values.
   * @param parse The
   *     current semantic parser for list of nodes.
   * @return The semantic node for the inference.
   */
  public inference(
      node: Element, semantics: {[key: string]: string},
      parse: (p1: Element[]) => SemanticNode[]): SemanticNode {
    if (semantics['inferenceRule']) {
      let formulas = SemanticProcessor.getInstance().getFormulas(node, [], parse);
      let inference = SemanticProcessor.getInstance().factory_.makeBranchNode(
          SemanticType.INFERENCE, [formulas.conclusion, formulas.premises],
          []);
      // Setting role
      return inference;
    }
    let label = semantics['labelledRule'];
    let children = DomUtil.toArray(node.childNodes);
    let content = [];
    if (label === 'left' || label === 'both') {
      content.push(
          SemanticProcessor.getInstance().getLabel(node, children, parse, SemanticRole.LEFT));
    }
    if (label === 'right' || label === 'both') {
      content.push(
          SemanticProcessor.getInstance().getLabel(node, children, parse, SemanticRole.RIGHT));
    }
    let formulas = SemanticProcessor.getInstance().getFormulas(node, children, parse);
    let inference = SemanticProcessor.getInstance().factory_.makeBranchNode(
        SemanticType.INFERENCE, [formulas.conclusion, formulas.premises],
        content);
    // Setting role
    inference.mathmlTree = node;
    return inference;
  }


  /**
   * Parses the label of an inference rule.
   * @param node The inference node.
   * @param children The node's children containing the label.
   * @param parse The
   *     current semantic parser for list of nodes.
   * @param side The side the label is on.
   * @return The semantic node for the label.
   */
  public getLabel(_node: Element, children: Element[],
      parse: (p1: Element[]) => SemanticNode[], side: string): SemanticNode {
    let label = SemanticProcessor.getInstance().findNestedRow(children, 'prooflabel', side);
    let sem = SemanticProcessor.getInstance().factory_.makeBranchNode(
        SemanticType.RULELABEL,
        parse(DomUtil.toArray(label.childNodes)), []);
    sem.role = (side as SemanticRole);
    sem.mathmlTree = label;
    return sem;
  }


  /**
   * Retrieves and parses premises and conclusion of an inference rule.
   * @param node The inference rule node.
   * @param children The node's children containing.
   * @param parse The
   *     current semantic parser for list of nodes.
   * @return A pair
   *       of conclusion and premises.
   */
  public getFormulas(
      node: Element, children: Element[],
      parse: (p1: Element[]) => SemanticNode[]):
      {conclusion: SemanticNode, premises: SemanticNode} {
    let inf =
        children.length ? SemanticProcessor.getInstance().findNestedRow(children, 'inferenceRule') : node;
    let up = SemanticProcessor.getSemantics(inf)['inferenceRule'] === 'up';
    let premRow = up ? inf.childNodes[1] : inf.childNodes[0];
    let concRow = up ? inf.childNodes[0] : inf.childNodes[1];
    let premTable = premRow.childNodes[0].childNodes[0];
    let topRow = DomUtil.toArray(premTable.childNodes[0].childNodes);
    let premNodes = [];
    let i = 1;
    for (let cell of topRow) {
      if (i % 2) {
        premNodes.push(cell.childNodes[0]);
      }
      i++;
    }
    let premises = parse(premNodes);
    let conclusion =
        parse(DomUtil.toArray(concRow.childNodes[0].childNodes))[0];
    let prem =
        SemanticProcessor.getInstance().factory_.makeBranchNode(SemanticType.PREMISES, premises, []);
    prem.mathmlTree = (premTable as Element);
    let conc = SemanticProcessor.getInstance().factory_.makeBranchNode(
        SemanticType.CONCLUSION, [conclusion], []);
    conc.mathmlTree = (concRow.childNodes[0].childNodes[0] as Element);
    return {conclusion: conc, premises: prem};
  }


  /**
   * Find a inference element nested in a row.
   * @param nodes A node list.
   * @param semantic A semantic key.
   * @param opt_value Optionally the semantic value.
   * @return The first element in that row that contains the semantic
   *     key (and has its value if the latter is given.)
   */
  public findNestedRow(nodes: Element[], semantic: string, opt_value?: string):
      Element {
    return SemanticProcessor.getInstance().findNestedRow_(nodes, semantic, 0, opt_value);
  }


  /**
   * Removes mspaces in a row.
   * @param nodes The list of nodes.
   * @return The list with all space elements removed.
   */
  public cleanInference(nodes: NodeList): Element[] {
    return DomUtil.toArray(nodes).filter(function(x) {
      return DomUtil.tagName(x) !== 'MSPACE';
    });
  }


  /**
   * Switches unknown to operator node and runs multioperator heuristics.
   * @param node The node to retype.
   * @return The node resulting from applying the heuristic.
   */
  public operatorNode(node: SemanticNode): SemanticNode {
    if (node.type === SemanticType.UNKNOWN) {
      node.type = SemanticType.OPERATOR;
    }
    return SemanticHeuristics.run('multioperator', node) as SemanticNode;
  }

  /**
   * Private constructor for singleton class.
   */
  private constructor() {
    this.factory_ = new SemanticNodeFactory();
    SemanticHeuristics.factory = this.factory_;
  }


  /**
   * Create a branching node for an implicit operation, currently assumed to be
   * of multiplicative type.
   * @param nodes The operands.
   * @return The new branch node.
   */
  private implicitNode_(nodes: SemanticNode[]): SemanticNode {
    let operators =
        SemanticProcessor.getInstance().factory_.makeMultipleContentNodes(
            nodes.length - 1, SemanticAttr.invisibleTimes());
    SemanticProcessor.matchSpaces_(nodes, operators);
    // For now we assume this is a multiplication using invisible times.
    let newNode = SemanticProcessor.getInstance().infixNode_(
        nodes, (operators[0] as SemanticNode));
    newNode.role = SemanticRole.IMPLICIT;
    operators.forEach(function(op) {
      op.parent = newNode;
    });
    newNode.contentNodes = operators;
    return newNode;
  }


  /**
   * Create a branching node for an infix operation.
   * @param children The operands.
   * @param opNode The operator.
   * @return The new branch node.
   */
  private infixNode_(children: SemanticNode[], opNode: SemanticNode):
      SemanticNode {
    let node = SemanticProcessor.getInstance().factory_.makeBranchNode(
        SemanticType.INFIXOP, children, [opNode],
        SemanticUtil.getEmbellishedInner(opNode).textContent);
    node.role = opNode.role;
    return SemanticHeuristics.run('propagateSimpleFunction', node) as SemanticNode;
  }


  /**
   * Finds mixed numbers that are explicitly given with invisible plus.
   * @param nodes The list of nodes.
   * @return The new list of nodes.
   */
  private explicitMixed_(nodes: SemanticNode[]): SemanticNode[] {
    let partition = SemanticUtil.partitionNodes(nodes, function(x) {
      return x.textContent === SemanticAttr.invisiblePlus();
    });
    if (!partition.rel.length) {
      return nodes;
    }
    let result: SemanticNode[] = [];
    for (let i = 0, rel; rel = partition.rel[i]; i++) {
      let prev = partition.comp[i];
      let next = partition.comp[i + 1];
      let last = prev.length - 1;
      if (prev[last] && next[0] &&
        SemanticPred.isType(prev[last], SemanticType.NUMBER) &&
        !SemanticPred.isRole(prev[last], SemanticRole.MIXED) &&
        SemanticPred.isType(next[0], SemanticType.FRACTION)) {
        let newNode = SemanticProcessor.getInstance().factory_.makeBranchNode(
            SemanticType.NUMBER, [prev[last], next[0]], []);
        newNode.role = SemanticRole.MIXED;
        result = result.concat(prev.slice(0, last));
        result.push(newNode);
        next.shift();
      } else {
        result = result.concat(prev);
        result.push(rel);
      }
    }
    return result.concat(partition.comp[partition.comp.length - 1]);
  }


  /**
   * Creates a node of the specified type by collapsing the given node list into
   * one content (thereby concatenating the content of each node into a single
   * content string) with the inner node as a child.
   * @param inner The inner node.
   * @param nodeList List of nodes.
   * @param type The new type of the node.
   * @return The new branch node.
   */
  private concatNode_(
      inner: SemanticNode, nodeList: SemanticNode[],
      type: SemanticType): SemanticNode {
    if (nodeList.length === 0) {
      return inner;
    }
    let content =
        nodeList
            .map(function(x) {
              return SemanticUtil.getEmbellishedInner(x).textContent;
            })
            .join(' ');
    let newNode = SemanticProcessor.getInstance().factory_.makeBranchNode(
        type, [inner], nodeList, content);
    if (nodeList.length > 1) {
      newNode.role = SemanticRole.MULTIOP;
    }
    return newNode;
  }


  // TODO: (Simons) Rewrite to group same operators.
  //       Currently the positive role is only given to the innermost single +
  //       prefix operator.
  /**
   * Wraps a node into prefix operators.
   * Example: + - a becomes (+ (- (a)))
   * Input: a  [+, -] ->  Output: content: '+ -', child: a
   * @param node The inner node.
   * @param prefixes Prefix operators
   * from the outermost to the innermost.
   * @return The new branch node.
   */
  private prefixNode_(node: SemanticNode, prefixes: SemanticNode[]):
      SemanticNode {
    let negatives = SemanticUtil.partitionNodes(
      prefixes, x => SemanticPred.isRole(x , SemanticRole.SUBTRACTION));
    let newNode = SemanticProcessor.getInstance().concatNode_(
        node, negatives.comp.pop(), SemanticType.PREFIXOP);
    if (newNode.contentNodes.length === 1 &&
        newNode.contentNodes[0].role === SemanticRole.ADDITION &&
        newNode.contentNodes[0].textContent === '+') {
      newNode.role = SemanticRole.POSITIVE;
    }
    while (negatives.rel.length > 0) {
      newNode = SemanticProcessor.getInstance().concatNode_(
          newNode, [negatives.rel.pop()], SemanticType.PREFIXOP);
      newNode.role = SemanticRole.NEGATIVE;
      newNode = SemanticProcessor.getInstance().concatNode_(
          newNode, negatives.comp.pop(), SemanticType.PREFIXOP);
    }
    return newNode;
  }


  /**
   * Wraps a node into postfix operators.
   * Example: a - + becomes (((a) -) +)
   * Input: a  [-, +] ->  Output: content: '- +', child: a
   * @param node The inner node.
   * @param postfixes Postfix operators from
   * innermost to outermost.
   * @return The new branch node.
   */
  private postfixNode_(node: SemanticNode, postfixes: SemanticNode[]):
      SemanticNode {
    if (!postfixes.length) {
      return node;
    }
    return SemanticProcessor.getInstance().concatNode_(
        node, postfixes, SemanticType.POSTFIXOP);
  }


  /**
   * Combines adjacent units in
   * @param nodes The list of nodes.
   * @return The new list of nodes.
   */
  private combineUnits_(nodes: SemanticNode[]): SemanticNode[] {
    let partition = SemanticUtil.partitionNodes(nodes, function(x) {
      return !SemanticPred.isRole(x, SemanticRole.UNIT);
    });
    if (nodes.length === partition.rel.length) {
      return partition.rel;
    }
    let result = [];
    let rel: SemanticNode;
    let last: SemanticNode;
    do {
      let comp = partition.comp.shift();
      rel = partition.rel.shift();
      let unitNode = null;
      last = result.pop();
      if (last) {
        if (!comp.length || !SemanticPred.isUnitCounter(last)) {
          result.push(last);
        } else {
          comp.unshift(last);
        }
      }
      if (comp.length === 1) {
        unitNode = comp.pop();
      }
      if (comp.length > 1) {
        // For now we assume this is a multiplication using invisible times.
        unitNode = SemanticProcessor.getInstance().implicitNode_(comp);
        unitNode.role = SemanticRole.UNIT;
      }
      if (unitNode) {
        result.push(unitNode);
      }
      if (rel) {
        result.push(rel);
      }
    } while (rel);
    return result;
  }


  /**
   * Finds mixed numbers in a list of single nodes. A mixed number is an integer
   * followed by a vulgar fraction.
   * @param nodes The list of nodes.
   * @return The new list of nodes.
   */
  // Change that to compute mixed fractions.
  private getMixedNumbers_(nodes: SemanticNode[]): SemanticNode[] {
    let partition = SemanticUtil.partitionNodes(nodes, function(x) {
      return SemanticPred.isType(x, SemanticType.FRACTION) &&
        SemanticPred.isRole(x, SemanticRole.VULGAR);
    });
    if (!partition.rel.length) {
      return nodes;
    }
    let result: SemanticNode[] = [];
    for (let i = 0, rel; rel = partition.rel[i]; i++) {
      let comp = partition.comp[i];
      let last = comp.length - 1;
      if (comp[last] &&
        SemanticPred.isType(comp[last], SemanticType.NUMBER) &&
        (SemanticPred.isRole(comp[last], SemanticRole.INTEGER) ||
          SemanticPred.isRole(comp[last], SemanticRole.FLOAT))) {
        let newNode = SemanticProcessor.getInstance().factory_.makeBranchNode(
            SemanticType.NUMBER, [comp[last], rel], []);
        newNode.role = SemanticRole.MIXED;
        result = result.concat(comp.slice(0, last));
        result.push(newNode);
      } else {
        result = result.concat(comp);
        result.push(rel);
      }
    }
    return result.concat(partition.comp[partition.comp.length - 1]);
  }


  /**
   * Separates text from math content and combines them into a punctuated node,
   * with dummy punctuation invisible comma.
   * @param nodes The list of nodes.
   * @return The new list of nodes.
   */
  private getTextInRow_(nodes: SemanticNode[]): SemanticNode[] {
    if (nodes.length <= 1) {
      return nodes;
    }
    let partition = SemanticUtil.partitionNodes(
        nodes, x => SemanticPred.isType(x , SemanticType.TEXT));
    if (partition.rel.length === 0) {
      return nodes;
    }
    let result = [];
    let nextComp = partition.comp[0];
    // TODO: Properly collate punctuation: Add start and end punctuation to
    // become
    //       the punctuation content of the punctuated node. Consider spaces
    //       separately.  This currently introduces too many invisible commas.
    if (nextComp.length > 0) {
      result.push(SemanticProcessor.getInstance().row(nextComp));
    }
    for (let i = 0, text; text = partition.rel[i]; i++) {
      result.push(text);
      nextComp = partition.comp[i + 1];
      if (nextComp.length > 0) {
        result.push(SemanticProcessor.getInstance().row(nextComp));
      }
    }
    return [SemanticProcessor.getInstance().dummyNode_(result)];
  }


  /**
   * Constructs a syntax tree with relation and operator precedence from a list
   * of nodes.
   * @param nodes The list of nodes.
   * @return The root node of the syntax tree.
   */
  private relationsInRow_(nodes: SemanticNode[]): SemanticNode {
    let partition =
        SemanticUtil.partitionNodes(nodes, SemanticPred.isRelation);
    let firstRel = partition.rel[0];

    if (!firstRel) {
      return SemanticProcessor.getInstance().operationsInRow_(nodes);
    }
    if (nodes.length === 1) {
      return nodes[0];
    }
    let children = partition.comp.map(
      SemanticProcessor.getInstance().operationsInRow_);
    let node: SemanticNode;
    if (partition.rel.some(function(x) {
          return !x.equals(firstRel);
        })) {
      node = SemanticProcessor.getInstance().factory_.makeBranchNode(
          SemanticType.MULTIREL, children, partition.rel);
      if (partition.rel.every(function(x) {
            return x.role === firstRel.role;
          })) {
        node.role = firstRel.role;
      }
      return node;
    }
    node = SemanticProcessor.getInstance().factory_.makeBranchNode(
        SemanticType.RELSEQ, children, partition.rel,
        SemanticUtil.getEmbellishedInner(firstRel).textContent);
    node.role = firstRel.role;
    return node;
  }


  /**
   * Constructs a syntax tree with operator precedence from a list nodes.
   * @param nodes The list of nodes.
   * @return The root node of the syntax tree.
   */
  private operationsInRow_(nodes: SemanticNode[]): SemanticNode {
    if (nodes.length === 0) {
      return SemanticProcessor.getInstance().factory_.makeEmptyNode();
    }
    // Get explicitly given mixed numbers
    nodes = SemanticProcessor.getInstance().explicitMixed_(nodes);

    if (nodes.length === 1) {
      return nodes[0];
    }

    let prefix = [];
    while (nodes.length > 0 && SemanticPred.isOperator(nodes[0])) {
      prefix.push(nodes.shift());
    }
    // Pathological case: only operators in row.
    if (nodes.length === 0) {
      return SemanticProcessor.getInstance().prefixNode_(prefix.pop(), prefix);
    }
    if (nodes.length === 1) {
      return SemanticProcessor.getInstance().prefixNode_(nodes[0], prefix);
    }

    // Deal with explicit juxtaposition
    nodes = SemanticHeuristics.run('convert_juxtaposition', nodes) as SemanticNode[];

    let split = SemanticUtil.sliceNodes(nodes, SemanticPred.isOperator);
    // At this point, we know that split.head is not empty!
    let node = SemanticProcessor.getInstance().prefixNode_(
        SemanticProcessor.getInstance().implicitNode(
            (split.head as SemanticNode[])),
        prefix);
    if (!split.div) {
      return node;
    }
    return SemanticProcessor.getInstance().operationsTree_(
        split.tail, node, split.div);
  }


  /**
   * Recursively constructs syntax tree with operator precedence from a list
   * nodes given a initial root node.
   * @param nodes The list of nodes.
   * @param root Initial tree.
   * @param lastop Last operator that has not been
   * processed yet.
   * @param opt_prefixes Operator nodes that
   * will become prefix operation (or postfix in case they come after last
   * operand).
   * @return The root node of the syntax tree.
   */
  private operationsTree_(
      nodes: SemanticNode[], root: SemanticNode, lastop: SemanticNode,
      opt_prefixes?: SemanticNode[]): SemanticNode {
    let prefixes = opt_prefixes || [];

    if (nodes.length === 0) {
      // Left over prefixes become postfixes.
      prefixes.unshift(lastop);
      if (root.type === SemanticType.INFIXOP) {
        // We assume prefixes bind stronger than postfixes.
        let node = SemanticProcessor.getInstance().postfixNode_(
            // Here we know that the childNodes are not empty!
            (root.childNodes.pop() as SemanticNode), prefixes);
        root.appendChild(node);
        return root;
      }
      return SemanticProcessor.getInstance().postfixNode_(root, prefixes);
    }

    let split = SemanticUtil.sliceNodes(nodes, SemanticPred.isOperator);

    if (split.head.length === 0) {
      prefixes.push(split.div);
      return SemanticProcessor.getInstance().operationsTree_(
          split.tail, root, lastop, prefixes);
    }

    let node = SemanticProcessor.getInstance().prefixNode_(
        SemanticProcessor.getInstance().implicitNode(split.head), prefixes);
    let newNode =
        SemanticProcessor.getInstance().appendOperand_(root, lastop, node);
    if (!split.div) {
      return newNode;
    }

    return SemanticProcessor.getInstance().operationsTree_(
        split.tail, newNode, split.div, []);
  }


  // TODO (sorge) The following four functions could be combined into
  // a single one. Currently it is clearer the way it is, though.
  /**
   * Appends an operand at the right place in an operator tree.
   * @param root The operator tree.
   * @param op The operator node.
   * @param node The node to be added.
   * @return The modified root node.
   */
  private appendOperand_(
      root: SemanticNode, op: SemanticNode, node: SemanticNode): SemanticNode {
    // In general our operator tree will have the form that additions and
    // subtractions are stacked, while multiplications are subordinate.
    if (root.type !== SemanticType.INFIXOP) {
      return SemanticProcessor.getInstance().infixNode_([root, node], op);
    }
    let division = SemanticProcessor.getInstance().appendDivisionOp_(root, op, node);
    if (division) {
      return division;
    }
    if (SemanticProcessor.getInstance().appendExistingOperator_(
            root, op, node)) {
      return root;
    }
    return op.role === SemanticRole.MULTIPLICATION ?
        SemanticProcessor.getInstance().appendMultiplicativeOp_(
            root, op, node) :
        SemanticProcessor.getInstance().appendAdditiveOp_(root, op, node);
  }


  /**
   * Appends an operand to a divsion operator.
   * @param root The root node.
   * @param op The operator node.
   * @param node The operand node to be added.
   * @return The modified root node or null.
   */
  private appendDivisionOp_(
      root: SemanticNode, op: SemanticNode, node: SemanticNode): SemanticNode {
    if (op.role === SemanticRole.DIVISION) {
      if (SemanticPred.isImplicit(root)) {
        return SemanticProcessor.getInstance().infixNode_([root, node], op);
      }
      return SemanticProcessor.getInstance().appendLastOperand_(root, op, node);
    }
    return root.role === SemanticRole.DIVISION ?
        SemanticProcessor.getInstance().infixNode_([root, node], op) :
        null;
  }


  /**
   * Appends an operand as rightmost child of an infix operator.
   * @param root The root node.
   * @param op The operator node.
   * @param node The operand node to be added.
   * @return The modified root node.
   */
  private appendLastOperand_(
      root: SemanticNode, op: SemanticNode, node: SemanticNode): SemanticNode {
    let lastRoot = root;
    let lastChild = root.childNodes[root.childNodes.length - 1];
    while (lastChild && lastChild.type === SemanticType.INFIXOP &&
           !SemanticPred.isImplicit(lastChild)) {
      lastRoot = lastChild;
      lastChild = lastRoot.childNodes[root.childNodes.length - 1];
    }
    let newNode = SemanticProcessor.getInstance().infixNode_(
        [lastRoot.childNodes.pop(), node], op);
    lastRoot.appendChild(newNode);
    return root;
  }


  /**
   * Appends a multiplicative operator and operand.
   * @param root The root node.
   * @param op The operator node.
   * @param node The operand node to be added.
   * @return The modified root node.
   */
  private appendMultiplicativeOp_(
      root: SemanticNode, op: SemanticNode, node: SemanticNode): SemanticNode {
    // This ensures that implicit nodes stay together, which is probably what
    // we want.
    if (SemanticPred.isImplicit(root)) {
      return SemanticProcessor.getInstance().infixNode_([root, node], op);
    }
    let lastRoot = root;
    let lastChild = root.childNodes[root.childNodes.length - 1];
    while (lastChild && lastChild.type === SemanticType.INFIXOP &&
           !SemanticPred.isImplicit(lastChild)) {
      lastRoot = lastChild;
      lastChild = lastRoot.childNodes[root.childNodes.length - 1];
    }
    let newNode = SemanticProcessor.getInstance().infixNode_(
        [lastRoot.childNodes.pop(), node], op);
    lastRoot.appendChild(newNode);
    return root;
  }


  /**
   * Appends an additive/substractive operator and operand.
   * @param root The old root node.
   * @param op The operator node.
   * @param node The operand node to be added.
   * @return The new root node.
   */
  private appendAdditiveOp_(
      root: SemanticNode, op: SemanticNode, node: SemanticNode): SemanticNode {
    return SemanticProcessor.getInstance().infixNode_([root, node], op);
  }


  /**
   * Adds an operand to an operator node if it is the continuation of an
   * existing operation.
   * @param root The root node.
   * @param op The operator node.
   * @param node The operand node to be added.
   * @return True if operator was successfully appended.
   */
  private appendExistingOperator_(
      root: SemanticNode, op: SemanticNode, node: SemanticNode): boolean {
    if (!root || root.type !== SemanticType.INFIXOP ||
        // This ensures that implicit nodes stay together, which is probably
        // what we want.
        SemanticPred.isImplicit(root)) {
      return false;
    }
    if (root.contentNodes[0].equals(op)) {
      root.appendContentNode(op);
      root.appendChild(node);
      return true;
    }
    return SemanticProcessor.getInstance().appendExistingOperator_(
        // Again, if this is an INFIXOP node, we know it has a child!
        (root.childNodes[root.childNodes.length - 1] as SemanticNode), op,
        node);
  }


  // TODO (sorge) The following procedure needs a rational reconstruction. It
  // contains a number of similar cases which should be combined.
  /**
   * Combines delimited expressions in a list of nodes.
   *
   * The basic idea of the heuristic is as follows:
   * 1. Opening and closing delimiters are matched regardless of the actual
   * shape of the fence. These are turned into fenced nodes.
   * 2. Neutral fences are matched only with neutral fences of the same shape.
   * 3. For a collection of unmatched neutral fences we try to get a maximum
   *    number of matching fences. E.g. || a|b || would be turned into a fenced
   *    node with fences || and content a|b.
   * 4. Any remaining unmatched delimiters are turned into punctuation nodes.
   * @param nodes The list of nodes.
   * @return The new list of nodes.
   */
  private getFencesInRow_(nodes: SemanticNode[]): SemanticNode[] {
    let partition =
        SemanticUtil.partitionNodes(nodes, SemanticPred.isFence);
    partition = SemanticProcessor.purgeFences_(partition);
    let felem = partition.comp.shift();
    return SemanticProcessor.getInstance().fences_(
        partition.rel, partition.comp, [], [felem]);
  }


  /**
   * Recursively processes a list of nodes and combines all the fenced
   * expressions into single nodes. It also processes singular fences, building
   * expressions that are only fenced left or right.
   * @param fences FIFO queue of fence nodes.
   * @param content FIFO queue content
   *     between fences.
   * @param openStack LIFO stack of open fences.
   * @param contentStack LIFO stack of
   *     content between fences yet to be processed.
   * @return A list of nodes with all fenced
   *     expressions processed.
   */
  private fences_(
      fences: SemanticNode[], content: SemanticNode[][],
      openStack: SemanticNode[],
      contentStack: SemanticNode[][]): SemanticNode[] {
    // Base case 1: Everything is used up.
    if (fences.length === 0 && openStack.length === 0) {
      return contentStack[0];
    }
    let openPred =
      (x: SemanticNode) => SemanticPred.isRole(x, SemanticRole.OPEN);
    // Base case 2: Only open and neutral fences are left on the stack.
    if (fences.length === 0) {
      // Basic idea:
      // - make punctuation nodes from open fences
      // - combine as many neutral fences as possible, if the are not separated
      // by
      //   open fences.
      // The idea is to allow for things like case statements etc. and not bury
      // them inside a neutral fenced expression.
      // 0. We process the list from left to right. Hence the first element on
      // the
      //    content stack are actually left most elements in the expression.
      // 1. Slice at open fence.
      // 2. On tail optimize for neutral fences.
      // 3. Repeat until fence stack is exhausted.
      // Push rightmost elements onto the result.
      let result = contentStack.shift();
      while (openStack.length > 0) {
        if (openPred(openStack[0])) {
          let firstOpen = openStack.shift();
          SemanticProcessor.fenceToPunct_(firstOpen);
          result.push(firstOpen);
        } else {
          let split = SemanticUtil.sliceNodes(openStack, openPred);
          let cutLength = split.head.length - 1;
          let innerNodes = SemanticProcessor.getInstance().neutralFences_(
              split.head, contentStack.slice(0, cutLength));
          contentStack = contentStack.slice(cutLength);
          // var rightContent = contentStack.shift();
          result.push.apply(result, innerNodes);
          // result.push.apply(result, rightContent);
          if (split.div) {
            split.tail.unshift(split.div);
          }
          openStack = split.tail;
        }
        result.push.apply(result, contentStack.shift());
      }
      return result;
    }
    let lastOpen = openStack[openStack.length - 1];
    let firstRole = fences[0].role;
    // General opening case.
    // Either we have an open fence.
    if (firstRole === SemanticRole.OPEN ||
        // Or we have a neutral fence that does not have a counter part.
        SemanticPred.isNeutralFence(fences[0]) &&
            !(lastOpen &&
              SemanticPred.compareNeutralFences(fences[0], lastOpen))) {
      openStack.push(fences.shift());
      let cont = content.shift();
      if (cont) {
        contentStack.push(cont);
      }
      // contentStack.push(content.shift());
      return SemanticProcessor.getInstance().fences_(
          fences, content, openStack, contentStack);
    }
    // General closing case.
    if (lastOpen &&
        // Closing fence for some opening fence.
        firstRole === SemanticRole.CLOSE &&
        lastOpen.role === SemanticRole.OPEN) {
      let fenced = SemanticProcessor.getInstance().horizontalFencedNode_(
          openStack.pop(), fences.shift(), contentStack.pop());
      contentStack.push(contentStack.pop().concat([fenced], content.shift()));
      return SemanticProcessor.getInstance().fences_(
          fences, content, openStack, contentStack);
    }
    if (lastOpen &&
        // Neutral fence with exact counter part.
        SemanticPred.compareNeutralFences(fences[0], lastOpen)) {
      if (!SemanticPred.elligibleLeftNeutral(lastOpen) ||
          !SemanticPred.elligibleRightNeutral(fences[0])) {
        openStack.push(fences.shift());
        let cont = content.shift();
        if (cont) {
          contentStack.push(cont);
        }
        return SemanticProcessor.getInstance().fences_(
            fences, content, openStack, contentStack);
      }
      let fenced = SemanticProcessor.getInstance().horizontalFencedNode_(
          openStack.pop(), fences.shift(), contentStack.pop());
      contentStack.push(contentStack.pop().concat([fenced], content.shift()));
      return SemanticProcessor.getInstance().fences_(
          fences, content, openStack, contentStack);
    }
    // Closing with a neutral fence on the stack.
    if (lastOpen && firstRole === SemanticRole.CLOSE &&
        SemanticPred.isNeutralFence(lastOpen) &&
        openStack.some(openPred)) {
      // Steps of the algorithm:
      // 1. Split list at right most opening bracket.
      // 2. Cut content list at corresponding length.
      // 3. Optimise the neutral fences.
      // 4. Make fenced node.
      // Careful, this reverses openStack!
      let split = SemanticUtil.sliceNodes(openStack, openPred, true);
      // We know that
      // (a) div & tail exist,
      // (b) all are combined in this step into a single fenced node,
      // (c) head is the new openStack,
      // (d) the new contentStack is remainder of contentStack + new fenced node
      // + shift of content.
      let rightContent = contentStack.pop();
      let cutLength = contentStack.length - split.tail.length + 1;
      let innerNodes = SemanticProcessor.getInstance().neutralFences_(
          split.tail, contentStack.slice(cutLength));
      contentStack = contentStack.slice(0, cutLength);
      let fenced = SemanticProcessor.getInstance().horizontalFencedNode_(
          split.div, fences.shift(),
          contentStack.pop().concat(innerNodes, rightContent));
      contentStack.push(contentStack.pop().concat([fenced], content.shift()));
      return SemanticProcessor.getInstance().fences_(
          fences, content, split.head, contentStack);
    }
    // Final Case: A singular closing fence.
    // We turn the fence into a punctuation.
    let fenced = fences.shift();
    SemanticProcessor.fenceToPunct_(fenced);
    contentStack.push(contentStack.pop().concat([fenced], content.shift()));
    return SemanticProcessor.getInstance().fences_(
        fences, content, openStack, contentStack);
  }


  // TODO (sorge) The following could be done with linear programming.
  /**
   * Trys to combine neutral fences as much as possible.
   * @param fences A list of neutral fences.
   * @param content Intermediate
   *     content. Observe that |content| = |fences| - 1
   * @return List of node with fully fenced
   *     nodes.
   */
  private neutralFences_(fences: SemanticNode[], content: SemanticNode[][]):
      SemanticNode[] {
    if (fences.length === 0) {
      return fences;
    }
    if (fences.length === 1) {
      SemanticProcessor.fenceToPunct_(fences[0]);
      return fences;
    }
    let firstFence = fences.shift();
    if (!SemanticPred.elligibleLeftNeutral(firstFence)) {
      SemanticProcessor.fenceToPunct_(firstFence);
      let restContent = content.shift();
      restContent.unshift(firstFence);
      return restContent.concat(
          SemanticProcessor.getInstance().neutralFences_(fences, content));
    }
    let split = SemanticUtil.sliceNodes(fences, function(x) {
      return SemanticPred.compareNeutralFences(x, firstFence);
    });
    if (!split.div) {
      SemanticProcessor.fenceToPunct_(firstFence);
      let restContent = content.shift();
      restContent.unshift(firstFence);
      return restContent.concat(
          SemanticProcessor.getInstance().neutralFences_(fences, content));
    }
    // If the first right neutral is not elligible we ignore it.
    if (!SemanticPred.elligibleRightNeutral(split.div)) {
      SemanticProcessor.fenceToPunct_(split.div);
      fences.unshift(firstFence);
      return SemanticProcessor.getInstance().neutralFences_(fences, content);
    }

    let newContent = SemanticProcessor.getInstance().combineFencedContent_(
        firstFence, split.div, split.head, content);
    if (split.tail.length > 0) {
      let leftContent = newContent.shift();
      let result = SemanticProcessor.getInstance().neutralFences_(
          split.tail, newContent);
      return leftContent.concat(result);
    }
    return newContent[0];
  }


  /**
   * Combines nodes framed by two matching fences using the given content.
   * Example: leftFence: [, rightFence: ], midFences: |, |
   *          content: c1, c2, c3, c4, ... cn
   *          return: [c1 | c2 | c3 ], c4, ... cn
   * @param leftFence The left fence.
   * @param rightFence The right fence.
   * @param midFences A list of intermediate
   *     fences.
   * @param content Intermediate
   *     content. Observe that |content| = |fences| - 1 + k where k >= 0 is the
   *     remainder.
   * @return List of content nodes
   *     where the first is the fully fenced node wrt. the given left and right
   *     fence.
   */
  private combineFencedContent_(
      leftFence: SemanticNode, rightFence: SemanticNode,
      midFences: SemanticNode[], content: SemanticNode[][]): SemanticNode[][] {
    if (midFences.length === 0) {
      let fenced = SemanticProcessor.getInstance().horizontalFencedNode_(
          leftFence, rightFence, content.shift());
      if (content.length > 0) {
        content[0].unshift(fenced);
      } else {
        content = [[fenced]];
      }
      return content;
    }

    let leftContent = content.shift();
    let cutLength = midFences.length - 1;
    let midContent = content.slice(0, cutLength);
    content = content.slice(cutLength);
    let rightContent = content.shift();
    let innerNodes =
        SemanticProcessor.getInstance().neutralFences_(midFences, midContent);
    leftContent.push.apply(leftContent, innerNodes);
    leftContent.push.apply(leftContent, rightContent);
    let fenced = SemanticProcessor.getInstance().horizontalFencedNode_(
        leftFence, rightFence, leftContent);
    if (content.length > 0) {
      content[0].unshift(fenced);
    } else {
      content = [[fenced]];
    }
    return content;
  }


  /**
   * Create a fenced node.
   * @param ofence Opening fence.
   * @param cfence Closing fence.
   * @param content The content
   *     between the fences.
   * @return The new node.
   */
  private horizontalFencedNode_(
      ofence: SemanticNode, cfence: SemanticNode,
      content: SemanticNode[]): SemanticNode {
    let childNode = SemanticProcessor.getInstance().row(content);
    let newNode = SemanticProcessor.getInstance().factory_.makeBranchNode(
        SemanticType.FENCED, [childNode], [ofence, cfence]);
    if (ofence.role === SemanticRole.OPEN) {
      // newNode.role = SemanticRole.LEFTRIGHT;
      SemanticProcessor.getInstance().classifyHorizontalFence_(newNode);
      newNode = SemanticHeuristics.run('propagateComposedFunction', newNode) as SemanticNode;
    } else {
      newNode.role = ofence.role;
    }
    newNode = SemanticHeuristics.run('detect_cycle', newNode) as SemanticNode;
    return SemanticProcessor.rewriteFencedNode_(newNode);
  }


  /**
   * Classifies a horizontally fenced semantic node, using heuristics to
   * determine certain set types, intervals etc.
   * @param node A fenced semantic node.
   */
  private classifyHorizontalFence_(node: SemanticNode) {
    node.role = SemanticRole.LEFTRIGHT;
    let children = node.childNodes;
    if (!SemanticPred.isSetNode(node) || children.length > 1) {
      return;
    }
    if (children.length === 0 || children[0].type === SemanticType.EMPTY) {
      node.role = SemanticRole.SETEMPTY;
      return;
    }
    let type = children[0].type;
    if (children.length === 1 &&
        SemanticPred.isSingletonSetContent(children[0])) {
      node.role = SemanticRole.SETSINGLE;
      return;
    }
    let role = children[0].role;
    if (type !== SemanticType.PUNCTUATED ||
        role !== SemanticRole.SEQUENCE) {
      return;
    }
    if (children[0].contentNodes[0].role === SemanticRole.COMMA) {
      node.role = SemanticRole.SETCOLLECT;
      return;
    }
    if (children[0].contentNodes.length === 1 &&
        (children[0].contentNodes[0].role === SemanticRole.VBAR ||
         children[0].contentNodes[0].role === SemanticRole.COLON)) {
      node.role = SemanticRole.SETEXT;
      SemanticProcessor.getInstance().setExtension_(node);
      return;
    }
    // TODO (sorge): Intervals after the Bra-Ket heuristic.
  }


  /**
   * Classifies content in the extension part of a set. Only works if we have
   * assured that a set is indeed and extended set.
   * @param set A semantic node representing an extended set.
   */
  private setExtension_(set: SemanticNode) {
    let extender = set.childNodes[0].childNodes[0];
    if (extender && extender.type === SemanticType.INFIXOP &&
        extender.contentNodes.length === 1 &&
        SemanticPred.isMembership(extender.contentNodes[0])) {
      extender.addAnnotation('set', 'intensional');
      extender.contentNodes[0].addAnnotation('set', 'intensional');
    }
  }


  /**
   * Combines sequences of punctuated expressions in a list of nodes.
   * @param nodes The list of nodes.
   * @return The new list of nodes.
   */
  private getPunctuationInRow_(nodes: SemanticNode[]): SemanticNode[] {
    // For now we just make a punctuation node with a particular role. This is
    // similar to an mrow. The only exception are ellipses, which we assume to
    // be in lieu of identifiers. In addition we keep the single punctuation
    // nodes as content.
    if (nodes.length <= 1) {
      return nodes;
    }
    let allowedType = (x: SemanticNode) => {
      let type = x.type;
      return type === 'punctuation' || type === 'text' || type === 'operator' ||
          type === 'relation';
    };
    // Partition with improved ellipses handling.
    let partition = SemanticUtil.partitionNodes(nodes, function(x) {
      if (!SemanticPred.isPunctuation(x)) {
        return false;
      }
      if (SemanticPred.isPunctuation(x) &&
        !SemanticPred.isRole(x, SemanticRole.ELLIPSIS)) {
        return true;
      }
      let index = nodes.indexOf(x);
      if (index === 0) {
        if (nodes[1] && allowedType(nodes[1])) {
          return false;
        }
        return true;
      }
      // We now know the previous element exists
      let prev = nodes[index - 1];
      if (index === nodes.length - 1) {
        if (allowedType(prev)) {
          return false;
        }
        return true;
      }
      // We now know the next element exists
      let next = nodes[index + 1];
      if (allowedType(prev) && allowedType(next)) {
        return false;
      }
      return true;
    });
    if (partition.rel.length === 0) {
      return nodes;
    }
    let newNodes = [];
    let firstComp = partition.comp.shift();
    if (firstComp.length > 0) {
      newNodes.push(SemanticProcessor.getInstance().row(firstComp));
    }
    let relCounter = 0;
    while (partition.comp.length > 0) {
      newNodes.push(partition.rel[relCounter++]);
      firstComp = partition.comp.shift();
      if (firstComp.length > 0) {
        newNodes.push(SemanticProcessor.getInstance().row(firstComp));
      }
    }
    return [SemanticProcessor.getInstance().punctuatedNode_(
        newNodes, partition.rel)];
  }


  // TODO: Refine roles to reflect same roles. Find sequences of punctuation
  // elements and separate those out or at least rewrite ellipses.
  /**
   * Create a punctuated node.
   * @param nodes List of all nodes separated
   * by punctuations.
   * @param punctuations List of all separating
   * punctations. Observe that punctations is a subset of nodes.
   */
  private punctuatedNode_(nodes: SemanticNode[], punctuations: SemanticNode[]):
      SemanticNode {
    let newNode = SemanticProcessor.getInstance().factory_.makeBranchNode(
        SemanticType.PUNCTUATED, nodes, punctuations);
    if (punctuations.length === nodes.length) {
      let firstRole = punctuations[0].role;
      if (firstRole !== SemanticRole.UNKNOWN &&
          punctuations.every(function(punct) {
            return punct.role === firstRole;
          })) {
        newNode.role = firstRole;
        return newNode;
      }
    }
    if (SemanticPred.singlePunctAtPosition(nodes, punctuations, 0)) {
      newNode.role = SemanticRole.STARTPUNCT;
    } else if (SemanticPred.singlePunctAtPosition(
                   nodes, punctuations, nodes.length - 1)) {
      newNode.role = SemanticRole.ENDPUNCT;
    } else if (punctuations.every(
        x => SemanticPred.isRole(x, SemanticRole.DUMMY))) {
      newNode.role = SemanticRole.TEXT;
    } else if (punctuations.every(
        x => SemanticPred.isRole(x, SemanticRole.SPACE))) {
      newNode.role = SemanticRole.SPACE;
    } else {
      newNode.role = SemanticRole.SEQUENCE;
    }
    return newNode;
  }


  /**
   * Create an dummy punctuated node.
   * @param children The child nodes to be
   *     separated by invisible comma.
   * @return The new node.
   */
  private dummyNode_(children: SemanticNode[]): SemanticNode {
    let commata =
        SemanticProcessor.getInstance().factory_.makeMultipleContentNodes(
            children.length - 1, SemanticAttr.invisibleComma());
    commata.forEach(function(comma) {
      comma.role = SemanticRole.DUMMY;
    });
    return SemanticProcessor.getInstance().punctuatedNode_(children, commata);
  }


  /**
   * Checks if a node is legal accent in a stacked node and sets the accent role
   * wrt. to the parent type.
   * @param node The semantic node.
   * @param type The semantic type of the parent node.
   * @return True if node is a legal accent.
   */
  private accentRole_(node: SemanticNode, type: SemanticType): boolean {
    if (!SemanticPred.isAccent(node)) {
      return false;
    }
    // We save the original role of the node as accent annotation.
    let content = node.textContent;
    let role = SemanticAttr.lookupSecondary('bar', content) ||
      SemanticAttr.lookupSecondary('tilde', content) || node.role;
    node.role = type === SemanticType.UNDERSCORE ?
        SemanticRole.UNDERACCENT :
        SemanticRole.OVERACCENT;
    node.addAnnotation('accent', role);
    return true;
  }


  /**
   * Creates an accent style node or sub/superscript depending on the given
   * type.
   * @param center The inner center node.
   * @param children All children, where center is first node.
   * @param type The new node type.
   * @param length The exact length for the given type. This is important
   *     in case not enough children exist, then the type has to be changed.
   * @param accent Is this an accent node?
   * @return The newly created node.
   */
  private accentNode_(
      center: SemanticNode, children: SemanticNode[], type: SemanticType,
      length: number, accent: boolean): SemanticNode {
    children = children.slice(0, length + 1);
    let child1 = (children[1] as SemanticNode);
    let child2 = children[2];
    let innerNode: SemanticNode;
    if (!accent && child2) {
      // For indexed we only have to nest if we have two children.
      innerNode = SemanticProcessor.getInstance().factory_.makeBranchNode(
          SemanticType.SUBSCRIPT, [center, child1], []);
      innerNode.role = SemanticRole.SUBSUP;
      children = [innerNode, child2];
      type = SemanticType.SUPERSCRIPT;
    }
    if (accent) {
      // Check if we have stacked or accented expressions (or mix).
      let underAccent = SemanticProcessor.getInstance().accentRole_(child1, type);
      if (child2) {
        let overAccent = SemanticProcessor.getInstance().accentRole_(child2, SemanticType.OVERSCORE);
        if (overAccent && !underAccent) {
          innerNode = SemanticProcessor.getInstance().factory_.makeBranchNode(
              SemanticType.OVERSCORE, [center, child2], []);
          children = [innerNode, child1];
          type = SemanticType.UNDERSCORE;
        } else {
          innerNode = SemanticProcessor.getInstance().factory_.makeBranchNode(
              SemanticType.UNDERSCORE, [center, child1], []);
          children = [innerNode, child2];
          type = SemanticType.OVERSCORE;
        }
        innerNode.role = SemanticRole.UNDEROVER;
      }
    }
    return SemanticProcessor.getInstance().makeLimitNode_(center, children, innerNode, type);
  }


  /**
   * Creates the actual limit node.
   * @param center The inner center node.
   * @param children All children, where center is
   *     first node.
   * @param innerNode The innermost node if it
   *     exists.
   * @param type The new node type.
   * @return The newly created limit node.
   */
  private makeLimitNode_(
      center: SemanticNode, children: SemanticNode[],
      innerNode: SemanticNode|undefined,
      type: SemanticType): SemanticNode {
    // These two conditions implement the limitboth heuristic, which works
    // before a new node is created.
    if (type === SemanticType.LIMUPPER &&
        center.type === SemanticType.LIMLOWER) {
      center.childNodes.push(children[1]);
      children[1].parent = center;
      center.type = SemanticType.LIMBOTH;
      return center;
    }
    if (type === SemanticType.LIMLOWER &&
        center.type === SemanticType.LIMUPPER) {
      center.childNodes.splice(1, -1, children[1]);
      children[1].parent = center;
      center.type = SemanticType.LIMBOTH;
      return center;
    }
    let newNode = SemanticProcessor.getInstance().factory_.makeBranchNode(
        type, children, []);
    let embellished = SemanticPred.isEmbellished(center);
    if (innerNode) {
      innerNode.embellished = embellished;
    }
    newNode.embellished = embellished;
    newNode.role = center.role;
    return newNode;
  }


  /**
   * Recursive method to accumulate function expressions.
   *
   * The idea is to process functions in a row from left to right combining them
   * with their arguments. Thereby we take the notion of a function rather
   * broadly as a functional expressions that consists of a prefix and some
   * arguments. In particular we distinguish four types of functional
   * expressions:
   * - integral: Integral expression.
   * - bigop: A big operator expression like a sum.
   * - prefix: A well defined prefix function such as sin, cos or a limit
   *           functions like lim, max.
   * - simple: An expression consisting of letters that are potentially a
   * function symbol. If we have an explicit function application symbol
   *           following the expression we turn into a prefix function.
   * Otherwise we decide heuristically if we could have a function application.
   * @param restNodes The remainder list of
   *     nodes.
   * @param opt_result The result node list.
   * @return The fully processed list.
   */
  private getFunctionsInRow_(
      restNodes: SemanticNode[], opt_result?: SemanticNode[]): SemanticNode[] {
    let result = opt_result || [];
    // Base case.
    if (restNodes.length === 0) {
      return result;
    }
    let firstNode = (restNodes.shift() as SemanticNode);
    let heuristic = SemanticProcessor.classifyFunction_(firstNode, restNodes);
    // First node is not a function node.
    if (!heuristic) {
      result.push(firstNode);
      return SemanticProcessor.getInstance().getFunctionsInRow_(
          restNodes, result);
    }
    // Combine functions in the rest of the row.
    let processedRest =
        SemanticProcessor.getInstance().getFunctionsInRow_(restNodes, []);
    let newRest = SemanticProcessor.getInstance().getFunctionArgs_(
        firstNode, processedRest, heuristic);
    return result.concat(newRest);
  }


  /**
   * Computes the arguments for a function from a list of nodes depending on the
   * given heuristic.
   * @param func A function node.
   * @param rest List of nodes to choose
   *     arguments from.
   * @param heuristic The heuristic to follow.
   * @return The function and the remainder of
   *     the rest list.
   */
  private getFunctionArgs_(func: SemanticNode, rest: SemanticNode[],
                           heuristic: string): SemanticNode[] {
    let partition;
    let arg;
    switch (heuristic) {
      case 'integral':
        let components = SemanticProcessor.getInstance().getIntegralArgs_(rest);
        if (!components.intvar && !components.integrand.length) {
          components.rest.unshift(func);
          return components.rest;
        }
        let integrand =
            SemanticProcessor.getInstance().row(components.integrand);
        let funcNode = SemanticProcessor.getInstance().integralNode_(
            func, integrand, components.intvar);
        components.rest.unshift(funcNode);
        return components.rest;
        break;
      case 'prefix':
        if (rest[0] && rest[0].type === SemanticType.FENCED) {
          // TODO: (MS2.3|simons) This needs to be made more robust!  Currently
          // we
          //       reset to eliminate sets. Once we include bra-ket heuristics,
          //       this might be incorrect.
          let arg = rest.shift();
          if (!SemanticPred.isNeutralFence(arg)) {
            arg.role = SemanticRole.LEFTRIGHT;
          }
          funcNode = SemanticProcessor.getInstance().functionNode_(
              func, (arg as SemanticNode));
          rest.unshift(funcNode);
          return rest;
        }
        partition = SemanticUtil.sliceNodes(
            rest, SemanticPred.isPrefixFunctionBoundary);
        if (!partition.head.length) {
          if (!partition.div ||
            !SemanticPred.isType(partition.div, SemanticType.APPL)) {
            rest.unshift(func);
            return rest;
          }
          arg = partition.div;
        } else {
          arg = SemanticProcessor.getInstance().row(partition.head);
          if (partition.div) {
            partition.tail.unshift(partition.div);
          }
        }
        // TODO: (simons) If we have a prefix/simple function or implicit with
        //       prefix/simple function children only (i.e., a function
        //       composition) then we combine them via a function
        //       composition. Function composition is currently implicit, but we
        //       might want to remember this a bit better.
        funcNode = SemanticProcessor.getInstance().functionNode_(func, arg);
        partition.tail.unshift(funcNode);
        return partition.tail;
        break;
      case 'bigop':
        partition =
            SemanticUtil.sliceNodes(rest, SemanticPred.isBigOpBoundary);
        if (!partition.head.length) {
          rest.unshift(func);
          return rest;
        }
        arg = SemanticProcessor.getInstance().row(partition.head);
        funcNode = SemanticProcessor.getInstance().bigOpNode_(func, arg);
        if (partition.div) {
          partition.tail.unshift(partition.div);
        }
        partition.tail.unshift(funcNode);
        return partition.tail;
        break;
      case 'simple':
      default:
        if (rest.length === 0) {
          return [func];
        }
        let firstArg = rest[0];
        if (firstArg.type === SemanticType.FENCED &&
            !SemanticPred.isNeutralFence(firstArg) &&
            SemanticPred.isSimpleFunctionScope(firstArg)) {
          // TODO: (MS2.3|simons) This needs to be made more robust!  Currently
          // we
          //       reset to eliminate sets. Once we include bra-ket heuristics,
          //       this might be incorrect.
          firstArg.role = SemanticRole.LEFTRIGHT;
          SemanticProcessor.propagateFunctionRole_(
              func, SemanticRole.SIMPLEFUNC);
          funcNode = SemanticProcessor.getInstance().functionNode_(
              func, (rest.shift() as SemanticNode));
          rest.unshift(funcNode);
          return rest;
        }
        rest.unshift(func);
        return rest;
        break;
    }
  }


  /**
   * Tail recursive function to obtain integral arguments.
   * @param nodes List of nodes to take
   * arguments from.
   * @param opt_args List of integral arguments.
   * @return {{integrand: !Array.<sre.SemanticNode>,
   *     intvar: sre.SemanticNode,
   *     rest: !Array.<sre.SemanticNode>}} Result split into integrand, integral
   * variable and the remaining elements.
   */
  private getIntegralArgs_(nodes: SemanticNode[], opt_args?: SemanticNode[]):
      {integrand: SemanticNode[], intvar: SemanticNode, rest: SemanticNode[]} {
    let args = opt_args || [];
    if (nodes.length === 0) {
      return {integrand: args, intvar: null, rest: nodes};
    }
    let firstNode = nodes[0];
    if (SemanticPred.isGeneralFunctionBoundary(firstNode)) {
      return {integrand: args, intvar: null, rest: nodes};
    }
    if (SemanticPred.isIntegralDxBoundarySingle(firstNode)) {
      firstNode.role = SemanticRole.INTEGRAL;
      return {integrand: args, intvar: firstNode, rest: nodes.slice(1)};
    }
    if (nodes[1] && SemanticPred.isIntegralDxBoundary(firstNode, nodes[1])) {
      let intvar = SemanticProcessor.getInstance().prefixNode_(
          (nodes[1] as SemanticNode), [firstNode]);
      intvar.role = SemanticRole.INTEGRAL;
      return {integrand: args, intvar: intvar, rest: nodes.slice(2)};
    }
    args.push(nodes.shift());
    return SemanticProcessor.getInstance().getIntegralArgs_(nodes, args);
  }


  /**
   * Create a function node.
   * @param func The function operator.
   * @param arg The argument.
   * @return The new function node.
   */
  private functionNode_(func: SemanticNode, arg: SemanticNode): SemanticNode {
    let applNode = SemanticProcessor.getInstance().factory_.makeContentNode(
        SemanticAttr.functionApplication());
    let appl = SemanticProcessor.getInstance().funcAppls[func.id];
    if (appl) {
      // TODO: Work out why we cannot just take appl.
      applNode.mathmlTree = appl.mathmlTree;
      applNode.mathml = appl.mathml;
      applNode.annotation = appl.annotation;
      applNode.attributes = appl.attributes;
      delete SemanticProcessor.getInstance().funcAppls[func.id];
    }
    applNode.type = SemanticType.PUNCTUATION;
    applNode.role = SemanticRole.APPLICATION;
    let funcop = SemanticProcessor.getFunctionOp_(func, function(node) {
      return SemanticPred.isType(node, SemanticType.FUNCTION) ||
        SemanticPred.isType(node, SemanticType.IDENTIFIER) &&
        SemanticPred.isRole(node, SemanticRole.SIMPLEFUNC);
    });
    return SemanticProcessor.getInstance().functionalNode_(
        SemanticType.APPL, [func, arg], funcop, [applNode]);
  }


  /**
   * Create a big operator node.
   * @param bigOp The big operator.
   * @param arg The argument.
   * @return The new big operator node.
   */
  private bigOpNode_(bigOp: SemanticNode, arg: SemanticNode): SemanticNode {
    let largeop = SemanticProcessor.getFunctionOp_(
      bigOp, x => SemanticPred.isType(x, SemanticType.LARGEOP));
    return SemanticProcessor.getInstance().functionalNode_(
      SemanticType.BIGOP, [bigOp, arg], largeop, []);
  }


  /**
   * Create an integral node. It has three children: integral, integrand and
   * integration variable. The latter two can be omitted.
   * @param integral The integral operator.
   * @param integrand The integrand.
   * @param intvar The integral variable.
   * @return The new integral node.
   */
  private integralNode_(
      integral: SemanticNode, integrand: SemanticNode,
      intvar: SemanticNode): SemanticNode {
    integrand =
        integrand || SemanticProcessor.getInstance().factory_.makeEmptyNode();
    intvar = intvar || SemanticProcessor.getInstance().factory_.makeEmptyNode();
    let largeop = SemanticProcessor.getFunctionOp_(
      integral, x => SemanticPred.isType(x, SemanticType.LARGEOP));
    return SemanticProcessor.getInstance().functionalNode_(
        SemanticType.INTEGRAL, [integral, integrand, intvar], largeop, []);
  }


  /**
   * Creates a functional node, i.e., integral, bigop, simple function. If the
   * operator is given, it takes care that th eoperator is contained as a
   * content node, and that the original parent pointer of the operator node is
   * retained.
   *
   * Example: Function application sin^2(x). The pointer from sin should remain
   * to the superscript node, although sin is given as a content node.
   * @param type The type of the node.
   * @param children The children of the
   *     functional node. The first child must be given is understood to be the
   *     functional operator.
   * @param operator The innermost operator (e.g., in the
   *     case of embellished functions or operators with limits).
   * @param content The list of additional
   *     content nodes.
   * @return The new functional node.
   */
  private functionalNode_(
      type: SemanticType, children: SemanticNode[],
      operator: SemanticNode|null, content: SemanticNode[]): SemanticNode {
    let funcop = children[0];
    let oldParent: SemanticNode;
    if (operator) {
      oldParent = operator.parent;
      content.push(operator);
    }
    let newNode = SemanticProcessor.getInstance().factory_.makeBranchNode(
        type, children, content);
    newNode.role = funcop.role;
    if (oldParent) {
      operator.parent = oldParent;
    }
    return newNode;
  }


  /**
   * Creates a fraction node with the appropriate role.
   * @param denom The denominator node.
   * @param enume The enumerator node.
   * @return The new fraction node.
   */
  private fractionNode_(denom: SemanticNode, enume: SemanticNode):
      SemanticNode {
    let newNode = SemanticProcessor.getInstance().factory_.makeBranchNode(
        SemanticType.FRACTION, [denom, enume], []);
    newNode.role = newNode.childNodes.every(function(x) {
      return SemanticPred.isType(x, SemanticType.NUMBER) &&
        SemanticPred.isRole(x, SemanticRole.INTEGER);
    }) ?
        SemanticRole.VULGAR :
        newNode.childNodes.every(SemanticPred.isPureUnit) ?
        SemanticRole.UNIT :
        SemanticRole.DIVISION;
    return SemanticHeuristics.run('propagateSimpleFunction', newNode) as SemanticNode;
  }


  /**
   * Creates a script node for a tensor, which is effectively a dummy
   * punctuation.
   * @param nodes A list of unprocessed nodes for
   *      that script.
   * @param role The role of the dummy node.
   * @param opt_noSingle Flag indicating whether role should be set
   *      for a single node.
   * @return The semantic tensor node.
   */
  private scriptNode_(
      nodes: SemanticNode[], role: SemanticRole,
    opt_noSingle?: boolean): SemanticNode {
    let newNode: SemanticNode;
    switch (nodes.length) {
      case 0:
        newNode = SemanticProcessor.getInstance().factory_.makeEmptyNode();
        break;
      case 1:
        newNode = nodes[0];
        if (opt_noSingle) {
          return newNode;
        }
        break;
      default:
        newNode = SemanticProcessor.getInstance().dummyNode_(nodes);
    }
    newNode.role = role;
    return newNode;
  }


  /**
   * Searches the given row of elements for first element with the given
   * semantic key or key/value pair if a value is not null. Ignores space
   * elements and descents at most 3 levels.
   * @param nodes A node list.
   * @param semantic A semantic key.
   * @param level The maximum level to search.
   * @param value Optionally the semantic value.
   * @return The first matching element in the row.
   */
  private findNestedRow_(
      nodes: Element[], semantic: string, level: number,
      value: string|undefined): Element {
    if (level > 3) {
      return null;
    }
    for (let i = 0, node; node = nodes[i]; i++) {
      let tag = DomUtil.tagName(node);
      if (tag !== 'MSPACE') {
        if (tag === 'MROW') {
          return SemanticProcessor.getInstance().findNestedRow_(
              DomUtil.toArray(node.childNodes), semantic, level + 1, value);
        }
        if (SemanticProcessor.findSemantics(node, semantic, value)) {
          return node;
        }
      }
    }
    return null;
  }
}
