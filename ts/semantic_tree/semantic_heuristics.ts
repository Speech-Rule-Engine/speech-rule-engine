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
 * @file Outsourcing of heuristics that the processor can call depending
 *     on the selected settings. This is effectively a namespace for optional
 *     heuristics.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Debugger } from '../common/debugger.js';
import { SemanticMap, NamedSymbol } from './semantic_attr.js';
import { SemanticHeuristics } from './semantic_heuristic_factory.js';
import {
  SemanticTreeHeuristic,
  SemanticMmlHeuristic,
  SemanticMultiHeuristic
} from './semantic_heuristic.js';
import { SemanticRole, SemanticType } from './semantic_meaning.js';
import { SemanticNode } from './semantic_node.js';
import * as SemanticPred from './semantic_pred.js';
import { SemanticProcessor } from './semantic_processor.js';
import * as SemanticUtil from './semantic_util.js';
import { SemanticSkeleton } from './semantic_skeleton.js';
import { MMLTAGS } from './semantic_util.js';

import * as DomUtil from '../common/dom_util.js';

/**
 * Recursively combines implicit nodes as much as possible for the given root
 * node of a subtree.
 */
SemanticHeuristics.add(
  new SemanticTreeHeuristic('combine_juxtaposition', combineJuxtaposition)
);

/**
 * Combines juxtapositions as much as possible.
 *
 * @param root The root of the juxtaposition tree.
 * @returns The updated node.
 */
function combineJuxtaposition(root: SemanticNode) {
  for (
    let i = root.childNodes.length - 1, child;
    (child = root.childNodes[i]);
    i--
  ) {
    if (!SemanticPred.isImplicitOp(child) || child.nobreaking) {
      continue;
    }
    root.childNodes.splice(i, 1, ...child.childNodes);
    root.contentNodes.splice(i, 0, ...child.contentNodes);
    child.childNodes.concat(child.contentNodes).forEach(function (x) {
      x.parent = root;
    });
    root.addMathmlNodes(child.mathml);
  }
  return root;
}

/**
 * Finds composed functions, i.e., simple functions that are either composed
 * with an infix operation or fraction and rewrites their role accordingly.
 * Currently restricted to Clearspeak!
 */
SemanticHeuristics.add(
  new SemanticTreeHeuristic(
    'propagateSimpleFunction',
    (node: SemanticNode) => {
      if (
        (node.type === SemanticType.INFIXOP ||
          node.type === SemanticType.FRACTION) &&
        node.childNodes.every(SemanticPred.isSimpleFunction)
      ) {
        node.role = SemanticRole.COMPFUNC;
      }
      return node;
    },
    (_node: SemanticNode) => SemanticHeuristics.options.domain === 'clearspeak'
  )
);

/**
 * Naive name based heuristic for identifying simple functions. This is used in
 * clearspeak only.
 */
SemanticHeuristics.add(
  new SemanticTreeHeuristic(
    'simpleNamedFunction',
    (node: SemanticNode) => {
      const specialFunctions = ['f', 'g', 'h', 'F', 'G', 'H'];
      if (
        node.role !== SemanticRole.UNIT &&
        specialFunctions.indexOf(node.textContent) !== -1
      ) {
        node.role = SemanticRole.SIMPLEFUNC;
      }
      return node;
    },
    (_node: SemanticNode) => SemanticHeuristics.options.domain === 'clearspeak'
  )
);

/**
 * Propagates the role of composed function to surrounding fences.
 * Currently restricted to Clearspeak!
 */
SemanticHeuristics.add(
  new SemanticTreeHeuristic(
    'propagateComposedFunction',
    (node: SemanticNode) => {
      if (
        node.type === SemanticType.FENCED &&
        node.childNodes[0].role === SemanticRole.COMPFUNC
      ) {
        node.role = SemanticRole.COMPFUNC;
      }
      return node;
    },
    (_node: SemanticNode) => SemanticHeuristics.options.domain === 'clearspeak'
  )
);

/**
 * Heuristic to compute a meaningful role for multi character operators (e.g.,
 * as in a++). If all operators have the same role (ignoring unknown) that role
 * is used.
 */
SemanticHeuristics.add(
  new SemanticTreeHeuristic('multioperator', (node: SemanticNode) => {
    if (node.role !== SemanticRole.UNKNOWN || node.textContent.length <= 1) {
      return;
    }
    SemanticProcessor.compSemantics(node, 'role', SemanticRole);
    SemanticProcessor.compSemantics(node, 'type', SemanticType);
  })
);

/**
 * Combines explicitly given juxtapositions.
 */
SemanticHeuristics.add(
  new SemanticMultiHeuristic('convert_juxtaposition', (nodes) => {
    let partition = SemanticUtil.partitionNodes(nodes, function (x) {
      return (
        x.textContent === NamedSymbol.invisibleTimes &&
        x.type === SemanticType.OPERATOR
      );
    });
    // Preprocessing pre and postfixes.
    partition = partition.rel.length
      ? juxtapositionPrePost(partition)
      : partition;
    // TODO: Move to Util
    nodes = partition.comp[0];
    for (
      let i = 1, c, r;
      (c = partition.comp[i]), (r = partition.rel[i - 1]);
      i++
    ) {
      nodes.push(r);
      nodes = nodes.concat(c);
    }
    partition = SemanticUtil.partitionNodes(nodes, function (x) {
      return (
        x.textContent === NamedSymbol.invisibleTimes &&
        (x.type === SemanticType.OPERATOR || x.type === SemanticType.INFIXOP)
      );
    });
    if (!partition.rel.length) {
      return nodes;
    }
    return recurseJuxtaposition(
      partition.comp.shift(),
      partition.rel,
      partition.comp
    );
  })
);

