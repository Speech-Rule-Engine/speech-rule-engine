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
 * @fileoverview Nodes in the semantic tree.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {SystemExternal} from '../common/system_external';

import {SemanticMeaning} from './semantic_attr';
import {SemanticAttr} from './semantic_attr';



/**
 * @param id Node id.
 */
export class SemanticNode {
  /**
   * The attributes of a semantic node.
   */
  static Attribute = {
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

  mathml: Element[] = [];

  parent: SemanticNode = null;

  type: SemanticAttr.Type;

  role: SemanticAttr.Role;

  font: SemanticAttr.Font;

  embellished: SemanticAttr.Type|null = null;

  fencePointer: string = '';

  childNodes: SemanticNode[] = [];

  textContent: string = '';

  /**
   * The complete mml belonging to this node.
   */
  mathmlTree: Element = null;

  /**
   * Branch nodes can store additional nodes that can be useful.
   * E.g. a node of type FENCED can have the opening and closing fences here.
   */
  contentNodes: SemanticNode[] = [];

  annotation: {[key: any]: string[]} = {};

  /**
   * Collection of external attributes.
   */
  attributes: {[key: any]: string} = {};

  /**
   * Is the node non-breaking, i.e., external attributes are so important that
   * no heuristic should ignore them.
   */
  nobreaking: boolean = false;
  constructor(public id: number) {
    this.type = SemanticAttr.Type.UNKNOWN;
    this.role = SemanticAttr.Role.UNKNOWN;
    this.font = SemanticAttr.Font.UNKNOWN;
  }


  /**
   * Retrieve all subnodes (including the node itself) that satisfy a given
   * predicate.
   * @param pred The predicate.
   * @return The nodes in the tree for which the
   *     predicate holds.
   */
  querySelectorAll(pred: (p1: SemanticNode) => boolean): SemanticNode[] {
    let result = [];
    for (let i = 0, child; child = this.childNodes[i]; i++) {
      result = result.concat(child.querySelectorAll(pred));
    }
    for (let i = 0, content; content = this.contentNodes[i]; i++) {
      result = result.concat(content.querySelectorAll(pred));
    }
    if (pred(this)) {
      result.unshift(this);
    }
    return result;
  }


  /**
   * An XML tree representation of the current node.
   * @param xml The XML document.
   * @param opt_brief If set attributes are omitted.
   * @return The XML representation of the node.
   */
  xml(xml: Document, opt_brief?: boolean): Node {
    /**
     * Translates a list of nodes into XML representation.
     * @param tag Name of the enclosing tag.
     * @param nodes A list of nodes.
     * @return An XML representation of the node list.
     */
    let xmlNodeList = function(tag: string, nodes: SemanticNode[]): Node {
      let xmlNodes = nodes.map(function(x) {
        return x.xml(xml, opt_brief);
      });
      let tagNode = xml.createElementNS('', tag);
      for (let i = 0, child; child = xmlNodes[i]; i++) {
        tagNode.appendChild(child);
      }
      return tagNode;
    };
    let node = xml.createElementNS('', this.type);
    if (!opt_brief) {
      this.xmlAttributes_(node);
    }
    node.textContent = this.textContent;
    if (this.contentNodes.length > 0) {
      node.appendChild(
          xmlNodeList(SemanticNode.Attribute.CONTENT, this.contentNodes));
    }
    if (this.childNodes.length > 0) {
      node.appendChild(
          xmlNodeList(SemanticNode.Attribute.CHILDREN, this.childNodes));
    }
    return node;
  }


  /**
   * Serializes the XML representation of a node.
   * @param opt_brief If attributes are to be omitted.
   * @return Serialized string.
   */
  toString(opt_brief?: boolean): string {
    let xmls = new SystemExternal.xmldom.XMLSerializer();
    let dp = new SystemExternal.xmldom.DOMParser();
    let xml = dp.parseFromString('<snode/>', 'text/xml');
    return xmls.serializeToString(this.xml(xml, opt_brief));
  }


  /**
   * Adds attributes to the XML representation of the current node.
   * @param node The XML node.
   */
  private xmlAttributes_(node: Node) {
    let attributes = this.allAttributes();
    for (let i = 0, attr; attr = attributes[i]; i++) {
      node.setAttribute(attr[0], attr[1]);
    }
    this.addExternalAttributes_(node);
  }


  /**
   * Computes a list of attributes of the semantic node.
   * @return A list of
   *     pairs.
   */
  allAttributes(): SemanticNode.Attribute[][] {
    let attributes = [];
    attributes.push([SemanticNode.Attribute.ROLE, this.role]);
    if (this.font != SemanticAttr.Font.UNKNOWN) {
      attributes.push([SemanticNode.Attribute.FONT, this.font]);
    }
    if (Object.keys(this.annotation).length) {
      attributes.push(
          [SemanticNode.Attribute.ANNOTATION, this.xmlAnnotation()]);
    }
    if (this.embellished) {
      attributes.push([SemanticNode.Attribute.EMBELLISHED, this.embellished]);
    }
    if (this.fencePointer) {
      attributes.push([SemanticNode.Attribute.FENCEPOINTER, this.fencePointer]);
    }
    attributes.push([SemanticNode.Attribute.ID, this.id]);
    return attributes;
  }


  /**
   * Adds the external attributes for this node to its XML representation.
   * @param node The XML node.
   */
  private addExternalAttributes_(node: Node) {
    for (let attr in this.attributes) {
      node.setAttribute(attr, this.attributes[attr]);
    }
  }


  /**
   * Turns annotation structure into an attribute.
   * @return XML string for annotation.
   */
  xmlAnnotation(): string {
    let result = [];
    for (let key in this.annotation) {
      this.annotation[key].forEach(function(mean) {
        result.push(key + ':' + mean);
      });
    }
    return result.join(';');
  }


  /**
   * Turns node into JSON format.
   * @return The JSON object for the node.
   */
  toJson(): JSONType {
    let json = ({} as JSONType);
    json[SemanticNode.Attribute.TYPE] = this.type;
    let attributes = this.allAttributes();
    for (let i = 0, attr; attr = attributes[i]; i++) {
      json[attr[0]] = attr[1].toString();
    }
    if (this.textContent) {
      json[SemanticNode.Attribute.TEXT] = this.textContent;
    }
    if (this.childNodes.length) {
      json[SemanticNode.Attribute.CHILDREN] =
          this.childNodes.map(function(child) {
            return child.toJson();
          });
    }
    if (this.contentNodes.length) {
      json[SemanticNode.Attribute.CONTENT] =
          this.contentNodes.map(function(child) {
            return child.toJson();
          });
    }
    return json;
  }


  /**
   * Updates the content of the node thereby possibly changing type and role.
   * @param content The new content string.
   * @param opt_text Text indicator. If true non-breaking spaces are
   *     retained.
   */
  updateContent(content: string, opt_text?: boolean) {
    // Remove superfluous whitespace only if it is not the only content!
    // But without removing non-breaking spaces if we have a text.
    let newContent = opt_text ? content.replace(/^[ \f\n\r\t\v\u200b]*/, '')
                                    .replace(/[ \f\n\r\t\v\u200b]*$/, '') :
                                content.trim();
    // TODO (simons): If content contains a space, then assume type to be text.
    content = content && !newContent ? content : newContent;
    if (this.textContent == content) {
      return;
    }
    let meaning = SemanticAttr.lookupMeaning(content);
    this.textContent = content;
    this.role = meaning.role;
    this.type = meaning.type;
    this.font = meaning.font;
  }


  /**
   * Adds MathML nodes to the node's store of MathML nodes if necessary only, as
   * we can not necessarily assume that the MathML of the content nodes and
   * children are all disjoint.
   * @param mmlNodes List of MathML nodes.
   */
  addMathmlNodes(mmlNodes: Element[]) {
    for (let i = 0, mml; mml = mmlNodes[i]; i++) {
      if (this.mathml.indexOf(mml) == -1) {
        this.mathml.push(mml);
      }
    }
  }


  /**
   * Removes MathML nodes from the node's store of MathML nodes.
   * @param mmlNodes List of MathML nodes.
   */
  private removeMathmlNodes_(mmlNodes: Element[]) {
    let mmlList = this.mathml;
    for (let i = 0, mml; mml = mmlNodes[i]; i++) {
      let index = mmlList.indexOf(mml);
      if (index != -1) {
        mmlList.splice(index, 1);
      }
    }
    this.mathml = mmlList;
  }


  /**
   * Appends a child to the node.
   * @param child The new child.
   */
  appendChild(child: SemanticNode) {
    this.childNodes.push(child);
    this.addMathmlNodes(child.mathml);
    child.parent = this;
  }


  /**
   * Replaces a child node of the node.
   * @param oldNode The node to be replaced.
   * @param newNode The new node.
   */
  replaceChild(oldNode: SemanticNode, newNode: SemanticNode) {
    let index = this.childNodes.indexOf(oldNode);
    if (index == -1) {
      return;
    }
    oldNode.parent = null;
    newNode.parent = this;
    this.childNodes[index] = newNode;
    // To not mess up the order of MathML elements more than necessary, we only
    // remove and add difference lists. The hope is that we might end up with
    // little change.
    let removeMathml = oldNode.mathml.filter(function(x) {
      return newNode.mathml.indexOf(x) == -1;
    });
    let addMathml = newNode.mathml.filter(function(x) {
      return oldNode.mathml.indexOf(x) == -1;
    });
    this.removeMathmlNodes_(removeMathml);
    this.addMathmlNodes(addMathml);
  }


  /**
   * Appends a content node to the node.
   * @param node The new content node.
   */
  appendContentNode(node: SemanticNode) {
    if (node) {
      this.contentNodes.push(node);
      this.addMathmlNodes(node.mathml);
      node.parent = this;
    }
  }


  /**
   * Removes a content node from the node.
   * @param node The content node to be removed.
   */
  removeContentNode(node: SemanticNode) {
    if (node) {
      let index = this.contentNodes.indexOf(node);
      if (index != -1) {
        this.contentNodes.slice(index, 1);
      }
    }
  }


  /**
   * Tests if node is equal to the given node. Two nodes are considered equal if
   * they have the same type, role, content and all its children are equal.
   * @param node The node to test against.
   * @return True if nodes are equal wrt. structure and content.
   */
  equals(node: SemanticNode): boolean {
    if (!node) {
      return false;
    }
    if (this.type !== node.type || this.role !== node.role ||
        this.textContent !== node.textContent ||
        this.childNodes.length !== node.childNodes.length ||
        this.contentNodes.length !== node.contentNodes.length) {
      return false;
    }
    for (let i = 0, node1, node2;
         node1 = this.childNodes[i], node2 = node.childNodes[i]; i++) {
      if (!node1.equals(node2)) {
        return false;
      }
    }
    for (i = 0; node1 = this.contentNodes[i], node2 = node.contentNodes[i];
         i++) {
      if (!node1.equals(node2)) {
        return false;
      }
    }
    return true;
  }


  /**
   * Convenience method to display the whole tree and its elements.
   */
  displayTree() {
    console.info(this.displayTree_(0));
  }


  /**
   * Convenience method to display the whole tree and its elements.
   * @param depth The depth of the tree.
   * @return String with nested tree display.
   */
  private displayTree_(depth: number): string {
    depth++;
    let depthString = Array(depth).join('  ');
    let result = '';
    result += '\n' + depthString + this.toString();
    result += '\n' + depthString + 'MathmlTree:';
    result += '\n' + depthString + this.mathmlTreeString_();
    result += '\n' + depthString + 'MathML:';
    for (let i = 0, mml; mml = this.mathml[i]; i++) {
      result += '\n' + depthString + mml.toString();
    }
    result += '\n' + depthString + 'Begin Content';
    this.contentNodes.forEach(function(x) {
      result += x.displayTree_(depth);
    });
    result += '\n' + depthString + 'End Content';
    result += '\n' + depthString + 'Begin Children';
    this.childNodes.forEach(function(x) {
      result += x.displayTree_(depth);
    });
    result += '\n' + depthString + 'End Children';
    return result;
  }


  /**
   * Returns a display version of the node's associated MathML tree.
   * @return The MathML tree as string or EMPTY.
   */
  private mathmlTreeString_(): string {
    return this.mathmlTree ? this.mathmlTree.toString() : 'EMPTY';
  }


  /**
   * Adds a new annotation annotation if annotation is not empty.
   * @param domain The domain.
   * @param annotation The annotation.
   */
  addAnnotation(domain: string, annotation: string) {
    if (annotation) {
      this.addAnnotation_(domain, annotation);
    }
  }


  /**
   * Adds a new annotation annotation.
   * @param domain The domain.
   * @param annotation The annotation.
   */
  private addAnnotation_(domain: string, annotation: string) {
    let content = this.annotation[domain];
    if (content) {
      content.push(annotation);
    } else {
      this.annotation[domain] = [annotation];
    }
  }


  /**
   * Retrieves the annotation annotations for a particular domain.
   * @param domain The domain.
   * @return The annotation annotations.
   */
  getAnnotation(domain: string): string[] {
    let content = this.annotation[domain];
    return content ? content : [];
  }


  /**
   * Checks if a node has a particular annotation.
   * @param domain The domain.
   * @param annotation The annotation.
   * @return True if the annotation is contained.
   */
  hasAnnotation(domain: string, annotation: string): boolean {
    let content = this.annotation[domain];
    if (!content) {
      return false;
    }
    return content.indexOf(annotation) !== -1;
  }


  /**
   * Parses a annotation string as given, for example, in an attribute.
   * @param stateStr The state string for the annotation.
   */
  parseAnnotation(stateStr: string) {
    let annotations = stateStr.split(';');
    for (let i = 0, l = annotations.length; i < l; i++) {
      let annotation = annotations[i].split(':');
      this.addAnnotation(annotation[0], annotation[1]);
    }
  }


  /**
   * @return The semantic meaning of the node.
   */
  meaning(): SemanticMeaning {
    return {type: this.type, role: this.role, font: this.font};
  }


  /**
   * Generates a semantic node from its XML representation.
   * @param xml The XML representation.
   * @return The generated semantic node.
   */
  static fromXml(xml: Element): SemanticNode {
    let id = parseInt(xml.getAttribute('id'), 10);
    let node = new SemanticNode(id);
    node.type = (xml.tagName as SemanticAttr.Type);
    SemanticNode.setAttribute_(node, xml, 'role');
    SemanticNode.setAttribute_(node, xml, 'font');
    SemanticNode.setAttribute_(node, xml, 'embellished');
    SemanticNode.setAttribute_(node, xml, 'fencepointer', 'fencePointer');
    if (xml.getAttribute('annotation')) {
      node.parseAnnotation(xml.getAttribute('annotation'));
    }
    sre.SemanticUtil.addAttributes(node, xml);
    SemanticNode.processChildren_(node, xml);
    return node;
  }


  /**
   * Adds the given attributed to the semantic node if it exists.
   * @param node The semantic node.
   * @param xml The XML element representation of the node.
   * @param attribute The name of the attribute.
   * @param opt_name Optionally the field name for the attribute in the
   *     semantic node if it differs.
   */
  private static setAttribute_(
      node: SemanticNode, xml: Element, attribute: string, opt_name?: string) {
    opt_name = opt_name || attribute;
    let value = xml.getAttribute(attribute);
    if (value) {
      node[opt_name] = value;
    }
  }


  /**
   * Processes the children of the XML node to set text content, child nodes and
   * content nodes of the semantic node.
   * @param node The semantic node.
   * @param xml The XML element representation of the node.
   */
  private static processChildren_(node: SemanticNode, xml: Element) {
    for (let child of sre.DomUtil.toArray(xml.childNodes)) {
      if (child.nodeType === sre.DomUtil.NodeType.TEXT_NODE) {
        node.textContent = child.textContent;
        continue;
      }
      let children =
          sre.DomUtil.toArray(child.childNodes).map(SemanticNode.fromXml);
      children.forEach(function(x) {
        x.parent = node;
      });
      if (sre.DomUtil.tagName(child) === 'CONTENT') {
        node.contentNodes = children;
      } else {
        node.childNodes = children;
      }
    }
  }
}
