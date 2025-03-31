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
 * @file Factory for trie nodes and concrete classes of trie nodes.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util.js';
import * as XpathUtil from '../common/xpath_util.js';
import { Grammar } from '../rule_engine/grammar.js';
import * as MathCompoundStore from '../rule_engine/math_compound_store.js';
import { SpeechRuleContext } from '../rule_engine/speech_rule_context.js';
import { AbstractTrieNode } from './abstract_trie_node.js';
import { StaticTrieNode } from './abstract_trie_node.js';
import { TrieNode, TrieNodeKind } from './trie_node.js';

/**
 * Generates a trie node of a given kind in the given rule store.
 *
 * @param kind The kind of trie nodes.
 * @param constraint The constraint the trie node is generated for.
 * @param context A function context.
 * @returns The newly generated trie node.
 */
export function getNode(
  kind: TrieNodeKind,
  constraint: string,
  context: SpeechRuleContext
): TrieNode | null {
  switch (kind) {
    case TrieNodeKind.ROOT:
      return new RootTrieNode();
    case TrieNodeKind.DYNAMIC:
      return new DynamicTrieNode(constraint);
    case TrieNodeKind.QUERY:
      return new QueryTrieNode(constraint, context);
    case TrieNodeKind.BOOLEAN:
      return new BooleanTrieNode(constraint, context);
    default:
      return null;
  }
}

class RootTrieNode extends AbstractTrieNode<Node> {
  /**
   * Creates the root node for the trie.
   */
  constructor() {
    super('', () => true);
    this.kind = TrieNodeKind.ROOT;
  }
}

class DynamicTrieNode extends AbstractTrieNode<string> {
  /**
   * Class of trie nodes for dynamic constraints.
   *
   * @param constraint The constraint the node represents.
   */
  constructor(constraint: string) {
    super(constraint, (axis) => axis === constraint);
    this.kind = TrieNodeKind.DYNAMIC;
  }
}

const comparator: { [operator: string]: (x: number, y: number) => boolean } = {
  '=': (x: number, y: number) => x === y,
  '!=': (x: number, y: number) => x !== y,
  '<': (x: number, y: number) => x < y,
  '>': (x: number, y: number) => x > y,
  '<=': (x: number, y: number) => x <= y,
  '>=': (x: number, y: number) => x >= y
};

/**
 * Generates more refined tests depending on the type of static constraint.
 *
 * @param constraint A static constraint.
 * @returns An efficient test function in lieu of the
 *    xpath expression.
 */