/**
 * Rewrites a simple function to a prefix function if it consists of multiple
 * letters. (Currently restricted to Braille!)
 */
SemanticHeuristics.add(
  new SemanticTreeHeuristic(
    'simple2prefix',
    (node: SemanticNode) => {
      if (
        node.textContent.length > 1 &&
        // TODO: Discuss this line!
        !node.textContent[0].match(/[A-Z]/)
      ) {
        node.role = SemanticRole.PREFIXFUNC;
      }
      return node;
    },
    (node: SemanticNode) =>
      SemanticHeuristics.options.modality === 'braille' &&
      node.type === SemanticType.IDENTIFIER
  )
);

/**
 *  Rewrites space separated lists of numbers into cycles.
 *  (Currently only used in Nemeth.)
 */
SemanticHeuristics.add(
  new SemanticTreeHeuristic(
    'detect_cycle',
    (node: SemanticNode) => {
      // TODO: Test for simple elements?
      node.type = SemanticType.MATRIX;
      node.role = SemanticRole.CYCLE;
      const row = node.childNodes[0];
      row.type = SemanticType.ROW;
      row.role = SemanticRole.CYCLE;
      row.textContent = '';
      row.contentNodes = [];
      return node;
    },
    (node: SemanticNode) =>
      node.type === SemanticType.FENCED &&
      node.childNodes[0].type === SemanticType.INFIXOP &&
      node.childNodes[0].role === SemanticRole.IMPLICIT &&
      node.childNodes[0].childNodes.every(function (x) {
        return x.type === SemanticType.NUMBER;
      }) &&
      node.childNodes[0].contentNodes.every(function (x) {
        return x.role === SemanticRole.SPACE;
      })
  )
);

/**
 * Rewrites a partition with respect to explicit juxtapositions into one where
 * all multiple operators are combined to post or prefix operators.
 *
 * @param partition The partition wrt. invisible
 *     times.
 * @returns The partition with collated pre/postfix
 *     operators.
 */
function juxtapositionPrePost(
  partition: SemanticUtil.Partition
): SemanticUtil.Partition {
  const rels = [];
  const comps = [];
  let next = partition.comp.shift();
  let rel = null;
  let collect = [];
  while (partition.comp.length) {
    collect = [];
    if (next.length) {
      if (rel) {
        rels.push(rel);
      }
      comps.push(next);
      rel = partition.rel.shift();
      next = partition.comp.shift();
      continue;
    }
    if (rel) {
      collect.push(rel);
    }
    while (!next.length && partition.comp.length) {
      next = partition.comp.shift();
      collect.push(partition.rel.shift());
    }
    rel = convertPrePost(collect, next, comps);
  }
  if (!collect.length && !next.length) {
    // A trailing rest exists that needs to be rewritten.
    collect.push(rel);
    convertPrePost(collect, next, comps);
  } else {
    rels.push(rel);
    comps.push(next);
  }
  return { rel: rels, comp: comps };
}

/**
 * Converts lists of invisible times operators into pre/postfix operatiors.
 *
 * @param collect The collected list of invisible
 *     times.
 * @param next The next component element.
 * @param comps The previous components.
 * @returns The operator that needs to be taken care of.
 */
function convertPrePost(
  collect: SemanticNode[],
  next: SemanticNode[],
  comps: SemanticNode[][]
): SemanticNode | null {
  let rel = null;
  if (!collect.length) {
    return rel;
  }
  const prev = comps[comps.length - 1];
  const prevExists = prev && prev.length;
  const nextExists = next && next.length;
  const processor = SemanticProcessor.getInstance();
  if (prevExists && nextExists) {
    if (
      next[0].type === SemanticType.INFIXOP &&
      next[0].role === SemanticRole.IMPLICIT
    ) {
      rel = collect.pop();
      prev.push(processor['postfixNode_'](prev.pop(), collect));
      return rel;
    }
    rel = collect.shift();
    const result = processor['prefixNode_'](next.shift(), collect);
    next.unshift(result);
    // next.unshift(processor['prefixNode_'](next.shift(), collect));
    return rel;
  }
  if (prevExists) {
    prev.push(processor['postfixNode_'](prev.pop(), collect));
    return rel;
  }
  if (nextExists) {
    next.unshift(processor['prefixNode_'](next.shift(), collect));
  }
  return rel;
}

/**
 * Heuristic to recursively combines a list of juxtaposition elements
 * expressions. Note that the heuristic assumes that all multiple occurrences
 * of invisible times elements are processed. So all we have here are single
 * operators or infix operators of role implicit.
 *
 * @param acc Elements to the left of the first
 *     implicit operation or application of an implicit operation. This serves
 *     as an accumulator during the recursion.
 * @param ops The list of juxtaposition operators
 *     or applications. That is, subtrees that are infix operations with
 *     inivisible times.
 * @param elements The list of elements
 *     between the operators in ops. These are lists of not yet combined
 *     elements.
 * @returns The resulting lists where implicit and
 *     explicitly given invisible times are combined as much as possible.
 */
