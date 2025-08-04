//
// Copyright 2017-21 Volker Sorge
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
 * @file Handling of Clearspeak preferences.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Engine } from '../common/engine.js';
import { DynamicCstr } from '../rule_engine/dynamic_cstr.js';
import {
  Axis,
  AxisMap,
  AxisProperties,
  DefaultComparator,
  DynamicCstrParser,
  DynamicProperties
} from '../rule_engine/dynamic_cstr.js';
import * as MathCompoundStore from '../rule_engine/math_compound_store.js';
import { SpeechRuleEngine } from '../rule_engine/speech_rule_engine.js';
import {
  SemanticRole,
  SemanticType
} from '../semantic_tree/semantic_meaning.js';
import { SemanticNode } from '../semantic_tree/semantic_node.js';
import {
  fromPreference,
  toPreference,
  PREFERENCES
} from './clearspeak_preference_string.js';

export class ClearspeakPreferences extends DynamicCstr {
  /**
   * Exports the Clearspeak comparator with default settings.
   *
   * @returns The clearspeak comparator.
   */
  public static comparator(): Comparator {
    return new Comparator(
      Engine.getInstance().dynamicCstr,
      DynamicProperties.createProp(
        [DynamicCstr.DEFAULT_VALUES[Axis.LOCALE]],
        [DynamicCstr.DEFAULT_VALUES[Axis.MODALITY]],
        [DynamicCstr.DEFAULT_VALUES[Axis.DOMAIN]],
        [DynamicCstr.DEFAULT_VALUES[Axis.STYLE]]
      )
    );
  }

  /**
   * Computes the clearspeak preferences per locale and caches them.
   *
   * @param opt_dynamic Optionally a tree structure with the dynamic
   *     constraints.
   * @returns Mapping of locale to preferences.
   */
  public static getLocalePreferences(opt_dynamic?: {
    [key: string]: AxisProperties;
  }): {
    [key: string]: AxisProperties;
  } {
    const dynamic =
      opt_dynamic ||
      MathCompoundStore.enumerate(SpeechRuleEngine.getInstance().enumerate());
    return ClearspeakPreferences.getLocalePreferences_(dynamic);
  }

  /**
   * Computes a relevant selection of clearspeak preferences for a given
   * semantic node.
   *
   * @param node A semantic node.
   * @returns The preference that fits the node's type and role.
   */
  public static relevantPreferences(node: SemanticNode): string {
    const roles = SEMANTIC_MAPPING_[node.type];
    if (!roles) {
      return 'ImpliedTimes';
    }
    const cons = roles[node.role] || roles[''];
    if (!cons) {
      return 'ImpliedTimes';
    }
    if (typeof cons === 'string') {
      return cons;
    } else {
      return testSpecial(cons, node) || 'ImpliedTimes';
    }
  }

  /**
   * Computes the clearspeak preferences per locale and caches them.
   *
   * @param dynamic Optionally a tree structure with the dynamic
   *     constraints.
   * @returns Mapping of locale to preferences.
   */
  private static getLocalePreferences_(dynamic: any): {
    [key: string]: AxisProperties;
  } {
    const result: { [key: string]: AxisProperties } = {};
    for (const locale of Object.keys(dynamic)) {
      if (
        !dynamic[locale]['speech'] ||
        !dynamic[locale]['speech']['clearspeak']
      ) {
        continue;
      }
      const locPrefs = Object.keys(dynamic[locale]['speech']['clearspeak']);
      if (locPrefs.length < 3) continue; // Remove languages with no real CS
      const prefs: AxisProperties = (result[locale] = {});
      for (const axis in PREFERENCES.getProperties()) {
        const allSty = PREFERENCES.getProperties()[axis];
        const values = [axis + '_Auto'];
        if (allSty) {
          for (const sty of allSty) {
            if (locPrefs.indexOf(axis + '_' + sty) !== -1) {
              values.push(axis + '_' + sty);
            }
          }
        }
        prefs[axis] = values;
      }
    }
    return result;
  }

  /**
   * The clearspeak preferences class, which is a specialization of dynamic
   * constraints.
   *
   * @param cstr The constraint mapping.
   * @param preference The preference.
   */
  constructor(
    cstr: AxisMap,
    public preference: { [key: string]: string }
  ) {
    super(cstr);
  }

  /**
   * @override
   */
  public equal(cstr: ClearspeakPreferences) {
    const top = super.equal(cstr);
    if (!top) {
      return false;
    }
    const keys = Object.keys(this.preference);
    const preference = cstr.preference;
    if (keys.length !== Object.keys(preference).length) {
      return false;
    }
    for (let i = 0, key; (key = keys[i]); i++) {
      if (this.preference[key] !== preference[key]) {
        return false;
      }
    }
    return true;
  }
}

class Comparator extends DefaultComparator {
  /**
   * @override
   */
  public preference: AxisMap;

