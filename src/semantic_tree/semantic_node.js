// Copyright 2013 Google Inc.
// Copyright 2014-16 Volker Sorge
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
 * @fileoverview Nodes in the semantic tree.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticNode');

goog.require('sre.SemanticAttr');
goog.require('sre.SystemExternal');



/**
 * @param {number} id Node id.
 * @constructor
 */
sre.SemanticNode = function(id) {
  /** @type {number} */
  this.id = id;

  /** @type {Array.<Element>} */
  this.mathml = [];

  /** @type {sre.SemanticNode} */
  this.parent = null;

  /** @type {sre.SemanticAttr.Type} */
  this.type = sre.SemanticAttr.Type.UNKNOWN;

  /** @type {sre.SemanticAttr.Role} */
  this.role = sre.SemanticAttr.Role.UNKNOWN;

  /** @type {sre.SemanticAttr.Font} */
  this.font = sre.SemanticAttr.Font.UNKNOWN;

  /** @type {?sre.SemanticAttr.Type} */
  this.embellished = null;

  /** @type {string} */
  this.fencePointer = '';

  /** @type {!Array.<sre.SemanticNode>} */
  this.childNodes = [];

  /** @type {string} */
  this.textContent = '';

  /**
   * The complete mml belonging to this node.
   * @type {Element}
   */
  this.mathmlTree = null;

  /**
   * Branch nodes can store additional nodes that can be useful.
   * E.g. a node of type FENCED can have the opening and closing fences here.
   * @type {!Array.<sre.SemanticNode>}
   */
  this.contentNodes = [];

  /**
   * @type {!Object.<Array.<string>>}
   */
  this.annotation = {};

  /**
   * Collection of external attributes.
   * @type {!Object.<string>}
   */
  this.attributes = {};

};


/**
 * Retrieve all subnodes (including the node itself) that satisfy a given
 * predicate.
 * @param {function(sre.SemanticNode): boolean} pred The predicate.
 * @return {!Array.<sre.SemanticNode>} The nodes in the tree for which the
 *     predicate holds.
 */
sre.SemanticNode.prototype.querySelectorAll = function(pred) {
  var result = [];
  for (var i = 0, child; child = this.childNodes[i]; i++) {
    result = result.concat(child.querySelectorAll(pred));
  }
  for (var i = 0, content; content = this.contentNodes[i]; i++) {
    result = result.concat(content.querySelectorAll(pred));
  }
  if (pred(this)) {
    result.unshift(this);
  }
  return result;
};


/**
 * The attributes of a semantic node.
 * @enum {string}
 */
sre.SemanticNode.Attribute = {
  EMBELLISHED: 'embellished',
  FENCEPOINTER: 'fencepointer',
  FONT: 'font',
  ID: 'id',
  ANNOTATION: 'annotation',
  ROLE: 'role',
  TYPE: 'type',
  CHILDREN: 'children',
  CONTENT: 'content',
  TEXT: '$t'
};


/**
  * An XML tree representation of the current node.
  * @param {Document} xml The XML document.
  * @param {boolean=} opt_brief If set attributes are omitted.
  * @return {Node} The XML representation of the node.
  */
sre.SemanticNode.prototype.xml = function(xml, opt_brief) {
  /**
    * Translates a list of nodes into XML representation.
    * @param {string} tag Name of the enclosing tag.
    * @param {!Array.<!sre.SemanticNode>} nodes A list of nodes.
    * @return {Node} An XML representation of the node list.
    */
  var xmlNodeList = function(tag, nodes) {
    var xmlNodes = nodes.map(function(x) {return x.xml(xml, opt_brief);});
    var tagNode = xml.createElementNS('', tag);
    for (var i = 0, child; child = xmlNodes[i]; i++) {
      tagNode.appendChild(child);
    }
    return tagNode;
  };
  var node = xml.createElementNS('', this.type);
  if (!opt_brief) {
    this.xmlAttributes_(node);
  }
  node.textContent = this.textContent;
  if (this.contentNodes.length > 0) {
    node.appendChild(xmlNodeList(sre.SemanticNode.Attribute.CONTENT,
                                 this.contentNodes));
  }
  if (this.childNodes.length > 0) {
    node.appendChild(xmlNodeList(sre.SemanticNode.Attribute.CHILDREN,
                                 this.childNodes));
  }
  return node;
};


/**
 * Serializes the XML representation of a node.
 * @param {boolean=} opt_brief If attributes are to be omitted.
 * @return {string} Serialized string.
 */
