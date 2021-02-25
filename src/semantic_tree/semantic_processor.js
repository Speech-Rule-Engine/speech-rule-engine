// Copyright 2014-16 Volker Sorge
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

goog.provide('sre.SemanticProcessor');

goog.require('sre.SemanticAttr');
goog.require('sre.SemanticHeuristics');
goog.require('sre.SemanticNodeFactory');
goog.require('sre.SemanticPred');



/**
 * @constructor
 */
sre.SemanticProcessor = function() {

  /**
   * @type {!sre.SemanticNodeFactory}
   * @private
   */
  this.factory_ = new sre.SemanticNodeFactory();

  /**
   * @type {!sre.SemanticHeuristics}
   */
  this.heuristics = sre.SemanticHeuristics.getInstance();
  this.heuristics.factory = this.factory_;

};
goog.addSingletonGetter(sre.SemanticProcessor);


/**
 * Sets the node factory the processor is using.
 * @param {!sre.SemanticNodeFactory} factory New node factory.
 */
sre.SemanticProcessor.prototype.setNodeFactory = function(factory) {
  this.factory_ = factory;
};


/**
 * Getter for the node factory.
 * @return {!sre.SemanticNodeFactory} The node factory.
 */
sre.SemanticProcessor.prototype.getNodeFactory = function() {
  return this.factory_;
};


/**
 * Processes an identifier node, with particular emphasis on font
 * disambiguation.
 * @param {sre.SemanticNode} leaf The identifier node.
 * @param {sre.SemanticAttr.Font} font The original mml font for the
 *     identifier. Could be empty if not font was given.
 * @param {string} unit The class of the identifier which is important if it is
 *     a unit.
 * @return {!sre.SemanticNode} The semantic identifier node.
 */
sre.SemanticProcessor.prototype.identifierNode = function(leaf, font, unit) {
  if (unit === 'MathML-Unit') {
    leaf.type = sre.SemanticAttr.Type.IDENTIFIER;
    leaf.role = sre.SemanticAttr.Role.UNIT;
  } else if (!font && leaf.textContent.length === 1 &&
             (leaf.role === sre.SemanticAttr.Role.INTEGER ||
              leaf.role === sre.SemanticAttr.Role.LATINLETTER ||
              leaf.role === sre.SemanticAttr.Role.GREEKLETTER) &&
             leaf.font === sre.SemanticAttr.Font.NORMAL) {
    // If single letter or single integer and font normal but no mathvariant
    // then this letter/number should be in italic font.
    leaf.font = sre.SemanticAttr.Font.ITALIC;
    return sre.SemanticHeuristics.run('simpleNamedFunction', leaf);
  }
  if (leaf.type === sre.SemanticAttr.Type.UNKNOWN) {
    leaf.type = sre.SemanticAttr.Type.IDENTIFIER;
  }
  sre.SemanticProcessor.exprFont_(leaf);
  return sre.SemanticHeuristics.run('simpleNamedFunction', leaf);
};


/**
 * Create a branching node for an implicit operation, currently assumed to be of
 * multiplicative type.
 * @param {!Array.<!sre.SemanticNode>} nodes The operands.
 * @return {!sre.SemanticNode} The new branch node.
 * @private
 */
sre.SemanticProcessor.prototype.implicitNode_ = function(nodes) {
  var operators = sre.SemanticProcessor.getInstance().factory_.
      makeMultipleContentNodes(nodes.length - 1,
                               sre.SemanticAttr.invisibleTimes());
  // For now we assume this is a multiplication using invisible times.
  var newNode = sre.SemanticProcessor.getInstance().infixNode_(
      nodes, /**@type{!sre.SemanticNode}*/(operators[0]));
  newNode.role = sre.SemanticAttr.Role.IMPLICIT;
  operators.forEach(function(op) {op.parent = newNode;});
  newNode.contentNodes = operators;
  return newNode;
};


/**
 * Process a list of nodes and create a node for implicit operations, currently
 * assumed to be of multiplicative type. Determines mixed numbers and unit
 * elements.
 * @param {!Array.<!sre.SemanticNode>} nodes The operands.
 * @return {!sre.SemanticNode} The new branch node.
 */
sre.SemanticProcessor.prototype.implicitNode = function(nodes) {
  nodes = sre.SemanticProcessor.getInstance().getMixedNumbers_(nodes);
  nodes = sre.SemanticProcessor.getInstance().combineUnits_(nodes);
  if (nodes.length === 1) {
    return nodes[0];
  }
  var node = this.implicitNode_(nodes);
  return sre.SemanticHeuristics.run('juxtaposition', node);
};


/**
 * Create a branching node for an infix operation.
 * @param {!Array.<sre.SemanticNode>} children The operands.
 * @param {!sre.SemanticNode} opNode The operator.
 * @return {!sre.SemanticNode} The new branch node.
 * @private
 */
sre.SemanticProcessor.prototype.infixNode_ = function(children, opNode) {
  var node = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
      sre.SemanticAttr.Type.INFIXOP, children, [opNode],
      sre.SemanticUtil.getEmbellishedInner(opNode).textContent);
  node.role = opNode.role;
  return sre.SemanticHeuristics.run('propagateSimpleFunction', node);
};


/**
 * Finds mixed numbers that are explicitly given with invisible plus.
 * @param {!Array.<!sre.SemanticNode>} nodes The list of nodes.
 * @return {!Array.<!sre.SemanticNode>} The new list of nodes.
 * @private
 */
sre.SemanticProcessor.prototype.explicitMixed_ = function(nodes) {
  var partition = sre.SemanticProcessor.partitionNodes_(
      nodes, function(x) {
        return x.textContent === sre.SemanticAttr.invisiblePlus();});
  if (!partition.rel.length) {
    return nodes;
  }
  var result = [];
  for (var i = 0, rel; rel = partition.rel[i]; i++) {
    var prev = partition.comp[i];
    var next = partition.comp[i + 1];
    var last = prev.length - 1;
    if (prev[last] && next[0] &&
        sre.SemanticPred.isAttribute('type', 'NUMBER')(prev[last]) &&
        !sre.SemanticPred.isAttribute('role', 'MIXED')(prev[last]) &&
        sre.SemanticPred.isAttribute('type', 'FRACTION')(next[0])) {
      var newNode = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
          sre.SemanticAttr.Type.NUMBER, [prev[last], next[0]], []);
      newNode.role = sre.SemanticAttr.Role.MIXED;
      result = result.concat(prev.slice(0, last));
      result.push(newNode);
      next.shift();
    } else {
      result = result.concat(prev);
      result.push(rel);
    }
  }
  return result.concat(partition.comp[partition.comp.length - 1]);
};

//   if (sre.SemanticPred.isAttribute('type', 'NUMBER')(node.childNodes[0]) &&
//       sre.SemanticPred.isAttribute('type', 'FRACTION')(node.childNodes[1])) {
//     node.type = sre.SemanticAttr.Type.NUMBER;
//     node.role = sre.SemanticAttr.Role.MIXED;
//   }
//   return node;
// };


/**
 * Creates a node of the specified type by collapsing the given node list into
 * one content (thereby concatenating the content of each node into a single
 * content string) with the inner node as a child.
 * @param {!sre.SemanticNode} inner The inner node.
 * @param {!Array.<sre.SemanticNode>} nodeList List of nodes.
 * @param {!sre.SemanticAttr.Type} type The new type of the node.
 * @return {!sre.SemanticNode} The new branch node.
 * @private
 */
sre.SemanticProcessor.prototype.concatNode_ = function(inner, nodeList, type) {
  if (nodeList.length === 0) {
    return inner;
  }
  var content = nodeList.map(function(x) {
    return sre.SemanticUtil.getEmbellishedInner(x).textContent;
  }).join(' ');
  var newNode = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
      type, [inner], nodeList, content);
  if (nodeList.length > 1) {
    newNode.role = sre.SemanticAttr.Role.MULTIOP;
  }
  return newNode;
};


// TODO: (Simons) Rewrite to group same operators.
//
//       Currently the positive role is only given to the innermost single +
//       prefix operator.
/**
 * Wraps a node into prefix operators.
 * Example: + - a becomes (+ (- (a)))
 * Input: a  [+, -] ->  Output: content: '+ -', child: a
 * @param {!sre.SemanticNode} node The inner node.
 * @param {!Array.<sre.SemanticNode>} prefixes Prefix operators
 * from the outermost to the innermost.
 * @return {!sre.SemanticNode} The new branch node.
 * @private
 */
sre.SemanticProcessor.prototype.prefixNode_ = function(node, prefixes) {
  var negatives = sre.SemanticProcessor.partitionNodes_(
      prefixes, sre.SemanticPred.isAttribute('role', 'SUBTRACTION'));
  var newNode = sre.SemanticProcessor.getInstance().concatNode_(
      node, negatives.comp.pop(), sre.SemanticAttr.Type.PREFIXOP);
  if (newNode.contentNodes.length === 1 &&
      newNode.contentNodes[0].role === sre.SemanticAttr.Role.ADDITION &&
      newNode.contentNodes[0].textContent === '+') {
    newNode.role = sre.SemanticAttr.Role.POSITIVE;
  }
  while (negatives.rel.length > 0) {
    newNode = sre.SemanticProcessor.getInstance().concatNode_(
        newNode, [negatives.rel.pop()], sre.SemanticAttr.Type.PREFIXOP);
    newNode.role = sre.SemanticAttr.Role.NEGATIVE;
    newNode = sre.SemanticProcessor.getInstance().concatNode_(
        newNode, negatives.comp.pop(), sre.SemanticAttr.Type.PREFIXOP);
  }
  return newNode;
};


/**
 * Wraps a node into postfix operators.
 * Example: a - + becomes (((a) -) +)
 * Input: a  [-, +] ->  Output: content: '- +', child: a
 * @param {!sre.SemanticNode} node The inner node.
 * @param {!Array.<sre.SemanticNode>} postfixes Postfix operators from
 * innermost to outermost.
 * @return {!sre.SemanticNode} The new branch node.
 * @private
 */
sre.SemanticProcessor.prototype.postfixNode_ = function(node, postfixes) {
  if (!postfixes.length) {
    return node;
  }
  return sre.SemanticProcessor.getInstance().concatNode_(
      node, postfixes, sre.SemanticAttr.Type.POSTFIXOP);
};


/**
 * Create an text node, keeping string notation correct.
 * @param {sre.SemanticNode} leaf The text node.
 * @param {string} type The type of the text node.
 * @return {!sre.SemanticNode} The new semantic text node.
 */
sre.SemanticProcessor.prototype.text = function(leaf, type) {
  // TODO (simons): Here check if there is already a type or if we can compute
  // an interesting number role. Than use this.
  leaf.type = sre.SemanticAttr.Type.TEXT;
  if (type === 'MS') {
    leaf.role = sre.SemanticAttr.Role.STRING;
  }
  sre.SemanticProcessor.exprFont_(leaf);
  // TODO (simons): Process single element in text. E.g., check if a text
  //      element represents a function or a single letter, number, etc.
  return leaf;
};


/**
 * Processes a list of nodes, combining expressions by delimiters, tables,
 * punctuation sequences, function/big operator/integral applications to
 * generate a syntax tree with relation and operator precedence.
 *
 * This is the main heuristic to rewrite a flat row of terms into a meaningful
 * term tree.
 * @param {!Array.<sre.SemanticNode>} nodes The list of nodes.
 * @return {!sre.SemanticNode} The root node of the syntax tree.
 */
sre.SemanticProcessor.prototype.row = function(nodes) {
  nodes = nodes.filter(function(x) {
    return !sre.SemanticPred.isAttribute('type', 'EMPTY')(x);
  });
  if (nodes.length === 0) {
    return sre.SemanticProcessor.getInstance().factory_.makeEmptyNode();
  }
  nodes = sre.SemanticProcessor.getInstance().getFencesInRow_(nodes);
  nodes = sre.SemanticProcessor.getInstance().tablesInRow(nodes);
  nodes = sre.SemanticProcessor.getInstance().getPunctuationInRow_(nodes);
  nodes = sre.SemanticProcessor.getInstance().getTextInRow_(nodes);
  nodes = sre.SemanticProcessor.getInstance().getFunctionsInRow_(nodes);
  return sre.SemanticProcessor.getInstance().relationsInRow_(nodes);
};


/**
 * Combines adjacent units in
 * @param {!Array.<!sre.SemanticNode>} nodes The list of nodes.
 * @return {!Array.<!sre.SemanticNode>} The new list of nodes.
 * @private
 */
sre.SemanticProcessor.prototype.combineUnits_ = function(nodes) {
  var partition = sre.SemanticProcessor.partitionNodes_(
      nodes, function(x) {
        return !sre.SemanticPred.isAttribute('role', 'UNIT')(x);
      }
      );
  if (nodes.length === partition.rel.length) {
    return partition.rel;
  }
  var result = [];
  do {
    var comp = partition.comp.shift();
    var rel = partition.rel.shift();
    var unitNode = null;
    var last = result.pop();
    if (last) {
      if (!comp.length || !sre.SemanticPred.isUnitCounter(last)) {
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
      unitNode = sre.SemanticProcessor.getInstance().implicitNode_(comp);
      unitNode.role = sre.SemanticAttr.Role.UNIT;
    }
    if (unitNode) {
      result.push(unitNode);
    }
    if (rel) {
      result.push(rel);
    }
  } while (rel);
  return result;
};


/**
 * Finds mixed numbers in a list of single nodes. A mixed number is an integer
 * followed by a vulgar fraction.
 * @param {!Array.<!sre.SemanticNode>} nodes The list of nodes.
 * @return {!Array.<!sre.SemanticNode>} The new list of nodes.
 * @private
 */ // Change that to compute mixed fractions.
sre.SemanticProcessor.prototype.getMixedNumbers_ = function(nodes) {
  var partition = sre.SemanticProcessor.partitionNodes_(
      nodes, function(x) {
        return sre.SemanticPred.isAttribute('type', 'FRACTION')(x) &&
            sre.SemanticPred.isAttribute('role', 'VULGAR')(x);});
  if (!partition.rel.length) {
    return nodes;
  }
  var result = [];
  for (var i = 0, rel; rel = partition.rel[i]; i++) {
    var comp = partition.comp[i];
    var last = comp.length - 1;
    if (comp[last] &&
        sre.SemanticPred.isAttribute('type', 'NUMBER')(comp[last]) &&
        (sre.SemanticPred.isAttribute('role', 'INTEGER')(comp[last]) ||
         sre.SemanticPred.isAttribute('role', 'FLOAT')(comp[last]))) {
      var newNode = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
          sre.SemanticAttr.Type.NUMBER, [comp[last], rel], []);
      newNode.role = sre.SemanticAttr.Role.MIXED;
      result = result.concat(comp.slice(0, last));
      result.push(newNode);
    } else {
      result = result.concat(comp);
      result.push(rel);
    }
  }
  return result.concat(partition.comp[partition.comp.length - 1]);
};


