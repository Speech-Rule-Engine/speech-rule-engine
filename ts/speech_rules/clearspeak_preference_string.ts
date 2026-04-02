//
// Copyright 2017-25 Volker Sorge
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
 * @file Handling of string representations of Clearspeak preferences.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {
  Axis,
  AxisMap,
  DynamicCstr,
  DynamicProperties
} from '../rule_engine/dynamic_cstr.js';

export const PREFERENCES = new DynamicProperties({
  AbsoluteValue: ['Auto', 'AbsEnd', 'Cardinality', 'Determinant'],
  Bar: ['Auto', 'Conjugate'],
  Caps: ['Auto', 'SayCaps'],
  CombinationPermutation: ['Auto', 'ChoosePermute'],
  Currency: ['Auto', 'Position', 'Prefix'],
  Ellipses: ['Auto', 'AndSoOn'],
  Enclosed: ['Auto', 'EndEnclose'],
  Exponent: [
    'Auto',
    'AfterPower',
    'Ordinal',
    'OrdinalPower',
    // The following are German
    'Exponent'
  ],
  Fraction: [
    'Auto',
    'EndFrac',
    'FracOver',
    'General',
    'GeneralEndFrac',
    'Ordinal',
    'Over',
    'OverEndFrac',
    'Per'
  ],
  Functions: [
    'Auto',
    'None',
    // Reciprocal is French
    'Reciprocal'
  ],
  Inference: ['Auto', 'Long'],
  ImpliedTimes: ['Auto', 'MoreImpliedTimes', 'None'],
  Log: ['Auto', 'LnAsNaturalLog'],
  Matrix: [
    'Auto',
    'Combinatoric',
    'EndMatrix',
    'EndVector',
    'SilentColNum',
    'SpeakColNum',
    'Vector'
  ],
  MultiLineLabel: [
    'Auto',
    'Case',
    'Constraint',
    'Equation',
    'Line',
    'None',
    'Row',
    'Step'
  ],
  MultiLineOverview: ['Auto', 'None'],
  MultiLinePausesBetweenColumns: ['Auto', 'Long', 'Short'],
  MultsymbolDot: ['Auto', 'Dot'],
  MultsymbolX: ['Auto', 'By', 'Cross'],
  Paren: [
    'Auto',
    'CoordPoint',
    'Interval',
    'Silent',
    'Speak',
    'SpeakNestingLevel'
  ],
  Prime: ['Auto', 'Angle', 'Length'],
  Roots: ['Auto', 'PosNegSqRoot', 'PosNegSqRootEnd', 'RootEnd'],
  SetMemberSymbol: ['Auto', 'Belongs', 'Element', 'Member', 'In'],
  Sets: ['Auto', 'SilentBracket', 'woAll'],
  TriangleSymbol: ['Auto', 'Delta'],
  Trig: [
    'Auto',
    'ArcTrig',
    'TrigInverse',
    // Reciprocal French
    'Reciprocal'
  ],
  VerticalLine: ['Auto', 'Divides', 'Given', 'SuchThat']
});

const AUTO = 'Auto';

/**
 * Parse the preferences from a string of the form:
 * preference1_setting1:preference2_setting2:....:preferenceN_settingN
 *
 * @param pref The preference string.
 * @returns The preference settings.
 */
export function fromPreference(pref: string): AxisMap {
  const pairs = pref.split(':');
  const preferences: AxisMap = {};
  const properties = PREFERENCES.getProperties();
  const validKeys = Object.keys(properties);
  for (let i = 0, key; (key = pairs[i]); i++) {
    const pair = key.split('_');
    if (validKeys.indexOf(pair[0]) === -1) {
      continue;
    }
    const value = pair[1];
    if (
      value &&
      value !== AUTO &&
      properties[pair[0] as Axis].indexOf(value) !== -1
    ) {
      preferences[pair[0]] = pair[1];
    }
  }
  return preferences;
}

/**
 * Creates a style string from a set of preference mappings, by joining them
 * via underscore and colon in the form:
 * preference1_setting1:preference2_setting2:....:preferenceN_settingN
 *
 * @param pref A preference mapping.
 * @returns A style string created from the preferences.
 */
export function toPreference(pref: AxisMap): string {
  const keys = Object.keys(pref);
  const str = [];
  for (let i = 0; i < keys.length; i++) {
    str.push(keys[i] + '_' + pref[keys[i]]);
  }
  return str.length ? str.join(':') : DynamicCstr.DEFAULT_VALUE;
}

/**
 * Look up the setting of a preference in a preference settings string.
 *
 * @param prefs Preference settings.
 * @param kind The preference to look up.
 * @returns The setting of that preference. If it does not exist,
 *     returns Auto.
 */
export function findPreference(prefs: string, kind: string): string {
  if (prefs === 'default') {
    return AUTO;
  }
  const parsed = fromPreference(prefs);
  return parsed[kind] || AUTO;
}

/**
 * Takes the string representation of a clearspeak preference setting and adds
 * a new preference setting via a preference name and value pair. The updated
 * setting is then returned again as a string.
 *
 * @param prefs Preference settings.
 * @param kind New preference name.
 * @param value New preference value.
 * @returns The updated preference settings.
 */
export function addPreference(
  prefs: string,
  kind: string,
  value: string
): string {
  if (prefs === 'default') {
    return kind + '_' + value;
  }
  const parsed = fromPreference(prefs);
  parsed[kind] = value;
  return toPreference(parsed);
}
