// Copyright 2013 Google Inc.
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
 * @fileoverview Predicates collection for semantic tree generation.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticPred');

goog.require('sre.SemanticAttr');
goog.require('sre.SemanticUtil');


/**
 * Constructs a predicate to check the semantic attribute of a node.
 * @param {!string} prop The property of a node.
 * @param {!string} attr The attribute.
 * @return {function(sre.SemanticNode): boolean} The predicate.
 */

sre.SemanticPred.isAttribute = function(prop, attr) {
  var getAttr = function(prop) {
    switch (prop) {
      case 'role': return sre.SemanticAttr.Role[attr];
      case 'font': return sre.SemanticAttr.Font[attr];
      case 'embellished':
      case 'type':
      default: return sre.SemanticAttr.Type[attr];
    }
  };

  return function(node) {return node[prop] === getAttr(prop);};
};


/**
 * Checks whether a character can be considered as accent.
 * @param {!sre.SemanticNode} node The node to be tested.
 * @return {boolean} True if the node is a punctuation, fence or operator.
 */
sre.SemanticPred.isAccent = function(node) {
  return sre.SemanticPred.isAttribute('type', 'FENCE')(node) ||
      sre.SemanticPred.isAttribute('type', 'PUNCTUATION')(node) ||
      sre.SemanticPred.isAttribute('type', 'OPERATOR')(node) ||
      sre.SemanticPred.isAttribute('type', 'RELATION')(node) ||
      // TODO (sorge) Simplify this once meaning of all characters is fully
      // defined.
      (sre.SemanticPred.isAttribute('type', 'IDENTIFIER')(node) &&
      sre.SemanticPred.isAttribute('role', 'UNKNOWN')(node) &&
      !node.textContent.match(new RegExp(
         (sre.SemanticAttr.getInstance()).allLetters.join('|'))));
};


