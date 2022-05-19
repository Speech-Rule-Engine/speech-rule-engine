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
 * with xpaths.
 * The nodejs file depends on the xpath library.
 * @author clchen@google.com (Charles L. Chen)
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import Engine from './engine';
import * as EngineConst from '../common/engine_const';
import SystemExternal from './system_external';

/**
 * Returns whether or not xpath is supported.
 *
 * @returns True if xpath is supported.
 */
function xpathSupported(): boolean {
  if (typeof XPathResult === 'undefined') {
    return false;
  }
  return true;
}

/**
 * Holds variables that might need to be adjusted during document evaluation.
 *
 * currentDocument:  Current XML Document inside a browser.
 *
 * evaluate: Current evaluation method. Needs to be updated when running browser.
 *
 * result: Xpathresult enum.
 *
 * createNSResolver: Creates a new namespace resolver for a XML document.
 */
export const xpath: {
  currentDocument: Document;
  evaluate: (
    x: string,
    node: Node,
    nsr: Resolver,
    rt: number,
    result: XPathResult
  ) => XPathResult;
  result: any;
  createNSResolver: (nodeResolver: Node) => XPathNSResolver;
} = {
  currentDocument: null,
  evaluate: xpathSupported()
    ? document.evaluate
    : SystemExternal.xpath.evaluate,
  result: xpathSupported() ? XPathResult : SystemExternal.xpath.XPathResult,
  createNSResolver: xpathSupported()
    ? document.createNSResolver
    : SystemExternal.xpath.createNSResolver
};

/**
 * Mapping for some default namespaces.
 */
const nameSpaces: { [key: string]: string } = {
  xhtml: 'http://www.w3.org/1999/xhtml',
  mathml: 'http://www.w3.org/1998/Math/MathML',
  mml: 'http://www.w3.org/1998/Math/MathML',
  svg: 'http://www.w3.org/2000/svg'
};

/**
 * Resolve some default name spaces.
 *
 * @param prefix Namespace prefix.
 * @returns The corresponding namespace URI.
 */
export function resolveNameSpace(prefix: string): string {
  return nameSpaces[prefix] || null;
}

/**
 * Resolver to work with xpath in node and wgxpath in IE/Edge.
 */
class Resolver {
  public lookupNamespaceURI: any;
  constructor() {
    this.lookupNamespaceURI = resolveNameSpace;
  }
}

/**
 * Executes an xpath evaluation.
 *
 * @param expression The XPath expression to evaluate.
 * @param rootNode The HTML node to start evaluating the XPath from.
 * @param type The xpath result type.
 * @returns The result of the xpath computation.
 */
function evaluateXpath(
  expression: string,
  rootNode: Node,
  type: number
): XPathResult {
  return Engine.getInstance().mode === EngineConst.Mode.HTTP &&
    !Engine.getInstance().isIE &&
    !Engine.getInstance().isEdge
    ? xpath.currentDocument.evaluate(
        expression,
        rootNode,
        resolveNameSpace,
        type,
        null
      )
    : xpath.evaluate(expression, rootNode, new Resolver(), type, null);
}

/**
 * Given an XPath expression and rootNode, it returns an array of children
 * nodes that match.
 *
 * @param expression The XPath expression to evaluate.
 * @param rootNode The HTML node to start evaluating the XPath from.
 * @returns The array of children nodes that match.
 */
export function evalXPath(expression: string, rootNode: Node): Node[] {
  let iterator: XPathResult;
  try {
    iterator = evaluateXpath(
      expression,
      rootNode,
      xpath.result.ORDERED_NODE_ITERATOR_TYPE
    );
  } catch (err) {
    return [];
  }
  const results = [];
  // Convert result to JS array
  for (
    let xpathNode = iterator.iterateNext();
    xpathNode;
    xpathNode = iterator.iterateNext()
  ) {
    results.push(xpathNode);
  }
  return results;
}

/**
 * Given a rootNode, it returns an array of all its leaf nodes.
 *
 * @param rootNode The node to get the leaf nodes from.
 * @returns The array of leaf nodes for the given rootNode.
 */
export function getLeafNodes(rootNode: Node): Node[] {
  return evalXPath('.//*[count(*)=0]', rootNode);
}
/**
 * Given an XPath expression and rootNode, it evaluates the XPath expression
 * as a boolean type and returns the result.
 *
 * @param expression The XPath expression to evaluate.
 * @param rootNode The HTML node to start evaluating the XPath from.
 * @returns The result of evaluating the xpath expression.
 */
export function evaluateBoolean(expression: string, rootNode: Node): boolean {
  let result: XPathResult;
  try {
    result = evaluateXpath(expression, rootNode, xpath.result.BOOLEAN_TYPE);
  } catch (err) {
    return false;
  }
  return result.booleanValue;
}

/**
 * Given an XPath expression and rootNode, it evaluates the XPath expression
 * as a string type and returns the result.
 *
 * @param expression The XPath expression to evaluate.
 * @param rootNode The HTML node to start evaluating the XPath from.
 * @returns The result of evaluating the Xpath expression.
 */
export function evaluateString(expression: string, rootNode: Node): string {
  let result: XPathResult;
  try {
    result = evaluateXpath(expression, rootNode, xpath.result.STRING_TYPE);
  } catch (err) {
    return '';
  }
  return result.stringValue;
}

/**
 * Updates the evaluator method for the document of the given node. This is
 * particular important for XML documents in Firefox that generates a novel
 * object (plus evaluate method) for every document.
 *
 * @param node The target node that is to be evaluated.
 */
export function updateEvaluator(node: Element) {
  if (Engine.getInstance().mode !== EngineConst.Mode.HTTP) return;
  let parent = node as any as Document;
  while (parent && !parent.evaluate) {
    parent = parent.parentNode as Document;
  }
  if (parent && parent.evaluate) {
    xpath.currentDocument = parent;
  } else if (node.ownerDocument) {
    xpath.currentDocument = node.ownerDocument;
  }
}
