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
 * @file A collection of JavaScript utilities used to simplify working
 * with DOM nodes.
 * Currently minimized for the standalone speech rule engine.
 * @author clchen@google.com (Charles L. Chen)
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import Engine, { SREError } from './engine';
import * as EngineConst from '../common/engine_const';
import SystemExternal from './system_external';
import * as XpathUtil from './xpath_util';

/**
 * Converts a NodeList into an array
 *
 * @param nodeList The nodeList.
 * @returns The array of nodes in the nodeList.
 */
export function toArray(nodeList: NodeList | NamedNodeMap): any[] {
  const nodeArray = [];
  for (let i = 0, m = nodeList.length; i < m; i++) {
    nodeArray.push(nodeList[i]);
  }
  return nodeArray;
}

/**
 * Trims the whitespace in an XML input string.
 *
 * @param input The XML input string.
 * @returns The string with whitespace removed between tags.
 */
export function trimInput_(input: string): string {
  input = input.replace(/&nbsp;/g, ' ');
  return input.replace(/>[ \f\n\r\t\v\u200b]+</g, '><').trim();
}

/**
 * Set of XML entities.
 */
export const XML_ENTITIES: { [key: string]: boolean } = {
  '&lt;': true,
  '&gt;': true,
  '&amp;': true,
  '&quot;': true,
  '&apos;': true
};

/**
 * Parses the XML input string into an XML structure.
 *
 * @param input The XML input string.
 * @returns The XML document structure corresponding to the node.
 */
export function parseInput(input: string): Element {
  const dp = new SystemExternal.xmldom.DOMParser();
  const clean_input = trimInput_(input);
  const allValues = clean_input.match(/&(?!lt|gt|amp|quot|apos)\w+;/g);
  const html = !!allValues;
  if (!clean_input) {
    throw new Error('Empty input!');
  }
  try {
    const doc = dp.parseFromString(
      clean_input,
      html ? 'text/html' : 'text/xml'
    );
    if (Engine.getInstance().mode === EngineConst.Mode.HTTP) {
      XpathUtil.xpath.currentDocument = doc;
      return html ? doc.body.childNodes[0] : doc.documentElement;
    }
    return doc.documentElement;
  } catch (err) {
    throw new SREError('Illegal input: ' + err.message);
  }
}

/**
 * Missing Node interface.
 */
// TODO (TS): Get rid of this!
export enum NodeType {
  ELEMENT_NODE = 1,
  ATTRIBUTE_NODE,
  TEXT_NODE,
  CDATA_SECTION_NODE,
  ENTITY_REFERENCE_NODE,
  ENTITY_NODE,
  PROCESSING_INSTRUCTION_NODE,
  COMMENT_NODE,
  DOCUMENT_NODE,
  DOCUMENT_TYPE_NODE,
  DOCUMENT_FRAGMENT_NODE,
  NOTATION_NODE
}

/**
 * Cleanly replaces child nodes in a parent.
 *
 * @param oldNode The node to be replaced.
 * @param newNode The replacement node.
 */
export function replaceNode(oldNode: Node, newNode: Node) {
  if (!oldNode.parentNode) {
    return;
  }
  oldNode.parentNode.insertBefore(newNode, oldNode);
  oldNode.parentNode.removeChild(oldNode);
}

/**
 * Creates a node in the current document. This is a wrapper function that
 * ensures that a node is created in the correct document tree.
 *
 * @param tag The tagname of the node.
 * @returns The newly create node.
 */
export function createElement(tag: string): Element {
  return SystemExternal.document.createElement(tag);
}

/**
 * Creates a node in the current document in a given namespace. This is a
 * wrapper function that ensures that a node is created in the correct document
 * tree.
 *
 * @param url The namespace url for the node.
 * @param tag The tagname of the node.
 * @returns The newly create node.
 */
export function createElementNS(url: string, tag: string): Element {
  return SystemExternal.document.createElementNS(url, tag);
}

/**
 * Creates a text node in the current document. This is a wrapper function that
 * ensures that a node is created in the correct document tree.
 *
 * @param content The text content for the node.
 * @returns The newly create node.
 */
export function createTextNode(content: string): Text {
  return SystemExternal.document.createTextNode(content);
}

/**
 * Pretty prints an XML representation while dealing with mixed content:
 * Example:
 *
 * <a>A<b>B</b>C</a> is rewritten to
 * <a>A
 *   <b>B</b>
 *    C
 * </a>
 *
 * @param xml The serialised XML string.
 * @returns The formatted string.
 */
