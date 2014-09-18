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
 * @param {Array.<string>=} opt_barrierTags Optional list of tags that serve as
 *     barrier.
 * @param {Object.<string, string>=} opt_barrierAttrs Attribute value pairs that
 *     serve as barrier.
 * @return {number} The nesting depth.
 */
sre.MathspeakUtil.getNestingDepth = function(node, tags, opt_barrierTags,
                                             opt_barrierAttrs) {
  opt_barrierTags = opt_barrierTags || sre.MathspeakUtil.nestingBarriers;
  opt_barrierAttrs = opt_barrierAttrs || {};
  if (sre.MathspeakUtil.nestingDepth[node]) {
    return sre.MathspeakUtil.nestingDepth[node];
  }
  if (tags.indexOf(node.tagName) < 0) {
    return 0;
  };
  var depth = sre.MathspeakUtil.computeNestingDepth(
      node, tags, sre.MathUtil.setdifference(opt_barrierTags, tags),
      opt_barrierAttrs, 0);
  sre.MathspeakUtil.nestingDepth[node] = depth;
  return depth;
};


sre.MathspeakUtil.containsAttr = function(node, attrs) {
  if (!node.attributes) {
    return false;
  }
  var attributes = sre.DomUtil.toArray(node.attributes);
  for(var i = 0, attr; attr = attributes[i]; i++) {
    if (attrs[attr.nodeName] === attr.nodeValue) {
      return true;
    }
  } 
  return false;
};



sre.MathspeakUtil.computeNestingDepth = function(node, tags, barriers, attrs, depth) {
  if (barriers.indexOf(node.tagName) > -1 ||
      sre.MathspeakUtil.containsAttr(node, attrs))
  {
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
      return sre.MathspeakUtil.computeNestingDepth(subNode, tags, barriers, attrs, depth);
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


sre.MathspeakUtil.fractionNestingDepth = function(node) {
  return sre.MathspeakUtil.getNestingDepth(
    node, ['fraction'], sre.MathspeakUtil.nestingBarriers, {'role': 'vulgar'});
};


sre.MathspeakUtil.openingFractionVerbose = function(node) {
  var depth = sre.MathspeakUtil.fractionNestingDepth(node);
  return new Array(depth + 1).join('Start') + 'Fraction';
};


sre.MathspeakUtil.closingFractionVerbose = function(node) {
  var depth = sre.MathspeakUtil.fractionNestingDepth(node);
  return new Array(depth + 1).join('End') + 'Fraction';
};


sre.MathspeakUtil.overFractionVerbose = function(node) {
  var depth = sre.MathspeakUtil.fractionNestingDepth(node);
  return new Array(depth + 1).join('Over');
};

sre.MathspeakUtil.openingFractionBrief = function(node) {
  var depth = sre.MathspeakUtil.fractionNestingDepth(node);
  return new Array(depth + 1).join('Start') + 'Frac';
};


sre.MathspeakUtil.closingFractionBrief = function(node) {
  var depth = sre.MathspeakUtil.fractionNestingDepth(node);
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
  var depth = sre.MathspeakUtil.fractionNestingDepth(node);
  if (depth === 1) {
    return 'Frac';
  }
  return 'Nest' + sre.MathspeakUtil.nestingToString(depth - 1) + 'Frac';
};


sre.MathspeakUtil.closingFractionSbrief = function(node) {
  var depth = sre.MathspeakUtil.fractionNestingDepth(node);
  if (depth === 1) {
    return 'EndFrac';
  }
  return 'Nest' + sre.MathspeakUtil.nestingToString(depth - 1) + 'EndFrac';
};


sre.MathspeakUtil.overFractionSbrief = function(node) {
  var depth = sre.MathspeakUtil.fractionNestingDepth(node);
  if (depth === 1) {
    return 'Over';
  }
  return 'Nest' + sre.MathspeakUtil.nestingToString(depth - 1) + 'Over';
};



sre.MathspeakUtil.lowNumbers = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
sre.MathspeakUtil.tenNumbers = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

sre.MathspeakUtil.numberToWords = function(num) {
  if ((num = num.toString()).length > 9) return num.toString();
  var n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return; var str = '';
  str += (n[1] != 0) ? (sre.MathspeakUtil.lowNumbers[Number(n[1])] || sre.MathspeakUtil.tenNumbers[n[1][0]] + '-' + sre.MathspeakUtil.lowNumbers[n[1][1]]) + 'billion-' : '';
  str += (n[2] != 0) ? (sre.MathspeakUtil.lowNumbers[Number(n[2])] || sre.MathspeakUtil.tenNumbers[n[2][0]] + '-' + sre.MathspeakUtil.lowNumbers[n[2][1]]) + 'million-' : '';
  str += (n[3] != 0) ? (sre.MathspeakUtil.lowNumbers[Number(n[3])] || sre.MathspeakUtil.tenNumbers[n[3][0]] + '-' + sre.MathspeakUtil.lowNumbers[n[3][1]]) + 'thousand-' : '';
  str += (n[4] != 0) ? (sre.MathspeakUtil.lowNumbers[Number(n[4])] || sre.MathspeakUtil.tenNumbers[n[4][0]] + '-' + sre.MathspeakUtil.lowNumbers[n[4][1]]) + 'hundred-' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and-' : '') + (sre.MathspeakUtil.lowNumbers[Number(n[5])] || sre.MathspeakUtil.tenNumbers[n[5][0]] + '-' + sre.MathspeakUtil.lowNumbers[n[5][1]]) : '';
  return str.match(/-$/) ? str.slice(0, -1) : str;
};

sre.MathspeakUtil.numberToOrdinal = function(num, plural) {
  if (num === 2) {
    return plural ? 'halves' : 'half';
  }
  var ordinal = sre.MathspeakUtil.numberToWords(num);
  if (ordinal.match(/one$/)) {
    ordinal = ordinal.slice(0, -3) + 'first';
  } else if (ordinal.match(/two$/)) {
    ordinal = ordinal.slice(0, -3) + 'second';
  } else if (ordinal.match(/three$/)) {
    ordinal = ordinal.slice(0, -5) + 'third';
  } else if (ordinal.match(/five$/)) {
    ordinal = ordinal.slice(0, -4) + 'fifth';
  } else if (ordinal.match(/eight$/)) {
    ordinal = ordinal.slice(0, -5) + 'eighth';
  } else if (ordinal.match(/nine$/)) {
    ordinal = ordinal.slice(0, -4) + 'ninth';
  } else if (ordinal.match(/twelve$/)) {
    ordinal = ordinal.slice(0, -5) + 'twelfth';
  } else if (ordinal.match(/ty$/)) {
    ordinal = ordinal.slice(0, -2) + 'tieth';
  } else {
    ordinal = ordinal + 'th';
  }
  return plural ? ordinal + 's' : ordinal;
};


sre.MathspeakUtil.vulgarFraction = function(node) {
  if (!node.childNodes || !node.childNodes[0] ||
      !node.childNodes[0].childNodes ||
      node.childNodes[0].childNodes.length < 2) {
    return node.textContent;
  }
  var denStr = node.childNodes[0].childNodes[0].textContent;
  var enumStr = node.childNodes[0].childNodes[1].textContent;
  var denominator = Number(denStr);
  var enumerator = Number(enumStr);
  if (isNaN(denominator) || isNaN(enumerator)) {
    return denStr + ' Over ' + enumStr;
  }
  return sre.MathspeakUtil.numberToWords(denominator) + '-' +
    sre.MathspeakUtil.numberToOrdinal(enumerator, denominator !== 1);
};

