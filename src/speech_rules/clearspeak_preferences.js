// Copyright 2017 Volker Sorge
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

goog.provide('sre.ClearspeakPreferences');
goog.provide('sre.ClearspeakPreferences.Comparator');
goog.provide('sre.ClearspeakPreferences.Parser');

goog.require('sre.DynamicCstr');
goog.require('sre.DynamicProperties');
goog.require('sre.Engine');



/**
 * @constructor
 * @param {!sre.DynamicCstr.Map} cstr The constraint mapping.
 * @param {!Object.<string>} preference The preference.
 * @extends {sre.DynamicCstr}
 */
sre.ClearspeakPreferences = function(cstr, preference) {
  sre.ClearspeakPreferences.base(this, 'constructor', cstr);

  this.preference = preference;
};
goog.inherits(sre.ClearspeakPreferences, sre.DynamicCstr);


/**
 * @override
 */
sre.ClearspeakPreferences.prototype.equal = function(cstr) {
  var top = sre.ClearspeakPreferences.base(this, 'equal', cstr);
  if (!top) {
    return false;
  }
  var keys = Object.keys(this.preference);
  var preference = cstr.preference;
  if (keys.length !== Object.keys(preference).length) {
    return false;
  }
  for (var i = 0, key; key = keys[i]; i++) {
    if (this.preference[key] !== preference[key]) {
      return false;
    }
  }
  return true;
};


/**
 * @type {string}
 */
sre.ClearspeakPreferences.AUTO = 'Auto';


/**
 * @type {sre.DynamicProperties}
 */
sre.ClearspeakPreferences.PREFERENCES = new sre.DynamicProperties({
  AbsoluteValue: ['Auto', 'AbsEnd', 'Cardinality', 'Determinant'],
  Bar: ['Auto', 'Conjugate'],
  Caps: ['Auto', 'SayCaps'],
  CombinationPermutation: ['Auto', 'ChoosePermute'],
  Ellipses: ['Auto', 'AndSoOn'],
  Exponent: ['Auto', 'AfterPower', 'Ordinal', 'OrdinalPower'],
  Fraction: ['Auto', 'EndFrac', 'FracOver', 'General', 'GeneralEndFrac',
             'Ordinal', 'Over', 'OverEndFrac', 'Per'],
  Functions: ['Auto', 'None', 'Reciprocal'],  // Reciprocal is French
  ImpliedTimes: ['Auto', 'MoreImpliedTimes', 'None'],
  Log: ['Auto', 'LnAsNaturalLog'],
  Matrix: ['Auto', 'Combinatoric', 'EndMatrix', 'EndVector', 'SilentColNum',
           'SpeakColNum', 'Vector'],
  MultiLineLabel: ['Auto', 'Case', 'Constraint', 'Equation', 'Line', 'None',
                   'Row', 'Step'],
  MultiLineOverview: ['Auto', 'None'],
  MultiLinePausesBetweenColumns: ['Auto', 'Long', 'Short'],
  MultsymbolDot: ['Auto', 'Dot'],
  MultsymbolX: ['Auto', 'By', 'Cross'],
  Paren: ['Auto', 'CoordPoint', 'Interval', 'Silent', 'Speak',
          'SpeakNestingLevel'],
  Prime: ['Auto', 'Angle', 'Length'],
  Roots: ['Auto', 'PosNegSqRoot', 'PosNegSqRootEnd', 'RootEnd'],
  SetMemberSymbol: ['Auto', 'Belongs', 'Element', 'Member'],
  Sets: ['Auto', 'SilentBracket', 'woall', 'woAll'],
  TriangleSymbol: ['Auto', 'Delta'],
  Trig: ['Auto', 'ArcTrig', 'TrigInverse', 'Reciprocal'], // Reciprocal French
  VerticalLine: ['Auto', 'Divides', 'Given', 'SuchThat']
});


/**
 * Cache of Mapping locales to clearspeak preferences.
 * @type {Object.<sre.DynamicProperties>}
 */
sre.ClearspeakPreferences.LOCALE_PREFERENCES = null;


/**
 * Computes the clearspeak preferences per locale and caches them.
 * @param {Object=} opt_dynamic Optionally a tree structure with the dynamic
 *     constraints.
 * @return {Object.<sre.DynamicProperties>} Mapping of locale to preferences.
 */
sre.ClearspeakPreferences.getLocalePreferences = function(opt_dynamic) {
  if (!sre.ClearspeakPreferences.LOCALE_PREFERENCES) {
    var dynamic = opt_dynamic ||
        sre.MathCompoundStore.getInstance().enumerate(
          sre.SpeechRuleEngine.getInstance().enumerate());
    sre.ClearspeakPreferences.LOCALE_PREFERENCES =
      sre.ClearspeakPreferences.getLocalePreferences_(dynamic);
  }
  return sre.ClearspeakPreferences.LOCALE_PREFERENCES;
};


/**
 * Computes the clearspeak preferences per locale and caches them.
 * @param {Object} dynamic Optionally a tree structure with the dynamic
 *     constraints.
 * @return {Object.<sre.DynamicProperties>} Mapping of locale to preferences.
 */