function recurseJuxtaposition(
  acc: SemanticNode[],
  ops: SemanticNode[],
  elements: SemanticNode[][]
): SemanticNode[] {
  if (!ops.length) {
    return acc;
  }
  const left = acc.pop();
  const op = ops.shift();
  const first = elements.shift();
  if (
    op.type === SemanticType.INFIXOP &&
    (op.role === SemanticRole.IMPLICIT || op.role === SemanticRole.UNIT)
  ) {
    Debugger.getInstance().output('Juxta Heuristic Case 2');
    // In case we have a tree as operator, move on.
    const right = (left ? [left, op] : [op]).concat(first);
    return recurseJuxtaposition(acc.concat(right), ops, elements);
  }
  if (!left) {
    Debugger.getInstance().output('Juxta Heuristic Case 3');
    return recurseJuxtaposition([op].concat(first), ops, elements);
  }
  const right = first.shift();
  if (!right) {
    Debugger.getInstance().output('Juxta Heuristic Case 9');
    // Attach to the next operator, which must be an infix operation, As there
    // are no more double operators. Left also exists. Cases that left is an
    // implicit infix or simple.
    const newOp = SemanticHeuristics.factory.makeBranchNode(
      SemanticType.INFIXOP,
      [left, ops.shift()],
      [op],
      op.textContent
    );
    newOp.role = SemanticRole.IMPLICIT;
    SemanticHeuristics.run('combine_juxtaposition', newOp);
    ops.unshift(newOp);
    return recurseJuxtaposition(acc, ops, elements);
  }
  if (SemanticPred.isOperator(left) || SemanticPred.isOperator(right)) {
    Debugger.getInstance().output('Juxta Heuristic Case 4');
    return recurseJuxtaposition(
      acc.concat([left, op, right]).concat(first),
      ops,
      elements
    );
  }
  let result = null;
  if (SemanticPred.isImplicitOp(left) && SemanticPred.isImplicitOp(right)) {
    // Merge both left and right.
    Debugger.getInstance().output('Juxta Heuristic Case 5');
    left.contentNodes.push(op);
    left.contentNodes = left.contentNodes.concat(right.contentNodes);
    left.childNodes.push(right);
    left.childNodes = left.childNodes.concat(right.childNodes);
    right.childNodes.forEach((x) => (x.parent = left));
    op.parent = left;
    left.addMathmlNodes(op.mathml);
    left.addMathmlNodes(right.mathml);
    result = left;
  } else if (SemanticPred.isImplicitOp(left)) {
    // Add to the left one.
    Debugger.getInstance().output('Juxta Heuristic Case 6');
    left.contentNodes.push(op);
    left.childNodes.push(right);
    right.parent = left;
    op.parent = left;
    left.addMathmlNodes(op.mathml);
    left.addMathmlNodes(right.mathml);
    result = left;
  } else if (SemanticPred.isImplicitOp(right)) {
    // Add to the right one.
    Debugger.getInstance().output('Juxta Heuristic Case 7');
    right.contentNodes.unshift(op);
    right.childNodes.unshift(left);
    left.parent = right;
    op.parent = right;
    right.addMathmlNodes(op.mathml);
    right.addMathmlNodes(left.mathml);
    result = right;
  } else {
    // Create new implicit node.
    Debugger.getInstance().output('Juxta Heuristic Case 8');
    result = SemanticHeuristics.factory.makeBranchNode(
      SemanticType.INFIXOP,
      [left, right],
      [op],
      op.textContent
    );
    result.role = SemanticRole.IMPLICIT;
  }
  acc.push(result);
  return recurseJuxtaposition(acc.concat(first), ops, elements);
}

// New Integral Heuristics
/**
 * Heuristic to extract integral variables from elements that are considered to be
 * in elided products. This implies we ignore any invisible grouping.
 */
SemanticHeuristics.add(
  new SemanticMultiHeuristic(
    'intvar_from_implicit',
    implicitUnpack,
    (nodes: SemanticNode[]) => nodes[0] && SemanticPred.isImplicit(nodes[0])
  )
);

/**
 * Unpacks implicit nodes and pushes them to the front of the node list. Assumes
 * that the first node of the given list is an implicit multiplication.
 *
 * @param nodes The list of nodes.
 */
function implicitUnpack(nodes: SemanticNode[]) {
  const children = nodes[0].childNodes;
  nodes.splice(0, 1, ...children);
  nodes.forEach((x) => (x.parent = null));
}

/**
 * Heuristic to extract find an integral variable as enumerator a fraction.
 * Just changes the role to integral.
 */
SemanticHeuristics.add(
  new SemanticTreeHeuristic(
    'intvar_from_fraction',
    integralFractionArg,
    (node: SemanticNode) => {
      if (node.type !== SemanticType.INTEGRAL) return false;
      const [, integrand, intvar] = node.childNodes;
      return (
        intvar.type === SemanticType.EMPTY &&
        integrand.type === SemanticType.FRACTION
      );
    }
  )
);

/**
 * If the integrand is a fraction and the integral variable is the enumerator it
 * adjusts its role to integral an possibly rewrites it into a prefix operator.
 *
 * @param node The integral node.
 */
