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
 * @fileoverview Outsourcing of heuristics that the processor can call depending
 *     on the selected settings. This is effectively a namespace for optional
 *     heuristics.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {SemanticAttr} from './semantic_attr';
import {SemanticNode} from './semantic_node';
import {SemanticNodeFactory} from './semantic_node_factory';
import * as SemanticPred from './semantic_pred';



export class SemanticHeuristics {
  factory: SemanticNodeFactory = null;


  heuristics: {[key: string]: SemanticHeuristic} = {};


  /**
   * Heuristics that are run by default.
   */
  flags: {[key: string]: boolean} = {
    combine_juxtaposition: true,
    convert_juxtaposition: true,
    multioperator: true
  };

  /**
   * Heuristics that are permanently switched off.
   */
  blacklist: {[key: string]: boolean} = {};
  constructor() {}


  /**
   * Register a heuristic with the handler.
   * @param name The name of the heuristic.
   * @param heuristic The heuristic.
   */
  static add(name: string, heuristic: SemanticHeuristic) {
    SemanticHeuristics.getInstance().heuristics[name] = heuristic;
    // Registered switched off, unless it is set by default.
    if (!SemanticHeuristics.getInstance().flags[name]) {
      SemanticHeuristics.getInstance().flags[name] = false;
    }
  }


  /**
   * Runs a heuristic if its predicate evaluates to true.
   * @param name The name of the heuristic.
   * @param root The root node of the subtree.
   * @param opt_alternative An
   *       optional method to run if the heuristic is not applicable.
   * @return The resulting subtree.
   */
  static run(
      name: string, root: SemanticNode,
      opt_alternative?: (p1: SemanticNode) => SemanticNode): SemanticNode {
    let heuristic = SemanticHeuristics.lookup(name);
    return heuristic && !SemanticHeuristics.getInstance().blacklist[name] &&
            (SemanticHeuristics.getInstance().flags[name] ||
             heuristic.applicable(root)) ?
        heuristic.apply(root) :
        opt_alternative ? opt_alternative(root) : root;
  }


  /**
   * Runs a multi heuristic if its predicate evaluates to true.
   * @param name The name of the heuristic.
   * @param root The list of root nodes.
   * @param opt_alternative An optional method to run if the heuristic is not
   *       applicable.
   * @return The resulting subtree.
   */
  static runMulti(
      name: string, root: SemanticNode[],
      opt_alternative?: (p1: SemanticNode[]) => SemanticNode[]):
      SemanticNode[] {
    let heuristic = SemanticHeuristics.lookup(name);
    return heuristic &&
            (SemanticHeuristics.getInstance().flags[name] ||
             heuristic.applicable(root)) ?
        heuristic.apply(root) :
        opt_alternative ? opt_alternative(root) : root;
  }


  /**
   * Looks up the named heuristic.
   * @param name The name of the heuristic.
   * @return The heuristic.
   */
  static lookup(name: string): SemanticHeuristic {
    return SemanticHeuristics.getInstance().heuristics[name];
  }


  /**
   * Rewrites a partition with respect to explicit juxtapositions into one where
   * all multiple operators are combined to post or prefix operators.
   * @param partition The partition wrt. invisible
   *     times.
   * @return The partition with collated pre/postfix
   *     operators.
   */
  private static juxtapositionPrePost_(partition: SemanticUtil.Partition):
      SemanticUtil.Partition {
    let rels = [];
    let comps = [];
    let next = partition.comp.shift();
    let rel = null;
    while (partition.comp.length) {
      let collect = [];
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
      rel = SemanticHeuristics.convertPrePost_(collect, next, comps);
    }
    if (!collect.length && !next.length) {
      // A trailing rest exists that needs to be rewritten.
      collect.push(rel);
      SemanticHeuristics.convertPrePost_(collect, next, comps);
    } else {
      rels.push(rel);
      comps.push(next);
    }
    return {rel: rels, comp: comps};
  }


