// Copyright 2019 Volker Sorge
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
 * @fileoverview Utility functions for mathspeak rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MathspeakFrenchUtil');

goog.require('sre.BaseUtil');
goog.require('sre.DomUtil');
goog.require('sre.Messages');
goog.require('sre.Semantic');
goog.require('sre.SemanticProcessor');
goog.require('sre.SystemExternal');
goog.require('sre.XpathUtil');


goog.scope(function() {
  var msg = sre.Messages;

  sre.MathspeakFrenchUtil.SUB_ISO = 'fr';

/**
 * String representation of zero to nineteen.
 * @type {Array.<string>}
 * @private
 */
sre.MathspeakFrenchUtil.onesNumbers_ = [
  '', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept',
  'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze',
  'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'
];


/**
 * String representation of twenty to ninety.
 * @type {Object.<Array.<string>>}
 * @private
 */
sre.MathspeakFrenchUtil.tensNumbers_ = {
  'fr': [
    '', '', 'vingt', 'trente', 'quarante', 'cinquante',
    'soixante', 'soixante-dix', 'quatre-vingts', 'quatre-vingt-dix'
  ],
  'be': ['', '', 'vingt', 'trente', 'quarante', 'cinquante',
         'soixante', 'septante', 'quatre-vingts', 'nonante'],
  'sw': ['', '', 'vingt', 'trente', 'quarante', 'cinquante',
         'soixante', 'septante', 'huitante', 'nonante']
};

  
/**
 * String representation of thousand to decillion.
 * @type {Array.<string>}
 * @private
 */
sre.MathspeakFrenchUtil.largeNumbers_ = [
  '', 'mille', 'millions', 'milliards', 'billions', 'mille billions',
  'trillions', 'mille trillions', 'quadrillions', 'mille quadrillions',
  'quintillions', 'mille quintillions'
];


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param {number} number The number to translate.
 * @return {string} The string representation of that number.
 * @private
 */
sre.MathspeakFrenchUtil.hundredsToWords_ = function(number) {
  var n = number % 1000;
  var str = '';
  str += sre.MathspeakFrenchUtil.onesNumbers_[Math.floor(n / 100)] ?
      sre.MathspeakFrenchUtil.onesNumbers_[Math.floor(n / 100)] + '-cent' : '';
  n = n % 100;
  if (n) {
    str += str ? '-' : '';
    var ones = sre.MathspeakFrenchUtil.onesNumbers_[n];
    if (ones) {
      str += ones;
    } else {
      // -dix case!
      var tens = sre.MathspeakFrenchUtil.tensNumbers_[
        sre.MathspeakFrenchUtil.SUB_ISO][Math.floor(n / 10)];
      if (tens.match(/\-dix$/)) {
        ones = sre.MathspeakFrenchUtil.onesNumbers_[(n % 10 + 10)];
        str += tens.replace(/\-dix$/, '') + '-' + ones;
      } else {
        str += tens +
          (n % 10 ? '-' + sre.MathspeakFrenchUtil.onesNumbers_[n % 10] : '');
      }
    }
  }
  let match = str.match(/s\-\w+$/);
  return  match ? str.replace(/s\-\w+$/, match[0].slice(1)) :
    str.replace(/\-un$/, '-et-un');
};


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param {number} number The number to translate.
 * @return {string} The string representation of that number.
 */
sre.MathspeakFrenchUtil.numberToWords = function(number) {
  if (number >= Math.pow(10, 36)) {
    return number.toString();
  }
  var pos = 0;
  var str = '';
  while (number > 0) {
    var hundreds = number % 1000;
    if (hundreds) {
      var large = sre.MathspeakFrenchUtil.largeNumbers_[pos];
      var huns = sre.MathspeakFrenchUtil.hundredsToWords_(hundreds);
      if (large && large.match(/^mille /)) {
        var rest = large.replace(/^mille /, '');
        if (str.match(RegExp(rest))) {
          str = huns + (pos ? '-mille-' : '') + str;
        } else if (str.match(RegExp(rest.replace(/s$/, '')))) {
          str = huns + (pos ? '-mille-' : '') + str.replace(rest.replace(/s$/, ''), rest);
        } else {
          str = huns + (pos ? '-' + large + '-' : '') + str;
        }
      } else {
        large = (hundreds === 1 && large) ? large.replace(/s$/, '') : large;
        str = huns + (pos ? '-' + large + '-' : '') + str;
      }
    } 
    number = Math.floor(number / 1000);
    pos++;
  }
  return str.replace(/-$/, '');
};


/**
 * @type {Object.<string>}
 */
sre.MathspeakFrenchUtil.SMALL_ORDINAL = {
  1: 'unième',
  2: 'demi',
  3: 'tiers',
  4: 'quart'
};


/**
 * Translates a number of up to twelve digits into a string representation of
 * its ordinal.
 * @param {number} num The number to translate.
 * @param {boolean} plural A flag indicating if the ordinal is in plural.
 * @return {string} The ordinal of the number as string.
 */
sre.MathspeakFrenchUtil.numberToOrdinal = function(num, plural) {
  var ordinal = sre.MathspeakFrenchUtil.SMALL_ORDINAL[num] ||
      sre.MathspeakFrenchUtil.wordOrdinal(num);
  return (num === 3) ? ordinal :
    (plural ? ordinal + 's' : ordinal);
};


/**
 * Creates a word ordinal string from a number.
 * @param {number} number The number to be converted.
 * @return {string} The ordinal string.
 */
sre.MathspeakFrenchUtil.wordOrdinal = function(number) {
  if (number === 1) {
    return 'première';
  }
  var ordinal = sre.MathspeakFrenchUtil.numberToWords(number);
  if (ordinal.match(/^neuf$/)) {
    ordinal = ordinal.slice(0, -1) + 'v';
  } else if (ordinal.match(/cinq$/)) {
    ordinal = ordinal + 'u';
  } else if (ordinal.match(/e$/) || ordinal.match(/s$/)) {
    ordinal = ordinal.slice(0, -1);
  }
  ordinal = ordinal + 'ième';
  return ordinal;
};


/**
 * Creates a simple ordinal string from a number.
 * @param {number} number The number to be converted.
 * @return {string} The ordinal string.
 */
sre.MathspeakFrenchUtil.simpleOrdinal = function(number) {
  return number === 1 ? number.toString() + 're' : number.toString() + 'e';
};


/**
 * Simple counter function for counting ordinals.
 * @param {!Node} node The node for the context function.
 * @param {string} context The context string.
 * @return {function(): string} The context function returning ordinals.
 */
sre.MathspeakFrenchUtil.ordinalCounter = function(node, context) {
  var counter = 0;
  return function() {
    return sre.MathspeakFrenchUtil.simpleOrdinal(++counter) + ' ' + context;
  };
};


/**
 * Checks if a fraction is a convertible vulgar fraction. In this case it
 * translates enumerator and the denominator.
 * @param {!Node} node Fraction node to be translated.
 * @return {{convertible: boolean,
 *           content: (string|undefined),
 *           denominator: (number|undefined),
 *           enumerator: (number|undefined)}} If convertible denominator and
 *     enumerator are set. Otherwise only the text content is given.
 * @private
 */
sre.MathspeakFrenchUtil.convertVulgarFraction_ = function(node) {
  if (!node.childNodes || !node.childNodes[0] ||
      !node.childNodes[0].childNodes ||
      node.childNodes[0].childNodes.length < 2 ||
      node.childNodes[0].childNodes[0].tagName !==
          sre.SemanticAttr.Type.NUMBER ||
      node.childNodes[0].childNodes[0].getAttribute('role') !==
          sre.SemanticAttr.Role.INTEGER ||
      node.childNodes[0].childNodes[1].tagName !==
          sre.SemanticAttr.Type.NUMBER ||
      node.childNodes[0].childNodes[1].getAttribute('role') !==
          sre.SemanticAttr.Role.INTEGER
  ) {
    return {convertible: false,
      content: node.textContent};
  }
  var denStr = node.childNodes[0].childNodes[1].textContent;
  var enumStr = node.childNodes[0].childNodes[0].textContent;
  var denominator = Number(denStr);
  var enumerator = Number(enumStr);
  if (isNaN(denominator) || isNaN(enumerator)) {
    return {convertible: false,
      content: enumStr + ' ' + msg.MS.FRAC_OVER + ' ' + denStr};
  }
  return {convertible: true,
    enumerator: enumerator,
    denominator: denominator};
};


/**
 * Converts a vulgar fraction into string representation of enumerator and
 * denominator as ordinal.
 * @param {!Node} node Fraction node to be translated.
 * @param {string=} opt_sep Separator string.
 * @return {string} The string representation if it is a valid vulgar fraction.
 */
sre.MathspeakFrenchUtil.vulgarFraction = function(node, opt_sep) {
  var sep = (typeof opt_sep === 'undefined') ? '-' : opt_sep;
  var conversion = sre.MathspeakFrenchUtil.convertVulgarFraction_(node);
  if (conversion.convertible &&
      conversion.enumerator &&
      conversion.denominator) {
    return sre.MathspeakFrenchUtil.numberToWords(conversion.enumerator) + sep +
        sre.MathspeakFrenchUtil.numberToOrdinal(conversion.denominator,
        conversion.enumerator !== 1);
  }
  return conversion.content || '';
};


/**
 * Checks if a vulgar fraction is small enough to be convertible to string in
 * MathSpeak, i.e. enumerator in [1..9] and denominator in [1..99].
 * @param {!Node} node Fraction node to be tested.
 * @param {number} enumer Enumerator maximum.
 * @param {number} denom Denominator maximum.
 * @return {boolean} True if it is a valid, small enough fraction.
 */
sre.MathspeakFrenchUtil.vulgarFractionSmall = function(node, enumer, denom) {
  var conversion = sre.MathspeakFrenchUtil.convertVulgarFraction_(node);
  if (conversion.convertible) {
    var enumerator = conversion.enumerator;
    var denominator = conversion.denominator;
    return enumerator > 0 && enumerator < enumer &&
        denominator > 0 && denominator < denom;
  }
  return false;
};


/**
 * Predicate to decide if a root has a small index, i.e., between 1 and 10.
 * @param {Node} node The root node.
 * @return {Array.<Node>} The list with the given node, if it is a root with a
 *     small index.
 */
sre.MathspeakFrenchUtil.smallRoot = function(node) {
  if (!node.childNodes || node.childNodes.length === 0 ||
      !node.childNodes[0].childNodes) {
    return [];
  }
  var index = node.childNodes[0].childNodes[0].textContent;
  if (!/^\d+$/.test(index)) {
    return [];
  }
  var number = parseInt(index, 10);
  return (number > 1 && number <= 3) ? [node] : [];
};


sre.MathspeakFrenchUtil.baselineVerbose = function(node) {
  var baseline = sre.MathspeakUtil.baselineVerbose(node);
  // return baseline === msg.MS.BASELINE ? baseline :
  //   'position-' + baseline.replace(/\-$/, '');
  return baseline.replace(/\-$/, '');
};


sre.MathspeakFrenchUtil.baselineBrief = function(node) {
  var baseline = sre.MathspeakUtil.baselineBrief(node);
  // return baseline === msg.MS.BASE ? baseline :
  //   'position-' + baseline.replace(/\-$/, '');
  return baseline.replace(/\-$/, '');
};

  sre.MathspeakFrenchUtil.leftSuperscriptVerbose = function(node) {
    var leftIndex = sre.MathspeakUtil.superscriptVerbose(node);
    return leftIndex.replace(/^exposant/, 'exposant gauche');
  };

  sre.MathspeakFrenchUtil.leftSubscriptVerbose = function(node) {
    var leftIndex = sre.MathspeakUtil.subscriptVerbose(node);
    return leftIndex.replace(/^indice/, 'indice gauche');
  };
  
  sre.MathspeakFrenchUtil.leftSuperscriptBrief = function(node) {
    var leftIndex = sre.MathspeakUtil.superscriptBrief(node);
    return leftIndex.replace(/^sup/, 'sup gauche');
  };

  sre.MathspeakFrenchUtil.leftSubscriptBrief = function(node) {
    var leftIndex = sre.MathspeakUtil.subscriptBrief(node);
    return leftIndex.replace(/^sub/, 'sub gauche');
  };
  
});  // goog.scope
