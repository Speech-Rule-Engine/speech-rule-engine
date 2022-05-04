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
 * @file Nodes in the semantic tree.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util';
import { lookupMeaning } from './semantic_attr';
import {
  SemanticMeaning,
  SemanticFont,
  SemanticRole,
  SemanticType
} from './semantic_meaning';
import * as SemanticUtil from './semantic_util';

/**
 * The attributes of a semantic node.
 */
const enum Attribute {
  EMBELLISHED = 'embellished',
  FENCEPOINTER = 'fencepointer',
  FONT = 'font',
  ID = 'id',
  ANNOTATION = 'annotation',
  ROLE = 'role',
  TYPE = 'type',
  CHILDREN = 'children',
  CONTENT = 'content',
  TEXT = '$t'
}

/**
 * @param id Node id.
 */
export class SemanticNode {
  /**
   * MathML nodes of the node.
   */
  public mathml: Element[] = [];

  /**
   * Parent node.
   */
  public parent: SemanticNode = null;

  /**
   * Type of node.
   */
  public type: SemanticType = SemanticType.UNKNOWN;

  /**
   * Role of node.
   */
  public role: SemanticRole = SemanticRole.UNKNOWN;

  /**
   * Font if know.
   */
  public font: SemanticFont = SemanticFont.UNKNOWN;

  /**
   * Embellished flag.
   */
  public embellished: SemanticType = null;

  /**
   * Pointer to fence if embellished.
   */
  public fencePointer = '';

  /**
   * The children of the node.
   */
  public childNodes: SemanticNode[] = [];

  /**
   * Its textual content.
   */
  public textContent = '';

  /**
   * The complete mml belonging to this node.
   */
  public mathmlTree: Element = null;

  /**
   * Branch nodes can store additional nodes that can be useful.
   * E.g. a node of type FENCED can have the opening and closing fences here.
   */
  public contentNodes: SemanticNode[] = [];

  /**
   * The annotations of the note.
   */
  public annotation: { [key: string]: string[] } = {};

  /**
   * Collection of external attributes.
   */
  public attributes: { [key: string]: string } = {};

  /**
   * Is the node non-breaking, i.e., external attributes are so important that
   * no heuristic should ignore them.
   */
  public nobreaking = false;

  /**
   * Generates a semantic node from its XML representation.
   *
   * @param xml The XML representation.
   * @returns The generated semantic node.
   */
  public static fromXml(xml: Element): SemanticNode {
    const id = parseInt(xml.getAttribute('id'), 10);
    const node = new SemanticNode(id);
    node.type = xml.tagName as SemanticType;
    SemanticNode.setAttribute(node, xml, 'role');
    SemanticNode.setAttribute(node, xml, 'font');
    SemanticNode.setAttribute(node, xml, 'embellished');
    SemanticNode.setAttribute(node, xml, 'fencepointer', 'fencePointer');
    if (xml.getAttribute('annotation')) {
      node.parseAnnotation(xml.getAttribute('annotation'));
    }
    SemanticUtil.addAttributes(node, xml);
    SemanticNode.processChildren(node, xml);
    return node;
  }

  /**
   * Adds the given attributed to the semantic node if it exists.
   *
   * @param node The semantic node.
   * @param xml The XML element representation of the node.
   * @param attribute The name of the attribute.
   * @param opt_name Optionally the field name for the attribute in the
   *     semantic node if it differs.
   */
  private static setAttribute(
    node: SemanticNode,
    xml: Element,
    attribute: string,
    opt_name?: string
  ) {
    opt_name = opt_name || attribute;
    const value = xml.getAttribute(attribute);
    if (value) {
      /// TODO (TS): Sort this out.
      (node as any)[opt_name] = value;
    }
  }

  /**
   * Processes the children of the XML node to set text content, child nodes and
   * content nodes of the semantic node.
   *
   * @param node The semantic node.
   * @param xml The XML element representation of the node.
   */
  private static processChildren(node: SemanticNode, xml: Element) {
    for (const child of DomUtil.toArray(xml.childNodes)) {
      if (child.nodeType === DomUtil.NodeType.TEXT_NODE) {
        node.textContent = child.textContent;
        continue;
      }
      const children = DomUtil.toArray(child.childNodes).map(
        SemanticNode.fromXml
      );
      children.forEach((x) => (x.parent = node));
      if (DomUtil.tagName(child) === 'CONTENT') {
        node.contentNodes = children;
      } else {
        node.childNodes = children;
      }
    }
  }