  /**
   * Converts lists of invisible times operators into pre/postfix operatiors.
   * @param collect The collected list of invisible
   *     times.
   * @param next The next component element.
   * @param comps The previous components.
   * @return The operator that needs to be taken care of.
   */
  private static convertPrePost_(
      collect: SemanticNode[], next: SemanticNode[],
      comps: SemanticNode[][]): SemanticNode|null {
    let rel = null;
    if (!collect.length) {
      return rel;
    }
    let prev = comps[comps.length - 1];
    let prevExists = prev && prev.length;
    let nextExists = next && next.length;
    let processor = sre.SemanticProcessor.getInstance();
    if (prevExists && nextExists) {
      if (next[0].type === SemanticType.INFIXOP &&
          next[0].role === SemanticRole.IMPLICIT) {
        rel = collect.pop();
        prev.push(processor['postfixNode_'](prev.pop(), collect));
        return rel;
      }
      rel = collect.shift();
      next.unshift(processor['prefixNode_'](next.shift(), collect));
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
   * @return The resulting lists where implicit and
   *     explicitly given invisible times are combined as much as possible.
   */
  private static recurseJuxtaposition_(
      acc: SemanticNode[], ops: SemanticNode[],
      elements: SemanticNode[][]): SemanticNode[] {
    if (!ops.length) {
      return acc;
    }
    let left = acc.pop();
    let op = ops.shift();
    let first = elements.shift();
    if (SemanticPred.isImplicitOp(op)) {
      sre.Debugger.getInstance().output('Juxta Heuristic Case 2');
      // In case we have a tree as operator, move on.
      let right = (left ? [left, op] : [op]).concat(first);
      return SemanticHeuristics.recurseJuxtaposition_(
          acc.concat(right), ops, elements);
    }
    if (!left) {
      sre.Debugger.getInstance().output('Juxta Heuristic Case 3');
      return SemanticHeuristics.recurseJuxtaposition_(
          [op].concat(first), ops, elements);
    }
    let right = first.shift();
    if (!right) {
      sre.Debugger.getInstance().output('Juxta Heuristic Case 9');
      // Attach to the next operator, which must be an infix operation, As there
      // are no more double operators. Left also exists. Cases that left is an
      // implicit infix or simple.
      let newOp = SemanticHeuristics.getInstance().factory.makeBranchNode(
          SemanticType.INFIXOP, [left, ops.shift()], [op], op.textContent);
      newOp.role = SemanticRole.IMPLICIT;
      SemanticHeuristics.run('combine_juxtaposition', newOp);
      ops.unshift(newOp);
      return SemanticHeuristics.recurseJuxtaposition_(acc, ops, elements);
    }
    if (SemanticPred.isOperator(left) || SemanticPred.isOperator(right)) {
      sre.Debugger.getInstance().output('Juxta Heuristic Case 4');
      return SemanticHeuristics.recurseJuxtaposition_(
          acc.concat([left, op, right]).concat(first), ops, elements);
    }
    let result = null;
    if (SemanticPred.isImplicitOp(left) && SemanticPred.isImplicitOp(right)) {
      // Merge both left and right.
      sre.Debugger.getInstance().output('Juxta Heuristic Case 5');
      left.contentNodes.push(op);
      left.contentNodes = left.contentNodes.concat(right.contentNodes);
      left.childNodes.push(right);
      left.childNodes = left.childNodes.concat(right.childNodes);
      right.childNodes.forEach(function(x) {
        x.parentNode = left;
      });
      op.parentNode = left;
      left.addMathmlNodes(op.mathml);
      left.addMathmlNodes(right.mathml);
      result = left;
    } else if (SemanticPred.isImplicitOp(left)) {
      // Add to the left one.
      sre.Debugger.getInstance().output('Juxta Heuristic Case 6');
      left.contentNodes.push(op);
      left.childNodes.push(right);
      right.parentNode = left;
      op.parentNode = left;
      left.addMathmlNodes(op.mathml);
      left.addMathmlNodes(right.mathml);
      result = left;
    } else if (SemanticPred.isImplicitOp(right)) {
      // Add to the right one.
      sre.Debugger.getInstance().output('Juxta Heuristic Case 7');
      right.contentNodes.unshift(op);
      right.childNodes.unshift(left);
      left.parentNode = right;
      op.parentNode = right;
      right.addMathmlNodes(op.mathml);
      right.addMathmlNodes(left.mathml);
      result = right;
    } else {
      // Create new implicit node.
      sre.Debugger.getInstance().output('Juxta Heuristic Case 8');
      result = SemanticHeuristics.getInstance().factory.makeBranchNode(
          SemanticType.INFIXOP, [left, right], [op], op.textContent);
      result.role = SemanticRole.IMPLICIT;
    }
    acc.push(result);
    return SemanticHeuristics.recurseJuxtaposition_(
        acc.concat(first), ops, elements);
  }
}

goog.addSingletonGetter(SemanticHeuristics);



// TODO: Heuristic paths have to be included in the tests.
/**
 * All heuristic methods get a method to manipulate nodes and have a predicate
 * that either switches them on automatically (e.g., on selection of a domain),
 * or they can be switched on manually via a flag. Currently these flags are
 * hard coded.
 */
export interface SemanticHeuristic {}



/**
 * Abstract class of heuristics.
 * @param {{predicate: ((function(T): boolean)|undefined),
 *          method: function(T): sre.SemanticNode} } heuristic The predicate and
 * method of the heuristic
 */
export class SemanticAbstractHeuristic implements SemanticHeuristic<T> {
  apply: any;

  applicable: any;
  constructor<T>(heuristic: {
    predicate?: ((p1: T) => boolean), method: (p1: T) => SemanticNode
  }) {
    this.apply = heuristic.method;
    this.applicable = heuristic.predicate || function(node) {
      return false;
    };
  }
}



/**
 * Heuristics work on the root of a subtree.
 * @override
 */
export class SemanticTreeHeuristic extends sre.SemanticAbstractHeuristic {
  constructor(heuristic) {
    super(heuristic);
  }
}
goog.inherits(SemanticTreeHeuristic, SemanticAbstractHeuristic);



/**
 * Heuristics work on a list of nodes.
 * @override
 */
export class SemanticMultiHeuristic extends sre.SemanticAbstractHeuristic {
  constructor(heuristic) {
    super(heuristic);
  }
}
goog.inherits(SemanticMultiHeuristic, SemanticAbstractHeuristic);


/**
 * Recursively combines implicit nodes as much as possible for the given root
 * node of a subtree.
 */
SemanticHeuristics.add(
    'combine_juxtaposition', new SemanticTreeHeuristic({
      method: function(root) {
        for (let i = root.childNodes.length - 1, child;
             child = root.childNodes[i]; i--) {
          if (!SemanticPred.isImplicitOp(child) || child.nobreaking) {
            continue;
          }
          root.childNodes.splice.apply(
              root.childNodes, [i, 1].concat(child.childNodes));
          root.contentNodes.splice.apply(
              root.contentNodes, [i, 0].concat(child.contentNodes));
          child.childNodes.concat(child.contentNodes).forEach(function(x) {
            x.parent = root;
          });
          root.addMathmlNodes(child.mathml);
        }
        return root;
      }
    }));


/**
 * Finds composed functions, i.e., simple functions that are either composed
 * with an infix operation or fraction and rewrites their role accordingly.
 * Currently restricted to Clearspeak!
 */
SemanticHeuristics.add(
    'propagateSimpleFunction', new SemanticTreeHeuristic({
      predicate: function(node) {
        return sre.Engine.getInstance().domain === 'clearspeak';
      },
      method: function(node) {
        if ((node.type === SemanticType.INFIXOP ||
             node.type === SemanticType.FRACTION) &&
            node.childNodes.every(SemanticPred.isSimpleFunction)) {
          node.role = SemanticRole.COMPFUNC;
        }
        return node;
      }
    }));


/**
 * Naive name based heuristic for identifying simple functions. This is used in
 * clearspeak only.
 */
SemanticHeuristics.add(
    'simpleNamedFunction', new SemanticTreeHeuristic({
      predicate: function(node) {
        return sre.Engine.getInstance().domain === 'clearspeak';
      },
      method: function(node) {
        let specialFunctions = ['f', 'g', 'h', 'F', 'G', 'H'];
        if (node.role !== SemanticRole.UNIT &&
            specialFunctions.indexOf(node.textContent) !== -1) {
          node.role = SemanticRole.SIMPLEFUNC;
        }
        return node;
      }
    }));


/**
 * Propagates the role of composed function to surrounding fences.
 * Currently restricted to Clearspeak!
 */
SemanticHeuristics.add(
    'propagateComposedFunction', new SemanticTreeHeuristic({
      predicate: function(node) {
        return sre.Engine.getInstance().domain === 'clearspeak';
      },
      method: function(node) {
        if (node.type === SemanticType.FENCED &&
            node.childNodes[0].role === SemanticRole.COMPFUNC) {
          node.role = SemanticRole.COMPFUNC;
        }
        return node;
      }
    }));


/**
 * Heuristic to compute a meaningful role for multi character operators (e.g.,
 * as in a++). If all operators have the same role (ignoring unknown) that role
 * is used.
 */
SemanticHeuristics.add(
    'multioperator', new SemanticTreeHeuristic({
      method: function(node) {
        if (node.role !== SemanticRole.UNKNOWN ||
            node.textContent.length <= 1) {
          return;
        }
        // TODO: Combine with lines in numberRole_/exprFont_?
        let content = sre.SemanticUtil.splitUnicode(node.textContent);
        let meaning = content.map(SemanticAttr.lookupMeaning);
        let singleRole = meaning.reduce(function(prev, curr) {
          if (!prev || !curr.role || curr.role === SemanticRole.UNKNOWN ||
              curr.role === prev) {
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
      }
    }));


/**
 * Combines explicitly given juxtapositions.
 */
SemanticHeuristics.add(
    'convert_juxtaposition', new SemanticMultiHeuristic({
      method: function(nodes) {
        let partition = sre.SemanticUtil.partitionNodes(nodes, function(x) {
          return x.textContent === SemanticAttr.invisibleTimes() &&
              x.type === SemanticType.OPERATOR;
        });
        // Preprocessing pre and postfixes.
        partition = partition.rel.length ?
            SemanticHeuristics.juxtapositionPrePost_(partition) :
            partition;
        // TODO: Move to Util
        nodes = partition.comp[0];
        for (let i = 1, c, r; c = partition.comp[i], r = partition.rel[i - 1];
             i++) {
          nodes.push(r);
          nodes = nodes.concat(c);
        }
        partition = sre.SemanticUtil.partitionNodes(nodes, function(x) {
          return x.textContent === SemanticAttr.invisibleTimes() &&
              (x.type === SemanticType.OPERATOR ||
               x.type === SemanticType.INFIXOP);
        });
        if (!partition.rel.length) {
          return nodes;
        }
        return SemanticHeuristics.recurseJuxtaposition_(
            partition.comp.shift(), partition.rel, partition.comp);
      }
    }));


/**
 * Rewrites a simple function to a prefix function if it consists of multiple
 * letters. (Currently restricted to Braille!)
 */
SemanticHeuristics.add('simple2prefix', new SemanticTreeHeuristic({
                         predicate: function(node) {
                           return sre.Engine.getInstance().modality ===
                               'braille' &&
                               node.type === SemanticType.IDENTIFIER;
                         },
                         method: function(node) {
                           if (node.textContent.length > 1 &&
                               // TODO: Discuss this line!
                               !node.textContent[0].match(/[A-Z]/)) {
                             node.role = SemanticRole.PREFIXFUNC;
                           }
                           return node;
                         }
                       }));


/**
 *  Rewrites space separated lists of numbers into of cycles.
 *  (Currently only used in Nemeth.)
 */
SemanticHeuristics.add(
    'detect_cycle', new SemanticTreeHeuristic({
      predicate: function(node) {
        return sre.Engine.getInstance().modality === 'braille' &&
            node.type === SemanticType.FENCED &&
            node.childNodes[0].type === SemanticType.INFIXOP &&
            node.childNodes[0].role === SemanticRole.IMPLICIT &&
            node.childNodes[0].childNodes.every(function(x) {
              return x.type === SemanticType.NUMBER;
            }) &&
            node.childNodes[0].contentNodes.every(function(x) {
              return x.role === SemanticRole.SPACE;
            });
      },

      method: function(node) {
        // TODO: Test for simple elements?
        node.type = SemanticType.MATRIX;
        node.role = SemanticRole.CYCLE;
        let row = node.childNodes[0];
        row.type = SemanticType.ROW;
        row.role = SemanticRole.CYCLE;
        row.contentNodes = [];
        return node;
      }
    }));
