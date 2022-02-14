//
// Copyright 2017-21 Volker Sorge
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
 * @file Annotates semantic trees.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { SemanticAnnotator, SemanticVisitor } from './semantic_annotator.js';
import { SemanticNode } from './semantic_node.js';

export const annotators: Map<string, SemanticAnnotator> = new Map();

export const visitors: Map<string, SemanticVisitor> = new Map();

/**
 * Registers an annotator.
 *
 * @param annotator The annotator.
 */
export function register(annotator: SemanticAnnotator | SemanticVisitor) {
  const name = annotator.domain + ':' + annotator.name;
  annotator instanceof SemanticAnnotator
    ? annotators.set(name, annotator)
    : visitors.set(name, annotator);
}

/**
 * Activates a particular annotator.
 *
 * @param domain The domain.
 * @param name The name of the annotator.
 */
export function activate(domain: string, name: string) {
  const key = domain + ':' + name;
  const annotator = annotators.get(key) || visitors.get(key);
  if (annotator) {
    annotator.active = true;
  }
}

/**
 * Annotates the given semantic node recursively.
 *
 * @param node The semantic node to annotate.
 */
export function annotate(node: SemanticNode) {
  for (const annotator of annotators.values()) {
    if (annotator.active) {
      annotator.annotate(node);
    }
  }
  for (const visitor of visitors.values()) {
    if (visitor.active) {
      visitor.visit(node, Object.assign({}, visitor.def));
    }
  }
}
