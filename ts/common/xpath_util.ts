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
 * @fileoverview A collection of JavaScript utilities used to simplify working
 * with xpaths.
 * The nodejs file depends on the xpath library.
 * @author clchen@google.com (Charles L. Chen)
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {Engine, EngineConst} from './engine';
import SystemExternal from './system_external';


namespace XpathUtil {

  /**
   * Returns whether or not xpath is supported.
   * @return True if xpath is supported.
   */
  export function xpathSupported(): boolean {
    if (typeof XPathResult === 'undefined') {
      return false;
    }
    return true;
  }

  /**
   * Current XML Document inside a browser.
   */
  export let currentDocument: Document = null;


  export let xpathEvaluate: (x: string, node: Node, nsr: Resolver, rt: number, result: XPathResult) => XPathResult =
    xpathSupported() ? document.evaluate : SystemExternal.xpath.evaluate;


  export let xpathResult: any  =
    xpathSupported() ? XPathResult : SystemExternal.xpath.XPathResult;


  export let createNSResolver: Function = xpathSupported() ?
    document.createNSResolver :
    SystemExternal.xpath.createNSResolver;


  /**
   * Mapping for some default namespaces.
   */
  const nameSpaces: {[key: string]: string} = {
    'xhtml': 'http://www.w3.org/1999/xhtml',
    'mathml': 'http://www.w3.org/1998/Math/MathML',
    'mml': 'http://www.w3.org/1998/Math/MathML',
    'svg': 'http://www.w3.org/2000/svg'
  };


  /**
   * Resolve some default name spaces.
   * @param prefix Namespace prefix.
   * @return The corresponding namespace URI.
   */
  export function resolveNameSpace(prefix: string): string {
    return nameSpaces[prefix] || null;
  }


  /**
   * Resolver to work with xpath in node and wgxpath in IE/Edge.
   */
  export class Resolver {
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
   * @return The result of the xpath computation.
   */
  export function evaluateXpath_(
    expression: string, rootNode: Node, type: number): XPathResult {
    return Engine.mode === EngineConst.Mode.HTTP &&
      !Engine.getInstance().isIE && !Engine.getInstance().isEdge ?
      currentDocument.evaluate(
        expression, rootNode, resolveNameSpace, type, null) :
      xpathEvaluate(expression, rootNode, new Resolver(), type, null);
  }


  /**
   * Given an XPath expression and rootNode, it returns an array of children
   * nodes that match.
   *
   * @param expression The XPath expression to evaluate.
   * @param rootNode The HTML node to start evaluating the XPath from.
   * @return The array of children nodes that match.
   */
  export function evalXPath(expression: string, rootNode: Node): Node[] {
    let iterator: XPathResult;
    try {
      iterator = evaluateXpath_(
        expression, rootNode, xpathResult.ORDERED_NODE_ITERATOR_TYPE);
    } catch (err) {
      return [];
    }
    let results = [];
    // Convert result to JS array
    for (let xpathNode = iterator.iterateNext(); xpathNode;
         xpathNode = iterator.iterateNext()) {
      results.push(xpathNode);
    }
    return results;
  }


  /**
   * Given a rootNode, it returns an array of all its leaf nodes.
   *
   * @param rootNode The node to get the leaf nodes from.
   * @return The array of leaf nodes for the given rootNode.
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
   * @return The result of evaluating the xpath expression.
   */
  export function evaluateBoolean(expression: string, rootNode: Node): boolean {
    let result: XPathResult;
    try {
      result = evaluateXpath_(expression, rootNode, xpathResult.BOOLEAN_TYPE);
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
   * @return The result of evaluating the Xpath expression.
   */
  export function evaluateString(expression: string, rootNode: Node): string {
    let result: XPathResult;
      try {
        result = evaluateXpath_(expression, rootNode, xpathResult.STRING_TYPE);
    } catch (err) {
      return '';
    }
    return result.stringValue;
  }

}

export default XpathUtil;
