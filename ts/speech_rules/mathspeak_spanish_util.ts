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
 * @fileoverview Utility functions for mathspeak spanish rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by TextHelp
//


import * as Messages from '../l10n/messages';


/**
 * Simple counter function for counting ordinals.
 * @param node The node for the context function.
 * @param context The context string.
 * @return The context function returning ordinals.
 */
export function ordinalCounter(node: Node, context: string): () => string {
  let counter = 0;
  return function() {
    return Messages.NUMBERS.numberToOrdinal(++counter, false) + ' ' + context;
  };
}


/**
 * Predicate to decide if a root has a small index, i.e., between 1 and 10.
 * @param node The root node.
 * @return The list with the given node, if it is a root with a
 *     small index.
 */
export function smallRoot(node: Node): Node[] {
  if (!node.childNodes || node.childNodes.length === 0 ||
      !node.childNodes[0].childNodes) {
    return [];
  }
  let index = node.childNodes[0].childNodes[0].textContent;
  if (!/^\d+$/.test(index)) {
    return [];
  }
  let number = parseInt(index, 10);
  return number > 1 && number <= 10 ? [node] : [];
}