  /**
   * @param id The id number.
   */
  constructor(public id: number) {}

  /**
   * Retrieve all subnodes (including the node itself) that satisfy a given
   * predicate.
   *
   * @param pred The predicate.
   * @returns The nodes in the tree for which the
   *     predicate holds.
   */
  public querySelectorAll(pred: (p1: SemanticNode) => boolean): SemanticNode[] {
    let result: SemanticNode[] = [];
    for (let i = 0, child; (child = this.childNodes[i]); i++) {
      result = result.concat(child.querySelectorAll(pred));
    }
    for (let i = 0, content; (content = this.contentNodes[i]); i++) {
      result = result.concat(content.querySelectorAll(pred));
    }
    if (pred(this)) {
      result.unshift(this);
    }
    return result;
  }

  /**
   * An XML tree representation of the current node.
   *
   * @param xml The XML document.
   * @param brief If set attributes are omitted.
   * @returns The XML representation of the node.
   */
  public xml(xml: Document, brief?: boolean): Element {
    /**
     * Translates a list of nodes into XML representation.
     *
     * @param tag Name of the enclosing tag.
     * @param nodes A list of nodes.
     * @returns An XML representation of the node list.
     */
    const xmlNodeList = function (tag: string, nodes: SemanticNode[]): Node {
      const xmlNodes = nodes.map(function (x) {
        return x.xml(xml, brief);
      });
      const tagNode = xml.createElementNS('', tag);
      for (let i = 0, child; (child = xmlNodes[i]); i++) {
        tagNode.appendChild(child);
      }
      return tagNode;
    };
    const node = xml.createElementNS('', this.type);
    if (!brief) {
      this.xmlAttributes(node);
    }
    node.textContent = this.textContent;
    if (this.contentNodes.length > 0) {
      node.appendChild(xmlNodeList(Attribute.CONTENT, this.contentNodes));
    }
    if (this.childNodes.length > 0) {
      node.appendChild(xmlNodeList(Attribute.CHILDREN, this.childNodes));
    }
    return node;
  }

  /**
   * Serializes the XML representation of a node.
   *
   * @param brief If attributes are to be omitted.
   * @returns Serialized string.
   */
  public toString(brief = false): string {
    const xml = DomUtil.parseInput('<snode/>') as unknown as Document;
    return DomUtil.serializeXml(this.xml(xml, brief));
  }

  /**
   * Computes a list of attributes of the semantic node.
   *
   * @returns A list of
   *     pairs.
   */
  public allAttributes(): [Attribute, string][] {
    const attributes: [Attribute, string][] = [];
    attributes.push([Attribute.ROLE, this.role]);
    if (this.font !== SemanticFont.UNKNOWN) {
      attributes.push([Attribute.FONT, this.font]);
    }
    if (Object.keys(this.annotation).length) {
      attributes.push([Attribute.ANNOTATION, this.xmlAnnotation()]);
    }
    if (this.embellished) {
      attributes.push([Attribute.EMBELLISHED, this.embellished]);
    }
    if (this.fencePointer) {
      attributes.push([Attribute.FENCEPOINTER, this.fencePointer]);
    }
    attributes.push([Attribute.ID, this.id.toString()]);
    return attributes;
  }

  /**
   * Turns annotation structure into an attribute.
   *
   * @returns XML string for annotation.
   */
  public xmlAnnotation(): string {
    const result: string[] = [];
    for (const key in this.annotation) {
      this.annotation[key].forEach(function (mean) {
        result.push(key + ':' + mean);
      });
    }
    return result.join(';');
  }

  /**
   * Turns node into JSON format.
   *
   * @returns The JSON object for the node.
   */
  public toJson(): any {
    const json = {} as any;
    json[Attribute.TYPE] = this.type;
    const attributes = this.allAttributes();
    for (let i = 0, attr; (attr = attributes[i]); i++) {
      json[attr[0]] = attr[1].toString();
    }
    if (this.textContent) {
      json[Attribute.TEXT] = this.textContent;
    }
    if (this.childNodes.length) {
      json[Attribute.CHILDREN] = this.childNodes.map(function (child) {
        return child.toJson();
      });
    }
    if (this.contentNodes.length) {
      json[Attribute.CONTENT] = this.contentNodes.map(function (child) {
        return child.toJson();
      });
    }
    return json;
  }

