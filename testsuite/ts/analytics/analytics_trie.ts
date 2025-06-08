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
 * @file Analytics of speech rules sets.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { allStores } from './analytics_module.js';
import { Trie } from '../../speech-rule-engine/js/indexing/trie.js';
import { StaticTrieNode } from '../../speech-rule-engine/js/indexing/abstract_trie_node.js';
import { MathStore } from '../../speech-rule-engine/js/rule_engine/math_store.js';
import { SpeechRule } from '../../speech-rule-engine/js/rule_engine/speech_rule.js';
import { SpeechRuleEngine } from '../../speech-rule-engine/js/rule_engine/speech_rule_engine.js';

import { TestUtil } from '../base/test_util.js';

import AnalyticsUtil from './analytics_util.js';
import AnalyticsTest from './analytics_test.js';

namespace AnalyticsTrie {
  /**
   * @param rules
   */
  export function tempTrie(rules: SpeechRule[]): Trie {
    const trie = new Trie();
    for (const rule of rules) {
      trie.addRule(rule);
    }
    return trie;
  }

  /**
   * @param trie
   * @param name
   */
  export function outputTrie(trie: Trie, name: string) {
    const json = trie.json();
    const rules = trie.collectRules();
    AnalyticsUtil.fileJson('trie', json, name);
    AnalyticsUtil.fileJson(
      'trie',
      rules.map((x: SpeechRule) => x.toString()),
      name,
      'txt'
    );
  }

  /**
   *
   */
  export function restTrie() {
    const applied = Array.from(AnalyticsTest.appliedRule.values()).reduce(
      (x, y) => x.concat(y),
      []
    );
    const usedTrie = tempTrie(applied);
    const allRules = SpeechRuleEngine.getInstance().trie.collectRules();
    const outTrie = tempTrie([]);
    for (const rule of allRules) {
      const prec = rule.precondition;
      const cstr = rule.dynamicCstr.getValues();
      const node = usedTrie.byConstraint(
        cstr.concat([prec.query], prec.constraints)
      );
      if (
        !node ||
        !(node instanceof StaticTrieNode) ||
        !node.getRule() ||
        node.getRule() !== rule
      ) {
        outTrie.addRule(rule);
      }
    }
    return outTrie;
  }

  /**
   *
   */
  export function disjunctiveRules() {
    AnalyticsUtil.getAllSets().then((ruleSets) => {
      const result: SpeechRule[] = [];
      for (const [, rules] of Object.entries(ruleSets)) {
        rules.forEach((rule) => {
          if (rule.precondition.hasDisjunctive()) {
            result.push(rule);
          }
        });
      }
      outputTrie(tempTrie(result), 'disjunctiveRules');
    });
  }

  /**
   * @param rules
   * @param comparator
   */
  export function compareRuleSets(
    rules: MathStore[],
    comparator: Function = compareTries
  ) {
    const set1 = rules[0];
    const set2 = rules[1];
    if (!(set1 && set2)) {
      return;
    }
    const trie1 = trieFromStore(set1);
    const trie2 = trieFromStore(set2);
    let trie = comparator(trie1, trie2);
    for (let i = 2, nextSet; (nextSet = rules[i]); i++) {
      const nextTrie = trieFromStore(nextSet);
      trie = comparator(trie, nextTrie);
    }
    return trie;
  }

  /**
   * @param store
   */
  function trieFromStore(store: MathStore) {
    const trie = new Trie();
    store.getSpeechRules().forEach((x) => trie.addRule(x));
    return trie;
  }

  /**
   * Compares constraints ignoring the locale.
   *
   * @param trie1
   * @param trie2
   */
  export function compareTriesConstraints(trie1: Trie, trie2: Trie) {
    const rules = trie2.collectRules();
    const old = trie1.collectRules();
    const locale = old.length ? old[0].dynamicCstr.getValues()[0] : '';
    const result = [];
    for (const rule of rules) {
      const prec = rule.precondition;
      const cstr2 = rule.dynamicCstr.getValues();
      const cstr1 = cstr2.slice(1);
      cstr1.unshift(locale);
      const node = trie1.byConstraint(
        cstr1.concat([prec.query], prec.constraints)
      );
      if (node && node instanceof StaticTrieNode && node.getRule()) {
        result.push(rule);
      }
    }
    const tmp = tempTrie(result);
    return tmp;
  }