export function formatXml(xml: string): string {
  let formatted = '';
  let reg = /(>)(<)(\/*)/g;
  // Separate at touching tags.
  xml = xml.replace(reg, '$1\r\n$2$3');
  let pad = 0;
  let split = xml.split('\r\n');
  reg = /(\.)*(<)(\/*)/g;
  // Separate at any remaining tags.
  split = split
    .map((x) => x.replace(reg, '$1\r\n$2$3').split('\r\n'))
    .reduce((x, y) => x.concat(y), []);
  while (split.length) {
    let node = split.shift();
    if (!node) {
      continue;
    }
    let indent = 0;
    if (node.match(/^<\w[^>/]*>[^>]+$/)) {
      // Start node with trailing content.
      const match = matchingStartEnd(node, split[0]);
      if (match[0]) {
        // Combine with end node
        if (match[1]) {
          // Trailing mixed content after end node.
          node = node + split.shift().slice(0, -match[1].length);
          if (
            // In case of trailing spaces.
            match[1].trim()
          ) {
            split.unshift(match[1]);
          }
        } else {
          node = node + split.shift();
        }
      } else {
        indent = 1;
      }
    } else if (node.match(/^<\/\w/)) {
      // End node.
      if (pad !== 0) {
        pad -= 1;
      }
    } else if (node.match(/^<\w[^>]*[^/]>.*$/)) {
      // Simple start node.
      indent = 1;
    } else if (node.match(/^<\w[^>]*\/>.+$/)) {
      // Empty tag node with trailing mixed content.
      const position = node.indexOf('>') + 1;
      const rest = node.slice(position);
      if (
        // In case of trailing spaces.
        rest.trim()
      ) {
        split.unshift();
      }
      node = node.slice(0, position);
    } else {
      // Empty tag node
      indent = 0;
    }
    formatted += new Array(pad + 1).join('  ') + node + '\r\n';
    pad += indent;
  }
  return formatted;
}

/**
 * Checks for two tags if the second is a matching end tag for the first.
 *
 * @param start The start tag.
 * @param end The next, possible end tag.
 * @returns A pair indicating success and the possible
 *     remainder after the end tag, in case it is followed by mixed content.
 */
function matchingStartEnd(start: string, end: string): [boolean, string] {
  if (!end) {
    return [false, ''];
  }
  const tag1 = start.match(/^<([^> ]+).*>/);
  const tag2 = end.match(/^<\/([^>]+)>(.*)/);
  return tag1 && tag2 && tag1[1] === tag2[1] ? [true, tag2[2]] : [false, ''];
}

/**
 * A wrapper function for query selector on a node wrt. to an attribute. If
 * query selectors are not implemented on that node it reverts to Xpath.
 *
 * @param node A DOM node.
 * @param attr The data attribute.
 * @returns The list of result nodes.
 */
export function querySelectorAllByAttr(node: Element, attr: string): Element[] {
  return node.querySelectorAll
    ? toArray(node.querySelectorAll(`[${attr}]`))
    : XpathUtil.evalXPath(`.//*[@${attr}]`, node);
}

/**
 * A wrapper function for query selector on a node wrt. to an attribute. If
 * query selectors are not implemented on that node it reverts to Xpath.
 *
 * @param node A DOM node.
 * @param attr The data attribute.
 * @param value The value of the data attribute.
 * @returns The list of result nodes.
 */
export function querySelectorAllByAttrValue(
  node: Element,
  attr: string,
  value: string
): Element[] {
  return node.querySelectorAll
    ? toArray(node.querySelectorAll(`[${attr}="${value}"]`))
    : XpathUtil.evalXPath(`.//*[@${attr}="${value}"]`, node);
}

/**
 * A wrapper function for query selector on a node wrt. to a tag name. If
 * query selectors are not implemented on that node it reverts to Xpath.
 *
 * @param node A DOM node.
 * @param tag The tag name.
 * @returns The list of result nodes.
 */
export function querySelectorAll(node: Element, tag: string): Element[] {
  return node.querySelectorAll
    ? toArray(node.querySelectorAll(tag))
    : XpathUtil.evalXPath(`.//${tag}`, node);
}

/**
 * Returns the tagname of an element node in upper case.
 *
 * @param node The node.
 * @returns The node's tagname.
 */
export function tagName(node: Element): string {
  return node.tagName.toUpperCase();
}

/**
 * Deep clone of an Element, depending on the environment.
 *
 * @param node The element to be cloned.
 * @returns The deep clone.
 */
export function cloneNode(node: Element): Element {
  return node.cloneNode(true) as Element;
}

/**
 * Serializes and XML element.
 *
 * @param node The node to serialize.
 * @returns The serialized expression.
 */
export function serializeXml(node: Element): string {
  const xmls = new SystemExternal.xmldom.XMLSerializer();
  return xmls.serializeToString(node);
}