function integralFractionArg(node: SemanticNode): void {
  const integrand = node.childNodes[1];
  const enumerator = integrand.childNodes[0];
  if (SemanticPred.isIntegralDxBoundarySingle(enumerator)) {
    enumerator.role = SemanticRole.INTEGRAL;
    return;
  }
  if (!SemanticPred.isImplicit(enumerator)) return;
  const length = enumerator.childNodes.length;
  const first = enumerator.childNodes[length - 2];
  const second = enumerator.childNodes[length - 1];
  if (SemanticPred.isIntegralDxBoundarySingle(second)) {
    second.role = SemanticRole.INTEGRAL;
    return;
  }
  if (SemanticPred.isIntegralDxBoundary(first, second)) {
    const prefix = SemanticProcessor.getInstance()['prefixNode_'](second, [
      first
    ]);
    prefix.role = SemanticRole.INTEGRAL;
    if (length === 2) {
      integrand.childNodes[0] = prefix;
    } else {
      enumerator.childNodes.pop();
      enumerator.contentNodes.pop();
      enumerator.childNodes[length - 2] = prefix;
      prefix.parent = enumerator;
    }
  }
}

/**
 * Heuristic to rewrite semantic trees with subcases. Mainly for structure
 * coming from empheq package.
 */
SemanticHeuristics.add(
  new SemanticTreeHeuristic(
    'rewrite_subcases',
    rewriteSubcasesTable,
    (table: SemanticNode) => {
      // Here semantics would work best. But we do previews into top left and
      // top right element. If they appear to be created by empheq and the rest
      // column is empty we will rewrite.
      let left = true;
      let right = true;
      const topLeft = table.childNodes[0].childNodes[0];
      if (!topLeft) {
        return false;
      }
      if (!eligibleNode(topLeft.mathmlTree)) {
        left = false;
      } else {
        for (let i = 1, row; (row = table.childNodes[i]); i++) {
          if (row.childNodes[0].childNodes.length) {
            left = false;
            break;
          }
        }
      }
      if (left) {
        table.addAnnotation('Emph', 'left');
      }
      const topRight =
        table.childNodes[0].childNodes[
          table.childNodes[0].childNodes.length - 1
        ];
      if (!eligibleNode(topRight.mathmlTree)) {
        right = false;
      } else {
        const firstRow = table.childNodes[0].childNodes.length;
        for (let i = 1, row; (row = table.childNodes[i]); i++) {
          if (row.childNodes.length >= firstRow) {
            right = false;
            break;
          }
        }
      }
      if (right) {
        table.addAnnotation('Emph', 'right');
      }
      return left || right;
    }
  )
);

/**
 * Checks if a node is eligible for subcase rewriting.
 *
 * @param node The node to test for subcases.
 * @returns True if the node is the root of a subcases element.
 */
function eligibleNode(node: Element) {
  return (
    node.childNodes[0] &&
    node.childNodes[0].childNodes[0] &&
    DomUtil.tagName(node.childNodes[0] as Element) === MMLTAGS.MPADDED &&
    DomUtil.tagName(node.childNodes[0].childNodes[0] as Element) ===
      MMLTAGS.MPADDED &&
    DomUtil.tagName(
      node.childNodes[0].childNodes[
        node.childNodes[0].childNodes.length - 1
      ] as Element
    ) === MMLTAGS.MPHANTOM
  );
}

const rewritable: SemanticType[] = [
  SemanticType.PUNCTUATED,
  SemanticType.RELSEQ,
  SemanticType.MULTIREL,
  SemanticType.INFIXOP,
  SemanticType.PREFIXOP,
  SemanticType.POSTFIXOP
];

/**
 * Rewrites a table structure that contains subcases generated by Empheq package
 * output.
 *
 * @param table The table node.
 * @returns The rewritten semantic node.
 */
function rewriteSubcasesTable(table: SemanticNode) {
  table.addAnnotation('Emph', 'top');
  let row: SemanticNode[] = [];
  if (table.hasAnnotation('Emph', 'left')) {
    const topLeft = table.childNodes[0].childNodes[0].childNodes[0];
    const cells = rewriteCell(topLeft, true);
    cells.forEach((x) => x.addAnnotation('Emph', 'left'));
    row = row.concat(cells);
    for (let i = 0, line: SemanticNode; (line = table.childNodes[i]); i++) {
      line.childNodes.shift();
    }
  }
  row.push(table);
  if (table.hasAnnotation('Emph', 'right')) {
    const topRight =
      table.childNodes[0].childNodes[table.childNodes[0].childNodes.length - 1]
        .childNodes[0];
    const cells = rewriteCell(topRight);
    cells.forEach((x) => x.addAnnotation('Emph', 'left'));
    row = row.concat(cells);
    table.childNodes[0].childNodes.pop();
  }
  SemanticProcessor.tableToMultiline(table);
  const newNode = SemanticProcessor.getInstance().row(row);
  const annotation = table.annotation['Emph'];
  table.annotation['Emph'] = ['table'];
  annotation.forEach((x) => newNode.addAnnotation('Emph', x));
  return newNode;
}

/**
 * Rewrites a single cell in subcases statement.
 *
 * @param cell The cell node.
 * @param left Flag indicating if the cell has a left brace.
 * @returns The rewritten semantic node.
 */