  /**
   * Comparator for clearspeak preference constraints.
   *
   * @param cstr A Clearspeak preference constraint.
   * @param props A properties element for matching.
   */
  constructor(cstr: DynamicCstr, props: DynamicProperties) {
    super(cstr, props);
    this.preference =
      cstr instanceof ClearspeakPreferences ? cstr.preference : {};
  }

  /**
   * @override
   */
  public match(cstr: DynamicCstr) {
    if (!(cstr instanceof ClearspeakPreferences)) {
      return super.match(cstr);
    }
    if (cstr.getComponents()[Axis.STYLE] === 'default') {
      return true;
    }
    const keys = Object.keys(cstr.preference);
    for (let i = 0, key; (key = keys[i]); i++) {
      if (this.preference[key] !== cstr.preference[key]) {
        return false;
      }
    }
    return true;
  }

  /**
   * @override
   */
  public compare(cstr1: DynamicCstr, cstr2: DynamicCstr) {
    const top = super.compare(cstr1, cstr2);
    if (top !== 0) {
      return top as 0 | 1 | -1;
    }
    const pref1 = cstr1 instanceof ClearspeakPreferences;
    const pref2 = cstr2 instanceof ClearspeakPreferences;
    if (!pref1 && pref2) {
      return 1;
    }
    if (pref1 && !pref2) {
      return -1;
    }
    if (!pref1 && !pref2) {
      return 0;
    }
    const length1 = Object.keys(
      (cstr1 as ClearspeakPreferences).preference
    ).length;
    const length2 = Object.keys(
      (cstr2 as ClearspeakPreferences).preference
    ).length;
    return length1 > length2 ? -1 : length1 < length2 ? 1 : 0;
  }
}

class Parser extends DynamicCstrParser {
  /**
   * @override
   */
  constructor() {
    super([Axis.LOCALE, Axis.MODALITY, Axis.DOMAIN, Axis.STYLE]);
  }

  /**
   * @override
   */
  public parse(str: string) {
    const initial = super.parse(str);
    let style = initial.getValue(Axis.STYLE);
    const locale = initial.getValue(Axis.LOCALE);
    const modality = initial.getValue(Axis.MODALITY);
    let pref = {};
    if (style !== DynamicCstr.DEFAULT_VALUE) {
      pref = this.fromPreference(style);
      style = this.toPreference(pref);
    }
    return new ClearspeakPreferences(
      {
        locale: locale,
        modality: modality,
        domain: 'clearspeak',
        style: style
      },
      pref
    );
  }

  /**
   * Parse the preferences from a string of the form:
   * preference1_setting1:preference2_setting2:....:preferenceN_settingN
   *
   * @param pref The preference string.
   * @returns The preference settings.
   */
  public fromPreference(pref: string): { [key: string]: string } {
    return fromPreference(pref);
  }

  /**
   * Creates a style string from a set of preference mappings, by joining them
   * via underscore and colon in the form:
   * preference1_setting1:preference2_setting2:....:preferenceN_settingN
   *
   * @param pref A preference mapping.
   * @returns A style string created from the preferences.
   */
  public toPreference(pref: { [key: string]: string }): string {
    return toPreference(pref);
  }
}

/**
 * Mapping from preferences to semantic values.
 */
