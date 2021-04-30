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
 * @fileoverview Handling of Clearspeak preferences.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {Engine, EngineConst} from '../common/engine';
import {DynamicCstr} from '../rule_engine/dynamic_cstr';
import {Axis, AxisMap, AxisProperties, DynamicCstrParser,
        DynamicProperties, DefaultComparator} from '../rule_engine/dynamic_cstr';
import {SemanticNode} from '../semantic_tree/semantic_node';
import {SemanticAttr} from '../semantic_tree/semantic_attr';


export class ClearspeakPreferences extends DynamicCstr {

  static AUTO: string = 'Auto';

  // TODO: Make these into a proper class.
  preference: any;

  /**
   * @param cstr The constraint mapping.
   * @param preference The preference.
   */
  constructor(cstr: AxisMap, preference: {[key: string]: string}) {
    super(cstr);
    this.preference = preference;
  }


  /**
   * @override
   */
  equal(cstr: ClearspeakPreferences) {
    let top = super.equal(cstr);
    if (!top) {
      return false;
    }
    let keys = Object.keys(this.preference);
    let preference = cstr.preference;
    if (keys.length !== Object.keys(preference).length) {
      return false;
    }
    for (let i = 0, key; key = keys[i]; i++) {
      if (this.preference[key] !== preference[key]) {
        return false;
      }
    }
    return true;
  }


  /**
   * Exports the Clearspeak comparator with default settings.
   * @return The clearspeak comparator.
   */
  static comparator(): Comparator {
    return new Comparator(
        Engine.getInstance().dynamicCstr,
        DynamicProperties.createProp(
            [DynamicCstr.DEFAULT_VALUES[Axis.LOCALE]],
            [DynamicCstr.DEFAULT_VALUES[Axis.MODALITY]],
            [DynamicCstr.DEFAULT_VALUES[Axis.DOMAIN]],
            [DynamicCstr.DEFAULT_VALUES[Axis.STYLE]]));
  }


  /**
   * Parse the preferences from a string of the form:
   * preference1_setting1:preference2_setting2:....:preferenceN_settingN
   * @param pref The preference string.
   * @return The preference settings.
   */
  static fromPreference(pref: string): AxisMap {
    let pairs = pref.split(':');
    let preferences: AxisMap = {};
    let properties = PREFERENCES.getProperties();
    let validKeys = Object.keys(properties);
    for (let i = 0, key; key = pairs[i]; i++) {
      let pair = key.split('_');
      if (validKeys.indexOf(pair[0]) === -1) {
        continue;
      }
      let value = pair[1];
      if (value && value !== ClearspeakPreferences.AUTO &&
          properties[(pair[0] as Axis)].indexOf(value) !==
              -1) {
        preferences[pair[0]] = pair[1];
      }
    }
    return preferences;
  }


  /**
   * Creates a style string from a set of preference mappings, by joining them
   * via underscore and colon in the form:
   * preference1_setting1:preference2_setting2:....:preferenceN_settingN
   * @param pref A preference mapping.
   * @return A style string created from the preferences.
   */
  static toPreference(pref: AxisMap): string {
    let keys = Object.keys(pref);
    let str = [];
    for (let i = 0; i < keys.length; i++) {
      str.push(keys[i] + '_' + pref[keys[i]]);
    }
    return str.length ? str.join(':') : DynamicCstr.DEFAULT_VALUE;
  }


  /**
   * Computes the clearspeak preferences per locale and caches them.
   * @param opt_dynamic Optionally a tree structure with the dynamic
   *     constraints.
   * @return Mapping of locale to preferences.
   */
  static getLocalePreferences(opt_dynamic?: Object):
     {[key: string]: AxisProperties} {
    let dynamic = opt_dynamic ||
        MathCompoundStore.getInstance().enumerate(
            SpeechRuleEngine.getInstance().enumerate());
    return ClearspeakPreferences.getLocalePreferences_(dynamic);
  }