/**
 * Separates text from math content and combines them into a punctuated node,
 * with dummy punctuation invisible comma.
 * @param {!Array.<sre.SemanticNode>} nodes The list of nodes.
 * @return {!Array.<sre.SemanticNode>} The new list of nodes.
 * @private
 */
sre.SemanticProcessor.prototype.getTextInRow_ = function(nodes) {
  if (nodes.length <= 1) {
    return nodes;
  }
  var partition = sre.SemanticProcessor.partitionNodes_(
      nodes, sre.SemanticPred.isAttribute('type', 'TEXT'));
  if (partition.rel.length === 0) {
    return nodes;
  }
  var result = [];
  var nextComp = partition.comp[0];
  if (nextComp.length > 0) {
    result.push(sre.SemanticProcessor.getInstance().row(nextComp));
  }
  for (var i = 0, text; text = partition.rel[i]; i++) {
    result.push(text);
    nextComp = partition.comp[i + 1];
    if (nextComp.length > 0) {
      result.push(sre.SemanticProcessor.getInstance().row(nextComp));
    }
  }
  return [sre.SemanticProcessor.getInstance().dummyNode_(result)];
};


/**
 * Constructs a syntax tree with relation and operator precedence from a list
 * of nodes.
 * @param {!Array.<!sre.SemanticNode>} nodes The list of nodes.
 * @return {!sre.SemanticNode} The root node of the syntax tree.
 * @private
 */
sre.SemanticProcessor.prototype.relationsInRow_ = function(nodes) {
  var partition = sre.SemanticProcessor.partitionNodes_(
      nodes, sre.SemanticPred.isRelation);
  var firstRel = partition.rel[0];

  if (!firstRel) {
    return sre.SemanticProcessor.getInstance().operationsInRow_(nodes);
  }
  if (nodes.length === 1) {
    return nodes[0];
  }
  var children = partition.comp.map(
      goog.bind(sre.SemanticProcessor.getInstance().operationsInRow_, this));
  if (partition.rel.some(
      function(x) {return !x.equals(firstRel);})) {
    var node = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
        sre.SemanticAttr.Type.MULTIREL, children, partition.rel);
    if (partition.rel.every(
        function(x) {return x.role === firstRel.role;})) {
      node.role = firstRel.role;
    }
    return node;
  }
  node = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
      sre.SemanticAttr.Type.RELSEQ, children, partition.rel,
      sre.SemanticUtil.getEmbellishedInner(firstRel).textContent);
  node.role = firstRel.role;
  return node;
};


/**
 * Constructs a syntax tree with operator precedence from a list nodes.
 * @param {!Array.<!sre.SemanticNode>} nodes The list of nodes.
 * @return {!sre.SemanticNode} The root node of the syntax tree.
 * @private
 */
sre.SemanticProcessor.prototype.operationsInRow_ = function(nodes) {
  if (nodes.length === 0) {
    return sre.SemanticProcessor.getInstance().factory_.makeEmptyNode();
  }
  // Get explicitly given mixed numbers
  nodes = this.explicitMixed_(nodes);

  if (nodes.length === 1) {
    return nodes[0];
  }

  var prefix = [];
  while (nodes.length > 0 &&
         sre.SemanticPred.isOperator(nodes[0])) {
    prefix.push(nodes.shift());
  }
  // Pathological case: only operators in row.
  if (nodes.length === 0) {
    return sre.SemanticProcessor.getInstance().prefixNode_(prefix.pop(),
                                                           prefix);
  }
  if (nodes.length === 1) {
    return sre.SemanticProcessor.getInstance().prefixNode_(nodes[0], prefix);
  }

  // Deal with explicit juxtaposition
  nodes = this.combineJuxtaposition_(nodes);

  var split = sre.SemanticProcessor.sliceNodes_(
      nodes, sre.SemanticPred.isOperator);
  // At this point, we know that split.head is not empty!
  var node = sre.SemanticProcessor.getInstance().prefixNode_(
      sre.SemanticProcessor.getInstance().implicitNode(
          /** @type {!Array.<!sre.SemanticNode>} */ (split.head)),
      prefix);
  if (!split.div) {
    return node;
  }
  return sre.SemanticProcessor.getInstance().operationsTree_(
      split.tail, node, split.div);
};


/**
 * Combines explicitly given juxtapositions.
 * @param {!Array.<!sre.SemanticNode>} nodes The list of nodes.
 * @return {!Array.<!sre.SemanticNode>} The list with juxtapositions combined.
 * @private
 */
sre.SemanticProcessor.prototype.combineJuxtaposition_ = function(nodes) {
  var partition = sre.SemanticProcessor.partitionNodes_(
      nodes, function(x) {
        return x.textContent === sre.SemanticAttr.invisibleTimes();
      });
  if (!partition.rel.length) {
    return nodes;
  }
  return this.recurseJuxtaposition_(
    partition.comp.shift(), partition.rel, partition.comp);
};


/**
 * Heuristic to recursibely combines implicitly and explicitly given
 * juxtapositions. The heuristic is applied unless the separate implicit
 * heuristic is selected.
 * @param {!Array.<!sre.SemanticNode>} acc Elements to the left of the first
 *     implicit operation or application of an implicit operation. The serves as
 *     an accumulator during the recursion.
 * @param {!Array.<!sre.SemanticNode>} ops The list of implicit operators or
 *     applications. That is, subtres that are infix operations with inivisible
 *     times.
 * @param {!Array.<!Array.<!sre.SemanticNode>>} elements The list of elements
 *     between the operators in ops. These are lists of not yet combined elements.
 * @return {!Array.<!sre.SemanticNode>} The resulting lists where implicit and
 *     explicitly given invisible times are combined as much as possible.
 * @private
 */
