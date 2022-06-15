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

import { Debugger } from '../common/debugger';
import Engine from '../common/engine';
import * as SemanticAttr from './semantic_attr';
import * as SemanticHeuristics from './semantic_heuristic_factory';
import {
  SemanticTreeHeuristic,
  SemanticMultiHeuristic
} from './semantic_heuristic';
import { SemanticRole, SemanticType } from './semantic_meaning';
import { SemanticNode } from './semantic_node';
import * as SemanticPred from './semantic_pred';
import SemanticProcessor from './semantic_processor';
import * as SemanticUtil from './semantic_util';

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
    (_node: SemanticNode) => Engine.getInstance().domain === 'clearspeak'
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
    (_node: SemanticNode) => Engine.getInstance().domain === 'clearspeak'
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
    (_node: SemanticNode) => Engine.getInstance().domain === 'clearspeak'
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
    // TODO: Combine with lines in numberRole_/exprFont_?
    const content = [...node.textContent];
    const meaning = content.map(SemanticAttr.lookupMeaning);
    const singleRole = meaning.reduce(function (prev, curr) {
      if (
        !prev ||
        !curr.role ||
        curr.role === SemanticRole.UNKNOWN ||
        curr.role === prev
      ) {
        return prev;
      }
      if (prev === SemanticRole.UNKNOWN) {
        return curr.role;
      }
      return null;
    }, SemanticRole.UNKNOWN);
    if (singleRole) {
      node.role = singleRole;
    }
  })
);

/**
 * Combines explicitly given juxtapositions.
 */
SemanticHeuristics.add(
  new SemanticMultiHeuristic('convert_juxtaposition', (nodes) => {
    let partition = SemanticUtil.partitionNodes(nodes, function (x) {
      return (
        x.textContent === SemanticAttr.invisibleTimes() &&
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
        x.textContent === SemanticAttr.invisibleTimes() &&
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
      Engine.getInstance().modality === 'braille' &&
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
  if (SemanticPred.isImplicitOp(op)) {
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
SemanticHeuristics.add(
  new SemanticMultiHeuristic('intvar_from_implicit', integralArgUnpack)
);

function integralArgUnpack(nodes: SemanticNode[]): void {
  const firstNode = nodes[0];
  if (SemanticPred.isImplicit(firstNode)) {
    let children = firstNode.childNodes;
    nodes.splice(0, 1, ...children)
  }
}
