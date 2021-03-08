// Copyright 2014-20 Volker Sorge
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

goog.provide('sre.SemanticHeuristic');
goog.provide('sre.SemanticTreeHeuristic');
goog.provide('sre.SemanticMultiHeuristic');
goog.provide('sre.SemanticHeuristics');

goog.require('sre.SemanticAttr');
goog.require('sre.SemanticNodeFactory');
goog.require('sre.SemanticPred');



/**
 * @constructor
 */
sre.SemanticHeuristics = function() {

  /**
   * @type {sre.SemanticNodeFactory}
   */
  this.factory = null;


  /**
   * @type {Object.<sre.SemanticHeuristic>}
   */
  this.heuristics = { };


  /**
   * @type {Object.<boolean>}
   */
  this.flags = {
    combine_juxtaposition: true,
    convert_juxtaposition: true,
    multioperator: true
  };

};
goog.addSingletonGetter(sre.SemanticHeuristics);


/**
 * Register a heuristic with the handler.
 * @param {string} name The name of the heuristic.
 * @param {sre.SemanticHeuristic} heuristic The heuristic.
 */
sre.SemanticHeuristics.add = function(name, heuristic) {
  sre.SemanticHeuristics.getInstance().heuristics[name] = heuristic;
  // Registered switched off, unless it is set by default.
  if (!sre.SemanticHeuristics.getInstance().flags[name]) {
    sre.SemanticHeuristics.getInstance().flags[name] = false;
  }
};


/**
 * Runs a heuristic if its predicate evaluates to true.
 * @param {string} name The name of the heuristic.
 * @param {!sre.SemanticNode} root The root node of the subtree.
 * @param {(function(!sre.SemanticNode): !sre.SemanticNode)=} opt_alternative An
 *       optional method to run if the heuristic is not applicable.
 * @return {!sre.SemanticNode} The resulting subtree.
 */
sre.SemanticHeuristics.run = function(name, root, opt_alternative) {
  var heuristic = sre.SemanticHeuristics.lookup(name);
  return heuristic &&
      (sre.SemanticHeuristics.getInstance().flags[name] ||
       heuristic.applicable(root)) ?
      heuristic.apply(root) :
      (opt_alternative ? opt_alternative(root) : root);
};


/**
 * Runs a multi heuristic if its predicate evaluates to true.
 * @param {string} name The name of the heuristic.
 * @param {!Array.<sre.SemanticNode>} root The list of root nodes.
 * @param {(function(!Array.<sre.SemanticNode>): !Array.<sre.SemanticNode>)=}
 *       opt_alternative An optional method to run if the heuristic is not
 *       applicable.
 * @return {!Array.<sre.SemanticNode>} The resulting subtree.
 */
sre.SemanticHeuristics.runMulti = function(name, root, opt_alternative) {
  var heuristic = sre.SemanticHeuristics.lookup(name);
  return heuristic &&
      (sre.SemanticHeuristics.getInstance().flags[name] ||
       heuristic.applicable(root)) ?
      heuristic.apply(root) :
      (opt_alternative ? opt_alternative(root) : root);
};


/**
 * Looks up the named heuristic.
 * @param {string} name The name of the heuristic.
 * @return {sre.SemanticHeuristic} The heuristic.
 */
sre.SemanticHeuristics.lookup = function(name) {
  return sre.SemanticHeuristics.getInstance().heuristics[name];
};



//
// TODO: Heuristic paths have to be included in the tests.
//
/**
 * All heuristic methods get a root of a subtree and have a predicate that
 * either switches them on automatically (e.g., on selection of a domain), or
 * they can be switched on manually via a flag. Currently these flags are hard
 * coded.
 * @interface
 * @param {{predicate: ((function(T): boolean)|undefined),
 *          method: function(T): T} } heuristic
 *          The predicate and method of the heuristic
 * @template T
 */
sre.SemanticHeuristic = function(
    {predicate: predicate = function(node) {return false;}, method: method}) {

  this.apply = method;

  this.applicable = predicate;

};


