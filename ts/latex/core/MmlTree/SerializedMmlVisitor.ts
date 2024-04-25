/*************************************************************
 *
 *  Copyright (c) 2017-2023 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * @fileoverview  A visitor that produces a serilaied MathML string
 *                (replacement for toMathML() output from v2)
 *
 * @author dpvc@mathjax.org (Davide Cervone)
 */

import {MmlVisitor} from './MmlVisitor.js';
import {MmlNode, TextNode, XMLNode} from './MmlNode.js';

export const toEntity = (c: string) => '&#x' + c.codePointAt(0).toString(16).toUpperCase() + ';';


/*****************************************************************/
/**
 *  Implements the SerializedMmlVisitor (subclass of MmlVisitor)
 */

export class SerializedMmlVisitor extends MmlVisitor {

  /**
   * Convert the tree rooted at a particular node into a serialized MathML string
   *
   * @param {MmlNode} node  The node to use as the root of the tree to traverse
   * @return {string}       The MathML string representing the internal tree
   */
  public visitTree(node: MmlNode): string {
    return this.visitNode(node, '');
  }

  /**
   * @param {TextNode} node  The text node to visit
   * @param {string} space   The amount of indenting for this node
   * @return {string}        The (HTML-quoted) text of the node
   */
  public visitTextNode(node: TextNode, _space: string): string {
    return this.quoteHTML(node.getText());
  }

  /**
   * @param {XMLNode} node  The XML node to visit
   * @param {string} space  The amount of indenting for this node
   * @return {string}       The serialization of the XML node
   */
  public visitXMLNode(node: XMLNode, space: string): string {
    // TODO(LATEX): This was a serialized node. But we probably don't need it.
    return space + node;
  }

  /**
   * Visit an inferred mrow, but don't add the inferred row itself (since
   * it is supposed to be inferred).
   *
   * @param {MmlNode} node  The inferred mrow to visit
   * @param {string} space  The amount of indenting for this node
   * @return {string}       The serialized contents of the mrow, properly indented
   */
  public visitInferredMrowNode(node: MmlNode, space: string): string {
    let mml = [];
    for (const child of node.childNodes) {
      mml.push(this.visitNode(child, space));
    }
    return mml.join('\n');
  }

  /**
   * @param {MmlNode} node    The annotation node to visit
   * @param {string} space    The number of spaces to use for indentation
   * @return {string}         The serializied annotation element
   */
  public visitAnnotationNode(node: MmlNode, space: string): string {
    return space + '<annotation' + this.getAttributes(node) + '>'
      + this.childNodeMml(node, '', '')
      + '</annotation>';
  }

  /**
   * The generic visiting function:
   *   Make the string version of the open tag, properly indented, with it attributes
   *   Increate the indentation level
   *   Add the childnodes
   *   Add the end tag with proper spacing (empty tags have the close tag following directly)
   *
   * @param {MmlNode} node    The node to visit
   * @param {string} space    The number of spaces to use for indentation
   * @return {string}         The serialization of the given node
   */
  public visitDefault(node: MmlNode, space: string): string {
    let kind = this.getKind(node);
    let [nl, endspace] = (node.isToken || node.childNodes.length === 0 ? ['', ''] : ['\n', space]);
    const children = this.childNodeMml(node, space + '  ', nl);
    return space + '<' + kind + this.getAttributes(node) + '>'
                 + (children.match(/\S/) ? nl + children + endspace : '')
                 + '</' + kind + '>';
  }

  /**
   * @param {MmlNode} node    The node whose children are to be added
   * @param {string} space    The spaces to use for indentation
   * @param {string} nl       The newline character (or empty)
   * @return {string}         The serializied children
   */
  protected childNodeMml(node: MmlNode, space: string, nl: string): string {
    let mml = '';
    for (const child of node.childNodes) {
      mml += this.visitNode(child, space) + nl;
    }
    return mml;
  }

  /**
   * @param {MmlNode} node  The node whose attributes are to be produced
   * @return {string}       The attribute list as a string
   */
  protected getAttributes(node: MmlNode): string {
    const attr = [];
    const attributes = this.getAttributeList(node);
    for (const name of Object.keys(attributes)) {
      const value = String(attributes[name]);
      if (value === undefined) continue;
      attr.push(name + '="' + this.quoteHTML(value) + '"');
    }
    return attr.length ? ' ' + attr.join(' ') : '';
  }

  /**
   *  Convert HTML special characters to entities (&amp;, &lt;, &gt;, &quot;)
   *  Convert multi-character Unicode characters to entities
   *  Convert non-ASCII characters to entities.
   *
   * @param {string} value  The string to be made HTML escaped
   * @return {string}       The string with escaping performed
   */
  protected quoteHTML(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/[\uD800-\uDBFF]./g, toEntity)
      .replace(/[\u0080-\uD7FF\uE000-\uFFFF]/g, toEntity);
  }

}