function rewriteCell(cell: SemanticNode, left?: boolean) {
  if (!cell.childNodes.length) {
    rewriteFence(cell);
    return [cell];
  }
  let fence = null;
  if (
    cell.type === SemanticType.PUNCTUATED &&
    (left
      ? cell.role === SemanticRole.ENDPUNCT
      : cell.role === SemanticRole.STARTPUNCT)
  ) {
    const children = cell.childNodes;
    if (rewriteFence(children[left ? children.length - 1 : 0])) {
      cell = children[left ? 0 : children.length - 1];
      fence = children[left ? children.length - 1 : 0];
    }
  }
  if (rewritable.indexOf(cell.type) !== -1) {
    const children = cell.childNodes;
    rewriteFence(children[left ? children.length - 1 : 0]);
    const newNodes = SemanticSkeleton.combineContentChildren<SemanticNode>(
      cell.type,
      cell.role,
      cell.contentNodes,
      cell.childNodes
    );
    if (fence) {
      if (left) {
        newNodes.push(fence);
      } else {
        newNodes.unshift(fence);
      }
    }
    return newNodes;
  }
  return fence ? (left ? [cell, fence] : [fence, cell]) : [cell];
}

const PUNCT_TO_FENCE_: { [key: string]: SemanticRole } = {
  [SemanticRole.METRIC]: SemanticRole.METRIC,
  [SemanticRole.VBAR]: SemanticRole.NEUTRAL,
  [SemanticRole.OPENFENCE]: SemanticRole.OPEN,
  [SemanticRole.CLOSEFENCE]: SemanticRole.CLOSE
};

/**
 * Rewrites a fence node in a subcases statement.
 *
 * @param fence The fence node.
 * @returns True if the node was updated.
 */
function rewriteFence(fence: SemanticNode): boolean {
  if (fence.type !== SemanticType.PUNCTUATION) {
    return false;
  }
  const role = PUNCT_TO_FENCE_[fence.role];
  if (!role) {
    return false;
  }
  fence.role = role;
  fence.type = SemanticType.FENCE;
  fence.addAnnotation('Emph', 'fence');
  return true;
}

/**
 *  Tries to group ellipses and long bars.
 */
SemanticHeuristics.add(
  new SemanticMultiHeuristic(
    'ellipses',
    (nodes: SemanticNode[]) => {
      // TODO: Test for simple elements?
      const newNodes = [];
      let current = nodes.shift();
      while (current) {
        [current, nodes] = combineNodes(
          current,
          nodes,
          SemanticRole.FULLSTOP,
          SemanticRole.ELLIPSIS
        );
        [current, nodes] = combineNodes(current, nodes, SemanticRole.DASH);
        newNodes.push(current);
        current = nodes.shift();
      }
      return newNodes;
    },
    (nodes: SemanticNode[]) => nodes.length > 1
  )
);

/**
 * Combines a contiguous list of punctunation nodes into a single
 * punctuation. Eg. fullstops into ellipses.
 *
 * @param current The current node under investigation.
 * @param nodes The rest of the nodes, not yet checked.
 * @param src The role to look for.
 * @param target The role to rewrite to.
 * @returns The list of rewritten nodes.
 */
function combineNodes(
  current: SemanticNode,
  nodes: SemanticNode[],
  src: SemanticRole,
  target: SemanticRole = src
): [SemanticNode, SemanticNode[]] {
  const collect = [];
  while (current && current.role === src) {
    collect.push(current);
    current = nodes.shift();
  }
  if (!collect.length) {
    return [current, nodes];
  }
  if (current) {
    nodes.unshift(current);
  }
  return [
    collect.length === 1 ? collect[0] : combinedNodes(collect, target),
    nodes
  ];
}

/**
 * Combines a contiguous list of punctunation nodes into a single node.
 *
 * @param nodes The list of nodes to combine.
 * @param role The role of the new node.
 * @returns The new combined node.
 */
function combinedNodes(nodes: SemanticNode[], role: SemanticRole) {
  const node = SemanticHeuristics.factory.makeBranchNode(
    SemanticType.PUNCTUATION,
    nodes,
    []
  );
  node.role = role;
  return node;
}

/**
 * Rewrites simple operations with indexing style limits into large operators of
 * role sum.
 */
SemanticHeuristics.add(
  new SemanticMultiHeuristic(
    'op_with_limits',
    (nodes: SemanticNode[]) => {
      const center = nodes[0];
      center.type = SemanticType.LARGEOP;
      center.role = SemanticRole.SUM;
      return nodes;
    },
    (nodes: SemanticNode[]) => {
      return (
        (nodes[0].type === SemanticType.OPERATOR ||
          (nodes[0].type === SemanticType.IDENTIFIER &&
            nodes[0].attributes['texclass'] === 'OP'
          )) &&
        nodes
          .slice(1)
          .some(
            (node) =>
              node.type === SemanticType.RELSEQ ||
              node.type === SemanticType.MULTIREL ||
              (node.type === SemanticType.INFIXOP &&
                node.role === SemanticRole.ELEMENT) ||
              (node.type === SemanticType.PUNCTUATED &&
                node.role === SemanticRole.SEQUENCE)
          )
      );
    }
  )
);

/**
 *  Heuristic that tries to combine simple identifiers into composite names, in
 *  case they are known functions.
 */
