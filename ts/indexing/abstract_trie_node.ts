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
 * @fileoverview Abstract classes of generalised trie nodes.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {SpeechRule} from '../rule_engine/speech_rule';

import * as TrieNodeExports from './trie_node';
import {TrieNode} from './trie_node';



/**
 * @param constraint The constraint the node represents.
 * @param test The constraint test of this node.
 */
export class AbstractTrieNode implements TrieNode {
  private children_: {[key: any]: TrieNode} = {};

  kind: TrieNodeExports.Kind;
  constructor<T>(
      public constraint: string, public test: ((p1: T) => boolean)|null) {
    this.kind = TrieNodeExports.Kind.ROOT;
  }


  /**
   * @override
   */
  getConstraint() {
    return this.constraint;
  }


  /**
   * @override
   */
  getKind() {
    return this.kind;
  }


  /**
   * @override
   */
  applyTest(object) {
    return this.test(object);
  }


  /**
   * @override
   */
  addChild(node) {
    let constraint = node.getConstraint();
    let child = this.children_[constraint];
    this.children_[constraint] = node;
    return child;
  }


  /**
   * @override
   */
  getChild(constraint) {
    return this.children_[constraint];
  }


  /**
   * @override
   */
  getChildren() {
    let children = [];
    for (let key in this.children_) {
      children.push(this.children_[key]);
    }
    return children;
  }


  /**
   * @override
   */
  findChildren(object) {
    let children = [];
    for (let key in this.children_) {
      let child = this.children_[key];
      if (child.applyTest(object)) {
        children.push(child);
      }
    }
    return children;
  }


  /**
   * @override
   */
  removeChild(constraint) {
    delete this.children_[constraint];
  }


  /**
   * @override
   */
  toString() {
    return this.constraint;
  }
}



/**
 * @param constraint The constraint the node represents.
 * @param test The constraint test of this node.
 */
export class StaticTrieNode extends sre.AbstractTrieNode {
  kind: any;

  private rule_: SpeechRule|null = null;
  constructor(constraint: string, test: ((p1: Node) => boolean)|null) {
    super(constraint, test);
    this.kind = TrieNodeExports.Kind.STATIC;
  }


  /**
   * @return The speech rule of the node.
   */
  getRule(): SpeechRule|null {
    return this.rule_;
  }


  /**
   * @param rule speech rule of the node.
   */
  setRule(rule: SpeechRule) {
    if (this.rule_) {
      sre.Debugger.getInstance().output(
          'Replacing rule ' + this.rule_ + ' with ' + rule);
    }
    this.rule_ = rule;
  }


  /**
   * @override
   */
  toString() {
    let rule = this.getRule();
    return rule ? this.constraint + '\n' +
            '==> ' + this.getRule().action :
                  this.constraint;
  }
}

goog.inherits(StaticTrieNode, AbstractTrieNode);