  /**
   * Updates the content of the node thereby possibly changing type and role.
   *
   * @param content The new content string.
   * @param text Text indicator. If true non-breaking spaces are retained.
   */
  public updateContent(content: string, text?: boolean) {
    // Remove superfluous whitespace only if it is not the only content!
    // But without removing non-breaking spaces if we have a text.
    const newContent = text
      ? content
          .replace(/^[ \f\n\r\t\v\u200b]*/, '')
          .replace(/[ \f\n\r\t\v\u200b]*$/, '')
      : content.trim();
    // TODO (simons): If content contains a space, then assume type to be text.
    content = content && !newContent ? content : newContent;
    if (this.textContent === content) {
      return;
    }
    const meaning = lookupMeaning(content);
    this.textContent = content;
    this.role = meaning.role;
    this.type = meaning.type;
    this.font = meaning.font;
  }

  /**
   * Adds MathML nodes to the node's store of MathML nodes if necessary only, as
   * we can not necessarily assume that the MathML of the content nodes and
   * children are all disjoint.
   *
   * @param mmlNodes List of MathML nodes.
   */
  public addMathmlNodes(mmlNodes: Element[]) {
    for (let i = 0, mml; (mml = mmlNodes[i]); i++) {
      if (this.mathml.indexOf(mml) === -1) {
        this.mathml.push(mml);
      }
    }
  }

  /**
   * Appends a child to the node.
   *
   * @param child The new child.
   */
  public appendChild(child: SemanticNode) {
    this.childNodes.push(child);
    this.addMathmlNodes(child.mathml);
    child.parent = this;
  }

  /**
   * Replaces a child node of the node.
   *
   * @param oldNode The node to be replaced.
   * @param newNode The new node.
   */
  public replaceChild(oldNode: SemanticNode, newNode: SemanticNode) {
    const index = this.childNodes.indexOf(oldNode);
    if (index === -1) {
      return;
    }
    oldNode.parent = null;
    newNode.parent = this;
    this.childNodes[index] = newNode;
    // To not mess up the order of MathML elements more than necessary, we only
    // remove and add difference lists. The hope is that we might end up with
    // little change.
    const removeMathml = oldNode.mathml.filter(function (x) {
      return newNode.mathml.indexOf(x) === -1;
    });
    const addMathml = newNode.mathml.filter(function (x) {
      return oldNode.mathml.indexOf(x) === -1;
    });
    this.removeMathmlNodes(removeMathml);
    this.addMathmlNodes(addMathml);
  }

  /**
   * Appends a content node to the node.
   *
   * @param node The new content node.
   */
  public appendContentNode(node: SemanticNode) {
    if (node) {
      this.contentNodes.push(node);
      this.addMathmlNodes(node.mathml);
      node.parent = this;
    }
  }

  /**
   * Removes a content node from the node.
   *
   * @param node The content node to be removed.
   */
  public removeContentNode(node: SemanticNode) {
    if (node) {
      const index = this.contentNodes.indexOf(node);
      if (index !== -1) {
        this.contentNodes.slice(index, 1);
      }
    }
  }