sre.SemanticProcessor.prototype.recurseJuxtaposition_ = function(acc, ops, elements) {
  if (!ops.length) {
    return acc;
  }
  var left = acc.pop();
  var op = ops.shift();
  var first = elements.shift();
  if (!left) {
    sre.Debugger.getInstance().output('Case 3');
    return this.recurseJuxtaposition_([op].concat(first), ops, elements);
  }
  var right = first.shift();
  if (!right) {
    sre.Debugger.getInstance().output('Case 9');
    // Recall: If op is a single implicit node it needs to be omitted!
    right = sre.SemanticPred.isOperator(op) ? [left] : [left, op];
    return this.recurseJuxtaposition_(acc.concat(right), ops, elements);
  }
  if (sre.SemanticPred.isOperator(left) || sre.SemanticPred.isOperator(right)) {
    sre.Debugger.getInstance().output('Case 4');
    return this.recurseJuxtaposition_(
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
    result = sre.SemanticProcessor.getInstance().infixNode_([left, right], op);
    result.role = sre.SemanticAttr.Role.IMPLICIT;
  }
  acc.push(result);
  return this.recurseJuxtaposition_(acc.concat(first), ops, elements);
};


/**
 * Recursively constructs syntax tree with operator precedence from a list nodes
 * given a initial root node.
 * @param {!Array.<sre.SemanticNode>} nodes The list of nodes.
 * @param {!sre.SemanticNode} root Initial tree.
 * @param {!sre.SemanticNode} lastop Last operator that has not been
 * processed yet.
 * @param {Array.<sre.SemanticNode>=} opt_prefixes Operator nodes that
 * will become prefix operation (or postfix in case they come after last
 * operand).
 * @return {!sre.SemanticNode} The root node of the syntax tree.
 * @private
 */
sre.SemanticProcessor.prototype.operationsTree_ = function(
    nodes, root, lastop, opt_prefixes) {
  var prefixes = opt_prefixes || [];

  if (nodes.length === 0) {
    // Left over prefixes become postfixes.
    prefixes.unshift(lastop);
    if (root.type === sre.SemanticAttr.Type.INFIXOP) {
      // We assume prefixes bind stronger than postfixes.
      var node = sre.SemanticProcessor.getInstance().postfixNode_(
          // Here we know that the childNodes are not empty!
          /** @type {!sre.SemanticNode} */ (root.childNodes.pop()),
          prefixes);
      root.appendChild(node);
      return root;
    }
    return sre.SemanticProcessor.getInstance().postfixNode_(root, prefixes);
  }

  var split = sre.SemanticProcessor.sliceNodes_(
      nodes, sre.SemanticPred.isOperator);

  if (split.head.length === 0) {
    prefixes.push(split.div);
    return sre.SemanticProcessor.getInstance().operationsTree_(
        split.tail, root, lastop, prefixes);
  }

  var node = sre.SemanticProcessor.getInstance().prefixNode_(
      sre.SemanticProcessor.getInstance().implicitNode(split.head), prefixes);
  var newNode = sre.SemanticProcessor.getInstance().appendOperand_(
      root, lastop, node);
  if (!split.div) {
    return newNode;
  }

  return sre.SemanticProcessor.getInstance().operationsTree_(
      split.tail, newNode, split.div, []);
};


// TODO (sorge) The following four functions could be combined into
// a single one. Currently it is clearer the way it is, though.
/**
 * Appends an operand at the right place in an operator tree.
 * @param {!sre.SemanticNode} root The operator tree.
 * @param {!sre.SemanticNode} op The operator node.
 * @param {!sre.SemanticNode} node The node to be added.
 * @return {!sre.SemanticNode} The modified root node.
 * @private
 */
sre.SemanticProcessor.prototype.appendOperand_ = function(root, op, node) {
  // In general our operator tree will have the form that additions and
  // subtractions are stacked, while multiplications are subordinate.
  if (root.type !== sre.SemanticAttr.Type.INFIXOP) {
    return sre.SemanticProcessor.getInstance().infixNode_([root, node], op);
  }
  var division = this.appendDivisionOp_(root, op, node);
  if (division) {
    return division;
  }
  if (sre.SemanticProcessor.getInstance().appendExistingOperator_(
      root, op, node)) {
    return root;
  }
  return op.role === sre.SemanticAttr.Role.MULTIPLICATION ?
      sre.SemanticProcessor.getInstance().appendMultiplicativeOp_(
      root, op, node) :
      sre.SemanticProcessor.getInstance().appendAdditiveOp_(root, op, node);
};


/**
 * Appends an operand to a divsion operator.
 * @param {!sre.SemanticNode} root The root node.
 * @param {!sre.SemanticNode} op The operator node.
 * @param {!sre.SemanticNode} node The operand node to be added.
 * @return {sre.SemanticNode} The modified root node or null.
 * @private
 */
sre.SemanticProcessor.prototype.appendDivisionOp_ = function(root, op, node) {
  if (op.role === sre.SemanticAttr.Role.DIVISION) {
    if (sre.SemanticPred.isImplicit(root)) {
      return sre.SemanticProcessor.getInstance().infixNode_([root, node], op);
    }
    return this.appendLastOperand_(root, op, node);
  }
  return root.role === sre.SemanticAttr.Role.DIVISION ?
      this.infixNode_([root, node], op) : null;
};


/**
 * Appends an operand as rightmost child of an infix operator.
 * @param {!sre.SemanticNode} root The root node.
 * @param {!sre.SemanticNode} op The operator node.
 * @param {!sre.SemanticNode} node The operand node to be added.
 * @return {!sre.SemanticNode} The modified root node.
 * @private
 */
sre.SemanticProcessor.prototype.appendLastOperand_ = function(root, op, node) {
  var lastRoot = root;
  var lastChild = root.childNodes[root.childNodes.length - 1];
  while (lastChild && lastChild.type === sre.SemanticAttr.Type.INFIXOP &&
         !sre.SemanticPred.isImplicit(lastChild)) {
    lastRoot = lastChild;
    lastChild = lastRoot.childNodes[root.childNodes.length - 1];
  }
  var newNode = sre.SemanticProcessor.getInstance().infixNode_(
      [lastRoot.childNodes.pop(), node], op);
  lastRoot.appendChild(newNode);
  return root;
};


/**
 * Appends a multiplicative operator and operand.
 * @param {!sre.SemanticNode} root The root node.
 * @param {!sre.SemanticNode} op The operator node.
 * @param {!sre.SemanticNode} node The operand node to be added.
 * @return {!sre.SemanticNode} The modified root node.
 * @private
 */
sre.SemanticProcessor.prototype.appendMultiplicativeOp_ = function(
    root, op, node) {
  // This ensures that implicit nodes stay together, which is probably what
  // we want.
  if (sre.SemanticPred.isImplicit(root)) {
    return sre.SemanticProcessor.getInstance().infixNode_([root, node], op);
  }
  var lastRoot = root;
  var lastChild = root.childNodes[root.childNodes.length - 1];
  while (lastChild && lastChild.type === sre.SemanticAttr.Type.INFIXOP &&
         !sre.SemanticPred.isImplicit(lastChild)) {
    lastRoot = lastChild;
    lastChild = lastRoot.childNodes[root.childNodes.length - 1];
  }
  var newNode = sre.SemanticProcessor.getInstance().infixNode_(
      [lastRoot.childNodes.pop(), node], op);
  lastRoot.appendChild(newNode);
  return root;
};


/**
 * Appends an additive/substractive operator and operand.
 * @param {!sre.SemanticNode} root The old root node.
 * @param {!sre.SemanticNode} op The operator node.
 * @param {!sre.SemanticNode} node The operand node to be added.
 * @return {!sre.SemanticNode} The new root node.
 * @private
 */
sre.SemanticProcessor.prototype.appendAdditiveOp_ = function(root, op, node) {
  return sre.SemanticProcessor.getInstance().infixNode_([root, node], op);
};


/**
 * Adds an operand to an operator node if it is the continuation of an existing
 * operation.
 * @param {!sre.SemanticNode} root The root node.
 * @param {!sre.SemanticNode} op The operator node.
 * @param {!sre.SemanticNode} node The operand node to be added.
 * @return {boolean} True if operator was successfully appended.
 * @private
 */
sre.SemanticProcessor.prototype.appendExistingOperator_ = function(
    root, op, node) {
  if (!root || root.type !== sre.SemanticAttr.Type.INFIXOP ||
      // This ensures that implicit nodes stay together, which is probably what
      // we want.
      sre.SemanticPred.isImplicit(root)) {
    return false;
  }
  if (root.contentNodes[0].equals(op)) {
    root.appendContentNode(op);
    root.appendChild(node);
    return true;
  }
  return sre.SemanticProcessor.getInstance().appendExistingOperator_(
      // Again, if this is an INFIXOP node, we know it has a child!
      /** @type {!sre.SemanticNode} */
      (root.childNodes[root.childNodes.length - 1]),
      op, node);
};


// TODO (sorge) The following procedure needs a rational reconstruction. It
// contains a number of similar cases which should be combined.
/**
 * Combines delimited expressions in a list of nodes.
 *
 * The basic idea of the heuristic is as follows:
 * 1. Opening and closing delimiters are matched regardless of the actual shape
 *    of the fence. These are turned into fenced nodes.
 * 2. Neutral fences are matched only with neutral fences of the same shape.
 * 3. For a collection of unmatched neutral fences we try to get a maximum
 *    number of matching fences. E.g. || a|b || would be turned into a fenced
 *    node with fences || and content a|b.
 * 4. Any remaining unmatched delimiters are turned into punctuation nodes.
 * @param {!Array.<!sre.SemanticNode>} nodes The list of nodes.
 * @return {!Array.<!sre.SemanticNode>} The new list of nodes.
 * @private
 */
sre.SemanticProcessor.prototype.getFencesInRow_ = function(nodes) {
  var partition = sre.SemanticProcessor.partitionNodes_(
      nodes,
      sre.SemanticPred.isFence);
  partition = sre.SemanticProcessor.purgeFences_(partition);
  var felem = partition.comp.shift();
  return sre.SemanticProcessor.getInstance().fences_(
      partition.rel, partition.comp, [], [felem]);
};


/**
 * Recursively processes a list of nodes and combines all the fenced expressions
 * into single nodes. It also processes singular fences, building expressions
 * that are only fenced left or right.
 * @param {!Array.<sre.SemanticNode>} fences FIFO queue of fence nodes.
 * @param {!Array.<Array.<sre.SemanticNode>>} content FIFO queue content
 *     between fences.
 * @param {!Array.<sre.SemanticNode>} openStack LIFO stack of open fences.
 * @param {!Array.<!Array.<sre.SemanticNode>>} contentStack LIFO stack of
 *     content between fences yet to be processed.
 * @return {!Array.<sre.SemanticNode>} A list of nodes with all fenced
 *     expressions processed.
 * @private
 */
sre.SemanticProcessor.prototype.fences_ = function(
    fences, content, openStack, contentStack) {
  // Base case 1: Everything is used up.
  if (fences.length === 0 && openStack.length === 0) {
    return contentStack[0];
  }
  var openPred = sre.SemanticPred.isAttribute('role', 'OPEN');
  // Base case 2: Only open and neutral fences are left on the stack.
  if (fences.length === 0) {
    // Basic idea:
    // - make punctuation nodes from open fences
    // - combine as many neutral fences as possible, if the are not separated by
    //   open fences.
    // The idea is to allow for things like case statements etc. and not bury
    // them inside a neutral fenced expression.
    //
    // 0. We process the list from left to right. Hence the first element on the
    //    content stack are actually left most elements in the expression.
    // 1. Slice at open fence.
    // 2. On tail optimize for neutral fences.
    // 3. Repeat until fence stack is exhausted.
    // Push rightmost elements onto the result.
    var result = contentStack.shift();
    while (openStack.length > 0) {
      if (openPred(openStack[0])) {
        var firstOpen = openStack.shift();
        sre.SemanticProcessor.fenceToPunct_(firstOpen);
        result.push(firstOpen);
      } else {
        var split = sre.SemanticProcessor.sliceNodes_(openStack, openPred);
        var cutLength = split.head.length - 1;
        var innerNodes = sre.SemanticProcessor.getInstance().neutralFences_(
            split.head, contentStack.slice(0, cutLength));
        contentStack = contentStack.slice(cutLength);
        //var rightContent = contentStack.shift();
        result.push.apply(result, innerNodes);
        //result.push.apply(result, rightContent);
        if (split.div) {
          split.tail.unshift(split.div);
        }
        openStack = split.tail;
      }
      result.push.apply(result, contentStack.shift());
    }
    return result;
  }
  var lastOpen = openStack[openStack.length - 1];
  var firstRole = fences[0].role;
  // General opening case.
  // Either we have an open fence.
  if (firstRole === sre.SemanticAttr.Role.OPEN ||
      // Or we have a neutral fence that does not have a counter part.
      (firstRole === sre.SemanticAttr.Role.NEUTRAL &&
       !(lastOpen &&
         sre.SemanticPred.compareNeutralFences(fences[0], lastOpen)))) {
    openStack.push(fences.shift());
    var cont = content.shift();
    if (cont) {
      contentStack.push(cont);
    }
    // contentStack.push(content.shift());
    return sre.SemanticProcessor.getInstance().fences_(
        fences, content, openStack, contentStack);
  }
  // General closing case.
  if (lastOpen &&
    // Closing fence for some opening fence.
      firstRole === sre.SemanticAttr.Role.CLOSE &&
      lastOpen.role === sre.SemanticAttr.Role.OPEN) {
    var fenced = sre.SemanticProcessor.getInstance().horizontalFencedNode_(
        openStack.pop(), fences.shift(), contentStack.pop());
    contentStack.push(contentStack.pop().concat([fenced], content.shift()));
    return sre.SemanticProcessor.getInstance().fences_(
        fences, content, openStack, contentStack);
  }
  if (lastOpen &&
      // Neutral fence with exact counter part.
      sre.SemanticPred.compareNeutralFences(fences[0], lastOpen)) {
    if (!sre.SemanticPred.elligibleLeftNeutral(lastOpen) ||
        !sre.SemanticPred.elligibleRightNeutral(fences[0])) {
      openStack.push(fences.shift());
      var cont = content.shift();
      if (cont) {
        contentStack.push(cont);
      }
      return sre.SemanticProcessor.getInstance().fences_(
        fences, content, openStack, contentStack);
    }
    var fenced = sre.SemanticProcessor.getInstance().horizontalFencedNode_(
        openStack.pop(), fences.shift(), contentStack.pop());
    contentStack.push(contentStack.pop().concat([fenced], content.shift()));
    return sre.SemanticProcessor.getInstance().fences_(
        fences, content, openStack, contentStack);
  }
  // Closing with a neutral fence on the stack.
  if (lastOpen && firstRole === sre.SemanticAttr.Role.CLOSE
      && lastOpen.role === sre.SemanticAttr.Role.NEUTRAL &&
      openStack.some(openPred)) {
    // Steps of the algorithm:
    // 1. Split list at right most opening bracket.
    // 2. Cut content list at corresponding length.
    // 3. Optimise the neutral fences.
    // 4. Make fenced node.
    //
    // Careful, this reverses openStack!
    var split = sre.SemanticProcessor.sliceNodes_(openStack, openPred, true);
    // We know that
    // (a) div & tail exist,
    // (b) all are combined in this step into a single fenced node,
    // (c) head is the new openStack,
    // (d) the new contentStack is remainder of contentStack + new fenced node +
    // shift of content.
    var rightContent = contentStack.pop();
    var cutLength = contentStack.length - split.tail.length + 1;
    var innerNodes = sre.SemanticProcessor.getInstance().neutralFences_(
        split.tail, contentStack.slice(cutLength));
    contentStack = contentStack.slice(0, cutLength);
    var fenced = sre.SemanticProcessor.getInstance().horizontalFencedNode_(
        split.div, fences.shift(),
        contentStack.pop().concat(innerNodes, rightContent));
    contentStack.push(contentStack.pop().concat([fenced], content.shift()));
    return sre.SemanticProcessor.getInstance().fences_(
        fences, content, split.head, contentStack);
  }
  // Final Case: A singular closing fence.
  // We turn the fence into a punctuation.
  var fenced = fences.shift();
  sre.SemanticProcessor.fenceToPunct_(fenced);
  contentStack.push(contentStack.pop().concat([fenced], content.shift()));
  return sre.SemanticProcessor.getInstance().fences_(
      fences, content, openStack, contentStack);
};


// TODO (sorge) The following could be done with linear programming.
/**
 * Trys to combine neutral fences as much as possible.
 * @param {!Array.<!sre.SemanticNode>} fences A list of neutral fences.
 * @param {!Array.<!Array.<sre.SemanticNode>>} content Intermediate
 *     content. Observe that |content| = |fences| - 1
 * @return {!Array.<sre.SemanticNode>} List of node with fully fenced
 *     nodes.
 * @private
 */
sre.SemanticProcessor.prototype.neutralFences_ = function(fences, content) {
  if (fences.length === 0) {
    return fences;
  }
  if (fences.length === 1) {
    sre.SemanticProcessor.fenceToPunct_(fences[0]);
    return fences;
  }
  var firstFence = fences.shift();
  if (!sre.SemanticPred.elligibleLeftNeutral(firstFence)) {
    sre.SemanticProcessor.fenceToPunct_(firstFence);
    var restContent = content.shift();
    restContent.unshift(firstFence);
    return restContent.concat(
        sre.SemanticProcessor.getInstance().neutralFences_(fences, content));
  }
  var split = sre.SemanticProcessor.sliceNodes_(
      fences, function(x) {
        return sre.SemanticPred.compareNeutralFences(x, firstFence);
      });
  if (!split.div) {
    sre.SemanticProcessor.fenceToPunct_(firstFence);
    var restContent = content.shift();
    restContent.unshift(firstFence);
    return restContent.concat(
        sre.SemanticProcessor.getInstance().neutralFences_(fences, content));
  }
  // If the first right neutral is not elligible we ignore it.
  if (!sre.SemanticPred.elligibleRightNeutral(split.div)) {
    sre.SemanticProcessor.fenceToPunct_(split.div);
    fences.unshift(firstFence);
    return sre.SemanticProcessor.getInstance().neutralFences_(fences, content);
  }

  var newContent = sre.SemanticProcessor.getInstance().combineFencedContent_(
      firstFence, split.div, split.head, content);
  if (split.tail.length > 0) {
    var leftContent = newContent.shift();
    var result = sre.SemanticProcessor.getInstance().neutralFences_(
        split.tail, newContent);
    return leftContent.concat(result);
  }
  return newContent[0];
};


/**
 * Combines nodes framed by two matching fences using the given content.
 * Example: leftFence: [, rightFence: ], midFences: |, |
 *          content: c1, c2, c3, c4, ... cn
 *          return: [c1 | c2 | c3 ], c4, ... cn
 * @param {!sre.SemanticNode} leftFence The left fence.
 * @param {!sre.SemanticNode} rightFence The right fence.
 * @param {!Array.<sre.SemanticNode>} midFences A list of intermediate
 *     fences.
 * @param {!Array.<!Array.<sre.SemanticNode>>} content Intermediate
 *     content. Observe that |content| = |fences| - 1 + k where k >= 0 is the
 *     remainder.
 * @return {!Array.<!Array.<sre.SemanticNode>>} List of content nodes
 *     where the first is the fully fenced node wrt. the given left and right
 *     fence.
 * @private
 */
sre.SemanticProcessor.prototype.combineFencedContent_ = function(
    leftFence, rightFence, midFences, content) {

  if (midFences.length === 0) {
    var fenced = sre.SemanticProcessor.getInstance().horizontalFencedNode_(
        leftFence, rightFence, content.shift());
    if (content.length > 0) {
      content[0].unshift(fenced);
    } else {
      content = [[fenced]];
    }
    return content;
  }

  var leftContent = content.shift();
  var cutLength = midFences.length - 1;
  var midContent = content.slice(0, cutLength);
  content = content.slice(cutLength);
  var rightContent = content.shift();
  var innerNodes = sre.SemanticProcessor.getInstance().neutralFences_(
      midFences, midContent);
  leftContent.push.apply(leftContent, innerNodes);
  leftContent.push.apply(leftContent, rightContent);
  var fenced = sre.SemanticProcessor.getInstance().horizontalFencedNode_(
      leftFence, rightFence, leftContent);
  if (content.length > 0) {
    content[0].unshift(fenced);
  } else {
    content = [[fenced]];
  }
  return content;
};


/**
 * @const {Object.<sre.SemanticAttr.Role, sre.SemanticAttr.Role>}
 * @private
 */
sre.SemanticProcessor.FENCE_TO_PUNCT_ = {};
sre.SemanticProcessor.FENCE_TO_PUNCT_[sre.SemanticAttr.Role.NEUTRAL] =
    sre.SemanticAttr.Role.VBAR;
sre.SemanticProcessor.FENCE_TO_PUNCT_[sre.SemanticAttr.Role.OPEN] =
    sre.SemanticAttr.Role.OPENFENCE;
sre.SemanticProcessor.FENCE_TO_PUNCT_[sre.SemanticAttr.Role.CLOSE] =
    sre.SemanticAttr.Role.CLOSEFENCE;


/**
 * Rewrite fences into punctuation. This is done with any "leftover" fence.
 * @param {sre.SemanticNode} fence Fence.
 * @private
 */
sre.SemanticProcessor.fenceToPunct_ = function(fence) {
  var newRole = sre.SemanticProcessor.FENCE_TO_PUNCT_[fence.role];
  if (!newRole) return;
  while (fence.embellished) {
    fence.embellished = sre.SemanticAttr.Type.PUNCTUATION;
    if (!(sre.SemanticPred.isAttribute('role', 'SUBSUP')(fence) ||
          sre.SemanticPred.isAttribute('role', 'UNDEROVER')(fence))) {
      fence.role = newRole;
    }
    fence = fence.childNodes[0];
  }
  fence.type = sre.SemanticAttr.Type.PUNCTUATION;
  fence.role = newRole;
};


/**
 * Create a fenced node.
 * @param {sre.SemanticNode} ofence Opening fence.
 * @param {sre.SemanticNode} cfence Closing fence.
 * @param {!Array.<sre.SemanticNode>} content The content
 *     between the fences.
 * @return {!sre.SemanticNode} The new node.
 * @private
 */
sre.SemanticProcessor.prototype.horizontalFencedNode_ = function(
    ofence, cfence, content) {
  var childNode = sre.SemanticProcessor.getInstance().row(content);
  var newNode = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
      sre.SemanticAttr.Type.FENCED, [childNode], [ofence, cfence]);
  if (ofence.role === sre.SemanticAttr.Role.OPEN) {
    // newNode.role = sre.SemanticAttr.Role.LEFTRIGHT;
    this.classifyHorizontalFence_(newNode);
    newNode = sre.SemanticHeuristics.run('propagateComposedFunction', newNode);
  } else {
    newNode.role = ofence.role;
  }
  return sre.SemanticProcessor.rewriteFencedNode_(newNode);
};


/**
 * Classifies a horizontally fenced semantic node, using heuristics to determine
 * certain set types, intervals etc.
 * @param {sre.SemanticNode} node A fenced semantic node.
 * @private
 */
sre.SemanticProcessor.prototype.classifyHorizontalFence_ = function(node) {
  node.role = sre.SemanticAttr.Role.LEFTRIGHT;
  var children = node.childNodes;
  if (!sre.SemanticPred.isSetNode(node) || children.length > 1) {
    return;
  }
  if (children.length === 0 ||
      children[0].type === sre.SemanticAttr.Type.EMPTY) {
    node.role = sre.SemanticAttr.Role.SETEMPTY;
    return;
  }
  var type = children[0].type;
  if (children.length === 1 &&
      sre.SemanticPred.isSingletonSetContent(children[0])) {
    node.role = sre.SemanticAttr.Role.SETSINGLE;
    return;
  }
  var role = children[0].role;
  if (type !== sre.SemanticAttr.Type.PUNCTUATED ||
      role !== sre.SemanticAttr.Role.SEQUENCE) {
    return;
  }
  if (children[0].contentNodes[0].role === sre.SemanticAttr.Role.COMMA) {
    node.role = sre.SemanticAttr.Role.SETCOLLECT;
    return;
  }
  if (children[0].contentNodes.length === 1 &&
      (children[0].contentNodes[0].role === sre.SemanticAttr.Role.VBAR ||
       children[0].contentNodes[0].role === sre.SemanticAttr.Role.COLON)) {
    node.role = sre.SemanticAttr.Role.SETEXT;
    this.setExtension_(node);
    return;
  }
  // TODO (sorge): Intervals after the Bra-Ket heuristic.
};