/**
 * All heuristic methods get a root of a subtree and have a predicate that
 * either switches them on automatically (e.g., on selection of a domain), or
 * they can be switched on manually via a flag. Currently these flags are hard
 * coded.
 * @constructor
 * @implements {sre.SemanticHeuristic<sre.SemanticNode>}
 * @param {{predicate: ((function(sre.SemanticNode): boolean)|undefined),
 *          method: function(sre.SemanticNode): sre.SemanticNode} } heuristic
 *          The predicate and method of the heuristic
 */
sre.SemanticTreeHeuristic = function(
    {predicate: predicate = function(node) {return false;}, method: method}) {

  this.apply = method;

  this.applicable = predicate;

};


/**
 * All heuristic methods get a root of a subtree and have a predicate that
 * either switches them on automatically (e.g., on selection of a domain), or
 * they can be switched on manually via a flag. Currently these flags are hard
 * coded.
 * @constructor
 * @implements {sre.SemanticHeuristic<Array.<sre.SemanticNode>>}
 * @param {{predicate: ((function(Array.<sre.SemanticNode>): boolean)|undefined),
 *          method: function(Array.<sre.SemanticNode>): Array.<sre.SemanticNode>} } heuristic
 *          The predicate and method of the heuristic
 */
sre.SemanticMultiHeuristic = function(
    {predicate: predicate = function(node) {return false;}, method: method}) {

  this.apply = method;

  this.applicable = predicate;

};


/**
 * Recursively combines implicit nodes as much as possible for the given root
 * node of a subtree.
 */
