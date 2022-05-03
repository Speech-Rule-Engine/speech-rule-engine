//
// Copyright 2015-21 Volker Sorge
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
 * @file Utility functions for walkers.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util';
import { Attribute } from '../enrich_mathml/enrich_attr';

/**
 * A comma separated list of attribute values.
 *
 * @param attr The attribute value.
 * @returns A list of values.
 */
export function splitAttribute(attr: string | null): string[] {
  return !attr ? [] : attr.split(/,/);
}

/**
 * Retrieves a data attribute from a given node.
 *
 * @param node A DOM node.
 * @param attr The semantic data attribute.
 * @returns The value for that attribute.
 */
export function getAttribute(node: Element, attr: Attribute): string {
  return node.getAttribute(attr);
}

/**
 * Retrieves the node containing the embedding of the root of a semantic tree.
 *
 * @param node The math node.
 * @returns The node with the embedded root. If we cannot find one, the
 *     input node is returned.
 */
export function getSemanticRoot(node: Element): Element {
  if (
    node.hasAttribute(Attribute.TYPE) &&
    !node.hasAttribute(Attribute.PARENT)
  ) {
    return node;
  }

  const semanticNodes = DomUtil.querySelectorAllByAttr(node, Attribute.TYPE);
  for (let i = 0, semanticNode; (semanticNode = semanticNodes[i]); i++) {
    if (!semanticNode.hasAttribute(Attribute.PARENT)) {
      return semanticNode;
    }
  }
  return node;
}

/**
 * Retrieves a node containing a given semantic id starting from the given root.
 *
 * @param root Root node for the query.
 * @param id The id of a semantic node.
 * @returns The node for that id.
 */
export function getBySemanticId(root: Element, id: string): Element {
  if (root.getAttribute(Attribute.ID) === id) {
    return root;
  }
  return DomUtil.querySelectorAllByAttrValue(root, Attribute.ID, id)[0];
}