// TODO: (MS2.3|simons) This is a rather crude heuristic. Should be improved
//       once we have improved triaging of symbols.
//       Also needs unit tests!
/**
 * Classifies content in the extension part of a set. Only works if we have
 * assured that a set is indeed and exteded set.
 * @param {sre.SemanticNode} set A semantic node representing an extended set.
 * @private
 */
sre.SemanticProcessor.prototype.setExtension_ = function(set) {
  var extender = set.childNodes[0].childNodes[0];
  if (extender && extender.type === sre.SemanticAttr.Type.INFIXOP &&
      extender.contentNodes.length === 1 &&
      extender.contentNodes[0].role === sre.SemanticAttr.Role.UNKNOWN
  ) {
    extender.contentNodes[0].role = sre.SemanticAttr.Role.SETEXT;
  }
};


/**
 * Combines sequences of punctuated expressions in a list of nodes.
 * @param {!Array.<sre.SemanticNode>} nodes The list of nodes.
 * @return {!Array.<sre.SemanticNode>} The new list of nodes.
 * @private
 */
sre.SemanticProcessor.prototype.getPunctuationInRow_ = function(nodes) {
  // For now we just make a punctuation node with a particular role. This is
  // similar to an mrow. The only exception are ellipses, which we assume to be
  // in lieu of identifiers.
  // In addition we keep the single punctuation nodes as content.
  if (nodes.length <= 1) {
    return nodes;
  }
  var allowedType = function(x) {
    var type = x.type;
    return type === 'punctuation' || type === 'text' ||
        type === 'operator' || type === 'relation';
  };
  // Partition with improved ellipses handling.
  var partition = sre.SemanticProcessor.partitionNodes_(
      nodes, function(x) {
        if (!sre.SemanticPred.isPunctuation(x)) {
          return false;
        }
        if (sre.SemanticPred.isPunctuation(x) &&
            !sre.SemanticPred.isAttribute('role', 'ELLIPSIS')(x)) {
          return true;
        }
        var index = nodes.indexOf(x);
        if (index === 0) {
          if (nodes[1] && allowedType(nodes[1])) {
            return false;
          }
          return true;
        }
        // We now know the previous element exists
        var prev = nodes[index - 1];
        if (index === nodes.length - 1) {
          if (allowedType(prev)) {
            return false;
          }
          return true;
        }
        // We now know the next element exists
        var next = nodes[index + 1];
        if (allowedType(prev) && allowedType(next)) {
          return false;
        }
        return true;
      });
  if (partition.rel.length === 0) {
    return nodes;
  }
  var newNodes = [];
  var firstComp = partition.comp.shift();
  if (firstComp.length > 0) {
    newNodes.push(sre.SemanticProcessor.getInstance().row(firstComp));
  }
  var relCounter = 0;
  while (partition.comp.length > 0) {
    newNodes.push(partition.rel[relCounter++]);
    firstComp = partition.comp.shift();
    if (firstComp.length > 0) {
      newNodes.push(sre.SemanticProcessor.getInstance().row(firstComp));
    }
  }
  return [
    sre.SemanticProcessor.getInstance().punctuatedNode_(newNodes, partition.rel)
  ];
};


/**
 * Create a punctuated node.
 * @param {!Array.<!sre.SemanticNode>} nodes List of all nodes separated
 * by punctuations.
 * @param {!Array.<!sre.SemanticNode>} punctuations List of all separating
 * punctations. Observe that punctations is a subset of nodes.
 * @return {!sre.SemanticNode}
 * @private
 */
sre.SemanticProcessor.prototype.punctuatedNode_ = function(
    nodes, punctuations) {
  var newNode = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
      sre.SemanticAttr.Type.PUNCTUATED, nodes, punctuations);
  if (punctuations.length === nodes.length) {
    var firstRole = punctuations[0].role;
    if (firstRole !== sre.SemanticAttr.Role.UNKNOWN &&
        punctuations.every(function(punct) {
          return punct.role === firstRole;})) {
      newNode.role = firstRole;
      return newNode;
    }
  }
  if (sre.SemanticPred.singlePunctAtPosition(nodes, punctuations, 0)) {
    newNode.role = sre.SemanticAttr.Role.STARTPUNCT;
  } else if (sre.SemanticPred.singlePunctAtPosition(
      nodes, punctuations, nodes.length - 1)) {
    newNode.role = sre.SemanticAttr.Role.ENDPUNCT;
  } else if (punctuations.every(
      sre.SemanticPred.isAttribute('role', 'DUMMY'))) {
    newNode.role = sre.SemanticAttr.Role.TEXT;
  } else {
    newNode.role = sre.SemanticAttr.Role.SEQUENCE;
  }
  return newNode;
};


/**
 * Create an dummy punctuated node.
 * @param {!Array.<!sre.SemanticNode>} children The child nodes to be
 *     separated by invisible comma.
 * @return {!sre.SemanticNode} The new node.
 * @private
 */
sre.SemanticProcessor.prototype.dummyNode_ = function(children) {
  var commata = sre.SemanticProcessor.getInstance().factory_.
      makeMultipleContentNodes(
      children.length - 1, sre.SemanticAttr.invisibleComma());
  commata.forEach(function(comma) {comma.role = sre.SemanticAttr.Role.DUMMY;});
  return sre.SemanticProcessor.getInstance().punctuatedNode_(children, commata);
};


/**
 * @const {Object.<{type: sre.SemanticAttr.Type, length: number}>}
 * @private
 */
sre.SemanticProcessor.MML_TO_LIMIT_ = {
  'MSUB': {type: sre.SemanticAttr.Type.LIMLOWER, length: 1},
  'MUNDER': {type: sre.SemanticAttr.Type.LIMLOWER, length: 1},
  'MSUP': {type: sre.SemanticAttr.Type.LIMUPPER, length: 1},
  'MOVER': {type: sre.SemanticAttr.Type.LIMUPPER, length: 1},
  'MSUBSUP': {type: sre.SemanticAttr.Type.LIMBOTH, length: 2},
  'MUNDEROVER': {type: sre.SemanticAttr.Type.LIMBOTH, length: 2}
};


/**
 * @const {Object.<{type: sre.SemanticAttr.Type,
 *         length: number, accent: boolean}>}
 * @private
 */
sre.SemanticProcessor.MML_TO_BOUNDS_ = {
  'MSUB': {type: sre.SemanticAttr.Type.SUBSCRIPT, length: 1, accent: false},
  'MSUP': {type: sre.SemanticAttr.Type.SUPERSCRIPT, length: 1, accent: false},
  'MSUBSUP': {type: sre.SemanticAttr.Type.SUBSCRIPT, length: 2, accent: false},
  'MUNDER': {type: sre.SemanticAttr.Type.UNDERSCORE, length: 1, accent: true},
  'MOVER': {type: sre.SemanticAttr.Type.OVERSCORE, length: 1, accent: true},
  'MUNDEROVER': {type: sre.SemanticAttr.Type.UNDERSCORE, length: 2, accent: true}
};


/**
 * Checks if a node is legal accent in a stacked node and sets the accent role
 * wrt. to the parent type.
 * @param {!sre.SemanticNode} node The semantic node.
 * @param {sre.SemanticAttr.Type} type The semantic type of the parent node.
 * @return {boolean} True if node is a legal accent.
 */
sre.SemanticProcessor.prototype.accentRole_ = function(node, type) {
  if (!sre.SemanticPred.isAccent(node)) {
    return false;
  }
  node.role = type === sre.SemanticAttr.Type.UNDERSCORE ?
    sre.SemanticAttr.Role.UNDERACCENT : sre.SemanticAttr.Role.OVERACCENT;
  return true;
};


/**
 * Creates a limit node from a sub/superscript or over/under node if the central
 * element is a big operator. Otherwise it creates the standard elements.
 * @param {string} mmlTag The tag name of the original node.
 * @param {!Array.<!sre.SemanticNode>} children The children of the
 *     original node.
 * @return {!sre.SemanticNode} The newly created limit node.
 */
sre.SemanticProcessor.prototype.limitNode = function(mmlTag, children) {
  if (!children.length) {
    return sre.SemanticProcessor.getInstance().factory_.makeEmptyNode();
  }
  var center = children[0];
  var type = sre.SemanticAttr.Type.UNKNOWN;
  if (!children[1]) {
    return center;
  }

  if (sre.SemanticPred.isLimitBase(center)) {
    var result = sre.SemanticProcessor.MML_TO_LIMIT_[mmlTag];
    var length = result.length;
    type = result.type;
    children = children.slice(0, result.length + 1);
    // Heuristic to deal with accents around limit functions/operators.
    if ((length === 1 && sre.SemanticPred.isAccent(children[1])) ||
        (length === 2 && sre.SemanticPred.isAccent(children[1]) &&
         sre.SemanticPred.isAccent(children[2]))) {
      result = sre.SemanticProcessor.MML_TO_BOUNDS_[mmlTag];
      return this.accentNode_(center, children,
                              result.type, result.length, result.accent);
    }
    if (length === 2) {
      if (sre.SemanticPred.isAccent(children[1])) {
        center = this.accentNode_(
          center, [center, children[1]],
          {'MSUBSUP': sre.SemanticAttr.Type.SUBSCRIPT,
           'MUNDEROVER': sre.SemanticAttr.Type.UNDERSCORE}[mmlTag], 1, true);
        return !children[2] ? center :
          this.makeLimitNode_(center, [center, children[2]], null,
                              sre.SemanticAttr.Type.LIMUPPER);
      }
      if (children[2] && sre.SemanticPred.isAccent(children[2])) {
        center = this.accentNode_(
          center, [center, children[2]],
          {'MSUBSUP': sre.SemanticAttr.Type.SUPERSCRIPT,
           'MUNDEROVER': sre.SemanticAttr.Type.OVERSCORE}[mmlTag], 1, true);
        return this.makeLimitNode_(center, [center, children[1]], null,
                                   sre.SemanticAttr.Type.LIMLOWER);
      }
      // Limit nodes only the number of children has to be restricted.
      if (!children[length]) {
        type = sre.SemanticAttr.Type.LIMLOWER;
      }
    }
    return this.makeLimitNode_(center, children, null, type);
  }
  // We either have an indexed, stacked or accented expression.
  result = sre.SemanticProcessor.MML_TO_BOUNDS_[mmlTag];
  return this.accentNode_(center, children,
                          result.type, result.length, result.accent);
};


/**
 * Creates an accent style node or sub/superscript depending on the given type.
 * @param {!sre.SemanticNode} center The inner center node.
 * @param {!Array.<sre.SemanticNode>} children All children, where center is
 *     first node.
 * @param {sre.SemanticAttr.Type} type The new node type.
 * @param {number} length The exact length for the given type. This is important
 *     in case not enough children exist, then the type has to be changed.
 * @param {boolean} accent Is this an accent node?
 * @return {!sre.SemanticNode} The newly created node.
 */
sre.SemanticProcessor.prototype.accentNode_ = function(
  center, children, type, length, accent) {
  children = children.slice(0, length + 1);
  var child1 = /** @type {!sre.SemanticNode} */(children[1]);
  var child2 = children[2];
  if (!accent && child2) {
    // For indexed we only have to nest if we have two children.
    var innerNode = sre.SemanticProcessor.getInstance().factory_.
        makeBranchNode(sre.SemanticAttr.Type.SUBSCRIPT,
                       [center, child1], []);
    innerNode.role = sre.SemanticAttr.Role.SUBSUP;
    children = [innerNode, child2];
    type = sre.SemanticAttr.Type.SUPERSCRIPT;
  }
  if (accent) {
    // Check if we have stacked or accented expressions (or mix).
    let underAccent = this.accentRole_(child1, type);
    if (child2) {
      let overAccent = this.accentRole_(child2,
                                        sre.SemanticAttr.Type.OVERSCORE);
      if (overAccent && !underAccent) {
        innerNode = sre.SemanticProcessor.getInstance().factory_.
          makeBranchNode(
            sre.SemanticAttr.Type.OVERSCORE, [center, child2], []);
        children = [innerNode, child1];
        type = sre.SemanticAttr.Type.UNDERSCORE;
      } else {
        innerNode = sre.SemanticProcessor.getInstance().factory_.
          makeBranchNode(
            sre.SemanticAttr.Type.UNDERSCORE, [center, child1], []);
        children = [innerNode, child2];
        type = sre.SemanticAttr.Type.OVERSCORE;
      }
      innerNode.role = sre.SemanticAttr.Role.UNDEROVER;
    }
  }
  return this.makeLimitNode_(center, children, innerNode, type);
};


/**
 * Creates the actual limit node.
 * @param {!sre.SemanticNode} center The inner center node.
 * @param {!Array.<sre.SemanticNode>} children All children, where center is
 *     first node.
 * @param {sre.SemanticNode|undefined} innerNode The innermost node if it exists.
 * @param {sre.SemanticAttr.Type} type The new node type.
 * @return {!sre.SemanticNode} The newly created limit node.
 */
sre.SemanticProcessor.prototype.makeLimitNode_ = function(
  center, children, innerNode, type) {
  // These two conditions implement the limitboth heuristic, which works before
  // a new node is created.
  if (type === sre.SemanticAttr.Type.LIMUPPER &&
      center.type === sre.SemanticAttr.Type.LIMLOWER) {
    center.childNodes.push(children[1]);
    children[1].parent = center;
    center.type = sre.SemanticAttr.Type.LIMBOTH;
    return center;
  }
  if (type === sre.SemanticAttr.Type.LIMLOWER &&
      center.type === sre.SemanticAttr.Type.LIMUPPER) {
    center.childNodes.splice(1, -1, children[1]);
    children[1].parent = center;
    center.type = sre.SemanticAttr.Type.LIMBOTH;
    return center;
  }
  var newNode = sre.SemanticProcessor.getInstance().factory_.
      makeBranchNode(type, children, []);
  var embellished = sre.SemanticPred.isEmbellished(center);
  if (innerNode) {
    innerNode.embellished = embellished;
  }
  newNode.embellished = embellished;
  newNode.role = center.role;
  return newNode;
};


/**
 * Recursive method to accumulate function expressions.
 *
 * The idea is to process functions in a row from left to right combining them
 * with their arguments. Thereby we take the notion of a function rather broadly
 * as a functional expressions that consists of a prefix and some arguments.
 * In particular we distinguish four types of functional expressions:
 * - integral: Integral expression.
 * - bigop: A big operator expression like a sum.
 * - prefix: A well defined prefix function such as sin, cos or a limit
 *           functions like lim, max.
 * - simple: An expression consisting of letters that are potentially a function
 *           symbol. If we have an explicit function application symbol
 *           following the expression we turn into a prefix function. Otherwise
 *           we decide heuristically if we could have a function application.
 * @param {!Array.<sre.SemanticNode>} restNodes The remainder list of
 *     nodes.
 * @param {!Array.<sre.SemanticNode>=} opt_result The result node list.
 * @return {!Array.<!sre.SemanticNode>} The fully processed list.
 * @private
 */