SemanticHeuristics.add(
  new SemanticMmlHeuristic(
    'function_from_identifiers',
    (node: Element) => {
      const expr = DomUtil.toArray(node.childNodes)
        .map((x) => x.textContent.trim())
        .join('');
      const meaning = SemanticMap.Meaning.get(expr);
      if (meaning.type === SemanticType.UNKNOWN) {
        return node;
      }
      const snode = SemanticHeuristics.factory.makeLeafNode(
        expr,
        SemanticProcessor.getInstance().font(node.getAttribute('mathvariant'))
      );
      snode.mathmlTree = node;
      return snode;
    },
    (node: Element) => {
      const children = DomUtil.toArray(node.childNodes);
      if (children.length < 2) {
        return false;
      }
      return children.every(
        (child) =>
          DomUtil.tagName(child) === MMLTAGS.MI &&
          SemanticMap.Meaning.get(child.textContent.trim()).role ===
            SemanticRole.LATINLETTER
      );
    }
  )
);

/**
 * "Continential" Interval Heuristic:
 * We look for two square brakets, regardless of direction, enclosing a
 * punctuated pair.
 */
SemanticHeuristics.add(
  new SemanticMultiHeuristic(
    'bracketed_interval',
    (nodes: SemanticNode[]) => {
      const leftFence = nodes[0];
      const rightFence = nodes[1];
      const content = nodes.slice(2);
      const childNode = SemanticProcessor.getInstance().row(content);
      const fenced = SemanticHeuristics.factory.makeBranchNode(
        SemanticType.FENCED,
        [childNode],
        [leftFence, rightFence]
      );
      fenced.role = SemanticRole.INTERVAL;
      return fenced;
    },
    (nodes: SemanticNode[]) => {
      const leftFence = nodes[0];
      const rightFence = nodes[1];
      const content = nodes.slice(2);
      if (
        !(
          leftFence &&
          rightFence &&
          ((isCloseBrack(leftFence.textContent) &&
            (isOpenBrack(rightFence.textContent) ||
              isCloseBrack(rightFence.textContent))) ||
            (isOpenBrack(rightFence.textContent) &&
              (isOpenBrack(leftFence.textContent) ||
                isCloseBrack(leftFence.textContent))))
        )
      ) {
        return false;
      }
      if (
        content.length === 1 &&
        content[0].type === SemanticType.PUNCTUATED &&
        content[0].contentNodes.length === 1
      ) {
        return true;
      }
      const partition = SemanticUtil.partitionNodes(
        content,
        SemanticPred.isPunctuation
      );
      return !!(
        partition.rel.length === 1 &&
        partition.comp[0].length &&
        partition.comp[1].length
      );
    }
  )
);

/**
 * Identify opening brackets.
 *
 * @param str Input string to test.
 * @returns True if string is an opening bracket.
 */
function isOpenBrack(str: string) {
  return ['[', '［'].includes(str);
}

/**
 * Identify closing brackets.
 *
 * @param str Input string to test.
 * @returns True if string is an closing bracket.
 */
function isCloseBrack(str: string) {
  return [']', '］'].includes(str);
}

/**
 * Identify opening parentheses.
 *
 * @param str Input string to test.
 * @returns True if string is an opening parenthesis.
 */
function isOpenParen(str: string) {
  return ['(', '⁽', '₍'].includes(str);
}

/**
 * Identify closing parentheses.
 *
 * @param str Input string to test.
 * @returns True if string is an closing parenthesis.
 */
function isCloseParen(str: string) {
  return [')', '⁾', '₎'].includes(str);
}

/**
 * Identifies infinity.
 *
 * @param node The semantic node to test.
 * @returns True if the node is a positive or negative infinity.
 */
function isInfty(node: SemanticNode) {
  return (
    node.role === SemanticRole.INFTY ||
    (node.type === SemanticType.PREFIXOP &&
      node.childNodes[0].role === SemanticRole.INFTY)
  );
}

/**
 * "Continential" Interval Heuristic:
 * We look for two square brakets, regardless of direction, enclosing a
 * punctuated pair.
 */
SemanticHeuristics.add(
  new SemanticTreeHeuristic(
    'interval_heuristic',
    (node: SemanticNode) => {
      node.role = SemanticRole.INTERVAL;
      return node;
    },
    (node: SemanticNode) => {
      return isPotentialInterval(node);
    }
  )
);

/**
 * Check if a fenced expression is a potential interval.
 *
 * @param node The node to test.
 * @returns True if expression is potentially an interval.
 */
function isPotentialInterval(node: SemanticNode) {
  const child = node.childNodes[0];
  if (
    node.type !== SemanticType.FENCED ||
    // Check for comma separated pair!
    child?.type !== SemanticType.PUNCTUATED ||
    child?.childNodes.length !== 3 ||
    child?.contentNodes.length !== 1 ||
    child?.childNodes[1].role !== SemanticRole.COMMA
  ) {
    return false;
  }
  const first = node.childNodes[0].childNodes[0];
  const second = node.childNodes[0].childNodes[2];
  const left = node.contentNodes[0].textContent;
  const right = node.contentNodes[1].textContent;
  if (
    (isOpenBrack(left) && isCloseParen(right)) ||
    (isOpenParen(left) && isCloseBrack(right))
  ) {
    return true;
  }
  // if we have both brackets or parens and at least one infty.
  if (
    isOpenParen(left) &&
    isCloseParen(right) &&
    (isInfty(first) || isInfty(second))
  ) {
    return true;
  }
  return false;
}