  /**
   * Tests if node is equal to the given node. Two nodes are considered equal if
   * they have the same type, role, content and all its children are equal.
   *
   * @param node The node to test against.
   * @returns True if nodes are equal wrt. structure and content.
   */
  public equals(node: SemanticNode): boolean {
    if (!node) {
      return false;
    }
    if (
      this.type !== node.type ||
      this.role !== node.role ||
      this.textContent !== node.textContent ||
      this.childNodes.length !== node.childNodes.length ||
      this.contentNodes.length !== node.contentNodes.length
    ) {
      return false;
    }
    for (
      let i = 0, node1, node2;
      (node1 = this.childNodes[i]), (node2 = node.childNodes[i]);
      i++
    ) {
      if (!node1.equals(node2)) {
        return false;
      }
    }
    for (
      let i = 0, node1, node2;
      (node1 = this.contentNodes[i]), (node2 = node.contentNodes[i]);
      i++
    ) {
      if (!node1.equals(node2)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Convenience method to display the whole tree and its elements.
   */
  public displayTree() {
    console.info(this.displayTree_(0));
  }

  /**
   * Adds a new annotation annotation if annotation is not empty.
   *
   * @param domain The domain.
   * @param annotation The annotation.
   */
  public addAnnotation(domain: string, annotation: string) {
    if (annotation) {
      this.addAnnotation_(domain, annotation);
    }
  }

  /**
   * Retrieves the annotation annotations for a particular domain.
   *
   * @param domain The domain.
   * @returns The annotation annotations.
   */
  public getAnnotation(domain: string): string[] {
    const content = this.annotation[domain];
    return content ? content : [];
  }

  /**
   * Checks if a node has a particular annotation.
   *
   * @param domain The domain.
   * @param annotation The annotation.
   * @returns True if the annotation is contained.
   */
  public hasAnnotation(domain: string, annotation: string): boolean {
    const content = this.annotation[domain];
    if (!content) {
      return false;
    }
    return content.indexOf(annotation) !== -1;
  }

  /**
   * Parses a annotation string as given, for example, in an attribute.
   *
   * @param stateStr The state string for the annotation.
   */
  public parseAnnotation(stateStr: string) {
    const annotations = stateStr.split(';');
    for (let i = 0, l = annotations.length; i < l; i++) {
      const annotation = annotations[i].split(':');
      this.addAnnotation(annotation[0], annotation[1]);
    }
  }

  /**
   * @returns The semantic meaning of the node.
   */
  public meaning(): SemanticMeaning {
    return { type: this.type, role: this.role, font: this.font };
  }

  /**
   * Adds attributes to the XML representation of the current node.
   *
   * @param node The XML node.
   */
  private xmlAttributes(node: Element) {
    const attributes = this.allAttributes();
    for (let i = 0, attr; (attr = attributes[i]); i++) {
      node.setAttribute(attr[0], attr[1]);
    }
    this.addExternalAttributes(node);
  }

  /**
   * Adds the external attributes for this node to its XML representation.
   *
   * @param node The XML node.
   */
  private addExternalAttributes(node: Element) {
    for (const attr in this.attributes) {
      node.setAttribute(attr, this.attributes[attr]);
    }
  }

  /**
   * Removes MathML nodes from the node's store of MathML nodes.
   *
   * @param mmlNodes List of MathML nodes.
   */
  private removeMathmlNodes(mmlNodes: Element[]) {
    const mmlList = this.mathml;
    for (let i = 0, mml; (mml = mmlNodes[i]); i++) {
      const index = mmlList.indexOf(mml);
      if (index !== -1) {
        mmlList.splice(index, 1);
      }
    }
    this.mathml = mmlList;
  }

  /**
   * Convenience method to display the whole tree and its elements.
   *
   * @param depth The depth of the tree.
   * @returns String with nested tree display.
   */
  private displayTree_(depth: number): string {
    depth++;
    const depthString = Array(depth).join('  ');
    let result = '';
    result += '\n' + depthString + this.toString();
    result += '\n' + depthString + 'MathmlTree:';
    result += '\n' + depthString + this.mathmlTreeString();
    result += '\n' + depthString + 'MathML:';
    for (let i = 0, mml; (mml = this.mathml[i]); i++) {
      result += '\n' + depthString + mml.toString();
    }
    result += '\n' + depthString + 'Begin Content';
    this.contentNodes.forEach(function (x) {
      result += x.displayTree_(depth);
    });
    result += '\n' + depthString + 'End Content';
    result += '\n' + depthString + 'Begin Children';
    this.childNodes.forEach(function (x) {
      result += x.displayTree_(depth);
    });
    result += '\n' + depthString + 'End Children';
    return result;
  }

  /**
   * Returns a display version of the node's associated MathML tree.
   *
   * @returns The MathML tree as string or EMPTY.
   */
  private mathmlTreeString(): string {
    return this.mathmlTree ? this.mathmlTree.toString() : 'EMPTY';
  }

  /**
   * Adds a new annotation annotation.
   *
   * @param domain The domain.
   * @param annotation The annotation.
   */
  private addAnnotation_(domain: string, annotation: string) {
    const content = this.annotation[domain];
    if (content) {
      content.push(annotation);
    } else {
      this.annotation[domain] = [annotation];
    }
  }
}