sre.SemanticNode.prototype.toString = function(opt_brief) {
  var xmls = new sre.SystemExternal.xmldom.XMLSerializer();
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  var xml = dp.parseFromString('<snode/>', 'text/xml');
  return xmls.serializeToString(this.xml(xml, opt_brief));
};


/**
 * Adds attributes to the XML representation of the current node.
 * @param {Node} node The XML node.
 * @private
 */
sre.SemanticNode.prototype.xmlAttributes_ = function(node) {
  var attributes = this.allAttributes();
  for (var i = 0, attr; attr = attributes[i]; i++) {
    node.setAttribute(attr[0], attr[1]);
  }
  this.addExternalAttributes_(node);
};


/**
 * Computes a list of attributes of the semantic node.
 * @return {!Array.<Array.<sre.SemanticNode.Attribute, string>>} A list of
 *     pairs.
 */
sre.SemanticNode.prototype.allAttributes = function() {
  var attributes = [];
  attributes.push([sre.SemanticNode.Attribute.ROLE, this.role]);
  if (this.font != sre.SemanticAttr.Font.UNKNOWN) {
    attributes.push([sre.SemanticNode.Attribute.FONT, this.font]);
  }
  if (Object.keys(this.annotation).length) {
    attributes.push(
        [sre.SemanticNode.Attribute.ANNOTATION, this.xmlAnnotation()]);
  }
  if (this.embellished) {
    attributes.push([sre.SemanticNode.Attribute.EMBELLISHED, this.embellished]);
  }
  if (this.fencePointer) {
    attributes.push([sre.SemanticNode.Attribute.FENCEPOINTER,
                     this.fencePointer]);
  }
  attributes.push([sre.SemanticNode.Attribute.ID, this.id]);
  return attributes;
};


/**
 * Adds the external attributes for this node to its XML representation.
 * @param {Node} node The XML node.
 * @private
 */
sre.SemanticNode.prototype.addExternalAttributes_ = function(node) {
  for (var attr in this.attributes) {
    node.setAttribute(attr, this.attributes[attr]);
  }
};


/**
 * Turns annotation structure into an attribute.
 * @return {string} XML string for annotation.
 */
sre.SemanticNode.prototype.xmlAnnotation = function() {
  var result = [];
  for (var key in this.annotation) {
    this.annotation[key].forEach(function(mean) {
      result.push(key + ':' + mean);
    });
  }
  return result.join(';');
};


/**
 * Turns node into JSON format.
 * @return {JSONType} The JSON object for the node.
 */
sre.SemanticNode.prototype.toJson = function() {
  var json = /** @type {JSONType} */({});
  json[sre.SemanticNode.Attribute.TYPE] = this.type;
  var attributes = this.allAttributes();
  for (var i = 0, attr; attr = attributes[i]; i++) {
    json[attr[0]] = attr[1].toString();
  }
  if (this.textContent) {
    json[sre.SemanticNode.Attribute.TEXT] = this.textContent;
  }
  if (this.childNodes.length) {
    json[sre.SemanticNode.Attribute.CHILDREN] =
        this.childNodes.map(function(child) {return child.toJson();});
  }
  if (this.contentNodes.length) {
    json[sre.SemanticNode.Attribute.CONTENT] =
        this.contentNodes.map(function(child) {return child.toJson();});
  }
  return json;
};


/**
 * Updates the content of the node thereby possibly changing type and role.
 * @param {string} content The new content string.
 * @param {boolean=} opt_text Text indicator. If true non-breaking spaces are
 *     retained.
 */
sre.SemanticNode.prototype.updateContent = function(content, opt_text) {
  // Remove superfluous whitespace only if it is not the only content!
  // But without removing non-breaking spaces if we have a text.
  var newContent = opt_text ?
      content.replace(/^[ \f\n\r\t\v​]*/, '').replace(/[ \f\n\r\t\v​]*$/, '') :
      content.trim();
  // TODO (simons): If content contains a space, then assume type to be text.
  content = (content && !newContent) ? content : newContent;
  if (this.textContent == content) {
    return;
  }
  var meaning = sre.SemanticAttr.lookupMeaning(content);
  this.textContent = content;
  this.role = meaning.role;
  this.type = meaning.type;
  this.font = meaning.font;
};


/**
 * Adds MathML nodes to the node's store of MathML nodes if necessary only, as
 * we can not necessarily assume that the MathML of the content nodes and
 * children are all disjoint.
 * @param {Array.<Element>} mmlNodes List of MathML nodes.
 */
sre.SemanticNode.prototype.addMathmlNodes = function(mmlNodes) {
  for (var i = 0, mml; mml = mmlNodes[i]; i++) {
    if (this.mathml.indexOf(mml) == -1) {
      this.mathml.push(mml);
    }
  }
};


