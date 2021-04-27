//
// Copyright 2013 Google Inc.
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
 * @fileoverview General utility functions for rule stores.
 * @author sorge@google.com (Volker Sorge)
 */
import {AuditoryDescription} from '../audio/auditory_description';


/**
 * Count list of nodes and concatenate this with the context string.
 * Returns a closure with a local state.
 * @param nodes A node array.
 * @param context A context string.
 * @return A function returning a string.
 */
export function nodeCounter(nodes: Node[], context: string|null): () => string {
  // Local state.
  let localLength = nodes.length;
  let localCounter = 0;
  let localContext = context;
  if (!context) {
    localContext = '';
  }
  return function() {
    if (localCounter < localLength) {
      localCounter += 1;
    }
    return localContext + ' ' + localCounter;
  };
}


/**
 * Returns a separating pause element.
 * @param nodes A node array.
 * @param context A pause value string.
 * @return A closure that
 *     returns a personality description of a single pause.
 */
export function pauseSeparator(nodes: Node[], context: string): () =>
    AuditoryDescription[] {
  let numeral = parseFloat(context);
  let value = isNaN(numeral) ? context : numeral;
  return function() {
    return [sre.AuditoryDescription.create(
        {text: '', personality: {pause: value}})];
  };
}


/**
 * Iterates over the list of content nodes of the parent of the given nodes.
 * @param nodes A node array.
 * @param context A context string.
 * @return A closure that returns
 *     the content of the next content node. Returns only context string if list
 *     is exhausted.
 */
export function contentIterator(nodes: Node[], context: string): () =>
    AuditoryDescription[] {
  if (nodes.length > 0) {
    let contentNodes = sre.XpathUtil.evalXPath('../../content/*', nodes[0]);
  } else {
    let contentNodes = [];
  }
  return function() {
    let content = contentNodes.shift();
    let contextDescr = context ?
        [sre.AuditoryDescription.create({text: context}, {translate: true})] :
        [];
    if (!content) {
      return contextDescr;
    }
    let descrs = sre.SpeechRuleEngine.getInstance().evaluateNode(content);
    return contextDescr.concat(descrs);
  };
}