sre.SemanticHeuristics.add(
  'combine_juxtaposition',
  new sre.SemanticTreeHeuristic(
  {method: function(root) {
    for (var i = root.childNodes.length - 1, child;
         child = root.childNodes[i]; i--) {
      if (!sre.SemanticPred.isImplicitOp(child)) {
        continue;
      }
      root.childNodes.splice.apply(root.childNodes, [i, 1].concat(child.childNodes));
      root.contentNodes.splice.apply(root.contentNodes, [i, 0].concat(child.contentNodes));
      child.childNodes.concat(child.contentNodes).forEach(
        function(x) {x.parentNode = root;}
      );
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
sre.SemanticHeuristics.add(
  'propagateSimpleFunction',
  new sre.SemanticTreeHeuristic({
    predicate: function(node) {
      return sre.Engine.getInstance().domain === 'clearspeak';
    },
    method: function(node) {
      if ((node.type === sre.SemanticAttr.Type.INFIXOP ||
           node.type === sre.SemanticAttr.Type.FRACTION) &&
          node.childNodes.every(sre.SemanticPred.isSimpleFunction)) {
        node.role = sre.SemanticAttr.Role.COMPFUNC;
      }
      return node;
    }
  }));


/**
 * Naive name based heuristic for identifying simple functions. This is used in
 * clearspeak only.
 */
sre.SemanticHeuristics.add(
  'simpleNamedFunction',
  new sre.SemanticTreeHeuristic({
    predicate: function(node) {
      return sre.Engine.getInstance().domain === 'clearspeak';
    },
    method: function(node) {
      var specialFunctions = ['f', 'g', 'h', 'F', 'G', 'H'];
      if (node.role !== sre.SemanticAttr.Role.UNIT &&
          specialFunctions.indexOf(node.textContent) !== -1) {
        node.role = sre.SemanticAttr.Role.SIMPLEFUNC;
      }
      return node;
    }}));


/**
 * Propagates the role of composed function to surrounding fences.
 * Currently restricted to Clearspeak!
 */
sre.SemanticHeuristics.add(
  'propagateComposedFunction',
  new sre.SemanticTreeHeuristic({
    predicate: function(node) {
      return sre.Engine.getInstance().domain === 'clearspeak';
    },
    method: function(node) {
      if (node.type === sre.SemanticAttr.Type.FENCED &&
          node.childNodes[0].role === sre.SemanticAttr.Role.COMPFUNC) {
        node.role = sre.SemanticAttr.Role.COMPFUNC;
      }
      return node;
    }
  }));


sre.SemanticHeuristics.add(
  'multioperator',
  new sre.SemanticTreeHeuristic({
    method: function(node) {
      if (node.role !== sre.SemanticAttr.Role.UNKNOWN ||
          node.textContent.length <= 1) {
        return;
      }
      // TODO: Combine with lines in numberRole_/exprFont_?
      var content = sre.SemanticUtil.splitUnicode(node.textContent);
      var meaning = content.map(sre.SemanticAttr.lookupMeaning);
      var singleRole = meaning.reduce(
        function(prev, curr) {
          if (!prev || !curr.role ||
              curr.role === sre.SemanticAttr.Role.UNKNOWN ||
              curr.role === prev) {
            return prev;
          }
          if (prev === sre.SemanticAttr.Role.UNKNOWN) {
            return curr.role;
          }
          return null;
        },
        sre.SemanticAttr.Role.UNKNOWN);
      if (singleRole) {
        node.role = singleRole;
      }
    }})
);


/**
 * Combines explicitly given juxtapositions.
 // * @param {!Array.<!sre.SemanticNode>} nodes The list of nodes.
 // * @return {!Array.<!sre.SemanticNode>} The list with juxtapositions combined.
 // * @private
 */
sre.SemanticHeuristics.add(
  'convert_juxtaposition',
  new sre.SemanticMultiHeuristic({
    method: function(nodes) {
      var partition = sre.SemanticUtil.partitionNodes(
        nodes, function(x) {
          return x.textContent === sre.SemanticAttr.invisibleTimes() &&
            x.type === sre.SemanticAttr.Type.OPERATOR;
        });
      // Preprocessing pre and postfixes.
      partition = partition.rel.length ?
        sre.SemanticHeuristics.juxtapositionPrePost_(partition) : partition;
      // TODO: Move to Util
      nodes = partition.comp[0];
      for (var i = 1, c, r; c = partition.comp[i], r = partition.rel[i - 1]; i++) {
        nodes.push(r);
        nodes = nodes.concat(c);
      }
      partition = sre.SemanticUtil.partitionNodes(
        nodes, function(x) {
          return x.textContent === sre.SemanticAttr.invisibleTimes() &&
            (x.type === sre.SemanticAttr.Type.OPERATOR ||
             x.type === sre.SemanticAttr.Type.INFIXOP);
        });
      if (!partition.rel.length) {
        return nodes;
      }
      return sre.SemanticHeuristics.recurseJuxtaposition_(
        partition.comp.shift(), partition.rel, partition.comp);
    }})
);


sre.SemanticHeuristics.juxtapositionPrePost_ = function(partition) {
  var rels = [];
  var comps = [];
  var next = partition.comp.shift();
  var rel = null;
  while (partition.comp.length) {
    var collect = [];
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
    sre.SemanticHeuristics.convertPrePost_(collect, next, comps, rels);
  }
  // Rest?
  if (!collect.length && !next.length) {
    collect.push(rel);
    sre.SemanticHeuristics.convertPrePost_(collect, next, comps, rels);
  } else {
    rels.push(rel);
    comps.push(next);
  }
  // comps.push(partition.comp.shift());
  return {rel: rels, comp: comps};
};


sre.SemanticHeuristics.convertPrePost_ = function(collect, next, comps, rels) {
  if (!collect.length) return;
  var prev = comps[comps.length - 1];
  var prevExists = prev && prev.length;
  var nextExists = next && next.length;
  if (prevExists && nextExists) {
    if (next[0].type === sre.SemanticAttr.Type.INFIXOP &&
        next[0].role === sre.SemanticAttr.Role.IMPLICIT) {
      rels.push(collect.pop());
      prev.push(sre.SemanticProcessor.getInstance()['postfixNode_'](prev.pop(), collect));
      return;
    }
    rels.push(collect.shift());
    next.unshift(sre.SemanticProcessor.getInstance()['prefixNode_'](next.shift(), collect));
    return;
  }
  if (prevExists) {
    prev.push(sre.SemanticProcessor.getInstance()['postfixNode_'](prev.pop(), collect));
    return;
  }
  if (nextExists) {
    next.unshift(sre.SemanticProcessor.getInstance()['prefixNode_'](next.shift(), collect));
    return;
  }
};

/**
 * Heuristic to recursibely combines implicitly and explicitly given
 * juxtapositions. The heuristic is applied unless the separate implicit
 * heuristic is selected.
 * @param {!Array.<!sre.SemanticNode>} acc Elements to the left of the first
 *     implicit operation or application of an implicit operation. The serves as
 *     an accumulator during the recursion.
 * @param {!Array.<!sre.SemanticNode>} ops The list of implicit operators or
 *     applications. That is, subtrees that are infix operations with inivisible
 *     times.
 * @param {!Array.<!Array.<!sre.SemanticNode>>} elements The list of elements
 *     between the operators in ops. These are lists of not yet combined elements.
 * @return {!Array.<!sre.SemanticNode>} The resulting lists where implicit and
 *     explicitly given invisible times are combined as much as possible.
 * @private
 */
sre.SemanticHeuristics.recurseJuxtaposition_ = function(acc, ops, elements) {
  if (!ops.length) {
    return acc;
  }
  var left = acc.pop();
  var op = ops.shift();
  var first = elements.shift();
  if (sre.SemanticPred.isImplicitOp(op)) {
    sre.Debugger.getInstance().output('Case 2');
    var right = (left ? [left, op] : [op]).concat(first);
    return sre.SemanticHeuristics.recurseJuxtaposition_(
      acc.concat(right), ops, elements);
  }
  if (!left) {
    sre.Debugger.getInstance().output('Case 3');
    return sre.SemanticHeuristics.recurseJuxtaposition_([op].concat(first), ops, elements);
  }
  var right = first.shift();
  if (!right) {
    sre.Debugger.getInstance().output('Case 9');
    // Recall: If op is a single implicit node it needs to be omitted!
    right = sre.SemanticPred.isOperator(op) ? [left] : [left, op];
    return sre.SemanticHeuristics.recurseJuxtaposition_(acc.concat(right), ops, elements);
  }
  if (sre.SemanticPred.isOperator(left) || sre.SemanticPred.isOperator(right)) {
    sre.Debugger.getInstance().output('Case 4');
    return sre.SemanticHeuristics.recurseJuxtaposition_(
      acc.concat([left, op, right]).concat(first), ops, elements);
  }
  var result = null;
  if (sre.SemanticPred.isImplicitOp(left) &&
      sre.SemanticPred.isImplicitOp(right)) {
    // Merge both left and right.
    sre.Debugger.getInstance().output('Case 5');
    left.contentNodes.push(op);
    left.contentNodes = left.contentNodes.concat(right.contentNodes);
    left.childNodes.push(right);
    left.childNodes = left.childNodes.concat(right.childNodes);
    right.childNodes.forEach(function(x) {x.parentNode = left;});
    op.parentNode = left;
    left.addMathmlNodes(op.mathml);
    left.addMathmlNodes(right.mathml);
    result = left;
  } else if (sre.SemanticPred.isImplicitOp(left)) {
    // Add to the left one.
    sre.Debugger.getInstance().output('Case 6');
    left.contentNodes.push(op);
    left.childNodes.push(right);
    right.parentNode = left;
    op.parentNode = left;
    left.addMathmlNodes(op.mathml);
    left.addMathmlNodes(right.mathml);
    result = left;
  } else if (sre.SemanticPred.isImplicitOp(right)) {
    // Add to the right one.
    sre.Debugger.getInstance().output('Case 7');
    right.contentNodes.unshift(op);
    right.childNodes.unshift(left);
    left.parentNode = right;
    op.parentNode = right;
    right.addMathmlNodes(op.mathml);
    right.addMathmlNodes(left.mathml);
    result = right;
  } else {
  // Create new implicit node.
    sre.Debugger.getInstance().output('Case 8');
    result = sre.SemanticHeuristics.getInstance().factory.makeBranchNode(
      sre.SemanticAttr.Type.INFIXOP, [left, right], [op], op.textContent);
    result.role = sre.SemanticAttr.Role.IMPLICIT;
  }
  acc.push(result);
  return sre.SemanticHeuristics.recurseJuxtaposition_(acc.concat(first), ops, elements);
};


