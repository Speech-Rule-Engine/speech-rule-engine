// Copyright 2020 Volker Sorge
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
 * @file Modification of SRE data strctures for analytics.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Trie } from '../../speech-rule-engine/js/indexing/trie.js';
import { StaticTrieNode } from '../../speech-rule-engine/js/indexing/abstract_trie_node.js';
import { TrieNode } from '../../speech-rule-engine/js/indexing/trie_node.js';
import { MathStore } from '../../speech-rule-engine/js/rule_engine/math_store.js';
import {
  BaseRuleStore,
  RulesJson
} from '../../speech-rule-engine/js/rule_engine/base_rule_store.js';
import {
  Action,
  ActionType,
  Component,
  Precondition,
  SpeechRule
} from '../../speech-rule-engine/js/rule_engine/speech_rule.js';

declare module '../../speech-rule-engine/js/indexing/trie.js' {
  interface Trie {
    store: BaseRuleStore;
    root: TrieNode;
    addRule(rule: SpeechRule): void;
    lookupRules(xml: Node, dynamic: string[][]): SpeechRule[];
    hasSubtrie(cstrs: string[]): boolean;
    toString(): string;
    collectRules(): SpeechRule[];
    order(): number;
    enumerate(opt_info?: Object): Object;
    byConstraint(constraint: string[]): TrieNode;
    // Extension
    json(): { [key: string]: Object };
    getSingletonDynamic_(): string[];
    singleStyle(style: string): TrieNode;
  }
}

/**
 * @param node The root note of the trie
 * @returns The JSON structure representing that trie.
 */
function trieJson(node: TrieNode): { [key: string]: Object } {
  const json: { [key: string]: Object } = {
    type: node.getKind(),
    $t: node.getConstraint(),
    children: !node.getChildren().length
      ? []
      : node.getChildren().map(function (x: any) {
          return trieJson(x);
        })
  };
  if (!(node instanceof StaticTrieNode)) {
    return json;
  }
  const rule = node.getRule();
  if (rule) {
    json['rule'] = rule;
  }
  return json;
}

Trie.prototype.json = function () {
  return { stree: trieJson(this.root) };
};

Trie.prototype.getSingletonDynamic_ = function () {
  let node = this.root;
  const result = [];
  while (node.getChildren().length === 1) {
    node = node.getChildren()[0];
    result.push(node.getConstraint());
  }
  return result;
};

Trie.prototype.singleStyle = function (style: string) {
  return this.byConstraint(this.getSingletonDynamic_()).getChild(style);
};

// Queries for rule sets.
declare module '../../speech-rule-engine/js/rule_engine/math_store.js' {
  interface MathStore {
    annotators: string[];
    initialize(): void;
    annotations(): void;
    defineUniqueRuleAlias(
      name: string,
      dynamic: string,
      query: string,
      ...args: string[]
    ): void;
    defineRulesAlias(name: string, query: string, ...args: string[]): void;
    defineSpecialisedRule(
      name: string,
      oldDynamic: string,
      newDynamic: string,
      opt_action?: string
    ): void;
    evaluateString(str: string): any[];
    parse(ruleSet: RulesJson): void;
    allText(): boolean;
    allLocalizable(): boolean;
    getAllPreconditions(): Map<string, boolean>;
  }
}

MathStore.prototype.allText = function () {
  return this.getSpeechRules().filter((x: SpeechRule) =>
    x.action.hasType(ActionType.TEXT)
  );
};

MathStore.prototype.allLocalizable = function () {
  return this.getSpeechRules().filter((x: SpeechRule) =>
    x.action.localizable()
  );
};

MathStore.prototype.getAllPreconditions = function () {
  const prec = new Map();
  let inherits = this;
  while (inherits) {
    inherits.preconditions.forEach((_value: SpeechRule, key: string) =>
      prec.set(key, true)
    );
    inherits = inherits.inherits;
  }
  return prec;
};

const oldInitialize = MathStore.prototype.initialize;

export const allStores: MathStore[] = [];
/**
 * @override
 */
MathStore.prototype.initialize = function () {
  oldInitialize.bind(this)();
  allStores.push(this);
};

declare module '../../speech-rule-engine/js/rule_engine/speech_rule.js' {
  interface SpeechRule {
    toString(): string;
    localizable(): boolean;
    hasType(type: string): boolean;
  }

  interface Action {
    components: Component[];
    toString(): string;
    localizable(): boolean;
    hasType(type: string): boolean;
  }

  interface Component {
    toString(): string;
    grammarToString(): string;
    getGrammar(): string[];
    attributesToString(): string;
    getAttributes(): string[];
    localizable(): boolean;
    hasType(type: string): boolean;
  }

  interface Precondition {
    toString(): string;
    hasDisjunctive(): boolean;
  }
}

Action.prototype.localizable = function () {
  return this.components.some((x: SpeechRule) => x.localizable());
};

Action.prototype.hasType = function (type: string) {
  return this.components.some((x: SpeechRule) => x.hasType(type));
};

Precondition.prototype.hasDisjunctive = function () {
  return this.constraints.some((x: string) => x.match(/ or /));
};

Component.prototype.localizable = function () {
  return this.hasType(ActionType.TEXT) && this.content.match(/^".*"$/);
};

Component.prototype.hasType = function (type: string) {
  return this.type === type;
};

/**
 * Retrieves a rules for a given sequence of constraints.
 *
 * @param constraint A list of constraints.
 * @returns The speech rule or null. What if multiple rules exist?
 */
Trie.prototype.byConstraint = function (constraint: string[]): TrieNode {
  let node = this.root;
  while (constraint.length && node) {
    const cstr = constraint.shift();
    node = node.getChild(cstr);
  }
  return node || null;
};
