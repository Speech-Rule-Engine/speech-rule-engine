//
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
 * @fileoverview Factory for semantic nodes.
 *
 * Basic functionality to create different types of semantic nodes and keep an
 * active counter. Every semantic tree has its own node factory.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {SemanticAttr} from './semantic_attr';
import {SemanticDefault} from './semantic_default';
import {SemanticNodeCollator} from './semantic_default';
import {SemanticNode} from './semantic_node';


export class SemanticNodeFactory {

  /**
   * Collator for leaf nodes.
   */
  public leafMap: SemanticNodeCollator = new SemanticNodeCollator();

  /**
   * Set of default values.
   */
  public defaultMap: SemanticDefault = new SemanticDefault();

  /**
   * ID counter.
   */
  private idCounter_: number = -1;


  /**
   * Creates a new node object with a given id.
   * @param id The node id.
   * @return The newly created node.
   */
  public makeNode(id: number): SemanticNode {
    return this.createNode_(id);
  }


  /**
   * Create a node that is to be processed at a later point in time.
   * @param mml The MathML tree.
   * @return The new node.
   */
  public makeUnprocessed(mml: Element): SemanticNode {
    let node = this.createNode_();
    node.mathml = [mml];
    node.mathmlTree = mml;
    return node;
  }


  /**
   * Create an empty leaf node.
   * @return The new node.
   */
  public makeEmptyNode(): SemanticNode {
    let node = this.createNode_();
    node.type = SemanticType.EMPTY;
    return node;
  }


  /**
   * Create a node with the given text content. The content is semantically
   * interpreted.
   * @param content The text content of the node.
   * @return The new node.
   */
  public makeContentNode(content: string): SemanticNode {
    let node = this.createNode_();
    node.updateContent(content);
    return node;
  }


  /**
   * Create a list of content nodes all with the same content.
   * @param num The number of nodes to create.
   * @param content The text content of the node.
   * @return The list of new nodes.
   */
  public makeMultipleContentNodes(
      num: number, content: string): SemanticNode[] {
    let nodes = [];
    for (let i = 0; i < num; i++) {
      nodes.push(this.makeContentNode(content));
    }
    return nodes;
  }


  /**
   * Create a leaf node.
   * @param content The MathML tree.
   * @param font The font name.
   * @return The new node.
   */
  public makeLeafNode(content: string, font: SemanticFont): SemanticNode {
    if (!content) {
      return this.makeEmptyNode();
    }
    let node = this.makeContentNode(content);
    node.font = font || node.font;
    // Lookup alternative meaning here!
    let meaning = this.defaultMap.retrieveNode(node);
    if (meaning) {
      node.type = meaning.type;
      node.role = meaning.role;
      node.font = meaning.font;
    }
    this.leafMap.addNode(node);
    return node;
  }


  /**
   * Create a branching node.
   * @param type The type of the node.
   * @param children The child nodes.
   * @param contentNodes The content Nodes.
   * @param opt_content Content string if there is any.
   * @return The new node.
   */
  public makeBranchNode(
      type: SemanticType, children: SemanticNode[],
      contentNodes: SemanticNode[], opt_content?: string): SemanticNode {
    let node = this.createNode_();
    if (opt_content) {
      node.updateContent(opt_content);
    }
    node.type = type;
    node.childNodes = children;
    node.contentNodes = contentNodes;
    children.concat(contentNodes).forEach(function(x) {
      x.parent = node;
      node.addMathmlNodes(x.mathml);
    });
    return node;
  }

  /**
   * Creates a new node object.
   * @param opt_id Optional ID. It will be maxed with the current id.
   * @return The newly created node.
   */
  private createNode_(id?: number): SemanticNode {
    if (typeof id !== 'undefined') {
      this.idCounter_ = Math.max(this.idCounter_, id);
    } else {
      id = ++this.idCounter_;
    }
    return new SemanticNode(id);
  }

}
