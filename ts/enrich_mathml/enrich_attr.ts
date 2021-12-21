//
// Copyright 2015-21 Volker Sorge
//
// Licensed under the Apache on 2.0 (the "License");
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
 * @file Attribute handling for the semantic enrichment.
 *
 * Take a MathML element, compute the semantic tree and reinject the semantic
 * information into the MathML.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { SemanticRole } from '../semantic_tree/semantic_meaning';
import { SemanticNode } from '../semantic_tree/semantic_node';

/**
 * Prefix for semantic attributes.
 */
export const Prefix = 'data-semantic-';

// TODO (TS): Do something about the prefix computation.
/**
 * Mapping for attributes used in semantic enrichment.
 */
export enum Attribute {
  ADDED = 'data-semantic-added',
  ALTERNATIVE = 'data-semantic-alternative',
  CHILDREN = 'data-semantic-children',
  COLLAPSED = 'data-semantic-collapsed',
  CONTENT = 'data-semantic-content',
  EMBELLISHED = 'data-semantic-embellished',
  FENCEPOINTER = 'data-semantic-fencepointer',
  FONT = 'data-semantic-font',
  ID = 'data-semantic-id',
  ANNOTATION = 'data-semantic-annotation',
  OPERATOR = 'data-semantic-operator',
  OWNS = 'data-semantic-owns',
  PARENT = 'data-semantic-parent',
  POSTFIX = 'data-semantic-postfix',
  PREFIX = 'data-semantic-prefix',
  ROLE = 'data-semantic-role',
  SPEECH = 'data-semantic-speech',
  STRUCTURE = 'data-semantic-structure',
  TYPE = 'data-semantic-type'
}

export const EnrichAttributes: string[] = [
  Attribute.ADDED,
  Attribute.ALTERNATIVE,
  Attribute.CHILDREN,
  Attribute.COLLAPSED,
  Attribute.CONTENT,
  Attribute.EMBELLISHED,
  Attribute.FENCEPOINTER,
  Attribute.FONT,
  Attribute.ID,
  Attribute.ANNOTATION,
  Attribute.OPERATOR,
  Attribute.OWNS,
  Attribute.PARENT,
  Attribute.POSTFIX,
  Attribute.PREFIX,
  Attribute.ROLE,
  Attribute.SPEECH,
  Attribute.STRUCTURE,
  Attribute.TYPE
];

/**
 * Concatenates node ids into a comma separated lists.
 *
 * @param nodes The list of nodes.
 * @returns The comma separated lists.
 */
export function makeIdList(nodes: SemanticNode[]): string {
  return nodes
    .map(function (node) {
      return node.id;
    })
    .join(',');
}

/**
 * Sets semantic attributes in a MathML node.
 *
 * @param mml The MathML node.
 * @param semantic The semantic tree node.
 */
export function setAttributes(mml: Element, semantic: SemanticNode) {
  mml.setAttribute(Attribute.TYPE, semantic.type);
  const attributes = semantic.allAttributes();
  for (let i = 0, attr; (attr = attributes[i]); i++) {
    mml.setAttribute(Prefix + attr[0].toLowerCase(), attr[1]);
  }
  if (semantic.childNodes.length) {
    mml.setAttribute(Attribute.CHILDREN, makeIdList(semantic.childNodes));
  }
  if (semantic.contentNodes.length) {
    mml.setAttribute(Attribute.CONTENT, makeIdList(semantic.contentNodes));
  }
  if (semantic.parent) {
    mml.setAttribute(Attribute.PARENT, semantic.parent.id.toString());
  }
  setPostfix(mml, semantic);
}

/**
 * Sets postfix attributes to surface properties via suffixes. Examples: link,
 * image, etc.
 *
 * @param mml The MathML node.
 * @param semantic The semantic tree node.
 */
export function setPostfix(mml: Element, semantic: SemanticNode) {
  const postfix = [];
  if (semantic.role === SemanticRole.MGLYPH) {
    postfix.push('image');
  }
  if (semantic.attributes['href']) {
    postfix.push('link');
  }
  if (postfix.length) {
    mml.setAttribute(Attribute.POSTFIX, postfix.join(' '));
  }
}

/**
 * Removes the semantic prefix from the attributes of an enriched MathML element
 * given as a serialised string. This is useful for more concise display.
 *
 * NOTE THAT THIS METHOD IS FRAGILE!
 *
 * The result is not necessarily a meaningful XML expression. Attributes might
 * overwrite or be shadowed by other attributes already in the node. For
 * example, with both PREFIX-attr and attr present, the latter is overwritten by
 * the operation.
 *
 * @param mml The MathML node.
 * @returns The MathML node with rewritten attributes.
 */
export function removeAttributePrefix(mml: string): string {
  return mml.toString().replace(new RegExp(Prefix, 'g'), '');
}

/**
 * Creates an data semantic attribute by adding the correct prefix.
 *
 * @param attr The attribute.
 * @returns The completed attribute.
 */
// TODO (TS): Again this should have been return time Attribute
export function addPrefix(attr: string): Attribute {
  return (Prefix + attr) as Attribute;
}