// TODO (TS): Replace with a Map to partial meaning elements.
const REVERSE_MAPPING: string[][] = [
  ['AbsoluteValue', SemanticType.FENCED, SemanticRole.NEUTRAL],
  ['AbsoluteValue', SemanticType.FENCED, SemanticRole.METRIC],
  ['Bar', SemanticType.OVERSCORE, ''], // more
  ['Caps', SemanticType.IDENTIFIER, SemanticRole.LATINLETTER, 'category:Lu'], // more
  ['CombinationPermutation', SemanticType.APPL, SemanticRole.UNKNOWN], // more
  ['Currency', SemanticType.IDENTIFIER, SemanticRole.UNIT, 'unit:currency'],
  ['Currency', SemanticType.INFIXOP, SemanticRole.UNIT, 'unit:currency'],
  ['Enclosed', SemanticType.ENCLOSE, ''],
  ['Ellipses', SemanticType.PUNCTUATION, SemanticRole.ELLIPSIS],
  ['Exponent', SemanticType.SUPERSCRIPT, ''],
  ['Fraction', SemanticType.FRACTION, ''],
  ['Functions', SemanticType.APPL, SemanticRole.SIMPLEFUNC],
  ['ImpliedTimes', SemanticType.OPERATOR, SemanticRole.IMPLICIT],
  ['Log', SemanticType.APPL, SemanticRole.PREFIXFUNC, 'appl:Logarithm'], // specific
  ['Log', SemanticType.FUNCTION, SemanticRole.PREFIXFUNC, 'category:Logarithm'], // specific
  ['Matrix', SemanticType.MATRIX, ''], // multiple
  ['Matrix', SemanticType.VECTOR, ''], // multiple
  ['MultiLineLabel', SemanticType.MULTILINE, SemanticRole.LABEL], // more, multiple (table)
  ['MultiLinePausesBetweenColumns', SemanticType.MULTILINE, SemanticRole.TABLE], // more, multiple (table)
  ['MultiLineOverview', SemanticType.MULTILINE, ''], // more, multiple (table)
  ['MultiLineLabel', SemanticType.TABLE, SemanticRole.LABEL], // more, multiple (table)
  ['MultiLinePausesBetweenColumns', SemanticType.TABLE, ''], // more, multiple (table)
  ['MultiLineOverview', SemanticType.TABLE, ''], // more, multiple (table)
  ['MultiLineLabel', SemanticType.CASES, SemanticRole.LABEL], // more, multiple (table)
  ['MultiLinePausesBetweenColumns', SemanticType.CASES, ''], // more, multiple (table)
  ['MultiLineOverview', SemanticType.CASES, ''], // more, multiple (table)
  [
    'MultsymbolDot',
    SemanticType.OPERATOR,
    SemanticRole.MULTIPLICATION,
    'content:22C5'
  ], // multiple?
  [
    'MultsymbolX',
    SemanticType.OPERATOR,
    SemanticRole.MULTIPLICATION,
    'content:00D7'
  ], // multiple?
  ['Paren', SemanticType.FENCED, SemanticRole.LEFTRIGHT],
  ['Prime', SemanticType.PUNCTUATION, SemanticRole.PRIME],
  ['Roots', SemanticType.ROOT, ''], // multiple (sqrt)
  ['Roots', SemanticType.SQRT, ''], // multiple (sqrt)
  ['SetMemberSymbol', SemanticType.OPERATOR, SemanticRole.ELEMENT],
  ['Sets', SemanticType.FENCED, SemanticRole.SETEXT], // multiple
  [
    'TriangleSymbol',
    SemanticType.IDENTIFIER,
    SemanticRole.GREEKLETTER,
    'content:0394'
  ], // ????
  ['Trig', SemanticType.APPL, SemanticRole.PREFIXFUNC, 'appl:Trigonometric'], // specific
  [
    'Trig',
    SemanticType.FUNCTION,
    SemanticRole.PREFIXFUNC,
    'category:Trigonometric'
  ], // specific
  ['VerticalLine', SemanticType.PUNCTUATED, SemanticRole.VBAR],
  ['VerticalLine', SemanticType.PUNCTUATION, SemanticRole.VBAR],
  ['Inference', SemanticType.INFERENCE, ''],
  ['Inference', SemanticType.PREMISES, ''],
  ['Inference', SemanticType.RULELABEL, ''],
  ['Inference', SemanticType.CONCLUSION, '']
];

const SEMANTIC_MAPPING_: {
  [key: string]: { [key: string]: string | { [key: string]: string } };
} = (function () {
  const result: {
    [key: string]: { [key: string]: string | { [key: string]: string } };
  } = {};
  for (let i = 0, triple; (triple = REVERSE_MAPPING[i]); i++) {
    const pref = triple[0];
    const special = triple[3];
    let role = result[triple[1]];
    if (!role) {
      role = {};
      result[triple[1]] = role;
    }
    if (!special) {
      role[triple[2]] = pref;
      continue;
    }
    let specialize = role[triple[2]] as { [key: string]: string };
    if (!specialize) {
      specialize = {};
      role[triple[2]] = specialize;
    }
    specialize[special] = pref;
  }
  return result;
})();

/**
 * Test mappings of special predicates on the semantic node.
 *
 * @param special Special predicate mapping.
 * @param node The semantic node to test.
 * @returns Preference computed by the special test.
 */
function testSpecial(
  special: { [key: string]: string },
  node: SemanticNode
): string {
  for (const [pred, res] of Object.entries(special)) {
    if (executeSpecial(pred, node)) {
      return res;
    }
  }
  return '';
}

/**
 * Executes a special predicate on the semantic node.
 *
 * @param special Special predicate specification of the form "PRED:ARG".
 * @param node The semantic node to test.
 * @returns True if a specialized preference predicate holds on the node.
 */
function executeSpecial(special: string, node: SemanticNode) {
  const [pred, arg] = special.split(':');
  if (!pred) {
    return false;
  }
  const func = specialPred[pred];
  if (!func) {
    return false;
  }
  return func(node, arg);
}

const specialPred: {
  [key: string]: (node: SemanticNode, arg: string) => boolean;
} = {
  category: (node: SemanticNode, arg: string) => {
    return MathCompoundStore.lookupCategory(node.textContent) === arg;
  },
  content: (node: SemanticNode, arg: string) => {
    return node.textContent === String.fromCodePoint(parseInt(arg, 16));
  },
  appl: (node: SemanticNode, arg: string) => {
    const func = node.childNodes[0];
    return func
      ? MathCompoundStore.lookupCategory(func.textContent) === arg
      : false;
  },
  unit: (node: SemanticNode, arg: string) => {
    return MathCompoundStore.lookupCategory(node.textContent + ':unit') === arg;
  }
};

/**
 * Add new comparator and parser.
 */
Engine.getInstance().comparators['clearspeak'] =
  ClearspeakPreferences.comparator;
Engine.getInstance().parsers['clearspeak'] = new Parser();