sre.SemanticProcessor.prototype.getFunctionsInRow_ = function(
    restNodes, opt_result) {
  var result = opt_result || [];
  // Base case.
  if (restNodes.length === 0) {
    return result;
  }
  var firstNode = /** @type {!sre.SemanticNode} */ (restNodes.shift());
  var heuristic = sre.SemanticProcessor.classifyFunction_(firstNode, restNodes);
  // First node is not a function node.
  if (!heuristic) {
    result.push(firstNode);
    return sre.SemanticProcessor.getInstance().
        getFunctionsInRow_(restNodes, result);
  }
  // Combine functions in the rest of the row.
  var processedRest = sre.SemanticProcessor.getInstance().
          getFunctionsInRow_(restNodes, []);
  var newRest = sre.SemanticProcessor.getInstance().getFunctionArgs_(
      firstNode, processedRest, heuristic);
  return result.concat(newRest);
};


/**
 * @const {Object.<sre.SemanticAttr.Role, string>}
 * @private
 */
sre.SemanticProcessor.CLASSIFY_FUNCTION_ = {};
sre.SemanticProcessor.CLASSIFY_FUNCTION_[sre.SemanticAttr.Role.INTEGRAL] =
    'integral';
sre.SemanticProcessor.CLASSIFY_FUNCTION_[sre.SemanticAttr.Role.SUM] =
    'bigop';
sre.SemanticProcessor.CLASSIFY_FUNCTION_[sre.SemanticAttr.Role.PREFIXFUNC] =
    'prefix';
sre.SemanticProcessor.CLASSIFY_FUNCTION_[sre.SemanticAttr.Role.LIMFUNC] =
    'prefix';
sre.SemanticProcessor.CLASSIFY_FUNCTION_[sre.SemanticAttr.Role.SIMPLEFUNC] =
    'prefix';
sre.SemanticProcessor.CLASSIFY_FUNCTION_[sre.SemanticAttr.Role.COMPFUNC] =
    'prefix';


/**
 * Classifies a function wrt. the heuristic that should be applied.
 * @param {!sre.SemanticNode} funcNode The node to be classified.
 * @param {!Array.<sre.SemanticNode>} restNodes The remainder list of
 *     nodes. They can be useful to look ahead if there is an explicit function
 *     application. If there is one, it will be destructively removed!
 * @return {string} The string specifying the heuristic.
 * @private
 */
sre.SemanticProcessor.classifyFunction_ = function(funcNode, restNodes) {
  //  We do not allow double function application. This is not lambda calculus!
  if (funcNode.type === sre.SemanticAttr.Type.APPL ||
      funcNode.type === sre.SemanticAttr.Type.BIGOP ||
      funcNode.type === sre.SemanticAttr.Type.INTEGRAL) {
    return '';
  }
  // Find and remove explicit function applications.
  // We now treat funcNode as a prefix function, regardless of what its actual
  // content is.
  if (restNodes[0] &&
      restNodes[0].textContent === sre.SemanticAttr.functionApplication()) {
    // Remove explicit function application. This is destructive on the
    // underlying list.
    //
    // TODO (sorge) This should not be destructive! This in particular destroys
    // any information we get on the element. Eg., texclass=NONE.
    restNodes.shift();
    var role = sre.SemanticAttr.Role.SIMPLEFUNC;
    if (funcNode.role === sre.SemanticAttr.Role.PREFIXFUNC ||
        funcNode.role === sre.SemanticAttr.Role.LIMFUNC) {
      role = funcNode.role;
    }
    sre.SemanticProcessor.propagateFunctionRole_(funcNode, role);
    return 'prefix';
  }
  var kind = sre.SemanticProcessor.CLASSIFY_FUNCTION_[funcNode.role];
  return kind ? kind : (
      sre.SemanticPred.isSimpleFunctionHead(funcNode) ? 'simple' : ''
      );
};


/**
 * Propagates a function role in a node.
 * @param {sre.SemanticNode} funcNode The node whose role is to be
 *     rewritten.
 * @param {sre.SemanticAttr.Role} tag The function role to be inserted.
 * @private
 */
sre.SemanticProcessor.propagateFunctionRole_ = function(funcNode, tag) {
  if (funcNode) {
    if (funcNode.type === sre.Semantic.Type.INFIXOP) {
      return;
    }
    if (!(sre.SemanticPred.isAttribute('role', 'SUBSUP')(funcNode) ||
          sre.SemanticPred.isAttribute('role', 'UNDEROVER')(funcNode))) {
      funcNode.role = tag;
    }
    sre.SemanticProcessor.propagateFunctionRole_(funcNode.childNodes[0], tag);
  }
};


/**
 * Computes the arguments for a function from a list of nodes depending on the
 * given heuristic.
 * @param {!sre.SemanticNode} func A function node.
 * @param {!Array.<sre.SemanticNode>} rest List of nodes to choose
 *     arguments from.
 * @param {string} heuristic The heuristic to follow.
 * @return {!Array.<!sre.SemanticNode>} The function and the remainder of
 *     the rest list.
 * @private
 */
sre.SemanticProcessor.prototype.getFunctionArgs_ = function(
    func, rest, heuristic) {
  switch (heuristic) {
    case 'integral':
      var components = sre.SemanticProcessor.getInstance().
          getIntegralArgs_(rest);
      if (!components.intvar && !components.integrand.length) {
        components.rest.unshift(func);
        return components.rest;
      }
      var integrand = sre.SemanticProcessor.getInstance().
          row(components.integrand);
      var funcNode = sre.SemanticProcessor.getInstance().integralNode_(
          func, integrand, components.intvar);
      components.rest.unshift(funcNode);
      return components.rest;
      break;
    case 'prefix':
      if (rest[0] && rest[0].type === sre.SemanticAttr.Type.FENCED) {
        // TODO: (MS2.3|simons) This needs to be made more robust!  Currently we
        //       reset to eliminate sets. Once we include bra-ket heuristics,
        //       this might be incorrect.
        //
        var arg = rest.shift();
        if (arg.role !== sre.SemanticAttr.Role.NEUTRAL) {
          arg.role = sre.SemanticAttr.Role.LEFTRIGHT;
        }
        funcNode = sre.SemanticProcessor.getInstance().functionNode_(
            func, /** @type {!sre.SemanticNode} */ (arg));
        rest.unshift(funcNode);
        return rest;
      }
      var partition = sre.SemanticProcessor.sliceNodes_(
          rest, sre.SemanticPred.isPrefixFunctionBoundary);
      if (!partition.head.length) {
        if (!partition.div ||
            !sre.SemanticPred.isAttribute('type', 'APPL')(partition.div)) {
          rest.unshift(func);
          return rest;
        }
        var arg = partition.div;
      } else {
        arg = sre.SemanticProcessor.getInstance().row(partition.head);
        if (partition.div) {
          partition.tail.unshift(partition.div);
        }
      }
      // TODO: (simons) If we have a prefix/simple function or implicit with
      //       prefix/simple function children only (i.e., a function
      //       composition) then we combine them via a function
      //       composition. Function composition is currently implicit, but we
      //       might want to remember this a bit better.
      funcNode = sre.SemanticProcessor.getInstance().functionNode_(func, arg);
      partition.tail.unshift(funcNode);
      return partition.tail;
      break;
    case 'bigop':
      var partition = sre.SemanticProcessor.sliceNodes_(
          rest, sre.SemanticPred.isBigOpBoundary);
      if (!partition.head.length) {
        rest.unshift(func);
        return rest;
      }
      var arg = sre.SemanticProcessor.getInstance().row(partition.head);
      funcNode = sre.SemanticProcessor.getInstance().bigOpNode_(func, arg);
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
      var firstArg = rest[0];
      if (firstArg.type === sre.SemanticAttr.Type.FENCED &&
          firstArg.role !== sre.SemanticAttr.Role.NEUTRAL &&
          sre.SemanticPred.isSimpleFunctionScope(firstArg)) {
        // TODO: (MS2.3|simons) This needs to be made more robust!  Currently we
        //       reset to eliminate sets. Once we include bra-ket heuristics,
        //       this might be incorrect.
        //
        firstArg.role = sre.SemanticAttr.Role.LEFTRIGHT;
        sre.SemanticProcessor.propagateFunctionRole_(
            func, sre.SemanticAttr.Role.SIMPLEFUNC);
        funcNode = sre.SemanticProcessor.getInstance().functionNode_(
            func, /** @type {!sre.SemanticNode} */ (rest.shift()));
        rest.unshift(funcNode);
        return rest;
      }
      rest.unshift(func);
      return rest;
      break;
  }
};


/**
 * Tail recursive function to obtain integral arguments.
 * @param {!Array.<sre.SemanticNode>} nodes List of nodes to take
 * arguments from.
 * @param {Array.<sre.SemanticNode>=} opt_args List of integral arguments.
 * @return {{integrand: !Array.<sre.SemanticNode>,
 *     intvar: sre.SemanticNode,
 *     rest: !Array.<sre.SemanticNode>}}
 *     Result split into integrand, integral variable and the remaining
 *     elements.
 * @private
 */
sre.SemanticProcessor.prototype.getIntegralArgs_ = function(nodes, opt_args) {
  var args = opt_args || [];
  if (nodes.length === 0) {
    return {integrand: args, intvar: null, rest: nodes};
  }
  var firstNode = nodes[0];
  if (sre.SemanticPred.isGeneralFunctionBoundary(firstNode)) {
    return {integrand: args, intvar: null, rest: nodes};
  }
  if (sre.SemanticPred.isIntegralDxBoundarySingle(firstNode)) {
    firstNode.role = sre.SemanticAttr.Role.INTEGRAL;
    return {integrand: args, intvar: firstNode, rest: nodes.slice(1)};
  }
  if (nodes[1] && sre.SemanticPred.isIntegralDxBoundary(firstNode, nodes[1])) {
    var intvar = sre.SemanticProcessor.getInstance().prefixNode_(
        /** @type {!sre.SemanticNode} */(nodes[1]), [firstNode]);
    intvar.role = sre.SemanticAttr.Role.INTEGRAL;
    return {integrand: args, intvar: intvar, rest: nodes.slice(2)};
  }
  args.push(nodes.shift());
  return sre.SemanticProcessor.getInstance().getIntegralArgs_(nodes, args);
};


/**
 * Create a function node.
 * @param {!sre.SemanticNode} func The function operator.
 * @param {!sre.SemanticNode} arg The argument.
 * @return {!sre.SemanticNode} The new function node.
 * @private
 */
sre.SemanticProcessor.prototype.functionNode_ = function(func, arg) {
  var applNode = sre.SemanticProcessor.getInstance().factory_.makeContentNode(
      sre.SemanticAttr.functionApplication());
  applNode.type = sre.SemanticAttr.Type.PUNCTUATION;
  applNode.role = sre.SemanticAttr.Role.APPLICATION;
  var funcop = sre.SemanticProcessor.getFunctionOp_(
      func, function(node) {
        return sre.SemanticPred.isAttribute('type', 'FUNCTION')(node) ||
            (sre.SemanticPred.isAttribute('type', 'IDENTIFIER')(node) &&
             sre.SemanticPred.isAttribute('role', 'SIMPLEFUNC')(node));
      }
  );
  return sre.SemanticProcessor.getInstance().functionalNode_(
      sre.SemanticAttr.Type.APPL, [func, arg], funcop, [applNode]);
};


/**
 * Create a big operator node.
 * @param {!sre.SemanticNode} bigOp The big operator.
 * @param {!sre.SemanticNode} arg The argument.
 * @return {!sre.SemanticNode} The new big operator node.
 * @private
 */
sre.SemanticProcessor.prototype.bigOpNode_ = function(bigOp, arg) {
  var largeop = sre.SemanticProcessor.getFunctionOp_(
      bigOp, sre.SemanticPred.isAttribute('type', 'LARGEOP'));
  return sre.SemanticProcessor.getInstance().functionalNode_(
      sre.SemanticAttr.Type.BIGOP, [bigOp, arg], largeop, []);
};


/**
 * Create an integral node. It has three children: integral, integrand and
 * integration variable. The latter two can be omitted.
 * @param {!sre.SemanticNode} integral The integral operator.
 * @param {sre.SemanticNode} integrand The integrand.
 * @param {sre.SemanticNode} intvar The integral variable.
 * @return {!sre.SemanticNode} The new integral node.
 * @private
 */
sre.SemanticProcessor.prototype.integralNode_ = function(
    integral, integrand, intvar) {
  integrand = integrand ||
      sre.SemanticProcessor.getInstance().factory_.makeEmptyNode();
  intvar = intvar ||
      sre.SemanticProcessor.getInstance().factory_.makeEmptyNode();
  var largeop = sre.SemanticProcessor.getFunctionOp_(
      integral, sre.SemanticPred.isAttribute('type', 'LARGEOP'));
  return sre.SemanticProcessor.getInstance().functionalNode_(
      sre.SemanticAttr.Type.INTEGRAL,
      [integral, integrand, intvar], largeop, []);
};


/**
 * Creates a functional node, i.e., integral, bigop, simple function. If the
 * operator is given, it takes care that th eoperator is contained as a content
 * node, and that the original parent pointer of the operator node is retained.
 *
 * Example: Function application sin^2(x). The pointer from sin should remain to
 *          the superscript node, although sin is given as a content node.
 * @param {!sre.SemanticAttr.Type} type The type of the node.
 * @param {!Array.<!sre.SemanticNode>} children The children of the
 *     functional node. The first child must be given is understood to be the
 *     functional operator.
 * @param {?sre.SemanticNode} operator The innermost operator (e.g., in the
 *     case of embellished functions or operators with limits).
 * @param {!Array.<sre.SemanticNode>} content The list of additional
 *     content nodes.
 * @return {!sre.SemanticNode} The new functional node.
 * @private
 */
sre.SemanticProcessor.prototype.functionalNode_ = function(
    type, children, operator, content) {
  var funcop = children[0];
  if (operator) {
    var oldParent = operator.parent;
    content.push(operator);
  }
  var newNode = sre.SemanticProcessor.getInstance().factory_.
      makeBranchNode(type, children, content);
  newNode.role = funcop.role;
  if (oldParent) {
    operator.parent = oldParent;
  }
  return newNode;
};


/**
 * Finds the function operator in a partial semantic tree if it exists.
 * @param {!sre.SemanticNode} tree The partial tree.
 * @param {function(sre.SemanticNode): boolean} pred Predicate for the
 *    function operator.
 * @return {sre.SemanticNode} The function operator.
 * @private
 */
