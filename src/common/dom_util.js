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
 * with DOM nodes.
 * Currently minimized for the standalone speech rule engine.
 * @author clchen@google.com (Charles L. Chen)
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


goog.provide('sre.DomUtil');

goog.require('sre.Engine');
goog.require('sre.XpathUtil');


/**
 * Converts a NodeList into an array
 * @param {!(NodeList|NamedNodeMap)} nodeList The nodeList.
 * @return {!Array} The array of nodes in the nodeList.
 */
sre.DomUtil.toArray = function(nodeList) {
  var nodeArray = [];
  for (var i = 0; i < nodeList.length; i++) {
    nodeArray.push(nodeList[i]);
  }
  return nodeArray;
};


/**
 * Trims the whitespace in an XML input string.
 * @param {string} input The XML input string.
 * @return {string} The string with whitespace removed between tags.
 * @private
 */
sre.DomUtil.trimInput_ = function(input) {
  input = input.replace(/&nbsp;/g, ' ');
  return input.replace(/>\s+</g, '><').trim();
};


/**
 * Parses the XML input string into an XML structure.
 * @param {string} input The XML input string.
 * @param {function (new:Error, string)=} opt_error Optional error function.
 * @return {!Element} The XML document structure corresponding to the node.
 */
sre.DomUtil.parseInput = function(input, opt_error) {
  var error = opt_error || Error;
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  var clean_input = sre.DomUtil.trimInput_(input);
  if (!clean_input) {
    var newError = new error('Empty input!');
    throw newError;
  }
  try {
    var doc = dp.parseFromString(clean_input, 'text/xml');
    if (sre.Engine.getInstance().mode === sre.Engine.Mode.HTTP) {
      sre.XpathUtil.currentDocument = doc;
    }
    return doc.documentElement;
  } catch (err) {
    throw new error('Illegal input: ' + err.message);
  }
};


/**
 * Missing Node interface.
 * @enum {number}
 */
sre.DomUtil.NodeType = {
  ELEMENT_NODE: 1,
  ATTRIBUTE_NODE: 2,
  TEXT_NODE: 3,
  CDATA_SECTION_NODE: 4,
  ENTITY_REFERENCE_NODE: 5,
  ENTITY_NODE: 6,
  PROCESSING_INSTRUCTION_NODE: 7,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11,
  NOTATION_NODE: 12
};


/**
 * Cleanly replaces child nodes in a parent.
 * @param {!Node} oldNode The node to be replaced.
 * @param {!Node} newNode The replacement node.
 */
sre.DomUtil.replaceNode = function(oldNode, newNode) {
  if (!oldNode.parentNode) {
    return;
  }
  oldNode.parentNode.insertBefore(newNode, oldNode);
  oldNode.parentNode.removeChild(oldNode);
};


/**
 * Pretty prints an XML representation.
 * @param {string} xml The serialised XML string.
 * @return {string} The formatted string.
 */
sre.DomUtil.formatXml = function(xml) {
  var reg = /(>)(<)(\/*)/g;
  xml = xml.replace(reg, '$1\r\n$2$3');
  reg = /(>)(.+)(<c)/g;
  xml = xml.replace(reg, '$1\r\n$2\r\n$3');
  var formatted = '';
  var padding = '';
  xml.split('\r\n')
      .forEach(function(node) {
        if (node.match(/.+<\/\w[^>]*>$/)) {
          // Node with content.
          formatted += padding + node + '\r\n';
        } else if (node.match(/^<\/\w/)) {
          if (padding) {
            // Closing tag
            padding = padding.slice(2);
            formatted += padding + node + '\r\n';
          }
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
          // Opening tag
          formatted += padding + node + '\r\n';
          padding += '  ';
        } else {
          // Empty tag
          formatted += padding + node + '\r\n';
        }
      });
  return formatted;
};


/**
 * Transforms a data attribute name into its camel cased version.
 * @param {!string} attr Micro data attributes.
 * @return {!string} The camel cased attribute.
 */
sre.DomUtil.dataAttribute = function(attr) {
  if (attr.match(/^data-/)) {
    attr = attr.substr(5);
  }
  return attr.replace(/-([a-z])/g, function(letter, index) {
    return index.toUpperCase();});
};


/**
 * Retrieves a data attribute from a given node. Tries using microdata access if
 * possible.
 * @param {!Node} node A DOM node.
 * @param {!string} attr The data attribute.
 * @return {!string} The value for that attribute.
 */
sre.DomUtil.getDataAttribute = function(node, attr) {
  if (node.dataset) {
    return node.dataset[sre.DomUtil.dataAttribute(attr)];
  }
  return node.getAttribute(attr);
};


/**
 * A wrapper function for query selector on a node wrt. to an attribute. If
 * query selectors are not implemented on that node it reverts to Xpath.
 * @param {!Node} node A DOM node.
 * @param {!string} attr The data attribute.
 * @return {!Array.<Node>} The list of result nodes.
 */
sre.DomUtil.querySelectorAllByAttr = function(node, attr) {
  return (node.querySelectorAll ?
          sre.DomUtil.toArray(node.querySelectorAll('[' + attr + ']')) :
          sre.XpathUtil.evalXPath('.//*[@' + attr + ']', node));
};


/**
 * A wrapper function for query selector on a node wrt. to an attribute. If
 * query selectors are not implemented on that node it reverts to Xpath.
 * @param {!Node} node A DOM node.
 * @param {!string} attr The data attribute.
 * @param {!string} value The value of the data attribute.
 * @return {!Array.<Node>} The list of result nodes.
 */
sre.DomUtil.querySelectorAllByAttrValue = function(node, attr, value) {
  return (node.querySelectorAll ?
          sre.DomUtil.toArray(
              node.querySelectorAll('[' + attr + '="' + value + '"]')) :
          sre.XpathUtil.evalXPath('.//*[@' + attr + '="' + value + '"]', node));
};


/**
 * A wrapper function for query selector on a node wrt. to a tag name. If
 * query selectors are not implemented on that node it reverts to Xpath.
 * @param {!Node} node A DOM node.
 * @param {!string} tag The tag name.
 * @return {!Array.<Node>} The list of result nodes.
 */
sre.DomUtil.querySelectorAll = function(node, tag) {
  return (node.querySelectorAll ?
          sre.DomUtil.toArray(node.querySelectorAll(tag)) :
          sre.XpathUtil.evalXPath('.//' + tag, node));
};
