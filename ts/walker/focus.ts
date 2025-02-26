//
// Copyright 2015-21 Volker Sorge
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
 * @file Focus elements contain a collection of focused nodes and
 *     additional information, like colors etc.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { SemanticNode } from '../semantic_tree/semantic_node.js';
import { RebuildStree } from './rebuild_stree.js';
import * as WalkerUtil from './walker_util.js';

export class Focus {
  /**
   * The DOM nodes of the focus.
   */
  private domNodes: (Element | null)[] = [];

  /**
   * The primary DOM component of the focus.
   */
  private domPrimary_: Element = null;

  /**
   * The DOM nodes of the focus.
   */
  private allNodes: (Element | null)[] = [];

  /**
   * Factory method to create focus structures from semantic and DOM nodes.
   *
   * @param primaryId The semantic id of the primary node.
   * @param nodeIds The semantic ids of the node list.
   * @param rebuilt A rebuilt semantic tree structure.
   * @param dom The original DOM node.
   * @returns The new focus.
   */
  public static factory(
    primaryId: string,
    nodeIds: string[],
    rebuilt: RebuildStree,
    dom: Element
  ): Focus {
    const idFunc = (id: string) => WalkerUtil.getBySemanticId(dom, id);
    const dict = rebuilt.nodeDict;
    const node = idFunc(primaryId);
    const nodes = nodeIds.map(idFunc);
    const snodes = nodeIds.map(function (primaryId) {
      return dict[primaryId];
    });
    const focus = new Focus(snodes, dict[primaryId]);
    focus.domNodes = nodes;
    focus.domPrimary_ = node;
    focus.allNodes = Focus.generateAllVisibleNodes_(nodeIds, nodes, dict, dom);
    return focus;
  }

  /**
   * Generates all existing nodes in the DOM structure corresponding to the
   * semantic ids.
   *
   * @param ids The semantic ids.
   * @param nodes The DOM nodes corresponding to the ids, some of
   *      which might not exist.
   * @param dict A semantic node dictionary.
   * @param domNode The original DOM node.
   * @returns The list of existing nodes in the DOM tree.
   */
  private static generateAllVisibleNodes_(
    ids: string[],
    nodes: (Element | null)[],
    dict: { [key: string]: SemanticNode },
    domNode: Element
  ): Element[] {
    let result: Element[] = [];
    for (let i = 0, l = ids.length; i < l; i++) {
      if (nodes[i]) {
        const allNodes = Focus.getAllVisibleNodes([ids[i]], domNode);
        if (allNodes.length) {
          result = result.concat(allNodes);
        } else {
          result.push(nodes[i]);
        }
        continue;
      }
      const virtual = dict[ids[i]];
      if (!virtual) {
        continue;
      }
      const childIds = virtual.childNodes.map((x) => x.id.toString());
      const children = Focus.getAllVisibleNodes(childIds, domNode);
      result = result.concat(
        Focus.generateAllVisibleNodes_(childIds, children, dict, domNode)
      );
    }
    return result;
  }

  /**
   * Computes all visible nodes, in particular if there are multiple nodes with
   * the same semantic id. This can be the case due to linebreaking duplicating
   * semantic information.
   *
   * @param ids The ids.
   * @param domNode The root node in the dom.
   * @returns A list of nodes with the given ids.
   */
  private static getAllVisibleNodes(ids: string[], domNode: Element) {
    let result: Element[] = [];
    for (const id of ids) {
      result = result.concat(WalkerUtil.getAllBySemanticId(domNode, id));
    }
    return result;
  }

  /**
   * @param nodes The semantic nodes of the focus.
   * @param primary The primary component of the focus.
   */
  constructor(
    private nodes: SemanticNode[],
    private primary: SemanticNode
  ) {}

  /**
   * @returns The nodes of the focus.
   */
  public getSemanticPrimary(): SemanticNode {
    return this.primary;
  }

  /**
   * @returns The nodes of the focus.
   */
  public getSemanticNodes(): SemanticNode[] {
    return this.nodes;
  }

  /**
   * @returns The nodes of the focus.
   */
  public getNodes(): Element[] {
    return this.allNodes;
  }

  /**
   * @returns The nodes of the focus.
   */
  public getDomNodes(): (Element | null)[] {
    return this.domNodes;
  }

  /**
   * @returns The primary node of the focus. Can be empty.
   */
  public getDomPrimary(): Element {
    return this.domPrimary_;
  }

  /**
   * @override
   */
  public toString() {
    return 'Primary:' + this.domPrimary_ + ' Nodes:' + this.domNodes;
  }

  /**
   * Clones the focus.
   *
   * @returns The new focus, containing the same component as this.
   */
  public clone(): Focus {
    const focus = new Focus(this.nodes, this.primary);
    focus.domNodes = this.domNodes;
    focus.domPrimary_ = this.domPrimary_;
    focus.allNodes = this.allNodes;
    return focus;
  }
}
