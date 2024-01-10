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
 * @file General utility functions for rule stores.
 * @author sorge@google.com (Volker Sorge)
 */
import { AuditoryDescription } from '../audio/auditory_description.js';
import * as XpathUtil from '../common/xpath_util.js';
import { Engine } from '../common/engine.js';

/**
 * Count list of nodes and concatenate this with the context string.
 * Returns a closure with a local state.
 *
 * @param nodes A node array.
 * @param context A context string.
 * @returns A function returning a string.
 */
export function nodeCounter(
  nodes: Node[],
  context: string | null
): () => string {
  // Local state.
  const localLength = nodes.length;
  let localCounter = 0;
  let localContext = context;
  if (!context) {
    localContext = '';
  }
  return function () {
    if (localCounter < localLength) {
      localCounter += 1;
    }
    return localContext + ' ' + localCounter;
  };
}

/**
 * Returns a separating pause element.
 *
 * @param _nodes A node array.
 * @param context A pause value string.
 * @returns A closure that
 *     returns a personality description of a single pause.
 */
export function pauseSeparator(
  _nodes: Node[],
  context: string
): () => AuditoryDescription[] {
  const numeral = parseFloat(context);
  const value = isNaN(numeral) ? context : numeral;
  return function () {
    return [
      AuditoryDescription.create({
        text: '',
        personality: { pause: value as string }
      })
    ];
    // TODO (TS): This cast to string is wrong and should be fixed.
  };
}

/**
 * Iterates over the list of content nodes of the parent of the given nodes.
 *
 * @param nodes A node array.
 * @param context A context string.
 * @returns A closure that returns
 *     the content of the next content node. Returns only context string if list
 *     is exhausted.
 */
export function contentIterator(
  nodes: Element[],
  context: string
): () => AuditoryDescription[] {
  let contentNodes: Element[];
  if (nodes.length > 0) {
    contentNodes = XpathUtil.evalXPath(
      '../../content/*',
      nodes[0]
    ) as Element[];
  } else {
    contentNodes = [];
  }
  return function () {
    const content = contentNodes.shift();
    const contextDescr = context
      ? [AuditoryDescription.create({ text: context }, { translate: true })]
      : [];
    if (!content) {
      return contextDescr;
    }
    const descrs = Engine.evaluateNode(content);
    return contextDescr.concat(descrs);
  };
}
