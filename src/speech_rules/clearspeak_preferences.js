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

  // TODO: Make these into a proper class.
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
  Currency: ['Auto', 'Position', 'Prefix'],
  Ellipses: ['Auto', 'AndSoOn'],
  Enclosed: ['Auto', 'EndEnclose'],
  Exponent: ['Auto', 'AfterPower', 'Ordinal', 'OrdinalPower',
             // The following are German
             'Exponent'
  ],
  Fraction: ['Auto', 'EndFrac', 'FracOver', 'General', 'GeneralEndFrac',
             'Ordinal', 'Over', 'OverEndFrac', 'Per'],
  Functions: ['Auto', 'None',
              // Reciprocal is French
              'Reciprocal'],
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
  Sets: ['Auto', 'SilentBracket', 'woAll'],
  TriangleSymbol: ['Auto', 'Delta'],
  Trig: ['Auto', 'ArcTrig', 'TrigInverse',
         // Reciprocal French
         'Reciprocal'],
  VerticalLine: ['Auto', 'Divides', 'Given', 'SuchThat']
});


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
      [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.DOMAIN]],
      [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.STYLE]]));
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
  var modality = initial.getValue(sre.DynamicCstr.Axis.MODALITY);
  var pref = {};
  if (style !== sre.DynamicCstr.DEFAULT_VALUE) {
    pref = this.fromPreference(style);
    style = this.toPreference(pref);
  }
  return new sre.ClearspeakPreferences({
    'locale': locale,
    'modality': modality,
    'domain': 'clearspeak',
    'style': style}, pref);
};


/**
 * Parse the preferences from a string of the form:
 * preference1_setting1:preference2_setting2:....:preferenceN_settingN
 * @param {string} pref The preference string.
 * @return {!Object.<string>} The preference settings.
 */
sre.ClearspeakPreferences.Parser.prototype.fromPreference = function(pref) {
  return sre.ClearspeakPreferences.fromPreference(pref);
};


/**
 * Parse the preferences from a string of the form:
 * preference1_setting1:preference2_setting2:....:preferenceN_settingN
 * @param {string} pref The preference string.
 * @return {!Object.<string>} The preference settings.
 */