// We go over every element in the
// If interval we recurse
// If leftright, we check if it is potential interval
// then we recurse
SemanticHeuristics.add(
  new SemanticTreeHeuristic(
    'propagateInterval',
    (node: SemanticNode) => {
      node.childNodes.forEach((child) => {
        if (isPotentialInterval(child)) {
          child.role = SemanticRole.INTERVAL;
        }
      });
      return node;
    },
    (node: SemanticNode) => {
      return SemanticPred.isMembership(node);
    }
  )
);

// The idea of the heuristic is to combine factors as much as possible instead
// of creating implicit operations. Concretely:
// * If an element is followed by a prefix operation, that operation is
//   turned into an infix operation using the prefix operator, with the
//   element becoming its new left operand. A sequence of elements preceding
//   the prefix operation is first combined into an implicit node.
// * If a postfix operation precedes an element, that operation is turned
//   into an infix operation using the postfix operator, with the element
//   becoming its new right operand. A sequence of elements following the
//   postfix operation is first combined into an implicit node.
// * If an element precedes or follows an infix operation, it is combined
//   with the first, respectively last, child of that infix operation: Simply
//   via implicit multiplication, unless that child is itself a prefix,
//   respectively postfix, operation, in which case it is treated as above.
SemanticHeuristics.add(
  new SemanticMultiHeuristic(
    'combine_implicit',
    (nodes: SemanticNode[]) => combineImplicit(nodes),
    (nodes: SemanticNode[]) => nodes.some(isCombinable)
  )
);

/**
 * Operator symbols that are invisible and merely mark juxtaposition (e.g.,
 * implicit multiplication or function application) rather than a genuine
 * prefix, postfix or infix operation.
 */
const INVISIBLE_OPERATORS = new Set<string>([
  NamedSymbol.invisibleTimes,
  NamedSymbol.invisiblePlus,
  NamedSymbol.invisibleComma,
  NamedSymbol.functionApplication
]);

/**
 * Checks whether none of a node's operator content is one of the invisible
 * juxtaposition markers.
 *
 * @param node The node to test.
 * @returns True if the node's operator content is entirely visible.
 */
function isVisibleOperator(node: SemanticNode): boolean {
  return node.contentNodes.every(
    (content) => !INVISIBLE_OPERATORS.has(content.textContent)
  );
}

/**
 * Checks whether a node is a "genuine" infix operation, i.e., excludes
 * implicit (juxtaposed) multiplications and unit products, which are handled
 * by their own dedicated heuristics (e.g., combine_juxtaposition) and are not
 * the kind of infix operation this heuristic should merge elements into.
 *
 * @param node The node to test.
 * @returns True if the node is an infix operation that is not implicit.
 */
function isRealInfix(node: SemanticNode): boolean {
  return (
    SemanticPred.isType(node, SemanticType.INFIXOP) &&
    !SemanticPred.isImplicit(node) &&
    isVisibleOperator(node)
  );
}

/**
 * Checks whether a node is a genuine (i.e., not merely juxtaposing) prefix
 * operation.
 *
 * @param node The node to test.
 * @returns True if the node is a prefix operation with visible operator.
 */
function isRealPrefix(node: SemanticNode): boolean {
  return (
    SemanticPred.isType(node, SemanticType.PREFIXOP) && isVisibleOperator(node)
  );
}

/**
 * Checks whether a node is a genuine (i.e., not merely juxtaposing) postfix
 * operation.
 *
 * @param node The node to test.
 * @returns True if the node is a postfix operation with visible operator.
 */
function isRealPostfix(node: SemanticNode): boolean {
  return (
    SemanticPred.isType(node, SemanticType.POSTFIXOP) &&
    isVisibleOperator(node)
  );
}

/**
 * Checks whether a node is a prefix, postfix or infix operation, i.e., one of
 * the operator-carrying structures the combine_implicit heuristic can merge
 * with neighbouring elements.
 *
 * @param node The node to test.
 * @returns True if the node is a prefix, postfix or infix operation.
 */
function isCombinable(node: SemanticNode): boolean {
  return isRealPrefix(node) || isRealPostfix(node) || isRealInfix(node);
}

/**
 * Turns a list of operator content nodes into a single operator node,
 * combining multiple operators into one multi-character operator if
 * necessary.
 *
 * @param content The list of operator content nodes.
 * @returns The single operator node representing the content.
 */
function combineImplicitOperator(content: SemanticNode[]): SemanticNode {
  return content.length === 1
    ? content[0]
    : SemanticProcessor.getInstance()['multiopNode_'](content);
}

/**
 * Turns a prefix operation into an infix operation by using its operator and
 * attaching the given node as the new left operand.
 * Example: left = a, node = prefixop(+, y) results in infixop(+, [a, y]).
 *
 * @param left The new left operand.
 * @param node The prefix operation.
 * @returns The new infix operation.
 */
function prefixToInfix(left: SemanticNode, node: SemanticNode): SemanticNode {
  const op = combineImplicitOperator(node.contentNodes);
  return SemanticProcessor.getInstance()['infixNode_'](
    [left, node.childNodes[0]],
    op
  );
}

/**
 * Turns a postfix operation into an infix operation by using its operator and
 * attaching the given node as the new right operand.
 * Example: node = postfixop(z, +), right = b results in infixop(+, [z, b]).
 *
 * @param node The postfix operation.
 * @param right The new right operand.
 * @returns The new infix operation.
 */