// TODO (TS): Improve methods by testing for Element type.
function constraintTest(constraint: string): ((p1: Node) => boolean) | null {
  // @self::*
  if (constraint.match(/^self::\*$/)) {
    return (_node) => true;
  }
  // @self::tagname
  if (constraint.match(/^self::\w+$/)) {
    const tag = constraint.slice(6).toUpperCase();
    return (node: Element) => node.tagName && DomUtil.tagName(node) === tag;
  }
  // @self::namespace:tagname
  if (constraint.match(/^self::\w+:\w+$/)) {
    const inter = constraint.split(':');
    const namespace = XpathUtil.resolveNameSpace(inter[2]);
    if (!namespace) {
      return null;
    }
    const tag = inter[3].toUpperCase();
    return (node: Element) =>
      node.localName &&
      node.localName.toUpperCase() === tag &&
      node.namespaceURI === namespace;
  }
  // @attr
  if (constraint.match(/^@\w+$/)) {
    const attr = constraint.slice(1);
    return (node: Element) => node.hasAttribute && node.hasAttribute(attr);
  }
  // @attr="value"
  if (constraint.match(/^@\w+="[\w\d ]+"$/)) {
    const split = constraint.split('=');
    const attr = split[0].slice(1);
    const value = split[1].slice(1, -1);
    return (node: Element) =>
      node.hasAttribute &&
      node.hasAttribute(attr) &&
      node.getAttribute(attr) === value;
  }
  // @attr!="value"
  if (constraint.match(/^@\w+!="[\w\d ]+"$/)) {
    const split = constraint.split('!=');
    const attr = split[0].slice(1);
    const value = split[1].slice(1, -1);
    return (node: Element) =>
      !node.hasAttribute ||
      !node.hasAttribute(attr) ||
      node.getAttribute(attr) !== value;
  }
  // contains(@grammar, "something")
  if (constraint.match(/^contains\(\s*@grammar\s*,\s*"[\w\d ]+"\s*\)$/)) {
    const split = constraint.split('"');
    const value = split[1];
    return (_node: Element) => !!Grammar.getInstance().getParameter(value);
  }
  // not(contains(@grammar, "something"))
  if (
    constraint.match(
      /^not\(\s*contains\(\s*@grammar\s*,\s*"[\w\d ]+"\s*\)\s*\)$/
    )
  ) {
    const split = constraint.split('"');
    const value = split[1];
    return (_node: Element) => !Grammar.getInstance().getParameter(value);
  }
  // name(../..)="something"
  if (constraint.match(/^name\(\.\.\/\.\.\)="\w+"$/)) {
    const split = constraint.split('"');
    const tag = split[1].toUpperCase();
    return (node: Element) =>
      (node.parentNode?.parentNode as Element)?.tagName &&
      DomUtil.tagName(node.parentNode.parentNode as Element) === tag;
  }
  // count(preceding-sibling::*)=n
  if (constraint.match(/^count\(preceding-sibling::\*\)=\d+$/)) {
    const split = constraint.split('=');
    const num = parseInt(split[1], 10);
    return (node: Element) => node.parentNode?.childNodes[num] === node;
  }
  // category constraint
  // xpath[@constraint!?="xy"]
  if (constraint.match(/^.+\[@category!?=".+"\]$/)) {
    let [, query, equality, category] = constraint.match(
      /^(.+)\[@category(!?=)"(.+)"\]$/
    );
    const unit = category.match(/^unit:(.+)$/);
    let add = '';
    if (unit) {
      category = unit[1];
      add = ':unit';
    }
    return (node: Element) => {
      const xpath = XpathUtil.evalXPath(query, node)[0];
      if (xpath) {
        const result = MathCompoundStore.lookupCategory(
          xpath.textContent + add
        );
        return equality === '=' ? result === category : result !== category;
      }
      return false;
    };
  }
  // string-length adapted for unicode.
  // string-length(xpath)!?=<>\d
  if (constraint.match(/^string-length\(.+\)\W+\d+/)) {
    const [, select, comp, count] = constraint.match(
      /^string-length\((.+)\)(\W+)(\d+)/
    );
    const func = comparator[comp] || comparator['='];
    const numb = parseInt(count, 10);
    return (node: Element) => {
      const xpath = XpathUtil.evalXPath(select, node)[0];
      if (!xpath) {
        return false;
      }
      return func(Array.from(xpath.textContent).length, numb);
    };
  }
  return null;
}

class QueryTrieNode extends StaticTrieNode {
  /**
   * Trie nodes with query constraints.
   *
   * @param constraint The constraint the node represents.
   * @param context The rule context.
   */
  constructor(
    constraint: string,
    private context: SpeechRuleContext
  ) {
    super(constraint, constraintTest(constraint));
    this.kind = TrieNodeKind.QUERY;
  }

  /**
   * @override
   */
  public applyTest(object: Node) {
    return this.test
      ? this.test(object)
      : this.context.applyQuery(object, this.constraint) === object;
  }
}

class BooleanTrieNode extends StaticTrieNode {
  /**
   * Trie nodes with static boolean constraints.
   *
   * @param constraint The constraint the node represents.
   * @param context The rule context.
   */
  constructor(
    constraint: string,
    private context: SpeechRuleContext
  ) {
    super(constraint, constraintTest(constraint));
    this.kind = TrieNodeKind.BOOLEAN;
  }

  /**
   * @override
   */
  public applyTest(object: Node) {
    return this.test
      ? this.test(object)
      : this.context.applyConstraint(object, this.constraint);
  }
}