/**
 * Removes MathML nodes from the node's store of MathML nodes.
 * @param {Array.<Element>} mmlNodes List of MathML nodes.
 * @private
 */
sre.SemanticNode.prototype.removeMathmlNodes_ = function(mmlNodes) {
  var mmlList = this.mathml;
  for (var i = 0, mml; mml = mmlNodes[i]; i++) {
    var index = mmlList.indexOf(mml);
    if (index != -1) {
      mmlList.splice(index, 1);
    }
  }
  this.mathml = mmlList;
};


/**
 * Appends a child to the node.
 * @param {sre.SemanticNode} child The new child.
 */
sre.SemanticNode.prototype.appendChild = function(child) {
  this.childNodes.push(child);
  this.addMathmlNodes(child.mathml);
  child.parent = this;
};


/**
 * Replaces a child node of the node.
 * @param {!sre.SemanticNode} oldNode The node to be replaced.
 * @param {!sre.SemanticNode} newNode The new node.
 */
sre.SemanticNode.prototype.replaceChild = function(oldNode, newNode) {
  var index = this.childNodes.indexOf(oldNode);
  if (index == -1) {
    return;
  }
  oldNode.parent = null;
  newNode.parent = this;
  this.childNodes[index] = newNode;
  // To not mess up the order of MathML elements more than necessary, we only
  // remove and add difference lists. The hope is that we might end up with
  // little change.
  var removeMathml = oldNode.mathml.filter(
      function(x) {return newNode.mathml.indexOf(x) == -1;});
  var addMathml = newNode.mathml.filter(
      function(x) {return oldNode.mathml.indexOf(x) == -1;});
  this.removeMathmlNodes_(removeMathml);
  this.addMathmlNodes(addMathml);
};


/**
 * Appends a content node to the node.
 * @param {sre.SemanticNode} node The new content node.
 */
sre.SemanticNode.prototype.appendContentNode = function(node) {
  if (node) {
    this.contentNodes.push(node);
    this.addMathmlNodes(node.mathml);
    node.parent = this;
  }
};


/**
 * Removes a content node from the node.
 * @param {sre.SemanticNode} node The content node to be removed.
 */
sre.SemanticNode.prototype.removeContentNode = function(node) {
  if (node) {
    var index = this.contentNodes.indexOf(node);
    if (index != -1) {
      this.contentNodes.slice(index, 1);
    }
  }
};


/**
 * Tests if node is equal to the given node. Two nodes are considered equal if
 * they have the same type, role, content and all its children are equal.
 * @param {sre.SemanticNode} node The node to test against.
 * @return {boolean} True if nodes are equal wrt. structure and content.
 */
sre.SemanticNode.prototype.equals = function(node) {
  if (!node) {
    return false;
  }
  if (this.type !== node.type || this.role !== node.role ||
      this.textContent !== node.textContent ||
      this.childNodes.length !== node.childNodes.length ||
      this.contentNodes.length !== node.contentNodes.length) {
    return false;
  }
  for (var i = 0, node1, node2;
       node1 = this.childNodes[i], node2 = node.childNodes[i]; i++) {
    if (!node1.equals(node2)) {
      return false;
    }
  }
  for (i = 0;
       node1 = this.contentNodes[i], node2 = node.contentNodes[i]; i++) {
    if (!node1.equals(node2)) {
      return false;
    }
  }
  return true;
};


/**
 * Convenience method to display the whole tree and its elements.
 */
sre.SemanticNode.prototype.displayTree = function() {
  console.info(this.displayTree_(0));
};


/**
 * Convenience method to display the whole tree and its elements.
 * @param {number} depth The depth of the tree.
 * @return {string} String with nested tree display.
 * @private
 */
sre.SemanticNode.prototype.displayTree_ = function(depth) {
  depth++;
  var depthString = Array(depth).join('  ');
  var result = '';
  result += '\n' + depthString + this.toString();
  result += '\n' + depthString + 'MathmlTree:';
  result += '\n' + depthString + this.mathmlTreeString_();
  result += '\n' + depthString + 'MathML:';
  for (var i = 0, mml; mml = this.mathml[i]; i++) {
    result += '\n' + depthString + mml.toString();
  }
  result += '\n' + depthString + 'Begin Content';
  this.contentNodes.forEach(function(x) {result += x.displayTree_(depth);});
  result += '\n' + depthString + 'End Content';
  result += '\n' + depthString + 'Begin Children';
  this.childNodes.forEach(function(x) {result += x.displayTree_(depth);});
  result += '\n' + depthString + 'End Children';
  return result;
};


/**
 * Returns a display version of the node's associated MathML tree.
 * @return {string} The MathML tree as string or EMPTY.
 * @private
 */
