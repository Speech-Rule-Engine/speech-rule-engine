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
 * @file Abstract classes of generalised trie nodes.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Debugger } from '../common/debugger.js';
import { SpeechRule } from '../rule_engine/speech_rule.js';
import { TrieNode, TrieNodeKind } from './trie_node.js';

export class AbstractTrieNode<T> implements TrieNode {
  /**
   * @override
   */
  public kind: TrieNodeKind;

  private children_: { [key: string]: TrieNode } = {};

  /**
   * Abstract trie node.
   *
   * @param constraint The constraint the node represents.
   * @param test The constraint test of this node.
   */
  constructor(
    public constraint: string,
    public test: ((p1: T) => boolean) | null
  ) {
    this.kind = TrieNodeKind.ROOT;
  }

  /**
   * @override
   */
  public getConstraint() {
    return this.constraint;
  }

  /**
   * @override
   */
  public getKind() {
    return this.kind;
  }

  /**
   * @override
   */
  public applyTest(object: T) {
    return this.test(object);
  }

  /**
   * @override
   */
  public addChild(node: TrieNode) {
    const constraint = node.getConstraint();
    const child = this.children_[constraint];
    this.children_[constraint] = node;
    return child;
  }

  /**
   * @override
   */
  public getChild(constraint: string) {
    return this.children_[constraint];
  }

  /**
   * @override
   */
  public getChildren() {
    const children = [];
    for (const val of Object.values(this.children_)) {
      children.push(val);
    }
    return children;
  }

  /**
   * @override
   */
  public findChildren(object: T) {
    const children = [];
    for (const val of Object.values(this.children_)) {
      if (val.applyTest(object)) {
        children.push(val);
      }
    }
    return children;
  }

  /**
   * @override
   */
  public removeChild(constraint: string) {
    delete this.children_[constraint];
  }

  /**
   * @override
   */
  public toString() {
    return this.constraint;
  }
}

export class StaticTrieNode extends AbstractTrieNode<Node> {
  private rule_: SpeechRule | null = null;

  /**
   * Trie node for static constraints
   *
   * @param constraint The constraint the node represents.
   * @param test The constraint test of this node.
   */
  constructor(constraint: string, test: ((p1: Element) => boolean) | null) {
    super(constraint, test);
    this.kind = TrieNodeKind.STATIC;
  }

  /**
   * @returns The speech rule of the node.
   */
  public getRule(): SpeechRule | null {
    return this.rule_;
  }

  /**
   * Sets the rule of the node.
   *
   * @param rule speech rule of the node.
   */
  public setRule(rule: SpeechRule) {
    if (this.rule_) {
      Debugger.getInstance().output(
        'Replacing rule ' + this.rule_ + ' with ' + rule
      );
    }
    this.rule_ = rule;
  }

  /**
   * @override
   */
  public toString() {
    const rule = this.getRule();
    return rule
      ? this.constraint + '\n' + '==> ' + this.getRule().action
      : this.constraint;
  }
}