sre.ClearspeakPreferences.getLocalePreferences_ = function(dynamic) {
  var result = {};
  for (var locale in dynamic) {
    if (!dynamic[locale]['speech'] || !dynamic[locale]['speech']['clearspeak']) {
      continue;
    }
    var locPrefs = Object.keys(dynamic[locale]['speech']['clearspeak']);
    var prefs = result[locale] = {};
    for (var axis in sre.ClearspeakPreferences.PREFERENCES.getProperties()) {
      var allSty = sre.ClearspeakPreferences.PREFERENCES.getProperties()[axis];
      var values = [axis + '_Auto'];
      if (allSty) {
        for (var sty of allSty) {
          if (locPrefs.indexOf(axis + '_' + sty) !== -1) {
            values.push(axis + '_' + sty);
          }
        }
      }
      prefs[axis] = values;
    }
  }
  return result;
};


/**
 * Exports the Clearspeak comparator with default settings.
 * @return {sre.ClearspeakPreferences.Comparator} The clearspeak comparator.
 */
sre.ClearspeakPreferences.comparator = function() {
  return new sre.ClearspeakPreferences.Comparator(
      sre.Engine.getInstance().dynamicCstr,
      sre.DynamicProperties.create(
      [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE]],
      [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY]],
      ['mathspeak', 'default'],
      ['short', 'default']));
};



/**
 * @constructor
 * @extends {sre.DynamicCstr.DefaultComparator}
 * @param {sre.DynamicCstr} cstr A Clearspeak preference constraint.
 * @param {sre.DynamicProperties} props A properties element for matching.
 */
sre.ClearspeakPreferences.Comparator = function(cstr, props) {
  sre.ClearspeakPreferences.Comparator.base(this, 'constructor', cstr, props);
  /**
   * @type {!Object.<string>}
   */
  this.preference = cstr.preference || {};

};
goog.inherits(sre.ClearspeakPreferences.Comparator,
              sre.DynamicCstr.DefaultComparator);


/**
 * @override
 */
sre.ClearspeakPreferences.Comparator.prototype.match = function(cstr) {
  var top = sre.ClearspeakPreferences.Comparator.base(this, 'match', cstr);
  if (!top) {
    return false;
  }
  if (!cstr.preference) {
    return true;
  }
  var keys = Object.keys(cstr.preference);
  for (var i = 0, key; key = keys[i]; i++) {
    if (this.preference[key] !== cstr.preference[key]) {
      return false;
    }
  }
  return true;
};


/**
 * @override
 */
sre.ClearspeakPreferences.Comparator.prototype.compare = function(
    cstr1, cstr2) {
  var top = sre.ClearspeakPreferences.Comparator.base(
      this, 'compare', cstr1, cstr2);
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
  var length1 = Object.keys(cstr1.preference).length;
  var length2 = Object.keys(cstr2.preference).length;
  return length1 > length2 ? -1 : (length1 < length2 ? 1 : 0);
};



/**
 * @constructor
 * @extends {sre.DynamicCstr.Parser}
 */
sre.ClearspeakPreferences.Parser = function() {
  sre.ClearspeakPreferences.Parser.base(
      this, 'constructor',
      [sre.DynamicCstr.Axis.LOCALE, sre.DynamicCstr.Axis.MODALITY,
       sre.DynamicCstr.Axis.DOMAIN, sre.DynamicCstr.Axis.STYLE]);
};
goog.inherits(sre.ClearspeakPreferences.Parser, sre.DynamicCstr.Parser);


/**
 * @override
 */
sre.ClearspeakPreferences.Parser.prototype.parse = function(str) {
  var initial = sre.ClearspeakPreferences.Parser.base(this, 'parse', str);
  var style = initial.getValue(sre.DynamicCstr.Axis.STYLE);
  var locale = initial.getValue(sre.DynamicCstr.Axis.LOCALE);
  if (style === sre.DynamicCstr.DEFAULT_VALUE) {
    return new sre.ClearspeakPreferences(
        {'locale': locale,
         'modality': sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY],
         'domain': 'clearspeak',
         'style': sre.DynamicCstr.DEFAULT_VALUE}, {});
  }
  var preferences = this.fromPreference(style);
  return new sre.ClearspeakPreferences(
    {'locale': locale,
     'modality': sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY],
     'domain': 'clearspeak',
     'style': this.toPreference(preferences)}, preferences);
};


/**
 * Parse the preferences from a string of the form:
 * preference1_setting1:preference2_settting2:....:preferenceN_settingN
 * @param {string} pref The preference string.
 * @return {!Object.<string>} The preference settings.
 */
sre.ClearspeakPreferences.Parser.prototype.fromPreference = function(pref) {
  var pairs = pref.split(':');
  var preferences = {};
  var properties = sre.ClearspeakPreferences.PREFERENCES.getProperties();
  var validKeys = Object.keys(properties);
  for (var i = 0, key; key = pairs[i]; i++) {
    var pair = key.split('_');
    if (validKeys.indexOf(pair[0]) === -1) {
      continue;
    }
    var value = pair[1];
    if (value && value !== sre.ClearspeakPreferences.AUTO &&
        properties[
        /** @type {sre.DynamicCstr.Axis} */(pair[0])].indexOf(value) !== -1) {
      preferences[pair[0]] = pair[1];
    }
  }
  return preferences;
};


/**
 * Creates a style string from a set of preference mappings, by joining them via
 * underscore and colon in the form:
 * preference1_setting1:preference2_settting2:....:preferenceN_settingN
 * @param {!Object.<string>} preferences A preference mapping.
 * @return {string} A style string created from the preferences.
 */
sre.ClearspeakPreferences.Parser.prototype.toPreference = function(preferences) {
  var keys = Object.keys(preferences);
  var str = [];
  for (var i = 0; i < keys.length; i++) {
    str.push(keys[i] + '_' + preferences[keys[i]]);
  }
  return str.length ? str.join(':') : sre.DynamicCstr.DEFAULT_VALUE;
};
