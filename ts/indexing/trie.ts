//
// Copyright 2016-21 Volker Sorge
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

//
// Supported by the Mozilla Foundation.
//

/**
 * @file Generalised trie for indexing speech rule.
 *
 * As trie is a pure indexing structure, we currently assume that we will not
 * remove rules from the trie. I.e., if a rule is removed from a speech rule
 * store, we have to rebuild the trie. This is the same worst case complexity as
 * removing a single rule.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { SpeechRule } from '../rule_engine/speech_rule.js';
import { SpeechRuleContext } from '../rule_engine/speech_rule_context.js';
import { StaticTrieNode } from './abstract_trie_node.js';
import { TrieNode, TrieNodeKind } from './trie_node.js';
import { getNode } from './trie_node_factory.js';

export class Trie {
  /**
   *  The root of the trie.
   */
  public root: TrieNode;

  /**
   * Compiles set of speech rules below a given node.
   *
   * @param root The node considered as root.
   * @returns Set of speech rules in the trie.
   */
  public static collectRules_(root: TrieNode): SpeechRule[] {
    const rules = [];
    let explore = [root];
    while (explore.length) {
      const node = explore.shift();
      if (
        node.getKind() === TrieNodeKind.QUERY ||
        node.getKind() === TrieNodeKind.BOOLEAN
      ) {
        const rule = (node as StaticTrieNode).getRule();
        if (rule) {
          rules.unshift(rule);
        }
      }
      explore = explore.concat(node.getChildren());
    }
    return rules;
  }

  /**
   * Prints tree to a string.
   *
   * @param node The current try node to print.
   * @param depth The current depth of the node.
   * @param str The string that has already been assembled.
   * @returns The string representation of the trie with indentation markers.
   */
  private static printWithDepth_(
    node: TrieNode,
    depth: number,
    str: string
  ): string {
    const prefix = new Array(depth + 2).join(depth.toString()) + ': ';
    str += prefix + node.toString() + '\n';
    const children = node.getChildren();
    for (let i = 0, child; (child = children[i]); i++) {
      str = Trie.printWithDepth_(child, depth + 1, str);
    }
    return str;
  }

  /**
   * Computes the maximal order of the trie beneath the given node.
   *
   * @param node The trie node considered as root.
   * @returns The order of the trie.
   */
  private static order_(node: TrieNode): number {
    const children = node.getChildren();
    if (!children.length) {
      return 0;
    }
    const max = Math.max.apply(null, children.map(Trie.order_));
    return Math.max(children.length, max);
  }

  /**
   *
   */
  constructor() {
    this.root = getNode(TrieNodeKind.ROOT, '', null);
  }

  /**
   * Inserts a speech rule into the trie.
   *
   * @param rule The speech rule to add.
   */
  public addRule(rule: SpeechRule) {
    let node = this.root;
    const context = rule.context;
    const dynamicCstr = rule.dynamicCstr.getValues();
    for (let i = 0, l = dynamicCstr.length; i < l; i++) {
      node = this.addNode_(node, dynamicCstr[i], TrieNodeKind.DYNAMIC, context);
    }
    node = this.addNode_(
      node,
      rule.precondition.query,
      TrieNodeKind.QUERY,
      context
    );
    const booleans = rule.precondition.constraints;
    for (let i = 0, l = booleans.length; i < l; i++) {
      node = this.addNode_(node, booleans[i], TrieNodeKind.BOOLEAN, context);
    }
    (node as StaticTrieNode).setRule(rule);
  }

  /**
   * Retrieves a set of speech rules that are applicable to a given XML node
   * wrt. to a dynamic constraint.
   *
   * @param xml An XML node.
   * @param dynamic A dynamic properties list.
   * @returns The speech rules that can be applied to the
   *     given node.
   */
  public lookupRules(xml: Node, dynamic: string[][]): SpeechRule[] {
    let nodes = [this.root];
    const rules = [];
    // Algorithm:
    // Pop node, get children,
    // add child if constraint is correct.
    // add rule if child has a rule.
    // First deal with dynamic constraints.
    while (dynamic.length) {
      const dynamicSet = dynamic.shift();
      const newNodes: TrieNode[] = [];
      while (nodes.length) {
        const node = nodes.shift();
        const children = node.getChildren();
        children.forEach((child: TrieNode) => {
          if (
            child.getKind() !== TrieNodeKind.DYNAMIC ||
            dynamicSet.indexOf(child.getConstraint()) !== -1
          ) {
            newNodes.push(child);
          }
        });
      }
      nodes = newNodes.slice();
    }
    // Then we deal with static constraints, while collecting rules.
    while (nodes.length) {
      const node = nodes.shift() as StaticTrieNode;
      if (node.getRule) {
        const rule = node.getRule();
        if (rule) {
          rules.push(rule);
        }
      }
      const children = node.findChildren(xml);
      nodes = nodes.concat(children);
    }
    return rules;
  }

  /**
   * Checks if the trie contains sub-trie for the given constraint list.
   *
   * @param cstrs The list of constraints.
   * @returns True if the trie contains elements for cstrs.
   */
  public hasSubtrie(cstrs: string[]): boolean {
    let subtrie = this.root;
    for (let i = 0, l = cstrs.length; i < l; i++) {
      const cstr = cstrs[i];
      subtrie = subtrie.getChild(cstr);
      if (!subtrie) {
        return false;
      }
    }
    return true;
  }

  /**
   * @override
   */
  public toString() {
    return Trie.printWithDepth_(this.root, 0, '');
  }

  /**
   * @param root
   * @returns Set of speech rules in the trie.
   */
  public collectRules(root: TrieNode = this.root): SpeechRule[] {
    return Trie.collectRules_(root);
  }

  /**
   * @returns The order of the trie.
   */
  public order(): number {
    return Trie.order_(this.root);
  }

  /**
   * Collates information on dynamic constraint values of this trie.
   *
   * @param opt_info Initial dynamic constraint information.
   * @returns The collated information.
   */
  public enumerate(opt_info?: { [key: string]: any }): { [key: string]: any } {
    return this.enumerate_(this.root, opt_info);
  }

  /**
   * Retrieves a node for a given sequence of constraints.
   *
   * @param constraint A list of constraints.
   * @returns The speech rule or null.
   * What if multiple rules exist?
   */
  public byConstraint(constraint: string[]): TrieNode {
    let node = this.root;
    while (constraint.length && node) {
      const cstr = constraint.shift();
      node = node.getChild(cstr);
    }
    return node || null;
  }

  /**
   * Collates information on dynamic constraint values of this trie.
   *
   * @param node The trie node from where to start.
   * @param info Initial dynamic constraint information.
   * @returns The collated information.
   */
  private enumerate_(
    node: TrieNode,
    info: { [key: string]: any }
  ): { [key: string]: any } {
    info = info || {};
    const children = node.getChildren();
    for (let i = 0, child; (child = children[i]); i++) {
      if (child.kind !== TrieNodeKind.DYNAMIC) {
        continue;
      }
      info[child.getConstraint()] = this.enumerate_(
        child,
        info[child.getConstraint()]
      );
    }
    return info;
  }

  /**
   * Retrieves node for the given constraint. Adds a new node if necessary.
   *
   * @param node The current node in the trie.
   * @param constraint The constraint string.
   * @param kind The kind of node.
   * @param context The context of the speech rule to add.
   * @returns The trie node corresponding to the constraint.
   */
  private addNode_(
    node: TrieNode,
    constraint: string,
    kind: TrieNodeKind,
    context: SpeechRuleContext
  ): TrieNode {
    let nextNode = node.getChild(constraint);
    if (!nextNode) {
      nextNode = getNode(kind, constraint, context);
      node.addChild(nextNode);
    }
    return nextNode;
  }
}
