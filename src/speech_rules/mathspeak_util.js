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
 * Parameter to count fraction level.
 * @type {number}
 */
sre.MathspeakUtil.fractionLevel = 0;


/**
 * Parameter to count fraction nesting depth.
 * @type {number}
 */
sre.MathspeakUtil.fractionDepth = 0;


sre.MathspeakUtil.getNestingDepth = function(node, tag) {
  var query = './/' + tag + '[not(descendant::' + tag + ')] | self::' + tag;
  var deepestNodes = sre.XpathUtil.evalXPath(query, node);
  var getDepth = function(subNode) {
    var depth = 1;
    while(subNode !== node) {
      subNode = subNode.parentNode;
      if (sre.XpathUtil.evaluateBoolean('self::' + tag, subNode)) {
        depth++;
      }
    }
    return depth;
  };
  var maxDepth = 0;
  for(var i = 0, subNode; subNode = deepestNodes[i]; i++) {
    maxDepth = Math.max(maxDepth, getDepth(subNode));
  }
  return maxDepth;
};


/**
 * String function to generate the opening fraction statement.
 * @param {!Node} node The fraction node.
 * @return {number} The current nesting depth.
 */
sre.MathspeakUtil.openingFraction = function(node) {
  if (sre.MathspeakUtil.fractionLevel === 0) {
    sre.MathspeakUtil.fractionDepth =
      sre.MathspeakUtil.getNestingDepth(node, 'fraction');
  }
  var current = sre.MathspeakUtil.fractionDepth -
        sre.MathspeakUtil.fractionLevel;
  sre.MathspeakUtil.fractionLevel++;
  return current;
};


sre.MathspeakUtil.closingFraction = function(node) {
  sre.MathspeakUtil.fractionLevel--;
  return sre.MathspeakUtil.fractionDepth - sre.MathspeakUtil.fractionLevel;
};


sre.MathspeakUtil.openingFractionVerbose = function(node) {
  var depth = sre.MathspeakUtil.openingFraction(node);
  return new Array(depth + 1).join('Start') + 'Fraction';
};


sre.MathspeakUtil.closingFractionVerbose = function(node) {
  var depth = sre.MathspeakUtil.closingFraction(node);
  return new Array(depth + 1).join('End') + 'Fraction';
};


sre.MathspeakUtil.overFractionVerbose = function(node) {
  var depth = sre.MathspeakUtil.fractionDepth -
        sre.MathspeakUtil.fractionLevel;
  return new Array(depth + 2).join('Over');
};

sre.MathspeakUtil.openingFractionBrief = function(node) {
  var depth = sre.MathspeakUtil.openingFraction(node);
  return new Array(depth + 1).join('Start') + 'Frac';
};


sre.MathspeakUtil.closingFractionBrief = function(node) {
  var depth = sre.MathspeakUtil.closingFraction(node);
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
  var depth = sre.MathspeakUtil.openingFraction(node);
  if (depth === 1) {
    return 'Frac';
  }
  return 'Nest' + sre.MathspeakUtil.nestingToString(depth - 1) + 'Frac';
};


sre.MathspeakUtil.closingFractionSbrief = function(node) {
  var depth = sre.MathspeakUtil.closingFraction(node);
  if (depth === 1) {
    return 'EndFrac';
  }
  return 'Nest' + sre.MathspeakUtil.nestingToString(depth - 1) + 'EndFrac';
};


sre.MathspeakUtil.overFractionSbrief = function(node) {
  var depth = sre.MathspeakUtil.fractionDepth -
        sre.MathspeakUtil.fractionLevel;
  if (depth === 0) {
    return 'Over';
  }
  return 'Nest' + sre.MathspeakUtil.nestingToString(depth) + 'Over';
};

