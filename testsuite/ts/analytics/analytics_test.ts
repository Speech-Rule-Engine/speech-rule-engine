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
 * @file Analytics methods for determining speech rule coverage of
 * tests.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { SpeechRuleEngine } from '../../speech-rule-engine/js/rule_engine/speech_rule_engine.js';
import { SpeechRule } from '../../speech-rule-engine/js/rule_engine/speech_rule.js';

import * as fs from 'fs';
import { TestPath, TestUtil } from '../base/test_util.js';
import AnalyticsUtil from './analytics_util.js';

// Saves
//  * All applicable rules for a test case
//  * All actually applied rule for a test case
//  * Unique applied rules for each test suite
//  * Comparison with actual rules

const oldLookupRule = SpeechRuleEngine.prototype.lookupRule;

/**
 * @override
 */
SpeechRuleEngine.prototype.lookupRule = function (node: any, dynamic: any) {
  const rule = oldLookupRule.bind(this)(node, dynamic);
  if (AnalyticsTest.deep && rule) {
    AnalyticsTest.addAppliedRule(rule);
  }
  return rule;
};

const oldLookupRules = SpeechRuleEngine.prototype.lookupRules;
/**
 * @override
 */
SpeechRuleEngine.prototype.lookupRules = function (node: any, dynamic: any) {
  const rules = oldLookupRules.bind(this)(node, dynamic);
  if (AnalyticsTest.deep) {
    AnalyticsTest.addApplicableRules(rules);
  }
  return rules;
};

class AnalyticsTest {
  public static currentTest = '';
  public static currentTestcase = '';
  public static deep = false;

  public static appliedRule: Map<string, SpeechRule[]> = new Map();
  public static applicableRules: Map<string, SpeechRule[][]> = new Map();

  /**
   * Records a rule applied while a running a test case.
   *
   * @param rule The applied rule.
   */
  public static addAppliedRule(rule: SpeechRule) {
    let cases = AnalyticsTest.appliedRule.get(AnalyticsTest.currentTestcase);
    if (!cases) {
      cases = [];
      AnalyticsTest.appliedRule.set(AnalyticsTest.currentTestcase, cases);
    }
    cases.push(rule);
  }

  /**
   * Records all rules applicable while running a test case.
   *
   * @param rules The list of applicable rules.
   */
  public static addApplicableRules(rules: SpeechRule[]) {
    let cases = AnalyticsTest.applicableRules.get(AnalyticsTest.currentTestcase);
    if (!cases) {
      cases = [];
      AnalyticsTest.applicableRules.set(AnalyticsTest.currentTestcase, cases);
    }
    cases.push(rules);
  }

  /**
   * Generate all output files.
   */
  public static output() {
    if (!AnalyticsTest.deep) {
      return;
    }
    AnalyticsTest.outputAppliedRules();
    AnalyticsTest.outputApplicableRules();
    AnalyticsTest.outputUniqueAppliedRules();
  }

  // This works now as all rule sets are loaded.
  /**
   * Outputs a json file enumerating all rules for every rule set as well as the
   * difference between those and the list of unique rules actually applied
   * during tests.
   */
  public static async outputAllRules() {
    AnalyticsTest.loadAllAppliedRules();
    AnalyticsUtil.getAllSets().then((ruleSets) => {
    for (const [name, obj] of Object.entries(ruleSets)) {
      const rules = obj.map((x: SpeechRule) => x.toString());
      AnalyticsUtil.fileJson('allRules', rules.sort(), name);
      AnalyticsTest.allRulesDifference(rules, name);
    }
    });
  }

  private static allAppliedRules: string[] = [];
  private static uniqueAppliedRules: Map<string, boolean> = new Map();

  /**
   * Loads the list of all uniquely applied rules.
   */
  private static loadAllAppliedRules() {
   const path = TestPath.ANALYSIS + '/uniqueAppliedRules/';
    const files = fs.readdirSync(path);
    files.forEach((file) => {
      AnalyticsTest.allAppliedRules = AnalyticsTest.allAppliedRules.concat(
        TestUtil.loadJson(path + file) as string[]
      );
    });
    AnalyticsTest.allAppliedRules = AnalyticsUtil.removeDuplicates(AnalyticsTest.allAppliedRules);
    AnalyticsTest.allAppliedRules.forEach((x) => AnalyticsTest.uniqueAppliedRules.set(x, true));
  }

  /**
   * Generates json files for difference of all rules in a set and those
   * actually applied during the tests.
   *
   * @param rules The list of rules in the set.
   * @param name The name of the rule set.
   */
  private static allRulesDifference(rules: string[], name: string) {
    const diff = [];
    for (const rule of rules) {
      if (!AnalyticsTest.uniqueAppliedRules.get(rule)) {
        diff.push(rule);
      }
    }
    AnalyticsUtil.fileJson('diffAppliedRules', diff, name);
  }

  /**
   * Outputs a list of all applied rules for each test of the current test
   * suite.
   */
  public static outputAppliedRules() {
    const jsonObj: { [name: string]: string[] } = {};
    for (const [key, value] of AnalyticsTest.appliedRule.entries()) {
      jsonObj[key] = value.map((x) => x.toString());
      AnalyticsUtil.fileJson('appliedRules', jsonObj, AnalyticsTest.currentTest);
    }
  }

  /**
   * Outputs lists of lists of all applicable rules for each test of the current
   * test suite.
   */
  public static outputApplicableRules() {
    const jsonObj: { [name: string]: string[][] } = {};
    for (const [key, value] of AnalyticsTest.applicableRules.entries()) {
      jsonObj[key] = value
        .filter((x) => x.length)
        .map((x) => x.map((y) => y.toString()));
    }
    AnalyticsUtil.fileJson('applicableRules', jsonObj, AnalyticsTest.currentTest);
  }

  /**
   * Outputs the unique applied rules for each test suite.
   */
  public static outputUniqueAppliedRules() {
    let rules: SpeechRule[] = [];
    for (const value of AnalyticsTest.appliedRule.values()) {
      rules = rules.concat(value);
    }
    rules = AnalyticsUtil.removeDuplicates(rules);
    AnalyticsUtil.fileJson(
      'uniqueAppliedRules',
      rules.map((x) => x.toString()),
      AnalyticsTest.currentTest
    );
  }
}

export default AnalyticsTest;