  /**
   * Computes the clearspeak preferences per locale and caches them.
   * @param dynamic Optionally a tree structure with the dynamic
   *     constraints.
   * @return Mapping of locale to preferences.
   */
  private static getLocalePreferences_(dynamic: any):
      {[key: string]: AxisProperties} {
    let result: {[key: string]: AxisProperties} = {};
    for (let locale in dynamic) {
      if (!dynamic[locale]['speech'] ||
          !dynamic[locale]['speech']['clearspeak']) {
        continue;
      }
      let locPrefs = Object.keys(dynamic[locale]['speech']['clearspeak']);
      let prefs: AxisProperties = result[locale] = {};
      for (let axis in PREFERENCES.getProperties()) {
        let allSty = PREFERENCES.getProperties()[axis];
        let values = [axis + '_Auto'];
        if (allSty) {
          for (let sty of allSty) {
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


  // TODO: The following should be done in MathJax in the future!
  /**
   * Retrieves a speech explorer from a MathJax math item.
   * @param item A Math Item.
   * @return A speech explorer if the item has one.
   */
  static getSpeechExplorer(item: MathItem): Explorer {
    let explorers = item['attached'];
    if (!explorers || !explorers.length) {
      return null;
    }
    return explorers.find(function(ex) {
      return ex.speechGenerator &&
          ex.speechGenerator.getOptions().modality === 'speech';
    });
  }


  /**
   * Computes a selection of clearspeak preferences for the MathJax context menu
   * wrt. currently focused subexpression.
   * @param item A Math Item.
   * @param locale The current locale.
   * @return The menu settings for a new radio button
   *    sub menu.
   */
  // TODO (TS): item should get MathJax type MathItem
  static smartPreferences(item: any, locale: string): AxisMap[] {
    let prefs = ClearspeakPreferences.getLocalePreferences();
    let loc = prefs[locale];
    if (!loc) {
      return [];
    }
    let explorer = ClearspeakPreferences.getSpeechExplorer(item);
    if (!explorer) {
      return [{
        type: 'radio',
        content: 'Standard',
        id: 'clearspeak-default',
        variable: 'speechRules'
      }];
    }
    let smart = ClearspeakPreferences.relevantPreferences(
        explorer.walker.getFocus().getSemanticPrimary());
    // var smart = 'Bar'; // TODO: Lookup the right preference.
    let previous = EngineConst.DOMAIN_TO_STYLES['clearspeak'];
    let items = [
      {
        type: 'radio',
        content: 'No Preferences',
        id: 'clearspeak-default',
        variable: 'speechRules'
      },
      {
        type: 'radio',
        content: 'Current Preferences',
        id: 'clearspeak-' + previous,
        variable: 'speechRules'
      },
      {type: 'rule'}, {type: 'label', content: 'Preferences for ' + smart},
      {type: 'rule'}
    ];
    return items.concat(loc[smart].map(function(x) {
      let pair = x.split('_');
      return {
        type: 'radio',
        content: pair[1],
        id: 'clearspeak-' +
            ClearspeakPreferences.addPreference(previous, pair[0], pair[1]),
        variable: 'speechRules'
      };
    }));
  }


  /**
   * Computes a clearspeak preference that should be changed given the type of
   * the node.
   * @param node A semantic node.
   * @return The preference that fits the node's type and role.
   */
  static relevantPreferences(node: SemanticNode): string {
    let roles = SEMANTIC_MAPPING_[node.type];
    if (!roles) {
      return 'ImpliedTimes';
    }
    return roles[node.role] || roles[''] || 'ImpliedTimes';
  }


  /**
   * Look up the setting of a preference in a preference settings sting.
   * @param prefs Preference settings.
   * @param kind The preference to look up.
   * @return The setting of that preference. If it does not exist,
   *     returns Auto.
   */
  static findPreference(prefs: string, kind: string): string {
    if (prefs === 'default') {
      return ClearspeakPreferences.AUTO;
    }
    let parsed = ClearspeakPreferences.fromPreference(prefs);
    return parsed[kind] || ClearspeakPreferences.AUTO;
  }


  /**
   * Adds or updates a value in a preference settings.
   * @param prefs Preference settings.
   * @param kind New preference name.
   * @param value New preference value.
   * @return The updated preference settings.
   */
  static addPreference(prefs: string, kind: string, value: string): string {
    if (prefs === 'default') {
      return kind + '_' + value;
    }
    let parsed = ClearspeakPreferences.fromPreference(prefs);
    parsed[kind] = value;
    return ClearspeakPreferences.toPreference(parsed);
  }
}


const PREFERENCES = new DynamicProperties({
  AbsoluteValue: ['Auto', 'AbsEnd', 'Cardinality', 'Determinant'],
  Bar: ['Auto', 'Conjugate'],
  Caps: ['Auto', 'SayCaps'],
  CombinationPermutation: ['Auto', 'ChoosePermute'],
  Currency: ['Auto', 'Position', 'Prefix'],
  Ellipses: ['Auto', 'AndSoOn'],
  Enclosed: ['Auto', 'EndEnclose'],
  Exponent: [
    'Auto', 'AfterPower', 'Ordinal', 'OrdinalPower',
    // The following are German
    'Exponent'
  ],
  Fraction: [
    'Auto', 'EndFrac', 'FracOver', 'General', 'GeneralEndFrac', 'Ordinal',
    'Over', 'OverEndFrac', 'Per'
  ],
  Functions: [
    'Auto', 'None',
    // Reciprocal is French
    'Reciprocal'
  ],
  ImpliedTimes: ['Auto', 'MoreImpliedTimes', 'None'],
  Log: ['Auto', 'LnAsNaturalLog'],
  Matrix: [
    'Auto', 'Combinatoric', 'EndMatrix', 'EndVector', 'SilentColNum',
    'SpeakColNum', 'Vector'
  ],
  MultiLineLabel:
      ['Auto', 'Case', 'Constraint', 'Equation', 'Line', 'None', 'Row', 'Step'],
  MultiLineOverview: ['Auto', 'None'],
  MultiLinePausesBetweenColumns: ['Auto', 'Long', 'Short'],
  MultsymbolDot: ['Auto', 'Dot'],
  MultsymbolX: ['Auto', 'By', 'Cross'],
  Paren: [
    'Auto', 'CoordPoint', 'Interval', 'Silent', 'Speak', 'SpeakNestingLevel'
  ],
  Prime: ['Auto', 'Angle', 'Length'],
  Roots: ['Auto', 'PosNegSqRoot', 'PosNegSqRootEnd', 'RootEnd'],
  SetMemberSymbol: ['Auto', 'Belongs', 'Element', 'Member'],
  Sets: ['Auto', 'SilentBracket', 'woAll'],
  TriangleSymbol: ['Auto', 'Delta'],
  Trig: [
    'Auto', 'ArcTrig', 'TrigInverse',
    // Reciprocal French
    'Reciprocal'
  ],
  VerticalLine: ['Auto', 'Divides', 'Given', 'SuchThat']
})


export class Comparator extends DefaultComparator {

  preference: AxisMap;

  /**
   * @param cstr A Clearspeak preference constraint.
   * @param props A properties element for matching.
   */
  constructor(cstr: DynamicCstr, props: DynamicProperties) {
    super(cstr, props);
    this.preference = (cstr instanceof ClearspeakPreferences) ?
      cstr.preference : {};
  }


  /**
   * @override
   */
  match(cstr: DynamicCstr) {
    let top = super.match(cstr);
    if (!top) {
      return false;
    }
    if (!(cstr instanceof ClearspeakPreferences)) {
      return true;
    }
    let keys = Object.keys(cstr.preference);
    for (let i = 0, key; key = keys[i]; i++) {
      if (this.preference[key] !== cstr.preference[key]) {
        return false;
      }
    }
    return true;
  }


  /**
   * @override
   */
  compare(cstr1: DynamicCstr, cstr2: DynamicCstr) {
    let top = super.compare(cstr1, cstr2);
    if (top !== 0) {
      return top as 0|1|-1;
    }
    let pref1 = (cstr1 instanceof ClearspeakPreferences);
    let pref2 = (cstr2 instanceof ClearspeakPreferences);
    if (!pref1 && pref2) {
      return 1;
    }
    if (pref1 && !pref2) {
      return -1;
    }
    if (!pref1 && !pref2) {
      return 0;
    }
    let length1 = Object.keys((cstr1 as ClearspeakPreferences).preference).length;
    let length2 = Object.keys((cstr2 as ClearspeakPreferences).preference).length;
    return length1 > length2 ? -1 : length1 < length2 ? 1 : 0;
  }
}


export class Parser extends DynamicCstrParser {

  constructor() {
    super([Axis.LOCALE, Axis.MODALITY, Axis.DOMAIN, Axis.STYLE]);
  }


  /**
   * @override
   */
  parse(str: string) {
    let initial = super.parse(str);
    let style = initial.getValue(Axis.STYLE);
    let locale = initial.getValue(Axis.LOCALE);
    let modality = initial.getValue(Axis.MODALITY);
    let pref = {};
    if (style !== DynamicCstr.DEFAULT_VALUE) {
      pref = this.fromPreference(style);
      style = this.toPreference(pref);
    }
    return new ClearspeakPreferences(
        {
          'locale': locale,
          'modality': modality,
          'domain': 'clearspeak',
          'style': style
        },
        pref);
  }


  /**
   * Parse the preferences from a string of the form:
   * preference1_setting1:preference2_setting2:....:preferenceN_settingN
   * @param pref The preference string.
   * @return The preference settings.
   */
  fromPreference(pref: string): {[key: string]: string} {
    return ClearspeakPreferences.fromPreference(pref);
  }


  /**
   * Creates a style string from a set of preference mappings, by joining them
   * via underscore and colon in the form:
   * preference1_setting1:preference2_setting2:....:preferenceN_settingN
   * @param pref A preference mapping.
   * @return A style string created from the preferences.
   */
  toPreference(pref: {[key: string]: string}): string {
    return ClearspeakPreferences.toPreference(pref);
  }
}


/**
 * Mapping from preferences to semantic values.
 */
// TODO (TS): Replace with a Map to partial meaning elements.
const REVERSE_MAPPING: string[][] = [
  [
    'AbsoluteValue', SemanticAttr.Type.FENCED, SemanticAttr.Role.NEUTRAL
  ],
  [
    'Bar', SemanticAttr.Type.OVERSCORE,
    SemanticAttr.Role.OVERACCENT
  ],  // more
  [
    'Caps', SemanticAttr.Type.IDENTIFIER,
    SemanticAttr.Role.LATINLETTER
  ],  // more
  [
    'CombinationPermutation', SemanticAttr.Type.APPL,
    SemanticAttr.Role.UNKNOWN
  ],  // more
  [
    'Ellipses', SemanticAttr.Type.PUNCTUATION,
    SemanticAttr.Role.ELLIPSIS
  ],
  ['Exponent', SemanticAttr.Type.SUPERSCRIPT, ''],
  ['Fraction', SemanticAttr.Type.FRACTION, ''],
  ['Functions', SemanticAttr.Type.APPL, SemanticAttr.Role.SIMPLEFUNC],
  [
    'ImpliedTimes', SemanticAttr.Type.OPERATOR,
    SemanticAttr.Role.IMPLICIT
  ],
  [
    'Log', SemanticAttr.Type.APPL,
    SemanticAttr.Role.PREFIXFUNC
  ],                                         // specific
  ['Matrix', SemanticAttr.Type.MATRIX, ''],  // multiple
  ['Matrix', SemanticAttr.Type.VECTOR, ''],  // multiple
  [
    'MultiLineLabel', SemanticAttr.Type.MULTILINE,
    SemanticAttr.Role.LABEL
  ],  // more, multiple (table)
  [
    'MultiLineOverview', SemanticAttr.Type.MULTILINE,
    SemanticAttr.Role.TABLE
  ],  // more, multiple (table)
  [
    'MultiLinePausesBetweenColumns', SemanticAttr.Type.MULTILINE,
    SemanticAttr.Role.TABLE
  ],  // more, multiple (table)
  [
    'MultiLineLabel', SemanticAttr.Type.TABLE,
    SemanticAttr.Role.LABEL
  ],  // more, multiple (table)
  [
    'MultiLineOverview', SemanticAttr.Type.TABLE,
    SemanticAttr.Role.TABLE
  ],  // more, multiple (table)
  [
    'MultiLinePausesBetweenColumns', SemanticAttr.Type.TABLE,
    SemanticAttr.Role.TABLE
  ],  // more, multiple (table)
  [
    'MultiLineLabel', SemanticAttr.Type.CASES,
    SemanticAttr.Role.LABEL
  ],  // more, multiple (table)
  [
    'MultiLineOverview', SemanticAttr.Type.CASES,
    SemanticAttr.Role.TABLE
  ],  // more, multiple (table)
  [
    'MultiLinePausesBetweenColumns', SemanticAttr.Type.CASES,
    SemanticAttr.Role.TABLE
  ],  // more, multiple (table)
  [
    'MultsymbolDot', SemanticAttr.Type.OPERATOR,
    SemanticAttr.Role.MULTIPLICATION
  ],  // multiple?
  [
    'MultsymbolX', SemanticAttr.Type.OPERATOR,
    SemanticAttr.Role.MULTIPLICATION
  ],  // multiple?
  ['Paren', SemanticAttr.Type.FENCED, SemanticAttr.Role.LEFTRIGHT],
  ['Prime', SemanticAttr.Type.SUPERSCRIPT, SemanticAttr.Role.PRIME],
  ['Roots', SemanticAttr.Type.ROOT, ''],  // multiple (sqrt)
  ['Roots', SemanticAttr.Type.SQRT, ''],  // multiple (sqrt)
  [
    'SetMemberSymbol', SemanticAttr.Type.RELATION,
    SemanticAttr.Role.ELEMENT
  ],
  [
    'Sets', SemanticAttr.Type.FENCED,
    SemanticAttr.Role.SETEXT
  ],  // multiple
  [
    'TriangleSymbol', SemanticAttr.Type.IDENTIFIER,
    SemanticAttr.Role.GREEKLETTER
  ],  //????
  [
    'Trig', SemanticAttr.Type.APPL,
    SemanticAttr.Role.PREFIXFUNC
  ],  // specific
  ['VerticalLine', SemanticAttr.Type.PUNCTUATED, SemanticAttr.Role.VBAR]
];


const SEMANTIC_MAPPING_: {[key: string]: AxisMap} = function() {
  let result: {[key: string]: AxisMap} = {};
  for (let i = 0, triple; triple = REVERSE_MAPPING[i];
       i++) {
    let pref = triple[0];
    let role = result[triple[1]];
    if (!role) {
      role = {};
      result[triple[1]] = role;
    }
    role[triple[2]] = pref;
  }
  return result;
}();


/**
 * Add new comparator and parser.
 */
Engine.getInstance().comparators['clearspeak'] =
    ClearspeakPreferences.comparator;
Engine.getInstance().parsers['clearspeak'] = new Parser();