sre.SemanticProcessor.getFunctionOp_ = function(tree, pred) {
  if (pred(tree)) {
    return tree;
  }
  for (var i = 0, child; child = tree.childNodes[i]; i++) {
    var op = sre.SemanticProcessor.getFunctionOp_(child, pred);
    if (op) {
      return op;
    }
  }
  return null;
};


// Improve table recognition, multiline alignments for pausing.
// Maybe labels, interspersed text etc.
//
/**
 * Rewrites tables into matrices or case statements in a list of nodes.
 * @param {!Array.<!sre.SemanticNode>} nodes List of nodes to rewrite.
 * @return {!Array.<!sre.SemanticNode>} The new list of nodes.
 */
sre.SemanticProcessor.prototype.tablesInRow = function(nodes) {
  // First we process all matrices:
  var partition = sre.SemanticProcessor.partitionNodes_(
      nodes, sre.SemanticPred.tableIsMatrixOrVector);
  var result = [];
  for (var i = 0, matrix; matrix = partition.rel[i]; i++) {
    result = result.concat(partition.comp.shift());
    result.push(sre.SemanticProcessor.tableToMatrixOrVector_(matrix));
  }
  result = result.concat(partition.comp.shift());
  // Process the remaining tables for cases.
  partition = sre.SemanticProcessor.partitionNodes_(
      result, sre.SemanticPred.isTableOrMultiline);
  result = [];
  for (var i = 0, table; table = partition.rel[i]; i++) {
    var prevNodes = partition.comp.shift();
    if (sre.SemanticPred.tableIsCases(table, prevNodes)) {
      sre.SemanticProcessor.tableToCases_(
          table, /** @type {!sre.SemanticNode} */ (prevNodes.pop()));
    }
    result = result.concat(prevNodes);
    result.push(table);
  }
  return result.concat(partition.comp.shift());
};


/**
 * Replaces a fenced node by a matrix or vector node and possibly specialises
 * it's role.
 * @param {!sre.SemanticNode} node The fenced node to be rewritten.
 * @return {!sre.SemanticNode} The matrix or vector node.
 * @private
 */
sre.SemanticProcessor.tableToMatrixOrVector_ = function(node) {
  var matrix = node.childNodes[0];
  sre.SemanticPred.isAttribute('type', 'MULTILINE')(matrix) ?
      sre.SemanticProcessor.tableToVector_(node) :
      sre.SemanticProcessor.tableToMatrix_(node);
  node.contentNodes.forEach(goog.bind(matrix.appendContentNode, matrix));
  for (var i = 0, row; row = matrix.childNodes[i]; i++) {
    sre.SemanticProcessor.assignRoleToRow_(
        row, sre.SemanticProcessor.getComponentRoles_(matrix));
  }
  matrix.parent = null;
  return matrix;
};


/**
 * Assigns a specialised roles to a vector node inside the given fenced node.
 * @param {!sre.SemanticNode} node The fenced node containing the vector.
 * @private
 */
sre.SemanticProcessor.tableToVector_ = function(node) {
  var vector = node.childNodes[0];
  vector.type = sre.SemanticAttr.Type.VECTOR;
  if (vector.childNodes.length === 1) {
    sre.SemanticProcessor.tableToSquare_(node);
    return;
  }
  sre.SemanticProcessor.binomialForm_(vector);
};


/**
 * Assigns a binomial role if a table consists of two lines only.
 * @param {!sre.SemanticNode} node The table node.
 * @private
 */
sre.SemanticProcessor.binomialForm_ = function(node) {
  if (sre.SemanticPred.isBinomial(node)) {
    node.role = sre.SemanticAttr.Role.BINOMIAL;
    node.childNodes[0].role = sre.SemanticAttr.Role.BINOMIAL;
    node.childNodes[1].role = sre.SemanticAttr.Role.BINOMIAL;
  }
};


/**
 * Assigns a specialised roles to a matrix node inside the given fenced node.
 * @param {!sre.SemanticNode} node The fenced node containing the matrix.
 * @private
 */
sre.SemanticProcessor.tableToMatrix_ = function(node) {
  var matrix = node.childNodes[0];
  matrix.type = sre.SemanticAttr.Type.MATRIX;
  if (matrix.childNodes && matrix.childNodes.length > 0 &&
      matrix.childNodes[0].childNodes &&
      matrix.childNodes.length === matrix.childNodes[0].childNodes.length) {
    sre.SemanticProcessor.tableToSquare_(node);
    return;
  }
  if (matrix.childNodes && matrix.childNodes.length === 1) {
    matrix.role = sre.SemanticAttr.Role.ROWVECTOR;
  }
};


/**
 * Assigns a role to a square, fenced table.
 * @param {!sre.SemanticNode} node The fenced node containing a square
 *     table.
 * @private
 */
sre.SemanticProcessor.tableToSquare_ = function(node) {
  var matrix = node.childNodes[0];
  if (sre.SemanticPred.isAttribute('role', 'NEUTRAL')(node)) {
    matrix.role = sre.SemanticAttr.Role.DETERMINANT;
    return;
  }
  matrix.role = sre.SemanticAttr.Role.SQUAREMATRIX;
};


/**
 * Cmoputes the role for the components of a matrix. It is either the role of
 * that matrix or its type.
 * @param {!sre.SemanticNode} node The matrix or vector node.
 * @return {!sre.SemanticAttr.Role} The role to be assigned to the components.
 * @private
 */
sre.SemanticProcessor.getComponentRoles_ = function(node) {
  var role = node.role;
  if (role && role !== sre.SemanticAttr.Role.UNKNOWN) {
    return role;
  }
  return sre.SemanticAttr.Role[node.type.toUpperCase()] ||
      sre.SemanticAttr.Role.UNKNOWN;
};


/**
 * Makes case node out of a table and a fence.
 * @param {!sre.SemanticNode} table The table containing the cases.
 * @param {!sre.SemanticNode} openFence The left delimiter of the case
 *     statement.
 * @return {!sre.SemanticNode} The cases node.
 * @private
 */
sre.SemanticProcessor.tableToCases_ = function(table, openFence) {
  for (var i = 0, row; row = table.childNodes[i]; i++) {
    sre.SemanticProcessor.assignRoleToRow_(row, sre.SemanticAttr.Role.CASES);
  }
  table.type = sre.SemanticAttr.Type.CASES;
  table.appendContentNode(openFence);
  if (sre.SemanticPred.tableIsMultiline(table)) {
    sre.SemanticProcessor.binomialForm_(table);
  }
  return table;
};


/**
 * Rewrites a table to multiline structure, simplifying it by getting rid of the
 * cell hierarchy level.
 * @param {!sre.SemanticNode} table The node to be rewritten a multiline.
 */
sre.SemanticProcessor.tableToMultiline = function(table) {
  if (!sre.SemanticPred.tableIsMultiline(table)) {
    sre.SemanticProcessor.classifyTable(table);
    return;
  }
  table.type = sre.SemanticAttr.Type.MULTILINE;
  for (var i = 0, row; row = table.childNodes[i]; i++) {
    sre.SemanticProcessor.rowToLine_(row, sre.SemanticAttr.Role.MULTILINE);
  }
  if (table.childNodes.length === 1 &&
      sre.SemanticPred.isFencedElement(table.childNodes[0].childNodes[0])) {
    sre.SemanticProcessor.tableToMatrixOrVector_(
        sre.SemanticProcessor.rewriteFencedLine_(table));
  }
  sre.SemanticProcessor.binomialForm_(table);
  sre.SemanticProcessor.classifyMultiline(table);
};


// TODO: (Simons) Is this heuristic really what we want? Make it selectable?
/**
 * Heuristic to rewrite a single fenced line in a table into a square matrix.
 * @param {!sre.SemanticNode} table The node to be rewritten.
 * @return {!sre.SemanticNode} The rewritten node.
 * @private
 */
sre.SemanticProcessor.rewriteFencedLine_ = function(table) {
  var line = table.childNodes[0];
  var fenced = table.childNodes[0].childNodes[0];
  var element = table.childNodes[0].childNodes[0].childNodes[0];
  fenced.parent = table.parent;
  table.parent = fenced;
  element.parent = line;
  fenced.childNodes = [table];
  line.childNodes = [element];
  return fenced;
};


/**
 * Converts a row that only contains one cell into a single line.
 * @param {!sre.SemanticNode} row The row to convert.
 * @param {sre.SemanticAttr.Role=} opt_role The new role for the line.
 * @private
 */
sre.SemanticProcessor.rowToLine_ = function(row, opt_role) {
  var role = opt_role || sre.SemanticAttr.Role.UNKNOWN;
  if (sre.SemanticPred.isAttribute('type', 'ROW')(row)) {
    row.type = sre.SemanticAttr.Type.LINE;
    row.role = role;
    if (row.childNodes.length === 1 &&
        sre.SemanticPred.isAttribute('type', 'CELL')(row.childNodes[0])) {
      row.childNodes = row.childNodes[0].childNodes;
      row.childNodes.forEach(function(x) {x.parent = row;});
    }
  }
};


/**
 * Assign a row and its contained cells a new role value.
 * @param {!sre.SemanticNode} row The row to be updated.
 * @param {!sre.SemanticAttr.Role} role The new role for the row and its cells.
 * @private
 */
sre.SemanticProcessor.assignRoleToRow_ = function(row, role) {
  if (sre.SemanticPred.isAttribute('type', 'LINE')(row)) {
    row.role = role;
    return;
  }
  if (sre.SemanticPred.isAttribute('type', 'ROW')(row)) {
    row.role = role;
    var cellPred = sre.SemanticPred.isAttribute('type', 'CELL');
    row.childNodes.forEach(function(cell) {
      if (cellPred(cell)) {
        cell.role = role;
      }
    });
  }
};


/**
 * Splits a list of nodes wrt. to a given predicate.
 * @param {Array.<sre.SemanticNode>} nodes A list of nodes.
 * @param {function(sre.SemanticNode): boolean} pred Predicate for the
 *    partitioning relation.
 * @param {boolean=} opt_reverse If true slicing is done from the end.
 * @return {{head: !Array.<sre.SemanticNode>,
 *           div: sre.SemanticNode,
 *           tail: !Array.<sre.SemanticNode>}} The split list.
 * @private
 */
sre.SemanticProcessor.sliceNodes_ = function(nodes, pred, opt_reverse) {
  if (opt_reverse) {
    nodes.reverse();
  }
  var head = [];
  for (var i = 0, node; node = nodes[i]; i++) {
    if (pred(node)) {
      if (opt_reverse) {
        return {head: nodes.slice(i + 1).reverse(),
          div: node,
          tail: head.reverse()};
      }
      return {head: head,
        div: node,
        tail: nodes.slice(i + 1)};
    }
    head.push(node);
  }
  if (opt_reverse) {
    return {head: [], div: null, tail: head.reverse()};
  }
  return {head: head, div: null, tail: []};
};


/**
 * Partitions a list of nodes wrt. to a given predicate. Effectively works like
 * a PER on the ordered set of nodes.
 * @param {!Array.<!sre.SemanticNode>} nodes A list of nodes.
 * @param {function(sre.SemanticNode): boolean} pred Predicate for the
 *    partitioning relation.
 * @return {{rel: !Array.<sre.SemanticNode>,
 *           comp: !Array.<!Array.<sre.SemanticNode>>}}
 *    The partitioning given in terms of a collection of elements satisfying
 *    the predicate and a collection of complementary sets lying inbetween the
 *    related elements. Observe that we always have |comp| = |rel| + 1.
 *
 * Example: On input [a, r_1, b, c, r_2, d, e, r_3] where P(r_i) holds, we
 *    get as output: {rel: [r_1, r_2, r_3], comp: [[a], [b, c], [d, e], []].
 * @private
 */
sre.SemanticProcessor.partitionNodes_ = function(nodes, pred) {
  var restNodes = nodes;
  var rel = [];
  var comp = [];

  do {
    var result = sre.SemanticProcessor.sliceNodes_(restNodes, pred);
    comp.push(result.head);
    rel.push(result.div);
    restNodes = result.tail;
  } while (result.div);
  rel.pop();
  return {rel: rel, comp: comp};
};


/**
 * Process an fenced node, effectively given in an mfenced style.
 * @param {?string} open Textual representation of the opening fence.
 * @param {?string} close Textual representation of the closing fence.
 * @param {?string} sepValue Textual representation of separators.
 * @param {!Array.<sre.SemanticNode>} children List of already translated
 *     children.
 * @return {!sre.SemanticNode} The semantic node.
 */
sre.SemanticProcessor.prototype.mfenced = function(
    open, close, sepValue, children) {
  if (sepValue && children.length > 0) {
    var separators = sre.SemanticProcessor.nextSeparatorFunction_(sepValue);
    var newChildren = [children.shift()];
    children.forEach(goog.bind(function(child) {
      newChildren.push(sre.SemanticProcessor.getInstance().factory_.
          makeContentNode(separators()));
      newChildren.push(child);
    }, this));
    children = newChildren;
  }
  // If both open and close are given, we assume those elements to be fences,
  // regardless of their initial semantic interpretation. However, if only one
  // of the fences is given we do not explicitly interfere with the semantic
  // interpretation. In other worde the mfence is ignored and the content is
  // interpreted as usual. The only effect of the mfence node here is that the
  // content will be interpreted into a single node.
  if (open && close) {
    return sre.SemanticProcessor.getInstance().horizontalFencedNode_(
        sre.SemanticProcessor.getInstance().factory_.makeContentNode(open),
        sre.SemanticProcessor.getInstance().factory_.makeContentNode(close),
        children);
  }
  if (open) {
    children.unshift(sre.SemanticProcessor.getInstance().factory_.
        makeContentNode(open));
  }
  if (close) {
    children.push(sre.SemanticProcessor.getInstance().factory_.
        makeContentNode(close));
  }
  return sre.SemanticProcessor.getInstance().row(children);
};


/**
 * Constructs a closure that returns separators for an MathML mfenced
 * expression.
 * Separators in MathML are represented by a list and used up one by one
 * until the final element is used as the default.
 * Example: a b c d e  and separators [+,-,*]
 * would result in a + b - c * d * e.
 * @param {string} separators String representing a list of mfenced separators.
 * @return {?function(): string} A closure that returns the next separator
 * for an mfenced expression starting with the first node in nodes.
 * @private
 */
sre.SemanticProcessor.nextSeparatorFunction_ = function(separators) {
  if (separators) {
    // Mathjax does not expand empty separators.
    if (separators.match(/^\s+$/)) {
      return null;
    } else {
      var sepList = separators.replace(/\s/g, '')
          .split('')
              .filter(function(x) {return x;});
    }
  } else {
    // When no separator is given MathML uses comma as default.
    var sepList = [','];
  }

  return function() {
    if (sepList.length > 1) {
      return sepList.shift();
    }
    return sepList[0];
  };
};


/**
 * Processes a number node and adapts its role and font if necessary.
 * @param {!sre.SemanticNode} node The semantic tree node.
 */
