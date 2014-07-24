// Copyright 2013 Google Inc.
// Copyright 2014 Volker Sorge
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


goog.provide('sre.XpathUtil');

goog.require('sre.SystemExternal');



/**
 * Utilities for simplifying working with xpaths
 * @constructor
 */
sre.XpathUtil = function() {
};


/**
 * Returns whether or not xpath is supported.
 * @return {boolean} True if xpath is supported.
 */
sre.XpathUtil.xpathSupported = function() {
  if (typeof(XPathResult) == 'undefined') {
    return false;
  }
  return true;
};


/**
 * @type {Function}
 */
sre.XpathUtil.xpathEvaluate = sre.XpathUtil.xpathSupported() ?
    document.evaluate : sre.SystemExternal.xpath.evaluate;


/**
 * @type {Function}
 */
sre.XpathUtil.xpathResult = sre.XpathUtil.xpathSupported() ?
    XPathResult : sre.SystemExternal.xpath.XPathResult;


/**
 * Mapping for some default namespaces.
 * @const
 * @private
 */
sre.XpathUtil.nameSpaces_ = {
  'xhtml' : 'http://www.w3.org/1999/xhtml',
  'mathml': 'http://www.w3.org/1998/Math/MathML'
};


/**
 * Resolve some default name spaces.
 * @param {string} prefix Namespace prefix.
 * @return {string} The corresponding namespace URI.
 */
sre.XpathUtil.resolveNameSpace = function(prefix) {
  return sre.XpathUtil.xpathSupported() ?
      sre.XpathUtil.nameSpaces_[prefix] || null : null;
};


/**
 * Given an XPath expression and rootNode, it returns an array of children nodes
 * that match. The code for this function was taken from Mihai Parparita's GMail
 * Macros Greasemonkey Script.
 * http://gmail-greasemonkey.googlecode.com/svn/trunk/scripts/gmail-new-macros.user.js
 * @param {string} expression The XPath expression to evaluate.
 * @param {Node} rootNode The HTML node to start evaluating the XPath from.
 * @return {Array} The array of children nodes that match.
 */
sre.XpathUtil.evalXPath = function(expression, rootNode) {
  try {
    var xpathIterator = sre.XpathUtil.xpathEvaluate(
        expression,
        rootNode,
        //sre.XpathUtil.resolveNameSpace,
        null,
        sre.XpathUtil.xpathResult.ORDERED_NODE_ITERATOR_TYPE,
        null); // no existing results
  } catch (err) {
    return [];
  }
  var results = [];
  // Convert result to JS array
  for (var xpathNode = xpathIterator.iterateNext();
       xpathNode;
       xpathNode = xpathIterator.iterateNext()) {
    results.push(xpathNode);
  }
  return results;
};


/**
 * Given a rootNode, it returns an array of all its leaf nodes.
 * @param {Node} rootNode The node to get the leaf nodes from.
 * @return {Array} The array of leaf nodes for the given rootNode.
 */
sre.XpathUtil.getLeafNodes = function(rootNode) {
  try {
    var xpathIterator = sre.XpathUtil.xpathEvaluate(
        './/*[count(*)=0]',
        rootNode,
        null, // no namespace resolver
        sre.XpathUtil.xpathResult.ORDERED_NODE_ITERATOR_TYPE,
        null); // no existing results
  } catch (err) {
    return [];
  }
  var results = [];
  // Convert result to JS array
  for (var xpathNode = xpathIterator.iterateNext();
       xpathNode;
       xpathNode = xpathIterator.iterateNext()) {
    results.push(xpathNode);
  }
  return results;
};


/**
 * Given an XPath expression and rootNode, it evaluates the XPath expression as
 * a boolean type and returns the result.
 * @param {string} expression The XPath expression to evaluate.
 * @param {Node} rootNode The HTML node to start evaluating the XPath from.
 * @return {boolean} The result of evaluating the xpath expression.
 */
sre.XpathUtil.evaluateBoolean = function(expression, rootNode) {
  try {
    var xpathResult = sre.XpathUtil.xpathEvaluate(
        expression,
        rootNode,
        //sre.XpathUtil.resolveNameSpace,
        null,
        sre.XpathUtil.xpathResult.BOOLEAN_TYPE,
        null); // no existing results
  } catch (err) {
    return false;
  }
  return xpathResult.booleanValue;
};


/**
 * Given an XPath expression and rootNode, it evaluates the XPath expression as
 * a string type and returns the result.
 * @param {string} expression The XPath expression to evaluate.
 * @param {Node} rootNode The HTML node to start evaluating the XPath from.
 * @return {string} The result of evaluating the Xpath expression.
 */
sre.XpathUtil.evaluateString = function(expression, rootNode) {
  try {
    var xpathResult = sre.XpathUtil.xpathEvaluate(
        expression,
        rootNode,
        //sre.XpathUtil.resolveNameSpace,
        null,
        sre.XpathUtil.xpathResult.STRING_TYPE,
        null); // no existing results
  } catch (err) {
    return '';
  }
  return xpathResult.stringValue;
};