sre.SemanticNode.prototype.mathmlTreeString_ = function() {
  return this.mathmlTree ? this.mathmlTree.toString() : 'EMPTY';
};


/**
 * Adds a new annotation annotation if annotation is not empty.
 * @param {string} domain The domain.
 * @param {string} annotation The annotation.
 */
sre.SemanticNode.prototype.addAnnotation = function(domain, annotation) {
  if (annotation) {
    this.addAnnotation_(domain, annotation);
  }
};


/**
 * Adds a new annotation annotation.
 * @param {string} domain The domain.
 * @param {string} annotation The annotation.
 * @private
 */
sre.SemanticNode.prototype.addAnnotation_ = function(domain, annotation) {
  var content = this.annotation[domain];
  if (content) {
    content.push(annotation);
  } else {
    this.annotation[domain] = [annotation];
  }
};


/**
 * Retrieves the annotation annotations for a particular domain.
 * @param {string} domain The domain.
 * @return {Array.<string>} The annotation annotations.
 */
sre.SemanticNode.prototype.getAnnotation = function(domain) {
  var content = this.annotation[domain];
  return content ? content : [];
};


/**
 * Checks if a node has a particular annotation.
 * @param {string} domain The domain.
 * @param {string} annotation The annotation.
 * @return {boolean} True if the annotation is contained.
 */
sre.SemanticNode.prototype.hasAnnotation = function(domain, annotation) {
  var content = this.annotation[domain];
  if (!content) {
    return false;
  }
  return content.indexOf(annotation) !== -1;
};


/**
 * Parses a annotation string as given, for example, in an attribute.
 * @param {string} stateStr The state string for the annotation.
 */
sre.SemanticNode.prototype.parseAnnotation = function(stateStr) {
  var annotations = stateStr.split(';');
  for (var i = 0, l = annotations.length; i < l; i++) {
    var annotation = annotations[i].split(':');
    this.addAnnotation(annotation[0], annotation[1]);
  }
};


/**
 * @return {sre.SemanticMeaning} The semantic meaning of the node.
 */
sre.SemanticNode.prototype.meaning = function() {
  return {type: this.type, role: this.role, font: this.font};
};


/**
 * Generates a semantic node from its XML representation.
 * @param {!Element} xml The XML representation.
 * @return {!sre.SemanticNode} The generated semantic node.
 */
sre.SemanticNode.fromXml = function(xml) {
  var id = parseInt(xml.getAttribute('id'), 10);
  var node = new sre.SemanticNode(id);
  node.type = /** @type {sre.SemanticAttr.Type} */(xml.tagName);
  sre.SemanticNode.setAttribute_(node, xml, 'role');
  sre.SemanticNode.setAttribute_(node, xml, 'font');
  sre.SemanticNode.setAttribute_(node, xml, 'embellished');
  sre.SemanticNode.setAttribute_(node, xml, 'fencepointer', 'fencePointer');
  if (xml.getAttribute('annotation')) {
    node.parseAnnotation(xml.getAttribute('annotation'));
  }
  sre.SemanticUtil.addAttributes(node, xml);
  sre.SemanticNode.processChildren_(node, xml);
  return node;
};


/**
 * Adds the given attributed to the semantic node if it exists.
 * @param {sre.SemanticNode} node The semantic node.
 * @param {Element} xml The XML element representation of the node.
 * @param {string} attribute The name of the attribute.
 * @param {string=} opt_name Optionally the field name for the attribute in the
 *     semantic node if it differs.
 * @private
 */
sre.SemanticNode.setAttribute_ = function(node, xml, attribute, opt_name) {
  opt_name = opt_name || attribute;
  let value = xml.getAttribute(attribute);
  if (value) {
    node[opt_name] = value;
  }
};


/**
 * Processes the children of the XML node to set text content, child nodes and
 * content nodes of the semantic node.
 * @param {sre.SemanticNode} node The semantic node.
 * @param {Element} xml The XML element representation of the node.
 */
sre.SemanticNode.processChildren_ = function(node, xml) {
  for (var child of sre.DomUtil.toArray(xml.childNodes)) {
    if (child.nodeType === sre.DomUtil.NodeType.TEXT_NODE) {
      node.textContent = child.textContent;
      continue;
    }
    var children = sre.DomUtil.toArray(child.childNodes)
        .map(sre.SemanticNode.fromXml);
    children.forEach(function(x) {
      x.parent = node;
    });
    if (sre.DomUtil.tagName(child) === 'CONTENT') {
      node.contentNodes = children;
    } else {
      node.childNodes = children;
    }
  }
};