sre.ClearspeakPreferences.fromPreference = function(pref) {
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
 * preference1_setting1:preference2_setting2:....:preferenceN_settingN
 * @param {!Object.<string>} pref A preference mapping.
 * @return {string} A style string created from the preferences.
 */
sre.ClearspeakPreferences.Parser.prototype.toPreference = function(pref) {
  return sre.ClearspeakPreferences.toPreference(pref);
};


/**
 * Creates a style string from a set of preference mappings, by joining them via
 * underscore and colon in the form:
 * preference1_setting1:preference2_setting2:....:preferenceN_settingN
 * @param {!Object.<string>} pref A preference mapping.
 * @return {string} A style string created from the preferences.
 */
sre.ClearspeakPreferences.toPreference = function(pref) {
  var keys = Object.keys(pref);
  var str = [];
  for (var i = 0; i < keys.length; i++) {
    str.push(keys[i] + '_' + pref[keys[i]]);
  }
  return str.length ? str.join(':') : sre.DynamicCstr.DEFAULT_VALUE;
};


/**
 * Computes the clearspeak preferences per locale and caches them.
 * @param {Object=} opt_dynamic Optionally a tree structure with the dynamic
 *     constraints.
 * @return {Object.<sre.DynamicProperties>} Mapping of locale to preferences.
 */
sre.ClearspeakPreferences.getLocalePreferences = function(opt_dynamic) {
  var dynamic = opt_dynamic ||
      sre.MathCompoundStore.getInstance().enumerate(
      sre.SpeechRuleEngine.getInstance().enumerate());
  return sre.ClearspeakPreferences.getLocalePreferences_(dynamic);
};


/**
 * Computes the clearspeak preferences per locale and caches them.
 * @param {Object} dynamic Optionally a tree structure with the dynamic
 *     constraints.
 * @return {Object.<sre.DynamicProperties>} Mapping of locale to preferences.
 * @private
 */
sre.ClearspeakPreferences.getLocalePreferences_ = function(dynamic) {
  var result = {};
  for (var locale in dynamic) {
    if (!dynamic[locale]['speech'] ||
        !dynamic[locale]['speech']['clearspeak']) {
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


// TODO: The following should be done in MathJax in the future!
/**
 * Retrieves a speech explorer from a MathJax math item.
 * @param {MathItem} item A Math Item.
 * @return {Explorer} A speech explorer if the item has one.
 */
sre.ClearspeakPreferences.getSpeechExplorer = function(item) {
  let explorers = item['attached'];
  if (!explorers || !explorers.length) {
    return null;
  }
  return explorers.find(function(ex) {
    return ex.speechGenerator &&
        ex.speechGenerator.getOptions().modality === 'speech';
  });
};


/**
 * Computes a selection of clearspeak preferences for the MathJax context menu
 * wrt. currently focused subexpression.
 * @param {MathItem} item A Math Item.
 * @param {string} locale The current locale.
 * @return {Array.<Object.<string>>} The menu settings for a new radio button
 *    sub menu.
 */
sre.ClearspeakPreferences.smartPreferences = function(item, locale) {
  var prefs = sre.ClearspeakPreferences.getLocalePreferences();
  var loc = prefs[locale];
  if (!loc) {
    return [];
  }
  var explorer = sre.ClearspeakPreferences.getSpeechExplorer(item);
  if (!explorer) {
    return [{type: 'radio',
      content: 'Standard',
      id: 'clearspeak-default',
      variable: 'speechRules'}];
  }
  var smart = sre.ClearspeakPreferences.relevantPreferences(
      explorer.walker.getFocus().getSemanticPrimary());
  // var smart = 'Bar'; // TODO: Lookup the right preference.
  var previous = sre.Engine.DOMAIN_TO_STYLES['clearspeak'];
  var items = [
    {type: 'radio',
      content: 'No Preferences',
      id: 'clearspeak-default',
      variable: 'speechRules'},
    {type: 'radio',
      content: 'Current Preferences',
      id: 'clearspeak-' + previous,
      variable: 'speechRules'},
    {type: 'rule'},
    {type: 'label', content: 'Preferences for ' + smart},
    {type: 'rule'}
  ];
  return items.concat(loc[smart].map(function(x) {
    var pair = x.split('_');
    return {type: 'radio',
      content: pair[1],
      id: 'clearspeak-' +
          sre.ClearspeakPreferences.addPreference(previous, pair[0], pair[1]),
      variable: 'speechRules'
    };
  }));
};


/**
 * Computes a clearspeak preference that should be changed given the type of the
 * node.
 * @param {sre.SemanticNode} node A semantic node.
 * @return {string} The preference that fits the node's type and role.
 */
sre.ClearspeakPreferences.relevantPreferences = function(node) {
  let roles = sre.ClearspeakPreferences.SEMANTIC_MAPPING_[node.type];
  if (!roles) {
    return 'ImpliedTimes';
  }
  return roles[node.role] || roles[''] || 'ImpliedTimes';
};


/**
 * @type {Array.<Array.<string>>}
 * @private
 */
sre.ClearspeakPreferences.REVERSE_MAPPING_ = [
  ['AbsoluteValue', sre.SemanticAttr.Type.FENCED,
   sre.SemanticAttr.Role.NEUTRAL],
  ['Bar', sre.SemanticAttr.Type.OVERSCORE,
   sre.SemanticAttr.Role.OVERACCENT], // more
  ['Caps', sre.SemanticAttr.Type.IDENTIFIER,
   sre.SemanticAttr.Role.LATINLETTER], // more
  ['CombinationPermutation', sre.SemanticAttr.Type.APPL,
   sre.SemanticAttr.Role.UNKNOWN], // more
  ['Ellipses', sre.SemanticAttr.Type.PUNCTUATION,
   sre.SemanticAttr.Role.ELLIPSIS],
  ['Exponent', sre.SemanticAttr.Type.SUPERSCRIPT, ''],
  ['Fraction', sre.SemanticAttr.Type.FRACTION, ''],
  ['Functions', sre.SemanticAttr.Type.APPL,
   sre.SemanticAttr.Role.SIMPLEFUNC],
  ['ImpliedTimes', sre.SemanticAttr.Type.OPERATOR,
   sre.SemanticAttr.Role.IMPLICIT],
  ['Log', sre.SemanticAttr.Type.APPL,
   sre.SemanticAttr.Role.PREFIXFUNC], // specific
  ['Matrix', sre.SemanticAttr.Type.MATRIX, ''], // multiple
  ['Matrix', sre.SemanticAttr.Type.VECTOR, ''], // multiple
  ['MultiLineLabel', sre.SemanticAttr.Type.MULTILINE,
   sre.SemanticAttr.Role.LABEL], // more, multiple (table)
  ['MultiLineOverview', sre.SemanticAttr.Type.MULTILINE,
   sre.SemanticAttr.Role.TABLE], // more, multiple (table)
  ['MultiLinePausesBetweenColumns', sre.SemanticAttr.Type.MULTILINE,
   sre.SemanticAttr.Role.TABLE], // more, multiple (table)
  ['MultiLineLabel', sre.SemanticAttr.Type.TABLE,
   sre.SemanticAttr.Role.LABEL], // more, multiple (table)
  ['MultiLineOverview', sre.SemanticAttr.Type.TABLE,
   sre.SemanticAttr.Role.TABLE], // more, multiple (table)
  ['MultiLinePausesBetweenColumns', sre.SemanticAttr.Type.TABLE,
   sre.SemanticAttr.Role.TABLE], // more, multiple (table)
  ['MultiLineLabel', sre.SemanticAttr.Type.CASES,
   sre.SemanticAttr.Role.LABEL], // more, multiple (table)
  ['MultiLineOverview', sre.SemanticAttr.Type.CASES,
   sre.SemanticAttr.Role.TABLE], // more, multiple (table)
  ['MultiLinePausesBetweenColumns', sre.SemanticAttr.Type.CASES,
   sre.SemanticAttr.Role.TABLE], // more, multiple (table)
  ['MultsymbolDot', sre.SemanticAttr.Type.OPERATOR,
   sre.SemanticAttr.Role.MULTIPLICATION], // multiple?
  ['MultsymbolX', sre.SemanticAttr.Type.OPERATOR,
   sre.SemanticAttr.Role.MULTIPLICATION], // multiple?
  ['Paren', sre.SemanticAttr.Type.FENCED,
   sre.SemanticAttr.Role.LEFTRIGHT],
  ['Prime', sre.SemanticAttr.Type.SUPERSCRIPT,
   sre.SemanticAttr.Role.PRIME],
  ['Roots', sre.SemanticAttr.Type.ROOT, ''], // multiple (sqrt)
  ['Roots', sre.SemanticAttr.Type.SQRT, ''], // multiple (sqrt)
  ['SetMemberSymbol', sre.SemanticAttr.Type.RELATION,
   sre.SemanticAttr.Role.ELEMENT],
  ['Sets', sre.SemanticAttr.Type.FENCED,
   sre.SemanticAttr.Role.SETEXT], // multiple
  ['TriangleSymbol', sre.SemanticAttr.Type.IDENTIFIER,
   sre.SemanticAttr.Role.GREEKLETTER], //????
  ['Trig', sre.SemanticAttr.Type.APPL,
   sre.SemanticAttr.Role.PREFIXFUNC], // specific
  ['VerticalLine', sre.SemanticAttr.Type.PUNCTUATED,
   sre.SemanticAttr.Role.VBAR]
];


/**
 * @type {Object.<sre.SemanticAttr.Type,
 *        Object.<sre.SemanticAttr.Role|string, string>>}
 * @private
 */
sre.ClearspeakPreferences.SEMANTIC_MAPPING_ = function() {
  var result = {};
  for (var i = 0, triple;
       triple = sre.ClearspeakPreferences.REVERSE_MAPPING_[i]; i++) {
    var pref = triple[0];
    var role = result[triple[1]];
    if (!role) {
      role = {};
      result[triple[1]] = role;
    }
    role[triple[2]] = pref;
  }
  return result;
}();


/**
 * Look up the setting of a preference in a preference settings sting.
 * @param {string} prefs Preference settings.
 * @param {string} kind The preference to look up.
 * @return {string} The setting of that preference. If it does not exist,
 *     returns Auto.
 */
sre.ClearspeakPreferences.findPreference = function(prefs, kind) {
  if (prefs === 'default') {
    return sre.ClearspeakPreferences.AUTO;
  }
  let parsed = sre.ClearspeakPreferences.fromPreference(prefs);
  return parsed[kind] || sre.ClearspeakPreferences.AUTO;
};


/**
 * Adds or updates a value in a preference settings.
 * @param {string} prefs Preference settings.
 * @param {string} kind New preference name.
 * @param {string} value New preference value.
 * @return {string} The updated preference settings.
 */
sre.ClearspeakPreferences.addPreference = function(prefs, kind, value) {
  if (prefs === 'default') {
    return kind + '_' + value;
  }
  let parsed = sre.ClearspeakPreferences.fromPreference(prefs);
  parsed[kind] = value;
  return sre.ClearspeakPreferences.toPreference(parsed);
};


/**
 * Add new comparator and parser.
 */
sre.Engine.getInstance().comparators['clearspeak'] =
    sre.ClearspeakPreferences.comparator;
sre.Engine.getInstance().parsers['clearspeak'] =
    new sre.ClearspeakPreferences.Parser();
