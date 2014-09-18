// Copyright 2014 Volker Sorge
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
 * @fileoverview Utility functions for mathspeak rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MathspeakUtil');

goog.require('sre.SemanticTree.Node');
goog.require('sre.SystemExternal');


/**
 * String function to separate text into single characters by adding
 * intermittent spaces.
 * @param {!Node} node The node to be processed.
 * @return {string} The spaced out text.
 */
sre.MathspeakUtil.spaceoutText = function(node) {
  return node.textContent.split('').join(' ');
};


/**
 * Query function that splits into number nodes and content nodes.
 * @param {!Node} node The node to be processed.
 * @return {Array.<Node>} List of number and content nodes.
 */
sre.MathspeakUtil.spaceoutNumber = function(node) {
  var content = node.textContent.split('');
  var result = [];
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  for (var i = 0, chr; chr = content[i]; i++) {
    // We ignore Greek characters for now!
    var type = sre.SemanticAttr.Type.NUMBER;
    var role = chr.match(/\W/) ?
        sre.SemanticAttr.Role.UNKNOWN :
        sre.SemanticAttr.Role.PROTECTED;
    var doc = dp.parseFromString('<' + type + ' role="' + role + '">' +
                                 chr + '</' + type + '>');
    result.push(doc.documentElement);
  }
  return result;
};


/**
 * Tags that serve as a nesting barrier by default.
 * @type {Array.<sre.SemanticAttr.Type>}
 */
sre.MathspeakUtil.nestingBarriers = [
  sre.SemanticAttr.Type.SQRT,
  sre.SemanticAttr.Type.ROOT,
  sre.SemanticAttr.Type.INTEGRAL,
  sre.SemanticAttr.Type.SUBSCRIPT,
  sre.SemanticAttr.Type.SUPERSCRIPT,
  sre.SemanticAttr.Type.TABLE,
  sre.SemanticAttr.Type.MULTILINE,
  sre.SemanticAttr.Type.MATRIX,
  sre.SemanticAttr.Type.VECTOR,
  sre.SemanticAttr.Type.CASES,
  sre.SemanticAttr.Type.ROW,
  sre.SemanticAttr.Type.LINE,
  sre.SemanticAttr.Type.CELL
];


/**
 * Dictionary to store the nesting depth of each node.
 * @type {Object.<Element, number>}
 */
sre.MathspeakUtil.nestingDepth = {};


// sre.MathspeakUtil.updateNestingDepth = function(node, tag,  depth) {
//   if (!sre.XpathUtil.evaluateBoolean('self::' + tag, node)) {
//     return;
//   }
//   var current = sre.MathspeakUtil.nestingDepth[node];
//   current ? Math.max(depth, sre.MathspeakUtil.nestingDepth[node]):
//     sre.MathspeakUtil.nestingDepth[node] = depth;
// };


/**
 * Computes the depth of nested descendants of a particular set of tags for a
 * node.
 * @param {!Element} node The XML node to check.
 * @param {Array.<string>} tags The tags to be considered for the nesting depth.
 * @param {Array.<string>=} opt_barriers Optional list of tags that serve as barrier.
 * @return {number} The nesting depth.
 */
sre.MathspeakUtil.getNestingDepth = function(node, tags, opt_barriers) {
  opt_barriers = opt_barriers || sre.MathspeakUtil.nestingBarriers;
  if (sre.MathspeakUtil.nestingDepth[node]) {
    return sre.MathspeakUtil.nestingDepth[node];
  }
  if (tags.indexOf(node.tagName) < 0) {
    return 0;
  };
  var depth = sre.MathspeakUtil.computeNestingDepth(
      node, tags, sre.MathUtil.setdifference(opt_barriers, tags), 0);
  sre.MathspeakUtil.nestingDepth[node] = depth;
  return depth;
};