sre.SemanticProcessor.number = function(node) {
  if (node.type === sre.SemanticAttr.Type.UNKNOWN ||
      // In case of latin numbers etc.
      node.type === sre.SemanticAttr.Type.IDENTIFIER) {
    node.type = sre.SemanticAttr.Type.NUMBER;
  }
  sre.SemanticProcessor.numberRole_(node);
  sre.SemanticProcessor.exprFont_(node);
};


/**
 * Compute the role of a number if it does not have one already.
 * @param {!sre.SemanticNode} node The semantic tree node.
 * @private
 */
sre.SemanticProcessor.numberRole_ = function(node) {
  if (node.role !== sre.SemanticAttr.Role.UNKNOWN) {
    return;
  }
  var content = sre.SemanticUtil.splitUnicode(node.textContent);
  var meaning = content.map(sre.SemanticAttr.lookupMeaning);
  if (meaning.every(function(x) {
    return (x.type === sre.SemanticAttr.Type.NUMBER &&
            x.role === sre.SemanticAttr.Role.INTEGER) ||
        (x.type === sre.SemanticAttr.Type.PUNCTUATION &&
        x.role === sre.SemanticAttr.Role.COMMA);})) {
    node.role = content[0] === '0' ? sre.SemanticAttr.Role.OTHERNUMBER :
      sre.SemanticAttr.Role.INTEGER;
    return; }
  if (meaning.every(function(x) {
    return (x.type === sre.SemanticAttr.Type.NUMBER &&
            x.role === sre.SemanticAttr.Role.INTEGER) ||
        x.type === sre.SemanticAttr.Type.PUNCTUATION;})) {
    node.role = sre.SemanticAttr.Role.FLOAT;
    return; }
  node.role = sre.SemanticAttr.Role.OTHERNUMBER;
};


/**
 * Updates the font of a node if a single font can be determined.
 * @param {!sre.SemanticNode} node The semantic tree node.
 * @private
 */
sre.SemanticProcessor.exprFont_ = function(node) {
  if (node.font !== sre.SemanticAttr.Font.UNKNOWN) {
    return;
  }
  var content = sre.SemanticUtil.splitUnicode(node.textContent);
  var meaning = content.map(sre.SemanticAttr.lookupMeaning);
  var singleFont = meaning.reduce(
      function(prev, curr) {
        if (!prev || !curr.font ||
            curr.font === sre.SemanticAttr.Font.UNKNOWN ||
            curr.font === prev) {
          return prev;
        }
        if (prev === sre.SemanticAttr.Font.UNKNOWN) {
          return curr.font;
        }
        return null;
      },
      sre.SemanticAttr.Font.UNKNOWN);
  if (singleFont) {
    node.font = singleFont;
  }
};


/**
 * Creates a fraction node with the appropriate role.
 * @param {!sre.SemanticNode} denom The denominator node.
 * @param {!sre.SemanticNode} enume The enumerator node.
 * @param {string} linethickness The line thickness attribute value.
 * @param {boolean} bevelled Is it a bevelled fraction?
 * @return {!sre.SemanticNode} The new fraction node.
 */
sre.SemanticProcessor.prototype.fractionLikeNode = function(
    denom, enume, linethickness, bevelled) {
  if (!bevelled && sre.SemanticUtil.isZeroLength(linethickness)) {
    var child0 = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
        sre.SemanticAttr.Type.LINE, [denom], []);
    var child1 = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
        sre.SemanticAttr.Type.LINE, [enume], []);
    var node = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
        sre.SemanticAttr.Type.MULTILINE, [child0, child1], []);
    sre.SemanticProcessor.binomialForm_(node);
    sre.SemanticProcessor.classifyMultiline(node);
    return node;
    // return sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
    //     sre.SemanticAttr.Type.MULTILINE, [child0, child1], []);
  } else {
    node = sre.SemanticProcessor.getInstance().fractionNode_(denom, enume);
    if (bevelled) {
      node.addAnnotation('general', 'bevelled');
    }
    return node;
  }
};


/**
 * Creates a fraction node with the appropriate role.
 * @param {!sre.SemanticNode} denom The denominator node.
 * @param {!sre.SemanticNode} enume The enumerator node.
 * @return {!sre.SemanticNode} The new fraction node.
 * @private
 */
sre.SemanticProcessor.prototype.fractionNode_ = function(denom, enume) {
  var newNode = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
      sre.SemanticAttr.Type.FRACTION, [denom, enume], []);
  newNode.role = newNode.childNodes.every(function(x) {
    return sre.SemanticPred.isAttribute('type', 'NUMBER')(x) &&
        sre.SemanticPred.isAttribute('role', 'INTEGER')(x);
  }) ? sre.SemanticAttr.Role.VULGAR :
      newNode.childNodes.every(sre.SemanticPred.isPureUnit) ?
      sre.SemanticAttr.Role.UNIT : sre.SemanticAttr.Role.DIVISION;
  return sre.SemanticHeuristics.run('propagateSimpleFunction', newNode);
};


/**
 * Create a tensor node.
 * @param {!sre.SemanticNode} base The base node.
 * @param {!Array.<sre.SemanticNode>} lsub The left subscripts.
 * @param {!Array.<sre.SemanticNode>} lsup The left superscripts.
 * @param {!Array.<sre.SemanticNode>} rsub The right subscripts.
 * @param {!Array.<sre.SemanticNode>} rsup The right superscripts.
 * @return {!sre.SemanticNode} The semantic tensor node.
 */
sre.SemanticProcessor.prototype.tensor = function(
    base, lsub, lsup, rsub, rsup) {
  var newNode = sre.SemanticProcessor.getInstance().factory_.makeBranchNode(
      sre.SemanticAttr.Type.TENSOR,
      [
       base,
       sre.SemanticProcessor.getInstance().scriptNode_(
       lsub, sre.SemanticAttr.Role.LEFTSUB),
        sre.SemanticProcessor.getInstance().scriptNode_(
       lsup, sre.SemanticAttr.Role.LEFTSUPER),
        sre.SemanticProcessor.getInstance().scriptNode_(
       rsub, sre.SemanticAttr.Role.RIGHTSUB),
        sre.SemanticProcessor.getInstance().scriptNode_(
       rsup, sre.SemanticAttr.Role.RIGHTSUPER)
      ],
      []);
  newNode.role = base.role;
  newNode.embellished = sre.SemanticPred.isEmbellished(base);
  return newNode;
};


/**
 * Creates a limit node from an original mmultiscript node, that only has
 * non-empty right sub and superscript elements.
 * @param {!sre.SemanticNode} base The base node.
 * @param {!Array.<sre.SemanticNode>} sub The subscripts.
 * @param {!Array.<sre.SemanticNode>} sup The superscripts.
 * @return {!sre.SemanticNode} The semantic tensor node.
 */
sre.SemanticProcessor.prototype.pseudoTensor = function(base, sub, sup) {
  var isEmpty = function(x) {
    return !sre.SemanticPred.isAttribute('type', 'EMPTY')(x);
  };
  var nonEmptySub = sub.filter(isEmpty).length;
  var nonEmptySup = sup.filter(isEmpty).length;
  if (!nonEmptySub && !nonEmptySup) {
    return base;
  }
  var mmlTag = nonEmptySub ? (nonEmptySup ? 'MSUBSUP' : 'MSUB') : 'MSUP';
  var mmlchild = [base];
  if (nonEmptySub) {
    mmlchild.push(sre.SemanticProcessor.getInstance().scriptNode_(
        sub, sre.SemanticAttr.Role.RIGHTSUB, true));
  }
  if (nonEmptySup) {
    mmlchild.push(sre.SemanticProcessor.getInstance().scriptNode_(
        sup, sre.SemanticAttr.Role.RIGHTSUPER, true));
  }
  return sre.SemanticProcessor.getInstance().limitNode(mmlTag, mmlchild);
};


/**
 * Creates a script node for a tensor, which is effectively a dummy punctuation.
 * @param {!Array.<!sre.SemanticNode>} nodes A list of unprocessed nodes for
 *      that script.
 * @param {sre.SemanticAttr.Role} role The role of the dummy node.
 * @param {boolean=} opt_noSingle Flag indicating whether role should be set
 *      for a single node.
 * @return {!sre.SemanticNode} The semantic tensor node.
 * @private
 */
sre.SemanticProcessor.prototype.scriptNode_ = function(
    nodes, role, opt_noSingle) {
  switch (nodes.length) {
    case 0:
      var newNode = sre.SemanticProcessor.getInstance().factory_.
          makeEmptyNode();
      break;
    case 1:
      newNode = nodes[0];
      if (opt_noSingle) {
        return newNode;
      }
      break;
    default:
      newNode = sre.SemanticProcessor.getInstance().dummyNode_(nodes);
  }
  newNode.role = role;
  return newNode;
};


/**
 * Rewrites a fences partition to remove non-eligible embellished fences.
 * It rewrites all other fences into punctuations.
 * For eligibility see sre.SemanticPred.isElligibleEmbellishedFence
 * @param {{rel: !Array.<sre.SemanticNode>,
 *          comp: !Array.<!Array.<sre.SemanticNode>>}} partition
 *        A partition for fences.
 * @return {{rel: !Array.<sre.SemanticNode>,
 *           comp: !Array.<!Array.<sre.SemanticNode>>}}
 *    The cleansed partition.
 * @private
 */
sre.SemanticProcessor.purgeFences_ = function(partition) {
  var rel = partition.rel;
  var comp = partition.comp;
  var newRel = [];
  var newComp = [];

  while (rel.length > 0) {
    var currentRel = rel.shift();
    var currentComp = comp.shift();
    if (sre.SemanticPred.isElligibleEmbellishedFence(currentRel)) {
      newRel.push(currentRel);
      newComp.push(currentComp);
      continue;
    }
    sre.SemanticProcessor.fenceToPunct_(currentRel);
    currentComp.push(currentRel);
    currentComp = currentComp.concat(comp.shift());
    comp.unshift(currentComp);
  }
  newComp.push(comp.shift());
  return {rel: newRel, comp: newComp};
};


/**
 * Rewrites a fenced node by pulling some embellishments from fences to the
 * outside.
 * @param {!sre.SemanticNode} fenced The fenced node.
 * @return {!sre.SemanticNode} The rewritten node.
 * @private
 */
sre.SemanticProcessor.rewriteFencedNode_ = function(fenced) {
  var ofence = /** @type {!sre.SemanticNode} */ (fenced.contentNodes[0]);
  var cfence = /** @type {!sre.SemanticNode} */ (fenced.contentNodes[1]);
  var rewritten = sre.SemanticProcessor.rewriteFence_(fenced, ofence);
  fenced.contentNodes[0] = rewritten.fence;
  rewritten = sre.SemanticProcessor.rewriteFence_(rewritten.node, cfence);
  fenced.contentNodes[1] = rewritten.fence;
  fenced.contentNodes[0].parent = fenced;
  fenced.contentNodes[1].parent = fenced;
  rewritten.node.parent = null;
  return rewritten.node;
};


/**
 * Rewrites a fence by removing embellishments and putting them around the
 * node. The only embellishments that are not pulled out are overscore and
 * underscore.
 * @param {!sre.SemanticNode} node The original fenced node.
 * @param {!sre.SemanticNode} fence The fence node.
 * @return {{node: !sre.SemanticNode,
 *           fence: !sre.SemanticNode}} The rewritten node and fence.
 * @private
 */
// TODO (sorge) Maybe remove the superfluous MathML element.
sre.SemanticProcessor.rewriteFence_ = function(node, fence) {
  if (!fence.embellished) {
    return {node: node, fence: fence};
  }
  var newFence = /** @type {!sre.SemanticNode} */(fence.childNodes[0]);
  var rewritten = sre.SemanticProcessor.rewriteFence_(node, newFence);
  if (sre.SemanticPred.isAttribute('type', 'SUPERSCRIPT')(fence) ||
      sre.SemanticPred.isAttribute('type', 'SUBSCRIPT')(fence) ||
      sre.SemanticPred.isAttribute('type', 'TENSOR')(fence)) {
    // Fence is embellished and needs to be rewritten.
    if (!sre.SemanticPred.isAttribute('role', 'SUBSUP')(fence)) {
      fence.role = node.role;
    }
    if (newFence !== rewritten.node) {
      fence.replaceChild(newFence, rewritten.node);
      newFence.parent = node;
    }
    sre.SemanticProcessor.propagateFencePointer_(fence, newFence);
    return {node: fence, fence: rewritten.fence};
  }
  fence.replaceChild(newFence, rewritten.fence);
  if (fence.mathmlTree && fence.mathml.indexOf(fence.mathmlTree) === -1) {
    fence.mathml.push(fence.mathmlTree);
  }
  return {node: rewritten.node, fence: fence};
};


/**
 * Propagates the fence pointer, that is, the embellishing node links to the
 * actual fence it embellishes. If the link is valid on the new node, the old
 * node will point to that link as well. Note, that this fence might still be
 * embellished itself, e.g. with under or overscore.
 * @param {!sre.SemanticNode} oldNode The old embellished node.
 * @param {!sre.SemanticNode} newNode The new embellished node.
 * @private
 */
sre.SemanticProcessor.propagateFencePointer_ = function(oldNode, newNode) {
  oldNode.fencePointer = newNode.fencePointer || newNode.id.toString();
  oldNode.embellished = null;
};


/**
 * Semantically classifies a multiline table in terms of equation system it
 * might be.
 * @param {!sre.SemanticNode} multiline A multiline expression.
 */
sre.SemanticProcessor.classifyMultiline = function(multiline) {
  var index = 0;
  var length = multiline.childNodes.length;
  var line;
  while (index < length &&
         (!(line = multiline.childNodes[index]) || !line.childNodes.length)) {
    index++;
  }
  if (index >= length) return;
  var firstRole = line.childNodes[0].role;
  if (firstRole !== sre.SemanticAttr.Role.UNKNOWN &&
      multiline.childNodes.every(function(x) {
        var cell = x.childNodes[0];
        return !cell || (cell.role === firstRole &&
        (sre.SemanticPred.isAttribute('type', 'RELATION')(cell) ||
        sre.SemanticPred.isAttribute('type', 'RELSEQ')(cell)));
      })) {
    multiline.role = firstRole;
  }
};


/**
 * Semantically classifies a table in terms of equation system it might be.
 * @param {!sre.SemanticNode} table The table node.
 */
sre.SemanticProcessor.classifyTable = function(table) {
  var columns = sre.SemanticProcessor.computeColumns_(table);
  sre.SemanticProcessor.classifyByColumns_(table, columns, 'EQUALITY') ||
      sre.SemanticProcessor.classifyByColumns_(
      table, columns, 'INEQUALITY', ['EQUALITY']) ||
      sre.SemanticProcessor.classifyByColumns_(table, columns, 'ARROW');
};


/**
 * Classifies table by columns and a given relation.
 * @param {!sre.SemanticNode} table The table node.
 * @param {!Array.<!Array.<!sre.SemanticNode>>} columns The columns.
 * @param {string} relation The main relation to classify.
 * @param {Array.<string>=} opt_alternatives Alternative relations that are
 *     permitted in addition to the main relation.
 * @return {boolean} True if classification was successful.
 * @private
 */