  // Compares two rule sets and creates a trie out of those rules that are the
  // same and do not need to be localized.
  /**
   * @param trie1
   * @param trie2
   */
  export function compareTries(trie1: Trie, trie2: Trie) {
    const rules = trie2.collectRules();
    const old = trie1.collectRules();
    const locale = old.length ? old[0].dynamicCstr.getValues()[0] : '';
    const result = [];
    for (const rule of rules) {
      const prec = rule.precondition;
      const cstr2 = rule.dynamicCstr.getValues();
      const cstr1 = cstr2.slice(1);
      cstr1.unshift(locale);
      const node = trie1.byConstraint(
        cstr1.concat([prec.query], prec.constraints)
      );
      if (
        node &&
        node instanceof StaticTrieNode &&
        node.getRule() &&
        node.getRule().action.toString() === rule.action.toString() &&
        !rule.action.localizable()
      ) {
        result.push(rule);
      }
    }
    const tmp = tempTrie(result);
    return tmp;
  }

  // Compare two tries on default style only.
  /**
   * @param trie1
   * @param trie2
   * @param style
   */
  export function compareTriesStyle(
    trie1: Trie,
    trie2: Trie,
    style = 'default'
  ) {
    const rules = Trie.collectRules_(trie2.singleStyle(style));
    let cstr1 = trie1.getSingletonDynamic_();
    cstr1.push(style);
    cstr1 = cstr1.slice(0, 4);
    const result = [];
    for (const rule of rules) {
      const prec = rule.precondition;
      const node = trie1.byConstraint(
        cstr1.concat([prec.query], prec.constraints)
      );
      if (
        node &&
        node instanceof StaticTrieNode &&
        node.getRule() &&
        node.getRule().action.toString() === rule.action.toString() &&
        !rule.action.localizable()
      ) {
        result.push(rule);
      }
    }
    const tmp = tempTrie(result);
    return tmp;
  }

  // Compute the diff of two rule sets, wrt. to constraints only (i.e., no
  // comparison of actions).
  /**
   * @param rules1
   * @param rules2
   * @param set1
   * @param set2
   */
  export function diffRuleSets(set1: MathStore, set2: MathStore): Trie {
    if (!(set1 && set2)) {
      return null;
    }
    const trie = tempTrie([]);
    const trie1 = trieFromStore(set1);
    const trie2 = trieFromStore(set2);
    let locale = set1.locale;
    let rules = set2.getSpeechRules();
    for (const rule of rules) {
      const prec = rule.precondition;
      const cstr = rule.dynamicCstr.getValues();
      cstr.shift();
      cstr.unshift(locale);
      const node = trie1.byConstraint(
        cstr.concat([prec.query], prec.constraints)
      );
      if (!node || !(node instanceof StaticTrieNode) || !node.getRule()) {
        trie.addRule(rule);
      }
    }
    locale = set2.locale;
    rules = set1.getSpeechRules();
    for (const rule of rules) {
      const prec = rule.precondition;
      const cstr = rule.dynamicCstr.getValues();
      cstr.shift();
      cstr.unshift(locale);
      const node = trie2.byConstraint(
        cstr.concat([prec.query], prec.constraints)
      );
      if (!node || !(node instanceof StaticTrieNode) || !node.getRule()) {
        trie.addRule(rule);
      }
    }
    return trie;
  }

  /**
   * @param store
   */
  function outputName(store: MathStore) {
    return (
      TestUtil.capitalize(store.locale) +
      TestUtil.capitalize(store.modality) +
      (store.domain === 'default' ? '' : TestUtil.capitalize(store.domain))
    );
  }

  /**
   *
   */
  export function output() {
    AnalyticsUtil.initAllSets();
    const rules = allStores;
    outputStats(allStores);
    // TODO: Divides these by modality and domain. O/w it makes little sense!
    outputTrie(compareRuleSets(rules), outputName(rules[0]));
    outputTrie(
      compareRuleSets(rules, compareTriesConstraints),
      outputName(rules[0]) + '-constr'
    );
    disjunctiveRules();
  }

  /**
   * @param store
   */
  function inheritedRules(store: MathStore) {
    let inherits = store.inherits;
    const rules = new Map();
    while (inherits) {
      inherits.getSpeechRules().forEach((x) => rules.set(x.name, true));
      inherits = inherits.inherits;
    }
    return rules;
  }

  /**
   * @param stores
   */
  function outputStats(stores: MathStore[]) {
    for (const store of stores) {
      if (store.kind === 'abstract') continue;
      const prec = store.getAllPreconditions();
      const inherited = inheritedRules(store);
      const rules = store.getSpeechRules();
      const diff = rules
        .filter((x) => !(prec.get(x.name) || inherited.get(x.name)))
        .map((x) => x.name);
      const rest: string[] = [];
      rules.forEach((x) => prec.set(x.name, false));
      prec.forEach((value, key) => {
        if (value) {
          rest.push(key);
        }
      });
      console.log(
        `${outputName(store)}: ${Array.from(prec.keys()).length} ${
          rules.length
        }`
      );
      console.log(`  Extra Rules: ${diff}`);
      console.log(`  Extra Precs: ${rest}`);
    }
  }
}

export default AnalyticsTrie;