sre.MathspeakUtil.computeNestingDepth = function(node, tags, barriers, depth) {
  if (barriers.indexOf(node.tagName) > -1) {
    return depth;
  }
  if (tags.indexOf(node.tagName) > -1) {
    depth++;
  };
  if (!node.childNodes) {
    return depth;
  }
  var children = sre.DomUtil.toArray(node.childNodes);
  return Math.max.apply(null, children.map(
    function(subNode) {
      return sre.MathspeakUtil.computeNestingDepth(subNode, tags, barriers, depth);
    }));
};


// sre.MathspeakUtil.computeNestingDepth = function(node, tag) {
//   var query = './/' + tag + '[not(descendant::' + tag + ')]';
//   var deepestNodes = sre.XpathUtil.evalXPath(query, node);
//   deepestNodes.forEach(function(x) {console.log(x.toString());});
//   var maxDepth = 0;
//   for(var i = 0, subNode; subNode = deepestNodes[i]; i++) {
//     var depth = 0;
//     do {
//       sre.MathspeakUtil.updateNestingDepth(subNode, tag, ++depth);
//       subNode = subNode.parentNode;
//       maxDepth = Math.max(depth, maxDepth);
//     } while (subNode !== node);
//   };
//   sre.MathspeakUtil.updateNestingDepth(node, tag, ++maxDepth);
//   return sre.MathspeakUtil.nestingDepth[node];
// };


// /**
//  * Retrieve the internal nesting depth of a node with respect to a tag.
//  * @param {!Node} node The node.
//  * @return {number} The maximal nesting depth of nodes with the given tag.
//  */
// sre.MathspeakUtil.getNestingDepth = function(node, tag) {
//   return sre.MathspeakUtil.nestingDepth[node] ||
//     sre.MathspeakUtil.registerNestingDepth(node, tag);
// };


sre.MathspeakUtil.openingFractionVerbose = function(node) {
  var depth = sre.MathspeakUtil.getNestingDepth(node, ['fraction']);
  return new Array(depth + 1).join('Start') + 'Fraction';
};


sre.MathspeakUtil.closingFractionVerbose = function(node) {
  var depth = sre.MathspeakUtil.getNestingDepth(node, ['fraction']);
  return new Array(depth + 1).join('End') + 'Fraction';
};


sre.MathspeakUtil.overFractionVerbose = function(node) {
  var depth = sre.MathspeakUtil.getNestingDepth(node, ['fraction']);
  return new Array(depth + 1).join('Over');
};

sre.MathspeakUtil.openingFractionBrief = function(node) {
  var depth = sre.MathspeakUtil.getNestingDepth(node, ['fraction']);
  return new Array(depth + 1).join('Start') + 'Frac';
};


sre.MathspeakUtil.closingFractionBrief = function(node) {
  var depth = sre.MathspeakUtil.getNestingDepth(node, ['fraction']);
  return new Array(depth + 1).join('End') + 'Frac';
};


sre.MathspeakUtil.nestingToString = function(count) {
  switch (count) {
    case 1:
      return '';
    case 2:
      return 'Twice';
    default:
      return count.toString();
  }
};


sre.MathspeakUtil.openingFractionSbrief = function(node) {
  var depth = sre.MathspeakUtil.getNestingDepth(node, ['fraction']);
  if (depth === 1) {
    return 'Frac';
  }
  return 'Nest' + sre.MathspeakUtil.nestingToString(depth - 1) + 'Frac';
};


sre.MathspeakUtil.closingFractionSbrief = function(node) {
  var depth = sre.MathspeakUtil.getNestingDepth(node, ['fraction']);
  if (depth === 1) {
    return 'EndFrac';
  }
  return 'Nest' + sre.MathspeakUtil.nestingToString(depth - 1) + 'EndFrac';
};


sre.MathspeakUtil.overFractionSbrief = function(node) {
  var depth = sre.MathspeakUtil.getNestingDepth(node, ['fraction']);
  if (depth === 1) {
    return 'Over';
  }
  return 'Nest' + sre.MathspeakUtil.nestingToString(depth - 1) + 'Over';
};