function postfixToInfix(node: SemanticNode, right: SemanticNode): SemanticNode {
  const op = combineImplicitOperator(node.contentNodes);
  return SemanticProcessor.getInstance()['infixNode_'](
    [node.childNodes[0], right],
    op
  );
}

/**
 * Inserts a new node at the first or last position of an infix operation.
 * Flattens the new node into the infix operation's operator/operand lists if
 * it is itself an infix operation with the exact same, single operator as
 * the one adjoining the given position. Otherwise the new node simply
 * becomes the new first/last child.
 *
 * @param outer The infix operation to extend.
 * @param position Whether to insert at the 'first' or 'last' position.
 * @param node The new node to insert.
 */
function insertIntoInfix(
  outer: SemanticNode,
  position: 'first' | 'last',
  node: SemanticNode
) {
  const atStart = position === 'first';
  const boundary = atStart
    ? outer.contentNodes[0]
    : outer.contentNodes[outer.contentNodes.length - 1];
  if (
    SemanticPred.isType(node, SemanticType.INFIXOP) &&
    node.contentNodes.length === 1 &&
    node.contentNodes[0].equals(boundary)
  ) {
    outer.contentNodes = atStart
      ? node.contentNodes.concat(outer.contentNodes)
      : outer.contentNodes.concat(node.contentNodes);
    outer.childNodes = atStart
      ? node.childNodes.concat(outer.childNodes.slice(1))
      : outer.childNodes.slice(0, -1).concat(node.childNodes);
  } else if (atStart) {
    outer.childNodes[0] = node;
  } else {
    outer.childNodes[outer.childNodes.length - 1] = node;
  }
  outer.childNodes.forEach((x) => (x.parent = outer));
  outer.contentNodes.forEach((x) => (x.parent = outer));
  outer.addMathmlNodes(node.mathml);
}

/**
 * Combines an element with the infix operation that follows it: If the
 * infix operation's first child is a prefix operation, it is turned into an
 * infix operation using that prefix's operator (recursing into the same
 * rule that handles an element followed by a prefix operation). Otherwise
 * the element is simply combined with the first child via implicit
 * multiplication.
 *
 * @param left The preceding element.
 * @param infix The infix operation.
 */
function mergeLeft(left: SemanticNode, infix: SemanticNode) {
  const first = infix.childNodes[0];
  const replacement = isRealPrefix(first)
    ? prefixToInfix(left, first)
    : SemanticProcessor.getInstance().implicitNode([left, first]);
  insertIntoInfix(infix, 'first', replacement);
}

/**
 * Combines an element with the infix operation that precedes it: If the
 * infix operation's last child is a postfix operation, it is turned into an
 * infix operation using that postfix's operator (recursing into the same
 * rule that handles a postfix operation followed by an element). Otherwise
 * the element is simply combined with the last child via implicit
 * multiplication.
 *
 * @param infix The infix operation.
 * @param right The following element.
 */
function mergeRight(infix: SemanticNode, right: SemanticNode) {
  const last = infix.childNodes[infix.childNodes.length - 1];
  const replacement = isRealPostfix(last)
    ? postfixToInfix(last, right)
    : SemanticProcessor.getInstance().implicitNode([last, right]);
  insertIntoInfix(infix, 'last', replacement);
}

/**
 * Collects and combines a contiguous run of elements into a single node,
 * using implicit multiplication if there is more than one.
 *
 * @param elements The list of elements.
 * @returns The combined node, or null if the list was empty.
 */
function collapseRun(elements: SemanticNode[]): SemanticNode | null {
  if (!elements.length) return null;
  return elements.length === 1
    ? elements[0]
    : SemanticProcessor.getInstance().implicitNode(elements);
}

/**
 * Combines factors as much as possible instead of leaving them to be turned
 * into implicit (multiplicative) operations, by merging elements into
 * neighbouring prefix, postfix and infix operations as described above.
 * Rewrites the given list of nodes destructively.
 *
 * @param nodes The list of nodes.
 */
function combineImplicit(nodes: SemanticNode[]) {
  const result: SemanticNode[] = [];
  let run: SemanticNode[] = [];

  const flushRun = (): SemanticNode | null => {
    const combined = collapseRun(run);
    run = [];
    return combined;
  };

  const collectFollowing = (from: number): [SemanticNode[], number] => {
    const elements: SemanticNode[] = [];
    let j = from;
    while (j < nodes.length && !isCombinable(nodes[j])) {
      elements.push(nodes[j]);
      j++;
    }
    return [elements, j];
  };

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if (isRealPrefix(node)) {
      const left = flushRun();
      result.push(left ? prefixToInfix(left, node) : node);
      continue;
    }

    if (isRealPostfix(node)) {
      // Elements preceding a postfix operation remain ordinary factors.
      const left = flushRun();
      if (left) result.push(left);
      const [following, next] = collectFollowing(i + 1);
      const right = collapseRun(following);
      result.push(right ? postfixToInfix(node, right) : node);
      i = next - 1;
      continue;
    }

    if (isRealInfix(node)) {
      const left = flushRun();
      if (left) {
        mergeLeft(left, node);
      }
      const [following, next] = collectFollowing(i + 1);
      const right = collapseRun(following);
      if (right) {
        mergeRight(node, right);
      }
      result.push(node);
      i = next - 1;
      continue;
    }

    run.push(node);
  }

  const trailing = flushRun();
  if (trailing) {
    result.push(trailing);
  }

  nodes.splice(0, nodes.length, ...result);
}
