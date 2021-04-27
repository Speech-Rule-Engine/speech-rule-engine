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
import {Kind} from './trie_node';
import {TrieNode} from './trie_node';


/**
 * Generates a trie node of a given kind in the given rule store.
 * @param kind The kind of trie nodes.
 * @param constraint The constraint the trie node is generated for.
 * @param context A function context.
 * @return The newly generated trie node.
 */
export function getNode(
    kind: Kind, constraint: string, context: SpeechRuleContext): TrieNode|null {
  switch (kind) {
    case sre.TrieNode.Kind.ROOT:
      return new RootTrieNode();
    case sre.TrieNode.Kind.DYNAMIC:
      return new DynamicTrieNode(constraint);
    case sre.TrieNode.Kind.QUERY:
      return new QueryTrieNode(constraint, context);
    case sre.TrieNode.Kind.BOOLEAN:
      return new BooleanTrieNode(constraint, context);
    default:
      return null;
  }
}



export class RootTrieNode extends sre.AbstractTrieNode {
  kind: any;
  constructor() {
    super('', function() {
      return true;
    });
    this.kind = sre.TrieNode.Kind.ROOT;
  }
}
goog.inherits(RootTrieNode, AbstractTrieNode);



/**
 * @param constraint The constraint the node represents.
 */
export class DynamicTrieNode extends sre.AbstractTrieNode {
  kind: any;
  constructor(constraint: string) {
    super(constraint, function(axis) {
      return axis === constraint;
    });
    this.kind = sre.TrieNode.Kind.DYNAMIC;
  }
}
goog.inherits(DynamicTrieNode, AbstractTrieNode);


/**
 * Generates more refined tests depending on the type of static constraint.
 * @param constraint A static constraint.
 * @return An efficient test function in lieu of the
 *    xpath expression.
 */
export function constraintTest_(constraint: string): ((p1: Node) => boolean)|
    null {
  // @self::*
  if (constraint.match(/^self::\*$/)) {
    return function(node) {
      return true;
    };
  }
  // @self::tagname
  if (constraint.match(/^self::\w+$/)) {
    let tag = constraint.slice(6).toUpperCase();
    return function(node) {
      return node.tagName && sre.DomUtil.tagName(node) === tag;
    };
  }
  // @self::namespace:tagname
  if (constraint.match(/^self::\w+:\w+$/)) {
    let inter = constraint.split(':');
    let namespace = sre.XpathUtil.resolveNameSpace(inter[2]);
    if (!namespace) {
      return null;
    }
    tag = inter[3].toUpperCase();
    return function(node) {
      return node.localName && node.localName.toUpperCase() === tag &&
          node.namespaceURI === namespace;
    };
  }
  // @attr
  if (constraint.match(/^@\w+$/)) {
    let attr = constraint.slice(1);
    return function(node) {
      return node.hasAttribute && node.hasAttribute(attr);
    };
  }
  // @attr="value"
  if (constraint.match(/^@\w+="[\w\d ]+"$/)) {
    let split = constraint.split('=');
    attr = split[0].slice(1);
    let value = split[1].slice(1, -1);
    return function(node) {
      return node.hasAttribute && node.hasAttribute(attr) &&
          node.getAttribute(attr) === value;
    };
  }
  // @attr!="value"
  if (constraint.match(/^@\w+!="[\w\d ]+"$/)) {
    split = constraint.split('!=');
    attr = split[0].slice(1);
    value = split[1].slice(1, -1);
    return function(node) {
      return !node.hasAttribute || !node.hasAttribute(attr) ||
          node.getAttribute(attr) !== value;
    };
  }
  // contains(@grammar, "something")
  if (constraint.match(/^contains\(\s*@grammar\s*,\s*"[\w\d ]+"\s*\)$/)) {
    split = constraint.split('"');
    value = split[1];
    return function(node) {
      return sre.Grammar.getInstance().getParameter(value);
    };
  }
  // not(contains(@grammar, "something"))
  if (constraint.match(
          /^not\(\s*contains\(\s*@grammar\s*,\s*"[\w\d ]+"\s*\)\s*\)$/)) {
    split = constraint.split('"');
    value = split[1];
    return function(node) {
      return !sre.Grammar.getInstance().getParameter(value);
    };
  }
  // name(../..)="something"
  if (constraint.match(/^name\(\.\.\/\.\.\)="\w+"$/)) {
    split = constraint.split('"');
    tag = split[1].toUpperCase();
    return function(node) {
      return node.parentNode && node.parentNode.parentNode &&
          node.parentNode.parentNode.tagName &&
          sre.DomUtil.tagName(node.parentNode.parentNode) === tag;
    };
  }
  // count(preceding-sibling::*)=n
  if (constraint.match(/^count\(preceding-sibling::\*\)=\d+$/)) {
    split = constraint.split('=');
    let num = parseInt(split[1], 10);
    return function(node) {
      return node.parentNode && node.parentNode.childNodes[num] === node;
    };
  }
  return null;
}



/**
 * @param constraint The constraint the node represents.
 * @param context The rule context.
 */
export class QueryTrieNode extends sre.StaticTrieNode {
  context_: any;
  kind: any;
  constructor(constraint: string, context: SpeechRuleContext) {
    this.context_ = context;
    super(constraint, constraintTest_(constraint));
    this.kind = sre.TrieNode.Kind.QUERY;
  }


  /**
   * @override
   */
  applyTest(object) {
    return this.test ?
        this.test(object) :
        this.context_.applyQuery(object, this.constraint) === object;
  }
}
goog.inherits(QueryTrieNode, StaticTrieNode);



/**
 * @param constraint The constraint the node represents.
 * @param context The rule context.
 */
export class BooleanTrieNode extends sre.StaticTrieNode {
  context_: any;
  kind: any;
  constructor(constraint: string, context: SpeechRuleContext) {
    this.context_ = context;
    super(constraint, constraintTest_(constraint));
    this.kind = sre.TrieNode.Kind.BOOLEAN;
  }


  /**
   * @override
   */
  applyTest(object) {
    return this.test ? this.test(object) :
                       this.context_.applyConstraint(object, this.constraint);
  }
}
goog.inherits(BooleanTrieNode, StaticTrieNode);