sre.SemanticProcessor.classifyByColumns_ = function(
    table, columns, relation, opt_alternatives) {
  // TODO: For more complex systems, work with permutations/alternations of
  // column indices.
  var test1 = function(x) {
    return sre.SemanticProcessor.isPureRelation_(x, relation);
  };
  var test2 = function(x) {
    return sre.SemanticProcessor.isEndRelation_(x, relation) ||
        sre.SemanticProcessor.isPureRelation_(x, relation);
  };
  var test3 = function(x) {
    return sre.SemanticProcessor.isEndRelation_(x, relation, true) ||
        sre.SemanticProcessor.isPureRelation_(x, relation);
  };

  if ((columns.length === 3 &&
       sre.SemanticProcessor.testColumns_(columns, 1, test1)) ||
      (columns.length === 2 &&
       (sre.SemanticProcessor.testColumns_(columns, 1, test2) ||
        sre.SemanticProcessor.testColumns_(columns, 0, test3)))) {
    table.role = sre.SemanticAttr.Role[relation];
    return true;
  }
  return false;
};


/**
 * Check for a particular end relations, i.e., either a sole relation symbols or
 * the relation ends in an side.
 * @param {!sre.SemanticNode} node The node.
 * @param {string} relation The relation to be tested.
 * @param {boolean=} opt_right From the right side?
 * @return {boolean} True if the node is an end relation.
 * @private
 */
sre.SemanticProcessor.isEndRelation_ = function(node, relation, opt_right) {
  var position = opt_right ? node.childNodes.length - 1 : 0;
  return sre.SemanticPred.isAttribute('type', 'RELSEQ')(node) &&
      sre.SemanticPred.isAttribute('role', relation)(node) &&
      sre.SemanticPred.isAttribute('type', 'EMPTY')(node.childNodes[position]);
};


/**
 * Check for a particular relations.
 * @param {!sre.SemanticNode} node The node.
 * @param {string} relation The relation to be tested.
 * @return {boolean} True if the node is an end relation.
 * @private
 */
sre.SemanticProcessor.isPureRelation_ = function(node, relation) {
  return sre.SemanticPred.isAttribute('type', 'RELATION')(node) &&
      sre.SemanticPred.isAttribute('role', relation)(node);
};


/**
 * Computes columns from a table. Note that the columns are reduced, i.e., empty
 * cells are simply omitted. Consequently, rows are not preserved, i.e.,
 * elements at the same index in different columns are not necessarily in the
 * same row in the original table!
 * @param {!sre.SemanticNode} table The table node.
 * @return {!Array.<!Array.<!sre.SemanticNode>>} The columns.
 * @private
 */
sre.SemanticProcessor.computeColumns_ = function(table) {
  var columns = [];
  for (var i = 0, row; row = table.childNodes[i]; i++) {
    for (var j = 0, cell; cell = row.childNodes[j]; j++) {
      var column = columns[j];
      column ? columns[j].push(cell) : (columns[j] = [cell]);
    }
  }
  return columns;
};


/**
 * Test if all elements in the i-th column have the same property.
 * @param {!Array.<!Array.<!sre.SemanticNode>>} columns The columns.
 * @param {number} index The column to be tested.
 * @param {function(!sre.SemanticNode): boolean} pred Predicate to test against.
 * @return {boolean} True if all elements of the given column satisfy pred.
 * @private
 */
sre.SemanticProcessor.testColumns_ = function(columns, index, pred) {
  var column = columns[index];
  return column ?
      (column.some(function(cell) {
        return cell.childNodes.length &&
           pred(/** @type {!sre.SemanticNode} */ (cell.childNodes[0]));}) &&
      column.every(function(cell) {
        return !cell.childNodes.length ||
           pred(/** @type {!sre.SemanticNode} */ (cell.childNodes[0]));})) :
      false;
};


/**
 * Maps mathjax font variants to semantic font names.
 * @type {Object.<sre.SemanticAttr.Font>}
 */
sre.SemanticProcessor.MATHJAX_FONTS = {
  '-tex-caligraphic': sre.SemanticAttr.Font.CALIGRAPHIC,
  '-tex-caligraphic-bold': sre.SemanticAttr.Font.CALIGRAPHICBOLD,
  '-tex-calligraphic': sre.SemanticAttr.Font.CALIGRAPHIC,
  '-tex-calligraphic-bold': sre.SemanticAttr.Font.CALIGRAPHICBOLD,
  '-tex-oldstyle': sre.SemanticAttr.Font.OLDSTYLE,
  '-tex-oldstyle-bold': sre.SemanticAttr.Font.OLDSTYLEBOLD,
  '-tex-mathit': sre.SemanticAttr.Font.ITALIC
};


/**
 * Cleans font names of potential MathJax prefixes.
 * @param {string} font The font name.
 * @return {sre.SemanticAttr.Font} The clean name.
 */
sre.SemanticProcessor.prototype.font = function(font) {
  var mathjaxFont = sre.SemanticProcessor.MATHJAX_FONTS[font];
  return mathjaxFont ? mathjaxFont : /** @type {sre.SemanticAttr.Font} */(font);
};


//
// Inference rules (Simons)
//
// This is top down parsing, so we have to keep the bottom-up processor
// available.
//
/**
 * Parses a proof node.
 * @param {Element} node The node.
 * @param {string} semantics Its semantics attribute value.
 * @param {function(!Array.<Element>): !Array.<sre.SemanticNode>} parse The
 *     current semantic parser for list of nodes.
 * @return {!sre.SemanticNode} The semantic node.
 */
sre.SemanticProcessor.proof = function(node, semantics, parse) {
  var attrs = sre.SemanticProcessor.separateSemantics(semantics);
  return sre.SemanticProcessor.getInstance().proof(node, attrs, parse);
};


/**
 * Parses a proof node.
 * @param {Element} node The node.
 * @param {Object.<string>} semantics Association of semantic keys to values.
 * @param {function(!Array.<Element>): !Array.<sre.SemanticNode>} parse The
 *     current semantic parser for list of nodes.
 * @return {!sre.SemanticNode} The semantic node for the proof.
 */
sre.SemanticProcessor.prototype.proof = function(node, semantics, parse) {
  if (!semantics['inference'] && !semantics['axiom']) {
    console.log('Noise');
    // do some preprocessing!
    // Put in an invisible comma!
  }
  // Axiom case!
  if (semantics['axiom']) {
    var cleaned = this.cleanInference(node.childNodes);
    var axiom = cleaned.length ? this.factory_.makeBranchNode(
        sre.SemanticAttr.Type.INFERENCE, parse(cleaned), []) :
        this.factory_.makeEmptyNode();
    axiom.role = sre.SemanticAttr.Role.AXIOM;
    axiom.mathmlTree = node;
    return axiom;
  }
  var inference = this.inference(node, semantics, parse);
  if (semantics['proof']) {
    inference.role = sre.SemanticAttr.Role.PROOF;
    inference.childNodes[0].role = sre.SemanticAttr.Role.FINAL;
  }
  return inference;
};


/**
 * Parses a single inference node.
 * @param {Element} node The node.
 * @param {Object.<string>} semantics Association of semantic keys to values.
 * @param {function(!Array.<Element>): !Array.<sre.SemanticNode>} parse The
 *     current semantic parser for list of nodes.
 * @return {!sre.SemanticNode} The semantic node for the inference.
 */
sre.SemanticProcessor.prototype.inference = function(node, semantics, parse) {
  if (semantics['inferenceRule']) {
    var formulas = this.getFormulas(node, [], parse);
    var inference = this.factory_.makeBranchNode(
        sre.SemanticAttr.Type.INFERENCE,
        [formulas.conclusion, formulas.premises], []);
    // Setting role
    return inference;
  }
  var label = semantics['labelledRule'];
  var children = sre.DomUtil.toArray(node.childNodes);
  var content = [];
  if (label === 'left' || label === 'both') {
    content.push(
        this.getLabel(node, children, parse, sre.SemanticAttr.Role.LEFT));
  }
  if (label === 'right' || label === 'both') {
    content.push(
        this.getLabel(node, children, parse, sre.SemanticAttr.Role.RIGHT));
  }
  var formulas = this.getFormulas(node, children, parse);
  var inference = this.factory_.makeBranchNode(
      sre.SemanticAttr.Type.INFERENCE,
      [formulas.conclusion, formulas.premises], content);
  // Setting role
  inference.mathmlTree = node;
  return inference;
};


/**
 * Parses the label of an inference rule.
 * @param {Element} node The inference node.
 * @param {Array.<Element>} children The node's children containing the label.
 * @param {function(!Array.<Element>): !Array.<sre.SemanticNode>} parse The
 *     current semantic parser for list of nodes.
 * @param {string} side The side the label is on.
 * @return {!sre.SemanticNode} The semantic node for the label.
 */
sre.SemanticProcessor.prototype.getLabel = function(
    node, children, parse, side) {
  var label = this.findNestedRow(children, 'prooflabel', side);
  var sem = this.factory_.makeBranchNode(
      sre.SemanticAttr.Type.RULELABEL,
      parse(sre.DomUtil.toArray(label.childNodes)), []);
  sem.role = /** @type {sre.SemanticAttr.Role} */(side);
  sem.mathmlTree = label;
  return sem;
};


/**
 * Retrieves and parses premises and conclusion of an inference rule.
 * @param {Element} node The inference rule node.
 * @param {Array.<Element>} children The node's children containing.
 * @param {function(!Array.<Element>): !Array.<sre.SemanticNode>} parse The
 *     current semantic parser for list of nodes.
 * @return {{conclusion: sre.SemanticNode, premises: sre.SemanticNode}} A pair
 *       of conclusion and premises.
 */
sre.SemanticProcessor.prototype.getFormulas = function(node, children, parse) {
  var inf = children.length ?
      this.findNestedRow(children, 'inferenceRule') : node;
  var up = sre.SemanticProcessor.getSemantics(inf)['inferenceRule'] === 'up';
  var premRow = up ? inf.childNodes[1] : inf.childNodes[0];
  var concRow = up ? inf.childNodes[0] : inf.childNodes[1];
  var premTable = premRow.childNodes[0].childNodes[0];
  var topRow = sre.DomUtil.toArray(premTable.childNodes[0].childNodes);
  var premNodes = [];
  var i = 1;
  for (var cell of topRow) {
    if (i % 2) {
      premNodes.push(cell.childNodes[0]);
    }
    i++;
  }
  var premises = parse(premNodes);
  var conclusion =
      parse(sre.DomUtil.toArray(concRow.childNodes[0].childNodes))[0];
  var prem = this.factory_.makeBranchNode(
      sre.SemanticAttr.Type.PREMISES, premises, []);
  prem.mathmlTree = /** @type {Element} */(premTable);
  var conc = this.factory_.makeBranchNode(
      sre.SemanticAttr.Type.CONCLUSION, [conclusion], []);
  conc.mathmlTree = /** @type {Element} */(concRow.childNodes[0].childNodes[0]);
  return {conclusion: conc, premises: prem};
};


/**
 * Find a inference element nested in a row.
 * @param {Array.<Element>} nodes A node list.
 * @param {string} semantic A semantic key.
 * @param {string=} opt_value Optionally the semantic value.
 * @return {Element} The first element in that row that contains the semantic
 *     key (and has its value if the latter is given.)
 */
sre.SemanticProcessor.prototype.findNestedRow = function(
    nodes, semantic, opt_value) {
  return this.findNestedRow_(nodes, semantic, 0, opt_value);
};


/**
 * Searches the given row of elements for first element with the given semantic
 * key or key/value pair if a value is not null. Ignores space elements and
 * descents at most 3 levels.
 * @param {Array.<Element>} nodes A node list.
 * @param {string} semantic A semantic key.
 * @param {number} level The maximum level to search.
 * @param {string|undefined} value Optionally the semantic value.
 * @return {Element} The first matching element in the row.
 * @private
 */
sre.SemanticProcessor.prototype.findNestedRow_ = function(
    nodes, semantic, level, value) {
  if (level > 3) {
    return null;
  }
  for (var i = 0, node; node = nodes[i]; i++) {
    var tag = sre.DomUtil.tagName(node);
    if (tag !== 'MSPACE') {
      if (tag === 'MROW') {
        return this.findNestedRow_(
            sre.DomUtil.toArray(node.childNodes), semantic, level + 1, value);
      }
      if (sre.SemanticProcessor.findSemantics(node, semantic, value)) {
        return node;
      }
    }
  }
  return null;
};


/**
 * Removes mspaces in a row.
 * @param {!NodeList} nodes The list of nodes.
 * @return {!Array.<Element>} The list with all space elements removed.
 */
sre.SemanticProcessor.prototype.cleanInference = function(nodes) {
  return sre.DomUtil.toArray(nodes).filter(function(x) {
    return sre.DomUtil.tagName(x) !== 'MSPACE';
  });
};


// Utilities
// This one should be prefix specific!
/**
 *
 * @param {Element} node The mml node.
 * @param {string} attr The attribute name.
 * @param {string=} opt_value The attribute value.
 * @return {boolean} True if the semantic attribute is in the node.
 */
sre.SemanticProcessor.findSemantics = function(node, attr, opt_value) {
  let value = (opt_value == null) ? null : opt_value;
  let semantics = sre.SemanticProcessor.getSemantics(node);
  if (!semantics) {
    return false;
  }
  if (!semantics[attr]) {
    return false;
  }
  return value == null ? true : semantics[attr] === value;
};


/**
 * Retrieves the content of a semantic attribute in a node as an association
 * list.
 * @param {Element} node The mml node.
 * @return {Object.<string>} The association list.
 */
sre.SemanticProcessor.getSemantics = function(node) {
  let semantics = node.getAttribute('semantics');
  if (!semantics) {
    return null;
  }
  return sre.SemanticProcessor.separateSemantics(semantics);
};


/**
 * Removes prefix from a semantic attribute.
 * @param {string} name The semantic attribute.
 * @return {string} Name with prefix removed.
 */
sre.SemanticProcessor.removePrefix = function(name) {
  var [prefix, ...rest] = name.split('_');
  return rest.join('_');
};


/**
 * Separates a semantic attribute into it's components.
 * @param {string} attr Content of the semantic attribute.
 * @return {Object.<string>} Association list of semantic attributes.
 */
sre.SemanticProcessor.separateSemantics = function(attr) {
  var result = {};
  attr.split(';').
      forEach(function(x) {
        var [name, value] = x.split(':');
        result[sre.SemanticProcessor.removePrefix(name)] = value;
      });
  return result;
};


/**
 * Switches unknown to operator node and runs multioperator heuristics.
 * @param {sre.SemanticNode} node The node to retype.
 * @return {!sre.SemanticNode} The node resulting from applying the heuristic.
 */
sre.SemanticProcessor.prototype.operatorNode = function(node) {
  if (node.type === sre.SemanticAttr.Type.UNKNOWN) {
    node.type = sre.SemanticAttr.Type.OPERATOR;
  }
  return sre.SemanticHeuristics.run('multioperator', node);
};
