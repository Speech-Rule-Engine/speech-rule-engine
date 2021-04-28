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
 * @fileoverview Factory for trie nodes and concrete classes of trie nodes.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {SpeechRuleContext} from '../rule_engine/speech_rule_context';

import {AbstractTrieNode} from './abstract_trie_node';
import {StaticTrieNode} from './abstract_trie_node';
import {TrieNode, TrieNodeKind} from './trie_node';
import * as DomUtil from '../common/dom_util';
import * as XpathUtil from '../common/xpath_util';


/**
 * Generates a trie node of a given kind in the given rule store.
 * @param kind The kind of trie nodes.
 * @param constraint The constraint the trie node is generated for.
 * @param context A function context.
 * @return The newly generated trie node.
 */
export function getNode(
    kind: TrieNodeKind, constraint: string, context: SpeechRuleContext): TrieNode|null {
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



export class RootTrieNode extends AbstractTrieNode<Node> {

  constructor() {
    super('', function() {
      return true;
    });
    this.kind = TrieNodeKind.ROOT;
  }
}


export class DynamicTrieNode extends AbstractTrieNode<string> {
  
  /**
   * @param constraint The constraint the node represents.
   */
  constructor(constraint: string) {
    super(constraint, axis => axis === constraint)
    this.kind = TrieNodeKind.DYNAMIC;
  }
}


/**
 * Generates more refined tests depending on the type of static constraint.
 * @param constraint A static constraint.
 * @return An efficient test function in lieu of the
 *    xpath expression.
 */
// TODO (TS): Improve methods by testing for Element type.
export function constraintTest_(constraint: string): ((p1: Node) => boolean)|
    null {
  // @self::*
  if (constraint.match(/^self::\*$/)) {
    return (_node => true);
  }
  // @self::tagname
  if (constraint.match(/^self::\w+$/)) {
    const tag = constraint.slice(6).toUpperCase();
    return ((node: Element) => node.tagName && DomUtil.tagName(node) === tag);
  }
  // @self::namespace:tagname
  if (constraint.match(/^self::\w+:\w+$/)) {
    let inter = constraint.split(':');
    let namespace = XpathUtil.resolveNameSpace(inter[2]);
    if (!namespace) {
      return null;
    }
    let tag = inter[3].toUpperCase();
    return ((node: Element) => 
      node.localName && node.localName.toUpperCase() === tag &&
      node.namespaceURI === namespace);
  }
  // @attr
  if (constraint.match(/^@\w+$/)) {
    let attr = constraint.slice(1);
    return ((node: Element) =>
      node.hasAttribute && node.hasAttribute(attr));
  }
  // @attr="value"
  if (constraint.match(/^@\w+="[\w\d ]+"$/)) {
    let split = constraint.split('=');
    let attr = split[0].slice(1);
    let value = split[1].slice(1, -1);
    return ((node: Element) =>
      node.hasAttribute && node.hasAttribute(attr) &&
      node.getAttribute(attr) === value);
  }
  // @attr!="value"
  if (constraint.match(/^@\w+!="[\w\d ]+"$/)) {
    let split = constraint.split('!=');
    let attr = split[0].slice(1);
    let value = split[1].slice(1, -1);
    return ((node: Element) =>
      !node.hasAttribute || !node.hasAttribute(attr) ||
      node.getAttribute(attr) !== value);
  }
  // contains(@grammar, "something")
  if (constraint.match(/^contains\(\s*@grammar\s*,\s*"[\w\d ]+"\s*\)$/)) {
    let split = constraint.split('"');
    let value = split[1];
    return ((_node: Element) =>
      Grammar.getInstance().getParameter(value));
  }
  // not(contains(@grammar, "something"))
  if (constraint.match(
          /^not\(\s*contains\(\s*@grammar\s*,\s*"[\w\d ]+"\s*\)\s*\)$/)) {
    let split = constraint.split('"');
    let value = split[1];
    return ((_node: Element) =>
      !Grammar.getInstance().getParameter(value));
  }
  // name(../..)="something"
  if (constraint.match(/^name\(\.\.\/\.\.\)="\w+"$/)) {
    let split = constraint.split('"');
    let tag = split[1].toUpperCase();
    return ((node: Element) =>
      (node.parentNode?.parentNode as Element)?.tagName &&
      DomUtil.tagName(node.parentNode.parentNode as Element) === tag);
  }
  // count(preceding-sibling::*)=n
  if (constraint.match(/^count\(preceding-sibling::\*\)=\d+$/)) {
    let split = constraint.split('=');
    let num = parseInt(split[1], 10);
    return ((node: Element) =>
      node.parentNode?.childNodes[num] === node);
  }
  return null;
}



export class QueryTrieNode extends StaticTrieNode {

  /**
   * @param constraint The constraint the node represents.
   * @param context The rule context.
   */
  constructor(constraint: string, private context: SpeechRuleContext) {
    super(constraint, constraintTest_(constraint));
    this.kind = TrieNodeKind.QUERY;
  }


  /**
   * @override
   */
  applyTest(object: Node) {
    return this.test ?
        this.test(object) :
        this.context.applyQuery(object, this.constraint) === object;
  }
}


export class BooleanTrieNode extends StaticTrieNode {

  /**
   * @param constraint The constraint the node represents.
   * @param context The rule context.
   */
  constructor(constraint: string, private context: SpeechRuleContext) {
    super(constraint, constraintTest_(constraint));
    this.kind = TrieNodeKind.BOOLEAN;
  }


  /**
   * @override
   */
  applyTest(object: Node ) {
    return this.test ? this.test(object) :
      this.context.applyConstraint(object, this.constraint);
  }
}

