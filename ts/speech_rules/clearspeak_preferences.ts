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

import * as EngineExports from '../common/engine';
import {Engine} from '../common/engine';
import * as DynamicCstrExports from '../rule_engine/dynamic_cstr';
import {DynamicCstr} from '../rule_engine/dynamic_cstr';
import {DynamicProperties} from '../rule_engine/dynamic_cstr';
import {SemanticNode} from '../semantic_tree/semantic_node';



/**
 * @param cstr The constraint mapping.
 * @param preference The preference.
 */
export class ClearspeakPreferences extends sre.DynamicCstr {
  static AUTO: string = 'Auto';


  static PREFERENCES: DynamicProperties;


  private static REVERSE_MAPPING_: string[][];


  private static SEMANTIC_MAPPING_:
      {[key: SemanticAttr.Type]: {[key: SemanticAttr.Role|string]: string}};

  // TODO: Make these into a proper class.
  preference: any;
  constructor(cstr: DynamicCstrExports.Map, preference: {[key: string]: string}) {
    super(cstr);
    this.preference = preference;
  }


  /**
   * @override
   */
  equal(cstr) {
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
        DynamicProperties.create(
            [DynamicCstr.DEFAULT_VALUES[DynamicCstrExports.Axis.LOCALE]],
            [DynamicCstr.DEFAULT_VALUES[DynamicCstrExports.Axis.MODALITY]],
            [DynamicCstr.DEFAULT_VALUES[DynamicCstrExports.Axis.DOMAIN]],
            [DynamicCstr.DEFAULT_VALUES[DynamicCstrExports.Axis.STYLE]]));
  }


  /**
   * Parse the preferences from a string of the form:
   * preference1_setting1:preference2_setting2:....:preferenceN_settingN
   * @param pref The preference string.
   * @return The preference settings.
   */
  static fromPreference(pref: string): {[key: string]: string} {
    let pairs = pref.split(':');
    let preferences = {};
    let properties = ClearspeakPreferences.PREFERENCES.getProperties();
    let validKeys = Object.keys(properties);
    for (let i = 0, key; key = pairs[i]; i++) {
      let pair = key.split('_');
      if (validKeys.indexOf(pair[0]) === -1) {
        continue;
      }
      let value = pair[1];
      if (value && value !== ClearspeakPreferences.AUTO &&
          properties[(pair[0] as DynamicCstrExports.Axis)].indexOf(value) !==
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
  static toPreference(pref: {[key: string]: string}): string {
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
      {[key: string]: DynamicProperties} {
    let dynamic = opt_dynamic ||
        sre.MathCompoundStore.getInstance().enumerate(
            sre.SpeechRuleEngine.getInstance().enumerate());
    return ClearspeakPreferences.getLocalePreferences_(dynamic);
  }


  /**
   * Computes the clearspeak preferences per locale and caches them.
   * @param dynamic Optionally a tree structure with the dynamic
   *     constraints.
   * @return Mapping of locale to preferences.
   */
  private static getLocalePreferences_(dynamic: Object):
      {[key: string]: DynamicProperties} {
    let result = {};
    for (let locale in dynamic) {
      if (!dynamic[locale]['speech'] ||
          !dynamic[locale]['speech']['clearspeak']) {
        continue;
      }
      let locPrefs = Object.keys(dynamic[locale]['speech']['clearspeak']);
      let prefs = result[locale] = {};
      for (let axis in ClearspeakPreferences.PREFERENCES.getProperties()) {
        let allSty = ClearspeakPreferences.PREFERENCES.getProperties()[axis];
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
  static smartPreferences(item: MathItem, locale: string):
      ({[key: string]: string})[] {
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
    let previous = Engine.DOMAIN_TO_STYLES['clearspeak'];
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
    let roles = ClearspeakPreferences.SEMANTIC_MAPPING_[node.type];
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
goog.inherits(ClearspeakPreferences, DynamicCstr);
ClearspeakPreferences.PREFERENCES = new DynamicProperties({
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
});



/**
 * @param cstr A Clearspeak preference constraint.
 * @param props A properties element for matching.
 */
export class Comparator extends sre.DynamicCstr.DefaultComparator {
  preference: {[key: string]: string};
  constructor(cstr: DynamicCstr, props: DynamicProperties) {
    super(cstr, props);
    this.preference = cstr.preference || {};
  }


  /**
   * @override
   */
  match(cstr) {
    let top = super.match(cstr);
    if (!top) {
      return false;
    }
    if (!cstr.preference) {
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
  compare(cstr1, cstr2) {
    let top = super.compare(cstr1, cstr2);
    if (top !== 0) {
      return top;
    }
    if (!cstr1.preference && cstr2.preference) {
      return 1;
    }
    if (cstr1.preference && !cstr2.preference) {
      return -1;
    }
    if (!cstr1.preference && !cstr2.preference) {
      return 0;
    }
    let length1 = Object.keys(cstr1.preference).length;
    let length2 = Object.keys(cstr2.preference).length;
    return length1 > length2 ? -1 : length1 < length2 ? 1 : 0;
  }
}

goog.inherits(Comparator, DynamicCstr.DefaultComparator);



export class Parser extends sre.DynamicCstr.Parser {
  constructor() {
    super([
      DynamicCstrExports.Axis.LOCALE, DynamicCstrExports.Axis.MODALITY,
      DynamicCstrExports.Axis.DOMAIN, DynamicCstrExports.Axis.STYLE
    ]);
  }


  /**
   * @override
   */
  parse(str) {
    let initial = super.parse(str);
    let style = initial.getValue(DynamicCstrExports.Axis.STYLE);
    let locale = initial.getValue(DynamicCstrExports.Axis.LOCALE);
    let modality = initial.getValue(DynamicCstrExports.Axis.MODALITY);
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
goog.inherits(Parser, DynamicCstrExports.Parser);
ClearspeakPreferences.REVERSE_MAPPING_ = [
  [
    'AbsoluteValue', sre.SemanticAttr.Type.FENCED, sre.SemanticAttr.Role.NEUTRAL
  ],
  [
    'Bar', sre.SemanticAttr.Type.OVERSCORE,
    sre.SemanticAttr.Role.OVERACCENT
  ],  // more
  [
    'Caps', sre.SemanticAttr.Type.IDENTIFIER,
    sre.SemanticAttr.Role.LATINLETTER
  ],  // more
  [
    'CombinationPermutation', sre.SemanticAttr.Type.APPL,
    sre.SemanticAttr.Role.UNKNOWN
  ],  // more
  [
    'Ellipses', sre.SemanticAttr.Type.PUNCTUATION,
    sre.SemanticAttr.Role.ELLIPSIS
  ],
  ['Exponent', sre.SemanticAttr.Type.SUPERSCRIPT, ''],
  ['Fraction', sre.SemanticAttr.Type.FRACTION, ''],
  ['Functions', sre.SemanticAttr.Type.APPL, sre.SemanticAttr.Role.SIMPLEFUNC],
  [
    'ImpliedTimes', sre.SemanticAttr.Type.OPERATOR,
    sre.SemanticAttr.Role.IMPLICIT
  ],
  [
    'Log', sre.SemanticAttr.Type.APPL,
    sre.SemanticAttr.Role.PREFIXFUNC
  ],                                             // specific
  ['Matrix', sre.SemanticAttr.Type.MATRIX, ''],  // multiple
  ['Matrix', sre.SemanticAttr.Type.VECTOR, ''],  // multiple
  [
    'MultiLineLabel', sre.SemanticAttr.Type.MULTILINE,
    sre.SemanticAttr.Role.LABEL
  ],  // more, multiple (table)
  [
    'MultiLineOverview', sre.SemanticAttr.Type.MULTILINE,
    sre.SemanticAttr.Role.TABLE
  ],  // more, multiple (table)
  [
    'MultiLinePausesBetweenColumns', sre.SemanticAttr.Type.MULTILINE,
    sre.SemanticAttr.Role.TABLE
  ],  // more, multiple (table)
  [
    'MultiLineLabel', sre.SemanticAttr.Type.TABLE,
    sre.SemanticAttr.Role.LABEL
  ],  // more, multiple (table)
  [
    'MultiLineOverview', sre.SemanticAttr.Type.TABLE,
    sre.SemanticAttr.Role.TABLE
  ],  // more, multiple (table)
  [
    'MultiLinePausesBetweenColumns', sre.SemanticAttr.Type.TABLE,
    sre.SemanticAttr.Role.TABLE
  ],  // more, multiple (table)
  [
    'MultiLineLabel', sre.SemanticAttr.Type.CASES,
    sre.SemanticAttr.Role.LABEL
  ],  // more, multiple (table)
  [
    'MultiLineOverview', sre.SemanticAttr.Type.CASES,
    sre.SemanticAttr.Role.TABLE
  ],  // more, multiple (table)
  [
    'MultiLinePausesBetweenColumns', sre.SemanticAttr.Type.CASES,
    sre.SemanticAttr.Role.TABLE
  ],  // more, multiple (table)
  [
    'MultsymbolDot', sre.SemanticAttr.Type.OPERATOR,
    sre.SemanticAttr.Role.MULTIPLICATION
  ],  // multiple?
  [
    'MultsymbolX', sre.SemanticAttr.Type.OPERATOR,
    sre.SemanticAttr.Role.MULTIPLICATION
  ],  // multiple?
  ['Paren', sre.SemanticAttr.Type.FENCED, sre.SemanticAttr.Role.LEFTRIGHT],
  ['Prime', sre.SemanticAttr.Type.SUPERSCRIPT, sre.SemanticAttr.Role.PRIME],
  ['Roots', sre.SemanticAttr.Type.ROOT, ''],  // multiple (sqrt)
  ['Roots', sre.SemanticAttr.Type.SQRT, ''],  // multiple (sqrt)
  [
    'SetMemberSymbol', sre.SemanticAttr.Type.RELATION,
    sre.SemanticAttr.Role.ELEMENT
  ],
  [
    'Sets', sre.SemanticAttr.Type.FENCED,
    sre.SemanticAttr.Role.SETEXT
  ],  // multiple
  [
    'TriangleSymbol', sre.SemanticAttr.Type.IDENTIFIER,
    sre.SemanticAttr.Role.GREEKLETTER
  ],  //????
  [
    'Trig', sre.SemanticAttr.Type.APPL,
    sre.SemanticAttr.Role.PREFIXFUNC
  ],  // specific
  ['VerticalLine', sre.SemanticAttr.Type.PUNCTUATED, sre.SemanticAttr.Role.VBAR]
];
ClearspeakPreferences.SEMANTIC_MAPPING_ = function() {
  let result = {};
  for (let i = 0, triple; triple = ClearspeakPreferences.REVERSE_MAPPING_[i];
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
